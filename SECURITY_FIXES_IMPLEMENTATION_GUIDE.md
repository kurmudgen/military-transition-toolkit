# 🔧 SECURITY FIXES - IMPLEMENTATION GUIDE

## Quick Reference for Fixing Critical Security Issues

Based on Security Audit v5.0 findings, this guide provides step-by-step implementation instructions for each critical security fix.

---

## 🔴 FIX 1: Server-Side Subscription Validation

### Create API Endpoint

**File:** `api/subscription/validate.js`

```javascript
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify JWT
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Fetch subscription from database
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('status, plan_id, current_period_end')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Subscription fetch error:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    // Check if subscription is active
    const isActive = subscription?.status === 'active'
    const isPaid = subscription?.plan_id && !subscription.plan_id.includes('free')

    return res.status(200).json({
      hasActiveSubscription: isActive && isPaid,
      tier: isPaid ? getTierFromPlanId(subscription.plan_id) : 'free',
      status: subscription?.status || 'inactive',
      expiresAt: subscription?.current_period_end || null
    })

  } catch (error) {
    console.error('Validation error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

function getTierFromPlanId(planId) {
  if (!planId) return 'free'
  if (planId.includes('monthly')) return 'monthly'
  if (planId.includes('annual')) return 'annual'
  if (planId.includes('lifetime')) return 'lifetime'
  return 'free'
}
```

### Update Storage.js to Call API

**File:** `src/utils/storage.js`

```javascript
// Add at top
const validateSubscription = async () => {
  const token = (await supabase.auth.getSession()).data.session?.access_token
  if (!token) return { hasActiveSubscription: false }

  const response = await fetch('/api/subscription/validate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) return { hasActiveSubscription: false }
  return await response.json()
}

// Update saveData function
export const saveData = async (table, data, user = null) => {
  // Public tools use localStorage
  if (PUBLIC_TABLES.includes(table)) {
    // ... existing localStorage code ...
  }

  // SERVER-SIDE subscription validation
  const validation = await validateSubscription()
  if (!validation.hasActiveSubscription) {
    return {
      success: false,
      error: 'subscription_required',
      message: 'Upgrade to Premium to save your data to the cloud',
      upgradeUrl: '/pricing'
    }
  }

  // Save to Supabase for premium users
  // ... existing Supabase code ...
}
```

---

## 🔴 FIX 2: Update RLS Policies with Subscription Check

**File:** `SUPABASE_RLS_POLICIES_V2.sql`

Run this in Supabase SQL Editor:

```sql
-- ============================================
-- DROP OLD POLICIES (for premium tables only)
-- ============================================

-- VA Conditions
DROP POLICY IF EXISTS "Users can create own VA conditions" ON va_conditions;
DROP POLICY IF EXISTS "Users can update own VA conditions" ON va_conditions;

-- VA Evidence
DROP POLICY IF EXISTS "Users can create own VA evidence" ON va_evidence;
DROP POLICY IF EXISTS "Users can update own VA evidence" ON va_evidence;

-- Appointments
DROP POLICY IF EXISTS "Users can create own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can update own appointments" ON appointments;

-- Resumes
DROP POLICY IF EXISTS "Users can create own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update own resumes" ON resumes;

-- Job Applications
DROP POLICY IF EXISTS "Users can create own job applications" ON job_applications;
DROP POLICY IF EXISTS "Users can update own job applications" ON job_applications;

-- Saved Jobs
DROP POLICY IF EXISTS "Users can create own saved jobs" ON saved_jobs;
DROP POLICY IF EXISTS "Users can update own saved jobs" ON saved_jobs;

-- Checklist Progress
DROP POLICY IF EXISTS "Users can create own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can update own checklist progress" ON checklist_progress;

-- Custom Resources
DROP POLICY IF EXISTS "Users can create own custom resources" ON custom_resources;
DROP POLICY IF EXISTS "Users can update own custom resources" ON custom_resources;

-- ============================================
-- CREATE NEW POLICIES WITH SUBSCRIPTION CHECK
-- ============================================

-- Helper function to check active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_id_param uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = user_id_param
    AND status = 'active'
    AND plan_id IN ('monthly', 'annual', 'lifetime')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- VA CONDITIONS (PREMIUM)
CREATE POLICY "Subscribed users can create VA conditions"
  ON va_conditions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update VA conditions"
  ON va_conditions FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- VA EVIDENCE (PREMIUM)
CREATE POLICY "Subscribed users can create VA evidence"
  ON va_evidence FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update VA evidence"
  ON va_evidence FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- APPOINTMENTS (PREMIUM)
CREATE POLICY "Subscribed users can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- RESUMES (PREMIUM)
CREATE POLICY "Subscribed users can create resumes"
  ON resumes FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- JOB APPLICATIONS (PREMIUM)
CREATE POLICY "Subscribed users can create job applications"
  ON job_applications FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update job applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- SAVED JOBS (PREMIUM)
CREATE POLICY "Subscribed users can create saved jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update saved jobs"
  ON saved_jobs FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- CHECKLIST PROGRESS (PREMIUM)
CREATE POLICY "Subscribed users can create checklist progress"
  ON checklist_progress FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update checklist progress"
  ON checklist_progress FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- CUSTOM RESOURCES (PREMIUM)
CREATE POLICY "Subscribed users can create custom resources"
  ON custom_resources FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

CREATE POLICY "Subscribed users can update custom resources"
  ON custom_resources FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- ============================================
-- VERIFICATION
-- ============================================

-- Test with a user who has no subscription:
-- Should return 0 rows:
SELECT * FROM va_conditions WHERE user_id = 'test-user-id';

-- Test has_active_subscription function:
SELECT has_active_subscription('your-user-id'::uuid);
```

---

## 🔴 FIX 3: Implement Preview Mode

### Update Component Template

**Example:** `src/pages/VAClaimsBuilder.jsx`

```javascript
// Add previewMode prop
export default function VAClaimsBuilder({ previewMode = false }) {
  // ... existing state ...

  // Show upgrade overlay if in preview mode
  if (previewMode) {
    return (
      <div className="relative">
        {/* Render read-only UI */}
        <div className="pointer-events-none opacity-60">
          {/* ... existing component JSX ... */}
        </div>

        {/* Upgrade overlay */}
        <UpgradeOverlay
          featureName="VA Claims Builder"
          description="Track unlimited VA disability claims with evidence management and deadline tracking"
          benefits={[
            'Unlimited claims tracking',
            'Evidence checklist by body system',
            'Personal statement generator',
            'Buddy statement templates',
            'Cloud storage and sync'
          ]}
        />
      </div>
    )
  }

  // Normal authenticated mode
  return (
    <div>
      {/* ... existing component JSX ... */}
    </div>
  )
}
```

### Repeat for All 8 Premium Components:
1. VAClaimsBuilder.jsx
2. ResumeBuilder.jsx
3. AppointmentsTracking.jsx
4. JobSearch.jsx
5. MedBoard.jsx
6. SeparationUnder20.jsx
7. Progress.jsx
8. Reminders.jsx

---

## 🔴 FIX 4: Add Rate Limiting

### Install Dependencies

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Create Rate Limit Middleware

**File:** `api/_middleware/ratelimit.js`

```javascript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Configure Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Strict rate limit for sensitive operations
export const strictRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:strict',
})

// Standard rate limit for normal operations
export const standardRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
  analytics: true,
  prefix: 'ratelimit:standard',
})

export async function applyRateLimit(req, res, limiter) {
  const identifier = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'

  try {
    const { success, limit, reset, remaining } = await limiter.limit(identifier)

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', limit)
    res.setHeader('X-RateLimit-Remaining', remaining)
    res.setHeader('X-RateLimit-Reset', reset)

    if (!success) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        limit,
        remaining: 0,
        reset
      })
    }

    return true
  } catch (error) {
    // FAIL CLOSED: If Redis is down, block the request
    console.error('Rate limit error:', error)
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'Unable to process request. Please try again later.'
    })
  }
}
```

### Apply to API Endpoints

**Update:** `api/stripe/create-checkout-session.js`

```javascript
import { applyRateLimit, strictRateLimit } from '../_middleware/ratelimit'

export default async function handler(req, res) {
  // STEP 0: Rate limiting (BEFORE any processing)
  const rateLimitPassed = await applyRateLimit(req, res, strictRateLimit)
  if (rateLimitPassed !== true) {
    return // Response already sent by applyRateLimit
  }

  // ... rest of handler ...
}
```

### Environment Variables

Add to `.env.local` and Vercel:

```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

---

## 🟠 FIX 5: Add CSRF Protection

### Create CSRF Middleware

**File:** `api/_middleware/csrf.js`

```javascript
import crypto from 'crypto'

// Generate CSRF token
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex')
}

// Validate CSRF token
export function validateCSRFToken(req) {
  const tokenFromHeader = req.headers['x-csrf-token']
  const tokenFromCookie = req.cookies.csrf_token

  if (!tokenFromHeader || !tokenFromCookie) {
    return false
  }

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(tokenFromHeader),
    Buffer.from(tokenFromCookie)
  )
}

// Apply CSRF protection
export function applyCSRFProtection(req, res) {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return true
  }

  if (!validateCSRFToken(req)) {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Request blocked for security. Please refresh and try again.'
    })
  }

  return true
}
```

### Add to API Endpoints

**Update:** `api/stripe/create-checkout-session.js`

```javascript
import { applyCSRFProtection } from '../_middleware/csrf'
import { applyRateLimit, strictRateLimit } from '../_middleware/ratelimit'

export default async function handler(req, res) {
  // STEP 0: Rate limiting
  const rateLimitPassed = await applyRateLimit(req, res, strictRateLimit)
  if (rateLimitPassed !== true) return

  // STEP 0.5: CSRF protection
  const csrfPassed = applyCSRFProtection(req, res)
  if (csrfPassed !== true) return

  // ... rest of handler ...
}
```

### Update AuthContext to Provide CSRF Token

**File:** `src/contexts/AuthContext.jsx`

```javascript
const [csrfToken, setCSRFToken] = useState(null)

useEffect(() => {
  // Generate CSRF token on mount
  const token = crypto.randomBytes(16).toString('hex')
  setCSRFToken(token)

  // Store in cookie
  document.cookie = `csrf_token=${token}; path=/; secure; samesite=strict`
}, [])

// Provide in context
return (
  <AuthContext.Provider value={{ user, session, csrfToken, ... }}>
    {children}
  </AuthContext.Provider>
)
```

---

## ✅ TESTING CHECKLIST

After implementing all fixes:

### Test 1: Subscription Bypass
```javascript
// In browser console:
user.subscription_status = 'active'
user.subscription_tier = 'lifetime'

// Try to save premium data:
saveData('va_conditions', testData, user)

// ✅ EXPECTED: Error "subscription_required"
// ✅ EXPECTED: No data saved to Supabase
```

### Test 2: Preview Mode
```
1. Visit /preview/va-claims-builder
2. ✅ EXPECTED: Upgrade overlay visible
3. Try to click save button
4. ✅ EXPECTED: Button disabled (pointer-events-none)
5. Check Supabase for any writes
6. ✅ EXPECTED: No writes occurred
```

### Test 3: Rate Limiting
```bash
# Spam endpoint 20 times:
for i in {1..20}; do
  curl -X POST https://app.com/api/stripe/create-checkout-session
done

# ✅ EXPECTED: First 10 succeed, rest return 429
# ✅ EXPECTED: X-RateLimit-* headers present
```

### Test 4: CSRF Protection
```html
<!-- Create malicious.html -->
<form action="https://app.com/api/stripe/cancel-subscription" method="POST">
  <input name="subscriptionId" value="sub_xxx">
</form>
<script>document.forms[0].submit()</script>

<!-- ✅ EXPECTED: 403 Forbidden (CSRF token missing) -->
```

### Test 5: RLS Policy
```sql
-- In Supabase SQL Editor:
-- As a user with NO subscription:
INSERT INTO va_conditions (user_id, condition_name)
VALUES ('your-user-id', 'Test Condition');

-- ✅ EXPECTED: Error "new row violates row-level security policy"
```

---

## 📋 DEPLOYMENT CHECKLIST

- [ ] All fixes implemented and tested locally
- [ ] Environment variables added to Vercel
- [ ] RLS policies run in Supabase SQL Editor
- [ ] Penetration tests re-run and pass
- [ ] Security monitoring configured
- [ ] Team trained on new security measures
- [ ] Incident response plan updated

---

**Implementation Guide v1.0**
**Created:** January 2025
**Based on:** Security Audit v5.0

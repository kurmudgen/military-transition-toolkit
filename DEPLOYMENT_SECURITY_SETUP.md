# 🚀 DEPLOYMENT & SECURITY SETUP GUIDE
## Military Transition Toolkit - Production Deployment

**Required Time:** ~30 minutes
**Difficulty:** Intermediate

---

## ⚡ QUICK START

### Prerequisites
- [ ] Vercel account with deployment access
- [ ] Supabase project created
- [ ] Stripe account configured
- [ ] Upstash account (create free at https://upstash.com)

### Environment Variables Needed (10)
```bash
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_ANNUAL=
STRIPE_PRICE_LIFETIME=

# Upstash Redis (NEW)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 📋 STEP-BY-STEP DEPLOYMENT

### Step 1: Set Up Upstash Redis (5 minutes)

**Why:** Rate limiting requires Redis to track request counts per IP

1. **Create Upstash Account:**
   - Visit https://upstash.com
   - Sign up with GitHub/Google
   - Free tier: 10,000 commands/day (plenty for our needs)

2. **Create Redis Database:**
   ```
   Dashboard → Create Database
   Name: military-transition-ratelimit
   Region: Choose closest to your users (e.g., us-east-1)
   Type: Regional (free)
   Click "Create"
   ```

3. **Get Credentials:**
   ```
   Click on database → REST API tab
   Copy "UPSTASH_REDIS_REST_URL"
   Copy "UPSTASH_REDIS_REST_TOKEN"
   ```

4. **Add to Vercel:**
   ```bash
   Vercel Dashboard → Your Project → Settings → Environment Variables

   Name: UPSTASH_REDIS_REST_URL
   Value: https://your-database.upstash.io
   Scope: Production, Preview, Development

   Name: UPSTASH_REDIS_REST_TOKEN
   Value: AXXXxxxxxxxxx
   Scope: Production, Preview, Development
   ```

### Step 2: Update Supabase RLS Policies (10 minutes)

**Why:** Enforce subscription at database level

1. **Backup Current Policies (Optional but Recommended):**
   ```sql
   -- Run in Supabase SQL Editor to export current policies
   SELECT * FROM pg_policies WHERE schemaname = 'public';
   ```

2. **Deploy New Policies:**
   ```
   Open: SUPABASE_RLS_POLICIES_V2_WITH_SUBSCRIPTION.sql

   Supabase Dashboard → SQL Editor → New Query
   Copy entire file contents
   Paste into SQL Editor
   Click "Run" (bottom right)
   ```

3. **Verify Deployment:**
   - Check for "Success" message
   - No red error messages
   - Should see "CREATE FUNCTION" and "CREATE POLICY" confirmations

4. **Test Function:**
   ```sql
   -- Replace with a real user ID from your auth.users table
   SELECT has_active_subscription('user-uuid-here'::UUID);

   -- Should return:
   -- true (if user has active subscription)
   -- false (if user is on free tier)
   ```

### Step 3: Deploy Application Code (5 minutes)

1. **Push to Git:**
   ```bash
   git status  # Verify all changes committed
   git push origin main
   ```

2. **Vercel Auto-Deploy:**
   - Vercel automatically deploys from main branch
   - Wait for build to complete (~2-3 minutes)
   - Check build logs for errors

3. **Verify Deployment:**
   ```
   Visit: https://your-app.vercel.app
   Check console for errors
   Test basic navigation
   ```

### Step 4: Post-Deployment Testing (10 minutes)

**Test 1: Server-Side Validation**
```javascript
// Open browser console on production site
// Try to manipulate subscription (should not work)

// 1. Open DevTools → Application → Local Storage
// 2. Try to modify user data
// 3. Attempt to access premium feature
// Expected: Blocked by server, proper error message shown
```

**Test 2: RLS Policy Enforcement**
```javascript
// Create a free test account
// Try to access premium feature via Supabase client
import { supabase } from './supabaseClient'

const { error } = await supabase
  .from('va_conditions')
  .insert({ condition_name: 'Test' })

// Expected: Error with subscription required message
```

**Test 3: Preview Mode**
```
Visit: https://your-app.vercel.app/preview/va-claims-builder
Expected:
- Upgrade overlay visible
- Content dimmed (60% opacity)
- No interactions work
- "Upgrade" button works
```

**Test 4: Rate Limiting**
```bash
# Use curl to test rate limit (from terminal)
for i in {1..10}; do
  curl -X POST https://your-app.vercel.app/api/verify-subscription \
    -H "Authorization: Bearer your-token" \
    -H "Content-Type: application/json"
done

# Expected:
# First 100 succeed
# 101st returns: 429 Too Many Requests
# Headers include: X-RateLimit-Limit, X-RateLimit-Remaining
```

---

## 🔧 TROUBLESHOOTING

### Issue: Rate Limiting Not Working

**Symptoms:** All requests succeed, no 429 errors even after exceeding limit

**Causes & Fixes:**

1. **Redis credentials not set:**
   ```bash
   # Check Vercel environment variables
   Vercel Dashboard → Settings → Environment Variables
   Verify UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN present
   ```

2. **Development mode active:**
   ```bash
   # Rate limiting is disabled in dev mode
   # Check logs for: "Rate limiting disabled in development"
   # This is expected behavior for local development
   ```

3. **Redis connection failing:**
   ```bash
   # Check Vercel function logs
   Vercel Dashboard → Deployments → [Latest] → Functions
   Look for errors: "Rate limit check error"
   Verify Redis URL format: https://xxx.upstash.io (no trailing slash)
   ```

### Issue: RLS Policies Blocking All Users

**Symptoms:** Even paid users cannot access premium features

**Causes & Fixes:**

1. **Function not created:**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT proname FROM pg_proc WHERE proname = 'has_active_subscription';

   -- If empty result, function wasn't created
   -- Solution: Re-run SUPABASE_RLS_POLICIES_V2_WITH_SUBSCRIPTION.sql
   ```

2. **user_subscriptions table has wrong data:**
   ```sql
   -- Check subscription data
   SELECT user_id, status, plan_id, current_period_end
   FROM user_subscriptions
   WHERE user_id = 'your-user-id';

   -- Verify:
   -- status = 'active'
   -- plan_id IN ('premium_monthly', 'premium_annual', 'premium_lifetime')
   -- current_period_end > NOW() (or NULL for lifetime)
   ```

3. **Policies applied to wrong tables:**
   ```sql
   -- List all policies
   SELECT tablename, policyname
   FROM pg_policies
   WHERE schemaname = 'public'
   ORDER BY tablename;

   -- Verify "Subscribed users" policies exist for:
   -- va_conditions, va_evidence, appointments, resumes,
   -- saved_jobs, job_applications, checklist_progress, custom_resources
   ```

### Issue: Subscription Validation Fails

**Symptoms:** API returns "subscription_required" for paid users

**Causes & Fixes:**

1. **JWT token invalid:**
   ```javascript
   // Check token in browser console
   const { data: { session } } = await supabase.auth.getSession()
   console.log('Token:', session?.access_token)

   // If null: User not logged in
   // If expired: Token needs refresh
   ```

2. **Service role key not set:**
   ```bash
   # Verify in Vercel
   SUPABASE_SERVICE_ROLE_KEY must be set
   NOT the anon key - must be service_role key

   Get from: Supabase → Settings → API → service_role secret
   ```

3. **Stripe subscription not synced:**
   ```sql
   -- Check if webhook created subscription record
   SELECT * FROM user_subscriptions
   WHERE stripe_subscription_id = 'sub_xxx';

   -- If empty: Stripe webhook may have failed
   -- Check: Stripe Dashboard → Webhooks → Event logs
   ```

### Issue: Preview Mode Not Working

**Symptoms:** /preview/* routes show full functionality

**Causes & Fixes:**

1. **Component not updated:**
   ```javascript
   // Check component accepts previewMode prop
   export default function ComponentName({ previewMode = false })

   // If missing, component wasn't updated
   // Solution: Update component following CRITICAL-003 pattern
   ```

2. **Route not configured:**
   ```javascript
   // Check src/App.jsx has preview routes
   <Route path="/preview/va-claims-builder" element={<VAClaimsBuilder previewMode />} />

   // Note: previewMode prop must be passed
   ```

---

## 🎯 MONITORING & ALERTS

### Metrics to Track (Recommended)

**Rate Limiting:**
```javascript
// Track in analytics
- rate_limit_exceeded (IP, endpoint, timestamp)
- rate_limit_near_exceeded (80% of limit)
- suspicious_rate_patterns (multiple IPs from same network)
```

**Subscription Validation:**
```javascript
// Track failures
- subscription_validation_failed (user_id, reason, timestamp)
- subscription_validation_succeeded (user_id, tier)
```

**RLS Policy Violations:**
```sql
-- Enable Supabase audit logs
-- Track denied operations on premium tables
```

### Alert Thresholds (Suggested)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Rate limit hits | >100/hour | Review IPs, potential attack |
| Failed validations | >50/hour | Check API health |
| RLS violations | >10/hour | Investigate bypass attempts |
| Server errors (5xx) | >10/hour | Check logs, API health |

---

## 🔐 SECURITY CHECKLIST

### Pre-Launch (Must Complete):

- [ ] ✅ All 4 CRITICAL fixes deployed
- [ ] ✅ Upstash Redis configured
- [ ] ✅ RLS policies updated in Supabase
- [ ] ✅ All environment variables set
- [ ] ✅ Rate limiting tested (429 responses work)
- [ ] ✅ Preview mode tested (overlays show)
- [ ] ✅ Server-side validation tested (bypass blocked)
- [ ] ✅ RLS policies tested (free users blocked)

### Post-Launch (Recommended):

- [ ] Set up error monitoring (Sentry/LogRocket)
- [ ] Configure rate limit alerts
- [ ] Enable Supabase audit logs
- [ ] Document incident response plan
- [ ] Schedule 30-day security audit
- [ ] Implement CSRF protection (HIGH-001)
- [ ] Add security headers (MEDIUM priority)

---

## 📚 ADDITIONAL RESOURCES

**Documentation:**
- Upstash Redis: https://docs.upstash.com/redis
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security
- Rate Limiting Best Practices: https://redis.io/docs/manual/patterns/rate-limiter/

**Security References:**
- OWASP Top 10: https://owasp.org/Top10/
- HIPAA Compliance: https://www.hhs.gov/hipaa/for-professionals/security/index.html
- PCI DSS: https://www.pcisecuritystandards.org/

**Internal Docs:**
- `SECURITY_IMPLEMENTATION_SUMMARY.md` - Detailed fix documentation
- `SECURITY_AUDIT_V5_REPORT.md` - Original vulnerability report
- `SUPABASE_RLS_POLICIES_V2_WITH_SUBSCRIPTION.sql` - Database policies

---

## 🆘 NEED HELP?

**Issues During Deployment:**
- Check Vercel deployment logs
- Check Supabase SQL error messages
- Review browser console errors
- Check function logs for stack traces

**Security Questions:**
- Email: security@formationlabs.net
- GitHub Issues: [Your repo]/issues

**Production Incidents:**
1. Roll back to previous deployment (Vercel → Deployments → Rollback)
2. Check error logs
3. Notify team
4. Document incident
5. Deploy fix

---

**Last Updated:** January 2025
**Version:** 2.0 (Security Hardening)
**Status:** ✅ Ready for Production

---

**END OF DEPLOYMENT GUIDE**

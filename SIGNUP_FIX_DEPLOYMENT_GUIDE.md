# 🚨 URGENT: Signup Database Error Fix

## Issue Report

**User:** Anthony Pendleton (Monterey, CA - Walter Reed Medical Center)
**Error:** "database error saving new user"
**Impact:** **CRITICAL** - Blocking ALL new user registrations

---

## Root Cause Analysis

### The Problem

Your database has **conflicting schema definitions** for the `user_profiles` table:

1. **Migration 001_initial_schema.sql** expects:
   - `id UUID` (primary key) that DIRECTLY references `auth.users(id)`
   - Trigger inserts: `INSERT INTO user_profiles (id, email) VALUES (NEW.id, ...)`

2. **Migration create_user_profiles.sql** created:
   - Separate `id UUID` (auto-generated)
   - Separate `user_id UUID` that references `auth.users(id)`

### Why This Breaks Signup

When a user signs up:
1. Supabase creates the auth user ✅
2. Trigger `handle_new_user()` fires
3. Trigger tries to INSERT with `id = NEW.id` (auth user's id)
4. **FAILS** because schema expects `user_id` not `id` ❌
5. User sees: "database error saving new user"

---

## The Fix (5 Minutes)

### Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: **military-transition-toolkit**
3. Click **SQL Editor** in left sidebar

### Step 2: Run the Fix Migration

1. Click **"New query"**
2. Open the file: `supabase/migrations/FIX_USER_SIGNUP_ERROR.sql`
3. **Copy the ENTIRE contents** (all ~230 lines)
4. **Paste** into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)

### Step 3: Verify Fix Was Successful

You should see output showing:
- ✅ Table structure (should show `id` as UUID referencing auth.users)
- ✅ RLS enabled: `rowsecurity = true`
- ✅ Trigger exists: `on_auth_user_created`

### Step 4: Test Signup Flow

1. Open your app: http://localhost:5173 (or production URL)
2. Click **"Sign Up"**
3. Fill in the form:
   - **Email:** testuser@example.com (use a real email you can access)
   - **Full Name:** Test User
   - **Password:** TestPassword123!
   - **Separation Status:** Select either option
4. Click **"Create account"**

**Expected Results:**
- ✅ Success message: "Please check your email to verify your account"
- ✅ No errors in browser console
- ✅ User appears in Supabase Dashboard → Authentication → Users

### Step 5: Check Database Records

In Supabase SQL Editor, run:

```sql
-- Check user_profiles were created
SELECT id, email, full_name, separation_status, created_at
FROM user_profiles
ORDER BY created_at DESC
LIMIT 5;

-- Check user_subscriptions were created
SELECT user_id, plan_id, status
FROM user_subscriptions
ORDER BY created_at DESC
LIMIT 5;
```

You should see:
- ✅ Profile record with matching `id` (same as auth user)
- ✅ Subscription record with `plan_id = 'free'`

---

## What the Fix Does

### 1. Drops Conflicting Schema
```sql
DROP TABLE IF EXISTS public.user_profiles CASCADE;
```
- Removes the incorrect table structure
- Cascades to remove dependent objects

### 2. Creates Correct Schema
```sql
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  -- other columns...
);
```
- `id` is now the PRIMARY KEY and DIRECTLY references auth.users
- No separate `user_id` column

### 3. Fixes the Trigger Function
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, separation_status)
  VALUES (NEW.id, NEW.email, user_full_name, user_separation_status)
  ON CONFLICT (id) DO UPDATE...

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
- Uses `SECURITY DEFINER` to bypass RLS during trigger execution
- Extracts `full_name` and `separation_status` from `raw_user_meta_data`
- Handles conflicts gracefully with `ON CONFLICT DO UPDATE`
- Has error handling so auth user is created even if profile fails

### 4. Enables Proper RLS Policies
```sql
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```
- Allows users to INSERT their own profile
- Uses `id` (not `user_id`) for auth check

---

## Troubleshooting

### Error: "relation user_profiles does not exist"

**Fix:** The table was never created. Run the **entire** `001_initial_schema.sql` migration first, THEN run the fix migration.

### Error: "permission denied for table user_profiles"

**Fix:** Run these grants:
```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
```

### Error: "duplicate key value violates unique constraint"

**Cause:** A user tried signing up multiple times while the bug existed.

**Fix:** Delete the broken auth user and have them try again:
```sql
-- Find the user ID
SELECT id, email FROM auth.users WHERE email = 'user@example.com';

-- Delete them (this will cascade to user_profiles)
DELETE FROM auth.users WHERE id = '<user-id>';
```

### Signup Still Failing After Fix

1. **Check Supabase Logs:**
   - Dashboard → Logs → Postgres Logs
   - Look for errors from `handle_new_user()` function

2. **Verify Trigger Exists:**
```sql
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

3. **Manually Test Trigger:**
```sql
-- Create a test auth user and see if profile is created
-- (Don't actually run this - just shows the logic)
```

4. **Check for Conflicting Policies:**
```sql
SELECT * FROM pg_policies
WHERE tablename = 'user_profiles';
```

---

## Testing Checklist

After deploying the fix, verify:

- [ ] New users can sign up without errors
- [ ] User profile is created in `user_profiles` table
- [ ] User subscription is created in `user_subscriptions` table
- [ ] RLS policies prevent users from seeing other users' data
- [ ] Email verification emails are sent
- [ ] Users can log in after verifying email
- [ ] User metadata (full_name, separation_status) is saved correctly

---

## Notify Anthony Pendleton

Once the fix is deployed and tested:

**Email Subject:** Military Transition Toolkit - Signup Issue Resolved

**Email Body:**
```
Hi Anthony,

Great news! We've fixed the signup issue you encountered.

The problem was a database configuration issue that we've now resolved.
You should be able to create your account now.

Please try signing up again at: [your-app-url]

If you have any issues, please reply to this email and we'll help you get set up.

Thank you for your patience and for your service!

Best regards,
[Your Name]
Military Transition Toolkit Team
```

---

## Prevention: Avoid Future Issues

### 1. Single Source of Truth for Schema

**Problem:** Multiple migration files with conflicting schemas

**Solution:** Use **ONE** authoritative migration file

```bash
# Use this as the single source of truth:
supabase/migrations/001_initial_schema.sql

# Delete or archive these conflicting files:
supabase/migrations/create_user_profiles.sql
```

### 2. Migration Naming Convention

```
001_initial_schema.sql          # ✅ Good - numbered, descriptive
002_audit_logs.sql              # ✅ Good
FIX_USER_SIGNUP_ERROR.sql       # ✅ Good for hotfixes
create_user_profiles.sql        # ❌ Bad - conflicts with 001
```

### 3. Test Migrations Locally First

Before running in production:

```bash
# 1. Use Supabase CLI to test migrations locally
supabase db reset

# 2. Test signup flow
npm run dev
# Try signing up with test account

# 3. Verify data in local Supabase
supabase db dump
```

### 4. Add Integration Tests

```javascript
// tests/auth.test.js
test('user signup creates profile', async () => {
  const { data, error } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'password123',
    options: {
      data: { full_name: 'Test User' }
    }
  })

  expect(error).toBeNull()

  // Check profile was created
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  expect(profile).toBeDefined()
  expect(profile.full_name).toBe('Test User')
})
```

---

## Database Schema Reference

### Correct user_profiles Schema

```sql
CREATE TABLE public.user_profiles (
  -- Primary key IS the auth user ID
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- Basic info
  email TEXT,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,

  -- Military info
  branch TEXT,
  rank TEXT,
  mos TEXT,
  years_of_service INTEGER,
  separation_date DATE,
  situation TEXT,
  separation_status TEXT, -- From signup form

  -- Location
  location TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,

  -- Other
  linkedin_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Correct handle_new_user() Trigger

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
BEGIN
  -- Extract metadata
  user_full_name := NEW.raw_user_meta_data->>'full_name';
  user_separation_status := NEW.raw_user_meta_data->>'separation_status';

  -- Create profile (id = auth user id)
  INSERT INTO public.user_profiles (id, email, full_name, separation_status)
  VALUES (NEW.id, NEW.email, user_full_name, user_separation_status);

  -- Create free subscription
  INSERT INTO public.user_subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Questions?

If you encounter any issues deploying this fix:

1. Check Supabase Dashboard → Logs for detailed errors
2. Review the verification queries output
3. Test with a brand new email address (not one that already tried to sign up)
4. Check that RLS policies are enabled: `SELECT * FROM pg_policies WHERE tablename = 'user_profiles'`

---

## Summary

- **Root Cause:** Conflicting database schemas for `user_profiles` table
- **Fix:** Run `FIX_USER_SIGNUP_ERROR.sql` migration
- **Time to Fix:** ~5 minutes
- **Impact:** Unblocks ALL new user registrations ✅
- **Testing:** Verify with test signup after deployment

**Status:** ✅ Fix ready for deployment

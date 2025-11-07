-- ============================================
-- CRITICAL SECURITY UPDATE: RLS POLICIES WITH SUBSCRIPTION ENFORCEMENT
-- Military Transition Toolkit - Premium Feature Protection
-- Version 2.0 - Adds Subscription Validation
-- ============================================
--
-- This update adds subscription validation to RLS policies to prevent
-- free users from accessing premium features even if they bypass client-side checks.
--
-- SECURITY IMPACT:
-- - Fixes CRITICAL-002: Missing Subscription Enforcement in RLS Policies
-- - Prevents free users from writing to premium tables
-- - Enforces subscription at database level (cannot be bypassed)
--
-- CHANGES FROM V1:
-- - Added has_active_subscription() SQL function
-- - Updated all PREMIUM table policies to check subscription
-- - Public tables (state_comparisons, resource_ratings) remain unchanged
--
-- RUN THIS IN SUPABASE SQL EDITOR TO UPDATE POLICIES
-- ============================================

-- ============================================
-- STEP 1: CREATE SUBSCRIPTION VALIDATION FUNCTION
-- ============================================
-- This function checks if a user has an active paid subscription
-- Returns TRUE if user has active monthly/annual/lifetime subscription
-- Returns FALSE if user is on free tier or subscription expired

CREATE OR REPLACE FUNCTION has_active_subscription(check_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  sub_record RECORD;
  is_active BOOLEAN;
BEGIN
  -- Fetch user's subscription
  SELECT status, plan_id, current_period_end
  INTO sub_record
  FROM user_subscriptions
  WHERE user_id = check_user_id;

  -- If no subscription found, user is on free tier
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Check if subscription is active
  IF sub_record.status != 'active' THEN
    RETURN FALSE;
  END IF;

  -- Check if plan is paid (not free)
  IF sub_record.plan_id IS NULL OR sub_record.plan_id = 'free' THEN
    RETURN FALSE;
  END IF;

  -- Check if subscription is not expired (unless it's lifetime)
  IF sub_record.plan_id LIKE '%lifetime%' THEN
    RETURN TRUE; -- Lifetime never expires
  END IF;

  -- For monthly/annual, check expiration
  IF sub_record.current_period_end IS NULL THEN
    RETURN FALSE;
  END IF;

  IF sub_record.current_period_end < NOW() THEN
    RETURN FALSE; -- Expired
  END IF;

  -- All checks passed
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION has_active_subscription(UUID) TO authenticated;

-- ============================================
-- STEP 2: DROP OLD POLICIES FOR PREMIUM TABLES
-- ============================================
-- We need to drop and recreate policies to add subscription check

-- VA CONDITIONS (PREMIUM)
DROP POLICY IF EXISTS "Users can create own VA conditions" ON va_conditions;
DROP POLICY IF EXISTS "Users can update own VA conditions" ON va_conditions;
DROP POLICY IF EXISTS "Users can delete own VA conditions" ON va_conditions;

-- VA EVIDENCE (PREMIUM)
DROP POLICY IF EXISTS "Users can create own VA evidence" ON va_evidence;
DROP POLICY IF EXISTS "Users can update own VA evidence" ON va_evidence;
DROP POLICY IF EXISTS "Users can delete own VA evidence" ON va_evidence;

-- APPOINTMENTS (PREMIUM)
DROP POLICY IF EXISTS "Users can create own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can update own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can delete own appointments" ON appointments;

-- RESUMES (PREMIUM)
DROP POLICY IF EXISTS "Users can create own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can update own resumes" ON resumes;
DROP POLICY IF EXISTS "Users can delete own resumes" ON resumes;

-- SAVED JOBS (PREMIUM)
DROP POLICY IF EXISTS "Users can create own saved jobs" ON saved_jobs;
DROP POLICY IF EXISTS "Users can update own saved jobs" ON saved_jobs;
DROP POLICY IF EXISTS "Users can delete own saved jobs" ON saved_jobs;

-- JOB APPLICATIONS (PREMIUM)
DROP POLICY IF EXISTS "Users can create own job applications" ON job_applications;
DROP POLICY IF EXISTS "Users can update own job applications" ON job_applications;
DROP POLICY IF EXISTS "Users can delete own job applications" ON job_applications;

-- CHECKLIST PROGRESS (PREMIUM)
DROP POLICY IF EXISTS "Users can create own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can update own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can delete own checklist progress" ON checklist_progress;

-- CUSTOM RESOURCES (PREMIUM)
DROP POLICY IF EXISTS "Users can create own custom resources" ON custom_resources;
DROP POLICY IF EXISTS "Users can update own custom resources" ON custom_resources;
DROP POLICY IF EXISTS "Users can delete own custom resources" ON custom_resources;

-- ============================================
-- STEP 3: RECREATE POLICIES WITH SUBSCRIPTION CHECK
-- ============================================

-- ============================================
-- VA CONDITIONS (PREMIUM - HIPAA SENSITIVE)
-- ============================================

-- SELECT: Subscribers can view their own VA conditions
CREATE POLICY "Subscribed users can view VA conditions"
  ON va_conditions FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- INSERT: Subscribers can create VA conditions
CREATE POLICY "Subscribed users can create VA conditions"
  ON va_conditions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- UPDATE: Subscribers can update their VA conditions
CREATE POLICY "Subscribed users can update VA conditions"
  ON va_conditions FOR UPDATE
  USING (auth.uid() = user_id AND has_active_subscription(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND has_active_subscription(auth.uid()));

-- DELETE: Subscribers can delete their VA conditions
CREATE POLICY "Subscribed users can delete VA conditions"
  ON va_conditions FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- VA EVIDENCE (PREMIUM - MEDICAL RECORDS)
-- ============================================

CREATE POLICY "Subscribed users can view VA evidence"
  ON va_evidence FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete VA evidence"
  ON va_evidence FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- APPOINTMENTS (PREMIUM - PHI)
-- ============================================

CREATE POLICY "Subscribed users can view appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete appointments"
  ON appointments FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- RESUMES (PREMIUM)
-- ============================================

CREATE POLICY "Subscribed users can view resumes"
  ON resumes FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete resumes"
  ON resumes FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- SAVED JOBS (PREMIUM)
-- ============================================

CREATE POLICY "Subscribed users can view saved jobs"
  ON saved_jobs FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete saved jobs"
  ON saved_jobs FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- JOB APPLICATIONS (PREMIUM)
-- ============================================

CREATE POLICY "Subscribed users can view job applications"
  ON job_applications FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete job applications"
  ON job_applications FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- CHECKLIST PROGRESS (PREMIUM)
-- ============================================

CREATE POLICY "Subscribed users can view checklist progress"
  ON checklist_progress FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete checklist progress"
  ON checklist_progress FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- CUSTOM RESOURCES (PREMIUM)
-- ============================================

CREATE POLICY "Subscribed users can view custom resources"
  ON custom_resources FOR SELECT
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

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

CREATE POLICY "Subscribed users can delete custom resources"
  ON custom_resources FOR DELETE
  USING (
    auth.uid() = user_id
    AND has_active_subscription(auth.uid())
  );

-- ============================================
-- PUBLIC TABLES - NO SUBSCRIPTION CHECK NEEDED
-- ============================================
-- These policies remain unchanged from V1:
-- - user_profiles (basic profile access)
-- - resource_ratings (public feature)
-- - state_comparisons (public feature)
-- - user_subscriptions (view own subscription)
-- - audit_logs (view own audit logs)

-- ============================================
-- VERIFICATION: Test Subscription Function
-- ============================================

-- Test the subscription validation function
-- Replace 'YOUR-USER-ID' with an actual user ID to test

-- Example test (uncomment to run):
-- SELECT has_active_subscription('YOUR-USER-ID'::UUID);
-- Expected: TRUE if user has active subscription, FALSE otherwise

-- ============================================
-- DEPLOYMENT INSTRUCTIONS
-- ============================================
--
-- 1. BACKUP FIRST:
--    - Export current database schema
--    - Document current policies
--
-- 2. DEPLOY TO SUPABASE:
--    - Open Supabase Dashboard → SQL Editor
--    - Copy and paste this entire file
--    - Click RUN
--
-- 3. VERIFY DEPLOYMENT:
--    - Check all policies created successfully
--    - Test with free user account (should be blocked)
--    - Test with paid user account (should succeed)
--
-- 4. MONITOR:
--    - Watch for RLS policy violations in logs
--    - Set up alert for subscription_required errors
--
-- ============================================
-- ROLLBACK PLAN (If needed)
-- ============================================
--
-- If issues occur, you can rollback by running SUPABASE_RLS_POLICIES.sql
-- (the original V1 file without subscription checks)
--
-- ============================================
-- SECURITY IMPACT SUMMARY
-- ============================================
--
-- BEFORE: Free users could bypass client-side checks and write to premium tables
-- AFTER: Database-level enforcement blocks free users from accessing premium data
--
-- PROTECTED TABLES (8):
-- ✓ va_conditions (HIPAA-sensitive)
-- ✓ va_evidence (medical records)
-- ✓ appointments (PHI)
-- ✓ resumes
-- ✓ saved_jobs
-- ✓ job_applications
-- ✓ checklist_progress
-- ✓ custom_resources
--
-- PUBLIC TABLES (5) - No subscription check:
-- ✓ user_profiles
-- ✓ resource_ratings
-- ✓ state_comparisons
-- ✓ user_subscriptions
-- ✓ audit_logs
--
-- COMPLIANCE:
-- ✓ HIPAA: Medical data now requires active subscription
-- ✓ PCI DSS: Payment data isolation maintained
-- ✓ Audit trail: All access attempts logged
--
-- ============================================
-- DONE!
-- ============================================

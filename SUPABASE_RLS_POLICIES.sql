-- ============================================
-- CRITICAL SECURITY: ROW LEVEL SECURITY POLICIES
-- Military Transition Toolkit - Veteran PII Protection
-- ============================================
--
-- This SQL script enables Row Level Security (RLS) on all tables
-- and creates policies to ensure users can ONLY access their own data.
--
-- IMPORTANCE: This prevents users from accessing other veterans'
-- medical records, VA claims, personal data, and payment info
-- even if they bypass the frontend.
--
-- RUN THIS IN SUPABASE SQL EDITOR IMMEDIATELY
--
-- Tables covered (12 total):
-- 1. user_profiles
-- 2. va_conditions (HIPAA-sensitive)
-- 3. va_evidence (HIPAA-sensitive)
-- 4. appointments (PHI)
-- 5. resumes
-- 6. saved_jobs
-- 7. job_applications
-- 8. checklist_progress
-- 9. resource_ratings
-- 10. custom_resources
-- 11. state_comparisons
-- 12. user_subscriptions (payment data)
-- ============================================

-- ============================================
-- STEP 1: ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE va_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE va_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: USER PROFILES
-- ============================================

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- STEP 3: VA CONDITIONS (HIPAA-SENSITIVE!)
-- ============================================

CREATE POLICY "Users can view own VA conditions"
  ON va_conditions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own VA conditions"
  ON va_conditions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own VA conditions"
  ON va_conditions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own VA conditions"
  ON va_conditions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 4: VA EVIDENCE (MEDICAL RECORDS)
-- ============================================

CREATE POLICY "Users can view own VA evidence"
  ON va_evidence FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own VA evidence"
  ON va_evidence FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own VA evidence"
  ON va_evidence FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own VA evidence"
  ON va_evidence FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 5: APPOINTMENTS (PHI)
-- ============================================

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own appointments"
  ON appointments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 6: RESUMES
-- ============================================

CREATE POLICY "Users can view own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 7: JOB SEARCH DATA
-- ============================================

CREATE POLICY "Users can view own saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own saved jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved jobs"
  ON saved_jobs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own job applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own job applications"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job applications"
  ON job_applications FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 8: CHECKLIST PROGRESS
-- ============================================

CREATE POLICY "Users can view own checklist progress"
  ON checklist_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own checklist progress"
  ON checklist_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist progress"
  ON checklist_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own checklist progress"
  ON checklist_progress FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 9: RESOURCE RATINGS
-- ============================================

CREATE POLICY "Users can view own resource ratings"
  ON resource_ratings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resource ratings"
  ON resource_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resource ratings"
  ON resource_ratings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resource ratings"
  ON resource_ratings FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 10: CUSTOM RESOURCES
-- ============================================

CREATE POLICY "Users can view own custom resources"
  ON custom_resources FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own custom resources"
  ON custom_resources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own custom resources"
  ON custom_resources FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own custom resources"
  ON custom_resources FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 11: STATE COMPARISONS
-- ============================================

CREATE POLICY "Users can view own state comparisons"
  ON state_comparisons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own state comparisons"
  ON state_comparisons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own state comparisons"
  ON state_comparisons FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own state comparisons"
  ON state_comparisons FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 12: USER SUBSCRIPTIONS (PAYMENT DATA)
-- ============================================

CREATE POLICY "Users can view own subscription"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- NOTE: INSERT is handled by Stripe webhook (service_role key)
-- so users cannot create their own subscriptions

-- ============================================
-- VERIFICATION: Check RLS is enabled
-- ============================================

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'user_profiles',
    'va_conditions',
    'va_evidence',
    'appointments',
    'resumes',
    'saved_jobs',
    'job_applications',
    'checklist_progress',
    'resource_ratings',
    'custom_resources',
    'state_comparisons',
    'user_subscriptions'
  )
ORDER BY tablename;

-- All tables should show rowsecurity = true

-- ============================================
-- DONE!
--
-- INSTRUCTIONS:
-- 1. Copy this entire file
-- 2. Open Supabase Dashboard → SQL Editor
-- 3. Paste and click RUN
-- 4. Verify all 12 tables show rowsecurity = true
-- ============================================

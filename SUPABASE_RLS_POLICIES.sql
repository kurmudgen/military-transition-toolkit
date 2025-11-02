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
-- ============================================

-- ============================================
-- STEP 1: ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE va_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE va_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_benefits_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: CREATE POLICIES - USER PROFILES
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

-- Resume Work Experience
CREATE POLICY "Users can view own work experience"
  ON resume_work_experience FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own work experience"
  ON resume_work_experience FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own work experience"
  ON resume_work_experience FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own work experience"
  ON resume_work_experience FOR DELETE
  USING (auth.uid() = user_id);

-- Resume Education
CREATE POLICY "Users can view own education"
  ON resume_education FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own education"
  ON resume_education FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own education"
  ON resume_education FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own education"
  ON resume_education FOR DELETE
  USING (auth.uid() = user_id);

-- Resume Skills
CREATE POLICY "Users can view own skills"
  ON resume_skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own skills"
  ON resume_skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON resume_skills FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON resume_skills FOR DELETE
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
-- STEP 8: CHECKLISTS
-- ============================================

CREATE POLICY "Users can view own checklist items"
  ON checklist_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own checklist items"
  ON checklist_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist items"
  ON checklist_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own checklist items"
  ON checklist_items FOR DELETE
  USING (auth.uid() = user_id);

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
-- STEP 9: RESOURCES
-- ============================================

CREATE POLICY "Anyone can view resources"
  ON resources FOR SELECT
  USING (true);

CREATE POLICY "Users can create own resources"
  ON resources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resources"
  ON resources FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resources"
  ON resources FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all resource ratings"
  ON resource_ratings FOR SELECT
  USING (true);

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
-- STEP 10: STATE BENEFITS COMPARISONS
-- ============================================

CREATE POLICY "Users can view own state benefit comparisons"
  ON state_benefits_comparisons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own state benefit comparisons"
  ON state_benefits_comparisons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own state benefit comparisons"
  ON state_benefits_comparisons FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own state benefit comparisons"
  ON state_benefits_comparisons FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- STEP 11: USER SUBSCRIPTIONS (PAYMENT DATA)
-- ============================================

CREATE POLICY "Users can view own subscription"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- NOTE: INSERT is handled by Stripe webhook (service_role)

-- ============================================
-- VERIFICATION: Check RLS is enabled
-- ============================================

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- All tables should show rowsecurity = true

-- ============================================
-- DONE - COPY THIS ENTIRE FILE AND PASTE INTO
-- SUPABASE SQL EDITOR, THEN CLICK RUN
-- ============================================

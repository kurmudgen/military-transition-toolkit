-- Military Transition Toolkit Database Schema
-- This migration creates all tables with Row Level Security (RLS) policies

-- =====================================================
-- 1. USER PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  branch TEXT,
  rank TEXT,
  mos TEXT,
  years_of_service INTEGER,
  separation_date DATE,
  situation TEXT, -- 'retirement', 'medboard', 'separation', 'planning'
  location TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. USER SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT, -- 'free', 'premium_monthly', 'premium_annual'
  status TEXT DEFAULT 'active', -- 'active', 'canceled', 'past_due', 'trialing'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions"
  ON public.user_subscriptions FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- 3. RESUMES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT DEFAULT 'My Resume',
  contact_info JSONB DEFAULT '{}'::jsonb,
  professional_summary TEXT,
  experience JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '{}'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resumes
CREATE POLICY "Users can view their own resumes"
  ON public.resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resumes"
  ON public.resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
  ON public.resumes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON public.resumes FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- 4. SAVED JOBS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary_range TEXT,
  job_type TEXT, -- 'full-time', 'part-time', 'contract'
  description TEXT,
  url TEXT,
  source TEXT, -- 'indeed', 'linkedin', 'usajobs', 'manual'
  notes TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_jobs
CREATE POLICY "Users can manage their own saved jobs"
  ON public.saved_jobs FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 5. JOB APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  saved_job_id UUID REFERENCES public.saved_jobs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'applied', -- 'applied', 'interview', 'offer', 'rejected', 'accepted'
  applied_date DATE,
  interview_date DATE,
  follow_up_date DATE,
  notes TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_applications
CREATE POLICY "Users can manage their own applications"
  ON public.job_applications FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 6. STATE COMPARISONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.state_comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  states JSONB DEFAULT '[]'::jsonb, -- Array of state codes
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.state_comparisons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for state_comparisons
CREATE POLICY "Users can manage their own state comparison"
  ON public.state_comparisons FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 7. VA CLAIMS CONDITIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.va_conditions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  condition_name TEXT NOT NULL,
  category TEXT, -- 'musculoskeletal', 'mental-health', etc.
  description TEXT,
  service_connected BOOLEAN DEFAULT true,
  estimated_rating INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.va_conditions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for va_conditions
CREATE POLICY "Users can manage their own VA conditions"
  ON public.va_conditions FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 8. VA EVIDENCE TRACKING TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.va_evidence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  condition_id UUID REFERENCES public.va_conditions(id) ON DELETE CASCADE NOT NULL,
  evidence_type TEXT NOT NULL, -- 'strs', 'diagnosis', 'nexus', 'buddy_statement', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'received'
  details JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.va_evidence ENABLE ROW LEVEL SECURITY;

-- RLS Policies for va_evidence
CREATE POLICY "Users can manage their own VA evidence"
  ON public.va_evidence FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 9. APPOINTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME,
  type TEXT, -- 'medical', 'vacp', 'peblo', 'tap', 'other'
  location TEXT,
  provider TEXT,
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointments
CREATE POLICY "Users can manage their own appointments"
  ON public.appointments FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 10. CHECKLIST PROGRESS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.checklist_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  checklist_type TEXT NOT NULL, -- 'retirement', 'medboard', 'separation'
  checklist_data JSONB DEFAULT '{}'::jsonb, -- Key-value pairs of item_id: boolean
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, checklist_type)
);

-- Enable RLS
ALTER TABLE public.checklist_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for checklist_progress
CREATE POLICY "Users can manage their own checklist progress"
  ON public.checklist_progress FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 11. RESOURCE RATINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resource_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resource_id TEXT NOT NULL, -- ID from the resources database
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- Enable RLS
ALTER TABLE public.resource_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resource_ratings
CREATE POLICY "Users can manage their own resource ratings"
  ON public.resource_ratings FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 12. CUSTOM RESOURCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.custom_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  description TEXT,
  category TEXT, -- 'career', 'education', 'benefits', 'mental', 'housing', 'legal'
  type TEXT, -- 'website', 'video', 'podcast', 'book', 'guide', 'app'
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.custom_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_resources
CREATE POLICY "Users can manage their own custom resources"
  ON public.custom_resources FOR ALL
  USING (auth.uid() = user_id);

-- =====================================================
-- 13. USAGE TRACKING TABLE (for feature limits)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature TEXT NOT NULL, -- 'ai_questions', 'pdf_exports', 'resume_exports'
  count INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature, date)
);

-- Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usage_tracking
CREATE POLICY "Users can view their own usage"
  ON public.usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage usage"
  ON public.usage_tracking FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- 14. ANALYTICS EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_properties JSONB DEFAULT '{}'::jsonb,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for analytics_events
CREATE POLICY "Service role can manage analytics"
  ON public.analytics_events FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_stripe_customer ON public.user_subscriptions(stripe_customer_id);
CREATE INDEX idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX idx_saved_jobs_user_id ON public.saved_jobs(user_id);
CREATE INDEX idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX idx_va_conditions_user_id ON public.va_conditions(user_id);
CREATE INDEX idx_va_evidence_user_id ON public.va_evidence(user_id);
CREATE INDEX idx_va_evidence_condition_id ON public.va_evidence(condition_id);
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_checklist_progress_user_id ON public.checklist_progress(user_id);
CREATE INDEX idx_resource_ratings_user_id ON public.resource_ratings(user_id);
CREATE INDEX idx_custom_resources_user_id ON public.custom_resources(user_id);
CREATE INDEX idx_usage_tracking_user_date ON public.usage_tracking(user_id, date);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);

-- =====================================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_state_comparisons_updated_at BEFORE UPDATE ON public.state_comparisons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_va_conditions_updated_at BEFORE UPDATE ON public.va_conditions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_va_evidence_updated_at BEFORE UPDATE ON public.va_evidence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_progress_updated_at BEFORE UPDATE ON public.checklist_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resource_ratings_updated_at BEFORE UPDATE ON public.resource_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_resources_updated_at BEFORE UPDATE ON public.custom_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_tracking_updated_at BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCTION TO CREATE DEFAULT USER PROFILE ON SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());

  INSERT INTO public.user_subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

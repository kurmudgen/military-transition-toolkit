-- Phase 2 Feature Tables Migration
-- Adds tables for Career Planner and Professional Development Tracker.
-- PCS Career Prep reuses the existing checklist_progress table (checklist_type = 'pcs_career_prep').
-- Pay Calculator and Licensing Navigator are stateless (no new tables needed).

-- =====================================================
-- 1. CAREER PLANS TABLE
-- =====================================================
-- Stores assessment answers and bookmarked careers per user.
-- One row per user (user_id is unique).
CREATE TABLE IF NOT EXISTS public.career_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  assessment_answers JSONB DEFAULT '{}'::jsonb,
  bookmarked_careers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.career_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own career plan"
  ON public.career_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career plan"
  ON public.career_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career plan"
  ON public.career_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own career plan"
  ON public.career_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_career_plans_user_id ON public.career_plans(user_id);


-- =====================================================
-- 2. PROFESSIONAL DEVELOPMENT TABLE
-- =====================================================
-- Stores skills inventory, certifications, and development goals per user.
-- One row per user (user_id is unique). Data stored as JSONB arrays.
CREATE TABLE IF NOT EXISTS public.professional_development (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  goals JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.professional_development ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own professional dev"
  ON public.professional_development FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own professional dev"
  ON public.professional_development FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own professional dev"
  ON public.professional_development FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own professional dev"
  ON public.professional_development FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_professional_development_user_id ON public.professional_development(user_id);

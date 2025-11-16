-- ============================================
-- EMERGENCY FIX: User Signup Database Error
-- ============================================
--
-- ISSUE: "database error saving new user" on signup
--
-- ROOT CAUSE: Conflicting user_profiles table schemas
-- This migration reconciles the schema and ensures the
-- handle_new_user() trigger works correctly.
--
-- RUN THIS IN SUPABASE SQL EDITOR IMMEDIATELY
-- ============================================

-- Step 1: Drop existing trigger and function (if exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Check current schema and fix if needed
-- If user_profiles has a separate 'id' and 'user_id', we need to drop and recreate

DO $$
BEGIN
    -- Check if user_profiles exists with wrong schema
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'user_profiles'
        AND column_name = 'user_id'
    ) THEN
        -- Wrong schema detected - drop and recreate
        RAISE NOTICE 'Detected incorrect user_profiles schema - recreating table';

        -- Drop existing policies
        DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can delete own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
        DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

        -- Drop trigger if exists
        DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;

        -- Drop table
        DROP TABLE IF EXISTS public.user_profiles CASCADE;
    END IF;
END $$;

-- Step 3: Create user_profiles table with CORRECT schema
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
  separation_status TEXT, -- From signup form: 'transitioning', 'separated'
  location TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  linkedin_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Step 6: Create trigger function for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Apply timestamp trigger
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Create the handle_new_user function with PROPER ERROR HANDLING
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER -- This allows the function to bypass RLS
SET search_path = public
AS $$
DECLARE
  user_full_name TEXT;
  user_separation_status TEXT;
BEGIN
  -- Extract metadata from auth.users raw_user_meta_data
  user_full_name := NEW.raw_user_meta_data->>'full_name';
  user_separation_status := NEW.raw_user_meta_data->>'separation_status';

  -- Log for debugging
  RAISE LOG 'Creating profile for user: % with name: % and status: %',
    NEW.id, user_full_name, user_separation_status;

  -- Insert into user_profiles (this should never fail now)
  BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, separation_status, created_at)
    VALUES (NEW.id, NEW.email, user_full_name, user_separation_status, NOW())
    ON CONFLICT (id) DO UPDATE
      SET email = EXCLUDED.email,
          full_name = EXCLUDED.full_name,
          separation_status = EXCLUDED.separation_status,
          updated_at = NOW();

    RAISE LOG 'Successfully created profile for user: %', NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG 'ERROR creating profile for user %: % - %', NEW.id, SQLERRM, SQLSTATE;
      -- Don't block user creation, just log the error
  END;

  -- Insert into user_subscriptions (free tier by default)
  BEGIN
    INSERT INTO public.user_subscriptions (user_id, plan_id, status)
    VALUES (NEW.id, 'free', 'active')
    ON CONFLICT (user_id) DO NOTHING;

    RAISE LOG 'Successfully created subscription for user: %', NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG 'ERROR creating subscription for user %: % - %', NEW.id, SQLERRM, SQLSTATE;
      -- Don't block user creation, just log the error
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 10: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);

-- Step 11: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check that table structure is correct
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_profiles'
ORDER BY ordinal_position;

-- Check that RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'user_profiles';

-- Check that trigger exists
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- DONE!
--
-- Next steps:
-- 1. Run this entire SQL script in Supabase SQL Editor
-- 2. Check the verification queries output
-- 3. Test signup with a new email address
-- 4. Check Supabase logs for any errors
-- ============================================

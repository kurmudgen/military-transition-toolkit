-- Phase 4: Gamification — one row per user, all progress in JSONB
CREATE TABLE IF NOT EXISTS public.gamification (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  rank_title TEXT DEFAULT 'E-1',
  streak_days INTEGER DEFAULT 0,
  last_active_date DATE,
  completed_missions JSONB DEFAULT '[]'::jsonb,
  completed_milestones JSONB DEFAULT '[]'::jsonb,
  badges JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.gamification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own gamification"
  ON public.gamification FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_gamification_user_id ON public.gamification(user_id);

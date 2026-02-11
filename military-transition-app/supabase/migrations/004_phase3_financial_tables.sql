-- Phase 3: Financial Planning Suite Tables
-- budgets, debt_tracking, savings_goals
-- One row per user, JSONB columns for flexible storage

-- ─── Budgets ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_month JSONB NOT NULL DEFAULT '{}'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own budgets"
  ON public.budgets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budgets"
  ON public.budgets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budgets"
  ON public.budgets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own budgets"
  ON public.budgets FOR DELETE
  USING (auth.uid() = user_id);

-- ─── Debt Tracking ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.debt_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  debts JSONB NOT NULL DEFAULT '[]'::jsonb,
  extra_monthly_payment NUMERIC NOT NULL DEFAULT 0,
  strategy TEXT NOT NULL DEFAULT 'avalanche' CHECK (strategy IN ('snowball', 'avalanche')),
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.debt_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own debt_tracking"
  ON public.debt_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own debt_tracking"
  ON public.debt_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own debt_tracking"
  ON public.debt_tracking FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own debt_tracking"
  ON public.debt_tracking FOR DELETE
  USING (auth.uid() = user_id);

-- ─── Savings Goals ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.savings_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emergency_fund JSONB NOT NULL DEFAULT '{}'::jsonb,
  goals JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own savings_goals"
  ON public.savings_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own savings_goals"
  ON public.savings_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own savings_goals"
  ON public.savings_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own savings_goals"
  ON public.savings_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Security: Add CHECK constraint on gamification XP to prevent negative/unreasonable values
-- Also constrains level and streak_days for defense-in-depth

ALTER TABLE public.gamification
  ADD CONSTRAINT xp_non_negative CHECK (xp >= 0);

ALTER TABLE public.gamification
  ADD CONSTRAINT level_positive CHECK (level >= 1);

ALTER TABLE public.gamification
  ADD CONSTRAINT streak_non_negative CHECK (streak_days >= 0);

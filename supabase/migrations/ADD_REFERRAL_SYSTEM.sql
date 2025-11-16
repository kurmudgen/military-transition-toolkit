-- Add referral tracking columns to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by TEXT,
ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create referrals tracking table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Create index for faster referral lookups
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_referral_code ON user_profiles(referral_code);

-- Enable RLS on referrals table
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Policies for referrals table
CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can insert referrals"
  ON referrals FOR INSERT
  WITH CHECK (true);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  base_code TEXT;
  random_suffix TEXT;
  final_code TEXT;
  counter INTEGER := 0;
BEGIN
  -- Get first part of email before @
  base_code := LOWER(SPLIT_PART(user_email, '@', 1));

  -- Limit to first 8 characters
  IF LENGTH(base_code) > 8 THEN
    base_code := SUBSTRING(base_code, 1, 8);
  END IF;

  -- Try to find a unique code
  LOOP
    -- Generate random 4-character suffix
    random_suffix := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT), 1, 4));
    final_code := base_code || random_suffix;

    -- Check if code exists
    IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE referral_code = final_code) THEN
      RETURN final_code;
    END IF;

    counter := counter + 1;
    -- Safety exit after 10 attempts
    IF counter > 10 THEN
      RETURN base_code || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 6));
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to process referral on user signup
CREATE OR REPLACE FUNCTION process_referral()
RETURNS TRIGGER AS $$
DECLARE
  referrer_user_id UUID;
BEGIN
  -- If user was referred, process the referral
  IF NEW.referred_by IS NOT NULL AND NEW.referred_by != '' THEN
    -- Find the referrer's user ID
    SELECT user_id INTO referrer_user_id
    FROM user_profiles
    WHERE referral_code = NEW.referred_by;

    IF referrer_user_id IS NOT NULL THEN
      -- Increment referrer's count
      UPDATE user_profiles
      SET referral_count = referral_count + 1
      WHERE user_id = referrer_user_id;

      -- Create referral record
      INSERT INTO referrals (referrer_id, referred_id)
      VALUES (referrer_user_id, NEW.user_id)
      ON CONFLICT (referrer_id, referred_id) DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to process referrals
DROP TRIGGER IF EXISTS trigger_process_referral ON user_profiles;
CREATE TRIGGER trigger_process_referral
  AFTER INSERT OR UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION process_referral();

-- Backfill referral codes for existing users
UPDATE user_profiles
SET referral_code = generate_referral_code(
  (SELECT email FROM auth.users WHERE auth.users.id = user_profiles.user_id)
)
WHERE referral_code IS NULL;

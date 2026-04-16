
-- 1. Add columns to waitlist_signups
ALTER TABLE public.waitlist_signups
  ADD COLUMN referral_code text UNIQUE DEFAULT gen_random_uuid()::text,
  ADD COLUMN referred_by text,
  ADD COLUMN referral_count integer NOT NULL DEFAULT 0;

-- Backfill existing rows with unique referral codes
UPDATE public.waitlist_signups SET referral_code = gen_random_uuid()::text WHERE referral_code IS NULL;

-- Make referral_code NOT NULL after backfill
ALTER TABLE public.waitlist_signups ALTER COLUMN referral_code SET NOT NULL;

-- 2. Create referral_rewards table
CREATE TABLE public.referral_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  referral_code text NOT NULL,
  referral_count integer NOT NULL DEFAULT 3,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_rewards ENABLE ROW LEVEL SECURITY;

-- No public read
CREATE POLICY "No public read on referral_rewards"
  ON public.referral_rewards FOR SELECT
  TO public
  USING (false);

-- No public insert (only trigger)
CREATE POLICY "No public insert on referral_rewards"
  ON public.referral_rewards FOR INSERT
  TO public
  WITH CHECK (false);

-- 3. Create trigger function
CREATE OR REPLACE FUNCTION public.handle_referral()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_row waitlist_signups%ROWTYPE;
  new_count integer;
BEGIN
  -- Only process if referred_by is set
  IF NEW.referred_by IS NOT NULL AND NEW.referred_by <> '' THEN
    -- Increment referral_count on the referrer
    UPDATE public.waitlist_signups
      SET referral_count = referral_count + 1
      WHERE referral_code = NEW.referred_by
      RETURNING * INTO referrer_row;

    -- If referrer found and now has 3+ referrals, add to rewards (if not already there)
    IF referrer_row.id IS NOT NULL AND referrer_row.referral_count >= 3 THEN
      INSERT INTO public.referral_rewards (email, referral_code, referral_count)
        VALUES (referrer_row.email, referrer_row.referral_code, referrer_row.referral_count)
        ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- 4. Create trigger
CREATE TRIGGER on_waitlist_signup_referral
  AFTER INSERT ON public.waitlist_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_referral();

-- 5. Add unique constraint for referral_rewards to prevent duplicates
ALTER TABLE public.referral_rewards ADD CONSTRAINT unique_referral_reward UNIQUE (referral_code);

-- 6. Allow public to read their own referral_code and referral_count after signup
CREATE POLICY "Users can read own signup by email"
  ON public.waitlist_signups FOR SELECT
  TO public
  USING (true);

-- Drop the old restrictive select policy
DROP POLICY IF EXISTS "No public read access" ON public.waitlist_signups;

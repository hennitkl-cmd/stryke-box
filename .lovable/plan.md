

## Plan: Waitlist Referral System

### How it works (user perspective)
1. Someone signs up for the waitlist with their email
2. After signup, they see a **unique referral link** they can copy and share (e.g. `stryke-box.lovable.app/?ref=abc123`)
3. When a friend visits that link and signs up, the referral is tracked automatically
4. The referrer's count goes up. Once they hit **3 successful referrals**, they get added to a separate "rewards" table

### Database changes (2 new tables, 1 table update)

**1. Update `waitlist_signups` table**
- Add `referral_code` column (unique text, auto-generated)
- Add `referred_by` column (nullable, references another signup's referral_code)
- Add `referral_count` column (integer, default 0)

**2. New table: `referral_rewards`**
- `id`, `email`, `referral_code`, `referral_count`, `created_at`
- Populated automatically when someone hits 3 referrals
- RLS: insert allowed (via trigger), no public read

**3. Database trigger**
- On insert into `waitlist_signups` with a `referred_by` value: increment the referrer's `referral_count`
- When `referral_count` reaches 3: insert into `referral_rewards`

### Frontend changes

**1. Read `?ref=` query param on page load**
- Store in React state/context so it's available when the CTA form submits

**2. CTASection — after signup success**
- Show the user's unique referral link with a copy button
- Show referral progress (e.g. "0/3 friends referred")

**3. New route: `/?ref=abc123`**
- No new page needed — just read the query param on the Index page and pass it down

### Files to create/modify

| File | Change |
|---|---|
| Migration SQL | Add columns to `waitlist_signups`, create `referral_rewards`, create trigger |
| `src/pages/Index.tsx` | Read `?ref=` query param, pass to CTA |
| `src/components/landing/CTASection.tsx` | Submit `referred_by`, show referral link + progress after signup |

### Security
- RLS on `referral_rewards`: insert via trigger only (no public insert), no public read
- `waitlist_signups` referral_count updates happen server-side via trigger, not client
- Referral codes are random UUIDs — not guessable


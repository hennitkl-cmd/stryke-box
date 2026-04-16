

## Plan: Notification Badges on Waitlist Buttons

Add a small animated notification badge (gift icon + "Earn Rewards") on all three "Join Waitlist" buttons to promote the referral system.

### What it looks like

Each button gets a small red/cherry notification dot or pill positioned at the top-right corner — similar to app notification badges. The badge will:
- Show a gift icon (🎁) or small text like "🎁 3 = Reward"  
- Pulse subtly to draw attention
- Be positioned as an absolute overlay on the button wrapper

### Buttons to update (3 total)

1. **Navigation — Desktop** (line ~107-117 in Navigation.tsx): "Join Waitlist" button in the floating nav pill
2. **Navigation — Mobile** (line ~179-188 in Navigation.tsx): "Join Waitlist" button in the mobile menu overlay  
3. **Hero Section** (line ~153 in Hero.tsx): The main CTA button below the headline

### Implementation

**1. Create a `NotificationBadge` component** (`src/components/landing/NotificationBadge.tsx`)
- Small absolute-positioned pill/dot with a pulsing animation
- Shows a Gift icon or "🎁 Rewards" text
- Cherry red background, white text, rounded-full
- Uses Framer Motion for a subtle pulse/bounce animation

**2. Update `Navigation.tsx`**
- Wrap both "Join Waitlist" buttons in a `relative` container
- Add `<NotificationBadge />` positioned at top-right of each button

**3. Update `Hero.tsx`**
- Same pattern: wrap the CTA button in a `relative` container with `<NotificationBadge />`

### Files

| File | Change |
|---|---|
| `src/components/landing/NotificationBadge.tsx` | New — small animated badge component |
| `src/components/landing/Navigation.tsx` | Add badge to both desktop + mobile "Join Waitlist" buttons |
| `src/components/landing/Hero.tsx` | Add badge to the Hero CTA button |




# Expand Customer Segmentation Content

The current segmentation feature is working, but the user needs more extensive content changes for each customer type. This plan adds dynamic headlines and expands the feature cards to 4 per segment with the full copy provided.

---

## Current State vs Required

| Element | Current | Required |
|---------|---------|----------|
| Hero headline | Static "MASTER YOUR IMPACT" | Dynamic per segment |
| Hero subheadline | Dynamic (working) | Dynamic with expanded copy |
| CTA button | Dynamic (working) | No change needed |
| Feature cards | 3 cards per segment | 4 cards per segment |
| Card descriptions | Short versions | Full detailed versions |

---

## Changes to Make

### 1. Hero Section - Add Dynamic Headlines

Add segment-specific main headlines:
- **Boxer**: "BECOME UNDENIABLE"  
- **Coach**: "COACH WITH CERTAINTY"
- **Promoter**: "THE FUTURE OF FIGHT ENTERTAINMENT"
- **Fan**: "BET ON SCIENCE, NOT HYPE"

The headline will animate when switching segments, similar to the subheadline.

### 2. Feature Grid - Expand to 4 Cards

Add a 4th card to each segment and update descriptions to match the user's specifications:

**Boxer (4 cards):**
1. Competitive Edge - "Your opponents train blind. You train with precision data..."
2. Prove Your Worth - "No more politics or subjective opinions..."
3. 24/7 AI Coaching - "Get instant feedback on technique flaws..."
4. Measurable Progress - "See your improvement week-over-week..."

**Coach (4 cards):**
1. Objective Performance Tracking - "Monitor every fighter's progress..."
2. Real-Time Training Adjustments - "See fatigue, technique breakdown..."
3. Spot Hidden Weaknesses - "Find technique flaws invisible to the human eye..."
4. Accelerate Development - "Use data to create personalized training programs..."

**Promoter (4 cards):**
1. Next-Gen Broadcast Experience - "Display live punch speed, impact force..."
2. Objective Scoring Support - "Reduce rigged-fight accusations..."
3. Monetize Fight Data - "License real-time strike data..."
4. Keep Fans Hooked - "Live leaderboards, fighter power rankings..."

**Fan (4 cards):**
1. Data-Driven Betting Edge - "Access punch force, fatigue patterns..."
2. Real-Time Fight Analysis - "Watch fights with live overlay stats..."
3. Deep Fighter Analytics - "See historical performance data..."
4. Next-Gen Betting Markets - "Bet on round-by-round metrics..."

### 3. Update Grid Layout

Change from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4` to accommodate 4 cards cleanly across different screen sizes.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/Hero.tsx` | Add `headline` to heroContent object, wrap headline in AnimatePresence |
| `src/components/landing/FeatureGrid.tsx` | Update featuresByCustomer with 4 cards and full descriptions, adjust grid layout |

---

## Technical Implementation

### Hero.tsx Changes

```typescript
// Update heroContent to include headline
const heroContent: Record<CustomerType, { 
  headline: string; 
  subheadline: string; 
  ctaText: string 
}> = {
  boxer: {
    headline: "BECOME UNDENIABLE",
    subheadline: "Hard data proves your power...",
    ctaText: "Join the Waitlist",
  },
  // ... other segments
};

// Make headline dynamic with animation
<AnimatePresence mode="wait">
  <motion.h1 key={customerType} ...>
    <span>{content.headline}</span>
  </motion.h1>
</AnimatePresence>
```

### FeatureGrid.tsx Changes

- Add 4th feature to each segment array
- Update all descriptions to match user specifications  
- Add new icons: `Search`, `TrendingUp`, `Dices`, `Scale`, `Flame`, `Wallet`
- Update grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

---

## Animation Behavior

All dynamic content will use:
- `AnimatePresence mode="wait"` for clean transitions
- 0.3s fade duration
- `key={customerType}` to trigger re-animation on change

The existing smooth transitions will apply to:
- Main headline (new)
- Subheadline (already working)
- CTA button text (already working)
- All 4 feature cards (expanding from 3)




# Customer Segmentation Feature

Add dynamic content switching based on customer type (Boxer, Coach, Promoter, Fan) to personalize the landing page experience.

---

## Overview

This feature adds a role selector below the hero headline that dynamically updates content across the page based on the selected customer segment. The same beautiful design is maintained, but the messaging adapts to speak directly to each audience's needs.

---

## Architecture Approach

Since multiple components need to share the selected customer type, we'll use React Context to manage this state globally. This avoids prop drilling and keeps the code clean.

```text
┌─────────────────────────────────────────────────────┐
│                 CustomerTypeContext                  │
│        (Manages selected: boxer/coach/promo/fan)    │
└─────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌───────────┐   ┌───────────┐
    │   Hero   │    │ FeatureGrid│   │CTASection │
    │(selector │    │  (cards)   │   │ (button   │
    │+ subhead)│    │            │   │   text)   │
    └──────────┘    └───────────┘   └───────────┘
```

---

## What Will Change

### 1. Role Selector Component (in Hero)
- 4 horizontal buttons below "MASTER YOUR IMPACT"
- Buttons: "I'm a Boxer" | "I'm a Coach" | "I'm a Promoter" | "I'm a Fan"
- Dark background with red outline, selected button fills with red
- Stacks vertically on mobile (2x2 grid)
- Smooth transition when switching

### 2. Hero Subheadline
Updates based on selection:
- **Boxer**: "Hard data proves your power. Objective metrics earn respect..."
- **Coach**: "Stop guessing. Start measuring..."
- **Promoter**: "Live strike data. Transparent scoring..."
- **Fan**: "Get real-time strike data, fighter biometrics..."

### 3. Hero CTA Button
- **Boxer**: "Join the Waitlist"
- **Coach**: "Request Demo"  
- **Promoter**: "Partner With Us"
- **Fan**: "Get Early Access"

### 4. Feature Cards
Complete card content updates for each segment with unique titles, descriptions, and relevant icons.

### 5. CTA Section Button
Matches the hero CTA text for consistency.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/context/CustomerTypeContext.tsx` | Create | React Context for managing selected customer type |
| `src/components/landing/RoleSelector.tsx` | Create | Button group component for selecting customer type |
| `src/components/landing/Hero.tsx` | Modify | Add RoleSelector, dynamic subheadline and CTA text |
| `src/components/landing/FeatureGrid.tsx` | Modify | Dynamic cards based on customer type |
| `src/components/landing/CTASection.tsx` | Modify | Dynamic button text |
| `src/pages/Index.tsx` | Modify | Wrap with CustomerTypeProvider |

---

## Technical Details

### CustomerTypeContext
- TypeScript type: `'boxer' | 'coach' | 'promoter' | 'fan'`
- Default value: `'boxer'`
- Custom hook: `useCustomerType()` for easy access

### Content Data Structure
```typescript
const content = {
  boxer: {
    subheadline: "Hard data proves your power...",
    ctaText: "Join the Waitlist",
    features: [
      { title: "Competitive Edge", description: "...", icon: Target },
      // ...
    ]
  },
  // ... other segments
}
```

### Animations
- `AnimatePresence` with fade transition (0.3s) for content changes
- Content wrapped in `motion.div` with `key` prop to trigger re-animation

### Responsive Design
- Desktop: 4 buttons in a row
- Mobile: 2x2 grid layout for role selector

---

## What Stays the Same

- Page structure and section order
- All existing colors, fonts, and styling
- Navigation component
- ProductShowcase section
- ScienceSection (charts)
- Footer
- All glassmorphism and animation effects


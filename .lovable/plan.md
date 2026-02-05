
# Header Redesign + Phone Mockups for Feature Grid

Two visual enhancements inspired by the orreco.ai reference screenshots.

---

## Part 1: Header Redesign (orreco.ai Style)

### Current vs Target Design

| Element | Current | Target (orreco.ai style) |
|---------|---------|--------------------------|
| Container | Full-width, transparent | Floating pill/rounded rectangle with border |
| Border | Bottom border on scroll | Always visible rounded border |
| Shape | Standard rectangular | Pill-shaped with large border-radius |
| CTA Button | Red filled button | Outlined/ghost button with rounded border |
| Position | Edge-to-edge | Centered with padding from edges |

### Design Details

The orreco.ai header has these key characteristics:
- Pill-shaped container with subtle border
- Floats slightly below top of page
- Dark background with glassmorphism effect
- Navigation links centered
- CTA button has outline style (not filled)
- Clean, minimal look with rounded corners (full pill shape)

### Implementation

**File:** `src/components/landing/Navigation.tsx`

Changes:
1. Add a wrapper container that creates the "floating pill" effect
2. Use `rounded-full` or large `rounded-3xl` for the pill shape
3. Add subtle border that's always visible
4. Change CTA button from filled red to outline style
5. Add slight margin from top edge (`mt-4`) to create floating effect
6. Keep all existing functionality (scroll behavior, mobile menu)

---

## Part 2: Phone Mockups in Feature Grid

### Concept

Transform the "Train Like a Pro" section to include phone mockup visuals showing app data, similar to screenshots 2-3. Instead of just text cards, show the data visualizations in styled phone frames.

### Design Approach

Since we don't have actual app screenshots, we'll create **CSS-based phone mockups** with placeholder UI elements that represent STRYKE app screens:

1. **Training Data Screen** - Shows weekly stats, distance, accelerations
2. **Live Metrics Screen** - Real-time punch data visualization  
3. **Progress Chart Screen** - Week/Month/Year fatigue tracking

### Layout Options

**Option A: Replace current cards entirely**
- 3 phone mockups in a row with text descriptions below each
- Similar to screenshot 3 layout

**Option B: Hybrid approach**
- Keep 2 feature cards on the left
- Add phone mockup showcase on the right
- Best of both worlds

**Recommended: Option A** - Matches the reference design more closely

### Implementation

**File:** `src/components/landing/FeatureGrid.tsx`

Changes:
1. Create a new `PhoneMockup` component for the phone frame styling
2. Add CSS for the phone bezel, notch, and screen area
3. Create 3 mock app screens with:
   - Gradient backgrounds
   - Metric displays (numbers, charts represented via CSS)
   - Period selectors (Week/Month/Year tabs)
4. Add title + description below each phone
5. Keep section header and animate on scroll
6. Make responsive (stack on mobile)

### Phone Screen Content

**Screen 1 - "At a glance"**
- Weekly training summary
- Stats: Distance, Accelerations, Average
- Line chart placeholder

**Screen 2 - "Optimize performance"**  
- Sleep/recovery donut chart visual
- Light/REM metrics display
- Navigation bar at bottom

**Screen 3 - "Understand your body"**
- Week/Month/Year toggle
- Fatigue line chart
- Daily breakdown (Fri-Thu)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/Navigation.tsx` | Pill-shaped floating container, outline CTA button |
| `src/components/landing/FeatureGrid.tsx` | Add phone mockups with CSS-based app screens |
| `src/index.css` | Add phone-mockup utility classes |

---

## Technical Details

### Navigation Changes

```text
Current structure:
┌──────────────────────────────────────────────────────┐
│ [Logo]                    Links        [CTA Button]  │
└──────────────────────────────────────────────────────┘

New structure:
    ┌──────────────────────────────────────────────┐
    │ [Logo]            Links         [CTA Button] │
    └──────────────────────────────────────────────┘
         ↑ Floating pill with rounded corners
```

Key CSS classes:
- `rounded-full` for pill shape
- `border border-white/10` for subtle outline
- `bg-background/80 backdrop-blur-xl` for glass effect
- `mx-auto max-w-5xl` to contain width
- `mt-4` for floating effect from top

### Phone Mockup Structure

```text
┌─────────────────────────────────┐
│         ┌───────────┐           │  ← Phone bezel
│         │  (notch)  │           │
│  ┌──────┴───────────┴──────┐    │
│  │                         │    │
│  │    App Screen Content   │    │
│  │    - Metrics            │    │
│  │    - Charts             │    │
│  │    - Navigation         │    │
│  │                         │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

CSS approach:
- Outer div with rounded corners and dark gradient for bezel
- Inner div for screen area with content
- Absolute positioned notch element
- Flexbox/Grid for screen content layout

---

## Responsive Behavior

**Desktop (lg+)**: 3 phones in a row
**Tablet (md)**: 3 phones, slightly smaller
**Mobile**: Stack vertically or show 1 at a time with carousel

---

## Customer Segmentation Consideration

The phone mockup content could potentially change based on customer type:
- **Boxer**: Training metrics screen
- **Coach**: Multi-athlete dashboard
- **Promoter**: Broadcast stats view
- **Fan**: Betting/analytics view

For initial implementation, we'll use static screens that work for all segments. Dynamic screens can be added as a future enhancement.

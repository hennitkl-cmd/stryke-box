

# Splash Title + Section Reorder + Segment-Specific Content

Three major changes to the landing page flow and content display.

---

## 1. Splash Title Page

Create a new intro overlay that displays "Don't just watch the fight - read it" and fades away on scroll or click.

### Design
- Full-screen overlay covering the viewport
- Text uses `text-gradient-red` styling (same as hero headlines)
- Font: `font-black` with large responsive sizing (`text-4xl md:text-6xl lg:text-7xl`)
- Centered vertically and horizontally
- Fades out smoothly when user scrolls or clicks
- Once dismissed, stays hidden for the session

### Implementation
- Create new component: `src/components/landing/SplashTitle.tsx`
- Uses Framer Motion for fade animation
- Listens for scroll and click events to trigger fade-out
- Add to Index.tsx before Navigation

---

## 2. Reorder Sections

Move "Core Capabilities" (FeatureGrid) and "Data-Driven Performance" (ScienceSection) above "The Technology" (ProductShowcase).

### New Order in Index.tsx
```text
1. SplashTitle (new)
2. Navigation
3. Hero
4. FeatureGrid (Core Capabilities) ← moved up
5. ScienceSection (Data-Driven Performance) ← moved up  
6. ProductShowcase (The Technology) ← moved down
7. CTASection
8. Footer
```

---

## 3. Segment-Specific Content Display

Show phone mockups only for Boxer and Coach. Show a benefits list for Promoter and Fan.

### Boxer & Coach
- Keep the current phone mockup carousel/grid display
- No changes to their content

### Promoter & Fan
- Replace phone mockups with a benefits list layout
- 3-column grid on desktop, single column on mobile
- Each benefit card includes:
  - Icon (from Lucide)
  - Title
  - Description
- Glass-card styling consistent with the rest of the site

### Promoter Benefits
| Icon | Title | Description |
|------|-------|-------------|
| Tv | Live Data Overlay | Real-time punch stats displayed during broadcasts |
| BarChart3 | Event Analytics | Track performance metrics across your entire fight card |
| TrendingUp | Revenue Growth | Monetize exclusive data access for fans and bettors |

### Fan Benefits
| Icon | Title | Description |
|------|-------|-------------|
| Scale | Fighter Comparison | Head-to-head stats on power, speed, and accuracy |
| Activity | Live Performance | Real-time fatigue and stamina tracking during fights |
| Target | Betting Insights | Data-driven KO probability and round predictions |

---

## File Changes

| File | Change |
|------|--------|
| `src/components/landing/SplashTitle.tsx` | **New file** - Full-screen intro with fade animation |
| `src/pages/Index.tsx` | Add SplashTitle, reorder sections |
| `src/components/landing/FeatureGrid.tsx` | Add conditional rendering: phone mockups for Boxer/Coach, benefits list for Promoter/Fan |

---

## Technical Details

### SplashTitle Component
```text
- State: isVisible (starts true)
- useEffect: Listen for scroll (window.scrollY > 50) or click to set isVisible = false
- AnimatePresence wrapper for smooth exit
- motion.div with opacity/scale animation
- Positioned fixed, full viewport, high z-index
- Background matches site background color
```

### FeatureGrid Conditional Logic
```text
const showPhoneMockups = customerType === "boxer" || customerType === "coach";

{showPhoneMockups ? (
  // Existing phone mockup carousel/grid code
) : (
  // New benefits list grid
)}
```


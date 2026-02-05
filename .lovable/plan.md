
# Liquid Glass Effect for Feature Cards

Transform the feature cards in the "Built for Champions" section to have a modern liquid glass aesthetic with enhanced depth, reflections, and dynamic visual effects.

---

## Visual Concept

The liquid glass effect will create cards that appear to have flowing, refractive qualities with:
- Stronger backdrop blur for a frosted glass look
- Gradient overlays that simulate light refraction
- Animated shimmer/highlight effect on hover
- Softer, more organic borders with gradient edges
- Subtle inner glow for depth

---

## Changes

### 1. Create new `.liquid-glass` utility class
Add to `src/index.css`:
- Increased backdrop blur (`backdrop-blur-2xl` instead of `xl`)
- Gradient border effect using a pseudo-element
- Inner highlight/reflection gradient
- Animated shimmer keyframe for hover state

### 2. Update FeatureCard component
Replace `glass-card` with new liquid glass styling:
- Relative positioning for pseudo-elements
- Gradient overlay for light refraction effect
- Animated highlight sweep on hover
- Enhanced shadow with color tinting

---

## Technical Details

### New CSS in `src/index.css`

```css
.liquid-glass {
  @apply relative bg-white/[0.03] backdrop-blur-2xl rounded-2xl overflow-hidden;
  border: 1px solid transparent;
  background-image: linear-gradient(
    135deg,
    rgba(255,255,255,0.1) 0%,
    rgba(255,255,255,0.02) 50%,
    rgba(255,255,255,0.05) 100%
  );
  background-origin: border-box;
}

.liquid-glass::before {
  /* Gradient border effect */
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.2),
    rgba(255,255,255,0.05),
    rgba(255,255,255,0.1)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.liquid-glass::after {
  /* Shimmer highlight effect */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.08) 45%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.08) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.liquid-glass:hover::after {
  transform: translateX(100%);
}
```

### Component Update in `ProductShowcase.tsx`

Replace line 76:
```tsx
// Before
<div className="glass-card p-4 h-full group hover:border-primary/40 ...">

// After  
<div className="liquid-glass p-4 h-full group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col">
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Add `.liquid-glass` utility with pseudo-elements and shimmer animation |
| `src/components/landing/ProductShowcase.tsx` | Replace `glass-card` with `liquid-glass` on the feature cards |

---

## Result

Cards will have:
- A subtle gradient that simulates light passing through glass
- A gradient border that shifts from brighter to softer edges
- A smooth shimmer effect that sweeps across on hover
- Enhanced depth perception with softer backdrop blur

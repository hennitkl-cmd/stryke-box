

# Fix Excessive Spacing in Product Hero Section

## Problem
The `ProductHero3D` section uses `h-[200vh]` (line 28) with a `sticky` inner container. This was designed for scroll-driven 3D animation effects but now just creates a huge empty gap between the STRYKE Sensor section and the Hero section below it.

## Fix — `src/components/landing/ProductHero3D.tsx`

1. **Line 28**: Change `h-[200vh]` to `h-screen` — the section only needs one viewport height since there's no scroll-driven animation anymore
2. **Line 31**: Remove `sticky top-0` from the inner div since it's no longer needed without the scroll-through effect
3. **Lines 10-16**: Remove the `useScroll` / `useTransform` hooks and the `opacity`/`scale` scroll transforms since they depend on the extra height
4. **Line 30**: Remove the `style={{ opacity, scale }}` from the motion div

This reduces the section to a single full-screen hero with the image, button, and title — no wasted space.


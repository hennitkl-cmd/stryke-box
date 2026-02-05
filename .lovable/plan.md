
# Redesign "Built for Champions" Layout

Change the section from a stacked layout (image on top, cards below) to a side-by-side layout with the STRYKE sensor image on the left and compact feature cards on the right.

---

## New Layout Structure

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Built for Champions                          │
├───────────────────────────┬─────────────────────────────────────┤
│                           │  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│                           │  │High-Freq│ │AI-Driven│ │Real-Time││
│    [STRYKE Sensor         │  └─────────┘ └─────────┘ └─────────┘│
│     Image with Glow]      │  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│                           │  │Biometric│ │Ring Pos │ │ History ││
│                           │  └─────────┘ └─────────┘ └─────────┘│
└───────────────────────────┴─────────────────────────────────────┘
```

---

## Changes

### 1. Create two-column layout
- Use a flex container with `lg:flex-row` for side-by-side on desktop
- Left column: Product image (roughly 40% width)
- Right column: Feature cards grid (roughly 60% width)
- Stack vertically on mobile

### 2. Make cards more compact
- Reduce card padding from `p-6` to `p-4`
- Reduce icon size from `w-12 h-12` to `w-10 h-10`
- Reduce title font size from `text-lg` to `text-base`
- Keep descriptions at `text-xs` with line-clamp

### 3. Adjust cards grid
- Change from `lg:grid-cols-3` to `grid-cols-2 lg:grid-cols-3`
- 6 cards arranged in 2 rows of 3 on larger screens
- 3 rows of 2 on tablets
- Single column on mobile

---

## Technical Details

**File:** `src/components/landing/ProductShowcase.tsx`

1. Replace the stacked layout with a flex row container
2. Update FeatureCard component with smaller dimensions
3. Adjust the cards grid to fit beside the image
4. Keep the glow effect and animations intact

---

## Visual Comparison

| Element | Before | After |
|---------|--------|-------|
| Layout | Stacked (image top, cards below) | Side-by-side (image left, cards right) |
| Card padding | `p-6` | `p-4` |
| Icon container | `w-12 h-12` | `w-10 h-10` |
| Icon size | `w-6 h-6` | `w-5 h-5` |
| Title size | `text-lg` | `text-base` |
| Image width | `max-w-md` | `max-w-sm` (slightly smaller) |

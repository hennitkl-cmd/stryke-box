

# Expand "Built for Champions" Feature Cards

Add two new feature cards with longer descriptions and implement a "read more" expand functionality to handle the extended content gracefully.

---

## New Cards to Add

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 5 | `MapPin` | Ring Positioning Intelligence | Ultra-wideband sensors track position with 10cm accuracy. Analyze ring control, movement patterns, and heatmaps. |
| 6 | `History` | Complete Fight History Archive | Every punch stored forever. Track improvement over months/years with historical graphs and career analytics. |

---

## Layout Changes

**Current**: 2-column grid with 4 cards beside the product image

**New**: Full-width 3-column grid below the product section for all 6 cards

This gives more space for the longer descriptions while maintaining visual balance.

---

## Implementation Details

### 1. Update specs array with new cards
Add two new entries with `MapPin` and `History` icons from lucide-react.

### 2. Restructure layout
- Keep product image centered/featured at top
- Move all 6 feature cards to a full-width 3-column grid below
- Cards will stack to 2 columns on tablet, 1 column on mobile

### 3. Handle long descriptions
- Truncate descriptions to 3 lines by default using `line-clamp-3`
- Add expand/collapse functionality on hover or click
- Use state to track which card is expanded

### 4. Styling adjustments
- Slightly smaller description text (`text-xs` instead of `text-sm`) for longer content
- Consistent card heights with flex layout
- Smooth transition for expand animation

---

## Technical Changes

```text
File: src/components/landing/ProductShowcase.tsx

1. Add imports:
   - MapPin, History from lucide-react
   - useState from react

2. Add 2 new items to specs array:
   - Ring Positioning Intelligence (MapPin icon)
   - Complete Fight History Archive (History icon)

3. Restructure JSX layout:
   - Product image section (centered)
   - Full-width 3-column grid for all 6 cards below

4. Add expand state and toggle logic for long descriptions
   - Truncate with line-clamp-3 by default
   - Show "Read more" link that expands on click
```

---

## Visual Result

```text
┌─────────────────────────────────────────────────┐
│          Built for Champions                    │
│    [   STRYKE Sensor Image   ]                  │
├─────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ High-Freq│  │ AI-Driven│  │ Real-Time│      │
│  │ Sensors  │  │ Insights │  │ Feedback │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Biometric │  │  Ring    │  │ Fight    │      │
│  │Integratn │  │Positioning│ │ History  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## Files Changed

| File | Changes |
|------|---------|
| `src/components/landing/ProductShowcase.tsx` | Add 2 new specs, restructure layout, add expand functionality |


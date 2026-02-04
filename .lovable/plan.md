

# Add "More Features" Notice to Science Section

A simple enhancement to indicate there are additional features beyond the three data visualization cards.

---

## What We'll Add

A subtle, animated notice below the three chart cards that hints at more features to explore. This will encourage users to continue scrolling.

---

## Implementation Details

**Location**: After the charts grid (line 197) in `src/components/landing/ScienceSection.tsx`

**Design**: 
- Centered text with a subtle downward chevron/arrow icon
- Muted styling that fits the premium aesthetic
- Scroll-reveal animation matching the existing section animations
- Text like "And many more insights to discover..." or "Explore more features below"

**Technical approach**:
- Add a new `motion.div` after the charts grid
- Include the `ChevronDown` icon from lucide-react
- Apply a subtle bounce or float animation to the arrow
- Use muted foreground colors to keep focus on the main content

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/landing/ScienceSection.tsx` | Add animated notice with icon after the charts grid |


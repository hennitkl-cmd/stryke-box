
# Remove Glass Card and Hover Zoom from Product Image

Simple styling cleanup to show the STRYKE sensor image without any container styling or hover effects.

---

## Changes

**File: `src/components/landing/ProductShowcase.tsx`**

| Line | Current | New |
|------|---------|-----|
| 67 | `<div className="glass-card p-4 md:p-6 relative overflow-hidden group">` | `<div className="relative">` |
| 71 | `className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-105"` | `className="w-full h-auto"` |
| 73-74 | Hover glow effect div | Remove entirely |

---

## Result

The STRYKE sensor image will display cleanly without:
- Grey glass-card background/border
- Padding around the image
- Hover zoom effect
- Hover glow overlay

Just the raw product photo as intended.

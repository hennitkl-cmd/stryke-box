

# Keep Phone Proportions, Crop Video to Fit

Revert the aspect ratio back to the original phone proportions. The `object-cover` class on the videos will handle cropping them to fit the screen area naturally.

---

## The Change

**File: `src/components/landing/PhoneMockup.tsx`**

Revert line 43 back to the original aspect ratio:

| Current | Revert To |
|---------|-----------|
| `aspect-[576/968]` | `aspect-[9/19.5]` |

```tsx
{/* Screen content */}
<div className="aspect-[9/19.5] overflow-hidden">
  {children}
</div>
```

---

## How It Works

- The phone mockup keeps its normal phone-like proportions
- The videos use `object-cover` which scales and crops them to fill the screen area
- Some video content may be cropped, but the phone looks natural

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/landing/PhoneMockup.tsx` | Revert aspect ratio from `576/968` back to `9/19.5` |


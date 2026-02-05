

# Adjust Phone Mockup Screen to Match Video Dimensions

Update the phone mockup aspect ratio to match your video dimensions (576 × 968px) so the full video content is visible without cropping.

---

## The Problem

| Current | Your Videos |
|---------|-------------|
| `aspect-[9/19.5]` = ~0.46:1 | 576 × 968 = ~0.595:1 |
| Taller, narrower screen | Shorter, wider screen |

The current aspect ratio is taller than your videos, causing `object-cover` to crop the sides of the video content.

---

## The Fix

**File: `src/components/landing/PhoneMockup.tsx`**

Change the screen content aspect ratio from `aspect-[9/19.5]` to `aspect-[576/968]` (which simplifies to `aspect-[72/121]`):

| Line | Current | New |
|------|---------|-----|
| 43 | `aspect-[9/19.5]` | `aspect-[576/968]` |

```tsx
{/* Screen content */}
<div className="aspect-[576/968] overflow-hidden">
  {children}
</div>
```

---

## Visual Impact

The phone mockup will become slightly shorter/wider to match your video dimensions exactly. This ensures:
- No video content is cropped
- Videos fill the screen area completely
- The aspect ratio matches your screen recordings perfectly

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/landing/PhoneMockup.tsx` | Update aspect ratio from `9/19.5` to `576/968` on line 43 |


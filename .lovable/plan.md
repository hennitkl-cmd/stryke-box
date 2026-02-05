

# Replace Boxer Phone Mockup Screens with Real Screenshots

Integrate the 3 uploaded STRYKE app screenshots into the phone mockups for the Boxer customer segment.

---

## Screenshot Mapping

| Screenshot | Current Screen | New Purpose |
|------------|----------------|-------------|
| Screenshot 1 (Session summary with 45:32 duration, 687 calories, punch stats) | `BoxerTrainingScreen` | "At a Glance" - Session data |
| Screenshot 2 (Training page with AI Coach, 0% progress, exercises) | `BoxerRecoveryScreen` | "Optimize Recovery" - AI Coach & Training |
| Screenshot 3 (Community tab with 10,000 Punch Challenge, prizes) | `BoxerProgressScreen` | "Measure Progress" - Community & Challenges |

---

## Implementation Steps

1. **Copy screenshots to project assets**
   - Save to `src/assets/screens/` folder
   - File names: `boxer-session.png`, `boxer-training.png`, `boxer-community.png`

2. **Update PhoneMockup.tsx**
   - Import the screenshot images
   - Replace the CSS-based `BoxerTrainingScreen`, `BoxerRecoveryScreen`, and `BoxerProgressScreen` components with simple image displays
   - Keep the same export names so no changes needed in `FeatureGrid.tsx`

3. **Image styling**
   - Use `object-cover` to fill the screen area
   - Add slight padding top to account for the Dynamic Island overlay
   - Maintain smooth transitions when switching customer types

---

## Technical Details

### New Screen Components

Each Boxer screen component becomes a simple image display:

```
BoxerTrainingScreen:
  <img src={boxerSessionImage} className="w-full h-full object-cover" />

BoxerRecoveryScreen:
  <img src={boxerTrainingImage} className="w-full h-full object-cover" />

BoxerProgressScreen:
  <img src={boxerCommunityImage} className="w-full h-full object-cover" />
```

### File Changes

| File | Change |
|------|--------|
| `src/assets/screens/boxer-session.png` | New file - Session summary screenshot |
| `src/assets/screens/boxer-training.png` | New file - AI Coach screenshot |
| `src/assets/screens/boxer-community.png` | New file - Community tab screenshot |
| `src/components/landing/PhoneMockup.tsx` | Replace 3 Boxer screen components with image-based versions |

---

## No Changes Needed

- `FeatureGrid.tsx` - No changes needed since export names stay the same
- Other customer segments (Coach, Promoter, Fan) - Keep current CSS-based screens until you provide screenshots for those

---

## Future Screenshots

When you're ready, you can provide screenshots for the other segments:
- **Coach**: 3 screenshots for team/analytics views
- **Promoter**: 3 screenshots for live broadcast/stats views  
- **Fan**: 3 screenshots for betting/comparison views


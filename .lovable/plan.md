## Replace Boxer videos & idle poster

Swap the three boxer phone-mockup videos under "Train Like a Pro / I'm a Boxer" with the user-supplied clips, and replace the idle (pre-hover) poster image with a new static image.

### Mapping

| Slot | Component | New asset |
|---|---|---|
| 1. Session Summary | `BoxerTrainingScreen` | `Session_Summary_PEAK.mp4` |
| 2. AI Coach | `BoxerRecoveryScreen` | `AI_Coach_PEAK.mp4` |
| 3. Community Challenges | `BoxerProgressScreen` | `Community_Challenges_PEAK.mp4` |
| Idle poster (all 3) | `phonePoster` | new static image |

### Steps

1. **Upload videos to Supabase Storage** (`videos` bucket, public) using the storage REST API:
   - `boxer-session-v2.mp4` ← `Session_Summary_PEAK.mp4`
   - `boxer-training-v2.mp4` ← `AI_Coach_PEAK.mp4`
   - `boxer-community-v2.mp4` ← `Community_Challenges_PEAK.mp4`
   
   Use `-v2` filenames to avoid CDN caching of the old clips.

2. **Ask the user for the new idle poster image.** They listed "Picture 4" but didn't attach one — clarify before proceeding. Options:
   - (a) Provide a custom image file
   - (b) Auto-generate a branded "PEAK" boxer-app splash frame (dark bg, blue logo, subtle UI hint)
   - (c) Use the first frame of one of the videos as the poster

3. **Update `src/components/landing/PhoneMockup.tsx`**:
   - Point `boxerSessionVideo`, `boxerTrainingVideo`, `boxerCommunityVideo` to the new `-v2` URLs.
   - Replace the `phonePoster` import with the new image (placed in `src/assets/screens/`).

### Notes

- `FeatureGrid.tsx` titles already match ("Session Summary", "AI Coach", "Community Challenges") — no copy changes needed there.
- Coach videos and all other screens stay untouched.
- Existing lazy-load behavior (`src` only set when `isPlaying`) is preserved, so the poster shows until hover/select.

**Before implementing, I need to know which option for the static poster image (3a/3b/3c).**

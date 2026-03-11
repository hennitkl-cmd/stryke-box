

# Replace Boxer Phone Mockup Videos

## Overview
Upload the 3 new MP4 videos to cloud storage, replacing the existing boxer videos used in the phone mockups.

## Mapping
1. `1_Canva_Videos_Landing_P.age.mp4` → `boxer-session.mp4` (Session Summary — `BoxerTrainingScreen`)
2. `2.mp4` → `boxer-training.mp4` (AI Coach — `BoxerRecoveryScreen`)
3. `3.mp4` → `boxer-community.mp4` (Community Challenges — `BoxerProgressScreen`)

## Steps

### 1. Copy videos to project assets temporarily
Copy the 3 uploaded files into `src/assets/screens/` with the correct names so they can be uploaded to cloud storage.

### 2. Upload to cloud storage bucket `videos`
Replace the existing files in the `videos` bucket:
- `boxer-session.mp4`
- `boxer-training.mp4`
- `boxer-community.mp4`

### 3. No code changes needed
The `PhoneMockup.tsx` already references these exact filenames from the storage URL. Once the files are replaced in storage, the new videos will appear automatically.

### 4. Generate new poster images (optional)
The current poster/fallback PNG images (`boxer-session.png`, `boxer-training.png`, `boxer-community.png`) will no longer match the new videos. We can keep them as-is for now since they're only shown briefly before the video loads.


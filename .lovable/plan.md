

# Replace Boxer Screenshots with Screen Recordings

Implement looping video recordings in the "I'm a Boxer" phone mockups using the uploaded files.

---

## Uploaded Files Mapping

| Upload | Current Image | New Video Destination |
|--------|---------------|----------------------|
| `ScreenRecording_02-05-2026_20-18-52_1.mov` | boxer-session.png | `src/assets/screens/boxer-session.mov` |
| `ScreenRecording_02-05-2026_20-19-20_1.mp4` | boxer-training.png | `src/assets/screens/boxer-training.mp4` |
| `ScreenRecording_02-05-2026_20-20-45_1.mp4` | boxer-community.png | `src/assets/screens/boxer-community.mp4` |

---

## Changes

### Step 1: Copy Video Files

Copy the uploaded screen recordings to the assets folder:
```text
user-uploads://ScreenRecording_02-05-2026_20-18-52_1.mov → src/assets/screens/boxer-session.mov
user-uploads://ScreenRecording_02-05-2026_20-19-20_1.mp4 → src/assets/screens/boxer-training.mp4
user-uploads://ScreenRecording_02-05-2026_20-20-45_1.mp4 → src/assets/screens/boxer-community.mp4
```

### Step 2: Update PhoneMockup.tsx

**File: `src/components/landing/PhoneMockup.tsx`**

| Change | Details |
|--------|---------|
| Add video imports | Import the 3 new video files |
| Keep image imports | Use images as poster/fallback while video loads |
| Update Boxer screen components | Change from `<img>` to `<video>` with autoplay, loop, muted, playsInline |

#### Updated Imports
```tsx
// Keep existing image imports for poster fallback
import boxerSessionImage from "@/assets/screens/boxer-session.png";
import boxerTrainingImage from "@/assets/screens/boxer-training.png";
import boxerCommunityImage from "@/assets/screens/boxer-community.png";

// Add video imports
import boxerSessionVideo from "@/assets/screens/boxer-session.mov";
import boxerTrainingVideo from "@/assets/screens/boxer-training.mp4";
import boxerCommunityVideo from "@/assets/screens/boxer-community.mp4";
```

#### Updated Screen Components
```tsx
export const BoxerTrainingScreen = () => (
  <video 
    src={boxerSessionVideo}
    poster={boxerSessionImage}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
);

export const BoxerRecoveryScreen = () => (
  <video 
    src={boxerTrainingVideo}
    poster={boxerTrainingImage}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
);

export const BoxerProgressScreen = () => (
  <video 
    src={boxerCommunityVideo}
    poster={boxerCommunityImage}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
);
```

---

## Video Attributes

| Attribute | Purpose |
|-----------|---------|
| `autoPlay` | Starts playing immediately |
| `loop` | Continuously replays |
| `muted` | Required for autoplay in browsers |
| `playsInline` | Prevents fullscreen on iOS |
| `poster` | Shows static image while video loads |

---

## Files Changed

| File | Action |
|------|--------|
| `src/assets/screens/boxer-session.mov` | Copy from upload |
| `src/assets/screens/boxer-training.mp4` | Copy from upload |
| `src/assets/screens/boxer-community.mp4` | Copy from upload |
| `src/components/landing/PhoneMockup.tsx` | Update to use videos |


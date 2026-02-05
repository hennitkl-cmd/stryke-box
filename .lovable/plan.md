

# Implement Single Video Playback

Add logic to ensure only one video plays at a time across all phone mockups.

---

## Verification Results

- The screen recordings are **loading and playing correctly** in the Boxer phone mockups
- Currently **all 3 videos play simultaneously**, which we need to change

---

## Implementation Approach

### Strategy

**For Mobile (Carousel)**: Only play the video in the currently visible slide. Use the carousel's `currentSlide` state to control playback.

**For Desktop (Grid)**: Play only one video at a time based on hover interaction. When a user hovers over a phone mockup, that video plays and others pause.

---

## File Changes

### 1. Create Video Screen Components with Playback Control

**File: `src/components/landing/PhoneMockup.tsx`**

Update the Boxer screen components to accept an `isPlaying` prop:

```tsx
interface VideoScreenProps {
  isPlaying?: boolean;
}

export const BoxerTrainingScreen = ({ isPlaying = true }: VideoScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video 
      ref={videoRef}
      src={boxerSessionVideo}
      poster={boxerSessionImage}
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
};
```

Apply the same pattern to `BoxerRecoveryScreen` and `BoxerProgressScreen`.

---

### 2. Update FeatureGrid to Control Video Playback

**File: `src/components/landing/FeatureGrid.tsx`**

#### For Mobile Carousel
- Pass `isPlaying` based on whether the slide is currently visible
- Only the current slide's video plays

#### For Desktop Grid
- Add hover state to track which phone is being hovered
- Default to playing the first video (index 0) when no hover
- On hover, play that video and pause others

```tsx
// Desktop hover state
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const activeVideoIndex = hoveredIndex ?? 0; // Default to first video

// Pass to PhoneFeature data
const getPhoneFeatures = () => phoneFeaturesByCustomer[customerType].map((feature, index) => ({
  ...feature,
  isPlaying: index === activeVideoIndex
}));
```

---

### 3. Update Data Structure

Change the `phoneFeaturesByCustomer` from static JSX to a function that generates screens with playback props:

```tsx
const getBoxerScreens = (activeIndex: number) => [
  {
    title: "Session Summary",
    description: "...",
    screen: <BoxerTrainingScreen isPlaying={activeIndex === 0} />,
  },
  {
    title: "AI Coach", 
    description: "...",
    screen: <BoxerRecoveryScreen isPlaying={activeIndex === 1} />,
  },
  {
    title: "Community Challenges",
    description: "...",
    screen: <BoxerProgressScreen isPlaying={activeIndex === 2} />,
  },
];
```

---

## Behavior Summary

| View | Behavior |
|------|----------|
| Mobile (Carousel) | Only the visible slide's video plays. Swiping pauses previous and plays next. |
| Desktop (Grid) | First video plays by default. Hovering a phone plays that video and pauses others. |

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/landing/PhoneMockup.tsx` | Add `isPlaying` prop to Boxer video screens with ref-based play/pause control |
| `src/components/landing/FeatureGrid.tsx` | Add hover state for desktop, use `currentSlide` for mobile, pass `isPlaying` to screens |




## Plan: Embed Live Overlay Demo Video for Promoter Tab

### Context
Currently, when users select the "Promoter" role, the FeatureGrid section shows three simple icon+text benefit cards. The uploaded video demonstrates live broadcast overlays — this is a strong visual that deserves prominent placement.

### Approach
Upload the video to the existing `videos` storage bucket, then replace the static Promoter benefit cards in FeatureGrid with a featured video section — a large, styled video player (auto-playing, muted, looping) framed as a broadcast monitor/TV overlay, with the three benefit items displayed alongside or below it.

### Layout
```text
┌──────────────────────────────────────────┐
│          "Core Capabilities"             │
│   "Live Data. Real-Time Broadcasts."     │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │     16:9 Video Player              │  │
│  │     (glass-card frame, rounded,    │  │
│  │      autoplay, muted, loop)        │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │ Live │  │Event │  │Revenue│           │
│  │Overlay│ │Analyt│  │Growth │           │
│  └──────┘  └──────┘  └──────┘           │
└──────────────────────────────────────────┘
```

### Steps

1. **Upload video** to the `videos` storage bucket as `live-overlay-demo.mp4`
2. **Update FeatureGrid.tsx** — when `customerType === "promoter"`, render a featured video player in a glass-card frame (autoplay, muted, loop, playsInline) above the three benefit cards
3. **Style the video** with rounded corners, subtle glow/border, and a "LIVE" badge overlay to match the broadcast theme
4. **Keep benefit cards** below the video in a 3-column grid

### Technical Details
- Video source: CDN URL from the `videos` storage bucket (`https://wnfypheskgiavkoprtvf.supabase.co/storage/v1/object/public/videos/live-overlay-demo.mp4`)
- Video element: native `<video>` tag with `autoPlay muted loop playsInline` attributes, lazy-loaded when section is in view
- Framing: `glass-card` with `rounded-2xl overflow-hidden` and optional red glow border
- Mobile: video stacks full-width above the benefit cards


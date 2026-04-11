

## Plan: Add Title/Description to Promoter Video & Fix 16:9 Aspect Ratio

### Changes (all in `src/components/landing/FeatureGrid.tsx`)

1. **Add a title and description above the video** — something like "Live Data Overlay" as heading and a short descriptor like "See how STRYKE data powers real-time broadcast overlays during live fights." styled consistently with the rest of the section.

2. **Fix 16:9 aspect ratio** — wrap the `<video>` in a container with `aspect-video` (which is 16:9) and use `object-cover` to eliminate black bars. Move `aspect-video` from the video element to the outer container div to ensure the frame itself is 16:9.

### Technical Details

In the promoter video section (~lines 284-308), add a text block before the video container and ensure the glass-card container enforces 16:9:

```tsx
{/* Title */}
<div className="text-center mb-6">
  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
    Live Data <span className="text-gradient-red">Overlay</span>
  </h3>
  <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
    See how STRYKE sensor data powers real-time broadcast graphics during live fights.
  </p>
</div>

{/* Video container with aspect-video on wrapper */}
<div className="glass-card rounded-2xl overflow-hidden ... aspect-video">
  <video ... className="w-full h-full object-cover" />
</div>
```

Single file change, minimal scope.


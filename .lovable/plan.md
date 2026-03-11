

# Redesign Product Gallery as Image Slideshow

## Overview
Replace the current two-column layout (image + feature cards) with a full-width image slideshow/carousel using the 4 uploaded product photos.

## Images (in order)
1. **X-ray diagram** (arrows/details) — `Lovable_screenshot_detailed-2.png`
2. **Close-up logo** (water droplets) — `ChatGPT_Image_5._März_2026_16_04_31.png`
3. **Green sensor view** — `use-the-exact-product-shown-in-the-attac...jpeg`
4. **Floating product** (gym background) — `ChatGPT_Image_5._März_2026_16_04_28.png`

## Changes

### 1. Copy 4 images to `src/assets/gallery/`
- `gallery-detail.png`
- `gallery-closeup.png`
- `gallery-sensor.jpeg`
- `gallery-floating.png`

### 2. Rewrite `src/components/landing/ProductShowcase.tsx`
- Remove the left-column image + right-column feature cards layout
- Keep the section header ("The Technology" / "Built for Champions")
- Replace with an Embla carousel using the existing `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` components from `src/components/ui/carousel.tsx`
- Each slide: full-width image inside a glass-morphism container with rounded corners
- Add dot indicators below the carousel showing current slide
- Keep the feature cards below the carousel in a simpler 2x3 or 3-column grid (unchanged logic)
- The carousel auto-advances every 5 seconds, pauses on hover

### 3. Layout structure
```text
┌──────────────────────────────────┐
│  "The Technology"  header        │
├──────────────────────────────────┤
│  ◀  [ Slideshow Image ]  ▶      │
│        ● ○ ○ ○                   │
├──────────────────────────────────┤
│  Feature cards grid (unchanged)  │
└──────────────────────────────────┘
```

The carousel will be centered, max-width ~800px, with the existing nav arrows styled to match the dark theme. Dot indicators use `bg-primary` for active, `bg-white/20` for inactive.


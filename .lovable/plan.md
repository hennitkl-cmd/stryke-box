

# Add Swipeable Product Image Carousel

## Overview
Add the uploaded image as a second hero shot. Users swipe/click between the two product images while the background glow, title, and scroll indicator stay fixed.

## Changes

### 1. Copy uploaded image to project
Copy `user-uploads://use-the-exact-product-shown-in-the-attac_dOSR4c2XSRGYKnapnnvpIA_gnL9GF6OQd2WZ_aQ9et2tw-removebg-preview.png` to `src/assets/stryke-product-hero-2.png`.

### 2. Update `src/components/landing/ProductHero3D.tsx`
- Import the second product image.
- Add state to track current image index (0 or 1).
- Replace the single `<img>` with an `AnimatePresence`-driven image swap — crossfade between images on swipe/click.
- Add touch swipe detection (track `onTouchStart`/`onTouchEnd` x-delta) and left/right click areas or arrow buttons.
- Add dot indicators (two small dots below the image) showing which image is active.
- The parallax effect, background glow, floor glow, title, and scroll indicator remain unchanged — only the image inside the parallax container swaps.


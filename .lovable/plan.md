

# Product Hero Gallery Plan

## Approach
Convert the single product image into a swipeable carousel (using the existing Embla carousel components) with two slides:
1. **Slide 1**: Current product image (stryke-product-hero.png)
2. **Slide 2**: Uploaded x-ray/tech breakdown image

## Handling the Black Background
The uploaded image has a black background. Since the page background is near-black (`hsl(0 0% 2%)`), applying `mix-blend-mode: lighten` on the image will make the black pixels transparent while preserving all the lighter content (labels, product, red lightning bolt). No image editing needed.

## Changes

### 1. Copy uploaded image to `src/assets/stryke-sensor-xray.png`

### 2. Update `src/components/landing/ProductHero3D.tsx`
- Import Embla carousel components and the new image
- Wrap the image area in a `Carousel` with two `CarouselItem`s
- Both slides share the same parallax effect and glow
- Add dot indicators below the carousel for swipe affordance
- Apply `mix-blend-mode: lighten` on the x-ray image
- Keep title, subtitle, and scroll indicator unchanged


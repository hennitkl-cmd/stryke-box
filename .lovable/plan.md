## Hero Sensor: Floating Metrics + Orbiting Particles

Enhance `src/components/landing/ProductHero3D.tsx` with the dynamic hero composition from the previous site, adapted to PEAK's current dark + primary-blue brand.

### Changes (single file: `ProductHero3D.tsx`)

1. **Floating metric cards** around the sensor image:
   - Punch Velocity (68 MPH), Impact Force (312 KG), Heart Rate (148 BPM), Accuracy (94 %)
   - Glassmorphism: `bg-background/40 backdrop-blur-xl`, `border-primary/20`, blue glow shadow
   - Uppercase label, bold blue number, unit, animated thin progress bar
   - Desktop: absolute-positioned at the four corners of the product container
   - Mobile (`<md`): 2×2 grid below the product
   - Staggered fade-in entrance + gentle Y float loop (framer-motion)

2. **Orbiting particle dots** behind the product:
   - 12 small primary-blue dots with soft glow
   - Each wrapped in a rotating motion div (varying radii 160–380px, durations 12–36s, linear infinite)
   - `pointer-events-none`, layered above the radial glow but below the image/cards

3. **Brand adaptation**: all accents use `hsl(var(--primary))` (blue) instead of the red from the reference screenshot. Black background + glassmorphism preserved.

No new dependencies, no other files touched.

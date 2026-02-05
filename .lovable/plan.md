

# Phone Mockups: Parallax Animations + Mobile Carousel

Add scroll-based floating/parallax effects to the phone mockups and implement a swipeable carousel for mobile users.

---

## Overview

Two enhancements to the "Train Like a Pro" section:

1. **Parallax floating effect** - Each phone moves at a different speed as the user scrolls, creating depth
2. **Mobile carousel** - On screens smaller than 768px, phones display in a swipeable carousel with dot indicators

---

## Part 1: Parallax/Floating Animations

### Effect Description

As the user scrolls down the page, each phone mockup will have a subtle vertical offset that creates a "floating" illusion:

- **Left phone**: Moves slower (parallax factor 0.05)
- **Center phone**: Moves at normal speed (no offset) - serves as anchor
- **Right phone**: Moves slightly faster (parallax factor -0.05)

This creates a layered 3D effect where phones seem to float at different depths.

### Technical Approach

Use Framer Motion's `useScroll` and `useTransform` hooks:

```text
useScroll() -> scrollYProgress (0 to 1)
    |
    v
useTransform() -> convert to Y offset (-20px to +20px per phone)
    |
    v
motion.div style={{ y: transformedValue }}
```

Each phone gets a different transform multiplier based on its index:
- Index 0 (left): `y = scrollOffset * 30` (moves down as you scroll)
- Index 1 (center): `y = 0` (anchor point)
- Index 2 (right): `y = scrollOffset * -30` (moves up as you scroll)

### Additional Subtle Effects

- Add gentle "breathing" animation using CSS keyframes
- Subtle shadow that intensifies on scroll to enhance depth perception

---

## Part 2: Mobile Carousel

### Behavior

On screens < 768px (`useIsMobile` hook):
- Replace the 3-column grid with an Embla Carousel
- Show one phone at a time, centered
- Add dot indicators below to show current position
- Enable swipe gestures for navigation

### Layout Structure

```text
Desktop (md+):
┌─────────────┬─────────────┬─────────────┐
│   Phone 1   │   Phone 2   │   Phone 3   │
│  (parallax) │  (parallax) │  (parallax) │
└─────────────┴─────────────┴─────────────┘

Mobile (<768px):
        ┌─────────────┐
        │   Phone 1   │  <- swipe left/right
        └─────────────┘
           ● ○ ○        <- dot indicators
```

### Carousel Implementation

Use the existing `Carousel` components from `src/components/ui/carousel.tsx`:
- `Carousel` wrapper with `opts={{ align: "center", loop: true }}`
- `CarouselContent` for the scrollable container
- `CarouselItem` for each phone (with `basis-full` to show one at a time)
- Custom dot indicators that sync with carousel state

---

## File Changes

| File | Changes |
|------|---------|
| `src/components/landing/FeatureGrid.tsx` | Add parallax transforms, mobile carousel logic, dot indicators |

---

## Technical Implementation Details

### Imports to Add

```typescript
import { useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
```

### Parallax Setup

```typescript
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

// Different parallax factors for each phone
const parallaxFactors = [30, 0, -30]; // left, center, right

// Create transforms for each phone
const yTransforms = parallaxFactors.map(factor =>
  useTransform(scrollYProgress, [0, 1], [factor, -factor])
);
```

### Mobile Carousel Logic

```typescript
const isMobile = useIsMobile();
const [carouselApi, setCarouselApi] = useState<CarouselApi>();
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  if (!carouselApi) return;
  carouselApi.on("select", () => {
    setCurrentSlide(carouselApi.selectedScrollSnap());
  });
}, [carouselApi]);
```

### Conditional Rendering

```typescript
{isMobile ? (
  // Carousel view for mobile
  <Carousel setApi={setCarouselApi} opts={{ align: "center", loop: true }}>
    <CarouselContent>
      {phoneFeatures.map((feature, index) => (
        <CarouselItem key={feature.title}>
          {/* Phone + text */}
        </CarouselItem>
      ))}
    </CarouselContent>
    {/* Dot indicators */}
    <div className="flex justify-center gap-2 mt-6">
      {phoneFeatures.map((_, i) => (
        <button
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === currentSlide ? 'bg-primary' : 'bg-white/20'
          }`}
          onClick={() => carouselApi?.scrollTo(i)}
        />
      ))}
    </div>
  </Carousel>
) : (
  // Grid view with parallax for desktop
  <motion.div className="grid md:grid-cols-3 gap-8 lg:gap-12">
    {/* Phones with parallax transforms */}
  </motion.div>
)}
```

---

## Animation Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Parallax scroll | Continuous | Linear (scroll-linked) |
| Hover lift | 0.3s | Spring (stiffness: 300, damping: 20) |
| Carousel transition | 0.4s | Ease-out |
| Dot indicator | 0.2s | Ease |

---

## Responsive Breakpoints

| Screen Size | Behavior |
|-------------|----------|
| < 768px | Carousel with swipe, single phone visible |
| >= 768px | 3-column grid with parallax effects |


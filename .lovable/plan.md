

# Auto-advance slideshow only when visible

## Change — `src/components/landing/ProductShowcase.tsx`

**Line 60**: Change `useInView` to not be `once: true` — use a separate continuous visibility ref for the carousel section:

```tsx
const carouselRef = useRef(null);
const isCarouselInView = useInView(carouselRef, { margin: "-50px" });
```

**Line 78-82**: Add `isCarouselInView` to the auto-advance condition:
```tsx
if (!api || isPaused || !isCarouselInView) return;
```

**Carousel wrapper div (~line 101)**: Attach `carouselRef` to the carousel container div so visibility is tracked on the actual slideshow element.

This way the slideshow stays on the first image until it scrolls into view, then begins auto-advancing. If the user scrolls past it, it pauses again.


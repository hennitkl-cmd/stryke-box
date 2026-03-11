

# Add "Go to Product Gallery" Button

## Change — `src/components/landing/ProductHero3D.tsx`

Insert a small button between the product image and the "STRYKE Sensor" title text. It will scroll smoothly to the ProductShowcase section.

- Import `Button` from `@/components/ui/button` and `ArrowDown` from `lucide-react`
- Add a motion-animated small button after the product image block (line 64) and before the title block (line 67)
- Button text: "Product Gallery" with a small arrow icon
- Style: ghost/outline variant, small size, subtle appearance
- onClick: smooth scroll to the ProductShowcase section (needs an `id` on that section)

Also add `id="product-showcase"` to the ProductShowcase component's root element.


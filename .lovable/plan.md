

# Fix Green Glows to Red STRYKE Branding

## Problem
Two places use green (`hsl(120, ...)`) instead of the STRYKE red:
1. **Line 56** — `drop-shadow` on the product image uses `hsl(120,60%,30%,0.3)` (green)
2. **Line 61** — Floor glow reflection uses `hsl(120, 60%, 40%)` (green)

These were leftover from an earlier iteration and don't match the brand.

## Changes — `src/components/landing/ProductHero3D.tsx`

1. **Line 56**: Change drop-shadow from `hsl(120,60%,30%,0.3)` to `hsl(0,100%,40%,0.3)` (STRYKE red)
2. **Line 61**: Change floor glow from `hsl(120, 60%, 40%)` to `hsl(0, 100%, 40%)` (STRYKE red)

Two line changes, same file. No other files affected.


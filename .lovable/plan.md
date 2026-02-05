

# Replace Product Placeholder with Real STRYKE Sensor Image

Swap the abstract CSS-based visualization with the actual product mockup photo in the "Built for Champions" section.

---

## Current vs. New

| Current | New |
|---------|-----|
| Abstract rotating rings with Zap icon | Actual STRYKE sensor device photo |
| Generic placeholder feel | Premium product photography |
| CSS-generated graphics | Real hardware showcase |

---

## Implementation

### File Changes

| File | Change |
|------|--------|
| `src/assets/stryke-sensor.png` | New file - Copy the product mockup image |
| `src/components/landing/ProductShowcase.tsx` | Replace the abstract visualization (lines 66-111) with an image display |

### New Product Image Section

Replace the entire abstract visualization block with:

```text
<div className="glass-card p-4 md:p-6 relative overflow-hidden">
  <img 
    src={strykeSensorImage} 
    alt="STRYKE sensor device" 
    className="w-full h-auto rounded-xl"
  />
</div>
```

### Keep Existing Animations

- Maintain the entrance animation (`opacity: 0, x: -50` to visible)
- Can optionally add subtle hover effects to the image (scale, glow)
- Keep the specs grid on the right side unchanged

---

## Visual Result

The section will now show:
- **Left side**: Real STRYKE sensor photo (the black device with red lightning logo and water droplets)
- **Right side**: Tech specs grid (High-Frequency Sensors, AI-Driven Insights, etc.)

This creates a powerful "here's what you get" moment that builds trust and showcases the premium hardware quality.




# Update Splash Title - Text, Size, and Auto-Fade

Modify the splash title component with the requested changes.

---

## Changes

**File: `src/components/landing/SplashTitle.tsx`**

| Change | Current | New |
|--------|---------|-----|
| Text format | Single line: "Don't just watch the fight — read it" | Two lines: "Don't just watch the fight." and "Read it." |
| Font size | `text-4xl md:text-6xl lg:text-7xl` | `text-5xl md:text-7xl lg:text-8xl` (one size step larger) |
| Auto-fade | None | Auto-fade after 5 seconds using `setTimeout` |

---

## Implementation Details

### Text Structure
```text
Don't just watch the fight.
Read it.
```
Use a line break (`<br />`) or separate elements to create the two-line layout.

### Font Size Increase
- Mobile: `text-4xl` → `text-5xl`
- Tablet: `text-6xl` → `text-7xl`  
- Desktop: `text-7xl` → `text-8xl`

### Auto-Fade Timer
Add a `setTimeout` inside the `useEffect` that sets `isVisible` to `false` after 5000ms (5 seconds). Clear the timeout on cleanup to prevent memory leaks.

```text
useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(false);
  }, 5000);
  
  // ... existing scroll/click handlers
  
  return () => {
    clearTimeout(timer);
    // ... existing cleanup
  };
}, []);
```

---

## Verification Note

To verify the splash and segment switching work correctly, you can:
1. Refresh the page to see the splash title appear
2. Wait 5 seconds OR click/scroll to dismiss it
3. Click through Boxer → Coach → Promoter → Fan buttons to confirm phone mockups show for Boxer/Coach and benefits list shows for Promoter/Fan


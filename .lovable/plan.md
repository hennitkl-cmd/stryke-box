
The user is asking a research question about fonts — no implementation needed.

Looking at the codebase:
- `tailwind.config.ts` defines `fontFamily.sans: ['Inter', 'system-ui', 'sans-serif']`
- `src/index.css` sets `body { font-family: 'Inter', system-ui, sans-serif; }`
- `index.html` loads Inter from Google Fonts with weights 400–900
- "Become Undeniable" lives in the Hero section — uses default font stack (Inter) with heavy weight + tracking utilities

## Fonts in use

The entire site uses a **single typeface**: **Inter** (Google Fonts), loaded with weights 400, 500, 600, 700, 800, 900.

### Where it's defined
- `index.html` — loads Inter from Google Fonts
- `src/index.css` — sets `font-family: 'Inter', system-ui, sans-serif` on body
- `tailwind.config.ts` — `font-sans` is mapped to Inter

### "Become Undeniable" specifically (Hero)
- **Font**: Inter
- **Weight**: 900 (font-black)
- **Style**: Tight tracking (`tracking-tight`), large display sizes (`text-6xl` → `text-9xl`)
- The red gradient text "UNDENIABLE" uses the `.text-gradient-red` utility (cherry red → red-400 gradient)

### Fallback chain
If Inter fails to load: `system-ui` → generic `sans-serif`.

So all headlines (Hero, Splash "Don't just watch the fight. Read it.", section titles) and body text are Inter — just at different weights and sizes for hierarchy.

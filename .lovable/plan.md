## Plan: Rebrand "Stryke" → "PEAK" and recolor red → blue (#00429f)

Two coordinated changes across the codebase:

### 1. Color swap: red → blue (#00429f)

`#00429f` converts to **HSL `215 100% 31%`**. Update the design tokens so every red surface (buttons, glows, gradients, "LIVE" badges, accents) becomes this blue automatically.

**`src/index.css`** — update CSS variables in both `:root` and `.dark`:
- `--primary`, `--accent`, `--ring`, `--sidebar-primary`, `--sidebar-ring` → `215 100% 31%`
- `--stryke-red` → `215 100% 31%` (rename token to `--peak-blue`)
- `--stryke-red-glow` → `215 100% 45%` (rename to `--peak-blue-glow`, slightly brighter for the glow)
- Update `.glow-red` and `.glow-red-subtle` `box-shadow` hsl values (rename utilities to `.glow-blue` / `.glow-blue-subtle`)
- `.text-gradient-red` → rename to `.text-gradient-blue`; gradient becomes `from-primary to-blue-400`

**`tailwind.config.ts`**:
- Rename `stryke` palette → `peak` with `blue` and `blue-glow` keys pointing at the renamed CSS vars
- Update the `pulse-glow` keyframe `box-shadow` hsl values to `215 100% 31%`

**Component updates** (rename the gradient/glow utility classes wherever used):
- `src/components/landing/Hero.tsx` — `glow-red` → `glow-blue`, `text-gradient-red` → `text-gradient-blue`, comment "Red glow accent" → "Blue glow accent"
- `src/components/landing/SplashTitle.tsx` — `text-gradient-red` → `text-gradient-blue`
- `src/components/landing/ProductHero3D.tsx`, `ProductShowcase.tsx`, `ScienceSection.tsx`, `FeatureGrid.tsx`, `CTASection.tsx`, `AIChatbot.tsx` — `text-gradient-red` → `text-gradient-blue`, `glow-red` → `glow-blue`
- `src/components/landing/PhoneMockup.tsx` — change the "LIVE" pill from `bg-red-500/20`, `bg-red-500`, `text-red-400` to `bg-blue-600/20`, `bg-blue-600`, `text-blue-400`
- `src/components/landing/NotificationBadge.tsx` — swap any red classes to blue equivalents
- Leave `src/components/ui/toast.tsx` red classes alone (those are for the destructive/error toast variant — should stay red for warning semantics)

### 2. Brand rename: Stryke → PEAK

Replace every user-visible "Stryke"/"STRYKE"/"stryke" with "PEAK" (all-caps style preserved where used). Code identifiers (CSS vars, file names) handled separately.

**Visible copy & metadata**:
- `index.html` — `<title>`, meta description, og:title, author, twitter:site → "PEAK"
- `src/components/landing/Navigation.tsx` — logo `alt`, brand text "STRYKE" → "PEAK". Leave Instagram URL as-is (real external link the user controls).
- `src/components/landing/Footer.tsx` — logo `alt` and brand text → "PEAK"; copyright "© … PEAK"
- `src/components/landing/AIChatbot.tsx` — greeting message ("Stryke AI Assistant", "What brings you to Stryke?"), header label "Stryke AI" → "PEAK AI", input placeholder "Ask about PEAK..."
- `src/components/landing/CTASection.tsx` — toast description "We'll notify you when PEAK launches."
- `src/components/landing/FeatureGrid.tsx` — "See how PEAK sensor data powers…"
- `src/components/landing/ProductHero3D.tsx` — headline "PEAK Boxing Sensor", image alt "PEAK Sensor Sleeve"
- `src/components/landing/ProductShowcase.tsx` — gallery image `alt` strings → "PEAK sensor …"
- `supabase/functions/chat/index.ts` — system prompt: replace every "Stryke" with "PEAK" so the chatbot self-identifies as PEAK

**Asset files** (keep filenames, just update references where needed):
- The image files `logo-stryke.png`, `stryke-hero-product.webp`, etc. stay on disk with current names so we don't break imports. Only the user-visible text and `alt` attributes change. (Renaming the assets themselves is optional cleanup we can do later if you want.)

### Out of scope / kept as-is
- The `destructive` toast variant remains red (semantic error color).
- Memory files mentioning "Stryke" are historical notes — not user-visible; will leave for now.
- External Instagram handle (`@stryke_systems`) left untouched since it's a real account URL only you can change.

### Result
Every red accent on the site (buttons, glowing CTAs, gradient headlines like "UNDENIABLE", "Champions", "Strike", "Elevate", "Boxing Sensor", the chatbot bubble, the LIVE indicator) becomes deep blue `#00429f`, and the brand reads "PEAK" everywhere.

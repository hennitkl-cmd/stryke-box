

## Plan: Performance-Optimierung der Landing Page

### Problem
Die Seite lädt viele schwere Assets gleichzeitig und rendert alle Sektionen sofort, auch wenn sie nicht sichtbar sind.

**Hauptverursacher:**
- `stryke-sensor.png` — **2.7 MB** (wird im Bundle mitgeliefert)
- `gallery-closeup.png` — **2.1 MB**, `gallery-floating.png` — **2.0 MB** (ebenfalls gebundelt)
- `stryke-hero-product.png` — **424 KB**
- 6 Videos werden als URLs definiert (CDN-hosted, gut), aber alle Komponenten werden sofort geladen
- Alle Sektionen (Navigation, Hero, FeatureGrid, ScienceSection, ProductShowcase, CTA, Footer, AIChatbot) werden beim ersten Render importiert und ausgeführt

### Optimierungen

**1. Bilder komprimieren und in WebP konvertieren**
- Die großen PNGs (gallery + stryke-sensor) in WebP konvertieren → typisch 70-80% kleiner
- Gesamtersparnis: ca. 5-6 MB → ~1-1.5 MB

**2. Lazy Loading für Below-the-fold Sektionen**
- `React.lazy()` + `Suspense` für Komponenten die nicht sofort sichtbar sind:
  - `FeatureGrid`, `ScienceSection`, `ProductShowcase`, `CTASection`, `Footer`, `AIChatbot`
- Nur `Navigation`, `ProductHero3D` und `Hero` sofort laden

**3. Native Lazy Loading für Bilder**
- `loading="lazy"` auf alle `<img>` Tags in ProductShowcase und anderen Below-the-fold Sektionen
- Hero-Bild bleibt eager (above the fold)

**4. Bilder in ProductShowcase optimieren**
- Gallery-Bilder mit `loading="lazy"` und `decoding="async"` versehen

### Dateien die geändert werden

| Datei | Änderung |
|---|---|
| `src/pages/Index.tsx` | Lazy imports + Suspense für 6 Sektionen |
| `src/components/landing/ProductShowcase.tsx` | `loading="lazy"` auf Gallery-Bilder |
| `src/components/landing/ProductHero3D.tsx` | `decoding="async"` auf Hero-Bild |
| Assets (build-time) | WebP-Konvertierung der großen PNGs |

### Erwartetes Ergebnis
- Initiale Ladezeit deutlich reduziert (weniger JS + kleinere Bilder)
- Sektionen laden erst wenn der User in ihre Nähe scrollt
- Keine visuellen Änderungen


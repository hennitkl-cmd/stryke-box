

## Plan: TTFB & FCP Optimierung

### Maßnahmen

**1. Hero-Bild preloaden (`index.html`)**
- `<link rel="preload" as="image" type="image/webp" href="/src/assets/stryke-hero-product.webp">` im `<head>`
- Das Hero-Bild ist das größte above-the-fold Asset — Preloading eliminiert die Wartezeit auf den JS-Bundle-Parse

**2. Logo preloaden (`index.html`)**
- `<link rel="preload" as="image" href="/src/assets/logo-stryke.png">` für das Nav-Logo

**3. Inter Font via Google Fonts mit `font-display: swap` laden (`index.html`)**
- Aktuell wird Inter nur als `font-family` Fallback deklariert, aber nie geladen → Browser nutzt system-ui
- Google Fonts `<link rel="preconnect">` + `<link rel="stylesheet">` mit `display=swap` hinzufügen
- Dadurch wird Inter tatsächlich geladen, aber ohne Render-Blocking

**4. DNS-Prefetch für CDN-Domains (`index.html`)**
- `<link rel="dns-prefetch" href="https://wnfypheskgiavkoprtvf.supabase.co">` für spätere Video-Loads
- Reduziert Latenz wenn Videos lazy geladen werden

**5. Critical CSS inlinen — Splash-Screen Styles (`index.html`)**
- Minimale inline Styles für den SplashTitle-Background (schwarzer Hintergrund) direkt in `<style>` im `<head>`
- Verhindert FOUC (Flash of Unstyled Content) bevor CSS geladen ist

### Dateien

| Datei | Änderung |
|---|---|
| `index.html` | Preload-Links, Font-Loading, DNS-Prefetch, Inline Critical CSS |

### Erwartetes Ergebnis
- FCP ~300-500ms schneller durch Font-Swap und Asset-Preloading
- Keine visuellen Änderungen


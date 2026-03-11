

# 3D Produkt-Render Hero Section

## Was wird gebaut

Eine neue fullscreen Section direkt nach der Navigation (vor dem bestehenden Hero), die ein **programmatisch erstelltes 3D-Modell** des Compression Wrist Sleeves zeigt -- kein Foto, sondern ein echtes 3D-Objekt auf dem dunklen Seitenhintergrund. Das Modell dreht sich beim Scrollen.

## Technischer Ansatz

**React Three Fiber** mit einem prozedural modellierten Sleeve:

- `CylinderGeometry` (leicht konisch) als Sleeve-Koerper
- Schwarze Mesh-Textur mit mattem Stoff-Look (MeshStandardMaterial mit Roughness)
- Rotes Stryke-Blitz-Logo als Decal/Textur auf der Vorderseite (aus dem hochgeladenen Bild extrahiert und als transparente PNG-Textur)
- Dezente rote Naehte/Linien als zusaetzliche Geometrie
- Der graue Sensor-Bereich auf der Innenseite als separates Mesh-Element

## Aenderungen

### 1. Dependencies
- `three@^0.160.0`, `@react-three/fiber@^8.18.0`, `@react-three/drei@^9.122.0`

### 2. Assets
- Logo-Textur aus `src/assets/logo-stryke.png` fuer das Decal auf dem Sleeve
- Das hochgeladene Produktfoto als Referenz (nicht als Textur verwendet)

### 3. Neue Komponente: `src/components/landing/ProductHero3D.tsx`
- `Canvas` mit transparentem Hintergrund (`gl={{ alpha: true }}`)
- Sticky inner container innerhalb einer ~200vh Section
- `useScroll` + `useTransform` fuer scroll-basierte Y-Rotation (0-360 Grad)
- Beleuchtung: Ambient Light + roter Spot Light fuer Glow-Effekt
- Titel "STRYKE Sensor" und Scroll-Indikator darunter
- Fallback: statisches Produktbild falls WebGL nicht verfuegbar

### 4. `src/pages/Index.tsx`
- `<ProductHero3D />` nach `<Navigation />`, vor `<Hero />` einfuegen

## Ergebnis
Nach dem Splash Screen sieht man ein grosses 3D-Modell des Wrist Sleeves, das sich beim Scrollen dreht. Transparenter Canvas-Hintergrund zeigt den dunklen Seitenhintergrund durch. Danach kommt der normale Hero-Bereich.


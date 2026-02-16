

# Website-Ladezeit auf dem Handy optimieren

## Problem

Die Seite laedt 6 MP4-Videodateien (Boxer-Sessions, Training, Community + Coach-Dashboard, Analytics, Fighters) als statische Assets. Alle werden beim Seitenaufbau geladen, auch wenn sie noch gar nicht sichtbar sind. Auf mobilem Internet fuehrt das zu langen Wartezeiten.

## Loesung

### 1. Videos erst laden, wenn sie sichtbar werden (Lazy Loading)

Die Video-Komponenten in `PhoneMockup.tsx` werden so umgebaut, dass das `src`-Attribut erst gesetzt wird, wenn die Komponente im Viewport sichtbar ist. So werden Videos nur geladen, wenn der Nutzer dorthin scrollt.

### 2. Nur das aktive Video laden (Mobile Carousel)

Im mobilen Carousel (`FeatureGrid.tsx`) wird nur das Video des aktuell sichtbaren Slides geladen. Die anderen bleiben ohne `src`, bis sie angezeigt werden.

### 3. Video preload="none" setzen

Alle `<video>`-Elemente bekommen `preload="none"`, damit der Browser nicht automatisch anfaengt, Videodaten herunterzuladen.

### 4. Poster-Bilder als Platzhalter anzeigen

Die bestehenden PNG-Screenshots werden als `poster` angezeigt, solange das Video noch nicht geladen ist. So sieht der Nutzer sofort ein Bild statt eines leeren Rahmens.

## Technische Details

### `src/components/landing/PhoneMockup.tsx`
- Fuer alle 6 Video-Screen-Komponenten (BoxerTrainingScreen, BoxerRecoveryScreen, BoxerProgressScreen, CoachRosterScreen, CoachAnalyticsScreen, CoachInsightsScreen):
  - `preload="none"` hinzufuegen
  - Intersection Observer oder `isPlaying`-Prop nutzen, um `src` erst zu setzen wenn noetig
  - Poster-Bilder werden bereits genutzt (fuer Boxer-Screens), Coach-Screens bekommen ebenfalls statische Poster-Bilder als Fallback

### `src/components/landing/FeatureGrid.tsx`
- Im mobilen Carousel: Nur der aktuelle Slide bekommt `isPlaying={true}`, die anderen bleiben bei `false` (bereits implementiert - keine Aenderung noetig)

### Erwartetes Ergebnis
- Initiale Ladezeit deutlich reduziert (keine Videos werden sofort geladen)
- Videos starten erst beim Scrollen zum jeweiligen Abschnitt
- Poster-Bilder sorgen fuer sofortige visuelle Darstellung


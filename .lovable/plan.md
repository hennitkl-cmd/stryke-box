

# Videos komprimieren und schneller laden

## Problem

Die 6 MP4-Videodateien werden als statische Assets im App-Bundle mitgeliefert. Auch mit Lazy Loading muessen sie irgendwann heruntergeladen werden - und wenn die Dateien gross sind, dauert das auf mobilem Internet lange.

## Loesung: Videos in Cloud-Speicher auslagern

Statt die Videos direkt im Code zu buendeln, werden sie in den Cloud-Speicher (Storage) verschoben. Das bringt mehrere Vorteile:

- **CDN-Auslieferung**: Videos werden ueber ein globales Content Delivery Network ausgeliefert, was deutlich schneller ist
- **Kleineres App-Bundle**: Die App selbst laedt viel schneller, weil keine grossen Videodateien mehr im Code stecken
- **Einfaches Austauschen**: Komprimierte Videos koennen jederzeit hochgeladen werden, ohne den Code zu aendern

### Zusaetzlich: Videos extern komprimieren

Du kannst die Videos vorher mit einem kostenlosen Online-Tool komprimieren (z.B. handbrake.fr oder clideo.com). Empfohlene Einstellungen:

- **Aufloesung**: 720x1560 (die Phone-Mockups sind nur ~280px breit, also reicht das locker)
- **Bitrate**: 500-800 kbps (statt typisch 2-5 Mbps)
- **Format**: MP4 mit H.264

Das kann die Dateigroesse um 70-90% reduzieren.

## Technische Details

### 1. Storage-Bucket erstellen
- Neuen oeffentlichen Bucket `videos` im Cloud-Speicher anlegen
- Upload-Policy fuer authentifizierte Nutzer (oder direkt per SQL)

### 2. Videos hochladen
- Alle 6 MP4-Dateien werden per Code in den Storage-Bucket hochgeladen
- Alternativ: Edge Function die die bestehenden Asset-URLs nimmt und in Storage kopiert

### 3. `PhoneMockup.tsx` umbauen
- Statt lokale Imports (`import boxerSessionVideo from "@/assets/screens/..."`) werden die Storage-URLs verwendet
- Die URLs werden als Konstanten definiert, z.B.:
  ```
  const VIDEO_BASE_URL = "https://.../storage/v1/object/public/videos/";
  ```
- Jede Video-Komponente bekommt die URL als String statt als importiertes Asset

### 4. Lokale Video-Dateien entfernen
- Die 6 MP4-Dateien aus `src/assets/screens/` loeschen (die `.mov`-Datei ebenfalls)
- Die PNG-Poster-Bilder bleiben als Platzhalter erhalten

### Erwartetes Ergebnis
- App-Bundle wird um die gesamte Video-Groesse kleiner (vermutlich 20-50 MB weniger)
- Initiale Seitenladezeit drastisch verbessert
- Videos werden erst bei Bedarf vom CDN geladen
- Poster-Bilder erscheinen sofort als Platzhalter


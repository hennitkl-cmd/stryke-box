

# Splash Screen: Scroll blockieren

Der Splash-Screen ("Don't just watch the fight. Read it.") soll das Scrollen komplett blockieren, solange er sichtbar ist. Er verschwindet nur durch Klicken oder automatisch nach 5 Sekunden.

---

## Aenderungen

### `src/components/landing/SplashTitle.tsx`

1. **Scroll-Listener entfernen** -- Der `handleScroll`-Code wird komplett entfernt, da Scrollen den Splash nicht mehr wegmachen soll.

2. **Scrollen blockieren waehrend Splash sichtbar** -- `document.body.style.overflow = "hidden"` setzen wenn der Splash sichtbar ist, und auf `"unset"` zuruecksetzen wenn er verschwindet.

3. **Hinweistext anpassen** -- "Click or scroll to continue" aendern zu "Click to continue", da Scrollen nicht mehr funktioniert.

---

## Technische Details

- `useEffect` blockiert Scrollen mit `overflow: hidden` auf `body`
- Cleanup-Funktion stellt Scrollen wieder her wenn die Komponente unmountet oder der Splash verschwindet
- Timer (5s) und Click-Handler bleiben wie bisher

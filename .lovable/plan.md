

# Update Favicon to Stryke Logo

Replace the default Lovable favicon with the Stryke logo.

---

## Changes

### `index.html`
- Copy `src/assets/logo-stryke.png` to `public/favicon.png`
- Add a `<link rel="icon" href="/favicon.png" type="image/png">` to the `<head>`
- Remove the existing `<link rel="icon" ...>` referencing the old favicon if present


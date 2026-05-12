# Factory Learning From Product 001

Status: Review note

## What Worked

- Starting with a web/PWA prototype was fast and avoided mobile-store friction.
- Privacy-first constraints made the product direction clearer.
- Static smoke tests helped when localhost/browser automation was blocked.
- Product evidence files kept the build from becoming a random demo.

## What Slowed Us Down

- Localhost server start can be blocked by Codex approval/usage limits.
- Browser verification cannot always open local file URLs.
- Jarvis does not yet trigger a product-specific build checklist automatically.

## Jarvis Improvements To Add

- Product run creation from the UI.
- Per-product status cards inside Jarvis.
- A visual product smoke-test panel.
- GitHub/deploy readiness checklist.
- Mobile readiness checklist for PWA, Capacitor, React Native, or native.

## Product 001 Next Gates

- Manual browser review on `http://localhost:4273/`.
- Add content review for child safety and age fit.
- Add accessibility pass for touch targets, text size, and contrast.
- Add App Store privacy-label draft.
- Decide mobile wrapper path.

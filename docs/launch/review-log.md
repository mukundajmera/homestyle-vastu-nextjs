# Homestyle Vastu launch review log

This file records verified repository behavior and review evidence. It is not a record of a live Hostinger deployment.

## Current implementation status

- Next.js application routes exist for Home, Services, About, Contact, and Privacy, plus a contact API route.
- The contact API validates submissions with Zod, rejects a populated honeypot, uses parameterized MySQL insertion, and attempts SMTP notification only when its environment configuration is present.
- The browser form currently redirects to WhatsApp after any successful HTTP response. The API response can report `mailSuccess: false`; the browser does not yet surface that state.
- The browser form includes consent, but the request payload and API schema do not currently include or persist it.
- Database and SMTP behavior have only been exercised with mocked unit/browser tests. No live database or email delivery is configured or verified.
- Hostinger has not been changed for this project. Existing hosting, domains, DNS, and email records remain outside this review.
- Do not treat previous sample environment values or deployment instructions as verified account configuration.

## Round 1 of 4 — Responsive UI and interaction

**Date:** 2026-10-21
**Patch contributor:** Jules
**Independent verification:** Codex

### Changes reviewed

- Increased minimum heights for shared buttons, inputs, and textareas and added mobile navigation link padding.
- Reused the existing space-plan illustration component and refined About-page layout.
- Updated Jest setup and the contact-form test to make the existing suite pass reliably in jsdom.

### Verification evidence

- `npm run typecheck`: passed.
- `npm run lint`: passed with no ESLint warnings or errors; Next.js reports that `next lint` is deprecated for Next.js 16 migration.
- `npm test`: 5 suites and 20 tests passed. One database-error test intentionally exercises and logs a simulated failure.
- Playwright viewport audit by Codex: Home, Services, About, Contact, and Privacy at 360x800, 390x844, 768x1024, 1024x768, and 1440x900; 25/25 combinations had one H1 and no horizontal overflow.
- Mobile navigation at 390x844: trigger measured 48x48, opened the dialog, received focus, navigated to Contact, and closed the menu.
- Synthetic contact-form browser test intercepted `/api/contact`; it confirmed the expected test payload and WhatsApp redirect without sending a real inquiry. This did not verify MySQL or SMTP. The captured payload omitted the consent field.
- `npm run build`: passed on Next.js 15.5.4, generating all five public pages and the contact API route.
- Production smoke check: all five routes returned HTTP 200 with one H1 each and no horizontal overflow at 390x844; no browser console or page errors were recorded.
- A stable 390x844 Contact screenshot confirmed the form layout. The dev-only hydration mismatch did not reproduce against the production server; keep an eye on it during later checks.

### Findings to carry into later reviews

- Local development browser logs showed React hydration-mismatch errors around Radix-generated header/form elements; the production smoke check had no console errors, so this currently appears limited to the development run.
- The same space-plan illustration appears in both the hero and About preview; consider adding visual variation.
- Screenshot review found low-contrast footer headings and a phone CTA whose text was difficult to read. Recheck contrast after shared typography and button styles are reviewed.
- The Contact screenshot was captured before the page finished loading and is not valid evidence of the settled form layout; recapture after the route is stable.

## Remaining Jules review rounds

- **Round 2:** Content accuracy, positioning, service descriptions, contact flow, privacy alignment, and SEO copy.
- **Round 3:** API security, privacy/data handling, technical SEO, performance, and dependency health.
- **Round 4:** Final regression review, responsive/browser checks, documentation accuracy, and release readiness.

No round constitutes a live lead-submission or deployment verification unless it explicitly records a real, authorized integration test and its evidence.

## Round 2 of 4 — Content, positioning, and lead conversion

**Date:** 2026-10-21
**Patch contributor:** Jules

### Changes reviewed

- Updated homepage positioning to explicitly include "22 years of experience as of 2026" and removed unsupported slash-separated alternatives in WhatsApp URLs across all pages (Home, Services, Contact).
- Contact form WhatsApp redirect was simplified to not include PII while maintaining context.
- About page text was updated to include the owner-confirmed "22 years of experience as of 2026" detail for Sanjay Jain.
- An `alt` visual variant was added to the `SpacePlanIllustration` component to prevent exact duplication between the hero and the About preview sections on the homepage.
- Footer heading colors were explicitly set to `text-white` to resolve low-contrast issues against the dark background, and the phone CTA styles were improved for contrast.

### Verification evidence

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 5 suites and 20 tests passed.
- `npm run build`: passed successfully.

### Findings to carry into later reviews

- **Fact gap requiring owner input**: Competitor market scans show services like industrial/factory, plot/land selection, new build/renovation, and online plan review. These have *not* been added. Owner confirmation is required to determine if these specific additional categories should be listed on the site.
- The `consent` field is required in the browser form and documented in the Privacy policy, but it is not currently sent in the API payload or persisted to the MySQL database. This data-handling discrepancy should be addressed in Round 3 (API security, privacy/data handling).

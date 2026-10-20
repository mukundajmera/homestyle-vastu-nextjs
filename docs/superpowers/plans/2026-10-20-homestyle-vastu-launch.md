# Homestyle Vastu Website Delivery Plan

> **For agentic workers:** Execute with the Jules remote workflow. Keep each review round sequential and independently verified.

**Goal:** Deliver a responsive, trustworthy Homestyle Vastu lead-generation website with a consultation form that persists leads to a dedicated Hostinger database and hands the visitor to WhatsApp. Email notifications are deferred at the owner's latest direction.

**Architecture:** Use the new public GitHub repository `mukundajmera/homestyle-vastu-nextjs` with Next.js 16 App Router, a server-validated consultation API, and Hostinger MySQL. Never expose database secrets in browser code. Deploy first to a new Hostinger staging site after the user confirms the named Hostinger write; leave the current WordPress sites, portfolio site, production domain, and DNS/MX unchanged.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Jest/React Testing Library, Playwright, and MySQL via `mysql2`.

**Spec:** User request in this conversation; existing repository `src/app`, public website `https://www.fengshuihomestylevastu.com/`, and Stitch project `9811959718564869819` / design system `assets/990deac1457b42fe8564127c2d48671d`.

## Global Constraints

- Public name: **Homestyle Vastu**; current public website identifies **Sanjay Jain** and lists home, business, on-site, and online/remote consultations. The owner confirmed 22 years of experience as of 2026 and approved the current-site Jaipur address.
- The owner approved listing plot/land selection, new construction or renovation guidance, industrial/factory Vastu, and online floor-plan review.
- Use a light, vivid, architectural visual direction based on Stitch’s Citrus Courtyard system; avoid an overall dark theme.
- Do not invent experience years, credentials, awards, testimonials, case-study outcomes, health claims, prosperity claims, or guaranteed results.
- Do not publish unreviewed personal photos from Drive. Use commissioned/generated or custom vector imagery until a portrait is explicitly approved.
- Keep the public site to five pages or fewer, including a concise privacy page.
- All lead fields require visible labels, server-side validation, clear errors/loading/success states, consent, and a privacy notice.
- Save the lead before offering WhatsApp. Email notifications are not part of this launch; do not display an email-delivery state or claim an email was sent.
- WhatsApp handoff follows a successful submission and contains only a minimal, non-sensitive summary; phone remains available as a fallback.
- Secrets are environment variables managed in Hostinger, never committed. Use the database host supplied by Hostinger; the app defaults the port to `3306` only when it is omitted.
- Do not deploy to or replace `fengshuihomestylevastu.com`, the existing portfolio Node site, or any WordPress site during this staging delivery.

## Review Focus

- Missing/invalid form values, oversized text, spam honeypot, and rate-limit behavior must fail safely and explain how to recover.
- A successful flow must persist first, then offer the correct WhatsApp handoff. Email notifications are deferred; do not implement, configure, or claim email delivery in this release.
- Mobile layouts must work at 360px, 390px, tablet, and desktop widths without horizontal overflow, obscured focus, or touch targets smaller than 44px.
- Reduced-motion preference, keyboard-only use, form errors, and menu/accordion state must be accessible.
- Metadata, canonical host, sitemap, structured business facts, and robots behavior must be correct for staging vs production.

## File Structure / Work Units

- `src/app/page.tsx`, `services/page.tsx`, `about/page.tsx`, and `contact/page.tsx`: polished page hierarchy and factual, conversion-focused copy.
- `src/app/privacy/page.tsx`: short plain-language explanation of collected fields, purpose, contact, and retention placeholder to be owner-confirmed.
- `src/components/contact-form.tsx`: accessible client interaction, submission states, and successful WhatsApp handoff.
- `src/app/api/contact/route.ts`: server validation, abuse controls, persistence, and idempotency; it does not send email or create a WhatsApp URL.
- `mysql2` access remains inside the server API route; do not add unused mail services.
- `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, and `proxy.ts`: deployment-aware SEO and security headers.
- `scripts` or `src/lib/server`: safe first-use schema initialization or a documented migration that works with Hostinger Node hosting.
- `__tests__` and browser checks: meaningful API/form, navigation, responsive, keyboard, and SEO checks using safe mocks; no real lead data or email sends in tests.
- `docs/launch`: environment setup, deployment runbook, and review log with evidence, decisions, and remaining owner inputs.

## Delivery Tasks

1. **Baseline and content:** inspect the current route/code and existing tests; retain verified service/contact facts; replace generic, unsupported claims and slash-separated WhatsApp prompts. Use the owner-confirmed 22-year claim, address, and approved service categories. Build practical service explanations, the consultation journey, practitioner profile area, and a contact CTA without inventing credentials.
2. **Design and interaction:** use the Citrus Courtyard Stitch design system as reference; build a distinct light architectural visual system with genuine responsive behavior, restrained motion, reduced-motion support, strong contrast/focus, and optimized locally stored imagery/illustrations.
3. **Lead backend:** add a compact form and server route. Save a minimized lead record to a dedicated MySQL database using prepared statements and an idempotency key. Add streamed request-size checks, a process-local per-phone rate limit, a honeypot, and server-recorded consent evidence. Email notifications are explicitly deferred.
4. **WhatsApp flow:** after confirmed persistence, hand off to `wa.me/919828088678` with a generated concise message based on the visitor's selected service and property category; do not put email, phone, location, or free-text details in the query string. Provide a visible fallback link.
5. **SEO/security/performance:** correct titles/descriptions/canonical metadata, local-business structured data using only confirmed public facts, sitemap/robots per host, image/font delivery, CSP and security headers, noindex on staging, and no unneeded tracking.
6. **Automated/manual verification:** run the existing suite plus new Jest/integration/browser tests; cover narrow mobile, tablet, desktop, keyboard/reduced motion, empty/invalid/spam/error/success, database persistence and idempotent retries, and WhatsApp destination. Capture visual evidence at phone and desktop sizes.
7. **Four sequential Jules review rounds:** (1) responsive and interaction audit, (2) content accuracy and lead conversion, (3) SEO/performance/accessibility/security/backend, (4) regression and Hostinger release readiness. Each round must list findings, fix them, rerun relevant tests, and produce an auditable summary. Codex independently checks the diff and test evidence after every round.
8. **Release staging:** push the verified work to the public GitHub repo; then, after a separate exact-resource Hostinger confirmation, create a new temporary Hostinger website and dedicated database, set the preview URL and database environment variables, deploy the Node.js app, and validate live page text, database persistence, WhatsApp handoff, noindex robots, and logs. Do not change production domain or DNS/MX.

## Acceptance Criteria

- All five pages render correctly with no fabricated profile or result claims.
- The responsive site has no horizontal overflow at tested sizes; primary navigation and form work with keyboard and touch.
- A valid inquiry creates one database lead and offers a WhatsApp handoff. Retries with the same key do not create duplicate leads. Validation and storage failure show recoverable user states. No email notification is claimed or attempted.
- No secret values appear in source, logs, Git history, test snapshots, or client bundles.
- `npm run typecheck`, lint, all Jest tests, production build, and browser checks pass; output and remaining environment-dependent checks are recorded.
- A separate Hostinger staging deployment returns HTTP 200 and renders expected copy; existing WordPress, portfolio, production domain, and mail DNS are untouched.

## Decisions / External Inputs

- NotebookLM source access currently reports expired authentication; use accessible Drive and the public website as interim sources, and re-read NotebookLM after access is restored.
- Email notifications are deferred by owner direction; no recipient is needed for this staging release.
- Earlier Hostinger capability research found a Node.js path for this stack; the account/site inventory and staging target must be checked before provisioning. The staging target must be a new temporary Hostinger hostname, not an existing site.
- The owner confirmed the current-site address and approved `+91 98280 88678` for phone and WhatsApp.
- The owner confirmed 22 years of experience as of 2026. Avoid the conflicting 25-year notebook draft.

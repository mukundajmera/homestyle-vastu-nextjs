# Homestyle Vastu Website Delivery Plan

> **For agentic workers:** Execute with the Jules remote workflow. Keep each review round sequential and independently verified.

**Goal:** Deliver a responsive, trustworthy Homestyle Vastu lead-generation website with a consultation form that persists leads to a dedicated Hostinger database, sends an email notification, and hands the visitor to WhatsApp.

**Architecture:** Keep the existing Next.js 15 App Router application and public GitHub repository. Add a server-validated consultation API backed by Hostinger MySQL and SMTP environment variables; never expose database or SMTP secrets in browser code. Deploy first to a new Hostinger staging subdomain after the user confirms the named Hostinger write; leave the current WordPress sites, portfolio site, production domain, and DNS/MX unchanged.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS, Jest/React Testing Library, Playwright, MySQL via `mysql2`, and SMTP via a server-only mail library.

**Spec:** User request in this conversation; existing repository `src/app`, public website `https://www.fengshuihomestylevastu.com/`, and Stitch project `9811959718564869819` / design system `assets/990deac1457b42fe8564127c2d48671d`.

## Global Constraints

- Public name: **Homestyle Vastu**; current public website identifies **Sanjay Jain** and lists home, business, on-site, and online/remote consultations.
- Use a light, vivid, architectural visual direction based on Stitch’s Citrus Courtyard system; avoid an overall dark theme.
- Do not invent experience years, credentials, awards, testimonials, case-study outcomes, health claims, prosperity claims, or guaranteed results.
- Do not publish unreviewed personal photos from Drive. Use commissioned/generated or custom vector imagery until a portrait is explicitly approved.
- Keep the public site to five pages or fewer, including a concise privacy page.
- All lead fields require visible labels, server-side validation, clear errors/loading/success states, consent, and a privacy notice.
- Store the consultation before attempting email. Keep notification status distinct; never lose the lead because SMTP is unavailable.
- WhatsApp handoff follows a successful submission and contains only a minimal, non-sensitive summary; phone remains available as a fallback.
- Secrets are environment variables managed in Hostinger, never committed. The app’s MySQL host is `127.0.0.1` on port `3306`.
- Do not deploy to or replace `fengshuihomestylevastu.com`, the existing portfolio Node site, or any WordPress site during this staging delivery.

## Review Focus

- Missing/invalid form values, oversized text, spam honeypot, and rate-limit behavior must fail safely and explain how to recover.
- A database insert must survive email failure; a successful flow must persist first, notify by email, then navigate to the correct WhatsApp number with an accurate message.
- Mobile layouts must work at 360px, 390px, tablet, and desktop widths without horizontal overflow, obscured focus, or touch targets smaller than 44px.
- Reduced-motion preference, keyboard-only use, form errors, and menu/accordion state must be accessible.
- Metadata, canonical host, sitemap, structured business facts, and robots behavior must be correct for staging vs production.

## File Structure / Work Units

- `src/app/page.tsx`, `services/page.tsx`, `about/page.tsx`, and `contact/page.tsx`: polished page hierarchy and factual, conversion-focused copy.
- `src/app/privacy/page.tsx`: short plain-language explanation of collected fields, purpose, contact, and retention placeholder to be owner-confirmed.
- `src/components/consultation-form.tsx`: accessible client interaction, submission states, and successful WhatsApp redirect.
- `src/app/api/consultations/route.ts`: server validation, abuse controls, persistence, notification, and minimal WhatsApp URL response.
- `src/lib/server/db.ts`, `mail.ts`, and `consultation-schema.ts`: isolated server-only services and shared validation rules.
- `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, and `middleware.ts`: deployment-aware SEO and security headers.
- `scripts` or `src/lib/server`: safe first-use schema initialization or a documented migration that works with Hostinger Node hosting.
- `__tests__` and Playwright configuration: meaningful route, persistence, mail, navigation, responsive, keyboard, and SEO checks; no production email or real lead data in tests.
- `docs/launch`: environment setup, deployment runbook, and review log with evidence, decisions, and remaining owner inputs.

## Delivery Tasks

1. **Baseline and content:** inspect the current route/code and existing tests; retain verified service/contact facts; replace generic, unsupported claims and slash-separated WhatsApp prompts. Build practical service explanations, the consultation journey, FAQs, practitioner profile area, and a contact form CTA without inventing profile credentials or experience.
2. **Design and interaction:** use the Citrus Courtyard Stitch design system as reference; build a distinct light architectural visual system with genuine responsive behavior, restrained motion, reduced-motion support, strong contrast/focus, and optimized locally stored imagery/illustrations.
3. **Lead backend:** add a compact form and server route. Save a minimized lead record to a dedicated MySQL database using prepared statements. Send a server-side notification email through configured SMTP. Preserve the record and report notification failures if SMTP fails. Add rate limiting/honeypot/size constraints and privacy consent.
4. **WhatsApp flow:** after confirmed persistence, hand off to `wa.me/919828088678` with a generated concise message based on the visitor’s selected property type and location; do not put email, phone, or free-text details in the query string. Provide a clear fallback if the app handoff cannot open.
5. **SEO/security/performance:** correct titles/descriptions/canonical metadata, local-business structured data using only confirmed public facts, sitemap/robots per host, image/font delivery, CSP and security headers, noindex on staging, and no unneeded tracking.
6. **Automated/manual verification:** run the existing suite plus new Jest/integration/browser tests; cover narrow mobile, tablet, desktop, keyboard/reduced motion, empty/invalid/spam/error/success, DB persistence, SMTP success/failure, and WhatsApp destination. Capture visual evidence at phone and desktop sizes.
7. **Four sequential Jules review rounds:** (1) responsive and interaction audit, (2) content accuracy and lead conversion, (3) SEO/performance/accessibility/security/backend, (4) regression and Hostinger release readiness. Each round must list findings, fix them, rerun relevant tests, and produce an auditable summary. Codex independently checks the diff and test evidence after every round.
8. **Release staging:** push the verified work to the public GitHub repo; then, after a separate exact-resource Hostinger confirmation, create a new free Hostinger subdomain, provision a dedicated website and database, set verified SMTP/notification env vars, deploy the Node.js app, and validate live page text, database persistence, email receipt, WhatsApp handoff, SEO robots, and logs. Do not cut production domain or mail DNS over without separate explicit confirmation.

## Acceptance Criteria

- All five pages render correctly with no fabricated profile or result claims.
- The responsive site has no horizontal overflow at tested sizes; primary navigation and form work with keyboard and touch.
- A valid inquiry creates one database lead before email delivery and returns a WhatsApp handoff. Validation, storage failure, and mail failure are tested and have recoverable user states.
- No secret values appear in source, logs, Git history, test snapshots, or client bundles.
- `npm run typecheck`, lint, all Jest tests, production build, and browser checks pass; output and remaining environment-dependent checks are recorded.
- A separate Hostinger staging deployment returns HTTP 200 and renders expected copy; existing WordPress, portfolio, production domain, and mail DNS are untouched.

## Decisions / External Inputs

- NotebookLM source access currently reports expired authentication; use accessible Drive and the public website as interim sources, and re-read NotebookLM after access is restored.
- Public email/notification recipient, SMTP mailbox and credentials are unknown. Do not send inquiries to a guessed address; production email acceptance is blocked until these are configured and tested.
- Hostinger account has an active Business plan and existing Node sites, but the current live domain is not listed under Hostinger. The staging target must be a new Hostinger subdomain, not an existing site.
- Confirm current phone/address before the new production release. Existing public copy lists `+91 98280 88678` and a Jaipur address.
- Experience is conflicting across draft materials (22 vs 25 years) and is unverified; omit it pending direct confirmation.

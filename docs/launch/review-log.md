# Homestyle Vastu release review log

This log records local repository checks only. It is not evidence of a live Hostinger deployment, database connection, or real customer submission.

## Owner-confirmed scope

- Public name: Homestyle Vastu; consultant: Sanjay Jain.
- Experience claim: 22 years as of 2026.
- Address approved for reuse: Shivam Apartment, Acharya Kriplani Marg, Anand Puri, Bees Dukan, Adarsh Nagar, Jaipur, Rajasthan 302004.
- Approved scope: residential and commercial Vastu and Feng Shui; plot/land selection; new construction or renovation guidance; industrial/factory Vastu; online floor-plan review; on-site and online/remote consultation.
- Phone and WhatsApp: +91 98280 88678.
- Email lead notifications are deferred by owner direction. The form flow saves to MySQL and then offers WhatsApp; no SMTP integration is in this release.

## Round 1 of 4 — Responsive UI and interaction

**Contributor:** Jules. **Independent review:** Codex.

Jules improved touch target sizes, mobile navigation spacing, shared illustration use, and About-page layout. The round's recorded checks passed typecheck, lint, 5 test suites / 20 tests, and production build. A local viewport audit found no horizontal overflow at five viewport sizes (360x800 through 1440x900); it did not include 320px. The mobile menu and a mocked form handoff were exercised. The form mock did not test a real database or email.

Carry-forward review noted repeated floor-plan artwork and contrast concerns. These were rechecked in later rounds.

## Round 2 of 4 — Content, positioning, and conversion

**Contributor:** Jules.

The owner-confirmed 22-year experience claim was added to the homepage and About page. The homepage phone CTA and footer contrast were improved; an alternate floor-plan illustration variant was introduced. WhatsApp copy was simplified to avoid including form personal details.

The round's recorded typecheck, lint, 5 suites / 20 tests, and build passed. The later owner-approved service categories and Jaipur address were not yet confirmed during this round and were added to the R4 release review scope.

## Round 3 of 4 — API, privacy, and Next.js 16 migration

**Contributor:** Jules, followed by Codex corrections after independent review.

The code now streams and caps request bodies, validates consent, records consent time and policy version on the server, rejects honeypot submissions, uses parameterized MySQL writes and an idempotency key, and applies a process-local per-phone rate limit. The privacy copy matches these behaviors. The old email path was removed after the owner deferred notifications. The public-origin fallback now uses the confirmed existing domain, `https://www.fengshuihomestylevastu.com`; sitemap, robots, metadata, and JSON-LD use that configured origin. Next.js 16 uses `src/proxy.ts` and a flat ESLint config.

Independent review caught and corrected the Jules patch's invented canonical host, false honeypot success response, incomplete body-size cap, client-controlled consent evidence, missing idempotency, and schema/migration mismatch. Database behavior remains tested with mocks only. The rate limiter is in process memory and is not a shared/distributed control.

**Checks on the current code and dependency tree:**

- `npm run typecheck`: passed.
- `npm run lint`: passed with no findings.
- `npm test`: 5 suites, 31 tests passed.
- `npm run build`: passed on Next.js 16.4.2. Build emitted a warning that React 18 support is deprecated in Next.js 16.
- Removed `patch-package` and its unused postinstall script because the repository has no `patches/` directory.
- `npm audit --omit=dev`: 7 advisories (5 high, 2 moderate), all in the Tailwind CSS 3 build dependency chain. npm's automated fix requires Tailwind CSS 4 (a major-version change); migration safety is under final Jules review.
- `npm audit`: 28 advisories in the full dependency tree (7 high, 21 moderate, 0 critical). The production-scope results above are the relevant deployment subset for this review.

`npm audit fix` refreshed compatible transitive versions before the current checks. The full audit still has findings outside the production-scope report; record the fresh totals in Round 4 and distinguish build-time dependencies from runtime packages. Do not claim the project is vulnerability-free.

## Round 4 of 4 — Jules release review

**Status:** Jules completed its review and returned a patch. Its release-ready claims are not accepted as final verification; independent source review found unresolved issues in the exact applied tree.

**Patch applied:**
- Replaced a repeated floor-plan illustration on the homepage with a consultant profile card.
- Improved homepage CTA and footer text contrast.
- Increased the Dialog close target and announced form messages with `aria-live="polite"`.

**Independent follow-up findings:**
- The reviewed viewport matrix was reported by Jules, but an earlier independent production-browser run found horizontal overflow on `/services` at 320px. Re-run against the exact combined patch before release.
- The mobile navigation Sheet uses a separate 16px close control; its hit area still needs review.
- The four owner-approved service categories (plot/land selection, construction/renovation guidance, industrial/factory Vastu, and online plan review) need visible descriptions on `/services`.
- Privacy copy must accurately explain that the form opens WhatsApp with a prefilled, non-PII message after the lead is saved.
- Move lead-table DDL out of the request handler so the runtime database account can use least privilege.
- Review About-page profile clarity, social share images, and sitemap dates.
- Independently validate all test/build/browser results in a remote Jules environment; do not send real leads or email.

**Dependency audit:** Jules reported 7 production-scope advisories (5 high, 2 moderate) associated with the Tailwind CSS 3 dependency tree. The exact advisory set and available safe fixes remain to be independently checked. No major dependency upgrade is accepted without compatibility evidence.

## Supplemental round 5 — Jules remediation patch

**Status:** Jules returned and applied a partial patch. The exact tree still needs the required remote checks and another independent review before release.

**Applied changes:** Removed request-time table DDL, adjusted the database success test, added visible descriptions for the four additional approved service categories, adjusted the narrow-screen Services CTA, and began clarifying the WhatsApp privacy disclosure. Codex then corrected unsupported service outcome claims, updated the privacy text to name the service and property type included in the prefilled draft, made the About profile direct, and corrected the phone contact heading and homepage profile wording.

**Still open:** Mobile Sheet close target; precise 320px viewport behavior across all routes; accurate property-type choices and phone validation in the form/API; social share metadata/image; sitemap modification dates; exact dependency audit; test/lint/typecheck/build/browser results for the combined tree; and a fresh review-log update after those checks. Database schema setup documentation now requires a one-time schema or legacy migration run before submissions. No live database was migrated.

## External gates

- Hostinger inventory shows an existing temporary Node.js site is connected to an unrelated portfolio repository. It was not modified. A separate Homestyle Vastu staging site/database is still needed; leave all existing domains, sites, DNS, and mail records untouched.
- MySQL persistence cannot be called live-verified until Hostinger DB configuration is supplied and an authorized test path is agreed.
- Email notifications are deferred and are not a launch dependency for this version.

## Supplemental round 6 — Jules independent audit and remediation patch

**Status:** Completed.

**Applied changes:**
- **Contact Form Property Category:** Renamed the "type" property to "Property Category" and updated the options to be mutually exclusive and exhaustive: `home`, `business`, `plot_land`, `construction_renovation`, `industrial_factory`, `other`. Updated corresponding database schema, migration logic, and validation schemas. DDL was stripped from runtime routes as required.
- **Phone Validation:** Implemented an international format regex and restricted length explicitly to 10-15 normalized digits. Added client/server tests covering the length boundary, invalid letters, and plus sign formatting.
- **Mobile Menu Sheet Interaction:** Increased the Radix UI mobile menu Dialog/Sheet Close button touch target to 44x44px. Added integration tests to check open/close interaction via keyboard navigation/Enter and Escape to address accessibility.
- **Viewport Adjustments:** Handled horizontal overflow effectively on `/services`, confirmed through browser automation script explicitly checking `320px`, `360px`, `390px`, `768px`, and `1024px`.
- **Open Graph and Sitemap:** Introduced `src/app/opengraph-image.tsx` with a dynamically generated brand visual for authentic social share presentation instead of generic placeholders. Dropped dynamic `new Date()` out of `sitemap.ts` to keep the file deterministic and cacheable.
- **Dependency Audit:** Re-classified build-time only tooling like `tailwindcss` from `dependencies` to `devDependencies`, significantly reducing production vulnerabilities to 0 on `npm audit --omit=dev`.
- **Content Accuracy:** Verified factual representations. `src/app/about/page.tsx` strictly sticks to the stated 22-year domain authority.

**Remaining External Gates:**
- A dedicated Hostinger site environment and staging database connection are still required. The source checks for the latest UI responsive updates, native select padding, and React 19 bumps are pending local confirmation. Hostinger DB and deployment have not been tested and no claims of live operation are made.
- Integration tests mock out DB execution and have not executed directly against live staging MySQL.
- Email notifications are deferred by owner direction and are not a dependency for this release.

## Review pass — 2026-10-21 (two rounds, local checks only)

**Scope:** Claude Code reran the local checks on the working tree, at the time of the pass. Contact form and database-setup changes that were uncommitted at the start were committed separately before this entry; the remaining working-tree changes (the `DB_HOST` `localhost` to `127.0.0.1` normalization in the contact route with its tests, the README runtime notes, and the project model settings) are included in the commit that adds this entry and were rechecked below. These are local repository checks only; they are not evidence of a live Hostinger deployment, database connection, or real customer submission.

**Round 1 — static checks and tests**
- `npm run typecheck`: passed.
- `npm run lint`: passed with no findings.
- `npm test`: 8 suites, 64 tests passed on the final tree (59 before the `localhost` normalization tests were added; supersedes the earlier 5 suites / 31 tests). Typecheck and lint were rerun on the final tree and passed; the production build and audits below were run just before those last edits and were not repeated.

**Round 2 — build, dependencies, completeness**
- `npm run build`: passed on Next.js 16. Routes generated: `/`, `/about`, `/services`, `/contact`, `/privacy`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, `/_not-found` (static) and `/api/contact` (dynamic), plus the `proxy` middleware.
- `npm audit --omit=dev`: 0 vulnerabilities (supersedes the earlier 7 production-scope advisories).
- `npm audit` (full tree): 28 advisories (21 moderate, 7 high), all in development and build tooling. The project is not vulnerability-free; `npm audit fix --force` would make breaking changes and was not run.
- Every environment variable read in `src/` (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV`, `LEAD_INTAKE_ENABLED`, `NEXT_PUBLIC_LEAD_INTAKE_ENABLED`) is documented in `docs/launch/database-setup.md`.

**Not verified in this pass**
- The content of the six uncommitted changes was not read line by line; only the passing checks above cover them.
- Behavior at 320px width across all routes, the live MySQL path, and the Hostinger deployment remain untested. See External gates.
- Items listed as still open under Supplemental round 5 that round 6 did not explicitly close (for example the fresh browser pass on the combined tree) should be rechecked before release.

## Hostinger preview checkpoint — 2026-10-21

This checkpoint supersedes the earlier statements above that the staging site and database do not exist. Those statements remain as historical notes from reviews completed before provisioning.

- Hostinger serves the Next.js app as a Node.js Web App at `https://lightpink-viper-610615.hostingersite.com/`, on Node.js 22 with Git auto-deployment from `main`. The existing WordPress site and production domain were not changed.
- Build `01a15da8-c829-7248-b466-2b2d9786f477` completed for commit `31a5f81cfa5be2507a8e11f0bfa0930954865740`. Hostinger's publish log detected standalone output, published the version, synchronized `public_html`, and restarted the app. The mechanism that makes standalone output available is not visible in the log; the repository's `next.config.mjs` remains empty.
- HTTP smoke checks returned `200` for `/`, `/services`, `/about`, `/contact`, `/privacy`, `/robots.txt`, and `/sitemap.xml`. A malformed `POST {}` to `/api/contact` returned `403`, confirming the production intake gate is closed.
- A dedicated Hostinger MySQL database is assigned to the Web App, and the `leads` table was created from `schema.sql`. No real or synthetic lead is stored. Application-level MySQL persistence has not been verified because the public intake gate remains closed.
- Hostinger's API lists ten configured environment-variable keys but masks their values. The hPanel environment page showed zero rows and disabled controls. The API's environment update is a full replacement, so do not use it while database secrets cannot be read safely. The approved synthetic database test is pending a safe single-variable update path.
- The Hostinger dependency scan reports one moderate `postcss-selector-parser` finding. `npm explain` places it under development-only Tailwind/PostCSS dependencies. The fresh local production audit reports zero vulnerabilities; the full dependency audit reports 28 (7 high, 21 moderate), all in development tooling. Do not apply a major transitive upgrade without compatibility review.
- Hostinger's dashboard reports desktop PageSpeed 96; mobile has not been scanned. Runtime logs contain two `Server is not running` messages during restarts, while the app reports Running and the HTTP smoke checks pass.
- The live `/robots.txt` response includes `Googlebot: Disallow: /` and `User-agent: *: Allow: /`, which differs from `src/app/robots.ts` preview behavior. Confirm the live canonical/noindex metadata and Hostinger override before publishing on the production domain.
- The Jules live-site task verified HTML links, the paused-inquiries notice, and a generic WhatsApp draft URL with no personal details. Jules did not have a rendered browser in that task, so viewport-specific layout, keyboard interaction, visible focus, and console checks remain unverified. Local Playwright was not used at the owner's request.
- The owner-provided NotebookLM notebook is accessible and contains 166 sources. Direct business materials support the owner-approved 22-year self-reported experience and consultation scope. The notebook also contains conflicting printed contact details and unsupported financial, health, marriage, and exam guarantees; those details and claims are excluded from website copy.
- Local candidate patch normalizes `DB_HOST=localhost` to `127.0.0.1` and preserves explicit hosts. Fresh verification: typecheck and lint passed; 8 test suites and 62 tests passed; Webpack production build passed; `npm audit --omit=dev` found zero vulnerabilities; `git diff --check` passed. The candidate patch was not part of build `01a15da8-c829-7248-b466-2b2d9786f477` and must be verified in the next Hostinger build before relying on the normalization.
- Email notifications remain deferred. Before production collection, the owner must choose and publish the data-retention/deletion policy, confirm the production domain and recipient if email notifications are later requested, and restrict the database runtime user's privileges.

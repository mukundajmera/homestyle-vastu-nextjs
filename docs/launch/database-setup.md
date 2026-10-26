# Hostinger database setup

## New preview database

Create a dedicated MySQL database for this Next.js preview. Before the first inquiry, run `schema.sql` once against the new database using its database management interface. Do not run a migration against a fresh database. For an existing database, identify its schema version and take a backup first:

- If the database has the original leads table and has **not** run the earlier `migrate-leads-v1.sql`, run v1, v2, and v3.
- If the database already completed the earlier v1 migration, run v2 and then v3 when it still has the six-category enum.
- If the database already uses the current five property categories (`home`, `business`, `plot`, `industrial`, `other`), no category migration is needed.
- For existing v2 leads using the six-category enum, run `migrate-leads-v3.sql` once to map legacy values to the new five categories (`plot_land` -> `plot`, `construction_renovation` -> `other`, `industrial_factory` -> `industrial`). Do not rerun prior migrations on the fresh staging DB.

Do not rerun v1 on a database that already completed it; v1 adds columns and an index that would conflict on a second run. Do not rely on the request handler to create or alter tables. Add the connection values to the Node.js application's Hostinger environment settings:

- `DB_HOST`
- `DB_PORT` (normally `3306`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `NEXT_PUBLIC_SITE_URL` (the temporary preview site's origin, with no path)
- `NEXT_PUBLIC_SITE_ENV=preview`
- `LEAD_INTAKE_ENABLED=false` (keep false on public preview)
- `NEXT_PUBLIC_LEAD_INTAKE_ENABLED=false` (keep false on public preview)
- `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile secret, server only). Without it the production inquiry endpoint refuses every submission.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Turnstile site key, shown on the form). Set it with the secret above so the widget appears.
- `TURNSTILE_HOSTNAME` (optional, hostname only, e.g. `preview.example.com`). Tokens must be issued for this hostname. Defaults to the production domain in `src/lib/site.ts`, so set it on preview deployments.

The form's captcha is checked on the server: the endpoint verifies each token with Cloudflare, checks its hostname and action, and only then saves the lead or sends the email. Hiding the widget or skipping it in the browser does not bypass the check.

Keep database credentials in Hostinger environment settings. Do not commit them or send them in chat. The request handler uses the configured database for lead inserts and idempotency checks; provision the schema before enabling the form. Restrict the runtime account to the database permissions required by those operations wherever the hosting provider permits it. The runtime query uses `INSERT ... ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`, so it needs `INSERT`, `SELECT`, and `UPDATE` access on `leads` (or equivalent column-level rights, where supported). The runtime user does not need schema-management privileges.

`NEXT_PUBLIC_SITE_ENV=preview` keeps the preview out of search results. Set these values before building/redeploying so canonical metadata, robots, and sitemap are generated for the preview host. Do not set this preview to `production`.

> **Important Setup Note:** Keep both lead intake gates (`LEAD_INTAKE_ENABLED` and `NEXT_PUBLIC_LEAD_INTAKE_ENABLED`) false on public preview initially. You can temporarily set **only the server gate** (`LEAD_INTAKE_ENABLED=true`) true solely for an already-authorized synthetic DB verification, then reset it to false immediately after. Before production collection, the owner must choose and publish a retention/deletion policy and replace the preview-only privacy notice with an accurate production policy. Only then may both flags be set to `true` and the application rebuilt.


## Migration history

The original leads table lacked consent evidence, service interest, and idempotency fields. `CREATE TABLE IF NOT EXISTS` does not add those fields to an existing table. After taking a backup, run `migrate-leads-v1.sql` once to add them. Existing rows are marked with consent value `0` and policy version `legacy`; the migration does not claim that historic leads gave consent. Then run `migrate-leads-v2.sql` to widen the property-category enum, map legacy `residential` / `commercial` values to `home` / `business`, and narrow the enum to the six categories.

A subsequent v3 migration (if applicable to the environment) maps the six categories down to the current five: `plot_land` -> `plot`, `industrial_factory` -> `industrial`, and maps the deprecated `construction_renovation` property type to `other` (since construction/renovation is preserved in `service_interest`).

> **Migration Path:**
> - For existing legacy databases (not v1 yet): run `v1`, then `v2`, then `v3`.
> - For existing v2 databases: run `v3`.
> - For a fresh database: run **none** of them. Just run `schema.sql` once. Do not run any legacy migrations against a fresh database.

## Current lead flow and limitations

- The API validates the request, enforces a 5 KB streamed body limit, checks consent, applies a process-local limit of 10 submissions per phone number in 15 minutes, and writes the lead with a unique submission ID before returning success.
- The rate limiter keeps only a one-way hash of the phone number in memory for 15 minutes. It clears on process restart and is not shared across multiple app workers. If the hosting setup scales to multiple workers, use a shared rate-limit store or a verified Hostinger edge control.
- Email notifications are deferred for this launch. The form does not send email; it stores the optional visitor email with the lead and offers a WhatsApp handoff.
- WhatsApp receives only a short message based on the selected service category. The property category, visitor's personal details, and free-text inquiry stay out of the WhatsApp URL.
- The privacy page does not promise a retention period. The owner must choose and publish one before production lead collection begins.

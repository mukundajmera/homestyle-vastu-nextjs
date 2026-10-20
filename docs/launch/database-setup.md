# Hostinger database setup

## New preview database

Create a dedicated MySQL database for this Next.js preview. Before the first inquiry, run `schema.sql` once against the new database using its database management interface. For a database that already contains the earlier leads schema, back it up and run `migrate-leads-v1.sql` once instead. Do not rely on the request handler to create or alter tables. Add the connection values to the Node.js application's Hostinger environment settings:

- `DB_HOST`
- `DB_PORT` (normally `3306`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `NEXT_PUBLIC_SITE_URL` (the temporary preview site's origin, with no path)
- `NEXT_PUBLIC_SITE_ENV=preview`

Keep database credentials in Hostinger environment settings. Do not commit them or send them in chat. The request handler uses the configured database for lead inserts and idempotency checks; provision the schema before enabling the form. Restrict the runtime account to the database permissions required by those operations wherever the hosting provider permits it.

`NEXT_PUBLIC_SITE_ENV=preview` keeps the preview out of search results. Set these values before building/redeploying so canonical metadata, robots, and sitemap are generated for the preview host. Do not set this preview to `production`.

## Existing database from the earlier schema

The earlier version of this repository created a `leads` table without consent evidence, service interest, or idempotency fields. `CREATE TABLE IF NOT EXISTS` does not add those fields to an existing table. Back up the database, then run `migrate-leads-v1.sql` once before deploying the updated app. Existing rows are marked with consent value `0` and policy version `legacy`; the migration does not claim that historic leads gave consent.

For a fresh database, run `schema.sql` once. Do not run the legacy migration against a fresh table.

## Current lead flow and limitations

- The API validates the request, enforces a 5 KB streamed body limit, checks consent, applies a process-local limit of 10 submissions per phone number in 15 minutes, and writes the lead with a unique submission ID before returning success.
- The rate limiter keeps only a one-way hash of the phone number in memory for 15 minutes. It clears on process restart and is not shared across multiple app workers. If the hosting setup scales to multiple workers, use a shared rate-limit store or a verified Hostinger edge control.
- Email notifications are deferred for this launch. The form does not send email; it stores the optional visitor email with the lead and offers a WhatsApp handoff.
- WhatsApp receives only a short message based on the selected service and property category. The visitor's personal details and free-text inquiry stay out of the WhatsApp URL.

# Homestyle Vastu Launch Review Log

## Initial Implementation Pass

**Date:** 2026-10-20
**Completed by:** Jules

### Implementation Overview
- Setup the "Citrus Courtyard" design system based on the provided Stitch specification in `globals.css` and `tailwind.config.ts`.
- Removed unsupported/fictional claims, placeholders, and unverified reviews from the content boundary. Kept only verifiable information regarding Sanjay Jain's services in Jaipur and online.
- Created `/contact` and `/privacy` pages.
- Created `/api/contact` robust API endpoint utilizing `zod` for validation, a honeypot mechanism for bot prevention, parameterized `mysql2` logic to store leads securely, and `nodemailer` configured for a reliable SMTP server-only email send. The DB and Mail flow handles failures gracefully.
- The `schema.sql` is stored safely under `docs/launch/schema.sql`.
- Fixed the SEO implementation in Next.js. Canonical URLs, robust `robots.ts`, and `sitemap.ts` are set up. `sitemap.ts` is dynamically aware of `process.env.NEXT_PUBLIC_SITE_ENV` staging versus production deployments.
- Test coverage expanded with Playwright/Jest checking the contact API, React rendering, and Form validations. Tests run successfully (`npm run typecheck`, `npm run lint`, `npm test`).
- Project builds cleanly (`npm run build`).

### Hostinger Deployment Runbook

1. **Environment Provisioning**: Set up the Hostinger shared hosting environment for a Node.js (App Router) runtime, not static export.
2. **Database Provisioning**: Ensure a MySQL DB is created in Hostinger. Note credentials securely. Do not store in Git.
3. **Email Provisioning**: Ensure SMTP credentials for sending automated lead forms are acquired safely via Hostinger mail.
4. **Environment Variables Configured in Hostinger**:
   ```
   # Hostinger environment values
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=<Your Database Name>
   DB_USER=<Your Database User>
   DB_PASSWORD=<Your Database Password>

   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=<Your Email Used For Sending>
   SMTP_PASSWORD=<Your Email Password>

   MAIL_FROM=<Your Sending Email>
   LEAD_NOTIFICATION_EMAIL=<Your Personal/Receiving Email>
   WHATSAPP_PHONE=919828088678

   NEXT_PUBLIC_SITE_URL=https://www.homestylevastu.com
   NEXT_PUBLIC_SITE_ENV=production
   ```
5. **Database Initialization**: Run the schema provided in `docs/launch/schema.sql` on your Hostinger MySQL database through phpMyAdmin or SSH.
6. **Execution**: Start the server via `npm run build && npm run start` configured in the Hostinger pm2 panel or server start scripts.

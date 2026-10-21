# Homestyle Vastu

A responsive lead-generation website for Homestyle Vastu with Sanjay Jain, covering residential and commercial Vastu and Feng Shui, plot selection, construction and renovation guidance, industrial and factory Vastu, and online floor-plan review.

## Local setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/mukundajmera/homestyle-vastu-nextjs.git
   cd homestyle-vastu-nextjs
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002).

## Available checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Production runtime

This is a Next.js App Router application that runs on a Node.js runtime. A temporary Hostinger Web App is available at [lightpink-viper-610615.hostingersite.com](https://lightpink-viper-610615.hostingersite.com/). Hostinger connects it to this repository's `main` branch and has Git auto-deployment enabled. The app uses Node.js 22 and Next.js 16.4.2. The existing WordPress website and production domain are unchanged.

The preview keeps lead intake disabled. The server returns `403` for contact submissions while the gate is closed. The consultation table is provisioned, but application-level database persistence has not yet been verified with a synthetic lead. Do not submit real inquiries to the preview.

Email notifications are deferred. Before production lead collection, publish a retention and deletion policy, confirm the production domain and SEO settings, and reduce the Hostinger database user to the permissions documented below.

## Database Runtime Permissions

The API routes connect to the MySQL database. Ensure the runtime user only has the minimal required permissions:
- `INSERT` on the `leads` table.
- `SELECT` on the `leads` table.
- `UPDATE` on the `leads` table, required by the idempotent `ON DUPLICATE KEY UPDATE` insert path.

Do not grant the runtime user database or table-creation privileges. Provision and migrate the schema separately before enabling inquiries.

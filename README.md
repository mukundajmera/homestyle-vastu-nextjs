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

This is a Next.js App Router application and needs a Node.js runtime. Hostinger plan capability has been confirmed, but no website or deployment connection has been created. The production subdomain and deployment settings still need to be selected. The existing WordPress website is unchanged.

## Database Runtime Permissions

The API routes connect to the MySQL database. Ensure the runtime user only has the minimal required permissions:
- `INSERT` on the `leads` table.
- `SELECT` on the `leads` table.
- `UPDATE` on the `leads` table, required by the idempotent `ON DUPLICATE KEY UPDATE` insert path.

Do not grant the runtime user database or table-creation privileges. Provision and migrate the schema separately before enabling inquiries.

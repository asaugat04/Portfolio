# Saugat's portfolio

Next.js, TypeScript, Tailwind CSS, shadcn/ui, Better Auth, Prisma, Neon, Cloudinary, and Resend.

## Setup

Use Node.js 22.12+.

```sh
npm ci
cp .env.example .env
# Fill in every service value in .env.
npm run db:generate
npm run db:deploy
npm run db:seed
npm run admin:create
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the actual origin, including the local port. Use Neon's pooled URL for `DATABASE_URL` and direct URL for `DIRECT_URL`. Generate `BETTER_AUTH_SECRET` and `RATE_LIMIT_SECRET` separately with `openssl rand -base64 32`.

`ADMIN_PASSWORD` is used only to create the initial admin. Remove it from `.env` afterwards. Public registration is disabled; access is checked against `User.isAdmin` in Neon. The provisioning command does not replace existing admins.

The public site reads from Neon and caches the result between visits. Admin edits invalidate that cache. Original content exists only as seed data in `prisma/seed/content.ts`. Seeding skips existing IDs; running it again restores any deleted original entries. Existing images and résumé are served from `public/`; new files upload to Cloudinary when you save an entry. Managed files are removed after their last content reference is replaced or deleted. Failed cleanup is retained for retry on the next content change. Enable PDF delivery in Cloudinary if résumé links are blocked.

## Structure

Each route has a `page.tsx` and its own `partials/`. Reused components belong in `src/components`; environment variables and routes are accessed through `src/constants`. Server Components call services directly; browser mutations use `src/lib/api/client.ts`.

Contact submissions are stored before email delivery. Failed notifications can be retried from the admin inbox.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Vercel

Configure the environment variables, set `NEXT_PUBLIC_SITE_URL=https://asaugat.com.np`, and use `npm run build`. Apply migrations, seed, and provision the admin against the production database before publishing. Use a separate Neon branch for preview deployments.

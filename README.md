# Design Factory

Design Factory is a modern creative learning and talent development hub for practical courses, portfolio development, mentorship, and opportunity matching.

## Vercel Deployment

Required environment variables:

```env
DATABASE_URL="postgresql://..."
ADMIN_TOKEN="a-long-random-secret"
```

`DATABASE_URL` must point to a production Postgres database, such as Vercel Postgres, Neon, Supabase, Railway, or Render Postgres.

`ADMIN_TOKEN` protects the waitlist export endpoint. Use a long random string and keep it private.

## Database

The waitlist uses Prisma with Postgres.

Run migrations against production before accepting signups:

```bash
npm run db:deploy
```

On Vercel, you can run this locally with the production `DATABASE_URL`, or from a trusted CI/deploy shell.

## View Waitlist Signups

```bash
curl https://your-domain.com/api/waitlist \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Local Development

```bash
npm install
npm run dev
```

If you have a local Postgres database:

```bash
cp .env.example .env
npm run db:migrate
```

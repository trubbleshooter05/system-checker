# symptom-checker

Standalone symptom SEO + checker loop (decoupled from FursBliss).

## What is included

- One SEO page: `/dog-shaking-not-eating`
- 3-step structured checker (no chatbot)
- OpenAI-powered structured assessment
- Supabase append-only storage in one table: `symptom_checks`
- Post-assessment email capture
- 48-hour follow-up email via cron (`/api/cron/followup`)

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Supabase
- OpenAI
- Resend
- Vercel

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. In Supabase SQL editor, run:

```sql
-- contents of supabase/schema.sql
```

4. Run dev server:

```bash
npm run dev
```

Open `http://localhost:3000/dog-shaking-not-eating`.

## Environment variables

- `NEXT_PUBLIC_APP_URL`
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CRON_SECRET`

## API routes

- `POST /api/symptom/check` - run AI assessment + insert `symptom_check_completed`
- `POST /api/symptom/lead` - insert `lead_capture` + send immediate save email
- `GET /api/cron/followup` - send due follow-up emails + insert `followup_sent`

## Deploy notes

- `vercel.json` runs follow-up cron hourly.
- If using cron auth, set `CRON_SECRET` and send `Authorization: Bearer <CRON_SECRET>`.

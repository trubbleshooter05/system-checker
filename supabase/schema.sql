create extension if not exists "pgcrypto";

create table if not exists public.symptom_checks (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  parent_check_id uuid null references public.symptom_checks (id),
  session_id text not null,
  page_slug text not null,
  dog_name text null,
  symptoms text[] null,
  duration text null,
  progression text null,
  appetite text null,
  energy text null,
  water_intake text null,
  notes text null,
  urgency_level text null,
  quick_summary text null,
  likely_drivers text[] null,
  next_actions text[] null,
  vet_now_signals text[] null,
  follow_up_window text null,
  disclaimer text null,
  email text null,
  followup_due_at timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_symptom_checks_event_created
  on public.symptom_checks (event_type, created_at desc);

create index if not exists idx_symptom_checks_due
  on public.symptom_checks (followup_due_at)
  where event_type = 'lead_capture';

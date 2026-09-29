-- XR Rentals: online inquiry logging
-- Run in Supabase SQL Editor, or with the Supabase CLI: `supabase db push`

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- customer
  full_name        text not null check (char_length(full_name) between 2 and 120),
  mobile           text not null check (char_length(mobile) between 7 and 20),
  email            text check (email is null or char_length(email) <= 160),
  facebook_name    text check (facebook_name is null or char_length(facebook_name) <= 120),

  -- event
  event_date       date not null,
  return_date      date,
  event_type       text check (event_type is null or char_length(event_type) <= 60),
  event_address    text not null check (char_length(event_address) between 5 and 300),
  delivery_needed  boolean not null default false,

  -- quantities
  tables_qty       integer not null default 0 check (tables_qty between 0 and 1000),
  chairs_qty       integer not null default 0 check (chairs_qty between 0 and 5000),
  kids_chairs_qty  integer not null default 0 check (kids_chairs_qty between 0 and 5000),
  videoke_qty      integer not null default 0 check (videoke_qty between 0 and 50),
  tents_qty        integer not null default 0 check (tents_qty between 0 and 200),

  estimated_total  numeric(12,2) not null default 0 check (estimated_total >= 0),
  notes            text check (notes is null or char_length(notes) <= 1000),
  agreed_to_policy boolean not null default false,

  -- admin workflow
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  admin_notes      text,
  source           text not null default 'website',
  user_agent       text,

  constraint inquiries_has_items check (
    tables_qty + chairs_qty + kids_chairs_qty + videoke_qty + tents_qty > 0
  ),
  constraint inquiries_return_after_event check (
    return_date is null or return_date >= event_date
  ),
  constraint inquiries_policy_agreed check (agreed_to_policy = true)
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_event_date_idx on public.inquiries (event_date);
create index if not exists inquiries_status_idx     on public.inquiries (status);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

-- Row Level Security:
-- the public website (anon key) may ONLY insert new inquiries.
-- Nobody can read/update/delete through the anon key. View and manage
-- inquiries in the Supabase Dashboard (Table Editor) or with the service role.
alter table public.inquiries enable row level security;

revoke all on public.inquiries from anon, authenticated;
grant insert on public.inquiries to anon, authenticated;

drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and admin_notes is null
    and source = 'website'
  );

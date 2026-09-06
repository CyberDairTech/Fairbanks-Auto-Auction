-- ============================================================
-- Fairbanks Auto Auction — Supabase schema
-- Run this once in Supabase: Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- vehicles ----------
create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  lot_number text not null,
  title text not null,
  year int,
  category text not null check (category in (
    'Cars & sedans',
    'Trucks & SUVs',
    'Motorcycles & ATVs',
    'Equipment & machines',
    'Boats & trailers',
    'Classics'
  )),
  description text not null default '',
  tags text[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'sold', 'pulled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_status_idx on vehicles (status);
create index if not exists vehicles_category_idx on vehicles (category);
create index if not exists vehicles_created_at_idx on vehicles (created_at desc);

-- ---------- vehicle_photos ----------
create table if not exists vehicle_photos (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles (id) on delete cascade,
  storage_path text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists vehicle_photos_vehicle_id_idx on vehicle_photos (vehicle_id);

-- ---------- contact_messages ----------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------- subscribers ----------
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------- keep updated_at fresh ----------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_vehicles_updated_at on vehicles;
create trigger trg_vehicles_updated_at
before update on vehicles
for each row execute function set_updated_at();

-- ============================================================
-- Row level security
-- Public (anonymous) visitors can only read active vehicles.
-- Anyone signed in (you, via /admin/login) can do everything.
-- ============================================================

alter table vehicles enable row level security;
alter table vehicle_photos enable row level security;
alter table contact_messages enable row level security;
alter table subscribers enable row level security;

-- vehicles
drop policy if exists "public reads active, staff reads all" on vehicles;
create policy "public reads active, staff reads all"
  on vehicles for select
  using (status = 'active' or auth.role() = 'authenticated');

drop policy if exists "staff inserts vehicles" on vehicles;
create policy "staff inserts vehicles"
  on vehicles for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "staff updates vehicles" on vehicles;
create policy "staff updates vehicles"
  on vehicles for update
  using (auth.role() = 'authenticated');

drop policy if exists "staff deletes vehicles" on vehicles;
create policy "staff deletes vehicles"
  on vehicles for delete
  using (auth.role() = 'authenticated');

-- vehicle_photos
drop policy if exists "anyone reads photos" on vehicle_photos;
create policy "anyone reads photos"
  on vehicle_photos for select
  using (true);

drop policy if exists "staff inserts photos" on vehicle_photos;
create policy "staff inserts photos"
  on vehicle_photos for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "staff updates photos" on vehicle_photos;
create policy "staff updates photos"
  on vehicle_photos for update
  using (auth.role() = 'authenticated');

drop policy if exists "staff deletes photos" on vehicle_photos;
create policy "staff deletes photos"
  on vehicle_photos for delete
  using (auth.role() = 'authenticated');

-- contact_messages: anyone can submit, only staff can read
drop policy if exists "anyone submits a message" on contact_messages;
create policy "anyone submits a message"
  on contact_messages for insert
  with check (true);

drop policy if exists "staff reads messages" on contact_messages;
create policy "staff reads messages"
  on contact_messages for select
  using (auth.role() = 'authenticated');

-- subscribers: anyone can subscribe, only staff can read
drop policy if exists "anyone subscribes" on subscribers;
create policy "anyone subscribes"
  on subscribers for insert
  with check (true);

drop policy if exists "staff reads subscribers" on subscribers;
create policy "staff reads subscribers"
  on subscribers for select
  using (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket for vehicle photos
-- ============================================================

insert into storage.buckets (id, name, public)
values ('vehicle-photos', 'vehicle-photos', true)
on conflict (id) do nothing;

drop policy if exists "public reads vehicle photos bucket" on storage.objects;
create policy "public reads vehicle photos bucket"
  on storage.objects for select
  using (bucket_id = 'vehicle-photos');

drop policy if exists "staff uploads vehicle photos" on storage.objects;
create policy "staff uploads vehicle photos"
  on storage.objects for insert
  with check (bucket_id = 'vehicle-photos' and auth.role() = 'authenticated');

drop policy if exists "staff deletes vehicle photos" on storage.objects;
create policy "staff deletes vehicle photos"
  on storage.objects for delete
  using (bucket_id = 'vehicle-photos' and auth.role() = 'authenticated');

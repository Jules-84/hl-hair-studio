create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  email text,
  notes text,
  service_id text not null,
  service_name text not null,
  appointment_date date not null,
  appointment_time time not null,
  duration integer not null check (duration > 0 and duration <= 600),
  price numeric(10,2) not null default 0,
  base_price numeric(10,2) not null default 0,
  deposit numeric(10,2) not null default 0,
  pin_curls boolean not null default false,
  status text not null default 'confirmed' check (status in ('confirmed','cancelled'))
);

create index if not exists bookings_date_idx
on public.bookings (appointment_date, appointment_time);

alter table public.bookings enable row level security;

drop policy if exists "Public can create bookings" on public.bookings;
create policy "Public can create bookings"
on public.bookings for insert
to anon, authenticated
with check (
  length(customer_name) between 1 and 120
  and length(phone) between 5 and 30
  and status='confirmed'
);

drop policy if exists "Authenticated admin can read bookings" on public.bookings;
create policy "Authenticated admin can read bookings"
on public.bookings for select
to authenticated
using (true);

drop policy if exists "Authenticated admin can update bookings" on public.bookings;
create policy "Authenticated admin can update bookings"
on public.bookings for update
to authenticated
using (true)
with check (true);

create or replace function public.get_busy_slots(p_date date)
returns table (appointment_time text, duration integer)
language sql
security definer
set search_path=public
as $$
  select to_char(b.appointment_time,'HH24:MI'), b.duration
  from public.bookings b
  where b.appointment_date=p_date and b.status='confirmed'
  order by b.appointment_time;
$$;

revoke all on function public.get_busy_slots(date) from public;
grant execute on function public.get_busy_slots(date) to anon, authenticated;

create or replace function public.prevent_booking_overlap()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare
  new_start integer;
  new_end integer;
begin
  if new.status <> 'confirmed' then return new; end if;

  new_start := extract(hour from new.appointment_time)::integer*60
             + extract(minute from new.appointment_time)::integer;
  new_end := new_start + new.duration;

  if exists(
    select 1 from public.bookings b
    where b.appointment_date=new.appointment_date
      and b.status='confirmed'
      and (
        new_start <
          (extract(hour from b.appointment_time)::integer*60
          +extract(minute from b.appointment_time)::integer+b.duration)
        and
        (extract(hour from b.appointment_time)::integer*60
        +extract(minute from b.appointment_time)::integer) < new_end
      )
      and (tg_op='INSERT' or b.id<>new.id)
  ) then
    raise exception 'That appointment time has just been taken. Please choose another time.';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_booking_overlap_trigger on public.bookings;
create trigger prevent_booking_overlap_trigger
before insert or update of appointment_date,appointment_time,duration,status
on public.bookings
for each row execute function public.prevent_booking_overlap();

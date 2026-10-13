create extension if not exists pgcrypto;

create table if not exists activity_slots (
  id uuid primary key default gen_random_uuid(),
  activity_type text not null check (activity_type in ('atelier', 'conference', 'masterclass', 'initiation')),
  label text not null,
  event_date date not null,
  start_time text not null,
  capacity integer not null,
  remaining_seats integer not null,
  price_standard integer not null default 0,
  price_etudiant integer not null default 0,
  speaker_note text
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references activity_slots(id),
  participant_type text not null check (participant_type in ('standard', 'etudiant')),
  nom text not null,
  prenom text not null,
  whatsapp text not null,
  email text,
  status text not null check (status in ('confirmed', 'waitlisted')),
  payment_status text not null check (payment_status in ('not_required', 'pending_on_site', 'paid_online')),
  created_at timestamptz not null default now()
);

alter table activity_slots enable row level security;
alter table reservations enable row level security;

drop policy if exists "activity_slots are publicly readable" on activity_slots;
create policy "activity_slots are publicly readable"
  on activity_slots for select
  to anon
  using (true);

create or replace function book_slot(
  p_slot_id uuid,
  p_participant_type text,
  p_nom text,
  p_prenom text,
  p_whatsapp text,
  p_email text
) returns table(status text, waitlist_position integer, payment_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slot activity_slots%rowtype;
  v_payment_status text;
  v_position integer;
begin
  select * into v_slot from activity_slots where id = p_slot_id for update;

  if not found then
    raise exception 'slot not found';
  end if;

  if v_slot.price_standard = 0 and v_slot.price_etudiant = 0 then
    v_payment_status := 'not_required';
  else
    v_payment_status := 'pending_on_site';
  end if;

  if v_slot.remaining_seats > 0 then
    update activity_slots
      set remaining_seats = remaining_seats - 1
      where id = p_slot_id;

    insert into reservations
      (slot_id, participant_type, nom, prenom, whatsapp, email, status, payment_status)
    values
      (p_slot_id, p_participant_type, p_nom, p_prenom, p_whatsapp, p_email, 'confirmed', v_payment_status);

    return query select 'confirmed'::text, null::integer, v_payment_status;
  else
    insert into reservations
      (slot_id, participant_type, nom, prenom, whatsapp, email, status, payment_status)
    values
      (p_slot_id, p_participant_type, p_nom, p_prenom, p_whatsapp, p_email, 'waitlisted', v_payment_status);

    select count(*) into v_position
      from reservations r
      where r.slot_id = p_slot_id and r.status = 'waitlisted';

    return query select 'waitlisted'::text, v_position, v_payment_status;
  end if;
end;
$$;

grant execute on function book_slot(uuid, text, text, text, text, text) to anon;

insert into activity_slots (activity_type, label, event_date, start_time, capacity, remaining_seats, price_standard, price_etudiant)
select
  v.activity_type, v.label, d.event_date, v.start_time, v.capacity, v.capacity, v.price_standard, v.price_etudiant
from
  (values
    ('atelier', 'Ateliers artistiques', '14:00', 75, 6000, 3000),
    ('conference', 'Conférences', '16:30', 80, 0, 0),
    ('masterclass', 'Masterclass', '17:30', 12, 7000, 5000),
    ('initiation', 'Initiations sportives', '18:30', 45, 0, 0)
  ) as v(activity_type, label, start_time, capacity, price_standard, price_etudiant)
cross join
  (values ('2026-11-04'::date), ('2026-11-05'::date), ('2026-11-06'::date), ('2026-11-07'::date), ('2026-11-08'::date)) as d(event_date);

create table if not exists pillar_interest (
  id uuid primary key default gen_random_uuid(),
  pillar text not null check (pillar in ('festival', 'experiences', 'passeport', 'oteranga', 'communaute', 'impact')),
  nom text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table pillar_interest enable row level security;

drop policy if exists "anyone can submit pillar interest" on pillar_interest;
create policy "anyone can submit pillar interest"
  on pillar_interest for insert
  to anon
  with check (true);

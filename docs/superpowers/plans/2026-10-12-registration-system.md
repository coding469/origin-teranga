# Registration System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the non-functional `ReservationForm` with a real registration system backed by Supabase Postgres: a cascading date → activity → participant-type form that books a real, shared, race-condition-safe seat count per activity/day, with waitlist support.

**Architecture:** One Postgres schema (two tables + one atomic booking function) in the user's existing Supabase project, read/written exclusively through two Next.js Server Actions using the Supabase JS client with the project's public (anon) key — no secret key needed anywhere, because the booking function is the only write path and runs as the function owner (bypasses RLS internally) while direct table writes stay blocked for the `anon` role.

**Tech Stack:** Next.js 16 (App Router, Server Actions), React 19, TypeScript, Supabase (Postgres + `@supabase/supabase-js`).

## Global Constraints

- Design source of truth: `docs/superpowers/specs/2026-10-12-registration-system-design.md`.
- Supabase project already exists. `.env.local` already contains `NEXT_PUBLIC_SUPABASE_URL=https://xnbkhjdtivormdjrrhop.supabase.co` and `NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg`.
- No Supabase CLI link is set up and none is needed — schema changes are applied by hand through the Supabase Dashboard's SQL Editor at `https://supabase.com/dashboard/project/xnbkhjdtivormdjrrhop/sql/new`. Do not attempt `supabase login`/`init`/`link` as part of this plan.
- No test framework exists in this repo. Verification = `npm run lint`, `npx tsc --noEmit`, `npm run build`, manual check via `npm run dev`, and — where noted — direct HTTP calls to the Supabase REST API with `curl` to verify real database behavior (the booking function's atomicity cannot be verified through the UI alone).
- **Never run `git commit` without first asking the user for explicit authorization.**
- Never commit `docs/**` (the user has asked that Claude's own spec/plan markdown files never be committed) — stage and commit only the application code changes listed under each task's **Files**.
- Money values are integers in FCFA (no decimals, no currency formatting library — use `.toLocaleString("fr-FR")` for display).
- Activity type codes are exactly: `atelier`, `conference`, `masterclass`, `initiation`. Participant type codes are exactly: `standard`, `etudiant`. Reservation status codes are exactly: `confirmed`, `waitlisted`. Payment status codes are exactly: `not_required`, `pending_on_site` (a third value, `paid_online`, is reserved by the schema for a future task — never produced by this plan's code).

---

### Task 1: Database schema in Supabase

**Files:**
- Create: `supabase/schema.sql`

**Interfaces:**
- Produces: tables `activity_slots` (columns: `id uuid`, `activity_type text`, `label text`, `event_date date`, `start_time text`, `capacity integer`, `remaining_seats integer`, `price_standard integer`, `price_etudiant integer`, `speaker_note text`) and `reservations` (columns: `id uuid`, `slot_id uuid`, `participant_type text`, `nom text`, `prenom text`, `whatsapp text`, `email text`, `status text`, `payment_status text`, `created_at timestamptz`), plus RPC function `book_slot(p_slot_id uuid, p_participant_type text, p_nom text, p_prenom text, p_whatsapp text, p_email text)` returning `(status text, waitlist_position integer, payment_status text)`. Task 3's Server Actions call this function and these columns by exact name.

- [ ] **Step 1: Write the schema file**

Create `supabase/schema.sql`:

```sql
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
      from reservations
      where slot_id = p_slot_id and status = 'waitlisted';

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
```

- [ ] **Step 2: Apply it in Supabase**

Ask the user to open `https://supabase.com/dashboard/project/xnbkhjdtivormdjrrhop/sql/new`, paste the full contents of `supabase/schema.sql`, and click "Run". Wait for their confirmation that it succeeded before continuing.

- [ ] **Step 3: Verify via the REST API**

Run (replace nothing — these are the real project values from `.env.local`):

```bash
curl -s "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/activity_slots?select=activity_type,event_date,remaining_seats&order=event_date.asc" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" | python3 -m json.tool
```

Expected: a JSON array of 20 objects (4 activity types × 5 dates from `2026-11-04` to `2026-11-08`), each with its starting `remaining_seats` matching the capacity table in Step 1 (75 for `atelier`, 80 for `conference`, 12 for `masterclass`, 45 for `initiation`).

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add supabase/schema.sql
git commit -m "feat: add registration schema (activity_slots, reservations, book_slot)"
```

---

### Task 2: Supabase client + dependency

**Files:**
- Create: `src/lib/supabase.ts`
- Modify: `package.json` (new dependency)

**Interfaces:**
- Produces: `supabase` — a singleton `SupabaseClient` instance, default export is named export `supabase` from `@/lib/supabase`. Task 3 imports this exact name.

- [ ] **Step 1: Install the dependency**

Run: `npm install @supabase/supabase-js`
Expected: `package.json` gains `@supabase/supabase-js` under `dependencies`, install completes with no errors.

- [ ] **Step 2: Create the client**

Create `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/lib/supabase.ts package.json package-lock.json
git commit -m "feat: add Supabase client"
```

---

### Task 3: Server Actions

**Files:**
- Create: `src/app/reserver/actions.ts`

**Interfaces:**
- Consumes: `supabase` from `@/lib/supabase` (Task 2).
- Produces: `ActivitySlot` type, `getSlotsForDate(eventDate: string): Promise<ActivitySlot[]>`, `BookSlotInput` type, `BookSlotResult` type, `bookSlot(input: BookSlotInput): Promise<BookSlotResult>` — all exported from `@/app/reserver/actions`. Task 4's form imports all four.

- [ ] **Step 1: Write the Server Actions**

Create `src/app/reserver/actions.ts`:

```ts
"use server";

import { supabase } from "@/lib/supabase";

export type ActivitySlot = {
  id: string;
  activity_type: "atelier" | "conference" | "masterclass" | "initiation";
  label: string;
  event_date: string;
  start_time: string;
  capacity: number;
  remaining_seats: number;
  price_standard: number;
  price_etudiant: number;
  speaker_note: string | null;
};

export async function getSlotsForDate(eventDate: string): Promise<ActivitySlot[]> {
  const { data, error } = await supabase
    .from("activity_slots")
    .select("*")
    .eq("event_date", eventDate)
    .order("start_time", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export type BookSlotInput = {
  slotId: string;
  participantType: "standard" | "etudiant";
  nom: string;
  prenom: string;
  whatsapp: string;
  email?: string;
};

export type BookSlotResult = {
  status: "confirmed" | "waitlisted";
  waitlistPosition: number | null;
  paymentStatus: "not_required" | "pending_on_site";
};

export async function bookSlot(input: BookSlotInput): Promise<BookSlotResult> {
  const { data, error } = await supabase.rpc("book_slot", {
    p_slot_id: input.slotId,
    p_participant_type: input.participantType,
    p_nom: input.nom,
    p_prenom: input.prenom,
    p_whatsapp: input.whatsapp,
    p_email: input.email ?? null,
  });

  if (error) throw new Error(error.message);

  const row = data[0];
  return {
    status: row.status,
    waitlistPosition: row.waitlist_position,
    paymentStatus: row.payment_status,
  };
}
```

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification against the real database**

Run (uses a real slot id fetched live, requires Task 1 applied):

```bash
SLOT_ID=$(curl -s "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/activity_slots?select=id&activity_type=eq.conference&event_date=eq.2026-11-04" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

curl -s -X POST "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/rpc/book_slot" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Content-Type: application/json" \
  -d "{\"p_slot_id\": \"$SLOT_ID\", \"p_participant_type\": \"standard\", \"p_nom\": \"Test\", \"p_prenom\": \"Verif\", \"p_whatsapp\": \"770000000\", \"p_email\": null}"
```

Expected: `[{"status":"confirmed","waitlist_position":null,"payment_status":"not_required"}]` (the 4 Nov conference is free, so `payment_status` is `not_required`). This is test data in the real table — it is cleaned up in Task 5's final step, not here.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/app/reserver/actions.ts
git commit -m "feat: add getSlotsForDate and bookSlot server actions"
```

---

### Task 4: Reservation form rewrite

**Files:**
- Modify: `src/components/ReservationForm.tsx` (full rewrite)

**Interfaces:**
- Consumes: `getSlotsForDate`, `bookSlot`, `ActivitySlot`, `BookSlotResult` from `@/app/reserver/actions` (Task 3).

- [ ] **Step 1: Replace the entire contents of `src/components/ReservationForm.tsx`**

```tsx
"use client";

import { useState, useTransition, type FormEvent } from "react";
import {
  bookSlot,
  getSlotsForDate,
  type ActivitySlot,
  type BookSlotResult,
} from "@/app/reserver/actions";

const EVENT_DATES = [
  { value: "2026-11-04", label: "Mercredi 4 novembre" },
  { value: "2026-11-05", label: "Jeudi 5 novembre" },
  { value: "2026-11-06", label: "Vendredi 6 novembre" },
  { value: "2026-11-07", label: "Samedi 7 novembre" },
  { value: "2026-11-08", label: "Dimanche 8 novembre" },
];

export default function ReservationForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<ActivitySlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [participantType, setParticipantType] = useState<"standard" | "etudiant">(
    "standard"
  );
  const [result, setResult] = useState<BookSlotResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleDateChange(eventDate: string) {
    setSelectedDate(eventDate);
    setSelectedSlotId("");
    setSlots([]);
    if (!eventDate) return;
    startTransition(async () => {
      const data = await getSlotsForDate(eventDate);
      setSlots(data);
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!selectedSlotId) {
      setError("Choisis une activité avant de réserver.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const nom = String(form.get("nom") ?? "");
    const prenom = String(form.get("prenom") ?? "");
    const whatsapp = String(form.get("whatsapp") ?? "");
    const email = String(form.get("email") ?? "") || undefined;

    setSubmitting(true);
    try {
      const res = await bookSlot({
        slotId: selectedSlotId,
        participantType,
        nom,
        prenom,
        whatsapp,
        email,
      });
      setResult(res);
    } catch {
      setError("La réservation a échoué, réessaie dans un instant.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  if (result) {
    const selectedPrice =
      participantType === "etudiant"
        ? selectedSlot?.price_etudiant
        : selectedSlot?.price_standard;

    return (
      <div className="rounded-[22px] border border-dark-ink/14 bg-sand-soft px-8 py-14 text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          {result.status === "confirmed" ? "Confirmé" : "Liste d'attente"}
        </span>
        <p className="mt-4 font-display text-[clamp(22px,2.6vw,30px)] font-medium">
          {result.status === "confirmed"
            ? result.paymentStatus === "not_required"
              ? "Ton inscription est confirmée."
              : `Ta place est réservée. Montant à régler sur place : ${selectedPrice?.toLocaleString(
                  "fr-FR"
                )} FCFA (${
                  participantType === "etudiant" ? "tarif étudiant" : "tarif standard"
                }).`
            : `Cette activité est complète. Tu es en position n°${result.waitlistPosition} sur la liste d'attente, on te recontacte sur WhatsApp si une place se libère.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="event_date"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Date
        </label>
        <select
          id="event_date"
          name="event_date"
          required
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        >
          <option value="" disabled>
            Choisis une date
          </option>
          {EVENT_DATES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {selectedDate && (
        <div>
          <span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64">
            Activité
          </span>
          {isPending && (
            <p className="text-[15px] text-dark-ink/64">Chargement...</p>
          )}
          <div className="flex flex-col gap-3">
            {slots.map((slot) => {
              const full = slot.remaining_seats <= 0;
              const paid = slot.price_standard > 0 || slot.price_etudiant > 0;
              return (
                <label
                  key={slot.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-6 py-4 text-[15px] ${
                    selectedSlotId === slot.id
                      ? "border-clay bg-clay/10"
                      : "border-dark-ink/14"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-semibold">
                      {slot.label} · {slot.start_time}
                    </span>
                    <span className="text-dark-ink/64">
                      {full
                        ? "Complet — rejoindre la liste d'attente"
                        : `${slot.remaining_seats} places restantes`}
                      {paid &&
                        ` · ${slot.price_standard.toLocaleString(
                          "fr-FR"
                        )} FCFA (${slot.price_etudiant.toLocaleString(
                          "fr-FR"
                        )} FCFA étudiant)`}
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="slot_id"
                    value={slot.id}
                    checked={selectedSlotId === slot.id}
                    onChange={() => setSelectedSlotId(slot.id)}
                    className="h-5 w-5 accent-clay"
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64">
          Type de participant
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="radio"
              name="participant_type"
              value="standard"
              checked={participantType === "standard"}
              onChange={() => setParticipantType("standard")}
              className="h-5 w-5 accent-clay"
            />
            Standard
          </label>
          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="radio"
              name="participant_type"
              value="etudiant"
              checked={participantType === "etudiant"}
              onChange={() => setParticipantType("etudiant")}
              className="h-5 w-5 accent-clay"
            />
            Étudiant
          </label>
        </div>
        {participantType === "etudiant" && (
          <p className="mt-2 text-[13px] text-dark-ink/64">
            Présente ta carte étudiante et une pièce d&apos;identité à l&apos;entrée.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="nom"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          placeholder="Votre réponse"
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </div>

      <div>
        <label
          htmlFor="prenom"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton prénom
        </label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          required
          placeholder="Votre réponse"
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </div>

      <div>
        <label
          htmlFor="whatsapp"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton numéro WhatsApp
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          placeholder="Votre réponse"
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Votre réponse"
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </div>

      {error && <p className="text-[14px] text-clay">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-full bg-clay text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "Envoi..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev` (if not already running), open `http://localhost:3000/reserver`.
Expected: choosing a date shows the 4 activities for that day with live remaining-seat counts and prices where applicable. Selecting "Étudiant" shows the ID-card note. Submitting with a free activity shows "Ton inscription est confirmée." Submitting with a paid activity (e.g. "Ateliers artistiques") shows the "à régler sur place" message with the correct price for the selected participant type. Reloading the page and picking the same date/activity shows the remaining-seat count one lower than before.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/ReservationForm.tsx
git commit -m "feat: rewrite reservation form with date/activity/participant-type booking"
```

---

### Task 5: Concurrency verification, mobile check, cleanup

**Files:** none (verification only, plus cleanup of test rows created during Tasks 3-4 manual checks).

- [ ] **Step 1: Verify no overselling under concurrent load**

Fetch the id of the Masterclass slot for 2026-11-05 (capacity 12) and fire 15 concurrent booking requests against it:

```bash
SLOT_ID=$(curl -s "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/activity_slots?select=id&activity_type=eq.masterclass&event_date=eq.2026-11-05" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

for i in $(seq 1 15); do
  curl -s -X POST "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/rpc/book_slot" \
    -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
    -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
    -H "Content-Type: application/json" \
    -d "{\"p_slot_id\": \"$SLOT_ID\", \"p_participant_type\": \"standard\", \"p_nom\": \"LoadTest\", \"p_prenom\": \"$i\", \"p_whatsapp\": \"770000000\", \"p_email\": null}" &
done
wait
```

Then check the final state:

```bash
curl -s "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/activity_slots?select=remaining_seats&id=eq.$SLOT_ID" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg"
```

Expected: `remaining_seats` is exactly `0` (never negative). Count the 15 responses from the loop above: exactly 12 have `"status":"confirmed"` and 3 have `"status":"waitlisted"` with `waitlist_position` `1`, `2`, `3`.

- [ ] **Step 2: Verify mobile breakpoint**

Resize the browser to a mobile width (e.g. 390px) on `http://localhost:3000/reserver`.
Expected: the date dropdown, activity cards, participant-type radios, and text fields all remain usable and readable, no horizontal scroll, the submit button is full-width.

- [ ] **Step 3: Run the full build**

Run: `npm run build`
Expected: build completes with no TypeScript or lint errors.

- [ ] **Step 4: Clean up test data**

Ask the user to run this in the Supabase SQL Editor to remove the test reservations created during Tasks 3-5 verification (identified by `nom` values used above), and to reset the two slots' `remaining_seats` back to their starting capacity:

```sql
delete from reservations where nom in ('Test', 'LoadTest');

update activity_slots set remaining_seats = capacity
where (activity_type = 'conference' and event_date = '2026-11-04')
   or (activity_type = 'masterclass' and event_date = '2026-11-05');
```

- [ ] **Step 5: Report completion to the user**

Summarize what was verified (schema applied, concurrency test result, mobile check, build result) — no commit in this task.

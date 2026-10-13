# Pillar Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each of the 6 "univers" menu items (Festival, Expériences, Passeport, Oteranga, Communauté, Impact) its own real page — vision, objectives, and an interest form stored in Supabase — instead of all 6 sharing one generic home section. Also resolve the `/experience` vs `/experiences` route collision by renaming the sub-project B event page to `/evenement`.

**Architecture:** One shared presentational component (`PillarPage`) renders the identical layout for all 6 pillars; each route is a thin page file passing that pillar's content as props. One shared client component (`PillarInterestForm`) + one Server Action + one Supabase table handle the interest form across all 6 pages — same pattern as the registration system's Server Actions, but simpler (plain insert, no capacity logic).

**Tech Stack:** Next.js 16 (App Router, Server Actions), React 19, TypeScript, Supabase (Postgres).

## Global Constraints

- Design source of truth: `docs/superpowers/specs/2026-10-13-pillar-pages-design.md`.
- `.env.local` already has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same Supabase project used for the registration system).
- Schema changes are applied by hand through the Supabase Dashboard SQL Editor (`https://supabase.com/dashboard/project/xnbkhjdtivormdjrrhop/sql/new`) — same process as the registration system, no CLI link.
- No test framework exists. Verification = `npm run lint`, `npx tsc --noEmit`, `npm run build`, manual check via `npm run dev`, and direct `curl` calls to the Supabase REST API where DB behavior must be confirmed.
- **Never run `git commit` without first asking the user for explicit authorization.**
- Never commit `docs/**`.
- Pillar codes are exactly: `festival`, `experiences`, `passeport`, `oteranga`, `communaute`, `impact` — used as the `pillar` column value, the `Pillar` TypeScript type, and the route segment names.
- Reuse existing color tokens only (`clay`, `clay-soft`, `ink`, `dark-ink`, `sand`, `sand-soft`, `bg-soft`).

---

### Task 1: `pillar_interest` schema

**Files:**
- Modify: `supabase/schema.sql` (append)

**Interfaces:**
- Produces: table `pillar_interest` (columns: `id uuid`, `pillar text`, `nom text`, `email text`, `message text`, `created_at timestamptz`) with an `insert`-only RLS policy for `anon`. Task 2's Server Action inserts into this exact table/columns.

- [ ] **Step 1: Append the new table to the schema file**

Add this block to the end of `supabase/schema.sql`:

```sql
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
```

- [ ] **Step 2: Apply it in Supabase**

Ask the user to open `https://supabase.com/dashboard/project/xnbkhjdtivormdjrrhop/sql/new`, paste just this new block (not the whole file — the rest already exists), and click "Run". Wait for their confirmation before continuing.

- [ ] **Step 3: Verify via the REST API**

Run (uses `Prefer: return=minimal` since `anon` has no `select` policy on this table — a `201` status confirms the insert worked without needing to read the row back):

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST "https://xnbkhjdtivormdjrrhop.supabase.co/rest/v1/pillar_interest" \
  -H "apikey: sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Authorization: Bearer sb_publishable_IYE5mWckwKGShkv2-_Vp5Q_vPmJTFEg" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"pillar": "festival", "nom": "Test", "email": "test@example.com", "message": "verification Task 1"}'
```

Expected: `201`.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add supabase/schema.sql
git commit -m "feat: add pillar_interest table"
```

---

### Task 2: Server Action

**Files:**
- Create: `src/app/actions/pillar-interest.ts`

**Interfaces:**
- Consumes: `supabase` from `@/lib/supabase`.
- Produces: `Pillar` type (`"festival" | "experiences" | "passeport" | "oteranga" | "communaute" | "impact"`), `SubmitPillarInterestInput` type, `submitPillarInterest(input: SubmitPillarInterestInput): Promise<void>` — all exported from `@/app/actions/pillar-interest`. Task 3's form and Task 4's `PillarPage` both import `Pillar`; Task 3 imports `submitPillarInterest`.

- [ ] **Step 1: Write the Server Action**

Create `src/app/actions/pillar-interest.ts`:

```ts
"use server";

import { supabase } from "@/lib/supabase";

export type Pillar =
  | "festival"
  | "experiences"
  | "passeport"
  | "oteranga"
  | "communaute"
  | "impact";

export type SubmitPillarInterestInput = {
  pillar: Pillar;
  nom: string;
  email: string;
  message?: string;
};

export async function submitPillarInterest(
  input: SubmitPillarInterestInput
): Promise<void> {
  const { error } = await supabase.from("pillar_interest").insert({
    pillar: input.pillar,
    nom: input.nom,
    email: input.email,
    message: input.message ?? null,
  });

  if (error) throw new Error(error.message);
}
```

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/app/actions/pillar-interest.ts
git commit -m "feat: add submitPillarInterest server action"
```

---

### Task 3: Shared interest form component

**Files:**
- Create: `src/components/PillarInterestForm.tsx`

**Interfaces:**
- Consumes: `submitPillarInterest`, `Pillar` from `@/app/actions/pillar-interest` (Task 2).
- Produces: `PillarInterestForm` — default export, props `{ pillar: Pillar }`. Task 4's `PillarPage` renders `<PillarInterestForm pillar={pillar} />`.

- [ ] **Step 1: Create the component**

Create `src/components/PillarInterestForm.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { submitPillarInterest, type Pillar } from "@/app/actions/pillar-interest";

export default function PillarInterestForm({ pillar }: { pillar: Pillar }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const nom = String(form.get("nom") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "") || undefined;

    setSubmitting(true);
    try {
      await submitPillarInterest({ pillar, nom, email, message });
      setSubmitted(true);
    } catch {
      setError("L'envoi a échoué, réessaie dans un instant.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-dark-ink/14 bg-sand-soft px-8 py-14 text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Merci
        </span>
        <p className="mt-4 font-display text-[clamp(22px,2.6vw,30px)] font-medium">
          Ta demande a bien été transmise.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          htmlFor="email"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Votre réponse"
          className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
        >
          Ton message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Votre réponse"
          className="w-full rounded-2xl border border-dark-ink/14 bg-transparent px-6 py-4 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
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

- [ ] **Step 3: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/PillarInterestForm.tsx
git commit -m "feat: add shared pillar interest form component"
```

---

### Task 4: Shared `PillarPage` layout component

**Files:**
- Create: `src/components/PillarPage.tsx`

**Interfaces:**
- Consumes: `PillarInterestForm` (Task 3), `Pillar` type from `@/app/actions/pillar-interest` (Task 2).
- Produces: `PillarPage` — default export, props `{ pillar: Pillar; title: string; signature: string; vision: string; objectifs: string[] }`. Task 5's 6 page files each render this component.

- [ ] **Step 1: Create the component**

Create `src/components/PillarPage.tsx`:

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PillarInterestForm from "@/components/PillarInterestForm";
import type { Pillar } from "@/app/actions/pillar-interest";

type PillarPageProps = {
  pillar: Pillar;
  title: string;
  signature: string;
  vision: string;
  objectifs: string[];
};

export default function PillarPage({
  pillar,
  title,
  signature,
  vision,
  objectifs,
}: PillarPageProps) {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            {signature}
          </span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium">
            {title}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
            {vision}
          </p>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-16 text-ink sm:px-8 lg:px-[72px]">
        <div className="mx-auto max-w-[720px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Nos objectifs
          </span>
          <ul className="mt-6 flex flex-col gap-4">
            {objectifs.map((objectif) => (
              <li
                key={objectif}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/72"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-clay-soft" />
                {objectif}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mx-auto max-w-[560px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Rejoindre {title}
          </span>
          <h2 className="mt-4 mb-10 font-display text-[clamp(24px,3vw,36px)] font-medium">
            Dis-nous ce qui t&apos;intéresse.
          </h2>
          <PillarInterestForm pillar={pillar} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/PillarPage.tsx
git commit -m "feat: add shared PillarPage layout component"
```

---

### Task 5: The 6 pillar page routes

**Files:**
- Create: `src/app/festival/page.tsx`
- Create: `src/app/experiences/page.tsx`
- Create: `src/app/passeport/page.tsx`
- Create: `src/app/oteranga/page.tsx`
- Create: `src/app/communaute/page.tsx`
- Create: `src/app/impact/page.tsx`

**Interfaces:**
- Consumes: `PillarPage` from `@/components/PillarPage` (Task 4).

- [ ] **Step 1: Create `src/app/festival/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Festival | Origin Teranga",
  description:
    "L'Afrique se célèbre : le grand rendez-vous qui célèbre les cultures africaines à travers la musique, la danse, les arts et les rencontres.",
};

export default function FestivalPage() {
  return (
    <PillarPage
      pillar="festival"
      title="Festival"
      signature="L'Afrique se célèbre."
      vision="Le grand rendez-vous qui célèbre les cultures africaines à travers la musique, la danse, les arts et les rencontres."
      objectifs={[
        "Célébrer la richesse et la diversité des cultures africaines",
        "Réunir artistes, créateurs et publics autour d'une programmation ambitieuse",
        "Faire rayonner le Sénégal et l'Afrique sur la scène internationale",
      ]}
    />
  );
}
```

- [ ] **Step 2: Create `src/app/experiences/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Expériences | Origin Teranga",
  description:
    "L'Afrique se vit : des temps forts vécus en immersion toute l'année — culture, sport, innovation et rencontres.",
};

export default function ExperiencesPage() {
  return (
    <PillarPage
      pillar="experiences"
      title="Expériences"
      signature="L'Afrique se vit."
      vision="Des temps forts vécus en immersion toute l'année — culture, sport, innovation et rencontres."
      objectifs={[
        "Proposer un agenda d'expériences immersives toute l'année",
        "Mettre en valeur le sport, le bien-être et la créativité africaine",
        "Créer des rencontres entre générations et horizons",
      ]}
    />
  );
}
```

- [ ] **Step 3: Create `src/app/passeport/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Passeport | Origin Teranga",
  description:
    "L'Afrique se découvre : découvrir l'Afrique autrement, à travers des voyages et des destinations qui racontent une autre histoire du continent.",
};

export default function PasseportPage() {
  return (
    <PillarPage
      pillar="passeport"
      title="Passeport"
      signature="L'Afrique se découvre."
      vision="Découvrir l'Afrique autrement, à travers des voyages et des destinations qui racontent une autre histoire du continent."
      objectifs={[
        "Faire découvrir des destinations africaines authentiques",
        "Proposer des voyages solidaires et responsables",
        "Valoriser le patrimoine et les savoir-faire locaux",
      ]}
    />
  );
}
```

- [ ] **Step 4: Create `src/app/oteranga/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Oteranga | Origin Teranga",
  description:
    "L'Afrique se crée : la marketplace qui met en lumière les artisans, créateurs et marques africaines.",
};

export default function OterangaPage() {
  return (
    <PillarPage
      pillar="oteranga"
      title="Oteranga"
      signature="L'Afrique se crée."
      vision="La marketplace qui met en lumière les artisans, créateurs et marques africaines."
      objectifs={[
        "Valoriser l'artisanat et les créateurs africains",
        "Offrir une vitrine aux marques africaines émergentes",
        "Créer des opportunités économiques directes pour les vendeurs",
      ]}
    />
  );
}
```

- [ ] **Step 5: Create `src/app/communaute/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Communauté | Origin Teranga",
  description:
    "L'Afrique se rassemble : rassembler celles et ceux qui portent le projet Origin Teranga, en Afrique et dans la diaspora.",
};

export default function CommunautePage() {
  return (
    <PillarPage
      pillar="communaute"
      title="Communauté"
      signature="L'Afrique se rassemble."
      vision="Rassembler celles et ceux qui portent le projet Origin Teranga, en Afrique et dans la diaspora."
      objectifs={[
        "Fédérer une communauté engagée en Afrique et dans la diaspora",
        "Développer un réseau d'ambassadeurs et de bénévoles",
        "Créer des liens durables entre les membres de la communauté",
      ]}
    />
  );
}
```

- [ ] **Step 6: Create `src/app/impact/page.tsx`**

```tsx
import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";

export const metadata: Metadata = {
  title: "Impact | Origin Teranga",
  description:
    "L'Afrique se construit : l'ambition sociale et économique d'Origin Teranga, au service de l'entrepreneuriat et de l'éducation.",
};

export default function ImpactPage() {
  return (
    <PillarPage
      pillar="impact"
      title="Impact"
      signature="L'Afrique se construit."
      vision="L'ambition sociale et économique d'Origin Teranga, au service de l'entrepreneuriat et de l'éducation."
      objectifs={[
        "Soutenir l'entrepreneuriat et les projets à impact",
        "Accompagner l'éducation et la transmission des savoirs",
        "Construire des partenariats durables pour l'avenir du continent",
      ]}
    />
  );
}
```

- [ ] **Step 7: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Manual visual check**

Run: `npm run dev` (if not already running). Open each of `http://localhost:3000/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`.
Expected: each shows its own signature/title/vision, its own 3 objectives, and the interest form. Submit the form on one of them (e.g. `/festival`) with test data — expect the "Merci, ta demande a bien été transmise." confirmation.

- [ ] **Step 9: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/app/festival/page.tsx src/app/experiences/page.tsx src/app/passeport/page.tsx src/app/oteranga/page.tsx src/app/communaute/page.tsx src/app/impact/page.tsx
git commit -m "feat: add the 6 pillar pages (Festival, Expériences, Passeport, Oteranga, Communauté, Impact)"
```

---

### Task 6: Rename `/experience` to `/evenement`

**Files:**
- Rename: `src/app/experience/page.tsx` → `src/app/evenement/page.tsx` (content unchanged)
- Modify: `src/components/Programme.tsx:26` and `:48` (the 2 `href="/experience"` occurrences)

- [ ] **Step 1: Rename the directory**

Run:

```bash
mkdir -p src/app/evenement
git mv src/app/experience/page.tsx src/app/evenement/page.tsx
rmdir src/app/experience
```

(If the directory isn't a git-tracked move because Task-B's page was never committed, use `mv` instead of `git mv` — check with `git status` first; either way the end state is the same file at the new path with no file left at the old path.)

- [ ] **Step 2: Update the 2 links in `Programme.tsx`**

In `src/components/Programme.tsx`, both occurrences of:

```tsx
href="/experience"
```

become:

```tsx
href="/evenement"
```

(one in the desktop "Voir le programme complet" link, one in the mobile one — both are plain string replacements, no other part of the line changes).

- [ ] **Step 3: Lint, type-check, and confirm no dangling references**

Run: `npm run lint && npx tsc --noEmit && grep -rn '"/experience"' src/`
Expected: lint/tsc clean, and the `grep` prints nothing (no remaining reference to the old route).

- [ ] **Step 4: Manual visual check**

Run: `npm run dev` (if not already running). Open `http://localhost:3000/evenement` — expect the same event page content as before (programme, Village, infos pratiques). Open `http://localhost:3000/experience` — expect a 404. From the home page, click "Voir le programme complet" — expect it to land on `/evenement`.

- [ ] **Step 5: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add -A src/app/evenement src/app/experience src/components/Programme.tsx
git commit -m "refactor: rename event page from /experience to /evenement to avoid route collision with /experiences"
```

---

### Task 7: Wire up the menu and the home Écosystème cards

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Univers.tsx`

**Interfaces:**
- Consumes: the 6 routes created in Task 5 (`/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`).

- [ ] **Step 1: Update `NAV_LINKS` in `Header.tsx`**

Current:

```tsx
const NAV_LINKS = [
  { href: "/#ecosysteme", label: "Festival" },
  { href: "/#ecosysteme", label: "Expériences" },
  { href: "/#ecosysteme", label: "Passeport" },
  { href: "/#ecosysteme", label: "Oteranga" },
  { href: "/#ecosysteme", label: "Communauté" },
  { href: "/#ecosysteme", label: "Impact" },
  { href: "/#histoire", label: "À propos" },
];
```

Replace with:

```tsx
const NAV_LINKS = [
  { href: "/festival", label: "Festival" },
  { href: "/experiences", label: "Expériences" },
  { href: "/passeport", label: "Passeport" },
  { href: "/oteranga", label: "Oteranga" },
  { href: "/communaute", label: "Communauté" },
  { href: "/impact", label: "Impact" },
  { href: "/#histoire", label: "À propos" },
];
```

- [ ] **Step 2: Make the Écosystème cards clickable in `Univers.tsx`**

Current (full file):

```tsx
const PILLARS = [
  { name: "Festival", signature: "L'Afrique se célèbre." },
  { name: "Expériences", signature: "L'Afrique se vit." },
  { name: "Passeport", signature: "L'Afrique se découvre." },
  { name: "Oteranga", signature: "L'Afrique se crée." },
  { name: "Communauté", signature: "L'Afrique se rassemble." },
  { name: "Impact", signature: "L'Afrique se construit." },
];

export default function Univers() {
  return (
    <section
      id="ecosysteme"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 max-w-[680px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Bien plus qu&apos;un événement
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Découvrez l&apos;écosystème Origin Teranga.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
          Origin Teranga est une initiative culturelle, communautaire et
          économique qui rassemble les talents, valorise les savoir-faire et
          crée des passerelles entre l&apos;Afrique, ses diasporas et le
          monde.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.name}
            className="rounded-2xl border border-dark-ink/12 bg-sand-soft px-6 py-8"
          >
            <h3 className="font-display text-xl">{pillar.name}</h3>
            <p className="mt-2 text-[15px] italic text-dark-ink/64">
              {pillar.signature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Replace with:

```tsx
const PILLARS = [
  { name: "Festival", href: "/festival", signature: "L'Afrique se célèbre." },
  { name: "Expériences", href: "/experiences", signature: "L'Afrique se vit." },
  { name: "Passeport", href: "/passeport", signature: "L'Afrique se découvre." },
  { name: "Oteranga", href: "/oteranga", signature: "L'Afrique se crée." },
  { name: "Communauté", href: "/communaute", signature: "L'Afrique se rassemble." },
  { name: "Impact", href: "/impact", signature: "L'Afrique se construit." },
];

export default function Univers() {
  return (
    <section
      id="ecosysteme"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 max-w-[680px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Bien plus qu&apos;un événement
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Découvrez l&apos;écosystème Origin Teranga.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
          Origin Teranga est une initiative culturelle, communautaire et
          économique qui rassemble les talents, valorise les savoir-faire et
          crée des passerelles entre l&apos;Afrique, ses diasporas et le
          monde.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <a
            key={pillar.name}
            href={pillar.href}
            className="group rounded-2xl border border-dark-ink/12 bg-sand-soft px-6 py-8 transition-colors duration-300 hover:border-clay"
          >
            <h3 className="font-display text-xl">{pillar.name}</h3>
            <p className="mt-2 text-[15px] italic text-dark-ink/64">
              {pillar.signature}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000`. Click each of the 6 menu items (desktop and mobile) — each lands on its own distinct page. Scroll to the Écosystème section and click each card — same result, each card leads to its own page (cards now show a hover border-color change).

- [ ] **Step 5: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/Header.tsx src/components/Univers.tsx
git commit -m "feat: link main nav and Écosystème cards to the 6 real pillar pages"
```

---

### Task 8: Cross-check

**Files:** none (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: no TypeScript or lint errors; `/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`, and `/evenement` all appear in the route list; `/experience` does not.

- [ ] **Step 2: Confirm each pillar's submission lands under the right pillar**

Submit the interest form on `/passeport` with `nom=CrossCheck`, then check (reusing the pattern from Task 1's verification, `Prefer: return=minimal` gives no read-back — instead ask the user to check in the Supabase Table Editor):

Ask the user to open the `pillar_interest` table in the Supabase Table Editor and confirm the row submitted from `/passeport` has `pillar = 'passeport'`.

- [ ] **Step 3: Verify mobile breakpoint**

Resize to mobile width (390px) on one pillar page (e.g. `/oteranga`).
Expected: intro, objectives list, and form remain readable and usable, no horizontal scroll.

- [ ] **Step 4: Report completion to the user**

Summarize what was verified — no commit in this task.

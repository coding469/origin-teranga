# Event Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/experience` page presenting the full 4–8 November 2026 programme (6 rendez-vous), the "Le Village" spaces, and practical info — and replace the home page's stale "Programme" section (old 3-day generic festival content) with a short teaser linking to it.

**Architecture:** Pure presentational Next.js App Router page, following the existing `Header`/content/`Footer` pattern already used by `src/app/reserver/page.tsx`. No new dependencies, no data fetching — all content is static, inline arrays (same convention as `Univers.tsx`'s `PILLARS` and the original `Programme.tsx`'s `ROWS`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Global Constraints

- Design source of truth: `docs/superpowers/specs/2026-10-12-event-page-design.md`.
- No test framework exists in this repo. Verification = `npm run lint`, `npx tsc --noEmit`, `npm run build`, and a manual check via `npm run dev`.
- **Never run `git commit` without first asking the user for explicit authorization.**
- Never commit `docs/**`.
- The 4 bookable rendez-vous (`ateliers`, `conferences`, `masterclass`, `initiations`) link to `/reserver`. The 2 non-bookable ones (`bienvenue`, `retransmissions`) never get a reserve button.
- Reuse existing color tokens only (`clay`, `clay-soft`, `ink`, `dark-ink`, `sand`, `bg-soft`) — no new colors.
- Do not touch `Activites.tsx`, `BattleAfroBanner.tsx`, the main nav (`Header.tsx`), or `images.ts` — out of scope for this plan.

---

### Task 1: `/experience` page

**Files:**
- Create: `src/app/experience/page.tsx`

**Interfaces:**
- Produces: route `/experience`. Anchors `#bienvenue`, `#retransmissions`, `#ateliers`, `#conferences`, `#masterclass`, `#initiations` on this page — Task 2's home teaser does not link to these anchors (it links to the page itself, not into it), so no cross-task anchor dependency.

- [ ] **Step 1: Create the page**

Create `src/app/experience/page.tsx`:

```tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Origin Teranga Expérience 2026 | Origin Teranga",
  description:
    "Du 4 au 8 novembre 2026 à l'ESCOA, Dakar : programmation, Village et informations pratiques de l'Origin Teranga Expérience.",
};

const RDV = [
  {
    id: "bienvenue",
    time: "04 nov",
    title: "Soirée de bienvenue",
    desc: "Lançons ensemble l'aventure Origin Teranga autour de la musique, des rencontres et du partage.",
    bookable: false,
  },
  {
    id: "retransmissions",
    time: "04–08 nov",
    title: "Retransmissions sportives",
    desc: "Vivez les émotions des compétitions et partagez les grands moments sportifs.",
    bookable: false,
  },
  {
    id: "ateliers",
    time: "14h00",
    title: "Ateliers créatifs",
    desc: "Exprimez votre créativité à travers des ateliers artistiques et des expériences participatives.",
    bookable: true,
  },
  {
    id: "conferences",
    time: "16h30",
    title: "Conférences",
    desc: "Rencontrez des personnalités inspirantes issues du sport, de la culture et de l'entrepreneuriat.",
    bookable: true,
  },
  {
    id: "masterclass",
    time: "17h30",
    title: "Masterclass",
    desc: "Échangez avec des professionnels et développez vos idées, vos compétences et vos projets.",
    bookable: true,
  },
  {
    id: "initiations",
    time: "18h30",
    title: "Initiations sportives",
    desc: "Découvrez de nouvelles disciplines et participez à des activités accessibles à différents niveaux.",
    bookable: true,
  },
] as const;

const VILLAGE = [
  {
    title: "Fan Zone",
    desc: "L'ambiance et les temps forts du festival à vivre ensemble.",
  },
  {
    title: "Jeux de société",
    desc: "Un espace convivial pour jouer entre deux activités.",
  },
  {
    title: "E-Gaming",
    desc: "Des bornes et tournois pour les passionnés de jeux vidéo.",
  },
  {
    title: "Fooding",
    desc: "Des saveurs à découvrir tout au long de la journée.",
  },
  {
    title: "Studio Photo",
    desc: "Un espace pour immortaliser son passage à l'événement.",
  },
  {
    title: "Rencontres",
    desc: "Des moments d'échange avec d'autres participants.",
  },
] as const;

export default function ExperiencePage() {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            4 → 8 novembre 2026 · ESCOA, Dakar
          </span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium">
            Origin Teranga Expérience 2026
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
            Cinq jours pour vibrer, découvrir, créer et partager autour du
            sport, de la culture et de la jeunesse.
          </p>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mb-12 max-w-[680px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Au programme
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Six rendez-vous majeurs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RDV.map((rdv) => (
            <div
              key={rdv.id}
              className="rounded-2xl border border-ink/14 px-6 py-7"
            >
              <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-ink/34">
                {rdv.time}
              </span>
              <h3 className="mt-2 font-display text-xl font-medium">
                {rdv.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/62">
                {rdv.desc}
              </p>
              <a
                href={`#${rdv.id}`}
                className="mt-4 inline-flex text-[13px] font-bold text-clay-soft underline-link"
              >
                Découvrir →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {RDV.map((rdv) => (
            <div key={rdv.id} id={rdv.id} className="scroll-mt-24">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-ink/34">
                {rdv.time}
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium">
                {rdv.title}
              </h3>
              <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-ink/62">
                {rdv.desc}
              </p>
              {rdv.bookable && (
                <a
                  href="/reserver"
                  className="mt-5 inline-flex h-[48px] items-center gap-2.5 rounded-full bg-clay px-6 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
                >
                  Réserver
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mb-12 max-w-[680px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Le Village
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Des espaces à vivre tout au long de l&apos;événement.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {VILLAGE.map((space) => (
            <div
              key={space.title}
              className="rounded-2xl border border-dark-ink/12 bg-sand-soft px-6 py-8"
            >
              <h3 className="font-display text-xl">{space.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-dark-ink/64">
                {space.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg px-5 py-16 text-ink sm:px-8 lg:px-[72px]">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Informations pratiques
          </span>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/62">
            Du 4 au 8 novembre 2026 · ESCOA, Dakar.
            <br />
            Entrée gratuite — inscription requise selon l&apos;activité.
          </p>
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

- [ ] **Step 3: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000/experience`.
Expected: page shows the intro header, 6 summary cards (each "Découvrir →" scrolls down to its own detail block), 6 detail blocks below (the 4 bookable ones — Ateliers, Conférences, Masterclass, Initiations — show a "Réserver" button linking to `/reserver`; Soirée de bienvenue and Retransmissions sportives do not), the Village section with 6 cards, and the practical info block at the bottom. Resize to mobile width — cards stack to 1 column, text stays readable, no horizontal scroll.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/app/experience/page.tsx
git commit -m "feat: add /experience page with programme, Village, and practical info"
```

---

### Task 2: Home "Programme" section → teaser

**Files:**
- Modify: `src/components/Programme.tsx` (full rewrite)

**Interfaces:**
- Produces: `<section id="programme">` unchanged anchor id — the Hero's "Découvrir le programme" button and the Header's `#programme`-adjacent behavior (none currently link here directly post sub-project A, but any future link to `#programme` keeps working).

- [ ] **Step 1: Replace the entire contents of `src/components/Programme.tsx`**

```tsx
const RDV_TEASER = [
  { time: "04 nov", title: "Soirée de bienvenue" },
  { time: "04–08 nov", title: "Retransmissions sportives" },
  { time: "14h00", title: "Ateliers créatifs" },
  { time: "16h30", title: "Conférences" },
  { time: "17h30", title: "Masterclass" },
  { time: "18h30", title: "Initiations sportives" },
] as const;

export default function Programme() {
  return (
    <section
      id="programme"
      className="bg-bg-soft px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Au programme
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Cinq jours, six rendez-vous
          </h2>
        </div>
        <a
          href="/experience"
          className="hidden h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6 lg:inline-flex"
        >
          Voir le programme complet
        </a>
      </div>

      <div className="border-b border-ink/14">
        {RDV_TEASER.map((rdv) => (
          <div
            key={rdv.title}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/14 py-6 first:border-t-0"
          >
            <span className="font-display text-xl font-medium sm:text-2xl">
              {rdv.title}
            </span>
            <span className="text-[13px] text-ink/62">{rdv.time}</span>
          </div>
        ))}
      </div>

      <a
        href="/experience"
        className="mt-8 inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5 lg:hidden"
      >
        Voir le programme complet
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (`images.programme.*` entries in `src/lib/images.ts` become unused by this file — that's fine, `images.ts` is out of scope for this plan and nothing else imports those specific keys other ways.)

- [ ] **Step 3: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000`, scroll to the "Au programme" section.
Expected: the section shows "Cinq jours, six rendez-vous" with the 6 rendez-vous as title/time rows (no images, no long descriptions), and a "Voir le programme complet" button/link to `/experience` (visible as a top-right button on desktop, as a button below the list on mobile). Clicking it navigates to `/experience`.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/Programme.tsx
git commit -m "feat: replace home Programme section with a teaser linking to /experience"
```

---

### Task 3: Cross-check

**Files:** none (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: no TypeScript or lint errors, `/experience` appears in the route list as a static page.

- [ ] **Step 2: End-to-end click-through**

Starting from `http://localhost:3000`, click "Voir le programme complet" in the Programme section → lands on `/experience`. On `/experience`, click "Découvrir →" on the "Masterclass" card → scrolls to the Masterclass detail block → click "Réserver" → lands on `/reserver`.

- [ ] **Step 3: Report completion to the user**

Summarize what was verified — no commit in this task.

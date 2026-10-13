# Nav, Hero & Event Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky event announcement bar visible on every page, update the main menu and CTA, rewrite the Hero copy for the Origin Teranga Expérience 2026 (4–8 Nov), and replace the mismatched "Nos univers" home section with a new "Écosystème" section whose 6 cards match the menu's 6 pillar links.

**Architecture:** Pure presentational changes to an existing Next.js App Router site (no test framework, no backend). One new component (`EventBar`) rendered from the root layout so it appears on every route without touching each page file. Three existing components (`Header`, `Hero`, `Univers`) get content/markup edits in place. No new dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (design tokens in `src/app/globals.css`).

## Global Constraints

- Design source of truth: `docs/superpowers/specs/2026-10-12-nav-hero-event-bar-design.md`.
- No test framework exists in this repo (no jest/vitest/playwright — confirmed via `package.json`). Each task's verification step is: `npm run lint`, `npx tsc --noEmit`, and a manual check in the browser via `npm run dev` — not automated unit tests. Do not add a test framework as part of this plan (out of scope).
- Color tokens already defined in `src/app/globals.css` — reuse them, do not invent new colors: `clay` (#c8582e), `clay-soft`, `ink`, `dark-ink`, `sand`, `sand-soft`, `panel`.
- **Never run `git commit` without first asking the user for explicit authorization**, even though each task below ends with a "Commit" step — pause and ask before running it.
- All internal anchor links use the absolute form `/#id` (not bare `#id`), so the same link works identically whether the user is already on `/` or on another route (e.g. `/reserver`) — Next.js/browser handles `/#id` as a same-document scroll when already on `/`, and as a navigate-then-scroll otherwise.

---

### Task 1: Event bar component + global layout integration

**Files:**
- Create: `src/components/EventBar.tsx`
- Modify: `src/app/layout.tsx:24-30`

**Interfaces:**
- Produces: `EventBar` — default-exported React component, no props. Fixed height `h-10` (40px) — Task 2's Header sticky offset depends on this exact height.

- [ ] **Step 1: Create `src/components/EventBar.tsx`**

```tsx
export default function EventBar() {
  return (
    <div className="sticky top-0 z-[60] flex h-10 items-center justify-center bg-clay px-4 text-center">
      <a
        href="/reserver"
        className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink sm:text-[12.5px] sm:tracking-[0.12em]"
      >
        <span className="hidden sm:inline">
          Origin Teranga Expérience 2026 · 04—08 Nov · Dakar · S&apos;inscrire →
        </span>
        <span className="sm:hidden">04—08 Nov · S&apos;inscrire →</span>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Render `EventBar` from the root layout**

Modify `src/app/layout.tsx`. Current content (lines 1-30):

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Origin Teranga | Festival culturel africain",
  description:
    "Origin Teranga est un festival culturel africain qui rassemble les générations, les talents et les histoires, entre Dakar et Paris.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
```

Replace the import block and `RootLayout` function with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import EventBar from "@/components/EventBar";
import "./globals.css";
```

(add the `EventBar` import line between the fonts import and the `globals.css` import)

and:

```tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <EventBar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000` in a browser.
Expected: a terracotta (`clay`) bar is stuck to the very top of the viewport, above the existing header, showing "Origin Teranga Expérience 2026 · 04—08 Nov · Dakar · S'inscrire →" on desktop width and "04—08 Nov · S'inscrire →" on a narrow (mobile) width. Clicking it navigates to `/reserver`. Scroll down the page — the bar stays stuck at the top (it will currently overlap the header until Task 2's offset fix; that overlap is expected and resolved in Task 2, not a bug to fix here).

- [ ] **Step 5: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/EventBar.tsx src/app/layout.tsx
git commit -m "feat: add sticky event bar for Origin Teranga Expérience 2026"
```

---

### Task 2: Header — menu links, CTA label, sticky offset

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `EventBar`'s fixed height of 40px (`h-10`) from Task 1, to compute the `top-10` sticky offset below.
- Produces: nothing consumed by later tasks — the `#ecosysteme` and `#histoire` anchor targets are produced by Task 4 (Univers.tsx → `id="ecosysteme"`) and already exist today (`Histoire.tsx` → `id="histoire"`).

- [ ] **Step 1: Replace `NAV_LINKS`**

Current (`src/components/Header.tsx:6-13`):

```tsx
const NAV_LINKS = [
  { href: "#manifesto", label: "Festival" },
  { href: "#histoire", label: "Concept" },
  { href: "#programme", label: "Programme" },
  { href: "#activites", label: "Activités" },
  { href: "#partenaires", label: "Partenaires" },
  { href: "#contact", label: "Contact" },
];
```

Replace with:

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

- [ ] **Step 2: Offset the header below the event bar**

Current (`src/components/Header.tsx:34-39`):

```tsx
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-[400ms] border-b ${
        scrolled
          ? "bg-bg/92 border-ink/14"
          : "bg-bg/42 border-ink/8"
      }`}
    >
```

Replace `top-0` with `top-10` (matches `EventBar`'s `h-10`):

```tsx
    <header
      className={`sticky top-10 z-50 backdrop-blur-md transition-colors duration-[400ms] border-b ${
        scrolled
          ? "bg-bg/92 border-ink/14"
          : "bg-bg/42 border-ink/8"
      }`}
    >
```

- [ ] **Step 3: Rename the desktop CTA**

Current (`src/components/Header.tsx:58-65`):

```tsx
        <div className="hidden lg:block">
          <a
            href="/reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            Réserver
          </a>
        </div>
```

Replace `Réserver` with `S'inscrire`:

```tsx
        <div className="hidden lg:block">
          <a
            href="/reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            S&apos;inscrire
          </a>
        </div>
```

- [ ] **Step 4: Rename the mobile CTA**

Current (`src/components/Header.tsx:107-113`):

```tsx
          <a
            href="/reserver"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink"
          >
            Réserver
          </a>
```

Replace `Réserver` with `S'inscrire`:

```tsx
          <a
            href="/reserver"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink"
          >
            S&apos;inscrire
          </a>
```

- [ ] **Step 5: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000`.
Expected: the header now sits directly below the event bar with no overlap, at any scroll position. The nav shows `Festival | Expériences | Passeport | Oteranga | Communauté | Impact | À propos`. The desktop and mobile CTA buttons read "S'inscrire" and go to `/reserver`. Clicking any of the first 6 nav links does nothing visible yet (target section doesn't exist until Task 4) — clicking "À propos" scrolls to the existing "Histoire" section. Resize to mobile width and confirm the accordion menu opens/closes correctly with the new labels.

- [ ] **Step 7: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/Header.tsx
git commit -m "feat: update main nav labels, CTA, and sticky offset for event bar"
```

---

### Task 3: Hero copy update

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: nothing new (keeps existing `images.hero` from `@/lib/images`, existing `#programme` anchor which already exists on `Programme.tsx`).

- [ ] **Step 1: Replace the eyebrow label**

Current (`src/components/Hero.tsx:27-29`):

```tsx
        <div className="animate-rise mb-5 text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Origin Teranga · Festival culturel africain
        </div>
```

Replace with:

```tsx
        <div className="animate-rise mb-5 text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
          Origin Teranga Expérience 2026
        </div>
```

- [ ] **Step 2: Replace the subtitle paragraph**

Current (`src/components/Hero.tsx:37-40`):

```tsx
        <p className="animate-rise mt-7 max-w-[560px] text-lg leading-relaxed text-ink/62">
          Un festival culturel africain qui rassemble les générations, les
          talents et les histoires, entre Dakar et Paris.
        </p>
```

Replace with:

```tsx
        <p className="animate-rise mt-7 max-w-[560px] text-lg leading-relaxed text-ink/62">
          Origin Teranga Expérience — Du 4 au 8 novembre 2026, ESCOA Dakar.
        </p>
```

- [ ] **Step 3: Replace the two CTA buttons**

Current (`src/components/Hero.tsx:41-54`):

```tsx
        <div className="animate-rise mt-9 flex flex-wrap gap-4">
          <a
            href="#activites"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            Découvrir le festival
          </a>
          <a
            href="#programme"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6"
          >
            Voir le programme
          </a>
        </div>
```

Replace with:

```tsx
        <div className="animate-rise mt-9 flex flex-wrap gap-4">
          <a
            href="/reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            S&apos;inscrire
          </a>
          <a
            href="#programme"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6"
          >
            Découvrir le programme
          </a>
        </div>
```

- [ ] **Step 4: Replace the discreet location tag**

Current (`src/components/Hero.tsx:21-23`):

```tsx
        <span className="absolute right-5 bottom-5 hidden text-[11px] uppercase tracking-[0.18em] text-ink/34 sm:block">
          Dakar · Paris · 2026
        </span>
```

Replace with:

```tsx
        <span className="absolute right-5 bottom-5 hidden text-[11px] uppercase tracking-[0.18em] text-ink/34 sm:block">
          Dakar · ESCOA · 2026
        </span>
```

- [ ] **Step 5: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000`.
Expected: Hero shows the new eyebrow label, unchanged "Nos origines. / Notre culture. / Notre avenir." headline, new subtitle with the event dates and venue, "S'inscrire" button going to `/reserver`, and "Découvrir le programme" button scrolling to the programme section. Bottom-right tag reads "Dakar · ESCOA · 2026".

- [ ] **Step 7: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/Hero.tsx
git commit -m "feat: update Hero copy for Origin Teranga Expérience 2026"
```

---

### Task 4: Replace "Nos univers" with the "Écosystème" section

**Files:**
- Modify: `src/components/Univers.tsx` (full rewrite)

**Interfaces:**
- Produces: `<section id="ecosysteme">` — the anchor target Task 2's 6 nav links (`/#ecosysteme`) point to.

- [ ] **Step 1: Replace the entire contents of `src/components/Univers.tsx`**

Current file is 101 lines (image-based `CARDS` array + grid). Replace the whole file with:

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

- [ ] **Step 2: Lint and type-check**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (The old `images.univers.*` references are gone from this file — confirm no other file imports `Univers`'s old `CARDS` export; it wasn't exported, so nothing else can reference it.)

- [ ] **Step 3: Manual visual check**

Run: `npm run dev` (if not already running), open `http://localhost:3000`, scroll to the section between "Histoire" and "Partenaires" (its position in `page.tsx` is unchanged).
Expected: a section titled "Découvrez l'écosystème Origin Teranga." with the intro paragraph and 6 cards (Festival, Expériences, Passeport, Oteranga, Communauté, Impact), each with its signature line, 2 columns on mobile and 3 on desktop. No photos. Click any of the 6 nav links from Task 2 — confirm the page now scrolls to this section.

- [ ] **Step 4: Commit**

Ask the user for authorization first. Once authorized:

```bash
git add src/components/Univers.tsx
git commit -m "feat: replace Nos univers section with the 6-pillar Écosystème section"
```

---

### Task 5: Cross-page verification

**Files:** none (verification only).

- [ ] **Step 1: Verify the event bar and header appear correctly on every route**

Run: `npm run dev` (if not already running). In a browser, visit in turn:
- `http://localhost:3000/` (home)
- `http://localhost:3000/reserver`
- `http://localhost:3000/activites/voyage-prive`

Expected on all three: the terracotta event bar is stuck at the very top, the header is stuck directly beneath it (no gap, no overlap), and the header's nav/CTA render identically on all three pages.

- [ ] **Step 2: Verify navigation from a non-home page**

From `http://localhost:3000/reserver`, click the "Festival" nav link in the header.
Expected: the browser navigates to `/#ecosysteme` and lands on the home page scrolled to the Écosystème section.

- [ ] **Step 3: Verify mobile breakpoint end-to-end**

Resize the browser (or use device emulation) to a mobile width (e.g. 390px) on the home page.
Expected: event bar shows the short text ("04—08 Nov · S'inscrire →"), header hamburger opens the accordion with all 7 links plus the "S'inscrire" button, Hero stacks correctly, and the Écosystème section's 6 cards display in 2 columns.

- [ ] **Step 4: Run the full build**

Run: `npm run build`
Expected: build completes with no TypeScript or lint errors.

- [ ] **Step 5: Report completion to the user**

Summarize what was verified (routes checked, breakpoints checked, build result) and hand back to the user — no commit in this task.

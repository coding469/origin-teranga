# Sous-projet D — Pages des 6 univers (avancé depuis la Priorité 2)

**Date**: 2026-10-13
**Contexte**: En naviguant sur le site une fois A/B/C en place, l'utilisateur a remarqué que les 6 liens du menu (Festival, Expériences, Passeport, Oteranga, Communauté, Impact) pointent tous vers la même section générique de la home (`#ecosysteme`), sans contenu propre à chaque univers. Décision : avancer ce chantier (initialement prévu en Priorité 2) maintenant plutôt que d'attendre après l'événement.

## Collision de route résolue

`/experience` (page événement du sous-projet B) est renommée **`/evenement`** pour éviter la confusion avec la nouvelle page `/experiences` (pilier Écosystème, pluriel). Les 2 liens dans `Programme.tsx` qui pointaient vers `/experience` sont mis à jour vers `/evenement`.

## 1. Périmètre

Une page par univers (6 au total), pas les 30 sous-rubriques listées dans le brief (ex. Festival → Édition 2027, Programmation, Artistes, Infos pratiques, Billetterie). Chaque page est complète en elle-même : vision/mission, objectifs, formulaire d'intérêt. Les sous-rubriques détaillées resteront un chantier ultérieur si besoin.

Routes : `/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`.

## 2. Contenu par page

| Route | Signature | Vision | Objectifs |
|---|---|---|---|
| `/festival` | L'Afrique se célèbre. | Le grand rendez-vous qui célèbre les cultures africaines à travers la musique, la danse, les arts et les rencontres. | Célébrer la richesse et la diversité des cultures africaines · Réunir artistes, créateurs et publics autour d'une programmation ambitieuse · Faire rayonner le Sénégal et l'Afrique sur la scène internationale |
| `/experiences` | L'Afrique se vit. | Des temps forts vécus en immersion toute l'année — culture, sport, innovation et rencontres. | Proposer un agenda d'expériences immersives toute l'année · Mettre en valeur le sport, le bien-être et la créativité africaine · Créer des rencontres entre générations et horizons |
| `/passeport` | L'Afrique se découvre. | Découvrir l'Afrique autrement, à travers des voyages et des destinations qui racontent une autre histoire du continent. | Faire découvrir des destinations africaines authentiques · Proposer des voyages solidaires et responsables · Valoriser le patrimoine et les savoir-faire locaux |
| `/oteranga` | L'Afrique se crée. | La marketplace qui met en lumière les artisans, créateurs et marques africaines. | Valoriser l'artisanat et les créateurs africains · Offrir une vitrine aux marques africaines émergentes · Créer des opportunités économiques directes pour les vendeurs |
| `/communaute` | L'Afrique se rassemble. | Rassembler celles et ceux qui portent le projet Origin Teranga, en Afrique et dans la diaspora. | Fédérer une communauté engagée en Afrique et dans la diaspora · Développer un réseau d'ambassadeurs et de bénévoles · Créer des liens durables entre les membres |
| `/impact` | L'Afrique se construit. | L'ambition sociale et économique d'Origin Teranga, au service de l'entrepreneuriat et de l'éducation. | Soutenir l'entrepreneuriat et les projets à impact · Accompagner l'éducation et la transmission des savoirs · Construire des partenariats durables pour l'avenir du continent |

Gabarit de page (identique aux 6) : `Header`, section intro (signature + titre pilier + vision), section objectifs (liste à puces), section formulaire d'intérêt, `Footer`.

## 3. Formulaire d'intérêt partagé

### Table `pillar_interest` (Postgres / Supabase)

| Colonne | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK, `default gen_random_uuid()`) | |
| `pillar` | `text` | `festival` \| `experiences` \| `passeport` \| `oteranga` \| `communaute` \| `impact` |
| `nom` | `text` | |
| `email` | `text` | |
| `message` | `text`, nullable | |
| `created_at` | `timestamptz` | `default now()` |

RLS activé. Une seule policy : `insert` public pour `anon`. Pas de policy `select` (les demandes ne sont consultables que via le Table Editor Supabase, pas depuis le site). Pas de fonction atomique nécessaire ici (contrairement à `book_slot`) : un simple insert, aucune capacité à protéger contre la concurrence.

### Composant `PillarInterestForm.tsx`

Composant client unique, réutilisé sur les 6 pages via une prop `pillar` :

```tsx
<PillarInterestForm pillar="oteranga" />
```

Champs : nom (requis), email (requis), message (optionnel, textarea). Soumission → Server Action `submitPillarInterest({ pillar, nom, email, message })` → insert dans `pillar_interest` → affichage "Merci, ta demande a été transmise."

### Server Action

`src/app/actions/pillar-interest.ts` (nouveau fichier, en dehors de `app/reserver` puisque partagé par 6 routes différentes) exporte `submitPillarInterest`.

## 4. Mise à jour des liens existants

- `Header.tsx` : les 6 `NAV_LINKS` pointent vers leur route réelle (`/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`) au lieu de `/#ecosysteme`. `À propos` reste `/#histoire` (inchangé).
- `Univers.tsx` (section Écosystème home) : chaque carte devient un lien cliquable vers sa page dédiée.
- `Programme.tsx` : les 2 liens `/experience` → `/evenement`.
- Renommage du dossier `src/app/experience/` → `src/app/evenement/`.

## Hors scope

- Les 30 sous-rubriques détaillées par univers (Édition 2027, Billetterie, Marketplace complète, etc.) — plus tard si besoin.
- Fonctionnalités avancées (vraie marketplace Oteranga, réservations Passeport, etc.) — Priorité 3.
- Lecture/traitement des demandes d'intérêt depuis une interface admin — consultation via le Table Editor Supabase pour l'instant.

## Fichiers impactés

- **Nouveau** (SQL) : ajout à `supabase/schema.sql` — table `pillar_interest` + policy RLS.
- **Nouveau** : `src/app/actions/pillar-interest.ts`
- **Nouveau** : `src/components/PillarInterestForm.tsx`
- **Nouveau** : `src/app/festival/page.tsx`, `src/app/experiences/page.tsx`, `src/app/passeport/page.tsx`, `src/app/oteranga/page.tsx`, `src/app/communaute/page.tsx`, `src/app/impact/page.tsx`
- **Renommage** : `src/app/experience/page.tsx` → `src/app/evenement/page.tsx`
- **Modifie** : `src/components/Header.tsx`, `src/components/Univers.tsx`, `src/components/Programme.tsx`

## Critères de validation

- Chaque route (`/festival`, `/experiences`, `/passeport`, `/oteranga`, `/communaute`, `/impact`) affiche son propre contenu (signature, vision, objectifs) et un formulaire fonctionnel.
- Soumettre le formulaire sur une page crée bien une ligne dans `pillar_interest` avec le bon `pillar`.
- Les 6 cartes de la section Écosystème sur la home et les 6 liens du menu mènent chacun à la bonne page.
- `/evenement` fonctionne (ancien `/experience`), `/experience` n'existe plus, aucun lien mort dans le site vers l'ancienne URL.
- Build et lint propres, parcours testé sur mobile.

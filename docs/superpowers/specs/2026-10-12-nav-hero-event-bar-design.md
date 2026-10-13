# Sous-projet A — Navigation, Hero & barre événementielle

**Date**: 2026-10-12
**Contexte**: Origin Teranga Expérience 2026 se tient du 4 au 8 novembre à l'ESCOA, Dakar. Il reste ~25 jours avant l'événement. Le site doit refléter cette priorité événementielle sans devenir l'identité permanente de la marque. Ce document couvre uniquement le sous-projet A (navigation, Hero, barre événementielle) issu de la décomposition du brief complet en 3 sous-projets de Priorité 1 :
- **A** — Navigation & Hero (ce document)
- **B** — Page événement (programmation, Village, infos pratiques) — à spécifier après A
- **C** — Système d'inscription (activités, capacités, tarifs, places restantes, liste d'attente) — à spécifier après A

Une 4ème pièce — la réorganisation complète de l'ordre des sections de la home — est délibérément reportée à après B et C.

## Hors scope (décisions explicites)

- Pas de vraies pages pour les 6 "univers" (Festival, Expériences, Passeport, Oteranga, Communauté, Impact) — Priorité 2.
- Pas de bascule automatique par date entre l'état "événement" (maintenant → 8 nov) et l'état "institutionnel" (à partir du 9 nov) — sous-projet séparé, traité plus tard avec plus de recul.
- Pas de réorganisation complète de l'ordre des sections de la home.
- Pas de mega menu (aucune sous-page à afficher pour l'instant).
- Pas de remplacement du visuel du Hero par l'illustration officielle (fille/garçon) — pas encore livrée. On garde la photo Unsplash actuelle.

## 1. Barre événementielle (nouveau composant `EventBar.tsx`)

- Bande fine, fond `clay` (terracotta existant dans le design system), sticky **au-dessus** du `Header`, intégrée dans `layout.tsx` pour être visible sur **toutes les pages** (home, `/reserver`, `/activites/[slug]`).
- Contenu desktop : `ORIGIN TERANGA EXPÉRIENCE 2026 · 04—08 NOV · DAKAR · S'INSCRIRE →`
- Contenu mobile (raccourci pour éviter le retour à la ligne) : `04—08 NOV · S'INSCRIRE →`
- Toute la barre (ou au minimum "S'inscrire →") est un lien vers `/reserver`.
- Pas de bouton de fermeture — doit rester visible en permanence sur cette période.
- Le `Header` existant (`sticky top-0`) doit être repositionné sous la barre (la barre devient le nouvel élément `sticky top-0`, le header se cale juste en dessous, ou les deux sont empilés dans un wrapper sticky commun).

## 2. Menu principal (`Header.tsx`)

- `NAV_LINKS` mis à jour : `Festival | Expériences | Passeport | Oteranga | Communauté | Impact | À propos`
- Les 6 premiers liens pointent vers `#ecosysteme` (nouvelle section décrite en section 4). `À propos` pointe vers `#histoire` (section existante, contenu déjà pertinent pour "notre histoire/vision").
- Sur les pages autres que la home (`/reserver`, `/activites/[slug]`), ces ancres doivent être préfixées (`/#ecosysteme`, `/#histoire`) pour ramener vers la home avant de scroller.
- Bouton CTA conservé dans le header, renommé **"S'inscrire"**, `href="/reserver"` (remplace "Réserver" — déjà en cours de migration dans le diff non commité).
- Menu mobile : accordéon existant inchangé dans sa logique d'ouverture/fermeture ; seuls les libellés et liens changent.
- Pas de mega menu dans ce sous-projet.

## 3. Hero (`Hero.tsx`)

Version "BILAN" (synthèse finale du brief), courte et focalisée événement :

- Label au-dessus du titre : `ORIGIN TERANGA EXPÉRIENCE 2026` (remplace "Origin Teranga · Festival culturel africain").
- Titre inchangé dans sa forme : `Nos origines. / Notre culture. / Notre avenir.`
- Sous-titre remplacé par : `Origin Teranga Expérience — Du 4 au 8 novembre 2026, ESCOA Dakar.`
- Boutons :
  - `[S'inscrire]` → `/reserver` (remplace "Découvrir le festival")
  - `[Découvrir le programme]` → `#programme` (remplace "Voir le programme", cible inchangée)
- Tag discret en bas à droite de l'image : `Dakar · ESCOA · 2026` (remplace "Dakar · Paris · 2026").
- Visuel : on garde `images.hero` (photo Unsplash actuelle), structure de section inchangée. Pas de recomposition en attendant l'illustration officielle.
- Lien "Scroller" en bas de section : cible `#manifesto`, inchangé (hors scope de la réorganisation des sections).

## 4. Nouvelle section "Écosystème" (remplace le contenu de `Univers.tsx`)

La section actuelle "Nos univers" (7 cartes thématiques : Sport/Leader, Story/Littérature, TIC/Marketing, Music/Dance, Food/Agriculture, Émergence/Économie, Entrepreneuriat) ne correspond à aucun concept du brief et est **remplacée** intégralement.

Nouveau contenu, dans le même fichier `Univers.tsx` (même emplacement dans `page.tsx`) :

- `id="ecosysteme"` sur la `<section>` (cible des 6 premiers liens du menu).
- Label : `BIEN PLUS QU'UN ÉVÉNEMENT`
- Titre : `Découvrez l'écosystème Origin Teranga.`
- Paragraphe d'intro : *"Origin Teranga est une initiative culturelle, communautaire et économique qui rassemble les talents, valorise les savoir-faire et crée des passerelles entre l'Afrique, ses diasporas et le monde."*
- 6 cartes, format compact (titre + signature uniquement, pas de photo — pas besoin de sourcer de nouvelles images) :

  | Univers | Signature |
  |---|---|
  | Festival | L'Afrique se célèbre. |
  | Expériences | L'Afrique se vit. |
  | Passeport | L'Afrique se découvre. |
  | Oteranga | L'Afrique se crée. |
  | Communauté | L'Afrique se rassemble. |
  | Impact | L'Afrique se construit. |

- Les cartes ne sont pas cliquables pour l'instant (pas de pages de destination) — purement présentationnel.

## 5. Récapitulatif des ancres de la home

| Lien menu | Ancre |
|---|---|
| Festival | `#ecosysteme` |
| Expériences | `#ecosysteme` |
| Passeport | `#ecosysteme` |
| Oteranga | `#ecosysteme` |
| Communauté | `#ecosysteme` |
| Impact | `#ecosysteme` |
| À propos | `#histoire` |

## Fichiers impactés

- **Nouveau** : `src/components/EventBar.tsx`
- `src/app/layout.tsx` — intégration de `EventBar` au-dessus du `Header`
- `src/components/Header.tsx` — nouveaux `NAV_LINKS`, CTA renommé
- `src/components/Hero.tsx` — copy mise à jour
- `src/components/Univers.tsx` — contenu remplacé (nouvelle section Écosystème)
- `src/app/page.tsx` — aucun changement d'ordre des sections (hors scope), l'import `Univers` reste à la même place

## Critères de validation

- La barre événementielle est visible sur la home, `/reserver`, et une page `/activites/[slug]`, en desktop et mobile.
- Le lien "S'inscrire →" de la barre et le bouton du header mènent bien à `/reserver`.
- Les 7 liens du menu desktop et mobile scrollent vers les bonnes ancres (depuis la home) ou redirigent correctement depuis une autre page.
- Le Hero affiche la nouvelle copy et les deux nouveaux boutons, fonctionnels.
- La section Écosystème affiche les 6 cartes avec les bonnes signatures, et l'ancienne section "Nos univers" (7 cartes) n'existe plus.
- Aucune régression visuelle évidente sur mobile (menu accordéon, barre événementielle qui ne casse pas la mise en page).

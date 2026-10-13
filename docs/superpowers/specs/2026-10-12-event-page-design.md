# Sous-projet B — Page événement "Origin Teranga Expérience 2026"

**Date**: 2026-10-12
**Contexte**: Sous-projet B de la Priorité 1 (voir `2026-10-12-nav-hero-event-bar-design.md` pour la décomposition : A = Navigation & Hero (fait), C = Système d'inscription (fait), B = ce document).

## 1. Architecture

- **Nouvelle route `/experience`** (`src/app/experience/page.tsx`) : `Header`, bref en-tête de page, puis 3 sections (programmation détaillée, Le Village, informations pratiques), `Footer`. Suit le même gabarit que `src/app/reserver/page.tsx` et `src/app/activites/[slug]/page.tsx` (Header/contenu/Footer).
- **Section home `Programme.tsx`** : remplacée par un teaser compact des 6 rendez-vous (titre + horaire seulement, pas de description longue), avec un bouton "Voir le programme complet →" vers `/experience`.
- Les liens `#programme` existants (bouton "Découvrir le programme" du Hero, lien du Header) continuent de scroller vers cette section home — aucun changement sur ces liens.
- Pas de nouvel item de menu principal : `/experience` est atteignable via la barre événementielle et le teaser home.

## 2. Programmation — 6 rendez-vous

Contenu repris du brief, inchangé :

| Créneau | Titre | Description | Réservable | Type d'activité (sous-projet C) |
|---|---|---|---|---|
| 04 nov | Soirée de bienvenue | "Lançons ensemble l'aventure Origin Teranga autour de la musique, des rencontres et du partage." | Non | — |
| 04–08 nov | Retransmissions sportives | "Vivez les émotions des compétitions et partagez les grands moments sportifs." | Non | — |
| 14h00 | Ateliers créatifs | "Exprimez votre créativité à travers des ateliers artistiques et des expériences participatives." | Oui | `atelier` |
| 16h30 | Conférences | "Rencontrez des personnalités inspirantes issues du sport, de la culture et de l'entrepreneuriat." | Oui | `conference` |
| 17h30 | Masterclass | "Échangez avec des professionnels et développez vos idées, vos compétences et vos projets." | Oui | `masterclass` |
| 18h30 | Initiations sportives | "Découvrez de nouvelles disciplines et participez à des activités accessibles à différents niveaux." | Oui | `initiation` |

**Sur `/experience`** :
- Grille de 6 cartes résumées en haut de la section (titre, horaire, description courte, bouton "Découvrir →" qui ancre vers le détail correspondant plus bas sur la même page).
- 6 blocs de détail plus bas, un par rendez-vous, même texte complet.
- Les 4 blocs réservables (Ateliers, Conférences, Masterclass, Initiations) ont un bouton "Réserver" → `/reserver`.
- Les 2 blocs non réservables (Soirée de bienvenue, Retransmissions sportives) n'ont pas de bouton de réservation.

**Sur la home (teaser)** : les 6 titres + horaires en version courte (sans les descriptions longues), bouton "Voir le programme complet →" vers `/experience`.

## 3. Le Village

Espaces accessibles en continu pendant les 5 jours, distincts des activités à horaires fixes : Fan Zone, Jeux de société, E-Gaming (jeux interactifs), Fooding, Studio Photo, Rencontres.

Affichage : grille compacte de 6 cartes (titre + courte accroche générique, sans détail inventé au-delà du nom), même traitement visuel que la section Écosystème (cartes simples sans photo, cf. sous-projet A). Pas de bouton, pas de lien — purement présentationnel.

## 4. Informations pratiques

Reste minimal pour l'instant :
- Dates : 4 → 8 novembre 2026
- Lieu : ESCOA, Dakar
- Mention : "Entrée gratuite — inscription requise selon l'activité"

Pas d'adresse précise, pas d'horaires d'ouverture détaillés, pas de section accès/parking/contact inventée — à enrichir plus tard quand l'information sera disponible.

## Hors scope de ce sous-projet B

- Détails d'adresse/horaires précis de l'ESCOA.
- Modification du menu principal.
- Modification de `Activites.tsx` / `BattleAfroBanner.tsx` (contenu d'un ancien concept de festival non traité dans ce sous-projet).
- Affichage des places restantes directement sur les cartes de `/experience` (reste dans `/reserver` pour l'instant).

## Fichiers impactés

- **Nouveau** : `src/app/experience/page.tsx`
- **Modifie** : `src/components/Programme.tsx` (remplacement complet du contenu : teaser + lien vers `/experience`)

## Critères de validation

- `/experience` affiche les 6 rendez-vous en résumé puis en détail, Le Village (6 espaces), et les informations pratiques.
- Les boutons "Découvrir →" des 6 cartes résumées ancrent correctement vers leur bloc de détail.
- Les boutons "Réserver" des 4 activités réservables mènent à `/reserver`.
- La section home "Programme" affiche le teaser des 6 rendez-vous et un bouton vers `/experience`.
- Les liens `#programme` du Hero et du Header scrollent toujours correctement vers la section home.
- Aucune régression visuelle sur mobile (grilles de cartes qui restent lisibles en 1-2 colonnes).

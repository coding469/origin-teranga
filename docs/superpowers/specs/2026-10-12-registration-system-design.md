# Sous-projet C — Système d'inscription aux activités

**Date**: 2026-10-12
**Contexte**: Sous-projet C de la Priorité 1 (voir `2026-10-12-nav-hero-event-bar-design.md` pour la décomposition complète : A = Navigation & Hero (fait), B = Page événement (à venir), C = ce document).

## Constat de départ

Le site est aujourd'hui 100% statique : aucune base de données, aucune route API. `ReservationForm.tsx` existant ne fait qu'afficher un message de confirmation local (`setSubmitted(true)`) sans rien envoyer nulle part. Le brief exige un suivi des places **partagé entre tous les visiteurs et décrémenté en temps réel** — impossible sans backend persistant. Décision validée : ajouter une base Postgres managée (**Supabase**).

Projet Supabase déjà créé par l'utilisateur :
- URL : `https://xnbkhjdtivormdjrrhop.supabase.co`
- Clé publique (`sb_publishable_...`) déjà stockée dans `.env.local` (gitignoré) sous `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 1. Modèle de données (Postgres / Supabase)

### Table `activity_slots`

Une ligne par couple (type d'activité × jour). 20 lignes au lancement (4 activités × 5 jours, 4–8 nov 2026).

| Colonne | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK, `default gen_random_uuid()`) | |
| `activity_type` | `text` | `atelier` \| `conference` \| `masterclass` \| `initiation` |
| `label` | `text` | ex. "Ateliers artistiques" |
| `event_date` | `date` | entre `2026-11-04` et `2026-11-08` |
| `start_time` | `text` | ex. "14:00" (affichage uniquement, pas de logique horaire) |
| `capacity` | `integer` | places au départ pour cette ligne |
| `remaining_seats` | `integer` | décrémenté par `book_slot`, jamais modifié directement par le client |
| `price_standard` | `integer` | en FCFA, `0` si gratuit |
| `price_etudiant` | `integer` | en FCFA, `0` si gratuit |
| `speaker_note` | `text`, nullable | ex. "Intervenant à confirmer" |

Valeurs initiales (`capacity` = `remaining_seats` au départ), répétées pour chacun des 5 jours (`2026-11-04` à `2026-11-08`) :

| `activity_type` | `label` | `start_time` | `capacity` | `price_standard` | `price_etudiant` |
|---|---|---|---|---|---|
| `atelier` | Ateliers artistiques | 14:00 | 75 | 6000 | 3000 |
| `conference` | Conférences | 16:30 | 80 | 0 | 0 |
| `masterclass` | Masterclass | 17:30 | 12 | 7000 | 5000 |
| `initiation` | Initiations sportives | 18:30 | 45 | 0 | 0 |

### Table `reservations`

| Colonne | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK, `default gen_random_uuid()`) | |
| `slot_id` | `uuid` (FK → `activity_slots.id`) | |
| `participant_type` | `text` | `standard` \| `etudiant` |
| `nom` | `text` | |
| `prenom` | `text` | |
| `whatsapp` | `text` | |
| `email` | `text`, nullable | |
| `status` | `text` | `confirmed` \| `waitlisted` |
| `payment_status` | `text` | `not_required` \| `pending_on_site` (valeur `paid_online` réservée pour une évolution future hors scope) |
| `created_at` | `timestamptz` | `default now()` |

### Fonction `book_slot`

```sql
create or replace function book_slot(
  p_slot_id uuid,
  p_participant_type text,
  p_nom text,
  p_prenom text,
  p_whatsapp text,
  p_email text
) returns table(status text, waitlist_position integer, payment_status text)
language plpgsql
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
```

`select ... for update` verrouille la ligne du créneau le temps de la transaction : deux réservations simultanées sur le même créneau ne peuvent pas lire le même `remaining_seats` avant décrément (pas de surbooking possible).

### Row Level Security

- RLS activé sur les deux tables.
- `activity_slots` : policy `select` publique (lecture libre, nécessaire pour afficher les places restantes).
- `reservations` : aucune policy `select`/`insert`/`update` directe pour le rôle `anon` — la seule voie d'écriture est l'appel à la fonction `book_slot` (`security definer`), jamais une requête directe sur la table depuis le client.

## 2. Server Actions (`src/app/reserver/actions.ts`)

- `getSlotsForDate(eventDate: string): Promise<ActivitySlot[]>` — lit `activity_slots` pour la date donnée, trié par `start_time`. Utilisé pour peupler le menu déroulant "Activité" une fois la date choisie.
- `bookSlot(input: { slotId: string; participantType: "standard" | "etudiant"; nom: string; prenom: string; whatsapp: string; email?: string }): Promise<{ status: "confirmed" | "waitlisted"; waitlistPosition: number | null; paymentStatus: "not_required" | "pending_on_site" }>` — appelle `supabase.rpc("book_slot", …)` et retourne le résultat typé.

`src/lib/supabase.ts` exporte un client unique créé avec `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`, utilisé uniquement côté serveur (dans les Server Actions) — jamais importé depuis un composant client.

## 3. Formulaire de réservation (remplace `src/components/ReservationForm.tsx`)

Formulaire une page, client component, champs en cascade :

1. **Date** — `<select>` des 5 jours (4 au 8 novembre 2026), libellés "Mardi 4 novembre" … "Samedi 8 novembre".
2. **Activité** — dès qu'une date est choisie, appel à `getSlotsForDate`, affichage des 4 activités de ce jour sous forme de boutons radio, chacun avec :
   - le nom de l'activité et l'horaire (ex. "Masterclass · 17h30")
   - les places restantes (ex. "3 places restantes") ou "Complet — liste d'attente" si `remaining_seats === 0`
   - le tarif standard/étudiant si l'activité est payante
3. **Type de participant** — radio Standard / Étudiant. Si Étudiant est sélectionné : note sous le champ "Présentez ta carte étudiante et une pièce d'identité à l'entrée."
4. **Coordonnées** — nom, prénom, WhatsApp (requis), email (optionnel) — repris tels quels du formulaire actuel.
5. **Bouton de réservation** — appelle `bookSlot`, désactivé pendant la soumission.

**Résultat affiché après soumission** (remplace l'écran "Merci" actuel) :
- `status === "confirmed"` et `paymentStatus === "not_required"` → "Ton inscription est confirmée."
- `status === "confirmed"` et `paymentStatus === "pending_on_site"` → "Ta place est réservée. Montant à régler sur place : {prix} FCFA ({tarif})."
- `status === "waitlisted"` → "Cette activité est complète. Tu es en position n°{waitlistPosition} sur la liste d'attente, on te recontacte sur WhatsApp si une place se libère."

Le bouton "Activité" reste cliquable mais désactivé (non sélectionnable) quand `remaining_seats === 0`, avec un lien/texte "Rejoindre la liste d'attente" qui permet quand même de sélectionner ce créneau pour soumettre une demande en liste d'attente.

## Hors scope de ce sous-projet C

- Paiement en ligne réel (Wave/Orange Money) — schéma prêt (`payment_status`) mais intégration non faite, en attente d'un compte marchand.
- Annulation de réservation et promotion automatique de la liste d'attente.
- Back-office/admin UI dédié — la programmation (horaires, intervenants, capacités) s'édite directement dans le Table Editor Supabase.
- Affichage des places restantes ailleurs sur le site (page événement du sous-projet B).
- Upload de justificatif étudiant (vérification physique à l'entrée uniquement).

## Fichiers impactés

- **Nouveau** (SQL, exécuté via Supabase SQL editor ou CLI) : création des tables `activity_slots`, `reservations`, de la fonction `book_slot`, des policies RLS, et insertion des 20 lignes initiales de `activity_slots`.
- **Nouveau** : `src/lib/supabase.ts`
- **Nouveau** : `src/app/reserver/actions.ts`
- **Modifie** : `src/components/ReservationForm.tsx` (remplacement complet du contenu)
- `.env.local` : déjà en place (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Critères de validation

- Deux réservations simultanées sur un créneau à 1 place restante : une seule passe en `confirmed`, l'autre en `waitlisted` (pas de surbooking).
- Les places restantes affichées sur `/reserver` reflètent l'état réel de la base après chaque réservation (rafraîchir la page doit montrer le nombre à jour).
- Une activité gratuite confirme l'inscription sans mention de paiement.
- Une activité payante affiche le bon tarif selon standard/étudiant et le bon message "à régler sur place".
- Un créneau complet propose la liste d'attente et affiche la bonne position.
- Modifier `start_time` ou `speaker_note` d'une ligne `activity_slots` depuis le Table Editor Supabase ne modifie ni ne supprime les réservations déjà liées à cette ligne.
- Parcours testé sur mobile (menus en cascade utilisables sur petit écran).

"use client";

import { useState, useTransition, type FormEvent } from "react";
import {
  bookSlot,
  getSlotsForDate,
  type ActivitySlot,
  type BookSlotResult,
} from "@/app/reserver/actions";

const EVENT_DATES = [
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

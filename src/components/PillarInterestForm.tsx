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

"use client";

import { useState, type FormEvent } from "react";

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-dark-ink/14 bg-sand-soft px-8 py-14 text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Merci
        </span>
        <p className="mt-4 font-display text-[clamp(22px,2.6vw,30px)] font-medium">
          Ta demande a bien été envoyée.
        </p>
        <p className="mt-3 text-[15px] text-dark-ink/64">
          On te recontacte très vite sur WhatsApp pour confirmer ta place.
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

      <button
        type="submit"
        className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-full bg-clay text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft sm:w-auto sm:px-10"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}

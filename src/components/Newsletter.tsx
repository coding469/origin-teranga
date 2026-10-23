"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <section
      id="reserver"
      className="bg-sand px-5 py-16 text-dark-ink sm:px-8 sm:py-24 lg:px-[72px] lg:py-[110px]"
    >
      <div className="mx-auto max-w-[620px] text-center">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Newsletter
        </span>
        <h2 className="mt-4 mb-2.5 font-display text-[clamp(26px,3.4vw,42px)] font-medium">
          Ne manquez rien de l&apos;aventure Origin Teranga
        </h2>
        <p className="mb-8 text-[15px] text-dark-ink/64">
          Recevez les actualités, événements et ouvertures de réservation
          directement dans votre boîte mail.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-3"
        >
          <label className="sr-only" htmlFor="nl-email">
            Adresse email
          </label>
          <input
            id="nl-email"
            type="email"
            required
            placeholder="votre@email.com"
            className="h-14 max-w-[320px] flex-1 basis-[240px] rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
          />
          <button
            type="submit"
            className="inline-flex h-14 items-center rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft"
          >
            S&apos;inscrire
          </button>
        </form>
        {subscribed && (
          <p className="mt-4 text-[13.5px] font-bold text-clay">
            Merci ! Vous recevrez bientôt nos prochaines nouvelles.
          </p>
        )}
      </div>
    </section>
  );
}

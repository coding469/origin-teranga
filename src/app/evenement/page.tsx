import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { REGISTRATION_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Origin Teranga Expérience 2026 | Origin Teranga",
  description:
    "Du 5 au 8 novembre 2026 à l'ESCOA, Dakar : programmation, Village et informations pratiques de l'Origin Teranga Expérience.",
};

const RDV = [
  {
    id: "ateliers",
    time: "14h00 – 16h30",
    title: "Ateliers artistiques",
    desc: "Peinture, customisation tote bag / t-shirt, diamond painting. 1ère séance offerte, puis 6 500 FCFA.",
    bookable: true,
  },
  {
    id: "conferences",
    time: "16h30 – 17h30",
    title: "Conférence du jour",
    desc: "Un thème différent chaque jour, animé par des intervenants experts. Accès libre.",
    bookable: false,
  },
  {
    id: "masterclass",
    time: "17h30 – 18h30",
    title: "Masterclass projets",
    desc: "Présentez votre projet à des experts du financement pour un accompagnement personnalisé. Places limitées, 6 500 FCFA.",
    bookable: true,
  },
  {
    id: "initiations",
    time: "18h30 – 20h00",
    title: "Initiations sportives",
    desc: "Basketball, lutte, badminton encadrés par des officiels fédéraux. Accès libre, tous niveaux.",
    bookable: false,
  },
] as const;

const JOURS = [
  {
    day: "Jeudi 5 novembre",
    theme: "Conférence Finance",
    desc: "Comment financer des projets professionnels dans le sport et la culture au Sénégal ?",
  },
  {
    day: "Vendredi 6 novembre",
    theme: "Conférence Sport",
    desc: "L'emploi et le développement national à travers le sport.",
  },
  {
    day: "Samedi 7 novembre",
    theme: "Conférence Culture",
    desc: "Le rôle des industries créatives dans l'emploi des jeunes et le rayonnement international du Sénégal.",
  },
  {
    day: "Dimanche 8 novembre",
    theme: "Conférence Jeunesse",
    desc: "La jeunesse peut-elle transformer l'image du Sénégal ?",
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
            5 → 8 novembre 2026 · ESCOA, Dakar
          </span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium">
            Origin Teranga Expérience 2026
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
            Quatre jours pour vibrer, découvrir, créer et partager autour du
            sport, de la culture et de la jeunesse.
          </p>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mb-12 max-w-[680px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-clay-soft">
            Au programme, chaque jour
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Le même rythme, quatre jours de suite
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RDV.map((rdv) => (
            <div
              key={rdv.id}
              className="flex flex-col rounded-2xl border border-ink/14 px-6 py-7"
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
              {rdv.bookable ? (
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-[44px] items-center gap-2.5 self-start rounded-full bg-clay px-6 text-[13px] font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
                >
                  S&apos;inscrire
                </a>
              ) : (
                <span className="mt-5 inline-flex h-[44px] items-center self-start text-[13px] font-bold text-ink/34">
                  Accès libre
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mb-12 max-w-[680px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Thème du jour
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            La conférence de 16h30 change chaque jour
          </h2>
        </div>

        <div className="border-b border-ink/14">
          {JOURS.map((jour) => (
            <div
              key={jour.day}
              className="flex flex-col gap-1.5 border-t border-ink/14 py-6 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-display text-xl font-medium sm:w-[220px] sm:flex-none">
                {jour.day}
              </span>
              <div className="sm:flex-1">
                <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-clay-soft">
                  {jour.theme}
                </span>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/62">
                  {jour.desc}
                </p>
              </div>
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
            Du 5 au 8 novembre 2026 · ESCOA, Dakar.
            <br />
            Entrée gratuite — inscription requise selon l&apos;activité.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

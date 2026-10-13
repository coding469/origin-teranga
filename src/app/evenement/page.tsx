import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Origin Teranga Expérience 2026 | Origin Teranga",
  description:
    "Du 4 au 8 novembre 2026 à l'ESCOA, Dakar : programmation, Village et informations pratiques de l'Origin Teranga Expérience.",
};

const RDV = [
  {
    id: "bienvenue",
    time: "04 nov",
    title: "Soirée de bienvenue",
    desc: "Lançons ensemble l'aventure Origin Teranga autour de la musique, des rencontres et du partage.",
    bookable: false,
  },
  {
    id: "retransmissions",
    time: "04–08 nov",
    title: "Retransmissions sportives",
    desc: "Vivez les émotions des compétitions et partagez les grands moments sportifs.",
    bookable: false,
  },
  {
    id: "ateliers",
    time: "14h00",
    title: "Ateliers créatifs",
    desc: "Exprimez votre créativité à travers des ateliers artistiques et des expériences participatives.",
    bookable: true,
  },
  {
    id: "conferences",
    time: "16h30",
    title: "Conférences",
    desc: "Rencontrez des personnalités inspirantes issues du sport, de la culture et de l'entrepreneuriat.",
    bookable: true,
  },
  {
    id: "masterclass",
    time: "17h30",
    title: "Masterclass",
    desc: "Échangez avec des professionnels et développez vos idées, vos compétences et vos projets.",
    bookable: true,
  },
  {
    id: "initiations",
    time: "18h30",
    title: "Initiations sportives",
    desc: "Découvrez de nouvelles disciplines et participez à des activités accessibles à différents niveaux.",
    bookable: true,
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
            4 → 8 novembre 2026 · ESCOA, Dakar
          </span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,64px)] font-medium">
            Origin Teranga Expérience 2026
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
            Cinq jours pour vibrer, découvrir, créer et partager autour du
            sport, de la culture et de la jeunesse.
          </p>
        </div>
      </section>

      <section className="bg-bg-soft px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mb-12 max-w-[680px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Au programme
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Six rendez-vous majeurs
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RDV.map((rdv) => (
            <div
              key={rdv.id}
              className="rounded-2xl border border-ink/14 px-6 py-7"
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
              <a
                href={`#${rdv.id}`}
                className="mt-4 inline-flex text-[13px] font-bold text-clay-soft underline-link"
              >
                Découvrir →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {RDV.map((rdv) => (
            <div key={rdv.id} id={rdv.id} className="scroll-mt-24">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-ink/34">
                {rdv.time}
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium">
                {rdv.title}
              </h3>
              <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-ink/62">
                {rdv.desc}
              </p>
              {rdv.bookable && (
                <a
                  href="/reserver"
                  className="mt-5 inline-flex h-[48px] items-center gap-2.5 rounded-full bg-clay px-6 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
                >
                  Réserver
                </a>
              )}
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
            Du 4 au 8 novembre 2026 · ESCOA, Dakar.
            <br />
            Entrée gratuite — inscription requise selon l&apos;activité.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const RDV_TEASER = [
  { time: "14h00", title: "Ateliers créatifs" },
  { time: "16h30", title: "Conférences" },
  { time: "17h30", title: "Masterclass" },
  { time: "18h30", title: "Initiations sportives" },
] as const;

export default function Programme() {
  return (
    <section
      id="programme"
      className="sticky top-0 z-[13] rounded-t-[32px] bg-bg-soft px-5 py-20 shadow-[0_-24px_60px_rgba(0,0,0,0.25)] sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Au programme
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
            Quatre jours, quatre rendez-vous
          </h2>
        </div>
        <a
          href="/evenement"
          className="hidden h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6 lg:inline-flex"
        >
          Voir le programme complet
        </a>
      </div>

      <div className="border-b border-ink/14">
        {RDV_TEASER.map((rdv) => (
          <div
            key={rdv.title}
            className="group flex flex-wrap items-center justify-between gap-4 border-t border-ink/14 px-4 py-6 transition-all duration-300 first:border-t-0 hover:bg-ink/5 hover:px-6"
          >
            <span className="font-display text-xl font-medium transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
              {rdv.title}
            </span>
            <span className="text-[13px] text-ink/62">{rdv.time}</span>
          </div>
        ))}
      </div>

      <a
        href="/evenement"
        className="mt-8 inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5 lg:hidden"
      >
        Voir le programme complet
      </a>
    </section>
  );
}

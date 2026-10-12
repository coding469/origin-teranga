const PILLARS = [
  { name: "Festival", signature: "L'Afrique se célèbre." },
  { name: "Expériences", signature: "L'Afrique se vit." },
  { name: "Passeport", signature: "L'Afrique se découvre." },
  { name: "Oteranga", signature: "L'Afrique se crée." },
  { name: "Communauté", signature: "L'Afrique se rassemble." },
  { name: "Impact", signature: "L'Afrique se construit." },
];

export default function Univers() {
  return (
    <section
      id="ecosysteme"
      className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 max-w-[680px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
          Bien plus qu&apos;un événement
        </span>
        <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-medium">
          Découvrez l&apos;écosystème Origin Teranga.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-dark-ink/64">
          Origin Teranga est une initiative culturelle, communautaire et
          économique qui rassemble les talents, valorise les savoir-faire et
          crée des passerelles entre l&apos;Afrique, ses diasporas et le
          monde.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.name}
            className="rounded-2xl border border-dark-ink/12 bg-sand-soft px-6 py-8"
          >
            <h3 className="font-display text-xl">{pillar.name}</h3>
            <p className="mt-2 text-[15px] italic text-dark-ink/64">
              {pillar.signature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

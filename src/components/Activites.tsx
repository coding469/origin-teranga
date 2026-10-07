import Image from "next/image";
import Link from "next/link";
import { ACTIVITES } from "@/lib/activites";

export default function Activites() {
  return (
    <section
      id="activites"
      className="bg-bg px-5 py-20 sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay-soft">
            Nos activités
          </span>
          <h2 className="mt-3.5 max-w-[640px] font-display text-[clamp(30px,4vw,56px)] font-medium">
            Huit façons de vivre Origin Teranga
          </h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-relaxed text-ink/62">
          Des expériences pensées pour toutes les générations, du voyage
          privé à la marketplace, chaque activité raconte une part de la
          culture.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-6">
        {ACTIVITES.map((tile) => (
          <Link
            key={tile.slug}
            href={`/activites/${tile.slug}`}
            className={`group relative isolate overflow-hidden rounded-[18px] ${tile.span} ${tile.aspect}`}
          >
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-[1.07]">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/35 to-bg/90" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="font-display text-sm text-ink/34">
                {tile.num}
              </span>
              <div>
                <h3 className="mb-2 font-display text-xl font-medium sm:text-2xl">
                  {tile.title}
                </h3>
                <p className="mb-3.5 max-w-[360px] text-[13px] text-ink/62 sm:text-sm">
                  {tile.shortDesc}
                </p>
                <span className="inline-block text-[12.5px] font-bold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  {tile.cta} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

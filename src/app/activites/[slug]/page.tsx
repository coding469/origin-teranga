import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ACTIVITES, getActivite } from "@/lib/activites";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ACTIVITES.map((activite) => ({ slug: activite.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const activite = getActivite(slug);
  if (!activite) return {};
  return {
    title: `${activite.title} | Origin Teranga`,
    description: activite.shortDesc,
  };
}

export default async function ActiviteDetailPage({ params }: Props) {
  const { slug } = await params;
  const activite = getActivite(slug);
  if (!activite) notFound();

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="relative flex min-h-[56vh] flex-col justify-end overflow-hidden px-5 pb-16 sm:px-8 lg:px-[72px] lg:pb-20">
        <div className="absolute inset-0">
          <Image
            src={activite.image}
            alt={activite.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
        </div>
        <div className="relative z-10">
          <Link
            href="/#activites"
            className="mb-6 inline-block text-[12.5px] font-bold uppercase tracking-[0.18em] text-ink/62 hover:text-ink"
          >
            ← Toutes les activités
          </Link>
          <span className="block font-display text-sm text-ink/34">
            {activite.num}
          </span>
          <h1 className="mt-3 font-display text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
            {activite.title}
          </h1>
        </div>
      </section>

      <section className="bg-bg px-5 py-16 sm:px-8 sm:py-20 lg:px-[72px]">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6">
          {activite.longDesc.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink/62">
              {paragraph}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="/#reserver"
              className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
            >
              {activite.cta}
            </a>
            <Link
              href="/#activites"
              className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-ink/40 px-7 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/6"
            >
              Voir les autres activités
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

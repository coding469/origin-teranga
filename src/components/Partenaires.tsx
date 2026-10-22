import Marquee from "@/components/motion/Marquee";

const PARTNERS = [
  "LOUDNICK",
  "CROSSWILL",
  "Real Wave",
  "PITCH",
  "Juire",
  "Job Line",
  "INNER",
  "LO",
];

export default function Partenaires() {
  return (
    <section
      id="partenaires"
      className="grain relative overflow-hidden bg-bg py-16"
    >
      <p className="mb-9 text-center text-[13px] uppercase tracking-[0.1em] text-ink/34">
        Ils construisent l&apos;expérience avec nous
      </p>
      <Marquee items={PARTNERS} />
    </section>
  );
}

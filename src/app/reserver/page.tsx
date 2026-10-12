import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Réserver | Origin Teranga",
  description:
    "Réserve ta place pour le festival Origin Teranga en quelques informations.",
};

export default function ReserverPage() {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />

      <section className="bg-sand px-5 py-20 text-dark-ink sm:px-8 sm:py-28 lg:px-[72px] lg:py-[140px]">
        <div className="mx-auto max-w-[560px]">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Réservation
          </span>
          <h1 className="mt-4 mb-3 font-display text-[clamp(32px,4vw,52px)] font-medium">
            Réserve ta place
          </h1>
          <p className="mb-10 text-[15px] leading-relaxed text-dark-ink/64">
            Laisse-nous tes coordonnées, on te recontacte directement sur
            WhatsApp pour confirmer ta participation au festival.
          </p>

          <ReservationForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Passeport | Origin Teranga",
  description:
    "L'Afrique se découvre : découvrir l'Afrique autrement, à travers des voyages et des destinations qui racontent une autre histoire du continent.",
};

export default function PasseportPage() {
  return (
    <PillarPage
      pillar="passeport"
      title="Passeport"
      signature="L'Afrique se découvre."
      vision="Découvrir l'Afrique autrement, à travers des voyages et des destinations qui racontent une autre histoire du continent."
      image={images.activites.voyage}
      imageAlt="Pirogue colorée sur une plage sénégalaise"
      accentImage={images.activites.excursion}
      accentImageAlt="Monument de la Renaissance africaine à Dakar au coucher du soleil"
      objectifs={[
        "Faire découvrir des destinations africaines authentiques",
        "Proposer des voyages solidaires et responsables",
        "Valoriser le patrimoine et les savoir-faire locaux",
      ]}
    />
  );
}

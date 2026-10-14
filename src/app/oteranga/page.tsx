import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Oteranga | Origin Teranga",
  description:
    "L'Afrique se crée : la marketplace qui met en lumière les artisans, créateurs et marques africaines.",
};

export default function OterangaPage() {
  return (
    <PillarPage
      pillar="oteranga"
      title="Oteranga"
      signature="L'Afrique se crée."
      vision="La marketplace qui met en lumière les artisans, créateurs et marques africaines."
      accent="gold"
      image={images.activites.marketplace}
      imageAlt="Textiles et vêtements colorés exposés sur un marché"
      accentImage={images.activites.masterclass}
      accentImageAlt="Artisan au travail lors d'un atelier créatif"
      objectifs={[
        "Valoriser l'artisanat et les créateurs africains",
        "Offrir une vitrine aux marques africaines émergentes",
        "Créer des opportunités économiques directes pour les vendeurs",
      ]}
    />
  );
}

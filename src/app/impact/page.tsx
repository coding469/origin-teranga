import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impact | Origin Teranga",
  description:
    "L'Afrique se construit : l'ambition sociale et économique d'Origin Teranga, au service de l'entrepreneuriat et de l'éducation.",
};

export default function ImpactPage() {
  return (
    <PillarPage
      pillar="impact"
      title="Impact"
      signature="L'Afrique se construit."
      vision="L'ambition sociale et économique d'Origin Teranga, au service de l'entrepreneuriat et de l'éducation."
      accent="gold"
      image={images.impactGroup}
      imageAlt="Groupe d'enfants réunis sur une terrasse à Dakar"
      accentImage={images.programme.bienvenue}
      accentImageAlt="Communauté locale accueillant des visiteurs les bras levés"
      objectifs={[
        "Soutenir l'entrepreneuriat et les projets à impact",
        "Accompagner l'éducation et la transmission des savoirs",
        "Construire des partenariats durables pour l'avenir du continent",
      ]}
    />
  );
}

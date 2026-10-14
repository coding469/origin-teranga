import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Expériences | Origin Teranga",
  description:
    "L'Afrique se vit : des temps forts vécus en immersion toute l'année — culture, sport, innovation et rencontres.",
};

export default function ExperiencesPage() {
  return (
    <PillarPage
      pillar="experiences"
      title="Expériences"
      signature="L'Afrique se vit."
      vision="Des temps forts vécus en immersion toute l'année — culture, sport, innovation et rencontres."
      accent="gold"
      image={images.univers.sport}
      imageAlt="Coureurs en pleine course, effet de mouvement"
      accentImage={images.univers.tic}
      accentImageAlt="Équipe travaillant sur un projet technologique"
      objectifs={[
        "Proposer un agenda d'expériences immersives toute l'année",
        "Mettre en valeur le sport, le bien-être et la créativité africaine",
        "Créer des rencontres entre générations et horizons",
      ]}
    />
  );
}

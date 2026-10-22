import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Festival | Origin Teranga",
  description:
    "L'Afrique se célèbre : le grand rendez-vous qui célèbre les cultures africaines à travers la musique, les jeux, la danse, les arts et les rencontres.",
};

export default function FestivalPage() {
  return (
    <PillarPage
      pillar="festival"
      title="Festival"
      signature="L'Afrique se célèbre."
      vision="Le grand rendez-vous qui célèbre les cultures africaines à travers la musique, les jeux, la danse, les arts et les rencontres."
      image={images.pillars.festivalMain}
      imageAlt="Foule en liesse lors d'un concert de festival"
      accentImage={images.pillars.festivalAccent}
      accentImageAlt="Portrait stylisé lors d'un événement Origin Teranga"
      objectifs={[
        "Célébrer la richesse et la diversité des cultures africaines",
        "Réunir artistes, créateurs et publics autour d'une programmation ambitieuse",
        "Faire rayonner le Sénégal et l'Afrique sur la scène internationale",
      ]}
    />
  );
}

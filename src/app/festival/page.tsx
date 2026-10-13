import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Festival | Origin Teranga",
  description:
    "L'Afrique se célèbre : le grand rendez-vous qui célèbre les cultures africaines à travers la musique, la danse, les arts et les rencontres.",
};

export default function FestivalPage() {
  return (
    <PillarPage
      pillar="festival"
      title="Festival"
      signature="L'Afrique se célèbre."
      vision="Le grand rendez-vous qui célèbre les cultures africaines à travers la musique, la danse, les arts et les rencontres."
      image={images.activites.party}
      imageAlt="Foule en liesse lors d'un concert de nuit"
      objectifs={[
        "Célébrer la richesse et la diversité des cultures africaines",
        "Réunir artistes, créateurs et publics autour d'une programmation ambitieuse",
        "Faire rayonner le Sénégal et l'Afrique sur la scène internationale",
      ]}
    />
  );
}

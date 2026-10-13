import type { Metadata } from "next";
import PillarPage from "@/components/PillarPage";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Communauté | Origin Teranga",
  description:
    "L'Afrique se rassemble : rassembler celles et ceux qui portent le projet Origin Teranga, en Afrique et dans la diaspora.",
};

export default function CommunautePage() {
  return (
    <PillarPage
      pillar="communaute"
      title="Communauté"
      signature="L'Afrique se rassemble."
      vision="Rassembler celles et ceux qui portent le projet Origin Teranga, en Afrique et dans la diaspora."
      image={images.histoire.transmission}
      imageAlt="Transmission intergénérationnelle lors d'un moment de partage"
      objectifs={[
        "Fédérer une communauté engagée en Afrique et dans la diaspora",
        "Développer un réseau d'ambassadeurs et de bénévoles",
        "Créer des liens durables entre les membres de la communauté",
      ]}
    />
  );
}

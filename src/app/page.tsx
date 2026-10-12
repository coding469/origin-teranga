import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Activites from "@/components/Activites";
import Programme from "@/components/Programme";
import BattleAfroBanner from "@/components/BattleAfroBanner";
import Histoire from "@/components/Histoire";
import Univers from "@/components/Univers";
import Partenaires from "@/components/Partenaires";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />
      <Hero />
      <Manifesto />
      <Activites />
      <Programme />
      <BattleAfroBanner />
      <Histoire />
      <Univers />
      <Partenaires />
      <Newsletter />
      <Footer />
    </div>
  );
  
}

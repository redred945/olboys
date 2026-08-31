import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Bandeau from "@/components/Bandeau";
import Adhesion from "@/components/Adhesion";
import CarteMembre from "@/components/CarteMembre";
import Avantages from "@/components/Avantages";
import Chiffres from "@/components/Chiffres";
import Tribune from "@/components/Tribune";
import Boutique from "@/components/Boutique";
import Contact from "@/components/Contact";
import Final from "@/components/Final";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="haut">
        <Hero />
        <Bandeau />
        <Adhesion />
        <CarteMembre />
        <Avantages />
        <Chiffres />
        <Tribune />
        <Boutique />
        <Contact />
        <Final />
      </main>
      <Footer />
    </>
  );
}

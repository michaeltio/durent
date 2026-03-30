import CtaSection from "@/sections/ctasection";
import Features from "@/sections/features";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import { Marquee } from "@/sections/marquee";
import Navbar from "@/sections/navbar";
import Showcase from "@/sections/showcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Marquee />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import NationalAgenda from "@/components/transformation/NationalAgenda";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const NationalAgendaPage = () => {
  useEffect(() => {
    document.title = "National Agenda | Transformation Fund";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero />
      <main id="main-content">
        <NationalAgenda />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NationalAgendaPage;

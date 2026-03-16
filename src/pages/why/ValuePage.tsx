import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import ValueProposition from "@/components/transformation/ValueProposition";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const ValuePage = () => {
  useEffect(() => {
    document.title = "Value Proposition | Transformation Fund";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero />
      <main id="main-content">
        <ValueProposition />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ValuePage;

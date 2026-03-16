import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import PolicyChoice from "@/components/transformation/PolicyChoice";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const PolicyChoicePage = () => {
  useEffect(() => {
    document.title = "Policy Choice | Transformation Fund";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero />
      <main id="main-content">
        <PolicyChoice />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PolicyChoicePage;

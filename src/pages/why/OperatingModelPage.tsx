import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import OperatingModel from "@/components/transformation/OperatingModel";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const OperatingModelPage = () => {
  useEffect(() => {
    document.title = "Operating Model | Transformation Fund";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero />
      <main id="main-content">
        <OperatingModel />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default OperatingModelPage;

import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import OperatingModel from "@/components/transformation/OperatingModel";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const OperatingModelPage = () => {
  useSEO({
    title: "Operating Model",
    description: "How the Transformation Fund operates and delivers impact through its digital-first, data-driven platform and governance structure.",
    path: "/why/operating-model",
  });

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

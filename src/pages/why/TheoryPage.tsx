import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import TheoryOfChange from "@/components/transformation/TheoryOfChange";
import Footer from "@/components/transformation/Footer";
import ScrollToTop from "@/components/transformation/ScrollToTop";

const TheoryPage = () => {
  useEffect(() => {
    document.title = "Theory of Change | Transformation Fund";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero />
      <main id="main-content">
        <TheoryOfChange />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TheoryPage;

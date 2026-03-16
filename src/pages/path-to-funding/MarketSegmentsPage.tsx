import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import MarketSegmentsContent from "@/components/path-to-funding/MarketSegmentsContent";
import MarketSegmentsHero from "@/components/path-to-funding/MarketSegmentsHero";

const MarketSegmentsPage = () => {
  useSEO({
    title: "Market Segments",
    description: "Priority sectors and market foundations for the Transformation Fund including renewable energy, mining services, agro-processing, ICT, and manufacturing.",
    path: "/eligibility/market-segments",
  });
  return (
    <div className="min-h-screen bg-background">
      <PhakamaniNavbar />

      <main className="pt-[180px] lg:pt-[210px]">
        <MarketSegmentsHero />
        <MarketSegmentsContent />
      </main>

      <Footer />
    </div>
  );
};

export default MarketSegmentsPage;

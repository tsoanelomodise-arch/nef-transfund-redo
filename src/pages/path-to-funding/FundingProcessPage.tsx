import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import FundingProcessContent from "@/components/path-to-funding/FundingProcessContent";

const FundingProcessPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PhakamaniNavbar />

      <main className="pt-[180px] lg:pt-[210px]">
        {/* Main Content - Full width section */}
        <FundingProcessContent />
      </main>

      <Footer />
    </div>
  );
};

export default FundingProcessPage;

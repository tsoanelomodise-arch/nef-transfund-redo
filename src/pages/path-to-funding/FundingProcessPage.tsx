import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import FundingProcessContent from "@/components/path-to-funding/FundingProcessContent";

const FundingProcessPage = () => {
  useSEO({
    title: "Funding Process",
    description: "Understand the 8-stage Transformation Fund process from project initiation through due diligence, approval, and operations handover.",
    path: "/eligibility/process",
  });
  return (
    <div className="min-h-screen bg-gray-50">
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

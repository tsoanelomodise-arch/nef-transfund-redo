import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import GovernanceContent from "@/components/investors/GovernanceContent";

const GovernancePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PhakamaniNavbar />

      <main className="pt-[180px] lg:pt-[210px]">
        {/* Main Content */}
        <GovernanceContent />
      </main>

      <Footer />
    </div>
  );
};

export default GovernancePage;

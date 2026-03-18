import { FileText, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";

const resources = [
  {
    id: "tf-document",
    title: "TF Document",
    description: "Comprehensive Transformation Fund documentation with detailed information about the fund's structure, objectives, and implementation guidelines.",
    fileName: "TransformationFundDocument_v2.4_28Sept25.pdf",
    path: "/resources/TransformationFundDocument_v2.4_28Sept25.pdf",
    version: "v2.4",
    date: "28 Sept 2025",
  },
  {
    id: "tf-executive-summary",
    title: "TF Executive Summary",
    description: "A concise executive summary of the Transformation Fund, providing an overview of key objectives, strategies, and expected outcomes.",
    fileName: "Transformation_Fund_Executive_Summary_v1_29Sept.pdf",
    path: "/resources/Transformation_Fund_Executive_Summary_v1_29Sept.pdf",
    version: "v1",
    date: "29 Sept 2025",
  },
];

const Resources = () => {
  useSEO({
    title: "Resources",
    description: "Download Transformation Fund documents and resources including the comprehensive fund document and executive summary.",
    path: "/resources",
  });
  return (
    <div className="min-h-screen bg-white pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      
      <main>
        {/* Hero Section */}
        <section className="phakamani-hero-bg py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-10">
            <div className="max-w-3xl">
              
              <div className="w-[60px] h-1 bg-black mb-4" />
              <h1 className="phakamani-headline mb-6">
                Download <span className="text-[#00703C]">Resources</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Access important documents and resources about the Transformation Fund. 
                Download our comprehensive documentation to learn more about funding opportunities and application processes.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Resources;

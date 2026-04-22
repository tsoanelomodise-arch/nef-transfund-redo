import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { FileText } from "lucide-react";

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
              <div className="mt-8">
                <a
                  href="/resources/view-tf-framework.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#00703C] hover:bg-[#005c30] text-white font-bold px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  TF Framework (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Resources;

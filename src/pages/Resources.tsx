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

        {/* Resources List */}
        <section className="py-10 bg-white">
          <div className="max-w-[1400px] mx-auto px-10">
            <div className="w-[60px] h-1 bg-black mb-4" />
            <h2 className="phakamani-section-title mb-10">Available Documents</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-[transform,box-shadow] duration-300 will-change-transform [transform:translateZ(0)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#00703C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-black group-hover:text-[#00703C] transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00703C] transition-colors" />
                      </div>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="bg-gray-200 px-2 py-1 rounded font-medium">{resource.version}</span>
                        <span>{resource.date}</span>
                        <span className="text-[#00703C] font-medium">PDF</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;

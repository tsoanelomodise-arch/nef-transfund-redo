import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";

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

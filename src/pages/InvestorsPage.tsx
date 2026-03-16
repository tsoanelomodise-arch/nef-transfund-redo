import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import InvestorsContent from "@/components/investors/InvestorsContent";

const InvestorsPage = () => {
  useSEO({
    title: "Capitalisation",
    description: "Resource mobilisation and investment channels for the Transformation Fund. Explore EEIP, enterprise development, DFI partnerships, and innovative financing.",
    path: "/investors",
  });
  return (
    <div className="min-h-screen bg-background">
      <PhakamaniNavbar />

      <main className="pt-[180px] lg:pt-[210px]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10">
          {/* Title */}
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--ptf-heading))] mb-2">
            Capitalisation
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-medium text-[hsl(var(--ptf-accent))]">
            Resource mobilisation and capitalisation
          </h2>
        </section>

        {/* Main Content */}
        <InvestorsContent />
      </main>

      <Footer />
    </div>
  );
};

export default InvestorsPage;

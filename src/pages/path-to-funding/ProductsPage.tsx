import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import ProductsContent from "@/components/path-to-funding/ProductsContent";

const ProductsPage = () => {
  useSEO({
    title: "Funding Products",
    description: "Explore Transformation Fund products including startup grants, growth loans, equity instruments, and blended finance for South African businesses.",
    path: "/eligibility/products",
  });
  return (
    <div className="min-h-screen bg-background">
      <PhakamaniNavbar />

      <main className="pt-[180px] lg:pt-[210px]">
        {/* Main Content */}
        <ProductsContent />
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;

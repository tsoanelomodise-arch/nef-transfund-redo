import { memo, useMemo } from "react";
import smmeFundImg from "@/assets/products/smme-fund.png";
import designatedGroupsImg from "@/assets/products/designated-groups.png";
import townshipRuralImg from "@/assets/products/township-rural.jpg";
import ventureCapitalImg from "@/assets/products/venture-capital.jpg";
import strategicProjectsImg from "@/assets/products/strategic-projects.jpg";

const ProductCard = memo(({ title, description, image }: { title: string; description: string; image: string }) => (
  <div className="inst-card group" role="listitem">
    <div className="relative z-10">
      <h3 className="text-xl font-bold mb-3 leading-tight">{title}</h3>
      <p className="text-sm opacity-90 leading-relaxed">{description}</p>
    </div>
    <div 
      className="card-visual mt-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: title === "SMME Fund" ? 'center 30%' : 'center top',
      }}
      role="img"
      aria-label={title}
    ></div>
  </div>
));
ProductCard.displayName = "ProductCard";

const ProductsSection = memo(() => {
  const products = useMemo(() => [
    {
      title: "SMME Fund",
      description: "Providing Entrepreneurship, Procurement & Franchise Finance to Black entrepreneurs.",
      image: smmeFundImg,
    },
    {
      title: "Designated Groups",
      description: "Focused on Women, Youth, and Persons with Disabilities (50% target ownership).",
      image: designatedGroupsImg,
    },
    {
      title: "Township & Rural",
      description: "Supporting development through New Ventures, Acquisition, and Expansion.",
      image: townshipRuralImg,
    },
    {
      title: "Venture Capital",
      description: "Funding for New Ventures, Acquisition, Project Finance, and Expansion.",
      image: ventureCapitalImg,
    },
    {
      title: "Strategic Projects",
      description: "Projects delivering measurable, long-term socio-economic impact and enabling transformation.",
      image: strategicProjectsImg,
    },
  ], []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-10">
        {/* Section Intro */}
        <div className="text-center mb-10 max-w-[800px] mx-auto">
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="phakamani-section-title mb-4">Discover our Products</h2>
          <p className="text-gray-500 text-lg">
            Whatever your size, we offer funds tailored to grow revenue, create jobs, and foster inclusion.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="inst-grid" role="list">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
});

ProductsSection.displayName = "ProductsSection";

export default ProductsSection;

const products = [
  {
    title: "SMME Fund",
    description: "Providing Entrepreneurship, Procurement & Franchise Finance to Black entrepreneurs.",
    image: "/images/test-home/product-smme.png",
  },
  {
    title: "Designated Groups",
    description: "Focused on Women, Youth, and Persons with Disabilities (50% target ownership).",
    image: "/images/test-home/product-designated.png",
  },
  {
    title: "Township & Rural",
    description: "Supporting development through New Ventures, Acquisition, and Expansion.",
    image: "/images/test-home/product-township.jpeg",
  },
  {
    title: "Venture Capital",
    description: "Funding for New Ventures, Acquisition, Project Finance, and Expansion.",
    image: "/images/test-home/product-venture.jpeg",
  },
  {
    title: "Strategic Projects",
    description: "Projects delivering measurable, long-term socio-economic impact and enabling transformation.",
    image: "/images/test-home/product-strategic.png",
  },
];

import { memo } from "react";

const TestHomeProductsSection = memo(() => {
  return (
    <section className="py-10 pb-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <span className="text-xs font-bold tracking-widest text-[#666666] uppercase">
          COMPANY
        </span>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-8">
          Discover our Products
        </h2>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-black text-white p-8 flex flex-col h-full"
            >
              <h3 className="text-[1.2rem] font-extrabold uppercase leading-tight mb-4 pb-4 border-b border-white/20">
                {product.title}
              </h3>
              <p className="text-[0.85rem] leading-relaxed opacity-90 flex-grow">
                {product.description}
              </p>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto mt-auto pt-4"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-8">
          <h3 className="text-xl font-extrabold uppercase tracking-tight text-[#222222] mb-4">
            "Whatever your size"
          </h3>
          <p className="text-base text-[#222222]">
            We offer funds tailored to grow revenue, create jobs, and foster inclusion.
          </p>
        </div>
      </div>
    </section>
  );
});

TestHomeProductsSection.displayName = "TestHomeProductsSection";

export default TestHomeProductsSection;

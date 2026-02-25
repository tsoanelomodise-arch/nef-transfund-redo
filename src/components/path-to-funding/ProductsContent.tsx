const products = [
  {
    number: "01",
    title: "Startup and informal business grants (capability vouchers)",
    paragraphs: [
      "Provide seed capital to early-stage and informal enterprises, disbursed in tranches tied to developmental milestones.",
      "These grants are easy to access and embedded with technical support to ensure effective use and business formalisation."
    ]
  },
  {
    number: "02",
    title: "Growth and expansion loans (performance-based debt)",
    paragraphs: [
      "Offer patient, concessionary finance to established MSMEs ready to scale.",
      "Structured around operational performance rather than rigid collateral requirements, these loans are released in stages linked to capability improvements and business outcomes, with mentorship and monitoring built in."
    ]
  },
  {
    number: "03",
    title: "Equity and co-investment instruments",
    paragraphs: [
      "Provide ownership capital to high-growth ventures and strategic industrial projects, particularly those led by Black entrepreneurs.",
      "These instruments allow the Fund to take equity stakes, co-invest with private partners, and structure broad-based ownership models that include communities and workers.",
      "Technical support and milestone-based disbursements ensure that equity investments drive both commercial success and transformation impact."
    ]
  },
  {
    number: "04",
    title: "Blended finance and guarantee instruments",
    paragraphs: [
      "Combine public and private capital to de-risk lending to underserved enterprises.",
      "These include partial credit guarantees, subsidised credit lines, and risk-sharing facilities that encourage commercial lenders to extend finance to MSMEs.",
      "Guarantees are tied to capability milestones and integrated with technical support, ensuring that risk-sharing leads to sustainable business growth."
    ]
  }
];

const ProductsContent = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      {/* Header */}
      <header className="pt-10 md:pt-14 pb-8 md:pb-10 max-w-[800px]">
        <span className="block text-sm font-bold uppercase tracking-[2px] text-[#555555] mb-4">
          Transformation Fund
        </span>
        <div className="w-[60px] h-1 bg-black mb-4" />
        <h1 className="text-3xl md:text-[3rem] font-bold uppercase text-black leading-[1.1] mb-6">
          Products
        </h1>
        <p className="text-lg text-[#555555] font-light max-w-[90%]">
          To meet the diverse needs of its target market, the Transformation Fund offers a suite of investment products that combine financial capital with embedded capability support. These instruments are designed to be flexible, performance-linked, and tailored to the realities of underserved enterprises, addressing gaps left by traditional funding models.
        </p>
      </header>

      {/* Products Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 md:pb-14">
        {products.map((product, index) => (
          <article
            key={index}
            className="bg-[#f8f8f8] p-8 md:p-10 flex flex-col border-l-4 border-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="w-[50px] h-[50px] bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
              {product.number}
            </div>
            <h2 className="text-2xl font-semibold text-black capitalize leading-[1.3] mb-4">
              {product.title}
            </h2>
            <div>
              {product.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-base text-[#555555] mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default ProductsContent;

import whyCard01Img from "@/assets/why-card-01.jpg";
import whyCard02Img from "@/assets/why-card-02.jpg";

const cards = [
  {
    number: "01",
    title: "Increase access to finance for Black Enterprises",
    paragraphs: [
      "Provide affordable, appropriate funding for Black-owned and managed businesses, especially those underserved by commercial lenders, including start-ups, scale-ups, and distressed firms."
    ],
    image: whyCard01Img
  },
  {
    number: "02",
    title: "Mobilise public-private investment for transformation",
    paragraphs: [
      "Pool resources from private corporations, DFIs, and donors into a large fund dedicated to B-BBEE, with voluntary contributions incentivised through B-BBEE scoring."
    ],
    image: whyCard02Img
  },
  {
    number: "03",
    title: "Coordinate and enhance ESD impact",
    paragraphs: [
      "Serve as a central vehicle for Enterprise and Supplier Development (ESD), by addressing the current shortcomings of fragmented corporate initiatives. Instead of companies running numerous disparate projects, they can channel their ESD budgets into the Fund—either fully or partially—where resources are professionally managed and aligned with national priorities."
    ],
    image: null
  },
  {
    number: "04",
    title: "Provide non-financial support and mentorship",
    paragraphs: [
      "Offer business development services including planning, feasibility studies, accreditation, mentorship, and training to address common SMME challenges."
    ],
    image: null
  },
  {
    number: "05",
    title: "Promote Inclusive growth and job creation",
    paragraphs: [
      "Promotes inclusive growth by supporting job creation in labour-intensive sectors and stimulating local economies, while actively prioritising Black women, youth, and people with disabilities as business owners and beneficiaries to reduce inequality."
    ],
    image: null
  },
  {
    number: "06",
    title: "Facilitate structural transformation of the economy",
    paragraphs: [
      "Develop Black industrialists, broaden ownership in strategic sectors, and deepen local supply chains in line with South Africa's industrial policy."
    ],
    image: null
  }
];

const WhyPillarsSection = () => {
  return (
    <section id="why-pillars" className="w-full max-w-[1400px] mx-auto py-10 md:py-14 px-5 md:px-10 bg-white">
      {/* Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-10 md:mb-14 border-b-2 border-[#111111] pb-8">
        <div></div>
        <div className="text-lg font-light text-[#333333]">
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-10 lg:gap-y-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col border-l border-[#e0e0e0] pl-6 pb-3 transition-all duration-300 hover:border-l-4 hover:border-black"
          >
            <div>
              <span className="inline-block text-sm font-extrabold text-black bg-[#f4f4f4] px-2 py-1 mb-4">
                {card.number}
              </span>
              <h3 className="text-xl font-bold uppercase leading-[1.3] tracking-[-0.02em] text-black mb-4">
                {card.title}
              </h3>
              {card.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className={`text-[0.95rem] text-[#555555] ${pIndex > 0 ? 'mt-3' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {card.image && (
              <div className="w-full h-[220px] md:h-[180px] lg:h-[220px] mt-8 overflow-hidden">
                <img loading="lazy" decoding="async" 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPillarsSection;

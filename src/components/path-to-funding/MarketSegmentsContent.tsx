const foundations = [
  {
    title: "Ownership",
    description: "We support black-owned businesses, including enterprises owned by women, youth and persons with disabilities, with a strong emphasis on broad-based and community-linked participation."
  },
  {
    title: "Geographic focus",
    description: "We prioritise enterprises based in rural areas and townships, recognising their potential to drive local industrial activity, job creation and inclusive development."
  },
  {
    title: "Enterprise stage",
    description: "We support both early-stage and growth-stage enterprises, providing tailored financing and support to help businesses move from concept to scale and into sustainable, competitive operations."
  }
];


const sectors = [
  {
    title: "Renewable energy",
    icon: "/images/sectors/renewable-energy.gif",
    paragraphs: [
      "We support renewable and clean energy value chains, including solar, wind and hydro-electric generation, as well as biofuels, biomass and biogas projects that contribute to energy security and a low-carbon economy."
    ]
  },
  {
    title: "Mining services",
    icon: "/images/sectors/mining-services.png",
    paragraphs: [
      "Our investments extend beyond extraction to include mining services, mineral beneficiation and services incidental to mining, strengthening local value addition and industrial capability."
    ]
  },
  {
    title: "Agro-processing",
    icon: "/images/sectors/agro-processing.png",
    paragraphs: [
      "We prioritise agro-processing and food manufacturing, alongside chemicals processing and biofuels, to deepen local production, improve food security and expand export-ready industries."
    ]
  },
  {
    title: "Information & communication technology",
    icon: "/images/sectors/ict.png",
    paragraphs: [
      "The Transformation Fund supports the development and expansion of ICT and telecoms infrastructure that enables digital connectivity, innovation and inclusive participation in the digital economy."
    ]
  },
  {
    title: "Infrastructure",
    icon: "/images/sectors/infrastructure.png",
    paragraphs: [
      "The Transformation Fund invests in enabling infrastructure, including tourism infrastructure, bulk services and other specialised buildings that support productive economic activity.",
      "These investments create the foundations for growth, job creation and sustainable local development."
    ]
  },
  {
    title: "Manufacturing",
    icon: "/images/sectors/manufacturing.png",
    paragraphs: [
      "The Fund supports a wide range of manufacturing activities, including textiles, consumables, automotive components, batteries and electric accumulators, enabling industrial diversification and competitiveness."
    ]
  },
  {
    title: "Services and business process outsourcing",
    icon: "/images/sectors/services-bpo.png",
    paragraphs: [
      "The Transformation Fund supports services-led growth through business process outsourcing, call centre and data analytics services, alongside investment in healthcare infrastructure.",
      "It also focuses on digital industry commercialisation, enabling innovative digital solutions to scale into competitive, market-ready enterprises."
    ]
  }
];

const MarketSegmentsContent = () => {
  return (
    <div>
      {/* Intro Section */}
      <section className="bg-white pt-6 pb-8 md:pb-10">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="max-w-[700px]">
            <p className="text-lg text-[#333333] font-normal mb-4">
              The Transformation Fund is designed to support enterprises that play a critical role in driving inclusive, productive economic growth.
            </p>
            <p className="text-[0.95rem] font-light text-[#555555]">
              Our focus is on businesses and entrepreneurs who have historically faced barriers to finance, capability and market access.
            </p>
          </div>
        </div>
      </section>

      {/* Foundations Section */}
      <section className="bg-white pb-10 md:pb-14">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foundations.map((foundation, index) => (
              <article
                key={index}
                className="bg-[#F9F9F9] p-8 md:p-10 border-l-4 border-black h-full"
              >
                <h3 className="text-xl font-extrabold uppercase tracking-[-0.02em] text-black mb-4">
                  {foundation.title}
                </h3>
                <p className="text-[0.95rem] font-light text-[#555555] mb-0">
                  {foundation.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Sectors Section */}
      <section className="bg-[#F5F5F5] py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="max-w-[700px] mb-8">
            <span className="block text-xs font-semibold tracking-[0.1em] text-[#888888] mb-4 uppercase">
              Investment Areas
            </span>
            <h2 className="text-2xl md:text-[2.5rem] font-extrabold uppercase tracking-[-0.02em] leading-[1.1] text-black mb-4">
              Priority sectors
            </h2>
            <p className="text-[0.95rem] font-light text-[#555555] mb-4">
              Our investments focus on productive, future-focused sectors that strengthen industrial capacity, unlock new markets and drive inclusive economic growth.
            </p>
            <p className="text-[0.95rem] font-light text-[#555555]">
              Our sector focus reflects national priorities, sustainability imperatives and opportunities for scalable enterprise development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 h-full flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
              >
                <div className="w-10 h-1 bg-black mb-5" />
                <img src={sector.icon} alt={sector.title} className="w-28 h-28 object-contain mb-5" />
                <h4 className="text-lg font-bold text-black mb-4">
                  {sector.title}
                </h4>
                {sector.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[0.95rem] font-light text-[#555555] mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketSegmentsContent;

const theoryItems = [
  {
    id: "pooling",
    title: "Pooling and targeting",
    color: "#E31C23",
    paragraphs: [
      "The Transformation Fund brings together fragmented funding mechanisms from government, the private sector and development finance institutions (DFIs) into one coordinated platform. Consolidation of these resources will help to eliminate unnecessary duplication which has been ineffective in achieving the desired transformation outcomes. This coordinated approach is designed to ensure that the allocated resources achieve greater impact and that more designated beneficiaries can participate meaningfully into the mainstream economy.",
      "Unlike current initiatives, the Fund will target and focus on high-impact economic sectors and value chains that can result in meaningful change. This will ensure that critical funding reaches target beneficiaries, most of which are black-owned businesses, women, youth and rural entrepreneurs who can make a lasting contribution to South Africa's inclusive economy."
    ]
  },
  {
    id: "capital",
    title: "Capital and capability",
    color: "#0000FE",
    paragraphs: [
      "The primary purpose of the Fund is to provide businesses with the necessary finance they need to grow and build sustainable operations. This funding can take the form of grants, loans or equity, depending on the needs of the enterprise.",
      "However, the Fund goes beyond providing capital. It also capacities entrepreneurs with the technical skills, tools and support they need to become more competitive. These include training, mentorship, business management tools and access to markets by connecting businesses with customers, suppliers and partners both locally and internationally.",
      "This holistic approach will ensure that black-owned enterprises are both financially and technically resourced to become resilient and successful, in order to create job opportunities for many people in the country."
    ]
  },
  {
    id: "outcome",
    title: "Outcome-based support",
    color: "#FEB81C",
    paragraphs: [
      "The Fund will measure success through the real impact it creates, rather than simply tracking compliance or how much money was disbursed. It will focus on tangible outcomes such as business growth, job creation, improved competitiveness and the meaningful participation of women, youth and rural communities in the economy.",
      "The Fund will also make use of a monitoring system called the Transformation Index, which will track progress and ensure accountability. This Index will measure the impact of the Fund's interventions and help ensure that every investment delivers real transformation. Regular performance monitoring and data tracking will support transparency and show how businesses and communities are benefiting, contributing to a more equitable economy."
    ]
  },
  {
    id: "network",
    title: "Network effects",
    color: "#00703C",
    paragraphs: [
      "The Transformation Fund will leverage the power of collaborations and partnerships to maximise impact. It will bring together beneficiaries, corporates, government, development finance institutions (DFIs) and civil society into a connected ecosystem. These partnerships will enable businesses to share knowledge, access opportunities and strengthen their position within value chains.",
      "Through these collaborations, the Fund will extend its impact beyond individual businesses. It will create lasting growth, broader opportunities, and more resilient networks across the economy."
    ]
  }
];

const TheoryOfChange = () => {
  return (
    <section id="theory" className="py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-10 space-y-6">
        {theoryItems.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4" style={{ color: item.color }}>{item.title}</h3>
            {item.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-500 text-lg leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TheoryOfChange;

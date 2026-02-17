const operatingItems = [
  {
    id: "capital",
    title: "Access to Capital",
    paragraphs: [
      "This pillar provides the financial engine of the model - aggregating public and private funds into a pooled transformation vehicle. The Fund deploys a mix of patient capital instruments, including concessionary debt, equity and grants, targeted at historically excluded entrepreneurs and projects. Crucially, this capital is conditional and catalytic, designed to crowd in additional investment and incentivise capability uptake."
    ]
  },
  {
    id: "capability",
    title: "Access to Capability",
    paragraphs: [
      "This pillar provides a platform-based \"capability stack\" of non-financial services that equip enterprises to use capital effectively and compete in markets. Through a hybrid digital and in-person platform, emerging businesses can access critical capabilities on demand – from business and financial management tools, technical training and mentorship, production technology and infrastructure, to compliance and quality certification support."
    ]
  },
  {
    id: "markets",
    title: "Access to Markets",
    paragraphs: [
      "Even with capital and capability, small businesses cannot thrive without reliable demand. The Access to Markets pillar therefore focuses on opening market opportunities and ensuring revenue for empowered firms. This involves both public and private sector market alignment.",
      "On the public side, the Fund will coordinate with government procurement and industrial programmes, such as sector masterplans, to plug capable small suppliers into value chains. On the private side, the model leverages buyer councils and off-take agreements – essentially convening large corporates and value-chain anchors committed to sourcing from Fund-supported enterprises."
    ]
  },
  {
    id: "index",
    title: "Transformation Index and Telemetry",
    paragraphs: [
      "Cutting across all the three functional pillars is a robust data backbone – the Transformation Index and telemetry system – which continuously measures, aggregates and reports on transformation outcomes. Every firm engaged through the Fund and even decentralised initiatives, will (auto) feed into a central data repository capturing metrics such as: capability uptake in the form of metrics such as percentage of workflows digitised and quality compliance rates; financial performance data such as revenue growth, and profit margins; risk indicators such as probability of default, and credit spread movements; market outcomes indicators such as export volumes, on-time delivery and defect rates; and inclusion outcomes such as jobs created, demographics of ownership, and geographic reach.",
      "These indicators are synthesized into a Transformation Index, an innovative dashboard that provides a composite view of how effectively capital, capability, and market access are translating into tangible developmental results."
    ]
  }
];

const OperatingModel = () => {
  return (
    <section id="operating-model" className="py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-10 space-y-6">
        {operatingItems.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
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

export default OperatingModel;

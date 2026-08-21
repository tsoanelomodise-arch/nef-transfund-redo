const stages = [
  {
    step: "Stage 0",
    title: "Initiation and sponsor alignment",
    paragraphs: [
      "You start by submitting a formal funding request. At this stage, sponsorship is confirmed, governance arrangements are put in place, and the relevant regulatory pathways for your project are identified."
    ]
  },
  {
    step: "Assessment",
    title: "Pre-investment assessment",
    paragraphs: [
      "Your proposal is initially assessed to confirm strategic alignment, readiness and potential impact before moving into detailed development."
    ]
  },
  {
    step: "Stage 1",
    title: "Feasibility and information memorandum",
    paragraphs: [
      "A feasibility study and Information Memorandum are developed, setting out the project description, market analysis and an initial financial model.",
      "Proposals are reviewed by an Early Review Committee."
    ]
  },
  {
    step: "Stage 2",
    title: "Concept, site and process design",
    paragraphs: [
      "The project concept is refined through site selection, infrastructure confirmation and definition of production technology.",
      "A comprehensive concept design pack is prepared, supported by full technical, market, financial and risk due diligence."
    ]
  },
  {
    step: "Stage 3",
    title: "Procurement and EPC strategy",
    paragraphs: [
      "Equipment specifications are finalised, suppliers identified and the contracting model confirmed.",
      "Engineering, Procurement and Construction (EPC) and Technical Assistance (TA) agreements are negotiated, followed by credit approval and contracting."
    ]
  },
  {
    step: "Stage 4",
    title: "Financing and approvals",
    paragraphs: [
      "The capital structure is finalised, funding sources secured and all regulatory approvals obtained.",
      "The financial model is refined, enabling disbursement and ongoing monitoring."
    ]
  },
  {
    step: "Stage 5",
    title: "Construction and commissioning",
    paragraphs: [
      "Construction and commissioning are managed in line with quality, health and safety standards.",
      "Operational and maintenance documentation is prepared to support a smooth transition to operations."
    ]
  },
  {
    step: "Stage 6",
    title: "Operations readiness and handover",
    paragraphs: [
      "The final stage focuses on operational readiness, including management and staffing, establishment of marketing and distribution channels, and the setting of performance KPIs and reporting systems to ensure sustainable operations."
    ]
  }
];

const FundingProcessContent = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-5 py-10 md:py-14 bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="mb-8 md:mb-12 max-w-[800px]">
        <div className="w-[60px] h-1 bg-black rounded-full mb-5" />
        <h1 className="text-4xl md:text-[48px] font-extrabold leading-[1.1] tracking-[-1px] mb-6 text-gray-900">
          Funding Process
        </h1>
        <p className="text-lg leading-relaxed text-gray-500 font-light max-w-[600px]">
          The Transformation Fund follows a structured, stage-gated funding process designed to ensure alignment, viability, accountability and long-term impact across the full project lifecycle.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {stages.map((stage, index) => (
          <article
            key={index}
            className="bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="mb-6 pb-5 border-b border-gray-100">
              <span className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-[1px] text-white mb-4">
                {stage.step}
              </span>
              <h3 className="text-2xl font-bold leading-[1.3] m-0 text-gray-900">
                {stage.title}
              </h3>
            </div>
            <div className="text-[15px] leading-[1.7] text-gray-500 flex-grow">
              {stage.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FundingProcessContent;

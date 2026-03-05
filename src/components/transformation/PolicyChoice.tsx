const policyItems = [
  {
    id: "funding",
    title: "Funding Sources",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
    ),
    items: [
      "Combining ESD contributions, EEIP funds, public interest commitments and government seed capital.",
      "Diverse resource collection to ensure sustainability and broad participation."
    ]
  },
  {
    id: "governance",
    title: "Governance Structure",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    ),
    items: [
      "The SPV will be governed by a Board of Directors (appointed by the Minister), plus an Oversight Committee made up of representatives from both the public and private sectors.",
      "The Fund will be separate: contributions will be held in a dedicated account, with proceeds monitored and reinvested for maximum impact."
    ]
  },
  {
    id: "investment",
    title: "Investment Approach",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
      </svg>
    ),
    items: [
      "The Fund will offer a mix of financial products like equity, debt and grants, to meet different needs.",
      "Other forms of support such as guidance, mentorship and market access will also form part of this approach.",
      "Specific focus on underserved areas, particularly township and rural enterprises.",
      "Target sectors include productive and labour-intensive areas in economic sectors."
    ]
  },
  {
    id: "tax",
    title: "Tax & Regulatory Incentives",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    items: [
      "Contributions to the Fund are mostly tax-exempt under section 56(1)(h) of the Income Tax Act.",
      "Donors may claim a deduction under section 18A once a confirmation of receipt is issued.",
      "Contributors will sign Participation Agreements with the SPV that regulate contributions and investment terms."
    ]
  },
  {
    id: "accountability",
    title: "Accountability & Measurement",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    items: [
      "A Transformation Index will be developed to measure outcomes, track inclusivity and check alignment with B-BBEE goals.",
      "The SPV will be tax-exempt, enabling funds to be fully re-invested in beneficiary enterprises.",
      "Transparency is built into the design: annual reporting on fund performance, investments and social impact."
    ]
  },
  {
    id: "policy",
    title: "Policy Alignment",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
      </svg>
    ),
    items: [
      "The Fund is based on existing B-BBEE legislation (no extra B-BBEE requirements are imposed on contributors beyond existing obligations).",
      "It also aligns with the constitutional and policy goal to correct historical economic exclusion and promote inclusive growth."
    ]
  }
];

const PolicyChoice = () => {
  return (
    <section id="policy-choice" className="py-6 md:py-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {policyItems.map((item) => (
            <div key={item.id} className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00703C] rounded-full flex items-center justify-center flex-shrink-0 mb-4 md:mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900">{item.title}</h3>
              <ul className="space-y-3">
                {item.items.map((text, index) => (
                  <li key={index} className="flex items-start text-gray-500 text-sm md:text-base leading-relaxed">
                    <span className="mr-3 text-[#00703C] font-bold">{String.fromCharCode(97 + index)}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolicyChoice;

import { Check } from "lucide-react";

const investorCards = [
  {
    number: "01",
    title: "1. Equity equivalent investment programme (EEIP) contributions",
    paragraphs: [
      "Multinational corporations unable to sell equity locally can contribute 25% of their South African operations' value to empowerment projects.",
      "The Fund offers a centralised vehicle for these contributions, replacing fragmented initiatives with a high-impact portfolio.",
      "This simplifies compliance and ensures funds are directed toward national development priorities."
    ]
  },
  {
    number: "02",
    title: "2. Enterprise and supplier development (ESD) contributions",
    paragraphs: [
      "Corporates can redirect their ESD budgets into the Fund and still receive full B-BBEE scorecard recognition.",
      "This pooled approach improves efficiency, impact, and compliance while reducing administrative burdens.",
      "Unspent ESD funds can also be absorbed, ensuring no resources go to waste."
    ]
  },
  {
    number: "03",
    title: "3. Development Finance Institutions (DFIs) and impact investors",
    paragraphs: [
      "Domestic and international DFIs can co-invest, offer credit lines, or match-fund projects aligned with the Fund's goals.",
      "Their involvement brings additional capital, technical expertise, and ESG standards.",
      "This expands the Fund's reach and strengthens its credibility and operational rigor."
    ]
  },
  {
    number: "04",
    title: "4. Donors and philanthropy",
    paragraphs: [
      "Foundations, high-net-worth individuals, and international donors can contribute grants for targeted programmes.",
      "These funds may support specific initiatives like tech accelerators or women entrepreneurship.",
      "The Fund provides a transparent and accountable structure for deploying donor capital effectively."
    ]
  },
  {
    number: "05",
    title: "5.Innovative financing and private investors",
    paragraphs: [
      "As the Fund matures, it may explore impact bonds, blended finance, or institutional investments like pension funds.",
      "These instruments can offer risk-adjusted returns while supporting social impact.",
      "This approach ensures long-term sustainability and expands the Fund's capital base."
    ]
  }
];

const featureItems = [
  {
    title: "Simplified ESD contributions",
    description: "Mid-sized firms can contribute directly to the Fund and receive full B-BBEE scorecard recognition without running complex in-house ESD programmes."
  },
  {
    title: "Pre-approved framework",
    description: "Contributions are validated under a standardised, government-endorsed framework, earning immediate compliance credit."
  },
  {
    title: "Reduced administrative burden",
    description: "This approach eliminates the overhead of managing ESD initiatives, ensuring funds are used for impactful MSME development."
  },
  {
    title: "Procurement compliance support",
    description: "Firms still meet Preferential Procurement targets, aided by the Fund's telemetry dashboard for supplier tracking and spend visibility."
  },
  {
    title: "Strategic supplier engagement",
    description: "The dashboard helps firms identify high-potential MSMEs for partnerships, enhancing supply chains and unlocking innovation."
  },
  {
    title: "Benefits beyond compliance",
    description: "Engaging diverse suppliers boosts market reach, resilience, and innovation—turning compliance into a strategic growth opportunity."
  }
];

const InvestorsContent = () => {
  return (
    <div>
      {/* Investment Channels Grid Section */}
      <section className="py-10 md:py-14 bg-[#f4f4f4]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investorCards.map((card) => (
              <div
                key={card.number}
                className="bg-white p-8 md:p-10 border border-transparent transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[#e0e0e0] hover:-translate-y-1"
              >
                <div className="w-[50px] h-[50px] bg-[#f4f4f4] rounded-full flex items-center justify-center text-2xl font-extrabold text-black mb-6">
                  {card.number}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[1px] text-[#121212] mb-4">
                  {card.title}
                </h3>
                {card.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#666666] text-[0.95rem] mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Sized Firms Section */}
      <section className="py-10 md:py-16 bg-[#7C8089]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Content */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-white/70 mb-4 block">
                About The Process
              </span>
              <div className="w-[60px] h-1 bg-white mb-4" />
              <h2 className="text-2xl md:text-[2.5rem] font-bold text-white leading-tight tracking-[-0.5px] mb-6">
                6. Special case: Mid-sized firms and ESD complexity
              </h2>
              <p className="text-[#f0f0f0] text-[0.95rem] mb-4">
                Mid-sized companies often lack capacity to run effective ESD programmes and struggle with compliance.
              </p>
              <p className="text-[#f0f0f0] text-[0.95rem] mb-4">
                The Fund offers a simplified alternative, allowing these firms to contribute and meet B-BBEE requirements.
              </p>
              <p className="text-[#f0f0f0] text-[0.95rem]">
                This unlocks underutilised ESD budgets and broadens participation in transformation efforts:
              </p>
            </div>

            {/* Right Feature List */}
            <div>
              <ul className="space-y-6">
                {featureItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="min-w-[24px] h-[24px] bg-white text-[#7C8089] flex items-center justify-center rounded-sm text-xs font-bold mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-white font-semibold mb-1">
                        {item.title}
                      </strong>
                      <span className="text-[#e0e0e0] text-[0.9rem]">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorsContent;

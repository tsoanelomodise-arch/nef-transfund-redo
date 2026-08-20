import { Check } from "lucide-react";
import digitalOversightImg from "@/assets/digital-oversight-dashboard.jpg";

const GovernanceContent = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-start">
            <div>
              <div className="w-[60px] h-1 bg-black mb-6" />
              <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-black">
                Governance and accountability framework
              </h1>
            </div>
            <div className="lg:border-l lg:border-[#e0e0e0] lg:pl-10">
              <p className="text-[#666666] text-base mb-6">
                The Transformation Fund is governed through a legally incorporated Special Purpose Vehicle (SPV), designed to ensure transparency, integrity, and alignment with national transformation goals.
              </p>
              <p className="text-[#666666] text-base mb-0">
                Its finances are ring-fenced, tax-exempt, and managed under South African law and B-BBEE regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Structure Section */}
      <section className="py-10 md:py-14 bg-[#f4f4f4]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="w-[60px] h-1 bg-black mb-4" />
          <h2 className="text-2xl md:text-[2.5rem] font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-black mb-6">
            Governance structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <article className="bg-white p-8 md:p-10 border border-transparent transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[#e0e0e0]">
              <div className="w-[50px] h-[50px] bg-black text-white text-2xl font-extrabold flex items-center justify-center mb-5">
                01
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-black mb-4">
                Board Oversight
              </h3>
              <p className="text-[#666666] text-base mb-0">
                A joint Board of Directors, comprising public and private sector representatives, will oversees the strategic direction and fiduciary responsibilities.
              </p>
            </article>

            <article className="bg-white p-8 md:p-10 border border-transparent transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[#e0e0e0]">
              <div className="w-[50px] h-[50px] bg-black text-white text-2xl font-extrabold flex items-center justify-center mb-5">
                02
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-black mb-4">
                Functional Areas
              </h3>
              <p className="text-[#666666] text-base mb-0">
                Functional areas will include investment management, financial stewardship and risk management, including impact monitoring, each with clear mandates and internal controls.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Digital Oversight Section - Dark */}
      <section className="py-10 md:py-14 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="w-full min-h-[300px] bg-[#222222] border border-[#333333] overflow-hidden">
              <img loading="lazy" decoding="async" src={digitalOversightImg} alt="Digital oversight dashboard" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-[60px] h-1 bg-white mb-6" />
              <h2 className="text-2xl md:text-[2.5rem] font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-white mb-6">
                Digital oversight
              </h2>
              <p className="text-[#aaaaaa] text-base mb-6">
                A central digital platform will enable real-time data collection from investees, feeding into an impact dashboard that tracks key metrics like jobs created and capital deployed.
              </p>
              <p className="text-[#aaaaaa] text-base mb-0">
                This system will support proactive management and transparent reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Reporting Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="w-[60px] h-1 bg-black mb-4" />
              <h2 className="text-2xl md:text-[2.5rem] font-extrabold uppercase tracking-[-0.5px] leading-[1.2] text-black mb-6">
                Public reporting
              </h2>
              <p className="text-[#666666] text-base">
                The Fund will publish annual integrated reports and quarterly updates, with stakeholder engagement through AGMs and parliamentary briefings.
              </p>
            </div>

            <div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-black text-white text-xs mr-3 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </span>
                <p className="text-[#666666] text-base mb-0">
                  A Transformation Index will aggregate impact data for public visibility and accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernanceContent;

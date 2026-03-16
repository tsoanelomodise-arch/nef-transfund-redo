import { useSEO } from "@/hooks/useSEO";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import objectivesFarmerImg from "@/assets/objectives-farmer.jpg";

const pillars = [
  {
    number: "01",
    title: "Capital",
    paragraphs: [
      "The Transformation Fund will mobilise and pool patient, transformative capital from voluntary sources into a large-scale, professionally managed vehicle dedicated to expanding black-owned and community-based enterprises.",
      "Structured as an SPV or fund-of-funds, the capital will be ring-fenced and invested in productive enterprises and entrepreneurial projects that deliver inclusive economic outcomes, addressing the significant financing gap where commercial markets often do not invest."
    ]
  },
  {
    number: "02",
    title: "Capability",
    paragraphs: [
      "Recognising that finance alone is not enough, the Transformation Fund prioritises Access to Capability (ATC) through a digital-first technical assistance platform.",
      "This provides enterprises with the skills, tools and systems needed to absorb capital effectively and meet market standards.",
      "By delivering a comprehensive \"capability stack\", including accounting, production and logistics tools, training and mentorship, the Fund strengthens productivity, creditworthiness and operational credibility, improving the long-term success of MSMEs."
    ]
  },
  {
    number: "03",
    title: "Markets",
    paragraphs: [
      "The Transformation Fund enables sustainable growth by unlocking reliable market access for supported enterprises.",
      "Through digitally driven buyer consortia, offtake agreements, supply aggregation and integration into corporate, public and export supply chains, the Fund reduces barriers to market entry.",
      "By creating predictable demand via digitally managed \"buyer councils\" and quality-assured contracts, the Fund allows firms to scale with confidence while giving buyers access to a broader, compliant and competitive supplier base."
    ]
  },
  {
    number: "04",
    title: "Telemetry",
    paragraphs: [
      "The Transformation Fund is built as a digital-first, data-driven platform with a comprehensive telemetry system that tracks performance and impact in real time.",
      "By capturing data on financial health, production, quality, delivery and jobs, and consolidating it into a Transformation Index, the Fund enables transparent, outcomes-based decision-making.",
      "This approach reduces information gaps, supports alternative credit assessment, allows real-time adjustment of support, and ensures funding is linked to measurable results."
    ]
  },
  {
    number: "05",
    title: "Governance",
    paragraphs: [
      "The Transformation Fund is underpinned by a strong governance framework that ensures integrity, transparency and strategic alignment.",
      "It will be overseen by an independent board and management team, accountable to national objectives and insulated from undue influence.",
      "Digitally enabled public reporting dashboards and a multi-stakeholder oversight council, spanning government, business, labour and civil society, will strengthen accountability, embed checks and balances, and align the Fund with global best practice in transparency and governance."
    ]
  }
];

const objectives = [
  "Promote economic transformation in order to enable meaningful participation of black people in the productive economy;",
  "Improve access to funding for majority black-owned and controlled enterprises;",
  "Empower and support majority black-owned and controlled enterprises participation in value chains across key sectors of the economy; and",
  "Mobilise financial resources from the private and public sector using B-BBEE legislation."
];

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <main>
        {/* Section: About Intro */}
        <section className="py-20 pb-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="max-w-[800px] mb-12">
              <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
                About
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111]">
                Transformation Fund
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="relative h-[320px] md:h-[400px] max-w-[500px]">
                <img
                  src="/images/hero/BakeryBack-2.png"
                  alt=""
                  className="absolute bottom-0 right-0 w-[80%] z-[1] object-contain"
                />
                <img
                  src="/images/hero/BakeryFront-2.png"
                  alt=""
                  className="absolute bottom-0 left-0 w-[70%] z-[2] object-contain"
                />
              </div>

              <div>
                <p className="text-xl font-medium text-[#111111] mb-6">
                  The Transformation Fund is a strategic instrument designed to enable coherent and efficient implementation of B-BBEE and related financing interventions, alongside complementary policy tools such as competition and public-interest commitments.
                </p>
                <p className="text-[#555555]">
                  It brings together empowerment, industrialisation and macroeconomic resilience through measurable, accountable interventions that drive inclusive economic growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Objectives */}
        <section className="py-16 md:py-20 bg-[#f4f4f4]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="min-h-[300px] overflow-hidden">
                <img 
                  src={objectivesFarmerImg} 
                  alt="Farmer harvesting produce" 
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              
              <div className="md:pl-8">
                <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
                  Goals
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111] mb-8">
                  Objectives
                </h2>
                <ul className="list-none mt-8">
                  {objectives.map((objective, index) => (
                    <li key={index} className="relative pl-10 mb-6 text-[#222222] font-medium">
                      <span className="absolute left-0 top-0 w-6 h-6 bg-[#cccccc] rounded-sm" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Method */}
        <section className="py-16 md:py-20 bg-[#5D5E60] text-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">
              <div className="border-l border-white/20 pl-8 flex flex-col justify-center">
                <h2 className="lg:hidden text-3xl font-bold uppercase tracking-[-0.5px] text-white mb-8">
                  The Method
                </h2>
                <h2 className="hidden lg:block text-[3rem] font-bold uppercase tracking-[5px] text-white" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                  METHOD
                </h2>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/30 pb-4">
                  The Method
                </h3>
                <p className="text-lg text-[#f0f0f0] mb-6">
                  The Transformation Fund adopts a deliberate, impact-driven approach that moves beyond trickle-down models and fragmented initiatives.
                </p>
                <p className="text-lg text-[#f0f0f0] mb-6">
                  It systematically and transparently empowers businesses at scale by providing capital, capabilities and market access, enabling firms to become self-sufficient, grow locally and globally, and create jobs.
                </p>
                <p className="text-lg text-[#f0f0f0] mb-0">
                  By strengthening the grassroots productive economy, the Fund complements macro-level interventions and drives inclusive growth, rising incomes and sustainable national development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Architecture */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="max-w-[800px] mb-12">
              <span className="inline-block text-sm font-bold uppercase tracking-[2px] pl-4 border-l-[3px] border-[#111111] text-[#111111] mb-4">
                Structure
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-[#111111] mb-4">
                The Architecture
              </h2>
              <p className="text-[#555555]">
                The Fund's architecture rests on five interlocking pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="border border-[#e0e0e0] p-8 bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#111111] group"
                >
                  <div className="text-[2.5rem] font-black text-[#e0e0e0] leading-none mb-4 transition-colors duration-300 group-hover:text-[#111111]">
                    {pillar.number}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-[1px] text-[#111111] mb-4">
                    {pillar.title}
                  </h3>
                  {pillar.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[0.95rem] text-[#555555] mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

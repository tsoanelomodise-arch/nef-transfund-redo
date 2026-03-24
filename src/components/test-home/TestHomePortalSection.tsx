import { memo } from "react";

const serviceItems = [
  { number: "01", title: "Check Your Eligibility" },
  { number: "02", title: "Check Your Documentation" },
  { number: "03", title: "Preparation Matters" },
];

const TestHomePortalSection = memo(() => {
  return (
    <section className="pt-6 pb-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <span className="text-xs font-bold tracking-widest text-[#666666] uppercase text-right block">
          PREPARATION IS KEY
        </span>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-4 text-right">
          Eligibility Checklist
        </h2>
        <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed mb-6 text-right">
          Saving you time and effort
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="lg:pr-8">
            {serviceItems.map((item, index) => (
              <div key={index} className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mr-6 font-bold text-sm">
                  {item.number}
                </div>
                <h4 className="text-base font-extrabold uppercase tracking-tight text-[#222222]">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>

          <div className="relative w-full" style={{ border: "4px solid #007847", padding: "16px", paddingBottom: "calc(56.25% + 16px)", background: "#007847", boxShadow: "20px 20px 0px 0px rgba(0, 120, 71, 0.2)" }}>
            <video
              controls
              preload="metadata"
              className="absolute inset-0 w-full h-full"
            >
              <source src="/videos/V3_TF_EligibilityAndDocumentChecker.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
});

TestHomePortalSection.displayName = "TestHomePortalSection";

export default TestHomePortalSection;

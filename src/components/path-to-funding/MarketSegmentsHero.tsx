const MarketSegmentsHero = () => {
  return (
    <section className="py-20 pb-24">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="mb-12 max-w-[800px]">
          <span className="inline-block text-[0.85rem] font-bold uppercase tracking-[2px] mb-4 pl-4 border-l-[3px] border-black text-black">
            capability and market access
          </span>
          <h2 className="text-[2.5rem] font-bold uppercase tracking-[-0.5px] leading-[1.2] text-black">
            Market segments we support
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image column */}
          <div className="relative h-[320px] md:h-[400px] w-full max-w-[500px] md:-mt-12">
            <img loading="lazy" decoding="async"
              src="/images/hero/Smelters_back.png"
              alt="Smelters"
              className="absolute bottom-0 right-0 w-[80%] h-auto object-cover z-[1]"
            />
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-start">
            <p className="text-xl font-medium text-black mb-6">
              The Transformation Fund is designed to support enterprises that play a critical role in driving inclusive, productive economic growth.
            </p>
            <p className="text-[0.95rem] font-light text-[#555555] mb-6">
              Our focus is on businesses and entrepreneurs who have historically faced barriers to finance, capability and market access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSegmentsHero;

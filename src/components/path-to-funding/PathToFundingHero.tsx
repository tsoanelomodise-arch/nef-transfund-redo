import React, { memo } from 'react';

interface PathToFundingHeroProps {
  onCheckEligibility: () => void;
  onCheckDocuments: () => void;
}

const PathToFundingHero: React.FC<PathToFundingHeroProps> = memo(({ onCheckEligibility, onCheckDocuments }) => {
  return (
    <header id="your-path-to-funding" className="pt-[20px] pb-[40px] phakamani-hero-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Hero Content */}
          <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">

            {/* Headline */}
            <h1 className="phakamani-headline text-black mb-6">
              Prepare before applying.
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
              We've streamlined the funding application process into simple, clear steps. 
              Check your eligibility and prepare your documents before applying.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-5 flex-wrap justify-center lg:justify-start">
              <button
                onClick={onCheckEligibility}
                className="phakamani-btn-primary"
              >
                Eligibility Checklist
              </button>
              <button
                onClick={onCheckDocuments}
                className="phakamani-btn-secondary"
              >
                Document Checklist
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="order-1 lg:order-2" aria-hidden="true">
            <div className="relative flex justify-center items-center h-[400px]">
              <div className="relative w-full h-full max-w-[520px]">
              <div className="phakamani-slide slide-seamstress active">
                  <img 
                    src="/images/path-to-funding/SeamstressBack.png" 
                    className="layer-back-seamstress"
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                  />
                  <img 
                    src="/images/path-to-funding/SeamstressFront.png" 
                    className="layer-front-seamstress"
                    alt="Seamstress entrepreneur"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

PathToFundingHero.displayName = 'PathToFundingHero';

export default PathToFundingHero;

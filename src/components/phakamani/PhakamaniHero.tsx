import { useEffect, useState, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const whyPageHeadings: Record<string, string> = {
  '/about/why': 'Why the Transformation Fund?',
  '/about/why/policy-choice': 'Policy Choice: The Transformation Fund',
  '/about/why/theory': 'Theory of Change',
  '/about/why/value': 'Value Proposition',
  '/about/why/operating-model': 'Operating Model',
  '/about/why/national-agenda': 'Advancing the National Agenda',
};

const whyPageDescriptions: Record<string, string> = {
  '/about/why': "South Africa's transformation efforts have been fragmented, compliance-driven, and insufficient to address systemic inequality. The Transformation Fund represents a bold shift: a coordinated, outcome-focused mechanism that engineers inclusive growth at scale.",
  '/about/why/policy-choice': "Recognising the limitations, the Department of Trade, Industry and Competition (the dtic) has proposed establishing a dedicated Transformation Fund managed via a Special Purpose Vehicle (SPV). Key features of the Fund include:",
  '/about/why/theory': "",
  '/about/why/value': "",
  '/about/why/operating-model': "The Transformation Fund will serve as a central platform that connects government, DFIs, corporates and civil society with businesses that need support. The Fund has been designed to deliver integrated assistance through three main streams:",
  '/about/why/national-agenda': "The Fund is designed to drive South Africa's key economic and social priorities. It will support businesses to grow, create meaningful jobs and promote equitable participation in the economy.",
};

interface PhakamaniHeroProps {
  onCheckEligibility?: () => void;
}

const PhakamaniHero = memo(({ onCheckEligibility }: PhakamaniHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on a WHY page - only show first slide there
  const isWhyPage = location.pathname.startsWith('/about/why');
  const slideCount = isWhyPage ? 1 : 5;
  const slideNames = isWhyPage ? ["Entrepreneur"] : ["Entrepreneur", "Investor", "Partner", "Collaborate", "Impact"];

  useEffect(() => {
    // Don't rotate if only one slide (WHY page)
    if (isWhyPage) return;
    
    // First slide stays longer (10s), others rotate at 5s
    const duration = currentSlide === 0 ? 10000 : 5000;
    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentSlide, isWhyPage, slideCount]);

  return (
    <header className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      {/* Full-screen background slides */}
      <div className="absolute inset-0">
        {/* FistPump Slide */}
        <div className={`absolute inset-0 transition-opacity duration-1000 bg-white ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src={isWhyPage ? "/images/hero/chicken-farmer.jpg" : "/images/hero/entrepreneur-fistbump-new.jpg"}
            className="w-full h-full object-contain"
            style={isWhyPage ? { objectPosition: '65% center' } : undefined}
            alt={isWhyPage ? "Chicken farmer holding basket of eggs" : "Two people fist-bumping"}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Investor Market Slide - Only show on non-WHY pages */}
        {!isWhyPage && (
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-white ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/images/hero/investor-market.jpg" 
              className="w-full h-full object-contain"
              alt="Woman at vibrant market stall with fresh vegetables"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {/* Partner Industrialist Slide - Only show on non-WHY pages */}
        {!isWhyPage && (
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-white ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/images/hero/partner-industrialist.jpg" 
              className="w-full h-full object-contain"
              alt="Businessman in industrial manufacturing facility"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {/* Collaborate Artisans Slide - Only show on non-WHY pages */}
        {!isWhyPage && (
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-white ${currentSlide === 3 ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/images/hero/collaborate-artisans.jpg" 
              className="w-full h-full object-contain"
              alt="Two artisans collaborating in pottery workshop"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {/* Impact Handshake Slide - Only show on non-WHY pages */}
        {!isWhyPage && (
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-white ${currentSlide === 4 ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/images/hero/impact-handshake.jpg" 
              className="w-full h-full object-contain"
              alt="Business partners shaking hands in manufacturing facility"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

      </div>

      {/* QR Code Block - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-black/10 border border-black/20 rounded-lg p-4 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-black mb-3 text-center">
            Scan to Follow Us
          </h3>
          <div className="flex justify-center">
            <img 
              src="/images/social-media-qr-code.png" 
              alt="Scan to follow us on social media" 
              className="w-24 h-24 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-end pb-32">
        <div className="max-w-[1400px] mx-auto px-10 w-full">
        {/* Why page heading - top left */}
          {isWhyPage && (
            <div className="max-w-xl">
              <h1 
                className="phakamani-headline text-black"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                {whyPageHeadings[location.pathname] || 'Transformation Fund'}
              </h1>
              {whyPageDescriptions[location.pathname] && (
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  {whyPageDescriptions[location.pathname]}
                </p>
              )}
            </div>
          )}

          {/* Home page headline */}
          {!isWhyPage && (
            <>
              <h1
                className="phakamani-headline text-white max-w-2xl" 
                style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                {currentSlide === 0 
                  ? <>Engineering an inclusive microeconomic foundation for macroeconomic growth <span className="whitespace-nowrap">and social stability</span></>
                  : currentSlide === 1
                  ? "Advancing the economic agenda"
                  : currentSlide === 2
                  ? "Where growth starts"
                  : currentSlide === 3
                  ? "Collaborate for change"
                  : "Partner in progress"
                }
              </h1>
              {currentSlide === 0 && (
                <p className="text-white/80 font-light text-lg mt-3 italic" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  This isn't just funding, it's a national movement
                </p>
              )}
              {currentSlide === 1 && (
                <p className="text-white/80 font-light text-lg mt-3 italic max-w-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  Designed to accelerate economic participation and unlock opportunity, the Transformation Fund supports sustainable growth for emerging businesses across South Africa.
                </p>
              )}
              {currentSlide === 2 && (
                <div className="text-white/80 font-light text-lg mt-3 italic max-w-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  <p>Access a suite of financial instruments designed for every stage of your business journey, from start-up to industrialist.</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Start-up and expansion capital</li>
                    <li>Acquisition of stock and tools</li>
                    <li>Business acquisitions</li>
                  </ul>
                </div>
              )}
              {currentSlide === 3 && (
                <div className="text-white/80 font-light text-lg mt-3 italic max-w-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  <p>Work with us to expand our reach and multiply our impact through strategic partnerships.</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Corporate Partnerships</li>
                    <li>Government Collaboration</li>
                    <li>Development Finance Institutions</li>
                  </ul>
                </div>
              )}
              {currentSlide === 4 && (
                <div className="text-white/80 font-light text-lg mt-3 italic max-w-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  <p>Join us in driving economic transformation through strategic investments that deliver both returns and impact.</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Co-Investment Opportunities</li>
                    <li>Impact Investment Funds</li>
                    <li>Strategic Partnership Programs</li>
                  </ul>
                </div>
              )}
            </>
          )}
          
          {/* CTA Buttons - Hide on Why pages */}
          {!isWhyPage && (
            <div className="flex gap-4 mt-6 flex-wrap">
              <Link
                to="/path-to-funding"
                className="phakamani-btn-primary"
              >
                How to Apply
              </Link>
              <button
                onClick={onCheckEligibility}
                className="phakamani-btn-primary bg-white/90 !text-black hover:bg-white shadow-lg"
              >
                Eligibility Checklist
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
});

PhakamaniHero.displayName = "PhakamaniHero";

export default PhakamaniHero;

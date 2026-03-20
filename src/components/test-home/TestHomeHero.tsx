import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/test-home/hero-slide-1.jpg",
    title: "Engineering an inclusive foundation for macroeconomic growth",
    tagline: "Purposely structured to lower the barriers to entry and reduce the costs and risks of participation in the economy for the masses of South Africans who are currently marginalised.",
  },
  {
    image: "/images/test-home/hero-slide-2.jpg",
    title: "Advancing the economic agenda",
    tagline: "Designed to accelerate economic participation and unlock opportunity, to support sustainable growth for emerging businesses across South Africa.",
  },
  {
    image: "/images/test-home/hero-slide-3.jpg",
    title: "A STRATEGIC INSTRUMENT DESIGNED TO ENABLE COORDINATED FINANCING INTERVENTIONS",
    tagline: "The Transformation Fund represents a bold shift: a coordinated, outcome-focused mechanism that engineers inclusive growth at scale.",
  },
  {
    image: "/images/hero/platform-baker.jpg",
    title: "A platform for a new economic era",
    tagline: "A platform\u2011driven approach that pools capital, builds capabilities, creates trusted digital marketplaces, and uses data to ensure accountability.",
  },
];

interface TestHomeHeroProps {
  onCheckEligibility?: () => void;
}

const TestHomeHero = memo(({ onCheckEligibility }: TestHomeHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[85vh] overflow-hidden bg-[#f0f0f0]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-[2] w-full h-full flex items-center min-h-[500px] md:min-h-[600px] lg:min-h-[85vh]">
            <div className="max-w-[1200px] mx-auto px-5 w-full">
              <div className="max-w-[650px] mr-auto text-left">
                <h1 className="text-[2.5rem] leading-[1.2] font-extrabold uppercase tracking-tight text-white mb-6 max-md:text-[1.8rem] max-md:text-center">
                  {slide.title}
                </h1>
                <p className="text-[1.2rem] font-medium text-white mb-10 max-md:text-center">
                  {slide.tagline}
                </p>
                <div className="flex gap-4 max-md:justify-center flex-wrap">
                  <Link
                    to="/eligibility"
                    className="inline-block bg-black text-white px-[30px] py-3 uppercase text-[0.8rem] font-bold border border-black transition-all hover:bg-transparent hover:text-black"
                  >
                    How to Apply
                  </Link>
                  <button
                    onClick={onCheckEligibility}
                    className="inline-block bg-black text-white px-[30px] py-3 uppercase text-[0.8rem] font-bold border border-black transition-all hover:bg-transparent hover:text-black"
                  >
                    Eligibility Checklist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Navigation */}
      <div className="absolute top-1/2 w-full flex justify-between -translate-y-1/2 z-10 px-8 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-[50px] h-[50px] rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-[50px] h-[50px] rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
});

TestHomeHero.displayName = "TestHomeHero";

export default TestHomeHero;

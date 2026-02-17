import { useState, memo } from "react";
import { Play } from "lucide-react";

const serviceItems = [
  { number: "01", title: "Status Tracking" },
  { number: "02", title: "Secure Document Upload" },
  { number: "03", title: "Guided Application Process" },
];

const TestHomePortalSection = memo(() => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="pt-6 pb-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header - full width */}
        <span className="text-xs font-bold tracking-widest text-[#666666] uppercase text-right block">
          SECURE PORTAL
        </span>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#222222] mt-2 mb-4 text-right">
          How to apply
        </h2>
        <p className="text-[0.95rem] font-light text-[#666666] leading-relaxed mb-6 text-right">
          Register, apply, and track your status through our secure portal environment.
        </p>

        {/* Bullet points + Video side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Numbered service items */}
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

          {/* YouTube embed - click to load */}
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            {showVideo ? (
              <iframe
                src="https://www.youtube.com/embed/C3yyl_4lrd4?autoplay=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group"
                aria-label="Play video"
              >
                <img
                  src={`https://img.youtube.com/vi/C3yyl_4lrd4/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="relative z-10 w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-black/90 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

TestHomePortalSection.displayName = "TestHomePortalSection";

export default TestHomePortalSection;

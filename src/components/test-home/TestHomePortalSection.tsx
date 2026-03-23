import { useState, memo, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw } from "lucide-react";
import videoThumbnail from "@/assets/video-thumbnail.png";

const serviceItems = [
  { number: "01", title: "Check Your Eligibility" },
  { number: "02", title: "Check Your Documentation" },
  { number: "03", title: "Preparation Matters" },
];

const TestHomePortalSection = memo(() => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const handleReplay = useCallback(() => {
    setVideoEnded(false);
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const loadAPI = () => {
      if ((window as any).YT?.Player) {
        createPlayer();
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    };

    const createPlayer = () => {
      if (!playerContainerRef.current) return;
      playerRef.current = new (window as any).YT.Player(playerContainerRef.current, {
        videoId: "C3yyl_4lrd4",
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, enablejsapi: 1 },
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              setVideoEnded(true);
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVideo]);

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

          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            {showVideo ? (
              <>
                <div ref={playerContainerRef} className="absolute inset-0 w-full h-full" />
                {videoEnded && (
                  <div
                    className="absolute inset-0 w-full h-full z-10 flex items-center justify-center cursor-pointer bg-black"
                    onClick={handleReplay}
                  >
                    <img
                      src={videoThumbnail}
                      alt="Video ended"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-10 w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                      <RotateCcw className="w-7 h-7 text-white" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group"
                aria-label="Play video"
              >
                <img
                  src={videoThumbnail}
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

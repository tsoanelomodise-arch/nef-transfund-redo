import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { MarketsModule } from "@/components/access/MarketsModule";
import { InterventionModal } from "@/components/access/InterventionModal";
import { VideoModal } from "@/components/access/VideoModal";
import { interventionData } from "@/data/interventions";
import { useSEO } from "@/hooks/useSEO";
import type { ModuleType } from "@/types/access";
import marketsVideoAsset from "@/assets/AccessToMarkets_P3.mp4.asset.json";

const AccessToMarketsPage = () => {
  const navigate = useNavigate();
  const [activeInterventionKey, setActiveInterventionKey] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  useSEO({
    title: "Access to Markets | Transformation Fund",
    description:
      "Access to Markets interactive platform for commercial procurement matchmaking, supplier development and market linkages.",
    path: "/access-to-markets",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveInterventionKey(null);
        setActiveVideoTitle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSwitchModule = (mod: ModuleType) => {
    if (mod === "capability") navigate("/access-to-capability");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <main className="flex-grow">
        <h1 className="sr-only">Access to Markets</h1>
        <MarketsModule
          onOpenModal={(key) => setActiveInterventionKey(key)}
          onOpenVideoModal={(title) => setActiveVideoTitle(title)}
          onSwitchModule={handleSwitchModule}
        />
      </main>

      <InterventionModal
        data={activeInterventionKey ? interventionData[activeInterventionKey] : null}
        onClose={() => setActiveInterventionKey(null)}
      />
      <VideoModal
        isOpen={!!activeVideoTitle}
        title={activeVideoTitle || "Walkthrough Video"}
        onClose={() => setActiveVideoTitle(null)}
        videoSrc={marketsVideoAsset.url}
      />

      <Footer />
    </div>
  );
};

export default AccessToMarketsPage;

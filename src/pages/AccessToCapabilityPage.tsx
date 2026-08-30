import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";
import { CapabilityModule } from "@/components/access/CapabilityModule";
import { InterventionModal } from "@/components/access/InterventionModal";
import { EligibilityModal } from "@/components/access/EligibilityModal";
import { VideoModal } from "@/components/access/VideoModal";
import { interventionData } from "@/data/interventions";
import { useSEO } from "@/hooks/useSEO";
import type { ModuleType } from "@/types/access";
import capabilityVideoAsset from "@/assets/AccessToCapacity_P2.mp4.asset.json";

const AccessToCapabilityPage = () => {
  const navigate = useNavigate();
  const [activeInterventionKey, setActiveInterventionKey] = useState<string | null>(null);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  useSEO({
    title: "Access to Capability | Transformation Fund",
    description:
      "Access to Capability interactive platform for enterprise transformation, diagnostics, mentorship and business support interventions.",
    path: "/access-to-capability",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveInterventionKey(null);
        setIsEligibilityModalOpen(false);
        setActiveVideoTitle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSwitchModule = (mod: ModuleType) => {
    if (mod === "markets") navigate("/access-to-markets");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <main className="flex-grow">
        <h1 className="sr-only">Access to Capability</h1>
        <CapabilityModule
          onOpenModal={(key) => setActiveInterventionKey(key)}
          onOpenEligibilityModal={() => setIsEligibilityModalOpen(true)}
          onOpenVideoModal={(title) => setActiveVideoTitle(title)}
          onSwitchModule={handleSwitchModule}
        />
      </main>

      <InterventionModal
        data={activeInterventionKey ? interventionData[activeInterventionKey] : null}
        onClose={() => setActiveInterventionKey(null)}
      />
      <EligibilityModal isOpen={isEligibilityModalOpen} onClose={() => setIsEligibilityModalOpen(false)} />
      <VideoModal
        isOpen={!!activeVideoTitle}
        title={activeVideoTitle || "Walkthrough Video"}
        onClose={() => setActiveVideoTitle(null)}
        videoSrc={capabilityVideoAsset.url}
      />

      <Footer />
    </div>
  );
};

export default AccessToCapabilityPage;

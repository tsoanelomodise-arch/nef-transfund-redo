import { memo, useState } from "react";
import { TfPlay } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const PortalSection = memo(() => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="bg-[#F4F4F4] py-10">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          {/* Text Content */}
          <div>
            <span className="font-mono text-[#E31C23] font-bold text-sm mb-5 block">
              SECURE PORTAL
            </span>
            <h2 className="text-5xl font-bold mb-5 tracking-tight">
              How to apply
            </h2>
            <p className="text-lg leading-relaxed text-black mb-5">
              Register, apply, and track your status through our secure portal environment.
            </p>
            <ul className="highlight-list" role="list">
              <li role="listitem">Status Tracking</li>
              <li role="listitem">Secure Document Upload</li>
              <li role="listitem">Guided Application Process</li>
            </ul>
          </div>

          {/* Video Player */}
          <div 
            className="bg-[#1a1a1a] rounded-2xl h-[450px] border border-gray-700 overflow-hidden shadow-2xl flex items-center justify-center cursor-pointer relative group"
            onClick={() => setVideoModalOpen(true)}
          >
            <video 
              src="/videos/TF_EligibilityAndDocumentChecker.mp4"
              className="w-full h-full object-cover"
              muted
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <TfPlay className="w-10 h-10 text-[#00703C] ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <DialogTitle className="sr-only">Eligibility Checker Video</DialogTitle>
          <video
            src="/videos/TF_EligibilityAndDocumentChecker.mp4"
            controls
            autoPlay
            className="w-full aspect-video"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
});

PortalSection.displayName = "PortalSection";

export default PortalSection;

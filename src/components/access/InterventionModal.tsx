import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InterventionItem } from '@/types/access';
import {
  IconAdvisory,
  IconFinancial,
  IconTechnical,
  IconSkills,
  IconIncubation,
  IconMentorship,
  IconDigital,
} from './BespokeIcons';

interface InterventionModalProps {
  data: InterventionItem | null;
  onClose: () => void;
}

const IconBriefcase = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 3.5A2.5 2.5 0 0111.5 1h1A2.5 2.5 0 0115 3.5V5h4.5A2.5 2.5 0 0122 7.5v2.75a.75.75 0 01-.75.75H14v-.5a1 1 0 00-1-1h-2a1 1 0 00-1 1v.5H2.75a.75.75 0 01-.75-.75V7.5A2.5 2.5 0 014.5 5H9V3.5zM10.5 5h3V3.5a1 1 0 00-1-1h-1a1 1 0 00-1 1V5z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M2 13.25V18.5A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-5.25a.75.75 0 00-.75-.75H14v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H2.75a.75.75 0 00-.75.75z" />
  </svg>
);

const IconLandmark = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7.5h20L12 2z" />
    <rect x="3" y="8.5" width="18" height="1.5" rx="0.5" />
    <rect x="4.5" y="11" width="2.5" height="7.5" rx="0.5" />
    <rect x="9" y="11" width="2.5" height="7.5" rx="0.5" />
    <rect x="12.5" y="11" width="2.5" height="7.5" rx="0.5" />
    <rect x="17" y="11" width="2.5" height="7.5" rx="0.5" />
    <rect x="2" y="19.5" width="20" height="2.5" rx="0.5" />
  </svg>
);

const IconGlobe = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm7.931 9h-4.07a16.74 16.74 0 00-1.258-5.32A8.016 8.016 0 0119.93 11zM12 4.07c1.077 1.944 1.83 4.316 2.054 6.93H9.946C10.17 8.386 10.923 6.014 12 4.07zM4.07 11A8.016 8.016 0 019.397 5.68 16.74 16.74 0 008.139 11H4.07zm0 2h4.069a16.74 16.74 0 001.258 5.32A8.016 8.016 0 014.07 13zm7.93 6.93c-1.077-1.944-1.83-4.316-2.054-6.93h4.108c-.224 2.614-.977 4.986-2.054 6.93zm2.603-1.61a16.74 16.74 0 001.258-5.32h4.069a8.016 8.016 0 01-5.327 5.32z" />
  </svg>
);

export const InterventionModal: React.FC<InterventionModalProps> = ({ data, onClose }) => {
  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (data) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [data]);

  const renderIcon = (title: string, iconType?: string) => {
    const t = title.toLowerCase();
    if (iconType === 'landmark' || t.includes('government') || t.includes('public sector')) {
      return <IconLandmark className="w-6 h-6 text-gray-500" />;
    }
    if (iconType === 'globe' || t.includes('export') || t.includes('global') || t.includes('trade')) {
      return <IconGlobe className="w-6 h-6 text-gray-500" />;
    }
    if (iconType === 'briefcase' || t.includes('corporate')) {
      return <IconBriefcase className="w-6 h-6 text-gray-500" />;
    }
    if (t.includes('advisory')) return <IconAdvisory className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('planning') || t.includes('financial')) return <IconFinancial className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('technical')) return <IconTechnical className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('skills')) return <IconSkills className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('incubation')) return <IconIncubation className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('mentorship')) return <IconMentorship className="w-5 h-5 text-gray-700" theme="dark" />;
    if (t.includes('digital')) return <IconDigital className="w-5 h-5 text-gray-700" theme="dark" />;
    return <IconBriefcase className="w-6 h-6 text-gray-500" />;
  };

  return (
    <AnimatePresence>
      {data && (
        <div id="intervention-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="rounded-3xl max-w-xl w-full p-6 sm:p-8 relative border border-gray-200/80 shadow-2xl max-h-[92vh] flex flex-col z-10 my-auto overflow-hidden"
            style={{
              backgroundColor: '#eaf5ee',
              backgroundImage: 'linear-gradient(180deg, #dceee3 0%, #e3f2e9 18%, #eaf5ee 42%, #f3f9f5 70%, #fbfdfc 100%)',
            }}
          >
            {/* Close Button */}
            <button
              id="close-intervention-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white border border-gray-200/60 shadow-sm transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4 flex-shrink-0 pr-8 relative z-10">
              <div className="w-12 h-12 bg-white/90 border border-gray-200/70 rounded-xl flex items-center justify-center flex-shrink-0 text-gray-600 shadow-sm">
                {renderIcon(data.title, data.iconType)}
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5">
                  SUPPORT PROGRAMME
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
                  {data.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div id="modal-content-body" className="overflow-y-auto pr-1 flex-1 space-y-5 relative z-10">
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {data.overview}
              </p>

              {data.items && Array.isArray(data.items) && data.items.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#111827] mb-3 pb-2 border-b border-gray-200/60">
                    KEY FOCUS AREAS &amp; MODULES
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    {data.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.deliverables && (
                <div className="rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-2xs p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-600 text-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-[#111827]">
                      EXPECTED DELIVERABLE
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 pl-6 leading-relaxed">
                    {typeof data.deliverables === 'string' ? data.deliverables : data.deliverables.join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-gray-200/60 flex justify-end flex-shrink-0 relative z-10">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


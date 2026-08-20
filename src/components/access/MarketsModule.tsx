import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleType, JourneyTabType } from '@/types/access';
import { AnimatedMouseArrow } from './AnimatedMouseArrow';

interface MarketsModuleProps {
  onOpenModal: (key: string) => void;
  onOpenVideoModal: (title: string) => void;
  onSwitchModule: (mod: ModuleType) => void;
}

export const MarketsModule: React.FC<MarketsModuleProps> = ({
  onOpenModal,
  onOpenVideoModal,
  onSwitchModule,
}) => {
  const [journeyTab, setJourneyTab] = useState<JourneyTabType>('supplier');
  const [hoveredModalBtn, setHoveredModalBtn] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navEl = document.getElementById('sticky-top-navigation');
      const headerHeight = navEl ? navEl.offsetHeight : 160;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 24;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const opportunities = [
    {
      type: 'Corporate Procurement',
      badge: 'B2B Supply Chains',
      title: 'Corporate Procurement',
      specs: 'Connect directly with major corporates seeking qualified local suppliers and ESD vendors.',
      contract: 'R 4.2M / annum',
      closing: '15 October 2026',
      modalKey: 'opp-corporate',
    },
    {
      type: 'Public Sector Tenders',
      badge: 'Government Contracts',
      title: 'Government Procurement',
      specs: 'Access public sector tender opportunities and state procurement channels.',
      contract: 'R 12.8M (3 Years)',
      closing: '28 October 2026',
      modalKey: 'opp-govt',
    },
    {
      type: 'Export Readiness',
      badge: 'International Trade',
      title: 'Export Markets',
      specs: 'Explore international trade missions, export readiness support, and cross-border buyers.',
      contract: 'USD $350k / Qtr',
      closing: '10 November 2026',
      modalKey: 'opp-export',
    },
  ];

  return (
    <div id="module-markets" className="module-content">
      {/* HERO SECTION */}
      <section className="bg-gray-50 pt-10 pb-14 sm:pt-14 sm:pb-18 relative overflow-hidden border-b border-gray-200">
        {/* Background Concept Image */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/images/access/Workshop_Large_full.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-right sm:object-right opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          {/* Targeted readability scrim focused behind the text column */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-gray-50/95 via-gray-50/80 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:flex md:items-center md:justify-between gap-8 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="md:w-7/12 mb-12 md:mb-0 relative z-10 pr-4 flex flex-col justify-center"
            >
              <h1 className="text-5xl sm:text-6xl font-extrabold text-black leading-[1.08] mb-5 tracking-tight">
                Access to <br />Markets
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 leading-snug max-w-xl">
                Connecting enterprises with buyers, supply chains and growth opportunities.
              </h2>

              <p className="text-base text-black mb-9 leading-relaxed max-w-xl font-normal">
                The Access to Markets platform helps businesses discover, connect and compete for commercial opportunities across corporate procurement, government markets, export channels and supplier development programmes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id="hero-markets-how-btn"
                  onClick={() => scrollToSection('markets-journey')}
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-xs font-extrabold uppercase tracking-wider rounded-full text-white bg-black hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
                >
                  How it Works
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id="hero-markets-opps-btn"
                  onClick={() => scrollToSection('markets-opportunities')}
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-300 text-xs font-extrabold uppercase tracking-wider rounded-full text-black bg-white hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                >
                  Opportunities
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="md:w-5/12 relative z-0 flex justify-center md:justify-end mt-8 md:mt-0"
            >
              <div className="relative w-full max-w-md bg-white p-3 rounded-[2rem] border border-gray-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="/images/access/Workshop_person.jpg"
                    alt="Access to Markets Hero"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-[320px] lg:h-[420px] object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Video Thumbnail Overlay */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  id="markets-hero-video-thumb"
                  onMouseEnter={() => setHoveredVideo(true)}
                  onMouseLeave={() => setHoveredVideo(false)}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-gray-200/90 shadow-xl cursor-pointer group flex items-center gap-3"
                  onClick={() => onOpenVideoModal('Markets Introduction')}
                >
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Watch Overview</span>
                    <span className="block text-xs font-bold text-black truncate group-hover:text-gray-700 transition-colors">Markets Introduction &amp; Offtake</span>
                  </div>
                  <AnimatePresence>
                    {hoveredVideo && (
                      <AnimatedMouseArrow className="w-4 h-4 mr-1" color="text-black" pulseColor="bg-black" />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / DUAL-PERSPECTIVE JOURNEY */}
      <section id="markets-journey" className="py-14 lg:py-20 bg-gray-50 scroll-mt-48 sm:scroll-mt-56 lg:scroll-mt-60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">How it Works</h2>
            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              A structured commercial matchmaking framework built for suppliers scaling into corporate and public procurement ecosystems.
            </p>

            {/* Toggle Tabs */}
            <div className="inline-flex p-1.5 bg-white rounded-full border border-gray-200/90 shadow-sm">
              <button
                id="tab-btn-supplier"
                onClick={() => setJourneyTab('supplier')}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  journeyTab === 'supplier'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                For Enterprises (Suppliers)
              </button>
              <button
                id="tab-btn-buyer"
                onClick={() => setJourneyTab('buyer')}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  journeyTab === 'buyer'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                For Corporate Buyers
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {journeyTab === 'supplier' ? (
              <motion.div
                key="supplier"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Step 1 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Create Enterprise Profile</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Submit your business capabilities, catalog, compliance status, and B-BBEE credentials.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Smart Matching</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Our matching engine aligns your profile with active buyer requirements and corporate tenders.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      3
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Secure Contracts &amp; Grow</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Respond to proposals, build supplier relationships, and scale your commercial revenue.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="buyer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Step 1 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Publish RFQs &amp; Tenders</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Post your procurement specifications, required volumes, and local content criteria.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Vetted Candidate Shortlists</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Instantly receive audited, compliance-verified black-owned and local SME supplier profiles.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-7 sm:p-8 bg-white rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm mb-5 group-hover:scale-105 transition-transform">
                      3
                    </div>
                    <h4 className="text-xl font-bold text-black mb-2.5 tracking-tight">Scorecard Maximization</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Track B-BBEE ESD spend, supplier retention metrics, and annual transformation compliance scorecards.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* MARKET OPPORTUNITIES AVAILABLE */}
      <section id="markets-opportunities" className="py-14 lg:py-20 bg-gray-50 border-b border-gray-200 scroll-mt-48 sm:scroll-mt-56 lg:scroll-mt-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
              Market Opportunities Available
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Connect with verified buyers, retail networks, and public sector supply chains looking for compliant suppliers like you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 sm:p-9 rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3 tracking-tight group-hover:text-gray-700 transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-normal">
                    {opp.specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => onOpenModal(opp.modalKey)}
                    onMouseEnter={() => setHoveredModalBtn(`opp-${index}`)}
                    onMouseLeave={() => setHoveredModalBtn(null)}
                    className="w-full py-3 bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm relative flex items-center justify-center gap-2"
                  >
                    <span>Click to Open</span>
                    <AnimatePresence>
                      {hoveredModalBtn === `opp-${index}` && (
                        <AnimatedMouseArrow className="w-3.5 h-3.5" color="text-white" pulseColor="bg-white" />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-module Banner */}
      <section className="py-14 lg:py-18 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl sm:rounded-[2.5rem] bg-black text-white p-10 sm:p-14 shadow-2xl border border-neutral-800 text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                Need to improve your readiness before applying?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-base leading-relaxed">
                Ensure your business meets corporate compliance and operational standards by taking part in our structured capability diagnostics and advisory programmes first.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                id="goto-capability-btn"
                onClick={() => onSwitchModule('capability')}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-white text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
              >
                Explore Access to Capability &rarr;
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleType } from '@/types/access';
import { AnimatedMouseArrow } from './AnimatedMouseArrow';
import {
  IconAdvisory,
  IconFinancial,
  IconTechnical,
  IconSkills,
  IconIncubation,
  IconMentorship,
  IconDigital,
  IconPipelineSubmission,
  IconPipelineApproved,
  IconPipelineTraining,
  IconPipelineCertificate,
} from './BespokeIcons';

interface CapabilityModuleProps {
  onOpenModal: (key: string) => void;
  onOpenEligibilityModal: () => void;
  onOpenVideoModal: (title: string) => void;
  onSwitchModule: (mod: ModuleType) => void;
}

export const CapabilityModule: React.FC<CapabilityModuleProps> = ({
  onOpenModal,
  onOpenEligibilityModal,
  onOpenVideoModal,
  onSwitchModule,
}) => {
  // Automated Looping Sequence with Sequential Focus Highlighting
  const [journeyStep, setJourneyStep] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [hoveredHeroEligibility, setHoveredHeroEligibility] = useState<boolean>(false);
  const [hoveredHeroVideo, setHoveredHeroVideo] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredDocVideo, setHoveredDocVideo] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;

    const runLoop = () => {
      if (!isMounted) return;
      setJourneyStep(1);
      setIsFadingOut(false);

      // Step 2 becomes Active after 1000ms
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setJourneyStep(2);

        // Step 3 becomes Active after 1000ms
        timerId = setTimeout(() => {
          if (!isMounted) return;
          setJourneyStep(3);

          // Step 4 becomes Active after 1000ms
          timerId = setTimeout(() => {
            if (!isMounted) return;
            setJourneyStep(4);

            // Step 5 becomes Active after 1000ms
            timerId = setTimeout(() => {
              if (!isMounted) return;
              setJourneyStep(5);

              // 4.5 second pause on the final state
              timerId = setTimeout(() => {
                if (!isMounted) return;
                setIsFadingOut(true);

                // 500ms simultaneous fade-out, then immediate restart with Step 1 Active
                timerId = setTimeout(() => {
                  if (!isMounted) return;
                  runLoop();
                }, 500);
              }, 4500);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    };

    runLoop();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

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

  const interventions = [
    {
      id: 'card-intervention-advisory',
      key: 'advisory',
      title: 'Business Advisory',
      desc: 'Expert business diagnostic assessments, tailored growth roadmaps, and ongoing strategic advisory to scale operations sustainably.',
      icon: <IconAdvisory className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconAdvisory className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Health Check &amp; Advisory</div>
              <div className="text-[10px] text-gray-500 truncate">Diagnostic Score Verified</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[94%] rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-planning',
      key: 'planning',
      title: 'Business Planning',
      desc: 'Robust commercial business planning, operational modelling, and feasibility studies designed for institutional debt and equity funding.',
      icon: <IconFinancial className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconFinancial className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Financial &amp; Growth Model</div>
              <div className="text-[10px] text-gray-500 truncate">Bankable Feasibility Pack</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[88%] rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-technical',
      key: 'technical',
      title: 'Technical Assistance',
      desc: 'Process engineering, ISO & industry certification, quality management system implementation, and production optimization.',
      icon: <IconTechnical className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconTechnical className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Technical &amp; QA Standards</div>
              <div className="text-[10px] text-gray-500 truncate">ISO 9001 / SABS Accredited</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[96%] rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-skills',
      key: 'skills',
      title: 'Skills Development',
      desc: 'Accredited executive leadership tracks, technical masterclasses, and specialized workforce upskilling for target sectors.',
      icon: <IconSkills className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconSkills className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Executive Masterclasses</div>
              <div className="text-[10px] text-gray-500 truncate">Accredited CPD Training</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-full rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-incubation',
      key: 'incubation',
      title: 'Incubation',
      desc: 'Structured cohort incubation programmes offering shared co-working infrastructure, pilot validation labs, and investor pitching masterclasses.',
      icon: <IconIncubation className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconIncubation className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Cohort Demo Lab</div>
              <div className="text-[10px] text-gray-500 truncate">Co-working &amp; Pilot Hub</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[90%] rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-mentorship',
      key: 'mentorship',
      title: 'Mentorship',
      desc: 'One-on-one executive matching with seasoned corporate directors, venture builders, and market specialists for governance and expansion guidance.',
      icon: <IconMentorship className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconMentorship className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Executive Mentorship</div>
              <div className="text-[10px] text-gray-500 truncate">Lead Sector Director Advisory</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[95%] rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'card-intervention-digital',
      key: 'digital',
      title: 'Digital Enabling',
      desc: 'End-to-end digital transformation support including ERP / cloud deployment, cybersecurity hardening, and bespoke e-commerce onboarding.',
      icon: <IconDigital className="w-5 h-5 text-white" theme="dark" />,
      mockup: (
        <div className="w-full bg-white rounded-xl p-3.5 sm:p-4 border border-gray-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2.5">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconDigital className="w-7 h-7 text-white" theme="dark" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-900 truncate">Cloud ERP &amp; E-Commerce</div>
              <div className="text-[10px] text-gray-500 truncate">Systems Integration Online</div>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-[98%] rounded-full"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="module-capability" className="module-content">
      {/* HERO SECTION */}
      <section className="bg-gray-50 pt-10 pb-14 sm:pt-14 sm:pb-18 relative overflow-hidden border-b border-gray-200">
        {/* Background Concept Image */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/images/access/ProteasBackground.jpg"
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
                Access to <br />Capability
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 leading-snug max-w-xl">
                Prepare, build and strengthen your enterprise for sustainable growth.
              </h2>

              <p className="text-base text-black mb-9 leading-relaxed max-w-xl font-normal">
                The Access to Capability module provides comprehensive diagnostics, tailored advisory, mentorship, and skills development programmes to ensure your enterprise achieves operational excellence and investment readiness.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id="hero-eligibility-btn"
                  onClick={onOpenEligibilityModal}
                  onMouseEnter={() => setHoveredHeroEligibility(true)}
                  onMouseLeave={() => setHoveredHeroEligibility(false)}
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 border border-transparent text-xs font-extrabold uppercase tracking-wider rounded-full text-white bg-black hover:bg-neutral-800 transition-colors shadow-md cursor-pointer relative"
                >
                  <span>Eligibility Checklist</span>
                  <AnimatePresence>
                    {hoveredHeroEligibility && (
                      <AnimatedMouseArrow className="w-3.5 h-3.5" color="text-white" pulseColor="bg-white" />
                    )}
                  </AnimatePresence>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id="hero-doc-checklist-btn"
                  onClick={() => scrollToSection('documents-section')}
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-300 text-xs font-extrabold uppercase tracking-wider rounded-full text-black bg-white hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                >
                  Document Checklist
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
                    src="/images/access/Florist-Concept-Large-Cropped.jpg"
                    alt="Access to Capability Hero"
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
                  id="hero-video-thumb"
                  onMouseEnter={() => setHoveredHeroVideo(true)}
                  onMouseLeave={() => setHoveredHeroVideo(false)}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-gray-200/90 shadow-xl cursor-pointer group flex items-center gap-3"
                  onClick={() => onOpenVideoModal('Capability Walkthrough')}
                >
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Watch Overview</span>
                    <span className="block text-xs font-bold text-black truncate group-hover:text-gray-700 transition-colors">Capability Walkthrough &amp; Growth</span>
                  </div>
                  <AnimatePresence>
                    {hoveredHeroVideo && (
                      <AnimatedMouseArrow className="w-4 h-4 mr-1" color="text-black" pulseColor="bg-black" />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLIENT JOURNEY STATUS TRACKER */}
      <section id="capability-journey" className="py-6 sm:py-8 lg:py-10 relative overflow-hidden scroll-mt-48 sm:scroll-mt-56 lg:scroll-mt-60 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-2 sm:mb-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200/90 text-[11px] font-extrabold uppercase tracking-widest text-black mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              The application process
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-1.5">
              Your Capability Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-500 mb-2 sm:mb-3 max-w-2xl mx-auto leading-relaxed">
              Track your live status from application submission through to graduation in real time.
            </p>
          </motion.div>

          {/* Infographic Diagram */}
          <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
            
            {/* DESKTOP TIMELINE VIEW (lg and up - Alternating Timeline matching Design Reference) */}
            <div className="hidden lg:block relative w-full pt-0 pb-2 min-h-[360px]">
              
              {/* Central Horizontal Axis Line spanning across the steps into the hub */}
              <div className="absolute top-1/2 left-10 right-64 h-[2px] bg-gray-200 -translate-y-1/2 z-0">
                {/* Active progress highlight track */}
                <motion.div
                  className="h-full bg-black"
                  animate={{
                    width: isFadingOut
                      ? '0%'
                      : journeyStep === 1
                      ? '12%'
                      : journeyStep === 2
                      ? '36%'
                      : journeyStep === 3
                      ? '60%'
                      : journeyStep === 4
                      ? '84%'
                      : '100%',
                  }}
                  transition={{ duration: isFadingOut ? 0.5 : 0.6, ease: 'easeInOut' }}
                />
              </div>

              {/* Steps Layout Grid */}
              <div className="grid grid-cols-12 gap-2 relative z-10 items-center justify-items-center min-h-[350px]">
                
                {/* STEP 1: Top Icon Badge, Bottom Text */}
                <div
                  onClick={() => setJourneyStep(1)}
                  className="col-span-2 flex flex-col items-center justify-center cursor-pointer group w-full"
                >
                  {/* Top Area: Icon Badge + Stem */}
                  <motion.div
                    animate={{
                      scale: isFadingOut ? 1 : journeyStep === 1 ? 1.1 : 1,
                      opacity: isFadingOut ? 0.45 : journeyStep >= 1 ? (journeyStep === 1 ? 1 : 0.7) : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center h-[135px] justify-end"
                  >
                    <div className={`w-[3.75rem] h-[3.75rem] rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-all duration-300 ${
                      journeyStep === 1 ? 'border-black shadow-md ring-4 ring-black/5' : 'border-gray-200 group-hover:border-gray-400'
                    }`}>
                      {/* Document / Submission Icon */}
                      <IconPipelineSubmission className="w-6 h-6 text-black" theme="light" />
                    </div>
                    {/* Stem down to axis */}
                    <div className={`w-[2px] h-8 transition-colors duration-300 ${journeyStep === 1 ? 'bg-black' : 'bg-gray-300'}`}></div>
                  </motion.div>

                  {/* Axis Anchor Dot */}
                  <div className="relative flex items-center justify-center my-0 z-20">
                    <motion.div
                      animate={{
                        scale: journeyStep === 1 ? 1.5 : 1,
                        backgroundColor: journeyStep >= 1 ? '#000000' : '#d1d5db',
                      }}
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                    />
                  </div>

                  {/* Bottom Area: Text Block */}
                  <motion.div
                    animate={{
                      opacity: isFadingOut ? 0.45 : journeyStep >= 1 ? (journeyStep === 1 ? 1 : 0.75) : 0.4,
                      y: journeyStep === 1 ? 3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center pt-4 max-w-[145px]"
                  >
                    <h4 className="text-sm font-extrabold text-black tracking-tight leading-tight mb-1">
                      1. In Progress
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Application &amp; Docs Submitted
                    </p>
                  </motion.div>
                </div>

                {/* STEP 2: Top Text, Bottom Icon Badge */}
                <div
                  onClick={() => setJourneyStep(2)}
                  className="col-span-2 flex flex-col items-center justify-center cursor-pointer group w-full"
                >
                  {/* Top Area: Text Block */}
                  <motion.div
                    animate={{
                      opacity: isFadingOut ? 0.45 : journeyStep >= 2 ? (journeyStep === 2 ? 1 : 0.75) : 0.4,
                      y: journeyStep === 2 ? -3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center pb-4 h-[135px] flex flex-col justify-end max-w-[145px]"
                  >
                    <h4 className="text-sm font-extrabold text-black tracking-tight leading-tight mb-1">
                      2. Approved
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Diagnostic Assessment Passed
                    </p>
                  </motion.div>

                  {/* Axis Anchor Dot */}
                  <div className="relative flex items-center justify-center my-0 z-20">
                    <motion.div
                      animate={{
                        scale: journeyStep === 2 ? 1.5 : 1,
                        backgroundColor: journeyStep >= 2 ? '#000000' : '#d1d5db',
                      }}
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                    />
                  </div>

                  {/* Bottom Area: Stem + Icon Badge */}
                  <motion.div
                    animate={{
                      scale: isFadingOut ? 1 : journeyStep === 2 ? 1.1 : 1,
                      opacity: isFadingOut ? 0.45 : journeyStep >= 2 ? (journeyStep === 2 ? 1 : 0.7) : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center pt-0"
                  >
                    {/* Stem down from axis */}
                    <div className={`w-[2px] h-8 transition-colors duration-300 ${journeyStep === 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
                    <div className={`w-[3.75rem] h-[3.75rem] rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-all duration-300 ${
                      journeyStep === 2 ? 'border-black shadow-md ring-4 ring-black/5' : 'border-gray-200 group-hover:border-gray-400'
                    }`}>
                      {/* Shield / Approved Icon */}
                      <IconPipelineApproved className="w-6 h-6 text-black" theme="light" />
                    </div>
                  </motion.div>
                </div>

                {/* STEP 3: Top Icon Badge (Lightbulb), Bottom Text */}
                <div
                  onClick={() => setJourneyStep(3)}
                  className="col-span-2 flex flex-col items-center justify-center cursor-pointer group w-full"
                >
                  {/* Top Area: Icon Badge + Stem */}
                  <motion.div
                    animate={{
                      scale: isFadingOut ? 1 : journeyStep === 3 ? 1.1 : 1,
                      opacity: isFadingOut ? 0.45 : journeyStep >= 3 ? (journeyStep === 3 ? 1 : 0.7) : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center h-[135px] justify-end"
                  >
                    <div className={`w-[3.75rem] h-[3.75rem] rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-all duration-300 ${
                      journeyStep === 3 ? 'border-black shadow-md ring-4 ring-black/5' : 'border-gray-200 group-hover:border-gray-400'
                    }`}>
                      {/* Lightbulb Training Icon */}
                      <IconPipelineTraining className="w-6 h-6 text-black" theme="light" />
                    </div>
                    {/* Stem down to axis */}
                    <div className={`w-[2px] h-8 transition-colors duration-300 ${journeyStep === 3 ? 'bg-black' : 'bg-gray-300'}`}></div>
                  </motion.div>

                  {/* Axis Anchor Dot */}
                  <div className="relative flex items-center justify-center my-0 z-20">
                    <motion.div
                      animate={{
                        scale: journeyStep === 3 ? 1.5 : 1,
                        backgroundColor: journeyStep >= 3 ? '#000000' : '#d1d5db',
                      }}
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                    />
                  </div>

                  {/* Bottom Area: Text Block */}
                  <motion.div
                    animate={{
                      opacity: isFadingOut ? 0.45 : journeyStep >= 3 ? (journeyStep === 3 ? 1 : 0.75) : 0.4,
                      y: journeyStep === 3 ? 3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center pt-4 max-w-[145px]"
                  >
                    <h4 className="text-sm font-extrabold text-black tracking-tight leading-tight mb-1">
                      3. Interventions
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Advisory &amp; LMS Active
                    </p>
                  </motion.div>
                </div>

                {/* STEP 4: Top Text, Bottom Icon Badge (Quote / Certificate) */}
                <div
                  onClick={() => setJourneyStep(4)}
                  className="col-span-2 flex flex-col items-center justify-center cursor-pointer group w-full"
                >
                  {/* Top Area: Text Block */}
                  <motion.div
                    animate={{
                      opacity: isFadingOut ? 0.45 : journeyStep >= 4 ? (journeyStep === 4 ? 1 : 0.75) : 0.4,
                      y: journeyStep === 4 ? -3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-center pb-4 h-[135px] flex flex-col justify-end max-w-[145px]"
                  >
                    <h4 className="text-sm font-extrabold text-black tracking-tight leading-tight mb-1">
                      4. Completed
                    </h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Certificate Issued
                    </p>
                  </motion.div>

                  {/* Axis Anchor Dot */}
                  <div className="relative flex items-center justify-center my-0 z-20">
                    <motion.div
                      animate={{
                        scale: journeyStep === 4 ? 1.5 : 1,
                        backgroundColor: journeyStep >= 4 ? '#000000' : '#d1d5db',
                      }}
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                    />
                  </div>

                  {/* Bottom Area: Stem + Icon Badge */}
                  <motion.div
                    animate={{
                      scale: isFadingOut ? 1 : journeyStep === 4 ? 1.1 : 1,
                      opacity: isFadingOut ? 0.45 : journeyStep >= 4 ? (journeyStep === 4 ? 1 : 0.7) : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center pt-0"
                  >
                    {/* Stem down from axis */}
                    <div className={`w-[2px] h-8 transition-colors duration-300 ${journeyStep === 4 ? 'bg-black' : 'bg-gray-300'}`}></div>
                    <div className={`w-[3.75rem] h-[3.75rem] rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-all duration-300 ${
                      journeyStep === 4 ? 'border-black shadow-md ring-4 ring-black/5' : 'border-gray-200 group-hover:border-gray-400'
                    }`}>
                      {/* Quote mark icon matching reference image */}
                      <IconPipelineCertificate className="w-6 h-6 text-black" theme="light" />
                    </div>
                  </motion.div>
                </div>

                {/* STEP 5: GRAND MILESTONE HUB (Solid Black Circle with Ascending Bar Chart & Orbital Arc) */}
                <div
                  onClick={() => setJourneyStep(5)}
                  className="col-span-4 flex items-center justify-center pl-2 cursor-pointer relative w-full"
                >
                  {/* Axis Anchor Dot on connecting edge */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
                    <motion.div
                      animate={{
                        scale: journeyStep === 5 ? 1.5 : 1,
                        backgroundColor: journeyStep >= 5 ? '#000000' : '#d1d5db',
                      }}
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-white shadow-sm"
                    />
                  </div>

                  {/* Outer Orbital Ring Arc with Orbiting Satellite Dots */}
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 260 260">
                      {/* Delicate orbital arc */}
                      <circle
                        cx="130"
                        cy="130"
                        r="112"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth="1.5"
                        strokeDasharray="400 120"
                        strokeLinecap="round"
                        transform="rotate(-40 130 130)"
                      />
                      {/* Orbiting satellite dots */}
                      <circle cx="218" cy="48" r="4.5" fill="#9ca3af" />
                      <circle cx="230" cy="182" r="4.5" fill="#000000" />
                    </svg>

                    {/* Prominent Milestone Circle */}
                    <motion.div
                      animate={{
                        scale: isFadingOut ? 1 : journeyStep === 5 ? 1.05 : 1,
                        boxShadow:
                          journeyStep === 5
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-48 h-48 sm:w-52 sm:h-52 rounded-full text-black p-6 flex flex-col items-center justify-center text-center relative z-10 select-none group overflow-hidden border border-gray-200/80 shadow-md"
                      style={{
                        backgroundColor: '#eaf4ee',
                        backgroundImage: 'linear-gradient(135deg, #d8f3e5 0%, #e6f6ec 30%, #f4faee 65%, #faf8ea 100%)',
                      }}
                    >
                      {/* Ascending 3-Bar Chart Icon matching reference */}
                      <div className="flex items-end gap-1.5 h-8 mb-3">
                        <div className="w-2 h-3.5 bg-black rounded-xs"></div>
                        <div className="w-2 h-5.5 bg-black rounded-xs"></div>
                        <div className="w-2 h-8 bg-black rounded-xs"></div>
                      </div>

                      <h4 className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug mb-1">
                        5. Transition
                      </h4>
                      <p className="text-xs text-gray-700 font-semibold leading-tight max-w-[145px]">
                        Capital or Markets Unlock
                      </p>
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>

            {/* MOBILE & TABLET RESPONSIVE TIMELINE VIEW (below lg - Centered Layout) */}
            <div className="block lg:hidden relative w-full max-w-md sm:max-w-lg mx-auto pt-2 pb-4 px-2 sm:px-4">
              <div className="relative border-l-2 border-gray-200 ml-5 sm:ml-8 pl-6 sm:pl-8 space-y-8">
                
                {/* Step 1 Mobile */}
                <div onClick={() => setJourneyStep(1)} className="relative cursor-pointer group">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    journeyStep === 1 ? 'border-black ring-4 ring-black/10' : 'border-gray-300'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${journeyStep >= 1 ? 'bg-black' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                      <IconPipelineSubmission className="w-5 h-5 text-black" theme="light" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-black">1. In Progress</h4>
                      <p className="text-xs text-gray-500 font-medium">Application &amp; Docs Submitted</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 Mobile */}
                <div onClick={() => setJourneyStep(2)} className="relative cursor-pointer group">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    journeyStep === 2 ? 'border-black ring-4 ring-black/10' : 'border-gray-300'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${journeyStep >= 2 ? 'bg-black' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                      <IconPipelineApproved className="w-5 h-5 text-black" theme="light" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-black">2. Approved</h4>
                      <p className="text-xs text-gray-500 font-medium">Diagnostic Assessment Passed</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 Mobile */}
                <div onClick={() => setJourneyStep(3)} className="relative cursor-pointer group">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    journeyStep === 3 ? 'border-black ring-4 ring-black/10' : 'border-gray-300'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${journeyStep >= 3 ? 'bg-black' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                      <IconPipelineTraining className="w-5 h-5 text-black" theme="light" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-black">3. Interventions</h4>
                      <p className="text-xs text-gray-500 font-medium">Advisory &amp; LMS Active</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 Mobile */}
                <div onClick={() => setJourneyStep(4)} className="relative cursor-pointer group">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    journeyStep === 4 ? 'border-black ring-4 ring-black/10' : 'border-gray-300'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${journeyStep >= 4 ? 'bg-black' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                      <IconPipelineCertificate className="w-5 h-5 text-black" theme="light" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-black">4. Completed</h4>
                      <p className="text-xs text-gray-500 font-medium">Certificate Issued</p>
                    </div>
                  </div>
                </div>

                {/* Step 5 Mobile */}
                <div onClick={() => setJourneyStep(5)} className="relative pt-2 cursor-pointer group">
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-black flex items-center justify-center shadow-sm`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <div
                    className="p-5 rounded-2xl flex items-center gap-4 shadow-md text-black border border-gray-200/80 overflow-hidden"
                    style={{
                      backgroundColor: '#eaf4ee',
                      backgroundImage: 'linear-gradient(135deg, #d8f3e5 0%, #e6f6ec 30%, #f4faee 65%, #faf8ea 100%)',
                    }}
                  >
                    <div className="flex items-end gap-1 h-6 flex-shrink-0">
                      <div className="w-1.5 h-2.5 bg-black rounded-xs"></div>
                      <div className="w-1.5 h-4 bg-black rounded-xs"></div>
                      <div className="w-1.5 h-6 bg-black rounded-xs"></div>
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-black">5. Transition</h4>
                      <p className="text-xs text-gray-700 font-semibold">Capital or Markets Unlock</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPREHENSIVE CORE SUPPORT INTERVENTIONS */}
      <section id="support-interventions" className="py-14 lg:py-20 bg-gray-50 relative scroll-mt-48 sm:scroll-mt-56 lg:scroll-mt-60 border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200/90 text-[11px] font-extrabold uppercase tracking-widest text-black mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Capability Interventions
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
              Support Interventions
            </h2>
            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Click on any support intervention below to view detailed explanations, scope, and service deliverables.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-4">
            {interventions.map((item, index) => (
              <motion.div
                key={item.key}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                onMouseEnter={() => setHoveredCard(item.key)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onOpenModal(item.key)}
                className={`bg-white p-7 sm:p-8 rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer ${
                  index === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-2.5 tracking-tight group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="my-2">
                  <div
                    className="rounded-2xl p-3.5 sm:p-4 border border-gray-200/60 relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] min-h-[110px] flex flex-col justify-center overflow-hidden transition-all"
                    style={{
                      backgroundColor: '#eaf5ee',
                      backgroundImage: 'linear-gradient(180deg, #dceee3 0%, #e3f2e9 18%, #eaf5ee 42%, #f3f9f5 70%, #fbfdfc 100%)',
                    }}
                  >
                    <div className="w-full">
                      {item.mockup}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-black group-hover:text-gray-700 transition-colors">
                    VIEW DETAILS
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-black transition-colors">
                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors">Explore</span>
                    <AnimatePresence mode="wait">
                      {hoveredCard === item.key ? (
                        <AnimatedMouseArrow className="w-3.5 h-3.5" color="text-black" pulseColor="bg-black" />
                      ) : (
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Required Compliance & Readiness Documents */}
      <section id="documents-section" className="py-14 lg:py-20 bg-gray-50 border-b border-gray-200 relative overflow-hidden scroll-mt-48 sm:scroll-mt-56 lg:scroll-mt-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 lg:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200/90 text-[11px] font-extrabold uppercase tracking-widest text-black mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Compliance &amp; Verification
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
              Required Documents Checklist
            </h2>
            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ensure you have the following compliance and financial documentation ready for upload during stage 1.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Mandatory Documentation Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-[2rem] border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
                  Mandatory Documentation
                </h3>

                <ul className="space-y-3.5">
                  {/* Item 1 */}
                  <motion.li
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="font-bold text-black block mb-0.5">CIPC Registration Documents:</span>
                      <span className="text-gray-500 font-medium">Official certificate of confirmation and Memorandum of Incorporation.</span>
                    </div>
                  </motion.li>

                  {/* Item 2 */}
                  <motion.li
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="font-bold text-black block mb-0.5">Valid Tax Clearance Certificate / PIN:</span>
                      <span className="text-gray-500 font-medium">Valid PIN confirming good standing with SARS.</span>
                    </div>
                  </motion.li>

                  {/* Item 3 */}
                  <motion.li
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="font-bold text-black block mb-0.5">Certified ID Copies:</span>
                      <span className="text-gray-500 font-medium">All directors and shareholders holding &ge;5% equity.</span>
                    </div>
                  </motion.li>

                  {/* Item 4 */}
                  <motion.li
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="font-bold text-black block mb-0.5">Financial Statements:</span>
                      <span className="text-gray-500 font-medium">Latest 2 years AFS or 12 months stamped bank statements.</span>
                    </div>
                  </motion.li>

                  {/* Item 5 */}
                  <motion.li
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      <span className="font-bold text-black block mb-0.5">B-BBEE Affidavit / Certificate:</span>
                      <span className="text-gray-500 font-medium">Valid sworn affidavit or SANAS-accredited certificate.</span>
                    </div>
                  </motion.li>
                </ul>
              </div>
            </motion.div>

            {/* Right Card: Need Guidance? Video Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-5 p-7 sm:p-9 rounded-[2rem] border border-emerald-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/access/guidance-mint-gradient.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black mb-2.5 tracking-tight">
                  Need Guidance?
                </h3>
                <p className="text-sm text-gray-500 font-normal leading-relaxed mb-6">
                  Watch our step-by-step video explaining how our assessors evaluate submitted compliance documents and how to avoid common application rejections.
                </p>

                {/* Interactive Video Mockup Window */}
                <div className="my-2 relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    id="doc-guidance-video-thumb"
                    onMouseEnter={() => setHoveredDocVideo(true)}
                    onMouseLeave={() => setHoveredDocVideo(false)}
                    className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer group bg-black"
                    onClick={() => onOpenVideoModal('Document Upload Tutorial')}
                  >
                    <img
                      src="/images/access/Workshop_person.jpg"
                      alt="Document Guidance Video"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-48 sm:h-52 object-cover opacity-85 group-hover:opacity-95 transition-opacity"
                    />
                    
                    {/* Floating dark video badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video Guide</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                      <motion.div
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.2 }}
                        className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:bg-black group-hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Animated mouse arrow on rollover */}
                    <AnimatePresence>
                      {hoveredDocVideo ? (
                        <div className="absolute bottom-3 right-3 z-20">
                          <AnimatedMouseArrow className="w-5 h-5 drop-shadow-md" color="text-white" pulseColor="bg-white" />
                        </div>
                      ) : (
                        <div className="absolute bottom-3 right-3 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                          <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3l7 18 3-7 7-3L3 3z" />
                          </svg>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Cross-module Banner */}
      <section className="py-14 lg:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-extrabold uppercase tracking-widest text-white mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              Next Horizon
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ready to sell what you build?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8 text-base sm:text-lg font-normal leading-relaxed">
              Once your business has completed its capability readiness assessment, transition smoothly into the <strong className="text-white font-semibold">Access to Markets</strong> platform to connect with corporate buyers and tender opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              id="goto-markets-btn"
              onClick={() => onSwitchModule('markets')}
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-xs font-extrabold uppercase tracking-wider rounded-full text-black bg-white hover:bg-gray-100 transition-colors shadow-md cursor-pointer"
            >
              Explore Access to Markets &rarr;
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizState } from '@/types/access';
import { IconPipelineApproved } from './BespokeIcons';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose }) => {
  const [answers, setAnswers] = useState<QuizState>({
    q1: 'yes',
    q2: 'active',
    q3: 'yes',
  });

  const [resultScore, setResultScore] = useState<string | null>(null);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCalculateScore = () => {
    let score = 100;
    if (answers.q1 !== 'yes') score -= 20;
    if (answers.q2 !== 'active') score -= 20;
    if (answers.q3 !== 'yes') score -= 10;

    const message = `Readiness Simulator: Your enterprise scored ${score}% and qualifies for the Needs Assessment & Business Advisory module!`;
    setResultScore(message);
  };

  const handleClose = () => {
    setResultScore(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="eligibility-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 relative border border-gray-200/90 shadow-2xl z-10 max-h-[92vh] flex flex-col my-auto"
          >
            {/* Close Button */}
            <button
              id="close-eligibility-modal-btn"
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-4 flex-shrink-0 pr-8">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-black text-white rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-sm">
                <IconPipelineApproved className="w-5 h-5 text-white" theme="dark" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Self-Assessment Tool</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight leading-tight">Enterprise Eligibility Checklist</h2>
              </div>
            </div>

            {/* Scrollable Content Container (only scrolls if content exceeds screen height) */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-3">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Complete this 3-question quick readiness assessment to evaluate your business status and discover tailored Transformation Fund modules.
              </p>

              {/* Question 1 */}
              <div className="p-3.5 sm:p-4 bg-gray-50 rounded-xl border border-gray-200/80">
                <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                  1. Is your business registered with CIPC with valid tax compliance?
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q1"
                      value="yes"
                      checked={answers.q1 === 'yes'}
                      onChange={() => setAnswers({ ...answers, q1: 'yes' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Yes, fully compliant
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q1"
                      value="no"
                      checked={answers.q1 === 'no'}
                      onChange={() => setAnswers({ ...answers, q1: 'no' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    In progress / pending
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-3.5 sm:p-4 bg-gray-50 rounded-xl border border-gray-200/80">
                <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                  2. What is your current operational stage?
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q2"
                      value="early"
                      checked={answers.q2 === 'early'}
                      onChange={() => setAnswers({ ...answers, q2: 'early' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Early-Stage (0 - 12 Months)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q2"
                      value="active"
                      checked={answers.q2 === 'active'}
                      onChange={() => setAnswers({ ...answers, q2: 'active' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Active Trading (1+ Years)
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-3.5 sm:p-4 bg-gray-50 rounded-xl border border-gray-200/80">
                <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                  3. Are you seeking mentorship, diagnostic assessments, or market linkages?
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q3"
                      value="yes"
                      checked={answers.q3 === 'yes'}
                      onChange={() => setAnswers({ ...answers, q3: 'yes' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="q3"
                      value="no"
                      checked={answers.q3 === 'no'}
                      onChange={() => setAnswers({ ...answers, q3: 'no' })}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Not yet decided
                  </label>
                </div>
              </div>

              {/* Results display */}
              <AnimatePresence>
                {resultScore && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    id="quiz-result-score-box"
                    className="p-3.5 sm:p-4 rounded-xl bg-black text-white text-xs font-medium border border-neutral-800 shadow-md"
                  >
                    <div className="flex items-center gap-2 font-extrabold text-white mb-1 uppercase tracking-wider">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                      Assessment Completed
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{resultScore}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2.5 flex-shrink-0">
              <button
                id="calculate-eligibility-btn"
                onClick={handleCalculateScore}
                className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold uppercase tracking-wider rounded-full shadow-sm transition-all cursor-pointer"
              >
                Calculate Readiness
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black text-xs font-extrabold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

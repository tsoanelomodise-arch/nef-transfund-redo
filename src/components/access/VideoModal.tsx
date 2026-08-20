import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, title, onClose }) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="video-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="bg-black rounded-2xl max-w-4xl w-full relative border border-gray-800 shadow-2xl overflow-hidden aspect-video z-10"
          >
            <button
              id="close-video-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 transition-colors cursor-pointer z-20"
              aria-label="Close video"
            >
              &times;
            </button>

            <div id="video-container" className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ZMI0cznDLzU?autoplay=1"
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

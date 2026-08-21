import { useState, useEffect } from "react";
import { TfArrowUp } from "@/components/icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
      }`}
      aria-label="Scroll to top"
    >
      <TfArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTop;
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-[#0F766E] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white hover:shadow-xl active:scale-95 ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-90 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 animate-pulse hover:animate-none" />
      </button>
    </>
  );
}

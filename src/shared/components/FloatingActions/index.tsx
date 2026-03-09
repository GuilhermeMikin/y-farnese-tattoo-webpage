"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 200;

type FloatingActionsProps = {
  whatsappHref: string;
  instagramHref: string;
  whatsappLabel: string;
  instagramLabel: string;
  backToTopLabel: string;
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function FloatingActions({
  whatsappHref,
  instagramHref,
  whatsappLabel,
  instagramLabel,
  backToTopLabel,
}: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fabClass =
    "inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-brand p-3 shadow-lg hover:bg-brand-dark dark:bg-brand-dark dark:shadow-black/30 dark:hover:bg-brand";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2">
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={backToTopLabel}
          className={fabClass}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappLabel}
        className={fabClass}
      >
        <Image
          src="/whatsapp-icon.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </a>
      <a
        href={instagramHref}
        target="_blank"
        rel="noreferrer"
        aria-label={instagramLabel}
        className={fabClass}
      >
        <Image
          src="/insta-icon.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </a>
    </div>
  );
}

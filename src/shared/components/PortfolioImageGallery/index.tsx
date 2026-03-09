"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type MediaImage = { src: string; alt: string };

export type GalleryLabels = {
  expand_image: string;
  previous_image: string;
  next_image: string;
  show_image: string;
  close_expanded_image: string;
  expanded_view: string;
  no_images: string;
};

type PortfolioImageGalleryProps = {
  images: MediaImage[];
  autoPlay?: boolean;
  intervalMs?: number;
  labels: GalleryLabels;
  className?: string;
};

export function PortfolioImageGallery({
  images,
  autoPlay = false,
  intervalMs = 3500,
  labels,
  className = "",
}: PortfolioImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoPlay || images.length <= 1 || lightboxOpen) return;
    const id = setInterval(goNext, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, images.length, intervalMs, lightboxOpen, goNext]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goPrev, goNext]);

  const imageSizes = "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 95vw";

  if (images.length === 0) {
    return (
      <div
        className={`relative mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-900 ${className}`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {labels.no_images}
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className={`relative mb-4 aspect-video cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 ${className}`}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative block h-full w-full"
          aria-label={labels.expand_image.replace(/\{n\}/g, "1")}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            sizes={imageSizes}
          />
        </button>
        {lightboxOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={labels.expanded_view}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 text-2xl text-white hover:bg-black/75"
                aria-label={labels.close_expanded_image}
              >
                ×
              </button>
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full max-w-[90vw]">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>
            </div>,
            document.body,
          )}
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative mb-4 aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 ${className}`}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative h-full min-w-full flex-shrink-0 cursor-zoom-in"
              aria-label={labels.expand_image.replace(/\{n\}/g, String(i + 1))}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes={imageSizes}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/45 text-white hover:bg-black/65"
          aria-label={labels.previous_image}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/45 text-white hover:bg-black/65"
          aria-label={labels.next_image}
        >
          ›
        </button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              aria-label={labels.show_image.replace(/\{n\}/g, String(i + 1))}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {lightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.expanded_view}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 text-2xl text-white hover:bg-black/75"
              aria-label={labels.close_expanded_image}
            >
              ×
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/55 text-2xl font-bold text-white hover:bg-black/75"
              aria-label={labels.previous_image}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/55 text-2xl font-bold text-white hover:bg-black/75"
              aria-label={labels.next_image}
            >
              ›
            </button>
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full max-w-[90vw]">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

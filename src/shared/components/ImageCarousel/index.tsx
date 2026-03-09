"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MediaImage = { src: string; alt: string };

type ImageCarouselProps = {
  images: MediaImage[];
  autoPlay?: boolean;
  intervalMs?: number;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
};

export function ImageCarousel({
  images,
  autoPlay = false,
  intervalMs = 4000,
  aspectRatio = "square",
  className = "",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, images.length, intervalMs]);

  if (images.length === 0) {
    const aspectClass =
      aspectRatio === "square" ? "aspect-square" : aspectRatio === "video" ? "aspect-video" : "aspect-[3/4]";
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${aspectClass} ${className}`}
      >
        <span className="text-xs text-slate-400 dark:text-slate-500">Sem imagens</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl ${aspectRatio === "square" ? "aspect-square" : aspectRatio === "video" ? "aspect-video" : "aspect-[3/4]"} ${className}`}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    );
  }

  const aspectClass =
    aspectRatio === "square" ? "aspect-square" : aspectRatio === "video" ? "aspect-video" : "aspect-[3/4]";

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectClass} ${className}`}>
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-full min-w-full flex-shrink-0">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para imagem ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-colors ${
              i === currentIndex
                ? "w-4 bg-white/90"
                : "w-1.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

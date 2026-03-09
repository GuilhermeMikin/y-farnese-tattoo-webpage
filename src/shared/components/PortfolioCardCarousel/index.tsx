"use client";

import type { MediaImage } from "@/shared/components/PortfolioImageGallery";
import { PortfolioImageGallery } from "@/shared/components/PortfolioImageGallery";
import type { GalleryLabels } from "@/shared/components/PortfolioImageGallery";

type PortfolioCardCarouselProps = {
  images: MediaImage[];
  labels: GalleryLabels;
  className?: string;
};

export function PortfolioCardCarousel({
  images,
  labels,
  className = "",
}: PortfolioCardCarouselProps) {
  return (
    <PortfolioImageGallery
      images={images}
      autoPlay={true}
      intervalMs={3500}
      labels={labels}
      className={className}
    />
  );
}

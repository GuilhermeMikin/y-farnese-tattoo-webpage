"use client";

import type { MediaImage } from "@/shared/components/PortfolioImageGallery";
import { PortfolioImageGallery } from "@/shared/components/PortfolioImageGallery";
import type { GalleryLabels } from "@/shared/components/PortfolioImageGallery";

type PortfolioWorkGalleryProps = {
  images: MediaImage[];
  labels: GalleryLabels;
  className?: string;
};

export function PortfolioWorkGallery({
  images,
  labels,
  className = "",
}: PortfolioWorkGalleryProps) {
  return (
    <PortfolioImageGallery
      images={images}
      autoPlay={false}
      labels={labels}
      className={className}
    />
  );
}

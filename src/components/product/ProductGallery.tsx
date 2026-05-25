import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[5rem_1fr]">
      <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
        {images.map((image, index) => (
          <button
            aria-label={`View ${productName} image ${index + 1}`}
            className="aspect-square w-20 overflow-hidden border border-[#0B0B0B]/10 bg-[#0B0B0B] transition hover:border-[#C6A56B] data-[active=true]:border-[#C6A56B]"
            data-active={activeImage === image}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <img alt={`${productName} thumbnail ${index + 1}`} className="h-full w-full object-cover" loading="lazy" src={image} />
          </button>
        ))}
      </div>

      <div className="group relative order-1 aspect-[4/5] overflow-hidden bg-[#0B0B0B] lg:order-2">
        <AnimatePresence mode="wait">
          <motion.img
            alt={`${productName} bottle close-up`}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
            exit={{ opacity: 0, scale: 1.03 }}
            initial={{ opacity: 0, scale: 1.03 }}
            key={activeImage}
            loading="eager"
            src={activeImage}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-black/35 px-4 py-3 text-xs uppercase tracking-[0.22em] text-[#F7F3EE] backdrop-blur-md">
          <ZoomIn aria-hidden="true" className="h-4 w-4" />
          Hover to inspect
        </div>
      </div>
    </div>
  );
}

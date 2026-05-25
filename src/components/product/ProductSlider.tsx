import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProductSliderProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  navigate: (to: string) => void;
}

export function ProductSlider({ products, onAddToCart, navigate }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const width = sliderRef.current?.clientWidth ?? 0;
    sliderRef.current?.scrollBy({ left: direction === "left" ? -width * 0.82 : width * 0.82, behavior: "smooth" });
  };

  return (
    <section className="bg-[#0B0B0B] py-24 text-[#F7F3EE] md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-8">
          <SectionHeader
            copy="A horizontal edit of the fragrances clients return to when they want a signature with gravity."
            dark
            eyebrow="Best sellers"
            title="Chosen for the afterglow."
          />
          <div className="hidden gap-3 md:flex">
            <button
              aria-label="Previous best sellers"
              className="grid h-12 w-12 place-items-center rounded-full border border-[#F7F3EE]/20 text-[#F7F3EE] transition hover:border-[#C6A56B] hover:text-[#C6A56B]"
              onClick={() => scroll("left")}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next best sellers"
              className="grid h-12 w-12 place-items-center rounded-full border border-[#F7F3EE]/20 text-[#F7F3EE] transition hover:border-[#C6A56B] hover:text-[#C6A56B]"
              onClick={() => scroll("right")}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar mt-16 flex snap-x gap-6 overflow-x-auto scroll-smooth pb-6"
          tabIndex={0}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              className="min-w-[78vw] snap-start sm:min-w-[42vw] lg:min-w-[30vw] xl:min-w-[25vw] [&_h3]:text-[#F7F3EE] [&_p]:text-[#F7F3EE]/62 [&_button:last-child]:text-[#F7F3EE]/55"
              navigate={navigate}
              onAddToCart={onAddToCart}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

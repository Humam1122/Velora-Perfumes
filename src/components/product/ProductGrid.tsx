import type { Product } from "@/types/product";
import { ProductCard } from "@/components/cards/ProductCard";
import { cn } from "@/utils/cn";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  navigate: (to: string) => void;
  className?: string;
}

export function ProductGrid({ products, onAddToCart, navigate, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-3xl text-[#0B0B0B]">No fragrances found.</p>
        <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[#1A1A1A]/50">Try a different note or family</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} navigate={navigate} onAddToCart={onAddToCart} product={product} />
      ))}
    </div>
  );
}

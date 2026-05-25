import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/data/products";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  navigate: (to: string) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, navigate, className }: ProductCardProps) {
  const productPath = `/product/${product.slug}`;

  return (
    <motion.article
      className={cn("group", className)}
      initial={{ opacity: 0, y: 34 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <button
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#111] text-left"
        onClick={() => navigate(productPath)}
        type="button"
      >
        <img
          alt={`${product.name} perfume bottle`}
          className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
          src={product.mainImage}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <span className="absolute left-5 top-5 text-[0.65rem] uppercase tracking-[0.28em] text-[#F7F3EE]/80">
          {product.category}
        </span>
        {product.bestSeller ? (
          <span className="absolute bottom-5 left-5 text-[0.65rem] uppercase tracking-[0.26em] text-[#C6A56B]">
            Best seller
          </span>
        ) : null}
      </button>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <button className="text-left" onClick={() => navigate(productPath)} type="button">
            <h3 className="font-serif text-2xl tracking-[-0.03em] text-[#0B0B0B] transition-colors group-hover:text-[#8F6F38]">
              {product.name}
            </h3>
          </button>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#1A1A1A]/62">{product.description}</p>
          <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/50">
            <Star aria-hidden="true" className="h-3.5 w-3.5 fill-[#C6A56B] text-[#C6A56B]" />
            {product.rating.toFixed(1)} / {product.reviewsCount} reviews
          </div>
        </div>
        <p className="whitespace-nowrap text-sm font-medium text-[#0B0B0B]">{formatCurrency(product.price)}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <AnimatedButton
          ariaLabel={`Add ${product.name} to cart`}
          className="min-w-0"
          onClick={() => onAddToCart(product)}
          size="sm"
          variant="dark"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Add
        </AnimatedButton>
        <button
          className="text-xs uppercase tracking-[0.24em] text-[#0B0B0B]/55 transition-colors hover:text-[#8F6F38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
          onClick={() => navigate(productPath)}
          type="button"
        >
          Discover
        </button>
      </div>
    </motion.article>
  );
}

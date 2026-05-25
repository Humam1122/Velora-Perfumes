import { motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProductDetailsPageProps {
  product?: Product;
  products: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  navigate: (to: string) => void;
}

export function ProductDetailsPage({ product, products, onAddToCart, navigate }: ProductDetailsPageProps) {
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.id !== product.id && (item.category === product.category || item.bestSeller)).slice(0, 3);
  }, [product, products]);

  if (!product) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F7F3EE] px-5 text-center text-[#0B0B0B]">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#C6A56B]">Not found</p>
          <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">This fragrance has faded.</h1>
          <AnimatedButton className="mt-8" onClick={() => navigate("/shop")} variant="dark">
            Return to shop
          </AnimatedButton>
        </div>
      </main>
    );
  }

  const noteGroups = [
    { label: "Top", notes: product.notes.top },
    { label: "Heart", notes: product.notes.heart },
    { label: "Base", notes: product.notes.base },
  ];

  return (
    <main className="bg-[#F7F3EE] text-[#0B0B0B]">
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-20 pt-32 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
          <ProductGallery images={product.galleryImages} productName={product.name} />
        </motion.div>

        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <LuxuryBadge>{product.category} fragrance</LuxuryBadge>
          <h1 className="mt-6 font-serif text-6xl leading-[0.88] tracking-[-0.06em] md:text-8xl">{product.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#1A1A1A]/66">{product.details}</p>

          <div className="mt-7 flex flex-wrap items-center gap-5 border-y border-[#0B0B0B]/10 py-5">
            <p className="font-serif text-4xl tracking-[-0.04em]">{formatCurrency(product.price)}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">{product.volume}</p>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/55">
              <Star aria-hidden="true" className="h-4 w-4 fill-[#C6A56B] text-[#C6A56B]" />
              {product.rating.toFixed(1)} ({product.reviewsCount})
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex h-14 w-40 items-center justify-between border border-[#0B0B0B]/15">
              <button aria-label="Decrease quantity" className="grid h-full w-12 place-items-center" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm uppercase tracking-[0.2em]">{quantity}</span>
              <button aria-label="Increase quantity" className="grid h-full w-12 place-items-center" onClick={() => setQuantity((value) => value + 1)} type="button">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <AnimatedButton className="justify-center sm:flex-1" onClick={() => onAddToCart(product, quantity)} size="lg" variant="dark">
              Add to cart
            </AnimatedButton>
          </div>

          <div className="mt-8 grid gap-4 text-sm text-[#1A1A1A]/65 sm:grid-cols-3">
            <div className="border border-[#0B0B0B]/10 p-4">
              <ShieldCheck className="mb-4 h-5 w-5 text-[#C6A56B]" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B]">Stock</p>
              <p className="mt-2">{product.stockStatus}</p>
            </div>
            <div className="border border-[#0B0B0B]/10 p-4">
              <Sparkles className="mb-4 h-5 w-5 text-[#C6A56B]" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B]">Family</p>
              <p className="mt-2">{product.family}</p>
            </div>
            <div className="border border-[#0B0B0B]/10 p-4">
              <Sparkles className="mb-4 h-5 w-5 text-[#C6A56B]" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B]">Longevity</p>
              <p className="mt-2">{product.longevity}</p>
            </div>
          </div>

          <div className="mt-9">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#C6A56B]">Occasion</p>
            <div className="flex flex-wrap gap-2">
              {product.occasion.map((occasion) => (
                <span className="border border-[#0B0B0B]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/60" key={occasion}>
                  {occasion}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#0B0B0B]/10 px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader copy="Each VELORA composition is structured as a three-act memory: the entrance, the pulse, the trace." eyebrow="Notes" title="The architecture of the scent." />
          <div className="grid gap-5 md:grid-cols-3">
            {noteGroups.map((group) => (
              <motion.div
                className="border-l border-[#C6A56B]/50 pl-6"
                initial={{ opacity: 0, y: 24 }}
                key={group.label}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[#C6A56B]">{group.label}</p>
                <ul className="mt-5 space-y-3 font-serif text-3xl tracking-[-0.04em] text-[#0B0B0B]">
                  {group.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <LuxuryBadge>Ingredients</LuxuryBadge>
            <h2 className="mt-6 font-serif text-5xl leading-none tracking-[-0.05em] md:text-7xl">Rare materials, edited with restraint.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.ingredients.map((ingredient) => (
              <div className="border border-[#0B0B0B]/10 p-5 text-sm uppercase tracking-[0.18em] text-[#1A1A1A]/62" key={ingredient}>
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[520px] overflow-hidden bg-[#0B0B0B] px-5 py-24 text-[#F7F3EE] md:px-10 md:py-32">
        <img alt="Luxury banner for VELORA fragrance storytelling" className="absolute inset-0 h-full w-full object-cover opacity-55" loading="lazy" src="/images/velora-banner.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/72 to-transparent" />
        <div className="relative mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <LuxuryBadge>Storytelling</LuxuryBadge>
            <h2 className="mt-6 font-serif text-5xl leading-none tracking-[-0.05em] md:text-7xl">A fragrance should feel like a scene you enter.</h2>
            <p className="mt-7 text-lg leading-9 text-[#F7F3EE]/68">
              {product.name} was composed for the moment between presence and memory, when light, fabric, and skin become a private language.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader copy="Selected from the same emotional register and refined for layering." eyebrow="Related" title="Complete the ritual." />
          <ProductGrid className="mt-14" navigate={navigate} onAddToCart={onAddToCart} products={relatedProducts} />
        </div>
      </section>
    </main>
  );
}

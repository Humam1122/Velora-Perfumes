import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/data/content";
import type { Product } from "@/types/product";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSlider } from "@/components/product/ProductSlider";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  navigate: (to: string) => void;
}

export function HomePage({ products, onAddToCart, navigate }: HomePageProps) {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const bestSellers = products.filter((product) => product.bestSeller);

  return (
    <>
      <HeroSection navigate={navigate} />

      <section className="bg-[#F7F3EE] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              copy="Six signatures composed like wardrobe essentials: intimate, cinematic, and made to be remembered."
              eyebrow="Featured collection"
              title="The first impression edits the room."
            />
            <AnimatedButton onClick={() => navigate("/shop")} variant="dark">
              View all
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </AnimatedButton>
          </div>
          <ProductGrid navigate={navigate} onAddToCart={onAddToCart} products={featuredProducts} />
        </div>
      </section>

      <section className="overflow-hidden bg-[#F7F3EE] px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            className="relative min-h-[560px] overflow-hidden bg-[#0B0B0B]"
            initial={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <img
              alt="VELORA fragrance atelier with amber bottles"
              className="h-full min-h-[560px] w-full object-cover transition duration-[1600ms] hover:scale-105"
              loading="lazy"
              src="/images/velora-editorial.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <LuxuryBadge>Luxury experience</LuxuryBadge>
            <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              Perfume as atmosphere, not accessory.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-[#1A1A1A]/65">
              VELORA treats fragrance as a cinematic object: bottle weight, shadow, silence, and the final note left behind after a room has changed.
            </p>
            <div className="mt-10 grid gap-6 border-y border-[#0B0B0B]/10 py-8 sm:grid-cols-3">
              {["Rare materials", "Small batches", "Refill-minded vessels"].map((item, index) => (
                <motion.p
                  className="text-xs uppercase leading-6 tracking-[0.24em] text-[#0B0B0B]/58"
                  initial={{ opacity: 0, y: 16 }}
                  key={item}
                  transition={{ delay: index * 0.12, duration: 0.65 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {item}
                </motion.p>
              ))}
            </div>
            <AnimatedButton className="mt-10" onClick={() => navigate("/about")} variant="dark">
              Read the story
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      <ProductSlider navigate={navigate} onAddToCart={onAddToCart} products={bestSellers} />

      <section className="relative overflow-hidden bg-[#1A1A1A] px-5 py-24 text-[#F7F3EE] md:px-10 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(198,165,107,0.14),transparent_34%)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <SectionHeader
            align="center"
            copy="Quiet praise from collectors who value restraint, projection, and a memory that lasts past midnight."
            dark
            eyebrow="Testimonials"
            title="A trail people remember."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard index={index} key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}

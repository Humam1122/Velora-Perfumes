import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface HeroSectionProps {
  navigate: (to: string) => void;
}

export function HeroSection({ navigate }: HeroSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#0B0B0B] text-[#F7F3EE]">
      <motion.img
        alt="VELORA luxury perfume bottle in cinematic light"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        initial={{ scale: 1.14, opacity: 0 }}
        loading="eager"
        src="/images/velora-hero.jpg"
        style={{ scale: imageScale, y: imageY }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        animate={{ scale: 1.08, opacity: 1 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(198,165,107,0.12),transparent_28%),linear-gradient(90deg,rgba(11,11,11,0.82),rgba(11,11,11,0.42)_45%,rgba(11,11,11,0.74)),linear-gradient(180deg,rgba(11,11,11,0.42),rgba(11,11,11,0.9))]" />
      <div className="absolute inset-0 particles opacity-60" aria-hidden="true" />

      <motion.div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-5 pb-16 pt-28 md:px-10" style={{ y: textY }}>
        <div className="max-w-4xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.42em] text-[#C6A56B]"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Luxury Fragrance House
          </motion.div>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[clamp(5rem,17vw,16rem)] leading-[0.72] tracking-[-0.09em]"
            initial={{ opacity: 0, y: 34 }}
            transition={{ delay: 0.58, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            VELORA
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.04em] md:text-6xl"
            initial={{ opacity: 0, y: 26 }}
            transition={{ delay: 0.76, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            Crafted for those who leave a lasting impression.
          </motion.p>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-xl text-base leading-8 text-[#F7F3EE]/68 md:text-lg"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.92, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Rare woods, velvet amber, and luminous florals composed as cinematic signatures.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            transition={{ delay: 1.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedButton onClick={() => navigate("/shop")} size="lg">
              Shop Collection
            </AnimatedButton>
            <AnimatedButton onClick={() => navigate("/about")} size="lg" variant="ghost">
              Explore Fragrances
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#F7F3EE]/55 md:flex"
        initial={{ opacity: 0, y: -12 }}
        transition={{ delay: 1.25, duration: 0.8 }}
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-breathe" />
      </motion.div>
    </section>
  );
}

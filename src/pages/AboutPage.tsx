import { motion } from "framer-motion";
import { timeline } from "@/data/content";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface AboutPageProps {
  navigate: (to: string) => void;
}

export function AboutPage({ navigate }: AboutPageProps) {
  return (
    <main className="bg-[#F7F3EE] text-[#0B0B0B]">
      <section className="relative min-h-[92svh] overflow-hidden bg-[#0B0B0B] px-5 pt-32 text-[#F7F3EE] md:px-10">
        <img alt="VELORA perfume craftsmanship table" className="absolute inset-0 h-full w-full object-cover opacity-58" src="/images/velora-about.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/68 to-transparent" />
        <motion.div
          className="relative mx-auto flex min-h-[calc(92svh-8rem)] max-w-[1440px] items-center"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-3xl">
            <LuxuryBadge>Brand philosophy</LuxuryBadge>
            <h1 className="mt-7 font-serif text-6xl leading-[0.88] tracking-[-0.06em] md:text-8xl lg:text-9xl">Luxury in the pause before recognition.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[#F7F3EE]/70">
              VELORA is a fictional fragrance house built on restraint: fewer notes, better materials, slower gestures, and a trail that feels personal before it feels public.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader copy="A fashion editorial approach to fragrance, where image, texture, and memory share the same composition." eyebrow="The house" title="Composed like cinema. Worn like skin." />
          <div className="grid gap-8 text-lg leading-9 text-[#1A1A1A]/65 md:grid-cols-2">
            <p>
              We begin with a material that already has gravity: oud that feels like night air, amber with candlelit warmth, white florals that open like silk in the sun.
            </p>
            <p>
              Every formula is edited until it earns silence. Projection matters, but so does the final private hour when only the wearer remembers the first spray.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0B0B0B] px-5 py-24 text-[#F7F3EE] md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader dark eyebrow="Timeline" title="A slow house, by design." />
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {timeline.map((item, index) => (
              <motion.div
                className="border-l border-[#C6A56B]/45 pl-6"
                initial={{ opacity: 0, y: 24 }}
                key={item.year}
                transition={{ delay: index * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="font-serif text-5xl tracking-[-0.06em] text-[#C6A56B]">{item.year}</p>
                <h3 className="mt-8 font-serif text-3xl tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#F7F3EE]/58">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <img alt="Luxury atelier ingredients and bottles" className="min-h-[520px] w-full object-cover" loading="lazy" src="/images/velora-editorial.jpg" />
          <div>
            <LuxuryBadge>Craftsmanship</LuxuryBadge>
            <h2 className="mt-6 font-serif text-5xl leading-none tracking-[-0.05em] md:text-7xl">Materials sourced for texture, not novelty.</h2>
            <p className="mt-7 text-lg leading-9 text-[#1A1A1A]/65">
              Our mock atelier sources the emotional vocabulary of perfumery: bitter citrus, rare woods, soft resins, white petals, clean musks, and mineral ambers.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["42", "raw material studies"],
                ["18", "months per formula"],
                ["6", "launch signatures"],
              ].map(([value, label]) => (
                <div className="border-t border-[#0B0B0B]/12 pt-5" key={label}>
                  <p className="font-serif text-5xl tracking-[-0.06em]">{value}</p>
                  <p className="mt-2 text-xs uppercase leading-6 tracking-[0.22em] text-[#1A1A1A]/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1440px] border-y border-[#0B0B0B]/10 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <p className="text-xs uppercase tracking-[0.32em] text-[#C6A56B]">Founder message</p>
            <blockquote className="font-serif text-4xl leading-tight tracking-[-0.05em] md:text-6xl">
              "The most luxurious fragrance is not the loudest. It is the one that makes memory feel tailored."
            </blockquote>
          </div>
          <AnimatedButton className="mt-10" onClick={() => navigate("/shop")} variant="dark">
            Explore collection
          </AnimatedButton>
        </div>
      </section>
    </main>
  );
}

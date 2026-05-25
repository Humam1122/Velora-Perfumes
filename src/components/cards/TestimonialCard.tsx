import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  index: number;
}

export function TestimonialCard({ quote, name, role, index }: TestimonialCardProps) {
  return (
    <motion.article
      className="border border-white/15 bg-white/[0.07] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 36 }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8 flex gap-1 text-[#C6A56B]" aria-label="Five star rating">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star aria-hidden="true" className="h-4 w-4 fill-current" key={starIndex} />
        ))}
      </div>
      <p className="font-serif text-2xl leading-snug tracking-[-0.03em] text-[#F7F3EE]">{quote}</p>
      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-sm uppercase tracking-[0.24em] text-[#F7F3EE]">{name}</p>
        <p className="mt-2 text-sm text-[#F7F3EE]/55">{role}</p>
      </div>
    </motion.article>
  );
}

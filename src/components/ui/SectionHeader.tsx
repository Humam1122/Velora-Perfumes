import { motion } from "framer-motion";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, copy, align = "left", dark = false, className }: SectionHeaderProps) {
  return (
    <motion.header
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
      initial={{ opacity: 0, y: 34 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {eyebrow ? <LuxuryBadge className={align === "center" ? "justify-center" : undefined}>{eyebrow}</LuxuryBadge> : null}
      <h2 className={cn("mt-5 font-serif text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl", dark ? "text-[#F7F3EE]" : "text-[#0B0B0B]")}>{title}</h2>
      {copy ? <p className={cn("mt-5 text-base leading-8 md:text-lg", dark ? "text-[#F7F3EE]/70" : "text-[#1A1A1A]/65")}>{copy}</p> : null}
    </motion.header>
  );
}

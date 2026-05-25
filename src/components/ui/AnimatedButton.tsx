import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/utils/cn";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "ivory" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const variants = {
  gold: "border border-[#C6A56B]/80 bg-[#C6A56B] text-[#0B0B0B] shadow-[0_18px_70px_rgba(198,165,107,0.28)] hover:bg-[#d5b97d]",
  ivory: "border border-[#F7F3EE]/70 bg-[#F7F3EE] text-[#0B0B0B] hover:bg-white",
  ghost: "border border-[#C6A56B]/35 bg-white/5 text-[#F7F3EE] backdrop-blur-md hover:border-[#C6A56B] hover:bg-[#C6A56B]/10",
  dark: "border border-[#0B0B0B] bg-[#0B0B0B] text-[#F7F3EE] hover:bg-[#1A1A1A]",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function AnimatedButton({
  children,
  className,
  variant = "gold",
  size = "md",
  href,
  type = "button",
  ariaLabel,
  disabled = false,
  onClick,
}: AnimatedButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.14);
  };

  const resetMagnet = () => {
    x.set(0);
    y.set(0);
  };

  const sharedClassName = cn(
    "group relative inline-flex overflow-hidden rounded-full uppercase tracking-[0.22em] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        aria-label={ariaLabel}
        className={sharedClassName}
        onClick={onClick}
        onMouseLeave={resetMagnet}
        onMouseMove={handleMouseMove}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.985 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node;
      }}
      aria-label={ariaLabel}
      className={sharedClassName}
      disabled={disabled}
      onClick={onClick}
      onMouseLeave={resetMagnet}
      onMouseMove={handleMouseMove}
      style={{ x: springX, y: springY }}
      type={type}
      whileTap={{ scale: 0.985 }}
    >
      {content}
    </motion.button>
  );
}

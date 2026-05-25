import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 90, damping: 28, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 28, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);

    const move = (event: PointerEvent) => {
      mouseX.set(event.clientX - 160);
      mouseY.set(event.clientY - 160);
    };

    window.addEventListener("pointermove", move);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-80 w-80 rounded-full bg-[#C6A56B]/10 blur-3xl mix-blend-screen"
      style={{ x, y }}
    />
  );
}

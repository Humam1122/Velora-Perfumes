import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LuxuryLoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#0B0B0B] text-[#F7F3EE]"
          exit={{ opacity: 0, y: -24 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative text-center">
            <motion.div
              animate={{ scaleX: 1 }}
              className="absolute -bottom-6 left-1/2 h-px w-40 origin-left -translate-x-1/2 bg-[#C6A56B]"
              initial={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl tracking-[-0.05em] md:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              VELORA
            </motion.p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.45em] text-[#C6A56B]">Fragrance House</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

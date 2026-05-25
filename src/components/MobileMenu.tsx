import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  links: { label: string; href: string }[];
  onClose: () => void;
  navigate: (to: string) => void;
}

export function MobileMenu({ open, links, onClose, navigate }: MobileMenuProps) {
  const handleNavigate = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[85] bg-[#0B0B0B]/96 text-[#F7F3EE] backdrop-blur-xl lg:hidden"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <button className="font-serif text-3xl tracking-[-0.05em]" onClick={() => handleNavigate("/")} type="button">
              VELORA
            </button>
            <button
              aria-label="Close mobile menu"
              className="grid h-11 w-11 place-items-center border border-white/15"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="px-5 pt-12">
            {links.map((link, index) => (
              <motion.button
                animate={{ opacity: 1, y: 0 }}
                className="block w-full border-b border-white/10 py-6 text-left font-serif text-5xl tracking-[-0.06em] text-[#F7F3EE]"
                initial={{ opacity: 0, y: 18 }}
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                type="button"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>
          <p className="absolute bottom-8 left-5 right-5 text-xs uppercase leading-7 tracking-[0.28em] text-[#C6A56B]">
            Crafted for those who leave a lasting impression.
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

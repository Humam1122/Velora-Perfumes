import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { CartItem } from "@/types/product";
import { formatCurrency } from "@/data/products";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  navigate: (to: string) => void;
}

export function CartDrawer({ open, items, subtotal, onClose, onRemove, onQuantityChange, navigate }: CartDrawerProps) {
  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[95]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Close cart" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} type="button" />
          <motion.aside
            animate={{ x: 0 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F7F3EE] p-5 text-[#0B0B0B] shadow-2xl sm:p-7"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[#0B0B0B]/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#C6A56B]">Your ritual</p>
                <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Cart</h2>
              </div>
              <button aria-label="Close cart" className="grid h-11 w-11 place-items-center border border-[#0B0B0B]/10" onClick={onClose} type="button">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto py-6">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto h-10 w-10 text-[#C6A56B]" />
                    <p className="mt-5 font-serif text-3xl tracking-[-0.04em]">Your cart is quiet.</p>
                    <p className="mt-3 text-sm leading-6 text-[#1A1A1A]/60">Begin with a signature from the collection.</p>
                    <AnimatedButton className="mt-7" onClick={handleViewCart} variant="dark">
                      View cart
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div className="grid grid-cols-[5.5rem_1fr] gap-4" key={item.product.id}>
                      <img alt={`${item.product.name} bottle`} className="aspect-[4/5] h-full w-full object-cover" src={item.product.mainImage} />
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-serif text-2xl tracking-[-0.04em]">{item.product.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/48">{item.product.volume}</p>
                          </div>
                          <p className="text-sm font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-[#0B0B0B]/10">
                            <button
                              aria-label={`Decrease ${item.product.name} quantity`}
                              className="grid h-9 w-9 place-items-center"
                              onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
                              type="button"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              aria-label={`Increase ${item.product.name} quantity`}
                              className="grid h-9 w-9 place-items-center"
                              onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
                              type="button"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button className="text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/48 hover:text-[#0B0B0B]" onClick={() => onRemove(item.product.id)} type="button">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#0B0B0B]/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.26em] text-[#1A1A1A]/50">Subtotal</span>
                <span className="font-serif text-3xl tracking-[-0.04em]">{formatCurrency(subtotal)}</span>
              </div>
              <AnimatedButton className="mt-5 w-full justify-center" disabled={items.length === 0} onClick={handleViewCart} variant="dark">
                View cart
              </AnimatedButton>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

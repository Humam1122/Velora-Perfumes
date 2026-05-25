import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { CartItem, Product } from "@/types/product";
import { formatCurrency } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CartPageProps {
  items: CartItem[];
  subtotal: number;
  suggestions: Product[];
  onAddToCart: (product: Product) => void;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  navigate: (to: string) => void;
}

export function CartPage({ items, subtotal, suggestions, onAddToCart, onRemove, onQuantityChange, navigate }: CartPageProps) {
  const shipping = items.length > 0 ? 0 : 0;
  const estimatedTotal = subtotal + shipping;

  return (
    <main className="bg-[#F7F3EE] px-5 pb-24 pt-32 text-[#0B0B0B] md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader copy="A frontend-only cart with local state quantity updates, removals, and subtotal calculation." eyebrow="Cart" title="Your selected rituals." />

        {items.length === 0 ? (
          <div className="mt-16 grid min-h-[360px] place-items-center border border-[#0B0B0B]/10 text-center">
            <div className="p-8">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#C6A56B]" />
              <p className="mt-5 font-serif text-4xl tracking-[-0.04em]">The cart is empty.</p>
              <p className="mt-3 text-sm leading-7 text-[#1A1A1A]/60">Choose a scent that changes the room.</p>
              <AnimatedButton className="mt-8" onClick={() => navigate("/shop")} variant="dark">
                Shop collection
              </AnimatedButton>
            </div>
          </div>
        ) : (
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_24rem]">
            <div className="divide-y divide-[#0B0B0B]/10 border-y border-[#0B0B0B]/10">
              {items.map((item) => (
                <article className="grid gap-5 py-8 md:grid-cols-[9rem_1fr_auto]" key={item.product.id}>
                  <img alt={`${item.product.name} bottle`} className="aspect-[4/5] w-full object-cover md:w-36" src={item.product.mainImage} />
                  <div>
                    <button className="text-left" onClick={() => navigate(`/product/${item.product.slug}`)} type="button">
                      <h2 className="font-serif text-4xl tracking-[-0.05em] transition hover:text-[#8F6F38]">{item.product.name}</h2>
                    </button>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#1A1A1A]/60">{item.product.description}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/45">{item.product.volume}</p>
                    <div className="mt-6 flex w-fit items-center border border-[#0B0B0B]/12">
                      <button
                        aria-label={`Decrease ${item.product.name} quantity`}
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
                        type="button"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.product.name} quantity`}
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
                        type="button"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-6 md:block md:text-right">
                    <p className="font-serif text-3xl tracking-[-0.04em]">{formatCurrency(item.product.price * item.quantity)}</p>
                    <button className="mt-0 text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/45 hover:text-[#0B0B0B] md:mt-10" onClick={() => onRemove(item.product.id)} type="button">
                      <Trash2 className="mr-2 inline h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-[#0B0B0B]/10 p-7 lg:sticky lg:top-28">
              <p className="font-serif text-4xl tracking-[-0.05em]">Order summary</p>
              <div className="mt-7 space-y-4 border-y border-[#0B0B0B]/10 py-6 text-sm text-[#1A1A1A]/65">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Complimentary shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">Total</span>
                <span className="font-serif text-4xl tracking-[-0.05em]">{formatCurrency(estimatedTotal)}</span>
              </div>
              <AnimatedButton className="mt-7 w-full justify-center" variant="dark">
                Proceed to checkout
              </AnimatedButton>
              <p className="mt-4 text-xs leading-6 text-[#1A1A1A]/45">Checkout is intentionally frontend-only in this build.</p>
            </aside>
          </div>
        )}

        <section className="mt-24">
          <SectionHeader copy="A final note to complete the atmosphere." eyebrow="Suggested" title="You may also like." />
          <ProductGrid className="mt-14" navigate={navigate} onAddToCart={onAddToCart} products={suggestions} />
        </section>
      </div>
    </main>
  );
}

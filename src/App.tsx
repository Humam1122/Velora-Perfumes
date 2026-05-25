import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import type { CartItem, Product } from "@/types/product";
import { useRoute } from "@/hooks/useRoute";
import { useSeo } from "@/hooks/useSeo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CursorGlow } from "@/components/visuals/CursorGlow";
import { LuxuryLoadingScreen } from "@/components/visuals/LuxuryLoadingScreen";
import { ScrollProgress } from "@/components/visuals/ScrollProgress";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { CartPage } from "@/pages/CartPage";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

function createSeo(path: string, product?: Product) {
  if (product) {
    return {
      title: `${product.name} | VELORA Luxury Fragrance`,
      description: product.details,
      image: product.mainImage,
    };
  }

  if (path === "/shop") {
    return {
      title: "Shop Luxury Perfumes | VELORA",
      description: "Explore VELORA's premium fragrance catalog with oud, amber, musk, floral, fresh, and woody signatures.",
    };
  }

  if (path === "/about") {
    return {
      title: "About VELORA | Luxury Fragrance House",
      description: "Discover the cinematic philosophy, craftsmanship, and material sourcing behind the fictional VELORA fragrance house.",
      image: "/images/velora-about.jpg",
    };
  }

  if (path === "/contact") {
    return {
      title: "Contact VELORA | Fragrance Concierge",
      description: "Contact the VELORA atelier for fragrance guidance, gifting questions, and luxury scent concierge support.",
      image: "/images/velora-contact.jpg",
    };
  }

  if (path === "/cart") {
    return {
      title: "Cart | VELORA",
      description: "Review selected VELORA luxury fragrances in a frontend-only cart experience.",
    };
  }

  return {
    title: "VELORA | Luxury Perfume House",
    description: "A cinematic luxury perfume e-commerce frontend for VELORA, a fictional fragrance house of rare woods, amber, musk, and florals.",
  };
}

export default function App() {
  const { path, navigate } = useRoute();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const productSlug = path.match(/^\/product\/([^/]+)/)?.[1];
  const selectedProduct = productSlug ? getProductBySlug(productSlug) : undefined;
  const seo = createSeo(path, selectedProduct);
  useSeo(seo);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  );
  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const suggestions = useMemo(() => products.filter((product) => product.bestSeller).slice(0, 3), []);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
      }

      return [...items, { product, quantity }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) => {
      if (quantity <= 0) return items.filter((item) => item.product.id !== productId);
      return items.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const page = (() => {
    if (path === "/") {
      return <HomePage navigate={navigate} onAddToCart={addToCart} products={products} />;
    }

    if (path === "/shop") {
      return <ShopPage navigate={navigate} onAddToCart={addToCart} products={products} />;
    }

    if (productSlug) {
      return <ProductDetailsPage navigate={navigate} onAddToCart={addToCart} product={selectedProduct} products={products} />;
    }

    if (path === "/about") {
      return <AboutPage navigate={navigate} />;
    }

    if (path === "/contact") {
      return <ContactPage />;
    }

    if (path === "/cart") {
      return (
        <CartPage
          items={cartItems}
          navigate={navigate}
          onAddToCart={addToCart}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
          subtotal={subtotal}
          suggestions={suggestions}
        />
      );
    }

    return (
      <main className="grid min-h-screen place-items-center bg-[#F7F3EE] px-5 text-center text-[#0B0B0B]">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#C6A56B]">404</p>
          <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">This page has evaporated.</h1>
          <AnimatedButton className="mt-8" onClick={() => navigate("/")} variant="dark">
            Return home
          </AnimatedButton>
        </div>
      </main>
    );
  })();

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#0B0B0B] selection:bg-[#C6A56B] selection:text-[#0B0B0B]">
      <LuxuryLoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar cartCount={cartCount} currentPath={path} navigate={navigate} onCartOpen={() => setCartOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: 18 }}
          initial={{ opacity: 0, filter: "blur(8px)", y: 18 }}
          key={path}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <Footer navigate={navigate} />
      <CartDrawer
        items={cartItems}
        navigate={navigate}
        onClose={() => setCartOpen(false)}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
        open={cartOpen}
        subtotal={subtotal}
      />
    </div>
  );
}

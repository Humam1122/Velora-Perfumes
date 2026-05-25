import { Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/utils/cn";

interface NavbarProps {
  currentPath: string;
  cartCount: number;
  onCartOpen: () => void;
  navigate: (to: string) => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ currentPath, cartCount, onCartOpen, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomeTop = currentPath === "/" && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const linkClass = (href: string) =>
    cn(
      "relative text-[0.7rem] uppercase tracking-[0.28em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[#C6A56B] after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100",
      isHomeTop ? "text-[#F7F3EE]/78 hover:text-white" : "text-[#0B0B0B]/66 hover:text-[#0B0B0B]",
      (currentPath === href || (href !== "/" && currentPath.startsWith(href))) && "text-[#C6A56B] after:origin-left after:scale-x-100",
    );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-[80] transition-all duration-500",
          scrolled || currentPath !== "/"
            ? "border-b border-[#0B0B0B]/10 bg-[#F7F3EE]/82 shadow-[0_18px_60px_rgba(11,11,11,0.08)] backdrop-blur-2xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            className={cn(
              "font-serif text-3xl tracking-[-0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]",
              isHomeTop ? "text-[#F7F3EE]" : "text-[#0B0B0B]",
            )}
            onClick={() => navigate("/")}
            type="button"
          >
            VELORA
          </button>

          <nav aria-label="Primary navigation" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <button className={linkClass(link.href)} key={link.href} onClick={() => navigate(link.href)} type="button">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search fragrances"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]",
                isHomeTop ? "text-[#F7F3EE] hover:bg-white/10" : "text-[#0B0B0B] hover:bg-[#0B0B0B]/5",
              )}
              onClick={() => navigate("/shop")}
              type="button"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="Open cart"
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]",
                isHomeTop ? "text-[#F7F3EE] hover:bg-white/10" : "text-[#0B0B0B] hover:bg-[#0B0B0B]/5",
              )}
              onClick={onCartOpen}
              type="button"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#C6A56B] px-1 text-[0.65rem] font-semibold text-[#0B0B0B]">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <button
              aria-label="Open mobile menu"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B] lg:hidden",
                isHomeTop ? "text-[#F7F3EE] hover:bg-white/10" : "text-[#0B0B0B] hover:bg-[#0B0B0B]/5",
              )}
              onClick={() => setMenuOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu links={navLinks} navigate={navigate} onClose={() => setMenuOpen(false)} open={menuOpen} />
    </>
  );
}

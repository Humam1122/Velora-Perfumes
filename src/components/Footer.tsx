import { Camera, Mail, MessageCircle } from "lucide-react";

interface FooterProps {
  navigate: (to: string) => void;
}

const columns = [
  { title: "House", links: [{ label: "Collection", href: "/shop" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] },
  { title: "Service", links: [{ label: "Cart", href: "/cart" }, { label: "Care", href: "/contact" }, { label: "FAQ", href: "/contact" }] },
];

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-[#0B0B0B] px-5 py-16 text-[#F7F3EE] md:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <button className="font-serif text-5xl tracking-[-0.06em]" onClick={() => navigate("/")} type="button">
            VELORA
          </button>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#F7F3EE]/58">
            A fictional luxury fragrance house composing intimate signatures from rare woods, luminous florals, and quiet amber.
          </p>
          <div className="mt-8 flex gap-3">
            {[
              { icon: Camera, label: "Social feed" },
              { icon: MessageCircle, label: "Concierge chat" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <a
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#F7F3EE]/70 transition hover:border-[#C6A56B] hover:text-[#C6A56B]"
                href="mailto:atelier@velora.example"
                key={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs uppercase tracking-[0.32em] text-[#C6A56B]">{column.title}</p>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <button
                  className="w-fit text-sm text-[#F7F3EE]/62 transition hover:text-[#F7F3EE]"
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  type="button"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs uppercase tracking-[0.22em] text-[#F7F3EE]/42 md:flex-row">
        <p>(c) 2026 VELORA. Frontend concept.</p>
        <p>Luxury fragrance e-commerce prototype.</p>
      </div>
    </footer>
  );
}

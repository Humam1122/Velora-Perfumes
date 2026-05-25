import { FormEvent, useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { faqs } from "@/data/content";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-[#F7F3EE] text-[#0B0B0B]">
      <section className="relative min-h-[78svh] overflow-hidden bg-[#0B0B0B] px-5 pt-32 text-[#F7F3EE] md:px-10">
        <img alt="VELORA luxury fragrance boutique interior" className="absolute inset-0 h-full w-full object-cover opacity-55" src="/images/velora-contact.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/72 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(78svh-8rem)] max-w-[1440px] items-center">
          <div className="max-w-3xl">
            <LuxuryBadge>Concierge</LuxuryBadge>
            <h1 className="mt-7 font-serif text-6xl leading-[0.88] tracking-[-0.06em] md:text-8xl">An intimate line to the atelier.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#F7F3EE]/70">
              Questions about notes, rituals, gifting, or the quiet confidence of a signature scent begin here.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeader copy="This prototype does not submit to a backend, but the form is fully accessible and ready for integration." eyebrow="Contact form" title="Write to VELORA." />
            <form className="mt-12 grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">Name</span>
                  <input className="w-full border-b border-[#0B0B0B]/20 bg-transparent py-4 outline-none transition focus:border-[#C6A56B]" required type="text" />
                </label>
                <label className="block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">Email</span>
                  <input className="w-full border-b border-[#0B0B0B]/20 bg-transparent py-4 outline-none transition focus:border-[#C6A56B]" required type="email" />
                </label>
              </div>
              <label className="block">
                <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">Subject</span>
                <input className="w-full border-b border-[#0B0B0B]/20 bg-transparent py-4 outline-none transition focus:border-[#C6A56B]" required type="text" />
              </label>
              <label className="block">
                <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">Message</span>
                <textarea className="min-h-40 w-full resize-y border-b border-[#0B0B0B]/20 bg-transparent py-4 outline-none transition focus:border-[#C6A56B]" required />
              </label>
              <AnimatedButton className="w-fit" type="submit" variant="dark">
                Send message
                <Send aria-hidden="true" className="h-4 w-4" />
              </AnimatedButton>
              {sent ? <p className="text-sm text-[#8F6F38]">Message staged. Connect a backend to deliver it.</p> : null}
            </form>
          </div>

          <aside className="space-y-8 lg:pt-24">
            <div className="border border-[#0B0B0B]/10 p-7">
              <p className="font-serif text-3xl tracking-[-0.04em]">Atelier information</p>
              <div className="mt-7 space-y-5 text-sm leading-7 text-[#1A1A1A]/65">
                {[
                  { icon: MapPin, text: "18 Rue Imaginaire, Paris" },
                  { icon: Mail, text: "atelier@velora.example" },
                  { icon: Phone, text: "+33 1 00 00 00 00" },
                  { icon: Clock, text: "Mon to Sat, 10:00 to 19:00" },
                ].map(({ icon: Icon, text }) => (
                  <p className="flex items-center gap-3" key={text}>
                    <Icon className="h-4 w-4 text-[#C6A56B]" />
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border border-[#0B0B0B]/10 p-7">
              <p className="font-serif text-3xl tracking-[-0.04em]">Social concierge</p>
              <div className="mt-6 flex gap-3">
                {[
                  { label: "Message", icon: MessageCircle },
                  { label: "Email", icon: Mail },
                  { label: "Visit", icon: MapPin },
                ].map(({ label, icon: Icon }) => (
                  <a
                    className="grid h-12 w-12 place-items-center rounded-full border border-[#0B0B0B]/10 text-[#0B0B0B] transition hover:border-[#C6A56B] hover:text-[#C6A56B]"
                    href="mailto:atelier@velora.example"
                    key={label}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader copy="A few answers before the first spray." eyebrow="FAQ" title="Frequently asked questions." />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid min-h-[420px] max-w-[1440px] place-items-center overflow-hidden border border-[#0B0B0B]/10 bg-[#0B0B0B] text-center text-[#F7F3EE]">
          <div className="absolute h-[1px] w-full bg-[#C6A56B]/25" />
          <div className="absolute h-full w-[1px] bg-[#C6A56B]/25" />
          <div className="relative p-8">
            <MapPin className="mx-auto h-10 w-10 text-[#C6A56B]" />
            <p className="mt-5 font-serif text-5xl tracking-[-0.05em]">Google Maps Placeholder</p>
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[#F7F3EE]/50">VELORA Paris Atelier</p>
          </div>
        </div>
      </section>
    </main>
  );
}

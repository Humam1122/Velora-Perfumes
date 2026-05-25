import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] px-5 py-24 text-[#F7F3EE] md:px-10 md:py-32">
      <img
        alt="Golden fragrance haze"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        loading="lazy"
        src="/images/velora-banner.jpg"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,165,107,0.22),transparent_38%),linear-gradient(90deg,rgba(11,11,11,0.95),rgba(11,11,11,0.72))]" />
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs uppercase tracking-[0.36em] text-[#C6A56B]">Private notes</p>
        <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">Receive the next ritual first.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#F7F3EE]/68">
          Seasonal launches, intimate atelier letters, and early access to limited extrait editions.
        </p>
        <form className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            className="min-h-14 flex-1 border border-white/20 bg-white/10 px-5 text-sm text-[#F7F3EE] outline-none backdrop-blur-md transition placeholder:text-[#F7F3EE]/45 focus:border-[#C6A56B]"
            id="newsletter-email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            required
            type="email"
            value={email}
          />
          <button
            className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#C6A56B] px-7 text-xs font-medium uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#d5b97d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
            type="submit"
          >
            Subscribe
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </form>
        {submitted ? <p className="mt-5 text-sm text-[#C6A56B]">You are on the private list.</p> : null}
      </motion.div>
    </section>
  );
}

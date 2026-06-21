"use client";

import { useState } from "react";
import Image from "next/image";
import { LOCATION, SITE, PEOPLE, IMAGES } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    contactPerson: PEOPLE.owners[0].name as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Unable to send your message.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        label="Contact Us"
        title="Let's Build Something Together"
        description="Visit our Uttam Nagar showroom, call Amit or Gaurav Gupta directly, or send us a message."
        image={IMAGES.heroWood}
      />

      <section className="section-padding w-full max-w-full overflow-x-clip pt-12">
        <div className="mx-auto grid w-full min-w-0 max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="min-w-0">
            <p className="section-label">Send a Message</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-wood-dark">
              Get In Touch
            </h2>

            {submitted ? (
              <div className="mt-10 border border-wood-gold/30 bg-wood-cream p-12 text-center">
                <p className="font-display text-3xl text-wood-dark">Thank You!</p>
                <p className="mt-4 text-wood-dark/60">
                  We&apos;ve received your message and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 min-w-0 space-y-6">
                {error && (
                  <div className="border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
                    {error}
                  </div>
                )}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-wood-medium">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="min-w-0 w-full border border-wood-dark/15 bg-white px-5 py-4 text-wood-dark outline-none transition focus:border-wood-gold"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid min-w-0 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-wood-medium">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="min-w-0 w-full max-w-full border border-wood-dark/15 bg-white px-5 py-4 outline-none transition focus:border-wood-gold"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-wood-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="min-w-0 w-full max-w-full border border-wood-dark/15 bg-white px-5 py-4 outline-none transition focus:border-wood-gold"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-wood-medium">
                    Contact Person
                  </label>
                  <select
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    className="min-w-0 w-full max-w-full border border-wood-dark/15 bg-white px-5 py-4 text-sm outline-none transition focus:border-wood-gold sm:text-base"
                  >
                    {PEOPLE.owners.map((o) => (
                      <option key={o.name} value={o.name}>
                        {o.name} — {o.phone}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-wood-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="min-w-0 w-full resize-none border border-wood-dark/15 bg-white px-5 py-4 outline-none transition focus:border-wood-gold"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                <button type="submit" className="btn-primary disabled:opacity-60" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.15} direction="right" className="min-w-0 overflow-hidden">
            <div className="min-w-0 space-y-8">
              <div className="relative h-48 w-full overflow-hidden bg-wood-cream">
                <Image
                  src={IMAGES.contactShowroom}
                  alt="Garg Plywood Palace — Proud BNI Member"
                  fill
                  className="object-contain"
                  sizes="600px"
                />
              </div>

              <div className="bg-wood-dark p-6 text-wood-cream md:p-10">
                <p className="section-label">Quick Contact</p>
                <ul className="mt-8 space-y-6">
                  {PEOPLE.owners.map((o) => (
                    <li key={o.name}>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-wood-cream/40">
                        {o.name}
                      </p>
                      <a
                        href={`tel:${o.tel}`}
                        className="font-display text-xl break-all text-wood-gold hover:underline sm:text-2xl"
                      >
                        {o.phone}
                      </a>
                    </li>
                  ))}
                  <li>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-wood-cream/40">
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="break-all text-wood-gold hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-wood-cream/40">
                      Hours
                    </p>
                    <p>{SITE.hours}</p>
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !border-green-700 !bg-green-700 hover:!bg-green-600"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${LOCATION.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-light"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="border border-wood-dark/10 p-6 md:p-10">
                <h3 className="font-display text-xl font-semibold text-wood-dark">
                  {LOCATION.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-wood-dark/60">
                  {LOCATION.fullAddress}
                </p>
                <p className="mt-2 text-xs text-wood-medium">{LOCATION.landmark}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

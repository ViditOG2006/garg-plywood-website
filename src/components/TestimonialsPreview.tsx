"use client";

import Link from "next/link";
import { TESTIMONIALS, BRANDS } from "@/lib/constants";
import ClientLettersGallery from "./ClientLettersGallery";
import Reveal, { StaggerContainer, StaggerItem } from "./Reveal";

export default function TestimonialsPreview() {
  const preview = TESTIMONIALS.slice(0, 3);

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">Testimonials</p>
            <h2 className="font-display mt-4 text-4xl font-semibold text-ink md:text-5xl">
              Trusted by Industry Leaders
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/testimonials" className="btn-outline">
              All Testimonials
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <ClientLettersGallery
              variant="compact"
              compactSizes="(max-width: 1024px) 100vw, 440px"
            />
          </Reveal>

          <StaggerContainer className="grid gap-6 lg:col-span-2 md:grid-cols-2">
            {preview.map((t) => (
              <StaggerItem key={t.id}>
                <article className="card-luxury flex h-full flex-col p-8">
                  <div className="mb-4 flex gap-1 text-wood-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-ink/65">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-ink/8 pt-6">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-wood-medium">{t.role}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-padding !py-0">
      <Reveal>
        <div className="relative mx-auto max-w-[1400px] overflow-hidden">
          <div className="relative bg-wood-dark px-8 py-20 md:px-16 md:py-28">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,169,98,0.3) 60px, rgba(201,169,98,0.3) 61px)`,
              }}
            />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="section-label">Get Started</p>
              <h2 className="font-display mt-4 text-4xl font-semibold text-wood-cream md:text-5xl">
                Ready to Build Something
                <span className="italic text-wood-gold"> Extraordinary?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-wood-cream/60">
                Visit our Uttam Nagar showroom or call us for expert advice, bulk pricing, and
                the finest selection of plywood and interior materials.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-5">
                <Link href="/contact" className="btn-primary !border-wood-gold !bg-wood-gold !text-wood-deep hover:!bg-surface">
                  Contact Us Today
                </Link>
                <Link href="/products" className="btn-outline-light">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function BrandsMarquee() {
  return (
    <section className="w-full max-w-full overflow-x-clip border-y border-ink/5 bg-surface-elevated py-10">
      <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.45em] text-wood-medium">
        Authorized Dealer For Leading Brands
      </p>
      <div className="marquee-container">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((brand: string, i: number) => (
            <span
              key={i}
              className="mx-8 shrink-0 font-display text-2xl text-wood-medium transition-colors duration-300 hover:text-ink sm:mx-12 sm:text-3xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Reveal, { StaggerContainer, StaggerItem } from "./Reveal";
import { PEOPLE, SITE, IMAGES, SUCCESS_PILLARS } from "@/lib/constants";

export default function LegacySection() {
  return (
    <section className="section-padding bg-wood-cream">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left">
            <p className="section-label">Our Legacy</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight text-wood-dark md:text-5xl lg:text-6xl">
              Built on Quality.
              <br />
              <span className="italic text-wood-medium">Driven by Trust.</span>
            </h2>
            <p className="mt-8 leading-relaxed text-wood-dark/65">
              Garg Plywood Palace was started in {SITE.founded} in Uttam Nagar, New Delhi, as a
              family-owned venture dedicated to providing superior plywood and timber. For nearly
              four decades, we have nurtured long-term client relationships and grown into a
              trusted name in the industry.
            </p>

            <div className="mt-12 space-y-8 border-l border-wood-gold/40 pl-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
                  Founder
                </p>
                <p className="font-display mt-2 text-2xl text-wood-dark">{PEOPLE.founder}</p>
                <p className="mt-1 text-sm text-wood-dark/50">
                  Visionary who laid the foundation of trust and quality
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
                  Current Leadership
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {PEOPLE.owners.map((owner) => (
                    <div
                      key={owner.name}
                      className="border border-wood-dark/10 bg-white px-6 py-4"
                    >
                      <p className="font-display text-xl text-wood-dark">{owner.name}</p>
                      <a
                        href={`tel:${owner.tel}`}
                        className="mt-1 block text-sm text-wood-medium hover:text-wood-gold"
                      >
                        {owner.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={IMAGES.gallery[1]}
                  alt="Premium interior built with quality plywood materials"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden border border-wood-gold/30 bg-wood-dark p-8 md:block">
                <p className="font-display text-5xl font-semibold text-wood-gold">40+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-wood-cream/60">
                  Years of Excellence
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <StaggerContainer className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUCCESS_PILLARS.map((pillar) => (
            <StaggerItem key={pillar.label}>
              <div className="card-luxury p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-wood-gold/30">
                  <span className="font-display text-xl text-wood-gold">
                    {pillar.icon === "handshake"
                      ? "🤝"
                      : pillar.icon === "building"
                        ? "🏢"
                        : pillar.icon === "interior"
                          ? "✦"
                          : "🚚"}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.15em] text-wood-dark/70">
                  {pillar.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

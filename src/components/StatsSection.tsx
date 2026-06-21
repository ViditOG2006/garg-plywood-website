"use client";

import { WHY_CHOOSE } from "@/lib/constants";
import Reveal, { StaggerContainer, StaggerItem } from "./Reveal";

const icons: Record<string, string> = {
  shield: "◆",
  layers: "☰",
  tag: "◈",
  truck: "→",
  users: "◎",
  award: "★",
};

export default function WhyChooseSection() {
  return (
    <section className="section-padding bg-wood-deep text-wood-cream">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="section-label">Why Choose Us</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold md:text-5xl">
            {`Quality You Trust,`}
            <br />
            <span className="italic text-wood-gold">Service You Deserve</span>
          </h2>
        </Reveal>

        <StaggerContainer className="mt-20 grid gap-px bg-wood-gold/20 md:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group h-full bg-wood-deep p-10 transition-colors duration-500 hover:bg-wood-dark">
                <span className="font-display text-3xl text-wood-gold">
                  {icons[item.icon] || "◆"}
                </span>
                <h3 className="font-display mt-8 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-wood-cream/55">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function StatsStrip() {
  return null;
}

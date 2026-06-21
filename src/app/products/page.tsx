"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/Reveal";
import { IMAGES } from "@/lib/constants";

const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader
        label="Products"
        title="Our Product Range"
        description="From plywood and block boards to laminates, timber, HDHMR, veneers, louvers, mouldings, and adhesives — everything for your project under one roof."
        image={IMAGES.heroWood}
      />

      <section className="section-padding pt-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all ${
                    activeCategory === cat
                      ? "bg-wood-dark text-wood-cream"
                      : "border border-wood-dark/15 text-wood-dark/60 hover:border-wood-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <StaggerContainer
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            key={activeCategory}
          >
            {filtered.map((product, i) => (
              <StaggerItem key={product.id}>
                <article className="card-luxury group overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-deep/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.3em] text-wood-gold">
                      0{i + 1} · {product.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <h2 className="font-display text-2xl font-semibold text-wood-dark">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-wood-dark/60">
                      {product.description}
                    </p>
                    <ul className="mt-6 space-y-2 border-t border-wood-dark/8 pt-6">
                      {product.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs text-wood-medium"
                        >
                          <span className="text-wood-gold">◆</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

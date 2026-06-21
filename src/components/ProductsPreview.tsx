"use client";

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import Reveal, { StaggerContainer, StaggerItem } from "./Reveal";

export default function ProductsPreview() {
  const preview = PRODUCTS;

  return (
    <section className="section-padding bg-surface-elevated">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <p className="section-label">Our Products</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold text-ink md:text-5xl">
              Premium Materials for Every Project
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((product, i) => (
            <StaggerItem key={product.id}>
              <Link href="/products" className="group block">
                <article className="card-luxury overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-deep/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.3em] text-wood-gold">
                      0{i + 1} · {product.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-wood-medium">
                      {product.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/55">
                      {product.description}
                    </p>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

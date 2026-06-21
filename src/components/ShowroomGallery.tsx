"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { IMAGES } from "@/lib/constants";

export default function ShowroomGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const images = IMAGES.gallery.map((src, i) => ({
    src,
    alt: [
      "Plywood sheets stacked in warehouse",
      "Modular kitchen with premium wood finish",
      "Custom wardrobe interior",
      "Modern living room with wood paneling",
      "Hardwood timber and lumber",
      "Elegant interior with wood craftsmanship",
    ][i],
  }));

  return (
    <section ref={containerRef} className="overflow-hidden bg-wood-dark py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 xl:px-32">
        <Reveal>
          <p className="section-label">Our Showroom</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-4xl font-semibold text-wood-cream md:text-5xl">
              Where Quality Meets
              <span className="italic text-wood-gold"> Craftsmanship</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-wood-cream/55">
              Visit our Uttam Nagar showroom to explore an extensive inventory of plywood, boards,
              laminates, timber, and hardware — all under one roof.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 w-full overflow-hidden">
        <motion.div style={{ x }} className="flex w-max gap-6 px-6 md:px-12">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-[320px] w-[280px] flex-shrink-0 overflow-hidden md:h-[420px] md:w-[360px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-deep/50 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

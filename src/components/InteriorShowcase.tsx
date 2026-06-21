"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { IMAGES } from "@/lib/constants";

const Interior3D = dynamic(() => import("./Interior3D"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[520px] items-center justify-center bg-wood-deep md:min-h-[640px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin rounded-full border border-wood-gold/30 border-t-wood-gold" />
          <div className="absolute inset-2 rounded-full border border-wood-gold/10" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-wood-cream/50">
          Loading 3D Experience
        </p>
      </div>
    </div>
  ),
});

const FEATURES = [
  "Modular kitchen cabinets & countertops",
  "Custom wardrobes with internal shelving",
  "Dining tables & accent furniture",
  "Wall paneling & decorative elements",
];

const GALLERY_PHOTOS = [
  { src: IMAGES.gallery[1], alt: "Premium plywood kitchen interior", label: "Modular Kitchen" },
  { src: IMAGES.gallery[2], alt: "Custom plywood wardrobe interior", label: "Custom Wardrobe" },
  { src: IMAGES.gallery[3], alt: "Elegant plywood living space", label: "Living Space" },
] as const;

type ViewMode = "3d" | "gallery";

function GalleryView({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const photo = GALLERY_PHOTOS[activeIndex];

  return (
    <div ref={ref} className="relative h-full min-h-[520px] w-full md:min-h-[640px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeIndex === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-wood-deep/85 via-wood-deep/15 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 z-10 md:bottom-8 md:left-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-wood-gold/90">Real Interiors</p>
        <p className="font-display mt-1 text-lg text-wood-cream md:text-xl">{photo.label}</p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2 md:bottom-8 md:right-8">
        {GALLERY_PHOTOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`View ${GALLERY_PHOTOS[i].label}`}
            className={`h-1 transition-all duration-500 ${
              i === activeIndex ? "w-8 bg-wood-gold" : "w-4 bg-wood-cream/30 hover:bg-wood-cream/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function InteriorShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <section className="section-padding overflow-hidden bg-wood-cream">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <p className="section-label">3D Interior Preview</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight text-wood-dark md:text-5xl lg:text-[3.25rem]">
              See What Our Plywood
              <span className="italic text-wood-medium"> Can Create</span>
            </h2>
            <p className="mt-8 max-w-lg leading-relaxed text-wood-dark/60">
              From modular kitchens to elegant wardrobes and dining spaces — our premium plywood
              transforms into beautiful, durable interiors. Drag to explore the interactive 3D scene,
              or browse real project photography built with Garg Plywood Palace materials.
            </p>

            <ul className="mt-10 space-y-4">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm text-wood-dark/75">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-wood-gold/40 text-wood-gold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              {GALLERY_PHOTOS.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => {
                    setGalleryIndex(i);
                    setViewMode("gallery");
                  }}
                  className="group relative h-16 w-20 overflow-hidden border border-wood-dark/10 transition-all hover:border-wood-gold/50"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                  <div className="absolute inset-0 bg-wood-dark/20 transition-colors group-hover:bg-transparent" />
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-sm bg-gradient-to-br from-wood-gold/25 via-wood-gold/8 to-wood-gold/20 md:-inset-4" />

              <div className="card-luxury relative overflow-hidden border-wood-gold/30 shadow-2xl shadow-wood-dark/15">
                <div className="absolute right-4 top-4 z-30 flex gap-1 border border-wood-gold/25 bg-wood-deep/85 p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setViewMode("3d")}
                    className={`px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                      viewMode === "3d"
                        ? "bg-wood-gold text-wood-deep"
                        : "text-wood-cream/60 hover:text-wood-cream"
                    }`}
                  >
                    Explore 3D
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("gallery")}
                    className={`px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                      viewMode === "gallery"
                        ? "bg-wood-gold text-wood-deep"
                        : "text-wood-cream/60 hover:text-wood-cream"
                    }`}
                  >
                    Photos
                  </button>
                </div>

                <div className="relative min-h-[520px] md:min-h-[640px]">
                  <AnimatePresence mode="wait">
                    {viewMode === "3d" ? (
                      <motion.div
                        key="3d"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="absolute inset-0"
                      >
                        <Interior3D
                          resetTrigger={resetTrigger}
                          fallbackImage={GALLERY_PHOTOS[0].src}
                          fallbackAlt={GALLERY_PHOTOS[0].alt}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="absolute inset-0"
                      >
                        <GalleryView activeIndex={galleryIndex} onSelect={setGalleryIndex} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-wood-gold/45" />
                <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-wood-gold/45" />
              </div>

              <div className="absolute -right-2 -top-4 hidden border border-wood-gold/35 bg-wood-dark px-5 py-4 md:block lg:-right-6">
                <p className="font-display text-2xl font-semibold text-wood-gold">360°</p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-wood-cream/55">
                  Interactive View
                </p>
              </div>

              {viewMode === "3d" && (
                <button
                  type="button"
                  onClick={() => setResetTrigger((n) => n + 1)}
                  className="absolute -bottom-10 right-0 hidden text-[10px] uppercase tracking-[0.3em] text-wood-dark/45 transition-colors hover:text-wood-gold md:block"
                >
                  Reset 3D View
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

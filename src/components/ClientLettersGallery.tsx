"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLIENT_LETTERS } from "@/lib/constants";

type ClientLettersGalleryProps = {
  variant?: "compact" | "full";
  compactSizes?: string;
  fullSizes?: string;
};

export default function ClientLettersGallery({
  variant = "compact",
  compactSizes = "(max-width: 1024px) 100vw, 440px",
  fullSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 320px",
}: ClientLettersGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback(() => {
    setActive((i) => (i === 0 ? CLIENT_LETTERS.length - 1 : i - 1));
  }, []);

  const showNext = useCallback(() => {
    setActive((i) => (i === CLIENT_LETTERS.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") setLightbox((i) => (i === null || i === 0 ? CLIENT_LETTERS.length - 1 : i - 1));
      if (event.key === "ArrowRight") setLightbox((i) => (i === null || i === CLIENT_LETTERS.length - 1 ? 0 : i + 1));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, closeLightbox]);

  if (variant === "full") {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-3">
          {CLIENT_LETTERS.map((letter, index) => (
            <button
              key={letter.src}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative aspect-[3/4] overflow-hidden border border-wood-gold/20 bg-wood-cream transition-colors hover:border-wood-gold/50"
              aria-label={`View ${letter.client} recommendation letter`}
            >
              <Image
                src={letter.src}
                alt={letter.alt}
                fill
                quality={90}
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                sizes={fullSizes}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wood-dark/80 to-transparent px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-wood-cream opacity-0 transition-opacity group-hover:opacity-100">
                {letter.client}
              </span>
            </button>
          ))}
        </div>

        <Lightbox index={lightbox} onClose={closeLightbox} onChange={setLightbox} />
      </>
    );
  }

  const letter = CLIENT_LETTERS[active];

  return (
    <>
      <div className="flex h-full flex-col border border-wood-dark/10 bg-white">
        <button
          type="button"
          onClick={() => openLightbox(active)}
          className="group relative min-h-[420px] flex-1 overflow-hidden"
          aria-label={`View ${letter.client} recommendation letter`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={letter.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={letter.src}
                alt={letter.alt}
                fill
                quality={90}
                priority={active === 0}
                className="object-contain p-3"
                sizes={compactSizes}
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wood-dark/70 to-transparent px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-wood-cream opacity-0 transition-opacity group-hover:opacity-100">
            Click to enlarge
          </span>
        </button>

        <div className="flex items-center justify-between border-t border-wood-dark/8 px-4 py-3">
          <button
            type="button"
            onClick={showPrev}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-wood-medium transition-colors hover:text-wood-dark"
            aria-label="Previous letter"
          >
            Prev
          </button>
          <div className="flex gap-2">
            {CLIENT_LETTERS.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === active ? "bg-wood-gold" : "bg-wood-dark/20 hover:bg-wood-dark/40"
                }`}
                aria-label={`Show ${item.client} letter`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={showNext}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-wood-medium transition-colors hover:text-wood-dark"
            aria-label="Next letter"
          >
            Next
          </button>
        </div>
        <p className="border-t border-wood-dark/8 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-wood-medium">
          {letter.client}
        </p>
      </div>

      <Lightbox index={lightbox} onClose={closeLightbox} onChange={setLightbox} />
    </>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  if (index === null) return null;

  const letter = CLIENT_LETTERS[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-wood-deep/95 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Recommendation letter viewer"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-sm font-bold uppercase tracking-[0.25em] text-wood-cream/70 transition-colors hover:text-wood-cream"
      >
        Close
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onChange(index === 0 ? CLIENT_LETTERS.length - 1 : index - 1);
        }}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-2xl text-wood-cream/70 transition-colors hover:text-wood-cream"
        aria-label="Previous letter"
      >
        ‹
      </button>

      <div
        className="relative h-[85vh] w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={letter.src}
          alt={letter.alt}
          fill
          quality={95}
          className="object-contain"
          sizes="768px"
          priority
        />
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onChange(index === CLIENT_LETTERS.length - 1 ? 0 : index + 1);
        }}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-2xl text-wood-cream/70 transition-colors hover:text-wood-cream"
        aria-label="Next letter"
      >
        ›
      </button>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-wood-cream/60">
        {letter.client}
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./Reveal";
import { SITE, IMAGES, STATS } from "@/lib/constants";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[88dvh] w-full max-w-full overflow-hidden bg-wood-deep md:min-h-screen">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={IMAGES.heroWood}
          alt="Premium plywood texture"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-vignette absolute inset-0" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex min-h-[88dvh] flex-col justify-center px-6 pb-14 pt-32 md:min-h-screen md:justify-end md:pb-16 md:pt-36 md:px-12 lg:px-20 xl:px-32"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-7 flex items-center gap-4 md:mb-8"
          >
            <div className="line-accent" />
            <p className="section-label !text-wood-gold">
              Est. {SITE.founded} · Uttam Nagar, New Delhi
            </p>
          </motion.div>

          <h1 className="max-w-5xl font-display text-[clamp(2.35rem,8.2vw,7rem)] font-semibold leading-[0.97] tracking-tight text-wood-cream md:text-[clamp(2.5rem,9vw,7rem)] md:leading-[0.95]">
            <TextReveal text="Strong Foundations," delay={0.4} animateOnMount />
            <br />
            <span className="font-medium italic">
              <TextReveal
                text="Beautiful Creations"
                delay={0.65}
                animateOnMount
                wordClassName="text-gradient-gold"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-4 font-display text-base italic text-wood-gold/85 md:mt-4 md:text-xl md:text-wood-gold/90"
          >
            {SITE.subtagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-6 max-w-md text-[15px] leading-[1.7] text-wood-cream/70 md:mt-8 md:max-w-xl md:text-lg md:leading-relaxed md:text-wood-cream/75"
          >
            Wholesale & retail plywood, block boards, laminates, timber &amp; HDHMR — trusted by
            architects, builders, and homeowners across Delhi NCR since {SITE.founded}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-9 flex flex-wrap gap-3.5 md:mt-12 md:gap-5"
          >
            <Link href="/products" className="btn-primary !border-wood-gold/60 !bg-wood-gold/15 hover:!bg-wood-gold/25">
              Explore Products
            </Link>
            <Link href="/contact" className="btn-outline-light">
              Get Free Quote
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-10 hidden grid-cols-2 gap-px border border-wood-gold/20 bg-wood-gold/20 md:mt-20 md:grid md:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-wood-deep/60 px-6 py-8 backdrop-blur-md"
              >
                <p className="font-display text-3xl font-semibold text-wood-gold md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-wood-cream/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 md:flex"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-wood-cream/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-16 w-px origin-top bg-wood-gold/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

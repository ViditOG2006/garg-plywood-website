"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "./Reveal";
import { SITE, IMAGES, STATS } from "@/lib/constants";

const HERO_STATS = STATS.slice(0, 3);

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
    <section ref={ref} className="relative min-h-[88dvh] overflow-hidden bg-wood-deep md:min-h-screen">
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
        className="relative z-10 flex min-h-[88dvh] flex-col justify-center px-6 pb-10 pt-28 md:min-h-screen md:justify-end md:pb-16 md:pt-36 md:px-12 lg:px-20 xl:px-32"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-5 flex items-center gap-4 md:mb-8"
          >
            <div className="line-accent" />
            <p className="section-label !text-wood-gold">
              Est. {SITE.founded} · Uttam Nagar, New Delhi
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-5 md:hidden"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-wood-gold/50 shadow-lg">
              <Image
                src={IMAGES.heroWood}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-white/85">
                <Image
                  src={IMAGES.logo}
                  alt="Garg Plywood Palace"
                  width={80}
                  height={80}
                  className="h-[115%] w-[115%] max-w-none object-cover object-top"
                  sizes="64px"
                />
              </div>
            </div>
          </motion.div>

          <h1 className="max-w-5xl font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight text-wood-cream">
            <TextReveal text="Strong Foundations," delay={0.4} animateOnMount />
            <br />
            <span className="text-gradient-gold font-medium italic">
              <TextReveal text="Beautiful Creations" delay={0.65} animateOnMount />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-3 font-display text-lg italic text-wood-gold/90 md:mt-4 md:text-xl"
          >
            {SITE.subtagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-5 flex flex-wrap gap-2 md:hidden"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-wood-gold/25 bg-wood-deep/50 px-3 py-2 backdrop-blur-sm"
              >
                <span className="font-display text-lg font-semibold text-wood-gold">
                  {stat.value}
                </span>
                <span className="ml-2 text-[9px] uppercase tracking-[0.2em] text-wood-cream/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-wood-cream/75 md:mt-8 md:text-lg"
          >
            Wholesale & retail plywood, block boards, laminates, timber &amp; HDHMR — trusted by
            architects, builders, and homeowners across Delhi NCR since {SITE.founded}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-8 flex flex-wrap gap-4 md:mt-12 md:gap-5"
          >
            <Link href="/products" className="btn-primary">
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

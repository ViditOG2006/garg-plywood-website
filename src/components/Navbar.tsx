"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/LogoMark";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PEOPLE } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const dark = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-ink/5 bg-surface/95 py-3 backdrop-blur-2xl"
            : dark
              ? "bg-transparent py-7"
              : "bg-surface/90 py-5 backdrop-blur-xl"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
          <Link href="/" className="group flex items-center gap-4">
            <LogoMark priority className="transition-transform group-hover:scale-105" />
            <div className="hidden sm:block">
              <p
                className={`font-display text-lg font-semibold leading-none tracking-wide transition-colors ${
                  dark ? "text-wood-cream" : "text-ink"
                }`}
              >
                Garg Plywood Palace
              </p>
              <p
                className={`mt-1 text-[9px] uppercase tracking-[0.4em] ${
                  dark ? "text-wood-gold" : "text-wood-medium"
                }`}
              >
                Since 1985
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-10 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                  pathname === link.href
                    ? dark
                      ? "text-wood-gold"
                      : "text-wood-medium"
                    : dark
                      ? "text-wood-cream/70 hover:text-wood-cream"
                      : "text-ink/60 hover:text-ink"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-wood-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-6 xl:flex">
            <a
              href={`tel:${PEOPLE.owners[0].tel}`}
              className={`text-[10px] font-bold uppercase tracking-[0.25em] ${
                dark ? "text-wood-cream/80" : "text-ink/70"
              }`}
            >
              {PEOPLE.owners[0].phone}
            </a>
            <Link
              href="/contact"
              className={
                dark
                  ? "btn-outline-light !py-3 !px-7 !text-[10px]"
                  : "btn-primary !py-3 !px-7 !text-[10px]"
              }
            >
              Get Quote
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 6 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className={`block h-px w-7 ${dark && !menuOpen ? "bg-wood-cream" : "bg-ink"}`}
              />
            ))}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-wood-deep/98 backdrop-blur-2xl xl:hidden"
          >
            <motion.nav className="flex h-full flex-col items-center justify-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`font-display text-4xl ${
                      pathname === link.href ? "text-wood-gold" : "text-wood-cream/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href={`tel:${PEOPLE.owners[0].tel}`} className="btn-primary mt-6">
                Call Now
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

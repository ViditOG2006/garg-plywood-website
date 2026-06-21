import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { NAV_LINKS, SITE, LOCATION, PEOPLE, BRANDS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-wood-deep text-wood-cream">
      <div className="border-b border-wood-gold/10">
        <div className="marquee-container py-8">
          <div className="marquee-track flex w-max whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={i}
                className="mx-10 shrink-0 font-display text-2xl text-wood-cream/15 md:text-3xl"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding mx-auto max-w-[1400px] !pb-12">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="group inline-flex items-center gap-4">
              <LogoMark size="md" className="ring-wood-gold/30" />
              <div>
                <p className="font-display text-2xl font-semibold transition-colors group-hover:text-wood-gold">
                  Garg Plywood Palace
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-wood-gold">
                  Since {SITE.founded}
                </p>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-wood-cream/55">
              {SITE.description}
            </p>
            <p className="mt-4 text-xs italic text-wood-gold/80">{SITE.motto}</p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
              Navigation
            </h4>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-wood-cream/60 transition-colors hover:text-wood-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
              Visit Us
            </h4>
            <p className="mt-6 text-sm leading-relaxed text-wood-cream/60">
              {LOCATION.fullAddress}
            </p>
            <p className="mt-2 text-xs text-wood-cream/40">{LOCATION.landmark}</p>
            <a
              href={`https://maps.google.com/?q=${LOCATION.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-wood-gold hover:underline"
            >
              View on Map →
            </a>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
              Contact
            </h4>
            <ul className="mt-6 space-y-4 text-sm">
              {PEOPLE.owners.map((o) => (
                <li key={o.name}>
                  <p className="text-wood-cream/80">{o.name}</p>
                  <a href={`tel:${o.tel}`} className="text-wood-gold hover:underline">
                    {o.phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-wood-cream/60 hover:text-wood-gold"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-wood-cream/50">{SITE.hours}</li>
            </ul>
            <Link href="/contact" className="btn-primary mt-8 !text-[10px]">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-wood-gold/10 pt-8 md:flex-row">
          <p className="text-xs text-wood-cream/35">
            © {new Date().getFullYear()} {SITE.name}. {SITE.footerTagline}.
          </p>
          <p className="text-xs text-wood-cream/35">
            {PEOPLE.founder} · Led by Amit &amp; Gaurav Gupta
          </p>
        </div>
      </div>
    </footer>
  );
}

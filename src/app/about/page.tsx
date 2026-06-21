import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { BRANDS, SITE, PEOPLE, IMAGES, CLIENTS_SERVE } from "@/lib/constants";
import Image from "next/image";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "About Garg Plywood Palace — a family-owned plywood dealer in Uttam Nagar, New Delhi since 1985. Founded by Late Shri Surender Kumar Gupta, now led by Amit & Gaurav Gupta.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        label="About Us"
        title="A Legacy of Quality Woodcraft"
        description="For nearly four decades, Garg Plywood Palace has been a trusted partner in creating beautiful homes, modern offices, and durable commercial spaces."
        image={IMAGES.heroWood}
      />

      <section className="section-padding">
        <div className="mx-auto grid max-w-[1400px] items-center gap-20 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-wood-cream">
              <Image
                src={IMAGES.heroWood}
                alt=""
                fill
                className="object-cover opacity-25"
                sizes="(max-width:1024px) 100vw, 50vw"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                <div className="relative aspect-square w-full max-w-[320px] bg-white p-6 shadow-xl ring-1 ring-wood-gold/25 md:max-w-[360px] md:p-8">
                  <Image
                    src={IMAGES.logo}
                    alt="Garg Plywood Palace — GPP logo"
                    fill
                    className="object-contain object-center p-3"
                    sizes="(max-width:1024px) 70vw, 360px"
                    priority
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="section-label">Our Story</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-wood-dark md:text-4xl">
              From {SITE.founded} to Today
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-wood-dark/65">
              <p>
                Garg Plywood Palace was started in {SITE.founded} in Uttam Nagar, New Delhi, as a
                family-owned venture dedicated to providing superior plywood and timber. Since
                then, we have expanded our product lines, nurtured long-term client relationships,
                and grown into a trusted name in the plywood and timber industry.
              </p>
              <p>
                Today, we stock an extensive range of commercial and marine plywood, block boards,
                MDF, HDHMR, decorative laminates, natural veneers, hardwood timber, flush doors,
                louvers, mouldings, and complete hardware solutions.
              </p>
              <p>
                Our premium-quality materials have helped architects, designers, contractors, and
                homeowners bring their ideas to life with confidence and reliability.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-wood-dark text-wood-cream">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="section-label">Leadership</p>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              Built on Family Values
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Reveal>
              <div className="border border-wood-gold/20 p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
                  Founder
                </p>
                <p className="font-display mt-4 text-2xl">{PEOPLE.founder}</p>
                <p className="mt-4 text-sm text-wood-cream/55">
                  The visionary who established Garg Plywood Palace in {SITE.founded} with a
                  commitment to quality, honesty, and customer satisfaction that continues to
                  define our business today.
                </p>
              </div>
            </Reveal>
            {PEOPLE.owners.map((owner, i) => (
              <Reveal key={owner.name} delay={0.1 * (i + 1)}>
                <div className="border border-wood-gold/20 p-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wood-gold">
                    Current Owner
                  </p>
                  <p className="font-display mt-4 text-2xl">{owner.name}</p>
                  <a
                    href={`tel:${owner.tel}`}
                    className="mt-2 block text-wood-gold hover:underline"
                  >
                    {owner.phone}
                  </a>
                  <p className="mt-4 text-sm text-wood-cream/55">
                    Leading Garg Plywood Palace with dedication to maintaining the highest
                    standards of product quality and customer service.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="section-label">Who We Serve</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-wood-dark md:text-4xl">
              Industries & Customers
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { title: "Professionals", items: CLIENTS_SERVE.professionals },
              { title: "Homeowners", items: CLIENTS_SERVE.homeowners },
              { title: "Industries", items: CLIENTS_SERVE.industries },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 0.1}>
                <div className="card-luxury p-8">
                  <h3 className="font-display text-xl font-semibold text-wood-dark">
                    {group.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-wood-dark/60"
                      >
                        <span className="text-wood-gold">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-wood-cream/60">
        <div className="mx-auto max-w-[1400px] text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-wood-dark">
              Brands We Partner With
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="border border-wood-dark/10 bg-white px-6 py-3 text-sm font-medium text-wood-dark/70"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

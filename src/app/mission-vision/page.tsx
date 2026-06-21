import Image from "next/image";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { VALUES, SITE, IMAGES } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Mission & Vision",
  description:
    "Mission and vision of Garg Plywood Palace — quality guaranteed plywood dealer in Uttam Nagar since 1985. Quality, Trust, Durability, Sustainability.",
  path: "/mission-vision",
});

export default function MissionVisionPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Mission & Vision", path: "/mission-vision" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        label="Mission & Vision"
        title="Building Tomorrow with Today's Best Materials"
        description="Our purpose goes beyond selling plywood — we empower every builder, designer, and homeowner to create spaces they're proud of."
        image={IMAGES.heroWood}
      />

      <section className="section-padding">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="bg-wood-dark p-10 md:p-14">
              <p className="section-label">Our Mission</p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-wood-cream md:text-4xl">
                To Be the Most Trusted Plywood Partner in Delhi NCR
              </h2>
              <p className="mt-8 leading-relaxed text-wood-cream/60">
                We are committed to providing premium, certified plywood and interior materials
                at competitive prices, backed by knowledgeable staff who guide every customer to
                the perfect product. Quality materials are the foundation of every beautiful,
                durable space.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-wood-dark/10 p-10 md:p-14">
              <p className="section-label !text-wood-medium">Our Vision</p>
              <h2 className="font-display mt-4 text-3xl font-semibold text-wood-dark md:text-4xl">
                Shaping the Future of Indian Interiors
              </h2>
              <p className="mt-8 leading-relaxed text-wood-dark/60">
                We envision a future where every home and commercial space is built with
                sustainable, high-quality wood products. Garg Plywood Palace aims to expand its
                reach while maintaining the personal touch and trust that has defined us since{" "}
                {SITE.founded}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-wood-cream/50">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="section-label text-center">Core Values</p>
            <h2 className="font-display mt-4 text-center text-3xl font-semibold text-wood-dark md:text-4xl">
              {SITE.motto}
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card-luxury p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-wood-gold/30">
                    <span className="font-display text-2xl text-wood-gold">
                      {v.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-wood-dark">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-wood-dark/55">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={IMAGES.missionPhoto}
                alt="Premium plywood and timber quality"
                fill
                className="object-cover"
                sizes="700px"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="section-label">Quality Promise</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-wood-dark">
              Our Quality Commitment
            </h2>
            <p className="mt-6 leading-relaxed text-wood-dark/60">
              We commit to durable plywood that withstands time and elements, adhering to
              certified standards like ISI marks and waterproofing certifications. Our consistent
              supply ensures your projects stay on track without interruptions.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "ISI Certified — meeting national quality benchmarks",
                "Waterproofing — engineered for moisture resistance",
                "Durability Tested — built to last in demanding conditions",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-wood-dark/70">
                  <span className="text-wood-gold">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-wood-dark">
        <Reveal>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-2xl font-medium italic leading-relaxed text-wood-cream md:text-3xl">
              &ldquo;Wood is not just a material — it&apos;s the soul of every space we help
              create. Our mission is to ensure that soul is pure, strong, and beautiful.&rdquo;
            </p>
            <footer className="mt-8 text-[10px] uppercase tracking-[0.4em] text-wood-gold">
              — Garg Plywood Palace, Since {SITE.founded}
            </footer>
          </blockquote>
        </Reveal>
      </section>
    </>
  );
}

import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ClientLettersGallery from "@/components/ClientLettersGallery";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/Reveal";
import { TESTIMONIALS, IMAGES } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Client testimonials and recommendation letters for Garg Plywood Palace from interior firms, contractors, and designers across Delhi NCR.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Testimonials", path: "/testimonials" },
  ]);

  const avgRating = (
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
  ).toFixed(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        label="Testimonials"
        title="Success Stories"
        description="For nearly four decades, our premium-quality materials have helped professionals and homeowners bring their ideas to life with confidence."
        image={IMAGES.heroWood}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="relative mb-20 overflow-hidden border border-wood-gold/20 bg-wood-dark">
              <div className="grid lg:grid-cols-2">
                <div className="bg-wood-cream p-4 md:p-6">
                  <ClientLettersGallery
                    variant="full"
                    fullSizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 320px"
                  />
                </div>
                <div className="flex flex-col justify-center p-10 md:p-16">
                  <p className="font-display text-6xl font-semibold text-wood-gold">{avgRating}</p>
                  <div className="mt-2 flex gap-1 text-wood-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="font-display mt-6 text-2xl text-wood-cream">
                    Excellent Client Satisfaction
                  </p>
                  <p className="mt-2 text-sm text-wood-cream/55">
                    Verified recommendations from interior firms, contractors, and designers
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <article className="card-luxury flex h-full flex-col p-8">
                  <div className="mb-4 flex gap-1 text-wood-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-wood-gold">
                    {t.project}
                  </span>
                  <blockquote className="flex-1 text-sm leading-relaxed text-wood-dark/65">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4 border-t border-wood-dark/8 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center bg-wood-cream font-display text-lg font-bold text-wood-medium">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-wood-dark">{t.name}</p>
                      <p className="text-xs text-wood-medium">{t.role}</p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

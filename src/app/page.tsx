import Hero from "@/components/Hero";
import LegacySection from "@/components/LegacySection";
import WhyChooseSection from "@/components/StatsSection";
import ProductsPreview from "@/components/ProductsPreview";
import ShowroomGallery from "@/components/ShowroomGallery";
import InteriorShowcase from "@/components/InteriorShowcase";
import TestimonialsPreview, {
  CTASection,
  BrandsMarquee,
} from "@/components/TestimonialsPreview";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  const jsonLd = organizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <BrandsMarquee />
      <LegacySection />
      <WhyChooseSection />
      <ProductsPreview />
      <ShowroomGallery />
      <InteriorShowcase />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}

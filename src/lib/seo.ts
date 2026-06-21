import type { Metadata } from "next";
import { SITE, LOCATION, PEOPLE, IMAGES } from "./constants";

type PageSEO = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageSEO): Metadata {
  const fullTitle =
    title === SITE.name ? `${SITE.name} | ${SITE.tagline}` : `${title} | ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  const defaultKeywords = [
    "Garg Plywood Palace",
    "plywood dealer Uttam Nagar",
    "plywood dealer Delhi",
    "plywood wholesale Delhi",
    "WZ-255A Uttam Nagar plywood",
    "plywood since 1985",
    "Amit Gupta plywood",
    "block board Delhi",
    "HDHMR dealer",
    "laminates Uttam Nagar",
    "marine plywood Delhi",
    "timber supplier New Delhi",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [{ url: "/images/logo.png", width: 512, height: 512, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phones,
    foundingDate: SITE.founded,
    founder: { "@type": "Person", name: PEOPLE.founder },
    employee: PEOPLE.owners.map((o) => ({ "@type": "Person", name: o.name })),
    priceRange: "₹₹",
    areaServed: ["Delhi", "NCR", "New Delhi", "Uttam Nagar"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "WZ-255A, Main Najafgarh Road, Opposite Metro Pillar No. 667",
      addressLocality: "Uttam Nagar, New Delhi",
      postalCode: "110059",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    slogan: SITE.tagline,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

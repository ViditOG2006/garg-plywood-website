import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Products",
  description:
    "Browse premium plywood, block boards, laminates, veneers, timber, MDF, HDHMR, and hardware at Garg Plywood Palace — Delhi's trusted dealer since 1985.",
  path: "/products",
  keywords: [
    "commercial plywood price",
    "marine plywood",
    "block board dealer",
    "laminates shop",
    "MDF board",
  ],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

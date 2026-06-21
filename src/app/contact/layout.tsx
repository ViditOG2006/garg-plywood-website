import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Garg Plywood Palace for quotes and expert advice. Showrooms in Uttam Nagar, Delhi and Gomti Nagar, Lucknow. Call +91 98077 78899.",
  path: "/contact",
  keywords: ["contact plywood dealer", "plywood quote Delhi", "plywood shop Lucknow"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

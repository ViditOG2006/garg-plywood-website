import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Garg Plywood Palace for quotes and expert advice. Visit our Uttam Nagar, Delhi showroom or call +91 98100 34165 / +91 98109 46165.",
  path: "/contact",
  keywords: ["contact plywood dealer", "plywood quote Delhi", "plywood shop Uttam Nagar"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

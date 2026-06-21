import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: SITE.name,
    description: SITE.description,
    path: "/",
  }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1209" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} h-full overflow-x-clip`}>
      <body className="flex min-h-full max-w-full flex-col overflow-x-clip antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="w-full max-w-full flex-1 overflow-x-clip">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

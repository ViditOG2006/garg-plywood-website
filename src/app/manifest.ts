import type { MetadataRoute } from "next";
import { SITE, IMAGES } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Garg Ply",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#2c1810",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: IMAGES.logo,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

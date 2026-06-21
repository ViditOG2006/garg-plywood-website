import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "public/images/logo.png");

async function resizeLogo(size, padding = 0.08) {
  const logo = sharp(logoPath);
  const meta = await logo.metadata();
  const inner = Math.round(size * (1 - padding * 2));
  const resized = await logo
    .resize(inner, inner, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: resized,
        top: Math.round((size - inner) / 2),
        left: Math.round((size - inner) / 2),
      },
    ])
    .png()
    .toBuffer();
}

const icon32 = await resizeLogo(32);
const icon48 = await resizeLogo(48);
const icon180 = await resizeLogo(180, 0.06);
const icon16 = await resizeLogo(16);

const appDir = join(root, "src/app");
await writeFile(join(appDir, "icon.png"), icon32);
await writeFile(join(appDir, "apple-icon.png"), icon180);

const faviconPngs = await Promise.all([16, 32, 48].map((s) => resizeLogo(s)));
const faviconIco = await pngToIco(faviconPngs);
await writeFile(join(appDir, "favicon.ico"), faviconIco);
await writeFile(join(root, "public/favicon.ico"), faviconIco);

console.log("Generated GPP icons:");
console.log("  src/app/icon.png (32x32)");
console.log("  src/app/apple-icon.png (180x180)");
console.log("  src/app/favicon.ico");
console.log("  public/favicon.ico");

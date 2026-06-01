import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "optimized");

const images = [
  {
    src: "public/hero-lcp.jpg",
    name: "hero-lcp",
    widths: [640, 900, 1200],
  },
  {
    src: "src/assets/restaurante-perf.jpg",
    name: "restaurante",
    widths: [480, 640, 900],
  },
  {
    src: "src/assets/feria-bacalado-perf.jpg",
    name: "feria-bacalado",
    widths: [480, 640, 900],
  },
  {
    src: "src/assets/bacalado-taberna-perf.jpg",
    name: "bacalado-taberna",
    widths: [480, 640, 900],
  },
  {
    src: "src/assets/cocochas-perf.jpg",
    name: "cocochas",
    widths: [480, 640, 900],
  },
  {
    src: "src/assets/gambas-perf.jpg",
    name: "gambas",
    widths: [480, 640, 900],
  },
];

await mkdir(outputDir, { recursive: true });

await Promise.all(
  images.flatMap(({ src, name, widths }) => {
    const input = path.join(root, src);

    return widths.flatMap((width) => {
      const base = path.join(outputDir, `${name}-${width}`);

      return [
        sharp(input)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(`${base}.webp`),
        sharp(input)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality: 78, progressive: true, mozjpeg: true })
          .toFile(`${base}.jpg`),
      ];
    });
  }),
);

console.log(`Optimized ${images.length} image groups into public/optimized`);

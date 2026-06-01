import type { ImgHTMLAttributes } from "react";

const DEFAULT_WIDTHS = [320, 480, 640, 800, 1000, 1200, 1600];

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  widths?: number[];
  quality?: number;
};

function isUnsplashUrl(src: string) {
  return src.includes("images.unsplash.com");
}

function withUnsplashParams(src: string, width: number, quality: number) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", url.searchParams.get("fit") ?? "crop");
  return url.toString();
}

export default function OptimizedImage({
  src,
  widths = DEFAULT_WIDTHS,
  quality = 72,
  loading = "lazy",
  decoding = "async",
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  if (!isUnsplashUrl(src)) {
    return (
      <img
        src={src}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        {...props}
      />
    );
  }

  const sortedWidths = [...widths].sort((a, b) => a - b);
  const srcSet = sortedWidths
    .map((width) => `${withUnsplashParams(src, width, quality)} ${width}w`)
    .join(", ");
  const fallbackWidth = sortedWidths[Math.min(2, sortedWidths.length - 1)];

  return (
    <img
      src={withUnsplashParams(src, fallbackWidth, quality)}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}

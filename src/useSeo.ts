import { useEffect } from "react";
import { routeSeo, siteUrl, setMeta } from "./lib/seo";

export function useSeo(pathname: string) {
  useEffect(() => {
    const seo = routeSeo[pathname] ?? routeSeo["/"];
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    document.title = seo.title;
    canonical.href = canonicalUrl;
    setMeta("description", seo.description);
    setMeta("og:title", seo.title, true);
    setMeta("og:description", seo.description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
  }, [pathname]);
}

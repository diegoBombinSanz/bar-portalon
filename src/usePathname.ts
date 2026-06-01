import { useEffect, useState } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");

      if (
        !link ||
        link.target ||
        link.hasAttribute("download") ||
        link.origin !== window.location.origin ||
        link.pathname === window.location.pathname
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", link.href);
      setPathname(link.pathname);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return pathname;
}

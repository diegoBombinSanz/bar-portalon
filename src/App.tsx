import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { type SiteConfig } from "./data/siteConfig";
import { getSiteConfig } from "./app/api/site-config/route";
import ConfigEditorPage from "./AdminStatusPage";
import ProtectedRoute from "./components/ProtectedRoute";

const ExperienceSplit = lazy(() => import("./components/ExperienceSplit"));
const CodDays = lazy(() => import("./components/CodDays"));
const Specialties = lazy(() => import("./components/Specialties"));
const Reviews = lazy(() => import("./components/Reviews"));
const MapSection = lazy(() => import("./components/MapSection"));
const GaleriaTeaser = lazy(() => import("./components/GaleriaTeaser"));
const EntrevinosTeaser = lazy(() => import("./components/EntrevinosTeaser"));
const PrivacyPage = lazy(() => import("./components/PoliticaPrivacidad"));
const AvisoLegal = lazy(() => import("./components/AvisoLegal"));
const BarraPage = lazy(() => import("./components/Barra"));
const GaleriaPage = lazy(() => import("./components/Galeria"));
const EntrevinosPage = lazy(() => import("./components/Entrevinos"));
const AntiguosEventosPage = lazy(() => import("./components/AntiguosEventos"));
const AdminPage = lazy(() => import("./ConfigStatusPage"));
const LoginPage = lazy(() => import("./pages/Login"));

const siteUrl = "https://bar-portalon-roa.com";

const routeSeo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Bar El Portalón | Restaurante en Roa, Ribera del Duero",
    description:
      "Bar El Portalón en Roa, Burgos. Cocina tradicional, tapeo, bacalao y producto de temporada en la Ribera del Duero.",
  },
  "/barra": {
    title: "La Barra | Bar El Portalón en Roa",
    description:
      "Pinchos, raciones y ambiente de barra en Bar El Portalón, Plaza Mayor de Roa.",
  },
  "/galeria": {
    title: "Galería | Bar El Portalón",
    description:
      "Imágenes del local, la barra, especialidades y ambiente de Bar El Portalón en Roa.",
  },
  "/entrevinos": {
    title: "Entrevinos de Roa | Bar El Portalón",
    description:
      "Descubre Entrevinos de Roa, vinos de Ribera del Duero disponibles en Bar El Portalón.",
  },
  "/antiguos-eventos": {
    title: "Ediciones anteriores de las Jornadas del Bacalao | Bar El Portalón",
    description:
      "Historia de las Jornadas del Bacalao de Bar El Portalón: ediciones pasadas, platos y tradición.",
  },
  "/politica": {
    title: "Política de privacidad | Bar El Portalón",
    description: "Política de privacidad de Bar El Portalón.",
  },
  "/aviso": {
    title: "Aviso legal | Bar El Portalón",
    description: "Aviso legal de Bar El Portalón.",
  },
  "/admin": {
    title: "Panel de administración | Bar El Portalón",
    description: "Acceso al panel de administración de Bar El Portalón.",
  },
  "/admin/config": {
    title: "Panel de configuracion | Bar El Portalon",
    description: "Panel protegido de configuracion de Bar El Portalon.",
  },
  "/login": {
    title: "Acceso admin | Bar El Portalon",
    description: "Login para el panel de administracion de Bar El Portalon.",
  },
};

type DeferredSectionProps = {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
};

function DeferredSection({
  children,
  fallback,
  rootMargin = "900px 0px",
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const load = () => setShouldRender(true);
    window.addEventListener("load-deferred-sections", load);

    const element = ref.current;
    if (!element) {
      return () => window.removeEventListener("load-deferred-sections", load);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("load-deferred-sections", load);
    };
  }, [rootMargin, shouldRender]);

  if (shouldRender) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <div ref={ref}>{fallback}</div>;
}

function usePathname() {
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

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }

  element.content = content;
}

function useSeo(pathname: string, config: SiteConfig) {
  console.log("useSeo called with pathname:", pathname, "and config:", config);
  useEffect(() => {
    const seo = routeSeo[pathname] ?? routeSeo["/"];
    const title = pathname === "/" ? config.meta.homeTitle || seo.title : seo.title;
    const description = pathname === "/" ? config.meta.homeDescription || seo.description : seo.description;
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    document.title = title;
    canonical.href = canonicalUrl;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [pathname, config.meta.homeTitle, config.meta.homeDescription]);
}

function ExperienceFallback() {
  return (
    <section
      id="experiencia"
      aria-hidden="true"
      className="flex min-h-[80vh] w-full flex-col bg-black md:flex-row"
    >
      <div id="bar" className="min-h-[40vh] w-full md:min-h-[80vh] md:w-1/2" />
      <div
        id="restaurante"
        className="min-h-[40vh] w-full md:min-h-[80vh] md:w-1/2"
      />
    </section>
  );
}

function SectionFallback({
  id,
  className,
}: {
  id?: string;
  className: string;
}) {
  return <section id={id} aria-hidden="true" className={className} />;
}

function PageFallback() {
  return <div className="min-h-screen bg-[#0a0a0a]" aria-hidden="true" />;
}

function Home({ config }: { config: SiteConfig }) {
  const isVisible = (id: string) =>
    config.sections.find((section) => section.id === id)?.visible ?? true;

  return (
    <div className="bg-black text-[#f5f5f1] selection:bg-[#c5a059] selection:text-black">
      <Navbar config={config} />

      <main>
        <Hero banner={config.banner} />

        {isVisible("experienceSplit") && (
          <DeferredSection
            fallback={<ExperienceFallback />}
            rootMargin="1200px 0px"
          >
            <ExperienceSplit config={config} />
          </DeferredSection>
        )}

        {isVisible("codDays") && (
          <DeferredSection
            fallback={
              <SectionFallback
                id="bacalao"
                className="min-h-[640px] bg-[#0f0f0f]"
              />
            }
          >
            <CodDays config={config} />
          </DeferredSection>
        )}

        {isVisible("specialties") && (
          <DeferredSection
            fallback={
              <SectionFallback
                id="especialidades"
                className="min-h-[960px] bg-[#f5f5f1]"
              />
            }
          >
            <Specialties />
          </DeferredSection>
        )}

        {isVisible("reviews") && (
          <DeferredSection
            fallback={<SectionFallback className="min-h-[760px] bg-[#0a0a0a]" />}
          >
            <Reviews />
          </DeferredSection>
        )}

        {isVisible("galeriaTeaser") && (
          <DeferredSection
            fallback={
              <SectionFallback
                id="galeria"
                className="min-h-[520px] bg-[#0a0a0a]"
              />
            }
          >
            <GaleriaTeaser />
          </DeferredSection>
        )}

        {isVisible("entrevinosTeaser") && (
          <DeferredSection
            fallback={<SectionFallback className="min-h-[640px] bg-[#0d0d0d]" />}
          >
            <EntrevinosTeaser />
          </DeferredSection>
        )}

        {isVisible("mapSection") && (
          <DeferredSection
            fallback={
              <SectionFallback
                id="contacto"
                className="min-h-[760px] bg-[#0d0d0d]"
              />
            }
          >
            <MapSection />
          </DeferredSection>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const pathname = usePathname();
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site-config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch site config");
        }
        return response.json();
      })
      .then((data) => {
        if (!cancelled && data?.config) {
          setConfig(data.config);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setConfig(getSiteConfig);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useSeo(pathname, config);

  if (pathname === "/politica") {
    return (
      <Suspense fallback={<PageFallback />}>
        <PrivacyPage config={config} />
      </Suspense>
    );
  }

  if (pathname === "/aviso") {
    return (
      <Suspense fallback={<PageFallback />}>
        <AvisoLegal config={config} />
      </Suspense>
    );
  }

  if (pathname === "/barra") {
    return (
      <Suspense fallback={<PageFallback />}>
        <BarraPage config={config} />
      </Suspense>
    );
  }

  if (pathname === "/galeria") {
    return (
      <Suspense fallback={<PageFallback />}>
        <GaleriaPage config={config} />
      </Suspense>
    );
  }

  if (pathname === "/entrevinos") {
    return (
      <Suspense fallback={<PageFallback />}>
        <EntrevinosPage config={config} />
      </Suspense>
    );
  }

  if (pathname === "/antiguos-eventos") {
    return (
      <Suspense fallback={<PageFallback />}>
        <AntiguosEventosPage config={config} />
      </Suspense>
    );
  }

  if (pathname === "/login") {
    return (
      <Suspense fallback={<PageFallback />}>
        <LoginPage />
      </Suspense>
    );
  }

  if (pathname === "/admin" || pathname === "/admin/config") {
    return (
      <Suspense fallback={<PageFallback />}>
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      </Suspense>
    );
  }

  if (pathname === "/settings") {
    return (
      <Suspense fallback={<PageFallback />}>
        <ConfigEditorPage />
      </Suspense>
    );
  }

  return <Home config={config} />;
}

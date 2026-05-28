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

const ExperienceSplit = lazy(() => import("./components/ExperienceSplit"));
const CodDays = lazy(() => import("./components/CodDays"));
const Specialties = lazy(() => import("./components/Specialties"));
const Reviews = lazy(() => import("./components/Reviews"));
const MapSection = lazy(() => import("./components/MapSection"));
const PrivacyPage = lazy(() => import("./components/PoliticaPrivacidad"));
const AvisoLegal = lazy(() => import("./components/AvisoLegal"));

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

function Home() {
  return (
    <div className="bg-black text-[#f5f5f1] selection:bg-[#c5a059] selection:text-black">
      <Navbar />

      <main>
        <Hero />

        <DeferredSection fallback={<ExperienceFallback />} rootMargin="1200px 0px">
          <ExperienceSplit />
        </DeferredSection>

        <DeferredSection
          fallback={
            <SectionFallback
              id="bacalao"
              className="min-h-[640px] bg-[#0f0f0f]"
            />
          }
        >
          <CodDays />
        </DeferredSection>

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

        <DeferredSection
          fallback={<SectionFallback className="min-h-[760px] bg-[#0a0a0a]" />}
        >
          <Reviews />
        </DeferredSection>

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
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const pathname = usePathname();

  if (pathname === "/politica") {
    return (
      <Suspense fallback={null}>
        <PrivacyPage />
      </Suspense>
    );
  }

  if (pathname === "/aviso") {
    return (
      <Suspense fallback={null}>
        <AvisoLegal />
      </Suspense>
    );
  }

  return <Home />;
}

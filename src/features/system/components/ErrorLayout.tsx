import type { ReactNode } from "react";
import { Home, RefreshCw } from "lucide-react";

type ErrorLayoutProps = {
  title: string;
  subtitle: string;
  code: string;
  illustration?: ReactNode;
  actions?: ReactNode;
  showCode?: boolean;
};

export default function ErrorLayout({
  title,
  subtitle,
  code,
  illustration,
  actions,
  showCode = true,
}: ErrorLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-[#f5f5f1] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(197,160,89,0.2),_transparent_45%),linear-gradient(135deg,_#120f0a_0%,_#1b1712_100%)] shadow-2xl shadow-black/40 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-1 text-sm font-medium text-[#f2d7a1]">
            <Home size={16} />
            Bar El Portalón
          </div>
          {showCode && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#C5A059]">
              {code}
            </p>
          )}
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#d9d2c4]">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-black/20 p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            {illustration ?? (
              <div className="flex min-h-[280px] items-center justify-center rounded-[1.25rem] border border-dashed border-[#C5A059]/40 bg-[#17130c]">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A059]/20 text-[#C5A059]">
                    <RefreshCw size={28} />
                  </div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[#C5A059]">
                    Estado del sitio
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

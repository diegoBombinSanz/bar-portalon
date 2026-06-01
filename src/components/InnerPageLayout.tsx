"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type InnerPageLayoutProps = {
  children: ReactNode;
  backLabel?: string;
  backHref?: string;
};

export default function InnerPageLayout({
  children,
  backLabel = "Volver al inicio",
  backHref = "/",
}: InnerPageLayoutProps) {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f1] min-h-screen">
      <Navbar />

      {/* Back button — fixed under navbar */}
      <div className="fixed top-[76px] left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6">
          <a
            href={backHref}
            className="pointer-events-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#f5f5f1]/50 hover:text-[#c5a059] transition-colors py-3 group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {backLabel}
          </a>
        </div>
      </div>

      {/* Page content — padding-top accounts for fixed navbar + back button */}
      <main className="pt-32">{children}</main>

      <Footer />
    </div>
  );
}




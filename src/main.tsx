import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

import { queryClient } from "./lib/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export const metadata = {
  title: "El Portalón | Restaurante en Roa, Ribera del Duero",
  description:
    "Restaurante en Roa (Burgos). Cocina tradicional, producto local y especialidades de la casa en un ambiente acogedor.",
  keywords: [
    "restaurante Roa",
    "restaurante Ribera del Duero",
    "dónde comer Roa",
    "El Portalón Roa"
  ],
  openGraph: {
    title: "El Portalón | Restaurante en Roa",
    description:
      "Cocina tradicional en el corazón de la Ribera del Duero.",
    url: "https://bar-portalon-roa.com",
    siteName: "El Portalón",
    images: [
      {
        url: "https://bar-portalon-roa.com/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};
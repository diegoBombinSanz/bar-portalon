import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalErrorBoundary from "./features/system/components/GlobalErrorBoundary";
import SystemStatusGate from "./features/system/components/SystemStatusGate";
import "./index.css";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  // Cargar gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inicializar Google Analytics
  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inlineScript);
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <SystemStatusGate>
        <App />
      </SystemStatusGate>
    </GlobalErrorBoundary>
  </React.StrictMode>,
);

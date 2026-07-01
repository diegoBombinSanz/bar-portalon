import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalErrorBoundary from "./features/system/components/GlobalErrorBoundary";
import SystemStatusGate from "./features/system/components/SystemStatusGate";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <SystemStatusGate>
        <App />
      </SystemStatusGate>
    </GlobalErrorBoundary>
  </React.StrictMode>,
);

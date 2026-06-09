import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { getSiteConfig } from "./src/app/api/site-config/route.ts";

function createSiteConfigApiMiddleware() {
  return (req: any, res: any, next: () => void) => {
    const url = req.url?.split("?")[0];

    if (url !== "/api/site-config") {
      return next();
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ config: getSiteConfig() }));
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: "site-config-api",
      configureServer(server) {
        server.middlewares.use(createSiteConfigApiMiddleware());
      },
      configurePreviewServer(server) {
        server.middlewares.use(createSiteConfigApiMiddleware());
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

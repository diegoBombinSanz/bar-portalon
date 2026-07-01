import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { handleKeepAliveRequest } from "./src/lib/system/keepAliveApi";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    plugins: [
      react(),
      {
        name: "keep-alive-dev-endpoint",
        configureServer(server) {
          server.middlewares.use("/api/system/keep-alive", async (req, res, next) => {
            if (req.method !== "GET") {
              return next();
            }

            const request = new Request(`http://${req.headers.host ?? "127.0.0.1:5173"}${req.url ?? "/"}`, {
              method: req.method,
              headers: req.headers as Record<string, string>,
            });

            const response = await handleKeepAliveRequest(request, env);
            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
            res.end(await response.text());
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
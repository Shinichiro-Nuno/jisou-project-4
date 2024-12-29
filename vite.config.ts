import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import env from "vite-plugin-env-compatible";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    env({ prefix: "VITE", mountedPath: "process.env" }),
    tsconfigPaths(),
  ],
});

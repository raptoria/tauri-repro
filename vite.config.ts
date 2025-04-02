import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createRequire } from "node:module";
import { tscWatch } from "vite-plugin-tsc-watch";
import tailwindcss from "@tailwindcss/vite";

const host = process.env.TAURI_DEV_HOST;

const require = createRequire(import.meta.url);

const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps"),
);

const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts",
  ),
);

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    topLevelAwait(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: "" },
        { src: standardFontsDir, dest: "" },
      ],
    }),
    tscWatch(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));

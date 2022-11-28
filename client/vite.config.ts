import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    server: {
      proxy: {
        "/api": "http://localhost:4000",
      },
    },
    plugins: [react(), svgr(), splitVendorChunkPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/config";',
        },
      },
      modules: {
        generateScopedName: isDev
          ? "[local]_[hash:base64:4]"
          : "[hash:base64:4]",
      },
    },
  };
});

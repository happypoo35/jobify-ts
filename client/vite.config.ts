import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
// import { dependencies } from "./package.json";

// const renderChunks = (deps: Record<string, string>) => {
//   let chunks = {};
//   Object.keys(deps).forEach((key) => {
//     if (["react", "react-router-dom", "react-dom"].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// };

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
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: (id) => {

    //       }
    //     }
    //   }
    // }
  };
});

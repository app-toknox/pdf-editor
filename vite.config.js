import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// workaround per __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsConfigFilePath: "./tsconfig.json",
      entryRoot: "src",
      outputDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // extract CSS into its own file
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "PdfEditor",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        // put all CSS assets in a single style.css file
        assetFileNames: (assetInfo) => {
          const firstName = assetInfo.names?.[0];
          if (firstName?.endsWith(".css")) {
            return "style.css";
          }
          return firstName ? `${firstName}[extname]` : "[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    minify: "esbuild",
    target: "es2015",
  },
});

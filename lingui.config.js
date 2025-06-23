import { defineConfig } from "@lingui/conf";

export default defineConfig({
  locales: ["en", "it"],
  sourceLocale: "en",
  compileNamespace: "es",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
      exclude: ["**/*.d.ts", "**/node_modules/**", "dist/**"], // evita l’errore sui .d.ts
    },
  ],
  babelOptions: {
    // plugin necessario sia al CLI sia – più sotto – a SWC
    plugins: ["@lingui/babel-plugin-lingui-macro"],
    presets: ["@babel/preset-typescript"], // così Babel capisce i file TS
  },
});

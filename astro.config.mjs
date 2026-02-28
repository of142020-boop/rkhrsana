// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import imageSitemap from "./src/integrations/image-sitemap.mjs";

export default defineConfig({
  site: "https://rkhrsana.com",
  integrations: [sitemap(), imageSitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  // 👇 الكود الجديد الذي تم إضافته لتضمين الـ CSS مباشرة
  build: {
    inlineStylesheets: "always",
  },
});
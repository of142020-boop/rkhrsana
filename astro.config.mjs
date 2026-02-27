// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://rkhrsana.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  // 👇 الكود الجديد الذي تم إضافته لتضمين الـ CSS مباشرة
  build: {
    inlineStylesheets: "always",
  },
});
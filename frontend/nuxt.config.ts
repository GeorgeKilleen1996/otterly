import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    api: {
      apiUrl: process.env.API_URL || "http://localhost:8000/",
    }
  },

  compatibilityDate: "2024-12-01"
})
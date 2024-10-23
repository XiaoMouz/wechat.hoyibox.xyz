import { UserSessionData } from './types/user.type'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['Noto Sans', 'Roboto'],
    },
  },
  runtimeConfig: {
    authSecret:
      process.env.AUTH_SECRET || Math.random().toString(36).substring(2),
    rimoPasskey:
      process.env.RIMO_PASSKEY || Math.random().toString(36).substring(2),
    domain: process.env.DOMAIN || 'localhost:3000',
  },
  icon: {
    customCollections: [
      {
        prefix: 'assets',
        dir: 'assets/icon',
      },
    ],
  },
  nitro: {
    storage: {
      kv: {
        driver: 'cloudflare-kv-binding',
        binding: 'KV_STORAGE',
      },
      blob: {
        driver: 'cloudflareR2Binding',
        binding: 'FILE_BLOB',
      },
    },
    devStorage: {
      kv: {
        driver: 'fs',
        base: './.nitro/db',
      },
      blob: {
        driver: 'fs',
        base: './.nitro/blob',
      },
    },
  },
})

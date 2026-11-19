// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      title: 'Gia Hiến & Thanh Hiền — Thiệp mời cưới',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'Trân trọng kính mời bạn đến chung vui lễ thành hôn của Phùng Gia Hiến & Trần Thanh Hiền.',
        },
        { name: 'theme-color', content: '#1A2F24' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    server: {
      watch: {
        ignored: [
          '**/drive-download-*/**',
          '**/node_modules/**',
          '**/.git/**',
          '**/.output/**',
        ],
      },
    },
  },

  ignore: ['drive-download-*/**'],
})


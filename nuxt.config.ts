// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://cdn.jsdelivr.net/npm/vue-scrollto' }],
    },
  },
  css: [
    '@/assets/styles.css',
    'simplebar/dist/simplebar.min.css',
    'vue-plyr/dist/vue-plyr.css',
    '@/assets/custom.scss',
    // 'vuetify/lib/styles/main.sass',
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/devtools',
    // ['vue-scrollto/nuxt3', { duration: 300 }],
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
});

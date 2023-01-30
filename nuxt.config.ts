// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'bootstrap/dist/css/bootstrap.min.css' },
      ],
      // script: [{ src: 'https://cdn.jsdelivr.net/npm/vue' }],
      script: [{ src: 'https://cdn.jsdelivr.net/npm/vue-scrollto' }],
    },
  },
  css: [
    '@/assets/styles.css',
    'simplebar/dist/simplebar.min.css',
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/custom.scss', // bootstrap-vue overrides
  ],
  modules: [
    '@nuxt/content',
    [
      'bootstrap-vue-next/nuxt',
      {
        components: [
          'BContainer',
          'BRow',
          'BCol',
          'BButton',
          'BCarousel',
          'BCarouselSlide',
        ],
        // directives: ['VBTooltip'],
      },
    ],
    // ['vue-scrollto/nuxt3', { duration: 300 }],
  ],
});

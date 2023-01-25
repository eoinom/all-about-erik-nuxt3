// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    [
      'bootstrap-vue-next/nuxt',
      {
        components: ['BContainer', 'BRow', 'BCol', 'BButton'],
        directives: ['VBTooltip'],
      },
    ],
  ],
  css: [
    '@/assets/styles.css',
    'simplebar/dist/simplebar.min.css',
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/custom.scss', // bootstrap-vue overrides
  ],
});

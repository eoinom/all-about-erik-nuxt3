// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

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
    // 'vuetify/lib/styles/main.sass',
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/devtools',
    // this adds the vuetify vite plugin
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins.push(
          vuetify({ styles: { configFile: './assets/custom.scss' } })
        )
      );
    },
    // ['vue-scrollto/nuxt3', { duration: 300 }],
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
});

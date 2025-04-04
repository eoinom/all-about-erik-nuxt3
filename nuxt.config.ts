// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  ssr: true,

  // // ref: https://github.com/nuxt/framework/pull/6980
  // router: {
  //   options: {
  //     hashMode: true,
  //   },
  // },
  app: {
    head: {
      script: [{ src: 'https://cdn.jsdelivr.net/npm/vue-scrollto' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  css: [
    '@/assets/styles.css',
    'simplebar-vue/dist/simplebar.min.css',
    'vue-plyr/dist/vue-plyr.css',
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
    '@fullpage/nuxt-fullpage',
    'nuxt-lazy-load',
  ],

  devtools: {
    // Enable devtools (default: true)
    enabled: false,
    // VS Code Server options
    vscode: {},
    // ...other options
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    build: {
      sourcemap: true,
    },
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  hooks: {
    'pages:extend'(pages) {
      // add routes
      pages.push({
        name: 'family-trip-to-europe-57',
        path: '/archives/family-trip-to-europe-57',
        file: '~/pages/archives/ArchiveNarrative.vue',
      });
      pages.push({
        name: 'my-amazing-mom',
        path: '/archives/my-amazing-mom',
        file: '~/pages/archives/ArchiveNarrative.vue',
      });
      pages.push({
        name: 'my-dad-earl',
        path: '/archives/my-dad-earl',
        file: '~/pages/archives/ArchiveNarrative.vue',
      });
      pages.push({
        name: 'my-dad-earl-gallery',
        path: '/archives/my-dad-earl-gallery',
        file: '~/pages/archives/ArchiveNarrativeGallery.vue',
      });
      pages.push({
        name: 'my-uncle-wesley',
        path: '/archives/my-uncle-wesley',
        file: '~/pages/archives/ArchiveNarrative.vue',
      });
    },
  },

  lazyLoad: {
    // These are the default values for nuxt-lazy-load
    images: false,
    videos: true,
    audios: false,
    iframes: true,
    native: false,
    directiveOnly: false,
  },

  compatibilityDate: '2024-09-19',
});
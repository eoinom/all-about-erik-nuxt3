import VuePlyr from 'vue-plyr';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePlyr, {
    plyr: {},
  });
});

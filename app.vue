<template>
  <div
    :class="{
      layout: true,
      'layout--lightgrey': applyLightGreyBackground,
      'layout--grey': applyGreyBackground,
      'layout--darkgrey': applyDarkGreyBackground,
      'layout--zero-padding-mbl': applyZeroLayoutPaddingMblOnly,
      'pa-0': applyZeroLayoutPadding,
      'pt-2': applyTopPadding,
      'px-3': apply12pxHorizPadding,
    }"
  >
    <Navbar />

    <!-- This transition is for all other page loads -->
    <!-- https://github.com/gridsome/gridsome/issues/24 -->
    <!-- https://github.com/gridsome/gridsome/issues/835 -->
    <!-- <transition name="page" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition> -->

    <!-- Need this transition for the home page initial load -->
    <!-- https://gridsome.org/docs/page-transitions -->
    <!-- <transition name="home" appear>
      <main>
        <NuxtPage />
      </main>
    </transition> -->

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | All About Erik` : 'All About Erik';
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://res.cloudinary.com/',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://res.cloudinary.com/',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.gstatic.com',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.jsdelivr.net',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://cdn.jsdelivr.net',
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    {
      name: 'description',
      content:
        'A site all about the life and career of Erik Jacobsen, an American record producer, song publisher and artist manager. ' +
        "He is best known for his work in the 1960s with Tim Hardin, the Lovin' Spoonful, the Charlatans, and Sopwith Camel, " +
        'and later with Norman Greenbaum, Tazmanian Devils and Chris Isaak.',
    },
  ],
});

const applyZeroLayoutPadding = ref(false);
const applyZeroLayoutPaddingMblOnly = ref(false);
const applyTopPadding = ref(false);
const apply12pxHorizPadding = ref(false);
const applyLightGreyBackground = ref(false);
const applyGreyBackground = ref(false);
const applyDarkGreyBackground = ref(false);

const archiveNarrativeUrls = [
  '/archives/family-trip-to-europe-57',
  '/archives/my-amazing-mom',
  '/archives/my-dad-earl',
  '/archives/my-uncle-wesley',
];
const urlsForZeroPadding = [
  '/the-episodes',
  '/early-productions',
  '/short-films',
  '/travels',
  '/collections',
  '/publications',
  ...archiveNarrativeUrls,
];
const urlsForLightGreyBackground = [
  '/roots-and-youth',
  '/roots-and-youth/',
  '/musical-journey/the-episodes',
  '/musical-journey/the-episodes/',
];
const urlsForDarkGreyBackground = ['/publications', '/publications/'];

const path = computed(() => {
  const route = useRoute();
  return route.path;
});

const applyPageLayoutStyling = (currentPath) => {
  applyZeroLayoutPadding.value = false;
  urlsForZeroPadding.forEach((url) => {
    if (
      currentPath.includes(url) &&
      !currentPath.includes('my-dad-earl-gallery')
    ) {
      applyZeroLayoutPadding.value = true;
    }
  });
  if (currentPath === '/') {
    // for homepage
    applyZeroLayoutPadding.value = true;
  }
  if (
    currentPath === '/archives' ||
    currentPath === '/archives/' ||
    currentPath === '/archives/menu' ||
    currentPath === '/archives/menu/'
  ) {
    applyZeroLayoutPadding.value = true;
  }

  applyZeroLayoutPaddingMblOnly.value = false;
  if (
    currentPath === '/roots-and-youth' ||
    currentPath === '/roots-and-youth/'
  ) {
    applyZeroLayoutPaddingMblOnly.value = true;
  }

  applyTopPadding.value = false;
  if (currentPath === '/discography' || currentPath === '/discography/') {
    applyTopPadding.value = true;
  }

  apply12pxHorizPadding.value = false;
  if (
    currentPath.includes('/archives/') &&
    applyZeroLayoutPadding.value === false
  ) {
    apply12pxHorizPadding.value = true;
  }

  applyGreyBackground.value = false;
  if (
    currentPath.includes('/archives/') &&
    currentPath !== '/archives/' &&
    currentPath !== '/archives/menu' &&
    currentPath !== '/archives/menu/'
  ) {
    applyGreyBackground.value = true;
  }

  applyLightGreyBackground.value = false;
  if (urlsForLightGreyBackground.includes(currentPath)) {
    applyLightGreyBackground.value = true;
  }

  applyDarkGreyBackground.value = false;
  if (urlsForDarkGreyBackground.includes(currentPath)) {
    applyDarkGreyBackground.value = true;
  }
};

onMounted(() => {
  applyPageLayoutStyling(path.value);
});

watch(path, (newPath) => {
  applyPageLayoutStyling(newPath);
});
</script>

<style lang="scss">
body {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

.layout {
  max-width: 100%;
  margin: 0 auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;

  &--lightgrey {
    background-color: #dddddd;
  }
  &--grey {
    background-color: #222222;
  }
  &--darkgrey {
    background-color: #141414;
  }
}

/* Transition styles on router-view for fading the page */
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .layout {
    &--zero-padding-mbl {
      padding: 0;
    }
  }
}
</style>

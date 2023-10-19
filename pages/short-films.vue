<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <!-- <BackgroundMusic
        :audioFile="shortFilmsPgContent.bgAudio"
        :audioDuration="shortFilmsPgContent.bgAudioDuration"
        :audioFadeInDuration="shortFilmsPgContent.bgAudioFadeInDuration"
        :audioFadeOutDuration="shortFilmsPgContent.bgAudioFadeOutDuration"
      /> -->

      <header
        id="header"
        :style="headerStyle"
      >
        <img
          :src="titleImg"
          id="titleImg"
          class="my-6"
          data-testid="title-img"
        />
      </header>

      <v-container
        fluid
        id="mainContainer"
        class="mb-6 pb-12 pb-xl-4 px-1"
      >
        <!-- MAIN VIDEO -->
        <v-row
          no-gutters
          justify="center"
          align="center"
          id="mainVideoContainer"
          class="my-2 my-sm-4 px-2 px-sm-4"
        >
          <v-col
            cols="12"
            align-self="center"
          >
            <div>
              <iframe
                :src="mainVideoUrl + '?autoplay=1&loop=1&muted=1&color=505050'"
                width="960"
                height="540"
                frameborder="0"
                id="mainVideo"
                data-not-lazy
              />
            </div>
          </v-col>
        </v-row>

        <!-- VIDEOS -->
        <v-row
          no-gutters
          justify="center"
          id="videos"
        >
          <v-col
            cols="6"
            sm="4"
            xl="3"
            align-self="center"
            v-for="(video, index) in videos"
            :key="video.title"
            @click="videoIndex = index"
            class="mb-2 mb-sm-4 px-2 px-sm-4"
            data-testid="video-container"
          >
            <VideoThumbnailShortFilms :video="video" />
          </v-col>
        </v-row>
      </v-container>

      <VideoLightBox
        :videos="videos"
        :index="videoIndex"
        :disable-scroll="true"
        @close="videoIndex = null"
      />

      <BackToTop />
    </div>
  </router-view>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://player.vimeo.com/',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://player.vimeo.com/',
    },
    {
      rel: 'preload',
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1579900417/Short%20Films/title-bg-barracuda_cropped_ckym2i.jpg',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
    {
      rel: 'preload',
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1579900458/Short%20Films/short-films_e2hric.png',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
    {
      rel: 'preload',
      href: 'https://player.vimeo.com/video/309111649',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
  ],
});
</script>

<script>
export default {
  data() {
    return {
      shortFilmsPgContent: {},
      videoIndex: null,
    };
  },

  computed: {
    pageTitle() {
      return this.shortFilmsPgContent.pageTitle;
    },
    headerBgImg() {
      return this.shortFilmsPgContent.headerBgImg;
    },
    titleImg() {
      return this.shortFilmsPgContent.titleImg;
    },
    mainVideoUrl() {
      return this.shortFilmsPgContent.mainVideoUrl;
    },
    videos() {
      return this.shortFilmsPgContent.videos;
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
      };
    },
  },

  async mounted() {
    const shortFilmsPgContent = await queryContent('short-films').findOne();
    this.shortFilmsPgContent = shortFilmsPgContent;
  },
};
</script>

<style scoped>
#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 1396px;
  padding: 0;
  text-align: center;
}

#mainVideo {
  max-width: 100%;
  --containerWidth: calc(100vw - 32px);
  max-height: calc(0.5625 * var(--containerWidth));
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  #mainVideo {
    --containerWidth: calc(100vw - 16px);
  }
}

@media only screen and (min-width: 977px) {
  #mainVideoContainer {
    margin: 8px 0;
  }
}
</style>

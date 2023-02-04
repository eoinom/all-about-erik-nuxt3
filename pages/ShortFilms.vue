<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>

  <BackgroundMusic
    :audioFile="shortFilmsPgContent.bgAudio"
    :audioDuration="shortFilmsPgContent.bgAudioDuration"
    :audioFadeInDuration="shortFilmsPgContent.bgAudioFadeInDuration"
    :audioFadeOutDuration="shortFilmsPgContent.bgAudioFadeOutDuration"
  />

  <header
    id="header"
    :style="headerStyle"
  >
    <img
      :src="titleImg"
      id="titleImg"
      class="my-4"
      data-testid="title-img"
    />
  </header>

  <v-container
    fluid
    id="mainContainer"
    class="mb-4 pb-5 pb-xl-3 px-1"
  >
    <!-- MAIN VIDEO -->
    <v-row
      no-gutters
      justify="center"
      align="center"
      id="mainVideoContainer"
      class="my-2 my-sm-3 px-2 px-sm-3"
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
        class="mb-2 mb-sm-3 px-2 px-sm-3"
        data-testid="video-container"
      >
        <video-thumbnail-short-films :video="video" />
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
</template>

<script scoped>
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
.layout {
  padding: 0;
}

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

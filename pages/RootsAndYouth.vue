<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>

  <BackgroundMusic
    :audioFile="rootsContent.bgAudio"
    :audioDuration="rootsContent.bgAudioDuration"
    :audioFadeInDuration="rootsContent.bgAudioFadeInDuration"
    :audioFadeOutDuration="rootsContent.bgAudioFadeOutDuration"
  />

  <v-container
    fluid
    class="main-col"
  >
    <!-- HEADER SLIDESHOW -->
    <v-row
      no-gutters
      style="max-height: 1224px; width: auto"
      class="mb-1 px-1"
    >
      <v-col class="slideshowCol">
        <slideshow-images
          :slides="slides"
          :carouselHeight="carouselHeight"
        />

        <v-container
          fluid
          class="slideshowOverlay"
        >
          <v-row>
            <v-col class="mainContent">
              <img
                alt="Roots and Youth title image"
                v-if="titleImg != null"
                :src="titleImg"
                id="titleImg"
                class="mb-md-1 mb-lg-2 mb-xl-3"
                data-testid="title-img"
              />

              <div>
                <ContentRenderer
                  :value="rootsContent"
                  tag="div"
                  id="mainText"
                />
              </div>

              <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
              <ScrollDownArrow
                scrollToElement="#videos"
                class="d-none d-sm-inline"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- VIDEOS -->
    <v-row
      no-gutters
      id="videos"
      class="mb-1"
    >
      <v-col
        cols="12"
        lg="6"
        v-for="(video, index) in videos"
        :key="video.title"
        @click="videoIndex = index"
        class="my-1 px-1 video-container"
        data-testid="video-container"
      >
        <video-thumbnail-roots :video="video" />
      </v-col>
    </v-row>

    <!-- COMPLETE FILM -->
    <v-row
      v-if="fullVideo != null"
      no-gutters
      class="mb-0 px-1"
    >
      <v-col>
        <v-row
          id="completeFilmContainer"
          class="mx-0 mb-2"
        >
          <v-col
            class="completeFilmContent"
            @click="videoIndex = allVideos.length - 1"
          >
            <v-row
              align="center"
              justify="center"
              class="mb-0 py-4"
            >
              <v-col
                cols="auto"
                id="completeFilmPlayIconCol"
                style="text-align: right"
                class="pr-1"
              >
                <img
                  alt="Play symbol"
                  src="~/assets/images/playarrowcircle-black.png"
                  id="fullVideoPlayImg"
                />
                <img
                  alt="Play symbol"
                  src="~/assets/images/playarrowcircle-hover.png"
                  id="fullVideoPlayImg-hover"
                />
              </v-col>

              <v-col
                cols="auto"
                id="completeFilmIconTextCol"
                style="text-align: left"
                class="pl-1"
              >
                <p class="playFilmText mb-0">PLAY FILM</p>
                <p
                  v-if="fullVideo.duration != null"
                  class="fullVideoDurationText mb-2"
                >
                  {{ durationInMinsText(fullVideo.duration) }}
                </p>
              </v-col>

              <v-col cols="auto">
                <p
                  id="completeFilmSubText"
                  class="mb-0 mt-1"
                >
                  {{ fullVideo.text }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <VideoLightBox
    :videos="allVideos"
    :index="videoIndex"
    :disable-scroll="true"
    @close="videoIndex = null"
  />
</template>

<script scoped>
export default {
  data() {
    return {
      rootsContent: {},
      videoIndex: null,
      windowWidth: 0,
    };
  },

  computed: {
    pageTitle() {
      return this.rootsContent.pageTitle;
    },
    titleImg() {
      return this.rootsContent.headingImg;
    },
    slides() {
      return this.rootsContent.slides;
    },
    videos() {
      return this.rootsContent.videos ?? [];
    },
    fullVideo() {
      return this.rootsContent.fullVideo;
    },
    allVideos() {
      const allVids = [...this.videos];
      allVids.push(this.fullVideo);
      return allVids;
    },
    images() {
      return this.slides.map((a) => a.img);
    },
    horizPaddingPercent() {
      return this.windowWidth < 576 ? 0 : 6;
    },
    horizPadding() {
      return this.horizPaddingPercent + '%';
    },
    carouselHeight() {
      const aspectRatio = 1.855;
      return (
        ((1 - (2 * this.horizPaddingPercent) / 100) * this.windowWidth) /
        aspectRatio
      );
    },
  },

  async mounted() {
    const rootsContent = await queryContent('roots-and-youth').findOne();
    console.log({ rootsContent });
    this.rootsContent = rootsContent;

    this.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60);
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60);
        mins = mins - hrs * 60;
        if (mins < 10) mins = '0' + mins;
        if (hrs == 1) return '1 hr ' + mins + ' min';
        else return hrs + ' hrs ' + mins + ' min';
      } else {
        secs = secs - mins * 60;
        if (secs < 10) secs = '0' + secs;
        return mins + ':' + secs + ' min';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../assets/fonts/nhaasgrotesktxpro-55rg.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../assets/fonts/nhaasgrotesktxpro-65md.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  background-color: #dddddd;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  padding: 0 v-bind(horizPadding);
}

.slideshowCol {
  position: relative;
  max-height: 1224px;
  width: auto;
  text-align: center;
}

.slideshowOverlay {
  z-index: 100;
  height: 100%;
  top: 0;
  position: absolute;
}

.slideshowOverlay .mainContent {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 2%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
  z-index: 500;
}

.video-container {
  position: relative;
}

#titleImg {
  width: 100%;
  max-width: 1492px;
  height: auto;
  margin: auto;
}

#mainText {
  color: #ffffff;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-size: 1.85rem;
  font-weight: 500;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.65);
  line-height: 43px;
  letter-spacing: 2px;
}

#completeFilmContainer {
  background-color: #ffffff;
  text-align: center;
}
.completeFilmContent:hover {
  color: #eed047;
  cursor: pointer;
}
.completeFilmContent #fullVideoPlayImg-hover {
  display: none;
}
.completeFilmContent:hover #fullVideoPlayImg-hover {
  display: inline;
  cursor: pointer;
}
.completeFilmContent:hover #fullVideoPlayImg {
  display: none;
}

.playFilmText {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.125rem; // 18px at 16px default size
  text-transform: uppercase;
  letter-spacing: 5px;
}

.fullVideoDurationText {
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 0.875rem; // 14px at 16px default size
  margin-top: -2px;
}

#completeFilmSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem; // 23px at 16px default size
  letter-spacing: 1px;
  text-align: justify;
  line-height: 35px;
  max-width: 420px;
}

// Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/

// Extra small devices (portrait phones, less than 576px)
@media only screen and (max-width: 575.98px) {
  .layout {
    padding: 0 0;
  }
  .slideshowOverlay .mainContent {
    padding-left: 15%;
    padding-right: 15%;
  }
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
    margin-bottom: 0px;
  }
  #mainText > p {
    margin-bottom: 0px !important;
  }
  #completeFilmSubText {
    font-size: 1.2rem;
    text-align: center;
  }
}

// Small devices (landscape phones, 576px and up)
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
  }
  #mainText p {
    margin-bottom: 0px !important;
  }
  #completeFilmSubText {
    font-size: 1.32rem;
    text-align: center;
  }
}

// Medium devices (tablets, 768px and up)
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  #mainText {
    font-size: 1.2rem;
    line-height: 24px;
  }
}

// Large devices (desktops, 992px and up)
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  #mainText {
    font-size: 1.5rem;
    line-height: 33px;
  }
}
</style>

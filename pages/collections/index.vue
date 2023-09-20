<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <BackgroundMusic
        :audioFile="collectionsPgContent.bgAudio"
        :audioDuration="collectionsPgContent.bgAudioDuration"
        :audioFadeInDuration="collectionsPgContent.bgAudioFadeInDuration"
        :audioFadeOutDuration="collectionsPgContent.bgAudioFadeOutDuration"
        :playMusic="playMusic"
      />

      <v-container fluid class="main-col">
        <v-row no-gutters class="mb-1 px-1">
          <v-col class="slideshowCol">
            <!-- HEADER SLIDESHOW -->
            <SlideshowKenBurnsSmall
              :slides="slides"
              :height="slideshowHeight"
            />

            <!-- SLIDESHOW OVERLAY -->
            <div class="slideshowOverlay">
              <div class="mainContent">
                <img
                  alt="Collections title image"
                  v-if="titleImg != null"
                  :src="titleImg"
                  id="titleImg"
                  class="mb-md-1 mb-lg-2 mb-xl-4"
                  data-testid="title-img"
                />
                <div>
                  <ContentRenderer
                    :value="collectionsPgContent"
                    tag="div"
                    id="slideshowText"
                  />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="collectionsContainer">
        <v-row no-gutters justify="center" class="collectionsRow mb-1 mx-auto">
          <v-col
            v-for="(collection, index) in collections"
            :key="index"
            cols=""
            align-self="center"
            class="collectionsCols pa-0 mx-0 my-2"
            data-testid="collection-container"
          >
            <CollectionThumbnail :collection="collection" />
          </v-col>
        </v-row>
      </v-container>

      <BackToTop />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      collectionsPgContent: {},
      videoIndex: null,
      mainColHeight: 600,
      interval: null,
      playMusic: true,
    };
  },

  computed: {
    pageTitle() {
      return this.collectionsPgContent.pageTitle;
    },
    titleImg() {
      return this.collectionsPgContent.titleImg;
    },
    slides() {
      return this.collectionsPgContent.slides;
    },
    collections() {
      return this.collectionsPgContent.collections;
    },
    slideshowHeight() {
      let height = this.mainColHeight + 30;
      return height + 'px';
    },
  },

  created() {
    if (this.$route.query.hasOwnProperty('playMusic')) {
      this.playMusic = this.$route.query.playMusic == 'true';
    }
  },

  async mounted() {
    const collectionsPgContent = await queryContent(
      'collections-index'
    ).findOne();
    this.collectionsPgContent = collectionsPgContent;

    this.observeTextBlockHeight();
    setTimeout(
      function() {
        this.clearTheInterval();
      }.bind(this),
      8000
    );

    window.addEventListener('resize', () => {
      let textEl = document.getElementById('slideshowText');
      this.mainColHeight = this.getElementOffset(textEl).bottom;
    });
  },

  beforeUnmount() {
    if (!document) return;
    this.clearTheInterval();
  },

  methods: {
    clearTheInterval() {
      clearInterval(this.interval);
    },
    observeTextBlockHeight() {
      this.interval = setInterval(
        function() {
          let textEl = document.getElementById('slideshowText');
          this.mainColHeight = this.getElementOffset(textEl).bottom;
        }.bind(this),
        500
      );
    },
    getElementOffset(el) {
      let top = 0;
      let bottom = 0;
      let element = el;
      let height = el.offsetHeight;

      // Loop through the DOM tree
      // and add it's parent's offset to get page offset
      do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);

      bottom = top + height;

      return {
        top,
        bottom,
      };
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../../assets/fonts/nhaasgrotesktxpro-65md.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

* {
  --collectionWidth: 357.8px;
  --collectionScale: 1;
  --maxCollectionsPerRow: 7;
  --extraMargin: 6px;
  --collectionsDivWidth: calc(
    var(--maxCollectionsPerRow) *
      (var(--collectionScale) * var(--collectionWidth) + var(--extraMargin))
  ); /* Full width for a 27" screen */
}

.row {
  margin-bottom: 20px;
}

.main-col {
  max-width: 1458px;
  min-height: 600px;
}

.slideshowCol {
  position: relative;
  max-height: 1224px;
  width: auto;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slideshowOverlay {
  position: absolute;
  top: 0;
  z-index: 100;
}

.mainContent {
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 85px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 500;
}

#titleImg {
  width: 100%;
  max-width: 650px;
  min-width: 250px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

#slideshowText {
  color: #ffffff;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: 2px;
  text-align: justify;
  text-shadow: 0px 0px 250px #1c0f07, 0px 0px 250px #1c0f07 /* glow */,
    1px 1px 2px rgba(28, 16, 23, 0.89) /* drop shadow*/;
}

#slideshowText > p {
  margin-bottom: 16px !important;
}

.collectionsContainer {
  margin-bottom: 88px;
}

.collectionsContainer,
.collectionsRow {
  padding: 0;
  max-width: var(--collectionsDivWidth);
}

.collectionsCols {
  max-width: calc(
    var(--collectionsDivWidth) / var(--maxCollectionsPerRow)
  ) !important;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  * {
    --collectionScale: 0.65;
    --maxCollectionsPerRow: 1;
  }
  .main-col {
    padding: 0 !important;
  }
  .mainContent {
    padding-left: 15%;
    padding-right: 15%;
  }
  #slideshowText {
    font-size: calc(
      1rem + 2 * (100vw - 375px) / (576 - 375)
    ); /* varies between 16px (1rem) and 18px */
    line-height: calc(
      1.0625rem + 3 * (100vw - 375px) / (576 - 375)
    ); /* varies between 17px (1.0625rem) and 20px */
    margin-bottom: 0px;
  }
  #slideshowText > p {
    margin-bottom: 0px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  * {
    --collectionScale: 0.55934;
    --maxCollectionsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: calc(
      1.125rem + 1.2 * (100vw - 576px) / (768 - 576)
    ); /* varies between 18px (1.125rem) and 19.2px */
    line-height: 24px;
  }
  #slideshowText p {
    margin-bottom: 0px !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  * {
    --collectionScale: 0.7;
    --maxCollectionsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: calc(
      1.2rem + 1.8 * (100vw - 768px) / (992 - 768)
    ); /* varies between 19.2px (1.2rem) and 21px */
    line-height: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  * {
    --collectionScale: 0.7;
    --maxCollectionsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: 1.3125rem;
    line-height: 1.65rem;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  * {
    --collectionScale: 0.9;
    --maxCollectionsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1500px) and (max-width: 1749.98px) {
  .mainContent {
    padding-left: 10%;
    padding-right: 10%;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1500px) and (max-width: 2539.98px) {
  * {
    --maxCollectionsPerRow: 4;
  }
}
</style>

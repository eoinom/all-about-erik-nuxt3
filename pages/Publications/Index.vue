<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>

  <BackgroundMusic
    :audioFile="publicationsPgContent.bgAudio"
    :audioDuration="publicationsPgContent.bgAudioDuration"
    :audioFadeInDuration="publicationsPgContent.bgAudioFadeInDuration"
    :audioFadeOutDuration="publicationsPgContent.bgAudioFadeOutDuration"
    :maxVolume="0.78"
    :playMusic="playMusic"
  />

  <v-container
    fluid
    class="main-col"
  >
    <v-row
      no-gutters
      class="mb-1 pt-4 px-1"
    >
      <v-col class="slideshowCol">
        <!-- HEADER SLIDESHOW -->
        <SlideshowKenBurnsSmall
          :slides="slides"
          :height="slideshowHeight"
          :maxImgWidth="slideshowMaxWidth"
          :centerVertically="true"
          backgroundColor="#141414"
        />

        <!-- SLIDESHOW OVERLAY -->
        <div class="slideshowOverlay">
          <div class="mainContent">
            <img
              alt="Publications title image"
              v-if="titleImg != null"
              :src="titleImg"
              id="titleImg"
              class="mb-md-1 mb-lg-2 mb-xl-3"
              data-testid="title-img"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container
    v-if="windowWidth > 1200"
    fluid
    class="publicationsContainer"
  >
    <v-row
      no-gutters
      justify="center"
      class="publicationsRow mb-1"
    >
      <v-col
        v-for="(publication, i) in publications"
        :key="'publication' + i"
        cols=""
        align-self="center"
        class="publicationsCols p-0 m-2 m-md-3"
        data-testid="publication-container"
      >
        <PublicationThumbnail :publication="publication" />
      </v-col>
    </v-row>
  </v-container>

  <v-container
    v-if="windowWidth <= 1200"
    fluid
    class="publicationsContainer"
  >
    <v-row
      no-gutters
      justify="center"
      class="publicationsRow mb-1"
    >
      <v-col
        v-for="(newPublication, i) in publicationsAltOrder"
        :key="'newPublication' + i"
        cols=""
        align-self="center"
        class="publicationsCols p-0 m-2 m-md-3"
        data-testid="publication-container"
      >
        <PublicationThumbnail :publication="newPublication" />
      </v-col>
    </v-row>
  </v-container>

  <BackToTop />
</template>

<script scoped>
export default {
  data() {
    return {
      publicationsPgContent: {},
      windowWidth: 0.0,
      playMusic: true,
    };
  },

  computed: {
    pageTitle() {
      return this.publicationsPgContent.pageTitle;
    },
    titleImg() {
      return this.publicationsPgContent.titleImg;
    },
    slides() {
      return this.publicationsPgContent.slides;
    },
    publications() {
      return this.publicationsPgContent.publications;
    },
    publicationsAltOrder() {
      let publicationsClone = [...this.publications];
      let pubsAltOrder = publicationsClone.filter((val, index) => index !== 1);
      pubsAltOrder.unshift(this.publications[1]);
      return pubsAltOrder;
    },
    slideshowHeight() {
      if (this.windowWidth > 1000) return '420px';
      else {
        const minImgWidth = 691;
        const maxImgHeight = 407;
        let maxWidth = 0.9 * this.windowWidth;
        let width = Math.min(maxWidth, minImgWidth);
        let factor = width / minImgWidth;
        let height = factor * maxImgHeight;
        return height + 'px';
      }
    },
    slideshowMaxWidth() {
      if (this.windowWidth > 1000) return 'initial';
      else return '90vw';
    },
  },

  created() {
    if (this.$route.query.hasOwnProperty('playMusic')) {
      this.playMusic = this.$route.query.playMusic == 'true';
    }
  },

  async mounted() {
    const publicationsPgContent = await queryContent(
      'publications-index'
    ).findOne();
    this.publicationsPgContent = publicationsPgContent;

    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
    window.addEventListener('orientationchange', () => {
      this.windowWidth = window.innerWidth;
    });
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
  --publicationWidth: 829.7px;
  --publicationScale: 1;
  --maxPublicationsPerRow: 3;
  --publicationsDivWidth: 1900px;
}

.layout {
  padding: 0;
  background-color: #141414 !important;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  max-width: 1458px;
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
  width: 100%;
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
  max-width: 755px;
  min-width: 250px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

.publicationsContainer,
.publicationsRow {
  padding: 0;
  max-width: var(--publicationsDivWidth);
}

.publicationsContainer {
  padding-bottom: 88px;
}

.publicationsCols {
  flex-grow: 0;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  * {
    --publicationScale: 0.65;
    --maxPublicationsPerRow: 1;
  }
  .layout,
  .main-col {
    padding: 0 0;
  }
  .mainContent {
    padding-left: 15%;
    padding-right: 15%;
  }
}

/* Special breakpoint (portrait phones, less than 345px, e.g. iPhone 5) */
@media only screen and (max-width: 344.98px) {
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  * {
    --publicationScale: 0.55934;
    --maxPublicationsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  * {
    --publicationScale: 0.7;
    --maxPublicationsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  * {
    --publicationScale: 0.7;
    --maxPublicationsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  * {
    --publicationScale: 0.9;
    --maxPublicationsPerRow: 3;
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
    --maxPublicationsPerRow: 4;
  }
}

/* Special breakpoint */
@media only screen and (max-width: 2100px) {
  * {
    --publicationsDivWidth: 1360px;
  }
}

/* Special breakpoint */
@media only screen and (max-width: 1599.98px) {
  * {
    /* --publicationsDivWidth: 1100px; */
    --publicationsDivWidth: 1250px;
  }
}

/* Special breakpoint */
@media only screen and (max-width: 1200px) {
  * {
    --publicationsDivWidth: 900px;
  }
}

/* Special breakpoint */
@media only screen and (max-width: 767.98px) {
  * {
    --publicationsDivWidth: 600px;
  }
}
</style>

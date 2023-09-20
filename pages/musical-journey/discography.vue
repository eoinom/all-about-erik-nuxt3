<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div class="pb-12">
        <BackgroundMusic
          :audioFile="discographyPgContent.bgAudio"
          :audioDuration="discographyPgContent.bgAudioDuration"
          :audioFadeInDuration="discographyPgContent.bgAudioFadeInDuration"
          :audioFadeOutDuration="discographyPgContent.bgAudioFadeOutDuration"
        />

        <div
          v-for="(img, index) in backgroundImages"
          :key="index"
          data-testid="background-img-container"
        >
          <img
            :src="img.img"
            class="bgImg bgImgBack"
            :class="hideBgImg(index)"
            :style="bgStyles"
          />
          <img
            :src="img.imgOverlay"
            class="bgImg bgImgOverlay"
            :class="hideBgImgOverlay(index)"
            :style="bgStyles"
          />
        </div>

        <header
          id="header"
          :style="headerStyles"
        >
          <img
            :src="titleImg"
            id="titleImg"
            class="mb-6"
            data-testid="title-img"
          />
          <p id="titleSubText">{{ titleSubText }}</p>
          <p id="targetForOpacity"></p>
        </header>

        <div
          id="scrollDownContainer"
          style="text-align: center"
          class="pb-12"
        >
          <ScrollDownArrow scrollToElement="#topOfMainBody" />
        </div>

        <div id="topOfMainBody"></div>

        <v-container
          fluid
          :style="bodyOpacity"
          class="mb-12 py-4 main-col"
        >
          <div class="px-6 py-4">
            <div>
              <ContentRenderer
                :value="discographyPgContent"
                tag="span"
                class="discography_content"
              />
            </div>
          </div>

          <div class="px-6">
            <h2 id="albumReleasesHeading">ALBUM RELEASES</h2>
            <div
              v-for="(album, index) in albums"
              :key="index"
              class="mt-6 mb-2 mb-md-4 mb-lg-6 albumText"
              data-testid="album-container"
            >
              <v-row>
                <v-col class="pb-0">
                  <div class="mb-4">
                    <span class="albumTitle">{{
                      album.artist + ' - ' + album.title
                    }}</span>
                  </div>
                  <p class="albumIntroText">{{ album.text }}</p>
                </v-col>
              </v-row>

              <v-row align-content="center">
                <v-col
                  cols="12"
                  lg="6"
                  xl="5"
                  class="py-0"
                >
                  <div
                    style="text-align: center"
                    class="mb-4"
                  >
                    <img
                      :src="album.thumbnailImg"
                      style="max-width: 100%"
                      class=""
                    />
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  lg="6"
                  xl="4"
                  class="pt-0"
                >
                  <span class="underline">Tracks</span>
                  <div
                    v-html="convertTrackListingToHtml(album.trackListing)"
                    class="discography_albumTrackListing"
                  />
                </v-col>

                <v-col
                  cols="12"
                  lg="12"
                  xl="3"
                  class="albumDetailsText my-2 pt-2 pb-0"
                >
                  <v-row>
                    <v-col class="py-0">
                      <span class="underline">Details</span>
                    </v-col>
                  </v-row>
                  <v-row v-for="d in getAlbumDetails(album)">
                    <v-col
                      cols="4"
                      sm="3"
                      md="2"
                      xxl="4"
                      class="py-0"
                    >
                      {{ d.title }}:
                    </v-col>
                    <v-col class="py-0">{{ d.value }}</v-col>
                  </v-row>
                </v-col>

                <v-col
                  cols="12"
                  class="albumDetailsText my-2"
                >
                  <span class="underline">Credits</span>
                  <div
                    v-html="convertCreditsToHtml(album.credits)"
                    :class="albumCreditsClass(album.credits)"
                    class="discography_albumCredits"
                  />
                </v-col>
              </v-row>
            </div>
          </div>
        </v-container>

        <BackToTop />
      </div>
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      discographyPgContent: {},
      scrollY: 0.0,
      targetPosY: 0.0,
      windowWidth: 0.0,
      windowHeight: 0.0,
      bgImgWidth: 2560.0,
      bgImgHeight: 1380.0,
      documentHeight: null,
      scrollGap: null,
    };
  },

  computed: {
    pageTitle() {
      return this.discographyPgContent.pageTitle;
    },
    titleImg() {
      return this.discographyPgContent.titleImg;
    },
    titleSubText() {
      return this.discographyPgContent.titleText;
    },
    albums() {
      return this.discographyPgContent.albums;
    },
    backgroundImages() {
      return this.discographyPgContent.backgroundImages;
    },
    bgImgIndex() {
      if (this.documentHeight != null) {
        this.scrollGap =
          (this.documentHeight - this.windowHeight) /
          this.backgroundImages.length;
        return Math.min(
          Math.floor(this.scrollY / this.scrollGap),
          this.backgroundImages.length - 1
        );
      } else return 0;
    },
    bgImgOverlayIndex() {
      if (this.scrollGap != null && this.scrollY >= this.scrollGap / 2) {
        return Math.min(
          Math.floor((this.scrollY - this.scrollGap / 2) / this.scrollGap),
          this.backgroundImages.length - 1
        );
      } else return null;
    },
    bgStyles() {
      let css = {};
      if (this.bgImgAspectRatio <= this.windowAspectRatio)
        css.width = this.windowWidth + 'px';
      else css.height = this.windowHeight + 'px';
      return css;
    },
    bodyOpacity() {
      let css = {};
      css.opacity =
        this.scrollY < this.targetPosY ? this.scrollY / this.targetPosY : 1.0;
      return css;
    },
    headerStyles() {
      let css = {};
      css.opacity =
        this.scrollY < this.targetPosY
          ? 1.0 - this.scrollY / this.targetPosY
          : 0.0;
      css.paddingTop = this.paddingTop + 'px';
      return css;
    },
    bgImgAspectRatio() {
      return this.bgImgHeight > 0 ? this.bgImgWidth / this.bgImgHeight : 0.0;
    },
    windowAspectRatio() {
      return this.windowWidth / this.windowHeight;
    },
    paddingTop() {
      if (this.windowWidth < 400)
        return Math.max(45, this.windowHeight / 2 - 270);
      else if (this.windowWidth < 576) return this.windowHeight / 2 - 300;
      else return this.windowHeight / 2 - 200;
    },
  },

  async mounted() {
    const discographyPgContent = await queryContent(
      'musical-journey/discography'
    ).findOne();
    this.discographyPgContent = discographyPgContent;

    this.addScrollListener();

    setTimeout(
      function() {
        if (window.scrollY != 0) {
          window.scrollTo(0, 0); // scroll to top of page (avoid inconsistent behaviour of using browser back button)
          this.scrollY = window.scrollY;
        }
        let bodyRect = document.body.getBoundingClientRect();
        let element = document.getElementById('topOfMainBody');
        let elemRect = element.getBoundingClientRect();
        this.targetPosY = elemRect.top - bodyRect.top;
      }.bind(this),
      500
    );

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.getDocumentHeight();

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.getDocumentHeight();

        let bodyRect = document.body.getBoundingClientRect();
        let element = document.getElementById('topOfMainBody');
        let elemRect = element.getBoundingClientRect();
        this.targetPosY = elemRect.top - bodyRect.top;
      });
    });
  },

  methods: {
    hideBgImg(index) {
      if (index === this.bgImgIndex) return 'show';
      else if (index === this.bgImgIndex - 1 || index === this.bgImgIndex + 1)
        return 'hidden';
      else return 'displayNone'; // avoids having too many layers using up too much memory (causes page load failures on iOS devices)
      // Ref: https://medium.com/@jeffreyrussom/deadly-css-transforms-1e12b4c23f8
    },
    hideBgImgOverlay(index) {
      if (index === this.bgImgOverlayIndex) return 'showOverlay';
      else if (
        index === this.bgImgOverlayIndex - 1 ||
        index === this.bgImgOverlayIndex + 1
      )
        return 'hidden';
      else return 'displayNone';
    },
    scrollFunction() {
      this.getDocumentHeight();

      if (this.scrollY != window.scrollY) {
        this.scrollY = window.scrollY;
        let bodyRect = document.body.getBoundingClientRect();
        let element = document.getElementById('topOfMainBody');
        let elemRect = element.getBoundingClientRect();
        this.targetPosY = elemRect.top - bodyRect.top;
      }
    },
    addScrollListener() {
      window.addEventListener('scroll', this.scrollFunction);
    },
    convertTrackListingToHtml(input) {
      let output = '';
      const lines = input.split('\n');
      let inList = false;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.substring(0, 2) === '* ') line = line.substring(2);

        if (!line) continue;

        if (line.toLowerCase().substring(0, 4) === 'side') {
          if (inList) {
            output += '</ol>';
            inList = false;
          }
          output += '<p>' + line + '</p>';
        } else {
          if (
            output === '' ||
            output.substring(output.length - 4, output.length) === '</p>'
          ) {
            output += '<ol>';
            inList = true;
          }
          output += '<li>' + line + '</li>';
        }
      }
      output += '</ol>';
      return output;
    },
    convertCreditsToHtml(input) {
      let output = '';
      const lines = input.split('\n');
      let inList = false;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.substring(0, 2) === '* ') line = line.substring(2);

        if (!line) continue;

        if (output === '') {
          output += '<ul>';
          inList = true;
        }
        output += '<li>' + line + '</li>';
      }
      output += '</ul>';
      return output;
    },
    numListItems(inputText) {
      const htmlText = this.convertCreditsToHtml(inputText);
      return (htmlText.match(/<li>/g) || []).length;
    },
    albumCreditsClass(creditsText) {
      let numItems = this.numListItems(creditsText);
      if (numItems <= 4) return 'discography_albumCredits_sm';
      else if (numItems <= 8) return 'discography_albumCredits_md';
      else return 'discography_albumCredits_lg';
    },
    getDocumentHeight() {
      // ref: https://stackoverflow.com/a/1147768
      const body = document.body;
      const html = document.documentElement;
      this.documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
    },
    getAlbumDetails(album) {
      return [
        {
          title: 'Label',
          value: album.label,
        },
        {
          title: 'Format',
          value: album.format,
        },
        {
          title: 'Country',
          value: album.country,
        },
        {
          title: 'Released',
          value: album.released,
        },
        {
          title: 'Style',
          value: album.style,
        },
      ];
    },
  },
};
</script>

<style scoped>
/* Note: additional styles for injected html added to global styles.css */

@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

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

.hidden {
  opacity: 0;
}
.show {
  opacity: 1;
}
.displayNone {
  opacity: 0;
  display: none;
}
.showOverlay {
  opacity: 0.51;
}

.bgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
  transition: opacity 0.5s ease;
}
.bgImgBack {
  z-index: -2;
}
.bgImgOverlay {
  z-index: -1;
}

#header {
  width: 100%;
  padding-bottom: 2%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
}

#titleImg {
  width: 100%;
  max-width: 1203px;
  min-width: 350px;
  height: auto;
  margin: auto;
}

#titleSubText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-size: 1.5rem; /* 24px at 16px default size */
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 2px;
  text-align: justify;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.29);
}

#scrollDownContainer {
  margin-top: 80px;
}

.main-col {
  background-color: rgba(255, 255, 255, 0.75);
  width: 1200px;
}

#albumReleasesHeading {
  color: #000000;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 2.9375rem; /* 47px at 16px default size */
  letter-spacing: 5px;
  line-height: 47px;
  text-align: left;
  text-rendering: auto;
  text-transform: uppercase;
}

.albumText {
  color: #000000;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 400;
  letter-spacing: 1px;
}
.albumTitle {
  font-family: 'NeueHaasGroteskText Pro65';
  font-size: 1.25rem; /* 20px at 16px default size */
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 4px;
  text-align: left;
  text-transform: uppercase;
}
.albumIntroText {
  font-size: 1.3125rem; /* 21px at 16px default size */
  line-height: 26px;
  text-align: justify;
}
.discography_albumTrackListing {
  font-size: 1.0625rem; /* 17px at 16px default size */
  line-height: 25px;
  text-align: left;
}
.albumDetailsText {
  font-size: 1.0625rem; /* 17px at 16px default size */
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 1px;
  text-align: left;
}
.discography_albumCredits {
  font-size: 1.0625rem; /* 17px at 16px default size */
  line-height: 26px;
  text-align: left;
}
.underline {
  border-bottom: 1px solid #000;
  padding-bottom: 0.5px;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra extra small devices (portrait phones, < 400px) */
@media only screen and (max-width: 398.98px) {
  #titleSubText {
    font-size: 0.9375rem; /* 15px at 16px default size */
    line-height: 1.33887rem; /* 21.42px at 16px default size */
  }
}
/* Extra extra small devices (portrait phones, 400 - 576px) */
@media only screen and (min-width: 400px) and (max-width: 575.98px) {
  #titleSubText {
    font-size: 1rem; /* 16px at 16px default size */
    line-height: 1.428125rem; /* 22.85px at 16px default size */
  }
}

/* Extra small devices (portrait phones, < 576px) */
@media only screen and (max-width: 575.98px) {
  /* @media only screen and (min-width: 400px) and (max-width: 575.98px) { */
  #header {
    padding-left: 10%;
    padding-right: 10%;
  }
  #titleImg {
    width: 100%;
    min-width: 100%;
  }
  .main-col {
    width: 100%;
  }
  #scrollDownContainer {
    margin-top: 40px;
  }
  #albumReleasesHeading {
    font-size: 30px;
    line-height: 30px;
  }
  .albumTitle {
    font-size: 1rem;
    line-height: 1rem;
    letter-spacing: 2px;
  }
  .albumIntroText,
  .discography_albumTrackListing {
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
  .albumText,
  .albumDetailsText,
  .discography_albumCredits {
    font-size: 0.9rem;
    line-height: 1.35rem;
  }
}

/* Small devices (landscape phones, 576 - 768px) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #titleSubText {
    font-size: 1.25rem; /* 20px at 16px default size */
    line-height: 1.78125rem; /* 28.5px at 16px default size */
  }
  .main-col {
    width: 80%;
  }
  .albumIntroText {
    font-size: 1.0625rem; /* 17px at 16px default size */
    line-height: 21px;
    text-align: justify;
  }
  #scrollDownContainer {
    margin-top: 40px;
  }
  #albumReleasesHeading {
    font-size: 2.25rem;
    line-height: 2.25rem;
  }
}

/* Medium devices (tablets, 768 - 992px) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  #titleSubText {
    font-size: 22px;
    line-height: 31px;
  }
  .main-col {
    width: 80%;
  }
  #scrollDownContainer {
    margin-top: 40px;
  }
  #albumReleasesHeading {
    font-size: 2.5625rem;
    line-height: 2.5625rem;
  }
}

/* Large devices (desktops, 992 - 1200px) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .main-col {
    width: 80%;
  }
}

/* X-large devices (large desktops, 1200 - 1500px) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .main-col {
    width: 80%;
  }
}
</style>

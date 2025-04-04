<template>
  <div
    v-on:[eventName]="closeLargeImg()"
    class="pb-12"
  >
    <header id="header">
      <NuxtLink
        to="/archives/menu"
        class="backToArchives"
      >
        <Tooltip
          text="Back to Archives menu"
          location="bottom"
        >
          <div>
            <img
              immediate
              alt="Back to Archives"
              src="../../assets/images/back-to-archives-single-line.png"
              class="backToArchivesImg pt-0 pt-md-2"
            />
            <img
              immediate
              alt="Back to Archives"
              src="../../assets/images/back-to-archives-single-line-yellow.png"
              class="backToArchivesImg-hover pt-0 pt-md-2"
            />
          </div>
        </Tooltip>
      </NuxtLink>

      <!-- STATIC HEADER IMAGES -->
      <div
        v-if="!isPortrait && pageContent.headerImages"
        class="headerWrapper"
      >
        <div
          v-for="(headerImg, iImg) in pageContent.headerImages"
          :key="iImg"
          class="headerBox"
        >
          <div
            v-if="headerImg.applyFilter == true"
            class="headerFilter"
          />

          <img :src="headerImg.img" />

          <div
            v-if="iImg == 1"
            class="headerOverlay headerOverlayBtm pb-6"
            :style="overlayStylesBtm"
          >
            <img
              :src="titleImg"
              :alt="pageContent.title + ' title image'"
              class="titleImg mt-6 mt-sm-0"
              data-testid="title-img"
            />
            <p class="headerText mt-n1 mt-sm-0">SCROLL</p>
            <p class="headerText">TO VIEW THE GALLERY</p>
          </div>

          <NuxtLink
            v-if="iImg == 4"
            :to="`/archives/${titleSlug}`"
            class="headerOverlay link pt-4"
          >
            <Tooltip
              text="Click to read my recollections"
              location="bottom"
            >
              <p class="headerText mt-n1 mt-sm-0">CLICK</p>
              <p class="headerText">TO READ MY</p>
              <p class="headerText">RECOLLECTIONS</p>
            </Tooltip>
          </NuxtLink>
        </div>
      </div>

      <!-- PORTRAIT SLIDESHOW -->
      <div
        v-else-if="isPortrait && pageContent.headerMobileImages"
        class="headerWrapperPortrait"
      >
        <SlideshowImages
          :slides="pageContent.headerMobileImages"
          :height="carouselHeight"
          :interval="4500"
          borderRadius="15px"
          class="headerBoxPortrait"
        >
          <div
            class="headerOverlay headerOverlayBtm"
            :style="overlayStylesBtm"
          >
            <img
              :src="titleImg"
              :alt="pageContent.title + ' title image'"
              class="titleImg"
              data-testid="title-img"
            />
            <p class="headerText">SCROLL</p>
            <p class="headerText pb-4">TO VIEW THE GALLERY</p>

            <NuxtLink
              :to="`/archives/${titleSlug}`"
              class="link headerText"
            >
              <Tooltip
                text="Click to read my recollections"
                location="bottom"
              >
                <div>
                  <p class="headerText mt-n1 mt-sm-0">CLICK</p>
                  <p class="headerText">TO READ MY</p>
                  <p class="headerText pb-4">RECOLLECTIONS</p>
                </div>
              </Tooltip>
            </NuxtLink>
          </div>
        </SlideshowImages>
      </div>
    </header>

    <div
      id="mainContent"
      class="px-4 pt-12 mt-6"
      :style="mainContentStyles"
    >
      <!-- IMAGE GALLERY SECTIONS -->
      <div
        v-for="(section, iSect) in sections"
        :key="iSect"
        class="pb-12 mb-12"
      >
        <h2 class="sectionHeading pb-4">{{ section.heading }}</h2>

        <div class="galleryWrapper">
          <div
            v-for="(img, iImg) in section.images"
            :key="'img' + iImg"
            class="galleryBox"
            @click.prevent="onGalleryImgClick(`${iSect}_${iImg}`)"
          >
            <img
              :src="img"
              :id="`galleryImage_${iSect}_${iImg}`"
              class="galleryImage"
              :class="{
                centerPos:
                  applyLargeImgStyles && zoomedImgIndex == `${iSect}_${iImg}`,
              }"
              :style="zoomedImgStyles"
            />
          </div>
        </div>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<script>
import slugify from '@sindresorhus/slugify';

const keyMap = {
  ESC: 27,
};

export default {
  data() {
    return {
      pageContent: {},
      zoomedImgIndex: null,
      imgCenterPos: {
        top: 0,
        left: 0,
      },
      applyLargeImgStyles: false,
      eventName: null,
      portraitTablet: {
        maxAspect: 0.85,
      },
      windowWidth: 0.0,
      windowHeight: 0.0,
    };
  },

  computed: {
    title() {
      return this.pageContent.title;
    },
    titleSlug() {
      return slugify(this.title);
    },
    titleImg() {
      return this.pageContent.titleImg.singleLine != ''
        ? this.pageContent.titleImg.singleLine
        : this.pageContent.titleImg.doubleLine;
    },
    aspectRatio() {
      return this.windowWidth / this.windowHeight;
    },
    isPortrait() {
      return (
        this.aspectRatio < this.portraitTablet.maxAspect ||
        this.windowWidth < 992
      );
    },
    overlayStylesBtm() {
      let css = {};
      css['--titleMaxWidth'] = this.pageContent.titleImg.maxWidth + '%';
      css.bottom = '0px';
      return css;
    },
    galleryImgUrls() {
      if (this.pageContent.imageGallery == null) return null;
      let urls = [];
      for (let i = 1; i <= this.pageContent.imageGallery.numImages; i++) {
        let url = this.pageContent.imageGallery.commonPath + i + '.jpg';
        urls.push(url);
      }
      return urls;
    },
    sections() {
      // let sections = this.pageContent.imageGallerySections;
      let sections = [];
      if (this.pageContent?.imageGallerySections) {
        sections = [...this.pageContent?.imageGallerySections];
      }
      sections.forEach((s) => {
        s.images = this.galleryImgUrls.slice(
          s.imageStartNo - 1,
          s.imageStartNo + s.numImages - 1
        );
      });
      return sections;
    },
    zoomedImgStyles() {
      let absCenterTop = this.windowHeight / 2 - this.imgCenterPos.top + 175;
      let absCenterLeft = this.windowWidth / 2 - this.imgCenterPos.left + 175;
      return {
        '--absCenterTop': absCenterTop.toFixed(2) + 'px',
        '--absCenterLeft': absCenterLeft.toFixed(2) + 'px',
      };
    },
    numItems() {
      return this.galleryImgUrls ? this.galleryImgUrls.length : 0;
    },
    mainContentStyles() {
      let css = {};
      if (this.numItems <= 8) {
        css['--maxPerRow'] = 1;
        css['--boxSize'] = '480px';
        css['--gridGap'] = '30px';
      } else {
        css['--maxPerRow'] = 5;
        css['--boxSize'] = '350px';
        css['--gridGap'] = '30px';
      }
      return css;
    },
    headerHorizPadding() {
      if (!this.windowWidth) return 50;

      return this.windowWidth < 576
        ? 16
        : this.windowWidth < 768
        ? 30
        : this.windowWidth < 1200
        ? 35
        : 50;
    },
    carouselHeight() {
      const imgAspectRatio = 0.8354;

      return Math.min(
        644,
        (this.windowWidth - 2 * this.headerHorizPadding) / imgAspectRatio
      );
    },
  },

  async mounted() {
    this.updateWindowDims();

    const slug =
      this.$route.path.slice(-1) === '/'
        ? this.$route.path.split('/').at(-2)
        : this.$route.path.split('/').at(-1);
    console.log({ slug });
    const pageContent = await queryContent(
      'archives/narrative-gallery',
      slug
    ).findOne();
    console.log({ pageContent });
    this.pageContent = pageContent;

    this.bindEvents();
  },

  beforeUnmount() {
    this.unbindEvents();
  },

  methods: {
    bindEvents() {
      window.addEventListener('resize', this.updateWindowDims, false);
      window.addEventListener(
        'orientationchange',
        this.updateWindowDims,
        false
      );
      document.addEventListener('keydown', this.keyDownHandler, false);
      document.addEventListener('scroll', this.scrollHandler, false);
    },
    unbindEvents() {
      window.removeEventListener('resize', this.updateWindowDims, false);
      window.removeEventListener(
        'orientationchange',
        this.updateWindowDims,
        false
      );
      document.removeEventListener('keydown', this.keyDownHandler, false);
      document.removeEventListener('scroll', this.scrollHandler, false);
    },
    onGalleryImgClick(img_Id) {
      if (this.zoomedImgIndex == img_Id || this.windowWidth < 768) {
        return;
      }

      const imgEl = document.getElementById('galleryImage_' + img_Id);
      const elemRect = imgEl.getBoundingClientRect();
      this.imgCenterPos.top = elemRect.top + elemRect.height / 2;
      this.imgCenterPos.left = elemRect.left + elemRect.width / 2;

      this.$nextTick(() => {
        this.zoomedImgIndex = img_Id;
        this.applyLargeImgStyles = true;
      });

      this.eventName = 'click';
    },
    closeLargeImg() {
      if (this.applyLargeImgStyles) {
        this.applyLargeImgStyles = false;

        this.$nextTick(() => {
          this.eventName = null;
          this.zoomedImgIndex = null;
        });
      }
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.ESC:
          this.closeLargeImg();
          break;
        default:
          break;
      }
    },
    scrollHandler() {
      if (this.zoomedImgIndex !== null) {
        this.closeLargeImg();
      }
    },
    updateWindowDims() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap');

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

.layout {
  background-color: #222222;
  padding: 0 12px;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
  min-height: 100vh;
  width: 100%;
}

.backToArchives {
  position: fixed;
  top: 50px;
  right: 60px;
  z-index: 100;
}
.backToArchivesImg,
.backToArchivesImg-hover {
  width: 50vw;
  max-width: 260px;
  height: auto;
}
.backToArchivesImg {
  display: inline-block;
}
.backToArchivesImg-hover {
  display: none;
}
@media (hover) {
  .backToArchives:hover .backToArchivesImg-hover {
    display: inline-block;
  }
  .backToArchives:hover .backToArchivesImg {
    display: none;
  }
}

#header {
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 130px 50px 0px 50px !important;
}
#header:after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--headerBgImg) no-repeat center;
  background-size: cover;
  opacity: var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
}

.headerWrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  justify-content: center;

  height: 100%;
  max-width: 2030px;
  margin: 0 auto;
}
.headerWrapperPortrait {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  align-content: center;
}
.headerBox {
  width: 100%;
  max-width: 821px;
  position: relative;
  place-self: center;
}
.headerBoxPortrait {
  width: 100%;
  position: relative;
  place-self: center;
  height: 100%;
}
.headerBox > img {
  border-radius: 15px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.headerFilter {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 40;
  background-color: #3e2e20;
  opacity: 0.29;
}
.headerOverlay {
  position: absolute;
  top: var(--titleTopOffset);
  right: 0;
  left: 0;
  max-width: 100%;
  height: calc(100% - var(--titleTopOffset));
  padding-bottom: 16px;
  z-index: 50;
}
.headerOverlay * {
  padding-right: 32px;
  padding-left: 32px;
}
.headerOverlayBtm {
  bottom: 0;
}

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}

.headerText {
  color: #fff;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;

  --font-size: 1.25rem;
  font-size: var(--font-size);
  line-height: calc(1.35 * var(--font-size));
  letter-spacing: calc(0.29 * var(--font-size));

  text-align: center;
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
  cursor: context-menu;
}
.link .headerText {
  cursor: pointer;
}
.headerOverlay.link:hover .headerText {
  color: #eecf49;
}

#mainContent {
  max-width: calc(
    var(--maxPerRow) * var(--boxSize) + (var(--maxPerRow - 1) * var(--gridGap)) +
      2 * 16px
  );
  width: 70%;
  margin: 0 auto;
}

.galleryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--boxSize), 1fr));
  grid-auto-flow: row;
  grid-gap: var(--gridGap);
  align-items: center;
  justify-content: left;
}
.galleryBox {
  background-color: black;
  width: 100%;
  max-width: var(--boxSize);
  height: var(--boxSize);
  position: relative;
  place-self: left;
  cursor: pointer;
}

.sectionHeading {
  color: white;
  font-family: 'Lora', serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 36px;
  letter-spacing: 3px;
  line-height: 42px;
  text-align: left;
  text-transform: uppercase;
}

.galleryImage {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  object-fit: contain;
  margin: auto;
  top: 175px;
  left: 175px;
  width: 350px;
  height: 350px;
  z-index: 10;
  cursor: zoom-in;
  transition: all 0.3s linear;
}
.centerPos {
  top: var(--absCenterTop);
  left: var(--absCenterLeft);
  width: 90vw;
  height: 90vh;
  z-index: 100;
  cursor: zoom-out;
  transition: all 0.3s linear;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  #mainContent {
    width: 100%;
  }
  .galleryWrapper {
    grid-gap: 16px;
    justify-content: center;
  }
  #header {
    padding: 110px 16px 0px 16px !important;
  }

  .backToArchives {
    // top: 48px;
    top: 30px;
    right: 20px;
  }
  .headerWrapper {
    grid-gap: 15px;
  }
  .headerOverlay {
    padding-bottom: 0px;
  }
  .titleImg {
    max-width: 100%;
    padding: 0 32px 8px 32px;
  }
  .headerText {
    --font-size: 1.1rem;
  }
  .thumbnailCaption {
    --fontSize: 4.5vw;
  }
  .sectionHeading {
    font-size: 24px;
    letter-spacing: 3px;
    line-height: 28px;
  }
}
@media only screen and (max-width: 375px) {
  .headerText {
    --font-size: 1rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .backToArchives {
    top: 27px;
    right: 27px;
  }
  #header {
    padding: 130px 30px 0px 30px !important;
  }
  .galleryWrapper {
    grid-gap: 16px;
    justify-content: center;
  }
  .sectionHeading {
    font-size: 28px;
    letter-spacing: 3px;
    line-height: 37px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .galleryWrapper {
    grid-gap: 24px;
    justify-content: center;
  }
  .galleryBox {
    place-self: center;
  }
  .backToArchives {
    top: 33px;
    right: 33px;
  }
  #header {
    padding: 130px 35px 0px 35px !important;
  }
  .sectionHeading {
    font-size: 32px;
    letter-spacing: 3px;
    line-height: 32.67px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .galleryWrapper {
    justify-content: center;
    grid-gap: 24px;
  }
  .galleryBox {
    place-self: center;
  }
  .backToArchives {
    top: 37px;
    right: 37px;
  }
  #header {
    padding: 130px 35px 0px 35px !important;
  }
  .sectionHeading {
    font-size: 34px;
    letter-spacing: 3px;
    line-height: 40px;
  }
}

/* Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .backToArchivesImg,
  .backToArchivesImg-hover {
    max-width: 300px;
  }
}

/* Special */
@media only screen and (max-width: 360px) {
  .galleryWrapper {
    grid-template-rows: repeat(1fr);
    grid-gap: 16px;
  }
  .galleryBox {
    max-height: calc(350px - 32px);
  }
  .galleryImage {
    height: calc(350px - 32px);
    top: calc(175px - 16px);
  }
}
</style>

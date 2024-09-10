<template>
  <ClientOnly>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <full-page ref="fullpage" :options="options" id="fullpage">
      <div
        v-for="(s, iSec) in sections"
        :key="s.id"
        :data-section-index="iSec"
        :style="{ 'background-image': 'url(' + s.img_url + ')' }"
        class="section flatImgContainer"
        :class="{ containImg: containBgImg(s) }"
      >
        <!-- HEADER -->
        <header v-if="s.header" id="header">
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
              <div v-if="headerImg.applyFilter == true" class="headerFilter" />

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
                <p class="headerText">TO READ MY</p>
                <p class="headerText">RECOLLECTIONS</p>
              </div>

              <NuxtLink
                v-if="showGalleryLink && iImg == 4"
                :to="`/archives/${titleSlug}-gallery`"
                class="headerOverlay link pt-4"
              >
                <Tooltip text="Click to see the gallery" location="bottom">
                  <div class="px-3">
                    <p class="headerText mt-n1 mt-sm-0">CLICK</p>
                    <p class="headerText">TO VIEW THE GALLERY</p>
                  </div>
                </Tooltip>
              </NuxtLink>
            </div>
          </div>

          <!-- PORTRAIT SLIDESHOW -->
          <div
            v-else-if="isPortrait && pageContent.headerMobileImages"
            class="headerWrapperPortrait"
            :style="headerWrapperPortraitStyles"
          >
            <SlideshowImages
              :slides="pageContent.headerMobileImages"
              :interval="4500"
              :height="carouselHeight"
              borderRadius="15px"
              class="headerBoxPortrait"
            >
              <div class="headerOverlay" :style="overlayStylesPortrait">
                <img
                  :src="titleImg"
                  :alt="pageContent.title + ' title image'"
                  class="titleImg"
                  data-testid="title-img"
                />
                <p class="headerText">SCROLL</p>
                <p class="headerText">TO READ MY</p>
                <p class="headerText">RECOLLECTIONS</p>

                <NuxtLink
                  v-if="showGalleryLink"
                  :to="`/archives/${titleSlug}-gallery`"
                  class="headerOverlay link pt-4"
                >
                  <Tooltip text="Click to see the gallery" location="bottom">
                    <div>
                      <p class="headerText mt-n1 mt-sm-0">CLICK</p>
                      <p class="headerText">TO VIEW THE GALLERY</p>
                    </div>
                  </Tooltip>
                </NuxtLink>
              </div>
            </SlideshowImages>
          </div>

          <!-- BACK TO ARCHIVES LINK (AT TOP) -->
          <NuxtLink to="/archives/menu" class="backToArchives">
            <Tooltip text="Back to Archives menu" location="bottom">
              <div>
                <img
                  immediate
                  alt="Back to Archives"
                  src="../../assets/images/back-to-archives-single-line.png"
                  class="backToArchivesImg pt-4 pt-md-2"
                />
                <img
                  immediate
                  alt="Back to Archives"
                  src="../../assets/images/back-to-archives-single-line-yellow.png"
                  class="backToArchivesImg-hover pt-4 pt-md-2"
                />
              </div>
            </Tooltip>
          </NuxtLink>
        </header>

        <!-- BACK TO ARCHIVES LINK (AT END) -->
        <template v-else-if="s.backLink">
          <template v-if="titleSlug == 'my-dad-earl'">
            <NuxtLink to="/archives/menu" class="backToArchivesEndEarl">
              <Tooltip text="Back to Archives menu" location="bottom">
                <div>
                  <img
                    immediate
                    alt="Back to Archives"
                    src="../../assets/images/back-to-archives-with-arrow-on-left.png"
                    class="backToArchivesEndImg"
                  />
                  <img
                    immediate
                    alt="Back to Archives"
                    src="../../assets/images/back-to-archives-with-arrow-on-left-yellow.png"
                    class="backToArchivesEndImg-hover"
                  />
                </div>
              </Tooltip>
            </NuxtLink>

            <NuxtLink
              :to="`/archives/${titleSlug}-gallery`"
              class="toEarlGalleryEnd"
            >
              <Tooltip text="View the Gallery" location="top">
                <div>
                  <img
                    alt="View the Gallery"
                    src="../../assets/images/earl-gallery-menu.png"
                    class="backToArchivesEndImg pt-4 pt-md-2"
                  />
                  <img
                    alt="View the Gallery"
                    src="../../assets/images/earl-gallery-menu-yellow.png"
                    class="backToArchivesEndImg-hover pt-4 pt-md-2"
                  />
                </div>
              </Tooltip>
            </NuxtLink>
          </template>

          <template v-else>
            <NuxtLink
              to="/archives/menu"
              class="backToArchivesEnd"
              :class="{
                backToArchivesEndFamilyTrip:
                  titleSlug == 'family-trip-to-europe-57',
                portraitMode: windowAspectRatio < portraitTablet.maxAspect
              }"
            >
              <Tooltip text="Back to Archives menu" location="bottom">
                <div>
                  <img
                    immediate
                    alt="Back to Archives"
                    src="../../assets/images/back-to-archives-with-arrow-on-left.png"
                    class="backToArchivesEndImg"
                    :class="{
                      backToArchivesEndImgFamilyTrip:
                        titleSlug == 'family-trip-to-europe-57'
                    }"
                  />
                  <img
                    immediate
                    alt="Back to Archives"
                    src="../../assets/images/back-to-archives-with-arrow-on-left-yellow.png"
                    class="backToArchivesEndImg-hover"
                    :class="{
                      'backToArchivesEndImgFamilyTrip-hover':
                        titleSlug == 'family-trip-to-europe-57'
                    }"
                  />
                </div>
              </Tooltip>
            </NuxtLink>
          </template>
        </template>

        <div
          v-for="(txtObj, iText) in s.txtArr"
          :key="iText"
          class="slideTextContainer"
          :style="slideTextContainerStyles(txtObj)"
        >
          <div class="slideTextDiv" :style="slideTextDivStyles(txtObj)">
            <Simplebar
              v-if="
                (txtObj.hasOwnProperty('showScrollbar') &&
                  txtObj.showScrollbar == false) ||
                  windowWidth < 992
              "
              class="simple-scrollbar"
              data-simplebar-auto-hide="false"
            >
              <transition appear name="textAnimation">
                <span
                  v-show="currentSlideIndex === iSec"
                  v-html="renderMarkdown(txtObj.text)"
                  class="slideText"
                  :style="slideTextStyles(txtObj)"
                />
              </transition>
            </Simplebar>

            <transition v-else appear name="textAnimation">
              <span
                v-show="currentSlideIndex === iSec"
                v-html="renderMarkdown(txtObj.text)"
                class="slideText"
                :style="slideTextStyles(txtObj)"
              />
            </transition>
          </div>
        </div>

        <!-- GALLERY ITEMS -->
        <template v-if="s.galleryItems">
          <div
            v-for="(item, iItem) in s.galleryItems"
            :key="'item' + iItem"
            class="galleryBox"
            @click.prevent="onGalleryMediaClick(item)"
            :style="
              `left: ${item.posX};
              top: ${adjustPosY(item.posY)};`
            "
            style="background-color: black"
          >
            <div
              class="mediaBox"
              :style="
                'background: transparent url(' +
                  item.thumbnailImg +
                  ') no-repeat left top'
              "
            />
            <div class="boxOverlay mb-12">
              <span class="thumbnailCaption absCenter hideOnHover">{{
                item.caption
              }}</span>

              <img
                v-if="item.type == 'audio'"
                alt="Play symbol"
                src="../../assets/images/music_symbol_circle.png"
                class="absCenter showOnHover"
              />
              <img
                v-else
                alt="Eye icon"
                src="../../assets/images/eye.png"
                class="absCenter showOnHover"
              />
            </div>
          </div>
        </template>
      </div>
    </full-page>

    <BookViewer
      v-if="isBookFullscreen"
      :pages="bookImagesUrlsStdRes"
      :isFullscreen="isBookFullscreen"
      :showSinglePage="bookShowSinglePage"
      :key="'bookViewer' + bookKey"
      @toggleFullscreen="toggleFullscreen()"
      @reload="reloadBook()"
    />
  </ClientOnly>
</template>

<script>
import snarkdown from "snarkdown";
import slugify from "@sindresorhus/slugify";
import Simplebar from "simplebar-vue";

export default {
  components: {
    Simplebar
  },

  data() {
    return {
      pageContent: {},
      currentSlideIndex: 0,
      windowWidth: 0.0,
      windowHeight: 1.0,
      bookItem: null,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,
      options: {
        licenseKey: "DLX2I-2Q50I-YFKS8-82J18-MOFSO",
        scrollingSpeed: 850,
        easing: "easeInOut",
        overlay: false,
        navigation: false,
        lockAnchors: true, // anchors turned off so as to not interfere with BookViewer anchor links
        afterLoad: this.afterLoad,
        credits: {
          enabled: false
        }
      },
      portraitMobile: {
        maxAspect: 0.85,
        area: 375 * 667, // iPhone 6
        fontSize: 20.3, // in px
        maxFontSize: 24, // in px
        padding: 28.2 // in px
      },
      portraitTablet: {
        maxAspect: 0.85,
        area: 768 * 1024, // iPad
        fontSize: 24, // in px
        maxFontSize: 30, // in px
        padding: 28.2 // in px
      },
      square: {
        maxAspect: 1.2,
        area: 1080 * 1080,
        fontSize: 26, // in px
        padding: 50 // in px
      },
      fiveBySeven: {
        maxAspect: 1.6,
        area: 2016 * 1380,
        fontSize: 32, // in px
        padding: 50 // in px
      },
      landscape: {
        area: 2560 * 1380,
        fontSize: 36, // in px
        padding: 100 // in px
      }
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
      return this.pageContent.titleImg.singleLine
        ? this.pageContent.titleImg.singleLine
        : this.pageContent.titleImg.doubleLine;
    },
    windowAspectRatio() {
      return this.windowWidth / this.windowHeight;
    },
    windowArea() {
      return this.windowWidth * this.windowHeight;
    },
    windowScale() {
      return Math.sqrt(this.windowArea) / Math.sqrt(this.currentLayout.area);
    },
    currentLayout() {
      let layout = {};
      if (this.windowAspectRatio < this.portraitTablet.maxAspect) {
        if (this.windowWidth < 541 && this.pageContent.mobileLayout) {
          layout = { ...this.portraitMobile, ...this.pageContent.mobileLayout };
        } else {
          layout = {
            ...this.portraitTablet,
            ...this.pageContent.portraitLayout
          };
        }
      } else if (this.windowAspectRatio < this.square.maxAspect) {
        layout = { ...this.square, ...this.pageContent.squareLayout };
      } else if (this.windowAspectRatio < this.fiveBySeven.maxAspect) {
        layout = { ...this.fiveBySeven, ...this.pageContent.fiveBySevenLayout };
      } else {
        layout = { ...this.landscape, ...this.pageContent.landscapeLayout };
      }
      return layout;
    },
    isPortrait() {
      return (
        this.windowAspectRatio < this.portraitTablet.maxAspect ||
        this.windowWidth < 992
      );
    },
    overlayStylesPortrait() {
      let css = {};
      let topOffset = this.pageContent.titleImg.topOffset;
      if (this.windowWidth < 350) topOffset = Math.min(55, topOffset);
      else if (this.windowWidth < 768) topOffset = Math.min(60, topOffset);
      else if (this.windowWidth < 992) topOffset = Math.min(55, topOffset);
      else topOffset = Math.min(45, topOffset);
      css["--titleTopOffset"] = topOffset + "%";
      css["--titleMaxWidth"] = this.pageContent.titleImg.maxWidth + "%";
      return css;
    },
    overlayStylesBtm() {
      let css = {};
      css["--titleMaxWidth"] = this.pageContent.titleImg.maxWidth + "%";
      css.bottom = "0px";
      return css;
    },
    sections() {
      let sections = [];
      let s = 1; // section no.

      // add section for header
      sections.push({ id: "section" + s++, header: true });

      // get sections (background images) from CMS
      if (this.currentLayout.hasOwnProperty("noSections")) {
        for (let i = 1; i <= this.currentLayout.noSections; i++) {
          let section = {
            id: "section" + s++,
            img_url: this.currentLayout.commonPath + i + ".jpg",
            txtArr: [],
            galleryItems: []
          };
          // add "back to archives" link to last section
          if (i == this.currentLayout.noSections) {
            section.backLink = true;
          }
          sections.push(section);
        }
      }

      // add text from CMS to sections
      if (this.currentLayout.hasOwnProperty("textList")) {
        for (let t = 0; t < this.currentLayout.textList.length; t++) {
          const txtObj = this.currentLayout.textList[t];
          if (
            !txtObj.hasOwnProperty("sectionNo") ||
            txtObj.sectionNo > sections.length - 1
          )
            continue;
          const sectionIndex = txtObj.sectionNo;
          sections[sectionIndex].txtArr.push(txtObj);
        }
      }

      // add gallery items from CMS to sections
      if (this.currentLayout.hasOwnProperty("galleryItems")) {
        for (let i = 0; i < this.currentLayout.galleryItems.length; i++) {
          const galObj = this.currentLayout.galleryItems[i];
          if (
            !galObj.hasOwnProperty("sectionNo") ||
            galObj.sectionNo > sections.length
          )
            continue;
          const sectionIndex = galObj.sectionNo;
          sections[sectionIndex].galleryItems.push(galObj);
        }
      }

      return sections;
    },
    bookImagesUrlsStdRes() {
      const book = this.bookItem;
      if (book == null) return [];
      let pages = [];
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = book.commonPathStdRes + i + ".jpg";
        pages.push(url);
      }
      return pages;
    },
    showGalleryLink() {
      return this.titleSlug === "my-dad-earl";
    },
    headerHorizPadding() {
      if (!this.windowWidth) return 50;

      return this.windowWidth < 576
        ? 4
        : this.windowWidth < 767.98
        ? 30
        : this.windowWidth <= 768.02
        ? 40
        : this.windowWidth < 1200
        ? 50
        : 60;
    },
    headerWrapperPortraitStyles() {
      let css = {};
      css["--headerPadding"] = `${this.headerHorizPadding}px`;
      return css;
    },
    carouselHeight() {
      const imgAspectRatio = 0.8354;

      return (this.windowWidth - 2 * this.headerHorizPadding) / imgAspectRatio;
    }
  },

  async mounted() {
    this.updateWindowDims();

    const slug =
      this.$route.path.slice(-1) === "/"
        ? this.$route.path.split("/").at(-2)
        : this.$route.path.split("/").at(-1);
    const pageContent = await queryContent(
      "archives/narrative",
      slug
    ).findOne();
    this.pageContent = pageContent;

    this.bindEvents();
  },

  beforeUnmount() {
    this.unbindEvents();
  },

  methods: {
    bindEvents() {
      window.addEventListener("resize", this.updateWindowDims, false);
      window.addEventListener(
        "orientationchange",
        this.updateWindowDims,
        false
      );
    },
    unbindEvents() {
      window.removeEventListener("resize", this.updateWindowDims, false);
      window.removeEventListener(
        "orientationchange",
        this.updateWindowDims,
        false
      );
    },
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    containBgImg(section) {
      if (
        section.hasOwnProperty("txtArr") &&
        section.txtArr.length > 0 &&
        section.txtArr[0].hasOwnProperty("bgImgContain")
      ) {
        return section.txtArr[0].bgImgContain;
      } else return false;
    },
    renderMarkdown(mdText) {
      // ref: https://github.com/developit/snarkdown/issues/11#issuecomment-813364966
      return mdText
        ? mdText
            .split(/(?:\r?\n){2,}/)
            .map(line =>
              [" ", "\t", "#", "-", "*", ">"].some(char =>
                line.startsWith(char)
              )
                ? snarkdown(line)
                : `<p>${snarkdown(line)}</p>`
            )
            .join("\n")
        : "";
    },
    slideTextContainerStyles(txtObj) {
      let css = {};
      if (txtObj.hasOwnProperty("pos") && txtObj.pos) {
        // default values (left)
        css.left = "0%";
        css.top = "0px";
        css.width = "35%";
        css.height = "100vh";

        // presets
        if (txtObj.pos == "right") {
          css.left = "65.0%";
        } else if (txtObj.pos == "center") {
          css.left = "32.5%";
          css.top = "13vh";
          css.height = "87vh";
        } else if (txtObj.pos == "bottom") {
          css.left = "0%";
          css.top = "67vh";
          css.width = "100%";
          css.height = "33vh";
          css.display = "flex";
        } else if (txtObj.pos == "top") {
          css.width = "100%";
          css.height = "33vh";
        }

        // overwrites
        if (txtObj.posX) css.left = txtObj.posX;
        if (txtObj.posY) css.top = this.adjustPosY(txtObj.posY);
        if (txtObj.width) css.width = txtObj.width;
        if (txtObj.height) css.height = txtObj.height;
      } else {
        css.left = txtObj.posX ? txtObj.posX : "0.5%";
        css.top = txtObj.posY ? this.adjustPosY(txtObj.posY) : "39vh";
        css.width = txtObj.width ? txtObj.width : "38%";
        css.height = "100%";
      }
      if (txtObj.hasOwnProperty("applyFilter") && txtObj.applyFilter == true) {
        css.backgroundColor = "rgb(0,0,0,0.47)";
      }
      return css;
    },
    slideTextDivStyles(txtObj) {
      let css = {};
      css.width = "100%";

      if (txtObj.hasOwnProperty("pos") && txtObj.pos) {
        if (txtObj.pos == "bottom") {
          css.height = "calc(100% - 8px)";
        }
      }
      return css;
    },
    slideTextStyles(txtObj) {
      const layout = this.currentLayout;
      const scale = this.windowScale;
      let css = {};
      if (txtObj.hasOwnProperty("pos") && txtObj.pos) {
        css.display = "flex";
        css.flexDirection = "column";

        if (txtObj.pos == "bottom") {
          css.height = "100%";
        } else {
          css.height = "100vh";
        }

        css.alignItems = txtObj.alignItems ? txtObj.alignItems : "start";

        // padding
        if (txtObj.padding) {
          var paddingPx =
            scale * parseFloat(txtObj.padding.replace(/[^0-9.]/g, ""));
        } else {
          paddingPx = scale * layout.padding;
        }
        if (txtObj.pos !== "bottom") {
          css.padding = `${paddingPx}px`;
        } else if (txtObj.hasOwnProperty("applyFilter") && txtObj.applyFilter) {
          css.padding = `${paddingPx}px ${paddingPx}px`;
        } else {
          css.padding = `0px ${paddingPx}px`;
        }
      }

      // font-size
      if (txtObj.fontSize) {
        var fontSizePx =
          scale * parseFloat(txtObj.fontSize.replace(/[^0-9.]/g, ""));
      } else {
        fontSizePx = layout.maxFontSize
          ? Math.min(scale * layout.fontSize, layout.maxFontSize)
          : scale * layout.fontSize;
      }
      css.fontSize = fontSizePx + "px";

      // line-height
      if (txtObj.lineHeight) {
        var lineHeightPx =
          scale * parseFloat(txtObj.lineHeight.replace(/[^0-9.]/g, ""));
      } else {
        lineHeightPx = 1.444 * fontSizePx;
      }
      css.lineHeight = lineHeightPx + "px";

      // text-align
      css.textAlign = txtObj.textAlign ? txtObj.textAlign : "justify";

      return css;
    },
    onGalleryMediaClick(item) {
      this.bookItem = item;
      this.toggleFullscreen();
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen;
      this.reloadBook();
    },
    reloadBook() {
      this.bookKey += 1; // increment component key to force reload between toggle of fullscreen / normal-screen
    },
    updateWindowDims() {
      const iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // ref: https://stackoverflow.com/a/39345914
      this.windowWidth = iOS ? screen.width : window.innerWidth;
      this.windowHeight = iOS ? screen.height : window.innerHeight;
    },
    afterLoad(_origin, destination) {
      this.currentSlideIndex = destination.index;
    },
    adjustPosY(posY) {
      let posYNum = Number(posY.split("vh")[0]) + 50; // adding on 50vh to convert from old reference (centre of viewport) to new one (at top)
      return posYNum + "vh";
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap");
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700&display=swap");

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url("../../assets/fonts/nhaasgrotesktxpro-65md.eot");
  /* IE9 Compat Modes */
  src: url("../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../assets/fonts/nhaasgrotesktxpro-65md.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg")
      format("svg");
  /* Legacy iOS */
  font-weight: normal;
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
  // display: inline-block;
  display: block;
}

.backToArchivesImg-hover {
  display: none;
}

.backToArchivesEnd {
  position: absolute;
  left: 50%;
  top: 72vh;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2000;
}

.backToArchivesEndFamilyTrip {
  left: 83%;
  top: 83vh;
}

.backToArchivesEndFamilyTrip.portraitMode {
  left: 50%;
  top: 50vh;
}

.backToArchivesEndEarl {
  position: absolute;
  left: 40%;
  top: 57vh;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2000;
}

.toEarlGalleryEnd {
  position: absolute;
  left: 60%;
  top: 40vh;
  transform: translate3d(-50%, -50%, 0);
}

.backToArchivesEndImg,
.backToArchivesEndImg-hover {
  width: 30vw;
  min-width: 200px;
  max-width: 350px;
  height: auto;
  padding: 16px;
}

.backToArchivesEndImgFamilyTrip,
.backToArchivesEndImgFamilyTrip-hover {
  width: 23vw;
  min-width: 200px;
  max-width: 230px;
}

.backToArchivesEndFamilyTrip.portraitMode .backToArchivesEndImgFamilyTrip,
.backToArchivesEndFamilyTrip.portraitMode
  .backToArchivesEndImgFamilyTrip-hover {
  width: 60vw;
  min-width: 200px;
  max-width: 250px;
}

.backToArchivesEndImg {
  display: inline-block;
}

.backToArchivesEndImg-hover {
  display: none;
}

@media (hover) {
  .backToArchives:hover .backToArchivesImg-hover,
  .backToArchivesEnd:hover .backToArchivesEndImg-hover,
  .backToArchivesEndEarl:hover .backToArchivesEndImg-hover,
  .toEarlGalleryEnd:hover .backToArchivesEndImg-hover {
    display: inline-block;
  }

  .backToArchives:hover .backToArchivesImg,
  .backToArchivesEnd:hover .backToArchivesEndImg,
  .backToArchivesEndEarl:hover .backToArchivesEndImg,
  .toEarlGalleryEnd:hover .backToArchivesEndImg {
    display: none;
  }
}

#header {
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  padding: 130px 60px 30px 60px !important;
  overflow-y: hidden;
}

#header:after {
  content: "";
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
  --headerPadding: 50px;
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: calc(100vw - 2 * var(--headerPadding));
  align-content: center;
}

.headerBox {
  width: 100%;
  position: relative;
  place-self: center;
  height: 100%;
  max-width: 660px;
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

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}

.headerText {
  color: #fff;
  font-family: "Lora", serif;
  font-feature-settings: "liga";
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

.galleryBox {
  position: absolute;
  height: 23vw;
  width: 23vw;
}

.mediaBox {
  opacity: 0.46;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
}

.galleryBox .mediaBox::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  box-shadow: inset 0px 0px 150px rgba(0, 0, 0, 0.5),
    inset 0px 0px 150px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition: box-shadow 0.2s ease;
}

.galleryBox:hover .mediaBox {
  opacity: 1;
}

.galleryBox:hover .mediaBox::before {
  box-shadow: none;
}

.galleryBox:hover .boxOverlay {
  cursor: pointer;
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

.thumbnailCaption {
  color: white;
  font-family: "Open Sans Condensed", sans-serif;
  font-feature-settings: "liga";
  font-weight: 300;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.32);
  text-transform: uppercase;
  transition: inherit;
  width: 100%;
  padding: 0 20px 0 26px;
  --fontSize: 2.162382vw;
  font-size: var(--fontSize);
  line-height: var(--fontSize);
  letter-spacing: calc(0.17 * var(--fontSize));
}

.absCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.boxOverlay {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.hideOnHover {
  opacity: 1;
  transition: all 0.5s ease 0s;
}

.galleryBox:hover .hideOnHover {
  opacity: 0;
}

.showOnHover {
  opacity: 0;
  transition: all 0.5s ease 0s;
}

.galleryBox:hover .showOnHover {
  opacity: 1;
}

.flatImgContainer {
  display: flex;
  justify-content: center;
}

.flatImg {
  height: 100vh;
}

.containImg {
  background-size: contain;
}

// For the fullpage component
.fp-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  padding: 0;
  margin: 0;
  background-position: 50%;
  background-repeat: no-repeat;

  h2,
  span {
    text-align: center;
    color: white;
  }
}

.textAnimation-enter-active,
.textAnimation-leave-active {
  transition: opacity 1.5s;
}

.textAnimation-enter-from,
.textAnimation-leave-to {
  opacity: 0;
}

.slideTextContainer {
  display: flex;
  position: absolute;
}

.slideTextDiv {
  position: absolute;
  z-index: 1000;
}

.slideText {
  display: block;
  color: #fff;
  font-family: "Lora", serif;
  font-feature-settings: "liga";
  font-weight: 400;
  margin: 0px;
  padding: 0px;
}

.slideText {
  :deep(p) {
    margin: auto 0;
  }
}

.simple-scrollbar {
  height: inherit;
  width: 100%;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .backToArchives {
    top: 48px;
    right: 20px;
  }

  #header {
    display: flex;
    align-items: center;
    height: 100vh;
    transform: translate3d(0, 0, 0);
    padding: 90px 4px 4px 4px !important;
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

  .galleryBox {
    height: 40vw;
    width: 40vw;
  }

  .thumbnailCaption {
    --fontSize: 4.5vw;
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
    padding: 130px 30px 30px 30px !important;
  }

  .galleryBox {
    height: 35vw;
    width: 35vw;
  }

  .thumbnailCaption {
    --fontSize: 4vw;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .backToArchives {
    top: 33px;
    right: 33px;
  }

  #header {
    padding: 130px 50px 30px 50px !important;
  }

  .thumbnailCaption {
    --fontSize: 3vw;
  }

  .galleryBox {
    height: 30vw;
    width: 30vw;
  }

  .thumbnailCaption {
    --fontSize: 3.5vw;
  }
}

/* iPad only */
@media only screen and (min-width: 767.98px) and (max-width: 768.02px) {
  #header {
    padding: 130px 40px 40px 40px !important;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .backToArchives {
    top: 37px;
    right: 37px;
  }

  #header {
    padding: 130px 50px 30px 50px !important;
  }

  .galleryBox {
    height: 26vw;
    width: 26vw;
  }

  .thumbnailCaption {
    --fontSize: 2.85vw;
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
  .galleryBox {
    max-height: calc(350px - 32px);
  }

  .galleryImage {
    height: calc(350px - 32px);
    top: calc(175px - 16px);
  }
}
</style>

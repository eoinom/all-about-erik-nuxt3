<template>
  <ClientOnly>
    <div v-on:[eventName]="closeLargeImg()" class="pb-5">
      <Head>
        <Title>{{ title }}</Title>
      </Head>

      <header id="header" class="px-3">
        <NuxtLink to="/archives/menu" class="backToArchives">
          <Tooltip text="Back to Archives menu" location="bottom">
            <div>
              <img
                immediate
                alt="Back to Archives"
                src="../../assets/images/back-to-archives-single-line.png"
                class="backToArchivesImg pt-3 pt-md-2"
              />
              <img
                immediate
                alt="Back to Archives"
                src="../../assets/images/back-to-archives-single-line-yellow.png"
                class="backToArchivesImg-hover pt-3 pt-md-2"
              />
            </div>
          </Tooltip>
        </NuxtLink>

        <div class="headerWrapper">
          <!-- SLIDESHOWS -->
          <template v-if="slideshowLeftImgs && slideshowLeftImgs.length > 0">
            <SlideshowImages
              v-show="windowWidth >= 1200"
              :slides="slideshowLeftImgs"
              :height="carouselHeight"
              :interval="4500"
              borderRadius="15px"
              ref="slideshowLeft"
              id="slideshowLeft"
              class="headerBox"
            />

            <SlideshowImages
              :slides="slideshowCenterImgs"
              :interval="4500"
              :height="carouselHeight"
              borderRadius="15px"
              ref="slideshowCenter"
              id="slideshowCenter"
              class="headerBox"
            >
              <div
                v-if="archivePgContent.applyCenterFilter !== false"
                class="headerFilter"
              ></div>

              <div class="headerOverlay" :style="overlayStyles">
                <img
                  :src="titleImg"
                  :alt="archivePgContent.title + ' title image'"
                  class="titleImg"
                  data-testid="title-img"
                />
                <Simplebar
                  v-if="archivePgContent.description"
                  class="simple-scrollbar"
                  data-simplebar-auto-hide="false"
                >
                  <ContentRenderer :value="archivePgContent">
                    <ContentRendererMarkdown
                      :value="archivePgContent"
                      tag="span"
                      class="archive_headerText"
                      :style="headerTextStyles"
                    />
                  </ContentRenderer>
                </Simplebar>
              </div>
            </SlideshowImages>

            <SlideshowImages
              v-show="windowWidth >= 1200"
              :slides="slideshowRightImgs"
              :height="carouselHeight"
              :interval="4500"
              borderRadius="15px"
              ref="slideshowRight"
              id="slideshowRight"
              class="headerBox"
            />
          </template>

          <!-- STATIC HEADER IMAGES -->
          <template v-if="archivePgContent.headerImgLeft">
            <div v-show="windowWidth >= 1200" class="headerBox">
              <img :src="archivePgContent.headerImgLeft" />
            </div>

            <div class="headerBox">
              <div
                v-if="archivePgContent.applyCenterFilter !== false"
                class="headerFilter"
              />
              <img :src="archivePgContent.headerImgCentre" />
              <div class="headerOverlay" :style="overlayStyles">
                <img
                  :src="titleImg"
                  :alt="archivePgContent.title + ' title image'"
                  class="titleImg"
                  data-testid="title-img"
                />
                <Simplebar
                  class="simple-scrollbar"
                  data-simplebar-auto-hide="false"
                >
                  <ContentRenderer
                    :value="archivePgContent"
                    tag="span"
                    class="archive_headerText"
                    :style="headerTextStyles"
                  />
                </Simplebar>
              </div>
            </div>

            <div v-show="windowWidth >= 1200" class="headerBox">
              <img :src="archivePgContent.headerImgRight" />
            </div>
          </template>
        </div>

        <v-container fluid style="padding: 0">
          <v-row no-gutters align="center" id="navLinksRow" class="pt-2">
            <v-col style="text-align: left">
              <Tooltip :text="prev_archive.title" location="top">
                <NuxtLink
                  v-if="isViewportForSmallLinks"
                  :to="'/archives/' + prev_archive.link"
                  class="nav_link nav_link_small"
                  id="nav_prev"
                >
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/prev-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/prev-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>

                <NuxtLink
                  v-else
                  :to="'/archives/' + prev_archive.link"
                  class="nav_link nav_link_big"
                  id="nav_previous"
                >
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>
              </Tooltip>
            </v-col>

            <v-col style="text-align: right">
              <Tooltip :text="next_archive.title" location="top">
                <NuxtLink
                  :to="'/archives/' + next_archive.link"
                  class="nav_link"
                  id="nav_next"
                >
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>
              </Tooltip>
            </v-col>
          </v-row>
        </v-container>
      </header>

      <div id="mainContent" class="px-3 pb-5" :style="mainContentStyles">
        <!-- IMAGE GALLERY -->
        <template v-if="galleryImgUrls != null">
          <div
            v-for="iWrapper in parseInt(
              galleryImgUrls.length / maxImagesGalleryWrapper + 1
            )"
            :key="'galleryWrapper_' + iWrapper"
            class="galleryWrapper"
            :id="'galleryWrapper_' + iWrapper"
          >
            <div
              v-for="(img, iImg) in galleryImgUrls.filter(
                (_d, i) => parseInt(i / maxImagesGalleryWrapper) === iWrapper - 1
              )"
              :key="'img' + iImg"
              class="galleryBox"
              @click.prevent="onGalleryImgClick(iWrapper, iImg)"
            >
              <img
                :src="img"
                :id="`gW_${iWrapper}-galleryImage_${iImg}`"
                class="galleryImage"
                :class="{
                  centerPos: applyLargeImgStyles && zoomedImgIndex == iImg
                }"
                :style="zoomedImgStyles"
              />
            </div>
          </div>
        </template>

        <!-- AUDIOS & ARTICLES GALLERY -->
        <template
          v-if="audiosAndArticles !== null && audiosAndArticles.length > 0"
        >
          <div class="galleryWrapper">
            <div
              v-for="(item, iItem) in audiosAndArticles"
              :key="'item' + iItem"
              class="galleryBox"
              @click.prevent="onGalleryMediaClick(iItem)"
            >
              <div
                class="mediaBox"
                :style="
                  'background: transparent url(' +
                    item.thumbnailImg +
                    ') no-repeat left top'
                "
              />
              <div class="boxOverlay mb-5">
                <transition name="fade">
                  <span class="thumbnailCaption absCenter hideOnHover">{{
                    item.caption
                  }}</span>
                </transition>

                <transition name="fade">
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
                </transition>
              </div>
            </div>
          </div>
        </template>
      </div>

      <AudioLightBox
        v-if="audioTracks != null"
        :audios="audioTracks"
        :index="audioIndex"
        :disable-scroll="true"
        :show-caption="false"
        @close="audioIndex = null"
      />

      <BookViewer
        v-if="isBookFullscreen"
        :pages="bookImagesUrlsStdRes"
        :isFullscreen="isBookFullscreen"
        :showSinglePage="bookShowSinglePage"
        :key="'bookViewer' + bookKey"
        @toggleFullscreen="toggleFullscreen()"
        @reload="reloadBook()"
      />

      <BackToTop />
    </div>
  </ClientOnly>
</template>

<script type="text/javascript">
import slugify from "@sindresorhus/slugify";
import Simplebar from "simplebar-vue";

const keyMap = {
  ESC: 27
};

export default {
  components: {
    Simplebar
  },

  data() {
    return {
      archivePgContent: {},
      archivesPgContent: {},
      audioIndex: null,
      zoomedImgIndex: null,
      imgCenterPos: {
        top: 0,
        left: 0
      },
      applyLargeImgStyles: false,
      eventName: null,
      windowWidth: 0.0,
      windowHeight: 0.0,
      articleIndex: null,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,
      maxImagesGalleryWrapper: 120
    };
  },

  computed: {
    title() {
      return this.archivePgContent.title;
    },
    titleSlug() {
      return slugify(this.title);
    },
    titleImg() {
      return this.archivePgContent.titleImg1Line
        ? this.archivePgContent.titleImg1Line
        : this.archivePgContent.titleImg2Lines;
    },
    headerTextStyles() {
      let css = {};
      css.textAlign =
        this.archivePgContent.description?.length < 80 ? "center" : "justify";
      return css;
    },
    slideshowLeftImgs() {
      if (!this.archivePgContent.headerSlideshowLeft) return null;
      let imgs = [];
      for (
        let i = 1;
        i <= this.archivePgContent.headerSlideshowLeft.numImages;
        i++
      ) {
        let url =
          this.archivePgContent.headerSlideshowLeft.commonPath + i + ".jpg";
        imgs.push({ img: url });
      }
      return imgs;
    },
    slideshowCenterImgs() {
      if (!this.archivePgContent.headerSlideshowCenter) return null;
      let imgs = [];
      for (
        let i = 1;
        i <= this.archivePgContent.headerSlideshowCenter.numImages;
        i++
      ) {
        let url =
          this.archivePgContent.headerSlideshowCenter.commonPath + i + ".jpg";
        imgs.push({ img: url });
      }
      return imgs;
    },
    overlayStyles() {
      let css = {};
      if (this.windowWidth < 576)
        var topOffset = Math.min(50, this.archivePgContent.titleImgTopOffset);
      else if (this.windowWidth < 768)
        topOffset = Math.min(60, this.archivePgContent.titleImgTopOffset);
      else topOffset = this.archivePgContent.titleImgTopOffset;
      css["--titleTopOffset"] = topOffset + "%";
      css["--titleMaxWidth"] = this.archivePgContent.titleImgMaxWidth + "%";
      return css;
    },
    slideshowRightImgs() {
      if (this.archivePgContent.headerSlideshowRight == null) return null;
      let imgs = [];
      for (
        let i = 1;
        i <= this.archivePgContent.headerSlideshowRight.numImages;
        i++
      ) {
        let url =
          this.archivePgContent.headerSlideshowRight.commonPath + i + ".jpg";
        imgs.push({ img: url });
      }
      return imgs;
    },
    carouselHeight() {
      const aspectRatio = 1.274;

      if (this.windowWidth < 1200) {
        let horizPadding =
          this.windowWidth < 576
            ? 16
            : this.windowWidth < 768
            ? 24
            : this.windowWidth < 992
            ? 36
            : 50; //px each side

        horizPadding += 24; // 12px app layout padding each side

        return Math.min(
          644,
          (this.windowWidth - 2 * horizPadding) / aspectRatio
        );
      }

      const horizPadding = 72; //px each side
      const headerImagesGap = 25; //px each gap

      return (
        (this.windowWidth - 2 * horizPadding - 2 * headerImagesGap) /
        3 /
        aspectRatio
      );
    },
    galleryImgUrls() {
      if (this.archivePgContent.imageGallery == null) return null;
      let urls = [];
      for (let i = 1; i <= this.archivePgContent.imageGallery.numImages; i++) {
        let url = this.archivePgContent.imageGallery.commonPath + i + ".jpg";
        if (
          (this.titleSlug === "lots-of-fishing" && (i == 356 || i == 379)) ||
          (this.titleSlug === "boyhood" && i == 57)
        ) {
          continue;
        } else {
          urls.push(url);
        }
      }
      return urls;
    },
    zoomedImgStyles() {
      let absCenterTop = this.windowHeight / 2 - this.imgCenterPos.top + 175;
      let absCenterLeft = this.windowWidth / 2 - this.imgCenterPos.left + 175;
      return {
        "--absCenterTop": absCenterTop.toFixed(2) + "px",
        "--absCenterLeft": absCenterLeft.toFixed(2) + "px"
      };
    },
    audioTracks() {
      if (!this.archivePgContent.audioGallery) return [];
      return this.archivePgContent.audioGallery.map(obj => ({
        ...obj,
        type: "audio"
      }));
    },
    articles() {
      if (!this.archivePgContent.articleGallery) return [];
      return this.archivePgContent.articleGallery.map(obj => ({
        ...obj,
        type: "article"
      }));
    },
    audiosAndArticles() {
      return [...this.audioTracks, ...this.articles].sort((a, b) =>
        a.orderNo > b.orderNo ? 1 : -1
      );
    },
    mainContentStyles() {
      let css = {};
      if (this.windowWidth < 375) {
        css["--maxPerRow"] = 1;
        const boxSize = this.windowWidth - 32;
        css["--boxSize"] = boxSize + "px";
      } else {
        css["--maxPerRow"] = 5;
        css["--boxSize"] = "350px";
      }
      css["--gridGap"] = "30px";
      return css;
    },
    bookImagesUrlsStdRes() {
      if (this.articles == null || this.articleIndex == null) return [];
      const book = this.articles[this.articleIndex];
      let pages = [];
      let urlCommon = book.commonPathStdRes + book.commonFilenameStdRes;
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = urlCommon + i + ".jpg";
        pages.push(url);
      }
      return pages;
    },
    archives() {
      let archives = [];
      this.archivesPgContent.tiles?.forEach(tile => {
        archives.push({
          title: tile.text,
          link: slugify(tile.text, {
            customReplacements: [
              ["'", ""],
              [",", ""]
            ]
          })
        });
      });
      return archives;
    },
    currentIndex() {
      for (let i = 0; i < this.archives.length; i++) {
        if (
          this.archives[i].link ==
          slugify(this.title, {
            customReplacements: [
              ["'", ""],
              [",", ""]
            ]
          })
        )
          return i;
      }
    },
    prev_archive() {
      if (this.archives.length === 0) return {};
      const prev_i =
        this.currentIndex === 0
          ? this.archives.length - 1
          : this.currentIndex - 1;
      return this.archives[prev_i];
    },
    next_archive() {
      if (this.archives.length === 0) return {};
      const next_i =
        this.currentIndex === this.archives.length - 1
          ? 0
          : this.currentIndex + 1;
      return this.archives[next_i];
    },
    isViewportForSmallLinks() {
      return this.windowWidth < 992;
    }
  },

  async mounted() {
    const archivePgContent = await queryContent(
      "archives",
      this.$route.params._slug
    ).findOne();
    this.archivePgContent = archivePgContent;

    const archivesPgContent = await queryContent("archives-index").findOne();
    this.archivesPgContent = archivesPgContent;

    if (this.archivePgContent.headerSlideshowLeft && this.$refs.slideshowLeft) {
      this.$refs.slideshowLeft.pause();
      this.$refs.slideshowCenter.pause();
      this.$refs.slideshowRight.pause();
      this.staggerSlideshowStarts();
    }
    this.updateWindowDims();
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
      document.addEventListener("keydown", this.keyDownHandler, false);
      document.addEventListener("scroll", this.scrollHandler, false);
    },
    unbindEvents() {
      window.removeEventListener("resize", this.updateWindowDims, false);
      window.removeEventListener(
        "orientationchange",
        this.updateWindowDims,
        false
      );
      document.removeEventListener("keydown", this.keyDownHandler, false);
      document.removeEventListener("scroll", this.scrollHandler, false);
    },
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    async staggerSlideshowStarts() {
      this.$refs.slideshowLeft.start();

      await this.delay(1500);
      this.$refs.slideshowRight.start();

      await this.delay(1500);
      this.$refs.slideshowCenter.start();
    },
    onGalleryImgClick(iWrapper, iImg) {
      if (this.zoomedImgIndex == iImg || this.windowWidth < 768) {
        return;
      }

      const imgEl = document.getElementById(
        `gW_${iWrapper}-galleryImage_${iImg}`
      );
      const elemRect = imgEl.getBoundingClientRect();
      this.imgCenterPos.top = elemRect.top + elemRect.height / 2;
      this.imgCenterPos.left = elemRect.left + elemRect.width / 2;

      this.$nextTick(() => {
        this.zoomedImgIndex = iImg;
        this.applyLargeImgStyles = true;
      });

      this.eventName = "click";
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
    onGalleryMediaClick(iItem) {
      const item = this.audiosAndArticles[iItem];
      function callback(arrItem) {
        return arrItem.thumbnailImg == item.thumbnailImg;
      }
      if (item.type == "audio") {
        const index = this.audioTracks.findIndex(callback);
        this.audioIndex = index >= 0 ? index : null;
      } else if (item.type == "article") {
        const index = this.articles.findIndex(callback);
        this.articleIndex = index >= 0 ? index : null;
        this.toggleFullscreen();
      }
    },
    updateWindowDims() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen;
      this.reloadBook();
    },
    reloadBook() {
      this.bookKey += 1; // increment component key to force reload between toggle of fullscreen / normal-screen
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap");

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url("../../assets/fonts/nhaasgrotesktxpro-65md.eot"); /* IE9 Compat Modes */
  src: url("../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../assets/fonts/nhaasgrotesktxpro-65md.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
}

.backToArchives {
  position: absolute;
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
  padding: 130px 60px 30px 60px !important;
  width: 100%;
  margin: 0 auto;
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
}
.headerBox {
  width: 100%;
  max-width: 821px;
  position: relative;
  place-self: center;
}
.headerBox > img {
  border-radius: 15px;
  width: 100%;
  height: auto;
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

.titleImg {
  position: relative;
  max-width: var(--titleMaxWidth);
  height: auto;
  margin: auto;
  padding: 0 0 16px 0;
}

.archive_headerText {
  padding-right: 0px;
  padding-left: 0px;
  // see styles.css for more
}

.simple-scrollbar {
  height: inherit;
  // height: 100%;
}

.nav_link {
  width: min-content;
  img {
    max-height: 25px;
  }
}

#mainContent {
  max-width: calc(
    var(--maxPerRow) * var(--boxSize) + (var(--maxPerRow - 1) * var(--gridGap)) +
      2 * 16px
  );
  width: 100%;
  margin: 0 auto;
}

.galleryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--boxSize), 1fr));
  grid-auto-flow: row;
  grid-gap: var(--gridGap);
  align-items: center;
  justify-content: center;
}
.galleryWrapper:not(:last-of-type) {
  margin-bottom: var(--gridGap);
}

.galleryBox {
  background-color: black;
  width: 100%;
  max-width: var(--boxSize);
  height: var(--boxSize);
  position: relative;
  place-self: center;
  cursor: pointer;
}

.mediaBox {
  opacity: 0.46;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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

.galleryImage {
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  object-fit: contain;
  margin: auto;
  top: calc(var(--boxSize) / 2);
  left: calc(var(--boxSize) / 2);
  width: var(--boxSize);
  height: var(--boxSize);
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
  font-size: 46px;
  line-height: 46px;
  letter-spacing: 6px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.32);
  text-transform: uppercase;
  transition: inherit;
  width: 100%;
  padding: 0 20px 0 26px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.boxOverlay .hideOnHover {
  opacity: 1;
  transition: all 0.5s ease 0s;
}
.galleryBox:hover .boxOverlay .hideOnHover {
  opacity: 0;
}
.boxOverlay .showOnHover {
  opacity: 0;
  transition: all 0.5s ease 0s;
}
.galleryBox:hover .boxOverlay .showOnHover {
  opacity: 1;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .titleImg {
    max-width: 85%;
    padding: 0 32px 8px 32px;
  }
  .headerOverlay {
    padding-bottom: 0px;
  }
  .backToArchives {
    top: 20px;
    right: 26px;
  }
  .nav_link img {
    max-height: 15px;
  }
  #header {
    padding: 90px 16px 16px 16px !important;
  }
  .galleryWrapper {
    grid-gap: 16px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .backToArchives {
    top: 27px;
    right: 27px;
  }
  .nav_link img {
    max-height: 20px;
  }
  #header {
    padding: 100px 24px 16px 24px !important;
  }
  .galleryWrapper {
    grid-gap: 16px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .galleryWrapper {
    grid-gap: 24px;
  }
  .backToArchives {
    top: 33px;
    right: 33px;
  }
  .nav_link img {
    max-height: 20px;
  }
  #header {
    padding: 100px 36px 24px 36px !important;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .galleryWrapper {
    grid-gap: 24px;
  }
  .backToArchives {
    top: 37px;
    right: 37px;
  }
  .nav_link img {
    max-height: 20px;
  }
  #header {
    padding: 130px 50px 30px 50px !important;
  }
}

/* Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .backToArchivesImg-hover,
  .backToArchivesImg {
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
    height: calc(var(--boxSize));
    top: calc(var(--boxSize) / 2);
  }
}

/* Special */
@media only screen and (max-width: 1199.98px) {
  .headerWrapper {
    grid-template-columns: 1fr;
  }
}
</style>

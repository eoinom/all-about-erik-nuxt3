<template>
  <ClientOnly>
    <router-view v-slot="{ route }">
      <div :key="'publication_' + titleSlug">
        <!-- Need a unique key for the transition above to work on route change -->

        <Head>
          <Title>{{ title }}</Title>
        </Head>

        <img
          v-if="publicationPgContent.pageBgImg !== ''"
          :src="publicationPgContent.pageBgImg"
          id="pageBgImg"
          :style="pageBgStyles"
        />

        <!-- Header for OLD TIMEY SPORTSMEN -->
        <header
          v-if="title == 'Old Timey Sportsmen'"
          id="header"
          :style="headerStyles"
        >
          <v-container fluid>
            <v-row
              align="center"
              style="min-height: 215px"
            >
              <v-col
                v-if="publicationPgContent.headerLeftImg !== ''"
                align-self="center"
                class="headerImageCol"
                style="text-align: right"
              >
                <img
                  alt="Hunter"
                  :src="publicationPgContent.headerLeftImg"
                  id="headerLeftImg"
                />
              </v-col>

              <v-col
                class="sportsmenHeaderMainCol"
                align-self="end"
              >
                <img
                  :src="titleImg1Line"
                  class="titleImg titleImg1Line pt-3"
                />
                <img
                  :src="titleImg2Lines"
                  class="titleImg titleImg2Lines sportsmen2LineTitleImg"
                />

                <div
                  v-html="publicationPgContent.description"
                  class="publication_headerText"
                />

                <v-row
                  align="start"
                  justify="center"
                  style="min-height: 68px; padding-top: 8px"
                >
                  <v-col>
                    <a
                      href="http://oldtimeysportsmenphotogallery.com/gallery/"
                      target="_blank"
                      class="sportsmenLinkText"
                      style="margin: 0 auto"
                      @mouseover="updateSportsmenGalleryHover(true)"
                      @mouseleave="updateSportsmenGalleryHover(false)"
                    >
                      <div
                        v-if="windowWidth > 350"
                        style="padding-bottom: 66px"
                      >
                        <span
                          >SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span
                        >
                        <br /><span class="line2"
                          >Old-Time Sportsmen Gallery</span
                        >
                      </div>
                      <div
                        v-else
                        style="padding-bottom: 66px"
                      >
                        <span
                          >SEE MORE OF THE COLLECTION, CLICK FOR A NEW TAB</span
                        >
                        <br /><span class="line2"
                          >Old-Time Sportsmen <br />Gallery</span
                        >
                      </div>

                      <img
                        v-show="sportsmenGalleryHover"
                        class="headerHoverImg"
                        alt="Guns crossed"
                        :src="publicationPgContent.headerHoverImg"
                      />
                    </a>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                v-if="publicationPgContent.headerRightImg !== ''"
                align-self="center"
                class="headerImageCol"
                style="text-align: left"
              >
                <img
                  alt="ducks"
                  :src="publicationPgContent.headerRightImg"
                  id="headerRightImg"
                />
              </v-col>
            </v-row>
          </v-container>
        </header>

        <!-- Header for OTHER PAGES -->
        <header
          v-else
          id="header"
          :style="headerStyles"
        >
          <div class="headerItems">
            <img
              :src="titleImg1Line"
              class="titleImg titleImg1Line pt-3"
            />
            <img
              :src="titleImg2Lines"
              class="titleImg titleImg2Lines"
            />

            <div
              v-html="publicationPgContent.description"
              class="publication_headerText"
            />
            <div
              v-if="publicationPgContent.volumeInfo !== ''"
              v-html="publicationPgContent.volumeInfo"
              class="publication_headerText pt-1"
            />
          </div>
        </header>

        <!-- MAIN CONTENT -->
        <v-container
          fluid
          class="pa-3 py-md-6 px-md-12"
          data-testid="main-content"
        >
          <v-row
            no-gutters
            align="start"
            justify="center"
          >
            <v-col>
              <Tooltip
                :text="prevPublication.title"
                location="top"
              >
                <NuxtLink
                  v-if="isViewportForSmallLinks"
                  :to="'/publications/' + prevPublication.link"
                  class="nav_link nav_link_small"
                  id="nav_prev"
                >
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-publication-2lines-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-publication-2lines-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>

                <NuxtLink
                  v-else
                  :to="'/publications/' + prevPublication.link"
                  class="nav_link nav_link_big"
                  id="nav_prev"
                >
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-publication-1line-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="previous"
                    src="../../assets/images/previous-publication-1line-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>
              </Tooltip>
            </v-col>
            
            <v-col
              cols="11"
              md="8"
              lg="7"
              order="3"
              order-lg="2"
              class="pt-3 pb-3 pt-sm-0"
              id="mainCol"
            >
              <BookViewer
                v-if="bookImagesUrlsStdRes && bookImagesUrlsHiRes"
                :pages="bookImagesUrlsStdRes"
                :pagesHiRes="bookImagesUrlsHiRes"
                :isFullscreen="isBookFullscreen"
                :viewportHeight="bookVpHeight"
                :showSinglePage="bookShowSinglePage"
                :key="'bookViewer' + bookKey"
                @toggleFullscreen="toggleFullscreen()"
                @reload="reloadBook()"
              />

              <div
                v-if="title !== 'Old Timey Sportsmen'"
                v-html="publicationPgContent.fullTitle"
                class="publication_headerText text-left pt-4"
              />
              <div
                v-if="
                  publicationPgContent.volumeInfo &&
                  publicationPgContent.volumeInfo !== ''
                "
                v-html="publicationPgContent.volumeInfo"
                class="publication_headerText text-left pt-2"
              />
              <div class="publication_mainText pt-4">
                {{ publicationPgContent.mainTextTop }}
              </div>
              <div class="publication_mainText pt-4">
                {{ publicationPgContent.mainTextBottom }}
              </div>

              <br />

              <div
                v-if="
                  publicationPgContent.videoUrl &&
                  publicationPgContent.videoUrl !== ''
                "
                id="videoDiv"
              >
                <h2 class="videoTitleText mb-3">
                  WATCH THE VIDEO ABOUT THE BOOK HERE
                </h2>
                <iframe
                  :src="
                    publicationPgContent.videoUrl +
                    '?autoplay=0&color=505050&title=0&byline=0&portrait=0'
                  "
                  style="max-width: 100%"
                  :style="videoFrameStyles"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                >
                </iframe>
              </div>
            </v-col>

            <v-col
              order="2"
              order-lg="3"
              class="text-right"
            >
              <Tooltip
                :text="nextPublication.title"
                location="top"
              >
                <NuxtLink
                  v-if="isViewportForSmallLinks"
                  :to="'/publications/' + nextPublication.link"
                  class="nav_link nav_link_small"
                  id="nav_next"
                >
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-publication-2lines-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-publication-2lines-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>

                <NuxtLink
                  v-else
                  :to="'/publications/' + nextPublication.link"
                  class="nav_link nav_link_big"
                  id="nav_next"
                >
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-publication-1line-white.png"
                    class="hideOnHover"
                  />
                  <img
                    immediate
                    alt="next"
                    src="../../assets/images/next-publication-1line-yellow.png"
                    class="showOnHover"
                  />
                </NuxtLink>
              </Tooltip>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <NuxtLink
                :to="{ path: '/publications/', query: { playMusic: 'false' } }"
                class="nav_link nav_link_big"
                id="nav_back"
              >
                <img
                  immediate
                  alt="Back to publications menu"
                  src="../../assets/images/back-to-publications-menu-1line-white.png"
                  class="hideOnHover"
                />
                <img
                  immediate
                  alt="Back to publications menu"
                  src="../../assets/images/back-to-publications-menu-1line-yellow.png"
                  class="showOnHover"
                />
              </NuxtLink>

              <NuxtLink
                :to="{ path: '/publications/', query: { playMusic: 'false' } }"
                class="nav_link nav_link_small"
                id="nav_back"
              >
                <img
                  immediate
                  alt="Back to publications menu"
                  src="../../assets/images/back-to-publications-menu-3lines-white.png"
                  class="hideOnHover"
                />
                <img
                  immediate
                  alt="Back to publications menu"
                  src="../../assets/images/back-to-publications-menu-3lines-yellow.png"
                  class="showOnHover"
                />
              </NuxtLink>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </router-view>
  </ClientOnly>
</template>

<script>
import slugify from '@sindresorhus/slugify';
import snarkdown from 'snarkdown';

export default {
  data() {
    return {
      publicationPgContent: {},
      publicationsIndexContent: {},
      imageIndex: 0,
      showIntro: false,
      sportsmenGalleryHover: false,
      windowWidth: 0.0,
      isBookFullscreen: false,
      bookShowSinglePage: false,
      bookKey: 1,
      mainColWidth: 900,
    };
  },

  computed: {
    title() {
      return this.publicationPgContent.title;
    },
    titleSlug() {
      return this.title ? slugify(this.title) : '';
    },
    titleImg1Line() {
      return this.publicationPgContent.titleImg1Line !== undefined &&
        this.publicationPgContent.titleImg1Line !== ''
        ? this.publicationPgContent.titleImg1Line
        : this.publicationPgContent.titleImg2Lines;
    },
    titleImg2Lines() {
      let titleImg2LinesConcise = Array.isArray(
        this.publicationPgContent.titleImg2LinesConcise
      )
        ? this.publicationPgContent.titleImg2LinesConcise[0]
        : this.publicationPgContent.titleImg2LinesConcise; // due to some unknown issue this field is coming out as an array

      if (
        (this.titleSlug === 'animal-myth-and-magic' &&
          this.windowWidth < 576) ||
        (this.titleSlug.substring(0, 7) === 'shamans' && this.windowWidth < 768)
      ) {
        return titleImg2LinesConcise !== ''
          ? titleImg2LinesConcise
          : this.publicationPgContent.titleImg2Lines;
      } else {
        return this.publicationPgContent.titleImg2Lines;
      }
    },
    headerBgImgOpacity() {
      return this.publicationPgContent.hasOwnProperty('headerBgImgOpacity')
        ? this.publicationPgContent.headerBgImgOpacity
        : 0.5;
    },
    headerStyles() {
      return {
        '--headerBgImg': 'url(' + this.publicationPgContent.headerBgImg + ')',
        '--bgOpacity': this.headerBgImgOpacity / 100,
      };
    },
    pageBgStyles() {
      let css = {};
      css.opacity = this.publicationPgContent.pageBgImgOpacity / 100;
      return css;
    },
    publications() {
      return this.publicationsIndexContent.publications;
    },
    publication_names() {
      return this.publications !== undefined
        ? this.publications.map((x) => x.title)
        : [];
    },
    publicationIndex() {
      return this.publication_names.indexOf(this.title);
    },
    prevPublication() {
      const i = this.publicationIndex;
      if (this.publication_names.length === 0) return {};
      if (i === 0) var prev_i = this.publication_names.length - 1;
      else prev_i = i - 1;
      let publication = { ...this.publications[prev_i] };
      publication.link = slugify(publication.title);
      return publication;
    },
    nextPublication() {
      const i = this.publicationIndex;
      if (this.publication_names.length === 0) return {};
      if (i === this.publication_names.length - 1) var next_i = 0;
      else next_i = i + 1;
      let publication = { ...this.publications[next_i] };
      publication.link = slugify(publication.title);
      return publication;
    },
    bookImagesUrlsStdRes() {
      let pages = [null]; // first element is null so that cover page appears on its own
      if (this.publicationPgContent.bookImages === undefined) return;
      const book = this.publicationPgContent.bookImages;
      let urlCommon = book.commonPathStdRes + book.commonFilenameStdRes;
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = urlCommon + i + '.jpg';
        pages.push(url);
      }
      return pages;
    },
    bookImagesUrlsHiRes() {
      let pages = [null]; // first element is null so that cover page appears on its own
      if (this.publicationPgContent.bookImages === undefined) return;
      const book = this.publicationPgContent.bookImages;
      let urlCommon = book.commonPathHiRes + book.commonFilenameHiRes;
      for (
        let i = book.commonFilenameStartNum;
        i <= book.commonFilenameLastNum;
        i++
      ) {
        let url = urlCommon + i + '.jpg';
        pages.push(url);
      }
      return pages;
    },
    bookVpHeight() {
      if (this.publicationPgContent.bookImages === undefined) return;
      const pageWidth = this.publicationPgContent.bookImages.width;
      const pageHeight = this.publicationPgContent.bookImages.height;

      if (this.windowWidth > 1200) {
        // show double pages
        const twoPagesWidth = 2 * pageWidth;
        let actualWidth = Math.min(twoPagesWidth, this.mainColWidth);
        var actualHeight = (actualWidth / twoPagesWidth) * pageHeight;
        this.bookShowSinglePage = false;
      } else {
        // show single pages
        let actualWidth = Math.min(pageWidth, this.mainColWidth);
        actualHeight = (actualWidth / pageWidth) * pageHeight;
        this.bookShowSinglePage = true;
      }
      return actualHeight + 'px';
    },
    videoFrameStyles() {
      const maxVidWidth = 954.656;
      const maxVidHeight = 537;

      let actualWidth =
        maxVidWidth < this.mainColWidth ? maxVidWidth : this.mainColWidth;
      let actualHeight = (actualWidth / maxVidWidth) * maxVidHeight;
      return {
        width: actualWidth + 'px',
        height: actualHeight + 'px',
      };
    },
    isViewportForSmallLinks() {
      return this.windowWidth < 1890;
    },
  },

  watch: {
    windowWidth: function (val) {
      this.sportsmenGalleryHover = val < 1400;

      this.updateMainColWidth();

      this.reloadBook();
    },
  },

  async mounted() {
    const publicationPgContent = await queryContent(
      'publications',
      this.$route.params._slug
    ).findOne();
    this.publicationPgContent = publicationPgContent;

    const publicationsIndexContent = await queryContent(
      'publications-index'
    ).findOne();
    this.publicationsIndexContent = publicationsIndexContent;

    this.windowWidth = window.innerWidth;
    this.updateMainColWidth();

    window.addEventListener('resize', () => {
      if (this.windowWidth !== window.innerWidth) {
        this.windowWidth = window.innerWidth;
      }
    });
    window.addEventListener('orientationchange', () => {
      this.windowWidth = window.innerWidth;
    });
  },

  methods: {
    renderMarkdown(text) {
      return snarkdown(text);
    },
    updateSportsmenGalleryHover(val) {
      if (this.windowWidth >= 1400) this.sportsmenGalleryHover = val;
    },
    toggleFullscreen() {
      this.isBookFullscreen = !this.isBookFullscreen;
      this.reloadBook();
    },
    reloadBook() {
      this.bookKey += 1; // increment component key to force reload between toggle of fullscreen / normal-screen
    },
    updateMainColWidth() {
      let element = document.getElementById('mainCol');
      if (!element) return;
      let elemRect = element.getBoundingClientRect();
      this.mainColWidth = elemRect.width;
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css?family=Francois+One&display=swap');

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

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

#pageBgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
  z-index: -1;
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
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
  transform: translate3d(
    0,
    0,
    0
  ); // Needed to fix an issue on iOS where the header image disappears
}

#headerLeftImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 189px;
}
#headerRightImg {
  min-width: 230px;
  max-width: 70%;
  max-height: 149px;
}

.headerItems {
  width: 1240px;
  max-width: 90vw;
  text-align: center;
  margin: 0 auto;
}
.publication_headerText {
  color: #ffffff;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  letter-spacing: 5px;
  text-align: center;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.18);
  text-transform: uppercase;
  margin: 0px;
  padding: 0px;
  &:first-of-type {
    letter-spacing: 8px;
  }
}

.sportsmenHeaderMainCol {
  width: 1240px;
  max-width: 970px;
  text-align: center;
  margin: 0 auto;
}
.sportsmenLinkText {
  color: #000;
  font-family: 'Francois One', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.8px;
  text-align: center;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
  width: 397px;
  display: block;
  cursor: pointer;
}
.sportsmenLinkText .line2 {
  font-size: 1.125rem;
}

.headerHoverImg {
  display: block;
  position: absolute;
  bottom: 0;
}

.titleImg {
  max-width: 100%;
  margin-bottom: 8px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
}
.sportsmen2LineTitleImg {
  max-width: 396px;
}

.nav_link {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 1.75rem;
  letter-spacing: 1px;
  line-height: 2.1875rem;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  margin: 0px;
  padding: 0px;
  width: fit-content;
  z-index: 1000;
}
#nav_prev {
  text-align: left;
  padding-left: var(--linkGutter);
}
#nav_next {
  text-align: right;
  float: right;
  padding-right: var(--linkGutter);
}
#nav_back {
  text-align: center;
  padding: 0 20px;
  width: 100%;
}

.publication_mainText {
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-align: justify;
  color: #ffffff;
  font-size: 1.1875rem;
  line-height: 1.9375rem;
  letter-spacing: 1px;
  text-shadow: 0px 0px 14px rgba(0, 0, 0, 0.19),
    0px 0px 14px rgba(0, 0, 0, 0.19) /* glow */,
    0px 0px 29px rgba(0, 0, 0, 0.57) /* drop shadow*/;
  /* See styles.css for further styles */
}

#readMoreText {
  cursor: pointer;
  font-size: 1.0625rem;
  color: #f4f4f4;
}

#videoDiv {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}
.videoTitleText {
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  font-size: 1.75rem;
  line-height: 2rem;
  letter-spacing: 1px;
}

/* To fix poor scroll speed using "background-size: cover" and "background-attachment: fixed"
Ref: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/ */
.layout::before {
  content: ' ';
  position: fixed; /* instead of background-attachment */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
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
.page-enter,
.page-leave-active {
  opacity: 0;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 60px;
  }
  .publication_headerText {
    font-size: 0.875rem;
    line-height: 1.25rem;
    &:first-of-type {
      letter-spacing: 7px;
    }
  }
  .sportsmenHeaderMainCol {
    max-width: 100%;
    padding: 0px 60px;
  }
  .sportsmenLinkText,
  .sportsmenLinkText img,
  .sportsmen2LineTitleImg {
    max-width: 100%;
  }
  .sportsmenLinkText img {
    margin-left: -15px;
  }
  .publication_mainText {
    font-size: calc(
      1rem + 2 * (100vw - 375px) / (576 - 375)
    ); /* varies between 16px (1rem) and 18px */
    line-height: calc(
      1.0625rem + 7 * (100vw - 375px) / (576 - 375)
    ); /* varies between 17px (1.0625rem) and 24px */
  }
  #readMoreText {
    font-size: calc(
      0.875rem + 2 * (100vw - 375px) / (576 - 375)
    ); /* varies between 14px (0.875rem) and 16px */
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
    padding: 0px;
  }
  .headerItems {
    padding: 0px 80px;
  }
  .publication_headerText {
    font-size: 0.9375rem;
    line-height: 1.325rem;
    &:first-of-type {
      letter-spacing: 7px;
    }
  }
  .publication_mainText {
    font-size: calc(
      1.125rem + 1 * (100vw - 576px) / (768 - 576)
    ); /* varies between 18px (1.125rem) and 19px */
    line-height: calc(
      1.5rem + 12 * (100vw - 576px) / (768 - 576)
    ); /* varies between 24px (1.5rem) and 32px */
  }
  #readMoreText {
    font-size: calc(
      1rem + 1 * (100vw - 576px) / (768 - 576)
    ); /* varies between 16px (1rem) and 17px */
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 120px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 120px;
  }
  .nav_link_small {
    display: block;
  }
  .nav_link_big {
    display: none;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: inline;
    margin: 10px 0px;
  }
  .headerItems {
    padding: 0px 130px;
  }
}

/* Special */
@media only screen and (max-width: 1399.98px) {
  .headerImageCol {
    display: none;
  }
}

/* Special */
@media only screen and (max-width: 1889.98px) {
  .nav_link_small#nav_prev,
  .nav_link_small#nav_next {
    display: block;
  }
  .nav_link_big#nav_prev,
  .nav_link_big#nav_next {
    display: none;
  }
}
</style>

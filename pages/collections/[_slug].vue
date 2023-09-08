<template>
  <ClientOnly>
    <router-view v-slot="{ route }">
      <div :key="'collection_' + titleSlug">
        <!-- Need a unique key for the transition above to work on route change -->

        <Head>
          <Title>{{ title }}</Title>
        </Head>

        <header
          id="header"
          :style="headerStyles"
        >
          <div id="headerItems">
            <img
              :src="titleImg1Line"
              class="titleImg titleImg1Line"
            />
            <img
              :src="titleImg2Lines"
              class="titleImg titleImg2Lines"
            />

            <div
              v-if="windowWidth < 1200"
              class="collection_headerText pointer"
              style="font-style: italic"
              :aria-expanded="showIntro ? 'true' : 'false'"
              aria-controls="collapse-1"
              @click="showIntro = !showIntro"
            >
              {{ showIntro ? 'Hide intro' : 'Read intro' }}
              <svg
                viewBox="0 0 20 20"
                width="20"
                height="20"
                class="arrow"
              >
                <line
                  v-if="showIntro"
                  x1="1"
                  y1="13"
                  x2="9"
                  y2="4.5"
                />
                <line
                  v-if="showIntro"
                  x1="8"
                  y1="4.5"
                  x2="16"
                  y2="13"
                />
                <line
                  v-if="!showIntro"
                  x1="1"
                  y1="4.5"
                  x2="9"
                  y2="13"
                />
                <line
                  v-if="!showIntro"
                  x1="8"
                  y1="13"
                  x2="16"
                  y2="4.5"
                />
              </svg>
            </div>

            <ContentRenderer
              v-else
              :value="collectionPgContent"
            >
              <ContentRendererMarkdown
                :value="collectionPgContent"
                tag="div"
                id="headerTextDevice"
                class="collection_headerText mx-auto my-0"
              />
            </ContentRenderer>
          </div>
        </header>

        <div
          v-if="windowWidth < 1200"
          :class="
            showIntro
              ? 'headerTextDevice_container'
              : 'headerTextDevice_container headerTextDevice_hide'
          "
        >
          <div
            v-html="collectionPgContent.description"
            class="collection_headerText"
            id="headerTextDevice"
            ref="headerTextDevice"
          />
        </div>

        <CollectionViewer
          :images="images"
          :index="imageIndex"
          :disable-scroll="true"
          :prevCollection="prev_collection"
          :nextCollection="next_collection"
          @close="imageIndex = null"
        />
      </div>
    </router-view>
  </ClientOnly>
</template>

<script>
import slugify from '@sindresorhus/slugify';

export default {
  data() {
    return {
      collectionPgContent: {},
      collectionsPgContent: {},
      imageIndex: 0,
      showIntro: true,
      windowWidth: 0.0,
      headerTextHeight: 0,
    };
  },

  computed: {
    title() {
      return this.collectionPgContent.title;
    },
    titleSlug() {
      return this.title ? slugify(this.title) : '';
    },
    titleImg1Line() {
      return this.collectionPgContent.titleImg1Line;
    },
    titleImg2Lines() {
      return this.collectionPgContent.titleImg2Lines;
    },
    headerBgImg() {
      return this.collectionPgContent.headerBgImg;
    },
    headerBgImgOpacity() {
      return this.collectionPgContent.hasOwnProperty('backgroundImgOpacity')
        ? this.collectionPgContent.backgroundImgOpacity
        : 0.5;
    },
    headerStyles() {
      return {
        '--headerBgImg': `url(${this.headerBgImg})`,
        '--bgOpacity': this.headerBgImgOpacity / 100,
      };
    },
    images() {
      return this.collectionPgContent.images;
    },
    collections() {
      return this.collectionsPgContent.collections;
    },
    collection_names() {
      return this.collections !== undefined
        ? this.collections.map((x) => x.title)
        : [];
    },
    collectionIndex() {
      return this.collection_names.indexOf(this.title);
    },
    prev_collection() {
      const i = this.collectionIndex;
      if (this.collection_names.length === 0) return {};
      if (i === 0) var prev_i = this.collection_names.length - 1;
      else prev_i = i - 1;
      let collection = { ...this.collections[prev_i] };
      collection.link = slugify(collection.title);
      return collection;
    },
    next_collection() {
      const i = this.collectionIndex;
      if (this.collection_names.length === 0) return {};
      if (i === this.collection_names.length - 1) var next_i = 0;
      else next_i = i + 1;
      let collection = { ...this.collections[next_i] };
      collection.link = slugify(collection.title);
      return collection;
    },
    headerTextContainerHeight() {
      return this.showIntro && this.headerTextHeight > 0
        ? this.headerTextHeight + 40 + 'px'
        : '0px';
    },
  },

  async mounted() {
    const collectionPgContent = await queryContent(
      'collections',
      this.$route.params._slug
    ).findOne();
    this.collectionPgContent = collectionPgContent;

    const collectionsPgContent = await queryContent(
      'collections-index'
    ).findOne();
    this.collectionsPgContent = collectionsPgContent;

    this.windowWidth = window.innerWidth;
    this.onResize();

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.onResize();
    });
    window.addEventListener('orientationchange', () => {
      this.windowWidth = window.innerWidth;
      this.onResize();
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.onResize();
    });
    window.removeEventListener('orientationchange', () => {
      this.windowWidth = window.innerWidth;
      this.onResize();
    });
  },

  methods: {
    onResize() {
      this.headerTextHeight =
        document.getElementById('headerTextDevice').clientHeight;
    },
  },
};
</script>

<style scoped lang="scss">
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

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

#header {
  position: relative;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}
#header:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  background: var(--headerBgImg) no-repeat center;
  background-size: cover;
  transform: translate3d(0, 0, 0);
  opacity: var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
}

#headerItems {
  width: 1240px;
  max-width: 90vw;
  text-align: center;
  margin: 0 auto;
}
.headerTextDevice_container {
  height: v-bind(headerTextContainerHeight);
  transition: height 0.6s ease-out;
  overflow: hidden;
}
.headerTextDevice_hide {
  height: 0;
}
.collection_headerText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.29);
  color: #ffffff;
  text-align: center;
  letter-spacing: 1px;
  line-height: 1.625rem;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 auto;
  padding: 0px;
  width: fit-content;
  /* See styles.css for further styles */
}

.pointer {
  cursor: pointer;
}

#headerTextDevice {
  color: #ececec;
  font-size: 0.925rem;
  margin: 20px;
}

.arrow {
  margin-left: 5px;
  margin-right: -3px;
}
.arrow > line {
  stroke: rgb(203, 203, 201);
  stroke-width: 2px;
}

.titleImg {
  max-width: 100%;
  // margin-bottom: 20px;
}
.titleImg1Line {
  display: inline;
}
.titleImg2Lines {
  display: none;
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
    padding: 0px 60px;
  }
  .collection_headerText {
    line-height: 1.4375rem;
    font-size: 1rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .titleImg {
    max-width: 100%;
    padding: 15px 40px 10px 70px;
    margin: 0px;
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
    padding: 0px 80px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .titleImg {
    padding: 0px 100px;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .collection_headerText,
  .titleImg {
    padding: 0px 120px;
  }
}
</style>

<template>
  <router-view v-slot="{ route }">
    <div
      :key="route.fullPath"
      class="background"
      :style="backgroundStyles"
    >
      <div
        :style="navLinksVisibility"
        class="navLinksContainer"
      >
        <NuxtLink
          :to="'/musical-journey/musical-friends/' + prev_friend.link"
          v-b-tooltip.hover="{ variant: 'secondary' }"
          :title="prev_friend.title"
          class="nav_link nav_link_small"
          id="nav_prev"
        >
          <img
            immediate
            alt="previous"
            src="../../../assets/images/prev-white.png"
            class="hideOnHover"
          />
          <img
            immediate
            alt="previous"
            src="../../../assets/images/prev-yellow.png"
            class="showOnHover"
          />
        </NuxtLink>

        <NuxtLink
          :to="'/musical-journey/musical-friends/' + prev_friend.link"
          v-b-tooltip.hover="{ variant: 'secondary' }"
          :title="prev_friend.title"
          class="nav_link nav_link_big"
          id="nav_previous"
        >
          <img
            immediate
            alt="previous"
            src="../../../assets/images/previous-white.png"
            class="hideOnHover"
          />
          <img
            immediate
            alt="previous"
            src="../../../assets/images/previous-yellow.png"
            class="showOnHover"
          />
        </NuxtLink>

        <NuxtLink
          :to="'/musical-journey/musical-friends/' + next_friend.link"
          v-b-tooltip.hover="{ variant: 'secondary' }"
          :title="next_friend.title"
          class="nav_link nav_link_small"
          id="nav_next"
        >
          <img
            immediate
            alt="next"
            src="../../../assets/images/next-white.png"
            class="hideOnHover"
          />
          <img
            immediate
            alt="next"
            src="../../../assets/images/next-yellow.png"
            class="showOnHover"
          />
        </NuxtLink>

        <NuxtLink
          :to="'/musical-journey/musical-friends/' + next_friend.link"
          v-b-tooltip.hover="{ variant: 'secondary' }"
          :title="next_friend.title"
          class="nav_link nav_link_big"
          id="nav_next"
        >
          <img
            immediate
            alt="next"
            src="../../../assets/images/next-white.png"
            class="hideOnHover"
          />
          <img
            immediate
            alt="next"
            src="../../../assets/images/next-yellow.png"
            class="showOnHover"
          />
        </NuxtLink>
      </div>

      <v-container
        fluid
        class="wrapper"
      >
        <!-- 768px wide (iPads) and higher -->
        <template v-if="windowWidth >= 768">
          <v-container
            fluid
            class="main-col mt-4 pt-4 mt-sm-6 pt-md-6 px-6 pb-2 mb-2"
          >
            <h1 class="heading headingMain">{{ heading }}</h1>
            <div>
              <ContentRenderer
                :value="musicalFriendPgContent"
                tag="div"
                id="mainContent"
              />
            </div>
          </v-container>

          <v-container
            fluid
            class="galleriesContainer"
          >
            <v-row
              justify="center"
              id="mediaItemsRow"
            >
              <a
                v-for="(item, index) in musicalFriendPgContent.mediaItems"
                :key="index"
                :href="item.mediaType == 'link' ? item.galleries[0].url : ''"
                class="mediaItems pa-2"
                v-b-toggle="String(index + 1)"
                @click="
                  ($event) => {
                    $event.preventDefault();
                    mediaItemClick(item, index);
                  }
                "
              >
                <img
                  :src="item.thumbnailImg"
                  class="mediaItemsImg"
                  :id="'mediaItemImg' + index"
                />
                <br />
                <span class="mediaItemsText mediaItemsLabel">{{
                  item.label
                }}</span>
                <v-collapse
                  v-if="item.galleries[0].label"
                  :id="String(index + 1)"
                  accordion="mediaItems-accordion"
                >
                  <div
                    v-for="(gallery, galIndex) in item.galleries"
                    :key="galIndex"
                  >
                    <br />
                    <span
                      @click="
                        galleryIndex = galIndex;
                        setMediaIndexToZero(item.mediaType);
                      "
                      class="mediaItemsText galleriesLabel py-2 pr-2"
                    >
                      {{ gallery.label }}
                    </span>
                  </div>
                </v-collapse>
              </a>
            </v-row>

            <v-row
              justify="center"
              class="text-center"
            >
              <v-col>
                <div
                  :style="navLinksVisibility"
                  class="backToMenuContainer"
                >
                  <NuxtLink
                    to="/musical-journey/musical-friends/menu/"
                    class="nav_link nav_link_big pt-4"
                    id="nav_back"
                  >
                    <img
                      immediate
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-1line-white.png"
                      class="hideOnHover"
                    />
                    <img
                      immediate
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-1line-yellow.png"
                      class="showOnHover"
                    />
                  </NuxtLink>

                  <NuxtLink
                    to="/musical-journey/musical-friends/menu/"
                    class="nav_link nav_link_small pt-4"
                    id="nav_back"
                  >
                    <img
                      immediate
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-3lines-white.png"
                      class="hideOnHover"
                    />
                    <img
                      immediate
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-3lines-yellow.png"
                      class="showOnHover"
                    />
                  </NuxtLink>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- Mobiles and Tablets less than 768px wide -->
        <template v-else>
          <header>
            <v-container fluid>
              <v-row class="mb-4 mb-sm-6 mb-md-0">
                <v-col
                  cols=""
                  class="headerNavCol"
                >
                  <NuxtLink
                    :to="'/musical-journey/musical-friends/' + prev_friend.link"
                    v-b-tooltip.hover="{ variant: 'secondary' }"
                    :title="prev_friend.name"
                    class="nav_link"
                    id="nav_prev"
                    >PREV</NuxtLink
                  >
                </v-col>
                <v-col
                  cols="6"
                  class="headerTextCol px-0"
                >
                  <h1
                    class="heading headingMobile"
                    v-html="headingMobile"
                  />
                </v-col>
                <v-col
                  cols=""
                  class="headerNavCol"
                >
                  <NuxtLink
                    :to="'/musical-journey/musical-friends/' + next_friend.link"
                    v-b-tooltip.hover="{ variant: 'secondary' }"
                    :title="next_friend.name"
                    class="nav_link"
                    id="nav_next"
                    >NEXT</NuxtLink
                  >
                </v-col>
              </v-row>
            </v-container>
          </header>

          <v-container
            fluid
            class="mainContainer"
          >
            <v-row>
              <v-col class="main-col pt-4 pt-md-6 px-6 pb-2 mb-2">
                <div>
                  <ContentRenderer
                    :value="musicalFriendPgContent"
                    tag="div"
                    id="mainContent"
                  />
                </div>
              </v-col>
            </v-row>

            <v-row
              justify="center"
              id="mediaItemsRow"
              class="galleriesContainer mx-0"
            >
              <v-col
                v-for="(item, index) in musicalFriendPgContent.mediaItems"
                :key="index"
                :href="item.mediaType == 'link' ? item.galleries[0].url : ''"
                class="mediaItems pa-2"
                v-b-toggle="String(index + 1)"
                @click="mediaItemClick(item, index)"
              >
                <img
                  :src="item.thumbnailImg"
                  class="mediaItemsImg"
                  :id="'mediaItemImg' + index"
                />
                <br />
                <span class="mediaItemsText mediaItemsLabel">{{
                  item.label
                }}</span>
                <v-collapse
                  v-if="item.galleries[0].label"
                  :id="String(index + 1)"
                  accordion="mediaItems-accordion"
                >
                  <div
                    v-for="(gallery, galIndex) in item.galleries"
                    :key="galIndex"
                  >
                    <br />
                    <span
                      @click="
                        galleryIndex = galIndex;
                        setMediaIndexToZero(item.mediaType);
                      "
                      class="mediaItemsText galleriesLabel py-2 pr-2"
                    >
                      {{ gallery.label }}
                    </span>
                  </div>
                </v-collapse>
              </v-col>
            </v-row>

            <v-row
              justify="center"
              class="text-center galleriesContainer"
            >
              <v-col>
                <div
                  :style="navLinksVisibility"
                  class="backToMenuContainer"
                >
                  <NuxtLink
                    to="/musical-journey/musical-friends/menu/"
                    class="nav_link nav_link_small pt-4"
                    id="nav_back"
                  >
                    <img
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-3lines-white.png"
                      class="hideOnHover"
                    />
                    <img
                      alt="Back to musical friends menu"
                      src="../../../assets/images/back-to-musical-friends-menu-3lines-yellow.png"
                      class="showOnHover"
                    />
                  </NuxtLink>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-container>

      <ImageLightBox
        v-if="images != null"
        :images="images"
        :index="imageIndex"
        :disable-scroll="true"
        @close="
          imageIndex = null;
          galleryIndex = null;
        "
      />
      <VideoLightBox
        v-if="videos != null"
        :videos="videos"
        :index="videoIndex"
        :disable-scroll="true"
        titlePosition="center"
        @close="
          videoIndex = null;
          galleryIndex = null;
        "
      />
      <AudioLightBox
        v-if="audio != null"
        :audios="audio"
        :index="audioIndex"
        :disable-scroll="true"
        :show-caption="false"
        @close="
          audioIndex = null;
          galleryIndex = null;
        "
      />
    </div>
  </router-view>
</template>

<script>
import slugify from '@sindresorhus/slugify';

export default {
  data() {
    return {
      musicalFriendPgContent: {},
      musicalFriendsContent: {},
      mediaItemIndex: null,
      galleryIndex: null,
      imageIndex: null,
      videoIndex: null,
      audioIndex: null,
      windowWidth: 0.0,
      windowHeight: 1.0,
    };
  },

  computed: {
    name() {
      return this.musicalFriendPgContent.name;
    },
    nameSlug() {
      return this.name ? slugify(this.name) : '';
    },
    heading() {
      return this.musicalFriendPgContent.heading
        ? this.musicalFriendPgContent.heading
        : this.name;
    },
    headingMobile() {
      return this.heading !== undefined
        ? this.heading.replace(/ /g, '<br>')
        : '';
    },
    mediaItems() {
      return this.musicalFriendPgContent.mediaItems;
    },
    images() {
      return this.imageIndex != null &&
        this.mediaItemIndex != null &&
        this.galleryIndex != null
        ? this.mediaItems[this.mediaItemIndex].galleries[this.galleryIndex]
            .images
        : [];
    },
    videos() {
      let videos =
        this.videoIndex != null &&
        this.mediaItemIndex != null &&
        this.galleryIndex != null
          ? this.mediaItems[this.mediaItemIndex].galleries[this.galleryIndex]
              .videos
          : [];

      // Get video dimensions so video component can position the captions correctly
      if (videos != []) {
        videos.forEach((video) => {
          const vimeoVidId = video.url.substring(
            video.url.lastIndexOf('/') + 1
          );
          const fetchPromise = fetch(
            'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' +
              vimeoVidId
          );
          fetchPromise
            .then((response) => {
              return response.json();
            })
            .then((details) => {
              video.width = details.width;
              video.height = details.height;
            });
        });
      }
      return videos;
    },
    audio() {
      return this.audioIndex != null &&
        this.mediaItemIndex != null &&
        this.galleryIndex != null
        ? this.mediaItems[this.mediaItemIndex].galleries[this.galleryIndex]
            .audio
        : [];
    },
    friends() {
      return this.musicalFriendsContent.friends;
    },
    friends_names() {
      return this.friends && this.friends.length > 0
        ? this.friends.map((x) => x.name)
        : [];
    },
    prev_friend() {
      let i = this.friends_names.indexOf(this.heading);
      if (i === -1) return {};
      if (i === 0) var prev_i = this.friends_names.length - 1;
      else prev_i = i - 1;
      return this.friends[prev_i];
    },
    next_friend() {
      let i = this.friends_names.indexOf(this.heading);
      if (i === -1) return {};
      if (i === this.friends_names.length - 1) var next_i = 0;
      else next_i = i + 1;
      return this.friends[next_i];
    },
    aspectRatio() {
      return this.windowWidth / this.windowHeight;
    },
    backgroundStyles() {
      let img =
        this.aspectRatio < 1.0
          ? this.musicalFriendPgContent.backgroundImgMobile
          : this.musicalFriendPgContent.backgroundImg;
      return {
        '--backgroundImg': 'url(' + img + ')',
        '--backgroundOpacity':
          this.musicalFriendPgContent.backgroundOpacity / 100,
      };
    },
    navLinksVisibility() {
      let css = {};
      if ((this.imageIndex == null) & (this.videoIndex == null)) {
        css.visibility = 'visible';
        css.opacity = 1;
      } else {
        css.visibility = 'hidden';
        css.opacity = 0;
      }
      return css;
    },
  },

  async mounted() {
    const musicalFriendPgContent = await queryContent(
      'musical-journey/friends',
      this.$route.params._slug
    ).findOne();
    this.musicalFriendPgContent = musicalFriendPgContent;

    console.log({ musicalFriendPgContent });

    const musicalFriendsContent = await queryContent(
      'musical-journey/musical-friends'
    ).findOne();
    this.musicalFriendsContent = musicalFriendsContent;

    this.updateWindowDims();
    window.addEventListener('resize', () => this.updateWindowDims());
    window.addEventListener('orientationchange', () => this.updateWindowDims());
  },

  methods: {
    mediaItemClick(mediaItem, index) {
      if (
        mediaItem.mediaType == 'images' ||
        mediaItem.mediaType == 'videos' ||
        mediaItem.mediaType == 'audio'
      ) {
        this.mediaItemIndex = index;
        if (mediaItem.galleries.length == 1) {
          this.galleryIndex = 0;
          this.setMediaIndexToZero(mediaItem.mediaType);
        } else {
          this.$scrollTo('#mediaItemImg' + index, 500);
        }
      }
    },
    setMediaIndexToZero(mediaType) {
      if (mediaType == 'images') {
        this.imageIndex = 0;
      }
      if (mediaType == 'videos') {
        this.videoIndex = 0;
      }
      if (mediaType == 'audio') {
        this.audioIndex = 0;
      }
    },
    updateWindowDims() {
      const iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // ref: https://stackoverflow.com/a/39345914
      this.windowWidth = iOS ? screen.width : window.innerWidth;
      this.windowHeight = iOS ? screen.height : window.innerHeight;
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../../../assets/fonts/nhaasgrotesktxpro-55rg.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding: 0;
  overflow: hidden; /* added for pseudo-element */
  position: relative; /* added for pseudo-element */
}

/* To fix poor scroll speed using "background-size: cover" and "background-attachment: fixed"
Ref: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/ */
.background::before {
  content: ' ';
  position: fixed; /* instead of background-attachment */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  background: var(--backgroundImg) no-repeat center center;
  background-size: cover;
  will-change: transform; /* creates a new paint layer */
  z-index: -1;
  opacity: var(--backgroundOpacity);
}

.navLinksContainer,
.backToMenuContainer {
  opacity: 1;
  transition: opacity 0.5s linear 1s;
}
.nav_link {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 39px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  margin: 0px;
  padding: 0px;
}
#nav_prev,
#nav_previous {
  position: fixed;
  top: 44%;
  left: 5%;
  text-align: left;
}
#nav_prev {
  display: none;
}
#nav_next {
  position: fixed;
  top: 44%;
  right: 5%;
  text-align: right;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.main-col {
  max-width: 903px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
}

.heading {
  color: #ffffff;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-size: 42px;
  font-style: normal;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  letter-spacing: 2px;
  line-height: 50px;
  margin: 0px;
  padding: 0px;
}
.headingMain {
  display: inline;
}
.headingMobile {
  display: none;
  text-align: center;
  padding-top: 36px;
}

#mainContent {
  color: #ffffff;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 32px;
  text-align: justify;
  // text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */,1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;  // NOTE: DISABLED AS THIS CAUSES A SEVERE PERFORMANCE HIT
}

.mediaItems {
  display: inline-block;
  max-width: 295px;
}
.mediaItems:hover,
.mediaItems:hover .mediaItemsLabel {
  color: #eed047;
  cursor: pointer;
}
.mediaItemsImg {
  max-width: 275px;
  height: 193px;
}
.mediaItems:focus {
  outline: none; // remove blue border in iOS Chrome
}
.mediaItemsText {
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.16);
  margin: 0px;
  padding: 0px;
}
.mediaItemsLabel {
  color: white;
  font-size: 20px;
  line-height: 30px;
}
.galleriesLabel {
  color: #ececec;
  font-size: 17px;
  line-height: 30px;
}
.galleriesLabel:hover {
  color: #2cace4;
  cursor: pointer;
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
.page-leave-to {
  opacity: 0;
}
.page-enter-to,
.page-leave {
  opacity: 1;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .navLinksContainer {
    display: none;
  }
  .main-col,
  .galleriesContainer {
    max-width: 100%;
  }
  .nav_link,
  .heading {
    font-size: 6vw;
    line-height: 6vw;
  }
  .headingMain {
    display: none;
  }
  .wrapper {
    overflow-y: hidden;
    height: 100vh;
  }
  .mainContainer {
    overflow-y: scroll;
  }
  header {
    display: flex;

    .headerNavCol,
    .headerTextCol {
      align-self: flex-end;
    }
    #nav_prev,
    #nav_next {
      display: block;
      position: relative;
      padding-top: 84px;
    }
  }
  .headingMobile {
    display: flex;
    line-height: initial;
    justify-content: center;
    white-space: pre-wrap;
  }
  #mainContent {
    font-size: 15px;
    line-height: 24px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 100%;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
}
@media only screen and (max-width: 355px) {
  /* e.g. for iPhone 5 etc. */
  .heading {
    font-size: 27px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .navLinksContainer {
    display: none;
  }
  .main-col,
  .galleriesContainer {
    max-width: 100%;
  }
  .nav_link,
  .heading {
    font-size: 31.5px;
    line-height: initial;
  }
  .headingMain {
    display: none;
  }
  .wrapper {
    overflow-y: hidden;
    height: 100vh;
  }
  .mainContainer {
    overflow-y: scroll;
  }
  header {
    display: flex;
    .headerNavCol,
    .headerTextCol {
      align-self: flex-end;
    }
    #nav_prev,
    #nav_next {
      display: block;
      position: relative;
      padding-top: 84px;
    }
  }
  .headingMobile {
    display: flex;
    line-height: initial;
    justify-content: center;
    white-space: pre-wrap;
  }
  #mainContent {
    font-size: 17.5px;
    line-height: 28px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 50%;
    width: auto;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .main-col,
  .galleriesContainer {
    max-width: 61.46%;
  }
  .heading {
    font-size: 36.75px;
  }
  #mainContent {
    font-size: 17.5px;
    line-height: 28px;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
  .galleries {
    min-width: 50%;
    width: auto;
  }
  .galleriesImg {
    max-width: 100%;
    height: auto;
  }
  .nav_link_small img {
    height: 30px;
    max-height: 3.65vw;
    width: auto;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .main-col,
  .galleriesContainer {
    max-width: 61.46%;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
}

/* Special */
@media only screen and (max-width: 1299.98px) {
  #nav_previous {
    display: none;
  }
  #nav_prev {
    display: block;
  }
}

/* Special - Larger devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1390.98px) {
  .main-col,
  .galleriesContainer {
    max-width: 61.46%;
  }
  .galleriesContainer {
    padding: 4px 0 20px 0;
  }
}
</style>

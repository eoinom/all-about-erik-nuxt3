<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <div class="outerContainer">
        <v-container fluid class="mainContainer mb-4 pb-12 px-1 scroll">
          <!-- VIDEOS -->
          <v-row no-gutters justify="center" id="videos">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(video, index) in videos"
              :key="video.title"
              class="mb-2 mb-sm-4 px-2 px-sm-1"
              @click="
                videoIndex = index;
                setStorage();
              "
              data-testid="video-container"
            >
              <VideoThumbnailTravels :video="video" :preload="index < 4" />
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid class="mainContainer mb-4 pb-12 px-1 scroll">
          <!-- VIDEOS -->
          <v-row no-gutters justify="center" id="videos">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(video, index) in videos"
              :key="video.title"
              class="mb-2 mb-sm-4 px-2 px-sm-1"
              @click="
                videoIndex = index;
                setStorage();
              "
              data-testid="video-container"
            >
              <VideoThumbnailTravels :video="video" :preload="index < 4" />
            </v-col>
          </v-row>
        </v-container>
      </div>

      <VideoLightBox
        :videos="videos"
        :index="videoIndex"
        :disable-scroll="true"
        @close="videoIndex = null"
      />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      travelsPgContent: {},
      videoIndex: null
    };
  },

  computed: {
    pageTitle() {
      return this.travelsPgContent.pageTitle;
    },
    videos() {
      return this.travelsPgContent.videos;
    }
  },

  async mounted() {
    const travelsPgContent = await queryContent("travels").findOne();
    this.travelsPgContent = travelsPgContent;
  }
};
</script>

<script setup>
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://player.vimeo.com/"
    },
    {
      rel: "dns-prefetch",
      href: "https://player.vimeo.com/"
    },
    {
      rel: "preload",
      href:
        "https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580641705/Travels/bamyan-banner_kxakxq.jpg",
      as: "image",
      fetchpriority: "high",
      crossorigin: true
    },
    {
      rel: "preload",
      href:
        "https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580641704/Travels/travels_rcl4mu.png",
      as: "image",
      fetchpriority: "high",
      crossorigin: true
    },
    {
      rel: "preload",
      href:
        "https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1684874213/Travels/abu-dhabi.jpg",
      as: "image",
      fetchpriority: "high",
      crossorigin: true
    }
  ]
});
</script>

<style scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-65md.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
}

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

.outerContainer {
  height: 50%;
  overflow-y: hidden;
}

.mainContainer {
  width: 100%;
  max-width: 2178px;
  padding: 0;
  text-align: center;
}

.scroll {
  animation: scrollAnimation 30s infinite linear;
}

@keyframes scrollAnimation {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
}
</style>

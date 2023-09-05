<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <v-container class="main-col pt-12">
        <div style="text-align: center">
          <h1 class="heading">{{ title }}</h1>
        </div>

        <div class="my-6">
          <button
            class="playAllBtn"
            @click="onPlayAllClick()"
            data-testid="play-all"
          >
            {{ playBtnText }}
          </button>
        </div>

        <div
          v-for="(track, index) in tracks"
          :key="index"
          class="mb-4"
          data-testid="track-container"
        >
          <v-row
            v-if="index % 2 === 0"
            justify="end"
            align="center"
          >
            <v-col>
              <p class="trackTitle textAlignEnd">{{ track.title }}</p>
            </v-col>
          </v-row>

          <v-row
            v-else
            justify="start"
            align="center"
          >
            <v-col>
              <p class="trackTitle">{{ track.title }}</p>
            </v-col>
          </v-row>

          <AudioPlayer
            :ref="'unzSong-' + index"
            :src="track.url"
            secondaryColor="#E7413F"
            padding="5px 0px"
          />

          <hr class="style-two" />
        </div>

        <v-row
          justify="center"
          class="text-center"
        >
          <v-col>
            <NuxtLink
              to="/musical-journey/musical-friends/eduardo-unz"
              class="nav_link py-4"
              >BACK TO UNZ</NuxtLink
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </router-view>
</template>

<script>
import { EventBus } from '../../../../composables/event-bus';

export default {
  data: () => ({
    eduardoUnzMusicPgContent: {},
    playingAll: false,
    playingIndex: null,
  }),

  computed: {
    pageTitle() {
      return this.eduardoUnzMusicPgContent.pageTitle;
    },
    title() {
      return this.eduardoUnzMusicPgContent.titleText;
    },
    tracks() {
      return this.eduardoUnzMusicPgContent.tracks;
    },
    playBtnText() {
      return this.playingAll ? 'Stop' : 'Play All';
    },
  },

  async mounted() {
    const eduardoUnzMusicPgContent = await queryContent(
      'musical-journey/eduardo-unz-music'
    ).findOne();
    this.eduardoUnzMusicPgContent = eduardoUnzMusicPgContent;

    EventBus.$on('audioEnded', this.eventBusListener);
  },

  methods: {
    onPlayAllClick() {
      if (!this.playingAll) {
        this.playAll();
      } else {
        this.$refs[`unzSong-${this.playingIndex}`][0].stop();
        this.playingAll = false;
        this.playingIndex = null;
      }
    },
    playAll() {
      this.playingAll = true;
      this.playingIndex = 0;
      this.$refs[`unzSong-${this.playingIndex}`][0].play();
    },
    eventBusListener() {
      if (this.playingAll) {
        this.playingIndex++;
        if (this.playingIndex >= this.tracks.length) {
          this.playingAll = false;
          this.playingIndex = null;
        } else {
          this.$refs[`unzSong-${this.playingIndex}`][0].play();
        }
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro75Bd;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../../../../assets/fonts/nhaasgrotesktxpro-75bd.ttf') format('ttf');
  font-weight: normal;
}

.main-col {
  padding: 0 0;
  max-width: 915px;
}

.heading {
  color: white;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-size: 3.125rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 20px 0;
}

.playAllBtn {
  background-color: #dc3545;
  color: #fff;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
}

.playAllBtn:hover {
  background-color: #c82333;
}

.trackTitle {
  color: #e7413f;
  font-family: 'NeueHaasGroteskText Pro75Bd';
  font-feature-settings: 'liga';
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0;
}

.textAlignEnd {
  text-align: end;
}

hr.style-two {
  /* https://css-tricks.com/examples/hrs/ */
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(231, 65, 63, 0.1),
    rgba(231, 65, 63, 0.75),
    rgba(231, 65, 63, 0.1)
  );
}

.hideOnMobile {
  display: block;
}
.showOnMobile {
  display: none;
}

.nav_link {
  color: white;
  display: block;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  font-style: italic;
  font-size: 2rem;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(28, 16, 23, 0.83);
  margin: 0px;
  padding: 0px;
}
.nav_link:hover {
  color: #eed047;
  cursor: pointer;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .heading {
    font-size: 2.5rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle,
  .nav_link {
    font-size: 1.5rem;
  }
  .hideOnMobile {
    display: none;
  }
  .showOnMobile {
    display: block;
  }
}

@media only screen and (max-width: 340px) {
  /* for iPhone 5 etc. */
  .heading {
    font-size: 2rem;
    letter-spacing: 1.6px;
    margin: 0 0 10px 0;
  }
  .trackTitle {
    font-size: 1.25rem;
  }
  .nav_link {
    font-size: 1.375rem;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .heading {
    font-size: 2.8rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle,
  .nav_link {
    font-size: 1.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .heading {
    font-size: 3rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle,
  .nav_link {
    font-size: 1.75rem;
  }
}
</style>

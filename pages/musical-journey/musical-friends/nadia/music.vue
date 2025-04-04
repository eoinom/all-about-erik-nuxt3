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

        <div class="mt-6">
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
            <v-col class="pr-2">
              <p class="trackTitle textAlignEnd">{{ track.title }}</p>
              <p class="trackCaption textAlignEnd hideOnMobile">
                {{ track.caption }}
              </p>
            </v-col>
            <v-col
              cols="auto"
              class="pl-2"
            >
              <img
                :src="track.image"
                class="trackImg my-4"
              />
            </v-col>
            <v-col
              cols="12"
              class="pr-6"
            >
              <p class="trackCaption textAlignEnd showOnMobile">
                {{ track.caption }}
              </p>
            </v-col>
          </v-row>

          <v-row
            v-else
            justify="start"
            align="center"
          >
            <v-col
              cols="auto"
              class="pr-2"
            >
              <img
                :src="track.image"
                class="trackImg my-4"
              />
            </v-col>
            <v-col class="pl-2">
              <p class="trackTitle">{{ track.title }}</p>
              <p class="trackCaption hideOnMobile">{{ track.caption }}</p>
            </v-col>
            <v-col
              cols="12"
              class="pl-6"
            >
              <p class="trackCaption showOnMobile">{{ track.caption }}</p>
            </v-col>
          </v-row>

          <AudioPlayer
            :ref="'nadiaSong-' + index"
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
              to="/musical-journey/musical-friends/nadia"
              class="nav_link py-4"
              >BACK TO NADIA</NuxtLink
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
    nadiaMusicPgContent: {},
    playingAll: false,
    playingIndex: null,
  }),

  computed: {
    pageTitle() {
      return this.nadiaMusicPgContent.pageTitle;
    },
    title() {
      return this.nadiaMusicPgContent.titleText;
    },
    tracks() {
      return this.nadiaMusicPgContent.tracks;
    },
    playBtnText() {
      return this.playingAll ? 'Stop' : 'Play All';
    },
  },

  async mounted() {
    const nadiaMusicPgContent = await queryContent(
      'musical-journey/nadia-music'
    ).findOne();
    this.nadiaMusicPgContent = nadiaMusicPgContent;

    EventBus.$on('audioEnded', this.eventBusListener);
  },

  methods: {
    onPlayAllClick() {
      if (!this.playingAll) {
        this.playAll();
      } else {
        this.$refs[`nadiaSong-${this.playingIndex}`][0].stop();
        this.playingAll = false;
        this.playingIndex = null;
      }
    },
    playAll() {
      this.playingAll = true;
      this.playingIndex = 0;
      this.$refs[`nadiaSong-${this.playingIndex}`][0].play();
    },
    eventBusListener() {
      if (this.playingAll) {
        this.playingIndex++;
        if (this.playingIndex >= this.tracks.length) {
          this.playingAll = false;
          this.playingIndex = null;
        } else {
          this.$refs[`nadiaSong-${this.playingIndex}`][0].play();
        }
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../../../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}
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
  font-size: 2.625rem;
  font-weight: 400;
  margin-bottom: 0;
}

.trackCaption {
  color: #cecece;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
}

.trackImg {
  max-height: 86px;
  display: block;
  /* max-width: 30%; */
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
  font-size: 2.4375rem;
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
    font-size: 2.8rem;
    letter-spacing: 1.8px;
    margin: 0 0 15px 0;
  }
  .trackTitle {
    font-size: 1.8rem;
  }
  .trackCaption {
    font-size: 0.9rem;
  }
  .hideOnMobile {
    display: none;
  }
  .showOnMobile {
    display: block;
  }
  .nav_link {
    font-size: 1.7rem;
  }
}

@media only screen and (max-width: 340px) {
  /* for iPhone 5 etc. */
  .heading {
    font-size: 2.25rem;
    letter-spacing: 1.6px;
    margin: 0 0 10px 0;
  }
  .trackTitle,
  .nav_link {
    font-size: 1.5rem;
  }
  .trackCaption {
    font-size: 0.8rem;
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
    font-size: 2rem;
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
    font-size: 2.25rem;
  }
}
</style>

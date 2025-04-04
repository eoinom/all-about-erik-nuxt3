<template>
  <div class="videoThumbnailContainer">
    <div>
      <img
        :alt="video.title"
        v-if="video.thumbnailImg != null"
        :src="video.thumbnailImg"
        class="thumbnailImg"
      />
    </div>

    <div class="thumbnailImgTextOverlay">
      <div class="showOnHover">
        <h4 class="videoTitle mb-1 mb-sm-2 mb-lg-6">{{ video.title }}</h4>
        <span
          class="videoSubText"
          :class="video.subText.length > 60 ? 'hideText' : ''"
        >
          {{ video.subText }}
        </span>
      </div>
    </div>

    <v-container
      fluid
      class="durationBanner py-0"
    >
      <v-row
        align="center"
        class="h-100 my-0"
      >
        <v-col class="py-0">
          <span
            v-if="video.duration != null"
            class="videoDurationText"
          >
            {{ durationInMinsText(video.duration) }}
          </span>
          <br />
          <img
            alt="Play symbol"
            src="../assets/images/playarrowcircle-black.png"
            class="thumbnailPlayVideoImg"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'VideoThumbnailShortFilms',

  props: {
    video: {
      type: Object,
    },
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60);
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60);
        mins = mins - hrs * 60;
        if (mins < 10) mins = '0' + mins;
        if (hrs == 1) return '1 hr ' + mins + ' min';
        else return hrs + ' hrs ' + mins + ' min';
      } else {
        secs = secs - mins * 60;
        if (secs < 10) secs = '0' + secs;
        return mins + ':' + secs + ' min';
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../assets/fonts/nhaasgrotesktxpro-65md.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.videoThumbnailContainer {
  position: relative;
  cursor: pointer;
}

.thumbnailImg {
  width: 100%;
  max-width: 100%;
  height: auto;
  position: relative;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.thumbnailImgTextOverlay {
  color: #ffffff;
  position: absolute;
  text-align: center;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}

.videoTitle {
  font-family: 'Open Sans Condensed', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 300;
  font-size: 1.875rem;
  line-height: 1.875rem;
  letter-spacing: 9px;
  text-transform: uppercase;
}

.videoSubText {
  display: inline-block;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.4375rem;
  letter-spacing: 1px;
}

.durationBanner {
  color: black;
  background-color: white;
  width: 100%;
  height: 0;
  position: absolute;
  bottom: 0;
  font-size: 14px;
  transition: all 0.3s ease-in 0.2s;
}

.videoDurationText {
  display: inline;
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 1rem;
}

.thumbnailPlayVideoImg {
  width: 14.14%;
  min-width: 25px;
  max-width: 40px;
  height: auto;
  position: relative;
  padding-bottom: 6px;
}

.showOnHover {
  display: block;
  opacity: 0;
  transition: all 0.3s ease-in 0.2s;
}
.videoThumbnailContainer:hover .showOnHover {
  opacity: 1;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 0.5;
}
.videoThumbnailContainer:hover .durationBanner {
  height: 25%;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .videoTitle {
    font-size: 5vw;
    line-height: 5vw;
    letter-spacing: 7px;
  }
  .videoSubText {
    font-size: 13px;
    line-height: 13px;
    margin-bottom: 8px;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    font-size: 3.5vw;
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 30% !important;
  }
  .hideText {
    display: none;
  }
}
@media only screen and (max-width: 370px) {
  .durationBanner {
    padding: 1px 0px !important;
  }
}
@media only screen and (max-width: 350px) {
  .durationBanner {
    height: 32% !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .videoTitle {
    font-size: 4vw;
    line-height: 4vw;
    letter-spacing: 7px;
  }
  .videoSubText {
    font-size: 2vw;
    line-height: 2vw;
    margin-bottom: 24px;
  }
  .thumbnailImgOverlay {
    display: inline;
  }
  .thumbnailImgOverlay .videoDurationText {
    font-size: 3vw;
  }
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 28% !important;
  }
  .hideText {
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .durationBanner {
    height: 25% !important;
  }
  .hideText {
    display: none;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1349.98px) {
  .hideText {
    display: none;
  }
}
</style>

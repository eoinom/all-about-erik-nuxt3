<template>
  <transition name="fade">
    <div
      v-if="typeof index === 'number'"
      class="video-lightbox"
      @touchstart.passive="touchstartHandler"
      @touchmove.passive="touchmoveHandler"
      @touchend.passive="touchendHandler"
    >
      <div
        class="video-lightbox__modal"
        :style="`background: ${background}`"
      >
        <div :class="['video-lightbox__spinner', !isVideoLoaded || 'hide']">
          <div
            class="video-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
          <div
            class="video-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
          <div
            class="video-lightbox__dot"
            :style="`border-color: ${interfaceColor}`"
          />
        </div>
        <div class="video-lightbox__container">
          <ul class="video-lightbox__content">
            <li
              v-for="(video, videoIndex) in formattedVideos"
              :key="videoIndex"
              :style="`transform: translate3d(${
                currentIndex * -100
              }%, 0px, 0px);`"
              class="video-lightbox__video-container"
            >
              <div
                class="video-lightbox__video"
                :style="videoContainerCss"
              >
                <div style="width: 100%; height: 100%; position: relative">
                  <iframe
                    :src="
                      videos[videoIndex].url +
                      (isVimeoUrl(videos[videoIndex].url)
                        ? '?autoplay=0&color=505050&title=0&byline=0&portrait=0'
                        : '')
                    "
                    style="width: 100%; height: 100%"
                    frameborder="0"
                    webkitallowfullscreen
                    mozallowfullscreen
                    allowfullscreen
                    :ref="`lg-vid-${videoIndex}`"
                    @load="videoLoaded($event, videoIndex)"
                    class="videoFrame"
                    :id="'video_' + videoIndex"
                  >
                  </iframe>
                </div>

                <div
                  v-show="(video.caption || video.title) && isVideoLoaded"
                  class="video-lightbox__text"
                  :style="videoTitleCss"
                >
                  {{ video.caption || video.title }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          id="leftArrowContainer"
          v-if="currentIndex > 0"
          @click="prev()"
        >
          <img
            alt="Left arrow, click for previous video"
            src="../assets/images/arrow-left.png"
            id="prevVideoImg"
            class="video-lightbox__prev arrowImg"
          />
          <img
            alt="Left arrow, click for previous video"
            src="../assets/images/arrow-left-hover.png"
            id="prevVideoImg-hover"
            class="video-lightbox__prev arrowImg"
          />
        </div>

        <div
          id="rightArrowContainer"
          v-if="currentIndex + 1 < videos.length"
          @click="next()"
        >
          <img
            alt="Right arrow, click for next video"
            src="../assets/images/arrow-right.png"
            id="nextVideoImg"
            class="video-lightbox__next arrowImg"
          />
          <img
            alt="Right arrow, click for next video"
            src="../assets/images/arrow-right-hover.png"
            id="nextVideoImg-hover"
            class="video-lightbox__next arrowImg"
          />
        </div>

        <div
          id="closeImgContainer"
          @click="close()"
        >
          <img
            alt="Close icon, click to close lightbox"
            src="../assets/images/lightbox-close.png"
            id="closeImg"
            class="video-lightbox__close"
          />
          <img
            alt="Close icon, click to close lightbox"
            src="../assets/images/lightbox-close-hover.png"
            id="closeImg-hover"
            class="video-lightbox__close"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Player from '@vimeo/player';
import { EventBus } from '../composables/event-bus';

const keyMap = {
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
};

export default {
  props: {
    videos: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 1,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.9)',
    },
    interfaceColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.8)',
    },
    titlePosition: {
      type: String,
      default: 'left',
    },
  },

  data() {
    return {
      currentIndex: this.index,
      isVideoLoaded: false,
      bodyOverflowStyle: '',
      touch: {
        count: 0,
        x: 0,
        y: 0,
        multitouch: false,
        flag: false,
      },
      windowWidth: 0,
      windowHeight: 0,
    };
  },

  computed: {
    formattedVideos() {
      return this.videos.map((video) =>
        typeof video === 'string' ? { url: video } : video
      );
    },
    videoContainerCss() {
      let css = {};
      css.width = 0.8 * this.windowWidth + 'px';
      css.height = 0.8 * this.windowHeight + 'px';
      return css;
    },
    containerWidth() {
      return 0.8 * this.windowWidth;
    },
    containerHeight() {
      return 0.8 * this.windowHeight;
    },
    containerAspectRatio() {
      return this.containerWidth / this.containerHeight;
    },
    videoAspectRatio() {
      if (
        this.formattedVideos[this.currentIndex].hasOwnProperty('width') &&
        this.formattedVideos[this.currentIndex].width > 0 &&
        this.formattedVideos[this.currentIndex].hasOwnProperty('height') &&
        this.formattedVideos[this.currentIndex].height > 0
      ) {
        return (
          this.formattedVideos[this.currentIndex].width /
          this.formattedVideos[this.currentIndex].height
        );
      } else {
        return 1502.22 / 845.0;
      }
    },
    heightGoverns() {
      return this.containerAspectRatio >= this.videoAspectRatio;
    },
    actualVidHeight() {
      return this.heightGoverns
        ? this.containerHeight
        : this.containerWidth / this.videoAspectRatio;
    },
    actualVidWidth() {
      return this.heightGoverns
        ? this.containerHeight * this.videoAspectRatio
        : this.containerWidth;
    },
    videoTitleCss() {
      let css = {};
      css.padding = 0;
      css.bottom =
        (this.containerHeight - this.actualVidHeight) / 2 - 40 + 'px';
      css.width = '100%';
      css.textAlign = this.titlePosition;
      return css;
    },
  },

  watch: {
    index(val) {
      if (!document) return;
      this.currentIndex = val;
      if (this.disableScroll && typeof val === 'number') {
        document.body.style.overflow = 'hidden';
      } else if (this.disableScroll && !val) {
        document.body.style.overflow = this.bodyOverflowStyle;
      }
    },
    currentIndex(val) {
      this.setVideoLoaded(val);
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
      });
    });

    if (!document) return;
    this.bodyOverflowStyle = document.body.style.overflow;
    this.bindEvents();
  },

  beforeUnmount() {
    if (!document) return;
    if (this.disableScroll) {
      document.body.style.overflow = this.bodyOverflowStyle;
    }
    this.unbindEvents();
  },

  methods: {
    close() {
      this.$emit('close');
    },
    prev() {
      if (this.currentIndex === 0) return;
      this.pauseVideo(this.currentIndex);
      this.currentIndex -= 1;
      this.$emit('slide', { index: this.currentIndex });
    },
    next() {
      if (this.currentIndex === this.videos.length - 1) return;
      this.pauseVideo(this.currentIndex);
      this.currentIndex += 1;
      this.$emit('slide', { index: this.currentIndex });
    },
    pauseVideo(index) {
      const iframe = document.querySelector(`iframe#video_${index}`);
      if (iframe == null) {
        console.error('Cannot pause video as video iframe not found');
        return;
      }
      if (iframe.src.includes('vimeo')) {
        const player = new Player(iframe);
        player.pause();
      } else {
        console.error('Cannot pause video as src is not from vimeo');
      }
    },
    stopVideo(index) {
      var iframe = document.getElementById('video_' + index);
      if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
    },
    videoLoaded($event, videoIndex) {
      EventBus.$emit('lightboxMediaLoaded'); // used to mute page background music
      const { target } = $event;
      target.classList.add('loaded');
      if (videoIndex === this.currentIndex) {
        this.setVideoLoaded(videoIndex);
      }
    },
    getVideoElByIndex(index) {
      const elements = this.$refs[`lg-vid-${index}`] || [];
      return elements[0];
    },
    setVideoLoaded(index) {
      const el = this.getVideoElByIndex(index);
      this.isVideoLoaded = !el ? false : el.classList.contains('loaded');
    },
    shouldPreload(index) {
      const el = this.getVideoElByIndex(index) || {};
      const { src } = el;
      return (
        !!src ||
        index === this.currentIndex ||
        index === this.currentIndex - 1 ||
        index === this.currentIndex + 1
      );
    },
    isVimeoUrl(url) {
      return url.includes('player.vimeo.com');
    },
    bindEvents() {
      document.addEventListener('keydown', this.keyDownHandler, false);
    },
    unbindEvents() {
      document.removeEventListener('keydown', this.keyDownHandler, false);
    },
    touchstartHandler(event) {
      this.touch.count += 1;
      if (this.touch.count > 1) {
        this.touch.multitouch = true;
      }
      this.touch.x = event.changedTouches[0].pageX;
      this.touch.y = event.changedTouches[0].pageY;
    },
    touchmoveHandler(event) {
      if (this.touch.flag || this.touch.multitouch) return;
      const touchEvent = event.touches[0] || event.changedTouches[0];
      if (touchEvent.pageX - this.touch.x > 40) {
        this.touch.flag = true;
        this.prev();
      } else if (touchEvent.pageX - this.touch.x < -40) {
        this.touch.flag = true;
        this.next();
      }
    },
    touchendHandler() {
      this.touch.count -= 1;
      if (this.touch.count <= 0) {
        this.touch.multitouch = false;
      }
      this.touch.flag = false;
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.LEFT:
          this.prev();
          break;
        case keyMap.RIGHT:
          this.next();
          break;
        case keyMap.ESC:
          this.close();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../assets/fonts/nhaasgrotesktxpro-55rg.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.video-lightbox {
  &__modal {
    position: fixed;
    display: block;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &__content {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  &__container {
    position: absolute;
    z-index: 1002;
    display: block;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  &__video-container {
    display: inline-table;
    vertical-align: middle;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: left 0.4s ease, transform 0.4s ease, -webkit-transform 0.4s ease;
  }
  &__video {
    & {
      display: inline-block;
      position: relative;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100vh;
    }
    & .videoFrame {
      & {
        max-width: 100%;
        max-height: 100vh;
        opacity: 0;
        transition: opacity 0.2s;
      }
      &.loaded {
        opacity: 1;
      }
    }
  }
  &__text {
    position: absolute;
    z-index: 1000;
    display: block;
    margin: 0 auto;
    box-sizing: border-box;

    color: #ffffff;
    font-family: 'NeueHaasGroteskText Pro55', sans-serif;
    font-feature-settings: 'liga';
    font-size: 1.3125rem; /* 21px with 16px default size */
    font-weight: 400;
    letter-spacing: 5px;
    text-transform: uppercase;
    text-rendering: auto;
    // transition: all  .5s ease .0s;
    line-height: 1.3125rem; /* 21px with 16px default size */
    white-space: normal;
    // see videoTitleCss() in computed for further properties
  }
  &__next,
  &__prev,
  &__close {
    position: absolute;
    z-index: 1002;
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    cursor: pointer;
  }
  &__next {
    top: 50%;
    transform: translate(0, -50%);
    right: 8.5%;
    vertical-align: middle;
  }
  &__prev {
    top: 50%;
    transform: translate(0, -50%);
    left: 8.5%;
  }
  &__close {
    top: 40px;
    right: 60px;
  }
  &__spinner {
    & {
      position: absolute;
      z-index: 1003;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      display: block;
      height: 15px;
      width: auto;
      box-sizing: border-box;
      text-align: center;
    }
    &.hide {
      display: none;
    }
  }
  &__dot {
    & {
      float: left;
      margin: 0 calc(15px / 2);
      width: 15px;
      height: 15px;
      border: calc(15px / 5) solid rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      transform: scale(0);
      box-sizing: border-box;
      animation: spinner-animation 1000ms ease infinite 0ms;
    }
    &:nth-child(1) {
      animation-delay: calc(300ms * 1);
    }
    &:nth-child(2) {
      animation-delay: calc(300ms * 2);
    }
    &:nth-child(3) {
      animation-delay: calc(300ms * 3);
    }
  }
}
// transition fade on opening / closing of lightbox
.fade-enter-active,
.fade-leave-active {
  position: fixed;
  z-index: 1000;
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  position: fixed;
  opacity: 0;
  z-index: 1000;
}
@keyframes spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.arrowImg {
  width: 7%;
  max-width: 26px;
  min-width: 15px;
  padding: 0;
}
#prevVideoImg-hover,
#leftArrowContainer:hover #prevVideoImg {
  display: none;
}
#leftArrowContainer:hover #prevVideoImg-hover {
  display: inline;
}

#nextVideoImg-hover,
#rightArrowContainer:hover #nextVideoImg {
  display: none;
}
#rightArrowContainer:hover #nextVideoImg-hover {
  display: inline;
}

#closeImg,
#closeImg-hover {
  width: 7%;
  max-width: 38px;
  min-width: 15px;
  padding: 0;
}
#closeImgContainer #closeImg-hover {
  display: none;
}
#closeImgContainer:hover #closeImg-hover {
  display: inline;
}
#closeImgContainer:hover #closeImg {
  display: none;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .video-lightbox {
    &__text {
      font-size: 0.8125rem; /* 13px with 16px default size */
    }
    &__next {
      right: 1.5%;
    }
    &__prev {
      left: 1.5%;
    }
    &__close {
      top: 10px;
      right: 20px;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .video-lightbox {
    &__text {
      font-size: 0.9375rem; /* 15px with 16px default size */
    }
    &__next {
      right: 3%;
    }
    &__prev {
      left: 3%;
    }
    &__close {
      top: 20px;
      right: 30px;
    }
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .video-lightbox {
    &__text {
      font-size: 1.0625rem; /* 17px with 16px default size */
    }
    &__next {
      right: 4.5%;
    }
    &__prev {
      left: 4.5%;
    }
    &__close {
      top: 30px;
      right: 40px;
    }
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .video-lightbox {
    &__text {
      font-size: 1.1875rem; /* 19px with 16px default size */
    }
    &__next {
      right: 6.5%;
    }
    &__prev {
      left: 6.5%;
    }
    &__close {
      top: 40px;
      right: 50px;
    }
  }
}
</style>

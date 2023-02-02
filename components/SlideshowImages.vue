<template>
  <v-carousel
    :cycle="true"
    :interval="interval"
    :show-arrows="false"
    :style="carouselStyles"
    class="carousel"
    hide-delimiters
    :height="carouselHeight"
    ref="carousel"
  >
    <!-- <v-carousel-item
        v-for="(slide, iSlide) in slides"
        :key="iSlide"
        :src="slide.img"
        transition="fade-transition"
        class="carousel-slide"
      >
        <slot name="caption"></slot>
      </v-carousel-item> -->
    <v-carousel-item
      v-for="(slide, iSlide) in slides"
      :key="iSlide"
      transition="new-transition"
      reverse-transition="new-transition"
      class="carousel-slide"
    >
      <!-- transition="fade-transition" -->
      <v-img
        :aspect-ratio="aspectRatio"
        :src="slide.img"
        cover
      ></v-img>
      <slot name="caption"></slot>
    </v-carousel-item>

    <slot></slot>
  </v-carousel>
</template>

<script>
export default {
  name: 'SlideshowImages',

  props: {
    slides: {
      default: () => [],
      type: Array,
    },
    borderRadius: {
      type: String,
      default: '',
    },
    interval: {
      type: Number,
      default: 4000,
    },
    carouselHeight: {
      type: Number,
      default: 500,
    },
    aspectRatio: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      slide: 0,
      sliding: null,
      // windowWidth: 0,
    };
  },

  computed: {
    carouselStyles() {
      if (this.borderRadius != '') {
        return {
          '--borderRadius': this.borderRadius,
        };
      }
    },
    // vignetteStyles() {
    //   return {
    //     '--blur': (0.1*this.windowWidth) + 'px',
    //     '--spread': (0.05*this.windowWidth) + 'px'
    //   }
    // },
  },

  // mounted() {
  //   this.windowWidth = window.innerWidth;

  //   this.$nextTick(() => {
  //     window.addEventListener('resize', () => {
  //       this.windowWidth = window.innerWidth;
  //     });
  //   });
  // },

  methods: {
    pause() {
      this.$refs.carousel.pause();
    },
    start() {
      this.$refs.carousel.start();
    },
    next() {
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    },
    setSlide(index) {
      this.$refs.carousel.setSlide(index);
    },
  },
};
</script>

<style lang="scss">
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

.carousel-caption > p {
  color: #ffffff;
  font-size: 1.875rem;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.65);
  line-height: 43px;
  letter-spacing: 2px;
}

.carousel {
  text-shadow: 1px 1px 2px #333;
  border-radius: var(--borderRadius);
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
.carousel-inner {
  border-radius: var(--borderRadius);
}

.new-transition {
  &-leave-active {
    position: absolute;
  }

  &-enter-active,
  &-leave,
  &-leave-to {
    transition: 100ms; /* here you can define your desired time for transition */
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

/* For vignette effect, see https://benjaminhorn.io/code/proper-lens-vignette-with-css/ & 
  https://codepen.io/beije/pen/zxjeae */
/* .carousel-slide::after {
  content: '';
  position: absolute; */

/* Center element on the middle of it's parent */
/* top: 50%;
  left: 50%;     */

/* Reset back the image so it's center is locked on the center of the parent */
/* transform: translate(-50%,-50%);
  
  width: 115%;
  padding-bottom: 115%;
  
  box-shadow: inset 0px 0px var(--blur) var(--spread) rgba(0,0,0,0.8), inset 0px 0px var(--blur) var(--spread) rgba(0,0,0,0.8);
  border-radius: 50%;
} */
</style>

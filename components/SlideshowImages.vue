<template>
  <v-carousel
    v-model="slideIndex"
    :cycle="cycle"
    :interval="interval"
    :show-arrows="false"
    :style="carouselStyles"
    class="carousel"
    hide-delimiters
    :height="carouselHeight"
    ref="carousel"
  >
    <v-carousel-item
      v-for="(slide, iSlide) in slides"
      :key="iSlide"
      transition="new-transition"
      reverse-transition="new-transition"
      class="carousel-slide"
    >
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
    cycleImages: {
      type: Boolean,
      default: true,
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
      slideIndex: 0,
      cycle: true,
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
  },

  mounted() {
    this.cycle = this.cycleImages;
  },

  methods: {
    pause() {
      this.cycle = false;
    },
    start() {
      this.cycle = true;
    },
    next() {
      if (this.slideIndex >= slides.length - 1) this.slideIndex = 0;
      else this.slideIndex++;
    },
    prev() {
      if (this.slideIndex <= 0) this.slideIndex = slides.length - 1;
      else this.slideIndex--;
    },
    setSlide(index) {
      this.slideIndex = index;
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
</style>

<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="slideshow-container"
    :style="slideshowStyles"
  >
    <img
      v-for="(slide, iSlide) in slides"
      :key="slide.img"
      v-show="iSlide === slideIndex"
      :src="slide.img"
      class="slideshow-image"
    />
  </TransitionGroup>
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
    height: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      slideIndex: 0,
      timer: null,
    };
  },

  computed: {
    slideshowStyles() {
      let css = {};
      css.height = this.height + 'px';
      if (this.borderRadius != '') {
        css['--borderRadius'] = this.borderRadius;
      }
      return css;
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.next();
    }, this.interval);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    next() {
      if (this.slideIndex >= this.slides.length - 1) this.slideIndex = 0;
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

.slideshow-container {
  position: relative;
  overflow: hidden;
}

.slideshow-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--borderRadius);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease-in-out;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

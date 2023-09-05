<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <BackgroundMusic
        :audioFile="earlyProductionsPgContent.bgAudio"
        :audioDuration="earlyProductionsPgContent.bgAudioDuration"
        :audioFadeInDuration="earlyProductionsPgContent.bgAudioFadeInDuration"
        :audioFadeOutDuration="earlyProductionsPgContent.bgAudioFadeOutDuration"
      />

      <header
        id="header"
        :style="headerStyles"
      >
        <img
          :src="titleImg"
          id="titleImg"
          class="my-6"
          data-testid="title-img"
        />
      </header>

      <v-container
        fluid
        id="mainContainer"
        class="mb-12 pb-12 px-2 px-md-6 px-lg-6 px-xl-12"
      >
        <v-row no-gutters>
          <v-col id="mainImgContainer">
            <img
              :src="mainImg"
              id="mainImg"
            />
            <div>
              <ContentRenderer
                :value="earlyProductionsPgContent"
                tag="span"
                id="mainImgText"
                class="mb-4"
              />
            </div>
          </v-col>
        </v-row>

        <!-- LAYOUT FOR PHONES & TABLETS -->
        <div v-if="windowWidth < 992">
          <v-row
            v-for="(section, iSec) in sections"
            :key="'S' + iSec + 1"
            no-gutters
            class="pt-4 pb-2"
            data-testid="production-container"
          >
            <div
              v-if="
                section.textBoxes?.length > 1 || section.productions?.length > 1
              "
              class="sectionContainerDevices"
              :style="sectionContainerDevicesStyles(section.productions[0])"
            >
              <MusicProductionText
                v-for="(textBox, iText) in section.textBoxes"
                :key="'S' + (iSec + 1) + 'T' + (iText + 1)"
                :title="textBox.heading"
                :body="textBox.text"
                :includeBorder="false"
                :divHeight="'fit-content'"
                :divPadding="iText === 0 ? '0' : '12px 0 0 0'"
              />
              <div class="responsiveBtnDiv">
                <button
                  v-for="(lightBox, iLightBox) in section.lightboxes"
                  :key="'S' + (iSec + 1) + 'L' + (iLightBox + 1)"
                  class="lightBoxBtn"
                  @click="lightBoxBtnClick(lightBox)"
                >
                  {{ lightBox.buttonText }}
                </button>
              </div>
              <MusicProduction
                v-for="(production, iProd) in section.productions"
                :key="'S' + (iSec + 1) + 'P' + (iProd + 1)"
                :production="production"
                :showImage="false"
                :showBgImage="false"
                :showTitleCredits="true"
                :showTracks="true"
                :style="iProd > 0 ? 'padding-top: 8px' : ''"
              />
            </div>

            <div
              v-else
              class="sectionContainerDevices"
              :style="sectionContainerDevicesStyles(section.productions[0])"
            >
              <MusicProductionText
                v-for="(textBox, iText) in section.textBoxes"
                :key="'S' + (iSec + 1) + 'T' + (iText + 1) + 'h'"
                :title="textBox.heading"
                :includeBorder="false"
                :divHeight="'fit-content'"
                divPadding="0"
              />
              <MusicProduction
                v-for="(production, iProd) in section.productions"
                :key="'S' + (iSec + 1) + 'P' + (iProd + 1) + 'c'"
                :production="production"
                :showImage="false"
                :showBgImage="false"
                :showTitleCredits="true"
                :showTracks="false"
              />
              <MusicProductionText
                v-for="(textBox, iText) in section.textBoxes"
                :key="'S' + (iSec + 1) + 'T' + (iText + 1) + 'b'"
                :body="textBox.text"
                :includeBorder="false"
                :divHeight="'fit-content'"
                divPadding="0"
                :style="
                  section.lightboxes?.length == 0 ? 'padding-bottom: 8px' : ''
                "
              />
              <div
                v-if="section.lightboxes?.length > 0"
                class="responsiveBtnDiv"
              >
                <button
                  v-for="(lightBox, iLightBox) in section.lightboxes"
                  :key="iLightBox + 1"
                  class="lightBoxBtn"
                  @click="lightBoxBtnClick(lightBox)"
                >
                  {{ lightBox.buttonText }}
                </button>
              </div>
              <MusicProduction
                v-for="(production, iProd) in section.productions"
                :key="'S' + (iSec + 1) + 'P' + (iProd + 1) + 't'"
                :production="production"
                :showImage="false"
                :showBgImage="false"
                :showTitleCredits="false"
                :showTracks="true"
              />
            </div>
          </v-row>
        </div>

        <!-- LAYOUT FOR DESKTOPS -->
        <div v-else>
          <!-- SECTIONS[0] - BOBO THE CHEERLEADER -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[0].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[0].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              style="width: 38.5%; min-width: 444px"
              v-if="sections[0].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[0].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
          </v-row>

          <!-- SECTIONS[1] - SOUND OF SUMMER SHOWERS -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="width: 36.5%; max-width: 410px"
              v-if="sections[1].textBoxes?.length > 0"
              class=""
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[1].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[1].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[1].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>

          <!-- SECTIONS[2] - A LITTLE LOVIN' -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[2].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[2].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              style="width: 38.5%; max-width: 400px"
              v-if="sections[2].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[2].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
          </v-row>

          <!-- SECTIONS[3] - THE SLURP -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              id="theSlurpTextCol"
              v-if="sections[3].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[3].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
                style="height: inherit"
              />
              <div
                v-if="windowWidth >= 1200"
                style="display: flex; justify-content: space-between"
              >
                <button
                  v-for="(lightBox, iLightBox) in sections[3].lightboxes"
                  :key="iLightBox + 1"
                  class="lightBoxBtn"
                  style="margin-right: 0"
                  @click="lightBoxBtnClick(lightBox)"
                >
                  {{ lightBox.buttonText }}
                </button>
              </div>
            </div>
            <div
              style="max-width: 805px; flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[3].productions"
                :key="iProd"
                :production="production"
                :style="iProd == 0 ? 'margin-bottom:5px' : ''"
              />
              <div v-if="windowWidth < 1200">
                <button
                  v-for="(lightBox, iLightBox) in sections[3].lightboxes"
                  :key="iLightBox + 1"
                  class="lightBoxBtn"
                  @click="lightBoxBtnClick(lightBox)"
                >
                  {{ lightBox.buttonText }}
                </button>
              </div>
            </div>
          </v-row>

          <!-- SECTIONS[4] - ROOTY TOOT & WARM BABY -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              id="rootyTootTextBox"
              v-if="sections[4].textBoxes?.length > 0"
            >
              <MusicProductionText
                :title="sections[4].textBoxes[0].heading"
                :body="sections[4].textBoxes[0].text"
                style="height: inherit"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[4].productions"
                :key="iProd"
                :production="production"
              />

              <div
                style="width: 100%; display: flex; flex-direction: row; flex: 1"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    justify-content: space-between;
                  "
                >
                  <button
                    v-for="(lightBox, iLightBox) in sections[4].lightboxes"
                    :key="iLightBox + 1"
                    class="lightBoxBtn"
                    @click="lightBoxBtnClick(lightBox)"
                  >
                    {{ lightBox.buttonText }}
                  </button>
                </div>

                <div
                  id="warmBabyTextBox"
                  v-if="sections[4].textBoxes?.length > 0"
                >
                  <MusicProductionText
                    :title="sections[4].textBoxes[1].heading"
                    :body="sections[4].textBoxes[1].text"
                  />
                </div>
              </div>
            </div>
          </v-row>

          <!-- SECTIONS[5] - CASS, DENNY, JESTER, ZAL -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[5].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[5].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              style="width: 26.4%; min-width: 250px; max-width: 347px"
              v-if="sections[5].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[5].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
                style="height: inherit"
              />
            </div>
          </v-row>

          <!-- SECTIONS[6] - LADY GODIVA' -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="width: 32.3%; min-width: 380px"
              v-if="sections[6].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[6].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[6].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[6].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>

          <!-- SECTIONS[7] - TWEEDLE DUM'S DRIVE-IN -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="max-width: 1095px; flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[7].productions"
                :key="iProd"
                :production="production"
              />
            </div>
            <div
              style="min-width: 200px; position: relative"
              v-if="sections[7].lightboxes?.length > 0"
            >
              <button
                v-for="(lightBox, iLightBox) in sections[7].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                style="position: absolute; bottom: 0; right: 0; margin-right: 0"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>

          <!-- SECTIONS[8] - THE STRANGERS -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="width: 26.75%; max-width: 340px"
              v-if="sections[3].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[8].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
                style="height: inherit"
              />
              <div>
                <button
                  v-for="(lightBox, iLightBox) in sections[8].lightboxes"
                  :key="iLightBox + 1"
                  class="lightBoxBtn"
                  @click="lightBoxBtnClick(lightBox)"
                >
                  {{ lightBox.buttonText }}
                </button>
              </div>
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[8].productions"
                :key="iProd"
                :production="production"
              />
            </div>
          </v-row>

          <!-- SECTIONS[9] - THE SELLOUTS -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="max-width: 805px; flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[9].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[9].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              style="width: 41.2%; min-width: 415px; max-width: 495px"
              v-if="sections[9].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[9].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
          </v-row>

          <!-- SECTIONS[10] - KEN & BOBBY FISCHLER -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="width: 32.11%; min-width: 246px"
              v-if="sections[10].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[10].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[10].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[10].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>

          <!-- SECTIONS[11] - RAY ROE -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="flex: 1"
              class="mr-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[11].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[11].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              style="width: 25.38%; min-width: 246px"
              v-if="sections[11].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[11].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
          </v-row>

          <!-- SECTIONS[12] - KEN MELVILLE -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div
              style="width: 29.13%; min-width: 280px"
              v-if="sections[12].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[12].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[12].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[12].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>

          <!-- SECTIONS[13] - TIM HARDIN -->
          <v-row
            no-gutters
            class="py-6"
            data-testid="production-container"
          >
            <div style="flex: 1">
              <MusicProduction
                v-for="(production, iProd) in sections[13].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[13].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
            <div
              id="timHardinTextBox"
              v-if="sections[13].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[13].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
                style="height: inherit"
              />
            </div>
          </v-row>

          <!-- SECTIONS[14] - PLUMB CREEK BOYS -->
          <v-row
            no-gutters
            class="pt-6 pb-12"
            data-testid="production-container"
          >
            <div
              style="width: 25.5%; min-width: 310px"
              v-if="sections[14].textBoxes?.length > 0"
            >
              <MusicProductionText
                v-for="(textBox, iText) in sections[14].textBoxes"
                :key="iText"
                :title="textBox.heading"
                :body="textBox.text"
                style="height: inherit"
              />
            </div>
            <div
              style="flex: 1"
              class="ml-4"
            >
              <MusicProduction
                v-for="(production, iProd) in sections[14].productions"
                :key="iProd"
                :production="production"
              />
              <button
                v-for="(lightBox, iLightBox) in sections[14].lightboxes"
                :key="iLightBox + 1"
                class="lightBoxBtn"
                @click="lightBoxBtnClick(lightBox)"
              >
                {{ lightBox.buttonText }}
              </button>
            </div>
          </v-row>
        </div>
        <!-- END OF LAYOUT FOR TABLETS & PHONES -->
      </v-container>

      <AudioLightBox
        v-if="audioTracks != null"
        :audios="audioTracks"
        :index="audioIndex"
        :disable-scroll="true"
        :show-caption="true"
        @close="
          audioIndex = null;
          audioTracks = null;
        "
      />

      <ImageLightBox
        :images="image"
        :index="imageIndex"
        :disable-scroll="true"
        @close="
          imageIndex = null;
          image = null;
        "
      />

      <BackToTop />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      earlyProductionsPgContent: {},
      audioIndex: null,
      audioTracks: null,
      imageIndex: null,
      image: null,
      windowWidth: 0.0,
    };
  },

  computed: {
    pageTitle() {
      return this.earlyProductionsPgContent.pageTitle;
    },
    headerBgImg() {
      return this.earlyProductionsPgContent.headerBgImg;
    },
    titleImg() {
      return this.earlyProductionsPgContent.titleImg;
    },
    mainImg() {
      return this.earlyProductionsPgContent.mainImg;
    },
    sections() {
      return this.earlyProductionsPgContent.sections;
    },
    headerStyles() {
      let css = {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
      };
      // css.position = this.windowWidth < 992 ? 'sticky' : 'static'  // to make header sticky for mobiles + tablets
      // css.position = this.windowWidth < 768 ? 'sticky' : 'static'  // to make header sticky for mobiles only
      return css;
    },
  },

  async mounted() {
    const earlyProductionsPgContent = await queryContent(
      'musical-journey/early-productions'
    ).findOne();
    this.earlyProductionsPgContent = earlyProductionsPgContent;

    this.windowWidth = window.innerWidth;

    // this.$nextTick(() => {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
    // })
    window.addEventListener('orientationchange', () => {
      this.windowWidth = window.innerWidth;
    });

    // // Prevents window from moving on touch on older browsers.
    // window.addEventListener('touchmove', function (event) {
    //   event.preventDefault()
    // }, false)

    // // Prevents window from moving on touch on newer browsers.
    // window.addEventListener('touchmove', function (event) {
    //   event.preventDefault()
    // }, {passive: false})

    // // Allows content to move on touch.
    // document.querySelector("body").addEventListener('touchmove', function (event) {
    //   event.stopPropagation()
    // }, false)
  },

  methods: {
    lightBoxBtnClick(lightbox) {
      if (lightbox.image !== '') {
        this.image = [
          {
            img: lightbox.image,
            caption: lightbox.caption,
          },
        ];
        this.imageIndex = 0;
      } else if (lightbox.audio !== '') {
        this.audioTracks = [
          {
            url: lightbox.audio,
            caption: lightbox.caption,
          },
        ];
        this.audioIndex = 0;
      }
    },
    sectionContainerDevicesStyles(production) {
      return {
        '--bgImg': production.bgImg ? 'url("' + production.bgImg + '")' : '',
        '--bgImgPos': production.bgImgPos
          ? production.bgImgPos
          : 'center center',
        '--bgColor': production.bgColor ? production.bgColor : '#000',
        '--bgOpacity': production.bgOpacity ? production.bgOpacity : 0.5,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:700i&display=swap');
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');
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

body {
  overscroll-behavior: contain;
}

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  top: 0;
  width: 100%;
  z-index: 999;
  border: 0px solid black;
  border-bottom-width: 8px;
}

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 1412px;
  padding-top: 0;
  text-align: center;
}

#mainImgContainer {
  position: relative;
}

#mainImg {
  width: 100%;
  height: auto;
}

#mainImgText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.75rem; /* 28px with 16px default size */
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.29);
  line-height: 40px;

  position: absolute;
  bottom: 60px;
  left: 0;
  margin-left: 8%;
  margin-right: 8%;
}

.thumbnailImgContainer {
  max-width: 100%;
}

.thumbnailImg {
  width: 100%;
}

.lightBoxBtn {
  position: relative;
  float: left;
  cursor: pointer;
  pointer-events: auto;

  min-height: 35px;
  margin: 10px 20px 0px 0px;
  padding: 5px 20px;

  background-color: #406689;
  border-width: 0px;
  border-radius: 9px;

  color: #ddcd95;
  font-family: 'Lato', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 700;
  font-style: italic;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;

  transition-delay: 0.1s;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color;
}
.lightBoxBtn:hover {
  background-color: #4b5b45;
}
.lightBoxBtn:focus {
  outline: none; // remove blue border in iOS Chrome
}

.sectionContainerDevices {
  flex: 1;
  position: relative;
  padding: 15px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: #fcfef4;
  border-radius: 9px;
  text-align: left;
}
.sectionContainerDevices:after {
  content: '';
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--bgImg) no-repeat var(--bgImgPos);
  background-color: var(--bgColor);
  background-size: cover;
  opacity: var(--bgOpacity);
  width: 100%;
  height: 100%;
  z-index: -1;
}
.responsiveBtnDiv {
  display: flex;
  margin: 10px 0px 5px 0px;
}

#rootyTootTextBox {
  width: 38.5%;
  max-width: 422px;
}
#warmBabyTextBox {
  width: 75.5%;
  min-width: 458px;
  margin-top: 10px;
}
#theSlurpTextCol {
  width: 38.5%;
  min-width: 483px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#timHardinTextBox {
  width: 22.5%;
  margin-left: 16px;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 55%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 58%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  #mainImgText {
    font-size: calc(
      0.9375rem + 3 * (100vw - 375px) / (576 - 375)
    ); /* varies between 15px (0.9375rem) at 375px viewport width (iPhone 6) and 18px at 576px vw width */
    line-height: calc(
      1.1875rem + 6.6 * (100vw - 375px) / (576 - 375)
    ); /* varies between 19px (1rem) and 25.6px */
    letter-spacing: 1px;
    bottom: 0px;
    margin-left: 3%;
    margin-right: 3%;
  }
  .lightBoxBtn {
    margin: 0;
    font-size: 1rem;
    line-height: 1.1875rem;
  }
  .lightBoxBtn:first-child {
    margin-right: 10px;
  }
}
@media only screen and (max-width: 355px) {
  /* e.g. for iPhone 5 etc. */
  .lightBoxBtn {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.125rem;
    padding: 5px 10px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #titleImg {
    max-width: 63%;
  }
  #mainImgText {
    font-size: calc(
      1.125rem + 3 * (100vw - 576px) / (768 - 576)
    ); /* varies between 18px (1.125rem) and 21px */
    line-height: calc(
      1.6rem + 4.4 * (100vw - 576px) / (768 - 576)
    ); /* varies between 25.6px (1.6rem) and 30px */
    letter-spacing: 1px;
    bottom: 19px;
    margin-left: 6%;
    margin-right: 6%;
  }
  .responsiveBtnDiv {
    display: inline-block;
  }
  .lightBoxBtn {
    margin: 0px 10px 0 0;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  #titleImg {
    max-width: 65%;
  }
  #mainImgText {
    font-size: 1.5rem; /* 19.2px with 16px default size */
    letter-spacing: 1px;
    line-height: 34px;
    bottom: 21px;
    margin-left: 5%;
    margin-right: 5%;
  }
  .responsiveBtnDiv {
    display: inline-block;
  }
  .lightBoxBtn {
    margin: 0px 10px 0 0;
  }
  #rootyTootTextBox {
    width: 31%;
    max-width: 422px;
  }
  #warmBabyTextBox {
    width: 70%;
    min-width: 440px;
  }
  #theSlurpTextCol {
    width: 33%;
    min-width: 363px;
    flex-direction: initial;
  }
  #timHardinTextBox {
    width: 100%;
    margin-left: 0px;
    margin-top: 8px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  #mainImgText {
    font-size: 1.625rem; /* 26px with 16px default size */
    letter-spacing: 1px;
    line-height: 36.5px;
    bottom: 23px;
    margin-left: 6%;
    margin-right: 6%;
  }
  #rootyTootTextBox {
    width: 31%;
    max-width: 422px;
  }
  #warmBabyTextBox {
    width: 70%;
    min-width: 440px;
  }
  #theSlurpTextCol {
    width: 33%;
    min-width: 363px;
    flex-direction: initial;
  }
  #timHardinTextBox {
    width: 100%;
    margin-left: 0px;
    margin-top: 8px;
  }
}
</style>

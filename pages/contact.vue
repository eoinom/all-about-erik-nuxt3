<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <v-container class="main-container">
        <img
          :src="titleImg1Line"
          class="titleImg titleImg1Line py-12"
          data-testid="title-img"
        />
        <img
          :src="titleImg2Lines"
          class="titleImg titleImg2Lines py-6 my-4"
          data-testid="title-img"
        />

        <div
          v-html="mainText"
          class="text-main mb-4"
        />

        <!-- CONTACT FORM -->
        <div class="form-container mb-6 mb-md-12">
          <form
            name="contact"
            method="POST"
            netlify
            data-netlify-honeypot="bot-field"
          >
            <input
              type="hidden"
              name="form-name"
              value="contact"
            />
            <!-- Hidden honeypot field to prevent against bot spam -->

            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
            />

            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
            />

            <label for="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message.."
              style="height: 200px"
            ></textarea>

            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>

        <!-- CREDITS -->
        <div class="pb-6">
          <div
            v-for="(creditSection, i) in credits"
            :key="'creditSection' + i"
          >
            <p
              v-if="creditSection.heading"
              class="text-titles"
            >
              {{ creditSection.heading }}
            </p>
            <div
              v-html="renderMarkdown(creditSection.text)"
              class="text-main contact_renderedContent"
            />
            <br />
          </div>
        </div>
      </v-container>

      <!-- BACKGROUND VIDEO -->
      <video
        v-if="bgVideo"
        autoplay
        loop
        muted
        id="contactBgVideo"
      >
        <source
          :src="bgVideo.videoSrcWebm"
          type="video/webm"
        />
        <source
          :src="bgVideo.videoSrcMP4"
          type="video/mp4"
        />
      </video>
    </div>
  </router-view>
</template>

<script>
import snarkdown from 'snarkdown';

export default {
  data() {
    return {
      contactPgContent: {},
    };
  },

  computed: {
    pageTitle() {
      return this.contactPgContent.pageTitle;
    },
    titleImg1Line() {
      return this.contactPgContent.headingImg;
    },
    titleImg2Lines() {
      return this.contactPgContent.headingImg2Lines;
    },
    mainText() {
      return this.contactPgContent.description;
    },
    credits() {
      return this.contactPgContent.credits;
    },
    bgVideo() {
      return this.contactPgContent.bgVideo;
    },
  },

  async mounted() {
    const contactPgContent = await queryContent('contact').findOne();
    this.contactPgContent = contactPgContent;
  },

  methods: {
    renderMarkdown(text) {
      let sn = snarkdown(text);
      return '<p>' + sn.replaceAll('<br />', '</p><p>') + '</p>';
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

#contactBgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 0.22;
  z-index: -1;
}

.main-container {
  width: 900px !important;
  max-width: 75% !important;
}

.titleImg {
  display: block;
  width: 100%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
}
.titleImg1Line {
  display: block;
}
.titleImg2Lines {
  display: none;
}

/* Form adapted from https://www.w3schools.com/howto/howto_css_contact_form.asp */

/* Add a background color and some padding around the form */
.form-container {
  background-color: transparent;
  padding: 20px 0;
}

/* Style inputs with type="text", select elements and textareas */
input[type='text'],
input[type='email'],
textarea#message {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
  color: #91465a;
  background-color: #ddd;
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  font-style: italic;
}
input[type='text']:hover,
input[type='email']:hover,
textarea:hover,
input[type='text']:focus,
input[type='email']:focus,
textarea:focus {
  background-color: #fff;
}

/* Style the submit button with a specific background color etc */
input[type='submit'] {
  background-color: #406689;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-weight: 400;
  font-size: 1.125em;
  letter-spacing: 5px;
  text-transform: uppercase;
}
input[type='submit']:focus {
  outline: none; // remove blue border in iOS Chrome
}

/* When moving the mouse over the submit button, add a darker green color */
input[type='submit']:hover {
  color: #eecf49;
}

label,
.text-titles,
.text-main {
  font-family: 'NeueHaasGroteskText Pro55', sans-serif;
  font-feature-settings: 'liga';
  font-weight: 400;
  text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.5);
}
label {
  display: inline-block;
  color: #406689;
  font-size: 1.3125rem;
  line-height: 1.3125rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.text-titles,
.text-main {
  color: #f2f2f2;
  margin: 0px;
  padding: 0px;
  text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.5);
}
.text-titles {
  font-size: 1.3125rem;
  letter-spacing: 5px;
  line-height: 25px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
.text-main {
  font-size: 1.25rem;
  letter-spacing: 1px;
  line-height: 24px;

  p {
    margin-bottom: 1rem;
  }
}
li.text-main {
  padding: 4.5px 0;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, < 576px) */
@media only screen and (max-width: 575.98px) {
  label,
  input[type='submit'],
  .text-titles {
    font-size: 1.0625rem;
    letter-spacing: 4px;
  }
  input[type='submit'],
  .text-titles {
    margin-bottom: 1rem;
  }
  input[type='submit'] {
    line-height: 23px;
  }
  .text-main {
    font-size: 1rem;
    text-align: justify;
  }
  li.text-main {
    text-align: initial;
  }
  .contact_renderedContent {
    text-align: initial;

    p {
      margin-bottom: 0.5rem;
    }
  }
  .titleImg1Line {
    display: none;
  }
  .titleImg2Lines {
    display: block;
  }
}

/* Small devices (landscape phones, 576 - 768px) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  label,
  input[type='submit'],
  .text-titles {
    font-size: 1.0625rem;
    letter-spacing: 4px;
  }
  input[type='submit'] {
    line-height: 23px;
  }
  .text-main {
    font-size: 1rem;
    text-align: justify;
  }
  li.text-main {
    text-align: initial;
  }
}

/* Medium devices (tablets, 768 - 992px) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  label,
  input[type='submit'],
  .text-titles {
    font-size: 1.0625rem;
    letter-spacing: 4px;
  }
  input[type='submit'] {
    line-height: 23px;
  }
  .text-main {
    font-size: 1rem;
    text-align: justify;
  }
  li.text-main {
    text-align: initial;
  }
}
</style>

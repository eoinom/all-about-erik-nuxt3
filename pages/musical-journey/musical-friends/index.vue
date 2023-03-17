<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <BackgroundMusic
        :audioFile="musicalFriendsPgContent.bgAudio"
        :audioDuration="musicalFriendsPgContent.bgAudioDuration"
        :audioFadeInDuration="musicalFriendsPgContent.bgAudioFadeInDuration"
        :audioFadeOutDuration="musicalFriendsPgContent.bgAudioFadeOutDuration"
        :maxVolume="0.9"
      />

      <MusicalFriendsComponent
        :musicalFriendsPgContent="musicalFriendsPgContent"
        :menuOnly="false"
      />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      musicalFriendsPgContent: {},
    };
  },

  computed: {
    pageTitle() {
      return this.musicalFriendsPgContent.pageTitle;
    },
  },

  async mounted() {
    const musicalFriendsPgContent = await queryContent(
      'musical-journey/musical-friends'
    ).findOne();
    this.musicalFriendsPgContent = musicalFriendsPgContent;
  },
};
</script>

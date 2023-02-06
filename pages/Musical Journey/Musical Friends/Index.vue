<template>
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

  <MusicalFriendsComponent :menuOnly="false" />
</template>

<script scoped>
export default {
  data() {
    return {
      musicalFriendsPgContent: {},
    };
  },

  async mounted() {
    const musicalFriendsPgContent = await queryContent(
      'musical-friends'
    ).findOne();
    this.musicalFriendsPgContent = musicalFriendsPgContent;
  },
};
</script>

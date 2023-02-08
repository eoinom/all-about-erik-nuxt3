<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
  </Head>

  <MusicalFriendsComponent
    :musicalFriendsPgContent="musicalFriendsPgContent"
    :menuOnly="true"
  />
</template>

<script scoped>
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
      'musical-friends'
    ).findOne();
    this.musicalFriendsPgContent = musicalFriendsPgContent;
  },
};
</script>

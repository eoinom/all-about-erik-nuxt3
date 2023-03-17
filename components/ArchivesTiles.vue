<template>
  <v-container
    fluid
    id="tilesContainer"
  >
    <v-row
      no-gutters
      justify="center"
      id="tilesRow"
      class="mx-4 mx-sm-0 mb-12 pb-6"
    >
      <v-col
        v-for="(tile, index) in tiles"
        :key="index"
        cols="12"
        md="5"
        xl="3"
        align-self="center"
        class="tilesCols position-relative pa-0 ma-2 ma-sm-4"
        data-testid="archive-container"
      >
        <ArchivesThumbnail :thumbnailObj="tile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ArchivesTiles',

  props: {
    tiles: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
#tilesContainer {
  width: 100%;
  max-width: 2048px;
  padding: 0;
  text-align: center;
  z-index: 50;
}

.tilesCols {
  max-width: 480px;
  background-color: black;
}
</style>

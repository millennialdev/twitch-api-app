<template>
  <div id="streamer">
    <topNavBarLinks />
    <h1>{{ this.streamTitle }}</h1>
  </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';
export default {
  name: 'Streamer',
  data: function() {
    return {
      // listOfTopGames: [],
    };
  },
  components: {
    topNavBarLinks,
  },
  methods: {
    fetchStreamInformation: function() {},
  },
  mounted() {
    // this.fetchTopGames();
  },
};
</script>

<style></style>

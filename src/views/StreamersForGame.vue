<template>
  <div id="streamersForGameContainer">
    <topNavBarLinks></topNavBarLinks>
    <h1>Streamers for {{ $route.params.game_name }}</h1>
    <div id="topStreamersForSpecificGame">
      <div
        class="topStreamerForSpecificGame"
        v-for="topStreamerForSpecificGame in listOfTopStreamersForSpecificGame"
        :key="topStreamerForSpecificGame.id"
      >
        <a
          :href="
            `../streamer/${topStreamerForSpecificGame.user_name}?streamerID=${topStreamerForSpecificGame.user_id}`
          "
          class="topStreamerForSpecificGameLink"
        >
          <div class="topStreamerforSpecificGameThumbnailContainer">
            <img
              :src="`${topStreamerForSpecificGame.stream_thumbnail_url}`"
              alt=""
              class="topStreamForSpecificGameThumbnail"
            />
          </div>
          <div class="topStreamerForSpecificGameDescription">
            <div class="username">
              {{ topStreamerForSpecificGame.user_name }}
            </div>
            <div class="viewerCount">
              Viewers: {{ topStreamerForSpecificGame.stream_viewer_count }}
            </div>
          </div>
        </a>
      </div>
    </div>

    <Observer v-on:intersect="intersected"></Observer>
  </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';
import Observer from '../components/Observer';

export default {
  name: 'StreamersForGame',
  components: {
    topNavBarLinks,
    Observer,
  },
  data: function() {
    return {
      listOfTopStreamersForSpecificGame: [],
      pagination: '',
    };
  },
  methods: {
    fetchTopStreamersForSpecificGame: function(pagination) {
      let fetchLink =
        'https://api.twitch.tv/helix/streams?first=100&game_id=' +
        this.$route.query.gameID;

      if (pagination) {
        fetchLink =
          'https://api.twitch.tv/helix/streams?first=100&game_id=' +
          this.$route.query.gameID +
          '&after=' +
          pagination;
      }

      fetch(fetchLink, {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${process.env.VUE_APP_OAUTH_TOKEN}`,
          'Client-ID': process.env.VUE_APP_CLIENT_ID,
        }),
      })
        .then(function(response) {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          this.pagination = data.pagination.cursor;

          let dataListOfTopStreamersForSpecificGame = [];

          for (var key in data.data) {
            dataListOfTopStreamersForSpecificGame.push({
              id: data.data[key].id,
              user_id: data.data[key].user_id,
              user_name: data.data[key].user_name,
              title: data.data[key].title,
              stream_thumbnail_url: data.data[key].thumbnail_url
                .replace('{width}', '440')
                .replace('{height}', '248'),
              stream_viewer_count: data.data[key].viewer_count,
            });
          }

          this.listOfTopStreamersForSpecificGame = [
            ...this.listOfTopStreamersForSpecificGame,
            ...dataListOfTopStreamersForSpecificGame,
          ];
        });
    },
    intersected: function() {
      this.fetchTopStreamersForSpecificGame(this.pagination);
    },
  },
  mounted() {
    this.fetchTopStreamersForSpecificGame(this.pagination);
  },
};
</script>

<style>
#topStreamersForSpecificGame {
  display: flex;
  flex-wrap: wrap;
}

.topStreamerForSpecificGame {
  flex-basis: 100%;
  padding: 7px;
  margin-bottom: 7px;
}

.topStreamerForSpecificGameThumbnail {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  .topStreamerForSpecificGame {
    flex-basis: 50%;
  }
}

@media only screen and (min-width: 900px) {
  .topStreamerForSpecificGame {
    flex-basis: 33.3333333%;
  }
}

@media only screen and (min-width: 1200px) {
  .topStreamerForSpecificGame {
    flex-basis: 25%;
  }
}

@media only screen and (min-width: 1500px) {
  .topStreamerForSpecificGame {
    flex-basis: 20%;
  }
}
</style>

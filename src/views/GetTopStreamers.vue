<template>
  <div id="GetTopStreamersContainer">
    <topNavBarLinks />
    <h1>List of Top Streamers</h1>
    <div id="topStreamers">
      <div
        class="topStreamer"
        v-for="topStreamer in listOfTopStreamers"
        :key="topStreamer.id"
      >
        <a href="">
          <div class="topStreamerLink">
            <div class="topStreamerThumbnailContainer">
              <img
                class="topStreamerThumbnail"
                :src="`${topStreamer.thumbnail_url}`"
                alt=""
              />
            </div>
            <div class="topStreamerDescription">
              <span class="streamTitle"
                ><strong>{{ topStreamer.stream_title }}</strong></span
              >
              <span class="username"
                >Streamer name: {{ topStreamer.user_name }}</span
              >
              <span class="streamViewerCount"
                >Viewers: {{ topStreamer.viewer_count }}</span
              >
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';
export default {
  name: 'GetTopStreamers',
  components: {
    topNavBarLinks,
  },
  data: function() {
    return {
      listOfTopStreamers: [],
    };
  },
  methods: {
    fetchTopStreamers: function() {
      let fetchLink = 'https://api.twitch.tv/helix/streams?first=30';

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
          console.log(data);
          let dataListOfTopStreamers = [];

          for (var key in data.data) {
            dataListOfTopStreamers.push({
              id: data.data[key].id,
              user_id: data.data[key].user_id,
              user_name: data.data[key].user_name,
              game_id: data.data[key].game_id,
              stream_title: data.data[key].title,
              viewer_count: data.data[key].viewer_count,
              thumbnail_url: data.data[key].thumbnail_url
                .replace('{width}', '440')
                .replace('{height}', '248'),
            });
          }

          this.listOfTopStreamers = [
            ...this.listOfTopStreamers,
            ...dataListOfTopStreamers,
          ];
        });
    },
  },
  mounted() {
    this.fetchTopStreamers();
  },
};
</script>

<style>
#topStreamers {
  display: flex;
  flex-wrap: wrap;
}

.topStreamer {
  flex-basis: 100%;
  padding: 7px;
  margin-bottom: 7px;
  overflow: hidden;
}

.topStreamer a {
  text-decoration: none;
}

.topStreamerThumbnail {
  width: 100%;
}

.topStreamerDescription span {
  display: block;
}

.topStreamerDescription .username {
  text-decoration: underline;
}

.topStreamerDescription .streamTitle {
  color: #000;
}

@media only screen and (min-width: 700px) {
  #topStreamers .topStreamer {
    flex-basis: 50%;
  }
}

@media only screen and (min-width: 1000px) {
  #topStreamers .topStreamer {
    flex-basis: 33.3333333%;
  }
}

@media only screen and (min-width: 1300px) {
  #topStreamers .topStreamer {
    flex-basis: 25%;
  }
}

@media only screen and (min-width: 1600px) {
  #topStreamers .topStreamer {
    flex-basis: 20%;
  }
}
</style>

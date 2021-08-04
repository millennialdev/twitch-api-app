<template>
  <div id="streamer">
    <topNavBarLinks />

    <!-- Add a placeholder for the Twitch embed -->
    <div id="twitch-embed"></div>
    <div class="streamerInfoContainer">
      <h2 class="streamerName">{{ $route.params.streamer_user_name }}</h2>
      <h3 class="viewerCount">Viewers: {{ this.streamViewerCount }}</h3>
    </div>

    <div id="twitch_embed_script_link"></div>

    <h1>{{ this.streamTitle }}</h1>
  </div>
</template>

<!-- Load the Twitch embed script -->
<script></script>

<script>
import topNavBarLinks from '../components/topNavBarLinks';
export default {
  name: 'Streamer',
  data: function() {
    return {
      streamID: 0,
      streamerName: '',
      gameID: '',
      gameName: '',
      streamTitle: '',
      streamViewerCount: 0,
    };
  },
  components: {
    topNavBarLinks,
  },
  methods: {
    fetchStreamInformation: function() {
      let fetchLink =
        'https://api.twitch.tv/helix/channels?broadcaster_id=' +
        this.$route.query.streamerID;

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
          this.streamID = data.data[0].breadcaster_id;
          this.streamerName = data.data[0].breadcaster_name;
          this.gameID = data.data[0].game_id;
          this.gameName = data.data[0].game_name;
          this.streamTitle = data.data[0].title;
        });
    },
    insertTwitchEmbedScript: function() {
      let twitchEmbedDiv = document.querySelector('#twitch_embed_script_link');
      let twitch_embed_script = document.createElement('script');
      twitch_embed_script.setAttribute(
        'src',
        'https://embed.twitch.tv/embed/v1.js'
      );
      twitchEmbedDiv.appendChild(twitch_embed_script);
    },
    runTwitchEmbed: function() {
      var embed = new Twitch.Embed('twitch-embed', {
        width: 854,
        height: 480,
        channel: this.$route.params.streamer_user_name,
        layout: 'vide-with-chat',
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        var embed = embed.getPlayer();
        player.play();
      });
    },
    fetchStreamViewerCount: function() {
      fetch(
        'https://api.twitch.tv/helix/streams?user_id=' +
          this.$route.query.streamerID,
        {
          method: 'get',
          headers: new Headers({
            Authorization: `Bearer ${process.env.VUE_APP_OAUTH_TOKEN}`,
            'Client-ID': process.env.VUE_APP_CLIENT_ID,
          }),
        }
      )
        .then(function(response) {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          this.streamViewerCount = data.data[0].viewer_count;
        });
    },
    fetchStreamViewerCountSetInterval: function() {
      setInterval(() => {
        this.fetchStreamViewerCount();
      }, 120000);
    },
  },
  mounted() {
    this.fetchStreamInformation();
    this.insertTwitchEmbedScript();
    setTimeout(() => this.runTwitchEmbed(), 500);

    this.fetchStreamViewerCount();
    this.fetchStreamViewerCountSetInterval();
  },
};
</script>

<style>
.streamerInfoContainer {
  padding-left: 5%;
  text-align: left;
}

.streamerInfoContainer .streamerName,
.streamerInfoContainer .viewerCount {
  font-weight: 100;
}
</style>

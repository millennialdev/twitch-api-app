<template>
  <div id="topNavBarLinksContainer">
    <router-link to="/">Get Top Games</router-link> |
    <router-link to="/GetTopStreamers">Get Top Streamers</router-link>
  </div>
</template>

<script>
export default {
  name: 'topNavBarLinks',
};
</script>

<style>
#topNavBarLinksContainer {
 margin-bottom: 10px;
}
#topNavBarLinksContainer a {
 font-size: 25px;
 padding: 10px;
}
</style>

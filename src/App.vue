<template>
  <div id="app">
    <TabBar></TabBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
	<Player></Player>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import Player from "@/components/Player.vue";

export default {
  name: "App",
  data() {
    return {};
  },

  components: {
	TabBar,
	Player
  }
};
</script>

<style>
</style>

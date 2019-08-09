<template>
  <div class="tabBar">
    <router-link class="tab-item" to="/singer">歌手</router-link>
    <router-link class="tab-item" to="/recommend">音乐馆</router-link>
    <router-link class="tab-item" to="/toplist">排行榜</router-link>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.my-active {
  font-size: 22px !important;
}

.tabBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  background-color: #555;
  justify-content: center;
  z-index: 20;
  .tab-item {
    color: #fff;
    font-size: 20px;
    margin: 0 10px;
    text-align: center;
    line-height: 50px;
  }
}
</style>

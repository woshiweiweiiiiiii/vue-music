<!--  -->
<template>
  <transition name="slide">
    <div class="toplistDetail">
      <div class="iconfont icon-back" @click="back"></div>
      <ListView :title="title" :bgImage="bgImage" :songs="songs" @select="selectItem"></ListView>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import ListView from "./ListView.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    axios
      .get("http://94.191.55.232:3000/top/list", {
        params: {
          idx: this.$route.params.id
        }
      })
      .then(res => {
        this.detail = res.data.playlist;
      });
  },

  computed: {
    title() {
      return this.detail.name;
      s;
    },
    bgImage() {
      return this.detail.coverImgUrl;
    },
    songs() {
      return this.detail.tracks;
    }
  },

  methods: {
    back() {
      this.$router.back();
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions(["selectPlay"])
  },
  components: {
    ListView
  }
};
</script>
<style lang='scss' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toplistDetail {
  z-index: 20;
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  .icon-back {
    position: absolute;
    top: 0px;
    left: 14px;
    font-size: 30px;
    color: #19be6b;
    z-index: 2000;
  }
}
</style>
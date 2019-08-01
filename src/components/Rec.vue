<template>
<transition name="slide">
  <div class="rec">
    <div class="iconfont icon-back" @click="back"></div>
    <ListView :title="title" :bg-image="bgImage" :songs="songlists" @select="selectItem"></ListView>
  </div>
</transition>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ListView from "./ListView.vue";
import axios from "axios";

export default {
  computed: {
    title() {
      return this.rec.name;
    },
    bgImage() {
      return this.rec.coverImgUrl;
    },
    ...mapGetters(["rec"])
  },
  data() {
    return {
      songlists: null
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    selectItem(item, index) {
      this.selectPlay({
        list: this.songlists,
        index
      });
    },
    ...mapActions(["selectPlay"]),
    _getDetail() {
      if (!this.rec.id) {
        this.$router.push("/recommend");
        return;
      }
      axios
        .get("/api/playlist/detail", {
          params: {
            id: this.rec.id
          }
        })
        .then(res => {
          this.songlists = res.data.playlist.tracks;
        });
    },
    back() {
      this.$router.back()
    }
  },
  components: {
    ListView
  }
};
</script>
<style>
.rec {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.icon-back {
    position: absolute;
    top: 0px;
    left: 14px;
    font-size: 30px;
    color: #19be6b;
    z-index: 9999;
  }

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>



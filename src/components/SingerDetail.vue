<template>
  <div class="singerDetail">
    <div class="iconfont icon-back" @click="back"></div>
    <ListView :title="title" :bgImage="bgImage" :songs="songs" @select="selectItem"></ListView>
  </div>
</template>

<script>
import axios from "axios";
import ListView from "./ListView.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      singer: {},
      songs: null
    };
  },
  created() {
    this.singer = this.$store.state.singer;
    this._getDetail();
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.picUrl;
    }
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        //back to singer
        this.$router.push("/singer");
        return;
      }
      axios
        .get("http://94.191.55.232:3000/artists", {
          params: {
            id: this.singer.id
          }
        })
        .then(res => {
          this.songs = res.data.hotSongs;
        });
    },
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

<style lang="scss" scoped>

.singerDetail {
  z-index: 20;
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #333;
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

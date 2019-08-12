<template>
  <div class="singer">
    <ul class="singer-list">
      <li
        class="singer-item"
        v-for="singer in singerlist"
        @click="selectItem(singer)"
        :key="singer.name"
      >
        <img v-lazy="singer.img1v1Url" />
        <div>
          <span>{{singer.name}}</span>
        </div>
      </li>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      singerlist: null
    };
  },
  created() {
    this._getSingerList();
  },

  methods: {
    _getSingerList() {
      axios.get("/api/toplist/artist").then(res => {
        this.singerlist = res.data.list.artists;
        // console.log(this.singerlist)
      });
    },
    selectItem(singer) {
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    ...mapMutations(["setSinger"])
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.singer {
  box-sizing: border-box;
  width: 100%;
  margin-top: 50px;
  background: #333;
  .singer-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    .singer-item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin: 5px 0;
      /* padding: 0 10px; */
      padding-left: 10px;
      color: #fff;
      transition: all 0.5s linear;
      img {
        height: 49px;
        display: block;
        border-radius: 50%;
      }
      div {
        flex-grow: 1;
        display: flex;
        align-items: center;
        font-size: 16px;
        margin: 0 20px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>

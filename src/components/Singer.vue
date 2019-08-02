<template>
  <div class="singer">
    <ul class="singer-list">
      <li class="singer-item" v-for="singer in singerlist" @click="selectItem(singer)">
        <img v-lazy="singer.img1v1Url" />
        <div>
          <span>{{singer.name}}</span>
        </div>
      </li>
      <router-view></router-view>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
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
      this.$store.commit("setSinger", singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.singer {
  box-sizing: border-box;
  width: 100%;
  margin-top: 50px;

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

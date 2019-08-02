<template>
  <div class="toplist">
    <ul>
      <li v-for="(item, index) in toplistTitle" :key="item" @click="toDetail(index)">
        <p>{{item}}</p>
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
      toplist: [],
      toplistTitle: [
        "云音乐新歌榜",
        "云音乐热歌榜",
        "网易原创歌曲榜",
        "云音乐飙升榜",
        "云音乐电音榜",
        "UK排行榜周榜",
        "美国Billboard周榜",
        "KTV嗨榜",
        "iTunes榜",
        "Hit FM Top榜",
        "日本Oricon周榜",
        "韩国Melon排行榜周榜",
        "韩国Mnet排行榜周榜",
        "韩国Melon原声周榜",
        "中国TOP排行榜(港台榜)",
        "中国TOP排行榜(内地榜)",
        "香港电台中文歌曲龙虎榜",
        "华语金曲榜",
        "中国嘻哈榜",
        "法国 NRJ EuroHot 30周榜",
        "台湾Hito排行榜",
        "Beatport全球电子舞曲榜",
        "云音乐ACG音乐榜",
        "云音乐嘻哈榜"
      ]
    };
  },
  created() {},
  methods: {
    toDetail(index) {
      this.$router.push({
        path: `/toplist/${index}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toplist {
  margin-top: 50px;
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      background-color: #31c27c;
      border-radius: 10px;
      margin: 3px 0;
      box-sizing: border-box;
      width: 45%;
      display: inline-block;
      height: 6vh;
      overflow: hidden;
      text-align: center;
      line-height: 6vh;
      p {
        font-size: 2vh;
      }
    }
  }
}
</style>
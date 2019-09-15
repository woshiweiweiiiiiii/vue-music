<template>
  <div class="musichall" ref="musichall">
    <div>
      <div class="banner" v-if="bannerlist">
        <Carousel autoplay loop radius-dot>
          <CarouselItem v-for="(item,i) in bannerlist" :key="i">
            <img :src="item.imageUrl" alt class="swiper-item" />
          </CarouselItem>
        </Carousel>
      </div>
      <div class="options">
        <span @click="toSinger">
          <i class="iconfont icon-ren"></i>歌手
        </span>
        <span @click="toToplist">
          <i class="iconfont icon-paixingbang"></i>排行
        </span>
        <span>
          <i class="iconfont icon-xianxing_diantai"></i>电台
        </span>
        <span>
          <i class="iconfont icon-leimupinleifenleileibie2"></i>分类歌单
        </span>
        <span @click="toMv">
          <i class="iconfont icon-shexiangji"></i>MV
        </span>
        <span>
          <i class="iconfont icon-zhuanjiguangpan"></i>数字专辑
        </span>
      </div>
      <div class="songSheetRecomment" v-cloak>
        <h3>歌单推荐</h3>
        <ul class="list" v-if="bannerlist" ref="ul">
          <li class="play-item" v-for="i in musicList" @click="selectItem(i)" :key="i.coverImgUrl">
            <img v-lazy="i.coverImgUrl" alt />
            <p>{{i.copywriter}}</p>
          </li>
        </ul>
        <div class="loadmore" @click="loadmore">
          <Loadmore></Loadmore>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import axios from "axios";
import BScroll from "better-scroll";
import Loadmore from "@/common/Loadmore.vue";
export default {
  data() {
    return {
      bannerlist: null,
      musicList: null
    };
  },
  created() {
    this._getBanner();
    setTimeout(() => {
      this._getMusicList();
    }, 300);
    //下面这个有严重bug  暂时没找到解决的方法
    // this.$nextTick(() => {
    //   if (!this.musichallScroll) {
    //     this.musichallScroll = new BScroll(this.$refs.musichall, {
    //       click: true,
    //       probeType: 3,
    //       bounce:false,
    //       pullUpLoad: {
    //         threshold: 0 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
    //       }
    //     });
    //     this.musichallScroll.on("pullingUp", () => {
    //       let time = this.musicList[this.musicList.length - 1].updateTime;
    //       axios
    //         .get("/api/top/playlist/highquality?limit=12&before=" + time)
    //         .then(res => {
    //           this.musicList = this.musicList.concat(res.data.playlists);
    //           this.musichallScroll.finishPullUp()
    //           this.musichallScroll.refresh();
    //         });
    //     });
    //   } else {
    //     this.musichallScroll.refresh();
    //   }
    // });
  },
  updated() {
    // 我测试用的 
    // this.$nextTick(()=>{
    //   console.log(123)
    // })
    // console.log(1111111);
    
  },
  mounted() {
    
  },
  computed: {
    
  },
  methods: {
    _getBanner() {
      axios.get("http://94.191.55.232:3000/banner").then(res => {
        let banners = res.data.banners;
        if (banners.length > 6) {
          banners = banners.slice(0, 6);
        }
        this.bannerlist = banners;
      });
    },
    _getMusicList() {
      axios.get("http://94.191.55.232:3000/top/playlist/highquality?limit=12").then(res => {
        this.musicList = [];
        this.musicList = this.musicList.concat(res.data.playlists);
      });
    },
    selectItem(list) {
      this.setRec(list);
      this.$router.push({
        path: `recommend/${list.id}`
      });
    },
    toSinger() {
      this.$router.push({
        path: `/singer`
      });
    },
    toToplist() {
      this.$router.push({
        path: `/toplist`
      });
    },
    toMv() {
      this.$router.push({
        path: `/mv`
      });
    },
    loadmore() {
      let time = this.musicList[this.musicList.length - 1].updateTime;
      axios
        .get("http://94.191.55.232:3000/top/playlist/highquality?limit=12&before=" + time)
        .then(res => {
          this.musicList = this.musicList.concat(res.data.playlists);
        });
    },
    ...mapMutations(["setRec"])
  },
  components: {
    Loadmore
  }
};
</script>

<style lang="scss" scoped>
.musichall {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  // overflow: hidden;
  width: 100%;
  background: #333;
  .banner {
    .swiper-item {
      width: 100vw;
    }
  }
  .options {
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    span {
      display: inline-block;
      width: 33.3vw;
      margin: 10px 0 0 0;
      i {
        display: inline-block;
        margin: 0 10px;
        font-size: 20px;
        color: #31c27c;
      }
    }
  }
  .songSheetRecomment {
    
    h3 {
      text-align: center;
      margin: 10px 0;
      font-size: 22px;
      font-weight: 700;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      .play-item {
        display: flex;
        flex-direction: column;
        width: 33%;
        margin-bottom: 10px;
        img {
          display: block;
          width: 100%;
        }
        p {
          padding: 3px;
          font-size: 15px;
          color: #aaa;
        }
      }
    }
  }
}
</style>

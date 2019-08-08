<!--  -->
<template>
  <div>
    <div class="top-title">{{title}}</div>
    <div class="top-title-fixed" v-show="show">
      <img :src="bgImage" />
    </div>
    <div class="container" ref="listContainer">
      <div class="listview">
        <div class="play-image">
          <img :src="bgImage"/>
        </div>
        <div class="songs-container" ref="songs">
          <ul class="songs">
            <li class="song" v-for="(item,index) in songs" @click="selectItem(item,index)" :key="item.name+index">
              <h4>
                <i class="iconfont icon-dianyingzhiye-gequbang"></i>
                {{item.name}}
              </h4>
              <p>
                <i class="iconfont icon-zhuanjiguangpan"></i>
                {{item.al.name}} {{item.alia[0]}}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: ["bgImage", "title", "songs"],
  data() {
    return {
      show: false
    };
  },
  computed: {},
  created() {
    this.$nextTick(() => {
      if (!this.listContainerScroll) {
        this.listContainerScroll = new BScroll(this.$refs.listContainer, {
          click: true,
          probeType: 3,
          bounce:false
        });
        this.listContainerScroll.on("scroll", () => {
          if (this.$refs.songs.getBoundingClientRect().top <= 44) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
      } else {
        this.listContainerScroll.refresh();
      }
    });
  },
  methods: {
    selectItem(item, index) {
      this.$emit("select", item, index);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>

.top-title {
  height: 44px;
  width: 100vw;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  position: fixed;
  top: 0;
  z-index: 201;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 40px;
  padding-right: 40px;
}
.top-title-fixed {
  height: 40px;
  width: 100vw;
  font-size: 20px;
  font-weight: 700;
  position: fixed;
  top: 0;
  z-index: 200;
  overflow: hidden;
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 100;

  .play-image {
    img {
      width: 100vw;
    }
  }
  .songs-container {
    .song {
      display: block;
      padding: 4px 20px;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      color: #000;
      p {
        font-size: 12px;
        // margin-top: 5px;
        color: #999;
      }
      .iconfont {
        padding-right: 16px;
      }
      .icon-dianyingzhiye-gequbang {
        color: green;
      }
      .icon-zhuanjiguangpan {
        color: red;
      }
    }
  }
}
</style>
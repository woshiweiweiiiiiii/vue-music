<!--  -->
<template>
  <div class="container" v-if="playList.length>0">
    <!-- <div class="container"> -->

    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="iconfont icon-jiantouarrow483" @click="back"></div>
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.al.picUrl" />
        </div>
        <div class="top">
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.ar[0].name"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="rta">
                <img class="image" :src="currentSong.al.picUrl" />
              </div>
            </div>
            <!-- 歌词 部分-->
            <div class="playing-lyric-wrapper" v-if="currentLyric" ref="lyricList">
              <ul>
                <li
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum === index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="line.txt+index"
                >{{line.txt}}</li>
              </ul>
            </div>
            <!-- 歌词部分 -->
          </div>
        </div>
        <div class="bottom">
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(songDuration)}}</span>
          </div>
          <!-- 进度条 -->
          <div class="operators">
            <div class="icon i-left">
              <i class="iconfont icon-iconfront-"></i>
            </div>
            <div @click="prev" class="icon i-left">
              <i class="iconfont icon-icon-1"></i>
            </div>
            <div @click="togglePlaying" class="icon i-center">
              <i :class="playIcon" class="iconfont"></i>
            </div>
            <div @click="next" class="icon i-right">
              <i class="iconfont icon-icon-"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-like-1"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="min">
      <div class="min-player" v-show="!fullScreen" @click="open">
        <div class="icon" :class="rta">
          <img height="40" width="40" :src="currentSong.al.picUrl" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.ar[0].name"></p>
        </div>
        <div class="control iconfont" @click.stop="togglePlaying" :class="playIcon"></div>
      </div>
    </transition>
    <audio
      :src="curSong"
      ref="audio"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import LyricParser from "lyric-parser";
import BScroll from "better-scroll";
import axios from "axios";
import ProgressBar from "../common/ProgressBar.vue"

export default {
  data() {
    return {
      curSong: "",
      songReady: false,
      currentTime: 0,
      songDuration: 0,
      currentLyric: null,
      currentLineNum: 0
    };
  },

  created() {},
  components: {
    ProgressBar
  },

  computed: {
    playIcon() {
      return this.playing ? "icon-zanting" : "icon-bofang";
    },
    rta() {
      return this.playing ? "play" : "play pause";
    },
    percent() {
      return this.currentTime / this.songDuration;
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex",
      "singer"
    ])
  },

  mounted() {},
  updated() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.$refs.lyricList) {
        // 确保dom已经就绪
        return;
      }
      if (!this.lyricListScroll) {
        this.lyricListScroll = new BScroll(this.$refs.lyricList, {
          probeType: 3,
          click: true
        });
      } else {
        this.lyricListScroll.refresh();
      }
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    end() {
      this.next();
    },
    next() {
      if (!this.songReady) return;
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) return;
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      this.songDuration = e.target.duration;
    },
    format(interval) {
      interval = interval | 0;
      const min = (interval / 60) | 0;
      const sec = this._pad(interval % 60);
      return `${min}:${sec}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    onProgressBarChange(percent) {
      const currentTime = this.songDuration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    ...mapMutations(["setFullScreen", "setPlayingState", "setCurrentIndex"]),
    togglePlaying() {
      if (!this.songReady) return;
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    _getSongUrl: async function() {
      var result = await axios.get("http://94.191.55.232:3000/song/url", {
        params: { id: this.currentSong.id }
      });
      return result;
    },
    _getLyric: async function() {
      var lyric = await axios.get("http://94.191.55.232:3000/lyric", {
        params: { id: this.currentSong.id }
      });
      return lyric;
    },
    handlerLyric(lineNum, txt) {
      this.currentLineNum = lineNum.lineNum;
      if (this.currentLineNum > 1) {
        let lineEl = this.$refs.lyricLine[this.currentLineNum - 1];
        this.lyricListScroll &&
          this.lyricListScroll.scrollToElement(lineEl, 800);
      } else {
        this.lyricListScroll && this.lyricListScroll.scrollTo(0, 0, 800);
      }
    }
  },

  watch: {
    currentIndex() {
      this._getSongUrl().then(res => {
        this.curSong = res.data.data[0].url;
      });
    },

    curSong() {
      setTimeout(() => {
        this.$refs.audio.play();
      }, 100);
      this._getLyric()
        .then(res => {
          if (this.currentLyric) {
            this.currentLyric.stop();
          }
          this.currentLyric = new LyricParser(
            res.data.lrc.lyric,
            this.handlerLyric
          );
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.currentLineNum = 0;
        });
    },
    playing(newPlaying) {
      if (!this.songReady) return;
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  position: fixed;
  z-index: 30;
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    .icon-jiantouarrow483 {
      position: absolute;
      top: 0;
      left: 10px;
      font-size: 32px;
      color: #19be6b;
      padding: 4px;
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      .title {
        // position: static;
        width: 80%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #31c27c;
        font-weight: 700;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 15px;
        color: #31c27c;
        font-weight: 700;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(144, 144, 144, 0.1);
            border-radius: 50%;
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .play {
            animation: rotate 20s linear infinite;
          }
          .pause {
            animation-play-state: paused;
          }
          @keyframes rotate {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
      .playing-lyric-wrapper {
        width: 80%;
        height: 15vh;
        margin: 20px auto 0 auto;
        overflow: hidden;
        text-align: center;
        .text {
          color: #eee;
          font-size: 14px;
          line-height: 5vh;
          transition: all 0.5s ease;
        }
        .current {
          color: #31c27c;
          font-size: 18px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 40px;
      width: 100%;
      height: 100px;
      .operators {
        display: flex;
        .icon {
          flex: 1;
          color: #31c27c;
          text-align: center;
          i {
            display: inline-block;
            font-size: 36px;
            line-height: 50px;
          }
        }
        .i-center i {
          font-size: 46px;
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: #ccc;
          font-size: 8px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
        }
        .time-l {
          text-align: left;
        }
        .time-r {
          text-align: right;
        }
        .progress-bar-wrapper{
          flex: 1;
        }
      }
    }
  }
  .min-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #888;
    color: #fff;
    line-height: 60px;
    font-size: 20px;
    box-sizing: border-box;
    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      display: inline-block;
      width: 40px;
      height: 100%;
      img {
        border-radius: 50%;
      }
    }
    .text {
      position: absolute;
      top: 10px;
      left: 60px;
      display: inline-block;
      width: 70vw;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        font-size: 16px;
        color: black;
        font-weight: 700;
        height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .desc {
        font-size: 12px;
        color: black;
        height: 20px;
      }
    }
    .control {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 40px;
      display: inline-block;
      height: 40px;
      color: #31c27c;
      font-size: 40px;
      transform: translateY(-8px);
    }
  }
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
  transform: translate3d(0, 100px, 0);
}
.min-enter-active,
.min-leave-active {
  transition: all 0.4s;
}
.min-enter,
.min-leave-to {
  opacity: 0;
}
</style>
<!--  -->
<template>
  <div class="mv">
      <div class="iconfont icon-back" @click="back"></div>
      <div class="main">
          后续将要完成！
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {

  },
  components: {},

  computed: {},

  methods: {
      back() {
          this.$router.back()
      }
  }
};
</script>
<style lang='scss' scoped>
.mv {
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
  .main{
      text-align: center;
      font-size: 50px;
      line-height: 100vh;
  }
}
</style>
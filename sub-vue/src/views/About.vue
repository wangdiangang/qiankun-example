<!--
 * @Author: 五道杠
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>卡卡卡卡</div>
    <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="i in 200" :key="i">哈哈哈哈{{ i }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
  // import BScroll from '@better-scroll/core'


export default {
  data() {
    return {
      bs: null,
    };
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    initBscroll() {
      this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        movable: true,
        zoom: true,
        probeType: 3,
      });
      this.bs.on("scrollStart", (pos) => {
        console.log("scrollStart-",pos);
      });
      this.bs.on("scroll", ({ y }) => {
        console.log("scrolling-滚动实时位置",y);
      });
      this.bs.on("scrollEnd", (pos) => {
        console.log('结束位置',pos);
            alert(pos.y)
      });
    },
  },
  onScroll(pos) {
    console.log("pos", pos);
  },
};
</script>
<style>
.wrapper{
  height: 300px;
  border: 1px solid red;
  overflow-y: scroll;
}
</style>

<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">LOGO</div>
      <ul class="sub-apps">
        <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name" @click="goto(item)">{{ item.name }}</li>
      </ul>
    </div>
    <div class="aside">
      <ul>
        <li v-for="i in 40" :key="i" @click="click(i)">{{current.substr(5)}}第{{i}}个</li>
      </ul>
    </div>
    <div id="subapp-viewport"></div>
    <footer>底部啊</footer>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from '@/store'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue/'
    }
  },
  computed: {
    user () {
      return store.getGlobalState('user')
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {},
  methods: {
    click(i){
      console.log(i);
    },
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    localStorage.setItem('username','张三')
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0 !important;
  padding: 0;
}
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
  .layout-wrapper{
    position: relative;
    .aside{
    position: absolute;
    left: 0;
    top: 50px;
    border: 1px solid red;
    height: calc(100vh - 50px);
    width: 200px;
    overflow-y: scroll;
    li{
      line-height: 30px;
    }
    }
    #subapp-viewport{
      margin-left: 200px;
      min-height: calc(100vh - 100px);
      max-height: calc(100vh - 100px);
      border: 1px solid blue;
      overflow-y: scroll;
    }
   footer{
     border:1px solid blue;
     height: 50px;
     margin-left: 200px;
    text-align: center;
   }
    .layout-header{
      height: 50px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 50px;
      position: relative;
     .logo {
        float: left;
        margin: 0 50px;
      }
      .sub-apps {
        list-style: none;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 20px;
          cursor: pointer;
          &.active{
            color: #42b983;
            text-decoration: underline;
          }
        }
      }
      .userinfo{
        position: absolute;
        right: 100px;
        top: 0;
      }
    }
  }
</style>

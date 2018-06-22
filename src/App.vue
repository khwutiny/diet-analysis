<template>
  <div>
    <link rel="icon" href="common/icon/favicon.ico" type="image/x-icon" />
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from './components/common/svg'
import header from 'components/header/header'
import axios from 'axios'

export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': header,
    svgIcon
  },
  created () {
    axios.get('static/data.json').then((res) => {
      this.$root.seller = res.data.seller
    })
  }
}
</script>

<style lang="scss">
  @import './style/common';
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>

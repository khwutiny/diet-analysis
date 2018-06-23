<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from 'components/header/header'
import {_axios} from '../components/http-common'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    _axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller
      this.$router.push('goods')
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="less">
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>

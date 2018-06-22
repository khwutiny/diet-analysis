<style lang="stylus" scoped>
.seller-wrapper
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .seller-content
    .info
      padding 18px 0
      margin 0 18px
      .title
        padding-bottom 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .text
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .star-wrapper
          padding-top 8px
          font-size 0
          .star
            display inline-block
            vertical-align top
          .rate-count,.sell-count
            display inline-block
            font-size 10px
            color rgb(77,85,93)
            line-height 18px
          .rate-count
            padding 0 12px 0 8px
        .collect
          position absolute
          top 18px
          right 8px
          width 50px
          text-align center
          .icon-favorite
            font-size 24px
            line-height 24px
            color #d4d6d9
            &.active
              color rgb(240,20,20)
          .text
            display block
            font-size 10px
            color rgb(77,85,93)
            line-height 10px
            padding-top 4px
      .remark
        display flex
        .block
          flex 1
          margin-top 18px
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border none
          h2
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 4px
          .content
            font-size 10px
            color rgb(7,17,27)
            line-height 24px
            font-weight 200
            .num
              position relative
              top 2px
              font-size 24px
    .activities
      padding-top 18px
      .bulletin
        margin 0 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        h1
          font-size 14px
          color #07111b
          line-height 14px
        .content
          padding 8px 12px 16px 12px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
    .supports
      margin 0 18px
      .item
        padding 16px
        border-bottom 1px solid rgba(7,17,27,0.1)
        font-size 0
        .iconMap
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
        .text
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
    .seller-imgs
      margin 18px
      white-space nowrap
      overflow hidden
      h1
        font-size 14px
        line-height 14px
        margin-bottom 12px
      img
        margin-right 6px
    .seller-info
      h1
        margin 0 18px
        padding 18px 0 12px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
      .info-list
        .info
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
          padding 16px 12px
          border-bottom 1px solid rgba(7,17,27,0.1)
          &:last-child
            border none
</style>

<template lang="html">

<div>
  <v-header :seller="seller"></v-header>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">菜品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/foodDetail">食材</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">分析</router-link>
    </div>
  </div>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
 </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import iconMap from 'components/iconMap/iconMap'
import header from 'components/header/header'

export default {
  components: {
    star: star,
    iconMap: iconMap,
    'v-header': header
  },
  data () {
    return {
      seller: {},
      collectflag: false
    }
  },
  created () {
    this._init()
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    _init () {
      axios.get('static/data.json').then((res) => {
        this.seller = res.data.seller
        this.$nextTick(() => {
          this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          })
          this._initPicScroll()
        })
      })
    },
    _initPicScroll () {
      if (this.picsScroll) {
        return
      }
      const PIC_WIDTH = 120
      const MARGIN = 6
      let picLen = this.seller.pics.length
      this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
      this.picsScroll = new BScroll(this.$refs.picsWrapper, {
        scrollX: true
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '营养成分' },
        tooltip: {},
        xAxis: {
          data: ['蛋白质', '脂肪', '碳水化合物', '微量元素', '矿物质', '水']
        },
        yAxis: {},
        series: [{
          name: '含量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}

</script>

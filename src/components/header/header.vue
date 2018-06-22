<template lang="html">

<div class="header">
    <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="35" height="35" />
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description }}
            </div>
        </div>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
</div>

</template>

<script>

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetails() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.header
  position relative
  background rgba(7,17,27,0.5)
  color #fff
  blur:10px
  overflow hidden
  .content-wrapper
    position relative
    display flex
    padding: 10px 12px 18px 10px
    font-size 10px
    .avatar
      img
        border-radius 2px
    .content
      margin-left 10px
      .title
        margin 2px 0 8px 0
        font-size 16px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        font-size 12px
        margin-bottom 2px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    filter blur(10px)
    z-index -1
    &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
        opacity: 0
    }
</style>

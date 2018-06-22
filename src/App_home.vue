<style lang="scss">
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-1px(rgba(7, 17, 27, 0.1));
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

<template>
<div>
</div>

</template>

<script>
import header from 'components/header/header'

export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
  },
  components: {
    'v-header': header
  }
}

</script>

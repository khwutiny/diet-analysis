<template lang="html">

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart()">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)">
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: Object
  },
  methods: {
    addCart (event) {
      this.count++
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0)
      }
      this.food.count++
      // 存储当前点击的元素，在购物车中会用到
      this.$store.addCartEl = event.target
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    decreaseCart () {
      if (!event._constructed || !this.food.count) {
        return
      }
      this.food.count--
    }
  }
}

</script>

<style lang="scss">
  @import "../../common/stylus/catcontrol.scss";
</style>

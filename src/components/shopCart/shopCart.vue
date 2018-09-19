<template lang="html">
  <div class="">
  <div class="shopCart">
    <div class="content">
      <div class="content-left" @click="listToggle">
        <div class="logo-wrapper">
          <div class="badge" v-show="totalCount">
            {{totalCount}}
          </div>
          <div class="logo" :class="{'active':totalCount}">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
      </div>
      <div class="content-right" :class="{'enough':totalCount>0}">
         <input type="submit" name="submit" @click='postselectcook' class="content-right" :class="{'enough':totalCount>0}" value="END">
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter"
        v-for="(ball,index) in balls" :key="index">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title" v-text="$t('m.ordered')"></h1>
          <span class="empty" @click="setEmpty()" v-text="$t('m.cart_empty')"></span>
        </div>
        <div class="list-content" ref="foodlist">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
  </transition>
  </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import backdrop from 'components/backdrop/backdrop'
import BScroll from 'better-scroll'
import {AXIOS} from '../http-common'

export default {
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      listShow: false
    }
  },
  created () {
    this.$root.eventHub.$on('cart.add', this.drop)
  },
  computed: {
    showBackdrop () {
      if (this.listShow) {
        return true
      }
      this.listShow = false
      return false
    },
    totalPrice () {
      let total = 0
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    leftAmount () {
      if (this.minPrice - this.totalPrice > 0 && this.totalPrice) {
        return true
      }
      return false
    },
    payDesc () {
      if (!this.totalCount) {
        return ``
      } else {
        return '结束'
      }
    }
  },
  methods: {
    drop (el) {
      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    setEmpty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideBackdrop () {
      this.listShow = false
    },
    _initScroll () {
      this.foodlistScroll = new BScroll(this.$refs.foodlist, {
        click: true
      })
    },
    listToggle () {
      if (!this.selectFoods.length) {
        return
      }
      this.listShow = !this.listShow
      if (this.listShow) {
        this.$nextTick(() => {
          if (!this.foodlistScroll) {
            this._initScroll()
          } else {
            this.foodlistScroll.refresh()
          }
        })
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}rem,0)`
          el.style.transform = `translate3d(0,${y}rem,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = `translate3d(${x}rem,0,0)`
          inner.style.transform = `translate3d(${x}rem,0,0)`
        }
      }
    },
    enter (el) {
      el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },

    postselectcook () {
      if (this.totalCount) {
        this.$root.eventHub.$emit('select.cook', 1)
        this.$root.selectCooks = this.selectFoods
        AXIOS({
          method: 'post',
          url: 'api/selectcook',
          data: {
            foods: this.selectFoods
          }
        }).then((res) => {
          AXIOS.get('/api/getmaterial').then((res) => {
            this.$root.cookMaterials = res.data
          }).then(() => {
            this.$router.push('foodDetail')
          })
        })
      }
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  components: {
    cartcontrol,
    backdrop
  }
}

</script>

<style lang="scss" scoped>
.shopCart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.4rem;
  z-index: 50;
  .content {
    display: flex;
    background: #141d27;
    .content-left {
      flex: 1;
      height: 2.4rem;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        height: 2.8rem;
        line-height: 2.8rem;
        border-radius: 50%;
        width: 2.8rem;
        top: -.5rem;
        background: #141d27;
        margin: 0 .6rem;
        padding: .3rem;
        box-sizing: border-box;
        text-align: center;
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          background: rgb(240, 20, 20);
          color: white;
          width: 1.2rem;
          height: .8rem;
          line-height:.8rem;
          font-size: .45rem;
          box-shadow: 0rem .2rem .4rem 0rem rgba(0, 0, 0, 0.4);
          font-weight: 700;
          border-radius: .8rem;
          text-align: center;
        }
        .logo {
          width: 100%;
          height: 100%;
          background: #2b343c;
          border-radius: 50%;
          font-size: 1.2rem;
          color: #80858a;
          line-height: 2.2rem;
          font-weight: 700;
          &.active {
            color: white;
            span{
              display: block;
              position:relative;
              width:1.8rem;
              height:1.8rem;
              left:.25rem;
              top:.2rem;
              background:url('../../common/img/cart.png') no-repeat;
              background-size:100%;
            }
          }
        }
      }
      .price {
        display: inline-block;
        vertical-align: 0;
        font-size: .8rem;
        margin-top: .6rem;
        padding-right: .6rem;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        line-height: 1.2rem;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.active {
          color: white;
        }
      }
      .desc {
        position: relative;
        display: inline-block;
        vertical-align: 0;
        margin: .6rem 0 0 .6rem;
        font-size: .5rem;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        line-height: 1.2rem;
      }
    }
    .content-right {
      flex: 0 0 5.25rem;
      font-size:.8rem;
      font-weight: 500;
      background: #2b343c;
      color: rgba(255, 255, 255, 0.4);
      line-height: 2.4rem;
      text-align: center;
      display:flex;
      justify-content: center;
      align-items: center;
      &.enough {
        background: #00b43c;
        color: white;
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 1.6rem;
      bottom: 1.1rem;
      z-index: 200;
      &.drop-enter, &.drop-enter-active {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    transform: translate3d(0, -100%, 0);
    z-index: -1;
    &.transHeight-enter-active, &.transHeight-leave-active {
      transition: all 0.5s;
    }
    &.transHeight-enter, &.transHeight-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 2rem;
      line-height: 2rem;
      background: #f3f5f7;
      border-bottom: 1rem solid rgba(7, 17, 27, 0.1);
      .title {
        display: inline-block;
        font-size: .7rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
        padding-left: .9rem;
      }
      .empty {
        position: absolute;
        right: .4rem;
        font-size: .6rem;
        color: rgb(0, 160, 220);
        padding: 0 .5rem;
      }
    }
    .list-content {
      max-height: 10.85rem;
      overflow: hidden;
      .food {
        position: relative;
        display: flex;
        height: 2.4rem;
        margin: 0 .9rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .name {
          flex: 1;
          font-size: .7rem;
          color: rgb(7, 17, 27);
          line-height: 2.4rem;
          font-weight: 700;
        }
        .price {
          font-size: .7rem;
          font-weight: 700;
          color: rgb(240, 20, 20);
          padding: 0 .6rem 0 .9rem;
          line-height: 2.4rem;
        }
        .cartcontrol-wrapper {
          font-size: .7rem;
          margin-top: .3rem;
        }
      }
    }
  }
}
.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(.5rem);
  z-index: 40;
  &.fade-backdrop-enter-active, &.fade-backdrop-leave-active {
    transition: opacity 0.5s;
  }
  &.fade-backdrop-enter, &.fade-backdrop-leave-active {
    opacity: 0;
  }
}
input {
  -webkit-appearance: none;
}
</style>

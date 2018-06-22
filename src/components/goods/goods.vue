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

  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index"  @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            <!-- <iconMap v-show="item.type>0" :iconType="item.type"></iconMap> -->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item.name" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" :key="food.cookId">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="this.$root.seller.deliveryPrice" :minPrice = "this.$root.seller.minPrice" :selectFoods="selectFoods"></shopCart>
    <foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>
  </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from 'components/shopCart/shopCart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import foodDetail from 'components/foodDetail/foodDetail'
import header from 'components/header/header.vue';
import {_axios, AXIOS} from '../http-common'

export default {
  created () {
    _axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller
    })
    AXIOS.get('/api/cooks').then((res) => {
      this.goods = res.data
      this.$nextTick(() => {
        this._initScroll() // 初始化scroll
        this._calculateHeight() // 初始化列表高度列表
      })
    })
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      foodsScrollY: 0,
      selectedFood: '',
      seller: []
    }
  },
  computed: {
    menuCurrentIndex () {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    _initScroll () {
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监控滚动事件
      this.foodsScroll.on('scroll', (pos) => {
        this.foodsScrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, l = foodList.length; i < l; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    menuClick (index, event) {
      if (!event._constructed) {
        return
      }
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
    },
    goDetail (food) {
      this.selectedFood = food
      this.$nextTick(() => {
        this.$refs.myFood.showToggle()
      })
    }
  },
  components: {
    shopCart,
    cartcontrol,
    foodDetail,
    'v-header': header
  }
}

</script>

<style lang="scss">
  @import "../../common/style/goods.less";
</style>

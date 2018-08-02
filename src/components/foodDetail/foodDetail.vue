<template lang="html">
<div>
  <v-header></v-header>
  <div class="goods">
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <div v-if="this.$root.cookMaterials.length === 0" class="empty-text">您暂时没有选择菜品</div>
      <ul>
        <li v-for="(food,index) in this.$root.cookMaterials" :key="index" class="food-item food-item-hook">
          <div class="icon">
            <img width="57" height="57" :src="food.icon"/>
          </div>
          <div class="content">
            <div class="row">
              <h2>{{food.name}}</h2>
              <h2>{{food.count}}份</h2>
            </div>
            <div v-for="(material,index) in food.cookMaterial" :key="index" class="row">
              <p class="description">{{material.name}}</p>
              <p class="description" style="float:right">{{material.quality}}g</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="this.$root.cookMaterials.length >0" class="save-food" @click="toAn()">分析</div>
 </div>
</template>

<script>
// import iconMap from 'components/iconMap/iconMap'
import BScroll from 'better-scroll'
import shopCart from 'components/shopCart/shopCart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import foodDetail from 'components/foodDetail/foodDetail'
import header from 'components/header/header'
import {AXIOS} from '../http-common'

export default {
  created () {
    AXIOS.get('/api/getmaterial').then((res) => {
      this.$root.cookMaterials = res.data
      this.$nextTick(() => {
        this._initScroll() // 初始化scroll
      })
    })
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      foodsScrollY: 0,
      selectedFood: ''
    }
  },
  methods: {
    _initScroll () {
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监控滚动事件
      this.foodsScroll.on('scroll', (pos) => {
        this.foodsScrollY = Math.abs(Math.round(pos.y))
      })
    },
    toAn () {
      this.$router.push('/seller')
    }
  },
  components: {
    // iconMap,
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

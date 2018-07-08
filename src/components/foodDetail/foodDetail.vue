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
  <div v-if="this.$root.cookMaterials.length >0" class="footer-food" @click="toAn()">分析</div>
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
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-item-hook')
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
.goods {
  display: flex;
  position: absolute;
  top: 120px;
  bottom: 46px;
  width: 100%;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    margin-top: 2px;
    .menu-item-selected {
      background: white;
      font-weight: 700;
      margin-top: -1px;
    }
    .menu-item, .menu-item-selected {
      position: relative;
      display: table;
      height: 54px;
      line-height: 14px;
      width: 56px;
      padding: 0 12px;
      &:last-child:after {
        content: none;
      }
    }
    .menu-item:after {
      position: absolute;
      content: '';
      left: 12px;
      width: 56px;
      bottom: 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .text {
      display: table-cell;
      vertical-align: middle;
      font-size: 12px;
      font-weight: 200;
      white-space: normal;
      line-height: 14px;
      .iconMap {
        vertical-align: middle;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    margin-top: 2px;
    .food-list {
      h1 {
        height: 26px;
        line-height: 26px;
        padding-left: 12px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
    }
    .food-item {
      display: flex;
      position: relative;
      margin: 0 18px;
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .icon {
        flex: 0 0 57px;
      }
      &:last-child {
        border-bottom: none;
      }
      .content {
        flex: 1;
        padding-left: 10px;
        h2 {
          margin: 2px 0 8px 0;
          font-size: 14px;
          line-height: 14px;
          height: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .sell-info, .description {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          .sellCount {
            margin-right: 4px;
          }
        }
        .description {
          font-size: 10px;
          margin-bottom: 8px;
          line-height: 12px;
        }
        .price {
          font-size: 10px;
          font-weight: 700;
          line-height: 24px;
          .newPrice {
            font-size: 14px;
            color: rgb(240, 20, 20);
            .unit {
              font-size: 10px;
              font-weight: normal;
            }
          }
          .oldPrice {
            text-decoration: line-through;
            color: rgb(147, 153, 159);
            padding-left: 4px;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
          z-index: 20;
        }
      }
    }
  }
}
.row {
  display: flex;
  justify-content: space-between;
}
  .empty-text{
    width:100%;
    line-height:2rem;
    text-align: center;
  }
  .footer-food{
    position: fixed;
    bottom:0;
    color:white;
    background:#0a84ec;
    width:100%;
    text-align: center;
    line-height:2rem;
    font-size:0.8rem;
  }
</style>

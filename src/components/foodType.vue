<template>
<div>
  <header>选择就餐种类</header>
  <section>
    <div class="row-line"><p @click="setFoodIndex(1)" :class="foodType === 1?'active':''" class="circle" ></p><p class="text">早餐</p></div>
    <div class="row-line"><p @click="setFoodIndex(2)" :class="foodType === 2?'active':''" class="circle" ></p><p class="text">午餐</p></div>
    <div class="row-line"><p @click="setFoodIndex(3)"  :class="foodType === 3?'active':''" class="circle"></p><p class="text">晚餐</p></div>
  </section>
  <footer @click="saveFoodType">确认</footer>
</div>
</template>

<script>
import {AXIOS} from './http-common.js'
import {fetch,save} from '../components/store'

export default {
  name: 'foodType',
  data () {
    return (
      {
        foodType: 0,
        user: fetch('LOGIN_USER')
      }
    )
  },
  methods: {
    setFoodIndex (i) {
      this.foodType = i
    },
    saveFoodType () {
      if (this.foodType <= 3 && this.foodType >= 1) {
        const _data = {
          foodType: this.foodType,
          userId: this.user.login_user_id
        }
        AXIOS.post('api/saveFoodType', _data).then(() => {
          save('FOOD_TYPE', this.foodType)
          this.$router.push('goods')
        })
      } else {
        alert('请选择当前就餐种类')
      }
    }
  }
}
</script>

<style scoped>
  header{
    width:100%;
    position: fixed;
    top:0;
    color:#f5f0f1;
    background:#8e8b8b;
    text-align:center;
    line-height: 2rem;
  }
  section{
    margin-top:3rem;
    padding:0 1rem;
  }
  .row-line{
    display: flex;
    width:100vw;
    margin:.5rem 0
  }
  .active{
    background-color:red;
  }
  .circle{
    flex:0 0 1rem;
    margin-top:.5rem;
    height:1rem;
    border-radius:1rem;
    border:1px solid black;
    line-height:2rem;
  }
  .text{
    line-height:2rem;
    margin-left:.5rem;
  }
  footer{
    position:fixed;
    bottom:0;
    width:100%;
    text-align:center;
    line-height: 2rem;
    color: #f5f0f1;
    background: #0a84ec;
  }
</style>

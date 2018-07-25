<template lang="html">
<div>
  <v-header></v-header>
  <div id="myChart" :style="{width: '100vw', height: '45vh'}"></div>
  <div class="food-title" v-if="foodTypeText !== ''">当前就餐类型:{{foodTypeText}}</div>
</div>
</template>

<script>
import header from 'components/header/header'
import {AXIOS} from '../http-common'
import {fetch} from '../../components/store'

export default {
  components: {
    'v-header': header
  },
  data () {
    return {
      statisticData: {},
      foodText: ['早餐', '中餐', '晚餐'],
      foodType: fetch('FOOD_TYPE'),
      foodTypeText: ''
    }
  },
  mounted () {
    if (this.foodType !== '' && this.foodType !== undefined) {
      this.foodTypeText = this.foodText[this.foodType - 1]
    }
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let loginUser = window.localStorage.getItem('LOGIN_USER')
      AXIOS.get('/api/analysiscook').then((res) => {
        const selectQuliaty = res.data
        AXIOS.post('api/getdefaultDataByUser', JSON.parse(loginUser)).then((response) => {
          console.log(res)
          const _data = response.data
          // 绘制图表
          myChart.setOption({
            title: {text: '营养成分', textStyle: {fontFamily: '微软雅黑', fontSize: 40}},
            textStyle: {fontFamily: '微软雅黑', fontSize: 40},
            tooltip: {},
            legend: {
              data: ['实际摄入量', '推荐摄入量'],
              align: 'left',
              textStyle: {fontSize: 40}
            },
            xAxis: {
              data: [
                {value: '热量', textStyle: {fontSize: 35}},
                {value: '蛋白质', textStyle: {fontSize: 35}},
                {value: '脂肪', textStyle: {fontSize: 35}},
                {value: '碳水', textStyle: {fontSize: 35}},
                {value: '纤维', textStyle: {fontSize: 35}}
              ]
            },
            yAxis: {
              axisLabel: {
                fontSize: 30
              }
            },
            series: [{
              name: '实际摄入量',
              type: 'bar',
              data: [
                {value: selectQuliaty[0], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[1], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[2], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[3], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[4], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}}
              ]
            }, {
              name: '推荐摄入量',
              type: 'bar',
              data: [
                {value: _data[0], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: _data[1], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: _data[2], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: _data[3], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: 0, textStyle: {fontSize: 30}}
              ]
            }]
          })
        })
      })
    }
  }
}

</script>

<style lang="less">
  .food-title {
    width: 100vw;
    text-align: center;
    margin-top: .5rem;
    color:#0939f4;
  }
  #myChart{
    margin-top:.5rem;
    margin-left: 1rem;
  }
</style>

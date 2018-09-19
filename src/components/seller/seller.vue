<template lang="html">
<div>
  <v-header></v-header>
  <div id="myChart" :style="{width: '100vw', height: '45vh'}"></div>
  <div class="food-title" v-if="foodTypeText !== ''">{{$t('m.current_meal_type')}}:{{foodTypeText}}</div>
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
      foodText: [this.$t('m.breakfast'), this.$t('m.lunch'), this.$t('m.dinner')],
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
            title: {text: this.$t('m.charts_y_text'), textStyle: {fontFamily: '微软雅黑', fontSize: 40}},
            textStyle: {fontFamily: '微软雅黑', fontSize: 40},
            tooltip: {},
            legend: {
              data: [this.$t('m.charts_label[0]'), this.$t('m.charts_label[1]')],
              align: 'left',
              textStyle: {fontSize: 40}
            },
            xAxis: {
              data: [
                {value: this.$t('m.charts_x_text[0]'), textStyle: {fontSize: 35}},
                {value: this.$t('m.charts_x_text[1]'), textStyle: {fontSize: 35}},
                {value: this.$t('m.charts_x_text[2]'), textStyle: {fontSize: 35}},
                {value: this.$t('m.charts_x_text[3]'), textStyle: {fontSize: 35}},
                {value: this.$t('m.charts_x_text[4]'), textStyle: {fontSize: 35}}
              ]
            },
            yAxis: {
              axisLabel: {
                fontSize: 30
              }
            },
            series: [{
              name: this.$t('m.charts_label[0]'),
              type: 'bar',
              data: [
                {value: selectQuliaty[0], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[1], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[2], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[3], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}},
                {value: selectQuliaty[4], textStyle: {fontSize: 35}, tooltip: {textStyle: {fontSize: 40}}}
              ]
            }, {
              name: this.$t('m.charts_label[1]'),
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

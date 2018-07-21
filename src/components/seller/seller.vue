<template lang="html">
<div>
  <v-header></v-header>
  <div id="myChart" :style="{width: '100vw', height: '45vh'}"></div>
 </div>
</template>

<script>
import header from 'components/header/header'
import {AXIOS} from '../http-common'

export default {
  components: {
    'v-header': header
  },
  data () {
    return {
      statisticData: {}
    }
  },
  mounted () {
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
  #myChart{
    margin-top:50px;
    margin-left: 20px;
  }
</style>

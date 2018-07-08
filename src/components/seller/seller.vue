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
          // 绘制图表
          myChart.setOption({
            title: { text: '营养成分' },
            tooltip: {},
            legend: {
              data: ['实际摄入量', '推荐摄入量'],
              align: 'left'
            },
            xAxis: {
              data: ['热量', '蛋白质', '脂肪', '碳水', '纤维']
            },
            yAxis: {},
            series: [{
              name: '实际摄入量',
              type: 'bar',
              data: selectQuliaty
            }, {
              name: '推荐摄入量',
              type: 'bar',
              data: response.data
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

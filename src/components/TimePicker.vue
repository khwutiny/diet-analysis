<template>
  <div>
    <pd-select-box style="position: absolute;bottom: 0;width: 100%">
      <pd-select-item v-for="(el,index) in currentList" :key="index" :listData="Array.from(dataMap[el].List)"  v-model="dataView[el].value"  type="wheel"></pd-select-item>
    </pd-select-box>
  </div>
</template>
<script type='text/ecmascript-6'>
import PdSelectBox from '../components/selectBox'
import PdSelectItem from '../components/selectitem'
const date = new Date()
let dataMap = {
  'year': {
    'value': date.getFullYear(),
    'List': Array.from({length: 200}, (value, index) => 1950 + index)
  },
  'month': {
    'value': date.getMonth() + 1,
    'List': Array.from({length: 12}, (value, index) => 1 + index)
  },
  'day': {
    'value': date.getDate(),
    'List': Array.from({length: 30}, (value, index) => 1 + index)
  },
  'weight': {
    'value': 60,
    'List': Array.from({length: 80}, (value, index) => 45 + index)
  },
  'height': {
    'value': 170,
    'List': Array.from({length: 55}, (value, index) => 145 + index)
  }
}
export default{
  name: 'timePicker',
  components: {PdSelectItem, PdSelectBox},
  props: {
    dataView: {
      type: Object
    },
    currentList: {
      type: Array
    }
  },
  data () {
    return {
      dataMap: dataMap
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="head">编辑信息</div>
    <div class="sexChoice">
      <div class="icon-nan" :class="{'icon-nan-selected' : sex === 'male'}" id="male" @click="setSex('male')"></div>
      <i class="nan-text">男</i>
      <div class="icon-nv" :class="{'icon-nv-selected' : sex === 'female'}" id="female" @click="setSex('female')"></div>
      <i class="nv-text">女</i>
    </div>
    <ul>
      <li class="line">
        <span class="info-id">昵称</span>
        <input class="info-content" maxlength="12" v-model="userName"/>
        <span class="info-logo"><em style="visibility: hidden">></em></span>
      </li>
      <li @click="pickerShow('birth')" class="line">
        <span class="info-id">生日</span>
        <span class="info-content" v-if="dataView['year'].value">{{dataView['year'].value}}.{{dataView['month'].value}}.{{dataView['day'].value}}</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>
      </li>
      <li @click="pickerShow('height')" class="line">
        <span class="info-id">身高</span>
        <span class="info-content" v-if="dataView['height'].value">{{dataView['height'].value}}厘米</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>

      </li>
      <li @click="pickerShow('weight')" class="line">
        <span class="info-id">体重</span>
        <span class="info-content" v-if="dataView['weight'].value">{{dataView['weight'].value}}公斤</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>
      </li>
    </ul>
    <footer class="footer" @click="setInfoById">保存</footer>
    <footer  v-show='isTimePickerShow'>
      <div class="empty" @click="pickerHide"></div>
      <time-picker :dataView="dataView" :currentList="Array.from(currentList)"></time-picker>
    </footer>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker'
let dataView = {
  'year': {
    'value': ''
  },
  'month': {
    'value': ''
  },
  'day': {
    'value': ''
  },
  'weight': {
    'value': ''
  },
  'height': {
    'value': ''
  }
}
export default {
  components: {TimePicker},
  data () {
    return {
      isTimePickerShow: false,
      dataView: dataView,
      currentList: [],
      users: [],
      userName: '',
      id: '',
      sex: ''
    }
  },
  created: function () {
    this.getParas()
  },
  watch: {
    '$route' () {
      this.getParas()
    }
  },
  methods: {
    getParas () {
      let id = this.$route.query.id
      if (id) {
        const _that = this
        const apiUrl = `${this.$API}/getUserById?id=${id}`
        this.$http.get(apiUrl).then(function (res) { _that.init(res.data) })
      }
    },
    init (user) {
      if (user) {
        this.id = user.id
        this.userName = user.userName
        this.sex = user.sex
        const _birth = user.birthday
        if (_birth && _birth.indexOf('.') > -1) {
          dataView['year'].value = _birth.split('.')[0]
          dataView['month'].value = _birth.split('.')[1]
          dataView['day'].value = _birth.split('.')[2]
        } else {
          dataView['year'].value = ''
          dataView['year'].value = ''
          dataView['year'].value = ''
        }
        dataView['height'].value = user.height
        dataView['weight'].value = user.weight
      }
      this.dataView = dataView
    },
    setSex (sex) {
      if (!this.sex) {
        this.sex = sex
      }
    },
    pickerShow (type) {
      this.isTimePickerShow = true
      if (type === 'birth') {
        this.currentList = ['year', 'month', 'day']
      } else {
        this.currentList = [type]
      }
    },
    pickerHide () {
      this.isTimePickerShow = false
    },
    setInfoById () {
      let userJson = {
        id: this.id,
        userName: this.userName,
        sex: this.sex,
        birthday: `${dataView['year'].value}.${dataView['month'].value}.${dataView['day'].value}`,
        weight: dataView['weight'].value,
        height: dataView['height'].value
      }
      let apiUrl = `${this.$API}/updateUser`
      if (!this.id) {
        apiUrl = `${this.$API}/setUser`
      }
      const _that = this
      this.$http.post(apiUrl, userJson).then(function () {
        _that.$msgBox.showMsgBox({
          content: '添加用户成功',
          isShowConfirmBtn: false,
          isShowCancelBtn: false
        })
        _that.$router.push({
          path: '/user',
          name: 'users'
        })
      })
    }
  }
}
</script>

<style>
@import "../../common/style/userInfo.less";
</style>

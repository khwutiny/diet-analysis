<template>
  <div class="container">
    <div class="head" v-text="$t('m.edit_user_header')"></div>
    <div class="sexChoice">
      <div class="icon-nan" :class="{'icon-nan-selected' : sex == 'male'}" id="male" @click="setSex('male')"></div>
      <i class="nan-text" v-text="$t('m.male')"></i>
      <div class="icon-nv" :class="{'icon-nv-selected' : sex == 'female'}" id="female" @click="setSex('female')"></div>
      <i class="nv-text" v-text="$t('m.female')"></i>
    </div>
    <ul>
      <li class="line">
        <span class="info-id" v-text="$t('m.nick_name')"></span>
        <input class="info-content" maxlength="12" v-model="userName"/>
        <span class="info-logo"><em style="visibility: hidden">></em></span>
      </li>
      <li @click="pickerShow('birth')" class="line">
        <span class="info-id" v-text="$t('m.birthday')"></span>
        <span class="info-content" v-if="dataView['year'].value">{{dataView['year'].value}}.{{dataView['month'].value}}.{{dataView['day'].value}}</span>
        <span class="info-content" v-text="$t('m.birthday')" v-else></span>
        <span class="info-logo"><em>></em></span>
      </li>
      <li @click="pickerShow('height')" class="line">
        <span class="info-id" v-text="$t('m.height')"></span>
        <span class="info-content" v-if="dataView['height'].value">{{dataView['height'].value}}厘米</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>

      </li>
      <li @click="pickerShow('weight')" class="line">
        <span class="info-id" v-text="$t('m.weight')"></span>
        <span class="info-content" v-if="dataView['weight'].value">{{dataView['weight'].value}}公斤</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>
      </li>
      <li @click="pickSports()" class="line">
        <span class="info-id" v-text="$t('m.sportsType')"></span>
        <span class="info-content" v-if="sportsType !== 0">{{sportsText[sportsType-1]}}</span>
        <span class="info-content" v-else></span>
        <span class="info-logo"><em>></em></span>
      </li>
    </ul>
    <footer class="footer" @click="setInfoById" v-text="$t('m.save')"></footer>
    <footer  v-show='isTimePickerShow'>
      <div class="empty" @click="pickerHide"></div>
      <time-picker :dataView="dataView" :currentList="Array.from(currentList)"></time-picker>
    </footer>
    <footer v-show='isSportsPickerShow'>
      <div class="empty" @click="sportPickerHide"></div>
      <div class="sports-dialog">
        <div v-for="(text,index) in sportsText" :key="index" class="sports-row">
          <p :class="{'active':sportsType === (index+1)}" class="circle" @click="setSportsType((index+1))"></p>
          <p class="sports-text">{{text}}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import TimePicker from '../components/TimePicker'
import {AXIOS} from '../components/http-common'
import {fetch} from '../components/store'

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
      sportsText: [this.$t('m.sportsText[0]'), this.$t('m.sportsText[1]'), this.$t('m.sportsText[2]'), this.$t('m.sportsText[3]'), this.$t('m.sportsText[3]')],
      isTimePickerShow: false,
      isSportsPickerShow: false,
      sportsType: 0,
      dataView: dataView,
      currentList: [],
      users: [],
      userName: '',
      id: '',
      sex: '',
      loginUserId: ''
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
        AXIOS.get(`/api/getUserById?id=${id}`).then((res) => {
          this.init(res.data)
        })
      }
    },
    pickSports () {
      this.isSportsPickerShow = true
    },
    init (user) {
      if (user) {
        this.id = user.id
        this.userName = user.userName
        this.sex = user.sex
        this.sportsType = user.sportsType
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
      console.log(sex)
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
    sportPickerHide () {
      this.isSportsPickerShow = false
    },
    setSportsType (type) {
      this.sportsType = type
      this.sportPickerHide()
    },
    getLoginUser () {
      let loginUser = window.localStorage.getItem('LOGIN_USER')
      this.loginUserId = JSON.parse(loginUser).id
    },
    setInfoById () {
      let userJson = {
        id: this.id,
        userName: this.userName,
        sex: this.sex,
        birthday: `${dataView['year'].value}.${dataView['month'].value}.${dataView['day'].value}`,
        weight: dataView['weight'].value,
        height: dataView['height'].value,
        creatuserid: fetch('LOGIN_USER').login_user_id,
        sportsType: this.sportsType
      }
      let apiUrl = `api/updateUser`
      if (!this.id) {
        apiUrl = `api/setUser`
      }
      AXIOS.post(apiUrl, userJson).then(() => {
        this.$router.push({
          path: '/user',
          name: 'users'
        })
      })
    }
  }
}
</script>

<style>
@import "../common/style/userInfo.less";
</style>

<template>
  <div class="container">
    <div class="head">选择角色</div>
    <ul>
      <slide-del v-for="user in users" :key="user.id"  del-text="删除" @del-click="del(user.id)">
        <div slot="item" class="line">
          <span :class="{'circle':!is_selected_id(user.id),'red-choice':is_selected_id(user.id)}" v-on:click.stop="setSelectedId(user.id)"></span>
          <span v-if="user.sex == 'female'" class="icon-nvtouxiang"></span>
          <span v-else-if="user.sex == 'male'" class="icon-nantouxiang"></span>
          <span class="user-content" @click="toInfo(user)">{{user.userName}}</span>
        </div>
      </slide-del>
      <div @click="toInfo" class="button">
        <span class="icon-icon02 add-logo"></span>
        <span class="add-text">增加新用户</span>
      </div>
    </ul>
    <div class="footer" @click="saveUserToLogin">确认</div>
  </div>
</template>

<script>
import SlideDel from '../components/slideDetele'
import {AXIOS} from '../components/http-common'
import {fetch} from '../components/store'

let delFlag = true
export default {
  name: 'users',
  components: {SlideDel},
  data () {
    return {
      users: [],
      selected_ids: [],
      id: '',
      login_user: {}
    }
  },
  created: function () {
    this.login_user = fetch(this.LOGIN_KEY)
    this.getUser()
  },
  watch: {
    'router' () {
      this.getUser()
    }
  },
  methods: {
    is_selected_id: function (id) {
      return this.selected_ids.indexOf(id) > -1
    },
    del (id) {
      if (delFlag) {
        if (confirm('是否确认删除该用户')) {
          delFlag = false
          AXIOS.post('api/delUser', {id: id}).then(() => {
            delFlag = true
            alert('删除成功')
            this.getUser()
          })
        }
      }
    },
    getUser () {
      AXIOS.get('api/getUsers').then((res) => {
        this.users = res.data
        this.users.forEach((user) => {
          if (user.groupId == this.login_user.login_user_id) {
            this.selected_ids.push(user.id)
          }
        })
      })
    },
    setSelectedId (id) {
      if (!this.is_selected_id(id)) {
        this.selected_ids.push(id)
      } else {
        this.selected_ids.splice(this.selected_ids.indexOf(id), 1)
      }
    },
    saveUserToLogin () {
      const data = {
        login_user_id: this.login_user.login_user_id,
        selected_ids: this.selected_ids
      }
      AXIOS.post('api/saveUserToLogin', data).then((res) => {
        if (res.data.code == 0) {
          this.$router.push('goods')
        } else {
          alert('添加人员失败，请稍后重试')
        }
      })
    },
    toInfo (user) {
      this.$router.push({
        path: '/info',
        name: 'UserInfo',
        query: {
          id: user.id
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "../common/style/users.less";
</style>

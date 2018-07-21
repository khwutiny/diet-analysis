<template>
  <div class="container">
    <div class="head">``</div>
    <ul>
      <slide-del v-for="user in users" :key="user.id"  del-text="删除" @del-click="del(user.id)">
        <div slot="item" class="line" @click="toInfo(user)">
          <span v-if="user.sex == 'female'" class="icon-nvtouxiang"></span>
          <span v-else-if="user.sex == 'male'" class="icon-nantouxiang"></span>
          <span class="user-content">{{user.userName}}</span>
        </div>
      </slide-del>
      <div @click="toInfo" class="button">
        <span class="icon-icon02 add-logo"></span>
        <span class="add-text">增加新用户</span>
      </div>
    </ul>
  </div>
</template>

<script>
import SlideDel from 'components/slideDetele'
let delFlag = true
export default {
  name: 'users',
  components: {SlideDel},
  data () {
    return {
      users: []
    }
  },
  created: function () {
    this.getUser()
  },
  watch: {
    'router' () {
      this.getUser()
    }
  },
  methods: {
    del (id) {
      if (delFlag) {
        if (confirm('是否确认删除该用户')) {
          delFlag = false
          const delUrl = `${this.$API}/delUser`
          const _that = this
          this.$http.post(delUrl, {id: id}).then(function (res) {
            delFlag = true
            alert('删除成功')
            _that.getUser()
          })
        }
      }
    },
    getUser () {
      const _that = this
      const url = `${this.$API}/getUsers`
      this.$http.get(url).then(function (res) {
        _that.users = res.data
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
  @import "../../common/style/userInfo";
</style>

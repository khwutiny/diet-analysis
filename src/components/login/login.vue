<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay? '账户登录':'密码登录'" goBack="true"></head-top>
    <form class="loginForm">
      <section class="input_container">
        <input type="text" placeholder="手机号" maxlength="11" v-model="userAccount">
      </section>
      <section class="input_container">
        <input type="text" placeholder="密码" maxlength="8" v-model="passWord">
      </section>
    </form>
    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="login_container" @click="mobileLogin">登  录</div>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import {AXIOS} from '../http-common'
import {save} from '../store'

export default {
  data () {
    return {
      loginWay: true,
      userAccount: null,
      passWord: null
    }
  },
  components: {
    headTop
  },
  computed: {
    right_phone_number: function () {
      return /^1\d{10}$/gi.test(this.userAccount)
    }
  },
  methods: {
    rightPhoneNumber () {
      return /^1\d{10}$/gi.test(this.userAccount)
    },
    // 发送登录信息
    mobileLogin () {
      if (!this.userAccount) {
        alert('请输入手机号')
      } else if (!this.passWord) {
        alert('请输入密码')
      } else if (!this.right_phone_number) {
        alert('请输入正确手机号')
      } else if (this.passWord.length < 8) {
        alert('请输入8位密码')
      } else {
        const data = {
          account: this.userAccount,
          password: this.passWord
        }
        AXIOS.post('api/login', data).then((res) => {
          if (res.data.code === 0) {
            const user = res.data.data
            save(this.LOGIN_KEY, user)
            this.$router.push('user')
          } else {
            alert('登录失败，请重试')
          }
        })
      }
    }
  }
}

</script>

<style lang="scss">
  @import '../../style/mixin';
  .loginContainer {
    padding-top: 1.95rem;
    p, span, input {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
  }

  .change_login {
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
  }

  .loginForm {
    background-color: #fff;
    margin-top: .6rem;
    .input_container {
      display: flex;
      justify-content: space-between;
      padding: .36rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input {
        @include sc(1.2rem, #666);
        width:10.5rem;
        line-height:2rem;
        padding-left: 1rem;
      }
      input::-webkit-input-placeholder {
        font-size:.8rem;
        color:grey;
      }
      button {
        @include sc(.65rem, #fff);
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number {
        background-color: #4cd964;
      }
    }
    .phone_number {
      padding: .3rem .8rem;
    }
    .captcha_code_container {
      height: 2.2rem;
      .img_change_img {
        display: flex;
        align-items: center;
        img {
          @include wh(3.5rem, 1.5rem);
          margin-right: .2rem;
        }
        .change_img {
          display: flex;
          flex-direction:column;
          flex-wrap: wrap;
          width: 2rem;
          justify-content: center;
          p {
            @include sc(.55rem, #666);
          }
          p:nth-of-type(2) {
            color: #3b95e9;
            margin-top: .2rem;
          }
        }
      }
    }
  }

  .login_tips {
    @include sc(.5rem, red);
    margin:.5rem 0;
    padding: .4rem .6rem;
    line-height: .5rem;
    a {
      color: #3b95e9;
    }
  }

  .login_container {
    margin: 0 .5rem 1rem;
    @include sc(1rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    font-weight:bold;
  }

  .button_switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .circle_button {
      transition: all .3s;
      position: absolute;
      top: -0.2rem;
      z-index: 1;
      left: -0.3rem;
      @include wh(1.2rem, 1.2rem);
      box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
      background-color: #f1f1f1;
      border-radius: 50%;
    }
    .trans_to_right {
      transform: translateX(1.3rem);
    }
    span {
      @include sc(.45rem, #fff);
      transform: translateY(.05rem);
      line-height: .6rem;
    }
    span:nth-of-type(2) {
      transform: translateY(-.08rem);
    }
  }

  .change_to_text {
    background-color: #4cd964;
  }

  .to_forget {
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
</style>

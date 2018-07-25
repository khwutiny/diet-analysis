import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import foodDetail from 'components/foodDetail/foodDetail'
import login from 'components/login/login'
import vueTap from 'v-tap'
import Vuex from 'vuex'
import echarts from 'echarts'
import userInfo from 'components/userInfo'
import users from 'components/users'
import foodType from 'components/foodType'
Vue.config.productionTip = false
Vue.prototype.LOGIN_KEY = 'LOGIN_USER'
Vue.prototype.$echarts = echarts
Vue.use(vueTap)
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  // 添加的商品元素
  addCartEl: {},
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
const router = new VueRouter({
  routes: [{
    path: '/goods',
    component: goods
  }, {
    path: '',
    redirect: '/user'
  }, {
    path: '/foodDetail',
    component: foodDetail
  }, {
    path: '/login',
    component: login
  }, {
    path: '/seller',
    component: seller
  }, {
    path: '/info',
    name: 'UserInfo',
    component: userInfo
  }, {
    path: '/user',
    name: 'users',
    component: users
  },
  {
    path: '/foodType',
    name: 'foodType',
    component: foodType
  }
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 如果即将进入登录路由，则直接放行
    next()
  } else {
    if (!localStorage.getItem('LOGIN_USER')) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  data: {
    selectCooks: [],
    cookMaterials: [],
    seller: {},
    eventHub: new Vue()

  }
}).$mount('#app')

// router.push('login')


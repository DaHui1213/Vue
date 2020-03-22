import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 拦截路由导航守卫
router.beforeEach((to, from, next) => {
  // to 从哪里来
  // from 去哪里
  // next 是一个函数 放行 next() 放行 next('/login) 强制跳转
  if (to.path == '/login') {
    next()
  } else {
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      next('/login')
    } else {
      next();
    }
  }
})

export default router

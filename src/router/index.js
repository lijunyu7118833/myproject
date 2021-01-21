import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import article from '@/components/article'
import {Message} from 'element-ui'
import user from '@/components/user'


Vue.use(Router)

Vue.prototype.$message = Message

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/article',
          name: '文章管理',
          component: article
        },
        {
          path: '/user',
          name: '用户',
          component: user
        }
      ],


    }
  ]
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("token") == null) {
    if (to.path !== '/login') {
      Message('检测到您未登录');
      return next('/login')
    } else {
      return next()
    }


  } else {
    if (to.path !== '/login') {
      return next();
    } else {
      Message('您已登录');
      return next('/')
    }
  }


})


export default router

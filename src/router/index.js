import Vue from 'vue'
import Router from 'vue-router'

import msite from '@/pages/msite/msite'
import login from '@/pages/login/login'
import order from '@/pages/order/order'

import shopStroe from '@/pages/shop/shop'
import foodType from '@/pages/foodType/foodType'
import shopDetail from '@/pages/shopDetail/shopDetail'
import search from '@/pages/search/search';
import user from '@/pages/user/user';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'msite',
      component: msite
    },
    {
      path:'/login',
      name:login,
      component:login
    },
    {
      path:'/shopStroe',
      name:shopStroe,
      component:shopStroe,
    },
    {
      path:'/order',
      name:order,
      component:order
    },
    {
      path:'/shopDetail',
      name:shopDetail,
      component:shopDetail
    },
    {
      path:'/foodType',
      name:foodType,
      component:foodType
    },
    {
      path:'/search',
      name:search,
      component:search
    },
    {
      path:'/user',
      name:user,
      component:user
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const Index = ()=>import('@/views/Index');
const Detail = ()=>import('@/views/Detail');
const Img = ()=>import('@/views/Img');
const ColorType = ()=>import('@/views/ColorType');
const CarType = ()=>import('@/views/CarType');
const Quotation = ()=>import('@/views/Quotation');
const Type = ()=>import('@/views/Type');
const Login = ()=>import('@/views/Login');

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path:'/index',
      component: Index
    },
    {
      path:'/detail',
      name:'Detail',
      component: Detail
    },
    {
      path:'/img',
      name:'img',
      component: Img
    },
    {
      path:'/colorType',
      component: ColorType
    },
    {
      path:'/carType',
      component: CarType
    },
    {
      path:'/type',
      component: Type
    },
    {
      path:'/quotation',
      name:'Quotation',
      component: Quotation
    },
    {
      path:'*',
      redirect: '/index'
    }
  ]
})

// 全局导航守卫
router.beforeEach((to, from ,next)=>{
  store.commit('changeLoading', true);
  let login = window.localStorage.getItem('login') || '';
    if (!login && to.path != '/login'){
        next('/login');
    }else{
        next();
    }
})

router.afterEach(()=>{
  setTimeout(()=>{
    store.commit('changeLoading', false);
  }, 300);
})

export default router;
import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex数据管理
import store from './store'
// vue懒加载
import VueLazyload from 'vue-lazyload'

// 引入通用弹框
import Alert from '@/components/Alert';

// 去掉生成环境提示
Vue.config.productionTip = false;

// 注入通用Alert弹框
Vue.prototype.$alert = Alert;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/timg2.gif'),
  attempt: 1
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


// 测试同时弹出多个
// for(let i=0;i<10;i++){
//   Alert('dev.chelun.com', i, ()=>{
//       console.log('点击了确定按钮', i);
//   })
// }
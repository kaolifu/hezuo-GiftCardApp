import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'http://127.0.0.1:3008'

//请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中'
  })
}
//响应拦截器
$http.afterRequest = function(options) {
  uni.hideLoading()
}


// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import store from '@/store/store.js'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif
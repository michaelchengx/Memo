// 引入Vue
import Vue from 'vue'
//引入app组件，它是所有组件的父组件
import App from './App.vue'
//引入vuex插件
import Vuex from 'vuex'

//使用vuex插件
Vue.use(Vuex)
//关闭Vue开发工具生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  
  beforeCreate() {
    Vue.prototype.$bus =this
  }
}).$mount('#app')

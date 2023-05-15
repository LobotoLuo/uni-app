import Vue from 'vue'
import App from './App'
import store from './utils/store.js'
import {http} from '@/api/http.js'
import {pass,receive,toast,modal} from './utils/common.js'
Vue.config.productionTip = false
App.mpType = 'app'
//页面传参方法 用this.$pass调用
Vue.prototype.$pass = pass;
//页面接收参数方法 用this.$reveive调用
Vue.prototype.$receive = receive;
//数据请求
Vue.prototype.$http =new http();
//toast
Vue.prototype.$toast = toast;
//modal
Vue.prototype.$modal = modal;
//vuex
Vue.prototype.$store = store;

const app = new Vue({
    ...App,
	store:store,
})
app.$mount()

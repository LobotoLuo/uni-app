import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		/* 倒计时时间 */
		countdown:24*60*60,
		//购物车列表
		cartgoodslist: [],
		//搜索历史列表
		recordlist: [],
		//收藏列表
		collectlist: [],
		//是否收藏
		iscollect: false

	},
	mutations: {
		//添加商品到购物车
		addgoods(state, newval) {
			//判断购物车中是否存在和添加的商品id,color一致的商品
			let item = state.cartgoodslist.find(item => {
				return item.id == newval.id && item.color == newval.color;
			});
			//如果存在id,color一样的,将数量加一
			if (item) {
				item.num = item.num+newval.num;
			} else {
				//如果不存在id,color一样的,购物车列表中新添加一件商品
				state.cartgoodslist.push(newval);
			}
		},
		/* 添加搜索记录 */
		addrecord(state, newval) {
			state.recordlist.push(newval);
		},
		/* 清除搜索记录 */
		clearrecord(state) {
			state.recordlist = [];
		},
		/* 购物车结算 */
		clearcart(state) {
			state.cartgoodslist = state.cartgoodslist.filter(item => {
				return item.select == false;
			})
		},
		/* 添加收藏 */
		addcollect(state, newval) {
			state.collectlist.push(newval);
		},
		/* 删除收藏 */
		delecollect(state, id) {
			state.collectlist = state.collectlist.filter(item => {
				return id != item.id;
			})
		},
		/* 判断是否收藏 */
		checkcollect(state, id) {
			state.iscollect = (state.collectlist.find(item => {
				return id == item.id;
			}) ? true : false);
		},
		/* 收藏状态取反 */
		togglecollect(state) {
			state.iscollect = !state.iscollect;
		},
		/* 开始倒计时 */
        startCountdown(state){
			if(state.countdown==0)return;
			state.countdown--;
		}
	},

	getters: {
		/* 总价 */
		totalPrice(state) {
			return state.cartgoodslist.filter((item) => {
				return item.select;
			}).map((item) => {
				return parseInt(item.num) * parseInt(item.price);
			}).reduce((a, b) => {
				return a + b;
			}, 0)
		},
		/* 获取倒计时剩下的小时 */
		getHours(state){
			let hours = Math.floor(state.countdown/3600);
			return hours;
		},
		/* 获取倒计时剩下的分钟 */
		getMinutes(state){
			let hours = Math.floor(state.countdown/3600);
			let minutes = Math.floor((state.countdown-hours*3600)/60);
			return minutes;
		},
		/* 获取倒计时剩下的秒数 */
		getSeconds(state){
			let hours = Math.floor(state.countdown/3600);
			let minutes = Math.floor((state.countdown-hours*3600)/60);
			let seconds = state.countdown-hours*3600-minutes*60;
			return seconds;
		}

	},
	plugins: [
		createPersistedState(),
	]
})

export default store

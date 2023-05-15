import {toast} from '@/utils/common.js'
export class http {
	pre_url = 'http://127.0.0.1:3000'
	get(url, para = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${this.pre_url}` + url,
				data: para,
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code == 1) {
						resolve(res.data);
					} else {
						toast(res.data.msg)
					}
				},
				fail: (err) => {
					toast(err);
				},
			});
		})
	};
	post(url, para = {}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${this.pre_url}` + url,
				data: para,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code == 1) {
						resolve(res.data);
					} else {
						toast(res.data.msg)
					}
				},
				fail: (err) => {
					toast(err);
				},
			});
		})
	}
	
	/* 注册接口 */
	registerReq(name,psw,sex='男'){
		return this.get('/register',{name,psw,sex})
	};
	/* 登录接口 */
	loginReq(name,psw){
		return this.get('/login',{name,psw})
	};
	/* 今日特惠接口 */
	discountReq(){
		return this.get('/discount')
	}
	/* 签到列表接口 */
	signlistReq(){
		let user = uni.getStorageSync('user');
		if (!user) return;
		return this.get('/signlist',{name:user.name})
	};
	/* 今日签到接口 */
	signReq(){
		let user = uni.getStorageSync('user');
		if (!user) return;
		return this.get('/sign',{name:user.name})
	};
	/* 今日是否签到接口 */
	issignReq(){
		let user = uni.getStorageSync('user');
		if (!user) return;
		return this.get('/issign',{name:user.name})
	};
	/* 开通会员接口 */
	vipReq(){
		let user = uni.getStorageSync('user');
		if (!user) return;
		return this.get('/vip',{name:user.name})
	};
	/* 判断是否是会员接口 */
	isvipReq(){
		let user = uni.getStorageSync('user');
		if (!user) return;
		return this.get('/isvip',{name:user.name})
	};
	/* 精选分类接口 */
	categoryReq(){
		return this.get('/category');
	};
	/* 精选分类列表接口 */
	categorylistReq(categoryid){
		return this.post('/categorylist',{categoryid})
	};
	/* 商品评价接口 */
	commentsReq(goodsid){
		return this.post('/comments',{goodsid})
	};
	/* 搜索商品接口 */
	searchReq(keywords){
		return this.post('/search',{keywords})
	}
	/* 订阅接口 */
	shopsReq(){
		return this.get('/shops');
	};
	/* 首页小图标接口 */
	mainiconReq(){
		return this.get('/mainicon');
	};
	/* 首页商品接口 */
	maingoodsReq(){
		return this.get('/maingoods');
	}
	
}

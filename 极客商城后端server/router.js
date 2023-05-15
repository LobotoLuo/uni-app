const express = require('express')
const fs = require('fs')
const moment = require('moment');
const { userInfo } = require('os');
let today = null;
//创建一个路由容器
const router = express.Router();
//当服务器收到get请求 / 的时候 执行回调处理函数
router.get('/', (req, res) => {
	res.render('doc.html');
})

const data = require('./data.js')
/* 1.注册接口 */
router.get('/register', function (req, res) {
	/* 账号:name,密码:psw,性别:sex */
	req.query ??= {
		name: '',
		psw: '',
		sex: '男'
	};
	let {
		name,
		psw
	} = req.query;
	if (!name || !psw) {
		res.send({
			code: 0,
			msg: '账号,密码不能为空'
		});
	} else {
		fs.readFile('./files/' + name, function (err, data1) {
			if (err) {
				req.query.isvip = false;
				req.query.issign = data.signlist;
				fs.writeFile('./files/' + name, JSON.stringify(req.query), function (err, data) {
					if (!err) {
						res.send({
							code: 1,
							msg: '注册成功!'
						});
					} else {
						res.send({
							code: 0,
							msg: '注册失败!'
						});
					}
				})
			} else {
				res.send({
					code: 0,
					msg: '该账号已经被注册!'
				});
			}
		})
	}

});

/* 2.登录接口 */
router.get('/login', function (req, res) {
	/* 账号:name,密码:psw */
	req.query ??= {
		name: '',
		psw: ''
	};
	let {
		name,
		psw
	} = req.query;
	if (!name || !psw) {
		res.send({
			code: 0,
			msg: '账号,密码不能为空'
		});
	} else {
		fs.readFile('./files/' + name, function (err, data) {
			if (err) {
				res.send({
					code: 0,
					msg: '账号不存在'
				});

			} else {
				let user = JSON.parse(data);
				if (psw !== user.psw) {
					res.send({
						code: 0,
						msg: '账号密码不匹配!'
					});
				} else {
					res.send({
						code: 1,
						msg: '登录成功!',
						data: user
					});
				}
			}
		})
	}
})

/* 签到列表接口 */
router.get('/signlist', (req, res) => {
	req.query.name ??= '';
	let {
		name
	} = req.query;
	fs.readFile('./files/' + name, (err, data1) => {
		if (!err) {
			let user = JSON.parse(data1);
			if (user.issign) {
				res.send({
					code: 1,
					msg: '获取签到列表成功',
					data: user.issign
				});
			} else {
				res.send({
					code: 1,
					msg: '获取签到列表成功',
					data: data.signlist
				});
			}

		} else {
			res.send({
				code: 0,
				msg: '用户名不存在'
			});
		}
	})
})

/* 今日签到接口 */
router.get('/sign', (req, res) => {
	req.query.name ??= '';
	let {
		name
	} = req.query;
	if (name) {
		fs.readFile('./files/' + name, (err, data) => {
			if (!err) {
				let user = JSON.parse(data);
				/* 如果是第一天签到 */
				if (!user.signtime) {
					user.signtime = +new Date();
					user.issign[0].signin = true;
					fs.writeFile('./files/' + name, JSON.stringify(user), (err) => {
						if (!err) {

							res.send({
								code: 1,
								msg: '签到成功'
							});
						} else {
							res.send({
								code: 0,
								msg: '签到失败'
							});
						}
					})
					return;
				}
				let now = +new Date();
				console.log('now', now - user.signtime)
				if (parseInt(now) - parseInt(user.signtime) < 1000 * 60 * 60 * 24) {
					res.send({
						code: 0,
						msg: '你今天已经签过到了!'
					});
					return;
				}
				//已经签到天数
				let sign_day = user.issign.filter(item => {
					return item.signin;
				}).length;
				if (sign_day >= 7) {
					res.send({
						code: 0,
						msg: '你已经签到7天,无需再签到!'
					});
					return;
				}
				user.signtime = +new Date();
				user.issign[sign_day].signin = true;
				fs.writeFile('./files/' + name, JSON.stringify(user), (err) => {
					if (!err) {

						res.send({
							code: 1,
							msg: '签到成功'
						});
					} else {
						res.send({
							code: 0,
							msg: '签到失败'
						});
					}
				})
			} else {
				res.send({
					code: 0,
					msg: '用户不存在'
				})
			}
		})
	} else {
		res.send({
			code: 0,
			msg: '用户名没有传'
		})
	}
})
/* 判断今日是否已经签到接口 */
router.get('/issign', (req, res) => {
	req.query.name ??= '';
	let {
		name
	} = req.query;
	fs.readFile('./files/' + name, (err, data) => {
		if (!err) {
			let user = JSON.parse(data);
			let now = +new Date();
			if(user.signtime&&now-user.signtime<1000*60*60*24){
				res.send({
					code: 1,
					msg: '今日已经签到',
					issigned:true
				});
			}else{
				res.send({
					code: 1,
					msg: '今日未签到',
					issigned:false
				});
			}

		} else {
			res.send({
				code: 0,
				msg: '用户名不存在'
			});
		}
	})
})

/* 开通会员接口 */
router.get('/vip', (req, res) => {
	req.query.name ??= '';
	let {
		name
	} = req.query;
	if (name) {
		fs.readFile('./files/' + name, (err, data) => {
			if (!err) {
				let user = JSON.parse(data);
				user.isvip = true;
				fs.writeFile('./files/' + name, JSON.stringify(user), (err) => {
					if (!err) {
						res.send({
							code: 1,
							msg: '开通会员成功'
						});
					} else {
						res.send({
							code: 0,
							msg: '开通会员失败'
						});
					}
				})
			} else {
				res.send({
					code: 0,
					msg: '用户不存在'
				})
			}
		})
	} else {
		res.send({
			code: 0,
			msg: '用户不存在'
		})
	}
})
/* 判断是否是会员接口 */
router.get('/isvip', (req, res) => {

	req.query.name ??= '';
	let {
		name
	} = req.query;
	fs.readFile('./files/' + name, (err, data) => {
		if (!err) {
			let user = JSON.parse(data);
			if (user.isvip) {
				let list = [
					'全场商品9.5折起购',
					'VIP会员可以购买VIP商品',
					'VIP会员可以参与商品品质评分',
					'VIP会员有专享图标可在首页等版块进行展示',
					'VIP会员享受优先服务特权',
					"VIP会员所有商品免配送费",
					"VIP会员家属购买衣物享受8折优惠",
					"VIP会员积分1.5倍获取",
					"VIP会员年终活动有概率让马云清空购物车"
				]
				res.send({
					code: 1,
					msg: '您已经是会员',
					data: list,
					isvip:true
				});
			} else {
				res.send({
					code: 1,
					msg: '您还不是会员',
					isvip:false
				});
			}

		} else {
			res.send({
				code: 0,
				msg: '用户名不存在'
			});
		}
	})
})
//搜索接口
function searchReq(searchstr) {
	var ary = data.maingoods;
	var ary1 = [];
	if (searchstr === '') {
		ary1 = [];
	} else {
		ary1 = ary.filter((item) => {
			return item.name.includes(searchstr);
		})
	}

	return ary1;
}

//根据精选分类的id （不传参数默认显示全部） 获取精选列表
function categoryListReq(id) {
	let mdata = data.maingoods;
	if (id && id !== '0') {
		var obj = {
			2000: [
				...mdata
			],

			2001: [
				mdata[5],
				mdata[6],
				mdata[7],
			],

			2002: [
				mdata[8],
				mdata[9],
				mdata[13],
				mdata[14]
			],

			2003: [
				mdata[1],
				mdata[3],
				mdata[5],
				mdata[7],
			],

			2004: [
				mdata[9],
				mdata[10],
				mdata[11],
				mdata[12]
			],

			2005: [
				mdata[2],
				mdata[4],
				mdata[6],
				mdata[8],
			]
		}
		var ary = obj[id];

		return ary;
	} else if (id == '0') {

		return mdata;
	} else {
		return mdata;
	}

}

//首页小图片数据接口
router.get('/mainicon', (req, res) => {
	res.send({
		code: 1,
		data: data.mainicon
	})
})
//首页商品接口
router.get('/maingoods', (req, res) => {
	res.send({
		code: 1,
		data: data.maingoods
	})
})
//今日特惠接口
router.get('/discount', (req, res) => {
	res.send({
		code: 1,
		data: data.maingoods.slice(0,3)
	})
})
//精选分类接口
router.get('/category', (req, res) => {
	res.send({
		code: 1,
		data: data.category
	});
})
//根据精选分类的id （不传参数默认显示全部） 获取精选列表
router.post('/categorylist', (req, res) => {
	var para = (req.body);
	var list = categoryListReq(para.categoryid);
	res.send({
		code: 1,
		data: list
	})
})
//订阅的店铺接口
router.get('/shops', (req, res) => {
	res.send({
		code: 1,
		data: data.shops
	});
})
//商品评价接口
router.post('/comments', (req, res) => {
	let goodsid = req.body.goodsid ??= '';
	if (goodsid) {
		let mdata = data.comments[goodsid];
		res.send({
			code: 1,
			data: mdata,
			msg: '获取评价列表成功'
		});
	} else {
		res.send({
			code: 0,
			msg: '获取评价列表失败'
		});
	}

})
//搜索接口
router.post('/search', (req, res) => {
	var para = (req.body);
	var list = searchReq(para.keywords);
	res.send({
		code: 1,
		data: list
	})
})


module.exports = router

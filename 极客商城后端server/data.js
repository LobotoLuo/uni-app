const fs = require('fs');
const moment = require('moment');
/* 日期格式化 */
function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

//随机生成订单编号
function orderId() {
	var orderCode = '';
	for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
	{
		orderCode += Math.floor(Math.random() * 10);
	}
	orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
	console.log(orderCode)
	return orderCode;
}
//随机生成价格
function orderPrice() {
	let price = Math.floor(Math.random() * 500) + 10;
	return price;
}
//随机时间
function randomTime() {
	let min = +new Date('2000-12-17T03:24:00');
	let max = +new Date();
	let r = Math.floor((Math.random() * min) + (max - min));
	let t = new Date(r);
	let rr = dateFormat('YYYY-mm-dd', t);
	return rr;
}
//随机课程名
function randomCourse() {
	let courseAry = ['html', 'css', 'javascript', 'jquery', 'bootstrap', 'nodejs'];
	let count = Math.floor(Math.random() * 6);
	return courseAry[count];
}
//获取订单
function getOrders(callback) {
	fs.readFile('./files/orders', (err, data) => {
		if (!err) {
			//如果订单文件存在直接获取订单内容
			callback(JSON.parse(data));

		} else {
			let orderary = [];
			//如果订单文件不存在创建订单
			for (let i = 0; i < 40; i++) {
				let order = {
					order_name: randomCourse(),
					order_id: orderId(),
					order_price: orderPrice(),
					order_pay: '否',
					order_send: '否',
					order_time: randomTime()
				}
				orderary.push(order);
			}

			fs.writeFile('./files/orders', JSON.stringify(orderary), (err, data) => {
				if (!err) {
					console.log('订单保存成功')
					callback(orderary);
				}
			})
		}
	})
}
//该函数功能是生成随机姓名数组，共有329个
function CreateNames() {
	var m =
		"刀白凤,丁春秋,马夫人,马五德,小翠,于光豪,巴天石,不平道人,邓百川,风波恶,甘宝宝,公冶乾,木婉清,少林老僧,太皇太后,天狼子,天山童姥,王语嫣,乌老大,无崖子,云岛主,云中鹤,止清,白世镜,包不同,本参,本观,本相,本因,出尘子,冯阿三,古笃诚,过彦之,兰剑,平婆婆,石清露,石嫂,司空玄,司马林,玄慈,玄寂,玄苦,玄难,玄生,玄痛,叶二娘,左子穆,华赫艮,李春来,李傀儡,李秋水,刘竹庄,朴者和尚,祁六三,乔峰,全冠清,阮星竹,西夏宫女,许卓诚,朱丹臣,竹剑,阿碧,阿洪,阿胜,阿朱,阿紫,波罗星,陈孤雁,何望海,鸠摩智,来福儿,孟师叔,努儿海,宋长老,苏星河,苏辙,完颜阿古打,吴长风,吴光胜,吴领军,辛双清,严妈妈,余婆婆,岳老三,张全祥,单伯山,单季山,单叔山,单小山,单正,段延庆,段誉,段正淳,段正明,范禹,范百龄,范骅,苟读,郁光标,卓不凡,宗赞王子,哈大霸,姜师叔,枯荣长老,梦姑,神山上人,神音,狮鼻子,室里,项长老,姚伯当,幽草,赵钱孙,赵洵,哲罗星,钟灵,钟万仇,高升泰,龚光杰,贾老者,康广陵,秦红棉,容子矩,桑土公,唐光雄,奚长老,徐长老,诸保昆,崔百泉,崔绿华,符敏仪,黄眉和尚,菊剑,聋哑婆婆,梅剑,萧远山,虚竹,游骥,游驹,游坦之,程青霜,傅思归,葛光佩,缘根,智光大师,鲍千灵,褚万里,瑞婆婆,端木元,赫连铁树,黎夫人,慕容博,慕容复,谭公,谭婆,谭青,摘星子,慧方,慧观,慧净,慧真,穆贵妃,薛慕华,和里布,耶律洪基,耶律莫哥,耶律涅鲁古,耶律重元,易大彪,卜沉,丁坚,丁勉,上官云,万大平,于人豪,于嫂,不戒和尚,长青子,仇松年,丹青生,邓八公,方人智,方生,方证,风清扬,计无施,木高峰,天门道人,天松道人,天乙道人,王伯奋,王诚,王二叔,王夫人,王家驹,王家骏,王元霸,王仲强,白二,白熊,丛不弃,东方不败,乐厚,令狐冲,宁中则,平夫人,平一指,申人俊,史镖头,史登达,司马大,田伯光,仪和,仪琳,仪清,玉玑子,玉灵道人,玉磬子,玉音子,玉钟子,左冷禅,成不忧,成高道人,冲虚道长,吉人通,老不死,老头子,刘菁,刘芹,刘正风,米为义,农妇,齐堂主,曲非烟,曲洋,任我行,英颚,西宝,向大年,向问天,陈七,陈歪嘴,迟百诚,狄镖头,狄修,定静师太,杜长老,何三七,季镖头,劳德诺,陆伯,陆大有,任盈盈,沙天江,秃笔翁,吴柏英,吴天德,辛国梁,严三星,杨莲亭,余沧海,余人彦,岳灵珊,张夫人,张金鏊,定逸,建除,林平之,林远图,林震南,罗人杰,易国梓,易师爷,易堂主,英白罗,英长老,岳不群,郑镖头,郑萼,周孤桐,费彬,封不平,洪人雄,侯人英,觉月,施戴子,施令威,闻先生,哑婆婆,钟镇,祝镖头,祖千秋,高克新,高明根,贾布,贾人达,莫大,秦娟,秦伟帮,桑三娘,桃干仙,桃根仙,桃花仙,桃实仙,桃叶仙,梁发,绿竹翁,麻衣汉子,清虚道人,游迅,葛长老,黑白子,黑熊,桃枝仙,陶钧,夏老拳师,崔镖头,黄伯流,黄国柏,黄钟公, 鲁连荣,舒奇,童百熊,鲍大楚,解风,蓝凤凰,谭迪人,假东方不败,震山子";
	var randnames = m.split(",");
	return randnames;
}
let nameAry = CreateNames();
//随机姓名
function randomName() {
	var rn = parseInt((nameAry.length - 1) * Math.random());
	var getname = nameAry[rn];
	nameAry.splice(rn, 1); //昵称被随机选定，那就从数组中删除该昵称
	return getname;
}

function randomPhone() {
	var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
	var i = parseInt(10 * Math.random());
	var prefix = prefixArray[i];
	for (var j = 0; j < 8; j++) {
		prefix = prefix + Math.floor(Math.random() * 10);
	}
	return prefix;
}

function randomEmail() {
	let ary = [
		'onoeemhankewmtc@21cn.com',
		'soeusvdn@eyou.com',
		'ombvkwdocgkob@126.com',
		'lksaehbab@china.com',
		'sltpkn@263.net',
		'plmlqwje@china.com',
		'tdn@163.com',
		'hkimnqmlwqd@56.com',
		'sjstf@yeah.net',
		'bvwbbscbu@msn.com',
		'qdcmf@sina.com',
		'ssdw@sina.com',
		'msrjniavbt@hotmail.com',
		'kglsnlo@56.com',
		'kamgepskqqbje@yeah.net',
		'aqklecphs@yahoo.com.cn',
		'smwfo@citiz.com',
		'dcrfdjp@citiz.com',
		'hdfwg@xinhuanet',
		'rtbdnmrqqcktf@yahoo.com.cn',
		'bqobjlsn@xinhuanet',
		'woi@msn.com',
		'ekahf@netease.com',
		'edohala@china.com',
		'vbtblhfiqvgahnu@msn.com',
		'dvwsvfcm@netease.com',
		'kblgnbwbn@xinhuanet',
		'btepngclu@sohu.com',
	]
	return ary[Math.floor(Math.random() * ary.length)];

}
//获取用户列表
function getUsers(callback) {
	fs.readFile('./files/users', (err, data) => {
		if (!err) {
			//如果用户文件存在直接获取用户内容
			callback(JSON.parse(data));

		} else {
			let usersary = [];
			//如果用户文件不存在创建用户
			for (let i = 0; i < 40; i++) {
				let user = {
					name: randomName(),
					email: randomEmail(),
					phone: randomPhone(),

				}
				usersary.push(user);
			}
			callback(usersary);
			fs.writeFile('./files/users', JSON.stringify(usersary), (err, data) => {
				if (!err) {
					console.log('用户保存成功')
				}
			})
		}
	})
}

//首页小图标
let mainicon = [{
		name: '半价特惠',
		url: 'http://127.0.0.1:3000/public/baokuan.png'
	},
	{
		name: '天猫优先',
		url: 'http://127.0.0.1:3000/public/tianmao.png'
	},
	{
		name: '饿了没',
		url: 'http://127.0.0.1:3000/public/eleme.png'
	},
	{
		name: '八角农产',
		url: 'http://127.0.0.1:3000/public/nongchan.png'
	},
	{
		name: '天猫超市',
		url: 'http://127.0.0.1:3000/public/chaoshi.png'
	},
	{
		name: '充值中心',
		url: 'http://127.0.0.1:3000/public/chongzhi.png'
	},
	{
		name: '海鲜淘',
		url: 'http://127.0.0.1:3000/public/haixian.png'
	},
	{
		name: '阿里拍卖',
		url: 'http://127.0.0.1:3000/public/paimai.png'
	},
];
const maingoods = [{
		id: 1001,
		url: 'http://127.0.0.1:3000/public/huawei.png',
		name: '华为手机适用GT2智能手表成年人接打电话多功能手环Pro太空人华强北电子',
		price: 218,
		monthsales: '1238',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1002,
		url: 'http://127.0.0.1:3000/public/majiang.png',
		name: '加红天骄麻将机全自动低音餐桌两用电动家用四口高档麻将馆桌子',
		price: 447,
		monthsales: '2000+',
		num: 1,
		color: '红色',
		select: false

	},
	{
		id: 1003,
		url: 'http://127.0.0.1:3000/public/xianweijing.png',
		name: '便携式高清60倍放大镜带LED灯显微镜集邮珠宝茶叶烟邮票鉴定验钞',
		price: 18,
		monthsales: '112',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1004,
		url: 'http://127.0.0.1:3000/public/hufupin.png',
		name: '袋鼠妈妈孕妇护肤品水乳套装哺乳期可用保湿补水孕产妇官网正品',
		price: 248,
		monthsales: '1200',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1005,
		url: 'http://127.0.0.1:3000/public/dao.png',
		name: '龙泉市一体唐横刀剑高锰钢唐横刀镇宅宝剑防身唐剑绣春长刀未开刃',
		price: 479,
		monthsales: '3323',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1006,
		url: 'http://127.0.0.1:3000/public/zixingche.png',
		name: '锂电折叠电动自行车整车 电动自行车零配件 电动滑板车 配件',
		price: 55,
		monthsales: '29',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1007,
		url: 'http://127.0.0.1:3000/public/chongfengku.png',
		name: '户外弹力速干裤男女薄款透气夏季运动快干裤徒步登山裤冲锋裤长裤',
		price: 39,
		monthsales: '700',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1008,
		url: 'http://127.0.0.1:3000/public/wangyuanjin.png',
		name: '望远镜单筒高清高倍微光夜视非红外线迷你便携带30000米手机拍照',
		price: 278,
		monthsales: '787',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 1009,
		url: 'http://127.0.0.1:3000/public/dengzi.png',
		name: '北欧吧台椅现代简约家用靠背高脚椅子铁艺网红吧椅高脚凳吧台凳子',
		price: 112,
		monthsales: '100',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10010,
		url: 'http://127.0.0.1:3000/public/yy.png',
		name: 'hunkemoller2021年春季吊带泳装连体泳衣171853',
		price: 223,
		monthsales: '300',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10011,
		url: 'http://127.0.0.1:3000/public/xxz.png',
		name: '格子小西装女外套韩版2022新款春装修身短款女西服长袖上衣休闲潮',
		price: 67,
		monthsales: '234',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10012,
		url: 'http://127.0.0.1:3000/public/yf1.png',
		name: '连帽卫衣外套女春秋款薄款2022年新款开衫早春oversize上衣情侣装',
		price: 89,
		monthsales: '24',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10013,
		url: 'http://127.0.0.1:3000/public/yf2.png',
		name: '赛小懒自制港风衬衣女2022年早春宽松百搭复古中长款外套衬衫上衣',
		price: 819,
		monthsales: '14+',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10014,
		url: 'http://127.0.0.1:3000/public/yf3.png',
		name: 'RCDB日系复古工装夹克女秋季中性BF风宽松短外套拼接百搭上衣潮男',
		price: 119,
		monthsales: '712',
		num: 1,
		color: '红色',
		select: false
	},
	{
		id: 10015,
		url: 'http://127.0.0.1:3000/public/yf4.png',
		name: 'POET WONG 力推bi入款～百搭三色加绒加厚卫衣宽松纯色外套秋冬',
		price: 189,
		monthsales: '312',
		num: 1,
		color: '红色',
		select: false
	},
];
/* 精选分类 */
const category = [{
		id: 2000,
		name: '全部'
	},
	{
		id: 2001,
		name: '出品'
	},
	{
		id: 2002,
		name: '穿搭'
	},
	{
		id: 2003,
		name: '家居'
	},
	{
		id: 2004,
		name: '彩妆'
	},
	{
		id: 2005,
		name: '美食'
	},
];

//店铺列表
const shops = [{
		name: '桃子零食',
		img: 'http://127.0.0.1:3000/public/shop1.png'
	},
	{
		name: '精致美妆',
		img: 'http://127.0.0.1:3000/public/shop2.png'
	},
	{
		name: '芙蓉商店',
		img: 'http://127.0.0.1:3000/public/shop3.png'
	}
];
//评价列表
const commentlist = [{
		name: '郭靖',
		img: 'http://127.0.0.1:3000/public/hero/guojing.png',
		content: '<h4>商品很好,蓉儿很喜欢,好评!</h4>',
		time: '2天前'
	},
	{
		name: '波风水门',
		img: 'http://127.0.0.1:3000/public/hero/bofengshuimen.png',
		content: `<h4 style="color:red">
		商品质量不行,九尾碰一下就坏了!
		<h4>`,
		time: '3天前'
	},
	{
		name: '楚留香',
		img: 'http://127.0.0.1:3000/public/hero/chuliuxiang.png',
		content: '<p>公子伴花失美,盗帅踏月留香!我楚香帅觉得商品ok!<p/>',
		time: '一个月前'
	},
	{
		name: '东方不败',
		img: 'http://127.0.0.1:3000/public/hero/dongfangbubai.png',
		content: '<div>日出东方,唯吾不败!若非绝世珍品,怎能入我东方之眼,好评!!!</div>',
		time: '10天前'
	},
	{
		name: '洪七公',
		img: 'http://127.0.0.1:3000/public/hero/hongqigong.png',
		content: '<span style="color:blue">商品不能煮了吃的,差评!!!</span>',
		time: '1天前'
	},
	{
		name: '黄药师',
		img: 'http://127.0.0.1:3000/public/hero/huangyaoshi.png',
		content: '正即是邪,邪即是正,好即是坏,坏即是好,你猜我是好评还是差评?',
		time: '12天前'
	},
	{
		name: '令狐冲',
		img: 'http://127.0.0.1:3000/public/hero/linghuchong.png',
		content: '小师妹和林平之好了,我不开心,所以差评!',
		time: '4天前'
	},
	{
		name: '乔峰',
		img: 'http://127.0.0.1:3000/public/hero/qiaofeng.png',
		content: '我萧某虽为契丹人,但汉人的商品质量是真的没话说,好评!',
		time: '一年前'
	},
	{
		name: '西门吹雪',
		img: 'http://127.0.0.1:3000/public/hero/ximenchuixue.png',
		content: '我吹的不是雪是血,商品碰到手出血了,差评!!!',
		time: '3年前'
	},
	{
		name: '杨过',
		img: 'http://127.0.0.1:3000/public/hero/yangguo.png',
		content: '商品不错,雕兄很喜欢,好评!',
		time: '33天前'
	},
	{
		name: '唐三',
		img: 'http://127.0.0.1:3000/public/hero/tangsan.png',
		content: '<p style="color:purple">我的紫极神光没发现商品的一丝缺陷,果断好评!</p>',
		time: '1天前'
	},
	{
		name: '独孤求败',
		img: 'http://127.0.0.1:3000/public/hero/duguqiubai.png',
		content: '老夫一生寂寞,难求一败,买此商品,慰藉孤独!',
		time: '19天前'
	},
	{
		name: '紫霞仙子',
		img: 'http://127.0.0.1:3000/public/hero/zixia.png',
		content: `<p style="color:orange">我的如意郎君是个盖世英雄,
		他一定会在一个万众瞩目的日子,将这件商品送给我!</p>`,
		time: '四个月前'
	},
	{
		name: '福尔摩斯',
		img: 'http://127.0.0.1:3000/public/hero/fuermosi.png',
		content: `商品上的劣质烟渍大概率是工人留下的,而这种烟草只有荷兰才有,商家宣称商品是德国进口,很明显,他在说谎!`,
		time: '34天前'
	},
	{
		name: '刘备',
		img: 'http://127.0.0.1:3000/public/hero/liubei.png',
		content: `<div style="font-weight:bold">大家好,我是刘备,三国时期的蜀国君主,现在作为极客营讲师扫地小孩
		课件中的男主角,什么你没见过我,来来来,看看下面这段代码你就能想起我来了:
		let person={name:'刘备',age:18},是不是很熟悉,话有点多了,今天先讲这么多,
		下次有机会再见,我得回去和曹阿瞒抢地盘了,曹贼休走,备来也!</div>`,
		time: '2000年前'
	},
	{
		name: '扫地小孩',
		img: 'http://127.0.0.1:3000/public/hero/sdxh.png',
		content: `大家好,我是极客营最帅的讲师扫地小孩,当你看到这条评价,
		说明幸运女神已经注意到了你,你有福了!
		在此我会分享前端经典书籍资料
		的百度网盘链接,大家注意收藏哦!
		<a href='https://pan.baidu.com/s/1Csl1e8T1fh8aK7wHHoo7Ag'>
		点此领取
		<a/>
		提取码:sdxh`,
		time: '2022年'
	},
	{
		name: '金庸',
		img: 'http://127.0.0.1:3000/public/hero/jinyong.png',
		content: `侠之大者,为国为民,有利民生的商品就是好商品!`,
		time: '金大侠逝于2018年10月,悼念!'
	},

]
/* 获取数组里面随机几个元素 */
function getRandomArrayValue(arr, num) {
	var sData = arr.slice(0),
		i = arr.length,
		min = i - num,
		item, index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		item = sData[index];
		sData[index] = sData[i];
		sData[i] = item;
	}
	return sData.slice(min);
}
//评价数据
function getComments() {
	let comments = {};
	for (let i = 1001; i < 10016; i++) {
		comments[i] = getRandomArrayValue(commentlist, 6)
	}
	return comments;
}
/* 生成签到列表数组 */
function getSignlist() {
	let ary = [];
	for (let i = 0; i < 7; i++) {
		let time = `第${i+1}天`;
		ary.push({
			day: time,
			signin: false
		})
	}
	return ary;
}
exports.comments = getComments(); //评价数据
exports.shops = shops; //店铺列表
exports.dateFormat = dateFormat; //日期格式化
exports.getUsers = getUsers; //获取用户
exports.mainicon = mainicon; //首页小图标
exports.maingoods = maingoods; //首页商品
exports.category = category; //精选分类
exports.signlist = getSignlist(); //签到列表

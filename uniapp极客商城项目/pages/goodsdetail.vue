<template>
	<view class="goodsdetail">
		<scroll-view scroll-y="true" class="scroll">
			<image class="goodsimg" :src="goodsobj.url"></image>
			<view class="goodscard">
				<view class="price">￥{{goodsobj.price}}起</view>
				<view class="tag">
					<view class="tag-title">极客</view>
					<view class="tag-sell">月售{{goodsobj.monthsales}}</view>
				</view>
				<view class="goodsname">{{goodsobj.name}}</view>
				<view class="menu">
					<view class="item" v-for="item in menulist">
						<image :src="item.imgpath"></image>
						<view class="title">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="goodscard">
				<view class="color">
					<view class="title">选择</view>
					<picker class="colorpicker" @change="change" :value="colorindex" :range="colorarray"
						range-key="color">
						<view :style="{color:xcolor}">{{colorarray[colorindex].color}}</view>
					</picker>
				</view>
                <view class="item">
                	<view class="title">数量</view>
                	<view class="count">
						<view @click="add" class="add">
							+
						</view>
						<input 
						@blur="numchange"
						type="text" 
						v-model.number="num"
						class="num">
						<view @click="sub" class="sub">
							-
						</view>
					</view>
                </view>
				<view class="item">
					<view class="title">发货方式</view>
					<view class="content">快递：免运费</view>
				</view>
				<view class="item">
					<view class="title">保障</view>
					<view class="content">假一赔四-退货运费险-极速退款</view>
				</view>
				<view class="item">
					<view class="title">品牌</view>
					<view class="content">国际知名品牌-双优质量保证</view>
				</view>
				<view class="item">
					<view class="title">参数</view>
					<view class="content">多型号多品类供您选择</view>
				</view>
			</view>
			<view class="goodscard">
				<view class="comment">宝贝评价({{commentlist.length}})</view>
				<view class="commentitem" v-for="item in commentlist">
					<view class="user">
						<image class="myimg" :src="item.img"></image>
						<view class="info">
							<text class="name">{{item.name}}</text>
							<text class="time">{{item.time}}</text>
						</view>
					</view>
					<view class="content" v-html="item.content"></view>
				</view>
			</view>
		</scroll-view>
		<image class="back" @click="backmsg" src="../static/back.png">
		</image>

		<db-goodsdetailmenu :iscollect="iscollect" @collect="collect" @addcart="addcart" class="goodsmenu">
		</db-goodsdetailmenu>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				/* 数量 */
				num:1,
				/* 颜色 */
				xcolor:'red',
				goodsobj: {},
				menulist: [{
						name: '推荐',
						imgpath: '../static/recommend.png'
					},
					{
						name: '帮我选',
						imgpath: '../static/choose.png'
					},
					{
						name: '分享',
						imgpath: '../static/share.png'
					},
				],
				colorarray: [{
						color: '红色',
						xcolor:'red'
					},
					{
						color: '橙色',
						xcolor:'orange'
					},
					{
						color: '黄色',
						xcolor:'yellow'
					},
					{
						color: '绿色',
						xcolor:'green'
					},
					{
						color: '蓝色',
						xcolor:'blue'
					},
				],
				colorindex: 0,
				commentlist: []
			}
		},

		onLoad(options) {
			this.goodsobj = JSON.parse(options.goodsobj);
			/* 判断是否收藏,并修改iscollect */
			this.checkcollect(this.goodsobj.id);
			this.commentsReq1();
		},
		computed: {
			...mapState(['iscollect'])
		},

		methods: {
			...mapMutations({
				addgoods: 'addgoods',
				checkcollect: 'checkcollect',
				togglecollect: 'togglecollect',
				addcollect: 'addcollect'
			}),
			backmsg() {
				uni.navigateBack()
			},
			//评价列表接口
			async commentsReq1() {
				let data = await this.$http.commentsReq(this.goodsobj.id);
				this.commentlist = data.data;
			},
			//添加到购物车
			addcart() {
				this.$modal('是否加入购物车？', () => {
					/* 设置颜色 */
					this.goodsobj.color = this.colorarray[this.colorindex]['color'];
					/* 设置数量 */
					this.goodsobj.num = this.num;
					/* 添加到购物车 */
					this.addgoods({
						...this.goodsobj
					});
					this.$toast('加入购物车成功');
				});
			},
			/* 收藏 */
			collect() {
				this.$modal('是否加入收藏?', () => {
					this.addcollect(this.goodsobj);
					this.togglecollect();
					this.$toast('加入收藏成功!');
				})
			},
			//picker改变事件
			change(e) {
				this.colorindex = e.detail.value;
				this.xcolor = this.colorarray[this.colorindex].xcolor;
			},
			/* 商品数量加1 */
			add(){
				this.num<99&&this.num++;
			},
			/* 商品数量减1 */
			sub(){
				this.num>1&&this.num--;
			},
			/* 商品数量变化 */
			numchange(){
				console.log(77777);
				if(this.num>99||this.num<1){
					this.num=1;
					this.$toast('商品数量限制在1-99!!!');
				}
			}
		}
	}
</script>

<style lang="scss">
	.goodsdetail {
		::-webkit-scrollbar {
			display: none;
			/* Chrome Safari */
		}
		position: relative;
		.scroll {
			background-color: rgb(240, 240, 240);
			position: fixed;
			top: 0px;
			left: 0px;
			right: 0px;
			bottom: 50px;
			.goodscard {
				background-color: #ffffff;
				border-radius: 8px;
				display: flex;
				flex-direction: column;
				margin: 10px;
				padding: 10px;
				.price {
					color: #ff0000;
					font-size: 18px;
					height: 40px;
					display: flex;
					align-items: center;
					margin-left: 10px;
				}
				.tag {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 30px;
					padding: 10px;
					.tag-title {
						width: 50px;
						height: 20px;
						border-radius: 10px;
						background-color: #ff0000;
						color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.goodsname {
					margin-left: 10px;
					margin-right: 10px;
					color: #000000;
					font-size: 18px;
					font-weight: bold;
					margin-top: 10px;
				}

				.menu {
					display: flex;
					justify-content: space-evenly;
					align-items: center;

					.item {
						height: 40px;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 20px;
							height: 20px;
						}

						.title {
							font-size: 14px;
							color: #666666;
							margin-left: 5px;
						}
					}
				}
				.color {
					display: flex;
					align-items: center;
					height: 40px;
					.title {
						margin-left: 10px;
						color: #666666;
						font-size: 16px;
					}
					.colorpicker {
						margin-left: 20px;
						font-size: 16px;
					}
				}
				.item {
					display: flex;
					align-items: center;
					height: 40px;
					.title {
						margin-left: 10px;
						color: #666666;
						font-size: 16px;
					}
					.content {
						margin-left: 20px;
						font-size: 16px;
					}
				}
				.comment {
					margin-left: 10px;
					margin-top: 20px;
					font-size: 20px;
					font-weight: bold;
				}
				.commentitem {
					display: flex;
					flex-direction: column;
					margin-top: 20px;
					.user {
						display: flex;
						height: 40px;
						.myimg {
							margin-left: 10px;
							width: 40px;
							height: 40px;
						}
						.info {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.name {
								font-size: 14px;
								margin-left: 10px;
							}
							.time {
								color: #999999;
								font-size: 14px;
								margin-left: 10px;
							}
						}
					}
					.content {
						margin-left: 10px;
						margin-top: 10px;
					}
				}
			}
			.goodsimg {
				width: 100%;
				height: 100vw;
			}
		}
		.back {
			width: 30px;
			height: 30px;
			position: absolute;
			left: 15px;
			top: 20px;
			z-index: 99;
		}
		.goodsmenu {
			position: fixed;
			left: 0px;
			right: 0px;
			bottom: 0px;
			z-index: 99;
		}
	}
	.count{
		display: flex;
		align-items: center;
		height: 20px;
		margin-left: 20px;
		.add,.sub{
			width: 20px;
			border: 1px solid #999;
			display: grid;
			place-items: center;
		}
		.num{
			font-size: 12px;
			width: 30px;
			/* 设置最小高度 */
			min-height: 20px;
			height: 20px;
			border: 1px solid #999;
			text-align: center;
		}
	}
</style>

<template>
	<view class="main">

		<!-- segment -->
		<db-segment :segmenttype="0" :titlelist="titlelist" @leftclick='leftclick' @rightclick='rightclick'
			@clickmsg='clickmsg'>
		</db-segment>
		<!-- 搜索 -->
		<db-search @search='search'></db-search>

		<scroll-view v-show="isrecommend" 
		class="scroll" scroll-y="true">
			<view class="scrollx">
				<db-mainmenu @click.native="clickmenu(item)"
				 v-for="(item,index) in menulist" 
				class="menuitem" :menuobj="item">
				</db-mainmenu>
			</view>

			<view class="goodslist">
				<db-goods @click.native='clickgoods(item)' :goods="item" v-for="(item,index) in goodslist"
					:key='item.id' class="goods"></db-goods>
			</view>

		</scroll-view>

		<view v-show="!isrecommend" class="sub">
			<view class="shoptitle">常访问的店铺</view>
			<view class="shopbg">
				<view class="shop" v-for="(item,index) in shops" :key='index'>
					<image :src="item.img"></image>
					<view class="shopname">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titlelist: ['订阅', '推荐'],
				isrecommend: true,
				menulist: [],
				goodslist: [],
				shops:[]

			}
		},
		onLoad() {
			this.mainiconReq1();
			this.maingoodsReq1();
			this.shopsReq1();
		},

		methods: {
			//点击小图标
			clickmenu(item){
			  if(item.name=='半价特惠'){
				  uni.navigateTo({
				  	url:'../discount'
				  })
			  }
			},
			//小图标接口
			async mainiconReq1() {
				let data = await this.$http.mainiconReq();
				this.menulist = data.data;
			},
			//商品列表接口
			async maingoodsReq1() {
				let data = await this.$http.maingoodsReq();
				this.goodslist = data.data;
			},
			//订阅的商铺接口
			async shopsReq1(){
				let data = await this.$http.shopsReq();
				this.shops = data.data;
			},
			search() {
				uni.navigateTo({
					url: '../search'
				})
			},
			clickmsg(index) {
				//订阅
				if (index === 0) {
					this.isrecommend = false;
				} else {
					//推荐
					this.isrecommend = true;
				}
			},
			//点击商品
			clickgoods(goods) {
				uni.navigateTo({
					url: `../goodsdetail?goodsobj=${JSON.stringify(goods)}`,
				})
			},
			//点击segment左边按钮:签到
			leftclick() {
				uni.navigateTo({
					url:'/pages/sign'
				})

			},
			//点击segment右边按钮:会员
			rightclick() {
				uni.navigateTo({
					url:'/pages/vip'
				})

			}

		}
	}
</script>

<style lang="scss">
	.main {
		.scroll {
			position: fixed;
			top: 105px;
			left: 0px;
			right: 0px;
			bottom: 50px;

			.scrollx {
				display: flex;
				flex-wrap: wrap;


			}

			.goodslist {
				display: grid;
				grid-template-columns: repeat(2,1fr);

				.goods {
					margin-top: 10px;
					margin-left: 10px;
				}
			}
		}

		.sub {
			.shoptitle {
				color: #000000;
				font-size: 20px;
				font-weight: bold;
				margin-top: 20px;
			}

			.shopbg {
				display: flex;
				margin-top: 10px;

				.shop {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					margin-left: 10px;

					image {
						width: 50px;
						height: 50px;
						border-radius: 25px;
					}

					.shopname {
						font-size: 16px;
					}
				}
			}

		}
	}
</style>

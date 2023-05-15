<template>
	<view class="choose">
		<!-- segment -->
		<db-segment :segmenttype="1" :titlelist="titlelist" @leftclick='leftclick' @rightclick='rightclick'
			@clickmsg='segmentclickmsg'>
		</db-segment>

		<db-longsegment 
		@order="order"
		v-show="isfind" 
		:titlelist="list" @clickmsg='clickmsg'>
		</db-longsegment>

		<scroll-view v-show="isfind" class="scroll" scroll-y="true">
			<view class="goodslist">
				<db-goods @click.native='clickgoods(item)' :goods="item" v-for="(item,index) in goodslist"
					:key='item.id' class="goods"></db-goods>
			</view>
		</scroll-view>

		<view class="attention" v-show="!isfind">
			<image src="../../static/blank.png"></image>
			<view class="title">你关注的账号还没有更新哦</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 排序 */
				aorder:'未排序',
				/* 分类列表 */
				list: [],
				/* 商品列表 */
				goodslist: [],
				titlelist: ['关注', '发现'],
				isfind: true,
				categoryid: 0,
			}
		},
		methods: {
			//长segment
			clickmsg(id) {
				this.categoryid = id;
				this.categorylistReq1();
			},
			//短segment
			segmentclickmsg(index) {
				if (index === 0) {
					//发现
					this.isfind = false;
				} else {
					//关注
					this.isfind = true;
				}
			},

			//点击segment左边按钮
			leftclick() {

			},
			//点击segment右边按钮
			rightclick() {
				uni.navigateTo({
					url: '../info'
				})
			},

			//点击商品
			clickgoods(goods) {
				uni.navigateTo({
					url: '../goodsdetail?goodsobj=' + this.$pass(goods)
				})
			},
			//分类接口
			async categoryReq1() {
				let data = await this.$http.categoryReq();
				this.list = data.data;
			},
			//分类列表接口
			async categorylistReq1() {
				console.log(this.aorder);
				let data = await this.$http.categorylistReq(this.categoryid);
				this.goodslist = data.data;
				if(this.aorder=='未排序')return;
				this.goodslist = data.data.sort((a,b)=>{
					return this.aorder?a.price-b.price:b.price-a.price;
				});
				
			},
			
			/* 排序 */
			order(aorder){
				this.aorder = aorder;
				this.goodslist.sort((a,b)=>{
					return aorder?a.price-b.price:b.price-a.price;
				});
			}
		},
		onLoad() {
			this.categoryReq1();
			this.categorylistReq1();
		},

		computed: {

		}
	}
</script>

<style lang="scss">
	.choose {

		.scroll {
			position: fixed;
			top: 100px;
			left: 0;
			right: 0;
			bottom: 50px;
		}

		.goodslist {
			display: flex;
			flex-wrap: wrap;

			.goods {
				margin-top: 10px;
				margin-left: 10px;
			}
		}

		.attention {
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				font-size: 20px;
				font-weight: bold;
				margin-top: 20px;
			}
		}
	}
</style>

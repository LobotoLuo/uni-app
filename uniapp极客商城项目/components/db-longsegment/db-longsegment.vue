<template>
	<view class="db-longsegment">
		<view class="order">
			<view class="order-content" @click="ordermsg">
				<text>排序</text>
				<view class="arrows">
					<img class="arrow" :src="upimg">
					<img class="arrow" :src="downimg">
				</view>
			</view>
		</view>
		<scroll-view class="scroll" 
		:style="{'white-space':'nowrap'}" scroll-x="true">
			<view @click="clickmsg(item.id,index)" 
			v-for="(item,index) in titlelist" 
			class="cellbg" :key='item.id'>
				<view :class="{'default':true,'select':index === currentselectindex}">
					<view class="title">{{item.name}}</view>
					<view class="line"></view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentselectindex: 0,
				/* 排序方式,默认升序 */
				aorder:true,
				/* 上图片地址 */
				upimg:'static/up.png',
				/* 下图片地址 */
				downimg:'static/down.png',
				uppath:'static/up.png',
				downpath:'static/down.png',
				upselectpath:'static/upselect.png',
				downselectpath:'static/downselect.png'
			}
		},

		props: {
			titlelist: {
				type: Array,
				default: []
			}
		},

		methods: {
			clickmsg(id, index) {
				this.currentselectindex = index;
				this.$emit('clickmsg', id);
			},
			ordermsg(){
				if(this.aorder){
					this.upimg = this.upselectpath;
					this.downimg = this.downpath;
				}else{
					this.upimg = this.uppath;
					this.downimg = this.downselectpath;
				}
				this.$emit('order',this.aorder);
				this.aorder = !this.aorder;
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.order{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		width: 16vw;
		left: 2vw;
		height: 30px;
		border-radius: 15px;
		background: #eee;
	}
	.order-content{
		display: flex;
		align-items: center;
	}
	.arrows{
		margin-left: 5px;
		display: flex;
		flex-direction: column;
	}
	.arrow{
		width: 8px;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0 !important
	}

	.db-longsegment {
		position: relative;
		::-webkit-scrollbar {
			width: 0;
			height: 0 !important
		}

		.scroll {
			height: 40px;
			padding-left: 20vw;
			.cellbg {
				display: inline-block;
				height: 40px;
				width: 20vw;

				.default {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					height: 40px;
					width: 20vw;

					.line {
						height: 2px;
						width: 30px;
						border-radius: 1px;
						background-color: transparent;
					}

					.title {
						color: #999999;
						font-size: 16px;
					}
				}

				.select {
					@extend .default;
					.line {
						height: 2px;
						width: 30px;
						border-radius: 1px;
						background-color: #000000;
					}

					.title {
						color: #000000;
						font-size: 20px;
					}
				}
			}
		}

	}
</style>

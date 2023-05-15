<template>
	<view class="db-goodsdetailmenu">
		<view class="menu">
			<view class="small-item"
			v-for="item in smallitemlist"
			>
				<image :src="item.imgpath"></image>
				<view class="title">{{item.name}}</view>
			</view>
			
			<view class="long-btn">
				<view class="addbtn" 
				@click="addcart">加入购物车</view>
				<view 
				@click="collect"
				:class="{buyedbtn:iscollect}"
				class="buybtn">
					{{iscollect?'已收藏':'收藏'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			iscollect:{
				type:Boolean,
				default:true
			}
		},
		mounted(){
		  	
		},
		data(){
			return{
				smallitemlist:[
					{name:'店铺',imgpath:require('../../static/store.png')},
					{name:'客服',imgpath:require('../../static/customer.png')},
					{name:'评分',imgpath:require('../../static/collect.png')},
					
				]
			}
		},
		
		methods:{
			addcart(){
				this.$emit('addcart');
			},
			collect(){
				/* 如果没收藏 */
				if(!this.iscollect){
					this.$emit('collect');
				}
			}
		}
	}
</script>

<style lang="scss">
	.db-goodsdetailmenu{
		background-color: #ffffff;
		.menu{
			display: flex;
			align-items: center;
			height: 50px;
			.small-item{
				width: 60px;
				height: 50px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				image{
					width: 30px;
					height: 30px;
				}
			}
			.long-btn{
				flex: 1;
				display: flex;
				.addbtn{
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #F0AD4E;
					color: #ffffff;
					height: 46px;
					flex: 1;
					border-top-left-radius: 23px;
					border-bottom-left-radius: 23px;
					font-size: 16px;
				}
				.buybtn{
					@extend .addbtn;
					background-color: #ff0000;
					border-top-left-radius: 0px;
					border-bottom-left-radius: 0px;
					border-top-right-radius: 23px;
					border-bottom-right-radius: 23px;
				}
				.buyedbtn{
					background: #999;
				}
			}
		}
	}
</style>

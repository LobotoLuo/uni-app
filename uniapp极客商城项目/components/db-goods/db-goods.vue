<template>
	<view class="db-goods">
		<image class="goodsimg" :src="goods.url"></image>
		<view class="name">{{goods.name}}</view>
		<view class="price">￥{{goods.price}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		props:{
			goods:{
				type:Object,
				default:{}
			}
		}
	}
</script>

<style lang="scss">
	.db-goods{
		display: flex;
		flex-direction: column;
		width: calc((100vw - 40px)/2.0);
		
		.goodsimg{
			width: calc((100vw - 40px)/2.0);
			height: calc((100vw - 40px)/2.0);
		}
		.name{
			color: #666666;
			font-size: 16px;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}
		.price{
			color: #ff0000;
			font-size: 18px;
		}
	}
</style>

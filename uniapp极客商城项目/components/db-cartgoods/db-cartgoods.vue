<template>
	<view class="db-cartgoods">
		<view class="cartgoods"
		v-for="(cartgoods,index) in cartgoodslist"
		 @click="clickmsg(cartgoods,index)">
			<image class="circle"
			 :src="cartgoods.select===true?selectimg:unselectimg"></image>
			<image class='cartgoodsimg'
			:src="cartgoods.url"></image>
			<view class="des">
				<view class="title">{{cartgoods.name}}</view>
				<view class="num">
					<view class="price">￥{{cartgoods.price}}</view>
					<view class="count">{{cartgoods.color}}:x{{cartgoods.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				selectimg:require('../../static/select.png'),
				unselectimg:require('../../static/unselect.png'),
			}
		},
		
		computed:{
			...mapState(['cartgoodslist'])
		},
		
		methods:{
			clickmsg(item,index){
					item.select = !item.select;
				    this.$emit('clickmsg',this.list);
			}
		}
	}
</script>

<style lang="scss">
	.db-cartgoods{
		.cartgoods{
			margin-top: 10px;
			display: flex;
			align-items: center;
			height: 80px;
			.circle{
				margin-left: 10px;
				width: 20px;
				height: 20px;
			}
			.cartgoodsimg{
				margin-left: 10px;
				width: 80px;
				height: 80px;
			}
			
			.des{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 10px;
				.title{
					margin-left: 10px;
				}
				.num{
					margin-left: 10px;
					display: flex;
					justify-content: space-between;
					.price{
						color: #ff0000;
					}
					.count{
						color: #007AFF;
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>

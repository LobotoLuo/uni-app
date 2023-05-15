<template>
	<view class="cart">
		<scroll-view class="scroll" scroll-y="true">
				<db-cartgoods></db-cartgoods>
		</scroll-view>
		
		<view class="bottombar">
			<view class="sum">合计:{{totalPrice}}</view>
			<view class="pay" @click="pay">结算</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		
		methods:{
			...mapMutations({
				clearcart:'clearcart'
			}),
			//结算
			pay(){
				if(this.cartgoodslist.length === 0){
					this.$toast('请至少选择一件商品');
				}else{
					this.clearcart();
				}
				
			}
		},
		
		computed:{
		  ...mapState(['cartgoodslist']),
		  ...mapGetters(['totalPrice'])
		},
		
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	.cart{
		.scroll{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 100px;
		}
		.bottombar{
			height: 50px;
			position: fixed;
			bottom: 50px;
			left: 0;
			right: 0;
			display: flex;
			justify-content: flex-end;
			.sum{
				font-size: 20px;
				display: flex;
				align-items: center;
			}
			.pay{
				width: 60px;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
				background-color: #F0AD4E;
			}
		}
	}
</style>

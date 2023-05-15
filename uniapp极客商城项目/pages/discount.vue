<template>
	<view class="">
		<db-nav title="今日特惠"></db-nav>
		<view class="countdown">
			<span class="label">优惠结束时间:</span>
			<span class="time">
			{{getHours}}小时{{getMinutes}}分{{getSeconds}}秒
			</span>
		</view>
		<view 
		@click="clickgoods(item)"
		v-for="item in list" class="item">
			<img class="img" :src="item.url"></img>
			<view class="des">
				<text class="name">{{item.name}}</text>
				<text class="price">原价:{{item.price}}元</text>
				<text class="real-price">特惠价:{{item.price/2}}元</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				/* 定时器id */
				timerid:null,
				/* 折扣列表 */
				list:[]
			}
		},
		methods:{
			...mapMutations(['startCountdown']),
			async discountReq1(){
				let data =await this.$http.discountReq();
				this.list = data.data;
			},
			//点击商品
			clickgoods(goods) {
				uni.navigateTo({
					url: `./goodsdetail?goodsobj=${JSON.stringify(goods)}`,
				})
			}
		},
		onLoad(){
			this.discountReq1();
			if(!this.timerid){
				this.timerid = setInterval(()=>{
					this.startCountdown();
				},1000);
			}
		},
		computed:{
			...mapGetters([
				'getHours',
				'getMinutes',
				'getSeconds'
				])
		},
		beforeDestroy(){
			clearInterval(this.timerid);
			this.timerid = null;
		}
		
	}
</script>

<style scoped>
	.countdown{
		margin-top: 20px;
		height: 40px;
		display: flex;
	}
	.label{
		color: red;
		font-size: 20px;
		font-weight: bold;
		margin-left: 20px;
	}
	.time{
		background: #e9f1ff;
		height: 30px;
		border-radius: 15px;
		width: 150px;
		display: grid;
		place-items: center;
		color: #4a82ff;
		font-weight: bold;
	}
	.item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 10px;
		column-gap: 10px;
	}
	.img {
		width: 60px;
		height: 60px;
		border: 1px solid deepskyblue;
	}
	
	.des {
		height: 60px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.name {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 280px;
	}
	
	.price {
		font-size: 12px;
		font-weight: bold;
		color: #999;
		text-decoration: line-through;
	}
	.real-price{
		font-size: 14px;
		color: red;
		font-weight: bold;
	}
</style>
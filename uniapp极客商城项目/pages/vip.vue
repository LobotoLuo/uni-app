<template>
	<view class="vip">
		<db-nav title="会员"></db-nav>
		<view class="content2" v-if="show_vip==1">
			<text class="text">
				您好,尊贵的极客VIP!
			</text>
		</view>
		<view class="content1" v-if='show_vip==2'>
			<h1>开通会员</h1>
			<text>开通会员可以享受全场商品9.5折优惠,还不快行动起来!</text>
			<button @click="vipmsg" class="btn" type="default">开通会员</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show_vip:0
			}
		},
		onLoad() {
			this.isvipReq();
		},
		methods:{
			//开通会员按钮事件
			vipmsg(){
				this.$modal('是否开通会员',()=>{
					this.vipReq();
				})
			},
			//开通会员接口
			async vipReq(){
				let data = await this.$http.vipReq();
				this.$toast('开通会员成功!');
				this.show_vip = 1;
			},
			
			//判断是否是vip接口
			async isvipReq(){
				let data = await this.$http.isvipReq();
				if(data.isvip){
					/* 是vip */
					this.show_vip = 1
				}else{
					/* 不是vip */
					this.show_vip = 2
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.vip{
		.content1{
			margin-top: 30px;
			border: 0.5px solid #eee;
			border-radius: 8px;
			margin-left: 10px;
			margin-right: 10px;
			padding: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			text{
				width: 80vw;
				margin-top: 20px;
			}
			.btn{
				background: #007AFF;
				color: white;
				margin-top: 20px;
				width: 80vw;
			}
		}
		.content2{
			margin-top: 30px;
			border: 0.5px solid #eee;
			border-radius: 8px;
			margin-left: 10px;
			margin-right: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text{
				font-size: 36px;
				background-image: linear-gradient(135deg,red,orange);
				background-clip:text;
				-webkit-background-clip:text;
				color: transparent;
			}
			
		}
	}
</style>

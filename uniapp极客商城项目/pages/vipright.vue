<template>
	<view class="vipright">
		<view class="vip">
			<db-nav title="会员特权"></db-nav>
			<view class="content">
				<ul>
					<li v-for="(item) in list">{{item}}</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		methods:{
			async isvipReq(){
				let data =await this.$http.isvipReq();
				this.list = data.data;
			},
		},
		onLoad() {
			this.isvipReq();
		}
	}
</script>
<style lang="scss" scoped>
	.vipright{
		li{
			height: 30px;
			color:#DD524D
		}
	}
</style>

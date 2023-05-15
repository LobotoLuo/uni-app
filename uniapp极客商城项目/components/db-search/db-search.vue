<template>
	<view class="db-search">
		<view class="search" @click="search">
			<image class="code" src="../../static/code.png"></image>
			<view class="line"></view>
			<div class="input">点击搜索</div>
			<image class="carema" src="../../static/camera.png"></image>
			<view class="btn">搜索</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		methods:{
			search(){
				this.$emit('search');
			}
		}
	}
</script>

<style lang="scss">
	.db-search{
		
		.search{
			margin-left: 10px;
			margin-right: 10px;
			height: 40px;
			border-radius: 20px;
			border: 1px solid #ff0000;
			display: flex;
			align-items: center;
			
			.code{
				margin-left: 10px;
				width: 30px;
				height: 30px;
			}
			.line{
				margin-left: 5px;
				width: 1px;
				height: 30px;
				background-color: #999999;
				
			}
			.input{
				margin-left: 5px;
				flex:1;
			}
			.carema{
				width: 30px;
				height: 25px;
			}
			.btn{
				margin-right: 2px;
				width: 60px;
				height: 30px;
				border-radius: 15px;
				background-color: #F0AD4E;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
			}
		}
		
	}
</style>

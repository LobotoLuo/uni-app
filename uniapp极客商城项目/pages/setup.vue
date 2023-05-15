<template>
	<view class="setup">
		<db-nav title="设置"></db-nav>
		<view class="version">
			<view class="title">版本号</view>
			<view class="content">1.0.0</view>
		</view>
		<button class="logout"
		@click="logout"
		 type="default">退出登录</button>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				rowlist:[
					{name:'版本号',imgpath:'../static/my/my1.png'},
					{name:'退出登录',imgpath:'../static/my/my2.png'},
				]
			}
		},
		methods:{
			logout(){
				this.$modal('是否退出登录?',()=>{
					uni.removeStorageSync('user');
					uni.navigateTo({
						url:'./login'
					})
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.setup{
		.version{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			.title{
				margin-left: 10px;
			}
			.content{
				margin-right: 10px;
			}
		}
		
		.logout{
			background-color: #007AFF;
			color: #ffffff;
			margin-top: 30px;
			margin-left: 10px;
			margin-right: 10px;
		}
	}
</style>

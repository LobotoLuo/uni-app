<template>
	<view class="login">
		<view class="logo">
			<image src="../static/logo.png"></image>
		</view>
		<view class="title">极客淘</view>

		<view class="username">
			<input type="text" placeholder="请输入用户名" v-model.trim="username" />
		</view>
		<view class="psw">
			<input type="text" placeholder="请输入密码" v-model.trim="psw" />
		</view>
		<button class="loginbtn" type="default" @click="gotabbar">登录</button>
		<a href="" @click.prevent="goregister">去注册</a>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				psw: ''
			}
		},
		onLoad() {
			let user = uni.getStorageSync('user');
			if (user) {
				//判断本地是否存在user数据 存在的话就跳到首页
				if (JSON.stringify(user) !== "{}") {
					uni.switchTab({
						url: 'tabbar/main'
					})
				}
			}
		},
		methods: {
			gotabbar() {
				if (!this.username || !this.psw) {
					this.$toast('用户名或密码不能为空');
				} else {
					this.loginReq('/login', {
						name: this.username,
						psw: this.psw
					});
				}

			},
			/* 登录接口 */
			async loginReq(url, obj) {
				let data = await this.$http.get(url, obj);
				/* 将用户信息存到本地 */
				uni.setStorageSync(
					'user',{name: this.username,psw: this.psw}
				);
				/* 去首页 */
				this.$toast('登录成功!',()=>{
					uni.switchTab({url: 'tabbar/main'})
				});
				
			},
			/* 去注册页面 */
			goregister() {
				uni.navigateTo({
					url: '/pages/register'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		.logo {
			display: flex;
			justify-content: center;

			image {
				width: 120px;
				height: 100px;
				margin-top: 50px;
			}
		}

		.title {
			font-size: 35px;
			font-weight: bold;
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}

		.username {
			margin-left: 10px;
			margin-right: 10px;
			margin-top: 10px;
			border-radius: 20px;
			border: 1px solid #000000;
			height: 40px;
			display: flex;
			align-items: center;

			input {
				margin-left: 20px;
				margin-right: 20px;
				width: 100%;
			}
		}

		.psw {
			@extend .username;
		}

		.loginbtn {
			margin-top: 40px;
			margin-left: 10px;
			margin-right: 10px;
			background-color: #007AFF;
			color: #ffffff;
		}

		a {
			display: block;
			margin-left: 10px;
			margin-top: 20px;
			font-size: 20px;
		}
	}
</style>

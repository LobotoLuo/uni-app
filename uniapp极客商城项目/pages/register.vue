<template>
	<view class="register">
		<db-nav title='注册'></db-nav>
		<view class="container">
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
			<radio-group class="radio-group" @change="radioChange">
				性别:
				<label class="sexitem" v-for="(item, index) in sexs" :key="item.value">
					<radio :value="item.value" :checked="index == current" />
					{{item.name}}
				</label>
			</radio-group>
			<button class="loginbtn" type="default" @click="registermsg">
				确定
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				psw: '',
				sexs: [{
						name: '男',
						value: "男"
					},
					{
						name: '女',
						value: '女'
					},
				],
				sex: '男',
				current: 0,
			}
		},

		methods: {
			//注册方法
			registermsg() {
				this.registerReq();
			},
			//性别切换事件
			radioChange(event) {
				this.sex = event.detail.value;
			},
			//注册接口
			async registerReq() {
				let data = await this.$http.registerReq(
					this.username, this.psw, this.sex
				);
				this.$toast('注册成功', () => {
					uni.reLaunch({
						url: '/pages/login'
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
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

		.radio-group {
			margin-left: 10px;
			margin-top: 20px;
		}

		.sexitem {
			margin-left: 10px;
		}

		.loginbtn {
			margin-top: 40px;
			margin-left: 10px;
			margin-right: 10px;
			background-color: #007AFF;
			color: #ffffff;
		}
	}
</style>

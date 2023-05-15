<template>
	<view class="sign">
		<img class='back' @click='back' src="../static/signback.png">
		<view class="bg">
			<text class='title'>签到</text>
			<view class="table">
				<view class="item" :class="{select:item.signin}" v-for="item in list">
					<view>
						{{item.day}}
					</view>
					<img src="../static/coin.png">
				</view>
			</view>
			<button :disabled="flag" :class="{ubtn:flag}" class="btn" @click="sign">
				{{flag?'今日已签到':'签到'}}
			</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				flag: false
			}
		},
		methods: {
			//签到按钮事件
			sign() {
				this.signReq()
			},
			//签到接口
			async signReq() {
				let data = await this.$http.signReq();
				this.$toast('签到成功!');
				this.flag = true;
				this.signlistReq();
			},
			//判断是否签到接口
			async issignReq() {
				let data = await this.$http.issignReq();
				this.flag = data.issigned;
			},
			/* 签到列表接口 */
			async signlistReq() {
				let data = await this.$http.signlistReq();
				this.list = data.data;
			},
			/* 返回按钮 */
			back(){
				uni.navigateBack()
			}
		},
		onLoad() {
			this.issignReq();
			this.signlistReq();
		}
	}
</script>

<style lang="scss" scoped>
	.sign {
		display: flex;
		justify-content: center;
		background-image: url(@/static/signbg.png);
		background-size: 100%;
		width: 100vw;
		height: 100vh;

		.back {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 15px;
			left: 15px;
		}

		.bg {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 15px 0;

			.title {
				font-size: 24px;
				font-weight: bold;
				color: white;
			}

			.table {
				box-shadow: 0 0 5px #999;
				height: 300px;
				background: white;
				width: calc(100vw - 40px);
				border-radius: 7px;
				margin: 20px 0;
				padding: 10px;

				display: grid;
				grid-template-columns: repeat(4, 1fr);
				grid-template-rows: repeat(2, 100px);
				gap: 10px;

				.item {
					background: #eee;
					border-radius: 4px;
					color: black;
					font-size: 14px;

					display: grid;
					place-content: center;
					place-items: center;
					gap: 15px;
				}

				.select {
					color: white;
					background-color: orange;
				}

				.item:nth-child(7) {
					grid-column: span 2;
				}
			}

			.btn {
				background: royalblue;
				color: white;
				font-size: 18px;
				width: calc(100vw - 40px);
			}

			.ubtn {
				background: #ccc;
			}
		}
	}
</style>

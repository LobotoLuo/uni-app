<template>
	<view class="my">
		<view class="list">
			<view class="head">
				<image @click="clickhead" :src="headimg"></image>
				<view class="info" @click="gomodiinfo">
					<view class="name">{{name}}</view>
					<view class="signname">{{signname}}</view>
				</view>
			</view>
			<view class="line1"></view>
			<view class="item" @click="clickmsg(item)" v-for="(item,index) in rowlist">
				<view class="info">
					<view class="richtext">
						<image :src="item.imgpath"></image>
						<view class="title">{{item.name}}</view>
					</view>
					<image class="arrow" src="../../static/my/arrow.png"></image>
				</view>
				<view class="line2"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				signname: '',
				headimg: '../../static/my/default_icon.png',
				rowlist: [{
						name: '会员特权',
						imgpath: '../../static/my/my1.png'
					},
					{
						name: '收藏',
						imgpath: '../../static/my/my2.png'
					},
					{
						name: '卡包',
						imgpath: '../../static/my/my3.png'
					},
					{
						name: '朋友圈',
						imgpath: '../../static/my/my4.png'
					},
					{
						name: '表情',
						imgpath: '../../static/my/my5.png'
					},
					{
						name: '游戏',
						imgpath: '../../static/my/my6.png'
					},
					{
						name: '设置',
						imgpath: '../../static/my/setup.png'
					}
				]
			}
		},

		onShow() {
			let user = uni.getStorageSync('user');
			this.name = user.name || '游客';
			this.signname = user.signname || '点击设置个性签名吧';
		},
		methods: {
			clickhead() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.headimg = res.tempFilePaths[0];
					}
				})
			},

			clickmsg(item) {
				this.pushtopage(item.name);
			},

			pushtopage(name) {
				if (name === '设置') {
					uni.navigateTo({
						url: '../setup'
					})
				} else if (name == '会员特权') {
					this.isvipReq();
				}
				else if (name == '收藏') {
					uni.navigateTo({
						url: '../collect'
					})
				}
				else if (name == '卡包') {
					uni.navigateTo({
						url: '../cards'
					})
				}
				else{
					this.$toast('开发中,敬请期待!')
				}
			},
			//判断是否是会员接口
			async isvipReq() {
				let data = await this.$http.isvipReq();
				if (data.isvip) {
					uni.navigateTo({
						url: '/pages/vipright'
					})
				} else {
					this.$modal('您不是会员,是否去开通会员?', () => {
						uni.navigateTo({
							url: '/pages/vip'
						})
					})
				}
			},

			gomodiinfo() {
				uni.navigateTo({
					url: '../modiinfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my {
		$rowheight: 50px;
		display: flex;
		flex-direction: column;

		.list {
			.head {
				margin-top: 20px;
				margin-left: 20px;
				height: 60px;
				display: flex;

				image {
					width: 60px;
					height: 60px;
					border-radius: 30px;
				}

				.info {
					margin-left: 20px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}

			.line1 {
				margin-top: 10px;
				background-color: rgb(240, 240, 240);
				height: 5px;
			}

			.item {
				display: flex;
				flex-direction: column;

				.info {
					height: $rowheight;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.richtext {
						width: 100px;
						height: $rowheight;
						display: flex;
						align-items: center;
						justify-content: space-between;

						image {
							width: 30px;
							height: 30px;
						}
					}

					.arrow {
						width: 20px;
						height: 20px;
					}
				}

				.line2 {
					height: 1px;
					background-color: rgb(230, 230, 230);
				}
			}
		}
	}
</style>

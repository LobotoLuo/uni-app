<template>
	<view class="info">
		<img style="width: 100%;" src="../static/infobg.jpg">
		<img class="back" @click="back" src="../static/back.png">
		<view class="content">
			<div class="des">
				<img class="head" src="../static/head.png">
				<view class="grid">
					<div class="t1">粉丝</div>
					<div class="t1">关注</div>
					<div class="t1">获赞</div>
					<div class="t2">231</div>
					<div class="t2">265</div>
					<div class="t2">6744</div>
					<div>编辑资料</div>
					<div>
						<img class="set" src="../static/set.png">
					</div>
				</view>
			</div>
			<view class="intro">
				<view class="i1">周星星</view>
				<view class="i2">极客号:9527</view>
				<view class="i3">你好呀朋友</view>
				<view class="i4"></view>
			</view>

			<view class="list">
				<view v-for="item in list" class="item">
					<img :src="item.url">
					<text class="itext">{{item.text}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						url: 'static/info1.png',
						text: '互动消息'
					},
					{
						url: 'static/info2.png',
						text: '我的评价'
					},
					{
						url: 'static/info3.png',
						text: '我的问答'
					},
					{
						url: 'static/info4.png',
						text: '我的收藏'
					},
				]
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>
<style scoped>
	.info {
		position: relative;
		height: 100vh;
	}

	.content {
		position: absolute;
		background: white;
		border-top-right-radius: 30px;
		border-top-left-radius: 30px;
		top: 200px;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.list {
		display: flex;
		margin-top: 20px;
	}
	.item{
		flex:1;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 10px;
	}
	.item>img{
		width: 25px;
		height: 25px;
	}
    .itext{
		font-size: 14px;
		color: #666;
	}
	.intro {
		margin-left: 20px;
	}

	.i1 {
		font-size: 18px;
		font-weight: bold;
	}

	.i2,
	.i3 {
		margin-top: 10px;
		font-size: 12px;
		color: #999;
	}

	.i4 {
		margin-top: 20px;
		background: #ddd;
		height: 0.5px;
		width: calc(100vw - 40px);
	}

	.head {
		width: 80px;
		height: 80px;
		margin-left: 20px;
		margin-top: 20px;
	}

	.back {
		top: 10px;
		left: 10px;
		position: absolute;
		width: 30px;
		height: 30px;
	}

	.grid {
		display: grid;
		height: 120px;
		margin: 0 10px;
		column-gap: 10px;
		align-content: center;
		align-items: center;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 20px 20px 40px;
	}

	.grid>div {
		display: grid;
		place-items: center;
	}

	.grid>div:nth-child(7) {
		grid-column: span 2;
		background: #f1f1f6;
		height: 30px;
		border-radius: 15px;
	}

	.grid>div:nth-child(8) {
		background: #f1f1f6;
		height: 30px;
		border-radius: 15px;
	}

	.set {
		width: 25px;
		height: 25px;
	}

	.des {
		display: flex;

	}

	.des>.grid {
		flex: 1;
	}

	.t1 {
		color: #c4c4c4;
		font-size: 12px;
	}

	.t2 {
		font-size: 14px;
		font-weight: bold;
	}
</style>

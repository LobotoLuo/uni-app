<template>
	<view class="">
		<db-nav :showback="true" title="收藏列表">
		</db-nav>
		<view @click="clickgoods(item)" v-for="item in collectlist" class="item">
			<img class="img" :src="item.url"></img>
			<view class="des">
				<text class="name">{{item.name}}</text>
				<text class="price">{{item.price}}元</text>
			</view>
			<view class="dele" @click.stop="dele(item.id)">
				删除
			</view>
		</view>
		<view v-if="collectlist.length==0" class="nodata">
			<img style="width: 60%;" src="../static/my/nocollect.png"></img>
			<text class="text">暂无收藏</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['collectlist'])
		},
		methods: {
			...mapMutations(['delecollect']),
			/* 删除 */
			dele(id) {
				this.$modal('是否取消收藏?', () => {
					this.delecollect(id);
					this.$toast('取消成功!');
				})

			},
			//点击商品
			clickgoods(goods) {
				uni.navigateTo({
					url: `./goodsdetail?goodsobj=${JSON.stringify(goods)}`,
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 10px;
		column-gap: 10px;
	}

	.nodata {
		display: flex;
		flex-direction: column;
		align-items: center;

		.text {
			color: gray;
		}
	}

	.dele {
		position: absolute;
		right: 10px;
		width: 60px;
		height: 40px;
		border-radius: 5px;
		color: white;
		background: royalblue;
		display: grid;
		place-items: center;
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
		width: 200px;
	}

	.price {
		font-size: 12px;
		font-weight: bold;
		color: red;
	}
</style>

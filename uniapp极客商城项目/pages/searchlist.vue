<template>
	<view class="searchlist">
		<db-nav title="搜索列表"></db-nav>
		<scroll-view class="scroll" scroll-y="true" >
			<view class="goodslist">
				<db-goods @click.native='clickgoods(item)'
				:goods="item" v-for="(item,index) in goodslist" :key='item.id'
				class="goods"></db-goods>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goodslist:[]
			}
		},
		
		onLoad(params){
			this.goodslist = this.$receive(params.list);
		},
		methods:{
			clickgoods(item){
				uni.navigateTo({
					url:'./goodsdetail?goodsobj='+this.$pass(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchlist{
		.scroll{
			position: fixed;
			top: 40px;
			left: 0px;
			right: 0px;
			border: 0px;
			.goodslist{
				display: flex;
				flex-wrap: wrap;
				.goods{
					margin-top: 10px;
					margin-left: 10px;
				}
			}
		}
		
	}
</style>

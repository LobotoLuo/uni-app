<template>
	<view class="">
		<db-nav :showback="false" 
		title="个人主页"></db-nav>
		<view class="item" 
		@click="godetail(index)"
		v-for="(item,index) in list">
			<div>{{item}}</div>
			<image class="arrow" src="../../static/my/arrow.png"></image>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				list:[
					'刘备',
					'关羽',
					'张飞',
					'赵云',
					'诸葛'
				]
			}
		},
		
		methods:{
			/* 去个人主页 */
			godetail(index){
				let path = (index+1)+'.png';
				uni.navigateTo({
					url:'/pages/resumedetail?path='+path
				})
			}
		}
	}
</script>

<style scoped>
	.item{
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		border-bottom: 1px solid #ccc;
	}
	.arrow {
		width: 20px;
		height: 20px;
	}
</style>
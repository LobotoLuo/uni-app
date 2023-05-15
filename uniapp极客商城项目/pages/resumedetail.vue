<template>
	<view class="">
		<image class="img" :src="path" 
		mode="aspectFill"></image>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				path:''
			}
		},
		onLoad(option){
			this.path ='../static/resumes/'+option.path;
		}
	}
</script>

<style scoped>
	.img{
		width: 100%;
		height: 100vh;
	}
</style>
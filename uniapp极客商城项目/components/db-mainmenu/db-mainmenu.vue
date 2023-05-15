<template>
	<view class="db-mainmenu">
		<view class="mainmenu">
			<image class="img" :src="menuobj.url"></image>
			<view class="text">{{menuobj.name}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		
		props:{
			menuobj:{
				type:Object,
				default:{}
			}
		}
	}
</script>

<style lang="scss">
	.db-mainmenu{
		.mainmenu{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			width: 20vw;
			height: 90px;
			.img{
				height: 50px;
				width: 50px;
			}
			.text{
				color: #666666;
				font-size: 14px;
			}
		}
	}
</style>

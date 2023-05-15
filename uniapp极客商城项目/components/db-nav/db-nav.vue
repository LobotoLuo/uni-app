<template>
	<view class="db-nav">
		
		<view class="nav">
			<view class="title">
				{{title}}
			</view>
			<image v-if="showback" class="back" 
			@click="back"
			src="../../static/back.png"></image>
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
			title:{
				type:String,
				default:''
			},
			showback:{
				type:Boolean,
				default:true
			}
		},
		
		methods:{
			back(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	.db-nav{
		position: relative;
		.nav{
			height: 40px;
			position: relative;
			.title{
			background-color: #007AFF;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			font-size: 20px;
			font-weight: bold;
			}
			
			.back{
				width: 30px;
				height: 30px;
				position: absolute;
			    left: 10px;
				top: 5px;
				
				
			}
		}
		
	}
</style>

<template>
	<view class="db-segment">
		<view class="list">
			<view @click="clickmsg(index)"
			v-for="(item,index) in titlelist" :key='item'
			:class="{'default':true,'select':index === currentselectindex}">{{item}}</view>
		</view>
		
		<image v-if="segmenttype === 0"
		 @click="leftclick"
		class="leftimg" src="../../static/sign.png"></image>
		<image v-if="segmenttype === 0" 
		@click="rightclick"
		class="rightimg" src="../../static/vip.png"></image>
		
		<image v-if="segmenttype === 1" 
		@click="leftclick"
		class="leftimg" src="../../static/camera.png"></image>
		<image v-if="segmenttype === 1" 
		@click="rightclick"
		class="rightimg" src="../../static/headimg.png"></image>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
			currentselectindex:1,	
			}
		},
		
		props:{
			//segment内容
			titlelist:{
				type:Array,
				default:[]
			},
			//segmenttype 左右按钮样式 0首页 1精选
			segmenttype:{
				type:Number,
				default:0
			}
		},
		
		created() {
			this.$emit('clickmsg',1);
		},
		
		methods:{
			clickmsg(index){
				this.currentselectindex = index;
				this.$emit('clickmsg',index);
			},
			leftclick(){
				this.$emit('leftclick');
			},
			
			rightclick(){
				this.$emit('rightclick');
			}
		}
	}
</script>

<style lang="scss">
	.db-segment{
		position: relative;
		.leftimg{
			position: absolute;
			left: 5px;
			width: 30px;
			height: 30px;
			top: 15px;
		}
		.rightimg{
			position: absolute;
			right: 10px;
			width: 30px;
			height: 30px;
			top: 15px;
		}
		.list{
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			.default{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 60px;
				color: #999999;
				font-size: 16px;
				&.select{
					color: #000000;
					font-size: 20px;
				}
			}
		}
		
	}
</style>

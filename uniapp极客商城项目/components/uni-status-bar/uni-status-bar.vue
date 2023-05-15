<template>
	<view class="uni-status-bar">
		<view :class="['uni-status-bar-content', { 'uni-status-bar-content-fixed' : (!noFixed)}]" :style="{ height: statusBarHeight, background: background }">
			<slot></slot>
		</view>
		<view class="uni-status-bar-place" :style="{ height: statusBarHeight }" v-if="(!noFixed) && (!noPlace)"></view>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	/**
	 * 自适应状态栏组件  
	 * @description 自适应状态栏组件  
	 * @example <uni-status-bar></uni-status-bar>  
	 */ 
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight
			};
		},
		props: {
			noPlace: {
				type: Boolean,
				default: false
			},
			noFixed: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				default: 'transparent'
			}
		}
	}
</script>

<style scoped>
	.uni-status-bar {
		width: 750rpx;
	}
	.uni-status-bar-content{
		width: 750rpx;
		height: var(--status-bar-height);
	}
	.uni-status-bar-content-fixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.uni-status-bar-place{
		width: 750rpx;
		height: var(--status-bar-height);
		background: transparent;
	}
</style>

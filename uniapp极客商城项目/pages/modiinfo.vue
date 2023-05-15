<template>
	<view class="modiinfo">
		<db-nav title="信息修改"></db-nav>
		
		<view class="name">
			<input class="input" type="text" v-model="name" disabled="true"/>
		</view>
		
		<view class="signname">
			<input class="input" type="text" v-model="signname"/>
		</view>
		
		<button class="modi"
		@click="modi"
		 type="default">修改信息</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			 name:'',
			 signname:''
			}
		},
		
		methods:{
			modi(){
				if(!this.name||!this.signname){
					this.$toast('修改内容不能为空')
					return;
				}else{
					let user = uni.getStorageSync('user');
					user.signname = this.signname;
					uni.setStorageSync('user',user);
					this.$toast('修改成功');
				}
				
				
			}
		},
		
		onLoad(){
			let user = uni.getStorageSync('user');
			this.name = user.name || '';
			this.signname = user.signname || '';
		}
	}
</script>

<style lang="scss">
	.modiinfo{
		.name{
			margin-top: 20px;
			display: flex;
			align-items: center;
			height: 40px;
			border: 1px solid #000000;
			border-radius: 20px;
			margin-left: 10px;
			margin-right: 10px;
			.input{
				margin-left: 10px;
				margin-right: 10px;
				width: 100%;
			}
		}
		
		.signname{
			@extend .name;
		}
		.modi{
			margin-top:40px;
			color: #ffffff;
			margin-left: 10px;
			margin-right: 10px;
			background-color: #007AFF;
		}
	}
</style>

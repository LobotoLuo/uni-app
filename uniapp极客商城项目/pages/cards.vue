<template>
	<view class="">
		<db-nav :showback="true" title="卡包"></db-nav>
		<view class="box">
			<view 
			class="cards" 
			:style="{transform:rotate}"
			@click="trans">
				<view class="card front"></view>
				<view class="card back">
					中国银行
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				/* 是否正面 */
				front:true,
				rotate:'rotateY(0)'
			}
		},
		methods:{
			trans(){
				if(this.front){
					this.rotate = 'rotateY(180deg)';
				}else{
					this.rotate = 'rotateY(0)';
				}
				this.front = !this.front;
				
			}
		}
	}
</script>
<style scoped lang="scss">
	.box{
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
	.cards {
		position: relative;
		width: 80vw;
		transition: all 1s;
		transform-style: preserve-3d;
	}
	.card {
		width: 80vw;
		height: 50vw;
		top: 0;
		bottom: 0;
		position: absolute;
		backface-visibility: hidden;
	}
	.back {
		font-size: 30px;
		color: red;
		font-weight: bold;
		background: #eee;
		border-radius: 10px;
		transform: rotateY(180deg);
		display: grid;
		place-items: center;
	}
	.front {
		background-image: url(../static/my/card1.png);
		background-size: 80vw 50vw;
		background-repeat: no-repeat;
	}
</style>

<template>
	<view class="search">
		<db-nav title='搜索'></db-nav>
		<view class="searchbar">
			<input @input="input"
			@focus="focus"
			v-model="searchtext"
			type="text" placeholder="请输入商品名字"/>
			<image v-show="showcancle"
			@click="cancle"
			 src="../static/cancle.png"></image>
		</view>
		
		<view class="searchlist" @click="clickmsg(item)"
		 v-for="item in searchlist">
			<view class="cell">
				{{item.name}}
			</view>
		</view>
		<view v-show="shownodata" class="nodata">
			暂无相关商品信息
		</view>
		
		<view class="historylist">
			<view class="head">
				<view class="title">历史搜索</view>
				<image @click="deletemsg" src="../static/delete.png"></image>
			</view>
			<view class="recordlist" >
				<view class="record" @click="clickrecord(item)"
				 v-for="item in recordlist">
					{{item.searchtext}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				showcancle:false,
				searchtext:'',
				timerid:0,
				searchlist:[],
				//是否显示无搜索结果页面
				shownodata:false,
			}
		},
		
		computed:{
			...mapState({
			   recordlist:"recordlist"
			})
		},
		
		methods:{
			...mapMutations({
			   addrecord:"addrecord",
			   clearrecord:"clearrecord"
			}),
			//删除搜索记录
			deletemsg(){
				this.clearrecord();
			},
			clickrecord(item){
				this.searchReq1(()=>{
					uni.navigateTo({
						url:'./goodsdetail?goodsobj='+this.$pass(item)
					})
				});
				
			},
			input(e){
				//节流函数
				clearTimeout(this.timerid);
				this.timerid = setTimeout(()=>{
					this.searchReq1();
				},500);
				
			},
			//搜索接口
			async searchReq1(callback){
				let data = await this.$http.searchReq(this.searchtext);
				this.searchlist = data.data;
				/* 
				如果输入框内容不存在,并且没有搜索结果显示nodata页面
				*/
				this.shownodata = this.searchtext&&(this.searchlist.length>0?false:true);
				callback?callback():'';
			},
			focus(){
				this.showcancle = true;
			},
			cancle(){
				this.searchtext = '';
				this.searchlist = [];
				this.showcancle = false;
			},
			clickmsg(item){
				item.searchtext = this.searchtext;
				this.addrecord(item);
				uni.navigateTo({
					url:'./goodsdetail?goodsobj='+this.$pass(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.search{
		.nodata{
			height: 40px;
			display: grid;
			place-items: center;
			background: skyblue;
			color: white;
		}
		.searchbar{
			height: 40px;
			border: 1px solid #000000;
			border-radius: 20px;
			margin-left: 10px;
			margin-right: 10px;
			margin-top: 20px;
			
			display: flex;
			align-items:center;
			input{
				flex: 1;
				margin-left: 10px;
			}
			image{
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}
		
		.searchlist{
			.cell{
				margin: 2px;
				background-color: #ddd;
				height: 40px;
				display: flex;
				align-items: center;
			}
		}
		
		.historylist{
			margin-top: 20px;
			.head{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.title{
					margin-left: 10px;
					font-weight: bold;
					font-size: 16px;
				}
				image{
					margin-right: 10px;
					width: 20px;
					height: 20px;
				}
			}
			.recordlist{
				display: flex;
				flex-wrap: wrap;
				.record{
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #C8C7CC;
					height: 30px;
					border-radius: 15px;
					padding-left: 5px;
					padding-right: 5px;
					margin-left: 10px;
					margin-top: 10px;
					
				}
			}
			
		}
	}
</style>

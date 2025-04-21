<template>
	<view>
		<view class="wrap">
			<view v-for="(item,index) in workList" :key="index" @tap="clickContent(item)" hover-class="hoverClass">
				<view style="margin-top: 20rpx;">
					<u-lazy-load :image="item.faceUrl" img-mode="aspectFill" height="400"></u-lazy-load>
					<view class="title">{{item.title}}</view>
				</view>
				<view class="foot">
					<view>{{item.source}}</view>
					<view>{{item.createTime}}</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" @loadmore="loadWorkList" class="footer"/>
	</view>
</template>

<script>
import config from "common/config.js" // 全局配置文件
export default {
	data() {
		return {
			title:'新闻资讯',
			logoUrl:'../../static/img/index/logo.jpg',
			workList:[],
			status: 'loadmore',
			pageNum:1,
			pageSize:10,
			loadNum:10
		};
	},
	onLoad() {
		this.getWorkList();
	},
	methods: {
		clickContent(item){
			if(item.id){
				this.$u.route('/pages/content/content', {
					id: item.id
				});
			}else{
				this.$mytip.toast('待完善')
			}
		},
		getWorkList(){
			this.status = 'loadmore';
			let url = "/api/cmsApi/findArticleList";
			this.$u.get(url,{
				type:1,
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				orderByColumn:'create_time',
				isAsc:'desc'
			}).then(obj => {
				let data = obj.rows
				if(data.length>0){
					data.filter(item=>{
						this.workList.push({id:item.id,source: item.articleSource,title: item.smallTitle,createTime:item.createTime,faceUrl:config.baseUrl+item.faceUrl})
					})
					if(this.loadNum >= obj.total){
						this.status = 'nomore';
					}
				}else{
					this.status = 'nomore';
				}
			});
		},
		loadWorkList(){
			if(this.status == 'nomore') return ;
			this.status = 'loading';
			this.pageNum = ++ this.pageNum;
			this.loadNum = this.loadNum + this.pageSize
			this.getWorkList()
		}
	}
};
</script>

<style scoped lang="scss">
	page {
		background: #fff;
	}
	
	.wrap { 
		margin: 0 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		.title{
			padding: 30rpx 0 0 0;
			font-size: 35rpx;
			color: $u-main-color;
			font-weight: bold;
		}
		.foot{
			display: flex;
			justify-content: space-between;
			font-weight: normal;
			font-size: 26rpx;
			color: $u-tips-color;
			padding: 30rpx 0;
			border-radius: 6rpx;
			border-bottom: 5px solid #ededed;
		}
	}
	
	.footer {
	  height: 120rpx;
	  line-height: 120rpx;
	  overflow: hidden;
	  text-align: center;
	  color: #999;
	}
</style>
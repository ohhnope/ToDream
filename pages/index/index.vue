<template>
	<view class="u-p-l-20 u-p-r-20">
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="main-flex">
				<view class="u-p-l-20" @click="notice">
					<u-icon name="chat" size="50" color="#666"></u-icon>
				</view>
				<!-- #ifdef H5-->
					<u-search class="u-p-l-20" placeholder="输入搜索关键字" v-model="keyword" input-align="left"  :show-action="false" :clearabled="true"
					:disabled="true" style="width: 660rpx" @click="search"></u-search>
				<!-- #endif -->
				<!-- #ifdef MP-->
					<u-search class="u-p-l-20" placeholder="输入搜索关键字" v-model="keyword" input-align="left"  :show-action="false" :clearabled="true"
					:disabled="true" style="width: 420rpx" @click="search"></u-search>
				<!-- #endif -->
			</view>
		</u-navbar>
		<view>
			<u-swiper :list="swiperList" height="300" effect3d effect3d-previous-margin="30" :interval="5000" mode="rect" bg-color="#fff"></u-swiper>
		</view>
		<view>
			<view class="rowClass">
				<u-row  justify="center">
					<u-col span="3" text-align="center" v-for="(item,index) in navList" :key="index">
						<view class="u-padding-top-20" @tap="clickNav">
							<image :src="item.src" class="main-icon" mode="widthFix"></image>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
			<u-gap height="10"></u-gap>
			<view class="firstCate" >
				<image :src="advertImg" mode="widthFix" style="width: 700rpx;"></image>
			</view>
			<u-gap height="15"></u-gap>
			<view class="hotCate" v-show="!loading">
				<view class="left">
					<image :src="hotImg" mode="widthFix" style="width: 100rpx;max-width: 100rpx;"></image>
					<view class="text">
						<view class="title">热门推荐</view>
						<view class="desc">Popular Recommendation</view>
					</view>
				</view>
				<view class="right">
					<u-icon name="arrow-right" size="40" color="#ddd" ></u-icon>
				</view>
			</view>
			<u-gap height="20"></u-gap>
			<u-waterfall v-model="flowList" ref="uWaterfall">
			    <template v-slot:left="{leftList}">
			        <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
			            <u-lazy-load threshold="750" border-radius="12" :image="item.image" :index="index" 
			                         @click="clickImage(item.id)"></u-lazy-load>
			            <view class="item-title">{{item.goodsName}}</view>
						<view class="item-bottom">
							<view class="item-price">
								<view class="new-price">￥{{item.newPrice}}</view>
								<view class="old-price">￥{{item.oldPrice}}</view>
							</view>
							<view class="right">
								免邮费
							</view>
						</view>
			        </view>
			    </template>
			    <template v-slot:right="{rightList}">
			        <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
			            <u-lazy-load threshold="750" border-radius="10" :image="item.image" :index="index"
			                         @click="clickImage(item.id)"></u-lazy-load>
			            <view class="item-title">{{item.goodsName}}</view>
			            <view class="item-bottom">
			            	<view class="item-price">
			            		<view class="new-price">￥{{item.newPrice}}</view>
			            		<view class="old-price">￥{{item.oldPrice}}</view>
			            	</view>
			            	<view class="right">
			            		免邮费
			            	</view>
			            </view>
			        </view>
			    </template>
			</u-waterfall>
		</view>
		<u-loadmore bg-color="rgb(250, 250, 250)" :status="loadStatus" @loadmore="findGoodsList" v-show="!loading" style="padding:10rpx 0;"></u-loadmore>
		<u-back-top :scroll-top="scrollTop" top="5000"></u-back-top>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	export default {
		data() {
			return {
				keyword: '',
				loading:true,
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				swiperList: [],
				navList:[],
				advertImg:null,
				hotImg:null,
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode')
			}
		},
		onLoad() {
			// 移除tab badge
			uni.removeTabBarBadge({
				index:2
			})
			// 获取数据
			this.findMallIndexList();
		},
		onShow(){
			// 流量统计
			this.appSysFlowInfo()
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
		    this.loadStatus = 'loading';
		    // 获取数据
			this.findGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 获取数据
			this.pageNum = 1
			this.flowList = []
			this.$refs.uWaterfall.clear();
			this.findGoodsList();
			// 关闭刷新
			uni.stopPullDownRefresh();
		},
		methods: {
			search(){
				this.$u.route({
					url: 'pages/search/search',
				})
			},
			notice(){
				this.$u.route({
					url: 'pages/notice/notice'
				})
			},
			findMallIndexList() {
				this.loading=true
				let url = "/api/mallApi/findMallIndexList";
				this.$u.get(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					orderByColumn: 'create_time',
					isAsc: 'desc'
				}).then(result => {
					const data = result.data;
					// 轮播
					const advertList = data.advertList;
					for (let i = 0; i < advertList.length; i++) {
						let item = advertList[i]
						if(item.advertType === 0 ){
							item.title=item.advertName
							item.image=config.staticUrl+item.advertUrl
							this.swiperList.push(item);
						}
						if(item.advertType === 1){
							this.advertImg=config.staticUrl+item.advertUrl
						}
						if(item.advertType === 2){
							this.hotImg=config.staticUrl+item.advertUrl
						}
					}
					// 导航栏
					const navigateList= data.navigateList;
					for (let i = 0; i < navigateList.length; i++) {
						let item = navigateList[i]
						item.name=item.navigateName
						item.src=config.staticUrl+item.navigateUrl
						this.navList.push(item);
					}
					// 商品数据
					const goodsList = data.goodsList;
					if(this.pageNum>1 && goodsList.length < this.pageSize){
						return this.loadStatus = 'nomore';
					}
					for (let i = 0; i < goodsList.length; i++) {
					    let item = goodsList[i]
						item.image = config.staticUrl+item.goodsFaceUrl
					    this.flowList.push(item);
					}
					++ this.pageNum 
					this.loadStatus = 'loadmore';
					this.loading=false
				});
			},
			findGoodsList(){
				let url = "/api/mallApi/findGoodsList";
				this.$u.get(url, {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					orderByColumn: 'create_time',
					isAsc: 'desc'
				}).then(result => {
					// 商品数据
					const goodsList = result.rows;
					if(this.pageNum>1 && goodsList.length < this.pageSize){
						return this.loadStatus = 'nomore';
					}
					for (let i = 0; i < goodsList.length; i++) {
					    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					    let item = goodsList[i]
						item.image = config.staticUrl+item.goodsFaceUrl
					    this.flowList.push(item);
					}
					++ this.pageNum 
					this.loadStatus = 'loadmore';
				});
			},
			clickSearch() {
			    this.$u.route('/pages/search/search');
			},
			clickImage(goodsId) {
				this.$u.route({
					url: '/pages/detail/detail',
					params: {
						goodsId: goodsId
					}
				})
			},
			clickNav(){
				this.$u.route('/pages/search/searchList');
			},
			code(){
				this.$mytip.toast('请咨询作者')
			},
			appSysFlowInfo(){
				// 流量统计
				let uvCode = uni.getStorageSync("uvCode");
				let url = "https://sourcebyte.cn/api/flow/upFlow?type=APP&uvCode=" + uvCode;
				uni.request({
				  url: url,
				  method: "POST",
				  success: (res) => {
					uni.setStorageSync("uvCode", res.data.data);
				  },
				});
			},
			server(){
				window.open ('https://sourcebyte.cn')
			},
			notice(){
				this.$u.route('/pages/notice/notice');
			},
		}
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.nomore {
		background-color: $u-bg-color;
	}
	
	.search{
		width: 54px;
		height: 44px;
		&:active{
			background-color: $u-bg-color;
		}
	}
	
	.rowClass{
		margin-top: 10rpx;
	}
	
	.firstCate{
		text-align: center;
	}
	
	.hotCate{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 10rpx;
		.left {
			display: flex;
			align-items: center;
			.text{
				padding-left: 10rpx;
				.title{
					font-size: 32rpx;
					color: $u-main-color;
					font-weight: 800;
				}
				.desc{
					font-weight: normal;
					font-size: 22rpx;
					color: $u-tips-color;
				}
			}
		}
		.right{
			padding-right: 10rpx;
		}
	} 
	
	.tabName{
		font-size: 22rpx;
		color: $u-main-color;
	}
	
	.demo-warter {
	    border-radius: 8px;
	    margin-top: 3px;
	    background-color: $u-bg-color;
	    padding: 3px;
	    position: relative;
		box-shadow: 4rpx 0 10rpx rgba(0,0,0,.06);
	}
	
	.item-title {
	    font-size: 28rpx;
	    color: $u-main-color;
	    font-weight: bold;
		padding-top: 10rpx;
		padding-left: 10rpx;
		background-color: #fff;
	}
	
	.item-bottom{
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item-price {
			display: flex;
			align-items: center;
			width: 220rpx;
			max-width: 220rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			.new-price{
				font-weight: normal;
				font-size: 16px;
				color: $base-color;
				padding: 5px 0 5px 2px;
			}
			.old-price{
				font-weight: normal;
				font-size: 13px;
				text-decoration:line-through;
				color: $u-tips-color;
				padding: 5px 0 5px 5px;
			}
		}
		.right{
			color:#fff ;
			background-image:linear-gradient(to left,rgba(#ff536f,1),rgba(#ff536f,0.6));
			padding: 2rpx 12rpx;
			border-radius: 30rpx;
			margin-right: 5rpx;
		}
	}
	
	.item-desc {
	    font-weight: normal;
	    font-size: 26rpx;
	    color: $u-tips-color;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
		background-color: #fff;
	}
</style>

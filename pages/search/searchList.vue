<template>
    <view>
		<u-sticky offset-top="0">
		    <view class="sticky">
		       <view class="nav">
		       	<block v-for="(item,index) in filterData" :key="index">
		       	    <text class="name" :class="item.checked?'active':''"
		       		@click="checkTab(item)"
		       		>
						{{item.name}}
					</text>
		       	</block>
		       </view>
		    </view>
		</u-sticky>
       <view class="u-p-l-10 u-p-r-10 waterfall">
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
		   <u-loadmore bg-color="rgb(250, 250, 250)" :status="loadStatus" @loadmore="findGoodsList" v-show="loading" style="padding:10rpx 0;"></u-loadmore>
		   <u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		   <u-no-network></u-no-network>
	   </view>
    </view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
    export default {
        data() {
            return {
				loading:true,
				indexArr: [],
				valueArr: [],
                defaultSelected: [],
                filterData: [{
						name: '综合排序',
						checked:true
					},
					{
						name: '销量',
						checked:false
					},
					{
						name: '价格',
						checked:false,
					},
					{
						name: '好评率',
						checked:false
					}
				],
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
                loadStatus: 'loadmore',
                flowList: [],
            }
        },
	   onLoad() {
		// 获取数据
		this.findGoodsList();
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
			clickImage(goodsId) {
				this.$u.route({
					url: '/pages/detail/detail',
					params: {
						goodsId: goodsId
					}
				})
			},
			//接收菜单结果
			confirm(e) {
			    this.indexArr = e.index;
				console.log(this.indexArr );
			    this.valueArr = e.value;
				console.log(this.valueArr);
				console.log(e);
			},
			code(){
				this.$mytip.toast('请咨询技术支持')
			},
			checkTab(item){
				if(!item.isSort){
					this.filterData.filter(data=>{
						data.checked = false
					})
					item.checked = true
				}else{
					if(!item.asc){
						item.asc = true
						item.desc = false
					}else{
						item.desc = true
						item.asc = false
					}
				}
			}
        }
    }
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.nav {
	    width: 100%;
	    height: 88rpx;
	    border-bottom: solid 1rpx #eee;
	    z-index: 12;
	    background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 15px;
		color: $u-main-color;
		box-shadow: 4rpx 0 10rpx rgba(0,0,0,.06);
	
		.name {
			width: 120rpx;
			height: 44rpx;
			text-align: center;
			text-overflow: clip;
			overflow: hidden;
			position: relative;
			.sort{
				display: flex;
				flex-direction: column;
				position: absolute;
				height: 40rpx;
				line-height: 40rpx;
				right: 0;
				top: 0;
			}
		}
		
		.active{
			color: $base-color;
			border-bottom: 2px solid $base-color;
			height: 28px;
			line-height: 28px;
			font-weight: 600;
		}
	}
	
	
	.nomore {
		background-color: $u-bg-color;
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

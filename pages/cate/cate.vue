<template>
	<view class="u-wrap">
		<u-navbar :is-back="false" :border-bottom="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="u-p-l-20" @click="notice">
					<u-icon name="chat" size="50" color="#666"></u-icon>
				</view>
				<!-- #ifndef MP-->
					<u-search class="u-p-l-20" placeholder="输入搜索关键字" v-model="keyword" input-align="left"  :show-action="false" :clearabled="true"
					:disabled="true" style="width: 660rpx" @click="search"></u-search>
				<!-- #endif -->
				<!-- #ifndef H5 -->
					<u-search class="u-p-l-20" placeholder="输入搜索关键字" v-model="keyword" input-align="left"  :show-action="false" :clearabled="true"
					:disabled="true" style="width: 420rpx" @click="search"></u-search>
				<!-- #endif -->
			</view>
		</u-navbar>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.classifyName}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-title">
								<text>{{item.classifyName}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.children" :key="index1" @click="detail(item1)">
									<image class="item-menu-image" :src="item1.classifyUrl" mode=""></image>
									<view class="item-menu-name margin-top-sm">{{item1.classifyName}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	export default {
		data() {
			return {
				keyword: '',
				tabbar: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		onLoad() {
			this.findClassifyList()
		},
		methods: {
			findClassifyList(){
				let url = "/api/mallApi/findClassifyList";
				this.$u.get(url, {
					orderByColumn: 'create_time',
					isAsc: 'desc'
				}).then(result => {
					// 分类数据
					const classifyData = result.rows;
					for (let i = 0; i < classifyData.length; i++) {
					    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					    let item = classifyData[i];
						item.classifyName = item.classifyName;
						item.classifyUrl = config.staticUrl+item.classifyUrl;
						for (let j = 0; j < item.children.length; j++) {
						    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
						    let item2 = item.children[j];
							item2.classifyName = item2.classifyName;
							item2.classifyUrl = config.staticUrl+item2.classifyUrl;
						}
					}
					this.tabbar = classifyData
				});
			},
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
			detail(item){
				// this.$u.route({
				// 	url: 'pages/detail/detail',
				// 	params: {
				// 		icon:item.icon,
				// 		name: item.name
				// 	}
				// })
				this.$u.route({
					url: 'pages/search/searchList',
				})
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		margin-top: 50rpx;
		/* #ifdef H5 */
		margin-top: 0rpx;
		/* #endif */
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color:$base-color;
		font-size: 30rpx;
		font-weight: 500;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $base-color;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 30rpx;
		color: $u-main-color;
		font-weight: bold;
		margin: 10rpx 0;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
	}
</style>

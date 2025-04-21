<template>
	<view>
		<view class="top">
			<image class="u-bg" src="/static/bg/user.jpg"></image>
			<view class="user-wrapper">
				<u-avatar :src="avatar" size="140" class="avatar"></u-avatar>
				<view class="login-box" @click="setting">
					<view class="u-font-18 u-p-b-20">{{vuex_user.user.nickName}}</view>
					<view class="u-font-14">{{vuex_user.user.userName}}</view>
				</view>
			</view>
			<image class="arc-line" src="/static/icon/arc.png" mode="aspectFill"></image>
		</view> 
		<view class="contain">
			<view class="top-nav">
				<u-row v-if="vuex_token">
					<u-col span="4" text-align="center" v-for="(item,index) in topNavList" :key="index">
						<view @click="clickNav(item.url)">
							<view class="tabNum">{{item.num}}</view>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
			
			<view class="center-nav">
				<view class="order">
					<view class="left">我的订单</view>
					<view class="right">
						<text class="text" @click="orderList">查看全部</text>
						<u-icon name="arrow-right" size="20" color="#ddd" ></u-icon>
					</view>
				</view>
				<u-row v-if="vuex_token">
					<u-col span="3" text-align="center" v-for="(item,index) in navList" :key="index">
						<view @click="clickNav(item.url)">
							<u-icon :name="item.icon" color="#ff536f" size="50"></u-icon>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="cell-list" v-if="vuex_token">
				<view class="cell" @click="orderList">
					<view class="left">
						<u-icon name="clock" size="38" color="#fa436a" ></u-icon>
						<text class="text">浏览历史</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="code">
					<view class="left">
						<u-icon name="integral" size="38" color="#5fcda2" ></u-icon>
						<text class="text">我的钱包</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="address">
					<view class="left">
						<u-icon name="map" size="38" color="#ee883b" ></u-icon>
						<text class="text">收货地址</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="code">
					<view class="left">
						<u-icon name="star" size="38" color="#54b4ef" ></u-icon>
						<text class="text">我的收藏</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="problem">
					<view class="left">
						<u-icon name="question-circle" size="38" color="#ee883b" ></u-icon>
						<text class="text">常见问题</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="setting">
					<view class="left">
						<u-icon name="setting" size="38" color="#37b0fb" ></u-icon>
						<text class="text">设置</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	export default {
		data() {
			return {
				avatar:uni.getStorageSync('lifeData').vuex_user.user.avatar.includes(config.staticUrl)?uni.getStorageSync('lifeData').vuex_user.user.avatar:config.staticUrl+uni.getStorageSync('lifeData').vuex_user.user.avatar,
				topNavList:[
				   {name:"余额",num:"0",url:"/pages/detail/preHouse"},
				   {name:"优惠卷",num:"0",url:"/pages/detail/preHouse"},
				   {name:"积分",num:"0",url:"/pages/detail/preHouse"},
				],
				navList:[
				   {name:"待付款",icon:"red-packet",url:"/pages/order/order"},
				   {name:"待发货",icon:"order",url:"/pages/order/order"},
				   {name:"待收货",icon:"car",url:"/pages/order/order"},
				   {name:"待评价",icon:"edit-pen",url:"/pages/order/order"}
				],
			}
		},
		onLoad() {
			// 检查token
			this.checkToken();
			uni.$on('updateAvatar', (obj) => {
				// 获取数据
				this.updateAvatar();
			})
		},
		onUnload() {
			// 移除监听事件  
			uni.$off('updateAvatar');
		},
		methods: {
			login() {
				this.$u.route('/pages/login/login')
			},
			logout() {
				// 登录成功修改token与用户信息
				this.$u.vuex('vuex_token', '');
				this.$u.vuex('vuex_user', {});
				this.$u.route('/pages/login/login')
			},
			setting(){
				this.$u.route('/pages/profile/setting')
			},
			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "18720989281",
				});
			},
			problem(){
				this.$u.route({
					url: 'pages/login/problem'
				})
			},
			checkToken(){
				// 判断Token是否有效
				let lifeData = uni.getStorageSync('lifeData');
				let token = lifeData.vuex_token
				if(!token){
					// 没有token 则跳转到登录
					return uni.reLaunch({
						url:'../login/login'
					})
				}
			},
			code(){
				this.$mytip.toast('敬请期待')
			},
			clickNav(url){
				this.$u.route(url);
			},
			orderList(){
				this.$u.route('/pages/order/order')
			},
			address(){
				this.$u.route('/pages/address/address')
			},
			updateAvatar(){
				this.avatar = uni.getStorageSync('lifeData').vuex_user.user.avatar.includes(config.staticUrl)?uni.getStorageSync('lifeData').vuex_user.user.avatar:config.staticUrl+uni.getStorageSync('lifeData').vuex_user.user.avatar
			}
		}
	}
</script>

<style lang="scss">
.top{
	position: relative;
	overflow: hidden;
	padding-top: calc(var(--status-bar-height) + 52rpx);	
	padding-bottom: 6rpx;
		
	.u-bg{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 330rpx;
	}
	.user-wrapper{
		display:flex;
		flex-direction: column;
		flex-direction: row;
		align-items: center;
		position: relative;
		z-index: 5;
		padding: 20rpx 30rpx 60rpx;
	}
	.login-box{
		font-size: 36rpx;
		color: #fff;
	}
	.avatar{
		flex-shrink: 0;
		width: 130rpx;
		height: 130rpx;
		border-radius: 100px;
		margin-right: 24rpx;
		border: 4rpx solid #fff;
		background-color: #fff;
	}
	.username{
		font-size: 34rpx;
		color: #fff;
	}
	.user-group{
		align-self: flex-start;
		padding: 10rpx 16rpx;
		margin-top: 16rpx;
		font-size: 20rpx;
		color: #fff;
		background-color: rgba(255,255,255,.3);
		border-radius: 100rpx;
	}
	.arc-line{
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9;
		width: 100%;
		height: 32rpx;
	}
}

.contain{
	padding: 10rpx 20rpx;
	.top-nav{
		background-color: #FFFFFF;
		padding: 30rpx 0;
		border-radius: 8px;
		.tabNum{
			color: $u-main-color;
			font-size: 34rpx;
			padding-top: 10rpx;
			font-weight: 500;
		}
		.tabName{
			color: $u-tips-color;
			font-size: 22rpx;
			padding-top: 10rpx;
		}
	}
	.center-nav{
		margin-top:20rpx;
		background-color: #FFFFFF;
		padding: 30rpx 0;
		border-radius: 8px;
		.order{
			padding: 10rpx 30rpx 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				color: $u-main-color;
				font-size: 32rpx;
				padding-top: 10rpx;
				font-weight: 600;
			}
			.right{
				font-size: 22rpx;
				color: $u-tips-color;
				.text{
					margin-right: 8rpx;
				}
			}
		}
		.tabName{
			color: $u-tips-color;
			font-size: 26rpx;
			padding-top: 10rpx;
		}
	}
	
	.cell-list{
		background-color: #fff;
		margin-top: 20rpx;
		padding-top: 20rpx;
		.cell{
			padding: 20rpx 30rpx 40rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $u-main-color;
				font-size: 30rpx;
				.text{
					padding-left: 10rpx;
				}
			}
			.right{
				font-size: 28rpx;
				color: $u-tips-color;
			}
		}
	}
}
</style>
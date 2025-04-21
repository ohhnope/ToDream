<template>
	<view>
		<view class="container" v-if="!vuex_token">
			<view class="empty">
				<image :src="empty" style="width: 200px;height: 200px;"></image>
				<view class="title">请先登录</view>
				<view class="tip">别忘了买点什么犒劳一下自己哦</view>
				<view class="btn" @click="login">立即登录</view>
			</view>
		</view>
		<view class="container" v-else-if="vuex_token">
			<view class="cartList" v-if="cartList.length>0">
				<scroll-view scroll-y="true" style="margin-bottom: 100rpx;" >
					<u-swipe-action :show="item.show" :index="index"
						v-for="(item, index) in cartList" :key="index" 
						@click="click" @open="open"
						:options="options"
					>
						<view class="cartItem">
							<view @click="checkSelf(item)">
								<u-icon name="checkbox-mark" size="20" color="#fff" class="checkbox" :style="{background:item.check?'#ff536f':'#eee'}"></u-icon>
							</view>
							<view class="goosImg">
								<image :src="item.image" mode="widthFix" style="width: 200rpx;height: 200rpx;"></image>
							</view>
							<view class="goosMsg">
								<view class="title">
									{{item.title}}
								</view>
								<view class="desc">
									{{item.desc}}
								</view>
								<view class="goosBottom">
									<view class="left">{{item.price}}</view>
									<view class="right">
										<u-number-box
										 v-model="item.value" @change="changeValue"></u-number-box>
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action>
				</scroll-view>
				<view class="bottomView">
					<view class="bottomLeft" @click="checkGoods">
						<u-icon name="checkbox-mark" size="25" color="#fff" class="checkbox" :style="{background:checkAll?'#ff536f':'#eee'}"></u-icon>
						<view class="clear">
							{{checkGoodName}}
						</view>
					</view>
					<view class="bottomRight">
						<view class="left">
							￥{{totalPrice}}
						</view>
						<view class="right" @click="quote">
							去结算({{getcheckedGoods}})
						</view>
					</view>
				</view>
			</view>
			<view class="empty" v-else>
				<image :src="empty" style="width: 200px;height: 200px;"></image>
				<view class="title">空空如也</view>
				<view class="tip">别忘了买点什么犒劳一下自己哦</view>
				<view class="btn" @click="searchList">随便逛逛</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cartList:[],
			checkAll:false,
			totalPrice:0,
			checkedGoods:0,
			checkGoodName:'全选',
			empty:'/static/empty/cart.png',
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#ff536f'
					}
				}
			],
		};
	},
	onShow() {
		if(this.vuex_token){
			this.findCartList()
		}
	},
	computed:{
		getcheckedGoods: function() {
			let checkedGoods = 0
			this.cartList.filter(item => {
				if(item.check){
					checkedGoods++
				}
			})
			return this.checkedGoods=checkedGoods
		}
	},
	methods: {
		click(index, index1) {
			// 计算价格
			if(this.cartList[index].check){
				this.totalPrice = this.totalPrice-this.cartList[index].price
			}
			this.cartList.splice(index, 1);
			this.$mytip.toast('删除成功')
			this.$u.vuex('vuex_cartList', this.cartList);
			let badge = this.vuex_cartList.length
			// 设置tab badge
			if(badge>0){
				uni.setTabBarBadge({ //显示数字
				  index: 2,
				  text: ''+badge+''
				})
			}else{
				// 移除tab badge
				uni.removeTabBarBadge({
					index:2
				})
			}
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.cartList[index].show = true;
			this.cartList.map((val, idx) => {
				if(index != idx) this.cartList[idx].show = false;
			})
		},
		login(){
			this.$u.route('/pages/login/login')
		},
		searchList(){
			this.$u.route('/pages/search/searchList')
		},
		checkSelf(item){
			if(item.check){
				// 计算价格
				this.totalPrice = this.totalPrice-item.price*item.value
				item.check = false;
			}else{
				// 计算价格
				this.totalPrice = this.totalPrice+item.price*item.value
				item.check = true;
			}
			this.cartList.filter(item => {
				this.checkAll = true
				if(!item.check){
					this.checkAll = false
				}
			})
		},
		checkGoods(){
			if(this.checkAll){
				this.checkAll = false;
				this.cartList.map((val, idx) => {
					this.cartList[idx].check = false;
				})
				// 计算价格
				this.totalPrice = 0
				this.checkGoodName = '全选'
			}else{
				this.checkAll = true;
				this.cartList.map((val, idx) => {
					// 计算价格
					this.totalPrice = this.totalPrice+this.cartList[idx].price*this.cartList[idx].value
					this.cartList[idx].check = true;
				})
				this.checkGoodName = '取消'
			}
		},
		changeValue(value){
			this.totalPrice = 0
			this.cartList.map((val, idx) => {
				if(this.cartList[idx].check){
					// 计算价格
					this.totalPrice = this.totalPrice+this.cartList[idx].price*this.cartList[idx].value
				}
			})
		},
		findCartList(){
			this.cartList = this.vuex_cartList.reverse()
			let badge = this.vuex_cartList.length
			// 设置tab badge
			if(badge>0){
				uni.setTabBarBadge({ //显示数字
				  index: 2,
				  text: ''+badge+''
				})
			}
		},
		quote(){
			if(this.checkedGoods == 0){
				return this.$mytip.toast('请选中需要结算的商品')
			}
			this.$u.route('/pages/order/preOrder')
		},
	}
};
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.container{
	width: 100%;
	background-color: #ffffff;
	text-align: center;
	overflow: hidden;
	.cartList{
		text-align: left;
		.cartItem{
			margin: 0 20rpx;
			display: flex;
			align-items: center;
			line-height: 2;
			.checkbox{
				background:#ff536f;border-radius: 100%;margin-right: 20rpx;
				padding: 8rpx;
			}
			.goosMsg{
				margin-left: 20rpx;
				.title{
					width: 430rpx;
					margin-top: -20rpx;
					font-size: 28rpx;
					color: $u-main-color;
					font-weight: 800;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					height: 35px;
					max-height: 35px;
				}
				.desc{
					font-weight: normal;
					font-size: 22rpx;
					color: $u-tips-color;
				}
			}
			.goosBottom{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.num{
					font-size: 26rpx;
					color: $u-main-color;
					font-weight: 800;
				}
				.right{
					font-size: 26rpx;
					color: $u-main-color;
				}
			}
		}
		.bottomView{
			box-shadow:0 -1px 1px 0 rgba(0, 0, 0, 0.05);
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			bottom: 95rpx;
			/* #endif */
			/* #ifdef MP */
			bottom: 0;
			/* #endif */
			background-color: #ffffff;
			z-index: 999;
			height: 100rpx;line-height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			.bottomLeft{
				display: flex;
				align-items: center;
				position: relative;
				height: 100rpx;
				line-height: 100rpx;
				.checkbox{
					border-radius: 100%;
					margin-right: 20rpx;
					margin-top: 10rpx;
					padding: 8rpx;
					z-index: 1;
				}
				.clear{
					width: 120rpx;
					padding: 5rpx; height: 100rpx;line-height: 100rpx;
					text-align: center;border-radius: 10%;
					position: absolute;
					left: 30rpx;
					z-index: 0;
					color: #999;
					font-size: 16px;
				}
			}
			.bottomRight{
				display: flex;
				align-items: center;
				height: 60rpx;line-height: 60rpx;
				.left{
					color: $base-color;
					font-size: 18px;
					font-weight: 800;
					margin-right: 20rpx;
				}
				.right{
					color:#fff ;
					background:$base-color;
					padding: 2rpx 20rpx;
					border-radius: 30rpx;
					margin-left: 20rpx;
				};
			}
		}
	}
	.empty{
		margin-top: 220rpx;
		width: 100%;
		text-align: center;
		.title{
			color: $u-main-color;
			margin: 20rpx 0 10rpx 0;
			font-weight: 400;
			font-size: 18px;
		}
		.tip{
			color: $u-tips-color;
			font-size: 14px;
		}
		.btn {
			color:#fff ;
			background-image:linear-gradient(to left,#ff536f,rgba(#ff536f,0.6));
			width:200rpx;
			padding: 15rpx 28rpx;
			border-radius: 130rpx;
			margin: 80rpx 0 0 275rpx;
		}
	}
}
</style>

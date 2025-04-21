<template>
	<view class="u-wrap">
		<view class="jingdong" v-if="couponList.length>0">
			<view class="left">
				<view class="sum">
					￥
					<text class="num">100</text>
				</view>
				<view class="type">满149元可用</view>
			</view>
			<view class="right">
				<view class="top">
					<text class="tag">新人券</text>
					<view class="title">
						仅可购买个人护理部分商品
					</view>
					<view class="bottom">
						<view class="date u-line-1">2020.01.01-2020.01.31</view>
						<view class="immediate-use">立即使用</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<image :src="empty" style="width: 200px;height: 200px;"></image>
			<view class="tip">暂时没有优惠卷</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			couponList:[],
			empty:'/static/empty/default.png',
		};
	},
};
</script>

<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
.u-wrap {
	padding: 20rpx;
}

.jingdong {
	width: 700rpx;
	height: auto;
	background-color: #ffffff;
	display: flex;
	.left {
		padding: 0 30rpx;
		background-color: $base-color;
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		.sum {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 32rpx;
			.num {
				font-size: 80rpx;
			}
		}
		.type {
			margin-bottom: 50rpx;
			font-size: 24rpx;
		}
	}
	.right {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
		.top {
			.tag {
				padding: 4rpx 20rpx;
				background-color: $base-color;;
				border-radius: 20rpx;
				color: #ffffff;
				font-weight: bold;
				font-size: 24rpx;
				margin-right: 10rpx;
			}
			.title {
				height: 80rpx;
				line-height: 80rpx;
			}
			.bottom {
				border-top: 2rpx dashed $u-border-color;
				display: flex;
				margin-top: 15rpx;
				padding-top: 15rpx;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.date {
					font-size: 20rpx;
					flex: 1;
				}
				.immediate-use {
					margin-left: 20rpx;
					height: auto;
					padding: 0 20rpx;
					font-size: 24rpx;
					border-radius: 40rpx;
					line-height: 40rpx;
					color: rgb(117, 142, 165);
					border: 2rpx solid rgb(117, 142, 165);
				}
			}
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
</style>

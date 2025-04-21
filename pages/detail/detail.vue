<template>
    <view>
       <view>
		    <u-swiper :list="swiperList" :height="750" mode="rect" :interval="5000" @click="clickImg"></u-swiper>
	   </view>
		<view class="u-p-l-20 u-p-r-20 u-p-t-20 u-p-b-20">
			<view>
				<view class="item-title">{{mallGoods.goodsName}}</view>
				<view class="item-bottom">
					<view class="item-price">
						<view class="new-price">￥{{mallGoods.newPrice}}</view>
						<view class="old-price">￥{{mallGoods.oldPrice}}</view>
					</view>
					<view class="right">
						免邮费
					</view>
				</view>
			</view>
			<view class="goosMsg">
				<view class="tag">销量：100000</view>
				<view class="tag">库存：{{mallGoods.goodsStock}}</view>
				<view class="tag">浏览量：{{mallGoods.goodsView}}</view>
			</view>
			<view class="cell-list">
				<view class="cell" style="background-color: #fff3f5;
				margin: 0 -20rpx;
				height: 80rpx;line-height: 80rpx;">
					<view class="left" style="margin-left: 30rpx;">
						<u-icon name="star" size="38" color="#fa436a"></u-icon>
						<text class="text" style="color: #ff536f;margin-right: 20rpx;">分享</text>
						<text class="text">
							 发给好友看看吧~
						</text>
					</view>
					<view class="right" style="color: #ff536f;margin-right: 20rpx;">
						立即分享<u-icon name="arrow-right" size="30" color="#ff536f" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="buyType">
					<view class="left">
						<text class="text">购买类型</text>
						</view>
					<view class="right">
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell" @click="coupon">
					<view class="left">
						<text class="text">优惠卷</text>
						</view>
					<view class="right">
						领取优惠卷
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="cell">
					<view class="left">
						<text class="text">服务</text>
					</view>
					<view class="right" style="color: #666;margin-right: 20rpx;">
						7天无理由退货，假一赔十
					</view>
				</view>
			</view>
			<!-- <u-gap height="10" bg-color="#f3f4f6" style="margin: 0 -20rpx;"></u-gap> -->
			<!-- 评价 -->
			<!-- <view class="comment">
				<view class="header">
					<view class="left">商品评价(2)</view>
					<view class="right">好评率 50.0%  
						<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
					</view>
				</view>
				<view class="body">
					<view class="left">
						<image class="avatar" src="https://sourcebyte.cn/profile/upload/2022/04/30/366cc314-0dfb-410d-923b-7f547280a2d4.png"></image>
					</view>
					<view class="right">
						<view class="title">
							<view class="username">詹Sir</view>
							<view class="star">
								<u-rate active-color="#ffc454" inactive-color="#b2b2b2" gutter="5" :count="count" v-model="value"></u-rate>
							</view>
						</view>
						<view class="speak">弟弟666</view>
					</view>
				</view>
				<view class="bottom">
					<view class="time">2022-05-05 20:36</view>
					<view class="desc">购买类型：【美白提亮】 全新...</view>
				</view>
			</view> -->
		</view>
		<u-gap height="10" bg-color="#f3f4f6"></u-gap>
		<!-- 图文详情 -->
		<view class="content">
			<u-divider>图文详情</u-divider>
			<view class="u-content">
				<u-parse :html="mallGoods.articleContent"></u-parse>
			</view>
		</view>
		<view class="navigation">
			<view class="left">
				<view class="item"  @click="callPhoneNumber">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item car" @click="goCart">
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view> 
				<!-- <view class="item" @click="heart">
					<u-icon name="heart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view> -->
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="setCart">加入购物车</view>
				<view class="buy btn u-line-1" @click="quote">立即购买</view>
			</view>
		</view>
		<u-popup v-model="buyTypeShow" mode="bottom" border-radius="14" 
		 height="300px">
			<view class="popup">
				<view class="goods">
					<view class="left">
						<image class="avatar" src="https://sourcebyte.cn/profile/upload/2022/04/30/366cc314-0dfb-410d-923b-7f547280a2d4.png"></image>
					</view>
					<view class="right">
						<view class="price">
							￥0.01
						</view>
						<view class="qty">库存：882</view>
						<view class="spec">规格：35g</view>
					</view>
				</view>
				<view class="spec">
					<view class="title">规格</view>
					<view class="tag">
						<view class="item">10g</view>
						<view class="item">20g</view>
						<view class="item active">35g</view>
						<view class="item">10g</view>
						<view class="item">20g</view>
						<view class="item">10g</view>
						<view class="item">20g</view>
						<view class="item">10g</view>
						<view class="item">20g</view>
						<view class="item">10g</view>
						<view class="item">20g</view>
						<view class="item">10g</view>
						<view class="item">20g</view>
					</view>
				</view>
				<view class="num">
					<view class="title">数量</view>
					<u-number-box></u-number-box>
				</view>
				<view class="btn">
					<view class="cart u-line-1" @click="setCart">加入购物车</view>
					<view class="buy u-line-1" @click="quote">立即购买</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
    export default {
        data() {
            return {
				buyTypeShow:false,
				count: 5,
				value: 5,
				mallGoods:{},
                swiperList: [],
            }
        },
		onLoad: function (option) {
			let goodsId = option.goodsId //上个页面传递的参数。
			// 渲染当前房源信息
			this.findGoodsById(goodsId);
		},
        methods: {
			callPhoneNumber() {
			  uni.makePhoneCall({
			    phoneNumber: "18720989281",
			  });
			},
			goCart(){
				uni.switchTab({
					url:"/pages/cart/cart"
				})
			},
			heart(){
				this.$mytip.toast('heart')
			},
			setCart(){
				// 判断Token是否有效
				if(!this.vuex_token){
					// 没有token 则跳转到登录
					return uni.reLaunch({
						url:'../login/login'
					})
				}
				let goods = {
					goodsId: this.mallGoods.id,
					title: this.mallGoods.goodsName,
					desc: this.mallGoods.goodsFeature,
					price: this.mallGoods.newPrice,
					value:1,
					image: config.staticUrl+this.mallGoods.goodsFaceUrl,
					check: false,
					show: false,
				}
				let cartList = this.vuex_cartList
				cartList.push(goods)
				this.$u.vuex('vuex_cartList', cartList);
				uni.switchTab({
					url:"/pages/cart/cart"
				})
			},
            quote(){
            	this.$mytip.toast('购买')
            },
			findGoodsById(goodsId){
				let url = "api/mallApi/findGoodsById";
				this.$u.get(url, {
					id: goodsId
				}).then(result => {
					let mallGoods = result.data
					let goodsItem = mallGoods.goodsItemUrl.split(",")
					goodsItem.forEach((item,index)=>{
						//执行代码
						this.swiperList.push({
							image:config.staticUrl+item,
							title:index
						})
					})
					this.mallGoods = mallGoods
				});
			},
			clickImg(index){
				let imgArr = this.swiperList.map(val=>{
					return val.image
				})
				 // 预览图片
				uni.previewImage({
					current: index,
					urls: imgArr
				});
			},
			buyType(){
				this.buyTypeShow = true
			},
			coupon(){
				this.$u.route({
					url: 'pages/coupon/coupon',
				})
			}
        }
    }
</script>

<style>
    /* page不能写带scope的style标签中，否则无效 */
    page {
        background-color: rgb(255, 255, 255);
    }
</style>


<style lang="scss" scoped>
	
	.item-title {
	    font-size: 20px;
	    color: $u-main-color;
	    font-weight: bold;
		padding-top: 10rpx;
		padding-left: 10rpx;
		background-color: #fff;
	}
	
	.item-bottom{
		margin-top: 20rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		.item-price {
			display: flex;
			align-items: center;
			width: 250rpx;
			max-width: 250rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			.new-price{
				font-weight: normal;
				font-size: 22px;
				color: $base-color;
				padding: 5px 0 5px 2px;
			}
			.old-price{
				font-weight: normal;
				font-size: 14px;
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
			margin-left: 22rpx;
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
	
	.goosMsg{
		display: flex;
		align-items: center;
		font-size: 15px;
		color: $u-tips-color;
		margin: 20rpx 0 0 10rpx;
		.tag{
			// width: 200rpx;
			flex: 1;
		}
	}
	
	.cell-list{
		background-color: #fff;
		margin-top: 20rpx;
		padding-top: 20rpx;
		.cell{
			padding: 20rpx 0rpx 20rpx 0rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $u-main-color;
				font-size: 26rpx;
				.text{
					color: $u-tips-color;
					padding-left: 10rpx;
				}
			}
			.right{
				font-size: 28rpx;
				color: $u-tips-color;
			}
		}
	}
	
	.comment{
		margin: 40rpx 0 20rpx 0;
		.header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				color: $u-main-color;
				font-size: 18px;
			}
			.right{
				color: $u-tips-color;
			}
		}
		.body{
			display: flex;
			margin-top: 50rpx;
			.left{
				.avatar{
					flex-shrink: 0;
					width: 100rpx;
					height: 100rpx;
					border-radius: 100px;
					margin-right: 24rpx;
					border: 4rpx solid #fff;
					background-color: #fff;
				}
			}
			.right{
				.title{
					display: flex;
					.username{
						font-size: 16px;
						margin-right: 50rpx;
						color: #666
					}
					.star{
						font-size: 16px;
					}
				}
				.speak{
					font-size: 16px;
					height: 100rpx;
					line-height: 100rpx;
				}
			}
		}
		.bottom{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			margin-left: 60rpx;
			margin-right: 20rpx;
			color: $u-tips-color;
		}
	}
	
	.content{
		margin: 30rpx 0 100rpx 0;
		.u-content {
			margin-top: 30rpx;
		}
	}
	
	.navigation {
		display: flex;
		justify-content: space-between;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 16rpx 20rpx;
		background-color: #ffffff;
		box-shadow:0 -1px 1px 0 rgba(0, 0, 0, 0.05);
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 18rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				line-height: 66rpx;
				padding: 0 60rpx;
				color: #ffffff;
			}
			.cart {
				border-radius: 36rpx 0 0 36rpx;
				background-color: #ff7900;
			}
			.buy {
				border-radius:  0 36rpx 36rpx 0;
				background-color: $base-color;
			}
		}
	}
	
	.popup {
		padding-top: 20rpx;
		padding-left: 20rpx;
		.goods{
			display: flex;
			.left{
				.avatar{
					flex-shrink: 0;
					width: 140rpx;
					height: 140rpx;
					border-radius: 6px;
					margin-right: 24rpx;
					border: 4rpx solid #fff;
					background-color: #fff;
				}
			}
			.right{
				.price{
					height: 65rpx;
					line-height: 65rpx;
					font-weight: normal;
					font-size: 18px;
					color: $base-color;
				}
				.qty{
					color: $u-tips-color;
					margin: 5rpx 0;
				}
			}
		}
		.spec{
			.title{
				margin-left: 10rpx;
				font-size: 15px;
				font-weight: 800;
				margin-top: 10rpx;
			}
			.tag{
				display: flex;
				flex-flow: wrap; 
				overflow: hidden;
				margin-top: 10rpx;
				width: 720rpx;
				max-width: 720rpx;
				height: 140rpx;
				max-height: 140rpx;
				.item{
					margin-top: 12rpx;
					padding: 8rpx 24rpx;
					border-radius: 30rpx;
					margin-left: 22rpx;
					border: 1px solid rgba(#ff536f,0.1);
				}
				.active{
					color:$base-color ;
					background-color: rgba(#ff536f,0.1);
				}
			}
		}
		.num{
			display: flex;
			justify-content: space-between;
			margin-right: 20rpx;
			margin-top: 30rpx;
			.title{
				margin-left: 10rpx;
				font-size: 15px;
				font-weight: 800;
			}
		}
		.btn{
			display: flex;
			justify-content: space-between;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 20rpx;
			padding: 16rpx 20rpx;
			background-color: #ffffff;
			margin: 0 20rpx;
			.cart {
				border-radius: 36rpx 0 0 36rpx;
				background-color: #ff7900;
				line-height: 66rpx;
				padding: 0 40rpx;
				color: #ffffff;
				width: 370rpx;
				text-align: center;
			}
			.buy {
				border-radius:  0 36rpx 36rpx 0;
				background-color: $base-color;
				line-height: 66rpx;
				padding: 0 40rpx;
				color: #ffffff;
				width: 370rpx;
				text-align: center;
			}
		}
	}
</style>

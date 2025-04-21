<template>
	<view style="overflow: hidden;">
		<view class="wrapper">
			<view class="address" @click="selectAddress">
				<view class="left">
					<view class="icon">
						<u-icon name="map" size="38" color="#ff536f" ></u-icon>
					</view>
					<view class="title">
						<view class="name">
							{{mallOrder.receiverAddress}}
						</view>
						<view class="desc">
							{{mallOrder.receiver}} {{mallOrder.receiverPhone}} 
						</view>
					</view>
				</view>
				<view class="right">
					<u-icon name="arrow-right" size="30" color="#ddd" ></u-icon>
				</view>
				<image class="lineImg" src="../../static/icon/addr-line.png" mode="widthFix"></image>
			</view>
		</view> 
		<!-- 商品信息 -->
		<view class="wrapper">
			<view class="goods">
				<u-read-more show-height="400" :shadow-style="shadowStyle" toggle close-text="查看更多" color="#909399" text-indent="0">
					<view class="product" v-for="(item,index) in goodsList" :key="index"
					v-if="item.check">
						<view>
							<image :src="item.image" mode="widthFix" style="width: 150rpx;height: 150rpx;"></image>
						</view>
						<view class="right">
							<view class="item-title">{{item.title}}</view>
							<view class="item-bottom">
								<view class="item-price">
									<view class="new-price">￥{{item.price}} x {{item.value}}</view>
								</view>
							</view>
						</view>
					</view>
				</u-read-more>
				<view class="items"></view>
				<view class="info">
					<view class="cell-list">
						<view class="cell" @click="code">
							<view class="left">
								<text>商品金额</text>
								</view>
							<view class="right" style="color:#303133 ;">
								￥{{totalPrice}}
							</view>
						</view>
						<!-- <view class="cell" @click="code">
							<view class="left">
								<text class="text" style="
								padding: 6rpx 8rpx;
								margin-right: 8rpx;
								font-size: 20rpx;
								color: #fff;
								border-radius: 8rpx;
								background-color: orange;
								">满</text>
								<text class="text">订单满减</text>
								</view>
							<view class="right" style="color:#303133 ;">
								-￥30
							</view>
						</view> -->
						<!-- <view class="cell" @click="code">
							<view class="left">
								<text class="text" style="
								padding: 6rpx 8rpx;
								margin-right: 8rpx;
								font-size: 20rpx;
								color: #fff;
								border-radius: 8rpx;
								background-color: #ff536f;
								">卷</text>
								<text class="text">优惠卷</text>
								</view>
							<view class="right">
								暂无可用
							</view>
						</view> -->
						<!-- <view class="cell" @click="code">
							<view class="left">
								<text class="text">配送费</text>
								</view>
							<view class="right" style="color: #303133 ">
								-￥0
							</view>
						</view> -->
					</view>
				</view>
				<view class="price">
					应付：￥{{totalPrice}}
				</view>
			</view>
		</view> 
		<view class="wrapper wrapper-bottom">
			<view class="remark">
				<view class="title">
					订单备注:
				</view>
				<view class="textArea">
					<u-input v-model="mallOrder.remark" :type="type" :border="border" :height="height" :auto-height="autoHeight" placeholder="选填 , 合理需求我们会尽量满足..." />
				</view>
			</view>
		</view> 
		<view class="bottomView">
			<view class="bottomLeft" @click="checkGoods">
				<view class="clear">
					实付款:
				</view>
				<view class="left">
					￥{{totalPrice}}
				</view>
			</view>
			<view class="bottomRight">
				<view class="right" @click="subOrder">
					提交订单
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
				type: 'textarea',
				border: false,
				height: 100,
				autoHeight: true,
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "20rpx",
				},
				goodsList:[],
				totalPrice:0,
				mallOrder:{
					receiver:'',
					receiverPhone:'',
					receiverAddress:'',
					payAmount:0,
					payStatus:1,
					disAmount:0,
					orderStatus:1,
					remark:'',
					mallOrderGoodsList:[]
				},
			}
		},
		onLoad(option){
			// 检查token
			this.checkToken();
			if(option.addressId){
				this.mallOrder.receiverAddress=option.addressName
				this.mallOrder.receiverPhone=option.phone
				this.mallOrder.receiver=option.userName
			}else{
				// 设置默认收货地址
				this.setDefaultAddress()
			}
			// 商品列表
			this.goodsList = this.vuex_cartList.reverse()
			// 计算价格
			this.goodsList.map((val, idx) => {
				if(this.goodsList[idx].check){
					this.totalPrice = this.totalPrice + this.goodsList[idx].value*this.goodsList[idx].price
				}
			})
			this.mallOrder.payAmount = this.totalPrice
		},
		methods: {
			checkToken(){
				// 判断Token是否有效
				let lifeData = uni.getStorageSync('lifeData');
				let token = lifeData.vuex_token
				if(!token){
					// 没有token 则跳转到登录
					return uni.reLaunch({
						url:'../login/login'
					})
				}else{
					this.myavatar=config.baseUrl+uni.getStorageSync('lifeData').vuex_user.user.avatar
				}
			},
			subOrder(){
				if(!this.mallOrder.receiverAddress){
					return this.$mytip.toast('请选择收货地址')
				}
				this.mallOrder.mallOrderGoodsList = this.goodsList
				let url = "/api/mallApi/insertMallOrder"
				this.$u.post(url, this.mallOrder).then(result => {
					this.$u.route('/pages/order/order')
				});
			},
			selectAddress(){
				this.$u.route('/pages/address/address')
			},
			setDefaultAddress(){
				let url = "/api/mallApi/findAddressList";
				this.$u.get(url, {
					orderByColumn: 'create_time',
					isAsc: 'desc',
					pageNum: 1,
					pageSize: 100,
					isDefault: 1
				}).then(result => {
					// 商品数据
					let defaultAddress = result.rows[0];
					this.mallOrder.receiverAddress=defaultAddress.address
					this.mallOrder.receiverPhone=defaultAddress.phone
					this.mallOrder.receiver=defaultAddress.userName
				});
			}
		}
	}
</script>

<style lang="scss">
	.wrapper{
		margin: 20rpx 20rpx 10rpx 20rpx;
		background-color: #fff;
		padding: 20rpx 20rpx 20rpx 20rpx;
		border-radius: 3px;
		// color: $u-main-color;
		color: $u-tips-color;
		.address{
			margin: 10rpx 0;
			display: flex;
			justify-content: space-between;
			position: relative;
			.left{
				display: flex;
				align-items: center;
				.title{
					margin-left: 10rpx;
					.name{
						font-size: 14px;
						font-weight: 600;
						color: $u-main-color;
					}
					.desc{
						font-size: 14px;
					}
				}
			}
			.right{
				position:absolute;
				right: 0;
			}
			.lineImg{
				width: 710rpx;
				position: absolute;
				bottom: -30rpx;
				left: -20rpx;
			}
		}
		.goods{
			color: $u-main-color;
			.product{
				display: flex;
				margin-bottom: 30rpx;
				border-bottom: 1px solid #eee;
				&:last-child{
					border-bottom: 0;
				}
				.right{
					margin-left: 20rpx;
					.item-title {
					    font-size: 14px;
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
								font-size: 14px;
								color: $u-main-color;
								padding: 5px 0 5px 2px;
							}
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
				}
			}
			.info{
				.cell-list{
					background-color: #fff;
					.cell{
						margin-bottom: 30rpx;
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
			.price{
				text-align: right;
				font-weight: 800;
				border-top: 1px solid #eee;
				padding-top: 20rpx;
			}
		}
		.remark{
			.title{
				color: $u-main-color;
				font-weight: 800;
			}
			.textArea{
				margin-top: 20rpx;
			}
		}
	}
	
	.wrapper-bottom{
		margin-bottom:120rpx;
	}

	.bottomView{
		box-shadow:0 -1px 1px 0 rgba(0, 0, 0, 0.05);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
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
			.clear{
				text-align: center;border-radius: 10%;
				color: $u-tips-color;
				font-size: 14px;
				margin-right: 20rpx;
			}
			.left{
				color: $base-color;
				font-size: 16px;
				font-weight: 800;
			}
		}
		.bottomRight{
			display: flex;
			align-items: center;
			height: 60rpx;line-height: 60rpx;
			.right{
				color:#fff ;
				background:$base-color;
				padding: 2rpx 20rpx;
				border-radius: 30rpx;
				margin-left: 20rpx;
			};
		}
	}
</style>
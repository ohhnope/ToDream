<template>
	<view>
		<view class="container">
			<view class="addressList" v-if="addressList.length>0">
				<scroll-view scroll-y="true">
					<u-swipe-action :show="item.show" :index="index"
						v-for="(item, index) in addressList" :key="item.id" 
						@click="click"
						:options="options"
						bg-color="#f3f4f6"
						style="margin: 20rpx 20rpx 0rpx 20rpx"
					>
						<view class="item" @click="selectAddress(item)">
							<view class="title">
								{{item.userName}} 
								<view class="phone">{{item.phone}} </view>
								<view class="default" v-if="item.isDefault == 1">
									默认
								</view>
							</view>
							<view class="desc">
								{{item.address}}
							</view>
						</view>
					</u-swipe-action>
				</scroll-view>
				<view class="bottomView">
					<u-button  :custom-style="customStyle" @click="addAddress" hover-class="none" shape="circle">新增收货地址</u-button>
				</view>
			</view>
			<view class="empty" v-else>
				<image :src="empty" style="width: 200px;height: 200px;"></image>
				<view class="title">找不到您的收获地址哦</view>
				<view class="tip">先去添加一个吧</view>
				<view class="bottomView">
					<u-button  :custom-style="customStyle" @click="addAddress" hover-class="none" shape="circle">新增收货地址</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressList:[],
			empty:'/static/empty/address.png',
			options: [
				{
					text: '修改',
					style: {
						backgroundColor: 'orange'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#ff536f'
					}
				}
			],
			customStyle: {
				marginTop: '40rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				marginBottom: '40rpx',
				marginLeft: '40rpx',
				marginRight: '40rpx',
				color: '#FFF',
				backgroundColor:'#ff536f'
			}
		};
	},
	onLoad() {
		// 获取收货列表
		this.findAddressList();
	},
	methods: {
		addAddress(){
			this.$u.route('/pages/address/addAddress')
		},
		click(index, index1) {
			if(index1 == 0){
				this.$u.route({
					url: '/pages/address/addAddress',
					params: {
						addressId: this.addressList[index].id
					}
				})
			}else if(index1 == 1){
				let url = "/api/mallApi/deleteAddress/"+this.addressList[index].id;
				this.$u.delete(url).then(result => {
					this.addressList.splice(index, 1);
					this.$mytip.toast('删除成功')
				});
			}
		},
		selectAddress(item){
			this.$u.route({
				url: '/pages/order/preOrder',
				params: {
					addressId: item.id,
					userName:item.userName,
					phone:item.phone,
					addressName: item.address
				}
			})
		},
		findAddressList(){
			let url = "/api/mallApi/findAddressList";
			this.$u.get(url, {
				orderByColumn: 'create_time',
				isAsc: 'desc',
				pageNum: 1,
				pageSize: 100,
			}).then(result => {
				// 商品数据
				this.addressList = result.rows;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	text-align: center;
	overflow: hidden;
	border-radius: 8rpx;
	.addressList{
		text-align: left;
		.item{
			padding:  10rpx 20rpx;
			background-color: #ffffff;
			.title{
				width: 430rpx;
				font-size: 16px;
				color: $u-main-color;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				display: flex;
				align-items: center;
				margin: 10rpx 20rpx 30rpx 0;
				.phone{
					margin-left:20rpx;
					color: $u-tips-color;
					font-size: 16px;
				}
				.default{
					margin-left:20rpx;
					padding: 2rpx 8rpx;
					font-size: 14px;
					color: #fff;
					border-radius: 8rpx;
					background-color: #ff536f;
				}
			}
			.desc{
				font-weight: normal;
				font-size: 14px;
				color: $u-tips-color;
				margin: 10rpx 20rpx 20rpx 0;
			}
		}
	}
	.empty{
		margin-top: 220rpx;
		width: 100%;
		text-align: center;
		.title{
			margin: 20rpx 0 10rpx 0;
			color: $u-tips-color;
			font-size: 14px;
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
			margin: 300rpx 0 0 275rpx;
		}
	}
	.bottomView{
		// box-shadow:0 -1px 1px 0 rgba(0, 0, 0, 0.05);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		// background-color: #fff;
	}
}
</style>

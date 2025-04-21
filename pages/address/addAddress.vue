<template>
	<view>
		<u-navbar :is-back="true" title="收货地址" :border-bottom="false"></u-navbar>
		<view class="u-m-20">
			<u-toast ref="uToast" />
			<view>
				<u-field
					v-model="model.userName"
					label="收货人"
					placeholder="请输入收货人姓名"
					iconColor="#d5d5d5"
					label-width = "120"
					focus
				>
				</u-field>
				<u-field
					v-model="model.phone"
					label="手机号"
					placeholder="请输入收货人姓名"
					iconColor="#d5d5d5"
					label-width = "120"
				>
				</u-field>
				<u-field
					v-model="model.address"
					label="地址"
					placeholder="请输入详细收货地址"
					iconColor="#d5d5d5"
					label-width = "120"
					type="textarea"
				>
				</u-field>
				<view class="defaultAddress">
					<text class="title">设置默认地址</text>
					<u-switch v-model="model.isDefault" active-color="#FF536F"></u-switch>
				</view>
			</view>
		</view>
		<view class="bottomView">
			<u-button class="u-m-40" :custom-style="customStyle" @tap="submit"hover-class="none" shape="circle">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			model:{
				userName:'',
				phone:'',
				address:'',
				isDefault:true,
				normalDisable:'1',
			},
			customStyle: {
				marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				color: '#FFF',
				backgroundColor:'#ff536f'
			}
		}
	},
	onLoad: function (option) {
		if(option.addressId){
			let addressId = option.addressId
			// 渲染当前地址
			this.findAddressById(addressId);
		}
	},
	methods: {
		submit() {
			if(!this.model.userName){
				return this.$mytip.toast('请输入收货人')
			}
			if(!this.model.phone){
				return this.$mytip.toast('请输入手机号')
			}
			if(!this.model.address){
				return this.$mytip.toast('请输入地址')
			}
			let url = "/api/mallApi/insertAddress";
			if(this.model.id){
				url = "/api/mallApi/updateAddress";
			}
			this.$u.post(url, this.model).then(result => {
				this.$u.route('/pages/address/address')
			});
		},
		findAddressById(addressId){
			let url = "api/mallApi/findAddressById";
			this.$u.get(url, {
				id: addressId
			}).then(result => {
				let address = result.data
				if(address.isDefault == '0'){
					address.isDefault = false
				}else if(address.isDefault == '1'){
					address.isDefault = true
				}
				this.model = address
			});
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
	page{
		overflow: hidden;
	}
	
	.logo{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 550rpx;
		img {
			text-align: center;
		}
	}

	.version {
		position:fixed;
		bottom:0;
		width: 100%;
		text-align: center;
		padding: 15rpx;
	}
	.defaultAddress{
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		.title{
			margin-left: 20rpx;
		}
	}
	
	.bottomView{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
</style>

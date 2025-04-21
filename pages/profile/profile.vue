<template>
	<view class="u-m-20">
		<u-navbar :is-back="true" title="个人信息" :border-bottom="false">
		</u-navbar>
		<view>
			<u-cell-group>
				<u-cell-item title="用户名" :arrow="false" hover-class="none">{{vuex_user.user.userName}}</u-cell-item>
				<u-cell-item title="手机号" :arrow="false" hover-class="none">{{vuex_user.user.phonenumber}}</u-cell-item>
				<u-cell-item title="真实姓名" :arrow="false" hover-class="none">{{vuex_user.user.nickName}}</u-cell-item>
			</u-cell-group>
			<!-- <u-cell-group>
				<u-cell-item title="邀请码"></u-cell-item>
			</u-cell-group> -->
		</view>
		
		<!-- <view class="u-m-t-20">
			<u-button type="primary" @click="subProfile">提交</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: false,
			}
		},
		created() {
			this.address = uni.getStorageSync('lifeData').vuex_user.address;
		},
		methods: {
			subProfile(){
				// 1.更新vuex中的用户信息
				this.$mytip.toast('修改成功')
				// 2.页面跳转
				uni.switchTab({
					url: '/pages/center/center'
				})
			},
		}
	}
</script>
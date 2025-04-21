<template>
	<view>
		<view class="u-content">
			<u-parse :html="content"
			:autosetTitle="true"
			:show-with-animation="true"
			:selectable="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'开源字节',
				content: ``
			}
		},
		onLoad(option) {
			let id = option.id
			let url = "/api/cmsApi/getArticle/"+id;
			this.$u.get(url).then(res => {
				this.title = res.data.smallTitle
				this.content = res.data.articleContent
				uni.setNavigationBarTitle({
					title:this.title
				})
			});
		},
		methods:{
			goIndex(){
				this.$u.route('/pages/index/index');
			},
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.u-content{
		margin:0 10rpx;
		padding: 24rpx;
		font-size: 34rpx;
		color: $u-main-color;
		line-height: 1.8;
		white-space: pre-wrap !important;
	}
	
</style>


<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			if(this.vuex_token){
				this.findCartList()
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 设置购物车badge
			findCartList(){
				let badge = this.vuex_cartList.length
				// 设置tab badge
				if(badge>0){
					uni.setTabBarBadge({ //显示数字
					  index: 2,
					  text: ''+badge+''
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import url("./common/common.css");
</style>

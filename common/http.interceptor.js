// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import config from "./config.js" // 全局配置文件
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		// baseUrl打包app时放开，h5模式下会和vue.config.js代理冲突，导致失效
		baseUrl: config.baseUrl,
		
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.Token = '5d33018e653d897fc259b42cf022c1b3';
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// 自定义token头，如果有需要，则在此处设置token值
		// config.header.Authorization = vm.vuex_token;
		// 自定义全局userId参数
		if(vm.vuex_user.user){
			config.data.userId = vm.vuex_user.user.userId;
		}
		return config; 
	};
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if(res.code == 200) {
			return res;  
		} else if(res.code == 301) {
			vm.$u.toast('警告：' + res.msg);
			return false;
		} else if(res.code == 401) {
			uni.reLaunch({
				url:'../login/login'
			})
			vm.$u.toast('认证失败,请重新登录')
			return false;
		} else if(res.code == 403) {
			uni.reLaunch({
				url:'../login/login'
			})
			vm.$u.toast('认证失败,请重新登录')
			return false;
		} else if(res.code == 500) {
			vm.$u.toast('错误：' + res.msg);
			return false;
		} else {
			// 其他情况都认为是不合法的
			vm.$u.toast('警告：' + res.msg);
			return false;
		}
	};
}

export default {
	install
}
import {
  getShopList
} from "../../api/common";
const app = getApp();
Page({
  data: {
    product: null,
    starChecked: false,
    bindSucess:false,
    isLogin:false,
    current:0
  },
  async onLoad(options) {
    const { systemInfo } = app.globalData;
    this.setData({
      iPhoneBottomHeight:systemInfo.screenHeight - systemInfo.safeArea.bottom,
    })
    const { productId } = options;
    const res = await getShopList();
    if (!res) {
      return;
    }
    const swiperImg = res.products?.map((item) => {
      return item.image
    })
    const product = this.getProductById(res?.products, productId);
    this.setData({
      shopList: res.products?.slice(0,3),
      swiperImg,
      product,
    })
  },
  getProductById(shopList, id) {
    const products = shopList;
    // 在 products 数组中查找指定 ID 的商品
    const product = products.find(p => p.id === id);
    // 如果找到了商品，返回商品信息；否则返回空对象
    return product || {};
  },
  // bind:getgoodsinfo 使用示例
  // 非商品库商品
  getGoodsInfo(event) {
    // const {
    //   goodsId
    // } = event.detail;
    return new Promise(resolve => {
      // 在此处开发者可以进行商品数据请求，获取商品信息
      // 然后将商品信息传入 resolve 函数
      resolve({
        currentPrice: 9900,
        goodsName: '循礼门M+丨【释集烤肉】99元  原价206.4元超值套餐',
        goodsPhoto: 'https://p11.douyinpic.com/img/aweme-poi/product/spu/c050f399ac447daf2715e11e6976c2e2~noop.jpeg?from=3303174740',
        goodsLabels: [{
          type: 'EXPIRED_RETURNS'
        }, // 过期退
        {
          type: 'REFUND_ANYTIME'
        }, // 随时退
        {
          type: 'BOOK_IN_ADVANCE',
          value: 2
        } // 提前2日预约
        ],
        minLimits: 1,
        maxLimits: 2,
        dateRule: '周一至周日可用',
        validation: {
          phoneNumber: {
            required: true // 手机号是否必填, 为 ture则必填，false选填，默认选填
          }
        },
        extra: {}
      });
    });

  },
  // 错误信息含义见下文 bind:error报错信息
  handleError(event) {
    const {
      errMsg,
      errNo
    } = event.detail;
    console.log(errNo, errMsg);
  },
  /**
   * status: 支付状态，'success' | 'fail'
   * orderId: 抖音交易系统内部订单号，类型为 string
   * outOrderNo：开发者系统交易订单号，类型为 string
   * result: 创建订单、tt.pay 支付结果，类型为 object
   */
  handlePay(event) {
    const {
      status,
      orderId,
      outOrderNo,
      result
    } = event.detail;
    if (status === 'success') {
      const {
        code
      } = result;
      if (code === 0) {
        // 支付成功
      } else {
        // 支付失败（超时、取消、关闭）
        if (orderId && outOrderNo) {
          tt.navigateTo({
            url:`ext://microapp-trade-plugin/trade-order-detail?orderId=${orderId}`,
            success: (res) => {
              
            },
            fail: (res) => {
              console.log(res);
            },
          });
        }
      }
    } else {
      const {
        errMsg
      } = result;
    }
  },
   userLogin(event) {
    let that = this;
    const { goodsId, goodsType } = event.detail
    return new Promise((resolve, reject) => {
      tt.login({
        success() {
            resolve();
          // 用户登录成功并获取信息，则调用 resolve 函数，跳转至提单页

        },
        fail() {
          // 用户登录失败，则跳转提单页失败
          reject();
        }
      });
    });
  },
  closeDialog(e){
    console.log(e);
    this.setData({
      showDialog:false
    })
  },

  checkLogin(){
  console.log(111);
    let  that =this;
    const { isLogin } = that.data;
    if (!isLogin) {
      tt.login({
        success(res) {
          console.log('??',res);
          // 用户登录成功并获取信息，则调用 resolve 函数，跳转至提单页
          that.setData({
            showDialog:true
          })
        },
        fail() {
          // 用户登录失败，则跳转提单页失败
        }
      });
    }
  },

  // // 商品库商品
  // getGoodsInfo(event) {
  //   return new Promise(resolve => {
  //     // 在此处开发者可以进行商品数据请求，获取商品信息
  //     // 然后将商品信息传入 resolve 函数
  //     resolve({
  //       minLimits: 1,
  //       maxLimits: 2,
  //       dateRule: '周一至周日可用',
  //       validation: {
  //         phoneNumber: {
  //           required: true // 手机号是否必填
  //         }
  //       }
  //     });
  //   })
  // }
  onTabCollect() {
    const { starChecked } = this.data;
    this.setData({
      starChecked: !starChecked,
    })
  },
   bindPhone(){
       return false;
  },
  onTapGetPhone(e){
     console.log('aaa',e);
    //  this.setData({
    //    showDialog:false
    //  })
    this.setData({
      bindSucess:true,
      isLogin:true,
    })
  },
  switchTap(e){
    const {current} = e.detail;
    this.setData({
      current,
    })
  },
  success(e){
    console.log(e.detail);
    // 开发者可在此处进行手机号解密以及绑定工作
    this.setData({
      showDialog:false,
    })
  }
})
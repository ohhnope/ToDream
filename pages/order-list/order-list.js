// /Users/bytedance/Desktop/codelabs-miniprogram-template/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/pages/order-list/order-list.js
import {
  getOrderList
} from "../../api/common";
const app = getApp()

Page({
  data: {
    sortList: ['全部', '待支付', '待使用', "已完成", "售后",],
    orderList: [],
    current: 0,
    swiperHeight:0,
  },
  async onLoad() {
    const res = await getOrderList();
    if (!res) {
      return;
    }
    const allOrderList =  res?.orders
    const toPayOrderList = res.orders?.filter((o) => {
      return  o.order_status == 0
    })
    const toUseOrderList = res.orders?.filter((o) => {
      return  o.order_status == 5
    })
    const completedOrderList = res.orders?.filter((o) => {
      return  o.order_status == 4
    })
    const afterSalesOrderList = res.orders?.filter((o) => {
      return  o.order_status == 3
    })
    this.setData({
      orderList: res.orders,
      allOrderList,
      toPayOrderList,
      toUseOrderList,
      completedOrderList,
      afterSalesOrderList
    })
  },
  onReady(){
    this.getHeight();
  },
  getHeight(){
    let that =this;
    tt.createSelectorQuery().select('#card').boundingClientRect(function(rect){
    }).exec(res=>{
      console.log("getHeight",typeof(res[0].height) );
      that.setData({
        swiperHeight:res[0].height+''
      })
    });
  },
  switchTap(e){
    const {current} = e.detail;
    console.log(current);
    this.setData({
      current: current,
    });
      this.getHeight();
  }
})
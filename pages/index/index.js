import {
  getShopList
} from "../../api/common";
const app = getApp()

Page({
  data: {
    sortList: ['距离优先', '好评优先', '销量优先'],
    current: 0,
    shopList:[],
    swiperHeight:0,
    saleSortList:[],
    distanceSortList:[],
    rateSortList:[]
  },
 async onLoad () {
    const res = await getShopList();
    if (!res) {
      return;
    }
   const saleSortList=res.products?.slice().sort((a,b) => b.sales-a.sales);
   const distanceSortList=res?.products;
   const rateSortList=res.products?.slice().sort((a,b) => b.rating-a.rating);
   console.log(saleSortList,distanceSortList,rateSortList);
    this.setData({
      saleSortList,
      distanceSortList,
      rateSortList,
      shopList:res?.products,
    })
  },
  onReady(){
    this.getHeight();
  },
  switchTap(e){
    // 可在此处理选中后更新商品列表数据
    const {current} = e.detail;
    this.setData({
      current,
    })
    this.getHeight()
  },
  getHeight(){
    let that =this;
    tt.createSelectorQuery().select('#card').boundingClientRect(function(rect){
    }).exec(res=>{
      console.log(res);
      that.setData({
        swiperHeight:res[0].height+''
      })
    });
  },
})
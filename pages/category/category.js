// /Users/bytedance/Desktop/codelabs-miniprogram-template/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/pages/category/category.js
import {
  getShopList
} from "../../api/common";
const app = getApp()

Page({
  data: {
    sortList: ['附近美食', '休闲娱乐', '游戏',"丽人/美发","住宿","电影/演出","亲子/乐园"],
    current: 0,
    shopList:[],
    swiperHeight:0,
  },
  async onLoad () {
    const res = await getShopList();
    console.log('Welcome to Mini Code',res )
    this.setData({
      shopList:res?.products
    })
    console.log('Welcome to Mini Code',this.data.shopList )
  },
  onReady(){
    this.getHeight();
  },
  onShow(){
    const { category , tittle } = app.globalData?.category
    if(category){
      this.setData({
        current:category
      })
    }
  },
  handleTabbarChange(event) {
    const current = event.detail.current
    this.setData({
      current: current
    });
    this.getHeight();
  },
   switchTap(e){
    const {current} = e.detail;
    console.log(current);
    this.setData({
      current,
    });
    this.getHeight();
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
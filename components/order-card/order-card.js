// /Users/bytedance/miniprograms/Group-purchase-miniP/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/components/order-card/order-card.js
Component({
  data: {

  },
  properties: {
    orderList:{
      type:Array,
      value:[]
    }
  },
  methods: {
    handleContinutePay(event) {
      const { status, outOrderNo, result } = event.detail;
      console.log(event)
      if (status === 'success') {
          const { code } = result;
          if (code === 0) {
              // 继续支付成功
          }
      } else {
          // 继续支付失败
          console.log(event.detail.result.message)
      }
  },
    openOrderPage(e){
      const { id } = e.currentTarget.dataset;
      console.log(  e,id);
      tt.navigateTo({
        url:`ext://microapp-trade-plugin/trade-order-detail?orderId=${id}`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    }
  } 
})
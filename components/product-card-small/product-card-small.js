// /Users/bytedance/miniprograms/Group-purchase-miniP/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/components/product-card-small/product-card-small.js
Component({
  data: {

  },
  properties: {
    productList:{
      type:Array,
      value:[]
    },
    btnShow:{
      type:Boolean,
      value:true
    }
  },
  methods: {
    toProductDetail(e){
      const { id } = e.currentTarget.dataset;
      tt.navigateTo({
        url: `/pages/product-detail/product-detail?productId=${id}`,
        success: (res) => {
          
        },
        fail: (res) => {
          console.log(res);
        },
      });
    }
  }
})
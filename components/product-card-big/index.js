// /Users/bytedance/Desktop/codelabs-miniprogram-template/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/components/index/index.js
Component({
  data: {

  },
  properties: {
    productList:{
      type:Array,
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
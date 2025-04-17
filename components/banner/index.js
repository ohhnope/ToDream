const app = getApp();
Component({
    data: {
      navList: [{
        tittle: '附近美食',
        img: '../../assets/fujinmeishi.png'
      }, {
        tittle: '休闲娱乐',
        img: '../../assets/xiuxianyule.png'
      }, {
        tittle: '游戏',
        img: '../../assets/youwan.png'
      }, {
        tittle: '丽人/美发',
        img: '../../assets/lirenmeifa.png'
      }, {
        tittle: '住宿',
        img: '../../assets/zhusu.png'
      }, {
        tittle: '电影/演出',
        img: '../../assets/dianying.png'
      }, {
        tittle: '亲子/乐园',
        img: '../../assets/qinzi.png'
      }],
      current:0,
      
    },
    properties: {
      productList: {
        type: Array
      }
    },
    methods: {
      toCategoryPage(e){
        const {category,tittle}=e.currentTarget.dataset;
        console.log(category,e);
        app.setGlobalData('category',{category:category,tittle:tittle,});
        console.log(app);
        tt.switchTab({
          url: `/pages/category/category`,
          success: (res) => {
            
          },
          fail: (res) => {
            
          },
        });
      },
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
      },
      switchTap(e){
        const {current} = e.detail;
        this.setData({
          current,
        })
      }
    }
  })
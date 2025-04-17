import { getCity,getProvince } from "../../api/common";
Component({
  data: {
    provinces: [], // 省份列表
    cities: [], // 城市列表
    value: [0, 0], // 当前选中的值
    pickerVisibility: false,
    enableLocation: false,
    show: false,
    provinceIndex:0,
  },
  properties: {

  },
  attached() {
    let that = this;
    tt.getLocation({
      success: () => {
        that.setData({
          enableLocation: false
        })
      },
      fail: () => {
        that.setData({
          enableLocation: true
        })
      },
    });
  },
  pageLifetimes: {
    show: function () {
      let that = this;
      tt.getSetting({
        success(res) {
          that.setData({
            enableLocation: !res.authSetting["scope.userLocation"]
          })
        },
        fail(err) {
          console.log("getSetting 调用失败", err);
        },
      });
    },
  },
  methods: {
    // bindRegionChange: function (e) {
    //   this.setData({
    //     region: e.detail.value
    //   });
    // },
    // 加载省份数据
   async loadProvinces() {
      // TODO: 加载省份数据

      // 示例数据
      const {provinces}  = await getProvince()
      this.setData({
        provinces,
      });
    },
    // 加载城市数据
   async loadCities(provinceId) {
      // TODO: 加载城市数据

      // 示例数据
      const {cities}  = await getCity();
      const cityData = cities.filter(p=>p.province_id==provinceId)
      this.setData({
        cities:cityData[0]?.city
      });
    },
    onTapPickProvince() {
      const {provinceIndex} = this.data;
      this.setData({
        pickerVisibility: true,
        show: true
      })
      tt.hideTabBar();
      this.loadProvinces();
      this.loadCities(provinceIndex)
    },
    onTapClose() {
      this.setData({
        pickerVisibility: false,
        show: false
      })
      tt.showTabBar();
    },
    onTapConfirm() {
      const {
        cities,
        value
      } = this.data;
      this.setData({
        pickerVisibility: false,
        show: false,
        cityName: cities[value[1]].name,
      })
      tt.showTabBar();
    },
    openSettings() {
      tt.openSetting({
        success(res) {
          console.log(res);
        },
        fail(res) {
          console.log(`openSetting 调用失败`);
        },
      });
    },
   async cityChange(event) {
      const { value } = this.data;
      const [provinceIndex,cityIndex] = event.detail.value;
      const oldValue  = value;
      console.log(provinceIndex);
      
      if (oldValue[0] != provinceIndex) {
        console.log("省份改变");
       await this.loadCities(provinceIndex);
       const {cities} = this.data;
        this.setData({
          value: [provinceIndex, 0],
          provinceIndex,
          cityName:cities[cityIndex].split('市')[0],
        });
      } else if (oldValue[1] != cityIndex) {
        const {cities} = this.data;
        console.log("城市改变",provinceIndex);
        this.setData({
          cityName:cities[cityIndex].split('市')[0],
          value: [provinceIndex, cityIndex],
        })
      }
    }
    //  // 滑动事件处理函数
    //  bindChange(e) {
    //   const val = e.detail.value;
    //   const { provinces, cities, areas } = this.data;

    //   if (val[0] !== this.data.value[0]) {
    //     const provinceId = provinces[val[0]].id;
    //     this.loadCities(provinceId);
    //   } else if (val[1] !== this.data.value[1]) {
    //     const cityId = cities[val[1]].id;
    //     this.loadAreas(cityId);
    //   }

    //   this.setData({
    //     value: val,
    //   });
    // },
  }
})
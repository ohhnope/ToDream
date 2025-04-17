// /Users/bytedance/Desktop/codelabs-miniprogram-template/miniprogram-templates/templates/microapp/javascript/group-buy-industry/group-buy-industry/components/index/index.js
Component({
  data: {
    checked:false,
    src:'../../assets/radio.png',
    checkedSrc:'../../assets/radio-checked.png'
  },
  properties: {
    showDialog:{
      type:Boolean,
      value:false,
    }
  },
  methods: {
    onTapCheck(){
      const { checked } = this.data
      this.setData({
        checked:!checked,
      })
    },
    getPhoneNumberHandler(e){
      this.triggerEvent('success',e)
      console.log('event',e);
         // 开发者此处进行手机号揭秘及绑定
        //  绑定成功

    },
    bindPhone(e){
      // this.triggerEvent('close',e)
      this.setData({
        showDialog:false,
      })
      this.triggerEvent('bindPhone',e)
    },
    close(e){
      console.log('1',e);
      this.triggerEvent('close',e)
    }
  },

})
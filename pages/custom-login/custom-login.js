Page({
  data: {
    ruleChecked: false,
    showMask: false,
    phoneNumber: null,
    isLogin: true,
  },
  async onLoad() {
  },
  onRuleChecked(e) {
    const { detail } = e;
    if (detail.value.includes('rule')) {
      this.setData({
        ruleChecked: true,
      });
    } else {
      this.setData({
        ruleChecked: false,
      });
    }
  },
  closeMask() {
    this.setData({
      showMask: false,
    });
  },
  showMask() {
    if (!this.data.ruleChecked) {
      this.setData({
        showMask: true,
      });
    }
  },
  agreeRule() {
    this.closeMask();
    this.setData({
      ruleChecked: true,
    });
  },
  viewRule() {
    tt.navigateTo({
      url: '/pages/rule/rule',
    });
  },
  goToCustomPage() {
    tt.navigateTo({
      url: '/pages/custom-login/login/login',
    });
  },
});

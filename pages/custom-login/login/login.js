import { demoToast } from '../../../utils';
Page({
  data: {},
  onLoad() {},
  viewRule() {
    tt.navigateTo({
      url: '/pages/rule/rule',
    });
  },
  toast: demoToast,
});

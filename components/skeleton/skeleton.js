Component({
  properties: {
    height: {
      type: Number, // 单位rpx
      value: 222,
    },
    width: {
      type: Number,
    },
    mode: {
      type: String,
      value: '', //默认矩形， square: 矩形 circle: 圆形
    },
    innerStyle: {
      type: String,
      value: '',
    },
  },
});

import Toast from "@vant/weapp/toast/toast";

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    type: "",
    to: "",
    from: "",
    remarks: "",
    price: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 修改任务类型
    typeChange(e) {
      this.setData({
        type: e.detail,
      });
    },
    toChange(e) {
      this.setData({
        to: e.detail,
      });
    },
    fromChange(e) {
      this.setData({
        from: e.detail,
      });
    },
    remarksChange(e) {
      this.setData({
        remarks: e.detail,
      });
    },
    priceChange(e) {
      this.setData({
        price: e.detail,
      });
    },
    onChange(event) {
      const { picker, value, index } = event.detail;
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
  },
});

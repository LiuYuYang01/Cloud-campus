import Notify from "@vant/weapp/notify/notify";

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    errand: {
      // 发布者ID
      issue_id: "",
      to: "",
      from: "",
      remarks: "",
      price: "",
    },
  },

  lifetimes: {
    created() {
      this.setData({
        "errand.issue_id": wx.$store.userInfo.id,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toChange(e) {
      this.setData({
        "errand.to": e.detail,
      });
    },
    fromChange(e) {
      this.setData({
        "errand.from": e.detail,
      });
    },
    remarksChange(e) {
      this.setData({
        "errand.remarks": e.detail,
      });
    },
    priceChange(e) {
      this.setData({
        "errand.price": e.detail,
      });
    },

    // 订单支付
    pay() {
      console.log(this.data.errand.price, 666);
    },

    // 发布任务
    async release() {
      const {
        data: { code, message },
      } = await wx.$http.post("/api/task", this.data.errand);

      if (code !== 200) return Notify({ type: "danger", message });

      Notify({ type: "success", message: "恭喜你，发布任务成功" });

      // 发布成功后跳转到任务列表页面
      setTimeout(() => {
        wx.navigateTo({
          url: "/subPackages/pages/errand/rob/rob",
        });
      }, 1000);
    },
  },
});

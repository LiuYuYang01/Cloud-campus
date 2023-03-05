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
    payShow: false,
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

    // 打开订单支付框
    pay() {
      let b = true;

      // 如果有一项为空就不弹出支付框
      for (let k in this.data.errand) {
        if (this.data.errand[k] === "") b = false;
      }

      if (b) return this.setData({ payShow: true });

      Notify({ type: "danger", message: "请确保每一项不能为空!" });
    },
    // 关闭支付框
    payClose() {
      this.setData({ payShow: false });
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
          url: "/subPackages/pages/errand/home/home",
        });

        wx.$store.updateErrandActive(1);
      }, 1000);
    },
  },
});

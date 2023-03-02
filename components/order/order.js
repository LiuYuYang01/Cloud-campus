import Dialog from "@vant/weapp/dialog/dialog";
import Toast from "@vant/weapp/toast/toast";
import Notify from "@vant/weapp/notify/notify";

Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    type: String,
    issue_id: String,
    isMyOrder: Boolean,
    isService: Boolean,
  },
  /**
   * 组件的初始数据
   */
  data: {
    orderList: [],
    complainShow: false,
  },

  lifetimes: {
    ready() {
      if (this.data.type === "我的跑单") {
        this.setData({
          isMyOrder: true,
        });
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 接单
    meet(e) {
      let msg = "";
      let state = 0;
      let cancel = e.currentTarget.dataset.cancel;
      let issue_id = e.currentTarget.dataset.issue_id;
      let receive_id = wx.$store.userInfo.id;

      // 判断是不是自己发布的订单
      if (issue_id === wx.$store.userInfo.id && !cancel) {
        return Toast("无法操作自己发布的订单");
      }

      // 订单状态
      if (this.data.type === "抢单") {
        msg = "你确定要接单吗？";
        state = 0;
      } else if (this.data.type === "待取货") {
        msg = "你确定已取货吗？";
        state = 1;
      } else if (this.data.type === "我的跑单") {
        msg = "你确定你已送达吗？";
        state = 2;
      } else if (cancel) {
        msg = "你确定取消订单吗？";
        state = 4;
      }

      Dialog.confirm({
        context: this,
        message: msg,
      })
        .then(async () => {
          const oid = e.currentTarget.dataset.oid;

          if (cancel) {
            var {
              data: { code, message },
            } = await wx.$http.post("/api/task/issue", {
              oid,
              issue_id,
              state: 4,
            });
          } else {
            var {
              data: { code, message },
            } = await wx.$http.post("/api/task/receice", {
              oid,
              receive_id,
              state,
            });
          }

          if (code !== 200) return Toast(message);

          Toast(message);

          this.triggerEvent("getTaskList");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 投诉
    complaint(e) {
      if (!this.data.isService) return;

      const id = e.currentTarget.dataset.oid;

      // 打开投诉框
      this.setData({ complainShow: true });
    },

    // 关闭投诉框
    complaintClose() {
      this.setData({ complainShow: false });
    },

    // 送达
    service(e) {
      if (!this.data.isService) return;

      Dialog.confirm({
        context: this,
        message: "你确定已经取到货了吗？",
      })
        .then(async () => {
          const oid = e.currentTarget.dataset.oid;
          const issue_id = wx.$store.userInfo.id;

          const {
            data: { code, messgae },
          } = await wx.$http.post("/api/task/issue", {
            oid,
            issue_id,
            state: 5,
          });

          if (code !== 200)
            return Notify({ context: this, type: "danger", message });

          // 重新获取一下订单页面的数据
          this.triggerEvent("getOrderList");

          Notify({ context: this, type: "success", message: "恭喜你完成订单" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

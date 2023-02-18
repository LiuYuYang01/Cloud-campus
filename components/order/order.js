import Dialog from "@vant/weapp/dialog/dialog";
import Toast from "@vant/weapp/toast/toast";

Component({
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 接单
    meet(e) {
      Dialog.confirm({
        context: this,
        message: "你确定要接单吗？",
      })
        .then(async () => {
          const oid = e.currentTarget.dataset.oid;
          const receive_id = wx.$store.userInfo.id;
          const {
            data: { code, message },
          } = await wx.$http.post("/api/task/receice", {
            oid,
            receive_id,
            state: 0,
          });

          if (code !== 200) return Toast(message);

          Toast(message);

          this.triggerEvent("getTaskList")
        })
        .catch(() => {
          // on cancel
        });
    },

    // 送达
    service() {
      Dialog.confirm({
        message: "你确定送达了吗？",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },

    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
    },
  },
});

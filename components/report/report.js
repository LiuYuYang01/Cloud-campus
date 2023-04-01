// components/report/report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "",
    content: "",
  },

  lifetimes: {
    ready() {
      // 拿到小程序的上级所有页面
      const pages = getCurrentPages();

      // 然后找到最后一个，也就是刚刚跳转过来的页面
      const currentPage = pages[pages.length - 1];

      const title = currentPage.options.title;

      this.setData({
        title,
      });

      // 拿到他的跳转参数：option.title 来动态设置每个页面的名称
      wx.setNavigationBarTitle({
        title,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 提交
    submit() {
      wx.showModal({
        title: "提示",
        content: "你确定要提交该匿名信吗？",
        success: async (res) => {
          const title = this.data.title;
          let type = 0;

          if (title === "校园匿名信") {
            type = 1;
          } else if (title === "跑腿订单投诉") {
            type = 2;
          } else if (title === "校园兼职投诉") {
            type = 3;
          } else if (title === "其他投诉") {
            type = 4;
          }

          if (res.confirm) {
            const {
              data: { code, message },
            } = await wx.$http.post("/api/maintain", {
              info: this.data.content,
              type,
            });

            if (code !== 200) {
              return wx.showToast({
                title: message,
                icon: "success",
                duration: 2000,
              });
            }

            wx.showToast({
              title: "提交成功",
              icon: "success",
              duration: 2000,
              success: () => {
                this.setData({ content: "" });

                this.triggerEvent("getMyInfoList");
              },
            });
          }
        },
      });
    },
  },
});

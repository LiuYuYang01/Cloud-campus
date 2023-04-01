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
    content: "",
    myInfoList: [],
  },

  lifetimes: {
    created() {
      this.getMyInfoList();
    },
    ready() {
      // 拿到小程序的上级所有页面
      const pages = getCurrentPages();

      // 然后找到最后一个，也就是刚刚跳转过来的页面
      const currentPage = pages[pages.length - 1];

      // 拿到他的跳转参数：option.title 来动态设置每个页面的名称
      wx.setNavigationBarTitle({
        title: currentPage.options.title,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取我提交的匿名信
    async getMyInfoList() {
      const {
        data: { data },
      } = await wx.$http.get("/api/maintain");

      this.setData({
        myInfoList: data,
      });
    },
    // 提交
    submit() {
      wx.showModal({
        title: "提示",
        content: "你确定要提交该匿名信吗？",
        success: async (res) => {
          if (res.confirm) {
            const {
              data: { code, message },
            } = await wx.$http.post("/api/maintain", {
              info: this.data.content,
              type: 1,
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

                setTimeout(() => {
                  this.getMyInfoList();
                }, 500);
              },
            });
          }
        },
      });
    },
  },
});

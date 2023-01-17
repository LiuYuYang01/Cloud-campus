// 调用 Behavior 方法创建实例对象
// 然后使用 module.exports 将 behavior 实例对象共享出去
module.exports = Behavior({
  data: {
    // tabbar切换
    pageList: [
      "/subPackages/pages/errand/home/home",
      "/subPackages/pages/errand/rob/rob",
      "/subPackages/pages/errand/record/record",
      "/subPackages/pages/errand/my/my",
    ],
    active: 0,
  },
  methods: {
    // tabBar切换
    selectTabBar(e) {
      wx.navigateTo({
        url: this.data.pageList[e.detail],
      });

      // this.uActive(e.detail);
    },
  },
});

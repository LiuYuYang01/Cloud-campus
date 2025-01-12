const tabBarBehaviors = require("../../../../behaviors/tabBar-behaviors");

Component({
  options: {
    multipleSolts: true,
  },
  behaviors: [tabBarBehaviors],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [],
  },

  lifetimes: {
    created() {
      this.getOrderList();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取我发布的任务订单
    async getOrderList() {
      const id = wx.$store.userInfo.id;

      const {
        data: { code, data, message },
      } = await wx.$http.get(`/api/tasklist/issue/${id}`);

      if (code !== 200) return;

      // 订单排序: 完成的订单排在最后，未完成的订单排在前面
      this.setData({
        orderList: data.sort((a, b) => a.state - b.state),
      });
    },

    // 删除订单
    async delOrder(e) {
      const oid = e.currentTarget.dataset.oid;

      const {
        data: { code, message },
      } = await wx.$http.delete(`/api/task/${oid}`);

      if (code !== 200)
        return wx.showToast({
          title: message,
          icon: "success",
          duration: 2000,
        });

      this.getOrderList();

      wx.showToast({
        title: "删除成功",
        icon: "success",
        duration: 2000,
      });
    },
  },
});

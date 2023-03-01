import Dialog from "@vant/weapp/dialog/dialog";

const tabBarBehaviors = require("../../../../behaviors/tabBar-behaviors");
Component({
  behaviors: [tabBarBehaviors],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    Tab: 0,
    // 轮播图数据
    swiperList: [
      {
        title: "加入校园跑腿 开启你的第二份收入",
        image: "http://img.liuyuyang.net/zhxy/pt.jpg",
        cid: "1",
      },
    ],
    // 抢单列表
    orderList: [],
    // 我的订单
    myOrderList: [],
    // 待取货订单
    laterOrderList: [],
  },

  lifetimes: {
    created() {
      this.getOrderList();
      this.getLaterOrderList();
      this.getMyOrderList();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取任务列表
    async getOrderList() {
      const {
        data: { code, data },
      } = await wx.$http.get("/api/tasklist");

      if (code !== 200) return;

      this.setData({
        orderList: data,
      });
    },

    // 获取待取货订单
    async getLaterOrderList() {
      const id = wx.$store.userInfo.id;

      const {
        data: { code, data },
      } = await wx.$http.get(`/api/tasklist/receive/${id}`);

      if (code !== 200) return;

      this.setData({
        laterOrderList: data.filter((item) => item.state === 1),
      });
    },

    // 获取我的跑单列表
    async getMyOrderList() {
      const id = wx.$store.userInfo.id;

      const {
        data: { code, data },
      } = await wx.$http.get(`/api/tasklist/receive/${id}`);

      if (code !== 200) return;

      const list = data.filter((item) => item.state !== 0 && item.state !== 1);
      
      // 订单排序: 完成的订单排在最后，未完成的订单排在前面
      this.setData({
        myOrderList: list.sort((a, b) => a.state - b.state),
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

    resizeTab() {
      this.selectComponent("#taskTap").resize();
    },

    // 更改订单状态
    async getTaskList(e) {
      await this.getOrderList();
      await this.getLaterOrderList();
      await this.getMyOrderList();
    },
  },
});

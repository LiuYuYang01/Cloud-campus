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
    // 轮播图数据
    swiperList: [
      {
        title: "跑腿维权请联系平台管理员",
        image: "http://img.liuyuyang.net/zhxy/weiquan.jpg",
        cid: "1",
      },
      {
        title: "避免消费纠纷，权益维护要及时",
        image: "http://img.liuyuyang.net/zhxy/weiquan1.jpg",
        cid: "1",
      },
      {
        title: "打击诈骗，从我做起",
        image: "http://img.liuyuyang.net/zhxy/weiquan2.jpg",
        cid: "1",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    release() {
      wx.navigateTo({
        url: '/subPackages/pages/errand/release/release',
      })
    },
  },
});

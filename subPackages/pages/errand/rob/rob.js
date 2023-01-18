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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 接单
    meet() {
      Dialog.confirm({
        message: "你确定要接单吗？",
      })
        .then(() => {
          // on confirm
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

import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import store from "../store/store";

Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    pageList: [
      "/pages/home/home",
      "/pages/hobby/hobby",
      "/pages/socialize/socialize",
      "/pages/my/my",
    ],
    top: 1460,
    // top: 0,
    sty: "",
    info: "",
  },

  storeBindings: {
    store,
    fields: {
      // 健名可以自定义
      // abcdefg: () => store.active
      active: "active",
    },
    actions: {
      uActive: "updateActive",
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tabBar切换
    selectTabBar(e) {
      // e.detail 的值为当前选中项的索引
      this.setData({
        active: e.detail,
        top: 1460,
        sty: "",
      });

      wx.switchTab({
        url: this.data.pageList[e.detail],
      });

      this.uActive(e.detail);
    },
    // 弹出层
    eject() {
      if (wx.$store.popup === 1460) {
        wx.$store.updatePopup(0);
        this.setData({ sty: "move" });
      } else if (wx.$store.popup === 0) {
        wx.$store.updatePopup(1460);
        this.setData({ sty: "" });
      }

      // 每次点击就会生成不同的名人名言
      wx.request({
        url:
          "https://v.api.aa1.cn/api/api-wenan-mingrenmingyan/index.php?aa1=json",
        success: ({ data: res }) => {
          this.setData({
            info: res[0].mingrenmingyan,
          });
        },
      });
    },
  },
});

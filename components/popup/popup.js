import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import store from "../../store/store";

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store, // 指定要绑定的store
    fields: {
      // 指定要绑定的数据字段或计算属性
      popup: "popup", // 绑定字段的方式3
    },
    actions: {
      // 指定要绑定的方法
      updatePopup: "updatePopup",
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    sty: String,
    info: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 入口导航
    entranceNavList: [
      {
        title: "发布文章",
        icon: "coupon",
        url: "/pages/release/release",
        color: "#4fb985",
      },
      {
        title: "发朋友圈",
        icon: "gold-coin",
        url: "",
        color: "#6ebcfb",
      },
      {
        title: "找东西",
        icon: "gold-coin",
        url: "",
        color: "#fbb437",
      },
      {
        title: "去跑腿",
        icon: "send-gift",
        url: "/subPackages/pages/errand/home/home",
        color: "#4b84ff",
      },
      {
        title: "去维权",
        icon: "comment",
        url: "/subPackages/pages/report/report",
        color: "#91bcfb",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});

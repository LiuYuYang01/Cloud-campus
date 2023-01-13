import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import store from "../../store/store";

Component({
  // 通过storeBindingsBehavior来实现自动绑定
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store, //指定要绑定的store
    fields: { //指定要绑定的数据字段或计算属性
      userInfo: "userInfo",
    },
    actions: { //指定要绑定的方法
      updateUserInfo: "updateUserInfo",
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageX: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 左侧滑动菜单
    touchStart(e) {
      this.setData({
        startPoint: e.touches[0],
      });
    },
    touchMove(e) {
      let startPoint = this.data.startPoint.clientX;

      if (startPoint - e.touches[e.touches.length - 1].clientX < -100) {
        let n = e.changedTouches[0].clientX;

        this.setData({
          pageX: n,
        });
      } else {
        this.setData({
          pageX: 0,
        });
      }
    },
  },
});

import { action } from "mobx-miniprogram";

// 导出mobx实例
export default {
  // 被选中的第几个tabBar
  active: 0,

  updateActive: action(function (n) {
    this.active = n;
  }),
};

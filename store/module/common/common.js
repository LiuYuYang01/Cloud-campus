import { action } from "mobx-miniprogram";

// 导出mobx实例
export default {
  // 被选中的第几个tabBar
  active: 0,
  errandActive: 0,
  popup: 1460, // 发布组件是否显示
  onlineUserList: [], // 在线用户
  unreadList: [], // 存储未读消息的用户ID
  msgList: [], // 存储当前的聊天数据

  // 更新tabbar
  updateActive: action(function (n) {
    this.active = n;
  }),
  // 修改跑腿页面tabbar
  updateErrandActive: action(function (n) {
    this.errandActive = n;
  }),
  // 更新发布组件是否显示
  updatePopup: action(function (n) {
    this.popup = n;
  }),
  // 更新在线用户
  updOnlineUser: action(function (data) {
    this.onlineUserList = data || [];
  }),
  // 更新未读列表
  updUnreadList: action(function (mode, item) {
    if (mode == "reset") this.unreadList = item;
    if (mode == "add") this.unreadList = this.unreadList.concat(item);
  }),
  // 更新消息
  updMsgList: action(function (mode, list) {
    // more 多条数据
    if (mode == "more") this.msgList = this.msgList.concat(list);
    // 清空数据
    if (mode == "clear") this.msgList = [];
  }),
};

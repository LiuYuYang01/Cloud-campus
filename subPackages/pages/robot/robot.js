import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../store/store";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialog: [
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: "你好，我是AI人工智能机器人，很高兴认识你！",
      },
    ],
    content: "",
  },
  // 内容
  content(e) {
    const value = e.detail.value;
    this.setData({
      content: value,
    });
  },
  // 回复消息
  __reply(value) {
    this.data.dialog.push({
      role: "XZ",
      avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
      info: value,
    });

    this.setData({
      dialog: this.data.dialog,
    });
  },
  // 发布消息
  async release() {
    const val = this.data.content;
    let value = "";

    this.data.dialog.push({
      role: "USER",
      avatar: this.data.userInfo.avatar,
      info: val,
    });

    this.setData({
      dialog: this.data.dialog,
    });

    wx.showLoading({
      title: "请稍后...",
    });

    await new Promise((resolve, reject) => {
      this.setData({
        content: "",
      });

      return wx.request({
        method: "POST",
        url: `https://eolink.o.apispace.com/chatgpt-turbo/create`,
        header: {
          "X-APISpace-Token": "gh4pxcmf0181tfb0pivhuqnofuvwen80",
          "Authorization-Type": "apikey",
          "Content-Type": "",
        },
        data: {
          system: "你是一个小助手",
          message: [`user:${val}`],
          temperature: "0.9",
        },
        success: ({ data }) => {
          value = data.result;
          resolve(value);
        },
      });
    });

    // 回复消息
    this.__reply(value.trim());

    wx.hideLoading();
  },
  // 内容复制
  viewCopyTextClick(e) {
    // 使用复制文本API
    wx.setClipboardData({
      data: e.currentTarget.dataset.info,
      title: "消息已复制",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["userInfo"],
      actions: ["updateUserInfo"],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});

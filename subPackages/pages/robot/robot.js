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
        method: "GET",
        url: `https://v1.apigpt.cn/?q=${val}&apitype=sql`,
        success: ({ data }) => {
          value = data.ChatGPT_Answer;
          resolve(value);
        },
      });
    });

    // 回复消息
    this.__reply(value.trim());

    // this.setData({
    //   content: "",
    // });

    wx.hideLoading();
  },
  // 内容复制
  viewCopyTextClick() {
    var _this = this;
    wx.setClipboardData({
      data: _this.data.viewCopyMsg,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: "复制成功",
            });
          },
        });
      },
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

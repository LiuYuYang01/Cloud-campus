import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialog: [
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: "你好，我叫小智，很高兴认识你！",
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
  // 发布消息
  release() {
    const value = this.__lexicon(this.data.content);

    this.data.dialog.push(
      {
        role: "USER",
        avatar: this.data.userInfo.avatar,
        info: this.data.content,
      },
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: value,
      }
    );

    this.setData({
      dialog: this.data.dialog,
    });
  },
  // 词库
  __lexicon(val) {
    switch (val) {
      case "你好":
        console.log("同学，你也好");
        return "同学，你也好";
      
      default:
          return "让我想想说什么"
    }
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

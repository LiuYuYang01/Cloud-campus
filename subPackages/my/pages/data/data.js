import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../../store/store";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      avatar: "", //头像
      sex: 0, //性别
      name: "", //用户昵称
      signature: "", //个性签名
    },
  },

  // 头像上传
  async afterRead(e) {
    const file = e.detail.file;

    // 上传图片
    wx.uploadFile({
      url: "https://api.tockey.cn/api/upload", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      formData: { file, type: "avatar" },
      success: (res) => {
        const avatar = JSON.parse(res.data).data.url;

        this.setData({
          "info.avatar": avatar,
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

    setTimeout(() => {
      this.setData({
        "info.sex": this.data.userInfo.sex,
        "info.name": this.data.userInfo.name,
        "info.signature": this.data.userInfo.signature,
      });
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

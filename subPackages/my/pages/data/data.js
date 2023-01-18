import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../../store/store";
import Notify from "@vant/weapp/notify/notify";
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

  // 修改性别
  updateSex(e) {
    this.setData({
      "info.sex": e.detail,
    });
  },

  // 修改昵称
  updateName(e) {
    this.setData({
      "info.name": e.detail,
    });
  },

  // 修改个性签名
  updateSignature(e) {
    this.setData({
      "info.signature": e.detail,
    });
  },

  // 头像上传
  async afterRead(e) {
    // 上传后显示loading效果
    wx.showLoading({
      title: "头像正在上传",
    });

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

        // 上传完毕之后关闭loading效果
        wx.hideLoading();
      },
    });
  },

  // 确认修改
  async updateData() {
    const id = this.data.userInfo.id;

    // 修改资料
    const {
      data: { code, message },
    } = await wx.$http.post(`/api/user/info/${id}`, {
      ...this.data.userInfo,
      ...this.data.info,
    });

    this.updateUserInfo({ ...this.data.userInfo, ...this.data.info });

    if (code !== 200) return Notify({ type: "danger", message });

    Notify({ type: "success", message: "修改用户资料成功" });

    // 修改成功后跳转到我的页面
    wx.switchTab({
      url: "/pages/my/my",
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
        "info.avatar": this.data.userInfo.avatar,
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

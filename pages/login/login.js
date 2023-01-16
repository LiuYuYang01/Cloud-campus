import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";

import Notify from "@vant/weapp/notify/notify";
import {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo,
} from "../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },
  // 账号
  userIpt(e) {
    this.setData({
      username: e.detail.value,
    });
  },
  // 密码
  passIpt(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  // 用户登录
  async login() {
    const { username, password } = this.data;

    try {
      const {
        data: { code, message, userInfo, token },
      } = await wx.$http.post("/api/LoginOrRegister", {
        username,
        password,
      });

      // 发生错误
      if (code !== 200)
        return Notify({
          type: "danger",
          message,
          safeAreaInsetTop: true,
        });

      this.updateUserInfo(userInfo);
      setTimeout(() => {
        setUserInfo(JSON.stringify(this.data.userInfo))
      });

      // 将Token本地存储
      setToken(token);

      Notify({
        type: "success",
        message: "恭喜你，登录成功！",
        safeAreaInsetTop: true,
      });

      // 登录成功后跳转到首页
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/home/home",
        });
      }, 500);

      console.log({
        code,
        message,
        userInfo,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // 游客
  visitor() {
    wx.switchTab({
      url: "/pages/home/home",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
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

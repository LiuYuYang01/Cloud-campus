import {
  getUserInfo,
  setUserInfo,
  setToken,
  getToken,
} from "../../utils/localStorage";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // 入口导航
    entranceNavList: [
      {
        title: "我的内容",
        icon: "coupon",
        url: "",
        color: "#4b84ff",
      },
      {
        title: "我的点赞",
        icon: "like",
        url: "",
        color: "#fa6667",
      },
      {
        title: "我的收藏",
        icon: "star",
        url: "",
        color: "#fbb437",
      },
      {
        title: "我的说说",
        icon: "chat",
        url: "",
        color: "#6ebcfb",
      },
      {
        title: "我的关注",
        icon: "friends",
        url: "",
        color: "#ff9659",
      },
      {
        title: "待添加",
        icon: "plus",
        url: "",
        color: "#4fb985",
      },
    ],
    // 用户信息
    userInfo: {},
    // 登录后显示退出登录按钮，未登录不显示
    isQuitShow: false,
  },
  // 登录
  login() {
    const id = this.data.userInfo.id;

    if (!id) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },
  // 退出登录
  quit() {
    setUserInfo();
    this.setData({
      userInfo: JSON.parse(getUserInfo()),
    });

    setToken("");
  },
  // 跳转到修改资料页面
  goData() {
    wx.navigateTo({
      url: "/subPackages/my/pages/data/data",
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

    this.setData({
      userInfo: this.data.userInfo,
    });

    // 登录后显示退出登录按钮，未登录不显示
    if (getToken()) {
      this.setData({
        isQuitShow: true,
      });
    } else {
      this.setData({
        isQuitShow: false,
      });
    }
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

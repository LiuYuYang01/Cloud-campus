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
        title: "我的钱包",
        icon: "paid",
        url: "/subPackages/my/pages/wallet/wallet",
        color: "#f7b53e",
      },
      {
        title: "我的主页",
        icon: "flower-o",
        url: `/subPackages/my/pages/person/person?id=${
            getUserInfo() && JSON.parse(getUserInfo()).id
        }`,
        color: "#4fb985",
      },
      {
        title: "我的内容",
        icon: "coupon",
        url: "/subPackages/my/pages/content/content?type=内容",
        color: "#4b84ff",
      },
      {
        title: "我的点赞",
        icon: "like",
        url: "/subPackages/my/pages/content/content?type=点赞",
        color: "#fa6667",
      },
      {
        title: "我的收藏",
        icon: "star",
        url: "/subPackages/my/pages/content/content?type=收藏",
        color: "#fbb437",
      },
      {
        title: "我的说说",
        icon: "chat",
        url: "/subPackages/my/pages/content/content?type=说说",
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

    // 分享面版
    showShare: false,
    options: [
      { name: "微信", icon: "wechat", openType: "share" },
      { name: "微博", icon: "weibo" },
      { name: "复制链接", icon: "link" },
      { name: "分享海报", icon: "poster" },
      { name: "二维码", icon: "qrcode" },
    ],
  },

  // 登录
  go() {
    const id = this.data.userInfo.id;

    // 有ID就跳转到个人主页，没有ID就跳转到登录页
    if (id) {
      wx.navigateTo({
        url: `/subPackages/my/pages/person/person?id=${id}`,
      });
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },
  // 跳转到在线列表
  goOnlineList() {
    wx.navigateTo({
      url: "/subPackages/pages/onlineUser/onlineUser",
    });
  },
  // 跳转到修改资料页面
  goData() {
    wx.navigateTo({ url: "/subPackages/my/pages/data/data" });
  },
  // 跳转到实名认证页面
  goCertified() {
    wx.navigateTo({ url: "/subPackages/my/pages/certified/certified" });
  },
  // 跳转到修改密码页面
  goUpdatePass() {
    wx.navigateTo({ url: "/subPackages/my/pages/updatePass/updatePass" });
  },
  // 邀请好友
  invite() {
    this.setData({ showShare: true });
  },
  // 关闭
  inviteClose() {
    this.setData({ showShare: false });
  },
  // 选择
  inviteSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
  // 退出登录
  quit() {
    setUserInfo();
    this.setData({
      userInfo: JSON.parse(getUserInfo()),
    });

    wx.$store.breakSocket();

    setToken("");
    wx.navigateTo({
      url: "../../pages/login/login",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["userInfo", "unreadList"],
      actions: ["updateUserInfo"],
    });

    this.setData({
      userInfo: this.data.userInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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

    // 修复tabbar切换时候发布组件显示问题
    wx.$store.updatePopup(1460);

    // 判断有没有Token，没有就代表未登录，跳转到登录页
    if (!getToken()) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },

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

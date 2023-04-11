import Notify from "@vant/weapp/notify/notify";
import { getToken } from "../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], //轮播图列表
    bill: [
      {
        cid: 1,
        id: 1,
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/swiper/%E8%88%AA%E5%A4%A9%E8%88%AA%E7%A9%BA%E7%A7%91%E6%8A%80%E9%A3%8E%E8%9E%8D%E5%AA%92%E4%BD%93%E5%85%AC%E4%BC%97%E5%8F%B7%E9%A6%96%E5%9B%BE%281%29.jpg",
        title: "科技改变你我，代码改变世界 -云上校园",
        type: "home",
      },
    ],
    homeToppingList: [], // 学校置顶文章
    homeList: [], //学校动态列表
    index: 0,
    isPraise: "#888",
    isCollect: "#888",
    pageX: 0,
    startPoint: 0,
    // 入口导航
    entranceNavList: [
      {
        title: "校园跑腿",
        icon: "map-marked",
        url: "/subPackages/pages/errand/home/home",
        color: "#5a82fd",
      },
      {
        title: "校园科技馆",
        icon: "gem",
        url: "/subPackages/pages/laboratory/laboratory",
        color: "#7369e2",
      },
      {
        title: "AI机器人",
        icon: "fire",
        url: "/subPackages/pages/robot/robot",
        color: "#e8443b",
      },
      {
        title: "维权中心",
        icon: "comment",
        url: "/subPackages/pages/report/report",
        color: "#4fb985",
      },
    ],
  },
  // 顶部滚动导航
  navTap(e) {
    this.setData({
      index: e.target.dataset.index,
    });
  },
  // 获取轮播图数据
  async __getSwiperList() {
    // 获取轮播图
    const { data: res } = await wx.$http.get("/api/home/swiper");

    // 请求失败提示
    if (res.code !== 200)
      Notify({
        type: "danger",
        message: res.message,
      });

    this.setData({
      swiperList: res.data,
    });
  },
  // 左侧滑动菜单
  touchStart(e) {
    this.setData({
      startPoint: e.touches[0],
    });
  },
  touchMove(e) {
    let startPoint = this.data.startPoint.clientX;

    if (startPoint - e.touches[e.touches.length - 1].clientX < -100) {
      let n = e.changedTouches[0].clientX;

      this.setData({
        pageX: n,
      });
    } else {
      this.setData({
        pageX: 0,
      });
    }
  },
  // 跳转到我的页面
  goMy() {
    wx.switchTab({
      url: "/pages/my/my",
    });
  },
  // 获取学校动态置顶文章
  async __getHomeToppingList() {
    const { data: res } = await wx.$http.get("/api/article/topping", {
      type: "home",
    });

    this.setData({
      homeToppingList: res.data || [],
    });
  },
  // 获取学校动态文章
  async __getHomeList() {
    const { data: res } = await wx.$http.get("/api/home/article");
    // 请求失败提示
    if (res.code !== 200)
      Notify({
        type: "danger",
        message: res.message,
      });

    this.setData({
      homeList: res.data,
    });
  },
  // 重新获取最新数据
  async getList() {
    console.log(1111);
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/home/article`);

    if (data) {
      this.setData({ homeList: data });
    } else {
      this.setData({ homeList: [] });
    }

    // 置顶文章
    (async () => {
      const {
        data: { code, data },
      } = await wx.$http.get("/api/article/topping", {
        type: "home",
      });

      // 请求失败提示
      if (code !== 200) return;

      this.setData({
        homeToppingList: data,
      });
    })();
  },
  // 跳转到机器人
  goRobot() {
    wx.navigateTo({
      url: "/subPackages/pages/robot/robot",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    // 修复tabbar切换时候发布组件显示问题
    wx.$store.updatePopup(1460);

    await this.__getSwiperList();
    await this.__getHomeToppingList();
    await this.__getHomeList();

    // 判断有没有Token，没有就代表未登录，跳转到登录页
    if (getToken()) {
      console.log("已登录");
    } else {
      console.log("未登录");
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
  async onPullDownRefresh() {
    await this.__getSwiperList();
    await this.__getHomeToppingList();
    await this.__getHomeList();

    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});

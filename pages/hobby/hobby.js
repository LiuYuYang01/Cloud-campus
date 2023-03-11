import Notify from "@vant/weapp/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageX: 0,
    startPoint: 0,
    active: 1,
    swiperList: [], //轮播图列表
    laboratory: [
      {
        cid: 1,
        id: 1,
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/swiper/%E5%BE%AE%E4%BF%A1%E6%94%AF%E6%8C%81%E6%B5%8F%E8%A7%88%E6%9C%8B%E5%8F%8B%E5%9C%88%E7%83%AD%E7%82%B9%E5%85%AC%E4%BC%97%E5%8F%B7%E9%A6%96%E5%9B%BE%281%29.jpg",
        title: "校园科技馆 - 快来体验高科技吧",
        type: "home",
      },
      {
        cid: 2,
        id: 2,
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/swiper/xykjg2.jpg",
        title: "校园科技馆 - 快来体验高科技吧",
        type: "home",
      },
      {
        cid: 3,
        id: 3,
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/swiper/xykjg1.jpg",
        title: "校园科技馆 - 快来体验高科技吧",
        type: "home",
      },
    ], //实验室
    // 入口导航
    cateList: [],
    hobbyToppingList: [],
    hobbyList: [],
    searchRes: [], // 搜索结果
    showSearchBox: false, // 显示搜索结果
    times: null, // 定时器 防抖用
    showSearchLod: false, // 正在搜索
    keyword: "",
  },
  showSB() {
    this.setData({ showSearchBox: true });
  },
  hideSB() {
    this.setData({ showSearchBox: false });
  },
  // 搜索框
  searchHandler(e) {
    clearTimeout(this.data.times);
    if (!e.detail.length) return this.setData({ searchRes: "" });
    this.setData({
      times: setTimeout(() => {
        this.setData({ showSearchLod: true });
        wx.request({
          url: `https://api.tockey.cn/api/search`,
          method: "post",
          data: { value: e.detail },
          success: (res) => {
            let { code, message, data } = res.data;
            if (code == 400) return Notify(message);
            this.setData({ searchRes: data, showSearchLod: false });
          },
        });
      }, 300),
    });
  },

  // 跳转文章
  goArticle(e) {
    const { id, type } = e.currentTarget.dataset;

    wx.navigateTo({
      url: `/pages/article/article?id=${id}&&type=${type}`,
    });

    // 跳转完毕后把搜索的内容与结果都清空
    this.setData({
      keyword: "",
      searchRes: [],
    });
  },
  // 跳转到校园科技馆
  goLaboratory() {
    wx.navigateTo({
      url: "/subPackages/pages/laboratory/laboratory",
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
  // 获取轮播图数据
  async __getSwiperList() {
    // 获取轮播图
    const { data: res } = await wx.$http.get("/api/hobby/swiper");
    this.setData({
      swiperList: res.data,
    });
  },
  // 获取学校动态置顶文章
  async __getHomeToppingList() {
    const { data: res } = await wx.$http.get("/api/article/topping", {
      type: "hobby",
    });

    // 请求失败提示
    if (res.code !== 200) return;

    this.setData({
      hobbyToppingList: res.data,
    });
  },
  // 获取兴趣圈数据
  async __getHobbyList() {
    const { data: res } = await wx.$http.get("/api/hobby/article");

    this.setData({
      hobbyList: res.data,
    });
  },
  // 获取兴趣圈分类数据
  async cateList() {
    const {
      data: { data },
    } = await wx.$http.get("/api/hobby/cate");
    this.setData({
      cateList: data,
    });
  },
  // 重新获取最新数据
  async getList() {
    // 普通文章
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/hobby/article`);

    if (code !== 200) return;

    this.setData({
      hobbyList: data,
    });

    // 置顶文章
    (async () => {
      const {
        data: { code, data },
      } = await wx.$http.get("/api/article/topping", {
        type: "hobby",
      });

      // 请求失败提示
      if (code !== 200) return;

      this.setData({
        hobbyToppingList: data,
      });
    })();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 修复tabbar切换时候发布组件显示问题
    wx.$store.updatePopup(1460);

    this.__getSwiperList();
    this.__getHomeToppingList();
    this.__getHobbyList();
    this.cateList();
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
  onPullDownRefresh() {
    this.__getSwiperList();
    this.__getHomeToppingList();
    this.__getHobbyList();
    this.cateList();

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

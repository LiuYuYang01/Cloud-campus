Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageX: 0,
    startPoint: 0,
    active: 1,
    swiperList: [], //轮播图列表
    // 入口导航
    cateList: [],
    hobbyList: [],
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.__getSwiperList();
    this.__getHobbyList();
    this.cateList();
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

import Notify from "@vant/weapp/notify/notify";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dynamicList: [],
    active: 2,
    pageX: 0,
    startPoint: 0,
  },
  // 获取朋友圈数据
  async __getDynamicList() {
    const { data: res } = await wx.$http.get("/api/socialize/article");

    this.setData({
      dynamicList: res.data,
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
  // 重新获取最新数据
  async getList() {
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/socialize/article`);

    if (code !== 200) return;

    this.setData({
      dynamicList: data,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.__getDynamicList();
  },

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

    this.__getDynamicList();
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

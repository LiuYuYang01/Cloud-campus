Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      {
        id: 1,
        title: "云上校园 - 维权中心",
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/test/jubao.jpg",
        cid: "",
      },
      {
        id: 1,
        title: "云上校园 - 维权中心",
        image:
          "https://campus-1312676635.cos.ap-shanghai.myqcloud.com/test/jubao.jpg",
        cid: "",
      },
    ],
    loveList: [],
    functionList: [
      {
        title: "校园匿名信",
        svg: "/assets/svg/xuexiao.svg",
        url: "/subPackages/pages/anonymous/anonymous",
      },
      {
        title: "校园兼职投诉",
        svg: "/assets/svg/jianzhi.svg",
        url: "/subPackages/pages/anonymous/anonymous",
      },
      {
        title: "跑腿订单投诉",
        svg: "/assets/svg/paotui.svg",
        url: "/subPackages/pages/anonymous/anonymous",
      },
      {
        title: "其他投诉",
        svg: "/assets/svg/qita.svg",
        url: "/subPackages/pages/anonymous/anonymous",
      },
    ],
  },

  // 获取学校动态数据
  async __getLoveList() {
    const { data: res } = await wx.$http.get("/api/socialize/article");

    // 请求失败提示
    if (res.code !== 200)
      Notify({
        type: "danger",
        message: res.message,
      });

    this.setData({
      loveList: res.data,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.__getLoveList();
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

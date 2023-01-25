// subPackages/pages/start/start.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: 3,
  },

  // 点击直接跳过到首页
  goHome() {
      wx.switchTab({
        url: '/pages/home/home',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setInterval(() => {
      this.setData({ time: (this.data.time -= 1) });

      // 3秒后自动跳转到首页
      if (this.data.time === 0) {
        wx.switchTab({
          url: "/pages/home/home",
        });
      }
    }, 1000);
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

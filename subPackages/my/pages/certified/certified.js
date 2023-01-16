// subPackages/my/pages/certified/certified.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: "进行中",
        desc: "请注意",
        inactiveIcon: "checked",
        activeIcon: "success",
      },
      {
        text: "步骤二",
        desc: "描述信息",
        activeIcon: "plus",
      },
      {
        text: "步骤三",
        desc: "描述信息",
        activeIcon: "cross",
      },
      {
        text: "步骤四",
        desc: "描述信息",
        activeIcon: "fail",
      },
    ],
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

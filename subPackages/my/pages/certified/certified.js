// subPackages/my/pages/certified/certified.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: "未开始",
        desc: "请先提交实名认证资料",
        activeIcon: "success",
      },
      {
        text: "进行中",
        desc: "请等待认证进度",
        activeIcon: "plus",
      },
      {
        text: "审核中",
        desc: "请确保提交的资料无误",
        activeIcon: "cross",
      },
      {
        text: "审核成功",
        desc: "恭喜你实名认证成功！",
        activeIcon: "fail",
      },
    ],
    stepsActive:1
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

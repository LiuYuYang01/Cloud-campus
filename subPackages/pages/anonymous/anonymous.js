// subPackages/pages/anonymous/anonymous.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
  },

  // 提交
  async submit() {
    console.log(this.data.content, 222);

    const {
      data: { status, message },
    } = await wx.$http.post("/api/maintain", {
      info: this.data.content,
      type: 1,
    });

    if (status !== 200) {
      return wx.showToast({
        title: message,
        icon: "success",
        duration: 2000,
      });
    }

    wx.showToast({
      title: "提交成功",
      icon: "success",
      duration: 2000,
    });
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

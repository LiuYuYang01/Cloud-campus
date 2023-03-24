// subPackages/pages/anonymous/anonymous.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    myInfoList: [],
  },

  // 提交
  submit() {
    wx.showModal({
      title: "提示",
      content: "你确定要提交该匿名信吗？",
      success: async (res) => {
        if (res.confirm) {
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

          this.setData({ content: "" });

          wx.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2000,
          });
        }
      },
    });
  },

  // 获取我提交的匿名信
  async getMyInfoList() {
    const {
      data: { data },
    } = await wx.$http.get("/api/maintain");

    this.setData({
      myInfoList: data,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyInfoList();
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

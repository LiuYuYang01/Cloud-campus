// pages/cate/cate.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
  },

  // 重新获取最新数据
  async getList(type) {
    // 普通文章
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/hobby/article`);

    if (code !== 200) return;

    this.setData({
      cateList: data.filter((item) => {
        return item.cate === type;
      }),
    });

    console.log(this.data.cateList);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({type}) {
    this.getList(type);
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
  onPullDownRefresh() {
    this.getList()

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

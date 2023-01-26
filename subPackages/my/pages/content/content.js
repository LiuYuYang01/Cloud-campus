import { getUserInfo } from "../../../../utils/localStorage";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  // 获取文章
  async getList() {
    const {
      data: { code, data },
    } = await wx.$http.get("/api/hobby/article");

    if (code !== 200) return;

    // 筛选出自己的文章
    const list = data.filter((item) => {
      const id = (getUserInfo() && JSON.parse(getUserInfo()).id) || 0;
      return item.userID === id;
    });

    this.setData({
      list,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
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

import { getUserInfo } from "../../../../utils/localStorage";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  async getList(api) {
    const {
      data: { code, data },
    } = await wx.$http.get(api);

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

  // 获取我的内容
  async getContent() {
    this.getList("/api/hobby/article");
  },

  // 获取我的说说
  async getSocialize() {
    this.getList("/api/socialize/article");
  },

  // 跳转到文章页
  goArticle(e) {
    const { id, type } = e.currentTarget.dataset;
    
    wx.navigateTo({
      url: `/pages/article/article?id=${id}&type=${type}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type }) {
    switch (type) {
      case "内容":
        this.getContent();
        break;
      case "说说":
        this.getSocialize();
        break;
    }
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

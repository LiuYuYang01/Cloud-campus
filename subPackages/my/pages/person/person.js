import { getUserInfo } from "../../../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    userInfo: (getUserInfo() && JSON.parse(getUserInfo())) || {},
    articleList: [],
    socializeList: [],
  },

  // 获取兴趣圈数据
  async _getArticleList() {
    const {
      data: { code, data },
    } = await wx.$http.get("/api/hobby/article");

    if (code !== 200) return;

    this.setData({
      articleList: data.filter((item) => item.userID === this.data.userInfo.id),
    });
  },

  // 获取朋友圈数据
  async _getSocializeList() {
    const {
        data: { code, data },
      } = await wx.$http.get("/api/socialize/article");
  
      if (code !== 200) return;
  
      this.setData({
        socializeList: data.filter((item) => item.userID === this.data.userInfo.id),
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getArticleList();
    this._getSocializeList();
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

import { getUserInfo } from "../../../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    userInfo: {},
    articleList: [],
    socializeList: [],
  },

  // 回退页面
  backPage() {
    wx.navigateBack({
      delta: 1,
    });
  },

  // 获取用户数据
  async getUserInfo(id) {
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/user/${id}`);

    if (code !== 200) return;

    this.setData({
      userInfo: data[0],
    });
  },

  // 获取数据
  async getArticleList(api, type) {
    console.log(api, type);

    const {
      data: { code, data },
    } = await wx.$http.get(`/api/${api}/article`);

    if (code !== 200) return;

    // 兴趣圈数据
    if (type === "articleList") {
      this.setData({
        articleList: data.filter(
          (item) => item.userID === this.data.userInfo.id
        ),
      });
      // 朋友圈数据
    } else if (type === "socializeList") {
      this.setData({
        socializeList: data.filter(
          (item) => item.userID === this.data.userInfo.id
        ),
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }) {
    this.getUserInfo(id);
    this.getArticleList("hobby", "articleList");
    this.getArticleList("socialize", "socializeList");
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

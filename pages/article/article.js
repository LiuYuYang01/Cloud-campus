import Notify from "@vant/weapp/notify/notify";
import Dialog from "@vant/weapp/dialog/dialog";
import { getUserInfo } from "../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {}, //文章内容
    showUpdate: false,
    userID: (JSON.parse(getUserInfo()) && JSON.parse(getUserInfo()).id) || 0,
    show: false, // 是否显示评论框
    commentVal: "", // 发布评论的内容
    commentList: [], //评论列表
  },
  // 获取文章列表
  async getArticleList(id, type) {
    const {
      data: { code, message, data },
    } = await wx.$http.get(`/api/${type}/article/get/${id}`);

    if (code !== 200) return Notify({ type: "danger", message });

    if (data[0].userID === this.data.userID) {
      this.setData({
        showUpdate: true,
      });
    }

    this.setData({
      article: data[0],
    });

    console.log(this.data.article);
  },

  // 获取评论列表
  async getCommentList() {
    const {
      data: { code, comments, message },
    } = await wx.$http.get(`/api/comment/${this.data.article.id}`);
    console.log(code, comments, message);

    if (code !== 200) return

    this.setData({ commentList: comments });
  },

  // 修改文章
  update() {
    const { id, type } = this.data.article;

    wx.navigateTo({
      url: `/pages/release/release?id=${id}&type=${type}`,
    });
  },

  // 删除评论
  del() {
    Dialog.confirm({
      title: "提醒",
      message: "你确定要删除该评论吗？",
    })
      .then(() => {
        console.log("已删除");
      })
      .catch(() => {
        console.log("已取消");
      });
  },

  // 弹出
  onClose() {
    this.setData({ show: false });
  },

  // 打开评论框
  comment() {
    this.setData({ show: true });
  },

  // 评论内容
  commentChange(e) {
    this.setData({ commentVal: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({ id, type }) {
    await this.getArticleList(id, type);
    this.getCommentList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {},

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

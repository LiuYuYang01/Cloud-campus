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
    userID: (getUserInfo() && JSON.parse(getUserInfo()).id) || 0,
    show: false, // 是否显示评论框
    commentList: [], //评论列表
    comment: {
      aid: "",
      name: "",
      avatar: "",
      content: "",
      date: "",
    },
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
  },

  // 获取评论列表
  async getCommentList() {
    const {
      data: { code, comments, message },
    } = await wx.$http.get(`/api/comment/${this.data.article.id}`);

    if (code !== 200) return;

    this.setData({ commentList: comments });
  },

  // 新增评论
  async addComment() {
    const userInfo = getUserInfo() && JSON.parse(getUserInfo());

    this.setData({
      "comment.aid": this.data.article.id,
      "comment.name": userInfo.name,
      "comment.avatar": userInfo.avatar,
    });

    const {
      data: { code, message },
    } = await wx.$http.post("/api/comment", this.data.comment);

    if (code !== 200) return Notify({ type: "danger", message });

    this.setData({ show: false });

    Notify({ type: "success", message: "发布评论成功" });

    this.getCommentList();
  },

  // 修改文章
  updateArticle() {
    const { id, type } = this.data.article;

    wx.navigateTo({
      url: `/pages/release/release?id=${id}&type=${type}`,
    });
  },

  // 删除评论
  delComment(e) {
    Dialog.confirm({
      title: "提醒",
      message: "你确定要删除该评论吗？",
    })
      .then(async () => {
        const id = e.currentTarget.dataset.id;
        const {
          data: { code, message },
        } = await wx.$http.delete(`/api/comment/${id}`);

        if (code !== 200) return Notify({ type: "danger", message });

        Notify({ type: "success", message: "删除评论成功" });

        this.getCommentList();
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
    this.setData({ "comment.content": e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({ id, type }) {
    await this.getArticleList(id, type);

    // 文章标题
    wx.setNavigationBarTitle({
      title: this.data.article.title,
    });

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

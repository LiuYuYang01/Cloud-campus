import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";
Page({
  data: {
    // 入口导航
    cateList: [],
    pickerShow: "none",
    // 分类选择器
    selectCate: [],

    // 文章扩展设置
    activeNames: ["0"],

    // 文章信息
    article: {
      userID: 0, //作者ID
      name: "", //作者昵称
      avatar: "", //作者头像
      title: "", //文章标题
      describe: "", //文章描述
      content: "", //文章内容
      cover: [], //文章封面
      cate: "", //文章所属分类
      views: 0, //文章浏览量
      is_concern: 0, //是否关注该作者
      is_like: 0, //是否点赞该文章
      is_topping: 0, //是否置顶该文章
      is_boutique: 0, //是否精品该文章
      is_collection: 0, //是否收藏该文章
      date: "", //文章发布时间
    },

    // 是否置顶
    is_topping: 0,
    // 是否精选
    is_boutique: 0,

    // 图片预览
    previewList: [],
    // 图片封面
    coverList: [],
  },

  // 修改标题
  updateTitle(e) {
    this.setData({
      "article.title": e.detail,
    });
  },

  // 初始化编辑器
  async release() {
    // // 拿到编辑器组件的实例
    const editor = this.selectComponent("#editor");
    // 调用组件的release方法将数据保存到content
    await editor.release();
    // 然后拿到组件中content的值（编辑器中的数据）
    setTimeout(() => {
      this.setData({
        "article.content": editor.data.content,
        "article.describe": "21321312",
        "article.date": new Date(),
      });

      // 新增文章
      this.addArticle();
      console.log("文章数据：", this.data.article, 2222);
    });
  },

  // 新增文章
  async addArticle() {
    const res = await wx.$http.post("/api/hobby/article", this.data.article);
    console.log(res.data);
  },

  // 获取兴趣圈分类数据
  async cateList() {
    const {
      data: { data },
    } = await wx.$http.get("/api/hobby/cate");

    this.setData({
      cateList: data,
      selectCate: data.map((item) => item.title),
    });
    console.log(this.data.cateList);
  },

  // 获取选中的分类
  picker(event) {
    const { picker, value, index } = event.detail;

    this.setData({
      "article.cate": value,
    });

    console.log(this.data.article.cate, 111);
    console.log(`当前值：${value}, 当前索引：${index}`);
  },

  // 打开分类选择器
  pickerShowClick() {
    this.setData({
      pickerShow: "block",
    });
  },

  // 关闭分类选择器
  pickerHideClick() {
    this.setData({
      pickerShow: "none",
    });

    this.setData({
      "article.cate": "",
    });
  },

  // 确认选择分类
  pickerClick() {
    this.setData({
      pickerShow: "none",
    });
  },

  // 图片上传
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: "https://api.tockey.cn/api/upload", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      formData: {
        file,
        type: "article",
      },
      success: (res) => {
        this.data.coverList.push(JSON.parse(res.data).data.url);

        // 上传完成需要更新 previewList
        const { previewList = [] } = this.data;
        previewList.push({
          ...file,
          url: JSON.parse(res.data).url,
        });

        this.setData({
          previewList,
          "article.cover": this.data.coverList,
        });
      },
    });
  },

  // 扩展设置
  extend(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  // 是否置顶
  topping({ detail }) {
    this.setData({ "article.is_topping": detail });
  },

  // 是否精选
  boutique({ detail }) {
    this.setData({ "article.is_boutique": detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["userInfo"],
      actions: ["updateUserInfo"],
    });

    // 导入用户信息
    setTimeout(() => {
      const { id, name, avatar } = this.data.userInfo;

      this.setData({
        article: { ...this.data.article, userID: id, name, avatar },
      });
    });

    this.cateList();
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

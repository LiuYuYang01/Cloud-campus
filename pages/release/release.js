import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";
import { getToken, getUserInfo } from "../../utils/localStorage";

import Notify from "@vant/weapp/notify/notify";
import Dialog from "@vant/weapp/dialog/dialog";
Page({
  data: {
    // 入口导航
    cateShow: "none",
    circleShow: "none",
    circleList: [],
    // 分类选择器
    selectCate: ["首页", "兴趣圈"],
    // 圈子选择器
    selectCircle: [],
    cate: "",

    // 文章扩展设置
    activeNames: ["0"],

    // 文章信息
    article: {
      userID: 0, //作者ID
      title: "", //文章标题
      describe: "", //文章描述
      content: "", //文章内容
      cover: [], //文章封面
      //   cover:"['https://liuyuyang.net/usr/uploads/2023/01/129447723.png']",
      cate: "", //文章所属分类
      is_topping: 0, //是否置顶该文章
      is_boutique: 0, //是否精品该文章
    },

    // editor编辑器内容
    delta: {},

    // 是否置顶
    is_topping: 0,
    // 是否精选
    is_boutique: 0,

    // 图片预览
    previewList: [],
    // 图片封面
    coverList: [],
    n: 0,
    state: "发布文章",
  },

  // 修改标题
  updateTitle(e) {
    this.setData({
      "article.title": e.detail,
    });
  },

  // 文章摘要
  updateDescribe(e) {
    this.setData({
      "article.describe": e.detail,
    });
  },

  // 初始化编辑器
  async release() {
    // 拿到编辑器组件的实例
    const editor = this.selectComponent("#editor");

    // 调用组件的release方法将数据保存到content
    await editor.release();

    // 然后拿到组件中content的值（编辑器中的数据）
    setTimeout(() => {
      this.setData({
        "article.content": editor.data.delta.html,
        delta: editor.data.delta,
      });

      // 新增 | 编辑文章
      if (this.data.n) {
        this.articleIsOk();
      }

      this.setData({ n: 1 });
    });
  },

  // 发布 | 编辑文章
  async articleIsOk() {
    if (this.data.state === "发布文章") {
      // 如果没有写文章摘要，则默认截取文章内容前100个字
      let describe = () => {
        if (!this.data.article.describe) {
          this.setData({
            "article.describe": this.data.delta.text.slice(0, 100),
          });
        }
      };

      // 选择发布文章到哪里
      if (this.data.cate === "首页") {
        // 判断是否是管理员，首页只有管理员才能发布文章
        if (wx.$store.userInfo.is_admin !== 1)
          return Dialog.alert({
            title: "暂无权限",
            message: "只有平台管理员可以发布首页文章",
          });

        describe();

        let {
          data: { code, message },
        } = await wx.$http.post("/api/home/article", {
          ...this.data.article,
          cate: "首页",
        });

        if (code !== 200) return Notify({ type: "danger", message });

        // 发布文章成功后跳转到首页
        wx.switchTab({
          url: "/pages/home/home",
        });
      } else if (this.data.cate === "兴趣圈") {
        describe();

        let {
          data: { code, message },
        } = await wx.$http.post("/api/hobby/article", this.data.article);

        if (code !== 200) return Notify({ type: "danger", message });

        // 发布文章成功后跳转到兴趣圈
        wx.switchTab({
          url: "/pages/hobby/hobby",
        });
      }

      if (!this.data.cate)
        return Notify({ type: "danger", message: "请选择发布到哪个分类" });

      Notify({ type: "success", message: "恭喜你文章发布成功" });
    } else if (this.data.state === "编辑文章") {
      const { id, type } = this.data.article;

      const {
        userID,
        title,
        describe,
        content,
        cover,
        date,
        is_boutique,
        views,
      } = this.data.article;

      const {
        data: { code, message },
      } = await wx.$http.post(`/api/${type}/article/${id}`, {
        userID,
        title,
        describe,
        content,
        cover,
        date,
        is_boutique,
        views,
      });

      if (code !== 200) return Notify({ type: "danger", message });

      Notify({ type: "success", message: "恭喜你修改文章成功" });

      // 修改成功后跳转
      setTimeout(() => {
        wx.switchTab({
          url: `/pages/${type}/${type}`,
        });
      }, 1000);
    }

    // 发布或编辑文章成功后隐藏发布组件
    wx.$store.updatePopup(1460);
  },

  // 获取兴趣圈分类数据
  async circleList() {
    const {
      data: { data },
    } = await wx.$http.get("/api/hobby/cate");

    this.setData({
      circleList: data,
      selectCircle: data.map((item) => item.title),
    });
  },

  // 获取选中的分类
  cate(event) {
    const { picker, value, index } = event.detail;

    this.setData({
      cate: value,
    });
  },

  // 打开分类选择器
  cateShowClick() {
    this.setData({
      cateShow: "block",
    });
  },

  // 关闭分类选择器
  cateHideClick() {
    this.setData({
      cateShow: "none",
    });

    this.setData({
      "article.cate": "",
    });
  },

  // 确认选择分类
  cateClick() {
    this.setData({
      cateShow: "none",
    });
  },

  // 获取选中的分类
  circle(event) {
    const { picker, value, index } = event.detail;

    this.setData({
      "article.cate": value,
    });
  },

  // 打开圈子选择器
  circleShowClick() {
    this.setData({
      circleShow: "block",
    });
  },

  // 关闭圈子选择器
  circleHideClick() {
    this.setData({
      circleShow: "none",
    });

    this.setData({
      "article.cate": "",
    });
  },

  // 确认选择圈子
  circleClick() {
    this.setData({
      circleShow: "none",
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
          url: JSON.parse(res.data).data.url,
        });

        console.log(JSON.parse(res.data).data.url, 123);

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

  click() {
    if (!this.data.n) {
      // 初始化编辑器
      this.release();
    }
  },

  // 回显数据
  async __getArticleData(id, type) {
    const {
      data: { code, message, data },
    } = await wx.$http.get(`/api/${type}/article/get/${id}`);

    if (code !== 200) return Notify({ type: "danger", message });

    // 过滤分类
    let cate = "";
    if (data[0].type === "home") {
      cate = "首页";
    } else if (data[0].type === "hobby") {
      cate = "兴趣圈";
    }

    // 回显编辑器中的数据
    const editor = this.selectComponent("#editor");
    editor.onEditorReady(data[0].content);

    // 回显当前文章数据
    this.setData({
      article: data[0],
      cate,
      // 回显封面
      previewList: data[0].cover.map((item) => {
        return { url: item };
      }),
      // 状态
      state: "编辑文章",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id, type }) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["userInfo"],
      actions: ["updateUserInfo"],
    });

    // 导入用户信息
    setTimeout(() => {
      const { id } = this.data.userInfo;

      this.setData({
        article: {
          ...this.data.article,
          userID: id,
        },
      });
    });

    this.circleList();

    // 有id就是编辑模式
    if (id) {
      this.__getArticleData(id, type);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 判断有没有Token，没有就代表未登录，跳转到登录页
    if (!getToken()) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },

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

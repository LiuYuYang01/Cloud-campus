import Notify from "@vant/weapp/notify/notify";
import Toast from "@vant/weapp/toast/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    active: 1,
    userInfo: {},
    articleList: [],
    socializeList: [],
    show: false,
    customImage: "", //自定义图片
    select: 0, //当前选中的图片
    //背景图片列表
    bgList: [
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576589402339327tSPfjvL7P5va47e8dc923face9c825ecb348ebbcf37a.webp",
        title: "风景",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576587331059423uOUwramHpshl41dfb0ee86b68f3a7a567eb9434d12b4.webp",
        title: "日落",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576573037887718HCMZW3UdEwF6fc2e595f15db3491113782a1d3c1f833.webp",
        title: "治愈",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576578200301844t78WtKTwKe3D913bac104b8a28c78b7c0553e67e494a.webp",
        title: "城市",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576583942692349NLb7HQe9WXLlc786894e493cc19969484199d26a7e6f.webp",
        title: "色彩",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576592480041973WYupfwRmQpCI7777b45441bad7f38683afc943f21b5f.webp",
        title: "狼",
      },
      {
        img:
          "https://api.tockey.cn/public/imgs/test/167576562825138379e89XXSTC1rL0ed732c8ff22983f3313d0deb438e3977.webp",
        title: "代码",
      },
    ],
    bgImage: "", //临时-背景图片
  },

  // 回退页面
  backPage() {
    wx.navigateBack({
      delta: 1,
    });
  },

  // 自定义背景
  DIY() {
    this.setData({ show: true });
  },

  // 关闭
  DIYClose() {
    this.setData({ show: false });
  },

  // 选择背景图片
  selectBg(e) {
    const { img, index } = e.currentTarget.dataset;
    console.log(img);
    console.log(index);

    this.setData({
      bgImage: img,
      select: index,
    });
  },

  // 上传自定义背景
  uploadImage(e) {
    const file = e.detail.file;

    wx.uploadFile({
      url: "https://api.tockey.cn/api/upload", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: "file",
      formData: {
        type: "test",
        file,
      },
      // 图片上传成功回调
      success: (res) => {
        if (res.statusCode !== 200) return;

        const { code, data, message } = JSON.parse(res.data);

        if (code !== 200) return Notify({ type: "danger", message });

        this.setData({
          bgImage: data.url,
          customImage: data.url,
        });

        Notify({ type: "success", message: "恭喜你上传成功" });
      },
    });
  },

  // 更改背景图片
  async updateImage() {
    if (!this.data.bgImage) return Toast("你还没有选择背景图片呢");

    const {
      data: { code, message },
    } = await wx.$http.post(`/api/user/info/${this.data.id}`, {
      cover: this.data.bgImage,
    });

    if (code !== 200) return Toast(message);

    this.setData({
      show: false,
    });

    Toast("修改背景图片成功");
    this.getUserInfo();
  },

  // 获取用户数据
  async getUserInfo() {
    const {
      data: { code, data },
    } = await wx.$http.get(`/api/user/${this.data.id}`);

    if (code !== 200) return;

    this.setData({
      userInfo: data[0],
    });
  },

  // 获取数据
  async getArticleList(api, type) {
    const {
      data: { code, data, message },
    } = await wx.$http.get(`/api/${api}/article`);

    if (code !== 200)
      return wx.showToast({
        title: message,
        icon: "error",
        duration: 2000,
      });

    // 兴趣圈数据
    if (type === "articleList") {
      this.setData({
        articleList: data.filter(
          async (item) => (await item.userID) === this.data.userInfo.id
        ),
      });
      // 朋友圈数据
    } else if (type === "socializeList") {
      this.setData({
        socializeList: data.filter(
          (item) => (item.userID) === this.data.userInfo.id
        ),
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({ id }) {
    await this.setData({ id });
    await this.getUserInfo();
    await this.getArticleList("hobby", "articleList");
    await this.getArticleList("socialize", "socializeList");
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

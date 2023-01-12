import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";
import { translate } from "../../utils/translate";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialog: [
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: "你好，我叫小智，很高兴认识你！",
      },
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: "我会很多技能哦，你可以对我说讲个笑话、翻译、或者安慰",
      }
    ],
    content: "",
    temp: "",
  },
  // 内容
  content(e) {
    const value = e.detail.value;
    this.setData({
      content: value,
    });
  },
  // 回复消息
  __reply(value) {
    this.data.dialog.push(
      {
        role: "USER",
        avatar: this.data.userInfo.avatar,
        info: this.data.content,
      },
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info: value,
      }
    );

    this.setData({
      dialog: this.data.dialog,
    });
  },
  // 发布消息
  async release() {
    const val = this.data.content;
    let value = "";

    switch (true) {
      // 安慰
      case val.includes("安慰"):
        const {
          data: { anwei },
        } = await wx.p.request({
          method: "GET",
          url: "https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json",
        });

        value = anwei;
        break;

      case val.includes("翻译"):
        value = `请输入翻译的内容，如下示例：
翻译 hello 为中文 
格式：en hello zh 

翻译 你好 为英文
格式：zh 你好 en`;
        break;

      // 翻译
      case ["zh", "en"].includes(val.split(" ")[0] || val.split(" ")[2]):
        // 当前语言
        const from = val.split(" ")[0];
        // 内容
        const content = val.split(" ")[1];
        // 目标语言
        const to = val.split(" ")[2];

        value = await translate(from, content, to);

        break;

        // 历史上的今天
        case val.includes("历史上的今天"):

            break;
      default:
        value = "让我想想说什么";
    }

    // 回复消息
    this.__reply(value);
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

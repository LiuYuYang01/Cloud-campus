import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../store/store";
import { translate } from "../../../utils/translate";
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
    ],
    content: ""
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
      case val === "你会什么？":
        value = `我会很多技能哦，你可以按照以下序号指令我：

[1] 讲个笑话
[2] 失恋了求安慰
[3] 帮我翻译
[4] 历史上的今天
我还会继续学习新技能的~~`;
        break;


      // 讲个笑话
      case val === "1":
        const res = await wx.p.request({
          method: "GET",
          url: "https://v.api.aa1.cn/api/api-wenan-gaoxiao/index.php?aa1=json",
        });

        if (res.statusCode !== 200) return (value = res.errMsg);

        value = res.data[0].gaoxiao;
        break;


      // 安慰
      case val === "2":
        const res1 = await wx.p.request({
          method: "GET",
          url: "https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json",
        });

        if (res1.statusCode !== 200) return (value = res1.errMsg);

        value = res1.data.anwei;
        break;


      case val === "3":
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
      case val === "4":
        let res2 = await wx.p.request({
          method: "GET",
          url: "https://zj.v.api.aa1.cn/api/bk/?num=5&type=json",
        });

        if (res2.statusCode !== 200) return (value = res2.errMsg);

        value =
          "历史上的今天：" +
          res2.data.day +
          "\n" +
          res2.data.content
            .map((item, index) => {
              // 给每一项加上一个序号
              return index + 1 + "：" + item;
            })
            .join("\n"); //最后换行转换为字符串
        break;

      default:
        value = "让我想想说什么";
    }

    // 回复消息
    this.__reply(value);

    this.setData({
        content:""
    })
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

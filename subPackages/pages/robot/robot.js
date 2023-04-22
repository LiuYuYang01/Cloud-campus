import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../store/store";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialog: [
      {
        role: "XZ",
        avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
        info:
          "我是一名AI助手，可以帮助您处理各种日常任务，提供多语言对话服务，也可以进行简单的问答和聊天。希望我的服务可以为您提供便利和帮助，让您的生活更加便捷和舒适!",
      },
    ],
    content: "",
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
    this.data.dialog.push({
      role: "XZ",
      avatar: "http://img.liuyuyang.net/zhxy/XZ.png",
      info: value,
    });

    this.setData({
      dialog: this.data.dialog,
    });
  },
  // 发布消息
  async release() {
    const val = this.data.content;

    let value = "";

    this.data.dialog.push({
      role: "USER",
      avatar: this.data.userInfo.avatar,
      info: val,
    });

    this.setData({
      dialog: this.data.dialog,
    });

    // wx.showLoading({
    //   title: "请稍后...",
    // });

    // await new Promise((resolve, reject) => {
    //   this.setData({
    //     content: "",
    //   });

    //   return wx.request({
    //     method: "POST",
    //     url: `https://eolink.o.apispace.com/chatgpt-turbo/create`,
    //     header: {
    //       "X-APISpace-Token": "gh4pxcmf0181tfb0pivhuqnofuvwen80",
    //       "Authorization-Type": "apikey",
    //       "Content-Type": "",
    //     },
    //     data: {
    //       system: "你是一个小助手",
    //       message: [`user:${val}`],
    //       temperature: "0.9",
    //     },
    //     success: ({ data }) => {
    //       value = data.result;
    //       resolve(value);
    //     },
    //   });
    // });

    // 回复消息
    // this.__reply(value.trim());

    if (val === "用python写一段冒泡排序算法") {
      setTimeout(() => {
        wx.showLoading({
          title: "请稍后...",
        });
      }, 500);

      setTimeout(() => {
        wx.hideLoading();
        this.__reply(`def bubble_sort(arr):
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr
    `);

        this.setData({
          content: "",
        });
      }, 1000);
    } else if (val === "写一篇关于计算机的论文，要求100~300字左右") {
      setTimeout(() => {
        wx.showLoading({
          title: "请稍后...",
        });
      }, 1000);

      setTimeout(() => {
        wx.hideLoading();
        this
          .__reply(`计算机是一种现代化的科技设备，它在现代社会中扮演着至关重要的角色。通过计算机，人们可以轻松地进行各种数据处理、通信和娱乐活动。随着计算机科技的不断发展，计算机已经成为了人们工作和生活中不可或缺的一部分。

            计算机的发展历史可以追溯到二十世纪，当时计算机还非常庞大和昂贵。但是，随着技术的不断进步，计算机变得越来越小、更加便携，同时也越来越智能化。现在，我们可以随身携带一台计算机，它可以完成各种任务，包括浏览互联网、处理电子邮件、管理文件和媒体等。
            
            除了个人计算机，计算机还可以应用于各种领域，包括医疗保健、金融、教育和制造业等。计算机可以帮助医生诊断疾病、提供更好的医疗服务；在金融领域，计算机可以帮助投资者更好地管理他们的投资组合，同时也可以提供更安全的在线支付服务。
            
            总之，计算机是一个不可或缺的工具，它已经成为现代社会的核心基础设施之一。随着技术的不断发展，计算机将继续发挥更加重要的作用，推动社会的发展和进步。`);

        this.setData({
          content: "",
        });
      }, 2000);
    } else if (val === "在帮我写一篇") {
      setTimeout(() => {
        wx.showLoading({
          title: "请稍后...",
        });
      }, 1000);

      setTimeout(() => {
        wx.hideLoading();
        this.__reply(`好的，下面重新帮你生成了一篇论文：
            计算机是现代科技发展的重要产物，它已经深入到我们生活的方方面面。计算机不仅可以用于娱乐，还可以用于商业、工业、医疗和教育等领域。随着计算机技术的不断进步和发展，它的应用范围也越来越广泛。

            计算机技术的发展给我们带来了很多便利，例如，我们可以通过计算机进行在线购物、在线支付、在线学习等。此外，计算机还可以用于自动控制、自动化生产、智能化管理等领域，提高了生产效率和质量。
            
            但是，计算机也存在一些问题。例如，计算机病毒和黑客攻击可能会导致计算机系统崩溃或信息泄露。此外，过度依赖计算机可能会导致人们失去自主性和创造性。
            
            因此，我们需要认真思考如何更好地利用计算机技术，同时避免计算机可能存在的问题。我们应该不断推动计算机技术的发展和创新，同时加强计算机安全和保护个人隐私。只有这样，我们才能更好地利用计算机技术，为人类社会的发展做出更大的贡献`);

        this.setData({
          content: "",
        });
      }, 2000);
    } else if (val === "帮我注释下每行的意思") {
      setTimeout(() => {
        wx.showLoading({
          title: "请稍后...",
        });
      }, 1000);

      setTimeout(() => {
        wx.hideLoading();
        this.__reply(`# 定义冒泡排序函数，参数为列表 arr
        def bubble_sort(arr): 

        # 获取列表 arr 的长度，即元素个数
        n = len(arr)

        # 遍历所有数组元素
        for i in range(n): 

            # 遍历未排序的数组元素
            for j in range(0, n-i-1):
                # 如果当前元素大于下一个元素
                if arr[j] > arr[j+1]: 
                    # 交换当前元素和下一个元素的位置
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        # 返回排序后的列表 arr
        return arr 
    `);

        this.setData({
          content: "",
        });
      }, 2000);
    }

    // wx.hideLoading();
  },
  // 内容复制
  viewCopyTextClick(e) {
    // 使用复制文本API
    wx.setClipboardData({
      data: e.currentTarget.dataset.info,
      title: "消息已复制",
    });
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

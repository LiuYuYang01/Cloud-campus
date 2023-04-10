// subPackages/pages/laboratory/laboratory.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        icon: "/assets/svg/rengongzhinong.svg",
        title: "AI人工智能",
        info: "AI人工智能机器人能够模拟人类的语言行为，与用户进行自然的交互",
        page: "/subPackages/pages/robot/robot",
      },
      {
        icon: "/assets/svg/image.svg",
        title: "图片文本识别",
        info:
          "高精度的图片文字检测和识别，可识别中、英、日、韩、法、德多种语言",
        page: "/subPackages/pages/text/text",
      },
      {
        icon: "/assets/svg/xie.svg",
        title: "手写字识别",
        info:
          "对学生日常作业及考试试卷中的手写内容进行自动识别，实现学生作业、考卷的线上批阅及教学数据的自动分析，提升教职人员工作效率，促进教学管理的数字化和智能化",
      },
      {
        icon: "/assets/svg/huahua.svg",
        title: "AI作画",
        info:
          "通过对所需要图像的文字描述生成图像，可生成艺术作品、工业设计、游戏动漫、文章插画、头像、壁纸等不同种类图像",
      },
      {
        icon: "/assets/svg/manhua.svg",
        title: "图片转漫画",
        info: "将你的照片一键转换成漫画风格",
      }
    ],
  },

  // 页面跳转
  goPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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

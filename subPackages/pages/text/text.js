// subPackages/pages/text/text.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    content: "",
    contentList: [],
  },

  afterRead(event) {
    wx.showLoading({
      title: "上传中",
    });

    this.setData({
      contentList: [{ word: "文本正在识别中，请稍后..." }],
    });

    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: "https://api.tockey.cn/api/upload",
      filePath: file.url,
      name: "file",
      formData: {
        file,
        type: "other",
      },
      success: (res) => {
        // 拿到刚刚上传的图片url
        const data = JSON.parse(res.data);

        if (data.code !== 200)
          return wx.showToast({
            title: "上传失败",
            icon: "error",
            duration: 1500,
          });

        wx.hideLoading();
        wx.showToast({
          title: "上传成功",
          icon: "success",
          duration: 1500,
        });

        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;

        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });

        // 图片转文本核心代码
        wx.request({
          method: "POST",
          url: "https://eolink.o.apispace.com/ocrbase/ocr/v1/base",
          header: {
            "X-APISpace-Token": "gh4pxcmf0181tfb0pivhuqnofuvwen80",
            "Authorization-Type": "apikey",
            "Content-Type": "application/json",
          },
          data: { url: data.data.url },
          success: ({ data }) => {
            let content = "";
            data.words_result.forEach((item) => {
              content += item.word;
            });

            this.setData({
              content,
              contentList: data.words_result,
            });
          },
        });
      },
    });
  },

  duplicate() {
    wx.setClipboardData({
      data: this.data.content,
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

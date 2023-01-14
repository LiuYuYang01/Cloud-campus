import Dialog from "@vant/weapp/dialog/dialog";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Tab: 0,
    swiperList: [
      {
        title: "加入校园跑腿 开启你的第二份收入",
        image: "http://img.liuyuyang.net/zhxy/pt2.jpg",
        cid: "1",
      },
    ],
  },

  Tab(e) {
    console.log(e.detail);
  },

  // 接单
  meet() {
    Dialog.confirm({
      message: "你确定要接单吗？",
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },

  // 送达
  service() {
    Dialog.confirm({
      message: "你确定送达了吗？",
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
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

import Dialog from "@vant/weapp/dialog/dialog";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    reportList: [
      {
        active: 0,
        title: "校园匿名信",
        svg: "/assets/svg/xuexiao.svg",
        info: "说你想说的，没有人会知道是你。我们会认真核实每一个信息并解决",
      },
      {
        active: 1,
        title: "跑腿订单投诉",
        svg: "/assets/svg/paotui.svg",
        info: "跑腿中的任何订单问题都可以在这里进行维权",
      },
      {
        active: 2,
        title: "校园兼职投诉",
        svg: "/assets/svg/jianzhi.svg",
        info: "任何校园兼职问题都可以在这里进行维权",
      },
      {
        active: 3,
        title: "其他投诉",
        svg: "/assets/svg/qita.svg",
        info: "任何问题都可以在这里进行维权",
      },
    ],
  },

  // 长按删除
  del(e) {
    Dialog.confirm({
      message: "你确定要删除吗？",
    })
      .then(async () => {
        const id = e.currentTarget.dataset.id;

        const {
          data: { code, message },
        } = await wx.$http.delete(`/api/maintain/${id}`);

        if (code !== 200) {
          return wx.showToast({
            title: message,
            icon: "success",
            duration: 2000,
          });
        }

        wx.showToast({
          title: "删除成功",
          icon: "success",
          duration: 2000,
        });

        this.getMyInfoList();
      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ index }) {
    this.setData({
      active: Number(index),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

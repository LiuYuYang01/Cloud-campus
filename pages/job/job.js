import Notify from "@vant/weapp/notify/notify";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    jobList: [],
    myJobList: [],
    title: "",
    describe: "",
    phone: "",
    price: "",
    tag: "",
  },

  // tab切换
  tabChange(e) {
    this.setData({ active: e.detail.index });
  },

  // 发布兼职
  sendJob() {
    let { title, describe, phone, price, tag } = this.data;
    wx.$http
      .post("/api/job", {
        title,
        describe,
        phone,
        price,
        tag,
        uid: wx.$store.userInfo.id,
      })
      .then(({ data: { code, message } }) => {
        if (code !== 200) return Notify({ type: "danger", message });

        Notify({ type: "success", message: "恭喜老板发布兼职成功" });

        // 重新渲染数据
        this.getJobList();
        this.getMyJobList();

        this.setData({
          active: 0,
          title: "",
          describe: "",
          phone: "",
          price: "",
          tag: "",
        });
      });
  },

  // 删除兼职
  delJob(e) {
    const id = e.currentTarget.dataset.id;
    wx.$http.delete(`/api/job/${id}`).then(({ data: { code, message } }) => {
      if (code !== 200) return Notify({ type: "danger", message });

      Notify({ type: "success", message: "删除兼职成功！" });

      // 重新渲染数据
      this.getJobList();
      this.getMyJobList();
    });
  },

  // 获取兼职列表
  getJobList() {
    wx.$http.get("/api/job/list").then((res) => {
      let {
        data: { code, data, message },
      } = res;
      if (code != 200)
        return console.error("在获取兼职列表过程中发生错误:", message);
      this.setData({ jobList: data });
    });
  },

  // 获取我发布的兼职
  getMyJobList() {
    wx.$http.get(`/api/job/my/${wx.$store.userInfo.id}`).then((res) => {
      let {
        data: { code, data, message },
      } = res;
      if (code != 200) return console.error(message);
      this.setData({ myJobList: data });
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
  onShow() {
    this.getJobList();
    this.getMyJobList();
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

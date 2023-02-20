// pages/job/job.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    jobList:[],
    myJobList:[],
    // jobForm:{
        title:'',
        describe:'',
        phone:'',
        price:'',
        tag:''
    // }
  },

    //   发布兼职
    sendJob(){
        let {title,describe,phone,price,tag} = this.data;
        wx.$http.post('/api/job',{title,describe,phone,price,tag,uid:wx.$store.userInfo.id})
    },

  onChange(e) {
    console.log(e);
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
      wx.$http.get('/api/job/list').then(res => {
        //   console.log(res);
        let {data:{code,data,message}} = res;
        if (code != 200) return console.error("在获取兼职列表过程中发生错误:",message);
        this.setData({jobList:data});
      });

    // 我发布的兼职
    wx.$http.get(`/api/job/my/${wx.$store.userInfo.id}`).then(res => {
        //   console.log(res);
        let {data:{code,data,message}} = res;
        if (code != 200) return console.error(message);
        this.setData({myJobList:data});
      });
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

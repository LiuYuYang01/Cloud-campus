// subPackages/my/pages/wallet/wallet.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTopUp: false
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        Dialog.confirm({
            title: '账号充值',
            message: '即将创建订单，确定后请长按二维码识别付款充值。您有 2 分钟的时间来付款，超时将会自动过期该订单,期间不能再次创建充值订单',
          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
            });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
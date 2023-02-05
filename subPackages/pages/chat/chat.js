// subPackages/pages/chat/chat.js
import Toast from '@vant/weapp/toast/toast';
Page({

    data: {
        chatObj: {}, // 聊天对象（指人）
    },


    onLoad(options) {
        let { uid } = options;
        wx.$http.get(`/api/user/${uid}`)
        .then(res => {
            let {code,message,data} = res.data;
            if(code == 400) return Toast.fail(message);
            this.setData({chatObj: data[0]})
        })
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
// subPackages/pages/onlineUser/onlineUser.js
import Toast from '@vant/weapp/toast/toast';
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import store from '../../../store/store';
Page({
    // 如果小程序基础库版本在 2.9.2 以上，可以直接像 Component 那样引入 behaviors
    behaviors: [storeBindingsBehavior],
    data: {

    },
    storeBindings: {
        store,
        fields: {
            // 本地字段 指向 store 中的字段
            onlineUserList: 'onlineUserList',
            unreadList:'unreadList',
            my:'userInfo'
        }
    },
    // 跳转到聊天页
    goToChat(e){
        // console.log(e.currentTarget.dataset.uid);
        if(e.currentTarget.dataset.uid == this.data.my.id) return Toast.fail('你不能和自己聊天');
        wx.navigateTo({
          url: `../chat/chat?uid=${e.currentTarget.dataset.uid}`,
        })
    },
    onLoad(options) {
        // console.log(this.data.onlineUserList);
    },

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
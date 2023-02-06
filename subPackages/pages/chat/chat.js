// subPackages/pages/chat/chat.js
import Toast from '@vant/weapp/toast/toast';
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import store from '../../../store/store';
Page({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            msgList: 'msgList',
            my:'userInfo',
            onlineUserList:'onlineUserList'
        }
    },
    data: {
        chatObj: {}, // 聊天对象（指人）
        msg: '', // 输入的信息
    },
    // 发送消息
    toUserSendMsg(e) {
        // console.log(this.data.msg);
        if(!this.data.msg.length) return Toast('请输入内容再发送');
        // 判断对方是否离线
        let isOffline = this.data.onlineUserList.find(item => item.id == this.data.chatObj.id);
        if(!isOffline) return Toast.feil('对方已离线!')

        wx.$socket.emit('sendMsg', {
            sid: this.data.chatObj.socket_id, // 接收者的 socketID
            sender_id: wx.$store.userInfo.id, // 发送者的用户ID
            receiver_id: this.data.chatObj.id, // 接收者的用户ID
            message: this.data.msg, // 消息
        });
        // 清空输入框
        this.setData({ msg: '' });
    },

    async onLoad(options) {
        let { uid } = options;
        let res1 = await wx.$http.get(`/api/user/${uid}`)
        let { code, message, data } = res1.data;
        if (code == 400) return Toast.fail(message);
        this.setData({ chatObj: data[0] });

        // 客户端进入聊天页时主动获取历史聊天数据
        let res2 = await wx.$http.post('/api/chatlist', {
            sender_id: wx.$store.userInfo.id, // 发送者的用户ID
            receiver_id: this.data.chatObj.id, // 接收者的用户ID
        });
        // console.log(res2.data.chatList);
        wx.$store.updMsgList('more',res2.data.chatList)
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
        // console.log(1);
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
        console.log('清空数据');
        wx.$store.updMsgList('clear')
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
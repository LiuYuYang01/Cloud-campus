// subPackages/my/pages/withdraw/withdraw.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import store from '../../../../store/store';
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            userInfo: "userInfo",
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        withdrawVal: '',
        balance: Number,
        phone: '',
        wx_name: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserBalance()
        this.setData({
            phone: wx.$store.userInfo.certified.phone
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    // 获取余额函数
    async getUserBalance() {
        let { data } = await wx.$http.get(`/api/pay/balance/${wx.$store.userInfo.id}`);
        this.setData({
            balance: data.balance.money
        })
    },
    // 提现按钮事件
    async withdrawCommit() {
        // console.log(isNaN(this.data.withdrawVal),this.data.withdrawVal);
        if (isNaN(this.data.withdrawVal) || !this.data.withdrawVal) return Toast.fail('请输入要提现的金额');
        if (!this.data.phone) return Toast.fail('请输入手机号');
        if (!this.data.wx_name) return Toast.fail('请输入微信名称');
        // 确认手机号
        Dialog.confirm({
            title: '确认信息',
            message: `我们将通过此手机号:${this.data.phone} 向你转账, 请检查有无错误并且确定已打开微信的"允许通过手机号向我转账"的功能!`,
        }).then(() => {
            // on confirm
            // console.log(666);
            this.commitApplication()
        }).catch(() => {
            // on cancel
            // console.log(111);
        });


    },
    // 提交申请请求函数
    commitApplication() {
        (async () => {
            let res = await wx.$http.post(`/api/withdrawal/application`, {
                uid: wx.$store.userInfo.id,
                withdrawal_money: this.data.withdrawVal,
                phone: this.data.phone,
                wx_name: this.data.wx_name
            })
            if(res.data.code == 200) {
                Toast.success(res.data.message);
                setTimeout(() => {
                    wx.navigateBack()
                }, 1000);
            } else {
                Toast.fail(res.data.message);
            }
        })()
    }

})
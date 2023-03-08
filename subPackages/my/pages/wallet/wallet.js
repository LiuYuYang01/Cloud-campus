// subPackages/my/pages/wallet/wallet.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../../store/store";
import { $http } from "@escook/request-miniprogram";
import Dialog from "@vant/weapp/dialog/dialog";
import Toast from "@vant/weapp/toast/toast";
import { formatTime } from "../../../../utils/util";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        balance: {
            money: 0,
        },
        order_list: [], // 充值订单列表
        withdrawal_list: [],
    },
    // methods
    //   跳转提现页
    goTothisWithdrawVal() {
        wx.navigateTo({
            url: '../withdraw/withdraw',
        })
    },
    // 打开提示框
    openTopUpDialog(e) {
        Dialog.confirm({
            title: "账号充值",
            message:
                "即将创建订单，确认后请随便转发或收藏二维码图片识别付款。您有 2 分钟的时间来付款，超时将会自动过期该订单,期间不能再次创建充值订单",
        })
            .then(() => {
                // 确定
                // console.log(e.target.dataset,  store.userInfo.username);
                $http
                    .post("/api/pay/create", {
                        price: e.target.dataset.stage,
                        username: store.userInfo.username,
                    })
                    .then((res) => {
                        // console.log(res.data);
                        let { code } = res.data;
                        if (code == 400) {
                            Toast(res.data.message);
                        } else if (code == 200) {
                            // console.log(res.data.order);
                            // 跳转页面
                            wx.navigateTo({
                                url: `/subPackages/my/pages/orderDetails/orderDetails?order_id=${res.data.order.order_id}`,
                            });
                        }
                    });
            })
            .catch(() => {
                // 取消
            });
    },
    // 订单列表项跳转订单详情页
    goToOrderDetail(e) {
        let { oid } = e.currentTarget.dataset;
        // let { oid } = e.target.dataset;
        wx.navigateTo({
            url: `/subPackages/my/pages/orderDetails/orderDetails?order_id=${oid}`,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.storeBindings = createStoreBindings(this, { store });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() { },

    onShow() {
        // 获取余额
        $http.get(`/api/pay/balance/${store.userInfo.id}`).then((res) => {
            // console.log(res.data);
            let { code, message, balance } = res.data;
            if (code == 400) return Toast(message);
            this.setData({ balance: balance });
        });
        // 获取订单列表
        $http.get(`/api/pay/orders/${store.userInfo.username}`).then((res) => {
            let { code, message, orderList } = res.data;
            if (code == 400) return Toast(message);
            orderList.forEach((el) => {
                if (el.date.length) {
                    el.date = formatTime(new Date(el.date));
                    el.date = el.date.slice(0, el.date.length - 3);
                }
            });
            this.setData({
                order_list: orderList,
            });
        });
        // 获取提现申请列表
        $http.get(`/api/withdrawal/user/list/${store.userInfo.id}`).then(res => {
            // console.log(res.data)
            res.data.data.forEach((el) => {
                if (el.application_time.length) {
                    el.application_time = formatTime(new Date(el.application_time));
                    el.application_time = el.application_time.slice(0, el.application_time.length - 3);
                }
            });
            this.setData({
                withdrawal_list: res.data.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() { },
});

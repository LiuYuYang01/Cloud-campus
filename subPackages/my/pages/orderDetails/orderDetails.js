// subPackages/my/pages/orderDetails/orderDetails.js
import { $http } from "@escook/request-miniprogram";
import Toast from '@vant/weapp/toast/toast';
import drawQrcode from '../../../../assets/js/weapp.qrcode.min';
import { formatTime } from '../../../../utils/util';
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import store from '../../../../store/store';
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
        // 订单对象
        order: {
            date: "", // 订单创建时间
            expiration_time: "", // 过期时间
            order_id: "", // 订单号
            pay_time: null, // 支付时间
            payee_code: "123666", // 字符串转二维码
            price: Number, // 充值档位
            really_price: Number, // 实际支付金额
            remarks: "", // 备注
            state: Number, // 订单状态(已过期：0；待支付：1；已完成：2)
            username: "", // 用户名
        },
        expiration_time: '', // 剩余时间(毫秒)
        qrcode_base64: '', // 二维码 base64 数据
        times: null, // 用来存储定时器
    },

    // 生成二维码
    createQRcode() {
        const query = wx.createSelectorQuery()
        query.select('#myQrcode')
            .fields({ node: true, size: true })
            .exec((res) => {
                // 获取 node 节点
                var canvas = res[0].node
                // 调用方法 drawQrcode 生成二维码
                drawQrcode({
                    canvas: canvas,
                    canvasId: 'myQrcode',
                    padding: 10,
                    background: '#ffffff',
                    foreground: '#4fb985',
                    text: this.data.order.payee_code,
                });

                // 获取 base64 格式数据赋到本地变量
                this.setData({
                    qrcode_base64: canvas.toDataURL()
                });
            })
    },

    // 倒计时结束
    timeEnd() {
        console.log('倒计时结束');
        this.getOrderInfo(this.data.order.order_id);
    },
    // 获取订单信息
    getOrderInfo(oid) {
        wx.request({
            url: `http://127.0.0.1:7001/api/pay/order/${oid}`,
            success: res => {
                let { code, message, order } = res.data;
                // 订单状态不是待支付状态
                if (order.state != 1) {
                    if (code == 400) return Toast(message);
                    // console.log(this.setData);
                    this.setData({ order: order });
                    // 删除socket监听
                    wx.$socket.removeAllListeners("payOutcome");
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 根据订单号获取订单数据
        $http.get(`/api/pay/order/${options.order_id}`)
            .then(res => {
                let { code, message, order } = res.data;

                if (code == 400) {
                    Toast(message);
                } else {
                    for (const key in order) {
                        if (key == 'date' || key == 'expiration_time' || key == 'pay_time') {
                            order[key] = formatTime(new Date(order[key]))
                            // order[key] = order[key].slice(0, order[key].length - 3)
                        }
                    }
                    this.setData({ order: order });
                };
                // 如果订单为待支付状态
                if (order.state == 1) {
                    // 生成过期倒计时毫秒
                    this.setData({ expiration_time: +new Date(order.expiration_time) - +new Date() });
                    // 生成二维码
                    this.createQRcode();
                    // 定时拉取订单状态
                    // this.pullOrderState();
                    // 监听socket支付结果
                    wx.$socket.on('payOutcome', res => {
                        console.log(res, '支付完成');
                        this.getOrderInfo(this.data.order.order_id);
                    })
                };
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
        clearInterval(this.data.times)
        // 删除socket监听
        wx.$socket.removeAllListeners("payOutcome");
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
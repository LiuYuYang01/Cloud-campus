import { $http } from "@escook/request-miniprogram";
import Toast from '@vant/weapp/toast/toast';
import drawQrcode from '../../../../assets/js/weapp.qrcode.min';

// subPackages/my/pages/orderDetails/orderDetails.js
Page({

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
                console.log(res);
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
    // 定时拉取订单状态
    pullOrderState() {
        let vm = this; // 解决定时器里的 this 指向
        console.log('开始拉取', this.data.order.state == 1);
        // 如果订单为待支付状态则定时向服务器查询是否已支付订单
        if (this.data.order.state == 1) {
            vm.setData({
                times: setInterval(() => {
                    wx.request({
                        url: `https://api.tockey.cn/api/pay/order/${this.data.order.order_id}`,
                        success: res => {
                            let { code, message, order } = res.data;
                            // 订单状态不是待支付状态
                            if (order.state != 1) {
                                if (code == 400) return Toast(message);
                                // console.log(this.setData);
                                vm.setData({ order: order });
                                // 停止定时器
                                clearInterval(vm.data.times);
                            }
                        }
                    });
                }, 1000)
            })
        }
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
                    this.setData({ order: order });
                };
                // 如果订单为待支付状态
                if (order.state == 1) {
                    // 生成过期倒计时毫秒
                    this.setData({ expiration_time: +new Date(order.expiration_time) - +new Date() });
                    // 生成二维码
                    this.createQRcode();
                    // 定时拉取订单状态
                    this.pullOrderState();
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
import { $http } from "@escook/request-miniprogram"

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
            payee_code: "", // 字符串转二维码
            price: Number, // 充值档位
            really_price: Number, // 实际支付金额
            remarks: "", // 备注
            state: Number, // 订单状态(已过期：0；待支付：1；已完成：2)
            username: "", // 用户名
        },
        expiration_time: '', // 剩余时间(毫秒)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        // 根据订单号获取订单数据
        $http.get(`/api/pay/order/${options.order_id}`)
        .then(res => {
            let {code,message,order} = res.data;
            if (code == 400) return Toast(message);

            this.setData({
                order: order,
                expiration_time: +new Date(order.expiration_time) - +new Date()
            })
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
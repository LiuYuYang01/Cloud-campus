// 按需导入 $http 对象
import {
    $http
} from '@escook/request-miniprogram'

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
wx.$http = $http

// 配置请求根路径
// $http.baseUrl = 'http://localhost:3000'
$http.baseUrl = 'https://api.tockey.cn'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
    wx.showLoading({
        title: '数据加载中...',
    })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
    wx.hideLoading()
}

// 自定义请求
wx.$request = $http
wx.$request.baseUrl = ''

// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
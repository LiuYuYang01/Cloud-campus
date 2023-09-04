// 按需导入 $http 对象
import {
    $http
} from '@escook/request-miniprogram'
import { getToken } from '../utils/localStorage';

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
wx.$http = $http

// 配置请求根路径
// 本地环境
$http.baseUrl = 'http://127.0.0.1:7001'

// 线上环境
// $http.baseUrl = 'http://127.0.0.1:7001'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
    wx.showLoading({
        title: '数据加载中...',
    })
    if (getToken().length) {
        // 往请求头注入 token
        options.header = {
            ['Authorization']: getToken()
        }
    }
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
    wx.hideLoading()
}
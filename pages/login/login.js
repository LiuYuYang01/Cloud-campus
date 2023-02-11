import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/store";

import Notify from "@vant/weapp/notify/notify";
import {
    setToken,
    getToken,
    setUserInfo,
    getUserInfo,
} from "../../utils/localStorage";
import MCAP from '../../assets/js/mcaptcha';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        codeStr: '', //生成的验证码
        code: '', //输入的验证码
        showCodeBox: false, // 是否显示验证码box
    },
    // 更换验证码
    changeImg: function (e) {
        let query = wx.createSelectorQuery();
        let w, h;
        query.select('.code').boundingClientRect((result) => {
            // console.log(result,this)
            w = result.width//获取节点的宽度（单位px）
            h = result.height//获取节点的宽度（单位px）
            this.initDraw(w, h);
        }).exec()
    },
    // 生成验证码
    initDraw: function (w = 100, h = 40) {
        // console.log(w,h);
        var that = this;
        var codes = that.getRanNum();
        that.setData({
            codeStr: codes //生成的验证码
        })
        let mac = new MCAP({
            el: 'canvas',
            width: w,
            height: h,
            code: codes
        });
    },
    // 生成随机数
    getRanNum: function () {
        var chars = '0123456789';
        // var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var pwd = '';
        for (var i = 0; i < 4; i++) {
            if (Math.random() < 10) {
                pwd += chars.charAt(Math.random() * chars.length - 1);
            }
        }
        return pwd;
    },
    // 关闭CodeBox
    closeCodeBox(){
        this.setData({showCodeBox:false});
    },
    // codeBox 确定
    codeBoxConfirm(){
        let {code,codeStr} = this.data;
        console.log(code,codeStr);
        if(code == codeStr) {
            this.setData({showCodeBox:false});
            this.login();
        } else{
            Notify({
                type: "danger",
                message:'验证码错误',
                safeAreaInsetTop: true,
            });
            this.changeImg();
        }
    },
    // 登录前是否新用户
    async beforLogin() {
        const { username, password } = this.data;
        if(username && password) {
            let res1 = await wx.$http.get('/api/basiclist');
            let isNewUser = res1.data.data.find(el => el == username);
            if(isNewUser) return this.login();
            this.setData({showCodeBox:true});
            // 等待box显示完成再生成验证码
            setTimeout(()=> this.changeImg(),100);
        } else {
            Notify({
                type: "danger",
                message: '请输入账号或密码',
                safeAreaInsetTop: true,
            });
        }
    },
    // 账号
    userIpt(e) {
        this.setData({
            username: e.detail.value,
        });
    },
    // 密码
    passIpt(e) {
        this.setData({
            password: e.detail.value,
        });
    },
    // 用户登录
    async login() {
        const { username, password } = this.data;

        try {
            const {
                data: { code, message, userInfo, token },
            } = await wx.$http.post("/api/LoginOrRegister", {
                username,
                password,
            });

            // 发生错误
            if (code !== 200)
                return Notify({
                    type: "danger",
                    message,
                    safeAreaInsetTop: true,
                });

            this.updateUserInfo(userInfo);
            setTimeout(() => {
                setUserInfo(JSON.stringify(this.data.userInfo))
            });

            // 将Token本地存储
            setToken(token);

            Notify({
                type: "success",
                message: "恭喜你，登录成功！",
                safeAreaInsetTop: true,
            });

            // 登录成功后跳转到首页
            setTimeout(() => {
                wx.switchTab({
                    url: "/pages/home/home",
                });

                wx.$store.updateActive(0)
            }, 500);
        } catch (error) {
            console.log(error);
        }
    },
    // 游客
    visitor() {
        wx.switchTab({
            url: "/pages/home/home",
        });

        wx.$store.updateActive(0)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ["userInfo"],
            actions: ["updateUserInfo"],
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() { },
});

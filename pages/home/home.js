import Notify from "@vant/weapp/notify/notify";
import { getToken } from "../../utils/localStorage";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [], //轮播图列表
        homeToppingList: [], // 学校置顶文章
        homeList: [], //学校动态列表
        index: 0,
        isPraise: "#888",
        isCollect: "#888",
        pageX: 0,
        startPoint: 0,
        // 入口导航
        entranceNavList: [
            {
                title: "闲置二手",
                icon: "coupon",
                url: "",
                color: "#24cd62",
            },
            {
                title: "勤工俭学",
                icon: "gold-coin",
                url: "",
                color: "#fbb437",
            },
            {
                title: "校园外卖",
                icon: "send-gift",
                url: "/subPackages/home/pages/package/package",
                color: "#fbd221",
            },
            {
                title: "校园跑腿",
                icon: "map-marked",
                url: "/subPackages/pages/errand/home/home",
                color: "#5a82fd",
            },
            {
                title: "失物招领",
                icon: "gift-card",
                url: "",
                color: "#6d6be4",
            },
            {
                title: "朋友圈",
                icon: "friends",
                url: "",
                color: "#6ebcfb",
            },
            {
                title: "表白墙",
                icon: "like",
                url: "/pages/love/love",
                color: "#fa6667",
            },
            {
                title: "诉说墙",
                icon: "comment",
                url: "",
                color: "#6d6be4",
            },
        ],
    },
    // 顶部滚动导航
    navTap(e) {
        this.setData({
            index: e.target.dataset.index,
        });
    },
    // 获取轮播图数据
    async __getSwiperList() {
        // 获取轮播图
        const { data: res } = await wx.$http.get("/api/home/swiper");

        // 请求失败提示
        if (res.code !== 200)
            Notify({
                type: "danger",
                message: res.message,
            });

        this.setData({
            swiperList: res.data,
        });
    },
    // 左侧滑动菜单
    touchStart(e) {
        this.setData({
            startPoint: e.touches[0],
        });
    },
    touchMove(e) {
        let startPoint = this.data.startPoint.clientX;

        if (startPoint - e.touches[e.touches.length - 1].clientX < -100) {
            let n = e.changedTouches[0].clientX;

            this.setData({
                pageX: n,
            });
        } else {
            this.setData({
                pageX: 0,
            });
        }
    },
    // 跳转到我的页面
    goMy() {
        wx.switchTab({
            url: "/pages/my/my",
        });
    },
    // 获取学校动态置顶文章
    async __getHomeToppingList() {
        const { data: res } = await wx.$http.get("/api/article/topping", {
            type: "home",
        });

        this.setData({
            homeToppingList: res.data || [],
        });
    },
    // 获取学校动态文章
    async __getHomeList() {
        const { data: res } = await wx.$http.get("/api/home/article");

        // 请求失败提示
        if (res.code !== 200)
            Notify({
                type: "danger",
                message: res.message,
            });

        this.setData({
            homeList: res.data,
        });
    },
    // 跳转到机器人
    goRobot() {
        wx.navigateTo({
            url: "/subPackages/pages/robot/robot",
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.__getSwiperList();
        this.__getHomeToppingList();
        this.__getHomeList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 判断有没有Token，没有就代表未登录，跳转到登录页
        if (getToken()) {
            console.log("已登录");
        } else {
            console.log("未登录");
            wx.navigateTo({
                url: "/pages/login/login",
            });
        }
    },

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

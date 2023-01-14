// components/popup/popup.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        top: {
            type: String,
            value: 1280
        },
        sty: String,
        info:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 入口导航
        entranceNavList: [{
                title: "发布文章",
                icon: "coupon",
                url: "/pages/release/release",
                color: "#4fb985"
            },
            {
                title: "发朋友圈",
                icon: "gold-coin",
                url: "",
                color: "#6ebcfb"
            },
            {
                title: "去表白",
                icon: "like",
                url: "/pages/love/love",
                color: "#fa6667"
            },
            {
                title: "去自习",
                icon: "send-gift",
                url: "",
                color: "#ffd818"
            },
            {
                title: "跑腿接单",
                icon: "map-marked",
                url: "/subPackages/home/pages/errand/errand",
                color: "#f3604f"
            },
            {
                title: "兼职接单",
                icon: "gold-coin",
                url: "",
                color: "#fbb437"
            },
            {
                title: "代取包裹",
                icon: "send-gift",
                url: "",
                color: "#4b84ff"
            },
            {
                title: "我要诉说",
                icon: "comment",
                url: "",
                color: "#6d6be4"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
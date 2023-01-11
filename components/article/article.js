Component({
    styleIsolation: 'shared',
    options: {
        styleIsolation: 'apply-shared'
    },

    /**
     * 组件的属性列表
     */
    properties: {
        list: Array,
        color: {
            type: String,
            value: "#49b984"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        data:[]
    },

    lifetimes: {
        created() {
            // this.data.list.filter(item=>item.date = formatTime(new Date("2022-12-28T16:00:00.000Z")))
            // console.log(this.data.list);
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 图片预览
        previewImg(e) {
            wx.previewImage({
                urls: e.currentTarget.dataset.url,
            })
        },
        // 判断是否点赞
        praiseTap() {
            if (this.data.isPraise === "#888") {
                this.setData({
                    isPraise: "#fa6e70"
                })
            } else {
                this.setData({
                    isPraise: "#888"
                })
            }
        },
        // 判断是否收藏
        collectTap() {
            if (this.data.isCollect === "#888") {
                this.setData({
                    isCollect: "#f7b53e"
                })
            } else {
                this.setData({
                    isCollect: "#888"
                })
            }
        },
    }
})
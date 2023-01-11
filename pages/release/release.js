// pages/release/release.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: "",
        // 入口导航
        circleList: [{
                title: "学生会",
                icon: "manager",
                url: "",
                color: "#6d6be4"
            },
            {
                title: "足球社",
                icon: "gem-o",
                url: "",
                color: "#fbb437"
            },
            {
                title: "篮球赛",
                icon: "fire",
                url: "",
                color: "#ed4439"
            },
            {
                title: "摄影社",
                icon: "photograph",
                url: "",
                color: "#78bbfa"
            },
            {
                title: "音乐社",
                icon: "music",
                url: "",
                color: "#4fb985"
            },
            {
                title: "动漫社",
                icon: "friends",
                url: "",
                color: "#fd6dbd"
            },
            {
                title: "计算机",
                icon: "cashier-o",
                url: "",
                color: "#fa6667"
            },
            {
                title: "全部社团",
                icon: "apps-o",
                url: "",
                color: "#797979"
            }
        ],
        pickerShow: 'none',
        columns: [],

        // 文章信息
        article: {
            title: "",
            cate: "",
            content: ""
        }
    },

    // 初始化编辑器
    async release() {
        // 拿到编辑器组件的实例
        const editor = this.selectComponent(".editor")
        // 调用组件的release方法将数据保存到content
        await editor.release()
        // 然后拿到组件中content的值（编辑器中的数据）
        setTimeout(() => {
            this.setData({
                content: editor.data.content
            })

            console.log('编辑器的内容：', this.data.content);
        })
    },

    // 获取选中的分类
    picker(event) {
        const {
            picker,
            value,
            index
        } = event.detail;

        this.setData({
            'article.cate': value
        })

        console.log(this.data.article.cate, 111);
        console.log(`当前值：${value}, 当前索引：${index}`);
    },

    // 打开分类选择器
    pickerShowClick() {
        this.setData({
            pickerShow: "block"
        })
    },
    // 关闭分类选择器
    pickerHideClick() {
        this.setData({
            pickerShow: "none"
        })

        this.setData({
            'article.cate': ""
        })
    },
    // 确认选择分类
    pickerClick() {
        this.setData({
            pickerShow: "none"
        })
    },

    // 图片上传
    afterRead(event) {
        const {
            file
        } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
            filePath: file.url,
            name: 'file',
            formData: {
                user: 'test'
            },
            success(res) {
                // 上传完成需要更新 fileList
                const {
                    fileList = []
                } = this.data;
                fileList.push({
                    ...file,
                    url: res.data
                });
                this.setData({
                    fileList
                });
            },
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            columns: this.data.circleList.map(item => item.title)
        })
        console.log(this.data.columns);
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
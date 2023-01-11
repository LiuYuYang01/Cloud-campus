// components/swiper/swiper.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: Array,
        dots: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 返回轮播图对应的文章id
        swiperTap(e) {
            console.log('轮播图对于的文章ID：', e.currentTarget.dataset.cid);
        },
    }
})
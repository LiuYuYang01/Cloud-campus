// components/report/report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    ready() {
        // 拿到小程序的上级所有页面
        const pages = getCurrentPages();
        
        // 然后找到最后一个，也就是刚刚跳转过来的页面
        const currentPage = pages[pages.length - 1];

        // 拿到他的跳转参数：option.title 来动态设置每个页面的名称
        wx.setNavigationBarTitle({
          title: currentPage.options.title,
        });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});

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
      console.log(this.properties.data, 222);
      console.log(this.properties, 333);
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});

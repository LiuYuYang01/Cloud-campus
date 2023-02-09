const tabBarBehaviors = require("../../../../behaviors/tabBar-behaviors");
Component({
  options: {
    multipleSolts: true,
  },
  behaviors: [tabBarBehaviors],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [
      {
        id: 1,
        name: "张同学", //用户名称
        avatar:
          "https://tupian.qqw21.com/article/UploadPic/2020-3/202032023341537416.jpg", //头像
        to: "北校区蜜雪冰城大杯珍珠奶茶", //取
        from: "南校区6号宿舍楼3楼317宿舍", //送
        remarks: "辛苦小哥哥了", //备注
        price: 1.5, //价格
        state: 1,
      },
      {
        id: 2,
        name: "王同学", //用户名称
        avatar:
          "https://img13.360buyimg.com/n1/jfs/t1/175752/21/32873/65472/63ab9f55Fe8882446/89719c83f4350f85.jpg", //头像
        to: "取包裹", //取
        from: "北校区6号宿舍楼1楼213宿舍", //送
        remarks: "到了放在教室门口谢谢", //备注
        price: 2.5, //价格
        state: 2,
      },
      {
        id: 3,
        name: "张同学", //用户名称
        avatar:
          "https://ts2.cn.mm.bing.net/th?id=OIP-C.2IVbETw6WTUS9jwv09H2-gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", //头像
        to: "打印资料", //取
        from: "帮忙打印2份复习资料", //送
        remarks: "", //备注
        price: 4.5, //价格
        state: 3,
      },
      {
        id: 4,
        name: "狸同学", //用户名称
        avatar:
          "https://tupian.qqw21.com/article/UploadPic/2021-5/20215291612831349.jpeg", //头像
        to: "南校区食堂黄焖鸡米饭", //取
        from: "1号宿舍楼，3楼，317宿舍", //送
        remarks: "放门口谢谢", //备注
        price: 4.5, //价格
        state: 4,
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});

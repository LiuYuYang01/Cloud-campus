import Dialog from "@vant/weapp/dialog/dialog";

const tabBarBehaviors = require("../../../../behaviors/tabBar-behaviors");
Component({
  options: {
    styleIsolation: "isolated",
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
    Tab: 1,
    // 轮播图数据
    swiperList: [
      {
        title: "加入校园跑腿 开启你的第二份收入",
        image: "http://img.liuyuyang.net/zhxy/pt.jpg",
        cid: "1",
      },
    ],
    // 抢单列表
    orderList: [],
    // 我的订单
    myOrderList: [
      {
        id: 1,
        name: "张同学", //用户名称
        avatar:
          "https://tupian.qqw21.com/article/UploadPic/2020-3/202032023341537416.jpg", //头像
        to: "北校区蜜雪冰城大杯珍珠奶茶", //取
        from: "南校区6号宿舍楼3楼317宿舍", //送
        remarks: "辛苦小哥哥了", //备注
        price: 1.5, //价格
        state: 2,
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
        state: 3,
      },
      {
        id: 3,
        name: "王同学", //用户名称
        avatar:
          "https://img13.360buyimg.com/n1/jfs/t1/175752/21/32873/65472/63ab9f55Fe8882446/89719c83f4350f85.jpg", //头像
        to: "取包裹", //取
        from: "北校区6号宿舍楼1楼213宿舍", //送
        remarks: "到了放在教室门口谢谢", //备注
        price: 2.5, //价格
        state: 4,
      },
    ],
    // 待取货订单
    laterOrderList: [
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
        state: 1,
      },
    ],
  },

  lifetimes: {
    created() {
      this.getOrderList();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取任务列表
    async getOrderList() {
      const {
        data: { code, data },
      } = await wx.$http.get("/api/tasklist");

      if (code !== 200) return;

      this.setData({
        orderList: data,
      });
    },

    // 接单
    meet() {
      Dialog.confirm({
        message: "你确定要接单吗？",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },

    // 送达
    service() {
      Dialog.confirm({
        message: "你确定送达了吗？",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },

    getTaskList(){
        this.getOrderList()
    }
  },
});

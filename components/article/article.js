Component({
  styleIsolation: "shared",
  options: {
    styleIsolation: "apply-shared",
  },

  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    color: {
      type: String,
      value: "#49b984",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: [],
  },

  lifetimes: {
    async ready() {
      let {
        data: { data },
      } = await wx.$http.get("/api/user");

      const list = this.data.list.filter((list_item) => {
        data.forEach((user_item) => {
          if (list_item.userID === user_item.id) {
            list_item.is_realname = user_item.is_realname;
            list_item.is_admin = user_item.is_admin;
          }
        });

        return list_item;
      });

      this.setData({
        list: list,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    go(e) {
      const { id, type } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/article/article?id=${id}&type=${type}`,
      });
    },
    // 图片预览
    previewImg(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.url,
      });
    },
    // 判断是否点赞
    praiseTap() {
      if (this.data.isPraise === "#888") {
        this.setData({
          isPraise: "#fa6e70",
        });
      } else {
        this.setData({
          isPraise: "#888",
        });
      }
    },
    // 判断是否收藏
    collectTap() {
      if (this.data.isCollect === "#888") {
        this.setData({
          isCollect: "#f7b53e",
        });
      } else {
        this.setData({
          isCollect: "#888",
        });
      }
    },
  },
});

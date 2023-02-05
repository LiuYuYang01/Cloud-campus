import Dialog from "@vant/weapp/dialog/dialog";
import Notify from "@vant/weapp/notify/notify";
import { getUserInfo } from "../../utils/localStorage";

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
    abc: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: [],
    articleList: [],
    user: {},
  },

  lifetimes: {
    async ready() {
      let {
        data: { data },
      } = await wx.$http.get("/api/user");

      // 判断用户是否是管理员或者是否实名认证
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
        articleList: this.data.list,
        // 拿到当前登录用户的id
        user: getUserInfo() && JSON.parse(getUserInfo()),
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
    // 删除文章
    delArticle(e) {
      const { id, type } = e.currentTarget.dataset;

      Dialog.confirm({
        context: this,
        title: "提醒",
        message: "你确定要删除该文章吗？",
      })
        .then(async () => {
          const {
            data: { code, message },
          } = await wx.$http.delete(`/api/${type}/article/${id}`);

          if (code !== 200)
            Notify({
              type: "danger",
              message,
            });

          // 获取文章列表
          (async () => {
            const {
              data: { code, data, message },
            } = await wx.$http.get(`/api/${type}/article`);

            if (code !== 200) return;

            this.setData({
              articleList: data,
            });
          })();

          Notify({ type: "success", message: "恭喜你删除文章成功" });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
  },
});

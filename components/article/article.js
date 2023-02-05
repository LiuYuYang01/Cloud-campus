import Dialog from "@vant/weapp/dialog/dialog";
import Notify from "@vant/weapp/notify/notify";
import { getUserInfo } from "../../utils/localStorage";
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import store from "../../store/store";

Component({
  behaviors: [storeBindingsBehavior],
  styleIsolation: "shared",
  options: {
    styleIsolation: "apply-shared",
  },
  storeBindings: {
    store,
    fields: { user: "userInfo" },
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
              context: this,
              type: "danger",
              message,
            });

          // 调用父组件中getList方法重新获取最新的数据
          this.triggerEvent("getList");

          Notify({ type: "success", message: "恭喜你删除文章成功" });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
  },
});

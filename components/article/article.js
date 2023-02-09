import Dialog from "@vant/weapp/dialog/dialog";
import Notify from "@vant/weapp/notify/notify";
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
    times:null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到个人主页
    goPerson(e) {
      const id = e.currentTarget.dataset.id;
      
      wx.navigateTo({
        url: `/subPackages/my/pages/person/person?id=${id}`,
      });
    },
    // 跳转到文章页
    goArticle(e) {
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

    // 点赞
    async praiseTap(e) {
                let {index,islike} = e.currentTarget.dataset;
                let {likes,id,type} = this.data.list[index];
                let newUserLikes, newArticleLikes;
                if (islike) { // 取消点赞
                    // 从文章数据移除uid
                    newArticleLikes = likes.filter(el => el != this.data.user.id)
                    // 从用户数据移除aid
                    newUserLikes = this.data.user.likes.filter(el => el != id);
                } else { // 点赞
                    // 将UID存到文章数据
                    newArticleLikes = likes;
                    newArticleLikes.push(this.data.user.id);
                    // 将aid存到用户数据
                    newUserLikes = this.data.user.likes;
                    newUserLikes.push(id);
                };
                // console.log(newUserLikes, newArticleLikes);
                await wx.$http.post(`/api/user/info/${this.data.user.id}`,{likes:newUserLikes});
                await wx.$http.post(`/api/${type}/article/${id}`,{likes:newArticleLikes});
                this.triggerEvent("getList"); // 更新文章数据
                // 更新用户数据
                let newUserInfo = await wx.$http.get(`/api/user/${this.data.user.id}`);
                wx.$store.updateUserInfo(newUserInfo.data.data[0]);
    },
    // 判断是否收藏
    async collectTap(e) {
        let {index,islike} = e.currentTarget.dataset;
        let {collections,id,type} = this.data.list[index];
        let newUserLikes, newArticleLikes;
        if (islike) { // 取消点赞
            // 从文章数据移除uid
            newArticleLikes = collections.filter(el => el != this.data.user.id)
            // 从用户数据移除aid
            newUserLikes = this.data.user.collections.filter(el => el != id);
        } else { // 点赞
            // 将UID存到文章数据
            newArticleLikes = collections;
            newArticleLikes.push(this.data.user.id);
            // 将aid存到用户数据
            newUserLikes = this.data.user.collections;
            newUserLikes.push(id);
        };
        // console.log(newUserLikes, newArticleLikes);
        await wx.$http.post(`/api/user/info/${this.data.user.id}`,{collections:newUserLikes});
        await wx.$http.post(`/api/${type}/article/${id}`,{collections:newArticleLikes});
        this.triggerEvent("getList"); // 更新文章数据
        // 更新用户数据
        let newUserInfo = await wx.$http.get(`/api/user/${this.data.user.id}`);
        wx.$store.updateUserInfo(newUserInfo.data.data[0]);
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

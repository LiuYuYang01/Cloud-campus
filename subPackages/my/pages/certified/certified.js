import { getUserInfo } from "../../../../utils/localStorage";
import Notify from "@vant/weapp/notify/notify";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../../../store/store";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,

    users: {
      name: "",
      phone: "",
      class: "",
      teacher: "",
      type: "",
    },

    is_realname: "",
  },
  upateName({ detail }) {
    this.setData({
      "users.name": detail,
    });
  },
  upatePhone({ detail }) {
    this.setData({
      "users.phone": detail,
    });
  },
  upateClass({ detail }) {
    this.setData({
      "users.class": detail,
    });
  },
  upateTeacher({ detail }) {
    this.setData({
      "users.teacher": detail,
    });
  },
  upateType({ detail }) {
    this.setData({
      "users.type": detail,
    });
  },

  // 提交资料
  async isOk() {
    const id = this.data.userInfo.id;

    const {
      data: { code, message },
    } = await wx.$http.post(`/api/certified/${id}`, this.data.users);

    if (code !== 200) return Notify({ type: "danger", message });

    Notify({ type: "success", message: "恭喜你已提交实名资料" });

    const {
      data: { data },
    } = await wx.$http.get(`/api/user/${id}`);
    this.updateUserInfo(data);

    this.setData({
      users: {
        name: "",
        phone: "",
        class: "",
        teacher: "",
        type: "",
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ["userInfo"],
      actions: ["updateUserInfo"],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
        // 解决一个小bug
        is_realname:this.data.userInfo.certified && this.data.userInfo.certified.name || this.data.userInfo[0].certified.name
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});

import Dialog from "@vant/weapp/dialog/dialog";
import Notify from "@vant/weapp/notify/notify";
import { getUserInfo, delToken } from "../../../../utils/localStorage";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    oldPwd: "",
    newPwd: "",
  },

  // 旧密码
  oldPassChange({ detail }) {
    this.setData({ oldPwd: detail });
  },

  // 新密码
  newPassChange({ detail }) {
    this.setData({ newPwd: detail });
  },

  // 确定修改
  isOk() {
    const id = (getUserInfo() && JSON.parse(getUserInfo()).id) || 0;

    Dialog.confirm({
      title: "提示",
      message: "你确定要修改密码吗？",
    })
      .then(async () => {
        const { oldPwd, newPwd } = this.data;

        const {
          data: { code, message },
        } = await wx.$http.post(`/api/user/pwd/${id}}`, {
          oldPwd,
          newPwd,
        });

        if (code !== 200) return Notify({ type: "danger", message });

        Notify({ type: "success", message: "恭喜你修改密码成功" });

        setTimeout(() => {
          // 修改密码成功后删除本地存储的Token
          delToken();

          // 然后跳转到登录页 重新登录
          wx.navigateTo({
            url: "/pages/login/login",
          });
        }, 1000);
      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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

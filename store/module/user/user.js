import { action } from "mobx-miniprogram";
import { setUserInfo, getUserInfo } from "../../../utils/localStorage";

// setUserInfo()
const userInfo = {
  name: "请登录",
  signature: "编辑你的个性签名！",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  sex:3,
  cover:"",
  mood:"",
  identity:""
};

export default {
  // 判断本地存储有没有该用户信息
  userInfo: (getUserInfo() && JSON.parse(getUserInfo())) || userInfo,

  updateUserInfo: action(function (data) {
    this.userInfo = data;
    setUserInfo(JSON.stringify(this.userInfo));
  }),
};

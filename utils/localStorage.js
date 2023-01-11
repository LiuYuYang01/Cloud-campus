// 封装一个本地存储方法

// 将Token本地存储
const TokenKey = "Token";
export function setToken(value) {
  return wx.setStorageSync(TokenKey, value);
}
export function getToken() {
  return wx.getStorageSync(TokenKey);
}

// 将用户信息本地存储
const userInfoKey = "userInfo";
export function setUserInfo(value) {
  if (!value) {
    const userInfo = {
      name: "请登录",
      signature: "编辑你的个性签名！",
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };

    return wx.setStorageSync(userInfoKey, JSON.stringify(userInfo));
  }

  return wx.setStorageSync(userInfoKey, value);
}
export function getUserInfo() {
  return wx.getStorageSync(userInfoKey);
}

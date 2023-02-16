import "./utils/http";
import "./utils/wxp";
import "./utils/socket";

import store from "./store/store";
wx.$store = store; // 挂载到全局实例

// 每次小程序启动获取最新的用户数据
if(wx.$store.userInfo.id) {
    wx.$http.get(`/api/user/${wx.$store.userInfo.id}`).then(res => {
        wx.$store.updateUserInfo(res.data.data[0]);
    });
}

// app.js
App({});

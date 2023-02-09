import "./utils/http";
import "./utils/wxp";
import "./utils/socket";

import store from "./store/store";
wx.$store = store; // 挂载到全局实例

// app.js
App({});
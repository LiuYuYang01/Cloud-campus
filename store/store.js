import common from "./module/common/common";
import user from "./module/user/user";

// 导入mobx实例：observable
import { observable, action } from "mobx-miniprogram";

// 导出mobx实例
export default observable({
  // 公共数据
  ...common,
  // 用户数据
  ...user,


    breakSocket: action(function(){
        console.log('正在断开 socket 的连接');
        wx.$socket.close();
    }),
    openSocket: action(function(){
        console.log('正在重新连接 socket');
        wx.$socket.connect();
    })
});

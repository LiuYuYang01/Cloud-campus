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



});

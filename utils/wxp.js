// 实现异步API 的Promise化
import { promisifyAll } from "miniprogram-api-promise";

const wxp = (wx.p = {});

promisifyAll(wx, wxp);

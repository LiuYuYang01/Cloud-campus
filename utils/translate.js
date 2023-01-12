const MD5 = require("md5");

const appid = "20230105001520033";
const key = "XOIg5pbwEtn3s310gjCt";
const salt = Math.floor(Math.random() * 100000000);

export async function translate(from, val, to) {
  let sign = MD5(appid + val + salt + key);

  let res = await wx.p.request({
    method: "GET",
    url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
    data: {
      from,
      q: val,
      to,
      appid,
      salt,
      sign,
    },
  });

  if (res.statusCode !== 200) return res.errMsg;

//   return `已将：${res.data.trans_result[0].src} 转换为目标语言：${res.data.trans_result[0].dst}`;
  return res.data.trans_result[0].dst;
}

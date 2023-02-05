import io from '../assets/js/weapp.socket.io';  // 引入 socket.io
// const socket = io('http://localhost:7001');
// const socket = io('http://192.168.0.111:7001');
const socket = io('https://api.tockey.cn');

socket.on('connect', function () {
    // console.log('连接成功', socket.id);

    // 接收公共消息
    socket.on('public', res => {
        console.log('公共消息', res);
    });
    // 接收服务器 socket 错误信息
    socket.on('err', res => {
        console.log(res);
    });
    // 监听在线用户
    wx.$socket.on('onlineUser', res => {
        console.log(res, 123);
    })
    // 更新用户在线状态
    wx.$socket.emit('updUserOnlineState', {
        username: wx.$store.userInfo.username, // 账号
        name: wx.$store.userInfo.name, // 姓名
        uid: wx.$store.userInfo.id,
        sid: wx.$socket.id
    })
});

wx.$socket = socket; // 挂载到全局实例
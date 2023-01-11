// 字符串转换为数组
const StrTurnArray = function (data) {
    data.map(item => {
        item.cover = JSON.parse(item.cover)

        return item
    })
}

// 时间转换
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}


module.exports = {
    StrTurnArray,
    formatTime
}
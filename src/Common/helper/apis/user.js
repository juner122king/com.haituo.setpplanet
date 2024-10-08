import request from '../ajax.js';

// 登录 
const getUserInfo = () => {
    return request({
        method: "GET",
        url: `/qa/mini/user/info`
    });
}


// 金币
const getDailySignDay = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/goldExchangeRule/daily/sign/day`,
        data
    });
}
//签到
const goSianIn = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/goldExchangeRule/daily/sign`,
        data
    });
}

// 反馈
const postUserFeedback = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/user/feedback`,
        data
    });
}
//注销用户
const putForeverLogout = (data) => {
    return request({
        method: "PUT",
        url: `/qa/mini/user/forever/logout`,
    });
}


// 用户余额记录
const getUserCashRecord = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/user/cash/record`,
        data
    });
}

// 用户金币记录
const getUserGoldRecord = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/user/gold/record`,
        data
    });
}
//设置支付宝账户
const putAlipayAccount = (data) => {
    return request({
        method: "PUT",
        url: `/qa/mini/user/alipay/account`,
        data
    });
}

//发送验证码
const postSendCode = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/basic/user/sendCode/${data.phone}`,
    });
}


//获取福利入口信息
const wealentry = () => {
    return request({
        method: "GET",
        url: `/qa/mini/user/weal/entry`,
    });
}

//获取是否开启广告页入口
const entrance = () => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/ad/adPage/entrance`,
    });
}


let user = {
    getUserInfo,
    getDailySignDay,
    goSianIn,
    postUserFeedback,
    getUserCashRecord,
    getUserGoldRecord,
    putForeverLogout,
    putAlipayAccount,
    postSendCode,
    wealentry,
    entrance
}

export default user
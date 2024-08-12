import request from '../ajax.js';

// 登录 
const toLogin = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/basic/user/login`,
        data
    });
}

// 上传步数
const uploadsteps = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/basic/sc/upload`,
        data
    });
}
// 获取步数
const getsteps = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/sc`,
        data
    });
}

// 获取最近30天记录
const getstepslist = () => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/sc/list`
    });
}


//提现
const withdraw = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/user/withdraw`,
        data
    });
}


//用户余额记录
const record = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/user/cash/record`,
        data
    });
}


//获取广告完成次数
const getAdCount = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/ad/complete/count`,
        data
    });
}

//广告完成
const completeAd = (data) => {
    return request({
        method: "POST",
        url: `/qa/mini/basic/ad/complete`,
        data
    });
}

//广告完成-加密
const completeAdRSA = async (data) => {
    let timestamp = +new Date();
    data.timestamp = timestamp;
    let _data = await $utils.dataEncryption(data);
    let param = {
        data: _data,
    };
    console.log('任务加密', param);
    return request({
        method: "POST",
        url: `/qa/mini/basic/ad/finish`,
        data: JSON.stringify(param),
    });
};


//广告转化上传   type:广告渠道类型: jh(鲸鸿), ks(快手), jl(巨量), ,可用值:jh,ks,jl
const convertUpload = (data) => {
    console.log('data= ', data, `url= /qa/mini/basic/ad/convert/upload/${data.type}`);
    return request({
        method: "POST",
        url: `/qa/mini/basic/ad/convert/upload/${data.type}`,
        data
    });
}

//获取手势返回配置信息
const bolckReturn = (type) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/clickControl/return/info/${type}`
    });
}

/**
 * 获取页面透明层配置信息  
 *
 */

const showTclayer = (data, type) => {
    type
    return request({
        method: "GET",
        url: `/qa/mini/basic/clickControl/transparentLayer/info/${type}`,
        data
    });
}

/**
 * 获取是否自动弹窗  
 *
 */

const popUps = () => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/ad/auto/popUps`
    })
}

/**
 * 转化点击次数
 *
 */
const clickCount = (data) => {
    return request({
        method: "GET",
        url: `/qa/mini/basic/ad/convert/clickCount/${data.type}`,
        data
    });
}


//单个埋点数据
const capture = (data) => {
    return request({
        method: "POST",
        url: `/qa/track/capture`,
        data
    });
}


export default {
    toLogin,
    uploadsteps,
    getsteps,
    getstepslist,
    withdraw,
    record,
    getAdCount,
    completeAd,
    completeAdRSA,
    convertUpload,
    bolckReturn,
    showTclayer,
    popUps,
    clickCount,
    capture
};
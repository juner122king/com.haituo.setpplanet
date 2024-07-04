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
const convertUpload = (data, type) => {
    console.log('data= ', data, `   url= /qa/mini/basic/ad/convert/upload/${type}`);
    return request({
        method: "POST",
        url: `/qa/mini/basic/ad/convert/upload/${type}`,
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
    convertUpload
};
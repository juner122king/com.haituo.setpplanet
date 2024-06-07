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
export default {
    toLogin,
    uploadsteps,
    getsteps,
    getstepslist
};
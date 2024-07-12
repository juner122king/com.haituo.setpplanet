(function(){
                        
                        var $app_define_wrap$ = $app_define_wrap$ || function() {}
                        var createAppHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Common/helper/ajax.js":
/*!***********************************!*\
  !*** ./src/Common/helper/ajax.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.fetch"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.storage"));
var _system3 = _interopRequireDefault($app_require$("@app-module/system.device"));
var _system4 = _interopRequireDefault($app_require$("@app-module/system.prompt"));
var _system5 = _interopRequireDefault($app_require$("@app-module/system.router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const getUserId = async () => {
  let userId = await _system3.default.getUserId();
  return userId.data.userId;
};
const quit = () => {
  _system4.default.showDialog({
    title: '警告',
    message: "您已注销账号,请退出。",
    buttons: [{
      text: '退出',
      color: '#333333'
    }],
    success: function (data) {
      _system5.default.push({
        uri: "Page_login"
      });
    },
    cancel: function () {
      console.log("cancel");
    }
  });
};
const getTokenData = () => {
  return new Promise(async (resolve, reject) => {
    const example = (__webpack_require__(/*! ./apis/example.js */ "./src/Common/helper/apis/example.js")["default"]);
    const deviceNum = await getUserId();
    // console.log(`getTokenData()---->deviceNum=${deviceNum}`);
    // console.log('是否触发的这里');
    example.toLogin({
      loginType: "DEVICE",
      appId: 'SC_0001',
      deviceNum,
      loginAccount: deviceNum
    }).then(data => {
      console.log('走的成功回调');
      resolve(data);
    }).catch(err => {
      console.log(err, '失败回调');
      try {
        if (JSON.parse(err).code === '310001') {
          console.log('进来了');
          quit();
        }
      } catch (error) {
        console.log(error, '查看获取报错');
      }
      reject(err);
    });
  });
};
let isRefreshing = false; // 是否正在请求刷新token的接口
const refreshSubscribers = []; // 存储请求的数组
const subscribeTokenRefresh = cb => {
  // 将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...]
  refreshSubscribers.push(cb);
};
const onRrefreshed = token => {
  // 数组中的请求得到新的token之后自执行，用新的token去请求数据
  refreshSubscribers.map(cb => cb(token));
};
const isAccessTokenExpired = authData => {
  // 判断当前token是否过期
  if (new Date().getTime() - authData.expireAt > 10000 * 60) {
    return true;
  }
  return false;
};
const request = options => {
  return new Promise(async (resolve, reject) => {
    const {
      method,
      url,
      data,
      headers = {}
    } = options;
    const authData = (await _system2.default.get({
      key: 'AUTH_TOKEN_DATA'
    })) || {};
    const accessToken = authData.data ? JSON.parse(authData.data).accessToken : '';
    if (isAccessTokenExpired(authData) || !accessToken) {
      if (!options.url.includes("qa/mini/basic/user/login")) {
        if (!isRefreshing) {
          isRefreshing = true;
          getTokenData().then(async res => {
            res = JSON.parse(res);
            isRefreshing = false;
            if (res.code === "000000") {
              headers.Authorization = res.data.accessToken;
              await _system2.default.set({
                key: "AUTH_TOKEN_DATA",
                value: JSON.stringify(res.data)
              });
              console.log('res.data.accessToken', res.data.accessToken);
              onRrefreshed(res.data.accessToken);
            }
          }).catch(err => {
            isRefreshing = false;
          });
        }
        let retry = new Promise(() => {
          subscribeTokenRefresh(token => {
            headers.Authorization = token; // 用最新token请求数据
            return request(options).then(resolve).catch(reject);
          });
        });
        return retry;
      }
    }
    headers.Authorization = accessToken || '';
    _system.default.fetch({
      // url: 'https://test.ipandata.com' + url,
      url: 'https://api.ihaituo.cn' + url,
      method,
      data,
      header: _objectSpread({
        "content-type": "application/json"
      }, headers),
      // success: function (res) {
      //   const data = res.data
      //   if (data.code === "000000" || JSON.parse(data).code === "000000") {
      //     resolve(url.includes("qa/mini/basic/user/login") ? res.data : JSON.parse(res.data));
      //   } else {
      //     if (data.code === "300002") {
      //       $storage.delete({
      //         key: 'AUTH_TOKEN_DATA'
      //       })
      //       request(options)
      //         .then(resolve)
      //         .catch(reject);
      //     } else {
      //       reject(res.data);
      //     }
      //   }
      // },

      success: function (res) {
        try {
          const data = res.data;

          // 尝试解析 JSON 数据，如果解析失败，则会抛出错误
          const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
          if (parsedData.code === "000000") {
            resolve(url.includes("qa/mini/basic/user/login") ? data : parsedData);
          } else {
            if (parsedData.code === "300002") {
              _system2.default.delete({
                key: 'AUTH_TOKEN_DATA'
              });
              request(options).then(resolve).catch(reject);
            } else {
              reject(data);
            }
          }
        } catch (e) {
          console.error("Error parsing JSON or handling code: ", e);

          // 检查是否返回的是 HTML，而不是 JSON
          if (typeof res.data === 'string' && res.data.startsWith('<html>')) {
            reject("Server returned an HTML page instead of JSON. Possible incorrect URL or server error.");
          } else {
            reject("Error parsing JSON or handling code: " + e.message);
          }
        }
      },
      fail: function (err) {
        reject(err);
      },
      complete: function (res) {}
    });
  });
};
var _default = exports["default"] = request;

/***/ }),

/***/ "./src/Common/helper/apis/example.js":
/*!*******************************************!*\
  !*** ./src/Common/helper/apis/example.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _ajax = _interopRequireDefault(__webpack_require__(/*! ../ajax.js */ "./src/Common/helper/ajax.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 登录 
const toLogin = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/user/login`,
    data
  });
};

// 上传步数
const uploadsteps = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/sc/upload`,
    data
  });
};
// 获取步数
const getsteps = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/sc`,
    data
  });
};

// 获取最近30天记录
const getstepslist = () => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/sc/list`
  });
};

//提现
const withdraw = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/user/withdraw`,
    data
  });
};

//用户余额记录
const record = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/user/cash/record`,
    data
  });
};

//获取广告完成次数
const getAdCount = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/ad/complete/count`,
    data
  });
};

//广告完成
const completeAd = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/ad/complete`,
    data
  });
};

//广告完成-加密
const completeAdRSA = async data => {
  let timestamp = +new Date();
  data.timestamp = timestamp;
  let _data = await $utils.dataEncryption(data);
  let param = {
    data: _data
  };
  console.log('任务加密', param);
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/ad/finish`,
    data: JSON.stringify(param)
  });
};

//广告转化上传   type:广告渠道类型: jh(鲸鸿), ks(快手), jl(巨量), ,可用值:jh,ks,jl
const convertUpload = data => {
  console.log('data= ', data, `url= /qa/mini/basic/ad/convert/upload/${data.type}`);
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/ad/convert/upload/${data.type}`,
    data
  });
};

//获取手势返回配置信息
const bolckReturn = () => {
  let brand = getApp().$def.dataApp.brand;
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/clickControl/return/info/${brand}`
  });
};

/**
 * 获取页面透明层配置信息  
 *
 */

const showTclayer = data => {
  let brand = getApp().$def.dataApp.brand;
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/clickControl/transparentLayer/info/${brand}`,
    data
  });
};

/**
 * 获取是否自动弹窗  
 *
 */

const popUps = () => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/ad/auto/popUps`
  });
};
var _default = exports["default"] = {
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
  popUps
};

/***/ }),

/***/ "./src/Common/helper/apis/index.js":
/*!*****************************************!*\
  !*** ./src/Common/helper/apis/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
/**
 * 导出 apis 下目录的所有接口
 */
const files = __webpack_require__("./src/Common/helper/apis sync recursive \\.js");
const modules = {};
files.keys().forEach(key => {
  if (key === './index.js') {
    return;
  }
  modules[key.replace(/(^\.\/|\.js$)/g, '')] = files(key).default;
});
var _default = exports["default"] = modules;

/***/ }),

/***/ "./src/Common/helper/apis/user.js":
/*!****************************************!*\
  !*** ./src/Common/helper/apis/user.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _ajax = _interopRequireDefault(__webpack_require__(/*! ../ajax.js */ "./src/Common/helper/ajax.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 登录 
const getUserInfo = () => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/user/info`
  });
};

// 金币
const getDailySignDay = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/goldExchangeRule/daily/sign/day`,
    data
  });
};
//签到
const goSianIn = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/goldExchangeRule/daily/sign`,
    data
  });
};

// 反馈
const postUserFeedback = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/user/feedback`,
    data
  });
};
//注销用户
const putForeverLogout = data => {
  return (0, _ajax.default)({
    method: "PUT",
    url: `/qa/mini/user/forever/logout`
  });
};

// 用户余额记录
const getUserCashRecord = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/user/cash/record`,
    data
  });
};

// 用户金币记录
const getUserGoldRecord = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/user/gold/record`,
    data
  });
};
//设置支付宝账户
const putAlipayAccount = data => {
  return (0, _ajax.default)({
    method: "PUT",
    url: `/qa/mini/user/alipay/account`,
    data
  });
};

//发送验证码
const postSendCode = data => {
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/user/sendCode/${data.phone}`
  });
};
let user = {
  getUserInfo,
  getDailySignDay,
  goSianIn,
  postUserFeedback,
  getUserCashRecord,
  getUserGoldRecord,
  putForeverLogout,
  putAlipayAccount,
  postSendCode
};
var _default = exports["default"] = user;

/***/ }),

/***/ "./src/Common/helper/processData.js":
/*!******************************************!*\
  !*** ./src/Common/helper/processData.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clearStorage = clearStorage;
exports["default"] = void 0;
exports.deleteStorage = deleteStorage;
exports.getStorage = getStorage;
exports.incrementTodayClicks = incrementTodayClicks;
exports.localStorage = localStorage;
exports.resetTodayClicksIfNeeded = resetTodayClicksIfNeeded;
exports.setStorage = setStorage;
var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 优化本地存储get方法
function localStorage(key) {
  return new Promise((resolve, reject) => {
    _system.default.get({
      key,
      success: function (data) {
        resolve(data);
      },
      fail: function (data, code) {
        reject(data);
      }
    });
  });
}
function setStorage(key, value = "") {
  return new Promise((resolve, reject) => {
    _system.default.set({
      key,
      value: JSON.stringify(value),
      success: function (data) {
        resolve(`setStorage success`);
      },
      fail: function (data, code) {
        reject(`setStorage fail, code = ${code}`);
      }
    });
  });
}
function getStorage(key) {
  return new Promise((resolve, reject) => {
    _system.default.get({
      key,
      success: function (data) {
        if (data) {
          const res = JSON.parse(data);
          return resolve(res);
        }
        resolve(data);
      },
      fail: function (data, code) {
        reject(`getStorage fail, code = ${code}`);
      }
    });
  });
}
function deleteStorage(key) {
  return new Promise((resolve, reject) => {
    _system.default.delete({
      key,
      success: function (data) {
        resolve(`deleteStorage success`);
      },
      fail: function (data, code) {
        reject(`deleteStorage fail, code = ${code}`);
      }
    });
  });
}
function clearStorage() {
  return new Promise((resolve, reject) => {
    _system.default.clear({
      success: function (data) {
        resolve(`clearStorage success`);
      },
      fail: function (data, code) {
        reject(`clearStorage fail, code = ${code}`);
      }
    });
  });
}

//检查是否需要重置广告点击次数
function resetTodayClicksIfNeeded() {
  const currentDate = new Date().toLocaleDateString(); //当天日期

  _system.default.get({
    key: 'lastResetDate',
    default: '-1',
    success: function (data) {
      console.log('本次检查日期：', currentDate, '--- 最后进入广告页日期：', data);
      if (data !== currentDate) {
        //日期不相同
        // 重置广告点击次数
        _system.default.set({
          key: 'todayClicks',
          value: '0'
        });
      }
    }
  });
}

//进入广告页时执行
function incrementTodayClicks() {
  _system.default.get({
    key: 'todayClicks',
    default: '0',
    //默认0次
    success: function (data) {
      console.log('点击次数+1,当前次数', data);
      let todayClicks = parseInt(data) || 0;
      todayClicks = todayClicks + 1;
      _system.default.set({
        key: 'todayClicks',
        value: todayClicks.toString()
      });
      _system.default.set({
        key: 'lastResetDate',
        value: new Date().toLocaleDateString()
      });
    }
  });
}
var _default = exports["default"] = {
  getStorage,
  setStorage,
  incrementTodayClicks,
  resetTodayClicksIfNeeded
};

/***/ }),

/***/ "./src/Common/helper/utils.js":
/*!************************************!*\
  !*** ./src/Common/helper/utils.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
// 节流阀
const throttle = (fn, gapTime = 1500) => {
  let _lastTime = null;
  // 返回新的函数
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments); //将this和参数传给原函数
      _lastTime = _nowTime;
    }
  };
};
const {
  JSEncrypt
} = __webpack_require__(/*! ../libs/jsencrypt/lib/index */ "./src/Common/libs/jsencrypt/lib/index.js");
const config = {
  publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqaj0Y3k54jCyTq47t73ScBX9uBsSScDo7/uZ+PhHYh9eQqHNW1bBjKGV4t3Y8Wokhv783krxhIqzkPf9nHeZ2yWqoQlPa3qOUc7Wf/HpX2+eHGRjF1/RLARJmMcEgQYB3WGbdRedu0FjQSGd+OfSS/W7Heh2ZGlF/aSHj2NYhYE4p7x4jjQIi+ueKZvVJNZpu0vhQaF45jpqQDULPL+MkkQePmupjp/PR4Ra8BVg4DwJuI6K8jL77YWaxeQRbMrEiQ0ZbTKRQ4o8N73iIM97E/h8PbDl5FbuNn0k8urkYnmv56AMdkVEyIOUwNEa8oU9QKz37o5Z2L7+yqx2zmLpVwIDAQAB'
};
const dataEncryption = (data, action = "encrypt") => {
  try {
    let keyMap = {
      encrypt: config.publicKey,
      decrypt: config.privateKey
    };
    let key = keyMap[action];
    let _data = action === "encrypt" ? JSON.stringify(data) : data;
    return new Promise((resolve, reject) => {
      if (action === "encrypt") {
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(key);
        let result = encryptor.encrypt(_data);
        console.log(result, '查看有什么');
        resolve(result);
        return resolve(result);
      }
    });
  } catch (error) {
    console.log(error, '转换报错？');
  }
};
const getUserId = async () => {
  let userId = await _system.default.getUserId();
  return userId.data.userId;
};
const getOAID = async () => {
  let oaid = await _system.default.getOAID();
  return oaid;
};

/**
 * 转化上传
 * @param {*} that 所在this 
 */
function getConvertUpload() {
  let param = _objectSpread({}, getApp().$def.dataApp.actiParam);
  console.log('getConvertUpload() 转化参数param= ', param);
  for (const key in param) {
    param[key] = param[key].replace(/\/$/, "");
  }
  const convertedParam = convertKeysToCamelCase(param);
  if (!convertedParam.oaid && !convertedParam.adgroupId) {
    return;
  }
  // console.log('getConvertUpload() 格式化转化参数convertedParam= ', convertedParam)
  $apis.example.convertUpload(_objectSpread(_objectSpread({}, convertedParam), {}, {
    deviceId: convertedParam.oaid,
    type: convertedParam.type || 'jh'
  })).then(res => {
    console.log(res, '转换成功');
  }).catch(err => {
    console.log(err, '转换失败');
  });
}
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

/**
* 保存广告回传参数   router.push(OBJECT)  例：@param {Object} e='hap://app/com.company.app/index?param1=value1'
*/
const saveHapUri = e => {
  // console.log('saveHapUri() 转化参数e= ', e)

  const {
    channelValue = '',
    oaid = ''
  } = e;
  if (oaid) {
    getApp().$def.dataApp.actiParam = _objectSpread({}, e);
  }
};

/**
* 插屏广告 
*/

const tablePlaque = async (onCloseCallback, onCatchCallback) => {
  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // if (!storageFlag) {
  //   //未授权，弹出授权询问
  //   console.log('用户授权= ', storageFlag);
  //   console.log('未授权,不加载插屏广告');
  //   return
  // }

  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告商');
    return;
  }
  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: getApp().$def.dataApp.interstitialAdUnitId
  });
  interstitialAd.load().then(res => {
    console.log(res, '查屏加载成功');
    interstitialAd.show().then(() => {
      console.log('插屏广告show成功');
    }, () => {
      console.log('插屏广告show失败');
    });
  })
  // .catch((err) => {
  //   console.log(err, '插屏加载失败');
  // })
  .catch(onCatchCallback);
  interstitialAd.onClick(() => {
    console.log('插屏广告点击了');
    //转化上传
    getConvertUpload();
  });
  interstitialAd.onClose(onCloseCallback);
};

/**
* banner广告  margin_bot底部缩进  
*/

let bannerAd;
const showBannerAd = async margin_bot => {
  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // if (!storageFlag) {
  //   //未授权，弹出授权询问
  //   console.log('用户授权= ', storageFlag);
  //   console.log('未授权,不加载banner广告');
  //   return
  // }

  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告返回');
    return;
  }
  var d = _system.default.getInfoSync();
  // console.info("banner广告-设备信息 " + JSON.stringify(d));

  let height = 144; //两种高度  57与144
  //获取页面内可见窗口的高度和宽度，此值不包括标题栏和状态栏高度
  let windowWidth = d.screenWidth;
  let windowHeight = d.screenHeight - 153 - margin_bot;
  //logicWidth对应manifest.json文件设置的designWidth值，默认是750
  let logicWidth = 750;
  //广告自身大小单位是dp，需要转换成px单位
  let realAdHeighPX = height * d.screenDensity;
  //标题栏高度一般是42dp左右，此处也需要转换成px单位
  let titleBarHeight = 42 * d.screenDensity;
  //此处计算很关键，需要将状态栏高度、标题栏高度加上
  let realToppx = windowHeight - realAdHeighPX + d.statusBarHeight + titleBarHeight;

  // console.info("calBannerPostion1 realToppx=" + realToppx + ", logicWidth= " + logicWidth, "windowWidth= " + windowWidth);
  //转换成页面基准值下的逻辑单位
  let logicWebTop = realToppx * logicWidth / windowWidth;

  //此对象请自己在data下定义
  let top = logicWebTop === 0 ? 1230 : logicWebTop;
  // console.info("calBannerPostion1 top=" + top + ", logicWebTop= " + logicWebTop);

  const style = {
    left: 0,
    top: top,
    width: 360,
    height: height
  };
  let adid = getApp().$def.dataApp.bannerAdUnitId;
  // let adid = 'z1v6jykvy9'
  // console.info("banner广告位=" + adid);
  bannerAd = $ad.createBannerAd({
    adUnitId: adid,
    //banner广告位
    style: style,
    adIntervals: 60 //刷新时间，秒
  });
  // console.info("annerAd.style=" + JSON.stringify(bannerAd.style));
  bannerAd.onLoad(e => {
    console.info("load bannerAd  onload success e=" + JSON.stringify(e));
  });
  bannerAd.onError(e => {
    // console.error("load bannerAd  onError " + JSON.stringify(e));
  });
  bannerAd.onClose(e => {
    // console.info("load bannerAd  onClose");
  });
  bannerAd.show();
};
const hideBanerAd = () => {
  if (bannerAd) {
    bannerAd.hide();
  }
};
const viewBanner = () => {
  if (bannerAd) {
    bannerAd.show();
  }
};
const destroyBanner = () => {
  if (bannerAd) {
    bannerAd.destroy();
  }
};

/**
 * 分秒倒计时
 * @param {Object} countDownData 相关参数：totalSeconds倒计时秒数、name属性名称、isFormat格式化
 * @param {*} that 当前组件this
 */
const startCountDown = (countDownData, that) => {
  let {
    totalSeconds = 3,
    name,
    isFormat = false
  } = countDownData;
  let _this = that;
  return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if (totalSeconds > 1) {
        totalSeconds--;
        const minutes = isFormat ? (void 0).formatTime(Math.floor(totalSeconds / 60)) : Math.floor(totalSeconds / 60);
        const seconds = isFormat ? (void 0).formatTime(Math.floor(totalSeconds % 60)) : Math.floor(totalSeconds % 60);
        _this[name] = {
          minutes,
          seconds
        };
      } else {
        clearInterval(_this.timer);
        resolve();
      }
    }, 1000);
    _this.timer = timer;
  });
};
var _default = exports["default"] = {
  throttle,
  getUserId,
  getConvertUpload,
  startCountDown,
  dataEncryption,
  tablePlaque,
  showBannerAd,
  hideBanerAd,
  viewBanner,
  destroyBanner,
  saveHapUri,
  getOAID
};

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/JSEncrypt.js":
/*!****************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/JSEncrypt.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.JSEncrypt = void 0;
var _base = __webpack_require__(/*! ./lib/jsbn/base64 */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/base64.js");
var _JSEncryptRSAKey = __webpack_require__(/*! ./JSEncryptRSAKey */ "./src/Common/libs/jsencrypt/lib/JSEncryptRSAKey.js");
var _a;
var version = typeof process !== 'undefined' ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : undefined;
/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = exports.JSEncrypt = /** @class */function () {
  function JSEncrypt(options) {
    if (options === void 0) {
      options = {};
    }
    options = options || {};
    this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;
    this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
    this.log = options.log || false;
    // The private and public key.
    this.key = null;
  }
  /**
   * Method to set the rsa key parameter (one method is enough to set both the public
   * and the private key, since the private key contains the public key paramenters)
   * Log a warning if logs are enabled
   * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
   * @public
   */
  JSEncrypt.prototype.setKey = function (key) {
    if (this.log && this.key) {
      console.warn("A key was already set, overriding existing.");
    }
    this.key = new _JSEncryptRSAKey.JSEncryptRSAKey(key);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPrivateKey = function (privkey) {
    // Create the key.
    this.setKey(privkey);
  };
  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPublicKey = function (pubkey) {
    // Sets the public key.
    this.setKey(pubkey);
  };
  /**
   * Proxy method for RSAKey object's decrypt, decrypt the string using the private
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str base64 encoded crypted string to decrypt
   * @return {string} the decrypted string
   * @public
   */
  JSEncrypt.prototype.decrypt = function (str) {
    // Return the decrypted string.
    try {
      return this.getKey().decrypt((0, _base.b64tohex)(str));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's encrypt, encrypt the string using the public
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} str the string to encrypt
   * @return {string} the encrypted string encoded in base64
   * @public
   */
  JSEncrypt.prototype.encrypt = function (str) {
    // Return the encrypted string.
    try {
      return (0, _base.hex2b64)(this.getKey().encrypt(str));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's sign.
   * @param {string} str the string to sign
   * @param {function} digestMethod hash method
   * @param {string} digestName the name of the hash algorithm
   * @return {string} the signature encoded in base64
   * @public
   */
  JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
    // return the RSA signature of 'str' in 'hex' format.
    try {
      return (0, _base.hex2b64)(this.getKey().sign(str, digestMethod, digestName));
    } catch (ex) {
      return false;
    }
  };
  /**
   * Proxy method for RSAKey object's verify.
   * @param {string} str the string to verify
   * @param {string} signature the signature encoded in base64 to compare the string to
   * @param {function} digestMethod hash method
   * @return {boolean} whether the data and signature match
   * @public
   */
  JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
    // Return the decrypted 'digest' of the signature.
    try {
      return this.getKey().verify(str, (0, _base.b64tohex)(signature), digestMethod);
    } catch (ex) {
      return false;
    }
  };
  /**
   * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
   * will be created and returned
   * @param {callback} [cb] the callback to be called if we want the key to be generated
   * in an async fashion
   * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
   * @public
   */
  JSEncrypt.prototype.getKey = function (cb) {
    // Only create new if it does not exist.
    if (!this.key) {
      // Get a new private key.
      this.key = new _JSEncryptRSAKey.JSEncryptRSAKey();
      if (cb && {}.toString.call(cb) === "[object Function]") {
        this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
        return;
      }
      // Generate the key.
      this.key.generate(this.default_key_size, this.default_public_exponent);
    }
    return this.key;
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateKey();
  };
  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateBaseKeyB64();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicKey();
  };
  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicBaseKeyB64();
  };
  JSEncrypt.version = version;
  return JSEncrypt;
}();

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/JSEncryptRSAKey.js":
/*!**********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/JSEncryptRSAKey.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.JSEncryptRSAKey = void 0;
var _base = __webpack_require__(/*! ./lib/jsbn/base64 */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/base64.js");
var _hex = __webpack_require__(/*! ./lib/asn1js/hex */ "./src/Common/libs/jsencrypt/lib/lib/asn1js/hex.js");
var _base2 = __webpack_require__(/*! ./lib/asn1js/base64 */ "./src/Common/libs/jsencrypt/lib/lib/asn1js/base64.js");
var _asn = __webpack_require__(/*! ./lib/asn1js/asn1 */ "./src/Common/libs/jsencrypt/lib/lib/asn1js/asn1.js");
var _rsa = __webpack_require__(/*! ./lib/jsbn/rsa */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/rsa.js");
var _jsbn = __webpack_require__(/*! ./lib/jsbn/jsbn */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/jsbn.js");
var _asn2 = __webpack_require__(/*! ./lib/jsrsasign/asn1-1.0 */ "./src/Common/libs/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js");
var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = exports.JSEncryptRSAKey = /** @class */function (_super) {
  __extends(JSEncryptRSAKey, _super);
  function JSEncryptRSAKey(key) {
    var _this = _super.call(this) || this;
    // Call the super constructor.
    //  RSAKey.call(this);
    // If a key key was provided.
    if (key) {
      // If this is a string...
      if (typeof key === "string") {
        _this.parseKey(key);
      } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
        // Set the values for the key.
        _this.parsePropertiesFrom(key);
      }
    }
    return _this;
  }
  /**
   * Method to parse a pem encoded string containing both a public or private key.
   * The method will translate the pem encoded string in a der encoded string and
   * will parse private key and public key parameters. This method accepts public key
   * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
   *
   * @todo Check how many rsa formats use the same format of pkcs #1.
   *
   * The format is defined as:
   * PublicKeyInfo ::= SEQUENCE {
   *   algorithm       AlgorithmIdentifier,
   *   PublicKey       BIT STRING
   * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
   *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
   *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
   * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER   -- e
   * }
   * it's possible to examine the structure of the keys obtained from openssl using
   * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
   * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
   * @private
   */
  JSEncryptRSAKey.prototype.parseKey = function (pem) {
    try {
      var modulus = 0;
      var public_exponent = 0;
      var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
      var der = reHex.test(pem) ? _hex.Hex.decode(pem) : _base2.Base64.unarmor(pem);
      var asn1 = _asn.ASN1.decode(der);
      // Fixes a bug with OpenSSL 1.0+ private keys
      if (asn1.sub.length === 3) {
        asn1 = asn1.sub[2].sub[0];
      }
      if (asn1.sub.length === 9) {
        // Parse the private key.
        modulus = asn1.sub[1].getHexStringValue(); // bigint
        this.n = (0, _jsbn.parseBigInt)(modulus, 16);
        public_exponent = asn1.sub[2].getHexStringValue(); // int
        this.e = parseInt(public_exponent, 16);
        var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
        this.d = (0, _jsbn.parseBigInt)(private_exponent, 16);
        var prime1 = asn1.sub[4].getHexStringValue(); // bigint
        this.p = (0, _jsbn.parseBigInt)(prime1, 16);
        var prime2 = asn1.sub[5].getHexStringValue(); // bigint
        this.q = (0, _jsbn.parseBigInt)(prime2, 16);
        var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
        this.dmp1 = (0, _jsbn.parseBigInt)(exponent1, 16);
        var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
        this.dmq1 = (0, _jsbn.parseBigInt)(exponent2, 16);
        var coefficient = asn1.sub[8].getHexStringValue(); // bigint
        this.coeff = (0, _jsbn.parseBigInt)(coefficient, 16);
      } else if (asn1.sub.length === 2) {
        if (asn1.sub[0].sub) {
          // Parse ASN.1 SubjectPublicKeyInfo type as defined by X.509
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          this.n = (0, _jsbn.parseBigInt)(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        } else {
          // Parse ASN.1 RSAPublicKey type as defined by PKCS #1
          modulus = asn1.sub[0].getHexStringValue();
          this.n = (0, _jsbn.parseBigInt)(modulus, 16);
          public_exponent = asn1.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        }
      } else {
        return false;
      }
      return true;
    } catch (ex) {
      return false;
    }
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa key.
   *
   * The translation follow the ASN.1 notation :
   * RSAPrivateKey ::= SEQUENCE {
   *   version           Version,
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER,  -- e
   *   privateExponent   INTEGER,  -- d
   *   prime1            INTEGER,  -- p
   *   prime2            INTEGER,  -- q
   *   exponent1         INTEGER,  -- d mod (p1)
   *   exponent2         INTEGER,  -- d mod (q-1)
   *   coefficient       INTEGER,  -- (inverse of q) mod p
   * }
   * @returns {string}  DER Encoded String representing the rsa private key
   * @private
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
    var options = {
      array: [new _asn2.KJUR.asn1.DERInteger({
        int: 0
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.n
      }), new _asn2.KJUR.asn1.DERInteger({
        int: this.e
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.d
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.p
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.q
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.dmp1
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.dmq1
      }), new _asn2.KJUR.asn1.DERInteger({
        bigint: this.coeff
      })]
    };
    var seq = new _asn2.KJUR.asn1.DERSequence(options);
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
    return (0, _base.hex2b64)(this.getPrivateBaseKey());
  };
  /**
   * Translate rsa parameters in a hex encoded string representing the rsa public key.
   * The representation follow the ASN.1 notation :
   * PublicKeyInfo ::= SEQUENCE {
   *   algorithm       AlgorithmIdentifier,
   *   PublicKey       BIT STRING
   * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
   *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
   *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
   * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
   *   modulus           INTEGER,  -- n
   *   publicExponent    INTEGER   -- e
   * }
   * @returns {string} DER Encoded String representing the rsa public key
   * @private
   */
  JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
    var first_sequence = new _asn2.KJUR.asn1.DERSequence({
      array: [new _asn2.KJUR.asn1.DERObjectIdentifier({
        oid: "1.2.840.113549.1.1.1"
      }), new _asn2.KJUR.asn1.DERNull()]
    });
    var second_sequence = new _asn2.KJUR.asn1.DERSequence({
      array: [new _asn2.KJUR.asn1.DERInteger({
        bigint: this.n
      }), new _asn2.KJUR.asn1.DERInteger({
        int: this.e
      })]
    });
    var bit_string = new _asn2.KJUR.asn1.DERBitString({
      hex: "00" + second_sequence.getEncodedHex()
    });
    var seq = new _asn2.KJUR.asn1.DERSequence({
      array: [first_sequence, bit_string]
    });
    return seq.getEncodedHex();
  };
  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
    return (0, _base.hex2b64)(this.getPublicBaseKey());
  };
  /**
   * wrap the string in block of width chars. The default value for rsa keys is 64
   * characters.
   * @param {string} str the pem encoded string without header and footer
   * @param {Number} [width=64] - the length the string has to be wrapped at
   * @returns {string}
   * @private
   */
  JSEncryptRSAKey.wordwrap = function (str, width) {
    width = width || 64;
    if (!str) {
      return str;
    }
    var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
    return str.match(RegExp(regex, "g")).join("\n");
  };
  /**
   * Retrieve the pem encoded private key
   * @returns {string} the pem encoded private key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPrivateKey = function () {
    var key = "-----BEGIN RSA PRIVATE KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
    key += "-----END RSA PRIVATE KEY-----";
    return key;
  };
  /**
   * Retrieve the pem encoded public key
   * @returns {string} the pem encoded public key with header/footer
   * @public
   */
  JSEncryptRSAKey.prototype.getPublicKey = function () {
    var key = "-----BEGIN PUBLIC KEY-----\n";
    key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
    key += "-----END PUBLIC KEY-----";
    return key;
  };
  /**
   * Check if the object contains the necessary parameters to populate the rsa modulus
   * and public exponent parameters.
   * @param {Object} [obj={}] - An object that may contain the two public key
   * parameters
   * @returns {boolean} true if the object contains both the modulus and the public exponent
   * properties (n and e)
   * @todo check for types of n and e. N should be a parseable bigInt object, E should
   * be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
    obj = obj || {};
    return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
  };
  /**
   * Check if the object contains ALL the parameters of an RSA key.
   * @param {Object} [obj={}] - An object that may contain nine rsa key
   * parameters
   * @returns {boolean} true if the object contains all the parameters needed
   * @todo check for types of the parameters all the parameters but the public exponent
   * should be parseable bigint objects, the public exponent should be a parseable integer number
   * @private
   */
  JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
    obj = obj || {};
    return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
  };
  /**
   * Parse the properties of obj in the current rsa object. Obj should AT LEAST
   * include the modulus and public exponent (n, e) parameters.
   * @param {Object} obj - the object containing rsa parameters
   * @private
   */
  JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
    this.n = obj.n;
    this.e = obj.e;
    if (obj.hasOwnProperty("d")) {
      this.d = obj.d;
      this.p = obj.p;
      this.q = obj.q;
      this.dmp1 = obj.dmp1;
      this.dmq1 = obj.dmq1;
      this.coeff = obj.coeff;
    }
  };
  return JSEncryptRSAKey;
}(_rsa.RSAKey);

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/index.js":
/*!************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "JSEncrypt", ({
  enumerable: true,
  get: function () {
    return _JSEncrypt.JSEncrypt;
  }
}));
exports["default"] = void 0;
var _JSEncrypt = __webpack_require__(/*! ./JSEncrypt */ "./src/Common/libs/jsencrypt/lib/JSEncrypt.js");
var _default = exports["default"] = _JSEncrypt.JSEncrypt;

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/asn1js/asn1.js":
/*!**********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/asn1js/asn1.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Stream = exports.ASN1Tag = exports.ASN1 = void 0;
var _int = __webpack_require__(/*! ./int10 */ "./src/Common/libs/jsencrypt/lib/lib/asn1js/int10.js");
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */

var ellipsis = "\u2026";
var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(str, len) {
  if (str.length > len) {
    str = str.substring(0, len) + ellipsis;
  }
  return str;
}
var Stream = exports.Stream = /** @class */function () {
  function Stream(enc, pos) {
    this.hexDigits = "0123456789ABCDEF";
    if (enc instanceof Stream) {
      this.enc = enc.enc;
      this.pos = enc.pos;
    } else {
      // enc should be an array or a binary string
      this.enc = enc;
      this.pos = pos;
    }
  }
  Stream.prototype.get = function (pos) {
    if (pos === undefined) {
      pos = this.pos++;
    }
    if (pos >= this.enc.length) {
      throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
    }
    return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
  };
  Stream.prototype.hexByte = function (b) {
    return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
  };
  Stream.prototype.hexDump = function (start, end, raw) {
    var s = "";
    for (var i = start; i < end; ++i) {
      s += this.hexByte(this.get(i));
      if (raw !== true) {
        switch (i & 0xF) {
          case 0x7:
            s += "  ";
            break;
          case 0xF:
            s += "\n";
            break;
          default:
            s += " ";
        }
      }
    }
    return s;
  };
  Stream.prototype.isASCII = function (start, end) {
    for (var i = start; i < end; ++i) {
      var c = this.get(i);
      if (c < 32 || c > 176) {
        return false;
      }
    }
    return true;
  };
  Stream.prototype.parseStringISO = function (start, end) {
    var s = "";
    for (var i = start; i < end; ++i) {
      s += String.fromCharCode(this.get(i));
    }
    return s;
  };
  Stream.prototype.parseStringUTF = function (start, end) {
    var s = "";
    for (var i = start; i < end;) {
      var c = this.get(i++);
      if (c < 128) {
        s += String.fromCharCode(c);
      } else if (c > 191 && c < 224) {
        s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
      } else {
        s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
      }
    }
    return s;
  };
  Stream.prototype.parseStringBMP = function (start, end) {
    var str = "";
    var hi;
    var lo;
    for (var i = start; i < end;) {
      hi = this.get(i++);
      lo = this.get(i++);
      str += String.fromCharCode(hi << 8 | lo);
    }
    return str;
  };
  Stream.prototype.parseTime = function (start, end, shortYear) {
    var s = this.parseStringISO(start, end);
    var m = (shortYear ? reTimeS : reTimeL).exec(s);
    if (!m) {
      return "Unrecognized time: " + s;
    }
    if (shortYear) {
      // to avoid querying the timer, use the fixed range [1970, 2069]
      // it will conform with ITU X.400 [-10, +40] sliding window until 2030
      m[1] = +m[1];
      m[1] += +m[1] < 70 ? 2000 : 1900;
    }
    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
    if (m[5]) {
      s += ":" + m[5];
      if (m[6]) {
        s += ":" + m[6];
        if (m[7]) {
          s += "." + m[7];
        }
      }
    }
    if (m[8]) {
      s += " UTC";
      if (m[8] != "Z") {
        s += m[8];
        if (m[9]) {
          s += ":" + m[9];
        }
      }
    }
    return s;
  };
  Stream.prototype.parseInteger = function (start, end) {
    var v = this.get(start);
    var neg = v > 127;
    var pad = neg ? 255 : 0;
    var len;
    var s = "";
    // skip unuseful bits (not allowed in DER)
    while (v == pad && ++start < end) {
      v = this.get(start);
    }
    len = end - start;
    if (len === 0) {
      return neg ? -1 : 0;
    }
    // show bit length of huge integers
    if (len > 4) {
      s = v;
      len <<= 3;
      while (((+s ^ pad) & 0x80) == 0) {
        s = +s << 1;
        --len;
      }
      s = "(" + len + " bit)\n";
    }
    // decode the integer
    if (neg) {
      v = v - 256;
    }
    var n = new _int.Int10(v);
    for (var i = start + 1; i < end; ++i) {
      n.mulAdd(256, this.get(i));
    }
    return s + n.toString();
  };
  Stream.prototype.parseBitString = function (start, end, maxLength) {
    var unusedBit = this.get(start);
    var lenBit = (end - start - 1 << 3) - unusedBit;
    var intro = "(" + lenBit + " bit)\n";
    var s = "";
    for (var i = start + 1; i < end; ++i) {
      var b = this.get(i);
      var skip = i == end - 1 ? unusedBit : 0;
      for (var j = 7; j >= skip; --j) {
        s += b >> j & 1 ? "1" : "0";
      }
      if (s.length > maxLength) {
        return intro + stringCut(s, maxLength);
      }
    }
    return intro + s;
  };
  Stream.prototype.parseOctetString = function (start, end, maxLength) {
    if (this.isASCII(start, end)) {
      return stringCut(this.parseStringISO(start, end), maxLength);
    }
    var len = end - start;
    var s = "(" + len + " byte)\n";
    maxLength /= 2; // we work in bytes
    if (len > maxLength) {
      end = start + maxLength;
    }
    for (var i = start; i < end; ++i) {
      s += this.hexByte(this.get(i));
    }
    if (len > maxLength) {
      s += ellipsis;
    }
    return s;
  };
  Stream.prototype.parseOID = function (start, end, maxLength) {
    var s = "";
    var n = new _int.Int10();
    var bits = 0;
    for (var i = start; i < end; ++i) {
      var v = this.get(i);
      n.mulAdd(128, v & 0x7F);
      bits += 7;
      if (!(v & 0x80)) {
        // finished
        if (s === "") {
          n = n.simplify();
          if (n instanceof _int.Int10) {
            n.sub(80);
            s = "2." + n.toString();
          } else {
            var m = n < 80 ? n < 40 ? 0 : 1 : 2;
            s = m + "." + (n - m * 40);
          }
        } else {
          s += "." + n.toString();
        }
        if (s.length > maxLength) {
          return stringCut(s, maxLength);
        }
        n = new _int.Int10();
        bits = 0;
      }
    }
    if (bits > 0) {
      s += ".incomplete";
    }
    return s;
  };
  return Stream;
}();
var ASN1 = exports.ASN1 = /** @class */function () {
  function ASN1(stream, header, length, tag, sub) {
    if (!(tag instanceof ASN1Tag)) {
      throw new Error("Invalid tag value.");
    }
    this.stream = stream;
    this.header = header;
    this.length = length;
    this.tag = tag;
    this.sub = sub;
  }
  ASN1.prototype.typeName = function () {
    switch (this.tag.tagClass) {
      case 0:
        // universal
        switch (this.tag.tagNumber) {
          case 0x00:
            return "EOC";
          case 0x01:
            return "BOOLEAN";
          case 0x02:
            return "INTEGER";
          case 0x03:
            return "BIT_STRING";
          case 0x04:
            return "OCTET_STRING";
          case 0x05:
            return "NULL";
          case 0x06:
            return "OBJECT_IDENTIFIER";
          case 0x07:
            return "ObjectDescriptor";
          case 0x08:
            return "EXTERNAL";
          case 0x09:
            return "REAL";
          case 0x0A:
            return "ENUMERATED";
          case 0x0B:
            return "EMBEDDED_PDV";
          case 0x0C:
            return "UTF8String";
          case 0x10:
            return "SEQUENCE";
          case 0x11:
            return "SET";
          case 0x12:
            return "NumericString";
          case 0x13:
            return "PrintableString";
          // ASCII subset
          case 0x14:
            return "TeletexString";
          // aka T61String
          case 0x15:
            return "VideotexString";
          case 0x16:
            return "IA5String";
          // ASCII
          case 0x17:
            return "UTCTime";
          case 0x18:
            return "GeneralizedTime";
          case 0x19:
            return "GraphicString";
          case 0x1A:
            return "VisibleString";
          // ASCII subset
          case 0x1B:
            return "GeneralString";
          case 0x1C:
            return "UniversalString";
          case 0x1E:
            return "BMPString";
        }
        return "Universal_" + this.tag.tagNumber.toString();
      case 1:
        return "Application_" + this.tag.tagNumber.toString();
      case 2:
        return "[" + this.tag.tagNumber.toString() + "]";
      // Context
      case 3:
        return "Private_" + this.tag.tagNumber.toString();
    }
  };
  ASN1.prototype.content = function (maxLength) {
    if (this.tag === undefined) {
      return null;
    }
    if (maxLength === undefined) {
      maxLength = Infinity;
    }
    var content = this.posContent();
    var len = Math.abs(this.length);
    if (!this.tag.isUniversal()) {
      if (this.sub !== null) {
        return "(" + this.sub.length + " elem)";
      }
      return this.stream.parseOctetString(content, content + len, maxLength);
    }
    switch (this.tag.tagNumber) {
      case 0x01:
        // BOOLEAN
        return this.stream.get(content) === 0 ? "false" : "true";
      case 0x02:
        // INTEGER
        return this.stream.parseInteger(content, content + len);
      case 0x03:
        // BIT_STRING
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
      case 0x04:
        // OCTET_STRING
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
      // case 0x05: // NULL
      case 0x06:
        // OBJECT_IDENTIFIER
        return this.stream.parseOID(content, content + len, maxLength);
      // case 0x07: // ObjectDescriptor
      // case 0x08: // EXTERNAL
      // case 0x09: // REAL
      // case 0x0A: // ENUMERATED
      // case 0x0B: // EMBEDDED_PDV
      case 0x10: // SEQUENCE
      case 0x11:
        // SET
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        } else {
          return "(no elem)";
        }
      case 0x0C:
        // UTF8String
        return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
      case 0x12: // NumericString
      case 0x13: // PrintableString
      case 0x14: // TeletexString
      case 0x15: // VideotexString
      case 0x16: // IA5String
      // case 0x19: // GraphicString
      case 0x1A:
        // VisibleString
        // case 0x1B: // GeneralString
        // case 0x1C: // UniversalString
        return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
      case 0x1E:
        // BMPString
        return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
      case 0x17: // UTCTime
      case 0x18:
        // GeneralizedTime
        return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);
    }
    return null;
  };
  ASN1.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
  };
  ASN1.prototype.toPrettyString = function (indent) {
    if (indent === undefined) {
      indent = "";
    }
    var s = indent + this.typeName() + " @" + this.stream.pos;
    if (this.length >= 0) {
      s += "+";
    }
    s += this.length;
    if (this.tag.tagConstructed) {
      s += " (constructed)";
    } else if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
      s += " (encapsulates)";
    }
    s += "\n";
    if (this.sub !== null) {
      indent += "  ";
      for (var i = 0, max = this.sub.length; i < max; ++i) {
        s += this.sub[i].toPrettyString(indent);
      }
    }
    return s;
  };
  ASN1.prototype.posStart = function () {
    return this.stream.pos;
  };
  ASN1.prototype.posContent = function () {
    return this.stream.pos + this.header;
  };
  ASN1.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
  };
  ASN1.prototype.toHexString = function () {
    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
  };
  ASN1.decodeLength = function (stream) {
    var buf = stream.get();
    var len = buf & 0x7F;
    if (len == buf) {
      return len;
    }
    // no reason to use Int10, as it would be a huge buffer anyways
    if (len > 6) {
      throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
    }
    if (len === 0) {
      return null;
    } // undefined
    buf = 0;
    for (var i = 0; i < len; ++i) {
      buf = buf * 256 + stream.get();
    }
    return buf;
  };
  /**
   * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
   * @returns {string}
   * @public
   */
  ASN1.prototype.getHexStringValue = function () {
    var hexString = this.toHexString();
    var offset = this.header * 2;
    var length = this.length * 2;
    return hexString.substr(offset, length);
  };
  ASN1.decode = function (str) {
    var stream;
    if (!(str instanceof Stream)) {
      stream = new Stream(str, 0);
    } else {
      stream = str;
    }
    var streamStart = new Stream(stream);
    var tag = new ASN1Tag(stream);
    var len = ASN1.decodeLength(stream);
    var start = stream.pos;
    var header = start - streamStart.pos;
    var sub = null;
    var getSub = function () {
      var ret = [];
      if (len !== null) {
        // definite length
        var end = start + len;
        while (stream.pos < end) {
          ret[ret.length] = ASN1.decode(stream);
        }
        if (stream.pos != end) {
          throw new Error("Content size is not correct for container starting at offset " + start);
        }
      } else {
        // undefined length
        try {
          for (;;) {
            var s = ASN1.decode(stream);
            if (s.tag.isEOC()) {
              break;
            }
            ret[ret.length] = s;
          }
          len = start - stream.pos; // undefined lengths are represented as negative values
        } catch (e) {
          throw new Error("Exception while decoding undefined length content: " + e);
        }
      }
      return ret;
    };
    if (tag.tagConstructed) {
      // must have valid content
      sub = getSub();
    } else if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
      // sometimes BitString and OctetString are used to encapsulate ASN.1
      try {
        if (tag.tagNumber == 0x03) {
          if (stream.get() != 0) {
            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
          }
        }
        sub = getSub();
        for (var i = 0; i < sub.length; ++i) {
          if (sub[i].tag.isEOC()) {
            throw new Error("EOC is not supposed to be actual content.");
          }
        }
      } catch (e) {
        // but silently ignore when they don't
        sub = null;
      }
    }
    if (sub === null) {
      if (len === null) {
        throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
      }
      stream.pos = start + Math.abs(len);
    }
    return new ASN1(streamStart, header, len, tag, sub);
  };
  return ASN1;
}();
var ASN1Tag = exports.ASN1Tag = /** @class */function () {
  function ASN1Tag(stream) {
    var buf = stream.get();
    this.tagClass = buf >> 6;
    this.tagConstructed = (buf & 0x20) !== 0;
    this.tagNumber = buf & 0x1F;
    if (this.tagNumber == 0x1F) {
      // long tag
      var n = new _int.Int10();
      do {
        buf = stream.get();
        n.mulAdd(128, buf & 0x7F);
      } while (buf & 0x80);
      this.tagNumber = n.simplify();
    }
  }
  ASN1Tag.prototype.isUniversal = function () {
    return this.tagClass === 0x00;
  };
  ASN1Tag.prototype.isEOC = function () {
    return this.tagClass === 0x00 && this.tagNumber === 0x00;
  };
  return ASN1Tag;
}();

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/asn1js/base64.js":
/*!************************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/asn1js/base64.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Base64 = void 0;
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var decoder;
var Base64 = exports.Base64 = {
  decode: function (a) {
    var i;
    if (decoder === undefined) {
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var ignore = "= \f\n\r\t\u00A0\u2028\u2029";
      decoder = Object.create(null);
      for (i = 0; i < 64; ++i) {
        decoder[b64.charAt(i)] = i;
      }
      decoder['-'] = 62; //+
      decoder['_'] = 63; //-
      for (i = 0; i < ignore.length; ++i) {
        decoder[ignore.charAt(i)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i = 0; i < a.length; ++i) {
      var c = a.charAt(i);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === undefined) {
        throw new Error("Illegal character at offset " + i);
      }
      bits |= c;
      if (++char_count >= 4) {
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 0xFF;
        out[out.length] = bits & 0xFF;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 6;
      }
    }
    switch (char_count) {
      case 1:
        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        out[out.length] = bits >> 10;
        break;
      case 3:
        out[out.length] = bits >> 16;
        out[out.length] = bits >> 8 & 0xFF;
        break;
    }
    return out;
  },
  re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
  unarmor: function (a) {
    var m = Base64.re.exec(a);
    if (m) {
      if (m[1]) {
        a = m[1];
      } else if (m[2]) {
        a = m[2];
      } else {
        throw new Error("RegExp out of sync");
      }
    }
    return Base64.decode(a);
  }
};

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/asn1js/hex.js":
/*!*********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/asn1js/hex.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Hex = void 0;
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var decoder;
var Hex = exports.Hex = {
  decode: function (a) {
    var i;
    if (decoder === undefined) {
      var hex = "0123456789ABCDEF";
      var ignore = " \f\n\r\t\u00A0\u2028\u2029";
      decoder = {};
      for (i = 0; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      hex = hex.toLowerCase();
      for (i = 10; i < 16; ++i) {
        decoder[hex.charAt(i)] = i;
      }
      for (i = 0; i < ignore.length; ++i) {
        decoder[ignore.charAt(i)] = -1;
      }
    }
    var out = [];
    var bits = 0;
    var char_count = 0;
    for (i = 0; i < a.length; ++i) {
      var c = a.charAt(i);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === undefined) {
        throw new Error("Illegal character at offset " + i);
      }
      bits |= c;
      if (++char_count >= 2) {
        out[out.length] = bits;
        bits = 0;
        char_count = 0;
      } else {
        bits <<= 4;
      }
    }
    if (char_count) {
      throw new Error("Hex encoding incomplete: 4 bits missing");
    }
    return out;
  }
};

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/asn1js/int10.js":
/*!***********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/asn1js/int10.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Int10 = void 0;
// Big integer base-10 printing library
// Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
var Int10 = exports.Int10 = /** @class */function () {
  function Int10(value) {
    this.buf = [+value || 0];
  }
  Int10.prototype.mulAdd = function (m, c) {
    // assert(m <= 256)
    var b = this.buf;
    var l = b.length;
    var i;
    var t;
    for (i = 0; i < l; ++i) {
      t = b[i] * m + c;
      if (t < max) {
        c = 0;
      } else {
        c = 0 | t / max;
        t -= c * max;
      }
      b[i] = t;
    }
    if (c > 0) {
      b[i] = c;
    }
  };
  Int10.prototype.sub = function (c) {
    // assert(m <= 256)
    var b = this.buf;
    var l = b.length;
    var i;
    var t;
    for (i = 0; i < l; ++i) {
      t = b[i] - c;
      if (t < 0) {
        t += max;
        c = 1;
      } else {
        c = 0;
      }
      b[i] = t;
    }
    while (b[b.length - 1] === 0) {
      b.pop();
    }
  };
  Int10.prototype.toString = function (base) {
    if ((base || 10) != 10) {
      throw new Error("only base 10 is supported");
    }
    var b = this.buf;
    var s = b[b.length - 1].toString();
    for (var i = b.length - 2; i >= 0; --i) {
      s += (max + b[i]).toString().substring(1);
    }
    return s;
  };
  Int10.prototype.valueOf = function () {
    var b = this.buf;
    var v = 0;
    for (var i = b.length - 1; i >= 0; --i) {
      v = v * max + b[i];
    }
    return v;
  };
  Int10.prototype.simplify = function () {
    var b = this.buf;
    return b.length == 1 ? b[0] : this;
  };
  return Int10;
}();

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/base64.js":
/*!**********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/base64.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.b64toBA = b64toBA;
exports.b64tohex = b64tohex;
exports.hex2b64 = hex2b64;
var _util = __webpack_require__(/*! ./util */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/util.js");
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
// convert a base64 string to hex
function b64tohex(s) {
  var ret = "";
  var i;
  var k = 0; // b64 state, 0-3
  var slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += (0, _util.int2char)(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k == 1) {
      ret += (0, _util.int2char)(slop << 2 | v >> 4);
      slop = v & 0xf;
      k = 2;
    } else if (k == 2) {
      ret += (0, _util.int2char)(slop);
      ret += (0, _util.int2char)(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += (0, _util.int2char)(slop << 2 | v >> 4);
      ret += (0, _util.int2char)(v & 0xf);
      k = 0;
    }
  }
  if (k == 1) {
    ret += (0, _util.int2char)(slop << 2);
  }
  return ret;
}
// convert a base64 string to a byte/number array
function b64toBA(s) {
  // piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = [];
  for (i = 0; 2 * i < h.length; ++i) {
    a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
  }
  return a;
}

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/jsbn.js":
/*!********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/jsbn.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BigInteger = void 0;
exports.intAt = intAt;
exports.nbi = nbi;
exports.nbits = nbits;
exports.nbv = nbv;
exports.parseBigInt = parseBigInt;
var _util = __webpack_require__(/*! ./util */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/util.js");
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = (canary & 0xffffff) == 0xefcafe;
//#region
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
//#endregion
// (public) Constructor
var BigInteger = exports.BigInteger = /** @class */function () {
  function BigInteger(a, b, c) {
    if (a != null) {
      if ("number" == typeof a) {
        this.fromNumber(a, b, c);
      } else if (b == null && "string" != typeof a) {
        this.fromString(a, 256);
      } else {
        this.fromString(a, b);
      }
    }
  }
  //#region PUBLIC
  // BigInteger.prototype.toString = bnToString;
  // (public) return string representation in given radix
  BigInteger.prototype.toString = function (b) {
    if (this.s < 0) {
      return "-" + this.negate().toString(b);
    }
    var k;
    if (b == 16) {
      k = 4;
    } else if (b == 8) {
      k = 3;
    } else if (b == 2) {
      k = 1;
    } else if (b == 32) {
      k = 5;
    } else if (b == 4) {
      k = 2;
    } else {
      return this.toRadix(b);
    }
    var km = (1 << k) - 1;
    var d;
    var m = false;
    var r = "";
    var i = this.t;
    var p = this.DB - i * this.DB % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) {
        m = true;
        r = (0, _util.int2char)(d);
      }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & (1 << p) - 1) << k - p;
          d |= this[--i] >> (p += this.DB - k);
        } else {
          d = this[i] >> (p -= k) & km;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) {
          m = true;
        }
        if (m) {
          r += (0, _util.int2char)(d);
        }
      }
    }
    return m ? r : "0";
  };
  // BigInteger.prototype.negate = bnNegate;
  // (public) -this
  BigInteger.prototype.negate = function () {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  };
  // BigInteger.prototype.abs = bnAbs;
  // (public) |this|
  BigInteger.prototype.abs = function () {
    return this.s < 0 ? this.negate() : this;
  };
  // BigInteger.prototype.compareTo = bnCompareTo;
  // (public) return + if this > a, - if this < a, 0 if equal
  BigInteger.prototype.compareTo = function (a) {
    var r = this.s - a.s;
    if (r != 0) {
      return r;
    }
    var i = this.t;
    r = i - a.t;
    if (r != 0) {
      return this.s < 0 ? -r : r;
    }
    while (--i >= 0) {
      if ((r = this[i] - a[i]) != 0) {
        return r;
      }
    }
    return 0;
  };
  // BigInteger.prototype.bitLength = bnBitLength;
  // (public) return the number of bits in "this"
  BigInteger.prototype.bitLength = function () {
    if (this.t <= 0) {
      return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
  };
  // BigInteger.prototype.mod = bnMod;
  // (public) this mod a
  BigInteger.prototype.mod = function (a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      a.subTo(r, r);
    }
    return r;
  };
  // BigInteger.prototype.modPowInt = bnModPowInt;
  // (public) this^e % m, 0 <= e < 2^32
  BigInteger.prototype.modPowInt = function (e, m) {
    var z;
    if (e < 256 || m.isEven()) {
      z = new Classic(m);
    } else {
      z = new Montgomery(m);
    }
    return this.exp(e, z);
  };
  // BigInteger.prototype.clone = bnClone;
  // (public)
  BigInteger.prototype.clone = function () {
    var r = nbi();
    this.copyTo(r);
    return r;
  };
  // BigInteger.prototype.intValue = bnIntValue;
  // (public) return value as integer
  BigInteger.prototype.intValue = function () {
    if (this.s < 0) {
      if (this.t == 1) {
        return this[0] - this.DV;
      } else if (this.t == 0) {
        return -1;
      }
    } else if (this.t == 1) {
      return this[0];
    } else if (this.t == 0) {
      return 0;
    }
    // assumes 16 < DB < 32
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
  };
  // BigInteger.prototype.byteValue = bnByteValue;
  // (public) return value as byte
  BigInteger.prototype.byteValue = function () {
    return this.t == 0 ? this.s : this[0] << 24 >> 24;
  };
  // BigInteger.prototype.shortValue = bnShortValue;
  // (public) return value as short (assumes DB>=16)
  BigInteger.prototype.shortValue = function () {
    return this.t == 0 ? this.s : this[0] << 16 >> 16;
  };
  // BigInteger.prototype.signum = bnSigNum;
  // (public) 0 if this == 0, 1 if this > 0
  BigInteger.prototype.signum = function () {
    if (this.s < 0) {
      return -1;
    } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
      return 0;
    } else {
      return 1;
    }
  };
  // BigInteger.prototype.toByteArray = bnToByteArray;
  // (public) convert to bigendian byte array
  BigInteger.prototype.toByteArray = function () {
    var i = this.t;
    var r = [];
    r[0] = this.s;
    var p = this.DB - i * this.DB % 8;
    var d;
    var k = 0;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
        r[k++] = d | this.s << this.DB - p;
      }
      while (i >= 0) {
        if (p < 8) {
          d = (this[i] & (1 << p) - 1) << 8 - p;
          d |= this[--i] >> (p += this.DB - 8);
        } else {
          d = this[i] >> (p -= 8) & 0xff;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if ((d & 0x80) != 0) {
          d |= -256;
        }
        if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
          ++k;
        }
        if (k > 0 || d != this.s) {
          r[k++] = d;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.equals = function (a) {
    return this.compareTo(a) == 0;
  };
  // BigInteger.prototype.min = bnMin;
  BigInteger.prototype.min = function (a) {
    return this.compareTo(a) < 0 ? this : a;
  };
  // BigInteger.prototype.max = bnMax;
  BigInteger.prototype.max = function (a) {
    return this.compareTo(a) > 0 ? this : a;
  };
  // BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.and = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util.op_and, r);
    return r;
  };
  // BigInteger.prototype.or = bnOr;
  BigInteger.prototype.or = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util.op_or, r);
    return r;
  };
  // BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.xor = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util.op_xor, r);
    return r;
  };
  // BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.andNot = function (a) {
    var r = nbi();
    this.bitwiseTo(a, _util.op_andnot, r);
    return r;
  };
  // BigInteger.prototype.not = bnNot;
  // (public) ~this
  BigInteger.prototype.not = function () {
    var r = nbi();
    for (var i = 0; i < this.t; ++i) {
      r[i] = this.DM & ~this[i];
    }
    r.t = this.t;
    r.s = ~this.s;
    return r;
  };
  // BigInteger.prototype.shiftLeft = bnShiftLeft;
  // (public) this << n
  BigInteger.prototype.shiftLeft = function (n) {
    var r = nbi();
    if (n < 0) {
      this.rShiftTo(-n, r);
    } else {
      this.lShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.shiftRight = bnShiftRight;
  // (public) this >> n
  BigInteger.prototype.shiftRight = function (n) {
    var r = nbi();
    if (n < 0) {
      this.lShiftTo(-n, r);
    } else {
      this.rShiftTo(n, r);
    }
    return r;
  };
  // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  // (public) returns index of lowest 1-bit (or -1 if none)
  BigInteger.prototype.getLowestSetBit = function () {
    for (var i = 0; i < this.t; ++i) {
      if (this[i] != 0) {
        return i * this.DB + (0, _util.lbit)(this[i]);
      }
    }
    if (this.s < 0) {
      return this.t * this.DB;
    }
    return -1;
  };
  // BigInteger.prototype.bitCount = bnBitCount;
  // (public) return number of set bits
  BigInteger.prototype.bitCount = function () {
    var r = 0;
    var x = this.s & this.DM;
    for (var i = 0; i < this.t; ++i) {
      r += (0, _util.cbit)(this[i] ^ x);
    }
    return r;
  };
  // BigInteger.prototype.testBit = bnTestBit;
  // (public) true iff nth bit is set
  BigInteger.prototype.testBit = function (n) {
    var j = Math.floor(n / this.DB);
    if (j >= this.t) {
      return this.s != 0;
    }
    return (this[j] & 1 << n % this.DB) != 0;
  };
  // BigInteger.prototype.setBit = bnSetBit;
  // (public) this | (1<<n)
  BigInteger.prototype.setBit = function (n) {
    return this.changeBit(n, _util.op_or);
  };
  // BigInteger.prototype.clearBit = bnClearBit;
  // (public) this & ~(1<<n)
  BigInteger.prototype.clearBit = function (n) {
    return this.changeBit(n, _util.op_andnot);
  };
  // BigInteger.prototype.flipBit = bnFlipBit;
  // (public) this ^ (1<<n)
  BigInteger.prototype.flipBit = function (n) {
    return this.changeBit(n, _util.op_xor);
  };
  // BigInteger.prototype.add = bnAdd;
  // (public) this + a
  BigInteger.prototype.add = function (a) {
    var r = nbi();
    this.addTo(a, r);
    return r;
  };
  // BigInteger.prototype.subtract = bnSubtract;
  // (public) this - a
  BigInteger.prototype.subtract = function (a) {
    var r = nbi();
    this.subTo(a, r);
    return r;
  };
  // BigInteger.prototype.multiply = bnMultiply;
  // (public) this * a
  BigInteger.prototype.multiply = function (a) {
    var r = nbi();
    this.multiplyTo(a, r);
    return r;
  };
  // BigInteger.prototype.divide = bnDivide;
  // (public) this / a
  BigInteger.prototype.divide = function (a) {
    var r = nbi();
    this.divRemTo(a, r, null);
    return r;
  };
  // BigInteger.prototype.remainder = bnRemainder;
  // (public) this % a
  BigInteger.prototype.remainder = function (a) {
    var r = nbi();
    this.divRemTo(a, null, r);
    return r;
  };
  // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  // (public) [this/a,this%a]
  BigInteger.prototype.divideAndRemainder = function (a) {
    var q = nbi();
    var r = nbi();
    this.divRemTo(a, q, r);
    return [q, r];
  };
  // BigInteger.prototype.modPow = bnModPow;
  // (public) this^e % m (HAC 14.85)
  BigInteger.prototype.modPow = function (e, m) {
    var i = e.bitLength();
    var k;
    var r = nbv(1);
    var z;
    if (i <= 0) {
      return r;
    } else if (i < 18) {
      k = 1;
    } else if (i < 48) {
      k = 3;
    } else if (i < 144) {
      k = 4;
    } else if (i < 768) {
      k = 5;
    } else {
      k = 6;
    }
    if (i < 8) {
      z = new Classic(m);
    } else if (m.isEven()) {
      z = new Barrett(m);
    } else {
      z = new Montgomery(m);
    }
    // precomputation
    var g = [];
    var n = 3;
    var k1 = k - 1;
    var km = (1 << k) - 1;
    g[1] = z.convert(this);
    if (k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1], g2);
      while (n <= km) {
        g[n] = nbi();
        z.mulTo(g2, g[n - 2], g[n]);
        n += 2;
      }
    }
    var j = e.t - 1;
    var w;
    var is1 = true;
    var r2 = nbi();
    var t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
      if (i >= k1) {
        w = e[j] >> i - k1 & km;
      } else {
        w = (e[j] & (1 << i + 1) - 1) << k1 - i;
        if (j > 0) {
          w |= e[j - 1] >> this.DB + i - k1;
        }
      }
      n = k;
      while ((w & 1) == 0) {
        w >>= 1;
        --n;
      }
      if ((i -= n) < 0) {
        i += this.DB;
        --j;
      }
      if (is1) {
        // ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      } else {
        while (n > 1) {
          z.sqrTo(r, r2);
          z.sqrTo(r2, r);
          n -= 2;
        }
        if (n > 0) {
          z.sqrTo(r, r2);
        } else {
          t = r;
          r = r2;
          r2 = t;
        }
        z.mulTo(r2, g[w], r);
      }
      while (j >= 0 && (e[j] & 1 << i) == 0) {
        z.sqrTo(r, r2);
        t = r;
        r = r2;
        r2 = t;
        if (--i < 0) {
          i = this.DB - 1;
          --j;
        }
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.modInverse = bnModInverse;
  // (public) 1/this % m (HAC 14.61)
  BigInteger.prototype.modInverse = function (m) {
    var ac = m.isEven();
    if (this.isEven() && ac || m.signum() == 0) {
      return BigInteger.ZERO;
    }
    var u = m.clone();
    var v = this.clone();
    var a = nbv(1);
    var b = nbv(0);
    var c = nbv(0);
    var d = nbv(1);
    while (u.signum() != 0) {
      while (u.isEven()) {
        u.rShiftTo(1, u);
        if (ac) {
          if (!a.isEven() || !b.isEven()) {
            a.addTo(this, a);
            b.subTo(m, b);
          }
          a.rShiftTo(1, a);
        } else if (!b.isEven()) {
          b.subTo(m, b);
        }
        b.rShiftTo(1, b);
      }
      while (v.isEven()) {
        v.rShiftTo(1, v);
        if (ac) {
          if (!c.isEven() || !d.isEven()) {
            c.addTo(this, c);
            d.subTo(m, d);
          }
          c.rShiftTo(1, c);
        } else if (!d.isEven()) {
          d.subTo(m, d);
        }
        d.rShiftTo(1, d);
      }
      if (u.compareTo(v) >= 0) {
        u.subTo(v, u);
        if (ac) {
          a.subTo(c, a);
        }
        b.subTo(d, b);
      } else {
        v.subTo(u, v);
        if (ac) {
          c.subTo(a, c);
        }
        d.subTo(b, d);
      }
    }
    if (v.compareTo(BigInteger.ONE) != 0) {
      return BigInteger.ZERO;
    }
    if (d.compareTo(m) >= 0) {
      return d.subtract(m);
    }
    if (d.signum() < 0) {
      d.addTo(m, d);
    } else {
      return d;
    }
    if (d.signum() < 0) {
      return d.add(m);
    } else {
      return d;
    }
  };
  // BigInteger.prototype.pow = bnPow;
  // (public) this^e
  BigInteger.prototype.pow = function (e) {
    return this.exp(e, new NullExp());
  };
  // BigInteger.prototype.gcd = bnGCD;
  // (public) gcd(this,a) (HAC 14.54)
  BigInteger.prototype.gcd = function (a) {
    var x = this.s < 0 ? this.negate() : this.clone();
    var y = a.s < 0 ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      return x;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    while (x.signum() > 0) {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      } else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
    }
    if (g > 0) {
      y.lShiftTo(g, y);
    }
    return y;
  };
  // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  // (public) test primality with certainty >= 1-.5^t
  BigInteger.prototype.isProbablePrime = function (t) {
    var i;
    var x = this.abs();
    if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
      for (i = 0; i < lowprimes.length; ++i) {
        if (x[0] == lowprimes[i]) {
          return true;
        }
      }
      return false;
    }
    if (x.isEven()) {
      return false;
    }
    i = 1;
    while (i < lowprimes.length) {
      var m = lowprimes[i];
      var j = i + 1;
      while (j < lowprimes.length && m < lplim) {
        m *= lowprimes[j++];
      }
      m = x.modInt(m);
      while (i < j) {
        if (m % lowprimes[i++] == 0) {
          return false;
        }
      }
    }
    return x.millerRabin(t);
  };
  //#endregion PUBLIC
  //#region PROTECTED
  // BigInteger.prototype.copyTo = bnpCopyTo;
  // (protected) copy this to r
  BigInteger.prototype.copyTo = function (r) {
    for (var i = this.t - 1; i >= 0; --i) {
      r[i] = this[i];
    }
    r.t = this.t;
    r.s = this.s;
  };
  // BigInteger.prototype.fromInt = bnpFromInt;
  // (protected) set from integer value x, -DV <= x < DV
  BigInteger.prototype.fromInt = function (x) {
    this.t = 1;
    this.s = x < 0 ? -1 : 0;
    if (x > 0) {
      this[0] = x;
    } else if (x < -1) {
      this[0] = x + this.DV;
    } else {
      this.t = 0;
    }
  };
  // BigInteger.prototype.fromString = bnpFromString;
  // (protected) set from string and radix
  BigInteger.prototype.fromString = function (s, b) {
    var k;
    if (b == 16) {
      k = 4;
    } else if (b == 8) {
      k = 3;
    } else if (b == 256) {
      k = 8;
      /* byte array */
    } else if (b == 2) {
      k = 1;
    } else if (b == 32) {
      k = 5;
    } else if (b == 4) {
      k = 2;
    } else {
      this.fromRadix(s, b);
      return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length;
    var mi = false;
    var sh = 0;
    while (--i >= 0) {
      var x = k == 8 ? +s[i] & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") {
          mi = true;
        }
        continue;
      }
      mi = false;
      if (sh == 0) {
        this[this.t++] = x;
      } else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
        this[this.t++] = x >> this.DB - sh;
      } else {
        this[this.t - 1] |= x << sh;
      }
      sh += k;
      if (sh >= this.DB) {
        sh -= this.DB;
      }
    }
    if (k == 8 && (+s[0] & 0x80) != 0) {
      this.s = -1;
      if (sh > 0) {
        this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
    }
    this.clamp();
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.clamp = bnpClamp;
  // (protected) clamp off excess high words
  BigInteger.prototype.clamp = function () {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
      --this.t;
    }
  };
  // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  // (protected) r = this << n*DB
  BigInteger.prototype.dlShiftTo = function (n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + n] = this[i];
    }
    for (i = n - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r.t = this.t + n;
    r.s = this.s;
  };
  // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  // (protected) r = this >> n*DB
  BigInteger.prototype.drShiftTo = function (n, r) {
    for (var i = n; i < this.t; ++i) {
      r[i - n] = this[i];
    }
    r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  };
  // BigInteger.prototype.lShiftTo = bnpLShiftTo;
  // (protected) r = this << n
  BigInteger.prototype.lShiftTo = function (n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB);
    var c = this.s << bs & this.DM;
    for (var i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = this[i] >> cbs | c;
      c = (this[i] & bm) << bs;
    }
    for (var i = ds - 1; i >= 0; --i) {
      r[i] = 0;
    }
    r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  };
  // BigInteger.prototype.rShiftTo = bnpRShiftTo;
  // (protected) r = this >> n
  BigInteger.prototype.rShiftTo = function (n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) {
      r[this.t - ds - 1] |= (this.s & bm) << cbs;
    }
    r.t = this.t - ds;
    r.clamp();
  };
  // BigInteger.prototype.subTo = bnpSubTo;
  // (protected) r = this - a
  BigInteger.prototype.subTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c < -1) {
      r[i++] = this.DV + c;
    } else if (c > 0) {
      r[i++] = c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyTo = function (a, r) {
    var x = this.abs();
    var y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < y.t; ++i) {
      r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }
    r.s = 0;
    r.clamp();
    if (this.s != a.s) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.squareTo = bnpSquareTo;
  // (protected) r = this^2, r != this (HAC 14.16)
  BigInteger.prototype.squareTo = function (r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) {
      r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    }
    r.s = 0;
    r.clamp();
  };
  // BigInteger.prototype.divRemTo = bnpDivRemTo;
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  BigInteger.prototype.divRemTo = function (m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) {
      return;
    }
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) {
        q.fromInt(0);
      }
      if (r != null) {
        this.copyTo(r);
      }
      return;
    }
    if (r == null) {
      r = nbi();
    }
    var y = nbi();
    var ts = this.s;
    var ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
    if (nsh > 0) {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    } else {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 == 0) {
      return;
    }
    var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt;
    var d2 = (1 << this.F1) / yt;
    var e = 1 << this.F2;
    var i = r.t;
    var j = i - ys;
    var t = q == null ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y); // "negative" y so we can replace sub with am later
    while (y.t < ys) {
      y[y.t++] = 0;
    }
    while (--j >= 0) {
      // Estimate quotient digit
      var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
        // Try it out
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) {
          r.subTo(t, r);
        }
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) {
        BigInteger.ZERO.subTo(q, q);
      }
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) {
      r.rShiftTo(nsh, r);
    } // Denormalize remainder
    if (ts < 0) {
      BigInteger.ZERO.subTo(r, r);
    }
  };
  // BigInteger.prototype.invDigit = bnpInvDigit;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  BigInteger.prototype.invDigit = function () {
    if (this.t < 1) {
      return 0;
    }
    var x = this[0];
    if ((x & 1) == 0) {
      return 0;
    }
    var y = x & 3; // y == 1/x mod 2^2
    y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
    y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
    y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return y > 0 ? this.DV - y : -y;
  };
  // BigInteger.prototype.isEven = bnpIsEven;
  // (protected) true iff this is even
  BigInteger.prototype.isEven = function () {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
  };
  // BigInteger.prototype.exp = bnpExp;
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  BigInteger.prototype.exp = function (e, z) {
    if (e > 0xffffffff || e < 1) {
      return BigInteger.ONE;
    }
    var r = nbi();
    var r2 = nbi();
    var g = z.convert(this);
    var i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & 1 << i) > 0) {
        z.mulTo(r2, g, r);
      } else {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  };
  // BigInteger.prototype.chunkSize = bnpChunkSize;
  // (protected) return x s.t. r^x < DV
  BigInteger.prototype.chunkSize = function (r) {
    return Math.floor(Math.LN2 * this.DB / Math.log(r));
  };
  // BigInteger.prototype.toRadix = bnpToRadix;
  // (protected) convert to radix string
  BigInteger.prototype.toRadix = function (b) {
    if (b == null) {
      b = 10;
    }
    if (this.signum() == 0 || b < 2 || b > 36) {
      return "0";
    }
    var cs = this.chunkSize(b);
    var a = Math.pow(b, cs);
    var d = nbv(a);
    var y = nbi();
    var z = nbi();
    var r = "";
    this.divRemTo(d, y, z);
    while (y.signum() > 0) {
      r = (a + z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d, y, z);
    }
    return z.intValue().toString(b) + r;
  };
  // BigInteger.prototype.fromRadix = bnpFromRadix;
  // (protected) convert from radix string
  BigInteger.prototype.fromRadix = function (s, b) {
    this.fromInt(0);
    if (b == null) {
      b = 10;
    }
    var cs = this.chunkSize(b);
    var d = Math.pow(b, cs);
    var mi = false;
    var j = 0;
    var w = 0;
    for (var i = 0; i < s.length; ++i) {
      var x = intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-" && this.signum() == 0) {
          mi = true;
        }
        continue;
      }
      w = b * w + x;
      if (++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w, 0);
        j = 0;
        w = 0;
      }
    }
    if (j > 0) {
      this.dMultiply(Math.pow(b, j));
      this.dAddOffset(w, 0);
    }
    if (mi) {
      BigInteger.ZERO.subTo(this, this);
    }
  };
  // BigInteger.prototype.fromNumber = bnpFromNumber;
  // (protected) alternate constructor
  BigInteger.prototype.fromNumber = function (a, b, c) {
    if ("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if (a < 2) {
        this.fromInt(1);
      } else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          // force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util.op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        } // force odd
        while (!this.isProbablePrime(b)) {
          this.dAddOffset(2, 0);
          if (this.bitLength() > a) {
            this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      }
    } else {
      // new BigInteger(int,RNG)
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= (1 << t) - 1;
      } else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  // (protected) r = this op a (bitwise)
  BigInteger.prototype.bitwiseTo = function (a, op, r) {
    var i;
    var f;
    var m = Math.min(a.t, this.t);
    for (i = 0; i < m; ++i) {
      r[i] = op(this[i], a[i]);
    }
    if (a.t < this.t) {
      f = a.s & this.DM;
      for (i = m; i < this.t; ++i) {
        r[i] = op(this[i], f);
      }
      r.t = this.t;
    } else {
      f = this.s & this.DM;
      for (i = m; i < a.t; ++i) {
        r[i] = op(f, a[i]);
      }
      r.t = a.t;
    }
    r.s = op(this.s, a.s);
    r.clamp();
  };
  // BigInteger.prototype.changeBit = bnpChangeBit;
  // (protected) this op (1<<n)
  BigInteger.prototype.changeBit = function (n, op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r, op, r);
    return r;
  };
  // BigInteger.prototype.addTo = bnpAddTo;
  // (protected) r = this + a
  BigInteger.prototype.addTo = function (a, r) {
    var i = 0;
    var c = 0;
    var m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] + a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c += a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c += a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c > 0) {
      r[i++] = c;
    } else if (c < -1) {
      r[i++] = this.DV + c;
    }
    r.t = i;
    r.clamp();
  };
  // BigInteger.prototype.dMultiply = bnpDMultiply;
  // (protected) this *= n, this >= 0, 1 < n < DV
  BigInteger.prototype.dMultiply = function (n) {
    this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
  };
  // BigInteger.prototype.dAddOffset = bnpDAddOffset;
  // (protected) this += n << w words, this >= 0
  BigInteger.prototype.dAddOffset = function (n, w) {
    if (n == 0) {
      return;
    }
    while (this.t <= w) {
      this[this.t++] = 0;
    }
    this[w] += n;
    while (this[w] >= this.DV) {
      this[w] -= this.DV;
      if (++w >= this.t) {
        this[this.t++] = 0;
      }
      ++this[w];
    }
  };
  // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  // (protected) r = lower n words of "this * a", a.t <= n
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
    var i = Math.min(this.t + a.t, n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while (i > 0) {
      r[--i] = 0;
    }
    for (var j = r.t - this.t; i < j; ++i) {
      r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
    }
    for (var j = Math.min(a.t, n); i < j; ++i) {
      this.am(0, a[i], r, i, 0, n - i);
    }
    r.clamp();
  };
  // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  // (protected) r = "this * a" without lower n words, n > 0
  // "this" should be the larger one if appropriate.
  BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
    --n;
    var i = r.t = this.t + a.t - n;
    r.s = 0; // assumes a,this >= 0
    while (--i >= 0) {
      r[i] = 0;
    }
    for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
      r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
    }
    r.clamp();
    r.drShiftTo(1, r);
  };
  // BigInteger.prototype.modInt = bnpModInt;
  // (protected) this % n, n < 2^26
  BigInteger.prototype.modInt = function (n) {
    if (n <= 0) {
      return 0;
    }
    var d = this.DV % n;
    var r = this.s < 0 ? n - 1 : 0;
    if (this.t > 0) {
      if (d == 0) {
        r = this[0] % n;
      } else {
        for (var i = this.t - 1; i >= 0; --i) {
          r = (d * r + this[i]) % n;
        }
      }
    }
    return r;
  };
  // BigInteger.prototype.millerRabin = bnpMillerRabin;
  // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  BigInteger.prototype.millerRabin = function (t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) {
      return false;
    }
    var r = n1.shiftRight(k);
    t = t + 1 >> 1;
    if (t > lowprimes.length) {
      t = lowprimes.length;
    }
    var a = nbi();
    for (var i = 0; i < t; ++i) {
      // Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigInteger.ONE) == 0) {
            return false;
          }
        }
        if (y.compareTo(n1) != 0) {
          return false;
        }
      }
    }
    return true;
  };
  // BigInteger.prototype.square = bnSquare;
  // (public) this^2
  BigInteger.prototype.square = function () {
    var r = nbi();
    this.squareTo(r);
    return r;
  };
  //#region ASYNC
  // Public API method
  BigInteger.prototype.gcda = function (a, callback) {
    var x = this.s < 0 ? this.negate() : this.clone();
    var y = a.s < 0 ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
      var t = x;
      x = y;
      y = t;
    }
    var i = x.getLowestSetBit();
    var g = y.getLowestSetBit();
    if (g < 0) {
      callback(x);
      return;
    }
    if (i < g) {
      g = i;
    }
    if (g > 0) {
      x.rShiftTo(g, x);
      y.rShiftTo(g, y);
    }
    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
    var gcda1 = function () {
      if ((i = x.getLowestSetBit()) > 0) {
        x.rShiftTo(i, x);
      }
      if ((i = y.getLowestSetBit()) > 0) {
        y.rShiftTo(i, y);
      }
      if (x.compareTo(y) >= 0) {
        x.subTo(y, x);
        x.rShiftTo(1, x);
      } else {
        y.subTo(x, y);
        y.rShiftTo(1, y);
      }
      if (!(x.signum() > 0)) {
        if (g > 0) {
          y.lShiftTo(g, y);
        }
        setTimeout(function () {
          callback(y);
        }, 0); // escape
      } else {
        setTimeout(gcda1, 0);
      }
    };
    setTimeout(gcda1, 10);
  };
  // (protected) alternate constructor
  BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
    if ("number" == typeof b) {
      if (a < 2) {
        this.fromInt(1);
      } else {
        this.fromNumber(a, c);
        if (!this.testBit(a - 1)) {
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util.op_or, this);
        }
        if (this.isEven()) {
          this.dAddOffset(1, 0);
        }
        var bnp_1 = this;
        var bnpfn1_1 = function () {
          bnp_1.dAddOffset(2, 0);
          if (bnp_1.bitLength() > a) {
            bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
          }
          if (bnp_1.isProbablePrime(b)) {
            setTimeout(function () {
              callback();
            }, 0); // escape
          } else {
            setTimeout(bnpfn1_1, 0);
          }
        };
        setTimeout(bnpfn1_1, 0);
      }
    } else {
      var x = [];
      var t = a & 7;
      x.length = (a >> 3) + 1;
      b.nextBytes(x);
      if (t > 0) {
        x[0] &= (1 << t) - 1;
      } else {
        x[0] = 0;
      }
      this.fromString(x, 256);
    }
  };
  return BigInteger;
}();
//#region REDUCERS
//#region NullExp
var NullExp = /** @class */function () {
  function NullExp() {}
  // NullExp.prototype.convert = nNop;
  NullExp.prototype.convert = function (x) {
    return x;
  };
  // NullExp.prototype.revert = nNop;
  NullExp.prototype.revert = function (x) {
    return x;
  };
  // NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
  };
  // NullExp.prototype.sqrTo = nSqrTo;
  NullExp.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
  };
  return NullExp;
}();
// Modular reduction using "classic" algorithm
var Classic = /** @class */function () {
  function Classic(m) {
    this.m = m;
  }
  // Classic.prototype.convert = cConvert;
  Classic.prototype.convert = function (x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) {
      return x.mod(this.m);
    } else {
      return x;
    }
  };
  // Classic.prototype.revert = cRevert;
  Classic.prototype.revert = function (x) {
    return x;
  };
  // Classic.prototype.reduce = cReduce;
  Classic.prototype.reduce = function (x) {
    x.divRemTo(this.m, null, x);
  };
  // Classic.prototype.mulTo = cMulTo;
  Classic.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Classic.prototype.sqrTo = cSqrTo;
  Classic.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Classic;
}();
//#endregion
//#region Montgomery
// Montgomery reduction
var Montgomery = /** @class */function () {
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << m.DB - 15) - 1;
    this.mt2 = 2 * m.t;
  }
  // Montgomery.prototype.convert = montConvert;
  // xR mod m
  Montgomery.prototype.convert = function (x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
      this.m.subTo(r, r);
    }
    return r;
  };
  // Montgomery.prototype.revert = montRevert;
  // x/R mod m
  Montgomery.prototype.revert = function (x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  };
  // Montgomery.prototype.reduce = montReduce;
  // x = x/R mod m (HAC 14.32)
  Montgomery.prototype.reduce = function (x) {
    while (x.t <= this.mt2) {
      // pad x so am has enough room later
      x[x.t++] = 0;
    }
    for (var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i] & 0x7fff;
      var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
      // propagate carry
      while (x[j] >= x.DV) {
        x[j] -= x.DV;
        x[++j]++;
      }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) {
      x.subTo(this.m, x);
    }
  };
  // Montgomery.prototype.mulTo = montMulTo;
  // r = "xy/R mod m"; x,y != r
  Montgomery.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Montgomery.prototype.sqrTo = montSqrTo;
  // r = "x^2/R mod m"; x != r
  Montgomery.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Montgomery;
}();
//#endregion Montgomery
//#region Barrett
// Barrett modular reduction
var Barrett = /** @class */function () {
  function Barrett(m) {
    this.m = m;
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
    this.mu = this.r2.divide(m);
  }
  // Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.convert = function (x) {
    if (x.s < 0 || x.t > 2 * this.m.t) {
      return x.mod(this.m);
    } else if (x.compareTo(this.m) < 0) {
      return x;
    } else {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
  };
  // Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.revert = function (x) {
    return x;
  };
  // Barrett.prototype.reduce = barrettReduce;
  // x = x mod m (HAC 14.42)
  Barrett.prototype.reduce = function (x) {
    x.drShiftTo(this.m.t - 1, this.r2);
    if (x.t > this.m.t + 1) {
      x.t = this.m.t + 1;
      x.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (x.compareTo(this.r2) < 0) {
      x.dAddOffset(1, this.m.t + 1);
    }
    x.subTo(this.r2, x);
    while (x.compareTo(this.m) >= 0) {
      x.subTo(this.m, x);
    }
  };
  // Barrett.prototype.mulTo = barrettMulTo;
  // r = x*y mod m; x,y != r
  Barrett.prototype.mulTo = function (x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  };
  // Barrett.prototype.sqrTo = barrettSqrTo;
  // r = x^2 mod m; x != r
  Barrett.prototype.sqrTo = function (x, r) {
    x.squareTo(r);
    this.reduce(r);
  };
  return Barrett;
}();
//#endregion
//#endregion REDUCERS
// return new, unset BigInteger
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(str, r) {
  return new BigInteger(str, r);
}
// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  BigInteger.prototype.am = function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  };
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  BigInteger.prototype.am = function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  };
  dbits = 26;
} else {
  // Mozilla/Netscape seems to prefer am3
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  BigInteger.prototype.am = function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  };
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
// Digit conversions
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}
// return bigint initialized to value
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
// returns bit length of the integer x
function nbits(x) {
  var r = 1;
  var t;
  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }
  return r;
}
// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/prng4.js":
/*!*********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/prng4.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Arcfour = void 0;
exports.prng_newstate = prng_newstate;
exports.rng_psize = void 0;
// prng4.js - uses Arcfour as a PRNG
var Arcfour = exports.Arcfour = /** @class */function () {
  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = [];
  }
  // Arcfour.prototype.init = ARC4init;
  // Initialize arcfour context from key, an array of ints, each from [0..255]
  Arcfour.prototype.init = function (key) {
    var i;
    var j;
    var t;
    for (i = 0; i < 256; ++i) {
      this.S[i] = i;
    }
    j = 0;
    for (i = 0; i < 256; ++i) {
      j = j + this.S[i] + key[i % key.length] & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  };
  // Arcfour.prototype.next = ARC4next;
  Arcfour.prototype.next = function () {
    var t;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[t + this.S[this.i] & 255];
  };
  return Arcfour;
}();
// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}
// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = exports.rng_psize = 256;

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/rng.js":
/*!*******************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/rng.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SecureRandom = void 0;
var _prng = __webpack_require__(/*! ./prng4 */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/prng4.js");
// Random number generator - requires a PRNG backend, e.g. prng4.js

var rng_state;
var rng_pool = null;
var rng_pptr;
// Initialize the pool with junk if needed.
if (rng_pool == null) {
  rng_pool = [];
  rng_pptr = 0;
  var t = void 0;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    // Extract entropy (2048 bits) from RNG if available
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z[t] & 255;
    }
  }
  // Use mouse events for entropy, if we do not have enough entropy by the time
  // we need it, entropy will be generated by Math.random.
  var count = 0;
  var onMouseMoveListener_1 = function (ev) {
    count = count || 0;
    if (count >= 256 || rng_pptr >= _prng.rng_psize) {
      if (window.removeEventListener) {
        window.removeEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.detachEvent) {
        window.detachEvent("onmousemove", onMouseMoveListener_1);
      }
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      count += 1;
    } catch (e) {
      // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
    }
  };
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_state = (0, _prng.prng_newstate)();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < _prng.rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}
var SecureRandom = exports.SecureRandom = /** @class */function () {
  function SecureRandom() {}
  SecureRandom.prototype.nextBytes = function (ba) {
    for (var i = 0; i < ba.length; ++i) {
      ba[i] = rng_get_byte();
    }
  };
  return SecureRandom;
}();

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/rsa.js":
/*!*******************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/rsa.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RSAKey = void 0;
var _jsbn = __webpack_require__(/*! ./jsbn */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/jsbn.js");
var _rng = __webpack_require__(/*! ./rng */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/rng.js");
// Depends on jsbn.js and rng.js
// Version 1.1: support utf-8 encoding in pkcs1pad2
// convert a (hex) string to a bignum object

// function linebrk(s,n) {
//   var ret = "";
//   var i = 0;
//   while(i + n < s.length) {
//     ret += s.substring(i,i+n) + "\n";
//     i += n;
//   }
//   return ret + s.substring(i,s.length);
// }
// function byte2Hex(b) {
//   if(b < 0x10)
//     return "0" + b.toString(16);
//   else
//     return b.toString(16);
// }
function pkcs1pad1(s, n) {
  if (n < s.length + 22) {
    console.error("Message too long for RSA");
    return null;
  }
  var len = n - s.length - 6;
  var filler = "";
  for (var f = 0; f < len; f += 2) {
    filler += "ff";
  }
  var m = "0001" + filler + "00" + s;
  return (0, _jsbn.parseBigInt)(m, 16);
}
// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s, n) {
  if (n < s.length + 11) {
    // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i = s.length - 1;
  while (i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if (c < 128) {
      // encode using utf-8
      ba[--n] = c;
    } else if (c > 127 && c < 2048) {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 | 192;
    } else {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 & 63 | 128;
      ba[--n] = c >> 12 | 224;
    }
  }
  ba[--n] = 0;
  var rng = new _rng.SecureRandom();
  var x = [];
  while (n > 2) {
    // random non-zero pad
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new _jsbn.BigInteger(ba);
}
// "empty" RSA key constructor
var RSAKey = exports.RSAKey = /** @class */function () {
  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }
  //#region PROTECTED
  // protected
  // RSAKey.prototype.doPublic = RSADoPublic;
  // Perform raw public operation on "x": return x^e (mod n)
  RSAKey.prototype.doPublic = function (x) {
    return x.modPowInt(this.e, this.n);
  };
  // RSAKey.prototype.doPrivate = RSADoPrivate;
  // Perform raw private operation on "x": return x^d (mod n)
  RSAKey.prototype.doPrivate = function (x) {
    if (this.p == null || this.q == null) {
      return x.modPow(this.d, this.n);
    }
    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);
    while (xp.compareTo(xq) < 0) {
      xp = xp.add(this.p);
    }
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  };
  //#endregion PROTECTED
  //#region PUBLIC
  // RSAKey.prototype.setPublic = RSASetPublic;
  // Set the public key fields N and e from hex strings
  RSAKey.prototype.setPublic = function (N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0, _jsbn.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
    } else {
      console.error("Invalid RSA public key");
    }
  };
  // RSAKey.prototype.encrypt = RSAEncrypt;
  // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
  RSAKey.prototype.encrypt = function (text) {
    var maxLength = this.n.bitLength() + 7 >> 3;
    var m = pkcs1pad2(text, maxLength);
    if (m == null) {
      return null;
    }
    var c = this.doPublic(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    var length = h.length;
    // fix zero before result
    for (var i = 0; i < maxLength * 2 - length; i++) {
      h = "0" + h;
    }
    return h;
  };
  // RSAKey.prototype.setPrivate = RSASetPrivate;
  // Set the private key fields N, e, and d from hex strings
  RSAKey.prototype.setPrivate = function (N, E, D) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0, _jsbn.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
      this.d = (0, _jsbn.parseBigInt)(D, 16);
    } else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
  // Set the private key fields N, e, d and CRT params from hex strings
  RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = (0, _jsbn.parseBigInt)(N, 16);
      this.e = parseInt(E, 16);
      this.d = (0, _jsbn.parseBigInt)(D, 16);
      this.p = (0, _jsbn.parseBigInt)(P, 16);
      this.q = (0, _jsbn.parseBigInt)(Q, 16);
      this.dmp1 = (0, _jsbn.parseBigInt)(DP, 16);
      this.dmq1 = (0, _jsbn.parseBigInt)(DQ, 16);
      this.coeff = (0, _jsbn.parseBigInt)(C, 16);
    } else {
      console.error("Invalid RSA private key");
    }
  };
  // RSAKey.prototype.generate = RSAGenerate;
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generate = function (B, E) {
    var rng = new _rng.SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new _jsbn.BigInteger(E, 16);
    for (;;) {
      for (;;) {
        this.p = new _jsbn.BigInteger(B - qs, 1, rng);
        if (this.p.subtract(_jsbn.BigInteger.ONE).gcd(ee).compareTo(_jsbn.BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
          break;
        }
      }
      for (;;) {
        this.q = new _jsbn.BigInteger(qs, 1, rng);
        if (this.q.subtract(_jsbn.BigInteger.ONE).gcd(ee).compareTo(_jsbn.BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
          break;
        }
      }
      if (this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }
      var p1 = this.p.subtract(_jsbn.BigInteger.ONE);
      var q1 = this.q.subtract(_jsbn.BigInteger.ONE);
      var phi = p1.multiply(q1);
      if (phi.gcd(ee).compareTo(_jsbn.BigInteger.ONE) == 0) {
        this.n = this.p.multiply(this.q);
        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  };
  // RSAKey.prototype.decrypt = RSADecrypt;
  // Return the PKCS#1 RSA decryption of "ctext".
  // "ctext" is an even-length hex string and the output is a plain string.
  RSAKey.prototype.decrypt = function (ctext) {
    var c = (0, _jsbn.parseBigInt)(ctext, 16);
    var m = this.doPrivate(c);
    if (m == null) {
      return null;
    }
    return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
  };
  // Generate a new random private key B bits long, using public expt E
  RSAKey.prototype.generateAsync = function (B, E, callback) {
    var rng = new _rng.SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new _jsbn.BigInteger(E, 16);
    var rsa = this;
    // These functions have non-descript names because they were originally for(;;) loops.
    // I don't know about cryptography to give them better names than loop1-4.
    var loop1 = function () {
      var loop4 = function () {
        if (rsa.p.compareTo(rsa.q) <= 0) {
          var t = rsa.p;
          rsa.p = rsa.q;
          rsa.q = t;
        }
        var p1 = rsa.p.subtract(_jsbn.BigInteger.ONE);
        var q1 = rsa.q.subtract(_jsbn.BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(_jsbn.BigInteger.ONE) == 0) {
          rsa.n = rsa.p.multiply(rsa.q);
          rsa.d = ee.modInverse(phi);
          rsa.dmp1 = rsa.d.mod(p1);
          rsa.dmq1 = rsa.d.mod(q1);
          rsa.coeff = rsa.q.modInverse(rsa.p);
          setTimeout(function () {
            callback();
          }, 0); // escape
        } else {
          setTimeout(loop1, 0);
        }
      };
      var loop3 = function () {
        rsa.q = (0, _jsbn.nbi)();
        rsa.q.fromNumberAsync(qs, 1, rng, function () {
          rsa.q.subtract(_jsbn.BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(_jsbn.BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
              setTimeout(loop4, 0);
            } else {
              setTimeout(loop3, 0);
            }
          });
        });
      };
      var loop2 = function () {
        rsa.p = (0, _jsbn.nbi)();
        rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
          rsa.p.subtract(_jsbn.BigInteger.ONE).gcda(ee, function (r) {
            if (r.compareTo(_jsbn.BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
              setTimeout(loop3, 0);
            } else {
              setTimeout(loop2, 0);
            }
          });
        });
      };
      setTimeout(loop2, 0);
    };
    setTimeout(loop1, 0);
  };
  RSAKey.prototype.sign = function (text, digestMethod, digestName) {
    var header = getDigestHeader(digestName);
    var digest = header + digestMethod(text).toString();
    var m = pkcs1pad1(digest, this.n.bitLength() / 4);
    if (m == null) {
      return null;
    }
    var c = this.doPrivate(m);
    if (c == null) {
      return null;
    }
    var h = c.toString(16);
    if ((h.length & 1) == 0) {
      return h;
    } else {
      return "0" + h;
    }
  };
  RSAKey.prototype.verify = function (text, signature, digestMethod) {
    var c = (0, _jsbn.parseBigInt)(signature, 16);
    var m = this.doPublic(c);
    if (m == null) {
      return null;
    }
    var unpadded = m.toString(16).replace(/^1f+00/, "");
    var digest = removeDigestHeader(unpadded);
    return digest == digestMethod(text).toString();
  };
  return RSAKey;
}();
// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d, n) {
  var b = d.toByteArray();
  var i = 0;
  while (i < b.length && b[i] == 0) {
    ++i;
  }
  if (b.length - i != n - 1 || b[i] != 2) {
    return null;
  }
  ++i;
  while (b[i] != 0) {
    if (++i >= b.length) {
      return null;
    }
  }
  var ret = "";
  while (++i < b.length) {
    var c = b[i] & 255;
    if (c < 128) {
      // utf-8 decode
      ret += String.fromCharCode(c);
    } else if (c > 191 && c < 224) {
      ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
      ++i;
    } else {
      ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
      i += 2;
    }
  }
  return ret;
}
// https://tools.ietf.org/html/rfc3447#page-43
var DIGEST_HEADERS = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function getDigestHeader(name) {
  return DIGEST_HEADERS[name] || "";
}
function removeDigestHeader(str) {
  for (var name_1 in DIGEST_HEADERS) {
    if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
      var header = DIGEST_HEADERS[name_1];
      var len = header.length;
      if (str.substr(0, len) == header) {
        return str.substr(len);
      }
    }
  }
  return str;
}
// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
// function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
// }
// public
// RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsbn/util.js":
/*!********************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsbn/util.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.cbit = cbit;
exports.int2char = int2char;
exports.lbit = lbit;
exports.op_and = op_and;
exports.op_andnot = op_andnot;
exports.op_or = op_or;
exports.op_xor = op_xor;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
  return BI_RM.charAt(n);
}
//#region BIT_OPERATIONS
// (public) this & a
function op_and(x, y) {
  return x & y;
}
// (public) this | a
function op_or(x, y) {
  return x | y;
}
// (public) this ^ a
function op_xor(x, y) {
  return x ^ y;
}
// (public) this & ~a
function op_andnot(x, y) {
  return x & ~y;
}
// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if (x == 0) {
    return -1;
  }
  var r = 0;
  if ((x & 0xffff) == 0) {
    x >>= 16;
    r += 16;
  }
  if ((x & 0xff) == 0) {
    x >>= 8;
    r += 8;
  }
  if ((x & 0xf) == 0) {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) == 0) {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) == 0) {
    ++r;
  }
  return r;
}
// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while (x != 0) {
    x &= x - 1;
    ++r;
  }
  return r;
}
//#endregion BIT_OPERATIONS

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js":
/*!*****************************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KJUR = void 0;
var _jsbn = __webpack_require__(/*! ../jsbn/jsbn */ "./src/Common/libs/jsencrypt/lib/lib/jsbn/jsbn.js");
var _yahoo = __webpack_require__(/*! ./yahoo */ "./src/Common/libs/jsencrypt/lib/lib/jsrsasign/yahoo.js");
/* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
/*
 * asn1.js - ASN.1 DER encoder classes
 *
 * Copyright (c) 2013-2017 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * https://kjur.github.io/jsrsasign/license
 *
 * The above copyright and license notice shall be
 * included in all copies or substantial portions of the Software.
 */

/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
/**
 * kjur's class library name space
 * <p>
 * This name space provides following name spaces:
 * <ul>
 * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
 * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
 * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
 * class and utilities</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
 * @name KJUR
 * @namespace kjur's class library name space
 */
var KJUR = exports.KJUR = {};
/**
 * kjur's ASN.1 class library name space
 * <p>
 * This is ITU-T X.690 ASN.1 DER encoder class library and
 * class structure and methods is very similar to
 * org.bouncycastle.asn1 package of
 * well known BouncyCaslte Cryptography Library.
 * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
 * Here are ASN.1 DER primitive classes.
 * <ul>
 * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
 * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
 * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
 * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
 * <li>0x05 {@link KJUR.asn1.DERNull}</li>
 * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
 * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
 * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
 * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
 * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
 * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
 * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
 * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
 * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
 * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
 * <li>0x31 {@link KJUR.asn1.DERSet}</li>
 * </ul>
 * <h4>OTHER ASN.1 CLASSES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.ASN1Object}</li>
 * <li>{@link KJUR.asn1.DERAbstractString}</li>
 * <li>{@link KJUR.asn1.DERAbstractTime}</li>
 * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
 * <li>{@link KJUR.asn1.DERTaggedObject}</li>
 * </ul>
 * <h4>SUB NAME SPACES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
 * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
 * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
 * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
 * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace.
 * This caused by a bug of jsdoc2.
 * @name KJUR.asn1
 * @namespace
 */
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
/**
 * ASN1 utilities class
 * @name KJUR.asn1.ASN1Util
 * @class ASN1 utilities class
 * @since asn1 1.0.2
 */
KJUR.asn1.ASN1Util = new function () {
  this.integerToByteHex = function (i) {
    var h = i.toString(16);
    if (h.length % 2 == 1) h = '0' + h;
    return h;
  };
  this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
    var h = bigIntegerValue.toString(16);
    if (h.substr(0, 1) != '-') {
      if (h.length % 2 == 1) {
        h = '0' + h;
      } else {
        if (!h.match(/^[0-7]/)) {
          h = '00' + h;
        }
      }
    } else {
      var hPos = h.substr(1);
      var xorLen = hPos.length;
      if (xorLen % 2 == 1) {
        xorLen += 1;
      } else {
        if (!h.match(/^[0-7]/)) {
          xorLen += 2;
        }
      }
      var hMask = '';
      for (var i = 0; i < xorLen; i++) {
        hMask += 'f';
      }
      var biMask = new _jsbn.BigInteger(hMask, 16);
      var biNeg = biMask.xor(bigIntegerValue).add(_jsbn.BigInteger.ONE);
      h = biNeg.toString(16).replace(/^-/, '');
    }
    return h;
  };
  /**
   * get PEM string from hexadecimal data and header string
   * @name getPEMStringFromHex
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} dataHex hexadecimal string of PEM body
   * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
   * @return {String} PEM formatted string of input data
   * @description
   * This method converts a hexadecimal string to a PEM string with
   * a specified header. Its line break will be CRLF("\r\n").
   * @example
   * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
   * // value of pem will be:
   * -----BEGIN PRIVATE KEY-----
   * YWFh
   * -----END PRIVATE KEY-----
   */
  this.getPEMStringFromHex = function (dataHex, pemHeader) {
    return hextopem(dataHex, pemHeader);
  };
  /**
   * generate ASN1Object specifed by JSON parameters
   * @name newObject
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {Array} param JSON parameter to generate ASN1Object
   * @return {KJUR.asn1.ASN1Object} generated object
   * @since asn1 1.0.3
   * @description
   * generate any ASN1Object specified by JSON param
   * including ASN.1 primitive or structured.
   * Generally 'param' can be described as follows:
   * <blockquote>
   * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
   * </blockquote>
   * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
   * <ul>
   * <li>'bool' - DERBoolean</li>
   * <li>'int' - DERInteger</li>
   * <li>'bitstr' - DERBitString</li>
   * <li>'octstr' - DEROctetString</li>
   * <li>'null' - DERNull</li>
   * <li>'oid' - DERObjectIdentifier</li>
   * <li>'enum' - DEREnumerated</li>
   * <li>'utf8str' - DERUTF8String</li>
   * <li>'numstr' - DERNumericString</li>
   * <li>'prnstr' - DERPrintableString</li>
   * <li>'telstr' - DERTeletexString</li>
   * <li>'ia5str' - DERIA5String</li>
   * <li>'utctime' - DERUTCTime</li>
   * <li>'gentime' - DERGeneralizedTime</li>
   * <li>'seq' - DERSequence</li>
   * <li>'set' - DERSet</li>
   * <li>'tag' - DERTaggedObject</li>
   * </ul>
   * @example
   * newObject({'prnstr': 'aaa'});
   * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
   * // ASN.1 Tagged Object
   * newObject({'tag': {'tag': 'a1',
   *                    'explicit': true,
   *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
   * // more simple representation of ASN.1 Tagged Object
   * newObject({'tag': ['a1',
   *                    true,
   *                    {'seq': [
   *                      {'int': 3},
   *                      {'prnstr': 'aaa'}]}
   *                   ]});
   */
  this.newObject = function (param) {
    var _KJUR = KJUR,
      _KJUR_asn1 = _KJUR.asn1,
      _DERBoolean = _KJUR_asn1.DERBoolean,
      _DERInteger = _KJUR_asn1.DERInteger,
      _DERBitString = _KJUR_asn1.DERBitString,
      _DEROctetString = _KJUR_asn1.DEROctetString,
      _DERNull = _KJUR_asn1.DERNull,
      _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
      _DEREnumerated = _KJUR_asn1.DEREnumerated,
      _DERUTF8String = _KJUR_asn1.DERUTF8String,
      _DERNumericString = _KJUR_asn1.DERNumericString,
      _DERPrintableString = _KJUR_asn1.DERPrintableString,
      _DERTeletexString = _KJUR_asn1.DERTeletexString,
      _DERIA5String = _KJUR_asn1.DERIA5String,
      _DERUTCTime = _KJUR_asn1.DERUTCTime,
      _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
      _DERSequence = _KJUR_asn1.DERSequence,
      _DERSet = _KJUR_asn1.DERSet,
      _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
      _newObject = _KJUR_asn1.ASN1Util.newObject;
    var keys = Object.keys(param);
    if (keys.length != 1) throw "key of param shall be only one.";
    var key = keys[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1) throw "undefined key: " + key;
    if (key == "bool") return new _DERBoolean(param[key]);
    if (key == "int") return new _DERInteger(param[key]);
    if (key == "bitstr") return new _DERBitString(param[key]);
    if (key == "octstr") return new _DEROctetString(param[key]);
    if (key == "null") return new _DERNull(param[key]);
    if (key == "oid") return new _DERObjectIdentifier(param[key]);
    if (key == "enum") return new _DEREnumerated(param[key]);
    if (key == "utf8str") return new _DERUTF8String(param[key]);
    if (key == "numstr") return new _DERNumericString(param[key]);
    if (key == "prnstr") return new _DERPrintableString(param[key]);
    if (key == "telstr") return new _DERTeletexString(param[key]);
    if (key == "ia5str") return new _DERIA5String(param[key]);
    if (key == "utctime") return new _DERUTCTime(param[key]);
    if (key == "gentime") return new _DERGeneralizedTime(param[key]);
    if (key == "seq") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSequence({
        'array': a
      });
    }
    if (key == "set") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSet({
        'array': a
      });
    }
    if (key == "tag") {
      var tagParam = param[key];
      if (Object.prototype.toString.call(tagParam) === '[object Array]' && tagParam.length == 3) {
        var obj = _newObject(tagParam[2]);
        return new _DERTaggedObject({
          tag: tagParam[0],
          explicit: tagParam[1],
          obj: obj
        });
      } else {
        var newParam = {};
        if (tagParam.explicit !== undefined) newParam.explicit = tagParam.explicit;
        if (tagParam.tag !== undefined) newParam.tag = tagParam.tag;
        if (tagParam.obj === undefined) throw "obj shall be specified for 'tag'.";
        newParam.obj = _newObject(tagParam.obj);
        return new _DERTaggedObject(newParam);
      }
    }
  };
  /**
   * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
   * @name jsonToASN1HEX
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {Array} param JSON parameter to generate ASN1Object
   * @return hexadecimal string of ASN1Object
   * @since asn1 1.0.4
   * @description
   * As for ASN.1 object representation of JSON object,
   * please see {@link newObject}.
   * @example
   * jsonToASN1HEX({'prnstr': 'aaa'});
   */
  this.jsonToASN1HEX = function (param) {
    var asn1Obj = this.newObject(param);
    return asn1Obj.getEncodedHex();
  };
}();
/**
 * get dot noted oid number string from hexadecimal value of OID
 * @name oidHexToInt
 * @memberOf KJUR.asn1.ASN1Util
 * @function
 * @param {String} hex hexadecimal value of object identifier
 * @return {String} dot noted string of object identifier
 * @since jsrsasign 4.8.3 asn1 1.0.7
 * @description
 * This static method converts from hexadecimal string representation of
 * ASN.1 value of object identifier to oid number string.
 * @example
 * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
 */
KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
  var s = "";
  var i01 = parseInt(hex.substr(0, 2), 16);
  var i0 = Math.floor(i01 / 40);
  var i1 = i01 % 40;
  var s = i0 + "." + i1;
  var binbuf = "";
  for (var i = 2; i < hex.length; i += 2) {
    var value = parseInt(hex.substr(i, 2), 16);
    var bin = ("00000000" + value.toString(2)).slice(-8);
    binbuf = binbuf + bin.substr(1, 7);
    if (bin.substr(0, 1) == "0") {
      var bi = new _jsbn.BigInteger(binbuf, 2);
      s = s + "." + bi.toString(10);
      binbuf = "";
    }
  }
  ;
  return s;
};
/**
 * get hexadecimal value of object identifier from dot noted oid value
 * @name oidIntToHex
 * @memberOf KJUR.asn1.ASN1Util
 * @function
 * @param {String} oidString dot noted string of object identifier
 * @return {String} hexadecimal value of object identifier
 * @since jsrsasign 4.8.3 asn1 1.0.7
 * @description
 * This static method converts from object identifier value string.
 * to hexadecimal string representation of it.
 * @example
 * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
 */
KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
  var itox = function (i) {
    var h = i.toString(16);
    if (h.length == 1) h = '0' + h;
    return h;
  };
  var roidtox = function (roid) {
    var h = '';
    var bi = new _jsbn.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7) padLen = 0;
    var bPad = '';
    for (var i = 0; i < padLen; i++) bPad += '0';
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
      var b8 = b.substr(i, 7);
      if (i != b.length - 7) b8 = '1' + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
  };
  if (!oidString.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + oidString;
  }
  var h = '';
  var a = oidString.split('.');
  var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
  h += itox(i0);
  a.splice(0, 2);
  for (var i = 0; i < a.length; i++) {
    h += roidtox(a[i]);
  }
  return h;
};
// ********************************************************************
//  Abstract ASN.1 Classes
// ********************************************************************
// ********************************************************************
/**
 * base class for ASN.1 DER encoder object
 * @name KJUR.asn1.ASN1Object
 * @class base class for ASN.1 DER encoder object
 * @property {Boolean} isModified flag whether internal data was changed
 * @property {String} hTLV hexadecimal string of ASN.1 TLV
 * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
 * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
 * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
 * @description
 */
KJUR.asn1.ASN1Object = function () {
  var isModified = true;
  var hTLV = null;
  var hT = '00';
  var hL = '00';
  var hV = '';
  /**
   * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
   * @name getLengthHexFromValue
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV length(L)
   */
  this.getLengthHexFromValue = function () {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
      throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
    }
    var n = this.hV.length / 2;
    var hN = n.toString(16);
    if (hN.length % 2 == 1) {
      hN = "0" + hN;
    }
    if (n < 128) {
      return hN;
    } else {
      var hNlen = hN.length / 2;
      if (hNlen > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
      }
      var head = 128 + hNlen;
      return head.toString(16) + hN;
    }
  };
  /**
   * get hexadecimal string of ASN.1 TLV bytes
   * @name getEncodedHex
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV
   */
  this.getEncodedHex = function () {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
      //alert("first time: " + this.hTLV);
    }
    return this.hTLV;
  };
  /**
   * get hexadecimal string of ASN.1 TLV value(V) bytes
   * @name getValueHex
   * @memberOf KJUR.asn1.ASN1Object#
   * @function
   * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
   */
  this.getValueHex = function () {
    this.getEncodedHex();
    return this.hV;
  };
  this.getFreshValueHex = function () {
    return '';
  };
};
// == BEGIN DERAbstractString ================================================
/**
 * base class for ASN.1 DER string classes
 * @name KJUR.asn1.DERAbstractString
 * @class base class for ASN.1 DER string classes
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @property {String} s internal string of value
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERAbstractString = function (params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var s = null;
  var hV = null;
  /**
   * get string value of this string object
   * @name getString
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @return {String} string value of this string object
   */
  this.getString = function () {
    return this.s;
  };
  /**
   * set value by a string
   * @name setString
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @param {String} newS value by a string to set
   */
  this.setString = function (newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
  };
  /**
   * set value by a hexadecimal string
   * @name setStringHex
   * @memberOf KJUR.asn1.DERAbstractString#
   * @function
   * @param {String} newHexString value by a hexadecimal string to set
   */
  this.setStringHex = function (newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string") {
      this.setString(params);
    } else if (typeof params['str'] != "undefined") {
      this.setString(params['str']);
    } else if (typeof params['hex'] != "undefined") {
      this.setStringHex(params['hex']);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
// == END   DERAbstractString ================================================
// == BEGIN DERAbstractTime ==================================================
/**
 * base class for ASN.1 DER Generalized/UTCTime class
 * @name KJUR.asn1.DERAbstractTime
 * @class base class for ASN.1 DER Generalized/UTCTime class
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractTime = function (params) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  var s = null;
  var date = null;
  // --- PRIVATE METHODS --------------------
  this.localDateToUTC = function (d) {
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var utcDate = new Date(utc);
    return utcDate;
  };
  /*
   * format date string by Data object
   * @name formatDate
   * @memberOf KJUR.asn1.AbstractTime;
   * @param {Date} dateObject
   * @param {string} type 'utc' or 'gen'
   * @param {boolean} withMillis flag for with millisections or not
   * @description
   * 'withMillis' flag is supported from asn1 1.0.6.
   */
  this.formatDate = function (dateObject, type, withMillis) {
    var pad = this.zeroPadding;
    var d = this.localDateToUTC(dateObject);
    var year = String(d.getFullYear());
    if (type == 'utc') year = year.substr(2, 2);
    var month = pad(String(d.getMonth() + 1), 2);
    var day = pad(String(d.getDate()), 2);
    var hour = pad(String(d.getHours()), 2);
    var min = pad(String(d.getMinutes()), 2);
    var sec = pad(String(d.getSeconds()), 2);
    var s = year + month + day + hour + min + sec;
    if (withMillis === true) {
      var millis = d.getMilliseconds();
      if (millis != 0) {
        var sMillis = pad(String(millis), 3);
        sMillis = sMillis.replace(/[0]+$/, "");
        s = s + "." + sMillis;
      }
    }
    return s + "Z";
  };
  this.zeroPadding = function (s, len) {
    if (s.length >= len) return s;
    return new Array(len - s.length + 1).join('0') + s;
  };
  // --- PUBLIC METHODS --------------------
  /**
   * get string value of this string object
   * @name getString
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @return {String} string value of this time object
   */
  this.getString = function () {
    return this.s;
  };
  /**
   * set value by a string
   * @name setString
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @param {String} newS value by a string to set such like "130430235959Z"
   */
  this.setString = function (newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(newS);
  };
  /**
   * set value by a Date object
   * @name setByDateValue
   * @memberOf KJUR.asn1.DERAbstractTime#
   * @function
   * @param {Integer} year year of date (ex. 2013)
   * @param {Integer} month month of date between 1 and 12 (ex. 12)
   * @param {Integer} day day of month
   * @param {Integer} hour hours of date
   * @param {Integer} min minutes of date
   * @param {Integer} sec seconds of date
   */
  this.setByDateValue = function (year, month, day, hour, min, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
    this.setByDate(dateObject);
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
// == END   DERAbstractTime ==================================================
// == BEGIN DERAbstractStructured ============================================
/**
 * base class for ASN.1 DER structured class
 * @name KJUR.asn1.DERAbstractStructured
 * @class base class for ASN.1 DER structured class
 * @property {Array} asn1Array internal array of ASN1Object
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractStructured = function (params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var asn1Array = null;
  /**
   * set value by array of ASN1Object
   * @name setByASN1ObjectArray
   * @memberOf KJUR.asn1.DERAbstractStructured#
   * @function
   * @param {array} asn1ObjectArray array of ASN1Object to set
   */
  this.setByASN1ObjectArray = function (asn1ObjectArray) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = asn1ObjectArray;
  };
  /**
   * append an ASN1Object to internal array
   * @name appendASN1Object
   * @memberOf KJUR.asn1.DERAbstractStructured#
   * @function
   * @param {ASN1Object} asn1Object to add
   */
  this.appendASN1Object = function (asn1Object) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(asn1Object);
  };
  this.asn1Array = new Array();
  if (typeof params != "undefined") {
    if (typeof params['array'] != "undefined") {
      this.asn1Array = params['array'];
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
// ********************************************************************
//  ASN.1 Object Classes
// ********************************************************************
// ********************************************************************
/**
 * class for ASN.1 DER Boolean
 * @name KJUR.asn1.DERBoolean
 * @class class for ASN.1 DER Boolean
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERBoolean = function () {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  this.hTLV = "0101ff";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER Integer
 * @name KJUR.asn1.DERInteger
 * @class class for ASN.1 DER Integer
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERInteger = function (params) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  /**
   * set value by Tom Wu's BigInteger object
   * @name setByBigInteger
   * @memberOf KJUR.asn1.DERInteger#
   * @function
   * @param {BigInteger} bigIntegerValue to set
   */
  this.setByBigInteger = function (bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  /**
   * set value by integer value
   * @name setByInteger
   * @memberOf KJUR.asn1.DERInteger
   * @function
   * @param {Integer} integer value to set
   */
  this.setByInteger = function (intValue) {
    var bi = new _jsbn.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  /**
   * set value by integer value
   * @name setValueHex
   * @memberOf KJUR.asn1.DERInteger#
   * @function
   * @param {String} hexadecimal string of integer value
   * @description
   * <br/>
   * NOTE: Value shall be represented by minimum octet length of
   * two's complement representation.
   * @example
   * new KJUR.asn1.DERInteger(123);
   * new KJUR.asn1.DERInteger({'int': 123});
   * new KJUR.asn1.DERInteger({'hex': '1fad'});
   */
  this.setValueHex = function (newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['bigint'] != "undefined") {
      this.setByBigInteger(params['bigint']);
    } else if (typeof params['int'] != "undefined") {
      this.setByInteger(params['int']);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setValueHex(params['hex']);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER encoded BitString primitive
 * @name KJUR.asn1.DERBitString
 * @class class for ASN.1 DER encoded BitString primitive
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>bin - specify binary string (ex. '10111')</li>
 * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
 * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
 * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
 * argument for "BitString encapsulates" structure.</li>
 * </ul>
 * NOTE1: 'params' can be omitted.<br/>
 * NOTE2: 'obj' parameter have been supported since
 * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
 * @example
 * // default constructor
 * o = new KJUR.asn1.DERBitString();
 * // initialize with binary string
 * o = new KJUR.asn1.DERBitString({bin: "1011"});
 * // initialize with boolean array
 * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
 * // initialize with hexadecimal string (04 is unused bits)
 * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
 * // initialize with ASN1Util.newObject argument for encapsulated
 * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
 * // above generates a ASN.1 data like this:
 * // BIT STRING, encapsulates {
 * //   SEQUENCE {
 * //     INTEGER 3
 * //     PrintableString 'aaa'
 * //     }
 * //   }
 */
KJUR.asn1.DERBitString = function (params) {
  if (params !== undefined && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = "00" + o.getEncodedHex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  /**
   * set ASN.1 value(V) by a hexadecimal string including unused bits
   * @name setHexValueIncludingUnusedBits
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {String} newHexStringIncludingUnusedBits
   */
  this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = newHexStringIncludingUnusedBits;
  };
  /**
   * set ASN.1 value(V) by unused bit and hexadecimal string of value
   * @name setUnusedBitsAndHexValue
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {Integer} unusedBits
   * @param {String} hValue
   */
  this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
    if (unusedBits < 0 || 7 < unusedBits) {
      throw "unused bits shall be from 0 to 7: u = " + unusedBits;
    }
    var hUnusedBits = "0" + unusedBits;
    this.hTLV = null;
    this.isModified = true;
    this.hV = hUnusedBits + hValue;
  };
  /**
   * set ASN.1 DER BitString by binary string<br/>
   * @name setByBinaryString
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {String} binaryString binary value string (i.e. '10111')
   * @description
   * Its unused bits will be calculated automatically by length of
   * 'binaryValue'. <br/>
   * NOTE: Trailing zeros '0' will be ignored.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.setByBooleanArray("01011");
   */
  this.setByBinaryString = function (binaryString) {
    binaryString = binaryString.replace(/0+$/, '');
    var unusedBits = 8 - binaryString.length % 8;
    if (unusedBits == 8) unusedBits = 0;
    for (var i = 0; i <= unusedBits; i++) {
      binaryString += '0';
    }
    var h = '';
    for (var i = 0; i < binaryString.length - 1; i += 8) {
      var b = binaryString.substr(i, 8);
      var x = parseInt(b, 2).toString(16);
      if (x.length == 1) x = '0' + x;
      h += x;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = '0' + unusedBits + h;
  };
  /**
   * set ASN.1 TLV value(V) by an array of boolean<br/>
   * @name setByBooleanArray
   * @memberOf KJUR.asn1.DERBitString#
   * @function
   * @param {array} booleanArray array of boolean (ex. [true, false, true])
   * @description
   * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.setByBooleanArray([false, true, false, true, true]);
   */
  this.setByBooleanArray = function (booleanArray) {
    var s = '';
    for (var i = 0; i < booleanArray.length; i++) {
      if (booleanArray[i] == true) {
        s += '1';
      } else {
        s += '0';
      }
    }
    this.setByBinaryString(s);
  };
  /**
   * generate an array of falses with specified length<br/>
   * @name newFalseArray
   * @memberOf KJUR.asn1.DERBitString
   * @function
   * @param {Integer} nLength length of array to generate
   * @return {array} array of boolean falses
   * @description
   * This static method may be useful to initialize boolean array.
   * @example
   * o = new KJUR.asn1.DERBitString();
   * o.newFalseArray(3) &rarr; [false, false, false]
   */
  this.newFalseArray = function (nLength) {
    var a = new Array(nLength);
    for (var i = 0; i < nLength; i++) {
      a[i] = false;
    }
    return a;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setHexValueIncludingUnusedBits(params['hex']);
    } else if (typeof params['bin'] != "undefined") {
      this.setByBinaryString(params['bin']);
    } else if (typeof params['array'] != "undefined") {
      this.setByBooleanArray(params['array']);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER OctetString<br/>
 * @name KJUR.asn1.DEROctetString
 * @class class for ASN.1 DER OctetString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * This class provides ASN.1 OctetString simple type.<br/>
 * Supported "params" attributes are:
 * <ul>
 * <li>str - to set a string as a value</li>
 * <li>hex - to set a hexadecimal string as a value</li>
 * <li>obj - to set a encapsulated ASN.1 value by JSON object
 * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
 * </ul>
 * NOTE: A parameter 'obj' have been supported
 * for "OCTET STRING, encapsulates" structure.
 * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
 * @see KJUR.asn1.DERAbstractString - superclass
 * @example
 * // default constructor
 * o = new KJUR.asn1.DEROctetString();
 * // initialize with string
 * o = new KJUR.asn1.DEROctetString({str: "aaa"});
 * // initialize with hexadecimal string
 * o = new KJUR.asn1.DEROctetString({hex: "616161"});
 * // initialize with ASN1Util.newObject argument
 * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
 * // above generates a ASN.1 data like this:
 * // OCTET STRING, encapsulates {
 * //   SEQUENCE {
 * //     INTEGER 3
 * //     PrintableString 'aaa'
 * //     }
 * //   }
 */
KJUR.asn1.DEROctetString = function (params) {
  if (params !== undefined && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = o.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
  this.hT = "04";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER Null
 * @name KJUR.asn1.DERNull
 * @class class for ASN.1 DER Null
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERNull = function () {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER ObjectIdentifier
 * @name KJUR.asn1.DERObjectIdentifier
 * @class class for ASN.1 DER ObjectIdentifier
 * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERObjectIdentifier = function (params) {
  var itox = function (i) {
    var h = i.toString(16);
    if (h.length == 1) h = '0' + h;
    return h;
  };
  var roidtox = function (roid) {
    var h = '';
    var bi = new _jsbn.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7) padLen = 0;
    var bPad = '';
    for (var i = 0; i < padLen; i++) bPad += '0';
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
      var b8 = b.substr(i, 7);
      if (i != b.length - 7) b8 = '1' + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
  };
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  /**
   * set value by a hexadecimal string
   * @name setValueHex
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} newHexString hexadecimal value of OID bytes
   */
  this.setValueHex = function (newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  /**
   * set value by a OID string<br/>
   * @name setValueOidString
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} oidString OID string (ex. 2.5.4.13)
   * @example
   * o = new KJUR.asn1.DERObjectIdentifier();
   * o.setValueOidString("2.5.4.13");
   */
  this.setValueOidString = function (oidString) {
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h;
  };
  /**
   * set value by a OID name
   * @name setValueName
   * @memberOf KJUR.asn1.DERObjectIdentifier#
   * @function
   * @param {String} oidName OID name (ex. 'serverAuth')
   * @since 1.0.1
   * @description
   * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
   * Otherwise raise error.
   * @example
   * o = new KJUR.asn1.DERObjectIdentifier();
   * o.setValueName("serverAuth");
   */
  this.setValueName = function (oidName) {
    var oid = KJUR.asn1.x509.OID.name2oid(oidName);
    if (oid !== '') {
      this.setValueOidString(oid);
    } else {
      throw "DERObjectIdentifier oidName undefined: " + oidName;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (params !== undefined) {
    if (typeof params === "string") {
      if (params.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(params);
      } else {
        this.setValueName(params);
      }
    } else if (params.oid !== undefined) {
      this.setValueOidString(params.oid);
    } else if (params.hex !== undefined) {
      this.setValueHex(params.hex);
    } else if (params.name !== undefined) {
      this.setValueName(params.name);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER Enumerated
 * @name KJUR.asn1.DEREnumerated
 * @class class for ASN.1 DER Enumerated
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * @example
 * new KJUR.asn1.DEREnumerated(123);
 * new KJUR.asn1.DEREnumerated({int: 123});
 * new KJUR.asn1.DEREnumerated({hex: '1fad'});
 */
KJUR.asn1.DEREnumerated = function (params) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  /**
   * set value by Tom Wu's BigInteger object
   * @name setByBigInteger
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {BigInteger} bigIntegerValue to set
   */
  this.setByBigInteger = function (bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  /**
   * set value by integer value
   * @name setByInteger
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {Integer} integer value to set
   */
  this.setByInteger = function (intValue) {
    var bi = new _jsbn.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  /**
   * set value by integer value
   * @name setValueHex
   * @memberOf KJUR.asn1.DEREnumerated#
   * @function
   * @param {String} hexadecimal string of integer value
   * @description
   * <br/>
   * NOTE: Value shall be represented by minimum octet length of
   * two's complement representation.
   */
  this.setValueHex = function (newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['int'] != "undefined") {
      this.setByInteger(params['int']);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params['hex'] != "undefined") {
      this.setValueHex(params['hex']);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
// ********************************************************************
/**
 * class for ASN.1 DER UTF8String
 * @name KJUR.asn1.DERUTF8String
 * @class class for ASN.1 DER UTF8String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERUTF8String = function (params) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
  this.hT = "0c";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER NumericString
 * @name KJUR.asn1.DERNumericString
 * @class class for ASN.1 DER NumericString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERNumericString = function (params) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
  this.hT = "12";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER PrintableString
 * @name KJUR.asn1.DERPrintableString
 * @class class for ASN.1 DER PrintableString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERPrintableString = function (params) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
  this.hT = "13";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER TeletexString
 * @name KJUR.asn1.DERTeletexString
 * @class class for ASN.1 DER TeletexString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERTeletexString = function (params) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
  this.hT = "14";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER IA5String
 * @name KJUR.asn1.DERIA5String
 * @class class for ASN.1 DER IA5String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERIA5String = function (params) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
  this.hT = "16";
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
// ********************************************************************
/**
 * class for ASN.1 DER UTCTime
 * @name KJUR.asn1.DERUTCTime
 * @class class for ASN.1 DER UTCTime
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * <h4>EXAMPLES</h4>
 * @example
 * d1 = new KJUR.asn1.DERUTCTime();
 * d1.setString('130430125959Z');
 *
 * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
 * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
 * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
 */
KJUR.asn1.DERUTCTime = function (params) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
  this.hT = "17";
  /**
   * set value by a Date object<br/>
   * @name setByDate
   * @memberOf KJUR.asn1.DERUTCTime#
   * @function
   * @param {Date} dateObject Date object to set ASN.1 value(V)
   * @example
   * o = new KJUR.asn1.DERUTCTime();
   * o.setByDate(new Date("2016/12/31"));
   */
  this.setByDate = function (dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'utc');
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
      this.date = new Date();
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== undefined) {
    if (params.str !== undefined) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
      this.setString(params);
    } else if (params.hex !== undefined) {
      this.setStringHex(params.hex);
    } else if (params.date !== undefined) {
      this.setByDate(params.date);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
// ********************************************************************
/**
 * class for ASN.1 DER GeneralizedTime
 * @name KJUR.asn1.DERGeneralizedTime
 * @class class for ASN.1 DER GeneralizedTime
 * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
 * @property {Boolean} withMillis flag to show milliseconds or not
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
 * </ul>
 * NOTE1: 'params' can be omitted.
 * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
 */
KJUR.asn1.DERGeneralizedTime = function (params) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
  this.hT = "18";
  this.withMillis = false;
  /**
   * set value by a Date object
   * @name setByDate
   * @memberOf KJUR.asn1.DERGeneralizedTime#
   * @function
   * @param {Date} dateObject Date object to set ASN.1 value(V)
   * @example
   * When you specify UTC time, use 'Date.UTC' method like this:<br/>
   * o1 = new DERUTCTime();
   * o1.setByDate(date);
   *
   * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
   */
  this.setByDate = function (dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, 'gen', this.withMillis);
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (this.date === undefined && this.s === undefined) {
      this.date = new Date();
      this.s = this.formatDate(this.date, 'gen', this.withMillis);
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== undefined) {
    if (params.str !== undefined) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
      this.setString(params);
    } else if (params.hex !== undefined) {
      this.setStringHex(params.hex);
    } else if (params.date !== undefined) {
      this.setByDate(params.date);
    }
    if (params.millis === true) {
      this.withMillis = true;
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
// ********************************************************************
/**
 * class for ASN.1 DER Sequence
 * @name KJUR.asn1.DERSequence
 * @class class for ASN.1 DER Sequence
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSequence = function (params) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
  this.hT = "30";
  this.getFreshValueHex = function () {
    var h = '';
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
  };
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
// ********************************************************************
/**
 * class for ASN.1 DER Set
 * @name KJUR.asn1.DERSet
 * @class class for ASN.1 DER Set
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
 * </ul>
 * NOTE1: 'params' can be omitted.<br/>
 * NOTE2: sortflag is supported since 1.0.5.
 */
KJUR.asn1.DERSet = function (params) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, params);
  this.hT = "31";
  this.sortFlag = true; // item shall be sorted only in ASN.1 DER
  this.getFreshValueHex = function () {
    var a = new Array();
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      a.push(asn1Obj.getEncodedHex());
    }
    if (this.sortFlag == true) a.sort();
    this.hV = a.join('');
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params.sortflag != "undefined" && params.sortflag == false) this.sortFlag = false;
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
// ********************************************************************
/**
 * class for ASN.1 DER TaggedObject
 * @name KJUR.asn1.DERTaggedObject
 * @class class for ASN.1 DER TaggedObject
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
 * For example, if you find '[1]' tag in a ASN.1 dump,
 * 'tagNoHex' will be 'a1'.
 * <br/>
 * As for optional argument 'params' for constructor, you can specify *ANY* of
 * following properties:
 * <ul>
 * <li>explicit - specify true if this is explicit tag otherwise false
 *     (default is 'true').</li>
 * <li>tag - specify tag (default is 'a0' which means [0])</li>
 * <li>obj - specify ASN1Object which is tagged</li>
 * </ul>
 * @example
 * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
 * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
 * hex = d2.getEncodedHex();
 */
KJUR.asn1.DERTaggedObject = function (params) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  this.hT = "a0";
  this.hV = '';
  this.isExplicit = true;
  this.asn1Object = null;
  /**
   * set value by an ASN1Object
   * @name setString
   * @memberOf KJUR.asn1.DERTaggedObject#
   * @function
   * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
   * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
   * @param {ASN1Object} asn1Object ASN.1 to encapsulate
   */
  this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
    this.hT = tagNoHex;
    this.isExplicit = isExplicitFlag;
    this.asn1Object = asn1Object;
    if (this.isExplicit) {
      this.hV = this.asn1Object.getEncodedHex();
      this.hTLV = null;
      this.isModified = true;
    } else {
      this.hV = null;
      this.hTLV = asn1Object.getEncodedHex();
      this.hTLV = this.hTLV.replace(/^../, tagNoHex);
      this.isModified = false;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params['tag'] != "undefined") {
      this.hT = params['tag'];
    }
    if (typeof params['explicit'] != "undefined") {
      this.isExplicit = params['explicit'];
    }
    if (typeof params['obj'] != "undefined") {
      this.asn1Object = params['obj'];
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
_yahoo.YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

/***/ }),

/***/ "./src/Common/libs/jsencrypt/lib/lib/jsrsasign/yahoo.js":
/*!**************************************************************!*\
  !*** ./src/Common/libs/jsencrypt/lib/lib/jsrsasign/yahoo.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.YAHOO = void 0;
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var YAHOO = exports.YAHOO = {};
YAHOO.lang = {
  /**
   * Utility to set up the prototype, constructor and superclass properties to
   * support an inheritance strategy that can chain constructors and methods.
   * Static members will not be inherited.
   *
   * @method extend
   * @static
   * @param {Function} subc   the object to modify
   * @param {Function} superc the object to inherit
   * @param {Object} overrides  additional properties/methods to add to the
   *                              subclass prototype.  These will override the
   *                              matching items obtained from the superclass
   *                              if present.
   */
  extend: function (subc, superc, overrides) {
    if (!superc || !subc) {
      throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");
    }
    var F = function () {};
    F.prototype = superc.prototype;
    subc.prototype = new F();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
      superc.prototype.constructor = superc;
    }
    if (overrides) {
      var i;
      for (i in overrides) {
        subc.prototype[i] = overrides[i];
      }
      /*
       * IE will not enumerate native functions in a derived object even if the
       * function was overridden.  This is a workaround for specific functions
       * we care about on the Object prototype.
       * @property _IEEnumFix
       * @param {Function} r  the object to receive the augmentation
       * @param {Function} s  the object that supplies the properties to augment
       * @static
       * @private
       */
      var _IEEnumFix = function () {},
        ADD = ["toString", "valueOf"];
      try {
        if (/MSIE/.test(navigator.userAgent)) {
          _IEEnumFix = function (r, s) {
            for (i = 0; i < ADD.length; i = i + 1) {
              var fname = ADD[i],
                f = s[fname];
              if (typeof f === 'function' && f != Object.prototype[fname]) {
                r[fname] = f;
              }
            }
          };
        }
      } catch (ex) {}
      ;
      _IEEnumFix(subc.prototype, overrides);
    }
  }
};

/***/ }),

/***/ "./src/Common/libs/umeng/umenganalysis.es.min.js":
/*!*******************************************************!*\
  !*** ./src/Common/libs/umeng/umenganalysis.es.min.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.device"));
var _system3 = _interopRequireDefault($app_require$("@app-module/system.network"));
var _system4 = _interopRequireDefault($app_require$("@app-module/system.router"));
var _system5 = _interopRequireDefault($app_require$("@app-module/system.app"));
var _system6 = _interopRequireDefault($app_require$("@app-module/system.fetch"));
var _system7 = _interopRequireDefault($app_require$("@app-module/system.file"));
var _system8 = _interopRequireDefault($app_require$("@app-module/system.request"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function buildUniqueId(t) {
  const e = [];
  e.push(DeviceUtil.getAdvertisingId()), e.push(DeviceUtil.getAndroidId()), e.push(DeviceUtil.getOAID()), Promise.all(e).then(e => {
    const n = e[0];
    const o = e[1];
    const i = e[2];
    StorageUtil.putData(constants.MOBILE_ADVERTISING_ID, n);
    StorageUtil.putData(constants.MOBILE_ANDROID_ID, o);
    StorageUtil.putData(constants.MOBILE_OAID, i);
    uniqueidCache = o || n || i;
    StorageUtil.putData("umeng_uniqueid", uniqueidCache);
    t(uniqueidCache);
  });
}
function createCommonjsModule(t, e) {
  return e = {
    exports: {}
  }, t(e, e.exports), e.exports;
}
function MD5$1(t) {
  return MD5(t);
}
function encode(t) {
  return Base64_2.encode(t, !1);
}
function decode(t) {
  return Base64_2.decode(t);
}
function checkEmptyArgument(t) {
  return t.length && this.checkId(t[0]);
}
function checkId(t) {
  return t && "string" == typeof t;
}
function toStr(t) {
  let e = "";
  if (t) try {
    e = JSON.stringify(t);
  } catch (t) {}
  return e;
}
function stringToArray(t) {
  if (t) try {
    return JSON.parse(t);
  } catch (t) {}
  return [];
}
function toObject(t) {
  if (t) try {
    return JSON.parse(t);
  } catch (t) {}
  return null;
}
function checkAttrOrString(t) {
  return !(!t || "string" != typeof t && ("object" != typeof t || isArray(t)));
}
function isArray(t) {
  return "[object Array]" === {}.toString.call(t);
}
function isNotANumber(t) {
  return !isNaN(parseInt(t, 10));
}
function checkMD5(t, e) {
  try {
    return t === MD5(e);
  } catch (t) {
    return !1;
  }
}
function Looper() {}
function send(t) {
  _system3.default.getType({
    success(e) {
      "none" !== e.type && hasEnvelope(t, (e, n) => {
        if (e) {
          if (n) {
            const e = {
              md5Key: n,
              type: "second"
            };
            RequestHelper.getInstance().send(e, () => {
              StoreQueue.getInstance().handleMessage(null);
              realSend(t);
            });
          }
        } else realSend(t);
      });
    },
    fail() {}
  });
}
function hasEnvelope(t, e) {
  StorageUtil.getData(constants.KEY_NO_SEND_REQUEST_KEYS, n => {
    if (!n) return void e(!1, null);
    const o = UmengUtils.stringToArray(n);
    if (!o || 0 === o.length) return void e(!1, null);
    for (const n in o) if ({}.hasOwnProperty.call(o, n)) {
      const i = o[n];
      if (i) {
        const n = i.indexOf(constants.KEY_EVENT_PREFIX);
        if (0 === n && t === constants.REQUEST_TYPE_EVENT) return void e(!0, i);
        const o = i.indexOf(constants.KEY_HALF_SESSION_PREFIX);
        if (0 === o && t === constants.REQUEST_TYPE_SESSION_HALF) return void e(!0, i);
        const r = i.indexOf(constants.KEY_CLOSE_SESSION_PREFIX);
        if (0 === r && t === constants.REQUEST_TYPE_SESSION_CLOSE) return void e(!0, i);
      }
    }
    e(!1, null);
  });
}
function realSend(t) {
  if (RequestHelper.getInstance().paramsIsValid(t)) if (t === constants.REQUEST_TYPE_SESSION_HALF) {
    const e = RequestHelper.getInstance().buildSendContent(t, null),
      n = e.data;
    n.analytics && RequestHelper.getInstance().send(e, t => {
      t && -1 !== t.indexOf(constants.KEY_HALF_SESSION_PREFIX) && (Header.getInstance().setFirstSendFlag(), StorageUtil.putData(constants.APP_FIRST_OPEN_FLAG, "false"));
    });
  } else if (t === constants.REQUEST_TYPE_SESSION_CLOSE) {
    const e = RequestHelper.getInstance().buildSendContent(t, null);
    if (e && e.data) {
      const t = e.data;
      t.analytics && RequestHelper.getInstance().send(e);
    }
  } else t === constants.REQUEST_TYPE_EVENT && EventStoreQueue.getInstance().readEkvDatas(e => {
    if (!e || 0 === e.length) return;
    const n = RequestHelper.getInstance().buildSendContent(t, e);
    if (n) {
      const t = n.data;
      t.analytics && (RequestHelper.getInstance().send(n), EventController.getInstance().setSendTime());
    }
  });
}
function sendAll() {
  if (0 === time) {
    time = 10;
    const t = setInterval(() => {
      time -= 1;
      0 === time && clearInterval(t);
    }, 100);
    Header.getInstance().getHeader() ? (send(constants.REQUEST_TYPE_SESSION_HALF), send(constants.REQUEST_TYPE_SESSION_CLOSE), send(constants.REQUEST_TYPE_EVENT)) : setTimeout(sendAll, 100);
  }
}
function PageController() {
  this._pagelist = [], this._currentPage = {}, this.pageObject = {};
}
function UmengAnalysisLib() {
  this.pageController = new PageController();
}
function isInit() {
  return !!inited || (console.error("[app.ux] ==> onCreate not invoked init() method"), !1);
}
function sendDatas() {
  Header.getInstance().getHeader() ? (Request.send(constants.REQUEST_TYPE_SESSION_HALF), Request.send(constants.REQUEST_TYPE_SESSION_CLOSE), StorageUtil.getData(constants.EVENT_SEND_REPORT_POLICY, t => {
    t === constants.EVENT_SEND_REPORT_POLICY_START_SEND_VALUE && Request.send(constants.REQUEST_TYPE_EVENT);
  })) : setTimeout(sendDatas, 100);
}
function SdkUpdater() {
  this.url = constants.SDK_UPDATE_SERVER_ADDRESS;
}
function Page(t) {
  if (t) {
    const e = t.onShow;
    t.onShow = function (...t) {
      try {
        UmengAnalysis.resume(this);
      } catch (t) {}
      if (e) return e.apply(this, t);
    };
    const n = t.onHide;
    t.onHide = function (...t) {
      try {
        UmengAnalysis.pause(this);
      } catch (t) {}
      if (n) return n.apply(this, t);
    };
  }
  return t;
}
const StorageUtil = {
    putData(t, e, n, o) {
      _system.default.set({
        key: t,
        value: e,
        success(t) {
          n && n(t);
        },
        fail(t, e) {
          o && o(t, e);
        }
      });
    },
    getData(t, e, n) {
      _system.default.get({
        key: t,
        success(t) {
          e && e(t);
        },
        fail(t, e) {
          n && n(t, e);
        }
      });
    },
    deleteData(t, e) {
      _system.default.delete({
        key: t,
        success() {
          e && e(!0);
        },
        fail() {
          e && e(!1);
        }
      });
    }
  },
  constants = {
    KEY_NO_SEND_REQUEST_KEYS: "umeng_key_no_send_request",
    SESSION_INTERVAL: 3e4,
    TEST_URL: "https://preulogs.umeng.com/unify_logs",
    RELEASE_URL: "https://ulogs.umeng.com/unify_logs",
    KEY_SESSION_PREFIX: "umeng_session_prefix_",
    KEY_EVENT_PREFIX: "umeng_event_prefix_",
    KEY_HALF_SESSION_PREFIX: "umeng_half_session_prefix_",
    KEY_CLOSE_SESSION_PREFIX: "umeng_close_session_prefix_",
    REQUEST_TYPE_SESSION_HALF: 1,
    REQUEST_TYPE_SESSION_CLOSE: 2,
    REQUEST_TYPE_EVENT: 3,
    IS_DEBUG: !1,
    SDK_VERSION: "2.0.3",
    APP_FIRST_OPEN_FLAG: "umeng_key_first_open_flag",
    MOBILE_ADVERTISING_ID: "umeng_mobile_advertising_id",
    MOBILE_ANDROID_ID: "umeng_android__id",
    MOBILE_OAID: "umeng_oaid",
    EVENT_SEND_MIN_INTERVAL: 90,
    EVENT_SEND_MAX_INTERVAL: 86400,
    EVENT_LAST_SEND_TIME: "umeng_ekv_last_send_time",
    EVENT_SEND_REPORT_POLICY: "event_send_report_policy",
    EVENT_SEND_REPORT_INTERVAL_TIME: "event_send_report_interval_time",
    EVENT_SEND_REPORT_POLICY_START_SEND_VALUE: "1",
    EVENT_SEND_REPORT_POLICY_INTERVAL_VALUE: "6",
    DOWNLOAD_FILE_FIRST_CACHE: "umeng_sdk_update_firstCacheLevel",
    DOWNLOAD_FILE_SECOND_CACHE: "umeng_sdk_update_secondCacheLevel",
    SDK_UPDATE_SERVER_ADDRESS: "http://s.cnzz.com/sdk/quickapp",
    SDK_UPDATE_LOCAL_STORAGE_PATH: "internal://files/umengsdk/"
  };
let oaidCache = null,
  androididCache = null,
  idfaCache = null,
  uniqueidCache = null,
  deviceInfoCache = null;
const DeviceUtil = {
    getBaseInfo() {
      return new Promise(t => {
        if (deviceInfoCache) return void t(deviceInfoCache);
        _system2.default.getInfo({
          success(e) {
            deviceInfoCache = e, t(e);
          },
          fail() {
            t(null);
          }
        });
      });
    },
    getNetworkInfo(t) {
      _system3.default.getType({
        success(e) {
          t(e);
        }
      });
    },
    getAndroidId() {
      return new Promise(t => {
        if (androididCache) return void t(androididCache.userId);
        _system2.default.getUserId({
          success(e) {
            androididCache = e, t(e.userId);
          },
          fail() {
            t("");
          }
        });
      });
    },
    getAdvertisingId() {
      return new Promise(t => {
        if (idfaCache) return void t(idfaCache.advertisingId);
        _system2.default.getAdvertisingId({
          success(e) {
            idfaCache = e, t(e.advertisingId);
          },
          fail() {
            t("");
          }
        });
      });
    },
    getOAID() {
      return console.log("call getOAID"), new Promise(t => {
        if (null !== oaidCache) return void t(oaidCache.oaid);
        "function" != typeof _system2.default.getOAID || !1 === _system2.default.allowTrackOAID ? t("") : _system2.default.getOAID({
          success(e) {
            oaidCache = e, t(e.oaid);
          },
          fail() {
            t("");
          }
        });
      });
    },
    getUniqueId() {
      return new Promise(t => {
        uniqueidCache ? t(uniqueidCache) : buildUniqueId(t);
      });
    },
    getPageName() {
      try {
        const t = _system4.default.getState();
        return t.name;
      } catch (t) {}
    },
    getSystemBaseInfo(t, e) {
      if (deviceInfoCache) return void (t && t(deviceInfoCache));
      _system2.default.getInfo({
        success(e) {
          deviceInfoCache = e, t && t(e);
        },
        fail(t, n) {
          e && e(t, n);
        }
      });
    }
  },
  Log = {
    d(t) {},
    i(t) {
      try {
        userDebug && console.info(t);
      } catch (t) {}
    },
    e(t) {},
    w(t) {},
    v(t) {}
  };
var commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
  MD5 = createCommonjsModule(function (t) {
    !function (e) {
      function n(t, e) {
        var n = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
      }
      function o(t, e) {
        return t << e | t >>> 32 - e;
      }
      function i(t, e, i, r, s, c) {
        return n(o(n(n(e, t), n(r, c)), s), i);
      }
      function r(t, e, n, o, r, s, c) {
        return i(e & n | ~e & o, t, e, r, s, c);
      }
      function s(t, e, n, o, r, s, c) {
        return i(e & o | n & ~o, t, e, r, s, c);
      }
      function c(t, e, n, o, r, s, c) {
        return i(e ^ n ^ o, t, e, r, s, c);
      }
      function a(t, e, n, o, r, s, c) {
        return i(n ^ (e | ~o), t, e, r, s, c);
      }
      function u(t, e) {
        t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
        var o,
          i,
          u,
          f,
          l,
          _ = 1732584193,
          E = -271733879,
          g = -1732584194,
          d = 271733878;
        for (o = 0; o < t.length; o += 16) i = _, u = E, f = g, l = d, E = a(E = a(E = a(E = a(E = c(E = c(E = c(E = c(E = s(E = s(E = s(E = s(E = r(E = r(E = r(E = r(E, g = r(g, d = r(d, _ = r(_, E, g, d, t[o], 7, -680876936), E, g, t[o + 1], 12, -389564586), _, E, t[o + 2], 17, 606105819), d, _, t[o + 3], 22, -1044525330), g = r(g, d = r(d, _ = r(_, E, g, d, t[o + 4], 7, -176418897), E, g, t[o + 5], 12, 1200080426), _, E, t[o + 6], 17, -1473231341), d, _, t[o + 7], 22, -45705983), g = r(g, d = r(d, _ = r(_, E, g, d, t[o + 8], 7, 1770035416), E, g, t[o + 9], 12, -1958414417), _, E, t[o + 10], 17, -42063), d, _, t[o + 11], 22, -1990404162), g = r(g, d = r(d, _ = r(_, E, g, d, t[o + 12], 7, 1804603682), E, g, t[o + 13], 12, -40341101), _, E, t[o + 14], 17, -1502002290), d, _, t[o + 15], 22, 1236535329), g = s(g, d = s(d, _ = s(_, E, g, d, t[o + 1], 5, -165796510), E, g, t[o + 6], 9, -1069501632), _, E, t[o + 11], 14, 643717713), d, _, t[o], 20, -373897302), g = s(g, d = s(d, _ = s(_, E, g, d, t[o + 5], 5, -701558691), E, g, t[o + 10], 9, 38016083), _, E, t[o + 15], 14, -660478335), d, _, t[o + 4], 20, -405537848), g = s(g, d = s(d, _ = s(_, E, g, d, t[o + 9], 5, 568446438), E, g, t[o + 14], 9, -1019803690), _, E, t[o + 3], 14, -187363961), d, _, t[o + 8], 20, 1163531501), g = s(g, d = s(d, _ = s(_, E, g, d, t[o + 13], 5, -1444681467), E, g, t[o + 2], 9, -51403784), _, E, t[o + 7], 14, 1735328473), d, _, t[o + 12], 20, -1926607734), g = c(g, d = c(d, _ = c(_, E, g, d, t[o + 5], 4, -378558), E, g, t[o + 8], 11, -2022574463), _, E, t[o + 11], 16, 1839030562), d, _, t[o + 14], 23, -35309556), g = c(g, d = c(d, _ = c(_, E, g, d, t[o + 1], 4, -1530992060), E, g, t[o + 4], 11, 1272893353), _, E, t[o + 7], 16, -155497632), d, _, t[o + 10], 23, -1094730640), g = c(g, d = c(d, _ = c(_, E, g, d, t[o + 13], 4, 681279174), E, g, t[o], 11, -358537222), _, E, t[o + 3], 16, -722521979), d, _, t[o + 6], 23, 76029189), g = c(g, d = c(d, _ = c(_, E, g, d, t[o + 9], 4, -640364487), E, g, t[o + 12], 11, -421815835), _, E, t[o + 15], 16, 530742520), d, _, t[o + 2], 23, -995338651), g = a(g, d = a(d, _ = a(_, E, g, d, t[o], 6, -198630844), E, g, t[o + 7], 10, 1126891415), _, E, t[o + 14], 15, -1416354905), d, _, t[o + 5], 21, -57434055), g = a(g, d = a(d, _ = a(_, E, g, d, t[o + 12], 6, 1700485571), E, g, t[o + 3], 10, -1894986606), _, E, t[o + 10], 15, -1051523), d, _, t[o + 1], 21, -2054922799), g = a(g, d = a(d, _ = a(_, E, g, d, t[o + 8], 6, 1873313359), E, g, t[o + 15], 10, -30611744), _, E, t[o + 6], 15, -1560198380), d, _, t[o + 13], 21, 1309151649), g = a(g, d = a(d, _ = a(_, E, g, d, t[o + 4], 6, -145523070), E, g, t[o + 11], 10, -1120210379), _, E, t[o + 2], 15, 718787259), d, _, t[o + 9], 21, -343485551), _ = n(_, i), E = n(E, u), g = n(g, f), d = n(d, l);
        return [_, E, g, d];
      }
      function f(t) {
        var e,
          n = "",
          o = 32 * t.length;
        for (e = 0; e < o; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
        return n;
      }
      function l(t) {
        var e,
          n = [];
        for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
        var o = 8 * t.length;
        for (e = 0; e < o; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
        return n;
      }
      function _(t) {
        return f(u(l(t), 8 * t.length));
      }
      function E(t, e) {
        var n,
          o,
          i = l(t),
          r = [],
          s = [];
        for (r[15] = s[15] = void 0, i.length > 16 && (i = u(i, 8 * t.length)), n = 0; n < 16; n += 1) r[n] = 909522486 ^ i[n], s[n] = 1549556828 ^ i[n];
        return o = u(r.concat(l(e)), 512 + 8 * e.length), f(u(s.concat(o), 640));
      }
      function g(t) {
        var e,
          n,
          o = "";
        for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), o += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
        return o;
      }
      function d(t) {
        return unescape(encodeURIComponent(t));
      }
      function S(t) {
        return _(d(t));
      }
      function h(t) {
        return g(S(t));
      }
      function p(t, e) {
        return E(d(t), d(e));
      }
      function U(t, e) {
        return g(p(t, e));
      }
      function N(t, e, n) {
        return e ? n ? p(e, t) : U(e, t) : n ? S(t) : h(t);
      }
      t.exports ? t.exports = N : e.md5 = N;
    }(commonjsGlobal);
  }),
  Base64_1 = createCommonjsModule(function (module, exports) {
    !function (global, factory) {
      module.exports = function (global) {
        var _Base64 = global.Base64,
          version = "2.4.8",
          buffer;
        if (module.exports) try {
          buffer = eval("require('buffer').Buffer");
        } catch (t) {
          buffer = void 0;
        }
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          b64tab = function (t) {
            for (var e = {}, n = 0, o = t.length; n < o; n++) e[t.charAt(n)] = n;
            return e;
          }(b64chars),
          fromCharCode = String.fromCharCode,
          cb_utob = function (t) {
            if (t.length < 2) return (e = t.charCodeAt(0)) < 128 ? t : e < 2048 ? fromCharCode(192 | e >>> 6) + fromCharCode(128 | 63 & e) : fromCharCode(224 | e >>> 12 & 15) + fromCharCode(128 | e >>> 6 & 63) + fromCharCode(128 | 63 & e);
            var e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
            return fromCharCode(240 | e >>> 18 & 7) + fromCharCode(128 | e >>> 12 & 63) + fromCharCode(128 | e >>> 6 & 63) + fromCharCode(128 | 63 & e);
          },
          re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
          utob = function (t) {
            return t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, cb_utob);
          },
          cb_encode = function (t) {
            var e = [0, 2, 1][t.length % 3],
              n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
            return [b64chars.charAt(n >>> 18), b64chars.charAt(n >>> 12 & 63), e >= 2 ? "=" : b64chars.charAt(n >>> 6 & 63), e >= 1 ? "=" : b64chars.charAt(63 & n)].join("");
          },
          btoa = global.btoa ? function (t) {
            return global.btoa(t);
          } : function (t) {
            return t.replace(/[\s\S]{1,3}/g, cb_encode);
          },
          _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (t) {
            return (t.constructor === buffer.constructor ? t : buffer.from(t)).toString("base64");
          } : function (t) {
            return (t.constructor === buffer.constructor ? t : new buffer(t)).toString("base64");
          } : function (t) {
            return btoa(utob(t));
          },
          encode = function (t, e) {
            return e ? _encode(String(t)).replace(/[+\/]/g, function (t) {
              return "+" == t ? "-" : "_";
            }).replace(/=/g, "") : _encode(String(t));
          },
          encodeURI = function (t) {
            return encode(t, !0);
          },
          re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
          cb_btou = function (t) {
            switch (t.length) {
              case 4:
                var e = ((7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3)) - 65536;
                return fromCharCode(55296 + (e >>> 10)) + fromCharCode(56320 + (1023 & e));
              case 3:
                return fromCharCode((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
              default:
                return fromCharCode((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1));
            }
          },
          btou = function (t) {
            return t.replace(re_btou, cb_btou);
          },
          cb_decode = function (t) {
            var e = t.length,
              n = e % 4,
              o = (e > 0 ? b64tab[t.charAt(0)] << 18 : 0) | (e > 1 ? b64tab[t.charAt(1)] << 12 : 0) | (e > 2 ? b64tab[t.charAt(2)] << 6 : 0) | (e > 3 ? b64tab[t.charAt(3)] : 0),
              i = [fromCharCode(o >>> 16), fromCharCode(o >>> 8 & 255), fromCharCode(255 & o)];
            return i.length -= [0, 0, 2, 1][n], i.join("");
          },
          atob = global.atob ? function (t) {
            return global.atob(t);
          } : function (t) {
            return t.replace(/[\s\S]{1,4}/g, cb_decode);
          },
          _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (t) {
            return (t.constructor === buffer.constructor ? t : buffer.from(t, "base64")).toString();
          } : function (t) {
            return (t.constructor === buffer.constructor ? t : new buffer(t, "base64")).toString();
          } : function (t) {
            return btou(atob(t));
          },
          decode = function (t) {
            return _decode(String(t).replace(/[-_]/g, function (t) {
              return "-" == t ? "+" : "/";
            }).replace(/[^A-Za-z0-9\+\/]/g, ""));
          },
          noConflict = function () {
            var t = global.Base64;
            return global.Base64 = _Base64, t;
          };
        if (global.Base64 = {
          VERSION: "2.4.8",
          atob: atob,
          btoa: btoa,
          fromBase64: decode,
          toBase64: encode,
          utob: utob,
          encode: encode,
          encodeURI: encodeURI,
          btou: btou,
          decode: decode,
          noConflict: noConflict,
          __buffer__: buffer
        }, "function" == typeof Object.defineProperty) {
          var noEnum = function (t) {
            return {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            };
          };
          global.Base64.extendString = function () {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function () {
              return decode(this);
            })), Object.defineProperty(String.prototype, "toBase64", noEnum(function (t) {
              return encode(this, t);
            })), Object.defineProperty(String.prototype, "toBase64URI", noEnum(function () {
              return encode(this, !0);
            }));
          };
        }
        return global.Meteor && (Base64 = global.Base64), module.exports && (module.exports.Base64 = global.Base64), {
          Base64: global.Base64
        };
      }(global);
    }("undefined" != typeof self ? self : "undefined" != typeof window ? window : commonjsGlobal);
  }),
  Base64_2 = Base64_1.Base64,
  UmengUtils = {
    MD5: MD5$1,
    encode: encode,
    decode: decode,
    checkEmptyArgument: checkEmptyArgument,
    checkId: checkId,
    stringToArray: stringToArray,
    toStr: toStr,
    toObject: toObject,
    checkAttrOrString: checkAttrOrString,
    isNotANumber: isNotANumber,
    checkMD5: checkMD5
  };
const $JSON_UMENG_SESSIONS$ = "json_umeng_sessions",
  $JSON_UMENG_HALF_SESSIONS$ = "json_umeng_half_session",
  $JSON_UMENG_CURRENT_SESSION$ = "json_umeng_current_session",
  $JSON_UMENG_PAGE_END_TIME$ = "json_umeng_page_end_time",
  Session = function () {
    function t() {
      return {
        getCurrentSessionId() {
          return f;
        },
        getCurrentSession() {
          return a;
        },
        getSessions() {
          return l;
        },
        init(t) {
          this.appkey = t, o();
        },
        endSession() {
          a && (c = Date.now(), a.end_time = c, StorageUtil.putData($JSON_UMENG_CURRENT_SESSION$, UmengUtils.toStr(a)), StorageUtil.putData($JSON_UMENG_PAGE_END_TIME$, c));
        },
        clearSessions() {
          StorageUtil.deleteData($JSON_UMENG_SESSIONS$), l.splice(0, l.length), l = [];
        },
        setOnSessionListener(t) {
          this.sessionListener = t;
        },
        getHalfSessions() {
          return _;
        },
        clearHalfSession() {
          StorageUtil.deleteData($JSON_UMENG_HALF_SESSIONS$), _.splice(0, _.length), _ = [];
        }
      };
    }
    function e(t, e) {
      const n = Date.now();
      DeviceUtil.getUniqueId().then(t => {
        const o = UmengUtils.MD5(`${n}:::${Session.getInstance().appkey}:::${t}`);
        e(o);
      });
    }
    function n(t) {
      const e = {};
      return e.id = t, e.start_time = Date.now(), e;
    }
    function o() {
      const t = Date.now();
      a ? c && t - c > constants.SESSION_INTERVAL && (i(c), r(a)) : StorageUtil.getData($JSON_UMENG_CURRENT_SESSION$, e => {
        e && (a = UmengUtils.toObject(e)) ? StorageUtil.getData($JSON_UMENG_PAGE_END_TIME$, e => {
          e && t - e > constants.SESSION_INTERVAL ? (i(e), r(a)) : f = a.id;
        }) : r(null);
      });
    }
    function i(t) {
      try {
        a.end_time = parseInt(t, 10);
      } catch (e) {
        a.end_time = t;
      }
      const e = t - a.start_time;
      a.duration = e;
    }
    function r(t) {
      const o = t ? t.id : "",
        i = Session.getInstance().sessionListener(o);
      e(o, e => {
        a = n(e);
        StorageUtil.getData($JSON_UMENG_SESSIONS$, n => {
          l = UmengUtils.stringToArray(n);
          t ? i.pages(n => {
            n && n.length > 0 && (t.pages = n, t.$page_num = n.length);
            l.push(t);
            StorageUtil.putData($JSON_UMENG_SESSIONS$, UmengUtils.toStr(l));
            s(i, e);
          }) : s(i, e);
        });
        StorageUtil.putData($JSON_UMENG_CURRENT_SESSION$, UmengUtils.toStr(a));
        f = e;
      });
    }
    function s(t, e) {
      StorageUtil.getData($JSON_UMENG_HALF_SESSIONS$, n => {
        _ = UmengUtils.stringToArray(n);
        a && (_.push(JSON.parse(JSON.stringify(a))), StorageUtil.putData($JSON_UMENG_HALF_SESSIONS$, UmengUtils.toStr(_)), t.generateSessionAfterHandler(e));
      });
    }
    let c,
      a,
      u = null,
      f = "",
      l = [],
      _ = [];
    return {
      getInstance() {
        return u || (u = t()), u;
      }
    };
  }(),
  $JSON_UMENG_HEADER$ = "json_umeng_header",
  $UMENG_KEY_IMPRINT$ = "umeng_key_imprint",
  MOBILE_NETWORK_2G = "2g",
  MOBILE_NETWORK_3G = "3g",
  MOBILE_NETWORK_4G = "4g",
  MOBILE_NETWORK_NONE = "none",
  BLANK_SPACE = " ",
  UMENG_ADVERTISTING_ID = "idfa",
  UMENG_ANDROID_ID = "android_id",
  UMENG_OAID = "oaid",
  Header = function () {
    function t() {
      return {
        init(t) {
          this.appkey = t, this.appInfo = _system5.default.getInfo(), e(t => {
            this.header = t;
            StorageUtil.putData($JSON_UMENG_HEADER$, UmengUtils.toStr(t));
          });
        },
        getHeader(t) {
          switch (t) {
            case constants.REQUEST_TYPE_SESSION_HALF:
              this.header.st = "1", !0 === s && delete this.header.atm;
              break;
            case constants.REQUEST_TYPE_SESSION_CLOSE:
            case constants.REQUEST_TYPE_EVENT:
              delete this.header.st, delete this.header.atm;
          }
          return this.header;
        },
        addHeaderAttr(t, e) {
          this.header && (this.header[t] = e);
        },
        getHeaderAttr(t) {
          return this.header && {}.hasOwnProperty.call(this.header, t) ? this.header[t] : null;
        },
        getPackageName() {
          try {
            return this.appInfo.packageName;
          } catch (t) {}
          return "";
        },
        setFirstSendFlag() {
          s = !0;
        }
      };
    }
    function e(t) {
      DeviceUtil.getBaseInfo().then(e => {
        DeviceUtil.getUniqueId().then(r => {
          DeviceUtil.getNetworkInfo(s => {
            let {
              type: type
            } = s;
            type === MOBILE_NETWORK_NONE && (type = "unknown");
            const c = i(e, r, type);
            StorageUtil.getData($UMENG_KEY_IMPRINT$, e => {
              0 !== e.length && (c.imprint = e);
              StorageUtil.getData(constants.APP_FIRST_OPEN_FLAG, e => {
                const i = "true" === e;
                let r = new Date();
                i && (r = new Date(), c.atm = "1");
                console.log(r);
                StorageUtil.getData(constants.MOBILE_ADVERTISING_ID, e => {
                  if (e) {
                    const t = n(e);
                    if (t) {
                      const e = o(UMENG_ADVERTISTING_ID, t);
                      c.id_tracking = e;
                    }
                  }
                  StorageUtil.getData(constants.MOBILE_ANDROID_ID, e => {
                    if (e) {
                      const t = n(e);
                      if (t) if (c.id_tracking && c.id_tracking.snapshots) c.id_tracking.snapshots[UMENG_ANDROID_ID] = t;else {
                        const e = o(UMENG_ANDROID_ID, t);
                        c.id_tracking = e;
                      }
                    }
                    StorageUtil.getData(constants.MOBILE_OAID, e => {
                      if (e) {
                        const t = n(e);
                        if (t) if (c.id_tracking && c.id_tracking.snapshots) c.id_tracking.snapshots[UMENG_OAID] = t;else {
                          const e = o(UMENG_OAID, t);
                          c.id_tracking = e;
                        }
                      }
                      t(c);
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
    function n(t) {
      if (t) {
        const e = {
          identity: t,
          version: 1,
          ts: Date.now()
        };
        return e;
      }
    }
    function o(t, e) {
      const n = {
        snapshots: {}
      };
      return n.snapshots[t] = e, n;
    }
    function i(t, e, n) {
      let o = null;
      if (t) {
        const n = t.screenWidth,
          i = t.screenHeight,
          s = n > i ? `${n}*${i}` : `${i}*${n}`,
          {
            appInfo: appInfo
          } = r,
          {
            model: model,
            brand: brand
          } = t,
          c = brand.toLowerCase();
        o = {
          app_version: appInfo.versionName,
          version_code: appInfo.versionCode,
          app_source_extra: appInfo.source.extra,
          device_type: "Phone",
          package_name: appInfo.packageName,
          sdk_type: "Android",
          os: "Android",
          sdk_version: constants.SDK_VERSION,
          appkey: r.appkey,
          device_model: model.toLowerCase().indexOf(c) > -1 ? model : c + BLANK_SPACE + model,
          device_brand: brand,
          channel: c,
          device_manufacturer: t.manufacturer,
          device_manuid: model.toLowerCase().indexOf(c) > -1 ? model : c + BLANK_SPACE + model,
          device_name: t.product.toLowerCase().indexOf(c) > -1 ? t.product : c + BLANK_SPACE + t.product,
          os_version: t.osVersionName,
          resolution: s,
          language: t.language,
          display_name: t.name,
          idmd5: UmengUtils.MD5(e),
          platform: "quickapp",
          pro_ver: "1"
        };
      } else o = {
        app_version: r.appInfo.versionName,
        version_code: r.appInfo.versionCode,
        device_type: "Phone",
        package_name: r.appInfo.packageName,
        sdk_type: "Android",
        os: "Android",
        sdk_version: constants.SDK_VERSION,
        appkey: r.appkey,
        idmd5: UmengUtils.MD5(e),
        platform: "quickapp",
        pro_ver: "1"
      };
      switch (n) {
        case MOBILE_NETWORK_4G:
          o.access_subtype = "LTE", o.access = "2G/3G";
          break;
        case MOBILE_NETWORK_3G:
          o.access_subtype = "CDMA", o.access = "2G/3G";
          break;
        case MOBILE_NETWORK_2G:
          o.access_subtype = "GRPS", o.access = "2G/3G";
          break;
        default:
          o.access = n, delete o.access_subtype;
      }
      return o;
    }
    let r = null,
      s = !1;
    return {
      getInstance() {
        return r || (r = t()), r;
      }
    };
  }();
Looper.prototype = {
  prepare(t) {
    this.queueObject = t, this.isRunning = !1, this.isForceStop = !1;
  },
  loop() {
    if (!this.isForceStop && this.queueObject && !this.isRunning) for (this.isRunning = !0; this.isRunning;) {
      if (!this.queueObject.isCanPop()) {
        this.isRunning = !1;
        break;
      }
      try {
        this.queueObject.dispatchMessage();
      } catch (t) {}
    }
  },
  wait() {
    this.isRunning = !1;
  },
  forceStop() {
    this.isForceStop = !0;
  },
  cancelForceStop() {
    this.isForceStop = !1, this.loop();
  }
};
const RequestQueue = function () {
    function t(t) {
      return !!t && (f.unshift(t), u.loop(), !0);
    }
    function e() {
      if (f.length > 0) return f.pop();
      const t = l.length;
      return t > 0 ? (1 === t && RequestHelper.getInstance().clearNoSendDatas(), l.pop()) : null;
    }
    function n(t, e) {
      const n = setTimeout(() => {
          o(t);
        }, 3e4),
        i = {
          key: t,
          timeOutFun: n,
          isExe: !1
        };
      g.push(i), e(t => {
        o(t);
      });
    }
    function o(t) {
      for (let e = g.length - 1; e >= 0; e--) {
        const n = g[e];
        if (n.key === t) {
          if (!n.isExe) {
            n.isExe = !0;
            const t = n.timeOutFun;
            t && clearTimeout(t), i(), g.splice(e, 1);
          }
          break;
        }
      }
    }
    function i() {
      (E -= 1) <= _ && u.loop();
    }
    function r(t) {
      const e = g.length,
        n = t.md5Key;
      for (let t = e - 1; t >= 0; t--) {
        const e = g[t];
        if (e.key === n) return i(), !0;
      }
      return !1;
    }
    function s() {
      RequestHelper.getInstance().onNoSendDatasListener(t => {
        if (!t || 0 === t.length) return;
        for (const e in t) if ({}.hasOwnProperty.call(t, e)) {
          const n = {
            md5Key: t[e],
            type: "second"
          };
          l.push(n);
        }
        u.loop();
      });
    }
    function c() {
      return s(), {
        handleMessage(e, n) {
          e && "second" === e.type && i(), e && e.data && (e.executeFunction = n, t(e));
        },
        dispatchMessage() {
          if (E > _) return void u.wait();
          E += 1;
          const t = e();
          r(t) || (t.data ? n(t.md5Key, t.executeFunction) : RequestHelper.getInstance().send(t), this.isCanPop() || u.wait());
        },
        isCanPop() {
          return f.length > 0 || l.length > 0;
        }
      };
    }
    let a, u;
    const f = [],
      l = [],
      _ = 3;
    let E = 1;
    const g = [];
    return {
      getInstance() {
        return a || (a = c(), (u = new Looper()).prepare(a)), a;
      }
    };
  }(),
  StoreQueue = function () {
    function t(t) {
      if (!t) return !1;
      const e = {
        key: t,
        type: _
      };
      return u.unshift(e), a.loop(), !0;
    }
    function e() {
      if (u.length > 0) return u.pop();
      const t = f.length;
      if (t > 0) {
        const e = f.pop();
        return 0 === t && n(), e;
      }
      return n(), null;
    }
    function n() {
      g || (g = !0, StorageUtil.getData(constants.KEY_NO_SEND_REQUEST_KEYS, t => {
        g = !1;
        if (!t) return;
        const e = UmengUtils.stringToArray(t);
        const n = t => e => {
          e && '""' !== e || (e = {
            key: t,
            type: E
          }, f.push(e));
          f.length > 0 && a.loop();
        };
        for (const t in e) if ({}.hasOwnProperty.call(e, t)) {
          const o = e[t];
          StorageUtil.getData(o, n(o));
        }
      }, () => {
        g = !1;
      }));
    }
    function o(t) {
      StorageUtil.getData(constants.KEY_NO_SEND_REQUEST_KEYS, e => {
        e = e ? UmengUtils.toObject(e) : [];
        e.push(t);
        StorageUtil.putData(constants.KEY_NO_SEND_REQUEST_KEYS, UmengUtils.toStr(e), () => {
          r(t);
        }, () => {
          r(t);
        });
      }, () => {
        r(t);
      });
    }
    function i(t) {
      StorageUtil.getData(constants.KEY_NO_SEND_REQUEST_KEYS, e => {
        if (!e) return void r(t);
        e = UmengUtils.stringToArray(e);
        for (const n in e) if ({}.hasOwnProperty.call(e, n)) {
          const o = e[n];
          if (o === t) {
            e.splice(n, 1);
            break;
          }
        }
        StorageUtil.putData(constants.KEY_NO_SEND_REQUEST_KEYS, UmengUtils.toStr(e), () => {
          r(t);
        }, () => {
          r(t);
        });
      }, () => {
        r(t);
      });
    }
    function r() {
      (d -= 1) <= l && a.loop();
    }
    function s() {
      return n(), {
        handleMessage(e) {
          e ? t(e) : n();
        },
        dispatchMessage() {
          if (d > l) return void a.wait();
          d += 1;
          const t = e();
          if (!t || null === t) return void r();
          const {
            key: key
          } = t;
          t.type === _ ? o(key) : i(key), this.isCanPop() || a.wait();
        },
        isCanPop() {
          return u.length > 0 || f.length > 0;
        }
      };
    }
    let c, a;
    const u = [],
      f = [],
      l = 1,
      _ = "write",
      E = "delete";
    let g = !1,
      d = 1;
    return {
      getInstance() {
        return c || (c = s(), (a = new Looper()).prepare(c)), c;
      }
    };
  }(),
  $UMENG_KEY_IMPRINT$$1 = "umeng_key_imprint";
let noSendRequestKeys = [];
const RequestHelper = function () {
    function t() {
      const t = [].concat(Session.getInstance().getSessions());
      if (t && 0 !== t.length) return Session.getInstance().clearSessions(), t;
    }
    function e() {
      const t = [].concat(Session.getInstance().getHalfSessions());
      if (t && 0 !== t.length) return Session.getInstance().clearHalfSession(), t;
    }
    function n(t) {
      StorageUtil.deleteData(t, t => {
        t && StoreQueue.getInstance().handleMessage(null);
      });
    }
    function o(t, e, o, r) {
      if (!t || '""' === t) return void (o && o(e));
      const s = constants.RELEASE_URL;
      _system6.default.fetch({
        url: s,
        method: "POST",
        data: UmengUtils.encode(t),
        header: {
          "Content-Type": "quickapp/json",
          "Msg-Type": "quickapp/json"
        },
        success(t) {
          if (200 === t.code) {
            Log.i("*** umeng_sdk *** request send success"), n(e), r && r(e);
            try {
              const e = UmengUtils.toObject(t.data);
              i(e.imprint);
            } catch (t) {}
          } else 413 === t.code && (Log.i("*** umeng_sdk *** request is to large!"), n(e), r && r(e));
        },
        fail: function (t, e) {
          Log.i("*** umeng_sdk *** request error, please check your permission! ");
        },
        complete() {
          o && o(e);
        }
      });
    }
    function i(t) {
      try {
        if (t) {
          StorageUtil.putData($UMENG_KEY_IMPRINT$$1, t), Header.getInstance().addHeaderAttr("imprint", t);
          const e = UmengUtils.toObject(UmengUtils.decode(t)),
            n = e.report_policy;
          if (n && UmengUtils.isNotANumber(n)) {
            if (StorageUtil.putData(constants.EVENT_SEND_REPORT_POLICY, n), n === constants.EVENT_SEND_REPORT_POLICY_INTERVAL_VALUE) {
              let t = e.report_interval;
              t && UmengUtils.isNotANumber(t) ? (t <= constants.EVENT_SEND_MIN_INTERVAL ? t = constants.EVENT_SEND_MIN_INTERVAL : t > constants.EVENT_SEND_MAX_INTERVAL && (t = constants.EVENT_SEND_MAX_INTERVAL), StorageUtil.putData(constants.EVENT_SEND_REPORT_INTERVAL_TIME, t)) : StorageUtil.putData(constants.EVENT_SEND_REPORT_POLICY, constants.EVENT_SEND_REPORT_POLICY_START_SEND_VALUE);
            }
          } else StorageUtil.putData(constants.EVENT_SEND_REPORT_POLICY, constants.EVENT_SEND_REPORT_POLICY_START_SEND_VALUE);
        }
      } catch (t) {}
    }
    function r(t, e) {
      const n = UmengUtils.toStr(e);
      let o = null;
      switch (t) {
        case constants.REQUEST_TYPE_SESSION_HALF:
          o = constants.KEY_HALF_SESSION_PREFIX;
          break;
        case constants.REQUEST_TYPE_SESSION_CLOSE:
          o = constants.KEY_CLOSE_SESSION_PREFIX;
          break;
        case constants.REQUEST_TYPE_EVENT:
          o = constants.KEY_EVENT_PREFIX;
      }
      const i = o + UmengUtils.MD5(n);
      return StorageUtil.putData(i, n), StoreQueue.getInstance().handleMessage(i), 0 === noSendRequestKeys.length && StorageUtil.getData(constants.KEY_NO_SEND_REQUEST_KEYS, t => {
        if (!t) return;
        const e = UmengUtils.stringToArray(t);
        0 === noSendRequestKeys.length && (noSendRequestKeys = e, a && a(noSendRequestKeys));
      }), i;
    }
    function s() {
      return {
        paramsIsValid(t) {
          return -1 !== [constants.REQUEST_TYPE_SESSION_HALF, constants.REQUEST_TYPE_SESSION_CLOSE, constants.REQUEST_TYPE_EVENT].indexOf(t);
        },
        buildSendContent(n, o) {
          if (Header.getInstance().getHeader(n)) {
            const i = {
              header: Header.getInstance().getHeader(n),
              analytics: null
            };
            switch (n) {
              case constants.REQUEST_TYPE_SESSION_HALF:
                {
                  const t = e();
                  if (!t) break;
                  i.analytics = {
                    sessions: t
                  };
                  break;
                }
              case constants.REQUEST_TYPE_SESSION_CLOSE:
                {
                  const e = t();
                  if (!e) break;
                  i.analytics = {
                    sessions: e
                  };
                  break;
                }
              case constants.REQUEST_TYPE_EVENT:
                o && o.length > 0 && (i.analytics = {
                  ekv: o
                });
            }
            let s = "";
            return i.analytics && (s = r(n, i)), {
              data: i,
              md5Key: s
            };
          }
        },
        send(t, e) {
          const n = t.md5Key;
          n && ("second" === t.type ? StorageUtil.getData(n, n => {
            t.data = UmengUtils.toObject(n);
            t.data || e && e();
            RequestQueue.getInstance().handleMessage(t, n => {
              o(UmengUtils.toStr(t.data), t.md5Key, n, e);
            });
          }) : RequestQueue.getInstance().handleMessage(t, n => {
            o(UmengUtils.toStr(t.data), t.md5Key, n, e);
          }));
        },
        getNoSendRequestKeys() {
          return noSendRequestKeys;
        },
        onNoSendDatasListener(t) {
          a = t;
        },
        clearNoSendDatas() {
          noSendRequestKeys.splice(0, noSendRequestKeys.length), noSendRequestKeys = [];
        }
      };
    }
    let c, a;
    return {
      getInstance() {
        return c || (c = s()), c;
      }
    };
  }(),
  EventStoreQueue = function () {
    function t(t) {
      if (t) {
        if (!Session.getInstance().getCurrentSessionId()) return void U.unshift(t);
        p.unshift(t), p.length >= _ && g.loop();
      }
    }
    function e() {
      return p.length < _ ? null : p.splice(0, _);
    }
    function n() {
      h && h.length > 0 && s(t => {
        for (const e in h) if ({}.hasOwnProperty.call(h, e)) try {
          h[e](t);
        } catch (t) {}
      }), (d -= 1) < 1 && (d = 1), d <= E && g.loop();
    }
    function o(t, e) {
      StorageUtil.putData(u, e, () => {
        StorageUtil.putData(f, UmengUtils.toStr(t), () => {
          n();
        }, () => {
          n();
        });
      }, () => {
        n();
      });
    }
    function i(t, e) {
      t && (h[t] = e);
    }
    function r(t) {
      t && delete h[t];
    }
    function s(t) {
      StorageUtil.getData(f, e => {
        StorageUtil.deleteData(f, () => {
          const n = c(UmengUtils.stringToArray(e), p);
          p.splice(0, p.length);
          t(n);
          g.cancelForceStop();
        });
      }, () => {
        t([]);
        g.cancelForceStop();
      });
    }
    function c(t, e) {
      const n = Session.getInstance().getCurrentSessionId();
      let o,
        i = -1;
      for (const e in t) if ({}.hasOwnProperty.call(t, e)) {
        const r = t[e];
        if (o = r[n]) {
          i = e;
          break;
        }
      }
      return -1 === i && (o = []), (o = o.concat(e)) && 0 !== o.length ? (-1 === i ? t.push({
        [n]: o
      }) : t[i][n] = o, t) : t;
    }
    function a() {
      return {
        saveEkvData(e) {
          t(e), Log.d(`[saveEkvData] data is ${UmengUtils.toStr(e)}`);
        },
        readEkvDatas(t) {
          t && (g.forceStop(), d <= E ? s(e => {
            t(e);
            g.cancelForceStop();
          }) : i("readEkvDatas", e => {
            t(e);
            r("readEkvDatas");
            g.cancelForceStop();
          }));
        },
        handlerNoSessionEkvDatas() {
          if (U && U.length > 0) {
            Log.d(`no sessionId event is ${JSON.stringify(U)}`);
            for (const t in U) ({}).hasOwnProperty.call(U, t) && this.saveEkvData(U[t]);
            U.splice(0, U.length);
          }
        },
        quitHandler() {
          0 !== p.length && (g.forceStop(), d <= E ? StorageUtil.getData(f, t => {
            const e = c(UmengUtils.stringToArray(t), p);
            StorageUtil.putData(f, UmengUtils.toStr(e));
            p.splice(0, p.length);
            g.cancelForceStop();
          }, () => {
            g.cancelForceStop();
          }) : i("quitHandler", t => {
            const e = UmengUtils.toStr(c(t, p));
            StorageUtil.putData(f, e);
            p.splice(0, p.length);
            r("quitHandler");
            g.cancelForceStop();
          }));
        },
        dispatchMessage() {
          if (d > E) return void g.wait();
          d += 1;
          const t = e();
          if (!t || 0 === t.length) return void n();
          StorageUtil.getData(u, e => {
            e || (e = 0);
            e >= l + t.length ? n() : StorageUtil.getData(f, n => {
              const i = c(UmengUtils.stringToArray(n), t);
              o(i, Number(e) + Number(t.length));
            }, () => {
              n();
            });
          }, () => {
            n();
          });
        },
        isCanPop() {
          return p.length >= _;
        }
      };
    }
    const u = "umeng_ekv_count_key",
      f = "umeng_key_ekvs",
      l = 1e4,
      _ = 5,
      E = 1;
    let g,
      d = 1,
      S = null;
    const h = {},
      p = [],
      U = [];
    return {
      getInstance() {
        return S || (S = new a(), (g = new Looper()).prepare(S)), S;
      }
    };
  }(),
  EventController = function () {
    function t(t, e) {
      const n = {
        id: t,
        ts: Date.now()
      };
      switch (typeof e) {
        case "string":
          n[t] = e;
          break;
        case "object":
          for (const t in e) ({}).hasOwnProperty.call(e, t) && (n[t] = e[t]);
      }
      return n;
    }
    function e() {
      StorageUtil.getData(constants.EVENT_SEND_REPORT_POLICY, t => {
        t === constants.EVENT_SEND_REPORT_POLICY_INTERVAL_VALUE && StorageUtil.getData(constants.EVENT_SEND_REPORT_INTERVAL_TIME, t => {
          StorageUtil.getData(constants.EVENT_LAST_SEND_TIME, e => {
            if (t) {
              const n = Date.now();
              e && n - e > 1e3 * t && Request.sendAll();
            } else StorageUtil.putData(constants.EVENT_SEND_REPORT_POLICY, constants.EVENT_SEND_REPORT_POLICY_START_SEND_VALUE);
          });
        });
      });
    }
    function n() {
      return {
        addEvent(n, o) {
          const i = t(n, o);
          EventStoreQueue.getInstance().saveEkvData(i), e();
        },
        handlerNoSessionEkvDatas() {
          EventStoreQueue.getInstance().handlerNoSessionEkvDatas();
        },
        quitHandler() {
          EventStoreQueue.getInstance().quitHandler();
        },
        setSendTime() {
          StorageUtil.putData(constants.EVENT_LAST_SEND_TIME, Date.now());
        }
      };
    }
    let o;
    return {
      getInstance() {
        return o || (o = n()), o;
      }
    };
  }();
let time = 0;
var Request = {
  send: send,
  sendAll: sendAll
};
const KEY_PRE_PAGE = "umeng_page_";
PageController.prototype = {
  addCurrentPage(t) {
    this._currentPage = {
      ts: Date.now(),
      page_name: DeviceUtil.getPageName()
    }, this.pageObject = t;
  },
  savePage(t, e) {
    if (t && e && this._currentPage.page_name && e === this.pageObject) {
      const e = Date.now() - this._currentPage.ts;
      this._currentPage.duration = Math.abs(e), this._pagelist = this._pagelist.concat(this._currentPage), this._currentPage = {}, this.pageObject = {}, this.saveStroragePages(t);
    }
  },
  saveStroragePages(t) {
    t && this._pagelist.length > 0 && this.updateStorage(KEY_PRE_PAGE + t, this._pagelist);
  },
  getPages(t, e) {
    StorageUtil.getData(KEY_PRE_PAGE + t, n => {
      const o = UmengUtils.stringToArray(n).concat(this._pagelist);
      this.clear(t);
      e && e(o);
    }, () => {
      e && e(null);
    });
  },
  updateStorage(t, e) {
    e && 0 !== e.length && StorageUtil.getData(t, n => {
      const o = UmengUtils.stringToArray(n).concat(e);
      StorageUtil.putData(t, UmengUtils.toStr(o), () => {
        this._pagelist = [];
      });
    });
  },
  clear(t) {
    StorageUtil.deleteData(KEY_PRE_PAGE + t), this._pagelist = [];
  }
};
let inited = !1;
UmengAnalysisLib.prototype = {
  init(t) {
    if (Log.i(`*** umeng_sdk *** sdk version is: ${constants.SDK_VERSION}`), !inited) {
      try {
        this.appkey = t.$data.umeng_appkey;
      } catch (t) {}
      if (!this.appkey) return inited = !1, void console.error("please set umeng_appkey : [manifest.json --\x3e config:{data:{umeng_appkey: xxx}}]");
      inited = !0, Header.getInstance().init(this.appkey);
      const e = this;
      if (Session.getInstance().setOnSessionListener(t => ({
        pages(n) {
          e.pageController.getPages(t, n);
        },
        generateSessionAfterHandler(t) {
          EventController.getInstance().handlerNoSessionEkvDatas(), sendDatas();
        }
      })), StorageUtil.getData(constants.APP_FIRST_OPEN_FLAG, t => {
        0 === t.length && StorageUtil.putData(constants.APP_FIRST_OPEN_FLAG, "true");
      }), StorageUtil.getData(constants.EVENT_SEND_REPORT_POLICY, t => {
        t || StorageUtil.putData(constants.EVENT_SEND_REPORT_POLICY, constants.EVENT_SEND_REPORT_POLICY_START_SEND_VALUE);
      }), StorageUtil.getData(constants.EVENT_LAST_SEND_TIME, t => {
        t || EventController.getInstance().setSendTime();
      }), t) try {
        Object.defineProperty(t, "_status", {
          set(t) {
            "destroy" === t && Request.sendAll();
          }
        });
      } catch (t) {}
    }
  },
  resume(t) {
    isInit() && t && (Log.i(`*** umeng_sdk *** page name: ${DeviceUtil.getPageName()}`), this.pageController.addCurrentPage(t), Session.getInstance().init(this.appkey));
  },
  pause(t) {
    isInit() && t && (this.pageController.savePage(Session.getInstance().getCurrentSessionId(), t), Session.getInstance().endSession(), EventController.getInstance().quitHandler());
  },
  trackEvent(t, e) {
    if (isInit()) return UmengUtils.checkId(t) ? e && !UmengUtils.checkAttrOrString(e) ? (console.error("error-----please check trackEvent attr. attr should be 'String' or 'Object'(not include 'Array')"), !1) : (Log.i(`*** umeng_sdk *** event id: ${UmengUtils.toStr(t)}${e ? ` || event attr: ${UmengUtils.toStr(e)}` : ""}`), EventController.getInstance().addEvent(t, e), !0) : (console.error("error-----please check trackEvent id. id should be 'String' and not null"), !1);
  }
};
const FileUtils = {
    getFile(t, e, n) {
      _system7.default.readText({
        uri: t,
        success(t) {
          e && e(t.text);
        },
        fail(t, e) {
          n && n(t, e);
        }
      });
    },
    moveFile(t, e, n, o) {
      _system7.default.move({
        srcUri: t,
        dstUri: e,
        success(t) {
          n && n(t);
        },
        fail(t, e) {
          o && o(t, e);
        }
      });
    },
    deleteFile(t, e, n) {
      _system7.default.delete({
        uri: t,
        success(t) {
          e && e(t);
        },
        fail(t, e) {
          n && n(t, e);
        }
      });
    }
  },
  modules = {
    "@system.app": $app_require$("@app-module/system.app"),
    "@system.storage": $app_require$("@app-module/system.storage"),
    "@system.fetch": $app_require$("@app-module/system.fetch"),
    "@system.network": $app_require$("@app-module/system.network"),
    "@system.device": $app_require$("@app-module/system.device"),
    "@system.router": $app_require$("@app-module/system.router"),
    "@system.file": $app_require$("@app-module/system.file")
  },
  callQueue = [],
  umeng_stat_global = Object.getPrototypeOf(global) || global;
SdkUpdater.prototype = {
  init(t, e) {
    this.installApi(t, null);
    try {
      DeviceUtil.getSystemBaseInfo(t => {
        1e3 === t.platformVersionCode ? e(0) : StorageUtil.getData(constants.DOWNLOAD_FILE_FIRST_CACHE, t => {
          t ? this.getSdkFileContent(t, (t, n, o) => {
            t ? e(1, n, o) : this.getSecondCacheFile(e);
          }) : this.getSecondCacheFile(e);
        });
      });
    } catch (t) {
      e(0);
    }
  },
  getSecondCacheFile(t) {
    StorageUtil.getData(constants.DOWNLOAD_FILE_SECOND_CACHE, e => {
      e ? this.getSdkFileContent(e, t) : t(0);
    });
  },
  getSdkFileContent(t, e) {
    try {
      const n = UmengUtils.toObject(t);
      Log.d(`current sdk:${n.version}${n.md5}${n.filePath}`), FileUtils.getFile(n.filePath, t => {
        UmengUtils.checkMD5(n.md5, t) ? e(1, t, n.version) : e(0);
      }, () => {
        e(0);
      });
    } catch (t) {
      e(0);
    }
    return !1;
  },
  downloadFile(t, e, n, o, i) {
    try {
      _system8.default.download({
        url: t,
        success(t) {
          Log.d(`handling success ${t.token}`), _system8.default.onDownloadComplete({
            token: t.token,
            success(t) {
              try {
                const r = t.uri,
                  s = r.split("/"),
                  c = s[s.length - 1];
                let a = constants.SDK_UPDATE_LOCAL_STORAGE_PATH;
                a = `${a + Date.now()}/${c}`, FileUtils.moveFile(t.uri, a, t => {
                  const r = {
                    version: e,
                    md5: n,
                    filePath: t,
                    stable: o
                  };
                  i(r);
                });
              } catch (t) {}
            },
            fail(t, e) {}
          });
        },
        fail() {}
      });
    } catch (t) {}
  },
  storageFileInfo(t) {
    try {
      FileUtils.getFile(t.filePath, e => {
        Log.d(`---------${JSON.stringify(t)}-----------${UmengUtils.MD5(e)}`);
        e && t.md5 && t.md5 === UmengUtils.MD5(e) ? (StorageUtil.getData(constants.DOWNLOAD_FILE_FIRST_CACHE, e => {
          StorageUtil.putData(constants.DOWNLOAD_FILE_FIRST_CACHE, t, () => {
            if (e) {
              const t = UmengUtils.toObject(e);
              !t.stable && t.filePath && FileUtils.deleteFile(t.filePath);
            }
          });
        }), t.stable ? StorageUtil.getData(constants.DOWNLOAD_FILE_SECOND_CACHE, e => {
          StorageUtil.putData(constants.DOWNLOAD_FILE_SECOND_CACHE, t, () => {
            if (e) {
              const t = UmengUtils.toObject(e);
              t.filePath && FileUtils.deleteFile(t.filePath);
            }
          });
        }) : StorageUtil.putData(constants.DOWNLOAD_FILE_FIRST_CACHE, t)) : FileUtils.deleteFile(t.filePath, () => {});
      });
    } catch (t) {
      Log.d(`error message: ${t.toString()}`);
    }
  },
  checkVersionNew(t, e, n, o, i, r) {
    const s = {
      version: t,
      platform: "quickapp",
      appVersion: n,
      appKey: e,
      seedVersion: o,
      systemBaseInfo: i
    };
    _system6.default.fetch({
      url: this.url,
      method: "POST",
      data: s,
      success(t) {
        if (200 === t.code) try {
          const e = UmengUtils.toObject(t.data);
          if (200 === e.code && e.data.update) {
            const t = e.data.info;
            t && r(t);
          }
        } catch (t) {}
      },
      fail(t, e) {},
      complete() {}
    });
  },
  createMethod(t, e, n) {
    try {
      t[e] = n ? function (...t) {
        return n[e](...t);
      } : function (...t) {
        callQueue.push([e, t]);
      };
    } catch (t) {}
  },
  installApi(t, e) {
    try {
      const n = ["resume", "pause", "trackEvent"];
      for (let o = 0, i = n.length; o < i; o++) this.createMethod(t, n[o], e);
      if (e) for (let t = 0, n = callQueue.length; t < n; t++) {
        const n = callQueue[t];
        e[n[0]](...n[1]);
      }
    } catch (t) {}
  },
  compileModule(t, e) {
    try {
      const t = new Function("module", "exports", "require", e),
        n = {
          exports: {}
        },
        o = function (t) {
          return t in modules ? modules[t] : __webpack_require__("./src/Common/libs/umeng sync recursive")(t);
        };
      return t(n, n.exports, o), n.exports;
    } catch (t) {}
  },
  loadModule(t, e) {
    try {
      let n;
      if (0 === t) n = UmengAnalysisLib;else try {
        n = this.compileModule(t, e);
      } catch (t) {
        n = UmengAnalysisLib;
      }
      return n;
    } catch (t) {}
    return null;
  }
};
const UmengAnalysis = {
  seed_version: "0.0.1",
  version: constants.SDK_VERSION,
  appKey: "",
  _impl: null,
  _inited: !1,
  init(t) {
    if (!this._inited) {
      this._inited = !0, umeng_stat_global.userDubug = !!t.$data.umeng_debug, this.appKey = t.$data.umeng_appkey;
      const e = new SdkUpdater();
      e.init(this, (n, o, i) => {
        const r = e.loadModule(n, o);
        if (r) {
          const n = new r();
          this._impl = n, n.init(t), e.installApi(this, n);
        }
        i || (i = this.version);
        DeviceUtil.getSystemBaseInfo(t => {
          if (1e3 === t.platformVersionCode) return;
          e.checkVersionNew(i, this.appKey, _system5.default.getInfo().versionName, this.seed_version, t, t => {
            t && e.downloadFile(t.fileUrl, t.version, t.fileMD5, t.stable, t => {
              e.storageFileInfo(t);
            });
          });
        });
      });
    }
  }
};
!function () {
  umeng_stat_global && (umeng_stat_global.$umeng_stat = UmengAnalysis, umeng_stat_global.Page = Page);
}();
var _default = exports["default"] = UmengAnalysis;

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

__webpack_require__(/*! ./Common/libs/umeng/umenganalysis.es.min */ "./src/Common/libs/umeng/umenganalysis.es.min.js");
module.exports = {
  onCreate() {
    console.info('Application onCreate');
    const hook2global = global.__proto__ || global;
    const $router = $app_require$('@app-module/system.router');
    const $utils = (__webpack_require__(/*! ./Common/helper/utils */ "./src/Common/helper/utils.js")["default"]);
    const $storage = $app_require$("@app-module/system.storage");
    const $cipher = $app_require$("@app-module/system.cipher");
    const $prompt = $app_require$("@app-module/system.prompt");
    const $webview = $app_require$("@app-module/system.webview");
    const $apis = (__webpack_require__(/*! ./Common/helper/apis */ "./src/Common/helper/apis/index.js")["default"]);
    const $ad = $app_require$("@app-module/service.ad");
    const $app = $app_require$("@app-module/system.app");
    const $device = $app_require$("@app-module/system.device");
    const $processData = (__webpack_require__(/*! ./Common/helper/processData */ "./src/Common/helper/processData.js")["default"]);
    hook2global.$router = $router;
    hook2global.$utils = $utils;
    hook2global.$storage = $storage;
    hook2global.$prompt = $prompt;
    hook2global.$apis = $apis;
    hook2global.$webview = $webview;
    hook2global.$ad = $ad;
    hook2global.$cipher = $cipher;
    hook2global.$app = $app;
    hook2global.$device = $device;
    hook2global.$processData = $processData;
    console.log("[app.ux] onCreate...");
    $umeng_stat.init(this);
  },
  onDestroy() {
    console.info('Application onDestroy');
  },
  dataApp: {
    url1: "http://www.ihaituo.cn/xy/jb/bzzx.html",
    url2: "http://www.ihaituo.cn/xy/jb/yhxy.html",
    url3: "http://www.ihaituo.cn/xy/jb/yszc.html",
    countMax: 8,
    brand: 'HUAWEI',
    channel: 'jh',
    bannerAdUnitId: "z1v6jykvy9",
    nativeAdUnitId: "v5h5xsklp2",
    interstitialAdUnitId: "a7nvl7fm00",
    userData: {
      loginPhone: '',
      userId: '',
      balance: 0
    },
    actiParam: ''
  }
};
(exports.default || module.exports).manifest = __webpack_require__(/*! !!../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./manifest.json */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json")
}

/***/ }),

/***/ "./src/Common/helper/apis sync recursive \\.js":
/*!*******************************************!*\
  !*** ./src/Common/helper/apis/ sync \.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./example.js": "./src/Common/helper/apis/example.js",
	"./index.js": "./src/Common/helper/apis/index.js",
	"./user.js": "./src/Common/helper/apis/user.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/Common/helper/apis sync recursive \\.js";

/***/ }),

/***/ "./src/Common/libs/umeng sync recursive":
/*!*************************************!*\
  !*** ./src/Common/libs/umeng/ sync ***!
  \*************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src/Common/libs/umeng sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json":
/*!***********************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-manifest-loader.js!./src/manifest.json ***!
  \***********************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"package":"com.haituo.setpplanet","name":"计步星球","versionName":"1.0.15","versionCode":15,"icon":"/Common/img/logo.png","minPlatformVersion":1100,"features":[{"name":"system.storage"},{"name":"system.fetch"},{"name":"system.network"},{"name":"system.device"},{"name":"system.file"},{"name":"system.sensor"}],"config":{"data":{"umeng_appkey":"667b68fccac2a664de54f5ac"}},"router":{"entry":"Page_MainTab","pages":{"Page_MainTab":{"launchMode":"singleTask","component":"index"},"Page_Tixian":{"component":"index"},"Page_login":{"component":"index"},"Page_about":{"component":"index"},"feedback":{"component":"index"},"logOut":{"component":"index"},"permissions":{"component":"index"},"Page_setPay":{"component":"index"},"Page_cfd/":{"component":"index"},"ad/nativeAD":{"component":"index"}}},"display":{"pages":{"Page_MainTab":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0},"Page_cfd/":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0,"titleBarBackgroundOpacity":0},"Page_Tixian":{"titleBar":true,"menu":true,"titleBarText":"收益"},"Page_login":{"titleBar":true,"menu":false,"titleBarText":"用户登录"}}},"versionType":"debug"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ux ***!
  \********************/
var $app_script$ = __webpack_require__(/*! !!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-app-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/app.ux")

$app_define$('@app-application/app', [], function($app_require$, $app_exports$, $app_module$){

        $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default;
        }
})
$app_bootstrap$('@app-application/app',{packagerName:'fa-toolkit', packagerVersion: '14.1.1-Stable.300'})
})();

/******/ })()
;   };
                        if (typeof window === "undefined") {
                            return createAppHandler();
                        }
                        else {
                            window.createAppHandler = createAppHandler
                        }
                    })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGFwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2aERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4dURBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTs7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FwaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL3Byb2Nlc3NEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL0pTRW5jcnlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvanNlbmNyeXB0L2xpYi9KU0VuY3J5cHRSU0FLZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2FzbjFqcy9hc24xLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvYmFzZTY0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvaGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvaW50MTAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vYmFzZTY0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc2JuL2pzYm4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vcHJuZzQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vcm5nLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc2JuL3JzYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvanNlbmNyeXB0L2xpYi9saWIvanNibi91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc3JzYXNpZ24vYXNuMS0xLjAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzcnNhc2lnbi95YWhvby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvdW1lbmcvdW1lbmdhbmFseXNpcy5lcy5taW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhcHAudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy8gc3luYyBcXC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvdW1lbmcvIHN5bmMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy8uL3NyYy9hcHAudXgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3N5c3RlbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5mZXRjaFwiKSk7XG52YXIgX3N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZVwiKSk7XG52YXIgX3N5c3RlbTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpKTtcbnZhciBfc3lzdGVtNCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5wcm9tcHRcIikpO1xudmFyIF9zeXN0ZW01ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnJvdXRlclwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmNvbnN0IGdldFVzZXJJZCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHVzZXJJZCA9IGF3YWl0IF9zeXN0ZW0zLmRlZmF1bHQuZ2V0VXNlcklkKCk7XG4gIHJldHVybiB1c2VySWQuZGF0YS51c2VySWQ7XG59O1xuY29uc3QgcXVpdCA9ICgpID0+IHtcbiAgX3N5c3RlbTQuZGVmYXVsdC5zaG93RGlhbG9nKHtcbiAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgbWVzc2FnZTogXCLmgqjlt7Lms6jplIDotKblj7cs6K+36YCA5Ye644CCXCIsXG4gICAgYnV0dG9uczogW3tcbiAgICAgIHRleHQ6ICfpgIDlh7onLFxuICAgICAgY29sb3I6ICcjMzMzMzMzJ1xuICAgIH1dLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfc3lzdGVtNS5kZWZhdWx0LnB1c2goe1xuICAgICAgICB1cmk6IFwiUGFnZV9sb2dpblwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjYW5jZWxcIik7XG4gICAgfVxuICB9KTtcbn07XG5jb25zdCBnZXRUb2tlbkRhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZXhhbXBsZSA9IHJlcXVpcmUoJy4vYXBpcy9leGFtcGxlLmpzJykuZGVmYXVsdDtcbiAgICBjb25zdCBkZXZpY2VOdW0gPSBhd2FpdCBnZXRVc2VySWQoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgZ2V0VG9rZW5EYXRhKCktLS0tPmRldmljZU51bT0ke2RldmljZU51bX1gKTtcbiAgICAvLyBjb25zb2xlLmxvZygn5piv5ZCm6Kem5Y+R55qE6L+Z6YeMJyk7XG4gICAgZXhhbXBsZS50b0xvZ2luKHtcbiAgICAgIGxvZ2luVHlwZTogXCJERVZJQ0VcIixcbiAgICAgIGFwcElkOiAnU0NfMDAwMScsXG4gICAgICBkZXZpY2VOdW0sXG4gICAgICBsb2dpbkFjY291bnQ6IGRldmljZU51bVxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygn6LWw55qE5oiQ5Yqf5Zue6LCDJyk7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIsICflpLHotKXlm57osIMnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChKU09OLnBhcnNlKGVycikuY29kZSA9PT0gJzMxMDAwMScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5p2l5LqGJyk7XG4gICAgICAgICAgcXVpdCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgJ+afpeeci+iOt+WPluaKpemUmScpO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH0pO1xufTtcbmxldCBpc1JlZnJlc2hpbmcgPSBmYWxzZTsgLy8g5piv5ZCm5q2j5Zyo6K+35rGC5Yi35pawdG9rZW7nmoTmjqXlj6NcbmNvbnN0IHJlZnJlc2hTdWJzY3JpYmVycyA9IFtdOyAvLyDlrZjlgqjor7fmsYLnmoTmlbDnu4RcbmNvbnN0IHN1YnNjcmliZVRva2VuUmVmcmVzaCA9IGNiID0+IHtcbiAgLy8g5bCG5omA5pyJ55qE6K+35rGC6YO9cHVzaOWIsOaVsOe7hOS4rSzlhbblrp7mlbDnu4TmmK9bZnVuY3Rpb24odG9rZW4pe30sIGZ1bmN0aW9uKHRva2VuKXt9LC4uLl1cbiAgcmVmcmVzaFN1YnNjcmliZXJzLnB1c2goY2IpO1xufTtcbmNvbnN0IG9uUnJlZnJlc2hlZCA9IHRva2VuID0+IHtcbiAgLy8g5pWw57uE5Lit55qE6K+35rGC5b6X5Yiw5paw55qEdG9rZW7kuYvlkI7oh6rmiafooYzvvIznlKjmlrDnmoR0b2tlbuWOu+ivt+axguaVsOaNrlxuICByZWZyZXNoU3Vic2NyaWJlcnMubWFwKGNiID0+IGNiKHRva2VuKSk7XG59O1xuY29uc3QgaXNBY2Nlc3NUb2tlbkV4cGlyZWQgPSBhdXRoRGF0YSA9PiB7XG4gIC8vIOWIpOaWreW9k+WJjXRva2Vu5piv5ZCm6L+H5pyfXG4gIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGF1dGhEYXRhLmV4cGlyZUF0ID4gMTAwMDAgKiA2MCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCByZXF1ZXN0ID0gb3B0aW9ucyA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICAgIGhlYWRlcnMgPSB7fVxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGF1dGhEYXRhID0gKGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuZ2V0KHtcbiAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICB9KSkgfHwge307XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhdXRoRGF0YS5kYXRhID8gSlNPTi5wYXJzZShhdXRoRGF0YS5kYXRhKS5hY2Nlc3NUb2tlbiA6ICcnO1xuICAgIGlmIChpc0FjY2Vzc1Rva2VuRXhwaXJlZChhdXRoRGF0YSkgfHwgIWFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpKSB7XG4gICAgICAgIGlmICghaXNSZWZyZXNoaW5nKSB7XG4gICAgICAgICAgaXNSZWZyZXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICBnZXRUb2tlbkRhdGEoKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSByZXMuZGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgYXdhaXQgX3N5c3RlbTIuZGVmYXVsdC5zZXQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJBVVRIX1RPS0VOX0RBVEFcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkocmVzLmRhdGEpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEuYWNjZXNzVG9rZW4nLCByZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgIG9uUnJlZnJlc2hlZChyZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXRyeSA9IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICBzdWJzY3JpYmVUb2tlblJlZnJlc2godG9rZW4gPT4ge1xuICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gdG9rZW47IC8vIOeUqOacgOaWsHRva2Vu6K+35rGC5pWw5o2uXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0cnk7XG4gICAgICB9XG4gICAgfVxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5mZXRjaCh7XG4gICAgICAvLyB1cmw6ICdodHRwczovL3Rlc3QuaXBhbmRhdGEuY29tJyArIHVybCxcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmloYWl0dW8uY24nICsgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgZGF0YSxcbiAgICAgIGhlYWRlcjogX29iamVjdFNwcmVhZCh7XG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LCBoZWFkZXJzKSxcbiAgICAgIC8vIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhXG4gICAgICAvLyAgIGlmIChkYXRhLmNvZGUgPT09IFwiMDAwMDAwXCIgfHwgSlNPTi5wYXJzZShkYXRhKS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAvLyAgICAgcmVzb2x2ZSh1cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikgPyByZXMuZGF0YSA6IEpTT04ucGFyc2UocmVzLmRhdGEpKTtcbiAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICBpZiAoZGF0YS5jb2RlID09PSBcIjMwMDAwMlwiKSB7XG4gICAgICAvLyAgICAgICAkc3RvcmFnZS5kZWxldGUoe1xuICAgICAgLy8gICAgICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgICAvLyAgICAgICB9KVxuICAgICAgLy8gICAgICAgcmVxdWVzdChvcHRpb25zKVxuICAgICAgLy8gICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgLy8gICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgcmVqZWN0KHJlcy5kYXRhKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sXG5cbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzLmRhdGE7XG5cbiAgICAgICAgICAvLyDlsJ3or5Xop6PmnpAgSlNPTiDmlbDmja7vvIzlpoLmnpzop6PmnpDlpLHotKXvvIzliJnkvJrmipvlh7rplJnor69cbiAgICAgICAgICBjb25zdCBwYXJzZWREYXRhID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XG4gICAgICAgICAgaWYgKHBhcnNlZERhdGEuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgICAgICAgcmVzb2x2ZSh1cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikgPyBkYXRhIDogcGFyc2VkRGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYXJzZWREYXRhLmNvZGUgPT09IFwiMzAwMDAyXCIpIHtcbiAgICAgICAgICAgICAgX3N5c3RlbTIuZGVmYXVsdC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIEpTT04gb3IgaGFuZGxpbmcgY29kZTogXCIsIGUpO1xuXG4gICAgICAgICAgLy8g5qOA5p+l5piv5ZCm6L+U5Zue55qE5pivIEhUTUzvvIzogIzkuI3mmK8gSlNPTlxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLmRhdGEgPT09ICdzdHJpbmcnICYmIHJlcy5kYXRhLnN0YXJ0c1dpdGgoJzxodG1sPicpKSB7XG4gICAgICAgICAgICByZWplY3QoXCJTZXJ2ZXIgcmV0dXJuZWQgYW4gSFRNTCBwYWdlIGluc3RlYWQgb2YgSlNPTi4gUG9zc2libGUgaW5jb3JyZWN0IFVSTCBvciBzZXJ2ZXIgZXJyb3IuXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJFcnJvciBwYXJzaW5nIEpTT04gb3IgaGFuZGxpbmcgY29kZTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHt9XG4gICAgfSk7XG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2FqYXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9hamF4LmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG4vLyDnmbvlvZUgXG5jb25zdCB0b0xvZ2luID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvdXNlci9sb2dpbmAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOS4iuS8oOatpeaVsFxuY29uc3QgdXBsb2Fkc3RlcHMgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy91cGxvYWRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuLy8g6I635Y+W5q2l5pWwXG5jb25zdCBnZXRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvc2NgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vLyDojrflj5bmnIDov5EzMOWkqeiusOW9lVxuY29uc3QgZ2V0c3RlcHNsaXN0ID0gKCkgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvc2MvbGlzdGBcbiAgfSk7XG59O1xuXG4vL+aPkOeOsFxuY29uc3Qgd2l0aGRyYXcgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL3dpdGhkcmF3YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/nlKjmiLfkvZnpop3orrDlvZVcbmNvbnN0IHJlY29yZCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9jYXNoL3JlY29yZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v6I635Y+W5bm/5ZGK5a6M5oiQ5qyh5pWwXG5jb25zdCBnZXRBZENvdW50ID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZS9jb3VudGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQXG5jb25zdCBjb21wbGV0ZUFkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29tcGxldGVgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+W5v+WRiuWujOaIkC3liqDlr4ZcbmNvbnN0IGNvbXBsZXRlQWRSU0EgPSBhc3luYyBkYXRhID0+IHtcbiAgbGV0IHRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuICBkYXRhLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgbGV0IF9kYXRhID0gYXdhaXQgJHV0aWxzLmRhdGFFbmNyeXB0aW9uKGRhdGEpO1xuICBsZXQgcGFyYW0gPSB7XG4gICAgZGF0YTogX2RhdGFcbiAgfTtcbiAgY29uc29sZS5sb2coJ+S7u+WKoeWKoOWvhicsIHBhcmFtKTtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9maW5pc2hgLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtKVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK6L2s5YyW5LiK5LygICAgdHlwZTrlub/lkYrmuKDpgZPnsbvlnos6IGpoKOmyuOm4vyksIGtzKOW/q+aJiyksIGpsKOW3qOmHjyksICzlj6/nlKjlgLw6amgsa3MsamxcbmNvbnN0IGNvbnZlcnRVcGxvYWQgPSBkYXRhID0+IHtcbiAgY29uc29sZS5sb2coJ2RhdGE9ICcsIGRhdGEsIGB1cmw9IC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvdXBsb2FkLyR7ZGF0YS50eXBlfWApO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvdXBsb2FkLyR7ZGF0YS50eXBlfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v6I635Y+W5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvXG5jb25zdCBib2xja1JldHVybiA9ICgpID0+IHtcbiAgbGV0IGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvY2xpY2tDb250cm9sL3JldHVybi9pbmZvLyR7YnJhbmR9YFxuICB9KTtcbn07XG5cbi8qKlxyXG4gKiDojrflj5bpobXpnaLpgI/mmI7lsYLphY3nva7kv6Hmga8gIFxyXG4gKlxyXG4gKi9cblxuY29uc3Qgc2hvd1RjbGF5ZXIgPSBkYXRhID0+IHtcbiAgbGV0IGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvY2xpY2tDb250cm9sL3RyYW5zcGFyZW50TGF5ZXIvaW5mby8ke2JyYW5kfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8qKlxyXG4gKiDojrflj5bmmK/lkKboh6rliqjlvLnnqpcgIFxyXG4gKlxyXG4gKi9cblxuY29uc3QgcG9wVXBzID0gKCkgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvYXV0by9wb3BVcHNgXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgdG9Mb2dpbixcbiAgdXBsb2Fkc3RlcHMsXG4gIGdldHN0ZXBzLFxuICBnZXRzdGVwc2xpc3QsXG4gIHdpdGhkcmF3LFxuICByZWNvcmQsXG4gIGdldEFkQ291bnQsXG4gIGNvbXBsZXRlQWQsXG4gIGNvbXBsZXRlQWRSU0EsXG4gIGNvbnZlcnRVcGxvYWQsXG4gIGJvbGNrUmV0dXJuLFxuICBzaG93VGNsYXllcixcbiAgcG9wVXBzXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuLyoqXG4gKiDlr7zlh7ogYXBpcyDkuIvnm67lvZXnmoTmiYDmnInmjqXlj6NcbiAqL1xuY29uc3QgZmlsZXMgPSByZXF1aXJlLmNvbnRleHQoJy4nLCB0cnVlLCAvXFwuanMvKTtcbmNvbnN0IG1vZHVsZXMgPSB7fTtcbmZpbGVzLmtleXMoKS5mb3JFYWNoKGtleSA9PiB7XG4gIGlmIChrZXkgPT09ICcuL2luZGV4LmpzJykge1xuICAgIHJldHVybjtcbiAgfVxuICBtb2R1bGVzW2tleS5yZXBsYWNlKC8oXlxcLlxcL3xcXC5qcyQpL2csICcnKV0gPSBmaWxlcyhrZXkpLmRlZmF1bHQ7XG59KTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IG1vZHVsZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2FqYXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9hamF4LmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG4vLyDnmbvlvZUgXG5jb25zdCBnZXRVc2VySW5mbyA9ICgpID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvaW5mb2BcbiAgfSk7XG59O1xuXG4vLyDph5HluIFcbmNvbnN0IGdldERhaWx5U2lnbkRheSA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvZ29sZEV4Y2hhbmdlUnVsZS9kYWlseS9zaWduL2RheWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vL+etvuWIsFxuY29uc3QgZ29TaWFuSW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2dvbGRFeGNoYW5nZVJ1bGUvZGFpbHkvc2lnbmAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOWPjemmiFxuY29uc3QgcG9zdFVzZXJGZWVkYmFjayA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvZmVlZGJhY2tgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuLy/ms6jplIDnlKjmiLdcbmNvbnN0IHB1dEZvcmV2ZXJMb2dvdXQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvZm9yZXZlci9sb2dvdXRgXG4gIH0pO1xufTtcblxuLy8g55So5oi35L2Z6aKd6K6w5b2VXG5jb25zdCBnZXRVc2VyQ2FzaFJlY29yZCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9jYXNoL3JlY29yZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOeUqOaIt+mHkeW4geiusOW9lVxuY29uc3QgZ2V0VXNlckdvbGRSZWNvcmQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvZ29sZC9yZWNvcmRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuLy/orr7nva7mlK/ku5jlrp3otKbmiLdcbmNvbnN0IHB1dEFsaXBheUFjY291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvYWxpcGF5L2FjY291bnRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+WPkemAgemqjOivgeeggVxuY29uc3QgcG9zdFNlbmRDb2RlID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvdXNlci9zZW5kQ29kZS8ke2RhdGEucGhvbmV9YFxuICB9KTtcbn07XG5sZXQgdXNlciA9IHtcbiAgZ2V0VXNlckluZm8sXG4gIGdldERhaWx5U2lnbkRheSxcbiAgZ29TaWFuSW4sXG4gIHBvc3RVc2VyRmVlZGJhY2ssXG4gIGdldFVzZXJDYXNoUmVjb3JkLFxuICBnZXRVc2VyR29sZFJlY29yZCxcbiAgcHV0Rm9yZXZlckxvZ291dCxcbiAgcHV0QWxpcGF5QWNjb3VudCxcbiAgcG9zdFNlbmRDb2RlXG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gdXNlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2xlYXJTdG9yYWdlID0gY2xlYXJTdG9yYWdlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy5kZWxldGVTdG9yYWdlID0gZGVsZXRlU3RvcmFnZTtcbmV4cG9ydHMuZ2V0U3RvcmFnZSA9IGdldFN0b3JhZ2U7XG5leHBvcnRzLmluY3JlbWVudFRvZGF5Q2xpY2tzID0gaW5jcmVtZW50VG9kYXlDbGlja3M7XG5leHBvcnRzLmxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbmV4cG9ydHMucmVzZXRUb2RheUNsaWNrc0lmTmVlZGVkID0gcmVzZXRUb2RheUNsaWNrc0lmTmVlZGVkO1xuZXhwb3J0cy5zZXRTdG9yYWdlID0gc2V0U3RvcmFnZTtcbnZhciBfc3lzdGVtID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOS8mOWMluacrOWcsOWtmOWCqGdldOaWueazlVxuZnVuY3Rpb24gbG9jYWxTdG9yYWdlKGtleSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5nZXQoe1xuICAgICAga2V5LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gc2V0U3RvcmFnZShrZXksIHZhbHVlID0gXCJcIikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5zZXQoe1xuICAgICAga2V5LFxuICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoYHNldFN0b3JhZ2Ugc3VjY2Vzc2ApO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChgc2V0U3RvcmFnZSBmYWlsLCBjb2RlID0gJHtjb2RlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldFN0b3JhZ2Uoa2V5KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmdldCh7XG4gICAgICBrZXksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChgZ2V0U3RvcmFnZSBmYWlsLCBjb2RlID0gJHtjb2RlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVN0b3JhZ2Uoa2V5KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICBrZXksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXNvbHZlKGBkZWxldGVTdG9yYWdlIHN1Y2Nlc3NgKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZWplY3QoYGRlbGV0ZVN0b3JhZ2UgZmFpbCwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmNsZWFyKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoYGNsZWFyU3RvcmFnZSBzdWNjZXNzYCk7XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgcmVqZWN0KGBjbGVhclN0b3JhZ2UgZmFpbCwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8v5qOA5p+l5piv5ZCm6ZyA6KaB6YeN572u5bm/5ZGK54K55Ye75qyh5pWwXG5mdW5jdGlvbiByZXNldFRvZGF5Q2xpY2tzSWZOZWVkZWQoKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKTsgLy/lvZPlpKnml6XmnJ9cblxuICBfc3lzdGVtLmRlZmF1bHQuZ2V0KHtcbiAgICBrZXk6ICdsYXN0UmVzZXREYXRlJyxcbiAgICBkZWZhdWx0OiAnLTEnLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZygn5pys5qyh5qOA5p+l5pel5pyf77yaJywgY3VycmVudERhdGUsICctLS0g5pyA5ZCO6L+b5YWl5bm/5ZGK6aG15pel5pyf77yaJywgZGF0YSk7XG4gICAgICBpZiAoZGF0YSAhPT0gY3VycmVudERhdGUpIHtcbiAgICAgICAgLy/ml6XmnJ/kuI3nm7jlkIxcbiAgICAgICAgLy8g6YeN572u5bm/5ZGK54K55Ye75qyh5pWwXG4gICAgICAgIF9zeXN0ZW0uZGVmYXVsdC5zZXQoe1xuICAgICAgICAgIGtleTogJ3RvZGF5Q2xpY2tzJyxcbiAgICAgICAgICB2YWx1ZTogJzAnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8v6L+b5YWl5bm/5ZGK6aG15pe25omn6KGMXG5mdW5jdGlvbiBpbmNyZW1lbnRUb2RheUNsaWNrcygpIHtcbiAgX3N5c3RlbS5kZWZhdWx0LmdldCh7XG4gICAga2V5OiAndG9kYXlDbGlja3MnLFxuICAgIGRlZmF1bHQ6ICcwJyxcbiAgICAvL+m7mOiupDDmrKFcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+asoeaVsCsxLOW9k+WJjeasoeaVsCcsIGRhdGEpO1xuICAgICAgbGV0IHRvZGF5Q2xpY2tzID0gcGFyc2VJbnQoZGF0YSkgfHwgMDtcbiAgICAgIHRvZGF5Q2xpY2tzID0gdG9kYXlDbGlja3MgKyAxO1xuICAgICAgX3N5c3RlbS5kZWZhdWx0LnNldCh7XG4gICAgICAgIGtleTogJ3RvZGF5Q2xpY2tzJyxcbiAgICAgICAgdmFsdWU6IHRvZGF5Q2xpY2tzLnRvU3RyaW5nKClcbiAgICAgIH0pO1xuICAgICAgX3N5c3RlbS5kZWZhdWx0LnNldCh7XG4gICAgICAgIGtleTogJ2xhc3RSZXNldERhdGUnLFxuICAgICAgICB2YWx1ZTogbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZ2V0U3RvcmFnZSxcbiAgc2V0U3RvcmFnZSxcbiAgaW5jcmVtZW50VG9kYXlDbGlja3MsXG4gIHJlc2V0VG9kYXlDbGlja3NJZk5lZWRlZFxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfc3lzdGVtID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmRldmljZVwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH0gLyoqXG4gKiDmgqjlj6/ku6XlsIbluLjnlKjnmoTmlrnms5XjgIHmiJbns7vnu58gQVBJ77yM57uf5LiA5bCB6KOF77yM5pq06Zyy5YWo5bGA77yM5Lul5L6/5ZCE6aG16Z2i44CB57uE5Lu26LCD55So77yM6ICM5peg6ZyAIHJlcXVpcmUgLyBpbXBvcnQuXG4gKi9cbi8vIOiKgua1gemYgFxuY29uc3QgdGhyb3R0bGUgPSAoZm4sIGdhcFRpbWUgPSAxNTAwKSA9PiB7XG4gIGxldCBfbGFzdFRpbWUgPSBudWxsO1xuICAvLyDov5Tlm57mlrDnmoTlh73mlbBcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgX25vd1RpbWUgPSArbmV3IERhdGUoKTtcbiAgICBpZiAoX25vd1RpbWUgLSBfbGFzdFRpbWUgPiBnYXBUaW1lIHx8ICFfbGFzdFRpbWUpIHtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8v5bCGdGhpc+WSjOWPguaVsOS8oOe7meWOn+WHveaVsFxuICAgICAgX2xhc3RUaW1lID0gX25vd1RpbWU7XG4gICAgfVxuICB9O1xufTtcbmNvbnN0IHtcbiAgSlNFbmNyeXB0XG59ID0gcmVxdWlyZSgnLi4vbGlicy9qc2VuY3J5cHQvbGliL2luZGV4Jyk7XG5jb25zdCBjb25maWcgPSB7XG4gIHB1YmxpY0tleTogJ01JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBcWFqMFkzazU0akN5VHE0N3Q3M1NjQlg5dUJzU1NjRG83L3VaK1BoSFloOWVRcUhOVzFiQmpLR1Y0dDNZOFdva2h2Nzgza3J4aElxemtQZjluSGVaMnlXcW9RbFBhM3FPVWM3V2YvSHBYMitlSEdSakYxL1JMQVJKbU1jRWdRWUIzV0diZFJlZHUwRmpRU0dkK09mU1MvVzdIZWgyWkdsRi9hU0hqMk5ZaFlFNHA3eDRqalFJaSt1ZUtadlZKTlpwdTB2aFFhRjQ1anBxUURVTFBMK01ra1FlUG11cGpwL1BSNFJhOEJWZzREd0p1STZLOGpMNzdZV2F4ZVFSYk1yRWlRMFpiVEtSUTRvOE43M2lJTTk3RS9oOFBiRGw1RmJ1Tm4wazh1cmtZbm12NTZBTWRrVkV5SU9Vd05FYThvVTlRS3ozN281WjJMNyt5cXgyem1McFZ3SURBUUFCJ1xufTtcbmNvbnN0IGRhdGFFbmNyeXB0aW9uID0gKGRhdGEsIGFjdGlvbiA9IFwiZW5jcnlwdFwiKSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IGtleU1hcCA9IHtcbiAgICAgIGVuY3J5cHQ6IGNvbmZpZy5wdWJsaWNLZXksXG4gICAgICBkZWNyeXB0OiBjb25maWcucHJpdmF0ZUtleVxuICAgIH07XG4gICAgbGV0IGtleSA9IGtleU1hcFthY3Rpb25dO1xuICAgIGxldCBfZGF0YSA9IGFjdGlvbiA9PT0gXCJlbmNyeXB0XCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChhY3Rpb24gPT09IFwiZW5jcnlwdFwiKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRvciA9IG5ldyBKU0VuY3J5cHQoKTtcbiAgICAgICAgZW5jcnlwdG9yLnNldFB1YmxpY0tleShrZXkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gZW5jcnlwdG9yLmVuY3J5cHQoX2RhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQsICfmn6XnnIvmnInku4DkuYgnKTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yLCAn6L2s5o2i5oql6ZSZ77yfJyk7XG4gIH1cbn07XG5jb25zdCBnZXRVc2VySWQgPSBhc3luYyAoKSA9PiB7XG4gIGxldCB1c2VySWQgPSBhd2FpdCBfc3lzdGVtLmRlZmF1bHQuZ2V0VXNlcklkKCk7XG4gIHJldHVybiB1c2VySWQuZGF0YS51c2VySWQ7XG59O1xuY29uc3QgZ2V0T0FJRCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IG9haWQgPSBhd2FpdCBfc3lzdGVtLmRlZmF1bHQuZ2V0T0FJRCgpO1xuICByZXR1cm4gb2FpZDtcbn07XG5cbi8qKlxuICog6L2s5YyW5LiK5LygXG4gKiBAcGFyYW0geyp9IHRoYXQg5omA5ZyodGhpcyBcbiAqL1xuZnVuY3Rpb24gZ2V0Q29udmVydFVwbG9hZCgpIHtcbiAgbGV0IHBhcmFtID0gX29iamVjdFNwcmVhZCh7fSwgZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbSk7XG4gIGNvbnNvbGUubG9nKCdnZXRDb252ZXJ0VXBsb2FkKCkg6L2s5YyW5Y+C5pWwcGFyYW09ICcsIHBhcmFtKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW0pIHtcbiAgICBwYXJhbVtrZXldID0gcGFyYW1ba2V5XS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG4gIH1cbiAgY29uc3QgY29udmVydGVkUGFyYW0gPSBjb252ZXJ0S2V5c1RvQ2FtZWxDYXNlKHBhcmFtKTtcbiAgaWYgKCFjb252ZXJ0ZWRQYXJhbS5vYWlkICYmICFjb252ZXJ0ZWRQYXJhbS5hZGdyb3VwSWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ2dldENvbnZlcnRVcGxvYWQoKSDmoLzlvI/ljJbovazljJblj4LmlbBjb252ZXJ0ZWRQYXJhbT0gJywgY29udmVydGVkUGFyYW0pXG4gICRhcGlzLmV4YW1wbGUuY29udmVydFVwbG9hZChfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIGNvbnZlcnRlZFBhcmFtKSwge30sIHtcbiAgICBkZXZpY2VJZDogY29udmVydGVkUGFyYW0ub2FpZCxcbiAgICB0eXBlOiBjb252ZXJ0ZWRQYXJhbS50eXBlIHx8ICdqaCdcbiAgfSkpLnRoZW4ocmVzID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXMsICfovazmjaLmiJDlip8nKTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIsICfovazmjaLlpLHotKUnKTtcbiAgfSk7XG59XG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9fKFthLXpdKS9nLCAoXywgbGV0dGVyKSA9PiBsZXR0ZXIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0S2V5c1RvQ2FtZWxDYXNlKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5tYXAodiA9PiBjb252ZXJ0S2V5c1RvQ2FtZWxDYXNlKHYpKTtcbiAgfSBlbHNlIGlmIChvYmogIT09IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgICBjb25zdCBjYW1lbENhc2VLZXkgPSB0b0NhbWVsQ2FzZShrZXkpO1xuICAgICAgcmVzdWx0W2NhbWVsQ2FzZUtleV0gPSBjb252ZXJ0S2V5c1RvQ2FtZWxDYXNlKG9ialtrZXldKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuKiDkv53lrZjlub/lkYrlm57kvKDlj4LmlbAgICByb3V0ZXIucHVzaChPQkpFQ1QpICDkvovvvJpAcGFyYW0ge09iamVjdH0gZT0naGFwOi8vYXBwL2NvbS5jb21wYW55LmFwcC9pbmRleD9wYXJhbTE9dmFsdWUxJ1xuKi9cbmNvbnN0IHNhdmVIYXBVcmkgPSBlID0+IHtcbiAgLy8gY29uc29sZS5sb2coJ3NhdmVIYXBVcmkoKSDovazljJblj4LmlbBlPSAnLCBlKVxuXG4gIGNvbnN0IHtcbiAgICBjaGFubmVsVmFsdWUgPSAnJyxcbiAgICBvYWlkID0gJydcbiAgfSA9IGU7XG4gIGlmIChvYWlkKSB7XG4gICAgZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbSA9IF9vYmplY3RTcHJlYWQoe30sIGUpO1xuICB9XG59O1xuXG4vKipcbiog5o+S5bGP5bm/5ZGKIFxuKi9cblxuY29uc3QgdGFibGVQbGFxdWUgPSBhc3luYyAob25DbG9zZUNhbGxiYWNrLCBvbkNhdGNoQ2FsbGJhY2spID0+IHtcbiAgLy8gY29uc3Qgc3RvcmFnZUZsYWcgPSBhd2FpdCAkcHJvY2Vzc0RhdGEuZ2V0U3RvcmFnZShcIl9QUklWQUNcIik7XG4gIC8vIGlmICghc3RvcmFnZUZsYWcpIHtcbiAgLy8gICAvL+acquaOiOadg++8jOW8ueWHuuaOiOadg+ivoumXrlxuICAvLyAgIGNvbnNvbGUubG9nKCfnlKjmiLfmjojmnYM9ICcsIHN0b3JhZ2VGbGFnKTtcbiAgLy8gICBjb25zb2xlLmxvZygn5pyq5o6I5p2DLOS4jeWKoOi9veaPkuWxj+W5v+WRiicpO1xuICAvLyAgIHJldHVyblxuICAvLyB9XG5cbiAgbGV0IFByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XG4gIGlmICghUHJvdmlkZXIpIHtcbiAgICBjb25zb2xlLmxvZygn5rKh5pyJ5bm/5ZGK5ZWGJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBpbnRlcnN0aXRpYWxBZCA9ICRhZC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgYWRVbml0SWQ6IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5pbnRlcnN0aXRpYWxBZFVuaXRJZFxuICB9KTtcbiAgaW50ZXJzdGl0aWFsQWQubG9hZCgpLnRoZW4ocmVzID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXMsICfmn6XlsY/liqDovb3miJDlip8nKTtcbiAgICBpbnRlcnN0aXRpYWxBZC5zaG93KCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGKc2hvd+aIkOWKnycpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCfmj5LlsY/lub/lkYpzaG935aSx6LSlJyk7XG4gICAgfSk7XG4gIH0pXG4gIC8vIC5jYXRjaCgoZXJyKSA9PiB7XG4gIC8vICAgY29uc29sZS5sb2coZXJyLCAn5o+S5bGP5Yqg6L295aSx6LSlJyk7XG4gIC8vIH0pXG4gIC5jYXRjaChvbkNhdGNoQ2FsbGJhY2spO1xuICBpbnRlcnN0aXRpYWxBZC5vbkNsaWNrKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGK54K55Ye75LqGJyk7XG4gICAgLy/ovazljJbkuIrkvKBcbiAgICBnZXRDb252ZXJ0VXBsb2FkKCk7XG4gIH0pO1xuICBpbnRlcnN0aXRpYWxBZC5vbkNsb3NlKG9uQ2xvc2VDYWxsYmFjayk7XG59O1xuXG4vKipcbiogYmFubmVy5bm/5ZGKICBtYXJnaW5fYm905bqV6YOo57yp6L+bICBcbiovXG5cbmxldCBiYW5uZXJBZDtcbmNvbnN0IHNob3dCYW5uZXJBZCA9IGFzeW5jIG1hcmdpbl9ib3QgPT4ge1xuICAvLyBjb25zdCBzdG9yYWdlRmxhZyA9IGF3YWl0ICRwcm9jZXNzRGF0YS5nZXRTdG9yYWdlKFwiX1BSSVZBQ1wiKTtcbiAgLy8gaWYgKCFzdG9yYWdlRmxhZykge1xuICAvLyAgIC8v5pyq5o6I5p2D77yM5by55Ye65o6I5p2D6K+i6ZeuXG4gIC8vICAgY29uc29sZS5sb2coJ+eUqOaIt+aOiOadgz0gJywgc3RvcmFnZUZsYWcpO1xuICAvLyAgIGNvbnNvbGUubG9nKCfmnKrmjojmnYMs5LiN5Yqg6L29YmFubmVy5bm/5ZGKJyk7XG4gIC8vICAgcmV0dXJuXG4gIC8vIH1cblxuICBsZXQgUHJvdmlkZXIgPSAkYWQuZ2V0UHJvdmlkZXIoKTtcbiAgaWYgKCFQcm92aWRlcikge1xuICAgIGNvbnNvbGUubG9nKCfmsqHmnInlub/lkYrov5Tlm54nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGQgPSBfc3lzdGVtLmRlZmF1bHQuZ2V0SW5mb1N5bmMoKTtcbiAgLy8gY29uc29sZS5pbmZvKFwiYmFubmVy5bm/5ZGKLeiuvuWkh+S/oeaBryBcIiArIEpTT04uc3RyaW5naWZ5KGQpKTtcblxuICBsZXQgaGVpZ2h0ID0gMTQ0OyAvL+S4pOenjemrmOW6piAgNTfkuI4xNDRcbiAgLy/ojrflj5bpobXpnaLlhoXlj6/op4Hnqpflj6PnmoTpq5jluqblkozlrr3luqbvvIzmraTlgLzkuI3ljIXmi6zmoIfpopjmoI/lkoznirbmgIHmoI/pq5jluqZcbiAgbGV0IHdpbmRvd1dpZHRoID0gZC5zY3JlZW5XaWR0aDtcbiAgbGV0IHdpbmRvd0hlaWdodCA9IGQuc2NyZWVuSGVpZ2h0IC0gMTUzIC0gbWFyZ2luX2JvdDtcbiAgLy9sb2dpY1dpZHRo5a+55bqUbWFuaWZlc3QuanNvbuaWh+S7tuiuvue9rueahGRlc2lnbldpZHRo5YC877yM6buY6K6k5pivNzUwXG4gIGxldCBsb2dpY1dpZHRoID0gNzUwO1xuICAvL+W5v+WRiuiHqui6q+Wkp+Wwj+WNleS9jeaYr2Rw77yM6ZyA6KaB6L2s5o2i5oiQcHjljZXkvY1cbiAgbGV0IHJlYWxBZEhlaWdoUFggPSBoZWlnaHQgKiBkLnNjcmVlbkRlbnNpdHk7XG4gIC8v5qCH6aKY5qCP6auY5bqm5LiA6Iis5pivNDJkcOW3puWPs++8jOatpOWkhOS5n+mcgOimgei9rOaNouaIkHB45Y2V5L2NXG4gIGxldCB0aXRsZUJhckhlaWdodCA9IDQyICogZC5zY3JlZW5EZW5zaXR5O1xuICAvL+atpOWkhOiuoeeul+W+iOWFs+mUru+8jOmcgOimgeWwhueKtuaAgeagj+mrmOW6puOAgeagh+mimOagj+mrmOW6puWKoOS4ilxuICBsZXQgcmVhbFRvcHB4ID0gd2luZG93SGVpZ2h0IC0gcmVhbEFkSGVpZ2hQWCArIGQuc3RhdHVzQmFySGVpZ2h0ICsgdGl0bGVCYXJIZWlnaHQ7XG5cbiAgLy8gY29uc29sZS5pbmZvKFwiY2FsQmFubmVyUG9zdGlvbjEgcmVhbFRvcHB4PVwiICsgcmVhbFRvcHB4ICsgXCIsIGxvZ2ljV2lkdGg9IFwiICsgbG9naWNXaWR0aCwgXCJ3aW5kb3dXaWR0aD0gXCIgKyB3aW5kb3dXaWR0aCk7XG4gIC8v6L2s5o2i5oiQ6aG16Z2i5Z+65YeG5YC85LiL55qE6YC76L6R5Y2V5L2NXG4gIGxldCBsb2dpY1dlYlRvcCA9IHJlYWxUb3BweCAqIGxvZ2ljV2lkdGggLyB3aW5kb3dXaWR0aDtcblxuICAvL+atpOWvueixoeivt+iHquW3seWcqGRhdGHkuIvlrprkuYlcbiAgbGV0IHRvcCA9IGxvZ2ljV2ViVG9wID09PSAwID8gMTIzMCA6IGxvZ2ljV2ViVG9wO1xuICAvLyBjb25zb2xlLmluZm8oXCJjYWxCYW5uZXJQb3N0aW9uMSB0b3A9XCIgKyB0b3AgKyBcIiwgbG9naWNXZWJUb3A9IFwiICsgbG9naWNXZWJUb3ApO1xuXG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiB0b3AsXG4gICAgd2lkdGg6IDM2MCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xuICBsZXQgYWRpZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5iYW5uZXJBZFVuaXRJZDtcbiAgLy8gbGV0IGFkaWQgPSAnejF2Nmp5a3Z5OSdcbiAgLy8gY29uc29sZS5pbmZvKFwiYmFubmVy5bm/5ZGK5L2NPVwiICsgYWRpZCk7XG4gIGJhbm5lckFkID0gJGFkLmNyZWF0ZUJhbm5lckFkKHtcbiAgICBhZFVuaXRJZDogYWRpZCxcbiAgICAvL2Jhbm5lcuW5v+WRiuS9jVxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBhZEludGVydmFsczogNjAgLy/liLfmlrDml7bpl7TvvIznp5JcbiAgfSk7XG4gIC8vIGNvbnNvbGUuaW5mbyhcImFubmVyQWQuc3R5bGU9XCIgKyBKU09OLnN0cmluZ2lmeShiYW5uZXJBZC5zdHlsZSkpO1xuICBiYW5uZXJBZC5vbkxvYWQoZSA9PiB7XG4gICAgY29uc29sZS5pbmZvKFwibG9hZCBiYW5uZXJBZCAgb25sb2FkIHN1Y2Nlc3MgZT1cIiArIEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgfSk7XG4gIGJhbm5lckFkLm9uRXJyb3IoZSA9PiB7XG4gICAgLy8gY29uc29sZS5lcnJvcihcImxvYWQgYmFubmVyQWQgIG9uRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XG4gIH0pO1xuICBiYW5uZXJBZC5vbkNsb3NlKGUgPT4ge1xuICAgIC8vIGNvbnNvbGUuaW5mbyhcImxvYWQgYmFubmVyQWQgIG9uQ2xvc2VcIik7XG4gIH0pO1xuICBiYW5uZXJBZC5zaG93KCk7XG59O1xuY29uc3QgaGlkZUJhbmVyQWQgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLmhpZGUoKTtcbiAgfVxufTtcbmNvbnN0IHZpZXdCYW5uZXIgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLnNob3coKTtcbiAgfVxufTtcbmNvbnN0IGRlc3Ryb3lCYW5uZXIgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLmRlc3Ryb3koKTtcbiAgfVxufTtcblxuLyoqXG4gKiDliIbnp5LlgJLorqHml7ZcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb3VudERvd25EYXRhIOebuOWFs+WPguaVsO+8mnRvdGFsU2Vjb25kc+WAkuiuoeaXtuenkuaVsOOAgW5hbWXlsZ7mgKflkI3np7DjgIFpc0Zvcm1hdOagvOW8j+WMllxuICogQHBhcmFtIHsqfSB0aGF0IOW9k+WJjee7hOS7tnRoaXNcbiAqL1xuY29uc3Qgc3RhcnRDb3VudERvd24gPSAoY291bnREb3duRGF0YSwgdGhhdCkgPT4ge1xuICBsZXQge1xuICAgIHRvdGFsU2Vjb25kcyA9IDMsXG4gICAgbmFtZSxcbiAgICBpc0Zvcm1hdCA9IGZhbHNlXG4gIH0gPSBjb3VudERvd25EYXRhO1xuICBsZXQgX3RoaXMgPSB0aGF0O1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICh0b3RhbFNlY29uZHMgPiAxKSB7XG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gaXNGb3JtYXQgPyAodm9pZCAwKS5mb3JtYXRUaW1lKE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApKSA6IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xuICAgICAgICBjb25zdCBzZWNvbmRzID0gaXNGb3JtYXQgPyAodm9pZCAwKS5mb3JtYXRUaW1lKE1hdGguZmxvb3IodG90YWxTZWNvbmRzICUgNjApKSA6IE1hdGguZmxvb3IodG90YWxTZWNvbmRzICUgNjApO1xuICAgICAgICBfdGhpc1tuYW1lXSA9IHtcbiAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoX3RoaXMudGltZXIpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gICAgX3RoaXMudGltZXIgPSB0aW1lcjtcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0ge1xuICB0aHJvdHRsZSxcbiAgZ2V0VXNlcklkLFxuICBnZXRDb252ZXJ0VXBsb2FkLFxuICBzdGFydENvdW50RG93bixcbiAgZGF0YUVuY3J5cHRpb24sXG4gIHRhYmxlUGxhcXVlLFxuICBzaG93QmFubmVyQWQsXG4gIGhpZGVCYW5lckFkLFxuICB2aWV3QmFubmVyLFxuICBkZXN0cm95QmFubmVyLFxuICBzYXZlSGFwVXJpLFxuICBnZXRPQUlEXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5KU0VuY3J5cHQgPSB2b2lkIDA7XG52YXIgX2Jhc2UgPSByZXF1aXJlKFwiLi9saWIvanNibi9iYXNlNjRcIik7XG52YXIgX0pTRW5jcnlwdFJTQUtleSA9IHJlcXVpcmUoXCIuL0pTRW5jcnlwdFJTQUtleVwiKTtcbnZhciBfYTtcbnZhciB2ZXJzaW9uID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnID8gKF9hID0gcHJvY2Vzcy5lbnYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ucG1fcGFja2FnZV92ZXJzaW9uIDogdW5kZWZpbmVkO1xuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zID0ge31dIC0gQW4gb2JqZWN0IHRvIGN1c3RvbWl6ZSBKU0VuY3J5cHQgYmVoYXZpb3VyXG4gKiBwb3NzaWJsZSBwYXJhbWV0ZXJzIGFyZTpcbiAqIC0gZGVmYXVsdF9rZXlfc2l6ZSAgICAgICAge251bWJlcn0gIGRlZmF1bHQ6IDEwMjQgdGhlIGtleSBzaXplIGluIGJpdFxuICogLSBkZWZhdWx0X3B1YmxpY19leHBvbmVudCB7c3RyaW5nfSAgZGVmYXVsdDogJzAxMDAwMScgdGhlIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMgZXhwb25lbnRcbiAqIC0gbG9nICAgICAgICAgICAgICAgICAgICAge2Jvb2xlYW59IGRlZmF1bHQ6IGZhbHNlIHdoZXRoZXIgbG9nIHdhcm4vZXJyb3Igb3Igbm90XG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIEpTRW5jcnlwdCA9IGV4cG9ydHMuSlNFbmNyeXB0ID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSlNFbmNyeXB0KG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSA9IG9wdGlvbnMuZGVmYXVsdF9rZXlfc2l6ZSA/IHBhcnNlSW50KG9wdGlvbnMuZGVmYXVsdF9rZXlfc2l6ZSwgMTApIDogMTAyNDtcbiAgICB0aGlzLmRlZmF1bHRfcHVibGljX2V4cG9uZW50ID0gb3B0aW9ucy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCB8fCBcIjAxMDAwMVwiOyAvLyA2NTUzNyBkZWZhdWx0IG9wZW5zc2wgcHVibGljIGV4cG9uZW50IGZvciByc2Ega2V5IHR5cGVcbiAgICB0aGlzLmxvZyA9IG9wdGlvbnMubG9nIHx8IGZhbHNlO1xuICAgIC8vIFRoZSBwcml2YXRlIGFuZCBwdWJsaWMga2V5LlxuICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgfVxuICAvKipcbiAgICogTWV0aG9kIHRvIHNldCB0aGUgcnNhIGtleSBwYXJhbWV0ZXIgKG9uZSBtZXRob2QgaXMgZW5vdWdoIHRvIHNldCBib3RoIHRoZSBwdWJsaWNcbiAgICogYW5kIHRoZSBwcml2YXRlIGtleSwgc2luY2UgdGhlIHByaXZhdGUga2V5IGNvbnRhaW5zIHRoZSBwdWJsaWMga2V5IHBhcmFtZW50ZXJzKVxuICAgKiBMb2cgYSB3YXJuaW5nIGlmIGxvZ3MgYXJlIGVuYWJsZWRcbiAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBrZXkgdGhlIHBlbSBlbmNvZGVkIHN0cmluZyBvciBhbiBvYmplY3QgKHdpdGggb3Igd2l0aG91dCBoZWFkZXIvZm9vdGVyKVxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLnNldEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAodGhpcy5sb2cgJiYgdGhpcy5rZXkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkEga2V5IHdhcyBhbHJlYWR5IHNldCwgb3ZlcnJpZGluZyBleGlzdGluZy5cIik7XG4gICAgfVxuICAgIHRoaXMua2V5ID0gbmV3IF9KU0VuY3J5cHRSU0FLZXkuSlNFbmNyeXB0UlNBS2V5KGtleSk7XG4gIH07XG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIHNldEtleSwgZm9yIGFwaSBjb21wYXRpYmlsaXR5XG4gICAqIEBzZWUgc2V0S2V5XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuc2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uIChwcml2a2V5KSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBrZXkuXG4gICAgdGhpcy5zZXRLZXkocHJpdmtleSk7XG4gIH07XG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIHNldEtleSwgZm9yIGFwaSBjb21wYXRpYmlsaXR5XG4gICAqIEBzZWUgc2V0S2V5XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuc2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKHB1YmtleSkge1xuICAgIC8vIFNldHMgdGhlIHB1YmxpYyBrZXkuXG4gICAgdGhpcy5zZXRLZXkocHVia2V5KTtcbiAgfTtcbiAgLyoqXG4gICAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIGRlY3J5cHQsIGRlY3J5cHQgdGhlIHN0cmluZyB1c2luZyB0aGUgcHJpdmF0ZVxuICAgKiBjb21wb25lbnRzIG9mIHRoZSByc2Ega2V5IG9iamVjdC4gTm90ZSB0aGF0IGlmIHRoZSBvYmplY3Qgd2FzIG5vdCBzZXQgd2lsbCBiZSBjcmVhdGVkXG4gICAqIG9uIHRoZSBmbHkgKGJ5IHRoZSBnZXRLZXkgbWV0aG9kKSB1c2luZyB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4gdGhlIEpTRW5jcnlwdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIGJhc2U2NCBlbmNvZGVkIGNyeXB0ZWQgc3RyaW5nIHRvIGRlY3J5cHRcbiAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgZGVjcnlwdGVkIHN0cmluZ1xuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBkZWNyeXB0ZWQgc3RyaW5nLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS5kZWNyeXB0KCgwLCBfYmFzZS5iNjR0b2hleCkoc3RyKSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIFJTQUtleSBvYmplY3QncyBlbmNyeXB0LCBlbmNyeXB0IHRoZSBzdHJpbmcgdXNpbmcgdGhlIHB1YmxpY1xuICAgKiBjb21wb25lbnRzIG9mIHRoZSByc2Ega2V5IG9iamVjdC4gTm90ZSB0aGF0IGlmIHRoZSBvYmplY3Qgd2FzIG5vdCBzZXQgd2lsbCBiZSBjcmVhdGVkXG4gICAqIG9uIHRoZSBmbHkgKGJ5IHRoZSBnZXRLZXkgbWV0aG9kKSB1c2luZyB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4gdGhlIEpTRW5jcnlwdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIHRoZSBzdHJpbmcgdG8gZW5jcnlwdFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlbmNyeXB0ZWQgc3RyaW5nIGVuY29kZWQgaW4gYmFzZTY0XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAvLyBSZXR1cm4gdGhlIGVuY3J5cHRlZCBzdHJpbmcuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoMCwgX2Jhc2UuaGV4MmI2NCkodGhpcy5nZXRLZXkoKS5lbmNyeXB0KHN0cikpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogUHJveHkgbWV0aG9kIGZvciBSU0FLZXkgb2JqZWN0J3Mgc2lnbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIHNpZ25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnZXN0TWV0aG9kIGhhc2ggbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaWdlc3ROYW1lIHRoZSBuYW1lIG9mIHRoZSBoYXNoIGFsZ29yaXRobVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBzaWduYXR1cmUgZW5jb2RlZCBpbiBiYXNlNjRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gKHN0ciwgZGlnZXN0TWV0aG9kLCBkaWdlc3ROYW1lKSB7XG4gICAgLy8gcmV0dXJuIHRoZSBSU0Egc2lnbmF0dXJlIG9mICdzdHInIGluICdoZXgnIGZvcm1hdC5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuICgwLCBfYmFzZS5oZXgyYjY0KSh0aGlzLmdldEtleSgpLnNpZ24oc3RyLCBkaWdlc3RNZXRob2QsIGRpZ2VzdE5hbWUpKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIHZlcmlmeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIHZlcmlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2lnbmF0dXJlIHRoZSBzaWduYXR1cmUgZW5jb2RlZCBpbiBiYXNlNjQgdG8gY29tcGFyZSB0aGUgc3RyaW5nIHRvXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ2VzdE1ldGhvZCBoYXNoIG1ldGhvZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSB3aGV0aGVyIHRoZSBkYXRhIGFuZCBzaWduYXR1cmUgbWF0Y2hcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAoc3RyLCBzaWduYXR1cmUsIGRpZ2VzdE1ldGhvZCkge1xuICAgIC8vIFJldHVybiB0aGUgZGVjcnlwdGVkICdkaWdlc3QnIG9mIHRoZSBzaWduYXR1cmUuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmdldEtleSgpLnZlcmlmeShzdHIsICgwLCBfYmFzZS5iNjR0b2hleCkoc2lnbmF0dXJlKSwgZGlnZXN0TWV0aG9kKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIEdldHRlciBmb3IgdGhlIGN1cnJlbnQgSlNFbmNyeXB0UlNBS2V5IG9iamVjdC4gSWYgaXQgZG9lc24ndCBleGlzdHMgYSBuZXcgb2JqZWN0XG4gICAqIHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWRcbiAgICogQHBhcmFtIHtjYWxsYmFja30gW2NiXSB0aGUgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGlmIHdlIHdhbnQgdGhlIGtleSB0byBiZSBnZW5lcmF0ZWRcbiAgICogaW4gYW4gYXN5bmMgZmFzaGlvblxuICAgKiBAcmV0dXJucyB7SlNFbmNyeXB0UlNBS2V5fSB0aGUgSlNFbmNyeXB0UlNBS2V5IG9iamVjdFxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChjYikge1xuICAgIC8vIE9ubHkgY3JlYXRlIG5ldyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAgICBpZiAoIXRoaXMua2V5KSB7XG4gICAgICAvLyBHZXQgYSBuZXcgcHJpdmF0ZSBrZXkuXG4gICAgICB0aGlzLmtleSA9IG5ldyBfSlNFbmNyeXB0UlNBS2V5LkpTRW5jcnlwdFJTQUtleSgpO1xuICAgICAgaWYgKGNiICYmIHt9LnRvU3RyaW5nLmNhbGwoY2IpID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgICAgdGhpcy5rZXkuZ2VuZXJhdGVBc3luYyh0aGlzLmRlZmF1bHRfa2V5X3NpemUsIHRoaXMuZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQsIGNiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gR2VuZXJhdGUgdGhlIGtleS5cbiAgICAgIHRoaXMua2V5LmdlbmVyYXRlKHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSwgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmtleTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcml2YXRlIGtleVxuICAgKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHByaXZhdGUga2V5IFdJVEggaGVhZGVyIGFuZCBmb290ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS5nZXRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJldHVybiB0aGUgcHJpdmF0ZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGtleS5cbiAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS5nZXRQcml2YXRlS2V5KCk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJpdmF0ZSBrZXlcbiAgICogSWYgdGhlIGtleSBkb2Vzbid0IGV4aXN0cyBhIG5ldyBrZXkgd2lsbCBiZSBjcmVhdGVkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcml2YXRlIGtleSBXSVRIT1VUIGhlYWRlciBhbmQgZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleUI2NCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHByaXZhdGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBrZXkuXG4gICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHJpdmF0ZUJhc2VLZXlCNjQoKTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5XG4gICAqIElmIHRoZSBrZXkgZG9lc24ndCBleGlzdHMgYSBuZXcga2V5IHdpbGwgYmUgY3JlYXRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHVibGljIGtleSBXSVRIIGhlYWRlciBhbmQgZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuZ2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJldHVybiB0aGUgcHJpdmF0ZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGtleS5cbiAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS5nZXRQdWJsaWNLZXkoKTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5XG4gICAqIElmIHRoZSBrZXkgZG9lc24ndCBleGlzdHMgYSBuZXcga2V5IHdpbGwgYmUgY3JlYXRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHVibGljIGtleSBXSVRIT1VUIGhlYWRlciBhbmQgZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuZ2V0UHVibGljS2V5QjY0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJldHVybiB0aGUgcHJpdmF0ZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGtleS5cbiAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS5nZXRQdWJsaWNCYXNlS2V5QjY0KCk7XG4gIH07XG4gIEpTRW5jcnlwdC52ZXJzaW9uID0gdmVyc2lvbjtcbiAgcmV0dXJuIEpTRW5jcnlwdDtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSlNFbmNyeXB0UlNBS2V5ID0gdm9pZCAwO1xudmFyIF9iYXNlID0gcmVxdWlyZShcIi4vbGliL2pzYm4vYmFzZTY0XCIpO1xudmFyIF9oZXggPSByZXF1aXJlKFwiLi9saWIvYXNuMWpzL2hleFwiKTtcbnZhciBfYmFzZTIgPSByZXF1aXJlKFwiLi9saWIvYXNuMWpzL2Jhc2U2NFwiKTtcbnZhciBfYXNuID0gcmVxdWlyZShcIi4vbGliL2FzbjFqcy9hc24xXCIpO1xudmFyIF9yc2EgPSByZXF1aXJlKFwiLi9saWIvanNibi9yc2FcIik7XG52YXIgX2pzYm4gPSByZXF1aXJlKFwiLi9saWIvanNibi9qc2JuXCIpO1xudmFyIF9hc24yID0gcmVxdWlyZShcIi4vbGliL2pzcnNhc2lnbi9hc24xLTEuMFwiKTtcbnZhciBfX2V4dGVuZHMgPSB2b2lkIDAgJiYgKHZvaWQgMCkuX19leHRlbmRzIHx8IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwge1xuICAgICAgX19wcm90b19fOiBbXVxuICAgIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgZC5fX3Byb3RvX18gPSBiO1xuICAgIH0gfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgIGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07XG4gICAgfTtcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgZnVuY3Rpb24gX18oKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgICB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICB9O1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgSlNFbmNyeXB0UlNBS2V5IHRoYXQgZXh0ZW5kcyBUb20gV3UncyBSU0Ega2V5IG9iamVjdC5cbiAqIFRoaXMgb2JqZWN0IGlzIGp1c3QgYSBkZWNvcmF0b3IgZm9yIHBhcnNpbmcgdGhlIGtleSBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0ga2V5IC0gVGhlIGtleSBpbiBzdHJpbmcgZm9ybWF0LCBvciBhbiBvYmplY3QgY29udGFpbmluZ1xuICogdGhlIHBhcmFtZXRlcnMgbmVlZGVkIHRvIGJ1aWxkIGEgUlNBS2V5IG9iamVjdC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgSlNFbmNyeXB0UlNBS2V5ID0gZXhwb3J0cy5KU0VuY3J5cHRSU0FLZXkgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKF9zdXBlcikge1xuICBfX2V4dGVuZHMoSlNFbmNyeXB0UlNBS2V5LCBfc3VwZXIpO1xuICBmdW5jdGlvbiBKU0VuY3J5cHRSU0FLZXkoa2V5KSB7XG4gICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAvLyBDYWxsIHRoZSBzdXBlciBjb25zdHJ1Y3Rvci5cbiAgICAvLyAgUlNBS2V5LmNhbGwodGhpcyk7XG4gICAgLy8gSWYgYSBrZXkga2V5IHdhcyBwcm92aWRlZC5cbiAgICBpZiAoa2V5KSB7XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc3RyaW5nLi4uXG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBfdGhpcy5wYXJzZUtleShrZXkpO1xuICAgICAgfSBlbHNlIGlmIChKU0VuY3J5cHRSU0FLZXkuaGFzUHJpdmF0ZUtleVByb3BlcnR5KGtleSkgfHwgSlNFbmNyeXB0UlNBS2V5Lmhhc1B1YmxpY0tleVByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB2YWx1ZXMgZm9yIHRoZSBrZXkuXG4gICAgICAgIF90aGlzLnBhcnNlUHJvcGVydGllc0Zyb20oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcGFyc2UgYSBwZW0gZW5jb2RlZCBzdHJpbmcgY29udGFpbmluZyBib3RoIGEgcHVibGljIG9yIHByaXZhdGUga2V5LlxuICAgKiBUaGUgbWV0aG9kIHdpbGwgdHJhbnNsYXRlIHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcgaW4gYSBkZXIgZW5jb2RlZCBzdHJpbmcgYW5kXG4gICAqIHdpbGwgcGFyc2UgcHJpdmF0ZSBrZXkgYW5kIHB1YmxpYyBrZXkgcGFyYW1ldGVycy4gVGhpcyBtZXRob2QgYWNjZXB0cyBwdWJsaWMga2V5XG4gICAqIGluIHRoZSByc2FlbmNyeXB0aW9uIHBrY3MgIzEgZm9ybWF0IChvaWQ6IDEuMi44NDAuMTEzNTQ5LjEuMS4xKS5cbiAgICpcbiAgICogQHRvZG8gQ2hlY2sgaG93IG1hbnkgcnNhIGZvcm1hdHMgdXNlIHRoZSBzYW1lIGZvcm1hdCBvZiBwa2NzICMxLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGRlZmluZWQgYXM6XG4gICAqIFB1YmxpY0tleUluZm8gOjo9IFNFUVVFTkNFIHtcbiAgICogICBhbGdvcml0aG0gICAgICAgQWxnb3JpdGhtSWRlbnRpZmllcixcbiAgICogICBQdWJsaWNLZXkgICAgICAgQklUIFNUUklOR1xuICAgKiB9XG4gICAqIFdoZXJlIEFsZ29yaXRobUlkZW50aWZpZXIgaXM6XG4gICAqIEFsZ29yaXRobUlkZW50aWZpZXIgOjo9IFNFUVVFTkNFIHtcbiAgICogICBhbGdvcml0aG0gICAgICAgT0JKRUNUIElERU5USUZJRVIsICAgICB0aGUgT0lEIG9mIHRoZSBlbmMgYWxnb3JpdGhtXG4gICAqICAgcGFyYW1ldGVycyAgICAgIEFOWSBERUZJTkVEIEJZIGFsZ29yaXRobSBPUFRJT05BTCAoTlVMTCBmb3IgUEtDUyAjMSlcbiAgICogfVxuICAgKiBhbmQgUHVibGljS2V5IGlzIGEgU0VRVUVOQ0UgZW5jYXBzdWxhdGVkIGluIGEgQklUIFNUUklOR1xuICAgKiBSU0FQdWJsaWNLZXkgOjo9IFNFUVVFTkNFIHtcbiAgICogICBtb2R1bHVzICAgICAgICAgICBJTlRFR0VSLCAgLS0gblxuICAgKiAgIHB1YmxpY0V4cG9uZW50ICAgIElOVEVHRVIgICAtLSBlXG4gICAqIH1cbiAgICogaXQncyBwb3NzaWJsZSB0byBleGFtaW5lIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGtleXMgb2J0YWluZWQgZnJvbSBvcGVuc3NsIHVzaW5nXG4gICAqIGFuIGFzbi4xIGR1bXBlciBhcyB0aGUgb25lIHVzZWQgaGVyZSB0byBwYXJzZSB0aGUgY29tcG9uZW50czogaHR0cDovL2xhcG8uaXQvYXNuMWpzL1xuICAgKiBAYXJndW1lbnQge3N0cmluZ30gcGVtIHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcsIGNhbiBpbmNsdWRlIHRoZSBCRUdJTi9FTkQgaGVhZGVyL2Zvb3RlclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5wYXJzZUtleSA9IGZ1bmN0aW9uIChwZW0pIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG1vZHVsdXMgPSAwO1xuICAgICAgdmFyIHB1YmxpY19leHBvbmVudCA9IDA7XG4gICAgICB2YXIgcmVIZXggPSAvXlxccyooPzpbMC05QS1GYS1mXVswLTlBLUZhLWZdXFxzKikrJC87XG4gICAgICB2YXIgZGVyID0gcmVIZXgudGVzdChwZW0pID8gX2hleC5IZXguZGVjb2RlKHBlbSkgOiBfYmFzZTIuQmFzZTY0LnVuYXJtb3IocGVtKTtcbiAgICAgIHZhciBhc24xID0gX2Fzbi5BU04xLmRlY29kZShkZXIpO1xuICAgICAgLy8gRml4ZXMgYSBidWcgd2l0aCBPcGVuU1NMIDEuMCsgcHJpdmF0ZSBrZXlzXG4gICAgICBpZiAoYXNuMS5zdWIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGFzbjEgPSBhc24xLnN1YlsyXS5zdWJbMF07XG4gICAgICB9XG4gICAgICBpZiAoYXNuMS5zdWIubGVuZ3RoID09PSA5KSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBwcml2YXRlIGtleS5cbiAgICAgICAgbW9kdWx1cyA9IGFzbjEuc3ViWzFdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxuICAgICAgICB0aGlzLm4gPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKG1vZHVsdXMsIDE2KTtcbiAgICAgICAgcHVibGljX2V4cG9uZW50ID0gYXNuMS5zdWJbMl0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gaW50XG4gICAgICAgIHRoaXMuZSA9IHBhcnNlSW50KHB1YmxpY19leHBvbmVudCwgMTYpO1xuICAgICAgICB2YXIgcHJpdmF0ZV9leHBvbmVudCA9IGFzbjEuc3ViWzNdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxuICAgICAgICB0aGlzLmQgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKHByaXZhdGVfZXhwb25lbnQsIDE2KTtcbiAgICAgICAgdmFyIHByaW1lMSA9IGFzbjEuc3ViWzRdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxuICAgICAgICB0aGlzLnAgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKHByaW1lMSwgMTYpO1xuICAgICAgICB2YXIgcHJpbWUyID0gYXNuMS5zdWJbNV0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XG4gICAgICAgIHRoaXMucSA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkocHJpbWUyLCAxNik7XG4gICAgICAgIHZhciBleHBvbmVudDEgPSBhc24xLnN1Yls2XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5kbXAxID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShleHBvbmVudDEsIDE2KTtcbiAgICAgICAgdmFyIGV4cG9uZW50MiA9IGFzbjEuc3ViWzddLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxuICAgICAgICB0aGlzLmRtcTEgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKGV4cG9uZW50MiwgMTYpO1xuICAgICAgICB2YXIgY29lZmZpY2llbnQgPSBhc24xLnN1Yls4XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5jb2VmZiA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoY29lZmZpY2llbnQsIDE2KTtcbiAgICAgIH0gZWxzZSBpZiAoYXNuMS5zdWIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGlmIChhc24xLnN1YlswXS5zdWIpIHtcbiAgICAgICAgICAvLyBQYXJzZSBBU04uMSBTdWJqZWN0UHVibGljS2V5SW5mbyB0eXBlIGFzIGRlZmluZWQgYnkgWC41MDlcbiAgICAgICAgICB2YXIgYml0X3N0cmluZyA9IGFzbjEuc3ViWzFdO1xuICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IGJpdF9zdHJpbmcuc3ViWzBdO1xuICAgICAgICAgIG1vZHVsdXMgPSBzZXF1ZW5jZS5zdWJbMF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcbiAgICAgICAgICB0aGlzLm4gPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKG1vZHVsdXMsIDE2KTtcbiAgICAgICAgICBwdWJsaWNfZXhwb25lbnQgPSBzZXF1ZW5jZS5zdWJbMV0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcbiAgICAgICAgICB0aGlzLmUgPSBwYXJzZUludChwdWJsaWNfZXhwb25lbnQsIDE2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJzZSBBU04uMSBSU0FQdWJsaWNLZXkgdHlwZSBhcyBkZWZpbmVkIGJ5IFBLQ1MgIzFcbiAgICAgICAgICBtb2R1bHVzID0gYXNuMS5zdWJbMF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcbiAgICAgICAgICB0aGlzLm4gPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKG1vZHVsdXMsIDE2KTtcbiAgICAgICAgICBwdWJsaWNfZXhwb25lbnQgPSBhc24xLnN1YlsxXS5nZXRIZXhTdHJpbmdWYWx1ZSgpO1xuICAgICAgICAgIHRoaXMuZSA9IHBhcnNlSW50KHB1YmxpY19leHBvbmVudCwgMTYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSByc2EgcGFyYW1ldGVycyBpbiBhIGhleCBlbmNvZGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBrZXkuXG4gICAqXG4gICAqIFRoZSB0cmFuc2xhdGlvbiBmb2xsb3cgdGhlIEFTTi4xIG5vdGF0aW9uIDpcbiAgICogUlNBUHJpdmF0ZUtleSA6Oj0gU0VRVUVOQ0Uge1xuICAgKiAgIHZlcnNpb24gICAgICAgICAgIFZlcnNpb24sXG4gICAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cbiAgICogICBwdWJsaWNFeHBvbmVudCAgICBJTlRFR0VSLCAgLS0gZVxuICAgKiAgIHByaXZhdGVFeHBvbmVudCAgIElOVEVHRVIsICAtLSBkXG4gICAqICAgcHJpbWUxICAgICAgICAgICAgSU5URUdFUiwgIC0tIHBcbiAgICogICBwcmltZTIgICAgICAgICAgICBJTlRFR0VSLCAgLS0gcVxuICAgKiAgIGV4cG9uZW50MSAgICAgICAgIElOVEVHRVIsICAtLSBkIG1vZCAocDEpXG4gICAqICAgZXhwb25lbnQyICAgICAgICAgSU5URUdFUiwgIC0tIGQgbW9kIChxLTEpXG4gICAqICAgY29lZmZpY2llbnQgICAgICAgSU5URUdFUiwgIC0tIChpbnZlcnNlIG9mIHEpIG1vZCBwXG4gICAqIH1cbiAgICogQHJldHVybnMge3N0cmluZ30gIERFUiBFbmNvZGVkIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBwcml2YXRlIGtleVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlQmFzZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIGFycmF5OiBbbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgaW50OiAwXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLm5cbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBpbnQ6IHRoaXMuZVxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5kXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLnBcbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBiaWdpbnQ6IHRoaXMucVxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5kbXAxXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLmRtcTFcbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBiaWdpbnQ6IHRoaXMuY29lZmZcbiAgICAgIH0pXVxuICAgIH07XG4gICAgdmFyIHNlcSA9IG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSU2VxdWVuY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHNlcS5nZXRFbmNvZGVkSGV4KCk7XG4gIH07XG4gIC8qKlxuICAgKiBiYXNlNjQgKHBlbSkgZW5jb2RlZCB2ZXJzaW9uIG9mIHRoZSBERVIgZW5jb2RlZCByZXByZXNlbnRhdGlvblxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiB3aXRob3V0IGhlYWRlciBhbmQgZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUuZ2V0UHJpdmF0ZUJhc2VLZXlCNjQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICgwLCBfYmFzZS5oZXgyYjY0KSh0aGlzLmdldFByaXZhdGVCYXNlS2V5KCkpO1xuICB9O1xuICAvKipcbiAgICogVHJhbnNsYXRlIHJzYSBwYXJhbWV0ZXJzIGluIGEgaGV4IGVuY29kZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIHB1YmxpYyBrZXkuXG4gICAqIFRoZSByZXByZXNlbnRhdGlvbiBmb2xsb3cgdGhlIEFTTi4xIG5vdGF0aW9uIDpcbiAgICogUHVibGljS2V5SW5mbyA6Oj0gU0VRVUVOQ0Uge1xuICAgKiAgIGFsZ29yaXRobSAgICAgICBBbGdvcml0aG1JZGVudGlmaWVyLFxuICAgKiAgIFB1YmxpY0tleSAgICAgICBCSVQgU1RSSU5HXG4gICAqIH1cbiAgICogV2hlcmUgQWxnb3JpdGhtSWRlbnRpZmllciBpczpcbiAgICogQWxnb3JpdGhtSWRlbnRpZmllciA6Oj0gU0VRVUVOQ0Uge1xuICAgKiAgIGFsZ29yaXRobSAgICAgICBPQkpFQ1QgSURFTlRJRklFUiwgICAgIHRoZSBPSUQgb2YgdGhlIGVuYyBhbGdvcml0aG1cbiAgICogICBwYXJhbWV0ZXJzICAgICAgQU5ZIERFRklORUQgQlkgYWxnb3JpdGhtIE9QVElPTkFMIChOVUxMIGZvciBQS0NTICMxKVxuICAgKiB9XG4gICAqIGFuZCBQdWJsaWNLZXkgaXMgYSBTRVFVRU5DRSBlbmNhcHN1bGF0ZWQgaW4gYSBCSVQgU1RSSU5HXG4gICAqIFJTQVB1YmxpY0tleSA6Oj0gU0VRVUVOQ0Uge1xuICAgKiAgIG1vZHVsdXMgICAgICAgICAgIElOVEVHRVIsICAtLSBuXG4gICAqICAgcHVibGljRXhwb25lbnQgICAgSU5URUdFUiAgIC0tIGVcbiAgICogfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBERVIgRW5jb2RlZCBTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByc2EgcHVibGljIGtleVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQdWJsaWNCYXNlS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaXJzdF9zZXF1ZW5jZSA9IG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSU2VxdWVuY2Uoe1xuICAgICAgYXJyYXk6IFtuZXcgX2FzbjIuS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIoe1xuICAgICAgICBvaWQ6IFwiMS4yLjg0MC4xMTM1NDkuMS4xLjFcIlxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSTnVsbCgpXVxuICAgIH0pO1xuICAgIHZhciBzZWNvbmRfc2VxdWVuY2UgPSBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUlNlcXVlbmNlKHtcbiAgICAgIGFycmF5OiBbbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLm5cbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBpbnQ6IHRoaXMuZVxuICAgICAgfSldXG4gICAgfSk7XG4gICAgdmFyIGJpdF9zdHJpbmcgPSBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7XG4gICAgICBoZXg6IFwiMDBcIiArIHNlY29uZF9zZXF1ZW5jZS5nZXRFbmNvZGVkSGV4KClcbiAgICB9KTtcbiAgICB2YXIgc2VxID0gbmV3IF9hc24yLktKVVIuYXNuMS5ERVJTZXF1ZW5jZSh7XG4gICAgICBhcnJheTogW2ZpcnN0X3NlcXVlbmNlLCBiaXRfc3RyaW5nXVxuICAgIH0pO1xuICAgIHJldHVybiBzZXEuZ2V0RW5jb2RlZEhleCgpO1xuICB9O1xuICAvKipcbiAgICogYmFzZTY0IChwZW0pIGVuY29kZWQgdmVyc2lvbiBvZiB0aGUgREVSIGVuY29kZWQgcmVwcmVzZW50YXRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gd2l0aG91dCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLmdldFB1YmxpY0Jhc2VLZXlCNjQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICgwLCBfYmFzZS5oZXgyYjY0KSh0aGlzLmdldFB1YmxpY0Jhc2VLZXkoKSk7XG4gIH07XG4gIC8qKlxuICAgKiB3cmFwIHRoZSBzdHJpbmcgaW4gYmxvY2sgb2Ygd2lkdGggY2hhcnMuIFRoZSBkZWZhdWx0IHZhbHVlIGZvciByc2Ega2V5cyBpcyA2NFxuICAgKiBjaGFyYWN0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcgd2l0aG91dCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW3dpZHRoPTY0XSAtIHRoZSBsZW5ndGggdGhlIHN0cmluZyBoYXMgdG8gYmUgd3JhcHBlZCBhdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LndvcmR3cmFwID0gZnVuY3Rpb24gKHN0ciwgd2lkdGgpIHtcbiAgICB3aWR0aCA9IHdpZHRoIHx8IDY0O1xuICAgIGlmICghc3RyKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB2YXIgcmVnZXggPSBcIiguezEsXCIgKyB3aWR0aCArIFwifSkoICt8JFxcbj8pfCguezEsXCIgKyB3aWR0aCArIFwifSlcIjtcbiAgICByZXR1cm4gc3RyLm1hdGNoKFJlZ0V4cChyZWdleCwgXCJnXCIpKS5qb2luKFwiXFxuXCIpO1xuICB9O1xuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHBlbSBlbmNvZGVkIHByaXZhdGUga2V5XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwZW0gZW5jb2RlZCBwcml2YXRlIGtleSB3aXRoIGhlYWRlci9mb290ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBrZXkgPSBcIi0tLS0tQkVHSU4gUlNBIFBSSVZBVEUgS0VZLS0tLS1cXG5cIjtcbiAgICBrZXkgKz0gSlNFbmNyeXB0UlNBS2V5LndvcmR3cmFwKHRoaXMuZ2V0UHJpdmF0ZUJhc2VLZXlCNjQoKSkgKyBcIlxcblwiO1xuICAgIGtleSArPSBcIi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tXCI7XG4gICAgcmV0dXJuIGtleTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBwZW0gZW5jb2RlZCBwdWJsaWMga2V5XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwZW0gZW5jb2RlZCBwdWJsaWMga2V5IHdpdGggaGVhZGVyL2Zvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLmdldFB1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5ID0gXCItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxcblwiO1xuICAgIGtleSArPSBKU0VuY3J5cHRSU0FLZXkud29yZHdyYXAodGhpcy5nZXRQdWJsaWNCYXNlS2V5QjY0KCkpICsgXCJcXG5cIjtcbiAgICBrZXkgKz0gXCItLS0tLUVORCBQVUJMSUMgS0VZLS0tLS1cIjtcbiAgICByZXR1cm4ga2V5O1xuICB9O1xuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG9iamVjdCBjb250YWlucyB0aGUgbmVjZXNzYXJ5IHBhcmFtZXRlcnMgdG8gcG9wdWxhdGUgdGhlIHJzYSBtb2R1bHVzXG4gICAqIGFuZCBwdWJsaWMgZXhwb25lbnQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvYmo9e31dIC0gQW4gb2JqZWN0IHRoYXQgbWF5IGNvbnRhaW4gdGhlIHR3byBwdWJsaWMga2V5XG4gICAqIHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBjb250YWlucyBib3RoIHRoZSBtb2R1bHVzIGFuZCB0aGUgcHVibGljIGV4cG9uZW50XG4gICAqIHByb3BlcnRpZXMgKG4gYW5kIGUpXG4gICAqIEB0b2RvIGNoZWNrIGZvciB0eXBlcyBvZiBuIGFuZCBlLiBOIHNob3VsZCBiZSBhIHBhcnNlYWJsZSBiaWdJbnQgb2JqZWN0LCBFIHNob3VsZFxuICAgKiBiZSBhIHBhcnNlYWJsZSBpbnRlZ2VyIG51bWJlclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5Lmhhc1B1YmxpY0tleVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KFwiblwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJlXCIpO1xuICB9O1xuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG9iamVjdCBjb250YWlucyBBTEwgdGhlIHBhcmFtZXRlcnMgb2YgYW4gUlNBIGtleS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvYmo9e31dIC0gQW4gb2JqZWN0IHRoYXQgbWF5IGNvbnRhaW4gbmluZSByc2Ega2V5XG4gICAqIHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIG9iamVjdCBjb250YWlucyBhbGwgdGhlIHBhcmFtZXRlcnMgbmVlZGVkXG4gICAqIEB0b2RvIGNoZWNrIGZvciB0eXBlcyBvZiB0aGUgcGFyYW1ldGVycyBhbGwgdGhlIHBhcmFtZXRlcnMgYnV0IHRoZSBwdWJsaWMgZXhwb25lbnRcbiAgICogc2hvdWxkIGJlIHBhcnNlYWJsZSBiaWdpbnQgb2JqZWN0cywgdGhlIHB1YmxpYyBleHBvbmVudCBzaG91bGQgYmUgYSBwYXJzZWFibGUgaW50ZWdlciBudW1iZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5oYXNQcml2YXRlS2V5UHJvcGVydHkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgb2JqID0gb2JqIHx8IHt9O1xuICAgIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoXCJuXCIpICYmIG9iai5oYXNPd25Qcm9wZXJ0eShcImVcIikgJiYgb2JqLmhhc093blByb3BlcnR5KFwiZFwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJwXCIpICYmIG9iai5oYXNPd25Qcm9wZXJ0eShcInFcIikgJiYgb2JqLmhhc093blByb3BlcnR5KFwiZG1wMVwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJkbXExXCIpICYmIG9iai5oYXNPd25Qcm9wZXJ0eShcImNvZWZmXCIpO1xuICB9O1xuICAvKipcbiAgICogUGFyc2UgdGhlIHByb3BlcnRpZXMgb2Ygb2JqIGluIHRoZSBjdXJyZW50IHJzYSBvYmplY3QuIE9iaiBzaG91bGQgQVQgTEVBU1RcbiAgICogaW5jbHVkZSB0aGUgbW9kdWx1cyBhbmQgcHVibGljIGV4cG9uZW50IChuLCBlKSBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCBjb250YWluaW5nIHJzYSBwYXJhbWV0ZXJzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLnBhcnNlUHJvcGVydGllc0Zyb20gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdGhpcy5uID0gb2JqLm47XG4gICAgdGhpcy5lID0gb2JqLmU7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShcImRcIikpIHtcbiAgICAgIHRoaXMuZCA9IG9iai5kO1xuICAgICAgdGhpcy5wID0gb2JqLnA7XG4gICAgICB0aGlzLnEgPSBvYmoucTtcbiAgICAgIHRoaXMuZG1wMSA9IG9iai5kbXAxO1xuICAgICAgdGhpcy5kbXExID0gb2JqLmRtcTE7XG4gICAgICB0aGlzLmNvZWZmID0gb2JqLmNvZWZmO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIEpTRW5jcnlwdFJTQUtleTtcbn0oX3JzYS5SU0FLZXkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSlNFbmNyeXB0XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9KU0VuY3J5cHQuSlNFbmNyeXB0O1xuICB9XG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfSlNFbmNyeXB0ID0gcmVxdWlyZShcIi4vSlNFbmNyeXB0XCIpO1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gX0pTRW5jcnlwdC5KU0VuY3J5cHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlN0cmVhbSA9IGV4cG9ydHMuQVNOMVRhZyA9IGV4cG9ydHMuQVNOMSA9IHZvaWQgMDtcbnZhciBfaW50ID0gcmVxdWlyZShcIi4vaW50MTBcIik7XG4vLyBBU04uMSBKYXZhU2NyaXB0IGRlY29kZXJcbi8vIENvcHlyaWdodCAoYykgMjAwOC0yMDE0IExhcG8gTHVjaGluaSA8bGFwb0BsYXBvLml0PlxuLy8gUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4vLyBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQsIHByb3ZpZGVkIHRoYXQgdGhlIGFib3ZlXG4vLyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIGFwcGVhciBpbiBhbGwgY29waWVzLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTXG4vLyBXSVRIIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUlxuLy8gQU5ZIFNQRUNJQUwsIERJUkVDVCwgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFU1xuLy8gV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTSBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1IgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRlxuLy8gT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1IgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgaW1tZWQ6IHRydWUsIGxhdGVkZWY6IHRydWUsIHVuZGVmOiB0cnVlLCByZWdleGRhc2g6IGZhbHNlICovXG4vKmdsb2JhbCBvaWRzICovXG5cbnZhciBlbGxpcHNpcyA9IFwiXFx1MjAyNlwiO1xudmFyIHJlVGltZVMgPSAvXihcXGRcXGQpKDBbMS05XXwxWzAtMl0pKDBbMS05XXxbMTJdXFxkfDNbMDFdKShbMDFdXFxkfDJbMC0zXSkoPzooWzAtNV1cXGQpKD86KFswLTVdXFxkKSg/OlsuLF0oXFxkezEsM30pKT8pPyk/KFp8Wy0rXSg/OlswXVxcZHwxWzAtMl0pKFswLTVdXFxkKT8pPyQvO1xudmFyIHJlVGltZUwgPSAvXihcXGRcXGRcXGRcXGQpKDBbMS05XXwxWzAtMl0pKDBbMS05XXxbMTJdXFxkfDNbMDFdKShbMDFdXFxkfDJbMC0zXSkoPzooWzAtNV1cXGQpKD86KFswLTVdXFxkKSg/OlsuLF0oXFxkezEsM30pKT8pPyk/KFp8Wy0rXSg/OlswXVxcZHwxWzAtMl0pKFswLTVdXFxkKT8pPyQvO1xuZnVuY3Rpb24gc3RyaW5nQ3V0KHN0ciwgbGVuKSB7XG4gIGlmIChzdHIubGVuZ3RoID4gbGVuKSB7XG4gICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBsZW4pICsgZWxsaXBzaXM7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cbnZhciBTdHJlYW0gPSBleHBvcnRzLlN0cmVhbSA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0cmVhbShlbmMsIHBvcykge1xuICAgIHRoaXMuaGV4RGlnaXRzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgaWYgKGVuYyBpbnN0YW5jZW9mIFN0cmVhbSkge1xuICAgICAgdGhpcy5lbmMgPSBlbmMuZW5jO1xuICAgICAgdGhpcy5wb3MgPSBlbmMucG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbmMgc2hvdWxkIGJlIGFuIGFycmF5IG9yIGEgYmluYXJ5IHN0cmluZ1xuICAgICAgdGhpcy5lbmMgPSBlbmM7XG4gICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB9XG4gIH1cbiAgU3RyZWFtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgaWYgKHBvcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwb3MgPSB0aGlzLnBvcysrO1xuICAgIH1cbiAgICBpZiAocG9zID49IHRoaXMuZW5jLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWVzdGluZyBieXRlIG9mZnNldCBcIi5jb25jYXQocG9zLCBcIiBvbiBhIHN0cmVhbSBvZiBsZW5ndGggXCIpLmNvbmNhdCh0aGlzLmVuYy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIFwic3RyaW5nXCIgPT09IHR5cGVvZiB0aGlzLmVuYyA/IHRoaXMuZW5jLmNoYXJDb2RlQXQocG9zKSA6IHRoaXMuZW5jW3Bvc107XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUuaGV4Qnl0ZSA9IGZ1bmN0aW9uIChiKSB7XG4gICAgcmV0dXJuIHRoaXMuaGV4RGlnaXRzLmNoYXJBdChiID4+IDQgJiAweEYpICsgdGhpcy5oZXhEaWdpdHMuY2hhckF0KGIgJiAweEYpO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLmhleER1bXAgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgcmF3KSB7XG4gICAgdmFyIHMgPSBcIlwiO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBzICs9IHRoaXMuaGV4Qnl0ZSh0aGlzLmdldChpKSk7XG4gICAgICBpZiAocmF3ICE9PSB0cnVlKSB7XG4gICAgICAgIHN3aXRjaCAoaSAmIDB4Rikge1xuICAgICAgICAgIGNhc2UgMHg3OlxuICAgICAgICAgICAgcyArPSBcIiAgXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDB4RjpcbiAgICAgICAgICAgIHMgKz0gXCJcXG5cIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzICs9IFwiIFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLmlzQVNDSUkgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB2YXIgYyA9IHRoaXMuZ2V0KGkpO1xuICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTc2KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VTdHJpbmdJU08gPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBzID0gXCJcIjtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuZ2V0KGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VTdHJpbmdVVEYgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBzID0gXCJcIjtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7KSB7XG4gICAgICB2YXIgYyA9IHRoaXMuZ2V0KGkrKyk7XG4gICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICB9IGVsc2UgaWYgKGMgPiAxOTEgJiYgYyA8IDIyNCkge1xuICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAweDFGKSA8PCA2IHwgdGhpcy5nZXQoaSsrKSAmIDB4M0YpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMHgwRikgPDwgMTIgfCAodGhpcy5nZXQoaSsrKSAmIDB4M0YpIDw8IDYgfCB0aGlzLmdldChpKyspICYgMHgzRik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nQk1QID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3RyID0gXCJcIjtcbiAgICB2YXIgaGk7XG4gICAgdmFyIGxvO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDspIHtcbiAgICAgIGhpID0gdGhpcy5nZXQoaSsrKTtcbiAgICAgIGxvID0gdGhpcy5nZXQoaSsrKTtcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGhpIDw8IDggfCBsbyk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VUaW1lID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHNob3J0WWVhcikge1xuICAgIHZhciBzID0gdGhpcy5wYXJzZVN0cmluZ0lTTyhzdGFydCwgZW5kKTtcbiAgICB2YXIgbSA9IChzaG9ydFllYXIgPyByZVRpbWVTIDogcmVUaW1lTCkuZXhlYyhzKTtcbiAgICBpZiAoIW0pIHtcbiAgICAgIHJldHVybiBcIlVucmVjb2duaXplZCB0aW1lOiBcIiArIHM7XG4gICAgfVxuICAgIGlmIChzaG9ydFllYXIpIHtcbiAgICAgIC8vIHRvIGF2b2lkIHF1ZXJ5aW5nIHRoZSB0aW1lciwgdXNlIHRoZSBmaXhlZCByYW5nZSBbMTk3MCwgMjA2OV1cbiAgICAgIC8vIGl0IHdpbGwgY29uZm9ybSB3aXRoIElUVSBYLjQwMCBbLTEwLCArNDBdIHNsaWRpbmcgd2luZG93IHVudGlsIDIwMzBcbiAgICAgIG1bMV0gPSArbVsxXTtcbiAgICAgIG1bMV0gKz0gK21bMV0gPCA3MCA/IDIwMDAgOiAxOTAwO1xuICAgIH1cbiAgICBzID0gbVsxXSArIFwiLVwiICsgbVsyXSArIFwiLVwiICsgbVszXSArIFwiIFwiICsgbVs0XTtcbiAgICBpZiAobVs1XSkge1xuICAgICAgcyArPSBcIjpcIiArIG1bNV07XG4gICAgICBpZiAobVs2XSkge1xuICAgICAgICBzICs9IFwiOlwiICsgbVs2XTtcbiAgICAgICAgaWYgKG1bN10pIHtcbiAgICAgICAgICBzICs9IFwiLlwiICsgbVs3XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobVs4XSkge1xuICAgICAgcyArPSBcIiBVVENcIjtcbiAgICAgIGlmIChtWzhdICE9IFwiWlwiKSB7XG4gICAgICAgIHMgKz0gbVs4XTtcbiAgICAgICAgaWYgKG1bOV0pIHtcbiAgICAgICAgICBzICs9IFwiOlwiICsgbVs5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5wYXJzZUludGVnZXIgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciB2ID0gdGhpcy5nZXQoc3RhcnQpO1xuICAgIHZhciBuZWcgPSB2ID4gMTI3O1xuICAgIHZhciBwYWQgPSBuZWcgPyAyNTUgOiAwO1xuICAgIHZhciBsZW47XG4gICAgdmFyIHMgPSBcIlwiO1xuICAgIC8vIHNraXAgdW51c2VmdWwgYml0cyAobm90IGFsbG93ZWQgaW4gREVSKVxuICAgIHdoaWxlICh2ID09IHBhZCAmJiArK3N0YXJ0IDwgZW5kKSB7XG4gICAgICB2ID0gdGhpcy5nZXQoc3RhcnQpO1xuICAgIH1cbiAgICBsZW4gPSBlbmQgLSBzdGFydDtcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICByZXR1cm4gbmVnID8gLTEgOiAwO1xuICAgIH1cbiAgICAvLyBzaG93IGJpdCBsZW5ndGggb2YgaHVnZSBpbnRlZ2Vyc1xuICAgIGlmIChsZW4gPiA0KSB7XG4gICAgICBzID0gdjtcbiAgICAgIGxlbiA8PD0gMztcbiAgICAgIHdoaWxlICgoKCtzIF4gcGFkKSAmIDB4ODApID09IDApIHtcbiAgICAgICAgcyA9ICtzIDw8IDE7XG4gICAgICAgIC0tbGVuO1xuICAgICAgfVxuICAgICAgcyA9IFwiKFwiICsgbGVuICsgXCIgYml0KVxcblwiO1xuICAgIH1cbiAgICAvLyBkZWNvZGUgdGhlIGludGVnZXJcbiAgICBpZiAobmVnKSB7XG4gICAgICB2ID0gdiAtIDI1NjtcbiAgICB9XG4gICAgdmFyIG4gPSBuZXcgX2ludC5JbnQxMCh2KTtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQgKyAxOyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIG4ubXVsQWRkKDI1NiwgdGhpcy5nZXQoaSkpO1xuICAgIH1cbiAgICByZXR1cm4gcyArIG4udG9TdHJpbmcoKTtcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5wYXJzZUJpdFN0cmluZyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBtYXhMZW5ndGgpIHtcbiAgICB2YXIgdW51c2VkQml0ID0gdGhpcy5nZXQoc3RhcnQpO1xuICAgIHZhciBsZW5CaXQgPSAoZW5kIC0gc3RhcnQgLSAxIDw8IDMpIC0gdW51c2VkQml0O1xuICAgIHZhciBpbnRybyA9IFwiKFwiICsgbGVuQml0ICsgXCIgYml0KVxcblwiO1xuICAgIHZhciBzID0gXCJcIjtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQgKyAxOyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHZhciBiID0gdGhpcy5nZXQoaSk7XG4gICAgICB2YXIgc2tpcCA9IGkgPT0gZW5kIC0gMSA/IHVudXNlZEJpdCA6IDA7XG4gICAgICBmb3IgKHZhciBqID0gNzsgaiA+PSBza2lwOyAtLWopIHtcbiAgICAgICAgcyArPSBiID4+IGogJiAxID8gXCIxXCIgOiBcIjBcIjtcbiAgICAgIH1cbiAgICAgIGlmIChzLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICByZXR1cm4gaW50cm8gKyBzdHJpbmdDdXQocywgbWF4TGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGludHJvICsgcztcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5wYXJzZU9jdGV0U3RyaW5nID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIG1heExlbmd0aCkge1xuICAgIGlmICh0aGlzLmlzQVNDSUkoc3RhcnQsIGVuZCkpIHtcbiAgICAgIHJldHVybiBzdHJpbmdDdXQodGhpcy5wYXJzZVN0cmluZ0lTTyhzdGFydCwgZW5kKSwgbWF4TGVuZ3RoKTtcbiAgICB9XG4gICAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuICAgIHZhciBzID0gXCIoXCIgKyBsZW4gKyBcIiBieXRlKVxcblwiO1xuICAgIG1heExlbmd0aCAvPSAyOyAvLyB3ZSB3b3JrIGluIGJ5dGVzXG4gICAgaWYgKGxlbiA+IG1heExlbmd0aCkge1xuICAgICAgZW5kID0gc3RhcnQgKyBtYXhMZW5ndGg7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBzICs9IHRoaXMuaGV4Qnl0ZSh0aGlzLmdldChpKSk7XG4gICAgfVxuICAgIGlmIChsZW4gPiBtYXhMZW5ndGgpIHtcbiAgICAgIHMgKz0gZWxsaXBzaXM7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlT0lEID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIG1heExlbmd0aCkge1xuICAgIHZhciBzID0gXCJcIjtcbiAgICB2YXIgbiA9IG5ldyBfaW50LkludDEwKCk7XG4gICAgdmFyIGJpdHMgPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB2YXIgdiA9IHRoaXMuZ2V0KGkpO1xuICAgICAgbi5tdWxBZGQoMTI4LCB2ICYgMHg3Rik7XG4gICAgICBiaXRzICs9IDc7XG4gICAgICBpZiAoISh2ICYgMHg4MCkpIHtcbiAgICAgICAgLy8gZmluaXNoZWRcbiAgICAgICAgaWYgKHMgPT09IFwiXCIpIHtcbiAgICAgICAgICBuID0gbi5zaW1wbGlmeSgpO1xuICAgICAgICAgIGlmIChuIGluc3RhbmNlb2YgX2ludC5JbnQxMCkge1xuICAgICAgICAgICAgbi5zdWIoODApO1xuICAgICAgICAgICAgcyA9IFwiMi5cIiArIG4udG9TdHJpbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG0gPSBuIDwgODAgPyBuIDwgNDAgPyAwIDogMSA6IDI7XG4gICAgICAgICAgICBzID0gbSArIFwiLlwiICsgKG4gLSBtICogNDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzICs9IFwiLlwiICsgbi50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBzdHJpbmdDdXQocywgbWF4TGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBuID0gbmV3IF9pbnQuSW50MTAoKTtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChiaXRzID4gMCkge1xuICAgICAgcyArPSBcIi5pbmNvbXBsZXRlXCI7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICByZXR1cm4gU3RyZWFtO1xufSgpO1xudmFyIEFTTjEgPSBleHBvcnRzLkFTTjEgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBU04xKHN0cmVhbSwgaGVhZGVyLCBsZW5ndGgsIHRhZywgc3ViKSB7XG4gICAgaWYgKCEodGFnIGluc3RhbmNlb2YgQVNOMVRhZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdGFnIHZhbHVlLlwiKTtcbiAgICB9XG4gICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5zdWIgPSBzdWI7XG4gIH1cbiAgQVNOMS5wcm90b3R5cGUudHlwZU5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3dpdGNoICh0aGlzLnRhZy50YWdDbGFzcykge1xuICAgICAgY2FzZSAwOlxuICAgICAgICAvLyB1bml2ZXJzYWxcbiAgICAgICAgc3dpdGNoICh0aGlzLnRhZy50YWdOdW1iZXIpIHtcbiAgICAgICAgICBjYXNlIDB4MDA6XG4gICAgICAgICAgICByZXR1cm4gXCJFT0NcIjtcbiAgICAgICAgICBjYXNlIDB4MDE6XG4gICAgICAgICAgICByZXR1cm4gXCJCT09MRUFOXCI7XG4gICAgICAgICAgY2FzZSAweDAyOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5URUdFUlwiO1xuICAgICAgICAgIGNhc2UgMHgwMzpcbiAgICAgICAgICAgIHJldHVybiBcIkJJVF9TVFJJTkdcIjtcbiAgICAgICAgICBjYXNlIDB4MDQ6XG4gICAgICAgICAgICByZXR1cm4gXCJPQ1RFVF9TVFJJTkdcIjtcbiAgICAgICAgICBjYXNlIDB4MDU6XG4gICAgICAgICAgICByZXR1cm4gXCJOVUxMXCI7XG4gICAgICAgICAgY2FzZSAweDA2OlxuICAgICAgICAgICAgcmV0dXJuIFwiT0JKRUNUX0lERU5USUZJRVJcIjtcbiAgICAgICAgICBjYXNlIDB4MDc6XG4gICAgICAgICAgICByZXR1cm4gXCJPYmplY3REZXNjcmlwdG9yXCI7XG4gICAgICAgICAgY2FzZSAweDA4OlxuICAgICAgICAgICAgcmV0dXJuIFwiRVhURVJOQUxcIjtcbiAgICAgICAgICBjYXNlIDB4MDk6XG4gICAgICAgICAgICByZXR1cm4gXCJSRUFMXCI7XG4gICAgICAgICAgY2FzZSAweDBBOlxuICAgICAgICAgICAgcmV0dXJuIFwiRU5VTUVSQVRFRFwiO1xuICAgICAgICAgIGNhc2UgMHgwQjpcbiAgICAgICAgICAgIHJldHVybiBcIkVNQkVEREVEX1BEVlwiO1xuICAgICAgICAgIGNhc2UgMHgwQzpcbiAgICAgICAgICAgIHJldHVybiBcIlVURjhTdHJpbmdcIjtcbiAgICAgICAgICBjYXNlIDB4MTA6XG4gICAgICAgICAgICByZXR1cm4gXCJTRVFVRU5DRVwiO1xuICAgICAgICAgIGNhc2UgMHgxMTpcbiAgICAgICAgICAgIHJldHVybiBcIlNFVFwiO1xuICAgICAgICAgIGNhc2UgMHgxMjpcbiAgICAgICAgICAgIHJldHVybiBcIk51bWVyaWNTdHJpbmdcIjtcbiAgICAgICAgICBjYXNlIDB4MTM6XG4gICAgICAgICAgICByZXR1cm4gXCJQcmludGFibGVTdHJpbmdcIjtcbiAgICAgICAgICAvLyBBU0NJSSBzdWJzZXRcbiAgICAgICAgICBjYXNlIDB4MTQ6XG4gICAgICAgICAgICByZXR1cm4gXCJUZWxldGV4U3RyaW5nXCI7XG4gICAgICAgICAgLy8gYWthIFQ2MVN0cmluZ1xuICAgICAgICAgIGNhc2UgMHgxNTpcbiAgICAgICAgICAgIHJldHVybiBcIlZpZGVvdGV4U3RyaW5nXCI7XG4gICAgICAgICAgY2FzZSAweDE2OlxuICAgICAgICAgICAgcmV0dXJuIFwiSUE1U3RyaW5nXCI7XG4gICAgICAgICAgLy8gQVNDSUlcbiAgICAgICAgICBjYXNlIDB4MTc6XG4gICAgICAgICAgICByZXR1cm4gXCJVVENUaW1lXCI7XG4gICAgICAgICAgY2FzZSAweDE4OlxuICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJhbGl6ZWRUaW1lXCI7XG4gICAgICAgICAgY2FzZSAweDE5OlxuICAgICAgICAgICAgcmV0dXJuIFwiR3JhcGhpY1N0cmluZ1wiO1xuICAgICAgICAgIGNhc2UgMHgxQTpcbiAgICAgICAgICAgIHJldHVybiBcIlZpc2libGVTdHJpbmdcIjtcbiAgICAgICAgICAvLyBBU0NJSSBzdWJzZXRcbiAgICAgICAgICBjYXNlIDB4MUI6XG4gICAgICAgICAgICByZXR1cm4gXCJHZW5lcmFsU3RyaW5nXCI7XG4gICAgICAgICAgY2FzZSAweDFDOlxuICAgICAgICAgICAgcmV0dXJuIFwiVW5pdmVyc2FsU3RyaW5nXCI7XG4gICAgICAgICAgY2FzZSAweDFFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQk1QU3RyaW5nXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiVW5pdmVyc2FsX1wiICsgdGhpcy50YWcudGFnTnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBcIkFwcGxpY2F0aW9uX1wiICsgdGhpcy50YWcudGFnTnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBcIltcIiArIHRoaXMudGFnLnRhZ051bWJlci50b1N0cmluZygpICsgXCJdXCI7XG4gICAgICAvLyBDb250ZXh0XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBcIlByaXZhdGVfXCIgKyB0aGlzLnRhZy50YWdOdW1iZXIudG9TdHJpbmcoKTtcbiAgICB9XG4gIH07XG4gIEFTTjEucHJvdG90eXBlLmNvbnRlbnQgPSBmdW5jdGlvbiAobWF4TGVuZ3RoKSB7XG4gICAgaWYgKHRoaXMudGFnID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAobWF4TGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heExlbmd0aCA9IEluZmluaXR5O1xuICAgIH1cbiAgICB2YXIgY29udGVudCA9IHRoaXMucG9zQ29udGVudCgpO1xuICAgIHZhciBsZW4gPSBNYXRoLmFicyh0aGlzLmxlbmd0aCk7XG4gICAgaWYgKCF0aGlzLnRhZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICBpZiAodGhpcy5zdWIgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiKFwiICsgdGhpcy5zdWIubGVuZ3RoICsgXCIgZWxlbSlcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZU9jdGV0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4sIG1heExlbmd0aCk7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy50YWcudGFnTnVtYmVyKSB7XG4gICAgICBjYXNlIDB4MDE6XG4gICAgICAgIC8vIEJPT0xFQU5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLmdldChjb250ZW50KSA9PT0gMCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiO1xuICAgICAgY2FzZSAweDAyOlxuICAgICAgICAvLyBJTlRFR0VSXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZUludGVnZXIoY29udGVudCwgY29udGVudCArIGxlbik7XG4gICAgICBjYXNlIDB4MDM6XG4gICAgICAgIC8vIEJJVF9TVFJJTkdcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViID8gXCIoXCIgKyB0aGlzLnN1Yi5sZW5ndGggKyBcIiBlbGVtKVwiIDogdGhpcy5zdHJlYW0ucGFyc2VCaXRTdHJpbmcoY29udGVudCwgY29udGVudCArIGxlbiwgbWF4TGVuZ3RoKTtcbiAgICAgIGNhc2UgMHgwNDpcbiAgICAgICAgLy8gT0NURVRfU1RSSU5HXG4gICAgICAgIHJldHVybiB0aGlzLnN1YiA/IFwiKFwiICsgdGhpcy5zdWIubGVuZ3RoICsgXCIgZWxlbSlcIiA6IHRoaXMuc3RyZWFtLnBhcnNlT2N0ZXRTdHJpbmcoY29udGVudCwgY29udGVudCArIGxlbiwgbWF4TGVuZ3RoKTtcbiAgICAgIC8vIGNhc2UgMHgwNTogLy8gTlVMTFxuICAgICAgY2FzZSAweDA2OlxuICAgICAgICAvLyBPQkpFQ1RfSURFTlRJRklFUlxuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VPSUQoY29udGVudCwgY29udGVudCArIGxlbiwgbWF4TGVuZ3RoKTtcbiAgICAgIC8vIGNhc2UgMHgwNzogLy8gT2JqZWN0RGVzY3JpcHRvclxuICAgICAgLy8gY2FzZSAweDA4OiAvLyBFWFRFUk5BTFxuICAgICAgLy8gY2FzZSAweDA5OiAvLyBSRUFMXG4gICAgICAvLyBjYXNlIDB4MEE6IC8vIEVOVU1FUkFURURcbiAgICAgIC8vIGNhc2UgMHgwQjogLy8gRU1CRURERURfUERWXG4gICAgICBjYXNlIDB4MTA6IC8vIFNFUVVFTkNFXG4gICAgICBjYXNlIDB4MTE6XG4gICAgICAgIC8vIFNFVFxuICAgICAgICBpZiAodGhpcy5zdWIgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gXCIoXCIgKyB0aGlzLnN1Yi5sZW5ndGggKyBcIiBlbGVtKVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIihubyBlbGVtKVwiO1xuICAgICAgICB9XG4gICAgICBjYXNlIDB4MEM6XG4gICAgICAgIC8vIFVURjhTdHJpbmdcbiAgICAgICAgcmV0dXJuIHN0cmluZ0N1dCh0aGlzLnN0cmVhbS5wYXJzZVN0cmluZ1VURihjb250ZW50LCBjb250ZW50ICsgbGVuKSwgbWF4TGVuZ3RoKTtcbiAgICAgIGNhc2UgMHgxMjogLy8gTnVtZXJpY1N0cmluZ1xuICAgICAgY2FzZSAweDEzOiAvLyBQcmludGFibGVTdHJpbmdcbiAgICAgIGNhc2UgMHgxNDogLy8gVGVsZXRleFN0cmluZ1xuICAgICAgY2FzZSAweDE1OiAvLyBWaWRlb3RleFN0cmluZ1xuICAgICAgY2FzZSAweDE2OiAvLyBJQTVTdHJpbmdcbiAgICAgIC8vIGNhc2UgMHgxOTogLy8gR3JhcGhpY1N0cmluZ1xuICAgICAgY2FzZSAweDFBOlxuICAgICAgICAvLyBWaXNpYmxlU3RyaW5nXG4gICAgICAgIC8vIGNhc2UgMHgxQjogLy8gR2VuZXJhbFN0cmluZ1xuICAgICAgICAvLyBjYXNlIDB4MUM6IC8vIFVuaXZlcnNhbFN0cmluZ1xuICAgICAgICByZXR1cm4gc3RyaW5nQ3V0KHRoaXMuc3RyZWFtLnBhcnNlU3RyaW5nSVNPKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pLCBtYXhMZW5ndGgpO1xuICAgICAgY2FzZSAweDFFOlxuICAgICAgICAvLyBCTVBTdHJpbmdcbiAgICAgICAgcmV0dXJuIHN0cmluZ0N1dCh0aGlzLnN0cmVhbS5wYXJzZVN0cmluZ0JNUChjb250ZW50LCBjb250ZW50ICsgbGVuKSwgbWF4TGVuZ3RoKTtcbiAgICAgIGNhc2UgMHgxNzogLy8gVVRDVGltZVxuICAgICAgY2FzZSAweDE4OlxuICAgICAgICAvLyBHZW5lcmFsaXplZFRpbWVcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBhcnNlVGltZShjb250ZW50LCBjb250ZW50ICsgbGVuLCB0aGlzLnRhZy50YWdOdW1iZXIgPT0gMHgxNyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlTmFtZSgpICsgXCJAXCIgKyB0aGlzLnN0cmVhbS5wb3MgKyBcIltoZWFkZXI6XCIgKyB0aGlzLmhlYWRlciArIFwiLGxlbmd0aDpcIiArIHRoaXMubGVuZ3RoICsgXCIsc3ViOlwiICsgKHRoaXMuc3ViID09PSBudWxsID8gXCJudWxsXCIgOiB0aGlzLnN1Yi5sZW5ndGgpICsgXCJdXCI7XG4gIH07XG4gIEFTTjEucHJvdG90eXBlLnRvUHJldHR5U3RyaW5nID0gZnVuY3Rpb24gKGluZGVudCkge1xuICAgIGlmIChpbmRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5kZW50ID0gXCJcIjtcbiAgICB9XG4gICAgdmFyIHMgPSBpbmRlbnQgKyB0aGlzLnR5cGVOYW1lKCkgKyBcIiBAXCIgKyB0aGlzLnN0cmVhbS5wb3M7XG4gICAgaWYgKHRoaXMubGVuZ3RoID49IDApIHtcbiAgICAgIHMgKz0gXCIrXCI7XG4gICAgfVxuICAgIHMgKz0gdGhpcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMudGFnLnRhZ0NvbnN0cnVjdGVkKSB7XG4gICAgICBzICs9IFwiIChjb25zdHJ1Y3RlZClcIjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudGFnLmlzVW5pdmVyc2FsKCkgJiYgKHRoaXMudGFnLnRhZ051bWJlciA9PSAweDAzIHx8IHRoaXMudGFnLnRhZ051bWJlciA9PSAweDA0KSAmJiB0aGlzLnN1YiAhPT0gbnVsbCkge1xuICAgICAgcyArPSBcIiAoZW5jYXBzdWxhdGVzKVwiO1xuICAgIH1cbiAgICBzICs9IFwiXFxuXCI7XG4gICAgaWYgKHRoaXMuc3ViICE9PSBudWxsKSB7XG4gICAgICBpbmRlbnQgKz0gXCIgIFwiO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IHRoaXMuc3ViLmxlbmd0aDsgaSA8IG1heDsgKytpKSB7XG4gICAgICAgIHMgKz0gdGhpcy5zdWJbaV0udG9QcmV0dHlTdHJpbmcoaW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH07XG4gIEFTTjEucHJvdG90eXBlLnBvc1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmVhbS5wb3M7XG4gIH07XG4gIEFTTjEucHJvdG90eXBlLnBvc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBvcyArIHRoaXMuaGVhZGVyO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS5wb3NFbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBvcyArIHRoaXMuaGVhZGVyICsgTWF0aC5hYnModGhpcy5sZW5ndGgpO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS50b0hleFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJlYW0uaGV4RHVtcCh0aGlzLnBvc1N0YXJ0KCksIHRoaXMucG9zRW5kKCksIHRydWUpO1xuICB9O1xuICBBU04xLmRlY29kZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICB2YXIgYnVmID0gc3RyZWFtLmdldCgpO1xuICAgIHZhciBsZW4gPSBidWYgJiAweDdGO1xuICAgIGlmIChsZW4gPT0gYnVmKSB7XG4gICAgICByZXR1cm4gbGVuO1xuICAgIH1cbiAgICAvLyBubyByZWFzb24gdG8gdXNlIEludDEwLCBhcyBpdCB3b3VsZCBiZSBhIGh1Z2UgYnVmZmVyIGFueXdheXNcbiAgICBpZiAobGVuID4gNikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIG92ZXIgNDggYml0cyBub3Qgc3VwcG9ydGVkIGF0IHBvc2l0aW9uIFwiICsgKHN0cmVhbS5wb3MgLSAxKSk7XG4gICAgfVxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gLy8gdW5kZWZpbmVkXG4gICAgYnVmID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBidWYgPSBidWYgKiAyNTYgKyBzdHJlYW0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiBidWY7XG4gIH07XG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgaGV4YWRlY2ltYWwgdmFsdWUgKGFzIGEgc3RyaW5nKSBvZiB0aGUgY3VycmVudCBBU04uMSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEFTTjEucHJvdG90eXBlLmdldEhleFN0cmluZ1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoZXhTdHJpbmcgPSB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMuaGVhZGVyICogMjtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggKiAyO1xuICAgIHJldHVybiBoZXhTdHJpbmcuc3Vic3RyKG9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbiAgQVNOMS5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdmFyIHN0cmVhbTtcbiAgICBpZiAoIShzdHIgaW5zdGFuY2VvZiBTdHJlYW0pKSB7XG4gICAgICBzdHJlYW0gPSBuZXcgU3RyZWFtKHN0ciwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbSA9IHN0cjtcbiAgICB9XG4gICAgdmFyIHN0cmVhbVN0YXJ0ID0gbmV3IFN0cmVhbShzdHJlYW0pO1xuICAgIHZhciB0YWcgPSBuZXcgQVNOMVRhZyhzdHJlYW0pO1xuICAgIHZhciBsZW4gPSBBU04xLmRlY29kZUxlbmd0aChzdHJlYW0pO1xuICAgIHZhciBzdGFydCA9IHN0cmVhbS5wb3M7XG4gICAgdmFyIGhlYWRlciA9IHN0YXJ0IC0gc3RyZWFtU3RhcnQucG9zO1xuICAgIHZhciBzdWIgPSBudWxsO1xuICAgIHZhciBnZXRTdWIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmV0ID0gW107XG4gICAgICBpZiAobGVuICE9PSBudWxsKSB7XG4gICAgICAgIC8vIGRlZmluaXRlIGxlbmd0aFxuICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gICAgICAgIHdoaWxlIChzdHJlYW0ucG9zIDwgZW5kKSB7XG4gICAgICAgICAgcmV0W3JldC5sZW5ndGhdID0gQVNOMS5kZWNvZGUoc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyZWFtLnBvcyAhPSBlbmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb250ZW50IHNpemUgaXMgbm90IGNvcnJlY3QgZm9yIGNvbnRhaW5lciBzdGFydGluZyBhdCBvZmZzZXQgXCIgKyBzdGFydCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVuZGVmaW5lZCBsZW5ndGhcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICB2YXIgcyA9IEFTTjEuZGVjb2RlKHN0cmVhbSk7XG4gICAgICAgICAgICBpZiAocy50YWcuaXNFT0MoKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFtyZXQubGVuZ3RoXSA9IHM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxlbiA9IHN0YXJ0IC0gc3RyZWFtLnBvczsgLy8gdW5kZWZpbmVkIGxlbmd0aHMgYXJlIHJlcHJlc2VudGVkIGFzIG5lZ2F0aXZlIHZhbHVlc1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhjZXB0aW9uIHdoaWxlIGRlY29kaW5nIHVuZGVmaW5lZCBsZW5ndGggY29udGVudDogXCIgKyBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIGlmICh0YWcudGFnQ29uc3RydWN0ZWQpIHtcbiAgICAgIC8vIG11c3QgaGF2ZSB2YWxpZCBjb250ZW50XG4gICAgICBzdWIgPSBnZXRTdWIoKTtcbiAgICB9IGVsc2UgaWYgKHRhZy5pc1VuaXZlcnNhbCgpICYmICh0YWcudGFnTnVtYmVyID09IDB4MDMgfHwgdGFnLnRhZ051bWJlciA9PSAweDA0KSkge1xuICAgICAgLy8gc29tZXRpbWVzIEJpdFN0cmluZyBhbmQgT2N0ZXRTdHJpbmcgYXJlIHVzZWQgdG8gZW5jYXBzdWxhdGUgQVNOLjFcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0YWcudGFnTnVtYmVyID09IDB4MDMpIHtcbiAgICAgICAgICBpZiAoc3RyZWFtLmdldCgpICE9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJJVCBTVFJJTkdzIHdpdGggdW51c2VkIGJpdHMgY2Fubm90IGVuY2Fwc3VsYXRlLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3ViID0gZ2V0U3ViKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3ViLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgaWYgKHN1YltpXS50YWcuaXNFT0MoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRU9DIGlzIG5vdCBzdXBwb3NlZCB0byBiZSBhY3R1YWwgY29udGVudC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGJ1dCBzaWxlbnRseSBpZ25vcmUgd2hlbiB0aGV5IGRvbid0XG4gICAgICAgIHN1YiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdWIgPT09IG51bGwpIHtcbiAgICAgIGlmIChsZW4gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2UgY2FuJ3Qgc2tpcCBvdmVyIGFuIGludmFsaWQgdGFnIHdpdGggdW5kZWZpbmVkIGxlbmd0aCBhdCBvZmZzZXQgXCIgKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBzdHJlYW0ucG9zID0gc3RhcnQgKyBNYXRoLmFicyhsZW4pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFTTjEoc3RyZWFtU3RhcnQsIGhlYWRlciwgbGVuLCB0YWcsIHN1Yik7XG4gIH07XG4gIHJldHVybiBBU04xO1xufSgpO1xudmFyIEFTTjFUYWcgPSBleHBvcnRzLkFTTjFUYWcgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBU04xVGFnKHN0cmVhbSkge1xuICAgIHZhciBidWYgPSBzdHJlYW0uZ2V0KCk7XG4gICAgdGhpcy50YWdDbGFzcyA9IGJ1ZiA+PiA2O1xuICAgIHRoaXMudGFnQ29uc3RydWN0ZWQgPSAoYnVmICYgMHgyMCkgIT09IDA7XG4gICAgdGhpcy50YWdOdW1iZXIgPSBidWYgJiAweDFGO1xuICAgIGlmICh0aGlzLnRhZ051bWJlciA9PSAweDFGKSB7XG4gICAgICAvLyBsb25nIHRhZ1xuICAgICAgdmFyIG4gPSBuZXcgX2ludC5JbnQxMCgpO1xuICAgICAgZG8ge1xuICAgICAgICBidWYgPSBzdHJlYW0uZ2V0KCk7XG4gICAgICAgIG4ubXVsQWRkKDEyOCwgYnVmICYgMHg3Rik7XG4gICAgICB9IHdoaWxlIChidWYgJiAweDgwKTtcbiAgICAgIHRoaXMudGFnTnVtYmVyID0gbi5zaW1wbGlmeSgpO1xuICAgIH1cbiAgfVxuICBBU04xVGFnLnByb3RvdHlwZS5pc1VuaXZlcnNhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50YWdDbGFzcyA9PT0gMHgwMDtcbiAgfTtcbiAgQVNOMVRhZy5wcm90b3R5cGUuaXNFT0MgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFnQ2xhc3MgPT09IDB4MDAgJiYgdGhpcy50YWdOdW1iZXIgPT09IDB4MDA7XG4gIH07XG4gIHJldHVybiBBU04xVGFnO1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5CYXNlNjQgPSB2b2lkIDA7XG4vLyBCYXNlNjQgSmF2YVNjcmlwdCBkZWNvZGVyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cbi8vIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxuLy8gcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoZSBhYm92ZVxuLy8gY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBhcHBlYXIgaW4gYWxsIGNvcGllcy5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIGltbWVkOiB0cnVlLCBsYXRlZGVmOiB0cnVlLCB1bmRlZjogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSAqL1xudmFyIGRlY29kZXI7XG52YXIgQmFzZTY0ID0gZXhwb3J0cy5CYXNlNjQgPSB7XG4gIGRlY29kZTogZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgaTtcbiAgICBpZiAoZGVjb2RlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgYjY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gICAgICB2YXIgaWdub3JlID0gXCI9IFxcZlxcblxcclxcdFxcdTAwQTBcXHUyMDI4XFx1MjAyOVwiO1xuICAgICAgZGVjb2RlciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7ICsraSkge1xuICAgICAgICBkZWNvZGVyW2I2NC5jaGFyQXQoaSldID0gaTtcbiAgICAgIH1cbiAgICAgIGRlY29kZXJbJy0nXSA9IDYyOyAvLytcbiAgICAgIGRlY29kZXJbJ18nXSA9IDYzOyAvLy1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZ25vcmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZGVjb2RlcltpZ25vcmUuY2hhckF0KGkpXSA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIGJpdHMgPSAwO1xuICAgIHZhciBjaGFyX2NvdW50ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGMgPSBhLmNoYXJBdChpKTtcbiAgICAgIGlmIChjID09IFwiPVwiKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYyA9IGRlY29kZXJbY107XG4gICAgICBpZiAoYyA9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBjaGFyYWN0ZXIgYXQgb2Zmc2V0IFwiICsgaSk7XG4gICAgICB9XG4gICAgICBiaXRzIHw9IGM7XG4gICAgICBpZiAoKytjaGFyX2NvdW50ID49IDQpIHtcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyA+PiAxNjtcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyA+PiA4ICYgMHhGRjtcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyAmIDB4RkY7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICBjaGFyX2NvdW50ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpdHMgPDw9IDY7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAoY2hhcl9jb3VudCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXNlNjQgZW5jb2RpbmcgaW5jb21wbGV0ZTogYXQgbGVhc3QgMiBiaXRzIG1pc3NpbmdcIik7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGJpdHMgPj4gMTA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSBiaXRzID4+IDE2O1xuICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSBiaXRzID4+IDggJiAweEZGO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSxcbiAgcmU6IC8tLS0tLUJFR0lOIFteLV0rLS0tLS0oW0EtWmEtejAtOStcXC89XFxzXSspLS0tLS1FTkQgW14tXSstLS0tLXxiZWdpbi1iYXNlNjRbXlxcbl0rXFxuKFtBLVphLXowLTkrXFwvPVxcc10rKT09PT0vLFxuICB1bmFybW9yOiBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBtID0gQmFzZTY0LnJlLmV4ZWMoYSk7XG4gICAgaWYgKG0pIHtcbiAgICAgIGlmIChtWzFdKSB7XG4gICAgICAgIGEgPSBtWzFdO1xuICAgICAgfSBlbHNlIGlmIChtWzJdKSB7XG4gICAgICAgIGEgPSBtWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnRXhwIG91dCBvZiBzeW5jXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQmFzZTY0LmRlY29kZShhKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSGV4ID0gdm9pZCAwO1xuLy8gSGV4IEphdmFTY3JpcHQgZGVjb2RlclxuLy8gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTMgTGFwbyBMdWNoaW5pIDxsYXBvQGxhcG8uaXQ+XG4vLyBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbi8vIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbi8vIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVNcbi8vIFdJVEggUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SXG4vLyBBTlkgU1BFQ0lBTCwgRElSRUNULCBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTXG4vLyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GXG4vLyBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCBpbW1lZDogdHJ1ZSwgbGF0ZWRlZjogdHJ1ZSwgdW5kZWY6IHRydWUsIHJlZ2V4ZGFzaDogZmFsc2UgKi9cbnZhciBkZWNvZGVyO1xudmFyIEhleCA9IGV4cG9ydHMuSGV4ID0ge1xuICBkZWNvZGU6IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGk7XG4gICAgaWYgKGRlY29kZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGhleCA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgICAgdmFyIGlnbm9yZSA9IFwiIFxcZlxcblxcclxcdFxcdTAwQTBcXHUyMDI4XFx1MjAyOVwiO1xuICAgICAgZGVjb2RlciA9IHt9O1xuICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgZGVjb2RlcltoZXguY2hhckF0KGkpXSA9IGk7XG4gICAgICB9XG4gICAgICBoZXggPSBoZXgudG9Mb3dlckNhc2UoKTtcbiAgICAgIGZvciAoaSA9IDEwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBkZWNvZGVyW2hleC5jaGFyQXQoaSldID0gaTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpZ25vcmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZGVjb2RlcltpZ25vcmUuY2hhckF0KGkpXSA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIGJpdHMgPSAwO1xuICAgIHZhciBjaGFyX2NvdW50ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGMgPSBhLmNoYXJBdChpKTtcbiAgICAgIGlmIChjID09IFwiPVwiKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYyA9IGRlY29kZXJbY107XG4gICAgICBpZiAoYyA9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBjaGFyYWN0ZXIgYXQgb2Zmc2V0IFwiICsgaSk7XG4gICAgICB9XG4gICAgICBiaXRzIHw9IGM7XG4gICAgICBpZiAoKytjaGFyX2NvdW50ID49IDIpIHtcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cztcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIGNoYXJfY291bnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYml0cyA8PD0gNDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYXJfY291bnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhleCBlbmNvZGluZyBpbmNvbXBsZXRlOiA0IGJpdHMgbWlzc2luZ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSW50MTAgPSB2b2lkIDA7XG4vLyBCaWcgaW50ZWdlciBiYXNlLTEwIHByaW50aW5nIGxpYnJhcnlcbi8vIENvcHlyaWdodCAoYykgMjAxNCBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cbi8vIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxuLy8gcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoZSBhYm92ZVxuLy8gY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBhcHBlYXIgaW4gYWxsIGNvcGllcy5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIGltbWVkOiB0cnVlLCBsYXRlZGVmOiB0cnVlLCB1bmRlZjogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSAqL1xudmFyIG1heCA9IDEwMDAwMDAwMDAwMDAwOyAvLyBiaWdnZXN0IGludGVnZXIgdGhhdCBjYW4gc3RpbGwgZml0IDJeNTMgd2hlbiBtdWx0aXBsaWVkIGJ5IDI1NlxudmFyIEludDEwID0gZXhwb3J0cy5JbnQxMCA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEludDEwKHZhbHVlKSB7XG4gICAgdGhpcy5idWYgPSBbK3ZhbHVlIHx8IDBdO1xuICB9XG4gIEludDEwLnByb3RvdHlwZS5tdWxBZGQgPSBmdW5jdGlvbiAobSwgYykge1xuICAgIC8vIGFzc2VydChtIDw9IDI1NilcbiAgICB2YXIgYiA9IHRoaXMuYnVmO1xuICAgIHZhciBsID0gYi5sZW5ndGg7XG4gICAgdmFyIGk7XG4gICAgdmFyIHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgdCA9IGJbaV0gKiBtICsgYztcbiAgICAgIGlmICh0IDwgbWF4KSB7XG4gICAgICAgIGMgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYyA9IDAgfCB0IC8gbWF4O1xuICAgICAgICB0IC09IGMgKiBtYXg7XG4gICAgICB9XG4gICAgICBiW2ldID0gdDtcbiAgICB9XG4gICAgaWYgKGMgPiAwKSB7XG4gICAgICBiW2ldID0gYztcbiAgICB9XG4gIH07XG4gIEludDEwLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbiAoYykge1xuICAgIC8vIGFzc2VydChtIDw9IDI1NilcbiAgICB2YXIgYiA9IHRoaXMuYnVmO1xuICAgIHZhciBsID0gYi5sZW5ndGg7XG4gICAgdmFyIGk7XG4gICAgdmFyIHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgdCA9IGJbaV0gLSBjO1xuICAgICAgaWYgKHQgPCAwKSB7XG4gICAgICAgIHQgKz0gbWF4O1xuICAgICAgICBjID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMgPSAwO1xuICAgICAgfVxuICAgICAgYltpXSA9IHQ7XG4gICAgfVxuICAgIHdoaWxlIChiW2IubGVuZ3RoIC0gMV0gPT09IDApIHtcbiAgICAgIGIucG9wKCk7XG4gICAgfVxuICB9O1xuICBJbnQxMC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoYmFzZSkge1xuICAgIGlmICgoYmFzZSB8fCAxMCkgIT0gMTApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm9ubHkgYmFzZSAxMCBpcyBzdXBwb3J0ZWRcIik7XG4gICAgfVxuICAgIHZhciBiID0gdGhpcy5idWY7XG4gICAgdmFyIHMgPSBiW2IubGVuZ3RoIC0gMV0udG9TdHJpbmcoKTtcbiAgICBmb3IgKHZhciBpID0gYi5sZW5ndGggLSAyOyBpID49IDA7IC0taSkge1xuICAgICAgcyArPSAobWF4ICsgYltpXSkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBJbnQxMC5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYiA9IHRoaXMuYnVmO1xuICAgIHZhciB2ID0gMDtcbiAgICBmb3IgKHZhciBpID0gYi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdiA9IHYgKiBtYXggKyBiW2ldO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfTtcbiAgSW50MTAucHJvdG90eXBlLnNpbXBsaWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBiID0gdGhpcy5idWY7XG4gICAgcmV0dXJuIGIubGVuZ3RoID09IDEgPyBiWzBdIDogdGhpcztcbiAgfTtcbiAgcmV0dXJuIEludDEwO1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5iNjR0b0JBID0gYjY0dG9CQTtcbmV4cG9ydHMuYjY0dG9oZXggPSBiNjR0b2hleDtcbmV4cG9ydHMuaGV4MmI2NCA9IGhleDJiNjQ7XG52YXIgX3V0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIGI2NG1hcCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xudmFyIGI2NHBhZCA9IFwiPVwiO1xuZnVuY3Rpb24gaGV4MmI2NChoKSB7XG4gIHZhciBpO1xuICB2YXIgYztcbiAgdmFyIHJldCA9IFwiXCI7XG4gIGZvciAoaSA9IDA7IGkgKyAzIDw9IGgubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjID0gcGFyc2VJbnQoaC5zdWJzdHJpbmcoaSwgaSArIDMpLCAxNik7XG4gICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA+PiA2KSArIGI2NG1hcC5jaGFyQXQoYyAmIDYzKTtcbiAgfVxuICBpZiAoaSArIDEgPT0gaC5sZW5ndGgpIHtcbiAgICBjID0gcGFyc2VJbnQoaC5zdWJzdHJpbmcoaSwgaSArIDEpLCAxNik7XG4gICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA8PCAyKTtcbiAgfSBlbHNlIGlmIChpICsgMiA9PSBoLmxlbmd0aCkge1xuICAgIGMgPSBwYXJzZUludChoLnN1YnN0cmluZyhpLCBpICsgMiksIDE2KTtcbiAgICByZXQgKz0gYjY0bWFwLmNoYXJBdChjID4+IDIpICsgYjY0bWFwLmNoYXJBdCgoYyAmIDMpIDw8IDQpO1xuICB9XG4gIHdoaWxlICgocmV0Lmxlbmd0aCAmIDMpID4gMCkge1xuICAgIHJldCArPSBiNjRwYWQ7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbi8vIGNvbnZlcnQgYSBiYXNlNjQgc3RyaW5nIHRvIGhleFxuZnVuY3Rpb24gYjY0dG9oZXgocykge1xuICB2YXIgcmV0ID0gXCJcIjtcbiAgdmFyIGk7XG4gIHZhciBrID0gMDsgLy8gYjY0IHN0YXRlLCAwLTNcbiAgdmFyIHNsb3AgPSAwO1xuICBmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChzLmNoYXJBdChpKSA9PSBiNjRwYWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgdiA9IGI2NG1hcC5pbmRleE9mKHMuY2hhckF0KGkpKTtcbiAgICBpZiAodiA8IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoayA9PSAwKSB7XG4gICAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKSh2ID4+IDIpO1xuICAgICAgc2xvcCA9IHYgJiAzO1xuICAgICAgayA9IDE7XG4gICAgfSBlbHNlIGlmIChrID09IDEpIHtcbiAgICAgIHJldCArPSAoMCwgX3V0aWwuaW50MmNoYXIpKHNsb3AgPDwgMiB8IHYgPj4gNCk7XG4gICAgICBzbG9wID0gdiAmIDB4ZjtcbiAgICAgIGsgPSAyO1xuICAgIH0gZWxzZSBpZiAoayA9PSAyKSB7XG4gICAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKShzbG9wKTtcbiAgICAgIHJldCArPSAoMCwgX3V0aWwuaW50MmNoYXIpKHYgPj4gMik7XG4gICAgICBzbG9wID0gdiAmIDM7XG4gICAgICBrID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0ICs9ICgwLCBfdXRpbC5pbnQyY2hhcikoc2xvcCA8PCAyIHwgdiA+PiA0KTtcbiAgICAgIHJldCArPSAoMCwgX3V0aWwuaW50MmNoYXIpKHYgJiAweGYpO1xuICAgICAgayA9IDA7XG4gICAgfVxuICB9XG4gIGlmIChrID09IDEpIHtcbiAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKShzbG9wIDw8IDIpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4vLyBjb252ZXJ0IGEgYmFzZTY0IHN0cmluZyB0byBhIGJ5dGUvbnVtYmVyIGFycmF5XG5mdW5jdGlvbiBiNjR0b0JBKHMpIHtcbiAgLy8gcGlnZ3liYWNrIG9uIGI2NHRvaGV4IGZvciBub3csIG9wdGltaXplIGxhdGVyXG4gIHZhciBoID0gYjY0dG9oZXgocyk7XG4gIHZhciBpO1xuICB2YXIgYSA9IFtdO1xuICBmb3IgKGkgPSAwOyAyICogaSA8IGgubGVuZ3RoOyArK2kpIHtcbiAgICBhW2ldID0gcGFyc2VJbnQoaC5zdWJzdHJpbmcoMiAqIGksIDIgKiBpICsgMiksIDE2KTtcbiAgfVxuICByZXR1cm4gYTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQmlnSW50ZWdlciA9IHZvaWQgMDtcbmV4cG9ydHMuaW50QXQgPSBpbnRBdDtcbmV4cG9ydHMubmJpID0gbmJpO1xuZXhwb3J0cy5uYml0cyA9IG5iaXRzO1xuZXhwb3J0cy5uYnYgPSBuYnY7XG5leHBvcnRzLnBhcnNlQmlnSW50ID0gcGFyc2VCaWdJbnQ7XG52YXIgX3V0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLy8gQ29weXJpZ2h0IChjKSAyMDA1ICBUb20gV3Vcbi8vIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vLyBTZWUgXCJMSUNFTlNFXCIgZm9yIGRldGFpbHMuXG4vLyBCYXNpYyBKYXZhU2NyaXB0IEJOIGxpYnJhcnkgLSBzdWJzZXQgdXNlZnVsIGZvciBSU0EgZW5jcnlwdGlvbi5cblxuLy8gQml0cyBwZXIgZGlnaXRcbnZhciBkYml0cztcbi8vIEphdmFTY3JpcHQgZW5naW5lIGFuYWx5c2lzXG52YXIgY2FuYXJ5ID0gMHhkZWFkYmVlZmNhZmU7XG52YXIgal9sbSA9IChjYW5hcnkgJiAweGZmZmZmZikgPT0gMHhlZmNhZmU7XG4vLyNyZWdpb25cbnZhciBsb3dwcmltZXMgPSBbMiwgMywgNSwgNywgMTEsIDEzLCAxNywgMTksIDIzLCAyOSwgMzEsIDM3LCA0MSwgNDMsIDQ3LCA1MywgNTksIDYxLCA2NywgNzEsIDczLCA3OSwgODMsIDg5LCA5NywgMTAxLCAxMDMsIDEwNywgMTA5LCAxMTMsIDEyNywgMTMxLCAxMzcsIDEzOSwgMTQ5LCAxNTEsIDE1NywgMTYzLCAxNjcsIDE3MywgMTc5LCAxODEsIDE5MSwgMTkzLCAxOTcsIDE5OSwgMjExLCAyMjMsIDIyNywgMjI5LCAyMzMsIDIzOSwgMjQxLCAyNTEsIDI1NywgMjYzLCAyNjksIDI3MSwgMjc3LCAyODEsIDI4MywgMjkzLCAzMDcsIDMxMSwgMzEzLCAzMTcsIDMzMSwgMzM3LCAzNDcsIDM0OSwgMzUzLCAzNTksIDM2NywgMzczLCAzNzksIDM4MywgMzg5LCAzOTcsIDQwMSwgNDA5LCA0MTksIDQyMSwgNDMxLCA0MzMsIDQzOSwgNDQzLCA0NDksIDQ1NywgNDYxLCA0NjMsIDQ2NywgNDc5LCA0ODcsIDQ5MSwgNDk5LCA1MDMsIDUwOSwgNTIxLCA1MjMsIDU0MSwgNTQ3LCA1NTcsIDU2MywgNTY5LCA1NzEsIDU3NywgNTg3LCA1OTMsIDU5OSwgNjAxLCA2MDcsIDYxMywgNjE3LCA2MTksIDYzMSwgNjQxLCA2NDMsIDY0NywgNjUzLCA2NTksIDY2MSwgNjczLCA2NzcsIDY4MywgNjkxLCA3MDEsIDcwOSwgNzE5LCA3MjcsIDczMywgNzM5LCA3NDMsIDc1MSwgNzU3LCA3NjEsIDc2OSwgNzczLCA3ODcsIDc5NywgODA5LCA4MTEsIDgyMSwgODIzLCA4MjcsIDgyOSwgODM5LCA4NTMsIDg1NywgODU5LCA4NjMsIDg3NywgODgxLCA4ODMsIDg4NywgOTA3LCA5MTEsIDkxOSwgOTI5LCA5MzcsIDk0MSwgOTQ3LCA5NTMsIDk2NywgOTcxLCA5NzcsIDk4MywgOTkxLCA5OTddO1xudmFyIGxwbGltID0gKDEgPDwgMjYpIC8gbG93cHJpbWVzW2xvd3ByaW1lcy5sZW5ndGggLSAxXTtcbi8vI2VuZHJlZ2lvblxuLy8gKHB1YmxpYykgQ29uc3RydWN0b3JcbnZhciBCaWdJbnRlZ2VyID0gZXhwb3J0cy5CaWdJbnRlZ2VyID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmlnSW50ZWdlcihhLCBiLCBjKSB7XG4gICAgaWYgKGEgIT0gbnVsbCkge1xuICAgICAgaWYgKFwibnVtYmVyXCIgPT0gdHlwZW9mIGEpIHtcbiAgICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsIGIsIGMpO1xuICAgICAgfSBlbHNlIGlmIChiID09IG51bGwgJiYgXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSkge1xuICAgICAgICB0aGlzLmZyb21TdHJpbmcoYSwgMjU2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZnJvbVN0cmluZyhhLCBiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8jcmVnaW9uIFBVQkxJQ1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGJuVG9TdHJpbmc7XG4gIC8vIChwdWJsaWMpIHJldHVybiBzdHJpbmcgcmVwcmVzZW50YXRpb24gaW4gZ2l2ZW4gcmFkaXhcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoYikge1xuICAgIGlmICh0aGlzLnMgPCAwKSB7XG4gICAgICByZXR1cm4gXCItXCIgKyB0aGlzLm5lZ2F0ZSgpLnRvU3RyaW5nKGIpO1xuICAgIH1cbiAgICB2YXIgaztcbiAgICBpZiAoYiA9PSAxNikge1xuICAgICAgayA9IDQ7XG4gICAgfSBlbHNlIGlmIChiID09IDgpIHtcbiAgICAgIGsgPSAzO1xuICAgIH0gZWxzZSBpZiAoYiA9PSAyKSB7XG4gICAgICBrID0gMTtcbiAgICB9IGVsc2UgaWYgKGIgPT0gMzIpIHtcbiAgICAgIGsgPSA1O1xuICAgIH0gZWxzZSBpZiAoYiA9PSA0KSB7XG4gICAgICBrID0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudG9SYWRpeChiKTtcbiAgICB9XG4gICAgdmFyIGttID0gKDEgPDwgaykgLSAxO1xuICAgIHZhciBkO1xuICAgIHZhciBtID0gZmFsc2U7XG4gICAgdmFyIHIgPSBcIlwiO1xuICAgIHZhciBpID0gdGhpcy50O1xuICAgIHZhciBwID0gdGhpcy5EQiAtIGkgKiB0aGlzLkRCICUgaztcbiAgICBpZiAoaS0tID4gMCkge1xuICAgICAgaWYgKHAgPCB0aGlzLkRCICYmIChkID0gdGhpc1tpXSA+PiBwKSA+IDApIHtcbiAgICAgICAgbSA9IHRydWU7XG4gICAgICAgIHIgPSAoMCwgX3V0aWwuaW50MmNoYXIpKGQpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICBpZiAocCA8IGspIHtcbiAgICAgICAgICBkID0gKHRoaXNbaV0gJiAoMSA8PCBwKSAtIDEpIDw8IGsgLSBwO1xuICAgICAgICAgIGQgfD0gdGhpc1stLWldID4+IChwICs9IHRoaXMuREIgLSBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkID0gdGhpc1tpXSA+PiAocCAtPSBrKSAmIGttO1xuICAgICAgICAgIGlmIChwIDw9IDApIHtcbiAgICAgICAgICAgIHAgKz0gdGhpcy5EQjtcbiAgICAgICAgICAgIC0taTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQgPiAwKSB7XG4gICAgICAgICAgbSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICByICs9ICgwLCBfdXRpbC5pbnQyY2hhcikoZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG0gPyByIDogXCIwXCI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm5lZ2F0ZSA9IGJuTmVnYXRlO1xuICAvLyAocHVibGljKSAtdGhpc1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcywgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFicyA9IGJuQWJzO1xuICAvLyAocHVibGljKSB8dGhpc3xcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWJzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnMgPCAwID8gdGhpcy5uZWdhdGUoKSA6IHRoaXM7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmVUbyA9IGJuQ29tcGFyZVRvO1xuICAvLyAocHVibGljKSByZXR1cm4gKyBpZiB0aGlzID4gYSwgLSBpZiB0aGlzIDwgYSwgMCBpZiBlcXVhbFxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlVG8gPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gdGhpcy5zIC0gYS5zO1xuICAgIGlmIChyICE9IDApIHtcbiAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICB2YXIgaSA9IHRoaXMudDtcbiAgICByID0gaSAtIGEudDtcbiAgICBpZiAociAhPSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5zIDwgMCA/IC1yIDogcjtcbiAgICB9XG4gICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICBpZiAoKHIgPSB0aGlzW2ldIC0gYVtpXSkgIT0gMCkge1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aCA9IGJuQml0TGVuZ3RoO1xuICAvLyAocHVibGljKSByZXR1cm4gdGhlIG51bWJlciBvZiBiaXRzIGluIFwidGhpc1wiXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50IDw9IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5EQiAqICh0aGlzLnQgLSAxKSArIG5iaXRzKHRoaXNbdGhpcy50IC0gMV0gXiB0aGlzLnMgJiB0aGlzLkRNKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kID0gYm5Nb2Q7XG4gIC8vIChwdWJsaWMpIHRoaXMgbW9kIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuYWJzKCkuZGl2UmVtVG8oYSwgbnVsbCwgcik7XG4gICAgaWYgKHRoaXMucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIHtcbiAgICAgIGEuc3ViVG8ociwgcik7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3dJbnQgPSBibk1vZFBvd0ludDtcbiAgLy8gKHB1YmxpYykgdGhpc15lICUgbSwgMCA8PSBlIDwgMl4zMlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3dJbnQgPSBmdW5jdGlvbiAoZSwgbSkge1xuICAgIHZhciB6O1xuICAgIGlmIChlIDwgMjU2IHx8IG0uaXNFdmVuKCkpIHtcbiAgICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IG5ldyBNb250Z29tZXJ5KG0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5leHAoZSwgeik7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsb25lID0gYm5DbG9uZTtcbiAgLy8gKHB1YmxpYylcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmNvcHlUbyhyKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaW50VmFsdWUgPSBibkludFZhbHVlO1xuICAvLyAocHVibGljKSByZXR1cm4gdmFsdWUgYXMgaW50ZWdlclxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pbnRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zIDwgMCkge1xuICAgICAgaWYgKHRoaXMudCA9PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzBdIC0gdGhpcy5EVjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50ID09IDApIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy50ID09IDEpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdO1xuICAgIH0gZWxzZSBpZiAodGhpcy50ID09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICAvLyBhc3N1bWVzIDE2IDwgREIgPCAzMlxuICAgIHJldHVybiAodGhpc1sxXSAmICgxIDw8IDMyIC0gdGhpcy5EQikgLSAxKSA8PCB0aGlzLkRCIHwgdGhpc1swXTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuYnl0ZVZhbHVlID0gYm5CeXRlVmFsdWU7XG4gIC8vIChwdWJsaWMpIHJldHVybiB2YWx1ZSBhcyBieXRlXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmJ5dGVWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50ID09IDAgPyB0aGlzLnMgOiB0aGlzWzBdIDw8IDI0ID4+IDI0O1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaG9ydFZhbHVlID0gYm5TaG9ydFZhbHVlO1xuICAvLyAocHVibGljKSByZXR1cm4gdmFsdWUgYXMgc2hvcnQgKGFzc3VtZXMgREI+PTE2KVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaG9ydFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnQgPT0gMCA/IHRoaXMucyA6IHRoaXNbMF0gPDwgMTYgPj4gMTY7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNpZ251bSA9IGJuU2lnTnVtO1xuICAvLyAocHVibGljKSAwIGlmIHRoaXMgPT0gMCwgMSBpZiB0aGlzID4gMFxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaWdudW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucyA8IDApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudCA8PSAwIHx8IHRoaXMudCA9PSAxICYmIHRoaXNbMF0gPD0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUudG9CeXRlQXJyYXkgPSBiblRvQnl0ZUFycmF5O1xuICAvLyAocHVibGljKSBjb252ZXJ0IHRvIGJpZ2VuZGlhbiBieXRlIGFycmF5XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnRvQnl0ZUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpID0gdGhpcy50O1xuICAgIHZhciByID0gW107XG4gICAgclswXSA9IHRoaXMucztcbiAgICB2YXIgcCA9IHRoaXMuREIgLSBpICogdGhpcy5EQiAlIDg7XG4gICAgdmFyIGQ7XG4gICAgdmFyIGsgPSAwO1xuICAgIGlmIChpLS0gPiAwKSB7XG4gICAgICBpZiAocCA8IHRoaXMuREIgJiYgKGQgPSB0aGlzW2ldID4+IHApICE9ICh0aGlzLnMgJiB0aGlzLkRNKSA+PiBwKSB7XG4gICAgICAgIHJbaysrXSA9IGQgfCB0aGlzLnMgPDwgdGhpcy5EQiAtIHA7XG4gICAgICB9XG4gICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgIGlmIChwIDwgOCkge1xuICAgICAgICAgIGQgPSAodGhpc1tpXSAmICgxIDw8IHApIC0gMSkgPDwgOCAtIHA7XG4gICAgICAgICAgZCB8PSB0aGlzWy0taV0gPj4gKHAgKz0gdGhpcy5EQiAtIDgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGQgPSB0aGlzW2ldID4+IChwIC09IDgpICYgMHhmZjtcbiAgICAgICAgICBpZiAocCA8PSAwKSB7XG4gICAgICAgICAgICBwICs9IHRoaXMuREI7XG4gICAgICAgICAgICAtLWk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoZCAmIDB4ODApICE9IDApIHtcbiAgICAgICAgICBkIHw9IC0yNTY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGsgPT0gMCAmJiAodGhpcy5zICYgMHg4MCkgIT0gKGQgJiAweDgwKSkge1xuICAgICAgICAgICsraztcbiAgICAgICAgfVxuICAgICAgICBpZiAoayA+IDAgfHwgZCAhPSB0aGlzLnMpIHtcbiAgICAgICAgICByW2srK10gPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5lcXVhbHMgPSBibkVxdWFscztcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wYXJlVG8oYSkgPT0gMDtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubWluID0gYm5NaW47XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcGFyZVRvKGEpIDwgMCA/IHRoaXMgOiBhO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tYXggPSBibk1heDtcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wYXJlVG8oYSkgPiAwID8gdGhpcyA6IGE7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZCA9IGJuQW5kO1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5iaXR3aXNlVG8oYSwgX3V0aWwub3BfYW5kLCByKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUub3IgPSBibk9yO1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmJpdHdpc2VUbyhhLCBfdXRpbC5vcF9vciwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnhvciA9IGJuWG9yO1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS54b3IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5iaXR3aXNlVG8oYSwgX3V0aWwub3BfeG9yLCByKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuYW5kTm90ID0gYm5BbmROb3Q7XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmJpdHdpc2VUbyhhLCBfdXRpbC5vcF9hbmRub3QsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5ub3QgPSBibk5vdDtcbiAgLy8gKHB1YmxpYykgfnRoaXNcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubm90ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgcltpXSA9IHRoaXMuRE0gJiB+dGhpc1tpXTtcbiAgICB9XG4gICAgci50ID0gdGhpcy50O1xuICAgIHIucyA9IH50aGlzLnM7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0TGVmdCA9IGJuU2hpZnRMZWZ0O1xuICAvLyAocHVibGljKSB0aGlzIDw8IG5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2hpZnRMZWZ0ID0gZnVuY3Rpb24gKG4pIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIGlmIChuIDwgMCkge1xuICAgICAgdGhpcy5yU2hpZnRUbygtbiwgcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubFNoaWZ0VG8obiwgcik7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdFJpZ2h0ID0gYm5TaGlmdFJpZ2h0O1xuICAvLyAocHVibGljKSB0aGlzID4+IG5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2hpZnRSaWdodCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRoaXMubFNoaWZ0VG8oLW4sIHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJTaGlmdFRvKG4sIHIpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZ2V0TG93ZXN0U2V0Qml0ID0gYm5HZXRMb3dlc3RTZXRCaXQ7XG4gIC8vIChwdWJsaWMpIHJldHVybnMgaW5kZXggb2YgbG93ZXN0IDEtYml0IChvciAtMSBpZiBub25lKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nZXRMb3dlc3RTZXRCaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgaWYgKHRoaXNbaV0gIT0gMCkge1xuICAgICAgICByZXR1cm4gaSAqIHRoaXMuREIgKyAoMCwgX3V0aWwubGJpdCkodGhpc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnMgPCAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50ICogdGhpcy5EQjtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRDb3VudCA9IGJuQml0Q291bnQ7XG4gIC8vIChwdWJsaWMpIHJldHVybiBudW1iZXIgb2Ygc2V0IGJpdHNcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYml0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSAwO1xuICAgIHZhciB4ID0gdGhpcy5zICYgdGhpcy5ETTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudDsgKytpKSB7XG4gICAgICByICs9ICgwLCBfdXRpbC5jYml0KSh0aGlzW2ldIF4geCk7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS50ZXN0Qml0ID0gYm5UZXN0Qml0O1xuICAvLyAocHVibGljKSB0cnVlIGlmZiBudGggYml0IGlzIHNldFxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50ZXN0Qml0ID0gZnVuY3Rpb24gKG4pIHtcbiAgICB2YXIgaiA9IE1hdGguZmxvb3IobiAvIHRoaXMuREIpO1xuICAgIGlmIChqID49IHRoaXMudCkge1xuICAgICAgcmV0dXJuIHRoaXMucyAhPSAwO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXNbal0gJiAxIDw8IG4gJSB0aGlzLkRCKSAhPSAwO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zZXRCaXQgPSBiblNldEJpdDtcbiAgLy8gKHB1YmxpYykgdGhpcyB8ICgxPDxuKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zZXRCaXQgPSBmdW5jdGlvbiAobikge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBfdXRpbC5vcF9vcik7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsZWFyQml0ID0gYm5DbGVhckJpdDtcbiAgLy8gKHB1YmxpYykgdGhpcyAmIH4oMTw8bilcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2xlYXJCaXQgPSBmdW5jdGlvbiAobikge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBfdXRpbC5vcF9hbmRub3QpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mbGlwQml0ID0gYm5GbGlwQml0O1xuICAvLyAocHVibGljKSB0aGlzIF4gKDE8PG4pXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmZsaXBCaXQgPSBmdW5jdGlvbiAobikge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZUJpdChuLCBfdXRpbC5vcF94b3IpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGQgPSBibkFkZDtcbiAgLy8gKHB1YmxpYykgdGhpcyArIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuYWRkVG8oYSwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0ID0gYm5TdWJ0cmFjdDtcbiAgLy8gKHB1YmxpYykgdGhpcyAtIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5zdWJUbyhhLCByKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHkgPSBibk11bHRpcGx5O1xuICAvLyAocHVibGljKSB0aGlzICogYVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLm11bHRpcGx5VG8oYSwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZSA9IGJuRGl2aWRlO1xuICAvLyAocHVibGljKSB0aGlzIC8gYVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5kaXZSZW1UbyhhLCByLCBudWxsKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUucmVtYWluZGVyID0gYm5SZW1haW5kZXI7XG4gIC8vIChwdWJsaWMpIHRoaXMgJSBhXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnJlbWFpbmRlciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmRpdlJlbVRvKGEsIG51bGwsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGVBbmRSZW1haW5kZXIgPSBibkRpdmlkZUFuZFJlbWFpbmRlcjtcbiAgLy8gKHB1YmxpYykgW3RoaXMvYSx0aGlzJWFdXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZUFuZFJlbWFpbmRlciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHEgPSBuYmkoKTtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuZGl2UmVtVG8oYSwgcSwgcik7XG4gICAgcmV0dXJuIFtxLCByXTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93ID0gYm5Nb2RQb3c7XG4gIC8vIChwdWJsaWMpIHRoaXNeZSAlIG0gKEhBQyAxNC44NSlcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93ID0gZnVuY3Rpb24gKGUsIG0pIHtcbiAgICB2YXIgaSA9IGUuYml0TGVuZ3RoKCk7XG4gICAgdmFyIGs7XG4gICAgdmFyIHIgPSBuYnYoMSk7XG4gICAgdmFyIHo7XG4gICAgaWYgKGkgPD0gMCkge1xuICAgICAgcmV0dXJuIHI7XG4gICAgfSBlbHNlIGlmIChpIDwgMTgpIHtcbiAgICAgIGsgPSAxO1xuICAgIH0gZWxzZSBpZiAoaSA8IDQ4KSB7XG4gICAgICBrID0gMztcbiAgICB9IGVsc2UgaWYgKGkgPCAxNDQpIHtcbiAgICAgIGsgPSA0O1xuICAgIH0gZWxzZSBpZiAoaSA8IDc2OCkge1xuICAgICAgayA9IDU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGsgPSA2O1xuICAgIH1cbiAgICBpZiAoaSA8IDgpIHtcbiAgICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcbiAgICB9IGVsc2UgaWYgKG0uaXNFdmVuKCkpIHtcbiAgICAgIHogPSBuZXcgQmFycmV0dChtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IG5ldyBNb250Z29tZXJ5KG0pO1xuICAgIH1cbiAgICAvLyBwcmVjb21wdXRhdGlvblxuICAgIHZhciBnID0gW107XG4gICAgdmFyIG4gPSAzO1xuICAgIHZhciBrMSA9IGsgLSAxO1xuICAgIHZhciBrbSA9ICgxIDw8IGspIC0gMTtcbiAgICBnWzFdID0gei5jb252ZXJ0KHRoaXMpO1xuICAgIGlmIChrID4gMSkge1xuICAgICAgdmFyIGcyID0gbmJpKCk7XG4gICAgICB6LnNxclRvKGdbMV0sIGcyKTtcbiAgICAgIHdoaWxlIChuIDw9IGttKSB7XG4gICAgICAgIGdbbl0gPSBuYmkoKTtcbiAgICAgICAgei5tdWxUbyhnMiwgZ1tuIC0gMl0sIGdbbl0pO1xuICAgICAgICBuICs9IDI7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBqID0gZS50IC0gMTtcbiAgICB2YXIgdztcbiAgICB2YXIgaXMxID0gdHJ1ZTtcbiAgICB2YXIgcjIgPSBuYmkoKTtcbiAgICB2YXIgdDtcbiAgICBpID0gbmJpdHMoZVtqXSkgLSAxO1xuICAgIHdoaWxlIChqID49IDApIHtcbiAgICAgIGlmIChpID49IGsxKSB7XG4gICAgICAgIHcgPSBlW2pdID4+IGkgLSBrMSAmIGttO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdyA9IChlW2pdICYgKDEgPDwgaSArIDEpIC0gMSkgPDwgazEgLSBpO1xuICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICB3IHw9IGVbaiAtIDFdID4+IHRoaXMuREIgKyBpIC0gazE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG4gPSBrO1xuICAgICAgd2hpbGUgKCh3ICYgMSkgPT0gMCkge1xuICAgICAgICB3ID4+PSAxO1xuICAgICAgICAtLW47XG4gICAgICB9XG4gICAgICBpZiAoKGkgLT0gbikgPCAwKSB7XG4gICAgICAgIGkgKz0gdGhpcy5EQjtcbiAgICAgICAgLS1qO1xuICAgICAgfVxuICAgICAgaWYgKGlzMSkge1xuICAgICAgICAvLyByZXQgPT0gMSwgZG9uJ3QgYm90aGVyIHNxdWFyaW5nIG9yIG11bHRpcGx5aW5nIGl0XG4gICAgICAgIGdbd10uY29weVRvKHIpO1xuICAgICAgICBpczEgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChuID4gMSkge1xuICAgICAgICAgIHouc3FyVG8ociwgcjIpO1xuICAgICAgICAgIHouc3FyVG8ocjIsIHIpO1xuICAgICAgICAgIG4gLT0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICB6LnNxclRvKHIsIHIyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ID0gcjtcbiAgICAgICAgICByID0gcjI7XG4gICAgICAgICAgcjIgPSB0O1xuICAgICAgICB9XG4gICAgICAgIHoubXVsVG8ocjIsIGdbd10sIHIpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGogPj0gMCAmJiAoZVtqXSAmIDEgPDwgaSkgPT0gMCkge1xuICAgICAgICB6LnNxclRvKHIsIHIyKTtcbiAgICAgICAgdCA9IHI7XG4gICAgICAgIHIgPSByMjtcbiAgICAgICAgcjIgPSB0O1xuICAgICAgICBpZiAoLS1pIDwgMCkge1xuICAgICAgICAgIGkgPSB0aGlzLkRCIC0gMTtcbiAgICAgICAgICAtLWo7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHoucmV2ZXJ0KHIpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnZlcnNlID0gYm5Nb2RJbnZlcnNlO1xuICAvLyAocHVibGljKSAxL3RoaXMgJSBtIChIQUMgMTQuNjEpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZEludmVyc2UgPSBmdW5jdGlvbiAobSkge1xuICAgIHZhciBhYyA9IG0uaXNFdmVuKCk7XG4gICAgaWYgKHRoaXMuaXNFdmVuKCkgJiYgYWMgfHwgbS5zaWdudW0oKSA9PSAwKSB7XG4gICAgICByZXR1cm4gQmlnSW50ZWdlci5aRVJPO1xuICAgIH1cbiAgICB2YXIgdSA9IG0uY2xvbmUoKTtcbiAgICB2YXIgdiA9IHRoaXMuY2xvbmUoKTtcbiAgICB2YXIgYSA9IG5idigxKTtcbiAgICB2YXIgYiA9IG5idigwKTtcbiAgICB2YXIgYyA9IG5idigwKTtcbiAgICB2YXIgZCA9IG5idigxKTtcbiAgICB3aGlsZSAodS5zaWdudW0oKSAhPSAwKSB7XG4gICAgICB3aGlsZSAodS5pc0V2ZW4oKSkge1xuICAgICAgICB1LnJTaGlmdFRvKDEsIHUpO1xuICAgICAgICBpZiAoYWMpIHtcbiAgICAgICAgICBpZiAoIWEuaXNFdmVuKCkgfHwgIWIuaXNFdmVuKCkpIHtcbiAgICAgICAgICAgIGEuYWRkVG8odGhpcywgYSk7XG4gICAgICAgICAgICBiLnN1YlRvKG0sIGIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhLnJTaGlmdFRvKDEsIGEpO1xuICAgICAgICB9IGVsc2UgaWYgKCFiLmlzRXZlbigpKSB7XG4gICAgICAgICAgYi5zdWJUbyhtLCBiKTtcbiAgICAgICAgfVxuICAgICAgICBiLnJTaGlmdFRvKDEsIGIpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHYuaXNFdmVuKCkpIHtcbiAgICAgICAgdi5yU2hpZnRUbygxLCB2KTtcbiAgICAgICAgaWYgKGFjKSB7XG4gICAgICAgICAgaWYgKCFjLmlzRXZlbigpIHx8ICFkLmlzRXZlbigpKSB7XG4gICAgICAgICAgICBjLmFkZFRvKHRoaXMsIGMpO1xuICAgICAgICAgICAgZC5zdWJUbyhtLCBkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy5yU2hpZnRUbygxLCBjKTtcbiAgICAgICAgfSBlbHNlIGlmICghZC5pc0V2ZW4oKSkge1xuICAgICAgICAgIGQuc3ViVG8obSwgZCk7XG4gICAgICAgIH1cbiAgICAgICAgZC5yU2hpZnRUbygxLCBkKTtcbiAgICAgIH1cbiAgICAgIGlmICh1LmNvbXBhcmVUbyh2KSA+PSAwKSB7XG4gICAgICAgIHUuc3ViVG8odiwgdSk7XG4gICAgICAgIGlmIChhYykge1xuICAgICAgICAgIGEuc3ViVG8oYywgYSk7XG4gICAgICAgIH1cbiAgICAgICAgYi5zdWJUbyhkLCBiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYuc3ViVG8odSwgdik7XG4gICAgICAgIGlmIChhYykge1xuICAgICAgICAgIGMuc3ViVG8oYSwgYyk7XG4gICAgICAgIH1cbiAgICAgICAgZC5zdWJUbyhiLCBkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHYuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSAhPSAwKSB7XG4gICAgICByZXR1cm4gQmlnSW50ZWdlci5aRVJPO1xuICAgIH1cbiAgICBpZiAoZC5jb21wYXJlVG8obSkgPj0gMCkge1xuICAgICAgcmV0dXJuIGQuc3VidHJhY3QobSk7XG4gICAgfVxuICAgIGlmIChkLnNpZ251bSgpIDwgMCkge1xuICAgICAgZC5hZGRUbyhtLCBkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuICAgIGlmIChkLnNpZ251bSgpIDwgMCkge1xuICAgICAgcmV0dXJuIGQuYWRkKG0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnBvdyA9IGJuUG93O1xuICAvLyAocHVibGljKSB0aGlzXmVcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUucG93ID0gZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gdGhpcy5leHAoZSwgbmV3IE51bGxFeHAoKSk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmdjZCA9IGJuR0NEO1xuICAvLyAocHVibGljKSBnY2QodGhpcyxhKSAoSEFDIDE0LjU0KVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nY2QgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gdGhpcy5zIDwgMCA/IHRoaXMubmVnYXRlKCkgOiB0aGlzLmNsb25lKCk7XG4gICAgdmFyIHkgPSBhLnMgPCAwID8gYS5uZWdhdGUoKSA6IGEuY2xvbmUoKTtcbiAgICBpZiAoeC5jb21wYXJlVG8oeSkgPCAwKSB7XG4gICAgICB2YXIgdCA9IHg7XG4gICAgICB4ID0geTtcbiAgICAgIHkgPSB0O1xuICAgIH1cbiAgICB2YXIgaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCk7XG4gICAgdmFyIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xuICAgIGlmIChnIDwgMCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGlmIChpIDwgZykge1xuICAgICAgZyA9IGk7XG4gICAgfVxuICAgIGlmIChnID4gMCkge1xuICAgICAgeC5yU2hpZnRUbyhnLCB4KTtcbiAgICAgIHkuclNoaWZ0VG8oZywgeSk7XG4gICAgfVxuICAgIHdoaWxlICh4LnNpZ251bSgpID4gMCkge1xuICAgICAgaWYgKChpID0geC5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKSB7XG4gICAgICAgIHguclNoaWZ0VG8oaSwgeCk7XG4gICAgICB9XG4gICAgICBpZiAoKGkgPSB5LmdldExvd2VzdFNldEJpdCgpKSA+IDApIHtcbiAgICAgICAgeS5yU2hpZnRUbyhpLCB5KTtcbiAgICAgIH1cbiAgICAgIGlmICh4LmNvbXBhcmVUbyh5KSA+PSAwKSB7XG4gICAgICAgIHguc3ViVG8oeSwgeCk7XG4gICAgICAgIHguclNoaWZ0VG8oMSwgeCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5LnN1YlRvKHgsIHkpO1xuICAgICAgICB5LnJTaGlmdFRvKDEsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZyA+IDApIHtcbiAgICAgIHkubFNoaWZ0VG8oZywgeSk7XG4gICAgfVxuICAgIHJldHVybiB5O1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc1Byb2JhYmxlUHJpbWUgPSBibklzUHJvYmFibGVQcmltZTtcbiAgLy8gKHB1YmxpYykgdGVzdCBwcmltYWxpdHkgd2l0aCBjZXJ0YWludHkgPj0gMS0uNV50XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmlzUHJvYmFibGVQcmltZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHggPSB0aGlzLmFicygpO1xuICAgIGlmICh4LnQgPT0gMSAmJiB4WzBdIDw9IGxvd3ByaW1lc1tsb3dwcmltZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsb3dwcmltZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHhbMF0gPT0gbG93cHJpbWVzW2ldKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHguaXNFdmVuKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaSA9IDE7XG4gICAgd2hpbGUgKGkgPCBsb3dwcmltZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgbSA9IGxvd3ByaW1lc1tpXTtcbiAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICB3aGlsZSAoaiA8IGxvd3ByaW1lcy5sZW5ndGggJiYgbSA8IGxwbGltKSB7XG4gICAgICAgIG0gKj0gbG93cHJpbWVzW2orK107XG4gICAgICB9XG4gICAgICBtID0geC5tb2RJbnQobSk7XG4gICAgICB3aGlsZSAoaSA8IGopIHtcbiAgICAgICAgaWYgKG0gJSBsb3dwcmltZXNbaSsrXSA9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4Lm1pbGxlclJhYmluKHQpO1xuICB9O1xuICAvLyNlbmRyZWdpb24gUFVCTElDXG4gIC8vI3JlZ2lvbiBQUk9URUNURURcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuY29weVRvID0gYm5wQ29weVRvO1xuICAvLyAocHJvdGVjdGVkKSBjb3B5IHRoaXMgdG8gclxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb3B5VG8gPSBmdW5jdGlvbiAocikge1xuICAgIGZvciAodmFyIGkgPSB0aGlzLnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgcltpXSA9IHRoaXNbaV07XG4gICAgfVxuICAgIHIudCA9IHRoaXMudDtcbiAgICByLnMgPSB0aGlzLnM7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21JbnQgPSBibnBGcm9tSW50O1xuICAvLyAocHJvdGVjdGVkKSBzZXQgZnJvbSBpbnRlZ2VyIHZhbHVlIHgsIC1EViA8PSB4IDwgRFZcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbUludCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgdGhpcy50ID0gMTtcbiAgICB0aGlzLnMgPSB4IDwgMCA/IC0xIDogMDtcbiAgICBpZiAoeCA+IDApIHtcbiAgICAgIHRoaXNbMF0gPSB4O1xuICAgIH0gZWxzZSBpZiAoeCA8IC0xKSB7XG4gICAgICB0aGlzWzBdID0geCArIHRoaXMuRFY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudCA9IDA7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tU3RyaW5nID0gYm5wRnJvbVN0cmluZztcbiAgLy8gKHByb3RlY3RlZCkgc2V0IGZyb20gc3RyaW5nIGFuZCByYWRpeFxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHMsIGIpIHtcbiAgICB2YXIgaztcbiAgICBpZiAoYiA9PSAxNikge1xuICAgICAgayA9IDQ7XG4gICAgfSBlbHNlIGlmIChiID09IDgpIHtcbiAgICAgIGsgPSAzO1xuICAgIH0gZWxzZSBpZiAoYiA9PSAyNTYpIHtcbiAgICAgIGsgPSA4O1xuICAgICAgLyogYnl0ZSBhcnJheSAqL1xuICAgIH0gZWxzZSBpZiAoYiA9PSAyKSB7XG4gICAgICBrID0gMTtcbiAgICB9IGVsc2UgaWYgKGIgPT0gMzIpIHtcbiAgICAgIGsgPSA1O1xuICAgIH0gZWxzZSBpZiAoYiA9PSA0KSB7XG4gICAgICBrID0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcm9tUmFkaXgocywgYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudCA9IDA7XG4gICAgdGhpcy5zID0gMDtcbiAgICB2YXIgaSA9IHMubGVuZ3RoO1xuICAgIHZhciBtaSA9IGZhbHNlO1xuICAgIHZhciBzaCA9IDA7XG4gICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICB2YXIgeCA9IGsgPT0gOCA/ICtzW2ldICYgMHhmZiA6IGludEF0KHMsIGkpO1xuICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgIGlmIChzLmNoYXJBdChpKSA9PSBcIi1cIikge1xuICAgICAgICAgIG1pID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG1pID0gZmFsc2U7XG4gICAgICBpZiAoc2ggPT0gMCkge1xuICAgICAgICB0aGlzW3RoaXMudCsrXSA9IHg7XG4gICAgICB9IGVsc2UgaWYgKHNoICsgayA+IHRoaXMuREIpIHtcbiAgICAgICAgdGhpc1t0aGlzLnQgLSAxXSB8PSAoeCAmICgxIDw8IHRoaXMuREIgLSBzaCkgLSAxKSA8PCBzaDtcbiAgICAgICAgdGhpc1t0aGlzLnQrK10gPSB4ID4+IHRoaXMuREIgLSBzaDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbdGhpcy50IC0gMV0gfD0geCA8PCBzaDtcbiAgICAgIH1cbiAgICAgIHNoICs9IGs7XG4gICAgICBpZiAoc2ggPj0gdGhpcy5EQikge1xuICAgICAgICBzaCAtPSB0aGlzLkRCO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoayA9PSA4ICYmICgrc1swXSAmIDB4ODApICE9IDApIHtcbiAgICAgIHRoaXMucyA9IC0xO1xuICAgICAgaWYgKHNoID4gMCkge1xuICAgICAgICB0aGlzW3RoaXMudCAtIDFdIHw9ICgxIDw8IHRoaXMuREIgLSBzaCkgLSAxIDw8IHNoO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsYW1wKCk7XG4gICAgaWYgKG1pKSB7XG4gICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcywgdGhpcyk7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbGFtcCA9IGJucENsYW1wO1xuICAvLyAocHJvdGVjdGVkKSBjbGFtcCBvZmYgZXhjZXNzIGhpZ2ggd29yZHNcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2xhbXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGMgPSB0aGlzLnMgJiB0aGlzLkRNO1xuICAgIHdoaWxlICh0aGlzLnQgPiAwICYmIHRoaXNbdGhpcy50IC0gMV0gPT0gYykge1xuICAgICAgLS10aGlzLnQ7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kbFNoaWZ0VG8gPSBibnBETFNoaWZ0VG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG4qREJcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZGxTaGlmdFRvID0gZnVuY3Rpb24gKG4sIHIpIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSB0aGlzLnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgcltpICsgbl0gPSB0aGlzW2ldO1xuICAgIH1cbiAgICBmb3IgKGkgPSBuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHJbaV0gPSAwO1xuICAgIH1cbiAgICByLnQgPSB0aGlzLnQgKyBuO1xuICAgIHIucyA9IHRoaXMucztcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZHJTaGlmdFRvID0gYm5wRFJTaGlmdFRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA+PiBuKkRCXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRyU2hpZnRUbyA9IGZ1bmN0aW9uIChuLCByKSB7XG4gICAgZm9yICh2YXIgaSA9IG47IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgcltpIC0gbl0gPSB0aGlzW2ldO1xuICAgIH1cbiAgICByLnQgPSBNYXRoLm1heCh0aGlzLnQgLSBuLCAwKTtcbiAgICByLnMgPSB0aGlzLnM7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmxTaGlmdFRvID0gYm5wTFNoaWZ0VG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubFNoaWZ0VG8gPSBmdW5jdGlvbiAobiwgcikge1xuICAgIHZhciBicyA9IG4gJSB0aGlzLkRCO1xuICAgIHZhciBjYnMgPSB0aGlzLkRCIC0gYnM7XG4gICAgdmFyIGJtID0gKDEgPDwgY2JzKSAtIDE7XG4gICAgdmFyIGRzID0gTWF0aC5mbG9vcihuIC8gdGhpcy5EQik7XG4gICAgdmFyIGMgPSB0aGlzLnMgPDwgYnMgJiB0aGlzLkRNO1xuICAgIGZvciAodmFyIGkgPSB0aGlzLnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgcltpICsgZHMgKyAxXSA9IHRoaXNbaV0gPj4gY2JzIHwgYztcbiAgICAgIGMgPSAodGhpc1tpXSAmIGJtKSA8PCBicztcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IGRzIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHJbaV0gPSAwO1xuICAgIH1cbiAgICByW2RzXSA9IGM7XG4gICAgci50ID0gdGhpcy50ICsgZHMgKyAxO1xuICAgIHIucyA9IHRoaXMucztcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnJTaGlmdFRvID0gYm5wUlNoaWZ0VG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzID4+IG5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuclNoaWZ0VG8gPSBmdW5jdGlvbiAobiwgcikge1xuICAgIHIucyA9IHRoaXMucztcbiAgICB2YXIgZHMgPSBNYXRoLmZsb29yKG4gLyB0aGlzLkRCKTtcbiAgICBpZiAoZHMgPj0gdGhpcy50KSB7XG4gICAgICByLnQgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnMgPSBuICUgdGhpcy5EQjtcbiAgICB2YXIgY2JzID0gdGhpcy5EQiAtIGJzO1xuICAgIHZhciBibSA9ICgxIDw8IGJzKSAtIDE7XG4gICAgclswXSA9IHRoaXNbZHNdID4+IGJzO1xuICAgIGZvciAodmFyIGkgPSBkcyArIDE7IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgcltpIC0gZHMgLSAxXSB8PSAodGhpc1tpXSAmIGJtKSA8PCBjYnM7XG4gICAgICByW2kgLSBkc10gPSB0aGlzW2ldID4+IGJzO1xuICAgIH1cbiAgICBpZiAoYnMgPiAwKSB7XG4gICAgICByW3RoaXMudCAtIGRzIC0gMV0gfD0gKHRoaXMucyAmIGJtKSA8PCBjYnM7XG4gICAgfVxuICAgIHIudCA9IHRoaXMudCAtIGRzO1xuICAgIHIuY2xhbXAoKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc3ViVG8gPSBibnBTdWJUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgLSBhXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YlRvID0gZnVuY3Rpb24gKGEsIHIpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGMgPSAwO1xuICAgIHZhciBtID0gTWF0aC5taW4oYS50LCB0aGlzLnQpO1xuICAgIHdoaWxlIChpIDwgbSkge1xuICAgICAgYyArPSB0aGlzW2ldIC0gYVtpXTtcbiAgICAgIHJbaSsrXSA9IGMgJiB0aGlzLkRNO1xuICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICB9XG4gICAgaWYgKGEudCA8IHRoaXMudCkge1xuICAgICAgYyAtPSBhLnM7XG4gICAgICB3aGlsZSAoaSA8IHRoaXMudCkge1xuICAgICAgICBjICs9IHRoaXNbaV07XG4gICAgICAgIHJbaSsrXSA9IGMgJiB0aGlzLkRNO1xuICAgICAgICBjID4+PSB0aGlzLkRCO1xuICAgICAgfVxuICAgICAgYyArPSB0aGlzLnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMgKz0gdGhpcy5zO1xuICAgICAgd2hpbGUgKGkgPCBhLnQpIHtcbiAgICAgICAgYyAtPSBhW2ldO1xuICAgICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcbiAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgIH1cbiAgICAgIGMgLT0gYS5zO1xuICAgIH1cbiAgICByLnMgPSBjIDwgMCA/IC0xIDogMDtcbiAgICBpZiAoYyA8IC0xKSB7XG4gICAgICByW2krK10gPSB0aGlzLkRWICsgYztcbiAgICB9IGVsc2UgaWYgKGMgPiAwKSB7XG4gICAgICByW2krK10gPSBjO1xuICAgIH1cbiAgICByLnQgPSBpO1xuICAgIHIuY2xhbXAoKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlUbyA9IGJucE11bHRpcGx5VG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzICogYSwgciAhPSB0aGlzLGEgKEhBQyAxNC4xMilcbiAgLy8gXCJ0aGlzXCIgc2hvdWxkIGJlIHRoZSBsYXJnZXIgb25lIGlmIGFwcHJvcHJpYXRlLlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseVRvID0gZnVuY3Rpb24gKGEsIHIpIHtcbiAgICB2YXIgeCA9IHRoaXMuYWJzKCk7XG4gICAgdmFyIHkgPSBhLmFicygpO1xuICAgIHZhciBpID0geC50O1xuICAgIHIudCA9IGkgKyB5LnQ7XG4gICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICByW2ldID0gMDtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHkudDsgKytpKSB7XG4gICAgICByW2kgKyB4LnRdID0geC5hbSgwLCB5W2ldLCByLCBpLCAwLCB4LnQpO1xuICAgIH1cbiAgICByLnMgPSAwO1xuICAgIHIuY2xhbXAoKTtcbiAgICBpZiAodGhpcy5zICE9IGEucykge1xuICAgICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHIsIHIpO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc3F1YXJlVG8gPSBibnBTcXVhcmVUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXNeMiwgciAhPSB0aGlzIChIQUMgMTQuMTYpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZVRvID0gZnVuY3Rpb24gKHIpIHtcbiAgICB2YXIgeCA9IHRoaXMuYWJzKCk7XG4gICAgdmFyIGkgPSByLnQgPSAyICogeC50O1xuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgcltpXSA9IDA7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCB4LnQgLSAxOyArK2kpIHtcbiAgICAgIHZhciBjID0geC5hbShpLCB4W2ldLCByLCAyICogaSwgMCwgMSk7XG4gICAgICBpZiAoKHJbaSArIHgudF0gKz0geC5hbShpICsgMSwgMiAqIHhbaV0sIHIsIDIgKiBpICsgMSwgYywgeC50IC0gaSAtIDEpKSA+PSB4LkRWKSB7XG4gICAgICAgIHJbaSArIHgudF0gLT0geC5EVjtcbiAgICAgICAgcltpICsgeC50ICsgMV0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoci50ID4gMCkge1xuICAgICAgcltyLnQgLSAxXSArPSB4LmFtKGksIHhbaV0sIHIsIDIgKiBpLCAwLCAxKTtcbiAgICB9XG4gICAgci5zID0gMDtcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdlJlbVRvID0gYm5wRGl2UmVtVG87XG4gIC8vIChwcm90ZWN0ZWQpIGRpdmlkZSB0aGlzIGJ5IG0sIHF1b3RpZW50IGFuZCByZW1haW5kZXIgdG8gcSwgciAoSEFDIDE0LjIwKVxuICAvLyByICE9IHEsIHRoaXMgIT0gbS4gIHEgb3IgciBtYXkgYmUgbnVsbC5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZGl2UmVtVG8gPSBmdW5jdGlvbiAobSwgcSwgcikge1xuICAgIHZhciBwbSA9IG0uYWJzKCk7XG4gICAgaWYgKHBtLnQgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHQgPSB0aGlzLmFicygpO1xuICAgIGlmIChwdC50IDwgcG0udCkge1xuICAgICAgaWYgKHEgIT0gbnVsbCkge1xuICAgICAgICBxLmZyb21JbnQoMCk7XG4gICAgICB9XG4gICAgICBpZiAociAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29weVRvKHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICByID0gbmJpKCk7XG4gICAgfVxuICAgIHZhciB5ID0gbmJpKCk7XG4gICAgdmFyIHRzID0gdGhpcy5zO1xuICAgIHZhciBtcyA9IG0ucztcbiAgICB2YXIgbnNoID0gdGhpcy5EQiAtIG5iaXRzKHBtW3BtLnQgLSAxXSk7IC8vIG5vcm1hbGl6ZSBtb2R1bHVzXG4gICAgaWYgKG5zaCA+IDApIHtcbiAgICAgIHBtLmxTaGlmdFRvKG5zaCwgeSk7XG4gICAgICBwdC5sU2hpZnRUbyhuc2gsIHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbS5jb3B5VG8oeSk7XG4gICAgICBwdC5jb3B5VG8ocik7XG4gICAgfVxuICAgIHZhciB5cyA9IHkudDtcbiAgICB2YXIgeTAgPSB5W3lzIC0gMV07XG4gICAgaWYgKHkwID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHl0ID0geTAgKiAoMSA8PCB0aGlzLkYxKSArICh5cyA+IDEgPyB5W3lzIC0gMl0gPj4gdGhpcy5GMiA6IDApO1xuICAgIHZhciBkMSA9IHRoaXMuRlYgLyB5dDtcbiAgICB2YXIgZDIgPSAoMSA8PCB0aGlzLkYxKSAvIHl0O1xuICAgIHZhciBlID0gMSA8PCB0aGlzLkYyO1xuICAgIHZhciBpID0gci50O1xuICAgIHZhciBqID0gaSAtIHlzO1xuICAgIHZhciB0ID0gcSA9PSBudWxsID8gbmJpKCkgOiBxO1xuICAgIHkuZGxTaGlmdFRvKGosIHQpO1xuICAgIGlmIChyLmNvbXBhcmVUbyh0KSA+PSAwKSB7XG4gICAgICByW3IudCsrXSA9IDE7XG4gICAgICByLnN1YlRvKHQsIHIpO1xuICAgIH1cbiAgICBCaWdJbnRlZ2VyLk9ORS5kbFNoaWZ0VG8oeXMsIHQpO1xuICAgIHQuc3ViVG8oeSwgeSk7IC8vIFwibmVnYXRpdmVcIiB5IHNvIHdlIGNhbiByZXBsYWNlIHN1YiB3aXRoIGFtIGxhdGVyXG4gICAgd2hpbGUgKHkudCA8IHlzKSB7XG4gICAgICB5W3kudCsrXSA9IDA7XG4gICAgfVxuICAgIHdoaWxlICgtLWogPj0gMCkge1xuICAgICAgLy8gRXN0aW1hdGUgcXVvdGllbnQgZGlnaXRcbiAgICAgIHZhciBxZCA9IHJbLS1pXSA9PSB5MCA/IHRoaXMuRE0gOiBNYXRoLmZsb29yKHJbaV0gKiBkMSArIChyW2kgLSAxXSArIGUpICogZDIpO1xuICAgICAgaWYgKChyW2ldICs9IHkuYW0oMCwgcWQsIHIsIGosIDAsIHlzKSkgPCBxZCkge1xuICAgICAgICAvLyBUcnkgaXQgb3V0XG4gICAgICAgIHkuZGxTaGlmdFRvKGosIHQpO1xuICAgICAgICByLnN1YlRvKHQsIHIpO1xuICAgICAgICB3aGlsZSAocltpXSA8IC0tcWQpIHtcbiAgICAgICAgICByLnN1YlRvKHQsIHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChxICE9IG51bGwpIHtcbiAgICAgIHIuZHJTaGlmdFRvKHlzLCBxKTtcbiAgICAgIGlmICh0cyAhPSBtcykge1xuICAgICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8ocSwgcSk7XG4gICAgICB9XG4gICAgfVxuICAgIHIudCA9IHlzO1xuICAgIHIuY2xhbXAoKTtcbiAgICBpZiAobnNoID4gMCkge1xuICAgICAgci5yU2hpZnRUbyhuc2gsIHIpO1xuICAgIH0gLy8gRGVub3JtYWxpemUgcmVtYWluZGVyXG4gICAgaWYgKHRzIDwgMCkge1xuICAgICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHIsIHIpO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaW52RGlnaXQgPSBibnBJbnZEaWdpdDtcbiAgLy8gKHByb3RlY3RlZCkgcmV0dXJuIFwiLTEvdGhpcyAlIDJeREJcIjsgdXNlZnVsIGZvciBNb250LiByZWR1Y3Rpb25cbiAgLy8ganVzdGlmaWNhdGlvbjpcbiAgLy8gICAgICAgICB4eSA9PSAxIChtb2QgbSlcbiAgLy8gICAgICAgICB4eSA9ICAxK2ttXG4gIC8vICAgeHkoMi14eSkgPSAoMStrbSkoMS1rbSlcbiAgLy8geFt5KDIteHkpXSA9IDEta14ybV4yXG4gIC8vIHhbeSgyLXh5KV0gPT0gMSAobW9kIG1eMilcbiAgLy8gaWYgeSBpcyAxL3ggbW9kIG0sIHRoZW4geSgyLXh5KSBpcyAxL3ggbW9kIG1eMlxuICAvLyBzaG91bGQgcmVkdWNlIHggYW5kIHkoMi14eSkgYnkgbV4yIGF0IGVhY2ggc3RlcCB0byBrZWVwIHNpemUgYm91bmRlZC5cbiAgLy8gSlMgbXVsdGlwbHkgXCJvdmVyZmxvd3NcIiBkaWZmZXJlbnRseSBmcm9tIEMvQysrLCBzbyBjYXJlIGlzIG5lZWRlZCBoZXJlLlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pbnZEaWdpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50IDwgMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciB4ID0gdGhpc1swXTtcbiAgICBpZiAoKHggJiAxKSA9PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdmFyIHkgPSB4ICYgMzsgLy8geSA9PSAxL3ggbW9kIDJeMlxuICAgIHkgPSB5ICogKDIgLSAoeCAmIDB4ZikgKiB5KSAmIDB4ZjsgLy8geSA9PSAxL3ggbW9kIDJeNFxuICAgIHkgPSB5ICogKDIgLSAoeCAmIDB4ZmYpICogeSkgJiAweGZmOyAvLyB5ID09IDEveCBtb2QgMl44XG4gICAgeSA9IHkgKiAoMiAtICgoeCAmIDB4ZmZmZikgKiB5ICYgMHhmZmZmKSkgJiAweGZmZmY7IC8vIHkgPT0gMS94IG1vZCAyXjE2XG4gICAgLy8gbGFzdCBzdGVwIC0gY2FsY3VsYXRlIGludmVyc2UgbW9kIERWIGRpcmVjdGx5O1xuICAgIC8vIGFzc3VtZXMgMTYgPCBEQiA8PSAzMiBhbmQgYXNzdW1lcyBhYmlsaXR5IHRvIGhhbmRsZSA0OC1iaXQgaW50c1xuICAgIHkgPSB5ICogKDIgLSB4ICogeSAlIHRoaXMuRFYpICUgdGhpcy5EVjsgLy8geSA9PSAxL3ggbW9kIDJeZGJpdHNcbiAgICAvLyB3ZSByZWFsbHkgd2FudCB0aGUgbmVnYXRpdmUgaW52ZXJzZSwgYW5kIC1EViA8IHkgPCBEVlxuICAgIHJldHVybiB5ID4gMCA/IHRoaXMuRFYgLSB5IDogLXk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmlzRXZlbiA9IGJucElzRXZlbjtcbiAgLy8gKHByb3RlY3RlZCkgdHJ1ZSBpZmYgdGhpcyBpcyBldmVuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmlzRXZlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMudCA+IDAgPyB0aGlzWzBdICYgMSA6IHRoaXMucykgPT0gMDtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZXhwID0gYm5wRXhwO1xuICAvLyAocHJvdGVjdGVkKSB0aGlzXmUsIGUgPCAyXjMyLCBkb2luZyBzcXIgYW5kIG11bCB3aXRoIFwiclwiIChIQUMgMTQuNzkpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmV4cCA9IGZ1bmN0aW9uIChlLCB6KSB7XG4gICAgaWYgKGUgPiAweGZmZmZmZmZmIHx8IGUgPCAxKSB7XG4gICAgICByZXR1cm4gQmlnSW50ZWdlci5PTkU7XG4gICAgfVxuICAgIHZhciByID0gbmJpKCk7XG4gICAgdmFyIHIyID0gbmJpKCk7XG4gICAgdmFyIGcgPSB6LmNvbnZlcnQodGhpcyk7XG4gICAgdmFyIGkgPSBuYml0cyhlKSAtIDE7XG4gICAgZy5jb3B5VG8ocik7XG4gICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICB6LnNxclRvKHIsIHIyKTtcbiAgICAgIGlmICgoZSAmIDEgPDwgaSkgPiAwKSB7XG4gICAgICAgIHoubXVsVG8ocjIsIGcsIHIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSByO1xuICAgICAgICByID0gcjI7XG4gICAgICAgIHIyID0gdDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHoucmV2ZXJ0KHIpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jaHVua1NpemUgPSBibnBDaHVua1NpemU7XG4gIC8vIChwcm90ZWN0ZWQpIHJldHVybiB4IHMudC4gcl54IDwgRFZcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2h1bmtTaXplID0gZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLkxOMiAqIHRoaXMuREIgLyBNYXRoLmxvZyhyKSk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnRvUmFkaXggPSBibnBUb1JhZGl4O1xuICAvLyAocHJvdGVjdGVkKSBjb252ZXJ0IHRvIHJhZGl4IHN0cmluZ1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1JhZGl4ID0gZnVuY3Rpb24gKGIpIHtcbiAgICBpZiAoYiA9PSBudWxsKSB7XG4gICAgICBiID0gMTA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpZ251bSgpID09IDAgfHwgYiA8IDIgfHwgYiA+IDM2KSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICAgIHZhciBjcyA9IHRoaXMuY2h1bmtTaXplKGIpO1xuICAgIHZhciBhID0gTWF0aC5wb3coYiwgY3MpO1xuICAgIHZhciBkID0gbmJ2KGEpO1xuICAgIHZhciB5ID0gbmJpKCk7XG4gICAgdmFyIHogPSBuYmkoKTtcbiAgICB2YXIgciA9IFwiXCI7XG4gICAgdGhpcy5kaXZSZW1UbyhkLCB5LCB6KTtcbiAgICB3aGlsZSAoeS5zaWdudW0oKSA+IDApIHtcbiAgICAgIHIgPSAoYSArIHouaW50VmFsdWUoKSkudG9TdHJpbmcoYikuc3Vic3RyKDEpICsgcjtcbiAgICAgIHkuZGl2UmVtVG8oZCwgeSwgeik7XG4gICAgfVxuICAgIHJldHVybiB6LmludFZhbHVlKCkudG9TdHJpbmcoYikgKyByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tUmFkaXggPSBibnBGcm9tUmFkaXg7XG4gIC8vIChwcm90ZWN0ZWQpIGNvbnZlcnQgZnJvbSByYWRpeCBzdHJpbmdcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVJhZGl4ID0gZnVuY3Rpb24gKHMsIGIpIHtcbiAgICB0aGlzLmZyb21JbnQoMCk7XG4gICAgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgYiA9IDEwO1xuICAgIH1cbiAgICB2YXIgY3MgPSB0aGlzLmNodW5rU2l6ZShiKTtcbiAgICB2YXIgZCA9IE1hdGgucG93KGIsIGNzKTtcbiAgICB2YXIgbWkgPSBmYWxzZTtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIHcgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHggPSBpbnRBdChzLCBpKTtcbiAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICBpZiAocy5jaGFyQXQoaSkgPT0gXCItXCIgJiYgdGhpcy5zaWdudW0oKSA9PSAwKSB7XG4gICAgICAgICAgbWkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdyA9IGIgKiB3ICsgeDtcbiAgICAgIGlmICgrK2ogPj0gY3MpIHtcbiAgICAgICAgdGhpcy5kTXVsdGlwbHkoZCk7XG4gICAgICAgIHRoaXMuZEFkZE9mZnNldCh3LCAwKTtcbiAgICAgICAgaiA9IDA7XG4gICAgICAgIHcgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaiA+IDApIHtcbiAgICAgIHRoaXMuZE11bHRpcGx5KE1hdGgucG93KGIsIGopKTtcbiAgICAgIHRoaXMuZEFkZE9mZnNldCh3LCAwKTtcbiAgICB9XG4gICAgaWYgKG1pKSB7XG4gICAgICBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcywgdGhpcyk7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tTnVtYmVyID0gYm5wRnJvbU51bWJlcjtcbiAgLy8gKHByb3RlY3RlZCkgYWx0ZXJuYXRlIGNvbnN0cnVjdG9yXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21OdW1iZXIgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiBiKSB7XG4gICAgICAvLyBuZXcgQmlnSW50ZWdlcihpbnQsaW50LFJORylcbiAgICAgIGlmIChhIDwgMikge1xuICAgICAgICB0aGlzLmZyb21JbnQoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZyb21OdW1iZXIoYSwgYyk7XG4gICAgICAgIGlmICghdGhpcy50ZXN0Qml0KGEgLSAxKSkge1xuICAgICAgICAgIC8vIGZvcmNlIE1TQiBzZXRcbiAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYSAtIDEpLCBfdXRpbC5vcF9vciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNFdmVuKCkpIHtcbiAgICAgICAgICB0aGlzLmRBZGRPZmZzZXQoMSwgMCk7XG4gICAgICAgIH0gLy8gZm9yY2Ugb2RkXG4gICAgICAgIHdoaWxlICghdGhpcy5pc1Byb2JhYmxlUHJpbWUoYikpIHtcbiAgICAgICAgICB0aGlzLmRBZGRPZmZzZXQoMiwgMCk7XG4gICAgICAgICAgaWYgKHRoaXMuYml0TGVuZ3RoKCkgPiBhKSB7XG4gICAgICAgICAgICB0aGlzLnN1YlRvKEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChhIC0gMSksIHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBuZXcgQmlnSW50ZWdlcihpbnQsUk5HKVxuICAgICAgdmFyIHggPSBbXTtcbiAgICAgIHZhciB0ID0gYSAmIDc7XG4gICAgICB4Lmxlbmd0aCA9IChhID4+IDMpICsgMTtcbiAgICAgIGIubmV4dEJ5dGVzKHgpO1xuICAgICAgaWYgKHQgPiAwKSB7XG4gICAgICAgIHhbMF0gJj0gKDEgPDwgdCkgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeFswXSA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLmZyb21TdHJpbmcoeCwgMjU2KTtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdHdpc2VUbyA9IGJucEJpdHdpc2VUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgb3AgYSAoYml0d2lzZSlcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYml0d2lzZVRvID0gZnVuY3Rpb24gKGEsIG9wLCByKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGY7XG4gICAgdmFyIG0gPSBNYXRoLm1pbihhLnQsIHRoaXMudCk7XG4gICAgZm9yIChpID0gMDsgaSA8IG07ICsraSkge1xuICAgICAgcltpXSA9IG9wKHRoaXNbaV0sIGFbaV0pO1xuICAgIH1cbiAgICBpZiAoYS50IDwgdGhpcy50KSB7XG4gICAgICBmID0gYS5zICYgdGhpcy5ETTtcbiAgICAgIGZvciAoaSA9IG07IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgICByW2ldID0gb3AodGhpc1tpXSwgZik7XG4gICAgICB9XG4gICAgICByLnQgPSB0aGlzLnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGYgPSB0aGlzLnMgJiB0aGlzLkRNO1xuICAgICAgZm9yIChpID0gbTsgaSA8IGEudDsgKytpKSB7XG4gICAgICAgIHJbaV0gPSBvcChmLCBhW2ldKTtcbiAgICAgIH1cbiAgICAgIHIudCA9IGEudDtcbiAgICB9XG4gICAgci5zID0gb3AodGhpcy5zLCBhLnMpO1xuICAgIHIuY2xhbXAoKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuY2hhbmdlQml0ID0gYm5wQ2hhbmdlQml0O1xuICAvLyAocHJvdGVjdGVkKSB0aGlzIG9wICgxPDxuKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jaGFuZ2VCaXQgPSBmdW5jdGlvbiAobiwgb3ApIHtcbiAgICB2YXIgciA9IEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChuKTtcbiAgICB0aGlzLmJpdHdpc2VUbyhyLCBvcCwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFkZFRvID0gYm5wQWRkVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzICsgYVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGRUbyA9IGZ1bmN0aW9uIChhLCByKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBjID0gMDtcbiAgICB2YXIgbSA9IE1hdGgubWluKGEudCwgdGhpcy50KTtcbiAgICB3aGlsZSAoaSA8IG0pIHtcbiAgICAgIGMgKz0gdGhpc1tpXSArIGFbaV07XG4gICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcbiAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgfVxuICAgIGlmIChhLnQgPCB0aGlzLnQpIHtcbiAgICAgIGMgKz0gYS5zO1xuICAgICAgd2hpbGUgKGkgPCB0aGlzLnQpIHtcbiAgICAgICAgYyArPSB0aGlzW2ldO1xuICAgICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcbiAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgIH1cbiAgICAgIGMgKz0gdGhpcy5zO1xuICAgIH0gZWxzZSB7XG4gICAgICBjICs9IHRoaXMucztcbiAgICAgIHdoaWxlIChpIDwgYS50KSB7XG4gICAgICAgIGMgKz0gYVtpXTtcbiAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XG4gICAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgICB9XG4gICAgICBjICs9IGEucztcbiAgICB9XG4gICAgci5zID0gYyA8IDAgPyAtMSA6IDA7XG4gICAgaWYgKGMgPiAwKSB7XG4gICAgICByW2krK10gPSBjO1xuICAgIH0gZWxzZSBpZiAoYyA8IC0xKSB7XG4gICAgICByW2krK10gPSB0aGlzLkRWICsgYztcbiAgICB9XG4gICAgci50ID0gaTtcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRNdWx0aXBseSA9IGJucERNdWx0aXBseTtcbiAgLy8gKHByb3RlY3RlZCkgdGhpcyAqPSBuLCB0aGlzID49IDAsIDEgPCBuIDwgRFZcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZE11bHRpcGx5ID0gZnVuY3Rpb24gKG4pIHtcbiAgICB0aGlzW3RoaXMudF0gPSB0aGlzLmFtKDAsIG4gLSAxLCB0aGlzLCAwLCAwLCB0aGlzLnQpO1xuICAgICsrdGhpcy50O1xuICAgIHRoaXMuY2xhbXAoKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZEFkZE9mZnNldCA9IGJucERBZGRPZmZzZXQ7XG4gIC8vIChwcm90ZWN0ZWQpIHRoaXMgKz0gbiA8PCB3IHdvcmRzLCB0aGlzID49IDBcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZEFkZE9mZnNldCA9IGZ1bmN0aW9uIChuLCB3KSB7XG4gICAgaWYgKG4gPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aGlsZSAodGhpcy50IDw9IHcpIHtcbiAgICAgIHRoaXNbdGhpcy50KytdID0gMDtcbiAgICB9XG4gICAgdGhpc1t3XSArPSBuO1xuICAgIHdoaWxlICh0aGlzW3ddID49IHRoaXMuRFYpIHtcbiAgICAgIHRoaXNbd10gLT0gdGhpcy5EVjtcbiAgICAgIGlmICgrK3cgPj0gdGhpcy50KSB7XG4gICAgICAgIHRoaXNbdGhpcy50KytdID0gMDtcbiAgICAgIH1cbiAgICAgICsrdGhpc1t3XTtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5TG93ZXJUbyA9IGJucE11bHRpcGx5TG93ZXJUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IGxvd2VyIG4gd29yZHMgb2YgXCJ0aGlzICogYVwiLCBhLnQgPD0gblxuICAvLyBcInRoaXNcIiBzaG91bGQgYmUgdGhlIGxhcmdlciBvbmUgaWYgYXBwcm9wcmlhdGUuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5TG93ZXJUbyA9IGZ1bmN0aW9uIChhLCBuLCByKSB7XG4gICAgdmFyIGkgPSBNYXRoLm1pbih0aGlzLnQgKyBhLnQsIG4pO1xuICAgIHIucyA9IDA7IC8vIGFzc3VtZXMgYSx0aGlzID49IDBcbiAgICByLnQgPSBpO1xuICAgIHdoaWxlIChpID4gMCkge1xuICAgICAgclstLWldID0gMDtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IHIudCAtIHRoaXMudDsgaSA8IGo7ICsraSkge1xuICAgICAgcltpICsgdGhpcy50XSA9IHRoaXMuYW0oMCwgYVtpXSwgciwgaSwgMCwgdGhpcy50KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IE1hdGgubWluKGEudCwgbik7IGkgPCBqOyArK2kpIHtcbiAgICAgIHRoaXMuYW0oMCwgYVtpXSwgciwgaSwgMCwgbiAtIGkpO1xuICAgIH1cbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VXBwZXJUbyA9IGJucE11bHRpcGx5VXBwZXJUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IFwidGhpcyAqIGFcIiB3aXRob3V0IGxvd2VyIG4gd29yZHMsIG4gPiAwXG4gIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlVcHBlclRvID0gZnVuY3Rpb24gKGEsIG4sIHIpIHtcbiAgICAtLW47XG4gICAgdmFyIGkgPSByLnQgPSB0aGlzLnQgKyBhLnQgLSBuO1xuICAgIHIucyA9IDA7IC8vIGFzc3VtZXMgYSx0aGlzID49IDBcbiAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgIHJbaV0gPSAwO1xuICAgIH1cbiAgICBmb3IgKGkgPSBNYXRoLm1heChuIC0gdGhpcy50LCAwKTsgaSA8IGEudDsgKytpKSB7XG4gICAgICByW3RoaXMudCArIGkgLSBuXSA9IHRoaXMuYW0obiAtIGksIGFbaV0sIHIsIDAsIDAsIHRoaXMudCArIGkgLSBuKTtcbiAgICB9XG4gICAgci5jbGFtcCgpO1xuICAgIHIuZHJTaGlmdFRvKDEsIHIpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnQgPSBibnBNb2RJbnQ7XG4gIC8vIChwcm90ZWN0ZWQpIHRoaXMgJSBuLCBuIDwgMl4yNlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnQgPSBmdW5jdGlvbiAobikge1xuICAgIGlmIChuIDw9IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgZCA9IHRoaXMuRFYgJSBuO1xuICAgIHZhciByID0gdGhpcy5zIDwgMCA/IG4gLSAxIDogMDtcbiAgICBpZiAodGhpcy50ID4gMCkge1xuICAgICAgaWYgKGQgPT0gMCkge1xuICAgICAgICByID0gdGhpc1swXSAlIG47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICByID0gKGQgKiByICsgdGhpc1tpXSkgJSBuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5taWxsZXJSYWJpbiA9IGJucE1pbGxlclJhYmluO1xuICAvLyAocHJvdGVjdGVkKSB0cnVlIGlmIHByb2JhYmx5IHByaW1lIChIQUMgNC4yNCwgTWlsbGVyLVJhYmluKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5taWxsZXJSYWJpbiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgdmFyIG4xID0gdGhpcy5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSk7XG4gICAgdmFyIGsgPSBuMS5nZXRMb3dlc3RTZXRCaXQoKTtcbiAgICBpZiAoayA8PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciByID0gbjEuc2hpZnRSaWdodChrKTtcbiAgICB0ID0gdCArIDEgPj4gMTtcbiAgICBpZiAodCA+IGxvd3ByaW1lcy5sZW5ndGgpIHtcbiAgICAgIHQgPSBsb3dwcmltZXMubGVuZ3RoO1xuICAgIH1cbiAgICB2YXIgYSA9IG5iaSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdDsgKytpKSB7XG4gICAgICAvLyBQaWNrIGJhc2VzIGF0IHJhbmRvbSwgaW5zdGVhZCBvZiBzdGFydGluZyBhdCAyXG4gICAgICBhLmZyb21JbnQobG93cHJpbWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxvd3ByaW1lcy5sZW5ndGgpXSk7XG4gICAgICB2YXIgeSA9IGEubW9kUG93KHIsIHRoaXMpO1xuICAgICAgaWYgKHkuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSAhPSAwICYmIHkuY29tcGFyZVRvKG4xKSAhPSAwKSB7XG4gICAgICAgIHZhciBqID0gMTtcbiAgICAgICAgd2hpbGUgKGorKyA8IGsgJiYgeS5jb21wYXJlVG8objEpICE9IDApIHtcbiAgICAgICAgICB5ID0geS5tb2RQb3dJbnQoMiwgdGhpcyk7XG4gICAgICAgICAgaWYgKHkuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh5LmNvbXBhcmVUbyhuMSkgIT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc3F1YXJlID0gYm5TcXVhcmU7XG4gIC8vIChwdWJsaWMpIHRoaXNeMlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLnNxdWFyZVRvKHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyNyZWdpb24gQVNZTkNcbiAgLy8gUHVibGljIEFQSSBtZXRob2RcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZ2NkYSA9IGZ1bmN0aW9uIChhLCBjYWxsYmFjaykge1xuICAgIHZhciB4ID0gdGhpcy5zIDwgMCA/IHRoaXMubmVnYXRlKCkgOiB0aGlzLmNsb25lKCk7XG4gICAgdmFyIHkgPSBhLnMgPCAwID8gYS5uZWdhdGUoKSA6IGEuY2xvbmUoKTtcbiAgICBpZiAoeC5jb21wYXJlVG8oeSkgPCAwKSB7XG4gICAgICB2YXIgdCA9IHg7XG4gICAgICB4ID0geTtcbiAgICAgIHkgPSB0O1xuICAgIH1cbiAgICB2YXIgaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCk7XG4gICAgdmFyIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xuICAgIGlmIChnIDwgMCkge1xuICAgICAgY2FsbGJhY2soeCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpIDwgZykge1xuICAgICAgZyA9IGk7XG4gICAgfVxuICAgIGlmIChnID4gMCkge1xuICAgICAgeC5yU2hpZnRUbyhnLCB4KTtcbiAgICAgIHkuclNoaWZ0VG8oZywgeSk7XG4gICAgfVxuICAgIC8vIFdvcmtob3JzZSBvZiB0aGUgYWxnb3JpdGhtLCBnZXRzIGNhbGxlZCAyMDAgLSA4MDAgdGltZXMgcGVyIDUxMiBiaXQga2V5Z2VuLlxuICAgIHZhciBnY2RhMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgoaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkge1xuICAgICAgICB4LnJTaGlmdFRvKGksIHgpO1xuICAgICAgfVxuICAgICAgaWYgKChpID0geS5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKSB7XG4gICAgICAgIHkuclNoaWZ0VG8oaSwgeSk7XG4gICAgICB9XG4gICAgICBpZiAoeC5jb21wYXJlVG8oeSkgPj0gMCkge1xuICAgICAgICB4LnN1YlRvKHksIHgpO1xuICAgICAgICB4LnJTaGlmdFRvKDEsIHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeS5zdWJUbyh4LCB5KTtcbiAgICAgICAgeS5yU2hpZnRUbygxLCB5KTtcbiAgICAgIH1cbiAgICAgIGlmICghKHguc2lnbnVtKCkgPiAwKSkge1xuICAgICAgICBpZiAoZyA+IDApIHtcbiAgICAgICAgICB5LmxTaGlmdFRvKGcsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKHkpO1xuICAgICAgICB9LCAwKTsgLy8gZXNjYXBlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGdjZGExLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNldFRpbWVvdXQoZ2NkYTEsIDEwKTtcbiAgfTtcbiAgLy8gKHByb3RlY3RlZCkgYWx0ZXJuYXRlIGNvbnN0cnVjdG9yXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21OdW1iZXJBc3luYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBjYWxsYmFjaykge1xuICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiBiKSB7XG4gICAgICBpZiAoYSA8IDIpIHtcbiAgICAgICAgdGhpcy5mcm9tSW50KDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsIGMpO1xuICAgICAgICBpZiAoIXRoaXMudGVzdEJpdChhIC0gMSkpIHtcbiAgICAgICAgICB0aGlzLmJpdHdpc2VUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYSAtIDEpLCBfdXRpbC5vcF9vciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNFdmVuKCkpIHtcbiAgICAgICAgICB0aGlzLmRBZGRPZmZzZXQoMSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJucF8xID0gdGhpcztcbiAgICAgICAgdmFyIGJucGZuMV8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGJucF8xLmRBZGRPZmZzZXQoMiwgMCk7XG4gICAgICAgICAgaWYgKGJucF8xLmJpdExlbmd0aCgpID4gYSkge1xuICAgICAgICAgICAgYm5wXzEuc3ViVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEgLSAxKSwgYm5wXzEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYm5wXzEuaXNQcm9iYWJsZVByaW1lKGIpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0sIDApOyAvLyBlc2NhcGVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dChibnBmbjFfMSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KGJucGZuMV8xLCAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHggPSBbXTtcbiAgICAgIHZhciB0ID0gYSAmIDc7XG4gICAgICB4Lmxlbmd0aCA9IChhID4+IDMpICsgMTtcbiAgICAgIGIubmV4dEJ5dGVzKHgpO1xuICAgICAgaWYgKHQgPiAwKSB7XG4gICAgICAgIHhbMF0gJj0gKDEgPDwgdCkgLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeFswXSA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLmZyb21TdHJpbmcoeCwgMjU2KTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBCaWdJbnRlZ2VyO1xufSgpO1xuLy8jcmVnaW9uIFJFRFVDRVJTXG4vLyNyZWdpb24gTnVsbEV4cFxudmFyIE51bGxFeHAgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBOdWxsRXhwKCkge31cbiAgLy8gTnVsbEV4cC5wcm90b3R5cGUuY29udmVydCA9IG5Ob3A7XG4gIE51bGxFeHAucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4O1xuICB9O1xuICAvLyBOdWxsRXhwLnByb3RvdHlwZS5yZXZlcnQgPSBuTm9wO1xuICBOdWxsRXhwLnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4O1xuICB9O1xuICAvLyBOdWxsRXhwLnByb3RvdHlwZS5tdWxUbyA9IG5NdWxUbztcbiAgTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiAoeCwgeSwgcikge1xuICAgIHgubXVsdGlwbHlUbyh5LCByKTtcbiAgfTtcbiAgLy8gTnVsbEV4cC5wcm90b3R5cGUuc3FyVG8gPSBuU3FyVG87XG4gIE51bGxFeHAucHJvdG90eXBlLnNxclRvID0gZnVuY3Rpb24gKHgsIHIpIHtcbiAgICB4LnNxdWFyZVRvKHIpO1xuICB9O1xuICByZXR1cm4gTnVsbEV4cDtcbn0oKTtcbi8vIE1vZHVsYXIgcmVkdWN0aW9uIHVzaW5nIFwiY2xhc3NpY1wiIGFsZ29yaXRobVxudmFyIENsYXNzaWMgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDbGFzc2ljKG0pIHtcbiAgICB0aGlzLm0gPSBtO1xuICB9XG4gIC8vIENsYXNzaWMucHJvdG90eXBlLmNvbnZlcnQgPSBjQ29udmVydDtcbiAgQ2xhc3NpYy5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgaWYgKHgucyA8IDAgfHwgeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB7XG4gICAgICByZXR1cm4geC5tb2QodGhpcy5tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9O1xuICAvLyBDbGFzc2ljLnByb3RvdHlwZS5yZXZlcnQgPSBjUmV2ZXJ0O1xuICBDbGFzc2ljLnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4O1xuICB9O1xuICAvLyBDbGFzc2ljLnByb3RvdHlwZS5yZWR1Y2UgPSBjUmVkdWNlO1xuICBDbGFzc2ljLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoeCkge1xuICAgIHguZGl2UmVtVG8odGhpcy5tLCBudWxsLCB4KTtcbiAgfTtcbiAgLy8gQ2xhc3NpYy5wcm90b3R5cGUubXVsVG8gPSBjTXVsVG87XG4gIENsYXNzaWMucHJvdG90eXBlLm11bFRvID0gZnVuY3Rpb24gKHgsIHksIHIpIHtcbiAgICB4Lm11bHRpcGx5VG8oeSwgcik7XG4gICAgdGhpcy5yZWR1Y2Uocik7XG4gIH07XG4gIC8vIENsYXNzaWMucHJvdG90eXBlLnNxclRvID0gY1NxclRvO1xuICBDbGFzc2ljLnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XG4gICAgeC5zcXVhcmVUbyhyKTtcbiAgICB0aGlzLnJlZHVjZShyKTtcbiAgfTtcbiAgcmV0dXJuIENsYXNzaWM7XG59KCk7XG4vLyNlbmRyZWdpb25cbi8vI3JlZ2lvbiBNb250Z29tZXJ5XG4vLyBNb250Z29tZXJ5IHJlZHVjdGlvblxudmFyIE1vbnRnb21lcnkgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNb250Z29tZXJ5KG0pIHtcbiAgICB0aGlzLm0gPSBtO1xuICAgIHRoaXMubXAgPSBtLmludkRpZ2l0KCk7XG4gICAgdGhpcy5tcGwgPSB0aGlzLm1wICYgMHg3ZmZmO1xuICAgIHRoaXMubXBoID0gdGhpcy5tcCA+PiAxNTtcbiAgICB0aGlzLnVtID0gKDEgPDwgbS5EQiAtIDE1KSAtIDE7XG4gICAgdGhpcy5tdDIgPSAyICogbS50O1xuICB9XG4gIC8vIE1vbnRnb21lcnkucHJvdG90eXBlLmNvbnZlcnQgPSBtb250Q29udmVydDtcbiAgLy8geFIgbW9kIG1cbiAgTW9udGdvbWVyeS5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB4LmFicygpLmRsU2hpZnRUbyh0aGlzLm0udCwgcik7XG4gICAgci5kaXZSZW1Ubyh0aGlzLm0sIG51bGwsIHIpO1xuICAgIGlmICh4LnMgPCAwICYmIHIuY29tcGFyZVRvKEJpZ0ludGVnZXIuWkVSTykgPiAwKSB7XG4gICAgICB0aGlzLm0uc3ViVG8ociwgcik7XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5yZXZlcnQgPSBtb250UmV2ZXJ0O1xuICAvLyB4L1IgbW9kIG1cbiAgTW9udGdvbWVyeS5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHguY29weVRvKHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5yZWR1Y2UgPSBtb250UmVkdWNlO1xuICAvLyB4ID0geC9SIG1vZCBtIChIQUMgMTQuMzIpXG4gIE1vbnRnb21lcnkucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgd2hpbGUgKHgudCA8PSB0aGlzLm10Mikge1xuICAgICAgLy8gcGFkIHggc28gYW0gaGFzIGVub3VnaCByb29tIGxhdGVyXG4gICAgICB4W3gudCsrXSA9IDA7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tLnQ7ICsraSkge1xuICAgICAgLy8gZmFzdGVyIHdheSBvZiBjYWxjdWxhdGluZyB1MCA9IHhbaV0qbXAgbW9kIERWXG4gICAgICB2YXIgaiA9IHhbaV0gJiAweDdmZmY7XG4gICAgICB2YXIgdTAgPSBqICogdGhpcy5tcGwgKyAoKGogKiB0aGlzLm1waCArICh4W2ldID4+IDE1KSAqIHRoaXMubXBsICYgdGhpcy51bSkgPDwgMTUpICYgeC5ETTtcbiAgICAgIC8vIHVzZSBhbSB0byBjb21iaW5lIHRoZSBtdWx0aXBseS1zaGlmdC1hZGQgaW50byBvbmUgY2FsbFxuICAgICAgaiA9IGkgKyB0aGlzLm0udDtcbiAgICAgIHhbal0gKz0gdGhpcy5tLmFtKDAsIHUwLCB4LCBpLCAwLCB0aGlzLm0udCk7XG4gICAgICAvLyBwcm9wYWdhdGUgY2FycnlcbiAgICAgIHdoaWxlICh4W2pdID49IHguRFYpIHtcbiAgICAgICAgeFtqXSAtPSB4LkRWO1xuICAgICAgICB4Wysral0rKztcbiAgICAgIH1cbiAgICB9XG4gICAgeC5jbGFtcCgpO1xuICAgIHguZHJTaGlmdFRvKHRoaXMubS50LCB4KTtcbiAgICBpZiAoeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB7XG4gICAgICB4LnN1YlRvKHRoaXMubSwgeCk7XG4gICAgfVxuICB9O1xuICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5tdWxUbyA9IG1vbnRNdWxUbztcbiAgLy8gciA9IFwieHkvUiBtb2QgbVwiOyB4LHkgIT0gclxuICBNb250Z29tZXJ5LnByb3RvdHlwZS5tdWxUbyA9IGZ1bmN0aW9uICh4LCB5LCByKSB7XG4gICAgeC5tdWx0aXBseVRvKHksIHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICB9O1xuICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5zcXJUbyA9IG1vbnRTcXJUbztcbiAgLy8gciA9IFwieF4yL1IgbW9kIG1cIjsgeCAhPSByXG4gIE1vbnRnb21lcnkucHJvdG90eXBlLnNxclRvID0gZnVuY3Rpb24gKHgsIHIpIHtcbiAgICB4LnNxdWFyZVRvKHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICB9O1xuICByZXR1cm4gTW9udGdvbWVyeTtcbn0oKTtcbi8vI2VuZHJlZ2lvbiBNb250Z29tZXJ5XG4vLyNyZWdpb24gQmFycmV0dFxuLy8gQmFycmV0dCBtb2R1bGFyIHJlZHVjdGlvblxudmFyIEJhcnJldHQgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCYXJyZXR0KG0pIHtcbiAgICB0aGlzLm0gPSBtO1xuICAgIC8vIHNldHVwIEJhcnJldHRcbiAgICB0aGlzLnIyID0gbmJpKCk7XG4gICAgdGhpcy5xMyA9IG5iaSgpO1xuICAgIEJpZ0ludGVnZXIuT05FLmRsU2hpZnRUbygyICogbS50LCB0aGlzLnIyKTtcbiAgICB0aGlzLm11ID0gdGhpcy5yMi5kaXZpZGUobSk7XG4gIH1cbiAgLy8gQmFycmV0dC5wcm90b3R5cGUuY29udmVydCA9IGJhcnJldHRDb252ZXJ0O1xuICBCYXJyZXR0LnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICBpZiAoeC5zIDwgMCB8fCB4LnQgPiAyICogdGhpcy5tLnQpIHtcbiAgICAgIHJldHVybiB4Lm1vZCh0aGlzLm0pO1xuICAgIH0gZWxzZSBpZiAoeC5jb21wYXJlVG8odGhpcy5tKSA8IDApIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgciA9IG5iaSgpO1xuICAgICAgeC5jb3B5VG8ocik7XG4gICAgICB0aGlzLnJlZHVjZShyKTtcbiAgICAgIHJldHVybiByO1xuICAgIH1cbiAgfTtcbiAgLy8gQmFycmV0dC5wcm90b3R5cGUucmV2ZXJ0ID0gYmFycmV0dFJldmVydDtcbiAgQmFycmV0dC5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbiAgLy8gQmFycmV0dC5wcm90b3R5cGUucmVkdWNlID0gYmFycmV0dFJlZHVjZTtcbiAgLy8geCA9IHggbW9kIG0gKEhBQyAxNC40MilcbiAgQmFycmV0dC5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKHgpIHtcbiAgICB4LmRyU2hpZnRUbyh0aGlzLm0udCAtIDEsIHRoaXMucjIpO1xuICAgIGlmICh4LnQgPiB0aGlzLm0udCArIDEpIHtcbiAgICAgIHgudCA9IHRoaXMubS50ICsgMTtcbiAgICAgIHguY2xhbXAoKTtcbiAgICB9XG4gICAgdGhpcy5tdS5tdWx0aXBseVVwcGVyVG8odGhpcy5yMiwgdGhpcy5tLnQgKyAxLCB0aGlzLnEzKTtcbiAgICB0aGlzLm0ubXVsdGlwbHlMb3dlclRvKHRoaXMucTMsIHRoaXMubS50ICsgMSwgdGhpcy5yMik7XG4gICAgd2hpbGUgKHguY29tcGFyZVRvKHRoaXMucjIpIDwgMCkge1xuICAgICAgeC5kQWRkT2Zmc2V0KDEsIHRoaXMubS50ICsgMSk7XG4gICAgfVxuICAgIHguc3ViVG8odGhpcy5yMiwgeCk7XG4gICAgd2hpbGUgKHguY29tcGFyZVRvKHRoaXMubSkgPj0gMCkge1xuICAgICAgeC5zdWJUbyh0aGlzLm0sIHgpO1xuICAgIH1cbiAgfTtcbiAgLy8gQmFycmV0dC5wcm90b3R5cGUubXVsVG8gPSBiYXJyZXR0TXVsVG87XG4gIC8vIHIgPSB4KnkgbW9kIG07IHgseSAhPSByXG4gIEJhcnJldHQucHJvdG90eXBlLm11bFRvID0gZnVuY3Rpb24gKHgsIHksIHIpIHtcbiAgICB4Lm11bHRpcGx5VG8oeSwgcik7XG4gICAgdGhpcy5yZWR1Y2Uocik7XG4gIH07XG4gIC8vIEJhcnJldHQucHJvdG90eXBlLnNxclRvID0gYmFycmV0dFNxclRvO1xuICAvLyByID0geF4yIG1vZCBtOyB4ICE9IHJcbiAgQmFycmV0dC5wcm90b3R5cGUuc3FyVG8gPSBmdW5jdGlvbiAoeCwgcikge1xuICAgIHguc3F1YXJlVG8ocik7XG4gICAgdGhpcy5yZWR1Y2Uocik7XG4gIH07XG4gIHJldHVybiBCYXJyZXR0O1xufSgpO1xuLy8jZW5kcmVnaW9uXG4vLyNlbmRyZWdpb24gUkVEVUNFUlNcbi8vIHJldHVybiBuZXcsIHVuc2V0IEJpZ0ludGVnZXJcbmZ1bmN0aW9uIG5iaSgpIHtcbiAgcmV0dXJuIG5ldyBCaWdJbnRlZ2VyKG51bGwpO1xufVxuZnVuY3Rpb24gcGFyc2VCaWdJbnQoc3RyLCByKSB7XG4gIHJldHVybiBuZXcgQmlnSW50ZWdlcihzdHIsIHIpO1xufVxuLy8gYW06IENvbXB1dGUgd19qICs9ICh4KnRoaXNfaSksIHByb3BhZ2F0ZSBjYXJyaWVzLFxuLy8gYyBpcyBpbml0aWFsIGNhcnJ5LCByZXR1cm5zIGZpbmFsIGNhcnJ5LlxuLy8gYyA8IDMqZHZhbHVlLCB4IDwgMipkdmFsdWUsIHRoaXNfaSA8IGR2YWx1ZVxuLy8gV2UgbmVlZCB0byBzZWxlY3QgdGhlIGZhc3Rlc3Qgb25lIHRoYXQgd29ya3MgaW4gdGhpcyBlbnZpcm9ubWVudC5cbnZhciBpbkJyb3dzZXIgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiO1xuaWYgKGluQnJvd3NlciAmJiBqX2xtICYmIG5hdmlnYXRvci5hcHBOYW1lID09IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIpIHtcbiAgLy8gYW0yIGF2b2lkcyBhIGJpZyBtdWx0LWFuZC1leHRyYWN0IGNvbXBsZXRlbHkuXG4gIC8vIE1heCBkaWdpdCBiaXRzIHNob3VsZCBiZSA8PSAzMCBiZWNhdXNlIHdlIGRvIGJpdHdpc2Ugb3BzXG4gIC8vIG9uIHZhbHVlcyB1cCB0byAyKmhkdmFsdWVeMi1oZHZhbHVlLTEgKDwgMl4zMSlcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW0gPSBmdW5jdGlvbiBhbTIoaSwgeCwgdywgaiwgYywgbikge1xuICAgIHZhciB4bCA9IHggJiAweDdmZmY7XG4gICAgdmFyIHhoID0geCA+PiAxNTtcbiAgICB3aGlsZSAoLS1uID49IDApIHtcbiAgICAgIHZhciBsID0gdGhpc1tpXSAmIDB4N2ZmZjtcbiAgICAgIHZhciBoID0gdGhpc1tpKytdID4+IDE1O1xuICAgICAgdmFyIG0gPSB4aCAqIGwgKyBoICogeGw7XG4gICAgICBsID0geGwgKiBsICsgKChtICYgMHg3ZmZmKSA8PCAxNSkgKyB3W2pdICsgKGMgJiAweDNmZmZmZmZmKTtcbiAgICAgIGMgPSAobCA+Pj4gMzApICsgKG0gPj4+IDE1KSArIHhoICogaCArIChjID4+PiAzMCk7XG4gICAgICB3W2orK10gPSBsICYgMHgzZmZmZmZmZjtcbiAgICB9XG4gICAgcmV0dXJuIGM7XG4gIH07XG4gIGRiaXRzID0gMzA7XG59IGVsc2UgaWYgKGluQnJvd3NlciAmJiBqX2xtICYmIG5hdmlnYXRvci5hcHBOYW1lICE9IFwiTmV0c2NhcGVcIikge1xuICAvLyBhbTE6IHVzZSBhIHNpbmdsZSBtdWx0IGFuZCBkaXZpZGUgdG8gZ2V0IHRoZSBoaWdoIGJpdHMsXG4gIC8vIG1heCBkaWdpdCBiaXRzIHNob3VsZCBiZSAyNiBiZWNhdXNlXG4gIC8vIG1heCBpbnRlcm5hbCB2YWx1ZSA9IDIqZHZhbHVlXjItMipkdmFsdWUgKDwgMl41MylcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW0gPSBmdW5jdGlvbiBhbTEoaSwgeCwgdywgaiwgYywgbikge1xuICAgIHdoaWxlICgtLW4gPj0gMCkge1xuICAgICAgdmFyIHYgPSB4ICogdGhpc1tpKytdICsgd1tqXSArIGM7XG4gICAgICBjID0gTWF0aC5mbG9vcih2IC8gMHg0MDAwMDAwKTtcbiAgICAgIHdbaisrXSA9IHYgJiAweDNmZmZmZmY7XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9O1xuICBkYml0cyA9IDI2O1xufSBlbHNlIHtcbiAgLy8gTW96aWxsYS9OZXRzY2FwZSBzZWVtcyB0byBwcmVmZXIgYW0zXG4gIC8vIEFsdGVybmF0ZWx5LCBzZXQgbWF4IGRpZ2l0IGJpdHMgdG8gMjggc2luY2Ugc29tZVxuICAvLyBicm93c2VycyBzbG93IGRvd24gd2hlbiBkZWFsaW5nIHdpdGggMzItYml0IG51bWJlcnMuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFtID0gZnVuY3Rpb24gYW0zKGksIHgsIHcsIGosIGMsIG4pIHtcbiAgICB2YXIgeGwgPSB4ICYgMHgzZmZmO1xuICAgIHZhciB4aCA9IHggPj4gMTQ7XG4gICAgd2hpbGUgKC0tbiA+PSAwKSB7XG4gICAgICB2YXIgbCA9IHRoaXNbaV0gJiAweDNmZmY7XG4gICAgICB2YXIgaCA9IHRoaXNbaSsrXSA+PiAxNDtcbiAgICAgIHZhciBtID0geGggKiBsICsgaCAqIHhsO1xuICAgICAgbCA9IHhsICogbCArICgobSAmIDB4M2ZmZikgPDwgMTQpICsgd1tqXSArIGM7XG4gICAgICBjID0gKGwgPj4gMjgpICsgKG0gPj4gMTQpICsgeGggKiBoO1xuICAgICAgd1tqKytdID0gbCAmIDB4ZmZmZmZmZjtcbiAgICB9XG4gICAgcmV0dXJuIGM7XG4gIH07XG4gIGRiaXRzID0gMjg7XG59XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5EQiA9IGRiaXRzO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuRE0gPSAoMSA8PCBkYml0cykgLSAxO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuRFYgPSAxIDw8IGRiaXRzO1xudmFyIEJJX0ZQID0gNTI7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5GViA9IE1hdGgucG93KDIsIEJJX0ZQKTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLkYxID0gQklfRlAgLSBkYml0cztcbkJpZ0ludGVnZXIucHJvdG90eXBlLkYyID0gMiAqIGRiaXRzIC0gQklfRlA7XG4vLyBEaWdpdCBjb252ZXJzaW9uc1xudmFyIEJJX1JDID0gW107XG52YXIgcnI7XG52YXIgdnY7XG5yciA9IFwiMFwiLmNoYXJDb2RlQXQoMCk7XG5mb3IgKHZ2ID0gMDsgdnYgPD0gOTsgKyt2dikge1xuICBCSV9SQ1tycisrXSA9IHZ2O1xufVxucnIgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuZm9yICh2diA9IDEwOyB2diA8IDM2OyArK3Z2KSB7XG4gIEJJX1JDW3JyKytdID0gdnY7XG59XG5yciA9IFwiQVwiLmNoYXJDb2RlQXQoMCk7XG5mb3IgKHZ2ID0gMTA7IHZ2IDwgMzY7ICsrdnYpIHtcbiAgQklfUkNbcnIrK10gPSB2djtcbn1cbmZ1bmN0aW9uIGludEF0KHMsIGkpIHtcbiAgdmFyIGMgPSBCSV9SQ1tzLmNoYXJDb2RlQXQoaSldO1xuICByZXR1cm4gYyA9PSBudWxsID8gLTEgOiBjO1xufVxuLy8gcmV0dXJuIGJpZ2ludCBpbml0aWFsaXplZCB0byB2YWx1ZVxuZnVuY3Rpb24gbmJ2KGkpIHtcbiAgdmFyIHIgPSBuYmkoKTtcbiAgci5mcm9tSW50KGkpO1xuICByZXR1cm4gcjtcbn1cbi8vIHJldHVybnMgYml0IGxlbmd0aCBvZiB0aGUgaW50ZWdlciB4XG5mdW5jdGlvbiBuYml0cyh4KSB7XG4gIHZhciByID0gMTtcbiAgdmFyIHQ7XG4gIGlmICgodCA9IHggPj4+IDE2KSAhPSAwKSB7XG4gICAgeCA9IHQ7XG4gICAgciArPSAxNjtcbiAgfVxuICBpZiAoKHQgPSB4ID4+IDgpICE9IDApIHtcbiAgICB4ID0gdDtcbiAgICByICs9IDg7XG4gIH1cbiAgaWYgKCh0ID0geCA+PiA0KSAhPSAwKSB7XG4gICAgeCA9IHQ7XG4gICAgciArPSA0O1xuICB9XG4gIGlmICgodCA9IHggPj4gMikgIT0gMCkge1xuICAgIHggPSB0O1xuICAgIHIgKz0gMjtcbiAgfVxuICBpZiAoKHQgPSB4ID4+IDEpICE9IDApIHtcbiAgICB4ID0gdDtcbiAgICByICs9IDE7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG4vLyBcImNvbnN0YW50c1wiXG5CaWdJbnRlZ2VyLlpFUk8gPSBuYnYoMCk7XG5CaWdJbnRlZ2VyLk9ORSA9IG5idigxKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXJjZm91ciA9IHZvaWQgMDtcbmV4cG9ydHMucHJuZ19uZXdzdGF0ZSA9IHBybmdfbmV3c3RhdGU7XG5leHBvcnRzLnJuZ19wc2l6ZSA9IHZvaWQgMDtcbi8vIHBybmc0LmpzIC0gdXNlcyBBcmNmb3VyIGFzIGEgUFJOR1xudmFyIEFyY2ZvdXIgPSBleHBvcnRzLkFyY2ZvdXIgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBcmNmb3VyKCkge1xuICAgIHRoaXMuaSA9IDA7XG4gICAgdGhpcy5qID0gMDtcbiAgICB0aGlzLlMgPSBbXTtcbiAgfVxuICAvLyBBcmNmb3VyLnByb3RvdHlwZS5pbml0ID0gQVJDNGluaXQ7XG4gIC8vIEluaXRpYWxpemUgYXJjZm91ciBjb250ZXh0IGZyb20ga2V5LCBhbiBhcnJheSBvZiBpbnRzLCBlYWNoIGZyb20gWzAuLjI1NV1cbiAgQXJjZm91ci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICB2YXIgdDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgIHRoaXMuU1tpXSA9IGk7XG4gICAgfVxuICAgIGogPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgaiA9IGogKyB0aGlzLlNbaV0gKyBrZXlbaSAlIGtleS5sZW5ndGhdICYgMjU1O1xuICAgICAgdCA9IHRoaXMuU1tpXTtcbiAgICAgIHRoaXMuU1tpXSA9IHRoaXMuU1tqXTtcbiAgICAgIHRoaXMuU1tqXSA9IHQ7XG4gICAgfVxuICAgIHRoaXMuaSA9IDA7XG4gICAgdGhpcy5qID0gMDtcbiAgfTtcbiAgLy8gQXJjZm91ci5wcm90b3R5cGUubmV4dCA9IEFSQzRuZXh0O1xuICBBcmNmb3VyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0O1xuICAgIHRoaXMuaSA9IHRoaXMuaSArIDEgJiAyNTU7XG4gICAgdGhpcy5qID0gdGhpcy5qICsgdGhpcy5TW3RoaXMuaV0gJiAyNTU7XG4gICAgdCA9IHRoaXMuU1t0aGlzLmldO1xuICAgIHRoaXMuU1t0aGlzLmldID0gdGhpcy5TW3RoaXMual07XG4gICAgdGhpcy5TW3RoaXMual0gPSB0O1xuICAgIHJldHVybiB0aGlzLlNbdCArIHRoaXMuU1t0aGlzLmldICYgMjU1XTtcbiAgfTtcbiAgcmV0dXJuIEFyY2ZvdXI7XG59KCk7XG4vLyBQbHVnIGluIHlvdXIgUk5HIGNvbnN0cnVjdG9yIGhlcmVcbmZ1bmN0aW9uIHBybmdfbmV3c3RhdGUoKSB7XG4gIHJldHVybiBuZXcgQXJjZm91cigpO1xufVxuLy8gUG9vbCBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0IGFuZCBncmVhdGVyIHRoYW4gMzIuXG4vLyBBbiBhcnJheSBvZiBieXRlcyB0aGUgc2l6ZSBvZiB0aGUgcG9vbCB3aWxsIGJlIHBhc3NlZCB0byBpbml0KClcbnZhciBybmdfcHNpemUgPSBleHBvcnRzLnJuZ19wc2l6ZSA9IDI1NjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU2VjdXJlUmFuZG9tID0gdm9pZCAwO1xudmFyIF9wcm5nID0gcmVxdWlyZShcIi4vcHJuZzRcIik7XG4vLyBSYW5kb20gbnVtYmVyIGdlbmVyYXRvciAtIHJlcXVpcmVzIGEgUFJORyBiYWNrZW5kLCBlLmcuIHBybmc0LmpzXG5cbnZhciBybmdfc3RhdGU7XG52YXIgcm5nX3Bvb2wgPSBudWxsO1xudmFyIHJuZ19wcHRyO1xuLy8gSW5pdGlhbGl6ZSB0aGUgcG9vbCB3aXRoIGp1bmsgaWYgbmVlZGVkLlxuaWYgKHJuZ19wb29sID09IG51bGwpIHtcbiAgcm5nX3Bvb2wgPSBbXTtcbiAgcm5nX3BwdHIgPSAwO1xuICB2YXIgdCA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8gJiYgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBFeHRyYWN0IGVudHJvcHkgKDIwNDggYml0cykgZnJvbSBSTkcgaWYgYXZhaWxhYmxlXG4gICAgdmFyIHogPSBuZXcgVWludDMyQXJyYXkoMjU2KTtcbiAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh6KTtcbiAgICBmb3IgKHQgPSAwOyB0IDwgei5sZW5ndGg7ICsrdCkge1xuICAgICAgcm5nX3Bvb2xbcm5nX3BwdHIrK10gPSB6W3RdICYgMjU1O1xuICAgIH1cbiAgfVxuICAvLyBVc2UgbW91c2UgZXZlbnRzIGZvciBlbnRyb3B5LCBpZiB3ZSBkbyBub3QgaGF2ZSBlbm91Z2ggZW50cm9weSBieSB0aGUgdGltZVxuICAvLyB3ZSBuZWVkIGl0LCBlbnRyb3B5IHdpbGwgYmUgZ2VuZXJhdGVkIGJ5IE1hdGgucmFuZG9tLlxuICB2YXIgY291bnQgPSAwO1xuICB2YXIgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgY291bnQgPSBjb3VudCB8fCAwO1xuICAgIGlmIChjb3VudCA+PSAyNTYgfHwgcm5nX3BwdHIgPj0gX3Bybmcucm5nX3BzaXplKSB7XG4gICAgICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5kZXRhY2hFdmVudCkge1xuICAgICAgICB3aW5kb3cuZGV0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZUxpc3RlbmVyXzEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdmFyIG1vdXNlQ29vcmRpbmF0ZXMgPSBldi54ICsgZXYueTtcbiAgICAgIHJuZ19wb29sW3JuZ19wcHRyKytdID0gbW91c2VDb29yZGluYXRlcyAmIDI1NTtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gU29tZXRpbWVzIEZpcmVmb3ggd2lsbCBkZW55IHBlcm1pc3Npb24gdG8gYWNjZXNzIGV2ZW50IHByb3BlcnRpZXMgZm9yIHNvbWUgcmVhc29uLiBJZ25vcmUuXG4gICAgfVxuICB9O1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlTGlzdGVuZXJfMSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZUxpc3RlbmVyXzEpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gcm5nX2dldF9ieXRlKCkge1xuICBpZiAocm5nX3N0YXRlID09IG51bGwpIHtcbiAgICBybmdfc3RhdGUgPSAoMCwgX3BybmcucHJuZ19uZXdzdGF0ZSkoKTtcbiAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBtYXkgbm90IGhhdmUgY29sbGVjdGVkIGVub3VnaCBlbnRyb3B5LiAgSWYgbm90LCBmYWxsIGJhY2sgdG8gTWF0aC5yYW5kb21cbiAgICB3aGlsZSAocm5nX3BwdHIgPCBfcHJuZy5ybmdfcHNpemUpIHtcbiAgICAgIHZhciByYW5kb20gPSBNYXRoLmZsb29yKDY1NTM2ICogTWF0aC5yYW5kb20oKSk7XG4gICAgICBybmdfcG9vbFtybmdfcHB0cisrXSA9IHJhbmRvbSAmIDI1NTtcbiAgICB9XG4gICAgcm5nX3N0YXRlLmluaXQocm5nX3Bvb2wpO1xuICAgIGZvciAocm5nX3BwdHIgPSAwOyBybmdfcHB0ciA8IHJuZ19wb29sLmxlbmd0aDsgKytybmdfcHB0cikge1xuICAgICAgcm5nX3Bvb2xbcm5nX3BwdHJdID0gMDtcbiAgICB9XG4gICAgcm5nX3BwdHIgPSAwO1xuICB9XG4gIC8vIFRPRE86IGFsbG93IHJlc2VlZGluZyBhZnRlciBmaXJzdCByZXF1ZXN0XG4gIHJldHVybiBybmdfc3RhdGUubmV4dCgpO1xufVxudmFyIFNlY3VyZVJhbmRvbSA9IGV4cG9ydHMuU2VjdXJlUmFuZG9tID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2VjdXJlUmFuZG9tKCkge31cbiAgU2VjdXJlUmFuZG9tLnByb3RvdHlwZS5uZXh0Qnl0ZXMgPSBmdW5jdGlvbiAoYmEpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhLmxlbmd0aDsgKytpKSB7XG4gICAgICBiYVtpXSA9IHJuZ19nZXRfYnl0ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFNlY3VyZVJhbmRvbTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUlNBS2V5ID0gdm9pZCAwO1xudmFyIF9qc2JuID0gcmVxdWlyZShcIi4vanNiblwiKTtcbnZhciBfcm5nID0gcmVxdWlyZShcIi4vcm5nXCIpO1xuLy8gRGVwZW5kcyBvbiBqc2JuLmpzIGFuZCBybmcuanNcbi8vIFZlcnNpb24gMS4xOiBzdXBwb3J0IHV0Zi04IGVuY29kaW5nIGluIHBrY3MxcGFkMlxuLy8gY29udmVydCBhIChoZXgpIHN0cmluZyB0byBhIGJpZ251bSBvYmplY3RcblxuLy8gZnVuY3Rpb24gbGluZWJyayhzLG4pIHtcbi8vICAgdmFyIHJldCA9IFwiXCI7XG4vLyAgIHZhciBpID0gMDtcbi8vICAgd2hpbGUoaSArIG4gPCBzLmxlbmd0aCkge1xuLy8gICAgIHJldCArPSBzLnN1YnN0cmluZyhpLGkrbikgKyBcIlxcblwiO1xuLy8gICAgIGkgKz0gbjtcbi8vICAgfVxuLy8gICByZXR1cm4gcmV0ICsgcy5zdWJzdHJpbmcoaSxzLmxlbmd0aCk7XG4vLyB9XG4vLyBmdW5jdGlvbiBieXRlMkhleChiKSB7XG4vLyAgIGlmKGIgPCAweDEwKVxuLy8gICAgIHJldHVybiBcIjBcIiArIGIudG9TdHJpbmcoMTYpO1xuLy8gICBlbHNlXG4vLyAgICAgcmV0dXJuIGIudG9TdHJpbmcoMTYpO1xuLy8gfVxuZnVuY3Rpb24gcGtjczFwYWQxKHMsIG4pIHtcbiAgaWYgKG4gPCBzLmxlbmd0aCArIDIyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIk1lc3NhZ2UgdG9vIGxvbmcgZm9yIFJTQVwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbGVuID0gbiAtIHMubGVuZ3RoIC0gNjtcbiAgdmFyIGZpbGxlciA9IFwiXCI7XG4gIGZvciAodmFyIGYgPSAwOyBmIDwgbGVuOyBmICs9IDIpIHtcbiAgICBmaWxsZXIgKz0gXCJmZlwiO1xuICB9XG4gIHZhciBtID0gXCIwMDAxXCIgKyBmaWxsZXIgKyBcIjAwXCIgKyBzO1xuICByZXR1cm4gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShtLCAxNik7XG59XG4vLyBQS0NTIzEgKHR5cGUgMiwgcmFuZG9tKSBwYWQgaW5wdXQgc3RyaW5nIHMgdG8gbiBieXRlcywgYW5kIHJldHVybiBhIGJpZ2ludFxuZnVuY3Rpb24gcGtjczFwYWQyKHMsIG4pIHtcbiAgaWYgKG4gPCBzLmxlbmd0aCArIDExKSB7XG4gICAgLy8gVE9ETzogZml4IGZvciB1dGYtOFxuICAgIGNvbnNvbGUuZXJyb3IoXCJNZXNzYWdlIHRvbyBsb25nIGZvciBSU0FcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGJhID0gW107XG4gIHZhciBpID0gcy5sZW5ndGggLSAxO1xuICB3aGlsZSAoaSA+PSAwICYmIG4gPiAwKSB7XG4gICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoaS0tKTtcbiAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgLy8gZW5jb2RlIHVzaW5nIHV0Zi04XG4gICAgICBiYVstLW5dID0gYztcbiAgICB9IGVsc2UgaWYgKGMgPiAxMjcgJiYgYyA8IDIwNDgpIHtcbiAgICAgIGJhWy0tbl0gPSBjICYgNjMgfCAxMjg7XG4gICAgICBiYVstLW5dID0gYyA+PiA2IHwgMTkyO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYVstLW5dID0gYyAmIDYzIHwgMTI4O1xuICAgICAgYmFbLS1uXSA9IGMgPj4gNiAmIDYzIHwgMTI4O1xuICAgICAgYmFbLS1uXSA9IGMgPj4gMTIgfCAyMjQ7XG4gICAgfVxuICB9XG4gIGJhWy0tbl0gPSAwO1xuICB2YXIgcm5nID0gbmV3IF9ybmcuU2VjdXJlUmFuZG9tKCk7XG4gIHZhciB4ID0gW107XG4gIHdoaWxlIChuID4gMikge1xuICAgIC8vIHJhbmRvbSBub24temVybyBwYWRcbiAgICB4WzBdID0gMDtcbiAgICB3aGlsZSAoeFswXSA9PSAwKSB7XG4gICAgICBybmcubmV4dEJ5dGVzKHgpO1xuICAgIH1cbiAgICBiYVstLW5dID0geFswXTtcbiAgfVxuICBiYVstLW5dID0gMjtcbiAgYmFbLS1uXSA9IDA7XG4gIHJldHVybiBuZXcgX2pzYm4uQmlnSW50ZWdlcihiYSk7XG59XG4vLyBcImVtcHR5XCIgUlNBIGtleSBjb25zdHJ1Y3RvclxudmFyIFJTQUtleSA9IGV4cG9ydHMuUlNBS2V5ID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUlNBS2V5KCkge1xuICAgIHRoaXMubiA9IG51bGw7XG4gICAgdGhpcy5lID0gMDtcbiAgICB0aGlzLmQgPSBudWxsO1xuICAgIHRoaXMucCA9IG51bGw7XG4gICAgdGhpcy5xID0gbnVsbDtcbiAgICB0aGlzLmRtcDEgPSBudWxsO1xuICAgIHRoaXMuZG1xMSA9IG51bGw7XG4gICAgdGhpcy5jb2VmZiA9IG51bGw7XG4gIH1cbiAgLy8jcmVnaW9uIFBST1RFQ1RFRFxuICAvLyBwcm90ZWN0ZWRcbiAgLy8gUlNBS2V5LnByb3RvdHlwZS5kb1B1YmxpYyA9IFJTQURvUHVibGljO1xuICAvLyBQZXJmb3JtIHJhdyBwdWJsaWMgb3BlcmF0aW9uIG9uIFwieFwiOiByZXR1cm4geF5lIChtb2QgbilcbiAgUlNBS2V5LnByb3RvdHlwZS5kb1B1YmxpYyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHgubW9kUG93SW50KHRoaXMuZSwgdGhpcy5uKTtcbiAgfTtcbiAgLy8gUlNBS2V5LnByb3RvdHlwZS5kb1ByaXZhdGUgPSBSU0FEb1ByaXZhdGU7XG4gIC8vIFBlcmZvcm0gcmF3IHByaXZhdGUgb3BlcmF0aW9uIG9uIFwieFwiOiByZXR1cm4geF5kIChtb2QgbilcbiAgUlNBS2V5LnByb3RvdHlwZS5kb1ByaXZhdGUgPSBmdW5jdGlvbiAoeCkge1xuICAgIGlmICh0aGlzLnAgPT0gbnVsbCB8fCB0aGlzLnEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHgubW9kUG93KHRoaXMuZCwgdGhpcy5uKTtcbiAgICB9XG4gICAgLy8gVE9ETzogcmUtY2FsY3VsYXRlIGFueSBtaXNzaW5nIENSVCBwYXJhbXNcbiAgICB2YXIgeHAgPSB4Lm1vZCh0aGlzLnApLm1vZFBvdyh0aGlzLmRtcDEsIHRoaXMucCk7XG4gICAgdmFyIHhxID0geC5tb2QodGhpcy5xKS5tb2RQb3codGhpcy5kbXExLCB0aGlzLnEpO1xuICAgIHdoaWxlICh4cC5jb21wYXJlVG8oeHEpIDwgMCkge1xuICAgICAgeHAgPSB4cC5hZGQodGhpcy5wKTtcbiAgICB9XG4gICAgcmV0dXJuIHhwLnN1YnRyYWN0KHhxKS5tdWx0aXBseSh0aGlzLmNvZWZmKS5tb2QodGhpcy5wKS5tdWx0aXBseSh0aGlzLnEpLmFkZCh4cSk7XG4gIH07XG4gIC8vI2VuZHJlZ2lvbiBQUk9URUNURURcbiAgLy8jcmVnaW9uIFBVQkxJQ1xuICAvLyBSU0FLZXkucHJvdG90eXBlLnNldFB1YmxpYyA9IFJTQVNldFB1YmxpYztcbiAgLy8gU2V0IHRoZSBwdWJsaWMga2V5IGZpZWxkcyBOIGFuZCBlIGZyb20gaGV4IHN0cmluZ3NcbiAgUlNBS2V5LnByb3RvdHlwZS5zZXRQdWJsaWMgPSBmdW5jdGlvbiAoTiwgRSkge1xuICAgIGlmIChOICE9IG51bGwgJiYgRSAhPSBudWxsICYmIE4ubGVuZ3RoID4gMCAmJiBFLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubiA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoTiwgMTYpO1xuICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBSU0EgcHVibGljIGtleVwiKTtcbiAgICB9XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuZW5jcnlwdCA9IFJTQUVuY3J5cHQ7XG4gIC8vIFJldHVybiB0aGUgUEtDUyMxIFJTQSBlbmNyeXB0aW9uIG9mIFwidGV4dFwiIGFzIGFuIGV2ZW4tbGVuZ3RoIGhleCBzdHJpbmdcbiAgUlNBS2V5LnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICB2YXIgbWF4TGVuZ3RoID0gdGhpcy5uLmJpdExlbmd0aCgpICsgNyA+PiAzO1xuICAgIHZhciBtID0gcGtjczFwYWQyKHRleHQsIG1heExlbmd0aCk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBjID0gdGhpcy5kb1B1YmxpYyhtKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICB2YXIgbGVuZ3RoID0gaC5sZW5ndGg7XG4gICAgLy8gZml4IHplcm8gYmVmb3JlIHJlc3VsdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4TGVuZ3RoICogMiAtIGxlbmd0aDsgaSsrKSB7XG4gICAgICBoID0gXCIwXCIgKyBoO1xuICAgIH1cbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgLy8gUlNBS2V5LnByb3RvdHlwZS5zZXRQcml2YXRlID0gUlNBU2V0UHJpdmF0ZTtcbiAgLy8gU2V0IHRoZSBwcml2YXRlIGtleSBmaWVsZHMgTiwgZSwgYW5kIGQgZnJvbSBoZXggc3RyaW5nc1xuICBSU0FLZXkucHJvdG90eXBlLnNldFByaXZhdGUgPSBmdW5jdGlvbiAoTiwgRSwgRCkge1xuICAgIGlmIChOICE9IG51bGwgJiYgRSAhPSBudWxsICYmIE4ubGVuZ3RoID4gMCAmJiBFLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubiA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoTiwgMTYpO1xuICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xuICAgICAgdGhpcy5kID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShELCAxNik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIFJTQSBwcml2YXRlIGtleVwiKTtcbiAgICB9XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuc2V0UHJpdmF0ZUV4ID0gUlNBU2V0UHJpdmF0ZUV4O1xuICAvLyBTZXQgdGhlIHByaXZhdGUga2V5IGZpZWxkcyBOLCBlLCBkIGFuZCBDUlQgcGFyYW1zIGZyb20gaGV4IHN0cmluZ3NcbiAgUlNBS2V5LnByb3RvdHlwZS5zZXRQcml2YXRlRXggPSBmdW5jdGlvbiAoTiwgRSwgRCwgUCwgUSwgRFAsIERRLCBDKSB7XG4gICAgaWYgKE4gIT0gbnVsbCAmJiBFICE9IG51bGwgJiYgTi5sZW5ndGggPiAwICYmIEUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5uID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShOLCAxNik7XG4gICAgICB0aGlzLmUgPSBwYXJzZUludChFLCAxNik7XG4gICAgICB0aGlzLmQgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKEQsIDE2KTtcbiAgICAgIHRoaXMucCA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoUCwgMTYpO1xuICAgICAgdGhpcy5xID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShRLCAxNik7XG4gICAgICB0aGlzLmRtcDEgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKERQLCAxNik7XG4gICAgICB0aGlzLmRtcTEgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKERRLCAxNik7XG4gICAgICB0aGlzLmNvZWZmID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShDLCAxNik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIFJTQSBwcml2YXRlIGtleVwiKTtcbiAgICB9XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuZ2VuZXJhdGUgPSBSU0FHZW5lcmF0ZTtcbiAgLy8gR2VuZXJhdGUgYSBuZXcgcmFuZG9tIHByaXZhdGUga2V5IEIgYml0cyBsb25nLCB1c2luZyBwdWJsaWMgZXhwdCBFXG4gIFJTQUtleS5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoQiwgRSkge1xuICAgIHZhciBybmcgPSBuZXcgX3JuZy5TZWN1cmVSYW5kb20oKTtcbiAgICB2YXIgcXMgPSBCID4+IDE7XG4gICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xuICAgIHZhciBlZSA9IG5ldyBfanNibi5CaWdJbnRlZ2VyKEUsIDE2KTtcbiAgICBmb3IgKDs7KSB7XG4gICAgICBmb3IgKDs7KSB7XG4gICAgICAgIHRoaXMucCA9IG5ldyBfanNibi5CaWdJbnRlZ2VyKEIgLSBxcywgMSwgcm5nKTtcbiAgICAgICAgaWYgKHRoaXMucC5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSkuZ2NkKGVlKS5jb21wYXJlVG8oX2pzYm4uQmlnSW50ZWdlci5PTkUpID09IDAgJiYgdGhpcy5wLmlzUHJvYmFibGVQcmltZSgxMCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICg7Oykge1xuICAgICAgICB0aGlzLnEgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihxcywgMSwgcm5nKTtcbiAgICAgICAgaWYgKHRoaXMucS5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSkuZ2NkKGVlKS5jb21wYXJlVG8oX2pzYm4uQmlnSW50ZWdlci5PTkUpID09IDAgJiYgdGhpcy5xLmlzUHJvYmFibGVQcmltZSgxMCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMucC5jb21wYXJlVG8odGhpcy5xKSA8PSAwKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5wO1xuICAgICAgICB0aGlzLnAgPSB0aGlzLnE7XG4gICAgICAgIHRoaXMucSA9IHQ7XG4gICAgICB9XG4gICAgICB2YXIgcDEgPSB0aGlzLnAuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpO1xuICAgICAgdmFyIHExID0gdGhpcy5xLnN1YnRyYWN0KF9qc2JuLkJpZ0ludGVnZXIuT05FKTtcbiAgICAgIHZhciBwaGkgPSBwMS5tdWx0aXBseShxMSk7XG4gICAgICBpZiAocGhpLmdjZChlZSkuY29tcGFyZVRvKF9qc2JuLkJpZ0ludGVnZXIuT05FKSA9PSAwKSB7XG4gICAgICAgIHRoaXMubiA9IHRoaXMucC5tdWx0aXBseSh0aGlzLnEpO1xuICAgICAgICB0aGlzLmQgPSBlZS5tb2RJbnZlcnNlKHBoaSk7XG4gICAgICAgIHRoaXMuZG1wMSA9IHRoaXMuZC5tb2QocDEpO1xuICAgICAgICB0aGlzLmRtcTEgPSB0aGlzLmQubW9kKHExKTtcbiAgICAgICAgdGhpcy5jb2VmZiA9IHRoaXMucS5tb2RJbnZlcnNlKHRoaXMucCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLy8gUlNBS2V5LnByb3RvdHlwZS5kZWNyeXB0ID0gUlNBRGVjcnlwdDtcbiAgLy8gUmV0dXJuIHRoZSBQS0NTIzEgUlNBIGRlY3J5cHRpb24gb2YgXCJjdGV4dFwiLlxuICAvLyBcImN0ZXh0XCIgaXMgYW4gZXZlbi1sZW5ndGggaGV4IHN0cmluZyBhbmQgdGhlIG91dHB1dCBpcyBhIHBsYWluIHN0cmluZy5cbiAgUlNBS2V5LnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24gKGN0ZXh0KSB7XG4gICAgdmFyIGMgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKGN0ZXh0LCAxNik7XG4gICAgdmFyIG0gPSB0aGlzLmRvUHJpdmF0ZShjKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHBrY3MxdW5wYWQyKG0sIHRoaXMubi5iaXRMZW5ndGgoKSArIDcgPj4gMyk7XG4gIH07XG4gIC8vIEdlbmVyYXRlIGEgbmV3IHJhbmRvbSBwcml2YXRlIGtleSBCIGJpdHMgbG9uZywgdXNpbmcgcHVibGljIGV4cHQgRVxuICBSU0FLZXkucHJvdG90eXBlLmdlbmVyYXRlQXN5bmMgPSBmdW5jdGlvbiAoQiwgRSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcm5nID0gbmV3IF9ybmcuU2VjdXJlUmFuZG9tKCk7XG4gICAgdmFyIHFzID0gQiA+PiAxO1xuICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcbiAgICB2YXIgZWUgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihFLCAxNik7XG4gICAgdmFyIHJzYSA9IHRoaXM7XG4gICAgLy8gVGhlc2UgZnVuY3Rpb25zIGhhdmUgbm9uLWRlc2NyaXB0IG5hbWVzIGJlY2F1c2UgdGhleSB3ZXJlIG9yaWdpbmFsbHkgZm9yKDs7KSBsb29wcy5cbiAgICAvLyBJIGRvbid0IGtub3cgYWJvdXQgY3J5cHRvZ3JhcGh5IHRvIGdpdmUgdGhlbSBiZXR0ZXIgbmFtZXMgdGhhbiBsb29wMS00LlxuICAgIHZhciBsb29wMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsb29wNCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJzYS5wLmNvbXBhcmVUbyhyc2EucSkgPD0gMCkge1xuICAgICAgICAgIHZhciB0ID0gcnNhLnA7XG4gICAgICAgICAgcnNhLnAgPSByc2EucTtcbiAgICAgICAgICByc2EucSA9IHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAxID0gcnNhLnAuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpO1xuICAgICAgICB2YXIgcTEgPSByc2EucS5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSk7XG4gICAgICAgIHZhciBwaGkgPSBwMS5tdWx0aXBseShxMSk7XG4gICAgICAgIGlmIChwaGkuZ2NkKGVlKS5jb21wYXJlVG8oX2pzYm4uQmlnSW50ZWdlci5PTkUpID09IDApIHtcbiAgICAgICAgICByc2EubiA9IHJzYS5wLm11bHRpcGx5KHJzYS5xKTtcbiAgICAgICAgICByc2EuZCA9IGVlLm1vZEludmVyc2UocGhpKTtcbiAgICAgICAgICByc2EuZG1wMSA9IHJzYS5kLm1vZChwMSk7XG4gICAgICAgICAgcnNhLmRtcTEgPSByc2EuZC5tb2QocTEpO1xuICAgICAgICAgIHJzYS5jb2VmZiA9IHJzYS5xLm1vZEludmVyc2UocnNhLnApO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9LCAwKTsgLy8gZXNjYXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dChsb29wMSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgbG9vcDMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJzYS5xID0gKDAsIF9qc2JuLm5iaSkoKTtcbiAgICAgICAgcnNhLnEuZnJvbU51bWJlckFzeW5jKHFzLCAxLCBybmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByc2EucS5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSkuZ2NkYShlZSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGlmIChyLmNvbXBhcmVUbyhfanNibi5CaWdJbnRlZ2VyLk9ORSkgPT0gMCAmJiByc2EucS5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDQsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChsb29wMywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBsb29wMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcnNhLnAgPSAoMCwgX2pzYm4ubmJpKSgpO1xuICAgICAgICByc2EucC5mcm9tTnVtYmVyQXN5bmMoQiAtIHFzLCAxLCBybmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByc2EucC5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSkuZ2NkYShlZSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGlmIChyLmNvbXBhcmVUbyhfanNibi5CaWdJbnRlZ2VyLk9ORSkgPT0gMCAmJiByc2EucC5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDMsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChsb29wMiwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHNldFRpbWVvdXQobG9vcDIsIDApO1xuICAgIH07XG4gICAgc2V0VGltZW91dChsb29wMSwgMCk7XG4gIH07XG4gIFJTQUtleS5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uICh0ZXh0LCBkaWdlc3RNZXRob2QsIGRpZ2VzdE5hbWUpIHtcbiAgICB2YXIgaGVhZGVyID0gZ2V0RGlnZXN0SGVhZGVyKGRpZ2VzdE5hbWUpO1xuICAgIHZhciBkaWdlc3QgPSBoZWFkZXIgKyBkaWdlc3RNZXRob2QodGV4dCkudG9TdHJpbmcoKTtcbiAgICB2YXIgbSA9IHBrY3MxcGFkMShkaWdlc3QsIHRoaXMubi5iaXRMZW5ndGgoKSAvIDQpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgYyA9IHRoaXMuZG9Qcml2YXRlKG0pO1xuICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgaCA9IGMudG9TdHJpbmcoMTYpO1xuICAgIGlmICgoaC5sZW5ndGggJiAxKSA9PSAwKSB7XG4gICAgICByZXR1cm4gaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiMFwiICsgaDtcbiAgICB9XG4gIH07XG4gIFJTQUtleS5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gKHRleHQsIHNpZ25hdHVyZSwgZGlnZXN0TWV0aG9kKSB7XG4gICAgdmFyIGMgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKHNpZ25hdHVyZSwgMTYpO1xuICAgIHZhciBtID0gdGhpcy5kb1B1YmxpYyhjKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHVucGFkZGVkID0gbS50b1N0cmluZygxNikucmVwbGFjZSgvXjFmKzAwLywgXCJcIik7XG4gICAgdmFyIGRpZ2VzdCA9IHJlbW92ZURpZ2VzdEhlYWRlcih1bnBhZGRlZCk7XG4gICAgcmV0dXJuIGRpZ2VzdCA9PSBkaWdlc3RNZXRob2QodGV4dCkudG9TdHJpbmcoKTtcbiAgfTtcbiAgcmV0dXJuIFJTQUtleTtcbn0oKTtcbi8vIFVuZG8gUEtDUyMxICh0eXBlIDIsIHJhbmRvbSkgcGFkZGluZyBhbmQsIGlmIHZhbGlkLCByZXR1cm4gdGhlIHBsYWludGV4dFxuZnVuY3Rpb24gcGtjczF1bnBhZDIoZCwgbikge1xuICB2YXIgYiA9IGQudG9CeXRlQXJyYXkoKTtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSA8IGIubGVuZ3RoICYmIGJbaV0gPT0gMCkge1xuICAgICsraTtcbiAgfVxuICBpZiAoYi5sZW5ndGggLSBpICE9IG4gLSAxIHx8IGJbaV0gIT0gMikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gICsraTtcbiAgd2hpbGUgKGJbaV0gIT0gMCkge1xuICAgIGlmICgrK2kgPj0gYi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICB2YXIgcmV0ID0gXCJcIjtcbiAgd2hpbGUgKCsraSA8IGIubGVuZ3RoKSB7XG4gICAgdmFyIGMgPSBiW2ldICYgMjU1O1xuICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAvLyB1dGYtOCBkZWNvZGVcbiAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgIH0gZWxzZSBpZiAoYyA+IDE5MSAmJiBjIDwgMjI0KSB7XG4gICAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDMxKSA8PCA2IHwgYltpICsgMV0gJiA2Myk7XG4gICAgICArK2k7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMTUpIDw8IDEyIHwgKGJbaSArIDFdICYgNjMpIDw8IDYgfCBiW2kgKyAyXSAmIDYzKTtcbiAgICAgIGkgKz0gMjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDQ3I3BhZ2UtNDNcbnZhciBESUdFU1RfSEVBREVSUyA9IHtcbiAgbWQyOiBcIjMwMjAzMDBjMDYwODJhODY0ODg2ZjcwZDAyMDIwNTAwMDQxMFwiLFxuICBtZDU6IFwiMzAyMDMwMGMwNjA4MmE4NjQ4ODZmNzBkMDIwNTA1MDAwNDEwXCIsXG4gIHNoYTE6IFwiMzAyMTMwMDkwNjA1MmIwZTAzMDIxYTA1MDAwNDE0XCIsXG4gIHNoYTIyNDogXCIzMDJkMzAwZDA2MDk2MDg2NDgwMTY1MDMwNDAyMDQwNTAwMDQxY1wiLFxuICBzaGEyNTY6IFwiMzAzMTMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjAxMDUwMDA0MjBcIixcbiAgc2hhMzg0OiBcIjMwNDEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMjA1MDAwNDMwXCIsXG4gIHNoYTUxMjogXCIzMDUxMzAwZDA2MDk2MDg2NDgwMTY1MDMwNDAyMDMwNTAwMDQ0MFwiLFxuICByaXBlbWQxNjA6IFwiMzAyMTMwMDkwNjA1MmIyNDAzMDIwMTA1MDAwNDE0XCJcbn07XG5mdW5jdGlvbiBnZXREaWdlc3RIZWFkZXIobmFtZSkge1xuICByZXR1cm4gRElHRVNUX0hFQURFUlNbbmFtZV0gfHwgXCJcIjtcbn1cbmZ1bmN0aW9uIHJlbW92ZURpZ2VzdEhlYWRlcihzdHIpIHtcbiAgZm9yICh2YXIgbmFtZV8xIGluIERJR0VTVF9IRUFERVJTKSB7XG4gICAgaWYgKERJR0VTVF9IRUFERVJTLmhhc093blByb3BlcnR5KG5hbWVfMSkpIHtcbiAgICAgIHZhciBoZWFkZXIgPSBESUdFU1RfSEVBREVSU1tuYW1lXzFdO1xuICAgICAgdmFyIGxlbiA9IGhlYWRlci5sZW5ndGg7XG4gICAgICBpZiAoc3RyLnN1YnN0cigwLCBsZW4pID09IGhlYWRlcikge1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihsZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufVxuLy8gUmV0dXJuIHRoZSBQS0NTIzEgUlNBIGVuY3J5cHRpb24gb2YgXCJ0ZXh0XCIgYXMgYSBCYXNlNjQtZW5jb2RlZCBzdHJpbmdcbi8vIGZ1bmN0aW9uIFJTQUVuY3J5cHRCNjQodGV4dCkge1xuLy8gIHZhciBoID0gdGhpcy5lbmNyeXB0KHRleHQpO1xuLy8gIGlmKGgpIHJldHVybiBoZXgyYjY0KGgpOyBlbHNlIHJldHVybiBudWxsO1xuLy8gfVxuLy8gcHVibGljXG4vLyBSU0FLZXkucHJvdG90eXBlLmVuY3J5cHRfYjY0ID0gUlNBRW5jcnlwdEI2NDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2JpdCA9IGNiaXQ7XG5leHBvcnRzLmludDJjaGFyID0gaW50MmNoYXI7XG5leHBvcnRzLmxiaXQgPSBsYml0O1xuZXhwb3J0cy5vcF9hbmQgPSBvcF9hbmQ7XG5leHBvcnRzLm9wX2FuZG5vdCA9IG9wX2FuZG5vdDtcbmV4cG9ydHMub3Bfb3IgPSBvcF9vcjtcbmV4cG9ydHMub3BfeG9yID0gb3BfeG9yO1xudmFyIEJJX1JNID0gXCIwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcbmZ1bmN0aW9uIGludDJjaGFyKG4pIHtcbiAgcmV0dXJuIEJJX1JNLmNoYXJBdChuKTtcbn1cbi8vI3JlZ2lvbiBCSVRfT1BFUkFUSU9OU1xuLy8gKHB1YmxpYykgdGhpcyAmIGFcbmZ1bmN0aW9uIG9wX2FuZCh4LCB5KSB7XG4gIHJldHVybiB4ICYgeTtcbn1cbi8vIChwdWJsaWMpIHRoaXMgfCBhXG5mdW5jdGlvbiBvcF9vcih4LCB5KSB7XG4gIHJldHVybiB4IHwgeTtcbn1cbi8vIChwdWJsaWMpIHRoaXMgXiBhXG5mdW5jdGlvbiBvcF94b3IoeCwgeSkge1xuICByZXR1cm4geCBeIHk7XG59XG4vLyAocHVibGljKSB0aGlzICYgfmFcbmZ1bmN0aW9uIG9wX2FuZG5vdCh4LCB5KSB7XG4gIHJldHVybiB4ICYgfnk7XG59XG4vLyByZXR1cm4gaW5kZXggb2YgbG93ZXN0IDEtYml0IGluIHgsIHggPCAyXjMxXG5mdW5jdGlvbiBsYml0KHgpIHtcbiAgaWYgKHggPT0gMCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICB2YXIgciA9IDA7XG4gIGlmICgoeCAmIDB4ZmZmZikgPT0gMCkge1xuICAgIHggPj49IDE2O1xuICAgIHIgKz0gMTY7XG4gIH1cbiAgaWYgKCh4ICYgMHhmZikgPT0gMCkge1xuICAgIHggPj49IDg7XG4gICAgciArPSA4O1xuICB9XG4gIGlmICgoeCAmIDB4ZikgPT0gMCkge1xuICAgIHggPj49IDQ7XG4gICAgciArPSA0O1xuICB9XG4gIGlmICgoeCAmIDMpID09IDApIHtcbiAgICB4ID4+PSAyO1xuICAgIHIgKz0gMjtcbiAgfVxuICBpZiAoKHggJiAxKSA9PSAwKSB7XG4gICAgKytyO1xuICB9XG4gIHJldHVybiByO1xufVxuLy8gcmV0dXJuIG51bWJlciBvZiAxIGJpdHMgaW4geFxuZnVuY3Rpb24gY2JpdCh4KSB7XG4gIHZhciByID0gMDtcbiAgd2hpbGUgKHggIT0gMCkge1xuICAgIHggJj0geCAtIDE7XG4gICAgKytyO1xuICB9XG4gIHJldHVybiByO1xufVxuLy8jZW5kcmVnaW9uIEJJVF9PUEVSQVRJT05TIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLktKVVIgPSB2b2lkIDA7XG52YXIgX2pzYm4gPSByZXF1aXJlKFwiLi4vanNibi9qc2JuXCIpO1xudmFyIF95YWhvbyA9IHJlcXVpcmUoXCIuL3lhaG9vXCIpO1xuLyogYXNuMS0xLjAuMTMuanMgKGMpIDIwMTMtMjAxNyBLZW5qaSBVcnVzaGltYSB8IGtqdXIuZ2l0aHViLmNvbS9qc3JzYXNpZ24vbGljZW5zZVxuICovXG4vKlxuICogYXNuMS5qcyAtIEFTTi4xIERFUiBlbmNvZGVyIGNsYXNzZXNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNyBLZW5qaSBVcnVzaGltYSAoa2VuamkudXJ1c2hpbWFAZ21haWwuY29tKVxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8va2p1ci5naXRodWIuaW8vanNyc2FzaWduL2xpY2Vuc2VcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IGFuZCBsaWNlbnNlIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKi9cblxuLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBAbmFtZSBhc24xLTEuMC5qc1xuICogQGF1dGhvciBLZW5qaSBVcnVzaGltYSBrZW5qaS51cnVzaGltYUBnbWFpbC5jb21cbiAqIEB2ZXJzaW9uIGFzbjEgMS4wLjEzICgyMDE3LUp1bi0wMilcbiAqIEBzaW5jZSBqc3JzYXNpZ24gMi4xXG4gKiBAbGljZW5zZSA8YSBocmVmPVwiaHR0cHM6Ly9ranVyLmdpdGh1Yi5pby9qc3JzYXNpZ24vbGljZW5zZS9cIj5NSVQgTGljZW5zZTwvYT5cbiAqL1xuLyoqXG4gKiBranVyJ3MgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXG4gKiA8cD5cbiAqIFRoaXMgbmFtZSBzcGFjZSBwcm92aWRlcyBmb2xsb3dpbmcgbmFtZSBzcGFjZXM6XG4gKiA8dWw+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMX0gLSBBU04uMSBwcmltaXRpdmUgaGV4YWRlY2ltYWwgZW5jb2RlcjwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS54NTA5fSAtIEFTTi4xIHN0cnVjdHVyZSBmb3IgWC41MDkgY2VydGlmaWNhdGUgYW5kIENSTDwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuY3J5cHRvfSAtIEphdmEgQ3J5cHRvZ3JhcGhpYyBFeHRlbnNpb24oSkNFKSBzdHlsZSBNZXNzYWdlRGlnZXN0L1NpZ25hdHVyZVxuICogY2xhc3MgYW5kIHV0aWxpdGllczwvbGk+XG4gKiA8L3VsPlxuICogPC9wPlxuICogTk9URTogUGxlYXNlIGlnbm9yZSBtZXRob2Qgc3VtbWFyeSBhbmQgZG9jdW1lbnQgb2YgdGhpcyBuYW1lc3BhY2UuIFRoaXMgY2F1c2VkIGJ5IGEgYnVnIG9mIGpzZG9jMi5cbiAqIEBuYW1lIEtKVVJcbiAqIEBuYW1lc3BhY2Uga2p1cidzIGNsYXNzIGxpYnJhcnkgbmFtZSBzcGFjZVxuICovXG52YXIgS0pVUiA9IGV4cG9ydHMuS0pVUiA9IHt9O1xuLyoqXG4gKiBranVyJ3MgQVNOLjEgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXG4gKiA8cD5cbiAqIFRoaXMgaXMgSVRVLVQgWC42OTAgQVNOLjEgREVSIGVuY29kZXIgY2xhc3MgbGlicmFyeSBhbmRcbiAqIGNsYXNzIHN0cnVjdHVyZSBhbmQgbWV0aG9kcyBpcyB2ZXJ5IHNpbWlsYXIgdG9cbiAqIG9yZy5ib3VuY3ljYXN0bGUuYXNuMSBwYWNrYWdlIG9mXG4gKiB3ZWxsIGtub3duIEJvdW5jeUNhc2x0ZSBDcnlwdG9ncmFwaHkgTGlicmFyeS5cbiAqIDxoND5QUk9WSURJTkcgQVNOLjEgUFJJTUlUSVZFUzwvaDQ+XG4gKiBIZXJlIGFyZSBBU04uMSBERVIgcHJpbWl0aXZlIGNsYXNzZXMuXG4gKiA8dWw+XG4gKiA8bGk+MHgwMSB7QGxpbmsgS0pVUi5hc24xLkRFUkJvb2xlYW59PC9saT5cbiAqIDxsaT4weDAyIHtAbGluayBLSlVSLmFzbjEuREVSSW50ZWdlcn08L2xpPlxuICogPGxpPjB4MDMge0BsaW5rIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmd9PC9saT5cbiAqIDxsaT4weDA0IHtAbGluayBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmd9PC9saT5cbiAqIDxsaT4weDA1IHtAbGluayBLSlVSLmFzbjEuREVSTnVsbH08L2xpPlxuICogPGxpPjB4MDYge0BsaW5rIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyfTwvbGk+XG4gKiA8bGk+MHgwYSB7QGxpbmsgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWR9PC9saT5cbiAqIDxsaT4weDBjIHtAbGluayBLSlVSLmFzbjEuREVSVVRGOFN0cmluZ308L2xpPlxuICogPGxpPjB4MTIge0BsaW5rIEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nfTwvbGk+XG4gKiA8bGk+MHgxMyB7QGxpbmsgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZ308L2xpPlxuICogPGxpPjB4MTQge0BsaW5rIEtKVVIuYXNuMS5ERVJUZWxldGV4U3RyaW5nfTwvbGk+XG4gKiA8bGk+MHgxNiB7QGxpbmsgS0pVUi5hc24xLkRFUklBNVN0cmluZ308L2xpPlxuICogPGxpPjB4MTcge0BsaW5rIEtKVVIuYXNuMS5ERVJVVENUaW1lfTwvbGk+XG4gKiA8bGk+MHgxOCB7QGxpbmsgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZX08L2xpPlxuICogPGxpPjB4MzAge0BsaW5rIEtKVVIuYXNuMS5ERVJTZXF1ZW5jZX08L2xpPlxuICogPGxpPjB4MzEge0BsaW5rIEtKVVIuYXNuMS5ERVJTZXR9PC9saT5cbiAqIDwvdWw+XG4gKiA8aDQ+T1RIRVIgQVNOLjEgQ0xBU1NFUzwvaDQ+XG4gKiA8dWw+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5BU04xT2JqZWN0fTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ308L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWR9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdH08L2xpPlxuICogPC91bD5cbiAqIDxoND5TVUIgTkFNRSBTUEFDRVM8L2g0PlxuICogPHVsPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuY2FkZXN9IC0gQ0FkRVMgbG9uZyB0ZXJtIHNpZ25hdHVyZSBmb3JtYXQ8L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuY21zfSAtIENyeXB0b2dyYXBoaWMgTWVzc2FnZSBTeW50YXg8L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuY3NyfSAtIENlcnRpZmljYXRlIFNpZ25pbmcgUmVxdWVzdCAoQ1NSL1BLQ1MjMTApPC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLnRzcH0gLSBSRkMgMzE2MSBUaW1lc3RhbXBpbmcgUHJvdG9jb2wgRm9ybWF0PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLng1MDl9IC0gUkZDIDUyODAgWC41MDkgY2VydGlmaWNhdGUgYW5kIENSTDwvbGk+XG4gKiA8L3VsPlxuICogPC9wPlxuICogTk9URTogUGxlYXNlIGlnbm9yZSBtZXRob2Qgc3VtbWFyeSBhbmQgZG9jdW1lbnQgb2YgdGhpcyBuYW1lc3BhY2UuXG4gKiBUaGlzIGNhdXNlZCBieSBhIGJ1ZyBvZiBqc2RvYzIuXG4gKiBAbmFtZSBLSlVSLmFzbjFcbiAqIEBuYW1lc3BhY2VcbiAqL1xuaWYgKHR5cGVvZiBLSlVSLmFzbjEgPT0gXCJ1bmRlZmluZWRcIiB8fCAhS0pVUi5hc24xKSBLSlVSLmFzbjEgPSB7fTtcbi8qKlxuICogQVNOMSB1dGlsaXRpZXMgY2xhc3NcbiAqIEBuYW1lIEtKVVIuYXNuMS5BU04xVXRpbFxuICogQGNsYXNzIEFTTjEgdXRpbGl0aWVzIGNsYXNzXG4gKiBAc2luY2UgYXNuMSAxLjAuMlxuICovXG5LSlVSLmFzbjEuQVNOMVV0aWwgPSBuZXcgZnVuY3Rpb24gKCkge1xuICB0aGlzLmludGVnZXJUb0J5dGVIZXggPSBmdW5jdGlvbiAoaSkge1xuICAgIHZhciBoID0gaS50b1N0cmluZygxNik7XG4gICAgaWYgKGgubGVuZ3RoICUgMiA9PSAxKSBoID0gJzAnICsgaDtcbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgdGhpcy5iaWdJbnRUb01pblR3b3NDb21wbGVtZW50c0hleCA9IGZ1bmN0aW9uIChiaWdJbnRlZ2VyVmFsdWUpIHtcbiAgICB2YXIgaCA9IGJpZ0ludGVnZXJWYWx1ZS50b1N0cmluZygxNik7XG4gICAgaWYgKGguc3Vic3RyKDAsIDEpICE9ICctJykge1xuICAgICAgaWYgKGgubGVuZ3RoICUgMiA9PSAxKSB7XG4gICAgICAgIGggPSAnMCcgKyBoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFoLm1hdGNoKC9eWzAtN10vKSkge1xuICAgICAgICAgIGggPSAnMDAnICsgaDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaFBvcyA9IGguc3Vic3RyKDEpO1xuICAgICAgdmFyIHhvckxlbiA9IGhQb3MubGVuZ3RoO1xuICAgICAgaWYgKHhvckxlbiAlIDIgPT0gMSkge1xuICAgICAgICB4b3JMZW4gKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaC5tYXRjaCgvXlswLTddLykpIHtcbiAgICAgICAgICB4b3JMZW4gKz0gMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGhNYXNrID0gJyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhvckxlbjsgaSsrKSB7XG4gICAgICAgIGhNYXNrICs9ICdmJztcbiAgICAgIH1cbiAgICAgIHZhciBiaU1hc2sgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihoTWFzaywgMTYpO1xuICAgICAgdmFyIGJpTmVnID0gYmlNYXNrLnhvcihiaWdJbnRlZ2VyVmFsdWUpLmFkZChfanNibi5CaWdJbnRlZ2VyLk9ORSk7XG4gICAgICBoID0gYmlOZWcudG9TdHJpbmcoMTYpLnJlcGxhY2UoL14tLywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgLyoqXG4gICAqIGdldCBQRU0gc3RyaW5nIGZyb20gaGV4YWRlY2ltYWwgZGF0YSBhbmQgaGVhZGVyIHN0cmluZ1xuICAgKiBAbmFtZSBnZXRQRU1TdHJpbmdGcm9tSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMVV0aWxcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhSGV4IGhleGFkZWNpbWFsIHN0cmluZyBvZiBQRU0gYm9keVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGVtSGVhZGVyIFBFTSBoZWFkZXIgc3RyaW5nIChleC4gJ1JTQSBQUklWQVRFIEtFWScpXG4gICAqIEByZXR1cm4ge1N0cmluZ30gUEVNIGZvcm1hdHRlZCBzdHJpbmcgb2YgaW5wdXQgZGF0YVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2QgY29udmVydHMgYSBoZXhhZGVjaW1hbCBzdHJpbmcgdG8gYSBQRU0gc3RyaW5nIHdpdGhcbiAgICogYSBzcGVjaWZpZWQgaGVhZGVyLiBJdHMgbGluZSBicmVhayB3aWxsIGJlIENSTEYoXCJcXHJcXG5cIikuXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBwZW0gID0gS0pVUi5hc24xLkFTTjFVdGlsLmdldFBFTVN0cmluZ0Zyb21IZXgoJzYxNjE2MScsICdSU0EgUFJJVkFURSBLRVknKTtcbiAgICogLy8gdmFsdWUgb2YgcGVtIHdpbGwgYmU6XG4gICAqIC0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuICAgKiBZV0ZoXG4gICAqIC0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiAgICovXG4gIHRoaXMuZ2V0UEVNU3RyaW5nRnJvbUhleCA9IGZ1bmN0aW9uIChkYXRhSGV4LCBwZW1IZWFkZXIpIHtcbiAgICByZXR1cm4gaGV4dG9wZW0oZGF0YUhleCwgcGVtSGVhZGVyKTtcbiAgfTtcbiAgLyoqXG4gICAqIGdlbmVyYXRlIEFTTjFPYmplY3Qgc3BlY2lmZWQgYnkgSlNPTiBwYXJhbWV0ZXJzXG4gICAqIEBuYW1lIG5ld09iamVjdFxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbSBKU09OIHBhcmFtZXRlciB0byBnZW5lcmF0ZSBBU04xT2JqZWN0XG4gICAqIEByZXR1cm4ge0tKVVIuYXNuMS5BU04xT2JqZWN0fSBnZW5lcmF0ZWQgb2JqZWN0XG4gICAqIEBzaW5jZSBhc24xIDEuMC4zXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBnZW5lcmF0ZSBhbnkgQVNOMU9iamVjdCBzcGVjaWZpZWQgYnkgSlNPTiBwYXJhbVxuICAgKiBpbmNsdWRpbmcgQVNOLjEgcHJpbWl0aXZlIG9yIHN0cnVjdHVyZWQuXG4gICAqIEdlbmVyYWxseSAncGFyYW0nIGNhbiBiZSBkZXNjcmliZWQgYXMgZm9sbG93czpcbiAgICogPGJsb2NrcXVvdGU+XG4gICAqIHtUWVBFLU9GLUFTTk9CSjogQVNOMU9CSi1QQVJBTUVURVJ9XG4gICAqIDwvYmxvY2txdW90ZT5cbiAgICogJ1RZUEUtT0YtQVNOMU9CSicgY2FuIGJlIG9uZSBvZiBmb2xsb3dpbmcgc3ltYm9sczpcbiAgICogPHVsPlxuICAgKiA8bGk+J2Jvb2wnIC0gREVSQm9vbGVhbjwvbGk+XG4gICAqIDxsaT4naW50JyAtIERFUkludGVnZXI8L2xpPlxuICAgKiA8bGk+J2JpdHN0cicgLSBERVJCaXRTdHJpbmc8L2xpPlxuICAgKiA8bGk+J29jdHN0cicgLSBERVJPY3RldFN0cmluZzwvbGk+XG4gICAqIDxsaT4nbnVsbCcgLSBERVJOdWxsPC9saT5cbiAgICogPGxpPidvaWQnIC0gREVST2JqZWN0SWRlbnRpZmllcjwvbGk+XG4gICAqIDxsaT4nZW51bScgLSBERVJFbnVtZXJhdGVkPC9saT5cbiAgICogPGxpPid1dGY4c3RyJyAtIERFUlVURjhTdHJpbmc8L2xpPlxuICAgKiA8bGk+J251bXN0cicgLSBERVJOdW1lcmljU3RyaW5nPC9saT5cbiAgICogPGxpPidwcm5zdHInIC0gREVSUHJpbnRhYmxlU3RyaW5nPC9saT5cbiAgICogPGxpPid0ZWxzdHInIC0gREVSVGVsZXRleFN0cmluZzwvbGk+XG4gICAqIDxsaT4naWE1c3RyJyAtIERFUklBNVN0cmluZzwvbGk+XG4gICAqIDxsaT4ndXRjdGltZScgLSBERVJVVENUaW1lPC9saT5cbiAgICogPGxpPidnZW50aW1lJyAtIERFUkdlbmVyYWxpemVkVGltZTwvbGk+XG4gICAqIDxsaT4nc2VxJyAtIERFUlNlcXVlbmNlPC9saT5cbiAgICogPGxpPidzZXQnIC0gREVSU2V0PC9saT5cbiAgICogPGxpPid0YWcnIC0gREVSVGFnZ2VkT2JqZWN0PC9saT5cbiAgICogPC91bD5cbiAgICogQGV4YW1wbGVcbiAgICogbmV3T2JqZWN0KHsncHJuc3RyJzogJ2FhYSd9KTtcbiAgICogbmV3T2JqZWN0KHsnc2VxJzogW3snaW50JzogM30sIHsncHJuc3RyJzogJ2FhYSd9XX0pXG4gICAqIC8vIEFTTi4xIFRhZ2dlZCBPYmplY3RcbiAgICogbmV3T2JqZWN0KHsndGFnJzogeyd0YWcnOiAnYTEnLFxuICAgKiAgICAgICAgICAgICAgICAgICAgJ2V4cGxpY2l0JzogdHJ1ZSxcbiAgICogICAgICAgICAgICAgICAgICAgICdvYmonOiB7J3NlcSc6IFt7J2ludCc6IDN9LCB7J3BybnN0cic6ICdhYWEnfV19fX0pO1xuICAgKiAvLyBtb3JlIHNpbXBsZSByZXByZXNlbnRhdGlvbiBvZiBBU04uMSBUYWdnZWQgT2JqZWN0XG4gICAqIG5ld09iamVjdCh7J3RhZyc6IFsnYTEnLFxuICAgKiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICogICAgICAgICAgICAgICAgICAgIHsnc2VxJzogW1xuICAgKiAgICAgICAgICAgICAgICAgICAgICB7J2ludCc6IDN9LFxuICAgKiAgICAgICAgICAgICAgICAgICAgICB7J3BybnN0cic6ICdhYWEnfV19XG4gICAqICAgICAgICAgICAgICAgICAgIF19KTtcbiAgICovXG4gIHRoaXMubmV3T2JqZWN0ID0gZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgdmFyIF9LSlVSID0gS0pVUixcbiAgICAgIF9LSlVSX2FzbjEgPSBfS0pVUi5hc24xLFxuICAgICAgX0RFUkJvb2xlYW4gPSBfS0pVUl9hc24xLkRFUkJvb2xlYW4sXG4gICAgICBfREVSSW50ZWdlciA9IF9LSlVSX2FzbjEuREVSSW50ZWdlcixcbiAgICAgIF9ERVJCaXRTdHJpbmcgPSBfS0pVUl9hc24xLkRFUkJpdFN0cmluZyxcbiAgICAgIF9ERVJPY3RldFN0cmluZyA9IF9LSlVSX2FzbjEuREVST2N0ZXRTdHJpbmcsXG4gICAgICBfREVSTnVsbCA9IF9LSlVSX2FzbjEuREVSTnVsbCxcbiAgICAgIF9ERVJPYmplY3RJZGVudGlmaWVyID0gX0tKVVJfYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyLFxuICAgICAgX0RFUkVudW1lcmF0ZWQgPSBfS0pVUl9hc24xLkRFUkVudW1lcmF0ZWQsXG4gICAgICBfREVSVVRGOFN0cmluZyA9IF9LSlVSX2FzbjEuREVSVVRGOFN0cmluZyxcbiAgICAgIF9ERVJOdW1lcmljU3RyaW5nID0gX0tKVVJfYXNuMS5ERVJOdW1lcmljU3RyaW5nLFxuICAgICAgX0RFUlByaW50YWJsZVN0cmluZyA9IF9LSlVSX2FzbjEuREVSUHJpbnRhYmxlU3RyaW5nLFxuICAgICAgX0RFUlRlbGV0ZXhTdHJpbmcgPSBfS0pVUl9hc24xLkRFUlRlbGV0ZXhTdHJpbmcsXG4gICAgICBfREVSSUE1U3RyaW5nID0gX0tKVVJfYXNuMS5ERVJJQTVTdHJpbmcsXG4gICAgICBfREVSVVRDVGltZSA9IF9LSlVSX2FzbjEuREVSVVRDVGltZSxcbiAgICAgIF9ERVJHZW5lcmFsaXplZFRpbWUgPSBfS0pVUl9hc24xLkRFUkdlbmVyYWxpemVkVGltZSxcbiAgICAgIF9ERVJTZXF1ZW5jZSA9IF9LSlVSX2FzbjEuREVSU2VxdWVuY2UsXG4gICAgICBfREVSU2V0ID0gX0tKVVJfYXNuMS5ERVJTZXQsXG4gICAgICBfREVSVGFnZ2VkT2JqZWN0ID0gX0tKVVJfYXNuMS5ERVJUYWdnZWRPYmplY3QsXG4gICAgICBfbmV3T2JqZWN0ID0gX0tKVVJfYXNuMS5BU04xVXRpbC5uZXdPYmplY3Q7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbSk7XG4gICAgaWYgKGtleXMubGVuZ3RoICE9IDEpIHRocm93IFwia2V5IG9mIHBhcmFtIHNoYWxsIGJlIG9ubHkgb25lLlwiO1xuICAgIHZhciBrZXkgPSBrZXlzWzBdO1xuICAgIGlmIChcIjpib29sOmludDpiaXRzdHI6b2N0c3RyOm51bGw6b2lkOmVudW06dXRmOHN0cjpudW1zdHI6cHJuc3RyOnRlbHN0cjppYTVzdHI6dXRjdGltZTpnZW50aW1lOnNlcTpzZXQ6dGFnOlwiLmluZGV4T2YoXCI6XCIgKyBrZXkgKyBcIjpcIikgPT0gLTEpIHRocm93IFwidW5kZWZpbmVkIGtleTogXCIgKyBrZXk7XG4gICAgaWYgKGtleSA9PSBcImJvb2xcIikgcmV0dXJuIG5ldyBfREVSQm9vbGVhbihwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwiaW50XCIpIHJldHVybiBuZXcgX0RFUkludGVnZXIocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcImJpdHN0clwiKSByZXR1cm4gbmV3IF9ERVJCaXRTdHJpbmcocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcIm9jdHN0clwiKSByZXR1cm4gbmV3IF9ERVJPY3RldFN0cmluZyhwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwibnVsbFwiKSByZXR1cm4gbmV3IF9ERVJOdWxsKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJvaWRcIikgcmV0dXJuIG5ldyBfREVST2JqZWN0SWRlbnRpZmllcihwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwiZW51bVwiKSByZXR1cm4gbmV3IF9ERVJFbnVtZXJhdGVkKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJ1dGY4c3RyXCIpIHJldHVybiBuZXcgX0RFUlVURjhTdHJpbmcocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcIm51bXN0clwiKSByZXR1cm4gbmV3IF9ERVJOdW1lcmljU3RyaW5nKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJwcm5zdHJcIikgcmV0dXJuIG5ldyBfREVSUHJpbnRhYmxlU3RyaW5nKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJ0ZWxzdHJcIikgcmV0dXJuIG5ldyBfREVSVGVsZXRleFN0cmluZyhwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwiaWE1c3RyXCIpIHJldHVybiBuZXcgX0RFUklBNVN0cmluZyhwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwidXRjdGltZVwiKSByZXR1cm4gbmV3IF9ERVJVVENUaW1lKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJnZW50aW1lXCIpIHJldHVybiBuZXcgX0RFUkdlbmVyYWxpemVkVGltZShwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwic2VxXCIpIHtcbiAgICAgIHZhciBwYXJhbUxpc3QgPSBwYXJhbVtrZXldO1xuICAgICAgdmFyIGEgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhc24xT2JqID0gX25ld09iamVjdChwYXJhbUxpc3RbaV0pO1xuICAgICAgICBhLnB1c2goYXNuMU9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IF9ERVJTZXF1ZW5jZSh7XG4gICAgICAgICdhcnJheSc6IGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoa2V5ID09IFwic2V0XCIpIHtcbiAgICAgIHZhciBwYXJhbUxpc3QgPSBwYXJhbVtrZXldO1xuICAgICAgdmFyIGEgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhc24xT2JqID0gX25ld09iamVjdChwYXJhbUxpc3RbaV0pO1xuICAgICAgICBhLnB1c2goYXNuMU9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IF9ERVJTZXQoe1xuICAgICAgICAnYXJyYXknOiBhXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGtleSA9PSBcInRhZ1wiKSB7XG4gICAgICB2YXIgdGFnUGFyYW0gPSBwYXJhbVtrZXldO1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0YWdQYXJhbSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgdGFnUGFyYW0ubGVuZ3RoID09IDMpIHtcbiAgICAgICAgdmFyIG9iaiA9IF9uZXdPYmplY3QodGFnUGFyYW1bMl0pO1xuICAgICAgICByZXR1cm4gbmV3IF9ERVJUYWdnZWRPYmplY3Qoe1xuICAgICAgICAgIHRhZzogdGFnUGFyYW1bMF0sXG4gICAgICAgICAgZXhwbGljaXQ6IHRhZ1BhcmFtWzFdLFxuICAgICAgICAgIG9iajogb2JqXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld1BhcmFtID0ge307XG4gICAgICAgIGlmICh0YWdQYXJhbS5leHBsaWNpdCAhPT0gdW5kZWZpbmVkKSBuZXdQYXJhbS5leHBsaWNpdCA9IHRhZ1BhcmFtLmV4cGxpY2l0O1xuICAgICAgICBpZiAodGFnUGFyYW0udGFnICE9PSB1bmRlZmluZWQpIG5ld1BhcmFtLnRhZyA9IHRhZ1BhcmFtLnRhZztcbiAgICAgICAgaWYgKHRhZ1BhcmFtLm9iaiA9PT0gdW5kZWZpbmVkKSB0aHJvdyBcIm9iaiBzaGFsbCBiZSBzcGVjaWZpZWQgZm9yICd0YWcnLlwiO1xuICAgICAgICBuZXdQYXJhbS5vYmogPSBfbmV3T2JqZWN0KHRhZ1BhcmFtLm9iaik7XG4gICAgICAgIHJldHVybiBuZXcgX0RFUlRhZ2dlZE9iamVjdChuZXdQYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogZ2V0IGVuY29kZWQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTjFPYmplY3Qgc3BlY2lmZWQgYnkgSlNPTiBwYXJhbWV0ZXJzXG4gICAqIEBuYW1lIGpzb25Ub0FTTjFIRVhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xVXRpbFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW0gSlNPTiBwYXJhbWV0ZXIgdG8gZ2VuZXJhdGUgQVNOMU9iamVjdFxuICAgKiBAcmV0dXJuIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04xT2JqZWN0XG4gICAqIEBzaW5jZSBhc24xIDEuMC40XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBcyBmb3IgQVNOLjEgb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIEpTT04gb2JqZWN0LFxuICAgKiBwbGVhc2Ugc2VlIHtAbGluayBuZXdPYmplY3R9LlxuICAgKiBAZXhhbXBsZVxuICAgKiBqc29uVG9BU04xSEVYKHsncHJuc3RyJzogJ2FhYSd9KTtcbiAgICovXG4gIHRoaXMuanNvblRvQVNOMUhFWCA9IGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHZhciBhc24xT2JqID0gdGhpcy5uZXdPYmplY3QocGFyYW0pO1xuICAgIHJldHVybiBhc24xT2JqLmdldEVuY29kZWRIZXgoKTtcbiAgfTtcbn0oKTtcbi8qKlxuICogZ2V0IGRvdCBub3RlZCBvaWQgbnVtYmVyIHN0cmluZyBmcm9tIGhleGFkZWNpbWFsIHZhbHVlIG9mIE9JRFxuICogQG5hbWUgb2lkSGV4VG9JbnRcbiAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMVV0aWxcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IGhleCBoZXhhZGVjaW1hbCB2YWx1ZSBvZiBvYmplY3QgaWRlbnRpZmllclxuICogQHJldHVybiB7U3RyaW5nfSBkb3Qgbm90ZWQgc3RyaW5nIG9mIG9iamVjdCBpZGVudGlmaWVyXG4gKiBAc2luY2UganNyc2FzaWduIDQuOC4zIGFzbjEgMS4wLjdcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBzdGF0aWMgbWV0aG9kIGNvbnZlcnRzIGZyb20gaGV4YWRlY2ltYWwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mXG4gKiBBU04uMSB2YWx1ZSBvZiBvYmplY3QgaWRlbnRpZmllciB0byBvaWQgbnVtYmVyIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKiBLSlVSLmFzbjEuQVNOMVV0aWwub2lkSGV4VG9JbnQoJzU1MDQwNicpICZyYXJyOyBcIjIuNS40LjZcIlxuICovXG5LSlVSLmFzbjEuQVNOMVV0aWwub2lkSGV4VG9JbnQgPSBmdW5jdGlvbiAoaGV4KSB7XG4gIHZhciBzID0gXCJcIjtcbiAgdmFyIGkwMSA9IHBhcnNlSW50KGhleC5zdWJzdHIoMCwgMiksIDE2KTtcbiAgdmFyIGkwID0gTWF0aC5mbG9vcihpMDEgLyA0MCk7XG4gIHZhciBpMSA9IGkwMSAlIDQwO1xuICB2YXIgcyA9IGkwICsgXCIuXCIgKyBpMTtcbiAgdmFyIGJpbmJ1ZiA9IFwiXCI7XG4gIGZvciAodmFyIGkgPSAyOyBpIDwgaGV4Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIHZhbHVlID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpLCAyKSwgMTYpO1xuICAgIHZhciBiaW4gPSAoXCIwMDAwMDAwMFwiICsgdmFsdWUudG9TdHJpbmcoMikpLnNsaWNlKC04KTtcbiAgICBiaW5idWYgPSBiaW5idWYgKyBiaW4uc3Vic3RyKDEsIDcpO1xuICAgIGlmIChiaW4uc3Vic3RyKDAsIDEpID09IFwiMFwiKSB7XG4gICAgICB2YXIgYmkgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihiaW5idWYsIDIpO1xuICAgICAgcyA9IHMgKyBcIi5cIiArIGJpLnRvU3RyaW5nKDEwKTtcbiAgICAgIGJpbmJ1ZiA9IFwiXCI7XG4gICAgfVxuICB9XG4gIDtcbiAgcmV0dXJuIHM7XG59O1xuLyoqXG4gKiBnZXQgaGV4YWRlY2ltYWwgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXIgZnJvbSBkb3Qgbm90ZWQgb2lkIHZhbHVlXG4gKiBAbmFtZSBvaWRJbnRUb0hleFxuICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xVXRpbFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gb2lkU3RyaW5nIGRvdCBub3RlZCBzdHJpbmcgb2Ygb2JqZWN0IGlkZW50aWZpZXJcbiAqIEByZXR1cm4ge1N0cmluZ30gaGV4YWRlY2ltYWwgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXJcbiAqIEBzaW5jZSBqc3JzYXNpZ24gNC44LjMgYXNuMSAxLjAuN1xuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIHN0YXRpYyBtZXRob2QgY29udmVydHMgZnJvbSBvYmplY3QgaWRlbnRpZmllciB2YWx1ZSBzdHJpbmcuXG4gKiB0byBoZXhhZGVjaW1hbCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgaXQuXG4gKiBAZXhhbXBsZVxuICogS0pVUi5hc24xLkFTTjFVdGlsLm9pZEludFRvSGV4KFwiMi41LjQuNlwiKSAmcmFycjsgXCI1NTA0MDZcIlxuICovXG5LSlVSLmFzbjEuQVNOMVV0aWwub2lkSW50VG9IZXggPSBmdW5jdGlvbiAob2lkU3RyaW5nKSB7XG4gIHZhciBpdG94ID0gZnVuY3Rpb24gKGkpIHtcbiAgICB2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xuICAgIGlmIChoLmxlbmd0aCA9PSAxKSBoID0gJzAnICsgaDtcbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgdmFyIHJvaWR0b3ggPSBmdW5jdGlvbiAocm9pZCkge1xuICAgIHZhciBoID0gJyc7XG4gICAgdmFyIGJpID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIocm9pZCwgMTApO1xuICAgIHZhciBiID0gYmkudG9TdHJpbmcoMik7XG4gICAgdmFyIHBhZExlbiA9IDcgLSBiLmxlbmd0aCAlIDc7XG4gICAgaWYgKHBhZExlbiA9PSA3KSBwYWRMZW4gPSAwO1xuICAgIHZhciBiUGFkID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWRMZW47IGkrKykgYlBhZCArPSAnMCc7XG4gICAgYiA9IGJQYWQgKyBiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGggLSAxOyBpICs9IDcpIHtcbiAgICAgIHZhciBiOCA9IGIuc3Vic3RyKGksIDcpO1xuICAgICAgaWYgKGkgIT0gYi5sZW5ndGggLSA3KSBiOCA9ICcxJyArIGI4O1xuICAgICAgaCArPSBpdG94KHBhcnNlSW50KGI4LCAyKSk7XG4gICAgfVxuICAgIHJldHVybiBoO1xuICB9O1xuICBpZiAoIW9pZFN0cmluZy5tYXRjaCgvXlswLTkuXSskLykpIHtcbiAgICB0aHJvdyBcIm1hbGZvcm1lZCBvaWQgc3RyaW5nOiBcIiArIG9pZFN0cmluZztcbiAgfVxuICB2YXIgaCA9ICcnO1xuICB2YXIgYSA9IG9pZFN0cmluZy5zcGxpdCgnLicpO1xuICB2YXIgaTAgPSBwYXJzZUludChhWzBdKSAqIDQwICsgcGFyc2VJbnQoYVsxXSk7XG4gIGggKz0gaXRveChpMCk7XG4gIGEuc3BsaWNlKDAsIDIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBoICs9IHJvaWR0b3goYVtpXSk7XG4gIH1cbiAgcmV0dXJuIGg7XG59O1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBYnN0cmFjdCBBU04uMSBDbGFzc2VzXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZXIgb2JqZWN0XG4gKiBAbmFtZSBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGNsYXNzIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBlbmNvZGVyIG9iamVjdFxuICogQHByb3BlcnR5IHtCb29sZWFufSBpc01vZGlmaWVkIGZsYWcgd2hldGhlciBpbnRlcm5hbCBkYXRhIHdhcyBjaGFuZ2VkXG4gKiBAcHJvcGVydHkge1N0cmluZ30gaFRMViBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWXG4gKiBAcHJvcGVydHkge1N0cmluZ30gaFQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViB0YWcoVClcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBoTCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGxlbmd0aChMKVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGhWIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVilcbiAqIEBkZXNjcmlwdGlvblxuICovXG5LSlVSLmFzbjEuQVNOMU9iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlzTW9kaWZpZWQgPSB0cnVlO1xuICB2YXIgaFRMViA9IG51bGw7XG4gIHZhciBoVCA9ICcwMCc7XG4gIHZhciBoTCA9ICcwMCc7XG4gIHZhciBoViA9ICcnO1xuICAvKipcbiAgICogZ2V0IGhleGFkZWNpbWFsIEFTTi4xIFRMViBsZW5ndGgoTCkgYnl0ZXMgZnJvbSBUTFYgdmFsdWUoVilcbiAgICogQG5hbWUgZ2V0TGVuZ3RoSGV4RnJvbVZhbHVlXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViBsZW5ndGgoTClcbiAgICovXG4gIHRoaXMuZ2V0TGVuZ3RoSGV4RnJvbVZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5oViA9PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuaFYgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgXCJ0aGlzLmhWIGlzIG51bGwgb3IgdW5kZWZpbmVkLlwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5oVi5sZW5ndGggJSAyID09IDEpIHtcbiAgICAgIHRocm93IFwidmFsdWUgaGV4IG11c3QgYmUgZXZlbiBsZW5ndGg6IG49XCIgKyBoVi5sZW5ndGggKyBcIix2PVwiICsgdGhpcy5oVjtcbiAgICB9XG4gICAgdmFyIG4gPSB0aGlzLmhWLmxlbmd0aCAvIDI7XG4gICAgdmFyIGhOID0gbi50b1N0cmluZygxNik7XG4gICAgaWYgKGhOLmxlbmd0aCAlIDIgPT0gMSkge1xuICAgICAgaE4gPSBcIjBcIiArIGhOO1xuICAgIH1cbiAgICBpZiAobiA8IDEyOCkge1xuICAgICAgcmV0dXJuIGhOO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaE5sZW4gPSBoTi5sZW5ndGggLyAyO1xuICAgICAgaWYgKGhObGVuID4gMTUpIHtcbiAgICAgICAgdGhyb3cgXCJBU04uMSBsZW5ndGggdG9vIGxvbmcgdG8gcmVwcmVzZW50IGJ5IDh4OiBuID0gXCIgKyBuLnRvU3RyaW5nKDE2KTtcbiAgICAgIH1cbiAgICAgIHZhciBoZWFkID0gMTI4ICsgaE5sZW47XG4gICAgICByZXR1cm4gaGVhZC50b1N0cmluZygxNikgKyBoTjtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBnZXQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViBieXRlc1xuICAgKiBAbmFtZSBnZXRFbmNvZGVkSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMVlxuICAgKi9cbiAgdGhpcy5nZXRFbmNvZGVkSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmhUTFYgPT0gbnVsbCB8fCB0aGlzLmlzTW9kaWZpZWQpIHtcbiAgICAgIHRoaXMuaFYgPSB0aGlzLmdldEZyZXNoVmFsdWVIZXgoKTtcbiAgICAgIHRoaXMuaEwgPSB0aGlzLmdldExlbmd0aEhleEZyb21WYWx1ZSgpO1xuICAgICAgdGhpcy5oVExWID0gdGhpcy5oVCArIHRoaXMuaEwgKyB0aGlzLmhWO1xuICAgICAgdGhpcy5pc01vZGlmaWVkID0gZmFsc2U7XG4gICAgICAvL2FsZXJ0KFwiZmlyc3QgdGltZTogXCIgKyB0aGlzLmhUTFYpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oVExWO1xuICB9O1xuICAvKipcbiAgICogZ2V0IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVikgYnl0ZXNcbiAgICogQG5hbWUgZ2V0VmFsdWVIZXhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xT2JqZWN0I1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7U3RyaW5nfSBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIHZhbHVlKFYpIGJ5dGVzXG4gICAqL1xuICB0aGlzLmdldFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ2V0RW5jb2RlZEhleCgpO1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcnO1xuICB9O1xufTtcbi8vID09IEJFR0lOIERFUkFic3RyYWN0U3RyaW5nID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLyoqXG4gKiBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgc3RyaW5nIGNsYXNzZXNcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGNsYXNzIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBzdHJpbmcgY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBzIGludGVybmFsIHN0cmluZyBvZiB2YWx1ZVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPnN0ciAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIHN0cmluZzwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB2YXIgcyA9IG51bGw7XG4gIHZhciBoViA9IG51bGw7XG4gIC8qKlxuICAgKiBnZXQgc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxuICAgKiBAbmFtZSBnZXRTdHJpbmdcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxuICAgKi9cbiAgdGhpcy5nZXRTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucztcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhIHN0cmluZ1xuICAgKiBAbmFtZSBzZXRTdHJpbmdcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdTIHZhbHVlIGJ5IGEgc3RyaW5nIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbiAobmV3Uykge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLnMgPSBuZXdTO1xuICAgIHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhIGhleGFkZWNpbWFsIHN0cmluZ1xuICAgKiBAbmFtZSBzZXRTdHJpbmdIZXhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmcgdmFsdWUgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmcgdG8gc2V0XG4gICAqL1xuICB0aGlzLnNldFN0cmluZ0hleCA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmcpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5zID0gbnVsbDtcbiAgICB0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snc3RyJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zWydzdHInXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydoZXgnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldFN0cmluZ0hleChwYXJhbXNbJ2hleCddKTtcbiAgICB9XG4gIH1cbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyA9PSBFTkQgICBERVJBYnN0cmFjdFN0cmluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09IEJFR0lOIERFUkFic3RyYWN0VGltZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLyoqXG4gKiBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWQvVVRDVGltZSBjbGFzc1xuICogQG5hbWUgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZVxuICogQGNsYXNzIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBHZW5lcmFsaXplZC9VVENUaW1lIGNsYXNzXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzEzMDQzMDIzNTk1OVonfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB2YXIgcyA9IG51bGw7XG4gIHZhciBkYXRlID0gbnVsbDtcbiAgLy8gLS0tIFBSSVZBVEUgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB0aGlzLmxvY2FsRGF0ZVRvVVRDID0gZnVuY3Rpb24gKGQpIHtcbiAgICB1dGMgPSBkLmdldFRpbWUoKSArIGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICAgIHZhciB1dGNEYXRlID0gbmV3IERhdGUodXRjKTtcbiAgICByZXR1cm4gdXRjRGF0ZTtcbiAgfTtcbiAgLypcbiAgICogZm9ybWF0IGRhdGUgc3RyaW5nIGJ5IERhdGEgb2JqZWN0XG4gICAqIEBuYW1lIGZvcm1hdERhdGVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BYnN0cmFjdFRpbWU7XG4gICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZU9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAndXRjJyBvciAnZ2VuJ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhNaWxsaXMgZmxhZyBmb3Igd2l0aCBtaWxsaXNlY3Rpb25zIG9yIG5vdFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogJ3dpdGhNaWxsaXMnIGZsYWcgaXMgc3VwcG9ydGVkIGZyb20gYXNuMSAxLjAuNi5cbiAgICovXG4gIHRoaXMuZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlT2JqZWN0LCB0eXBlLCB3aXRoTWlsbGlzKSB7XG4gICAgdmFyIHBhZCA9IHRoaXMuemVyb1BhZGRpbmc7XG4gICAgdmFyIGQgPSB0aGlzLmxvY2FsRGF0ZVRvVVRDKGRhdGVPYmplY3QpO1xuICAgIHZhciB5ZWFyID0gU3RyaW5nKGQuZ2V0RnVsbFllYXIoKSk7XG4gICAgaWYgKHR5cGUgPT0gJ3V0YycpIHllYXIgPSB5ZWFyLnN1YnN0cigyLCAyKTtcbiAgICB2YXIgbW9udGggPSBwYWQoU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLCAyKTtcbiAgICB2YXIgZGF5ID0gcGFkKFN0cmluZyhkLmdldERhdGUoKSksIDIpO1xuICAgIHZhciBob3VyID0gcGFkKFN0cmluZyhkLmdldEhvdXJzKCkpLCAyKTtcbiAgICB2YXIgbWluID0gcGFkKFN0cmluZyhkLmdldE1pbnV0ZXMoKSksIDIpO1xuICAgIHZhciBzZWMgPSBwYWQoU3RyaW5nKGQuZ2V0U2Vjb25kcygpKSwgMik7XG4gICAgdmFyIHMgPSB5ZWFyICsgbW9udGggKyBkYXkgKyBob3VyICsgbWluICsgc2VjO1xuICAgIGlmICh3aXRoTWlsbGlzID09PSB0cnVlKSB7XG4gICAgICB2YXIgbWlsbGlzID0gZC5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICAgIGlmIChtaWxsaXMgIT0gMCkge1xuICAgICAgICB2YXIgc01pbGxpcyA9IHBhZChTdHJpbmcobWlsbGlzKSwgMyk7XG4gICAgICAgIHNNaWxsaXMgPSBzTWlsbGlzLnJlcGxhY2UoL1swXSskLywgXCJcIik7XG4gICAgICAgIHMgPSBzICsgXCIuXCIgKyBzTWlsbGlzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcyArIFwiWlwiO1xuICB9O1xuICB0aGlzLnplcm9QYWRkaW5nID0gZnVuY3Rpb24gKHMsIGxlbikge1xuICAgIGlmIChzLmxlbmd0aCA+PSBsZW4pIHJldHVybiBzO1xuICAgIHJldHVybiBuZXcgQXJyYXkobGVuIC0gcy5sZW5ndGggKyAxKS5qb2luKCcwJykgKyBzO1xuICB9O1xuICAvLyAtLS0gUFVCTElDIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIGdldCBzdHJpbmcgdmFsdWUgb2YgdGhpcyBzdHJpbmcgb2JqZWN0XG4gICAqIEBuYW1lIGdldFN0cmluZ1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHZhbHVlIG9mIHRoaXMgdGltZSBvYmplY3RcbiAgICovXG4gIHRoaXMuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnM7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBzdHJpbmdcbiAgICogQG5hbWUgc2V0U3RyaW5nXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5ld1MgdmFsdWUgYnkgYSBzdHJpbmcgdG8gc2V0IHN1Y2ggbGlrZSBcIjEzMDQzMDIzNTk1OVpcIlxuICAgKi9cbiAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbiAobmV3Uykge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLnMgPSBuZXdTO1xuICAgIHRoaXMuaFYgPSBzdG9oZXgobmV3Uyk7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBEYXRlIG9iamVjdFxuICAgKiBAbmFtZSBzZXRCeURhdGVWYWx1ZVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0geWVhciB5ZWFyIG9mIGRhdGUgKGV4LiAyMDEzKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IG1vbnRoIG1vbnRoIG9mIGRhdGUgYmV0d2VlbiAxIGFuZCAxMiAoZXguIDEyKVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRheSBkYXkgb2YgbW9udGhcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBob3VyIGhvdXJzIG9mIGRhdGVcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBtaW4gbWludXRlcyBvZiBkYXRlXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gc2VjIHNlY29uZHMgb2YgZGF0ZVxuICAgKi9cbiAgdGhpcy5zZXRCeURhdGVWYWx1ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW4sIHNlYykge1xuICAgIHZhciBkYXRlT2JqZWN0ID0gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbiwgc2VjLCAwKSk7XG4gICAgdGhpcy5zZXRCeURhdGUoZGF0ZU9iamVjdCk7XG4gIH07XG4gIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5oVjtcbiAgfTtcbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gPT0gRU5EICAgREVSQWJzdHJhY3RUaW1lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA9PSBCRUdJTiBERVJBYnN0cmFjdFN0cnVjdHVyZWQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8qKlxuICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cnVjdHVyZWQgY2xhc3NcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWRcbiAqIEBjbGFzcyBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgc3RydWN0dXJlZCBjbGFzc1xuICogQHByb3BlcnR5IHtBcnJheX0gYXNuMUFycmF5IGludGVybmFsIGFycmF5IG9mIEFTTjFPYmplY3RcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHZhciBhc24xQXJyYXkgPSBudWxsO1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGFycmF5IG9mIEFTTjFPYmplY3RcbiAgICogQG5hbWUgc2V0QnlBU04xT2JqZWN0QXJyYXlcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2FycmF5fSBhc24xT2JqZWN0QXJyYXkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXRcbiAgICovXG4gIHRoaXMuc2V0QnlBU04xT2JqZWN0QXJyYXkgPSBmdW5jdGlvbiAoYXNuMU9iamVjdEFycmF5KSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuYXNuMUFycmF5ID0gYXNuMU9iamVjdEFycmF5O1xuICB9O1xuICAvKipcbiAgICogYXBwZW5kIGFuIEFTTjFPYmplY3QgdG8gaW50ZXJuYWwgYXJyYXlcbiAgICogQG5hbWUgYXBwZW5kQVNOMU9iamVjdFxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7QVNOMU9iamVjdH0gYXNuMU9iamVjdCB0byBhZGRcbiAgICovXG4gIHRoaXMuYXBwZW5kQVNOMU9iamVjdCA9IGZ1bmN0aW9uIChhc24xT2JqZWN0KSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuYXNuMUFycmF5LnB1c2goYXNuMU9iamVjdCk7XG4gIH07XG4gIHRoaXMuYXNuMUFycmF5ID0gbmV3IEFycmF5KCk7XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtc1snYXJyYXknXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmFzbjFBcnJheSA9IHBhcmFtc1snYXJyYXknXTtcbiAgICB9XG4gIH1cbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBU04uMSBPYmplY3QgQ2xhc3Nlc1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgQm9vbGVhblxuICogQG5hbWUgS0pVUi5hc24xLkRFUkJvb2xlYW5cbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIEJvb2xlYW5cbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJCb29sZWFuID0gZnVuY3Rpb24gKCkge1xuICBLSlVSLmFzbjEuREVSQm9vbGVhbi5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjAxXCI7XG4gIHRoaXMuaFRMViA9IFwiMDEwMWZmXCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJCb29sZWFuLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIEludGVnZXJcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJJbnRlZ2VyXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBJbnRlZ2VyXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+aW50IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGludGVnZXIgdmFsdWU8L2xpPlxuICogPGxpPmJpZ2ludCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBCaWdJbnRlZ2VyIG9iamVjdDwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuS0pVUi5hc24xLkRFUkludGVnZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJJbnRlZ2VyLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5oVCA9IFwiMDJcIjtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBUb20gV3UncyBCaWdJbnRlZ2VyIG9iamVjdFxuICAgKiBAbmFtZSBzZXRCeUJpZ0ludGVnZXJcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJJbnRlZ2VyI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtCaWdJbnRlZ2VyfSBiaWdJbnRlZ2VyVmFsdWUgdG8gc2V0XG4gICAqL1xuICB0aGlzLnNldEJ5QmlnSW50ZWdlciA9IGZ1bmN0aW9uIChiaWdJbnRlZ2VyVmFsdWUpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5oViA9IEtKVVIuYXNuMS5BU04xVXRpbC5iaWdJbnRUb01pblR3b3NDb21wbGVtZW50c0hleChiaWdJbnRlZ2VyVmFsdWUpO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGludGVnZXIgdmFsdWVcbiAgICogQG5hbWUgc2V0QnlJbnRlZ2VyXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSSW50ZWdlclxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbnRlZ2VyIHZhbHVlIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRCeUludGVnZXIgPSBmdW5jdGlvbiAoaW50VmFsdWUpIHtcbiAgICB2YXIgYmkgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihTdHJpbmcoaW50VmFsdWUpLCAxMCk7XG4gICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIoYmkpO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGludGVnZXIgdmFsdWVcbiAgICogQG5hbWUgc2V0VmFsdWVIZXhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJJbnRlZ2VyI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBpbnRlZ2VyIHZhbHVlXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiA8YnIvPlxuICAgKiBOT1RFOiBWYWx1ZSBzaGFsbCBiZSByZXByZXNlbnRlZCBieSBtaW5pbXVtIG9jdGV0IGxlbmd0aCBvZlxuICAgKiB0d28ncyBjb21wbGVtZW50IHJlcHJlc2VudGF0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKiBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoMTIzKTtcbiAgICogbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnaW50JzogMTIzfSk7XG4gICAqIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7J2hleCc6ICcxZmFkJ30pO1xuICAgKi9cbiAgdGhpcy5zZXRWYWx1ZUhleCA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmcpIHtcbiAgICB0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtc1snYmlnaW50J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIocGFyYW1zWydiaWdpbnQnXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydpbnQnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEJ5SW50ZWdlcihwYXJhbXNbJ2ludCddKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zWydoZXgnXSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJJbnRlZ2VyLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZWQgQml0U3RyaW5nIHByaW1pdGl2ZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgZW5jb2RlZCBCaXRTdHJpbmcgcHJpbWl0aXZlXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+YmluIC0gc3BlY2lmeSBiaW5hcnkgc3RyaW5nIChleC4gJzEwMTExJyk8L2xpPlxuICogPGxpPmFycmF5IC0gc3BlY2lmeSBhcnJheSBvZiBib29sZWFuIChleC4gW3RydWUsZmFsc2UsdHJ1ZSx0cnVlXSk8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIHZhbHVlKFYpIGluY2x1ZGluZyB1bnVzZWQgYml0czwvbGk+XG4gKiA8bGk+b2JqIC0gc3BlY2lmeSB7QGxpbmsgS0pVUi5hc24xLkFTTjFVdGlsLm5ld09iamVjdH1cbiAqIGFyZ3VtZW50IGZvciBcIkJpdFN0cmluZyBlbmNhcHN1bGF0ZXNcIiBzdHJ1Y3R1cmUuPC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFMTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuPGJyLz5cbiAqIE5PVEUyOiAnb2JqJyBwYXJhbWV0ZXIgaGF2ZSBiZWVuIHN1cHBvcnRlZCBzaW5jZVxuICogYXNuMSAxLjAuMTEsIGpzcnNhc2lnbiA2LjEuMSAoMjAxNi1TZXAtMjUpLjxici8+XG4gKiBAZXhhbXBsZVxuICogLy8gZGVmYXVsdCBjb25zdHJ1Y3RvclxuICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKCk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggYmluYXJ5IHN0cmluZ1xuICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKHtiaW46IFwiMTAxMVwifSk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggYm9vbGVhbiBhcnJheVxuICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKHthcnJheTogW3RydWUsZmFsc2UsdHJ1ZSx0cnVlXX0pO1xuICogLy8gaW5pdGlhbGl6ZSB3aXRoIGhleGFkZWNpbWFsIHN0cmluZyAoMDQgaXMgdW51c2VkIGJpdHMpXG4gKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZyh7aGV4OiBcIjA0YmFjMFwifSk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggQVNOMVV0aWwubmV3T2JqZWN0IGFyZ3VtZW50IGZvciBlbmNhcHN1bGF0ZWRcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7b2JqOiB7c2VxOiBbe2ludDogM30sIHtwcm5zdHI6ICdhYWEnfV19fSk7XG4gKiAvLyBhYm92ZSBnZW5lcmF0ZXMgYSBBU04uMSBkYXRhIGxpa2UgdGhpczpcbiAqIC8vIEJJVCBTVFJJTkcsIGVuY2Fwc3VsYXRlcyB7XG4gKiAvLyAgIFNFUVVFTkNFIHtcbiAqIC8vICAgICBJTlRFR0VSIDNcbiAqIC8vICAgICBQcmludGFibGVTdHJpbmcgJ2FhYSdcbiAqIC8vICAgICB9XG4gKiAvLyAgIH1cbiAqL1xuS0pVUi5hc24xLkRFUkJpdFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBwYXJhbXMub2JqICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIG8gPSBLSlVSLmFzbjEuQVNOMVV0aWwubmV3T2JqZWN0KHBhcmFtcy5vYmopO1xuICAgIHBhcmFtcy5oZXggPSBcIjAwXCIgKyBvLmdldEVuY29kZWRIZXgoKTtcbiAgfVxuICBLSlVSLmFzbjEuREVSQml0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5oVCA9IFwiMDNcIjtcbiAgLyoqXG4gICAqIHNldCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZyBpbmNsdWRpbmcgdW51c2VkIGJpdHNcbiAgICogQG5hbWUgc2V0SGV4VmFsdWVJbmNsdWRpbmdVbnVzZWRCaXRzXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQml0U3RyaW5nI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHNcbiAgICovXG4gIHRoaXMuc2V0SGV4VmFsdWVJbmNsdWRpbmdVbnVzZWRCaXRzID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHMpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5oViA9IG5ld0hleFN0cmluZ0luY2x1ZGluZ1VudXNlZEJpdHM7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgQVNOLjEgdmFsdWUoVikgYnkgdW51c2VkIGJpdCBhbmQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIHZhbHVlXG4gICAqIEBuYW1lIHNldFVudXNlZEJpdHNBbmRIZXhWYWx1ZVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gdW51c2VkQml0c1xuICAgKiBAcGFyYW0ge1N0cmluZ30gaFZhbHVlXG4gICAqL1xuICB0aGlzLnNldFVudXNlZEJpdHNBbmRIZXhWYWx1ZSA9IGZ1bmN0aW9uICh1bnVzZWRCaXRzLCBoVmFsdWUpIHtcbiAgICBpZiAodW51c2VkQml0cyA8IDAgfHwgNyA8IHVudXNlZEJpdHMpIHtcbiAgICAgIHRocm93IFwidW51c2VkIGJpdHMgc2hhbGwgYmUgZnJvbSAwIHRvIDc6IHUgPSBcIiArIHVudXNlZEJpdHM7XG4gICAgfVxuICAgIHZhciBoVW51c2VkQml0cyA9IFwiMFwiICsgdW51c2VkQml0cztcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5oViA9IGhVbnVzZWRCaXRzICsgaFZhbHVlO1xuICB9O1xuICAvKipcbiAgICogc2V0IEFTTi4xIERFUiBCaXRTdHJpbmcgYnkgYmluYXJ5IHN0cmluZzxici8+XG4gICAqIEBuYW1lIHNldEJ5QmluYXJ5U3RyaW5nXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQml0U3RyaW5nI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGJpbmFyeVN0cmluZyBiaW5hcnkgdmFsdWUgc3RyaW5nIChpLmUuICcxMDExMScpXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBJdHMgdW51c2VkIGJpdHMgd2lsbCBiZSBjYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgYnkgbGVuZ3RoIG9mXG4gICAqICdiaW5hcnlWYWx1ZScuIDxici8+XG4gICAqIE5PVEU6IFRyYWlsaW5nIHplcm9zICcwJyB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIEBleGFtcGxlXG4gICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xuICAgKiBvLnNldEJ5Qm9vbGVhbkFycmF5KFwiMDEwMTFcIik7XG4gICAqL1xuICB0aGlzLnNldEJ5QmluYXJ5U3RyaW5nID0gZnVuY3Rpb24gKGJpbmFyeVN0cmluZykge1xuICAgIGJpbmFyeVN0cmluZyA9IGJpbmFyeVN0cmluZy5yZXBsYWNlKC8wKyQvLCAnJyk7XG4gICAgdmFyIHVudXNlZEJpdHMgPSA4IC0gYmluYXJ5U3RyaW5nLmxlbmd0aCAlIDg7XG4gICAgaWYgKHVudXNlZEJpdHMgPT0gOCkgdW51c2VkQml0cyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gdW51c2VkQml0czsgaSsrKSB7XG4gICAgICBiaW5hcnlTdHJpbmcgKz0gJzAnO1xuICAgIH1cbiAgICB2YXIgaCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmluYXJ5U3RyaW5nLmxlbmd0aCAtIDE7IGkgKz0gOCkge1xuICAgICAgdmFyIGIgPSBiaW5hcnlTdHJpbmcuc3Vic3RyKGksIDgpO1xuICAgICAgdmFyIHggPSBwYXJzZUludChiLCAyKS50b1N0cmluZygxNik7XG4gICAgICBpZiAoeC5sZW5ndGggPT0gMSkgeCA9ICcwJyArIHg7XG4gICAgICBoICs9IHg7XG4gICAgfVxuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmhWID0gJzAnICsgdW51c2VkQml0cyArIGg7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgQVNOLjEgVExWIHZhbHVlKFYpIGJ5IGFuIGFycmF5IG9mIGJvb2xlYW48YnIvPlxuICAgKiBAbmFtZSBzZXRCeUJvb2xlYW5BcnJheVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7YXJyYXl9IGJvb2xlYW5BcnJheSBhcnJheSBvZiBib29sZWFuIChleC4gW3RydWUsIGZhbHNlLCB0cnVlXSlcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIE5PVEU6IFRyYWlsaW5nIGZhbHNlcyB3aWxsIGJlIGlnbm9yZWQgaW4gdGhlIEFTTi4xIERFUiBPYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xuICAgKiBvLnNldEJ5Qm9vbGVhbkFycmF5KFtmYWxzZSwgdHJ1ZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcbiAgICovXG4gIHRoaXMuc2V0QnlCb29sZWFuQXJyYXkgPSBmdW5jdGlvbiAoYm9vbGVhbkFycmF5KSB7XG4gICAgdmFyIHMgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvb2xlYW5BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJvb2xlYW5BcnJheVtpXSA9PSB0cnVlKSB7XG4gICAgICAgIHMgKz0gJzEnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcyArPSAnMCc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0QnlCaW5hcnlTdHJpbmcocyk7XG4gIH07XG4gIC8qKlxuICAgKiBnZW5lcmF0ZSBhbiBhcnJheSBvZiBmYWxzZXMgd2l0aCBzcGVjaWZpZWQgbGVuZ3RoPGJyLz5cbiAgICogQG5hbWUgbmV3RmFsc2VBcnJheVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBuTGVuZ3RoIGxlbmd0aCBvZiBhcnJheSB0byBnZW5lcmF0ZVxuICAgKiBAcmV0dXJuIHthcnJheX0gYXJyYXkgb2YgYm9vbGVhbiBmYWxzZXNcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgc3RhdGljIG1ldGhvZCBtYXkgYmUgdXNlZnVsIHRvIGluaXRpYWxpemUgYm9vbGVhbiBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVSQml0U3RyaW5nKCk7XG4gICAqIG8ubmV3RmFsc2VBcnJheSgzKSAmcmFycjsgW2ZhbHNlLCBmYWxzZSwgZmFsc2VdXG4gICAqL1xuICB0aGlzLm5ld0ZhbHNlQXJyYXkgPSBmdW5jdGlvbiAobkxlbmd0aCkge1xuICAgIHZhciBhID0gbmV3IEFycmF5KG5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkxlbmd0aDsgaSsrKSB7XG4gICAgICBhW2ldID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiICYmIHBhcmFtcy50b0xvd2VyQ2FzZSgpLm1hdGNoKC9eWzAtOWEtZl0rJC8pKSB7XG4gICAgICB0aGlzLnNldEhleFZhbHVlSW5jbHVkaW5nVW51c2VkQml0cyhwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHMocGFyYW1zWydoZXgnXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydiaW4nXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEJ5QmluYXJ5U3RyaW5nKHBhcmFtc1snYmluJ10pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snYXJyYXknXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEJ5Qm9vbGVhbkFycmF5KHBhcmFtc1snYXJyYXknXSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgT2N0ZXRTdHJpbmc8YnIvPlxuICogQG5hbWUgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBPY3RldFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIEFTTi4xIE9jdGV0U3RyaW5nIHNpbXBsZSB0eXBlLjxici8+XG4gKiBTdXBwb3J0ZWQgXCJwYXJhbXNcIiBhdHRyaWJ1dGVzIGFyZTpcbiAqIDx1bD5cbiAqIDxsaT5zdHIgLSB0byBzZXQgYSBzdHJpbmcgYXMgYSB2YWx1ZTwvbGk+XG4gKiA8bGk+aGV4IC0gdG8gc2V0IGEgaGV4YWRlY2ltYWwgc3RyaW5nIGFzIGEgdmFsdWU8L2xpPlxuICogPGxpPm9iaiAtIHRvIHNldCBhIGVuY2Fwc3VsYXRlZCBBU04uMSB2YWx1ZSBieSBKU09OIG9iamVjdFxuICogd2hpY2ggaXMgZGVmaW5lZCBpbiB7QGxpbmsgS0pVUi5hc24xLkFTTjFVdGlsLm5ld09iamVjdH08L2xpPlxuICogPC91bD5cbiAqIE5PVEU6IEEgcGFyYW1ldGVyICdvYmonIGhhdmUgYmVlbiBzdXBwb3J0ZWRcbiAqIGZvciBcIk9DVEVUIFNUUklORywgZW5jYXBzdWxhdGVzXCIgc3RydWN0dXJlLlxuICogc2luY2UgYXNuMSAxLjAuMTEsIGpzcnNhc2lnbiA2LjEuMSAoMjAxNi1TZXAtMjUpLlxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKiBAZXhhbXBsZVxuICogLy8gZGVmYXVsdCBjb25zdHJ1Y3RvclxuICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcoKTtcbiAqIC8vIGluaXRpYWxpemUgd2l0aCBzdHJpbmdcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nKHtzdHI6IFwiYWFhXCJ9KTtcbiAqIC8vIGluaXRpYWxpemUgd2l0aCBoZXhhZGVjaW1hbCBzdHJpbmdcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nKHtoZXg6IFwiNjE2MTYxXCJ9KTtcbiAqIC8vIGluaXRpYWxpemUgd2l0aCBBU04xVXRpbC5uZXdPYmplY3QgYXJndW1lbnRcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nKHtvYmo6IHtzZXE6IFt7aW50OiAzfSwge3BybnN0cjogJ2FhYSd9XX19KTtcbiAqIC8vIGFib3ZlIGdlbmVyYXRlcyBhIEFTTi4xIGRhdGEgbGlrZSB0aGlzOlxuICogLy8gT0NURVQgU1RSSU5HLCBlbmNhcHN1bGF0ZXMge1xuICogLy8gICBTRVFVRU5DRSB7XG4gKiAvLyAgICAgSU5URUdFUiAzXG4gKiAvLyAgICAgUHJpbnRhYmxlU3RyaW5nICdhYWEnXG4gKiAvLyAgICAgfVxuICogLy8gICB9XG4gKi9cbktKVVIuYXNuMS5ERVJPY3RldFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBwYXJhbXMub2JqICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIG8gPSBLSlVSLmFzbjEuQVNOMVV0aWwubmV3T2JqZWN0KHBhcmFtcy5vYmopO1xuICAgIHBhcmFtcy5oZXggPSBvLmdldEVuY29kZWRIZXgoKTtcbiAgfVxuICBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjA0XCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgTnVsbFxuICogQG5hbWUgS0pVUi5hc24xLkRFUk51bGxcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE51bGxcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJOdWxsID0gZnVuY3Rpb24gKCkge1xuICBLSlVSLmFzbjEuREVSTnVsbC5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjA1XCI7XG4gIHRoaXMuaFRMViA9IFwiMDUwMFwiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSTnVsbCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBPYmplY3RJZGVudGlmaWVyXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllclxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgT2JqZWN0SWRlbnRpZmllclxuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J29pZCc6ICcyLjUuNC41J30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+b2lkIC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgb2lkIHN0cmluZyAoZXguIDIuNS40LjEzKTwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cbiAqL1xuS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIHZhciBpdG94ID0gZnVuY3Rpb24gKGkpIHtcbiAgICB2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xuICAgIGlmIChoLmxlbmd0aCA9PSAxKSBoID0gJzAnICsgaDtcbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgdmFyIHJvaWR0b3ggPSBmdW5jdGlvbiAocm9pZCkge1xuICAgIHZhciBoID0gJyc7XG4gICAgdmFyIGJpID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIocm9pZCwgMTApO1xuICAgIHZhciBiID0gYmkudG9TdHJpbmcoMik7XG4gICAgdmFyIHBhZExlbiA9IDcgLSBiLmxlbmd0aCAlIDc7XG4gICAgaWYgKHBhZExlbiA9PSA3KSBwYWRMZW4gPSAwO1xuICAgIHZhciBiUGFkID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWRMZW47IGkrKykgYlBhZCArPSAnMCc7XG4gICAgYiA9IGJQYWQgKyBiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGggLSAxOyBpICs9IDcpIHtcbiAgICAgIHZhciBiOCA9IGIuc3Vic3RyKGksIDcpO1xuICAgICAgaWYgKGkgIT0gYi5sZW5ndGggLSA3KSBiOCA9ICcxJyArIGI4O1xuICAgICAgaCArPSBpdG94KHBhcnNlSW50KGI4LCAyKSk7XG4gICAgfVxuICAgIHJldHVybiBoO1xuICB9O1xuICBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllci5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjA2XCI7XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmdcbiAgICogQG5hbWUgc2V0VmFsdWVIZXhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5ld0hleFN0cmluZyBoZXhhZGVjaW1hbCB2YWx1ZSBvZiBPSUQgYnl0ZXNcbiAgICovXG4gIHRoaXMuc2V0VmFsdWVIZXggPSBmdW5jdGlvbiAobmV3SGV4U3RyaW5nKSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMucyA9IG51bGw7XG4gICAgdGhpcy5oViA9IG5ld0hleFN0cmluZztcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhIE9JRCBzdHJpbmc8YnIvPlxuICAgKiBAbmFtZSBzZXRWYWx1ZU9pZFN0cmluZ1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gb2lkU3RyaW5nIE9JRCBzdHJpbmcgKGV4LiAyLjUuNC4xMylcbiAgICogQGV4YW1wbGVcbiAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllcigpO1xuICAgKiBvLnNldFZhbHVlT2lkU3RyaW5nKFwiMi41LjQuMTNcIik7XG4gICAqL1xuICB0aGlzLnNldFZhbHVlT2lkU3RyaW5nID0gZnVuY3Rpb24gKG9pZFN0cmluZykge1xuICAgIGlmICghb2lkU3RyaW5nLm1hdGNoKC9eWzAtOS5dKyQvKSkge1xuICAgICAgdGhyb3cgXCJtYWxmb3JtZWQgb2lkIHN0cmluZzogXCIgKyBvaWRTdHJpbmc7XG4gICAgfVxuICAgIHZhciBoID0gJyc7XG4gICAgdmFyIGEgPSBvaWRTdHJpbmcuc3BsaXQoJy4nKTtcbiAgICB2YXIgaTAgPSBwYXJzZUludChhWzBdKSAqIDQwICsgcGFyc2VJbnQoYVsxXSk7XG4gICAgaCArPSBpdG94KGkwKTtcbiAgICBhLnNwbGljZSgwLCAyKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGggKz0gcm9pZHRveChhW2ldKTtcbiAgICB9XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMucyA9IG51bGw7XG4gICAgdGhpcy5oViA9IGg7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBPSUQgbmFtZVxuICAgKiBAbmFtZSBzZXRWYWx1ZU5hbWVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9pZE5hbWUgT0lEIG5hbWUgKGV4LiAnc2VydmVyQXV0aCcpXG4gICAqIEBzaW5jZSAxLjAuMVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogT0lEIG5hbWUgc2hhbGwgYmUgZGVmaW5lZCBpbiAnS0pVUi5hc24xLng1MDkuT0lELm5hbWUyb2lkTGlzdCcuXG4gICAqIE90aGVyd2lzZSByYWlzZSBlcnJvci5cbiAgICogQGV4YW1wbGVcbiAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllcigpO1xuICAgKiBvLnNldFZhbHVlTmFtZShcInNlcnZlckF1dGhcIik7XG4gICAqL1xuICB0aGlzLnNldFZhbHVlTmFtZSA9IGZ1bmN0aW9uIChvaWROYW1lKSB7XG4gICAgdmFyIG9pZCA9IEtKVVIuYXNuMS54NTA5Lk9JRC5uYW1lMm9pZChvaWROYW1lKTtcbiAgICBpZiAob2lkICE9PSAnJykge1xuICAgICAgdGhpcy5zZXRWYWx1ZU9pZFN0cmluZyhvaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBcIkRFUk9iamVjdElkZW50aWZpZXIgb2lkTmFtZSB1bmRlZmluZWQ6IFwiICsgb2lkTmFtZTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5oVjtcbiAgfTtcbiAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmIChwYXJhbXMubWF0Y2goL15bMC0yXS5bMC05Ll0rJC8pKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcocGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVOYW1lKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbXMub2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcocGFyYW1zLm9pZCk7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuaGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zLmhleCk7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMubmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFZhbHVlTmFtZShwYXJhbXMubmFtZSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIEVudW1lcmF0ZWRcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBFbnVtZXJhdGVkXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+aW50IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGludGVnZXIgdmFsdWU8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZzwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKiBAZXhhbXBsZVxuICogbmV3IEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkKDEyMyk7XG4gKiBuZXcgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQoe2ludDogMTIzfSk7XG4gKiBuZXcgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQoe2hleDogJzFmYWQnfSk7XG4gKi9cbktKVVIuYXNuMS5ERVJFbnVtZXJhdGVkID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSRW51bWVyYXRlZC5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjBhXCI7XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgVG9tIFd1J3MgQmlnSW50ZWdlciBvYmplY3RcbiAgICogQG5hbWUgc2V0QnlCaWdJbnRlZ2VyXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSRW51bWVyYXRlZCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7QmlnSW50ZWdlcn0gYmlnSW50ZWdlclZhbHVlIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRCeUJpZ0ludGVnZXIgPSBmdW5jdGlvbiAoYmlnSW50ZWdlclZhbHVlKSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuaFYgPSBLSlVSLmFzbjEuQVNOMVV0aWwuYmlnSW50VG9NaW5Ud29zQ29tcGxlbWVudHNIZXgoYmlnSW50ZWdlclZhbHVlKTtcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXG4gICAqIEBuYW1lIHNldEJ5SW50ZWdlclxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IGludGVnZXIgdmFsdWUgdG8gc2V0XG4gICAqL1xuICB0aGlzLnNldEJ5SW50ZWdlciA9IGZ1bmN0aW9uIChpbnRWYWx1ZSkge1xuICAgIHZhciBiaSA9IG5ldyBfanNibi5CaWdJbnRlZ2VyKFN0cmluZyhpbnRWYWx1ZSksIDEwKTtcbiAgICB0aGlzLnNldEJ5QmlnSW50ZWdlcihiaSk7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgaW50ZWdlciB2YWx1ZVxuICAgKiBAbmFtZSBzZXRWYWx1ZUhleFxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gaGV4YWRlY2ltYWwgc3RyaW5nIG9mIGludGVnZXIgdmFsdWVcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIDxici8+XG4gICAqIE5PVEU6IFZhbHVlIHNoYWxsIGJlIHJlcHJlc2VudGVkIGJ5IG1pbmltdW0gb2N0ZXQgbGVuZ3RoIG9mXG4gICAqIHR3bydzIGNvbXBsZW1lbnQgcmVwcmVzZW50YXRpb24uXG4gICAqL1xuICB0aGlzLnNldFZhbHVlSGV4ID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZykge1xuICAgIHRoaXMuaFYgPSBuZXdIZXhTdHJpbmc7XG4gIH07XG4gIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5oVjtcbiAgfTtcbiAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zWydpbnQnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEJ5SW50ZWdlcihwYXJhbXNbJ2ludCddKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zWydoZXgnXSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFVURjhTdHJpbmdcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJVVEY4U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBVVEY4U3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSVVRGOFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUlVURjhTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjBjXCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJVVEY4U3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBOdW1lcmljU3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgTnVtZXJpY1N0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUk51bWVyaWNTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIxMlwiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgUHJpbnRhYmxlU3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBQcmludGFibGVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjEzXCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFRlbGV0ZXhTdHJpbmdcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJUZWxldGV4U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBUZWxldGV4U3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjE0XCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJUZWxldGV4U3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBJQTVTdHJpbmdcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJJQTVTdHJpbmdcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIElBNVN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUklBNVN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUklBNVN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgdGhpcy5oVCA9IFwiMTZcIjtcbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUklBNVN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgVVRDVGltZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUlVUQ1RpbWVcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFVUQ1RpbWVcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnMTMwNDMwMjM1OTU5Wid9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZVxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+c3RyIC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgc3RyaW5nIChleC4nMTMwNDMwMjM1OTU5WicpPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPGxpPmRhdGUgLSBzcGVjaWZ5IERhdGUgb2JqZWN0LjwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKiA8aDQ+RVhBTVBMRVM8L2g0PlxuICogQGV4YW1wbGVcbiAqIGQxID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKCk7XG4gKiBkMS5zZXRTdHJpbmcoJzEzMDQzMDEyNTk1OVonKTtcbiAqXG4gKiBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSh7J3N0cic6ICcxMzA0MzAxMjU5NTlaJ30pO1xuICogZDMgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoeydkYXRlJzogbmV3IERhdGUoRGF0ZS5VVEMoMjAxNSwgMCwgMzEsIDAsIDAsIDAsIDApKX0pO1xuICogZDQgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoJzEzMDQzMDEyNTk1OVonKTtcbiAqL1xuS0pVUi5hc24xLkRFUlVUQ1RpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJVVENUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIxN1wiO1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGEgRGF0ZSBvYmplY3Q8YnIvPlxuICAgKiBAbmFtZSBzZXRCeURhdGVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJVVENUaW1lI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtEYXRlfSBkYXRlT2JqZWN0IERhdGUgb2JqZWN0IHRvIHNldCBBU04uMSB2YWx1ZShWKVxuICAgKiBAZXhhbXBsZVxuICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKCk7XG4gICAqIG8uc2V0QnlEYXRlKG5ldyBEYXRlKFwiMjAxNi8xMi8zMVwiKSk7XG4gICAqL1xuICB0aGlzLnNldEJ5RGF0ZSA9IGZ1bmN0aW9uIChkYXRlT2JqZWN0KSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGVPYmplY3Q7XG4gICAgdGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ3V0YycpO1xuICAgIHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5kYXRlID09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRoaXMucyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ3V0YycpO1xuICAgICAgdGhpcy5oViA9IHN0b2hleCh0aGlzLnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oVjtcbiAgfTtcbiAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHBhcmFtcy5zdHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zLnN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09IFwic3RyaW5nXCIgJiYgcGFyYW1zLm1hdGNoKC9eWzAtOV17MTJ9WiQvKSkge1xuICAgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5oZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRTdHJpbmdIZXgocGFyYW1zLmhleCk7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldEJ5RGF0ZShwYXJhbXMuZGF0ZSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJVVENUaW1lLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWRUaW1lXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBHZW5lcmFsaXplZFRpbWVcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnMjAxMzA0MzAyMzU5NTlaJ30pXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHdpdGhNaWxsaXMgZmxhZyB0byBzaG93IG1pbGxpc2Vjb25kcyBvciBub3RcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPnN0ciAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIHN0cmluZyAoZXguJzIwMTMwNDMwMjM1OTU5WicpPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPGxpPmRhdGUgLSBzcGVjaWZ5IERhdGUgb2JqZWN0LjwvbGk+XG4gKiA8bGk+bWlsbGlzIC0gc3BlY2lmeSBmbGFnIHRvIHNob3cgbWlsbGlzZWNvbmRzIChmcm9tIDEuMC42KTwvbGk+XG4gKiA8L3VsPlxuICogTk9URTE6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICogTk9URTI6ICd3aXRoTWlsbGlzJyBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgZnJvbSBhc24xIDEuMC42LlxuICovXG5LSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIxOFwiO1xuICB0aGlzLndpdGhNaWxsaXMgPSBmYWxzZTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhIERhdGUgb2JqZWN0XG4gICAqIEBuYW1lIHNldEJ5RGF0ZVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZSNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZU9iamVjdCBEYXRlIG9iamVjdCB0byBzZXQgQVNOLjEgdmFsdWUoVilcbiAgICogQGV4YW1wbGVcbiAgICogV2hlbiB5b3Ugc3BlY2lmeSBVVEMgdGltZSwgdXNlICdEYXRlLlVUQycgbWV0aG9kIGxpa2UgdGhpczo8YnIvPlxuICAgKiBvMSA9IG5ldyBERVJVVENUaW1lKCk7XG4gICAqIG8xLnNldEJ5RGF0ZShkYXRlKTtcbiAgICpcbiAgICogZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMTUsIDAsIDMxLCAyMywgNTksIDU5LCAwKSk7ICMyMDE1SkFOMzEgMjM6NTk6NTlcbiAgICovXG4gIHRoaXMuc2V0QnlEYXRlID0gZnVuY3Rpb24gKGRhdGVPYmplY3QpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcbiAgICB0aGlzLnMgPSB0aGlzLmZvcm1hdERhdGUodGhpcy5kYXRlLCAnZ2VuJywgdGhpcy53aXRoTWlsbGlzKTtcbiAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XG4gIH07XG4gIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5kYXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB0aGlzLnMgPSB0aGlzLmZvcm1hdERhdGUodGhpcy5kYXRlLCAnZ2VuJywgdGhpcy53aXRoTWlsbGlzKTtcbiAgICAgIHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChwYXJhbXMuc3RyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtcy5zdHIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiICYmIHBhcmFtcy5tYXRjaCgvXlswLTldezE0fVokLykpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuaGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nSGV4KHBhcmFtcy5oZXgpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRCeURhdGUocGFyYW1zLmRhdGUpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLm1pbGxpcyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy53aXRoTWlsbGlzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZSwgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFNlcXVlbmNlXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSU2VxdWVuY2VcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFNlcXVlbmNlXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXQgZWxlbWVudHMgb2YgY29udGVudDwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJTZXF1ZW5jZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUlNlcXVlbmNlLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIzMFwiO1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGggPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXNuMUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYXNuMU9iaiA9IHRoaXMuYXNuMUFycmF5W2ldO1xuICAgICAgaCArPSBhc24xT2JqLmdldEVuY29kZWRIZXgoKTtcbiAgICB9XG4gICAgdGhpcy5oViA9IGg7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJTZXF1ZW5jZSwgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFNldFxuICogQG5hbWUgS0pVUi5hc24xLkRFUlNldFxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgU2V0XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXQgZWxlbWVudHMgb2YgY29udGVudDwvbGk+XG4gKiA8bGk+c29ydGZsYWcgLSBmbGFnIGZvciBzb3J0IChkZWZhdWx0OiB0cnVlKS4gQVNOLjEgQkVSIGlzIG5vdCBzb3J0ZWQgaW4gJ1NFVCBPRicuPC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFMTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuPGJyLz5cbiAqIE5PVEUyOiBzb3J0ZmxhZyBpcyBzdXBwb3J0ZWQgc2luY2UgMS4wLjUuXG4gKi9cbktKVVIuYXNuMS5ERVJTZXQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJTZXQuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjMxXCI7XG4gIHRoaXMuc29ydEZsYWcgPSB0cnVlOyAvLyBpdGVtIHNoYWxsIGJlIHNvcnRlZCBvbmx5IGluIEFTTi4xIERFUlxuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXNuMUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYXNuMU9iaiA9IHRoaXMuYXNuMUFycmF5W2ldO1xuICAgICAgYS5wdXNoKGFzbjFPYmouZ2V0RW5jb2RlZEhleCgpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc29ydEZsYWcgPT0gdHJ1ZSkgYS5zb3J0KCk7XG4gICAgdGhpcy5oViA9IGEuam9pbignJyk7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcy5zb3J0ZmxhZyAhPSBcInVuZGVmaW5lZFwiICYmIHBhcmFtcy5zb3J0ZmxhZyA9PSBmYWxzZSkgdGhpcy5zb3J0RmxhZyA9IGZhbHNlO1xuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJTZXQsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBUYWdnZWRPYmplY3RcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3RcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFRhZ2dlZE9iamVjdFxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIFBhcmFtZXRlciAndGFnTm9OZXgnIGlzIEFTTi4xIHRhZyhUKSB2YWx1ZSBmb3IgdGhpcyBvYmplY3QuXG4gKiBGb3IgZXhhbXBsZSwgaWYgeW91IGZpbmQgJ1sxXScgdGFnIGluIGEgQVNOLjEgZHVtcCxcbiAqICd0YWdOb0hleCcgd2lsbCBiZSAnYTEnLlxuICogPGJyLz5cbiAqIEFzIGZvciBvcHRpb25hbCBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSAqQU5ZKiBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+ZXhwbGljaXQgLSBzcGVjaWZ5IHRydWUgaWYgdGhpcyBpcyBleHBsaWNpdCB0YWcgb3RoZXJ3aXNlIGZhbHNlXG4gKiAgICAgKGRlZmF1bHQgaXMgJ3RydWUnKS48L2xpPlxuICogPGxpPnRhZyAtIHNwZWNpZnkgdGFnIChkZWZhdWx0IGlzICdhMCcgd2hpY2ggbWVhbnMgWzBdKTwvbGk+XG4gKiA8bGk+b2JqIC0gc3BlY2lmeSBBU04xT2JqZWN0IHdoaWNoIGlzIHRhZ2dlZDwvbGk+XG4gKiA8L3VsPlxuICogQGV4YW1wbGVcbiAqIGQxID0gbmV3IEtKVVIuYXNuMS5ERVJVVEY4U3RyaW5nKHsnc3RyJzonYSd9KTtcbiAqIGQyID0gbmV3IEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3QoeydvYmonOiBkMX0pO1xuICogaGV4ID0gZDIuZ2V0RW5jb2RlZEhleCgpO1xuICovXG5LSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0LnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5oVCA9IFwiYTBcIjtcbiAgdGhpcy5oViA9ICcnO1xuICB0aGlzLmlzRXhwbGljaXQgPSB0cnVlO1xuICB0aGlzLmFzbjFPYmplY3QgPSBudWxsO1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGFuIEFTTjFPYmplY3RcbiAgICogQG5hbWUgc2V0U3RyaW5nXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0I1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtCb29sZWFufSBpc0V4cGxpY2l0RmxhZyBmbGFnIGZvciBleHBsaWNpdC9pbXBsaWNpdCB0YWdcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSB0YWdOb0hleCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgdGFnXG4gICAqIEBwYXJhbSB7QVNOMU9iamVjdH0gYXNuMU9iamVjdCBBU04uMSB0byBlbmNhcHN1bGF0ZVxuICAgKi9cbiAgdGhpcy5zZXRBU04xT2JqZWN0ID0gZnVuY3Rpb24gKGlzRXhwbGljaXRGbGFnLCB0YWdOb0hleCwgYXNuMU9iamVjdCkge1xuICAgIHRoaXMuaFQgPSB0YWdOb0hleDtcbiAgICB0aGlzLmlzRXhwbGljaXQgPSBpc0V4cGxpY2l0RmxhZztcbiAgICB0aGlzLmFzbjFPYmplY3QgPSBhc24xT2JqZWN0O1xuICAgIGlmICh0aGlzLmlzRXhwbGljaXQpIHtcbiAgICAgIHRoaXMuaFYgPSB0aGlzLmFzbjFPYmplY3QuZ2V0RW5jb2RlZEhleCgpO1xuICAgICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaFYgPSBudWxsO1xuICAgICAgdGhpcy5oVExWID0gYXNuMU9iamVjdC5nZXRFbmNvZGVkSGV4KCk7XG4gICAgICB0aGlzLmhUTFYgPSB0aGlzLmhUTFYucmVwbGFjZSgvXi4uLywgdGFnTm9IZXgpO1xuICAgICAgdGhpcy5pc01vZGlmaWVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtc1sndGFnJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5oVCA9IHBhcmFtc1sndGFnJ107XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGFyYW1zWydleHBsaWNpdCddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuaXNFeHBsaWNpdCA9IHBhcmFtc1snZXhwbGljaXQnXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbJ29iaiddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYXNuMU9iamVjdCA9IHBhcmFtc1snb2JqJ107XG4gICAgICB0aGlzLnNldEFTTjFPYmplY3QodGhpcy5pc0V4cGxpY2l0LCB0aGlzLmhULCB0aGlzLmFzbjFPYmplY3QpO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0LCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLllBSE9PID0gdm9pZCAwO1xuLyohXG5Db3B5cmlnaHQgKGMpIDIwMTEsIFlhaG9vISBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5Db2RlIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0QgTGljZW5zZTpcbmh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL3l1aS9saWNlbnNlLmh0bWxcbnZlcnNpb246IDIuOS4wXG4qL1xudmFyIFlBSE9PID0gZXhwb3J0cy5ZQUhPTyA9IHt9O1xuWUFIT08ubGFuZyA9IHtcbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gc2V0IHVwIHRoZSBwcm90b3R5cGUsIGNvbnN0cnVjdG9yIGFuZCBzdXBlcmNsYXNzIHByb3BlcnRpZXMgdG9cbiAgICogc3VwcG9ydCBhbiBpbmhlcml0YW5jZSBzdHJhdGVneSB0aGF0IGNhbiBjaGFpbiBjb25zdHJ1Y3RvcnMgYW5kIG1ldGhvZHMuXG4gICAqIFN0YXRpYyBtZW1iZXJzIHdpbGwgbm90IGJlIGluaGVyaXRlZC5cbiAgICpcbiAgICogQG1ldGhvZCBleHRlbmRcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJjICAgdGhlIG9iamVjdCB0byBtb2RpZnlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJjIHRoZSBvYmplY3QgdG8gaW5oZXJpdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzICBhZGRpdGlvbmFsIHByb3BlcnRpZXMvbWV0aG9kcyB0byBhZGQgdG8gdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3MgcHJvdG90eXBlLiAgVGhlc2Ugd2lsbCBvdmVycmlkZSB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGluZyBpdGVtcyBvYnRhaW5lZCBmcm9tIHRoZSBzdXBlcmNsYXNzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcHJlc2VudC5cbiAgICovXG4gIGV4dGVuZDogZnVuY3Rpb24gKHN1YmMsIHN1cGVyYywgb3ZlcnJpZGVzKSB7XG4gICAgaWYgKCFzdXBlcmMgfHwgIXN1YmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllBSE9PLmxhbmcuZXh0ZW5kIGZhaWxlZCwgcGxlYXNlIGNoZWNrIHRoYXQgXCIgKyBcImFsbCBkZXBlbmRlbmNpZXMgYXJlIGluY2x1ZGVkLlwiKTtcbiAgICB9XG4gICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICBGLnByb3RvdHlwZSA9IHN1cGVyYy5wcm90b3R5cGU7XG4gICAgc3ViYy5wcm90b3R5cGUgPSBuZXcgRigpO1xuICAgIHN1YmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViYztcbiAgICBzdWJjLnN1cGVyY2xhc3MgPSBzdXBlcmMucHJvdG90eXBlO1xuICAgIGlmIChzdXBlcmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID09IE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAgIHN1cGVyYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdXBlcmM7XG4gICAgfVxuICAgIGlmIChvdmVycmlkZXMpIHtcbiAgICAgIHZhciBpO1xuICAgICAgZm9yIChpIGluIG92ZXJyaWRlcykge1xuICAgICAgICBzdWJjLnByb3RvdHlwZVtpXSA9IG92ZXJyaWRlc1tpXTtcbiAgICAgIH1cbiAgICAgIC8qXG4gICAgICAgKiBJRSB3aWxsIG5vdCBlbnVtZXJhdGUgbmF0aXZlIGZ1bmN0aW9ucyBpbiBhIGRlcml2ZWQgb2JqZWN0IGV2ZW4gaWYgdGhlXG4gICAgICAgKiBmdW5jdGlvbiB3YXMgb3ZlcnJpZGRlbi4gIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBzcGVjaWZpYyBmdW5jdGlvbnNcbiAgICAgICAqIHdlIGNhcmUgYWJvdXQgb24gdGhlIE9iamVjdCBwcm90b3R5cGUuXG4gICAgICAgKiBAcHJvcGVydHkgX0lFRW51bUZpeFxuICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gciAgdGhlIG9iamVjdCB0byByZWNlaXZlIHRoZSBhdWdtZW50YXRpb25cbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHMgIHRoZSBvYmplY3QgdGhhdCBzdXBwbGllcyB0aGUgcHJvcGVydGllcyB0byBhdWdtZW50XG4gICAgICAgKiBAc3RhdGljXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICovXG4gICAgICB2YXIgX0lFRW51bUZpeCA9IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBBREQgPSBbXCJ0b1N0cmluZ1wiLCBcInZhbHVlT2ZcIl07XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoL01TSUUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICBfSUVFbnVtRml4ID0gZnVuY3Rpb24gKHIsIHMpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBBREQubGVuZ3RoOyBpID0gaSArIDEpIHtcbiAgICAgICAgICAgICAgdmFyIGZuYW1lID0gQUREW2ldLFxuICAgICAgICAgICAgICAgIGYgPSBzW2ZuYW1lXTtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmID09PSAnZnVuY3Rpb24nICYmIGYgIT0gT2JqZWN0LnByb3RvdHlwZVtmbmFtZV0pIHtcbiAgICAgICAgICAgICAgICByW2ZuYW1lXSA9IGY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChleCkge31cbiAgICAgIDtcbiAgICAgIF9JRUVudW1GaXgoc3ViYy5wcm90b3R5cGUsIG92ZXJyaWRlcyk7XG4gICAgfVxuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9zeXN0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZVwiKSk7XG52YXIgX3N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpKTtcbnZhciBfc3lzdGVtMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5uZXR3b3JrXCIpKTtcbnZhciBfc3lzdGVtNCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yb3V0ZXJcIikpO1xudmFyIF9zeXN0ZW01ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmFwcFwiKSk7XG52YXIgX3N5c3RlbTYgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2hcIikpO1xudmFyIF9zeXN0ZW03ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmZpbGVcIikpO1xudmFyIF9zeXN0ZW04ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnJlcXVlc3RcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbmZ1bmN0aW9uIGJ1aWxkVW5pcXVlSWQodCkge1xuICBjb25zdCBlID0gW107XG4gIGUucHVzaChEZXZpY2VVdGlsLmdldEFkdmVydGlzaW5nSWQoKSksIGUucHVzaChEZXZpY2VVdGlsLmdldEFuZHJvaWRJZCgpKSwgZS5wdXNoKERldmljZVV0aWwuZ2V0T0FJRCgpKSwgUHJvbWlzZS5hbGwoZSkudGhlbihlID0+IHtcbiAgICBjb25zdCBuID0gZVswXTtcbiAgICBjb25zdCBvID0gZVsxXTtcbiAgICBjb25zdCBpID0gZVsyXTtcbiAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5NT0JJTEVfQURWRVJUSVNJTkdfSUQsIG4pO1xuICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLk1PQklMRV9BTkRST0lEX0lELCBvKTtcbiAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5NT0JJTEVfT0FJRCwgaSk7XG4gICAgdW5pcXVlaWRDYWNoZSA9IG8gfHwgbiB8fCBpO1xuICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoXCJ1bWVuZ191bmlxdWVpZFwiLCB1bmlxdWVpZENhY2hlKTtcbiAgICB0KHVuaXF1ZWlkQ2FjaGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1vbmpzTW9kdWxlKHQsIGUpIHtcbiAgcmV0dXJuIGUgPSB7XG4gICAgZXhwb3J0czoge31cbiAgfSwgdChlLCBlLmV4cG9ydHMpLCBlLmV4cG9ydHM7XG59XG5mdW5jdGlvbiBNRDUkMSh0KSB7XG4gIHJldHVybiBNRDUodCk7XG59XG5mdW5jdGlvbiBlbmNvZGUodCkge1xuICByZXR1cm4gQmFzZTY0XzIuZW5jb2RlKHQsICExKTtcbn1cbmZ1bmN0aW9uIGRlY29kZSh0KSB7XG4gIHJldHVybiBCYXNlNjRfMi5kZWNvZGUodCk7XG59XG5mdW5jdGlvbiBjaGVja0VtcHR5QXJndW1lbnQodCkge1xuICByZXR1cm4gdC5sZW5ndGggJiYgdGhpcy5jaGVja0lkKHRbMF0pO1xufVxuZnVuY3Rpb24gY2hlY2tJZCh0KSB7XG4gIHJldHVybiB0ICYmIFwic3RyaW5nXCIgPT0gdHlwZW9mIHQ7XG59XG5mdW5jdGlvbiB0b1N0cih0KSB7XG4gIGxldCBlID0gXCJcIjtcbiAgaWYgKHQpIHRyeSB7XG4gICAgZSA9IEpTT04uc3RyaW5naWZ5KHQpO1xuICB9IGNhdGNoICh0KSB7fVxuICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkodCkge1xuICBpZiAodCkgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0KTtcbiAgfSBjYXRjaCAodCkge31cbiAgcmV0dXJuIFtdO1xufVxuZnVuY3Rpb24gdG9PYmplY3QodCkge1xuICBpZiAodCkgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0KTtcbiAgfSBjYXRjaCAodCkge31cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBjaGVja0F0dHJPclN0cmluZyh0KSB7XG4gIHJldHVybiAhKCF0IHx8IFwic3RyaW5nXCIgIT0gdHlwZW9mIHQgJiYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgaXNBcnJheSh0KSkpO1xufVxuZnVuY3Rpb24gaXNBcnJheSh0KSB7XG4gIHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwodCk7XG59XG5mdW5jdGlvbiBpc05vdEFOdW1iZXIodCkge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlSW50KHQsIDEwKSk7XG59XG5mdW5jdGlvbiBjaGVja01ENSh0LCBlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHQgPT09IE1ENShlKTtcbiAgfSBjYXRjaCAodCkge1xuICAgIHJldHVybiAhMTtcbiAgfVxufVxuZnVuY3Rpb24gTG9vcGVyKCkge31cbmZ1bmN0aW9uIHNlbmQodCkge1xuICBfc3lzdGVtMy5kZWZhdWx0LmdldFR5cGUoe1xuICAgIHN1Y2Nlc3MoZSkge1xuICAgICAgXCJub25lXCIgIT09IGUudHlwZSAmJiBoYXNFbnZlbG9wZSh0LCAoZSwgbikgPT4ge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgICBtZDVLZXk6IG4sXG4gICAgICAgICAgICAgIHR5cGU6IFwic2Vjb25kXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuc2VuZChlLCAoKSA9PiB7XG4gICAgICAgICAgICAgIFN0b3JlUXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVNZXNzYWdlKG51bGwpO1xuICAgICAgICAgICAgICByZWFsU2VuZCh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHJlYWxTZW5kKHQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmYWlsKCkge31cbiAgfSk7XG59XG5mdW5jdGlvbiBoYXNFbnZlbG9wZSh0LCBlKSB7XG4gIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLktFWV9OT19TRU5EX1JFUVVFU1RfS0VZUywgbiA9PiB7XG4gICAgaWYgKCFuKSByZXR1cm4gdm9pZCBlKCExLCBudWxsKTtcbiAgICBjb25zdCBvID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KG4pO1xuICAgIGlmICghbyB8fCAwID09PSBvLmxlbmd0aCkgcmV0dXJuIHZvaWQgZSghMSwgbnVsbCk7XG4gICAgZm9yIChjb25zdCBuIGluIG8pIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIG4pKSB7XG4gICAgICBjb25zdCBpID0gb1tuXTtcbiAgICAgIGlmIChpKSB7XG4gICAgICAgIGNvbnN0IG4gPSBpLmluZGV4T2YoY29uc3RhbnRzLktFWV9FVkVOVF9QUkVGSVgpO1xuICAgICAgICBpZiAoMCA9PT0gbiAmJiB0ID09PSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UKSByZXR1cm4gdm9pZCBlKCEwLCBpKTtcbiAgICAgICAgY29uc3QgbyA9IGkuaW5kZXhPZihjb25zdGFudHMuS0VZX0hBTEZfU0VTU0lPTl9QUkVGSVgpO1xuICAgICAgICBpZiAoMCA9PT0gbyAmJiB0ID09PSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fSEFMRikgcmV0dXJuIHZvaWQgZSghMCwgaSk7XG4gICAgICAgIGNvbnN0IHIgPSBpLmluZGV4T2YoY29uc3RhbnRzLktFWV9DTE9TRV9TRVNTSU9OX1BSRUZJWCk7XG4gICAgICAgIGlmICgwID09PSByICYmIHQgPT09IGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRSkgcmV0dXJuIHZvaWQgZSghMCwgaSk7XG4gICAgICB9XG4gICAgfVxuICAgIGUoITEsIG51bGwpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlYWxTZW5kKHQpIHtcbiAgaWYgKFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5wYXJhbXNJc1ZhbGlkKHQpKSBpZiAodCA9PT0gY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEYpIHtcbiAgICBjb25zdCBlID0gUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLmJ1aWxkU2VuZENvbnRlbnQodCwgbnVsbCksXG4gICAgICBuID0gZS5kYXRhO1xuICAgIG4uYW5hbHl0aWNzICYmIFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5zZW5kKGUsIHQgPT4ge1xuICAgICAgdCAmJiAtMSAhPT0gdC5pbmRleE9mKGNvbnN0YW50cy5LRVlfSEFMRl9TRVNTSU9OX1BSRUZJWCkgJiYgKEhlYWRlci5nZXRJbnN0YW5jZSgpLnNldEZpcnN0U2VuZEZsYWcoKSwgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuQVBQX0ZJUlNUX09QRU5fRkxBRywgXCJmYWxzZVwiKSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodCA9PT0gY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFKSB7XG4gICAgY29uc3QgZSA9IFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5idWlsZFNlbmRDb250ZW50KHQsIG51bGwpO1xuICAgIGlmIChlICYmIGUuZGF0YSkge1xuICAgICAgY29uc3QgdCA9IGUuZGF0YTtcbiAgICAgIHQuYW5hbHl0aWNzICYmIFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5zZW5kKGUpO1xuICAgIH1cbiAgfSBlbHNlIHQgPT09IGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfRVZFTlQgJiYgRXZlbnRTdG9yZVF1ZXVlLmdldEluc3RhbmNlKCkucmVhZEVrdkRhdGFzKGUgPT4ge1xuICAgIGlmICghZSB8fCAwID09PSBlLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IG4gPSBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuYnVpbGRTZW5kQ29udGVudCh0LCBlKTtcbiAgICBpZiAobikge1xuICAgICAgY29uc3QgdCA9IG4uZGF0YTtcbiAgICAgIHQuYW5hbHl0aWNzICYmIChSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuc2VuZChuKSwgRXZlbnRDb250cm9sbGVyLmdldEluc3RhbmNlKCkuc2V0U2VuZFRpbWUoKSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHNlbmRBbGwoKSB7XG4gIGlmICgwID09PSB0aW1lKSB7XG4gICAgdGltZSA9IDEwO1xuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aW1lIC09IDE7XG4gICAgICAwID09PSB0aW1lICYmIGNsZWFySW50ZXJ2YWwodCk7XG4gICAgfSwgMTAwKTtcbiAgICBIZWFkZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZWFkZXIoKSA/IChzZW5kKGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGKSwgc2VuZChjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fQ0xPU0UpLCBzZW5kKGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfRVZFTlQpKSA6IHNldFRpbWVvdXQoc2VuZEFsbCwgMTAwKTtcbiAgfVxufVxuZnVuY3Rpb24gUGFnZUNvbnRyb2xsZXIoKSB7XG4gIHRoaXMuX3BhZ2VsaXN0ID0gW10sIHRoaXMuX2N1cnJlbnRQYWdlID0ge30sIHRoaXMucGFnZU9iamVjdCA9IHt9O1xufVxuZnVuY3Rpb24gVW1lbmdBbmFseXNpc0xpYigpIHtcbiAgdGhpcy5wYWdlQ29udHJvbGxlciA9IG5ldyBQYWdlQ29udHJvbGxlcigpO1xufVxuZnVuY3Rpb24gaXNJbml0KCkge1xuICByZXR1cm4gISFpbml0ZWQgfHwgKGNvbnNvbGUuZXJyb3IoXCJbYXBwLnV4XSA9PT4gb25DcmVhdGUgbm90IGludm9rZWQgaW5pdCgpIG1ldGhvZFwiKSwgITEpO1xufVxuZnVuY3Rpb24gc2VuZERhdGFzKCkge1xuICBIZWFkZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZWFkZXIoKSA/IChSZXF1ZXN0LnNlbmQoY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEYpLCBSZXF1ZXN0LnNlbmQoY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFKSwgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCB0ID0+IHtcbiAgICB0ID09PSBjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX1NUQVJUX1NFTkRfVkFMVUUgJiYgUmVxdWVzdC5zZW5kKGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfRVZFTlQpO1xuICB9KSkgOiBzZXRUaW1lb3V0KHNlbmREYXRhcywgMTAwKTtcbn1cbmZ1bmN0aW9uIFNka1VwZGF0ZXIoKSB7XG4gIHRoaXMudXJsID0gY29uc3RhbnRzLlNES19VUERBVEVfU0VSVkVSX0FERFJFU1M7XG59XG5mdW5jdGlvbiBQYWdlKHQpIHtcbiAgaWYgKHQpIHtcbiAgICBjb25zdCBlID0gdC5vblNob3c7XG4gICAgdC5vblNob3cgPSBmdW5jdGlvbiAoLi4udCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgVW1lbmdBbmFseXNpcy5yZXN1bWUodGhpcyk7XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgaWYgKGUpIHJldHVybiBlLmFwcGx5KHRoaXMsIHQpO1xuICAgIH07XG4gICAgY29uc3QgbiA9IHQub25IaWRlO1xuICAgIHQub25IaWRlID0gZnVuY3Rpb24gKC4uLnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIFVtZW5nQW5hbHlzaXMucGF1c2UodGhpcyk7XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgaWYgKG4pIHJldHVybiBuLmFwcGx5KHRoaXMsIHQpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5jb25zdCBTdG9yYWdlVXRpbCA9IHtcbiAgICBwdXREYXRhKHQsIGUsIG4sIG8pIHtcbiAgICAgIF9zeXN0ZW0uZGVmYXVsdC5zZXQoe1xuICAgICAgICBrZXk6IHQsXG4gICAgICAgIHZhbHVlOiBlLFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBuICYmIG4odCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwodCwgZSkge1xuICAgICAgICAgIG8gJiYgbyh0LCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXREYXRhKHQsIGUsIG4pIHtcbiAgICAgIF9zeXN0ZW0uZGVmYXVsdC5nZXQoe1xuICAgICAgICBrZXk6IHQsXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIGUgJiYgZSh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCh0LCBlKSB7XG4gICAgICAgICAgbiAmJiBuKHQsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZURhdGEodCwgZSkge1xuICAgICAgX3N5c3RlbS5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICAgIGtleTogdCxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICBlICYmIGUoITApO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsKCkge1xuICAgICAgICAgIGUgJiYgZSghMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgY29uc3RhbnRzID0ge1xuICAgIEtFWV9OT19TRU5EX1JFUVVFU1RfS0VZUzogXCJ1bWVuZ19rZXlfbm9fc2VuZF9yZXF1ZXN0XCIsXG4gICAgU0VTU0lPTl9JTlRFUlZBTDogM2U0LFxuICAgIFRFU1RfVVJMOiBcImh0dHBzOi8vcHJldWxvZ3MudW1lbmcuY29tL3VuaWZ5X2xvZ3NcIixcbiAgICBSRUxFQVNFX1VSTDogXCJodHRwczovL3Vsb2dzLnVtZW5nLmNvbS91bmlmeV9sb2dzXCIsXG4gICAgS0VZX1NFU1NJT05fUFJFRklYOiBcInVtZW5nX3Nlc3Npb25fcHJlZml4X1wiLFxuICAgIEtFWV9FVkVOVF9QUkVGSVg6IFwidW1lbmdfZXZlbnRfcHJlZml4X1wiLFxuICAgIEtFWV9IQUxGX1NFU1NJT05fUFJFRklYOiBcInVtZW5nX2hhbGZfc2Vzc2lvbl9wcmVmaXhfXCIsXG4gICAgS0VZX0NMT1NFX1NFU1NJT05fUFJFRklYOiBcInVtZW5nX2Nsb3NlX3Nlc3Npb25fcHJlZml4X1wiLFxuICAgIFJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEY6IDEsXG4gICAgUkVRVUVTVF9UWVBFX1NFU1NJT05fQ0xPU0U6IDIsXG4gICAgUkVRVUVTVF9UWVBFX0VWRU5UOiAzLFxuICAgIElTX0RFQlVHOiAhMSxcbiAgICBTREtfVkVSU0lPTjogXCIyLjAuM1wiLFxuICAgIEFQUF9GSVJTVF9PUEVOX0ZMQUc6IFwidW1lbmdfa2V5X2ZpcnN0X29wZW5fZmxhZ1wiLFxuICAgIE1PQklMRV9BRFZFUlRJU0lOR19JRDogXCJ1bWVuZ19tb2JpbGVfYWR2ZXJ0aXNpbmdfaWRcIixcbiAgICBNT0JJTEVfQU5EUk9JRF9JRDogXCJ1bWVuZ19hbmRyb2lkX19pZFwiLFxuICAgIE1PQklMRV9PQUlEOiBcInVtZW5nX29haWRcIixcbiAgICBFVkVOVF9TRU5EX01JTl9JTlRFUlZBTDogOTAsXG4gICAgRVZFTlRfU0VORF9NQVhfSU5URVJWQUw6IDg2NDAwLFxuICAgIEVWRU5UX0xBU1RfU0VORF9USU1FOiBcInVtZW5nX2Vrdl9sYXN0X3NlbmRfdGltZVwiLFxuICAgIEVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWTogXCJldmVudF9zZW5kX3JlcG9ydF9wb2xpY3lcIixcbiAgICBFVkVOVF9TRU5EX1JFUE9SVF9JTlRFUlZBTF9USU1FOiBcImV2ZW50X3NlbmRfcmVwb3J0X2ludGVydmFsX3RpbWVcIixcbiAgICBFVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1lfU1RBUlRfU0VORF9WQUxVRTogXCIxXCIsXG4gICAgRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX0lOVEVSVkFMX1ZBTFVFOiBcIjZcIixcbiAgICBET1dOTE9BRF9GSUxFX0ZJUlNUX0NBQ0hFOiBcInVtZW5nX3Nka191cGRhdGVfZmlyc3RDYWNoZUxldmVsXCIsXG4gICAgRE9XTkxPQURfRklMRV9TRUNPTkRfQ0FDSEU6IFwidW1lbmdfc2RrX3VwZGF0ZV9zZWNvbmRDYWNoZUxldmVsXCIsXG4gICAgU0RLX1VQREFURV9TRVJWRVJfQUREUkVTUzogXCJodHRwOi8vcy5jbnp6LmNvbS9zZGsvcXVpY2thcHBcIixcbiAgICBTREtfVVBEQVRFX0xPQ0FMX1NUT1JBR0VfUEFUSDogXCJpbnRlcm5hbDovL2ZpbGVzL3VtZW5nc2RrL1wiXG4gIH07XG5sZXQgb2FpZENhY2hlID0gbnVsbCxcbiAgYW5kcm9pZGlkQ2FjaGUgPSBudWxsLFxuICBpZGZhQ2FjaGUgPSBudWxsLFxuICB1bmlxdWVpZENhY2hlID0gbnVsbCxcbiAgZGV2aWNlSW5mb0NhY2hlID0gbnVsbDtcbmNvbnN0IERldmljZVV0aWwgPSB7XG4gICAgZ2V0QmFzZUluZm8oKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UodCA9PiB7XG4gICAgICAgIGlmIChkZXZpY2VJbmZvQ2FjaGUpIHJldHVybiB2b2lkIHQoZGV2aWNlSW5mb0NhY2hlKTtcbiAgICAgICAgX3N5c3RlbTIuZGVmYXVsdC5nZXRJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzKGUpIHtcbiAgICAgICAgICAgIGRldmljZUluZm9DYWNoZSA9IGUsIHQoZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgdChudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXROZXR3b3JrSW5mbyh0KSB7XG4gICAgICBfc3lzdGVtMy5kZWZhdWx0LmdldFR5cGUoe1xuICAgICAgICBzdWNjZXNzKGUpIHtcbiAgICAgICAgICB0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEFuZHJvaWRJZCgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSh0ID0+IHtcbiAgICAgICAgaWYgKGFuZHJvaWRpZENhY2hlKSByZXR1cm4gdm9pZCB0KGFuZHJvaWRpZENhY2hlLnVzZXJJZCk7XG4gICAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZ2V0VXNlcklkKHtcbiAgICAgICAgICBzdWNjZXNzKGUpIHtcbiAgICAgICAgICAgIGFuZHJvaWRpZENhY2hlID0gZSwgdChlLnVzZXJJZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgdChcIlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRBZHZlcnRpc2luZ0lkKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHQgPT4ge1xuICAgICAgICBpZiAoaWRmYUNhY2hlKSByZXR1cm4gdm9pZCB0KGlkZmFDYWNoZS5hZHZlcnRpc2luZ0lkKTtcbiAgICAgICAgX3N5c3RlbTIuZGVmYXVsdC5nZXRBZHZlcnRpc2luZ0lkKHtcbiAgICAgICAgICBzdWNjZXNzKGUpIHtcbiAgICAgICAgICAgIGlkZmFDYWNoZSA9IGUsIHQoZS5hZHZlcnRpc2luZ0lkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICB0KFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldE9BSUQoKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coXCJjYWxsIGdldE9BSURcIiksIG5ldyBQcm9taXNlKHQgPT4ge1xuICAgICAgICBpZiAobnVsbCAhPT0gb2FpZENhY2hlKSByZXR1cm4gdm9pZCB0KG9haWRDYWNoZS5vYWlkKTtcbiAgICAgICAgXCJmdW5jdGlvblwiICE9IHR5cGVvZiBfc3lzdGVtMi5kZWZhdWx0LmdldE9BSUQgfHwgITEgPT09IF9zeXN0ZW0yLmRlZmF1bHQuYWxsb3dUcmFja09BSUQgPyB0KFwiXCIpIDogX3N5c3RlbTIuZGVmYXVsdC5nZXRPQUlEKHtcbiAgICAgICAgICBzdWNjZXNzKGUpIHtcbiAgICAgICAgICAgIG9haWRDYWNoZSA9IGUsIHQoZS5vYWlkKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICB0KFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldFVuaXF1ZUlkKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHQgPT4ge1xuICAgICAgICB1bmlxdWVpZENhY2hlID8gdCh1bmlxdWVpZENhY2hlKSA6IGJ1aWxkVW5pcXVlSWQodCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldFBhZ2VOYW1lKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdCA9IF9zeXN0ZW00LmRlZmF1bHQuZ2V0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHQubmFtZTtcbiAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgfSxcbiAgICBnZXRTeXN0ZW1CYXNlSW5mbyh0LCBlKSB7XG4gICAgICBpZiAoZGV2aWNlSW5mb0NhY2hlKSByZXR1cm4gdm9pZCAodCAmJiB0KGRldmljZUluZm9DYWNoZSkpO1xuICAgICAgX3N5c3RlbTIuZGVmYXVsdC5nZXRJbmZvKHtcbiAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgZGV2aWNlSW5mb0NhY2hlID0gZSwgdCAmJiB0KGUpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsKHQsIG4pIHtcbiAgICAgICAgICBlICYmIGUodCwgbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgTG9nID0ge1xuICAgIGQodCkge30sXG4gICAgaSh0KSB7XG4gICAgICB0cnkge1xuICAgICAgICB1c2VyRGVidWcgJiYgY29uc29sZS5pbmZvKHQpO1xuICAgICAgfSBjYXRjaCAodCkge31cbiAgICB9LFxuICAgIGUodCkge30sXG4gICAgdyh0KSB7fSxcbiAgICB2KHQpIHt9XG4gIH07XG52YXIgY29tbW9uanNHbG9iYWwgPSBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBnbG9iYWxUaGlzID8gZ2xvYmFsVGhpcyA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGdsb2JhbCA/IGdsb2JhbCA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHNlbGYgPyBzZWxmIDoge30sXG4gIE1ENSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uICh0KSB7XG4gICAgIWZ1bmN0aW9uIChlKSB7XG4gICAgICBmdW5jdGlvbiBuKHQsIGUpIHtcbiAgICAgICAgdmFyIG4gPSAoNjU1MzUgJiB0KSArICg2NTUzNSAmIGUpO1xuICAgICAgICByZXR1cm4gKHQgPj4gMTYpICsgKGUgPj4gMTYpICsgKG4gPj4gMTYpIDw8IDE2IHwgNjU1MzUgJiBuO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbyh0LCBlKSB7XG4gICAgICAgIHJldHVybiB0IDw8IGUgfCB0ID4+PiAzMiAtIGU7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBpKHQsIGUsIGksIHIsIHMsIGMpIHtcbiAgICAgICAgcmV0dXJuIG4obyhuKG4oZSwgdCksIG4ociwgYykpLCBzKSwgaSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByKHQsIGUsIG4sIG8sIHIsIHMsIGMpIHtcbiAgICAgICAgcmV0dXJuIGkoZSAmIG4gfCB+ZSAmIG8sIHQsIGUsIHIsIHMsIGMpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcyh0LCBlLCBuLCBvLCByLCBzLCBjKSB7XG4gICAgICAgIHJldHVybiBpKGUgJiBvIHwgbiAmIH5vLCB0LCBlLCByLCBzLCBjKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGModCwgZSwgbiwgbywgciwgcywgYykge1xuICAgICAgICByZXR1cm4gaShlIF4gbiBeIG8sIHQsIGUsIHIsIHMsIGMpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYSh0LCBlLCBuLCBvLCByLCBzLCBjKSB7XG4gICAgICAgIHJldHVybiBpKG4gXiAoZSB8IH5vKSwgdCwgZSwgciwgcywgYyk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB1KHQsIGUpIHtcbiAgICAgICAgdFtlID4+IDVdIHw9IDEyOCA8PCBlICUgMzIsIHRbMTQgKyAoZSArIDY0ID4+PiA5IDw8IDQpXSA9IGU7XG4gICAgICAgIHZhciBvLFxuICAgICAgICAgIGksXG4gICAgICAgICAgdSxcbiAgICAgICAgICBmLFxuICAgICAgICAgIGwsXG4gICAgICAgICAgXyA9IDE3MzI1ODQxOTMsXG4gICAgICAgICAgRSA9IC0yNzE3MzM4NzksXG4gICAgICAgICAgZyA9IC0xNzMyNTg0MTk0LFxuICAgICAgICAgIGQgPSAyNzE3MzM4Nzg7XG4gICAgICAgIGZvciAobyA9IDA7IG8gPCB0Lmxlbmd0aDsgbyArPSAxNikgaSA9IF8sIHUgPSBFLCBmID0gZywgbCA9IGQsIEUgPSBhKEUgPSBhKEUgPSBhKEUgPSBhKEUgPSBjKEUgPSBjKEUgPSBjKEUgPSBjKEUgPSBzKEUgPSBzKEUgPSBzKEUgPSBzKEUgPSByKEUgPSByKEUgPSByKEUgPSByKEUsIGcgPSByKGcsIGQgPSByKGQsIF8gPSByKF8sIEUsIGcsIGQsIHRbb10sIDcsIC02ODA4NzY5MzYpLCBFLCBnLCB0W28gKyAxXSwgMTIsIC0zODk1NjQ1ODYpLCBfLCBFLCB0W28gKyAyXSwgMTcsIDYwNjEwNTgxOSksIGQsIF8sIHRbbyArIDNdLCAyMiwgLTEwNDQ1MjUzMzApLCBnID0gcihnLCBkID0gcihkLCBfID0gcihfLCBFLCBnLCBkLCB0W28gKyA0XSwgNywgLTE3NjQxODg5NyksIEUsIGcsIHRbbyArIDVdLCAxMiwgMTIwMDA4MDQyNiksIF8sIEUsIHRbbyArIDZdLCAxNywgLTE0NzMyMzEzNDEpLCBkLCBfLCB0W28gKyA3XSwgMjIsIC00NTcwNTk4MyksIGcgPSByKGcsIGQgPSByKGQsIF8gPSByKF8sIEUsIGcsIGQsIHRbbyArIDhdLCA3LCAxNzcwMDM1NDE2KSwgRSwgZywgdFtvICsgOV0sIDEyLCAtMTk1ODQxNDQxNyksIF8sIEUsIHRbbyArIDEwXSwgMTcsIC00MjA2MyksIGQsIF8sIHRbbyArIDExXSwgMjIsIC0xOTkwNDA0MTYyKSwgZyA9IHIoZywgZCA9IHIoZCwgXyA9IHIoXywgRSwgZywgZCwgdFtvICsgMTJdLCA3LCAxODA0NjAzNjgyKSwgRSwgZywgdFtvICsgMTNdLCAxMiwgLTQwMzQxMTAxKSwgXywgRSwgdFtvICsgMTRdLCAxNywgLTE1MDIwMDIyOTApLCBkLCBfLCB0W28gKyAxNV0sIDIyLCAxMjM2NTM1MzI5KSwgZyA9IHMoZywgZCA9IHMoZCwgXyA9IHMoXywgRSwgZywgZCwgdFtvICsgMV0sIDUsIC0xNjU3OTY1MTApLCBFLCBnLCB0W28gKyA2XSwgOSwgLTEwNjk1MDE2MzIpLCBfLCBFLCB0W28gKyAxMV0sIDE0LCA2NDM3MTc3MTMpLCBkLCBfLCB0W29dLCAyMCwgLTM3Mzg5NzMwMiksIGcgPSBzKGcsIGQgPSBzKGQsIF8gPSBzKF8sIEUsIGcsIGQsIHRbbyArIDVdLCA1LCAtNzAxNTU4NjkxKSwgRSwgZywgdFtvICsgMTBdLCA5LCAzODAxNjA4MyksIF8sIEUsIHRbbyArIDE1XSwgMTQsIC02NjA0NzgzMzUpLCBkLCBfLCB0W28gKyA0XSwgMjAsIC00MDU1Mzc4NDgpLCBnID0gcyhnLCBkID0gcyhkLCBfID0gcyhfLCBFLCBnLCBkLCB0W28gKyA5XSwgNSwgNTY4NDQ2NDM4KSwgRSwgZywgdFtvICsgMTRdLCA5LCAtMTAxOTgwMzY5MCksIF8sIEUsIHRbbyArIDNdLCAxNCwgLTE4NzM2Mzk2MSksIGQsIF8sIHRbbyArIDhdLCAyMCwgMTE2MzUzMTUwMSksIGcgPSBzKGcsIGQgPSBzKGQsIF8gPSBzKF8sIEUsIGcsIGQsIHRbbyArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpLCBFLCBnLCB0W28gKyAyXSwgOSwgLTUxNDAzNzg0KSwgXywgRSwgdFtvICsgN10sIDE0LCAxNzM1MzI4NDczKSwgZCwgXywgdFtvICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpLCBnID0gYyhnLCBkID0gYyhkLCBfID0gYyhfLCBFLCBnLCBkLCB0W28gKyA1XSwgNCwgLTM3ODU1OCksIEUsIGcsIHRbbyArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpLCBfLCBFLCB0W28gKyAxMV0sIDE2LCAxODM5MDMwNTYyKSwgZCwgXywgdFtvICsgMTRdLCAyMywgLTM1MzA5NTU2KSwgZyA9IGMoZywgZCA9IGMoZCwgXyA9IGMoXywgRSwgZywgZCwgdFtvICsgMV0sIDQsIC0xNTMwOTkyMDYwKSwgRSwgZywgdFtvICsgNF0sIDExLCAxMjcyODkzMzUzKSwgXywgRSwgdFtvICsgN10sIDE2LCAtMTU1NDk3NjMyKSwgZCwgXywgdFtvICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApLCBnID0gYyhnLCBkID0gYyhkLCBfID0gYyhfLCBFLCBnLCBkLCB0W28gKyAxM10sIDQsIDY4MTI3OTE3NCksIEUsIGcsIHRbb10sIDExLCAtMzU4NTM3MjIyKSwgXywgRSwgdFtvICsgM10sIDE2LCAtNzIyNTIxOTc5KSwgZCwgXywgdFtvICsgNl0sIDIzLCA3NjAyOTE4OSksIGcgPSBjKGcsIGQgPSBjKGQsIF8gPSBjKF8sIEUsIGcsIGQsIHRbbyArIDldLCA0LCAtNjQwMzY0NDg3KSwgRSwgZywgdFtvICsgMTJdLCAxMSwgLTQyMTgxNTgzNSksIF8sIEUsIHRbbyArIDE1XSwgMTYsIDUzMDc0MjUyMCksIGQsIF8sIHRbbyArIDJdLCAyMywgLTk5NTMzODY1MSksIGcgPSBhKGcsIGQgPSBhKGQsIF8gPSBhKF8sIEUsIGcsIGQsIHRbb10sIDYsIC0xOTg2MzA4NDQpLCBFLCBnLCB0W28gKyA3XSwgMTAsIDExMjY4OTE0MTUpLCBfLCBFLCB0W28gKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSksIGQsIF8sIHRbbyArIDVdLCAyMSwgLTU3NDM0MDU1KSwgZyA9IGEoZywgZCA9IGEoZCwgXyA9IGEoXywgRSwgZywgZCwgdFtvICsgMTJdLCA2LCAxNzAwNDg1NTcxKSwgRSwgZywgdFtvICsgM10sIDEwLCAtMTg5NDk4NjYwNiksIF8sIEUsIHRbbyArIDEwXSwgMTUsIC0xMDUxNTIzKSwgZCwgXywgdFtvICsgMV0sIDIxLCAtMjA1NDkyMjc5OSksIGcgPSBhKGcsIGQgPSBhKGQsIF8gPSBhKF8sIEUsIGcsIGQsIHRbbyArIDhdLCA2LCAxODczMzEzMzU5KSwgRSwgZywgdFtvICsgMTVdLCAxMCwgLTMwNjExNzQ0KSwgXywgRSwgdFtvICsgNl0sIDE1LCAtMTU2MDE5ODM4MCksIGQsIF8sIHRbbyArIDEzXSwgMjEsIDEzMDkxNTE2NDkpLCBnID0gYShnLCBkID0gYShkLCBfID0gYShfLCBFLCBnLCBkLCB0W28gKyA0XSwgNiwgLTE0NTUyMzA3MCksIEUsIGcsIHRbbyArIDExXSwgMTAsIC0xMTIwMjEwMzc5KSwgXywgRSwgdFtvICsgMl0sIDE1LCA3MTg3ODcyNTkpLCBkLCBfLCB0W28gKyA5XSwgMjEsIC0zNDM0ODU1NTEpLCBfID0gbihfLCBpKSwgRSA9IG4oRSwgdSksIGcgPSBuKGcsIGYpLCBkID0gbihkLCBsKTtcbiAgICAgICAgcmV0dXJuIFtfLCBFLCBnLCBkXTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGYodCkge1xuICAgICAgICB2YXIgZSxcbiAgICAgICAgICBuID0gXCJcIixcbiAgICAgICAgICBvID0gMzIgKiB0Lmxlbmd0aDtcbiAgICAgICAgZm9yIChlID0gMDsgZSA8IG87IGUgKz0gOCkgbiArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHRbZSA+PiA1XSA+Pj4gZSAlIDMyICYgMjU1KTtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsKHQpIHtcbiAgICAgICAgdmFyIGUsXG4gICAgICAgICAgbiA9IFtdO1xuICAgICAgICBmb3IgKG5bKHQubGVuZ3RoID4+IDIpIC0gMV0gPSB2b2lkIDAsIGUgPSAwOyBlIDwgbi5sZW5ndGg7IGUgKz0gMSkgbltlXSA9IDA7XG4gICAgICAgIHZhciBvID0gOCAqIHQubGVuZ3RoO1xuICAgICAgICBmb3IgKGUgPSAwOyBlIDwgbzsgZSArPSA4KSBuW2UgPj4gNV0gfD0gKDI1NSAmIHQuY2hhckNvZGVBdChlIC8gOCkpIDw8IGUgJSAzMjtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBfKHQpIHtcbiAgICAgICAgcmV0dXJuIGYodShsKHQpLCA4ICogdC5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIEUodCwgZSkge1xuICAgICAgICB2YXIgbixcbiAgICAgICAgICBvLFxuICAgICAgICAgIGkgPSBsKHQpLFxuICAgICAgICAgIHIgPSBbXSxcbiAgICAgICAgICBzID0gW107XG4gICAgICAgIGZvciAoclsxNV0gPSBzWzE1XSA9IHZvaWQgMCwgaS5sZW5ndGggPiAxNiAmJiAoaSA9IHUoaSwgOCAqIHQubGVuZ3RoKSksIG4gPSAwOyBuIDwgMTY7IG4gKz0gMSkgcltuXSA9IDkwOTUyMjQ4NiBeIGlbbl0sIHNbbl0gPSAxNTQ5NTU2ODI4IF4gaVtuXTtcbiAgICAgICAgcmV0dXJuIG8gPSB1KHIuY29uY2F0KGwoZSkpLCA1MTIgKyA4ICogZS5sZW5ndGgpLCBmKHUocy5jb25jYXQobyksIDY0MCkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZyh0KSB7XG4gICAgICAgIHZhciBlLFxuICAgICAgICAgIG4sXG4gICAgICAgICAgbyA9IFwiXCI7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCB0Lmxlbmd0aDsgbiArPSAxKSBlID0gdC5jaGFyQ29kZUF0KG4pLCBvICs9IFwiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChlID4+PiA0ICYgMTUpICsgXCIwMTIzNDU2Nzg5YWJjZGVmXCIuY2hhckF0KDE1ICYgZSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZCh0KSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodCkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gUyh0KSB7XG4gICAgICAgIHJldHVybiBfKGQodCkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaCh0KSB7XG4gICAgICAgIHJldHVybiBnKFModCkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcCh0LCBlKSB7XG4gICAgICAgIHJldHVybiBFKGQodCksIGQoZSkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gVSh0LCBlKSB7XG4gICAgICAgIHJldHVybiBnKHAodCwgZSkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gTih0LCBlLCBuKSB7XG4gICAgICAgIHJldHVybiBlID8gbiA/IHAoZSwgdCkgOiBVKGUsIHQpIDogbiA/IFModCkgOiBoKHQpO1xuICAgICAgfVxuICAgICAgdC5leHBvcnRzID8gdC5leHBvcnRzID0gTiA6IGUubWQ1ID0gTjtcbiAgICB9KGNvbW1vbmpzR2xvYmFsKTtcbiAgfSksXG4gIEJhc2U2NF8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuICAgICFmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIF9CYXNlNjQgPSBnbG9iYWwuQmFzZTY0LFxuICAgICAgICAgIHZlcnNpb24gPSBcIjIuNC44XCIsXG4gICAgICAgICAgYnVmZmVyO1xuICAgICAgICBpZiAobW9kdWxlLmV4cG9ydHMpIHRyeSB7XG4gICAgICAgICAgYnVmZmVyID0gZXZhbChcInJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclwiKTtcbiAgICAgICAgfSBjYXRjaCAodCkge1xuICAgICAgICAgIGJ1ZmZlciA9IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYjY0Y2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIixcbiAgICAgICAgICBiNjR0YWIgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgZm9yICh2YXIgZSA9IHt9LCBuID0gMCwgbyA9IHQubGVuZ3RoOyBuIDwgbzsgbisrKSBlW3QuY2hhckF0KG4pXSA9IG47XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICB9KGI2NGNoYXJzKSxcbiAgICAgICAgICBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuICAgICAgICAgIGNiX3V0b2IgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQubGVuZ3RoIDwgMikgcmV0dXJuIChlID0gdC5jaGFyQ29kZUF0KDApKSA8IDEyOCA/IHQgOiBlIDwgMjA0OCA/IGZyb21DaGFyQ29kZSgxOTIgfCBlID4+PiA2KSArIGZyb21DaGFyQ29kZSgxMjggfCA2MyAmIGUpIDogZnJvbUNoYXJDb2RlKDIyNCB8IGUgPj4+IDEyICYgMTUpICsgZnJvbUNoYXJDb2RlKDEyOCB8IGUgPj4+IDYgJiA2MykgKyBmcm9tQ2hhckNvZGUoMTI4IHwgNjMgJiBlKTtcbiAgICAgICAgICAgIHZhciBlID0gNjU1MzYgKyAxMDI0ICogKHQuY2hhckNvZGVBdCgwKSAtIDU1Mjk2KSArICh0LmNoYXJDb2RlQXQoMSkgLSA1NjMyMCk7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKDI0MCB8IGUgPj4+IDE4ICYgNykgKyBmcm9tQ2hhckNvZGUoMTI4IHwgZSA+Pj4gMTIgJiA2MykgKyBmcm9tQ2hhckNvZGUoMTI4IHwgZSA+Pj4gNiAmIDYzKSArIGZyb21DaGFyQ29kZSgxMjggfCA2MyAmIGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVfdXRvYiA9IC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZGXXxbXlxceDAwLVxceDdGXS9nLFxuICAgICAgICAgIHV0b2IgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGRl18W15cXHgwMC1cXHg3Rl0vZywgY2JfdXRvYik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYl9lbmNvZGUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIGUgPSBbMCwgMiwgMV1bdC5sZW5ndGggJSAzXSxcbiAgICAgICAgICAgICAgbiA9IHQuY2hhckNvZGVBdCgwKSA8PCAxNiB8ICh0Lmxlbmd0aCA+IDEgPyB0LmNoYXJDb2RlQXQoMSkgOiAwKSA8PCA4IHwgKHQubGVuZ3RoID4gMiA/IHQuY2hhckNvZGVBdCgyKSA6IDApO1xuICAgICAgICAgICAgcmV0dXJuIFtiNjRjaGFycy5jaGFyQXQobiA+Pj4gMTgpLCBiNjRjaGFycy5jaGFyQXQobiA+Pj4gMTIgJiA2MyksIGUgPj0gMiA/IFwiPVwiIDogYjY0Y2hhcnMuY2hhckF0KG4gPj4+IDYgJiA2MyksIGUgPj0gMSA/IFwiPVwiIDogYjY0Y2hhcnMuY2hhckF0KDYzICYgbildLmpvaW4oXCJcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBidG9hID0gZ2xvYmFsLmJ0b2EgPyBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5idG9hKHQpO1xuICAgICAgICAgIH0gOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQucmVwbGFjZSgvW1xcc1xcU117MSwzfS9nLCBjYl9lbmNvZGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX2VuY29kZSA9IGJ1ZmZlciA/IGJ1ZmZlci5mcm9tICYmIFVpbnQ4QXJyYXkgJiYgYnVmZmVyLmZyb20gIT09IFVpbnQ4QXJyYXkuZnJvbSA/IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHQuY29uc3RydWN0b3IgPT09IGJ1ZmZlci5jb25zdHJ1Y3RvciA/IHQgOiBidWZmZXIuZnJvbSh0KSkudG9TdHJpbmcoXCJiYXNlNjRcIik7XG4gICAgICAgICAgfSA6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHQuY29uc3RydWN0b3IgPT09IGJ1ZmZlci5jb25zdHJ1Y3RvciA/IHQgOiBuZXcgYnVmZmVyKHQpKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgICAgICAgICB9IDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBidG9hKHV0b2IodCkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZW5jb2RlID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlID8gX2VuY29kZShTdHJpbmcodCkpLnJlcGxhY2UoL1srXFwvXS9nLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICByZXR1cm4gXCIrXCIgPT0gdCA/IFwiLVwiIDogXCJfXCI7XG4gICAgICAgICAgICB9KS5yZXBsYWNlKC89L2csIFwiXCIpIDogX2VuY29kZShTdHJpbmcodCkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZW5jb2RlVVJJID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGUodCwgITApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVfYnRvdSA9IG5ldyBSZWdFeHAoW1wiW8OALcOfXVvCgC3Cv11cIiwgXCJbw6Atw69dW8KALcK/XXsyfVwiLCBcIlvDsC3Dt11bwoAtwr9dezN9XCJdLmpvaW4oXCJ8XCIpLCBcImdcIiksXG4gICAgICAgICAgY2JfYnRvdSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB2YXIgZSA9ICgoNyAmIHQuY2hhckNvZGVBdCgwKSkgPDwgMTggfCAoNjMgJiB0LmNoYXJDb2RlQXQoMSkpIDw8IDEyIHwgKDYzICYgdC5jaGFyQ29kZUF0KDIpKSA8PCA2IHwgNjMgJiB0LmNoYXJDb2RlQXQoMykpIC0gNjU1MzY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSg1NTI5NiArIChlID4+PiAxMCkpICsgZnJvbUNoYXJDb2RlKDU2MzIwICsgKDEwMjMgJiBlKSk7XG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbUNoYXJDb2RlKCgxNSAmIHQuY2hhckNvZGVBdCgwKSkgPDwgMTIgfCAoNjMgJiB0LmNoYXJDb2RlQXQoMSkpIDw8IDYgfCA2MyAmIHQuY2hhckNvZGVBdCgyKSk7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSgoMzEgJiB0LmNoYXJDb2RlQXQoMCkpIDw8IDYgfCA2MyAmIHQuY2hhckNvZGVBdCgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBidG91ID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0LnJlcGxhY2UocmVfYnRvdSwgY2JfYnRvdSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYl9kZWNvZGUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0Lmxlbmd0aCxcbiAgICAgICAgICAgICAgbiA9IGUgJSA0LFxuICAgICAgICAgICAgICBvID0gKGUgPiAwID8gYjY0dGFiW3QuY2hhckF0KDApXSA8PCAxOCA6IDApIHwgKGUgPiAxID8gYjY0dGFiW3QuY2hhckF0KDEpXSA8PCAxMiA6IDApIHwgKGUgPiAyID8gYjY0dGFiW3QuY2hhckF0KDIpXSA8PCA2IDogMCkgfCAoZSA+IDMgPyBiNjR0YWJbdC5jaGFyQXQoMyldIDogMCksXG4gICAgICAgICAgICAgIGkgPSBbZnJvbUNoYXJDb2RlKG8gPj4+IDE2KSwgZnJvbUNoYXJDb2RlKG8gPj4+IDggJiAyNTUpLCBmcm9tQ2hhckNvZGUoMjU1ICYgbyldO1xuICAgICAgICAgICAgcmV0dXJuIGkubGVuZ3RoIC09IFswLCAwLCAyLCAxXVtuXSwgaS5qb2luKFwiXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYXRvYiA9IGdsb2JhbC5hdG9iID8gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuYXRvYih0KTtcbiAgICAgICAgICB9IDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0LnJlcGxhY2UoL1tcXHNcXFNdezEsNH0vZywgY2JfZGVjb2RlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9kZWNvZGUgPSBidWZmZXIgPyBidWZmZXIuZnJvbSAmJiBVaW50OEFycmF5ICYmIGJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gPyBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuICh0LmNvbnN0cnVjdG9yID09PSBidWZmZXIuY29uc3RydWN0b3IgPyB0IDogYnVmZmVyLmZyb20odCwgXCJiYXNlNjRcIikpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfSA6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHQuY29uc3RydWN0b3IgPT09IGJ1ZmZlci5jb25zdHJ1Y3RvciA/IHQgOiBuZXcgYnVmZmVyKHQsIFwiYmFzZTY0XCIpKS50b1N0cmluZygpO1xuICAgICAgICAgIH0gOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ0b3UoYXRvYih0KSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZWNvZGUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIF9kZWNvZGUoU3RyaW5nKHQpLnJlcGxhY2UoL1stX10vZywgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiLVwiID09IHQgPyBcIitcIiA6IFwiL1wiO1xuICAgICAgICAgICAgfSkucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9dL2csIFwiXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGdsb2JhbC5CYXNlNjQ7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLkJhc2U2NCA9IF9CYXNlNjQsIHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgaWYgKGdsb2JhbC5CYXNlNjQgPSB7XG4gICAgICAgICAgVkVSU0lPTjogXCIyLjQuOFwiLFxuICAgICAgICAgIGF0b2I6IGF0b2IsXG4gICAgICAgICAgYnRvYTogYnRvYSxcbiAgICAgICAgICBmcm9tQmFzZTY0OiBkZWNvZGUsXG4gICAgICAgICAgdG9CYXNlNjQ6IGVuY29kZSxcbiAgICAgICAgICB1dG9iOiB1dG9iLFxuICAgICAgICAgIGVuY29kZTogZW5jb2RlLFxuICAgICAgICAgIGVuY29kZVVSSTogZW5jb2RlVVJJLFxuICAgICAgICAgIGJ0b3U6IGJ0b3UsXG4gICAgICAgICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgICAgICAgbm9Db25mbGljdDogbm9Db25mbGljdCxcbiAgICAgICAgICBfX2J1ZmZlcl9fOiBidWZmZXJcbiAgICAgICAgfSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgICB2YXIgbm9FbnVtID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0LFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG4gICAgICAgICAgZ2xvYmFsLkJhc2U2NC5leHRlbmRTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgXCJmcm9tQmFzZTY0XCIsIG5vRW51bShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZWNvZGUodGhpcyk7XG4gICAgICAgICAgICB9KSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCBcInRvQmFzZTY0XCIsIG5vRW51bShmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlKHRoaXMsIHQpO1xuICAgICAgICAgICAgfSkpLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgXCJ0b0Jhc2U2NFVSSVwiLCBub0VudW0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlKHRoaXMsICEwKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnbG9iYWwuTWV0ZW9yICYmIChCYXNlNjQgPSBnbG9iYWwuQmFzZTY0KSwgbW9kdWxlLmV4cG9ydHMgJiYgKG1vZHVsZS5leHBvcnRzLkJhc2U2NCA9IGdsb2JhbC5CYXNlNjQpLCB7XG4gICAgICAgICAgQmFzZTY0OiBnbG9iYWwuQmFzZTY0XG4gICAgICAgIH07XG4gICAgICB9KGdsb2JhbCk7XG4gICAgfShcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBzZWxmID8gc2VsZiA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IGNvbW1vbmpzR2xvYmFsKTtcbiAgfSksXG4gIEJhc2U2NF8yID0gQmFzZTY0XzEuQmFzZTY0LFxuICBVbWVuZ1V0aWxzID0ge1xuICAgIE1ENTogTUQ1JDEsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgY2hlY2tFbXB0eUFyZ3VtZW50OiBjaGVja0VtcHR5QXJndW1lbnQsXG4gICAgY2hlY2tJZDogY2hlY2tJZCxcbiAgICBzdHJpbmdUb0FycmF5OiBzdHJpbmdUb0FycmF5LFxuICAgIHRvU3RyOiB0b1N0cixcbiAgICB0b09iamVjdDogdG9PYmplY3QsXG4gICAgY2hlY2tBdHRyT3JTdHJpbmc6IGNoZWNrQXR0ck9yU3RyaW5nLFxuICAgIGlzTm90QU51bWJlcjogaXNOb3RBTnVtYmVyLFxuICAgIGNoZWNrTUQ1OiBjaGVja01ENVxuICB9O1xuY29uc3QgJEpTT05fVU1FTkdfU0VTU0lPTlMkID0gXCJqc29uX3VtZW5nX3Nlc3Npb25zXCIsXG4gICRKU09OX1VNRU5HX0hBTEZfU0VTU0lPTlMkID0gXCJqc29uX3VtZW5nX2hhbGZfc2Vzc2lvblwiLFxuICAkSlNPTl9VTUVOR19DVVJSRU5UX1NFU1NJT04kID0gXCJqc29uX3VtZW5nX2N1cnJlbnRfc2Vzc2lvblwiLFxuICAkSlNPTl9VTUVOR19QQUdFX0VORF9USU1FJCA9IFwianNvbl91bWVuZ19wYWdlX2VuZF90aW1lXCIsXG4gIFNlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldEN1cnJlbnRTZXNzaW9uSWQoKSB7XG4gICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEN1cnJlbnRTZXNzaW9uKCkge1xuICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LFxuICAgICAgICBnZXRTZXNzaW9ucygpIHtcbiAgICAgICAgICByZXR1cm4gbDtcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdCh0KSB7XG4gICAgICAgICAgdGhpcy5hcHBrZXkgPSB0LCBvKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZFNlc3Npb24oKSB7XG4gICAgICAgICAgYSAmJiAoYyA9IERhdGUubm93KCksIGEuZW5kX3RpbWUgPSBjLCBTdG9yYWdlVXRpbC5wdXREYXRhKCRKU09OX1VNRU5HX0NVUlJFTlRfU0VTU0lPTiQsIFVtZW5nVXRpbHMudG9TdHIoYSkpLCBTdG9yYWdlVXRpbC5wdXREYXRhKCRKU09OX1VNRU5HX1BBR0VfRU5EX1RJTUUkLCBjKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyU2Vzc2lvbnMoKSB7XG4gICAgICAgICAgU3RvcmFnZVV0aWwuZGVsZXRlRGF0YSgkSlNPTl9VTUVOR19TRVNTSU9OUyQpLCBsLnNwbGljZSgwLCBsLmxlbmd0aCksIGwgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0T25TZXNzaW9uTGlzdGVuZXIodCkge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbkxpc3RlbmVyID0gdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SGFsZlNlc3Npb25zKCkge1xuICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhckhhbGZTZXNzaW9uKCkge1xuICAgICAgICAgIFN0b3JhZ2VVdGlsLmRlbGV0ZURhdGEoJEpTT05fVU1FTkdfSEFMRl9TRVNTSU9OUyQpLCBfLnNwbGljZSgwLCBfLmxlbmd0aCksIF8gPSBbXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSh0LCBlKSB7XG4gICAgICBjb25zdCBuID0gRGF0ZS5ub3coKTtcbiAgICAgIERldmljZVV0aWwuZ2V0VW5pcXVlSWQoKS50aGVuKHQgPT4ge1xuICAgICAgICBjb25zdCBvID0gVW1lbmdVdGlscy5NRDUoYCR7bn06Ojoke1Nlc3Npb24uZ2V0SW5zdGFuY2UoKS5hcHBrZXl9Ojo6JHt0fWApO1xuICAgICAgICBlKG8pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4odCkge1xuICAgICAgY29uc3QgZSA9IHt9O1xuICAgICAgcmV0dXJuIGUuaWQgPSB0LCBlLnN0YXJ0X3RpbWUgPSBEYXRlLm5vdygpLCBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvKCkge1xuICAgICAgY29uc3QgdCA9IERhdGUubm93KCk7XG4gICAgICBhID8gYyAmJiB0IC0gYyA+IGNvbnN0YW50cy5TRVNTSU9OX0lOVEVSVkFMICYmIChpKGMpLCByKGEpKSA6IFN0b3JhZ2VVdGlsLmdldERhdGEoJEpTT05fVU1FTkdfQ1VSUkVOVF9TRVNTSU9OJCwgZSA9PiB7XG4gICAgICAgIGUgJiYgKGEgPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KGUpKSA/IFN0b3JhZ2VVdGlsLmdldERhdGEoJEpTT05fVU1FTkdfUEFHRV9FTkRfVElNRSQsIGUgPT4ge1xuICAgICAgICAgIGUgJiYgdCAtIGUgPiBjb25zdGFudHMuU0VTU0lPTl9JTlRFUlZBTCA/IChpKGUpLCByKGEpKSA6IGYgPSBhLmlkO1xuICAgICAgICB9KSA6IHIobnVsbCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaSh0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBhLmVuZF90aW1lID0gcGFyc2VJbnQodCwgMTApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhLmVuZF90aW1lID0gdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGUgPSB0IC0gYS5zdGFydF90aW1lO1xuICAgICAgYS5kdXJhdGlvbiA9IGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHIodCkge1xuICAgICAgY29uc3QgbyA9IHQgPyB0LmlkIDogXCJcIixcbiAgICAgICAgaSA9IFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5zZXNzaW9uTGlzdGVuZXIobyk7XG4gICAgICBlKG8sIGUgPT4ge1xuICAgICAgICBhID0gbihlKTtcbiAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YSgkSlNPTl9VTUVOR19TRVNTSU9OUyQsIG4gPT4ge1xuICAgICAgICAgIGwgPSBVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkobik7XG4gICAgICAgICAgdCA/IGkucGFnZXMobiA9PiB7XG4gICAgICAgICAgICBuICYmIG4ubGVuZ3RoID4gMCAmJiAodC5wYWdlcyA9IG4sIHQuJHBhZ2VfbnVtID0gbi5sZW5ndGgpO1xuICAgICAgICAgICAgbC5wdXNoKHQpO1xuICAgICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19TRVNTSU9OUyQsIFVtZW5nVXRpbHMudG9TdHIobCkpO1xuICAgICAgICAgICAgcyhpLCBlKTtcbiAgICAgICAgICB9KSA6IHMoaSwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKCRKU09OX1VNRU5HX0NVUlJFTlRfU0VTU0lPTiQsIFVtZW5nVXRpbHMudG9TdHIoYSkpO1xuICAgICAgICBmID0gZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzKHQsIGUpIHtcbiAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoJEpTT05fVU1FTkdfSEFMRl9TRVNTSU9OUyQsIG4gPT4ge1xuICAgICAgICBfID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KG4pO1xuICAgICAgICBhICYmIChfLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSkpLCBTdG9yYWdlVXRpbC5wdXREYXRhKCRKU09OX1VNRU5HX0hBTEZfU0VTU0lPTlMkLCBVbWVuZ1V0aWxzLnRvU3RyKF8pKSwgdC5nZW5lcmF0ZVNlc3Npb25BZnRlckhhbmRsZXIoZSkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBjLFxuICAgICAgYSxcbiAgICAgIHUgPSBudWxsLFxuICAgICAgZiA9IFwiXCIsXG4gICAgICBsID0gW10sXG4gICAgICBfID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gdSB8fCAodSA9IHQoKSksIHU7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpLFxuICAkSlNPTl9VTUVOR19IRUFERVIkID0gXCJqc29uX3VtZW5nX2hlYWRlclwiLFxuICAkVU1FTkdfS0VZX0lNUFJJTlQkID0gXCJ1bWVuZ19rZXlfaW1wcmludFwiLFxuICBNT0JJTEVfTkVUV09SS18yRyA9IFwiMmdcIixcbiAgTU9CSUxFX05FVFdPUktfM0cgPSBcIjNnXCIsXG4gIE1PQklMRV9ORVRXT1JLXzRHID0gXCI0Z1wiLFxuICBNT0JJTEVfTkVUV09SS19OT05FID0gXCJub25lXCIsXG4gIEJMQU5LX1NQQUNFID0gXCIgXCIsXG4gIFVNRU5HX0FEVkVSVElTVElOR19JRCA9IFwiaWRmYVwiLFxuICBVTUVOR19BTkRST0lEX0lEID0gXCJhbmRyb2lkX2lkXCIsXG4gIFVNRU5HX09BSUQgPSBcIm9haWRcIixcbiAgSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbml0KHQpIHtcbiAgICAgICAgICB0aGlzLmFwcGtleSA9IHQsIHRoaXMuYXBwSW5mbyA9IF9zeXN0ZW01LmRlZmF1bHQuZ2V0SW5mbygpLCBlKHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIgPSB0O1xuICAgICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19IRUFERVIkLCBVbWVuZ1V0aWxzLnRvU3RyKHQpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SGVhZGVyKHQpIHtcbiAgICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEY6XG4gICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0ID0gXCIxXCIsICEwID09PSBzICYmIGRlbGV0ZSB0aGlzLmhlYWRlci5hdG07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fQ0xPU0U6XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfRVZFTlQ6XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhlYWRlci5zdCwgZGVsZXRlIHRoaXMuaGVhZGVyLmF0bTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyO1xuICAgICAgICB9LFxuICAgICAgICBhZGRIZWFkZXJBdHRyKHQsIGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlciAmJiAodGhpcy5oZWFkZXJbdF0gPSBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SGVhZGVyQXR0cih0KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyICYmIHt9Lmhhc093blByb3BlcnR5LmNhbGwodGhpcy5oZWFkZXIsIHQpID8gdGhpcy5oZWFkZXJbdF0gOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQYWNrYWdlTmFtZSgpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwSW5mby5wYWNrYWdlTmFtZTtcbiAgICAgICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9LFxuICAgICAgICBzZXRGaXJzdFNlbmRGbGFnKCkge1xuICAgICAgICAgIHMgPSAhMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSh0KSB7XG4gICAgICBEZXZpY2VVdGlsLmdldEJhc2VJbmZvKCkudGhlbihlID0+IHtcbiAgICAgICAgRGV2aWNlVXRpbC5nZXRVbmlxdWVJZCgpLnRoZW4ociA9PiB7XG4gICAgICAgICAgRGV2aWNlVXRpbC5nZXROZXR3b3JrSW5mbyhzID0+IHtcbiAgICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0gPSBzO1xuICAgICAgICAgICAgdHlwZSA9PT0gTU9CSUxFX05FVFdPUktfTk9ORSAmJiAodHlwZSA9IFwidW5rbm93blwiKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBpKGUsIHIsIHR5cGUpO1xuICAgICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YSgkVU1FTkdfS0VZX0lNUFJJTlQkLCBlID0+IHtcbiAgICAgICAgICAgICAgMCAhPT0gZS5sZW5ndGggJiYgKGMuaW1wcmludCA9IGUpO1xuICAgICAgICAgICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5BUFBfRklSU1RfT1BFTl9GTEFHLCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gXCJ0cnVlXCIgPT09IGU7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGkgJiYgKHIgPSBuZXcgRGF0ZSgpLCBjLmF0bSA9IFwiMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgICAgICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5NT0JJTEVfQURWRVJUSVNJTkdfSUQsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IG4oZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZSA9IG8oVU1FTkdfQURWRVJUSVNUSU5HX0lELCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICBjLmlkX3RyYWNraW5nID0gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuTU9CSUxFX0FORFJPSURfSUQsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBuKGUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh0KSBpZiAoYy5pZF90cmFja2luZyAmJiBjLmlkX3RyYWNraW5nLnNuYXBzaG90cykgYy5pZF90cmFja2luZy5zbmFwc2hvdHNbVU1FTkdfQU5EUk9JRF9JRF0gPSB0O2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZSA9IG8oVU1FTkdfQU5EUk9JRF9JRCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmlkX3RyYWNraW5nID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuTU9CSUxFX09BSUQsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0KSBpZiAoYy5pZF90cmFja2luZyAmJiBjLmlkX3RyYWNraW5nLnNuYXBzaG90cykgYy5pZF90cmFja2luZy5zbmFwc2hvdHNbVU1FTkdfT0FJRF0gPSB0O2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlID0gbyhVTUVOR19PQUlELCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYy5pZF90cmFja2luZyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHQoYyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4odCkge1xuICAgICAgaWYgKHQpIHtcbiAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICBpZGVudGl0eTogdCxcbiAgICAgICAgICB2ZXJzaW9uOiAxLFxuICAgICAgICAgIHRzOiBEYXRlLm5vdygpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvKHQsIGUpIHtcbiAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgIHNuYXBzaG90czoge31cbiAgICAgIH07XG4gICAgICByZXR1cm4gbi5zbmFwc2hvdHNbdF0gPSBlLCBuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpKHQsIGUsIG4pIHtcbiAgICAgIGxldCBvID0gbnVsbDtcbiAgICAgIGlmICh0KSB7XG4gICAgICAgIGNvbnN0IG4gPSB0LnNjcmVlbldpZHRoLFxuICAgICAgICAgIGkgPSB0LnNjcmVlbkhlaWdodCxcbiAgICAgICAgICBzID0gbiA+IGkgPyBgJHtufSoke2l9YCA6IGAke2l9KiR7bn1gLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFwcEluZm86IGFwcEluZm9cbiAgICAgICAgICB9ID0gcixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICBicmFuZDogYnJhbmRcbiAgICAgICAgICB9ID0gdCxcbiAgICAgICAgICBjID0gYnJhbmQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbyA9IHtcbiAgICAgICAgICBhcHBfdmVyc2lvbjogYXBwSW5mby52ZXJzaW9uTmFtZSxcbiAgICAgICAgICB2ZXJzaW9uX2NvZGU6IGFwcEluZm8udmVyc2lvbkNvZGUsXG4gICAgICAgICAgYXBwX3NvdXJjZV9leHRyYTogYXBwSW5mby5zb3VyY2UuZXh0cmEsXG4gICAgICAgICAgZGV2aWNlX3R5cGU6IFwiUGhvbmVcIixcbiAgICAgICAgICBwYWNrYWdlX25hbWU6IGFwcEluZm8ucGFja2FnZU5hbWUsXG4gICAgICAgICAgc2RrX3R5cGU6IFwiQW5kcm9pZFwiLFxuICAgICAgICAgIG9zOiBcIkFuZHJvaWRcIixcbiAgICAgICAgICBzZGtfdmVyc2lvbjogY29uc3RhbnRzLlNES19WRVJTSU9OLFxuICAgICAgICAgIGFwcGtleTogci5hcHBrZXksXG4gICAgICAgICAgZGV2aWNlX21vZGVsOiBtb2RlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYykgPiAtMSA/IG1vZGVsIDogYyArIEJMQU5LX1NQQUNFICsgbW9kZWwsXG4gICAgICAgICAgZGV2aWNlX2JyYW5kOiBicmFuZCxcbiAgICAgICAgICBjaGFubmVsOiBjLFxuICAgICAgICAgIGRldmljZV9tYW51ZmFjdHVyZXI6IHQubWFudWZhY3R1cmVyLFxuICAgICAgICAgIGRldmljZV9tYW51aWQ6IG1vZGVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihjKSA+IC0xID8gbW9kZWwgOiBjICsgQkxBTktfU1BBQ0UgKyBtb2RlbCxcbiAgICAgICAgICBkZXZpY2VfbmFtZTogdC5wcm9kdWN0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihjKSA+IC0xID8gdC5wcm9kdWN0IDogYyArIEJMQU5LX1NQQUNFICsgdC5wcm9kdWN0LFxuICAgICAgICAgIG9zX3ZlcnNpb246IHQub3NWZXJzaW9uTmFtZSxcbiAgICAgICAgICByZXNvbHV0aW9uOiBzLFxuICAgICAgICAgIGxhbmd1YWdlOiB0Lmxhbmd1YWdlLFxuICAgICAgICAgIGRpc3BsYXlfbmFtZTogdC5uYW1lLFxuICAgICAgICAgIGlkbWQ1OiBVbWVuZ1V0aWxzLk1ENShlKSxcbiAgICAgICAgICBwbGF0Zm9ybTogXCJxdWlja2FwcFwiLFxuICAgICAgICAgIHByb192ZXI6IFwiMVwiXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgbyA9IHtcbiAgICAgICAgYXBwX3ZlcnNpb246IHIuYXBwSW5mby52ZXJzaW9uTmFtZSxcbiAgICAgICAgdmVyc2lvbl9jb2RlOiByLmFwcEluZm8udmVyc2lvbkNvZGUsXG4gICAgICAgIGRldmljZV90eXBlOiBcIlBob25lXCIsXG4gICAgICAgIHBhY2thZ2VfbmFtZTogci5hcHBJbmZvLnBhY2thZ2VOYW1lLFxuICAgICAgICBzZGtfdHlwZTogXCJBbmRyb2lkXCIsXG4gICAgICAgIG9zOiBcIkFuZHJvaWRcIixcbiAgICAgICAgc2RrX3ZlcnNpb246IGNvbnN0YW50cy5TREtfVkVSU0lPTixcbiAgICAgICAgYXBwa2V5OiByLmFwcGtleSxcbiAgICAgICAgaWRtZDU6IFVtZW5nVXRpbHMuTUQ1KGUpLFxuICAgICAgICBwbGF0Zm9ybTogXCJxdWlja2FwcFwiLFxuICAgICAgICBwcm9fdmVyOiBcIjFcIlxuICAgICAgfTtcbiAgICAgIHN3aXRjaCAobikge1xuICAgICAgICBjYXNlIE1PQklMRV9ORVRXT1JLXzRHOlxuICAgICAgICAgIG8uYWNjZXNzX3N1YnR5cGUgPSBcIkxURVwiLCBvLmFjY2VzcyA9IFwiMkcvM0dcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNT0JJTEVfTkVUV09SS18zRzpcbiAgICAgICAgICBvLmFjY2Vzc19zdWJ0eXBlID0gXCJDRE1BXCIsIG8uYWNjZXNzID0gXCIyRy8zR1wiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE1PQklMRV9ORVRXT1JLXzJHOlxuICAgICAgICAgIG8uYWNjZXNzX3N1YnR5cGUgPSBcIkdSUFNcIiwgby5hY2Nlc3MgPSBcIjJHLzNHXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgby5hY2Nlc3MgPSBuLCBkZWxldGUgby5hY2Nlc3Nfc3VidHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvO1xuICAgIH1cbiAgICBsZXQgciA9IG51bGwsXG4gICAgICBzID0gITE7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gciB8fCAociA9IHQoKSksIHI7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpO1xuTG9vcGVyLnByb3RvdHlwZSA9IHtcbiAgcHJlcGFyZSh0KSB7XG4gICAgdGhpcy5xdWV1ZU9iamVjdCA9IHQsIHRoaXMuaXNSdW5uaW5nID0gITEsIHRoaXMuaXNGb3JjZVN0b3AgPSAhMTtcbiAgfSxcbiAgbG9vcCgpIHtcbiAgICBpZiAoIXRoaXMuaXNGb3JjZVN0b3AgJiYgdGhpcy5xdWV1ZU9iamVjdCAmJiAhdGhpcy5pc1J1bm5pbmcpIGZvciAodGhpcy5pc1J1bm5pbmcgPSAhMDsgdGhpcy5pc1J1bm5pbmc7KSB7XG4gICAgICBpZiAoIXRoaXMucXVldWVPYmplY3QuaXNDYW5Qb3AoKSkge1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9ICExO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucXVldWVPYmplY3QuZGlzcGF0Y2hNZXNzYWdlKCk7XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgIH1cbiAgfSxcbiAgd2FpdCgpIHtcbiAgICB0aGlzLmlzUnVubmluZyA9ICExO1xuICB9LFxuICBmb3JjZVN0b3AoKSB7XG4gICAgdGhpcy5pc0ZvcmNlU3RvcCA9ICEwO1xuICB9LFxuICBjYW5jZWxGb3JjZVN0b3AoKSB7XG4gICAgdGhpcy5pc0ZvcmNlU3RvcCA9ICExLCB0aGlzLmxvb3AoKTtcbiAgfVxufTtcbmNvbnN0IFJlcXVlc3RRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0KHQpIHtcbiAgICAgIHJldHVybiAhIXQgJiYgKGYudW5zaGlmdCh0KSwgdS5sb29wKCksICEwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgIGlmIChmLmxlbmd0aCA+IDApIHJldHVybiBmLnBvcCgpO1xuICAgICAgY29uc3QgdCA9IGwubGVuZ3RoO1xuICAgICAgcmV0dXJuIHQgPiAwID8gKDEgPT09IHQgJiYgUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLmNsZWFyTm9TZW5kRGF0YXMoKSwgbC5wb3AoKSkgOiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKHQsIGUpIHtcbiAgICAgIGNvbnN0IG4gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBvKHQpO1xuICAgICAgICB9LCAzZTQpLFxuICAgICAgICBpID0ge1xuICAgICAgICAgIGtleTogdCxcbiAgICAgICAgICB0aW1lT3V0RnVuOiBuLFxuICAgICAgICAgIGlzRXhlOiAhMVxuICAgICAgICB9O1xuICAgICAgZy5wdXNoKGkpLCBlKHQgPT4ge1xuICAgICAgICBvKHQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG8odCkge1xuICAgICAgZm9yIChsZXQgZSA9IGcubGVuZ3RoIC0gMTsgZSA+PSAwOyBlLS0pIHtcbiAgICAgICAgY29uc3QgbiA9IGdbZV07XG4gICAgICAgIGlmIChuLmtleSA9PT0gdCkge1xuICAgICAgICAgIGlmICghbi5pc0V4ZSkge1xuICAgICAgICAgICAgbi5pc0V4ZSA9ICEwO1xuICAgICAgICAgICAgY29uc3QgdCA9IG4udGltZU91dEZ1bjtcbiAgICAgICAgICAgIHQgJiYgY2xlYXJUaW1lb3V0KHQpLCBpKCksIGcuc3BsaWNlKGUsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpKCkge1xuICAgICAgKEUgLT0gMSkgPD0gXyAmJiB1Lmxvb3AoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcih0KSB7XG4gICAgICBjb25zdCBlID0gZy5sZW5ndGgsXG4gICAgICAgIG4gPSB0Lm1kNUtleTtcbiAgICAgIGZvciAobGV0IHQgPSBlIC0gMTsgdCA+PSAwOyB0LS0pIHtcbiAgICAgICAgY29uc3QgZSA9IGdbdF07XG4gICAgICAgIGlmIChlLmtleSA9PT0gbikgcmV0dXJuIGkoKSwgITA7XG4gICAgICB9XG4gICAgICByZXR1cm4gITE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHMoKSB7XG4gICAgICBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkub25Ob1NlbmREYXRhc0xpc3RlbmVyKHQgPT4ge1xuICAgICAgICBpZiAoIXQgfHwgMCA9PT0gdC5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBlIGluIHQpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIGUpKSB7XG4gICAgICAgICAgY29uc3QgbiA9IHtcbiAgICAgICAgICAgIG1kNUtleTogdFtlXSxcbiAgICAgICAgICAgIHR5cGU6IFwic2Vjb25kXCJcbiAgICAgICAgICB9O1xuICAgICAgICAgIGwucHVzaChuKTtcbiAgICAgICAgfVxuICAgICAgICB1Lmxvb3AoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjKCkge1xuICAgICAgcmV0dXJuIHMoKSwge1xuICAgICAgICBoYW5kbGVNZXNzYWdlKGUsIG4pIHtcbiAgICAgICAgICBlICYmIFwic2Vjb25kXCIgPT09IGUudHlwZSAmJiBpKCksIGUgJiYgZS5kYXRhICYmIChlLmV4ZWN1dGVGdW5jdGlvbiA9IG4sIHQoZSkpO1xuICAgICAgICB9LFxuICAgICAgICBkaXNwYXRjaE1lc3NhZ2UoKSB7XG4gICAgICAgICAgaWYgKEUgPiBfKSByZXR1cm4gdm9pZCB1LndhaXQoKTtcbiAgICAgICAgICBFICs9IDE7XG4gICAgICAgICAgY29uc3QgdCA9IGUoKTtcbiAgICAgICAgICByKHQpIHx8ICh0LmRhdGEgPyBuKHQubWQ1S2V5LCB0LmV4ZWN1dGVGdW5jdGlvbikgOiBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuc2VuZCh0KSwgdGhpcy5pc0NhblBvcCgpIHx8IHUud2FpdCgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDYW5Qb3AoKSB7XG4gICAgICAgICAgcmV0dXJuIGYubGVuZ3RoID4gMCB8fCBsLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGxldCBhLCB1O1xuICAgIGNvbnN0IGYgPSBbXSxcbiAgICAgIGwgPSBbXSxcbiAgICAgIF8gPSAzO1xuICAgIGxldCBFID0gMTtcbiAgICBjb25zdCBnID0gW107XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gYSB8fCAoYSA9IGMoKSwgKHUgPSBuZXcgTG9vcGVyKCkpLnByZXBhcmUoYSkpLCBhO1xuICAgICAgfVxuICAgIH07XG4gIH0oKSxcbiAgU3RvcmVRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0KHQpIHtcbiAgICAgIGlmICghdCkgcmV0dXJuICExO1xuICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAga2V5OiB0LFxuICAgICAgICB0eXBlOiBfXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHUudW5zaGlmdChlKSwgYS5sb29wKCksICEwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlKCkge1xuICAgICAgaWYgKHUubGVuZ3RoID4gMCkgcmV0dXJuIHUucG9wKCk7XG4gICAgICBjb25zdCB0ID0gZi5sZW5ndGg7XG4gICAgICBpZiAodCA+IDApIHtcbiAgICAgICAgY29uc3QgZSA9IGYucG9wKCk7XG4gICAgICAgIHJldHVybiAwID09PSB0ICYmIG4oKSwgZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuKCksIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4oKSB7XG4gICAgICBnIHx8IChnID0gITAsIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLktFWV9OT19TRU5EX1JFUVVFU1RfS0VZUywgdCA9PiB7XG4gICAgICAgIGcgPSAhMTtcbiAgICAgICAgaWYgKCF0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IGUgPSBVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkodCk7XG4gICAgICAgIGNvbnN0IG4gPSB0ID0+IGUgPT4ge1xuICAgICAgICAgIGUgJiYgJ1wiXCInICE9PSBlIHx8IChlID0ge1xuICAgICAgICAgICAga2V5OiB0LFxuICAgICAgICAgICAgdHlwZTogRVxuICAgICAgICAgIH0sIGYucHVzaChlKSk7XG4gICAgICAgICAgZi5sZW5ndGggPiAwICYmIGEubG9vcCgpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGNvbnN0IHQgaW4gZSkgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoZSwgdCkpIHtcbiAgICAgICAgICBjb25zdCBvID0gZVt0XTtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKG8sIG4obykpO1xuICAgICAgICB9XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGcgPSAhMTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbyh0KSB7XG4gICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIGUgPT4ge1xuICAgICAgICBlID0gZSA/IFVtZW5nVXRpbHMudG9PYmplY3QoZSkgOiBbXTtcbiAgICAgICAgZS5wdXNoKHQpO1xuICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIFVtZW5nVXRpbHMudG9TdHIoZSksICgpID0+IHtcbiAgICAgICAgICByKHQpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgcih0KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHIodCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaSh0KSB7XG4gICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIGUgPT4ge1xuICAgICAgICBpZiAoIWUpIHJldHVybiB2b2lkIHIodCk7XG4gICAgICAgIGUgPSBVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkoZSk7XG4gICAgICAgIGZvciAoY29uc3QgbiBpbiBlKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChlLCBuKSkge1xuICAgICAgICAgIGNvbnN0IG8gPSBlW25dO1xuICAgICAgICAgIGlmIChvID09PSB0KSB7XG4gICAgICAgICAgICBlLnNwbGljZShuLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIFVtZW5nVXRpbHMudG9TdHIoZSksICgpID0+IHtcbiAgICAgICAgICByKHQpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgcih0KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHIodCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcigpIHtcbiAgICAgIChkIC09IDEpIDw9IGwgJiYgYS5sb29wKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHMoKSB7XG4gICAgICByZXR1cm4gbigpLCB7XG4gICAgICAgIGhhbmRsZU1lc3NhZ2UoZSkge1xuICAgICAgICAgIGUgPyB0KGUpIDogbigpO1xuICAgICAgICB9LFxuICAgICAgICBkaXNwYXRjaE1lc3NhZ2UoKSB7XG4gICAgICAgICAgaWYgKGQgPiBsKSByZXR1cm4gdm9pZCBhLndhaXQoKTtcbiAgICAgICAgICBkICs9IDE7XG4gICAgICAgICAgY29uc3QgdCA9IGUoKTtcbiAgICAgICAgICBpZiAoIXQgfHwgbnVsbCA9PT0gdCkgcmV0dXJuIHZvaWQgcigpO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGtleToga2V5XG4gICAgICAgICAgfSA9IHQ7XG4gICAgICAgICAgdC50eXBlID09PSBfID8gbyhrZXkpIDogaShrZXkpLCB0aGlzLmlzQ2FuUG9wKCkgfHwgYS53YWl0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ2FuUG9wKCkge1xuICAgICAgICAgIHJldHVybiB1Lmxlbmd0aCA+IDAgfHwgZi5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgYywgYTtcbiAgICBjb25zdCB1ID0gW10sXG4gICAgICBmID0gW10sXG4gICAgICBsID0gMSxcbiAgICAgIF8gPSBcIndyaXRlXCIsXG4gICAgICBFID0gXCJkZWxldGVcIjtcbiAgICBsZXQgZyA9ICExLFxuICAgICAgZCA9IDE7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gYyB8fCAoYyA9IHMoKSwgKGEgPSBuZXcgTG9vcGVyKCkpLnByZXBhcmUoYykpLCBjO1xuICAgICAgfVxuICAgIH07XG4gIH0oKSxcbiAgJFVNRU5HX0tFWV9JTVBSSU5UJCQxID0gXCJ1bWVuZ19rZXlfaW1wcmludFwiO1xubGV0IG5vU2VuZFJlcXVlc3RLZXlzID0gW107XG5jb25zdCBSZXF1ZXN0SGVscGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHQoKSB7XG4gICAgICBjb25zdCB0ID0gW10uY29uY2F0KFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5nZXRTZXNzaW9ucygpKTtcbiAgICAgIGlmICh0ICYmIDAgIT09IHQubGVuZ3RoKSByZXR1cm4gU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmNsZWFyU2Vzc2lvbnMoKSwgdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgIGNvbnN0IHQgPSBbXS5jb25jYXQoU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmdldEhhbGZTZXNzaW9ucygpKTtcbiAgICAgIGlmICh0ICYmIDAgIT09IHQubGVuZ3RoKSByZXR1cm4gU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmNsZWFySGFsZlNlc3Npb24oKSwgdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gbih0KSB7XG4gICAgICBTdG9yYWdlVXRpbC5kZWxldGVEYXRhKHQsIHQgPT4ge1xuICAgICAgICB0ICYmIFN0b3JlUXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVNZXNzYWdlKG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG8odCwgZSwgbywgcikge1xuICAgICAgaWYgKCF0IHx8ICdcIlwiJyA9PT0gdCkgcmV0dXJuIHZvaWQgKG8gJiYgbyhlKSk7XG4gICAgICBjb25zdCBzID0gY29uc3RhbnRzLlJFTEVBU0VfVVJMO1xuICAgICAgX3N5c3RlbTYuZGVmYXVsdC5mZXRjaCh7XG4gICAgICAgIHVybDogcyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogVW1lbmdVdGlscy5lbmNvZGUodCksXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwicXVpY2thcHAvanNvblwiLFxuICAgICAgICAgIFwiTXNnLVR5cGVcIjogXCJxdWlja2FwcC9qc29uXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2Vzcyh0KSB7XG4gICAgICAgICAgaWYgKDIwMCA9PT0gdC5jb2RlKSB7XG4gICAgICAgICAgICBMb2cuaShcIioqKiB1bWVuZ19zZGsgKioqIHJlcXVlc3Qgc2VuZCBzdWNjZXNzXCIpLCBuKGUpLCByICYmIHIoZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBlID0gVW1lbmdVdGlscy50b09iamVjdCh0LmRhdGEpO1xuICAgICAgICAgICAgICBpKGUuaW1wcmludCk7XG4gICAgICAgICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgICAgIH0gZWxzZSA0MTMgPT09IHQuY29kZSAmJiAoTG9nLmkoXCIqKiogdW1lbmdfc2RrICoqKiByZXF1ZXN0IGlzIHRvIGxhcmdlIVwiKSwgbihlKSwgciAmJiByKGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKHQsIGUpIHtcbiAgICAgICAgICBMb2cuaShcIioqKiB1bWVuZ19zZGsgKioqIHJlcXVlc3QgZXJyb3IsIHBsZWFzZSBjaGVjayB5b3VyIHBlcm1pc3Npb24hIFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgbyAmJiBvKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaSh0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodCkge1xuICAgICAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoJFVNRU5HX0tFWV9JTVBSSU5UJCQxLCB0KSwgSGVhZGVyLmdldEluc3RhbmNlKCkuYWRkSGVhZGVyQXR0cihcImltcHJpbnRcIiwgdCk7XG4gICAgICAgICAgY29uc3QgZSA9IFVtZW5nVXRpbHMudG9PYmplY3QoVW1lbmdVdGlscy5kZWNvZGUodCkpLFxuICAgICAgICAgICAgbiA9IGUucmVwb3J0X3BvbGljeTtcbiAgICAgICAgICBpZiAobiAmJiBVbWVuZ1V0aWxzLmlzTm90QU51bWJlcihuKSkge1xuICAgICAgICAgICAgaWYgKFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgbiksIG4gPT09IGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1lfSU5URVJWQUxfVkFMVUUpIHtcbiAgICAgICAgICAgICAgbGV0IHQgPSBlLnJlcG9ydF9pbnRlcnZhbDtcbiAgICAgICAgICAgICAgdCAmJiBVbWVuZ1V0aWxzLmlzTm90QU51bWJlcih0KSA/ICh0IDw9IGNvbnN0YW50cy5FVkVOVF9TRU5EX01JTl9JTlRFUlZBTCA/IHQgPSBjb25zdGFudHMuRVZFTlRfU0VORF9NSU5fSU5URVJWQUwgOiB0ID4gY29uc3RhbnRzLkVWRU5UX1NFTkRfTUFYX0lOVEVSVkFMICYmICh0ID0gY29uc3RhbnRzLkVWRU5UX1NFTkRfTUFYX0lOVEVSVkFMKSwgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfSU5URVJWQUxfVElNRSwgdCkpIDogU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCBjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX1NUQVJUX1NFTkRfVkFMVUUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1ksIGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1lfU1RBUlRfU0VORF9WQUxVRSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHIodCwgZSkge1xuICAgICAgY29uc3QgbiA9IFVtZW5nVXRpbHMudG9TdHIoZSk7XG4gICAgICBsZXQgbyA9IG51bGw7XG4gICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fSEFMRjpcbiAgICAgICAgICBvID0gY29uc3RhbnRzLktFWV9IQUxGX1NFU1NJT05fUFJFRklYO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRTpcbiAgICAgICAgICBvID0gY29uc3RhbnRzLktFWV9DTE9TRV9TRVNTSU9OX1BSRUZJWDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UOlxuICAgICAgICAgIG8gPSBjb25zdGFudHMuS0VZX0VWRU5UX1BSRUZJWDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGkgPSBvICsgVW1lbmdVdGlscy5NRDUobik7XG4gICAgICByZXR1cm4gU3RvcmFnZVV0aWwucHV0RGF0YShpLCBuKSwgU3RvcmVRdWV1ZS5nZXRJbnN0YW5jZSgpLmhhbmRsZU1lc3NhZ2UoaSksIDAgPT09IG5vU2VuZFJlcXVlc3RLZXlzLmxlbmd0aCAmJiBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIHQgPT4ge1xuICAgICAgICBpZiAoIXQpIHJldHVybjtcbiAgICAgICAgY29uc3QgZSA9IFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheSh0KTtcbiAgICAgICAgMCA9PT0gbm9TZW5kUmVxdWVzdEtleXMubGVuZ3RoICYmIChub1NlbmRSZXF1ZXN0S2V5cyA9IGUsIGEgJiYgYShub1NlbmRSZXF1ZXN0S2V5cykpO1xuICAgICAgfSksIGk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJhbXNJc1ZhbGlkKHQpIHtcbiAgICAgICAgICByZXR1cm4gLTEgIT09IFtjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fSEFMRiwgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFLCBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UXS5pbmRleE9mKHQpO1xuICAgICAgICB9LFxuICAgICAgICBidWlsZFNlbmRDb250ZW50KG4sIG8pIHtcbiAgICAgICAgICBpZiAoSGVhZGVyLmdldEluc3RhbmNlKCkuZ2V0SGVhZGVyKG4pKSB7XG4gICAgICAgICAgICBjb25zdCBpID0ge1xuICAgICAgICAgICAgICBoZWFkZXI6IEhlYWRlci5nZXRJbnN0YW5jZSgpLmdldEhlYWRlcihuKSxcbiAgICAgICAgICAgICAgYW5hbHl0aWNzOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoIChuKSB7XG4gICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEY6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGUoKTtcbiAgICAgICAgICAgICAgICAgIGlmICghdCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBpLmFuYWx5dGljcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbnM6IHRcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGUgPSB0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgaS5hbmFseXRpY3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiBlXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfRVZFTlQ6XG4gICAgICAgICAgICAgICAgbyAmJiBvLmxlbmd0aCA+IDAgJiYgKGkuYW5hbHl0aWNzID0ge1xuICAgICAgICAgICAgICAgICAgZWt2OiBvXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcyA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gaS5hbmFseXRpY3MgJiYgKHMgPSByKG4sIGkpKSwge1xuICAgICAgICAgICAgICBkYXRhOiBpLFxuICAgICAgICAgICAgICBtZDVLZXk6IHNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZW5kKHQsIGUpIHtcbiAgICAgICAgICBjb25zdCBuID0gdC5tZDVLZXk7XG4gICAgICAgICAgbiAmJiAoXCJzZWNvbmRcIiA9PT0gdC50eXBlID8gU3RvcmFnZVV0aWwuZ2V0RGF0YShuLCBuID0+IHtcbiAgICAgICAgICAgIHQuZGF0YSA9IFVtZW5nVXRpbHMudG9PYmplY3Qobik7XG4gICAgICAgICAgICB0LmRhdGEgfHwgZSAmJiBlKCk7XG4gICAgICAgICAgICBSZXF1ZXN0UXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVNZXNzYWdlKHQsIG4gPT4ge1xuICAgICAgICAgICAgICBvKFVtZW5nVXRpbHMudG9TdHIodC5kYXRhKSwgdC5tZDVLZXksIG4sIGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkgOiBSZXF1ZXN0UXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVNZXNzYWdlKHQsIG4gPT4ge1xuICAgICAgICAgICAgbyhVbWVuZ1V0aWxzLnRvU3RyKHQuZGF0YSksIHQubWQ1S2V5LCBuLCBlKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE5vU2VuZFJlcXVlc3RLZXlzKCkge1xuICAgICAgICAgIHJldHVybiBub1NlbmRSZXF1ZXN0S2V5cztcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob1NlbmREYXRhc0xpc3RlbmVyKHQpIHtcbiAgICAgICAgICBhID0gdDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJOb1NlbmREYXRhcygpIHtcbiAgICAgICAgICBub1NlbmRSZXF1ZXN0S2V5cy5zcGxpY2UoMCwgbm9TZW5kUmVxdWVzdEtleXMubGVuZ3RoKSwgbm9TZW5kUmVxdWVzdEtleXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgbGV0IGMsIGE7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gYyB8fCAoYyA9IHMoKSksIGM7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpLFxuICBFdmVudFN0b3JlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdCh0KSB7XG4gICAgICBpZiAodCkge1xuICAgICAgICBpZiAoIVNlc3Npb24uZ2V0SW5zdGFuY2UoKS5nZXRDdXJyZW50U2Vzc2lvbklkKCkpIHJldHVybiB2b2lkIFUudW5zaGlmdCh0KTtcbiAgICAgICAgcC51bnNoaWZ0KHQpLCBwLmxlbmd0aCA+PSBfICYmIGcubG9vcCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlKCkge1xuICAgICAgcmV0dXJuIHAubGVuZ3RoIDwgXyA/IG51bGwgOiBwLnNwbGljZSgwLCBfKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbigpIHtcbiAgICAgIGggJiYgaC5sZW5ndGggPiAwICYmIHModCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZSBpbiBoKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChoLCBlKSkgdHJ5IHtcbiAgICAgICAgICBoW2VdKHQpO1xuICAgICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgfSksIChkIC09IDEpIDwgMSAmJiAoZCA9IDEpLCBkIDw9IEUgJiYgZy5sb29wKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG8odCwgZSkge1xuICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YSh1LCBlLCAoKSA9PiB7XG4gICAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoZiwgVW1lbmdVdGlscy50b1N0cih0KSwgKCkgPT4ge1xuICAgICAgICAgIG4oKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIG4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIG4oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpKHQsIGUpIHtcbiAgICAgIHQgJiYgKGhbdF0gPSBlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcih0KSB7XG4gICAgICB0ICYmIGRlbGV0ZSBoW3RdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzKHQpIHtcbiAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoZiwgZSA9PiB7XG4gICAgICAgIFN0b3JhZ2VVdGlsLmRlbGV0ZURhdGEoZiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG4gPSBjKFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheShlKSwgcCk7XG4gICAgICAgICAgcC5zcGxpY2UoMCwgcC5sZW5ndGgpO1xuICAgICAgICAgIHQobik7XG4gICAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHQoW10pO1xuICAgICAgICBnLmNhbmNlbEZvcmNlU3RvcCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGModCwgZSkge1xuICAgICAgY29uc3QgbiA9IFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5nZXRDdXJyZW50U2Vzc2lvbklkKCk7XG4gICAgICBsZXQgbyxcbiAgICAgICAgaSA9IC0xO1xuICAgICAgZm9yIChjb25zdCBlIGluIHQpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIGUpKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0W2VdO1xuICAgICAgICBpZiAobyA9IHJbbl0pIHtcbiAgICAgICAgICBpID0gZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xID09PSBpICYmIChvID0gW10pLCAobyA9IG8uY29uY2F0KGUpKSAmJiAwICE9PSBvLmxlbmd0aCA/ICgtMSA9PT0gaSA/IHQucHVzaCh7XG4gICAgICAgIFtuXTogb1xuICAgICAgfSkgOiB0W2ldW25dID0gbywgdCkgOiB0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZUVrdkRhdGEoZSkge1xuICAgICAgICAgIHQoZSksIExvZy5kKGBbc2F2ZUVrdkRhdGFdIGRhdGEgaXMgJHtVbWVuZ1V0aWxzLnRvU3RyKGUpfWApO1xuICAgICAgICB9LFxuICAgICAgICByZWFkRWt2RGF0YXModCkge1xuICAgICAgICAgIHQgJiYgKGcuZm9yY2VTdG9wKCksIGQgPD0gRSA/IHMoZSA9PiB7XG4gICAgICAgICAgICB0KGUpO1xuICAgICAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgICAgICB9KSA6IGkoXCJyZWFkRWt2RGF0YXNcIiwgZSA9PiB7XG4gICAgICAgICAgICB0KGUpO1xuICAgICAgICAgICAgcihcInJlYWRFa3ZEYXRhc1wiKTtcbiAgICAgICAgICAgIGcuY2FuY2VsRm9yY2VTdG9wKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVyTm9TZXNzaW9uRWt2RGF0YXMoKSB7XG4gICAgICAgICAgaWYgKFUgJiYgVS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBMb2cuZChgbm8gc2Vzc2lvbklkIGV2ZW50IGlzICR7SlNPTi5zdHJpbmdpZnkoVSl9YCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHQgaW4gVSkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFUsIHQpICYmIHRoaXMuc2F2ZUVrdkRhdGEoVVt0XSk7XG4gICAgICAgICAgICBVLnNwbGljZSgwLCBVLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBxdWl0SGFuZGxlcigpIHtcbiAgICAgICAgICAwICE9PSBwLmxlbmd0aCAmJiAoZy5mb3JjZVN0b3AoKSwgZCA8PSBFID8gU3RvcmFnZVV0aWwuZ2V0RGF0YShmLCB0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSBjKFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheSh0KSwgcCk7XG4gICAgICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGYsIFVtZW5nVXRpbHMudG9TdHIoZSkpO1xuICAgICAgICAgICAgcC5zcGxpY2UoMCwgcC5sZW5ndGgpO1xuICAgICAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBnLmNhbmNlbEZvcmNlU3RvcCgpO1xuICAgICAgICAgIH0pIDogaShcInF1aXRIYW5kbGVyXCIsIHQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZSA9IFVtZW5nVXRpbHMudG9TdHIoYyh0LCBwKSk7XG4gICAgICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGYsIGUpO1xuICAgICAgICAgICAgcC5zcGxpY2UoMCwgcC5sZW5ndGgpO1xuICAgICAgICAgICAgcihcInF1aXRIYW5kbGVyXCIpO1xuICAgICAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3BhdGNoTWVzc2FnZSgpIHtcbiAgICAgICAgICBpZiAoZCA+IEUpIHJldHVybiB2b2lkIGcud2FpdCgpO1xuICAgICAgICAgIGQgKz0gMTtcbiAgICAgICAgICBjb25zdCB0ID0gZSgpO1xuICAgICAgICAgIGlmICghdCB8fCAwID09PSB0Lmxlbmd0aCkgcmV0dXJuIHZvaWQgbigpO1xuICAgICAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEodSwgZSA9PiB7XG4gICAgICAgICAgICBlIHx8IChlID0gMCk7XG4gICAgICAgICAgICBlID49IGwgKyB0Lmxlbmd0aCA/IG4oKSA6IFN0b3JhZ2VVdGlsLmdldERhdGEoZiwgbiA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGkgPSBjKFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheShuKSwgdCk7XG4gICAgICAgICAgICAgIG8oaSwgTnVtYmVyKGUpICsgTnVtYmVyKHQubGVuZ3RoKSk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIG4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIG4oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDYW5Qb3AoKSB7XG4gICAgICAgICAgcmV0dXJuIHAubGVuZ3RoID49IF87XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHUgPSBcInVtZW5nX2Vrdl9jb3VudF9rZXlcIixcbiAgICAgIGYgPSBcInVtZW5nX2tleV9la3ZzXCIsXG4gICAgICBsID0gMWU0LFxuICAgICAgXyA9IDUsXG4gICAgICBFID0gMTtcbiAgICBsZXQgZyxcbiAgICAgIGQgPSAxLFxuICAgICAgUyA9IG51bGw7XG4gICAgY29uc3QgaCA9IHt9LFxuICAgICAgcCA9IFtdLFxuICAgICAgVSA9IFtdO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIFMgfHwgKFMgPSBuZXcgYSgpLCAoZyA9IG5ldyBMb29wZXIoKSkucHJlcGFyZShTKSksIFM7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpLFxuICBFdmVudENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdCh0LCBlKSB7XG4gICAgICBjb25zdCBuID0ge1xuICAgICAgICBpZDogdCxcbiAgICAgICAgdHM6IERhdGUubm93KClcbiAgICAgIH07XG4gICAgICBzd2l0Y2ggKHR5cGVvZiBlKSB7XG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBuW3RdID0gZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgIGZvciAoY29uc3QgdCBpbiBlKSAoe30pLmhhc093blByb3BlcnR5LmNhbGwoZSwgdCkgJiYgKG5bdF0gPSBlW3RdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlKCkge1xuICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCB0ID0+IHtcbiAgICAgICAgdCA9PT0gY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9JTlRFUlZBTF9WQUxVRSAmJiBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9JTlRFUlZBTF9USU1FLCB0ID0+IHtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5FVkVOVF9MQVNUX1NFTkRfVElNRSwgZSA9PiB7XG4gICAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgICBjb25zdCBuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgZSAmJiBuIC0gZSA+IDFlMyAqIHQgJiYgUmVxdWVzdC5zZW5kQWxsKCk7XG4gICAgICAgICAgICB9IGVsc2UgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCBjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX1NUQVJUX1NFTkRfVkFMVUUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkRXZlbnQobiwgbykge1xuICAgICAgICAgIGNvbnN0IGkgPSB0KG4sIG8pO1xuICAgICAgICAgIEV2ZW50U3RvcmVRdWV1ZS5nZXRJbnN0YW5jZSgpLnNhdmVFa3ZEYXRhKGkpLCBlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZXJOb1Nlc3Npb25Fa3ZEYXRhcygpIHtcbiAgICAgICAgICBFdmVudFN0b3JlUXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVyTm9TZXNzaW9uRWt2RGF0YXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcXVpdEhhbmRsZXIoKSB7XG4gICAgICAgICAgRXZlbnRTdG9yZVF1ZXVlLmdldEluc3RhbmNlKCkucXVpdEhhbmRsZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U2VuZFRpbWUoKSB7XG4gICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRVZFTlRfTEFTVF9TRU5EX1RJTUUsIERhdGUubm93KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgbztcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIHJldHVybiBvIHx8IChvID0gbigpKSwgbztcbiAgICAgIH1cbiAgICB9O1xuICB9KCk7XG5sZXQgdGltZSA9IDA7XG52YXIgUmVxdWVzdCA9IHtcbiAgc2VuZDogc2VuZCxcbiAgc2VuZEFsbDogc2VuZEFsbFxufTtcbmNvbnN0IEtFWV9QUkVfUEFHRSA9IFwidW1lbmdfcGFnZV9cIjtcblBhZ2VDb250cm9sbGVyLnByb3RvdHlwZSA9IHtcbiAgYWRkQ3VycmVudFBhZ2UodCkge1xuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0ge1xuICAgICAgdHM6IERhdGUubm93KCksXG4gICAgICBwYWdlX25hbWU6IERldmljZVV0aWwuZ2V0UGFnZU5hbWUoKVxuICAgIH0sIHRoaXMucGFnZU9iamVjdCA9IHQ7XG4gIH0sXG4gIHNhdmVQYWdlKHQsIGUpIHtcbiAgICBpZiAodCAmJiBlICYmIHRoaXMuX2N1cnJlbnRQYWdlLnBhZ2VfbmFtZSAmJiBlID09PSB0aGlzLnBhZ2VPYmplY3QpIHtcbiAgICAgIGNvbnN0IGUgPSBEYXRlLm5vdygpIC0gdGhpcy5fY3VycmVudFBhZ2UudHM7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZS5kdXJhdGlvbiA9IE1hdGguYWJzKGUpLCB0aGlzLl9wYWdlbGlzdCA9IHRoaXMuX3BhZ2VsaXN0LmNvbmNhdCh0aGlzLl9jdXJyZW50UGFnZSksIHRoaXMuX2N1cnJlbnRQYWdlID0ge30sIHRoaXMucGFnZU9iamVjdCA9IHt9LCB0aGlzLnNhdmVTdHJvcmFnZVBhZ2VzKHQpO1xuICAgIH1cbiAgfSxcbiAgc2F2ZVN0cm9yYWdlUGFnZXModCkge1xuICAgIHQgJiYgdGhpcy5fcGFnZWxpc3QubGVuZ3RoID4gMCAmJiB0aGlzLnVwZGF0ZVN0b3JhZ2UoS0VZX1BSRV9QQUdFICsgdCwgdGhpcy5fcGFnZWxpc3QpO1xuICB9LFxuICBnZXRQYWdlcyh0LCBlKSB7XG4gICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShLRVlfUFJFX1BBR0UgKyB0LCBuID0+IHtcbiAgICAgIGNvbnN0IG8gPSBVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkobikuY29uY2F0KHRoaXMuX3BhZ2VsaXN0KTtcbiAgICAgIHRoaXMuY2xlYXIodCk7XG4gICAgICBlICYmIGUobyk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgZSAmJiBlKG51bGwpO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGVTdG9yYWdlKHQsIGUpIHtcbiAgICBlICYmIDAgIT09IGUubGVuZ3RoICYmIFN0b3JhZ2VVdGlsLmdldERhdGEodCwgbiA9PiB7XG4gICAgICBjb25zdCBvID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KG4pLmNvbmNhdChlKTtcbiAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEodCwgVW1lbmdVdGlscy50b1N0cihvKSwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9wYWdlbGlzdCA9IFtdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsZWFyKHQpIHtcbiAgICBTdG9yYWdlVXRpbC5kZWxldGVEYXRhKEtFWV9QUkVfUEFHRSArIHQpLCB0aGlzLl9wYWdlbGlzdCA9IFtdO1xuICB9XG59O1xubGV0IGluaXRlZCA9ICExO1xuVW1lbmdBbmFseXNpc0xpYi5wcm90b3R5cGUgPSB7XG4gIGluaXQodCkge1xuICAgIGlmIChMb2cuaShgKioqIHVtZW5nX3NkayAqKiogc2RrIHZlcnNpb24gaXM6ICR7Y29uc3RhbnRzLlNES19WRVJTSU9OfWApLCAhaW5pdGVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmFwcGtleSA9IHQuJGRhdGEudW1lbmdfYXBwa2V5O1xuICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgIGlmICghdGhpcy5hcHBrZXkpIHJldHVybiBpbml0ZWQgPSAhMSwgdm9pZCBjb25zb2xlLmVycm9yKFwicGxlYXNlIHNldCB1bWVuZ19hcHBrZXkgOiBbbWFuaWZlc3QuanNvbiAtLVxceDNlIGNvbmZpZzp7ZGF0YTp7dW1lbmdfYXBwa2V5OiB4eHh9fV1cIik7XG4gICAgICBpbml0ZWQgPSAhMCwgSGVhZGVyLmdldEluc3RhbmNlKCkuaW5pdCh0aGlzLmFwcGtleSk7XG4gICAgICBjb25zdCBlID0gdGhpcztcbiAgICAgIGlmIChTZXNzaW9uLmdldEluc3RhbmNlKCkuc2V0T25TZXNzaW9uTGlzdGVuZXIodCA9PiAoe1xuICAgICAgICBwYWdlcyhuKSB7XG4gICAgICAgICAgZS5wYWdlQ29udHJvbGxlci5nZXRQYWdlcyh0LCBuKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2VuZXJhdGVTZXNzaW9uQWZ0ZXJIYW5kbGVyKHQpIHtcbiAgICAgICAgICBFdmVudENvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKS5oYW5kbGVyTm9TZXNzaW9uRWt2RGF0YXMoKSwgc2VuZERhdGFzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKSwgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuQVBQX0ZJUlNUX09QRU5fRkxBRywgdCA9PiB7XG4gICAgICAgIDAgPT09IHQubGVuZ3RoICYmIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkFQUF9GSVJTVF9PUEVOX0ZMQUcsIFwidHJ1ZVwiKTtcbiAgICAgIH0pLCBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1ksIHQgPT4ge1xuICAgICAgICB0IHx8IFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9TVEFSVF9TRU5EX1ZBTFVFKTtcbiAgICAgIH0pLCBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5FVkVOVF9MQVNUX1NFTkRfVElNRSwgdCA9PiB7XG4gICAgICAgIHQgfHwgRXZlbnRDb250cm9sbGVyLmdldEluc3RhbmNlKCkuc2V0U2VuZFRpbWUoKTtcbiAgICAgIH0pLCB0KSB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfc3RhdHVzXCIsIHtcbiAgICAgICAgICBzZXQodCkge1xuICAgICAgICAgICAgXCJkZXN0cm95XCIgPT09IHQgJiYgUmVxdWVzdC5zZW5kQWxsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgfVxuICB9LFxuICByZXN1bWUodCkge1xuICAgIGlzSW5pdCgpICYmIHQgJiYgKExvZy5pKGAqKiogdW1lbmdfc2RrICoqKiBwYWdlIG5hbWU6ICR7RGV2aWNlVXRpbC5nZXRQYWdlTmFtZSgpfWApLCB0aGlzLnBhZ2VDb250cm9sbGVyLmFkZEN1cnJlbnRQYWdlKHQpLCBTZXNzaW9uLmdldEluc3RhbmNlKCkuaW5pdCh0aGlzLmFwcGtleSkpO1xuICB9LFxuICBwYXVzZSh0KSB7XG4gICAgaXNJbml0KCkgJiYgdCAmJiAodGhpcy5wYWdlQ29udHJvbGxlci5zYXZlUGFnZShTZXNzaW9uLmdldEluc3RhbmNlKCkuZ2V0Q3VycmVudFNlc3Npb25JZCgpLCB0KSwgU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmVuZFNlc3Npb24oKSwgRXZlbnRDb250cm9sbGVyLmdldEluc3RhbmNlKCkucXVpdEhhbmRsZXIoKSk7XG4gIH0sXG4gIHRyYWNrRXZlbnQodCwgZSkge1xuICAgIGlmIChpc0luaXQoKSkgcmV0dXJuIFVtZW5nVXRpbHMuY2hlY2tJZCh0KSA/IGUgJiYgIVVtZW5nVXRpbHMuY2hlY2tBdHRyT3JTdHJpbmcoZSkgPyAoY29uc29sZS5lcnJvcihcImVycm9yLS0tLS1wbGVhc2UgY2hlY2sgdHJhY2tFdmVudCBhdHRyLiBhdHRyIHNob3VsZCBiZSAnU3RyaW5nJyBvciAnT2JqZWN0Jyhub3QgaW5jbHVkZSAnQXJyYXknKVwiKSwgITEpIDogKExvZy5pKGAqKiogdW1lbmdfc2RrICoqKiBldmVudCBpZDogJHtVbWVuZ1V0aWxzLnRvU3RyKHQpfSR7ZSA/IGAgfHwgZXZlbnQgYXR0cjogJHtVbWVuZ1V0aWxzLnRvU3RyKGUpfWAgOiBcIlwifWApLCBFdmVudENvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKS5hZGRFdmVudCh0LCBlKSwgITApIDogKGNvbnNvbGUuZXJyb3IoXCJlcnJvci0tLS0tcGxlYXNlIGNoZWNrIHRyYWNrRXZlbnQgaWQuIGlkIHNob3VsZCBiZSAnU3RyaW5nJyBhbmQgbm90IG51bGxcIiksICExKTtcbiAgfVxufTtcbmNvbnN0IEZpbGVVdGlscyA9IHtcbiAgICBnZXRGaWxlKHQsIGUsIG4pIHtcbiAgICAgIF9zeXN0ZW03LmRlZmF1bHQucmVhZFRleHQoe1xuICAgICAgICB1cmk6IHQsXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIGUgJiYgZSh0LnRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsKHQsIGUpIHtcbiAgICAgICAgICBuICYmIG4odCwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbW92ZUZpbGUodCwgZSwgbiwgbykge1xuICAgICAgX3N5c3RlbTcuZGVmYXVsdC5tb3ZlKHtcbiAgICAgICAgc3JjVXJpOiB0LFxuICAgICAgICBkc3RVcmk6IGUsXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIG4gJiYgbih0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCh0LCBlKSB7XG4gICAgICAgICAgbyAmJiBvKHQsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZUZpbGUodCwgZSwgbikge1xuICAgICAgX3N5c3RlbTcuZGVmYXVsdC5kZWxldGUoe1xuICAgICAgICB1cmk6IHQsXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIGUgJiYgZSh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCh0LCBlKSB7XG4gICAgICAgICAgbiAmJiBuKHQsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG1vZHVsZXMgPSB7XG4gICAgXCJAc3lzdGVtLmFwcFwiOiAkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmFwcFwiKSxcbiAgICBcIkBzeXN0ZW0uc3RvcmFnZVwiOiAkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIiksXG4gICAgXCJAc3lzdGVtLmZldGNoXCI6ICRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2hcIiksXG4gICAgXCJAc3lzdGVtLm5ldHdvcmtcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5uZXR3b3JrXCIpLFxuICAgIFwiQHN5c3RlbS5kZXZpY2VcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5kZXZpY2VcIiksXG4gICAgXCJAc3lzdGVtLnJvdXRlclwiOiAkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnJvdXRlclwiKSxcbiAgICBcIkBzeXN0ZW0uZmlsZVwiOiAkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmZpbGVcIilcbiAgfSxcbiAgY2FsbFF1ZXVlID0gW10sXG4gIHVtZW5nX3N0YXRfZ2xvYmFsID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCkgfHwgZ2xvYmFsO1xuU2RrVXBkYXRlci5wcm90b3R5cGUgPSB7XG4gIGluaXQodCwgZSkge1xuICAgIHRoaXMuaW5zdGFsbEFwaSh0LCBudWxsKTtcbiAgICB0cnkge1xuICAgICAgRGV2aWNlVXRpbC5nZXRTeXN0ZW1CYXNlSW5mbyh0ID0+IHtcbiAgICAgICAgMWUzID09PSB0LnBsYXRmb3JtVmVyc2lvbkNvZGUgPyBlKDApIDogU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9GSVJTVF9DQUNIRSwgdCA9PiB7XG4gICAgICAgICAgdCA/IHRoaXMuZ2V0U2RrRmlsZUNvbnRlbnQodCwgKHQsIG4sIG8pID0+IHtcbiAgICAgICAgICAgIHQgPyBlKDEsIG4sIG8pIDogdGhpcy5nZXRTZWNvbmRDYWNoZUZpbGUoZSk7XG4gICAgICAgICAgfSkgOiB0aGlzLmdldFNlY29uZENhY2hlRmlsZShlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoICh0KSB7XG4gICAgICBlKDApO1xuICAgIH1cbiAgfSxcbiAgZ2V0U2Vjb25kQ2FjaGVGaWxlKHQpIHtcbiAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5ET1dOTE9BRF9GSUxFX1NFQ09ORF9DQUNIRSwgZSA9PiB7XG4gICAgICBlID8gdGhpcy5nZXRTZGtGaWxlQ29udGVudChlLCB0KSA6IHQoMCk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFNka0ZpbGVDb250ZW50KHQsIGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbiA9IFVtZW5nVXRpbHMudG9PYmplY3QodCk7XG4gICAgICBMb2cuZChgY3VycmVudCBzZGs6JHtuLnZlcnNpb259JHtuLm1kNX0ke24uZmlsZVBhdGh9YCksIEZpbGVVdGlscy5nZXRGaWxlKG4uZmlsZVBhdGgsIHQgPT4ge1xuICAgICAgICBVbWVuZ1V0aWxzLmNoZWNrTUQ1KG4ubWQ1LCB0KSA/IGUoMSwgdCwgbi52ZXJzaW9uKSA6IGUoMCk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGUoMCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoICh0KSB7XG4gICAgICBlKDApO1xuICAgIH1cbiAgICByZXR1cm4gITE7XG4gIH0sXG4gIGRvd25sb2FkRmlsZSh0LCBlLCBuLCBvLCBpKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9zeXN0ZW04LmRlZmF1bHQuZG93bmxvYWQoe1xuICAgICAgICB1cmw6IHQsXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIExvZy5kKGBoYW5kbGluZyBzdWNjZXNzICR7dC50b2tlbn1gKSwgX3N5c3RlbTguZGVmYXVsdC5vbkRvd25sb2FkQ29tcGxldGUoe1xuICAgICAgICAgICAgdG9rZW46IHQudG9rZW4sXG4gICAgICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdC51cmksXG4gICAgICAgICAgICAgICAgICBzID0gci5zcGxpdChcIi9cIiksXG4gICAgICAgICAgICAgICAgICBjID0gc1tzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGxldCBhID0gY29uc3RhbnRzLlNES19VUERBVEVfTE9DQUxfU1RPUkFHRV9QQVRIO1xuICAgICAgICAgICAgICAgIGEgPSBgJHthICsgRGF0ZS5ub3coKX0vJHtjfWAsIEZpbGVVdGlscy5tb3ZlRmlsZSh0LnVyaSwgYSwgdCA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByID0ge1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBlLFxuICAgICAgICAgICAgICAgICAgICBtZDU6IG4sXG4gICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOiB0LFxuICAgICAgICAgICAgICAgICAgICBzdGFibGU6IG9cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpKHIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwodCwgZSkge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHt9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoICh0KSB7fVxuICB9LFxuICBzdG9yYWdlRmlsZUluZm8odCkge1xuICAgIHRyeSB7XG4gICAgICBGaWxlVXRpbHMuZ2V0RmlsZSh0LmZpbGVQYXRoLCBlID0+IHtcbiAgICAgICAgTG9nLmQoYC0tLS0tLS0tLSR7SlNPTi5zdHJpbmdpZnkodCl9LS0tLS0tLS0tLS0ke1VtZW5nVXRpbHMuTUQ1KGUpfWApO1xuICAgICAgICBlICYmIHQubWQ1ICYmIHQubWQ1ID09PSBVbWVuZ1V0aWxzLk1ENShlKSA/IChTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5ET1dOTE9BRF9GSUxFX0ZJUlNUX0NBQ0hFLCBlID0+IHtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5ET1dOTE9BRF9GSUxFX0ZJUlNUX0NBQ0hFLCB0LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICBjb25zdCB0ID0gVW1lbmdVdGlscy50b09iamVjdChlKTtcbiAgICAgICAgICAgICAgIXQuc3RhYmxlICYmIHQuZmlsZVBhdGggJiYgRmlsZVV0aWxzLmRlbGV0ZUZpbGUodC5maWxlUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLCB0LnN0YWJsZSA/IFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLkRPV05MT0FEX0ZJTEVfU0VDT05EX0NBQ0hFLCBlID0+IHtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5ET1dOTE9BRF9GSUxFX1NFQ09ORF9DQUNIRSwgdCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgdCA9IFVtZW5nVXRpbHMudG9PYmplY3QoZSk7XG4gICAgICAgICAgICAgIHQuZmlsZVBhdGggJiYgRmlsZVV0aWxzLmRlbGV0ZUZpbGUodC5maWxlUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pIDogU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9GSVJTVF9DQUNIRSwgdCkpIDogRmlsZVV0aWxzLmRlbGV0ZUZpbGUodC5maWxlUGF0aCwgKCkgPT4ge30pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAodCkge1xuICAgICAgTG9nLmQoYGVycm9yIG1lc3NhZ2U6ICR7dC50b1N0cmluZygpfWApO1xuICAgIH1cbiAgfSxcbiAgY2hlY2tWZXJzaW9uTmV3KHQsIGUsIG4sIG8sIGksIHIpIHtcbiAgICBjb25zdCBzID0ge1xuICAgICAgdmVyc2lvbjogdCxcbiAgICAgIHBsYXRmb3JtOiBcInF1aWNrYXBwXCIsXG4gICAgICBhcHBWZXJzaW9uOiBuLFxuICAgICAgYXBwS2V5OiBlLFxuICAgICAgc2VlZFZlcnNpb246IG8sXG4gICAgICBzeXN0ZW1CYXNlSW5mbzogaVxuICAgIH07XG4gICAgX3N5c3RlbTYuZGVmYXVsdC5mZXRjaCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGRhdGE6IHMsXG4gICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgaWYgKDIwMCA9PT0gdC5jb2RlKSB0cnkge1xuICAgICAgICAgIGNvbnN0IGUgPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KHQuZGF0YSk7XG4gICAgICAgICAgaWYgKDIwMCA9PT0gZS5jb2RlICYmIGUuZGF0YS51cGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHQgPSBlLmRhdGEuaW5mbztcbiAgICAgICAgICAgIHQgJiYgcih0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgICB9LFxuICAgICAgZmFpbCh0LCBlKSB7fSxcbiAgICAgIGNvbXBsZXRlKCkge31cbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlTWV0aG9kKHQsIGUsIG4pIHtcbiAgICB0cnkge1xuICAgICAgdFtlXSA9IG4gPyBmdW5jdGlvbiAoLi4udCkge1xuICAgICAgICByZXR1cm4gbltlXSguLi50KTtcbiAgICAgIH0gOiBmdW5jdGlvbiAoLi4udCkge1xuICAgICAgICBjYWxsUXVldWUucHVzaChbZSwgdF0pO1xuICAgICAgfTtcbiAgICB9IGNhdGNoICh0KSB7fVxuICB9LFxuICBpbnN0YWxsQXBpKHQsIGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbiA9IFtcInJlc3VtZVwiLCBcInBhdXNlXCIsIFwidHJhY2tFdmVudFwiXTtcbiAgICAgIGZvciAobGV0IG8gPSAwLCBpID0gbi5sZW5ndGg7IG8gPCBpOyBvKyspIHRoaXMuY3JlYXRlTWV0aG9kKHQsIG5bb10sIGUpO1xuICAgICAgaWYgKGUpIGZvciAobGV0IHQgPSAwLCBuID0gY2FsbFF1ZXVlLmxlbmd0aDsgdCA8IG47IHQrKykge1xuICAgICAgICBjb25zdCBuID0gY2FsbFF1ZXVlW3RdO1xuICAgICAgICBlW25bMF1dKC4uLm5bMV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHQpIHt9XG4gIH0sXG4gIGNvbXBpbGVNb2R1bGUodCwgZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0ID0gbmV3IEZ1bmN0aW9uKFwibW9kdWxlXCIsIFwiZXhwb3J0c1wiLCBcInJlcXVpcmVcIiwgZSksXG4gICAgICAgIG4gPSB7XG4gICAgICAgICAgZXhwb3J0czoge31cbiAgICAgICAgfSxcbiAgICAgICAgbyA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgcmV0dXJuIHQgaW4gbW9kdWxlcyA/IG1vZHVsZXNbdF0gOiByZXF1aXJlKHQpO1xuICAgICAgICB9O1xuICAgICAgcmV0dXJuIHQobiwgbi5leHBvcnRzLCBvKSwgbi5leHBvcnRzO1xuICAgIH0gY2F0Y2ggKHQpIHt9XG4gIH0sXG4gIGxvYWRNb2R1bGUodCwgZSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbjtcbiAgICAgIGlmICgwID09PSB0KSBuID0gVW1lbmdBbmFseXNpc0xpYjtlbHNlIHRyeSB7XG4gICAgICAgIG4gPSB0aGlzLmNvbXBpbGVNb2R1bGUodCwgZSk7XG4gICAgICB9IGNhdGNoICh0KSB7XG4gICAgICAgIG4gPSBVbWVuZ0FuYWx5c2lzTGliO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG47XG4gICAgfSBjYXRjaCAodCkge31cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbmNvbnN0IFVtZW5nQW5hbHlzaXMgPSB7XG4gIHNlZWRfdmVyc2lvbjogXCIwLjAuMVwiLFxuICB2ZXJzaW9uOiBjb25zdGFudHMuU0RLX1ZFUlNJT04sXG4gIGFwcEtleTogXCJcIixcbiAgX2ltcGw6IG51bGwsXG4gIF9pbml0ZWQ6ICExLFxuICBpbml0KHQpIHtcbiAgICBpZiAoIXRoaXMuX2luaXRlZCkge1xuICAgICAgdGhpcy5faW5pdGVkID0gITAsIHVtZW5nX3N0YXRfZ2xvYmFsLnVzZXJEdWJ1ZyA9ICEhdC4kZGF0YS51bWVuZ19kZWJ1ZywgdGhpcy5hcHBLZXkgPSB0LiRkYXRhLnVtZW5nX2FwcGtleTtcbiAgICAgIGNvbnN0IGUgPSBuZXcgU2RrVXBkYXRlcigpO1xuICAgICAgZS5pbml0KHRoaXMsIChuLCBvLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHIgPSBlLmxvYWRNb2R1bGUobiwgbyk7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgY29uc3QgbiA9IG5ldyByKCk7XG4gICAgICAgICAgdGhpcy5faW1wbCA9IG4sIG4uaW5pdCh0KSwgZS5pbnN0YWxsQXBpKHRoaXMsIG4pO1xuICAgICAgICB9XG4gICAgICAgIGkgfHwgKGkgPSB0aGlzLnZlcnNpb24pO1xuICAgICAgICBEZXZpY2VVdGlsLmdldFN5c3RlbUJhc2VJbmZvKHQgPT4ge1xuICAgICAgICAgIGlmICgxZTMgPT09IHQucGxhdGZvcm1WZXJzaW9uQ29kZSkgcmV0dXJuO1xuICAgICAgICAgIGUuY2hlY2tWZXJzaW9uTmV3KGksIHRoaXMuYXBwS2V5LCBfc3lzdGVtNS5kZWZhdWx0LmdldEluZm8oKS52ZXJzaW9uTmFtZSwgdGhpcy5zZWVkX3ZlcnNpb24sIHQsIHQgPT4ge1xuICAgICAgICAgICAgdCAmJiBlLmRvd25sb2FkRmlsZSh0LmZpbGVVcmwsIHQudmVyc2lvbiwgdC5maWxlTUQ1LCB0LnN0YWJsZSwgdCA9PiB7XG4gICAgICAgICAgICAgIGUuc3RvcmFnZUZpbGVJbmZvKHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIWZ1bmN0aW9uICgpIHtcbiAgdW1lbmdfc3RhdF9nbG9iYWwgJiYgKHVtZW5nX3N0YXRfZ2xvYmFsLiR1bWVuZ19zdGF0ID0gVW1lbmdBbmFseXNpcywgdW1lbmdfc3RhdF9nbG9iYWwuUGFnZSA9IFBhZ2UpO1xufSgpO1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gVW1lbmdBbmFseXNpczsiLCI8c2NyaXB0PlxuICBpbXBvcnQgJy4vQ29tbW9uL2xpYnMvdW1lbmcvdW1lbmdhbmFseXNpcy5lcy5taW4nOyAgIC8v5Y+L55ufc2RrIOW/hemhu+a3u+WKoO+8ge+8ge+8gVxuXG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9uQ3JlYXRlKCkge1xuICAgICAgY29uc29sZS5pbmZvKCdBcHBsaWNhdGlvbiBvbkNyZWF0ZScpO1xuICAgICAgY29uc3QgaG9vazJnbG9iYWwgPSBnbG9iYWwuX19wcm90b19fIHx8IGdsb2JhbFxuICAgICAgY29uc3QgJHJvdXRlciA9IHJlcXVpcmUoJ0BzeXN0ZW0ucm91dGVyJylcbiAgICAgIGNvbnN0ICR1dGlscyA9IHJlcXVpcmUoJy4vQ29tbW9uL2hlbHBlci91dGlscycpLmRlZmF1bHRcbiAgICAgIGNvbnN0ICRzdG9yYWdlID0gcmVxdWlyZShcIkBzeXN0ZW0uc3RvcmFnZVwiKVxuICAgICAgY29uc3QgJGNpcGhlciA9IHJlcXVpcmUoXCJAc3lzdGVtLmNpcGhlclwiKVxuICAgICAgY29uc3QgJHByb21wdCA9IHJlcXVpcmUoXCJAc3lzdGVtLnByb21wdFwiKVxuICAgICAgY29uc3QgJHdlYnZpZXcgPSByZXF1aXJlKFwiQHN5c3RlbS53ZWJ2aWV3XCIpXG4gICAgICBjb25zdCAkYXBpcyA9IHJlcXVpcmUoJy4vQ29tbW9uL2hlbHBlci9hcGlzJykuZGVmYXVsdFxuICAgICAgY29uc3QgJGFkID0gcmVxdWlyZShcIkBzZXJ2aWNlLmFkXCIpXG4gICAgICBjb25zdCAkYXBwID0gcmVxdWlyZShcIkBzeXN0ZW0uYXBwXCIpXG4gICAgICBjb25zdCAkZGV2aWNlID0gcmVxdWlyZShcIkBzeXN0ZW0uZGV2aWNlXCIpXG5cbiAgICAgIGNvbnN0ICRwcm9jZXNzRGF0YSA9IHJlcXVpcmUoJy4vQ29tbW9uL2hlbHBlci9wcm9jZXNzRGF0YScpLmRlZmF1bHRcblxuICAgICAgaG9vazJnbG9iYWwuJHJvdXRlciA9ICRyb3V0ZXJcbiAgICAgIGhvb2syZ2xvYmFsLiR1dGlscyA9ICR1dGlsc1xuICAgICAgaG9vazJnbG9iYWwuJHN0b3JhZ2UgPSAkc3RvcmFnZVxuICAgICAgaG9vazJnbG9iYWwuJHByb21wdCA9ICRwcm9tcHRcbiAgICAgIGhvb2syZ2xvYmFsLiRhcGlzID0gJGFwaXNcbiAgICAgIGhvb2syZ2xvYmFsLiR3ZWJ2aWV3ID0gJHdlYnZpZXdcbiAgICAgIGhvb2syZ2xvYmFsLiRhZCA9ICRhZFxuICAgICAgaG9vazJnbG9iYWwuJGNpcGhlciA9ICRjaXBoZXJcbiAgICAgIGhvb2syZ2xvYmFsLiRhcHAgPSAkYXBwXG5cbiAgICAgIGhvb2syZ2xvYmFsLiRkZXZpY2UgPSAkZGV2aWNlXG4gICAgICBob29rMmdsb2JhbC4kcHJvY2Vzc0RhdGEgPSAkcHJvY2Vzc0RhdGFcbiAgICAgIC8v5Y+L55ufc2RrXG4gICAgICBjb25zb2xlLmxvZyhcIlthcHAudXhdIG9uQ3JlYXRlLi4uXCIpO1xuICAgICAgJHVtZW5nX3N0YXQuaW5pdCh0aGlzKTsgICAvL+WcqG9uQ3JlYXRl5Ye95pWw5Lit5Yqg5YWl6K+l6KGM5Luj56CB77yM5b+F6aG75re75Yqg77yB77yBXG5cblxuXG4gIFxuXG4gICAgfSxcbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ0FwcGxpY2F0aW9uIG9uRGVzdHJveScpO1xuICAgIH0sXG4gICAgZGF0YUFwcDoge1xuXG4gICAgICB1cmwxOiBcImh0dHA6Ly93d3cuaWhhaXR1by5jbi94eS9qYi9ienp4Lmh0bWxcIixcbiAgICAgIHVybDI6IFwiaHR0cDovL3d3dy5paGFpdHVvLmNuL3h5L2piL3loeHkuaHRtbFwiLFxuICAgICAgdXJsMzogXCJodHRwOi8vd3d3LmloYWl0dW8uY24veHkvamIveXN6Yy5odG1sXCIsXG5cbiAgICAgIGNvdW50TWF4OiA4LC8v5ouG57qi5YyF5pyA5aSn5qyh5pWwLOW9k+i2hei/h+ivpeasoeaVsOWImei/lOWbnui3s+i9rOmTvuaOpVxuICAgICAgYnJhbmQ6ICdIVUFXRUknLFxuICAgICAgY2hhbm5lbDogJ2poJyxcblxuICAgICAgYmFubmVyQWRVbml0SWQ6IFwiejF2Nmp5a3Z5OVwiLC8vYmFubmVy5bm/5ZGK5L2NaWRcbiAgICAgIG5hdGl2ZUFkVW5pdElkOiBcInY1aDV4c2tscDJcIiwvL+W5v+WRiuS9jWlkXG4gICAgICBpbnRlcnN0aXRpYWxBZFVuaXRJZDogXCJhN252bDdmbTAwXCIsLy/mj5LlsY/lub/lkYrkvY1pZFxuICAgICAgLy/kv53lrZjnlKjmiLfkv6Hmga/lr7nosaFcbiAgICAgIHVzZXJEYXRhOiB7XG4gICAgICAgIGxvZ2luUGhvbmU6ICcnLFxuICAgICAgICB1c2VySWQ6ICcnLFxuICAgICAgICBiYWxhbmNlOiAwLFxuICAgICAgfSxcblxuICAgICAgYWN0aVBhcmFtOiAnJyxcblxuXG4gICAgfVxuXG4gIH1cbjwvc2NyaXB0PiIsInZhciBtYXAgPSB7XG5cdFwiLi9leGFtcGxlLmpzXCI6IFwiLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanNcIixcblx0XCIuL2luZGV4LmpzXCI6IFwiLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL2luZGV4LmpzXCIsXG5cdFwiLi91c2VyLmpzXCI6IFwiLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL3VzZXIuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzIHN5bmMgcmVjdXJzaXZlIFxcXFwuanNcIjsiLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMvQ29tbW9uL2xpYnMvdW1lbmcgc3luYyByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISFkOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyFkOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYXBwLXNjcmlwdC1sb2FkZXIuanMhZDovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIWQ6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhZDovcXVpY2thcHBXb3Jrc3BhY2UvY29tLmhhaXR1by5zZXRwcGxhbmV0L3NyYy9hcHAudXhcIilcblxyXG4kYXBwX2RlZmluZSQoJ0BhcHAtYXBwbGljYXRpb24vYXBwJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XHJcblxuICAgICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHQ7XG4gICAgICAgIH1cclxufSlcclxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWFwcGxpY2F0aW9uL2FwcCcse3BhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjEuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
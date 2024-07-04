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
    console.log(`getTokenData()---->deviceNum=${deviceNum}`);
    console.log('是否触发的这里');
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
    console.log('ajax请求', '  url=' + url, ";method=" + method, ";data= " + data);
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
const convertUpload = (data, type) => {
  console.log('data= ', data, `   url= /qa/mini/basic/ad/convert/upload/${type}`);
  return (0, _ajax.default)({
    method: "POST",
    url: `/qa/mini/basic/ad/convert/upload/${type}`,
    data
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
  convertUpload
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
exports.localStorage = localStorage;
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
var _default = exports["default"] = {
  getStorage,
  setStorage
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
/**
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

//获取匿名设备标识符，建议只在广告的场景使用
const getOAID = async () => {
  let ret = await _system.default.getOAID();
  return ret.data.oaid;
};

//执行广告转化上传
const getConvertUpload = async () => {
  const type = 'jh';
  const deviceNum = await getOAID();
  const example = (__webpack_require__(/*! ./apis/example.js */ "./src/Common/helper/apis/example.js")["default"]);
  const userAdConvertUploadReq = {
    deviceId: deviceNum,
    conversionType: 'browse',
    channelValue: '-1',
    contentId: '-1',
    adgroupId: '-1',
    campaignId: '-1'
  };
  console.log('执行广告转化上传', userAdConvertUploadReq, "type: " + type);
  example.convertUpload(userAdConvertUploadReq, type).then(data => {
    console.log('广告转化上传成功 data: ', data);
  }).catch(err => {
    console.log(err, '失败回调');
  });
};

/**
* 插屏广告 
*/

const tablePlaque = id => {
  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告返回');
    return;
  }
  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: id
  });
  interstitialAd.load().then(res => {
    console.log(res, '查屏加载成功');
    interstitialAd.show().then(() => {
      console.log('插屏广告show成功');
    }, () => {
      console.log('插屏广告show失败');
    });
  }).catch(err => {
    console.log(err, '插屏加载失败');
  });
  interstitialAd.onClick(() => {
    console.log('插屏广告点击了');
    //转化上传
    getConvertUpload();
  });
};

/**
* banner广告  margin_bot底部缩进  
*/

let bannerAd;
const showBannerAd = (adid, margin_bot) => {
  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告返回');
    return;
  }
  var d = _system.default.getInfoSync();
  console.info("calBannerPostion1 d= " + JSON.stringify(d));
  let height = 57;
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
  console.info("calBannerPostion1 realToppx=" + realToppx + ", logicWidth= " + logicWidth, "windowWidth= " + windowWidth);
  //转换成页面基准值下的逻辑单位
  let logicWebTop = realToppx * logicWidth / windowWidth;

  //此对象请自己在data下定义
  let top = logicWebTop === 0 ? 1230 : logicWebTop;
  console.info("calBannerPostion1 top=" + top + ", logicWebTop= " + logicWebTop);
  console.info("banner广告位=" + adid);
  const style = {
    left: 0,
    top: top,
    width: 360,
    height: height
  };
  bannerAd = $ad.createBannerAd({
    adUnitId: adid,
    //banner广告位
    style: style,
    adIntervals: 60 //刷新时间，秒
  });
  console.info("annerAd.style=" + JSON.stringify(bannerAd.style));
  bannerAd.onLoad(e => {
    console.info("load bannerAd  onload success e=" + JSON.stringify(e));
  });
  bannerAd.onError(e => {
    console.error("load bannerAd  onError " + JSON.stringify(e));
  });
  bannerAd.onClose(e => {
    console.info("load bannerAd  onClose");
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
const extractYearMonth = input => {
  if (input.length !== 6 || isNaN(input)) {
    throw new Error('Invalid input format');
  }
  const year = input.slice(0, 4);
  let month = input.slice(4, 6);
  if (month[0] === '0') {
    month = month[1];
  } else {
    month = parseInt(month, 10).toString();
  }
  return {
    year,
    month
  };
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
  extractYearMonth,
  startCountDown,
  dataEncryption,
  tablePlaque,
  showBannerAd,
  hideBanerAd,
  viewBanner,
  destroyBanner
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
    bannerAdUnitId: "z1v6jykvy9",
    nativeAdUnitId: "v5h5xsklp2",
    interstitialAdUnitId: "a7nvl7fm00",
    userData: {
      loginPhone: '',
      userId: '',
      balance: 0
    }
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
module.exports = JSON.parse('{"package":"com.haituo.setpplanet","name":"计步星球","versionName":"1.0.6","versionCode":6,"icon":"/Common/img/logo.png","minPlatformVersion":1100,"features":[{"name":"system.storage"},{"name":"system.fetch"},{"name":"system.network"},{"name":"system.device"},{"name":"system.file"},{"name":"system.sensor"}],"config":{"data":{"umeng_appkey":"667b68fccac2a664de54f5ac"}},"router":{"entry":"Page_MainTab","pages":{"Page_MainTab":{"launchMode":"singleTask","component":"index"},"Page_Tixian":{"component":"index"},"Page_login":{"component":"index"},"Page_about":{"component":"index"},"feedback":{"component":"index"},"logOut":{"component":"index"},"permissions":{"component":"index"},"Page_setPay":{"component":"index"},"Page_cfd":{"component":"index"},"ad/nativeAD":{"component":"index"}}},"display":{"pages":{"Page_MainTab":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0},"Page_cfd":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0,"titleBarBackgroundOpacity":0},"Page_Tixian":{"titleBar":true,"menu":true,"titleBarText":"收益"},"Page_login":{"titleBar":true,"menu":false,"titleBarText":"用户登录"}}},"versionType":"debug"}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGFwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1akJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM3FEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3h1REE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FwaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL3Byb2Nlc3NEYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL0pTRW5jcnlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvanNlbmNyeXB0L2xpYi9KU0VuY3J5cHRSU0FLZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2FzbjFqcy9hc24xLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvYmFzZTY0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvaGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9hc24xanMvaW50MTAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vYmFzZTY0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc2JuL2pzYm4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vcHJuZzQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzYm4vcm5nLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc2JuL3JzYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvanNlbmNyeXB0L2xpYi9saWIvanNibi91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vbGlicy9qc2VuY3J5cHQvbGliL2xpYi9qc3JzYXNpZ24vYXNuMS0xLjAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9saWJzL2pzZW5jcnlwdC9saWIvbGliL2pzcnNhc2lnbi95YWhvby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvdW1lbmcvdW1lbmdhbmFseXNpcy5lcy5taW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhcHAudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy8gc3luYyBcXC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2xpYnMvdW1lbmcvIHN5bmMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy8uL3NyYy9hcHAudXgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3N5c3RlbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5mZXRjaFwiKSk7XG52YXIgX3N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZVwiKSk7XG52YXIgX3N5c3RlbTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpKTtcbnZhciBfc3lzdGVtNCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5wcm9tcHRcIikpO1xudmFyIF9zeXN0ZW01ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnJvdXRlclwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmNvbnN0IGdldFVzZXJJZCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHVzZXJJZCA9IGF3YWl0IF9zeXN0ZW0zLmRlZmF1bHQuZ2V0VXNlcklkKCk7XG4gIHJldHVybiB1c2VySWQuZGF0YS51c2VySWQ7XG59O1xuY29uc3QgcXVpdCA9ICgpID0+IHtcbiAgX3N5c3RlbTQuZGVmYXVsdC5zaG93RGlhbG9nKHtcbiAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgbWVzc2FnZTogXCLmgqjlt7Lms6jplIDotKblj7cs6K+36YCA5Ye644CCXCIsXG4gICAgYnV0dG9uczogW3tcbiAgICAgIHRleHQ6ICfpgIDlh7onLFxuICAgICAgY29sb3I6ICcjMzMzMzMzJ1xuICAgIH1dLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfc3lzdGVtNS5kZWZhdWx0LnB1c2goe1xuICAgICAgICB1cmk6IFwiUGFnZV9sb2dpblwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjYW5jZWxcIik7XG4gICAgfVxuICB9KTtcbn07XG5jb25zdCBnZXRUb2tlbkRhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZXhhbXBsZSA9IHJlcXVpcmUoJy4vYXBpcy9leGFtcGxlLmpzJykuZGVmYXVsdDtcbiAgICBjb25zdCBkZXZpY2VOdW0gPSBhd2FpdCBnZXRVc2VySWQoKTtcbiAgICBjb25zb2xlLmxvZyhgZ2V0VG9rZW5EYXRhKCktLS0tPmRldmljZU51bT0ke2RldmljZU51bX1gKTtcbiAgICBjb25zb2xlLmxvZygn5piv5ZCm6Kem5Y+R55qE6L+Z6YeMJyk7XG4gICAgZXhhbXBsZS50b0xvZ2luKHtcbiAgICAgIGxvZ2luVHlwZTogXCJERVZJQ0VcIixcbiAgICAgIGFwcElkOiAnU0NfMDAwMScsXG4gICAgICBkZXZpY2VOdW0sXG4gICAgICBsb2dpbkFjY291bnQ6IGRldmljZU51bVxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygn6LWw55qE5oiQ5Yqf5Zue6LCDJyk7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIsICflpLHotKXlm57osIMnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChKU09OLnBhcnNlKGVycikuY29kZSA9PT0gJzMxMDAwMScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5p2l5LqGJyk7XG4gICAgICAgICAgcXVpdCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgJ+afpeeci+iOt+WPluaKpemUmScpO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH0pO1xufTtcbmxldCBpc1JlZnJlc2hpbmcgPSBmYWxzZTsgLy8g5piv5ZCm5q2j5Zyo6K+35rGC5Yi35pawdG9rZW7nmoTmjqXlj6NcbmNvbnN0IHJlZnJlc2hTdWJzY3JpYmVycyA9IFtdOyAvLyDlrZjlgqjor7fmsYLnmoTmlbDnu4RcbmNvbnN0IHN1YnNjcmliZVRva2VuUmVmcmVzaCA9IGNiID0+IHtcbiAgLy8g5bCG5omA5pyJ55qE6K+35rGC6YO9cHVzaOWIsOaVsOe7hOS4rSzlhbblrp7mlbDnu4TmmK9bZnVuY3Rpb24odG9rZW4pe30sIGZ1bmN0aW9uKHRva2VuKXt9LC4uLl1cbiAgcmVmcmVzaFN1YnNjcmliZXJzLnB1c2goY2IpO1xufTtcbmNvbnN0IG9uUnJlZnJlc2hlZCA9IHRva2VuID0+IHtcbiAgLy8g5pWw57uE5Lit55qE6K+35rGC5b6X5Yiw5paw55qEdG9rZW7kuYvlkI7oh6rmiafooYzvvIznlKjmlrDnmoR0b2tlbuWOu+ivt+axguaVsOaNrlxuICByZWZyZXNoU3Vic2NyaWJlcnMubWFwKGNiID0+IGNiKHRva2VuKSk7XG59O1xuY29uc3QgaXNBY2Nlc3NUb2tlbkV4cGlyZWQgPSBhdXRoRGF0YSA9PiB7XG4gIC8vIOWIpOaWreW9k+WJjXRva2Vu5piv5ZCm6L+H5pyfXG4gIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGF1dGhEYXRhLmV4cGlyZUF0ID4gMTAwMDAgKiA2MCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCByZXF1ZXN0ID0gb3B0aW9ucyA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICAgIGhlYWRlcnMgPSB7fVxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGF1dGhEYXRhID0gKGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuZ2V0KHtcbiAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICB9KSkgfHwge307XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhdXRoRGF0YS5kYXRhID8gSlNPTi5wYXJzZShhdXRoRGF0YS5kYXRhKS5hY2Nlc3NUb2tlbiA6ICcnO1xuICAgIGlmIChpc0FjY2Vzc1Rva2VuRXhwaXJlZChhdXRoRGF0YSkgfHwgIWFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpKSB7XG4gICAgICAgIGlmICghaXNSZWZyZXNoaW5nKSB7XG4gICAgICAgICAgaXNSZWZyZXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICBnZXRUb2tlbkRhdGEoKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSByZXMuZGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgYXdhaXQgX3N5c3RlbTIuZGVmYXVsdC5zZXQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJBVVRIX1RPS0VOX0RBVEFcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkocmVzLmRhdGEpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEuYWNjZXNzVG9rZW4nLCByZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgIG9uUnJlZnJlc2hlZChyZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXRyeSA9IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICBzdWJzY3JpYmVUb2tlblJlZnJlc2godG9rZW4gPT4ge1xuICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gdG9rZW47IC8vIOeUqOacgOaWsHRva2Vu6K+35rGC5pWw5o2uXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0cnk7XG4gICAgICB9XG4gICAgfVxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIGNvbnNvbGUubG9nKCdhamF46K+35rGCJywgJyAgdXJsPScgKyB1cmwsIFwiO21ldGhvZD1cIiArIG1ldGhvZCwgXCI7ZGF0YT0gXCIgKyBkYXRhKTtcbiAgICBfc3lzdGVtLmRlZmF1bHQuZmV0Y2goe1xuICAgICAgLy8gdXJsOiAnaHR0cHM6Ly90ZXN0LmlwYW5kYXRhLmNvbScgKyB1cmwsXG4gICAgICB1cmw6ICdodHRwczovL2FwaS5paGFpdHVvLmNuJyArIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXI6IF9vYmplY3RTcHJlYWQoe1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSwgaGVhZGVycyksXG4gICAgICAvLyBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAvLyAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgLy8gICBpZiAoZGF0YS5jb2RlID09PSBcIjAwMDAwMFwiIHx8IEpTT04ucGFyc2UoZGF0YSkuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgLy8gICAgIHJlc29sdmUodXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpID8gcmVzLmRhdGEgOiBKU09OLnBhcnNlKHJlcy5kYXRhKSk7XG4gICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgaWYgKGRhdGEuY29kZSA9PT0gXCIzMDAwMDJcIikge1xuICAgICAgLy8gICAgICAgJHN0b3JhZ2UuZGVsZXRlKHtcbiAgICAgIC8vICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgICAgLy8gICAgICAgfSlcbiAgICAgIC8vICAgICAgIHJlcXVlc3Qob3B0aW9ucylcbiAgICAgIC8vICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC8vICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgIHJlamVjdChyZXMuZGF0YSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhO1xuXG4gICAgICAgICAgLy8g5bCd6K+V6Kej5p6QIEpTT04g5pWw5o2u77yM5aaC5p6c6Kej5p6Q5aSx6LSl77yM5YiZ5Lya5oqb5Ye66ZSZ6K+vXG4gICAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhO1xuICAgICAgICAgIGlmIChwYXJzZWREYXRhLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgIHJlc29sdmUodXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpID8gZGF0YSA6IHBhcnNlZERhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkRGF0YS5jb2RlID09PSBcIjMwMDAwMlwiKSB7XG4gICAgICAgICAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMpLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBKU09OIG9yIGhhbmRsaW5nIGNvZGU6IFwiLCBlKTtcblxuICAgICAgICAgIC8vIOajgOafpeaYr+WQpui/lOWbnueahOaYryBIVE1M77yM6ICM5LiN5pivIEpTT05cbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5kYXRhID09PSAnc3RyaW5nJyAmJiByZXMuZGF0YS5zdGFydHNXaXRoKCc8aHRtbD4nKSkge1xuICAgICAgICAgICAgcmVqZWN0KFwiU2VydmVyIHJldHVybmVkIGFuIEhUTUwgcGFnZSBpbnN0ZWFkIG9mIEpTT04uIFBvc3NpYmxlIGluY29ycmVjdCBVUkwgb3Igc2VydmVyIGVycm9yLlwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KFwiRXJyb3IgcGFyc2luZyBKU09OIG9yIGhhbmRsaW5nIGNvZGU6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7fVxuICAgIH0pO1xuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSByZXF1ZXN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9hamF4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYWpheC5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuLy8g55m75b2VIFxuY29uc3QgdG9Mb2dpbiA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5gLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vLyDkuIrkvKDmraXmlbBcbmNvbnN0IHVwbG9hZHN0ZXBzID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvc2MvdXBsb2FkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcbi8vIOiOt+WPluatpeaVsFxuY29uc3QgZ2V0c3RlcHMgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g6I635Y+W5pyA6L+RMzDlpKnorrDlvZVcbmNvbnN0IGdldHN0ZXBzbGlzdCA9ICgpID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL2xpc3RgXG4gIH0pO1xufTtcblxuLy/mj5DnjrBcbmNvbnN0IHdpdGhkcmF3ID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci93aXRoZHJhd2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v55So5oi35L2Z6aKd6K6w5b2VXG5jb25zdCByZWNvcmQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvY2FzaC9yZWNvcmRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+iOt+WPluW5v+WRiuWujOaIkOasoeaVsFxuY29uc3QgZ2V0QWRDb3VudCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29tcGxldGUvY291bnRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+W5v+WRiuWujOaIkFxuY29uc3QgY29tcGxldGVBZCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbXBsZXRlYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/lub/lkYrlrozmiJAt5Yqg5a+GXG5jb25zdCBjb21wbGV0ZUFkUlNBID0gYXN5bmMgZGF0YSA9PiB7XG4gIGxldCB0aW1lc3RhbXAgPSArbmV3IERhdGUoKTtcbiAgZGF0YS50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gIGxldCBfZGF0YSA9IGF3YWl0ICR1dGlscy5kYXRhRW5jcnlwdGlvbihkYXRhKTtcbiAgbGV0IHBhcmFtID0ge1xuICAgIGRhdGE6IF9kYXRhXG4gIH07XG4gIGNvbnNvbGUubG9nKCfku7vliqHliqDlr4YnLCBwYXJhbSk7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvZmluaXNoYCxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwYXJhbSlcbiAgfSk7XG59O1xuXG4vL+W5v+WRiui9rOWMluS4iuS8oCAgIHR5cGU65bm/5ZGK5rig6YGT57G75Z6LOiBqaCjpsrjpuL8pLCBrcyjlv6vmiYspLCBqbCjlt6jph48pLCAs5Y+v55So5YC8OmpoLGtzLGpsXG5jb25zdCBjb252ZXJ0VXBsb2FkID0gKGRhdGEsIHR5cGUpID0+IHtcbiAgY29uc29sZS5sb2coJ2RhdGE9ICcsIGRhdGEsIGAgICB1cmw9IC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvdXBsb2FkLyR7dHlwZX1gKTtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb252ZXJ0L3VwbG9hZC8ke3R5cGV9YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgdG9Mb2dpbixcbiAgdXBsb2Fkc3RlcHMsXG4gIGdldHN0ZXBzLFxuICBnZXRzdGVwc2xpc3QsXG4gIHdpdGhkcmF3LFxuICByZWNvcmQsXG4gIGdldEFkQ291bnQsXG4gIGNvbXBsZXRlQWQsXG4gIGNvbXBsZXRlQWRSU0EsXG4gIGNvbnZlcnRVcGxvYWRcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG4vKipcbiAqIOWvvOWHuiBhcGlzIOS4i+ebruW9leeahOaJgOacieaOpeWPo1xuICovXG5jb25zdCBmaWxlcyA9IHJlcXVpcmUuY29udGV4dCgnLicsIHRydWUsIC9cXC5qcy8pO1xuY29uc3QgbW9kdWxlcyA9IHt9O1xuZmlsZXMua2V5cygpLmZvckVhY2goa2V5ID0+IHtcbiAgaWYgKGtleSA9PT0gJy4vaW5kZXguanMnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG1vZHVsZXNba2V5LnJlcGxhY2UoLyheXFwuXFwvfFxcLmpzJCkvZywgJycpXSA9IGZpbGVzKGtleSkuZGVmYXVsdDtcbn0pO1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfYWpheCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FqYXguanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IGdldFVzZXJJbmZvID0gKCkgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9pbmZvYFxuICB9KTtcbn07XG5cbi8vIOmHkeW4gVxuY29uc3QgZ2V0RGFpbHlTaWduRGF5ID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9nb2xkRXhjaGFuZ2VSdWxlL2RhaWx5L3NpZ24vZGF5YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcbi8v562+5YiwXG5jb25zdCBnb1NpYW5JbiA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvZ29sZEV4Y2hhbmdlUnVsZS9kYWlseS9zaWduYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5Y+N6aaIXG5jb25zdCBwb3N0VXNlckZlZWRiYWNrID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9mZWVkYmFja2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vL+azqOmUgOeUqOaIt1xuY29uc3QgcHV0Rm9yZXZlckxvZ291dCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9mb3JldmVyL2xvZ291dGBcbiAgfSk7XG59O1xuXG4vLyDnlKjmiLfkvZnpop3orrDlvZVcbmNvbnN0IGdldFVzZXJDYXNoUmVjb3JkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL2Nhc2gvcmVjb3JkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g55So5oi36YeR5biB6K6w5b2VXG5jb25zdCBnZXRVc2VyR29sZFJlY29yZCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9nb2xkL3JlY29yZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vL+iuvue9ruaUr+S7mOWunei0puaIt1xuY29uc3QgcHV0QWxpcGF5QWNjb3VudCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9hbGlwYXkvYWNjb3VudGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5Y+R6YCB6aqM6K+B56CBXG5jb25zdCBwb3N0U2VuZENvZGUgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL3NlbmRDb2RlLyR7ZGF0YS5waG9uZX1gXG4gIH0pO1xufTtcbmxldCB1c2VyID0ge1xuICBnZXRVc2VySW5mbyxcbiAgZ2V0RGFpbHlTaWduRGF5LFxuICBnb1NpYW5JbixcbiAgcG9zdFVzZXJGZWVkYmFjayxcbiAgZ2V0VXNlckNhc2hSZWNvcmQsXG4gIGdldFVzZXJHb2xkUmVjb3JkLFxuICBwdXRGb3JldmVyTG9nb3V0LFxuICBwdXRBbGlwYXlBY2NvdW50LFxuICBwb3N0U2VuZENvZGVcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB1c2VyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jbGVhclN0b3JhZ2UgPSBjbGVhclN0b3JhZ2U7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5leHBvcnRzLmRlbGV0ZVN0b3JhZ2UgPSBkZWxldGVTdG9yYWdlO1xuZXhwb3J0cy5nZXRTdG9yYWdlID0gZ2V0U3RvcmFnZTtcbmV4cG9ydHMubG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuZXhwb3J0cy5zZXRTdG9yYWdlID0gc2V0U3RvcmFnZTtcbnZhciBfc3lzdGVtID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOS8mOWMluacrOWcsOWtmOWCqGdldOaWueazlVxuZnVuY3Rpb24gbG9jYWxTdG9yYWdlKGtleSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5nZXQoe1xuICAgICAga2V5LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gc2V0U3RvcmFnZShrZXksIHZhbHVlID0gXCJcIikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5zZXQoe1xuICAgICAga2V5LFxuICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoYHNldFN0b3JhZ2Ugc3VjY2Vzc2ApO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChgc2V0U3RvcmFnZSBmYWlsLCBjb2RlID0gJHtjb2RlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldFN0b3JhZ2Uoa2V5KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmdldCh7XG4gICAgICBrZXksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgIHJlamVjdChgZ2V0U3RvcmFnZSBmYWlsLCBjb2RlID0gJHtjb2RlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVN0b3JhZ2Uoa2V5KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICBrZXksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXNvbHZlKGBkZWxldGVTdG9yYWdlIHN1Y2Nlc3NgKTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZGF0YSwgY29kZSkge1xuICAgICAgICByZWplY3QoYGRlbGV0ZVN0b3JhZ2UgZmFpbCwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmNsZWFyKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJlc29sdmUoYGNsZWFyU3RvcmFnZSBzdWNjZXNzYCk7XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgcmVqZWN0KGBjbGVhclN0b3JhZ2UgZmFpbCwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIGdldFN0b3JhZ2UsXG4gIHNldFN0b3JhZ2Vcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3N5c3RlbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5kZXZpY2VcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8qKlxuICog5oKo5Y+v5Lul5bCG5bi455So55qE5pa55rOV44CB5oiW57O757ufIEFQSe+8jOe7n+S4gOWwgeijhe+8jOaatOmcsuWFqOWxgO+8jOS7peS+v+WQhOmhtemdouOAgee7hOS7tuiwg+eUqO+8jOiAjOaXoOmcgCByZXF1aXJlIC8gaW1wb3J0LlxuICovXG5cbi8vIOiKgua1gemYgFxuY29uc3QgdGhyb3R0bGUgPSAoZm4sIGdhcFRpbWUgPSAxNTAwKSA9PiB7XG4gIGxldCBfbGFzdFRpbWUgPSBudWxsO1xuICAvLyDov5Tlm57mlrDnmoTlh73mlbBcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgX25vd1RpbWUgPSArbmV3IERhdGUoKTtcbiAgICBpZiAoX25vd1RpbWUgLSBfbGFzdFRpbWUgPiBnYXBUaW1lIHx8ICFfbGFzdFRpbWUpIHtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8v5bCGdGhpc+WSjOWPguaVsOS8oOe7meWOn+WHveaVsFxuICAgICAgX2xhc3RUaW1lID0gX25vd1RpbWU7XG4gICAgfVxuICB9O1xufTtcbmNvbnN0IHtcbiAgSlNFbmNyeXB0XG59ID0gcmVxdWlyZSgnLi4vbGlicy9qc2VuY3J5cHQvbGliL2luZGV4Jyk7XG5jb25zdCBjb25maWcgPSB7XG4gIHB1YmxpY0tleTogJ01JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBcWFqMFkzazU0akN5VHE0N3Q3M1NjQlg5dUJzU1NjRG83L3VaK1BoSFloOWVRcUhOVzFiQmpLR1Y0dDNZOFdva2h2Nzgza3J4aElxemtQZjluSGVaMnlXcW9RbFBhM3FPVWM3V2YvSHBYMitlSEdSakYxL1JMQVJKbU1jRWdRWUIzV0diZFJlZHUwRmpRU0dkK09mU1MvVzdIZWgyWkdsRi9hU0hqMk5ZaFlFNHA3eDRqalFJaSt1ZUtadlZKTlpwdTB2aFFhRjQ1anBxUURVTFBMK01ra1FlUG11cGpwL1BSNFJhOEJWZzREd0p1STZLOGpMNzdZV2F4ZVFSYk1yRWlRMFpiVEtSUTRvOE43M2lJTTk3RS9oOFBiRGw1RmJ1Tm4wazh1cmtZbm12NTZBTWRrVkV5SU9Vd05FYThvVTlRS3ozN281WjJMNyt5cXgyem1McFZ3SURBUUFCJ1xufTtcbmNvbnN0IGRhdGFFbmNyeXB0aW9uID0gKGRhdGEsIGFjdGlvbiA9IFwiZW5jcnlwdFwiKSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IGtleU1hcCA9IHtcbiAgICAgIGVuY3J5cHQ6IGNvbmZpZy5wdWJsaWNLZXksXG4gICAgICBkZWNyeXB0OiBjb25maWcucHJpdmF0ZUtleVxuICAgIH07XG4gICAgbGV0IGtleSA9IGtleU1hcFthY3Rpb25dO1xuICAgIGxldCBfZGF0YSA9IGFjdGlvbiA9PT0gXCJlbmNyeXB0XCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChhY3Rpb24gPT09IFwiZW5jcnlwdFwiKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRvciA9IG5ldyBKU0VuY3J5cHQoKTtcbiAgICAgICAgZW5jcnlwdG9yLnNldFB1YmxpY0tleShrZXkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gZW5jcnlwdG9yLmVuY3J5cHQoX2RhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQsICfmn6XnnIvmnInku4DkuYgnKTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yLCAn6L2s5o2i5oql6ZSZ77yfJyk7XG4gIH1cbn07XG5jb25zdCBnZXRVc2VySWQgPSBhc3luYyAoKSA9PiB7XG4gIGxldCB1c2VySWQgPSBhd2FpdCBfc3lzdGVtLmRlZmF1bHQuZ2V0VXNlcklkKCk7XG4gIHJldHVybiB1c2VySWQuZGF0YS51c2VySWQ7XG59O1xuXG4vL+iOt+WPluWMv+WQjeiuvuWkh+agh+ivhuespu+8jOW7uuiuruWPquWcqOW5v+WRiueahOWcuuaZr+S9v+eUqFxuY29uc3QgZ2V0T0FJRCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHJldCA9IGF3YWl0IF9zeXN0ZW0uZGVmYXVsdC5nZXRPQUlEKCk7XG4gIHJldHVybiByZXQuZGF0YS5vYWlkO1xufTtcblxuLy/miafooYzlub/lkYrovazljJbkuIrkvKBcbmNvbnN0IGdldENvbnZlcnRVcGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSAnamgnO1xuICBjb25zdCBkZXZpY2VOdW0gPSBhd2FpdCBnZXRPQUlEKCk7XG4gIGNvbnN0IGV4YW1wbGUgPSByZXF1aXJlKCcuL2FwaXMvZXhhbXBsZS5qcycpLmRlZmF1bHQ7XG4gIGNvbnN0IHVzZXJBZENvbnZlcnRVcGxvYWRSZXEgPSB7XG4gICAgZGV2aWNlSWQ6IGRldmljZU51bSxcbiAgICBjb252ZXJzaW9uVHlwZTogJ2Jyb3dzZScsXG4gICAgY2hhbm5lbFZhbHVlOiAnLTEnLFxuICAgIGNvbnRlbnRJZDogJy0xJyxcbiAgICBhZGdyb3VwSWQ6ICctMScsXG4gICAgY2FtcGFpZ25JZDogJy0xJ1xuICB9O1xuICBjb25zb2xlLmxvZygn5omn6KGM5bm/5ZGK6L2s5YyW5LiK5LygJywgdXNlckFkQ29udmVydFVwbG9hZFJlcSwgXCJ0eXBlOiBcIiArIHR5cGUpO1xuICBleGFtcGxlLmNvbnZlcnRVcGxvYWQodXNlckFkQ29udmVydFVwbG9hZFJlcSwgdHlwZSkudGhlbihkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZygn5bm/5ZGK6L2s5YyW5LiK5Lyg5oiQ5YqfIGRhdGE6ICcsIGRhdGEpO1xuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVyciwgJ+Wksei0peWbnuiwgycpO1xuICB9KTtcbn07XG5cbi8qKlxuKiDmj5LlsY/lub/lkYogXG4qL1xuXG5jb25zdCB0YWJsZVBsYXF1ZSA9IGlkID0+IHtcbiAgbGV0IFByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XG4gIGlmICghUHJvdmlkZXIpIHtcbiAgICBjb25zb2xlLmxvZygn5rKh5pyJ5bm/5ZGK6L+U5ZueJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBpbnRlcnN0aXRpYWxBZCA9ICRhZC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgYWRVbml0SWQ6IGlkXG4gIH0pO1xuICBpbnRlcnN0aXRpYWxBZC5sb2FkKCkudGhlbihyZXMgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlcywgJ+afpeWxj+WKoOi9veaIkOWKnycpO1xuICAgIGludGVyc3RpdGlhbEFkLnNob3coKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCfmj5LlsY/lub/lkYpzaG935oiQ5YqfJyk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRinNob3flpLHotKUnKTtcbiAgICB9KTtcbiAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIsICfmj5LlsY/liqDovb3lpLHotKUnKTtcbiAgfSk7XG4gIGludGVyc3RpdGlhbEFkLm9uQ2xpY2soKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCfmj5LlsY/lub/lkYrngrnlh7vkuoYnKTtcbiAgICAvL+i9rOWMluS4iuS8oFxuICAgIGdldENvbnZlcnRVcGxvYWQoKTtcbiAgfSk7XG59O1xuXG4vKipcbiogYmFubmVy5bm/5ZGKICBtYXJnaW5fYm905bqV6YOo57yp6L+bICBcbiovXG5cbmxldCBiYW5uZXJBZDtcbmNvbnN0IHNob3dCYW5uZXJBZCA9IChhZGlkLCBtYXJnaW5fYm90KSA9PiB7XG4gIGxldCBQcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xuICBpZiAoIVByb3ZpZGVyKSB7XG4gICAgY29uc29sZS5sb2coJ+ayoeacieW5v+WRiui/lOWbnicpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZCA9IF9zeXN0ZW0uZGVmYXVsdC5nZXRJbmZvU3luYygpO1xuICBjb25zb2xlLmluZm8oXCJjYWxCYW5uZXJQb3N0aW9uMSBkPSBcIiArIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgbGV0IGhlaWdodCA9IDU3O1xuICAvL+iOt+WPlumhtemdouWGheWPr+ingeeql+WPo+eahOmrmOW6puWSjOWuveW6pu+8jOatpOWAvOS4jeWMheaLrOagh+mimOagj+WSjOeKtuaAgeagj+mrmOW6plxuICBsZXQgd2luZG93V2lkdGggPSBkLnNjcmVlbldpZHRoO1xuICBsZXQgd2luZG93SGVpZ2h0ID0gZC5zY3JlZW5IZWlnaHQgLSAxNTMgLSBtYXJnaW5fYm90O1xuICAvL2xvZ2ljV2lkdGjlr7nlupRtYW5pZmVzdC5qc29u5paH5Lu26K6+572u55qEZGVzaWduV2lkdGjlgLzvvIzpu5jorqTmmK83NTBcbiAgbGV0IGxvZ2ljV2lkdGggPSA3NTA7XG4gIC8v5bm/5ZGK6Ieq6Lqr5aSn5bCP5Y2V5L2N5pivZHDvvIzpnIDopoHovazmjaLmiJBweOWNleS9jVxuICBsZXQgcmVhbEFkSGVpZ2hQWCA9IGhlaWdodCAqIGQuc2NyZWVuRGVuc2l0eTtcbiAgLy/moIfpopjmoI/pq5jluqbkuIDoiKzmmK80MmRw5bem5Y+z77yM5q2k5aSE5Lmf6ZyA6KaB6L2s5o2i5oiQcHjljZXkvY1cbiAgbGV0IHRpdGxlQmFySGVpZ2h0ID0gNDIgKiBkLnNjcmVlbkRlbnNpdHk7XG4gIC8v5q2k5aSE6K6h566X5b6I5YWz6ZSu77yM6ZyA6KaB5bCG54q25oCB5qCP6auY5bqm44CB5qCH6aKY5qCP6auY5bqm5Yqg5LiKXG4gIGxldCByZWFsVG9wcHggPSB3aW5kb3dIZWlnaHQgLSByZWFsQWRIZWlnaFBYICsgZC5zdGF0dXNCYXJIZWlnaHQgKyB0aXRsZUJhckhlaWdodDtcbiAgY29uc29sZS5pbmZvKFwiY2FsQmFubmVyUG9zdGlvbjEgcmVhbFRvcHB4PVwiICsgcmVhbFRvcHB4ICsgXCIsIGxvZ2ljV2lkdGg9IFwiICsgbG9naWNXaWR0aCwgXCJ3aW5kb3dXaWR0aD0gXCIgKyB3aW5kb3dXaWR0aCk7XG4gIC8v6L2s5o2i5oiQ6aG16Z2i5Z+65YeG5YC85LiL55qE6YC76L6R5Y2V5L2NXG4gIGxldCBsb2dpY1dlYlRvcCA9IHJlYWxUb3BweCAqIGxvZ2ljV2lkdGggLyB3aW5kb3dXaWR0aDtcblxuICAvL+atpOWvueixoeivt+iHquW3seWcqGRhdGHkuIvlrprkuYlcbiAgbGV0IHRvcCA9IGxvZ2ljV2ViVG9wID09PSAwID8gMTIzMCA6IGxvZ2ljV2ViVG9wO1xuICBjb25zb2xlLmluZm8oXCJjYWxCYW5uZXJQb3N0aW9uMSB0b3A9XCIgKyB0b3AgKyBcIiwgbG9naWNXZWJUb3A9IFwiICsgbG9naWNXZWJUb3ApO1xuICBjb25zb2xlLmluZm8oXCJiYW5uZXLlub/lkYrkvY09XCIgKyBhZGlkKTtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IHRvcCxcbiAgICB3aWR0aDogMzYwLFxuICAgIGhlaWdodDogaGVpZ2h0XG4gIH07XG4gIGJhbm5lckFkID0gJGFkLmNyZWF0ZUJhbm5lckFkKHtcbiAgICBhZFVuaXRJZDogYWRpZCxcbiAgICAvL2Jhbm5lcuW5v+WRiuS9jVxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBhZEludGVydmFsczogNjAgLy/liLfmlrDml7bpl7TvvIznp5JcbiAgfSk7XG4gIGNvbnNvbGUuaW5mbyhcImFubmVyQWQuc3R5bGU9XCIgKyBKU09OLnN0cmluZ2lmeShiYW5uZXJBZC5zdHlsZSkpO1xuICBiYW5uZXJBZC5vbkxvYWQoZSA9PiB7XG4gICAgY29uc29sZS5pbmZvKFwibG9hZCBiYW5uZXJBZCAgb25sb2FkIHN1Y2Nlc3MgZT1cIiArIEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgfSk7XG4gIGJhbm5lckFkLm9uRXJyb3IoZSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihcImxvYWQgYmFubmVyQWQgIG9uRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XG4gIH0pO1xuICBiYW5uZXJBZC5vbkNsb3NlKGUgPT4ge1xuICAgIGNvbnNvbGUuaW5mbyhcImxvYWQgYmFubmVyQWQgIG9uQ2xvc2VcIik7XG4gIH0pO1xuICBiYW5uZXJBZC5zaG93KCk7XG59O1xuY29uc3QgaGlkZUJhbmVyQWQgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLmhpZGUoKTtcbiAgfVxufTtcbmNvbnN0IHZpZXdCYW5uZXIgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLnNob3coKTtcbiAgfVxufTtcbmNvbnN0IGRlc3Ryb3lCYW5uZXIgPSAoKSA9PiB7XG4gIGlmIChiYW5uZXJBZCkge1xuICAgIGJhbm5lckFkLmRlc3Ryb3koKTtcbiAgfVxufTtcbmNvbnN0IGV4dHJhY3RZZWFyTW9udGggPSBpbnB1dCA9PiB7XG4gIGlmIChpbnB1dC5sZW5ndGggIT09IDYgfHwgaXNOYU4oaW5wdXQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IGZvcm1hdCcpO1xuICB9XG4gIGNvbnN0IHllYXIgPSBpbnB1dC5zbGljZSgwLCA0KTtcbiAgbGV0IG1vbnRoID0gaW5wdXQuc2xpY2UoNCwgNik7XG4gIGlmIChtb250aFswXSA9PT0gJzAnKSB7XG4gICAgbW9udGggPSBtb250aFsxXTtcbiAgfSBlbHNlIHtcbiAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCkudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHllYXIsXG4gICAgbW9udGhcbiAgfTtcbn07XG5cbi8qKlxuICog5YiG56eS5YCS6K6h5pe2XG4gKiBAcGFyYW0ge09iamVjdH0gY291bnREb3duRGF0YSDnm7jlhbPlj4LmlbDvvJp0b3RhbFNlY29uZHPlgJLorqHml7bnp5LmlbDjgIFuYW1l5bGe5oCn5ZCN56ew44CBaXNGb3JtYXTmoLzlvI/ljJZcbiAqIEBwYXJhbSB7Kn0gdGhhdCDlvZPliY3nu4Tku7Z0aGlzXG4gKi9cbmNvbnN0IHN0YXJ0Q291bnREb3duID0gKGNvdW50RG93bkRhdGEsIHRoYXQpID0+IHtcbiAgbGV0IHtcbiAgICB0b3RhbFNlY29uZHMgPSAzLFxuICAgIG5hbWUsXG4gICAgaXNGb3JtYXQgPSBmYWxzZVxuICB9ID0gY291bnREb3duRGF0YTtcbiAgbGV0IF90aGlzID0gdGhhdDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodG90YWxTZWNvbmRzID4gMSkge1xuICAgICAgICB0b3RhbFNlY29uZHMtLTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IGlzRm9ybWF0ID8gKHZvaWQgMCkuZm9ybWF0VGltZShNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKSkgOiBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IGlzRm9ybWF0ID8gKHZvaWQgMCkuZm9ybWF0VGltZShNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAlIDYwKSkgOiBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAlIDYwKTtcbiAgICAgICAgX3RoaXNbbmFtZV0gPSB7XG4gICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKF90aGlzLnRpbWVyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICAgIF90aGlzLnRpbWVyID0gdGltZXI7XG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgdGhyb3R0bGUsXG4gIGdldFVzZXJJZCxcbiAgZ2V0Q29udmVydFVwbG9hZCxcbiAgZXh0cmFjdFllYXJNb250aCxcbiAgc3RhcnRDb3VudERvd24sXG4gIGRhdGFFbmNyeXB0aW9uLFxuICB0YWJsZVBsYXF1ZSxcbiAgc2hvd0Jhbm5lckFkLFxuICBoaWRlQmFuZXJBZCxcbiAgdmlld0Jhbm5lcixcbiAgZGVzdHJveUJhbm5lclxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSlNFbmNyeXB0ID0gdm9pZCAwO1xudmFyIF9iYXNlID0gcmVxdWlyZShcIi4vbGliL2pzYm4vYmFzZTY0XCIpO1xudmFyIF9KU0VuY3J5cHRSU0FLZXkgPSByZXF1aXJlKFwiLi9KU0VuY3J5cHRSU0FLZXlcIik7XG52YXIgX2E7XG52YXIgdmVyc2lvbiA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyA/IChfYSA9IHByb2Nlc3MuZW52KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubnBtX3BhY2thZ2VfdmVyc2lvbiA6IHVuZGVmaW5lZDtcbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucyA9IHt9XSAtIEFuIG9iamVjdCB0byBjdXN0b21pemUgSlNFbmNyeXB0IGJlaGF2aW91clxuICogcG9zc2libGUgcGFyYW1ldGVycyBhcmU6XG4gKiAtIGRlZmF1bHRfa2V5X3NpemUgICAgICAgIHtudW1iZXJ9ICBkZWZhdWx0OiAxMDI0IHRoZSBrZXkgc2l6ZSBpbiBiaXRcbiAqIC0gZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQge3N0cmluZ30gIGRlZmF1bHQ6ICcwMTAwMDEnIHRoZSBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHVibGljIGV4cG9uZW50XG4gKiAtIGxvZyAgICAgICAgICAgICAgICAgICAgIHtib29sZWFufSBkZWZhdWx0OiBmYWxzZSB3aGV0aGVyIGxvZyB3YXJuL2Vycm9yIG9yIG5vdFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBKU0VuY3J5cHQgPSBleHBvcnRzLkpTRW5jcnlwdCA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEpTRW5jcnlwdChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmRlZmF1bHRfa2V5X3NpemUgPSBvcHRpb25zLmRlZmF1bHRfa2V5X3NpemUgPyBwYXJzZUludChvcHRpb25zLmRlZmF1bHRfa2V5X3NpemUsIDEwKSA6IDEwMjQ7XG4gICAgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCA9IG9wdGlvbnMuZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQgfHwgXCIwMTAwMDFcIjsgLy8gNjU1MzcgZGVmYXVsdCBvcGVuc3NsIHB1YmxpYyBleHBvbmVudCBmb3IgcnNhIGtleSB0eXBlXG4gICAgdGhpcy5sb2cgPSBvcHRpb25zLmxvZyB8fCBmYWxzZTtcbiAgICAvLyBUaGUgcHJpdmF0ZSBhbmQgcHVibGljIGtleS5cbiAgICB0aGlzLmtleSA9IG51bGw7XG4gIH1cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzZXQgdGhlIHJzYSBrZXkgcGFyYW1ldGVyIChvbmUgbWV0aG9kIGlzIGVub3VnaCB0byBzZXQgYm90aCB0aGUgcHVibGljXG4gICAqIGFuZCB0aGUgcHJpdmF0ZSBrZXksIHNpbmNlIHRoZSBwcml2YXRlIGtleSBjb250YWlucyB0aGUgcHVibGljIGtleSBwYXJhbWVudGVycylcbiAgICogTG9nIGEgd2FybmluZyBpZiBsb2dzIGFyZSBlbmFibGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30ga2V5IHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcgb3IgYW4gb2JqZWN0ICh3aXRoIG9yIHdpdGhvdXQgaGVhZGVyL2Zvb3RlcilcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS5zZXRLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKHRoaXMubG9nICYmIHRoaXMua2V5KSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJBIGtleSB3YXMgYWxyZWFkeSBzZXQsIG92ZXJyaWRpbmcgZXhpc3RpbmcuXCIpO1xuICAgIH1cbiAgICB0aGlzLmtleSA9IG5ldyBfSlNFbmNyeXB0UlNBS2V5LkpTRW5jcnlwdFJTQUtleShrZXkpO1xuICB9O1xuICAvKipcbiAgICogUHJveHkgbWV0aG9kIGZvciBzZXRLZXksIGZvciBhcGkgY29tcGF0aWJpbGl0eVxuICAgKiBAc2VlIHNldEtleVxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLnNldFByaXZhdGVLZXkgPSBmdW5jdGlvbiAocHJpdmtleSkge1xuICAgIC8vIENyZWF0ZSB0aGUga2V5LlxuICAgIHRoaXMuc2V0S2V5KHByaXZrZXkpO1xuICB9O1xuICAvKipcbiAgICogUHJveHkgbWV0aG9kIGZvciBzZXRLZXksIGZvciBhcGkgY29tcGF0aWJpbGl0eVxuICAgKiBAc2VlIHNldEtleVxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLnNldFB1YmxpY0tleSA9IGZ1bmN0aW9uIChwdWJrZXkpIHtcbiAgICAvLyBTZXRzIHRoZSBwdWJsaWMga2V5LlxuICAgIHRoaXMuc2V0S2V5KHB1YmtleSk7XG4gIH07XG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIFJTQUtleSBvYmplY3QncyBkZWNyeXB0LCBkZWNyeXB0IHRoZSBzdHJpbmcgdXNpbmcgdGhlIHByaXZhdGVcbiAgICogY29tcG9uZW50cyBvZiB0aGUgcnNhIGtleSBvYmplY3QuIE5vdGUgdGhhdCBpZiB0aGUgb2JqZWN0IHdhcyBub3Qgc2V0IHdpbGwgYmUgY3JlYXRlZFxuICAgKiBvbiB0aGUgZmx5IChieSB0aGUgZ2V0S2V5IG1ldGhvZCkgdXNpbmcgdGhlIHBhcmFtZXRlcnMgcGFzc2VkIGluIHRoZSBKU0VuY3J5cHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBiYXNlNjQgZW5jb2RlZCBjcnlwdGVkIHN0cmluZyB0byBkZWNyeXB0XG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGRlY3J5cHRlZCBzdHJpbmdcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24gKHN0cikge1xuICAgIC8vIFJldHVybiB0aGUgZGVjcnlwdGVkIHN0cmluZy5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZGVjcnlwdCgoMCwgX2Jhc2UuYjY0dG9oZXgpKHN0cikpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogUHJveHkgbWV0aG9kIGZvciBSU0FLZXkgb2JqZWN0J3MgZW5jcnlwdCwgZW5jcnlwdCB0aGUgc3RyaW5nIHVzaW5nIHRoZSBwdWJsaWNcbiAgICogY29tcG9uZW50cyBvZiB0aGUgcnNhIGtleSBvYmplY3QuIE5vdGUgdGhhdCBpZiB0aGUgb2JqZWN0IHdhcyBub3Qgc2V0IHdpbGwgYmUgY3JlYXRlZFxuICAgKiBvbiB0aGUgZmx5IChieSB0aGUgZ2V0S2V5IG1ldGhvZCkgdXNpbmcgdGhlIHBhcmFtZXRlcnMgcGFzc2VkIGluIHRoZSBKU0VuY3J5cHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIGVuY3J5cHRcbiAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgZW5jcnlwdGVkIHN0cmluZyBlbmNvZGVkIGluIGJhc2U2NFxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBlbmNyeXB0ZWQgc3RyaW5nLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKDAsIF9iYXNlLmhleDJiNjQpKHRoaXMuZ2V0S2V5KCkuZW5jcnlwdChzdHIpKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIHNpZ24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgdGhlIHN0cmluZyB0byBzaWduXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ2VzdE1ldGhvZCBoYXNoIG1ldGhvZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGlnZXN0TmFtZSB0aGUgbmFtZSBvZiB0aGUgaGFzaCBhbGdvcml0aG1cbiAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgc2lnbmF0dXJlIGVuY29kZWQgaW4gYmFzZTY0XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChzdHIsIGRpZ2VzdE1ldGhvZCwgZGlnZXN0TmFtZSkge1xuICAgIC8vIHJldHVybiB0aGUgUlNBIHNpZ25hdHVyZSBvZiAnc3RyJyBpbiAnaGV4JyBmb3JtYXQuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoMCwgX2Jhc2UuaGV4MmI2NCkodGhpcy5nZXRLZXkoKS5zaWduKHN0ciwgZGlnZXN0TWV0aG9kLCBkaWdlc3ROYW1lKSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBQcm94eSBtZXRob2QgZm9yIFJTQUtleSBvYmplY3QncyB2ZXJpZnkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgdGhlIHN0cmluZyB0byB2ZXJpZnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpZ25hdHVyZSB0aGUgc2lnbmF0dXJlIGVuY29kZWQgaW4gYmFzZTY0IHRvIGNvbXBhcmUgdGhlIHN0cmluZyB0b1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdlc3RNZXRob2QgaGFzaCBtZXRob2RcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gd2hldGhlciB0aGUgZGF0YSBhbmQgc2lnbmF0dXJlIG1hdGNoXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gKHN0ciwgc2lnbmF0dXJlLCBkaWdlc3RNZXRob2QpIHtcbiAgICAvLyBSZXR1cm4gdGhlIGRlY3J5cHRlZCAnZGlnZXN0JyBvZiB0aGUgc2lnbmF0dXJlLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRLZXkoKS52ZXJpZnkoc3RyLCAoMCwgX2Jhc2UuYjY0dG9oZXgpKHNpZ25hdHVyZSksIGRpZ2VzdE1ldGhvZCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBHZXR0ZXIgZm9yIHRoZSBjdXJyZW50IEpTRW5jcnlwdFJTQUtleSBvYmplY3QuIElmIGl0IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IG9iamVjdFxuICAgKiB3aWxsIGJlIGNyZWF0ZWQgYW5kIHJldHVybmVkXG4gICAqIEBwYXJhbSB7Y2FsbGJhY2t9IFtjYl0gdGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBpZiB3ZSB3YW50IHRoZSBrZXkgdG8gYmUgZ2VuZXJhdGVkXG4gICAqIGluIGFuIGFzeW5jIGZhc2hpb25cbiAgICogQHJldHVybnMge0pTRW5jcnlwdFJTQUtleX0gdGhlIEpTRW5jcnlwdFJTQUtleSBvYmplY3RcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0LnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAvLyBPbmx5IGNyZWF0ZSBuZXcgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gICAgaWYgKCF0aGlzLmtleSkge1xuICAgICAgLy8gR2V0IGEgbmV3IHByaXZhdGUga2V5LlxuICAgICAgdGhpcy5rZXkgPSBuZXcgX0pTRW5jcnlwdFJTQUtleS5KU0VuY3J5cHRSU0FLZXkoKTtcbiAgICAgIGlmIChjYiAmJiB7fS50b1N0cmluZy5jYWxsKGNiKSA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiKSB7XG4gICAgICAgIHRoaXMua2V5LmdlbmVyYXRlQXN5bmModGhpcy5kZWZhdWx0X2tleV9zaXplLCB0aGlzLmRlZmF1bHRfcHVibGljX2V4cG9uZW50LCBjYik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIEdlbmVyYXRlIHRoZSBrZXkuXG4gICAgICB0aGlzLmtleS5nZW5lcmF0ZSh0aGlzLmRlZmF1bHRfa2V5X3NpemUsIHRoaXMuZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5rZXk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJpdmF0ZSBrZXlcbiAgICogSWYgdGhlIGtleSBkb2Vzbid0IGV4aXN0cyBhIG5ldyBrZXkgd2lsbCBiZSBjcmVhdGVkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcml2YXRlIGtleSBXSVRIIGhlYWRlciBhbmQgZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdC5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHByaXZhdGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBrZXkuXG4gICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHJpdmF0ZUtleSgpO1xuICB9O1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHByaXZhdGUga2V5XG4gICAqIElmIHRoZSBrZXkgZG9lc24ndCBleGlzdHMgYSBuZXcga2V5IHdpbGwgYmUgY3JlYXRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJpdmF0ZSBrZXkgV0lUSE9VVCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmdldFByaXZhdGVLZXlCNjQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBwcml2YXRlIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMga2V5LlxuICAgIHJldHVybiB0aGlzLmdldEtleSgpLmdldFByaXZhdGVCYXNlS2V5QjY0KCk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHVibGljIGtleVxuICAgKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHB1YmxpYyBrZXkgV0lUSCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmdldFB1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHByaXZhdGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBrZXkuXG4gICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHVibGljS2V5KCk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHVibGljIGtleVxuICAgKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHB1YmxpYyBrZXkgV0lUSE9VVCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHQucHJvdG90eXBlLmdldFB1YmxpY0tleUI2NCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHByaXZhdGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBrZXkuXG4gICAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHVibGljQmFzZUtleUI2NCgpO1xuICB9O1xuICBKU0VuY3J5cHQudmVyc2lvbiA9IHZlcnNpb247XG4gIHJldHVybiBKU0VuY3J5cHQ7XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkpTRW5jcnlwdFJTQUtleSA9IHZvaWQgMDtcbnZhciBfYmFzZSA9IHJlcXVpcmUoXCIuL2xpYi9qc2JuL2Jhc2U2NFwiKTtcbnZhciBfaGV4ID0gcmVxdWlyZShcIi4vbGliL2FzbjFqcy9oZXhcIik7XG52YXIgX2Jhc2UyID0gcmVxdWlyZShcIi4vbGliL2FzbjFqcy9iYXNlNjRcIik7XG52YXIgX2FzbiA9IHJlcXVpcmUoXCIuL2xpYi9hc24xanMvYXNuMVwiKTtcbnZhciBfcnNhID0gcmVxdWlyZShcIi4vbGliL2pzYm4vcnNhXCIpO1xudmFyIF9qc2JuID0gcmVxdWlyZShcIi4vbGliL2pzYm4vanNiblwiKTtcbnZhciBfYXNuMiA9IHJlcXVpcmUoXCIuL2xpYi9qc3JzYXNpZ24vYXNuMS0xLjBcIik7XG52YXIgX19leHRlbmRzID0gdm9pZCAwICYmICh2b2lkIDApLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoKSB7XG4gIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IHtcbiAgICAgIF9fcHJvdG9fXzogW11cbiAgICB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgIGQuX19wcm90b19fID0gYjtcbiAgICB9IHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdO1xuICAgIH07XG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIGZ1bmN0aW9uIF9fKCkge1xuICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7XG4gICAgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgfTtcbn0oKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IEpTRW5jcnlwdFJTQUtleSB0aGF0IGV4dGVuZHMgVG9tIFd1J3MgUlNBIGtleSBvYmplY3QuXG4gKiBUaGlzIG9iamVjdCBpcyBqdXN0IGEgZGVjb3JhdG9yIGZvciBwYXJzaW5nIHRoZSBrZXkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IGtleSAtIFRoZSBrZXkgaW4gc3RyaW5nIGZvcm1hdCwgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAqIHRoZSBwYXJhbWV0ZXJzIG5lZWRlZCB0byBidWlsZCBhIFJTQUtleSBvYmplY3QuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIEpTRW5jcnlwdFJTQUtleSA9IGV4cG9ydHMuSlNFbmNyeXB0UlNBS2V5ID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uIChfc3VwZXIpIHtcbiAgX19leHRlbmRzKEpTRW5jcnlwdFJTQUtleSwgX3N1cGVyKTtcbiAgZnVuY3Rpb24gSlNFbmNyeXB0UlNBS2V5KGtleSkge1xuICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgLy8gQ2FsbCB0aGUgc3VwZXIgY29uc3RydWN0b3IuXG4gICAgLy8gIFJTQUtleS5jYWxsKHRoaXMpO1xuICAgIC8vIElmIGEga2V5IGtleSB3YXMgcHJvdmlkZWQuXG4gICAgaWYgKGtleSkge1xuICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZy4uLlxuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgX3RoaXMucGFyc2VLZXkoa2V5KTtcbiAgICAgIH0gZWxzZSBpZiAoSlNFbmNyeXB0UlNBS2V5Lmhhc1ByaXZhdGVLZXlQcm9wZXJ0eShrZXkpIHx8IEpTRW5jcnlwdFJTQUtleS5oYXNQdWJsaWNLZXlQcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdmFsdWVzIGZvciB0aGUga2V5LlxuICAgICAgICBfdGhpcy5wYXJzZVByb3BlcnRpZXNGcm9tKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvKipcbiAgICogTWV0aG9kIHRvIHBhcnNlIGEgcGVtIGVuY29kZWQgc3RyaW5nIGNvbnRhaW5pbmcgYm90aCBhIHB1YmxpYyBvciBwcml2YXRlIGtleS5cbiAgICogVGhlIG1ldGhvZCB3aWxsIHRyYW5zbGF0ZSB0aGUgcGVtIGVuY29kZWQgc3RyaW5nIGluIGEgZGVyIGVuY29kZWQgc3RyaW5nIGFuZFxuICAgKiB3aWxsIHBhcnNlIHByaXZhdGUga2V5IGFuZCBwdWJsaWMga2V5IHBhcmFtZXRlcnMuIFRoaXMgbWV0aG9kIGFjY2VwdHMgcHVibGljIGtleVxuICAgKiBpbiB0aGUgcnNhZW5jcnlwdGlvbiBwa2NzICMxIGZvcm1hdCAob2lkOiAxLjIuODQwLjExMzU0OS4xLjEuMSkuXG4gICAqXG4gICAqIEB0b2RvIENoZWNrIGhvdyBtYW55IHJzYSBmb3JtYXRzIHVzZSB0aGUgc2FtZSBmb3JtYXQgb2YgcGtjcyAjMS5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBkZWZpbmVkIGFzOlxuICAgKiBQdWJsaWNLZXlJbmZvIDo6PSBTRVFVRU5DRSB7XG4gICAqICAgYWxnb3JpdGhtICAgICAgIEFsZ29yaXRobUlkZW50aWZpZXIsXG4gICAqICAgUHVibGljS2V5ICAgICAgIEJJVCBTVFJJTkdcbiAgICogfVxuICAgKiBXaGVyZSBBbGdvcml0aG1JZGVudGlmaWVyIGlzOlxuICAgKiBBbGdvcml0aG1JZGVudGlmaWVyIDo6PSBTRVFVRU5DRSB7XG4gICAqICAgYWxnb3JpdGhtICAgICAgIE9CSkVDVCBJREVOVElGSUVSLCAgICAgdGhlIE9JRCBvZiB0aGUgZW5jIGFsZ29yaXRobVxuICAgKiAgIHBhcmFtZXRlcnMgICAgICBBTlkgREVGSU5FRCBCWSBhbGdvcml0aG0gT1BUSU9OQUwgKE5VTEwgZm9yIFBLQ1MgIzEpXG4gICAqIH1cbiAgICogYW5kIFB1YmxpY0tleSBpcyBhIFNFUVVFTkNFIGVuY2Fwc3VsYXRlZCBpbiBhIEJJVCBTVFJJTkdcbiAgICogUlNBUHVibGljS2V5IDo6PSBTRVFVRU5DRSB7XG4gICAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cbiAgICogICBwdWJsaWNFeHBvbmVudCAgICBJTlRFR0VSICAgLS0gZVxuICAgKiB9XG4gICAqIGl0J3MgcG9zc2libGUgdG8gZXhhbWluZSB0aGUgc3RydWN0dXJlIG9mIHRoZSBrZXlzIG9idGFpbmVkIGZyb20gb3BlbnNzbCB1c2luZ1xuICAgKiBhbiBhc24uMSBkdW1wZXIgYXMgdGhlIG9uZSB1c2VkIGhlcmUgdG8gcGFyc2UgdGhlIGNvbXBvbmVudHM6IGh0dHA6Ly9sYXBvLml0L2FzbjFqcy9cbiAgICogQGFyZ3VtZW50IHtzdHJpbmd9IHBlbSB0aGUgcGVtIGVuY29kZWQgc3RyaW5nLCBjYW4gaW5jbHVkZSB0aGUgQkVHSU4vRU5EIGhlYWRlci9mb290ZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUucGFyc2VLZXkgPSBmdW5jdGlvbiAocGVtKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtb2R1bHVzID0gMDtcbiAgICAgIHZhciBwdWJsaWNfZXhwb25lbnQgPSAwO1xuICAgICAgdmFyIHJlSGV4ID0gL15cXHMqKD86WzAtOUEtRmEtZl1bMC05QS1GYS1mXVxccyopKyQvO1xuICAgICAgdmFyIGRlciA9IHJlSGV4LnRlc3QocGVtKSA/IF9oZXguSGV4LmRlY29kZShwZW0pIDogX2Jhc2UyLkJhc2U2NC51bmFybW9yKHBlbSk7XG4gICAgICB2YXIgYXNuMSA9IF9hc24uQVNOMS5kZWNvZGUoZGVyKTtcbiAgICAgIC8vIEZpeGVzIGEgYnVnIHdpdGggT3BlblNTTCAxLjArIHByaXZhdGUga2V5c1xuICAgICAgaWYgKGFzbjEuc3ViLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBhc24xID0gYXNuMS5zdWJbMl0uc3ViWzBdO1xuICAgICAgfVxuICAgICAgaWYgKGFzbjEuc3ViLmxlbmd0aCA9PT0gOSkge1xuICAgICAgICAvLyBQYXJzZSB0aGUgcHJpdmF0ZSBrZXkuXG4gICAgICAgIG1vZHVsdXMgPSBhc24xLnN1YlsxXS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5uID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShtb2R1bHVzLCAxNik7XG4gICAgICAgIHB1YmxpY19leHBvbmVudCA9IGFzbjEuc3ViWzJdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGludFxuICAgICAgICB0aGlzLmUgPSBwYXJzZUludChwdWJsaWNfZXhwb25lbnQsIDE2KTtcbiAgICAgICAgdmFyIHByaXZhdGVfZXhwb25lbnQgPSBhc24xLnN1YlszXS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5kID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShwcml2YXRlX2V4cG9uZW50LCAxNik7XG4gICAgICAgIHZhciBwcmltZTEgPSBhc24xLnN1Yls0XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5wID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShwcmltZTEsIDE2KTtcbiAgICAgICAgdmFyIHByaW1lMiA9IGFzbjEuc3ViWzVdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vIGJpZ2ludFxuICAgICAgICB0aGlzLnEgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKHByaW1lMiwgMTYpO1xuICAgICAgICB2YXIgZXhwb25lbnQxID0gYXNuMS5zdWJbNl0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XG4gICAgICAgIHRoaXMuZG1wMSA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoZXhwb25lbnQxLCAxNik7XG4gICAgICAgIHZhciBleHBvbmVudDIgPSBhc24xLnN1Yls3XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvLyBiaWdpbnRcbiAgICAgICAgdGhpcy5kbXExID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShleHBvbmVudDIsIDE2KTtcbiAgICAgICAgdmFyIGNvZWZmaWNpZW50ID0gYXNuMS5zdWJbOF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy8gYmlnaW50XG4gICAgICAgIHRoaXMuY29lZmYgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKGNvZWZmaWNpZW50LCAxNik7XG4gICAgICB9IGVsc2UgaWYgKGFzbjEuc3ViLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBpZiAoYXNuMS5zdWJbMF0uc3ViKSB7XG4gICAgICAgICAgLy8gUGFyc2UgQVNOLjEgU3ViamVjdFB1YmxpY0tleUluZm8gdHlwZSBhcyBkZWZpbmVkIGJ5IFguNTA5XG4gICAgICAgICAgdmFyIGJpdF9zdHJpbmcgPSBhc24xLnN1YlsxXTtcbiAgICAgICAgICB2YXIgc2VxdWVuY2UgPSBiaXRfc3RyaW5nLnN1YlswXTtcbiAgICAgICAgICBtb2R1bHVzID0gc2VxdWVuY2Uuc3ViWzBdLmdldEhleFN0cmluZ1ZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5uID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShtb2R1bHVzLCAxNik7XG4gICAgICAgICAgcHVibGljX2V4cG9uZW50ID0gc2VxdWVuY2Uuc3ViWzFdLmdldEhleFN0cmluZ1ZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5lID0gcGFyc2VJbnQocHVibGljX2V4cG9uZW50LCAxNik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUGFyc2UgQVNOLjEgUlNBUHVibGljS2V5IHR5cGUgYXMgZGVmaW5lZCBieSBQS0NTICMxXG4gICAgICAgICAgbW9kdWx1cyA9IGFzbjEuc3ViWzBdLmdldEhleFN0cmluZ1ZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5uID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShtb2R1bHVzLCAxNik7XG4gICAgICAgICAgcHVibGljX2V4cG9uZW50ID0gYXNuMS5zdWJbMV0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcbiAgICAgICAgICB0aGlzLmUgPSBwYXJzZUludChwdWJsaWNfZXhwb25lbnQsIDE2KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgcnNhIHBhcmFtZXRlcnMgaW4gYSBoZXggZW5jb2RlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByc2Ega2V5LlxuICAgKlxuICAgKiBUaGUgdHJhbnNsYXRpb24gZm9sbG93IHRoZSBBU04uMSBub3RhdGlvbiA6XG4gICAqIFJTQVByaXZhdGVLZXkgOjo9IFNFUVVFTkNFIHtcbiAgICogICB2ZXJzaW9uICAgICAgICAgICBWZXJzaW9uLFxuICAgKiAgIG1vZHVsdXMgICAgICAgICAgIElOVEVHRVIsICAtLSBuXG4gICAqICAgcHVibGljRXhwb25lbnQgICAgSU5URUdFUiwgIC0tIGVcbiAgICogICBwcml2YXRlRXhwb25lbnQgICBJTlRFR0VSLCAgLS0gZFxuICAgKiAgIHByaW1lMSAgICAgICAgICAgIElOVEVHRVIsICAtLSBwXG4gICAqICAgcHJpbWUyICAgICAgICAgICAgSU5URUdFUiwgIC0tIHFcbiAgICogICBleHBvbmVudDEgICAgICAgICBJTlRFR0VSLCAgLS0gZCBtb2QgKHAxKVxuICAgKiAgIGV4cG9uZW50MiAgICAgICAgIElOVEVHRVIsICAtLSBkIG1vZCAocS0xKVxuICAgKiAgIGNvZWZmaWNpZW50ICAgICAgIElOVEVHRVIsICAtLSAoaW52ZXJzZSBvZiBxKSBtb2QgcFxuICAgKiB9XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9ICBERVIgRW5jb2RlZCBTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByc2EgcHJpdmF0ZSBrZXlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUuZ2V0UHJpdmF0ZUJhc2VLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBhcnJheTogW25ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGludDogMFxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5uXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgaW50OiB0aGlzLmVcbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBiaWdpbnQ6IHRoaXMuZFxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5wXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLnFcbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUkludGVnZXIoe1xuICAgICAgICBiaWdpbnQ6IHRoaXMuZG1wMVxuICAgICAgfSksIG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5kbXExXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgYmlnaW50OiB0aGlzLmNvZWZmXG4gICAgICB9KV1cbiAgICB9O1xuICAgIHZhciBzZXEgPSBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUlNlcXVlbmNlKG9wdGlvbnMpO1xuICAgIHJldHVybiBzZXEuZ2V0RW5jb2RlZEhleCgpO1xuICB9O1xuICAvKipcbiAgICogYmFzZTY0IChwZW0pIGVuY29kZWQgdmVyc2lvbiBvZiB0aGUgREVSIGVuY29kZWQgcmVwcmVzZW50YXRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gd2l0aG91dCBoZWFkZXIgYW5kIGZvb3RlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBKU0VuY3J5cHRSU0FLZXkucHJvdG90eXBlLmdldFByaXZhdGVCYXNlS2V5QjY0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoMCwgX2Jhc2UuaGV4MmI2NCkodGhpcy5nZXRQcml2YXRlQmFzZUtleSgpKTtcbiAgfTtcbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSByc2EgcGFyYW1ldGVycyBpbiBhIGhleCBlbmNvZGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBwdWJsaWMga2V5LlxuICAgKiBUaGUgcmVwcmVzZW50YXRpb24gZm9sbG93IHRoZSBBU04uMSBub3RhdGlvbiA6XG4gICAqIFB1YmxpY0tleUluZm8gOjo9IFNFUVVFTkNFIHtcbiAgICogICBhbGdvcml0aG0gICAgICAgQWxnb3JpdGhtSWRlbnRpZmllcixcbiAgICogICBQdWJsaWNLZXkgICAgICAgQklUIFNUUklOR1xuICAgKiB9XG4gICAqIFdoZXJlIEFsZ29yaXRobUlkZW50aWZpZXIgaXM6XG4gICAqIEFsZ29yaXRobUlkZW50aWZpZXIgOjo9IFNFUVVFTkNFIHtcbiAgICogICBhbGdvcml0aG0gICAgICAgT0JKRUNUIElERU5USUZJRVIsICAgICB0aGUgT0lEIG9mIHRoZSBlbmMgYWxnb3JpdGhtXG4gICAqICAgcGFyYW1ldGVycyAgICAgIEFOWSBERUZJTkVEIEJZIGFsZ29yaXRobSBPUFRJT05BTCAoTlVMTCBmb3IgUEtDUyAjMSlcbiAgICogfVxuICAgKiBhbmQgUHVibGljS2V5IGlzIGEgU0VRVUVOQ0UgZW5jYXBzdWxhdGVkIGluIGEgQklUIFNUUklOR1xuICAgKiBSU0FQdWJsaWNLZXkgOjo9IFNFUVVFTkNFIHtcbiAgICogICBtb2R1bHVzICAgICAgICAgICBJTlRFR0VSLCAgLS0gblxuICAgKiAgIHB1YmxpY0V4cG9uZW50ICAgIElOVEVHRVIgICAtLSBlXG4gICAqIH1cbiAgICogQHJldHVybnMge3N0cmluZ30gREVSIEVuY29kZWQgU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIHB1YmxpYyBrZXlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUuZ2V0UHVibGljQmFzZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlyc3Rfc2VxdWVuY2UgPSBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUlNlcXVlbmNlKHtcbiAgICAgIGFycmF5OiBbbmV3IF9hc24yLktKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyKHtcbiAgICAgICAgb2lkOiBcIjEuMi44NDAuMTEzNTQ5LjEuMS4xXCJcbiAgICAgIH0pLCBuZXcgX2FzbjIuS0pVUi5hc24xLkRFUk51bGwoKV1cbiAgICB9KTtcbiAgICB2YXIgc2Vjb25kX3NlcXVlbmNlID0gbmV3IF9hc24yLktKVVIuYXNuMS5ERVJTZXF1ZW5jZSh7XG4gICAgICBhcnJheTogW25ldyBfYXNuMi5LSlVSLmFzbjEuREVSSW50ZWdlcih7XG4gICAgICAgIGJpZ2ludDogdGhpcy5uXG4gICAgICB9KSwgbmV3IF9hc24yLktKVVIuYXNuMS5ERVJJbnRlZ2VyKHtcbiAgICAgICAgaW50OiB0aGlzLmVcbiAgICAgIH0pXVxuICAgIH0pO1xuICAgIHZhciBiaXRfc3RyaW5nID0gbmV3IF9hc24yLktKVVIuYXNuMS5ERVJCaXRTdHJpbmcoe1xuICAgICAgaGV4OiBcIjAwXCIgKyBzZWNvbmRfc2VxdWVuY2UuZ2V0RW5jb2RlZEhleCgpXG4gICAgfSk7XG4gICAgdmFyIHNlcSA9IG5ldyBfYXNuMi5LSlVSLmFzbjEuREVSU2VxdWVuY2Uoe1xuICAgICAgYXJyYXk6IFtmaXJzdF9zZXF1ZW5jZSwgYml0X3N0cmluZ11cbiAgICB9KTtcbiAgICByZXR1cm4gc2VxLmdldEVuY29kZWRIZXgoKTtcbiAgfTtcbiAgLyoqXG4gICAqIGJhc2U2NCAocGVtKSBlbmNvZGVkIHZlcnNpb24gb2YgdGhlIERFUiBlbmNvZGVkIHJlcHJlc2VudGF0aW9uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQdWJsaWNCYXNlS2V5QjY0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoMCwgX2Jhc2UuaGV4MmI2NCkodGhpcy5nZXRQdWJsaWNCYXNlS2V5KCkpO1xuICB9O1xuICAvKipcbiAgICogd3JhcCB0aGUgc3RyaW5nIGluIGJsb2NrIG9mIHdpZHRoIGNoYXJzLiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgcnNhIGtleXMgaXMgNjRcbiAgICogY2hhcmFjdGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgcGVtIGVuY29kZWQgc3RyaW5nIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aD02NF0gLSB0aGUgbGVuZ3RoIHRoZSBzdHJpbmcgaGFzIHRvIGJlIHdyYXBwZWQgYXRcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS53b3Jkd3JhcCA9IGZ1bmN0aW9uIChzdHIsIHdpZHRoKSB7XG4gICAgd2lkdGggPSB3aWR0aCB8fCA2NDtcbiAgICBpZiAoIXN0cikge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgdmFyIHJlZ2V4ID0gXCIoLnsxLFwiICsgd2lkdGggKyBcIn0pKCArfCRcXG4/KXwoLnsxLFwiICsgd2lkdGggKyBcIn0pXCI7XG4gICAgcmV0dXJuIHN0ci5tYXRjaChSZWdFeHAocmVnZXgsIFwiZ1wiKSkuam9pbihcIlxcblwiKTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHJpZXZlIHRoZSBwZW0gZW5jb2RlZCBwcml2YXRlIGtleVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcGVtIGVuY29kZWQgcHJpdmF0ZSBrZXkgd2l0aCBoZWFkZXIvZm9vdGVyXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIga2V5ID0gXCItLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXFxuXCI7XG4gICAga2V5ICs9IEpTRW5jcnlwdFJTQUtleS53b3Jkd3JhcCh0aGlzLmdldFByaXZhdGVCYXNlS2V5QjY0KCkpICsgXCJcXG5cIjtcbiAgICBrZXkgKz0gXCItLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLVwiO1xuICAgIHJldHVybiBrZXk7XG4gIH07XG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcGVtIGVuY29kZWQgcHVibGljIGtleVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcGVtIGVuY29kZWQgcHVibGljIGtleSB3aXRoIGhlYWRlci9mb290ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGtleSA9IFwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5cIjtcbiAgICBrZXkgKz0gSlNFbmNyeXB0UlNBS2V5LndvcmR3cmFwKHRoaXMuZ2V0UHVibGljQmFzZUtleUI2NCgpKSArIFwiXFxuXCI7XG4gICAga2V5ICs9IFwiLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCI7XG4gICAgcmV0dXJuIGtleTtcbiAgfTtcbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBvYmplY3QgY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzIHRvIHBvcHVsYXRlIHRoZSByc2EgbW9kdWx1c1xuICAgKiBhbmQgcHVibGljIGV4cG9uZW50IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqPXt9XSAtIEFuIG9iamVjdCB0aGF0IG1heSBjb250YWluIHRoZSB0d28gcHVibGljIGtleVxuICAgKiBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgY29udGFpbnMgYm90aCB0aGUgbW9kdWx1cyBhbmQgdGhlIHB1YmxpYyBleHBvbmVudFxuICAgKiBwcm9wZXJ0aWVzIChuIGFuZCBlKVxuICAgKiBAdG9kbyBjaGVjayBmb3IgdHlwZXMgb2YgbiBhbmQgZS4gTiBzaG91bGQgYmUgYSBwYXJzZWFibGUgYmlnSW50IG9iamVjdCwgRSBzaG91bGRcbiAgICogYmUgYSBwYXJzZWFibGUgaW50ZWdlciBudW1iZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEpTRW5jcnlwdFJTQUtleS5oYXNQdWJsaWNLZXlQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBvYmogPSBvYmogfHwge307XG4gICAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShcIm5cIikgJiYgb2JqLmhhc093blByb3BlcnR5KFwiZVwiKTtcbiAgfTtcbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBvYmplY3QgY29udGFpbnMgQUxMIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIFJTQSBrZXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqPXt9XSAtIEFuIG9iamVjdCB0aGF0IG1heSBjb250YWluIG5pbmUgcnNhIGtleVxuICAgKiBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgY29udGFpbnMgYWxsIHRoZSBwYXJhbWV0ZXJzIG5lZWRlZFxuICAgKiBAdG9kbyBjaGVjayBmb3IgdHlwZXMgb2YgdGhlIHBhcmFtZXRlcnMgYWxsIHRoZSBwYXJhbWV0ZXJzIGJ1dCB0aGUgcHVibGljIGV4cG9uZW50XG4gICAqIHNob3VsZCBiZSBwYXJzZWFibGUgYmlnaW50IG9iamVjdHMsIHRoZSBwdWJsaWMgZXhwb25lbnQgc2hvdWxkIGJlIGEgcGFyc2VhYmxlIGludGVnZXIgbnVtYmVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBKU0VuY3J5cHRSU0FLZXkuaGFzUHJpdmF0ZUtleVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KFwiblwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJlXCIpICYmIG9iai5oYXNPd25Qcm9wZXJ0eShcImRcIikgJiYgb2JqLmhhc093blByb3BlcnR5KFwicFwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJxXCIpICYmIG9iai5oYXNPd25Qcm9wZXJ0eShcImRtcDFcIikgJiYgb2JqLmhhc093blByb3BlcnR5KFwiZG1xMVwiKSAmJiBvYmouaGFzT3duUHJvcGVydHkoXCJjb2VmZlwiKTtcbiAgfTtcbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBwcm9wZXJ0aWVzIG9mIG9iaiBpbiB0aGUgY3VycmVudCByc2Egb2JqZWN0LiBPYmogc2hvdWxkIEFUIExFQVNUXG4gICAqIGluY2x1ZGUgdGhlIG1vZHVsdXMgYW5kIHB1YmxpYyBleHBvbmVudCAobiwgZSkgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHRoZSBvYmplY3QgY29udGFpbmluZyByc2EgcGFyYW1ldGVyc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5wYXJzZVByb3BlcnRpZXNGcm9tID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHRoaXMubiA9IG9iai5uO1xuICAgIHRoaXMuZSA9IG9iai5lO1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoXCJkXCIpKSB7XG4gICAgICB0aGlzLmQgPSBvYmouZDtcbiAgICAgIHRoaXMucCA9IG9iai5wO1xuICAgICAgdGhpcy5xID0gb2JqLnE7XG4gICAgICB0aGlzLmRtcDEgPSBvYmouZG1wMTtcbiAgICAgIHRoaXMuZG1xMSA9IG9iai5kbXExO1xuICAgICAgdGhpcy5jb2VmZiA9IG9iai5jb2VmZjtcbiAgICB9XG4gIH07XG4gIHJldHVybiBKU0VuY3J5cHRSU0FLZXk7XG59KF9yc2EuUlNBS2V5KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkpTRW5jcnlwdFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfSlNFbmNyeXB0LkpTRW5jcnlwdDtcbiAgfVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX0pTRW5jcnlwdCA9IHJlcXVpcmUoXCIuL0pTRW5jcnlwdFwiKTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IF9KU0VuY3J5cHQuSlNFbmNyeXB0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TdHJlYW0gPSBleHBvcnRzLkFTTjFUYWcgPSBleHBvcnRzLkFTTjEgPSB2b2lkIDA7XG52YXIgX2ludCA9IHJlcXVpcmUoXCIuL2ludDEwXCIpO1xuLy8gQVNOLjEgSmF2YVNjcmlwdCBkZWNvZGVyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxNCBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cbi8vIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxuLy8gcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLCBwcm92aWRlZCB0aGF0IHRoZSBhYm92ZVxuLy8gY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBhcHBlYXIgaW4gYWxsIGNvcGllcy5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIGltbWVkOiB0cnVlLCBsYXRlZGVmOiB0cnVlLCB1bmRlZjogdHJ1ZSwgcmVnZXhkYXNoOiBmYWxzZSAqL1xuLypnbG9iYWwgb2lkcyAqL1xuXG52YXIgZWxsaXBzaXMgPSBcIlxcdTIwMjZcIjtcbnZhciByZVRpbWVTID0gL14oXFxkXFxkKSgwWzEtOV18MVswLTJdKSgwWzEtOV18WzEyXVxcZHwzWzAxXSkoWzAxXVxcZHwyWzAtM10pKD86KFswLTVdXFxkKSg/OihbMC01XVxcZCkoPzpbLixdKFxcZHsxLDN9KSk/KT8pPyhafFstK10oPzpbMF1cXGR8MVswLTJdKShbMC01XVxcZCk/KT8kLztcbnZhciByZVRpbWVMID0gL14oXFxkXFxkXFxkXFxkKSgwWzEtOV18MVswLTJdKSgwWzEtOV18WzEyXVxcZHwzWzAxXSkoWzAxXVxcZHwyWzAtM10pKD86KFswLTVdXFxkKSg/OihbMC01XVxcZCkoPzpbLixdKFxcZHsxLDN9KSk/KT8pPyhafFstK10oPzpbMF1cXGR8MVswLTJdKShbMC01XVxcZCk/KT8kLztcbmZ1bmN0aW9uIHN0cmluZ0N1dChzdHIsIGxlbikge1xuICBpZiAoc3RyLmxlbmd0aCA+IGxlbikge1xuICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbGVuKSArIGVsbGlwc2lzO1xuICB9XG4gIHJldHVybiBzdHI7XG59XG52YXIgU3RyZWFtID0gZXhwb3J0cy5TdHJlYW0gPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdHJlYW0oZW5jLCBwb3MpIHtcbiAgICB0aGlzLmhleERpZ2l0cyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGlmIChlbmMgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICAgIHRoaXMuZW5jID0gZW5jLmVuYztcbiAgICAgIHRoaXMucG9zID0gZW5jLnBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZW5jIHNob3VsZCBiZSBhbiBhcnJheSBvciBhIGJpbmFyeSBzdHJpbmdcbiAgICAgIHRoaXMuZW5jID0gZW5jO1xuICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgfVxuICB9XG4gIFN0cmVhbS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBvcykge1xuICAgIGlmIChwb3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcG9zID0gdGhpcy5wb3MrKztcbiAgICB9XG4gICAgaWYgKHBvcyA+PSB0aGlzLmVuYy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVlc3RpbmcgYnl0ZSBvZmZzZXQgXCIuY29uY2F0KHBvcywgXCIgb24gYSBzdHJlYW0gb2YgbGVuZ3RoIFwiKS5jb25jYXQodGhpcy5lbmMubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiBcInN0cmluZ1wiID09PSB0eXBlb2YgdGhpcy5lbmMgPyB0aGlzLmVuYy5jaGFyQ29kZUF0KHBvcykgOiB0aGlzLmVuY1twb3NdO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLmhleEJ5dGUgPSBmdW5jdGlvbiAoYikge1xuICAgIHJldHVybiB0aGlzLmhleERpZ2l0cy5jaGFyQXQoYiA+PiA0ICYgMHhGKSArIHRoaXMuaGV4RGlnaXRzLmNoYXJBdChiICYgMHhGKTtcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5oZXhEdW1wID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHJhdykge1xuICAgIHZhciBzID0gXCJcIjtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgcyArPSB0aGlzLmhleEJ5dGUodGhpcy5nZXQoaSkpO1xuICAgICAgaWYgKHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgICBzd2l0Y2ggKGkgJiAweEYpIHtcbiAgICAgICAgICBjYXNlIDB4NzpcbiAgICAgICAgICAgIHMgKz0gXCIgIFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAweEY6XG4gICAgICAgICAgICBzICs9IFwiXFxuXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcyArPSBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5pc0FTQ0lJID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdmFyIGMgPSB0aGlzLmdldChpKTtcbiAgICAgIGlmIChjIDwgMzIgfHwgYyA+IDE3Nikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nSVNPID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgcyA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmdldChpKSk7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nVVRGID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgcyA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOykge1xuICAgICAgdmFyIGMgPSB0aGlzLmdldChpKyspO1xuICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgfSBlbHNlIGlmIChjID4gMTkxICYmIGMgPCAyMjQpIHtcbiAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgMHgxRikgPDwgNiB8IHRoaXMuZ2V0KGkrKykgJiAweDNGKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDB4MEYpIDw8IDEyIHwgKHRoaXMuZ2V0KGkrKykgJiAweDNGKSA8PCA2IHwgdGhpcy5nZXQoaSsrKSAmIDB4M0YpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5wYXJzZVN0cmluZ0JNUCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgdmFyIGhpO1xuICAgIHZhciBsbztcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7KSB7XG4gICAgICBoaSA9IHRoaXMuZ2V0KGkrKyk7XG4gICAgICBsbyA9IHRoaXMuZ2V0KGkrKyk7XG4gICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShoaSA8PCA4IHwgbG8pO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuICBTdHJlYW0ucHJvdG90eXBlLnBhcnNlVGltZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBzaG9ydFllYXIpIHtcbiAgICB2YXIgcyA9IHRoaXMucGFyc2VTdHJpbmdJU08oc3RhcnQsIGVuZCk7XG4gICAgdmFyIG0gPSAoc2hvcnRZZWFyID8gcmVUaW1lUyA6IHJlVGltZUwpLmV4ZWMocyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICByZXR1cm4gXCJVbnJlY29nbml6ZWQgdGltZTogXCIgKyBzO1xuICAgIH1cbiAgICBpZiAoc2hvcnRZZWFyKSB7XG4gICAgICAvLyB0byBhdm9pZCBxdWVyeWluZyB0aGUgdGltZXIsIHVzZSB0aGUgZml4ZWQgcmFuZ2UgWzE5NzAsIDIwNjldXG4gICAgICAvLyBpdCB3aWxsIGNvbmZvcm0gd2l0aCBJVFUgWC40MDAgWy0xMCwgKzQwXSBzbGlkaW5nIHdpbmRvdyB1bnRpbCAyMDMwXG4gICAgICBtWzFdID0gK21bMV07XG4gICAgICBtWzFdICs9ICttWzFdIDwgNzAgPyAyMDAwIDogMTkwMDtcbiAgICB9XG4gICAgcyA9IG1bMV0gKyBcIi1cIiArIG1bMl0gKyBcIi1cIiArIG1bM10gKyBcIiBcIiArIG1bNF07XG4gICAgaWYgKG1bNV0pIHtcbiAgICAgIHMgKz0gXCI6XCIgKyBtWzVdO1xuICAgICAgaWYgKG1bNl0pIHtcbiAgICAgICAgcyArPSBcIjpcIiArIG1bNl07XG4gICAgICAgIGlmIChtWzddKSB7XG4gICAgICAgICAgcyArPSBcIi5cIiArIG1bN107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1bOF0pIHtcbiAgICAgIHMgKz0gXCIgVVRDXCI7XG4gICAgICBpZiAobVs4XSAhPSBcIlpcIikge1xuICAgICAgICBzICs9IG1bOF07XG4gICAgICAgIGlmIChtWzldKSB7XG4gICAgICAgICAgcyArPSBcIjpcIiArIG1bOV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VJbnRlZ2VyID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgdiA9IHRoaXMuZ2V0KHN0YXJ0KTtcbiAgICB2YXIgbmVnID0gdiA+IDEyNztcbiAgICB2YXIgcGFkID0gbmVnID8gMjU1IDogMDtcbiAgICB2YXIgbGVuO1xuICAgIHZhciBzID0gXCJcIjtcbiAgICAvLyBza2lwIHVudXNlZnVsIGJpdHMgKG5vdCBhbGxvd2VkIGluIERFUilcbiAgICB3aGlsZSAodiA9PSBwYWQgJiYgKytzdGFydCA8IGVuZCkge1xuICAgICAgdiA9IHRoaXMuZ2V0KHN0YXJ0KTtcbiAgICB9XG4gICAgbGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5lZyA/IC0xIDogMDtcbiAgICB9XG4gICAgLy8gc2hvdyBiaXQgbGVuZ3RoIG9mIGh1Z2UgaW50ZWdlcnNcbiAgICBpZiAobGVuID4gNCkge1xuICAgICAgcyA9IHY7XG4gICAgICBsZW4gPDw9IDM7XG4gICAgICB3aGlsZSAoKCgrcyBeIHBhZCkgJiAweDgwKSA9PSAwKSB7XG4gICAgICAgIHMgPSArcyA8PCAxO1xuICAgICAgICAtLWxlbjtcbiAgICAgIH1cbiAgICAgIHMgPSBcIihcIiArIGxlbiArIFwiIGJpdClcXG5cIjtcbiAgICB9XG4gICAgLy8gZGVjb2RlIHRoZSBpbnRlZ2VyXG4gICAgaWYgKG5lZykge1xuICAgICAgdiA9IHYgLSAyNTY7XG4gICAgfVxuICAgIHZhciBuID0gbmV3IF9pbnQuSW50MTAodik7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0ICsgMTsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBuLm11bEFkZCgyNTYsIHRoaXMuZ2V0KGkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHMgKyBuLnRvU3RyaW5nKCk7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VCaXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgbWF4TGVuZ3RoKSB7XG4gICAgdmFyIHVudXNlZEJpdCA9IHRoaXMuZ2V0KHN0YXJ0KTtcbiAgICB2YXIgbGVuQml0ID0gKGVuZCAtIHN0YXJ0IC0gMSA8PCAzKSAtIHVudXNlZEJpdDtcbiAgICB2YXIgaW50cm8gPSBcIihcIiArIGxlbkJpdCArIFwiIGJpdClcXG5cIjtcbiAgICB2YXIgcyA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0ICsgMTsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB2YXIgYiA9IHRoaXMuZ2V0KGkpO1xuICAgICAgdmFyIHNraXAgPSBpID09IGVuZCAtIDEgPyB1bnVzZWRCaXQgOiAwO1xuICAgICAgZm9yICh2YXIgaiA9IDc7IGogPj0gc2tpcDsgLS1qKSB7XG4gICAgICAgIHMgKz0gYiA+PiBqICYgMSA/IFwiMVwiIDogXCIwXCI7XG4gICAgICB9XG4gICAgICBpZiAocy5sZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGludHJvICsgc3RyaW5nQ3V0KHMsIG1heExlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnRybyArIHM7XG4gIH07XG4gIFN0cmVhbS5wcm90b3R5cGUucGFyc2VPY3RldFN0cmluZyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBtYXhMZW5ndGgpIHtcbiAgICBpZiAodGhpcy5pc0FTQ0lJKHN0YXJ0LCBlbmQpKSB7XG4gICAgICByZXR1cm4gc3RyaW5nQ3V0KHRoaXMucGFyc2VTdHJpbmdJU08oc3RhcnQsIGVuZCksIG1heExlbmd0aCk7XG4gICAgfVxuICAgIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcbiAgICB2YXIgcyA9IFwiKFwiICsgbGVuICsgXCIgYnl0ZSlcXG5cIjtcbiAgICBtYXhMZW5ndGggLz0gMjsgLy8gd2Ugd29yayBpbiBieXRlc1xuICAgIGlmIChsZW4gPiBtYXhMZW5ndGgpIHtcbiAgICAgIGVuZCA9IHN0YXJ0ICsgbWF4TGVuZ3RoO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgcyArPSB0aGlzLmhleEJ5dGUodGhpcy5nZXQoaSkpO1xuICAgIH1cbiAgICBpZiAobGVuID4gbWF4TGVuZ3RoKSB7XG4gICAgICBzICs9IGVsbGlwc2lzO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgU3RyZWFtLnByb3RvdHlwZS5wYXJzZU9JRCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBtYXhMZW5ndGgpIHtcbiAgICB2YXIgcyA9IFwiXCI7XG4gICAgdmFyIG4gPSBuZXcgX2ludC5JbnQxMCgpO1xuICAgIHZhciBiaXRzID0gMDtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdmFyIHYgPSB0aGlzLmdldChpKTtcbiAgICAgIG4ubXVsQWRkKDEyOCwgdiAmIDB4N0YpO1xuICAgICAgYml0cyArPSA3O1xuICAgICAgaWYgKCEodiAmIDB4ODApKSB7XG4gICAgICAgIC8vIGZpbmlzaGVkXG4gICAgICAgIGlmIChzID09PSBcIlwiKSB7XG4gICAgICAgICAgbiA9IG4uc2ltcGxpZnkoKTtcbiAgICAgICAgICBpZiAobiBpbnN0YW5jZW9mIF9pbnQuSW50MTApIHtcbiAgICAgICAgICAgIG4uc3ViKDgwKTtcbiAgICAgICAgICAgIHMgPSBcIjIuXCIgKyBuLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtID0gbiA8IDgwID8gbiA8IDQwID8gMCA6IDEgOiAyO1xuICAgICAgICAgICAgcyA9IG0gKyBcIi5cIiArIChuIC0gbSAqIDQwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcyArPSBcIi5cIiArIG4udG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5sZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gc3RyaW5nQ3V0KHMsIG1heExlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgbiA9IG5ldyBfaW50LkludDEwKCk7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYml0cyA+IDApIHtcbiAgICAgIHMgKz0gXCIuaW5jb21wbGV0ZVwiO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgcmV0dXJuIFN0cmVhbTtcbn0oKTtcbnZhciBBU04xID0gZXhwb3J0cy5BU04xID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQVNOMShzdHJlYW0sIGhlYWRlciwgbGVuZ3RoLCB0YWcsIHN1Yikge1xuICAgIGlmICghKHRhZyBpbnN0YW5jZW9mIEFTTjFUYWcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRhZyB2YWx1ZS5cIik7XG4gICAgfVxuICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xuICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuc3ViID0gc3ViO1xuICB9XG4gIEFTTjEucHJvdG90eXBlLnR5cGVOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHN3aXRjaCAodGhpcy50YWcudGFnQ2xhc3MpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gdW5pdmVyc2FsXG4gICAgICAgIHN3aXRjaCAodGhpcy50YWcudGFnTnVtYmVyKSB7XG4gICAgICAgICAgY2FzZSAweDAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiRU9DXCI7XG4gICAgICAgICAgY2FzZSAweDAxOlxuICAgICAgICAgICAgcmV0dXJuIFwiQk9PTEVBTlwiO1xuICAgICAgICAgIGNhc2UgMHgwMjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVEVHRVJcIjtcbiAgICAgICAgICBjYXNlIDB4MDM6XG4gICAgICAgICAgICByZXR1cm4gXCJCSVRfU1RSSU5HXCI7XG4gICAgICAgICAgY2FzZSAweDA0OlxuICAgICAgICAgICAgcmV0dXJuIFwiT0NURVRfU1RSSU5HXCI7XG4gICAgICAgICAgY2FzZSAweDA1OlxuICAgICAgICAgICAgcmV0dXJuIFwiTlVMTFwiO1xuICAgICAgICAgIGNhc2UgMHgwNjpcbiAgICAgICAgICAgIHJldHVybiBcIk9CSkVDVF9JREVOVElGSUVSXCI7XG4gICAgICAgICAgY2FzZSAweDA3OlxuICAgICAgICAgICAgcmV0dXJuIFwiT2JqZWN0RGVzY3JpcHRvclwiO1xuICAgICAgICAgIGNhc2UgMHgwODpcbiAgICAgICAgICAgIHJldHVybiBcIkVYVEVSTkFMXCI7XG4gICAgICAgICAgY2FzZSAweDA5OlxuICAgICAgICAgICAgcmV0dXJuIFwiUkVBTFwiO1xuICAgICAgICAgIGNhc2UgMHgwQTpcbiAgICAgICAgICAgIHJldHVybiBcIkVOVU1FUkFURURcIjtcbiAgICAgICAgICBjYXNlIDB4MEI6XG4gICAgICAgICAgICByZXR1cm4gXCJFTUJFRERFRF9QRFZcIjtcbiAgICAgICAgICBjYXNlIDB4MEM6XG4gICAgICAgICAgICByZXR1cm4gXCJVVEY4U3RyaW5nXCI7XG4gICAgICAgICAgY2FzZSAweDEwOlxuICAgICAgICAgICAgcmV0dXJuIFwiU0VRVUVOQ0VcIjtcbiAgICAgICAgICBjYXNlIDB4MTE6XG4gICAgICAgICAgICByZXR1cm4gXCJTRVRcIjtcbiAgICAgICAgICBjYXNlIDB4MTI6XG4gICAgICAgICAgICByZXR1cm4gXCJOdW1lcmljU3RyaW5nXCI7XG4gICAgICAgICAgY2FzZSAweDEzOlxuICAgICAgICAgICAgcmV0dXJuIFwiUHJpbnRhYmxlU3RyaW5nXCI7XG4gICAgICAgICAgLy8gQVNDSUkgc3Vic2V0XG4gICAgICAgICAgY2FzZSAweDE0OlxuICAgICAgICAgICAgcmV0dXJuIFwiVGVsZXRleFN0cmluZ1wiO1xuICAgICAgICAgIC8vIGFrYSBUNjFTdHJpbmdcbiAgICAgICAgICBjYXNlIDB4MTU6XG4gICAgICAgICAgICByZXR1cm4gXCJWaWRlb3RleFN0cmluZ1wiO1xuICAgICAgICAgIGNhc2UgMHgxNjpcbiAgICAgICAgICAgIHJldHVybiBcIklBNVN0cmluZ1wiO1xuICAgICAgICAgIC8vIEFTQ0lJXG4gICAgICAgICAgY2FzZSAweDE3OlxuICAgICAgICAgICAgcmV0dXJuIFwiVVRDVGltZVwiO1xuICAgICAgICAgIGNhc2UgMHgxODpcbiAgICAgICAgICAgIHJldHVybiBcIkdlbmVyYWxpemVkVGltZVwiO1xuICAgICAgICAgIGNhc2UgMHgxOTpcbiAgICAgICAgICAgIHJldHVybiBcIkdyYXBoaWNTdHJpbmdcIjtcbiAgICAgICAgICBjYXNlIDB4MUE6XG4gICAgICAgICAgICByZXR1cm4gXCJWaXNpYmxlU3RyaW5nXCI7XG4gICAgICAgICAgLy8gQVNDSUkgc3Vic2V0XG4gICAgICAgICAgY2FzZSAweDFCOlxuICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJhbFN0cmluZ1wiO1xuICAgICAgICAgIGNhc2UgMHgxQzpcbiAgICAgICAgICAgIHJldHVybiBcIlVuaXZlcnNhbFN0cmluZ1wiO1xuICAgICAgICAgIGNhc2UgMHgxRTpcbiAgICAgICAgICAgIHJldHVybiBcIkJNUFN0cmluZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlVuaXZlcnNhbF9cIiArIHRoaXMudGFnLnRhZ051bWJlci50b1N0cmluZygpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gXCJBcHBsaWNhdGlvbl9cIiArIHRoaXMudGFnLnRhZ051bWJlci50b1N0cmluZygpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gXCJbXCIgKyB0aGlzLnRhZy50YWdOdW1iZXIudG9TdHJpbmcoKSArIFwiXVwiO1xuICAgICAgLy8gQ29udGV4dFxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gXCJQcml2YXRlX1wiICsgdGhpcy50YWcudGFnTnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICB9O1xuICBBU04xLnByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24gKG1heExlbmd0aCkge1xuICAgIGlmICh0aGlzLnRhZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKG1heExlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXhMZW5ndGggPSBJbmZpbml0eTtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLnBvc0NvbnRlbnQoKTtcbiAgICB2YXIgbGVuID0gTWF0aC5hYnModGhpcy5sZW5ndGgpO1xuICAgIGlmICghdGhpcy50YWcuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgaWYgKHRoaXMuc3ViICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VPY3RldFN0cmluZyhjb250ZW50LCBjb250ZW50ICsgbGVuLCBtYXhMZW5ndGgpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMudGFnLnRhZ051bWJlcikge1xuICAgICAgY2FzZSAweDAxOlxuICAgICAgICAvLyBCT09MRUFOXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5nZXQoY29udGVudCkgPT09IDAgPyBcImZhbHNlXCIgOiBcInRydWVcIjtcbiAgICAgIGNhc2UgMHgwMjpcbiAgICAgICAgLy8gSU5URUdFUlxuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VJbnRlZ2VyKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pO1xuICAgICAgY2FzZSAweDAzOlxuICAgICAgICAvLyBCSVRfU1RSSU5HXG4gICAgICAgIHJldHVybiB0aGlzLnN1YiA/IFwiKFwiICsgdGhpcy5zdWIubGVuZ3RoICsgXCIgZWxlbSlcIiA6IHRoaXMuc3RyZWFtLnBhcnNlQml0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4sIG1heExlbmd0aCk7XG4gICAgICBjYXNlIDB4MDQ6XG4gICAgICAgIC8vIE9DVEVUX1NUUklOR1xuICAgICAgICByZXR1cm4gdGhpcy5zdWIgPyBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCIgOiB0aGlzLnN0cmVhbS5wYXJzZU9jdGV0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4sIG1heExlbmd0aCk7XG4gICAgICAvLyBjYXNlIDB4MDU6IC8vIE5VTExcbiAgICAgIGNhc2UgMHgwNjpcbiAgICAgICAgLy8gT0JKRUNUX0lERU5USUZJRVJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBhcnNlT0lEKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4sIG1heExlbmd0aCk7XG4gICAgICAvLyBjYXNlIDB4MDc6IC8vIE9iamVjdERlc2NyaXB0b3JcbiAgICAgIC8vIGNhc2UgMHgwODogLy8gRVhURVJOQUxcbiAgICAgIC8vIGNhc2UgMHgwOTogLy8gUkVBTFxuICAgICAgLy8gY2FzZSAweDBBOiAvLyBFTlVNRVJBVEVEXG4gICAgICAvLyBjYXNlIDB4MEI6IC8vIEVNQkVEREVEX1BEVlxuICAgICAgY2FzZSAweDEwOiAvLyBTRVFVRU5DRVxuICAgICAgY2FzZSAweDExOlxuICAgICAgICAvLyBTRVRcbiAgICAgICAgaWYgKHRoaXMuc3ViICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFwiKFwiICsgdGhpcy5zdWIubGVuZ3RoICsgXCIgZWxlbSlcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCIobm8gZWxlbSlcIjtcbiAgICAgICAgfVxuICAgICAgY2FzZSAweDBDOlxuICAgICAgICAvLyBVVEY4U3RyaW5nXG4gICAgICAgIHJldHVybiBzdHJpbmdDdXQodGhpcy5zdHJlYW0ucGFyc2VTdHJpbmdVVEYoY29udGVudCwgY29udGVudCArIGxlbiksIG1heExlbmd0aCk7XG4gICAgICBjYXNlIDB4MTI6IC8vIE51bWVyaWNTdHJpbmdcbiAgICAgIGNhc2UgMHgxMzogLy8gUHJpbnRhYmxlU3RyaW5nXG4gICAgICBjYXNlIDB4MTQ6IC8vIFRlbGV0ZXhTdHJpbmdcbiAgICAgIGNhc2UgMHgxNTogLy8gVmlkZW90ZXhTdHJpbmdcbiAgICAgIGNhc2UgMHgxNjogLy8gSUE1U3RyaW5nXG4gICAgICAvLyBjYXNlIDB4MTk6IC8vIEdyYXBoaWNTdHJpbmdcbiAgICAgIGNhc2UgMHgxQTpcbiAgICAgICAgLy8gVmlzaWJsZVN0cmluZ1xuICAgICAgICAvLyBjYXNlIDB4MUI6IC8vIEdlbmVyYWxTdHJpbmdcbiAgICAgICAgLy8gY2FzZSAweDFDOiAvLyBVbml2ZXJzYWxTdHJpbmdcbiAgICAgICAgcmV0dXJuIHN0cmluZ0N1dCh0aGlzLnN0cmVhbS5wYXJzZVN0cmluZ0lTTyhjb250ZW50LCBjb250ZW50ICsgbGVuKSwgbWF4TGVuZ3RoKTtcbiAgICAgIGNhc2UgMHgxRTpcbiAgICAgICAgLy8gQk1QU3RyaW5nXG4gICAgICAgIHJldHVybiBzdHJpbmdDdXQodGhpcy5zdHJlYW0ucGFyc2VTdHJpbmdCTVAoY29udGVudCwgY29udGVudCArIGxlbiksIG1heExlbmd0aCk7XG4gICAgICBjYXNlIDB4MTc6IC8vIFVUQ1RpbWVcbiAgICAgIGNhc2UgMHgxODpcbiAgICAgICAgLy8gR2VuZXJhbGl6ZWRUaW1lXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZVRpbWUoY29udGVudCwgY29udGVudCArIGxlbiwgdGhpcy50YWcudGFnTnVtYmVyID09IDB4MTcpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgQVNOMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZU5hbWUoKSArIFwiQFwiICsgdGhpcy5zdHJlYW0ucG9zICsgXCJbaGVhZGVyOlwiICsgdGhpcy5oZWFkZXIgKyBcIixsZW5ndGg6XCIgKyB0aGlzLmxlbmd0aCArIFwiLHN1YjpcIiArICh0aGlzLnN1YiA9PT0gbnVsbCA/IFwibnVsbFwiIDogdGhpcy5zdWIubGVuZ3RoKSArIFwiXVwiO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS50b1ByZXR0eVN0cmluZyA9IGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICBpZiAoaW5kZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGluZGVudCA9IFwiXCI7XG4gICAgfVxuICAgIHZhciBzID0gaW5kZW50ICsgdGhpcy50eXBlTmFtZSgpICsgXCIgQFwiICsgdGhpcy5zdHJlYW0ucG9zO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+PSAwKSB7XG4gICAgICBzICs9IFwiK1wiO1xuICAgIH1cbiAgICBzICs9IHRoaXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLnRhZy50YWdDb25zdHJ1Y3RlZCkge1xuICAgICAgcyArPSBcIiAoY29uc3RydWN0ZWQpXCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRhZy5pc1VuaXZlcnNhbCgpICYmICh0aGlzLnRhZy50YWdOdW1iZXIgPT0gMHgwMyB8fCB0aGlzLnRhZy50YWdOdW1iZXIgPT0gMHgwNCkgJiYgdGhpcy5zdWIgIT09IG51bGwpIHtcbiAgICAgIHMgKz0gXCIgKGVuY2Fwc3VsYXRlcylcIjtcbiAgICB9XG4gICAgcyArPSBcIlxcblwiO1xuICAgIGlmICh0aGlzLnN1YiAhPT0gbnVsbCkge1xuICAgICAgaW5kZW50ICs9IFwiICBcIjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSB0aGlzLnN1Yi5sZW5ndGg7IGkgPCBtYXg7ICsraSkge1xuICAgICAgICBzICs9IHRoaXMuc3ViW2ldLnRvUHJldHR5U3RyaW5nKGluZGVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS5wb3NTdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJlYW0ucG9zO1xuICB9O1xuICBBU04xLnByb3RvdHlwZS5wb3NDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmVhbS5wb3MgKyB0aGlzLmhlYWRlcjtcbiAgfTtcbiAgQVNOMS5wcm90b3R5cGUucG9zRW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0cmVhbS5wb3MgKyB0aGlzLmhlYWRlciArIE1hdGguYWJzKHRoaXMubGVuZ3RoKTtcbiAgfTtcbiAgQVNOMS5wcm90b3R5cGUudG9IZXhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWFtLmhleER1bXAodGhpcy5wb3NTdGFydCgpLCB0aGlzLnBvc0VuZCgpLCB0cnVlKTtcbiAgfTtcbiAgQVNOMS5kZWNvZGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdmFyIGJ1ZiA9IHN0cmVhbS5nZXQoKTtcbiAgICB2YXIgbGVuID0gYnVmICYgMHg3RjtcbiAgICBpZiAobGVuID09IGJ1Zikge1xuICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG4gICAgLy8gbm8gcmVhc29uIHRvIHVzZSBJbnQxMCwgYXMgaXQgd291bGQgYmUgYSBodWdlIGJ1ZmZlciBhbnl3YXlzXG4gICAgaWYgKGxlbiA+IDYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCBvdmVyIDQ4IGJpdHMgbm90IHN1cHBvcnRlZCBhdCBwb3NpdGlvbiBcIiArIChzdHJlYW0ucG9zIC0gMSkpO1xuICAgIH1cbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IC8vIHVuZGVmaW5lZFxuICAgIGJ1ZiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgYnVmID0gYnVmICogMjU2ICsgc3RyZWFtLmdldCgpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9O1xuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGhleGFkZWNpbWFsIHZhbHVlIChhcyBhIHN0cmluZykgb2YgdGhlIGN1cnJlbnQgQVNOLjEgZWxlbWVudFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBBU04xLnByb3RvdHlwZS5nZXRIZXhTdHJpbmdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGV4U3RyaW5nID0gdGhpcy50b0hleFN0cmluZygpO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLmhlYWRlciAqIDI7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoICogMjtcbiAgICByZXR1cm4gaGV4U3RyaW5nLnN1YnN0cihvZmZzZXQsIGxlbmd0aCk7XG4gIH07XG4gIEFTTjEuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBzdHJlYW07XG4gICAgaWYgKCEoc3RyIGluc3RhbmNlb2YgU3RyZWFtKSkge1xuICAgICAgc3RyZWFtID0gbmV3IFN0cmVhbShzdHIsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJlYW0gPSBzdHI7XG4gICAgfVxuICAgIHZhciBzdHJlYW1TdGFydCA9IG5ldyBTdHJlYW0oc3RyZWFtKTtcbiAgICB2YXIgdGFnID0gbmV3IEFTTjFUYWcoc3RyZWFtKTtcbiAgICB2YXIgbGVuID0gQVNOMS5kZWNvZGVMZW5ndGgoc3RyZWFtKTtcbiAgICB2YXIgc3RhcnQgPSBzdHJlYW0ucG9zO1xuICAgIHZhciBoZWFkZXIgPSBzdGFydCAtIHN0cmVhbVN0YXJ0LnBvcztcbiAgICB2YXIgc3ViID0gbnVsbDtcbiAgICB2YXIgZ2V0U3ViID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgaWYgKGxlbiAhPT0gbnVsbCkge1xuICAgICAgICAvLyBkZWZpbml0ZSBsZW5ndGhcbiAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuO1xuICAgICAgICB3aGlsZSAoc3RyZWFtLnBvcyA8IGVuZCkge1xuICAgICAgICAgIHJldFtyZXQubGVuZ3RoXSA9IEFTTjEuZGVjb2RlKHN0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmVhbS5wb3MgIT0gZW5kKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29udGVudCBzaXplIGlzIG5vdCBjb3JyZWN0IGZvciBjb250YWluZXIgc3RhcnRpbmcgYXQgb2Zmc2V0IFwiICsgc3RhcnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1bmRlZmluZWQgbGVuZ3RoXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgdmFyIHMgPSBBU04xLmRlY29kZShzdHJlYW0pO1xuICAgICAgICAgICAgaWYgKHMudGFnLmlzRU9DKCkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRbcmV0Lmxlbmd0aF0gPSBzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW4gPSBzdGFydCAtIHN0cmVhbS5wb3M7IC8vIHVuZGVmaW5lZCBsZW5ndGhzIGFyZSByZXByZXNlbnRlZCBhcyBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4Y2VwdGlvbiB3aGlsZSBkZWNvZGluZyB1bmRlZmluZWQgbGVuZ3RoIGNvbnRlbnQ6IFwiICsgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICBpZiAodGFnLnRhZ0NvbnN0cnVjdGVkKSB7XG4gICAgICAvLyBtdXN0IGhhdmUgdmFsaWQgY29udGVudFxuICAgICAgc3ViID0gZ2V0U3ViKCk7XG4gICAgfSBlbHNlIGlmICh0YWcuaXNVbml2ZXJzYWwoKSAmJiAodGFnLnRhZ051bWJlciA9PSAweDAzIHx8IHRhZy50YWdOdW1iZXIgPT0gMHgwNCkpIHtcbiAgICAgIC8vIHNvbWV0aW1lcyBCaXRTdHJpbmcgYW5kIE9jdGV0U3RyaW5nIGFyZSB1c2VkIHRvIGVuY2Fwc3VsYXRlIEFTTi4xXG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGFnLnRhZ051bWJlciA9PSAweDAzKSB7XG4gICAgICAgICAgaWYgKHN0cmVhbS5nZXQoKSAhPSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCSVQgU1RSSU5HcyB3aXRoIHVudXNlZCBiaXRzIGNhbm5vdCBlbmNhcHN1bGF0ZS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1YiA9IGdldFN1YigpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Yi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGlmIChzdWJbaV0udGFnLmlzRU9DKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVPQyBpcyBub3Qgc3VwcG9zZWQgdG8gYmUgYWN0dWFsIGNvbnRlbnQuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBidXQgc2lsZW50bHkgaWdub3JlIHdoZW4gdGhleSBkb24ndFxuICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3ViID09PSBudWxsKSB7XG4gICAgICBpZiAobGVuID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlIGNhbid0IHNraXAgb3ZlciBhbiBpbnZhbGlkIHRhZyB3aXRoIHVuZGVmaW5lZCBsZW5ndGggYXQgb2Zmc2V0IFwiICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgc3RyZWFtLnBvcyA9IHN0YXJ0ICsgTWF0aC5hYnMobGVuKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBU04xKHN0cmVhbVN0YXJ0LCBoZWFkZXIsIGxlbiwgdGFnLCBzdWIpO1xuICB9O1xuICByZXR1cm4gQVNOMTtcbn0oKTtcbnZhciBBU04xVGFnID0gZXhwb3J0cy5BU04xVGFnID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQVNOMVRhZyhzdHJlYW0pIHtcbiAgICB2YXIgYnVmID0gc3RyZWFtLmdldCgpO1xuICAgIHRoaXMudGFnQ2xhc3MgPSBidWYgPj4gNjtcbiAgICB0aGlzLnRhZ0NvbnN0cnVjdGVkID0gKGJ1ZiAmIDB4MjApICE9PSAwO1xuICAgIHRoaXMudGFnTnVtYmVyID0gYnVmICYgMHgxRjtcbiAgICBpZiAodGhpcy50YWdOdW1iZXIgPT0gMHgxRikge1xuICAgICAgLy8gbG9uZyB0YWdcbiAgICAgIHZhciBuID0gbmV3IF9pbnQuSW50MTAoKTtcbiAgICAgIGRvIHtcbiAgICAgICAgYnVmID0gc3RyZWFtLmdldCgpO1xuICAgICAgICBuLm11bEFkZCgxMjgsIGJ1ZiAmIDB4N0YpO1xuICAgICAgfSB3aGlsZSAoYnVmICYgMHg4MCk7XG4gICAgICB0aGlzLnRhZ051bWJlciA9IG4uc2ltcGxpZnkoKTtcbiAgICB9XG4gIH1cbiAgQVNOMVRhZy5wcm90b3R5cGUuaXNVbml2ZXJzYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFnQ2xhc3MgPT09IDB4MDA7XG4gIH07XG4gIEFTTjFUYWcucHJvdG90eXBlLmlzRU9DID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRhZ0NsYXNzID09PSAweDAwICYmIHRoaXMudGFnTnVtYmVyID09PSAweDAwO1xuICB9O1xuICByZXR1cm4gQVNOMVRhZztcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQmFzZTY0ID0gdm9pZCAwO1xuLy8gQmFzZTY0IEphdmFTY3JpcHQgZGVjb2RlclxuLy8gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTMgTGFwbyBMdWNoaW5pIDxsYXBvQGxhcG8uaXQ+XG4vLyBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbi8vIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbi8vIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVNcbi8vIFdJVEggUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SXG4vLyBBTlkgU1BFQ0lBTCwgRElSRUNULCBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTXG4vLyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GXG4vLyBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCBpbW1lZDogdHJ1ZSwgbGF0ZWRlZjogdHJ1ZSwgdW5kZWY6IHRydWUsIHJlZ2V4ZGFzaDogZmFsc2UgKi9cbnZhciBkZWNvZGVyO1xudmFyIEJhc2U2NCA9IGV4cG9ydHMuQmFzZTY0ID0ge1xuICBkZWNvZGU6IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGk7XG4gICAgaWYgKGRlY29kZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGI2NCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuICAgICAgdmFyIGlnbm9yZSA9IFwiPSBcXGZcXG5cXHJcXHRcXHUwMEEwXFx1MjAyOFxcdTIwMjlcIjtcbiAgICAgIGRlY29kZXIgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IDY0OyArK2kpIHtcbiAgICAgICAgZGVjb2RlcltiNjQuY2hhckF0KGkpXSA9IGk7XG4gICAgICB9XG4gICAgICBkZWNvZGVyWyctJ10gPSA2MjsgLy8rXG4gICAgICBkZWNvZGVyWydfJ10gPSA2MzsgLy8tXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWdub3JlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRlY29kZXJbaWdub3JlLmNoYXJBdChpKV0gPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIHZhciBiaXRzID0gMDtcbiAgICB2YXIgY2hhcl9jb3VudCA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBjID0gYS5jaGFyQXQoaSk7XG4gICAgICBpZiAoYyA9PSBcIj1cIikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGMgPSBkZWNvZGVyW2NdO1xuICAgICAgaWYgKGMgPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgY2hhcmFjdGVyIGF0IG9mZnNldCBcIiArIGkpO1xuICAgICAgfVxuICAgICAgYml0cyB8PSBjO1xuICAgICAgaWYgKCsrY2hhcl9jb3VudCA+PSA0KSB7XG4gICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGJpdHMgPj4gMTY7XG4gICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGJpdHMgPj4gOCAmIDB4RkY7XG4gICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGJpdHMgJiAweEZGO1xuICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgY2hhcl9jb3VudCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiaXRzIDw8PSA2O1xuICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKGNoYXJfY291bnQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFzZTY0IGVuY29kaW5nIGluY29tcGxldGU6IGF0IGxlYXN0IDIgYml0cyBtaXNzaW5nXCIpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSBiaXRzID4+IDEwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyA+PiAxNjtcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyA+PiA4ICYgMHhGRjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH0sXG4gIHJlOiAvLS0tLS1CRUdJTiBbXi1dKy0tLS0tKFtBLVphLXowLTkrXFwvPVxcc10rKS0tLS0tRU5EIFteLV0rLS0tLS18YmVnaW4tYmFzZTY0W15cXG5dK1xcbihbQS1aYS16MC05K1xcLz1cXHNdKyk9PT09LyxcbiAgdW5hcm1vcjogZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgbSA9IEJhc2U2NC5yZS5leGVjKGEpO1xuICAgIGlmIChtKSB7XG4gICAgICBpZiAobVsxXSkge1xuICAgICAgICBhID0gbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAobVsyXSkge1xuICAgICAgICBhID0gbVsyXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ0V4cCBvdXQgb2Ygc3luY1wiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEJhc2U2NC5kZWNvZGUoYSk7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkhleCA9IHZvaWQgMDtcbi8vIEhleCBKYXZhU2NyaXB0IGRlY29kZXJcbi8vIENvcHlyaWdodCAoYykgMjAwOC0yMDEzIExhcG8gTHVjaGluaSA8bGFwb0BsYXBvLml0PlxuLy8gUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4vLyBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQsIHByb3ZpZGVkIHRoYXQgdGhlIGFib3ZlXG4vLyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIGFwcGVhciBpbiBhbGwgY29waWVzLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTXG4vLyBXSVRIIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUlxuLy8gQU5ZIFNQRUNJQUwsIERJUkVDVCwgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFU1xuLy8gV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTSBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1IgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRlxuLy8gT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1IgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgaW1tZWQ6IHRydWUsIGxhdGVkZWY6IHRydWUsIHVuZGVmOiB0cnVlLCByZWdleGRhc2g6IGZhbHNlICovXG52YXIgZGVjb2RlcjtcbnZhciBIZXggPSBleHBvcnRzLkhleCA9IHtcbiAgZGVjb2RlOiBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBpO1xuICAgIGlmIChkZWNvZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBoZXggPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICAgIHZhciBpZ25vcmUgPSBcIiBcXGZcXG5cXHJcXHRcXHUwMEEwXFx1MjAyOFxcdTIwMjlcIjtcbiAgICAgIGRlY29kZXIgPSB7fTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICAgIGRlY29kZXJbaGV4LmNoYXJBdChpKV0gPSBpO1xuICAgICAgfVxuICAgICAgaGV4ID0gaGV4LnRvTG93ZXJDYXNlKCk7XG4gICAgICBmb3IgKGkgPSAxMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgZGVjb2RlcltoZXguY2hhckF0KGkpXSA9IGk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaWdub3JlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRlY29kZXJbaWdub3JlLmNoYXJBdChpKV0gPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIHZhciBiaXRzID0gMDtcbiAgICB2YXIgY2hhcl9jb3VudCA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBjID0gYS5jaGFyQXQoaSk7XG4gICAgICBpZiAoYyA9PSBcIj1cIikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGMgPSBkZWNvZGVyW2NdO1xuICAgICAgaWYgKGMgPT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgY2hhcmFjdGVyIGF0IG9mZnNldCBcIiArIGkpO1xuICAgICAgfVxuICAgICAgYml0cyB8PSBjO1xuICAgICAgaWYgKCsrY2hhcl9jb3VudCA+PSAyKSB7XG4gICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGJpdHM7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICBjaGFyX2NvdW50ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpdHMgPDw9IDQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFyX2NvdW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZXggZW5jb2RpbmcgaW5jb21wbGV0ZTogNCBiaXRzIG1pc3NpbmdcIik7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkludDEwID0gdm9pZCAwO1xuLy8gQmlnIGludGVnZXIgYmFzZS0xMCBwcmludGluZyBsaWJyYXJ5XG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQgTGFwbyBMdWNoaW5pIDxsYXBvQGxhcG8uaXQ+XG4vLyBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbi8vIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbi8vIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVNcbi8vIFdJVEggUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SXG4vLyBBTlkgU1BFQ0lBTCwgRElSRUNULCBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTXG4vLyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GXG4vLyBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCBpbW1lZDogdHJ1ZSwgbGF0ZWRlZjogdHJ1ZSwgdW5kZWY6IHRydWUsIHJlZ2V4ZGFzaDogZmFsc2UgKi9cbnZhciBtYXggPSAxMDAwMDAwMDAwMDAwMDsgLy8gYmlnZ2VzdCBpbnRlZ2VyIHRoYXQgY2FuIHN0aWxsIGZpdCAyXjUzIHdoZW4gbXVsdGlwbGllZCBieSAyNTZcbnZhciBJbnQxMCA9IGV4cG9ydHMuSW50MTAgPSAvKiogQGNsYXNzICovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJbnQxMCh2YWx1ZSkge1xuICAgIHRoaXMuYnVmID0gWyt2YWx1ZSB8fCAwXTtcbiAgfVxuICBJbnQxMC5wcm90b3R5cGUubXVsQWRkID0gZnVuY3Rpb24gKG0sIGMpIHtcbiAgICAvLyBhc3NlcnQobSA8PSAyNTYpXG4gICAgdmFyIGIgPSB0aGlzLmJ1ZjtcbiAgICB2YXIgbCA9IGIubGVuZ3RoO1xuICAgIHZhciBpO1xuICAgIHZhciB0O1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgIHQgPSBiW2ldICogbSArIGM7XG4gICAgICBpZiAodCA8IG1heCkge1xuICAgICAgICBjID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMgPSAwIHwgdCAvIG1heDtcbiAgICAgICAgdCAtPSBjICogbWF4O1xuICAgICAgfVxuICAgICAgYltpXSA9IHQ7XG4gICAgfVxuICAgIGlmIChjID4gMCkge1xuICAgICAgYltpXSA9IGM7XG4gICAgfVxuICB9O1xuICBJbnQxMC5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKGMpIHtcbiAgICAvLyBhc3NlcnQobSA8PSAyNTYpXG4gICAgdmFyIGIgPSB0aGlzLmJ1ZjtcbiAgICB2YXIgbCA9IGIubGVuZ3RoO1xuICAgIHZhciBpO1xuICAgIHZhciB0O1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgIHQgPSBiW2ldIC0gYztcbiAgICAgIGlmICh0IDwgMCkge1xuICAgICAgICB0ICs9IG1heDtcbiAgICAgICAgYyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjID0gMDtcbiAgICAgIH1cbiAgICAgIGJbaV0gPSB0O1xuICAgIH1cbiAgICB3aGlsZSAoYltiLmxlbmd0aCAtIDFdID09PSAwKSB7XG4gICAgICBiLnBvcCgpO1xuICAgIH1cbiAgfTtcbiAgSW50MTAucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGJhc2UpIHtcbiAgICBpZiAoKGJhc2UgfHwgMTApICE9IDEwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IGJhc2UgMTAgaXMgc3VwcG9ydGVkXCIpO1xuICAgIH1cbiAgICB2YXIgYiA9IHRoaXMuYnVmO1xuICAgIHZhciBzID0gYltiLmxlbmd0aCAtIDFdLnRvU3RyaW5nKCk7XG4gICAgZm9yICh2YXIgaSA9IGIubGVuZ3RoIC0gMjsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHMgKz0gKG1heCArIGJbaV0pLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgSW50MTAucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGIgPSB0aGlzLmJ1ZjtcbiAgICB2YXIgdiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IGIubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHYgPSB2ICogbWF4ICsgYltpXTtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH07XG4gIEludDEwLnByb3RvdHlwZS5zaW1wbGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYiA9IHRoaXMuYnVmO1xuICAgIHJldHVybiBiLmxlbmd0aCA9PSAxID8gYlswXSA6IHRoaXM7XG4gIH07XG4gIHJldHVybiBJbnQxMDtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYjY0dG9CQSA9IGI2NHRvQkE7XG5leHBvcnRzLmI2NHRvaGV4ID0gYjY0dG9oZXg7XG5leHBvcnRzLmhleDJiNjQgPSBoZXgyYjY0O1xudmFyIF91dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBiNjRtYXAgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbnZhciBiNjRwYWQgPSBcIj1cIjtcbmZ1bmN0aW9uIGhleDJiNjQoaCkge1xuICB2YXIgaTtcbiAgdmFyIGM7XG4gIHZhciByZXQgPSBcIlwiO1xuICBmb3IgKGkgPSAwOyBpICsgMyA8PSBoLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgYyA9IHBhcnNlSW50KGguc3Vic3RyaW5nKGksIGkgKyAzKSwgMTYpO1xuICAgIHJldCArPSBiNjRtYXAuY2hhckF0KGMgPj4gNikgKyBiNjRtYXAuY2hhckF0KGMgJiA2Myk7XG4gIH1cbiAgaWYgKGkgKyAxID09IGgubGVuZ3RoKSB7XG4gICAgYyA9IHBhcnNlSW50KGguc3Vic3RyaW5nKGksIGkgKyAxKSwgMTYpO1xuICAgIHJldCArPSBiNjRtYXAuY2hhckF0KGMgPDwgMik7XG4gIH0gZWxzZSBpZiAoaSArIDIgPT0gaC5sZW5ndGgpIHtcbiAgICBjID0gcGFyc2VJbnQoaC5zdWJzdHJpbmcoaSwgaSArIDIpLCAxNik7XG4gICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA+PiAyKSArIGI2NG1hcC5jaGFyQXQoKGMgJiAzKSA8PCA0KTtcbiAgfVxuICB3aGlsZSAoKHJldC5sZW5ndGggJiAzKSA+IDApIHtcbiAgICByZXQgKz0gYjY0cGFkO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4vLyBjb252ZXJ0IGEgYmFzZTY0IHN0cmluZyB0byBoZXhcbmZ1bmN0aW9uIGI2NHRvaGV4KHMpIHtcbiAgdmFyIHJldCA9IFwiXCI7XG4gIHZhciBpO1xuICB2YXIgayA9IDA7IC8vIGI2NCBzdGF0ZSwgMC0zXG4gIHZhciBzbG9wID0gMDtcbiAgZm9yIChpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAocy5jaGFyQXQoaSkgPT0gYjY0cGFkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIHYgPSBiNjRtYXAuaW5kZXhPZihzLmNoYXJBdChpKSk7XG4gICAgaWYgKHYgPCAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGsgPT0gMCkge1xuICAgICAgcmV0ICs9ICgwLCBfdXRpbC5pbnQyY2hhcikodiA+PiAyKTtcbiAgICAgIHNsb3AgPSB2ICYgMztcbiAgICAgIGsgPSAxO1xuICAgIH0gZWxzZSBpZiAoayA9PSAxKSB7XG4gICAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKShzbG9wIDw8IDIgfCB2ID4+IDQpO1xuICAgICAgc2xvcCA9IHYgJiAweGY7XG4gICAgICBrID0gMjtcbiAgICB9IGVsc2UgaWYgKGsgPT0gMikge1xuICAgICAgcmV0ICs9ICgwLCBfdXRpbC5pbnQyY2hhcikoc2xvcCk7XG4gICAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKSh2ID4+IDIpO1xuICAgICAgc2xvcCA9IHYgJiAzO1xuICAgICAgayA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCArPSAoMCwgX3V0aWwuaW50MmNoYXIpKHNsb3AgPDwgMiB8IHYgPj4gNCk7XG4gICAgICByZXQgKz0gKDAsIF91dGlsLmludDJjaGFyKSh2ICYgMHhmKTtcbiAgICAgIGsgPSAwO1xuICAgIH1cbiAgfVxuICBpZiAoayA9PSAxKSB7XG4gICAgcmV0ICs9ICgwLCBfdXRpbC5pbnQyY2hhcikoc2xvcCA8PCAyKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuLy8gY29udmVydCBhIGJhc2U2NCBzdHJpbmcgdG8gYSBieXRlL251bWJlciBhcnJheVxuZnVuY3Rpb24gYjY0dG9CQShzKSB7XG4gIC8vIHBpZ2d5YmFjayBvbiBiNjR0b2hleCBmb3Igbm93LCBvcHRpbWl6ZSBsYXRlclxuICB2YXIgaCA9IGI2NHRvaGV4KHMpO1xuICB2YXIgaTtcbiAgdmFyIGEgPSBbXTtcbiAgZm9yIChpID0gMDsgMiAqIGkgPCBoLmxlbmd0aDsgKytpKSB7XG4gICAgYVtpXSA9IHBhcnNlSW50KGguc3Vic3RyaW5nKDIgKiBpLCAyICogaSArIDIpLCAxNik7XG4gIH1cbiAgcmV0dXJuIGE7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkJpZ0ludGVnZXIgPSB2b2lkIDA7XG5leHBvcnRzLmludEF0ID0gaW50QXQ7XG5leHBvcnRzLm5iaSA9IG5iaTtcbmV4cG9ydHMubmJpdHMgPSBuYml0cztcbmV4cG9ydHMubmJ2ID0gbmJ2O1xuZXhwb3J0cy5wYXJzZUJpZ0ludCA9IHBhcnNlQmlnSW50O1xudmFyIF91dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8vIENvcHlyaWdodCAoYykgMjAwNSAgVG9tIFd1XG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU2VlIFwiTElDRU5TRVwiIGZvciBkZXRhaWxzLlxuLy8gQmFzaWMgSmF2YVNjcmlwdCBCTiBsaWJyYXJ5IC0gc3Vic2V0IHVzZWZ1bCBmb3IgUlNBIGVuY3J5cHRpb24uXG5cbi8vIEJpdHMgcGVyIGRpZ2l0XG52YXIgZGJpdHM7XG4vLyBKYXZhU2NyaXB0IGVuZ2luZSBhbmFseXNpc1xudmFyIGNhbmFyeSA9IDB4ZGVhZGJlZWZjYWZlO1xudmFyIGpfbG0gPSAoY2FuYXJ5ICYgMHhmZmZmZmYpID09IDB4ZWZjYWZlO1xuLy8jcmVnaW9uXG52YXIgbG93cHJpbWVzID0gWzIsIDMsIDUsIDcsIDExLCAxMywgMTcsIDE5LCAyMywgMjksIDMxLCAzNywgNDEsIDQzLCA0NywgNTMsIDU5LCA2MSwgNjcsIDcxLCA3MywgNzksIDgzLCA4OSwgOTcsIDEwMSwgMTAzLCAxMDcsIDEwOSwgMTEzLCAxMjcsIDEzMSwgMTM3LCAxMzksIDE0OSwgMTUxLCAxNTcsIDE2MywgMTY3LCAxNzMsIDE3OSwgMTgxLCAxOTEsIDE5MywgMTk3LCAxOTksIDIxMSwgMjIzLCAyMjcsIDIyOSwgMjMzLCAyMzksIDI0MSwgMjUxLCAyNTcsIDI2MywgMjY5LCAyNzEsIDI3NywgMjgxLCAyODMsIDI5MywgMzA3LCAzMTEsIDMxMywgMzE3LCAzMzEsIDMzNywgMzQ3LCAzNDksIDM1MywgMzU5LCAzNjcsIDM3MywgMzc5LCAzODMsIDM4OSwgMzk3LCA0MDEsIDQwOSwgNDE5LCA0MjEsIDQzMSwgNDMzLCA0MzksIDQ0MywgNDQ5LCA0NTcsIDQ2MSwgNDYzLCA0NjcsIDQ3OSwgNDg3LCA0OTEsIDQ5OSwgNTAzLCA1MDksIDUyMSwgNTIzLCA1NDEsIDU0NywgNTU3LCA1NjMsIDU2OSwgNTcxLCA1NzcsIDU4NywgNTkzLCA1OTksIDYwMSwgNjA3LCA2MTMsIDYxNywgNjE5LCA2MzEsIDY0MSwgNjQzLCA2NDcsIDY1MywgNjU5LCA2NjEsIDY3MywgNjc3LCA2ODMsIDY5MSwgNzAxLCA3MDksIDcxOSwgNzI3LCA3MzMsIDczOSwgNzQzLCA3NTEsIDc1NywgNzYxLCA3NjksIDc3MywgNzg3LCA3OTcsIDgwOSwgODExLCA4MjEsIDgyMywgODI3LCA4MjksIDgzOSwgODUzLCA4NTcsIDg1OSwgODYzLCA4NzcsIDg4MSwgODgzLCA4ODcsIDkwNywgOTExLCA5MTksIDkyOSwgOTM3LCA5NDEsIDk0NywgOTUzLCA5NjcsIDk3MSwgOTc3LCA5ODMsIDk5MSwgOTk3XTtcbnZhciBscGxpbSA9ICgxIDw8IDI2KSAvIGxvd3ByaW1lc1tsb3dwcmltZXMubGVuZ3RoIC0gMV07XG4vLyNlbmRyZWdpb25cbi8vIChwdWJsaWMpIENvbnN0cnVjdG9yXG52YXIgQmlnSW50ZWdlciA9IGV4cG9ydHMuQmlnSW50ZWdlciA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJpZ0ludGVnZXIoYSwgYiwgYykge1xuICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgIGlmIChcIm51bWJlclwiID09IHR5cGVvZiBhKSB7XG4gICAgICAgIHRoaXMuZnJvbU51bWJlcihhLCBiLCBjKTtcbiAgICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsICYmIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEpIHtcbiAgICAgICAgdGhpcy5mcm9tU3RyaW5nKGEsIDI1Nik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZyb21TdHJpbmcoYSwgYik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vI3JlZ2lvbiBQVUJMSUNcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUudG9TdHJpbmcgPSBiblRvU3RyaW5nO1xuICAvLyAocHVibGljKSByZXR1cm4gc3RyaW5nIHJlcHJlc2VudGF0aW9uIGluIGdpdmVuIHJhZGl4XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGIpIHtcbiAgICBpZiAodGhpcy5zIDwgMCkge1xuICAgICAgcmV0dXJuIFwiLVwiICsgdGhpcy5uZWdhdGUoKS50b1N0cmluZyhiKTtcbiAgICB9XG4gICAgdmFyIGs7XG4gICAgaWYgKGIgPT0gMTYpIHtcbiAgICAgIGsgPSA0O1xuICAgIH0gZWxzZSBpZiAoYiA9PSA4KSB7XG4gICAgICBrID0gMztcbiAgICB9IGVsc2UgaWYgKGIgPT0gMikge1xuICAgICAgayA9IDE7XG4gICAgfSBlbHNlIGlmIChiID09IDMyKSB7XG4gICAgICBrID0gNTtcbiAgICB9IGVsc2UgaWYgKGIgPT0gNCkge1xuICAgICAgayA9IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRvUmFkaXgoYik7XG4gICAgfVxuICAgIHZhciBrbSA9ICgxIDw8IGspIC0gMTtcbiAgICB2YXIgZDtcbiAgICB2YXIgbSA9IGZhbHNlO1xuICAgIHZhciByID0gXCJcIjtcbiAgICB2YXIgaSA9IHRoaXMudDtcbiAgICB2YXIgcCA9IHRoaXMuREIgLSBpICogdGhpcy5EQiAlIGs7XG4gICAgaWYgKGktLSA+IDApIHtcbiAgICAgIGlmIChwIDwgdGhpcy5EQiAmJiAoZCA9IHRoaXNbaV0gPj4gcCkgPiAwKSB7XG4gICAgICAgIG0gPSB0cnVlO1xuICAgICAgICByID0gKDAsIF91dGlsLmludDJjaGFyKShkKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgaWYgKHAgPCBrKSB7XG4gICAgICAgICAgZCA9ICh0aGlzW2ldICYgKDEgPDwgcCkgLSAxKSA8PCBrIC0gcDtcbiAgICAgICAgICBkIHw9IHRoaXNbLS1pXSA+PiAocCArPSB0aGlzLkRCIC0gayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZCA9IHRoaXNbaV0gPj4gKHAgLT0gaykgJiBrbTtcbiAgICAgICAgICBpZiAocCA8PSAwKSB7XG4gICAgICAgICAgICBwICs9IHRoaXMuREI7XG4gICAgICAgICAgICAtLWk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgIG0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgciArPSAoMCwgX3V0aWwuaW50MmNoYXIpKGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtID8gciA6IFwiMFwiO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGUgPSBibk5lZ2F0ZTtcbiAgLy8gKHB1YmxpYykgLXRoaXNcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubmVnYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHRoaXMsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hYnMgPSBibkFicztcbiAgLy8gKHB1YmxpYykgfHRoaXN8XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFicyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zIDwgMCA/IHRoaXMubmVnYXRlKCkgOiB0aGlzO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlVG8gPSBibkNvbXBhcmVUbztcbiAgLy8gKHB1YmxpYykgcmV0dXJuICsgaWYgdGhpcyA+IGEsIC0gaWYgdGhpcyA8IGEsIDAgaWYgZXF1YWxcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY29tcGFyZVRvID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IHRoaXMucyAtIGEucztcbiAgICBpZiAociAhPSAwKSB7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLnQ7XG4gICAgciA9IGkgLSBhLnQ7XG4gICAgaWYgKHIgIT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucyA8IDAgPyAtciA6IHI7XG4gICAgfVxuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgaWYgKChyID0gdGhpc1tpXSAtIGFbaV0pICE9IDApIHtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRMZW5ndGggPSBibkJpdExlbmd0aDtcbiAgLy8gKHB1YmxpYykgcmV0dXJuIHRoZSBudW1iZXIgb2YgYml0cyBpbiBcInRoaXNcIlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudCA8PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuREIgKiAodGhpcy50IC0gMSkgKyBuYml0cyh0aGlzW3RoaXMudCAtIDFdIF4gdGhpcy5zICYgdGhpcy5ETSk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZCA9IGJuTW9kO1xuICAvLyAocHVibGljKSB0aGlzIG1vZCBhXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmFicygpLmRpdlJlbVRvKGEsIG51bGwsIHIpO1xuICAgIGlmICh0aGlzLnMgPCAwICYmIHIuY29tcGFyZVRvKEJpZ0ludGVnZXIuWkVSTykgPiAwKSB7XG4gICAgICBhLnN1YlRvKHIsIHIpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93SW50ID0gYm5Nb2RQb3dJbnQ7XG4gIC8vIChwdWJsaWMpIHRoaXNeZSAlIG0sIDAgPD0gZSA8IDJeMzJcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kUG93SW50ID0gZnVuY3Rpb24gKGUsIG0pIHtcbiAgICB2YXIgejtcbiAgICBpZiAoZSA8IDI1NiB8fCBtLmlzRXZlbigpKSB7XG4gICAgICB6ID0gbmV3IENsYXNzaWMobSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHogPSBuZXcgTW9udGdvbWVyeShtKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZXhwKGUsIHopO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbG9uZSA9IGJuQ2xvbmU7XG4gIC8vIChwdWJsaWMpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5jb3B5VG8ocik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmludFZhbHVlID0gYm5JbnRWYWx1ZTtcbiAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIGludGVnZXJcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuaW50VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucyA8IDApIHtcbiAgICAgIGlmICh0aGlzLnQgPT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpc1swXSAtIHRoaXMuRFY7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudCA9PSAwKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMudCA9PSAxKSB7XG4gICAgICByZXR1cm4gdGhpc1swXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudCA9PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgLy8gYXNzdW1lcyAxNiA8IERCIDwgMzJcbiAgICByZXR1cm4gKHRoaXNbMV0gJiAoMSA8PCAzMiAtIHRoaXMuREIpIC0gMSkgPDwgdGhpcy5EQiB8IHRoaXNbMF07XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmJ5dGVWYWx1ZSA9IGJuQnl0ZVZhbHVlO1xuICAvLyAocHVibGljKSByZXR1cm4gdmFsdWUgYXMgYnl0ZVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5ieXRlVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudCA9PSAwID8gdGhpcy5zIDogdGhpc1swXSA8PCAyNCA+PiAyNDtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc2hvcnRWYWx1ZSA9IGJuU2hvcnRWYWx1ZTtcbiAgLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIHNob3J0IChhc3N1bWVzIERCPj0xNilcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2hvcnRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50ID09IDAgPyB0aGlzLnMgOiB0aGlzWzBdIDw8IDE2ID4+IDE2O1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaWdudW0gPSBiblNpZ051bTtcbiAgLy8gKHB1YmxpYykgMCBpZiB0aGlzID09IDAsIDEgaWYgdGhpcyA+IDBcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2lnbnVtID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnMgPCAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnQgPD0gMCB8fCB0aGlzLnQgPT0gMSAmJiB0aGlzWzBdIDw9IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnRvQnl0ZUFycmF5ID0gYm5Ub0J5dGVBcnJheTtcbiAgLy8gKHB1YmxpYykgY29udmVydCB0byBiaWdlbmRpYW4gYnl0ZSBhcnJheVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b0J5dGVBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IHRoaXMudDtcbiAgICB2YXIgciA9IFtdO1xuICAgIHJbMF0gPSB0aGlzLnM7XG4gICAgdmFyIHAgPSB0aGlzLkRCIC0gaSAqIHRoaXMuREIgJSA4O1xuICAgIHZhciBkO1xuICAgIHZhciBrID0gMDtcbiAgICBpZiAoaS0tID4gMCkge1xuICAgICAgaWYgKHAgPCB0aGlzLkRCICYmIChkID0gdGhpc1tpXSA+PiBwKSAhPSAodGhpcy5zICYgdGhpcy5ETSkgPj4gcCkge1xuICAgICAgICByW2srK10gPSBkIHwgdGhpcy5zIDw8IHRoaXMuREIgLSBwO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICBpZiAocCA8IDgpIHtcbiAgICAgICAgICBkID0gKHRoaXNbaV0gJiAoMSA8PCBwKSAtIDEpIDw8IDggLSBwO1xuICAgICAgICAgIGQgfD0gdGhpc1stLWldID4+IChwICs9IHRoaXMuREIgLSA4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkID0gdGhpc1tpXSA+PiAocCAtPSA4KSAmIDB4ZmY7XG4gICAgICAgICAgaWYgKHAgPD0gMCkge1xuICAgICAgICAgICAgcCArPSB0aGlzLkRCO1xuICAgICAgICAgICAgLS1pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGQgJiAweDgwKSAhPSAwKSB7XG4gICAgICAgICAgZCB8PSAtMjU2O1xuICAgICAgICB9XG4gICAgICAgIGlmIChrID09IDAgJiYgKHRoaXMucyAmIDB4ODApICE9IChkICYgMHg4MCkpIHtcbiAgICAgICAgICArK2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGsgPiAwIHx8IGQgIT0gdGhpcy5zKSB7XG4gICAgICAgICAgcltrKytdID0gZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gYm5FcXVhbHM7XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcGFyZVRvKGEpID09IDA7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm1pbiA9IGJuTWluO1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5taW4gPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiB0aGlzLmNvbXBhcmVUbyhhKSA8IDAgPyB0aGlzIDogYTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubWF4ID0gYm5NYXg7XG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcGFyZVRvKGEpID4gMCA/IHRoaXMgOiBhO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbmQgPSBibkFuZDtcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuYml0d2lzZVRvKGEsIF91dGlsLm9wX2FuZCwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm9yID0gYm5PcjtcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUub3IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5iaXR3aXNlVG8oYSwgX3V0aWwub3Bfb3IsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS54b3IgPSBiblhvcjtcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUueG9yID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuYml0d2lzZVRvKGEsIF91dGlsLm9wX3hvciwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGJuQW5kTm90O1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbmROb3QgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5iaXR3aXNlVG8oYSwgX3V0aWwub3BfYW5kbm90LCByKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubm90ID0gYm5Ob3Q7XG4gIC8vIChwdWJsaWMpIH50aGlzXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgIHJbaV0gPSB0aGlzLkRNICYgfnRoaXNbaV07XG4gICAgfVxuICAgIHIudCA9IHRoaXMudDtcbiAgICByLnMgPSB+dGhpcy5zO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdExlZnQgPSBiblNoaWZ0TGVmdDtcbiAgLy8gKHB1YmxpYykgdGhpcyA8PCBuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0TGVmdCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHRoaXMuclNoaWZ0VG8oLW4sIHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxTaGlmdFRvKG4sIHIpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc2hpZnRSaWdodCA9IGJuU2hpZnRSaWdodDtcbiAgLy8gKHB1YmxpYykgdGhpcyA+PiBuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0UmlnaHQgPSBmdW5jdGlvbiAobikge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgaWYgKG4gPCAwKSB7XG4gICAgICB0aGlzLmxTaGlmdFRvKC1uLCByKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yU2hpZnRUbyhuLCByKTtcbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmdldExvd2VzdFNldEJpdCA9IGJuR2V0TG93ZXN0U2V0Qml0O1xuICAvLyAocHVibGljKSByZXR1cm5zIGluZGV4IG9mIGxvd2VzdCAxLWJpdCAob3IgLTEgaWYgbm9uZSlcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZ2V0TG93ZXN0U2V0Qml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgIGlmICh0aGlzW2ldICE9IDApIHtcbiAgICAgICAgcmV0dXJuIGkgKiB0aGlzLkRCICsgKDAsIF91dGlsLmxiaXQpKHRoaXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zIDwgMCkge1xuICAgICAgcmV0dXJuIHRoaXMudCAqIHRoaXMuREI7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuYml0Q291bnQgPSBibkJpdENvdW50O1xuICAvLyAocHVibGljKSByZXR1cm4gbnVtYmVyIG9mIHNldCBiaXRzXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gMDtcbiAgICB2YXIgeCA9IHRoaXMucyAmIHRoaXMuRE07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkge1xuICAgICAgciArPSAoMCwgX3V0aWwuY2JpdCkodGhpc1tpXSBeIHgpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUudGVzdEJpdCA9IGJuVGVzdEJpdDtcbiAgLy8gKHB1YmxpYykgdHJ1ZSBpZmYgbnRoIGJpdCBpcyBzZXRcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUudGVzdEJpdCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGogPSBNYXRoLmZsb29yKG4gLyB0aGlzLkRCKTtcbiAgICBpZiAoaiA+PSB0aGlzLnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnMgIT0gMDtcbiAgICB9XG4gICAgcmV0dXJuICh0aGlzW2pdICYgMSA8PCBuICUgdGhpcy5EQikgIT0gMDtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuc2V0Qml0ID0gYm5TZXRCaXQ7XG4gIC8vIChwdWJsaWMpIHRoaXMgfCAoMTw8bilcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc2V0Qml0ID0gZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VCaXQobiwgX3V0aWwub3Bfb3IpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5jbGVhckJpdCA9IGJuQ2xlYXJCaXQ7XG4gIC8vIChwdWJsaWMpIHRoaXMgJiB+KDE8PG4pXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsZWFyQml0ID0gZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VCaXQobiwgX3V0aWwub3BfYW5kbm90KTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZmxpcEJpdCA9IGJuRmxpcEJpdDtcbiAgLy8gKHB1YmxpYykgdGhpcyBeICgxPDxuKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mbGlwQml0ID0gZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VCaXQobiwgX3V0aWwub3BfeG9yKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkID0gYm5BZGQ7XG4gIC8vIChwdWJsaWMpIHRoaXMgKyBhXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmFkZFRvKGEsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGJuU3VidHJhY3Q7XG4gIC8vIChwdWJsaWMpIHRoaXMgLSBhXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuc3ViVG8oYSwgcik7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5ID0gYm5NdWx0aXBseTtcbiAgLy8gKHB1YmxpYykgdGhpcyAqIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5tdWx0aXBseVRvKGEsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGUgPSBibkRpdmlkZTtcbiAgLy8gKHB1YmxpYykgdGhpcyAvIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZGl2aWRlID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHRoaXMuZGl2UmVtVG8oYSwgciwgbnVsbCk7XG4gICAgcmV0dXJuIHI7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnJlbWFpbmRlciA9IGJuUmVtYWluZGVyO1xuICAvLyAocHVibGljKSB0aGlzICUgYVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5yZW1haW5kZXIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5kaXZSZW1UbyhhLCBudWxsLCByKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZGl2aWRlQW5kUmVtYWluZGVyID0gYm5EaXZpZGVBbmRSZW1haW5kZXI7XG4gIC8vIChwdWJsaWMpIFt0aGlzL2EsdGhpcyVhXVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGVBbmRSZW1haW5kZXIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBxID0gbmJpKCk7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB0aGlzLmRpdlJlbVRvKGEsIHEsIHIpO1xuICAgIHJldHVybiBbcSwgcl07XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdyA9IGJuTW9kUG93O1xuICAvLyAocHVibGljKSB0aGlzXmUgJSBtIChIQUMgMTQuODUpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdyA9IGZ1bmN0aW9uIChlLCBtKSB7XG4gICAgdmFyIGkgPSBlLmJpdExlbmd0aCgpO1xuICAgIHZhciBrO1xuICAgIHZhciByID0gbmJ2KDEpO1xuICAgIHZhciB6O1xuICAgIGlmIChpIDw9IDApIHtcbiAgICAgIHJldHVybiByO1xuICAgIH0gZWxzZSBpZiAoaSA8IDE4KSB7XG4gICAgICBrID0gMTtcbiAgICB9IGVsc2UgaWYgKGkgPCA0OCkge1xuICAgICAgayA9IDM7XG4gICAgfSBlbHNlIGlmIChpIDwgMTQ0KSB7XG4gICAgICBrID0gNDtcbiAgICB9IGVsc2UgaWYgKGkgPCA3NjgpIHtcbiAgICAgIGsgPSA1O1xuICAgIH0gZWxzZSB7XG4gICAgICBrID0gNjtcbiAgICB9XG4gICAgaWYgKGkgPCA4KSB7XG4gICAgICB6ID0gbmV3IENsYXNzaWMobSk7XG4gICAgfSBlbHNlIGlmIChtLmlzRXZlbigpKSB7XG4gICAgICB6ID0gbmV3IEJhcnJldHQobSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHogPSBuZXcgTW9udGdvbWVyeShtKTtcbiAgICB9XG4gICAgLy8gcHJlY29tcHV0YXRpb25cbiAgICB2YXIgZyA9IFtdO1xuICAgIHZhciBuID0gMztcbiAgICB2YXIgazEgPSBrIC0gMTtcbiAgICB2YXIga20gPSAoMSA8PCBrKSAtIDE7XG4gICAgZ1sxXSA9IHouY29udmVydCh0aGlzKTtcbiAgICBpZiAoayA+IDEpIHtcbiAgICAgIHZhciBnMiA9IG5iaSgpO1xuICAgICAgei5zcXJUbyhnWzFdLCBnMik7XG4gICAgICB3aGlsZSAobiA8PSBrbSkge1xuICAgICAgICBnW25dID0gbmJpKCk7XG4gICAgICAgIHoubXVsVG8oZzIsIGdbbiAtIDJdLCBnW25dKTtcbiAgICAgICAgbiArPSAyO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgaiA9IGUudCAtIDE7XG4gICAgdmFyIHc7XG4gICAgdmFyIGlzMSA9IHRydWU7XG4gICAgdmFyIHIyID0gbmJpKCk7XG4gICAgdmFyIHQ7XG4gICAgaSA9IG5iaXRzKGVbal0pIC0gMTtcbiAgICB3aGlsZSAoaiA+PSAwKSB7XG4gICAgICBpZiAoaSA+PSBrMSkge1xuICAgICAgICB3ID0gZVtqXSA+PiBpIC0gazEgJiBrbTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHcgPSAoZVtqXSAmICgxIDw8IGkgKyAxKSAtIDEpIDw8IGsxIC0gaTtcbiAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgdyB8PSBlW2ogLSAxXSA+PiB0aGlzLkRCICsgaSAtIGsxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuID0gaztcbiAgICAgIHdoaWxlICgodyAmIDEpID09IDApIHtcbiAgICAgICAgdyA+Pj0gMTtcbiAgICAgICAgLS1uO1xuICAgICAgfVxuICAgICAgaWYgKChpIC09IG4pIDwgMCkge1xuICAgICAgICBpICs9IHRoaXMuREI7XG4gICAgICAgIC0tajtcbiAgICAgIH1cbiAgICAgIGlmIChpczEpIHtcbiAgICAgICAgLy8gcmV0ID09IDEsIGRvbid0IGJvdGhlciBzcXVhcmluZyBvciBtdWx0aXBseWluZyBpdFxuICAgICAgICBnW3ddLmNvcHlUbyhyKTtcbiAgICAgICAgaXMxID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAobiA+IDEpIHtcbiAgICAgICAgICB6LnNxclRvKHIsIHIyKTtcbiAgICAgICAgICB6LnNxclRvKHIyLCByKTtcbiAgICAgICAgICBuIC09IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPiAwKSB7XG4gICAgICAgICAgei5zcXJUbyhyLCByMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdCA9IHI7XG4gICAgICAgICAgciA9IHIyO1xuICAgICAgICAgIHIyID0gdDtcbiAgICAgICAgfVxuICAgICAgICB6Lm11bFRvKHIyLCBnW3ddLCByKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChqID49IDAgJiYgKGVbal0gJiAxIDw8IGkpID09IDApIHtcbiAgICAgICAgei5zcXJUbyhyLCByMik7XG4gICAgICAgIHQgPSByO1xuICAgICAgICByID0gcjI7XG4gICAgICAgIHIyID0gdDtcbiAgICAgICAgaWYgKC0taSA8IDApIHtcbiAgICAgICAgICBpID0gdGhpcy5EQiAtIDE7XG4gICAgICAgICAgLS1qO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6LnJldmVydChyKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kSW52ZXJzZSA9IGJuTW9kSW52ZXJzZTtcbiAgLy8gKHB1YmxpYykgMS90aGlzICUgbSAoSEFDIDE0LjYxKVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnZlcnNlID0gZnVuY3Rpb24gKG0pIHtcbiAgICB2YXIgYWMgPSBtLmlzRXZlbigpO1xuICAgIGlmICh0aGlzLmlzRXZlbigpICYmIGFjIHx8IG0uc2lnbnVtKCkgPT0gMCkge1xuICAgICAgcmV0dXJuIEJpZ0ludGVnZXIuWkVSTztcbiAgICB9XG4gICAgdmFyIHUgPSBtLmNsb25lKCk7XG4gICAgdmFyIHYgPSB0aGlzLmNsb25lKCk7XG4gICAgdmFyIGEgPSBuYnYoMSk7XG4gICAgdmFyIGIgPSBuYnYoMCk7XG4gICAgdmFyIGMgPSBuYnYoMCk7XG4gICAgdmFyIGQgPSBuYnYoMSk7XG4gICAgd2hpbGUgKHUuc2lnbnVtKCkgIT0gMCkge1xuICAgICAgd2hpbGUgKHUuaXNFdmVuKCkpIHtcbiAgICAgICAgdS5yU2hpZnRUbygxLCB1KTtcbiAgICAgICAgaWYgKGFjKSB7XG4gICAgICAgICAgaWYgKCFhLmlzRXZlbigpIHx8ICFiLmlzRXZlbigpKSB7XG4gICAgICAgICAgICBhLmFkZFRvKHRoaXMsIGEpO1xuICAgICAgICAgICAgYi5zdWJUbyhtLCBiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYS5yU2hpZnRUbygxLCBhKTtcbiAgICAgICAgfSBlbHNlIGlmICghYi5pc0V2ZW4oKSkge1xuICAgICAgICAgIGIuc3ViVG8obSwgYik7XG4gICAgICAgIH1cbiAgICAgICAgYi5yU2hpZnRUbygxLCBiKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICh2LmlzRXZlbigpKSB7XG4gICAgICAgIHYuclNoaWZ0VG8oMSwgdik7XG4gICAgICAgIGlmIChhYykge1xuICAgICAgICAgIGlmICghYy5pc0V2ZW4oKSB8fCAhZC5pc0V2ZW4oKSkge1xuICAgICAgICAgICAgYy5hZGRUbyh0aGlzLCBjKTtcbiAgICAgICAgICAgIGQuc3ViVG8obSwgZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGMuclNoaWZ0VG8oMSwgYyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWQuaXNFdmVuKCkpIHtcbiAgICAgICAgICBkLnN1YlRvKG0sIGQpO1xuICAgICAgICB9XG4gICAgICAgIGQuclNoaWZ0VG8oMSwgZCk7XG4gICAgICB9XG4gICAgICBpZiAodS5jb21wYXJlVG8odikgPj0gMCkge1xuICAgICAgICB1LnN1YlRvKHYsIHUpO1xuICAgICAgICBpZiAoYWMpIHtcbiAgICAgICAgICBhLnN1YlRvKGMsIGEpO1xuICAgICAgICB9XG4gICAgICAgIGIuc3ViVG8oZCwgYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2LnN1YlRvKHUsIHYpO1xuICAgICAgICBpZiAoYWMpIHtcbiAgICAgICAgICBjLnN1YlRvKGEsIGMpO1xuICAgICAgICB9XG4gICAgICAgIGQuc3ViVG8oYiwgZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgIT0gMCkge1xuICAgICAgcmV0dXJuIEJpZ0ludGVnZXIuWkVSTztcbiAgICB9XG4gICAgaWYgKGQuY29tcGFyZVRvKG0pID49IDApIHtcbiAgICAgIHJldHVybiBkLnN1YnRyYWN0KG0pO1xuICAgIH1cbiAgICBpZiAoZC5zaWdudW0oKSA8IDApIHtcbiAgICAgIGQuYWRkVG8obSwgZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkO1xuICAgIH1cbiAgICBpZiAoZC5zaWdudW0oKSA8IDApIHtcbiAgICAgIHJldHVybiBkLmFkZChtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5wb3cgPSBiblBvdztcbiAgLy8gKHB1YmxpYykgdGhpc15lXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnBvdyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwKGUsIG5ldyBOdWxsRXhwKCkpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5nY2QgPSBibkdDRDtcbiAgLy8gKHB1YmxpYykgZ2NkKHRoaXMsYSkgKEhBQyAxNC41NClcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZ2NkID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IHRoaXMucyA8IDAgPyB0aGlzLm5lZ2F0ZSgpIDogdGhpcy5jbG9uZSgpO1xuICAgIHZhciB5ID0gYS5zIDwgMCA/IGEubmVnYXRlKCkgOiBhLmNsb25lKCk7XG4gICAgaWYgKHguY29tcGFyZVRvKHkpIDwgMCkge1xuICAgICAgdmFyIHQgPSB4O1xuICAgICAgeCA9IHk7XG4gICAgICB5ID0gdDtcbiAgICB9XG4gICAgdmFyIGkgPSB4LmdldExvd2VzdFNldEJpdCgpO1xuICAgIHZhciBnID0geS5nZXRMb3dlc3RTZXRCaXQoKTtcbiAgICBpZiAoZyA8IDApIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBpZiAoaSA8IGcpIHtcbiAgICAgIGcgPSBpO1xuICAgIH1cbiAgICBpZiAoZyA+IDApIHtcbiAgICAgIHguclNoaWZ0VG8oZywgeCk7XG4gICAgICB5LnJTaGlmdFRvKGcsIHkpO1xuICAgIH1cbiAgICB3aGlsZSAoeC5zaWdudW0oKSA+IDApIHtcbiAgICAgIGlmICgoaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkge1xuICAgICAgICB4LnJTaGlmdFRvKGksIHgpO1xuICAgICAgfVxuICAgICAgaWYgKChpID0geS5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKSB7XG4gICAgICAgIHkuclNoaWZ0VG8oaSwgeSk7XG4gICAgICB9XG4gICAgICBpZiAoeC5jb21wYXJlVG8oeSkgPj0gMCkge1xuICAgICAgICB4LnN1YlRvKHksIHgpO1xuICAgICAgICB4LnJTaGlmdFRvKDEsIHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeS5zdWJUbyh4LCB5KTtcbiAgICAgICAgeS5yU2hpZnRUbygxLCB5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGcgPiAwKSB7XG4gICAgICB5LmxTaGlmdFRvKGcsIHkpO1xuICAgIH1cbiAgICByZXR1cm4geTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuaXNQcm9iYWJsZVByaW1lID0gYm5Jc1Byb2JhYmxlUHJpbWU7XG4gIC8vIChwdWJsaWMpIHRlc3QgcHJpbWFsaXR5IHdpdGggY2VydGFpbnR5ID49IDEtLjVedFxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc1Byb2JhYmxlUHJpbWUgPSBmdW5jdGlvbiAodCkge1xuICAgIHZhciBpO1xuICAgIHZhciB4ID0gdGhpcy5hYnMoKTtcbiAgICBpZiAoeC50ID09IDEgJiYgeFswXSA8PSBsb3dwcmltZXNbbG93cHJpbWVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbG93cHJpbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh4WzBdID09IGxvd3ByaW1lc1tpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh4LmlzRXZlbigpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGkgPSAxO1xuICAgIHdoaWxlIChpIDwgbG93cHJpbWVzLmxlbmd0aCkge1xuICAgICAgdmFyIG0gPSBsb3dwcmltZXNbaV07XG4gICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgd2hpbGUgKGogPCBsb3dwcmltZXMubGVuZ3RoICYmIG0gPCBscGxpbSkge1xuICAgICAgICBtICo9IGxvd3ByaW1lc1tqKytdO1xuICAgICAgfVxuICAgICAgbSA9IHgubW9kSW50KG0pO1xuICAgICAgd2hpbGUgKGkgPCBqKSB7XG4gICAgICAgIGlmIChtICUgbG93cHJpbWVzW2krK10gPT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geC5taWxsZXJSYWJpbih0KTtcbiAgfTtcbiAgLy8jZW5kcmVnaW9uIFBVQkxJQ1xuICAvLyNyZWdpb24gUFJPVEVDVEVEXG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNvcHlUbyA9IGJucENvcHlUbztcbiAgLy8gKHByb3RlY3RlZCkgY29weSB0aGlzIHRvIHJcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY29weVRvID0gZnVuY3Rpb24gKHIpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHJbaV0gPSB0aGlzW2ldO1xuICAgIH1cbiAgICByLnQgPSB0aGlzLnQ7XG4gICAgci5zID0gdGhpcy5zO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tSW50ID0gYm5wRnJvbUludDtcbiAgLy8gKHByb3RlY3RlZCkgc2V0IGZyb20gaW50ZWdlciB2YWx1ZSB4LCAtRFYgPD0geCA8IERWXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21JbnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHRoaXMudCA9IDE7XG4gICAgdGhpcy5zID0geCA8IDAgPyAtMSA6IDA7XG4gICAgaWYgKHggPiAwKSB7XG4gICAgICB0aGlzWzBdID0geDtcbiAgICB9IGVsc2UgaWYgKHggPCAtMSkge1xuICAgICAgdGhpc1swXSA9IHggKyB0aGlzLkRWO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnQgPSAwO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVN0cmluZyA9IGJucEZyb21TdHJpbmc7XG4gIC8vIChwcm90ZWN0ZWQpIHNldCBmcm9tIHN0cmluZyBhbmQgcmFkaXhcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzLCBiKSB7XG4gICAgdmFyIGs7XG4gICAgaWYgKGIgPT0gMTYpIHtcbiAgICAgIGsgPSA0O1xuICAgIH0gZWxzZSBpZiAoYiA9PSA4KSB7XG4gICAgICBrID0gMztcbiAgICB9IGVsc2UgaWYgKGIgPT0gMjU2KSB7XG4gICAgICBrID0gODtcbiAgICAgIC8qIGJ5dGUgYXJyYXkgKi9cbiAgICB9IGVsc2UgaWYgKGIgPT0gMikge1xuICAgICAgayA9IDE7XG4gICAgfSBlbHNlIGlmIChiID09IDMyKSB7XG4gICAgICBrID0gNTtcbiAgICB9IGVsc2UgaWYgKGIgPT0gNCkge1xuICAgICAgayA9IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnJvbVJhZGl4KHMsIGIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnQgPSAwO1xuICAgIHRoaXMucyA9IDA7XG4gICAgdmFyIGkgPSBzLmxlbmd0aDtcbiAgICB2YXIgbWkgPSBmYWxzZTtcbiAgICB2YXIgc2ggPSAwO1xuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgdmFyIHggPSBrID09IDggPyArc1tpXSAmIDB4ZmYgOiBpbnRBdChzLCBpKTtcbiAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICBpZiAocy5jaGFyQXQoaSkgPT0gXCItXCIpIHtcbiAgICAgICAgICBtaSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtaSA9IGZhbHNlO1xuICAgICAgaWYgKHNoID09IDApIHtcbiAgICAgICAgdGhpc1t0aGlzLnQrK10gPSB4O1xuICAgICAgfSBlbHNlIGlmIChzaCArIGsgPiB0aGlzLkRCKSB7XG4gICAgICAgIHRoaXNbdGhpcy50IC0gMV0gfD0gKHggJiAoMSA8PCB0aGlzLkRCIC0gc2gpIC0gMSkgPDwgc2g7XG4gICAgICAgIHRoaXNbdGhpcy50KytdID0geCA+PiB0aGlzLkRCIC0gc2g7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW3RoaXMudCAtIDFdIHw9IHggPDwgc2g7XG4gICAgICB9XG4gICAgICBzaCArPSBrO1xuICAgICAgaWYgKHNoID49IHRoaXMuREIpIHtcbiAgICAgICAgc2ggLT0gdGhpcy5EQjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGsgPT0gOCAmJiAoK3NbMF0gJiAweDgwKSAhPSAwKSB7XG4gICAgICB0aGlzLnMgPSAtMTtcbiAgICAgIGlmIChzaCA+IDApIHtcbiAgICAgICAgdGhpc1t0aGlzLnQgLSAxXSB8PSAoMSA8PCB0aGlzLkRCIC0gc2gpIC0gMSA8PCBzaDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbGFtcCgpO1xuICAgIGlmIChtaSkge1xuICAgICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHRoaXMsIHRoaXMpO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuY2xhbXAgPSBibnBDbGFtcDtcbiAgLy8gKHByb3RlY3RlZCkgY2xhbXAgb2ZmIGV4Y2VzcyBoaWdoIHdvcmRzXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmNsYW1wID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjID0gdGhpcy5zICYgdGhpcy5ETTtcbiAgICB3aGlsZSAodGhpcy50ID4gMCAmJiB0aGlzW3RoaXMudCAtIDFdID09IGMpIHtcbiAgICAgIC0tdGhpcy50O1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZGxTaGlmdFRvID0gYm5wRExTaGlmdFRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA8PCBuKkRCXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRsU2hpZnRUbyA9IGZ1bmN0aW9uIChuLCByKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHJbaSArIG5dID0gdGhpc1tpXTtcbiAgICB9XG4gICAgZm9yIChpID0gbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICByW2ldID0gMDtcbiAgICB9XG4gICAgci50ID0gdGhpcy50ICsgbjtcbiAgICByLnMgPSB0aGlzLnM7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRyU2hpZnRUbyA9IGJucERSU2hpZnRUbztcbiAgLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgPj4gbipEQlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kclNoaWZ0VG8gPSBmdW5jdGlvbiAobiwgcikge1xuICAgIGZvciAodmFyIGkgPSBuOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgIHJbaSAtIG5dID0gdGhpc1tpXTtcbiAgICB9XG4gICAgci50ID0gTWF0aC5tYXgodGhpcy50IC0gbiwgMCk7XG4gICAgci5zID0gdGhpcy5zO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5sU2hpZnRUbyA9IGJucExTaGlmdFRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA8PCBuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmxTaGlmdFRvID0gZnVuY3Rpb24gKG4sIHIpIHtcbiAgICB2YXIgYnMgPSBuICUgdGhpcy5EQjtcbiAgICB2YXIgY2JzID0gdGhpcy5EQiAtIGJzO1xuICAgIHZhciBibSA9ICgxIDw8IGNicykgLSAxO1xuICAgIHZhciBkcyA9IE1hdGguZmxvb3IobiAvIHRoaXMuREIpO1xuICAgIHZhciBjID0gdGhpcy5zIDw8IGJzICYgdGhpcy5ETTtcbiAgICBmb3IgKHZhciBpID0gdGhpcy50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHJbaSArIGRzICsgMV0gPSB0aGlzW2ldID4+IGNicyB8IGM7XG4gICAgICBjID0gKHRoaXNbaV0gJiBibSkgPDwgYnM7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBkcyAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICByW2ldID0gMDtcbiAgICB9XG4gICAgcltkc10gPSBjO1xuICAgIHIudCA9IHRoaXMudCArIGRzICsgMTtcbiAgICByLnMgPSB0aGlzLnM7XG4gICAgci5jbGFtcCgpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5yU2hpZnRUbyA9IGJucFJTaGlmdFRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyA+PiBuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLnJTaGlmdFRvID0gZnVuY3Rpb24gKG4sIHIpIHtcbiAgICByLnMgPSB0aGlzLnM7XG4gICAgdmFyIGRzID0gTWF0aC5mbG9vcihuIC8gdGhpcy5EQik7XG4gICAgaWYgKGRzID49IHRoaXMudCkge1xuICAgICAgci50ID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJzID0gbiAlIHRoaXMuREI7XG4gICAgdmFyIGNicyA9IHRoaXMuREIgLSBicztcbiAgICB2YXIgYm0gPSAoMSA8PCBicykgLSAxO1xuICAgIHJbMF0gPSB0aGlzW2RzXSA+PiBicztcbiAgICBmb3IgKHZhciBpID0gZHMgKyAxOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgIHJbaSAtIGRzIC0gMV0gfD0gKHRoaXNbaV0gJiBibSkgPDwgY2JzO1xuICAgICAgcltpIC0gZHNdID0gdGhpc1tpXSA+PiBicztcbiAgICB9XG4gICAgaWYgKGJzID4gMCkge1xuICAgICAgclt0aGlzLnQgLSBkcyAtIDFdIHw9ICh0aGlzLnMgJiBibSkgPDwgY2JzO1xuICAgIH1cbiAgICByLnQgPSB0aGlzLnQgLSBkcztcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnN1YlRvID0gYm5wU3ViVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIC0gYVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zdWJUbyA9IGZ1bmN0aW9uIChhLCByKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBjID0gMDtcbiAgICB2YXIgbSA9IE1hdGgubWluKGEudCwgdGhpcy50KTtcbiAgICB3aGlsZSAoaSA8IG0pIHtcbiAgICAgIGMgKz0gdGhpc1tpXSAtIGFbaV07XG4gICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcbiAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgfVxuICAgIGlmIChhLnQgPCB0aGlzLnQpIHtcbiAgICAgIGMgLT0gYS5zO1xuICAgICAgd2hpbGUgKGkgPCB0aGlzLnQpIHtcbiAgICAgICAgYyArPSB0aGlzW2ldO1xuICAgICAgICByW2krK10gPSBjICYgdGhpcy5ETTtcbiAgICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICAgIH1cbiAgICAgIGMgKz0gdGhpcy5zO1xuICAgIH0gZWxzZSB7XG4gICAgICBjICs9IHRoaXMucztcbiAgICAgIHdoaWxlIChpIDwgYS50KSB7XG4gICAgICAgIGMgLT0gYVtpXTtcbiAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XG4gICAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgICB9XG4gICAgICBjIC09IGEucztcbiAgICB9XG4gICAgci5zID0gYyA8IDAgPyAtMSA6IDA7XG4gICAgaWYgKGMgPCAtMSkge1xuICAgICAgcltpKytdID0gdGhpcy5EViArIGM7XG4gICAgfSBlbHNlIGlmIChjID4gMCkge1xuICAgICAgcltpKytdID0gYztcbiAgICB9XG4gICAgci50ID0gaTtcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VG8gPSBibnBNdWx0aXBseVRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyAqIGEsIHIgIT0gdGhpcyxhIChIQUMgMTQuMTIpXG4gIC8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHlUbyA9IGZ1bmN0aW9uIChhLCByKSB7XG4gICAgdmFyIHggPSB0aGlzLmFicygpO1xuICAgIHZhciB5ID0gYS5hYnMoKTtcbiAgICB2YXIgaSA9IHgudDtcbiAgICByLnQgPSBpICsgeS50O1xuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgcltpXSA9IDA7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCB5LnQ7ICsraSkge1xuICAgICAgcltpICsgeC50XSA9IHguYW0oMCwgeVtpXSwgciwgaSwgMCwgeC50KTtcbiAgICB9XG4gICAgci5zID0gMDtcbiAgICByLmNsYW1wKCk7XG4gICAgaWYgKHRoaXMucyAhPSBhLnMpIHtcbiAgICAgIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyhyLCByKTtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZVRvID0gYm5wU3F1YXJlVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzXjIsIHIgIT0gdGhpcyAoSEFDIDE0LjE2KVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5zcXVhcmVUbyA9IGZ1bmN0aW9uIChyKSB7XG4gICAgdmFyIHggPSB0aGlzLmFicygpO1xuICAgIHZhciBpID0gci50ID0gMiAqIHgudDtcbiAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgIHJbaV0gPSAwO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgeC50IC0gMTsgKytpKSB7XG4gICAgICB2YXIgYyA9IHguYW0oaSwgeFtpXSwgciwgMiAqIGksIDAsIDEpO1xuICAgICAgaWYgKChyW2kgKyB4LnRdICs9IHguYW0oaSArIDEsIDIgKiB4W2ldLCByLCAyICogaSArIDEsIGMsIHgudCAtIGkgLSAxKSkgPj0geC5EVikge1xuICAgICAgICByW2kgKyB4LnRdIC09IHguRFY7XG4gICAgICAgIHJbaSArIHgudCArIDFdID0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHIudCA+IDApIHtcbiAgICAgIHJbci50IC0gMV0gKz0geC5hbShpLCB4W2ldLCByLCAyICogaSwgMCwgMSk7XG4gICAgfVxuICAgIHIucyA9IDA7XG4gICAgci5jbGFtcCgpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZSZW1UbyA9IGJucERpdlJlbVRvO1xuICAvLyAocHJvdGVjdGVkKSBkaXZpZGUgdGhpcyBieSBtLCBxdW90aWVudCBhbmQgcmVtYWluZGVyIHRvIHEsIHIgKEhBQyAxNC4yMClcbiAgLy8gciAhPSBxLCB0aGlzICE9IG0uICBxIG9yIHIgbWF5IGJlIG51bGwuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRpdlJlbVRvID0gZnVuY3Rpb24gKG0sIHEsIHIpIHtcbiAgICB2YXIgcG0gPSBtLmFicygpO1xuICAgIGlmIChwbS50IDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHB0ID0gdGhpcy5hYnMoKTtcbiAgICBpZiAocHQudCA8IHBtLnQpIHtcbiAgICAgIGlmIChxICE9IG51bGwpIHtcbiAgICAgICAgcS5mcm9tSW50KDApO1xuICAgICAgfVxuICAgICAgaWYgKHIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvcHlUbyhyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgciA9IG5iaSgpO1xuICAgIH1cbiAgICB2YXIgeSA9IG5iaSgpO1xuICAgIHZhciB0cyA9IHRoaXMucztcbiAgICB2YXIgbXMgPSBtLnM7XG4gICAgdmFyIG5zaCA9IHRoaXMuREIgLSBuYml0cyhwbVtwbS50IC0gMV0pOyAvLyBub3JtYWxpemUgbW9kdWx1c1xuICAgIGlmIChuc2ggPiAwKSB7XG4gICAgICBwbS5sU2hpZnRUbyhuc2gsIHkpO1xuICAgICAgcHQubFNoaWZ0VG8obnNoLCByKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG0uY29weVRvKHkpO1xuICAgICAgcHQuY29weVRvKHIpO1xuICAgIH1cbiAgICB2YXIgeXMgPSB5LnQ7XG4gICAgdmFyIHkwID0geVt5cyAtIDFdO1xuICAgIGlmICh5MCA9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB5dCA9IHkwICogKDEgPDwgdGhpcy5GMSkgKyAoeXMgPiAxID8geVt5cyAtIDJdID4+IHRoaXMuRjIgOiAwKTtcbiAgICB2YXIgZDEgPSB0aGlzLkZWIC8geXQ7XG4gICAgdmFyIGQyID0gKDEgPDwgdGhpcy5GMSkgLyB5dDtcbiAgICB2YXIgZSA9IDEgPDwgdGhpcy5GMjtcbiAgICB2YXIgaSA9IHIudDtcbiAgICB2YXIgaiA9IGkgLSB5cztcbiAgICB2YXIgdCA9IHEgPT0gbnVsbCA/IG5iaSgpIDogcTtcbiAgICB5LmRsU2hpZnRUbyhqLCB0KTtcbiAgICBpZiAoci5jb21wYXJlVG8odCkgPj0gMCkge1xuICAgICAgcltyLnQrK10gPSAxO1xuICAgICAgci5zdWJUbyh0LCByKTtcbiAgICB9XG4gICAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKHlzLCB0KTtcbiAgICB0LnN1YlRvKHksIHkpOyAvLyBcIm5lZ2F0aXZlXCIgeSBzbyB3ZSBjYW4gcmVwbGFjZSBzdWIgd2l0aCBhbSBsYXRlclxuICAgIHdoaWxlICh5LnQgPCB5cykge1xuICAgICAgeVt5LnQrK10gPSAwO1xuICAgIH1cbiAgICB3aGlsZSAoLS1qID49IDApIHtcbiAgICAgIC8vIEVzdGltYXRlIHF1b3RpZW50IGRpZ2l0XG4gICAgICB2YXIgcWQgPSByWy0taV0gPT0geTAgPyB0aGlzLkRNIDogTWF0aC5mbG9vcihyW2ldICogZDEgKyAocltpIC0gMV0gKyBlKSAqIGQyKTtcbiAgICAgIGlmICgocltpXSArPSB5LmFtKDAsIHFkLCByLCBqLCAwLCB5cykpIDwgcWQpIHtcbiAgICAgICAgLy8gVHJ5IGl0IG91dFxuICAgICAgICB5LmRsU2hpZnRUbyhqLCB0KTtcbiAgICAgICAgci5zdWJUbyh0LCByKTtcbiAgICAgICAgd2hpbGUgKHJbaV0gPCAtLXFkKSB7XG4gICAgICAgICAgci5zdWJUbyh0LCByKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocSAhPSBudWxsKSB7XG4gICAgICByLmRyU2hpZnRUbyh5cywgcSk7XG4gICAgICBpZiAodHMgIT0gbXMpIHtcbiAgICAgICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHEsIHEpO1xuICAgICAgfVxuICAgIH1cbiAgICByLnQgPSB5cztcbiAgICByLmNsYW1wKCk7XG4gICAgaWYgKG5zaCA+IDApIHtcbiAgICAgIHIuclNoaWZ0VG8obnNoLCByKTtcbiAgICB9IC8vIERlbm9ybWFsaXplIHJlbWFpbmRlclxuICAgIGlmICh0cyA8IDApIHtcbiAgICAgIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyhyLCByKTtcbiAgICB9XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmludkRpZ2l0ID0gYm5wSW52RGlnaXQ7XG4gIC8vIChwcm90ZWN0ZWQpIHJldHVybiBcIi0xL3RoaXMgJSAyXkRCXCI7IHVzZWZ1bCBmb3IgTW9udC4gcmVkdWN0aW9uXG4gIC8vIGp1c3RpZmljYXRpb246XG4gIC8vICAgICAgICAgeHkgPT0gMSAobW9kIG0pXG4gIC8vICAgICAgICAgeHkgPSAgMStrbVxuICAvLyAgIHh5KDIteHkpID0gKDEra20pKDEta20pXG4gIC8vIHhbeSgyLXh5KV0gPSAxLWteMm1eMlxuICAvLyB4W3koMi14eSldID09IDEgKG1vZCBtXjIpXG4gIC8vIGlmIHkgaXMgMS94IG1vZCBtLCB0aGVuIHkoMi14eSkgaXMgMS94IG1vZCBtXjJcbiAgLy8gc2hvdWxkIHJlZHVjZSB4IGFuZCB5KDIteHkpIGJ5IG1eMiBhdCBlYWNoIHN0ZXAgdG8ga2VlcCBzaXplIGJvdW5kZWQuXG4gIC8vIEpTIG11bHRpcGx5IFwib3ZlcmZsb3dzXCIgZGlmZmVyZW50bHkgZnJvbSBDL0MrKywgc28gY2FyZSBpcyBuZWVkZWQgaGVyZS5cbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuaW52RGlnaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudCA8IDEpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgeCA9IHRoaXNbMF07XG4gICAgaWYgKCh4ICYgMSkgPT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciB5ID0geCAmIDM7IC8vIHkgPT0gMS94IG1vZCAyXjJcbiAgICB5ID0geSAqICgyIC0gKHggJiAweGYpICogeSkgJiAweGY7IC8vIHkgPT0gMS94IG1vZCAyXjRcbiAgICB5ID0geSAqICgyIC0gKHggJiAweGZmKSAqIHkpICYgMHhmZjsgLy8geSA9PSAxL3ggbW9kIDJeOFxuICAgIHkgPSB5ICogKDIgLSAoKHggJiAweGZmZmYpICogeSAmIDB4ZmZmZikpICYgMHhmZmZmOyAvLyB5ID09IDEveCBtb2QgMl4xNlxuICAgIC8vIGxhc3Qgc3RlcCAtIGNhbGN1bGF0ZSBpbnZlcnNlIG1vZCBEViBkaXJlY3RseTtcbiAgICAvLyBhc3N1bWVzIDE2IDwgREIgPD0gMzIgYW5kIGFzc3VtZXMgYWJpbGl0eSB0byBoYW5kbGUgNDgtYml0IGludHNcbiAgICB5ID0geSAqICgyIC0geCAqIHkgJSB0aGlzLkRWKSAlIHRoaXMuRFY7IC8vIHkgPT0gMS94IG1vZCAyXmRiaXRzXG4gICAgLy8gd2UgcmVhbGx5IHdhbnQgdGhlIG5lZ2F0aXZlIGludmVyc2UsIGFuZCAtRFYgPCB5IDwgRFZcbiAgICByZXR1cm4geSA+IDAgPyB0aGlzLkRWIC0geSA6IC15O1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc0V2ZW4gPSBibnBJc0V2ZW47XG4gIC8vIChwcm90ZWN0ZWQpIHRydWUgaWZmIHRoaXMgaXMgZXZlblxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc0V2ZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLnQgPiAwID8gdGhpc1swXSAmIDEgOiB0aGlzLnMpID09IDA7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmV4cCA9IGJucEV4cDtcbiAgLy8gKHByb3RlY3RlZCkgdGhpc15lLCBlIDwgMl4zMiwgZG9pbmcgc3FyIGFuZCBtdWwgd2l0aCBcInJcIiAoSEFDIDE0Ljc5KVxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5leHAgPSBmdW5jdGlvbiAoZSwgeikge1xuICAgIGlmIChlID4gMHhmZmZmZmZmZiB8fCBlIDwgMSkge1xuICAgICAgcmV0dXJuIEJpZ0ludGVnZXIuT05FO1xuICAgIH1cbiAgICB2YXIgciA9IG5iaSgpO1xuICAgIHZhciByMiA9IG5iaSgpO1xuICAgIHZhciBnID0gei5jb252ZXJ0KHRoaXMpO1xuICAgIHZhciBpID0gbmJpdHMoZSkgLSAxO1xuICAgIGcuY29weVRvKHIpO1xuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgei5zcXJUbyhyLCByMik7XG4gICAgICBpZiAoKGUgJiAxIDw8IGkpID4gMCkge1xuICAgICAgICB6Lm11bFRvKHIyLCBnLCByKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0ID0gcjtcbiAgICAgICAgciA9IHIyO1xuICAgICAgICByMiA9IHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6LnJldmVydChyKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuY2h1bmtTaXplID0gYm5wQ2h1bmtTaXplO1xuICAvLyAocHJvdGVjdGVkKSByZXR1cm4geCBzLnQuIHJeeCA8IERWXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmNodW5rU2l6ZSA9IGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5MTjIgKiB0aGlzLkRCIC8gTWF0aC5sb2cocikpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1JhZGl4ID0gYm5wVG9SYWRpeDtcbiAgLy8gKHByb3RlY3RlZCkgY29udmVydCB0byByYWRpeCBzdHJpbmdcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUudG9SYWRpeCA9IGZ1bmN0aW9uIChiKSB7XG4gICAgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgYiA9IDEwO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaWdudW0oKSA9PSAwIHx8IGIgPCAyIHx8IGIgPiAzNikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgICB2YXIgY3MgPSB0aGlzLmNodW5rU2l6ZShiKTtcbiAgICB2YXIgYSA9IE1hdGgucG93KGIsIGNzKTtcbiAgICB2YXIgZCA9IG5idihhKTtcbiAgICB2YXIgeSA9IG5iaSgpO1xuICAgIHZhciB6ID0gbmJpKCk7XG4gICAgdmFyIHIgPSBcIlwiO1xuICAgIHRoaXMuZGl2UmVtVG8oZCwgeSwgeik7XG4gICAgd2hpbGUgKHkuc2lnbnVtKCkgPiAwKSB7XG4gICAgICByID0gKGEgKyB6LmludFZhbHVlKCkpLnRvU3RyaW5nKGIpLnN1YnN0cigxKSArIHI7XG4gICAgICB5LmRpdlJlbVRvKGQsIHksIHopO1xuICAgIH1cbiAgICByZXR1cm4gei5pbnRWYWx1ZSgpLnRvU3RyaW5nKGIpICsgcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVJhZGl4ID0gYm5wRnJvbVJhZGl4O1xuICAvLyAocHJvdGVjdGVkKSBjb252ZXJ0IGZyb20gcmFkaXggc3RyaW5nXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21SYWRpeCA9IGZ1bmN0aW9uIChzLCBiKSB7XG4gICAgdGhpcy5mcm9tSW50KDApO1xuICAgIGlmIChiID09IG51bGwpIHtcbiAgICAgIGIgPSAxMDtcbiAgICB9XG4gICAgdmFyIGNzID0gdGhpcy5jaHVua1NpemUoYik7XG4gICAgdmFyIGQgPSBNYXRoLnBvdyhiLCBjcyk7XG4gICAgdmFyIG1pID0gZmFsc2U7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciB3ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB4ID0gaW50QXQocywgaSk7XG4gICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgaWYgKHMuY2hhckF0KGkpID09IFwiLVwiICYmIHRoaXMuc2lnbnVtKCkgPT0gMCkge1xuICAgICAgICAgIG1pID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHcgPSBiICogdyArIHg7XG4gICAgICBpZiAoKytqID49IGNzKSB7XG4gICAgICAgIHRoaXMuZE11bHRpcGx5KGQpO1xuICAgICAgICB0aGlzLmRBZGRPZmZzZXQodywgMCk7XG4gICAgICAgIGogPSAwO1xuICAgICAgICB3ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGogPiAwKSB7XG4gICAgICB0aGlzLmRNdWx0aXBseShNYXRoLnBvdyhiLCBqKSk7XG4gICAgICB0aGlzLmRBZGRPZmZzZXQodywgMCk7XG4gICAgfVxuICAgIGlmIChtaSkge1xuICAgICAgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHRoaXMsIHRoaXMpO1xuICAgIH1cbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbU51bWJlciA9IGJucEZyb21OdW1iZXI7XG4gIC8vIChwcm90ZWN0ZWQpIGFsdGVybmF0ZSBjb25zdHJ1Y3RvclxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tTnVtYmVyID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICBpZiAoXCJudW1iZXJcIiA9PSB0eXBlb2YgYikge1xuICAgICAgLy8gbmV3IEJpZ0ludGVnZXIoaW50LGludCxSTkcpXG4gICAgICBpZiAoYSA8IDIpIHtcbiAgICAgICAgdGhpcy5mcm9tSW50KDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsIGMpO1xuICAgICAgICBpZiAoIXRoaXMudGVzdEJpdChhIC0gMSkpIHtcbiAgICAgICAgICAvLyBmb3JjZSBNU0Igc2V0XG4gICAgICAgICAgdGhpcy5iaXR3aXNlVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEgLSAxKSwgX3V0aWwub3Bfb3IsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRXZlbigpKSB7XG4gICAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KDEsIDApO1xuICAgICAgICB9IC8vIGZvcmNlIG9kZFxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNQcm9iYWJsZVByaW1lKGIpKSB7XG4gICAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KDIsIDApO1xuICAgICAgICAgIGlmICh0aGlzLmJpdExlbmd0aCgpID4gYSkge1xuICAgICAgICAgICAgdGhpcy5zdWJUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYSAtIDEpLCB0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbmV3IEJpZ0ludGVnZXIoaW50LFJORylcbiAgICAgIHZhciB4ID0gW107XG4gICAgICB2YXIgdCA9IGEgJiA3O1xuICAgICAgeC5sZW5ndGggPSAoYSA+PiAzKSArIDE7XG4gICAgICBiLm5leHRCeXRlcyh4KTtcbiAgICAgIGlmICh0ID4gMCkge1xuICAgICAgICB4WzBdICY9ICgxIDw8IHQpIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhbMF0gPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5mcm9tU3RyaW5nKHgsIDI1Nik7XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXR3aXNlVG8gPSBibnBCaXR3aXNlVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIG9wIGEgKGJpdHdpc2UpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmJpdHdpc2VUbyA9IGZ1bmN0aW9uIChhLCBvcCwgcikge1xuICAgIHZhciBpO1xuICAgIHZhciBmO1xuICAgIHZhciBtID0gTWF0aC5taW4oYS50LCB0aGlzLnQpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIHtcbiAgICAgIHJbaV0gPSBvcCh0aGlzW2ldLCBhW2ldKTtcbiAgICB9XG4gICAgaWYgKGEudCA8IHRoaXMudCkge1xuICAgICAgZiA9IGEucyAmIHRoaXMuRE07XG4gICAgICBmb3IgKGkgPSBtOyBpIDwgdGhpcy50OyArK2kpIHtcbiAgICAgICAgcltpXSA9IG9wKHRoaXNbaV0sIGYpO1xuICAgICAgfVxuICAgICAgci50ID0gdGhpcy50O1xuICAgIH0gZWxzZSB7XG4gICAgICBmID0gdGhpcy5zICYgdGhpcy5ETTtcbiAgICAgIGZvciAoaSA9IG07IGkgPCBhLnQ7ICsraSkge1xuICAgICAgICByW2ldID0gb3AoZiwgYVtpXSk7XG4gICAgICB9XG4gICAgICByLnQgPSBhLnQ7XG4gICAgfVxuICAgIHIucyA9IG9wKHRoaXMucywgYS5zKTtcbiAgICByLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmNoYW5nZUJpdCA9IGJucENoYW5nZUJpdDtcbiAgLy8gKHByb3RlY3RlZCkgdGhpcyBvcCAoMTw8bilcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuY2hhbmdlQml0ID0gZnVuY3Rpb24gKG4sIG9wKSB7XG4gICAgdmFyIHIgPSBCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQobik7XG4gICAgdGhpcy5iaXR3aXNlVG8ociwgb3AsIHIpO1xuICAgIHJldHVybiByO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGRUbyA9IGJucEFkZFRvO1xuICAvLyAocHJvdGVjdGVkKSByID0gdGhpcyArIGFcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYWRkVG8gPSBmdW5jdGlvbiAoYSwgcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgYyA9IDA7XG4gICAgdmFyIG0gPSBNYXRoLm1pbihhLnQsIHRoaXMudCk7XG4gICAgd2hpbGUgKGkgPCBtKSB7XG4gICAgICBjICs9IHRoaXNbaV0gKyBhW2ldO1xuICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XG4gICAgICBjID4+PSB0aGlzLkRCO1xuICAgIH1cbiAgICBpZiAoYS50IDwgdGhpcy50KSB7XG4gICAgICBjICs9IGEucztcbiAgICAgIHdoaWxlIChpIDwgdGhpcy50KSB7XG4gICAgICAgIGMgKz0gdGhpc1tpXTtcbiAgICAgICAgcltpKytdID0gYyAmIHRoaXMuRE07XG4gICAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgICB9XG4gICAgICBjICs9IHRoaXMucztcbiAgICB9IGVsc2Uge1xuICAgICAgYyArPSB0aGlzLnM7XG4gICAgICB3aGlsZSAoaSA8IGEudCkge1xuICAgICAgICBjICs9IGFbaV07XG4gICAgICAgIHJbaSsrXSA9IGMgJiB0aGlzLkRNO1xuICAgICAgICBjID4+PSB0aGlzLkRCO1xuICAgICAgfVxuICAgICAgYyArPSBhLnM7XG4gICAgfVxuICAgIHIucyA9IGMgPCAwID8gLTEgOiAwO1xuICAgIGlmIChjID4gMCkge1xuICAgICAgcltpKytdID0gYztcbiAgICB9IGVsc2UgaWYgKGMgPCAtMSkge1xuICAgICAgcltpKytdID0gdGhpcy5EViArIGM7XG4gICAgfVxuICAgIHIudCA9IGk7XG4gICAgci5jbGFtcCgpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5kTXVsdGlwbHkgPSBibnBETXVsdGlwbHk7XG4gIC8vIChwcm90ZWN0ZWQpIHRoaXMgKj0gbiwgdGhpcyA+PSAwLCAxIDwgbiA8IERWXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRNdWx0aXBseSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgdGhpc1t0aGlzLnRdID0gdGhpcy5hbSgwLCBuIC0gMSwgdGhpcywgMCwgMCwgdGhpcy50KTtcbiAgICArK3RoaXMudDtcbiAgICB0aGlzLmNsYW1wKCk7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLmRBZGRPZmZzZXQgPSBibnBEQWRkT2Zmc2V0O1xuICAvLyAocHJvdGVjdGVkKSB0aGlzICs9IG4gPDwgdyB3b3JkcywgdGhpcyA+PSAwXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmRBZGRPZmZzZXQgPSBmdW5jdGlvbiAobiwgdykge1xuICAgIGlmIChuID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2hpbGUgKHRoaXMudCA8PSB3KSB7XG4gICAgICB0aGlzW3RoaXMudCsrXSA9IDA7XG4gICAgfVxuICAgIHRoaXNbd10gKz0gbjtcbiAgICB3aGlsZSAodGhpc1t3XSA+PSB0aGlzLkRWKSB7XG4gICAgICB0aGlzW3ddIC09IHRoaXMuRFY7XG4gICAgICBpZiAoKyt3ID49IHRoaXMudCkge1xuICAgICAgICB0aGlzW3RoaXMudCsrXSA9IDA7XG4gICAgICB9XG4gICAgICArK3RoaXNbd107XG4gICAgfVxuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseUxvd2VyVG8gPSBibnBNdWx0aXBseUxvd2VyVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSBsb3dlciBuIHdvcmRzIG9mIFwidGhpcyAqIGFcIiwgYS50IDw9IG5cbiAgLy8gXCJ0aGlzXCIgc2hvdWxkIGJlIHRoZSBsYXJnZXIgb25lIGlmIGFwcHJvcHJpYXRlLlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseUxvd2VyVG8gPSBmdW5jdGlvbiAoYSwgbiwgcikge1xuICAgIHZhciBpID0gTWF0aC5taW4odGhpcy50ICsgYS50LCBuKTtcbiAgICByLnMgPSAwOyAvLyBhc3N1bWVzIGEsdGhpcyA+PSAwXG4gICAgci50ID0gaTtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIHJbLS1pXSA9IDA7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSByLnQgLSB0aGlzLnQ7IGkgPCBqOyArK2kpIHtcbiAgICAgIHJbaSArIHRoaXMudF0gPSB0aGlzLmFtKDAsIGFbaV0sIHIsIGksIDAsIHRoaXMudCk7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSBNYXRoLm1pbihhLnQsIG4pOyBpIDwgajsgKytpKSB7XG4gICAgICB0aGlzLmFtKDAsIGFbaV0sIHIsIGksIDAsIG4gLSBpKTtcbiAgICB9XG4gICAgci5jbGFtcCgpO1xuICB9O1xuICAvLyBCaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseVVwcGVyVG8gPSBibnBNdWx0aXBseVVwcGVyVG87XG4gIC8vIChwcm90ZWN0ZWQpIHIgPSBcInRoaXMgKiBhXCIgd2l0aG91dCBsb3dlciBuIHdvcmRzLCBuID4gMFxuICAvLyBcInRoaXNcIiBzaG91bGQgYmUgdGhlIGxhcmdlciBvbmUgaWYgYXBwcm9wcmlhdGUuXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VXBwZXJUbyA9IGZ1bmN0aW9uIChhLCBuLCByKSB7XG4gICAgLS1uO1xuICAgIHZhciBpID0gci50ID0gdGhpcy50ICsgYS50IC0gbjtcbiAgICByLnMgPSAwOyAvLyBhc3N1bWVzIGEsdGhpcyA+PSAwXG4gICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICByW2ldID0gMDtcbiAgICB9XG4gICAgZm9yIChpID0gTWF0aC5tYXgobiAtIHRoaXMudCwgMCk7IGkgPCBhLnQ7ICsraSkge1xuICAgICAgclt0aGlzLnQgKyBpIC0gbl0gPSB0aGlzLmFtKG4gLSBpLCBhW2ldLCByLCAwLCAwLCB0aGlzLnQgKyBpIC0gbik7XG4gICAgfVxuICAgIHIuY2xhbXAoKTtcbiAgICByLmRyU2hpZnRUbygxLCByKTtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubW9kSW50ID0gYm5wTW9kSW50O1xuICAvLyAocHJvdGVjdGVkKSB0aGlzICUgbiwgbiA8IDJeMjZcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubW9kSW50ID0gZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA8PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdmFyIGQgPSB0aGlzLkRWICUgbjtcbiAgICB2YXIgciA9IHRoaXMucyA8IDAgPyBuIC0gMSA6IDA7XG4gICAgaWYgKHRoaXMudCA+IDApIHtcbiAgICAgIGlmIChkID09IDApIHtcbiAgICAgICAgciA9IHRoaXNbMF0gJSBuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgciA9IChkICogciArIHRoaXNbaV0pICUgbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gQmlnSW50ZWdlci5wcm90b3R5cGUubWlsbGVyUmFiaW4gPSBibnBNaWxsZXJSYWJpbjtcbiAgLy8gKHByb3RlY3RlZCkgdHJ1ZSBpZiBwcm9iYWJseSBwcmltZSAoSEFDIDQuMjQsIE1pbGxlci1SYWJpbilcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUubWlsbGVyUmFiaW4gPSBmdW5jdGlvbiAodCkge1xuICAgIHZhciBuMSA9IHRoaXMuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xuICAgIHZhciBrID0gbjEuZ2V0TG93ZXN0U2V0Qml0KCk7XG4gICAgaWYgKGsgPD0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgciA9IG4xLnNoaWZ0UmlnaHQoayk7XG4gICAgdCA9IHQgKyAxID4+IDE7XG4gICAgaWYgKHQgPiBsb3dwcmltZXMubGVuZ3RoKSB7XG4gICAgICB0ID0gbG93cHJpbWVzLmxlbmd0aDtcbiAgICB9XG4gICAgdmFyIGEgPSBuYmkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHQ7ICsraSkge1xuICAgICAgLy8gUGljayBiYXNlcyBhdCByYW5kb20sIGluc3RlYWQgb2Ygc3RhcnRpbmcgYXQgMlxuICAgICAgYS5mcm9tSW50KGxvd3ByaW1lc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsb3dwcmltZXMubGVuZ3RoKV0pO1xuICAgICAgdmFyIHkgPSBhLm1vZFBvdyhyLCB0aGlzKTtcbiAgICAgIGlmICh5LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgIT0gMCAmJiB5LmNvbXBhcmVUbyhuMSkgIT0gMCkge1xuICAgICAgICB2YXIgaiA9IDE7XG4gICAgICAgIHdoaWxlIChqKysgPCBrICYmIHkuY29tcGFyZVRvKG4xKSAhPSAwKSB7XG4gICAgICAgICAgeSA9IHkubW9kUG93SW50KDIsIHRoaXMpO1xuICAgICAgICAgIGlmICh5LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoeS5jb21wYXJlVG8objEpICE9IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIC8vIEJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZSA9IGJuU3F1YXJlO1xuICAvLyAocHVibGljKSB0aGlzXjJcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuc3F1YXJlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgdGhpcy5zcXVhcmVUbyhyKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8jcmVnaW9uIEFTWU5DXG4gIC8vIFB1YmxpYyBBUEkgbWV0aG9kXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmdjZGEgPSBmdW5jdGlvbiAoYSwgY2FsbGJhY2spIHtcbiAgICB2YXIgeCA9IHRoaXMucyA8IDAgPyB0aGlzLm5lZ2F0ZSgpIDogdGhpcy5jbG9uZSgpO1xuICAgIHZhciB5ID0gYS5zIDwgMCA/IGEubmVnYXRlKCkgOiBhLmNsb25lKCk7XG4gICAgaWYgKHguY29tcGFyZVRvKHkpIDwgMCkge1xuICAgICAgdmFyIHQgPSB4O1xuICAgICAgeCA9IHk7XG4gICAgICB5ID0gdDtcbiAgICB9XG4gICAgdmFyIGkgPSB4LmdldExvd2VzdFNldEJpdCgpO1xuICAgIHZhciBnID0geS5nZXRMb3dlc3RTZXRCaXQoKTtcbiAgICBpZiAoZyA8IDApIHtcbiAgICAgIGNhbGxiYWNrKHgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaSA8IGcpIHtcbiAgICAgIGcgPSBpO1xuICAgIH1cbiAgICBpZiAoZyA+IDApIHtcbiAgICAgIHguclNoaWZ0VG8oZywgeCk7XG4gICAgICB5LnJTaGlmdFRvKGcsIHkpO1xuICAgIH1cbiAgICAvLyBXb3JraG9yc2Ugb2YgdGhlIGFsZ29yaXRobSwgZ2V0cyBjYWxsZWQgMjAwIC0gODAwIHRpbWVzIHBlciA1MTIgYml0IGtleWdlbi5cbiAgICB2YXIgZ2NkYTEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoKGkgPSB4LmdldExvd2VzdFNldEJpdCgpKSA+IDApIHtcbiAgICAgICAgeC5yU2hpZnRUbyhpLCB4KTtcbiAgICAgIH1cbiAgICAgIGlmICgoaSA9IHkuZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkge1xuICAgICAgICB5LnJTaGlmdFRvKGksIHkpO1xuICAgICAgfVxuICAgICAgaWYgKHguY29tcGFyZVRvKHkpID49IDApIHtcbiAgICAgICAgeC5zdWJUbyh5LCB4KTtcbiAgICAgICAgeC5yU2hpZnRUbygxLCB4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHkuc3ViVG8oeCwgeSk7XG4gICAgICAgIHkuclNoaWZ0VG8oMSwgeSk7XG4gICAgICB9XG4gICAgICBpZiAoISh4LnNpZ251bSgpID4gMCkpIHtcbiAgICAgICAgaWYgKGcgPiAwKSB7XG4gICAgICAgICAgeS5sU2hpZnRUbyhnLCB5KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayh5KTtcbiAgICAgICAgfSwgMCk7IC8vIGVzY2FwZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChnY2RhMSwgMCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzZXRUaW1lb3V0KGdjZGExLCAxMCk7XG4gIH07XG4gIC8vIChwcm90ZWN0ZWQpIGFsdGVybmF0ZSBjb25zdHJ1Y3RvclxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tTnVtYmVyQXN5bmMgPSBmdW5jdGlvbiAoYSwgYiwgYywgY2FsbGJhY2spIHtcbiAgICBpZiAoXCJudW1iZXJcIiA9PSB0eXBlb2YgYikge1xuICAgICAgaWYgKGEgPCAyKSB7XG4gICAgICAgIHRoaXMuZnJvbUludCgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZnJvbU51bWJlcihhLCBjKTtcbiAgICAgICAgaWYgKCF0aGlzLnRlc3RCaXQoYSAtIDEpKSB7XG4gICAgICAgICAgdGhpcy5iaXR3aXNlVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEgLSAxKSwgX3V0aWwub3Bfb3IsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRXZlbigpKSB7XG4gICAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KDEsIDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBibnBfMSA9IHRoaXM7XG4gICAgICAgIHZhciBibnBmbjFfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBibnBfMS5kQWRkT2Zmc2V0KDIsIDApO1xuICAgICAgICAgIGlmIChibnBfMS5iaXRMZW5ndGgoKSA+IGEpIHtcbiAgICAgICAgICAgIGJucF8xLnN1YlRvKEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChhIC0gMSksIGJucF8xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJucF8xLmlzUHJvYmFibGVQcmltZShiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9LCAwKTsgLy8gZXNjYXBlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYm5wZm4xXzEsIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChibnBmbjFfMSwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB4ID0gW107XG4gICAgICB2YXIgdCA9IGEgJiA3O1xuICAgICAgeC5sZW5ndGggPSAoYSA+PiAzKSArIDE7XG4gICAgICBiLm5leHRCeXRlcyh4KTtcbiAgICAgIGlmICh0ID4gMCkge1xuICAgICAgICB4WzBdICY9ICgxIDw8IHQpIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhbMF0gPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5mcm9tU3RyaW5nKHgsIDI1Nik7XG4gICAgfVxuICB9O1xuICByZXR1cm4gQmlnSW50ZWdlcjtcbn0oKTtcbi8vI3JlZ2lvbiBSRURVQ0VSU1xuLy8jcmVnaW9uIE51bGxFeHBcbnZhciBOdWxsRXhwID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTnVsbEV4cCgpIHt9XG4gIC8vIE51bGxFeHAucHJvdG90eXBlLmNvbnZlcnQgPSBuTm9wO1xuICBOdWxsRXhwLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbiAgLy8gTnVsbEV4cC5wcm90b3R5cGUucmV2ZXJ0ID0gbk5vcDtcbiAgTnVsbEV4cC5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbiAgLy8gTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBuTXVsVG87XG4gIE51bGxFeHAucHJvdG90eXBlLm11bFRvID0gZnVuY3Rpb24gKHgsIHksIHIpIHtcbiAgICB4Lm11bHRpcGx5VG8oeSwgcik7XG4gIH07XG4gIC8vIE51bGxFeHAucHJvdG90eXBlLnNxclRvID0gblNxclRvO1xuICBOdWxsRXhwLnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XG4gICAgeC5zcXVhcmVUbyhyKTtcbiAgfTtcbiAgcmV0dXJuIE51bGxFeHA7XG59KCk7XG4vLyBNb2R1bGFyIHJlZHVjdGlvbiB1c2luZyBcImNsYXNzaWNcIiBhbGdvcml0aG1cbnZhciBDbGFzc2ljID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2xhc3NpYyhtKSB7XG4gICAgdGhpcy5tID0gbTtcbiAgfVxuICAvLyBDbGFzc2ljLnByb3RvdHlwZS5jb252ZXJ0ID0gY0NvbnZlcnQ7XG4gIENsYXNzaWMucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIGlmICh4LnMgPCAwIHx8IHguY29tcGFyZVRvKHRoaXMubSkgPj0gMCkge1xuICAgICAgcmV0dXJuIHgubW9kKHRoaXMubSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfTtcbiAgLy8gQ2xhc3NpYy5wcm90b3R5cGUucmV2ZXJ0ID0gY1JldmVydDtcbiAgQ2xhc3NpYy5wcm90b3R5cGUucmV2ZXJ0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbiAgLy8gQ2xhc3NpYy5wcm90b3R5cGUucmVkdWNlID0gY1JlZHVjZTtcbiAgQ2xhc3NpYy5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKHgpIHtcbiAgICB4LmRpdlJlbVRvKHRoaXMubSwgbnVsbCwgeCk7XG4gIH07XG4gIC8vIENsYXNzaWMucHJvdG90eXBlLm11bFRvID0gY011bFRvO1xuICBDbGFzc2ljLnByb3RvdHlwZS5tdWxUbyA9IGZ1bmN0aW9uICh4LCB5LCByKSB7XG4gICAgeC5tdWx0aXBseVRvKHksIHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICB9O1xuICAvLyBDbGFzc2ljLnByb3RvdHlwZS5zcXJUbyA9IGNTcXJUbztcbiAgQ2xhc3NpYy5wcm90b3R5cGUuc3FyVG8gPSBmdW5jdGlvbiAoeCwgcikge1xuICAgIHguc3F1YXJlVG8ocik7XG4gICAgdGhpcy5yZWR1Y2Uocik7XG4gIH07XG4gIHJldHVybiBDbGFzc2ljO1xufSgpO1xuLy8jZW5kcmVnaW9uXG4vLyNyZWdpb24gTW9udGdvbWVyeVxuLy8gTW9udGdvbWVyeSByZWR1Y3Rpb25cbnZhciBNb250Z29tZXJ5ID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTW9udGdvbWVyeShtKSB7XG4gICAgdGhpcy5tID0gbTtcbiAgICB0aGlzLm1wID0gbS5pbnZEaWdpdCgpO1xuICAgIHRoaXMubXBsID0gdGhpcy5tcCAmIDB4N2ZmZjtcbiAgICB0aGlzLm1waCA9IHRoaXMubXAgPj4gMTU7XG4gICAgdGhpcy51bSA9ICgxIDw8IG0uREIgLSAxNSkgLSAxO1xuICAgIHRoaXMubXQyID0gMiAqIG0udDtcbiAgfVxuICAvLyBNb250Z29tZXJ5LnByb3RvdHlwZS5jb252ZXJ0ID0gbW9udENvbnZlcnQ7XG4gIC8vIHhSIG1vZCBtXG4gIE1vbnRnb21lcnkucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHZhciByID0gbmJpKCk7XG4gICAgeC5hYnMoKS5kbFNoaWZ0VG8odGhpcy5tLnQsIHIpO1xuICAgIHIuZGl2UmVtVG8odGhpcy5tLCBudWxsLCByKTtcbiAgICBpZiAoeC5zIDwgMCAmJiByLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLlpFUk8pID4gMCkge1xuICAgICAgdGhpcy5tLnN1YlRvKHIsIHIpO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gTW9udGdvbWVyeS5wcm90b3R5cGUucmV2ZXJ0ID0gbW9udFJldmVydDtcbiAgLy8geC9SIG1vZCBtXG4gIE1vbnRnb21lcnkucHJvdG90eXBlLnJldmVydCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgdmFyIHIgPSBuYmkoKTtcbiAgICB4LmNvcHlUbyhyKTtcbiAgICB0aGlzLnJlZHVjZShyKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcbiAgLy8gTW9udGdvbWVyeS5wcm90b3R5cGUucmVkdWNlID0gbW9udFJlZHVjZTtcbiAgLy8geCA9IHgvUiBtb2QgbSAoSEFDIDE0LjMyKVxuICBNb250Z29tZXJ5LnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoeCkge1xuICAgIHdoaWxlICh4LnQgPD0gdGhpcy5tdDIpIHtcbiAgICAgIC8vIHBhZCB4IHNvIGFtIGhhcyBlbm91Z2ggcm9vbSBsYXRlclxuICAgICAgeFt4LnQrK10gPSAwO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubS50OyArK2kpIHtcbiAgICAgIC8vIGZhc3RlciB3YXkgb2YgY2FsY3VsYXRpbmcgdTAgPSB4W2ldKm1wIG1vZCBEVlxuICAgICAgdmFyIGogPSB4W2ldICYgMHg3ZmZmO1xuICAgICAgdmFyIHUwID0gaiAqIHRoaXMubXBsICsgKChqICogdGhpcy5tcGggKyAoeFtpXSA+PiAxNSkgKiB0aGlzLm1wbCAmIHRoaXMudW0pIDw8IDE1KSAmIHguRE07XG4gICAgICAvLyB1c2UgYW0gdG8gY29tYmluZSB0aGUgbXVsdGlwbHktc2hpZnQtYWRkIGludG8gb25lIGNhbGxcbiAgICAgIGogPSBpICsgdGhpcy5tLnQ7XG4gICAgICB4W2pdICs9IHRoaXMubS5hbSgwLCB1MCwgeCwgaSwgMCwgdGhpcy5tLnQpO1xuICAgICAgLy8gcHJvcGFnYXRlIGNhcnJ5XG4gICAgICB3aGlsZSAoeFtqXSA+PSB4LkRWKSB7XG4gICAgICAgIHhbal0gLT0geC5EVjtcbiAgICAgICAgeFsrK2pdKys7XG4gICAgICB9XG4gICAgfVxuICAgIHguY2xhbXAoKTtcbiAgICB4LmRyU2hpZnRUbyh0aGlzLm0udCwgeCk7XG4gICAgaWYgKHguY29tcGFyZVRvKHRoaXMubSkgPj0gMCkge1xuICAgICAgeC5zdWJUbyh0aGlzLm0sIHgpO1xuICAgIH1cbiAgfTtcbiAgLy8gTW9udGdvbWVyeS5wcm90b3R5cGUubXVsVG8gPSBtb250TXVsVG87XG4gIC8vIHIgPSBcInh5L1IgbW9kIG1cIjsgeCx5ICE9IHJcbiAgTW9udGdvbWVyeS5wcm90b3R5cGUubXVsVG8gPSBmdW5jdGlvbiAoeCwgeSwgcikge1xuICAgIHgubXVsdGlwbHlUbyh5LCByKTtcbiAgICB0aGlzLnJlZHVjZShyKTtcbiAgfTtcbiAgLy8gTW9udGdvbWVyeS5wcm90b3R5cGUuc3FyVG8gPSBtb250U3FyVG87XG4gIC8vIHIgPSBcInheMi9SIG1vZCBtXCI7IHggIT0gclxuICBNb250Z29tZXJ5LnByb3RvdHlwZS5zcXJUbyA9IGZ1bmN0aW9uICh4LCByKSB7XG4gICAgeC5zcXVhcmVUbyhyKTtcbiAgICB0aGlzLnJlZHVjZShyKTtcbiAgfTtcbiAgcmV0dXJuIE1vbnRnb21lcnk7XG59KCk7XG4vLyNlbmRyZWdpb24gTW9udGdvbWVyeVxuLy8jcmVnaW9uIEJhcnJldHRcbi8vIEJhcnJldHQgbW9kdWxhciByZWR1Y3Rpb25cbnZhciBCYXJyZXR0ID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmFycmV0dChtKSB7XG4gICAgdGhpcy5tID0gbTtcbiAgICAvLyBzZXR1cCBCYXJyZXR0XG4gICAgdGhpcy5yMiA9IG5iaSgpO1xuICAgIHRoaXMucTMgPSBuYmkoKTtcbiAgICBCaWdJbnRlZ2VyLk9ORS5kbFNoaWZ0VG8oMiAqIG0udCwgdGhpcy5yMik7XG4gICAgdGhpcy5tdSA9IHRoaXMucjIuZGl2aWRlKG0pO1xuICB9XG4gIC8vIEJhcnJldHQucHJvdG90eXBlLmNvbnZlcnQgPSBiYXJyZXR0Q29udmVydDtcbiAgQmFycmV0dC5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgaWYgKHgucyA8IDAgfHwgeC50ID4gMiAqIHRoaXMubS50KSB7XG4gICAgICByZXR1cm4geC5tb2QodGhpcy5tKTtcbiAgICB9IGVsc2UgaWYgKHguY29tcGFyZVRvKHRoaXMubSkgPCAwKSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHIgPSBuYmkoKTtcbiAgICAgIHguY29weVRvKHIpO1xuICAgICAgdGhpcy5yZWR1Y2Uocik7XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG4gIH07XG4gIC8vIEJhcnJldHQucHJvdG90eXBlLnJldmVydCA9IGJhcnJldHRSZXZlcnQ7XG4gIEJhcnJldHQucHJvdG90eXBlLnJldmVydCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG4gIC8vIEJhcnJldHQucHJvdG90eXBlLnJlZHVjZSA9IGJhcnJldHRSZWR1Y2U7XG4gIC8vIHggPSB4IG1vZCBtIChIQUMgMTQuNDIpXG4gIEJhcnJldHQucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgeC5kclNoaWZ0VG8odGhpcy5tLnQgLSAxLCB0aGlzLnIyKTtcbiAgICBpZiAoeC50ID4gdGhpcy5tLnQgKyAxKSB7XG4gICAgICB4LnQgPSB0aGlzLm0udCArIDE7XG4gICAgICB4LmNsYW1wKCk7XG4gICAgfVxuICAgIHRoaXMubXUubXVsdGlwbHlVcHBlclRvKHRoaXMucjIsIHRoaXMubS50ICsgMSwgdGhpcy5xMyk7XG4gICAgdGhpcy5tLm11bHRpcGx5TG93ZXJUbyh0aGlzLnEzLCB0aGlzLm0udCArIDEsIHRoaXMucjIpO1xuICAgIHdoaWxlICh4LmNvbXBhcmVUbyh0aGlzLnIyKSA8IDApIHtcbiAgICAgIHguZEFkZE9mZnNldCgxLCB0aGlzLm0udCArIDEpO1xuICAgIH1cbiAgICB4LnN1YlRvKHRoaXMucjIsIHgpO1xuICAgIHdoaWxlICh4LmNvbXBhcmVUbyh0aGlzLm0pID49IDApIHtcbiAgICAgIHguc3ViVG8odGhpcy5tLCB4KTtcbiAgICB9XG4gIH07XG4gIC8vIEJhcnJldHQucHJvdG90eXBlLm11bFRvID0gYmFycmV0dE11bFRvO1xuICAvLyByID0geCp5IG1vZCBtOyB4LHkgIT0gclxuICBCYXJyZXR0LnByb3RvdHlwZS5tdWxUbyA9IGZ1bmN0aW9uICh4LCB5LCByKSB7XG4gICAgeC5tdWx0aXBseVRvKHksIHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICB9O1xuICAvLyBCYXJyZXR0LnByb3RvdHlwZS5zcXJUbyA9IGJhcnJldHRTcXJUbztcbiAgLy8gciA9IHheMiBtb2QgbTsgeCAhPSByXG4gIEJhcnJldHQucHJvdG90eXBlLnNxclRvID0gZnVuY3Rpb24gKHgsIHIpIHtcbiAgICB4LnNxdWFyZVRvKHIpO1xuICAgIHRoaXMucmVkdWNlKHIpO1xuICB9O1xuICByZXR1cm4gQmFycmV0dDtcbn0oKTtcbi8vI2VuZHJlZ2lvblxuLy8jZW5kcmVnaW9uIFJFRFVDRVJTXG4vLyByZXR1cm4gbmV3LCB1bnNldCBCaWdJbnRlZ2VyXG5mdW5jdGlvbiBuYmkoKSB7XG4gIHJldHVybiBuZXcgQmlnSW50ZWdlcihudWxsKTtcbn1cbmZ1bmN0aW9uIHBhcnNlQmlnSW50KHN0ciwgcikge1xuICByZXR1cm4gbmV3IEJpZ0ludGVnZXIoc3RyLCByKTtcbn1cbi8vIGFtOiBDb21wdXRlIHdfaiArPSAoeCp0aGlzX2kpLCBwcm9wYWdhdGUgY2Fycmllcyxcbi8vIGMgaXMgaW5pdGlhbCBjYXJyeSwgcmV0dXJucyBmaW5hbCBjYXJyeS5cbi8vIGMgPCAzKmR2YWx1ZSwgeCA8IDIqZHZhbHVlLCB0aGlzX2kgPCBkdmFsdWVcbi8vIFdlIG5lZWQgdG8gc2VsZWN0IHRoZSBmYXN0ZXN0IG9uZSB0aGF0IHdvcmtzIGluIHRoaXMgZW52aXJvbm1lbnQuXG52YXIgaW5Ccm93c2VyID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIjtcbmlmIChpbkJyb3dzZXIgJiYgal9sbSAmJiBuYXZpZ2F0b3IuYXBwTmFtZSA9PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiKSB7XG4gIC8vIGFtMiBhdm9pZHMgYSBiaWcgbXVsdC1hbmQtZXh0cmFjdCBjb21wbGV0ZWx5LlxuICAvLyBNYXggZGlnaXQgYml0cyBzaG91bGQgYmUgPD0gMzAgYmVjYXVzZSB3ZSBkbyBiaXR3aXNlIG9wc1xuICAvLyBvbiB2YWx1ZXMgdXAgdG8gMipoZHZhbHVlXjItaGR2YWx1ZS0xICg8IDJeMzEpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFtID0gZnVuY3Rpb24gYW0yKGksIHgsIHcsIGosIGMsIG4pIHtcbiAgICB2YXIgeGwgPSB4ICYgMHg3ZmZmO1xuICAgIHZhciB4aCA9IHggPj4gMTU7XG4gICAgd2hpbGUgKC0tbiA+PSAwKSB7XG4gICAgICB2YXIgbCA9IHRoaXNbaV0gJiAweDdmZmY7XG4gICAgICB2YXIgaCA9IHRoaXNbaSsrXSA+PiAxNTtcbiAgICAgIHZhciBtID0geGggKiBsICsgaCAqIHhsO1xuICAgICAgbCA9IHhsICogbCArICgobSAmIDB4N2ZmZikgPDwgMTUpICsgd1tqXSArIChjICYgMHgzZmZmZmZmZik7XG4gICAgICBjID0gKGwgPj4+IDMwKSArIChtID4+PiAxNSkgKyB4aCAqIGggKyAoYyA+Pj4gMzApO1xuICAgICAgd1tqKytdID0gbCAmIDB4M2ZmZmZmZmY7XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9O1xuICBkYml0cyA9IDMwO1xufSBlbHNlIGlmIChpbkJyb3dzZXIgJiYgal9sbSAmJiBuYXZpZ2F0b3IuYXBwTmFtZSAhPSBcIk5ldHNjYXBlXCIpIHtcbiAgLy8gYW0xOiB1c2UgYSBzaW5nbGUgbXVsdCBhbmQgZGl2aWRlIHRvIGdldCB0aGUgaGlnaCBiaXRzLFxuICAvLyBtYXggZGlnaXQgYml0cyBzaG91bGQgYmUgMjYgYmVjYXVzZVxuICAvLyBtYXggaW50ZXJuYWwgdmFsdWUgPSAyKmR2YWx1ZV4yLTIqZHZhbHVlICg8IDJeNTMpXG4gIEJpZ0ludGVnZXIucHJvdG90eXBlLmFtID0gZnVuY3Rpb24gYW0xKGksIHgsIHcsIGosIGMsIG4pIHtcbiAgICB3aGlsZSAoLS1uID49IDApIHtcbiAgICAgIHZhciB2ID0geCAqIHRoaXNbaSsrXSArIHdbal0gKyBjO1xuICAgICAgYyA9IE1hdGguZmxvb3IodiAvIDB4NDAwMDAwMCk7XG4gICAgICB3W2orK10gPSB2ICYgMHgzZmZmZmZmO1xuICAgIH1cbiAgICByZXR1cm4gYztcbiAgfTtcbiAgZGJpdHMgPSAyNjtcbn0gZWxzZSB7XG4gIC8vIE1vemlsbGEvTmV0c2NhcGUgc2VlbXMgdG8gcHJlZmVyIGFtM1xuICAvLyBBbHRlcm5hdGVseSwgc2V0IG1heCBkaWdpdCBiaXRzIHRvIDI4IHNpbmNlIHNvbWVcbiAgLy8gYnJvd3NlcnMgc2xvdyBkb3duIHdoZW4gZGVhbGluZyB3aXRoIDMyLWJpdCBudW1iZXJzLlxuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbSA9IGZ1bmN0aW9uIGFtMyhpLCB4LCB3LCBqLCBjLCBuKSB7XG4gICAgdmFyIHhsID0geCAmIDB4M2ZmZjtcbiAgICB2YXIgeGggPSB4ID4+IDE0O1xuICAgIHdoaWxlICgtLW4gPj0gMCkge1xuICAgICAgdmFyIGwgPSB0aGlzW2ldICYgMHgzZmZmO1xuICAgICAgdmFyIGggPSB0aGlzW2krK10gPj4gMTQ7XG4gICAgICB2YXIgbSA9IHhoICogbCArIGggKiB4bDtcbiAgICAgIGwgPSB4bCAqIGwgKyAoKG0gJiAweDNmZmYpIDw8IDE0KSArIHdbal0gKyBjO1xuICAgICAgYyA9IChsID4+IDI4KSArIChtID4+IDE0KSArIHhoICogaDtcbiAgICAgIHdbaisrXSA9IGwgJiAweGZmZmZmZmY7XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9O1xuICBkYml0cyA9IDI4O1xufVxuQmlnSW50ZWdlci5wcm90b3R5cGUuREIgPSBkYml0cztcbkJpZ0ludGVnZXIucHJvdG90eXBlLkRNID0gKDEgPDwgZGJpdHMpIC0gMTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLkRWID0gMSA8PCBkYml0cztcbnZhciBCSV9GUCA9IDUyO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuRlYgPSBNYXRoLnBvdygyLCBCSV9GUCk7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5GMSA9IEJJX0ZQIC0gZGJpdHM7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5GMiA9IDIgKiBkYml0cyAtIEJJX0ZQO1xuLy8gRGlnaXQgY29udmVyc2lvbnNcbnZhciBCSV9SQyA9IFtdO1xudmFyIHJyO1xudmFyIHZ2O1xucnIgPSBcIjBcIi5jaGFyQ29kZUF0KDApO1xuZm9yICh2diA9IDA7IHZ2IDw9IDk7ICsrdnYpIHtcbiAgQklfUkNbcnIrK10gPSB2djtcbn1cbnJyID0gXCJhXCIuY2hhckNvZGVBdCgwKTtcbmZvciAodnYgPSAxMDsgdnYgPCAzNjsgKyt2dikge1xuICBCSV9SQ1tycisrXSA9IHZ2O1xufVxucnIgPSBcIkFcIi5jaGFyQ29kZUF0KDApO1xuZm9yICh2diA9IDEwOyB2diA8IDM2OyArK3Z2KSB7XG4gIEJJX1JDW3JyKytdID0gdnY7XG59XG5mdW5jdGlvbiBpbnRBdChzLCBpKSB7XG4gIHZhciBjID0gQklfUkNbcy5jaGFyQ29kZUF0KGkpXTtcbiAgcmV0dXJuIGMgPT0gbnVsbCA/IC0xIDogYztcbn1cbi8vIHJldHVybiBiaWdpbnQgaW5pdGlhbGl6ZWQgdG8gdmFsdWVcbmZ1bmN0aW9uIG5idihpKSB7XG4gIHZhciByID0gbmJpKCk7XG4gIHIuZnJvbUludChpKTtcbiAgcmV0dXJuIHI7XG59XG4vLyByZXR1cm5zIGJpdCBsZW5ndGggb2YgdGhlIGludGVnZXIgeFxuZnVuY3Rpb24gbmJpdHMoeCkge1xuICB2YXIgciA9IDE7XG4gIHZhciB0O1xuICBpZiAoKHQgPSB4ID4+PiAxNikgIT0gMCkge1xuICAgIHggPSB0O1xuICAgIHIgKz0gMTY7XG4gIH1cbiAgaWYgKCh0ID0geCA+PiA4KSAhPSAwKSB7XG4gICAgeCA9IHQ7XG4gICAgciArPSA4O1xuICB9XG4gIGlmICgodCA9IHggPj4gNCkgIT0gMCkge1xuICAgIHggPSB0O1xuICAgIHIgKz0gNDtcbiAgfVxuICBpZiAoKHQgPSB4ID4+IDIpICE9IDApIHtcbiAgICB4ID0gdDtcbiAgICByICs9IDI7XG4gIH1cbiAgaWYgKCh0ID0geCA+PiAxKSAhPSAwKSB7XG4gICAgeCA9IHQ7XG4gICAgciArPSAxO1xuICB9XG4gIHJldHVybiByO1xufVxuLy8gXCJjb25zdGFudHNcIlxuQmlnSW50ZWdlci5aRVJPID0gbmJ2KDApO1xuQmlnSW50ZWdlci5PTkUgPSBuYnYoMSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFyY2ZvdXIgPSB2b2lkIDA7XG5leHBvcnRzLnBybmdfbmV3c3RhdGUgPSBwcm5nX25ld3N0YXRlO1xuZXhwb3J0cy5ybmdfcHNpemUgPSB2b2lkIDA7XG4vLyBwcm5nNC5qcyAtIHVzZXMgQXJjZm91ciBhcyBhIFBSTkdcbnZhciBBcmNmb3VyID0gZXhwb3J0cy5BcmNmb3VyID0gLyoqIEBjbGFzcyAqL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXJjZm91cigpIHtcbiAgICB0aGlzLmkgPSAwO1xuICAgIHRoaXMuaiA9IDA7XG4gICAgdGhpcy5TID0gW107XG4gIH1cbiAgLy8gQXJjZm91ci5wcm90b3R5cGUuaW5pdCA9IEFSQzRpbml0O1xuICAvLyBJbml0aWFsaXplIGFyY2ZvdXIgY29udGV4dCBmcm9tIGtleSwgYW4gYXJyYXkgb2YgaW50cywgZWFjaCBmcm9tIFswLi4yNTVdXG4gIEFyY2ZvdXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICB0aGlzLlNbaV0gPSBpO1xuICAgIH1cbiAgICBqID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgIGogPSBqICsgdGhpcy5TW2ldICsga2V5W2kgJSBrZXkubGVuZ3RoXSAmIDI1NTtcbiAgICAgIHQgPSB0aGlzLlNbaV07XG4gICAgICB0aGlzLlNbaV0gPSB0aGlzLlNbal07XG4gICAgICB0aGlzLlNbal0gPSB0O1xuICAgIH1cbiAgICB0aGlzLmkgPSAwO1xuICAgIHRoaXMuaiA9IDA7XG4gIH07XG4gIC8vIEFyY2ZvdXIucHJvdG90eXBlLm5leHQgPSBBUkM0bmV4dDtcbiAgQXJjZm91ci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdDtcbiAgICB0aGlzLmkgPSB0aGlzLmkgKyAxICYgMjU1O1xuICAgIHRoaXMuaiA9IHRoaXMuaiArIHRoaXMuU1t0aGlzLmldICYgMjU1O1xuICAgIHQgPSB0aGlzLlNbdGhpcy5pXTtcbiAgICB0aGlzLlNbdGhpcy5pXSA9IHRoaXMuU1t0aGlzLmpdO1xuICAgIHRoaXMuU1t0aGlzLmpdID0gdDtcbiAgICByZXR1cm4gdGhpcy5TW3QgKyB0aGlzLlNbdGhpcy5pXSAmIDI1NV07XG4gIH07XG4gIHJldHVybiBBcmNmb3VyO1xufSgpO1xuLy8gUGx1ZyBpbiB5b3VyIFJORyBjb25zdHJ1Y3RvciBoZXJlXG5mdW5jdGlvbiBwcm5nX25ld3N0YXRlKCkge1xuICByZXR1cm4gbmV3IEFyY2ZvdXIoKTtcbn1cbi8vIFBvb2wgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCBhbmQgZ3JlYXRlciB0aGFuIDMyLlxuLy8gQW4gYXJyYXkgb2YgYnl0ZXMgdGhlIHNpemUgb2YgdGhlIHBvb2wgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpXG52YXIgcm5nX3BzaXplID0gZXhwb3J0cy5ybmdfcHNpemUgPSAyNTY7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNlY3VyZVJhbmRvbSA9IHZvaWQgMDtcbnZhciBfcHJuZyA9IHJlcXVpcmUoXCIuL3Bybmc0XCIpO1xuLy8gUmFuZG9tIG51bWJlciBnZW5lcmF0b3IgLSByZXF1aXJlcyBhIFBSTkcgYmFja2VuZCwgZS5nLiBwcm5nNC5qc1xuXG52YXIgcm5nX3N0YXRlO1xudmFyIHJuZ19wb29sID0gbnVsbDtcbnZhciBybmdfcHB0cjtcbi8vIEluaXRpYWxpemUgdGhlIHBvb2wgd2l0aCBqdW5rIGlmIG5lZWRlZC5cbmlmIChybmdfcG9vbCA9PSBudWxsKSB7XG4gIHJuZ19wb29sID0gW107XG4gIHJuZ19wcHRyID0gMDtcbiAgdmFyIHQgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvICYmIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gRXh0cmFjdCBlbnRyb3B5ICgyMDQ4IGJpdHMpIGZyb20gUk5HIGlmIGF2YWlsYWJsZVxuICAgIHZhciB6ID0gbmV3IFVpbnQzMkFycmF5KDI1Nik7XG4gICAgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoeik7XG4gICAgZm9yICh0ID0gMDsgdCA8IHoubGVuZ3RoOyArK3QpIHtcbiAgICAgIHJuZ19wb29sW3JuZ19wcHRyKytdID0gelt0XSAmIDI1NTtcbiAgICB9XG4gIH1cbiAgLy8gVXNlIG1vdXNlIGV2ZW50cyBmb3IgZW50cm9weSwgaWYgd2UgZG8gbm90IGhhdmUgZW5vdWdoIGVudHJvcHkgYnkgdGhlIHRpbWVcbiAgLy8gd2UgbmVlZCBpdCwgZW50cm9weSB3aWxsIGJlIGdlbmVyYXRlZCBieSBNYXRoLnJhbmRvbS5cbiAgdmFyIGNvdW50ID0gMDtcbiAgdmFyIG9uTW91c2VNb3ZlTGlzdGVuZXJfMSA9IGZ1bmN0aW9uIChldikge1xuICAgIGNvdW50ID0gY291bnQgfHwgMDtcbiAgICBpZiAoY291bnQgPj0gMjU2IHx8IHJuZ19wcHRyID49IF9wcm5nLnJuZ19wc2l6ZSkge1xuICAgICAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlTGlzdGVuZXJfMSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZGV0YWNoRXZlbnQpIHtcbiAgICAgICAgd2luZG93LmRldGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtb3VzZUNvb3JkaW5hdGVzID0gZXYueCArIGV2Lnk7XG4gICAgICBybmdfcG9vbFtybmdfcHB0cisrXSA9IG1vdXNlQ29vcmRpbmF0ZXMgJiAyNTU7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFNvbWV0aW1lcyBGaXJlZm94IHdpbGwgZGVueSBwZXJtaXNzaW9uIHRvIGFjY2VzcyBldmVudCBwcm9wZXJ0aWVzIGZvciBzb21lIHJlYXNvbi4gSWdub3JlLlxuICAgIH1cbiAgfTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZUxpc3RlbmVyXzEsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcl8xKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHJuZ19nZXRfYnl0ZSgpIHtcbiAgaWYgKHJuZ19zdGF0ZSA9PSBudWxsKSB7XG4gICAgcm5nX3N0YXRlID0gKDAsIF9wcm5nLnBybmdfbmV3c3RhdGUpKCk7XG4gICAgLy8gQXQgdGhpcyBwb2ludCwgd2UgbWF5IG5vdCBoYXZlIGNvbGxlY3RlZCBlbm91Z2ggZW50cm9weS4gIElmIG5vdCwgZmFsbCBiYWNrIHRvIE1hdGgucmFuZG9tXG4gICAgd2hpbGUgKHJuZ19wcHRyIDwgX3Bybmcucm5nX3BzaXplKSB7XG4gICAgICB2YXIgcmFuZG9tID0gTWF0aC5mbG9vcig2NTUzNiAqIE1hdGgucmFuZG9tKCkpO1xuICAgICAgcm5nX3Bvb2xbcm5nX3BwdHIrK10gPSByYW5kb20gJiAyNTU7XG4gICAgfVxuICAgIHJuZ19zdGF0ZS5pbml0KHJuZ19wb29sKTtcbiAgICBmb3IgKHJuZ19wcHRyID0gMDsgcm5nX3BwdHIgPCBybmdfcG9vbC5sZW5ndGg7ICsrcm5nX3BwdHIpIHtcbiAgICAgIHJuZ19wb29sW3JuZ19wcHRyXSA9IDA7XG4gICAgfVxuICAgIHJuZ19wcHRyID0gMDtcbiAgfVxuICAvLyBUT0RPOiBhbGxvdyByZXNlZWRpbmcgYWZ0ZXIgZmlyc3QgcmVxdWVzdFxuICByZXR1cm4gcm5nX3N0YXRlLm5leHQoKTtcbn1cbnZhciBTZWN1cmVSYW5kb20gPSBleHBvcnRzLlNlY3VyZVJhbmRvbSA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlY3VyZVJhbmRvbSgpIHt9XG4gIFNlY3VyZVJhbmRvbS5wcm90b3R5cGUubmV4dEJ5dGVzID0gZnVuY3Rpb24gKGJhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYS5sZW5ndGg7ICsraSkge1xuICAgICAgYmFbaV0gPSBybmdfZ2V0X2J5dGUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBTZWN1cmVSYW5kb207XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlJTQUtleSA9IHZvaWQgMDtcbnZhciBfanNibiA9IHJlcXVpcmUoXCIuL2pzYm5cIik7XG52YXIgX3JuZyA9IHJlcXVpcmUoXCIuL3JuZ1wiKTtcbi8vIERlcGVuZHMgb24ganNibi5qcyBhbmQgcm5nLmpzXG4vLyBWZXJzaW9uIDEuMTogc3VwcG9ydCB1dGYtOCBlbmNvZGluZyBpbiBwa2NzMXBhZDJcbi8vIGNvbnZlcnQgYSAoaGV4KSBzdHJpbmcgdG8gYSBiaWdudW0gb2JqZWN0XG5cbi8vIGZ1bmN0aW9uIGxpbmVicmsocyxuKSB7XG4vLyAgIHZhciByZXQgPSBcIlwiO1xuLy8gICB2YXIgaSA9IDA7XG4vLyAgIHdoaWxlKGkgKyBuIDwgcy5sZW5ndGgpIHtcbi8vICAgICByZXQgKz0gcy5zdWJzdHJpbmcoaSxpK24pICsgXCJcXG5cIjtcbi8vICAgICBpICs9IG47XG4vLyAgIH1cbi8vICAgcmV0dXJuIHJldCArIHMuc3Vic3RyaW5nKGkscy5sZW5ndGgpO1xuLy8gfVxuLy8gZnVuY3Rpb24gYnl0ZTJIZXgoYikge1xuLy8gICBpZihiIDwgMHgxMClcbi8vICAgICByZXR1cm4gXCIwXCIgKyBiLnRvU3RyaW5nKDE2KTtcbi8vICAgZWxzZVxuLy8gICAgIHJldHVybiBiLnRvU3RyaW5nKDE2KTtcbi8vIH1cbmZ1bmN0aW9uIHBrY3MxcGFkMShzLCBuKSB7XG4gIGlmIChuIDwgcy5sZW5ndGggKyAyMikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJNZXNzYWdlIHRvbyBsb25nIGZvciBSU0FcIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGxlbiA9IG4gLSBzLmxlbmd0aCAtIDY7XG4gIHZhciBmaWxsZXIgPSBcIlwiO1xuICBmb3IgKHZhciBmID0gMDsgZiA8IGxlbjsgZiArPSAyKSB7XG4gICAgZmlsbGVyICs9IFwiZmZcIjtcbiAgfVxuICB2YXIgbSA9IFwiMDAwMVwiICsgZmlsbGVyICsgXCIwMFwiICsgcztcbiAgcmV0dXJuICgwLCBfanNibi5wYXJzZUJpZ0ludCkobSwgMTYpO1xufVxuLy8gUEtDUyMxICh0eXBlIDIsIHJhbmRvbSkgcGFkIGlucHV0IHN0cmluZyBzIHRvIG4gYnl0ZXMsIGFuZCByZXR1cm4gYSBiaWdpbnRcbmZ1bmN0aW9uIHBrY3MxcGFkMihzLCBuKSB7XG4gIGlmIChuIDwgcy5sZW5ndGggKyAxMSkge1xuICAgIC8vIFRPRE86IGZpeCBmb3IgdXRmLThcbiAgICBjb25zb2xlLmVycm9yKFwiTWVzc2FnZSB0b28gbG9uZyBmb3IgUlNBXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBiYSA9IFtdO1xuICB2YXIgaSA9IHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGkgPj0gMCAmJiBuID4gMCkge1xuICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KGktLSk7XG4gICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgIC8vIGVuY29kZSB1c2luZyB1dGYtOFxuICAgICAgYmFbLS1uXSA9IGM7XG4gICAgfSBlbHNlIGlmIChjID4gMTI3ICYmIGMgPCAyMDQ4KSB7XG4gICAgICBiYVstLW5dID0gYyAmIDYzIHwgMTI4O1xuICAgICAgYmFbLS1uXSA9IGMgPj4gNiB8IDE5MjtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFbLS1uXSA9IGMgJiA2MyB8IDEyODtcbiAgICAgIGJhWy0tbl0gPSBjID4+IDYgJiA2MyB8IDEyODtcbiAgICAgIGJhWy0tbl0gPSBjID4+IDEyIHwgMjI0O1xuICAgIH1cbiAgfVxuICBiYVstLW5dID0gMDtcbiAgdmFyIHJuZyA9IG5ldyBfcm5nLlNlY3VyZVJhbmRvbSgpO1xuICB2YXIgeCA9IFtdO1xuICB3aGlsZSAobiA+IDIpIHtcbiAgICAvLyByYW5kb20gbm9uLXplcm8gcGFkXG4gICAgeFswXSA9IDA7XG4gICAgd2hpbGUgKHhbMF0gPT0gMCkge1xuICAgICAgcm5nLm5leHRCeXRlcyh4KTtcbiAgICB9XG4gICAgYmFbLS1uXSA9IHhbMF07XG4gIH1cbiAgYmFbLS1uXSA9IDI7XG4gIGJhWy0tbl0gPSAwO1xuICByZXR1cm4gbmV3IF9qc2JuLkJpZ0ludGVnZXIoYmEpO1xufVxuLy8gXCJlbXB0eVwiIFJTQSBrZXkgY29uc3RydWN0b3JcbnZhciBSU0FLZXkgPSBleHBvcnRzLlJTQUtleSA9IC8qKiBAY2xhc3MgKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFJTQUtleSgpIHtcbiAgICB0aGlzLm4gPSBudWxsO1xuICAgIHRoaXMuZSA9IDA7XG4gICAgdGhpcy5kID0gbnVsbDtcbiAgICB0aGlzLnAgPSBudWxsO1xuICAgIHRoaXMucSA9IG51bGw7XG4gICAgdGhpcy5kbXAxID0gbnVsbDtcbiAgICB0aGlzLmRtcTEgPSBudWxsO1xuICAgIHRoaXMuY29lZmYgPSBudWxsO1xuICB9XG4gIC8vI3JlZ2lvbiBQUk9URUNURURcbiAgLy8gcHJvdGVjdGVkXG4gIC8vIFJTQUtleS5wcm90b3R5cGUuZG9QdWJsaWMgPSBSU0FEb1B1YmxpYztcbiAgLy8gUGVyZm9ybSByYXcgcHVibGljIG9wZXJhdGlvbiBvbiBcInhcIjogcmV0dXJuIHheZSAobW9kIG4pXG4gIFJTQUtleS5wcm90b3R5cGUuZG9QdWJsaWMgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4Lm1vZFBvd0ludCh0aGlzLmUsIHRoaXMubik7XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuZG9Qcml2YXRlID0gUlNBRG9Qcml2YXRlO1xuICAvLyBQZXJmb3JtIHJhdyBwcml2YXRlIG9wZXJhdGlvbiBvbiBcInhcIjogcmV0dXJuIHheZCAobW9kIG4pXG4gIFJTQUtleS5wcm90b3R5cGUuZG9Qcml2YXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgICBpZiAodGhpcy5wID09IG51bGwgfHwgdGhpcy5xID09IG51bGwpIHtcbiAgICAgIHJldHVybiB4Lm1vZFBvdyh0aGlzLmQsIHRoaXMubik7XG4gICAgfVxuICAgIC8vIFRPRE86IHJlLWNhbGN1bGF0ZSBhbnkgbWlzc2luZyBDUlQgcGFyYW1zXG4gICAgdmFyIHhwID0geC5tb2QodGhpcy5wKS5tb2RQb3codGhpcy5kbXAxLCB0aGlzLnApO1xuICAgIHZhciB4cSA9IHgubW9kKHRoaXMucSkubW9kUG93KHRoaXMuZG1xMSwgdGhpcy5xKTtcbiAgICB3aGlsZSAoeHAuY29tcGFyZVRvKHhxKSA8IDApIHtcbiAgICAgIHhwID0geHAuYWRkKHRoaXMucCk7XG4gICAgfVxuICAgIHJldHVybiB4cC5zdWJ0cmFjdCh4cSkubXVsdGlwbHkodGhpcy5jb2VmZikubW9kKHRoaXMucCkubXVsdGlwbHkodGhpcy5xKS5hZGQoeHEpO1xuICB9O1xuICAvLyNlbmRyZWdpb24gUFJPVEVDVEVEXG4gIC8vI3JlZ2lvbiBQVUJMSUNcbiAgLy8gUlNBS2V5LnByb3RvdHlwZS5zZXRQdWJsaWMgPSBSU0FTZXRQdWJsaWM7XG4gIC8vIFNldCB0aGUgcHVibGljIGtleSBmaWVsZHMgTiBhbmQgZSBmcm9tIGhleCBzdHJpbmdzXG4gIFJTQUtleS5wcm90b3R5cGUuc2V0UHVibGljID0gZnVuY3Rpb24gKE4sIEUpIHtcbiAgICBpZiAoTiAhPSBudWxsICYmIEUgIT0gbnVsbCAmJiBOLmxlbmd0aCA+IDAgJiYgRS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm4gPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKE4sIDE2KTtcbiAgICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgUlNBIHB1YmxpYyBrZXlcIik7XG4gICAgfVxuICB9O1xuICAvLyBSU0FLZXkucHJvdG90eXBlLmVuY3J5cHQgPSBSU0FFbmNyeXB0O1xuICAvLyBSZXR1cm4gdGhlIFBLQ1MjMSBSU0EgZW5jcnlwdGlvbiBvZiBcInRleHRcIiBhcyBhbiBldmVuLWxlbmd0aCBoZXggc3RyaW5nXG4gIFJTQUtleS5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdmFyIG1heExlbmd0aCA9IHRoaXMubi5iaXRMZW5ndGgoKSArIDcgPj4gMztcbiAgICB2YXIgbSA9IHBrY3MxcGFkMih0ZXh0LCBtYXhMZW5ndGgpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgYyA9IHRoaXMuZG9QdWJsaWMobSk7XG4gICAgaWYgKGMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBoID0gYy50b1N0cmluZygxNik7XG4gICAgdmFyIGxlbmd0aCA9IGgubGVuZ3RoO1xuICAgIC8vIGZpeCB6ZXJvIGJlZm9yZSByZXN1bHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heExlbmd0aCAqIDIgLSBsZW5ndGg7IGkrKykge1xuICAgICAgaCA9IFwiMFwiICsgaDtcbiAgICB9XG4gICAgcmV0dXJuIGg7XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuc2V0UHJpdmF0ZSA9IFJTQVNldFByaXZhdGU7XG4gIC8vIFNldCB0aGUgcHJpdmF0ZSBrZXkgZmllbGRzIE4sIGUsIGFuZCBkIGZyb20gaGV4IHN0cmluZ3NcbiAgUlNBS2V5LnByb3RvdHlwZS5zZXRQcml2YXRlID0gZnVuY3Rpb24gKE4sIEUsIEQpIHtcbiAgICBpZiAoTiAhPSBudWxsICYmIEUgIT0gbnVsbCAmJiBOLmxlbmd0aCA+IDAgJiYgRS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm4gPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKE4sIDE2KTtcbiAgICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcbiAgICAgIHRoaXMuZCA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoRCwgMTYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBSU0EgcHJpdmF0ZSBrZXlcIik7XG4gICAgfVxuICB9O1xuICAvLyBSU0FLZXkucHJvdG90eXBlLnNldFByaXZhdGVFeCA9IFJTQVNldFByaXZhdGVFeDtcbiAgLy8gU2V0IHRoZSBwcml2YXRlIGtleSBmaWVsZHMgTiwgZSwgZCBhbmQgQ1JUIHBhcmFtcyBmcm9tIGhleCBzdHJpbmdzXG4gIFJTQUtleS5wcm90b3R5cGUuc2V0UHJpdmF0ZUV4ID0gZnVuY3Rpb24gKE4sIEUsIEQsIFAsIFEsIERQLCBEUSwgQykge1xuICAgIGlmIChOICE9IG51bGwgJiYgRSAhPSBudWxsICYmIE4ubGVuZ3RoID4gMCAmJiBFLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubiA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoTiwgMTYpO1xuICAgICAgdGhpcy5lID0gcGFyc2VJbnQoRSwgMTYpO1xuICAgICAgdGhpcy5kID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShELCAxNik7XG4gICAgICB0aGlzLnAgPSAoMCwgX2pzYm4ucGFyc2VCaWdJbnQpKFAsIDE2KTtcbiAgICAgIHRoaXMucSA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoUSwgMTYpO1xuICAgICAgdGhpcy5kbXAxID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShEUCwgMTYpO1xuICAgICAgdGhpcy5kbXExID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShEUSwgMTYpO1xuICAgICAgdGhpcy5jb2VmZiA9ICgwLCBfanNibi5wYXJzZUJpZ0ludCkoQywgMTYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBSU0EgcHJpdmF0ZSBrZXlcIik7XG4gICAgfVxuICB9O1xuICAvLyBSU0FLZXkucHJvdG90eXBlLmdlbmVyYXRlID0gUlNBR2VuZXJhdGU7XG4gIC8vIEdlbmVyYXRlIGEgbmV3IHJhbmRvbSBwcml2YXRlIGtleSBCIGJpdHMgbG9uZywgdXNpbmcgcHVibGljIGV4cHQgRVxuICBSU0FLZXkucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKEIsIEUpIHtcbiAgICB2YXIgcm5nID0gbmV3IF9ybmcuU2VjdXJlUmFuZG9tKCk7XG4gICAgdmFyIHFzID0gQiA+PiAxO1xuICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcbiAgICB2YXIgZWUgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihFLCAxNik7XG4gICAgZm9yICg7Oykge1xuICAgICAgZm9yICg7Oykge1xuICAgICAgICB0aGlzLnAgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihCIC0gcXMsIDEsIHJuZyk7XG4gICAgICAgIGlmICh0aGlzLnAuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpLmdjZChlZSkuY29tcGFyZVRvKF9qc2JuLkJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHRoaXMucC5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoOzspIHtcbiAgICAgICAgdGhpcy5xID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIocXMsIDEsIHJuZyk7XG4gICAgICAgIGlmICh0aGlzLnEuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpLmdjZChlZSkuY29tcGFyZVRvKF9qc2JuLkJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHRoaXMucS5pc1Byb2JhYmxlUHJpbWUoMTApKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnAuY29tcGFyZVRvKHRoaXMucSkgPD0gMCkge1xuICAgICAgICB2YXIgdCA9IHRoaXMucDtcbiAgICAgICAgdGhpcy5wID0gdGhpcy5xO1xuICAgICAgICB0aGlzLnEgPSB0O1xuICAgICAgfVxuICAgICAgdmFyIHAxID0gdGhpcy5wLnN1YnRyYWN0KF9qc2JuLkJpZ0ludGVnZXIuT05FKTtcbiAgICAgIHZhciBxMSA9IHRoaXMucS5zdWJ0cmFjdChfanNibi5CaWdJbnRlZ2VyLk9ORSk7XG4gICAgICB2YXIgcGhpID0gcDEubXVsdGlwbHkocTEpO1xuICAgICAgaWYgKHBoaS5nY2QoZWUpLmNvbXBhcmVUbyhfanNibi5CaWdJbnRlZ2VyLk9ORSkgPT0gMCkge1xuICAgICAgICB0aGlzLm4gPSB0aGlzLnAubXVsdGlwbHkodGhpcy5xKTtcbiAgICAgICAgdGhpcy5kID0gZWUubW9kSW52ZXJzZShwaGkpO1xuICAgICAgICB0aGlzLmRtcDEgPSB0aGlzLmQubW9kKHAxKTtcbiAgICAgICAgdGhpcy5kbXExID0gdGhpcy5kLm1vZChxMSk7XG4gICAgICAgIHRoaXMuY29lZmYgPSB0aGlzLnEubW9kSW52ZXJzZSh0aGlzLnApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8vIFJTQUtleS5wcm90b3R5cGUuZGVjcnlwdCA9IFJTQURlY3J5cHQ7XG4gIC8vIFJldHVybiB0aGUgUEtDUyMxIFJTQSBkZWNyeXB0aW9uIG9mIFwiY3RleHRcIi5cbiAgLy8gXCJjdGV4dFwiIGlzIGFuIGV2ZW4tbGVuZ3RoIGhleCBzdHJpbmcgYW5kIHRoZSBvdXRwdXQgaXMgYSBwbGFpbiBzdHJpbmcuXG4gIFJTQUtleS5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uIChjdGV4dCkge1xuICAgIHZhciBjID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShjdGV4dCwgMTYpO1xuICAgIHZhciBtID0gdGhpcy5kb1ByaXZhdGUoYyk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBwa2NzMXVucGFkMihtLCB0aGlzLm4uYml0TGVuZ3RoKCkgKyA3ID4+IDMpO1xuICB9O1xuICAvLyBHZW5lcmF0ZSBhIG5ldyByYW5kb20gcHJpdmF0ZSBrZXkgQiBiaXRzIGxvbmcsIHVzaW5nIHB1YmxpYyBleHB0IEVcbiAgUlNBS2V5LnByb3RvdHlwZS5nZW5lcmF0ZUFzeW5jID0gZnVuY3Rpb24gKEIsIEUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJuZyA9IG5ldyBfcm5nLlNlY3VyZVJhbmRvbSgpO1xuICAgIHZhciBxcyA9IEIgPj4gMTtcbiAgICB0aGlzLmUgPSBwYXJzZUludChFLCAxNik7XG4gICAgdmFyIGVlID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIoRSwgMTYpO1xuICAgIHZhciByc2EgPSB0aGlzO1xuICAgIC8vIFRoZXNlIGZ1bmN0aW9ucyBoYXZlIG5vbi1kZXNjcmlwdCBuYW1lcyBiZWNhdXNlIHRoZXkgd2VyZSBvcmlnaW5hbGx5IGZvcig7OykgbG9vcHMuXG4gICAgLy8gSSBkb24ndCBrbm93IGFib3V0IGNyeXB0b2dyYXBoeSB0byBnaXZlIHRoZW0gYmV0dGVyIG5hbWVzIHRoYW4gbG9vcDEtNC5cbiAgICB2YXIgbG9vcDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbG9vcDQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyc2EucC5jb21wYXJlVG8ocnNhLnEpIDw9IDApIHtcbiAgICAgICAgICB2YXIgdCA9IHJzYS5wO1xuICAgICAgICAgIHJzYS5wID0gcnNhLnE7XG4gICAgICAgICAgcnNhLnEgPSB0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBwMSA9IHJzYS5wLnN1YnRyYWN0KF9qc2JuLkJpZ0ludGVnZXIuT05FKTtcbiAgICAgICAgdmFyIHExID0gcnNhLnEuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpO1xuICAgICAgICB2YXIgcGhpID0gcDEubXVsdGlwbHkocTEpO1xuICAgICAgICBpZiAocGhpLmdjZChlZSkuY29tcGFyZVRvKF9qc2JuLkJpZ0ludGVnZXIuT05FKSA9PSAwKSB7XG4gICAgICAgICAgcnNhLm4gPSByc2EucC5tdWx0aXBseShyc2EucSk7XG4gICAgICAgICAgcnNhLmQgPSBlZS5tb2RJbnZlcnNlKHBoaSk7XG4gICAgICAgICAgcnNhLmRtcDEgPSByc2EuZC5tb2QocDEpO1xuICAgICAgICAgIHJzYS5kbXExID0gcnNhLmQubW9kKHExKTtcbiAgICAgICAgICByc2EuY29lZmYgPSByc2EucS5tb2RJbnZlcnNlKHJzYS5wKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfSwgMCk7IC8vIGVzY2FwZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQobG9vcDEsIDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGxvb3AzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByc2EucSA9ICgwLCBfanNibi5uYmkpKCk7XG4gICAgICAgIHJzYS5xLmZyb21OdW1iZXJBc3luYyhxcywgMSwgcm5nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcnNhLnEuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpLmdjZGEoZWUsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBpZiAoci5jb21wYXJlVG8oX2pzYm4uQmlnSW50ZWdlci5PTkUpID09IDAgJiYgcnNhLnEuaXNQcm9iYWJsZVByaW1lKDEwKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3A0LCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDMsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgbG9vcDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJzYS5wID0gKDAsIF9qc2JuLm5iaSkoKTtcbiAgICAgICAgcnNhLnAuZnJvbU51bWJlckFzeW5jKEIgLSBxcywgMSwgcm5nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcnNhLnAuc3VidHJhY3QoX2pzYm4uQmlnSW50ZWdlci5PTkUpLmdjZGEoZWUsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBpZiAoci5jb21wYXJlVG8oX2pzYm4uQmlnSW50ZWdlci5PTkUpID09IDAgJiYgcnNhLnAuaXNQcm9iYWJsZVByaW1lKDEwKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AzLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDIsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBzZXRUaW1lb3V0KGxvb3AyLCAwKTtcbiAgICB9O1xuICAgIHNldFRpbWVvdXQobG9vcDEsIDApO1xuICB9O1xuICBSU0FLZXkucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbiAodGV4dCwgZGlnZXN0TWV0aG9kLCBkaWdlc3ROYW1lKSB7XG4gICAgdmFyIGhlYWRlciA9IGdldERpZ2VzdEhlYWRlcihkaWdlc3ROYW1lKTtcbiAgICB2YXIgZGlnZXN0ID0gaGVhZGVyICsgZGlnZXN0TWV0aG9kKHRleHQpLnRvU3RyaW5nKCk7XG4gICAgdmFyIG0gPSBwa2NzMXBhZDEoZGlnZXN0LCB0aGlzLm4uYml0TGVuZ3RoKCkgLyA0KTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGMgPSB0aGlzLmRvUHJpdmF0ZShtKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICBpZiAoKGgubGVuZ3RoICYgMSkgPT0gMCkge1xuICAgICAgcmV0dXJuIGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIjBcIiArIGg7XG4gICAgfVxuICB9O1xuICBSU0FLZXkucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uICh0ZXh0LCBzaWduYXR1cmUsIGRpZ2VzdE1ldGhvZCkge1xuICAgIHZhciBjID0gKDAsIF9qc2JuLnBhcnNlQmlnSW50KShzaWduYXR1cmUsIDE2KTtcbiAgICB2YXIgbSA9IHRoaXMuZG9QdWJsaWMoYyk7XG4gICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciB1bnBhZGRlZCA9IG0udG9TdHJpbmcoMTYpLnJlcGxhY2UoL14xZiswMC8sIFwiXCIpO1xuICAgIHZhciBkaWdlc3QgPSByZW1vdmVEaWdlc3RIZWFkZXIodW5wYWRkZWQpO1xuICAgIHJldHVybiBkaWdlc3QgPT0gZGlnZXN0TWV0aG9kKHRleHQpLnRvU3RyaW5nKCk7XG4gIH07XG4gIHJldHVybiBSU0FLZXk7XG59KCk7XG4vLyBVbmRvIFBLQ1MjMSAodHlwZSAyLCByYW5kb20pIHBhZGRpbmcgYW5kLCBpZiB2YWxpZCwgcmV0dXJuIHRoZSBwbGFpbnRleHRcbmZ1bmN0aW9uIHBrY3MxdW5wYWQyKGQsIG4pIHtcbiAgdmFyIGIgPSBkLnRvQnl0ZUFycmF5KCk7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKGkgPCBiLmxlbmd0aCAmJiBiW2ldID09IDApIHtcbiAgICArK2k7XG4gIH1cbiAgaWYgKGIubGVuZ3RoIC0gaSAhPSBuIC0gMSB8fCBiW2ldICE9IDIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICArK2k7XG4gIHdoaWxlIChiW2ldICE9IDApIHtcbiAgICBpZiAoKytpID49IGIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgdmFyIHJldCA9IFwiXCI7XG4gIHdoaWxlICgrK2kgPCBiLmxlbmd0aCkge1xuICAgIHZhciBjID0gYltpXSAmIDI1NTtcbiAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgLy8gdXRmLTggZGVjb2RlXG4gICAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICB9IGVsc2UgaWYgKGMgPiAxOTEgJiYgYyA8IDIyNCkge1xuICAgICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IGJbaSArIDFdICYgNjMpO1xuICAgICAgKytpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDE1KSA8PCAxMiB8IChiW2kgKyAxXSAmIDYzKSA8PCA2IHwgYltpICsgMl0gJiA2Myk7XG4gICAgICBpICs9IDI7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ0NyNwYWdlLTQzXG52YXIgRElHRVNUX0hFQURFUlMgPSB7XG4gIG1kMjogXCIzMDIwMzAwYzA2MDgyYTg2NDg4NmY3MGQwMjAyMDUwMDA0MTBcIixcbiAgbWQ1OiBcIjMwMjAzMDBjMDYwODJhODY0ODg2ZjcwZDAyMDUwNTAwMDQxMFwiLFxuICBzaGExOiBcIjMwMjEzMDA5MDYwNTJiMGUwMzAyMWEwNTAwMDQxNFwiLFxuICBzaGEyMjQ6IFwiMzAyZDMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjA0MDUwMDA0MWNcIixcbiAgc2hhMjU2OiBcIjMwMzEzMDBkMDYwOTYwODY0ODAxNjUwMzA0MDIwMTA1MDAwNDIwXCIsXG4gIHNoYTM4NDogXCIzMDQxMzAwZDA2MDk2MDg2NDgwMTY1MDMwNDAyMDIwNTAwMDQzMFwiLFxuICBzaGE1MTI6IFwiMzA1MTMwMGQwNjA5NjA4NjQ4MDE2NTAzMDQwMjAzMDUwMDA0NDBcIixcbiAgcmlwZW1kMTYwOiBcIjMwMjEzMDA5MDYwNTJiMjQwMzAyMDEwNTAwMDQxNFwiXG59O1xuZnVuY3Rpb24gZ2V0RGlnZXN0SGVhZGVyKG5hbWUpIHtcbiAgcmV0dXJuIERJR0VTVF9IRUFERVJTW25hbWVdIHx8IFwiXCI7XG59XG5mdW5jdGlvbiByZW1vdmVEaWdlc3RIZWFkZXIoc3RyKSB7XG4gIGZvciAodmFyIG5hbWVfMSBpbiBESUdFU1RfSEVBREVSUykge1xuICAgIGlmIChESUdFU1RfSEVBREVSUy5oYXNPd25Qcm9wZXJ0eShuYW1lXzEpKSB7XG4gICAgICB2YXIgaGVhZGVyID0gRElHRVNUX0hFQURFUlNbbmFtZV8xXTtcbiAgICAgIHZhciBsZW4gPSBoZWFkZXIubGVuZ3RoO1xuICAgICAgaWYgKHN0ci5zdWJzdHIoMCwgbGVuKSA9PSBoZWFkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIobGVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cbi8vIFJldHVybiB0aGUgUEtDUyMxIFJTQSBlbmNyeXB0aW9uIG9mIFwidGV4dFwiIGFzIGEgQmFzZTY0LWVuY29kZWQgc3RyaW5nXG4vLyBmdW5jdGlvbiBSU0FFbmNyeXB0QjY0KHRleHQpIHtcbi8vICB2YXIgaCA9IHRoaXMuZW5jcnlwdCh0ZXh0KTtcbi8vICBpZihoKSByZXR1cm4gaGV4MmI2NChoKTsgZWxzZSByZXR1cm4gbnVsbDtcbi8vIH1cbi8vIHB1YmxpY1xuLy8gUlNBS2V5LnByb3RvdHlwZS5lbmNyeXB0X2I2NCA9IFJTQUVuY3J5cHRCNjQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNiaXQgPSBjYml0O1xuZXhwb3J0cy5pbnQyY2hhciA9IGludDJjaGFyO1xuZXhwb3J0cy5sYml0ID0gbGJpdDtcbmV4cG9ydHMub3BfYW5kID0gb3BfYW5kO1xuZXhwb3J0cy5vcF9hbmRub3QgPSBvcF9hbmRub3Q7XG5leHBvcnRzLm9wX29yID0gb3Bfb3I7XG5leHBvcnRzLm9wX3hvciA9IG9wX3hvcjtcbnZhciBCSV9STSA9IFwiMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG5mdW5jdGlvbiBpbnQyY2hhcihuKSB7XG4gIHJldHVybiBCSV9STS5jaGFyQXQobik7XG59XG4vLyNyZWdpb24gQklUX09QRVJBVElPTlNcbi8vIChwdWJsaWMpIHRoaXMgJiBhXG5mdW5jdGlvbiBvcF9hbmQoeCwgeSkge1xuICByZXR1cm4geCAmIHk7XG59XG4vLyAocHVibGljKSB0aGlzIHwgYVxuZnVuY3Rpb24gb3Bfb3IoeCwgeSkge1xuICByZXR1cm4geCB8IHk7XG59XG4vLyAocHVibGljKSB0aGlzIF4gYVxuZnVuY3Rpb24gb3BfeG9yKHgsIHkpIHtcbiAgcmV0dXJuIHggXiB5O1xufVxuLy8gKHB1YmxpYykgdGhpcyAmIH5hXG5mdW5jdGlvbiBvcF9hbmRub3QoeCwgeSkge1xuICByZXR1cm4geCAmIH55O1xufVxuLy8gcmV0dXJuIGluZGV4IG9mIGxvd2VzdCAxLWJpdCBpbiB4LCB4IDwgMl4zMVxuZnVuY3Rpb24gbGJpdCh4KSB7XG4gIGlmICh4ID09IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgdmFyIHIgPSAwO1xuICBpZiAoKHggJiAweGZmZmYpID09IDApIHtcbiAgICB4ID4+PSAxNjtcbiAgICByICs9IDE2O1xuICB9XG4gIGlmICgoeCAmIDB4ZmYpID09IDApIHtcbiAgICB4ID4+PSA4O1xuICAgIHIgKz0gODtcbiAgfVxuICBpZiAoKHggJiAweGYpID09IDApIHtcbiAgICB4ID4+PSA0O1xuICAgIHIgKz0gNDtcbiAgfVxuICBpZiAoKHggJiAzKSA9PSAwKSB7XG4gICAgeCA+Pj0gMjtcbiAgICByICs9IDI7XG4gIH1cbiAgaWYgKCh4ICYgMSkgPT0gMCkge1xuICAgICsrcjtcbiAgfVxuICByZXR1cm4gcjtcbn1cbi8vIHJldHVybiBudW1iZXIgb2YgMSBiaXRzIGluIHhcbmZ1bmN0aW9uIGNiaXQoeCkge1xuICB2YXIgciA9IDA7XG4gIHdoaWxlICh4ICE9IDApIHtcbiAgICB4ICY9IHggLSAxO1xuICAgICsrcjtcbiAgfVxuICByZXR1cm4gcjtcbn1cbi8vI2VuZHJlZ2lvbiBCSVRfT1BFUkFUSU9OUyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5LSlVSID0gdm9pZCAwO1xudmFyIF9qc2JuID0gcmVxdWlyZShcIi4uL2pzYm4vanNiblwiKTtcbnZhciBfeWFob28gPSByZXF1aXJlKFwiLi95YWhvb1wiKTtcbi8qIGFzbjEtMS4wLjEzLmpzIChjKSAyMDEzLTIwMTcgS2VuamkgVXJ1c2hpbWEgfCBranVyLmdpdGh1Yi5jb20vanNyc2FzaWduL2xpY2Vuc2VcbiAqL1xuLypcbiAqIGFzbjEuanMgLSBBU04uMSBERVIgZW5jb2RlciBjbGFzc2VzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTcgS2VuamkgVXJ1c2hpbWEgKGtlbmppLnVydXNoaW1hQGdtYWlsLmNvbSlcbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL2tqdXIuZ2l0aHViLmlvL2pzcnNhc2lnbi9saWNlbnNlXG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBhbmQgbGljZW5zZSBub3RpY2Ugc2hhbGwgYmVcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICovXG5cbi8qKlxuICogQGZpbGVPdmVydmlld1xuICogQG5hbWUgYXNuMS0xLjAuanNcbiAqIEBhdXRob3IgS2VuamkgVXJ1c2hpbWEga2VuamkudXJ1c2hpbWFAZ21haWwuY29tXG4gKiBAdmVyc2lvbiBhc24xIDEuMC4xMyAoMjAxNy1KdW4tMDIpXG4gKiBAc2luY2UganNyc2FzaWduIDIuMVxuICogQGxpY2Vuc2UgPGEgaHJlZj1cImh0dHBzOi8va2p1ci5naXRodWIuaW8vanNyc2FzaWduL2xpY2Vuc2UvXCI+TUlUIExpY2Vuc2U8L2E+XG4gKi9cbi8qKlxuICoga2p1cidzIGNsYXNzIGxpYnJhcnkgbmFtZSBzcGFjZVxuICogPHA+XG4gKiBUaGlzIG5hbWUgc3BhY2UgcHJvdmlkZXMgZm9sbG93aW5nIG5hbWUgc3BhY2VzOlxuICogPHVsPlxuICogPGxpPntAbGluayBLSlVSLmFzbjF9IC0gQVNOLjEgcHJpbWl0aXZlIGhleGFkZWNpbWFsIGVuY29kZXI8L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEueDUwOX0gLSBBU04uMSBzdHJ1Y3R1cmUgZm9yIFguNTA5IGNlcnRpZmljYXRlIGFuZCBDUkw8L2xpPlxuICogPGxpPntAbGluayBLSlVSLmNyeXB0b30gLSBKYXZhIENyeXB0b2dyYXBoaWMgRXh0ZW5zaW9uKEpDRSkgc3R5bGUgTWVzc2FnZURpZ2VzdC9TaWduYXR1cmVcbiAqIGNsYXNzIGFuZCB1dGlsaXRpZXM8L2xpPlxuICogPC91bD5cbiAqIDwvcD5cbiAqIE5PVEU6IFBsZWFzZSBpZ25vcmUgbWV0aG9kIHN1bW1hcnkgYW5kIGRvY3VtZW50IG9mIHRoaXMgbmFtZXNwYWNlLiBUaGlzIGNhdXNlZCBieSBhIGJ1ZyBvZiBqc2RvYzIuXG4gKiBAbmFtZSBLSlVSXG4gKiBAbmFtZXNwYWNlIGtqdXIncyBjbGFzcyBsaWJyYXJ5IG5hbWUgc3BhY2VcbiAqL1xudmFyIEtKVVIgPSBleHBvcnRzLktKVVIgPSB7fTtcbi8qKlxuICoga2p1cidzIEFTTi4xIGNsYXNzIGxpYnJhcnkgbmFtZSBzcGFjZVxuICogPHA+XG4gKiBUaGlzIGlzIElUVS1UIFguNjkwIEFTTi4xIERFUiBlbmNvZGVyIGNsYXNzIGxpYnJhcnkgYW5kXG4gKiBjbGFzcyBzdHJ1Y3R1cmUgYW5kIG1ldGhvZHMgaXMgdmVyeSBzaW1pbGFyIHRvXG4gKiBvcmcuYm91bmN5Y2FzdGxlLmFzbjEgcGFja2FnZSBvZlxuICogd2VsbCBrbm93biBCb3VuY3lDYXNsdGUgQ3J5cHRvZ3JhcGh5IExpYnJhcnkuXG4gKiA8aDQ+UFJPVklESU5HIEFTTi4xIFBSSU1JVElWRVM8L2g0PlxuICogSGVyZSBhcmUgQVNOLjEgREVSIHByaW1pdGl2ZSBjbGFzc2VzLlxuICogPHVsPlxuICogPGxpPjB4MDEge0BsaW5rIEtKVVIuYXNuMS5ERVJCb29sZWFufTwvbGk+XG4gKiA8bGk+MHgwMiB7QGxpbmsgS0pVUi5hc24xLkRFUkludGVnZXJ9PC9saT5cbiAqIDxsaT4weDAzIHtAbGluayBLSlVSLmFzbjEuREVSQml0U3RyaW5nfTwvbGk+XG4gKiA8bGk+MHgwNCB7QGxpbmsgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nfTwvbGk+XG4gKiA8bGk+MHgwNSB7QGxpbmsgS0pVUi5hc24xLkRFUk51bGx9PC9saT5cbiAqIDxsaT4weDA2IHtAbGluayBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllcn08L2xpPlxuICogPGxpPjB4MGEge0BsaW5rIEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkfTwvbGk+XG4gKiA8bGk+MHgwYyB7QGxpbmsgS0pVUi5hc24xLkRFUlVURjhTdHJpbmd9PC9saT5cbiAqIDxsaT4weDEyIHtAbGluayBLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZ308L2xpPlxuICogPGxpPjB4MTMge0BsaW5rIEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmd9PC9saT5cbiAqIDxsaT4weDE0IHtAbGluayBLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZ308L2xpPlxuICogPGxpPjB4MTYge0BsaW5rIEtKVVIuYXNuMS5ERVJJQTVTdHJpbmd9PC9saT5cbiAqIDxsaT4weDE3IHtAbGluayBLSlVSLmFzbjEuREVSVVRDVGltZX08L2xpPlxuICogPGxpPjB4MTgge0BsaW5rIEtKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWV9PC9saT5cbiAqIDxsaT4weDMwIHtAbGluayBLSlVSLmFzbjEuREVSU2VxdWVuY2V9PC9saT5cbiAqIDxsaT4weDMxIHtAbGluayBLSlVSLmFzbjEuREVSU2V0fTwvbGk+XG4gKiA8L3VsPlxuICogPGg0Pk9USEVSIEFTTi4xIENMQVNTRVM8L2g0PlxuICogPHVsPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuQVNOMU9iamVjdH08L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmd9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZX08L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3R9PC9saT5cbiAqIDwvdWw+XG4gKiA8aDQ+U1VCIE5BTUUgU1BBQ0VTPC9oND5cbiAqIDx1bD5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLmNhZGVzfSAtIENBZEVTIGxvbmcgdGVybSBzaWduYXR1cmUgZm9ybWF0PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLmNtc30gLSBDcnlwdG9ncmFwaGljIE1lc3NhZ2UgU3ludGF4PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLmNzcn0gLSBDZXJ0aWZpY2F0ZSBTaWduaW5nIFJlcXVlc3QgKENTUi9QS0NTIzEwKTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS50c3B9IC0gUkZDIDMxNjEgVGltZXN0YW1waW5nIFByb3RvY29sIEZvcm1hdDwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS54NTA5fSAtIFJGQyA1MjgwIFguNTA5IGNlcnRpZmljYXRlIGFuZCBDUkw8L2xpPlxuICogPC91bD5cbiAqIDwvcD5cbiAqIE5PVEU6IFBsZWFzZSBpZ25vcmUgbWV0aG9kIHN1bW1hcnkgYW5kIGRvY3VtZW50IG9mIHRoaXMgbmFtZXNwYWNlLlxuICogVGhpcyBjYXVzZWQgYnkgYSBidWcgb2YganNkb2MyLlxuICogQG5hbWUgS0pVUi5hc24xXG4gKiBAbmFtZXNwYWNlXG4gKi9cbmlmICh0eXBlb2YgS0pVUi5hc24xID09IFwidW5kZWZpbmVkXCIgfHwgIUtKVVIuYXNuMSkgS0pVUi5hc24xID0ge307XG4vKipcbiAqIEFTTjEgdXRpbGl0aWVzIGNsYXNzXG4gKiBAbmFtZSBLSlVSLmFzbjEuQVNOMVV0aWxcbiAqIEBjbGFzcyBBU04xIHV0aWxpdGllcyBjbGFzc1xuICogQHNpbmNlIGFzbjEgMS4wLjJcbiAqL1xuS0pVUi5hc24xLkFTTjFVdGlsID0gbmV3IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pbnRlZ2VyVG9CeXRlSGV4ID0gZnVuY3Rpb24gKGkpIHtcbiAgICB2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xuICAgIGlmIChoLmxlbmd0aCAlIDIgPT0gMSkgaCA9ICcwJyArIGg7XG4gICAgcmV0dXJuIGg7XG4gIH07XG4gIHRoaXMuYmlnSW50VG9NaW5Ud29zQ29tcGxlbWVudHNIZXggPSBmdW5jdGlvbiAoYmlnSW50ZWdlclZhbHVlKSB7XG4gICAgdmFyIGggPSBiaWdJbnRlZ2VyVmFsdWUudG9TdHJpbmcoMTYpO1xuICAgIGlmIChoLnN1YnN0cigwLCAxKSAhPSAnLScpIHtcbiAgICAgIGlmIChoLmxlbmd0aCAlIDIgPT0gMSkge1xuICAgICAgICBoID0gJzAnICsgaDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaC5tYXRjaCgvXlswLTddLykpIHtcbiAgICAgICAgICBoID0gJzAwJyArIGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhQb3MgPSBoLnN1YnN0cigxKTtcbiAgICAgIHZhciB4b3JMZW4gPSBoUG9zLmxlbmd0aDtcbiAgICAgIGlmICh4b3JMZW4gJSAyID09IDEpIHtcbiAgICAgICAgeG9yTGVuICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWgubWF0Y2goL15bMC03XS8pKSB7XG4gICAgICAgICAgeG9yTGVuICs9IDI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBoTWFzayA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4b3JMZW47IGkrKykge1xuICAgICAgICBoTWFzayArPSAnZic7XG4gICAgICB9XG4gICAgICB2YXIgYmlNYXNrID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIoaE1hc2ssIDE2KTtcbiAgICAgIHZhciBiaU5lZyA9IGJpTWFzay54b3IoYmlnSW50ZWdlclZhbHVlKS5hZGQoX2pzYm4uQmlnSW50ZWdlci5PTkUpO1xuICAgICAgaCA9IGJpTmVnLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9eLS8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIGg7XG4gIH07XG4gIC8qKlxuICAgKiBnZXQgUEVNIHN0cmluZyBmcm9tIGhleGFkZWNpbWFsIGRhdGEgYW5kIGhlYWRlciBzdHJpbmdcbiAgICogQG5hbWUgZ2V0UEVNU3RyaW5nRnJvbUhleFxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YUhleCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgUEVNIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBlbUhlYWRlciBQRU0gaGVhZGVyIHN0cmluZyAoZXguICdSU0EgUFJJVkFURSBLRVknKVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFBFTSBmb3JtYXR0ZWQgc3RyaW5nIG9mIGlucHV0IGRhdGFcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIGNvbnZlcnRzIGEgaGV4YWRlY2ltYWwgc3RyaW5nIHRvIGEgUEVNIHN0cmluZyB3aXRoXG4gICAqIGEgc3BlY2lmaWVkIGhlYWRlci4gSXRzIGxpbmUgYnJlYWsgd2lsbCBiZSBDUkxGKFwiXFxyXFxuXCIpLlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgcGVtICA9IEtKVVIuYXNuMS5BU04xVXRpbC5nZXRQRU1TdHJpbmdGcm9tSGV4KCc2MTYxNjEnLCAnUlNBIFBSSVZBVEUgS0VZJyk7XG4gICAqIC8vIHZhbHVlIG9mIHBlbSB3aWxsIGJlOlxuICAgKiAtLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbiAgICogWVdGaFxuICAgKiAtLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4gICAqL1xuICB0aGlzLmdldFBFTVN0cmluZ0Zyb21IZXggPSBmdW5jdGlvbiAoZGF0YUhleCwgcGVtSGVhZGVyKSB7XG4gICAgcmV0dXJuIGhleHRvcGVtKGRhdGFIZXgsIHBlbUhlYWRlcik7XG4gIH07XG4gIC8qKlxuICAgKiBnZW5lcmF0ZSBBU04xT2JqZWN0IHNwZWNpZmVkIGJ5IEpTT04gcGFyYW1ldGVyc1xuICAgKiBAbmFtZSBuZXdPYmplY3RcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xVXRpbFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW0gSlNPTiBwYXJhbWV0ZXIgdG8gZ2VuZXJhdGUgQVNOMU9iamVjdFxuICAgKiBAcmV0dXJuIHtLSlVSLmFzbjEuQVNOMU9iamVjdH0gZ2VuZXJhdGVkIG9iamVjdFxuICAgKiBAc2luY2UgYXNuMSAxLjAuM1xuICAgKiBAZGVzY3JpcHRpb25cbiAgICogZ2VuZXJhdGUgYW55IEFTTjFPYmplY3Qgc3BlY2lmaWVkIGJ5IEpTT04gcGFyYW1cbiAgICogaW5jbHVkaW5nIEFTTi4xIHByaW1pdGl2ZSBvciBzdHJ1Y3R1cmVkLlxuICAgKiBHZW5lcmFsbHkgJ3BhcmFtJyBjYW4gYmUgZGVzY3JpYmVkIGFzIGZvbGxvd3M6XG4gICAqIDxibG9ja3F1b3RlPlxuICAgKiB7VFlQRS1PRi1BU05PQko6IEFTTjFPQkotUEFSQU1FVEVSfVxuICAgKiA8L2Jsb2NrcXVvdGU+XG4gICAqICdUWVBFLU9GLUFTTjFPQkonIGNhbiBiZSBvbmUgb2YgZm9sbG93aW5nIHN5bWJvbHM6XG4gICAqIDx1bD5cbiAgICogPGxpPidib29sJyAtIERFUkJvb2xlYW48L2xpPlxuICAgKiA8bGk+J2ludCcgLSBERVJJbnRlZ2VyPC9saT5cbiAgICogPGxpPidiaXRzdHInIC0gREVSQml0U3RyaW5nPC9saT5cbiAgICogPGxpPidvY3RzdHInIC0gREVST2N0ZXRTdHJpbmc8L2xpPlxuICAgKiA8bGk+J251bGwnIC0gREVSTnVsbDwvbGk+XG4gICAqIDxsaT4nb2lkJyAtIERFUk9iamVjdElkZW50aWZpZXI8L2xpPlxuICAgKiA8bGk+J2VudW0nIC0gREVSRW51bWVyYXRlZDwvbGk+XG4gICAqIDxsaT4ndXRmOHN0cicgLSBERVJVVEY4U3RyaW5nPC9saT5cbiAgICogPGxpPidudW1zdHInIC0gREVSTnVtZXJpY1N0cmluZzwvbGk+XG4gICAqIDxsaT4ncHJuc3RyJyAtIERFUlByaW50YWJsZVN0cmluZzwvbGk+XG4gICAqIDxsaT4ndGVsc3RyJyAtIERFUlRlbGV0ZXhTdHJpbmc8L2xpPlxuICAgKiA8bGk+J2lhNXN0cicgLSBERVJJQTVTdHJpbmc8L2xpPlxuICAgKiA8bGk+J3V0Y3RpbWUnIC0gREVSVVRDVGltZTwvbGk+XG4gICAqIDxsaT4nZ2VudGltZScgLSBERVJHZW5lcmFsaXplZFRpbWU8L2xpPlxuICAgKiA8bGk+J3NlcScgLSBERVJTZXF1ZW5jZTwvbGk+XG4gICAqIDxsaT4nc2V0JyAtIERFUlNldDwvbGk+XG4gICAqIDxsaT4ndGFnJyAtIERFUlRhZ2dlZE9iamVjdDwvbGk+XG4gICAqIDwvdWw+XG4gICAqIEBleGFtcGxlXG4gICAqIG5ld09iamVjdCh7J3BybnN0cic6ICdhYWEnfSk7XG4gICAqIG5ld09iamVjdCh7J3NlcSc6IFt7J2ludCc6IDN9LCB7J3BybnN0cic6ICdhYWEnfV19KVxuICAgKiAvLyBBU04uMSBUYWdnZWQgT2JqZWN0XG4gICAqIG5ld09iamVjdCh7J3RhZyc6IHsndGFnJzogJ2ExJyxcbiAgICogICAgICAgICAgICAgICAgICAgICdleHBsaWNpdCc6IHRydWUsXG4gICAqICAgICAgICAgICAgICAgICAgICAnb2JqJzogeydzZXEnOiBbeydpbnQnOiAzfSwgeydwcm5zdHInOiAnYWFhJ31dfX19KTtcbiAgICogLy8gbW9yZSBzaW1wbGUgcmVwcmVzZW50YXRpb24gb2YgQVNOLjEgVGFnZ2VkIE9iamVjdFxuICAgKiBuZXdPYmplY3Qoeyd0YWcnOiBbJ2ExJyxcbiAgICogICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAqICAgICAgICAgICAgICAgICAgICB7J3NlcSc6IFtcbiAgICogICAgICAgICAgICAgICAgICAgICAgeydpbnQnOiAzfSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgeydwcm5zdHInOiAnYWFhJ31dfVxuICAgKiAgICAgICAgICAgICAgICAgICBdfSk7XG4gICAqL1xuICB0aGlzLm5ld09iamVjdCA9IGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHZhciBfS0pVUiA9IEtKVVIsXG4gICAgICBfS0pVUl9hc24xID0gX0tKVVIuYXNuMSxcbiAgICAgIF9ERVJCb29sZWFuID0gX0tKVVJfYXNuMS5ERVJCb29sZWFuLFxuICAgICAgX0RFUkludGVnZXIgPSBfS0pVUl9hc24xLkRFUkludGVnZXIsXG4gICAgICBfREVSQml0U3RyaW5nID0gX0tKVVJfYXNuMS5ERVJCaXRTdHJpbmcsXG4gICAgICBfREVST2N0ZXRTdHJpbmcgPSBfS0pVUl9hc24xLkRFUk9jdGV0U3RyaW5nLFxuICAgICAgX0RFUk51bGwgPSBfS0pVUl9hc24xLkRFUk51bGwsXG4gICAgICBfREVST2JqZWN0SWRlbnRpZmllciA9IF9LSlVSX2FzbjEuREVST2JqZWN0SWRlbnRpZmllcixcbiAgICAgIF9ERVJFbnVtZXJhdGVkID0gX0tKVVJfYXNuMS5ERVJFbnVtZXJhdGVkLFxuICAgICAgX0RFUlVURjhTdHJpbmcgPSBfS0pVUl9hc24xLkRFUlVURjhTdHJpbmcsXG4gICAgICBfREVSTnVtZXJpY1N0cmluZyA9IF9LSlVSX2FzbjEuREVSTnVtZXJpY1N0cmluZyxcbiAgICAgIF9ERVJQcmludGFibGVTdHJpbmcgPSBfS0pVUl9hc24xLkRFUlByaW50YWJsZVN0cmluZyxcbiAgICAgIF9ERVJUZWxldGV4U3RyaW5nID0gX0tKVVJfYXNuMS5ERVJUZWxldGV4U3RyaW5nLFxuICAgICAgX0RFUklBNVN0cmluZyA9IF9LSlVSX2FzbjEuREVSSUE1U3RyaW5nLFxuICAgICAgX0RFUlVUQ1RpbWUgPSBfS0pVUl9hc24xLkRFUlVUQ1RpbWUsXG4gICAgICBfREVSR2VuZXJhbGl6ZWRUaW1lID0gX0tKVVJfYXNuMS5ERVJHZW5lcmFsaXplZFRpbWUsXG4gICAgICBfREVSU2VxdWVuY2UgPSBfS0pVUl9hc24xLkRFUlNlcXVlbmNlLFxuICAgICAgX0RFUlNldCA9IF9LSlVSX2FzbjEuREVSU2V0LFxuICAgICAgX0RFUlRhZ2dlZE9iamVjdCA9IF9LSlVSX2FzbjEuREVSVGFnZ2VkT2JqZWN0LFxuICAgICAgX25ld09iamVjdCA9IF9LSlVSX2FzbjEuQVNOMVV0aWwubmV3T2JqZWN0O1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocGFyYW0pO1xuICAgIGlmIChrZXlzLmxlbmd0aCAhPSAxKSB0aHJvdyBcImtleSBvZiBwYXJhbSBzaGFsbCBiZSBvbmx5IG9uZS5cIjtcbiAgICB2YXIga2V5ID0ga2V5c1swXTtcbiAgICBpZiAoXCI6Ym9vbDppbnQ6Yml0c3RyOm9jdHN0cjpudWxsOm9pZDplbnVtOnV0ZjhzdHI6bnVtc3RyOnBybnN0cjp0ZWxzdHI6aWE1c3RyOnV0Y3RpbWU6Z2VudGltZTpzZXE6c2V0OnRhZzpcIi5pbmRleE9mKFwiOlwiICsga2V5ICsgXCI6XCIpID09IC0xKSB0aHJvdyBcInVuZGVmaW5lZCBrZXk6IFwiICsga2V5O1xuICAgIGlmIChrZXkgPT0gXCJib29sXCIpIHJldHVybiBuZXcgX0RFUkJvb2xlYW4ocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcImludFwiKSByZXR1cm4gbmV3IF9ERVJJbnRlZ2VyKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJiaXRzdHJcIikgcmV0dXJuIG5ldyBfREVSQml0U3RyaW5nKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJvY3RzdHJcIikgcmV0dXJuIG5ldyBfREVST2N0ZXRTdHJpbmcocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcIm51bGxcIikgcmV0dXJuIG5ldyBfREVSTnVsbChwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwib2lkXCIpIHJldHVybiBuZXcgX0RFUk9iamVjdElkZW50aWZpZXIocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcImVudW1cIikgcmV0dXJuIG5ldyBfREVSRW51bWVyYXRlZChwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwidXRmOHN0clwiKSByZXR1cm4gbmV3IF9ERVJVVEY4U3RyaW5nKHBhcmFtW2tleV0pO1xuICAgIGlmIChrZXkgPT0gXCJudW1zdHJcIikgcmV0dXJuIG5ldyBfREVSTnVtZXJpY1N0cmluZyhwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwicHJuc3RyXCIpIHJldHVybiBuZXcgX0RFUlByaW50YWJsZVN0cmluZyhwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwidGVsc3RyXCIpIHJldHVybiBuZXcgX0RFUlRlbGV0ZXhTdHJpbmcocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcImlhNXN0clwiKSByZXR1cm4gbmV3IF9ERVJJQTVTdHJpbmcocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcInV0Y3RpbWVcIikgcmV0dXJuIG5ldyBfREVSVVRDVGltZShwYXJhbVtrZXldKTtcbiAgICBpZiAoa2V5ID09IFwiZ2VudGltZVwiKSByZXR1cm4gbmV3IF9ERVJHZW5lcmFsaXplZFRpbWUocGFyYW1ba2V5XSk7XG4gICAgaWYgKGtleSA9PSBcInNlcVwiKSB7XG4gICAgICB2YXIgcGFyYW1MaXN0ID0gcGFyYW1ba2V5XTtcbiAgICAgIHZhciBhID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXNuMU9iaiA9IF9uZXdPYmplY3QocGFyYW1MaXN0W2ldKTtcbiAgICAgICAgYS5wdXNoKGFzbjFPYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBfREVSU2VxdWVuY2Uoe1xuICAgICAgICAnYXJyYXknOiBhXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGtleSA9PSBcInNldFwiKSB7XG4gICAgICB2YXIgcGFyYW1MaXN0ID0gcGFyYW1ba2V5XTtcbiAgICAgIHZhciBhID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXNuMU9iaiA9IF9uZXdPYmplY3QocGFyYW1MaXN0W2ldKTtcbiAgICAgICAgYS5wdXNoKGFzbjFPYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBfREVSU2V0KHtcbiAgICAgICAgJ2FycmF5JzogYVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChrZXkgPT0gXCJ0YWdcIikge1xuICAgICAgdmFyIHRhZ1BhcmFtID0gcGFyYW1ba2V5XTtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFnUGFyYW0pID09PSAnW29iamVjdCBBcnJheV0nICYmIHRhZ1BhcmFtLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIHZhciBvYmogPSBfbmV3T2JqZWN0KHRhZ1BhcmFtWzJdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBfREVSVGFnZ2VkT2JqZWN0KHtcbiAgICAgICAgICB0YWc6IHRhZ1BhcmFtWzBdLFxuICAgICAgICAgIGV4cGxpY2l0OiB0YWdQYXJhbVsxXSxcbiAgICAgICAgICBvYmo6IG9ialxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdQYXJhbSA9IHt9O1xuICAgICAgICBpZiAodGFnUGFyYW0uZXhwbGljaXQgIT09IHVuZGVmaW5lZCkgbmV3UGFyYW0uZXhwbGljaXQgPSB0YWdQYXJhbS5leHBsaWNpdDtcbiAgICAgICAgaWYgKHRhZ1BhcmFtLnRhZyAhPT0gdW5kZWZpbmVkKSBuZXdQYXJhbS50YWcgPSB0YWdQYXJhbS50YWc7XG4gICAgICAgIGlmICh0YWdQYXJhbS5vYmogPT09IHVuZGVmaW5lZCkgdGhyb3cgXCJvYmogc2hhbGwgYmUgc3BlY2lmaWVkIGZvciAndGFnJy5cIjtcbiAgICAgICAgbmV3UGFyYW0ub2JqID0gX25ld09iamVjdCh0YWdQYXJhbS5vYmopO1xuICAgICAgICByZXR1cm4gbmV3IF9ERVJUYWdnZWRPYmplY3QobmV3UGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIGdldCBlbmNvZGVkIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04xT2JqZWN0IHNwZWNpZmVkIGJ5IEpTT04gcGFyYW1ldGVyc1xuICAgKiBAbmFtZSBqc29uVG9BU04xSEVYXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMVV0aWxcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtIEpTT04gcGFyYW1ldGVyIHRvIGdlbmVyYXRlIEFTTjFPYmplY3RcbiAgICogQHJldHVybiBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOMU9iamVjdFxuICAgKiBAc2luY2UgYXNuMSAxLjAuNFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQXMgZm9yIEFTTi4xIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiBKU09OIG9iamVjdCxcbiAgICogcGxlYXNlIHNlZSB7QGxpbmsgbmV3T2JqZWN0fS5cbiAgICogQGV4YW1wbGVcbiAgICoganNvblRvQVNOMUhFWCh7J3BybnN0cic6ICdhYWEnfSk7XG4gICAqL1xuICB0aGlzLmpzb25Ub0FTTjFIRVggPSBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICB2YXIgYXNuMU9iaiA9IHRoaXMubmV3T2JqZWN0KHBhcmFtKTtcbiAgICByZXR1cm4gYXNuMU9iai5nZXRFbmNvZGVkSGV4KCk7XG4gIH07XG59KCk7XG4vKipcbiAqIGdldCBkb3Qgbm90ZWQgb2lkIG51bWJlciBzdHJpbmcgZnJvbSBoZXhhZGVjaW1hbCB2YWx1ZSBvZiBPSURcbiAqIEBuYW1lIG9pZEhleFRvSW50XG4gKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBoZXggaGV4YWRlY2ltYWwgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXJcbiAqIEByZXR1cm4ge1N0cmluZ30gZG90IG5vdGVkIHN0cmluZyBvZiBvYmplY3QgaWRlbnRpZmllclxuICogQHNpbmNlIGpzcnNhc2lnbiA0LjguMyBhc24xIDEuMC43XG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgc3RhdGljIG1ldGhvZCBjb252ZXJ0cyBmcm9tIGhleGFkZWNpbWFsIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZlxuICogQVNOLjEgdmFsdWUgb2Ygb2JqZWN0IGlkZW50aWZpZXIgdG8gb2lkIG51bWJlciBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICogS0pVUi5hc24xLkFTTjFVdGlsLm9pZEhleFRvSW50KCc1NTA0MDYnKSAmcmFycjsgXCIyLjUuNC42XCJcbiAqL1xuS0pVUi5hc24xLkFTTjFVdGlsLm9pZEhleFRvSW50ID0gZnVuY3Rpb24gKGhleCkge1xuICB2YXIgcyA9IFwiXCI7XG4gIHZhciBpMDEgPSBwYXJzZUludChoZXguc3Vic3RyKDAsIDIpLCAxNik7XG4gIHZhciBpMCA9IE1hdGguZmxvb3IoaTAxIC8gNDApO1xuICB2YXIgaTEgPSBpMDEgJSA0MDtcbiAgdmFyIHMgPSBpMCArIFwiLlwiICsgaTE7XG4gIHZhciBiaW5idWYgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMjsgaSA8IGhleC5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSwgMiksIDE2KTtcbiAgICB2YXIgYmluID0gKFwiMDAwMDAwMDBcIiArIHZhbHVlLnRvU3RyaW5nKDIpKS5zbGljZSgtOCk7XG4gICAgYmluYnVmID0gYmluYnVmICsgYmluLnN1YnN0cigxLCA3KTtcbiAgICBpZiAoYmluLnN1YnN0cigwLCAxKSA9PSBcIjBcIikge1xuICAgICAgdmFyIGJpID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIoYmluYnVmLCAyKTtcbiAgICAgIHMgPSBzICsgXCIuXCIgKyBiaS50b1N0cmluZygxMCk7XG4gICAgICBiaW5idWYgPSBcIlwiO1xuICAgIH1cbiAgfVxuICA7XG4gIHJldHVybiBzO1xufTtcbi8qKlxuICogZ2V0IGhleGFkZWNpbWFsIHZhbHVlIG9mIG9iamVjdCBpZGVudGlmaWVyIGZyb20gZG90IG5vdGVkIG9pZCB2YWx1ZVxuICogQG5hbWUgb2lkSW50VG9IZXhcbiAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMVV0aWxcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG9pZFN0cmluZyBkb3Qgbm90ZWQgc3RyaW5nIG9mIG9iamVjdCBpZGVudGlmaWVyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHZhbHVlIG9mIG9iamVjdCBpZGVudGlmaWVyXG4gKiBAc2luY2UganNyc2FzaWduIDQuOC4zIGFzbjEgMS4wLjdcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBzdGF0aWMgbWV0aG9kIGNvbnZlcnRzIGZyb20gb2JqZWN0IGlkZW50aWZpZXIgdmFsdWUgc3RyaW5nLlxuICogdG8gaGV4YWRlY2ltYWwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGl0LlxuICogQGV4YW1wbGVcbiAqIEtKVVIuYXNuMS5BU04xVXRpbC5vaWRJbnRUb0hleChcIjIuNS40LjZcIikgJnJhcnI7IFwiNTUwNDA2XCJcbiAqL1xuS0pVUi5hc24xLkFTTjFVdGlsLm9pZEludFRvSGV4ID0gZnVuY3Rpb24gKG9pZFN0cmluZykge1xuICB2YXIgaXRveCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdmFyIGggPSBpLnRvU3RyaW5nKDE2KTtcbiAgICBpZiAoaC5sZW5ndGggPT0gMSkgaCA9ICcwJyArIGg7XG4gICAgcmV0dXJuIGg7XG4gIH07XG4gIHZhciByb2lkdG94ID0gZnVuY3Rpb24gKHJvaWQpIHtcbiAgICB2YXIgaCA9ICcnO1xuICAgIHZhciBiaSA9IG5ldyBfanNibi5CaWdJbnRlZ2VyKHJvaWQsIDEwKTtcbiAgICB2YXIgYiA9IGJpLnRvU3RyaW5nKDIpO1xuICAgIHZhciBwYWRMZW4gPSA3IC0gYi5sZW5ndGggJSA3O1xuICAgIGlmIChwYWRMZW4gPT0gNykgcGFkTGVuID0gMDtcbiAgICB2YXIgYlBhZCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkTGVuOyBpKyspIGJQYWQgKz0gJzAnO1xuICAgIGIgPSBiUGFkICsgYjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoIC0gMTsgaSArPSA3KSB7XG4gICAgICB2YXIgYjggPSBiLnN1YnN0cihpLCA3KTtcbiAgICAgIGlmIChpICE9IGIubGVuZ3RoIC0gNykgYjggPSAnMScgKyBiODtcbiAgICAgIGggKz0gaXRveChwYXJzZUludChiOCwgMikpO1xuICAgIH1cbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgaWYgKCFvaWRTdHJpbmcubWF0Y2goL15bMC05Ll0rJC8pKSB7XG4gICAgdGhyb3cgXCJtYWxmb3JtZWQgb2lkIHN0cmluZzogXCIgKyBvaWRTdHJpbmc7XG4gIH1cbiAgdmFyIGggPSAnJztcbiAgdmFyIGEgPSBvaWRTdHJpbmcuc3BsaXQoJy4nKTtcbiAgdmFyIGkwID0gcGFyc2VJbnQoYVswXSkgKiA0MCArIHBhcnNlSW50KGFbMV0pO1xuICBoICs9IGl0b3goaTApO1xuICBhLnNwbGljZSgwLCAyKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgaCArPSByb2lkdG94KGFbaV0pO1xuICB9XG4gIHJldHVybiBoO1xufTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQWJzdHJhY3QgQVNOLjEgQ2xhc3Nlc1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBlbmNvZGVyIG9iamVjdFxuICogQG5hbWUgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBjbGFzcyBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgZW5jb2RlciBvYmplY3RcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNNb2RpZmllZCBmbGFnIHdoZXRoZXIgaW50ZXJuYWwgZGF0YSB3YXMgY2hhbmdlZFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGhUTFYgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMVlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGhUIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdGFnKFQpXG4gKiBAcHJvcGVydHkge1N0cmluZ30gaEwgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViBsZW5ndGgoTClcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBoViBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIHZhbHVlKFYpXG4gKiBAZGVzY3JpcHRpb25cbiAqL1xuS0pVUi5hc24xLkFTTjFPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpc01vZGlmaWVkID0gdHJ1ZTtcbiAgdmFyIGhUTFYgPSBudWxsO1xuICB2YXIgaFQgPSAnMDAnO1xuICB2YXIgaEwgPSAnMDAnO1xuICB2YXIgaFYgPSAnJztcbiAgLyoqXG4gICAqIGdldCBoZXhhZGVjaW1hbCBBU04uMSBUTFYgbGVuZ3RoKEwpIGJ5dGVzIGZyb20gVExWIHZhbHVlKFYpXG4gICAqIEBuYW1lIGdldExlbmd0aEhleEZyb21WYWx1ZVxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFPYmplY3QjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgbGVuZ3RoKEwpXG4gICAqL1xuICB0aGlzLmdldExlbmd0aEhleEZyb21WYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuaFYgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmhWID09IG51bGwpIHtcbiAgICAgIHRocm93IFwidGhpcy5oViBpcyBudWxsIG9yIHVuZGVmaW5lZC5cIjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaFYubGVuZ3RoICUgMiA9PSAxKSB7XG4gICAgICB0aHJvdyBcInZhbHVlIGhleCBtdXN0IGJlIGV2ZW4gbGVuZ3RoOiBuPVwiICsgaFYubGVuZ3RoICsgXCIsdj1cIiArIHRoaXMuaFY7XG4gICAgfVxuICAgIHZhciBuID0gdGhpcy5oVi5sZW5ndGggLyAyO1xuICAgIHZhciBoTiA9IG4udG9TdHJpbmcoMTYpO1xuICAgIGlmIChoTi5sZW5ndGggJSAyID09IDEpIHtcbiAgICAgIGhOID0gXCIwXCIgKyBoTjtcbiAgICB9XG4gICAgaWYgKG4gPCAxMjgpIHtcbiAgICAgIHJldHVybiBoTjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhObGVuID0gaE4ubGVuZ3RoIC8gMjtcbiAgICAgIGlmIChoTmxlbiA+IDE1KSB7XG4gICAgICAgIHRocm93IFwiQVNOLjEgbGVuZ3RoIHRvbyBsb25nIHRvIHJlcHJlc2VudCBieSA4eDogbiA9IFwiICsgbi50b1N0cmluZygxNik7XG4gICAgICB9XG4gICAgICB2YXIgaGVhZCA9IDEyOCArIGhObGVuO1xuICAgICAgcmV0dXJuIGhlYWQudG9TdHJpbmcoMTYpICsgaE47XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogZ2V0IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgYnl0ZXNcbiAgICogQG5hbWUgZ2V0RW5jb2RlZEhleFxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFPYmplY3QjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFZcbiAgICovXG4gIHRoaXMuZ2V0RW5jb2RlZEhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5oVExWID09IG51bGwgfHwgdGhpcy5pc01vZGlmaWVkKSB7XG4gICAgICB0aGlzLmhWID0gdGhpcy5nZXRGcmVzaFZhbHVlSGV4KCk7XG4gICAgICB0aGlzLmhMID0gdGhpcy5nZXRMZW5ndGhIZXhGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuaFRMViA9IHRoaXMuaFQgKyB0aGlzLmhMICsgdGhpcy5oVjtcbiAgICAgIHRoaXMuaXNNb2RpZmllZCA9IGZhbHNlO1xuICAgICAgLy9hbGVydChcImZpcnN0IHRpbWU6IFwiICsgdGhpcy5oVExWKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaFRMVjtcbiAgfTtcbiAgLyoqXG4gICAqIGdldCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIHZhbHVlKFYpIGJ5dGVzXG4gICAqIEBuYW1lIGdldFZhbHVlSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViB2YWx1ZShWKSBieXRlc1xuICAgKi9cbiAgdGhpcy5nZXRWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdldEVuY29kZWRIZXgoKTtcbiAgICByZXR1cm4gdGhpcy5oVjtcbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnJztcbiAgfTtcbn07XG4vLyA9PSBCRUdJTiBERVJBYnN0cmFjdFN0cmluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8qKlxuICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cmluZyBjbGFzc2VzXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBjbGFzcyBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgc3RyaW5nIGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcyBpbnRlcm5hbCBzdHJpbmcgb2YgdmFsdWVcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5zdHIgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBzdHJpbmc8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZzwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgdmFyIHMgPSBudWxsO1xuICB2YXIgaFYgPSBudWxsO1xuICAvKipcbiAgICogZ2V0IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHN0cmluZyBvYmplY3RcbiAgICogQG5hbWUgZ2V0U3RyaW5nXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHN0cmluZyBvYmplY3RcbiAgICovXG4gIHRoaXMuZ2V0U3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnM7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBzdHJpbmdcbiAgICogQG5hbWUgc2V0U3RyaW5nXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3UyB2YWx1ZSBieSBhIHN0cmluZyB0byBzZXRcbiAgICovXG4gIHRoaXMuc2V0U3RyaW5nID0gZnVuY3Rpb24gKG5ld1MpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5zID0gbmV3UztcbiAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmdcbiAgICogQG5hbWUgc2V0U3RyaW5nSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3SGV4U3RyaW5nIHZhbHVlIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRTdHJpbmdIZXggPSBmdW5jdGlvbiAobmV3SGV4U3RyaW5nKSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMucyA9IG51bGw7XG4gICAgdGhpcy5oViA9IG5ld0hleFN0cmluZztcbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ3N0ciddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtc1snc3RyJ10pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRTdHJpbmdIZXgocGFyYW1zWydoZXgnXSk7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZywgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gPT0gRU5EICAgREVSQWJzdHJhY3RTdHJpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyA9PSBCRUdJTiBERVJBYnN0cmFjdFRpbWUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8qKlxuICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIEdlbmVyYWxpemVkL1VUQ1RpbWUgY2xhc3NcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAqIEBjbGFzcyBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWQvVVRDVGltZSBjbGFzc1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICcxMzA0MzAyMzU5NTlaJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgdmFyIHMgPSBudWxsO1xuICB2YXIgZGF0ZSA9IG51bGw7XG4gIC8vIC0tLSBQUklWQVRFIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdGhpcy5sb2NhbERhdGVUb1VUQyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgdXRjID0gZC5nZXRUaW1lKCkgKyBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgICB2YXIgdXRjRGF0ZSA9IG5ldyBEYXRlKHV0Yyk7XG4gICAgcmV0dXJuIHV0Y0RhdGU7XG4gIH07XG4gIC8qXG4gICAqIGZvcm1hdCBkYXRlIHN0cmluZyBieSBEYXRhIG9iamVjdFxuICAgKiBAbmFtZSBmb3JtYXREYXRlXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQWJzdHJhY3RUaW1lO1xuICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVPYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ3V0Yycgb3IgJ2dlbidcbiAgICogQHBhcmFtIHtib29sZWFufSB3aXRoTWlsbGlzIGZsYWcgZm9yIHdpdGggbWlsbGlzZWN0aW9ucyBvciBub3RcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqICd3aXRoTWlsbGlzJyBmbGFnIGlzIHN1cHBvcnRlZCBmcm9tIGFzbjEgMS4wLjYuXG4gICAqL1xuICB0aGlzLmZvcm1hdERhdGUgPSBmdW5jdGlvbiAoZGF0ZU9iamVjdCwgdHlwZSwgd2l0aE1pbGxpcykge1xuICAgIHZhciBwYWQgPSB0aGlzLnplcm9QYWRkaW5nO1xuICAgIHZhciBkID0gdGhpcy5sb2NhbERhdGVUb1VUQyhkYXRlT2JqZWN0KTtcbiAgICB2YXIgeWVhciA9IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpO1xuICAgIGlmICh0eXBlID09ICd1dGMnKSB5ZWFyID0geWVhci5zdWJzdHIoMiwgMik7XG4gICAgdmFyIG1vbnRoID0gcGFkKFN0cmluZyhkLmdldE1vbnRoKCkgKyAxKSwgMik7XG4gICAgdmFyIGRheSA9IHBhZChTdHJpbmcoZC5nZXREYXRlKCkpLCAyKTtcbiAgICB2YXIgaG91ciA9IHBhZChTdHJpbmcoZC5nZXRIb3VycygpKSwgMik7XG4gICAgdmFyIG1pbiA9IHBhZChTdHJpbmcoZC5nZXRNaW51dGVzKCkpLCAyKTtcbiAgICB2YXIgc2VjID0gcGFkKFN0cmluZyhkLmdldFNlY29uZHMoKSksIDIpO1xuICAgIHZhciBzID0geWVhciArIG1vbnRoICsgZGF5ICsgaG91ciArIG1pbiArIHNlYztcbiAgICBpZiAod2l0aE1pbGxpcyA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIG1pbGxpcyA9IGQuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAgICBpZiAobWlsbGlzICE9IDApIHtcbiAgICAgICAgdmFyIHNNaWxsaXMgPSBwYWQoU3RyaW5nKG1pbGxpcyksIDMpO1xuICAgICAgICBzTWlsbGlzID0gc01pbGxpcy5yZXBsYWNlKC9bMF0rJC8sIFwiXCIpO1xuICAgICAgICBzID0gcyArIFwiLlwiICsgc01pbGxpcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHMgKyBcIlpcIjtcbiAgfTtcbiAgdGhpcy56ZXJvUGFkZGluZyA9IGZ1bmN0aW9uIChzLCBsZW4pIHtcbiAgICBpZiAocy5sZW5ndGggPj0gbGVuKSByZXR1cm4gcztcbiAgICByZXR1cm4gbmV3IEFycmF5KGxlbiAtIHMubGVuZ3RoICsgMSkuam9pbignMCcpICsgcztcbiAgfTtcbiAgLy8gLS0tIFBVQkxJQyBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBnZXQgc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxuICAgKiBAbmFtZSBnZXRTdHJpbmdcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHRpbWUgb2JqZWN0XG4gICAqL1xuICB0aGlzLmdldFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGEgc3RyaW5nXG4gICAqIEBuYW1lIHNldFN0cmluZ1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdTIHZhbHVlIGJ5IGEgc3RyaW5nIHRvIHNldCBzdWNoIGxpa2UgXCIxMzA0MzAyMzU5NTlaXCJcbiAgICovXG4gIHRoaXMuc2V0U3RyaW5nID0gZnVuY3Rpb24gKG5ld1MpIHtcbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5zID0gbmV3UztcbiAgICB0aGlzLmhWID0gc3RvaGV4KG5ld1MpO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGEgRGF0ZSBvYmplY3RcbiAgICogQG5hbWUgc2V0QnlEYXRlVmFsdWVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHllYXIgeWVhciBvZiBkYXRlIChleC4gMjAxMylcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBtb250aCBtb250aCBvZiBkYXRlIGJldHdlZW4gMSBhbmQgMTIgKGV4LiAxMilcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBkYXkgZGF5IG9mIG1vbnRoXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gaG91ciBob3VycyBvZiBkYXRlXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gbWluIG1pbnV0ZXMgb2YgZGF0ZVxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHNlYyBzZWNvbmRzIG9mIGRhdGVcbiAgICovXG4gIHRoaXMuc2V0QnlEYXRlVmFsdWUgPSBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWluLCBzZWMpIHtcbiAgICB2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW4sIHNlYywgMCkpO1xuICAgIHRoaXMuc2V0QnlEYXRlKGRhdGVPYmplY3QpO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcbi8vID09IEVORCAgIERFUkFic3RyYWN0VGltZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gPT0gQkVHSU4gREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vKipcbiAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBzdHJ1Y3R1cmVkIGNsYXNzXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cnVjdHVyZWQgY2xhc3NcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFzbjFBcnJheSBpbnRlcm5hbCBhcnJheSBvZiBBU04xT2JqZWN0XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB2YXIgYXNuMUFycmF5ID0gbnVsbDtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhcnJheSBvZiBBU04xT2JqZWN0XG4gICAqIEBuYW1lIHNldEJ5QVNOMU9iamVjdEFycmF5XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHthcnJheX0gYXNuMU9iamVjdEFycmF5IGFycmF5IG9mIEFTTjFPYmplY3QgdG8gc2V0XG4gICAqL1xuICB0aGlzLnNldEJ5QVNOMU9iamVjdEFycmF5ID0gZnVuY3Rpb24gKGFzbjFPYmplY3RBcnJheSkge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmFzbjFBcnJheSA9IGFzbjFPYmplY3RBcnJheTtcbiAgfTtcbiAgLyoqXG4gICAqIGFwcGVuZCBhbiBBU04xT2JqZWN0IHRvIGludGVybmFsIGFycmF5XG4gICAqIEBuYW1lIGFwcGVuZEFTTjFPYmplY3RcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0FTTjFPYmplY3R9IGFzbjFPYmplY3QgdG8gYWRkXG4gICAqL1xuICB0aGlzLmFwcGVuZEFTTjFPYmplY3QgPSBmdW5jdGlvbiAoYXNuMU9iamVjdCkge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmFzbjFBcnJheS5wdXNoKGFzbjFPYmplY3QpO1xuICB9O1xuICB0aGlzLmFzbjFBcnJheSA9IG5ldyBBcnJheSgpO1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbJ2FycmF5J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5hc24xQXJyYXkgPSBwYXJhbXNbJ2FycmF5J107XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQVNOLjEgT2JqZWN0IENsYXNzZXNcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIEJvb2xlYW5cbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJCb29sZWFuXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBCb29sZWFuXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSQm9vbGVhbiA9IGZ1bmN0aW9uICgpIHtcbiAgS0pVUi5hc24xLkRFUkJvb2xlYW4uc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB0aGlzLmhUID0gXCIwMVwiO1xuICB0aGlzLmhUTFYgPSBcIjAxMDFmZlwiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSQm9vbGVhbiwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBJbnRlZ2VyXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSSW50ZWdlclxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgSW50ZWdlclxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPmludCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBpbnRlZ2VyIHZhbHVlPC9saT5cbiAqIDxsaT5iaWdpbnQgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgQmlnSW50ZWdlciBvYmplY3Q8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZzwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJJbnRlZ2VyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSSW50ZWdlci5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjAyXCI7XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgVG9tIFd1J3MgQmlnSW50ZWdlciBvYmplY3RcbiAgICogQG5hbWUgc2V0QnlCaWdJbnRlZ2VyXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSSW50ZWdlciNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7QmlnSW50ZWdlcn0gYmlnSW50ZWdlclZhbHVlIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRCeUJpZ0ludGVnZXIgPSBmdW5jdGlvbiAoYmlnSW50ZWdlclZhbHVlKSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuaFYgPSBLSlVSLmFzbjEuQVNOMVV0aWwuYmlnSW50VG9NaW5Ud29zQ29tcGxlbWVudHNIZXgoYmlnSW50ZWdlclZhbHVlKTtcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXG4gICAqIEBuYW1lIHNldEJ5SW50ZWdlclxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkludGVnZXJcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gaW50ZWdlciB2YWx1ZSB0byBzZXRcbiAgICovXG4gIHRoaXMuc2V0QnlJbnRlZ2VyID0gZnVuY3Rpb24gKGludFZhbHVlKSB7XG4gICAgdmFyIGJpID0gbmV3IF9qc2JuLkJpZ0ludGVnZXIoU3RyaW5nKGludFZhbHVlKSwgMTApO1xuICAgIHRoaXMuc2V0QnlCaWdJbnRlZ2VyKGJpKTtcbiAgfTtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBpbnRlZ2VyIHZhbHVlXG4gICAqIEBuYW1lIHNldFZhbHVlSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSSW50ZWdlciNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgaW50ZWdlciB2YWx1ZVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogPGJyLz5cbiAgICogTk9URTogVmFsdWUgc2hhbGwgYmUgcmVwcmVzZW50ZWQgYnkgbWluaW11bSBvY3RldCBsZW5ndGggb2ZcbiAgICogdHdvJ3MgY29tcGxlbWVudCByZXByZXNlbnRhdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICogbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKDEyMyk7XG4gICAqIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7J2ludCc6IDEyM30pO1xuICAgKiBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydoZXgnOiAnMWZhZCd9KTtcbiAgICovXG4gIHRoaXMuc2V0VmFsdWVIZXggPSBmdW5jdGlvbiAobmV3SGV4U3RyaW5nKSB7XG4gICAgdGhpcy5oViA9IG5ld0hleFN0cmluZztcbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbJ2JpZ2ludCddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0QnlCaWdJbnRlZ2VyKHBhcmFtc1snYmlnaW50J10pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaW50J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zWydpbnQnXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuc2V0QnlJbnRlZ2VyKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydoZXgnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldFZhbHVlSGV4KHBhcmFtc1snaGV4J10pO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSSW50ZWdlciwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBlbmNvZGVkIEJpdFN0cmluZyBwcmltaXRpdmVcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmdcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZWQgQml0U3RyaW5nIHByaW1pdGl2ZVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPmJpbiAtIHNwZWNpZnkgYmluYXJ5IHN0cmluZyAoZXguICcxMDExMScpPC9saT5cbiAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgYm9vbGVhbiAoZXguIFt0cnVlLGZhbHNlLHRydWUsdHJ1ZV0pPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSB2YWx1ZShWKSBpbmNsdWRpbmcgdW51c2VkIGJpdHM8L2xpPlxuICogPGxpPm9iaiAtIHNwZWNpZnkge0BsaW5rIEtKVVIuYXNuMS5BU04xVXRpbC5uZXdPYmplY3R9XG4gKiBhcmd1bWVudCBmb3IgXCJCaXRTdHJpbmcgZW5jYXBzdWxhdGVzXCIgc3RydWN0dXJlLjwvbGk+XG4gKiA8L3VsPlxuICogTk9URTE6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLjxici8+XG4gKiBOT1RFMjogJ29iaicgcGFyYW1ldGVyIGhhdmUgYmVlbiBzdXBwb3J0ZWQgc2luY2VcbiAqIGFzbjEgMS4wLjExLCBqc3JzYXNpZ24gNi4xLjEgKDIwMTYtU2VwLTI1KS48YnIvPlxuICogQGV4YW1wbGVcbiAqIC8vIGRlZmF1bHQgY29uc3RydWN0b3JcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xuICogLy8gaW5pdGlhbGl6ZSB3aXRoIGJpbmFyeSBzdHJpbmdcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7YmluOiBcIjEwMTFcIn0pO1xuICogLy8gaW5pdGlhbGl6ZSB3aXRoIGJvb2xlYW4gYXJyYXlcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZyh7YXJyYXk6IFt0cnVlLGZhbHNlLHRydWUsdHJ1ZV19KTtcbiAqIC8vIGluaXRpYWxpemUgd2l0aCBoZXhhZGVjaW1hbCBzdHJpbmcgKDA0IGlzIHVudXNlZCBiaXRzKVxuICogbyA9IG5ldyBLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcoe2hleDogXCIwNGJhYzBcIn0pO1xuICogLy8gaW5pdGlhbGl6ZSB3aXRoIEFTTjFVdGlsLm5ld09iamVjdCBhcmd1bWVudCBmb3IgZW5jYXBzdWxhdGVkXG4gKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcoe29iajoge3NlcTogW3tpbnQ6IDN9LCB7cHJuc3RyOiAnYWFhJ31dfX0pO1xuICogLy8gYWJvdmUgZ2VuZXJhdGVzIGEgQVNOLjEgZGF0YSBsaWtlIHRoaXM6XG4gKiAvLyBCSVQgU1RSSU5HLCBlbmNhcHN1bGF0ZXMge1xuICogLy8gICBTRVFVRU5DRSB7XG4gKiAvLyAgICAgSU5URUdFUiAzXG4gKiAvLyAgICAgUHJpbnRhYmxlU3RyaW5nICdhYWEnXG4gKiAvLyAgICAgfVxuICogLy8gICB9XG4gKi9cbktKVVIuYXNuMS5ERVJCaXRTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcGFyYW1zLm9iaiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBvID0gS0pVUi5hc24xLkFTTjFVdGlsLm5ld09iamVjdChwYXJhbXMub2JqKTtcbiAgICBwYXJhbXMuaGV4ID0gXCIwMFwiICsgby5nZXRFbmNvZGVkSGV4KCk7XG4gIH1cbiAgS0pVUi5hc24xLkRFUkJpdFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcIjAzXCI7XG4gIC8qKlxuICAgKiBzZXQgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmcgaW5jbHVkaW5nIHVudXNlZCBiaXRzXG4gICAqIEBuYW1lIHNldEhleFZhbHVlSW5jbHVkaW5nVW51c2VkQml0c1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzXG4gICAqL1xuICB0aGlzLnNldEhleFZhbHVlSW5jbHVkaW5nVW51c2VkQml0cyA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzKSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuaFYgPSBuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzO1xuICB9O1xuICAvKipcbiAgICogc2V0IEFTTi4xIHZhbHVlKFYpIGJ5IHVudXNlZCBiaXQgYW5kIGhleGFkZWNpbWFsIHN0cmluZyBvZiB2YWx1ZVxuICAgKiBAbmFtZSBzZXRVbnVzZWRCaXRzQW5kSGV4VmFsdWVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0ludGVnZXJ9IHVudXNlZEJpdHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhWYWx1ZVxuICAgKi9cbiAgdGhpcy5zZXRVbnVzZWRCaXRzQW5kSGV4VmFsdWUgPSBmdW5jdGlvbiAodW51c2VkQml0cywgaFZhbHVlKSB7XG4gICAgaWYgKHVudXNlZEJpdHMgPCAwIHx8IDcgPCB1bnVzZWRCaXRzKSB7XG4gICAgICB0aHJvdyBcInVudXNlZCBiaXRzIHNoYWxsIGJlIGZyb20gMCB0byA3OiB1ID0gXCIgKyB1bnVzZWRCaXRzO1xuICAgIH1cbiAgICB2YXIgaFVudXNlZEJpdHMgPSBcIjBcIiArIHVudXNlZEJpdHM7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuaFYgPSBoVW51c2VkQml0cyArIGhWYWx1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIHNldCBBU04uMSBERVIgQml0U3RyaW5nIGJ5IGJpbmFyeSBzdHJpbmc8YnIvPlxuICAgKiBAbmFtZSBzZXRCeUJpbmFyeVN0cmluZ1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZyNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiaW5hcnlTdHJpbmcgYmluYXJ5IHZhbHVlIHN0cmluZyAoaS5lLiAnMTAxMTEnKVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogSXRzIHVudXNlZCBiaXRzIHdpbGwgYmUgY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGxlbmd0aCBvZlxuICAgKiAnYmluYXJ5VmFsdWUnLiA8YnIvPlxuICAgKiBOT1RFOiBUcmFpbGluZyB6ZXJvcyAnMCcgd2lsbCBiZSBpZ25vcmVkLlxuICAgKiBAZXhhbXBsZVxuICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcoKTtcbiAgICogby5zZXRCeUJvb2xlYW5BcnJheShcIjAxMDExXCIpO1xuICAgKi9cbiAgdGhpcy5zZXRCeUJpbmFyeVN0cmluZyA9IGZ1bmN0aW9uIChiaW5hcnlTdHJpbmcpIHtcbiAgICBiaW5hcnlTdHJpbmcgPSBiaW5hcnlTdHJpbmcucmVwbGFjZSgvMCskLywgJycpO1xuICAgIHZhciB1bnVzZWRCaXRzID0gOCAtIGJpbmFyeVN0cmluZy5sZW5ndGggJSA4O1xuICAgIGlmICh1bnVzZWRCaXRzID09IDgpIHVudXNlZEJpdHMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHVudXNlZEJpdHM7IGkrKykge1xuICAgICAgYmluYXJ5U3RyaW5nICs9ICcwJztcbiAgICB9XG4gICAgdmFyIGggPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeVN0cmluZy5sZW5ndGggLSAxOyBpICs9IDgpIHtcbiAgICAgIHZhciBiID0gYmluYXJ5U3RyaW5nLnN1YnN0cihpLCA4KTtcbiAgICAgIHZhciB4ID0gcGFyc2VJbnQoYiwgMikudG9TdHJpbmcoMTYpO1xuICAgICAgaWYgKHgubGVuZ3RoID09IDEpIHggPSAnMCcgKyB4O1xuICAgICAgaCArPSB4O1xuICAgIH1cbiAgICB0aGlzLmhUTFYgPSBudWxsO1xuICAgIHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG4gICAgdGhpcy5oViA9ICcwJyArIHVudXNlZEJpdHMgKyBoO1xuICB9O1xuICAvKipcbiAgICogc2V0IEFTTi4xIFRMViB2YWx1ZShWKSBieSBhbiBhcnJheSBvZiBib29sZWFuPGJyLz5cbiAgICogQG5hbWUgc2V0QnlCb29sZWFuQXJyYXlcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2FycmF5fSBib29sZWFuQXJyYXkgYXJyYXkgb2YgYm9vbGVhbiAoZXguIFt0cnVlLCBmYWxzZSwgdHJ1ZV0pXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBOT1RFOiBUcmFpbGluZyBmYWxzZXMgd2lsbCBiZSBpZ25vcmVkIGluIHRoZSBBU04uMSBERVIgT2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcoKTtcbiAgICogby5zZXRCeUJvb2xlYW5BcnJheShbZmFsc2UsIHRydWUsIGZhbHNlLCB0cnVlLCB0cnVlXSk7XG4gICAqL1xuICB0aGlzLnNldEJ5Qm9vbGVhbkFycmF5ID0gZnVuY3Rpb24gKGJvb2xlYW5BcnJheSkge1xuICAgIHZhciBzID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib29sZWFuQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChib29sZWFuQXJyYXlbaV0gPT0gdHJ1ZSkge1xuICAgICAgICBzICs9ICcxJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMgKz0gJzAnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldEJ5QmluYXJ5U3RyaW5nKHMpO1xuICB9O1xuICAvKipcbiAgICogZ2VuZXJhdGUgYW4gYXJyYXkgb2YgZmFsc2VzIHdpdGggc3BlY2lmaWVkIGxlbmd0aDxici8+XG4gICAqIEBuYW1lIG5ld0ZhbHNlQXJyYXlcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmdcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gbkxlbmd0aCBsZW5ndGggb2YgYXJyYXkgdG8gZ2VuZXJhdGVcbiAgICogQHJldHVybiB7YXJyYXl9IGFycmF5IG9mIGJvb2xlYW4gZmFsc2VzXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIHN0YXRpYyBtZXRob2QgbWF5IGJlIHVzZWZ1bCB0byBpbml0aWFsaXplIGJvb2xlYW4gYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUkJpdFN0cmluZygpO1xuICAgKiBvLm5ld0ZhbHNlQXJyYXkoMykgJnJhcnI7IFtmYWxzZSwgZmFsc2UsIGZhbHNlXVxuICAgKi9cbiAgdGhpcy5uZXdGYWxzZUFycmF5ID0gZnVuY3Rpb24gKG5MZW5ndGgpIHtcbiAgICB2YXIgYSA9IG5ldyBBcnJheShuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5MZW5ndGg7IGkrKykge1xuICAgICAgYVtpXSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJzdHJpbmdcIiAmJiBwYXJhbXMudG9Mb3dlckNhc2UoKS5tYXRjaCgvXlswLTlhLWZdKyQvKSkge1xuICAgICAgdGhpcy5zZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHMocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0SGV4VmFsdWVJbmNsdWRpbmdVbnVzZWRCaXRzKHBhcmFtc1snaGV4J10pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snYmluJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRCeUJpbmFyeVN0cmluZyhwYXJhbXNbJ2JpbiddKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2FycmF5J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRCeUJvb2xlYW5BcnJheShwYXJhbXNbJ2FycmF5J10pO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSQml0U3RyaW5nLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIE9jdGV0U3RyaW5nPGJyLz5cbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgT2N0ZXRTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBBU04uMSBPY3RldFN0cmluZyBzaW1wbGUgdHlwZS48YnIvPlxuICogU3VwcG9ydGVkIFwicGFyYW1zXCIgYXR0cmlidXRlcyBhcmU6XG4gKiA8dWw+XG4gKiA8bGk+c3RyIC0gdG8gc2V0IGEgc3RyaW5nIGFzIGEgdmFsdWU8L2xpPlxuICogPGxpPmhleCAtIHRvIHNldCBhIGhleGFkZWNpbWFsIHN0cmluZyBhcyBhIHZhbHVlPC9saT5cbiAqIDxsaT5vYmogLSB0byBzZXQgYSBlbmNhcHN1bGF0ZWQgQVNOLjEgdmFsdWUgYnkgSlNPTiBvYmplY3RcbiAqIHdoaWNoIGlzIGRlZmluZWQgaW4ge0BsaW5rIEtKVVIuYXNuMS5BU04xVXRpbC5uZXdPYmplY3R9PC9saT5cbiAqIDwvdWw+XG4gKiBOT1RFOiBBIHBhcmFtZXRlciAnb2JqJyBoYXZlIGJlZW4gc3VwcG9ydGVkXG4gKiBmb3IgXCJPQ1RFVCBTVFJJTkcsIGVuY2Fwc3VsYXRlc1wiIHN0cnVjdHVyZS5cbiAqIHNpbmNlIGFzbjEgMS4wLjExLCBqc3JzYXNpZ24gNi4xLjEgKDIwMTYtU2VwLTI1KS5cbiAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xuICogQGV4YW1wbGVcbiAqIC8vIGRlZmF1bHQgY29uc3RydWN0b3JcbiAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nKCk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggc3RyaW5nXG4gKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZyh7c3RyOiBcImFhYVwifSk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggaGV4YWRlY2ltYWwgc3RyaW5nXG4gKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZyh7aGV4OiBcIjYxNjE2MVwifSk7XG4gKiAvLyBpbml0aWFsaXplIHdpdGggQVNOMVV0aWwubmV3T2JqZWN0IGFyZ3VtZW50XG4gKiBvID0gbmV3IEtKVVIuYXNuMS5ERVJPY3RldFN0cmluZyh7b2JqOiB7c2VxOiBbe2ludDogM30sIHtwcm5zdHI6ICdhYWEnfV19fSk7XG4gKiAvLyBhYm92ZSBnZW5lcmF0ZXMgYSBBU04uMSBkYXRhIGxpa2UgdGhpczpcbiAqIC8vIE9DVEVUIFNUUklORywgZW5jYXBzdWxhdGVzIHtcbiAqIC8vICAgU0VRVUVOQ0Uge1xuICogLy8gICAgIElOVEVHRVIgM1xuICogLy8gICAgIFByaW50YWJsZVN0cmluZyAnYWFhJ1xuICogLy8gICAgIH1cbiAqIC8vICAgfVxuICovXG5LSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcGFyYW1zLm9iaiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBvID0gS0pVUi5hc24xLkFTTjFVdGlsLm5ld09iamVjdChwYXJhbXMub2JqKTtcbiAgICBwYXJhbXMuaGV4ID0gby5nZXRFbmNvZGVkSGV4KCk7XG4gIH1cbiAgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIwNFwiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIE51bGxcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJOdWxsXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBOdWxsXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSTnVsbCA9IGZ1bmN0aW9uICgpIHtcbiAgS0pVUi5hc24xLkRFUk51bGwuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB0aGlzLmhUID0gXCIwNVwiO1xuICB0aGlzLmhUTFYgPSBcIjA1MDBcIjtcbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUk51bGwsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgT2JqZWN0SWRlbnRpZmllclxuICogQG5hbWUgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXJcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE9iamVjdElkZW50aWZpZXJcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydvaWQnOiAnMi41LjQuNSd9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPm9pZCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIG9pZCBzdHJpbmcgKGV4LiAyLjUuNC4xMyk8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZzwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICB2YXIgaXRveCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdmFyIGggPSBpLnRvU3RyaW5nKDE2KTtcbiAgICBpZiAoaC5sZW5ndGggPT0gMSkgaCA9ICcwJyArIGg7XG4gICAgcmV0dXJuIGg7XG4gIH07XG4gIHZhciByb2lkdG94ID0gZnVuY3Rpb24gKHJvaWQpIHtcbiAgICB2YXIgaCA9ICcnO1xuICAgIHZhciBiaSA9IG5ldyBfanNibi5CaWdJbnRlZ2VyKHJvaWQsIDEwKTtcbiAgICB2YXIgYiA9IGJpLnRvU3RyaW5nKDIpO1xuICAgIHZhciBwYWRMZW4gPSA3IC0gYi5sZW5ndGggJSA3O1xuICAgIGlmIChwYWRMZW4gPT0gNykgcGFkTGVuID0gMDtcbiAgICB2YXIgYlBhZCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFkTGVuOyBpKyspIGJQYWQgKz0gJzAnO1xuICAgIGIgPSBiUGFkICsgYjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoIC0gMTsgaSArPSA3KSB7XG4gICAgICB2YXIgYjggPSBiLnN1YnN0cihpLCA3KTtcbiAgICAgIGlmIChpICE9IGIubGVuZ3RoIC0gNykgYjggPSAnMScgKyBiODtcbiAgICAgIGggKz0gaXRveChwYXJzZUludChiOCwgMikpO1xuICAgIH1cbiAgICByZXR1cm4gaDtcbiAgfTtcbiAgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB0aGlzLmhUID0gXCIwNlwiO1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nXG4gICAqIEBuYW1lIHNldFZhbHVlSGV4XG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmcgaGV4YWRlY2ltYWwgdmFsdWUgb2YgT0lEIGJ5dGVzXG4gICAqL1xuICB0aGlzLnNldFZhbHVlSGV4ID0gZnVuY3Rpb24gKG5ld0hleFN0cmluZykge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLnMgPSBudWxsO1xuICAgIHRoaXMuaFYgPSBuZXdIZXhTdHJpbmc7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBPSUQgc3RyaW5nPGJyLz5cbiAgICogQG5hbWUgc2V0VmFsdWVPaWRTdHJpbmdcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9pZFN0cmluZyBPSUQgc3RyaW5nIChleC4gMi41LjQuMTMpXG4gICAqIEBleGFtcGxlXG4gICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIoKTtcbiAgICogby5zZXRWYWx1ZU9pZFN0cmluZyhcIjIuNS40LjEzXCIpO1xuICAgKi9cbiAgdGhpcy5zZXRWYWx1ZU9pZFN0cmluZyA9IGZ1bmN0aW9uIChvaWRTdHJpbmcpIHtcbiAgICBpZiAoIW9pZFN0cmluZy5tYXRjaCgvXlswLTkuXSskLykpIHtcbiAgICAgIHRocm93IFwibWFsZm9ybWVkIG9pZCBzdHJpbmc6IFwiICsgb2lkU3RyaW5nO1xuICAgIH1cbiAgICB2YXIgaCA9ICcnO1xuICAgIHZhciBhID0gb2lkU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgdmFyIGkwID0gcGFyc2VJbnQoYVswXSkgKiA0MCArIHBhcnNlSW50KGFbMV0pO1xuICAgIGggKz0gaXRveChpMCk7XG4gICAgYS5zcGxpY2UoMCwgMik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoICs9IHJvaWR0b3goYVtpXSk7XG4gICAgfVxuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLnMgPSBudWxsO1xuICAgIHRoaXMuaFYgPSBoO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGEgT0lEIG5hbWVcbiAgICogQG5hbWUgc2V0VmFsdWVOYW1lXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvaWROYW1lIE9JRCBuYW1lIChleC4gJ3NlcnZlckF1dGgnKVxuICAgKiBAc2luY2UgMS4wLjFcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIE9JRCBuYW1lIHNoYWxsIGJlIGRlZmluZWQgaW4gJ0tKVVIuYXNuMS54NTA5Lk9JRC5uYW1lMm9pZExpc3QnLlxuICAgKiBPdGhlcndpc2UgcmFpc2UgZXJyb3IuXG4gICAqIEBleGFtcGxlXG4gICAqIG8gPSBuZXcgS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIoKTtcbiAgICogby5zZXRWYWx1ZU5hbWUoXCJzZXJ2ZXJBdXRoXCIpO1xuICAgKi9cbiAgdGhpcy5zZXRWYWx1ZU5hbWUgPSBmdW5jdGlvbiAob2lkTmFtZSkge1xuICAgIHZhciBvaWQgPSBLSlVSLmFzbjEueDUwOS5PSUQubmFtZTJvaWQob2lkTmFtZSk7XG4gICAgaWYgKG9pZCAhPT0gJycpIHtcbiAgICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcob2lkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJERVJPYmplY3RJZGVudGlmaWVyIG9pZE5hbWUgdW5kZWZpbmVkOiBcIiArIG9pZE5hbWU7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAocGFyYW1zLm1hdGNoKC9eWzAtMl0uWzAtOS5dKyQvKSkge1xuICAgICAgICB0aGlzLnNldFZhbHVlT2lkU3RyaW5nKHBhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFZhbHVlTmFtZShwYXJhbXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1zLm9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFZhbHVlT2lkU3RyaW5nKHBhcmFtcy5vaWQpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmhleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFZhbHVlSGV4KHBhcmFtcy5oZXgpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRWYWx1ZU5hbWUocGFyYW1zLm5hbWUpO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBFbnVtZXJhdGVkXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSRW51bWVyYXRlZFxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgRW51bWVyYXRlZFxuICogQGV4dGVuZHMgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPmludCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBpbnRlZ2VyIHZhbHVlPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICogQGV4YW1wbGVcbiAqIG5ldyBLSlVSLmFzbjEuREVSRW51bWVyYXRlZCgxMjMpO1xuICogbmV3IEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkKHtpbnQ6IDEyM30pO1xuICogbmV3IEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkKHtoZXg6ICcxZmFkJ30pO1xuICovXG5LSlVSLmFzbjEuREVSRW51bWVyYXRlZCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB0aGlzLmhUID0gXCIwYVwiO1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IFRvbSBXdSdzIEJpZ0ludGVnZXIgb2JqZWN0XG4gICAqIEBuYW1lIHNldEJ5QmlnSW50ZWdlclxuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkVudW1lcmF0ZWQjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0JpZ0ludGVnZXJ9IGJpZ0ludGVnZXJWYWx1ZSB0byBzZXRcbiAgICovXG4gIHRoaXMuc2V0QnlCaWdJbnRlZ2VyID0gZnVuY3Rpb24gKGJpZ0ludGVnZXJWYWx1ZSkge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmhWID0gS0pVUi5hc24xLkFTTjFVdGlsLmJpZ0ludFRvTWluVHdvc0NvbXBsZW1lbnRzSGV4KGJpZ0ludGVnZXJWYWx1ZSk7XG4gIH07XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgaW50ZWdlciB2YWx1ZVxuICAgKiBAbmFtZSBzZXRCeUludGVnZXJcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbnRlZ2VyIHZhbHVlIHRvIHNldFxuICAgKi9cbiAgdGhpcy5zZXRCeUludGVnZXIgPSBmdW5jdGlvbiAoaW50VmFsdWUpIHtcbiAgICB2YXIgYmkgPSBuZXcgX2pzYm4uQmlnSW50ZWdlcihTdHJpbmcoaW50VmFsdWUpLCAxMCk7XG4gICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIoYmkpO1xuICB9O1xuICAvKipcbiAgICogc2V0IHZhbHVlIGJ5IGludGVnZXIgdmFsdWVcbiAgICogQG5hbWUgc2V0VmFsdWVIZXhcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJFbnVtZXJhdGVkI1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBpbnRlZ2VyIHZhbHVlXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiA8YnIvPlxuICAgKiBOT1RFOiBWYWx1ZSBzaGFsbCBiZSByZXByZXNlbnRlZCBieSBtaW5pbXVtIG9jdGV0IGxlbmd0aCBvZlxuICAgKiB0d28ncyBjb21wbGVtZW50IHJlcHJlc2VudGF0aW9uLlxuICAgKi9cbiAgdGhpcy5zZXRWYWx1ZUhleCA9IGZ1bmN0aW9uIChuZXdIZXhTdHJpbmcpIHtcbiAgICB0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtc1snaW50J10gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zZXRCeUludGVnZXIocGFyYW1zWydpbnQnXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuc2V0QnlJbnRlZ2VyKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydoZXgnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldFZhbHVlSGV4KHBhcmFtc1snaGV4J10pO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSRW51bWVyYXRlZCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBVVEY4U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSVVRGOFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVVRGOFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUlVURjhTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJVVEY4U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIwY1wiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVVRGOFN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgTnVtZXJpY1N0cmluZ1xuICogQG5hbWUgS0pVUi5hc24xLkRFUk51bWVyaWNTdHJpbmdcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE51bWVyaWNTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSTnVtZXJpY1N0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgdGhpcy5oVCA9IFwiMTJcIjtcbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUk51bWVyaWNTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFByaW50YWJsZVN0cmluZ1xuICogQG5hbWUgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgUHJpbnRhYmxlU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIxM1wiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBUZWxldGV4U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVGVsZXRleFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJUZWxldGV4U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIxNFwiO1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgSUE1U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSSUE1U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBJQTVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJJQTVTdHJpbmcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJJQTVTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIHRoaXMuaFQgPSBcIjE2XCI7XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJJQTVTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFVUQ1RpbWVcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJVVENUaW1lXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBVVENUaW1lXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzEzMDQzMDIzNTk1OVonfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPnN0ciAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIHN0cmluZyAoZXguJzEzMDQzMDIzNTk1OVonKTwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDxsaT5kYXRlIC0gc3BlY2lmeSBEYXRlIG9iamVjdC48L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICogPGg0PkVYQU1QTEVTPC9oND5cbiAqIEBleGFtcGxlXG4gKiBkMSA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSgpO1xuICogZDEuc2V0U3RyaW5nKCcxMzA0MzAxMjU5NTlaJyk7XG4gKlxuICogZDIgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoeydzdHInOiAnMTMwNDMwMTI1OTU5Wid9KTtcbiAqIGQzID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKHsnZGF0ZSc6IG5ldyBEYXRlKERhdGUuVVRDKDIwMTUsIDAsIDMxLCAwLCAwLCAwLCAwKSl9KTtcbiAqIGQ0ID0gbmV3IEtKVVIuYXNuMS5ERVJVVENUaW1lKCcxMzA0MzAxMjU5NTlaJyk7XG4gKi9cbktKVVIuYXNuMS5ERVJVVENUaW1lID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSVVRDVGltZS5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgdGhpcy5oVCA9IFwiMTdcIjtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhIERhdGUgb2JqZWN0PGJyLz5cbiAgICogQG5hbWUgc2V0QnlEYXRlXG4gICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSVVRDVGltZSNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RGF0ZX0gZGF0ZU9iamVjdCBEYXRlIG9iamVjdCB0byBzZXQgQVNOLjEgdmFsdWUoVilcbiAgICogQGV4YW1wbGVcbiAgICogbyA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSgpO1xuICAgKiBvLnNldEJ5RGF0ZShuZXcgRGF0ZShcIjIwMTYvMTIvMzFcIikpO1xuICAgKi9cbiAgdGhpcy5zZXRCeURhdGUgPSBmdW5jdGlvbiAoZGF0ZU9iamVjdCkge1xuICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgdGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmRhdGUgPSBkYXRlT2JqZWN0O1xuICAgIHRoaXMucyA9IHRoaXMuZm9ybWF0RGF0ZSh0aGlzLmRhdGUsICd1dGMnKTtcbiAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XG4gIH07XG4gIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZGF0ZSA9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0aGlzLnMgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMucyA9IHRoaXMuZm9ybWF0RGF0ZSh0aGlzLmRhdGUsICd1dGMnKTtcbiAgICAgIHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaFY7XG4gIH07XG4gIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChwYXJhbXMuc3RyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtcy5zdHIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiICYmIHBhcmFtcy5tYXRjaCgvXlswLTldezEyfVokLykpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuaGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RyaW5nSGV4KHBhcmFtcy5oZXgpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXRCeURhdGUocGFyYW1zLmRhdGUpO1xuICAgIH1cbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSVVRDVGltZSwgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZSk7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIEdlbmVyYWxpemVkVGltZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZVxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWRUaW1lXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzIwMTMwNDMwMjM1OTU5Wid9KVxuICogQHByb3BlcnR5IHtCb29sZWFufSB3aXRoTWlsbGlzIGZsYWcgdG8gc2hvdyBtaWxsaXNlY29uZHMgb3Igbm90XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lXG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5zdHIgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBzdHJpbmcgKGV4LicyMDEzMDQzMDIzNTk1OVonKTwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDxsaT5kYXRlIC0gc3BlY2lmeSBEYXRlIG9iamVjdC48L2xpPlxuICogPGxpPm1pbGxpcyAtIHNwZWNpZnkgZmxhZyB0byBzaG93IG1pbGxpc2Vjb25kcyAoZnJvbSAxLjAuNik8L2xpPlxuICogPC91bD5cbiAqIE5PVEUxOiAncGFyYW1zJyBjYW4gYmUgb21pdHRlZC5cbiAqIE5PVEUyOiAnd2l0aE1pbGxpcycgcHJvcGVydHkgaXMgc3VwcG9ydGVkIGZyb20gYXNuMSAxLjAuNi5cbiAqL1xuS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUkdlbmVyYWxpemVkVGltZS5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgdGhpcy5oVCA9IFwiMThcIjtcbiAgdGhpcy53aXRoTWlsbGlzID0gZmFsc2U7XG4gIC8qKlxuICAgKiBzZXQgdmFsdWUgYnkgYSBEYXRlIG9iamVjdFxuICAgKiBAbmFtZSBzZXRCeURhdGVcbiAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWUjXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0RhdGV9IGRhdGVPYmplY3QgRGF0ZSBvYmplY3QgdG8gc2V0IEFTTi4xIHZhbHVlKFYpXG4gICAqIEBleGFtcGxlXG4gICAqIFdoZW4geW91IHNwZWNpZnkgVVRDIHRpbWUsIHVzZSAnRGF0ZS5VVEMnIG1ldGhvZCBsaWtlIHRoaXM6PGJyLz5cbiAgICogbzEgPSBuZXcgREVSVVRDVGltZSgpO1xuICAgKiBvMS5zZXRCeURhdGUoZGF0ZSk7XG4gICAqXG4gICAqIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygyMDE1LCAwLCAzMSwgMjMsIDU5LCA1OSwgMCkpOyAjMjAxNUpBTjMxIDIzOjU5OjU5XG4gICAqL1xuICB0aGlzLnNldEJ5RGF0ZSA9IGZ1bmN0aW9uIChkYXRlT2JqZWN0KSB7XG4gICAgdGhpcy5oVExWID0gbnVsbDtcbiAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGVPYmplY3Q7XG4gICAgdGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ2dlbicsIHRoaXMud2l0aE1pbGxpcyk7XG4gICAgdGhpcy5oViA9IHN0b2hleCh0aGlzLnMpO1xuICB9O1xuICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ2dlbicsIHRoaXMud2l0aE1pbGxpcyk7XG4gICAgICB0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocGFyYW1zLnN0ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMuc3RyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT0gXCJzdHJpbmdcIiAmJiBwYXJhbXMubWF0Y2goL15bMC05XXsxNH1aJC8pKSB7XG4gICAgICB0aGlzLnNldFN0cmluZyhwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmhleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldFN0cmluZ0hleChwYXJhbXMuaGV4KTtcbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0QnlEYXRlKHBhcmFtcy5kYXRlKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5taWxsaXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMud2l0aE1pbGxpcyA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuX3lhaG9vLllBSE9PLmxhbmcuZXh0ZW5kKEtKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWUsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBTZXF1ZW5jZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUlNlcXVlbmNlXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBTZXF1ZW5jZVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+YXJyYXkgLSBzcGVjaWZ5IGFycmF5IG9mIEFTTjFPYmplY3QgdG8gc2V0IGVsZW1lbnRzIG9mIGNvbnRlbnQ8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5LSlVSLmFzbjEuREVSU2VxdWVuY2UgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIEtKVVIuYXNuMS5ERVJTZXF1ZW5jZS5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgdGhpcy5oVCA9IFwiMzBcIjtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFzbjFBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFzbjFPYmogPSB0aGlzLmFzbjFBcnJheVtpXTtcbiAgICAgIGggKz0gYXNuMU9iai5nZXRFbmNvZGVkSGV4KCk7XG4gICAgfVxuICAgIHRoaXMuaFYgPSBoO1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSU2VxdWVuY2UsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQpO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBTZXRcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJTZXRcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIFNldFxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+YXJyYXkgLSBzcGVjaWZ5IGFycmF5IG9mIEFTTjFPYmplY3QgdG8gc2V0IGVsZW1lbnRzIG9mIGNvbnRlbnQ8L2xpPlxuICogPGxpPnNvcnRmbGFnIC0gZmxhZyBmb3Igc29ydCAoZGVmYXVsdDogdHJ1ZSkuIEFTTi4xIEJFUiBpcyBub3Qgc29ydGVkIGluICdTRVQgT0YnLjwvbGk+XG4gKiA8L3VsPlxuICogTk9URTE6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLjxici8+XG4gKiBOT1RFMjogc29ydGZsYWcgaXMgc3VwcG9ydGVkIHNpbmNlIDEuMC41LlxuICovXG5LSlVSLmFzbjEuREVSU2V0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBLSlVSLmFzbjEuREVSU2V0LnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICB0aGlzLmhUID0gXCIzMVwiO1xuICB0aGlzLnNvcnRGbGFnID0gdHJ1ZTsgLy8gaXRlbSBzaGFsbCBiZSBzb3J0ZWQgb25seSBpbiBBU04uMSBERVJcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhID0gbmV3IEFycmF5KCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFzbjFBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFzbjFPYmogPSB0aGlzLmFzbjFBcnJheVtpXTtcbiAgICAgIGEucHVzaChhc24xT2JqLmdldEVuY29kZWRIZXgoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnRGbGFnID09IHRydWUpIGEuc29ydCgpO1xuICAgIHRoaXMuaFYgPSBhLmpvaW4oJycpO1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuc29ydGZsYWcgIT0gXCJ1bmRlZmluZWRcIiAmJiBwYXJhbXMuc29ydGZsYWcgPT0gZmFsc2UpIHRoaXMuc29ydEZsYWcgPSBmYWxzZTtcbiAgfVxufTtcbl95YWhvby5ZQUhPTy5sYW5nLmV4dGVuZChLSlVSLmFzbjEuREVSU2V0LCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkKTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgVGFnZ2VkT2JqZWN0XG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0XG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBUYWdnZWRPYmplY3RcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBQYXJhbWV0ZXIgJ3RhZ05vTmV4JyBpcyBBU04uMSB0YWcoVCkgdmFsdWUgZm9yIHRoaXMgb2JqZWN0LlxuICogRm9yIGV4YW1wbGUsIGlmIHlvdSBmaW5kICdbMV0nIHRhZyBpbiBhIEFTTi4xIGR1bXAsXG4gKiAndGFnTm9IZXgnIHdpbGwgYmUgJ2ExJy5cbiAqIDxici8+XG4gKiBBcyBmb3Igb3B0aW9uYWwgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgKkFOWSogb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPmV4cGxpY2l0IC0gc3BlY2lmeSB0cnVlIGlmIHRoaXMgaXMgZXhwbGljaXQgdGFnIG90aGVyd2lzZSBmYWxzZVxuICogICAgIChkZWZhdWx0IGlzICd0cnVlJykuPC9saT5cbiAqIDxsaT50YWcgLSBzcGVjaWZ5IHRhZyAoZGVmYXVsdCBpcyAnYTAnIHdoaWNoIG1lYW5zIFswXSk8L2xpPlxuICogPGxpPm9iaiAtIHNwZWNpZnkgQVNOMU9iamVjdCB3aGljaCBpcyB0YWdnZWQ8L2xpPlxuICogPC91bD5cbiAqIEBleGFtcGxlXG4gKiBkMSA9IG5ldyBLSlVSLmFzbjEuREVSVVRGOFN0cmluZyh7J3N0cic6J2EnfSk7XG4gKiBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0KHsnb2JqJzogZDF9KTtcbiAqIGhleCA9IGQyLmdldEVuY29kZWRIZXgoKTtcbiAqL1xuS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdC5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIHRoaXMuaFQgPSBcImEwXCI7XG4gIHRoaXMuaFYgPSAnJztcbiAgdGhpcy5pc0V4cGxpY2l0ID0gdHJ1ZTtcbiAgdGhpcy5hc24xT2JqZWN0ID0gbnVsbDtcbiAgLyoqXG4gICAqIHNldCB2YWx1ZSBieSBhbiBBU04xT2JqZWN0XG4gICAqIEBuYW1lIHNldFN0cmluZ1xuICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdCNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNFeHBsaWNpdEZsYWcgZmxhZyBmb3IgZXhwbGljaXQvaW1wbGljaXQgdGFnXG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gdGFnTm9IZXggaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIHRhZ1xuICAgKiBAcGFyYW0ge0FTTjFPYmplY3R9IGFzbjFPYmplY3QgQVNOLjEgdG8gZW5jYXBzdWxhdGVcbiAgICovXG4gIHRoaXMuc2V0QVNOMU9iamVjdCA9IGZ1bmN0aW9uIChpc0V4cGxpY2l0RmxhZywgdGFnTm9IZXgsIGFzbjFPYmplY3QpIHtcbiAgICB0aGlzLmhUID0gdGFnTm9IZXg7XG4gICAgdGhpcy5pc0V4cGxpY2l0ID0gaXNFeHBsaWNpdEZsYWc7XG4gICAgdGhpcy5hc24xT2JqZWN0ID0gYXNuMU9iamVjdDtcbiAgICBpZiAodGhpcy5pc0V4cGxpY2l0KSB7XG4gICAgICB0aGlzLmhWID0gdGhpcy5hc24xT2JqZWN0LmdldEVuY29kZWRIZXgoKTtcbiAgICAgIHRoaXMuaFRMViA9IG51bGw7XG4gICAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhWID0gbnVsbDtcbiAgICAgIHRoaXMuaFRMViA9IGFzbjFPYmplY3QuZ2V0RW5jb2RlZEhleCgpO1xuICAgICAgdGhpcy5oVExWID0gdGhpcy5oVExWLnJlcGxhY2UoL14uLi8sIHRhZ05vSGV4KTtcbiAgICAgIHRoaXMuaXNNb2RpZmllZCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmhWO1xuICB9O1xuICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbJ3RhZyddICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuaFQgPSBwYXJhbXNbJ3RhZyddO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhcmFtc1snZXhwbGljaXQnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmlzRXhwbGljaXQgPSBwYXJhbXNbJ2V4cGxpY2l0J107XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGFyYW1zWydvYmonXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmFzbjFPYmplY3QgPSBwYXJhbXNbJ29iaiddO1xuICAgICAgdGhpcy5zZXRBU04xT2JqZWN0KHRoaXMuaXNFeHBsaWNpdCwgdGhpcy5oVCwgdGhpcy5hc24xT2JqZWN0KTtcbiAgICB9XG4gIH1cbn07XG5feWFob28uWUFIT08ubGFuZy5leHRlbmQoS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdCwgS0pVUi5hc24xLkFTTjFPYmplY3QpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5ZQUhPTyA9IHZvaWQgMDtcbi8qIVxuQ29weXJpZ2h0IChjKSAyMDExLCBZYWhvbyEgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuQ29kZSBsaWNlbnNlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2U6XG5odHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95dWkvbGljZW5zZS5odG1sXG52ZXJzaW9uOiAyLjkuMFxuKi9cbnZhciBZQUhPTyA9IGV4cG9ydHMuWUFIT08gPSB7fTtcbllBSE9PLmxhbmcgPSB7XG4gIC8qKlxuICAgKiBVdGlsaXR5IHRvIHNldCB1cCB0aGUgcHJvdG90eXBlLCBjb25zdHJ1Y3RvciBhbmQgc3VwZXJjbGFzcyBwcm9wZXJ0aWVzIHRvXG4gICAqIHN1cHBvcnQgYW4gaW5oZXJpdGFuY2Ugc3RyYXRlZ3kgdGhhdCBjYW4gY2hhaW4gY29uc3RydWN0b3JzIGFuZCBtZXRob2RzLlxuICAgKiBTdGF0aWMgbWVtYmVycyB3aWxsIG5vdCBiZSBpbmhlcml0ZWQuXG4gICAqXG4gICAqIEBtZXRob2QgZXh0ZW5kXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3ViYyAgIHRoZSBvYmplY3QgdG8gbW9kaWZ5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1cGVyYyB0aGUgb2JqZWN0IHRvIGluaGVyaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyAgYWRkaXRpb25hbCBwcm9wZXJ0aWVzL21ldGhvZHMgdG8gYWRkIHRvIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzIHByb3RvdHlwZS4gIFRoZXNlIHdpbGwgb3ZlcnJpZGUgdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmcgaXRlbXMgb2J0YWluZWQgZnJvbSB0aGUgc3VwZXJjbGFzc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHByZXNlbnQuXG4gICAqL1xuICBleHRlbmQ6IGZ1bmN0aW9uIChzdWJjLCBzdXBlcmMsIG92ZXJyaWRlcykge1xuICAgIGlmICghc3VwZXJjIHx8ICFzdWJjKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZQUhPTy5sYW5nLmV4dGVuZCBmYWlsZWQsIHBsZWFzZSBjaGVjayB0aGF0IFwiICsgXCJhbGwgZGVwZW5kZW5jaWVzIGFyZSBpbmNsdWRlZC5cIik7XG4gICAgfVxuICAgIHZhciBGID0gZnVuY3Rpb24gKCkge307XG4gICAgRi5wcm90b3R5cGUgPSBzdXBlcmMucHJvdG90eXBlO1xuICAgIHN1YmMucHJvdG90eXBlID0gbmV3IEYoKTtcbiAgICBzdWJjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YmM7XG4gICAgc3ViYy5zdXBlcmNsYXNzID0gc3VwZXJjLnByb3RvdHlwZTtcbiAgICBpZiAoc3VwZXJjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PSBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzdXBlcmMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3VwZXJjO1xuICAgIH1cbiAgICBpZiAob3ZlcnJpZGVzKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGZvciAoaSBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgc3ViYy5wcm90b3R5cGVbaV0gPSBvdmVycmlkZXNbaV07XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgICogSUUgd2lsbCBub3QgZW51bWVyYXRlIG5hdGl2ZSBmdW5jdGlvbnMgaW4gYSBkZXJpdmVkIG9iamVjdCBldmVuIGlmIHRoZVxuICAgICAgICogZnVuY3Rpb24gd2FzIG92ZXJyaWRkZW4uICBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3Igc3BlY2lmaWMgZnVuY3Rpb25zXG4gICAgICAgKiB3ZSBjYXJlIGFib3V0IG9uIHRoZSBPYmplY3QgcHJvdG90eXBlLlxuICAgICAgICogQHByb3BlcnR5IF9JRUVudW1GaXhcbiAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHIgIHRoZSBvYmplY3QgdG8gcmVjZWl2ZSB0aGUgYXVnbWVudGF0aW9uXG4gICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzICB0aGUgb2JqZWN0IHRoYXQgc3VwcGxpZXMgdGhlIHByb3BlcnRpZXMgdG8gYXVnbWVudFxuICAgICAgICogQHN0YXRpY1xuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqL1xuICAgICAgdmFyIF9JRUVudW1GaXggPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgQUREID0gW1widG9TdHJpbmdcIiwgXCJ2YWx1ZU9mXCJdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKC9NU0lFLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgX0lFRW51bUZpeCA9IGZ1bmN0aW9uIChyLCBzKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgQURELmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICAgIHZhciBmbmFtZSA9IEFERFtpXSxcbiAgICAgICAgICAgICAgICBmID0gc1tmbmFtZV07XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJyAmJiBmICE9IE9iamVjdC5wcm90b3R5cGVbZm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgcltmbmFtZV0gPSBmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXgpIHt9XG4gICAgICA7XG4gICAgICBfSUVFbnVtRml4KHN1YmMucHJvdG90eXBlLCBvdmVycmlkZXMpO1xuICAgIH1cbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfc3lzdGVtID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xudmFyIF9zeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmRldmljZVwiKSk7XG52YXIgX3N5c3RlbTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ubmV0d29ya1wiKSk7XG52YXIgX3N5c3RlbTQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ucm91dGVyXCIpKTtcbnZhciBfc3lzdGVtNSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5hcHBcIikpO1xudmFyIF9zeXN0ZW02ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmZldGNoXCIpKTtcbnZhciBfc3lzdGVtNyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5maWxlXCIpKTtcbnZhciBfc3lzdGVtOCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yZXF1ZXN0XCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5mdW5jdGlvbiBidWlsZFVuaXF1ZUlkKHQpIHtcbiAgY29uc3QgZSA9IFtdO1xuICBlLnB1c2goRGV2aWNlVXRpbC5nZXRBZHZlcnRpc2luZ0lkKCkpLCBlLnB1c2goRGV2aWNlVXRpbC5nZXRBbmRyb2lkSWQoKSksIGUucHVzaChEZXZpY2VVdGlsLmdldE9BSUQoKSksIFByb21pc2UuYWxsKGUpLnRoZW4oZSA9PiB7XG4gICAgY29uc3QgbiA9IGVbMF07XG4gICAgY29uc3QgbyA9IGVbMV07XG4gICAgY29uc3QgaSA9IGVbMl07XG4gICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuTU9CSUxFX0FEVkVSVElTSU5HX0lELCBuKTtcbiAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5NT0JJTEVfQU5EUk9JRF9JRCwgbyk7XG4gICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuTU9CSUxFX09BSUQsIGkpO1xuICAgIHVuaXF1ZWlkQ2FjaGUgPSBvIHx8IG4gfHwgaTtcbiAgICBTdG9yYWdlVXRpbC5wdXREYXRhKFwidW1lbmdfdW5pcXVlaWRcIiwgdW5pcXVlaWRDYWNoZSk7XG4gICAgdCh1bmlxdWVpZENhY2hlKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZSh0LCBlKSB7XG4gIHJldHVybiBlID0ge1xuICAgIGV4cG9ydHM6IHt9XG4gIH0sIHQoZSwgZS5leHBvcnRzKSwgZS5leHBvcnRzO1xufVxuZnVuY3Rpb24gTUQ1JDEodCkge1xuICByZXR1cm4gTUQ1KHQpO1xufVxuZnVuY3Rpb24gZW5jb2RlKHQpIHtcbiAgcmV0dXJuIEJhc2U2NF8yLmVuY29kZSh0LCAhMSk7XG59XG5mdW5jdGlvbiBkZWNvZGUodCkge1xuICByZXR1cm4gQmFzZTY0XzIuZGVjb2RlKHQpO1xufVxuZnVuY3Rpb24gY2hlY2tFbXB0eUFyZ3VtZW50KHQpIHtcbiAgcmV0dXJuIHQubGVuZ3RoICYmIHRoaXMuY2hlY2tJZCh0WzBdKTtcbn1cbmZ1bmN0aW9uIGNoZWNrSWQodCkge1xuICByZXR1cm4gdCAmJiBcInN0cmluZ1wiID09IHR5cGVvZiB0O1xufVxuZnVuY3Rpb24gdG9TdHIodCkge1xuICBsZXQgZSA9IFwiXCI7XG4gIGlmICh0KSB0cnkge1xuICAgIGUgPSBKU09OLnN0cmluZ2lmeSh0KTtcbiAgfSBjYXRjaCAodCkge31cbiAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHQpIHtcbiAgaWYgKHQpIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodCk7XG4gIH0gY2F0Y2ggKHQpIHt9XG4gIHJldHVybiBbXTtcbn1cbmZ1bmN0aW9uIHRvT2JqZWN0KHQpIHtcbiAgaWYgKHQpIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodCk7XG4gIH0gY2F0Y2ggKHQpIHt9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gY2hlY2tBdHRyT3JTdHJpbmcodCkge1xuICByZXR1cm4gISghdCB8fCBcInN0cmluZ1wiICE9IHR5cGVvZiB0ICYmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8IGlzQXJyYXkodCkpKTtcbn1cbmZ1bmN0aW9uIGlzQXJyYXkodCkge1xuICByZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKHQpO1xufVxuZnVuY3Rpb24gaXNOb3RBTnVtYmVyKHQpIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUludCh0LCAxMCkpO1xufVxuZnVuY3Rpb24gY2hlY2tNRDUodCwgZSkge1xuICB0cnkge1xuICAgIHJldHVybiB0ID09PSBNRDUoZSk7XG4gIH0gY2F0Y2ggKHQpIHtcbiAgICByZXR1cm4gITE7XG4gIH1cbn1cbmZ1bmN0aW9uIExvb3BlcigpIHt9XG5mdW5jdGlvbiBzZW5kKHQpIHtcbiAgX3N5c3RlbTMuZGVmYXVsdC5nZXRUeXBlKHtcbiAgICBzdWNjZXNzKGUpIHtcbiAgICAgIFwibm9uZVwiICE9PSBlLnR5cGUgJiYgaGFzRW52ZWxvcGUodCwgKGUsIG4pID0+IHtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgICAgbWQ1S2V5OiBuLFxuICAgICAgICAgICAgICB0eXBlOiBcInNlY29uZFwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLnNlbmQoZSwgKCkgPT4ge1xuICAgICAgICAgICAgICBTdG9yZVF1ZXVlLmdldEluc3RhbmNlKCkuaGFuZGxlTWVzc2FnZShudWxsKTtcbiAgICAgICAgICAgICAgcmVhbFNlbmQodCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSByZWFsU2VuZCh0KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZmFpbCgpIHt9XG4gIH0pO1xufVxuZnVuY3Rpb24gaGFzRW52ZWxvcGUodCwgZSkge1xuICBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIG4gPT4ge1xuICAgIGlmICghbikgcmV0dXJuIHZvaWQgZSghMSwgbnVsbCk7XG4gICAgY29uc3QgbyA9IFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheShuKTtcbiAgICBpZiAoIW8gfHwgMCA9PT0gby5sZW5ndGgpIHJldHVybiB2b2lkIGUoITEsIG51bGwpO1xuICAgIGZvciAoY29uc3QgbiBpbiBvKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChvLCBuKSkge1xuICAgICAgY29uc3QgaSA9IG9bbl07XG4gICAgICBpZiAoaSkge1xuICAgICAgICBjb25zdCBuID0gaS5pbmRleE9mKGNvbnN0YW50cy5LRVlfRVZFTlRfUFJFRklYKTtcbiAgICAgICAgaWYgKDAgPT09IG4gJiYgdCA9PT0gY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9FVkVOVCkgcmV0dXJuIHZvaWQgZSghMCwgaSk7XG4gICAgICAgIGNvbnN0IG8gPSBpLmluZGV4T2YoY29uc3RhbnRzLktFWV9IQUxGX1NFU1NJT05fUFJFRklYKTtcbiAgICAgICAgaWYgKDAgPT09IG8gJiYgdCA9PT0gY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEYpIHJldHVybiB2b2lkIGUoITAsIGkpO1xuICAgICAgICBjb25zdCByID0gaS5pbmRleE9mKGNvbnN0YW50cy5LRVlfQ0xPU0VfU0VTU0lPTl9QUkVGSVgpO1xuICAgICAgICBpZiAoMCA9PT0gciAmJiB0ID09PSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fQ0xPU0UpIHJldHVybiB2b2lkIGUoITAsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlKCExLCBudWxsKTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWFsU2VuZCh0KSB7XG4gIGlmIChSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkucGFyYW1zSXNWYWxpZCh0KSkgaWYgKHQgPT09IGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGKSB7XG4gICAgY29uc3QgZSA9IFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5idWlsZFNlbmRDb250ZW50KHQsIG51bGwpLFxuICAgICAgbiA9IGUuZGF0YTtcbiAgICBuLmFuYWx5dGljcyAmJiBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuc2VuZChlLCB0ID0+IHtcbiAgICAgIHQgJiYgLTEgIT09IHQuaW5kZXhPZihjb25zdGFudHMuS0VZX0hBTEZfU0VTU0lPTl9QUkVGSVgpICYmIChIZWFkZXIuZ2V0SW5zdGFuY2UoKS5zZXRGaXJzdFNlbmRGbGFnKCksIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkFQUF9GSVJTVF9PUEVOX0ZMQUcsIFwiZmFsc2VcIikpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHQgPT09IGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRSkge1xuICAgIGNvbnN0IGUgPSBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuYnVpbGRTZW5kQ29udGVudCh0LCBudWxsKTtcbiAgICBpZiAoZSAmJiBlLmRhdGEpIHtcbiAgICAgIGNvbnN0IHQgPSBlLmRhdGE7XG4gICAgICB0LmFuYWx5dGljcyAmJiBSZXF1ZXN0SGVscGVyLmdldEluc3RhbmNlKCkuc2VuZChlKTtcbiAgICB9XG4gIH0gZWxzZSB0ID09PSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UICYmIEV2ZW50U3RvcmVRdWV1ZS5nZXRJbnN0YW5jZSgpLnJlYWRFa3ZEYXRhcyhlID0+IHtcbiAgICBpZiAoIWUgfHwgMCA9PT0gZS5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBuID0gUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLmJ1aWxkU2VuZENvbnRlbnQodCwgZSk7XG4gICAgaWYgKG4pIHtcbiAgICAgIGNvbnN0IHQgPSBuLmRhdGE7XG4gICAgICB0LmFuYWx5dGljcyAmJiAoUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLnNlbmQobiksIEV2ZW50Q29udHJvbGxlci5nZXRJbnN0YW5jZSgpLnNldFNlbmRUaW1lKCkpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBzZW5kQWxsKCkge1xuICBpZiAoMCA9PT0gdGltZSkge1xuICAgIHRpbWUgPSAxMDtcbiAgICBjb25zdCB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGltZSAtPSAxO1xuICAgICAgMCA9PT0gdGltZSAmJiBjbGVhckludGVydmFsKHQpO1xuICAgIH0sIDEwMCk7XG4gICAgSGVhZGVyLmdldEluc3RhbmNlKCkuZ2V0SGVhZGVyKCkgPyAoc2VuZChjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fSEFMRiksIHNlbmQoY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFKSwgc2VuZChjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UKSkgOiBzZXRUaW1lb3V0KHNlbmRBbGwsIDEwMCk7XG4gIH1cbn1cbmZ1bmN0aW9uIFBhZ2VDb250cm9sbGVyKCkge1xuICB0aGlzLl9wYWdlbGlzdCA9IFtdLCB0aGlzLl9jdXJyZW50UGFnZSA9IHt9LCB0aGlzLnBhZ2VPYmplY3QgPSB7fTtcbn1cbmZ1bmN0aW9uIFVtZW5nQW5hbHlzaXNMaWIoKSB7XG4gIHRoaXMucGFnZUNvbnRyb2xsZXIgPSBuZXcgUGFnZUNvbnRyb2xsZXIoKTtcbn1cbmZ1bmN0aW9uIGlzSW5pdCgpIHtcbiAgcmV0dXJuICEhaW5pdGVkIHx8IChjb25zb2xlLmVycm9yKFwiW2FwcC51eF0gPT0+IG9uQ3JlYXRlIG5vdCBpbnZva2VkIGluaXQoKSBtZXRob2RcIiksICExKTtcbn1cbmZ1bmN0aW9uIHNlbmREYXRhcygpIHtcbiAgSGVhZGVyLmdldEluc3RhbmNlKCkuZ2V0SGVhZGVyKCkgPyAoUmVxdWVzdC5zZW5kKGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGKSwgUmVxdWVzdC5zZW5kKGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRSksIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgdCA9PiB7XG4gICAgdCA9PT0gY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9TVEFSVF9TRU5EX1ZBTFVFICYmIFJlcXVlc3Quc2VuZChjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UKTtcbiAgfSkpIDogc2V0VGltZW91dChzZW5kRGF0YXMsIDEwMCk7XG59XG5mdW5jdGlvbiBTZGtVcGRhdGVyKCkge1xuICB0aGlzLnVybCA9IGNvbnN0YW50cy5TREtfVVBEQVRFX1NFUlZFUl9BRERSRVNTO1xufVxuZnVuY3Rpb24gUGFnZSh0KSB7XG4gIGlmICh0KSB7XG4gICAgY29uc3QgZSA9IHQub25TaG93O1xuICAgIHQub25TaG93ID0gZnVuY3Rpb24gKC4uLnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIFVtZW5nQW5hbHlzaXMucmVzdW1lKHRoaXMpO1xuICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgIGlmIChlKSByZXR1cm4gZS5hcHBseSh0aGlzLCB0KTtcbiAgICB9O1xuICAgIGNvbnN0IG4gPSB0Lm9uSGlkZTtcbiAgICB0Lm9uSGlkZSA9IGZ1bmN0aW9uICguLi50KSB7XG4gICAgICB0cnkge1xuICAgICAgICBVbWVuZ0FuYWx5c2lzLnBhdXNlKHRoaXMpO1xuICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgIGlmIChuKSByZXR1cm4gbi5hcHBseSh0aGlzLCB0KTtcbiAgICB9O1xuICB9XG4gIHJldHVybiB0O1xufVxuY29uc3QgU3RvcmFnZVV0aWwgPSB7XG4gICAgcHV0RGF0YSh0LCBlLCBuLCBvKSB7XG4gICAgICBfc3lzdGVtLmRlZmF1bHQuc2V0KHtcbiAgICAgICAga2V5OiB0LFxuICAgICAgICB2YWx1ZTogZSxcbiAgICAgICAgc3VjY2Vzcyh0KSB7XG4gICAgICAgICAgbiAmJiBuKHQpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsKHQsIGUpIHtcbiAgICAgICAgICBvICYmIG8odCwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RGF0YSh0LCBlLCBuKSB7XG4gICAgICBfc3lzdGVtLmRlZmF1bHQuZ2V0KHtcbiAgICAgICAga2V5OiB0LFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBlICYmIGUodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwodCwgZSkge1xuICAgICAgICAgIG4gJiYgbih0LCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGVEYXRhKHQsIGUpIHtcbiAgICAgIF9zeXN0ZW0uZGVmYXVsdC5kZWxldGUoe1xuICAgICAgICBrZXk6IHQsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgZSAmJiBlKCEwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICBlICYmIGUoITEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGNvbnN0YW50cyA9IHtcbiAgICBLRVlfTk9fU0VORF9SRVFVRVNUX0tFWVM6IFwidW1lbmdfa2V5X25vX3NlbmRfcmVxdWVzdFwiLFxuICAgIFNFU1NJT05fSU5URVJWQUw6IDNlNCxcbiAgICBURVNUX1VSTDogXCJodHRwczovL3ByZXVsb2dzLnVtZW5nLmNvbS91bmlmeV9sb2dzXCIsXG4gICAgUkVMRUFTRV9VUkw6IFwiaHR0cHM6Ly91bG9ncy51bWVuZy5jb20vdW5pZnlfbG9nc1wiLFxuICAgIEtFWV9TRVNTSU9OX1BSRUZJWDogXCJ1bWVuZ19zZXNzaW9uX3ByZWZpeF9cIixcbiAgICBLRVlfRVZFTlRfUFJFRklYOiBcInVtZW5nX2V2ZW50X3ByZWZpeF9cIixcbiAgICBLRVlfSEFMRl9TRVNTSU9OX1BSRUZJWDogXCJ1bWVuZ19oYWxmX3Nlc3Npb25fcHJlZml4X1wiLFxuICAgIEtFWV9DTE9TRV9TRVNTSU9OX1BSRUZJWDogXCJ1bWVuZ19jbG9zZV9zZXNzaW9uX3ByZWZpeF9cIixcbiAgICBSRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGOiAxLFxuICAgIFJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFOiAyLFxuICAgIFJFUVVFU1RfVFlQRV9FVkVOVDogMyxcbiAgICBJU19ERUJVRzogITEsXG4gICAgU0RLX1ZFUlNJT046IFwiMi4wLjNcIixcbiAgICBBUFBfRklSU1RfT1BFTl9GTEFHOiBcInVtZW5nX2tleV9maXJzdF9vcGVuX2ZsYWdcIixcbiAgICBNT0JJTEVfQURWRVJUSVNJTkdfSUQ6IFwidW1lbmdfbW9iaWxlX2FkdmVydGlzaW5nX2lkXCIsXG4gICAgTU9CSUxFX0FORFJPSURfSUQ6IFwidW1lbmdfYW5kcm9pZF9faWRcIixcbiAgICBNT0JJTEVfT0FJRDogXCJ1bWVuZ19vYWlkXCIsXG4gICAgRVZFTlRfU0VORF9NSU5fSU5URVJWQUw6IDkwLFxuICAgIEVWRU5UX1NFTkRfTUFYX0lOVEVSVkFMOiA4NjQwMCxcbiAgICBFVkVOVF9MQVNUX1NFTkRfVElNRTogXCJ1bWVuZ19la3ZfbGFzdF9zZW5kX3RpbWVcIixcbiAgICBFVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1k6IFwiZXZlbnRfc2VuZF9yZXBvcnRfcG9saWN5XCIsXG4gICAgRVZFTlRfU0VORF9SRVBPUlRfSU5URVJWQUxfVElNRTogXCJldmVudF9zZW5kX3JlcG9ydF9pbnRlcnZhbF90aW1lXCIsXG4gICAgRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX1NUQVJUX1NFTkRfVkFMVUU6IFwiMVwiLFxuICAgIEVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9JTlRFUlZBTF9WQUxVRTogXCI2XCIsXG4gICAgRE9XTkxPQURfRklMRV9GSVJTVF9DQUNIRTogXCJ1bWVuZ19zZGtfdXBkYXRlX2ZpcnN0Q2FjaGVMZXZlbFwiLFxuICAgIERPV05MT0FEX0ZJTEVfU0VDT05EX0NBQ0hFOiBcInVtZW5nX3Nka191cGRhdGVfc2Vjb25kQ2FjaGVMZXZlbFwiLFxuICAgIFNES19VUERBVEVfU0VSVkVSX0FERFJFU1M6IFwiaHR0cDovL3MuY256ei5jb20vc2RrL3F1aWNrYXBwXCIsXG4gICAgU0RLX1VQREFURV9MT0NBTF9TVE9SQUdFX1BBVEg6IFwiaW50ZXJuYWw6Ly9maWxlcy91bWVuZ3Nkay9cIlxuICB9O1xubGV0IG9haWRDYWNoZSA9IG51bGwsXG4gIGFuZHJvaWRpZENhY2hlID0gbnVsbCxcbiAgaWRmYUNhY2hlID0gbnVsbCxcbiAgdW5pcXVlaWRDYWNoZSA9IG51bGwsXG4gIGRldmljZUluZm9DYWNoZSA9IG51bGw7XG5jb25zdCBEZXZpY2VVdGlsID0ge1xuICAgIGdldEJhc2VJbmZvKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHQgPT4ge1xuICAgICAgICBpZiAoZGV2aWNlSW5mb0NhY2hlKSByZXR1cm4gdm9pZCB0KGRldmljZUluZm9DYWNoZSk7XG4gICAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZ2V0SW5mbyh7XG4gICAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgICBkZXZpY2VJbmZvQ2FjaGUgPSBlLCB0KGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgIHQobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TmV0d29ya0luZm8odCkge1xuICAgICAgX3N5c3RlbTMuZGVmYXVsdC5nZXRUeXBlKHtcbiAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgdChlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRBbmRyb2lkSWQoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UodCA9PiB7XG4gICAgICAgIGlmIChhbmRyb2lkaWRDYWNoZSkgcmV0dXJuIHZvaWQgdChhbmRyb2lkaWRDYWNoZS51c2VySWQpO1xuICAgICAgICBfc3lzdGVtMi5kZWZhdWx0LmdldFVzZXJJZCh7XG4gICAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgICBhbmRyb2lkaWRDYWNoZSA9IGUsIHQoZS51c2VySWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgIHQoXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0QWR2ZXJ0aXNpbmdJZCgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSh0ID0+IHtcbiAgICAgICAgaWYgKGlkZmFDYWNoZSkgcmV0dXJuIHZvaWQgdChpZGZhQ2FjaGUuYWR2ZXJ0aXNpbmdJZCk7XG4gICAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZ2V0QWR2ZXJ0aXNpbmdJZCh7XG4gICAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgICBpZGZhQ2FjaGUgPSBlLCB0KGUuYWR2ZXJ0aXNpbmdJZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgdChcIlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRPQUlEKCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiY2FsbCBnZXRPQUlEXCIpLCBuZXcgUHJvbWlzZSh0ID0+IHtcbiAgICAgICAgaWYgKG51bGwgIT09IG9haWRDYWNoZSkgcmV0dXJuIHZvaWQgdChvYWlkQ2FjaGUub2FpZCk7XG4gICAgICAgIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgX3N5c3RlbTIuZGVmYXVsdC5nZXRPQUlEIHx8ICExID09PSBfc3lzdGVtMi5kZWZhdWx0LmFsbG93VHJhY2tPQUlEID8gdChcIlwiKSA6IF9zeXN0ZW0yLmRlZmF1bHQuZ2V0T0FJRCh7XG4gICAgICAgICAgc3VjY2VzcyhlKSB7XG4gICAgICAgICAgICBvYWlkQ2FjaGUgPSBlLCB0KGUub2FpZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgdChcIlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRVbmlxdWVJZCgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSh0ID0+IHtcbiAgICAgICAgdW5pcXVlaWRDYWNoZSA/IHQodW5pcXVlaWRDYWNoZSkgOiBidWlsZFVuaXF1ZUlkKHQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRQYWdlTmFtZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHQgPSBfc3lzdGVtNC5kZWZhdWx0LmdldFN0YXRlKCk7XG4gICAgICAgIHJldHVybiB0Lm5hbWU7XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgIH0sXG4gICAgZ2V0U3lzdGVtQmFzZUluZm8odCwgZSkge1xuICAgICAgaWYgKGRldmljZUluZm9DYWNoZSkgcmV0dXJuIHZvaWQgKHQgJiYgdChkZXZpY2VJbmZvQ2FjaGUpKTtcbiAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZ2V0SW5mbyh7XG4gICAgICAgIHN1Y2Nlc3MoZSkge1xuICAgICAgICAgIGRldmljZUluZm9DYWNoZSA9IGUsIHQgJiYgdChlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCh0LCBuKSB7XG4gICAgICAgICAgZSAmJiBlKHQsIG4pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIExvZyA9IHtcbiAgICBkKHQpIHt9LFxuICAgIGkodCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdXNlckRlYnVnICYmIGNvbnNvbGUuaW5mbyh0KTtcbiAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgfSxcbiAgICBlKHQpIHt9LFxuICAgIHcodCkge30sXG4gICAgdih0KSB7fVxuICB9O1xudmFyIGNvbW1vbmpzR2xvYmFsID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgZ2xvYmFsVGhpcyA/IGdsb2JhbFRoaXMgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cgPyB3aW5kb3cgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBnbG9iYWwgPyBnbG9iYWwgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBzZWxmID8gc2VsZiA6IHt9LFxuICBNRDUgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAodCkge1xuICAgICFmdW5jdGlvbiAoZSkge1xuICAgICAgZnVuY3Rpb24gbih0LCBlKSB7XG4gICAgICAgIHZhciBuID0gKDY1NTM1ICYgdCkgKyAoNjU1MzUgJiBlKTtcbiAgICAgICAgcmV0dXJuICh0ID4+IDE2KSArIChlID4+IDE2KSArIChuID4+IDE2KSA8PCAxNiB8IDY1NTM1ICYgbjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG8odCwgZSkge1xuICAgICAgICByZXR1cm4gdCA8PCBlIHwgdCA+Pj4gMzIgLSBlO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaSh0LCBlLCBpLCByLCBzLCBjKSB7XG4gICAgICAgIHJldHVybiBuKG8obihuKGUsIHQpLCBuKHIsIGMpKSwgcyksIGkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcih0LCBlLCBuLCBvLCByLCBzLCBjKSB7XG4gICAgICAgIHJldHVybiBpKGUgJiBuIHwgfmUgJiBvLCB0LCBlLCByLCBzLCBjKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHModCwgZSwgbiwgbywgciwgcywgYykge1xuICAgICAgICByZXR1cm4gaShlICYgbyB8IG4gJiB+bywgdCwgZSwgciwgcywgYyk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBjKHQsIGUsIG4sIG8sIHIsIHMsIGMpIHtcbiAgICAgICAgcmV0dXJuIGkoZSBeIG4gXiBvLCB0LCBlLCByLCBzLCBjKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGEodCwgZSwgbiwgbywgciwgcywgYykge1xuICAgICAgICByZXR1cm4gaShuIF4gKGUgfCB+byksIHQsIGUsIHIsIHMsIGMpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdSh0LCBlKSB7XG4gICAgICAgIHRbZSA+PiA1XSB8PSAxMjggPDwgZSAlIDMyLCB0WzE0ICsgKGUgKyA2NCA+Pj4gOSA8PCA0KV0gPSBlO1xuICAgICAgICB2YXIgbyxcbiAgICAgICAgICBpLFxuICAgICAgICAgIHUsXG4gICAgICAgICAgZixcbiAgICAgICAgICBsLFxuICAgICAgICAgIF8gPSAxNzMyNTg0MTkzLFxuICAgICAgICAgIEUgPSAtMjcxNzMzODc5LFxuICAgICAgICAgIGcgPSAtMTczMjU4NDE5NCxcbiAgICAgICAgICBkID0gMjcxNzMzODc4O1xuICAgICAgICBmb3IgKG8gPSAwOyBvIDwgdC5sZW5ndGg7IG8gKz0gMTYpIGkgPSBfLCB1ID0gRSwgZiA9IGcsIGwgPSBkLCBFID0gYShFID0gYShFID0gYShFID0gYShFID0gYyhFID0gYyhFID0gYyhFID0gYyhFID0gcyhFID0gcyhFID0gcyhFID0gcyhFID0gcihFID0gcihFID0gcihFID0gcihFLCBnID0gcihnLCBkID0gcihkLCBfID0gcihfLCBFLCBnLCBkLCB0W29dLCA3LCAtNjgwODc2OTM2KSwgRSwgZywgdFtvICsgMV0sIDEyLCAtMzg5NTY0NTg2KSwgXywgRSwgdFtvICsgMl0sIDE3LCA2MDYxMDU4MTkpLCBkLCBfLCB0W28gKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKSwgZyA9IHIoZywgZCA9IHIoZCwgXyA9IHIoXywgRSwgZywgZCwgdFtvICsgNF0sIDcsIC0xNzY0MTg4OTcpLCBFLCBnLCB0W28gKyA1XSwgMTIsIDEyMDAwODA0MjYpLCBfLCBFLCB0W28gKyA2XSwgMTcsIC0xNDczMjMxMzQxKSwgZCwgXywgdFtvICsgN10sIDIyLCAtNDU3MDU5ODMpLCBnID0gcihnLCBkID0gcihkLCBfID0gcihfLCBFLCBnLCBkLCB0W28gKyA4XSwgNywgMTc3MDAzNTQxNiksIEUsIGcsIHRbbyArIDldLCAxMiwgLTE5NTg0MTQ0MTcpLCBfLCBFLCB0W28gKyAxMF0sIDE3LCAtNDIwNjMpLCBkLCBfLCB0W28gKyAxMV0sIDIyLCAtMTk5MDQwNDE2MiksIGcgPSByKGcsIGQgPSByKGQsIF8gPSByKF8sIEUsIGcsIGQsIHRbbyArIDEyXSwgNywgMTgwNDYwMzY4MiksIEUsIGcsIHRbbyArIDEzXSwgMTIsIC00MDM0MTEwMSksIF8sIEUsIHRbbyArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKSwgZCwgXywgdFtvICsgMTVdLCAyMiwgMTIzNjUzNTMyOSksIGcgPSBzKGcsIGQgPSBzKGQsIF8gPSBzKF8sIEUsIGcsIGQsIHRbbyArIDFdLCA1LCAtMTY1Nzk2NTEwKSwgRSwgZywgdFtvICsgNl0sIDksIC0xMDY5NTAxNjMyKSwgXywgRSwgdFtvICsgMTFdLCAxNCwgNjQzNzE3NzEzKSwgZCwgXywgdFtvXSwgMjAsIC0zNzM4OTczMDIpLCBnID0gcyhnLCBkID0gcyhkLCBfID0gcyhfLCBFLCBnLCBkLCB0W28gKyA1XSwgNSwgLTcwMTU1ODY5MSksIEUsIGcsIHRbbyArIDEwXSwgOSwgMzgwMTYwODMpLCBfLCBFLCB0W28gKyAxNV0sIDE0LCAtNjYwNDc4MzM1KSwgZCwgXywgdFtvICsgNF0sIDIwLCAtNDA1NTM3ODQ4KSwgZyA9IHMoZywgZCA9IHMoZCwgXyA9IHMoXywgRSwgZywgZCwgdFtvICsgOV0sIDUsIDU2ODQ0NjQzOCksIEUsIGcsIHRbbyArIDE0XSwgOSwgLTEwMTk4MDM2OTApLCBfLCBFLCB0W28gKyAzXSwgMTQsIC0xODczNjM5NjEpLCBkLCBfLCB0W28gKyA4XSwgMjAsIDExNjM1MzE1MDEpLCBnID0gcyhnLCBkID0gcyhkLCBfID0gcyhfLCBFLCBnLCBkLCB0W28gKyAxM10sIDUsIC0xNDQ0NjgxNDY3KSwgRSwgZywgdFtvICsgMl0sIDksIC01MTQwMzc4NCksIF8sIEUsIHRbbyArIDddLCAxNCwgMTczNTMyODQ3MyksIGQsIF8sIHRbbyArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KSwgZyA9IGMoZywgZCA9IGMoZCwgXyA9IGMoXywgRSwgZywgZCwgdFtvICsgNV0sIDQsIC0zNzg1NTgpLCBFLCBnLCB0W28gKyA4XSwgMTEsIC0yMDIyNTc0NDYzKSwgXywgRSwgdFtvICsgMTFdLCAxNiwgMTgzOTAzMDU2MiksIGQsIF8sIHRbbyArIDE0XSwgMjMsIC0zNTMwOTU1NiksIGcgPSBjKGcsIGQgPSBjKGQsIF8gPSBjKF8sIEUsIGcsIGQsIHRbbyArIDFdLCA0LCAtMTUzMDk5MjA2MCksIEUsIGcsIHRbbyArIDRdLCAxMSwgMTI3Mjg5MzM1MyksIF8sIEUsIHRbbyArIDddLCAxNiwgLTE1NTQ5NzYzMiksIGQsIF8sIHRbbyArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKSwgZyA9IGMoZywgZCA9IGMoZCwgXyA9IGMoXywgRSwgZywgZCwgdFtvICsgMTNdLCA0LCA2ODEyNzkxNzQpLCBFLCBnLCB0W29dLCAxMSwgLTM1ODUzNzIyMiksIF8sIEUsIHRbbyArIDNdLCAxNiwgLTcyMjUyMTk3OSksIGQsIF8sIHRbbyArIDZdLCAyMywgNzYwMjkxODkpLCBnID0gYyhnLCBkID0gYyhkLCBfID0gYyhfLCBFLCBnLCBkLCB0W28gKyA5XSwgNCwgLTY0MDM2NDQ4NyksIEUsIGcsIHRbbyArIDEyXSwgMTEsIC00MjE4MTU4MzUpLCBfLCBFLCB0W28gKyAxNV0sIDE2LCA1MzA3NDI1MjApLCBkLCBfLCB0W28gKyAyXSwgMjMsIC05OTUzMzg2NTEpLCBnID0gYShnLCBkID0gYShkLCBfID0gYShfLCBFLCBnLCBkLCB0W29dLCA2LCAtMTk4NjMwODQ0KSwgRSwgZywgdFtvICsgN10sIDEwLCAxMTI2ODkxNDE1KSwgXywgRSwgdFtvICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpLCBkLCBfLCB0W28gKyA1XSwgMjEsIC01NzQzNDA1NSksIGcgPSBhKGcsIGQgPSBhKGQsIF8gPSBhKF8sIEUsIGcsIGQsIHRbbyArIDEyXSwgNiwgMTcwMDQ4NTU3MSksIEUsIGcsIHRbbyArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpLCBfLCBFLCB0W28gKyAxMF0sIDE1LCAtMTA1MTUyMyksIGQsIF8sIHRbbyArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpLCBnID0gYShnLCBkID0gYShkLCBfID0gYShfLCBFLCBnLCBkLCB0W28gKyA4XSwgNiwgMTg3MzMxMzM1OSksIEUsIGcsIHRbbyArIDE1XSwgMTAsIC0zMDYxMTc0NCksIF8sIEUsIHRbbyArIDZdLCAxNSwgLTE1NjAxOTgzODApLCBkLCBfLCB0W28gKyAxM10sIDIxLCAxMzA5MTUxNjQ5KSwgZyA9IGEoZywgZCA9IGEoZCwgXyA9IGEoXywgRSwgZywgZCwgdFtvICsgNF0sIDYsIC0xNDU1MjMwNzApLCBFLCBnLCB0W28gKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSksIF8sIEUsIHRbbyArIDJdLCAxNSwgNzE4Nzg3MjU5KSwgZCwgXywgdFtvICsgOV0sIDIxLCAtMzQzNDg1NTUxKSwgXyA9IG4oXywgaSksIEUgPSBuKEUsIHUpLCBnID0gbihnLCBmKSwgZCA9IG4oZCwgbCk7XG4gICAgICAgIHJldHVybiBbXywgRSwgZywgZF07XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmKHQpIHtcbiAgICAgICAgdmFyIGUsXG4gICAgICAgICAgbiA9IFwiXCIsXG4gICAgICAgICAgbyA9IDMyICogdC5sZW5ndGg7XG4gICAgICAgIGZvciAoZSA9IDA7IGUgPCBvOyBlICs9IDgpIG4gKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0W2UgPj4gNV0gPj4+IGUgJSAzMiAmIDI1NSk7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbCh0KSB7XG4gICAgICAgIHZhciBlLFxuICAgICAgICAgIG4gPSBbXTtcbiAgICAgICAgZm9yIChuWyh0Lmxlbmd0aCA+PiAyKSAtIDFdID0gdm9pZCAwLCBlID0gMDsgZSA8IG4ubGVuZ3RoOyBlICs9IDEpIG5bZV0gPSAwO1xuICAgICAgICB2YXIgbyA9IDggKiB0Lmxlbmd0aDtcbiAgICAgICAgZm9yIChlID0gMDsgZSA8IG87IGUgKz0gOCkgbltlID4+IDVdIHw9ICgyNTUgJiB0LmNoYXJDb2RlQXQoZSAvIDgpKSA8PCBlICUgMzI7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gXyh0KSB7XG4gICAgICAgIHJldHVybiBmKHUobCh0KSwgOCAqIHQubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBFKHQsIGUpIHtcbiAgICAgICAgdmFyIG4sXG4gICAgICAgICAgbyxcbiAgICAgICAgICBpID0gbCh0KSxcbiAgICAgICAgICByID0gW10sXG4gICAgICAgICAgcyA9IFtdO1xuICAgICAgICBmb3IgKHJbMTVdID0gc1sxNV0gPSB2b2lkIDAsIGkubGVuZ3RoID4gMTYgJiYgKGkgPSB1KGksIDggKiB0Lmxlbmd0aCkpLCBuID0gMDsgbiA8IDE2OyBuICs9IDEpIHJbbl0gPSA5MDk1MjI0ODYgXiBpW25dLCBzW25dID0gMTU0OTU1NjgyOCBeIGlbbl07XG4gICAgICAgIHJldHVybiBvID0gdShyLmNvbmNhdChsKGUpKSwgNTEyICsgOCAqIGUubGVuZ3RoKSwgZih1KHMuY29uY2F0KG8pLCA2NDApKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGcodCkge1xuICAgICAgICB2YXIgZSxcbiAgICAgICAgICBuLFxuICAgICAgICAgIG8gPSBcIlwiO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgdC5sZW5ndGg7IG4gKz0gMSkgZSA9IHQuY2hhckNvZGVBdChuKSwgbyArPSBcIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZSA+Pj4gNCAmIDE1KSArIFwiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdCgxNSAmIGUpO1xuICAgICAgICByZXR1cm4gbztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGQodCkge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHQpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIFModCkge1xuICAgICAgICByZXR1cm4gXyhkKHQpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGgodCkge1xuICAgICAgICByZXR1cm4gZyhTKHQpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHAodCwgZSkge1xuICAgICAgICByZXR1cm4gRShkKHQpLCBkKGUpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIFUodCwgZSkge1xuICAgICAgICByZXR1cm4gZyhwKHQsIGUpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIE4odCwgZSwgbikge1xuICAgICAgICByZXR1cm4gZSA/IG4gPyBwKGUsIHQpIDogVShlLCB0KSA6IG4gPyBTKHQpIDogaCh0KTtcbiAgICAgIH1cbiAgICAgIHQuZXhwb3J0cyA/IHQuZXhwb3J0cyA9IE4gOiBlLm1kNSA9IE47XG4gICAgfShjb21tb25qc0dsb2JhbCk7XG4gIH0pLFxuICBCYXNlNjRfMSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAhZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgIHZhciBfQmFzZTY0ID0gZ2xvYmFsLkJhc2U2NCxcbiAgICAgICAgICB2ZXJzaW9uID0gXCIyLjQuOFwiLFxuICAgICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgaWYgKG1vZHVsZS5leHBvcnRzKSB0cnkge1xuICAgICAgICAgIGJ1ZmZlciA9IGV2YWwoXCJyZXF1aXJlKCdidWZmZXInKS5CdWZmZXJcIik7XG4gICAgICAgIH0gY2F0Y2ggKHQpIHtcbiAgICAgICAgICBidWZmZXIgPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGI2NGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsXG4gICAgICAgICAgYjY0dGFiID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGUgPSB7fSwgbiA9IDAsIG8gPSB0Lmxlbmd0aDsgbiA8IG87IG4rKykgZVt0LmNoYXJBdChuKV0gPSBuO1xuICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgfShiNjRjaGFycyksXG4gICAgICAgICAgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcbiAgICAgICAgICBjYl91dG9iID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICh0Lmxlbmd0aCA8IDIpIHJldHVybiAoZSA9IHQuY2hhckNvZGVBdCgwKSkgPCAxMjggPyB0IDogZSA8IDIwNDggPyBmcm9tQ2hhckNvZGUoMTkyIHwgZSA+Pj4gNikgKyBmcm9tQ2hhckNvZGUoMTI4IHwgNjMgJiBlKSA6IGZyb21DaGFyQ29kZSgyMjQgfCBlID4+PiAxMiAmIDE1KSArIGZyb21DaGFyQ29kZSgxMjggfCBlID4+PiA2ICYgNjMpICsgZnJvbUNoYXJDb2RlKDEyOCB8IDYzICYgZSk7XG4gICAgICAgICAgICB2YXIgZSA9IDY1NTM2ICsgMTAyNCAqICh0LmNoYXJDb2RlQXQoMCkgLSA1NTI5NikgKyAodC5jaGFyQ29kZUF0KDEpIC0gNTYzMjApO1xuICAgICAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSgyNDAgfCBlID4+PiAxOCAmIDcpICsgZnJvbUNoYXJDb2RlKDEyOCB8IGUgPj4+IDEyICYgNjMpICsgZnJvbUNoYXJDb2RlKDEyOCB8IGUgPj4+IDYgJiA2MykgKyBmcm9tQ2hhckNvZGUoMTI4IHwgNjMgJiBlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlX3V0b2IgPSAvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGRl18W15cXHgwMC1cXHg3Rl0vZyxcbiAgICAgICAgICB1dG9iID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0LnJlcGxhY2UoL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRkZdfFteXFx4MDAtXFx4N0ZdL2csIGNiX3V0b2IpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2JfZW5jb2RlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBlID0gWzAsIDIsIDFdW3QubGVuZ3RoICUgM10sXG4gICAgICAgICAgICAgIG4gPSB0LmNoYXJDb2RlQXQoMCkgPDwgMTYgfCAodC5sZW5ndGggPiAxID8gdC5jaGFyQ29kZUF0KDEpIDogMCkgPDwgOCB8ICh0Lmxlbmd0aCA+IDIgPyB0LmNoYXJDb2RlQXQoMikgOiAwKTtcbiAgICAgICAgICAgIHJldHVybiBbYjY0Y2hhcnMuY2hhckF0KG4gPj4+IDE4KSwgYjY0Y2hhcnMuY2hhckF0KG4gPj4+IDEyICYgNjMpLCBlID49IDIgPyBcIj1cIiA6IGI2NGNoYXJzLmNoYXJBdChuID4+PiA2ICYgNjMpLCBlID49IDEgPyBcIj1cIiA6IGI2NGNoYXJzLmNoYXJBdCg2MyAmIG4pXS5qb2luKFwiXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYnRvYSA9IGdsb2JhbC5idG9hID8gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwuYnRvYSh0KTtcbiAgICAgICAgICB9IDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0LnJlcGxhY2UoL1tcXHNcXFNdezEsM30vZywgY2JfZW5jb2RlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9lbmNvZGUgPSBidWZmZXIgPyBidWZmZXIuZnJvbSAmJiBVaW50OEFycmF5ICYmIGJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gPyBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuICh0LmNvbnN0cnVjdG9yID09PSBidWZmZXIuY29uc3RydWN0b3IgPyB0IDogYnVmZmVyLmZyb20odCkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuICAgICAgICAgIH0gOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuICh0LmNvbnN0cnVjdG9yID09PSBidWZmZXIuY29uc3RydWN0b3IgPyB0IDogbmV3IGJ1ZmZlcih0KSkudG9TdHJpbmcoXCJiYXNlNjRcIik7XG4gICAgICAgICAgfSA6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gYnRvYSh1dG9iKHQpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuY29kZSA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZSA/IF9lbmNvZGUoU3RyaW5nKHQpKS5yZXBsYWNlKC9bK1xcL10vZywgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiK1wiID09IHQgPyBcIi1cIiA6IFwiX1wiO1xuICAgICAgICAgICAgfSkucmVwbGFjZSgvPS9nLCBcIlwiKSA6IF9lbmNvZGUoU3RyaW5nKHQpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuY29kZVVSSSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlKHQsICEwKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlX2J0b3UgPSBuZXcgUmVnRXhwKFtcIlvDgC3Dn11bwoAtwr9dXCIsIFwiW8OgLcOvXVvCgC3Cv117Mn1cIiwgXCJbw7Atw7ddW8KALcK/XXszfVwiXS5qb2luKFwifFwiKSwgXCJnXCIpLFxuICAgICAgICAgIGNiX2J0b3UgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgc3dpdGNoICh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdmFyIGUgPSAoKDcgJiB0LmNoYXJDb2RlQXQoMCkpIDw8IDE4IHwgKDYzICYgdC5jaGFyQ29kZUF0KDEpKSA8PCAxMiB8ICg2MyAmIHQuY2hhckNvZGVBdCgyKSkgPDwgNiB8IDYzICYgdC5jaGFyQ29kZUF0KDMpKSAtIDY1NTM2O1xuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tQ2hhckNvZGUoNTUyOTYgKyAoZSA+Pj4gMTApKSArIGZyb21DaGFyQ29kZSg1NjMyMCArICgxMDIzICYgZSkpO1xuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21DaGFyQ29kZSgoMTUgJiB0LmNoYXJDb2RlQXQoMCkpIDw8IDEyIHwgKDYzICYgdC5jaGFyQ29kZUF0KDEpKSA8PCA2IHwgNjMgJiB0LmNoYXJDb2RlQXQoMikpO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tQ2hhckNvZGUoKDMxICYgdC5jaGFyQ29kZUF0KDApKSA8PCA2IHwgNjMgJiB0LmNoYXJDb2RlQXQoMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYnRvdSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC5yZXBsYWNlKHJlX2J0b3UsIGNiX2J0b3UpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2JfZGVjb2RlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHZhciBlID0gdC5sZW5ndGgsXG4gICAgICAgICAgICAgIG4gPSBlICUgNCxcbiAgICAgICAgICAgICAgbyA9IChlID4gMCA/IGI2NHRhYlt0LmNoYXJBdCgwKV0gPDwgMTggOiAwKSB8IChlID4gMSA/IGI2NHRhYlt0LmNoYXJBdCgxKV0gPDwgMTIgOiAwKSB8IChlID4gMiA/IGI2NHRhYlt0LmNoYXJBdCgyKV0gPDwgNiA6IDApIHwgKGUgPiAzID8gYjY0dGFiW3QuY2hhckF0KDMpXSA6IDApLFxuICAgICAgICAgICAgICBpID0gW2Zyb21DaGFyQ29kZShvID4+PiAxNiksIGZyb21DaGFyQ29kZShvID4+PiA4ICYgMjU1KSwgZnJvbUNoYXJDb2RlKDI1NSAmIG8pXTtcbiAgICAgICAgICAgIHJldHVybiBpLmxlbmd0aCAtPSBbMCwgMCwgMiwgMV1bbl0sIGkuam9pbihcIlwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGF0b2IgPSBnbG9iYWwuYXRvYiA/IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmF0b2IodCk7XG4gICAgICAgICAgfSA6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC5yZXBsYWNlKC9bXFxzXFxTXXsxLDR9L2csIGNiX2RlY29kZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfZGVjb2RlID0gYnVmZmVyID8gYnVmZmVyLmZyb20gJiYgVWludDhBcnJheSAmJiBidWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tID8gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAodC5jb25zdHJ1Y3RvciA9PT0gYnVmZmVyLmNvbnN0cnVjdG9yID8gdCA6IGJ1ZmZlci5mcm9tKHQsIFwiYmFzZTY0XCIpKS50b1N0cmluZygpO1xuICAgICAgICAgIH0gOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuICh0LmNvbnN0cnVjdG9yID09PSBidWZmZXIuY29uc3RydWN0b3IgPyB0IDogbmV3IGJ1ZmZlcih0LCBcImJhc2U2NFwiKSkudG9TdHJpbmcoKTtcbiAgICAgICAgICB9IDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBidG91KGF0b2IodCkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVjb2RlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiBfZGVjb2RlKFN0cmluZyh0KS5yZXBsYWNlKC9bLV9dL2csIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIi1cIiA9PSB0ID8gXCIrXCIgOiBcIi9cIjtcbiAgICAgICAgICAgIH0pLnJlcGxhY2UoL1teQS1aYS16MC05XFwrXFwvXS9nLCBcIlwiKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSBnbG9iYWwuQmFzZTY0O1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5CYXNlNjQgPSBfQmFzZTY0LCB0O1xuICAgICAgICAgIH07XG4gICAgICAgIGlmIChnbG9iYWwuQmFzZTY0ID0ge1xuICAgICAgICAgIFZFUlNJT046IFwiMi40LjhcIixcbiAgICAgICAgICBhdG9iOiBhdG9iLFxuICAgICAgICAgIGJ0b2E6IGJ0b2EsXG4gICAgICAgICAgZnJvbUJhc2U2NDogZGVjb2RlLFxuICAgICAgICAgIHRvQmFzZTY0OiBlbmNvZGUsXG4gICAgICAgICAgdXRvYjogdXRvYixcbiAgICAgICAgICBlbmNvZGU6IGVuY29kZSxcbiAgICAgICAgICBlbmNvZGVVUkk6IGVuY29kZVVSSSxcbiAgICAgICAgICBidG91OiBidG91LFxuICAgICAgICAgIGRlY29kZTogZGVjb2RlLFxuICAgICAgICAgIG5vQ29uZmxpY3Q6IG5vQ29uZmxpY3QsXG4gICAgICAgICAgX19idWZmZXJfXzogYnVmZmVyXG4gICAgICAgIH0sIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgICAgdmFyIG5vRW51bSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTogdCxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGdsb2JhbC5CYXNlNjQuZXh0ZW5kU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsIFwiZnJvbUJhc2U2NFwiLCBub0VudW0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHRoaXMpO1xuICAgICAgICAgICAgfSkpLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgXCJ0b0Jhc2U2NFwiLCBub0VudW0oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZSh0aGlzLCB0KTtcbiAgICAgICAgICAgIH0pKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsIFwidG9CYXNlNjRVUklcIiwgbm9FbnVtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZSh0aGlzLCAhMCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2xvYmFsLk1ldGVvciAmJiAoQmFzZTY0ID0gZ2xvYmFsLkJhc2U2NCksIG1vZHVsZS5leHBvcnRzICYmIChtb2R1bGUuZXhwb3J0cy5CYXNlNjQgPSBnbG9iYWwuQmFzZTY0KSwge1xuICAgICAgICAgIEJhc2U2NDogZ2xvYmFsLkJhc2U2NFxuICAgICAgICB9O1xuICAgICAgfShnbG9iYWwpO1xuICAgIH0oXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2Ygc2VsZiA/IHNlbGYgOiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiB3aW5kb3cgPyB3aW5kb3cgOiBjb21tb25qc0dsb2JhbCk7XG4gIH0pLFxuICBCYXNlNjRfMiA9IEJhc2U2NF8xLkJhc2U2NCxcbiAgVW1lbmdVdGlscyA9IHtcbiAgICBNRDU6IE1ENSQxLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGNoZWNrRW1wdHlBcmd1bWVudDogY2hlY2tFbXB0eUFyZ3VtZW50LFxuICAgIGNoZWNrSWQ6IGNoZWNrSWQsXG4gICAgc3RyaW5nVG9BcnJheTogc3RyaW5nVG9BcnJheSxcbiAgICB0b1N0cjogdG9TdHIsXG4gICAgdG9PYmplY3Q6IHRvT2JqZWN0LFxuICAgIGNoZWNrQXR0ck9yU3RyaW5nOiBjaGVja0F0dHJPclN0cmluZyxcbiAgICBpc05vdEFOdW1iZXI6IGlzTm90QU51bWJlcixcbiAgICBjaGVja01ENTogY2hlY2tNRDVcbiAgfTtcbmNvbnN0ICRKU09OX1VNRU5HX1NFU1NJT05TJCA9IFwianNvbl91bWVuZ19zZXNzaW9uc1wiLFxuICAkSlNPTl9VTUVOR19IQUxGX1NFU1NJT05TJCA9IFwianNvbl91bWVuZ19oYWxmX3Nlc3Npb25cIixcbiAgJEpTT05fVU1FTkdfQ1VSUkVOVF9TRVNTSU9OJCA9IFwianNvbl91bWVuZ19jdXJyZW50X3Nlc3Npb25cIixcbiAgJEpTT05fVU1FTkdfUEFHRV9FTkRfVElNRSQgPSBcImpzb25fdW1lbmdfcGFnZV9lbmRfdGltZVwiLFxuICBTZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRDdXJyZW50U2Vzc2lvbklkKCkge1xuICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDdXJyZW50U2Vzc2lvbigpIHtcbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2Vzc2lvbnMoKSB7XG4gICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQodCkge1xuICAgICAgICAgIHRoaXMuYXBwa2V5ID0gdCwgbygpO1xuICAgICAgICB9LFxuICAgICAgICBlbmRTZXNzaW9uKCkge1xuICAgICAgICAgIGEgJiYgKGMgPSBEYXRlLm5vdygpLCBhLmVuZF90aW1lID0gYywgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19DVVJSRU5UX1NFU1NJT04kLCBVbWVuZ1V0aWxzLnRvU3RyKGEpKSwgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19QQUdFX0VORF9USU1FJCwgYykpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhclNlc3Npb25zKCkge1xuICAgICAgICAgIFN0b3JhZ2VVdGlsLmRlbGV0ZURhdGEoJEpTT05fVU1FTkdfU0VTU0lPTlMkKSwgbC5zcGxpY2UoMCwgbC5sZW5ndGgpLCBsID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIHNldE9uU2Vzc2lvbkxpc3RlbmVyKHQpIHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25MaXN0ZW5lciA9IHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhhbGZTZXNzaW9ucygpIHtcbiAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJIYWxmU2Vzc2lvbigpIHtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5kZWxldGVEYXRhKCRKU09OX1VNRU5HX0hBTEZfU0VTU0lPTlMkKSwgXy5zcGxpY2UoMCwgXy5sZW5ndGgpLCBfID0gW107XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGUodCwgZSkge1xuICAgICAgY29uc3QgbiA9IERhdGUubm93KCk7XG4gICAgICBEZXZpY2VVdGlsLmdldFVuaXF1ZUlkKCkudGhlbih0ID0+IHtcbiAgICAgICAgY29uc3QgbyA9IFVtZW5nVXRpbHMuTUQ1KGAke259Ojo6JHtTZXNzaW9uLmdldEluc3RhbmNlKCkuYXBwa2V5fTo6OiR7dH1gKTtcbiAgICAgICAgZShvKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKHQpIHtcbiAgICAgIGNvbnN0IGUgPSB7fTtcbiAgICAgIHJldHVybiBlLmlkID0gdCwgZS5zdGFydF90aW1lID0gRGF0ZS5ub3coKSwgZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbygpIHtcbiAgICAgIGNvbnN0IHQgPSBEYXRlLm5vdygpO1xuICAgICAgYSA/IGMgJiYgdCAtIGMgPiBjb25zdGFudHMuU0VTU0lPTl9JTlRFUlZBTCAmJiAoaShjKSwgcihhKSkgOiBTdG9yYWdlVXRpbC5nZXREYXRhKCRKU09OX1VNRU5HX0NVUlJFTlRfU0VTU0lPTiQsIGUgPT4ge1xuICAgICAgICBlICYmIChhID0gVW1lbmdVdGlscy50b09iamVjdChlKSkgPyBTdG9yYWdlVXRpbC5nZXREYXRhKCRKU09OX1VNRU5HX1BBR0VfRU5EX1RJTUUkLCBlID0+IHtcbiAgICAgICAgICBlICYmIHQgLSBlID4gY29uc3RhbnRzLlNFU1NJT05fSU5URVJWQUwgPyAoaShlKSwgcihhKSkgOiBmID0gYS5pZDtcbiAgICAgICAgfSkgOiByKG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGkodCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYS5lbmRfdGltZSA9IHBhcnNlSW50KHQsIDEwKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYS5lbmRfdGltZSA9IHQ7XG4gICAgICB9XG4gICAgICBjb25zdCBlID0gdCAtIGEuc3RhcnRfdGltZTtcbiAgICAgIGEuZHVyYXRpb24gPSBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByKHQpIHtcbiAgICAgIGNvbnN0IG8gPSB0ID8gdC5pZCA6IFwiXCIsXG4gICAgICAgIGkgPSBTZXNzaW9uLmdldEluc3RhbmNlKCkuc2Vzc2lvbkxpc3RlbmVyKG8pO1xuICAgICAgZShvLCBlID0+IHtcbiAgICAgICAgYSA9IG4oZSk7XG4gICAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoJEpTT05fVU1FTkdfU0VTU0lPTlMkLCBuID0+IHtcbiAgICAgICAgICBsID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KG4pO1xuICAgICAgICAgIHQgPyBpLnBhZ2VzKG4gPT4ge1xuICAgICAgICAgICAgbiAmJiBuLmxlbmd0aCA+IDAgJiYgKHQucGFnZXMgPSBuLCB0LiRwYWdlX251bSA9IG4ubGVuZ3RoKTtcbiAgICAgICAgICAgIGwucHVzaCh0KTtcbiAgICAgICAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoJEpTT05fVU1FTkdfU0VTU0lPTlMkLCBVbWVuZ1V0aWxzLnRvU3RyKGwpKTtcbiAgICAgICAgICAgIHMoaSwgZSk7XG4gICAgICAgICAgfSkgOiBzKGksIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19DVVJSRU5UX1NFU1NJT04kLCBVbWVuZ1V0aWxzLnRvU3RyKGEpKTtcbiAgICAgICAgZiA9IGU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcyh0LCBlKSB7XG4gICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKCRKU09OX1VNRU5HX0hBTEZfU0VTU0lPTlMkLCBuID0+IHtcbiAgICAgICAgXyA9IFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheShuKTtcbiAgICAgICAgYSAmJiAoXy5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYSkpKSwgU3RvcmFnZVV0aWwucHV0RGF0YSgkSlNPTl9VTUVOR19IQUxGX1NFU1NJT05TJCwgVW1lbmdVdGlscy50b1N0cihfKSksIHQuZ2VuZXJhdGVTZXNzaW9uQWZ0ZXJIYW5kbGVyKGUpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgYyxcbiAgICAgIGEsXG4gICAgICB1ID0gbnVsbCxcbiAgICAgIGYgPSBcIlwiLFxuICAgICAgbCA9IFtdLFxuICAgICAgXyA9IFtdO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHUgfHwgKHUgPSB0KCkpLCB1O1xuICAgICAgfVxuICAgIH07XG4gIH0oKSxcbiAgJEpTT05fVU1FTkdfSEVBREVSJCA9IFwianNvbl91bWVuZ19oZWFkZXJcIixcbiAgJFVNRU5HX0tFWV9JTVBSSU5UJCA9IFwidW1lbmdfa2V5X2ltcHJpbnRcIixcbiAgTU9CSUxFX05FVFdPUktfMkcgPSBcIjJnXCIsXG4gIE1PQklMRV9ORVRXT1JLXzNHID0gXCIzZ1wiLFxuICBNT0JJTEVfTkVUV09SS180RyA9IFwiNGdcIixcbiAgTU9CSUxFX05FVFdPUktfTk9ORSA9IFwibm9uZVwiLFxuICBCTEFOS19TUEFDRSA9IFwiIFwiLFxuICBVTUVOR19BRFZFUlRJU1RJTkdfSUQgPSBcImlkZmFcIixcbiAgVU1FTkdfQU5EUk9JRF9JRCA9IFwiYW5kcm9pZF9pZFwiLFxuICBVTUVOR19PQUlEID0gXCJvYWlkXCIsXG4gIEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdCh0KSB7XG4gICAgICAgICAgdGhpcy5hcHBrZXkgPSB0LCB0aGlzLmFwcEluZm8gPSBfc3lzdGVtNS5kZWZhdWx0LmdldEluZm8oKSwgZSh0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gdDtcbiAgICAgICAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoJEpTT05fVU1FTkdfSEVBREVSJCwgVW1lbmdVdGlscy50b1N0cih0KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhlYWRlcih0KSB7XG4gICAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGOlxuICAgICAgICAgICAgICB0aGlzLmhlYWRlci5zdCA9IFwiMVwiLCAhMCA9PT0gcyAmJiBkZWxldGUgdGhpcy5oZWFkZXIuYXRtO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0NMT1NFOlxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UOlxuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oZWFkZXIuc3QsIGRlbGV0ZSB0aGlzLmhlYWRlci5hdG07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmhlYWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSGVhZGVyQXR0cih0LCBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXIgJiYgKHRoaXMuaGVhZGVyW3RdID0gZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhlYWRlckF0dHIodCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhlYWRlciAmJiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuaGVhZGVyLCB0KSA/IHRoaXMuaGVhZGVyW3RdIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFja2FnZU5hbWUoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcEluZm8ucGFja2FnZU5hbWU7XG4gICAgICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Rmlyc3RTZW5kRmxhZygpIHtcbiAgICAgICAgICBzID0gITA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGUodCkge1xuICAgICAgRGV2aWNlVXRpbC5nZXRCYXNlSW5mbygpLnRoZW4oZSA9PiB7XG4gICAgICAgIERldmljZVV0aWwuZ2V0VW5pcXVlSWQoKS50aGVuKHIgPT4ge1xuICAgICAgICAgIERldmljZVV0aWwuZ2V0TmV0d29ya0luZm8ocyA9PiB7XG4gICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICB9ID0gcztcbiAgICAgICAgICAgIHR5cGUgPT09IE1PQklMRV9ORVRXT1JLX05PTkUgJiYgKHR5cGUgPSBcInVua25vd25cIik7XG4gICAgICAgICAgICBjb25zdCBjID0gaShlLCByLCB0eXBlKTtcbiAgICAgICAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoJFVNRU5HX0tFWV9JTVBSSU5UJCwgZSA9PiB7XG4gICAgICAgICAgICAgIDAgIT09IGUubGVuZ3RoICYmIChjLmltcHJpbnQgPSBlKTtcbiAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuQVBQX0ZJUlNUX09QRU5fRkxBRywgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IFwidHJ1ZVwiID09PSBlO1xuICAgICAgICAgICAgICAgIGxldCByID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBpICYmIChyID0gbmV3IERhdGUoKSwgYy5hdG0gPSBcIjFcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocik7XG4gICAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuTU9CSUxFX0FEVkVSVElTSU5HX0lELCBlID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBuKGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGUgPSBvKFVNRU5HX0FEVkVSVElTVElOR19JRCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgYy5pZF90cmFja2luZyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLk1PQklMRV9BTkRST0lEX0lELCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodCkgaWYgKGMuaWRfdHJhY2tpbmcgJiYgYy5pZF90cmFja2luZy5zbmFwc2hvdHMpIGMuaWRfdHJhY2tpbmcuc25hcHNob3RzW1VNRU5HX0FORFJPSURfSURdID0gdDtlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGUgPSBvKFVNRU5HX0FORFJPSURfSUQsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5pZF90cmFja2luZyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLk1PQklMRV9PQUlELCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IG4oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCkgaWYgKGMuaWRfdHJhY2tpbmcgJiYgYy5pZF90cmFja2luZy5zbmFwc2hvdHMpIGMuaWRfdHJhY2tpbmcuc25hcHNob3RzW1VNRU5HX09BSURdID0gdDtlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZSA9IG8oVU1FTkdfT0FJRCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGMuaWRfdHJhY2tpbmcgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB0KGMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKHQpIHtcbiAgICAgIGlmICh0KSB7XG4gICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgaWRlbnRpdHk6IHQsXG4gICAgICAgICAgdmVyc2lvbjogMSxcbiAgICAgICAgICB0czogRGF0ZS5ub3coKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbyh0LCBlKSB7XG4gICAgICBjb25zdCBuID0ge1xuICAgICAgICBzbmFwc2hvdHM6IHt9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG4uc25hcHNob3RzW3RdID0gZSwgbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaSh0LCBlLCBuKSB7XG4gICAgICBsZXQgbyA9IG51bGw7XG4gICAgICBpZiAodCkge1xuICAgICAgICBjb25zdCBuID0gdC5zY3JlZW5XaWR0aCxcbiAgICAgICAgICBpID0gdC5zY3JlZW5IZWlnaHQsXG4gICAgICAgICAgcyA9IG4gPiBpID8gYCR7bn0qJHtpfWAgOiBgJHtpfSoke259YCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhcHBJbmZvOiBhcHBJbmZvXG4gICAgICAgICAgfSA9IHIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgYnJhbmQ6IGJyYW5kXG4gICAgICAgICAgfSA9IHQsXG4gICAgICAgICAgYyA9IGJyYW5kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIG8gPSB7XG4gICAgICAgICAgYXBwX3ZlcnNpb246IGFwcEluZm8udmVyc2lvbk5hbWUsXG4gICAgICAgICAgdmVyc2lvbl9jb2RlOiBhcHBJbmZvLnZlcnNpb25Db2RlLFxuICAgICAgICAgIGFwcF9zb3VyY2VfZXh0cmE6IGFwcEluZm8uc291cmNlLmV4dHJhLFxuICAgICAgICAgIGRldmljZV90eXBlOiBcIlBob25lXCIsXG4gICAgICAgICAgcGFja2FnZV9uYW1lOiBhcHBJbmZvLnBhY2thZ2VOYW1lLFxuICAgICAgICAgIHNka190eXBlOiBcIkFuZHJvaWRcIixcbiAgICAgICAgICBvczogXCJBbmRyb2lkXCIsXG4gICAgICAgICAgc2RrX3ZlcnNpb246IGNvbnN0YW50cy5TREtfVkVSU0lPTixcbiAgICAgICAgICBhcHBrZXk6IHIuYXBwa2V5LFxuICAgICAgICAgIGRldmljZV9tb2RlbDogbW9kZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKGMpID4gLTEgPyBtb2RlbCA6IGMgKyBCTEFOS19TUEFDRSArIG1vZGVsLFxuICAgICAgICAgIGRldmljZV9icmFuZDogYnJhbmQsXG4gICAgICAgICAgY2hhbm5lbDogYyxcbiAgICAgICAgICBkZXZpY2VfbWFudWZhY3R1cmVyOiB0Lm1hbnVmYWN0dXJlcixcbiAgICAgICAgICBkZXZpY2VfbWFudWlkOiBtb2RlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYykgPiAtMSA/IG1vZGVsIDogYyArIEJMQU5LX1NQQUNFICsgbW9kZWwsXG4gICAgICAgICAgZGV2aWNlX25hbWU6IHQucHJvZHVjdC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYykgPiAtMSA/IHQucHJvZHVjdCA6IGMgKyBCTEFOS19TUEFDRSArIHQucHJvZHVjdCxcbiAgICAgICAgICBvc192ZXJzaW9uOiB0Lm9zVmVyc2lvbk5hbWUsXG4gICAgICAgICAgcmVzb2x1dGlvbjogcyxcbiAgICAgICAgICBsYW5ndWFnZTogdC5sYW5ndWFnZSxcbiAgICAgICAgICBkaXNwbGF5X25hbWU6IHQubmFtZSxcbiAgICAgICAgICBpZG1kNTogVW1lbmdVdGlscy5NRDUoZSksXG4gICAgICAgICAgcGxhdGZvcm06IFwicXVpY2thcHBcIixcbiAgICAgICAgICBwcm9fdmVyOiBcIjFcIlxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIG8gPSB7XG4gICAgICAgIGFwcF92ZXJzaW9uOiByLmFwcEluZm8udmVyc2lvbk5hbWUsXG4gICAgICAgIHZlcnNpb25fY29kZTogci5hcHBJbmZvLnZlcnNpb25Db2RlLFxuICAgICAgICBkZXZpY2VfdHlwZTogXCJQaG9uZVwiLFxuICAgICAgICBwYWNrYWdlX25hbWU6IHIuYXBwSW5mby5wYWNrYWdlTmFtZSxcbiAgICAgICAgc2RrX3R5cGU6IFwiQW5kcm9pZFwiLFxuICAgICAgICBvczogXCJBbmRyb2lkXCIsXG4gICAgICAgIHNka192ZXJzaW9uOiBjb25zdGFudHMuU0RLX1ZFUlNJT04sXG4gICAgICAgIGFwcGtleTogci5hcHBrZXksXG4gICAgICAgIGlkbWQ1OiBVbWVuZ1V0aWxzLk1ENShlKSxcbiAgICAgICAgcGxhdGZvcm06IFwicXVpY2thcHBcIixcbiAgICAgICAgcHJvX3ZlcjogXCIxXCJcbiAgICAgIH07XG4gICAgICBzd2l0Y2ggKG4pIHtcbiAgICAgICAgY2FzZSBNT0JJTEVfTkVUV09SS180RzpcbiAgICAgICAgICBvLmFjY2Vzc19zdWJ0eXBlID0gXCJMVEVcIiwgby5hY2Nlc3MgPSBcIjJHLzNHXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTU9CSUxFX05FVFdPUktfM0c6XG4gICAgICAgICAgby5hY2Nlc3Nfc3VidHlwZSA9IFwiQ0RNQVwiLCBvLmFjY2VzcyA9IFwiMkcvM0dcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNT0JJTEVfTkVUV09SS18yRzpcbiAgICAgICAgICBvLmFjY2Vzc19zdWJ0eXBlID0gXCJHUlBTXCIsIG8uYWNjZXNzID0gXCIyRy8zR1wiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG8uYWNjZXNzID0gbiwgZGVsZXRlIG8uYWNjZXNzX3N1YnR5cGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbztcbiAgICB9XG4gICAgbGV0IHIgPSBudWxsLFxuICAgICAgcyA9ICExO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHIgfHwgKHIgPSB0KCkpLCByO1xuICAgICAgfVxuICAgIH07XG4gIH0oKTtcbkxvb3Blci5wcm90b3R5cGUgPSB7XG4gIHByZXBhcmUodCkge1xuICAgIHRoaXMucXVldWVPYmplY3QgPSB0LCB0aGlzLmlzUnVubmluZyA9ICExLCB0aGlzLmlzRm9yY2VTdG9wID0gITE7XG4gIH0sXG4gIGxvb3AoKSB7XG4gICAgaWYgKCF0aGlzLmlzRm9yY2VTdG9wICYmIHRoaXMucXVldWVPYmplY3QgJiYgIXRoaXMuaXNSdW5uaW5nKSBmb3IgKHRoaXMuaXNSdW5uaW5nID0gITA7IHRoaXMuaXNSdW5uaW5nOykge1xuICAgICAgaWYgKCF0aGlzLnF1ZXVlT2JqZWN0LmlzQ2FuUG9wKCkpIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSAhMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnF1ZXVlT2JqZWN0LmRpc3BhdGNoTWVzc2FnZSgpO1xuICAgICAgfSBjYXRjaCAodCkge31cbiAgICB9XG4gIH0sXG4gIHdhaXQoKSB7XG4gICAgdGhpcy5pc1J1bm5pbmcgPSAhMTtcbiAgfSxcbiAgZm9yY2VTdG9wKCkge1xuICAgIHRoaXMuaXNGb3JjZVN0b3AgPSAhMDtcbiAgfSxcbiAgY2FuY2VsRm9yY2VTdG9wKCkge1xuICAgIHRoaXMuaXNGb3JjZVN0b3AgPSAhMSwgdGhpcy5sb29wKCk7XG4gIH1cbn07XG5jb25zdCBSZXF1ZXN0UXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdCh0KSB7XG4gICAgICByZXR1cm4gISF0ICYmIChmLnVuc2hpZnQodCksIHUubG9vcCgpLCAhMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGUoKSB7XG4gICAgICBpZiAoZi5sZW5ndGggPiAwKSByZXR1cm4gZi5wb3AoKTtcbiAgICAgIGNvbnN0IHQgPSBsLmxlbmd0aDtcbiAgICAgIHJldHVybiB0ID4gMCA/ICgxID09PSB0ICYmIFJlcXVlc3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5jbGVhck5vU2VuZERhdGFzKCksIGwucG9wKCkpIDogbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gbih0LCBlKSB7XG4gICAgICBjb25zdCBuID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbyh0KTtcbiAgICAgICAgfSwgM2U0KSxcbiAgICAgICAgaSA9IHtcbiAgICAgICAgICBrZXk6IHQsXG4gICAgICAgICAgdGltZU91dEZ1bjogbixcbiAgICAgICAgICBpc0V4ZTogITFcbiAgICAgICAgfTtcbiAgICAgIGcucHVzaChpKSwgZSh0ID0+IHtcbiAgICAgICAgbyh0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvKHQpIHtcbiAgICAgIGZvciAobGV0IGUgPSBnLmxlbmd0aCAtIDE7IGUgPj0gMDsgZS0tKSB7XG4gICAgICAgIGNvbnN0IG4gPSBnW2VdO1xuICAgICAgICBpZiAobi5rZXkgPT09IHQpIHtcbiAgICAgICAgICBpZiAoIW4uaXNFeGUpIHtcbiAgICAgICAgICAgIG4uaXNFeGUgPSAhMDtcbiAgICAgICAgICAgIGNvbnN0IHQgPSBuLnRpbWVPdXRGdW47XG4gICAgICAgICAgICB0ICYmIGNsZWFyVGltZW91dCh0KSwgaSgpLCBnLnNwbGljZShlLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaSgpIHtcbiAgICAgIChFIC09IDEpIDw9IF8gJiYgdS5sb29wKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHIodCkge1xuICAgICAgY29uc3QgZSA9IGcubGVuZ3RoLFxuICAgICAgICBuID0gdC5tZDVLZXk7XG4gICAgICBmb3IgKGxldCB0ID0gZSAtIDE7IHQgPj0gMDsgdC0tKSB7XG4gICAgICAgIGNvbnN0IGUgPSBnW3RdO1xuICAgICAgICBpZiAoZS5rZXkgPT09IG4pIHJldHVybiBpKCksICEwO1xuICAgICAgfVxuICAgICAgcmV0dXJuICExO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzKCkge1xuICAgICAgUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLm9uTm9TZW5kRGF0YXNMaXN0ZW5lcih0ID0+IHtcbiAgICAgICAgaWYgKCF0IHx8IDAgPT09IHQubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgZSBpbiB0KSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbCh0LCBlKSkge1xuICAgICAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgICAgICBtZDVLZXk6IHRbZV0sXG4gICAgICAgICAgICB0eXBlOiBcInNlY29uZFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgICBsLnB1c2gobik7XG4gICAgICAgIH1cbiAgICAgICAgdS5sb29wKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYygpIHtcbiAgICAgIHJldHVybiBzKCksIHtcbiAgICAgICAgaGFuZGxlTWVzc2FnZShlLCBuKSB7XG4gICAgICAgICAgZSAmJiBcInNlY29uZFwiID09PSBlLnR5cGUgJiYgaSgpLCBlICYmIGUuZGF0YSAmJiAoZS5leGVjdXRlRnVuY3Rpb24gPSBuLCB0KGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGF0Y2hNZXNzYWdlKCkge1xuICAgICAgICAgIGlmIChFID4gXykgcmV0dXJuIHZvaWQgdS53YWl0KCk7XG4gICAgICAgICAgRSArPSAxO1xuICAgICAgICAgIGNvbnN0IHQgPSBlKCk7XG4gICAgICAgICAgcih0KSB8fCAodC5kYXRhID8gbih0Lm1kNUtleSwgdC5leGVjdXRlRnVuY3Rpb24pIDogUmVxdWVzdEhlbHBlci5nZXRJbnN0YW5jZSgpLnNlbmQodCksIHRoaXMuaXNDYW5Qb3AoKSB8fCB1LndhaXQoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ2FuUG9wKCkge1xuICAgICAgICAgIHJldHVybiBmLmxlbmd0aCA+IDAgfHwgbC5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgYSwgdTtcbiAgICBjb25zdCBmID0gW10sXG4gICAgICBsID0gW10sXG4gICAgICBfID0gMztcbiAgICBsZXQgRSA9IDE7XG4gICAgY29uc3QgZyA9IFtdO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIGEgfHwgKGEgPSBjKCksICh1ID0gbmV3IExvb3BlcigpKS5wcmVwYXJlKGEpKSwgYTtcbiAgICAgIH1cbiAgICB9O1xuICB9KCksXG4gIFN0b3JlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdCh0KSB7XG4gICAgICBpZiAoIXQpIHJldHVybiAhMTtcbiAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgIGtleTogdCxcbiAgICAgICAgdHlwZTogX1xuICAgICAgfTtcbiAgICAgIHJldHVybiB1LnVuc2hpZnQoZSksIGEubG9vcCgpLCAhMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgIGlmICh1Lmxlbmd0aCA+IDApIHJldHVybiB1LnBvcCgpO1xuICAgICAgY29uc3QgdCA9IGYubGVuZ3RoO1xuICAgICAgaWYgKHQgPiAwKSB7XG4gICAgICAgIGNvbnN0IGUgPSBmLnBvcCgpO1xuICAgICAgICByZXR1cm4gMCA9PT0gdCAmJiBuKCksIGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbigpLCBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBuKCkge1xuICAgICAgZyB8fCAoZyA9ICEwLCBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5LRVlfTk9fU0VORF9SRVFVRVNUX0tFWVMsIHQgPT4ge1xuICAgICAgICBnID0gITE7XG4gICAgICAgIGlmICghdCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBlID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KHQpO1xuICAgICAgICBjb25zdCBuID0gdCA9PiBlID0+IHtcbiAgICAgICAgICBlICYmICdcIlwiJyAhPT0gZSB8fCAoZSA9IHtcbiAgICAgICAgICAgIGtleTogdCxcbiAgICAgICAgICAgIHR5cGU6IEVcbiAgICAgICAgICB9LCBmLnB1c2goZSkpO1xuICAgICAgICAgIGYubGVuZ3RoID4gMCAmJiBhLmxvb3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCB0IGluIGUpIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsIHQpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IGVbdF07XG4gICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShvLCBuKG8pKTtcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBnID0gITE7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG8odCkge1xuICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuS0VZX05PX1NFTkRfUkVRVUVTVF9LRVlTLCBlID0+IHtcbiAgICAgICAgZSA9IGUgPyBVbWVuZ1V0aWxzLnRvT2JqZWN0KGUpIDogW107XG4gICAgICAgIGUucHVzaCh0KTtcbiAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuS0VZX05PX1NFTkRfUkVRVUVTVF9LRVlTLCBVbWVuZ1V0aWxzLnRvU3RyKGUpLCAoKSA9PiB7XG4gICAgICAgICAgcih0KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHIodCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICByKHQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGkodCkge1xuICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuS0VZX05PX1NFTkRfUkVRVUVTVF9LRVlTLCBlID0+IHtcbiAgICAgICAgaWYgKCFlKSByZXR1cm4gdm9pZCByKHQpO1xuICAgICAgICBlID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KGUpO1xuICAgICAgICBmb3IgKGNvbnN0IG4gaW4gZSkgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoZSwgbikpIHtcbiAgICAgICAgICBjb25zdCBvID0gZVtuXTtcbiAgICAgICAgICBpZiAobyA9PT0gdCkge1xuICAgICAgICAgICAgZS5zcGxpY2UobiwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuS0VZX05PX1NFTkRfUkVRVUVTVF9LRVlTLCBVbWVuZ1V0aWxzLnRvU3RyKGUpLCAoKSA9PiB7XG4gICAgICAgICAgcih0KTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHIodCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICByKHQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHIoKSB7XG4gICAgICAoZCAtPSAxKSA8PSBsICYmIGEubG9vcCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzKCkge1xuICAgICAgcmV0dXJuIG4oKSwge1xuICAgICAgICBoYW5kbGVNZXNzYWdlKGUpIHtcbiAgICAgICAgICBlID8gdChlKSA6IG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGF0Y2hNZXNzYWdlKCkge1xuICAgICAgICAgIGlmIChkID4gbCkgcmV0dXJuIHZvaWQgYS53YWl0KCk7XG4gICAgICAgICAgZCArPSAxO1xuICAgICAgICAgIGNvbnN0IHQgPSBlKCk7XG4gICAgICAgICAgaWYgKCF0IHx8IG51bGwgPT09IHQpIHJldHVybiB2b2lkIHIoKTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBrZXk6IGtleVxuICAgICAgICAgIH0gPSB0O1xuICAgICAgICAgIHQudHlwZSA9PT0gXyA/IG8oa2V5KSA6IGkoa2V5KSwgdGhpcy5pc0NhblBvcCgpIHx8IGEud2FpdCgpO1xuICAgICAgICB9LFxuICAgICAgICBpc0NhblBvcCgpIHtcbiAgICAgICAgICByZXR1cm4gdS5sZW5ndGggPiAwIHx8IGYubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgbGV0IGMsIGE7XG4gICAgY29uc3QgdSA9IFtdLFxuICAgICAgZiA9IFtdLFxuICAgICAgbCA9IDEsXG4gICAgICBfID0gXCJ3cml0ZVwiLFxuICAgICAgRSA9IFwiZGVsZXRlXCI7XG4gICAgbGV0IGcgPSAhMSxcbiAgICAgIGQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIGMgfHwgKGMgPSBzKCksIChhID0gbmV3IExvb3BlcigpKS5wcmVwYXJlKGMpKSwgYztcbiAgICAgIH1cbiAgICB9O1xuICB9KCksXG4gICRVTUVOR19LRVlfSU1QUklOVCQkMSA9IFwidW1lbmdfa2V5X2ltcHJpbnRcIjtcbmxldCBub1NlbmRSZXF1ZXN0S2V5cyA9IFtdO1xuY29uc3QgUmVxdWVzdEhlbHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0KCkge1xuICAgICAgY29uc3QgdCA9IFtdLmNvbmNhdChTZXNzaW9uLmdldEluc3RhbmNlKCkuZ2V0U2Vzc2lvbnMoKSk7XG4gICAgICBpZiAodCAmJiAwICE9PSB0Lmxlbmd0aCkgcmV0dXJuIFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5jbGVhclNlc3Npb25zKCksIHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGUoKSB7XG4gICAgICBjb25zdCB0ID0gW10uY29uY2F0KFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5nZXRIYWxmU2Vzc2lvbnMoKSk7XG4gICAgICBpZiAodCAmJiAwICE9PSB0Lmxlbmd0aCkgcmV0dXJuIFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5jbGVhckhhbGZTZXNzaW9uKCksIHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4odCkge1xuICAgICAgU3RvcmFnZVV0aWwuZGVsZXRlRGF0YSh0LCB0ID0+IHtcbiAgICAgICAgdCAmJiBTdG9yZVF1ZXVlLmdldEluc3RhbmNlKCkuaGFuZGxlTWVzc2FnZShudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvKHQsIGUsIG8sIHIpIHtcbiAgICAgIGlmICghdCB8fCAnXCJcIicgPT09IHQpIHJldHVybiB2b2lkIChvICYmIG8oZSkpO1xuICAgICAgY29uc3QgcyA9IGNvbnN0YW50cy5SRUxFQVNFX1VSTDtcbiAgICAgIF9zeXN0ZW02LmRlZmF1bHQuZmV0Y2goe1xuICAgICAgICB1cmw6IHMsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IFVtZW5nVXRpbHMuZW5jb2RlKHQpLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcInF1aWNrYXBwL2pzb25cIixcbiAgICAgICAgICBcIk1zZy1UeXBlXCI6IFwicXVpY2thcHAvanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3ModCkge1xuICAgICAgICAgIGlmICgyMDAgPT09IHQuY29kZSkge1xuICAgICAgICAgICAgTG9nLmkoXCIqKiogdW1lbmdfc2RrICoqKiByZXF1ZXN0IHNlbmQgc3VjY2Vzc1wiKSwgbihlKSwgciAmJiByKGUpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgZSA9IFVtZW5nVXRpbHMudG9PYmplY3QodC5kYXRhKTtcbiAgICAgICAgICAgICAgaShlLmltcHJpbnQpO1xuICAgICAgICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgICAgICB9IGVsc2UgNDEzID09PSB0LmNvZGUgJiYgKExvZy5pKFwiKioqIHVtZW5nX3NkayAqKiogcmVxdWVzdCBpcyB0byBsYXJnZSFcIiksIG4oZSksIHIgJiYgcihlKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uICh0LCBlKSB7XG4gICAgICAgICAgTG9nLmkoXCIqKiogdW1lbmdfc2RrICoqKiByZXF1ZXN0IGVycm9yLCBwbGVhc2UgY2hlY2sgeW91ciBwZXJtaXNzaW9uISBcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgIG8gJiYgbyhlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGkodCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKCRVTUVOR19LRVlfSU1QUklOVCQkMSwgdCksIEhlYWRlci5nZXRJbnN0YW5jZSgpLmFkZEhlYWRlckF0dHIoXCJpbXByaW50XCIsIHQpO1xuICAgICAgICAgIGNvbnN0IGUgPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KFVtZW5nVXRpbHMuZGVjb2RlKHQpKSxcbiAgICAgICAgICAgIG4gPSBlLnJlcG9ydF9wb2xpY3k7XG4gICAgICAgICAgaWYgKG4gJiYgVW1lbmdVdGlscy5pc05vdEFOdW1iZXIobikpIHtcbiAgICAgICAgICAgIGlmIChTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1ksIG4pLCBuID09PSBjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX0lOVEVSVkFMX1ZBTFVFKSB7XG4gICAgICAgICAgICAgIGxldCB0ID0gZS5yZXBvcnRfaW50ZXJ2YWw7XG4gICAgICAgICAgICAgIHQgJiYgVW1lbmdVdGlscy5pc05vdEFOdW1iZXIodCkgPyAodCA8PSBjb25zdGFudHMuRVZFTlRfU0VORF9NSU5fSU5URVJWQUwgPyB0ID0gY29uc3RhbnRzLkVWRU5UX1NFTkRfTUlOX0lOVEVSVkFMIDogdCA+IGNvbnN0YW50cy5FVkVOVF9TRU5EX01BWF9JTlRFUlZBTCAmJiAodCA9IGNvbnN0YW50cy5FVkVOVF9TRU5EX01BWF9JTlRFUlZBTCksIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX0lOVEVSVkFMX1RJTUUsIHQpKSA6IFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9TVEFSVF9TRU5EX1ZBTFVFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCBjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZX1NUQVJUX1NFTkRfVkFMVUUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgIH1cbiAgICBmdW5jdGlvbiByKHQsIGUpIHtcbiAgICAgIGNvbnN0IG4gPSBVbWVuZ1V0aWxzLnRvU3RyKGUpO1xuICAgICAgbGV0IG8gPSBudWxsO1xuICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEY6XG4gICAgICAgICAgbyA9IGNvbnN0YW50cy5LRVlfSEFMRl9TRVNTSU9OX1BSRUZJWDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX1NFU1NJT05fQ0xPU0U6XG4gICAgICAgICAgbyA9IGNvbnN0YW50cy5LRVlfQ0xPU0VfU0VTU0lPTl9QUkVGSVg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9FVkVOVDpcbiAgICAgICAgICBvID0gY29uc3RhbnRzLktFWV9FVkVOVF9QUkVGSVg7XG4gICAgICB9XG4gICAgICBjb25zdCBpID0gbyArIFVtZW5nVXRpbHMuTUQ1KG4pO1xuICAgICAgcmV0dXJuIFN0b3JhZ2VVdGlsLnB1dERhdGEoaSwgbiksIFN0b3JlUXVldWUuZ2V0SW5zdGFuY2UoKS5oYW5kbGVNZXNzYWdlKGkpLCAwID09PSBub1NlbmRSZXF1ZXN0S2V5cy5sZW5ndGggJiYgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuS0VZX05PX1NFTkRfUkVRVUVTVF9LRVlTLCB0ID0+IHtcbiAgICAgICAgaWYgKCF0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IGUgPSBVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkodCk7XG4gICAgICAgIDAgPT09IG5vU2VuZFJlcXVlc3RLZXlzLmxlbmd0aCAmJiAobm9TZW5kUmVxdWVzdEtleXMgPSBlLCBhICYmIGEobm9TZW5kUmVxdWVzdEtleXMpKTtcbiAgICAgIH0pLCBpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFyYW1zSXNWYWxpZCh0KSB7XG4gICAgICAgICAgcmV0dXJuIC0xICE9PSBbY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9TRVNTSU9OX0hBTEYsIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRSwgY29uc3RhbnRzLlJFUVVFU1RfVFlQRV9FVkVOVF0uaW5kZXhPZih0KTtcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRTZW5kQ29udGVudChuLCBvKSB7XG4gICAgICAgICAgaWYgKEhlYWRlci5nZXRJbnN0YW5jZSgpLmdldEhlYWRlcihuKSkge1xuICAgICAgICAgICAgY29uc3QgaSA9IHtcbiAgICAgICAgICAgICAgaGVhZGVyOiBIZWFkZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZWFkZXIobiksXG4gICAgICAgICAgICAgIGFuYWx5dGljczogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN3aXRjaCAobikge1xuICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9IQUxGOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIXQpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgaS5hbmFseXRpY3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiB0XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5SRVFVRVNUX1RZUEVfU0VTU0lPTl9DTE9TRTpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBlID0gdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFlKSBicmVhaztcbiAgICAgICAgICAgICAgICAgIGkuYW5hbHl0aWNzID0ge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uczogZVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuUkVRVUVTVF9UWVBFX0VWRU5UOlxuICAgICAgICAgICAgICAgIG8gJiYgby5sZW5ndGggPiAwICYmIChpLmFuYWx5dGljcyA9IHtcbiAgICAgICAgICAgICAgICAgIGVrdjogb1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIGkuYW5hbHl0aWNzICYmIChzID0gcihuLCBpKSksIHtcbiAgICAgICAgICAgICAgZGF0YTogaSxcbiAgICAgICAgICAgICAgbWQ1S2V5OiBzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2VuZCh0LCBlKSB7XG4gICAgICAgICAgY29uc3QgbiA9IHQubWQ1S2V5O1xuICAgICAgICAgIG4gJiYgKFwic2Vjb25kXCIgPT09IHQudHlwZSA/IFN0b3JhZ2VVdGlsLmdldERhdGEobiwgbiA9PiB7XG4gICAgICAgICAgICB0LmRhdGEgPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KG4pO1xuICAgICAgICAgICAgdC5kYXRhIHx8IGUgJiYgZSgpO1xuICAgICAgICAgICAgUmVxdWVzdFF1ZXVlLmdldEluc3RhbmNlKCkuaGFuZGxlTWVzc2FnZSh0LCBuID0+IHtcbiAgICAgICAgICAgICAgbyhVbWVuZ1V0aWxzLnRvU3RyKHQuZGF0YSksIHQubWQ1S2V5LCBuLCBlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pIDogUmVxdWVzdFF1ZXVlLmdldEluc3RhbmNlKCkuaGFuZGxlTWVzc2FnZSh0LCBuID0+IHtcbiAgICAgICAgICAgIG8oVW1lbmdVdGlscy50b1N0cih0LmRhdGEpLCB0Lm1kNUtleSwgbiwgZSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXROb1NlbmRSZXF1ZXN0S2V5cygpIHtcbiAgICAgICAgICByZXR1cm4gbm9TZW5kUmVxdWVzdEtleXM7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9TZW5kRGF0YXNMaXN0ZW5lcih0KSB7XG4gICAgICAgICAgYSA9IHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyTm9TZW5kRGF0YXMoKSB7XG4gICAgICAgICAgbm9TZW5kUmVxdWVzdEtleXMuc3BsaWNlKDAsIG5vU2VuZFJlcXVlc3RLZXlzLmxlbmd0aCksIG5vU2VuZFJlcXVlc3RLZXlzID0gW107XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGxldCBjLCBhO1xuICAgIHJldHVybiB7XG4gICAgICBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIGMgfHwgKGMgPSBzKCkpLCBjO1xuICAgICAgfVxuICAgIH07XG4gIH0oKSxcbiAgRXZlbnRTdG9yZVF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHQodCkge1xuICAgICAgaWYgKHQpIHtcbiAgICAgICAgaWYgKCFTZXNzaW9uLmdldEluc3RhbmNlKCkuZ2V0Q3VycmVudFNlc3Npb25JZCgpKSByZXR1cm4gdm9pZCBVLnVuc2hpZnQodCk7XG4gICAgICAgIHAudW5zaGlmdCh0KSwgcC5sZW5ndGggPj0gXyAmJiBnLmxvb3AoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgIHJldHVybiBwLmxlbmd0aCA8IF8gPyBudWxsIDogcC5zcGxpY2UoMCwgXyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG4oKSB7XG4gICAgICBoICYmIGgubGVuZ3RoID4gMCAmJiBzKHQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGUgaW4gaCkgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoaCwgZSkpIHRyeSB7XG4gICAgICAgICAgaFtlXSh0KTtcbiAgICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgIH0pLCAoZCAtPSAxKSA8IDEgJiYgKGQgPSAxKSwgZCA8PSBFICYmIGcubG9vcCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvKHQsIGUpIHtcbiAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEodSwgZSwgKCkgPT4ge1xuICAgICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKGYsIFVtZW5nVXRpbHMudG9TdHIodCksICgpID0+IHtcbiAgICAgICAgICBuKCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICBuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBuKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaSh0LCBlKSB7XG4gICAgICB0ICYmIChoW3RdID0gZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHIodCkge1xuICAgICAgdCAmJiBkZWxldGUgaFt0XTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcyh0KSB7XG4gICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKGYsIGUgPT4ge1xuICAgICAgICBTdG9yYWdlVXRpbC5kZWxldGVEYXRhKGYsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuID0gYyhVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkoZSksIHApO1xuICAgICAgICAgIHAuc3BsaWNlKDAsIHAubGVuZ3RoKTtcbiAgICAgICAgICB0KG4pO1xuICAgICAgICAgIGcuY2FuY2VsRm9yY2VTdG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB0KFtdKTtcbiAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjKHQsIGUpIHtcbiAgICAgIGNvbnN0IG4gPSBTZXNzaW9uLmdldEluc3RhbmNlKCkuZ2V0Q3VycmVudFNlc3Npb25JZCgpO1xuICAgICAgbGV0IG8sXG4gICAgICAgIGkgPSAtMTtcbiAgICAgIGZvciAoY29uc3QgZSBpbiB0KSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbCh0LCBlKSkge1xuICAgICAgICBjb25zdCByID0gdFtlXTtcbiAgICAgICAgaWYgKG8gPSByW25dKSB7XG4gICAgICAgICAgaSA9IGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMSA9PT0gaSAmJiAobyA9IFtdKSwgKG8gPSBvLmNvbmNhdChlKSkgJiYgMCAhPT0gby5sZW5ndGggPyAoLTEgPT09IGkgPyB0LnB1c2goe1xuICAgICAgICBbbl06IG9cbiAgICAgIH0pIDogdFtpXVtuXSA9IG8sIHQpIDogdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gYSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNhdmVFa3ZEYXRhKGUpIHtcbiAgICAgICAgICB0KGUpLCBMb2cuZChgW3NhdmVFa3ZEYXRhXSBkYXRhIGlzICR7VW1lbmdVdGlscy50b1N0cihlKX1gKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZEVrdkRhdGFzKHQpIHtcbiAgICAgICAgICB0ICYmIChnLmZvcmNlU3RvcCgpLCBkIDw9IEUgPyBzKGUgPT4ge1xuICAgICAgICAgICAgdChlKTtcbiAgICAgICAgICAgIGcuY2FuY2VsRm9yY2VTdG9wKCk7XG4gICAgICAgICAgfSkgOiBpKFwicmVhZEVrdkRhdGFzXCIsIGUgPT4ge1xuICAgICAgICAgICAgdChlKTtcbiAgICAgICAgICAgIHIoXCJyZWFkRWt2RGF0YXNcIik7XG4gICAgICAgICAgICBnLmNhbmNlbEZvcmNlU3RvcCgpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlck5vU2Vzc2lvbkVrdkRhdGFzKCkge1xuICAgICAgICAgIGlmIChVICYmIFUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgTG9nLmQoYG5vIHNlc3Npb25JZCBldmVudCBpcyAke0pTT04uc3RyaW5naWZ5KFUpfWApO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0IGluIFUpICh7fSkuaGFzT3duUHJvcGVydHkuY2FsbChVLCB0KSAmJiB0aGlzLnNhdmVFa3ZEYXRhKFVbdF0pO1xuICAgICAgICAgICAgVS5zcGxpY2UoMCwgVS5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcXVpdEhhbmRsZXIoKSB7XG4gICAgICAgICAgMCAhPT0gcC5sZW5ndGggJiYgKGcuZm9yY2VTdG9wKCksIGQgPD0gRSA/IFN0b3JhZ2VVdGlsLmdldERhdGEoZiwgdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBlID0gYyhVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkodCksIHApO1xuICAgICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShmLCBVbWVuZ1V0aWxzLnRvU3RyKGUpKTtcbiAgICAgICAgICAgIHAuc3BsaWNlKDAsIHAubGVuZ3RoKTtcbiAgICAgICAgICAgIGcuY2FuY2VsRm9yY2VTdG9wKCk7XG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgZy5jYW5jZWxGb3JjZVN0b3AoKTtcbiAgICAgICAgICB9KSA6IGkoXCJxdWl0SGFuZGxlclwiLCB0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSBVbWVuZ1V0aWxzLnRvU3RyKGModCwgcCkpO1xuICAgICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShmLCBlKTtcbiAgICAgICAgICAgIHAuc3BsaWNlKDAsIHAubGVuZ3RoKTtcbiAgICAgICAgICAgIHIoXCJxdWl0SGFuZGxlclwiKTtcbiAgICAgICAgICAgIGcuY2FuY2VsRm9yY2VTdG9wKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBkaXNwYXRjaE1lc3NhZ2UoKSB7XG4gICAgICAgICAgaWYgKGQgPiBFKSByZXR1cm4gdm9pZCBnLndhaXQoKTtcbiAgICAgICAgICBkICs9IDE7XG4gICAgICAgICAgY29uc3QgdCA9IGUoKTtcbiAgICAgICAgICBpZiAoIXQgfHwgMCA9PT0gdC5sZW5ndGgpIHJldHVybiB2b2lkIG4oKTtcbiAgICAgICAgICBTdG9yYWdlVXRpbC5nZXREYXRhKHUsIGUgPT4ge1xuICAgICAgICAgICAgZSB8fCAoZSA9IDApO1xuICAgICAgICAgICAgZSA+PSBsICsgdC5sZW5ndGggPyBuKCkgOiBTdG9yYWdlVXRpbC5nZXREYXRhKGYsIG4gPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpID0gYyhVbWVuZ1V0aWxzLnN0cmluZ1RvQXJyYXkobiksIHQpO1xuICAgICAgICAgICAgICBvKGksIE51bWJlcihlKSArIE51bWJlcih0Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICBuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBuKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ2FuUG9wKCkge1xuICAgICAgICAgIHJldHVybiBwLmxlbmd0aCA+PSBfO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB1ID0gXCJ1bWVuZ19la3ZfY291bnRfa2V5XCIsXG4gICAgICBmID0gXCJ1bWVuZ19rZXlfZWt2c1wiLFxuICAgICAgbCA9IDFlNCxcbiAgICAgIF8gPSA1LFxuICAgICAgRSA9IDE7XG4gICAgbGV0IGcsXG4gICAgICBkID0gMSxcbiAgICAgIFMgPSBudWxsO1xuICAgIGNvbnN0IGggPSB7fSxcbiAgICAgIHAgPSBbXSxcbiAgICAgIFUgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIHJldHVybiBTIHx8IChTID0gbmV3IGEoKSwgKGcgPSBuZXcgTG9vcGVyKCkpLnByZXBhcmUoUykpLCBTO1xuICAgICAgfVxuICAgIH07XG4gIH0oKSxcbiAgRXZlbnRDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHQodCwgZSkge1xuICAgICAgY29uc3QgbiA9IHtcbiAgICAgICAgaWQ6IHQsXG4gICAgICAgIHRzOiBEYXRlLm5vdygpXG4gICAgICB9O1xuICAgICAgc3dpdGNoICh0eXBlb2YgZSkge1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgblt0XSA9IGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICBmb3IgKGNvbnN0IHQgaW4gZSkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsIHQpICYmIChuW3RdID0gZVt0XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZSgpIHtcbiAgICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgdCA9PiB7XG4gICAgICAgIHQgPT09IGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1lfSU5URVJWQUxfVkFMVUUgJiYgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfSU5URVJWQUxfVElNRSwgdCA9PiB7XG4gICAgICAgICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfTEFTVF9TRU5EX1RJTUUsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgIGUgJiYgbiAtIGUgPiAxZTMgKiB0ICYmIFJlcXVlc3Quc2VuZEFsbCgpO1xuICAgICAgICAgICAgfSBlbHNlIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWSwgY29uc3RhbnRzLkVWRU5UX1NFTkRfUkVQT1JUX1BPTElDWV9TVEFSVF9TRU5EX1ZBTFVFKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZEV2ZW50KG4sIG8pIHtcbiAgICAgICAgICBjb25zdCBpID0gdChuLCBvKTtcbiAgICAgICAgICBFdmVudFN0b3JlUXVldWUuZ2V0SW5zdGFuY2UoKS5zYXZlRWt2RGF0YShpKSwgZSgpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVyTm9TZXNzaW9uRWt2RGF0YXMoKSB7XG4gICAgICAgICAgRXZlbnRTdG9yZVF1ZXVlLmdldEluc3RhbmNlKCkuaGFuZGxlck5vU2Vzc2lvbkVrdkRhdGFzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHF1aXRIYW5kbGVyKCkge1xuICAgICAgICAgIEV2ZW50U3RvcmVRdWV1ZS5nZXRJbnN0YW5jZSgpLnF1aXRIYW5kbGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFNlbmRUaW1lKCkge1xuICAgICAgICAgIFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkVWRU5UX0xBU1RfU0VORF9USU1FLCBEYXRlLm5vdygpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgbGV0IG87XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gbyB8fCAobyA9IG4oKSksIG87XG4gICAgICB9XG4gICAgfTtcbiAgfSgpO1xubGV0IHRpbWUgPSAwO1xudmFyIFJlcXVlc3QgPSB7XG4gIHNlbmQ6IHNlbmQsXG4gIHNlbmRBbGw6IHNlbmRBbGxcbn07XG5jb25zdCBLRVlfUFJFX1BBR0UgPSBcInVtZW5nX3BhZ2VfXCI7XG5QYWdlQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XG4gIGFkZEN1cnJlbnRQYWdlKHQpIHtcbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IHtcbiAgICAgIHRzOiBEYXRlLm5vdygpLFxuICAgICAgcGFnZV9uYW1lOiBEZXZpY2VVdGlsLmdldFBhZ2VOYW1lKClcbiAgICB9LCB0aGlzLnBhZ2VPYmplY3QgPSB0O1xuICB9LFxuICBzYXZlUGFnZSh0LCBlKSB7XG4gICAgaWYgKHQgJiYgZSAmJiB0aGlzLl9jdXJyZW50UGFnZS5wYWdlX25hbWUgJiYgZSA9PT0gdGhpcy5wYWdlT2JqZWN0KSB7XG4gICAgICBjb25zdCBlID0gRGF0ZS5ub3coKSAtIHRoaXMuX2N1cnJlbnRQYWdlLnRzO1xuICAgICAgdGhpcy5fY3VycmVudFBhZ2UuZHVyYXRpb24gPSBNYXRoLmFicyhlKSwgdGhpcy5fcGFnZWxpc3QgPSB0aGlzLl9wYWdlbGlzdC5jb25jYXQodGhpcy5fY3VycmVudFBhZ2UpLCB0aGlzLl9jdXJyZW50UGFnZSA9IHt9LCB0aGlzLnBhZ2VPYmplY3QgPSB7fSwgdGhpcy5zYXZlU3Ryb3JhZ2VQYWdlcyh0KTtcbiAgICB9XG4gIH0sXG4gIHNhdmVTdHJvcmFnZVBhZ2VzKHQpIHtcbiAgICB0ICYmIHRoaXMuX3BhZ2VsaXN0Lmxlbmd0aCA+IDAgJiYgdGhpcy51cGRhdGVTdG9yYWdlKEtFWV9QUkVfUEFHRSArIHQsIHRoaXMuX3BhZ2VsaXN0KTtcbiAgfSxcbiAgZ2V0UGFnZXModCwgZSkge1xuICAgIFN0b3JhZ2VVdGlsLmdldERhdGEoS0VZX1BSRV9QQUdFICsgdCwgbiA9PiB7XG4gICAgICBjb25zdCBvID0gVW1lbmdVdGlscy5zdHJpbmdUb0FycmF5KG4pLmNvbmNhdCh0aGlzLl9wYWdlbGlzdCk7XG4gICAgICB0aGlzLmNsZWFyKHQpO1xuICAgICAgZSAmJiBlKG8pO1xuICAgIH0sICgpID0+IHtcbiAgICAgIGUgJiYgZShudWxsKTtcbiAgICB9KTtcbiAgfSxcbiAgdXBkYXRlU3RvcmFnZSh0LCBlKSB7XG4gICAgZSAmJiAwICE9PSBlLmxlbmd0aCAmJiBTdG9yYWdlVXRpbC5nZXREYXRhKHQsIG4gPT4ge1xuICAgICAgY29uc3QgbyA9IFVtZW5nVXRpbHMuc3RyaW5nVG9BcnJheShuKS5jb25jYXQoZSk7XG4gICAgICBTdG9yYWdlVXRpbC5wdXREYXRhKHQsIFVtZW5nVXRpbHMudG9TdHIobyksICgpID0+IHtcbiAgICAgICAgdGhpcy5fcGFnZWxpc3QgPSBbXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGVhcih0KSB7XG4gICAgU3RvcmFnZVV0aWwuZGVsZXRlRGF0YShLRVlfUFJFX1BBR0UgKyB0KSwgdGhpcy5fcGFnZWxpc3QgPSBbXTtcbiAgfVxufTtcbmxldCBpbml0ZWQgPSAhMTtcblVtZW5nQW5hbHlzaXNMaWIucHJvdG90eXBlID0ge1xuICBpbml0KHQpIHtcbiAgICBpZiAoTG9nLmkoYCoqKiB1bWVuZ19zZGsgKioqIHNkayB2ZXJzaW9uIGlzOiAke2NvbnN0YW50cy5TREtfVkVSU0lPTn1gKSwgIWluaXRlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5hcHBrZXkgPSB0LiRkYXRhLnVtZW5nX2FwcGtleTtcbiAgICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgICBpZiAoIXRoaXMuYXBwa2V5KSByZXR1cm4gaW5pdGVkID0gITEsIHZvaWQgY29uc29sZS5lcnJvcihcInBsZWFzZSBzZXQgdW1lbmdfYXBwa2V5IDogW21hbmlmZXN0Lmpzb24gLS1cXHgzZSBjb25maWc6e2RhdGE6e3VtZW5nX2FwcGtleTogeHh4fX1dXCIpO1xuICAgICAgaW5pdGVkID0gITAsIEhlYWRlci5nZXRJbnN0YW5jZSgpLmluaXQodGhpcy5hcHBrZXkpO1xuICAgICAgY29uc3QgZSA9IHRoaXM7XG4gICAgICBpZiAoU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLnNldE9uU2Vzc2lvbkxpc3RlbmVyKHQgPT4gKHtcbiAgICAgICAgcGFnZXMobikge1xuICAgICAgICAgIGUucGFnZUNvbnRyb2xsZXIuZ2V0UGFnZXModCwgbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdlbmVyYXRlU2Vzc2lvbkFmdGVySGFuZGxlcih0KSB7XG4gICAgICAgICAgRXZlbnRDb250cm9sbGVyLmdldEluc3RhbmNlKCkuaGFuZGxlck5vU2Vzc2lvbkVrdkRhdGFzKCksIHNlbmREYXRhcygpO1xuICAgICAgICB9XG4gICAgICB9KSksIFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLkFQUF9GSVJTVF9PUEVOX0ZMQUcsIHQgPT4ge1xuICAgICAgICAwID09PSB0Lmxlbmd0aCAmJiBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5BUFBfRklSU1RfT1BFTl9GTEFHLCBcInRydWVcIik7XG4gICAgICB9KSwgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfU0VORF9SRVBPUlRfUE9MSUNZLCB0ID0+IHtcbiAgICAgICAgdCB8fCBTdG9yYWdlVXRpbC5wdXREYXRhKGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1ksIGNvbnN0YW50cy5FVkVOVF9TRU5EX1JFUE9SVF9QT0xJQ1lfU1RBUlRfU0VORF9WQUxVRSk7XG4gICAgICB9KSwgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRVZFTlRfTEFTVF9TRU5EX1RJTUUsIHQgPT4ge1xuICAgICAgICB0IHx8IEV2ZW50Q29udHJvbGxlci5nZXRJbnN0YW5jZSgpLnNldFNlbmRUaW1lKCk7XG4gICAgICB9KSwgdCkgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX3N0YXR1c1wiLCB7XG4gICAgICAgICAgc2V0KHQpIHtcbiAgICAgICAgICAgIFwiZGVzdHJveVwiID09PSB0ICYmIFJlcXVlc3Quc2VuZEFsbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoICh0KSB7fVxuICAgIH1cbiAgfSxcbiAgcmVzdW1lKHQpIHtcbiAgICBpc0luaXQoKSAmJiB0ICYmIChMb2cuaShgKioqIHVtZW5nX3NkayAqKiogcGFnZSBuYW1lOiAke0RldmljZVV0aWwuZ2V0UGFnZU5hbWUoKX1gKSwgdGhpcy5wYWdlQ29udHJvbGxlci5hZGRDdXJyZW50UGFnZSh0KSwgU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmluaXQodGhpcy5hcHBrZXkpKTtcbiAgfSxcbiAgcGF1c2UodCkge1xuICAgIGlzSW5pdCgpICYmIHQgJiYgKHRoaXMucGFnZUNvbnRyb2xsZXIuc2F2ZVBhZ2UoU2Vzc2lvbi5nZXRJbnN0YW5jZSgpLmdldEN1cnJlbnRTZXNzaW9uSWQoKSwgdCksIFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5lbmRTZXNzaW9uKCksIEV2ZW50Q29udHJvbGxlci5nZXRJbnN0YW5jZSgpLnF1aXRIYW5kbGVyKCkpO1xuICB9LFxuICB0cmFja0V2ZW50KHQsIGUpIHtcbiAgICBpZiAoaXNJbml0KCkpIHJldHVybiBVbWVuZ1V0aWxzLmNoZWNrSWQodCkgPyBlICYmICFVbWVuZ1V0aWxzLmNoZWNrQXR0ck9yU3RyaW5nKGUpID8gKGNvbnNvbGUuZXJyb3IoXCJlcnJvci0tLS0tcGxlYXNlIGNoZWNrIHRyYWNrRXZlbnQgYXR0ci4gYXR0ciBzaG91bGQgYmUgJ1N0cmluZycgb3IgJ09iamVjdCcobm90IGluY2x1ZGUgJ0FycmF5JylcIiksICExKSA6IChMb2cuaShgKioqIHVtZW5nX3NkayAqKiogZXZlbnQgaWQ6ICR7VW1lbmdVdGlscy50b1N0cih0KX0ke2UgPyBgIHx8IGV2ZW50IGF0dHI6ICR7VW1lbmdVdGlscy50b1N0cihlKX1gIDogXCJcIn1gKSwgRXZlbnRDb250cm9sbGVyLmdldEluc3RhbmNlKCkuYWRkRXZlbnQodCwgZSksICEwKSA6IChjb25zb2xlLmVycm9yKFwiZXJyb3ItLS0tLXBsZWFzZSBjaGVjayB0cmFja0V2ZW50IGlkLiBpZCBzaG91bGQgYmUgJ1N0cmluZycgYW5kIG5vdCBudWxsXCIpLCAhMSk7XG4gIH1cbn07XG5jb25zdCBGaWxlVXRpbHMgPSB7XG4gICAgZ2V0RmlsZSh0LCBlLCBuKSB7XG4gICAgICBfc3lzdGVtNy5kZWZhdWx0LnJlYWRUZXh0KHtcbiAgICAgICAgdXJpOiB0LFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBlICYmIGUodC50ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCh0LCBlKSB7XG4gICAgICAgICAgbiAmJiBuKHQsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIG1vdmVGaWxlKHQsIGUsIG4sIG8pIHtcbiAgICAgIF9zeXN0ZW03LmRlZmF1bHQubW92ZSh7XG4gICAgICAgIHNyY1VyaTogdCxcbiAgICAgICAgZHN0VXJpOiBlLFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBuICYmIG4odCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwodCwgZSkge1xuICAgICAgICAgIG8gJiYgbyh0LCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGVGaWxlKHQsIGUsIG4pIHtcbiAgICAgIF9zeXN0ZW03LmRlZmF1bHQuZGVsZXRlKHtcbiAgICAgICAgdXJpOiB0LFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBlICYmIGUodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwodCwgZSkge1xuICAgICAgICAgIG4gJiYgbih0LCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBtb2R1bGVzID0ge1xuICAgIFwiQHN5c3RlbS5hcHBcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5hcHBcIiksXG4gICAgXCJAc3lzdGVtLnN0b3JhZ2VcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5zdG9yYWdlXCIpLFxuICAgIFwiQHN5c3RlbS5mZXRjaFwiOiAkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmZldGNoXCIpLFxuICAgIFwiQHN5c3RlbS5uZXR3b3JrXCI6ICRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ubmV0d29ya1wiKSxcbiAgICBcIkBzeXN0ZW0uZGV2aWNlXCI6ICRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpLFxuICAgIFwiQHN5c3RlbS5yb3V0ZXJcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yb3V0ZXJcIiksXG4gICAgXCJAc3lzdGVtLmZpbGVcIjogJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5maWxlXCIpXG4gIH0sXG4gIGNhbGxRdWV1ZSA9IFtdLFxuICB1bWVuZ19zdGF0X2dsb2JhbCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpIHx8IGdsb2JhbDtcblNka1VwZGF0ZXIucHJvdG90eXBlID0ge1xuICBpbml0KHQsIGUpIHtcbiAgICB0aGlzLmluc3RhbGxBcGkodCwgbnVsbCk7XG4gICAgdHJ5IHtcbiAgICAgIERldmljZVV0aWwuZ2V0U3lzdGVtQmFzZUluZm8odCA9PiB7XG4gICAgICAgIDFlMyA9PT0gdC5wbGF0Zm9ybVZlcnNpb25Db2RlID8gZSgwKSA6IFN0b3JhZ2VVdGlsLmdldERhdGEoY29uc3RhbnRzLkRPV05MT0FEX0ZJTEVfRklSU1RfQ0FDSEUsIHQgPT4ge1xuICAgICAgICAgIHQgPyB0aGlzLmdldFNka0ZpbGVDb250ZW50KHQsICh0LCBuLCBvKSA9PiB7XG4gICAgICAgICAgICB0ID8gZSgxLCBuLCBvKSA6IHRoaXMuZ2V0U2Vjb25kQ2FjaGVGaWxlKGUpO1xuICAgICAgICAgIH0pIDogdGhpcy5nZXRTZWNvbmRDYWNoZUZpbGUoZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAodCkge1xuICAgICAgZSgwKTtcbiAgICB9XG4gIH0sXG4gIGdldFNlY29uZENhY2hlRmlsZSh0KSB7XG4gICAgU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9TRUNPTkRfQ0FDSEUsIGUgPT4ge1xuICAgICAgZSA/IHRoaXMuZ2V0U2RrRmlsZUNvbnRlbnQoZSwgdCkgOiB0KDApO1xuICAgIH0pO1xuICB9LFxuICBnZXRTZGtGaWxlQ29udGVudCh0LCBlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KHQpO1xuICAgICAgTG9nLmQoYGN1cnJlbnQgc2RrOiR7bi52ZXJzaW9ufSR7bi5tZDV9JHtuLmZpbGVQYXRofWApLCBGaWxlVXRpbHMuZ2V0RmlsZShuLmZpbGVQYXRoLCB0ID0+IHtcbiAgICAgICAgVW1lbmdVdGlscy5jaGVja01ENShuLm1kNSwgdCkgPyBlKDEsIHQsIG4udmVyc2lvbikgOiBlKDApO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBlKDApO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAodCkge1xuICAgICAgZSgwKTtcbiAgICB9XG4gICAgcmV0dXJuICExO1xuICB9LFxuICBkb3dubG9hZEZpbGUodCwgZSwgbiwgbywgaSkge1xuICAgIHRyeSB7XG4gICAgICBfc3lzdGVtOC5kZWZhdWx0LmRvd25sb2FkKHtcbiAgICAgICAgdXJsOiB0LFxuICAgICAgICBzdWNjZXNzKHQpIHtcbiAgICAgICAgICBMb2cuZChgaGFuZGxpbmcgc3VjY2VzcyAke3QudG9rZW59YCksIF9zeXN0ZW04LmRlZmF1bHQub25Eb3dubG9hZENvbXBsZXRlKHtcbiAgICAgICAgICAgIHRva2VuOiB0LnRva2VuLFxuICAgICAgICAgICAgc3VjY2Vzcyh0KSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHQudXJpLFxuICAgICAgICAgICAgICAgICAgcyA9IHIuc3BsaXQoXCIvXCIpLFxuICAgICAgICAgICAgICAgICAgYyA9IHNbcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGNvbnN0YW50cy5TREtfVVBEQVRFX0xPQ0FMX1NUT1JBR0VfUEFUSDtcbiAgICAgICAgICAgICAgICBhID0gYCR7YSArIERhdGUubm93KCl9LyR7Y31gLCBGaWxlVXRpbHMubW92ZUZpbGUodC51cmksIGEsIHQgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgciA9IHtcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogZSxcbiAgICAgICAgICAgICAgICAgICAgbWQ1OiBuLFxuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogdCxcbiAgICAgICAgICAgICAgICAgICAgc3RhYmxlOiBvXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaShyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAodCkge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKHQsIGUpIHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoKSB7fVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAodCkge31cbiAgfSxcbiAgc3RvcmFnZUZpbGVJbmZvKHQpIHtcbiAgICB0cnkge1xuICAgICAgRmlsZVV0aWxzLmdldEZpbGUodC5maWxlUGF0aCwgZSA9PiB7XG4gICAgICAgIExvZy5kKGAtLS0tLS0tLS0ke0pTT04uc3RyaW5naWZ5KHQpfS0tLS0tLS0tLS0tJHtVbWVuZ1V0aWxzLk1ENShlKX1gKTtcbiAgICAgICAgZSAmJiB0Lm1kNSAmJiB0Lm1kNSA9PT0gVW1lbmdVdGlscy5NRDUoZSkgPyAoU3RvcmFnZVV0aWwuZ2V0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9GSVJTVF9DQUNIRSwgZSA9PiB7XG4gICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9GSVJTVF9DQUNIRSwgdCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgdCA9IFVtZW5nVXRpbHMudG9PYmplY3QoZSk7XG4gICAgICAgICAgICAgICF0LnN0YWJsZSAmJiB0LmZpbGVQYXRoICYmIEZpbGVVdGlscy5kZWxldGVGaWxlKHQuZmlsZVBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSwgdC5zdGFibGUgPyBTdG9yYWdlVXRpbC5nZXREYXRhKGNvbnN0YW50cy5ET1dOTE9BRF9GSUxFX1NFQ09ORF9DQUNIRSwgZSA9PiB7XG4gICAgICAgICAgU3RvcmFnZVV0aWwucHV0RGF0YShjb25zdGFudHMuRE9XTkxPQURfRklMRV9TRUNPTkRfQ0FDSEUsIHQsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHQgPSBVbWVuZ1V0aWxzLnRvT2JqZWN0KGUpO1xuICAgICAgICAgICAgICB0LmZpbGVQYXRoICYmIEZpbGVVdGlscy5kZWxldGVGaWxlKHQuZmlsZVBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSA6IFN0b3JhZ2VVdGlsLnB1dERhdGEoY29uc3RhbnRzLkRPV05MT0FEX0ZJTEVfRklSU1RfQ0FDSEUsIHQpKSA6IEZpbGVVdGlscy5kZWxldGVGaWxlKHQuZmlsZVBhdGgsICgpID0+IHt9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKHQpIHtcbiAgICAgIExvZy5kKGBlcnJvciBtZXNzYWdlOiAke3QudG9TdHJpbmcoKX1gKTtcbiAgICB9XG4gIH0sXG4gIGNoZWNrVmVyc2lvbk5ldyh0LCBlLCBuLCBvLCBpLCByKSB7XG4gICAgY29uc3QgcyA9IHtcbiAgICAgIHZlcnNpb246IHQsXG4gICAgICBwbGF0Zm9ybTogXCJxdWlja2FwcFwiLFxuICAgICAgYXBwVmVyc2lvbjogbixcbiAgICAgIGFwcEtleTogZSxcbiAgICAgIHNlZWRWZXJzaW9uOiBvLFxuICAgICAgc3lzdGVtQmFzZUluZm86IGlcbiAgICB9O1xuICAgIF9zeXN0ZW02LmRlZmF1bHQuZmV0Y2goe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBkYXRhOiBzLFxuICAgICAgc3VjY2Vzcyh0KSB7XG4gICAgICAgIGlmICgyMDAgPT09IHQuY29kZSkgdHJ5IHtcbiAgICAgICAgICBjb25zdCBlID0gVW1lbmdVdGlscy50b09iamVjdCh0LmRhdGEpO1xuICAgICAgICAgIGlmICgyMDAgPT09IGUuY29kZSAmJiBlLmRhdGEudXBkYXRlKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gZS5kYXRhLmluZm87XG4gICAgICAgICAgICB0ICYmIHIodCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoICh0KSB7fVxuICAgICAgfSxcbiAgICAgIGZhaWwodCwgZSkge30sXG4gICAgICBjb21wbGV0ZSgpIHt9XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZU1ldGhvZCh0LCBlLCBuKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRbZV0gPSBuID8gZnVuY3Rpb24gKC4uLnQpIHtcbiAgICAgICAgcmV0dXJuIG5bZV0oLi4udCk7XG4gICAgICB9IDogZnVuY3Rpb24gKC4uLnQpIHtcbiAgICAgICAgY2FsbFF1ZXVlLnB1c2goW2UsIHRdKTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAodCkge31cbiAgfSxcbiAgaW5zdGFsbEFwaSh0LCBlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSBbXCJyZXN1bWVcIiwgXCJwYXVzZVwiLCBcInRyYWNrRXZlbnRcIl07XG4gICAgICBmb3IgKGxldCBvID0gMCwgaSA9IG4ubGVuZ3RoOyBvIDwgaTsgbysrKSB0aGlzLmNyZWF0ZU1ldGhvZCh0LCBuW29dLCBlKTtcbiAgICAgIGlmIChlKSBmb3IgKGxldCB0ID0gMCwgbiA9IGNhbGxRdWV1ZS5sZW5ndGg7IHQgPCBuOyB0KyspIHtcbiAgICAgICAgY29uc3QgbiA9IGNhbGxRdWV1ZVt0XTtcbiAgICAgICAgZVtuWzBdXSguLi5uWzFdKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoICh0KSB7fVxuICB9LFxuICBjb21waWxlTW9kdWxlKHQsIGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdCA9IG5ldyBGdW5jdGlvbihcIm1vZHVsZVwiLCBcImV4cG9ydHNcIiwgXCJyZXF1aXJlXCIsIGUpLFxuICAgICAgICBuID0ge1xuICAgICAgICAgIGV4cG9ydHM6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIG8gPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiB0IGluIG1vZHVsZXMgPyBtb2R1bGVzW3RdIDogcmVxdWlyZSh0KTtcbiAgICAgICAgfTtcbiAgICAgIHJldHVybiB0KG4sIG4uZXhwb3J0cywgbyksIG4uZXhwb3J0cztcbiAgICB9IGNhdGNoICh0KSB7fVxuICB9LFxuICBsb2FkTW9kdWxlKHQsIGUpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG47XG4gICAgICBpZiAoMCA9PT0gdCkgbiA9IFVtZW5nQW5hbHlzaXNMaWI7ZWxzZSB0cnkge1xuICAgICAgICBuID0gdGhpcy5jb21waWxlTW9kdWxlKHQsIGUpO1xuICAgICAgfSBjYXRjaCAodCkge1xuICAgICAgICBuID0gVW1lbmdBbmFseXNpc0xpYjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuO1xuICAgIH0gY2F0Y2ggKHQpIHt9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5jb25zdCBVbWVuZ0FuYWx5c2lzID0ge1xuICBzZWVkX3ZlcnNpb246IFwiMC4wLjFcIixcbiAgdmVyc2lvbjogY29uc3RhbnRzLlNES19WRVJTSU9OLFxuICBhcHBLZXk6IFwiXCIsXG4gIF9pbXBsOiBudWxsLFxuICBfaW5pdGVkOiAhMSxcbiAgaW5pdCh0KSB7XG4gICAgaWYgKCF0aGlzLl9pbml0ZWQpIHtcbiAgICAgIHRoaXMuX2luaXRlZCA9ICEwLCB1bWVuZ19zdGF0X2dsb2JhbC51c2VyRHVidWcgPSAhIXQuJGRhdGEudW1lbmdfZGVidWcsIHRoaXMuYXBwS2V5ID0gdC4kZGF0YS51bWVuZ19hcHBrZXk7XG4gICAgICBjb25zdCBlID0gbmV3IFNka1VwZGF0ZXIoKTtcbiAgICAgIGUuaW5pdCh0aGlzLCAobiwgbywgaSkgPT4ge1xuICAgICAgICBjb25zdCByID0gZS5sb2FkTW9kdWxlKG4sIG8pO1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgIGNvbnN0IG4gPSBuZXcgcigpO1xuICAgICAgICAgIHRoaXMuX2ltcGwgPSBuLCBuLmluaXQodCksIGUuaW5zdGFsbEFwaSh0aGlzLCBuKTtcbiAgICAgICAgfVxuICAgICAgICBpIHx8IChpID0gdGhpcy52ZXJzaW9uKTtcbiAgICAgICAgRGV2aWNlVXRpbC5nZXRTeXN0ZW1CYXNlSW5mbyh0ID0+IHtcbiAgICAgICAgICBpZiAoMWUzID09PSB0LnBsYXRmb3JtVmVyc2lvbkNvZGUpIHJldHVybjtcbiAgICAgICAgICBlLmNoZWNrVmVyc2lvbk5ldyhpLCB0aGlzLmFwcEtleSwgX3N5c3RlbTUuZGVmYXVsdC5nZXRJbmZvKCkudmVyc2lvbk5hbWUsIHRoaXMuc2VlZF92ZXJzaW9uLCB0LCB0ID0+IHtcbiAgICAgICAgICAgIHQgJiYgZS5kb3dubG9hZEZpbGUodC5maWxlVXJsLCB0LnZlcnNpb24sIHQuZmlsZU1ENSwgdC5zdGFibGUsIHQgPT4ge1xuICAgICAgICAgICAgICBlLnN0b3JhZ2VGaWxlSW5mbyh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbiFmdW5jdGlvbiAoKSB7XG4gIHVtZW5nX3N0YXRfZ2xvYmFsICYmICh1bWVuZ19zdGF0X2dsb2JhbC4kdW1lbmdfc3RhdCA9IFVtZW5nQW5hbHlzaXMsIHVtZW5nX3N0YXRfZ2xvYmFsLlBhZ2UgPSBQYWdlKTtcbn0oKTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IFVtZW5nQW5hbHlzaXM7IiwiPHNjcmlwdD5cbiAgaW1wb3J0ICcuL0NvbW1vbi9saWJzL3VtZW5nL3VtZW5nYW5hbHlzaXMuZXMubWluJzsgICAvL+WPi+ebn3NkayDlv4Xpobvmt7vliqDvvIHvvIHvvIFcblxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvbkNyZWF0ZSgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbygnQXBwbGljYXRpb24gb25DcmVhdGUnKTtcbiAgICAgIGNvbnN0IGhvb2syZ2xvYmFsID0gZ2xvYmFsLl9fcHJvdG9fXyB8fCBnbG9iYWxcbiAgICAgIGNvbnN0ICRyb3V0ZXIgPSByZXF1aXJlKCdAc3lzdGVtLnJvdXRlcicpXG4gICAgICBjb25zdCAkdXRpbHMgPSByZXF1aXJlKCcuL0NvbW1vbi9oZWxwZXIvdXRpbHMnKS5kZWZhdWx0XG4gICAgICBjb25zdCAkc3RvcmFnZSA9IHJlcXVpcmUoXCJAc3lzdGVtLnN0b3JhZ2VcIilcbiAgICAgIGNvbnN0ICRjaXBoZXIgPSByZXF1aXJlKFwiQHN5c3RlbS5jaXBoZXJcIilcbiAgICAgIGNvbnN0ICRwcm9tcHQgPSByZXF1aXJlKFwiQHN5c3RlbS5wcm9tcHRcIilcbiAgICAgIGNvbnN0ICR3ZWJ2aWV3ID0gcmVxdWlyZShcIkBzeXN0ZW0ud2Vidmlld1wiKVxuICAgICAgY29uc3QgJGFwaXMgPSByZXF1aXJlKCcuL0NvbW1vbi9oZWxwZXIvYXBpcycpLmRlZmF1bHRcbiAgICAgIGNvbnN0ICRhZCA9IHJlcXVpcmUoXCJAc2VydmljZS5hZFwiKVxuICAgICAgY29uc3QgJGFwcCA9IHJlcXVpcmUoXCJAc3lzdGVtLmFwcFwiKVxuICAgICAgY29uc3QgJGRldmljZSA9IHJlcXVpcmUoXCJAc3lzdGVtLmRldmljZVwiKVxuXG4gICAgICBjb25zdCAkcHJvY2Vzc0RhdGEgPSByZXF1aXJlKCcuL0NvbW1vbi9oZWxwZXIvcHJvY2Vzc0RhdGEnKS5kZWZhdWx0XG5cbiAgICAgIGhvb2syZ2xvYmFsLiRyb3V0ZXIgPSAkcm91dGVyXG4gICAgICBob29rMmdsb2JhbC4kdXRpbHMgPSAkdXRpbHNcbiAgICAgIGhvb2syZ2xvYmFsLiRzdG9yYWdlID0gJHN0b3JhZ2VcbiAgICAgIGhvb2syZ2xvYmFsLiRwcm9tcHQgPSAkcHJvbXB0XG4gICAgICBob29rMmdsb2JhbC4kYXBpcyA9ICRhcGlzXG4gICAgICBob29rMmdsb2JhbC4kd2VidmlldyA9ICR3ZWJ2aWV3XG4gICAgICBob29rMmdsb2JhbC4kYWQgPSAkYWRcbiAgICAgIGhvb2syZ2xvYmFsLiRjaXBoZXIgPSAkY2lwaGVyXG4gICAgICBob29rMmdsb2JhbC4kYXBwID0gJGFwcFxuXG4gICAgICBob29rMmdsb2JhbC4kZGV2aWNlID0gJGRldmljZVxuICAgICAgaG9vazJnbG9iYWwuJHByb2Nlc3NEYXRhID0gJHByb2Nlc3NEYXRhXG4gICAgICAvL+WPi+ebn3Nka1xuICAgICAgY29uc29sZS5sb2coXCJbYXBwLnV4XSBvbkNyZWF0ZS4uLlwiKTtcbiAgICAgICR1bWVuZ19zdGF0LmluaXQodGhpcyk7ICAgLy/lnKhvbkNyZWF0ZeWHveaVsOS4reWKoOWFpeivpeihjOS7o+egge+8jOW/hemhu+a3u+WKoO+8ge+8gVxuXG4gICAgfSxcbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ0FwcGxpY2F0aW9uIG9uRGVzdHJveScpO1xuXG5cbiAgICAgIC8v6YCAYXBw5o+S5bGP5bm/5ZGKXG4gICAgICAvLyAkdXRpbHMudGFibGVQbGFxdWUodGhpcy5kYXRhQXBwLmludGVyc3RpdGlhbEFkVW5pdElkKVxuICAgIH0sXG4gICAgZGF0YUFwcDoge1xuXG4gICAgICB1cmwxOiBcImh0dHA6Ly93d3cuaWhhaXR1by5jbi94eS9qYi9ienp4Lmh0bWxcIixcbiAgICAgIHVybDI6IFwiaHR0cDovL3d3dy5paGFpdHVvLmNuL3h5L2piL3loeHkuaHRtbFwiLFxuICAgICAgdXJsMzogXCJodHRwOi8vd3d3LmloYWl0dW8uY24veHkvamIveXN6Yy5odG1sXCIsXG5cblxuXG4gICAgICBiYW5uZXJBZFVuaXRJZDogXCJ6MXY2anlrdnk5XCIsLy9iYW5uZXLlub/lkYrkvY1pZFxuICAgICAgbmF0aXZlQWRVbml0SWQ6IFwidjVoNXhza2xwMlwiLC8v5bm/5ZGK5L2NaWRcbiAgICAgIGludGVyc3RpdGlhbEFkVW5pdElkOiBcImE3bnZsN2ZtMDBcIiwvL+aPkuWxj+W5v+WRiuS9jWlkXG4gICAgICAvL+S/neWtmOeUqOaIt+S/oeaBr+WvueixoVxuICAgICAgdXNlckRhdGE6IHtcbiAgICAgICAgbG9naW5QaG9uZTogJycsIFxuICAgICAgICB1c2VySWQ6ICcnLFxuICAgICAgICBiYWxhbmNlOiAwLFxuICAgICAgfSxcblxuICAgIH1cblxuICB9XG48L3NjcmlwdD4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vZXhhbXBsZS5qc1wiOiBcIi4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzXCIsXG5cdFwiLi9pbmRleC5qc1wiOiBcIi4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy9pbmRleC5qc1wiLFxuXHRcIi4vdXNlci5qc1wiOiBcIi4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcy91c2VyLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL0NvbW1vbi9oZWxwZXIvYXBpcyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLmpzXCI7IiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vc3JjL0NvbW1vbi9saWJzL3VtZW5nIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhZDovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhZDovUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFwcC1zY3JpcHQtbG9hZGVyLmpzIWQ6L1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSFkOi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIWQ6L3F1aWNrYXBwV29ya3NwYWNlL2NvbS5oYWl0dW8uc2V0cHBsYW5ldC9zcmMvYXBwLnV4XCIpXG5cclxuJGFwcF9kZWZpbmUkKCdAYXBwLWFwcGxpY2F0aW9uL2FwcCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xyXG5cbiAgICAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0O1xuICAgICAgICB9XHJcbn0pXHJcbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1hcHBsaWNhdGlvbi9hcHAnLHtwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4xLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
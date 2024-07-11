(function(){
    
    var $app_define_wrap$ = $app_define_wrap$ || function() {}
    var manifestJson = {"package":"com.haituo.setpplanet","name":"计步星球","versionName":"1.0.7","versionCode":7,"permissions":[{"origin":"*"}],"icon":"/Common/img/logo.png","minPlatformVersion":1050,"features":[{"name":"system.storage"},{"name":"system.fetch"},{"name":"system.network"},{"name":"system.device"},{"name":"system.file"},{"name":"system.sensor"},{"name":"system.cipher"},{"name":"system.prompt"},{"name":"system.webview"},{"name":"service.ad"},{"name":"system.shortcut"},{"name":"system.request"}],"config":{"data":{"umeng_appkey":"667b68fccac2a664de54f5ac"}},"router":{"entry":"Page_MainTab","pages":{"Page_MainTab":{"launchMode":"singleTask","component":"index"},"Page_Tixian":{"component":"index"},"Page_login":{"component":"index"},"Page_about":{"component":"index"},"feedback":{"component":"index"},"logOut":{"component":"index"},"permissions":{"component":"index"},"Page_setPay":{"component":"index"},"Page_cfd":{"component":"index"},"ad/nativeAD":{"component":"index"},"ad/AdBanner":{"component":"index","launchMode":"singleTask"}}},"display":{"pages":{"Page_MainTab":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0},"Page_cfd":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0,"titleBarBackgroundOpacity":0},"Page_Tixian":{"titleBar":true,"menu":true,"titleBarText":"收益"},"Page_login":{"titleBar":true,"menu":false,"titleBarText":"用户登录"}}}}
    var createAppHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/manifest-loader.js?path=d:\\quickappWorkspaceAll\\com.haituo.setpplanet\\src!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/app.ux?uxType=app":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/manifest-loader.js?path=d:\quickappWorkspaceAll\com.haituo.setpplanet\src!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/app.ux?uxType=app ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

__webpack_require__(/*! ./Common/libs/umeng/umenganalysis.es.min */ "./src/Common/libs/umeng/umenganalysis.es.min.js");
module.exports = {
  onCreate() {
    console.info('Application onCreate');
    const hook2global = __webpack_require__.g.__proto__ || __webpack_require__.g;
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
    bannerAdUnitId: "4095f11c8658440b9075da95705d6313",
    nativeAdUnitId: "7efb97d405eb432fa2d4a4f08ef81156",
    interstitialAdUnitId: "572c41d7e93945ca8e9db8150df89aed",
    userData: {
      loginPhone: '',
      userId: '',
      balance: 0
    },
    actiParam: ''
  }
};}

/***/ }),

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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
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

//获取匿名设备标识符，建议只在广告的场景使用
const getOAID = async () => {
  let ret = await _system.default.getAdvertisingId();
  return ret.data.oaid;
};

//执行广告转化上传
const getConvertUpload = async () => {
  _system.default.getAdvertisingId({
    success: function (data) {
      console.log(`handling success广告唯一标识: ${data.advertisingId}`);
      const type = 'jh';
      const deviceNum = data.advertisingId;
      const example = (__webpack_require__(/*! ./apis/example.js */ "./src/Common/helper/apis/example.js")["default"]);
      const userAdConvertUploadReq = {
        deviceId: deviceNum,
        conversionType: 'browse',
        channelValue: ''
      };
      console.log('执行广告转化上传', userAdConvertUploadReq, "type: " + type);
      example.convertUpload(userAdConvertUploadReq, type).then(data => {
        console.log('广告转化上传成功 data: ', data);
      }).catch(err => {
        console.log(err, '失败回调');
      });
    },
    fail: function (code) {
      console.log(`handling fail, code = ${code}`);
    }
  });
};

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
const tablePlaque = adid => {
  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // console.log('用户授权= ', storageFlag);

  // if (!storageFlag) {
  //   console.log('未授权,不加载广告');
  //   return
  // } 

  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告返回');
    return;
  }
  console.info('插屏广告= ', adid);
  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: adid
  });
  interstitialAd.onLoad(() => {
    // 监听广告加载
    console.log('查屏加载成功');
    interstitialAd.show();
    getConvertUpload();
  });
  interstitialAd.onError(err => {
    // 监听广告出错
    console.info('插屏广告onError event emit', err);
  });
  interstitialAd.onClose(res => {
    // 监听广告关闭
    console.info('插屏广告onClose event emit', res);
  });
  // interstitialAd.onClick(() => {
  //   console.log('插屏广告点击了');
  //   // //转化上传
  //   // getConvertUpload()
  // })
};

/**
* banner广告  margin_bot底部缩进    @param isbuttom 是否显示在最底部
*/

let bannerAd;
const showBannerAd = async () => {
  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // if (!storageFlag) {
  //   //未授权，弹出授权询问
  //   console.log('用户授权= ', storageFlag);
  //   console.log('未授权,不加载banner广告');
  //   return
  // }

  let adid = '4095f11c8658440b9075da95705d6313';
  let Provider = $ad.getProvider();
  console.info('广告商:', Provider);
  $prompt.showToast({
    message: `${Provider}广告商`,
    gravity: 'center'
  });
  console.info("banner广告位=" + adid);
  const style = {
    left: 0,
    // banner 广告组件的左上角横坐标
    top: 1430,
    // banner 广告组件的左上角纵坐标
    width: 1080,
    // banner 广告组件的宽度
    Height: 170 // banner 广告组件的高度
  };
  bannerAd = $ad.createBannerAd({
    adUnitId: adid,
    //banner广告位
    style: style
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
  saveHapUri
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
var commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self ? self : {},
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
  umeng_stat_global = Object.getPrototypeOf(__webpack_require__.g) || __webpack_require__.g;
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

/***/ "./src/manifest.json":
/*!***************************!*\
  !*** ./src/manifest.json ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"package":"com.haituo.setpplanet","name":"计步星球","versionName":"1.0.7","versionCode":7,"permissions":[{"origin":"*"}],"icon":"/Common/img/logo.png","minPlatformVersion":1050,"features":[{"name":"system.storage"},{"name":"system.fetch"},{"name":"system.network"},{"name":"system.device"},{"name":"system.file"},{"name":"system.sensor"},{"name":"system.cipher"},{"name":"system.prompt"},{"name":"system.webview"},{"name":"service.ad"},{"name":"system.shortcut"},{"name":"system.request"}],"config":{"data":{"umeng_appkey":"667b68fccac2a664de54f5ac"}},"router":{"entry":"Page_MainTab","pages":{"Page_MainTab":{"launchMode":"singleTask","component":"index"},"Page_Tixian":{"component":"index"},"Page_login":{"component":"index"},"Page_about":{"component":"index"},"feedback":{"component":"index"},"logOut":{"component":"index"},"permissions":{"component":"index"},"Page_setPay":{"component":"index"},"Page_cfd":{"component":"index"},"ad/nativeAD":{"component":"index"},"ad/AdBanner":{"component":"index","launchMode":"singleTask"}}},"display":{"pages":{"Page_MainTab":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0},"Page_cfd":{"titleBar":false,"menu":false,"statusBarImmersive":true,"statusBarBackgroundOpacity":0,"titleBarBackgroundOpacity":0},"Page_Tixian":{"titleBar":true,"menu":true,"titleBarText":"收益"},"Page_login":{"titleBar":true,"menu":false,"titleBarText":"用户登录"}}}}');

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/app.ux?uxType=app ***!
  \*******************************/

var $app_style$ = {}
var $app_script$ = __webpack_require__(/*! !../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/manifest-loader.js?path=d:\quickappWorkspaceAll\com.haituo.setpplanet\src!../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./app.ux?uxType=app */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/manifest-loader.js?path=d:\\quickappWorkspaceAll\\com.haituo.setpplanet\\src!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/app.ux?uxType=app")

$app_define$('@app-application/app', [], function ($app_require$, $app_exports$, $app_module$) {
  
  $app_script$($app_module$, $app_exports$, $app_require$)
  if ($app_exports$.__esModule && $app_exports$.default) {
    $app_module$.exports = $app_exports$.default
  }
  $app_module$.exports.manifest = __webpack_require__(/*! ./manifest.json */ "./src/manifest.json")
  $app_module$.exports.style = { list: [ $app_style$ ] }
  
})
$app_bootstrap$('@app-application/app', { packagerVersion: "1.9.14" })

})();

/******/ })()
;
    };
    if (typeof window === "undefined") {
      return createAppHandler();
    }
    else {
      window.createAppHandler = createAppHandler
      // H5注入manifest以获取features
      global.manifest = manifestJson;
    }
  })();
//# sourceMappingURL=app.js.map
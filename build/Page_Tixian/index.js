(function(){
                        
                        var createPageHandler = function() {
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_Tixian/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_Tixian/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _example = _interopRequireDefault(__webpack_require__(/*! ../Common/helper/apis/example.js */ "./src/Common/helper/apis/example.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = {
  private: {
    rules: `1. 一个账号且一个设备，每日只能提现一次\n2. 提现后1~3个工作日到账\n3. 平台会根据运营能力设置不同的档位额度，具体以提现页面展示为准\n4. 一个账号只能绑1次提现账户,请谨慎使用\n5. 若提现失败，提现金额将返还到您的账户\n6. 为便于您日常提现，请使用本人支付宝账号，绑定中会进行信息校验。`,
    listData: [],
    listshow: false,
    dialog_visible: false,
    dialog_visible2: false,
    showDialog: false,
    dialogData: {},
    userData: {},
    userbalance: 0
  },
  onInit: function (e) {
    $utils.tablePlaque();
  },
  onShow(options) {
    $umeng_stat.resume(this);
    this.getUser();
  },
  onHide() {
    $umeng_stat.pause(this);
  },
  getUser() {
    $apis.user.getUserInfo().then(res => {
      this.userData = res.data;
    });
  },
  changeTabactive: function (e) {
    if (e.index === 0) {
      this.record('REVENUE');
    } else {
      this.record('EXPENDITURE');
    }
  },
  getwithdraw(a, ub) {
    if (this.userData.balance < ub) {
      this.openDialog2();
      return;
    }
    if (!this.userData.loginPhone) {
      this.openLogin();
      return;
    }
    _example.default.withdraw({
      amount: a
    }).then(response => {
      this.withdrawSuucess(response.data.amount);
    }).catch(error => {
      console.error('提现失败:', error);
      try {
        var e = JSON.parse(error);
        var code = e.code;
        var message = e.message;
        switch (code) {
          case '300000':
            this.openDialog3(message);
            break;
          case '400000':
            $prompt.showToast({
              message: ' 提现失败! ' + message,
              gravity: "center"
            });
            break;
          case '310007':
            $prompt.showToast({
              message: ' 提现失败! ' + message,
              gravity: "center"
            });
            this.setPayAccount();
            break;
          case '310004':
            this.openDialog2();
            break;
          default:
            break;
        }
      } catch (e) {
        $prompt.showToast({
          message: '提现失败err:' + e,
          gravity: 'bottom'
        });
      }
    });
  },
  setPayAccount() {
    $router.push({
      uri: 'Page_setPay'
    });
  },
  openLogin() {
    this.dialogData = {
      hading: "提示",
      subheading: "请登录后再使用该功能",
      iconType: "hint",
      cloneBtn: "取 消",
      successBtn: "登录"
    };
    this.showDialog = true;
  },
  successDialog() {
    if (this.dialogData.successBtn === "登录") {
      this.showDialog = false;
      $router.push({
        uri: 'Page_login'
      });
    } else {
      this.showDialog = false;
      $router.back();
    }
  },
  openDialog2() {
    this.dialogData = {
      hading: "提示",
      subheading: "余额不足，请尝试其他额度或继续赚钱",
      iconType: "hint",
      cloneBtn: "换个额度",
      successBtn: "继续赚钱"
    };
    this.showDialog = true;
  },
  openDialog3(message) {
    this.dialogData = {
      hading: "提示",
      subheading: message,
      iconType: "hint",
      cloneBtn: "关闭",
      successBtn: "继续赚钱"
    };
    this.showDialog = true;
  },
  withdrawSuucess(amount) {
    this.dialogData = {
      hading: "提现成功",
      subheading: `成功提现${amount}元`,
      iconType: "success",
      cloneBtn: "关闭",
      successBtn: "继续赚钱"
    };
    this.showDialog = true;
  },
  record(type) {
    _example.default.record({
      type: type
    }).then(response => {
      let data = response.data.records;
      if (data && Array.isArray(data) && data.length > 0) {
        this.listshow = true;
        this.listData = data;
      } else {
        this.listshow = false;
        this.listData = [];
      }
    }).catch(error => {
      console.error('获取失败:', error);
      var message = JSON.parse(error).message;
      $prompt.showToast({
        message: ' 提现失败! ' + message,
        gravity: "center"
      });
    });
  },
  openDialog(b) {
    this.dialog_visible = b;
  },
  bindAffirm() {
    this.dialog_visible2 = false;
  },
  cloneDialog: function () {
    this.showDialog = false;
  }
};
var accessors = ['public', 'protected', 'private'];
var moduleOwn = exports.default || module.exports;
var accessor = accessors.some(function (acc) {
    return moduleOwn[acc];
});
if (moduleOwn.data && accessor) {
    throw new Error(
        'For VM objects, attribute data must not coexist with public, protected, or private. Please replace data with public.'
    );
} else if (!moduleOwn.data) {
    moduleOwn._descriptor = {};
    moduleOwn.data = {};
    accessors.forEach(function (acc) {
        var accessType = typeof moduleOwn[acc];
        if (accessType === 'object') {
            moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
            for (var name in moduleOwn[acc]) {
                moduleOwn._descriptor[name] = { access: acc };
            }
        } else if (accessType === 'function') {
            console.warn(
                'For VM objects, attribute ' + acc + ' value must not be a function. Change the value to an object.'
            );
        }
    });
}
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/dialogBox/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/dialogBox/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

module.exports = {
  data: {
    dialogData: {},
    iconData: {
      success: '../Common/img/success.png',
      hint: '../Common/img/icon_ts.png',
      warn: "../Common/img/icon_ts.png"
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: {}
    }
  },
  clickSuccess: function () {
    console.log('点击成功按钮');
    this.$emit('emitSuccess');
  },
  closeBtn: function () {
    console.log('点击关闭');
    this.$emit('emitClone');
  }
};
var accessors = ['public', 'protected', 'private'];
var moduleOwn = exports.default || module.exports;
var accessor = accessors.some(function (acc) {
    return moduleOwn[acc];
});
if (moduleOwn.data && accessor) {
    throw new Error(
        'For VM objects, attribute data must not coexist with public, protected, or private. Please replace data with public.'
    );
} else if (!moduleOwn.data) {
    moduleOwn._descriptor = {};
    moduleOwn.data = {};
    accessors.forEach(function (acc) {
        var accessType = typeof moduleOwn[acc];
        if (accessType === 'object') {
            moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
            for (var name in moduleOwn[acc]) {
                moduleOwn._descriptor[name] = { access: acc };
            }
        } else if (accessType === 'function') {
            console.warn(
                'For VM objects, attribute ' + acc + ' value must not be a function. Change the value to an object.'
            );
        }
    });
}
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_Tixian\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_Tixian\\index.ux!./src/Page_Tixian/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_Tixian\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_Tixian\index.ux!./src/Page_Tixian/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".mask": {
    "position": "fixed",
    "flex": 1,
    "top": "0px",
    "bottom": "0px",
    "width": "100%",
    "justifyContent": "center",
    "alignItems": "flex-start",
    "backgroundColor": "rgba(5,5,5,0.6)"
  },
  ".mask .dialog": {
    "flexDirection": "column",
    "backgroundColor": "#ffffff",
    "borderRadius": "32px",
    "marginTop": "60px",
    "paddingTop": "26px",
    "paddingRight": "26px",
    "paddingBottom": "26px",
    "paddingLeft": "26px",
    "width": "84%"
  },
  ".mask .dialog-border": {
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#e7e7e7",
    "borderRightColor": "#e7e7e7",
    "borderBottomColor": "#e7e7e7",
    "borderLeftColor": "#e7e7e7"
  },
  ".mask .dialog .box": {
    "flexDirection": "column"
  },
  ".mask .dialog .box .top": {
    "width": "100%",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "15px",
    "paddingLeft": "10px",
    "justifyContent": "space-between"
  },
  ".mask .dialog .box .top .title": {
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "32px",
    "fontWeight": "bold",
    "width": "100%"
  },
  ".mask .dialog .box .content": {
    "paddingTop": "30px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px",
    "fontSize": "24px",
    "marginBottom": "50px",
    "color": "#828282",
    "textAlign": "center"
  },
  ".mask .dialog .btn": {
    "marginTop": "50px"
  },
  ".mask .dialog .btn .btnbox text": {
    "width": "100%",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "32px",
    "backgroundColor": "#00b2ff",
    "color": "#ffffff"
  },
  ".mask .dialog .btn .btnbox1": {
    "flex": 1
  },
  ".mask .dialog .btn .btnbox1 text": {
    "width": "100%",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "32px",
    "backgroundColor": "#00b2ff",
    "color": "#ffffff"
  },
  ".mask .dialog .btn .btnbox2": {
    "flex": 1
  },
  ".mask .dialog .btn .btnbox2 text": {
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#e9e9e9",
    "borderRightColor": "#e9e9e9",
    "borderBottomColor": "#e9e9e9",
    "borderLeftColor": "#e9e9e9",
    "width": "270px",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "28px",
    "backgroundColor": "#ffffff",
    "color": "#666666"
  },
  ".container": {
    "flexDirection": "column",
    "paddingTop": "27px",
    "paddingRight": "27px",
    "paddingBottom": "27px",
    "paddingLeft": "27px",
    "backgroundColor": "#f5f5f5"
  },
  ".group": {
    "height": "162px",
    "width": "100%",
    "backgroundImage": "/Common/img/group.png"
  },
  ".topview": {
    "flexDirection": "column",
    "height": "240px",
    "width": "702px",
    "borderRadius": "20px",
    "backgroundColor": "#ffffff"
  },
  ".midview": {
    "flexDirection": "column",
    "justifyContent": "center",
    "width": "702px",
    "borderRadius": "20px",
    "marginTop": "27px",
    "paddingTop": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "22px",
    "paddingRight": "22px",
    "backgroundColor": "#ffffff"
  },
  ".btmview": {
    "flexDirection": "column",
    "width": "702px",
    "height": "50%",
    "borderRadius": "20px",
    "marginTop": "27px",
    "paddingTop": "20px",
    "paddingBottom": "20px",
    "paddingLeft": "22px",
    "paddingRight": "22px",
    "backgroundColor": "#ffffff"
  },
  ".grid-item": {
    "justifyContent": "center",
    "width": "310px",
    "height": "124px",
    "borderRadius": "20px",
    "marginTop": "8px",
    "marginRight": "8px",
    "marginBottom": "8px",
    "marginLeft": "8px",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eb6352",
    "borderRightColor": "#eb6352",
    "borderBottomColor": "#eb6352",
    "borderLeftColor": "#eb6352"
  },
  ".top-left": {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "color": "#ffffff",
    "fontSize": "20px",
    "paddingLeft": "18px",
    "paddingRight": "18px",
    "paddingTop": "8px",
    "paddingBottom": "8px",
    "backgroundColor": "#eb6352",
    "borderTopLeftRadius": "20px",
    "borderBottomRightRadius": "20px"
  },
  ".grid-item-text": {
    "height": "50px",
    "marginTop": "45px"
  },
  ".tabs": {
    "flex": 1
  },
  ".tab-content": {
    "flex": 1
  },
  ".tab-bar": {
    "height": "100px",
    "borderTopColor": "#bbbbbb",
    "borderRightColor": "#bbbbbb",
    "borderBottomColor": "#bbbbbb",
    "borderLeftColor": "#bbbbbb",
    "color": "#bbbbbb"
  },
  ".tab-text": {
    "textAlign": "center",
    "color": "#828282",
    "fontSize": "31px",
    "paddingBottom": "6px",
    "color:active": "#000000",
    "borderBottomWidth:active": "4px",
    "borderBottomColor:active": "#95ff37",
    "fontWeight:active": "bold"
  },
  ".item-container": {
    "paddingTop": "30px",
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "flexDirection": "column"
  },
  ".item-content": {
    "flexDirection": "column",
    "paddingBottom": "30px"
  },
  ".item-title": {
    "paddingTop": "50px",
    "paddingBottom": "20px",
    "color": "#aaaaaa"
  },
  ".list": {
    "layoutType": "stagger"
  },
  ".list-item": {
    "backgroundColor": "#ffffff",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": "18px",
    "paddingRight": "18px",
    "paddingTop": "25px",
    "paddingBottom": "25px",
    "width": "100%",
    "borderBottomWidth": "2px",
    "borderBottomColor": "#e7e7e7"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\dialogBox\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\dialogBox\\index.ux!./src/dialogBox/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\dialogBox\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\dialogBox\index.ux!./src/dialogBox/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".dialog-page": {
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.5)",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "column",
    "position": "fixed",
    "top": "0px",
    "left": "0px"
  },
  ".dialog-page .big-content": {
    "width": "600px",
    "height": "1000px",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".dialog-page .big-content .icon-box": {
    "zIndex": 999,
    "top": "-460px"
  },
  ".dialog-page .big-content .icon-box .icon": {
    "width": "120px",
    "height": "120px",
    "zIndex": 999
  },
  ".dialog-page .content": {
    "width": "600px",
    "height": "394px",
    "backgroundColor": "#ffffff",
    "borderRadius": "32px",
    "flexDirection": "column",
    "alignItems": "center",
    "zIndex": 10
  },
  ".dialog-page .content .hading": {
    "marginTop": "94px"
  },
  ".dialog-page .content .hading .txt": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#1a1a1a",
    "lineHeight": "44px"
  },
  ".dialog-page .content .subheading": {
    "paddingTop": "0px",
    "paddingRight": "50px",
    "paddingBottom": "0px",
    "paddingLeft": "50px"
  },
  ".dialog-page .content .subheading .txt": {
    "textAlign": "center",
    "marginTop": "16px",
    "fontSize": "28px",
    "fontWeight": "400",
    "color": "#333333"
  },
  ".dialog-page .content .btnList": {
    "position": "absolute",
    "bottom": "20px",
    "justifyContent": "space-between"
  },
  ".dialog-page .content .btnList .close-btn": {
    "width": "250px",
    "height": "88px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#e9e9e9",
    "borderRightColor": "#e9e9e9",
    "borderBottomColor": "#e9e9e9",
    "borderLeftColor": "#e9e9e9",
    "borderRadius": "16px",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".dialog-page .content .btnList .close-btn .txt": {
    "fontSize": "28px",
    "fontWeight": "400",
    "color": "#666666"
  },
  ".dialog-page .content .btnList .success-btn": {
    "width": "250px",
    "height": "88px",
    "backgroundColor": "#00B2FF",
    "borderRadius": "16px",
    "justifyContent": "center",
    "alignItems": "center",
    "marginLeft": "20px"
  },
  ".dialog-page .content .btnList .success-btn .txt": {
    "fontSize": "28px",
    "fontWeight": "600",
    "color": "#ffffff",
    "lineHeight": "40px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_Tixian/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_Tixian/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "topview"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "group"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "当前余额"
              },
              "style": {
                "position": "absolute",
                "top": "20px",
                "left": "30px",
                "color": "#ffffff"
              }
            },
            {
              "type": "div",
              "attr": {},
              "style": {
                "position": "absolute",
                "bottom": "20px",
                "left": "30px",
                "alignItems": "flex-end"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.userData.balance)}
                  },
                  "style": {
                    "color": "#ffffff",
                    "fontSize": "80px",
                    "fontWeight": "bold"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "元"
                  },
                  "style": {
                    "color": "#ffffff",
                    "fontSize": "32px",
                    "marginLeft": "10px",
                    "marginBottom": "12px"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "events": {
                "click": function(evt){this.openDialog(true,evt)}
              },
              "style": {
                "borderRadius": "68px",
                "paddingLeft": "18px",
                "paddingRight": "18px",
                "paddingTop": "10px",
                "paddingBottom": "10px",
                "position": "absolute",
                "bottom": "30px",
                "right": "30px",
                "backgroundColor": "#ffffff"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "规则说明"
                  },
                  "style": {
                    "color": "#e75846",
                    "fontSize": "20px",
                    "fontWeight": "bold"
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "alignItems": "center",
            "position": "absolute",
            "bottom": "12px",
            "left": "30px"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "提现方式："
              },
              "style": {
                "color": "#828282",
                "fontSize": "24px"
              }
            },
            {
              "type": "image",
              "attr": {
                "src": "/Common/img/icon_pay.png"
              },
              "style": {
                "width": "24px",
                "height": "24px"
              }
            },
            {
              "type": "text",
              "attr": {
                "value": "支付宝提现"
              },
              "style": {
                "color": "#828282",
                "fontSize": "24px",
                "marginLeft": "5px"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "midview"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": {
            "width": "130px",
            "height": "45px",
            "alignItems": "flex-end",
            "marginBottom": "15px"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "width": "130px",
                "height": "28px",
                "background": "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"90deg\"],\"values\":[\"#e9fd65\",\"#95ff37 100%\"]}]}",
                "position": "absolute",
                "borderRadius": "58px"
              }
            },
            {
              "type": "text",
              "attr": {
                "value": "提现金额"
              },
              "style": {
                "width": "125px",
                "height": "42px",
                "fontSize": "31px",
                "fontWeight": "bold",
                "position": "absolute",
                "color": "#000000",
                "marginLeft": "3px"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "backgroundColor": "#ffffff",
            "flexWrap": "wrap",
            "justifyContent": "space-between"
          },
          "children": [
            {
              "type": "div",
              "attr": {
                "id": "tx1"
              },
              "id": "tx1",
              "classList": [
                "grid-item"
              ],
              "events": {
                "click": function(evt){this.getwithdraw('AMOUNT_10',0.1,evt)}
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "每日提现"
                  },
                  "classList": [
                    "top-left"
                  ]
                },
                {
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common//img/icon_gold.png"
                      },
                      "style": {
                        "width": "40px",
                        "height": "40px"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "0.1"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "45px",
                        "fontWeight": "bold"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "元"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "20px"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {
                "id": "tx2"
              },
              "id": "tx2",
              "classList": [
                "grid-item"
              ],
              "events": {
                "click": function(evt){this.getwithdraw('AMOUNT_100',1,evt)}
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "仅一次"
                  },
                  "classList": [
                    "top-left"
                  ]
                },
                {
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common//img/icon_gold.png"
                      },
                      "style": {
                        "width": "40px",
                        "height": "40px"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "1"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "45px",
                        "fontWeight": "bold"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "元"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "20px"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {
                "id": "tx3"
              },
              "id": "tx3",
              "classList": [
                "grid-item"
              ],
              "events": {
                "click": function(evt){this.getwithdraw('AMOUNT_5000',50,evt)}
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "每日提现"
                  },
                  "classList": [
                    "top-left"
                  ]
                },
                {
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/icon_gold.png"
                      },
                      "style": {
                        "width": "40px",
                        "height": "40px"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "50"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "45px",
                        "fontWeight": "bold"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "元"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "20px"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {
                "id": "tx4"
              },
              "id": "tx4",
              "classList": [
                "grid-item"
              ],
              "events": {
                "click": function(evt){this.getwithdraw('AMOUNT_10000',100,evt)}
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "仅一次"
                  },
                  "classList": [
                    "top-left"
                  ]
                },
                {
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/icon_gold.png"
                      },
                      "style": {
                        "width": "40px",
                        "height": "40px"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "100"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "45px",
                        "fontWeight": "bold"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "元"
                      },
                      "style": {
                        "color": "#000000",
                        "fontSize": "20px"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btmview"
      ],
      "children": [
        {
          "type": "tabs",
          "attr": {},
          "classList": [
            "tabs"
          ],
          "events": {
            "change": "changeTabactive"
          },
          "children": [
            {
              "type": "tab-bar",
              "attr": {},
              "classList": [
                "tab-bar"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "收益记录"
                  },
                  "classList": [
                    "tab-text"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "提现记录"
                  },
                  "classList": [
                    "tab-text"
                  ]
                }
              ]
            },
            {
              "type": "tab-content",
              "attr": {
                "scrollable": function () {return (this.scrollable)}
              },
              "shown": function () {return (this.listshow)},
              "classList": [
                "tab-content"
              ],
              "children": [
                {
                  "type": "list",
                  "attr": {},
                  "classList": [
                    "list"
                  ],
                  "children": [
                    {
                      "type": "list-item",
                      "attr": {
                        "type": "listItem"
                      },
                      "repeat": function () {return (this.listData)},
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "list-item"
                          ],
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "style": {
                                "flexDirection": "column"
                              },
                              "children": [
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return (this.$item.title)}
                                  },
                                  "style": {
                                    "marginBottom": "9px",
                                    "fontSize": "28px",
                                    "color": "#000000",
                                    "fontWeight": "bold"
                                  }
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return (this.$item.createdDt)}
                                  },
                                  "style": {
                                    "fontSize": "24px",
                                    "color": "#828282"
                                  }
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return '+'+((this.$item.amount))+'元'}
                              },
                              "style": {
                                "height": "50px",
                                "borderRadius": "96px",
                                "backgroundColor": "#eb6352",
                                "fontSize": "26px",
                                "color": "#ffffff",
                                "paddingLeft": "22px",
                                "paddingRight": "22px",
                                "paddingTop": "1px",
                                "paddingBottom": "1px"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "list",
                  "attr": {},
                  "classList": [
                    "list"
                  ],
                  "children": [
                    {
                      "type": "list-item",
                      "attr": {
                        "type": "listItem"
                      },
                      "repeat": function () {return (this.listData)},
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "list-item"
                          ],
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "style": {
                                "flexDirection": "column"
                              },
                              "children": [
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return (this.$item.title)}
                                  },
                                  "style": {
                                    "marginBottom": "9px",
                                    "fontSize": "28px",
                                    "color": "#000000",
                                    "fontWeight": "bold"
                                  }
                                },
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return (this.$item.createdDt)}
                                  },
                                  "style": {
                                    "fontSize": "24px",
                                    "color": "#828282"
                                  }
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return ((this.$item.amount))+'元'}
                              },
                              "style": {
                                "width": "140px",
                                "height": "50px",
                                "borderRadius": "96px",
                                "backgroundColor": "#eb6352",
                                "fontSize": "26px",
                                "color": "#ffffff",
                                "paddingLeft": "22px",
                                "paddingRight": "22px",
                                "paddingTop": "1px",
                                "paddingBottom": "1px"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "暂无相关记录"
          },
          "shown": function () {return (!this.listshow)},
          "style": {
            "fontSize": "32px",
            "textAlign": "center",
            "flex": 10
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "mask"
      ],
      "shown": function () {return (this.dialog_visible)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "dialog"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "box"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "top"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "规则说明"
                      },
                      "classList": [
                        "title"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "content"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.rules)}
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "btn"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "btnbox"
                      ],
                      "events": {
                        "click": function(evt){this.openDialog(false,evt)}
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": "我已知晓"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "dialog-box",
      "attr": {
        "showDialog": function () {return (this.showDialog)},
        "dialogData": function () {return (this.dialogData)}
      },
      "events": {
        "emit-success": "successDialog",
        "emit-clone": "cloneDialog"
      }
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/dialogBox/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/dialogBox/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {
    "show": function () {return (this.showDialog)}
  },
  "classList": [
    "dialog-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "big-content"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "content"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "hading"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.dialogData.hading)}
                  },
                  "classList": [
                    "txt"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "subheading"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.dialogData.subheading)}
                  },
                  "classList": [
                    "txt"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "btnList"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "close-btn"
                  ],
                  "events": {
                    "click": "closeBtn"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.dialogData.cloneBtn)}
                      },
                      "classList": [
                        "txt"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "success-btn"
                  ],
                  "events": {
                    "click": "clickSuccess"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.dialogData.successBtn)}
                      },
                      "classList": [
                        "txt"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {
            "show": function () {return (this.showDialog)}
          },
          "classList": [
            "icon-box"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return (this.iconData[this.dialogData.iconType])}
              },
              "classList": [
                "icon"
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/dialogBox/index.ux?name=dialog-box":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/dialogBox/index.ux?name=dialog-box ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=dialog-box!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/dialogBox/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\dialogBox\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\dialogBox\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\dialogBox\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\dialogBox\\index.ux!./src/dialogBox/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/dialogBox/index.ux")

$app_define$('@app-component/dialog-box', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/Page_Tixian/index.ux ***!
  \**********************************/
__webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../dialogBox/index.ux?name=dialog-box */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/dialogBox/index.ux?name=dialog-box")
var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=dialog-box!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=dialog-box!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_Tixian/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_Tixian\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_Tixian\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_Tixian\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_Tixian\\index.ux!./src/Page_Tixian/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_Tixian/index.ux")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/index',{ packagerName:'fa-toolkit', packagerVersion: '14.1.1-Stable.300'})
})();

/******/ })()
;   };
                        if (typeof window === "undefined") {
                            return createPageHandler();
                        }
                        else {
                            window.createPageHandler = createPageHandler
                        }
                    })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfVGl4aWFuXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMvd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX1RpeGlhbi9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX1RpeGlhblxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9kaWFsb2dCb3gvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcZGlhbG9nQm94XFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9UaXhpYW4vaW5kZXgudXg/MDg3YiIsIndlYnBhY2s6Ly8vLi9zcmMvZGlhbG9nQm94L2luZGV4LnV4P2M0YjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfVGl4aWFuL2luZGV4LnV4P2Y5NjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RpYWxvZ0JveC9pbmRleC51eD82MjVkIiwid2VicGFjazovLy8uL3NyYy9kaWFsb2dCb3gvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX1RpeGlhbi9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfc3lzdGVtID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmZldGNoXCIpKTtcbnZhciBfc3lzdGVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5zdG9yYWdlXCIpKTtcbnZhciBfc3lzdGVtMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5kZXZpY2VcIikpO1xudmFyIF9zeXN0ZW00ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnByb21wdFwiKSk7XG52YXIgX3N5c3RlbTUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ucm91dGVyXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsga2V5ID0gX3RvUHJvcGVydHlLZXkoa2V5KTsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuY29uc3QgZ2V0VXNlcklkID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgdXNlcklkID0gYXdhaXQgX3N5c3RlbTMuZGVmYXVsdC5nZXRVc2VySWQoKTtcbiAgcmV0dXJuIHVzZXJJZC5kYXRhLnVzZXJJZDtcbn07XG5jb25zdCBxdWl0ID0gKCkgPT4ge1xuICBfc3lzdGVtNC5kZWZhdWx0LnNob3dEaWFsb2coe1xuICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICBtZXNzYWdlOiBcIuaCqOW3suazqOmUgOi0puWPtyzor7fpgIDlh7rjgIJcIixcbiAgICBidXR0b25zOiBbe1xuICAgICAgdGV4dDogJ+mAgOWHuicsXG4gICAgICBjb2xvcjogJyMzMzMzMzMnXG4gICAgfV0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIF9zeXN0ZW01LmRlZmF1bHQucHVzaCh7XG4gICAgICAgIHVyaTogXCJQYWdlX2xvZ2luXCJcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNhbmNlbFwiKTtcbiAgICB9XG4gIH0pO1xufTtcbmNvbnN0IGdldFRva2VuRGF0YSA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBleGFtcGxlID0gcmVxdWlyZSgnLi9hcGlzL2V4YW1wbGUuanMnKS5kZWZhdWx0O1xuICAgIGNvbnN0IGRldmljZU51bSA9IGF3YWl0IGdldFVzZXJJZCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKGBnZXRUb2tlbkRhdGEoKS0tLS0+ZGV2aWNlTnVtPSR7ZGV2aWNlTnVtfWApO1xuICAgIC8vIGNvbnNvbGUubG9nKCfmmK/lkKbop6blj5HnmoTov5nph4wnKTtcbiAgICBleGFtcGxlLnRvTG9naW4oe1xuICAgICAgbG9naW5UeXBlOiBcIkRFVklDRVwiLFxuICAgICAgYXBwSWQ6ICdTQ18wMDAxJyxcbiAgICAgIGRldmljZU51bSxcbiAgICAgIGxvZ2luQWNjb3VudDogZGV2aWNlTnVtXG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCfotbDnmoTmiJDlip/lm57osIMnKTtcbiAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+Wksei0peWbnuiwgycpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKEpTT04ucGFyc2UoZXJyKS5jb2RlID09PSAnMzEwMDAxJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfov5vmnaXkuoYnKTtcbiAgICAgICAgICBxdWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCAn5p+l55yL6I635Y+W5oql6ZSZJyk7XG4gICAgICB9XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59O1xubGV0IGlzUmVmcmVzaGluZyA9IGZhbHNlOyAvLyDmmK/lkKbmraPlnKjor7fmsYLliLfmlrB0b2tlbueahOaOpeWPo1xuY29uc3QgcmVmcmVzaFN1YnNjcmliZXJzID0gW107IC8vIOWtmOWCqOivt+axgueahOaVsOe7hFxuY29uc3Qgc3Vic2NyaWJlVG9rZW5SZWZyZXNoID0gY2IgPT4ge1xuICAvLyDlsIbmiYDmnInnmoTor7fmsYLpg71wdXNo5Yiw5pWw57uE5LitLOWFtuWunuaVsOe7hOaYr1tmdW5jdGlvbih0b2tlbil7fSwgZnVuY3Rpb24odG9rZW4pe30sLi4uXVxuICByZWZyZXNoU3Vic2NyaWJlcnMucHVzaChjYik7XG59O1xuY29uc3Qgb25ScmVmcmVzaGVkID0gdG9rZW4gPT4ge1xuICAvLyDmlbDnu4TkuK3nmoTor7fmsYLlvpfliLDmlrDnmoR0b2tlbuS5i+WQjuiHquaJp+ihjO+8jOeUqOaWsOeahHRva2Vu5Y676K+35rGC5pWw5o2uXG4gIHJlZnJlc2hTdWJzY3JpYmVycy5tYXAoY2IgPT4gY2IodG9rZW4pKTtcbn07XG5jb25zdCBpc0FjY2Vzc1Rva2VuRXhwaXJlZCA9IGF1dGhEYXRhID0+IHtcbiAgLy8g5Yik5pat5b2T5YmNdG9rZW7mmK/lkKbov4fmnJ9cbiAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gYXV0aERhdGEuZXhwaXJlQXQgPiAxMDAwMCAqIDYwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbmNvbnN0IHJlcXVlc3QgPSBvcHRpb25zID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVycyA9IHt9XG4gICAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgYXV0aERhdGEgPSAoYXdhaXQgX3N5c3RlbTIuZGVmYXVsdC5nZXQoe1xuICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgIH0pKSB8fCB7fTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF1dGhEYXRhLmRhdGEgPyBKU09OLnBhcnNlKGF1dGhEYXRhLmRhdGEpLmFjY2Vzc1Rva2VuIDogJyc7XG4gICAgaWYgKGlzQWNjZXNzVG9rZW5FeHBpcmVkKGF1dGhEYXRhKSB8fCAhYWNjZXNzVG9rZW4pIHtcbiAgICAgIGlmICghb3B0aW9ucy51cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikpIHtcbiAgICAgICAgaWYgKCFpc1JlZnJlc2hpbmcpIHtcbiAgICAgICAgICBpc1JlZnJlc2hpbmcgPSB0cnVlO1xuICAgICAgICAgIGdldFRva2VuRGF0YSgpLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICAgIGlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHJlcy5kYXRhLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgICBhd2FpdCBfc3lzdGVtMi5kZWZhdWx0LnNldCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkFVVEhfVE9LRU5fREFUQVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXMuZGF0YS5hY2Nlc3NUb2tlbicsIHJlcy5kYXRhLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgICAgICAgb25ScmVmcmVzaGVkKHJlcy5kYXRhLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJldHJ5ID0gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgICAgICAgIHN1YnNjcmliZVRva2VuUmVmcmVzaCh0b2tlbiA9PiB7XG4gICAgICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0b2tlbjsgLy8g55So5pyA5pawdG9rZW7or7fmsYLmlbDmja5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXRyeTtcbiAgICAgIH1cbiAgICB9XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYWNjZXNzVG9rZW4gfHwgJyc7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmZldGNoKHtcbiAgICAgIC8vIHVybDogJ2h0dHBzOi8vdGVzdC5pcGFuZGF0YS5jb20nICsgdXJsLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaWhhaXR1by5jbicgKyB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sIGhlYWRlcnMpLFxuICAgICAgLy8gc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gICBjb25zdCBkYXRhID0gcmVzLmRhdGFcbiAgICAgIC8vICAgaWYgKGRhdGEuY29kZSA9PT0gXCIwMDAwMDBcIiB8fCBKU09OLnBhcnNlKGRhdGEpLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgIC8vICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IHJlcy5kYXRhIDogSlNPTi5wYXJzZShyZXMuZGF0YSkpO1xuICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgLy8gICAgIGlmIChkYXRhLmNvZGUgPT09IFwiMzAwMDAyXCIpIHtcbiAgICAgIC8vICAgICAgICRzdG9yYWdlLmRlbGV0ZSh7XG4gICAgICAvLyAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgIC8vICAgICAgIH0pXG4gICAgICAvLyAgICAgICByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAvLyAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAvLyAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICByZWplY3QocmVzLmRhdGEpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcblxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YTtcblxuICAgICAgICAgIC8vIOWwneivleino+aekCBKU09OIOaVsOaNru+8jOWmguaenOino+aekOWksei0pe+8jOWImeS8muaKm+WHuumUmeivr1xuICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcbiAgICAgICAgICBpZiAocGFyc2VkRGF0YS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAgICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IGRhdGEgOiBwYXJzZWREYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhcnNlZERhdGEuY29kZSA9PT0gXCIzMDAwMDJcIikge1xuICAgICAgICAgICAgICBfc3lzdGVtMi5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiwgZSk7XG5cbiAgICAgICAgICAvLyDmo4Dmn6XmmK/lkKbov5Tlm57nmoTmmK8gSFRNTO+8jOiAjOS4jeaYryBKU09OXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZGF0YSA9PT0gJ3N0cmluZycgJiYgcmVzLmRhdGEuc3RhcnRzV2l0aCgnPGh0bWw+JykpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlNlcnZlciByZXR1cm5lZCBhbiBIVE1MIHBhZ2UgaW5zdGVhZCBvZiBKU09OLiBQb3NzaWJsZSBpbmNvcnJlY3QgVVJMIG9yIHNlcnZlciBlcnJvci5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge31cbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfYWpheCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FqYXguanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IHRvTG9naW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL2xvZ2luYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5LiK5Lyg5q2l5pWwXG5jb25zdCB1cGxvYWRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL3VwbG9hZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vLyDojrflj5bmraXmlbBcbmNvbnN0IGdldHN0ZXBzID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zY2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOiOt+WPluacgOi/kTMw5aSp6K6w5b2VXG5jb25zdCBnZXRzdGVwc2xpc3QgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy9saXN0YFxuICB9KTtcbn07XG5cbi8v5o+Q546wXG5jb25zdCB3aXRoZHJhdyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvd2l0aGRyYXdgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+eUqOaIt+S9memineiusOW9lVxuY29uc3QgcmVjb3JkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL2Nhc2gvcmVjb3JkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5blub/lkYrlrozmiJDmrKHmlbBcbmNvbnN0IGdldEFkQ291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbXBsZXRlL2NvdW50YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/lub/lkYrlrozmiJBcbmNvbnN0IGNvbXBsZXRlQWQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQLeWKoOWvhlxuY29uc3QgY29tcGxldGVBZFJTQSA9IGFzeW5jIGRhdGEgPT4ge1xuICBsZXQgdGltZXN0YW1wID0gK25ldyBEYXRlKCk7XG4gIGRhdGEudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICBsZXQgX2RhdGEgPSBhd2FpdCAkdXRpbHMuZGF0YUVuY3J5cHRpb24oZGF0YSk7XG4gIGxldCBwYXJhbSA9IHtcbiAgICBkYXRhOiBfZGF0YVxuICB9O1xuICBjb25zb2xlLmxvZygn5Lu75Yqh5Yqg5a+GJywgcGFyYW0pO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2ZpbmlzaGAsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gIH0pO1xufTtcblxuLy/lub/lkYrovazljJbkuIrkvKAgICB0eXBlOuW5v+WRiua4oOmBk+exu+Weizogamgo6bK46bi/KSwga3Mo5b+r5omLKSwgamwo5beo6YePKSwgLOWPr+eUqOWAvDpqaCxrcyxqbFxuY29uc3QgY29udmVydFVwbG9hZCA9IGRhdGEgPT4ge1xuICBjb25zb2xlLmxvZygnZGF0YT0gJywgZGF0YSwgYHVybD0gL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHtkYXRhLnR5cGV9YCk7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHtkYXRhLnR5cGV9YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5bmiYvlir/ov5Tlm57phY3nva7kv6Hmga9cbmNvbnN0IGJvbGNrUmV0dXJuID0gKCkgPT4ge1xuICBsZXQgYnJhbmQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYnJhbmQ7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9jbGlja0NvbnRyb2wvcmV0dXJuL2luZm8vJHticmFuZH1gXG4gIH0pO1xufTtcblxuLyoqXHJcbiAqIOiOt+WPlumhtemdoumAj+aYjuWxgumFjee9ruS/oeaBryAgXHJcbiAqXHJcbiAqL1xuXG5jb25zdCBzaG93VGNsYXllciA9IGRhdGEgPT4ge1xuICBsZXQgYnJhbmQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYnJhbmQ7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9jbGlja0NvbnRyb2wvdHJhbnNwYXJlbnRMYXllci9pbmZvLyR7YnJhbmR9YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLyoqXHJcbiAqIOiOt+WPluaYr+WQpuiHquWKqOW8ueeqlyAgXHJcbiAqXHJcbiAqL1xuXG5jb25zdCBwb3BVcHMgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9hdXRvL3BvcFVwc2BcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0ge1xuICB0b0xvZ2luLFxuICB1cGxvYWRzdGVwcyxcbiAgZ2V0c3RlcHMsXG4gIGdldHN0ZXBzbGlzdCxcbiAgd2l0aGRyYXcsXG4gIHJlY29yZCxcbiAgZ2V0QWRDb3VudCxcbiAgY29tcGxldGVBZCxcbiAgY29tcGxldGVBZFJTQSxcbiAgY29udmVydFVwbG9hZCxcbiAgYm9sY2tSZXR1cm4sXG4gIHNob3dUY2xheWVyLFxuICBwb3BVcHNcbn07IiwiPGltcG9ydCBuYW1lPVwiZGlhbG9nLWJveFwiIHNyYz1cIi4uL2RpYWxvZ0JveFwiPjwvaW1wb3J0PlxyXG48dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvcHZpZXdcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwXCI+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMjBweDsgbGVmdDogMzBweDsgY29sb3I6ICNmZmZcIj7lvZPliY3kvZnpop08L3RleHQ+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMjBweDsgbGVmdDogMzBweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDgwcHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+e3t1c2VyRGF0YS5iYWxhbmNlfX08L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDMycHg7IG1hcmdpbi1sZWZ0OiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxMnB4XCI+5YWDPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgb25jbGljaz1cIm9wZW5EaWFsb2codHJ1ZSlcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDY4cHg7IHBhZGRpbmctbGVmdDogMThweDsgcGFkZGluZy1yaWdodDogMThweDsgcGFkZGluZy10b3A6IDEwcHg7IHBhZGRpbmctYm90dG9tOiAxMHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMzBweDsgcmlnaHQ6IDMwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmZcIj48dGV4dCBzdHlsZT1cImNvbG9yOiAjZTc1ODQ2OyBmb250LXNpemU6IDIwcHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+6KeE5YiZ6K+05piOPC90ZXh0PjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyOyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMTJweDsgbGVmdDogMzBweFwiPlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICM4MjgyODI7IGZvbnQtc2l6ZTogMjRweFwiPuaPkOeOsOaWueW8j++8mjwvdGV4dD5cclxuICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl9wYXkucG5nXCIgLz5cclxuICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjODI4MjgyOyBmb250LXNpemU6IDI0cHg7IG1hcmdpbi1sZWZ0OiA1cHhcIj7mlK/ku5jlrp3mj5DnjrA8L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm1pZHZpZXdcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMzBweDsgaGVpZ2h0OiA0NXB4OyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IG1hcmdpbi1ib3R0b206IDE1cHhcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEzMHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTI1cHg7IGhlaWdodDogNDJweDsgZm9udC1zaXplOiAzMXB4OyBmb250LXdlaWdodDogYm9sZDsgcG9zaXRpb246IGFic29sdXRlOyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IDNweFwiPuaPkOeOsOmHkeminTwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgZmxleC13cmFwOiB3cmFwOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW5cIj5cclxuICAgICAgICA8ZGl2IGlkPVwidHgxXCIgY2xhc3M9XCJncmlkLWl0ZW1cIiBvbmNsaWNrPVwiZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMCcsMC4xKVwiPlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0b3AtbGVmdFwiPuavj+aXpeaPkOeOsDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZ3JpZC1pdGVtLXRleHRcIj5cclxuICAgICAgICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDQwcHg7IGhlaWdodDogNDBweFwiIHNyYz1cIi9Db21tb24vL2ltZy9pY29uX2dvbGQucG5nXCIgLz5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzAwMDsgZm9udC1zaXplOiA0NXB4OyBmb250LXdlaWdodDogYm9sZFwiPjAuMTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzAwMDsgZm9udC1zaXplOiAyMHB4XCI+5YWDPC9zcGFuPlxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ0eDJcIiBjbGFzcz1cImdyaWQtaXRlbVwiIG9uY2xpY2s9XCJnZXR3aXRoZHJhdygnQU1PVU5UXzEwMCcsMSlcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidG9wLWxlZnRcIj7ku4XkuIDmrKE8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImdyaWQtaXRlbS10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBzdHlsZT1cIndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHhcIiBzcmM9XCIvQ29tbW9uLy9pbWcvaWNvbl9nb2xkLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogNDVweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj4xPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwOyBmb250LXNpemU6IDIwcHhcIj7lhYM8L3NwYW4+XHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cInR4M1wiIGNsYXNzPVwiZ3JpZC1pdGVtXCIgb25jbGljaz1cImdldHdpdGhkcmF3KCdBTU9VTlRfNTAwMCcsNTApXCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRvcC1sZWZ0XCI+5q+P5pel5o+Q546wPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJncmlkLWl0ZW0tdGV4dFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl9nb2xkLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogNDVweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj41MDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzAwMDsgZm9udC1zaXplOiAyMHB4XCI+5YWDPC9zcGFuPlxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ0eDRcIiBjbGFzcz1cImdyaWQtaXRlbVwiIG9uY2xpY2s9XCJnZXR3aXRoZHJhdygnQU1PVU5UXzEwMDAwJywxMDApXCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRvcC1sZWZ0XCI+5LuF5LiA5qyhPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJncmlkLWl0ZW0tdGV4dFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl9nb2xkLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogNDVweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj4xMDA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogMjBweFwiPuWFgzwvc3Bhbj5cclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYnRtdmlld1wiPlxyXG4gICAgICA8dGFicyBjbGFzcz1cInRhYnNcIiBvbmNoYW5nZT1cImNoYW5nZVRhYmFjdGl2ZVwiPlxyXG4gICAgICAgIDx0YWItYmFyIGNsYXNzPVwidGFiLWJhclwiPlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuaUtuebiuiusOW9lTwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7mj5DnjrDorrDlvZU8L3RleHQ+XHJcbiAgICAgICAgPC90YWItYmFyPlxyXG4gICAgICAgIDx0YWItY29udGVudCBpZj1cInt7bGlzdHNob3d9fVwiIGNsYXNzPVwidGFiLWNvbnRlbnRcIiBzY3JvbGxhYmxlPVwie3tzY3JvbGxhYmxlfX1cIj5cclxuICAgICAgICAgIDxsaXN0IGNsYXNzPVwibGlzdFwiPlxyXG4gICAgICAgICAgICA8bGlzdC1pdGVtIHR5cGU9XCJsaXN0SXRlbVwiIGZvcj1cInt7bGlzdERhdGF9fVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogOXB4OyBmb250LXNpemU6IDI4cHg7IGNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZFwiPnt7JGl0ZW0udGl0bGV9fTwvdGV4dD5cclxuICAgICAgICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI0cHg7IGNvbG9yOiAjODI4MjgyXCI+e3skaXRlbS5jcmVhdGVkRHR9fTwvdGV4dD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJoZWlnaHQ6IDUwcHg7IGJvcmRlci1yYWRpdXM6IDk2cHg7IGJhY2tncm91bmQtY29sb3I6ICNlYjYzNTI7IGZvbnQtc2l6ZTogMjZweDsgY29sb3I6ICNmZmY7IHBhZGRpbmctbGVmdDogMjJweDsgcGFkZGluZy1yaWdodDogMjJweDsgcGFkZGluZy10b3A6IDFweDsgcGFkZGluZy1ib3R0b206IDFweFwiPit7eyRpdGVtLmFtb3VudH195YWDPC90ZXh0PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpc3QtaXRlbT5cclxuICAgICAgICAgIDwvbGlzdD5cclxuXHJcbiAgICAgICAgICA8bGlzdCBjbGFzcz1cImxpc3RcIj5cclxuICAgICAgICAgICAgPGxpc3QtaXRlbSB0eXBlPVwibGlzdEl0ZW1cIiBmb3I9XCJ7e2xpc3REYXRhfX1cIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDlweDsgZm9udC1zaXplOiAyOHB4OyBjb2xvcjogIzAwMDAwMDsgZm9udC13ZWlnaHQ6IGJvbGRcIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNHB4OyBjb2xvcjogIzgyODI4MlwiPnt7JGl0ZW0uY3JlYXRlZER0fX08L3RleHQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDE0MHB4OyBoZWlnaHQ6IDUwcHg7IGJvcmRlci1yYWRpdXM6IDk2cHg7IGJhY2tncm91bmQtY29sb3I6ICNlYjYzNTI7IGZvbnQtc2l6ZTogMjZweDsgY29sb3I6ICNmZmY7IHBhZGRpbmctbGVmdDogMjJweDsgcGFkZGluZy1yaWdodDogMjJweDsgcGFkZGluZy10b3A6IDFweDsgcGFkZGluZy1ib3R0b206IDFweFwiPnt7JGl0ZW0uYW1vdW50fX3lhYM8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbGlzdC1pdGVtPlxyXG4gICAgICAgICAgPC9saXN0PlxyXG4gICAgICAgIDwvdGFiLWNvbnRlbnQ+XHJcbiAgICAgIDwvdGFicz5cclxuXHJcbiAgICAgIDx0ZXh0IGlmPVwie3shbGlzdHNob3d9fVwiIHN0eWxlPVwiZm9udC1zaXplOiAzMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZsZXg6IDEwXCI+5pqC5peg55u45YWz6K6w5b2VPC90ZXh0PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm1hc2tcIiBpZj1cInt7ZGlhbG9nX3Zpc2libGV9fVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+6KeE5YiZ6K+05piOPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICA8dGV4dD57e3J1bGVzfX08L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bmJveFwiIG9uY2xpY2s9XCJvcGVuRGlhbG9nKGZhbHNlKVwiPlxyXG4gICAgICAgICAgICAgIDx0ZXh0PuaIkeW3suefpeaZkzwvdGV4dD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaWFsb2ctYm94IHNob3ctZGlhbG9nPVwie3tzaG93RGlhbG9nfX1cIiBkaWFsb2ctZGF0YT1cInt7ZGlhbG9nRGF0YX19XCIgb25lbWl0LXN1Y2Nlc3M9XCJzdWNjZXNzRGlhbG9nXCIgb25lbWl0LWNsb25lPVwiY2xvbmVEaWFsb2dcIj48L2RpYWxvZy1ib3g+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG4gIGltcG9ydCBleGFtcGxlIGZyb20gJy4uL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzJztcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHByaXZhdGU6IHtcclxuICAgICAgcnVsZXM6IGAxLiDkuIDkuKrotKblj7fkuJTkuIDkuKrorr7lpIfvvIzmr4/ml6Xlj6rog73mj5DnjrDkuIDmrKFcXG4yLiDmj5DnjrDlkI4xfjPkuKrlt6XkvZzml6XliLDotKZcXG4zLiDlubPlj7DkvJrmoLnmja7ov5DokKXog73lipvorr7nva7kuI3lkIznmoTmoaPkvY3pop3luqbvvIzlhbfkvZPku6Xmj5DnjrDpobXpnaLlsZXnpLrkuLrlh4ZcXG40LiDkuIDkuKrotKblj7flj6rog73nu5Ex5qyh5o+Q546w6LSm5oi3LOivt+iwqOaFjuS9v+eUqFxcbjUuIOiLpeaPkOeOsOWksei0pe+8jOaPkOeOsOmHkemineWwhui/lOi/mOWIsOaCqOeahOi0puaIt1xcbjYuIOS4uuS+v+S6juaCqOaXpeW4uOaPkOeOsO+8jOivt+S9v+eUqOacrOS6uuaUr+S7mOWunei0puWPt++8jOe7keWumuS4reS8mui/m+ihjOS/oeaBr+agoemqjOOAgmAsXHJcbiAgICAgIGxpc3REYXRhOiBbXSxcclxuICAgICAgbGlzdHNob3c6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dfdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgIGRpYWxvZ192aXNpYmxlMjogZmFsc2UsXHJcbiAgICAgIHNob3dEaWFsb2c6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dEYXRhOiB7fSxcclxuICAgICAgdXNlckRhdGE6IHt9LFxyXG4gICAgICB1c2VyYmFsYW5jZTogMCwvL+eUqOaIt+aDs+imgeaPkOeOsOeahOmHkeminVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Jbml0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAvL+aPkuWxj+W5v+WRilxyXG4gICAgICAkdXRpbHMudGFibGVQbGFxdWUoKVxyXG4gICAgfSxcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAgICR1bWVuZ19zdGF0LnJlc3VtZSh0aGlzKVxyXG4gICAgICB0aGlzLmdldFVzZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25IaWRlKCkge1xyXG4gICAgICAkdW1lbmdfc3RhdC5wYXVzZSh0aGlzKTsvL+WcqG9uSGlkZeaWueazleeahOesrOS4gOihjOWKoOWFpeatpOS7o+eggVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyKCkge1xyXG4gICAgICAkYXBpcy51c2VyLmdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+eUqOaIt+S/oeaBry0tLS0tLS0tLS0tLS0tLS0tPicgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhID0gcmVzLmRhdGFcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlVGFiYWN0aXZlOiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgLy/lj6/nlKjlgLw6Ly/orrDlvZXnsbvlnossIFJFVkVOVUUo5pS255uKKSwgRVhQRU5ESVRVUkUo5o+Q546wKSzlj6/nlKjlgLw6UkVWRU5VRSxFWFBFTkRJVFVSRVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhlLmluZGV4KTtcclxuICAgICAgaWYgKGUuaW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLnJlY29yZCgnUkVWRU5VRScpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmQoJ0VYUEVORElUVVJFJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5o+Q546wXHJcbiAgICBnZXR3aXRoZHJhdyhhLCB1Yikge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIuaPkOeOsFRBZzpcIiArIGEgKyBcIizpnIDopoHmj5DnjrDnmoTph5Hpop3vvJpcIiArIHViKTtcclxuXHJcbiAgICAgIC8v5L2Z6aKd5piv5ZCm5aSn5LqO5o+Q546w6YeR6aKdXHJcbiAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmJhbGFuY2UgPCB1Yikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5L2Z6aKd5LiN6Laz77yBXCIpO1xyXG4gICAgICAgIHRoaXMub3BlbkRpYWxvZzIoKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy/miYvmnLrlj7fkuLrnqbrvvIzljbPmnKrnmbvlvZVcclxuICAgICAgaWYgKCF0aGlzLnVzZXJEYXRhLmxvZ2luUGhvbmUpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIueUqOaIt+aJi+acuuWPt+S4uuepuu+8jOacqueZu+W9lSBcIik7XHJcbiAgICAgICAgdGhpcy5vcGVuTG9naW4oKTtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgZXhhbXBsZS53aXRoZHJhdyh7XHJcbiAgICAgICAgYW1vdW50OiBhXHJcbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfmj5DnjrDmiJDlip86JywgcmVzcG9uc2UpO1xyXG5cclxuICAgICAgICB0aGlzLndpdGhkcmF3U3V1Y2VzcyhyZXNwb25zZS5kYXRhLmFtb3VudCk7XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aPkOeOsOWksei0pTonLCBlcnJvcik7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IEpTT04ucGFyc2UoZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgY29kZSA9IGUuY29kZTtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBlLm1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSAnMzAwMDAwJzpcclxuICAgICAgICAgICAgICAgIC8v5o+Q546w5qyh5pWw5bey55So5a6MXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2czKG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSAnNDAwMDAwJzpcclxuXHJcbiAgICAgICAgICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcg5o+Q546w5aSx6LSlISAnICsgbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgZ3Jhdml0eTogXCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJzMxMDAwNyc6XHJcbiAgICAgICAgICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcg5o+Q546w5aSx6LSlISAnICsgbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgZ3Jhdml0eTogXCJjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8v5pS25qy+6LSm5Y+35LiN5a2Y5Zyo5oiW5aeT5ZCN5pyJ6K+vXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBheUFjY291bnQoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnMzEwMDA0JzpcclxuICAgICAgICAgICAgICAgIC8vIOS9memineS4jei2s1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nMigpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5YW25LuWIGNvZGUg55qE6YC76L6RXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk90aGVyIGNvZGU6IFwiICsgY29kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICBtZXNzYWdlOiAn5o+Q546w5aSx6LSlZXJyOicgKyBlLFxyXG4gICAgICAgICAgICAgIGdyYXZpdHk6ICdib3R0b20nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy/orr7nva7mlK/ku5jlrp3otKblj7dcclxuICAgIHNldFBheUFjY291bnQoKSB7XHJcblxyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ1BhZ2Vfc2V0UGF5J1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb3BlbkxvZ2luKCkge1xyXG4gICAgICB0aGlzLmRpYWxvZ0RhdGEgPSB7XHJcbiAgICAgICAgaGFkaW5nOiBcIuaPkOekulwiLFxyXG4gICAgICAgIHN1YmhlYWRpbmc6IFwi6K+355m75b2V5ZCO5YaN5L2/55So6K+l5Yqf6IO9XCIsXHJcbiAgICAgICAgaWNvblR5cGU6IFwiaGludFwiLFxyXG4gICAgICAgIGNsb25lQnRuOiBcIuWPliDmtohcIixcclxuICAgICAgICBzdWNjZXNzQnRuOiBcIueZu+W9lVwiXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8v5omT5byA55m75b2V6aG16Z2iXHJcbiAgICBzdWNjZXNzRGlhbG9nKCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuZGlhbG9nRGF0YS5zdWNjZXNzQnRuID09PSBcIueZu+W9lVwiKSB7Ly/ljrvnmbvlvZVcclxuICAgICAgICB0aGlzLnNob3dEaWFsb2cgPSBmYWxzZVxyXG4gICAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgICB1cmk6ICdQYWdlX2xvZ2luJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8v5YW25LuW56Gu6K6k5Yqf6IO9XHJcbiAgICAgICAgdGhpcy5zaG93RGlhbG9nID0gZmFsc2VcclxuICAgICAgICAkcm91dGVyLmJhY2soKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/kvZnpop3kuI3otrNcclxuICAgIG9wZW5EaWFsb2cyKCkge1xyXG5cclxuICAgICAgdGhpcy5kaWFsb2dEYXRhID0ge1xyXG4gICAgICAgIGhhZGluZzogXCLmj5DnpLpcIixcclxuICAgICAgICBzdWJoZWFkaW5nOiBcIuS9memineS4jei2s++8jOivt+WwneivleWFtuS7lumineW6puaIlue7p+e7rei1mumSsVwiLFxyXG4gICAgICAgIGljb25UeXBlOiBcImhpbnRcIixcclxuICAgICAgICBjbG9uZUJ0bjogXCLmjaLkuKrpop3luqZcIixcclxuICAgICAgICBzdWNjZXNzQnRuOiBcIue7p+e7rei1mumSsVwiXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+S9memineS4jei2s1xyXG4gICAgb3BlbkRpYWxvZzMobWVzc2FnZSkge1xyXG5cclxuICAgICAgdGhpcy5kaWFsb2dEYXRhID0ge1xyXG4gICAgICAgIGhhZGluZzogXCLmj5DnpLpcIixcclxuICAgICAgICBzdWJoZWFkaW5nOiBtZXNzYWdlLFxyXG4gICAgICAgIGljb25UeXBlOiBcImhpbnRcIixcclxuICAgICAgICBjbG9uZUJ0bjogXCLlhbPpl61cIixcclxuICAgICAgICBzdWNjZXNzQnRuOiBcIue7p+e7rei1mumSsVwiXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8v5o+Q546w5oiQ5YqfXHJcbiAgICB3aXRoZHJhd1N1dWNlc3MoYW1vdW50KSB7XHJcbiAgICAgIHRoaXMuZGlhbG9nRGF0YSA9IHtcclxuICAgICAgICBoYWRpbmc6IFwi5o+Q546w5oiQ5YqfXCIsXHJcbiAgICAgICAgc3ViaGVhZGluZzogYOaIkOWKn+aPkOeOsCR7YW1vdW50feWFg2AsXHJcbiAgICAgICAgaWNvblR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIGNsb25lQnRuOiBcIuWFs+mXrVwiLFxyXG4gICAgICAgIHN1Y2Nlc3NCdG46IFwi57un57ut6LWa6ZKxXCJcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNob3dEaWFsb2cgPSB0cnVlXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgLy/ojrflj5borrDlvZXliJfooahcclxuICAgIHJlY29yZCh0eXBlKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi6K6w5b2V57G75Z6LOiBcIiArIHR5cGUpO1xyXG4gICAgICBleGFtcGxlLnJlY29yZCh7XHJcbiAgICAgICAgdHlwZTogdHlwZVxyXG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6I635Y+W5oiQ5YqfOicsIHJlc3BvbnNlKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGEucmVjb3Jkc1xyXG5cclxuICAgICAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5saXN0c2hvdyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5saXN0c2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5saXN0RGF0YSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfojrflj5blpLHotKU6JywgZXJyb3IpO1xyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGVycm9yKS5tZXNzYWdlO1xyXG4gICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnIOaPkOeOsOWksei0pSEgJyArIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGdyYXZpdHk6IFwiY2VudGVyXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5EaWFsb2coYikge1xyXG4gICAgICB0aGlzLmRpYWxvZ192aXNpYmxlID0gYlxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYmluZEFmZmlybSgpIHtcclxuICAgICAgdGhpcy5kaWFsb2dfdmlzaWJsZTIgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIGNsb25lRGlhbG9nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgfVxyXG48L3NjcmlwdD5cclxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XHJcbiAgLm1hc2sge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgZmxleDogMTtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNSwgNSwgNSwgMC42KTtcclxuXHJcbiAgICAuZGlhbG9nIHtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMzJweDtcclxuICAgICAgbWFyZ2luLXRvcDogNjBweDtcclxuICAgICAgcGFkZGluZzogMjZweDtcclxuICAgICAgd2lkdGg6IDg0JTtcclxuICAgICAgJi1ib3JkZXIge1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlN2U3ZTc7XHJcbiAgICAgIH1cclxuICAgICAgLmJveCB7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAudG9wIHtcclxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxNXB4O1xyXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgICAgLnRpdGxlIHtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBjb2xvcjogIzAwMDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jb250ZW50IHtcclxuICAgICAgICAgIHBhZGRpbmc6IDMwcHg7XHJcbiAgICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG4gICAgICAgICAgY29sb3I6ICM4MjgyODI7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC5idG4ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XHJcblxyXG4gICAgICAgIC5idG5ib3gge1xyXG4gICAgICAgICAgdGV4dCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLmJ0bmJveDEge1xyXG4gICAgICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgICAgICB0ZXh0IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogODhweDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGIyZmY7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAuYnRuYm94MiB7XHJcbiAgICAgICAgICBmbGV4OiAxO1xyXG5cclxuICAgICAgICAgIHRleHQge1xyXG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5O1xyXG4gICAgICAgICAgICB3aWR0aDogMjcwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogODhweDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcGFkZGluZzogMjdweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgfVxyXG4gIC5ncm91cCB7XHJcbiAgICBoZWlnaHQ6IDE2MnB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvZ3JvdXAucG5nKTtcclxuICB9XHJcbiAgLnRvcHZpZXcge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMjQwcHg7XHJcbiAgICB3aWR0aDogNzAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB9XHJcblxyXG4gIC5taWR2aWV3IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHdpZHRoOiA3MDJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyN3B4O1xyXG4gICAgcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMjJweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDIycHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAuYnRtdmlldyB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgd2lkdGg6IDcwMnB4O1xyXG4gICAgaGVpZ2h0OiA1MCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjdweDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDIwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDIycHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB9XHJcblxyXG4gIC5ncmlkLWl0ZW0ge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IC8qIOawtOW5s+WxheS4rSAqL1xyXG4gICAgd2lkdGg6IDMxMHB4O1xyXG4gICAgaGVpZ2h0OiAxMjRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkICNlYjYzNTI7XHJcbiAgfVxyXG4gIC50b3AtbGVmdCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDE4cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxOHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDhweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWI2MzUyO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyMHB4O1xyXG4gIH1cclxuICAuZ3JpZC1pdGVtLXRleHQge1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogNDVweDtcclxuICB9XHJcbiAgLnRhYnMge1xyXG4gICAgZmxleDogMTtcclxuXHJcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjYmQwZjgzOyAqL1xyXG4gIH1cclxuICAudGFiLWNvbnRlbnQge1xyXG4gICAgZmxleDogMTtcclxuICB9XHJcbiAgLnRhYi1iYXIge1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIGJvcmRlci1jb2xvcjogI2JiYmJiYjtcclxuICAgIGNvbG9yOiAjYmJiYmJiO1xyXG4gIH1cclxuICAudGFiLXRleHQge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICM4MjgyODI7XHJcbiAgICBmb250LXNpemU6IDMxcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNnB4O1xyXG4gIH1cclxuICAudGFiLXRleHQ6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG5cclxuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDRweDtcclxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICM5NWZmMzc7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcbiAgLml0ZW0tY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMzBweDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG4gIC5pdGVtLWNvbnRlbnQge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmctYm90dG9tOiAzMHB4O1xyXG4gIH1cclxuICAuaXRlbS10aXRsZSB7XHJcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gICAgY29sb3I6ICNhYWFhYWE7XHJcbiAgfVxyXG5cclxuICAubGlzdCB7XHJcbiAgICBsYXlvdXQtdHlwZTogc3RhZ2dlcjtcclxuICB9XHJcblxyXG4gIC5saXN0LWl0ZW0ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDE4cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxOHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDI1cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMjVweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNlN2U3ZTc7XHJcbiAgfVxyXG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLXBhZ2VcIiBzaG93PVwie3tzaG93RGlhbG9nfX1cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJiaWctY29udGVudFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJoYWRpbmdcIj48dGV4dCBjbGFzcz1cInR4dFwiPnt7ZGlhbG9nRGF0YS5oYWRpbmd9fTwvdGV4dD48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ViaGVhZGluZ1wiPjx0ZXh0IGNsYXNzPVwidHh0XCI+e3tkaWFsb2dEYXRhLnN1YmhlYWRpbmd9fTwvdGV4dD48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuTGlzdFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWJ0blwiIEBjbGljaz1cImNsb3NlQnRuXCI+PHRleHQgY2xhc3M9XCJ0eHRcIj57e2RpYWxvZ0RhdGEuY2xvbmVCdG59fTwvdGV4dD48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWNjZXNzLWJ0blwiIEBjbGljaz1cImNsaWNrU3VjY2Vzc1wiPjx0ZXh0IGNsYXNzPVwidHh0XCI+e3tkaWFsb2dEYXRhLnN1Y2Nlc3NCdG59fTwvdGV4dD48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWJveFwiIHNob3c9XCJ7e3Nob3dEaWFsb2d9fVwiPlxyXG4gICAgICAgIDxpbWFnZSBzcmM9XCJ7e2ljb25EYXRhW2RpYWxvZ0RhdGEuaWNvblR5cGVdfX1cIiBjbGFzcz1cImljb25cIj48L2ltYWdlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgZGlhbG9nRGF0YToge30sXHJcbiAgICAgIGljb25EYXRhOiB7XHJcbiAgICAgICAgc3VjY2VzczogJy4uL0NvbW1vbi9pbWcvc3VjY2Vzcy5wbmcnLFxyXG4gICAgICAgIGhpbnQ6ICcuLi9Db21tb24vaW1nL2ljb25fdHMucG5nJyxcclxuICAgICAgICB3YXJuOiBcIi4uL0NvbW1vbi9pbWcvaWNvbl90cy5wbmdcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgc2hvd0RpYWxvZzoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgZGlhbG9nRGF0YToge1xyXG4gICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICBkZWZhdWx0OiB7fVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNsaWNrU3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn54K55Ye75oiQ5Yqf5oyJ6ZKuJyk7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRTdWNjZXNzJylcclxuICAgIH0sXHJcbiAgICBjbG9zZUJ0bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn54K55Ye75YWz6ZetJyk7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9uZScpXHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxyXG4gIEBpbXBvcnQgXCIuL2luZGV4Lmxlc3NcIjtcclxuPC9zdHlsZT4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLm1hc2tcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwiZmxleFwiOiAxLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LXN0YXJ0XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDUsNSw1LDAuNilcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2dcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzJweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNjBweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI2cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjI2cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyNnB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI2cHhcIixcbiAgICBcIndpZHRoXCI6IFwiODQlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nLWJvcmRlclwiOiB7XG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTdlN2U3XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3hcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3BcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjE1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAudGl0bGVcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC5jb250ZW50XCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIzMHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjUwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG5cIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3ggdGV4dFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94MVwiOiB7XG4gICAgXCJmbGV4XCI6IDFcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveDEgdGV4dFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94MlwiOiB7XG4gICAgXCJmbGV4XCI6IDFcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveDIgdGV4dFwiOiB7XG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjI3MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjdweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyN3B4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCJcbiAgfSxcbiAgXCIuZ3JvdXBcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiMTYycHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvZ3JvdXAucG5nXCJcbiAgfSxcbiAgXCIudG9wdmlld1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJoZWlnaHRcIjogXCIyNDBweFwiLFxuICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLm1pZHZpZXdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI3cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMnB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuYnRtdmlld1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI3cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMnB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuZ3JpZC1pdGVtXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjMxMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjRweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiOHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjhweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiOHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiOHB4XCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjNweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjNweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIzcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjNweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZWI2MzUyXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZWI2MzUyXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZWI2MzUyXCJcbiAgfSxcbiAgXCIudG9wLWxlZnRcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxOHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxOHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiOHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiOHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWI2MzUyXCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuZ3JpZC1pdGVtLXRleHRcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNDVweFwiXG4gIH0sXG4gIFwiLnRhYnNcIjoge1xuICAgIFwiZmxleFwiOiAxXG4gIH0sXG4gIFwiLnRhYi1jb250ZW50XCI6IHtcbiAgICBcImZsZXhcIjogMVxuICB9LFxuICBcIi50YWItYmFyXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImNvbG9yXCI6IFwiI2JiYmJiYlwiXG4gIH0sXG4gIFwiLnRhYi10ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMxcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI2cHhcIixcbiAgICBcImNvbG9yOmFjdGl2ZVwiOiBcIiMwMDAwMDBcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoOmFjdGl2ZVwiOiBcIjRweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3I6YWN0aXZlXCI6IFwiIzk1ZmYzN1wiLFxuICAgIFwiZm9udFdlaWdodDphY3RpdmVcIjogXCJib2xkXCJcbiAgfSxcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLml0ZW0tY29udGVudFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLml0ZW0tdGl0bGVcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjUwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNhYWFhYWFcIlxuICB9LFxuICBcIi5saXN0XCI6IHtcbiAgICBcImxheW91dFR5cGVcIjogXCJzdGFnZ2VyXCJcbiAgfSxcbiAgXCIubGlzdC1pdGVtXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxOHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxOHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjVweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI1cHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U3ZTdlN1wiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmRpYWxvZy1wYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmJpZy1jb250ZW50XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMDBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuYmlnLWNvbnRlbnQgLmljb24tYm94XCI6IHtcbiAgICBcInpJbmRleFwiOiA5OTksXG4gICAgXCJ0b3BcIjogXCItNDYwcHhcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuYmlnLWNvbnRlbnQgLmljb24tYm94IC5pY29uXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTIwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgXCJ6SW5kZXhcIjogOTk5XG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjM5NHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzMnB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ6SW5kZXhcIjogMTBcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmNvbnRlbnQgLmhhZGluZ1wiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI5NHB4XCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmNvbnRlbnQgLmhhZGluZyAudHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMWExYTFhXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNDRweFwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5zdWJoZWFkaW5nXCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjUwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5zdWJoZWFkaW5nIC50eHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxNnB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzMzMzMzM1wiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5idG5MaXN0XCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5idG5MaXN0IC5jbG9zZS1idG5cIjoge1xuICAgIFwid2lkdGhcIjogXCIyNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuYnRuTGlzdCAuY2xvc2UtYnRuIC50eHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNDAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiM2NjY2NjZcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuYnRuTGlzdCAuc3VjY2Vzcy1idG5cIjoge1xuICAgIFwid2lkdGhcIjogXCIyNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwQjJGRlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmNvbnRlbnQgLmJ0bkxpc3QgLnN1Y2Nlc3MtYnRuIC50eHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0MHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidG9wdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJncm91cFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlvZPliY3kvZnpop1cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcInRvcFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIzMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIzMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudXNlckRhdGEuYmFsYW5jZSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCI4MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMnB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5vcGVuRGlhbG9nKHRydWUsZXZ0KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI2OHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjE4cHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjE4cHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIFwiYm90dG9tXCI6IFwiMzBweFwiLFxuICAgICAgICAgICAgICAgIFwicmlnaHRcIjogXCIzMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuinhOWImeivtOaYjlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZTc1ODQ2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICBcImJvdHRvbVwiOiBcIjEycHhcIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcIjMwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5o+Q546w5pa55byP77yaXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX3BheS5wbmdcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjRweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pSv5LuY5a6d5o+Q546wXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjVweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm1pZHZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEzMHB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCIsXG4gICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjE1cHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMzBweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU4cHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaPkOeOsOmHkeminVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMjVweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDJweFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiM3B4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgXCJmbGV4V3JhcFwiOiBcIndyYXBcIixcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwidHgxXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJpZFwiOiBcInR4MVwiLFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJncmlkLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMCcsMC4xLGV2dCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmr4/ml6Xmj5DnjrBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JpZC1pdGVtLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uLy9pbWcvaWNvbl9nb2xkLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI0MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjAuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWDXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ0eDJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImlkXCI6IFwidHgyXCIsXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImdyaWQtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5nZXR3aXRoZHJhdygnQU1PVU5UXzEwMCcsMSxldnQpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5LuF5LiA5qyhXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImdyaWQtaXRlbS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi8vaW1nL2ljb25fZ29sZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhYNcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcInR4M1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiaWRcIjogXCJ0eDNcIixcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZ3JpZC1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLmdldHdpdGhkcmF3KCdBTU9VTlRfNTAwMCcsNTAsZXZ0KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuavj+aXpeaPkOeOsFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJncmlkLWl0ZW0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ljb25fZ29sZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCI1MFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWDXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ0eDRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImlkXCI6IFwidHg0XCIsXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImdyaWQtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5nZXR3aXRoZHJhdygnQU1PVU5UXzEwMDAwJywxMDAsZXZ0KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7heS4gOasoVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJncmlkLWl0ZW0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ljb25fZ29sZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJidG12aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0YWJzXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiY2hhbmdlVGFiYWN0aXZlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGFiLWJhclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmlLbnm4rorrDlvZVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5o+Q546w6K6w5b2VXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNjcm9sbGFibGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zY3JvbGxhYmxlKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxpc3RzaG93KX0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRhYi1jb250ZW50XCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImxpc3RcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubGlzdERhdGEpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlzdC1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCI5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uY3JlYXRlZER0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnKycrKCh0aGlzLiRpdGVtLmFtb3VudCkpKyflhYMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI5NnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjFweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibGlzdFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5saXN0RGF0YSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaXN0LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjlweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5jcmVhdGVkRHQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy4kaXRlbS5hbW91bnQpKSsn5YWDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE0MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjk2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWI2MzUyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIxcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMXB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLmmoLml6Dnm7jlhbPorrDlvZVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghdGhpcy5saXN0c2hvdyl9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBcImZsZXhcIjogMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm1hc2tcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dfdmlzaWJsZSl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJkaWFsb2dcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImJveFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLop4TliJnor7TmmI5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJ1bGVzKX1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImJ0blwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5ib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMub3BlbkRpYWxvZyhmYWxzZSxldnQpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5oiR5bey55+l5pmTXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGlhbG9nLWJveFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzaG93RGlhbG9nXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0RpYWxvZyl9LFxuICAgICAgICBcImRpYWxvZ0RhdGFcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dEYXRhKX1cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiZW1pdC1zdWNjZXNzXCI6IFwic3VjY2Vzc0RpYWxvZ1wiLFxuICAgICAgICBcImVtaXQtY2xvbmVcIjogXCJjbG9uZURpYWxvZ1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHtcbiAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nKX1cbiAgfSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiZGlhbG9nLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJiaWctY29udGVudFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjb250ZW50XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJoYWRpbmdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nRGF0YS5oYWRpbmcpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwic3ViaGVhZGluZ1wiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dEYXRhLnN1YmhlYWRpbmcpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYnRuTGlzdFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNsb3NlLWJ0blwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VCdG5cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nRGF0YS5jbG9uZUJ0bil9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdWNjZXNzLWJ0blwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xpY2tTdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ0RhdGEuc3VjY2Vzc0J0bil9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dEaWFsb2cpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpY29uLWJveFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmljb25EYXRhW3RoaXMuZGlhbG9nRGF0YS5pY29uVHlwZV0pfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpY29uXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1kaWFsb2ctYm94IS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcZGlhbG9nQm94XFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcZGlhbG9nQm94XFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2RpYWxvZy1ib3gnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vZGlhbG9nQm94L2luZGV4LnV4P25hbWU9ZGlhbG9nLWJveFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz9kZXBlbmRzW109ZGlhbG9nLWJveCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfVGl4aWFuXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9UaXhpYW5cXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjEuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
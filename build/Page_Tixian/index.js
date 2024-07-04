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
  async onInit() {
    const storageFlag = await $processData.getStorage("_PRIVAC");
    if (storageFlag) {
      $utils.tablePlaque(this.$app.$def.dataApp.interstitialAdUnitId);
    } else {
      console.log('用户授权= ', storageFlag);
      console.log('未授权,不加载插屏广告');
    }
  },
  onShow(options) {
    $umeng_stat.resume(this);
    console.log('提现 onShow()----------------->');
    this.getUser();
  },
  onHide() {
    $umeng_stat.pause(this);
  },
  getUser() {
    $apis.user.getUserInfo().then(res => {
      console.log('用户信息----------------->' + JSON.stringify(res));
      this.userData = res.data;
    });
  },
  changeTabactive: function (e) {
    console.log(e.index);
    if (e.index === 0) {
      this.record('REVENUE');
    } else {
      this.record('EXPENDITURE');
    }
  },
  getwithdraw(a, ub) {
    console.log("提现TAg:" + a + ",需要提现的金额：" + ub);
    if (this.userData.balance < ub) {
      console.log("余额不足！");
      this.openDialog2();
      return;
    }
    if (!this.userData.loginPhone) {
      console.log("用户手机号为空，未登录 ");
      this.openLogin();
      return;
    }
    _example.default.withdraw({
      amount: a
    }).then(response => {
      console.log('提现成功:', response);
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
            console.log("Other code: " + code);
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
    console.log("记录类型: " + type);
    _example.default.record({
      type: type
    }).then(response => {
      console.log('获取成功:', response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfVGl4aWFuXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNVQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQy93QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hamF4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfVGl4aWFuL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfVGl4aWFuXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL2RpYWxvZ0JveC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxkaWFsb2dCb3hcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX1RpeGlhbi9pbmRleC51eD8wODdiIiwid2VicGFjazovLy8uL3NyYy9kaWFsb2dCb3gvaW5kZXgudXg/YzRiOSIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9UaXhpYW4vaW5kZXgudXg/Zjk2OSIsIndlYnBhY2s6Ly8vLi9zcmMvZGlhbG9nQm94L2luZGV4LnV4PzYyNWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RpYWxvZ0JveC9pbmRleC51eCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfVGl4aWFuL2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9zeXN0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2hcIikpO1xudmFyIF9zeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xudmFyIF9zeXN0ZW0zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmRldmljZVwiKSk7XG52YXIgX3N5c3RlbTQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ucHJvbXB0XCIpKTtcbnZhciBfc3lzdGVtNSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yb3V0ZXJcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbmZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBrZXkgPSBfdG9Qcm9wZXJ0eUtleShrZXkpOyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgaSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG5jb25zdCBnZXRVc2VySWQgPSBhc3luYyAoKSA9PiB7XG4gIGxldCB1c2VySWQgPSBhd2FpdCBfc3lzdGVtMy5kZWZhdWx0LmdldFVzZXJJZCgpO1xuICByZXR1cm4gdXNlcklkLmRhdGEudXNlcklkO1xufTtcbmNvbnN0IHF1aXQgPSAoKSA9PiB7XG4gIF9zeXN0ZW00LmRlZmF1bHQuc2hvd0RpYWxvZyh7XG4gICAgdGl0bGU6ICforablkYonLFxuICAgIG1lc3NhZ2U6IFwi5oKo5bey5rOo6ZSA6LSm5Y+3LOivt+mAgOWHuuOAglwiLFxuICAgIGJ1dHRvbnM6IFt7XG4gICAgICB0ZXh0OiAn6YCA5Ye6JyxcbiAgICAgIGNvbG9yOiAnIzMzMzMzMydcbiAgICB9XSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3N5c3RlbTUuZGVmYXVsdC5wdXNoKHtcbiAgICAgICAgdXJpOiBcIlBhZ2VfbG9naW5cIlxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuY29uc3QgZ2V0VG9rZW5EYXRhID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4YW1wbGUgPSByZXF1aXJlKCcuL2FwaXMvZXhhbXBsZS5qcycpLmRlZmF1bHQ7XG4gICAgY29uc3QgZGV2aWNlTnVtID0gYXdhaXQgZ2V0VXNlcklkKCk7XG4gICAgY29uc29sZS5sb2coYGdldFRva2VuRGF0YSgpLS0tLT5kZXZpY2VOdW09JHtkZXZpY2VOdW19YCk7XG4gICAgY29uc29sZS5sb2coJ+aYr+WQpuinpuWPkeeahOi/memHjCcpO1xuICAgIGV4YW1wbGUudG9Mb2dpbih7XG4gICAgICBsb2dpblR5cGU6IFwiREVWSUNFXCIsXG4gICAgICBhcHBJZDogJ1NDXzAwMDEnLFxuICAgICAgZGV2aWNlTnVtLFxuICAgICAgbG9naW5BY2NvdW50OiBkZXZpY2VOdW1cbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+i1sOeahOaIkOWKn+WbnuiwgycpO1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyLCAn5aSx6LSl5Zue6LCDJyk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoSlNPTi5wYXJzZShlcnIpLmNvZGUgPT09ICczMTAwMDEnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+i/m+adpeS6hicpO1xuICAgICAgICAgIHF1aXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IsICfmn6XnnIvojrflj5bmiqXplJknKTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5sZXQgaXNSZWZyZXNoaW5nID0gZmFsc2U7IC8vIOaYr+WQpuato+WcqOivt+axguWIt+aWsHRva2Vu55qE5o6l5Y+jXG5jb25zdCByZWZyZXNoU3Vic2NyaWJlcnMgPSBbXTsgLy8g5a2Y5YKo6K+35rGC55qE5pWw57uEXG5jb25zdCBzdWJzY3JpYmVUb2tlblJlZnJlc2ggPSBjYiA9PiB7XG4gIC8vIOWwhuaJgOacieeahOivt+axgumDvXB1c2jliLDmlbDnu4TkuK0s5YW25a6e5pWw57uE5pivW2Z1bmN0aW9uKHRva2VuKXt9LCBmdW5jdGlvbih0b2tlbil7fSwuLi5dXG4gIHJlZnJlc2hTdWJzY3JpYmVycy5wdXNoKGNiKTtcbn07XG5jb25zdCBvblJyZWZyZXNoZWQgPSB0b2tlbiA9PiB7XG4gIC8vIOaVsOe7hOS4reeahOivt+axguW+l+WIsOaWsOeahHRva2Vu5LmL5ZCO6Ieq5omn6KGM77yM55So5paw55qEdG9rZW7ljrvor7fmsYLmlbDmja5cbiAgcmVmcmVzaFN1YnNjcmliZXJzLm1hcChjYiA9PiBjYih0b2tlbikpO1xufTtcbmNvbnN0IGlzQWNjZXNzVG9rZW5FeHBpcmVkID0gYXV0aERhdGEgPT4ge1xuICAvLyDliKTmlq3lvZPliY10b2tlbuaYr+WQpui/h+acn1xuICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhdXRoRGF0YS5leHBpcmVBdCA+IDEwMDAwICogNjApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuY29uc3QgcmVxdWVzdCA9IG9wdGlvbnMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzID0ge31cbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBhdXRoRGF0YSA9IChhd2FpdCBfc3lzdGVtMi5kZWZhdWx0LmdldCh7XG4gICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgfSkpIHx8IHt9O1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXV0aERhdGEuZGF0YSA/IEpTT04ucGFyc2UoYXV0aERhdGEuZGF0YSkuYWNjZXNzVG9rZW4gOiAnJztcbiAgICBpZiAoaXNBY2Nlc3NUb2tlbkV4cGlyZWQoYXV0aERhdGEpIHx8ICFhY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKCFvcHRpb25zLnVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSkge1xuICAgICAgICBpZiAoIWlzUmVmcmVzaGluZykge1xuICAgICAgICAgIGlzUmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgZ2V0VG9rZW5EYXRhKCkudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gcmVzLmRhdGEuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgIGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuc2V0KHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiQVVUSF9UT0tFTl9EQVRBXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlcy5kYXRhLmFjY2Vzc1Rva2VuJywgcmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICBvblJyZWZyZXNoZWQocmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmV0cnkgPSBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaWJlVG9rZW5SZWZyZXNoKHRva2VuID0+IHtcbiAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHRva2VuOyAvLyDnlKjmnIDmlrB0b2tlbuivt+axguaVsOaNrlxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBhY2Nlc3NUb2tlbiB8fCAnJztcbiAgICBjb25zb2xlLmxvZygnYWpheOivt+axgicsICcgIHVybD0nICsgdXJsLCBcIjttZXRob2Q9XCIgKyBtZXRob2QsIFwiO2RhdGE9IFwiICsgZGF0YSk7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmZldGNoKHtcbiAgICAgIC8vIHVybDogJ2h0dHBzOi8vdGVzdC5pcGFuZGF0YS5jb20nICsgdXJsLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaWhhaXR1by5jbicgKyB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sIGhlYWRlcnMpLFxuICAgICAgLy8gc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gICBjb25zdCBkYXRhID0gcmVzLmRhdGFcbiAgICAgIC8vICAgaWYgKGRhdGEuY29kZSA9PT0gXCIwMDAwMDBcIiB8fCBKU09OLnBhcnNlKGRhdGEpLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgIC8vICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IHJlcy5kYXRhIDogSlNPTi5wYXJzZShyZXMuZGF0YSkpO1xuICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgLy8gICAgIGlmIChkYXRhLmNvZGUgPT09IFwiMzAwMDAyXCIpIHtcbiAgICAgIC8vICAgICAgICRzdG9yYWdlLmRlbGV0ZSh7XG4gICAgICAvLyAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgIC8vICAgICAgIH0pXG4gICAgICAvLyAgICAgICByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAvLyAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAvLyAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICByZWplY3QocmVzLmRhdGEpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcblxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YTtcblxuICAgICAgICAgIC8vIOWwneivleino+aekCBKU09OIOaVsOaNru+8jOWmguaenOino+aekOWksei0pe+8jOWImeS8muaKm+WHuumUmeivr1xuICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcbiAgICAgICAgICBpZiAocGFyc2VkRGF0YS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAgICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IGRhdGEgOiBwYXJzZWREYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhcnNlZERhdGEuY29kZSA9PT0gXCIzMDAwMDJcIikge1xuICAgICAgICAgICAgICBfc3lzdGVtMi5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiwgZSk7XG5cbiAgICAgICAgICAvLyDmo4Dmn6XmmK/lkKbov5Tlm57nmoTmmK8gSFRNTO+8jOiAjOS4jeaYryBKU09OXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZGF0YSA9PT0gJ3N0cmluZycgJiYgcmVzLmRhdGEuc3RhcnRzV2l0aCgnPGh0bWw+JykpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlNlcnZlciByZXR1cm5lZCBhbiBIVE1MIHBhZ2UgaW5zdGVhZCBvZiBKU09OLiBQb3NzaWJsZSBpbmNvcnJlY3QgVVJMIG9yIHNlcnZlciBlcnJvci5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge31cbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfYWpheCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FqYXguanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IHRvTG9naW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL2xvZ2luYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5LiK5Lyg5q2l5pWwXG5jb25zdCB1cGxvYWRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL3VwbG9hZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vLyDojrflj5bmraXmlbBcbmNvbnN0IGdldHN0ZXBzID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zY2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOiOt+WPluacgOi/kTMw5aSp6K6w5b2VXG5jb25zdCBnZXRzdGVwc2xpc3QgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy9saXN0YFxuICB9KTtcbn07XG5cbi8v5o+Q546wXG5jb25zdCB3aXRoZHJhdyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvd2l0aGRyYXdgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+eUqOaIt+S9memineiusOW9lVxuY29uc3QgcmVjb3JkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL2Nhc2gvcmVjb3JkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5blub/lkYrlrozmiJDmrKHmlbBcbmNvbnN0IGdldEFkQ291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbXBsZXRlL2NvdW50YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/lub/lkYrlrozmiJBcbmNvbnN0IGNvbXBsZXRlQWQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQLeWKoOWvhlxuY29uc3QgY29tcGxldGVBZFJTQSA9IGFzeW5jIGRhdGEgPT4ge1xuICBsZXQgdGltZXN0YW1wID0gK25ldyBEYXRlKCk7XG4gIGRhdGEudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICBsZXQgX2RhdGEgPSBhd2FpdCAkdXRpbHMuZGF0YUVuY3J5cHRpb24oZGF0YSk7XG4gIGxldCBwYXJhbSA9IHtcbiAgICBkYXRhOiBfZGF0YVxuICB9O1xuICBjb25zb2xlLmxvZygn5Lu75Yqh5Yqg5a+GJywgcGFyYW0pO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2ZpbmlzaGAsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gIH0pO1xufTtcblxuLy/lub/lkYrovazljJbkuIrkvKAgICB0eXBlOuW5v+WRiua4oOmBk+exu+Weizogamgo6bK46bi/KSwga3Mo5b+r5omLKSwgamwo5beo6YePKSwgLOWPr+eUqOWAvDpqaCxrcyxqbFxuY29uc3QgY29udmVydFVwbG9hZCA9IChkYXRhLCB0eXBlKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdkYXRhPSAnLCBkYXRhLCBgICAgdXJsPSAvcWEvbWluaS9iYXNpYy9hZC9jb252ZXJ0L3VwbG9hZC8ke3R5cGV9YCk7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHt0eXBlfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHRvTG9naW4sXG4gIHVwbG9hZHN0ZXBzLFxuICBnZXRzdGVwcyxcbiAgZ2V0c3RlcHNsaXN0LFxuICB3aXRoZHJhdyxcbiAgcmVjb3JkLFxuICBnZXRBZENvdW50LFxuICBjb21wbGV0ZUFkLFxuICBjb21wbGV0ZUFkUlNBLFxuICBjb252ZXJ0VXBsb2FkXG59OyIsIjxpbXBvcnQgbmFtZT1cImRpYWxvZy1ib3hcIiBzcmM9XCIuLi9kaWFsb2dCb3hcIj48L2ltcG9ydD5cclxuPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b3B2aWV3XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cFwiPlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDIwcHg7IGxlZnQ6IDMwcHg7IGNvbG9yOiAjZmZmXCI+5b2T5YmN5L2Z6aKdPC90ZXh0PlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDIwcHg7IGxlZnQ6IDMwcHg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiA4MHB4OyBmb250LXdlaWdodDogYm9sZFwiPnt7dXNlckRhdGEuYmFsYW5jZX19PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiAzMnB4OyBtYXJnaW4tbGVmdDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTJweFwiPuWFgzwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IG9uY2xpY2s9XCJvcGVuRGlhbG9nKHRydWUpXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA2OHB4OyBwYWRkaW5nLWxlZnQ6IDE4cHg7IHBhZGRpbmctcmlnaHQ6IDE4cHg7IHBhZGRpbmctdG9wOiAxMHB4OyBwYWRkaW5nLWJvdHRvbTogMTBweDsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDMwcHg7IHJpZ2h0OiAzMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmXCI+PHRleHQgc3R5bGU9XCJjb2xvcjogI2U3NTg0NjsgZm9udC1zaXplOiAyMHB4OyBmb250LXdlaWdodDogYm9sZFwiPuinhOWImeivtOaYjjwvdGV4dD48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24taXRlbXM6IGNlbnRlcjsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDEycHg7IGxlZnQ6IDMwcHhcIj5cclxuICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjODI4MjgyOyBmb250LXNpemU6IDI0cHhcIj7mj5DnjrDmlrnlvI/vvJo8L3RleHQ+XHJcbiAgICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweFwiIHNyYz1cIi9Db21tb24vaW1nL2ljb25fcGF5LnBuZ1wiIC8+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogIzgyODI4MjsgZm9udC1zaXplOiAyNHB4OyBtYXJnaW4tbGVmdDogNXB4XCI+5pSv5LuY5a6d5o+Q546wPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtaWR2aWV3XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTMwcHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kOyBtYXJnaW4tYm90dG9tOiAxNXB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMzBweDsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNlOWZkNjUsICM5NWZmMzcgMTAwJSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogNThweFwiPjwvZGl2PlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDEyNXB4OyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj7mj5DnjrDph5Hpop08L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGZsZXgtd3JhcDogd3JhcDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInR4MVwiIGNsYXNzPVwiZ3JpZC1pdGVtXCIgb25jbGljaz1cImdldHdpdGhkcmF3KCdBTU9VTlRfMTAnLDAuMSlcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidG9wLWxlZnRcIj7mr4/ml6Xmj5DnjrA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImdyaWQtaXRlbS10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBzdHlsZT1cIndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHhcIiBzcmM9XCIvQ29tbW9uLy9pbWcvaWNvbl9nb2xkLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogNDVweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj4wLjE8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogMjBweFwiPuWFgzwvc3Bhbj5cclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwidHgyXCIgY2xhc3M9XCJncmlkLWl0ZW1cIiBvbmNsaWNrPVwiZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMDAnLDEpXCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRvcC1sZWZ0XCI+5LuF5LiA5qyhPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJncmlkLWl0ZW0tdGV4dFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4XCIgc3JjPVwiL0NvbW1vbi8vaW1nL2ljb25fZ29sZC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwOyBmb250LXNpemU6IDQ1cHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+MTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogIzAwMDsgZm9udC1zaXplOiAyMHB4XCI+5YWDPC9zcGFuPlxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ0eDNcIiBjbGFzcz1cImdyaWQtaXRlbVwiIG9uY2xpY2s9XCJnZXR3aXRoZHJhdygnQU1PVU5UXzUwMDAnLDUwKVwiPlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0b3AtbGVmdFwiPuavj+aXpeaPkOeOsDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZ3JpZC1pdGVtLXRleHRcIj5cclxuICAgICAgICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDQwcHg7IGhlaWdodDogNDBweFwiIHNyYz1cIi9Db21tb24vaW1nL2ljb25fZ29sZC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwOyBmb250LXNpemU6IDQ1cHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+NTA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDA7IGZvbnQtc2l6ZTogMjBweFwiPuWFgzwvc3Bhbj5cclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwidHg0XCIgY2xhc3M9XCJncmlkLWl0ZW1cIiBvbmNsaWNrPVwiZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMDAwMCcsMTAwKVwiPlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0b3AtbGVmdFwiPuS7heS4gOasoTwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZ3JpZC1pdGVtLXRleHRcIj5cclxuICAgICAgICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDQwcHg7IGhlaWdodDogNDBweFwiIHNyYz1cIi9Db21tb24vaW1nL2ljb25fZ29sZC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwOyBmb250LXNpemU6IDQ1cHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+MTAwPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwOyBmb250LXNpemU6IDIwcHhcIj7lhYM8L3NwYW4+XHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImJ0bXZpZXdcIj5cclxuICAgICAgPHRhYnMgY2xhc3M9XCJ0YWJzXCIgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cclxuICAgICAgICA8dGFiLWJhciBjbGFzcz1cInRhYi1iYXJcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7mlLbnm4rorrDlvZU8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5o+Q546w6K6w5b2VPC90ZXh0PlxyXG4gICAgICAgIDwvdGFiLWJhcj5cclxuICAgICAgICA8dGFiLWNvbnRlbnQgaWY9XCJ7e2xpc3RzaG93fX1cIiBjbGFzcz1cInRhYi1jb250ZW50XCIgc2Nyb2xsYWJsZT1cInt7c2Nyb2xsYWJsZX19XCI+XHJcbiAgICAgICAgICA8bGlzdCBjbGFzcz1cImxpc3RcIj5cclxuICAgICAgICAgICAgPGxpc3QtaXRlbSB0eXBlPVwibGlzdEl0ZW1cIiBmb3I9XCJ7e2xpc3REYXRhfX1cIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDlweDsgZm9udC1zaXplOiAyOHB4OyBjb2xvcjogIzAwMDAwMDsgZm9udC13ZWlnaHQ6IGJvbGRcIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNHB4OyBjb2xvcjogIzgyODI4MlwiPnt7JGl0ZW0uY3JlYXRlZER0fX08L3RleHQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiaGVpZ2h0OiA1MHB4OyBib3JkZXItcmFkaXVzOiA5NnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWI2MzUyOyBmb250LXNpemU6IDI2cHg7IGNvbG9yOiAjZmZmOyBwYWRkaW5nLWxlZnQ6IDIycHg7IHBhZGRpbmctcmlnaHQ6IDIycHg7IHBhZGRpbmctdG9wOiAxcHg7IHBhZGRpbmctYm90dG9tOiAxcHhcIj4re3skaXRlbS5hbW91bnR9feWFgzwvdGV4dD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9saXN0LWl0ZW0+XHJcbiAgICAgICAgICA8L2xpc3Q+XHJcblxyXG4gICAgICAgICAgPGxpc3QgY2xhc3M9XCJsaXN0XCI+XHJcbiAgICAgICAgICAgIDxsaXN0LWl0ZW0gdHlwZT1cImxpc3RJdGVtXCIgZm9yPVwie3tsaXN0RGF0YX19XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cIj5cclxuICAgICAgICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiA5cHg7IGZvbnQtc2l6ZTogMjhweDsgY29sb3I6ICMwMDAwMDA7IGZvbnQtd2VpZ2h0OiBib2xkXCI+e3skaXRlbS50aXRsZX19PC90ZXh0PlxyXG4gICAgICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjRweDsgY29sb3I6ICM4MjgyODJcIj57eyRpdGVtLmNyZWF0ZWREdH19PC90ZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxNDBweDsgaGVpZ2h0OiA1MHB4OyBib3JkZXItcmFkaXVzOiA5NnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWI2MzUyOyBmb250LXNpemU6IDI2cHg7IGNvbG9yOiAjZmZmOyBwYWRkaW5nLWxlZnQ6IDIycHg7IHBhZGRpbmctcmlnaHQ6IDIycHg7IHBhZGRpbmctdG9wOiAxcHg7IHBhZGRpbmctYm90dG9tOiAxcHhcIj57eyRpdGVtLmFtb3VudH195YWDPC90ZXh0PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpc3QtaXRlbT5cclxuICAgICAgICAgIDwvbGlzdD5cclxuICAgICAgICA8L3RhYi1jb250ZW50PlxyXG4gICAgICA8L3RhYnM+XHJcblxyXG4gICAgICA8dGV4dCBpZj1cInt7IWxpc3RzaG93fX1cIiBzdHlsZT1cImZvbnQtc2l6ZTogMzJweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmbGV4OiAxMFwiPuaaguaXoOebuOWFs+iusOW9lTwvdGV4dD5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJtYXNrXCIgaWY9XCJ7e2RpYWxvZ192aXNpYmxlfX1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3hcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPuinhOWImeivtOaYjjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPHRleHQ+e3tydWxlc319PC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5ib3hcIiBvbmNsaWNrPVwib3BlbkRpYWxvZyhmYWxzZSlcIj5cclxuICAgICAgICAgICAgICA8dGV4dD7miJHlt7Lnn6XmmZM8L3RleHQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGlhbG9nLWJveCBzaG93LWRpYWxvZz1cInt7c2hvd0RpYWxvZ319XCIgZGlhbG9nLWRhdGE9XCJ7e2RpYWxvZ0RhdGF9fVwiIG9uZW1pdC1zdWNjZXNzPVwic3VjY2Vzc0RpYWxvZ1wiIG9uZW1pdC1jbG9uZT1cImNsb25lRGlhbG9nXCI+PC9kaWFsb2ctYm94PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuXHJcblxyXG48c2NyaXB0PlxyXG5cclxuICBpbXBvcnQgZXhhbXBsZSBmcm9tICcuLi9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyc7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwcml2YXRlOiB7XHJcbiAgICAgIHJ1bGVzOiBgMS4g5LiA5Liq6LSm5Y+35LiU5LiA5Liq6K6+5aSH77yM5q+P5pel5Y+q6IO95o+Q546w5LiA5qyhXFxuMi4g5o+Q546w5ZCOMX4z5Liq5bel5L2c5pel5Yiw6LSmXFxuMy4g5bmz5Y+w5Lya5qC55o2u6L+Q6JCl6IO95Yqb6K6+572u5LiN5ZCM55qE5qGj5L2N6aKd5bqm77yM5YW35L2T5Lul5o+Q546w6aG16Z2i5bGV56S65Li65YeGXFxuNC4g5LiA5Liq6LSm5Y+35Y+q6IO957uRMeasoeaPkOeOsOi0puaItyzor7fosKjmhY7kvb/nlKhcXG41LiDoi6Xmj5DnjrDlpLHotKXvvIzmj5DnjrDph5Hpop3lsIbov5Tov5jliLDmgqjnmoTotKbmiLdcXG42LiDkuLrkvr/kuo7mgqjml6XluLjmj5DnjrDvvIzor7fkvb/nlKjmnKzkurrmlK/ku5jlrp3otKblj7fvvIznu5HlrprkuK3kvJrov5vooYzkv6Hmga/moKHpqozjgIJgLFxyXG4gICAgICBsaXN0RGF0YTogW10sXHJcbiAgICAgIGxpc3RzaG93OiBmYWxzZSxcclxuICAgICAgZGlhbG9nX3Zpc2libGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dfdmlzaWJsZTI6IGZhbHNlLFxyXG4gICAgICBzaG93RGlhbG9nOiBmYWxzZSxcclxuICAgICAgZGlhbG9nRGF0YToge30sXHJcbiAgICAgIHVzZXJEYXRhOiB7fSxcclxuICAgICAgdXNlcmJhbGFuY2U6IDAsLy/nlKjmiLfmg7PopoHmj5DnjrDnmoTph5Hpop1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG9uSW5pdCgpIHtcclxuXHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VGbGFnID0gYXdhaXQgJHByb2Nlc3NEYXRhLmdldFN0b3JhZ2UoXCJfUFJJVkFDXCIpO1xyXG4gICAgICBpZiAoc3RvcmFnZUZsYWcpIHtcclxuICAgICAgICAvL+aPkuWxj+W5v+WRilxyXG4gICAgICAgICR1dGlscy50YWJsZVBsYXF1ZSh0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLmludGVyc3RpdGlhbEFkVW5pdElkKVxyXG4gICAgICB9ZWxzZSB7ICAgLy/mnKrmjojmnYPvvIzlvLnlh7rmjojmnYPor6Lpl65cclxuICAgICAgICBjb25zb2xlLmxvZygn55So5oi35o6I5p2DPSAnLCBzdG9yYWdlRmxhZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+acquaOiOadgyzkuI3liqDovb3mj5LlsY/lub/lkYonKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcblxyXG4gICAgICAkdW1lbmdfc3RhdC5yZXN1bWUodGhpcylcclxuICAgICAgY29uc29sZS5sb2coJ+aPkOeOsCBvblNob3coKS0tLS0tLS0tLS0tLS0tLS0tPicpO1xyXG4gICAgICB0aGlzLmdldFVzZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25IaWRlKCkge1xyXG4gICAgICAkdW1lbmdfc3RhdC5wYXVzZSh0aGlzKTsvL+WcqG9uSGlkZeaWueazleeahOesrOS4gOihjOWKoOWFpeatpOS7o+eggVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2V0VXNlcigpIHtcclxuICAgICAgJGFwaXMudXNlci5nZXRVc2VySW5mbygpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfkv6Hmga8tLS0tLS0tLS0tLS0tLS0tLT4nICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIC8v5Y+v55So5YC8Oi8v6K6w5b2V57G75Z6LLCBSRVZFTlVFKOaUtuebiiksIEVYUEVORElUVVJFKOaPkOeOsCks5Y+v55So5YC8OlJFVkVOVUUsRVhQRU5ESVRVUkVcclxuICAgICAgY29uc29sZS5sb2coZS5pbmRleCk7XHJcbiAgICAgIGlmIChlLmluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmQoJ1JFVkVOVUUnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVjb3JkKCdFWFBFTkRJVFVSRScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+aPkOeOsFxyXG4gICAgZ2V0d2l0aGRyYXcoYSwgdWIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCLmj5DnjrBUQWc6XCIgKyBhICsgXCIs6ZyA6KaB5o+Q546w55qE6YeR6aKd77yaXCIgKyB1Yik7XHJcblxyXG4gICAgICAvL+S9memineaYr+WQpuWkp+S6juaPkOeOsOmHkeminVxyXG4gICAgICBpZiAodGhpcy51c2VyRGF0YS5iYWxhbmNlIDwgdWIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS9memineS4jei2s++8gVwiKTtcclxuICAgICAgICB0aGlzLm9wZW5EaWFsb2cyKClcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8v5omL5py65Y+35Li656m677yM5Y2z5pyq55m75b2VXHJcbiAgICAgIGlmICghdGhpcy51c2VyRGF0YS5sb2dpblBob25lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLfmiYvmnLrlj7fkuLrnqbrvvIzmnKrnmbvlvZUgXCIpO1xyXG4gICAgICAgIHRoaXMub3BlbkxvZ2luKCk7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4YW1wbGUud2l0aGRyYXcoe1xyXG4gICAgICAgIGFtb3VudDogYVxyXG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5o+Q546w5oiQ5YqfOicsIHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgdGhpcy53aXRoZHJhd1N1dWNlc3MocmVzcG9uc2UuZGF0YS5hbW91bnQpO1xyXG4gICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfmj5DnjrDlpLHotKU6JywgZXJyb3IpO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGUgPSBKU09OLnBhcnNlKGVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGNvZGUgPSBlLmNvZGU7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZS5tZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChjb2RlKSB7XHJcblxyXG4gICAgICAgICAgICAgIGNhc2UgJzMwMDAwMCc6XHJcbiAgICAgICAgICAgICAgICAvL+aPkOeOsOasoeaVsOW3sueUqOWujFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nMyhtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgIGNhc2UgJzQwMDAwMCc6XHJcblxyXG4gICAgICAgICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnIOaPkOeOsOWksei0pSEgJyArIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgIGdyYXZpdHk6IFwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICczMTAwMDcnOlxyXG4gICAgICAgICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnIOaPkOeOsOWksei0pSEgJyArIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgIGdyYXZpdHk6IFwiY2VudGVyXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aUtuasvui0puWPt+S4jeWtmOWcqOaIluWnk+WQjeacieivr1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXlBY2NvdW50KClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJzMxMDAwNCc6XHJcbiAgICAgICAgICAgICAgICAvLyDkvZnpop3kuI3otrNcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZzIoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWFtuS7liBjb2RlIOeahOmAu+i+kVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPdGhlciBjb2RlOiBcIiArIGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ+aPkOeOsOWksei0pWVycjonICsgZSxcclxuICAgICAgICAgICAgICBncmF2aXR5OiAnYm90dG9tJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v6K6+572u5pSv5LuY5a6d6LSm5Y+3XHJcbiAgICBzZXRQYXlBY2NvdW50KCkge1xyXG5cclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX3NldFBheSdcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5Mb2dpbigpIHtcclxuICAgICAgdGhpcy5kaWFsb2dEYXRhID0ge1xyXG4gICAgICAgIGhhZGluZzogXCLmj5DnpLpcIixcclxuICAgICAgICBzdWJoZWFkaW5nOiBcIuivt+eZu+W9leWQjuWGjeS9v+eUqOivpeWKn+iDvVwiLFxyXG4gICAgICAgIGljb25UeXBlOiBcImhpbnRcIixcclxuICAgICAgICBjbG9uZUJ0bjogXCLlj5Yg5raIXCIsXHJcbiAgICAgICAgc3VjY2Vzc0J0bjogXCLnmbvlvZVcIlxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IHRydWVcclxuICAgIH0sXHJcbiAgICAvL+aJk+W8gOeZu+W9lemhtemdolxyXG4gICAgc3VjY2Vzc0RpYWxvZygpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmRpYWxvZ0RhdGEuc3VjY2Vzc0J0biA9PT0gXCLnmbvlvZVcIikgey8v5Y6755m75b2VXHJcbiAgICAgICAgdGhpcy5zaG93RGlhbG9nID0gZmFsc2VcclxuICAgICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgdXJpOiAnUGFnZV9sb2dpbidcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL+WFtuS7luehruiupOWKn+iDvVxyXG4gICAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IGZhbHNlXHJcbiAgICAgICAgJHJvdXRlci5iYWNrKCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5L2Z6aKd5LiN6LazXHJcbiAgICBvcGVuRGlhbG9nMigpIHtcclxuXHJcbiAgICAgIHRoaXMuZGlhbG9nRGF0YSA9IHtcclxuICAgICAgICBoYWRpbmc6IFwi5o+Q56S6XCIsXHJcbiAgICAgICAgc3ViaGVhZGluZzogXCLkvZnpop3kuI3otrPvvIzor7flsJ3or5Xlhbbku5bpop3luqbmiJbnu6fnu63otZrpkrFcIixcclxuICAgICAgICBpY29uVHlwZTogXCJoaW50XCIsXHJcbiAgICAgICAgY2xvbmVCdG46IFwi5o2i5Liq6aKd5bqmXCIsXHJcbiAgICAgICAgc3VjY2Vzc0J0bjogXCLnu6fnu63otZrpkrFcIlxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgLy/kvZnpop3kuI3otrNcclxuICAgIG9wZW5EaWFsb2czKG1lc3NhZ2UpIHtcclxuXHJcbiAgICAgIHRoaXMuZGlhbG9nRGF0YSA9IHtcclxuICAgICAgICBoYWRpbmc6IFwi5o+Q56S6XCIsXHJcbiAgICAgICAgc3ViaGVhZGluZzogbWVzc2FnZSxcclxuICAgICAgICBpY29uVHlwZTogXCJoaW50XCIsXHJcbiAgICAgICAgY2xvbmVCdG46IFwi5YWz6ZetXCIsXHJcbiAgICAgICAgc3VjY2Vzc0J0bjogXCLnu6fnu63otZrpkrFcIlxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IHRydWVcclxuICAgIH0sXHJcbiAgICAvL+aPkOeOsOaIkOWKn1xyXG4gICAgd2l0aGRyYXdTdXVjZXNzKGFtb3VudCkge1xyXG4gICAgICB0aGlzLmRpYWxvZ0RhdGEgPSB7XHJcbiAgICAgICAgaGFkaW5nOiBcIuaPkOeOsOaIkOWKn1wiLFxyXG4gICAgICAgIHN1YmhlYWRpbmc6IGDmiJDlip/mj5DnjrAke2Ftb3VudH3lhYNgLFxyXG4gICAgICAgIGljb25UeXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICBjbG9uZUJ0bjogXCLlhbPpl61cIixcclxuICAgICAgICBzdWNjZXNzQnRuOiBcIue7p+e7rei1mumSsVwiXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8v6I635Y+W6K6w5b2V5YiX6KGoXHJcbiAgICByZWNvcmQodHlwZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuiusOW9leexu+WeizogXCIgKyB0eXBlKTtcclxuICAgICAgZXhhbXBsZS5yZWNvcmQoe1xyXG4gICAgICAgIHR5cGU6IHR5cGVcclxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluaIkOWKnzonLCByZXNwb25zZSk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhLnJlY29yZHNcclxuXHJcbiAgICAgICAgaWYgKGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMubGlzdHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5saXN0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubGlzdHNob3cgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGlzdERhdGEgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcign6I635Y+W5aSx6LSlOicsIGVycm9yKTtcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShlcnJvcikubWVzc2FnZTtcclxuICAgICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJyDmj5DnjrDlpLHotKUhICcgKyBtZXNzYWdlLFxyXG4gICAgICAgICAgICBncmF2aXR5OiBcImNlbnRlclwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuRGlhbG9nKGIpIHtcclxuICAgICAgdGhpcy5kaWFsb2dfdmlzaWJsZSA9IGJcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGJpbmRBZmZpcm0oKSB7XHJcbiAgICAgIHRoaXMuZGlhbG9nX3Zpc2libGUyID0gZmFsc2VcclxuICAgIH0sXHJcbiAgICBjbG9uZURpYWxvZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxyXG4gIC5tYXNrIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGZsZXg6IDE7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUsIDUsIDUsIDAuNik7XHJcblxyXG4gICAgLmRpYWxvZyB7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMycHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDYwcHg7XHJcbiAgICAgIHBhZGRpbmc6IDI2cHg7XHJcbiAgICAgIHdpZHRoOiA4NCU7XHJcbiAgICAgICYtYm9yZGVyIHtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTdlN2U3O1xyXG4gICAgICB9XHJcbiAgICAgIC5ib3gge1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgLnRvcCB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcclxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAuY29udGVudCB7XHJcbiAgICAgICAgICBwYWRkaW5nOiAzMHB4O1xyXG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNTBweDtcclxuICAgICAgICAgIGNvbG9yOiAjODI4MjgyO1xyXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAuYnRuIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG5cclxuICAgICAgICAuYnRuYm94IHtcclxuICAgICAgICAgIHRleHQge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgaGVpZ2h0OiA4OHB4O1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjJmZjtcclxuICAgICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5idG5ib3gxIHtcclxuICAgICAgICAgIGZsZXg6IDE7XHJcblxyXG4gICAgICAgICAgdGV4dCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLmJ0bmJveDIge1xyXG4gICAgICAgICAgZmxleDogMTtcclxuXHJcbiAgICAgICAgICB0ZXh0IHtcclxuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTtcclxuICAgICAgICAgICAgd2lkdGg6IDI3MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBhZGRpbmc6IDI3cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gIH1cclxuICAuZ3JvdXAge1xyXG4gICAgaGVpZ2h0OiAxNjJweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2dyb3VwLnBuZyk7XHJcbiAgfVxyXG4gIC50b3B2aWV3IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBoZWlnaHQ6IDI0MHB4O1xyXG4gICAgd2lkdGg6IDcwMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgfVxyXG5cclxuICAubWlkdmlldyB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB3aWR0aDogNzAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjdweDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDIwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDIycHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgLmJ0bXZpZXcge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHdpZHRoOiA3MDJweDtcclxuICAgIGhlaWdodDogNTAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG1hcmdpbi10b3A6IDI3cHg7XHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMnB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMjJweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgfVxyXG5cclxuICAuZ3JpZC1pdGVtIHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAvKiDmsLTlubPlsYXkuK0gKi9cclxuICAgIHdpZHRoOiAzMTBweDtcclxuICAgIGhlaWdodDogMTI0cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBib3JkZXI6IDNweCBzb2xpZCAjZWI2MzUyO1xyXG4gIH1cclxuICAudG9wLWxlZnQge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxOHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMThweDtcclxuICAgIHBhZGRpbmctdG9wOiA4cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViNjM1MjtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjBweDtcclxuICB9XHJcbiAgLmdyaWQtaXRlbS10ZXh0IHtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIG1hcmdpbi10b3A6IDQ1cHg7XHJcbiAgfVxyXG4gIC50YWJzIHtcclxuICAgIGZsZXg6IDE7XHJcblxyXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2JkMGY4MzsgKi9cclxuICB9XHJcbiAgLnRhYi1jb250ZW50IHtcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG4gIC50YWItYmFyIHtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICBib3JkZXItY29sb3I6ICNiYmJiYmI7XHJcbiAgICBjb2xvcjogI2JiYmJiYjtcclxuICB9XHJcbiAgLnRhYi10ZXh0IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjODI4MjgyO1xyXG4gICAgZm9udC1zaXplOiAzMXB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDZweDtcclxuICB9XHJcbiAgLnRhYi10ZXh0OmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuXHJcbiAgICBib3JkZXItYm90dG9tLXdpZHRoOiA0cHg7XHJcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjOTVmZjM3O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG4gIC5pdGVtLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMzBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuICAuaXRlbS1jb250ZW50IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICB9XHJcbiAgLml0ZW0tdGl0bGUge1xyXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICAgIGNvbG9yOiAjYWFhYWFhO1xyXG4gIH1cclxuXHJcbiAgLmxpc3Qge1xyXG4gICAgbGF5b3V0LXR5cGU6IHN0YWdnZXI7XHJcbiAgfVxyXG5cclxuICAubGlzdC1pdGVtIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxOHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMThweDtcclxuICAgIHBhZGRpbmctdG9wOiAyNXB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDI1cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XHJcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZTdlN2U3O1xyXG4gIH1cclxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1wYWdlXCIgc2hvdz1cInt7c2hvd0RpYWxvZ319XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYmlnLWNvbnRlbnRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGFkaW5nXCI+PHRleHQgY2xhc3M9XCJ0eHRcIj57e2RpYWxvZ0RhdGEuaGFkaW5nfX08L3RleHQ+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInN1YmhlYWRpbmdcIj48dGV4dCBjbGFzcz1cInR4dFwiPnt7ZGlhbG9nRGF0YS5zdWJoZWFkaW5nfX08L3RleHQ+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bkxpc3RcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1idG5cIiBAY2xpY2s9XCJjbG9zZUJ0blwiPjx0ZXh0IGNsYXNzPVwidHh0XCI+e3tkaWFsb2dEYXRhLmNsb25lQnRufX08L3RleHQ+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VjY2Vzcy1idG5cIiBAY2xpY2s9XCJjbGlja1N1Y2Nlc3NcIj48dGV4dCBjbGFzcz1cInR4dFwiPnt7ZGlhbG9nRGF0YS5zdWNjZXNzQnRufX08L3RleHQ+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1ib3hcIiBzaG93PVwie3tzaG93RGlhbG9nfX1cIj5cclxuICAgICAgICA8aW1hZ2Ugc3JjPVwie3tpY29uRGF0YVtkaWFsb2dEYXRhLmljb25UeXBlXX19XCIgY2xhc3M9XCJpY29uXCI+PC9pbWFnZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGRpYWxvZ0RhdGE6IHt9LFxyXG4gICAgICBpY29uRGF0YToge1xyXG4gICAgICAgIHN1Y2Nlc3M6ICcuLi9Db21tb24vaW1nL3N1Y2Nlc3MucG5nJyxcclxuICAgICAgICBoaW50OiAnLi4vQ29tbW9uL2ltZy9pY29uX3RzLnBuZycsXHJcbiAgICAgICAgd2FybjogXCIuLi9Db21tb24vaW1nL2ljb25fdHMucG5nXCJcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgIHNob3dEaWFsb2c6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpYWxvZ0RhdGE6IHtcclxuICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjbGlja1N1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+aIkOWKn+aMiemSricpO1xyXG4gICAgICB0aGlzLiRlbWl0KCdlbWl0U3VjY2VzcycpXHJcbiAgICB9LFxyXG4gICAgY2xvc2VCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+WFs+mXrScpO1xyXG4gICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvbmUnKVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cclxuICBAaW1wb3J0IFwiLi9pbmRleC5sZXNzXCI7XHJcbjwvc3R5bGU+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5tYXNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1zdGFydFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSg1LDUsNSwwLjYpXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjYwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyNnB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyNnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjZweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyNnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjg0JVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZy1ib3JkZXJcIjoge1xuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U3ZTdlN1wiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlXCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAuY29udGVudFwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94IHRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveDFcIjoge1xuICAgIFwiZmxleFwiOiAxXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3gxIHRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveDJcIjoge1xuICAgIFwiZmxleFwiOiAxXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3gyIHRleHRcIjoge1xuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwid2lkdGhcIjogXCIyNzBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImNvbG9yXCI6IFwiIzY2NjY2NlwiXG4gIH0sXG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjdweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjdweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI3cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjdweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiXG4gIH0sXG4gIFwiLmdyb3VwXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjE2MnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2dyb3VwLnBuZ1wiXG4gIH0sXG4gIFwiLnRvcHZpZXdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMjQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5taWR2aWV3XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjJweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjJweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmJ0bXZpZXdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTAlXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjJweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjJweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmdyaWQtaXRlbVwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIzMTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTI0cHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjhweFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCI4cHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjhweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjhweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIzcHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIzcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiM3B4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIzcHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlYjYzNTJcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2ViNjM1MlwiXG4gIH0sXG4gIFwiLnRvcC1sZWZ0XCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMThweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMThweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjhweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmdyaWQtaXRlbS10ZXh0XCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjQ1cHhcIlxuICB9LFxuICBcIi50YWJzXCI6IHtcbiAgICBcImZsZXhcIjogMVxuICB9LFxuICBcIi50YWItY29udGVudFwiOiB7XG4gICAgXCJmbGV4XCI6IDFcbiAgfSxcbiAgXCIudGFiLWJhclwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCIxMDBweFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJjb2xvclwiOiBcIiNiYmJiYmJcIlxuICB9LFxuICBcIi50YWItdGV4dFwiOiB7XG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNnB4XCIsXG4gICAgXCJjb2xvcjphY3RpdmVcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aDphY3RpdmVcIjogXCI0cHhcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yOmFjdGl2ZVwiOiBcIiM5NWZmMzdcIixcbiAgICBcImZvbnRXZWlnaHQ6YWN0aXZlXCI6IFwiYm9sZFwiXG4gIH0sXG4gIFwiLml0ZW0tY29udGFpbmVyXCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5pdGVtLWNvbnRlbnRcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5pdGVtLXRpdGxlXCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1MHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjYWFhYWFhXCJcbiAgfSxcbiAgXCIubGlzdFwiOiB7XG4gICAgXCJsYXlvdXRUeXBlXCI6IFwic3RhZ2dlclwiXG4gIH0sXG4gIFwiLmxpc3QtaXRlbVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMThweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMThweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI1cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyNXB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlN2U3ZTdcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5kaWFsb2ctcGFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5iaWctY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjYwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmJpZy1jb250ZW50IC5pY29uLWJveFwiOiB7XG4gICAgXCJ6SW5kZXhcIjogOTk5LFxuICAgIFwidG9wXCI6IFwiLTQ2MHB4XCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmJpZy1jb250ZW50IC5pY29uLWJveCAuaWNvblwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEyMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgIFwiekluZGV4XCI6IDk5OVxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjYwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzOTRweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzJweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiekluZGV4XCI6IDEwXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5oYWRpbmdcIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiOTRweFwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5oYWRpbmcgLnR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzFhMWExYVwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjQ0cHhcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuc3ViaGVhZGluZ1wiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuc3ViaGVhZGluZyAudHh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNDAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuYnRuTGlzdFwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5kaWFsb2ctcGFnZSAuY29udGVudCAuYnRuTGlzdCAuY2xvc2UtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmNvbnRlbnQgLmJ0bkxpc3QgLmNsb3NlLWJ0biAudHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCJcbiAgfSxcbiAgXCIuZGlhbG9nLXBhZ2UgLmNvbnRlbnQgLmJ0bkxpc3QgLnN1Y2Nlc3MtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMEIyRkZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmRpYWxvZy1wYWdlIC5jb250ZW50IC5idG5MaXN0IC5zdWNjZXNzLWJ0biAudHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNDBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRvcHZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZ3JvdXBcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5b2T5YmN5L2Z6aKdXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3BcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMzBweFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgXCJib3R0b21cIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMzBweFwiLFxuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVzZXJEYXRhLmJhbGFuY2UpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiODBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhYNcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTJweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMub3BlbkRpYWxvZyh0cnVlLGV2dCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjhweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIxOHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxOHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcImJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICAgICAgICAgICAgICBcInJpZ2h0XCI6IFwiMzBweFwiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLop4TliJnor7TmmI5cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U3NTg0NlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgXCJib3R0b21cIjogXCIxMnB4XCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCIzMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaPkOeOsOaWueW8j++8mlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvaWNvbl9wYXkucG5nXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjI0cHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaUr+S7mOWuneaPkOeOsFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCI1cHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtaWR2aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMzBweFwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxNXB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTMwcHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI1OHB4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmj5DnjrDph5Hpop1cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTI1cHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQycHhcIixcbiAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzFweFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgIFwiZmxleFdyYXBcIjogXCJ3cmFwXCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcInR4MVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiaWRcIjogXCJ0eDFcIixcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZ3JpZC1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLmdldHdpdGhkcmF3KCdBTU9VTlRfMTAnLDAuMSxldnQpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5q+P5pel5o+Q546wXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWxlZnRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImdyaWQtaXRlbS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi8vaW1nL2ljb25fZ29sZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIwLjFcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwidHgyXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJpZFwiOiBcInR4MlwiLFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJncmlkLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMDAnLDEsZXZ0KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7heS4gOasoVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJncmlkLWl0ZW0tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vL2ltZy9pY29uX2dvbGQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjQwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWDXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ0eDNcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImlkXCI6IFwidHgzXCIsXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImdyaWQtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5nZXR3aXRoZHJhdygnQU1PVU5UXzUwMDAnLDUwLGV2dCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmr4/ml6Xmj5DnjrBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JpZC1pdGVtLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX2dvbGQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjQwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwidHg0XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJpZFwiOiBcInR4NFwiLFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJncmlkLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuZ2V0d2l0aGRyYXcoJ0FNT1VOVF8xMDAwMCcsMTAwLGV2dCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLku4XkuIDmrKFcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3AtbGVmdFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JpZC1pdGVtLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX2dvbGQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjQwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhYNcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYnRtdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWJzXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGFic1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWJhclwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRhYi1iYXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pS255uK6K6w5b2VXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaPkOeOsOiusOW9lVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1jb250ZW50XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzY3JvbGxhYmxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2Nyb2xsYWJsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5saXN0c2hvdyl9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0YWItY29udGVudFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0SXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxpc3REYXRhKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3QtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiOXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmNyZWF0ZWREdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJysnKygodGhpcy4kaXRlbS5hbW91bnQpKSsn5YWDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiOTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNlYjYzNTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjFweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImxpc3RcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RJdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubGlzdERhdGEpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlzdC1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCI5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uY3JlYXRlZER0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMuJGl0ZW0uYW1vdW50KSkrJ+WFgyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxNDBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI5NnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ViNjM1MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjFweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5pqC5peg55u45YWz6K6w5b2VXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoIXRoaXMubGlzdHNob3cpfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJmbGV4XCI6IDEwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtYXNrXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nX3Zpc2libGUpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZGlhbG9nXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJib3hcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6KeE5YiZ6K+05piOXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5ydWxlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJidG5cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnRuYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLm9wZW5EaWFsb2coZmFsc2UsZXZ0KX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaIkeW3suefpeaZk1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpYWxvZy1ib3hcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic2hvd0RpYWxvZ1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dEaWFsb2cpfSxcbiAgICAgICAgXCJkaWFsb2dEYXRhXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nRGF0YSl9XG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImVtaXQtc3VjY2Vzc1wiOiBcInN1Y2Nlc3NEaWFsb2dcIixcbiAgICAgICAgXCJlbWl0LWNsb25lXCI6IFwiY2xvbmVEaWFsb2dcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7XG4gICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0RpYWxvZyl9XG4gIH0sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImRpYWxvZy1wYWdlXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYmlnLWNvbnRlbnRcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY29udGVudFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaGFkaW5nXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ0RhdGEuaGFkaW5nKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidHh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInN1YmhlYWRpbmdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nRGF0YS5zdWJoZWFkaW5nKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidHh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImJ0bkxpc3RcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1idG5cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQnRuXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ0RhdGEuY2xvbmVCdG4pfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3VjY2Vzcy1idG5cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsaWNrU3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dEYXRhLnN1Y2Nlc3NCdG4pfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaWNvbi1ib3hcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pY29uRGF0YVt0aGlzLmRpYWxvZ0RhdGEuaWNvblR5cGVdKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaWNvblwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9ZGlhbG9nLWJveCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGRpYWxvZ0JveFxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGRpYWxvZ0JveFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9kaWFsb2ctYm94JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2RpYWxvZ0JveC9pbmRleC51eD9uYW1lPWRpYWxvZy1ib3hcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPWRpYWxvZy1ib3ghLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX1RpeGlhblxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfVGl4aWFuXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2luZGV4JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4xLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
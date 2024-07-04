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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.sensor"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.storage"));
var _example = _interopRequireDefault(__webpack_require__(/*! ../../Common/helper/apis/example.js */ "./src/Common/helper/apis/example.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = {
  private: {
    url1: '',
    url2: '',
    componentData: {},
    goalDayKey: "GOAL_DAY",
    userDetailsKey: "UserDetails",
    stepSys: 0,
    steps_view: 0,
    stepsDayApi: 0,
    stepsWeekApi: 0,
    stepsMoonApi: 0,
    goal_day: 0,
    progress: 0,
    currentPage: -1,
    segments: ['今日', '周', '月'],
    segmentsTexts: ['今日步数', '本周步数', '本月步数'],
    segmentsText: "",
    body_weight: 60,
    body_height: 0,
    sex: 1,
    age: 0,
    mileage: "0.0",
    calories: "0.0",
    bmi: 0.0,
    tzl: 0.0,
    open1: false,
    open2: false,
    obj: {},
    isShow: false
  },
  async onInit() {
    console.log("onInit()");
    this.url1 = this.$app.$def.dataApp.url2;
    this.url2 = this.$app.$def.dataApp.url3;
    this.getGoalDaySteps();
    this.getUserDetails();
    this.apigetStpes();
  },
  onReady() {
    console.log("onReady()");
    this.updateBMITzl();
  },
  async getTreatyStorage() {
    this.subscribeStepCounter();
  },
  subscribeStepCounter() {
    this.isShow = true;
    _system.default.subscribeStepCounter({
      callback: ret => {
        console.log(`设备步数更新了！------>设备总步数=${ret.steps}`);
        $processData.setStorage("_PRIVAC", true);
        this.isShow = false;
        this.stepSys = ret.steps;
        this.apiuploadStpes(ret.steps);
      },
      fail: (data, code) => {
        console.log(`步数计数器订阅失败, code = ${code}`);
        this.isShow = false;
      }
    });
  },
  getGoalDaySteps() {
    var that = this;
    _system2.default.get({
      key: this.goalDayKey,
      default: 10000,
      success: function (ret) {
        console.info('storage.get(): ', JSON.stringify(ret));
        that.goal_day = ret;
      },
      fail: function (erromsg, errocode) {
        console.info('get fail --- ' + errocode + ':' + erromsg);
      }
    });
  },
  setGoalDaySteps(data) {
    _system2.default.set({
      key: this.goalDayKey,
      value: data,
      success: function (ret) {
        console.info('storage.set(): ', JSON.stringify(ret));
      },
      fail: function (erromsg, errocode) {
        console.info('set fail --- ' + errocode + ':' + erromsg);
      }
    });
  },
  getUserDetails() {
    var that = this;
    _system2.default.get({
      key: this.userDetailsKey,
      success: function (ret) {
        console.log('用户设定详情获取成功:', ret);
        if (ret && ret.trim()) {
          const userDetails = JSON.parse(ret);
          that.body_weight = Number(userDetails.body_weight) || that.body_weight;
          that.body_height = Number(userDetails.body_height) || that.body_height;
          that.sex = userDetails.sex !== undefined ? userDetails.sex : that.sex;
          that.age = Number(userDetails.age) || that.age;
          console.log('更新后的用户详情:', that.body_weight, that.body_height, that.sex, that.age);
          that.updateBMITzl();
        }
      },
      fail: function (erromsg, errocode) {
        console.info('get fail --- ' + errocode + ':' + erromsg);
      }
    });
  },
  setUserDetails() {
    const userDetails = {
      body_weight: this.body_weight,
      body_height: this.body_height,
      sex: this.sex,
      age: this.age
    };
    _system2.default.set({
      key: this.userDetailsKey,
      value: userDetails,
      success: function (ret) {
        console.log('用户详情保存成功:', ret);
      },
      fail: function (erromsg, errocode) {
        console.error('用户详情保存失败:', erromsg, errocode);
      }
    });
  },
  updateProgress() {
    var that = this;
    console.log(`更新步数进度！今日云步数=${that.stepsDayApi}`);
    const service_step = [that.stepsDayApi, that.stepsWeekApi, that.stepsMoonApi];
    const currentsStep = service_step[that.currentPage];
    const goals = [that.goal_day, that.goal_day * 7, that.goal_day * 30];
    const currentGoal = goals[that.currentPage];
    const stepRatio = currentsStep / currentGoal;
    this.progress = Math.min(stepRatio * 100, 100) * 0.66;
    this.steps_view = currentsStep;
    this.segmentsText = that.segmentsTexts[that.currentPage];
    console.log(`目前${that.segmentsText}进度 = ${Math.min(stepRatio * 100, 100).toFixed(1)}%`);
    this.updateMileageAndCalories();
  },
  updateMileageAndCalories() {
    var that = this;
    if (this.body_weight <= 0 || this.body_weight === '-') {
      this.calories = "0.0";
    } else {
      this.mileage = (that.steps_view * 0.6 / 1000).toFixed(2);
      this.calories = (0.0175 * that.body_weight * that.steps_view).toFixed(1);
    }
  },
  updateBMITzl() {
    if (this.body_weight <= 0 || this.body_height <= 0 || this.age <= 0 || this.body_weight === '-' || this.body_height === '-' || this.age === '-') {
      this.tzl = "---";
      this.bmi = "---";
    } else {
      const bmi = (this.body_weight / (this.body_height * 0.01) ** 2).toFixed(1);
      const param1 = 1.2 * parseFloat(bmi);
      const param2 = this.age * 0.23;
      const param3 = 5.4 + 10.8 * this.sex;
      this.tzl = parseFloat((param1 + param2 - param3).toFixed(1)) + "%";
      this.bmi = bmi;
    }
    this.updateMileageAndCalories();
  },
  openBasicInformationDialog() {
    console.log(`打开基本情况窗口`);
    this.open2 = true;
    this.obj = {
      title: '填写基本情况',
      fieldtype: "number",
      placeholder: "输入整数数字"
    };
  },
  openSetStepsDialog() {
    this.getTreatyStorage();
    console.log(`打开设定目标步数窗口`);
    this.open1 = true;
    this.obj = {
      title: '设置每日步数',
      fieldtype: "number",
      placeholder: "输入整数数字"
    };
  },
  enterSteps(evt) {
    this.open1 = false;
    const goal_stpe = evt.detail.event.value;
    console.log(`设定了目标步数：${goal_stpe}`);
    this.goal_day = goal_stpe;
    this.setGoalDaySteps(goal_stpe);
    this.updateProgress();
  },
  enterDetails(evt) {
    this.open2 = false;
    const kg = evt.detail.event.kg;
    const cm = evt.detail.event.cm;
    const age = evt.detail.event.age;
    const sex = evt.detail.event.sex;
    console.log(`设定了体重：${kg},身高：${cm},年龄：${age},sex:${sex}`);
    this.body_weight = kg;
    this.body_height = cm;
    this.age = age;
    this.sex = sex;
    this.setUserDetails();
    this.updateBMITzl();
  },
  close() {
    console.log(`关闭了窗口：`);
    this.open1 = false;
    this.open2 = false;
  },
  changeTabactive: function (e) {
    if (this.currentPage !== -1) {
      this.getTreatyStorage();
    }
    console.log(e.index);
    this.currentPage = e.index;
    this.apigetStpes();
  },
  apigetStpes() {
    var that = this;
    const types = ["TODAY", "WEEK", "MOON"];
    const apiKeys = ["stepsDayApi", "stepsWeekApi", "stepsMoonApi"];
    var t = types[that.currentPage];
    _example.default.getsteps({
      type: t
    }).then(response => {
      console.log(`获取《${t}》云步数成功！ ------>云步数=${response.data}`);
      that[apiKeys[that.currentPage]] = response.data;
      this.updateProgress();
    }).catch(error => {
      console.error(' 获取${t}步数失败:', error);
    });
  },
  apiuploadStpes(c) {
    var t = Date.now();
    console.log(`上传步数中---->步数=${c},t = ${t}`);
    _example.default.uploadsteps({
      count: c,
      "timestamp": t
    }).then(response => {
      console.log(' 上传步数successful:', response);
      this.stepsDayApi = response.data;
      this.updateProgress();
    }).catch(error => {
      console.error(' 上传步数failed:', error);
    });
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _example = _interopRequireDefault(__webpack_require__(/*! ../../Common/helper/apis/example.js */ "./src/Common/helper/apis/example.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = {
  private: {
    list30dayData: []
  },
  onInit() {
    this.$page.setTitleBar({
      text: '步数记录'
    });
  },
  onReady() {
    this.initChart();
    this.get30dayRecord();
  },
  get30dayRecord() {
    _example.default.getstepslist().then(response => {
      if (response && response.data) {
        console.log('获取最近30天记录-成功！:', response);
        this.list30dayData = this.formatData(response.data);
      } else {
        console.log('获取最近30天记录-失败，响应为空或没有数据！');
      }
    }).catch(error => {
      console.error(' 获取最近30天记录-失败！', error);
    });
  },
  formatData(data) {
    const maxSteps = 10000;
    return data.map(item => {
      let date = item.summaryDate.toString();
      let formattedDate = date.substring(4, 6) + '-' + date.substring(6, 8);
      const stepCount = parseInt(item.stepCount, 10);
      const percent = Math.round(stepCount / maxSteps * 100);
      return {
        summaryDate: formattedDate,
        stepCount: stepCount,
        percent: percent
      };
    });
  },
  initChart() {}
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

module.exports = {
  private: {
    userData: {}
  },
  onInit() {
    this.getUser();
  },
  getUser() {
    this.userData = this.$app.$def.dataApp.userData;
  },
  toLogin() {
    var phone = this.userData.loginPhone;
    if (phone) {
      return;
    }
    $router.push({
      uri: 'Page_login'
    });
  },
  pushPageTixian() {
    $router.push({
      uri: 'Page_Tixian'
    });
  },
  pushPageabout() {
    $router.push({
      uri: 'Page_about'
    });
  },
  pushPagefeedback() {
    $router.push({
      uri: 'feedback'
    });
  },
  pushPagelogOut() {
    $router.push({
      uri: 'logOut'
    });
  },
  pushPagepermissions() {
    $router.push({
      uri: 'permissions'
    });
  },
  openAd() {
    $router.push({
      uri: 'Page_cfd'
    });
  },
  addDesktop: function () {
    console.log('添加桌面');
    const shortcut = $app_require$("@app-module/system.shortcut");
    shortcut.hasInstalled({
      success: function (ret) {
        console.log('hasInstalled success ret---' + ret);
        if (ret) {
          $prompt.showToast({
            message: '桌面图标已创建',
            gravity: 'center'
          });
        } else {
          shortcut.install({
            message: '添加桌面方式更方便',
            success: function (ret) {
              console.log('handling createShortCut success');
            },
            fail: function (erromsg, errocode) {
              console.log('handling createShortCut fail');
            }.bind(this)
          });
        }
      }.bind(this),
      fail: function (erromsg, errocode) {
        console.log('hasInstalled fail ret---' + erromsg);
      }.bind(this),
      complete: function () {}
    });
  },
  pushweb(i) {
    var url = '';
    if (i === 1) {
      url = this.$app.$def.dataApp.url1;
    }
    if (i === 2) {
      url = this.$app.$def.dataApp.url2;
    }
    if (i === 3) {
      url = this.$app.$def.dataApp.url3;
    }
    $webview.loadUrl({
      url: url
    });
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

module.exports = {
  private: {
    datas: {
      color_normal: '#C8C8C8',
      color_active: '#00B2FF',
      show: true,
      list: [{
        i: 0,
        color: '#FF7500',
        pic: '/Common/img/bar_1.png',
        pic_choice: '/Common/img/bar_11.png',
        show: true,
        title: '首页'
      }, {
        i: 1,
        color: '#878787',
        pic: '/Common/img/bar_2.png',
        pic_choice: '/Common/img/bar_22.png',
        show: false,
        title: '步数'
      }, {
        i: 2,
        color: '#878787',
        pic: '/Common/img/bar_3.png',
        pic_choice: '/Common/img/bar_33.png',
        show: false,
        title: '我的'
      }]
    }
  },
  changeTabactive: function (e) {
    for (let i = 0; i < this.datas.list.length; i++) {
      let element = this.datas.list[i];
      element.show = false;
      element.color = this.datas.color_normal;
      if (i === e.index) {
        element.show = true;
        element.color = this.datas.color_active;
        if (e.index === 0) {
          $utils.hideBanerAd();
        } else {
          $utils.viewBanner();
        }
      }
    }
  },
  onInit: function () {},
  async onShow(options) {
    $umeng_stat.resume(this);
    console.log('主页 onShow()----------------->');
    this.getUser();
    const storageFlag = await $processData.getStorage("_PRIVAC");
    console.log('用户授权= ', storageFlag);
    if (storageFlag) {
      $utils.showBannerAd(this.$app.$def.dataApp.bannerAdUnitId, 135);
    } else {
      console.log('未授权,不加载广告');
    }
  },
  onHide() {
    $umeng_stat.pause(this);
  },
  getUser() {
    $apis.user.getUserInfo().then(res => {
      console.log('用户信息----------------->' + JSON.stringify(res));
      this.$app.$def.dataApp.userData.loginPhone = res.data.loginPhone;
      this.$app.$def.dataApp.userData.userId = res.data.userId;
      this.$app.$def.dataApp.userData.balance = res.data.balance;
    });
  },
  onHide() {
    $utils.destroyBanner();
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const toAngle = a => a / 180 * Math.PI;
const percent = a => toAngle(a / 100 * 360);
var _default = exports.default = {
  data() {
    return {
      beginAngle: toAngle(this.sAngle),
      startAngle: toAngle(this.sAngle),
      endAngle: percent(this.percent) + toAngle(this.sAngle),
      color: this.strokeColor
    };
  },
  props: {
    percent: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 100;
      }
    },
    size: {
      type: Number,
      default: 300
    },
    strokeWidth: {
      type: Number,
      default: 20
    },
    strokeColor: {
      type: String,
      default: "#2d8cf0"
    },
    strokeLinecap: {
      type: String,
      default: "round"
    },
    trailWidth: {
      type: Number,
      default: 20
    },
    trailColor: {
      type: String,
      default: "#eaeef2"
    },
    showTrail: {
      type: Boolean,
      default: true
    },
    sAngle: {
      type: Number,
      default: 0
    },
    anticlockwise: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: "canvasId"
    }
  },
  computed: {
    style() {
      return `width: ${this.size}px; height: ${this.size}px;`;
    }
  },
  onInit() {
    this.$watch("strokeColor", "watchStrokeColorChange");
    this.$watch("percent", "watchPercentChange");
    setTimeout(() => {
      const canvas = this.$element(this.id);
      this.ctx = canvas.getContext("2d");
      this.draw();
    }, 0);
  },
  watchStrokeColorChange(newVal) {
    this.color = newVal;
  },
  watchPercentChange(newVal, oldVal) {
    if (newVal <= 0) {
      newVal = 0;
    }
    if (newVal >= 100) {
      newVal = 100;
    }
    this.endAngle = percent(newVal) + this.beginAngle;
    this.clearTimer();
    this.draw();
  },
  draw() {
    const {
      anticlockwise,
      strokeLinecap,
      showTrail,
      size,
      strokeWidth,
      color,
      trailWidth,
      trailColor,
      ctx
    } = this;
    const position = size / 2;
    const radius = position - strokeWidth / 2;
    const p = 2 * Math.PI;
    const beginAngle = anticlockwise ? p - this.beginAngle : this.beginAngle;
    const startAngle = anticlockwise ? p - this.startAngle : this.startAngle;
    const endAngle = anticlockwise ? p - this.endAngle : this.endAngle;
    const step = (endAngle - startAngle) / 100;
    let tempEndAngle = startAngle;
    let count = 0;
    const _this = this;
    function drawBackground() {
      if (showTrail) {
        ctx.beginPath();
        ctx.arc(position, position, radius, beginAngle, 0.5);
        ctx.lineWidth = trailWidth;
        ctx.lineCap = strokeLinecap;
        ctx.strokeStyle = trailColor;
        ctx.stroke();
      }
    }
    function drawCircle(tempEndAngle) {
      ctx.beginPath();
      ctx.arc(position, position, radius, beginAngle, tempEndAngle, anticlockwise);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = strokeLinecap;
      ctx.stroke();
    }
    (function startDraw(ctx) {
      tempEndAngle += step;
      if (!anticlockwise && tempEndAngle <= beginAngle) {
        tempEndAngle = beginAngle;
      }
      if (!anticlockwise && tempEndAngle >= 2 * Math.PI + beginAngle) {
        tempEndAngle = 2 * Math.PI + beginAngle;
      }
      if (anticlockwise && tempEndAngle <= beginAngle - 2 * Math.PI) {
        tempEndAngle = beginAngle - 2 * Math.PI;
      }
      if (anticlockwise && tempEndAngle >= beginAngle) {
        tempEndAngle = beginAngle;
      }
      ctx.clearRect(0, 0, 0x7fffffff, 0x7fffffff);
      drawBackground();
      drawCircle(tempEndAngle);
      _this.startAngle = anticlockwise ? 2 * Math.PI - tempEndAngle : tempEndAngle;
      if (count >= 100) {
        return;
      }
      count++;
      _this.timer = setTimeout(() => {
        startDraw(ctx);
      }, 10);
    })(ctx);
  },
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  data: {
    showModal: false,
    setDialog: {},
    value: "",
    kg: "",
    cm: "",
    age: "",
    sex: 0,
    defaultOptions: {
      closable: false,
      title: "",
      content: "",
      buttons: [],
      cancel: "取消",
      affirm: "确定"
    },
    defaultPrompt: {
      title: "",
      content: "",
      value: "",
      kg: "",
      cm: "",
      age: "",
      fieldtype: "number",
      placeholder: "请输入文本",
      focus: false,
      idkg: false,
      inputStyle: {},
      maxlength: -1
    }
  },
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "默认标题"
    },
    content: {
      type: String,
      default: "默认内容"
    },
    dialogStyle: {
      type: Object,
      default: {}
    },
    dialogType: {
      type: String,
      default: "text"
    },
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: {}
    },
    prompt: {
      type: Object,
      default: {}
    }
  },
  onInit() {
    this.$watch("visible", "modalHandler");
    this.$watch("dialogStyle", "dialogStyleHandler");
    this.$watch("defaultPrompt.value", "valueHandler");
    this.resetData();
  },
  onReady() {
    if (this.dialogType === "prompt" && this.$visible !== false) {
      this.$element("focus").focus({
        focus: this.defaultPrompt.focus
      });
    }
    if (this.dialogType === "prompt1" && this.$visible !== false) {
      this.$element("idkg").focus({
        idkg: this.defaultPrompt.idkg
      });
    }
  },
  valueHandler(newV, oldV) {
    this.value = newV;
  },
  optionsHandler(newV, oldV) {
    newV.closable ? this.defaultOptions.closable = newV.closable : false;
    newV.title ? this.defaultOptions.title = newV.title : "";
    newV.content ? this.defaultOptions.content = newV.content : "";
    newV.buttons ? this.defaultOptions.buttons = newV.buttons : [];
    newV.cancel ? this.defaultOptions.cancel = newV.cancel : "";
    newV.affirm ? this.defaultOptions.affirm = newV.affirm : "";
  },
  promptHandler(newV, oldV) {
    newV.title ? this.defaultPrompt.title = newV.title : "";
    newV.content ? this.defaultPrompt.content = newV.content : "";
    newV.value ? this.defaultPrompt.value = newV.value : "";
    newV.kg ? this.defaultPrompt.kg = newV.kg : "";
    newV.cm ? this.defaultPrompt.cm = newV.cm : "";
    newV.age ? this.defaultPrompt.age = newV.age : "";
    newV.fieldtype ? this.defaultPrompt.fieldtype = newV.fieldtype : "";
    newV.placeholder ? this.defaultPrompt.placeholder = newV.placeholder : "";
    newV.focus ? this.defaultPrompt.focus = newV.focus : false;
    newV.inputStyle ? this.defaultPrompt.inputStyle = newV.inputStyle : {};
  },
  dialogStyleHandler(newV, oldV) {
    console.log(newV, oldV);
    this.setDialog = newV;
  },
  resetData() {
    if (this.visible === false) {
      this.defaultOptions = {
        closable: false,
        title: "",
        content: "",
        buttons: [],
        cancel: "取消",
        affirm: "确定"
      };
      this.defaultPrompt = {
        title: "",
        content: "",
        value: "",
        fieldtype: "number",
        placeholder: "请输入文本",
        focus: false,
        inputStyle: {}
      };
      this.setDialog = {};
    }
    this.$watch("options", "optionsHandler");
    this.$watch("prompt", "promptHandler");
    this.$watch("dialogStyle", "dialogStyleHandler");
    this.$watch("defaultPrompt.value", "valueHandler");
  },
  modalHandler(newV, oldV) {
    this.showModal = newV;
  },
  bindCancel(evt) {
    evt.stopPropagation();
    this.$emit("cancel", {
      event: evt
    });
    this.value = "";
    this.kg = "";
    this.cm = "";
    this.age = "";
  },
  bindChange(evt) {
    this.value = evt.value;
    console.log(`---->步数=${this.value}`);
    this.$emit("change", {
      event: evt
    });
  },
  bindChangekg(evt) {
    this.kg = evt.value;
    console.log(`---->体重=${evt.value}`);
    this.$emit("change", {
      event: evt
    });
  },
  bindChangecm(evt) {
    this.cm = evt.value;
    console.log(`---->身高=${evt.value}`);
    this.$emit("change", {
      event: evt
    });
  },
  bindChangeage(evt) {
    this.age = evt.value;
    console.log(`---->年龄=${evt.value}`);
    this.$emit("change", {
      event: evt
    });
  },
  bindAffirm(evt) {
    evt.stopPropagation();
    if (this.dialogType === "prompt") {
      evt.value = this.value;
      this.$emit("affirm", {
        event: evt
      });
      this.value = "";
    }
    if (this.dialogType === "prompt1") {
      evt.kg = this.kg;
      evt.cm = this.cm;
      evt.age = this.age;
      evt.sex = this.sex;
      this.$emit("affirm", {
        event: evt
      });
      console.log(`bindAffirm：${evt.kg},身高：${evt.cm},年龄：${evt.age},sex:${evt.sex}`);
      this.kg = "";
      this.cm = "";
      this.age = "";
      this.sex = 0;
    }
  },
  bindEnter(evt) {
    evt.stopPropagation();
    console.log(`---->步数=${evt.value}`);
    this.$emit("enter", {
      event: evt
    });
    if (this.dialogType === "prompt") {
      this.$element("focus").focus({
        focus: false
      });
      this.value = "";
    }
  },
  bindEnterkg(evt) {
    evt.stopPropagation();
    console.log(`---->体重=${evt.value}`);
    this.kg = evt.value;
  },
  bindEntercm(evt) {
    evt.stopPropagation();
    console.log(`---->身高=${evt.value}`);
    this.cm = evt.value;
  },
  bindEnterage(evt) {
    evt.stopPropagation();
    console.log(`---->年龄=${evt.value}`);
    this.age = evt.value;
  },
  changeTabactive: function (e) {
    console.log(e.index);
    this.sex = e.index;
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  data: {
    deviceDp: 0,
    deviceWidth: 0,
    reserveDialogStyle: false,
    btndisabled: false,
    screenWidth: 0
  },
  props: {
    backImg: {
      type: String,
      default: ""
    },
    zIndex: {
      default: 10000
    },
    title: {
      type: String,
      default: "隐私权限申请与保护指引"
    },
    showPop: {
      type: Boolean,
      default: false,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  onInit: function () {
    this.$watch('showPop', 'changeCancel');
    if (_system.default.getInfoSync) {
      const res = _system.default.getInfoSync();
      this.deviceDp = res.windowWidth / res.screenDensity;
      this.deviceWidth = res.windowLogicWidth;
      this.btndisabled = false;
      this.screenWidth = res.screenWidth;
      if (res.screenWidth > 1200 && res.screenHeight > 1200) {
        this.reserveDialogStyle = true;
      } else {
        this.reserveDialogStyle = false;
      }
      this.$watch('screenWidth', 'changeScreen');
    }
  },
  changeCancel() {
    if (this.showPop) {
      this.btndisabled = false;
    }
  },
  changeScreen() {
    if (this.screenWidth > 1200) {
      this.reserveDialogStyle = true;
    } else {
      this.reserveDialogStyle = false;
    }
  },
  async cancel() {
    this.btndisabled = true;
    await $processData.setStorage("_PRIVAC", false);
    this.$emit("cancel");
  },
  async sure() {
    await $processData.setStorage("_PRIVAC", true);
    this.$emit("agree");
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./src/Page_MainTab/Page_Home/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./src/Page_MainTab/Page_Home/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".header": {
    "flexDirection": "column",
    "paddingTop": "90px",
    "paddingRight": "90px",
    "paddingBottom": "90px",
    "paddingLeft": "90px",
    "backgroundColor": "#ffffff",
    "borderRadius": "30px",
    "position": "absolute",
    "alignItems": "flex-start",
    "top": "70px",
    "width": "700px",
    "height": "100%"
  },
  ".container": {
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "100%"
  },
  ".top_view": {
    "width": "100%",
    "height": "828px",
    "flexDirection": "column",
    "alignItems": "center",
    "backgroundImage": "/Common/img/group2.png",
    "backgroundSize": "cover",
    "backgroundPosition": "center"
  },
  ".bottom_view": {
    "paddingTop": "20px",
    "paddingLeft": "27px",
    "paddingRight": "27px",
    "width": "100%",
    "height": "750px",
    "flexDirection": "column",
    "alignItems": "center",
    "marginTop": "-10px",
    "backgroundColor": "#ffffff",
    "borderTopLeftRadius": "20px",
    "borderTopRightRadius": "20px"
  },
  ".icon-image": {
    "width": "44px",
    "height": "44px"
  },
  ".circle": {
    "marginTop": "25px"
  },
  ".text-container": {
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".title_stpes": {
    "fontSize": "28px",
    "fontWeight": "bold",
    "color": "#000000"
  },
  ".title_stpes_v": {
    "fontSize": "80px",
    "fontWeight": "bold",
    "color": "#000000"
  },
  ".details": {
    "width": "702px",
    "height": "175px",
    "backgroundColor": "#00b2ff",
    "bottom": "0px",
    "borderTopLeftRadius": "20px",
    "borderTopRightRadius": "20px",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  ".detail-item": {
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".detail-value": {
    "flex": 1,
    "flexDirection": "row",
    "alignItems": "flex-end"
  },
  ".larger-text": {
    "fontSize": "48px",
    "fontWeight": "bold",
    "color": "#ffffff"
  },
  ".larger2-text": {
    "color": "#000000",
    "fontSize": "48px",
    "fontWeight": "bold"
  },
  ".larger3-text": {
    "color": "#4b4b4b",
    "fontSize": "26px"
  },
  ".smaller-text": {
    "fontSize": "24px",
    "marginBottom": "5px",
    "color": "#ffffff"
  },
  ".n-text": {
    "fontSize": "26px",
    "color": "#ffffff",
    "marginTop": "5px",
    "fontWeight": "400"
  },
  ".tabs": {
    "width": "520px",
    "marginTop": "255px"
  },
  ".tab-bar": {
    "borderTopColor": "#bbbbbb",
    "borderRightColor": "#bbbbbb",
    "borderBottomColor": "#bbbbbb",
    "borderLeftColor": "#bbbbbb",
    "color": "#bbbbbb",
    "backgroundColor": "#000000",
    "borderRadius": "54px"
  },
  ".tab-text": {
    "textAlign": "center",
    "color": "#ffffff",
    "fontSize": "32px",
    "fontWeight": "bold",
    "width": "150px",
    "height": "65px",
    "borderRadius": "74px",
    "color:active": "#000000",
    "background:active": "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"270deg\"],\"values\":[\"#8fff34 0%\",\"#ebfd66\"]}]}"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./src/Page_MainTab/Page_Record/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!./src/Page_MainTab/Page_Record/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".list": {
    "layoutType": "stagger"
  },
  ".item": {
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center",
    "marginTop": "20px",
    "marginRight": "20px",
    "marginBottom": "20px",
    "marginLeft": "20px",
    "width": "100%"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./src/Page_MainTab/Page_User/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!./src/Page_MainTab/Page_User/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".frame_": {
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".frame_ima": {
    "width": "70px",
    "height": "70px",
    "marginBottom": "8px"
  },
  ".frame_text": {
    "fontSize": "26px",
    "color": "#000000",
    "width": "105px",
    "textAlign": "center"
  },
  ".container": {
    "flexDirection": "column"
  },
  ".top_view": {
    "width": "100%",
    "height": "600px",
    "flexDirection": "column",
    "alignItems": "center",
    "backgroundImage": "/Common/img/bg_me.png",
    "backgroundSize": "cover",
    "backgroundPosition": "center"
  },
  ".bottom_view": {
    "paddingTop": "20px",
    "paddingLeft": "20px",
    "paddingRight": "20px",
    "width": "100%",
    "flexDirection": "column",
    "alignItems": "center",
    "marginTop": "-90px",
    "backgroundColor": "#f5f5f5",
    "borderTopLeftRadius": "20px",
    "borderTopRightRadius": "20px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./src/Page_MainTab/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!./src/Page_MainTab/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".container": {
    "backgroundColor": "#f5f5f5"
  },
  ".tab_bar": {
    "backgroundColor": "#ffffff",
    "width": "750px",
    "borderTopLeftRadius": "20px",
    "borderTopRightRadius": "20px"
  },
  ".tab_item": {
    "flexDirection": "column",
    "alignItems": "center",
    "paddingTop": "14px",
    "paddingBottom": "11px",
    "width": "171px",
    "height": "104.2px"
  },
  ".tab_item image": {
    "width": "50px",
    "height": "50px",
    "resizeMode": "contain",
    "opacity": 0.5,
    "width:active": "50px",
    "height:active": "50px",
    "resizeMode:active": "contain"
  },
  ".tab_item text": {
    "fontSize": "21px",
    "marginTop": "10px"
  },
  ".item-container": {
    "justifyContent": "center"
  },
  ".main-text": {
    "fontSize": "100px",
    "color": "#5f9ea0"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./src/Page_MainTab/ui/circle/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!./src/Page_MainTab/ui/circle/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".slot": {
    "width": "100%",
    "height": "100%",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".canvas": {
    "width": "100%",
    "height": "100%"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./src/Page_MainTab/ui/dialog/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!./src/Page_MainTab/ui/dialog/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".mask": {
    "position": "fixed",
    "flex": 1,
    "top": "0px",
    "bottom": "0px",
    "width": "100%",
    "justifyContent": "center",
    "alignContent": "center",
    "alignItems": "center"
  },
  ".mask-exist": {
    "backgroundColor": "rgba(5,5,5,0.6)"
  },
  ".mask-none": {
    "backgroundColor": "rgba(0,0,0,0)",
    "visibility": "hidden"
  },
  ".mask .dialog": {
    "flexDirection": "column",
    "backgroundColor": "#ffffff",
    "borderRadius": "32px",
    "paddingTop": "24px",
    "paddingRight": "24px",
    "paddingBottom": "24px",
    "paddingLeft": "24px",
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
    "marginBottom": "50px",
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "32px",
    "fontWeight": "bold"
  },
  ".mask .dialog .box .top .title-close": {
    "width": "95%",
    "marginLeft": "25px"
  },
  ".mask .dialog .box .top .title-none": {
    "width": "100%"
  },
  ".mask .dialog .box .top .close": {
    "width": "5%",
    "marginTop": "-20px"
  },
  ".mask .dialog .box .top .close text": {
    "textAlign": "center",
    "width": "100%",
    "fontSize": "50px"
  },
  ".mask .dialog .box .content": {
    "paddingTop": "15px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px",
    "fontSize": "28px",
    "color": "#a0a0a0",
    "textAlign": "center"
  },
  ".mask .dialog .box input": {
    "fontSize": "28px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#e9e9e9",
    "borderRightColor": "#e9e9e9",
    "borderBottomColor": "#e9e9e9",
    "borderLeftColor": "#e9e9e9",
    "width": "85%",
    "height": "88px",
    "lineHeight": "60px",
    "paddingLeft": "20px",
    "borderBottomLeftRadius": "16px",
    "borderTopLeftRadius": "16px"
  },
  ".mask .dialog .box .tabs": {
    "width": "100%"
  },
  ".mask .dialog .box .tab-bar": {
    "borderTopColor": "#bbbbbb",
    "borderRightColor": "#bbbbbb",
    "borderBottomColor": "#bbbbbb",
    "borderLeftColor": "#bbbbbb",
    "color": "#bbbbbb",
    "marginBottom": "20px",
    "borderRadius": "54px"
  },
  ".mask .dialog .box .tab-text": {
    "textAlign": "center",
    "color": "#666666",
    "fontSize": "28px",
    "width": "250px",
    "height": "80px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#00b2ff",
    "borderRightColor": "#00b2ff",
    "borderBottomColor": "#00b2ff",
    "borderLeftColor": "#00b2ff",
    "borderRadius": "16px",
    "color:active": "#ffffff",
    "backgroundColor:active": "#00b2ff"
  },
  ".mask .dialog .btn": {
    "marginTop": "50px",
    "justifyContent": "space-between"
  },
  ".mask .dialog .btn .btnbox text": {
    "width": "270px",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "28px",
    "backgroundColor": "#00b2ff",
    "color": "#ffffff"
  },
  ".mask .dialog .btn .btnbox1 text": {
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
  ".mask .dialog .btn .btnbox": {
    "backgroundColor:active": "#e7e7e7"
  },
  ".mask .dialog .btn-vertical": {
    "flexDirection": "column"
  },
  ".mask .dialog .btn-vertical .btnbox": {
    "width": "100%"
  },
  ".mask .dialog .btn-horizontal": {
    "flexDirection": "row"
  },
  ".mask .dialog .btn-horizontal .btnbox": {
    "width": "50%"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./src/Page_MainTab/ui/privacypop/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".warp": {
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "bottom": "0px"
  },
  ".warp .imgBack": {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "bottom": "0px",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#cccccc",
    "objectFit": "fill"
  },
  ".warp .mask": {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "bottom": "0px",
    "backgroundColor": "rgba(0,0,0,0.4)",
    "animationDuration": "200ms",
    "animationTimingFunction": "linear",
    "animationFillMode": "forwards"
  },
  ".warp .popup": {
    "width": "984px",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "backgroundColor": "#ffffff",
    "animationDuration": "200ms",
    "animationTimingFunction": "linear",
    "animationFillMode": "forwards",
    "marginBottom": "80px"
  },
  ".warp .popup .title": {
    "lines": 1,
    "textOverflow": "ellipsis",
    "fontWeight": "600",
    "color": "rgba(0,0,0,0.9)"
  },
  ".warp .popup .body": {
    "width": "100%"
  },
  ".warp .popup .footer": {
    "justifyContent": "center"
  },
  ".warp .popup .footer .cancel": {
    "fontWeight": "600",
    "color": "#007dff",
    "backgroundColor": "#ffffff",
    "borderRadius": "100px",
    "backgroundColor:disabled": "rgba(0,0,0,0.1)"
  },
  ".warp .popup .footer .sure": {
    "fontWeight": "600",
    "backgroundColor": "#007dff",
    "color": "#ffffff",
    "borderRadius": "100px"
  },
  ".warp .popup_width": {
    "borderRadius": "66px",
    "marginTop": "auto",
    "marginRight": "auto",
    "marginBottom": "auto",
    "marginLeft": "auto",
    "width": "656px",
    "flexDirection": "column",
    "justifyContent": "space-between",
    "backgroundColor": "#ffffff",
    "animationDuration": "200ms",
    "animationTimingFunction": "linear",
    "animationFillMode": "forwards"
  },
  ".warp .popup_width .header": {
    "height": "132px",
    "paddingTop": "0px",
    "paddingRight": "54px",
    "paddingBottom": "0px",
    "paddingLeft": "54px"
  },
  ".warp .popup_width .header .title": {
    "lines": 1,
    "textOverflow": "ellipsis",
    "fontSize": "45px",
    "fontWeight": "600",
    "color": "rgba(0,0,0,0.9)"
  },
  ".warp .popup_width .body": {
    "width": "100%",
    "paddingTop": "0px",
    "paddingRight": "54px",
    "paddingBottom": "0px",
    "paddingLeft": "54px"
  },
  ".warp .popup_width .footer": {
    "justifyContent": "center",
    "height": "126px",
    "paddingTop": "0px",
    "paddingRight": "36px",
    "paddingBottom": "0px",
    "paddingLeft": "36px",
    "marginTop": "18px"
  },
  ".warp .popup_width .footer .cancel": {
    "width": "274px",
    "height": "90px",
    "fontSize": "36px",
    "fontWeight": "600",
    "color": "#007dff",
    "backgroundColor": "#ffffff",
    "borderRadius": "66px",
    "marginRight": "36px",
    "backgroundColor:disabled": "rgba(0,0,0,0.1)"
  },
  ".warp .popup_width .footer .sure": {
    "width": "274px",
    "height": "90px",
    "fontSize": "36px",
    "fontWeight": "600",
    "backgroundColor": "#007dff",
    "color": "#ffffff",
    "borderRadius": "66px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "tabs",
      "attr": {},
      "events": {
        "change": "changeTabactive"
      },
      "children": [
        {
          "type": "tab-content",
          "attr": {},
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return (this.datas.list)},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "item-container"
                  ],
                  "children": [
                    {
                      "type": "pagehome",
                      "attr": {},
                      "shown": function () {return (this.$item.title=='首页'?true:false)}
                    },
                    {
                      "type": "pagerecord",
                      "attr": {},
                      "shown": function () {return (this.$item.title=='步数'?true:false)}
                    },
                    {
                      "type": "pageuser",
                      "attr": {},
                      "shown": function () {return (this.$item.title=='我的'?true:false)}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "tab-bar",
          "attr": {},
          "classList": [
            "tab_bar"
          ],
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return (this.datas.list)},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "tab_item"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return (this.$item.show?this.$item.pic_choice:this.$item.pic)}
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.$item.title)}
                      },
                      "style": function () {return 'color: '+((this.$item.color))}
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
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "style": function () {return (this.style)},
  "children": [
    {
      "type": "canvas",
      "attr": {
        "id": function () {return (this.id)}
      },
      "id": function () {return (this.id)},
      "classList": [
        "canvas"
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "slot"
      ],
      "children": [
        {
          "type": "slot",
          "attr": {}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "apex-dialog"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": function () {return ['mask', (this.showModal?'mask-exist':'mask-none')]},
      "shown": function () {return (this.visible)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "dialog"
          ],
          "style": function () {return (this.setDialog)},
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
                        "value": function () {return (this.defaultPrompt.title||this.defaultOptions.title||this.title)}
                      },
                      "classList": function () {return ['title', (this.defaultOptions.closable?'title-close':'title-none')]}
                    }
                  ]
                },
                {
                  "type": "tabs",
                  "attr": {},
                  "shown": function () {return (this.dialogType==='prompt1')},
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
                            "value": "女"
                          },
                          "classList": [
                            "tab-text"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": "男"
                          },
                          "classList": [
                            "tab-text"
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "alignContent": "center"
                  },
                  "shown": function () {return (this.dialogType==='prompt')},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "focus",
                        "type": function () {return (this.defaultPrompt.fieldtype)},
                        "value": function () {return (this.value)},
                        "placeholder": function () {return (this.defaultPrompt.placeholder)},
                        "maxlength": function () {return (this.defaultPrompt.maxlength===-1?'':this.defaultPrompt.maxlength)}
                      },
                      "id": "focus",
                      "style": function () {return (this.defaultPrompt.inputStyle)},
                      "events": {
                        "change": "bindChange",
                        "enterkeyclick": "bindEnter"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "步"
                      },
                      "style": {
                        "textAlign": "center",
                        "borderTopRightRadius": "16px",
                        "borderBottomRightRadius": "16px",
                        "borderTopWidth": "2px",
                        "borderRightWidth": "2px",
                        "borderBottomWidth": "2px",
                        "borderLeftWidth": "2px",
                        "borderStyle": "solid",
                        "borderTopColor": "#e9e9e9",
                        "borderRightColor": "#e9e9e9",
                        "borderBottomColor": "#e9e9e9",
                        "borderLeftColor": "#e9e9e9",
                        "fontSize": "28px",
                        "backgroundColor": "#f5f5f5",
                        "width": "88px",
                        "height": "88px"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "alignContent": "center",
                    "marginBottom": "20px"
                  },
                  "shown": function () {return (this.dialogType==='prompt1')},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idkg",
                        "type": function () {return (this.defaultPrompt.fieldtype)},
                        "value": function () {return (this.kg)},
                        "placeholder": "输入体重",
                        "maxlength": "3"
                      },
                      "id": "idkg",
                      "style": function () {return (this.defaultPrompt.inputStyle)},
                      "events": {
                        "change": "bindChangekg",
                        "enterkeyclick": "bindEnterkg"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "kg"
                      },
                      "style": {
                        "textAlign": "center",
                        "borderTopRightRadius": "16px",
                        "borderBottomRightRadius": "16px",
                        "borderTopWidth": "2px",
                        "borderRightWidth": "2px",
                        "borderBottomWidth": "2px",
                        "borderLeftWidth": "2px",
                        "borderStyle": "solid",
                        "borderTopColor": "#e9e9e9",
                        "borderRightColor": "#e9e9e9",
                        "borderBottomColor": "#e9e9e9",
                        "borderLeftColor": "#e9e9e9",
                        "fontSize": "28px",
                        "backgroundColor": "#f5f5f5",
                        "width": "88px",
                        "height": "88px"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "alignContent": "center",
                    "marginBottom": "20px"
                  },
                  "shown": function () {return (this.dialogType==='prompt1')},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idcm",
                        "type": function () {return (this.defaultPrompt.fieldtype)},
                        "value": function () {return (this.cm)},
                        "placeholder": "输入身高",
                        "maxlength": "3"
                      },
                      "id": "idcm",
                      "style": function () {return (this.defaultPrompt.inputStyle)},
                      "events": {
                        "change": "bindChangecm",
                        "enterkeyclick": "bindEntercm"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "cm"
                      },
                      "style": {
                        "textAlign": "center",
                        "borderTopRightRadius": "16px",
                        "borderBottomRightRadius": "16px",
                        "borderTopWidth": "2px",
                        "borderRightWidth": "2px",
                        "borderBottomWidth": "2px",
                        "borderLeftWidth": "2px",
                        "borderStyle": "solid",
                        "borderTopColor": "#e9e9e9",
                        "borderRightColor": "#e9e9e9",
                        "borderBottomColor": "#e9e9e9",
                        "borderLeftColor": "#e9e9e9",
                        "fontSize": "28px",
                        "backgroundColor": "#f5f5f5",
                        "width": "88px",
                        "height": "88px"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "alignContent": "center",
                    "marginBottom": "10px"
                  },
                  "shown": function () {return (this.dialogType==='prompt1')},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idage",
                        "type": function () {return (this.defaultPrompt.fieldtype)},
                        "value": function () {return (this.age)},
                        "placeholder": "输入年龄",
                        "maxlength": "3"
                      },
                      "id": "idage",
                      "style": function () {return (this.defaultPrompt.inputStyle)},
                      "events": {
                        "change": "bindChangeage",
                        "enterkeyclick": "bindEnterage"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "岁"
                      },
                      "style": {
                        "textAlign": "center",
                        "borderTopRightRadius": "16px",
                        "borderBottomRightRadius": "16px",
                        "borderTopWidth": "2px",
                        "borderRightWidth": "2px",
                        "borderBottomWidth": "2px",
                        "borderLeftWidth": "2px",
                        "borderStyle": "solid",
                        "borderTopColor": "#e9e9e9",
                        "borderRightColor": "#e9e9e9",
                        "borderBottomColor": "#e9e9e9",
                        "borderLeftColor": "#e9e9e9",
                        "fontSize": "28px",
                        "backgroundColor": "#f5f5f5",
                        "width": "88px",
                        "height": "88px"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": function () {return ['btn', (this.dialogType==='alter'||this.vertical===true?'btn-vertical':'btn-horizontal')]},
              "children": [
                {
                  "type": "block",
                  "attr": {},
                  "shown": function () {return (this.defaultOptions.buttons.length===0)},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "shown": function () {return (this.dialogType!=='alter')},
                      "classList": [
                        "btnbox1"
                      ],
                      "events": {
                        "click": "bindCancel"
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.defaultOptions.cancel)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "events": {
                        "click": "bindAffirm"
                      },
                      "classList": [
                        "btnbox"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.defaultOptions.affirm)}
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
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        "top_view"
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
                    "value": "今日"
                  },
                  "classList": [
                    "tab-text"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "周"
                  },
                  "classList": [
                    "tab-text"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "月"
                  },
                  "classList": [
                    "tab-text"
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "my-circle",
          "attr": {
            "size": "350",
            "percent": function () {return (this.progress)},
            "strokeColor": "#00B2FF",
            "sAngle": "150",
            "showTrail": function () {return (true)},
            "trailColor": "#fff"
          },
          "classList": [
            "circle"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "text-container"
              ],
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "/Common/img/icon_paobu.png"
                  },
                  "classList": [
                    "icon-image"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.segmentsText)}
                  },
                  "classList": [
                    "title_stpes"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.steps_view)}
                  },
                  "classList": [
                    "title_stpes_v"
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
            "details"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "detail-item"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "detail-value"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.mileage)}
                      },
                      "classList": [
                        "detail-value1",
                        "larger-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "KM"
                      },
                      "classList": [
                        "smaller-text"
                      ]
                    }
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "里程"
                  },
                  "classList": [
                    "n-text"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "detail-item"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "detail-value"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.calories)}
                      },
                      "classList": [
                        "detail-value2",
                        "larger-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "kcal"
                      },
                      "classList": [
                        "smaller-text"
                      ]
                    }
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "消耗热量"
                  },
                  "classList": [
                    "n-text"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "detail-item"
              ],
              "events": {
                "click": "openSetStepsDialog"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "detail-value"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "id": "u",
                        "value": function () {return (this.goal_day)}
                      },
                      "id": "u",
                      "classList": [
                        "detail-value3",
                        "larger-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "步>"
                      },
                      "classList": [
                        "smaller-text"
                      ]
                    }
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "今日目标"
                  },
                  "classList": [
                    "n-text"
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
        "bottom_view"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": {
            "width": "100%",
            "justifyContent": "space-between"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "width": "252px",
                "height": "45px",
                "alignItems": "flex-end"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "width": "238px",
                    "height": "28px",
                    "background": "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"90deg\"],\"values\":[\"#e9fd65\",\"#95ff37 100%\"]}]}",
                    "position": "absolute",
                    "borderRadius": "58px"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "BMI/体脂率计算"
                  },
                  "style": {
                    "width": "100%",
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
              "type": "text",
              "attr": {
                "value": "填写计算>"
              },
              "style": {
                "color": "#828282",
                "paddingTop": "10px",
                "paddingLeft": "20px"
              },
              "events": {
                "click": "openBasicInformationDialog"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "width": "100%",
            "height": "140px",
            "backgroundImage": "/Common/img/mingroup2.png",
            "marginTop": "15px",
            "justifyContent": "space-around"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "alignItems": "center",
                "marginLeft": "-30px"
              },
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "/Common/img/icon_bmi.png"
                  },
                  "style": {
                    "width": "90px",
                    "height": "90px"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "flexDirection": "column",
                    "justifyContent": "space-around",
                    "marginLeft": "16px"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "BMI"
                      },
                      "classList": [
                        "larger3-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.bmi)}
                      },
                      "classList": [
                        "larger2-text"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "style": {
                "alignItems": "center"
              },
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "/Common/img/icon_tzl.png"
                  },
                  "style": {
                    "width": "90px",
                    "height": "90px"
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "style": {
                    "flexDirection": "column",
                    "justifyContent": "space-around",
                    "marginLeft": "16px"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "体脂率"
                      },
                      "classList": [
                        "larger3-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.tzl)}
                      },
                      "classList": [
                        "larger2-text"
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
          "style": {
            "backgroundImage": "/Common/img/standard.png",
            "width": "100%",
            "height": "368px",
            "marginTop": "14px"
          }
        }
      ]
    },
    {
      "type": "my-dialog",
      "attr": {
        "visible": function () {return (this.open1)},
        "dialogType": "prompt",
        "prompt": function () {return (this.obj)}
      },
      "events": {
        "affirm": "enterSteps",
        "cancel": "close",
        "enter": "enterSteps"
      }
    },
    {
      "type": "my-dialog",
      "attr": {
        "visible": function () {return (this.open2)},
        "dialogType": "prompt1",
        "prompt": function () {return (this.obj)}
      },
      "events": {
        "affirm": "enterDetails",
        "cancel": "close"
      }
    },
    {
      "type": "div",
      "attr": {
        "show": function () {return (this.isShow)}
      },
      "classList": [
        "header"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "申请 健身运动 权限:"
          },
          "style": {
            "fontWeight": "bold"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "用于记录运动步数，计算运动量。"
          },
          "style": {
            "fontWeight": "500"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "style": {
    "width": "100%",
    "backgroundColor": "#f5f5f5",
    "flexDirection": "column",
    "alignItems": "center",
    "paddingTop": "27px"
  },
  "children": [
    {
      "type": "div",
      "attr": {},
      "style": {
        "borderRadius": "20px",
        "backgroundColor": "#ffffff",
        "width": "702px",
        "height": "592px",
        "paddingTop": "25px",
        "paddingRight": "25px",
        "paddingBottom": "25px",
        "paddingLeft": "25px",
        "flexDirection": "column",
        "marginTop": "150px"
      },
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": {
            "justifyContent": "space-between",
            "height": "70px"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "width": "152px",
                "height": "45px",
                "alignItems": "flex-end"
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
                    "value": "步数记录"
                  },
                  "style": {
                    "width": "100%",
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
              "type": "text",
              "attr": {
                "value": "单位：步"
              },
              "style": {
                "fontSize": "24px",
                "color": "#828282"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "flexDirection": "column",
            "marginTop": "20px"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "justifyContent": "space-between"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "2024"
                  },
                  "style": {
                    "fontSize": "26px",
                    "color": "#000000",
                    "fontWeight": "bold",
                    "marginTop": "20px",
                    "marginRight": "20px",
                    "marginBottom": "20px",
                    "marginLeft": "20px"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "0"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "2000"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "4000"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "6000"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "8000"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "10000"
                  },
                  "style": {
                    "fontSize": "20px",
                    "color": "#828282"
                  }
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
                  "repeat": function () {return (this.list30dayData)},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.$item.summaryDate)}
                          },
                          "style": {
                            "width": "120px",
                            "fontSize": "20px",
                            "color": "#000000"
                          }
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "style": {
                            "height": "32px",
                            "marginLeft": "24px",
                            "backgroundColor": "#00b2ff",
                            "borderTopRightRadius": "50px",
                            "borderBottomRightRadius": "50px"
                          },
                          "children": [
                            {
                              "type": "progress",
                              "attr": {
                                "percent": function () {return (this.$item.percent)}
                              },
                              "classList": [
                                "progress"
                              ],
                              "style": {
                                "width": "100%",
                                "color": "#00b2ff",
                                "layerColor": "#ffffff"
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
          "type": "div",
          "attr": {},
          "style": {
            "justifyContent": "center",
            "marginTop": "30px"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "仅显示最近30天步数"
              },
              "style": {
                "borderRadius": "116px",
                "paddingTop": "12px",
                "paddingRight": "12px",
                "paddingBottom": "12px",
                "paddingLeft": "12px",
                "textAlign": "center",
                "backgroundColor": "#efefef",
                "fontSize": "24px",
                "color": "#828282",
                "width": "280px"
              }
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        "top_view"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": {
            "alignItems": "center",
            "width": "100%",
            "height": "80%"
          },
          "events": {
            "click": "toLogin"
          },
          "children": [
            {
              "type": "image",
              "attr": {
                "src": "/Common/img/touxiang.png"
              },
              "style": {
                "width": "120px",
                "height": "120px",
                "marginLeft": "60px"
              }
            },
            {
              "type": "div",
              "attr": {},
              "style": {
                "flexDirection": "column",
                "justifyContent": "space-around",
                "height": "120px",
                "marginLeft": "10px",
                "paddingTop": "10px",
                "paddingRight": "10px",
                "paddingBottom": "10px",
                "paddingLeft": "10px"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.userData.loginPhone||'请点击登录')}
                  },
                  "classList": [
                    "log"
                  ],
                  "style": {
                    "color": "#000000",
                    "fontSize": "32px",
                    "fontWeight": "bold"
                  }
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return 'ID:'+((this.userData.userId))}
                  },
                  "classList": [
                    "user_id"
                  ],
                  "style": {
                    "color": "#696969",
                    "fontSize": "28px"
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
            "marginTop": "-110px",
            "bottom": "0px",
            "justifyContent": "space-between",
            "paddingLeft": "50px",
            "paddingRight": "50px",
            "alignItems": "center",
            "backgroundImage": "/Common/img/group.png",
            "height": "164px",
            "width": "702px"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
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
                    "fontSize": "72px",
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
              "style": {
                "justifyContent": "center",
                "width": "150px",
                "height": "70px",
                "background": "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"270deg\"],\"values\":[\"#f7bba4 0%\",\"#fdecd7\"]}]}",
                "borderRadius": "192px"
              },
              "events": {
                "click": "pushPageTixian"
              },
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "提现"
                  },
                  "style": {
                    "color": "#aa5021",
                    "fontSize": "32px",
                    "fontWeight": "bold"
                  }
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
        "bottom_view"
      ],
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/banner_me.png"
          },
          "style": {
            "width": "100%",
            "height": "180px",
            "marginBottom": "20px"
          },
          "events": {
            "click": "openAd"
          }
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "borderRadius": "20px",
            "backgroundColor": "#ffffff",
            "width": "702px",
            "height": "380px",
            "paddingTop": "20px",
            "paddingRight": "20px",
            "paddingBottom": "20px",
            "paddingLeft": "20px",
            "flexDirection": "column"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "style": {
                "width": "152px",
                "height": "45px",
                "alignItems": "flex-end"
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
                    "value": "我的服务"
                  },
                  "style": {
                    "width": "100%",
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
                "width": "100%",
                "justifyContent": "space-around",
                "marginBottom": "30px",
                "marginTop": "20px"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": "addDesktop"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame1.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "添加桌面"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": "pushPagefeedback"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame2.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "举报反馈"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": function(evt){this.pushweb(1,evt)}
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame3.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "帮助中心"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": function(evt){this.pushweb(2,evt)}
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame4.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "用户协议"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "style": {
                "width": "100%",
                "justifyContent": "space-around"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": function(evt){this.pushweb(3,evt)}
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame5.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "隐私政策"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": "pushPagepermissions"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame6.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "设置"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "events": {
                    "click": "pushPageabout"
                  },
                  "classList": [
                    "frame_"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame7.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "关于"
                      },
                      "classList": [
                        "frame_text"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "events": {
                    "click": "pushPagelogOut"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame8.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "注销"
                      },
                      "classList": [
                        "frame_text"
                      ]
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
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "warp"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "style": function () {return 'z-index: '+((this.zIndex))+';'},
      "classList": [
        "mask"
      ],
      "shown": function () {return (this.showPop&&!this.backImg)}
    },
    {
      "type": "image",
      "attr": {
        "src": function () {return (this.backImg)}
      },
      "shown": function () {return (this.showPop&&this.backImg)},
      "classList": [
        "imgBack"
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.showPop&&!this.reserveDialogStyle)},
      "style": function () {return 'position:fixed; bottom:'+(((16/this.deviceDp)*this.deviceWidth))+'px; left:'+(((16/this.deviceDp)*this.deviceWidth))+'px; right:'+(((16/this.deviceDp)*this.deviceWidth))+'px; border-radius:'+(((24/this.deviceDp)*this.deviceWidth))+'px;'},
      "classList": [
        "popup"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": function () {return 'height:'+(((56/this.deviceDp)*this.deviceWidth))+'px; padding-left: '+(((24/this.deviceDp)*this.deviceWidth))+'px; padding-right: '+(((24/this.deviceDp)*this.deviceWidth))+'px;'},
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return (this.title.trim()||'用户协议隐私政策提示')}
              },
              "style": function () {return 'font-size: '+(((20/this.deviceDp)*this.deviceWidth))+'px;'},
              "classList": [
                "title"
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": function () {return 'padding-left: '+(((24/this.deviceDp)*this.deviceWidth))+'px; padding-right: '+(((24/this.deviceDp)*this.deviceWidth))+'px;'},
          "classList": [
            "body"
          ],
          "children": [
            {
              "type": "slot",
              "attr": {},
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "id": "content"
                  },
                  "style": {
                    "fontSize": "25px",
                    "color": "rgba(0,0,0,0.9)"
                  },
                  "id": "content",
                  "children": [
                    {
                      "type": "span",
                      "attr": {
                        "value": " 本服务需要 "
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "联网"
                      },
                      "style": {
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " ，调用 "
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "电话"
                      },
                      "style": {
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 、 "
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "位置"
                      },
                      "style": {
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 权限、获取设备、网络、麦克风、运动、健康信息。点击“同意”，即表示您同意上述内容及 "
                      }
                    },
                    {
                      "type": "a",
                      "attr": {
                        "href": "https://developer.huawei.com/consumer/cn/doc/",
                        "value": "XX用户协议"
                      },
                      "style": {
                        "color": "#007dff",
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 、 "
                      }
                    },
                    {
                      "type": "a",
                      "attr": {
                        "href": "https://developer.huawei.com/consumer/cn/doc/",
                        "value": "关于XX隐私说明"
                      },
                      "style": {
                        "color": "#007dff",
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 。 "
                      }
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
          "shown": function () {return (this.showFooter)},
          "style": function () {return 'height:'+(((56/this.deviceDp)*this.deviceWidth))+'px; padding-left: '+(((16/this.deviceDp)*this.deviceWidth))+'px; padding-right: '+(((16/this.deviceDp)*this.deviceWidth))+'px; margin-top:'+(((8/this.deviceDp)*this.deviceWidth))+'px'},
          "classList": [
            "footer"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "button",
                    "value": "拒绝",
                    "disabled": function () {return (this.btndisabled)}
                  },
                  "style": function () {return 'height:'+(((40/this.deviceDp)*this.deviceWidth))+'px; font-size:'+(((16/this.deviceDp)*this.deviceWidth))+'px; margin-right:'+(((16/this.deviceDp)*this.deviceWidth))+'px; width:'+(((984-(16/this.deviceDp)*this.deviceWidth*3)/2))+'px'},
                  "classList": [
                    "cancel"
                  ],
                  "events": {
                    "click": "cancel"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "button",
                    "value": "同意"
                  },
                  "style": function () {return 'height:'+(((40/this.deviceDp)*this.deviceWidth))+'px; font-size:'+(((16/this.deviceDp)*this.deviceWidth))+'px; width:'+(((984-(16/this.deviceDp)*this.deviceWidth*3)/2))+'px'},
                  "classList": [
                    "sure"
                  ],
                  "events": {
                    "click": "sure"
                  }
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
        "popup_width"
      ],
      "shown": function () {return (this.showPop&&this.reserveDialogStyle)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "header"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return (this.title.trim()||'用户协议隐私政策提示')}
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
            "body"
          ],
          "children": [
            {
              "type": "slot",
              "attr": {},
              "children": [
                {
                  "type": "text",
                  "attr": {},
                  "style": {
                    "fontSize": "25px",
                    "color": "rgba(0,0,0,0.9)"
                  },
                  "children": [
                    {
                      "type": "span",
                      "attr": {
                        "value": " 申请 "
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": "健身运动"
                      },
                      "style": {
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 用于获取步数与记录步数,请您在使用（或继续使用）我们的产品服务前仔细阅读 "
                      }
                    },
                    {
                      "type": "a",
                      "attr": {
                        "href": "https://developer.huawei.com/consumer/cn/doc/",
                        "value": "《用户协议》"
                      },
                      "style": {
                        "color": "#007dff",
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 和 "
                      }
                    },
                    {
                      "type": "a",
                      "attr": {
                        "href": "https://developer.huawei.com/consumer/cn/doc/",
                        "value": "《隐私政策》"
                      },
                      "style": {
                        "color": "#007dff",
                        "fontWeight": "700"
                      }
                    },
                    {
                      "type": "span",
                      "attr": {
                        "value": " 。我们将全力保障您的合法权益与信息安全，并将持续为您提供优质服务。 "
                      }
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
            "footer"
          ],
          "shown": function () {return (this.showFooter)},
          "children": [
            {
              "type": "div",
              "attr": {},
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "button",
                    "value": "取消",
                    "disabled": function () {return (this.btndisabled)}
                  },
                  "classList": [
                    "cancel"
                  ],
                  "events": {
                    "click": "cancel"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "children": [
                {
                  "type": "input",
                  "attr": {
                    "type": "button",
                    "value": "同意"
                  },
                  "classList": [
                    "sure"
                  ],
                  "events": {
                    "click": "sure"
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

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/circle/index.ux?name=my-circle */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle")
__webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/dialog/index.ux?name=my-dialog */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog")
__webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/privacypop/index.ux?name=privacy-pop */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop")
var $app_template$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./src/Page_MainTab/Page_Home/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux")

$app_define$('@app-component/pagehome', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./src/Page_MainTab/Page_Record/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux")

$app_define$('@app-component/pagerecord', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./src/Page_MainTab/Page_User/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux")

$app_define$('@app-component/pageuser', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./src/Page_MainTab/ui/circle/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux")

$app_define$('@app-component/my-circle', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./src/Page_MainTab/ui/dialog/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux")

$app_define$('@app-component/my-dialog', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./src/Page_MainTab/ui/privacypop/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux")

$app_define$('@app-component/privacy-pop', [], function($app_require$, $app_exports$, $app_module$){
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
/*!***********************************!*\
  !*** ./src/Page_MainTab/index.ux ***!
  \***********************************/
__webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_Record/index.ux?name=pagerecord */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord")
__webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_Home/index.ux?name=pagehome */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome")
__webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_User/index.ux?name=pageuser */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser")
var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./src/Page_MainTab/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfTWFpblRhYlxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDb0hBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFHQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBR0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcGhCQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaUJBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hLQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcGZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcUGFnZV9Ib21lXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1JlY29yZC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXFBhZ2VfUmVjb3JkXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxQYWdlX1VzZXJcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcdWlcXGNpcmNsZVxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvZGlhbG9nL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcdWlcXGRpYWxvZ1xcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvcHJpdmFjeXBvcC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXHVpXFxwcml2YWN5cG9wXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD80ODIzIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/YjZiZSIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD8wMmQwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvaW5kZXgudXg/MjdiNyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2NpcmNsZS9pbmRleC51eD9lNjBiIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvZGlhbG9nL2luZGV4LnV4PzYwNDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2luZGV4LnV4P2NkZDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9pbmRleC51eD8wZjI3Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2luZGV4LnV4P2EwYWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXg/NDI5NCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD84ZTQxIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/YjM5ZCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD82YTFhIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvcHJpdmFjeXBvcC9pbmRleC51eD8xNGIxIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2luZGV4LnV4Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9zeXN0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2hcIikpO1xudmFyIF9zeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xudmFyIF9zeXN0ZW0zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmRldmljZVwiKSk7XG52YXIgX3N5c3RlbTQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ucHJvbXB0XCIpKTtcbnZhciBfc3lzdGVtNSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yb3V0ZXJcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbmZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBrZXkgPSBfdG9Qcm9wZXJ0eUtleShrZXkpOyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgaSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG5jb25zdCBnZXRVc2VySWQgPSBhc3luYyAoKSA9PiB7XG4gIGxldCB1c2VySWQgPSBhd2FpdCBfc3lzdGVtMy5kZWZhdWx0LmdldFVzZXJJZCgpO1xuICByZXR1cm4gdXNlcklkLmRhdGEudXNlcklkO1xufTtcbmNvbnN0IHF1aXQgPSAoKSA9PiB7XG4gIF9zeXN0ZW00LmRlZmF1bHQuc2hvd0RpYWxvZyh7XG4gICAgdGl0bGU6ICforablkYonLFxuICAgIG1lc3NhZ2U6IFwi5oKo5bey5rOo6ZSA6LSm5Y+3LOivt+mAgOWHuuOAglwiLFxuICAgIGJ1dHRvbnM6IFt7XG4gICAgICB0ZXh0OiAn6YCA5Ye6JyxcbiAgICAgIGNvbG9yOiAnIzMzMzMzMydcbiAgICB9XSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3N5c3RlbTUuZGVmYXVsdC5wdXNoKHtcbiAgICAgICAgdXJpOiBcIlBhZ2VfbG9naW5cIlxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuY29uc3QgZ2V0VG9rZW5EYXRhID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4YW1wbGUgPSByZXF1aXJlKCcuL2FwaXMvZXhhbXBsZS5qcycpLmRlZmF1bHQ7XG4gICAgY29uc3QgZGV2aWNlTnVtID0gYXdhaXQgZ2V0VXNlcklkKCk7XG4gICAgY29uc29sZS5sb2coYGdldFRva2VuRGF0YSgpLS0tLT5kZXZpY2VOdW09JHtkZXZpY2VOdW19YCk7XG4gICAgY29uc29sZS5sb2coJ+aYr+WQpuinpuWPkeeahOi/memHjCcpO1xuICAgIGV4YW1wbGUudG9Mb2dpbih7XG4gICAgICBsb2dpblR5cGU6IFwiREVWSUNFXCIsXG4gICAgICBhcHBJZDogJ1NDXzAwMDEnLFxuICAgICAgZGV2aWNlTnVtLFxuICAgICAgbG9naW5BY2NvdW50OiBkZXZpY2VOdW1cbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+i1sOeahOaIkOWKn+WbnuiwgycpO1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyLCAn5aSx6LSl5Zue6LCDJyk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoSlNPTi5wYXJzZShlcnIpLmNvZGUgPT09ICczMTAwMDEnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+i/m+adpeS6hicpO1xuICAgICAgICAgIHF1aXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IsICfmn6XnnIvojrflj5bmiqXplJknKTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5sZXQgaXNSZWZyZXNoaW5nID0gZmFsc2U7IC8vIOaYr+WQpuato+WcqOivt+axguWIt+aWsHRva2Vu55qE5o6l5Y+jXG5jb25zdCByZWZyZXNoU3Vic2NyaWJlcnMgPSBbXTsgLy8g5a2Y5YKo6K+35rGC55qE5pWw57uEXG5jb25zdCBzdWJzY3JpYmVUb2tlblJlZnJlc2ggPSBjYiA9PiB7XG4gIC8vIOWwhuaJgOacieeahOivt+axgumDvXB1c2jliLDmlbDnu4TkuK0s5YW25a6e5pWw57uE5pivW2Z1bmN0aW9uKHRva2VuKXt9LCBmdW5jdGlvbih0b2tlbil7fSwuLi5dXG4gIHJlZnJlc2hTdWJzY3JpYmVycy5wdXNoKGNiKTtcbn07XG5jb25zdCBvblJyZWZyZXNoZWQgPSB0b2tlbiA9PiB7XG4gIC8vIOaVsOe7hOS4reeahOivt+axguW+l+WIsOaWsOeahHRva2Vu5LmL5ZCO6Ieq5omn6KGM77yM55So5paw55qEdG9rZW7ljrvor7fmsYLmlbDmja5cbiAgcmVmcmVzaFN1YnNjcmliZXJzLm1hcChjYiA9PiBjYih0b2tlbikpO1xufTtcbmNvbnN0IGlzQWNjZXNzVG9rZW5FeHBpcmVkID0gYXV0aERhdGEgPT4ge1xuICAvLyDliKTmlq3lvZPliY10b2tlbuaYr+WQpui/h+acn1xuICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhdXRoRGF0YS5leHBpcmVBdCA+IDEwMDAwICogNjApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuY29uc3QgcmVxdWVzdCA9IG9wdGlvbnMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzID0ge31cbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBhdXRoRGF0YSA9IChhd2FpdCBfc3lzdGVtMi5kZWZhdWx0LmdldCh7XG4gICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgfSkpIHx8IHt9O1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXV0aERhdGEuZGF0YSA/IEpTT04ucGFyc2UoYXV0aERhdGEuZGF0YSkuYWNjZXNzVG9rZW4gOiAnJztcbiAgICBpZiAoaXNBY2Nlc3NUb2tlbkV4cGlyZWQoYXV0aERhdGEpIHx8ICFhY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKCFvcHRpb25zLnVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSkge1xuICAgICAgICBpZiAoIWlzUmVmcmVzaGluZykge1xuICAgICAgICAgIGlzUmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgZ2V0VG9rZW5EYXRhKCkudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gcmVzLmRhdGEuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgIGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuc2V0KHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiQVVUSF9UT0tFTl9EQVRBXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlcy5kYXRhLmFjY2Vzc1Rva2VuJywgcmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICBvblJyZWZyZXNoZWQocmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmV0cnkgPSBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaWJlVG9rZW5SZWZyZXNoKHRva2VuID0+IHtcbiAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHRva2VuOyAvLyDnlKjmnIDmlrB0b2tlbuivt+axguaVsOaNrlxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBhY2Nlc3NUb2tlbiB8fCAnJztcbiAgICBjb25zb2xlLmxvZygnYWpheOivt+axgicsICcgIHVybD0nICsgdXJsLCBcIjttZXRob2Q9XCIgKyBtZXRob2QsIFwiO2RhdGE9IFwiICsgZGF0YSk7XG4gICAgX3N5c3RlbS5kZWZhdWx0LmZldGNoKHtcbiAgICAgIC8vIHVybDogJ2h0dHBzOi8vdGVzdC5pcGFuZGF0YS5jb20nICsgdXJsLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaWhhaXR1by5jbicgKyB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sIGhlYWRlcnMpLFxuICAgICAgLy8gc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gICBjb25zdCBkYXRhID0gcmVzLmRhdGFcbiAgICAgIC8vICAgaWYgKGRhdGEuY29kZSA9PT0gXCIwMDAwMDBcIiB8fCBKU09OLnBhcnNlKGRhdGEpLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgIC8vICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IHJlcy5kYXRhIDogSlNPTi5wYXJzZShyZXMuZGF0YSkpO1xuICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgLy8gICAgIGlmIChkYXRhLmNvZGUgPT09IFwiMzAwMDAyXCIpIHtcbiAgICAgIC8vICAgICAgICRzdG9yYWdlLmRlbGV0ZSh7XG4gICAgICAvLyAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgIC8vICAgICAgIH0pXG4gICAgICAvLyAgICAgICByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAvLyAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAvLyAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICByZWplY3QocmVzLmRhdGEpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSxcblxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YTtcblxuICAgICAgICAgIC8vIOWwneivleino+aekCBKU09OIOaVsOaNru+8jOWmguaenOino+aekOWksei0pe+8jOWImeS8muaKm+WHuumUmeivr1xuICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcbiAgICAgICAgICBpZiAocGFyc2VkRGF0YS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAgICAgICByZXNvbHZlKHVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSA/IGRhdGEgOiBwYXJzZWREYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhcnNlZERhdGEuY29kZSA9PT0gXCIzMDAwMDJcIikge1xuICAgICAgICAgICAgICBfc3lzdGVtMi5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiwgZSk7XG5cbiAgICAgICAgICAvLyDmo4Dmn6XmmK/lkKbov5Tlm57nmoTmmK8gSFRNTO+8jOiAjOS4jeaYryBKU09OXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZGF0YSA9PT0gJ3N0cmluZycgJiYgcmVzLmRhdGEuc3RhcnRzV2l0aCgnPGh0bWw+JykpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlNlcnZlciByZXR1cm5lZCBhbiBIVE1MIHBhZ2UgaW5zdGVhZCBvZiBKU09OLiBQb3NzaWJsZSBpbmNvcnJlY3QgVVJMIG9yIHNlcnZlciBlcnJvci5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChcIkVycm9yIHBhcnNpbmcgSlNPTiBvciBoYW5kbGluZyBjb2RlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge31cbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfYWpheCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FqYXguanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IHRvTG9naW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL2xvZ2luYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5LiK5Lyg5q2l5pWwXG5jb25zdCB1cGxvYWRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL3VwbG9hZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vLyDojrflj5bmraXmlbBcbmNvbnN0IGdldHN0ZXBzID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zY2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOiOt+WPluacgOi/kTMw5aSp6K6w5b2VXG5jb25zdCBnZXRzdGVwc2xpc3QgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy9saXN0YFxuICB9KTtcbn07XG5cbi8v5o+Q546wXG5jb25zdCB3aXRoZHJhdyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvd2l0aGRyYXdgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+eUqOaIt+S9memineiusOW9lVxuY29uc3QgcmVjb3JkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL2Nhc2gvcmVjb3JkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5blub/lkYrlrozmiJDmrKHmlbBcbmNvbnN0IGdldEFkQ291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbXBsZXRlL2NvdW50YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/lub/lkYrlrozmiJBcbmNvbnN0IGNvbXBsZXRlQWQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQLeWKoOWvhlxuY29uc3QgY29tcGxldGVBZFJTQSA9IGFzeW5jIGRhdGEgPT4ge1xuICBsZXQgdGltZXN0YW1wID0gK25ldyBEYXRlKCk7XG4gIGRhdGEudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICBsZXQgX2RhdGEgPSBhd2FpdCAkdXRpbHMuZGF0YUVuY3J5cHRpb24oZGF0YSk7XG4gIGxldCBwYXJhbSA9IHtcbiAgICBkYXRhOiBfZGF0YVxuICB9O1xuICBjb25zb2xlLmxvZygn5Lu75Yqh5Yqg5a+GJywgcGFyYW0pO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2ZpbmlzaGAsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gIH0pO1xufTtcblxuLy/lub/lkYrovazljJbkuIrkvKAgICB0eXBlOuW5v+WRiua4oOmBk+exu+Weizogamgo6bK46bi/KSwga3Mo5b+r5omLKSwgamwo5beo6YePKSwgLOWPr+eUqOWAvDpqaCxrcyxqbFxuY29uc3QgY29udmVydFVwbG9hZCA9IChkYXRhLCB0eXBlKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdkYXRhPSAnLCBkYXRhLCBgICAgdXJsPSAvcWEvbWluaS9iYXNpYy9hZC9jb252ZXJ0L3VwbG9hZC8ke3R5cGV9YCk7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHt0eXBlfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHRvTG9naW4sXG4gIHVwbG9hZHN0ZXBzLFxuICBnZXRzdGVwcyxcbiAgZ2V0c3RlcHNsaXN0LFxuICB3aXRoZHJhdyxcbiAgcmVjb3JkLFxuICBnZXRBZENvdW50LFxuICBjb21wbGV0ZUFkLFxuICBjb21wbGV0ZUFkUlNBLFxuICBjb252ZXJ0VXBsb2FkXG59OyIsIjxpbXBvcnQgbmFtZT1cIm15LWNpcmNsZVwiIHNyYz1cIi4uL3VpL2NpcmNsZS9pbmRleFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwibXktZGlhbG9nXCIgc3JjPVwiLi4vdWkvZGlhbG9nL2luZGV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJwcml2YWN5LXBvcFwiIHNyYz1cIi4uL3VpL3ByaXZhY3lwb3AvaW5kZXhcIj48L2ltcG9ydD5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0b3Bfdmlld1wiPlxuICAgICAgPHRhYnMgY2xhc3M9XCJ0YWJzXCIgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cbiAgICAgICAgPHRhYi1iYXIgY2xhc3M9XCJ0YWItYmFyXCI+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuS7iuaXpTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5ZGoPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7mnIg8L3RleHQ+XG4gICAgICAgIDwvdGFiLWJhcj5cbiAgICAgIDwvdGFicz5cbiAgICAgIDxteS1jaXJjbGUgY2xhc3M9XCJjaXJjbGVcIiBzaXplPVwiMzUwXCIgcGVyY2VudD1cInt7cHJvZ3Jlc3N9fVwiIHN0cm9rZS1jb2xvcj1cIiMwMEIyRkZcIiBzLWFuZ2xlPVwiMTUwXCIgc2hvdy10cmFpbD1cInt7dHJ1ZX19XCIgdHJhaWwtY29sb3I9XCIjZmZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxpbWFnZSBzcmM9XCIvQ29tbW9uL2ltZy9pY29uX3Bhb2J1LnBuZ1wiIGNsYXNzPVwiaWNvbi1pbWFnZVwiIC8+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZV9zdHBlc1wiPnt7c2VnbWVudHNUZXh0fX08L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZV9zdHBlc192XCI+e3tzdGVwc192aWV3fX08L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9teS1jaXJjbGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZGV0YWlsLXZhbHVlMSBsYXJnZXItdGV4dFwiPnt7bWlsZWFnZX19PC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJzbWFsbGVyLXRleHRcIj5LTTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPumHjOeoizwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZGV0YWlsLXZhbHVlMiBsYXJnZXItdGV4dFwiPnt7Y2Fsb3JpZXN9fTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic21hbGxlci10ZXh0XCI+a2NhbDwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPua2iOiAl+eDremHjzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiIEBjbGljaz1cIm9wZW5TZXRTdGVwc0RpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGlkPVwidVwiIGNsYXNzPVwiZGV0YWlsLXZhbHVlMyBsYXJnZXItdGV4dFwiPnt7Z29hbF9kYXl9fTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic21hbGxlci10ZXh0XCI+5q2lPjwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPuS7iuaXpeebruaghzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJib3R0b21fdmlld1wiPlxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNTJweDsgaGVpZ2h0OiA0NXB4OyBhbGlnbi1pdGVtczogZmxleC1lbmRcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDIzOHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MnB4OyBmb250LXNpemU6IDMxcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwb3NpdGlvbjogYWJzb2x1dGU7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogM3B4XCI+Qk1JL+S9k+iEgueOh+iuoeeulzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICM4MjgyODI7IHBhZGRpbmctdG9wOiAxMHB4OyBwYWRkaW5nLWxlZnQ6IDIwcHhcIiBAY2xpY2s9XCJvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZ1wiPuWhq+WGmeiuoeeulz48L3RleHQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDE0MHB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvbWluZ3JvdXAyLnBuZyk7IG1hcmdpbi10b3A6IDE1cHg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tbGVmdDogLTMwcHhcIj5cbiAgICAgICAgICA8aW1hZ2Ugc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl9ibWkucG5nXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgaGVpZ2h0OiA5MHB4XCIgLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IG1hcmdpbi1sZWZ0OiAxNnB4XCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjMtdGV4dFwiPkJNSTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFyZ2VyMi10ZXh0XCI+e3tibWl9fTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyXCI+XG4gICAgICAgICAgPGltYWdlIHNyYz1cIi9Db21tb24vaW1nL2ljb25fdHpsLnBuZ1wiIHN0eWxlPVwid2lkdGg6IDkwcHg7IGhlaWdodDogOTBweFwiIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBtYXJnaW4tbGVmdDogMTZweFwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYXJnZXIzLXRleHRcIj7kvZPohILnjoc8L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjItdGV4dFwiPnt7dHpsfX08L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvc3RhbmRhcmQucG5nKTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzY4cHg7IG1hcmdpbi10b3A6IDE0cHhcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8bXktZGlhbG9nIHZpc2libGU9XCJ7e29wZW4xfX1cIiBkaWFsb2ctdHlwZT1cInByb21wdFwiIG9uYWZmaXJtPVwiZW50ZXJTdGVwc1wiIG9uY2FuY2VsPVwiY2xvc2VcIiBvbmVudGVyPVwiZW50ZXJTdGVwc1wiIHByb21wdD1cInt7b2JqfX1cIj48L215LWRpYWxvZz5cbiAgICA8bXktZGlhbG9nIHZpc2libGU9XCJ7e29wZW4yfX1cIiBkaWFsb2ctdHlwZT1cInByb21wdDFcIiBvbmFmZmlybT1cImVudGVyRGV0YWlsc1wiIG9uY2FuY2VsPVwiY2xvc2VcIiBwcm9tcHQ9XCJ7e29ian19XCI+PC9teS1kaWFsb2c+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCIgc2hvdz1cInt7aXNTaG93fX1cIj5cbiAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGRcIj7nlLPor7cg5YGl6Lqr6L+Q5YqoIOadg+mZkDo8L3RleHQ+XG4gICAgICA8dGV4dCBzdHlsZT1cImZvbnQtd2VpZ2h0OiA1MDBcIj7nlKjkuo7orrDlvZXov5DliqjmraXmlbDvvIzorqHnrpfov5Dliqjph4/jgII8L3RleHQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuICAuaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDkwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICB0b3A6IDcwcHg7XG4gICAgd2lkdGg6IDcwMHB4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAudG9wX3ZpZXcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogODI4cHg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9Db21tb24vaW1nL2dyb3VwMi5wbmdcIik7IC8qIOabv+aNouS4uuS9oOeahOiDjOaZr+WbvueJh+i3r+W+hCAqL1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7IC8qIOS9v+iDjOaZr+WbvueJh+imhuebluaVtOS4quWuueWZqCAqL1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjsgLyog5bCG6IOM5pmv5Zu+54mH5bGF5Lit5a+56b2QICovXG4gIH1cblxuICAuYm90dG9tX3ZpZXcge1xuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgIHBhZGRpbmctbGVmdDogMjdweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyN3B4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNzUwcHg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IC0xMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcbiAgfVxuICAuaWNvbi1pbWFnZSB7XG4gICAgd2lkdGg6IDQ0cHg7IC8qIOiuvue9ruWbvueJh+WuveW6piAqL1xuICAgIGhlaWdodDogNDRweDsgLyog6K6+572u5Zu+54mH6auY5bqmICovXG4gIH1cblxuICAuY2lyY2xlIHtcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xuICB9XG5cbiAgLnRleHQtY29udGFpbmVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qIOS9v+aWh+acrOWxheS4reWvuem9kCAqL1xuICB9XG5cbiAgLnRpdGxlX3N0cGVzIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6ICMwMDA7XG4gIH1cblxuICAudGl0bGVfc3RwZXNfdiB7XG4gICAgZm9udC1zaXplOiA4MHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG5cbiAgLmRldGFpbHMge1xuICAgIHdpZHRoOiA3MDJweDtcbiAgICBoZWlnaHQ6IDE3NXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGIyZmY7XG4gICAgYm90dG9tOiAwOyAvKiDlm7rlrprlnKjniLblrrnlmajlupXpg6ggKi9cbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyMHB4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAuZGV0YWlsLWl0ZW0ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IC8qIOS9v+WtkOWFg+e0oOWeguebtOaOkuWIlyAqL1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAvKiDlrZDlhYPntKDlnKjlnoLnm7TmlrnlkJHlnYfljIDliIbluIMgKi9cbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDlrZDlhYPntKDlnKjmsLTlubPmlrnlkJHlsYXkuK0gKi9cbiAgfVxuXG4gIC5kZXRhaWwtdmFsdWUge1xuICAgIGZsZXg6IDE7IC8qIOWtkOWFg+e0oOW5s+WIhuWuveW6piAqL1xuXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdzsgLyog5L2/5a2Q5YWD57Sg5rC05bmz5o6S5YiXICovXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kOyAvKiDlrZDlhYPntKDlnKjmsLTlubPmlrnlkJHlsYXkuK0gKi9cbiAgfVxuXG4gIC5sYXJnZXItdGV4dCB7XG4gICAgZm9udC1zaXplOiA0OHB4OyAvKiDorr7nva7ovoPlpKfnmoTlrZfkvZPlpKflsI8gKi9cbiAgICBmb250LXdlaWdodDogYm9sZDtcblxuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cbiAgLmxhcmdlcjItdGV4dCB7XG4gICAgY29sb3I6ICMwMDAwMDA7XG4gICAgZm9udC1zaXplOiA0OHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLmxhcmdlcjMtdGV4dCB7XG4gICAgY29sb3I6ICM0YjRiNGI7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICB9XG4gIC5zbWFsbGVyLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMjRweDsgLyog6K6+572u6L6D5bCP55qE5a2X5L2T5aSn5bCPICovXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG4gIC5uLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMjZweDsgLyog6K6+572u6L6D5bCP55qE5a2X5L2T5aSn5bCPICovXG4gICAgY29sb3I6ICNmZmY7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIH1cbiAgLnRhYnMge1xuICAgIHdpZHRoOiA1MjBweDtcbiAgICBtYXJnaW4tdG9wOiAyNTVweDtcbiAgfVxuICAudGFiLWJhciB7XG4gICAgYm9yZGVyLWNvbG9yOiAjYmJiYmJiO1xuICAgIGNvbG9yOiAjYmJiYmJiO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTRweDtcbiAgfVxuICAudGFiLXRleHQge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBmb250LXNpemU6IDMycHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogNjVweDtcbiAgICBib3JkZXItcmFkaXVzOiA3NHB4O1xuICB9XG4gIC50YWItdGV4dDphY3RpdmUge1xuICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICM4ZmZmMzQgMCUsICNlYmZkNjYpO1xuICB9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgc2Vuc29yIGZyb20gJ0BzeXN0ZW0uc2Vuc29yJztcbiAgaW1wb3J0IHN0b3JhZ2UgZnJvbSAnQHN5c3RlbS5zdG9yYWdlJztcbiAgaW1wb3J0IGV4YW1wbGUgZnJvbSAnLi4vLi4vQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanMnO1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcblxuXG4gICAgcHJpdmF0ZToge1xuXG5cbiAgICAgIHVybDE6ICcnLFxuICAgICAgdXJsMjogJycsXG5cbiAgICAgIGNvbXBvbmVudERhdGE6IHt9LFxuICAgICAgZ29hbERheUtleTogXCJHT0FMX0RBWVwiLFxuICAgICAgdXNlckRldGFpbHNLZXk6IFwiVXNlckRldGFpbHNcIixcblxuICAgICAgc3RlcFN5czogMCwvL+iuvuWkh+W9k+WJjeaAu+atpeaVsFxuICAgICAgc3RlcHNfdmlldzogMCwgLy8g5b2T5YmN5pi+56S655qE5q2l5pWwXG5cblxuICAgICAgc3RlcHNEYXlBcGk6IDAsIC8vIOW9k+WkqeS6keatpeaVsFxuICAgICAgc3RlcHNXZWVrQXBpOiAwLCAvLyDlvZPlkajkupHmraXmlbBcbiAgICAgIHN0ZXBzTW9vbkFwaTogMCwgLy8g5b2T5pyI5LqR5q2l5pWwXG5cbiAgICAgIGdvYWxfZGF5OiAwLCAgLy8g5b2T5pel55uu5qCH5q2l5pWwXG5cbiAgICAgIHByb2dyZXNzOiAwLCAvLyDnlKjkuo7lrZjlgqjmraXmlbDov5vluqZcblxuICAgICAgY3VycmVudFBhZ2U6IC0xLC8v5b2T5YmN6YCJ55qE6aG177yM6buY6K6k5pi+56S65LuK5pelXG4gICAgICBzZWdtZW50czogW1xuICAgICAgICAn5LuK5pelJywgJ+WRqCcsICfmnIgnXG4gICAgICBdLFxuICAgICAgc2VnbWVudHNUZXh0czogW1xuICAgICAgICAn5LuK5pel5q2l5pWwJywgJ+acrOWRqOatpeaVsCcsICfmnKzmnIjmraXmlbAnXG4gICAgICBdLFxuICAgICAgc2VnbWVudHNUZXh0OiBcIlwiLFxuXG5cbiAgICAgIGJvZHlfd2VpZ2h0OiA2MCwvL+S9k+mHjVxuICAgICAgYm9keV9oZWlnaHQ6IDAsLy/ouqvpq5hcbiAgICAgIHNleDogMSwvL+aAp+WIqyAgMSDnlLfvvIwwIOWls1xuICAgICAgYWdlOiAwLFxuICAgICAgbWlsZWFnZTogXCIwLjBcIiwvL+mHjOeoi1xuICAgICAgY2Fsb3JpZXM6IFwiMC4wXCIsLy/ljaHot6/ph4xcbiAgICAgIGJtaTogMC4wLC8vQk1JXG4gICAgICB0emw6IDAuMCwvL+S9k+iEgueOh1xuXG5cbiAgICAgIG9wZW4xOiBmYWxzZSxcbiAgICAgIG9wZW4yOiBmYWxzZSxcbiAgICAgIG9iajoge30sXG4gICAgICBpc1Nob3c6IGZhbHNlLC8v6ZqQ56eB6K+i6ZeuXG4gICAgfSxcbiAgICAvL+mmlumhteWIneWni+WMlua1geeoi++8mlxuICAgIC8vIFN0ZXAx6I635Y+W55So5oi36K6+572u55qE5LuK5pel55uu5qCH5q2l5pWwXG4gICAgLy8gU3RlcDLku47lkI7lj7Dojrflj5blvZPliY3mraXmlbAgIFxuICAgIC8vIFN0ZXAz5qC55o2u6I635Y+W5Yiw55qE5b2T5YmN5q2l5pWw77yM5pu05paw5LuK5pel6L+b5bqm77yM6YeM56iL77yM5raI6ICX54Ot6YePIFxuICAgIC8vXG4gICAgYXN5bmMgb25Jbml0KCkge1xuICAgICAgY29uc29sZS5sb2coXCJvbkluaXQoKVwiKVxuICAgICAgdGhpcy51cmwxID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwyO1xuICAgICAgdGhpcy51cmwyID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwzO1xuXG4gICAgICB0aGlzLmdldEdvYWxEYXlTdGVwcygpOy8vIFN0ZXAxXG4gICAgICB0aGlzLmdldFVzZXJEZXRhaWxzKCk7XG4gICAgICB0aGlzLmFwaWdldFN0cGVzKCkvLyBTdGVwMlxuXG4gICAgfSxcblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uUmVhZHkoKVwiKVxuICAgICAgdGhpcy51cGRhdGVCTUlUemwoKTtcbiAgICB9LFxuXG4gICAgLy/lvLnlh7rpmpDnp4Hor6Lpl67vvIzkuI3og73oh6rliqjmiafooYzvvIzpnIDopoHnlKjmiLfngrnlh7vlip/og73ml7bmiY3miafooYzvvIznm67liY3pnIDmsYLmmK/ngrnlh7vigJjku4rml6XigJnvvIzigJjlkajigJnvvIzigJjmnIjigJnkuI7orr7nva7ku4rml6Xnm67moIfml7ZcbiAgICBhc3luYyBnZXRUcmVhdHlTdG9yYWdlKCkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVTdGVwQ291bnRlcigpXG5cbiAgICB9LFxuICAgIHN1YnNjcmliZVN0ZXBDb3VudGVyKCkge1xuICAgICAgdGhpcy5pc1Nob3cgPSB0cnVlO1xuICAgICAgLy8g6K6i6ZiF5q2l5pWw6K6h5pWw5ZmoXG4gICAgICBzZW5zb3Iuc3Vic2NyaWJlU3RlcENvdW50ZXIoe1xuICAgICAgICBjYWxsYmFjazogKHJldCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGDorr7lpIfmraXmlbDmm7TmlrDkuobvvIEtLS0tLS0+6K6+5aSH5oC75q2l5pWwPSR7cmV0LnN0ZXBzfWApXG5cbiAgICAgICAgICAvL+S/neWtmOadg+mZkFxuICAgICAgICAgICRwcm9jZXNzRGF0YS5zZXRTdG9yYWdlKFwiX1BSSVZBQ1wiLCB0cnVlKTtcbiAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5zdGVwU3lzID0gcmV0LnN0ZXBzO1xuICAgICAgICAgIC8v5LiK5Lyg5q2l5pWwXG4gICAgICAgICAgdGhpcy5hcGl1cGxvYWRTdHBlcyhyZXQuc3RlcHMpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYOatpeaVsOiuoeaVsOWZqOiuoumYheWksei0pSwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvL+iOt+WPlueUqOaIt+iuvuWumueahOS7iuaXpeebruagh1xuICAgIGdldEdvYWxEYXlTdGVwcygpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHN0b3JhZ2UuZ2V0KHtcbiAgICAgICAga2V5OiB0aGlzLmdvYWxEYXlLZXksXG4gICAgICAgIGRlZmF1bHQ6IDEwMDAwLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdzdG9yYWdlLmdldCgpOiAnLCBKU09OLnN0cmluZ2lmeShyZXQpKVxuICAgICAgICAgIHRoYXQuZ29hbF9kYXkgPSByZXRcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdnZXQgZmFpbCAtLS0gJyArIGVycm9jb2RlICsgJzonICsgZXJyb21zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy/kv53lrZjnlKjmiLforr7lrprnmoTku4rml6Xnm67moIdcbiAgICBzZXRHb2FsRGF5U3RlcHMoZGF0YSkge1xuICAgICAgc3RvcmFnZS5zZXQoe1xuICAgICAgICBrZXk6IHRoaXMuZ29hbERheUtleSwvL1xuICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RvcmFnZS5zZXQoKTogJywgSlNPTi5zdHJpbmdpZnkocmV0KSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdzZXQgZmFpbCAtLS0gJyArIGVycm9jb2RlICsgJzonICsgZXJyb21zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy/ojrflj5bnlKjmiLforr7lrprnmoTor6bmg4VcbiAgICBnZXRVc2VyRGV0YWlscygpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHN0b3JhZ2UuZ2V0KHtcbiAgICAgICAga2V5OiB0aGlzLnVzZXJEZXRhaWxzS2V5LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+iuvuWumuivpuaDheiOt+WPluaIkOWKnzonLCByZXQpO1xuICAgICAgICAgIGlmIChyZXQgJiYgcmV0LnRyaW0oKSkge1xuICAgICAgICAgICAgY29uc3QgdXNlckRldGFpbHMgPSBKU09OLnBhcnNlKHJldClcbiAgICAgICAgICAgIC8vIOabtOaWsOWQhOS4quWxnuaAp1xuICAgICAgICAgICAgdGhhdC5ib2R5X3dlaWdodCA9IE51bWJlcih1c2VyRGV0YWlscy5ib2R5X3dlaWdodCkgfHwgdGhhdC5ib2R5X3dlaWdodDsgLy8g56Gu5L+d6L2s5o2i5Li65pWw5a2X57G75Z6LXG4gICAgICAgICAgICB0aGF0LmJvZHlfaGVpZ2h0ID0gTnVtYmVyKHVzZXJEZXRhaWxzLmJvZHlfaGVpZ2h0KSB8fCB0aGF0LmJvZHlfaGVpZ2h0OyAvLyDnoa7kv53ovazmjaLkuLrmlbDlrZfnsbvlnotcbiAgICAgICAgICAgIHRoYXQuc2V4ID0gdXNlckRldGFpbHMuc2V4ICE9PSB1bmRlZmluZWQgPyB1c2VyRGV0YWlscy5zZXggOiB0aGF0LnNleDsgLy8g5L+d5oyB5Li65pWw5a2X57G75Z6LXG4gICAgICAgICAgICB0aGF0LmFnZSA9IE51bWJlcih1c2VyRGV0YWlscy5hZ2UpIHx8IHRoYXQuYWdlOyAvLyDnoa7kv53ovazmjaLkuLrmlbDlrZfnsbvlnotcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+abtOaWsOWQjueahOeUqOaIt+ivpuaDhTonLCB0aGF0LmJvZHlfd2VpZ2h0LCB0aGF0LmJvZHlfaGVpZ2h0LCB0aGF0LnNleCwgdGhhdC5hZ2UpO1xuXG4gICAgICAgICAgICB0aGF0LnVwZGF0ZUJNSVR6bCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldCBmYWlsIC0tLSAnICsgZXJyb2NvZGUgKyAnOicgKyBlcnJvbXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvL+S/neWtmOeUqOaIt+iuvuWumueahOivpuaDhVxuICAgIHNldFVzZXJEZXRhaWxzKCkge1xuICAgICAgY29uc3QgdXNlckRldGFpbHMgPSB7XG4gICAgICAgIGJvZHlfd2VpZ2h0OiB0aGlzLmJvZHlfd2VpZ2h0LFxuICAgICAgICBib2R5X2hlaWdodDogdGhpcy5ib2R5X2hlaWdodCxcbiAgICAgICAgc2V4OiB0aGlzLnNleCxcbiAgICAgICAgYWdlOiB0aGlzLmFnZVxuICAgICAgfTtcbiAgICAgIHN0b3JhZ2Uuc2V0KHtcbiAgICAgICAga2V5OiB0aGlzLnVzZXJEZXRhaWxzS2V5LFxuICAgICAgICB2YWx1ZTogdXNlckRldGFpbHMsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi36K+m5oOF5L+d5a2Y5oiQ5YqfOicsIHJldCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eUqOaIt+ivpuaDheS/neWtmOWksei0pTonLCBlcnJvbXNnLCBlcnJvY29kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuXG4gICAgLy/mm7TmlrDmraXmlbDov5vluqZcbiAgICB1cGRhdGVQcm9ncmVzcygpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGNvbnNvbGUubG9nKGDmm7TmlrDmraXmlbDov5vluqbvvIHku4rml6XkupHmraXmlbA9JHt0aGF0LnN0ZXBzRGF5QXBpfWApXG5cbiAgICAgIC8vIOWvueW6lOmhtemdoueahOaYvuekuuatpeaVsFxuICAgICAgY29uc3Qgc2VydmljZV9zdGVwID0gW3RoYXQuc3RlcHNEYXlBcGksIHRoYXQuc3RlcHNXZWVrQXBpLCB0aGF0LnN0ZXBzTW9vbkFwaV07XG4gICAgICAvLyDlvZPliY3mmL7npLrmraXmlbBcbiAgICAgIGNvbnN0IGN1cnJlbnRzU3RlcCA9IHNlcnZpY2Vfc3RlcFt0aGF0LmN1cnJlbnRQYWdlXTtcblxuICAgICAgLy8g5a6a5LmJ5LiN5ZCM6aG16Z2i5a+55bqU55qE55uu5qCH5q2l5pWwXG4gICAgICBjb25zdCBnb2FscyA9IFt0aGF0LmdvYWxfZGF5LCB0aGF0LmdvYWxfZGF5ICogNywgdGhhdC5nb2FsX2RheSAqIDMwXTtcbiAgICAgIC8vIOWvueW6lOmhtemdoueahOebruagh+atpeaVsFxuICAgICAgY29uc3QgY3VycmVudEdvYWwgPSBnb2Fsc1t0aGF0LmN1cnJlbnRQYWdlXTtcbiAgICAgIC8vIOiuoeeul+atpeaVsOavlOS+i1xuICAgICAgY29uc3Qgc3RlcFJhdGlvID0gY3VycmVudHNTdGVwIC8gY3VycmVudEdvYWw7XG4gICAgICAvLyDorqHnrpfov5vluqblgLzlubbmm7TmlrBcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbihzdGVwUmF0aW8gKiAxMDAsIDEwMCkgKiAwLjY2Oy8v5LmYMC42NueahOWOn+WboOS4uui/m+W6pueOr+acgOWkp+inkuW6puS4ujI2MOW6pu+8jOWNs+S4ieWIhuS5i+S6jOWchlxuXG4gICAgICB0aGlzLnN0ZXBzX3ZpZXcgPSBjdXJyZW50c1N0ZXA7XG4gICAgICB0aGlzLnNlZ21lbnRzVGV4dCA9IHRoYXQuc2VnbWVudHNUZXh0c1t0aGF0LmN1cnJlbnRQYWdlXVxuXG4gICAgICBjb25zb2xlLmxvZyhg55uu5YmNJHt0aGF0LnNlZ21lbnRzVGV4dH3ov5vluqYgPSAke01hdGgubWluKHN0ZXBSYXRpbyAqIDEwMCwgMTAwKS50b0ZpeGVkKDEpfSVgKTtcblxuICAgICAgdGhpcy51cGRhdGVNaWxlYWdlQW5kQ2Fsb3JpZXMoKS8v5pu05paw5Y2h6Lev6YeM77yM6YeM56iLXG4gICAgfSxcblxuXG4gICAgLy/mm7TmlrDljaHot6/ph4zvvIzph4znqItcbiAgICB1cGRhdGVNaWxlYWdlQW5kQ2Fsb3JpZXMoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLmJvZHlfd2VpZ2h0IDw9IDAgfHwgdGhpcy5ib2R5X3dlaWdodCA9PT0gJy0nKSB7XG4gICAgICAgIHRoaXMuY2Fsb3JpZXMgPSBcIjAuMFwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL+abtOaWsOmHjOeoi1xuICAgICAgICB0aGlzLm1pbGVhZ2UgPSAoKHRoYXQuc3RlcHNfdmlldyAqIDAuNikgLyAxMDAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAvLyDorqHnrpfljaHot6/ph4zmtojogJfvvIzlubblj6rmmL7npLrkuIDkvY3lsI/mlbBcbiAgICAgICAgdGhpcy5jYWxvcmllcyA9ICgwLjAxNzUgKiB0aGF0LmJvZHlfd2VpZ2h0ICogdGhhdC5zdGVwc192aWV3KS50b0ZpeGVkKDEpO1xuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8v5pu05pawQk1JIOS9k+iEgueOh1xuICAgIHVwZGF0ZUJNSVR6bCgpIHtcbiAgICAgIGlmICh0aGlzLmJvZHlfd2VpZ2h0IDw9IDAgfHwgdGhpcy5ib2R5X2hlaWdodCA8PSAwIHx8IHRoaXMuYWdlIDw9IDAgfHwgdGhpcy5ib2R5X3dlaWdodCA9PT0gJy0nIHx8IHRoaXMuYm9keV9oZWlnaHQgPT09ICctJyB8fCB0aGlzLmFnZSA9PT0gJy0nKSB7XG4gICAgICAgIHRoaXMudHpsID0gXCItLS1cIlxuICAgICAgICB0aGlzLmJtaSA9IFwiLS0tXCJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJtaSA9ICh0aGlzLmJvZHlfd2VpZ2h0IC8gKHRoaXMuYm9keV9oZWlnaHQgKiAwLjAxKSAqKiAyKS50b0ZpeGVkKDEpO1xuICAgICAgICBjb25zdCBwYXJhbTEgPSAxLjIgKiBwYXJzZUZsb2F0KGJtaSk7XG4gICAgICAgIGNvbnN0IHBhcmFtMiA9IHRoaXMuYWdlICogMC4yMztcbiAgICAgICAgY29uc3QgcGFyYW0zID0gNS40ICsgKDEwLjggKiB0aGlzLnNleCk7XG5cbiAgICAgICAgdGhpcy50emwgPSBwYXJzZUZsb2F0KChwYXJhbTEgKyBwYXJhbTIgLSBwYXJhbTMpLnRvRml4ZWQoMSkpICsgXCIlXCI7XG4gICAgICAgIHRoaXMuYm1pID0gYm1pO1xuICAgICAgfVxuICAgICAgLy/mm7TmlrDkuobkvZPph43vvIzpnIDopoHmm7TmlrDljaHot6/ph4xcbiAgICAgIHRoaXMudXBkYXRlTWlsZWFnZUFuZENhbG9yaWVzKClcbiAgICB9LFxuXG5cbiAgICAvL+aJk+W8gOWfuuacrOaDheWGteeql+WPo1xuICAgIG9wZW5CYXNpY0luZm9ybWF0aW9uRGlhbG9nKCkge1xuICAgICAgY29uc29sZS5sb2coYOaJk+W8gOWfuuacrOaDheWGteeql+WPo2ApO1xuICAgICAgdGhpcy5vcGVuMiA9IHRydWVcbiAgICAgIHRoaXMub2JqID0ge1xuICAgICAgICB0aXRsZTogJ+Whq+WGmeWfuuacrOaDheWGtScsXG4gICAgICAgIGZpZWxkdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwi6L6T5YWl5pW05pWw5pWw5a2XXCIsXG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy/miZPlvIDorr7lrprnm67moIfmraXmlbDnqpflj6NcbiAgICBvcGVuU2V0U3RlcHNEaWFsb2coKSB7XG5cbiAgICAgIHRoaXMuZ2V0VHJlYXR5U3RvcmFnZSgpXG5cbiAgICAgIGNvbnNvbGUubG9nKGDmiZPlvIDorr7lrprnm67moIfmraXmlbDnqpflj6NgKTtcblxuICAgICAgdGhpcy5vcGVuMSA9IHRydWVcbiAgICAgIHRoaXMub2JqID0ge1xuICAgICAgICB0aXRsZTogJ+iuvue9ruavj+aXpeatpeaVsCcsXG4gICAgICAgIGZpZWxkdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwi6L6T5YWl5pW05pWw5pWw5a2XXCIsXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8v56Gu5a6a55uu5qCH5q2l5pWwXG4gICAgZW50ZXJTdGVwcyhldnQpIHtcbiAgICAgIHRoaXMub3BlbjEgPSBmYWxzZVxuICAgICAgY29uc3QgZ29hbF9zdHBlID0gZXZ0LmRldGFpbC5ldmVudC52YWx1ZVxuICAgICAgY29uc29sZS5sb2coYOiuvuWumuS6huebruagh+atpeaVsO+8miR7Z29hbF9zdHBlfWApO1xuICAgICAgdGhpcy5nb2FsX2RheSA9IGdvYWxfc3RwZTtcbiAgICAgIHRoaXMuc2V0R29hbERheVN0ZXBzKGdvYWxfc3RwZSk7XG4gICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKCk7XG5cbiAgICB9LFxuXG4gICAgLy/noa7lrprln7rmnKzmg4XlhrVcbiAgICBlbnRlckRldGFpbHMoZXZ0KSB7XG4gICAgICB0aGlzLm9wZW4yID0gZmFsc2VcblxuICAgICAgY29uc3Qga2cgPSBldnQuZGV0YWlsLmV2ZW50LmtnXG4gICAgICBjb25zdCBjbSA9IGV2dC5kZXRhaWwuZXZlbnQuY21cbiAgICAgIGNvbnN0IGFnZSA9IGV2dC5kZXRhaWwuZXZlbnQuYWdlXG4gICAgICBjb25zdCBzZXggPSBldnQuZGV0YWlsLmV2ZW50LnNleFxuICAgICAgY29uc29sZS5sb2coYOiuvuWumuS6huS9k+mHje+8miR7a2d9LOi6q+mrmO+8miR7Y219LOW5tOm+hO+8miR7YWdlfSxzZXg6JHtzZXh9YCk7XG5cbiAgICAgIHRoaXMuYm9keV93ZWlnaHQgPSBrZztcbiAgICAgIHRoaXMuYm9keV9oZWlnaHQgPSBjbTtcbiAgICAgIHRoaXMuYWdlID0gYWdlO1xuICAgICAgdGhpcy5zZXggPSBzZXg7XG5cbiAgICAgIHRoaXMuc2V0VXNlckRldGFpbHMoKVxuICAgICAgdGhpcy51cGRhdGVCTUlUemwoKVxuXG4gICAgfSxcblxuICAgIGNsb3NlKCkge1xuICAgICAgY29uc29sZS5sb2coYOWFs+mXreS6hueql+WPo++8mmApO1xuICAgICAgdGhpcy5vcGVuMSA9IGZhbHNlXG4gICAgICB0aGlzLm9wZW4yID0gZmFsc2VcbiAgICB9LFxuXG4gICAgLy/liIfmjaLlpKnvvIzlkajvvIzmnIjpobXpnaJcbiAgICBjaGFuZ2VUYWJhY3RpdmU6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlICE9PSAtMSkgeyB0aGlzLmdldFRyZWF0eVN0b3JhZ2UoKSB9Ly/mnKrngrnlh7vml7bkuI3or6Lpl65cblxuICAgICAgY29uc29sZS5sb2coZS5pbmRleClcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmluZGV4O1xuXG4gICAgICB0aGlzLmFwaWdldFN0cGVzKClcbiAgICB9LFxuXG5cblxuICAgIC8v6I635Y+W5LqR5q2l5pWwXG4gICAgYXBpZ2V0U3RwZXMoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zdCB0eXBlcyA9IFtcIlRPREFZXCIsIFwiV0VFS1wiLCBcIk1PT05cIl07XG4gICAgICBjb25zdCBhcGlLZXlzID0gW1wic3RlcHNEYXlBcGlcIiwgXCJzdGVwc1dlZWtBcGlcIiwgXCJzdGVwc01vb25BcGlcIl07XG4gICAgICB2YXIgdCA9IHR5cGVzW3RoYXQuY3VycmVudFBhZ2VdO1xuICAgICAgZXhhbXBsZS5nZXRzdGVwcyh7XG4gICAgICAgIHR5cGU6IHRcbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+W44CKJHt0feOAi+S6keatpeaVsOaIkOWKn++8gSAtLS0tLS0+5LqR5q2l5pWwPSR7cmVzcG9uc2UuZGF0YX1gKTtcblxuICAgICAgICAvLyDmoLnmja7lvZPliY3pobXpnaLkv53lrZjmraXmlbBcbiAgICAgICAgdGhhdFthcGlLZXlzW3RoYXQuY3VycmVudFBhZ2VdXSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignIOiOt+WPliR7dH3mraXmlbDlpLHotKU6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG5cbiAgICAvL+S4iuS8oOatpeaVsFxuICAgIGFwaXVwbG9hZFN0cGVzKGMpIHtcbiAgICAgIHZhciB0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnNvbGUubG9nKGDkuIrkvKDmraXmlbDkuK0tLS0tPuatpeaVsD0ke2N9LHQgPSAke3R9YCk7XG5cbiAgICAgIGV4YW1wbGUudXBsb2Fkc3RlcHMoe1xuICAgICAgICBjb3VudDogYyxcbiAgICAgICAgXCJ0aW1lc3RhbXBcIjogdFxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcg5LiK5Lyg5q2l5pWwc3VjY2Vzc2Z1bDonLCByZXNwb25zZSk7XG4gICAgICAgIHRoaXMuc3RlcHNEYXlBcGkgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyDkuIrkvKDmraXmlbBmYWlsZWQ6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICB9XG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyBwYWRkaW5nLXRvcDogMjdweFwiPlxyXG4gICAgPGRpdiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IHdpZHRoOiA3MDJweDsgaGVpZ2h0OiA1OTJweDsgcGFkZGluZzogMjVweDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgbWFyZ2luLXRvcDogMTUwcHhcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgaGVpZ2h0OiA3MHB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxNTJweDsgaGVpZ2h0OiA0NXB4OyBhbGlnbi1pdGVtczogZmxleC1lbmRcIj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTMwcHg7IGhlaWdodDogMjhweDsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZTlmZDY1LCAjOTVmZjM3IDEwMCUpOyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvcmRlci1yYWRpdXM6IDU4cHhcIj48L2Rpdj5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogNDJweDsgZm9udC1zaXplOiAzMXB4OyBmb250LXdlaWdodDogYm9sZDsgcG9zaXRpb246IGFic29sdXRlOyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IDNweFwiPuatpeaVsOiusOW9lTwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjRweDsgY29sb3I6ICM4MjgyODJcIj7ljZXkvY3vvJrmraU8L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG1hcmdpbi10b3A6IDIwcHhcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjZweDsgY29sb3I6ICMwMDAwMDA7IGZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW46IDIwcHhcIj4yMDI0PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+MDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjIwMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj40MDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+NjAwMDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjgwMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj4xMDAwMDwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGxpc3QgY2xhc3M9XCJsaXN0XCI+XHJcbiAgICAgICAgICA8bGlzdC1pdGVtIHR5cGU9XCJsaXN0SXRlbVwiIGZvcj1cInt7bGlzdDMwZGF5RGF0YX19XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+XHJcbiAgICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IGZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICMwMDAwMDBcIj57eyRpdGVtLnN1bW1hcnlEYXRlfX08L3RleHQ+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImhlaWdodDogMTAwJTsgaGVpZ2h0OiAzMnB4OyBtYXJnaW4tbGVmdDogIDI0cHg7YmFja2dyb3VuZC1jb2xvcjojMDBiMmZmIDtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTBweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNTBweFwiPlxyXG4gICAgICAgICAgICAgICAgPHByb2dyZXNzIGNsYXNzPVwicHJvZ3Jlc3NcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBjb2xvcjogIzAwYjJmZjtsYXllci1jb2xvcjojZmZmO1wiIHBlcmNlbnQ9XCJ7eyRpdGVtLnBlcmNlbnR9fVwiPjwvcHJvZ3Jlc3M+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9saXN0LWl0ZW0+XHJcbiAgICAgICAgPC9saXN0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luLXRvcDogMzBweFwiPlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMTE2cHg7IHBhZGRpbmc6IDEycHg7IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjsgZm9udC1zaXplOiAyNHB4OyBjb2xvcjogIzgyODI4Mjsgd2lkdGg6IDI4MHB4XCI+5LuF5pi+56S65pyA6L+RMzDlpKnmraXmlbA8L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG5cclxuPHN0eWxlPlxyXG4gIC5saXN0IHtcclxuICAgIGxheW91dC10eXBlOiBzdGFnZ2VyO1xyXG4gIH1cclxuXHJcbiAgLml0ZW0ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMjBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgZXhhbXBsZSBmcm9tICcuLi8uLi9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyc7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIHByaXZhdGU6IHtcclxuICAgICAgbGlzdDMwZGF5RGF0YTogW1xyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgdGhpcy4kcGFnZS5zZXRUaXRsZUJhcih7IHRleHQ6ICfmraXmlbDorrDlvZUnIH0pXHJcbiAgICB9LFxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgdGhpcy5pbml0Q2hhcnQoKTtcclxuXHJcbiAgICAgIHRoaXMuZ2V0MzBkYXlSZWNvcmQoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdldDMwZGF5UmVjb3JkKCkge1xyXG4gICAgICBleGFtcGxlLmdldHN0ZXBzbGlzdCgpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5pyA6L+RMzDlpKnorrDlvZUt5oiQ5Yqf77yBOicsIHJlc3BvbnNlKTtcclxuICAgICAgICAgIHRoaXMubGlzdDMwZGF5RGF0YSA9IHRoaXMuZm9ybWF0RGF0YShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluacgOi/kTMw5aSp6K6w5b2VLeWksei0pe+8jOWTjeW6lOS4uuepuuaIluayoeacieaVsOaNru+8gScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignIOiOt+WPluacgOi/kTMw5aSp6K6w5b2VLeWksei0pe+8gScsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG4gICAgZm9ybWF0RGF0YShkYXRhKSB7XHJcbiAgICAgIGNvbnN0IG1heFN0ZXBzID0gMTAwMDA7IC8vIOWBh+iuvuacgOWkp+atpeaVsOS4ujEwMDAwXHJcbiAgICAgIHJldHVybiBkYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IChpdGVtLnN1bW1hcnlEYXRlKS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIOaPkOWPluaciOS7veWSjOaXpeacn+mDqOWIhlxyXG4gICAgICAgIGxldCBmb3JtYXR0ZWREYXRlID0gZGF0ZS5zdWJzdHJpbmcoNCwgNikgKyAnLScgKyBkYXRlLnN1YnN0cmluZyg2LCA4KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gcGFyc2VJbnQoaXRlbS5zdGVwQ291bnQsIDEwKTsgLy8gIFxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKChzdGVwQ291bnQgLyBtYXhTdGVwcykgKiAxMDApOyAvLyDorqHnrpfnmb7liIbmr5Tlubblm5voiI3kupTlhaVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc3VtbWFyeURhdGU6IGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgICBzdGVwQ291bnQ6IHN0ZXBDb3VudCxcclxuICAgICAgICAgIHBlcmNlbnQ6IHBlcmNlbnRcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRDaGFydCgpIHtcclxuICAgIH0sXHJcbiAgfVxyXG48L3NjcmlwdD4iLCJcclxuPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b3Bfdmlld1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24taXRlbXM6IGNlbnRlcjsgd2lkdGg6IDEwMCU7IGhlaWdodDogODAlXCIgb25jbGljaz1cInRvTG9naW5cIj5cclxuICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMTIwcHg7IGhlaWdodDogMTIwcHg7IG1hcmdpbi1sZWZ0OiA2MHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvdG91eGlhbmcucG5nXCIgLz5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IGhlaWdodDogMTIwcHg7IG1hcmdpbi1sZWZ0OiAxMHB4OyBwYWRkaW5nOiAxMHB4XCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImxvZ1wiIHN0eWxlPVwiY29sb3I6ICMwMDAwMDA7IGZvbnQtc2l6ZTogMzJweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj57eyB1c2VyRGF0YS5sb2dpblBob25lIHx8ICfor7fngrnlh7vnmbvlvZUnIH19PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ1c2VyX2lkXCIgc3R5bGU9XCJjb2xvcjogIzY5Njk2OTsgZm9udC1zaXplOiAyOHB4XCI+SUQ6e3t1c2VyRGF0YS51c2VySWR9fTwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogLTExMHB4OyBib3R0b206IDA7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgcGFkZGluZy1sZWZ0OiA1MHB4OyBwYWRkaW5nLXJpZ2h0OiA1MHB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvZ3JvdXAucG5nKTsgaGVpZ2h0OiAxNjRweDsgd2lkdGg6IDcwMnB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiA3MnB4OyBmb250LXdlaWdodDogYm9sZFwiPnt7dXNlckRhdGEuYmFsYW5jZX19PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiAzMnB4OyBtYXJnaW4tbGVmdDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTJweFwiPuWFgzwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyB3aWR0aDogMTUwcHg7IGhlaWdodDogNzBweDsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDI3MGRlZywgI2Y3YmJhNCAwJSwgI2ZkZWNkNyk7IGJvcmRlci1yYWRpdXM6IDE5MnB4XCIgb25jbGljaz1cInB1c2hQYWdlVGl4aWFuXCI+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjYWE1MDIxOyBmb250LXNpemU6IDMycHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+5o+Q546wPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b21fdmlld1wiPlxyXG4gICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxODBweDsgbWFyZ2luLWJvdHRvbTogMjBweFwiIHNyYz1cIi9Db21tb24vaW1nL2Jhbm5lcl9tZS5wbmdcIiBvbmNsaWNrPVwib3BlbkFkXCIgLz5cclxuICAgICAgPGRpdiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IHdpZHRoOiA3MDJweDsgaGVpZ2h0OiAzODBweDsgcGFkZGluZzogMjBweDsgZmxleC1kaXJlY3Rpb246IGNvbHVtblwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTUycHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEzMHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj7miJHnmoTmnI3liqE8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IG1hcmdpbi1ib3R0b206IDMwcHg7IG1hcmdpbi10b3A6IDIwcHhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwiYWRkRGVza3RvcFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTEucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5re75Yqg5qGM6Z2iPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCIgb25jbGljaz1cInB1c2hQYWdlZmVlZGJhY2tcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWUyLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuS4vuaKpeWPjemmiDwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNod2ViKDEpXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lMy5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7luK7liqnkuK3lv4M8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaHdlYigyKVwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTQucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+55So5oi35Y2P6K6uPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNod2ViKDMpXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lNS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7pmpDnp4HmlL/nrZY8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaFBhZ2VwZXJtaXNzaW9uc1wiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTYucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+6K6+572uPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IG9uY2xpY2s9XCJwdXNoUGFnZWFib3V0XCIgY2xhc3M9XCJmcmFtZV9cIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWU3LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuWFs+S6jjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNoUGFnZWxvZ091dFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTgucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5rOo6ZSAPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGU+XHJcbiAgLmZyYW1lXyB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgLmZyYW1lX2ltYSB7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxuICB9XHJcbiAgLmZyYW1lX3RleHQge1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICB3aWR0aDogMTA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG5cclxuICAudG9wX3ZpZXcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDYwMHB4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvQ29tbW9uL2ltZy9iZ19tZS5wbmdcIik7IC8qIOabv+aNouS4uuS9oOeahOiDjOaZr+WbvueJh+i3r+W+hCAqL1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgLyog5L2/6IOM5pmv5Zu+54mH6KaG55uW5pW05Liq5a655ZmoICovXHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IC8qIOWwhuiDjOaZr+WbvueJh+WxheS4reWvuem9kCAqL1xyXG4gIH1cclxuXHJcbiAgLmJvdHRvbV92aWV3IHtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAtOTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZToge1xyXG5cclxuXHJcbiAgICAgIHVzZXJEYXRhOiB7fSxcclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcblxyXG4gICAgICB0aGlzLmdldFVzZXIoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFVzZXIoKSB7XHJcbiAgICAgIHRoaXMudXNlckRhdGEgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgdG9Mb2dpbigpIHtcclxuICAgICAgdmFyIHBob25lID0gdGhpcy51c2VyRGF0YS5sb2dpblBob25lXHJcbiAgICAgIGlmIChwaG9uZSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnUGFnZV9sb2dpbidcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2hQYWdlVGl4aWFuKCkge1xyXG5cclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX1RpeGlhbidcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2VhYm91dCgpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX2Fib3V0J1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2VmZWVkYmFjaygpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdmZWVkYmFjaydcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2Vsb2dPdXQoKSB7XHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnbG9nT3V0J1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVzaFBhZ2VwZXJtaXNzaW9ucygpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdwZXJtaXNzaW9ucydcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5BZCgpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX2NmZCdcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYWRkRGVza3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn5re75Yqg5qGM6Z2iJyk7XHJcbiAgICAgIGNvbnN0IHNob3J0Y3V0ID0gcmVxdWlyZShcIkBzeXN0ZW0uc2hvcnRjdXRcIilcclxuICAgICAgc2hvcnRjdXQuaGFzSW5zdGFsbGVkKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGFzSW5zdGFsbGVkIHN1Y2Nlc3MgcmV0LS0tJyArIHJldCk7XHJcbiAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICBtZXNzYWdlOiAn5qGM6Z2i5Zu+5qCH5bey5Yib5bu6JyxcclxuICAgICAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvcnRjdXQuaW5zdGFsbCh7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ+a3u+WKoOahjOmdouaWueW8j+abtOaWueS+vycsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsaW5nIGNyZWF0ZVNob3J0Q3V0IHN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsaW5nIGNyZWF0ZVNob3J0Q3V0IGZhaWwnKTtcclxuICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hhc0luc3RhbGxlZCBmYWlsIHJldC0tLScgKyBlcnJvbXNnKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2h3ZWIoaSkge1xyXG5cclxuXHJcbiAgICAgIHZhciB1cmwgPSAnJ1xyXG4gICAgICBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgIHVybCA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudXJsMTtcclxuICAgICAgfSBpZiAoaSA9PT0gMikge1xyXG4gICAgICAgIHVybCA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudXJsMjtcclxuICAgICAgfSBpZiAoaSA9PT0gMykge1xyXG4gICAgICAgIHVybCA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudXJsMztcclxuICAgICAgfVxyXG5cclxuICAgICAgJHdlYnZpZXcubG9hZFVybCh7XHJcbiAgICAgICAgdXJsOiB1cmxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgfTtcclxuPC9zY3JpcHQ+IiwiPGltcG9ydCBuYW1lPVwicGFnZXJlY29yZFwiIHNyYz1cIi4vUGFnZV9SZWNvcmQvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInBhZ2Vob21lXCIgc3JjPVwiLi9QYWdlX0hvbWUvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInBhZ2V1c2VyXCIgc3JjPVwiLi9QYWdlX1VzZXIvaW5kZXhcIj48L2ltcG9ydD5cbjx0ZW1wbGF0ZT5cblx0PGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuXHRcdDx0YWJzIG9uY2hhbmdlPVwiY2hhbmdlVGFiYWN0aXZlXCI+XG5cdFx0XHQ8dGFiLWNvbnRlbnQ+XG5cdFx0XHRcdDxibG9jayBmb3I9XCJkYXRhcy5saXN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8cGFnZWhvbWUgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n6aaW6aG1Jz90cnVlOmZhbHNlfX1cIj48L3BhZ2Vob21lPlxuXHRcdFx0XHRcdFx0PHBhZ2VyZWNvcmQgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n5q2l5pWwJz90cnVlOmZhbHNlfX1cIj48L3BhZ2VyZWNvcmQ+XG5cdFx0XHRcdFx0XHQ8cGFnZXVzZXIgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n5oiR55qEJz90cnVlOmZhbHNlfX1cIj48L3BhZ2V1c2VyPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Jsb2NrPlxuXHRcdFx0PC90YWItY29udGVudD5cblxuXHRcdFx0PHRhYi1iYXIgY2xhc3M9XCJ0YWJfYmFyXCI+XG5cdFx0XHRcdDxibG9jayBmb3I9XCJkYXRhcy5saXN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRhYl9pdGVtXCI+XG5cdFx0XHRcdFx0XHQ8aW1hZ2Ugc3JjPVwie3skaXRlbS5zaG93PyRpdGVtLnBpY19jaG9pY2U6JGl0ZW0ucGljfX1cIiAvPlxuXHRcdFx0XHRcdFx0PHRleHQgc3R5bGU9XCJjb2xvcjoge3skaXRlbS5jb2xvcn19XCI+e3skaXRlbS50aXRsZX19PC90ZXh0PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Jsb2NrPlxuXHRcdFx0PC90YWItYmFyPlxuXHRcdDwvdGFicz5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5cdC5jb250YWluZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG5cdH1cblxuXHQudGFiX2JhciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0XHR3aWR0aDogNzUwcHg7XG5cdFx0Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcblx0XHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcblx0fVxuXG5cdC50YWJfaXRlbSB7XG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdHBhZGRpbmctdG9wOiAxNHB4O1xuXHRcdHBhZGRpbmctYm90dG9tOiAxMXB4O1xuXHRcdHdpZHRoOiAxNzFweDtcblx0XHRoZWlnaHQ6IDEwNC4ycHg7XG5cdH1cblxuXHQudGFiX2l0ZW0gaW1hZ2Uge1xuXHRcdHdpZHRoOiA1MHB4O1xuXHRcdGhlaWdodDogNTBweDtcblx0XHRyZXNpemUtbW9kZTogY29udGFpbjtcblx0XHRvcGFjaXR5OiAwLjU7XG5cdH1cblxuXHQudGFiX2l0ZW0gaW1hZ2U6YWN0aXZlIHtcblx0XHR3aWR0aDogNTBweDtcblx0XHRoZWlnaHQ6IDUwcHg7XG5cdFx0cmVzaXplLW1vZGU6IGNvbnRhaW47XG5cdH1cblxuXHQudGFiX2l0ZW0gdGV4dCB7XG5cdFx0Zm9udC1zaXplOiAyMXB4O1xuXHRcdG1hcmdpbi10b3A6IDEwcHg7XG5cdH1cblxuXHQuaXRlbS1jb250YWluZXIge1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHR9XG5cblx0Lm1haW4tdGV4dCB7XG5cdFx0Zm9udC1zaXplOiAxMDBweDtcblx0XHRjb2xvcjogIzVmOWVhMDtcblx0fVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRwcml2YXRlOiB7XG5cdFx0XHRkYXRhczoge1xuXHRcdFx0XHRjb2xvcl9ub3JtYWw6ICcjQzhDOEM4Jyxcblx0XHRcdFx0Y29sb3JfYWN0aXZlOiAnIzAwQjJGRicsXG5cdFx0XHRcdHNob3c6IHRydWUsXG5cdFx0XHRcdGxpc3Q6IFt7XG5cdFx0XHRcdFx0aTogMCxcblx0XHRcdFx0XHRjb2xvcjogJyNGRjc1MDAnLFxuXHRcdFx0XHRcdHBpYzogJy9Db21tb24vaW1nL2Jhcl8xLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy9Db21tb24vaW1nL2Jhcl8xMS5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IHRydWUsXG5cdFx0XHRcdFx0dGl0bGU6ICfpppbpobUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpOiAxLFxuXHRcdFx0XHRcdGNvbG9yOiAnIzg3ODc4NycsXG5cdFx0XHRcdFx0cGljOiAnL0NvbW1vbi9pbWcvYmFyXzIucG5nJyxcblx0XHRcdFx0XHRwaWNfY2hvaWNlOiAnL0NvbW1vbi9pbWcvYmFyXzIyLnBuZycsXG5cdFx0XHRcdFx0c2hvdzogZmFsc2UsXG5cdFx0XHRcdFx0dGl0bGU6ICfmraXmlbAnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpOiAyLFxuXHRcdFx0XHRcdGNvbG9yOiAnIzg3ODc4NycsXG5cdFx0XHRcdFx0cGljOiAnL0NvbW1vbi9pbWcvYmFyXzMucG5nJyxcblx0XHRcdFx0XHRwaWNfY2hvaWNlOiAnL0NvbW1vbi9pbWcvYmFyXzMzLnBuZycsXG5cdFx0XHRcdFx0c2hvdzogZmFsc2UsXG5cdFx0XHRcdFx0dGl0bGU6ICfmiJHnmoQnXG5cdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXG5cblx0XHR9LFxuXHRcdGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5kYXRhcy5saXN0W2ldO1xuXHRcdFx0XHRlbGVtZW50LnNob3cgPSBmYWxzZTtcblx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3Jfbm9ybWFsO1xuXHRcdFx0XHRpZiAoaSA9PT0gZS5pbmRleCkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2hvdyA9IHRydWU7XG5cdFx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3JfYWN0aXZlO1xuXG5cdFx0XHRcdFx0aWYgKGUuaW5kZXggPT09IDApIHtcblx0XHRcdFx0XHRcdCR1dGlscy5oaWRlQmFuZXJBZCgpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCR1dGlscy52aWV3QmFubmVyKClcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvbkluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdH0sXG5cdFx0YXN5bmMgb25TaG93KG9wdGlvbnMpIHtcblxuXHRcdFx0JHVtZW5nX3N0YXQucmVzdW1lKHRoaXMpXG5cdFx0XHRjb25zb2xlLmxvZygn5Li76aG1IG9uU2hvdygpLS0tLS0tLS0tLS0tLS0tLS0+Jyk7XG5cdFx0XHR0aGlzLmdldFVzZXIoKTtcblxuXG5cdFx0XHRjb25zdCBzdG9yYWdlRmxhZyA9IGF3YWl0ICRwcm9jZXNzRGF0YS5nZXRTdG9yYWdlKFwiX1BSSVZBQ1wiKTtcblx0XHRcdGNvbnNvbGUubG9nKCfnlKjmiLfmjojmnYM9ICcsIHN0b3JhZ2VGbGFnKTtcblx0XHRcdGlmIChzdG9yYWdlRmxhZykge1xuXHRcdFx0XHQvL+aYvuekumJhbm5lciDlub/lkYrpq5jluqbvvIzlupXpg6jnvKnov5tcblx0XHRcdFx0JHV0aWxzLnNob3dCYW5uZXJBZCh0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLmJhbm5lckFkVW5pdElkLCAxMzUpXG5cdFx0XHR9IGVsc2UgeyAgIC8v5pyq5o6I5p2D77yM5by55Ye65o6I5p2D6K+i6ZeuXG5cdFx0XHRcdGNvbnNvbGUubG9nKCfmnKrmjojmnYMs5LiN5Yqg6L295bm/5ZGKJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9uSGlkZSgpIHtcblx0XHRcdCR1bWVuZ19zdGF0LnBhdXNlKHRoaXMpOy8v5Zyob25IaWRl5pa55rOV55qE56ys5LiA6KGM5Yqg5YWl5q2k5Luj56CBXG5cdFx0fSxcblxuXG5cdFx0Z2V0VXNlcigpIHtcblx0XHRcdCRhcGlzLnVzZXIuZ2V0VXNlckluZm8oKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ+eUqOaIt+S/oeaBry0tLS0tLS0tLS0tLS0tLS0tPicgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcblx0XHRcdFx0dGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51c2VyRGF0YS5sb2dpblBob25lID0gcmVzLmRhdGEubG9naW5QaG9uZVxuXHRcdFx0XHR0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhLnVzZXJJZCA9IHJlcy5kYXRhLnVzZXJJZFxuXHRcdFx0XHR0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhLmJhbGFuY2UgPSByZXMuZGF0YS5iYWxhbmNlXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0b25IaWRlKCkge1xuXHRcdFx0Ly/pnIDopoHpmpDol4/ml7blsLHplIDmr4FiYW5uZXJcblx0XHRcdCR1dGlscy5kZXN0cm95QmFubmVyKCk7XG5cdFx0fVxuXHR9O1xuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8c3RhY2sgc3R5bGU9XCJ7e3N0eWxlfX1cIj5cbiAgICA8Y2FudmFzIGlkPVwie3tpZH19XCIgY2xhc3M9XCJjYW52YXNcIj48L2NhbnZhcz5cbiAgICA8ZGl2IGNsYXNzPVwic2xvdFwiPlxuICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIDwvZGl2PlxuICA8L3N0YWNrPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgY29uc3QgdG9BbmdsZSA9IGEgPT4gKGEgLyAxODApICogTWF0aC5QSTtcbiAgY29uc3QgcGVyY2VudCA9IGEgPT4gdG9BbmdsZSgoYSAvIDEwMCkgKiAzNjApO1xuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmVnaW5BbmdsZTogdG9BbmdsZSh0aGlzLnNBbmdsZSksXG4gICAgICAgIHN0YXJ0QW5nbGU6IHRvQW5nbGUodGhpcy5zQW5nbGUpLFxuICAgICAgICBlbmRBbmdsZTogcGVyY2VudCh0aGlzLnBlcmNlbnQpICsgdG9BbmdsZSh0aGlzLnNBbmdsZSksXG4gICAgICAgIGNvbG9yOiB0aGlzLnN0cm9rZUNvbG9yXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBwcm9wczoge1xuICAgICAgcGVyY2VudDoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDMwMFxuICAgICAgfSxcbiAgICAgIHN0cm9rZVdpZHRoOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMjBcbiAgICAgIH0sXG4gICAgICBzdHJva2VDb2xvcjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwiIzJkOGNmMFwiXG4gICAgICB9LFxuICAgICAgc3Ryb2tlTGluZWNhcDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwicm91bmRcIiAvL3JvdW5kfHNxdWFyZXxidXR0XG4gICAgICB9LFxuICAgICAgdHJhaWxXaWR0aDoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDIwXG4gICAgICB9LFxuICAgICAgdHJhaWxDb2xvcjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwiI2VhZWVmMlwiXG4gICAgICB9LFxuICAgICAgc2hvd1RyYWlsOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgIH0sXG4gICAgICBzQW5nbGU6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAwXG4gICAgICB9LFxuICAgICAgYW50aWNsb2Nrd2lzZToge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCJjYW52YXNJZFwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIGB3aWR0aDogJHt0aGlzLnNpemV9cHg7IGhlaWdodDogJHt0aGlzLnNpemV9cHg7YDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Jbml0KCkge1xuICAgICAgdGhpcy4kd2F0Y2goXCJzdHJva2VDb2xvclwiLCBcIndhdGNoU3Ryb2tlQ29sb3JDaGFuZ2VcIik7XG4gICAgICB0aGlzLiR3YXRjaChcInBlcmNlbnRcIiwgXCJ3YXRjaFBlcmNlbnRDaGFuZ2VcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLiRlbGVtZW50KHRoaXMuaWQpO1xuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIHdhdGNoU3Ryb2tlQ29sb3JDaGFuZ2UobmV3VmFsKSB7XG4gICAgICB0aGlzLmNvbG9yID0gbmV3VmFsO1xuICAgIH0sXG5cbiAgICB3YXRjaFBlcmNlbnRDaGFuZ2UobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPD0gMCkgeyBuZXdWYWwgPSAwOyB9XG4gICAgICBpZiAobmV3VmFsID49IDEwMCkgeyBuZXdWYWwgPSAxMDA7IH1cbiAgICAgIHRoaXMuZW5kQW5nbGUgPSBwZXJjZW50KG5ld1ZhbCkgKyB0aGlzLmJlZ2luQW5nbGU7XG5cbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuXG4gICAgICB0aGlzLmRyYXcoKTtcbiAgICB9LFxuXG4gICAgZHJhdygpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYW50aWNsb2Nrd2lzZSxcbiAgICAgICAgc3Ryb2tlTGluZWNhcCxcbiAgICAgICAgc2hvd1RyYWlsLFxuICAgICAgICBzaXplLFxuICAgICAgICBzdHJva2VXaWR0aCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIHRyYWlsV2lkdGgsXG4gICAgICAgIHRyYWlsQ29sb3IsXG4gICAgICAgIGN0eFxuICAgICAgfSA9IHRoaXM7XG4gICAgICAvL+WchueahOWchuW/g+S9jee9rlxuICAgICAgY29uc3QgcG9zaXRpb24gPSBzaXplIC8gMjtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IHBvc2l0aW9uIC0gc3Ryb2tlV2lkdGggLyAyO1xuICAgICAgY29uc3QgcCA9IDIgKiBNYXRoLlBJO1xuICAgICAgY29uc3QgYmVnaW5BbmdsZSA9IGFudGljbG9ja3dpc2UgPyBwIC0gdGhpcy5iZWdpbkFuZ2xlIDogdGhpcy5iZWdpbkFuZ2xlO1xuICAgICAgY29uc3Qgc3RhcnRBbmdsZSA9IGFudGljbG9ja3dpc2UgPyBwIC0gdGhpcy5zdGFydEFuZ2xlIDogdGhpcy5zdGFydEFuZ2xlO1xuICAgICAgY29uc3QgZW5kQW5nbGUgPSBhbnRpY2xvY2t3aXNlID8gcCAtIHRoaXMuZW5kQW5nbGUgOiB0aGlzLmVuZEFuZ2xlO1xuICAgICAgY29uc3Qgc3RlcCA9IChlbmRBbmdsZSAtIHN0YXJ0QW5nbGUpIC8gMTAwO1xuICAgICAgbGV0IHRlbXBFbmRBbmdsZSA9IHN0YXJ0QW5nbGU7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBkcmF3QmFja2dyb3VuZCgpIHtcbiAgICAgICAgLy9cYiDnu5jliLbog4zmma/njq9cbiAgICAgICAgaWYgKHNob3dUcmFpbCkge1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHguYXJjKHBvc2l0aW9uLCBwb3NpdGlvbiwgcmFkaXVzLCBiZWdpbkFuZ2xlLCAwLjUpO1xuICAgICAgICAgIGN0eC5saW5lV2lkdGggPSB0cmFpbFdpZHRoO1xuICAgICAgICAgIGN0eC5saW5lQ2FwID0gc3Ryb2tlTGluZWNhcDtcbiAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0cmFpbENvbG9yO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkcmF3Q2lyY2xlKHRlbXBFbmRBbmdsZSkge1xuICAgICAgICAvLyDnu5jliLbov5vluqZcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICBiZWdpbkFuZ2xlLFxuICAgICAgICAgIHRlbXBFbmRBbmdsZSxcbiAgICAgICAgICBhbnRpY2xvY2t3aXNlXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgIGN0eC5saW5lQ2FwID0gc3Ryb2tlTGluZWNhcDtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuXG4gICAgICAoZnVuY3Rpb24gc3RhcnREcmF3KGN0eCkge1xuICAgICAgICB0ZW1wRW5kQW5nbGUgKz0gc3RlcDtcbiAgICAgICAgaWYgKCFhbnRpY2xvY2t3aXNlICYmIHRlbXBFbmRBbmdsZSA8PSBiZWdpbkFuZ2xlKSB7XG4gICAgICAgICAgdGVtcEVuZEFuZ2xlID0gYmVnaW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFudGljbG9ja3dpc2UgJiYgdGVtcEVuZEFuZ2xlID49IDIgKiBNYXRoLlBJICsgYmVnaW5BbmdsZSkge1xuICAgICAgICAgIHRlbXBFbmRBbmdsZSA9IDIgKiBNYXRoLlBJICsgYmVnaW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPD0gYmVnaW5BbmdsZSAtIDIgKiBNYXRoLlBJKSB7XG4gICAgICAgICAgdGVtcEVuZEFuZ2xlID0gYmVnaW5BbmdsZSAtIDIgKiBNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbnRpY2xvY2t3aXNlICYmIHRlbXBFbmRBbmdsZSA+PSBiZWdpbkFuZ2xlKSB7XG4gICAgICAgICAgdGVtcEVuZEFuZ2xlID0gYmVnaW5BbmdsZTtcbiAgICAgICAgfVxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDB4N2ZmZmZmZmYsIDB4N2ZmZmZmZmYpO1xuICAgICAgICBkcmF3QmFja2dyb3VuZCgpO1xuICAgICAgICBkcmF3Q2lyY2xlKHRlbXBFbmRBbmdsZSk7XG4gICAgICAgIF90aGlzLnN0YXJ0QW5nbGUgPSBhbnRpY2xvY2t3aXNlXG4gICAgICAgICAgPyAyICogTWF0aC5QSSAtIHRlbXBFbmRBbmdsZVxuICAgICAgICAgIDogdGVtcEVuZEFuZ2xlO1xuICAgICAgICBpZiAoY291bnQgPj0gMTAwKSB7IHJldHVybiB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIF90aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc3RhcnREcmF3KGN0eCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH0pKGN0eCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOa4hemZpOWumuaXtuWZqFxuICAgICAqL1xuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIC5zbG90IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuICAuY2FudmFzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhcGV4LWRpYWxvZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXNrIHt7c2hvd01vZGFsPydtYXNrLWV4aXN0JzonbWFzay1ub25lJ319XCIgaWY9XCJ7e3Zpc2libGV9fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiIHN0eWxlPVwie3tzZXREaWFsb2d9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZSB7e2RlZmF1bHRPcHRpb25zLmNsb3NhYmxlPyd0aXRsZS1jbG9zZSc6J3RpdGxlLW5vbmUnfX1cIj57eyBkZWZhdWx0UHJvbXB0LnRpdGxlIHx8IGRlZmF1bHRPcHRpb25zLnRpdGxlIHx8IHRpdGxlIH19PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHRhYnMgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIiBjbGFzcz1cInRhYnNcIiBvbmNoYW5nZT1cImNoYW5nZVRhYmFjdGl2ZVwiPlxuICAgICAgICAgICAgPHRhYi1iYXIgY2xhc3M9XCJ0YWItYmFyXCI+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7lpbM8L3RleHQ+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7nlLc8L3RleHQ+XG4gICAgICAgICAgICA8L3RhYi1iYXI+XG4gICAgICAgICAgPC90YWJzPlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWNvbnRlbnQ6IGNlbnRlclwiIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdCcgfX1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImZvY3VzXCIgdHlwZT1cInt7IGRlZmF1bHRQcm9tcHQuZmllbGR0eXBlIH19XCIgc3R5bGU9XCJ7e2RlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZX19XCIgdmFsdWU9XCJ7eyB2YWx1ZSB9fVwiIHBsYWNlaG9sZGVyPVwie3sgZGVmYXVsdFByb21wdC5wbGFjZWhvbGRlciB9fVwiIG9uY2hhbmdlPVwiYmluZENoYW5nZVwiIG1heGxlbmd0aD1cInt7IGRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoID09PSAtMT8nJzpkZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCB9fVwiIG9uZW50ZXJrZXljbGljaz1cImJpbmRFbnRlclwiIC8+XG4gICAgICAgICAgICA8dGV4dCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5OyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDg4cHhcIj7mraU8L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24tY29udGVudDogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAyMHB4XCIgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImlka2dcIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IGtnIH19XCIgcGxhY2Vob2xkZXI9XCLovpPlhaXkvZPph41cIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VrZ1wiIG1heGxlbmd0aD1cIjNcIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJrZ1wiIC8+XG4gICAgICAgICAgICA8dGV4dCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5OyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDg4cHhcIj5rZzwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24tY29udGVudDogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAyMHB4XCIgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImlkY21cIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IGNtIH19XCIgcGxhY2Vob2xkZXI9XCLovpPlhaXouqvpq5hcIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VjbVwiIG1heGxlbmd0aD1cIjNcIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJjbVwiIC8+XG4gICAgICAgICAgICA8dGV4dCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5OyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDg4cHhcIj5jbTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24tY29udGVudDogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAxMHB4XCIgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImlkYWdlXCIgdHlwZT1cInt7IGRlZmF1bHRQcm9tcHQuZmllbGR0eXBlIH19XCIgc3R5bGU9XCJ7e2RlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZX19XCIgdmFsdWU9XCJ7eyBhZ2UgfX1cIiBwbGFjZWhvbGRlcj1cIui+k+WFpeW5tOm+hFwiIG9uY2hhbmdlPVwiYmluZENoYW5nZWFnZVwiIG1heGxlbmd0aD1cIjNcIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJhZ2VcIiAvPlxuICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTsgZm9udC1zaXplOiAyOHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB3aWR0aDogODhweDsgaGVpZ2h0OiA4OHB4XCI+5bKBPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0biB7e2RpYWxvZ1R5cGUgPT09ICdhbHRlcid8fHRoaXMudmVydGljYWw9PT10cnVlPydidG4tdmVydGljYWwnOididG4taG9yaXpvbnRhbCd9fVwiPlxuICAgICAgICAgIDxibG9jayBpZj1cInt7ZGVmYXVsdE9wdGlvbnMuYnV0dG9ucy5sZW5ndGg9PT0wfX1cIj5cbiAgICAgICAgICAgIDxkaXYgaWY9XCJ7e2RpYWxvZ1R5cGUhPT0nYWx0ZXInfX1cIiBjbGFzcz1cImJ0bmJveDFcIiBvbmNsaWNrPVwiYmluZENhbmNlbFwiPlxuICAgICAgICAgICAgICA8dGV4dD57eyBkZWZhdWx0T3B0aW9ucy5jYW5jZWwgfX08L3RleHQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgb25jbGljaz1cImJpbmRBZmZpcm1cIiBjbGFzcz1cImJ0bmJveFwiPlxuICAgICAgICAgICAgICA8dGV4dD57eyBkZWZhdWx0T3B0aW9ucy5hZmZpcm0gfX08L3RleHQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Jsb2NrPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhOiB7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgICAgc2V0RGlhbG9nOiB7fSxcbiAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAga2c6IFwiXCIsXG4gICAgICBjbTogXCJcIixcbiAgICAgIGFnZTogXCJcIixcbiAgICAgIHNleDogMCwvL+aAp+WIqyAgMSDnlLfvvIwwIOWls1xuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgYnV0dG9uczogW10sXG4gICAgICAgIGNhbmNlbDogXCLlj5bmtohcIixcbiAgICAgICAgYWZmaXJtOiBcIuehruWumlwiXG4gICAgICB9LFxuICAgICAgZGVmYXVsdFByb21wdDoge1xuICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIGtnOiBcIlwiLFxuICAgICAgICBjbTogXCJcIixcbiAgICAgICAgYWdlOiBcIlwiLFxuICAgICAgICBmaWVsZHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIuivt+i+k+WFpeaWh+acrFwiLFxuICAgICAgICBmb2N1czogZmFsc2UsXG4gICAgICAgIGlka2c6IGZhbHNlLFxuICAgICAgICBpbnB1dFN0eWxlOiB7fSxcbiAgICAgICAgbWF4bGVuZ3RoOiAtMVxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcHM6IHtcbiAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcIum7mOiupOagh+mimFwiXG4gICAgICB9LFxuICAgICAgY29udGVudDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwi6buY6K6k5YaF5a65XCJcbiAgICAgIH0sXG4gICAgICBkaWFsb2dTdHlsZToge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICB9LFxuICAgICAgZGlhbG9nVHlwZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwidGV4dFwiXG4gICAgICB9LFxuICAgICAgdmlzaWJsZToge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICBkZWZhdWx0OiB7fVxuICAgICAgfSxcbiAgICAgIHByb21wdDoge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICB0aGlzLiR3YXRjaChcInZpc2libGVcIiwgXCJtb2RhbEhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRpYWxvZ1N0eWxlXCIsIFwiZGlhbG9nU3R5bGVIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJkZWZhdWx0UHJvbXB0LnZhbHVlXCIsIFwidmFsdWVIYW5kbGVyXCIpO1xuICAgICAgdGhpcy5yZXNldERhdGEoKTtcbiAgICB9LFxuICAgIG9uUmVhZHkoKSB7XG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiICYmIHRoaXMuJHZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQoXCJmb2N1c1wiKS5mb2N1cyh7IGZvY3VzOiB0aGlzLmRlZmF1bHRQcm9tcHQuZm9jdXMgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0MVwiICYmIHRoaXMuJHZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQoXCJpZGtnXCIpLmZvY3VzKHsgaWRrZzogdGhpcy5kZWZhdWx0UHJvbXB0Lmlka2cgfSk7XG4gICAgICB9XG5cbiAgICB9LFxuICAgIHZhbHVlSGFuZGxlcihuZXdWLCBvbGRWKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSBuZXdWO1xuICAgIH0sXG4gICAgb3B0aW9uc0hhbmRsZXIobmV3Viwgb2xkVikge1xuICAgICAgbmV3Vi5jbG9zYWJsZSA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLmNsb3NhYmxlID0gbmV3Vi5jbG9zYWJsZSkgOiBmYWxzZTtcbiAgICAgIG5ld1YudGl0bGUgPyAodGhpcy5kZWZhdWx0T3B0aW9ucy50aXRsZSA9IG5ld1YudGl0bGUpIDogXCJcIjtcbiAgICAgIG5ld1YuY29udGVudCA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLmNvbnRlbnQgPSBuZXdWLmNvbnRlbnQpIDogXCJcIjtcbiAgICAgIG5ld1YuYnV0dG9ucyA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLmJ1dHRvbnMgPSBuZXdWLmJ1dHRvbnMpIDogW107XG4gICAgICBuZXdWLmNhbmNlbCA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLmNhbmNlbCA9IG5ld1YuY2FuY2VsKSA6IFwiXCI7XG4gICAgICBuZXdWLmFmZmlybSA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLmFmZmlybSA9IG5ld1YuYWZmaXJtKSA6IFwiXCI7XG4gICAgfSxcbiAgICBwcm9tcHRIYW5kbGVyKG5ld1YsIG9sZFYpIHtcbiAgICAgIG5ld1YudGl0bGUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LnRpdGxlID0gbmV3Vi50aXRsZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5jb250ZW50ID8gKHRoaXMuZGVmYXVsdFByb21wdC5jb250ZW50ID0gbmV3Vi5jb250ZW50KSA6IFwiXCI7XG4gICAgICBuZXdWLnZhbHVlID8gKHRoaXMuZGVmYXVsdFByb21wdC52YWx1ZSA9IG5ld1YudmFsdWUpIDogXCJcIjtcbiAgICAgIG5ld1Yua2cgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmtnID0gbmV3Vi5rZykgOiBcIlwiO1xuICAgICAgbmV3Vi5jbSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuY20gPSBuZXdWLmNtKSA6IFwiXCI7XG4gICAgICBuZXdWLmFnZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuYWdlID0gbmV3Vi5hZ2UpIDogXCJcIjtcbiAgICAgIG5ld1YuZmllbGR0eXBlID8gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUgPSBuZXdWLmZpZWxkdHlwZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5wbGFjZWhvbGRlciA/ICh0aGlzLmRlZmF1bHRQcm9tcHQucGxhY2Vob2xkZXIgPSBuZXdWLnBsYWNlaG9sZGVyKSA6IFwiXCI7XG4gICAgICBuZXdWLmZvY3VzID8gKHRoaXMuZGVmYXVsdFByb21wdC5mb2N1cyA9IG5ld1YuZm9jdXMpIDogZmFsc2U7XG4gICAgICBuZXdWLmlucHV0U3R5bGUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmlucHV0U3R5bGUgPSBuZXdWLmlucHV0U3R5bGUpIDoge307XG4gICAgfSxcbiAgICBkaWFsb2dTdHlsZUhhbmRsZXIobmV3Viwgb2xkVikge1xuICAgICAgY29uc29sZS5sb2cobmV3Viwgb2xkVik7XG4gICAgICB0aGlzLnNldERpYWxvZyA9IG5ld1Y7XG4gICAgfSxcbiAgICByZXNldERhdGEoKSB7XG4gICAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgIGNsb3NhYmxlOiBmYWxzZSxcbiAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICAgIGJ1dHRvbnM6IFtdLFxuICAgICAgICAgIGNhbmNlbDogXCLlj5bmtohcIixcbiAgICAgICAgICBhZmZpcm06IFwi56Gu5a6aXCJcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJvbXB0ID0ge1xuICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgICAgZmllbGR0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuivt+i+k+WFpeaWh+acrFwiLFxuICAgICAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgICAgICBpbnB1dFN0eWxlOiB7fVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldERpYWxvZyA9IHtcblxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpcy4kd2F0Y2goXCJvcHRpb25zXCIsIFwib3B0aW9uc0hhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcInByb21wdFwiLCBcInByb21wdEhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRpYWxvZ1N0eWxlXCIsIFwiZGlhbG9nU3R5bGVIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJkZWZhdWx0UHJvbXB0LnZhbHVlXCIsIFwidmFsdWVIYW5kbGVyXCIpO1xuICAgIH0sXG4gICAgbW9kYWxIYW5kbGVyKG5ld1YsIG9sZFYpIHtcbiAgICAgIHRoaXMuc2hvd01vZGFsID0gbmV3VjtcbiAgICB9LFxuICAgIGJpbmRDYW5jZWwoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2FuY2VsXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgdGhpcy5rZyA9IFwiXCI7XG4gICAgICB0aGlzLmNtID0gXCJcIjtcbiAgICAgIHRoaXMuYWdlID0gXCJcIjtcblxuICAgIH0sXG4gICAgYmluZENoYW5nZShldnQpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuatpeaVsD0ke3RoaXMudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2VrZyhldnQpIHtcblxuICAgICAgdGhpcy5rZyA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuS9k+mHjT0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG4gICAgYmluZENoYW5nZWNtKGV2dCkge1xuXG4gICAgICB0aGlzLmNtID0gZXZ0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+6Lqr6auYPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlYWdlKGV2dCkge1xuXG4gICAgICB0aGlzLmFnZSA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuW5tOm+hD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG5cblxuICAgIGJpbmRBZmZpcm0oZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgICAgZXZ0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy4kZW1pdChcImFmZmlybVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuXG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0MVwiKSB7XG4gICAgICAgIGV2dC5rZyA9IHRoaXMua2c7XG4gICAgICAgIGV2dC5jbSA9IHRoaXMuY207XG4gICAgICAgIGV2dC5hZ2UgPSB0aGlzLmFnZTtcbiAgICAgICAgZXZ0LnNleCA9IHRoaXMuc2V4O1xuICAgICAgICB0aGlzLiRlbWl0KFwiYWZmaXJtXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYGJpbmRBZmZpcm3vvJoke2V2dC5rZ30s6Lqr6auY77yaJHtldnQuY219LOW5tOm+hO+8miR7ZXZ0LmFnZX0sc2V4OiR7ZXZ0LnNleH1gKTtcbiAgICAgICAgdGhpcy5rZyA9IFwiXCI7XG4gICAgICAgIHRoaXMuY20gPSBcIlwiO1xuICAgICAgICB0aGlzLmFnZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2V4ID0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRFbnRlcihldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuatpeaVsD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJlbnRlclwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQoXCJmb2N1c1wiKS5mb2N1cyh7IGZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kRW50ZXJrZyhldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuS9k+mHjT0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMua2cgPSBldnQudmFsdWU7XG5cbiAgICB9LFxuICAgIGJpbmRFbnRlcmNtKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+6Lqr6auYPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jbSA9IGV2dC52YWx1ZTtcbiAgICB9LFxuICAgIGJpbmRFbnRlcmFnZShldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuW5tOm+hD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuYWdlID0gZXZ0LnZhbHVlO1xuICAgIH0sXG5cblxuICAgIC8v5YiH5o2i55S35aWzXG4gICAgY2hhbmdlVGFiYWN0aXZlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc29sZS5sb2coZS5pbmRleClcbiAgICAgIHRoaXMuc2V4ID0gZS5pbmRleDtcbiAgICB9LFxuICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuICAubWFzayB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGZsZXg6IDE7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAmLWV4aXN0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNSwgNSwgNSwgMC42KTtcbiAgICB9XG4gICAgJi1ub25lIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIH1cbiAgICAuZGlhbG9nIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgYm9yZGVyLXJhZGl1czogMzJweDtcbiAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICB3aWR0aDogODQlO1xuICAgICAgJi1ib3JkZXIge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTdlN2U3O1xuICAgICAgfVxuICAgICAgLmJveCB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIC50b3Age1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICYtY2xvc2Uge1xuICAgICAgICAgICAgICB3aWR0aDogOTUlO1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMjVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYtbm9uZSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAuY2xvc2Uge1xuICAgICAgICAgICAgd2lkdGg6IDUlO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XG4gICAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgY29sb3I6ICNhMGEwYTA7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0IHtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTtcbiAgICAgICAgICB3aWR0aDogODUlO1xuICAgICAgICAgIGhlaWdodDogODhweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogNjBweDtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTZweDtcbiAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxNnB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYnMge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC50YWItYmFyIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNiYmJiYmI7XG4gICAgICAgICAgY29sb3I6ICNiYmJiYmI7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1NHB4O1xuICAgICAgICB9XG4gICAgICAgIC50YWItdGV4dCB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMGIyZmY7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgfVxuICAgICAgICAudGFiLXRleHQ6YWN0aXZlIHtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAuYnRuIHtcbiAgICAgICAgbWFyZ2luLXRvcDogNTBweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAuYnRuYm94IHtcbiAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgIHdpZHRoOiAyNzBweDtcbiAgICAgICAgICAgIGhlaWdodDogODhweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5idG5ib3gxIHtcbiAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7XG4gICAgICAgICAgICB3aWR0aDogMjcwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5idG5ib3g6YWN0aXZlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdlN2U3O1xuICAgICAgICB9XG4gICAgICAgICYtdmVydGljYWwge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgLmJ0bmJveCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJi1ob3Jpem9udGFsIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIC5idG5ib3gge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIndhcnBcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJ6LWluZGV4OiB7e3pJbmRleH19O1wiIGNsYXNzPVwibWFza1wiIGlmPVwie3tzaG93UG9wJiYhYmFja0ltZ319XCI+PC9kaXY+XHJcbiAgICA8aW1hZ2Ugc3JjPVwie3tiYWNrSW1nfX1cIiBpZj1cInt7c2hvd1BvcCYmYmFja0ltZ319XCIgY2xhc3M9XCJpbWdCYWNrXCI+PC9pbWFnZT5cclxuICAgIDwhLS0g5bGP5bmV5a695bqm5bCP5LqOMTIwMCAtLT5cclxuICAgIDxkaXYgaWY9XCJ7e3Nob3dQb3AmJiFyZXNlcnZlRGlhbG9nU3R5bGV9fVwiIHN0eWxlPVwiIHBvc2l0aW9uOmZpeGVkOyBib3R0b206e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgbGVmdDp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyByaWdodDp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBib3JkZXItcmFkaXVzOnt7KDI0L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7XCIgY2xhc3M9XCJwb3B1cFwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiIGhlaWdodDp7eyg1Ni9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBwYWRkaW5nLWxlZnQ6IHt7KDI0L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHBhZGRpbmctcmlnaHQ6IHt7KDI0L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7XCI+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCIgZm9udC1zaXplOiB7eygyMC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4O1wiIGNsYXNzPVwidGl0bGVcIj57eyB0aXRsZS50cmltKCkgfHwgXCLnlKjmiLfljY/orq7pmpDnp4HmlL/nrZbmj5DnpLpcIiB9fTwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IHt7KDI0L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHBhZGRpbmctcmlnaHQ6IHt7KDI0L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7XCIgY2xhc3M9XCJib2R5XCI+XHJcbiAgICAgICAgPHNsb3Q+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjVweDsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KVwiIGlkPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICDmnKzmnI3liqHpnIDopoFcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXdlaWdodDogNzAwXCI+6IGU572RPC9zcGFuPlxyXG4gICAgICAgICAgICDvvIzosIPnlKhcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXdlaWdodDogNzAwXCI+55S16K+dPC9zcGFuPlxyXG4gICAgICAgICAgICDjgIFcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXdlaWdodDogNzAwXCI+5L2N572uPC9zcGFuPlxyXG4gICAgICAgICAgICDmnYPpmZDjgIHojrflj5borr7lpIfjgIHnvZHnu5zjgIHpuqblhYvpo47jgIHov5DliqjjgIHlgaXlurfkv6Hmga/jgILngrnlh7vigJzlkIzmhI/igJ3vvIzljbPooajnpLrmgqjlkIzmhI/kuIrov7DlhoXlrrnlj4pcclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiIHN0eWxlPVwiY29sb3I6ICMwMDdkZmY7IGZvbnQtd2VpZ2h0OiA3MDBcIj5YWOeUqOaIt+WNj+iurjwvYT5cclxuICAgICAgICAgICAg44CBXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIiBzdHlsZT1cImNvbG9yOiAjMDA3ZGZmOyBmb250LXdlaWdodDogNzAwXCI+5YWz5LqOWFjpmpDnp4Hor7TmmI48L2E+XHJcbiAgICAgICAgICAgIOOAglxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDwvc2xvdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgaWY9XCJ7e3Nob3dGb290ZXJ9fVwic3R5bGU9XCJoZWlnaHQ6e3soNTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcGFkZGluZy1sZWZ0OiB7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBwYWRkaW5nLXJpZ2h0OiB7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBtYXJnaW4tdG9wOnt7KDgvZGV2aWNlRHApKmRldmljZVdpZHRofX1weFwiIGNsYXNzPVwiZm9vdGVyXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT1cImhlaWdodDp7eyg0MC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBmb250LXNpemU6e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgbWFyZ2luLXJpZ2h0Ont7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHdpZHRoOnt7KDk4NC0oMTYvZGV2aWNlRHApKmRldmljZVdpZHRoKjMpLzJ9fXB4IFwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuaLkue7nVwiIGNsYXNzPVwiY2FuY2VsXCIgb25jbGljaz1cImNhbmNlbFwiIGRpc2FibGVkPVwie3tidG5kaXNhYmxlZH19XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPVwiaGVpZ2h0Ont7KDQwL2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IGZvbnQtc2l6ZTp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyB3aWR0aDp7eyg5ODQtKDE2L2RldmljZURwKSpkZXZpY2VXaWR0aCozKS8yfX1weCBcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlkIzmhI9cIiBjbGFzcz1cInN1cmVcIiBvbmNsaWNrPVwic3VyZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIOWxj+W5leWuveW6puWkp+S6jjEyMDAgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXBfd2lkdGhcIiBpZj1cInt7c2hvd1BvcCYmcmVzZXJ2ZURpYWxvZ1N0eWxlfX1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVcIj57eyB0aXRsZS50cmltKCkgfHwgXCLnlKjmiLfljY/orq7pmpDnp4HmlL/nrZbmj5DnpLpcIiB9fTwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XHJcbiAgICAgICAgPHNsb3Q+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjVweDsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KVwiPlxyXG4gICAgICAgICAgICDnlLPor7dcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXdlaWdodDogNzAwXCI+5YGl6Lqr6L+Q5YqoPC9zcGFuPlxyXG4gICAgICAgICAgICDnlKjkuo7ojrflj5bmraXmlbDkuI7orrDlvZXmraXmlbAs6K+35oKo5Zyo5L2/55So77yI5oiW57un57ut5L2/55So77yJ5oiR5Lus55qE5Lqn5ZOB5pyN5Yqh5YmN5LuU57uG6ZiF6K+7XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIiBzdHlsZT1cImNvbG9yOiAjMDA3ZGZmOyBmb250LXdlaWdodDogNzAwXCI+44CK55So5oi35Y2P6K6u44CLPC9hPlxyXG4gICAgICAgICAgICDlkoxcclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiIHN0eWxlPVwiY29sb3I6ICMwMDdkZmY7IGZvbnQtd2VpZ2h0OiA3MDBcIj7jgIrpmpDnp4HmlL/nrZbjgIs8L2E+XHJcbiAgICAgICAgICAgIOOAguaIkeS7rOWwhuWFqOWKm+S/nemanOaCqOeahOWQiOazleadg+ebiuS4juS/oeaBr+WuieWFqO+8jOW5tuWwhuaMgee7reS4uuaCqOaPkOS+m+S8mOi0qOacjeWKoeOAglxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgIDwvc2xvdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIiBpZj1cInt7c2hvd0Zvb3Rlcn19XCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5bmtohcIiBjbGFzcz1cImNhbmNlbFwiIG9uY2xpY2s9XCJjYW5jZWxcIiBkaXNhYmxlZD1cInt7YnRuZGlzYWJsZWR9fVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlkIzmhI9cIiBjbGFzcz1cInN1cmVcIiBvbmNsaWNrPVwic3VyZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxyXG4gIC53YXJwIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICAuaW1nQmFjayB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICByaWdodDogMDtcclxuICAgICAgYm90dG9tOiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgICBvYmplY3QtZml0OiBmaWxsO1xyXG4gICAgfVxyXG4gICAgLm1hc2sge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgIGJvdHRvbTogMDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xyXG4gICAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMG1zO1xyXG4gICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbiAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gICAgfVxyXG4gICAgLnBvcHVwIHtcclxuICAgICAgd2lkdGg6IDk4NHB4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwbXM7XHJcbiAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcclxuICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgIFxyXG4gICAgICBtYXJnaW4tYm90dG9tOiA4MHB4O1xyXG4gICAgICAudGl0bGUge1xyXG4gICAgICAgIGxpbmVzOiAxO1xyXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgICAgfVxyXG4gICAgICAuYm9keSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIH1cclxuICAgICAgLmZvb3RlciB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgLmNhbmNlbCB7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgY29sb3I6ICMwMDdkZmY7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jYW5jZWw6ZGlzYWJsZWQge1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuc3VyZSB7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2RmZjtcclxuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAucG9wdXBfd2lkdGgge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA2NnB4O1xyXG4gICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgIHdpZHRoOiA2NTZweDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMG1zO1xyXG4gICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbiAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gICAgICAuaGVhZGVyIHtcclxuICAgICAgICBoZWlnaHQ6IDEzMnB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCA1NHB4O1xyXG4gICAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgICBsaW5lczogMTtcclxuICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgICAgZm9udC1zaXplOiA0NXB4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC5ib2R5IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBwYWRkaW5nOiAwcHggNTRweDtcclxuICAgICAgfVxyXG4gICAgICAuZm9vdGVyIHtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBoZWlnaHQ6IDEyNnB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAzNnB4O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE4cHg7XHJcbiAgICAgICAgLmNhbmNlbCB7XHJcbiAgICAgICAgICB3aWR0aDogMjc0cHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICAgICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgY29sb3I6ICMwMDdkZmY7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNjZweDtcclxuICAgICAgICAgIG1hcmdpbi1yaWdodDogMzZweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmNhbmNlbDpkaXNhYmxlZCB7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5zdXJlIHtcclxuICAgICAgICAgIHdpZHRoOiAyNzRweDtcclxuICAgICAgICAgIGhlaWdodDogOTBweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMzZweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3ZGZmO1xyXG4gICAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA2NnB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgZGV2aWNlIGZyb20gXCJAc3lzdGVtLmRldmljZVwiO1xyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgLy8g6K6+5aSHZHDlgLxcclxuICAgICAgZGV2aWNlRHA6IDAsXHJcbiAgICAgIC8vIOiuvuWkh1xyXG4gICAgICBkZXZpY2VXaWR0aDogMCxcclxuICAgICAgcmVzZXJ2ZURpYWxvZ1N0eWxlOiBmYWxzZSxcclxuICAgICAgYnRuZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBzY3JlZW5XaWR0aDogMCxcclxuICAgIH0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICBiYWNrSW1nOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHpJbmRleDoge1xyXG4gICAgICAgIGRlZmF1bHQ6IDEwMDAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6IFwi6ZqQ56eB5p2D6ZmQ55Sz6K+35LiO5L+d5oqk5oyH5byVXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dQb3A6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBzaG93Rm9vdGVyOiB7IC8v5piv5ZCm5pi+56S65bqV6YOo5Lik5Liq5oyJ6ZKuXHJcbiAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy4kd2F0Y2goJ3Nob3dQb3AnLCAnY2hhbmdlQ2FuY2VsJylcclxuICAgICAgaWYgKGRldmljZS5nZXRJbmZvU3luYykge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGRldmljZS5nZXRJbmZvU3luYygpO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlRHAgPSByZXMud2luZG93V2lkdGggLyByZXMuc2NyZWVuRGVuc2l0eTtcclxuICAgICAgICB0aGlzLmRldmljZVdpZHRoID0gcmVzLndpbmRvd0xvZ2ljV2lkdGg7XHJcbiAgICAgICAgdGhpcy5idG5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCA9IHJlcy5zY3JlZW5XaWR0aFxyXG4gICAgICAgIGlmIChyZXMuc2NyZWVuV2lkdGggPiAxMjAwICYmIHJlcy5zY3JlZW5IZWlnaHQgPiAxMjAwKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHdhdGNoKCdzY3JlZW5XaWR0aCcsICdjaGFuZ2VTY3JlZW4nKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQ2FuY2VsKCkge1xyXG4gICAgICBpZiAodGhpcy5zaG93UG9wKSB7XHJcbiAgICAgICAgdGhpcy5idG5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlU2NyZWVuKCkge1xyXG4gICAgICBpZiAodGhpcy5zY3JlZW5XaWR0aCA+IDEyMDApIHtcclxuICAgICAgICB0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgICAgdGhpcy5idG5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGF3YWl0ICRwcm9jZXNzRGF0YS5zZXRTdG9yYWdlKFwiX1BSSVZBQ1wiLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJjYW5jZWxcIik7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc3VyZSgpIHtcclxuICAgICAgYXdhaXQgJHByb2Nlc3NEYXRhLnNldFN0b3JhZ2UoXCJfUFJJVkFDXCIsIHRydWUpO1xyXG4gICAgICB0aGlzLiRlbWl0KFwiYWdyZWVcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuPC9zY3JpcHQ+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5oZWFkZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjkwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjkwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI5MHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjkwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjMwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LXN0YXJ0XCIsXG4gICAgXCJ0b3BcIjogXCI3MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjcwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi50b3Bfdmlld1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjgyOHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9ncm91cDIucG5nXCIsXG4gICAgXCJiYWNrZ3JvdW5kU2l6ZVwiOiBcImNvdmVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kUG9zaXRpb25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5ib3R0b21fdmlld1wiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyN3B4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjc1MHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItMTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmljb24taW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI0NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIuY2lyY2xlXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI1cHhcIlxuICB9LFxuICBcIi50ZXh0LWNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIudGl0bGVfc3RwZXNcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIudGl0bGVfc3RwZXNfdlwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjgwcHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi5kZXRhaWxzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjE3NXB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGV0YWlsLWl0ZW1cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5kZXRhaWwtdmFsdWVcIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIubGFyZ2VyLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0OHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubGFyZ2VyMi10ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCI0OHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gIH0sXG4gIFwiLmxhcmdlcjMtdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiM0YjRiNGJcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiXG4gIH0sXG4gIFwiLnNtYWxsZXItdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubi10ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIlxuICB9LFxuICBcIi50YWJzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTIwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI1NXB4XCJcbiAgfSxcbiAgXCIudGFiLWJhclwiOiB7XG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNTRweFwiXG4gIH0sXG4gIFwiLnRhYi10ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI2NXB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI3NHB4XCIsXG4gICAgXCJjb2xvcjphY3RpdmVcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJiYWNrZ3JvdW5kOmFjdGl2ZVwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjI3MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiIzhmZmYzNCAwJVxcXCIsXFxcIiNlYmZkNjZcXFwiXX1dfVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmxpc3RcIjoge1xuICAgIFwibGF5b3V0VHlwZVwiOiBcInN0YWdnZXJcIlxuICB9LFxuICBcIi5pdGVtXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5mcmFtZV9cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmZyYW1lX2ltYVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjcwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjhweFwiXG4gIH0sXG4gIFwiLmZyYW1lX3RleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcIndpZHRoXCI6IFwiMTA1cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIudG9wX3ZpZXdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI2MDBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYmdfbWUucG5nXCIsXG4gICAgXCJiYWNrZ3JvdW5kU2l6ZVwiOiBcImNvdmVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kUG9zaXRpb25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5ib3R0b21fdmlld1wiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIi05MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIlxuICB9LFxuICBcIi50YWJfYmFyXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcIndpZHRoXCI6IFwiNzUwcHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9LFxuICBcIi50YWJfaXRlbVwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTRweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjExcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTcxcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwNC4ycHhcIlxuICB9LFxuICBcIi50YWJfaXRlbSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcInJlc2l6ZU1vZGVcIjogXCJjb250YWluXCIsXG4gICAgXCJvcGFjaXR5XCI6IDAuNSxcbiAgICBcIndpZHRoOmFjdGl2ZVwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodDphY3RpdmVcIjogXCI1MHB4XCIsXG4gICAgXCJyZXNpemVNb2RlOmFjdGl2ZVwiOiBcImNvbnRhaW5cIlxuICB9LFxuICBcIi50YWJfaXRlbSB0ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjFweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMTBweFwiXG4gIH0sXG4gIFwiLml0ZW0tY29udGFpbmVyXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubWFpbi10ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMTAwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzVmOWVhMFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLnNsb3RcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmNhbnZhc1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5tYXNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5tYXNrLWV4aXN0XCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoNSw1LDUsMC42KVwiXG4gIH0sXG4gIFwiLm1hc2stbm9uZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDApXCIsXG4gICAgXCJ2aXNpYmlsaXR5XCI6IFwiaGlkZGVuXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjMycHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyNHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyNHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjRweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyNHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjg0JVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZy1ib3JkZXJcIjoge1xuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U3ZTdlN1wiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlXCI6IHtcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjUwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAudGl0bGUtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI5NSVcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyNXB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAudGl0bGUtbm9uZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC5jbG9zZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItMjBweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLmNsb3NlIHRleHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZvbnRTaXplXCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC5jb250ZW50XCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIzMHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2EwYTBhMFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggaW5wdXRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjg1JVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIxNnB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRhYnNcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRhYi1iYXJcIjoge1xuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJjb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU0cHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudGFiLXRleHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiM2NjY2NjZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwid2lkdGhcIjogXCIyNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiY29sb3I6YWN0aXZlXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwMGIyZmZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0blwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1MHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94IHRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCIyNzBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3gxIHRleHRcIjoge1xuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwid2lkdGhcIjogXCIyNzBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImNvbG9yXCI6IFwiIzY2NjY2NlwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3hcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiNlN2U3ZTdcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0bi12ZXJ0aWNhbFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4tdmVydGljYWwgLmJ0bmJveFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0bi1ob3Jpem9udGFsXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0bi1ob3Jpem9udGFsIC5idG5ib3hcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MCVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi53YXJwXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIlxuICB9LFxuICBcIi53YXJwIC5pbWdCYWNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjY2NjY2NjXCIsXG4gICAgXCJvYmplY3RGaXRcIjogXCJmaWxsXCJcbiAgfSxcbiAgXCIud2FycCAubWFza1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC40KVwiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJsaW5lYXJcIixcbiAgICBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IFwiZm9yd2FyZHNcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjk4NHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMjAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwibGluZWFyXCIsXG4gICAgXCJhbmltYXRpb25GaWxsTW9kZVwiOiBcImZvcndhcmRzXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI4MHB4XCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXAgLnRpdGxlXCI6IHtcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cCAuYm9keVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cCAuZm9vdGVyXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXAgLmZvb3RlciAuY2FuY2VsXCI6IHtcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTAwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjpkaXNhYmxlZFwiOiBcInJnYmEoMCwwLDAsMC4xKVwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwIC5mb290ZXIgLnN1cmVcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMDBweFwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoXCI6IHtcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjY2cHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcImF1dG9cIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiYXV0b1wiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiYXV0b1wiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcImF1dG9cIixcbiAgICBcIndpZHRoXCI6IFwiNjU2cHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJsaW5lYXJcIixcbiAgICBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IFwiZm9yd2FyZHNcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuaGVhZGVyXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjEzMnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1NHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjU0cHhcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuaGVhZGVyIC50aXRsZVwiOiB7XG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIixcbiAgICBcImZvbnRTaXplXCI6IFwiNDVweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuYm9keVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjU0cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNTRweFwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5mb290ZXJcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjEyNnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjM2cHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjE4cHhcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuZm9vdGVyIC5jYW5jZWxcIjoge1xuICAgIFwid2lkdGhcIjogXCIyNzRweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzNnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjY2cHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmRpc2FibGVkXCI6IFwicmdiYSgwLDAsMCwwLjEpXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmZvb3RlciAuc3VyZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjI3NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5MHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM2cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjZweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VUYWJhY3RpdmVcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWNvbnRlbnRcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kYXRhcy5saXN0KX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIml0ZW0tY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhZ2Vob21lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZT09J+mmlumhtSc/dHJ1ZTpmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwYWdlcmVjb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZT09J+atpeaVsCc/dHJ1ZTpmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwYWdldXNlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGU9PSfmiJHnmoQnP3RydWU6ZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWJhclwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRhYl9iYXJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kYXRhcy5saXN0KX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYl9pdGVtXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc2hvdz90aGlzLiRpdGVtLnBpY19jaG9pY2U6dGhpcy4kaXRlbS5waWMpfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnY29sb3I6ICcrKCh0aGlzLiRpdGVtLmNvbG9yKSl9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlKX0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImNhbnZhc1wiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlkKX1cbiAgICAgIH0sXG4gICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaWQpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjYW52YXNcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwic2xvdFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzbG90XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImFwZXgtZGlhbG9nXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsnbWFzaycsICh0aGlzLnNob3dNb2RhbD8nbWFzay1leGlzdCc6J21hc2stbm9uZScpXX0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmlzaWJsZSl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJkaWFsb2dcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNldERpYWxvZyl9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJib3hcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC50aXRsZXx8dGhpcy5kZWZhdWx0T3B0aW9ucy50aXRsZXx8dGhpcy50aXRsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsndGl0bGUnLCAodGhpcy5kZWZhdWx0T3B0aW9ucy5jbG9zYWJsZT8ndGl0bGUtY2xvc2UnOid0aXRsZS1ub25lJyldfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWJzXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYnNcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VUYWJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWJhclwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRhYi1iYXJcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5aWzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueUt1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdCcpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImZvY3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnZhbHVlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5wbGFjZWhvbGRlcil9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aD09PS0xPycnOnRoaXMuZGVmYXVsdFByb21wdC5tYXhsZW5ndGgpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImZvY3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiYmluZENoYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlcmtleWNsaWNrXCI6IFwiYmluZEVudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmraVcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiODhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI4OHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0MScpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlka2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMua2cpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLovpPlhaXkvZPph41cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4bGVuZ3RoXCI6IFwiM1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRrZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmlucHV0U3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImJpbmRDaGFuZ2VrZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlcmtleWNsaWNrXCI6IFwiYmluZEVudGVya2dcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcImtnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjg4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdDEnKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNtKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6L6T5YWl6Lqr6auYXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBcIjNcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlkY21cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlY21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlcmNtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJjbVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWdlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6L6T5YWl5bm06b6EXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBcIjNcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlkYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiYmluZENoYW5nZWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlcmtleWNsaWNrXCI6IFwiYmluZEVudGVyYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlsoFcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiODhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI4OHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWydidG4nLCAodGhpcy5kaWFsb2dUeXBlPT09J2FsdGVyJ3x8dGhpcy52ZXJ0aWNhbD09PXRydWU/J2J0bi12ZXJ0aWNhbCc6J2J0bi1ob3Jpem9udGFsJyldfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0T3B0aW9ucy5idXR0b25zLmxlbmd0aD09PTApfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlIT09J2FsdGVyJyl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnRuYm94MVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYmluZENhbmNlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0T3B0aW9ucy5jYW5jZWwpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJiaW5kQWZmaXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnRuYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRPcHRpb25zLmFmZmlybSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRvcF92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0YWJzXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiY2hhbmdlVGFiYWN0aXZlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGFiLWJhclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLku4rml6VcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5ZGoXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaciFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJteS1jaXJjbGVcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzaXplXCI6IFwiMzUwXCIsXG4gICAgICAgICAgICBcInBlcmNlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5wcm9ncmVzcyl9LFxuICAgICAgICAgICAgXCJzdHJva2VDb2xvclwiOiBcIiMwMEIyRkZcIixcbiAgICAgICAgICAgIFwic0FuZ2xlXCI6IFwiMTUwXCIsXG4gICAgICAgICAgICBcInNob3dUcmFpbFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0cnVlKX0sXG4gICAgICAgICAgICBcInRyYWlsQ29sb3JcIjogXCIjZmZmXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2lyY2xlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ljb25fcGFvYnUucG5nXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaWNvbi1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2VnbWVudHNUZXh0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVfc3RwZXNcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0ZXBzX3ZpZXcpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZV9zdHBlc192XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJkZXRhaWxzXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkZXRhaWwtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5taWxlYWdlKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiS01cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbGVyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIumHjOeoi1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIm4tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkZXRhaWwtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jYWxvcmllcyl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcImtjYWxcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbGVyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIua2iOiAl+eDremHj1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIm4tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkZXRhaWwtaXRlbVwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwib3BlblNldFN0ZXBzRGlhbG9nXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcInVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5nb2FsX2RheSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwidVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5q2lPlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5LuK5pel55uu5qCHXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImJvdHRvbV92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjI1MnB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMjM4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNThweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiQk1JL+S9k+iEgueOh+iuoeeul1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzFweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIzcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLloavlhpnorqHnrpc+XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5CYXNpY0luZm9ybWF0aW9uRGlhbG9nXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjE0MHB4XCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL21pbmdyb3VwMi5wbmdcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMTVweFwiLFxuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiLTMwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX2JtaS5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiOTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjkwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTZweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJCTUlcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIzLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJtaSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlcjItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX3R6bC5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiOTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjkwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTZweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLkvZPohILnjodcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIzLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnR6bCl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlcjItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9zdGFuZGFyZC5wbmdcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjM2OHB4XCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjE0cHhcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibXktZGlhbG9nXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZpc2libGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vcGVuMSl9LFxuICAgICAgICBcImRpYWxvZ1R5cGVcIjogXCJwcm9tcHRcIixcbiAgICAgICAgXCJwcm9tcHRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vYmopfVxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJhZmZpcm1cIjogXCJlbnRlclN0ZXBzXCIsXG4gICAgICAgIFwiY2FuY2VsXCI6IFwiY2xvc2VcIixcbiAgICAgICAgXCJlbnRlclwiOiBcImVudGVyU3RlcHNcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibXktZGlhbG9nXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZpc2libGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vcGVuMil9LFxuICAgICAgICBcImRpYWxvZ1R5cGVcIjogXCJwcm9tcHQxXCIsXG4gICAgICAgIFwicHJvbXB0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMub2JqKX1cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiYWZmaXJtXCI6IFwiZW50ZXJEZXRhaWxzXCIsXG4gICAgICAgIFwiY2FuY2VsXCI6IFwiY2xvc2VcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pc1Nob3cpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJoZWFkZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi55Sz6K+3IOWBpei6q+i/kOWKqCDmnYPpmZA6XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi55So5LqO6K6w5b2V6L+Q5Yqo5q2l5pWw77yM6K6h566X6L+Q5Yqo6YeP44CCXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNTAwXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwic3R5bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjdweFwiXG4gIH0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiNTkycHhcIixcbiAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMjVweFwiLFxuICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjVweFwiLFxuICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjVweFwiLFxuICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIxNTBweFwiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI3MHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTUycHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMzBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiOTBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNlOWZkNjVcXFwiLFxcXCIjOTVmZjM3IDEwMCVcXFwiXX1dfVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI1OHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmraXmlbDorrDlvZVcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMxcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiM3B4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Y2V5L2N77ya5q2lXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMjAyNFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjIwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiNDAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCI2MDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjgwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMTAwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwibGlzdFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3QtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdEl0ZW1cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubGlzdDMwZGF5RGF0YSl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnN1bW1hcnlEYXRlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiNTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCI1MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicHJvZ3Jlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyY2VudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnBlcmNlbnQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9ncmVzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXJDb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMzBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLku4XmmL7npLrmnIDov5EzMOWkqeatpeaVsFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTE2cHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNlZmVmZWZcIixcbiAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjI4MHB4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidG9wX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI4MCVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInRvTG9naW5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy90b3V4aWFuZy5wbmdcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTIwcHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiNjBweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudXNlckRhdGEubG9naW5QaG9uZXx8J+ivt+eCueWHu+eZu+W9lScpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJsb2dcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnSUQ6JysoKHRoaXMudXNlckRhdGEudXNlcklkKSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInVzZXJfaWRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzY5Njk2OVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCItMTEwcHhcIixcbiAgICAgICAgICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjUwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiNTBweFwiLFxuICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2dyb3VwLnBuZ1wiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxNjRweFwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy51c2VyRGF0YS5iYWxhbmNlKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjcycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWDXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjEycHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxNTBweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNzBweFwiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjI3MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2Y3YmJhNCAwJVxcXCIsXFxcIiNmZGVjZDdcXFwiXX1dfVwiLFxuICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTkycHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInB1c2hQYWdlVGl4aWFuXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaPkOeOsFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYWE1MDIxXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYm90dG9tX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9iYW5uZXJfbWUucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTgwcHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwib3BlbkFkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjM4MHB4XCIsXG4gICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxNTJweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEzMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU4cHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaIkeeahOacjeWKoVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzFweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIzcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJhZGREZXNrdG9wXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWUxLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5re75Yqg5qGM6Z2iXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInB1c2hQYWdlZmVlZGJhY2tcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTIucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLkuL7miqXlj43ppohcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5wdXNod2ViKDEsZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWUzLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5biu5Yqp5Lit5b+DXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMucHVzaHdlYigyLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lNC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueUqOaIt+WNj+iurlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnB1c2h3ZWIoMyxldnQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTUucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLpmpDnp4HmlL/nrZZcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicHVzaFBhZ2VwZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lNi5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuiuvue9rlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZWFib3V0XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWU3LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWz5LqOXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInB1c2hQYWdlbG9nT3V0XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWU4LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5rOo6ZSAXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJ3YXJwXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ3otaW5kZXg6ICcrKCh0aGlzLnpJbmRleCkpKyc7J30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibWFza1wiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dQb3AmJiF0aGlzLmJhY2tJbWcpfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYmFja0ltZyl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dQb3AmJnRoaXMuYmFja0ltZyl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImltZ0JhY2tcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1BvcCYmIXRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlKX0sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ3Bvc2l0aW9uOmZpeGVkOyBib3R0b206JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBsZWZ0OicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcmlnaHQ6JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBib3JkZXItcmFkaXVzOicrKCgoMjQvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsnfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJwb3B1cFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdoZWlnaHQ6JysoKCg1Ni90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBwYWRkaW5nLWxlZnQ6ICcrKCgoMjQvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcGFkZGluZy1yaWdodDogJysoKCgyNC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4Oyd9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRpdGxlLnRyaW0oKXx8J+eUqOaIt+WNj+iurumakOengeaUv+etluaPkOekuicpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2ZvbnQtc2l6ZTogJysoKCgyMC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4Oyd9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdwYWRkaW5nLWxlZnQ6ICcrKCgoMjQvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcGFkZGluZy1yaWdodDogJysoKCgyNC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4Oyd9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYm9keVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2xvdFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYmEoMCwwLDAsMC45KVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOacrOacjeWKoemcgOimgSBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuiBlOe9kVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIO+8jOiwg+eUqCBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueUteivnVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOOAgSBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS9jee9rlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOadg+mZkOOAgeiOt+WPluiuvuWkh+OAgee9kee7nOOAgem6puWFi+mjjuOAgei/kOWKqOOAgeWBpeW6t+S/oeaBr+OAgueCueWHu+KAnOWQjOaEj+KAne+8jOWNs+ihqOekuuaCqOWQjOaEj+S4iui/sOWGheWuueWPiiBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiWFjnlKjmiLfljY/orq5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg44CBIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhbPkuo5YWOmakOengeivtOaYjlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDjgIIgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dGb290ZXIpfSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2hlaWdodDonKygoKDU2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHBhZGRpbmctbGVmdDogJysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBwYWRkaW5nLXJpZ2h0OiAnKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IG1hcmdpbi10b3A6JysoKCg4L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHgnfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImZvb3RlclwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5ouS57udXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzYWJsZWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5idG5kaXNhYmxlZCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdoZWlnaHQ6JysoKCg0MC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBmb250LXNpemU6JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBtYXJnaW4tcmlnaHQ6JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyB3aWR0aDonKygoKDk4NC0oMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCozKS8yKSkrJ3B4J30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5ZCM5oSPXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2hlaWdodDonKygoKDQwL3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IGZvbnQtc2l6ZTonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHdpZHRoOicrKCgoOTg0LSgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKjMpLzIpKSsncHgnfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdXJlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdXJlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInBvcHVwX3dpZHRoXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1BvcCYmdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGVyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRpdGxlLnRyaW0oKXx8J+eUqOaIt+WNj+iurumakOengeaUv+etluaPkOekuicpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJib2R5XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzbG90XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOeUs+ivtyBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWBpei6q+i/kOWKqFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOeUqOS6juiOt+WPluatpeaVsOS4juiusOW9leatpeaVsCzor7fmgqjlnKjkvb/nlKjvvIjmiJbnu6fnu63kvb/nlKjvvInmiJHku6znmoTkuqflk4HmnI3liqHliY3ku5Tnu4bpmIXor7sgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuOAiueUqOaIt+WNj+iuruOAi1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDlkowgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuOAiumakOengeaUv+etluOAi1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDjgILmiJHku6zlsIblhajlipvkv53pmpzmgqjnmoTlkIjms5XmnYPnm4rkuI7kv6Hmga/lronlhajvvIzlubblsIbmjIHnu63kuLrmgqjmj5DkvpvkvJjotKjmnI3liqHjgIIgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJmb290ZXJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dGb290ZXIpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Y+W5raIXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzYWJsZWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5idG5kaXNhYmxlZCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNhbmNlbFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWQjOaEj1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInN1cmVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInN1cmVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vdWkvY2lyY2xlL2luZGV4LnV4P25hbWU9bXktY2lyY2xlXCIpXG5yZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL3VpL2RpYWxvZy9pbmRleC51eD9uYW1lPW15LWRpYWxvZ1wiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi91aS9wcml2YWN5cG9wL2luZGV4LnV4P25hbWU9cHJpdmFjeS1wb3BcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wYWdlaG9tZSZkZXBlbmRzW109bXktY2lyY2xlJmRlcGVuZHNbXT1teS1kaWFsb2chLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Ib21lXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Ib21lXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3BhZ2Vob21lJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wYWdlcmVjb3JkIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfUmVjb3JkXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9SZWNvcmRcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcGFnZXJlY29yZCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZXVzZXIhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Vc2VyXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Vc2VyXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3BhZ2V1c2VyJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1teS1jaXJjbGUhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcdWlcXFxcY2lyY2xlXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcdWlcXFxcY2lyY2xlXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L215LWNpcmNsZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bXktZGlhbG9nIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGRpYWxvZ1xcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxkaWFsb2dcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbXktZGlhbG9nJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wcml2YWN5LXBvcCEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxwcml2YWN5cG9wXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXHByaXZhY3lwb3BcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcHJpdmFjeS1wb3AnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9QYWdlX1JlY29yZC9pbmRleC51eD9uYW1lPXBhZ2VyZWNvcmRcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9QYWdlX0hvbWUvaW5kZXgudXg/bmFtZT1wYWdlaG9tZVwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL1BhZ2VfVXNlci9pbmRleC51eD9uYW1lPXBhZ2V1c2VyXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP2RlcGVuZHNbXT1wYWdlaG9tZSZkZXBlbmRzW109cGFnZXJlY29yZCZkZXBlbmRzW109cGFnZXVzZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcaW5kZXgudXghLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMS4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
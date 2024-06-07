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
      url: 'https://test.ipandata.com' + url,
      method,
      data,
      header: _objectSpread({
        "content-type": "application/json"
      }, headers),
      success: function (res) {
        const data = res.data;
        if (data.code === "000000" || JSON.parse(data).code === "000000") {
          resolve(url.includes("qa/mini/basic/user/login") ? res.data : JSON.parse(res.data));
        } else {
          if (data.code === "300002") {
            _system2.default.delete({
              key: 'AUTH_TOKEN_DATA'
            });
            request(options).then(resolve).catch(reject);
          } else {
            reject(res.data);
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
var _default = exports["default"] = {
  toLogin,
  uploadsteps,
  getsteps,
  getstepslist
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
    currentPage: 0,
    segments: ['今日', '周', '月'],
    segmentsTexts: ['今日步数', '本周步数', '本月步数'],
    segmentsText: "",
    body_weight: 75,
    body_height: 180,
    sex: 1,
    age: 30,
    mileage: "0.0",
    calories: "0.0",
    bmi: "00.0",
    tzl: "00.0",
    open1: false,
    open2: false,
    obj: {}
  },
  onInit() {
    console.log("onInit()");
    this.getGoalDaySteps();
    this.getUserDetails();
    this.apigetStpes();
    this.subscribeStepCounter();
  },
  onReady() {
    console.log("onReady()");
    this.updateBMITzl();
  },
  onShow() {
    console.log("onShow()");
  },
  onHide() {
    console.log("onHide()");
  },
  onDestroy() {
    console.log("onDestroy()");
  },
  subscribeStepCounter() {
    _system.default.subscribeStepCounter({
      callback: ret => {
        console.log(`设备步数更新了！------>设备总步数=${ret.steps}`);
        this.stepSys = ret.steps;
        this.apiuploadStpes(ret.steps);
      },
      fail: (data, code) => {
        console.log(`步数计数器订阅失败, code = ${code}`);
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
        console.log('用户详情获取成功:', ret);
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
    this.mileage = (that.steps_view * 0.6 / 1000).toFixed(2);
    this.calories = (0.0175 * that.body_weight * that.steps_view).toFixed(1);
  },
  updateBMITzl() {
    const bmi = (this.body_weight / (this.body_height * 0.01) ** 2).toFixed(1);
    const param1 = 1.2 * bmi;
    const param2 = this.age * 0.23;
    const param3 = 5.4 + 10.8 * this.sex;
    this.tzl = (param1 + param2 - param3).toFixed(1);
    this.bmi = bmi;
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
  onInit() {},
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
    const maxSteps = 5000;
    return data.map(item => {
      const stepCount = parseInt(item.stepCount, 10);
      const percent = Math.round(stepCount / maxSteps * 100);
      return {
        summaryDate: item.summaryDate,
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

var _system = _interopRequireDefault($app_require$("@app-module/system.router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = {
  private: {},
  onInit() {},
  toLogin() {
    _system.default.push({
      uri: 'Page_login'
    });
  },
  pushPageTixian() {
    _system.default.push({
      uri: 'Page_Tixian'
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
        pic: './img/bar_1.png',
        pic_choice: './img/bar_11.png',
        show: true,
        title: '首页'
      }, {
        i: 1,
        color: '#878787',
        pic: './img/bar_2.png',
        pic_choice: './img/bar_22.png',
        show: false,
        title: '步数'
      }, {
        i: 2,
        color: '#878787',
        pic: './img/bar_3.png',
        pic_choice: './img/bar_33.png',
        show: false,
        title: '我的'
      }]
    }
  },
  onInit() {},
  changeTabactive: function (e) {
    for (let i = 0; i < this.datas.list.length; i++) {
      let element = this.datas.list[i];
      element.show = false;
      element.color = this.datas.color_normal;
      if (i === e.index) {
        element.show = true;
        element.color = this.datas.color_active;
        this.$page.setTitleBar({
          text: "计步",
          backgroundColor: '#f2f2f2',
          textColor: '#1a1a1a',
          menu: true
        });
      }
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
    if (newVal <= 0) newVal = 0;
    if (newVal >= 100) newVal = 100;
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
        ctx.arc(position, position, radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = trailWidth;
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
      if (count >= 100) return;
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
      fieldtype: "text",
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
        fieldtype: "text",
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./src/Page_MainTab/Page_Home/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./src/Page_MainTab/Page_Home/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".container": {
    "flexDirection": "column",
    "width": "100%"
  },
  ".top_view": {
    "width": "100%",
    "height": "828px",
    "flexDirection": "column",
    "alignItems": "center",
    "backgroundImage": "/Page_MainTab/Page_Home/img/group.png",
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
    "height": "610px",
    "flexDirection": "column",
    "alignItems": "center",
    "backgroundImage": "/Page_MainTab/Page_User/img/bg_me.png",
    "backgroundSize": "cover",
    "backgroundPosition": "center"
  },
  ".bottom_view": {
    "paddingTop": "27px",
    "paddingLeft": "27px",
    "paddingRight": "27px",
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
                        "maxlength": function () {return (this.defaultPrompt.maxlength===-1?'':this.defaultPrompt.maxlength)}
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
                        "maxlength": function () {return (this.defaultPrompt.maxlength===-1?'':this.defaultPrompt.maxlength)}
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
                        "maxlength": function () {return (this.defaultPrompt.maxlength===-1?'':this.defaultPrompt.maxlength)}
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
            "showTrail": function () {return (false)},
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
                    "src": "/Page_MainTab/Page_Home/img/icon_paobu.png"
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
            "backgroundImage": "/Page_MainTab/Page_Home/img/mingroup2.png",
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
                    "src": "/Page_MainTab/Page_Home/img/icon_bmi.png"
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
                    "src": "/Page_MainTab/Page_Home/img/icon_tzl.png"
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
                        "value": function () {return ((this.tzl))+'%'}
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
            "backgroundImage": "/Page_MainTab/Page_Home/img/standard.png",
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
                            "paddingLeft": "24px"
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
                                "color": "#00b2ff"
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
              "attr": {},
              "style": {
                "width": "113px",
                "height": "113px",
                "backgroundColor": "#bec9be",
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
                    "value": "请点击登录"
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
                    "value": function () {return 'ID: '+((this.user_id))}
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
            "marginTop": "-130px",
            "bottom": "0px",
            "justifyContent": "space-between",
            "paddingLeft": "50px",
            "paddingRight": "50px",
            "alignItems": "center",
            "backgroundImage": "/Page_MainTab/Page_User/img/group.png",
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
                    "value": "0.00"
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
          "type": "div",
          "attr": {},
          "style": {
            "borderRadius": "20px",
            "backgroundColor": "#ffffff",
            "width": "702px",
            "height": "394px",
            "paddingTop": "25px",
            "paddingRight": "25px",
            "paddingBottom": "25px",
            "paddingLeft": "25px",
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
                "marginTop": "30px"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "frame_"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame1.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame2.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame3.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame4.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame5.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame6.png"
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
                  "classList": [
                    "frame_"
                  ],
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame7.png"
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
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Page_MainTab/Page_User/img/frame8.png"
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/circle/index.ux?name=my-circle */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle")
__webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/dialog/index.ux?name=my-dialog */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfTWFpblRhYlxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUdBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFNQTtBQUVBO0FBSUE7QUFHQTtBQUdBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BmQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZUE7QUFBQTtBQUNBO0FBRUE7QUFHQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hamF4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX0hvbWUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxQYWdlX0hvbWVcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfUmVjb3JkL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcUGFnZV9SZWNvcmRcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXFBhZ2VfVXNlclxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFx1aVxcY2lyY2xlXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFx1aVxcZGlhbG9nXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD80ODIzIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/YjZiZSIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD8wMmQwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvaW5kZXgudXg/MjdiNyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2NpcmNsZS9pbmRleC51eD9lNjBiIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvZGlhbG9nL2luZGV4LnV4PzYwNDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9pbmRleC51eD8wZjI3Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2luZGV4LnV4P2EwYWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXg/NDI5NCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD84ZTQxIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/YjM5ZCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD82YTFhIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3N5c3RlbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5mZXRjaFwiKSk7XG52YXIgX3N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZVwiKSk7XG52YXIgX3N5c3RlbTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsga2V5ID0gX3RvUHJvcGVydHlLZXkoa2V5KTsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuY29uc3QgZ2V0VXNlcklkID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgdXNlcklkID0gYXdhaXQgX3N5c3RlbTMuZGVmYXVsdC5nZXRVc2VySWQoKTtcbiAgcmV0dXJuIHVzZXJJZC5kYXRhLnVzZXJJZDtcbn07XG5jb25zdCBnZXRUb2tlbkRhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZXhhbXBsZSA9IHJlcXVpcmUoJy4vYXBpcy9leGFtcGxlLmpzJykuZGVmYXVsdDtcbiAgICBjb25zdCBkZXZpY2VOdW0gPSBhd2FpdCBnZXRVc2VySWQoKTtcbiAgICBjb25zb2xlLmxvZyhgZ2V0VG9rZW5EYXRhKCktLS0tPmRldmljZU51bT0ke2RldmljZU51bX1gKTtcbiAgICBjb25zb2xlLmxvZygn5piv5ZCm6Kem5Y+R55qE6L+Z6YeMJyk7XG4gICAgZXhhbXBsZS50b0xvZ2luKHtcbiAgICAgIGxvZ2luVHlwZTogXCJERVZJQ0VcIixcbiAgICAgIGFwcElkOiAnU0NfMDAwMScsXG4gICAgICBkZXZpY2VOdW0sXG4gICAgICBsb2dpbkFjY291bnQ6IGRldmljZU51bVxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygn6LWw55qE5oiQ5Yqf5Zue6LCDJyk7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIsICflpLHotKXlm57osIMnKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5sZXQgaXNSZWZyZXNoaW5nID0gZmFsc2U7IC8vIOaYr+WQpuato+WcqOivt+axguWIt+aWsHRva2Vu55qE5o6l5Y+jXG5jb25zdCByZWZyZXNoU3Vic2NyaWJlcnMgPSBbXTsgLy8g5a2Y5YKo6K+35rGC55qE5pWw57uEXG5jb25zdCBzdWJzY3JpYmVUb2tlblJlZnJlc2ggPSBjYiA9PiB7XG4gIC8vIOWwhuaJgOacieeahOivt+axgumDvXB1c2jliLDmlbDnu4TkuK0s5YW25a6e5pWw57uE5pivW2Z1bmN0aW9uKHRva2VuKXt9LCBmdW5jdGlvbih0b2tlbil7fSwuLi5dXG4gIHJlZnJlc2hTdWJzY3JpYmVycy5wdXNoKGNiKTtcbn07XG5jb25zdCBvblJyZWZyZXNoZWQgPSB0b2tlbiA9PiB7XG4gIC8vIOaVsOe7hOS4reeahOivt+axguW+l+WIsOaWsOeahHRva2Vu5LmL5ZCO6Ieq5omn6KGM77yM55So5paw55qEdG9rZW7ljrvor7fmsYLmlbDmja5cbiAgcmVmcmVzaFN1YnNjcmliZXJzLm1hcChjYiA9PiBjYih0b2tlbikpO1xufTtcbmNvbnN0IGlzQWNjZXNzVG9rZW5FeHBpcmVkID0gYXV0aERhdGEgPT4ge1xuICAvLyDliKTmlq3lvZPliY10b2tlbuaYr+WQpui/h+acn1xuICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhdXRoRGF0YS5leHBpcmVBdCA+IDEwMDAwICogNjApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuY29uc3QgcmVxdWVzdCA9IG9wdGlvbnMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzID0ge31cbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBhdXRoRGF0YSA9IChhd2FpdCBfc3lzdGVtMi5kZWZhdWx0LmdldCh7XG4gICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgfSkpIHx8IHt9O1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXV0aERhdGEuZGF0YSA/IEpTT04ucGFyc2UoYXV0aERhdGEuZGF0YSkuYWNjZXNzVG9rZW4gOiAnJztcbiAgICBpZiAoaXNBY2Nlc3NUb2tlbkV4cGlyZWQoYXV0aERhdGEpIHx8ICFhY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKCFvcHRpb25zLnVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSkge1xuICAgICAgICBpZiAoIWlzUmVmcmVzaGluZykge1xuICAgICAgICAgIGlzUmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgZ2V0VG9rZW5EYXRhKCkudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gcmVzLmRhdGEuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgIGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuc2V0KHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiQVVUSF9UT0tFTl9EQVRBXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlcy5kYXRhLmFjY2Vzc1Rva2VuJywgcmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICBvblJyZWZyZXNoZWQocmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmV0cnkgPSBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaWJlVG9rZW5SZWZyZXNoKHRva2VuID0+IHtcbiAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHRva2VuOyAvLyDnlKjmnIDmlrB0b2tlbuivt+axguaVsOaNrlxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBhY2Nlc3NUb2tlbiB8fCAnJztcbiAgICBfc3lzdGVtLmRlZmF1bHQuZmV0Y2goe1xuICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmlwYW5kYXRhLmNvbScgKyB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sIGhlYWRlcnMpLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgPT09IFwiMDAwMDAwXCIgfHwgSlNPTi5wYXJzZShkYXRhKS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAgICAgcmVzb2x2ZSh1cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikgPyByZXMuZGF0YSA6IEpTT04ucGFyc2UocmVzLmRhdGEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZGF0YS5jb2RlID09PSBcIjMwMDAwMlwiKSB7XG4gICAgICAgICAgICBfc3lzdGVtMi5kZWZhdWx0LmRlbGV0ZSh7XG4gICAgICAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChyZXMuZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlcykge31cbiAgICB9KTtcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfYWpheCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2FqYXguanNcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IHRvTG9naW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL2xvZ2luYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5LiK5Lyg5q2l5pWwXG5jb25zdCB1cGxvYWRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL3VwbG9hZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vLyDojrflj5bmraXmlbBcblxuY29uc3QgZ2V0c3RlcHMgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g6I635Y+W5pyA6L+RMzDlpKnorrDlvZVcbmNvbnN0IGdldHN0ZXBzbGlzdCA9ICgpID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL2xpc3RgXG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgdG9Mb2dpbixcbiAgdXBsb2Fkc3RlcHMsXG4gIGdldHN0ZXBzLFxuICBnZXRzdGVwc2xpc3Rcbn07IiwiPGltcG9ydCBuYW1lPVwibXktY2lyY2xlXCIgc3JjPVwiLi4vdWkvY2lyY2xlL2luZGV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJteS1kaWFsb2dcIiBzcmM9XCIuLi91aS9kaWFsb2cvaW5kZXhcIj48L2ltcG9ydD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvcF92aWV3XCI+XG4gICAgICA8dGFicyBjbGFzcz1cInRhYnNcIiBvbmNoYW5nZT1cImNoYW5nZVRhYmFjdGl2ZVwiPlxuICAgICAgICA8dGFiLWJhciBjbGFzcz1cInRhYi1iYXJcIj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5LuK5pelPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7lkag8L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuaciDwvdGV4dD5cbiAgICAgICAgPC90YWItYmFyPlxuICAgICAgPC90YWJzPlxuICAgICAgPG15LWNpcmNsZSBjbGFzcz1cImNpcmNsZVwiIHNpemU9XCIzNTBcIiBwZXJjZW50PVwie3twcm9ncmVzc319XCIgc3Ryb2tlLWNvbG9yPVwiIzAwQjJGRlwiIHMtYW5nbGU9XCIxNTBcIiBzaG93LXRyYWlsPVwie3tmYWxzZX19XCIgdHJhaWwtY29sb3I9XCIjZmZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxpbWFnZSBzcmM9XCIuL2ltZy9pY29uX3Bhb2J1LnBuZ1wiIGNsYXNzPVwiaWNvbi1pbWFnZVwiIC8+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZV9zdHBlc1wiPnt7c2VnbWVudHNUZXh0fX08L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZV9zdHBlc192XCI+e3tzdGVwc192aWV3fX08L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9teS1jaXJjbGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZGV0YWlsLXZhbHVlMSBsYXJnZXItdGV4dFwiPnt7bWlsZWFnZX19PC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJzbWFsbGVyLXRleHRcIj5LTTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPumHjOeoizwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZGV0YWlsLXZhbHVlMiBsYXJnZXItdGV4dFwiPnt7Y2Fsb3JpZXN9fTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic21hbGxlci10ZXh0XCI+a2NhbDwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPua2iOiAl+eDremHjzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtaXRlbVwiIEBjbGljaz1cIm9wZW5TZXRTdGVwc0RpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtdmFsdWVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGlkPVwidVwiIGNsYXNzPVwiZGV0YWlsLXZhbHVlMyBsYXJnZXItdGV4dFwiPnt7Z29hbF9kYXl9fTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic21hbGxlci10ZXh0XCI+5q2lPjwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIm4tdGV4dFwiPuS7iuaXpeebruaghzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJib3R0b21fdmlld1wiPlxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNTJweDsgaGVpZ2h0OiA0NXB4OyBhbGlnbi1pdGVtczogZmxleC1lbmRcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDIzOHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MnB4OyBmb250LXNpemU6IDMxcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwb3NpdGlvbjogYWJzb2x1dGU7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogM3B4XCI+Qk1JL+S9k+iEgueOh+iuoeeulzwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICM4MjgyODI7IHBhZGRpbmctdG9wOiAxMHB4OyBwYWRkaW5nLWxlZnQ6IDIwcHhcIiBAY2xpY2s9XCJvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZ1wiPuWhq+WGmeiuoeeulz48L3RleHQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDE0MHB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWcvbWluZ3JvdXAyLnBuZyk7IG1hcmdpbi10b3A6IDE1cHg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tbGVmdDogLTMwcHhcIj5cbiAgICAgICAgICA8aW1hZ2Ugc3JjPVwiLi9pbWcvaWNvbl9ibWkucG5nXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgaGVpZ2h0OiA5MHB4XCIgLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IG1hcmdpbi1sZWZ0OiAxNnB4XCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjMtdGV4dFwiPkJNSTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFyZ2VyMi10ZXh0XCI+e3tibWl9fTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyXCI+XG4gICAgICAgICAgPGltYWdlIHNyYz1cIi4vaW1nL2ljb25fdHpsLnBuZ1wiIHN0eWxlPVwid2lkdGg6IDkwcHg7IGhlaWdodDogOTBweFwiIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBtYXJnaW4tbGVmdDogMTZweFwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYXJnZXIzLXRleHRcIj7kvZPohILnjoc8L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjItdGV4dFwiPnt7dHpsfX0lPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1nL3N0YW5kYXJkLnBuZyk7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDM2OHB4OyBtYXJnaW4tdG9wOiAxNHB4XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG15LWRpYWxvZyB2aXNpYmxlPVwie3tvcGVuMX19XCIgZGlhbG9nLXR5cGU9XCJwcm9tcHRcIiBvbmFmZmlybT1cImVudGVyU3RlcHNcIiBvbmNhbmNlbD1cImNsb3NlXCIgb25lbnRlcj1cImVudGVyU3RlcHNcIiBwcm9tcHQ9XCJ7e29ian19XCI+PC9teS1kaWFsb2c+XG4gICAgPG15LWRpYWxvZyB2aXNpYmxlPVwie3tvcGVuMn19XCIgZGlhbG9nLXR5cGU9XCJwcm9tcHQxXCIgb25hZmZpcm09XCJlbnRlckRldGFpbHNcIiBvbmNhbmNlbD1cImNsb3NlXCIgcHJvbXB0PVwie3tvYmp9fVwiPjwvbXktZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgLmNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC50b3BfdmlldyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA4MjhweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi9pbWcvZ3JvdXAucG5nXCIpOyAvKiDmm7/mjaLkuLrkvaDnmoTog4zmma/lm77niYfot6/lvoQgKi9cbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyAvKiDkvb/og4zmma/lm77niYfopobnm5bmlbTkuKrlrrnlmaggKi9cbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IC8qIOWwhuiDjOaZr+WbvueJh+WxheS4reWvuem9kCAqL1xuICB9XG5cbiAgLmJvdHRvbV92aWV3IHtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDI3cHg7XG4gICAgcGFkZGluZy1yaWdodDogMjdweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDc1MHB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAtMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XG4gIH1cbiAgLmljb24taW1hZ2Uge1xuICAgIHdpZHRoOiA0NHB4OyAvKiDorr7nva7lm77niYflrr3luqYgKi9cbiAgICBoZWlnaHQ6IDQ0cHg7IC8qIOiuvue9ruWbvueJh+mrmOW6piAqL1xuICB9XG5cbiAgLmNpcmNsZSB7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgfVxuXG4gIC50ZXh0LWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDkvb/mlofmnKzlsYXkuK3lr7npvZAgKi9cbiAgfVxuXG4gIC50aXRsZV9zdHBlcyB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG5cbiAgLnRpdGxlX3N0cGVzX3Yge1xuICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogIzAwMDtcbiAgfVxuXG4gIC5kZXRhaWxzIHtcbiAgICB3aWR0aDogNzAycHg7XG4gICAgaGVpZ2h0OiAxNzVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgIGJvdHRvbTogMDsgLyog5Zu65a6a5Zyo54i25a655Zmo5bqV6YOoICovXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgLmRldGFpbC1pdGVtIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAvKiDkvb/lrZDlhYPntKDlnoLnm7TmjpLliJcgKi9cbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgLyog5a2Q5YWD57Sg5Zyo5Z6C55u05pa55ZCR5Z2H5YyA5YiG5biDICovXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgLyog5a2Q5YWD57Sg5Zyo5rC05bmz5pa55ZCR5bGF5LitICovXG4gIH1cblxuICAuZGV0YWlsLXZhbHVlIHtcbiAgICBmbGV4OiAxOyAvKiDlrZDlhYPntKDlubPliIblrr3luqYgKi9cblxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7IC8qIOS9v+WtkOWFg+e0oOawtOW5s+aOkuWIlyAqL1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDsgLyog5a2Q5YWD57Sg5Zyo5rC05bmz5pa55ZCR5bGF5LitICovXG4gIH1cblxuICAubGFyZ2VyLXRleHQge1xuICAgIGZvbnQtc2l6ZTogNDhweDsgLyog6K6+572u6L6D5aSn55qE5a2X5L2T5aSn5bCPICovXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuXG4gIC5sYXJnZXIyLXRleHQge1xuICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgIGZvbnQtc2l6ZTogNDhweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5sYXJnZXIzLXRleHQge1xuICAgIGNvbG9yOiAjNGI0YjRiO1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuICAuc21hbGxlci10ZXh0IHtcbiAgICBmb250LXNpemU6IDI0cHg7IC8qIOiuvue9rui+g+Wwj+eahOWtl+S9k+Wkp+WwjyAqL1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuICAubi10ZXh0IHtcbiAgICBmb250LXNpemU6IDI2cHg7IC8qIOiuvue9rui+g+Wwj+eahOWtl+S9k+Wkp+WwjyAqL1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG4gIC50YWJzIHtcbiAgICB3aWR0aDogNTIwcHg7XG4gICAgbWFyZ2luLXRvcDogMjU1cHg7XG4gIH1cbiAgLnRhYi1iYXIge1xuICAgIGJvcmRlci1jb2xvcjogI2JiYmJiYjtcbiAgICBjb2xvcjogI2JiYmJiYjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDU0cHg7XG4gIH1cbiAgLnRhYi10ZXh0IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDY1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNzRweDtcbiAgfVxuICAudGFiLXRleHQ6YWN0aXZlIHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjOGZmZjM0IDAlLCAjZWJmZDY2KTtcbiAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHNlbnNvciBmcm9tICdAc3lzdGVtLnNlbnNvcic7XG4gIGltcG9ydCBzdG9yYWdlIGZyb20gJ0BzeXN0ZW0uc3RvcmFnZSc7XG4gIGltcG9ydCBleGFtcGxlIGZyb20gJy4uLy4uL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzJztcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG5cblxuICAgIHByaXZhdGU6IHtcbiAgICAgIGNvbXBvbmVudERhdGE6IHt9LFxuICAgICAgZ29hbERheUtleTogXCJHT0FMX0RBWVwiLFxuICAgICAgdXNlckRldGFpbHNLZXk6IFwiVXNlckRldGFpbHNcIixcblxuICAgICAgc3RlcFN5czogMCwvL+iuvuWkh+W9k+WJjeaAu+atpeaVsFxuICAgICAgc3RlcHNfdmlldzogMCwgLy8g5b2T5YmN5pi+56S655qE5q2l5pWwXG5cblxuICAgICAgc3RlcHNEYXlBcGk6IDAsIC8vIOW9k+WkqeS6keatpeaVsFxuICAgICAgc3RlcHNXZWVrQXBpOiAwLCAvLyDlvZPlkajkupHmraXmlbBcbiAgICAgIHN0ZXBzTW9vbkFwaTogMCwgLy8g5b2T5pyI5LqR5q2l5pWwXG5cbiAgICAgIGdvYWxfZGF5OiAwLCAgLy8g5b2T5pel55uu5qCH5q2l5pWwXG5cbiAgICAgIHByb2dyZXNzOiAwLCAvLyDnlKjkuo7lrZjlgqjmraXmlbDov5vluqZcblxuICAgICAgY3VycmVudFBhZ2U6IDAsLy/lvZPliY3pgInnmoTpobXvvIzpu5jorqTmmL7npLrku4rml6VcbiAgICAgIHNlZ21lbnRzOiBbXG4gICAgICAgICfku4rml6UnLCAn5ZGoJywgJ+aciCdcbiAgICAgIF0sXG4gICAgICBzZWdtZW50c1RleHRzOiBbXG4gICAgICAgICfku4rml6XmraXmlbAnLCAn5pys5ZGo5q2l5pWwJywgJ+acrOaciOatpeaVsCdcbiAgICAgIF0sXG4gICAgICBzZWdtZW50c1RleHQ6IFwiXCIsXG5cblxuICAgICAgYm9keV93ZWlnaHQ6IDc1LC8v5L2T6YeNXG4gICAgICBib2R5X2hlaWdodDogMTgwLC8v6Lqr6auYXG4gICAgICBzZXg6IDEsLy/mgKfliKsgIDEg55S377yMMCDlpbNcbiAgICAgIGFnZTogMzAsXG4gICAgICBtaWxlYWdlOiBcIjAuMFwiLC8v6YeM56iLXG4gICAgICBjYWxvcmllczogXCIwLjBcIiwvL+WNoei3r+mHjFxuICAgICAgYm1pOiBcIjAwLjBcIiwvL0JNSVxuICAgICAgdHpsOiBcIjAwLjBcIiwvL+S9k+iEgueOh1xuXG5cbiAgICAgIG9wZW4xOiBmYWxzZSxcbiAgICAgIG9wZW4yOiBmYWxzZSxcbiAgICAgIG9iajoge31cblxuICAgIH0sXG4gICAgLy/pppbpobXliJ3lp4vljJbmtYHnqIvvvJpcbiAgICAvLyBTdGVwMeiOt+WPlueUqOaIt+iuvue9rueahOS7iuaXpeebruagh+atpeaVsFxuICAgIC8vIFN0ZXAy5LuO5ZCO5Y+w6I635Y+W5b2T5YmN5q2l5pWwICBcbiAgICAvLyBTdGVwM+agueaNruiOt+WPluWIsOeahOW9k+WJjeatpeaVsO+8jOabtOaWsOS7iuaXpei/m+W6pu+8jOmHjOeoi++8jOa2iOiAl+eDremHjyBcbiAgICAvL1xuICAgIG9uSW5pdCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25Jbml0KClcIilcbiAgICAgIHRoaXMuZ2V0R29hbERheVN0ZXBzKCk7Ly8gU3RlcDFcbiAgICAgIHRoaXMuZ2V0VXNlckRldGFpbHMoKTtcbiAgICAgIHRoaXMuYXBpZ2V0U3RwZXMoKS8vIFN0ZXAyXG4gICAgICB0aGlzLnN1YnNjcmliZVN0ZXBDb3VudGVyKCk7XG5cbiAgICB9LFxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25SZWFkeSgpXCIpXG5cbiAgICAgIHRoaXMudXBkYXRlQk1JVHpsKCk7XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uU2hvdygpXCIpXG4gICAgfSxcblxuICAgIG9uSGlkZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25IaWRlKClcIilcbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgY29uc29sZS5sb2coXCJvbkRlc3Ryb3koKVwiKVxuICAgIH0sXG5cblxuICAgIHN1YnNjcmliZVN0ZXBDb3VudGVyKCkge1xuICAgICAgLy8g6K6i6ZiF5q2l5pWw6K6h5pWw5ZmoXG4gICAgICBzZW5zb3Iuc3Vic2NyaWJlU3RlcENvdW50ZXIoe1xuICAgICAgICBjYWxsYmFjazogKHJldCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGDorr7lpIfmraXmlbDmm7TmlrDkuobvvIEtLS0tLS0+6K6+5aSH5oC75q2l5pWwPSR7cmV0LnN0ZXBzfWApXG4gICAgICAgICAgdGhpcy5zdGVwU3lzID0gcmV0LnN0ZXBzO1xuICAgICAgICAgIC8v5LiK5Lyg5q2l5pWwXG4gICAgICAgICAgdGhpcy5hcGl1cGxvYWRTdHBlcyhyZXQuc3RlcHMpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChkYXRhLCBjb2RlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYOatpeaVsOiuoeaVsOWZqOiuoumYheWksei0pSwgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8v6I635Y+W55So5oi36K6+5a6a55qE5LuK5pel55uu5qCHXG4gICAgZ2V0R29hbERheVN0ZXBzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICBrZXk6IHRoaXMuZ29hbERheUtleSxcbiAgICAgICAgZGVmYXVsdDogMTAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0b3JhZ2UuZ2V0KCk6ICcsIEpTT04uc3RyaW5naWZ5KHJldCkpXG4gICAgICAgICAgdGhhdC5nb2FsX2RheSA9IHJldFxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldCBmYWlsIC0tLSAnICsgZXJyb2NvZGUgKyAnOicgKyBlcnJvbXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvL+S/neWtmOeUqOaIt+iuvuWumueahOS7iuaXpeebruagh1xuICAgIHNldEdvYWxEYXlTdGVwcyhkYXRhKSB7XG4gICAgICBzdG9yYWdlLnNldCh7XG4gICAgICAgIGtleTogdGhpcy5nb2FsRGF5S2V5LC8vXG4gICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdzdG9yYWdlLnNldCgpOiAnLCBKU09OLnN0cmluZ2lmeShyZXQpKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3NldCBmYWlsIC0tLSAnICsgZXJyb2NvZGUgKyAnOicgKyBlcnJvbXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvL+iOt+WPlueUqOaIt+iuvuWumueahOivpuaDhVxuICAgIGdldFVzZXJEZXRhaWxzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICBrZXk6IHRoaXMudXNlckRldGFpbHNLZXksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi36K+m5oOF6I635Y+W5oiQ5YqfOicsIHJldCk7XG4gICAgICAgICAgaWYgKHJldCAmJiByZXQudHJpbSgpKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlscyA9IEpTT04ucGFyc2UocmV0KVxuXG4gICAgICAgICAgICAvLyDmm7TmlrDlkITkuKrlsZ7mgKdcbiAgICAgICAgICAgIHRoYXQuYm9keV93ZWlnaHQgPSBOdW1iZXIodXNlckRldGFpbHMuYm9keV93ZWlnaHQpIHx8IHRoYXQuYm9keV93ZWlnaHQ7IC8vIOehruS/nei9rOaNouS4uuaVsOWtl+exu+Wei1xuICAgICAgICAgICAgdGhhdC5ib2R5X2hlaWdodCA9IE51bWJlcih1c2VyRGV0YWlscy5ib2R5X2hlaWdodCkgfHwgdGhhdC5ib2R5X2hlaWdodDsgLy8g56Gu5L+d6L2s5o2i5Li65pWw5a2X57G75Z6LXG4gICAgICAgICAgICB0aGF0LnNleCA9IHVzZXJEZXRhaWxzLnNleCAhPT0gdW5kZWZpbmVkID8gdXNlckRldGFpbHMuc2V4IDogdGhhdC5zZXg7IC8vIOS/neaMgeS4uuaVsOWtl+exu+Wei1xuICAgICAgICAgICAgdGhhdC5hZ2UgPSBOdW1iZXIodXNlckRldGFpbHMuYWdlKSB8fCB0aGF0LmFnZTsgLy8g56Gu5L+d6L2s5o2i5Li65pWw5a2X57G75Z6LXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmm7TmlrDlkI7nmoTnlKjmiLfor6bmg4U6JywgdGhhdC5ib2R5X3dlaWdodCwgdGhhdC5ib2R5X2hlaWdodCwgdGhhdC5zZXgsIHRoYXQuYWdlKTtcblxuICAgICAgICAgICAgdGhhdC51cGRhdGVCTUlUemwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdnZXQgZmFpbCAtLS0gJyArIGVycm9jb2RlICsgJzonICsgZXJyb21zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy/kv53lrZjnlKjmiLforr7lrprnmoTor6bmg4VcbiAgICBzZXRVc2VyRGV0YWlscygpIHtcbiAgICAgIGNvbnN0IHVzZXJEZXRhaWxzID0ge1xuICAgICAgICBib2R5X3dlaWdodDogdGhpcy5ib2R5X3dlaWdodCxcbiAgICAgICAgYm9keV9oZWlnaHQ6IHRoaXMuYm9keV9oZWlnaHQsXG4gICAgICAgIHNleDogdGhpcy5zZXgsXG4gICAgICAgIGFnZTogdGhpcy5hZ2VcbiAgICAgIH07XG4gICAgICBzdG9yYWdlLnNldCh7XG4gICAgICAgIGtleTogdGhpcy51c2VyRGV0YWlsc0tleSxcbiAgICAgICAgdmFsdWU6IHVzZXJEZXRhaWxzLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+ivpuaDheS/neWtmOaIkOWKnzonLCByZXQpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnlKjmiLfor6bmg4Xkv53lrZjlpLHotKU6JywgZXJyb21zZywgZXJyb2NvZGUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cblxuICAgIC8v5pu05paw5q2l5pWw6L+b5bqmXG4gICAgdXBkYXRlUHJvZ3Jlc3MoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZyhg5pu05paw5q2l5pWw6L+b5bqm77yB5LuK5pel5LqR5q2l5pWwPSR7dGhhdC5zdGVwc0RheUFwaX1gKVxuXG5cbiAgICAgIC8vIOWvueW6lOmhtemdoueahOaYvuekuuatpeaVsFxuICAgICAgY29uc3Qgc2VydmljZV9zdGVwID0gW3RoYXQuc3RlcHNEYXlBcGksIHRoYXQuc3RlcHNXZWVrQXBpLCB0aGF0LnN0ZXBzTW9vbkFwaV07XG4gICAgICAvLyDlvZPliY3mmL7npLrmraXmlbBcbiAgICAgIGNvbnN0IGN1cnJlbnRzU3RlcCA9IHNlcnZpY2Vfc3RlcFt0aGF0LmN1cnJlbnRQYWdlXTtcblxuXG5cblxuICAgICAgLy8g5a6a5LmJ5LiN5ZCM6aG16Z2i5a+55bqU55qE55uu5qCH5q2l5pWwXG4gICAgICBjb25zdCBnb2FscyA9IFt0aGF0LmdvYWxfZGF5LCB0aGF0LmdvYWxfZGF5ICogNywgdGhhdC5nb2FsX2RheSAqIDMwXTtcbiAgICAgIC8vIOWvueW6lOmhtemdoueahOebruagh+atpeaVsFxuICAgICAgY29uc3QgY3VycmVudEdvYWwgPSBnb2Fsc1t0aGF0LmN1cnJlbnRQYWdlXTtcblxuXG4gICAgICAvLyDorqHnrpfmraXmlbDmr5TkvotcbiAgICAgIGNvbnN0IHN0ZXBSYXRpbyA9IGN1cnJlbnRzU3RlcCAvIGN1cnJlbnRHb2FsO1xuXG4gICAgICAvLyDorqHnrpfov5vluqblgLzlubbmm7TmlrBcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbihzdGVwUmF0aW8gKiAxMDAsIDEwMCkgKiAwLjY2Oy8v5LmYMC42NueahOWOn+WboOS4uui/m+W6pueOr+acgOWkp+inkuW6puS4ujI2MOW6pu+8jOWNs+S4ieWIhuS5i+S6jOWchlxuXG5cbiAgICAgIHRoaXMuc3RlcHNfdmlldyA9IGN1cnJlbnRzU3RlcDtcbiAgICAgIHRoaXMuc2VnbWVudHNUZXh0ID0gdGhhdC5zZWdtZW50c1RleHRzW3RoYXQuY3VycmVudFBhZ2VdXG5cbiAgICAgIGNvbnNvbGUubG9nKGDnm67liY0ke3RoYXQuc2VnbWVudHNUZXh0fei/m+W6piA9ICR7TWF0aC5taW4oc3RlcFJhdGlvICogMTAwLCAxMDApLnRvRml4ZWQoMSl9JWApO1xuXG5cbiAgICAgIHRoaXMudXBkYXRlTWlsZWFnZUFuZENhbG9yaWVzKCkvL+abtOaWsOWNoei3r+mHjO+8jOmHjOeoi1xuICAgIH0sXG5cblxuICAgIC8v5pu05paw5Y2h6Lev6YeM77yM6YeM56iLXG4gICAgdXBkYXRlTWlsZWFnZUFuZENhbG9yaWVzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy/mm7TmlrDph4znqItcbiAgICAgIHRoaXMubWlsZWFnZSA9ICgodGhhdC5zdGVwc192aWV3ICogMC42KSAvIDEwMDApLnRvRml4ZWQoMik7XG4gICAgICAvLyDorqHnrpfljaHot6/ph4zmtojogJfvvIzlubblj6rmmL7npLrkuIDkvY3lsI/mlbBcbiAgICAgIHRoaXMuY2Fsb3JpZXMgPSAoMC4wMTc1ICogdGhhdC5ib2R5X3dlaWdodCAqIHRoYXQuc3RlcHNfdmlldykudG9GaXhlZCgxKTtcbiAgICB9LFxuXG5cbiAgICAvL+abtOaWsEJNSSDkvZPohILnjodcbiAgICB1cGRhdGVCTUlUemwoKSB7XG4gICAgICBjb25zdCBibWkgPSAodGhpcy5ib2R5X3dlaWdodCAvICh0aGlzLmJvZHlfaGVpZ2h0ICogMC4wMSkgKiogMikudG9GaXhlZCgxKTtcbiAgICAgIGNvbnN0IHBhcmFtMSA9ICgxLjIgKiBibWkpO1xuICAgICAgY29uc3QgcGFyYW0yID0gdGhpcy5hZ2UgKiAwLjIzO1xuICAgICAgY29uc3QgcGFyYW0zID0gNS40ICsgKDEwLjggKiB0aGlzLnNleCk7XG5cblxuICAgICAgdGhpcy50emwgPSAocGFyYW0xICsgcGFyYW0yIC0gcGFyYW0zKS50b0ZpeGVkKDEpO1xuICAgICAgdGhpcy5ibWkgPSBibWk7XG5cbiAgICB9LFxuXG4gICAgLy/miZPlvIDln7rmnKzmg4XlhrXnqpflj6NcbiAgICBvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZygpIHtcbiAgICAgIGNvbnNvbGUubG9nKGDmiZPlvIDln7rmnKzmg4XlhrXnqpflj6NgKTtcbiAgICAgIHRoaXMub3BlbjIgPSB0cnVlXG4gICAgICB0aGlzLm9iaiA9IHtcbiAgICAgICAgdGl0bGU6ICfloavlhpnln7rmnKzmg4XlhrUnLFxuICAgICAgICBmaWVsZHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIui+k+WFpeaVtOaVsOaVsOWtl1wiLFxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8v5omT5byA6K6+5a6a55uu5qCH5q2l5pWw56qX5Y+jXG4gICAgb3BlblNldFN0ZXBzRGlhbG9nKCkge1xuICAgICAgY29uc29sZS5sb2coYOaJk+W8gOiuvuWumuebruagh+atpeaVsOeql+WPo2ApO1xuXG4gICAgICB0aGlzLm9wZW4xID0gdHJ1ZVxuICAgICAgdGhpcy5vYmogPSB7XG4gICAgICAgIHRpdGxlOiAn6K6+572u5q+P5pel5q2l5pWwJyxcbiAgICAgICAgZmllbGR0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCLovpPlhaXmlbTmlbDmlbDlrZdcIixcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/noa7lrprnm67moIfmraXmlbBcbiAgICBlbnRlclN0ZXBzKGV2dCkge1xuICAgICAgdGhpcy5vcGVuMSA9IGZhbHNlXG4gICAgICBjb25zdCBnb2FsX3N0cGUgPSBldnQuZGV0YWlsLmV2ZW50LnZhbHVlXG4gICAgICBjb25zb2xlLmxvZyhg6K6+5a6a5LqG55uu5qCH5q2l5pWw77yaJHtnb2FsX3N0cGV9YCk7XG4gICAgICB0aGlzLmdvYWxfZGF5ID0gZ29hbF9zdHBlO1xuICAgICAgdGhpcy5zZXRHb2FsRGF5U3RlcHMoZ29hbF9zdHBlKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3MoKTtcblxuICAgIH0sXG5cbiAgICAvL+ehruWumuWfuuacrOaDheWGtVxuICAgIGVudGVyRGV0YWlscyhldnQpIHtcbiAgICAgIHRoaXMub3BlbjIgPSBmYWxzZVxuXG4gICAgICBjb25zdCBrZyA9IGV2dC5kZXRhaWwuZXZlbnQua2dcbiAgICAgIGNvbnN0IGNtID0gZXZ0LmRldGFpbC5ldmVudC5jbVxuICAgICAgY29uc3QgYWdlID0gZXZ0LmRldGFpbC5ldmVudC5hZ2VcbiAgICAgIGNvbnN0IHNleCA9IGV2dC5kZXRhaWwuZXZlbnQuc2V4XG4gICAgICBjb25zb2xlLmxvZyhg6K6+5a6a5LqG5L2T6YeN77yaJHtrZ30s6Lqr6auY77yaJHtjbX0s5bm06b6E77yaJHthZ2V9LHNleDoke3NleH1gKTtcblxuICAgICAgdGhpcy5ib2R5X3dlaWdodCA9IGtnO1xuICAgICAgdGhpcy5ib2R5X2hlaWdodCA9IGNtO1xuICAgICAgdGhpcy5hZ2UgPSBhZ2U7XG4gICAgICB0aGlzLnNleCA9IHNleDtcblxuICAgICAgdGhpcy5zZXRVc2VyRGV0YWlscygpXG4gICAgICB0aGlzLnVwZGF0ZUJNSVR6bCgpXG5cbiAgICB9LFxuXG4gICAgY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZyhg5YWz6Zet5LqG56qX5Y+j77yaYCk7XG4gICAgICB0aGlzLm9wZW4xID0gZmFsc2VcbiAgICAgIHRoaXMub3BlbjIgPSBmYWxzZVxuICAgIH0sXG5cbiAgICAvL+WIh+aNouWkqe+8jOWRqO+8jOaciOmhtemdolxuICAgIGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuaW5kZXgpXG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5pbmRleDtcblxuICAgICAgdGhpcy5hcGlnZXRTdHBlcygpXG4gICAgfSxcblxuXG5cbiAgICAvL+iOt+WPluS6keatpeaVsFxuICAgIGFwaWdldFN0cGVzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgdHlwZXMgPSBbXCJUT0RBWVwiLCBcIldFRUtcIiwgXCJNT09OXCJdO1xuICAgICAgY29uc3QgYXBpS2V5cyA9IFtcInN0ZXBzRGF5QXBpXCIsIFwic3RlcHNXZWVrQXBpXCIsIFwic3RlcHNNb29uQXBpXCJdO1xuICAgICAgdmFyIHQgPSB0eXBlc1t0aGF0LmN1cnJlbnRQYWdlXTtcbiAgICAgIGV4YW1wbGUuZ2V0c3RlcHMoe1xuICAgICAgICB0eXBlOiB0XG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYOiOt+WPluOAiiR7dH3jgIvkupHmraXmlbDmiJDlip/vvIEgLS0tLS0tPuS6keatpeaVsD0ke3Jlc3BvbnNlLmRhdGF9YCk7XG5cbiAgICAgICAgLy8g5qC55o2u5b2T5YmN6aG16Z2i5L+d5a2Y5q2l5pWwXG4gICAgICAgIHRoYXRbYXBpS2V5c1t0aGF0LmN1cnJlbnRQYWdlXV0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyDojrflj5Yke3R95q2l5pWw5aSx6LSlOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLy/kuIrkvKDmraXmlbBcbiAgICBhcGl1cGxvYWRTdHBlcyhjKSB7XG4gICAgICB2YXIgdCA9IERhdGUubm93KCk7XG4gICAgICBjb25zb2xlLmxvZyhg5LiK5Lyg5q2l5pWw5LitLS0tLT7mraXmlbA9JHtjfSx0ID0gJHt0fWApO1xuXG4gICAgICBleGFtcGxlLnVwbG9hZHN0ZXBzKHtcbiAgICAgICAgY291bnQ6IGMsXG4gICAgICAgIFwidGltZXN0YW1wXCI6IHRcbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIOS4iuS8oOatpeaVsHN1Y2Nlc3NmdWw6JywgcmVzcG9uc2UpO1xuICAgICAgICB0aGlzLnN0ZXBzRGF5QXBpID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcg5LiK5Lyg5q2l5pWwZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgfVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgcGFkZGluZy10b3A6IDI3cHhcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB3aWR0aDogNzAycHg7IGhlaWdodDogNTkycHg7IHBhZGRpbmc6IDI1cHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG1hcmdpbi10b3A6IDE1MHB4XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGhlaWdodDogNzBweFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTUycHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEzMHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj7mraXmlbDorrDlvZU8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI0cHg7IGNvbG9yOiAjODI4MjgyXCI+5Y2V5L2N77ya5q2lPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tdG9wOiAyMHB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI2cHg7IGNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZDsgbWFyZ2luOiAyMHB4XCI+MjAyNDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj4yMDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+NDAwMDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjYwMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj44MDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+MTAwMDA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxsaXN0IGNsYXNzPVwibGlzdFwiPlxyXG4gICAgICAgICAgPGxpc3QtaXRlbSB0eXBlPVwibGlzdEl0ZW1cIiBmb3I9XCJ7e2xpc3QzMGRheURhdGF9fVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDEyMHB4OyBmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjMDAwMDAwXCI+e3skaXRlbS5zdW1tYXJ5RGF0ZX19PC90ZXh0PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7IGhlaWdodDogMzJweDsgcGFkZGluZy1sZWZ0OiAyNHB4XCI+XHJcbiAgICAgICAgICAgICAgICA8cHJvZ3Jlc3MgY2xhc3M9XCJwcm9ncmVzc1wiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGNvbG9yOiAjMDBiMmZmXCIgcGVyY2VudD1cInt7JGl0ZW0ucGVyY2VudH19XCI+PC9wcm9ncmVzcz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2xpc3QtaXRlbT5cclxuICAgICAgICA8L2xpc3Q+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyBtYXJnaW4tdG9wOiAzMHB4XCI+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAxMTZweDsgcGFkZGluZzogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBmb250LXNpemU6IDI0cHg7IGNvbG9yOiAjODI4MjgyOyB3aWR0aDogMjgwcHhcIj7ku4XmmL7npLrmnIDov5EzMOWkqeatpeaVsDwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcblxyXG48c3R5bGU+XHJcbiAgLmxpc3Qge1xyXG4gICAgbGF5b3V0LXR5cGU6IHN0YWdnZXI7XHJcbiAgfVxyXG5cclxuICAuaXRlbSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAyMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBleGFtcGxlIGZyb20gJy4uLy4uL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzJztcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJpdmF0ZToge1xyXG4gICAgICBsaXN0MzBkYXlEYXRhOiBbXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICB0aGlzLmluaXRDaGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5nZXQzMGRheVJlY29yZCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2V0MzBkYXlSZWNvcmQoKSB7XHJcbiAgICAgIGV4YW1wbGUuZ2V0c3RlcHNsaXN0KCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmnIDov5EzMOWkqeiusOW9lS3miJDlip/vvIE6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgdGhpcy5saXN0MzBkYXlEYXRhID0gdGhpcy5mb3JtYXREYXRhKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5pyA6L+RMzDlpKnorrDlvZUt5aSx6LSl77yM5ZON5bqU5Li656m65oiW5rKh5pyJ5pWw5o2u77yBJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcg6I635Y+W5pyA6L+RMzDlpKnorrDlvZUt5aSx6LSl77yBJywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBmb3JtYXREYXRhKGRhdGEpIHtcclxuICAgICAgY29uc3QgbWF4U3RlcHMgPSA1MDAwOyAvLyDlgYforr7mnIDlpKfmraXmlbDkuLoxMDAwMFxyXG4gICAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gcGFyc2VJbnQoaXRlbS5zdGVwQ291bnQsIDEwKTsgLy8gIFxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKChzdGVwQ291bnQgLyBtYXhTdGVwcykgKiAxMDApOyAvLyDorqHnrpfnmb7liIbmr5Tlubblm5voiI3kupTlhaVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc3VtbWFyeURhdGU6IGl0ZW0uc3VtbWFyeURhdGUsXHJcbiAgICAgICAgICBzdGVwQ291bnQ6IHN0ZXBDb3VudCxcclxuICAgICAgICAgIHBlcmNlbnQ6IHBlcmNlbnRcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRDaGFydCgpIHtcclxuICAgIH0sXHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvcF92aWV3XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogY2VudGVyOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiA4MCVcIiBvbmNsaWNrPVwidG9Mb2dpblwiPlxyXG4gICAgICAgIDxpbWFnZSBzdHlsZT1cIndpZHRoOiAxMTNweDsgaGVpZ2h0OiAxMTNweDsgYmFja2dyb3VuZC1jb2xvcjogI2JlYzliZTsgbWFyZ2luLWxlZnQ6IDYwcHhcIiAvPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsgaGVpZ2h0OiAxMjBweDsgbWFyZ2luLWxlZnQ6IDEwcHg7IHBhZGRpbmc6IDEwcHhcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibG9nXCIgc3R5bGU9XCJjb2xvcjogIzAwMDAwMDsgZm9udC1zaXplOiAzMnB4OyBmb250LXdlaWdodDogYm9sZFwiPuivt+eCueWHu+eZu+W9lTwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidXNlcl9pZFwiIHN0eWxlPVwiY29sb3I6ICM2OTY5Njk7IGZvbnQtc2l6ZTogMjhweFwiPklEOiB7e3VzZXJfaWR9fTwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogLTEzMHB4OyBib3R0b206IDA7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgcGFkZGluZy1sZWZ0OiA1MHB4OyBwYWRkaW5nLXJpZ2h0OiA1MHB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWcvZ3JvdXAucG5nKTsgaGVpZ2h0OiAxNjRweDsgd2lkdGg6IDcwMnB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiA3MnB4OyBmb250LXdlaWdodDogYm9sZFwiPjAuMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjZmZmZmZmOyBmb250LXNpemU6IDMycHg7IG1hcmdpbi1sZWZ0OiAxMHB4OyBtYXJnaW4tYm90dG9tOiAxMnB4XCI+5YWDPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7IHdpZHRoOiAxNTBweDsgaGVpZ2h0OiA3MHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjZjdiYmE0IDAlLCAjZmRlY2Q3KTsgYm9yZGVyLXJhZGl1czogMTkycHhcIiBvbmNsaWNrPVwicHVzaFBhZ2VUaXhpYW5cIj5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICNhYTUwMjE7IGZvbnQtc2l6ZTogMzJweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj7mj5DnjrA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbV92aWV3XCI+XHJcbiAgICAgIDwhLS0gPGltYWdlIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMTkycHg7IG1hcmdpbi1ib3R0b206IDI3cHhcIiBzcmM9XCIuL2ltZy9iYW5uZXJfbWUucG5nXCIgLz4gLS0+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB3aWR0aDogNzAycHg7IGhlaWdodDogMzk0cHg7IHBhZGRpbmc6IDI1cHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDE1MnB4OyBoZWlnaHQ6IDQ1cHg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMzBweDsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNlOWZkNjUsICM5NWZmMzcgMTAwJSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogNThweFwiPjwvZGl2PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MnB4OyBmb250LXNpemU6IDMxcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwb3NpdGlvbjogYWJzb2x1dGU7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogM3B4XCI+5oiR55qE5pyN5YqhPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBtYXJnaW4tYm90dG9tOiAzMHB4OyBtYXJnaW4tdG9wOiAzMHB4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi4vaW1nL2ZyYW1lMS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7mt7vliqDmoYzpnaI8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiLi9pbWcvZnJhbWUyLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuS4vuaKpeWPjemmiDwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIuL2ltZy9mcmFtZTMucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5biu5Yqp5Lit5b+DPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi4vaW1nL2ZyYW1lNC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7nlKjmiLfljY/orq48L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi4vaW1nL2ZyYW1lNS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7pmpDnp4HmlL/nrZY8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiLi9pbWcvZnJhbWU2LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuiuvue9rjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIuL2ltZy9mcmFtZTcucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5YWz5LqOPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi4vaW1nL2ZyYW1lOC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7ms6jplIA8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzdHlsZT5cclxuICAuZnJhbWVfIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICAuZnJhbWVfaW1hIHtcclxuICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gIH1cclxuICAuZnJhbWVfdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDI2cHg7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIHdpZHRoOiAxMDVweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC5jb250YWluZXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gIC50b3BfdmlldyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNjEwcHg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4vaW1nL2JnX21lLnBuZ1wiKTsgLyog5pu/5o2i5Li65L2g55qE6IOM5pmv5Zu+54mH6Lev5b6EICovXHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyAvKiDkvb/og4zmma/lm77niYfopobnm5bmlbTkuKrlrrnlmaggKi9cclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjsgLyog5bCG6IOM5pmv5Zu+54mH5bGF5Lit5a+56b2QICovXHJcbiAgfVxyXG5cclxuICAuYm90dG9tX3ZpZXcge1xyXG4gICAgcGFkZGluZy10b3A6IDI3cHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDI3cHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyN3B4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IC05MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcclxuICB9XHJcbjwvc3R5bGU+XHJcblxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgcm91dGVyIGZyb20gJ0BzeXN0ZW0ucm91dGVyJ1xyXG4gIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8g6aG16Z2i55qE5pWw5o2u5qih5Z6L77yMcHJpdmF0ZeauteS4i+eahOWPmOmHj+S7heWFgeiuuOW9k+WJjemhtemdouWGheS7o+eggeabtOaUueWFtuWAvOOAglxyXG4gICAgcHJpdmF0ZToge1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB0b0xvZ2luKCkge1xyXG4gICAgICByb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnUGFnZV9sb2dpbidcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2hQYWdlVGl4aWFuKCkge1xyXG5cclxuICAgICAgcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ1BhZ2VfVGl4aWFuJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuPC9zY3JpcHQ+IiwiPGltcG9ydCBuYW1lPVwicGFnZXJlY29yZFwiIHNyYz1cIi4vUGFnZV9SZWNvcmQvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInBhZ2Vob21lXCIgc3JjPVwiLi9QYWdlX0hvbWUvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInBhZ2V1c2VyXCIgc3JjPVwiLi9QYWdlX1VzZXIvaW5kZXhcIj48L2ltcG9ydD5cblxuPHRlbXBsYXRlPlxuXHQ8IS0tIHRlbXBsYXRl6YeM5Y+q6IO95pyJ5LiA5Liq5qC56IqC54K5IC0tPlxuXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG5cdFx0PHRhYnMgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cblx0XHRcdDx0YWItY29udGVudD5cblx0XHRcdFx0PGJsb2NrIGZvcj1cImRhdGFzLmxpc3RcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaXRlbS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxwYWdlaG9tZSBpZj1cInt7JGl0ZW0udGl0bGU9PSfpppbpobUnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZWhvbWU+XG5cdFx0XHRcdFx0XHQ8cGFnZXJlY29yZCBpZj1cInt7JGl0ZW0udGl0bGU9PSfmraXmlbAnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZXJlY29yZD5cblx0XHRcdFx0XHRcdDxwYWdldXNlciBpZj1cInt7JGl0ZW0udGl0bGU9PSfmiJHnmoQnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZXVzZXI+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvYmxvY2s+XG5cdFx0XHQ8L3RhYi1jb250ZW50PlxuXG5cdFx0XHQ8dGFiLWJhciBjbGFzcz1cInRhYl9iYXJcIj5cblx0XHRcdFx0PGJsb2NrIGZvcj1cImRhdGFzLmxpc3RcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGFiX2l0ZW1cIj5cblx0XHRcdFx0XHRcdDxpbWFnZSBzcmM9XCJ7eyRpdGVtLnNob3c/JGl0ZW0ucGljX2Nob2ljZTokaXRlbS5waWN9fVwiIC8+XG5cdFx0XHRcdFx0XHQ8dGV4dCBzdHlsZT1cImNvbG9yOiB7eyRpdGVtLmNvbG9yfX1cIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvYmxvY2s+XG5cdFx0XHQ8L3RhYi1iYXI+XG5cdFx0PC90YWJzPlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cblx0LmNvbnRhaW5lciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcblx0fVxuXG5cdC50YWJfYmFyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuXHRcdHdpZHRoOiA3NTBweDtcblx0XHRib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuXHRcdGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyMHB4O1xuXHR9XG5cblx0LnRhYl9pdGVtIHtcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0cGFkZGluZy10b3A6IDE0cHg7XG5cdFx0cGFkZGluZy1ib3R0b206IDExcHg7XG5cdFx0d2lkdGg6IDE3MXB4O1xuXHRcdGhlaWdodDogMTA0LjJweDtcblx0fVxuXG5cdC50YWJfaXRlbSBpbWFnZSB7XG5cdFx0d2lkdGg6IDUwcHg7XG5cdFx0aGVpZ2h0OiA1MHB4O1xuXHRcdHJlc2l6ZS1tb2RlOiBjb250YWluO1xuXHRcdG9wYWNpdHk6IDAuNTtcblx0fVxuXG5cdC50YWJfaXRlbSBpbWFnZTphY3RpdmUge1xuXHRcdHdpZHRoOiA1MHB4O1xuXHRcdGhlaWdodDogNTBweDtcblx0XHRyZXNpemUtbW9kZTogY29udGFpbjtcblx0fVxuXG5cdC50YWJfaXRlbSB0ZXh0IHtcblx0XHRmb250LXNpemU6IDIxcHg7XG5cdFx0bWFyZ2luLXRvcDogMTBweDtcblx0fVxuXG5cdC5pdGVtLWNvbnRhaW5lciB7XG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdH1cblxuXHQubWFpbi10ZXh0IHtcblx0XHRmb250LXNpemU6IDEwMHB4O1xuXHRcdGNvbG9yOiAjNWY5ZWEwO1xuXHR9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHQvLyDpobXpnaLnmoTmlbDmja7mqKHlnovvvIxwcml2YXRl5q615LiL55qE5Y+Y6YeP5LuF5YWB6K645b2T5YmN6aG16Z2i5YaF5Luj56CB5pu05pS55YW25YC844CCXG5cdFx0cHJpdmF0ZToge1xuXHRcdFx0ZGF0YXM6IHtcblx0XHRcdFx0Y29sb3Jfbm9ybWFsOiAnI0M4QzhDOCcsXG5cdFx0XHRcdGNvbG9yX2FjdGl2ZTogJyMwMEIyRkYnLFxuXHRcdFx0XHRzaG93OiB0cnVlLFxuXHRcdFx0XHRsaXN0OiBbe1xuXHRcdFx0XHRcdGk6IDAsXG5cdFx0XHRcdFx0Y29sb3I6ICcjRkY3NTAwJyxcblx0XHRcdFx0XHRwaWM6ICcuL2ltZy9iYXJfMS5wbmcnLFxuXHRcdFx0XHRcdHBpY19jaG9pY2U6ICcuL2ltZy9iYXJfMTEucG5nJyxcblx0XHRcdFx0XHRzaG93OiB0cnVlLFxuXHRcdFx0XHRcdHRpdGxlOiAn6aaW6aG1J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aTogMSxcblx0XHRcdFx0XHRjb2xvcjogJyM4Nzg3ODcnLFxuXHRcdFx0XHRcdHBpYzogJy4vaW1nL2Jhcl8yLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy4vaW1nL2Jhcl8yMi5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0XHRcdHRpdGxlOiAn5q2l5pWwJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aTogMixcblx0XHRcdFx0XHRjb2xvcjogJyM4Nzg3ODcnLFxuXHRcdFx0XHRcdHBpYzogJy4vaW1nL2Jhcl8zLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy4vaW1nL2Jhcl8zMy5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0XHRcdHRpdGxlOiAn5oiR55qEJ1xuXHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9LFxuXHRcdG9uSW5pdCgpIHtcblxuXHRcdFx0XG5cdFx0fSxcblxuXHRcblxuXHRcdGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5kYXRhcy5saXN0W2ldO1xuXHRcdFx0XHRlbGVtZW50LnNob3cgPSBmYWxzZTtcblx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3Jfbm9ybWFsO1xuXHRcdFx0XHRpZiAoaSA9PT0gZS5pbmRleCkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2hvdyA9IHRydWU7XG5cdFx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3JfYWN0aXZlO1xuXHRcdFx0XHRcdHRoaXMuJHBhZ2Uuc2V0VGl0bGVCYXIoe1xuXHRcdFx0XHRcdFx0dGV4dDogXCLorqHmraVcIixcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogJyNmMmYyZjInLFxuXHRcdFx0XHRcdFx0dGV4dENvbG9yOiAnIzFhMWExYScsXG5cdFx0XHRcdFx0XHRtZW51OiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxzdGFjayBzdHlsZT1cInt7c3R5bGV9fVwiPlxuICAgIDxjYW52YXMgaWQ9XCJ7e2lkfX1cIiBjbGFzcz1cImNhbnZhc1wiPjwvY2FudmFzPlxuICAgIDxkaXYgY2xhc3M9XCJzbG90XCI+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gIDwvc3RhY2s+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuY29uc3QgdG9BbmdsZSA9IGEgPT4gKGEgLyAxODApICogTWF0aC5QSTtcbmNvbnN0IHBlcmNlbnQgPSBhID0+IHRvQW5nbGUoKGEgLyAxMDApICogMzYwKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiZWdpbkFuZ2xlOiB0b0FuZ2xlKHRoaXMuc0FuZ2xlKSxcbiAgICAgIHN0YXJ0QW5nbGU6IHRvQW5nbGUodGhpcy5zQW5nbGUpLFxuICAgICAgZW5kQW5nbGU6IHBlcmNlbnQodGhpcy5wZXJjZW50KSArIHRvQW5nbGUodGhpcy5zQW5nbGUpLFxuICAgICAgY29sb3I6IHRoaXMuc3Ryb2tlQ29sb3JcbiAgICB9O1xuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgcGVyY2VudDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMCxcbiAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcbiAgICBzdHJva2VXaWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjBcbiAgICB9LFxuICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIiMyZDhjZjBcIlxuICAgIH0sXG4gICAgc3Ryb2tlTGluZWNhcDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJyb3VuZFwiIC8vcm91bmR8c3F1YXJlfGJ1dHRcbiAgICB9LFxuICAgIHRyYWlsV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDIwXG4gICAgfSxcbiAgICB0cmFpbENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIiNlYWVlZjJcIlxuICAgIH0sXG4gICAgc2hvd1RyYWlsOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgc0FuZ2xlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBhbnRpY2xvY2t3aXNlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGlkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcImNhbnZhc0lkXCJcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiBgd2lkdGg6ICR7dGhpcy5zaXplfXB4OyBoZWlnaHQ6ICR7dGhpcy5zaXplfXB4O2A7XG4gICAgfVxuICB9LFxuXG4gIG9uSW5pdCgpIHtcbiAgICB0aGlzLiR3YXRjaChcInN0cm9rZUNvbG9yXCIsIFwid2F0Y2hTdHJva2VDb2xvckNoYW5nZVwiKTtcbiAgICB0aGlzLiR3YXRjaChcInBlcmNlbnRcIiwgXCJ3YXRjaFBlcmNlbnRDaGFuZ2VcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuJGVsZW1lbnQodGhpcy5pZCk7XG4gICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICB0aGlzLmRyYXcoKTtcbiAgICB9LCAwKTtcbiAgfSxcblxuICB3YXRjaFN0cm9rZUNvbG9yQ2hhbmdlKG5ld1ZhbCkge1xuICAgIHRoaXMuY29sb3IgPSBuZXdWYWw7XG4gIH0sXG5cbiAgd2F0Y2hQZXJjZW50Q2hhbmdlKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCA8PSAwKSBuZXdWYWwgPSAwO1xuICAgIGlmIChuZXdWYWwgPj0gMTAwKSBuZXdWYWwgPSAxMDA7XG4gICAgdGhpcy5lbmRBbmdsZSA9IHBlcmNlbnQobmV3VmFsKSArIHRoaXMuYmVnaW5BbmdsZTtcblxuICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuXG4gICAgdGhpcy5kcmF3KCk7XG4gIH0sXG5cbiAgZHJhdygpIHtcbiAgICBjb25zdCB7XG4gICAgICBhbnRpY2xvY2t3aXNlLFxuICAgICAgc3Ryb2tlTGluZWNhcCxcbiAgICAgIHNob3dUcmFpbCxcbiAgICAgIHNpemUsXG4gICAgICBzdHJva2VXaWR0aCxcbiAgICAgIGNvbG9yLFxuICAgICAgdHJhaWxXaWR0aCxcbiAgICAgIHRyYWlsQ29sb3IsXG4gICAgICBjdHhcbiAgICB9ID0gdGhpcztcbiAgICAvL+WchueahOWchuW/g+S9jee9rlxuICAgIGNvbnN0IHBvc2l0aW9uID0gc2l6ZSAvIDI7XG4gICAgY29uc3QgcmFkaXVzID0gcG9zaXRpb24gLSBzdHJva2VXaWR0aCAvIDI7XG4gICAgY29uc3QgcCA9IDIgKiBNYXRoLlBJO1xuICAgIGNvbnN0IGJlZ2luQW5nbGUgPSBhbnRpY2xvY2t3aXNlID8gcCAtIHRoaXMuYmVnaW5BbmdsZSA6IHRoaXMuYmVnaW5BbmdsZTtcbiAgICBjb25zdCBzdGFydEFuZ2xlID0gYW50aWNsb2Nrd2lzZSA/IHAgLSB0aGlzLnN0YXJ0QW5nbGUgOiB0aGlzLnN0YXJ0QW5nbGU7XG4gICAgY29uc3QgZW5kQW5nbGUgPSBhbnRpY2xvY2t3aXNlID8gcCAtIHRoaXMuZW5kQW5nbGUgOiB0aGlzLmVuZEFuZ2xlO1xuICAgIGNvbnN0IHN0ZXAgPSAoZW5kQW5nbGUgLSBzdGFydEFuZ2xlKSAvIDEwMDtcbiAgICBsZXQgdGVtcEVuZEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgICAgLy9cYiDnu5jliLbog4zmma/njq9cbiAgICAgIGlmIChzaG93VHJhaWwpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHBvc2l0aW9uLCBwb3NpdGlvbiwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0cmFpbFdpZHRoO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0cmFpbENvbG9yO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0NpcmNsZSh0ZW1wRW5kQW5nbGUpIHtcbiAgICAgIC8vIOe7mOWItui/m+W6plxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhcbiAgICAgICAgcG9zaXRpb24sXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICByYWRpdXMsXG4gICAgICAgIGJlZ2luQW5nbGUsXG4gICAgICAgIHRlbXBFbmRBbmdsZSxcbiAgICAgICAgYW50aWNsb2Nrd2lzZVxuICAgICAgKTtcbiAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgY3R4LmxpbmVDYXAgPSBzdHJva2VMaW5lY2FwO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIChmdW5jdGlvbiBzdGFydERyYXcoY3R4KSB7XG4gICAgICB0ZW1wRW5kQW5nbGUgKz0gc3RlcDtcbiAgICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPD0gYmVnaW5BbmdsZSkge1xuICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlO1xuICAgICAgfVxuICAgICAgaWYgKCFhbnRpY2xvY2t3aXNlICYmIHRlbXBFbmRBbmdsZSA+PSAyICogTWF0aC5QSSArIGJlZ2luQW5nbGUpIHtcbiAgICAgICAgdGVtcEVuZEFuZ2xlID0gMiAqIE1hdGguUEkgKyBiZWdpbkFuZ2xlO1xuICAgICAgfVxuICAgICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGVtcEVuZEFuZ2xlIDw9IGJlZ2luQW5nbGUgLSAyICogTWF0aC5QSSkge1xuICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlIC0gMiAqIE1hdGguUEk7XG4gICAgICB9XG4gICAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPj0gYmVnaW5BbmdsZSkge1xuICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlO1xuICAgICAgfVxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAweDdmZmZmZmZmLCAweDdmZmZmZmZmKTtcbiAgICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgICBkcmF3Q2lyY2xlKHRlbXBFbmRBbmdsZSk7XG4gICAgICBfdGhpcy5zdGFydEFuZ2xlID0gYW50aWNsb2Nrd2lzZVxuICAgICAgICA/IDIgKiBNYXRoLlBJIC0gdGVtcEVuZEFuZ2xlXG4gICAgICAgIDogdGVtcEVuZEFuZ2xlO1xuICAgICAgaWYgKGNvdW50ID49IDEwMCkgcmV0dXJuO1xuICAgICAgY291bnQrKztcbiAgICAgIF90aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0YXJ0RHJhdyhjdHgpO1xuICAgICAgfSwgMTApO1xuICAgIH0pKGN0eCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOa4hemZpOWumuaXtuWZqFxuICAgKi9cbiAgY2xlYXJUaW1lcigpIHtcbiAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgfVxuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi5zbG90IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uY2FudmFzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhcGV4LWRpYWxvZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXNrIHt7c2hvd01vZGFsPydtYXNrLWV4aXN0JzonbWFzay1ub25lJ319XCIgaWY9XCJ7e3Zpc2libGV9fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiIHN0eWxlPVwie3tzZXREaWFsb2d9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvcFwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZSB7e2RlZmF1bHRPcHRpb25zLmNsb3NhYmxlPyd0aXRsZS1jbG9zZSc6J3RpdGxlLW5vbmUnfX1cIj57eyBkZWZhdWx0UHJvbXB0LnRpdGxlIHx8IGRlZmF1bHRPcHRpb25zLnRpdGxlIHx8IHRpdGxlIH19PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHRhYnMgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIiBjbGFzcz1cInRhYnNcIiAgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cbiAgICAgICAgICAgIDx0YWItYmFyIGNsYXNzPVwidGFiLWJhclwiPlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5aWzPC90ZXh0PlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+55S3PC90ZXh0PlxuICAgICAgICAgICAgPC90YWItYmFyPlxuICAgICAgICAgIDwvdGFicz5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXJcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJmb2N1c1wiIHR5cGU9XCJ7eyBkZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSB9fVwiIHN0eWxlPVwie3tkZWZhdWx0UHJvbXB0LmlucHV0U3R5bGV9fVwiIHZhbHVlPVwie3sgdmFsdWUgfX1cIiBwbGFjZWhvbGRlcj1cInt7IGRlZmF1bHRQcm9tcHQucGxhY2Vob2xkZXIgfX1cIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VcIiBtYXhsZW5ndGg9XCJ7eyBkZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCA9PT0gLTE/Jyc6ZGVmYXVsdFByb21wdC5tYXhsZW5ndGggfX1cIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJcIiAvPlxuICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTsgZm9udC1zaXplOiAyOHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB3aWR0aDogODhweDsgaGVpZ2h0OiA4OHB4XCI+5q2lPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweFwiIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdDEnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJpZGtnXCIgdHlwZT1cInt7IGRlZmF1bHRQcm9tcHQuZmllbGR0eXBlIH19XCIgc3R5bGU9XCJ7e2RlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZX19XCIgdmFsdWU9XCJ7eyBrZyB9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5L2T6YeNXCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdla2dcIiBtYXhsZW5ndGg9XCJ7eyBkZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCA9PT0gLTE/Jyc6ZGVmYXVsdFByb21wdC5tYXhsZW5ndGggfX1cIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJrZ1wiIC8+XG4gICAgICAgICAgICA8dGV4dCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5OyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDg4cHhcIj5rZzwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24tY29udGVudDogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAyMHB4XCIgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0MScgfX1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImlkY21cIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IGNtIH19XCIgcGxhY2Vob2xkZXI9XCLovpPlhaXouqvpq5hcIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VjbVwiIG1heGxlbmd0aD1cInt7IGRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoID09PSAtMT8nJzpkZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCB9fVwiIG9uZW50ZXJrZXljbGljaz1cImJpbmRFbnRlcmNtXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPmNtPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDEwcHhcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQxJyB9fVwiPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiaWRhZ2VcIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IGFnZSB9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5bm06b6EXCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdlYWdlXCIgbWF4bGVuZ3RoPVwie3sgZGVmYXVsdFByb21wdC5tYXhsZW5ndGggPT09IC0xPycnOmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoIH19XCIgb25lbnRlcmtleWNsaWNrPVwiYmluZEVudGVyYWdlXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPuWygTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4ge3tkaWFsb2dUeXBlID09PSAnYWx0ZXInfHx0aGlzLnZlcnRpY2FsPT09dHJ1ZT8nYnRuLXZlcnRpY2FsJzonYnRuLWhvcml6b250YWwnfX1cIj5cbiAgICAgICAgICA8YmxvY2sgaWY9XCJ7e2RlZmF1bHRPcHRpb25zLmJ1dHRvbnMubGVuZ3RoPT09MH19XCI+XG4gICAgICAgICAgICA8ZGl2IGlmPVwie3tkaWFsb2dUeXBlIT09J2FsdGVyJ319XCIgY2xhc3M9XCJidG5ib3gxXCIgb25jbGljaz1cImJpbmRDYW5jZWxcIj5cbiAgICAgICAgICAgICAgPHRleHQ+e3sgZGVmYXVsdE9wdGlvbnMuY2FuY2VsIH19PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG9uY2xpY2s9XCJiaW5kQWZmaXJtXCIgY2xhc3M9XCJidG5ib3hcIj5cbiAgICAgICAgICAgICAgPHRleHQ+e3sgZGVmYXVsdE9wdGlvbnMuYWZmaXJtIH19PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9ibG9jaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YToge1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICAgIHNldERpYWxvZzoge30sXG4gICAgICB2YWx1ZTogXCJcIixcbiAgICAgIGtnOiBcIlwiLFxuICAgICAgY206IFwiXCIsXG4gICAgICBhZ2U6IFwiXCIsXG4gICAgICBzZXg6IDAsLy/mgKfliKsgIDEg55S377yMMCDlpbNcbiAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgIGNsb3NhYmxlOiBmYWxzZSxcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIGJ1dHRvbnM6IFtdLFxuICAgICAgICBjYW5jZWw6IFwi5Y+W5raIXCIsXG4gICAgICAgIGFmZmlybTogXCLnoa7lrppcIlxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRQcm9tcHQ6IHtcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICBrZzogXCJcIixcbiAgICAgICAgY206IFwiXCIsXG4gICAgICAgIGFnZTogXCJcIixcbiAgICAgICAgZmllbGR0eXBlOiBcInRleHRcIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwi6K+36L6T5YWl5paH5pysXCIsXG4gICAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgICAgaWRrZzogZmFsc2UsXG4gICAgICAgIGlucHV0U3R5bGU6IHt9LFxuICAgICAgICBtYXhsZW5ndGg6IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wczoge1xuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwi6buY6K6k5qCH6aKYXCJcbiAgICAgIH0sXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCLpu5jorqTlhoXlrrlcIlxuICAgICAgfSxcbiAgICAgIGRpYWxvZ1N0eWxlOiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH0sXG4gICAgICBkaWFsb2dUeXBlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCJ0ZXh0XCJcbiAgICAgIH0sXG4gICAgICB2aXNpYmxlOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICB9LFxuICAgICAgcHJvbXB0OiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH1cbiAgICB9LFxuICAgIG9uSW5pdCgpIHtcbiAgICAgIHRoaXMuJHdhdGNoKFwidmlzaWJsZVwiLCBcIm1vZGFsSGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwiZGlhbG9nU3R5bGVcIiwgXCJkaWFsb2dTdHlsZUhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRlZmF1bHRQcm9tcHQudmFsdWVcIiwgXCJ2YWx1ZUhhbmRsZXJcIik7XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgIH0sXG4gICAgb25SZWFkeSgpIHtcbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIgJiYgdGhpcy4kdmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudChcImZvY3VzXCIpLmZvY3VzKHsgZm9jdXM6IHRoaXMuZGVmYXVsdFByb21wdC5mb2N1cyB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHQxXCIgJiYgdGhpcy4kdmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudChcImlka2dcIikuZm9jdXMoeyBpZGtnOiB0aGlzLmRlZmF1bHRQcm9tcHQuaWRrZyB9KTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgdmFsdWVIYW5kbGVyKG5ld1YsIG9sZFYpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IG5ld1Y7XG4gICAgfSxcbiAgICBvcHRpb25zSGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICBuZXdWLmNsb3NhYmxlID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2xvc2FibGUgPSBuZXdWLmNsb3NhYmxlKSA6IGZhbHNlO1xuICAgICAgbmV3Vi50aXRsZSA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLnRpdGxlID0gbmV3Vi50aXRsZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5jb250ZW50ID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY29udGVudCA9IG5ld1YuY29udGVudCkgOiBcIlwiO1xuICAgICAgbmV3Vi5idXR0b25zID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYnV0dG9ucyA9IG5ld1YuYnV0dG9ucykgOiBbXTtcbiAgICAgIG5ld1YuY2FuY2VsID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2FuY2VsID0gbmV3Vi5jYW5jZWwpIDogXCJcIjtcbiAgICAgIG5ld1YuYWZmaXJtID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYWZmaXJtID0gbmV3Vi5hZmZpcm0pIDogXCJcIjtcbiAgICB9LFxuICAgIHByb21wdEhhbmRsZXIobmV3Viwgb2xkVikge1xuICAgICAgbmV3Vi50aXRsZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQudGl0bGUgPSBuZXdWLnRpdGxlKSA6IFwiXCI7XG4gICAgICBuZXdWLmNvbnRlbnQgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmNvbnRlbnQgPSBuZXdWLmNvbnRlbnQpIDogXCJcIjtcbiAgICAgIG5ld1YudmFsdWUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LnZhbHVlID0gbmV3Vi52YWx1ZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5rZyA/ICh0aGlzLmRlZmF1bHRQcm9tcHQua2cgPSBuZXdWLmtnKSA6IFwiXCI7XG4gICAgICBuZXdWLmNtID8gKHRoaXMuZGVmYXVsdFByb21wdC5jbSA9IG5ld1YuY20pIDogXCJcIjtcbiAgICAgIG5ld1YuYWdlID8gKHRoaXMuZGVmYXVsdFByb21wdC5hZ2UgPSBuZXdWLmFnZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5maWVsZHR5cGUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSA9IG5ld1YuZmllbGR0eXBlKSA6IFwiXCI7XG4gICAgICBuZXdWLnBsYWNlaG9sZGVyID8gKHRoaXMuZGVmYXVsdFByb21wdC5wbGFjZWhvbGRlciA9IG5ld1YucGxhY2Vob2xkZXIpIDogXCJcIjtcbiAgICAgIG5ld1YuZm9jdXMgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmZvY3VzID0gbmV3Vi5mb2N1cykgOiBmYWxzZTtcbiAgICAgIG5ld1YuaW5wdXRTdHlsZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSA9IG5ld1YuaW5wdXRTdHlsZSkgOiB7fTtcbiAgICB9LFxuICAgIGRpYWxvZ1N0eWxlSGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdWLCBvbGRWKTtcbiAgICAgIHRoaXMuc2V0RGlhbG9nID0gbmV3VjtcbiAgICB9LFxuICAgIHJlc2V0RGF0YSgpIHtcbiAgICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgICAgYnV0dG9uczogW10sXG4gICAgICAgICAgY2FuY2VsOiBcIuWPlua2iFwiLFxuICAgICAgICAgIGFmZmlybTogXCLnoa7lrppcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRQcm9tcHQgPSB7XG4gICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICBmaWVsZHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuivt+i+k+WFpeaWh+acrFwiLFxuICAgICAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgICAgICBpbnB1dFN0eWxlOiB7fVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldERpYWxvZyA9IHtcblxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpcy4kd2F0Y2goXCJvcHRpb25zXCIsIFwib3B0aW9uc0hhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcInByb21wdFwiLCBcInByb21wdEhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRpYWxvZ1N0eWxlXCIsIFwiZGlhbG9nU3R5bGVIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJkZWZhdWx0UHJvbXB0LnZhbHVlXCIsIFwidmFsdWVIYW5kbGVyXCIpO1xuICAgIH0sXG4gICAgbW9kYWxIYW5kbGVyKG5ld1YsIG9sZFYpIHtcbiAgICAgIHRoaXMuc2hvd01vZGFsID0gbmV3VjtcbiAgICB9LFxuICAgIGJpbmRDYW5jZWwoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2FuY2VsXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgdGhpcy5rZyA9IFwiXCI7XG4gICAgICB0aGlzLmNtID0gXCJcIjtcbiAgICAgIHRoaXMuYWdlID0gXCJcIjtcblxuICAgIH0sXG4gICAgYmluZENoYW5nZShldnQpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuatpeaVsD0ke3RoaXMudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2VrZyhldnQpIHtcblxuICAgICAgdGhpcy5rZyA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuS9k+mHjT0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG4gICAgYmluZENoYW5nZWNtKGV2dCkge1xuXG4gICAgICB0aGlzLmNtID0gZXZ0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+6Lqr6auYPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlYWdlKGV2dCkge1xuXG4gICAgICB0aGlzLmFnZSA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuW5tOm+hD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG5cblxuICAgIGJpbmRBZmZpcm0oZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgICAgZXZ0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy4kZW1pdChcImFmZmlybVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuXG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0MVwiKSB7XG4gICAgICAgIGV2dC5rZyA9IHRoaXMua2c7XG4gICAgICAgIGV2dC5jbSA9IHRoaXMuY207XG4gICAgICAgIGV2dC5hZ2UgPSB0aGlzLmFnZTtcbiAgICAgICAgZXZ0LnNleCA9IHRoaXMuc2V4O1xuICAgICAgICB0aGlzLiRlbWl0KFwiYWZmaXJtXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYGJpbmRBZmZpcm3vvJoke2V2dC5rZ30s6Lqr6auY77yaJHtldnQuY219LOW5tOm+hO+8miR7ZXZ0LmFnZX0sc2V4OiR7ZXZ0LnNleH1gKTtcbiAgICAgICAgdGhpcy5rZyA9IFwiXCI7XG4gICAgICAgIHRoaXMuY20gPSBcIlwiO1xuICAgICAgICB0aGlzLmFnZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2V4ID0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRFbnRlcihldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuatpeaVsD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJlbnRlclwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQoXCJmb2N1c1wiKS5mb2N1cyh7IGZvY3VzOiBmYWxzZSB9KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kRW50ZXJrZyhldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuS9k+mHjT0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMua2cgPSBldnQudmFsdWU7XG5cbiAgICB9LFxuICAgIGJpbmRFbnRlcmNtKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+6Lqr6auYPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jbSA9IGV2dC52YWx1ZTtcbiAgICB9LFxuICAgIGJpbmRFbnRlcmFnZShldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPuW5tOm+hD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuYWdlID0gZXZ0LnZhbHVlO1xuICAgIH0sXG5cblxuICAgIC8v5YiH5o2i55S35aWzXG4gICAgY2hhbmdlVGFiYWN0aXZlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc29sZS5sb2coZS5pbmRleClcbiAgICAgIHRoaXMuc2V4ID0gZS5pbmRleDtcbiAgICB9LFxuICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuICAubWFzayB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGZsZXg6IDE7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAmLWV4aXN0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNSwgNSwgNSwgMC42KTtcbiAgICB9XG4gICAgJi1ub25lIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIH1cbiAgICAuZGlhbG9nIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgYm9yZGVyLXJhZGl1czogMzJweDtcbiAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICB3aWR0aDogODQlO1xuICAgICAgJi1ib3JkZXIge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTdlN2U3O1xuICAgICAgfVxuICAgICAgLmJveCB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIC50b3Age1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgICYtY2xvc2Uge1xuICAgICAgICAgICAgICB3aWR0aDogOTUlO1xuICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMjVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYtbm9uZSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAuY2xvc2Uge1xuICAgICAgICAgICAgd2lkdGg6IDUlO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XG4gICAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgY29sb3I6ICNhMGEwYTA7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0IHtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTtcbiAgICAgICAgICB3aWR0aDogODUlO1xuICAgICAgICAgIGhlaWdodDogODhweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogNjBweDtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTZweDtcbiAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxNnB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRhYnMge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC50YWItYmFyIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNiYmJiYmI7XG4gICAgICAgICAgY29sb3I6ICNiYmJiYmI7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1NHB4O1xuICAgICAgICB9XG4gICAgICAgIC50YWItdGV4dCB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMGIyZmY7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgfVxuICAgICAgICAudGFiLXRleHQ6YWN0aXZlIHtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAuYnRuIHtcbiAgICAgICAgbWFyZ2luLXRvcDogNTBweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAuYnRuYm94IHtcbiAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgIHdpZHRoOiAyNzBweDtcbiAgICAgICAgICAgIGhlaWdodDogODhweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5idG5ib3gxIHtcbiAgICAgICAgICB0ZXh0IHtcbiAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7XG4gICAgICAgICAgICB3aWR0aDogMjcwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5idG5ib3g6YWN0aXZlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdlN2U3O1xuICAgICAgICB9XG4gICAgICAgICYtdmVydGljYWwge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgLmJ0bmJveCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJi1ob3Jpem9udGFsIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIC5idG5ib3gge1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc3R5bGU+XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi50b3Bfdmlld1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjgyOHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbWcvZ3JvdXAucG5nXCIsXG4gICAgXCJiYWNrZ3JvdW5kU2l6ZVwiOiBcImNvdmVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kUG9zaXRpb25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5ib3R0b21fdmlld1wiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyN3B4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyN3B4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjc1MHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItMTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmljb24taW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI0NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIuY2lyY2xlXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI1cHhcIlxuICB9LFxuICBcIi50ZXh0LWNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIudGl0bGVfc3RwZXNcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIudGl0bGVfc3RwZXNfdlwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjgwcHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi5kZXRhaWxzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjE3NXB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGV0YWlsLWl0ZW1cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5kZXRhaWwtdmFsdWVcIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIubGFyZ2VyLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0OHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubGFyZ2VyMi10ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCI0OHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gIH0sXG4gIFwiLmxhcmdlcjMtdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiM0YjRiNGJcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiXG4gIH0sXG4gIFwiLnNtYWxsZXItdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubi10ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIlxuICB9LFxuICBcIi50YWJzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTIwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI1NXB4XCJcbiAgfSxcbiAgXCIudGFiLWJhclwiOiB7XG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNTRweFwiXG4gIH0sXG4gIFwiLnRhYi10ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI2NXB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI3NHB4XCIsXG4gICAgXCJjb2xvcjphY3RpdmVcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJiYWNrZ3JvdW5kOmFjdGl2ZVwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjI3MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiIzhmZmYzNCAwJVxcXCIsXFxcIiNlYmZkNjZcXFwiXX1dfVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmxpc3RcIjoge1xuICAgIFwibGF5b3V0VHlwZVwiOiBcInN0YWdnZXJcIlxuICB9LFxuICBcIi5pdGVtXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5mcmFtZV9cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmZyYW1lX2ltYVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjcwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjhweFwiXG4gIH0sXG4gIFwiLmZyYW1lX3RleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcIndpZHRoXCI6IFwiMTA1cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIudG9wX3ZpZXdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI2MTBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvaW1nL2JnX21lLnBuZ1wiLFxuICAgIFwiYmFja2dyb3VuZFNpemVcIjogXCJjb3ZlclwiLFxuICAgIFwiYmFja2dyb3VuZFBvc2l0aW9uXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYm90dG9tX3ZpZXdcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI3cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjdweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjdweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItOTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCJcbiAgfSxcbiAgXCIudGFiX2JhclwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjc1MHB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIudGFiX2l0ZW1cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjE0cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMXB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE3MXB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDQuMnB4XCJcbiAgfSxcbiAgXCIudGFiX2l0ZW0gaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJyZXNpemVNb2RlXCI6IFwiY29udGFpblwiLFxuICAgIFwib3BhY2l0eVwiOiAwLjUsXG4gICAgXCJ3aWR0aDphY3RpdmVcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHQ6YWN0aXZlXCI6IFwiNTBweFwiLFxuICAgIFwicmVzaXplTW9kZTphY3RpdmVcIjogXCJjb250YWluXCJcbiAgfSxcbiAgXCIudGFiX2l0ZW0gdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjIxcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5pdGVtLWNvbnRhaW5lclwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1haW4tdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjEwMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM1ZjllYTBcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5zbG90XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5jYW52YXNcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIubWFza1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubWFzay1leGlzdFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDUsNSw1LDAuNilcIlxuICB9LFxuICBcIi5tYXNrLW5vbmVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwKVwiLFxuICAgIFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZ1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjRweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjRweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI0cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjRweFwiLFxuICAgIFwid2lkdGhcIjogXCI4NCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2ctYm9yZGVyXCI6IHtcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlN2U3ZTdcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC50aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1MHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlLWNsb3NlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiOTUlXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjVweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlLW5vbmVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAuY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1JVwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiLTIwcHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC5jbG9zZSB0ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAuY29udGVudFwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNhMGEwYTBcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IGlucHV0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwid2lkdGhcIjogXCI4NSVcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMTZweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50YWJzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50YWItYmFyXCI6IHtcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiY29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI1NHB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRhYi10ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcIndpZHRoXCI6IFwiMjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImNvbG9yOmFjdGl2ZVwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjMDBiMmZmXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG5cIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNTBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveCB0ZXh0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94MSB0ZXh0XCI6IHtcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcIndpZHRoXCI6IFwiMjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiM2NjY2NjZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94XCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjZTdlN2U3XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4tdmVydGljYWxcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuLXZlcnRpY2FsIC5idG5ib3hcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4taG9yaXpvbnRhbFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4taG9yaXpvbnRhbCAuYnRuYm94XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGFic1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWItY29udGVudFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRhdGFzLmxpc3QpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFnZWhvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlPT0n6aaW6aG1Jz90cnVlOmZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhZ2VyZWNvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlPT0n5q2l5pWwJz90cnVlOmZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhZ2V1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZT09J+aIkeeahCc/dHJ1ZTpmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGFiX2JhclwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRhdGFzLmxpc3QpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiX2l0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zaG93P3RoaXMuJGl0ZW0ucGljX2Nob2ljZTp0aGlzLiRpdGVtLnBpYyl9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdjb2xvcjogJysoKHRoaXMuJGl0ZW0uY29sb3IpKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUpfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiY2FudmFzXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaWQpfVxuICAgICAgfSxcbiAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pZCl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNhbnZhc1wiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJzbG90XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgICAgICBcImF0dHJcIjoge31cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYXBleC1kaWFsb2dcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWydtYXNrJywgKHRoaXMuc2hvd01vZGFsPydtYXNrLWV4aXN0JzonbWFzay1ub25lJyldfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy52aXNpYmxlKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImRpYWxvZ1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2V0RGlhbG9nKX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImJveFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LnRpdGxlfHx0aGlzLmRlZmF1bHRPcHRpb25zLnRpdGxlfHx0aGlzLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWyd0aXRsZScsICh0aGlzLmRlZmF1bHRPcHRpb25zLmNsb3NhYmxlPyd0aXRsZS1jbG9zZSc6J3RpdGxlLW5vbmUnKV19XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdDEnKX0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFic1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGFiLWJhclwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlpbNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi55S3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0Jyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZm9jdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmFsdWUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LnBsYWNlaG9sZGVyKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoPT09LTE/Jyc6dGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZm9jdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuatpVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRrZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5rZyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpeS9k+mHjVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aD09PS0xPycnOnRoaXMuZGVmYXVsdFByb21wdC5tYXhsZW5ndGgpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlka2dcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdla2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlcmtnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJrZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRjbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpei6q+mrmFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aD09PS0xPycnOnRoaXMuZGVmYXVsdFByb21wdC5tYXhsZW5ndGgpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlkY21cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlY21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlcmNtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJjbVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWdlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6L6T5YWl5bm06b6EXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoPT09LTE/Jyc6dGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWygVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ2J0bicsICh0aGlzLmRpYWxvZ1R5cGU9PT0nYWx0ZXInfHx0aGlzLnZlcnRpY2FsPT09dHJ1ZT8nYnRuLXZlcnRpY2FsJzonYnRuLWhvcml6b250YWwnKV19LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRPcHRpb25zLmJ1dHRvbnMubGVuZ3RoPT09MCl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGUhPT0nYWx0ZXInKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5ib3gxXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJiaW5kQ2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRPcHRpb25zLmNhbmNlbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJpbmRBZmZpcm1cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5ib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYWZmaXJtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidG9wX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGFic1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRhYnNcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VUYWJhY3RpdmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1iYXJcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0YWItYmFyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7iuaXpVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkahcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pyIXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcIm15LWNpcmNsZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNpemVcIjogXCIzNTBcIixcbiAgICAgICAgICAgIFwicGVyY2VudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnByb2dyZXNzKX0sXG4gICAgICAgICAgICBcInN0cm9rZUNvbG9yXCI6IFwiIzAwQjJGRlwiLFxuICAgICAgICAgICAgXCJzQW5nbGVcIjogXCIxNTBcIixcbiAgICAgICAgICAgIFwic2hvd1RyYWlsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKGZhbHNlKX0sXG4gICAgICAgICAgICBcInRyYWlsQ29sb3JcIjogXCIjZmZmXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2lyY2xlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2ltZy9pY29uX3Bhb2J1LnBuZ1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImljb24taW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNlZ21lbnRzVGV4dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRpdGxlX3N0cGVzXCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdGVwc192aWV3KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVfc3RwZXNfdlwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZGV0YWlsc1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubWlsZWFnZSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIktNXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLph4znqItcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJuLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2Fsb3JpZXMpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWUyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJrY2FsXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmtojogJfng63ph49cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJuLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5TZXRTdGVwc0RpYWxvZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZ29hbF9kYXkpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcInVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuatpT5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbGVyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7iuaXpeebruagh1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIm4tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJib3R0b21fdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIyNTJweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjIzOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU4cHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIkJNSS/kvZPohILnjoforqHnrpdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMxcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiM3B4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5aGr5YaZ6K6h566XPlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZ1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxNDBweFwiLFxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbWcvbWluZ3JvdXAyLnBuZ1wiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIxNXB4XCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCItMzBweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2ltZy9pY29uX2JtaS5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiOTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjkwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTZweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJCTUlcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIzLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJtaSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlcjItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbWcvaWNvbl90emwucG5nXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjkwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI5MHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjE2cHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5L2T6ISC546HXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyMy10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMudHpsKSkrJyUnfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL1BhZ2VfTWFpblRhYi9QYWdlX0hvbWUvaW1nL3N0YW5kYXJkLnBuZ1wiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzY4cHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMTRweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1kaWFsb2dcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmlzaWJsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9wZW4xKX0sXG4gICAgICAgIFwiZGlhbG9nVHlwZVwiOiBcInByb21wdFwiLFxuICAgICAgICBcInByb21wdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9iail9XG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImFmZmlybVwiOiBcImVudGVyU3RlcHNcIixcbiAgICAgICAgXCJjYW5jZWxcIjogXCJjbG9zZVwiLFxuICAgICAgICBcImVudGVyXCI6IFwiZW50ZXJTdGVwc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1kaWFsb2dcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmlzaWJsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9wZW4yKX0sXG4gICAgICAgIFwiZGlhbG9nVHlwZVwiOiBcInByb21wdDFcIixcbiAgICAgICAgXCJwcm9tcHRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vYmopfVxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJhZmZpcm1cIjogXCJlbnRlckRldGFpbHNcIixcbiAgICAgICAgXCJjYW5jZWxcIjogXCJjbG9zZVwiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI3cHhcIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjU5MnB4XCIsXG4gICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyNXB4XCIsXG4gICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMTUwcHhcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNzBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MnB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNThweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5q2l5pWw6K6w5b2VXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWNleS9je+8muatpVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjIwMjRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIyMDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjQwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiNjAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCI4MDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjEwMDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImxpc3RcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RJdGVtXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxpc3QzMGRheURhdGEpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zdW1tYXJ5RGF0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjRweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInByb2dyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBlcmNlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5wZXJjZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwYjJmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIzMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7heaYvuekuuacgOi/kTMw5aSp5q2l5pWwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMTZweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2VmZWZlZlwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMjgwcHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0b3Bfdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjgwJVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwidG9Mb2dpblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTEzcHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjExM3B4XCIsXG4gICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjYmVjOWJlXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiNjBweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6K+354K55Ye755m75b2VXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibG9nXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ0lEOiAnKygodGhpcy51c2VyX2lkKSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInVzZXJfaWRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzY5Njk2OVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCItMTMwcHhcIixcbiAgICAgICAgICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjUwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiNTBweFwiLFxuICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9QYWdlX01haW5UYWIvUGFnZV9Vc2VyL2ltZy9ncm91cC5wbmdcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTY0cHhcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCI3MDJweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMC4wMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCI3MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMnB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTUwcHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjcwcHhcIixcbiAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCIyNzBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNmN2JiYTQgMCVcXFwiLFxcXCIjZmRlY2Q3XFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE5MnB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZVRpeGlhblwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmj5DnjrBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2FhNTAyMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImJvdHRvbV92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzk0cHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjI1cHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjVweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjVweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI1cHhcIixcbiAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MnB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNThweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5oiR55qE5pyN5YqhXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjMwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWUxLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5re75Yqg5qGM6Z2iXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWUyLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Li+5oql5Y+N6aaIXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWUzLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5biu5Yqp5Lit5b+DXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWU0LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi55So5oi35Y2P6K6uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWU1LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6ZqQ56eB5pS/562WXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWU2LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6K6+572uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWU3LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWz5LqOXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbWcvZnJhbWU4LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5rOo6ZSAXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi91aS9jaXJjbGUvaW5kZXgudXg/bmFtZT1teS1jaXJjbGVcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vdWkvZGlhbG9nL2luZGV4LnV4P25hbWU9bXktZGlhbG9nXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZWhvbWUmZGVwZW5kc1tdPW15LWNpcmNsZSZkZXBlbmRzW109bXktZGlhbG9nIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfSG9tZVxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfSG9tZVxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wYWdlaG9tZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZXJlY29yZCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX1JlY29yZFxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfUmVjb3JkXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3BhZ2VyZWNvcmQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXBhZ2V1c2VyIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfVXNlclxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfVXNlclxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wYWdldXNlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bXktY2lyY2xlIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGNpcmNsZVxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGNpcmNsZVxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9teS1jaXJjbGUnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW15LWRpYWxvZyEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxkaWFsb2dcXFxcaW5kZXgudXghLi4vLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcdWlcXFxcZGlhbG9nXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L215LWRpYWxvZycsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL1BhZ2VfUmVjb3JkL2luZGV4LnV4P25hbWU9cGFnZXJlY29yZFwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL1BhZ2VfSG9tZS9pbmRleC51eD9uYW1lPXBhZ2Vob21lXCIpXG5yZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vUGFnZV9Vc2VyL2luZGV4LnV4P25hbWU9cGFnZXVzZXJcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPXBhZ2Vob21lJmRlcGVuZHNbXT1wYWdlcmVjb3JkJmRlcGVuZHNbXT1wYWdldXNlciEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2luZGV4JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4xLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
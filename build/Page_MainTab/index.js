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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

/**
 * 转化点击次数
 *
 */
const clickCount = data => {
  return (0, _ajax.default)({
    method: "GET",
    url: `/qa/mini/basic/ad/convert/clickCount/${data.type}`,
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
  convertUpload,
  bolckReturn,
  showTclayer,
  popUps,
  clickCount
};

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.sensor"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.storage"));
var _example = _interopRequireDefault(__webpack_require__(/*! ../../Common/helper/apis/example.js */ "./src/Common/helper/apis/example.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _example = _interopRequireDefault(__webpack_require__(/*! ../../Common/helper/apis/example.js */ "./src/Common/helper/apis/example.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      uri: 'Page_cfd/'
    });
  },
  addDesktop: function () {
    console.log('添加桌面');
    const shortcut = $app_require$("@app-module/system.shortcut");
    shortcut.hasInstalled({
      success: function (ret) {
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    $umeng_stat.pause(this);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./src/Page_MainTab/Page_Home/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./src/Page_MainTab/Page_Home/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./src/Page_MainTab/Page_Record/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!./src/Page_MainTab/Page_Record/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./src/Page_MainTab/Page_User/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!./src/Page_MainTab/Page_User/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./src/Page_MainTab/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!./src/Page_MainTab/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./src/Page_MainTab/ui/circle/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!./src/Page_MainTab/ui/circle/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./src/Page_MainTab/ui/dialog/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!./src/Page_MainTab/ui/dialog/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./src/Page_MainTab/ui/privacypop/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/circle/index.ux?name=my-circle */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/dialog/index.ux?name=my-dialog */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ui/privacypop/index.ux?name=privacy-pop */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop")
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagehome&depends[]=my-circle&depends[]=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Home/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Home\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Home\\index.ux!./src/Page_MainTab/Page_Home/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Home/index.ux")

$app_define$('@app-component/pagehome', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pagerecord!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_Record/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_Record\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_Record\\index.ux!./src/Page_MainTab/Page_Record/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_Record/index.ux")

$app_define$('@app-component/pagerecord', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/Page_User/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\Page_User\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\Page_User\\index.ux!./src/Page_MainTab/Page_User/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/Page_User/index.ux")

$app_define$('@app-component/pageuser', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/circle/index.ux?name=my-circle ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/circle/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\circle\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\circle\\index.ux!./src/Page_MainTab/ui/circle/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/circle/index.ux")

$app_define$('@app-component/my-circle', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/dialog/index.ux?name=my-dialog ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-dialog!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/dialog/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!../../../../node_modules/less-loader!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\dialog\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\dialog\\index.ux!./src/Page_MainTab/ui/dialog/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/dialog/index.ux")

$app_define$('@app-component/my-dialog', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/ui/privacypop/index.ux?name=privacy-pop ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=privacy-pop!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/ui/privacypop/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!../../../../node_modules/less-loader!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\ui\privacypop\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\ui\\privacypop\\index.ux!./src/Page_MainTab/ui/privacypop/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/ui/privacypop/index.ux")

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
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_Record/index.ux?name=pagerecord */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Record/index.ux?name=pagerecord")
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_Home/index.ux?name=pagehome */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_Home/index.ux?name=pagehome")
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./Page_User/index.ux?name=pageuser */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/Page_MainTab/Page_User/index.ux?name=pageuser")
var $app_template$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=pagehome&depends[]=pagerecord&depends[]=pageuser!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_MainTab/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_MainTab\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_MainTab\\index.ux!./src/Page_MainTab/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_MainTab/index.ux")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/index',{ packagerName:'fa-toolkit', packagerVersion: '14.0.1-Stable.300'})
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfTWFpblRhYlxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2lFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFHQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFHQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoaEJBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pKQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcGZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0NvbW1vbi9oZWxwZXIvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcUGFnZV9Ib21lXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1JlY29yZC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXFBhZ2VfUmVjb3JkXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxQYWdlX1VzZXJcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcdWlcXGNpcmNsZVxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvZGlhbG9nL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcdWlcXGRpYWxvZ1xcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvdWkvcHJpdmFjeXBvcC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXHVpXFxwcml2YWN5cG9wXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD9hZGE3Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/ODgxMyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD9iNzVmIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvaW5kZXgudXg/NDNkMSIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2NpcmNsZS9pbmRleC51eD85YWNmIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvZGlhbG9nL2luZGV4LnV4PzIxM2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2luZGV4LnV4PzM3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9pbmRleC51eD80MTU3Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2luZGV4LnV4P2JhYzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXg/MDAxNyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfSG9tZS9pbmRleC51eD82YWQ0Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXg/NGI3OCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eD9hMWRmIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvcHJpdmFjeXBvcC9pbmRleC51eD84ZTUwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9SZWNvcmQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1VzZXIvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2luZGV4LnV4Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9zeXN0ZW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZmV0Y2hcIikpO1xudmFyIF9zeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnN0b3JhZ2VcIikpO1xudmFyIF9zeXN0ZW0zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLmRldmljZVwiKSk7XG52YXIgX3N5c3RlbTQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0ucHJvbXB0XCIpKTtcbnZhciBfc3lzdGVtNSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5yb3V0ZXJcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTsgfVxuZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkgeyByZXR1cm4gKHIgPSBfdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7IHZhbHVlOiB0LCBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwIH0pIDogZVtyXSA9IHQsIGU7IH1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHsgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7IHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgdCB8fCAhdCkgcmV0dXJuIHQ7IHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAodm9pZCAwICE9PSBlKSB7IHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpOyBpZiAoXCJvYmplY3RcIiAhPSB0eXBlb2YgaSkgcmV0dXJuIGk7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTsgfSByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpOyB9XG5jb25zdCBnZXRVc2VySWQgPSBhc3luYyAoKSA9PiB7XG4gIGxldCB1c2VySWQgPSBhd2FpdCBfc3lzdGVtMy5kZWZhdWx0LmdldFVzZXJJZCgpO1xuICByZXR1cm4gdXNlcklkLmRhdGEudXNlcklkO1xufTtcbmNvbnN0IHF1aXQgPSAoKSA9PiB7XG4gIF9zeXN0ZW00LmRlZmF1bHQuc2hvd0RpYWxvZyh7XG4gICAgdGl0bGU6ICforablkYonLFxuICAgIG1lc3NhZ2U6IFwi5oKo5bey5rOo6ZSA6LSm5Y+3LOivt+mAgOWHuuOAglwiLFxuICAgIGJ1dHRvbnM6IFt7XG4gICAgICB0ZXh0OiAn6YCA5Ye6JyxcbiAgICAgIGNvbG9yOiAnIzMzMzMzMydcbiAgICB9XSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgX3N5c3RlbTUuZGVmYXVsdC5wdXNoKHtcbiAgICAgICAgdXJpOiBcIlBhZ2VfbG9naW5cIlxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuY29uc3QgZ2V0VG9rZW5EYXRhID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4YW1wbGUgPSByZXF1aXJlKCcuL2FwaXMvZXhhbXBsZS5qcycpLmRlZmF1bHQ7XG4gICAgY29uc3QgZGV2aWNlTnVtID0gYXdhaXQgZ2V0VXNlcklkKCk7XG4gICAgLy8gY29uc29sZS5sb2coYGdldFRva2VuRGF0YSgpLS0tLT5kZXZpY2VOdW09JHtkZXZpY2VOdW19YCk7XG4gICAgLy8gY29uc29sZS5sb2coJ+aYr+WQpuinpuWPkeeahOi/memHjCcpO1xuICAgIGV4YW1wbGUudG9Mb2dpbih7XG4gICAgICBsb2dpblR5cGU6IFwiREVWSUNFXCIsXG4gICAgICBhcHBJZDogJ1NDXzAwMDEnLFxuICAgICAgZGV2aWNlTnVtLFxuICAgICAgbG9naW5BY2NvdW50OiBkZXZpY2VOdW1cbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+i1sOeahOaIkOWKn+WbnuiwgycpO1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyLCAn5aSx6LSl5Zue6LCDJyk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoSlNPTi5wYXJzZShlcnIpLmNvZGUgPT09ICczMTAwMDEnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+i/m+adpeS6hicpO1xuICAgICAgICAgIHF1aXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IsICfmn6XnnIvojrflj5bmiqXplJknKTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5sZXQgaXNSZWZyZXNoaW5nID0gZmFsc2U7IC8vIOaYr+WQpuato+WcqOivt+axguWIt+aWsHRva2Vu55qE5o6l5Y+jXG5jb25zdCByZWZyZXNoU3Vic2NyaWJlcnMgPSBbXTsgLy8g5a2Y5YKo6K+35rGC55qE5pWw57uEXG5jb25zdCBzdWJzY3JpYmVUb2tlblJlZnJlc2ggPSBjYiA9PiB7XG4gIC8vIOWwhuaJgOacieeahOivt+axgumDvXB1c2jliLDmlbDnu4TkuK0s5YW25a6e5pWw57uE5pivW2Z1bmN0aW9uKHRva2VuKXt9LCBmdW5jdGlvbih0b2tlbil7fSwuLi5dXG4gIHJlZnJlc2hTdWJzY3JpYmVycy5wdXNoKGNiKTtcbn07XG5jb25zdCBvblJyZWZyZXNoZWQgPSB0b2tlbiA9PiB7XG4gIC8vIOaVsOe7hOS4reeahOivt+axguW+l+WIsOaWsOeahHRva2Vu5LmL5ZCO6Ieq5omn6KGM77yM55So5paw55qEdG9rZW7ljrvor7fmsYLmlbDmja5cbiAgcmVmcmVzaFN1YnNjcmliZXJzLm1hcChjYiA9PiBjYih0b2tlbikpO1xufTtcbmNvbnN0IGlzQWNjZXNzVG9rZW5FeHBpcmVkID0gYXV0aERhdGEgPT4ge1xuICAvLyDliKTmlq3lvZPliY10b2tlbuaYr+WQpui/h+acn1xuICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhdXRoRGF0YS5leHBpcmVBdCA+IDEwMDAwICogNjApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuY29uc3QgcmVxdWVzdCA9IG9wdGlvbnMgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzID0ge31cbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBhdXRoRGF0YSA9IChhd2FpdCBfc3lzdGVtMi5kZWZhdWx0LmdldCh7XG4gICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgfSkpIHx8IHt9O1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXV0aERhdGEuZGF0YSA/IEpTT04ucGFyc2UoYXV0aERhdGEuZGF0YSkuYWNjZXNzVG9rZW4gOiAnJztcbiAgICBpZiAoaXNBY2Nlc3NUb2tlbkV4cGlyZWQoYXV0aERhdGEpIHx8ICFhY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKCFvcHRpb25zLnVybC5pbmNsdWRlcyhcInFhL21pbmkvYmFzaWMvdXNlci9sb2dpblwiKSkge1xuICAgICAgICBpZiAoIWlzUmVmcmVzaGluZykge1xuICAgICAgICAgIGlzUmVmcmVzaGluZyA9IHRydWU7XG4gICAgICAgICAgZ2V0VG9rZW5EYXRhKCkudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaXNSZWZyZXNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gcmVzLmRhdGEuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgIGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuc2V0KHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiQVVUSF9UT0tFTl9EQVRBXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlcy5kYXRhLmFjY2Vzc1Rva2VuJywgcmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICBvblJyZWZyZXNoZWQocmVzLmRhdGEuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmV0cnkgPSBuZXcgUHJvbWlzZSgoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaWJlVG9rZW5SZWZyZXNoKHRva2VuID0+IHtcbiAgICAgICAgICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHRva2VuOyAvLyDnlKjmnIDmlrB0b2tlbuivt+axguaVsOaNrlxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBhY2Nlc3NUb2tlbiB8fCAnJztcbiAgICBfc3lzdGVtLmRlZmF1bHQuZmV0Y2goe1xuICAgICAgLy8gdXJsOiAnaHR0cHM6Ly90ZXN0LmlwYW5kYXRhLmNvbScgKyB1cmwsXG4gICAgICB1cmw6ICdodHRwczovL2FwaS5paGFpdHVvLmNuJyArIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXI6IF9vYmplY3RTcHJlYWQoe1xuICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSwgaGVhZGVycyksXG4gICAgICAvLyBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAvLyAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgLy8gICBpZiAoZGF0YS5jb2RlID09PSBcIjAwMDAwMFwiIHx8IEpTT04ucGFyc2UoZGF0YSkuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgLy8gICAgIHJlc29sdmUodXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpID8gcmVzLmRhdGEgOiBKU09OLnBhcnNlKHJlcy5kYXRhKSk7XG4gICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgaWYgKGRhdGEuY29kZSA9PT0gXCIzMDAwMDJcIikge1xuICAgICAgLy8gICAgICAgJHN0b3JhZ2UuZGVsZXRlKHtcbiAgICAgIC8vICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJ1xuICAgICAgLy8gICAgICAgfSlcbiAgICAgIC8vICAgICAgIHJlcXVlc3Qob3B0aW9ucylcbiAgICAgIC8vICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC8vICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgIHJlamVjdChyZXMuZGF0YSk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9LFxuXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhO1xuXG4gICAgICAgICAgLy8g5bCd6K+V6Kej5p6QIEpTT04g5pWw5o2u77yM5aaC5p6c6Kej5p6Q5aSx6LSl77yM5YiZ5Lya5oqb5Ye66ZSZ6K+vXG4gICAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhO1xuICAgICAgICAgIGlmIChwYXJzZWREYXRhLmNvZGUgPT09IFwiMDAwMDAwXCIpIHtcbiAgICAgICAgICAgIHJlc29sdmUodXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpID8gZGF0YSA6IHBhcnNlZERhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkRGF0YS5jb2RlID09PSBcIjMwMDAwMlwiKSB7XG4gICAgICAgICAgICAgIF9zeXN0ZW0yLmRlZmF1bHQuZGVsZXRlKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMpLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBKU09OIG9yIGhhbmRsaW5nIGNvZGU6IFwiLCBlKTtcblxuICAgICAgICAgIC8vIOajgOafpeaYr+WQpui/lOWbnueahOaYryBIVE1M77yM6ICM5LiN5pivIEpTT05cbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5kYXRhID09PSAnc3RyaW5nJyAmJiByZXMuZGF0YS5zdGFydHNXaXRoKCc8aHRtbD4nKSkge1xuICAgICAgICAgICAgcmVqZWN0KFwiU2VydmVyIHJldHVybmVkIGFuIEhUTUwgcGFnZSBpbnN0ZWFkIG9mIEpTT04uIFBvc3NpYmxlIGluY29ycmVjdCBVUkwgb3Igc2VydmVyIGVycm9yLlwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KFwiRXJyb3IgcGFyc2luZyBKU09OIG9yIGhhbmRsaW5nIGNvZGU6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7fVxuICAgIH0pO1xuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSByZXF1ZXN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9hamF4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vYWpheC5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG4vLyDnmbvlvZUgXG5jb25zdCB0b0xvZ2luID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvdXNlci9sb2dpbmAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOS4iuS8oOatpeaVsFxuY29uc3QgdXBsb2Fkc3RlcHMgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy91cGxvYWRgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuLy8g6I635Y+W5q2l5pWwXG5jb25zdCBnZXRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvc2NgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vLyDojrflj5bmnIDov5EzMOWkqeiusOW9lVxuY29uc3QgZ2V0c3RlcHNsaXN0ID0gKCkgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvc2MvbGlzdGBcbiAgfSk7XG59O1xuXG4vL+aPkOeOsFxuY29uc3Qgd2l0aGRyYXcgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL3dpdGhkcmF3YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/nlKjmiLfkvZnpop3orrDlvZVcbmNvbnN0IHJlY29yZCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvdXNlci9jYXNoL3JlY29yZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v6I635Y+W5bm/5ZGK5a6M5oiQ5qyh5pWwXG5jb25zdCBnZXRBZENvdW50ID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZS9jb3VudGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQXG5jb25zdCBjb21wbGV0ZUFkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29tcGxldGVgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+W5v+WRiuWujOaIkC3liqDlr4ZcbmNvbnN0IGNvbXBsZXRlQWRSU0EgPSBhc3luYyBkYXRhID0+IHtcbiAgbGV0IHRpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuICBkYXRhLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgbGV0IF9kYXRhID0gYXdhaXQgJHV0aWxzLmRhdGFFbmNyeXB0aW9uKGRhdGEpO1xuICBsZXQgcGFyYW0gPSB7XG4gICAgZGF0YTogX2RhdGFcbiAgfTtcbiAgY29uc29sZS5sb2coJ+S7u+WKoeWKoOWvhicsIHBhcmFtKTtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9maW5pc2hgLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtKVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK6L2s5YyW5LiK5LygICAgdHlwZTrlub/lkYrmuKDpgZPnsbvlnos6IGpoKOmyuOm4vyksIGtzKOW/q+aJiyksIGpsKOW3qOmHjyksICzlj6/nlKjlgLw6amgsa3MsamxcbmNvbnN0IGNvbnZlcnRVcGxvYWQgPSBkYXRhID0+IHtcbiAgY29uc29sZS5sb2coJ2RhdGE9ICcsIGRhdGEsIGB1cmw9IC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvdXBsb2FkLyR7ZGF0YS50eXBlfWApO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvdXBsb2FkLyR7ZGF0YS50eXBlfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v6I635Y+W5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvXG5jb25zdCBib2xja1JldHVybiA9ICgpID0+IHtcbiAgbGV0IGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvY2xpY2tDb250cm9sL3JldHVybi9pbmZvLyR7YnJhbmR9YFxuICB9KTtcbn07XG5cbi8qKlxyXG4gKiDojrflj5bpobXpnaLpgI/mmI7lsYLphY3nva7kv6Hmga8gIFxyXG4gKlxyXG4gKi9cblxuY29uc3Qgc2hvd1RjbGF5ZXIgPSBkYXRhID0+IHtcbiAgbGV0IGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvY2xpY2tDb250cm9sL3RyYW5zcGFyZW50TGF5ZXIvaW5mby8ke2JyYW5kfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8qKlxyXG4gKiDojrflj5bmmK/lkKboh6rliqjlvLnnqpcgIFxyXG4gKlxyXG4gKi9cblxuY29uc3QgcG9wVXBzID0gKCkgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvYXV0by9wb3BVcHNgXG4gIH0pO1xufTtcblxuLyoqXHJcbiAqIOi9rOWMlueCueWHu+asoeaVsFxyXG4gKlxyXG4gKi9cbmNvbnN0IGNsaWNrQ291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbnZlcnQvY2xpY2tDb3VudC8ke2RhdGEudHlwZX1gLFxuICAgIGRhdGFcbiAgfSk7XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0ge1xuICB0b0xvZ2luLFxuICB1cGxvYWRzdGVwcyxcbiAgZ2V0c3RlcHMsXG4gIGdldHN0ZXBzbGlzdCxcbiAgd2l0aGRyYXcsXG4gIHJlY29yZCxcbiAgZ2V0QWRDb3VudCxcbiAgY29tcGxldGVBZCxcbiAgY29tcGxldGVBZFJTQSxcbiAgY29udmVydFVwbG9hZCxcbiAgYm9sY2tSZXR1cm4sXG4gIHNob3dUY2xheWVyLFxuICBwb3BVcHMsXG4gIGNsaWNrQ291bnRcbn07IiwiPGltcG9ydCBuYW1lPVwibXktY2lyY2xlXCIgc3JjPVwiLi4vdWkvY2lyY2xlL2luZGV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJteS1kaWFsb2dcIiBzcmM9XCIuLi91aS9kaWFsb2cvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInByaXZhY3ktcG9wXCIgc3JjPVwiLi4vdWkvcHJpdmFjeXBvcC9pbmRleFwiPjwvaW1wb3J0PlxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvcF92aWV3XCI+XG4gICAgICA8dGFicyBjbGFzcz1cInRhYnNcIiBvbmNoYW5nZT1cImNoYW5nZVRhYmFjdGl2ZVwiPlxuICAgICAgICA8dGFiLWJhciBjbGFzcz1cInRhYi1iYXJcIj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5LuK5pelPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7lkag8L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuaciDwvdGV4dD5cbiAgICAgICAgPC90YWItYmFyPlxuICAgICAgPC90YWJzPlxuICAgICAgPG15LWNpcmNsZSBjbGFzcz1cImNpcmNsZVwiIHNpemU9XCIzNTBcIiBwZXJjZW50PVwie3twcm9ncmVzc319XCIgc3Ryb2tlLWNvbG9yPVwiIzAwQjJGRlwiIHMtYW5nbGU9XCIxNTBcIiBzaG93LXRyYWlsPVwie3t0cnVlfX1cIiB0cmFpbC1jb2xvcj1cIiNmZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGltYWdlIHNyYz1cIi9Db21tb24vaW1nL2ljb25fcGFvYnUucG5nXCIgY2xhc3M9XCJpY29uLWltYWdlXCIgLz5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlX3N0cGVzXCI+e3tzZWdtZW50c1RleHR9fTwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlX3N0cGVzX3ZcIj57e3N0ZXBzX3ZpZXd9fTwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L215LWNpcmNsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC1pdGVtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC12YWx1ZVwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJkZXRhaWwtdmFsdWUxIGxhcmdlci10ZXh0XCI+e3ttaWxlYWdlfX08L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInNtYWxsZXItdGV4dFwiPktNPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibi10ZXh0XCI+6YeM56iLPC90ZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC1pdGVtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC12YWx1ZVwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJkZXRhaWwtdmFsdWUyIGxhcmdlci10ZXh0XCI+e3tjYWxvcmllc319PC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJzbWFsbGVyLXRleHRcIj5rY2FsPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibi10ZXh0XCI+5raI6ICX54Ot6YePPC90ZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC1pdGVtXCIgQGNsaWNrPVwib3BlblNldFN0ZXBzRGlhbG9nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbC12YWx1ZVwiPlxuICAgICAgICAgICAgPHRleHQgaWQ9XCJ1XCIgY2xhc3M9XCJkZXRhaWwtdmFsdWUzIGxhcmdlci10ZXh0XCI+e3tnb2FsX2RheX19PC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJzbWFsbGVyLXRleHRcIj7mraU+PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibi10ZXh0XCI+5LuK5pel55uu5qCHPC90ZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbV92aWV3XCI+XG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI1MnB4OyBoZWlnaHQ6IDQ1cHg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjM4cHg7IGhlaWdodDogMjhweDsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZTlmZDY1LCAjOTVmZjM3IDEwMCUpOyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvcmRlci1yYWRpdXM6IDU4cHhcIj48L2Rpdj5cbiAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj5CTUkv5L2T6ISC546H6K6h566XPC90ZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogIzgyODI4MjsgcGFkZGluZy10b3A6IDEwcHg7IHBhZGRpbmctbGVmdDogMjBweFwiIEBjbGljaz1cIm9wZW5CYXNpY0luZm9ybWF0aW9uRGlhbG9nXCI+5aGr5YaZ6K6h566XPjwvdGV4dD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMTQwcHg7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9taW5ncm91cDIucG5nKTsgbWFyZ2luLXRvcDogMTVweDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmRcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1sZWZ0OiAtMzBweFwiPlxuICAgICAgICAgIDxpbWFnZSBzcmM9XCIvQ29tbW9uL2ltZy9pY29uX2JtaS5wbmdcIiBzdHlsZT1cIndpZHRoOiA5MHB4OyBoZWlnaHQ6IDkwcHhcIiAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsgbWFyZ2luLWxlZnQ6IDE2cHhcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFyZ2VyMy10ZXh0XCI+Qk1JPC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYXJnZXIyLXRleHRcIj57e2JtaX19PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBjZW50ZXJcIj5cbiAgICAgICAgICA8aW1hZ2Ugc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl90emwucG5nXCIgc3R5bGU9XCJ3aWR0aDogOTBweDsgaGVpZ2h0OiA5MHB4XCIgLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IG1hcmdpbi1sZWZ0OiAxNnB4XCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjMtdGV4dFwiPuS9k+iEgueOhzwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFyZ2VyMi10ZXh0XCI+e3t0emx9fTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9zdGFuZGFyZC5wbmcpOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzNjhweDsgbWFyZ2luLXRvcDogMTRweFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxteS1kaWFsb2cgdmlzaWJsZT1cInt7b3BlbjF9fVwiIGRpYWxvZy10eXBlPVwicHJvbXB0XCIgb25hZmZpcm09XCJlbnRlclN0ZXBzXCIgb25jYW5jZWw9XCJjbG9zZVwiIG9uZW50ZXI9XCJlbnRlclN0ZXBzXCIgcHJvbXB0PVwie3tvYmp9fVwiPjwvbXktZGlhbG9nPlxuICAgIDxteS1kaWFsb2cgdmlzaWJsZT1cInt7b3BlbjJ9fVwiIGRpYWxvZy10eXBlPVwicHJvbXB0MVwiIG9uYWZmaXJtPVwiZW50ZXJEZXRhaWxzXCIgb25jYW5jZWw9XCJjbG9zZVwiIHByb21wdD1cInt7b2JqfX1cIj48L215LWRpYWxvZz5cblxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIiBzaG93PVwie3tpc1Nob3d9fVwiPlxuICAgICAgPHRleHQgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPueUs+ivtyDlgaXouqvov5Dliqgg5p2D6ZmQOjwvdGV4dD5cbiAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC13ZWlnaHQ6IDUwMFwiPueUqOS6juiusOW9lei/kOWKqOatpeaVsO+8jOiuoeeul+i/kOWKqOmHj+OAgjwvdGV4dD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4gIC5oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcGFkZGluZzogOTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHRvcDogNzBweDtcbiAgICB3aWR0aDogNzAwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC50b3BfdmlldyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA4MjhweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL0NvbW1vbi9pbWcvZ3JvdXAyLnBuZ1wiKTsgLyog5pu/5o2i5Li65L2g55qE6IOM5pmv5Zu+54mH6Lev5b6EICovXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgLyog5L2/6IOM5pmv5Zu+54mH6KaG55uW5pW05Liq5a655ZmoICovXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyAvKiDlsIbog4zmma/lm77niYflsYXkuK3lr7npvZAgKi9cbiAgfVxuXG4gIC5ib3R0b21fdmlldyB7XG4gICAgcGFkZGluZy10b3A6IDIwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAyN3B4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDI3cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA3NTBweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyMHB4O1xuICB9XG4gIC5pY29uLWltYWdlIHtcbiAgICB3aWR0aDogNDRweDsgLyog6K6+572u5Zu+54mH5a695bqmICovXG4gICAgaGVpZ2h0OiA0NHB4OyAvKiDorr7nva7lm77niYfpq5jluqYgKi9cbiAgfVxuXG4gIC5jaXJjbGUge1xuICAgIG1hcmdpbi10b3A6IDI1cHg7XG4gIH1cblxuICAudGV4dC1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgLyog5L2/5paH5pys5bGF5Lit5a+56b2QICovXG4gIH1cblxuICAudGl0bGVfc3RwZXMge1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogIzAwMDtcbiAgfVxuXG4gIC50aXRsZV9zdHBlc192IHtcbiAgICBmb250LXNpemU6IDgwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6ICMwMDA7XG4gIH1cblxuICAuZGV0YWlscyB7XG4gICAgd2lkdGg6IDcwMnB4O1xuICAgIGhlaWdodDogMTc1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjJmZjtcbiAgICBib3R0b206IDA7IC8qIOWbuuWumuWcqOeItuWuueWZqOW6lemDqCAqL1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5kZXRhaWwtaXRlbSB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgLyog5L2/5a2Q5YWD57Sg5Z6C55u05o6S5YiXICovXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IC8qIOWtkOWFg+e0oOWcqOWeguebtOaWueWQkeWdh+WMgOWIhuW4gyAqL1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8qIOWtkOWFg+e0oOWcqOawtOW5s+aWueWQkeWxheS4rSAqL1xuICB9XG5cbiAgLmRldGFpbC12YWx1ZSB7XG4gICAgZmxleDogMTsgLyog5a2Q5YWD57Sg5bmz5YiG5a695bqmICovXG5cbiAgICBmbGV4LWRpcmVjdGlvbjogcm93OyAvKiDkvb/lrZDlhYPntKDmsLTlubPmjpLliJcgKi9cbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7IC8qIOWtkOWFg+e0oOWcqOawtOW5s+aWueWQkeWxheS4rSAqL1xuICB9XG5cbiAgLmxhcmdlci10ZXh0IHtcbiAgICBmb250LXNpemU6IDQ4cHg7IC8qIOiuvue9rui+g+Wkp+eahOWtl+S9k+Wkp+WwjyAqL1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gICAgY29sb3I6ICNmZmY7XG4gIH1cblxuICAubGFyZ2VyMi10ZXh0IHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgICBmb250LXNpemU6IDQ4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICAubGFyZ2VyMy10ZXh0IHtcbiAgICBjb2xvcjogIzRiNGI0YjtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gIH1cbiAgLnNtYWxsZXItdGV4dCB7XG4gICAgZm9udC1zaXplOiAyNHB4OyAvKiDorr7nva7ovoPlsI/nmoTlrZfkvZPlpKflsI8gKi9cbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbiAgLm4tdGV4dCB7XG4gICAgZm9udC1zaXplOiAyNnB4OyAvKiDorr7nva7ovoPlsI/nmoTlrZfkvZPlpKflsI8gKi9cbiAgICBjb2xvcjogI2ZmZjtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxuICAudGFicyB7XG4gICAgd2lkdGg6IDUyMHB4O1xuICAgIG1hcmdpbi10b3A6IDI1NXB4O1xuICB9XG4gIC50YWItYmFyIHtcbiAgICBib3JkZXItY29sb3I6ICNiYmJiYmI7XG4gICAgY29sb3I6ICNiYmJiYmI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgICBib3JkZXItcmFkaXVzOiA1NHB4O1xuICB9XG4gIC50YWItdGV4dCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiA2NXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDc0cHg7XG4gIH1cbiAgLnRhYi10ZXh0OmFjdGl2ZSB7XG4gICAgY29sb3I6ICMwMDAwMDA7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDI3MGRlZywgIzhmZmYzNCAwJSwgI2ViZmQ2Nik7XG4gIH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCBzZW5zb3IgZnJvbSAnQHN5c3RlbS5zZW5zb3InO1xuICBpbXBvcnQgc3RvcmFnZSBmcm9tICdAc3lzdGVtLnN0b3JhZ2UnO1xuICBpbXBvcnQgZXhhbXBsZSBmcm9tICcuLi8uLi9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyc7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuXG5cbiAgICBwcml2YXRlOiB7XG5cblxuIFxuICAgICAgY29tcG9uZW50RGF0YToge30sXG4gICAgICBnb2FsRGF5S2V5OiBcIkdPQUxfREFZXCIsXG4gICAgICB1c2VyRGV0YWlsc0tleTogXCJVc2VyRGV0YWlsc1wiLFxuXG4gICAgICBzdGVwU3lzOiAwLC8v6K6+5aSH5b2T5YmN5oC75q2l5pWwXG4gICAgICBzdGVwc192aWV3OiAwLCAvLyDlvZPliY3mmL7npLrnmoTmraXmlbBcblxuXG4gICAgICBzdGVwc0RheUFwaTogMCwgLy8g5b2T5aSp5LqR5q2l5pWwXG4gICAgICBzdGVwc1dlZWtBcGk6IDAsIC8vIOW9k+WRqOS6keatpeaVsFxuICAgICAgc3RlcHNNb29uQXBpOiAwLCAvLyDlvZPmnIjkupHmraXmlbBcblxuICAgICAgZ29hbF9kYXk6IDAsICAvLyDlvZPml6Xnm67moIfmraXmlbBcblxuICAgICAgcHJvZ3Jlc3M6IDAsIC8vIOeUqOS6juWtmOWCqOatpeaVsOi/m+W6plxuXG4gICAgICBjdXJyZW50UGFnZTogLTEsLy/lvZPliY3pgInnmoTpobXvvIzpu5jorqTmmL7npLrku4rml6VcbiAgICAgIHNlZ21lbnRzOiBbXG4gICAgICAgICfku4rml6UnLCAn5ZGoJywgJ+aciCdcbiAgICAgIF0sXG4gICAgICBzZWdtZW50c1RleHRzOiBbXG4gICAgICAgICfku4rml6XmraXmlbAnLCAn5pys5ZGo5q2l5pWwJywgJ+acrOaciOatpeaVsCdcbiAgICAgIF0sXG4gICAgICBzZWdtZW50c1RleHQ6IFwiXCIsXG5cblxuICAgICAgYm9keV93ZWlnaHQ6IDYwLC8v5L2T6YeNXG4gICAgICBib2R5X2hlaWdodDogMCwvL+i6q+mrmFxuICAgICAgc2V4OiAxLC8v5oCn5YirICAxIOeUt++8jDAg5aWzXG4gICAgICBhZ2U6IDAsXG4gICAgICBtaWxlYWdlOiBcIjAuMFwiLC8v6YeM56iLXG4gICAgICBjYWxvcmllczogXCIwLjBcIiwvL+WNoei3r+mHjFxuICAgICAgYm1pOiAwLjAsLy9CTUlcbiAgICAgIHR6bDogMC4wLC8v5L2T6ISC546HXG5cblxuICAgICAgb3BlbjE6IGZhbHNlLFxuICAgICAgb3BlbjI6IGZhbHNlLFxuICAgICAgb2JqOiB7fSxcbiAgICAgIGlzU2hvdzogZmFsc2UsLy/pmpDnp4Hor6Lpl65cbiAgICB9LFxuICAgIC8v6aaW6aG15Yid5aeL5YyW5rWB56iL77yaXG4gICAgLy8gU3RlcDHojrflj5bnlKjmiLforr7nva7nmoTku4rml6Xnm67moIfmraXmlbBcbiAgICAvLyBTdGVwMuS7juWQjuWPsOiOt+WPluW9k+WJjeatpeaVsCAgXG4gICAgLy8gU3RlcDPmoLnmja7ojrflj5bliLDnmoTlvZPliY3mraXmlbDvvIzmm7TmlrDku4rml6Xov5vluqbvvIzph4znqIvvvIzmtojogJfng63ph48gXG4gICAgLy9cbiAgICBhc3luYyBvbkluaXQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uSW5pdCgpXCIpXG5cbiAgICAgIHRoaXMuZ2V0R29hbERheVN0ZXBzKCk7Ly8gU3RlcDFcbiAgICAgIHRoaXMuZ2V0VXNlckRldGFpbHMoKTtcbiAgICAgIHRoaXMuYXBpZ2V0U3RwZXMoKS8vIFN0ZXAyXG5cbiAgICB9LFxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25SZWFkeSgpXCIpXG4gICAgICB0aGlzLnVwZGF0ZUJNSVR6bCgpO1xuICAgIH0sXG5cbiAgICAvL+W8ueWHuumakOengeivoumXru+8jOS4jeiDveiHquWKqOaJp+ihjO+8jOmcgOimgeeUqOaIt+eCueWHu+WKn+iDveaXtuaJjeaJp+ihjO+8jOebruWJjemcgOaxguaYr+eCueWHu+KAmOS7iuaXpeKAme+8jOKAmOWRqOKAme+8jOKAmOaciOKAmeS4juiuvue9ruS7iuaXpeebruagh+aXtlxuICAgIGFzeW5jIGdldFRyZWF0eVN0b3JhZ2UoKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZVN0ZXBDb3VudGVyKClcblxuICAgIH0sXG4gICAgc3Vic2NyaWJlU3RlcENvdW50ZXIoKSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAvLyDorqLpmIXmraXmlbDorqHmlbDlmahcbiAgICAgIHNlbnNvci5zdWJzY3JpYmVTdGVwQ291bnRlcih7XG4gICAgICAgIGNhbGxiYWNrOiAocmV0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYOiuvuWkh+atpeaVsOabtOaWsOS6hu+8gS0tLS0tLT7orr7lpIfmgLvmraXmlbA9JHtyZXQuc3RlcHN9YClcblxuICAgICAgICAgIC8v5L+d5a2Y5p2D6ZmQXG4gICAgICAgICAgJHByb2Nlc3NEYXRhLnNldFN0b3JhZ2UoXCJfUFJJVkFDXCIsIHRydWUpO1xuICAgICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG5cbiAgICAgICAgICB0aGlzLnN0ZXBTeXMgPSByZXQuc3RlcHM7XG4gICAgICAgICAgLy/kuIrkvKDmraXmlbBcbiAgICAgICAgICB0aGlzLmFwaXVwbG9hZFN0cGVzKHJldC5zdGVwcyk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKGRhdGEsIGNvZGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhg5q2l5pWw6K6h5pWw5Zmo6K6i6ZiF5aSx6LSlLCBjb2RlID0gJHtjb2RlfWApO1xuICAgICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8v6I635Y+W55So5oi36K6+5a6a55qE5LuK5pel55uu5qCHXG4gICAgZ2V0R29hbERheVN0ZXBzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICBrZXk6IHRoaXMuZ29hbERheUtleSxcbiAgICAgICAgZGVmYXVsdDogMTAwMDAsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0b3JhZ2UuZ2V0KCk6ICcsIEpTT04uc3RyaW5naWZ5KHJldCkpXG4gICAgICAgICAgdGhhdC5nb2FsX2RheSA9IHJldFxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ2dldCBmYWlsIC0tLSAnICsgZXJyb2NvZGUgKyAnOicgKyBlcnJvbXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvL+S/neWtmOeUqOaIt+iuvuWumueahOS7iuaXpeebruagh1xuICAgIHNldEdvYWxEYXlTdGVwcyhkYXRhKSB7XG4gICAgICBzdG9yYWdlLnNldCh7XG4gICAgICAgIGtleTogdGhpcy5nb2FsRGF5S2V5LC8vXG4gICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdzdG9yYWdlLnNldCgpOiAnLCBKU09OLnN0cmluZ2lmeShyZXQpKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3NldCBmYWlsIC0tLSAnICsgZXJyb2NvZGUgKyAnOicgKyBlcnJvbXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvL+iOt+WPlueUqOaIt+iuvuWumueahOivpuaDhVxuICAgIGdldFVzZXJEZXRhaWxzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgc3RvcmFnZS5nZXQoe1xuICAgICAgICBrZXk6IHRoaXMudXNlckRldGFpbHNLZXksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi36K6+5a6a6K+m5oOF6I635Y+W5oiQ5YqfOicsIHJldCk7XG4gICAgICAgICAgaWYgKHJldCAmJiByZXQudHJpbSgpKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlscyA9IEpTT04ucGFyc2UocmV0KVxuICAgICAgICAgICAgLy8g5pu05paw5ZCE5Liq5bGe5oCnXG4gICAgICAgICAgICB0aGF0LmJvZHlfd2VpZ2h0ID0gTnVtYmVyKHVzZXJEZXRhaWxzLmJvZHlfd2VpZ2h0KSB8fCB0aGF0LmJvZHlfd2VpZ2h0OyAvLyDnoa7kv53ovazmjaLkuLrmlbDlrZfnsbvlnotcbiAgICAgICAgICAgIHRoYXQuYm9keV9oZWlnaHQgPSBOdW1iZXIodXNlckRldGFpbHMuYm9keV9oZWlnaHQpIHx8IHRoYXQuYm9keV9oZWlnaHQ7IC8vIOehruS/nei9rOaNouS4uuaVsOWtl+exu+Wei1xuICAgICAgICAgICAgdGhhdC5zZXggPSB1c2VyRGV0YWlscy5zZXggIT09IHVuZGVmaW5lZCA/IHVzZXJEZXRhaWxzLnNleCA6IHRoYXQuc2V4OyAvLyDkv53mjIHkuLrmlbDlrZfnsbvlnotcbiAgICAgICAgICAgIHRoYXQuYWdlID0gTnVtYmVyKHVzZXJEZXRhaWxzLmFnZSkgfHwgdGhhdC5hZ2U7IC8vIOehruS/nei9rOaNouS4uuaVsOWtl+exu+Wei1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5pu05paw5ZCO55qE55So5oi36K+m5oOFOicsIHRoYXQuYm9keV93ZWlnaHQsIHRoYXQuYm9keV9oZWlnaHQsIHRoYXQuc2V4LCB0aGF0LmFnZSk7XG5cbiAgICAgICAgICAgIHRoYXQudXBkYXRlQk1JVHpsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0IGZhaWwgLS0tICcgKyBlcnJvY29kZSArICc6JyArIGVycm9tc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8v5L+d5a2Y55So5oi36K6+5a6a55qE6K+m5oOFXG4gICAgc2V0VXNlckRldGFpbHMoKSB7XG4gICAgICBjb25zdCB1c2VyRGV0YWlscyA9IHtcbiAgICAgICAgYm9keV93ZWlnaHQ6IHRoaXMuYm9keV93ZWlnaHQsXG4gICAgICAgIGJvZHlfaGVpZ2h0OiB0aGlzLmJvZHlfaGVpZ2h0LFxuICAgICAgICBzZXg6IHRoaXMuc2V4LFxuICAgICAgICBhZ2U6IHRoaXMuYWdlXG4gICAgICB9O1xuICAgICAgc3RvcmFnZS5zZXQoe1xuICAgICAgICBrZXk6IHRoaXMudXNlckRldGFpbHNLZXksXG4gICAgICAgIHZhbHVlOiB1c2VyRGV0YWlscyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfor6bmg4Xkv53lrZjmiJDlip86JywgcmV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcign55So5oi36K+m5oOF5L+d5a2Y5aSx6LSlOicsIGVycm9tc2csIGVycm9jb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG5cbiAgICAvL+abtOaWsOatpeaVsOi/m+W6plxuICAgIHVwZGF0ZVByb2dyZXNzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgY29uc29sZS5sb2coYOabtOaWsOatpeaVsOi/m+W6pu+8geS7iuaXpeS6keatpeaVsD0ke3RoYXQuc3RlcHNEYXlBcGl9YClcblxuICAgICAgLy8g5a+55bqU6aG16Z2i55qE5pi+56S65q2l5pWwXG4gICAgICBjb25zdCBzZXJ2aWNlX3N0ZXAgPSBbdGhhdC5zdGVwc0RheUFwaSwgdGhhdC5zdGVwc1dlZWtBcGksIHRoYXQuc3RlcHNNb29uQXBpXTtcbiAgICAgIC8vIOW9k+WJjeaYvuekuuatpeaVsFxuICAgICAgY29uc3QgY3VycmVudHNTdGVwID0gc2VydmljZV9zdGVwW3RoYXQuY3VycmVudFBhZ2VdO1xuXG4gICAgICAvLyDlrprkuYnkuI3lkIzpobXpnaLlr7nlupTnmoTnm67moIfmraXmlbBcbiAgICAgIGNvbnN0IGdvYWxzID0gW3RoYXQuZ29hbF9kYXksIHRoYXQuZ29hbF9kYXkgKiA3LCB0aGF0LmdvYWxfZGF5ICogMzBdO1xuICAgICAgLy8g5a+55bqU6aG16Z2i55qE55uu5qCH5q2l5pWwXG4gICAgICBjb25zdCBjdXJyZW50R29hbCA9IGdvYWxzW3RoYXQuY3VycmVudFBhZ2VdO1xuICAgICAgLy8g6K6h566X5q2l5pWw5q+U5L6LXG4gICAgICBjb25zdCBzdGVwUmF0aW8gPSBjdXJyZW50c1N0ZXAgLyBjdXJyZW50R29hbDtcbiAgICAgIC8vIOiuoeeul+i/m+W6puWAvOW5tuabtOaWsFxuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHN0ZXBSYXRpbyAqIDEwMCwgMTAwKSAqIDAuNjY7Ly/kuZgwLjY255qE5Y6f5Zug5Li66L+b5bqm546v5pyA5aSn6KeS5bqm5Li6MjYw5bqm77yM5Y2z5LiJ5YiG5LmL5LqM5ZyGXG5cbiAgICAgIHRoaXMuc3RlcHNfdmlldyA9IGN1cnJlbnRzU3RlcDtcbiAgICAgIHRoaXMuc2VnbWVudHNUZXh0ID0gdGhhdC5zZWdtZW50c1RleHRzW3RoYXQuY3VycmVudFBhZ2VdXG5cbiAgICAgIGNvbnNvbGUubG9nKGDnm67liY0ke3RoYXQuc2VnbWVudHNUZXh0fei/m+W6piA9ICR7TWF0aC5taW4oc3RlcFJhdGlvICogMTAwLCAxMDApLnRvRml4ZWQoMSl9JWApO1xuXG4gICAgICB0aGlzLnVwZGF0ZU1pbGVhZ2VBbmRDYWxvcmllcygpLy/mm7TmlrDljaHot6/ph4zvvIzph4znqItcbiAgICB9LFxuXG5cbiAgICAvL+abtOaWsOWNoei3r+mHjO+8jOmHjOeoi1xuICAgIHVwZGF0ZU1pbGVhZ2VBbmRDYWxvcmllcygpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuYm9keV93ZWlnaHQgPD0gMCB8fCB0aGlzLmJvZHlfd2VpZ2h0ID09PSAnLScpIHtcbiAgICAgICAgdGhpcy5jYWxvcmllcyA9IFwiMC4wXCJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8v5pu05paw6YeM56iLXG4gICAgICAgIHRoaXMubWlsZWFnZSA9ICgodGhhdC5zdGVwc192aWV3ICogMC42KSAvIDEwMDApLnRvRml4ZWQoMik7XG4gICAgICAgIC8vIOiuoeeul+WNoei3r+mHjOa2iOiAl++8jOW5tuWPquaYvuekuuS4gOS9jeWwj+aVsFxuICAgICAgICB0aGlzLmNhbG9yaWVzID0gKDAuMDE3NSAqIHRoYXQuYm9keV93ZWlnaHQgKiB0aGF0LnN0ZXBzX3ZpZXcpLnRvRml4ZWQoMSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy/mm7TmlrBCTUkg5L2T6ISC546HXG4gICAgdXBkYXRlQk1JVHpsKCkge1xuICAgICAgaWYgKHRoaXMuYm9keV93ZWlnaHQgPD0gMCB8fCB0aGlzLmJvZHlfaGVpZ2h0IDw9IDAgfHwgdGhpcy5hZ2UgPD0gMCB8fCB0aGlzLmJvZHlfd2VpZ2h0ID09PSAnLScgfHwgdGhpcy5ib2R5X2hlaWdodCA9PT0gJy0nIHx8IHRoaXMuYWdlID09PSAnLScpIHtcbiAgICAgICAgdGhpcy50emwgPSBcIi0tLVwiXG4gICAgICAgIHRoaXMuYm1pID0gXCItLS1cIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYm1pID0gKHRoaXMuYm9keV93ZWlnaHQgLyAodGhpcy5ib2R5X2hlaWdodCAqIDAuMDEpICoqIDIpLnRvRml4ZWQoMSk7XG4gICAgICAgIGNvbnN0IHBhcmFtMSA9IDEuMiAqIHBhcnNlRmxvYXQoYm1pKTtcbiAgICAgICAgY29uc3QgcGFyYW0yID0gdGhpcy5hZ2UgKiAwLjIzO1xuICAgICAgICBjb25zdCBwYXJhbTMgPSA1LjQgKyAoMTAuOCAqIHRoaXMuc2V4KTtcblxuICAgICAgICB0aGlzLnR6bCA9IHBhcnNlRmxvYXQoKHBhcmFtMSArIHBhcmFtMiAtIHBhcmFtMykudG9GaXhlZCgxKSkgKyBcIiVcIjtcbiAgICAgICAgdGhpcy5ibWkgPSBibWk7XG4gICAgICB9XG4gICAgICAvL+abtOaWsOS6huS9k+mHje+8jOmcgOimgeabtOaWsOWNoei3r+mHjFxuICAgICAgdGhpcy51cGRhdGVNaWxlYWdlQW5kQ2Fsb3JpZXMoKVxuICAgIH0sXG5cblxuICAgIC8v5omT5byA5Z+65pys5oOF5Ya156qX5Y+jXG4gICAgb3BlbkJhc2ljSW5mb3JtYXRpb25EaWFsb2coKSB7XG4gICAgICBjb25zb2xlLmxvZyhg5omT5byA5Z+65pys5oOF5Ya156qX5Y+jYCk7XG4gICAgICB0aGlzLm9wZW4yID0gdHJ1ZVxuICAgICAgdGhpcy5vYmogPSB7XG4gICAgICAgIHRpdGxlOiAn5aGr5YaZ5Z+65pys5oOF5Ya1JyxcbiAgICAgICAgZmllbGR0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCLovpPlhaXmlbTmlbDmlbDlrZdcIixcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvL+aJk+W8gOiuvuWumuebruagh+atpeaVsOeql+WPo1xuICAgIG9wZW5TZXRTdGVwc0RpYWxvZygpIHtcblxuICAgICAgdGhpcy5nZXRUcmVhdHlTdG9yYWdlKClcblxuICAgICAgY29uc29sZS5sb2coYOaJk+W8gOiuvuWumuebruagh+atpeaVsOeql+WPo2ApO1xuXG4gICAgICB0aGlzLm9wZW4xID0gdHJ1ZVxuICAgICAgdGhpcy5vYmogPSB7XG4gICAgICAgIHRpdGxlOiAn6K6+572u5q+P5pel5q2l5pWwJyxcbiAgICAgICAgZmllbGR0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCLovpPlhaXmlbTmlbDmlbDlrZdcIixcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/noa7lrprnm67moIfmraXmlbBcbiAgICBlbnRlclN0ZXBzKGV2dCkge1xuICAgICAgdGhpcy5vcGVuMSA9IGZhbHNlXG4gICAgICBjb25zdCBnb2FsX3N0cGUgPSBldnQuZGV0YWlsLmV2ZW50LnZhbHVlXG4gICAgICBjb25zb2xlLmxvZyhg6K6+5a6a5LqG55uu5qCH5q2l5pWw77yaJHtnb2FsX3N0cGV9YCk7XG4gICAgICB0aGlzLmdvYWxfZGF5ID0gZ29hbF9zdHBlO1xuICAgICAgdGhpcy5zZXRHb2FsRGF5U3RlcHMoZ29hbF9zdHBlKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3MoKTtcblxuICAgIH0sXG5cbiAgICAvL+ehruWumuWfuuacrOaDheWGtVxuICAgIGVudGVyRGV0YWlscyhldnQpIHtcbiAgICAgIHRoaXMub3BlbjIgPSBmYWxzZVxuXG4gICAgICBjb25zdCBrZyA9IGV2dC5kZXRhaWwuZXZlbnQua2dcbiAgICAgIGNvbnN0IGNtID0gZXZ0LmRldGFpbC5ldmVudC5jbVxuICAgICAgY29uc3QgYWdlID0gZXZ0LmRldGFpbC5ldmVudC5hZ2VcbiAgICAgIGNvbnN0IHNleCA9IGV2dC5kZXRhaWwuZXZlbnQuc2V4XG4gICAgICBjb25zb2xlLmxvZyhg6K6+5a6a5LqG5L2T6YeN77yaJHtrZ30s6Lqr6auY77yaJHtjbX0s5bm06b6E77yaJHthZ2V9LHNleDoke3NleH1gKTtcblxuICAgICAgdGhpcy5ib2R5X3dlaWdodCA9IGtnO1xuICAgICAgdGhpcy5ib2R5X2hlaWdodCA9IGNtO1xuICAgICAgdGhpcy5hZ2UgPSBhZ2U7XG4gICAgICB0aGlzLnNleCA9IHNleDtcblxuICAgICAgdGhpcy5zZXRVc2VyRGV0YWlscygpXG4gICAgICB0aGlzLnVwZGF0ZUJNSVR6bCgpXG5cbiAgICB9LFxuXG4gICAgY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZyhg5YWz6Zet5LqG56qX5Y+j77yaYCk7XG4gICAgICB0aGlzLm9wZW4xID0gZmFsc2VcbiAgICAgIHRoaXMub3BlbjIgPSBmYWxzZVxuICAgIH0sXG5cbiAgICAvL+WIh+aNouWkqe+8jOWRqO+8jOaciOmhtemdolxuICAgIGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgIT09IC0xKSB7IHRoaXMuZ2V0VHJlYXR5U3RvcmFnZSgpIH0vL+acqueCueWHu+aXtuS4jeivoumXrlxuXG4gICAgICBjb25zb2xlLmxvZyhlLmluZGV4KVxuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGUuaW5kZXg7XG5cbiAgICAgIHRoaXMuYXBpZ2V0U3RwZXMoKVxuICAgIH0sXG5cblxuXG4gICAgLy/ojrflj5bkupHmraXmlbBcbiAgICBhcGlnZXRTdHBlcygpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGNvbnN0IHR5cGVzID0gW1wiVE9EQVlcIiwgXCJXRUVLXCIsIFwiTU9PTlwiXTtcbiAgICAgIGNvbnN0IGFwaUtleXMgPSBbXCJzdGVwc0RheUFwaVwiLCBcInN0ZXBzV2Vla0FwaVwiLCBcInN0ZXBzTW9vbkFwaVwiXTtcbiAgICAgIHZhciB0ID0gdHlwZXNbdGhhdC5jdXJyZW50UGFnZV07XG4gICAgICBleGFtcGxlLmdldHN0ZXBzKHtcbiAgICAgICAgdHlwZTogdFxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGDojrflj5bjgIoke3R944CL5LqR5q2l5pWw5oiQ5Yqf77yBIC0tLS0tLT7kupHmraXmlbA9JHtyZXNwb25zZS5kYXRhfWApO1xuXG4gICAgICAgIC8vIOagueaNruW9k+WJjemhtemdouS/neWtmOatpeaVsFxuICAgICAgICB0aGF0W2FwaUtleXNbdGhhdC5jdXJyZW50UGFnZV1dID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcg6I635Y+WJHt0featpeaVsOWksei0pTonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8v5LiK5Lyg5q2l5pWwXG4gICAgYXBpdXBsb2FkU3RwZXMoYykge1xuICAgICAgdmFyIHQgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc29sZS5sb2coYOS4iuS8oOatpeaVsOS4rS0tLS0+5q2l5pWwPSR7Y30sdCA9ICR7dH1gKTtcblxuICAgICAgZXhhbXBsZS51cGxvYWRzdGVwcyh7XG4gICAgICAgIGNvdW50OiBjLFxuICAgICAgICBcInRpbWVzdGFtcFwiOiB0XG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyDkuIrkvKDmraXmlbBzdWNjZXNzZnVsOicsIHJlc3BvbnNlKTtcbiAgICAgICAgdGhpcy5zdGVwc0RheUFwaSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignIOS4iuS8oOatpeaVsGZhaWxlZDonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gIH1cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHBhZGRpbmctdG9wOiAyN3B4XCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMjBweDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgd2lkdGg6IDcwMnB4OyBoZWlnaHQ6IDU5MnB4OyBwYWRkaW5nOiAyNXB4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tdG9wOiAxNTBweFwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBoZWlnaHQ6IDcwcHhcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDE1MnB4OyBoZWlnaHQ6IDQ1cHg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMzBweDsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNlOWZkNjUsICM5NWZmMzcgMTAwJSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogNThweFwiPjwvZGl2PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MnB4OyBmb250LXNpemU6IDMxcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwb3NpdGlvbjogYWJzb2x1dGU7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogM3B4XCI+5q2l5pWw6K6w5b2VPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNHB4OyBjb2xvcjogIzgyODI4MlwiPuWNleS9je+8muatpTwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgbWFyZ2luLXRvcDogMjBweFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW5cIj5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNnB4OyBjb2xvcjogIzAwMDAwMDsgZm9udC13ZWlnaHQ6IGJvbGQ7IG1hcmdpbjogMjBweFwiPjIwMjQ8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj4wPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+MjAwMDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjQwMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj42MDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+ODAwMDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjEwMDAwPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8bGlzdCBjbGFzcz1cImxpc3RcIj5cclxuICAgICAgICAgIDxsaXN0LWl0ZW0gdHlwZT1cImxpc3RJdGVtXCIgZm9yPVwie3tsaXN0MzBkYXlEYXRhfX1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj5cclxuICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMjBweDsgZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzAwMDAwMFwiPnt7JGl0ZW0uc3VtbWFyeURhdGV9fTwvdGV4dD5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyBoZWlnaHQ6IDMycHg7IG1hcmdpbi1sZWZ0OiAgMjRweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMGIyZmYgO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1MHB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1MHB4XCI+XHJcbiAgICAgICAgICAgICAgICA8cHJvZ3Jlc3MgY2xhc3M9XCJwcm9ncmVzc1wiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGNvbG9yOiAjMDBiMmZmO2xheWVyLWNvbG9yOiNmZmY7XCIgcGVyY2VudD1cInt7JGl0ZW0ucGVyY2VudH19XCI+PC9wcm9ncmVzcz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2xpc3QtaXRlbT5cclxuICAgICAgICA8L2xpc3Q+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyBtYXJnaW4tdG9wOiAzMHB4XCI+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAxMTZweDsgcGFkZGluZzogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmOyBmb250LXNpemU6IDI0cHg7IGNvbG9yOiAjODI4MjgyOyB3aWR0aDogMjgwcHhcIj7ku4XmmL7npLrmnIDov5EzMOWkqeatpeaVsDwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcblxyXG48c3R5bGU+XHJcbiAgLmxpc3Qge1xyXG4gICAgbGF5b3V0LXR5cGU6IHN0YWdnZXI7XHJcbiAgfVxyXG5cclxuICAuaXRlbSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAyMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBleGFtcGxlIGZyb20gJy4uLy4uL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzJztcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJpdmF0ZToge1xyXG4gICAgICBsaXN0MzBkYXlEYXRhOiBbXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG4gICAgICB0aGlzLiRwYWdlLnNldFRpdGxlQmFyKHsgdGV4dDogJ+atpeaVsOiusOW9lScgfSlcclxuICAgIH0sXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICB0aGlzLmluaXRDaGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5nZXQzMGRheVJlY29yZCgpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2V0MzBkYXlSZWNvcmQoKSB7XHJcbiAgICAgIGV4YW1wbGUuZ2V0c3RlcHNsaXN0KCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmnIDov5EzMOWkqeiusOW9lS3miJDlip/vvIE6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgdGhpcy5saXN0MzBkYXlEYXRhID0gdGhpcy5mb3JtYXREYXRhKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5pyA6L+RMzDlpKnorrDlvZUt5aSx6LSl77yM5ZON5bqU5Li656m65oiW5rKh5pyJ5pWw5o2u77yBJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcg6I635Y+W5pyA6L+RMzDlpKnorrDlvZUt5aSx6LSl77yBJywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICBmb3JtYXREYXRhKGRhdGEpIHtcclxuICAgICAgY29uc3QgbWF4U3RlcHMgPSAxMDAwMDsgLy8g5YGH6K6+5pyA5aSn5q2l5pWw5Li6MTAwMDBcclxuICAgICAgcmV0dXJuIGRhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGxldCBkYXRlID0gKGl0ZW0uc3VtbWFyeURhdGUpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8g5o+Q5Y+W5pyI5Lu95ZKM5pel5pyf6YOo5YiGXHJcbiAgICAgICAgbGV0IGZvcm1hdHRlZERhdGUgPSBkYXRlLnN1YnN0cmluZyg0LCA2KSArICctJyArIGRhdGUuc3Vic3RyaW5nKDYsIDgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGVwQ291bnQgPSBwYXJzZUludChpdGVtLnN0ZXBDb3VudCwgMTApOyAvLyAgXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IE1hdGgucm91bmQoKHN0ZXBDb3VudCAvIG1heFN0ZXBzKSAqIDEwMCk7IC8vIOiuoeeul+eZvuWIhuavlOW5tuWbm+iIjeS6lOWFpVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBzdW1tYXJ5RGF0ZTogZm9ybWF0dGVkRGF0ZSxcclxuICAgICAgICAgIHN0ZXBDb3VudDogc3RlcENvdW50LFxyXG4gICAgICAgICAgcGVyY2VudDogcGVyY2VudFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5pdENoYXJ0KCkge1xyXG4gICAgfSxcclxuICB9XHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidG9wX3ZpZXdcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBjZW50ZXI7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwJVwiIG9uY2xpY2s9XCJ0b0xvZ2luXCI+XHJcbiAgICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBoZWlnaHQ6IDEyMHB4OyBtYXJnaW4tbGVmdDogNjBweFwiIHNyYz1cIi9Db21tb24vaW1nL3RvdXhpYW5nLnBuZ1wiIC8+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBoZWlnaHQ6IDEyMHB4OyBtYXJnaW4tbGVmdDogMTBweDsgcGFkZGluZzogMTBweFwiPlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJsb2dcIiBzdHlsZT1cImNvbG9yOiAjMDAwMDAwOyBmb250LXNpemU6IDMycHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+e3sgdXNlckRhdGEubG9naW5QaG9uZSB8fCAn6K+354K55Ye755m75b2VJyB9fTwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidXNlcl9pZFwiIHN0eWxlPVwiY29sb3I6ICM2OTY5Njk7IGZvbnQtc2l6ZTogMjhweFwiPklEOnt7dXNlckRhdGEudXNlcklkfX08L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IC0xMTBweDsgYm90dG9tOiAwOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IHBhZGRpbmctbGVmdDogNTBweDsgcGFkZGluZy1yaWdodDogNTBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2dyb3VwLnBuZyk7IGhlaWdodDogMTY0cHg7IHdpZHRoOiA3MDJweFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1pdGVtczogZmxleC1lbmRcIj5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICNmZmZmZmY7IGZvbnQtc2l6ZTogNzJweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj57e3VzZXJEYXRhLmJhbGFuY2V9fTwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiY29sb3I6ICNmZmZmZmY7IGZvbnQtc2l6ZTogMzJweDsgbWFyZ2luLWxlZnQ6IDEwcHg7IG1hcmdpbi1ib3R0b206IDEycHhcIj7lhYM8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgd2lkdGg6IDE1MHB4OyBoZWlnaHQ6IDcwcHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICNmN2JiYTQgMCUsICNmZGVjZDcpOyBib3JkZXItcmFkaXVzOiAxOTJweFwiIG9uY2xpY2s9XCJwdXNoUGFnZVRpeGlhblwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2FhNTAyMTsgZm9udC1zaXplOiAzMnB4OyBmb250LXdlaWdodDogYm9sZFwiPuaPkOeOsDwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tX3ZpZXdcIj5cclxuICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMTgwcHg7IG1hcmdpbi1ib3R0b206IDIwcHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9iYW5uZXJfbWUucG5nXCIgb25jbGljaz1cIm9wZW5BZFwiIC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB3aWR0aDogNzAycHg7IGhlaWdodDogMzgwcHg7IHBhZGRpbmc6IDIwcHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDE1MnB4OyBoZWlnaHQ6IDQ1cHg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMzBweDsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNlOWZkNjUsICM5NWZmMzcgMTAwJSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogNThweFwiPjwvZGl2PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MnB4OyBmb250LXNpemU6IDMxcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwb3NpdGlvbjogYWJzb2x1dGU7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogM3B4XCI+5oiR55qE5pyN5YqhPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBtYXJnaW4tYm90dG9tOiAzMHB4OyBtYXJnaW4tdG9wOiAyMHB4XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCIgb25jbGljaz1cImFkZERlc2t0b3BcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWUxLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPua3u+WKoOahjOmdojwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNoUGFnZWZlZWRiYWNrXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lMi5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7kuL7miqXlj43ppog8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaHdlYigxKVwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTMucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5biu5Yqp5Lit5b+DPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCIgb25jbGljaz1cInB1c2h3ZWIoMilcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWU0LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPueUqOaIt+WNj+iurjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaHdlYigzKVwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTUucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+6ZqQ56eB5pS/562WPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCIgb25jbGljaz1cInB1c2hQYWdlcGVybWlzc2lvbnNcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWU2LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuiuvue9rjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBvbmNsaWNrPVwicHVzaFBhZ2VhYm91dFwiIGNsYXNzPVwiZnJhbWVfXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lNy5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7lhbPkuo48L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaFBhZ2Vsb2dPdXRcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWU4LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuazqOmUgDwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHN0eWxlPlxyXG4gIC5mcmFtZV8ge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG4gIC5mcmFtZV9pbWEge1xyXG4gICAgd2lkdGg6IDcwcHg7XHJcbiAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgfVxyXG4gIC5mcmFtZV90ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgd2lkdGg6IDEwNXB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuXHJcbiAgLnRvcF92aWV3IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA2MDBweDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL0NvbW1vbi9pbWcvYmdfbWUucG5nXCIpOyAvKiDmm7/mjaLkuLrkvaDnmoTog4zmma/lm77niYfot6/lvoQgKi9cclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7IC8qIOS9v+iDjOaZr+WbvueJh+imhuebluaVtOS4quWuueWZqCAqL1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyAvKiDlsIbog4zmma/lm77niYflsYXkuK3lr7npvZAgKi9cclxuICB9XHJcblxyXG4gIC5ib3R0b21fdmlldyB7XHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogLTkwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyMHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuXHJcblxyXG48c2NyaXB0PlxyXG5cclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG5cclxuICAgIHByaXZhdGU6IHtcclxuXHJcblxyXG4gICAgICB1c2VyRGF0YToge30sXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgICAgdGhpcy5nZXRVc2VyKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVc2VyKCkge1xyXG4gICAgICB0aGlzLnVzZXJEYXRhID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51c2VyRGF0YVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIHRvTG9naW4oKSB7XHJcbiAgICAgIHZhciBwaG9uZSA9IHRoaXMudXNlckRhdGEubG9naW5QaG9uZVxyXG4gICAgICBpZiAocGhvbmUpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ1BhZ2VfbG9naW4nXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwdXNoUGFnZVRpeGlhbigpIHtcclxuXHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnUGFnZV9UaXhpYW4nXHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2VhYm91dCgpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX2Fib3V0J1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2VmZWVkYmFjaygpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdmZWVkYmFjaydcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcHVzaFBhZ2Vsb2dPdXQoKSB7XHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnbG9nT3V0J1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVzaFBhZ2VwZXJtaXNzaW9ucygpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdwZXJtaXNzaW9ucydcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5BZCgpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX2NmZC8nXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gJHJvdXRlci5wdXNoKHtcclxuICAgICAgLy8gICB1cmk6IFwiaGFwOi8vYXBwL2NvbS5oYWl0dW8uc2V0cHBsYW5ldC9QYWdlX2NmZC8/Y29udGVudF9pZD0tMSZhZGdyb3VwX2lkPS0xJmNhbXBhaWduX2lkPS0xJmNhbGxiYWNrPTQ1MDc5OTExJTI2LTElMjYxNDYyOTUwNDY3NTExMjgyOTQ0JTI2MjAyNC0wNy0xNyUyMDE3JTNBMjQlM0EyNCUyNjNISWpNWlBsdyUyQlUzQW9QdFVRczFBb0NCNzQ1aEozUEprd2Vrd1BGcmNXUFZkUWlpek9sNVlld1gzT2IzZHFzJTNEJTI2MCZyZWZlcnJlcj0tMSZjaGFubmVsPUtZWSZpcD0xMjcuMC4wLjEmb2FpZD0zMGFjMTg0MC0wNmFhLTQ2MWYtOTU5NC03ZjdiMzY1ZjBkZmUmY29ycF9pZD0xNDYyOTUwNDY3NTExMjgyOTQ0JmNoYW5uZWxWYWx1ZT1LWVlcIlxyXG4gICAgICAvLyB9KTtcclxuICAgIH0sXHJcbiAgICBhZGREZXNrdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfmt7vliqDmoYzpnaInKTtcclxuICAgICAgY29uc3Qgc2hvcnRjdXQgPSByZXF1aXJlKFwiQHN5c3RlbS5zaG9ydGN1dFwiKVxyXG4gICAgICBzaG9ydGN1dC5oYXNJbnN0YWxsZWQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYXNJbnN0YWxsZWQgc3VjY2VzcyByZXQtLS0nICsgcmV0KTtcclxuICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICfmoYzpnaLlm77moIflt7LliJvlu7onLFxyXG4gICAgICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaG9ydGN1dC5pbnN0YWxsKHtcclxuICAgICAgICAgICAgICBtZXNzYWdlOiAn5re75Yqg5qGM6Z2i5pa55byP5pu05pa55L6/JyxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxpbmcgY3JlYXRlU2hvcnRDdXQgc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxpbmcgY3JlYXRlU2hvcnRDdXQgZmFpbCcpO1xyXG4gICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGFzSW5zdGFsbGVkIGZhaWwgcmV0LS0tJyArIGVycm9tc2cpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcHVzaHdlYihpKSB7XHJcblxyXG5cclxuICAgICAgdmFyIHVybCA9ICcnXHJcbiAgICAgIGlmIChpID09PSAxKSB7XHJcbiAgICAgICAgdXJsID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwxO1xyXG4gICAgICB9IGlmIChpID09PSAyKSB7XHJcbiAgICAgICAgdXJsID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwyO1xyXG4gICAgICB9IGlmIChpID09PSAzKSB7XHJcbiAgICAgICAgdXJsID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkd2Vidmlldy5sb2FkVXJsKHtcclxuICAgICAgICB1cmw6IHVybFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICB9O1xyXG48L3NjcmlwdD4iLCI8aW1wb3J0IG5hbWU9XCJwYWdlcmVjb3JkXCIgc3JjPVwiLi9QYWdlX1JlY29yZC9pbmRleFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwicGFnZWhvbWVcIiBzcmM9XCIuL1BhZ2VfSG9tZS9pbmRleFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwicGFnZXVzZXJcIiBzcmM9XCIuL1BhZ2VfVXNlci9pbmRleFwiPjwvaW1wb3J0PlxuXG5cbjx0ZW1wbGF0ZT5cblx0PGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuXHRcdDx0YWJzIG9uY2hhbmdlPVwiY2hhbmdlVGFiYWN0aXZlXCI+XG5cdFx0XHQ8dGFiLWNvbnRlbnQ+XG5cdFx0XHRcdDxibG9jayBmb3I9XCJkYXRhcy5saXN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8cGFnZWhvbWUgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n6aaW6aG1Jz90cnVlOmZhbHNlfX1cIj48L3BhZ2Vob21lPlxuXHRcdFx0XHRcdFx0PHBhZ2VyZWNvcmQgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n5q2l5pWwJz90cnVlOmZhbHNlfX1cIj48L3BhZ2VyZWNvcmQ+XG5cdFx0XHRcdFx0XHQ8cGFnZXVzZXIgaWY9XCJ7eyRpdGVtLnRpdGxlPT0n5oiR55qEJz90cnVlOmZhbHNlfX1cIj48L3BhZ2V1c2VyPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Jsb2NrPlxuXHRcdFx0PC90YWItY29udGVudD5cblxuXHRcdFx0PHRhYi1iYXIgY2xhc3M9XCJ0YWJfYmFyXCI+XG5cdFx0XHRcdDxibG9jayBmb3I9XCJkYXRhcy5saXN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRhYl9pdGVtXCI+XG5cdFx0XHRcdFx0XHQ8aW1hZ2Ugc3JjPVwie3skaXRlbS5zaG93PyRpdGVtLnBpY19jaG9pY2U6JGl0ZW0ucGljfX1cIiAvPlxuXHRcdFx0XHRcdFx0PHRleHQgc3R5bGU9XCJjb2xvcjoge3skaXRlbS5jb2xvcn19XCI+e3skaXRlbS50aXRsZX19PC90ZXh0PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Jsb2NrPlxuXHRcdFx0PC90YWItYmFyPlxuXHRcdDwvdGFicz5cblxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cblx0LmNvbnRhaW5lciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcblx0fVxuXG5cblx0LnRhYl9iYXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cdFx0d2lkdGg6IDc1MHB4O1xuXHRcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG5cdFx0Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XG5cdH1cblxuXHQudGFiX2l0ZW0ge1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRwYWRkaW5nLXRvcDogMTRweDtcblx0XHRwYWRkaW5nLWJvdHRvbTogMTFweDtcblx0XHR3aWR0aDogMTcxcHg7XG5cdFx0aGVpZ2h0OiAxMDQuMnB4O1xuXHR9XG5cblx0LnRhYl9pdGVtIGltYWdlIHtcblx0XHR3aWR0aDogNTBweDtcblx0XHRoZWlnaHQ6IDUwcHg7XG5cdFx0cmVzaXplLW1vZGU6IGNvbnRhaW47XG5cdFx0b3BhY2l0eTogMC41O1xuXHR9XG5cblx0LnRhYl9pdGVtIGltYWdlOmFjdGl2ZSB7XG5cdFx0d2lkdGg6IDUwcHg7XG5cdFx0aGVpZ2h0OiA1MHB4O1xuXHRcdHJlc2l6ZS1tb2RlOiBjb250YWluO1xuXHR9XG5cblx0LnRhYl9pdGVtIHRleHQge1xuXHRcdGZvbnQtc2l6ZTogMjFweDtcblx0XHRtYXJnaW4tdG9wOiAxMHB4O1xuXHR9XG5cblx0Lml0ZW0tY29udGFpbmVyIHtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0fVxuXG5cdC5tYWluLXRleHQge1xuXHRcdGZvbnQtc2l6ZTogMTAwcHg7XG5cdFx0Y29sb3I6ICM1ZjllYTA7XG5cdH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0cHJpdmF0ZToge1xuXHRcdFx0ZGF0YXM6IHtcblx0XHRcdFx0Y29sb3Jfbm9ybWFsOiAnI0M4QzhDOCcsXG5cdFx0XHRcdGNvbG9yX2FjdGl2ZTogJyMwMEIyRkYnLFxuXHRcdFx0XHRzaG93OiB0cnVlLFxuXHRcdFx0XHRsaXN0OiBbe1xuXHRcdFx0XHRcdGk6IDAsXG5cdFx0XHRcdFx0Y29sb3I6ICcjRkY3NTAwJyxcblx0XHRcdFx0XHRwaWM6ICcvQ29tbW9uL2ltZy9iYXJfMS5wbmcnLFxuXHRcdFx0XHRcdHBpY19jaG9pY2U6ICcvQ29tbW9uL2ltZy9iYXJfMTEucG5nJyxcblx0XHRcdFx0XHRzaG93OiB0cnVlLFxuXHRcdFx0XHRcdHRpdGxlOiAn6aaW6aG1J1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aTogMSxcblx0XHRcdFx0XHRjb2xvcjogJyM4Nzg3ODcnLFxuXHRcdFx0XHRcdHBpYzogJy9Db21tb24vaW1nL2Jhcl8yLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy9Db21tb24vaW1nL2Jhcl8yMi5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0XHRcdHRpdGxlOiAn5q2l5pWwJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aTogMixcblx0XHRcdFx0XHRjb2xvcjogJyM4Nzg3ODcnLFxuXHRcdFx0XHRcdHBpYzogJy9Db21tb24vaW1nL2Jhcl8zLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy9Db21tb24vaW1nL2Jhcl8zMy5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0XHRcdHRpdGxlOiAn5oiR55qEJ1xuXHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH1cblxuXG5cdFx0fSxcblx0XHRjaGFuZ2VUYWJhY3RpdmU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YXMubGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgZWxlbWVudCA9IHRoaXMuZGF0YXMubGlzdFtpXTtcblx0XHRcdFx0ZWxlbWVudC5zaG93ID0gZmFsc2U7XG5cdFx0XHRcdGVsZW1lbnQuY29sb3IgPSB0aGlzLmRhdGFzLmNvbG9yX25vcm1hbDtcblx0XHRcdFx0aWYgKGkgPT09IGUuaW5kZXgpIHtcblx0XHRcdFx0XHRlbGVtZW50LnNob3cgPSB0cnVlO1xuXHRcdFx0XHRcdGVsZW1lbnQuY29sb3IgPSB0aGlzLmRhdGFzLmNvbG9yX2FjdGl2ZTtcblxuXHRcdFx0XHRcdGlmIChlLmluZGV4ID09PSAwKSB7XG5cdFx0XHRcdFx0XHQkdXRpbHMuaGlkZUJhbmVyQWQoKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkdXRpbHMudmlld0Jhbm5lcigpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b25Jbml0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR9LFxuXHRcdGFzeW5jIG9uU2hvdyhvcHRpb25zKSB7XG5cblx0XHRcdCR1bWVuZ19zdGF0LnJlc3VtZSh0aGlzKVxuXHRcdFx0Y29uc29sZS5sb2coJ+S4u+mhtSBvblNob3coKS0tLS0tLS0tLS0tLS0tLS0tPicpO1xuXHRcdFx0dGhpcy5nZXRVc2VyKCk7XG5cblx0XHRcdC8v5pi+56S6YmFubmVyIOW5v+WRiumrmOW6pu+8jOW6lemDqOe8qei/m1xuXHRcdFx0Ly8gJHV0aWxzLnNob3dCYW5uZXJBZCgxNzUpXG5cblx0XHR9LFxuXHRcdGdldFVzZXIoKSB7XG5cdFx0XHQkYXBpcy51c2VyLmdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCfnlKjmiLfkv6Hmga8tLS0tLS0tLS0tLS0tLS0tLT4nICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG5cdFx0XHRcdHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudXNlckRhdGEubG9naW5QaG9uZSA9IHJlcy5kYXRhLmxvZ2luUGhvbmVcblx0XHRcdFx0dGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51c2VyRGF0YS51c2VySWQgPSByZXMuZGF0YS51c2VySWRcblx0XHRcdFx0dGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51c2VyRGF0YS5iYWxhbmNlID0gcmVzLmRhdGEuYmFsYW5jZVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdG9uSGlkZSgpIHtcblx0XHRcdCR1bWVuZ19zdGF0LnBhdXNlKHRoaXMpOy8v5Zyob25IaWRl5pa55rOV55qE56ys5LiA6KGM5Yqg5YWl5q2k5Luj56CBXG5cdFx0XHQvL+mcgOimgemakOiXj+aXtuWwsemUgOavgWJhbm5lclxuXHRcdFx0Ly8gJHV0aWxzLmRlc3Ryb3lCYW5uZXIoKTtcblx0XHR9XG5cdH07XG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxzdGFjayBzdHlsZT1cInt7c3R5bGV9fVwiPlxuICAgIDxjYW52YXMgaWQ9XCJ7e2lkfX1cIiBjbGFzcz1cImNhbnZhc1wiPjwvY2FudmFzPlxuICAgIDxkaXYgY2xhc3M9XCJzbG90XCI+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gIDwvc3RhY2s+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBjb25zdCB0b0FuZ2xlID0gYSA9PiAoYSAvIDE4MCkgKiBNYXRoLlBJO1xuICBjb25zdCBwZXJjZW50ID0gYSA9PiB0b0FuZ2xlKChhIC8gMTAwKSAqIDM2MCk7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGEoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiZWdpbkFuZ2xlOiB0b0FuZ2xlKHRoaXMuc0FuZ2xlKSxcbiAgICAgICAgc3RhcnRBbmdsZTogdG9BbmdsZSh0aGlzLnNBbmdsZSksXG4gICAgICAgIGVuZEFuZ2xlOiBwZXJjZW50KHRoaXMucGVyY2VudCkgKyB0b0FuZ2xlKHRoaXMuc0FuZ2xlKSxcbiAgICAgICAgY29sb3I6IHRoaXMuc3Ryb2tlQ29sb3JcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHByb3BzOiB7XG4gICAgICBwZXJjZW50OiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSAxMDA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMzAwXG4gICAgICB9LFxuICAgICAgc3Ryb2tlV2lkdGg6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAyMFxuICAgICAgfSxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCIjMmQ4Y2YwXCJcbiAgICAgIH0sXG4gICAgICBzdHJva2VMaW5lY2FwOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCJyb3VuZFwiIC8vcm91bmR8c3F1YXJlfGJ1dHRcbiAgICAgIH0sXG4gICAgICB0cmFpbFdpZHRoOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMjBcbiAgICAgIH0sXG4gICAgICB0cmFpbENvbG9yOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCIjZWFlZWYyXCJcbiAgICAgIH0sXG4gICAgICBzaG93VHJhaWw6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHNBbmdsZToge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgIH0sXG4gICAgICBhbnRpY2xvY2t3aXNlOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgaWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcImNhbnZhc0lkXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIHN0eWxlKCkge1xuICAgICAgICByZXR1cm4gYHdpZHRoOiAke3RoaXMuc2l6ZX1weDsgaGVpZ2h0OiAke3RoaXMuc2l6ZX1weDtgO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkluaXQoKSB7XG4gICAgICB0aGlzLiR3YXRjaChcInN0cm9rZUNvbG9yXCIsIFwid2F0Y2hTdHJva2VDb2xvckNoYW5nZVwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwicGVyY2VudFwiLCBcIndhdGNoUGVyY2VudENoYW5nZVwiKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuJGVsZW1lbnQodGhpcy5pZCk7XG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgd2F0Y2hTdHJva2VDb2xvckNoYW5nZShuZXdWYWwpIHtcbiAgICAgIHRoaXMuY29sb3IgPSBuZXdWYWw7XG4gICAgfSxcblxuICAgIHdhdGNoUGVyY2VudENoYW5nZShuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA8PSAwKSB7IG5ld1ZhbCA9IDA7IH1cbiAgICAgIGlmIChuZXdWYWwgPj0gMTAwKSB7IG5ld1ZhbCA9IDEwMDsgfVxuICAgICAgdGhpcy5lbmRBbmdsZSA9IHBlcmNlbnQobmV3VmFsKSArIHRoaXMuYmVnaW5BbmdsZTtcblxuICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG5cbiAgICAgIHRoaXMuZHJhdygpO1xuICAgIH0sXG5cbiAgICBkcmF3KCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbnRpY2xvY2t3aXNlLFxuICAgICAgICBzdHJva2VMaW5lY2FwLFxuICAgICAgICBzaG93VHJhaWwsXG4gICAgICAgIHNpemUsXG4gICAgICAgIHN0cm9rZVdpZHRoLFxuICAgICAgICBjb2xvcixcbiAgICAgICAgdHJhaWxXaWR0aCxcbiAgICAgICAgdHJhaWxDb2xvcixcbiAgICAgICAgY3R4XG4gICAgICB9ID0gdGhpcztcbiAgICAgIC8v5ZyG55qE5ZyG5b+D5L2N572uXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHNpemUgLyAyO1xuICAgICAgY29uc3QgcmFkaXVzID0gcG9zaXRpb24gLSBzdHJva2VXaWR0aCAvIDI7XG4gICAgICBjb25zdCBwID0gMiAqIE1hdGguUEk7XG4gICAgICBjb25zdCBiZWdpbkFuZ2xlID0gYW50aWNsb2Nrd2lzZSA/IHAgLSB0aGlzLmJlZ2luQW5nbGUgOiB0aGlzLmJlZ2luQW5nbGU7XG4gICAgICBjb25zdCBzdGFydEFuZ2xlID0gYW50aWNsb2Nrd2lzZSA/IHAgLSB0aGlzLnN0YXJ0QW5nbGUgOiB0aGlzLnN0YXJ0QW5nbGU7XG4gICAgICBjb25zdCBlbmRBbmdsZSA9IGFudGljbG9ja3dpc2UgPyBwIC0gdGhpcy5lbmRBbmdsZSA6IHRoaXMuZW5kQW5nbGU7XG4gICAgICBjb25zdCBzdGVwID0gKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSkgLyAxMDA7XG4gICAgICBsZXQgdGVtcEVuZEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgICAgICAvL1xiIOe7mOWItuiDjOaZr+eOr1xuICAgICAgICBpZiAoc2hvd1RyYWlsKSB7XG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGN0eC5hcmMocG9zaXRpb24sIHBvc2l0aW9uLCByYWRpdXMsIGJlZ2luQW5nbGUsIDAuNSk7XG4gICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRyYWlsV2lkdGg7XG4gICAgICAgICAgY3R4LmxpbmVDYXAgPSBzdHJva2VMaW5lY2FwO1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRyYWlsQ29sb3I7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRyYXdDaXJjbGUodGVtcEVuZEFuZ2xlKSB7XG4gICAgICAgIC8vIOe7mOWItui/m+W6plxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoXG4gICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgIGJlZ2luQW5nbGUsXG4gICAgICAgICAgdGVtcEVuZEFuZ2xlLFxuICAgICAgICAgIGFudGljbG9ja3dpc2VcbiAgICAgICAgKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmxpbmVDYXAgPSBzdHJva2VMaW5lY2FwO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG5cbiAgICAgIChmdW5jdGlvbiBzdGFydERyYXcoY3R4KSB7XG4gICAgICAgIHRlbXBFbmRBbmdsZSArPSBzdGVwO1xuICAgICAgICBpZiAoIWFudGljbG9ja3dpc2UgJiYgdGVtcEVuZEFuZ2xlIDw9IGJlZ2luQW5nbGUpIHtcbiAgICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPj0gMiAqIE1hdGguUEkgKyBiZWdpbkFuZ2xlKSB7XG4gICAgICAgICAgdGVtcEVuZEFuZ2xlID0gMiAqIE1hdGguUEkgKyBiZWdpbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbnRpY2xvY2t3aXNlICYmIHRlbXBFbmRBbmdsZSA8PSBiZWdpbkFuZ2xlIC0gMiAqIE1hdGguUEkpIHtcbiAgICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlIC0gMiAqIE1hdGguUEk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGVtcEVuZEFuZ2xlID49IGJlZ2luQW5nbGUpIHtcbiAgICAgICAgICB0ZW1wRW5kQW5nbGUgPSBiZWdpbkFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMHg3ZmZmZmZmZiwgMHg3ZmZmZmZmZik7XG4gICAgICAgIGRyYXdCYWNrZ3JvdW5kKCk7XG4gICAgICAgIGRyYXdDaXJjbGUodGVtcEVuZEFuZ2xlKTtcbiAgICAgICAgX3RoaXMuc3RhcnRBbmdsZSA9IGFudGljbG9ja3dpc2VcbiAgICAgICAgICA/IDIgKiBNYXRoLlBJIC0gdGVtcEVuZEFuZ2xlXG4gICAgICAgICAgOiB0ZW1wRW5kQW5nbGU7XG4gICAgICAgIGlmIChjb3VudCA+PSAxMDApIHsgcmV0dXJuIH1cbiAgICAgICAgY291bnQrKztcbiAgICAgICAgX3RoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzdGFydERyYXcoY3R4KTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSkoY3R4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5riF6Zmk5a6a5pe25ZmoXG4gICAgICovXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLnNsb3Qge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG4gIC5jYW52YXMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImFwZXgtZGlhbG9nXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1hc2sge3tzaG93TW9kYWw/J21hc2stZXhpc3QnOidtYXNrLW5vbmUnfX1cIiBpZj1cInt7dmlzaWJsZX19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCIgc3R5bGU9XCJ7e3NldERpYWxvZ319XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9wXCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlIHt7ZGVmYXVsdE9wdGlvbnMuY2xvc2FibGU/J3RpdGxlLWNsb3NlJzondGl0bGUtbm9uZSd9fVwiPnt7IGRlZmF1bHRQcm9tcHQudGl0bGUgfHwgZGVmYXVsdE9wdGlvbnMudGl0bGUgfHwgdGl0bGUgfX08L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dGFicyBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQxJyB9fVwiIGNsYXNzPVwidGFic1wiIG9uY2hhbmdlPVwiY2hhbmdlVGFiYWN0aXZlXCI+XG4gICAgICAgICAgICA8dGFiLWJhciBjbGFzcz1cInRhYi1iYXJcIj5cbiAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuWlszwvdGV4dD5cbiAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPueUtzwvdGV4dD5cbiAgICAgICAgICAgIDwvdGFiLWJhcj5cbiAgICAgICAgICA8L3RhYnM+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24tY29udGVudDogY2VudGVyXCIgaWY9XCJ7eyBkaWFsb2dUeXBlID09PSAncHJvbXB0JyB9fVwiPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZm9jdXNcIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IHZhbHVlIH19XCIgcGxhY2Vob2xkZXI9XCJ7eyBkZWZhdWx0UHJvbXB0LnBsYWNlaG9sZGVyIH19XCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdlXCIgbWF4bGVuZ3RoPVwie3sgZGVmYXVsdFByb21wdC5tYXhsZW5ndGggPT09IC0xPycnOmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoIH19XCIgb25lbnRlcmtleWNsaWNrPVwiYmluZEVudGVyXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPuatpTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDIwcHhcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQxJyB9fVwiPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiaWRrZ1wiIHR5cGU9XCJ7eyBkZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSB9fVwiIHN0eWxlPVwie3tkZWZhdWx0UHJvbXB0LmlucHV0U3R5bGV9fVwiIHZhbHVlPVwie3sga2cgfX1cIiBwbGFjZWhvbGRlcj1cIui+k+WFpeS9k+mHjVwiIG9uY2hhbmdlPVwiYmluZENoYW5nZWtnXCIgbWF4bGVuZ3RoPVwiM1wiIG9uZW50ZXJrZXljbGljaz1cImJpbmRFbnRlcmtnXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPmtnPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDIwcHhcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQxJyB9fVwiPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiaWRjbVwiIHR5cGU9XCJ7eyBkZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSB9fVwiIHN0eWxlPVwie3tkZWZhdWx0UHJvbXB0LmlucHV0U3R5bGV9fVwiIHZhbHVlPVwie3sgY20gfX1cIiBwbGFjZWhvbGRlcj1cIui+k+WFpei6q+mrmFwiIG9uY2hhbmdlPVwiYmluZENoYW5nZWNtXCIgbWF4bGVuZ3RoPVwiM1wiIG9uZW50ZXJrZXljbGljaz1cImJpbmRFbnRlcmNtXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPmNtPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDEwcHhcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQxJyB9fVwiPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiaWRhZ2VcIiB0eXBlPVwie3sgZGVmYXVsdFByb21wdC5maWVsZHR5cGUgfX1cIiBzdHlsZT1cInt7ZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlfX1cIiB2YWx1ZT1cInt7IGFnZSB9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5bm06b6EXCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdlYWdlXCIgbWF4bGVuZ3RoPVwiM1wiIG9uZW50ZXJrZXljbGljaz1cImJpbmRFbnRlcmFnZVwiIC8+XG4gICAgICAgICAgICA8dGV4dCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5OyBmb250LXNpemU6IDI4cHg7IGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDg4cHhcIj7lsoE8L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuIHt7ZGlhbG9nVHlwZSA9PT0gJ2FsdGVyJ3x8dGhpcy52ZXJ0aWNhbD09PXRydWU/J2J0bi12ZXJ0aWNhbCc6J2J0bi1ob3Jpem9udGFsJ319XCI+XG4gICAgICAgICAgPGJsb2NrIGlmPVwie3tkZWZhdWx0T3B0aW9ucy5idXR0b25zLmxlbmd0aD09PTB9fVwiPlxuICAgICAgICAgICAgPGRpdiBpZj1cInt7ZGlhbG9nVHlwZSE9PSdhbHRlcid9fVwiIGNsYXNzPVwiYnRuYm94MVwiIG9uY2xpY2s9XCJiaW5kQ2FuY2VsXCI+XG4gICAgICAgICAgICAgIDx0ZXh0Pnt7IGRlZmF1bHRPcHRpb25zLmNhbmNlbCB9fTwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBvbmNsaWNrPVwiYmluZEFmZmlybVwiIGNsYXNzPVwiYnRuYm94XCI+XG4gICAgICAgICAgICAgIDx0ZXh0Pnt7IGRlZmF1bHRPcHRpb25zLmFmZmlybSB9fTwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYmxvY2s+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6IHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgICBzZXREaWFsb2c6IHt9LFxuICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICBrZzogXCJcIixcbiAgICAgIGNtOiBcIlwiLFxuICAgICAgYWdlOiBcIlwiLFxuICAgICAgc2V4OiAwLC8v5oCn5YirICAxIOeUt++8jDAg5aWzXG4gICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICBjbG9zYWJsZTogZmFsc2UsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICBidXR0b25zOiBbXSxcbiAgICAgICAgY2FuY2VsOiBcIuWPlua2iFwiLFxuICAgICAgICBhZmZpcm06IFwi56Gu5a6aXCJcbiAgICAgIH0sXG4gICAgICBkZWZhdWx0UHJvbXB0OiB7XG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAga2c6IFwiXCIsXG4gICAgICAgIGNtOiBcIlwiLFxuICAgICAgICBhZ2U6IFwiXCIsXG4gICAgICAgIGZpZWxkdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwi6K+36L6T5YWl5paH5pysXCIsXG4gICAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgICAgaWRrZzogZmFsc2UsXG4gICAgICAgIGlucHV0U3R5bGU6IHt9LFxuICAgICAgICBtYXhsZW5ndGg6IC0xXG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wczoge1xuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwi6buY6K6k5qCH6aKYXCJcbiAgICAgIH0sXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCLpu5jorqTlhoXlrrlcIlxuICAgICAgfSxcbiAgICAgIGRpYWxvZ1N0eWxlOiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH0sXG4gICAgICBkaWFsb2dUeXBlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCJ0ZXh0XCJcbiAgICAgIH0sXG4gICAgICB2aXNpYmxlOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICB9LFxuICAgICAgcHJvbXB0OiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH1cbiAgICB9LFxuICAgIG9uSW5pdCgpIHtcbiAgICAgIHRoaXMuJHdhdGNoKFwidmlzaWJsZVwiLCBcIm1vZGFsSGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwiZGlhbG9nU3R5bGVcIiwgXCJkaWFsb2dTdHlsZUhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRlZmF1bHRQcm9tcHQudmFsdWVcIiwgXCJ2YWx1ZUhhbmRsZXJcIik7XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgIH0sXG4gICAgb25SZWFkeSgpIHtcbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIgJiYgdGhpcy4kdmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudChcImZvY3VzXCIpLmZvY3VzKHsgZm9jdXM6IHRoaXMuZGVmYXVsdFByb21wdC5mb2N1cyB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHQxXCIgJiYgdGhpcy4kdmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudChcImlka2dcIikuZm9jdXMoeyBpZGtnOiB0aGlzLmRlZmF1bHRQcm9tcHQuaWRrZyB9KTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgdmFsdWVIYW5kbGVyKG5ld1YsIG9sZFYpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IG5ld1Y7XG4gICAgfSxcbiAgICBvcHRpb25zSGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICBuZXdWLmNsb3NhYmxlID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2xvc2FibGUgPSBuZXdWLmNsb3NhYmxlKSA6IGZhbHNlO1xuICAgICAgbmV3Vi50aXRsZSA/ICh0aGlzLmRlZmF1bHRPcHRpb25zLnRpdGxlID0gbmV3Vi50aXRsZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5jb250ZW50ID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY29udGVudCA9IG5ld1YuY29udGVudCkgOiBcIlwiO1xuICAgICAgbmV3Vi5idXR0b25zID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYnV0dG9ucyA9IG5ld1YuYnV0dG9ucykgOiBbXTtcbiAgICAgIG5ld1YuY2FuY2VsID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2FuY2VsID0gbmV3Vi5jYW5jZWwpIDogXCJcIjtcbiAgICAgIG5ld1YuYWZmaXJtID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYWZmaXJtID0gbmV3Vi5hZmZpcm0pIDogXCJcIjtcbiAgICB9LFxuICAgIHByb21wdEhhbmRsZXIobmV3Viwgb2xkVikge1xuICAgICAgbmV3Vi50aXRsZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQudGl0bGUgPSBuZXdWLnRpdGxlKSA6IFwiXCI7XG4gICAgICBuZXdWLmNvbnRlbnQgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmNvbnRlbnQgPSBuZXdWLmNvbnRlbnQpIDogXCJcIjtcbiAgICAgIG5ld1YudmFsdWUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LnZhbHVlID0gbmV3Vi52YWx1ZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5rZyA/ICh0aGlzLmRlZmF1bHRQcm9tcHQua2cgPSBuZXdWLmtnKSA6IFwiXCI7XG4gICAgICBuZXdWLmNtID8gKHRoaXMuZGVmYXVsdFByb21wdC5jbSA9IG5ld1YuY20pIDogXCJcIjtcbiAgICAgIG5ld1YuYWdlID8gKHRoaXMuZGVmYXVsdFByb21wdC5hZ2UgPSBuZXdWLmFnZSkgOiBcIlwiO1xuICAgICAgbmV3Vi5maWVsZHR5cGUgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSA9IG5ld1YuZmllbGR0eXBlKSA6IFwiXCI7XG4gICAgICBuZXdWLnBsYWNlaG9sZGVyID8gKHRoaXMuZGVmYXVsdFByb21wdC5wbGFjZWhvbGRlciA9IG5ld1YucGxhY2Vob2xkZXIpIDogXCJcIjtcbiAgICAgIG5ld1YuZm9jdXMgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmZvY3VzID0gbmV3Vi5mb2N1cykgOiBmYWxzZTtcbiAgICAgIG5ld1YuaW5wdXRTdHlsZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSA9IG5ld1YuaW5wdXRTdHlsZSkgOiB7fTtcbiAgICB9LFxuICAgIGRpYWxvZ1N0eWxlSGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdWLCBvbGRWKTtcbiAgICAgIHRoaXMuc2V0RGlhbG9nID0gbmV3VjtcbiAgICB9LFxuICAgIHJlc2V0RGF0YSgpIHtcbiAgICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgICAgYnV0dG9uczogW10sXG4gICAgICAgICAgY2FuY2VsOiBcIuWPlua2iFwiLFxuICAgICAgICAgIGFmZmlybTogXCLnoa7lrppcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRQcm9tcHQgPSB7XG4gICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICBmaWVsZHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6K+36L6T5YWl5paH5pysXCIsXG4gICAgICAgICAgZm9jdXM6IGZhbHNlLFxuICAgICAgICAgIGlucHV0U3R5bGU6IHt9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0RGlhbG9nID0ge1xuXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzLiR3YXRjaChcIm9wdGlvbnNcIiwgXCJvcHRpb25zSGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwicHJvbXB0XCIsIFwicHJvbXB0SGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwiZGlhbG9nU3R5bGVcIiwgXCJkaWFsb2dTdHlsZUhhbmRsZXJcIik7XG4gICAgICB0aGlzLiR3YXRjaChcImRlZmF1bHRQcm9tcHQudmFsdWVcIiwgXCJ2YWx1ZUhhbmRsZXJcIik7XG4gICAgfSxcbiAgICBtb2RhbEhhbmRsZXIobmV3Viwgb2xkVikge1xuICAgICAgdGhpcy5zaG93TW9kYWwgPSBuZXdWO1xuICAgIH0sXG4gICAgYmluZENhbmNlbChldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjYW5jZWxcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICB0aGlzLmtnID0gXCJcIjtcbiAgICAgIHRoaXMuY20gPSBcIlwiO1xuICAgICAgdGhpcy5hZ2UgPSBcIlwiO1xuXG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlKGV2dCkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gZXZ0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5q2l5pWwPSR7dGhpcy52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG4gICAgYmluZENoYW5nZWtnKGV2dCkge1xuXG4gICAgICB0aGlzLmtnID0gZXZ0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5L2T6YeNPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlY20oZXZ0KSB7XG5cbiAgICAgIHRoaXMuY20gPSBldnQudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7ouqvpq5g9JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2VhZ2UoZXZ0KSB7XG5cbiAgICAgIHRoaXMuYWdlID0gZXZ0LnZhbHVlO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5bm06b6EPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgfSxcblxuXG4gICAgYmluZEFmZmlybShldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgICAgICBldnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLiRlbWl0KFwiYWZmaXJtXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICB9XG5cblxuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHQxXCIpIHtcbiAgICAgICAgZXZ0LmtnID0gdGhpcy5rZztcbiAgICAgICAgZXZ0LmNtID0gdGhpcy5jbTtcbiAgICAgICAgZXZ0LmFnZSA9IHRoaXMuYWdlO1xuICAgICAgICBldnQuc2V4ID0gdGhpcy5zZXg7XG4gICAgICAgIHRoaXMuJGVtaXQoXCJhZmZpcm1cIiwgeyBldmVudDogZXZ0IH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgYmluZEFmZmlybe+8miR7ZXZ0LmtnfSzouqvpq5jvvJoke2V2dC5jbX0s5bm06b6E77yaJHtldnQuYWdlfSxzZXg6JHtldnQuc2V4fWApO1xuICAgICAgICB0aGlzLmtnID0gXCJcIjtcbiAgICAgICAgdGhpcy5jbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuYWdlID0gXCJcIjtcbiAgICAgICAgdGhpcy5zZXggPSAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmluZEVudGVyKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5q2l5pWwPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImVudGVyXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICAgIGlmICh0aGlzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudChcImZvY3VzXCIpLmZvY3VzKHsgZm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICB0aGlzLnZhbHVlID0gXCJcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRFbnRlcmtnKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5L2T6YeNPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy5rZyA9IGV2dC52YWx1ZTtcblxuICAgIH0sXG4gICAgYmluZEVudGVyY20oZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7ouqvpq5g9JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLmNtID0gZXZ0LnZhbHVlO1xuICAgIH0sXG4gICAgYmluZEVudGVyYWdlKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc29sZS5sb2coYC0tLS0+5bm06b6EPSR7ZXZ0LnZhbHVlfWApO1xuICAgICAgdGhpcy5hZ2UgPSBldnQudmFsdWU7XG4gICAgfSxcblxuXG4gICAgLy/liIfmjaLnlLflpbNcbiAgICBjaGFuZ2VUYWJhY3RpdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmluZGV4KVxuICAgICAgdGhpcy5zZXggPSBlLmluZGV4O1xuICAgIH0sXG4gIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIC5tYXNrIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgZmxleDogMTtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICYtZXhpc3Qge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1LCA1LCA1LCAwLjYpO1xuICAgIH1cbiAgICAmLW5vbmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuICAgIC5kaWFsb2cge1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICBib3JkZXItcmFkaXVzOiAzMnB4O1xuICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgIHdpZHRoOiA4NCU7XG4gICAgICAmLWJvcmRlciB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlN2U3ZTc7XG4gICAgICB9XG4gICAgICAuYm94IHtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgLnRvcCB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgJi1jbG9zZSB7XG4gICAgICAgICAgICAgIHdpZHRoOiA5NSU7XG4gICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJi1ub25lIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC5jbG9zZSB7XG4gICAgICAgICAgICB3aWR0aDogNSU7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtMjBweDtcbiAgICAgICAgICAgIHRleHQge1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDUwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5jb250ZW50IHtcbiAgICAgICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICBjb2xvcjogI2EwYTBhMDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5O1xuICAgICAgICAgIHdpZHRoOiA4NSU7XG4gICAgICAgICAgaGVpZ2h0OiA4OHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiA2MHB4O1xuICAgICAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxNnB4O1xuICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDE2cHg7XG4gICAgICAgIH1cblxuICAgICAgICAudGFicyB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLnRhYi1iYXIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogI2JiYmJiYjtcbiAgICAgICAgICBjb2xvcjogI2JiYmJiYjtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDU0cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnRhYi10ZXh0IHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgIHdpZHRoOiAyNTBweDtcbiAgICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzAwYjJmZjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICB9XG4gICAgICAgIC50YWItdGV4dDphY3RpdmUge1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGIyZmY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC5idG4ge1xuICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIC5idG5ib3gge1xuICAgICAgICAgIHRleHQge1xuICAgICAgICAgICAgd2lkdGg6IDI3MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiA4OHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGIyZmY7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bmJveDEge1xuICAgICAgICAgIHRleHQge1xuICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTtcbiAgICAgICAgICAgIHdpZHRoOiAyNzBweDtcbiAgICAgICAgICAgIGhlaWdodDogODhweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgY29sb3I6ICM2NjY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLmJ0bmJveDphY3RpdmUge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlN2U3ZTc7XG4gICAgICAgIH1cbiAgICAgICAgJi12ZXJ0aWNhbCB7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAuYnRuYm94IHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAmLWhvcml6b250YWwge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgLmJ0bmJveCB7XG4gICAgICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwid2FycFwiPlxyXG4gICAgPGRpdiBzdHlsZT1cInotaW5kZXg6IHt7ekluZGV4fX07XCIgY2xhc3M9XCJtYXNrXCIgaWY9XCJ7e3Nob3dQb3AmJiFiYWNrSW1nfX1cIj48L2Rpdj5cclxuICAgIDxpbWFnZSBzcmM9XCJ7e2JhY2tJbWd9fVwiIGlmPVwie3tzaG93UG9wJiZiYWNrSW1nfX1cIiBjbGFzcz1cImltZ0JhY2tcIj48L2ltYWdlPlxyXG4gICAgPCEtLSDlsY/luZXlrr3luqblsI/kuo4xMjAwIC0tPlxyXG4gICAgPGRpdiBpZj1cInt7c2hvd1BvcCYmIXJlc2VydmVEaWFsb2dTdHlsZX19XCIgc3R5bGU9XCIgcG9zaXRpb246Zml4ZWQ7IGJvdHRvbTp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBsZWZ0Ont7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHJpZ2h0Ont7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IGJvcmRlci1yYWRpdXM6e3soMjQvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDtcIiBjbGFzcz1cInBvcHVwXCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCIgaGVpZ2h0Ont7KDU2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHBhZGRpbmctbGVmdDoge3soMjQvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcGFkZGluZy1yaWdodDoge3soMjQvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDtcIj5cclxuICAgICAgICA8dGV4dCBzdHlsZT1cIiBmb250LXNpemU6IHt7KDIwL2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7XCIgY2xhc3M9XCJ0aXRsZVwiPnt7IHRpdGxlLnRyaW0oKSB8fCBcIueUqOaIt+WNj+iurumakOengeaUv+etluaPkOekulwiIH19PC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmctbGVmdDoge3soMjQvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcGFkZGluZy1yaWdodDoge3soMjQvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDtcIiBjbGFzcz1cImJvZHlcIj5cclxuICAgICAgICA8c2xvdD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNXB4OyBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpXCIgaWQ9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgIOacrOacjeWKoemcgOimgVxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDBcIj7ogZTnvZE8L3NwYW4+XHJcbiAgICAgICAgICAgIO+8jOiwg+eUqFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDBcIj7nlLXor508L3NwYW4+XHJcbiAgICAgICAgICAgIOOAgVxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDBcIj7kvY3nva48L3NwYW4+XHJcbiAgICAgICAgICAgIOadg+mZkOOAgeiOt+WPluiuvuWkh+OAgee9kee7nOOAgem6puWFi+mjjuOAgei/kOWKqOOAgeWBpeW6t+S/oeaBr+OAgueCueWHu+KAnOWQjOaEj+KAne+8jOWNs+ihqOekuuaCqOWQjOaEj+S4iui/sOWGheWuueWPilxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIgc3R5bGU9XCJjb2xvcjogIzAwN2RmZjsgZm9udC13ZWlnaHQ6IDcwMFwiPlhY55So5oi35Y2P6K6uPC9hPlxyXG4gICAgICAgICAgICDjgIFcclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiIHN0eWxlPVwiY29sb3I6ICMwMDdkZmY7IGZvbnQtd2VpZ2h0OiA3MDBcIj7lhbPkuo5YWOmakOengeivtOaYjjwvYT5cclxuICAgICAgICAgICAg44CCXHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPC9zbG90PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBpZj1cInt7c2hvd0Zvb3Rlcn19XCJzdHlsZT1cImhlaWdodDp7eyg1Ni9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBwYWRkaW5nLWxlZnQ6IHt7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHBhZGRpbmctcmlnaHQ6IHt7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IG1hcmdpbi10b3A6e3soOC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4XCIgY2xhc3M9XCJmb290ZXJcIj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPVwiaGVpZ2h0Ont7KDQwL2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IGZvbnQtc2l6ZTp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBtYXJnaW4tcmlnaHQ6e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgd2lkdGg6e3soOTg0LSgxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGgqMykvMn19cHggXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5ouS57udXCIgY2xhc3M9XCJjYW5jZWxcIiBvbmNsaWNrPVwiY2FuY2VsXCIgZGlzYWJsZWQ9XCJ7e2J0bmRpc2FibGVkfX1cIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJoZWlnaHQ6e3soNDAvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgZm9udC1zaXplOnt7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHdpZHRoOnt7KDk4NC0oMTYvZGV2aWNlRHApKmRldmljZVdpZHRoKjMpLzJ9fXB4IFwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWQjOaEj1wiIGNsYXNzPVwic3VyZVwiIG9uY2xpY2s9XCJzdXJlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS0g5bGP5bmV5a695bqm5aSn5LqOMTIwMCAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cF93aWR0aFwiIGlmPVwie3tzaG93UG9wJiZyZXNlcnZlRGlhbG9nU3R5bGV9fVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPnt7IHRpdGxlLnRyaW0oKSB8fCBcIueUqOaIt+WNj+iurumakOengeaUv+etluaPkOekulwiIH19PC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJvZHlcIj5cclxuICAgICAgICA8c2xvdD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyNXB4OyBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpXCI+XHJcbiAgICAgICAgICAgIOeUs+ivt1xyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA3MDBcIj7lgaXouqvov5Dliqg8L3NwYW4+XHJcbiAgICAgICAgICAgIOeUqOS6juiOt+WPluatpeaVsOS4juiusOW9leatpeaVsCzor7fmgqjlnKjkvb/nlKjvvIjmiJbnu6fnu63kvb/nlKjvvInmiJHku6znmoTkuqflk4HmnI3liqHliY3ku5Tnu4bpmIXor7tcclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiIHN0eWxlPVwiY29sb3I6ICMwMDdkZmY7IGZvbnQtd2VpZ2h0OiA3MDBcIj7jgIrnlKjmiLfljY/orq7jgIs8L2E+XHJcbiAgICAgICAgICAgIOWSjFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIgc3R5bGU9XCJjb2xvcjogIzAwN2RmZjsgZm9udC13ZWlnaHQ6IDcwMFwiPuOAiumakOengeaUv+etluOAizwvYT5cclxuICAgICAgICAgICAg44CC5oiR5Lus5bCG5YWo5Yqb5L+d6Zqc5oKo55qE5ZCI5rOV5p2D55uK5LiO5L+h5oGv5a6J5YWo77yM5bm25bCG5oyB57ut5Li65oKo5o+Q5L6b5LyY6LSo5pyN5Yqh44CCXHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPC9zbG90PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiIGlmPVwie3tzaG93Rm9vdGVyfX1cIj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiIGNsYXNzPVwiY2FuY2VsXCIgb25jbGljaz1cImNhbmNlbFwiIGRpc2FibGVkPVwie3tidG5kaXNhYmxlZH19XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWQjOaEj1wiIGNsYXNzPVwic3VyZVwiIG9uY2xpY2s9XCJzdXJlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XHJcbiAgLndhcnAge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIC5pbWdCYWNrIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICBib3R0b206IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XHJcbiAgICAgIG9iamVjdC1maXQ6IGZpbGw7XHJcbiAgICB9XHJcbiAgICAubWFzayB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICByaWdodDogMDtcclxuICAgICAgYm90dG9tOiAwO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XHJcbiAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwbXM7XHJcbiAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcclxuICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgICB9XHJcbiAgICAucG9wdXAge1xyXG4gICAgICB3aWR0aDogOTg0cHg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDBtcztcclxuICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG4gICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICAgXHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDgwcHg7XHJcbiAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgbGluZXM6IDE7XHJcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xyXG4gICAgICB9XHJcbiAgICAgIC5ib2R5IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgICAuZm9vdGVyIHtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAuY2FuY2VsIHtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICBjb2xvcjogIzAwN2RmZjtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmNhbmNlbDpkaXNhYmxlZCB7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5zdXJlIHtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3ZGZmO1xyXG4gICAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5wb3B1cF93aWR0aCB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDY2cHg7XHJcbiAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgd2lkdGg6IDY1NnB4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwbXM7XHJcbiAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcclxuICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgICAgIC5oZWFkZXIge1xyXG4gICAgICAgIGhlaWdodDogMTMycHg7XHJcbiAgICAgICAgcGFkZGluZzogMHB4IDU0cHg7XHJcbiAgICAgICAgLnRpdGxlIHtcclxuICAgICAgICAgIGxpbmVzOiAxO1xyXG4gICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLmJvZHkge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCA1NHB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5mb290ZXIge1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGhlaWdodDogMTI2cHg7XHJcbiAgICAgICAgcGFkZGluZzogMHB4IDM2cHg7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMThweDtcclxuICAgICAgICAuY2FuY2VsIHtcclxuICAgICAgICAgIHdpZHRoOiAyNzRweDtcclxuICAgICAgICAgIGhlaWdodDogOTBweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMzZweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICBjb2xvcjogIzAwN2RmZjtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA2NnB4O1xyXG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzNnB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuY2FuY2VsOmRpc2FibGVkIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnN1cmUge1xyXG4gICAgICAgICAgd2lkdGg6IDI3NHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA5MHB4O1xyXG4gICAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDdkZmY7XHJcbiAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDY2cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBkZXZpY2UgZnJvbSBcIkBzeXN0ZW0uZGV2aWNlXCI7XHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YToge1xyXG4gICAgICAvLyDorr7lpIdkcOWAvFxyXG4gICAgICBkZXZpY2VEcDogMCxcclxuICAgICAgLy8g6K6+5aSHXHJcbiAgICAgIGRldmljZVdpZHRoOiAwLFxyXG4gICAgICByZXNlcnZlRGlhbG9nU3R5bGU6IGZhbHNlLFxyXG4gICAgICBidG5kaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIHNjcmVlbldpZHRoOiAwLFxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgIGJhY2tJbWc6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgfSxcclxuICAgICAgekluZGV4OiB7XHJcbiAgICAgICAgZGVmYXVsdDogMTAwMDBcclxuICAgICAgfSxcclxuICAgICAgdGl0bGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogXCLpmpDnp4HmnYPpmZDnlLPor7fkuI7kv53miqTmjIflvJVcIixcclxuICAgICAgfSxcclxuICAgICAgc2hvd1BvcDoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dGb290ZXI6IHsgLy/mmK/lkKbmmL7npLrlupXpg6jkuKTkuKrmjInpkq5cclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uSW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLiR3YXRjaCgnc2hvd1BvcCcsICdjaGFuZ2VDYW5jZWwnKVxyXG4gICAgICBpZiAoZGV2aWNlLmdldEluZm9TeW5jKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gZGV2aWNlLmdldEluZm9TeW5jKCk7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VEcCA9IHJlcy53aW5kb3dXaWR0aCAvIHJlcy5zY3JlZW5EZW5zaXR5O1xyXG4gICAgICAgIHRoaXMuZGV2aWNlV2lkdGggPSByZXMud2luZG93TG9naWNXaWR0aDtcclxuICAgICAgICB0aGlzLmJ0bmRpc2FibGVkID0gZmFsc2VcclxuICAgICAgICB0aGlzLnNjcmVlbldpZHRoID0gcmVzLnNjcmVlbldpZHRoXHJcbiAgICAgICAgaWYgKHJlcy5zY3JlZW5XaWR0aCA+IDEyMDAgJiYgcmVzLnNjcmVlbkhlaWdodCA+IDEyMDApIHtcclxuICAgICAgICAgIHRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kd2F0Y2goJ3NjcmVlbldpZHRoJywgJ2NoYW5nZVNjcmVlbicpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VDYW5jZWwoKSB7XHJcbiAgICAgIGlmICh0aGlzLnNob3dQb3ApIHtcclxuICAgICAgICB0aGlzLmJ0bmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VTY3JlZW4oKSB7XHJcbiAgICAgIGlmICh0aGlzLnNjcmVlbldpZHRoID4gMTIwMCkge1xyXG4gICAgICAgIHRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgICB0aGlzLmJ0bmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgJHByb2Nlc3NEYXRhLnNldFN0b3JhZ2UoXCJfUFJJVkFDXCIsIGZhbHNlKTtcclxuICAgICAgdGhpcy4kZW1pdChcImNhbmNlbFwiKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzdXJlKCkge1xyXG4gICAgICBhd2FpdCAkcHJvY2Vzc0RhdGEuc2V0U3RvcmFnZShcIl9QUklWQUNcIiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuJGVtaXQoXCJhZ3JlZVwiKTtcclxuICAgIH1cclxuICB9O1xyXG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmhlYWRlclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiOTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiOTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjkwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiOTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtc3RhcnRcIixcbiAgICBcInRvcFwiOiBcIjcwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNzAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnRvcF92aWV3XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODI4cHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2dyb3VwMi5wbmdcIixcbiAgICBcImJhY2tncm91bmRTaXplXCI6IFwiY292ZXJcIixcbiAgICBcImJhY2tncm91bmRQb3NpdGlvblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJvdHRvbV92aWV3XCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI3cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjI3cHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNzUwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIi0xMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuaWNvbi1pbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjQ0cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQ0cHhcIlxuICB9LFxuICBcIi5jaXJjbGVcIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiMjVweFwiXG4gIH0sXG4gIFwiLnRleHQtY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi50aXRsZV9zdHBlc1wiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi50aXRsZV9zdHBlc192XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiODBweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLmRldGFpbHNcIjoge1xuICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTc1cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5kZXRhaWwtaXRlbVwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmRldGFpbC12YWx1ZVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICB9LFxuICBcIi5sYXJnZXItdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjQ4cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5sYXJnZXIyLXRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjQ4cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgfSxcbiAgXCIubGFyZ2VyMy10ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzRiNGI0YlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCJcbiAgfSxcbiAgXCIuc21hbGxlci10ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5uLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjVweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiXG4gIH0sXG4gIFwiLnRhYnNcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MjBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjU1cHhcIlxuICB9LFxuICBcIi50YWItYmFyXCI6IHtcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiY29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI1NHB4XCJcbiAgfSxcbiAgXCIudGFiLXRleHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIndpZHRoXCI6IFwiMTUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjY1cHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjc0cHhcIixcbiAgICBcImNvbG9yOmFjdGl2ZVwiOiBcIiMwMDAwMDBcIixcbiAgICBcImJhY2tncm91bmQ6YWN0aXZlXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiMjcwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjOGZmZjM0IDAlXFxcIixcXFwiI2ViZmQ2NlxcXCJdfV19XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIubGlzdFwiOiB7XG4gICAgXCJsYXlvdXRUeXBlXCI6IFwic3RhZ2dlclwiXG4gIH0sXG4gIFwiLml0ZW1cIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmZyYW1lX1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZnJhbWVfaW1hXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNzBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNzBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiOHB4XCJcbiAgfSxcbiAgXCIuZnJhbWVfdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDVweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi50b3Bfdmlld1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjYwMHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9iZ19tZS5wbmdcIixcbiAgICBcImJhY2tncm91bmRTaXplXCI6IFwiY292ZXJcIixcbiAgICBcImJhY2tncm91bmRQb3NpdGlvblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJvdHRvbV92aWV3XCI6IHtcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiLTkwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiXG4gIH0sXG4gIFwiLnRhYl9iYXJcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwid2lkdGhcIjogXCI3NTBweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLnRhYl9pdGVtXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxNHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTFweFwiLFxuICAgIFwid2lkdGhcIjogXCIxNzFweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTA0LjJweFwiXG4gIH0sXG4gIFwiLnRhYl9pdGVtIGltYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwicmVzaXplTW9kZVwiOiBcImNvbnRhaW5cIixcbiAgICBcIm9wYWNpdHlcIjogMC41LFxuICAgIFwid2lkdGg6YWN0aXZlXCI6IFwiNTBweFwiLFxuICAgIFwiaGVpZ2h0OmFjdGl2ZVwiOiBcIjUwcHhcIixcbiAgICBcInJlc2l6ZU1vZGU6YWN0aXZlXCI6IFwiY29udGFpblwiXG4gIH0sXG4gIFwiLnRhYl9pdGVtIHRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyMXB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5tYWluLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIxMDBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjNWY5ZWEwXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuc2xvdFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuY2FudmFzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLm1hc2tcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwiZmxleFwiOiAxLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1hc2stZXhpc3RcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSg1LDUsNSwwLjYpXCJcbiAgfSxcbiAgXCIubWFzay1ub25lXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMClcIixcbiAgICBcInZpc2liaWxpdHlcIjogXCJoaWRkZW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2dcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzJweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI0cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjI0cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyNHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI0cHhcIixcbiAgICBcIndpZHRoXCI6IFwiODQlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nLWJvcmRlclwiOiB7XG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIxcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U3ZTdlN1wiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTdlN2U3XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3hcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3BcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjE1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAudGl0bGVcIjoge1xuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiNTBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC50aXRsZS1jbG9zZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjk1JVwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjI1cHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC50aXRsZS1ub25lXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLmNsb3NlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNSVcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIi0yMHB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAuY2xvc2UgdGV4dFwiOiB7XG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiZm9udFNpemVcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLmNvbnRlbnRcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjE1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIzMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiY29sb3JcIjogXCIjYTBhMGEwXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCBpbnB1dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcIndpZHRoXCI6IFwiODUlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjE2cHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudGFic1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudGFiLWJhclwiOiB7XG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNTRweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50YWItdGV4dFwiOiB7XG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzY2NjY2NlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJjb2xvcjphY3RpdmVcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiIzAwYjJmZlwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuIC5idG5ib3ggdGV4dFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjI3MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveDEgdGV4dFwiOiB7XG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjI3MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiI2U3ZTdlN1wiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuLXZlcnRpY2FsXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0bi12ZXJ0aWNhbCAuYnRuYm94XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuLWhvcml6b250YWxcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuLWhvcml6b250YWwgLmJ0bmJveFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwJVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLndhcnBcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLndhcnAgLmltZ0JhY2tcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNjY2NjY2NcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImZpbGxcIlxuICB9LFxuICBcIi53YXJwIC5tYXNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjQpXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjIwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImxpbmVhclwiLFxuICAgIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogXCJmb3J3YXJkc1wiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiOTg0cHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJsaW5lYXJcIixcbiAgICBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IFwiZm9yd2FyZHNcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjgwcHhcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cCAudGl0bGVcIjoge1xuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRPdmVyZmxvd1wiOiBcImVsbGlwc2lzXCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcInJnYmEoMCwwLDAsMC45KVwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwIC5ib2R5XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwIC5mb290ZXJcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cCAuZm9vdGVyIC5jYW5jZWxcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmRpc2FibGVkXCI6IFwicmdiYSgwLDAsMCwwLjEpXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXAgLmZvb3RlciAuc3VyZVwiOiB7XG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjEwMHB4XCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGhcIjoge1xuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjZweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiYXV0b1wiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCJhdXRvXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCJhdXRvXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiYXV0b1wiLFxuICAgIFwid2lkdGhcIjogXCI2NTZweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjIwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImxpbmVhclwiLFxuICAgIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogXCJmb3J3YXJkc1wiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5oZWFkZXJcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiMTMycHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjU0cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNTRweFwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5oZWFkZXIgLnRpdGxlXCI6IHtcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwiZm9udFNpemVcIjogXCI0NXB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcInJnYmEoMCwwLDAsMC45KVwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5ib2R5XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiNTRweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCI1NHB4XCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmZvb3RlclwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTI2cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjM2cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzZweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMThweFwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5mb290ZXIgLmNhbmNlbFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjI3NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5MHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM2cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjZweFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6ZGlzYWJsZWRcIjogXCJyZ2JhKDAsMCwwLDAuMSlcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuZm9vdGVyIC5zdXJlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjc0cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjkwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzZweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NnB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGFic1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWItY29udGVudFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRhdGFzLmxpc3QpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFnZWhvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlPT0n6aaW6aG1Jz90cnVlOmZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhZ2VyZWNvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlPT0n5q2l5pWwJz90cnVlOmZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhZ2V1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZT09J+aIkeeahCc/dHJ1ZTpmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGFiX2JhclwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRhdGFzLmxpc3QpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiX2l0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zaG93P3RoaXMuJGl0ZW0ucGljX2Nob2ljZTp0aGlzLiRpdGVtLnBpYyl9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdjb2xvcjogJysoKHRoaXMuJGl0ZW0uY29sb3IpKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUpfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiY2FudmFzXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaWQpfVxuICAgICAgfSxcbiAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pZCl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNhbnZhc1wiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJzbG90XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgICAgICBcImF0dHJcIjoge31cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiYXBleC1kaWFsb2dcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWydtYXNrJywgKHRoaXMuc2hvd01vZGFsPydtYXNrLWV4aXN0JzonbWFzay1ub25lJyldfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy52aXNpYmxlKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImRpYWxvZ1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2V0RGlhbG9nKX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImJveFwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LnRpdGxlfHx0aGlzLmRlZmF1bHRPcHRpb25zLnRpdGxlfHx0aGlzLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWyd0aXRsZScsICh0aGlzLmRlZmF1bHRPcHRpb25zLmNsb3NhYmxlPyd0aXRsZS1jbG9zZSc6J3RpdGxlLW5vbmUnKV19XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdDEnKX0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFic1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWItYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGFiLWJhclwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlpbNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi55S3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0Jyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZm9jdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmFsdWUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LnBsYWNlaG9sZGVyKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoPT09LTE/Jyc6dGhpcy5kZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZm9jdXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuatpVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRrZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5rZyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpeS9k+mHjVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogXCIzXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGtnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiYmluZENoYW5nZWtnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJrZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwia2dcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiODhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI4OHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0MScpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlkY21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY20pfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLovpPlhaXouqvpq5hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4bGVuZ3RoXCI6IFwiM1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRjbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmlucHV0U3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImJpbmRDaGFuZ2VjbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlcmtleWNsaWNrXCI6IFwiYmluZEVudGVyY21cIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcImNtXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjg4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjEwcHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdDEnKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZ2UpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLovpPlhaXlubTpvoRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4bGVuZ3RoXCI6IFwiM1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdlYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWygVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ2J0bicsICh0aGlzLmRpYWxvZ1R5cGU9PT0nYWx0ZXInfHx0aGlzLnZlcnRpY2FsPT09dHJ1ZT8nYnRuLXZlcnRpY2FsJzonYnRuLWhvcml6b250YWwnKV19LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRPcHRpb25zLmJ1dHRvbnMubGVuZ3RoPT09MCl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGUhPT0nYWx0ZXInKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5ib3gxXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJiaW5kQ2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRPcHRpb25zLmNhbmNlbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJpbmRBZmZpcm1cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5ib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYWZmaXJtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidG9wX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGFic1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRhYnNcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VUYWJhY3RpdmVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1iYXJcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0YWItYmFyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7iuaXpVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkahcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5pyIXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcIm15LWNpcmNsZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNpemVcIjogXCIzNTBcIixcbiAgICAgICAgICAgIFwicGVyY2VudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnByb2dyZXNzKX0sXG4gICAgICAgICAgICBcInN0cm9rZUNvbG9yXCI6IFwiIzAwQjJGRlwiLFxuICAgICAgICAgICAgXCJzQW5nbGVcIjogXCIxNTBcIixcbiAgICAgICAgICAgIFwic2hvd1RyYWlsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRydWUpfSxcbiAgICAgICAgICAgIFwidHJhaWxDb2xvclwiOiBcIiNmZmZcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjaXJjbGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRleHQtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvaWNvbl9wYW9idS5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJpY29uLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zZWdtZW50c1RleHQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZV9zdHBlc1wiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3RlcHNfdmlldyl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRpdGxlX3N0cGVzX3ZcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImRldGFpbHNcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImRldGFpbC1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm1pbGVhZ2UpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWUxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJLTVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6YeM56iLXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImRldGFpbC1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNhbG9yaWVzKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGV0YWlsLXZhbHVlMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwia2NhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5raI6ICX54Ot6YePXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImRldGFpbC1pdGVtXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvcGVuU2V0U3RlcHNEaWFsb2dcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwidVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmdvYWxfZGF5KX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWUzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmraU+XCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLku4rml6Xnm67moIdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJuLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYm90dG9tX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMjUycHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIyMzhweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiOTBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNlOWZkNjVcXFwiLFxcXCIjOTVmZjM3IDEwMCVcXFwiXX1dfVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI1OHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJCTUkv5L2T6ISC546H6K6h566XXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWhq+WGmeiuoeeulz5cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwib3BlbkJhc2ljSW5mb3JtYXRpb25EaWFsb2dcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTQwcHhcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvbWluZ3JvdXAyLnBuZ1wiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIxNXB4XCIsXG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCItMzBweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ljb25fYm1pLnBuZ1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI5MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxNnB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIkJNSVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlcjMtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYm1pKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyMi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ljb25fdHpsLnBuZ1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI5MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxNnB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS9k+iEgueOh1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlcjMtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudHpsKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyMi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL3N0YW5kYXJkLnBuZ1wiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzY4cHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMTRweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1kaWFsb2dcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmlzaWJsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9wZW4xKX0sXG4gICAgICAgIFwiZGlhbG9nVHlwZVwiOiBcInByb21wdFwiLFxuICAgICAgICBcInByb21wdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9iail9XG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImFmZmlybVwiOiBcImVudGVyU3RlcHNcIixcbiAgICAgICAgXCJjYW5jZWxcIjogXCJjbG9zZVwiLFxuICAgICAgICBcImVudGVyXCI6IFwiZW50ZXJTdGVwc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1kaWFsb2dcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmlzaWJsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9wZW4yKX0sXG4gICAgICAgIFwiZGlhbG9nVHlwZVwiOiBcInByb21wdDFcIixcbiAgICAgICAgXCJwcm9tcHRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vYmopfVxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJhZmZpcm1cIjogXCJlbnRlckRldGFpbHNcIixcbiAgICAgICAgXCJjYW5jZWxcIjogXCJjbG9zZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hvdyl9XG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImhlYWRlclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLnlLPor7cg5YGl6Lqr6L+Q5YqoIOadg+mZkDpcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLnlKjkuo7orrDlvZXov5DliqjmraXmlbDvvIzorqHnrpfov5Dliqjph4/jgIJcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI1MDBcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyN3B4XCJcbiAgfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI1OTJweFwiLFxuICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIyNXB4XCIsXG4gICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjVweFwiLFxuICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyNXB4XCIsXG4gICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIyNXB4XCIsXG4gICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjE1MHB4XCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjcwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxNTJweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEzMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU4cHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuatpeaVsOiusOW9lVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzFweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIzcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLljZXkvY3vvJrmraVcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIyMDI0XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5SaWdodFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMjAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCI0MDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjYwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiODAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIxMDAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJsaXN0XCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0SXRlbVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5saXN0MzBkYXlEYXRhKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3VtbWFyeURhdGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjRweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCI1MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjUwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcm9ncmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwZXJjZW50XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ucGVyY2VudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2dyZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllckNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIzMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7heaYvuekuuacgOi/kTMw5aSp5q2l5pWwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMTZweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMnB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2VmZWZlZlwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMjgwcHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0b3Bfdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjgwJVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwidG9Mb2dpblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL3RvdXhpYW5nLnBuZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMjBweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTIwcHhcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCI2MHB4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTIwcHhcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy51c2VyRGF0YS5sb2dpblBob25lfHwn6K+354K55Ye755m75b2VJyl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImxvZ1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdJRDonKygodGhpcy51c2VyRGF0YS51c2VySWQpKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidXNlcl9pZFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjk2OTY5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIi0xMTBweFwiLFxuICAgICAgICAgICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNTBweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1MHB4XCIsXG4gICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvZ3JvdXAucG5nXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjE2NHB4XCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNzAycHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVzZXJEYXRhLmJhbGFuY2UpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiNzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhYNcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTJweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI3MHB4XCIsXG4gICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiMjcwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZjdiYmE0IDAlXFxcIixcXFwiI2ZkZWNkN1xcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCIxOTJweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicHVzaFBhZ2VUaXhpYW5cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5o+Q546wXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNhYTUwMjFcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJib3R0b21fdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2Jhbm5lcl9tZS5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxODBweFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvcGVuQWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNzAycHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzgwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MnB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNThweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5oiR55qE5pyN5YqhXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImFkZERlc2t0b3BcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTEucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmt7vliqDmoYzpnaJcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicHVzaFBhZ2VmZWVkYmFja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lMi5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS4vuaKpeWPjemmiFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnB1c2h3ZWIoMSxldnQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTMucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLluK7liqnkuK3lv4NcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5wdXNod2ViKDIsZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWU0LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi55So5oi35Y2P6K6uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMucHVzaHdlYigzLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lNS5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIumakOengeaUv+etllwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZXBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWU2LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6K6+572uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInB1c2hQYWdlYWJvdXRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTcucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlhbPkuo5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicHVzaFBhZ2Vsb2dPdXRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTgucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLms6jplIBcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIndhcnBcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnei1pbmRleDogJysoKHRoaXMuekluZGV4KSkrJzsnfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtYXNrXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1BvcCYmIXRoaXMuYmFja0ltZyl9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5iYWNrSW1nKX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1BvcCYmdGhpcy5iYWNrSW1nKX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW1nQmFja1wiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93UG9wJiYhdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUpfSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAncG9zaXRpb246Zml4ZWQ7IGJvdHRvbTonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IGxlZnQ6JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyByaWdodDonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IGJvcmRlci1yYWRpdXM6JysoKCgyNC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4Oyd9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInBvcHVwXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2hlaWdodDonKygoKDU2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHBhZGRpbmctbGVmdDogJysoKCgyNC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBwYWRkaW5nLXJpZ2h0OiAnKygoKDI0L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7J30sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGl0bGUudHJpbSgpfHwn55So5oi35Y2P6K6u6ZqQ56eB5pS/562W5o+Q56S6Jyl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnZm9udC1zaXplOiAnKygoKDIwL3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7J30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ3BhZGRpbmctbGVmdDogJysoKCgyNC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBwYWRkaW5nLXJpZ2h0OiAnKygoKDI0L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7J30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJib2R5XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzbG90XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjVweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImlkXCI6IFwiY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg5pys5pyN5Yqh6ZyA6KaBIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6IGU572RXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg77yM6LCD55SoIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi55S16K+dXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg44CBIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5L2N572uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg5p2D6ZmQ44CB6I635Y+W6K6+5aSH44CB572R57uc44CB6bqm5YWL6aOO44CB6L+Q5Yqo44CB5YGl5bq35L+h5oGv44CC54K55Ye74oCc5ZCM5oSP4oCd77yM5Y2z6KGo56S65oKo5ZCM5oSP5LiK6L+w5YaF5a655Y+KIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJYWOeUqOaIt+WNj+iurlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDjgIEgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFs+S6jlhY6ZqQ56eB6K+05piOXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOOAgiBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0Zvb3Rlcil9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnaGVpZ2h0OicrKCgoNTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcGFkZGluZy1sZWZ0OiAnKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHBhZGRpbmctcmlnaHQ6ICcrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgbWFyZ2luLXRvcDonKygoKDgvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweCd9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZm9vdGVyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmi5Lnu51cIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNhYmxlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJ0bmRpc2FibGVkKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2hlaWdodDonKygoKDQwL3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IGZvbnQtc2l6ZTonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IG1hcmdpbi1yaWdodDonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHdpZHRoOicrKCgoOTg0LSgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKjMpLzIpKSsncHgnfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNhbmNlbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkIzmhI9cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnaGVpZ2h0OicrKCgoNDAvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgZm9udC1zaXplOicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgd2lkdGg6JysoKCg5ODQtKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgqMykvMikpKydweCd9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInN1cmVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInN1cmVcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicG9wdXBfd2lkdGhcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93UG9wJiZ0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJoZWFkZXJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGl0bGUudHJpbSgpfHwn55So5oi35Y2P6K6u6ZqQ56eB5pS/562W5o+Q56S6Jyl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImJvZHlcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI1cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcInJnYmEoMCwwLDAsMC45KVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg55Sz6K+3IFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YGl6Lqr6L+Q5YqoXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg55So5LqO6I635Y+W5q2l5pWw5LiO6K6w5b2V5q2l5pWwLOivt+aCqOWcqOS9v+eUqO+8iOaIlue7p+e7reS9v+eUqO+8ieaIkeS7rOeahOS6p+WTgeacjeWKoeWJjeS7lOe7humYheivuyBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi44CK55So5oi35Y2P6K6u44CLXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOWSjCBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi44CK6ZqQ56eB5pS/562W44CLXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOOAguaIkeS7rOWwhuWFqOWKm+S/nemanOaCqOeahOWQiOazleadg+ebiuS4juS/oeaBr+WuieWFqO+8jOW5tuWwhuaMgee7reS4uuaCqOaPkOS+m+S8mOi0qOacjeWKoeOAgiBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImZvb3RlclwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0Zvb3Rlcil9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlj5bmtohcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNhYmxlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJ0bmRpc2FibGVkKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5ZCM5oSPXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3VyZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwic3VyZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwicmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi91aS9jaXJjbGUvaW5kZXgudXg/bmFtZT1teS1jaXJjbGVcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vdWkvZGlhbG9nL2luZGV4LnV4P25hbWU9bXktZGlhbG9nXCIpXG5yZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL3VpL3ByaXZhY3lwb3AvaW5kZXgudXg/bmFtZT1wcml2YWN5LXBvcFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXBhZ2Vob21lJmRlcGVuZHNbXT1teS1jaXJjbGUmZGVwZW5kc1tdPW15LWRpYWxvZyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX0hvbWVcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX0hvbWVcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wYWdlaG9tZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZXJlY29yZCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX1JlY29yZFxcXFxpbmRleC51eCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfUmVjb3JkXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcGFnZXJlY29yZCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZXVzZXIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Vc2VyXFxcXGluZGV4LnV4IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9Vc2VyXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcGFnZXVzZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW15LWNpcmNsZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxjaXJjbGVcXFxcaW5kZXgudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxjaXJjbGVcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9teS1jaXJjbGUnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW15LWRpYWxvZyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxkaWFsb2dcXFxcaW5kZXgudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcdWlcXFxcZGlhbG9nXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbXktZGlhbG9nJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wcml2YWN5LXBvcCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxwcml2YWN5cG9wXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXHByaXZhY3lwb3BcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wcml2YWN5LXBvcCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL1BhZ2VfUmVjb3JkL2luZGV4LnV4P25hbWU9cGFnZXJlY29yZFwiKVxucmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL1BhZ2VfSG9tZS9pbmRleC51eD9uYW1lPXBhZ2Vob21lXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vUGFnZV9Vc2VyL2luZGV4LnV4P25hbWU9cGFnZXVzZXJcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPXBhZ2Vob21lJmRlcGVuZHNbXT1wYWdlcmVjb3JkJmRlcGVuZHNbXT1wYWdldXNlciEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxpbmRleC51eCEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjAuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
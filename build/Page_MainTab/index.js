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
    $umeng_stat.trackEvent('wd_xyfddhj', '点击');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfTWFpblRhYlxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2lFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFHQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFHQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoaEJBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekpBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFGQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2xSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ29tbW9uL2hlbHBlci9hamF4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db21tb24vaGVscGVyL2FwaXMvZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX0hvbWUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxQYWdlX0hvbWVcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfUmVjb3JkL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcUGFnZV9SZWNvcmRcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxQYWdlX01haW5UYWJcXFBhZ2VfVXNlclxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX01haW5UYWIvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFx1aVxcY2lyY2xlXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9NYWluVGFiXFx1aVxcZGlhbG9nXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfTWFpblRhYlxcdWlcXHByaXZhY3lwb3BcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2luZGV4LnV4P2FkYTciLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1JlY29yZC9pbmRleC51eD84ODEzIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Vc2VyL2luZGV4LnV4P2I3NWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9pbmRleC51eD80M2QxIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvdWkvY2lyY2xlL2luZGV4LnV4PzlhY2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9kaWFsb2cvaW5kZXgudXg/MjEzYiIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL3ByaXZhY3lwb3AvaW5kZXgudXg/MzczNyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL2luZGV4LnV4PzQxNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9jaXJjbGUvaW5kZXgudXg/YmFjMCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2RpYWxvZy9pbmRleC51eD8wMDE3Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Ib21lL2luZGV4LnV4PzZhZDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1JlY29yZC9pbmRleC51eD80Yjc4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvUGFnZV9Vc2VyL2luZGV4LnV4P2ExZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi91aS9wcml2YWN5cG9wL2luZGV4LnV4PzhlNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX0hvbWUvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfTWFpblRhYi9QYWdlX1JlY29yZC9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL1BhZ2VfVXNlci9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2NpcmNsZS9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL2RpYWxvZy9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9NYWluVGFiL3VpL3ByaXZhY3lwb3AvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX01haW5UYWIvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3N5c3RlbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5mZXRjaFwiKSk7XG52YXIgX3N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uc3RvcmFnZVwiKSk7XG52YXIgX3N5c3RlbTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCRhcHBfcmVxdWlyZSQoXCJAYXBwLW1vZHVsZS9zeXN0ZW0uZGV2aWNlXCIpKTtcbnZhciBfc3lzdGVtNCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoJGFwcF9yZXF1aXJlJChcIkBhcHAtbW9kdWxlL3N5c3RlbS5wcm9tcHRcIikpO1xudmFyIF9zeXN0ZW01ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgkYXBwX3JlcXVpcmUkKFwiQGFwcC1tb2R1bGUvc3lzdGVtLnJvdXRlclwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgZGVmYXVsdDogZSB9OyB9XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmNvbnN0IGdldFVzZXJJZCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHVzZXJJZCA9IGF3YWl0IF9zeXN0ZW0zLmRlZmF1bHQuZ2V0VXNlcklkKCk7XG4gIHJldHVybiB1c2VySWQuZGF0YS51c2VySWQ7XG59O1xuY29uc3QgcXVpdCA9ICgpID0+IHtcbiAgX3N5c3RlbTQuZGVmYXVsdC5zaG93RGlhbG9nKHtcbiAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgbWVzc2FnZTogXCLmgqjlt7Lms6jplIDotKblj7cs6K+36YCA5Ye644CCXCIsXG4gICAgYnV0dG9uczogW3tcbiAgICAgIHRleHQ6ICfpgIDlh7onLFxuICAgICAgY29sb3I6ICcjMzMzMzMzJ1xuICAgIH1dLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBfc3lzdGVtNS5kZWZhdWx0LnB1c2goe1xuICAgICAgICB1cmk6IFwiUGFnZV9sb2dpblwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjYW5jZWxcIik7XG4gICAgfVxuICB9KTtcbn07XG5jb25zdCBnZXRUb2tlbkRhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZXhhbXBsZSA9IHJlcXVpcmUoJy4vYXBpcy9leGFtcGxlLmpzJykuZGVmYXVsdDtcbiAgICBjb25zdCBkZXZpY2VOdW0gPSBhd2FpdCBnZXRVc2VySWQoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhgZ2V0VG9rZW5EYXRhKCktLS0tPmRldmljZU51bT0ke2RldmljZU51bX1gKTtcbiAgICAvLyBjb25zb2xlLmxvZygn5piv5ZCm6Kem5Y+R55qE6L+Z6YeMJyk7XG4gICAgZXhhbXBsZS50b0xvZ2luKHtcbiAgICAgIGxvZ2luVHlwZTogXCJERVZJQ0VcIixcbiAgICAgIGFwcElkOiAnU0NfMDAwMScsXG4gICAgICBkZXZpY2VOdW0sXG4gICAgICBsb2dpbkFjY291bnQ6IGRldmljZU51bVxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygn6LWw55qE5oiQ5Yqf5Zue6LCDJyk7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIsICflpLHotKXlm57osIMnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChKU09OLnBhcnNlKGVycikuY29kZSA9PT0gJzMxMDAwMScpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5p2l5LqGJyk7XG4gICAgICAgICAgcXVpdCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgJ+afpeeci+iOt+WPluaKpemUmScpO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH0pO1xufTtcbmxldCBpc1JlZnJlc2hpbmcgPSBmYWxzZTsgLy8g5piv5ZCm5q2j5Zyo6K+35rGC5Yi35pawdG9rZW7nmoTmjqXlj6NcbmNvbnN0IHJlZnJlc2hTdWJzY3JpYmVycyA9IFtdOyAvLyDlrZjlgqjor7fmsYLnmoTmlbDnu4RcbmNvbnN0IHN1YnNjcmliZVRva2VuUmVmcmVzaCA9IGNiID0+IHtcbiAgLy8g5bCG5omA5pyJ55qE6K+35rGC6YO9cHVzaOWIsOaVsOe7hOS4rSzlhbblrp7mlbDnu4TmmK9bZnVuY3Rpb24odG9rZW4pe30sIGZ1bmN0aW9uKHRva2VuKXt9LC4uLl1cbiAgcmVmcmVzaFN1YnNjcmliZXJzLnB1c2goY2IpO1xufTtcbmNvbnN0IG9uUnJlZnJlc2hlZCA9IHRva2VuID0+IHtcbiAgLy8g5pWw57uE5Lit55qE6K+35rGC5b6X5Yiw5paw55qEdG9rZW7kuYvlkI7oh6rmiafooYzvvIznlKjmlrDnmoR0b2tlbuWOu+ivt+axguaVsOaNrlxuICByZWZyZXNoU3Vic2NyaWJlcnMubWFwKGNiID0+IGNiKHRva2VuKSk7XG59O1xuY29uc3QgaXNBY2Nlc3NUb2tlbkV4cGlyZWQgPSBhdXRoRGF0YSA9PiB7XG4gIC8vIOWIpOaWreW9k+WJjXRva2Vu5piv5ZCm6L+H5pyfXG4gIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGF1dGhEYXRhLmV4cGlyZUF0ID4gMTAwMDAgKiA2MCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCByZXF1ZXN0ID0gb3B0aW9ucyA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICAgIGhlYWRlcnMgPSB7fVxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGF1dGhEYXRhID0gKGF3YWl0IF9zeXN0ZW0yLmRlZmF1bHQuZ2V0KHtcbiAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICB9KSkgfHwge307XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhdXRoRGF0YS5kYXRhID8gSlNPTi5wYXJzZShhdXRoRGF0YS5kYXRhKS5hY2Nlc3NUb2tlbiA6ICcnO1xuICAgIGlmIChpc0FjY2Vzc1Rva2VuRXhwaXJlZChhdXRoRGF0YSkgfHwgIWFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAoIW9wdGlvbnMudXJsLmluY2x1ZGVzKFwicWEvbWluaS9iYXNpYy91c2VyL2xvZ2luXCIpKSB7XG4gICAgICAgIGlmICghaXNSZWZyZXNoaW5nKSB7XG4gICAgICAgICAgaXNSZWZyZXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICBnZXRUb2tlbkRhdGEoKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICBpc1JlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgICAgICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSByZXMuZGF0YS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgYXdhaXQgX3N5c3RlbTIuZGVmYXVsdC5zZXQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJBVVRIX1RPS0VOX0RBVEFcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkocmVzLmRhdGEpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEuYWNjZXNzVG9rZW4nLCByZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgIG9uUnJlZnJlc2hlZChyZXMuZGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlzUmVmcmVzaGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXRyeSA9IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICBzdWJzY3JpYmVUb2tlblJlZnJlc2godG9rZW4gPT4ge1xuICAgICAgICAgICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gdG9rZW47IC8vIOeUqOacgOaWsHRva2Vu6K+35rGC5pWw5o2uXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0cnk7XG4gICAgICB9XG4gICAgfVxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGFjY2Vzc1Rva2VuIHx8ICcnO1xuICAgIF9zeXN0ZW0uZGVmYXVsdC5mZXRjaCh7XG4gICAgICAvLyB1cmw6ICdodHRwczovL3Rlc3QuaXBhbmRhdGEuY29tJyArIHVybCxcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmloYWl0dW8uY24nICsgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgZGF0YSxcbiAgICAgIGhlYWRlcjogX29iamVjdFNwcmVhZCh7XG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LCBoZWFkZXJzKSxcbiAgICAgIC8vIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vICAgY29uc3QgZGF0YSA9IHJlcy5kYXRhXG4gICAgICAvLyAgIGlmIChkYXRhLmNvZGUgPT09IFwiMDAwMDAwXCIgfHwgSlNPTi5wYXJzZShkYXRhKS5jb2RlID09PSBcIjAwMDAwMFwiKSB7XG4gICAgICAvLyAgICAgcmVzb2x2ZSh1cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikgPyByZXMuZGF0YSA6IEpTT04ucGFyc2UocmVzLmRhdGEpKTtcbiAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICBpZiAoZGF0YS5jb2RlID09PSBcIjMwMDAwMlwiKSB7XG4gICAgICAvLyAgICAgICAkc3RvcmFnZS5kZWxldGUoe1xuICAgICAgLy8gICAgICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnXG4gICAgICAvLyAgICAgICB9KVxuICAgICAgLy8gICAgICAgcmVxdWVzdChvcHRpb25zKVxuICAgICAgLy8gICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgLy8gICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgcmVqZWN0KHJlcy5kYXRhKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sXG5cbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzLmRhdGE7XG5cbiAgICAgICAgICAvLyDlsJ3or5Xop6PmnpAgSlNPTiDmlbDmja7vvIzlpoLmnpzop6PmnpDlpLHotKXvvIzliJnkvJrmipvlh7rplJnor69cbiAgICAgICAgICBjb25zdCBwYXJzZWREYXRhID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XG4gICAgICAgICAgaWYgKHBhcnNlZERhdGEuY29kZSA9PT0gXCIwMDAwMDBcIikge1xuICAgICAgICAgICAgcmVzb2x2ZSh1cmwuaW5jbHVkZXMoXCJxYS9taW5pL2Jhc2ljL3VzZXIvbG9naW5cIikgPyBkYXRhIDogcGFyc2VkRGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYXJzZWREYXRhLmNvZGUgPT09IFwiMzAwMDAyXCIpIHtcbiAgICAgICAgICAgICAgX3N5c3RlbTIuZGVmYXVsdC5kZWxldGUoe1xuICAgICAgICAgICAgICAgIGtleTogJ0FVVEhfVE9LRU5fREFUQSdcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucykudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIEpTT04gb3IgaGFuZGxpbmcgY29kZTogXCIsIGUpO1xuXG4gICAgICAgICAgLy8g5qOA5p+l5piv5ZCm6L+U5Zue55qE5pivIEhUTUzvvIzogIzkuI3mmK8gSlNPTlxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLmRhdGEgPT09ICdzdHJpbmcnICYmIHJlcy5kYXRhLnN0YXJ0c1dpdGgoJzxodG1sPicpKSB7XG4gICAgICAgICAgICByZWplY3QoXCJTZXJ2ZXIgcmV0dXJuZWQgYW4gSFRNTCBwYWdlIGluc3RlYWQgb2YgSlNPTi4gUG9zc2libGUgaW5jb3JyZWN0IFVSTCBvciBzZXJ2ZXIgZXJyb3IuXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJFcnJvciBwYXJzaW5nIEpTT04gb3IgaGFuZGxpbmcgY29kZTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHt9XG4gICAgfSk7XG4gIH0pO1xufTtcbnZhciBfZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdCA9IHJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2FqYXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9hamF4LmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBkZWZhdWx0OiBlIH07IH1cbi8vIOeZu+W9lSBcbmNvbnN0IHRvTG9naW4gPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy91c2VyL2xvZ2luYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy8g5LiK5Lyg5q2l5pWwXG5jb25zdCB1cGxvYWRzdGVwcyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL3NjL3VwbG9hZGAsXG4gICAgZGF0YVxuICB9KTtcbn07XG4vLyDojrflj5bmraXmlbBcbmNvbnN0IGdldHN0ZXBzID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zY2AsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8vIOiOt+WPluacgOi/kTMw5aSp6K6w5b2VXG5jb25zdCBnZXRzdGVwc2xpc3QgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9zYy9saXN0YFxuICB9KTtcbn07XG5cbi8v5o+Q546wXG5jb25zdCB3aXRoZHJhdyA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL3VzZXIvd2l0aGRyYXdgLFxuICAgIGRhdGFcbiAgfSk7XG59O1xuXG4vL+eUqOaIt+S9memineiusOW9lVxuY29uc3QgcmVjb3JkID0gZGF0YSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS91c2VyL2Nhc2gvcmVjb3JkYCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5blub/lkYrlrozmiJDmrKHmlbBcbmNvbnN0IGdldEFkQ291bnQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2NvbXBsZXRlL2NvdW50YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/lub/lkYrlrozmiJBcbmNvbnN0IGNvbXBsZXRlQWQgPSBkYXRhID0+IHtcbiAgcmV0dXJuICgwLCBfYWpheC5kZWZhdWx0KSh7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9jb21wbGV0ZWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG5cbi8v5bm/5ZGK5a6M5oiQLeWKoOWvhlxuY29uc3QgY29tcGxldGVBZFJTQSA9IGFzeW5jIGRhdGEgPT4ge1xuICBsZXQgdGltZXN0YW1wID0gK25ldyBEYXRlKCk7XG4gIGRhdGEudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICBsZXQgX2RhdGEgPSBhd2FpdCAkdXRpbHMuZGF0YUVuY3J5cHRpb24oZGF0YSk7XG4gIGxldCBwYXJhbSA9IHtcbiAgICBkYXRhOiBfZGF0YVxuICB9O1xuICBjb25zb2xlLmxvZygn5Lu75Yqh5Yqg5a+GJywgcGFyYW0pO1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIHVybDogYC9xYS9taW5pL2Jhc2ljL2FkL2ZpbmlzaGAsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gIH0pO1xufTtcblxuLy/lub/lkYrovazljJbkuIrkvKAgICB0eXBlOuW5v+WRiua4oOmBk+exu+Weizogamgo6bK46bi/KSwga3Mo5b+r5omLKSwgamwo5beo6YePKSwgLOWPr+eUqOWAvDpqaCxrcyxqbFxuY29uc3QgY29udmVydFVwbG9hZCA9IGRhdGEgPT4ge1xuICBjb25zb2xlLmxvZygnZGF0YT0gJywgZGF0YSwgYHVybD0gL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHtkYXRhLnR5cGV9YCk7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC91cGxvYWQvJHtkYXRhLnR5cGV9YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLy/ojrflj5bmiYvlir/ov5Tlm57phY3nva7kv6Hmga9cbmNvbnN0IGJvbGNrUmV0dXJuID0gKCkgPT4ge1xuICBsZXQgYnJhbmQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYnJhbmQ7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9jbGlja0NvbnRyb2wvcmV0dXJuL2luZm8vJHticmFuZH1gXG4gIH0pO1xufTtcblxuLyoqXHJcbiAqIOiOt+WPlumhtemdoumAj+aYjuWxgumFjee9ruS/oeaBryAgXHJcbiAqXHJcbiAqL1xuXG5jb25zdCBzaG93VGNsYXllciA9IGRhdGEgPT4ge1xuICBsZXQgYnJhbmQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYnJhbmQ7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9jbGlja0NvbnRyb2wvdHJhbnNwYXJlbnRMYXllci9pbmZvLyR7YnJhbmR9YCxcbiAgICBkYXRhXG4gIH0pO1xufTtcblxuLyoqXHJcbiAqIOiOt+WPluaYr+WQpuiHquWKqOW8ueeqlyAgXHJcbiAqXHJcbiAqL1xuXG5jb25zdCBwb3BVcHMgPSAoKSA9PiB7XG4gIHJldHVybiAoMCwgX2FqYXguZGVmYXVsdCkoe1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB1cmw6IGAvcWEvbWluaS9iYXNpYy9hZC9hdXRvL3BvcFVwc2BcbiAgfSk7XG59O1xuXG4vKipcclxuICog6L2s5YyW54K55Ye75qyh5pWwXHJcbiAqXHJcbiAqL1xuY29uc3QgY2xpY2tDb3VudCA9IGRhdGEgPT4ge1xuICByZXR1cm4gKDAsIF9hamF4LmRlZmF1bHQpKHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgdXJsOiBgL3FhL21pbmkvYmFzaWMvYWQvY29udmVydC9jbGlja0NvdW50LyR7ZGF0YS50eXBlfWAsXG4gICAgZGF0YVxuICB9KTtcbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIHRvTG9naW4sXG4gIHVwbG9hZHN0ZXBzLFxuICBnZXRzdGVwcyxcbiAgZ2V0c3RlcHNsaXN0LFxuICB3aXRoZHJhdyxcbiAgcmVjb3JkLFxuICBnZXRBZENvdW50LFxuICBjb21wbGV0ZUFkLFxuICBjb21wbGV0ZUFkUlNBLFxuICBjb252ZXJ0VXBsb2FkLFxuICBib2xja1JldHVybixcbiAgc2hvd1RjbGF5ZXIsXG4gIHBvcFVwcyxcbiAgY2xpY2tDb3VudFxufTsiLCI8aW1wb3J0IG5hbWU9XCJteS1jaXJjbGVcIiBzcmM9XCIuLi91aS9jaXJjbGUvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cIm15LWRpYWxvZ1wiIHNyYz1cIi4uL3VpL2RpYWxvZy9pbmRleFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwicHJpdmFjeS1wb3BcIiBzcmM9XCIuLi91aS9wcml2YWN5cG9wL2luZGV4XCI+PC9pbXBvcnQ+XG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9wX3ZpZXdcIj5cbiAgICAgIDx0YWJzIGNsYXNzPVwidGFic1wiIG9uY2hhbmdlPVwiY2hhbmdlVGFiYWN0aXZlXCI+XG4gICAgICAgIDx0YWItYmFyIGNsYXNzPVwidGFiLWJhclwiPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGFiLXRleHRcIj7ku4rml6U8L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ0YWItdGV4dFwiPuWRqDwvdGV4dD5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5pyIPC90ZXh0PlxuICAgICAgICA8L3RhYi1iYXI+XG4gICAgICA8L3RhYnM+XG4gICAgICA8bXktY2lyY2xlIGNsYXNzPVwiY2lyY2xlXCIgc2l6ZT1cIjM1MFwiIHBlcmNlbnQ9XCJ7e3Byb2dyZXNzfX1cIiBzdHJva2UtY29sb3I9XCIjMDBCMkZGXCIgcy1hbmdsZT1cIjE1MFwiIHNob3ctdHJhaWw9XCJ7e3RydWV9fVwiIHRyYWlsLWNvbG9yPVwiI2ZmZlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8aW1hZ2Ugc3JjPVwiL0NvbW1vbi9pbWcvaWNvbl9wYW9idS5wbmdcIiBjbGFzcz1cImljb24taW1hZ2VcIiAvPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVfc3RwZXNcIj57e3NlZ21lbnRzVGV4dH19PC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGVfc3RwZXNfdlwiPnt7c3RlcHNfdmlld319PC90ZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbXktY2lyY2xlPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLWl0ZW1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLXZhbHVlXCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImRldGFpbC12YWx1ZTEgbGFyZ2VyLXRleHRcIj57e21pbGVhZ2V9fTwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic21hbGxlci10ZXh0XCI+S008L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJuLXRleHRcIj7ph4znqIs8L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLWl0ZW1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLXZhbHVlXCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImRldGFpbC12YWx1ZTIgbGFyZ2VyLXRleHRcIj57e2NhbG9yaWVzfX08L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInNtYWxsZXItdGV4dFwiPmtjYWw8L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJuLXRleHRcIj7mtojogJfng63ph488L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLWl0ZW1cIiBAY2xpY2s9XCJvcGVuU2V0U3RlcHNEaWFsb2dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsLXZhbHVlXCI+XG4gICAgICAgICAgICA8dGV4dCBpZD1cInVcIiBjbGFzcz1cImRldGFpbC12YWx1ZTMgbGFyZ2VyLXRleHRcIj57e2dvYWxfZGF5fX08L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInNtYWxsZXItdGV4dFwiPuatpT48L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJuLXRleHRcIj7ku4rml6Xnm67moIc8L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tX3ZpZXdcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjUycHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyMzhweDsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNlOWZkNjUsICM5NWZmMzcgMTAwJSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogNThweFwiPjwvZGl2PlxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogNDJweDsgZm9udC1zaXplOiAzMXB4OyBmb250LXdlaWdodDogYm9sZDsgcG9zaXRpb246IGFic29sdXRlOyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IDNweFwiPkJNSS/kvZPohILnjoforqHnrpc8L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjODI4MjgyOyBwYWRkaW5nLXRvcDogMTBweDsgcGFkZGluZy1sZWZ0OiAyMHB4XCIgQGNsaWNrPVwib3BlbkJhc2ljSW5mb3JtYXRpb25EaWFsb2dcIj7loavlhpnorqHnrpc+PC90ZXh0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxNDBweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL21pbmdyb3VwMi5wbmcpOyBtYXJnaW4tdG9wOiAxNXB4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZFwiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWxlZnQ6IC0zMHB4XCI+XG4gICAgICAgICAgPGltYWdlIHNyYz1cIi9Db21tb24vaW1nL2ljb25fYm1pLnBuZ1wiIHN0eWxlPVwid2lkdGg6IDkwcHg7IGhlaWdodDogOTBweFwiIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kOyBtYXJnaW4tbGVmdDogMTZweFwiPlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYXJnZXIzLXRleHRcIj5CTUk8L3RleHQ+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImxhcmdlcjItdGV4dFwiPnt7Ym1pfX08L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24taXRlbXM6IGNlbnRlclwiPlxuICAgICAgICAgIDxpbWFnZSBzcmM9XCIvQ29tbW9uL2ltZy9pY29uX3R6bC5wbmdcIiBzdHlsZT1cIndpZHRoOiA5MHB4OyBoZWlnaHQ6IDkwcHhcIiAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsgbWFyZ2luLWxlZnQ6IDE2cHhcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwibGFyZ2VyMy10ZXh0XCI+5L2T6ISC546HPC90ZXh0PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJsYXJnZXIyLXRleHRcIj57e3R6bH19PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL3N0YW5kYXJkLnBuZyk7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDM2OHB4OyBtYXJnaW4tdG9wOiAxNHB4XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG15LWRpYWxvZyB2aXNpYmxlPVwie3tvcGVuMX19XCIgZGlhbG9nLXR5cGU9XCJwcm9tcHRcIiBvbmFmZmlybT1cImVudGVyU3RlcHNcIiBvbmNhbmNlbD1cImNsb3NlXCIgb25lbnRlcj1cImVudGVyU3RlcHNcIiBwcm9tcHQ9XCJ7e29ian19XCI+PC9teS1kaWFsb2c+XG4gICAgPG15LWRpYWxvZyB2aXNpYmxlPVwie3tvcGVuMn19XCIgZGlhbG9nLXR5cGU9XCJwcm9tcHQxXCIgb25hZmZpcm09XCJlbnRlckRldGFpbHNcIiBvbmNhbmNlbD1cImNsb3NlXCIgcHJvbXB0PVwie3tvYmp9fVwiPjwvbXktZGlhbG9nPlxuXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiIHNob3c9XCJ7e2lzU2hvd319XCI+XG4gICAgICA8dGV4dCBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+55Sz6K+3IOWBpei6q+i/kOWKqCDmnYPpmZA6PC90ZXh0PlxuICAgICAgPHRleHQgc3R5bGU9XCJmb250LXdlaWdodDogNTAwXCI+55So5LqO6K6w5b2V6L+Q5Yqo5q2l5pWw77yM6K6h566X6L+Q5Yqo6YeP44CCPC90ZXh0PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbiAgLmhlYWRlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiA5MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgdG9wOiA3MHB4O1xuICAgIHdpZHRoOiA3MDBweDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnRvcF92aWV3IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDgyOHB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvQ29tbW9uL2ltZy9ncm91cDIucG5nXCIpOyAvKiDmm7/mjaLkuLrkvaDnmoTog4zmma/lm77niYfot6/lvoQgKi9cbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyAvKiDkvb/og4zmma/lm77niYfopobnm5bmlbTkuKrlrrnlmaggKi9cbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IC8qIOWwhuiDjOaZr+WbvueJh+WxheS4reWvuem9kCAqL1xuICB9XG5cbiAgLmJvdHRvbV92aWV3IHtcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDI3cHg7XG4gICAgcGFkZGluZy1yaWdodDogMjdweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDc1MHB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAtMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XG4gIH1cbiAgLmljb24taW1hZ2Uge1xuICAgIHdpZHRoOiA0NHB4OyAvKiDorr7nva7lm77niYflrr3luqYgKi9cbiAgICBoZWlnaHQ6IDQ0cHg7IC8qIOiuvue9ruWbvueJh+mrmOW6piAqL1xuICB9XG5cbiAgLmNpcmNsZSB7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgfVxuXG4gIC50ZXh0LWNvbnRhaW5lciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAvKiDkvb/mlofmnKzlsYXkuK3lr7npvZAgKi9cbiAgfVxuXG4gIC50aXRsZV9zdHBlcyB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG5cbiAgLnRpdGxlX3N0cGVzX3Yge1xuICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogIzAwMDtcbiAgfVxuXG4gIC5kZXRhaWxzIHtcbiAgICB3aWR0aDogNzAycHg7XG4gICAgaGVpZ2h0OiAxNzVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiMmZmO1xuICAgIGJvdHRvbTogMDsgLyog5Zu65a6a5Zyo54i25a655Zmo5bqV6YOoICovXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgLmRldGFpbC1pdGVtIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAvKiDkvb/lrZDlhYPntKDlnoLnm7TmjpLliJcgKi9cbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgLyog5a2Q5YWD57Sg5Zyo5Z6C55u05pa55ZCR5Z2H5YyA5YiG5biDICovXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgLyog5a2Q5YWD57Sg5Zyo5rC05bmz5pa55ZCR5bGF5LitICovXG4gIH1cblxuICAuZGV0YWlsLXZhbHVlIHtcbiAgICBmbGV4OiAxOyAvKiDlrZDlhYPntKDlubPliIblrr3luqYgKi9cblxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7IC8qIOS9v+WtkOWFg+e0oOawtOW5s+aOkuWIlyAqL1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDsgLyog5a2Q5YWD57Sg5Zyo5rC05bmz5pa55ZCR5bGF5LitICovXG4gIH1cblxuICAubGFyZ2VyLXRleHQge1xuICAgIGZvbnQtc2l6ZTogNDhweDsgLyog6K6+572u6L6D5aSn55qE5a2X5L2T5aSn5bCPICovXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuXG4gIC5sYXJnZXIyLXRleHQge1xuICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgIGZvbnQtc2l6ZTogNDhweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5sYXJnZXIzLXRleHQge1xuICAgIGNvbG9yOiAjNGI0YjRiO1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuICAuc21hbGxlci10ZXh0IHtcbiAgICBmb250LXNpemU6IDI0cHg7IC8qIOiuvue9rui+g+Wwj+eahOWtl+S9k+Wkp+WwjyAqL1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuICAubi10ZXh0IHtcbiAgICBmb250LXNpemU6IDI2cHg7IC8qIOiuvue9rui+g+Wwj+eahOWtl+S9k+Wkp+WwjyAqL1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG4gIC50YWJzIHtcbiAgICB3aWR0aDogNTIwcHg7XG4gICAgbWFyZ2luLXRvcDogMjU1cHg7XG4gIH1cbiAgLnRhYi1iYXIge1xuICAgIGJvcmRlci1jb2xvcjogI2JiYmJiYjtcbiAgICBjb2xvcjogI2JiYmJiYjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDU0cHg7XG4gIH1cbiAgLnRhYi10ZXh0IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDY1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNzRweDtcbiAgfVxuICAudGFiLXRleHQ6YWN0aXZlIHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjOGZmZjM0IDAlLCAjZWJmZDY2KTtcbiAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHNlbnNvciBmcm9tICdAc3lzdGVtLnNlbnNvcic7XG4gIGltcG9ydCBzdG9yYWdlIGZyb20gJ0BzeXN0ZW0uc3RvcmFnZSc7XG4gIGltcG9ydCBleGFtcGxlIGZyb20gJy4uLy4uL0NvbW1vbi9oZWxwZXIvYXBpcy9leGFtcGxlLmpzJztcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG5cblxuICAgIHByaXZhdGU6IHtcblxuXG4gXG4gICAgICBjb21wb25lbnREYXRhOiB7fSxcbiAgICAgIGdvYWxEYXlLZXk6IFwiR09BTF9EQVlcIixcbiAgICAgIHVzZXJEZXRhaWxzS2V5OiBcIlVzZXJEZXRhaWxzXCIsXG5cbiAgICAgIHN0ZXBTeXM6IDAsLy/orr7lpIflvZPliY3mgLvmraXmlbBcbiAgICAgIHN0ZXBzX3ZpZXc6IDAsIC8vIOW9k+WJjeaYvuekuueahOatpeaVsFxuXG5cbiAgICAgIHN0ZXBzRGF5QXBpOiAwLCAvLyDlvZPlpKnkupHmraXmlbBcbiAgICAgIHN0ZXBzV2Vla0FwaTogMCwgLy8g5b2T5ZGo5LqR5q2l5pWwXG4gICAgICBzdGVwc01vb25BcGk6IDAsIC8vIOW9k+aciOS6keatpeaVsFxuXG4gICAgICBnb2FsX2RheTogMCwgIC8vIOW9k+aXpeebruagh+atpeaVsFxuXG4gICAgICBwcm9ncmVzczogMCwgLy8g55So5LqO5a2Y5YKo5q2l5pWw6L+b5bqmXG5cbiAgICAgIGN1cnJlbnRQYWdlOiAtMSwvL+W9k+WJjemAieeahOmhte+8jOm7mOiupOaYvuekuuS7iuaXpVxuICAgICAgc2VnbWVudHM6IFtcbiAgICAgICAgJ+S7iuaXpScsICflkagnLCAn5pyIJ1xuICAgICAgXSxcbiAgICAgIHNlZ21lbnRzVGV4dHM6IFtcbiAgICAgICAgJ+S7iuaXpeatpeaVsCcsICfmnKzlkajmraXmlbAnLCAn5pys5pyI5q2l5pWwJ1xuICAgICAgXSxcbiAgICAgIHNlZ21lbnRzVGV4dDogXCJcIixcblxuXG4gICAgICBib2R5X3dlaWdodDogNjAsLy/kvZPph41cbiAgICAgIGJvZHlfaGVpZ2h0OiAwLC8v6Lqr6auYXG4gICAgICBzZXg6IDEsLy/mgKfliKsgIDEg55S377yMMCDlpbNcbiAgICAgIGFnZTogMCxcbiAgICAgIG1pbGVhZ2U6IFwiMC4wXCIsLy/ph4znqItcbiAgICAgIGNhbG9yaWVzOiBcIjAuMFwiLC8v5Y2h6Lev6YeMXG4gICAgICBibWk6IDAuMCwvL0JNSVxuICAgICAgdHpsOiAwLjAsLy/kvZPohILnjodcblxuXG4gICAgICBvcGVuMTogZmFsc2UsXG4gICAgICBvcGVuMjogZmFsc2UsXG4gICAgICBvYmo6IHt9LFxuICAgICAgaXNTaG93OiBmYWxzZSwvL+makOengeivoumXrlxuICAgIH0sXG4gICAgLy/pppbpobXliJ3lp4vljJbmtYHnqIvvvJpcbiAgICAvLyBTdGVwMeiOt+WPlueUqOaIt+iuvue9rueahOS7iuaXpeebruagh+atpeaVsFxuICAgIC8vIFN0ZXAy5LuO5ZCO5Y+w6I635Y+W5b2T5YmN5q2l5pWwICBcbiAgICAvLyBTdGVwM+agueaNruiOt+WPluWIsOeahOW9k+WJjeatpeaVsO+8jOabtOaWsOS7iuaXpei/m+W6pu+8jOmHjOeoi++8jOa2iOiAl+eDremHjyBcbiAgICAvL1xuICAgIGFzeW5jIG9uSW5pdCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25Jbml0KClcIilcblxuICAgICAgdGhpcy5nZXRHb2FsRGF5U3RlcHMoKTsvLyBTdGVwMVxuICAgICAgdGhpcy5nZXRVc2VyRGV0YWlscygpO1xuICAgICAgdGhpcy5hcGlnZXRTdHBlcygpLy8gU3RlcDJcblxuICAgIH0sXG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgY29uc29sZS5sb2coXCJvblJlYWR5KClcIilcbiAgICAgIHRoaXMudXBkYXRlQk1JVHpsKCk7XG4gICAgfSxcblxuICAgIC8v5by55Ye66ZqQ56eB6K+i6Zeu77yM5LiN6IO96Ieq5Yqo5omn6KGM77yM6ZyA6KaB55So5oi354K55Ye75Yqf6IO95pe25omN5omn6KGM77yM55uu5YmN6ZyA5rGC5piv54K55Ye74oCY5LuK5pel4oCZ77yM4oCY5ZGo4oCZ77yM4oCY5pyI4oCZ5LiO6K6+572u5LuK5pel55uu5qCH5pe2XG4gICAgYXN5bmMgZ2V0VHJlYXR5U3RvcmFnZSgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlU3RlcENvdW50ZXIoKVxuXG4gICAgfSxcbiAgICBzdWJzY3JpYmVTdGVwQ291bnRlcigpIHtcbiAgICAgIHRoaXMuaXNTaG93ID0gdHJ1ZTtcbiAgICAgIC8vIOiuoumYheatpeaVsOiuoeaVsOWZqFxuICAgICAgc2Vuc29yLnN1YnNjcmliZVN0ZXBDb3VudGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IChyZXQpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhg6K6+5aSH5q2l5pWw5pu05paw5LqG77yBLS0tLS0tPuiuvuWkh+aAu+atpeaVsD0ke3JldC5zdGVwc31gKVxuXG4gICAgICAgICAgLy/kv53lrZjmnYPpmZBcbiAgICAgICAgICAkcHJvY2Vzc0RhdGEuc2V0U3RvcmFnZShcIl9QUklWQUNcIiwgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuc3RlcFN5cyA9IHJldC5zdGVwcztcbiAgICAgICAgICAvL+S4iuS8oOatpeaVsFxuICAgICAgICAgIHRoaXMuYXBpdXBsb2FkU3RwZXMocmV0LnN0ZXBzKTtcblxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoZGF0YSwgY29kZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGDmraXmlbDorqHmlbDlmajorqLpmIXlpLHotKUsIGNvZGUgPSAke2NvZGV9YCk7XG4gICAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLy/ojrflj5bnlKjmiLforr7lrprnmoTku4rml6Xnm67moIdcbiAgICBnZXRHb2FsRGF5U3RlcHMoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBzdG9yYWdlLmdldCh7XG4gICAgICAgIGtleTogdGhpcy5nb2FsRGF5S2V5LFxuICAgICAgICBkZWZhdWx0OiAxMDAwMCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnc3RvcmFnZS5nZXQoKTogJywgSlNPTi5zdHJpbmdpZnkocmV0KSlcbiAgICAgICAgICB0aGF0LmdvYWxfZGF5ID0gcmV0XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnZ2V0IGZhaWwgLS0tICcgKyBlcnJvY29kZSArICc6JyArIGVycm9tc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8v5L+d5a2Y55So5oi36K6+5a6a55qE5LuK5pel55uu5qCHXG4gICAgc2V0R29hbERheVN0ZXBzKGRhdGEpIHtcbiAgICAgIHN0b3JhZ2Uuc2V0KHtcbiAgICAgICAga2V5OiB0aGlzLmdvYWxEYXlLZXksLy9cbiAgICAgICAgdmFsdWU6IGRhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ3N0b3JhZ2Uuc2V0KCk6ICcsIEpTT04uc3RyaW5naWZ5KHJldCkpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvbXNnLCBlcnJvY29kZSkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnc2V0IGZhaWwgLS0tICcgKyBlcnJvY29kZSArICc6JyArIGVycm9tc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8v6I635Y+W55So5oi36K6+5a6a55qE6K+m5oOFXG4gICAgZ2V0VXNlckRldGFpbHMoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBzdG9yYWdlLmdldCh7XG4gICAgICAgIGtleTogdGhpcy51c2VyRGV0YWlsc0tleSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLforr7lrpror6bmg4Xojrflj5bmiJDlip86JywgcmV0KTtcbiAgICAgICAgICBpZiAocmV0ICYmIHJldC50cmltKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEZXRhaWxzID0gSlNPTi5wYXJzZShyZXQpXG4gICAgICAgICAgICAvLyDmm7TmlrDlkITkuKrlsZ7mgKdcbiAgICAgICAgICAgIHRoYXQuYm9keV93ZWlnaHQgPSBOdW1iZXIodXNlckRldGFpbHMuYm9keV93ZWlnaHQpIHx8IHRoYXQuYm9keV93ZWlnaHQ7IC8vIOehruS/nei9rOaNouS4uuaVsOWtl+exu+Wei1xuICAgICAgICAgICAgdGhhdC5ib2R5X2hlaWdodCA9IE51bWJlcih1c2VyRGV0YWlscy5ib2R5X2hlaWdodCkgfHwgdGhhdC5ib2R5X2hlaWdodDsgLy8g56Gu5L+d6L2s5o2i5Li65pWw5a2X57G75Z6LXG4gICAgICAgICAgICB0aGF0LnNleCA9IHVzZXJEZXRhaWxzLnNleCAhPT0gdW5kZWZpbmVkID8gdXNlckRldGFpbHMuc2V4IDogdGhhdC5zZXg7IC8vIOS/neaMgeS4uuaVsOWtl+exu+Wei1xuICAgICAgICAgICAgdGhhdC5hZ2UgPSBOdW1iZXIodXNlckRldGFpbHMuYWdlKSB8fCB0aGF0LmFnZTsgLy8g56Gu5L+d6L2s5o2i5Li65pWw5a2X57G75Z6LXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmm7TmlrDlkI7nmoTnlKjmiLfor6bmg4U6JywgdGhhdC5ib2R5X3dlaWdodCwgdGhhdC5ib2R5X2hlaWdodCwgdGhhdC5zZXgsIHRoYXQuYWdlKTtcblxuICAgICAgICAgICAgdGhhdC51cGRhdGVCTUlUemwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycm9tc2csIGVycm9jb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdnZXQgZmFpbCAtLS0gJyArIGVycm9jb2RlICsgJzonICsgZXJyb21zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy/kv53lrZjnlKjmiLforr7lrprnmoTor6bmg4VcbiAgICBzZXRVc2VyRGV0YWlscygpIHtcbiAgICAgIGNvbnN0IHVzZXJEZXRhaWxzID0ge1xuICAgICAgICBib2R5X3dlaWdodDogdGhpcy5ib2R5X3dlaWdodCxcbiAgICAgICAgYm9keV9oZWlnaHQ6IHRoaXMuYm9keV9oZWlnaHQsXG4gICAgICAgIHNleDogdGhpcy5zZXgsXG4gICAgICAgIGFnZTogdGhpcy5hZ2VcbiAgICAgIH07XG4gICAgICBzdG9yYWdlLnNldCh7XG4gICAgICAgIGtleTogdGhpcy51c2VyRGV0YWlsc0tleSxcbiAgICAgICAgdmFsdWU6IHVzZXJEZXRhaWxzLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmV0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+ivpuaDheS/neWtmOaIkOWKnzonLCByZXQpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnlKjmiLfor6bmg4Xkv53lrZjlpLHotKU6JywgZXJyb21zZywgZXJyb2NvZGUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cblxuICAgIC8v5pu05paw5q2l5pWw6L+b5bqmXG4gICAgdXBkYXRlUHJvZ3Jlc3MoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZyhg5pu05paw5q2l5pWw6L+b5bqm77yB5LuK5pel5LqR5q2l5pWwPSR7dGhhdC5zdGVwc0RheUFwaX1gKVxuXG4gICAgICAvLyDlr7nlupTpobXpnaLnmoTmmL7npLrmraXmlbBcbiAgICAgIGNvbnN0IHNlcnZpY2Vfc3RlcCA9IFt0aGF0LnN0ZXBzRGF5QXBpLCB0aGF0LnN0ZXBzV2Vla0FwaSwgdGhhdC5zdGVwc01vb25BcGldO1xuICAgICAgLy8g5b2T5YmN5pi+56S65q2l5pWwXG4gICAgICBjb25zdCBjdXJyZW50c1N0ZXAgPSBzZXJ2aWNlX3N0ZXBbdGhhdC5jdXJyZW50UGFnZV07XG5cbiAgICAgIC8vIOWumuS5ieS4jeWQjOmhtemdouWvueW6lOeahOebruagh+atpeaVsFxuICAgICAgY29uc3QgZ29hbHMgPSBbdGhhdC5nb2FsX2RheSwgdGhhdC5nb2FsX2RheSAqIDcsIHRoYXQuZ29hbF9kYXkgKiAzMF07XG4gICAgICAvLyDlr7nlupTpobXpnaLnmoTnm67moIfmraXmlbBcbiAgICAgIGNvbnN0IGN1cnJlbnRHb2FsID0gZ29hbHNbdGhhdC5jdXJyZW50UGFnZV07XG4gICAgICAvLyDorqHnrpfmraXmlbDmr5TkvotcbiAgICAgIGNvbnN0IHN0ZXBSYXRpbyA9IGN1cnJlbnRzU3RlcCAvIGN1cnJlbnRHb2FsO1xuICAgICAgLy8g6K6h566X6L+b5bqm5YC85bm25pu05pawXG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4oc3RlcFJhdGlvICogMTAwLCAxMDApICogMC42NjsvL+S5mDAuNjbnmoTljp/lm6DkuLrov5vluqbnjq/mnIDlpKfop5LluqbkuLoyNjDluqbvvIzljbPkuInliIbkuYvkuozlnIZcblxuICAgICAgdGhpcy5zdGVwc192aWV3ID0gY3VycmVudHNTdGVwO1xuICAgICAgdGhpcy5zZWdtZW50c1RleHQgPSB0aGF0LnNlZ21lbnRzVGV4dHNbdGhhdC5jdXJyZW50UGFnZV1cblxuICAgICAgY29uc29sZS5sb2coYOebruWJjSR7dGhhdC5zZWdtZW50c1RleHR96L+b5bqmID0gJHtNYXRoLm1pbihzdGVwUmF0aW8gKiAxMDAsIDEwMCkudG9GaXhlZCgxKX0lYCk7XG5cbiAgICAgIHRoaXMudXBkYXRlTWlsZWFnZUFuZENhbG9yaWVzKCkvL+abtOaWsOWNoei3r+mHjO+8jOmHjOeoi1xuICAgIH0sXG5cblxuICAgIC8v5pu05paw5Y2h6Lev6YeM77yM6YeM56iLXG4gICAgdXBkYXRlTWlsZWFnZUFuZENhbG9yaWVzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5ib2R5X3dlaWdodCA8PSAwIHx8IHRoaXMuYm9keV93ZWlnaHQgPT09ICctJykge1xuICAgICAgICB0aGlzLmNhbG9yaWVzID0gXCIwLjBcIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy/mm7TmlrDph4znqItcbiAgICAgICAgdGhpcy5taWxlYWdlID0gKCh0aGF0LnN0ZXBzX3ZpZXcgKiAwLjYpIC8gMTAwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgLy8g6K6h566X5Y2h6Lev6YeM5raI6ICX77yM5bm25Y+q5pi+56S65LiA5L2N5bCP5pWwXG4gICAgICAgIHRoaXMuY2Fsb3JpZXMgPSAoMC4wMTc1ICogdGhhdC5ib2R5X3dlaWdodCAqIHRoYXQuc3RlcHNfdmlldykudG9GaXhlZCgxKTtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvL+abtOaWsEJNSSDkvZPohILnjodcbiAgICB1cGRhdGVCTUlUemwoKSB7XG4gICAgICBpZiAodGhpcy5ib2R5X3dlaWdodCA8PSAwIHx8IHRoaXMuYm9keV9oZWlnaHQgPD0gMCB8fCB0aGlzLmFnZSA8PSAwIHx8IHRoaXMuYm9keV93ZWlnaHQgPT09ICctJyB8fCB0aGlzLmJvZHlfaGVpZ2h0ID09PSAnLScgfHwgdGhpcy5hZ2UgPT09ICctJykge1xuICAgICAgICB0aGlzLnR6bCA9IFwiLS0tXCJcbiAgICAgICAgdGhpcy5ibWkgPSBcIi0tLVwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBibWkgPSAodGhpcy5ib2R5X3dlaWdodCAvICh0aGlzLmJvZHlfaGVpZ2h0ICogMC4wMSkgKiogMikudG9GaXhlZCgxKTtcbiAgICAgICAgY29uc3QgcGFyYW0xID0gMS4yICogcGFyc2VGbG9hdChibWkpO1xuICAgICAgICBjb25zdCBwYXJhbTIgPSB0aGlzLmFnZSAqIDAuMjM7XG4gICAgICAgIGNvbnN0IHBhcmFtMyA9IDUuNCArICgxMC44ICogdGhpcy5zZXgpO1xuXG4gICAgICAgIHRoaXMudHpsID0gcGFyc2VGbG9hdCgocGFyYW0xICsgcGFyYW0yIC0gcGFyYW0zKS50b0ZpeGVkKDEpKSArIFwiJVwiO1xuICAgICAgICB0aGlzLmJtaSA9IGJtaTtcbiAgICAgIH1cbiAgICAgIC8v5pu05paw5LqG5L2T6YeN77yM6ZyA6KaB5pu05paw5Y2h6Lev6YeMXG4gICAgICB0aGlzLnVwZGF0ZU1pbGVhZ2VBbmRDYWxvcmllcygpXG4gICAgfSxcblxuXG4gICAgLy/miZPlvIDln7rmnKzmg4XlhrXnqpflj6NcbiAgICBvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZygpIHtcbiAgICAgIGNvbnNvbGUubG9nKGDmiZPlvIDln7rmnKzmg4XlhrXnqpflj6NgKTtcbiAgICAgIHRoaXMub3BlbjIgPSB0cnVlXG4gICAgICB0aGlzLm9iaiA9IHtcbiAgICAgICAgdGl0bGU6ICfloavlhpnln7rmnKzmg4XlhrUnLFxuICAgICAgICBmaWVsZHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIui+k+WFpeaVtOaVsOaVsOWtl1wiLFxuICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8v5omT5byA6K6+5a6a55uu5qCH5q2l5pWw56qX5Y+jXG4gICAgb3BlblNldFN0ZXBzRGlhbG9nKCkge1xuXG4gICAgICB0aGlzLmdldFRyZWF0eVN0b3JhZ2UoKVxuXG4gICAgICBjb25zb2xlLmxvZyhg5omT5byA6K6+5a6a55uu5qCH5q2l5pWw56qX5Y+jYCk7XG5cbiAgICAgIHRoaXMub3BlbjEgPSB0cnVlXG4gICAgICB0aGlzLm9iaiA9IHtcbiAgICAgICAgdGl0bGU6ICforr7nva7mr4/ml6XmraXmlbAnLFxuICAgICAgICBmaWVsZHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIui+k+WFpeaVtOaVsOaVsOWtl1wiLFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+ehruWumuebruagh+atpeaVsFxuICAgIGVudGVyU3RlcHMoZXZ0KSB7XG4gICAgICB0aGlzLm9wZW4xID0gZmFsc2VcbiAgICAgIGNvbnN0IGdvYWxfc3RwZSA9IGV2dC5kZXRhaWwuZXZlbnQudmFsdWVcbiAgICAgIGNvbnNvbGUubG9nKGDorr7lrprkuobnm67moIfmraXmlbDvvJoke2dvYWxfc3RwZX1gKTtcbiAgICAgIHRoaXMuZ29hbF9kYXkgPSBnb2FsX3N0cGU7XG4gICAgICB0aGlzLnNldEdvYWxEYXlTdGVwcyhnb2FsX3N0cGUpO1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcygpO1xuXG4gICAgfSxcblxuICAgIC8v56Gu5a6a5Z+65pys5oOF5Ya1XG4gICAgZW50ZXJEZXRhaWxzKGV2dCkge1xuICAgICAgdGhpcy5vcGVuMiA9IGZhbHNlXG5cbiAgICAgIGNvbnN0IGtnID0gZXZ0LmRldGFpbC5ldmVudC5rZ1xuICAgICAgY29uc3QgY20gPSBldnQuZGV0YWlsLmV2ZW50LmNtXG4gICAgICBjb25zdCBhZ2UgPSBldnQuZGV0YWlsLmV2ZW50LmFnZVxuICAgICAgY29uc3Qgc2V4ID0gZXZ0LmRldGFpbC5ldmVudC5zZXhcbiAgICAgIGNvbnNvbGUubG9nKGDorr7lrprkuobkvZPph43vvJoke2tnfSzouqvpq5jvvJoke2NtfSzlubTpvoTvvJoke2FnZX0sc2V4OiR7c2V4fWApO1xuXG4gICAgICB0aGlzLmJvZHlfd2VpZ2h0ID0ga2c7XG4gICAgICB0aGlzLmJvZHlfaGVpZ2h0ID0gY207XG4gICAgICB0aGlzLmFnZSA9IGFnZTtcbiAgICAgIHRoaXMuc2V4ID0gc2V4O1xuXG4gICAgICB0aGlzLnNldFVzZXJEZXRhaWxzKClcbiAgICAgIHRoaXMudXBkYXRlQk1JVHpsKClcblxuICAgIH0sXG5cbiAgICBjbG9zZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKGDlhbPpl63kuobnqpflj6PvvJpgKTtcbiAgICAgIHRoaXMub3BlbjEgPSBmYWxzZVxuICAgICAgdGhpcy5vcGVuMiA9IGZhbHNlXG4gICAgfSxcblxuICAgIC8v5YiH5o2i5aSp77yM5ZGo77yM5pyI6aG16Z2iXG4gICAgY2hhbmdlVGFiYWN0aXZlOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSAhPT0gLTEpIHsgdGhpcy5nZXRUcmVhdHlTdG9yYWdlKCkgfS8v5pyq54K55Ye75pe25LiN6K+i6ZeuXG5cbiAgICAgIGNvbnNvbGUubG9nKGUuaW5kZXgpXG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZS5pbmRleDtcblxuICAgICAgdGhpcy5hcGlnZXRTdHBlcygpXG4gICAgfSxcblxuXG5cbiAgICAvL+iOt+WPluS6keatpeaVsFxuICAgIGFwaWdldFN0cGVzKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgdHlwZXMgPSBbXCJUT0RBWVwiLCBcIldFRUtcIiwgXCJNT09OXCJdO1xuICAgICAgY29uc3QgYXBpS2V5cyA9IFtcInN0ZXBzRGF5QXBpXCIsIFwic3RlcHNXZWVrQXBpXCIsIFwic3RlcHNNb29uQXBpXCJdO1xuICAgICAgdmFyIHQgPSB0eXBlc1t0aGF0LmN1cnJlbnRQYWdlXTtcbiAgICAgIGV4YW1wbGUuZ2V0c3RlcHMoe1xuICAgICAgICB0eXBlOiB0XG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYOiOt+WPluOAiiR7dH3jgIvkupHmraXmlbDmiJDlip/vvIEgLS0tLS0tPuS6keatpeaVsD0ke3Jlc3BvbnNlLmRhdGF9YCk7XG5cbiAgICAgICAgLy8g5qC55o2u5b2T5YmN6aG16Z2i5L+d5a2Y5q2l5pWwXG4gICAgICAgIHRoYXRbYXBpS2V5c1t0aGF0LmN1cnJlbnRQYWdlXV0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyDojrflj5Yke3R95q2l5pWw5aSx6LSlOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLy/kuIrkvKDmraXmlbBcbiAgICBhcGl1cGxvYWRTdHBlcyhjKSB7XG4gICAgICB2YXIgdCA9IERhdGUubm93KCk7XG4gICAgICBjb25zb2xlLmxvZyhg5LiK5Lyg5q2l5pWw5LitLS0tLT7mraXmlbA9JHtjfSx0ID0gJHt0fWApO1xuXG4gICAgICBleGFtcGxlLnVwbG9hZHN0ZXBzKHtcbiAgICAgICAgY291bnQ6IGMsXG4gICAgICAgIFwidGltZXN0YW1wXCI6IHRcbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIOS4iuS8oOatpeaVsHN1Y2Nlc3NmdWw6JywgcmVzcG9uc2UpO1xuICAgICAgICB0aGlzLnN0ZXBzRGF5QXBpID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcg5LiK5Lyg5q2l5pWwZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgfVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgcGFkZGluZy10b3A6IDI3cHhcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAyMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB3aWR0aDogNzAycHg7IGhlaWdodDogNTkycHg7IHBhZGRpbmc6IDI1cHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG1hcmdpbi10b3A6IDE1MHB4XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGhlaWdodDogNzBweFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTUycHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEzMHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj7mraXmlbDorrDlvZU8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI0cHg7IGNvbG9yOiAjODI4MjgyXCI+5Y2V5L2N77ya5q2lPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBtYXJnaW4tdG9wOiAyMHB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI2cHg7IGNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZDsgbWFyZ2luOiAyMHB4XCI+MjAyNDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj4yMDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+NDAwMDwvdGV4dD5cclxuICAgICAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogIzgyODI4MlwiPjYwMDA8L3RleHQ+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6ICM4MjgyODJcIj44MDAwPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjODI4MjgyXCI+MTAwMDA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxsaXN0IGNsYXNzPVwibGlzdFwiPlxyXG4gICAgICAgICAgPGxpc3QtaXRlbSB0eXBlPVwibGlzdEl0ZW1cIiBmb3I9XCJ7e2xpc3QzMGRheURhdGF9fVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwid2lkdGg6IDEyMHB4OyBmb250LXNpemU6IDIwcHg7IGNvbG9yOiAjMDAwMDAwXCI+e3skaXRlbS5zdW1tYXJ5RGF0ZX19PC90ZXh0PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7IGhlaWdodDogMzJweDsgbWFyZ2luLWxlZnQ6ICAyNHB4O2JhY2tncm91bmQtY29sb3I6IzAwYjJmZiA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDUwcHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxwcm9ncmVzcyBjbGFzcz1cInByb2dyZXNzXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgY29sb3I6ICMwMGIyZmY7bGF5ZXItY29sb3I6I2ZmZjtcIiBwZXJjZW50PVwie3skaXRlbS5wZXJjZW50fX1cIj48L3Byb2dyZXNzPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGlzdC1pdGVtPlxyXG4gICAgICAgIDwvbGlzdD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7IG1hcmdpbi10b3A6IDMwcHhcIj5cclxuICAgICAgICA8dGV4dCBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDExNnB4OyBwYWRkaW5nOiAxMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7IGZvbnQtc2l6ZTogMjRweDsgY29sb3I6ICM4MjgyODI7IHdpZHRoOiAyODBweFwiPuS7heaYvuekuuacgOi/kTMw5aSp5q2l5pWwPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuXHJcbjxzdHlsZT5cclxuICAubGlzdCB7XHJcbiAgICBsYXlvdXQtdHlwZTogc3RhZ2dlcjtcclxuICB9XHJcblxyXG4gIC5pdGVtIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDIwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbjwvc3R5bGU+XHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IGV4YW1wbGUgZnJvbSAnLi4vLi4vQ29tbW9uL2hlbHBlci9hcGlzL2V4YW1wbGUuanMnO1xyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBwcml2YXRlOiB7XHJcbiAgICAgIGxpc3QzMGRheURhdGE6IFtcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcbiAgICAgIHRoaXMuJHBhZ2Uuc2V0VGl0bGVCYXIoeyB0ZXh0OiAn5q2l5pWw6K6w5b2VJyB9KVxyXG4gICAgfSxcclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgIHRoaXMuaW5pdENoYXJ0KCk7XHJcblxyXG4gICAgICB0aGlzLmdldDMwZGF5UmVjb3JkKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBnZXQzMGRheVJlY29yZCgpIHtcclxuICAgICAgZXhhbXBsZS5nZXRzdGVwc2xpc3QoKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPluacgOi/kTMw5aSp6K6w5b2VLeaIkOWKn++8gTonLCByZXNwb25zZSk7XHJcbiAgICAgICAgICB0aGlzLmxpc3QzMGRheURhdGEgPSB0aGlzLmZvcm1hdERhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmnIDov5EzMOWkqeiusOW9lS3lpLHotKXvvIzlk43lupTkuLrnqbrmiJbmsqHmnInmlbDmja7vvIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyDojrflj5bmnIDov5EzMOWkqeiusOW9lS3lpLHotKXvvIEnLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIGZvcm1hdERhdGEoZGF0YSkge1xyXG4gICAgICBjb25zdCBtYXhTdGVwcyA9IDEwMDAwOyAvLyDlgYforr7mnIDlpKfmraXmlbDkuLoxMDAwMFxyXG4gICAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSAoaXRlbS5zdW1tYXJ5RGF0ZSkudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyDmj5Dlj5bmnIjku73lkozml6XmnJ/pg6jliIZcclxuICAgICAgICBsZXQgZm9ybWF0dGVkRGF0ZSA9IGRhdGUuc3Vic3RyaW5nKDQsIDYpICsgJy0nICsgZGF0ZS5zdWJzdHJpbmcoNiwgOCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0ZXBDb3VudCA9IHBhcnNlSW50KGl0ZW0uc3RlcENvdW50LCAxMCk7IC8vICBcclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5yb3VuZCgoc3RlcENvdW50IC8gbWF4U3RlcHMpICogMTAwKTsgLy8g6K6h566X55m+5YiG5q+U5bm25Zub6IiN5LqU5YWlXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN1bW1hcnlEYXRlOiBmb3JtYXR0ZWREYXRlLFxyXG4gICAgICAgICAgc3RlcENvdW50OiBzdGVwQ291bnQsXHJcbiAgICAgICAgICBwZXJjZW50OiBwZXJjZW50XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0Q2hhcnQoKSB7XHJcbiAgICB9LFxyXG4gIH1cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b3Bfdmlld1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiYWxpZ24taXRlbXM6IGNlbnRlcjsgd2lkdGg6IDEwMCU7IGhlaWdodDogODAlXCIgb25jbGljaz1cInRvTG9naW5cIj5cclxuICAgICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMTIwcHg7IGhlaWdodDogMTIwcHg7IG1hcmdpbi1sZWZ0OiA2MHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvdG91eGlhbmcucG5nXCIgLz5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IGhlaWdodDogMTIwcHg7IG1hcmdpbi1sZWZ0OiAxMHB4OyBwYWRkaW5nOiAxMHB4XCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImxvZ1wiIHN0eWxlPVwiY29sb3I6ICMwMDAwMDA7IGZvbnQtc2l6ZTogMzJweDsgZm9udC13ZWlnaHQ6IGJvbGRcIj57eyB1c2VyRGF0YS5sb2dpblBob25lIHx8ICfor7fngrnlh7vnmbvlvZUnIH19PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJ1c2VyX2lkXCIgc3R5bGU9XCJjb2xvcjogIzY5Njk2OTsgZm9udC1zaXplOiAyOHB4XCI+SUQ6e3t1c2VyRGF0YS51c2VySWR9fTwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogLTExMHB4OyBib3R0b206IDA7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgcGFkZGluZy1sZWZ0OiA1MHB4OyBwYWRkaW5nLXJpZ2h0OiA1MHB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvZ3JvdXAucG5nKTsgaGVpZ2h0OiAxNjRweDsgd2lkdGg6IDcwMnB4XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWl0ZW1zOiBmbGV4LWVuZFwiPlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiA3MnB4OyBmb250LXdlaWdodDogYm9sZFwiPnt7dXNlckRhdGEuYmFsYW5jZX19PC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiAzMnB4OyBtYXJnaW4tbGVmdDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTJweFwiPuWFgzwvdGV4dD5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyB3aWR0aDogMTUwcHg7IGhlaWdodDogNzBweDsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDI3MGRlZywgI2Y3YmJhNCAwJSwgI2ZkZWNkNyk7IGJvcmRlci1yYWRpdXM6IDE5MnB4XCIgb25jbGljaz1cInB1c2hQYWdlVGl4aWFuXCI+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cImNvbG9yOiAjYWE1MDIxOyBmb250LXNpemU6IDMycHg7IGZvbnQtd2VpZ2h0OiBib2xkXCI+5o+Q546wPC90ZXh0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJib3R0b21fdmlld1wiPlxyXG4gICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxODBweDsgbWFyZ2luLWJvdHRvbTogMjBweFwiIHNyYz1cIi9Db21tb24vaW1nL2Jhbm5lcl9tZS5wbmdcIiBvbmNsaWNrPVwib3BlbkFkXCIgLz5cclxuICAgICAgPGRpdiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDIwcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IHdpZHRoOiA3MDJweDsgaGVpZ2h0OiAzODBweDsgcGFkZGluZzogMjBweDsgZmxleC1kaXJlY3Rpb246IGNvbHVtblwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTUycHg7IGhlaWdodDogNDVweDsgYWxpZ24taXRlbXM6IGZsZXgtZW5kXCI+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEzMHB4OyBoZWlnaHQ6IDI4cHg7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiA1OHB4XCI+PC9kaXY+XHJcbiAgICAgICAgICA8dGV4dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQycHg7IGZvbnQtc2l6ZTogMzFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgY29sb3I6ICMwMDAwMDA7IG1hcmdpbi1sZWZ0OiAzcHhcIj7miJHnmoTmnI3liqE8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IG1hcmdpbi1ib3R0b206IDMwcHg7IG1hcmdpbi10b3A6IDIwcHhcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwiYWRkRGVza3RvcFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTEucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5re75Yqg5qGM6Z2iPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJhbWVfXCIgb25jbGljaz1cInB1c2hQYWdlZmVlZGJhY2tcIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWUyLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuS4vuaKpeWPjemmiDwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNod2ViKDEpXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lMy5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7luK7liqnkuK3lv4M8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaHdlYigyKVwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTQucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+55So5oi35Y2P6K6uPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNod2ViKDMpXCI+XHJcbiAgICAgICAgICAgIDxpbWFnZSBjbGFzcz1cImZyYW1lX2ltYVwiIHNyYz1cIi9Db21tb24vaW1nL2ZyYW1lNS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZyYW1lX3RleHRcIj7pmpDnp4HmlL/nrZY8L3RleHQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmFtZV9cIiBvbmNsaWNrPVwicHVzaFBhZ2VwZXJtaXNzaW9uc1wiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTYucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+6K6+572uPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IG9uY2xpY2s9XCJwdXNoUGFnZWFib3V0XCIgY2xhc3M9XCJmcmFtZV9cIj5cclxuICAgICAgICAgICAgPGltYWdlIGNsYXNzPVwiZnJhbWVfaW1hXCIgc3JjPVwiL0NvbW1vbi9pbWcvZnJhbWU3LnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZnJhbWVfdGV4dFwiPuWFs+S6jjwvdGV4dD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZyYW1lX1wiIG9uY2xpY2s9XCJwdXNoUGFnZWxvZ091dFwiPlxyXG4gICAgICAgICAgICA8aW1hZ2UgY2xhc3M9XCJmcmFtZV9pbWFcIiBzcmM9XCIvQ29tbW9uL2ltZy9mcmFtZTgucG5nXCIgLz5cclxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmcmFtZV90ZXh0XCI+5rOo6ZSAPC90ZXh0PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c3R5bGU+XHJcbiAgLmZyYW1lXyB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgLmZyYW1lX2ltYSB7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDhweDtcclxuICB9XHJcbiAgLmZyYW1lX3RleHQge1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICB3aWR0aDogMTA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG5cclxuICAudG9wX3ZpZXcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDYwMHB4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvQ29tbW9uL2ltZy9iZ19tZS5wbmdcIik7IC8qIOabv+aNouS4uuS9oOeahOiDjOaZr+WbvueJh+i3r+W+hCAqL1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgLyog5L2/6IOM5pmv5Zu+54mH6KaG55uW5pW05Liq5a655ZmoICovXHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IC8qIOWwhuiDjOaZr+WbvueJh+WxheS4reWvuem9kCAqL1xyXG4gIH1cclxuXHJcbiAgLmJvdHRvbV92aWV3IHtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAtOTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZToge1xyXG5cclxuXHJcbiAgICAgIHVzZXJEYXRhOiB7fSxcclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcblxyXG4gICAgICB0aGlzLmdldFVzZXIoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFVzZXIoKSB7XHJcbiAgICAgIHRoaXMudXNlckRhdGEgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgdG9Mb2dpbigpIHtcclxuICAgICAgdmFyIHBob25lID0gdGhpcy51c2VyRGF0YS5sb2dpblBob25lXHJcbiAgICAgIGlmIChwaG9uZSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiAnUGFnZV9sb2dpbidcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2hQYWdlVGl4aWFuKCkge1xyXG5cclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX1RpeGlhbidcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBwdXNoUGFnZWFib3V0KCkge1xyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ1BhZ2VfYWJvdXQnXHJcblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwdXNoUGFnZWZlZWRiYWNrKCkge1xyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ2ZlZWRiYWNrJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwdXNoUGFnZWxvZ091dCgpIHtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdsb2dPdXQnXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBwdXNoUGFnZXBlcm1pc3Npb25zKCkge1xyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ3Blcm1pc3Npb25zJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb3BlbkFkKCkge1xyXG5cclxuICAgICAgLy/lj4vnm5/kuovku7bmiZPngrlcclxuICAgICAgJHVtZW5nX3N0YXQudHJhY2tFdmVudCgnd2RfeHlmZGRoaicsICfngrnlh7snKTtcclxuXHJcblxyXG4gICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgIHVyaTogJ1BhZ2VfY2ZkLydcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyAkcm91dGVyLnB1c2goe1xyXG4gICAgICAvLyAgIHVyaTogXCJoYXA6Ly9hcHAvY29tLmhhaXR1by5zZXRwcGxhbmV0L1BhZ2VfY2ZkLz9jb250ZW50X2lkPS0xJmFkZ3JvdXBfaWQ9LTEmY2FtcGFpZ25faWQ9LTEmY2FsbGJhY2s9NDUwNzk5MTElMjYtMSUyNjE0NjI5NTA0Njc1MTEyODI5NDQlMjYyMDI0LTA3LTE3JTIwMTclM0EyNCUzQTI0JTI2M0hJak1aUGx3JTJCVTNBb1B0VVFzMUFvQ0I3NDVoSjNQSmt3ZWt3UEZyY1dQVmRRaWl6T2w1WWV3WDNPYjNkcXMlM0QlMjYwJnJlZmVycmVyPS0xJmNoYW5uZWw9S1lZJmlwPTEyNy4wLjAuMSZvYWlkPTMwYWMxODQwLTA2YWEtNDYxZi05NTk0LTdmN2IzNjVmMGRmZSZjb3JwX2lkPTE0NjI5NTA0Njc1MTEyODI5NDQmY2hhbm5lbFZhbHVlPUtZWVwiXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSxcclxuICAgIGFkZERlc2t0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+a3u+WKoOahjOmdoicpO1xyXG4gICAgICBjb25zdCBzaG9ydGN1dCA9IHJlcXVpcmUoXCJAc3lzdGVtLnNob3J0Y3V0XCIpXHJcbiAgICAgIHNob3J0Y3V0Lmhhc0luc3RhbGxlZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hhc0luc3RhbGxlZCBzdWNjZXNzIHJldC0tLScgKyByZXQpO1xyXG4gICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ+ahjOmdouWbvuagh+W3suWIm+W7uicsXHJcbiAgICAgICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3J0Y3V0Lmluc3RhbGwoe1xyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICfmt7vliqDmoYzpnaLmlrnlvI/mm7Tmlrnkvr8nLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGluZyBjcmVhdGVTaG9ydEN1dCBzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGluZyBjcmVhdGVTaG9ydEN1dCBmYWlsJyk7XHJcbiAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb21zZywgZXJyb2NvZGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoYXNJbnN0YWxsZWQgZmFpbCByZXQtLS0nICsgZXJyb21zZyk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBwdXNod2ViKGkpIHtcclxuXHJcblxyXG4gICAgICB2YXIgdXJsID0gJydcclxuICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICB1cmwgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVybDE7XHJcbiAgICAgIH0gaWYgKGkgPT09IDIpIHtcclxuICAgICAgICB1cmwgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVybDI7XHJcbiAgICAgIH0gaWYgKGkgPT09IDMpIHtcclxuICAgICAgICB1cmwgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVybDM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICR3ZWJ2aWV3LmxvYWRVcmwoe1xyXG4gICAgICAgIHVybDogdXJsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gIH07XHJcbjwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cInBhZ2VyZWNvcmRcIiBzcmM9XCIuL1BhZ2VfUmVjb3JkL2luZGV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJwYWdlaG9tZVwiIHNyYz1cIi4vUGFnZV9Ib21lL2luZGV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJwYWdldXNlclwiIHNyYz1cIi4vUGFnZV9Vc2VyL2luZGV4XCI+PC9pbXBvcnQ+XG5cblxuPHRlbXBsYXRlPlxuXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG5cdFx0PHRhYnMgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cblx0XHRcdDx0YWItY29udGVudD5cblx0XHRcdFx0PGJsb2NrIGZvcj1cImRhdGFzLmxpc3RcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaXRlbS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxwYWdlaG9tZSBpZj1cInt7JGl0ZW0udGl0bGU9PSfpppbpobUnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZWhvbWU+XG5cdFx0XHRcdFx0XHQ8cGFnZXJlY29yZCBpZj1cInt7JGl0ZW0udGl0bGU9PSfmraXmlbAnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZXJlY29yZD5cblx0XHRcdFx0XHRcdDxwYWdldXNlciBpZj1cInt7JGl0ZW0udGl0bGU9PSfmiJHnmoQnP3RydWU6ZmFsc2V9fVwiPjwvcGFnZXVzZXI+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvYmxvY2s+XG5cdFx0XHQ8L3RhYi1jb250ZW50PlxuXG5cdFx0XHQ8dGFiLWJhciBjbGFzcz1cInRhYl9iYXJcIj5cblx0XHRcdFx0PGJsb2NrIGZvcj1cImRhdGFzLmxpc3RcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGFiX2l0ZW1cIj5cblx0XHRcdFx0XHRcdDxpbWFnZSBzcmM9XCJ7eyRpdGVtLnNob3c/JGl0ZW0ucGljX2Nob2ljZTokaXRlbS5waWN9fVwiIC8+XG5cdFx0XHRcdFx0XHQ8dGV4dCBzdHlsZT1cImNvbG9yOiB7eyRpdGVtLmNvbG9yfX1cIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvYmxvY2s+XG5cdFx0XHQ8L3RhYi1iYXI+XG5cdFx0PC90YWJzPlxuXG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuXHQuY29udGFpbmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuXHR9XG5cblxuXHQudGFiX2JhciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcblx0XHR3aWR0aDogNzUwcHg7XG5cdFx0Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcblx0XHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcblx0fVxuXG5cdC50YWJfaXRlbSB7XG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdHBhZGRpbmctdG9wOiAxNHB4O1xuXHRcdHBhZGRpbmctYm90dG9tOiAxMXB4O1xuXHRcdHdpZHRoOiAxNzFweDtcblx0XHRoZWlnaHQ6IDEwNC4ycHg7XG5cdH1cblxuXHQudGFiX2l0ZW0gaW1hZ2Uge1xuXHRcdHdpZHRoOiA1MHB4O1xuXHRcdGhlaWdodDogNTBweDtcblx0XHRyZXNpemUtbW9kZTogY29udGFpbjtcblx0XHRvcGFjaXR5OiAwLjU7XG5cdH1cblxuXHQudGFiX2l0ZW0gaW1hZ2U6YWN0aXZlIHtcblx0XHR3aWR0aDogNTBweDtcblx0XHRoZWlnaHQ6IDUwcHg7XG5cdFx0cmVzaXplLW1vZGU6IGNvbnRhaW47XG5cdH1cblxuXHQudGFiX2l0ZW0gdGV4dCB7XG5cdFx0Zm9udC1zaXplOiAyMXB4O1xuXHRcdG1hcmdpbi10b3A6IDEwcHg7XG5cdH1cblxuXHQuaXRlbS1jb250YWluZXIge1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHR9XG5cblx0Lm1haW4tdGV4dCB7XG5cdFx0Zm9udC1zaXplOiAxMDBweDtcblx0XHRjb2xvcjogIzVmOWVhMDtcblx0fVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRwcml2YXRlOiB7XG5cdFx0XHRkYXRhczoge1xuXHRcdFx0XHRjb2xvcl9ub3JtYWw6ICcjQzhDOEM4Jyxcblx0XHRcdFx0Y29sb3JfYWN0aXZlOiAnIzAwQjJGRicsXG5cdFx0XHRcdHNob3c6IHRydWUsXG5cdFx0XHRcdGxpc3Q6IFt7XG5cdFx0XHRcdFx0aTogMCxcblx0XHRcdFx0XHRjb2xvcjogJyNGRjc1MDAnLFxuXHRcdFx0XHRcdHBpYzogJy9Db21tb24vaW1nL2Jhcl8xLnBuZycsXG5cdFx0XHRcdFx0cGljX2Nob2ljZTogJy9Db21tb24vaW1nL2Jhcl8xMS5wbmcnLFxuXHRcdFx0XHRcdHNob3c6IHRydWUsXG5cdFx0XHRcdFx0dGl0bGU6ICfpppbpobUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpOiAxLFxuXHRcdFx0XHRcdGNvbG9yOiAnIzg3ODc4NycsXG5cdFx0XHRcdFx0cGljOiAnL0NvbW1vbi9pbWcvYmFyXzIucG5nJyxcblx0XHRcdFx0XHRwaWNfY2hvaWNlOiAnL0NvbW1vbi9pbWcvYmFyXzIyLnBuZycsXG5cdFx0XHRcdFx0c2hvdzogZmFsc2UsXG5cdFx0XHRcdFx0dGl0bGU6ICfmraXmlbAnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpOiAyLFxuXHRcdFx0XHRcdGNvbG9yOiAnIzg3ODc4NycsXG5cdFx0XHRcdFx0cGljOiAnL0NvbW1vbi9pbWcvYmFyXzMucG5nJyxcblx0XHRcdFx0XHRwaWNfY2hvaWNlOiAnL0NvbW1vbi9pbWcvYmFyXzMzLnBuZycsXG5cdFx0XHRcdFx0c2hvdzogZmFsc2UsXG5cdFx0XHRcdFx0dGl0bGU6ICfmiJHnmoQnXG5cdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXG5cblx0XHR9LFxuXHRcdGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5saXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5kYXRhcy5saXN0W2ldO1xuXHRcdFx0XHRlbGVtZW50LnNob3cgPSBmYWxzZTtcblx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3Jfbm9ybWFsO1xuXHRcdFx0XHRpZiAoaSA9PT0gZS5pbmRleCkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2hvdyA9IHRydWU7XG5cdFx0XHRcdFx0ZWxlbWVudC5jb2xvciA9IHRoaXMuZGF0YXMuY29sb3JfYWN0aXZlO1xuXG5cdFx0XHRcdFx0aWYgKGUuaW5kZXggPT09IDApIHtcblx0XHRcdFx0XHRcdCR1dGlscy5oaWRlQmFuZXJBZCgpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCR1dGlscy52aWV3QmFubmVyKClcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvbkluaXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdH0sXG5cdFx0YXN5bmMgb25TaG93KG9wdGlvbnMpIHtcblxuXHRcdFx0JHVtZW5nX3N0YXQucmVzdW1lKHRoaXMpXG5cdFx0XHRjb25zb2xlLmxvZygn5Li76aG1IG9uU2hvdygpLS0tLS0tLS0tLS0tLS0tLS0+Jyk7XG5cdFx0XHR0aGlzLmdldFVzZXIoKTtcblxuXHRcdFx0Ly/mmL7npLpiYW5uZXIg5bm/5ZGK6auY5bqm77yM5bqV6YOo57yp6L+bXG5cdFx0XHQvLyAkdXRpbHMuc2hvd0Jhbm5lckFkKDE3NSlcblxuXHRcdH0sXG5cdFx0Z2V0VXNlcigpIHtcblx0XHRcdCRhcGlzLnVzZXIuZ2V0VXNlckluZm8oKS50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ+eUqOaIt+S/oeaBry0tLS0tLS0tLS0tLS0tLS0tPicgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcblx0XHRcdFx0dGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51c2VyRGF0YS5sb2dpblBob25lID0gcmVzLmRhdGEubG9naW5QaG9uZVxuXHRcdFx0XHR0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhLnVzZXJJZCA9IHJlcy5kYXRhLnVzZXJJZFxuXHRcdFx0XHR0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVzZXJEYXRhLmJhbGFuY2UgPSByZXMuZGF0YS5iYWxhbmNlXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0b25IaWRlKCkge1xuXHRcdFx0JHVtZW5nX3N0YXQucGF1c2UodGhpcyk7Ly/lnKhvbkhpZGXmlrnms5XnmoTnrKzkuIDooYzliqDlhaXmraTku6PnoIFcblx0XHRcdC8v6ZyA6KaB6ZqQ6JeP5pe25bCx6ZSA5q+BYmFubmVyXG5cdFx0XHQvLyAkdXRpbHMuZGVzdHJveUJhbm5lcigpO1xuXHRcdH1cblx0fTtcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgPHN0YWNrIHN0eWxlPVwie3tzdHlsZX19XCI+XG4gICAgPGNhbnZhcyBpZD1cInt7aWR9fVwiIGNsYXNzPVwiY2FudmFzXCI+PC9jYW52YXM+XG4gICAgPGRpdiBjbGFzcz1cInNsb3RcIj5cbiAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8L2Rpdj5cbiAgPC9zdGFjaz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGNvbnN0IHRvQW5nbGUgPSBhID0+IChhIC8gMTgwKSAqIE1hdGguUEk7XG4gIGNvbnN0IHBlcmNlbnQgPSBhID0+IHRvQW5nbGUoKGEgLyAxMDApICogMzYwKTtcblxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJlZ2luQW5nbGU6IHRvQW5nbGUodGhpcy5zQW5nbGUpLFxuICAgICAgICBzdGFydEFuZ2xlOiB0b0FuZ2xlKHRoaXMuc0FuZ2xlKSxcbiAgICAgICAgZW5kQW5nbGU6IHBlcmNlbnQodGhpcy5wZXJjZW50KSArIHRvQW5nbGUodGhpcy5zQW5nbGUpLFxuICAgICAgICBjb2xvcjogdGhpcy5zdHJva2VDb2xvclxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcbiAgICAgIHBlcmNlbnQ6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDEwMDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAzMDBcbiAgICAgIH0sXG4gICAgICBzdHJva2VXaWR0aDoge1xuICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgIGRlZmF1bHQ6IDIwXG4gICAgICB9LFxuICAgICAgc3Ryb2tlQ29sb3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcIiMyZDhjZjBcIlxuICAgICAgfSxcbiAgICAgIHN0cm9rZUxpbmVjYXA6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcInJvdW5kXCIgLy9yb3VuZHxzcXVhcmV8YnV0dFxuICAgICAgfSxcbiAgICAgIHRyYWlsV2lkdGg6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAyMFxuICAgICAgfSxcbiAgICAgIHRyYWlsQ29sb3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcIiNlYWVlZjJcIlxuICAgICAgfSxcbiAgICAgIHNob3dUcmFpbDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICB9LFxuICAgICAgc0FuZ2xlOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgZGVmYXVsdDogMFxuICAgICAgfSxcbiAgICAgIGFudGljbG9ja3dpc2U6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBpZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwiY2FudmFzSWRcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiBgd2lkdGg6ICR7dGhpcy5zaXplfXB4OyBoZWlnaHQ6ICR7dGhpcy5zaXplfXB4O2A7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG9uSW5pdCgpIHtcbiAgICAgIHRoaXMuJHdhdGNoKFwic3Ryb2tlQ29sb3JcIiwgXCJ3YXRjaFN0cm9rZUNvbG9yQ2hhbmdlXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJwZXJjZW50XCIsIFwid2F0Y2hQZXJjZW50Q2hhbmdlXCIpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy4kZWxlbWVudCh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgIH0sIDApO1xuICAgIH0sXG5cbiAgICB3YXRjaFN0cm9rZUNvbG9yQ2hhbmdlKG5ld1ZhbCkge1xuICAgICAgdGhpcy5jb2xvciA9IG5ld1ZhbDtcbiAgICB9LFxuXG4gICAgd2F0Y2hQZXJjZW50Q2hhbmdlKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICBpZiAobmV3VmFsIDw9IDApIHsgbmV3VmFsID0gMDsgfVxuICAgICAgaWYgKG5ld1ZhbCA+PSAxMDApIHsgbmV3VmFsID0gMTAwOyB9XG4gICAgICB0aGlzLmVuZEFuZ2xlID0gcGVyY2VudChuZXdWYWwpICsgdGhpcy5iZWdpbkFuZ2xlO1xuXG4gICAgICB0aGlzLmNsZWFyVGltZXIoKTtcblxuICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfSxcblxuICAgIGRyYXcoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFudGljbG9ja3dpc2UsXG4gICAgICAgIHN0cm9rZUxpbmVjYXAsXG4gICAgICAgIHNob3dUcmFpbCxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgc3Ryb2tlV2lkdGgsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICB0cmFpbFdpZHRoLFxuICAgICAgICB0cmFpbENvbG9yLFxuICAgICAgICBjdHhcbiAgICAgIH0gPSB0aGlzO1xuICAgICAgLy/lnIbnmoTlnIblv4PkvY3nva5cbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2l6ZSAvIDI7XG4gICAgICBjb25zdCByYWRpdXMgPSBwb3NpdGlvbiAtIHN0cm9rZVdpZHRoIC8gMjtcbiAgICAgIGNvbnN0IHAgPSAyICogTWF0aC5QSTtcbiAgICAgIGNvbnN0IGJlZ2luQW5nbGUgPSBhbnRpY2xvY2t3aXNlID8gcCAtIHRoaXMuYmVnaW5BbmdsZSA6IHRoaXMuYmVnaW5BbmdsZTtcbiAgICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSBhbnRpY2xvY2t3aXNlID8gcCAtIHRoaXMuc3RhcnRBbmdsZSA6IHRoaXMuc3RhcnRBbmdsZTtcbiAgICAgIGNvbnN0IGVuZEFuZ2xlID0gYW50aWNsb2Nrd2lzZSA/IHAgLSB0aGlzLmVuZEFuZ2xlIDogdGhpcy5lbmRBbmdsZTtcbiAgICAgIGNvbnN0IHN0ZXAgPSAoZW5kQW5nbGUgLSBzdGFydEFuZ2xlKSAvIDEwMDtcbiAgICAgIGxldCB0ZW1wRW5kQW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gZHJhd0JhY2tncm91bmQoKSB7XG4gICAgICAgIC8vXGIg57uY5Yi26IOM5pmv546vXG4gICAgICAgIGlmIChzaG93VHJhaWwpIHtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4LmFyYyhwb3NpdGlvbiwgcG9zaXRpb24sIHJhZGl1cywgYmVnaW5BbmdsZSwgMC41KTtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gdHJhaWxXaWR0aDtcbiAgICAgICAgICBjdHgubGluZUNhcCA9IHN0cm9rZUxpbmVjYXA7XG4gICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdHJhaWxDb2xvcjtcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZHJhd0NpcmNsZSh0ZW1wRW5kQW5nbGUpIHtcbiAgICAgICAgLy8g57uY5Yi26L+b5bqmXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgYmVnaW5BbmdsZSxcbiAgICAgICAgICB0ZW1wRW5kQW5nbGUsXG4gICAgICAgICAgYW50aWNsb2Nrd2lzZVxuICAgICAgICApO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gc3Ryb2tlV2lkdGg7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHgubGluZUNhcCA9IHN0cm9rZUxpbmVjYXA7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH1cblxuICAgICAgKGZ1bmN0aW9uIHN0YXJ0RHJhdyhjdHgpIHtcbiAgICAgICAgdGVtcEVuZEFuZ2xlICs9IHN0ZXA7XG4gICAgICAgIGlmICghYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPD0gYmVnaW5BbmdsZSkge1xuICAgICAgICAgIHRlbXBFbmRBbmdsZSA9IGJlZ2luQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhbnRpY2xvY2t3aXNlICYmIHRlbXBFbmRBbmdsZSA+PSAyICogTWF0aC5QSSArIGJlZ2luQW5nbGUpIHtcbiAgICAgICAgICB0ZW1wRW5kQW5nbGUgPSAyICogTWF0aC5QSSArIGJlZ2luQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFudGljbG9ja3dpc2UgJiYgdGVtcEVuZEFuZ2xlIDw9IGJlZ2luQW5nbGUgLSAyICogTWF0aC5QSSkge1xuICAgICAgICAgIHRlbXBFbmRBbmdsZSA9IGJlZ2luQW5nbGUgLSAyICogTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW50aWNsb2Nrd2lzZSAmJiB0ZW1wRW5kQW5nbGUgPj0gYmVnaW5BbmdsZSkge1xuICAgICAgICAgIHRlbXBFbmRBbmdsZSA9IGJlZ2luQW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAweDdmZmZmZmZmLCAweDdmZmZmZmZmKTtcbiAgICAgICAgZHJhd0JhY2tncm91bmQoKTtcbiAgICAgICAgZHJhd0NpcmNsZSh0ZW1wRW5kQW5nbGUpO1xuICAgICAgICBfdGhpcy5zdGFydEFuZ2xlID0gYW50aWNsb2Nrd2lzZVxuICAgICAgICAgID8gMiAqIE1hdGguUEkgLSB0ZW1wRW5kQW5nbGVcbiAgICAgICAgICA6IHRlbXBFbmRBbmdsZTtcbiAgICAgICAgaWYgKGNvdW50ID49IDEwMCkgeyByZXR1cm4gfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICBfdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHN0YXJ0RHJhdyhjdHgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9KShjdHgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmuIXpmaTlrprml7blmahcbiAgICAgKi9cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAuc2xvdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbiAgLmNhbnZhcyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYXBleC1kaWFsb2dcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWFzayB7e3Nob3dNb2RhbD8nbWFzay1leGlzdCc6J21hc2stbm9uZSd9fVwiIGlmPVwie3t2aXNpYmxlfX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIiBzdHlsZT1cInt7c2V0RGlhbG9nfX1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGl0bGUge3tkZWZhdWx0T3B0aW9ucy5jbG9zYWJsZT8ndGl0bGUtY2xvc2UnOid0aXRsZS1ub25lJ319XCI+e3sgZGVmYXVsdFByb21wdC50aXRsZSB8fCBkZWZhdWx0T3B0aW9ucy50aXRsZSB8fCB0aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDx0YWJzIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdDEnIH19XCIgY2xhc3M9XCJ0YWJzXCIgb25jaGFuZ2U9XCJjaGFuZ2VUYWJhY3RpdmVcIj5cbiAgICAgICAgICAgIDx0YWItYmFyIGNsYXNzPVwidGFiLWJhclwiPlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+5aWzPC90ZXh0PlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRhYi10ZXh0XCI+55S3PC90ZXh0PlxuICAgICAgICAgICAgPC90YWItYmFyPlxuICAgICAgICAgIDwvdGFicz5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJhbGlnbi1jb250ZW50OiBjZW50ZXJcIiBpZj1cInt7IGRpYWxvZ1R5cGUgPT09ICdwcm9tcHQnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJmb2N1c1wiIHR5cGU9XCJ7eyBkZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSB9fVwiIHN0eWxlPVwie3tkZWZhdWx0UHJvbXB0LmlucHV0U3R5bGV9fVwiIHZhbHVlPVwie3sgdmFsdWUgfX1cIiBwbGFjZWhvbGRlcj1cInt7IGRlZmF1bHRQcm9tcHQucGxhY2Vob2xkZXIgfX1cIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VcIiBtYXhsZW5ndGg9XCJ7eyBkZWZhdWx0UHJvbXB0Lm1heGxlbmd0aCA9PT0gLTE/Jyc6ZGVmYXVsdFByb21wdC5tYXhsZW5ndGggfX1cIiBvbmVudGVya2V5Y2xpY2s9XCJiaW5kRW50ZXJcIiAvPlxuICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTsgZm9udC1zaXplOiAyOHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB3aWR0aDogODhweDsgaGVpZ2h0OiA4OHB4XCI+5q2lPC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweFwiIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdDEnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJpZGtnXCIgdHlwZT1cInt7IGRlZmF1bHRQcm9tcHQuZmllbGR0eXBlIH19XCIgc3R5bGU9XCJ7e2RlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZX19XCIgdmFsdWU9XCJ7eyBrZyB9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl5L2T6YeNXCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdla2dcIiBtYXhsZW5ndGg9XCIzXCIgb25lbnRlcmtleWNsaWNrPVwiYmluZEVudGVya2dcIiAvPlxuICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTsgZm9udC1zaXplOiAyOHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB3aWR0aDogODhweDsgaGVpZ2h0OiA4OHB4XCI+a2c8L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMjBweFwiIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdDEnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJpZGNtXCIgdHlwZT1cInt7IGRlZmF1bHRQcm9tcHQuZmllbGR0eXBlIH19XCIgc3R5bGU9XCJ7e2RlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZX19XCIgdmFsdWU9XCJ7eyBjbSB9fVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl6Lqr6auYXCIgb25jaGFuZ2U9XCJiaW5kQ2hhbmdlY21cIiBtYXhsZW5ndGg9XCIzXCIgb25lbnRlcmtleWNsaWNrPVwiYmluZEVudGVyY21cIiAvPlxuICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNnB4OyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyOiAycHggc29saWQgI2U5ZTllOTsgZm9udC1zaXplOiAyOHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB3aWR0aDogODhweDsgaGVpZ2h0OiA4OHB4XCI+Y208L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweFwiIGlmPVwie3sgZGlhbG9nVHlwZSA9PT0gJ3Byb21wdDEnIH19XCI+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJpZGFnZVwiIHR5cGU9XCJ7eyBkZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSB9fVwiIHN0eWxlPVwie3tkZWZhdWx0UHJvbXB0LmlucHV0U3R5bGV9fVwiIHZhbHVlPVwie3sgYWdlIH19XCIgcGxhY2Vob2xkZXI9XCLovpPlhaXlubTpvoRcIiBvbmNoYW5nZT1cImJpbmRDaGFuZ2VhZ2VcIiBtYXhsZW5ndGg9XCIzXCIgb25lbnRlcmtleWNsaWNrPVwiYmluZEVudGVyYWdlXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTZweDsgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDE2cHg7IGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7IGZvbnQtc2l6ZTogMjhweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgd2lkdGg6IDg4cHg7IGhlaWdodDogODhweFwiPuWygTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4ge3tkaWFsb2dUeXBlID09PSAnYWx0ZXInfHx0aGlzLnZlcnRpY2FsPT09dHJ1ZT8nYnRuLXZlcnRpY2FsJzonYnRuLWhvcml6b250YWwnfX1cIj5cbiAgICAgICAgICA8YmxvY2sgaWY9XCJ7e2RlZmF1bHRPcHRpb25zLmJ1dHRvbnMubGVuZ3RoPT09MH19XCI+XG4gICAgICAgICAgICA8ZGl2IGlmPVwie3tkaWFsb2dUeXBlIT09J2FsdGVyJ319XCIgY2xhc3M9XCJidG5ib3gxXCIgb25jbGljaz1cImJpbmRDYW5jZWxcIj5cbiAgICAgICAgICAgICAgPHRleHQ+e3sgZGVmYXVsdE9wdGlvbnMuY2FuY2VsIH19PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG9uY2xpY2s9XCJiaW5kQWZmaXJtXCIgY2xhc3M9XCJidG5ib3hcIj5cbiAgICAgICAgICAgICAgPHRleHQ+e3sgZGVmYXVsdE9wdGlvbnMuYWZmaXJtIH19PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9ibG9jaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YToge1xuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICAgIHNldERpYWxvZzoge30sXG4gICAgICB2YWx1ZTogXCJcIixcbiAgICAgIGtnOiBcIlwiLFxuICAgICAgY206IFwiXCIsXG4gICAgICBhZ2U6IFwiXCIsXG4gICAgICBzZXg6IDAsLy/mgKfliKsgIDEg55S377yMMCDlpbNcbiAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgIGNsb3NhYmxlOiBmYWxzZSxcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIGJ1dHRvbnM6IFtdLFxuICAgICAgICBjYW5jZWw6IFwi5Y+W5raIXCIsXG4gICAgICAgIGFmZmlybTogXCLnoa7lrppcIlxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRQcm9tcHQ6IHtcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICBrZzogXCJcIixcbiAgICAgICAgY206IFwiXCIsXG4gICAgICAgIGFnZTogXCJcIixcbiAgICAgICAgZmllbGR0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCLor7fovpPlhaXmlofmnKxcIixcbiAgICAgICAgZm9jdXM6IGZhbHNlLFxuICAgICAgICBpZGtnOiBmYWxzZSxcbiAgICAgICAgaW5wdXRTdHlsZToge30sXG4gICAgICAgIG1heGxlbmd0aDogLTFcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICB2ZXJ0aWNhbDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogXCLpu5jorqTmoIfpophcIlxuICAgICAgfSxcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcIum7mOiupOWGheWuuVwiXG4gICAgICB9LFxuICAgICAgZGlhbG9nU3R5bGU6IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICBkZWZhdWx0OiB7fVxuICAgICAgfSxcbiAgICAgIGRpYWxvZ1R5cGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcInRleHRcIlxuICAgICAgfSxcbiAgICAgIHZpc2libGU6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH0sXG4gICAgICBwcm9tcHQ6IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICBkZWZhdWx0OiB7fVxuICAgICAgfVxuICAgIH0sXG4gICAgb25Jbml0KCkge1xuICAgICAgdGhpcy4kd2F0Y2goXCJ2aXNpYmxlXCIsIFwibW9kYWxIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJkaWFsb2dTdHlsZVwiLCBcImRpYWxvZ1N0eWxlSGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwiZGVmYXVsdFByb21wdC52YWx1ZVwiLCBcInZhbHVlSGFuZGxlclwiKTtcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgfSxcbiAgICBvblJlYWR5KCkge1xuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIiAmJiB0aGlzLiR2aXNpYmxlICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50KFwiZm9jdXNcIikuZm9jdXMoeyBmb2N1czogdGhpcy5kZWZhdWx0UHJvbXB0LmZvY3VzIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdDFcIiAmJiB0aGlzLiR2aXNpYmxlICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50KFwiaWRrZ1wiKS5mb2N1cyh7IGlka2c6IHRoaXMuZGVmYXVsdFByb21wdC5pZGtnIH0pO1xuICAgICAgfVxuXG4gICAgfSxcbiAgICB2YWx1ZUhhbmRsZXIobmV3Viwgb2xkVikge1xuXG4gICAgICB0aGlzLnZhbHVlID0gbmV3VjtcbiAgICB9LFxuICAgIG9wdGlvbnNIYW5kbGVyKG5ld1YsIG9sZFYpIHtcbiAgICAgIG5ld1YuY2xvc2FibGUgPyAodGhpcy5kZWZhdWx0T3B0aW9ucy5jbG9zYWJsZSA9IG5ld1YuY2xvc2FibGUpIDogZmFsc2U7XG4gICAgICBuZXdWLnRpdGxlID8gKHRoaXMuZGVmYXVsdE9wdGlvbnMudGl0bGUgPSBuZXdWLnRpdGxlKSA6IFwiXCI7XG4gICAgICBuZXdWLmNvbnRlbnQgPyAodGhpcy5kZWZhdWx0T3B0aW9ucy5jb250ZW50ID0gbmV3Vi5jb250ZW50KSA6IFwiXCI7XG4gICAgICBuZXdWLmJ1dHRvbnMgPyAodGhpcy5kZWZhdWx0T3B0aW9ucy5idXR0b25zID0gbmV3Vi5idXR0b25zKSA6IFtdO1xuICAgICAgbmV3Vi5jYW5jZWwgPyAodGhpcy5kZWZhdWx0T3B0aW9ucy5jYW5jZWwgPSBuZXdWLmNhbmNlbCkgOiBcIlwiO1xuICAgICAgbmV3Vi5hZmZpcm0gPyAodGhpcy5kZWZhdWx0T3B0aW9ucy5hZmZpcm0gPSBuZXdWLmFmZmlybSkgOiBcIlwiO1xuICAgIH0sXG4gICAgcHJvbXB0SGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICBuZXdWLnRpdGxlID8gKHRoaXMuZGVmYXVsdFByb21wdC50aXRsZSA9IG5ld1YudGl0bGUpIDogXCJcIjtcbiAgICAgIG5ld1YuY29udGVudCA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuY29udGVudCA9IG5ld1YuY29udGVudCkgOiBcIlwiO1xuICAgICAgbmV3Vi52YWx1ZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQudmFsdWUgPSBuZXdWLnZhbHVlKSA6IFwiXCI7XG4gICAgICBuZXdWLmtnID8gKHRoaXMuZGVmYXVsdFByb21wdC5rZyA9IG5ld1Yua2cpIDogXCJcIjtcbiAgICAgIG5ld1YuY20gPyAodGhpcy5kZWZhdWx0UHJvbXB0LmNtID0gbmV3Vi5jbSkgOiBcIlwiO1xuICAgICAgbmV3Vi5hZ2UgPyAodGhpcy5kZWZhdWx0UHJvbXB0LmFnZSA9IG5ld1YuYWdlKSA6IFwiXCI7XG4gICAgICBuZXdWLmZpZWxkdHlwZSA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuZmllbGR0eXBlID0gbmV3Vi5maWVsZHR5cGUpIDogXCJcIjtcbiAgICAgIG5ld1YucGxhY2Vob2xkZXIgPyAodGhpcy5kZWZhdWx0UHJvbXB0LnBsYWNlaG9sZGVyID0gbmV3Vi5wbGFjZWhvbGRlcikgOiBcIlwiO1xuICAgICAgbmV3Vi5mb2N1cyA/ICh0aGlzLmRlZmF1bHRQcm9tcHQuZm9jdXMgPSBuZXdWLmZvY3VzKSA6IGZhbHNlO1xuICAgICAgbmV3Vi5pbnB1dFN0eWxlID8gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlID0gbmV3Vi5pbnB1dFN0eWxlKSA6IHt9O1xuICAgIH0sXG4gICAgZGlhbG9nU3R5bGVIYW5kbGVyKG5ld1YsIG9sZFYpIHtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1YsIG9sZFYpO1xuICAgICAgdGhpcy5zZXREaWFsb2cgPSBuZXdWO1xuICAgIH0sXG4gICAgcmVzZXREYXRhKCkge1xuICAgICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBjbG9zYWJsZTogZmFsc2UsXG4gICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgY29udGVudDogXCJcIixcbiAgICAgICAgICBidXR0b25zOiBbXSxcbiAgICAgICAgICBjYW5jZWw6IFwi5Y+W5raIXCIsXG4gICAgICAgICAgYWZmaXJtOiBcIuehruWumlwiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVmYXVsdFByb21wdCA9IHtcbiAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICBjb250ZW50OiBcIlwiLFxuICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgIGZpZWxkdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICBwbGFjZWhvbGRlcjogXCLor7fovpPlhaXmlofmnKxcIixcbiAgICAgICAgICBmb2N1czogZmFsc2UsXG4gICAgICAgICAgaW5wdXRTdHlsZToge31cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXREaWFsb2cgPSB7XG5cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJHdhdGNoKFwib3B0aW9uc1wiLCBcIm9wdGlvbnNIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJwcm9tcHRcIiwgXCJwcm9tcHRIYW5kbGVyXCIpO1xuICAgICAgdGhpcy4kd2F0Y2goXCJkaWFsb2dTdHlsZVwiLCBcImRpYWxvZ1N0eWxlSGFuZGxlclwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKFwiZGVmYXVsdFByb21wdC52YWx1ZVwiLCBcInZhbHVlSGFuZGxlclwiKTtcbiAgICB9LFxuICAgIG1vZGFsSGFuZGxlcihuZXdWLCBvbGRWKSB7XG4gICAgICB0aGlzLnNob3dNb2RhbCA9IG5ld1Y7XG4gICAgfSxcbiAgICBiaW5kQ2FuY2VsKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy4kZW1pdChcImNhbmNlbFwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICB0aGlzLnZhbHVlID0gXCJcIjtcbiAgICAgIHRoaXMua2cgPSBcIlwiO1xuICAgICAgdGhpcy5jbSA9IFwiXCI7XG4gICAgICB0aGlzLmFnZSA9IFwiXCI7XG5cbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZXZ0KSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSBldnQudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7mraXmlbA9JHt0aGlzLnZhbHVlfWApO1xuICAgICAgdGhpcy4kZW1pdChcImNoYW5nZVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2hhbmdla2coZXZ0KSB7XG5cbiAgICAgIHRoaXMua2cgPSBldnQudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7kvZPph409JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2VjbShldnQpIHtcblxuICAgICAgdGhpcy5jbSA9IGV2dC52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPui6q+mrmD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuJGVtaXQoXCJjaGFuZ2VcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgIH0sXG4gICAgYmluZENoYW5nZWFnZShldnQpIHtcblxuICAgICAgdGhpcy5hZ2UgPSBldnQudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7lubTpvoQ9JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiY2hhbmdlXCIsIHsgZXZlbnQ6IGV2dCB9KTtcbiAgICB9LFxuXG5cbiAgICBiaW5kQWZmaXJtKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiKSB7XG4gICAgICAgIGV2dC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMuJGVtaXQoXCJhZmZpcm1cIiwgeyBldmVudDogZXZ0IH0pO1xuICAgICAgICB0aGlzLnZhbHVlID0gXCJcIjtcbiAgICAgIH1cblxuXG4gICAgICBpZiAodGhpcy5kaWFsb2dUeXBlID09PSBcInByb21wdDFcIikge1xuICAgICAgICBldnQua2cgPSB0aGlzLmtnO1xuICAgICAgICBldnQuY20gPSB0aGlzLmNtO1xuICAgICAgICBldnQuYWdlID0gdGhpcy5hZ2U7XG4gICAgICAgIGV2dC5zZXggPSB0aGlzLnNleDtcbiAgICAgICAgdGhpcy4kZW1pdChcImFmZmlybVwiLCB7IGV2ZW50OiBldnQgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBiaW5kQWZmaXJt77yaJHtldnQua2d9LOi6q+mrmO+8miR7ZXZ0LmNtfSzlubTpvoTvvJoke2V2dC5hZ2V9LHNleDoke2V2dC5zZXh9YCk7XG4gICAgICAgIHRoaXMua2cgPSBcIlwiO1xuICAgICAgICB0aGlzLmNtID0gXCJcIjtcbiAgICAgICAgdGhpcy5hZ2UgPSBcIlwiO1xuICAgICAgICB0aGlzLnNleCA9IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kRW50ZXIoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7mraXmlbA9JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLiRlbWl0KFwiZW50ZXJcIiwgeyBldmVudDogZXZ0IH0pO1xuICAgICAgaWYgKHRoaXMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgICAgICB0aGlzLiRlbGVtZW50KFwiZm9jdXNcIikuZm9jdXMoeyBmb2N1czogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmluZEVudGVya2coZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7kvZPph409JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLmtnID0gZXZ0LnZhbHVlO1xuXG4gICAgfSxcbiAgICBiaW5kRW50ZXJjbShldnQpIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKGAtLS0tPui6q+mrmD0ke2V2dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuY20gPSBldnQudmFsdWU7XG4gICAgfSxcbiAgICBiaW5kRW50ZXJhZ2UoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLT7lubTpvoQ9JHtldnQudmFsdWV9YCk7XG4gICAgICB0aGlzLmFnZSA9IGV2dC52YWx1ZTtcbiAgICB9LFxuXG5cbiAgICAvL+WIh+aNoueUt+Wls1xuICAgIGNoYW5nZVRhYmFjdGl2ZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUuaW5kZXgpXG4gICAgICB0aGlzLnNleCA9IGUuaW5kZXg7XG4gICAgfSxcbiAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cbiAgLm1hc2sge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBmbGV4OiAxO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgJi1leGlzdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUsIDUsIDUsIDAuNik7XG4gICAgfVxuICAgICYtbm9uZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB9XG4gICAgLmRpYWxvZyB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMycHg7XG4gICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgd2lkdGg6IDg0JTtcbiAgICAgICYtYm9yZGVyIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2U3ZTdlNztcbiAgICAgIH1cbiAgICAgIC5ib3gge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAudG9wIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxNXB4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAudGl0bGUge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNTBweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAmLWNsb3NlIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDI1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAmLW5vbmUge1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLmNsb3NlIHtcbiAgICAgICAgICAgIHdpZHRoOiA1JTtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC0yMHB4O1xuICAgICAgICAgICAgdGV4dCB7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRlbnQge1xuICAgICAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgIGNvbG9yOiAjYTBhMGEwO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNlOWU5ZTk7XG4gICAgICAgICAgd2lkdGg6IDg1JTtcbiAgICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDYwcHg7XG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50YWJzIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAudGFiLWJhciB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjYmJiYmJiO1xuICAgICAgICAgIGNvbG9yOiAjYmJiYmJiO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTRweDtcbiAgICAgICAgfVxuICAgICAgICAudGFiLXRleHQge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjMDBiMmZmO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnRhYi10ZXh0OmFjdGl2ZSB7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjJmZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLmJ0biB7XG4gICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgLmJ0bmJveCB7XG4gICAgICAgICAgdGV4dCB7XG4gICAgICAgICAgICB3aWR0aDogMjcwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDg4cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjJmZjtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuYnRuYm94MSB7XG4gICAgICAgICAgdGV4dCB7XG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjZTllOWU5O1xuICAgICAgICAgICAgd2lkdGg6IDI3MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiA4OHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgICBjb2xvcjogIzY2NjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuYnRuYm94OmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlNztcbiAgICAgICAgfVxuICAgICAgICAmLXZlcnRpY2FsIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIC5idG5ib3gge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICYtaG9yaXpvbnRhbCB7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAuYnRuYm94IHtcbiAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJ3YXJwXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwiei1pbmRleDoge3t6SW5kZXh9fTtcIiBjbGFzcz1cIm1hc2tcIiBpZj1cInt7c2hvd1BvcCYmIWJhY2tJbWd9fVwiPjwvZGl2PlxyXG4gICAgPGltYWdlIHNyYz1cInt7YmFja0ltZ319XCIgaWY9XCJ7e3Nob3dQb3AmJmJhY2tJbWd9fVwiIGNsYXNzPVwiaW1nQmFja1wiPjwvaW1hZ2U+XHJcbiAgICA8IS0tIOWxj+W5leWuveW6puWwj+S6jjEyMDAgLS0+XHJcbiAgICA8ZGl2IGlmPVwie3tzaG93UG9wJiYhcmVzZXJ2ZURpYWxvZ1N0eWxlfX1cIiBzdHlsZT1cIiBwb3NpdGlvbjpmaXhlZDsgYm90dG9tOnt7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IGxlZnQ6e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcmlnaHQ6e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgYm9yZGVyLXJhZGl1czp7eygyNC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4O1wiIGNsYXNzPVwicG9wdXBcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cIiBoZWlnaHQ6e3soNTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcGFkZGluZy1sZWZ0OiB7eygyNC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBwYWRkaW5nLXJpZ2h0OiB7eygyNC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4O1wiPlxyXG4gICAgICAgIDx0ZXh0IHN0eWxlPVwiIGZvbnQtc2l6ZToge3soMjAvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDtcIiBjbGFzcz1cInRpdGxlXCI+e3sgdGl0bGUudHJpbSgpIHx8IFwi55So5oi35Y2P6K6u6ZqQ56eB5pS/562W5o+Q56S6XCIgfX08L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy1sZWZ0OiB7eygyNC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBwYWRkaW5nLXJpZ2h0OiB7eygyNC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4O1wiIGNsYXNzPVwiYm9keVwiPlxyXG4gICAgICAgIDxzbG90PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI1cHg7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSlcIiBpZD1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAg5pys5pyN5Yqh6ZyA6KaBXHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC13ZWlnaHQ6IDcwMFwiPuiBlOe9kTwvc3Bhbj5cclxuICAgICAgICAgICAg77yM6LCD55SoXHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC13ZWlnaHQ6IDcwMFwiPueUteivnTwvc3Bhbj5cclxuICAgICAgICAgICAg44CBXHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC13ZWlnaHQ6IDcwMFwiPuS9jee9rjwvc3Bhbj5cclxuICAgICAgICAgICAg5p2D6ZmQ44CB6I635Y+W6K6+5aSH44CB572R57uc44CB6bqm5YWL6aOO44CB6L+Q5Yqo44CB5YGl5bq35L+h5oGv44CC54K55Ye74oCc5ZCM5oSP4oCd77yM5Y2z6KGo56S65oKo5ZCM5oSP5LiK6L+w5YaF5a655Y+KXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIiBzdHlsZT1cImNvbG9yOiAjMDA3ZGZmOyBmb250LXdlaWdodDogNzAwXCI+WFjnlKjmiLfljY/orq48L2E+XHJcbiAgICAgICAgICAgIOOAgVxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIgc3R5bGU9XCJjb2xvcjogIzAwN2RmZjsgZm9udC13ZWlnaHQ6IDcwMFwiPuWFs+S6jlhY6ZqQ56eB6K+05piOPC9hPlxyXG4gICAgICAgICAgICDjgIJcclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8L3Nsb3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGlmPVwie3tzaG93Rm9vdGVyfX1cInN0eWxlPVwiaGVpZ2h0Ont7KDU2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IHBhZGRpbmctbGVmdDoge3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgcGFkZGluZy1yaWdodDoge3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgbWFyZ2luLXRvcDp7eyg4L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHhcIiBjbGFzcz1cImZvb3RlclwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJoZWlnaHQ6e3soNDAvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgZm9udC1zaXplOnt7KDE2L2RldmljZURwKSpkZXZpY2VXaWR0aH19cHg7IG1hcmdpbi1yaWdodDp7eygxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyB3aWR0aDp7eyg5ODQtKDE2L2RldmljZURwKSpkZXZpY2VXaWR0aCozKS8yfX1weCBcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmi5Lnu51cIiBjbGFzcz1cImNhbmNlbFwiIG9uY2xpY2s9XCJjYW5jZWxcIiBkaXNhYmxlZD1cInt7YnRuZGlzYWJsZWR9fVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT1cImhlaWdodDp7eyg0MC9kZXZpY2VEcCkqZGV2aWNlV2lkdGh9fXB4OyBmb250LXNpemU6e3soMTYvZGV2aWNlRHApKmRldmljZVdpZHRofX1weDsgd2lkdGg6e3soOTg0LSgxNi9kZXZpY2VEcCkqZGV2aWNlV2lkdGgqMykvMn19cHggXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5ZCM5oSPXCIgY2xhc3M9XCJzdXJlXCIgb25jbGljaz1cInN1cmVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLSDlsY/luZXlrr3luqblpKfkuo4xMjAwIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwX3dpZHRoXCIgaWY9XCJ7e3Nob3dQb3AmJnJlc2VydmVEaWFsb2dTdHlsZX19XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+e3sgdGl0bGUudHJpbSgpIHx8IFwi55So5oi35Y2P6K6u6ZqQ56eB5pS/562W5o+Q56S6XCIgfX08L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxyXG4gICAgICAgIDxzbG90PlxyXG4gICAgICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDI1cHg7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSlcIj5cclxuICAgICAgICAgICAg55Sz6K+3XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC13ZWlnaHQ6IDcwMFwiPuWBpei6q+i/kOWKqDwvc3Bhbj5cclxuICAgICAgICAgICAg55So5LqO6I635Y+W5q2l5pWw5LiO6K6w5b2V5q2l5pWwLOivt+aCqOWcqOS9v+eUqO+8iOaIlue7p+e7reS9v+eUqO+8ieaIkeS7rOeahOS6p+WTgeacjeWKoeWJjeS7lOe7humYheivu1xyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIgc3R5bGU9XCJjb2xvcjogIzAwN2RmZjsgZm9udC13ZWlnaHQ6IDcwMFwiPuOAiueUqOaIt+WNj+iuruOAizwvYT5cclxuICAgICAgICAgICAg5ZKMXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIiBzdHlsZT1cImNvbG9yOiAjMDA3ZGZmOyBmb250LXdlaWdodDogNzAwXCI+44CK6ZqQ56eB5pS/562W44CLPC9hPlxyXG4gICAgICAgICAgICDjgILmiJHku6zlsIblhajlipvkv53pmpzmgqjnmoTlkIjms5XmnYPnm4rkuI7kv6Hmga/lronlhajvvIzlubblsIbmjIHnu63kuLrmgqjmj5DkvpvkvJjotKjmnI3liqHjgIJcclxuICAgICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8L3Nsb3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCIgaWY9XCJ7e3Nob3dGb290ZXJ9fVwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Y+W5raIXCIgY2xhc3M9XCJjYW5jZWxcIiBvbmNsaWNrPVwiY2FuY2VsXCIgZGlzYWJsZWQ9XCJ7e2J0bmRpc2FibGVkfX1cIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5ZCM5oSPXCIgY2xhc3M9XCJzdXJlXCIgb25jbGljaz1cInN1cmVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cclxuICAud2FycCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgLmltZ0JhY2sge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgIGJvdHRvbTogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcclxuICAgICAgb2JqZWN0LWZpdDogZmlsbDtcclxuICAgIH1cclxuICAgIC5tYXNrIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDA7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICBib3R0b206IDA7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDBtcztcclxuICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG4gICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICAgIH1cclxuICAgIC5wb3B1cCB7XHJcbiAgICAgIHdpZHRoOiA5ODRweDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBhbmltYXRpb24tZHVyYXRpb246IDIwMG1zO1xyXG4gICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbiAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gICBcclxuICAgICAgbWFyZ2luLWJvdHRvbTogODBweDtcclxuICAgICAgLnRpdGxlIHtcclxuICAgICAgICBsaW5lczogMTtcclxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XHJcbiAgICAgIH1cclxuICAgICAgLmJvZHkge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICB9XHJcbiAgICAgIC5mb290ZXIge1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIC5jYW5jZWwge1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIGNvbG9yOiAjMDA3ZGZmO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuY2FuY2VsOmRpc2FibGVkIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnN1cmUge1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDdkZmY7XHJcbiAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLnBvcHVwX3dpZHRoIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNjZweDtcclxuICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICB3aWR0aDogNjU2cHg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMDBtcztcclxuICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG4gICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICAgICAgLmhlYWRlciB7XHJcbiAgICAgICAgaGVpZ2h0OiAxMzJweDtcclxuICAgICAgICBwYWRkaW5nOiAwcHggNTRweDtcclxuICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgbGluZXM6IDE7XHJcbiAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAuYm9keSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZzogMHB4IDU0cHg7XHJcbiAgICAgIH1cclxuICAgICAgLmZvb3RlciB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgaGVpZ2h0OiAxMjZweDtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMzZweDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAxOHB4O1xyXG4gICAgICAgIC5jYW5jZWwge1xyXG4gICAgICAgICAgd2lkdGg6IDI3NHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA5MHB4O1xyXG4gICAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICAgIGNvbG9yOiAjMDA3ZGZmO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDY2cHg7XHJcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDM2cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jYW5jZWw6ZGlzYWJsZWQge1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuc3VyZSB7XHJcbiAgICAgICAgICB3aWR0aDogMjc0cHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICAgICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwN2RmZjtcclxuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNjZweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IGRldmljZSBmcm9tIFwiQHN5c3RlbS5kZXZpY2VcIjtcclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIC8vIOiuvuWkh2Rw5YC8XHJcbiAgICAgIGRldmljZURwOiAwLFxyXG4gICAgICAvLyDorr7lpIdcclxuICAgICAgZGV2aWNlV2lkdGg6IDAsXHJcbiAgICAgIHJlc2VydmVEaWFsb2dTdHlsZTogZmFsc2UsXHJcbiAgICAgIGJ0bmRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgc2NyZWVuV2lkdGg6IDAsXHJcbiAgICB9LFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgYmFja0ltZzoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB9LFxyXG4gICAgICB6SW5kZXg6IHtcclxuICAgICAgICBkZWZhdWx0OiAxMDAwMFxyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiBcIumakOengeadg+mZkOeUs+ivt+S4juS/neaKpOaMh+W8lVwiLFxyXG4gICAgICB9LFxyXG4gICAgICBzaG93UG9wOiB7XHJcbiAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgc2hvd0Zvb3RlcjogeyAvL+aYr+WQpuaYvuekuuW6lemDqOS4pOS4quaMiemSrlxyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuJHdhdGNoKCdzaG93UG9wJywgJ2NoYW5nZUNhbmNlbCcpXHJcbiAgICAgIGlmIChkZXZpY2UuZ2V0SW5mb1N5bmMpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBkZXZpY2UuZ2V0SW5mb1N5bmMoKTtcclxuICAgICAgICB0aGlzLmRldmljZURwID0gcmVzLndpbmRvd1dpZHRoIC8gcmVzLnNjcmVlbkRlbnNpdHk7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VXaWR0aCA9IHJlcy53aW5kb3dMb2dpY1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYnRuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2NyZWVuV2lkdGggPSByZXMuc2NyZWVuV2lkdGhcclxuICAgICAgICBpZiAocmVzLnNjcmVlbldpZHRoID4gMTIwMCAmJiByZXMuc2NyZWVuSGVpZ2h0ID4gMTIwMCkge1xyXG4gICAgICAgICAgdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiR3YXRjaCgnc2NyZWVuV2lkdGgnLCAnY2hhbmdlU2NyZWVuJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUNhbmNlbCgpIHtcclxuICAgICAgaWYgKHRoaXMuc2hvd1BvcCkge1xyXG4gICAgICAgIHRoaXMuYnRuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoYW5nZVNjcmVlbigpIHtcclxuICAgICAgaWYgKHRoaXMuc2NyZWVuV2lkdGggPiAxMjAwKSB7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlRGlhbG9nU3R5bGUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBjYW5jZWwoKSB7XHJcbiAgICAgIHRoaXMuYnRuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBhd2FpdCAkcHJvY2Vzc0RhdGEuc2V0U3RvcmFnZShcIl9QUklWQUNcIiwgZmFsc2UpO1xyXG4gICAgICB0aGlzLiRlbWl0KFwiY2FuY2VsXCIpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHN1cmUoKSB7XHJcbiAgICAgIGF3YWl0ICRwcm9jZXNzRGF0YS5zZXRTdG9yYWdlKFwiX1BSSVZBQ1wiLCB0cnVlKTtcclxuICAgICAgdGhpcy4kZW1pdChcImFncmVlXCIpO1xyXG4gICAgfVxyXG4gIH07XHJcbjwvc2NyaXB0PiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuaGVhZGVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI5MHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI5MHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiOTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCI5MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzMHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1zdGFydFwiLFxuICAgIFwidG9wXCI6IFwiNzBweFwiLFxuICAgIFwid2lkdGhcIjogXCI3MDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIudG9wX3ZpZXdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MjhweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvZ3JvdXAyLnBuZ1wiLFxuICAgIFwiYmFja2dyb3VuZFNpemVcIjogXCJjb3ZlclwiLFxuICAgIFwiYmFja2dyb3VuZFBvc2l0aW9uXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYm90dG9tX3ZpZXdcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjdweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjdweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI3NTBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiLTEwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5pY29uLWltYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNDRweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDRweFwiXG4gIH0sXG4gIFwiLmNpcmNsZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyNXB4XCJcbiAgfSxcbiAgXCIudGV4dC1jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLnRpdGxlX3N0cGVzXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLnRpdGxlX3N0cGVzX3ZcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI4MHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIuZGV0YWlsc1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjcwMnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxNzVweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmRldGFpbC1pdGVtXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZGV0YWlsLXZhbHVlXCI6IHtcbiAgICBcImZsZXhcIjogMSxcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJyb3dcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLmxhcmdlci10ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmxhcmdlcjItdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiNDhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICB9LFxuICBcIi5sYXJnZXIzLXRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjNGI0YjRiXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIlxuICB9LFxuICBcIi5zbWFsbGVyLXRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLm4tdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNDAwXCJcbiAgfSxcbiAgXCIudGFic1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUyMHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyNTVweFwiXG4gIH0sXG4gIFwiLnRhYi1iYXJcIjoge1xuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJjb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU0cHhcIlxuICB9LFxuICBcIi50YWItdGV4dFwiOiB7XG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwid2lkdGhcIjogXCIxNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjVweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNzRweFwiLFxuICAgIFwiY29sb3I6YWN0aXZlXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiYmFja2dyb3VuZDphY3RpdmVcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCIyNzBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiM4ZmZmMzQgMCVcXFwiLFxcXCIjZWJmZDY2XFxcIl19XX1cIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5saXN0XCI6IHtcbiAgICBcImxheW91dFR5cGVcIjogXCJzdGFnZ2VyXCJcbiAgfSxcbiAgXCIuaXRlbVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuZnJhbWVfXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mcmFtZV9pbWFcIjoge1xuICAgIFwid2lkdGhcIjogXCI3MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI3MHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI4cHhcIlxuICB9LFxuICBcIi5mcmFtZV90ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwNXB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLnRvcF92aWV3XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjAwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2JnX21lLnBuZ1wiLFxuICAgIFwiYmFja2dyb3VuZFNpemVcIjogXCJjb3ZlclwiLFxuICAgIFwiYmFja2dyb3VuZFBvc2l0aW9uXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYm90dG9tX3ZpZXdcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItOTBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMjBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCJcbiAgfSxcbiAgXCIudGFiX2JhclwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjc1MHB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIudGFiX2l0ZW1cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjE0cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMXB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE3MXB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDQuMnB4XCJcbiAgfSxcbiAgXCIudGFiX2l0ZW0gaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJyZXNpemVNb2RlXCI6IFwiY29udGFpblwiLFxuICAgIFwib3BhY2l0eVwiOiAwLjUsXG4gICAgXCJ3aWR0aDphY3RpdmVcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHQ6YWN0aXZlXCI6IFwiNTBweFwiLFxuICAgIFwicmVzaXplTW9kZTphY3RpdmVcIjogXCJjb250YWluXCJcbiAgfSxcbiAgXCIudGFiX2l0ZW0gdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjIxcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5pdGVtLWNvbnRhaW5lclwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1haW4tdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjEwMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiM1ZjllYTBcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5zbG90XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5jYW52YXNcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIubWFza1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubWFzay1leGlzdFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDUsNSw1LDAuNilcIlxuICB9LFxuICBcIi5tYXNrLW5vbmVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwKVwiLFxuICAgIFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZ1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMjRweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjRweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI0cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjRweFwiLFxuICAgIFwid2lkdGhcIjogXCI4NCVcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2ctYm9yZGVyXCI6IHtcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjFweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMXB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTdlN2U3XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlN2U3ZTdcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlN2U3ZTdcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC50aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1MHB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlLWNsb3NlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiOTUlXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjVweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50b3AgLnRpdGxlLW5vbmVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRvcCAuY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1JVwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiLTIwcHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAudG9wIC5jbG9zZSB0ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJveCAuY29udGVudFwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNhMGEwYTBcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IGlucHV0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgIFwid2lkdGhcIjogXCI4NSVcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMTZweFwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50YWJzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYm94IC50YWItYmFyXCI6IHtcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNiYmJiYmJcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2JiYmJiYlwiLFxuICAgIFwiY29sb3JcIjogXCIjYmJiYmJiXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI1NHB4XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5ib3ggLnRhYi10ZXh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcIndpZHRoXCI6IFwiMjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiMwMGIyZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImNvbG9yOmFjdGl2ZVwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjMDBiMmZmXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG5cIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNTBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4gLmJ0bmJveCB0ZXh0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94MSB0ZXh0XCI6IHtcbiAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICBcIndpZHRoXCI6IFwiMjcwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiM2NjY2NjZcIlxuICB9LFxuICBcIi5tYXNrIC5kaWFsb2cgLmJ0biAuYnRuYm94XCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjZTdlN2U3XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4tdmVydGljYWxcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLm1hc2sgLmRpYWxvZyAuYnRuLXZlcnRpY2FsIC5idG5ib3hcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4taG9yaXpvbnRhbFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCJcbiAgfSxcbiAgXCIubWFzayAuZGlhbG9nIC5idG4taG9yaXpvbnRhbCAuYnRuYm94XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIud2FycFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIud2FycCAuaW1nQmFja1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2NjY2NjY1wiLFxuICAgIFwib2JqZWN0Rml0XCI6IFwiZmlsbFwiXG4gIH0sXG4gIFwiLndhcnAgLm1hc2tcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNClcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMjAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwibGluZWFyXCIsXG4gICAgXCJhbmltYXRpb25GaWxsTW9kZVwiOiBcImZvcndhcmRzXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBcIjoge1xuICAgIFwid2lkdGhcIjogXCI5ODRweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjIwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImxpbmVhclwiLFxuICAgIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogXCJmb3J3YXJkc1wiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiODBweFwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwIC50aXRsZVwiOiB7XG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXAgLmJvZHlcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXAgLmZvb3RlclwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwIC5mb290ZXIgLmNhbmNlbFwiOiB7XG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjEwMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6ZGlzYWJsZWRcIjogXCJyZ2JhKDAsMCwwLDAuMSlcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cCAuZm9vdGVyIC5zdXJlXCI6IHtcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTAwcHhcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aFwiOiB7XG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NnB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCJhdXRvXCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcImF1dG9cIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcImF1dG9cIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCJhdXRvXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjY1NnB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMjAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwibGluZWFyXCIsXG4gICAgXCJhbmltYXRpb25GaWxsTW9kZVwiOiBcImZvcndhcmRzXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmhlYWRlclwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCIxMzJweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiNTRweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCI1NHB4XCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmhlYWRlciAudGl0bGVcIjoge1xuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRPdmVyZmxvd1wiOiBcImVsbGlwc2lzXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjQ1cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmJvZHlcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1NHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjU0cHhcIlxuICB9LFxuICBcIi53YXJwIC5wb3B1cF93aWR0aCAuZm9vdGVyXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjZweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIzNnB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxOHB4XCJcbiAgfSxcbiAgXCIud2FycCAucG9wdXBfd2lkdGggLmZvb3RlciAuY2FuY2VsXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjc0cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjkwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzZweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NnB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjM2cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjpkaXNhYmxlZFwiOiBcInJnYmEoMCwwLDAsMC4xKVwiXG4gIH0sXG4gIFwiLndhcnAgLnBvcHVwX3dpZHRoIC5mb290ZXIgLnN1cmVcIjoge1xuICAgIFwid2lkdGhcIjogXCIyNzRweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOTBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzNnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDA3ZGZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjY2cHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0YWJzXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2hhbmdlXCI6IFwiY2hhbmdlVGFiYWN0aXZlXCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1jb250ZW50XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGF0YXMubGlzdCl9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwYWdlaG9tZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGU9PSfpppbpobUnP3RydWU6ZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFnZXJlY29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGU9PSfmraXmlbAnP3RydWU6ZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFnZXVzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlPT0n5oiR55qEJz90cnVlOmZhbHNlKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1iYXJcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0YWJfYmFyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGF0YXMubGlzdCl9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWJfaXRlbVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnNob3c/dGhpcy4kaXRlbS5waWNfY2hvaWNlOnRoaXMuJGl0ZW0ucGljKX1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2NvbG9yOiAnKygodGhpcy4kaXRlbS5jb2xvcikpfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJzdGFja1wiLFxuICBcImF0dHJcIjoge30sXG4gIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZSl9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJjYW52YXNcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pZCl9XG4gICAgICB9LFxuICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlkKX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2FudmFzXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInNsb3RcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwic2xvdFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJhcGV4LWRpYWxvZ1wiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ21hc2snLCAodGhpcy5zaG93TW9kYWw/J21hc2stZXhpc3QnOidtYXNrLW5vbmUnKV19LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnZpc2libGUpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZGlhbG9nXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zZXREaWFsb2cpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYm94XCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQudGl0bGV8fHRoaXMuZGVmYXVsdE9wdGlvbnMudGl0bGV8fHRoaXMudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ3RpdGxlJywgKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2xvc2FibGU/J3RpdGxlLWNsb3NlJzondGl0bGUtbm9uZScpXX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGFic1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0MScpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWJzXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiY2hhbmdlVGFiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1iYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWItYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWls1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLnlLdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQnKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJmb2N1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy52YWx1ZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQucGxhY2Vob2xkZXIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4bGVuZ3RoXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5tYXhsZW5ndGg9PT0tMT8nJzp0aGlzLmRlZmF1bHRQcm9tcHQubWF4bGVuZ3RoKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJmb2N1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmlucHV0U3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImJpbmRDaGFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5q2lXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjg4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kaWFsb2dUeXBlPT09J3Byb21wdDEnKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGtnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmtnKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6L6T5YWl5L2T6YeNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBcIjNcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlka2dcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5pbnB1dFN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJiaW5kQ2hhbmdla2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlcmtnXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJrZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21XaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCI4OHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZT09PSdwcm9tcHQxJyl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiaWRjbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdFByb21wdC5maWVsZHR5cGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpei6q+mrmFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogXCIzXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRlZmF1bHRQcm9tcHQuaW5wdXRTdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiYmluZENoYW5nZWNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGVya2V5Y2xpY2tcIjogXCJiaW5kRW50ZXJjbVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiY21cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJpZ2h0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTllOWU5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiODhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI4OHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTBweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRpYWxvZ1R5cGU9PT0ncHJvbXB0MScpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImlkYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmZpZWxkdHlwZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFnZSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpeW5tOm+hFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhsZW5ndGhcIjogXCIzXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpZGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0UHJvbXB0LmlucHV0U3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImJpbmRDaGFuZ2VhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50ZXJrZXljbGlja1wiOiBcImJpbmRFbnRlcmFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5bKBXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcInNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJCb3R0b21Db2xvclwiOiBcIiNlOWU5ZTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiI2U5ZTllOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjg4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsnYnRuJywgKHRoaXMuZGlhbG9nVHlwZT09PSdhbHRlcid8fHRoaXMudmVydGljYWw9PT10cnVlPydidG4tdmVydGljYWwnOididG4taG9yaXpvbnRhbCcpXX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdE9wdGlvbnMuYnV0dG9ucy5sZW5ndGg9PT0wKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlhbG9nVHlwZSE9PSdhbHRlcicpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ0bmJveDFcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJpbmRDYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGVmYXVsdE9wdGlvbnMuY2FuY2VsKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYmluZEFmZmlybVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ0bmJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kZWZhdWx0T3B0aW9ucy5hZmZpcm0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0b3Bfdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0YWJzXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGFic1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVRhYmFjdGl2ZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGFiLWJhclwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRhYi1iYXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5LuK5pelXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGFiLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWRqFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRhYi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmnIhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibXktY2lyY2xlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic2l6ZVwiOiBcIjM1MFwiLFxuICAgICAgICAgICAgXCJwZXJjZW50XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucHJvZ3Jlc3MpfSxcbiAgICAgICAgICAgIFwic3Ryb2tlQ29sb3JcIjogXCIjMDBCMkZGXCIsXG4gICAgICAgICAgICBcInNBbmdsZVwiOiBcIjE1MFwiLFxuICAgICAgICAgICAgXCJzaG93VHJhaWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodHJ1ZSl9LFxuICAgICAgICAgICAgXCJ0cmFpbENvbG9yXCI6IFwiI2ZmZlwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImNpcmNsZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGV4dC1jb250YWluZXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9pY29uX3Bhb2J1LnBuZ1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImljb24taW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNlZ21lbnRzVGV4dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRpdGxlX3N0cGVzXCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdGVwc192aWV3KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVfc3RwZXNfdlwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZGV0YWlsc1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubWlsZWFnZSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIktNXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLph4znqItcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJuLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2Fsb3JpZXMpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXRhaWwtdmFsdWUyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhcmdlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJrY2FsXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmtojogJfng63ph49cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJuLXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGV0YWlsLWl0ZW1cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5TZXRTdGVwc0RpYWxvZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZ29hbF9kYXkpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcInVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRldGFpbC12YWx1ZTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuatpT5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbGVyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS7iuaXpeebruagh1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIm4tdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJib3R0b21fdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIyNTJweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNDVweFwiLFxuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjIzOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjU4cHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIkJNSS/kvZPohILnjoforqHnrpdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMxcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiM3B4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5aGr5YaZ6K6h566XPlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvcGVuQmFzaWNJbmZvcm1hdGlvbkRpYWxvZ1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxNDBweFwiLFxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9taW5ncm91cDIucG5nXCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjE1cHhcIixcbiAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIi0zMHB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvaWNvbl9ibWkucG5nXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjkwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI5MHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjE2cHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiQk1JXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyMy10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5ibWkpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvaWNvbl90emwucG5nXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjkwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI5MHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjE2cHhcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5L2T6ISC546HXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFyZ2VyMy10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50emwpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXJnZXIyLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvc3RhbmRhcmQucG5nXCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIzNjhweFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIxNHB4XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcIm15LWRpYWxvZ1wiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2aXNpYmxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMub3BlbjEpfSxcbiAgICAgICAgXCJkaWFsb2dUeXBlXCI6IFwicHJvbXB0XCIsXG4gICAgICAgIFwicHJvbXB0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMub2JqKX1cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiYWZmaXJtXCI6IFwiZW50ZXJTdGVwc1wiLFxuICAgICAgICBcImNhbmNlbFwiOiBcImNsb3NlXCIsXG4gICAgICAgIFwiZW50ZXJcIjogXCJlbnRlclN0ZXBzXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcIm15LWRpYWxvZ1wiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2aXNpYmxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMub3BlbjIpfSxcbiAgICAgICAgXCJkaWFsb2dUeXBlXCI6IFwicHJvbXB0MVwiLFxuICAgICAgICBcInByb21wdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm9iail9XG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImFmZmlybVwiOiBcImVudGVyRGV0YWlsc1wiLFxuICAgICAgICBcImNhbmNlbFwiOiBcImNsb3NlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaG93KX1cbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaGVhZGVyXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueUs+ivtyDlgaXouqvov5Dliqgg5p2D6ZmQOlwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueUqOS6juiusOW9lei/kOWKqOatpeaVsO+8jOiuoeeul+i/kOWKqOmHj+OAglwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjI3cHhcIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjU5MnB4XCIsXG4gICAgICAgIFwicGFkZGluZ1RvcFwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyNXB4XCIsXG4gICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJwYWRkaW5nTGVmdFwiOiBcIjI1cHhcIixcbiAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMTUwcHhcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNzBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MnB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0NXB4XCIsXG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZFwiOiBcIntcXFwidmFsdWVzXFxcIjpbe1xcXCJ0eXBlXFxcIjpcXFwibGluZWFyR3JhZGllbnRcXFwiLFxcXCJkaXJlY3Rpb25zXFxcIjpbXFxcIjkwZGVnXFxcIl0sXFxcInZhbHVlc1xcXCI6W1xcXCIjZTlmZDY1XFxcIixcXFwiIzk1ZmYzNyAxMDAlXFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNThweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5q2l5pWw6K6w5b2VXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI0MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjNweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWNleS9je+8muatpVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjIwMjRcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIyMDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjQwMDBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiNjAwMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjODI4MjgyXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCI4MDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjEwMDAwXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4MjgyODJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibGlzdFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImxpc3RcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsaXN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxpc3RJdGVtXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxpc3QzMGRheURhdGEpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zdW1tYXJ5RGF0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiMmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiOiBcIjUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCI6IFwiNTBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInByb2dyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBlcmNlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5wZXJjZW50KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwYjJmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxheWVyQ29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjMwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5LuF5pi+56S65pyA6L+RMzDlpKnmraXmlbBcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjExNnB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTJweFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWZlZmVmXCIsXG4gICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzgyODI4MlwiLFxuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIyODBweFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRvcF92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODAlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJ0b0xvZ2luXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvdG91eGlhbmcucG5nXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEyMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjYwcHhcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVzZXJEYXRhLmxvZ2luUGhvbmV8fCfor7fngrnlh7vnmbvlvZUnKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibG9nXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ0lEOicrKCh0aGlzLnVzZXJEYXRhLnVzZXJJZCkpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ1c2VyX2lkXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2OTY5NjlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiLTExMHB4XCIsXG4gICAgICAgICAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICAgICAgICAgIFwicGFkZGluZ0xlZnRcIjogXCI1MHB4XCIsXG4gICAgICAgICAgICBcInBhZGRpbmdSaWdodFwiOiBcIjUwcHhcIixcbiAgICAgICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9ncm91cC5wbmdcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTY0cHhcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCI3MDJweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiZmxleC1lbmRcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudXNlckRhdGEuYmFsYW5jZSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCI3MnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFg1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMnB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTUwcHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjcwcHhcIixcbiAgICAgICAgICAgICAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCIyNzBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNmN2JiYTQgMCVcXFwiLFxcXCIjZmRlY2Q3XFxcIl19XX1cIixcbiAgICAgICAgICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE5MnB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZVRpeGlhblwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmj5DnjrBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2FhNTAyMVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImJvdHRvbV92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYmFubmVyX21lLnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjE4MHB4XCIsXG4gICAgICAgICAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5BZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCI3MDJweFwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIzODBweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nVG9wXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTUycHhcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQ1cHhcIixcbiAgICAgICAgICAgICAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMzBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiOTBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNlOWZkNjVcXFwiLFxcXCIjOTVmZjM3IDEwMCVcXFwiXX1dfVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI1OHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmiJHnmoTmnI3liqFcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjQycHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjMxcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiM3B4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMzBweFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYWRkRGVza3RvcFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lMS5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIua3u+WKoOahjOmdolwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZWZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWUyLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Li+5oql5Y+N6aaIXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMucHVzaHdlYigxLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lMy5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuW4ruWKqeS4reW/g1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnB1c2h3ZWIoMixldnQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTQucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLnlKjmiLfljY/orq5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5wdXNod2ViKDMsZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvZnJhbWU1LnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX2ltYVwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6ZqQ56eB5pS/562WXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInB1c2hQYWdlcGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9mcmFtZTYucG5nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfaW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLorr7nva5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV90ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicHVzaFBhZ2VhYm91dFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImZyYW1lX1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lNy5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWFs+S6jlwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZnJhbWVfXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJwdXNoUGFnZWxvZ091dFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2ZyYW1lOC5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmcmFtZV9pbWFcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuazqOmUgFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyYW1lX3RleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwid2FycFwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICd6LWluZGV4OiAnKygodGhpcy56SW5kZXgpKSsnOyd9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm1hc2tcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93UG9wJiYhdGhpcy5iYWNrSW1nKX1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJhY2tJbWcpfVxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93UG9wJiZ0aGlzLmJhY2tJbWcpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJpbWdCYWNrXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dQb3AmJiF0aGlzLnJlc2VydmVEaWFsb2dTdHlsZSl9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdwb3NpdGlvbjpmaXhlZDsgYm90dG9tOicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgbGVmdDonKygoKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHJpZ2h0OicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgYm9yZGVyLXJhZGl1czonKygoKDI0L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7J30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicG9wdXBcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnaGVpZ2h0OicrKCgoNTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcGFkZGluZy1sZWZ0OiAnKygoKDI0L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHBhZGRpbmctcmlnaHQ6ICcrKCgoMjQvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsnfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50aXRsZS50cmltKCl8fCfnlKjmiLfljY/orq7pmpDnp4HmlL/nrZbmj5DnpLonKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdmb250LXNpemU6ICcrKCgoMjAvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsnfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAncGFkZGluZy1sZWZ0OiAnKygoKDI0L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgpKSsncHg7IHBhZGRpbmctcmlnaHQ6ICcrKCgoMjQvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsnfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImJvZHlcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIyNXB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJjb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDmnKzmnI3liqHpnIDopoEgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLogZTnvZFcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDvvIzosIPnlKggXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLnlLXor51cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDjgIEgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLkvY3nva5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDmnYPpmZDjgIHojrflj5borr7lpIfjgIHnvZHnu5zjgIHpuqblhYvpo47jgIHov5DliqjjgIHlgaXlurfkv6Hmga/jgILngrnlh7vigJzlkIzmhI/igJ3vvIzljbPooajnpLrmgqjlkIzmhI/kuIrov7DlhoXlrrnlj4ogXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBcImh0dHBzOi8vZGV2ZWxvcGVyLmh1YXdlaS5jb20vY29uc3VtZXIvY24vZG9jL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIlhY55So5oi35Y2P6K6uXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDdkZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiIOOAgSBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IFwiaHR0cHM6Ly9kZXZlbG9wZXIuaHVhd2VpLmNvbS9jb25zdW1lci9jbi9kb2MvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5YWz5LqOWFjpmpDnp4Hor7TmmI5cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg44CCIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93Rm9vdGVyKX0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdoZWlnaHQ6JysoKCg1Ni90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBwYWRkaW5nLWxlZnQ6ICcrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgcGFkZGluZy1yaWdodDogJysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBtYXJnaW4tdG9wOicrKCgoOC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4J30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJmb290ZXJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaLkue7nVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc2FibGVkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYnRuZGlzYWJsZWQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnaGVpZ2h0OicrKCgoNDAvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgZm9udC1zaXplOicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgbWFyZ2luLXJpZ2h0OicrKCgoMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCkpKydweDsgd2lkdGg6JysoKCg5ODQtKDE2L3RoaXMuZGV2aWNlRHApKnRoaXMuZGV2aWNlV2lkdGgqMykvMikpKydweCd9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNhbmNlbFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2FuY2VsXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWQjOaEj1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdoZWlnaHQ6JysoKCg0MC90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyBmb250LXNpemU6JysoKCgxNi90aGlzLmRldmljZURwKSp0aGlzLmRldmljZVdpZHRoKSkrJ3B4OyB3aWR0aDonKygoKDk4NC0oMTYvdGhpcy5kZXZpY2VEcCkqdGhpcy5kZXZpY2VXaWR0aCozKS8yKSkrJ3B4J30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3VyZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwic3VyZVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJwb3B1cF93aWR0aFwiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dQb3AmJnRoaXMucmVzZXJ2ZURpYWxvZ1N0eWxlKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImhlYWRlclwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50aXRsZS50cmltKCl8fCfnlKjmiLfljY/orq7pmpDnp4HmlL/nrZbmj5DnpLonKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYm9keVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2xvdFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjVweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDnlLPor7cgXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlgaXouqvov5DliqhcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiDnlKjkuo7ojrflj5bmraXmlbDkuI7orrDlvZXmraXmlbAs6K+35oKo5Zyo5L2/55So77yI5oiW57un57ut5L2/55So77yJ5oiR5Lus55qE5Lqn5ZOB5pyN5Yqh5YmN5LuU57uG6ZiF6K+7IFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLjgIrnlKjmiLfljY/orq7jgItcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg5ZKMIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhyZWZcIjogXCJodHRwczovL2RldmVsb3Blci5odWF3ZWkuY29tL2NvbnN1bWVyL2NuL2RvYy9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLjgIrpmpDnp4HmlL/nrZbjgItcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwN2RmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIg44CC5oiR5Lus5bCG5YWo5Yqb5L+d6Zqc5oKo55qE5ZCI5rOV5p2D55uK5LiO5L+h5oGv5a6J5YWo77yM5bm25bCG5oyB57ut5Li65oKo5o+Q5L6b5LyY6LSo5pyN5Yqh44CCIFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZm9vdGVyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93Rm9vdGVyKX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWPlua2iFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc2FibGVkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYnRuZGlzYWJsZWQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjYW5jZWxcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNhbmNlbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkIzmhI9cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdXJlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdXJlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL3VpL2NpcmNsZS9pbmRleC51eD9uYW1lPW15LWNpcmNsZVwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi91aS9kaWFsb2cvaW5kZXgudXg/bmFtZT1teS1kaWFsb2dcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vdWkvcHJpdmFjeXBvcC9pbmRleC51eD9uYW1lPXByaXZhY3ktcG9wXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cGFnZWhvbWUmZGVwZW5kc1tdPW15LWNpcmNsZSZkZXBlbmRzW109bXktZGlhbG9nIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfSG9tZVxcXFxpbmRleC51eCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfSG9tZVxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3BhZ2Vob21lJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wYWdlcmVjb3JkIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXFBhZ2VfUmVjb3JkXFxcXGluZGV4LnV4IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcUGFnZV9SZWNvcmRcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wYWdlcmVjb3JkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1wYWdldXNlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX1VzZXJcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFxQYWdlX1VzZXJcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9wYWdldXNlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bXktY2lyY2xlIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGNpcmNsZVxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGNpcmNsZVxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L215LWNpcmNsZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bXktZGlhbG9nIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXGRpYWxvZ1xcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfTWFpblRhYlxcXFx1aVxcXFxkaWFsb2dcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9teS1kaWFsb2cnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXByaXZhY3ktcG9wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXHVpXFxcXHByaXZhY3lwb3BcXFxcaW5kZXgudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcdWlcXFxccHJpdmFjeXBvcFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3ByaXZhY3ktcG9wJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vUGFnZV9SZWNvcmQvaW5kZXgudXg/bmFtZT1wYWdlcmVjb3JkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vUGFnZV9Ib21lL2luZGV4LnV4P25hbWU9cGFnZWhvbWVcIilcbnJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9QYWdlX1VzZXIvaW5kZXgudXg/bmFtZT1wYWdldXNlclwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz9kZXBlbmRzW109cGFnZWhvbWUmZGVwZW5kc1tdPXBhZ2VyZWNvcmQmZGVwZW5kc1tdPXBhZ2V1c2VyIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9NYWluVGFiXFxcXGluZGV4LnV4IS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX01haW5UYWJcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMC4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
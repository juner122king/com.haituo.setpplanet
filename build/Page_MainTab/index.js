(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/index.ux?uxType=page":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/index.ux?uxType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

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
    },
    isshow: false,
    isOpenstrapLayer: false
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
        if (this.isOpenstrapLayer) {
          this.isshow = e.index === 2 ? true : false;
        }
      }
    }
  },
  onInit() {
    $apis.user.wealentry().then(res => {
      console.log('福利入口信息----------------->' + JSON.stringify(res));
      this.isOpenstrapLayer = res.data.isOpenActivityBootstrapLayer;
    });
  },
  onShow(options) {
    $umeng_stat.resume(this);
    console.log('主页 onShow()----------------->');
    this.getUser();
    $utils.showBannerAd();
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
  },
  openAd() {
    this.closeAd();
    $utils.openAd();
  },
  closeAd() {
    this.isshow = false;
  }
};
const moduleOwn = exports.default || module.exports;
const accessors = ['public', 'protected', 'private'];
if (moduleOwn.data && accessors.some(function (acc) {
  return moduleOwn[acc];
})) {
  throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function (acc) {
    const accType = typeof moduleOwn[acc];
    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
      for (const name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {
          access: acc
        };
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
    }
  });
}}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Home/index.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Home/index.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.sensor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = {
  data: {
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
    await this.getTreatyStorage();
  },
  async getTreatyStorage() {
    const storageFlag = await $processData.getStorage("_PRIVAC");
    this.isShow = !storageFlag;
    if (storageFlag) {
      this.subscribeStepCounter();
    }
  },
  onReady() {
    console.log("onReady()");
    this.updateBMITzl();
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
    $storage.get({
      key: this.goalDayKey,
      default: 10000,
      success: function (ret) {
        that.goal_day = ret;
      }
    });
  },
  setGoalDaySteps(data) {
    $storage.set({
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
    $storage.get({
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
    $storage.set({
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
    const that = this;
    const types = ["TODAY", "WEEK", "MOON"];
    const apiKeys = ["stepsDayApi", "stepsWeekApi", "stepsMoonApi"];
    const t = types[that.currentPage];
    $apis.example.getsteps({
      type: t
    }).then(response => {
      console.log(`获取《${t}》云步数成功！ ------>云步数=${response.data}`);
      that[apiKeys[that.currentPage]] = response.data;
      this.updateProgress();
    }).catch(error => {
      console.error(`获取${t}步数失败:`, error);
    });
  },
  apiuploadStpes(c) {
    var t = Date.now();
    console.log(`上传步数中---->步数=${c},t = ${t}`);
    $apis.example.uploadsteps({
      count: c,
      "timestamp": t
    }).then(response => {
      console.log(' 上传步数successful:', response);
      this.stepsDayApi = response.data;
      this.updateProgress();
    }).catch(error => {
      console.error(' 上传步数failed:', error);
    });
  },
  agree() {
    this.isShow = false;
    this.subscribeStepCounter();
  },
  cancel() {
    this.isShow = false;
    $router.back();
  }
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Record/index.ux?uxType=comp":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Record/index.ux?uxType=comp ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

module.exports = {
  data: {
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
    $apis.example.getstepslist().then(response => {
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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_User/index.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_User/index.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

module.exports = {
  data: {
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
  signOut() {
    $apis.user.phoneLogout().then(res => {
      $prompt.showToast({
        message: "退出成功！",
        gravity: "center"
      });
      this.$app.exit();
    }).catch(err => {
      console.log(err);
    });
  },
  openAd() {
    $utils.openAd();
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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/circle/index.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/circle/index.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const toAngle = a => a / 180 * Math.PI;
const percent = a => toAngle(a / 100 * 360);
var _default = exports.default = {
  data() {
    return {
      sAngle: 150,
      beginAngle: toAngle(150),
      startAngle: toAngle(150),
      endAngle: percent(this.percent) + toAngle(150),
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
      return `width: ${350}px; height: ${350}px;`;
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
    const position = 350 / 2;
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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  data: {
    url1: '',
    url2: '',
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
      default: "用户协议隐私政策提示"
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
    this.url1 = this.$app.$def.dataApp.url2;
    this.url2 = this.$app.$def.dataApp.url3;
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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Home/index.ux?uxType=comp":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Home/index.ux?uxType=comp ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".stan": {
    "backgroundSize": "cover",
    "backgroundImage": "/Common/img/standard.png",
    "width": "100%",
    "height": "368px",
    "marginTop": "14px",
    "backgroundRepeat": "no-repeat",
    "backgroundPosition": "center"
  },
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Record/index.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Record/index.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_User/index.ux?uxType=comp":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_User/index.ux?uxType=comp ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/index.ux?uxType=page":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/index.ux?uxType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".full_b": {
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.8)",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "column",
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "paddingLeft": "20px",
    "paddingRight": "20px"
  },
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
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab_item"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "image"
        }
      ]
    },
    "width:active": "50px",
    "height:active": "50px",
    "resizeMode:active": "contain"
  },
  ".tab_item text": {
    "fontSize": "21px",
    "marginTop": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab_item"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/circle/index.ux?uxType=comp":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/circle/index.ux?uxType=comp ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
    "width": "84%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        }
      ]
    }
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
    "borderLeftColor": "#e7e7e7",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-border"
        }
      ]
    }
  },
  ".mask .dialog .box": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        }
      ]
    }
  },
  ".mask .dialog .box .top": {
    "width": "100%",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "15px",
    "paddingLeft": "10px",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        }
      ]
    }
  },
  ".mask .dialog .box .top .title": {
    "marginBottom": "50px",
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "32px",
    "fontWeight": "bold",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title"
        }
      ]
    }
  },
  ".mask .dialog .box .top .title-close": {
    "width": "95%",
    "marginLeft": "25px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title-close"
        }
      ]
    }
  },
  ".mask .dialog .box .top .title-none": {
    "width": "100%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title-none"
        }
      ]
    }
  },
  ".mask .dialog .box .top .close": {
    "width": "5%",
    "marginTop": "-20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "close"
        }
      ]
    }
  },
  ".mask .dialog .box .top .close text": {
    "textAlign": "center",
    "width": "100%",
    "fontSize": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "top"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "close"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".mask .dialog .box .content": {
    "paddingTop": "15px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px",
    "fontSize": "28px",
    "color": "#a0a0a0",
    "textAlign": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "content"
        }
      ]
    }
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
    "borderTopLeftRadius": "16px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".mask .dialog .box .tabs": {
    "width": "100%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        }
      ]
    }
  },
  ".mask .dialog .box .tab-bar": {
    "borderTopColor": "#bbbbbb",
    "borderRightColor": "#bbbbbb",
    "borderBottomColor": "#bbbbbb",
    "borderLeftColor": "#bbbbbb",
    "color": "#bbbbbb",
    "marginBottom": "20px",
    "borderRadius": "54px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-bar"
        }
      ]
    }
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
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-text"
        }
      ]
    },
    "color:active": "#ffffff",
    "backgroundColor:active": "#00b2ff"
  },
  ".mask .dialog .btn": {
    "marginTop": "50px",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn"
        }
      ]
    }
  },
  ".mask .dialog .btn .btnbox text": {
    "width": "270px",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "28px",
    "backgroundColor": "#00b2ff",
    "color": "#ffffff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnbox"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
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
    "color": "#666666",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnbox1"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".mask .dialog .btn .btnbox": {
    "backgroundColor:active": "#e7e7e7",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnbox"
        }
      ]
    }
  },
  ".mask .dialog .btn-vertical": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-vertical"
        }
      ]
    }
  },
  ".mask .dialog .btn-vertical .btnbox": {
    "width": "100%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-vertical"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnbox"
        }
      ]
    }
  },
  ".mask .dialog .btn-horizontal": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-horizontal"
        }
      ]
    }
  },
  ".mask .dialog .btn-horizontal .btnbox": {
    "width": "50%",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-horizontal"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnbox"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".warp": {
    "flexDirection": "column",
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "right": "0px",
    "bottom": "0px",
    "backgroundColor": "rgba(0,0,0,0.5)"
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
    "animationFillMode": "forwards",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        }
      ]
    }
  },
  ".warp .popup_width .header": {
    "height": "132px",
    "paddingTop": "0px",
    "paddingRight": "54px",
    "paddingBottom": "0px",
    "paddingLeft": "54px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        }
      ]
    }
  },
  ".warp .popup_width .header .title": {
    "lines": 1,
    "textOverflow": "ellipsis",
    "fontSize": "45px",
    "fontWeight": "600",
    "color": "rgba(0,0,0,0.9)",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title"
        }
      ]
    }
  },
  ".warp .popup_width .body": {
    "width": "100%",
    "paddingTop": "0px",
    "paddingRight": "44px",
    "paddingBottom": "0px",
    "paddingLeft": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "body"
        }
      ]
    }
  },
  ".warp .popup_width .footer": {
    "justifyContent": "center",
    "height": "126px",
    "paddingTop": "0px",
    "paddingRight": "36px",
    "paddingBottom": "0px",
    "paddingLeft": "36px",
    "marginTop": "18px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "footer"
        }
      ]
    }
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
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "footer"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "cancel"
        }
      ]
    },
    "backgroundColor:disabled": "rgba(0,0,0,0.1)"
  },
  ".warp .popup_width .footer .sure": {
    "width": "274px",
    "height": "90px",
    "fontSize": "36px",
    "fontWeight": "600",
    "backgroundColor": "#007dff",
    "color": "#ffffff",
    "borderRadius": "66px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "warp"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "popup_width"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "footer"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "sure"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&importNames[]=my-circle,importNames[]=my-dialog,importNames[]=my-privacypop":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&importNames[]=my-circle,importNames[]=my-dialog,importNames[]=my-privacypop ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
            "percent": function () {return this.progress},
            "strokeColor": "#00B2FF",
            "showTrail": function () {return true},
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
                    "value": function () {return this.segmentsText}
                  },
                  "classList": [
                    "title_stpes"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.steps_view}
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
                        "value": function () {return this.mileage}
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
                        "value": function () {return this.calories}
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
                        "value": function () {return this.goal_day}
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
                        "value": function () {return this.bmi}
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
                        "value": function () {return this.tzl}
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
          "classList": [
            "stan"
          ]
        }
      ]
    },
    {
      "type": "my-dialog",
      "attr": {
        "visible": function () {return this.open1},
        "dialogType": "prompt",
        "prompt": function () {return this.obj}
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
        "visible": function () {return this.open2},
        "dialogType": "prompt1",
        "prompt": function () {return this.obj}
      },
      "events": {
        "affirm": "enterDetails",
        "cancel": "close"
      }
    },
    {
      "type": "my-privacypop",
      "attr": {
        "showPop": function () {return this.isShow}
      },
      "events": {
        "agree": "agree",
        "cancel": "cancel"
      }
    }
  ]
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Record/index.ux?uxType=comp&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Record/index.ux?uxType=comp& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
                  "repeat": function () {return this.list30dayData},
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
                            "value": function () {return this.$item.summaryDate}
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
                                "percent": function () {return this.$item.percent}
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_User/index.ux?uxType=comp&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_User/index.ux?uxType=comp& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
                    "value": function () {return this.userData.loginPhone||"请点击登录"}
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
                    "value": function () {return '' + 'ID:' + (this.userData.userId)}
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
            "width": "702px",
            "backgroundRepeat": "no-repeat",
            "backgroundPosition": "center",
            "backgroundSize": "cover"
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
                    "value": function () {return this.userData.balance}
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
            "height": "526px",
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
                    "click": function (evt) { return this.pushweb(1,evt)}
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
                    "click": function (evt) { return this.pushweb(2,evt)}
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
                    "click": function (evt) { return this.pushweb(3,evt)}
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
                  "events": {
                    "click": "signOut"
                  },
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": "/Common/img/frame9.png"
                      },
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "退出"
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
                      "attr": {},
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {},
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
                      "attr": {},
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {},
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
                      "attr": {},
                      "classList": [
                        "frame_ima"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {},
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/index.ux?uxType=page&importNames[]=pagerecord,importNames[]=pagehome,importNames[]=pageuser":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/index.ux?uxType=page&importNames[]=pagerecord,importNames[]=pagehome,importNames[]=pageuser ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.isshow},
      "classList": [
        "full_b"
      ],
      "events": {
        "click": "closeAd"
      },
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/mba.png"
          },
          "style": {
            "marginTop": "-425px"
          }
        },
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/banner_me.png"
          },
          "style": {
            "width": "100%",
            "height": "180px"
          },
          "events": {
            "click": "openAd"
          }
        }
      ]
    },
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
              "repeat": function () {return this.datas.list},
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
                      "shown": function () {return this.$item.title=='首页'?true:false}
                    },
                    {
                      "type": "pagerecord",
                      "attr": {},
                      "shown": function () {return this.$item.title=='步数'?true:false}
                    },
                    {
                      "type": "pageuser",
                      "attr": {},
                      "shown": function () {return this.$item.title=='我的'?true:false}
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
              "repeat": function () {return this.datas.list},
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
                        "src": function () {return this.$item.show?this.$item.pic_choice:this.$item.pic}
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return this.$item.title}
                      },
                      "style": {
                        "color": function () {return this.$item.color}
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

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/circle/index.ux?uxType=comp&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/circle/index.ux?uxType=comp& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "stack",
  "attr": {},
  "style": function () {return this.style},
  "children": [
    {
      "type": "canvas",
      "attr": {
        "id": function () {return this.id}
      },
      "id": function () {return this.id},
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
          "attr": {
            "name": "default"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "apex-dialog"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": function () {return ['mask', this.showModal?'mask-exist':'mask-none']},
      "shown": function () {return this.visible},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "dialog"
          ],
          "style": function () {return this.setDialog},
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
                        "value": function () {return this.defaultPrompt.title||this.defaultOptions.title||this.title}
                      },
                      "classList": function () {return ['title', this.defaultOptions.closable?'title-close':'title-none']}
                    }
                  ]
                },
                {
                  "type": "tabs",
                  "attr": {},
                  "shown": function () {return this.dialogType==='prompt1'},
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
                  "shown": function () {return this.dialogType==='prompt'},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "focus",
                        "type": function () {return this.defaultPrompt.fieldtype},
                        "value": function () {return this.value},
                        "placeholder": function () {return this.defaultPrompt.placeholder},
                        "maxlength": function () {return this.defaultPrompt.maxlength===-1?'':this.defaultPrompt.maxlength}
                      },
                      "id": "focus",
                      "style": function () {return this.defaultPrompt.inputStyle},
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
                  "shown": function () {return this.dialogType==='prompt1'},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idkg",
                        "type": function () {return this.defaultPrompt.fieldtype},
                        "value": function () {return this.kg},
                        "placeholder": "输入体重",
                        "maxlength": "3"
                      },
                      "id": "idkg",
                      "style": function () {return this.defaultPrompt.inputStyle},
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
                  "shown": function () {return this.dialogType==='prompt1'},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idcm",
                        "type": function () {return this.defaultPrompt.fieldtype},
                        "value": function () {return this.cm},
                        "placeholder": "输入身高",
                        "maxlength": "3"
                      },
                      "id": "idcm",
                      "style": function () {return this.defaultPrompt.inputStyle},
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
                  "shown": function () {return this.dialogType==='prompt1'},
                  "children": [
                    {
                      "type": "input",
                      "attr": {
                        "id": "idage",
                        "type": function () {return this.defaultPrompt.fieldtype},
                        "value": function () {return this.age},
                        "placeholder": "输入年龄",
                        "maxlength": "3"
                      },
                      "id": "idage",
                      "style": function () {return this.defaultPrompt.inputStyle},
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
              "classList": function () {return ['btn', this.dialogType==='alter'||this.vertical===true?'btn-vertical':'btn-horizontal']},
              "children": [
                {
                  "type": "block",
                  "attr": {},
                  "shown": function () {return this.defaultOptions.buttons.length===0},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "shown": function () {return this.dialogType!=='alter'},
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
                            "value": function () {return this.defaultOptions.cancel}
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
                            "value": function () {return this.defaultOptions.affirm}
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {
    "show": function () {return this.showPop}
  },
  "classList": [
    "warp"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.showPop},
      "classList": [
        "popup_width"
      ],
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
                "value": function () {return this.title.trim()}
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
              "attr": {
                "name": "default"
              },
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
                        "value": " 权限用于获取步数与记录步数,请您在使用（或继续使用）我们的产品服务前仔细阅读 "
                      }
                    },
                    {
                      "type": "a",
                      "attr": {
                        "href": function () {return this.url1},
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
                        "href": function () {return this.url2},
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
                    "disabled": function () {return this.btndisabled}
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&name=pagehome":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&name=pagehome ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!../ui/circle/index.ux?uxType=comp&name=my-circle */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/circle/index.ux?uxType=comp&name=my-circle")
__webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!../ui/dialog/index.ux?uxType=comp&name=my-dialog */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp&name=my-dialog")
__webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!../ui/privacypop/index.ux?uxType=comp&name=my-privacypop */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp&name=my-privacypop")
var $app_style$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Home/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Home/index.ux?uxType=comp")
$app_define$('@app-component/pagehome', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp&importNames[]=my-circle,importNames[]=my-dialog,importNames[]=my-privacypop */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&importNames[]=my-circle,importNames[]=my-dialog,importNames[]=my-privacypop")
    $app_module$.exports.style = $app_style$;
});
;

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Record/index.ux?uxType=comp&name=pagerecord":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Record/index.ux?uxType=comp&name=pagerecord ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_Record/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_Record/index.ux?uxType=comp")
$app_define$('@app-component/pagerecord', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_Record/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_User/index.ux?uxType=comp&name=pageuser":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_User/index.ux?uxType=comp&name=pageuser ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/Page_User/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/Page_User/index.ux?uxType=comp")
$app_define$('@app-component/pageuser', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/Page_User/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/circle/index.ux?uxType=comp&name=my-circle":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/circle/index.ux?uxType=comp&name=my-circle ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/circle/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/circle/index.ux?uxType=comp")
$app_define$('@app-component/my-circle', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/circle/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp&name=my-dialog":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp&name=my-dialog ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp")
$app_define$('@app-component/my-dialog', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/dialog/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp&name=my-privacypop":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp&name=my-privacypop ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp")
$app_define$('@app-component/my-privacypop', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/ui/privacypop/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

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
/*!***********************************************!*\
  !*** ./src/Page_MainTab/index.ux?uxType=page ***!
  \***********************************************/
__webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./Page_Record/index.ux?uxType=comp&name=pagerecord */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Record/index.ux?uxType=comp&name=pagerecord")
__webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./Page_Home/index.ux?uxType=comp&name=pagehome */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_Home/index.ux?uxType=comp&name=pagehome")
__webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./Page_User/index.ux?uxType=comp&name=pageuser */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Page_MainTab/Page_User/index.ux?uxType=comp&name=pageuser")
var $app_style$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_MainTab/index.ux?uxType=page")
var $app_script$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_MainTab/index.ux?uxType=page")
$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=pagerecord,importNames[]=pagehome,importNames[]=pageuser */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_MainTab/index.ux?uxType=page&importNames[]=pagerecord,importNames[]=pagehome,importNames[]=pageuser")
    $app_module$.exports.style = $app_style$;
});
$app_bootstrap$('@app-component/index',{ packagerVersion: "1.9.14" });
})();

/******/ })()
;
    };
    if (typeof window === "undefined") {
      return createPageHandler();
    }
    else {
      window.createPageHandler = createPageHandler
    }
  })();
//# sourceMappingURL=Page_MainTab\index.js.map
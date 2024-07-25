/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_Tixian/index.ux?uxType=page":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_Tixian/index.ux?uxType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

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
    $utils.tablePlaque(this);
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/dialogBox/index.ux?uxType=comp":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/dialogBox/index.ux?uxType=comp ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

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
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_Tixian/index.ux?uxType=page":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_Tixian/index.ux?uxType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "32px",
    "fontWeight": "bold",
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
          "v": "title"
        }
      ]
    }
  },
  ".mask .dialog .box .content": {
    "paddingTop": "30px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px",
    "fontSize": "24px",
    "marginBottom": "50px",
    "color": "#828282",
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
  ".mask .dialog .btn": {
    "marginTop": "50px",
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
    "width": "100%",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "32px",
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
  ".mask .dialog .btn .btnbox1": {
    "flex": 1,
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
        }
      ]
    }
  },
  ".mask .dialog .btn .btnbox1 text": {
    "width": "100%",
    "height": "88px",
    "textAlign": "center",
    "borderRadius": "16px",
    "fontSize": "32px",
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
  ".mask .dialog .btn .btnbox2": {
    "flex": 1,
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
          "v": "btnbox2"
        }
      ]
    }
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
          "v": "btnbox2"
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
    "backgroundImage": "/Common/img/group.png",
    "backgroundRepeat": "no-repeat",
    "backgroundPosition": "center",
    "backgroundSize": "cover"
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
    "alignItems": "center",
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
    "height": "50px"
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/dialogBox/index.ux?uxType=comp":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/dialogBox/index.ux?uxType=comp ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
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
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "big-content"
        }
      ]
    }
  },
  ".dialog-page .big-content .icon-box": {
    "zIndex": 999,
    "top": "-460px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "big-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "icon-box"
        }
      ]
    }
  },
  ".dialog-page .big-content .icon-box .icon": {
    "width": "120px",
    "height": "120px",
    "zIndex": 999,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "big-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "icon-box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "icon"
        }
      ]
    }
  },
  ".dialog-page .content": {
    "width": "600px",
    "height": "394px",
    "backgroundColor": "#ffffff",
    "borderRadius": "32px",
    "flexDirection": "column",
    "alignItems": "center",
    "zIndex": 10,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
  ".dialog-page .content .hading": {
    "marginTop": "94px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "hading"
        }
      ]
    }
  },
  ".dialog-page .content .hading .txt": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#1a1a1a",
    "lineHeight": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "hading"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "txt"
        }
      ]
    }
  },
  ".dialog-page .content .subheading": {
    "paddingTop": "0px",
    "paddingRight": "50px",
    "paddingBottom": "0px",
    "paddingLeft": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "subheading"
        }
      ]
    }
  },
  ".dialog-page .content .subheading .txt": {
    "textAlign": "center",
    "marginTop": "16px",
    "fontSize": "28px",
    "fontWeight": "400",
    "color": "#333333",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "subheading"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "txt"
        }
      ]
    }
  },
  ".dialog-page .content .btnList": {
    "position": "absolute",
    "bottom": "20px",
    "justifyContent": "space-between",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnList"
        }
      ]
    }
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
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnList"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "close-btn"
        }
      ]
    }
  },
  ".dialog-page .content .btnList .close-btn .txt": {
    "fontSize": "28px",
    "fontWeight": "400",
    "color": "#666666",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnList"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "close-btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "txt"
        }
      ]
    }
  },
  ".dialog-page .content .btnList .success-btn": {
    "width": "250px",
    "height": "88px",
    "backgroundColor": "#00B2FF",
    "borderRadius": "16px",
    "justifyContent": "center",
    "alignItems": "center",
    "marginLeft": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnList"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "success-btn"
        }
      ]
    }
  },
  ".dialog-page .content .btnList .success-btn .txt": {
    "fontSize": "28px",
    "fontWeight": "600",
    "color": "#ffffff",
    "lineHeight": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "dialog-page"
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
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btnList"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "success-btn"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "txt"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_Tixian/index.ux?uxType=page&importNames[]=dialog-box":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_Tixian/index.ux?uxType=page&importNames[]=dialog-box ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
                    "value": function () {return this.userData.balance}
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
                "click": function (evt) { return this.openDialog(true,evt)}
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
                "click": function (evt) { return this.getwithdraw('AMOUNT_10',0.1,evt)}
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
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
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
                "click": function (evt) { return this.getwithdraw('AMOUNT_100',1,evt)}
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
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
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
                "click": function (evt) { return this.getwithdraw('AMOUNT_5000',50,evt)}
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
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
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
                "click": function (evt) { return this.getwithdraw('AMOUNT_10000',100,evt)}
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
                  "type": "text",
                  "attr": {},
                  "classList": [
                    "grid-item-text"
                  ],
                  "children": [
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
                "scrollable": function () {return this.scrollable}
              },
              "shown": function () {return this.listshow},
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
                      "repeat": function () {return this.listData},
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
                                    "value": function () {return this.$item.title}
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
                                    "value": function () {return this.$item.createdDt}
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
                                "value": function () {return '' + '+' + (this.$item.amount) + '元'}
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
                      "repeat": function () {return this.listData},
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
                                    "value": function () {return this.$item.title}
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
                                    "value": function () {return this.$item.createdDt}
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
                                "value": function () {return '' + (this.$item.amount) + '元'}
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
          "shown": function () {return !this.listshow},
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
      "shown": function () {return this.dialog_visible},
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
                        "value": function () {return this.rules}
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
                        "click": function (evt) { return this.openDialog(false,evt)}
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
        "showDialog": function () {return this.showDialog},
        "dialogData": function () {return this.dialogData}
      },
      "events": {
        "emit-success": "successDialog",
        "emit-clone": "cloneDialog"
      }
    }
  ]
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/dialogBox/index.ux?uxType=comp&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/dialogBox/index.ux?uxType=comp& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {
    "show": function () {return this.showDialog}
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
                    "value": function () {return this.dialogData.hading}
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
                    "value": function () {return this.dialogData.subheading}
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
                        "value": function () {return this.dialogData.cloneBtn}
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
                        "value": function () {return this.dialogData.successBtn}
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
            "show": function () {return this.showDialog}
          },
          "classList": [
            "icon-box"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return this.iconData[this.dialogData.iconType]}
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/dialogBox/index.ux?uxType=comp&name=dialog-box":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/dialogBox/index.ux?uxType=comp&name=dialog-box ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/dialogBox/index.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/dialogBox/index.ux?uxType=comp")
$app_define$('@app-component/dialog-box', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/dialogBox/index.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

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
    console.log('ajax请求', '  url=' + url, ";method=" + method, ";data= " + JSON.stringify(data));
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
/*!**********************************************!*\
  !*** ./src/Page_Tixian/index.ux?uxType=page ***!
  \**********************************************/
__webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!../dialogBox/index.ux?uxType=comp&name=dialog-box */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/dialogBox/index.ux?uxType=comp&name=dialog-box")
var $app_style$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_Tixian/index.ux?uxType=page")
var $app_script$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_Tixian/index.ux?uxType=page")
$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=dialog-box */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_Tixian/index.ux?uxType=page&importNames[]=dialog-box")
    $app_module$.exports.style = $app_style$;
});
$app_bootstrap$('@app-component/index',{ packagerVersion: "1.9.14" });
})();

/******/ })()
;
//# sourceMappingURL=Page_Tixian\index.js.map
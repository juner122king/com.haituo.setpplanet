(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_login/index.ux?uxType=page":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_login/index.ux?uxType=page ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = {
  private: {
    appname: '',
    url1: '',
    url2: '',
    consentChecked: false,
    authCode: '',
    phone: "",
    deviceNum: '123123',
    countDownData: {
      isFormat: false,
      name: "countDownTime",
      totalSeconds: 60
    },
    countDownTime: {
      minute: 0,
      seconds: 0
    },
    timer: null,
    beingSent: false,
    strVerificationCode: "",
    subimtStr: "",
    showStrVerificationCode: false
  },
  onInit: function () {
    this.url1 = this.$app.$def.dataApp.url2;
    this.url2 = this.$app.$def.dataApp.url3;
    this.appname = $app.getInfo().name;
    const that = this;
    _system.default.getUserId({
      success: function (data) {
        that.deviceNum = data.userId;
      },
      fail: function (data, code) {
        console.log('handling fail, code = ' + code);
      }
    });
  },
  checkedRadio: function (e) {
    this.consentChecked = e.checked;
  },
  sendAuthCode: $utils.throttle(function (params) {
    if (!this.phone) {
      $prompt.showToast({
        message: '请输入手机号',
        gravity: 'center'
      });
      return;
    }
    const testPhone = this.isValidPhoneNumber(this.phone);
    if (!testPhone) {
      $prompt.showToast({
        message: '手机号码格式不正确',
        gravity: 'center'
      });
      return;
    }
    if (this.beingSent) {
      return;
    }
    if (this.strVerificationCode && this.strVerificationCode !== this.subimtStr) {
      $prompt.showToast({
        message: '验证码格式不正确',
        gravity: 'center'
      });
      return;
    }
    $apis.user.postSendCode({
      phone: this.phone
    }).then(res => {
      console.log(res);
      $prompt.showToast({
        message: '已发送',
        gravity: 'center'
      });
      console.log('查看短信验证码', res);
      this.beingSent = true;
      this.startCountDown();
    }).catch(err => {
      $prompt.showToast({
        message: err.message,
        gravity: 'center'
      });
    });
  }, 5000),
  subimt: function () {
    if (!this.phone || !this.authCode) {
      $prompt.showToast({
        message: `${this.phone ? '请输入验证码' : '请输入手机号'}`,
        gravity: 'center'
      });
      return;
    }
    if (!this.consentChecked) {
      $prompt.showToast({
        message: `请同意协议`,
        gravity: 'center'
      });
      return;
    }
    const param = {
      loginType: 'PHONE',
      code: this.authCode,
      appId: "SC_0001",
      loginAccount: this.phone,
      deviceNum: this.deviceNum,
      phone: this.phone
    };
    console.log('登录请求参数', param);
    $apis.example.toLogin(_objectSpread({}, param)).then(async res => {
      console.log('登录成功数据', res);
      $prompt.showToast({
        message: '登录成功',
        gravity: 'center',
        duration: 1
      });
      $storage.delete({
        key: 'AUTH_TOKEN_DATA',
        success: function (data) {
          console.log("handling success");
          setTimeout(() => {
            $router.back();
          }, 800);
        }
      });
    }).catch(err => {
      console.log(err.code, '这是点击错误');
      $prompt.showToast({
        message: JSON.parse(err).message,
        gravity: 'center'
      });
    });
  },
  startCountDown() {
    $utils.startCountDown(this.countDownData, this).then(() => {
      this.beingSent = false;
      this.countDownTime = {
        minute: 0,
        seconds: 0
      };
      this.showStrVerificationCode = true;
      this.clickCvas();
    });
  },
  isValidPhoneNumber: function (phoneNumber) {
    const phonePattern = /^(?:\+86)?1[3-9]\d{9}$/;
    return phonePattern.test(phoneNumber);
  },
  changeHandler: function (params) {
    console.log(params, 'params');
  },
  randomNum: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  randomColor: function (min, max) {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return `rgb(${r},${g},${b}`;
  },
  clickCvas: function () {
    let canvas = this.$element('cvs');
    console.log(canvas, '查看这个canvas');
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = this.randomColor(70, 230);
    ctx.fillRect(0, 0, 150, 150);
    const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let imgCode = '';
    for (let i = 0; i < 4; i++) {
      const text = pool[this.randomNum(0, pool.length)];
      imgCode += text;
      const fontSize = this.randomNum(22, 80);
      ctx.font = `${fontSize}px Simhei`;
      const deg = this.randomNum(-30, 30);
      ctx.textBaseline = 'top';
      ctx.fillStyle = this.randomColor(80, 150);
      ctx.save();
      ctx.translate(30 * i + 15, 15);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(text, -10, -15);
      ctx.restore();
    }
    this.strVerificationCode = imgCode;
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_login/index.ux?uxType=page":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_login/index.ux?uxType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".login-page": {
    "paddingTop": "0px",
    "paddingRight": "56px",
    "paddingBottom": "0px",
    "paddingLeft": "56px",
    "flexDirection": "column"
  },
  ".login-page .login-title": {
    "marginTop": "44px",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-title"
        }
      ]
    }
  },
  ".login-page .login-title .heading": {
    "fontSize": "48px",
    "fontWeight": "600",
    "color": "#222222",
    "lineHeight": "68px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-title"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "heading"
        }
      ]
    }
  },
  ".login-page .login-title .subhead": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#808080",
    "lineHeight": "34px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-title"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "subhead"
        }
      ]
    }
  },
  ".login-page .phone-num": {
    "width": "654px",
    "height": "96px",
    "backgroundColor": "#f5f5f5",
    "borderRadius": "64px",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px",
    "marginTop": "80px",
    "justifyContent": "center",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone-num"
        }
      ]
    }
  },
  ".login-page .phone-num text": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#333333",
    "lineHeight": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone-num"
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
  ".login-page .phone-num .ipt": {
    "marginLeft": "40px",
    "width": "420px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "phone-num"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ipt"
        }
      ]
    }
  },
  ".login-page .verification-code": {
    "width": "654px",
    "height": "96px",
    "backgroundColor": "#f5f5f5",
    "borderRadius": "64px",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px",
    "marginTop": "32px",
    "justifyContent": "center",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "verification-code"
        }
      ]
    }
  },
  ".login-page .verification-code .heading": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#333333",
    "lineHeight": "44px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "verification-code"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "heading"
        }
      ]
    }
  },
  ".login-page .verification-code .ipt": {
    "width": "250px",
    "marginLeft": "40px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "verification-code"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ipt"
        }
      ]
    }
  },
  ".login-page .verification-code .get-verification": {
    "width": "180px",
    "height": "40px",
    "fontSize": "28px",
    "fontWeight": "600",
    "color": "#3784f9",
    "paddingLeft": "10px",
    "borderLeftWidth": "2px",
    "borderLeftStyle": "solid",
    "borderLeftColor": "#999999",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "verification-code"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "get-verification"
        }
      ]
    }
  },
  ".login-page .login-btn": {
    "marginTop": "48px",
    "width": "622px",
    "height": "88px",
    "backgroundColor": "#3784f9",
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
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-btn"
        }
      ]
    }
  },
  ".login-page .login-btn .txt": {
    "fontSize": "36px",
    "fontWeight": "700",
    "color": "#ffffff",
    "lineHeight": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-btn"
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
  ".login-page .canvas": {
    "width": "100%",
    "marginTop": "32px",
    "height": "88px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas"
        }
      ]
    }
  },
  ".login-page .canvas .CIpt": {
    "backgroundColor": "#f5f5f5",
    "fontSize": "28px",
    "borderTopLeftRadius": "15px",
    "borderBottomLeftRadius": "15px",
    "color": "#000000",
    "flex": 3,
    "paddingLeft": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "CIpt"
        }
      ]
    }
  },
  ".login-page .canvas .cvs": {
    "backgroundColor": "#f5f5f5",
    "fontSize": "28px",
    "color": "#000000",
    "flex": 1,
    "paddingLeft": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "cvs"
        }
      ]
    }
  },
  ".login-page .consent": {
    "marginTop": "28px",
    "alignItems": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "consent"
        }
      ]
    }
  },
  ".login-page .consent .default": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#999999",
    "lineHeight": "34px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "consent"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "default"
        }
      ]
    }
  },
  ".login-page .consent .agreement": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#3687FF",
    "lineHeight": "34px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "consent"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "agreement"
        }
      ]
    }
  },
  ".login-page .consent .checkbox": {
    "marginRight": "2px",
    "width": "60px",
    "height": "42px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "login-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "consent"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "checkbox"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_login/index.ux?uxType=page&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_login/index.ux?uxType=page& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "login-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "login-title"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return '' + '欢迎来到' + (this.appname)}
          },
          "classList": [
            "heading"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "使用手机号快捷登录，享受更多专属权益"
          },
          "classList": [
            "subhead"
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "phone-num"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "手机号"
          }
        },
        {
          "type": "input",
          "attr": {
            "placeholder": "请输入手机号",
            "value": function () {return this.phone},
            "type": "number"
          },
          "events": {
            "change": function(evt) {this.phone = evt.target.value}
          },
          "classList": [
            "ipt"
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "verification-code"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "验证码"
          },
          "classList": [
            "heading"
          ]
        },
        {
          "type": "input",
          "attr": {
            "placeholder": "输入验证码",
            "value": function () {return this.authCode}
          },
          "events": {
            "change": function(evt) {this.authCode = evt.target.value}
          },
          "classList": [
            "ipt"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return this.countDownTime.seconds?this.countDownTime.seconds+'s':'获取验证码'}
          },
          "classList": [
            "get-verification"
          ],
          "style": function () {return this.beingSent?'color: #999999':''},
          "events": {
            "click": "sendAuthCode"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "canvas"
      ],
      "style": function () {return this.showStrVerificationCode?'':'height: 0'},
      "children": [
        {
          "type": "input",
          "attr": {
            "placeholder": "请输入文字验证码",
            "value": function () {return this.subimtStr}
          },
          "classList": [
            "CIpt"
          ],
          "events": {
            "change": function(evt) {this.subimtStr = evt.target.value}
          }
        },
        {
          "type": "canvas",
          "attr": {
            "id": "cvs"
          },
          "id": "cvs",
          "events": {
            "click": "clickCvas"
          },
          "classList": [
            "cvs"
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "login-btn"
      ],
      "events": {
        "click": "subimt"
      },
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "登录"
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
        "consent"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "checkbox",
            "checked": function () {return this.consentChecked},
            "value": function() {
    if (Array.isArray(this.consentChecked)) {
      return this.consentChecked.indexOf(null) > -1
    } else {
      return this.consentChecked
    }}
          },
          "events": {
            "change": "checkedRadio"
          }
        },
        {
          "type": "div",
          "attr": {},
          "style": {
            "left": "-46px"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "勾选同意"
              },
              "classList": [
                "default"
              ]
            },
            {
              "type": "a",
              "attr": {
                "href": function () {return this.url1},
                "value": "《用户协议》"
              },
              "classList": [
                "agreement"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": "和"
              },
              "classList": [
                "default"
              ]
            },
            {
              "type": "a",
              "attr": {
                "href": function () {return this.url2},
                "value": "《隐私政策》"
              },
              "classList": [
                "agreement"
              ]
            }
          ]
        }
      ]
    }
  ]
}

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
/*!*********************************************!*\
  !*** ./src/Page_login/index.ux?uxType=page ***!
  \*********************************************/

var $app_style$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Page_login/index.ux?uxType=page")
var $app_script$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Page_login/index.ux?uxType=page")
$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Page_login/index.ux?uxType=page&")
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
//# sourceMappingURL=Page_login\index.js.map
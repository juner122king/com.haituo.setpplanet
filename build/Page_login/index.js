(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./src/Page_login/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!./src/Page_login/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".login-page": {
    "paddingTop": "0px",
    "paddingRight": "56px",
    "paddingBottom": "0px",
    "paddingLeft": "56px",
    "flexDirection": "column"
  },
  ".login-page .login-title": {
    "marginTop": "44px",
    "flexDirection": "column"
  },
  ".login-page .login-title .heading": {
    "fontSize": "48px",
    "fontWeight": "600",
    "color": "#222222",
    "lineHeight": "68px"
  },
  ".login-page .login-title .subhead": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#808080",
    "lineHeight": "34px"
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
    "alignItems": "center"
  },
  ".login-page .phone-num text": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#333333",
    "lineHeight": "44px"
  },
  ".login-page .phone-num .ipt": {
    "marginLeft": "40px",
    "width": "420px"
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
    "alignItems": "center"
  },
  ".login-page .verification-code .heading": {
    "fontSize": "32px",
    "fontWeight": "600",
    "color": "#333333",
    "lineHeight": "44px"
  },
  ".login-page .verification-code .ipt": {
    "width": "250px",
    "marginLeft": "40px"
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
    "borderLeftColor": "#999999"
  },
  ".login-page .login-btn": {
    "marginTop": "48px",
    "width": "622px",
    "height": "88px",
    "backgroundColor": "#3784f9",
    "borderRadius": "16px",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".login-page .login-btn .txt": {
    "fontSize": "36px",
    "fontWeight": "700",
    "color": "#ffffff",
    "lineHeight": "50px"
  },
  ".login-page .canvas": {
    "width": "100%",
    "marginTop": "32px",
    "height": "88px"
  },
  ".login-page .canvas .CIpt": {
    "backgroundColor": "#f5f5f5",
    "fontSize": "28px",
    "borderTopLeftRadius": "15px",
    "borderBottomLeftRadius": "15px",
    "color": "#000000",
    "flex": 3,
    "paddingLeft": "50px"
  },
  ".login-page .canvas .cvs": {
    "backgroundColor": "#f5f5f5",
    "fontSize": "28px",
    "color": "#000000",
    "flex": 1,
    "paddingLeft": "10px"
  },
  ".login-page .consent": {
    "marginTop": "28px",
    "alignItems": "center"
  },
  ".login-page .consent .default": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#999999",
    "lineHeight": "34px"
  },
  ".login-page .consent .agreement": {
    "fontSize": "24px",
    "fontWeight": "400",
    "color": "#3687FF",
    "lineHeight": "34px"
  },
  ".login-page .consent .checkbox": {
    "marginRight": "2px",
    "width": "60px",
    "height": "42px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
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
            "value": function () {return '欢迎来到'+((this.appname))}
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
            "value": function () {return (this.phone)},
            "type": "number"
          },
          "events": {
            "change": function(evt) {(this.phone) = evt.target.value}
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
            "value": function () {return (this.authCode)}
          },
          "events": {
            "change": function(evt) {(this.authCode) = evt.target.value}
          },
          "classList": [
            "ipt"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.countDownTime.seconds?this.countDownTime.seconds+'s':'获取验证码')}
          },
          "classList": [
            "get-verification"
          ],
          "style": function () {return (this.beingSent?'color: #999999':'')},
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
      "style": function () {return (this.showStrVerificationCode?'':'height: 0')},
      "children": [
        {
          "type": "input",
          "attr": {
            "placeholder": "请输入文字验证码",
            "value": function () {return (this.subimtStr)}
          },
          "classList": [
            "CIpt"
          ],
          "events": {
            "change": function(evt) {(this.subimtStr) = evt.target.value}
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
            "checked": function () {return (this.consentChecked)},
            "value": function() {if (Array.isArray((this.consentChecked))) {return (this.consentChecked).indexOf(null) > -1} else {return (this.consentChecked)}}
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
                "href": function () {return (this.url1)},
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
                "href": function () {return (this.url2)},
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
/*!*********************************!*\
  !*** ./src/Page_login/index.ux ***!
  \*********************************/
var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./src/Page_login/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfbG9naW5cXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBNENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9QYWdlX2xvZ2luL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfbG9naW5cXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX2xvZ2luL2luZGV4LnV4PzI0NDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfbG9naW4vaW5kZXgudXg/YjJiNiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfbG9naW4vaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibG9naW4tcGFnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJsb2dpbi10aXRsZVwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJoZWFkaW5nXCI+5qyi6L+O5p2l5Yiwe3thcHBuYW1lfX08L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cInN1YmhlYWRcIj7kvb/nlKjmiYvmnLrlj7flv6vmjbfnmbvlvZXvvIzkuqvlj5fmm7TlpJrkuJPlsZ7mnYPnm4o8L3RleHQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBob25lLW51bVwiPlxuICAgICAgPHRleHQ+5omL5py65Y+3PC90ZXh0PlxuICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5omL5py65Y+3XCIgbW9kZWw6dmFsdWU9XCJ7e3Bob25lfX1cIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpcHRcIj48L2lucHV0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInZlcmlmaWNhdGlvbi1jb2RlXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImhlYWRpbmdcIj7pqozor4HnoIE8L3RleHQ+XG4gICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCLovpPlhaXpqozor4HnoIFcIiBtb2RlbDp2YWx1ZT1cInt7YXV0aENvZGV9fVwiIGNsYXNzPVwiaXB0XCI+PC9pbnB1dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiZ2V0LXZlcmlmaWNhdGlvblwiIHN0eWxlPVwie3tiZWluZ1NlbnQ/ICdjb2xvcjogIzk5OTk5OSc6Jyd9fVwiIEBjbGljaz1cInNlbmRBdXRoQ29kZVwiPnt7Y291bnREb3duVGltZS5zZWNvbmRzP2NvdW50RG93blRpbWUuc2Vjb25kcyArICdzJzon6I635Y+W6aqM6K+B56CBJ319PC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNhbnZhc1wiIHN0eWxlPVwie3tzaG93U3RyVmVyaWZpY2F0aW9uQ29kZT8nJzonaGVpZ2h0OiAwJ319XCI+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJjYW52YXNcIiBpZj1cInt7dHJ1ZX19XCIgPiAtLT5cbiAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeaWh+Wtl+mqjOivgeeggVwiIGNsYXNzPVwiQ0lwdFwiIG1vZGVsOnZhbHVlPVwie3tzdWJpbXRTdHJ9fVwiIC8+XG4gICAgICA8Y2FudmFzIGlkPVwiY3ZzXCIgQGNsaWNrPVwiY2xpY2tDdmFzXCIgY2xhc3M9XCJjdnNcIj48L2NhbnZhcz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJsb2dpbi1idG5cIiBAY2xpY2s9XCJzdWJpbXRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+55m75b2VPC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnNlbnRcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwie3tjb25zZW50Q2hlY2tlZH19XCIgbW9kZWw6dmFsdWU9XCJ7e2NvbnNlbnRDaGVja2VkfX1cIiBAY2hhbmdlPVwiY2hlY2tlZFJhZGlvXCI+PC9pbnB1dD5cbiAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OiAtNDZweFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRlZmF1bHRcIj7li77pgInlkIzmhI88L3RleHQ+XG4gICAgICAgIDxhIGhyZWY9XCJ7e3VybDF9fVwiIGNsYXNzPVwiYWdyZWVtZW50XCI+44CK55So5oi35Y2P6K6u44CLPC9hPlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRlZmF1bHRcIj7lkow8L3RleHQ+XG4gICAgICAgIDxhIGhyZWY9XCJ7e3VybDJ9fVwiIGNsYXNzPVwiYWdyZWVtZW50XCI+44CK6ZqQ56eB5pS/562W44CLPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIEBpbXBvcnQgXCIuL2luZGV4Lmxlc3NcIjtcbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCAkZGV2aWNlIGZyb20gJ0BzeXN0ZW0uZGV2aWNlJ1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcml2YXRlOiB7XG4gICAgICBhcHBuYW1lOiAnJyxcbiAgICAgIHVybDE6ICcnLFxuICAgICAgdXJsMjogJycsXG4gICAgICBjb25zZW50Q2hlY2tlZDogZmFsc2UsXG4gICAgICBhdXRoQ29kZTogJycsXG4gICAgICBwaG9uZTogXCJcIixcbiAgICAgIGRldmljZU51bTogJzEyMzEyMycsXG4gICAgICBjb3VudERvd25EYXRhOiB7XG4gICAgICAgIGlzRm9ybWF0OiBmYWxzZSxcbiAgICAgICAgbmFtZTogXCJjb3VudERvd25UaW1lXCIsXG4gICAgICAgIHRvdGFsU2Vjb25kczogNjBcbiAgICAgIH0sXG4gICAgICBjb3VudERvd25UaW1lOiB7XG4gICAgICAgIG1pbnV0ZTogMCxcbiAgICAgICAgc2Vjb25kczogMFxuICAgICAgfSxcbiAgICAgIHRpbWVyOiBudWxsLFxuICAgICAgYmVpbmdTZW50OiBmYWxzZSxcbiAgICAgIHN0clZlcmlmaWNhdGlvbkNvZGU6IFwiXCIsXG4gICAgICBzdWJpbXRTdHI6IFwiXCIsXG4gICAgICBzaG93U3RyVmVyaWZpY2F0aW9uQ29kZTogZmFsc2VcbiAgICB9LFxuICAgIG9uSW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy51cmwxID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwyO1xuICAgICAgdGhpcy51cmwyID0gdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC51cmwzO1xuICAgICAgdGhpcy5hcHBuYW1lID0gJGFwcC5nZXRJbmZvKCkubmFtZTtcblxuXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgJGRldmljZS5nZXRVc2VySWQoe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHRoYXQuZGV2aWNlTnVtID0gZGF0YS51c2VySWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChkYXRhLCBjb2RlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsaW5nIGZhaWwsIGNvZGUgPSAnICsgY29kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjaGVja2VkUmFkaW86IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLmNvbnNlbnRDaGVja2VkID0gZS5jaGVja2VkXG4gICAgfSxcbiAgICBzZW5kQXV0aENvZGU6ICR1dGlscy50aHJvdHRsZShmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBpZiAoIXRoaXMucGhvbmUpIHtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6ICfor7fovpPlhaXmiYvmnLrlj7cnLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdGVzdFBob25lID0gdGhpcy5pc1ZhbGlkUGhvbmVOdW1iZXIodGhpcy5waG9uZSlcbiAgICAgIGlmICghdGVzdFBob25lKSB7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiAn5omL5py65Y+356CB5qC85byP5LiN5q2j56GuJyxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJlaW5nU2VudCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0clZlcmlmaWNhdGlvbkNvZGUgJiYgKHRoaXMuc3RyVmVyaWZpY2F0aW9uQ29kZSAhPT0gdGhpcy5zdWJpbXRTdHIpKSB7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiAn6aqM6K+B56CB5qC85byP5LiN5q2j56GuJyxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgICRhcGlzLnVzZXIucG9zdFNlbmRDb2RlKHtcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6ICflt7Llj5HpgIEnLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKCfmn6XnnIvnn63kv6Hpqozor4HnoIEnLCByZXMpO1xuICAgICAgICB0aGlzLmJlaW5nU2VudCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKVxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgNTAwMCksXG4gICAgc3ViaW10OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmICghdGhpcy5waG9uZSB8fCAhdGhpcy5hdXRoQ29kZSkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYCR7dGhpcy5waG9uZSA/ICfor7fovpPlhaXpqozor4HnoIEnIDogJ+ivt+i+k+WFpeaJi+acuuWPtyd9YCxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jb25zZW50Q2hlY2tlZCkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYOivt+WQjOaEj+WNj+iurmAsXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICBsb2dpblR5cGU6ICdQSE9ORScsXG4gICAgICAgIGNvZGU6IHRoaXMuYXV0aENvZGUsXG4gICAgICAgIGFwcElkOiBcIlNDXzAwMDFcIixcbiAgICAgICAgbG9naW5BY2NvdW50OiB0aGlzLnBob25lLFxuICAgICAgICBkZXZpY2VOdW06IHRoaXMuZGV2aWNlTnVtLFxuICAgICAgICBwaG9uZTogdGhpcy5waG9uZVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygn55m75b2V6K+35rGC5Y+C5pWwJywgcGFyYW0pO1xuICAgICAgJGFwaXMuZXhhbXBsZS50b0xvZ2luKHtcbiAgICAgICAgLi4ucGFyYW1cbiAgICAgIH0pLnRoZW4oYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5oiQ5Yqf5pWw5o2uJywgcmVzKTtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6ICfnmbvlvZXmiJDlip8nLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAxXG4gICAgICAgIH0pXG5cbiAgICAgICAgJHN0b3JhZ2UuZGVsZXRlKHtcbiAgICAgICAgICBrZXk6ICdBVVRIX1RPS0VOX0RBVEEnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsaW5nIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgJHJvdXRlci5iYWNrKClcbiAgICAgICAgICAgIH0sIDgwMCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLmNvZGUsICfov5nmmK/ngrnlh7vplJnor68nKTtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6IEpTT04ucGFyc2UoZXJyKS5tZXNzYWdlLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgfSxcbiAgICBzdGFydENvdW50RG93bigpIHtcbiAgICAgICR1dGlscy5zdGFydENvdW50RG93bih0aGlzLmNvdW50RG93bkRhdGEsIHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmJlaW5nU2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvdW50RG93blRpbWUgPSB7XG4gICAgICAgICAgbWludXRlOiAwLFxuICAgICAgICAgIHNlY29uZHM6IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dTdHJWZXJpZmljYXRpb25Db2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGlja0N2YXMoKVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBpc1ZhbGlkUGhvbmVOdW1iZXI6IGZ1bmN0aW9uIChwaG9uZU51bWJlcikge1xuICAgICAgY29uc3QgcGhvbmVQYXR0ZXJuID0gL14oPzpcXCs4Nik/MVszLTldXFxkezl9JC87XG4gICAgICByZXR1cm4gcGhvbmVQYXR0ZXJuLnRlc3QocGhvbmVOdW1iZXIpO1xuICAgIH0sXG4gICAgY2hhbmdlSGFuZGxlcjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgY29uc29sZS5sb2cocGFyYW1zLCAncGFyYW1zJyk7XG4gICAgfSxcbiAgICAvLyDnlJ/miJBbbWluLG1heCnkuYvpl7TnmoTpmo/mnLrmlbBcbiAgICByYW5kb21OdW06IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKVxuICAgIH0sXG4gICAgLy8g55Sf5oiQ6ZqP5py66aKc6ImyXG4gICAgcmFuZG9tQ29sb3I6IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgICAgbGV0IHIgPSB0aGlzLnJhbmRvbU51bShtaW4sIG1heClcbiAgICAgIGxldCBnID0gdGhpcy5yYW5kb21OdW0obWluLCBtYXgpXG4gICAgICBsZXQgYiA9IHRoaXMucmFuZG9tTnVtKG1pbiwgbWF4KVxuICAgICAgcmV0dXJuIGByZ2IoJHtyfSwke2d9LCR7Yn1gO1xuICAgIH0sXG4gICAgY2xpY2tDdmFzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FudmFzID0gdGhpcy4kZWxlbWVudCgnY3ZzJylcbiAgICAgIGNvbnNvbGUubG9nKGNhbnZhcywgJ+afpeeci+i/meS4qmNhbnZhcycpO1xuICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAvLyDog4zmma/loavlhYXoibIg6ZqP5py6XG4gICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5yYW5kb21Db2xvcig3MCwgMjMwKVxuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDE1MCwgMTUwKVxuICAgICAgLy8g6ZqP5py655Sf5oiQ5a2X56ym5LiyXG4gICAgICAvLyDlrZfnrKbmsaBcbiAgICAgIGNvbnN0IHBvb2wgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknXG4gICAgICAvLyDlrZjlgqjnlJ/miJDnmoTpmo/mnLrpqozor4HnoIFcbiAgICAgIGxldCBpbWdDb2RlID0gJydcbiAgICAgIC8vIOeUn+aIkCA0IOS9jemqjOivgeeggVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHBvb2xbdGhpcy5yYW5kb21OdW0oMCwgcG9vbC5sZW5ndGgpXVxuICAgICAgICBpbWdDb2RlICs9IHRleHRcbiAgICAgICAgLy8g6ZqP5py65a2X5L2T5aSn5bCPXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5yYW5kb21OdW0oMjIsIDgwKVxuICAgICAgICBjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IFNpbWhlaWBcbiAgICAgICAgLy8g6K6h566X6ZqP5py65peL6L2s6KeS5bqmXG4gICAgICAgIGNvbnN0IGRlZyA9IHRoaXMucmFuZG9tTnVtKC0zMCwgMzApXG4gICAgICAgIC8vIOiuvue9ruaWh+acrOWfuue6v+S4uumhtumDqFxuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCdcbiAgICAgICAgLy8g6ZqP5py65a2X5L2T6aKc6ImyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnJhbmRvbUNvbG9yKDgwLCAxNTApXG4gICAgICAgIC8vIOWwhuW9k+WJjeeKtuaAgeWwgeWtmOWFpeagiFxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIC8vIOmaj+acuuWBj+enu+i3neemu1xuICAgICAgICBjdHgudHJhbnNsYXRlKDMwICogaSArIDE1LCAxNSlcbiAgICAgICAgLy8g6ZqP5py65peL6L2s6KeS5bqmXG4gICAgICAgIGN0eC5yb3RhdGUoKGRlZyAqIE1hdGguUEkpIC8gMTgwKVxuICAgICAgICAvLyDkvY3nva7nm7jlr7nkuo7lvZPliY3nirbmgIHvvIzlt6blgY/np7sxMO+8jOS4iuWBj+enuzE1XG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAtMTAsIC0xNSlcbiAgICAgICAgLy8g5oGi5aSN5LmL5YmN5L+d5a2Y55qE57uY5Zu+54q25oCBXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RyVmVyaWZpY2F0aW9uQ29kZSA9IGltZ0NvZGVcbiAgICB9XG4gIH1cbjwvc2NyaXB0PiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIubG9naW4tcGFnZVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1NnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjU2cHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi10aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0NHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAubG9naW4tdGl0bGUgLmhlYWRpbmdcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0OHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMyMjIyMjJcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI2OHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAubG9naW4tdGl0bGUgLnN1YmhlYWRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNDAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiM4MDgwODBcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCIzNHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAucGhvbmUtbnVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjU0cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjk2cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjY0cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMycHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzJweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiODBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5waG9uZS1udW0gdGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzMzMzMzM1wiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjQ0cHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5waG9uZS1udW0gLmlwdFwiOiB7XG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiNDBweFwiLFxuICAgIFwid2lkdGhcIjogXCI0MjBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLnZlcmlmaWNhdGlvbi1jb2RlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjU0cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjk2cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjY0cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMycHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzJweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMzJweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC52ZXJpZmljYXRpb24tY29kZSAuaGVhZGluZ1wiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzMzMzMzM1wiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjQ0cHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC52ZXJpZmljYXRpb24tY29kZSAuaXB0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjUwcHhcIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCI0MHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAudmVyaWZpY2F0aW9uLWNvZGUgLmdldC12ZXJpZmljYXRpb25cIjoge1xuICAgIFwid2lkdGhcIjogXCIxODBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzNzg0ZjlcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiYm9yZGVyTGVmdFdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0U3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiIzk5OTk5OVwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLWJ0blwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0OHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYyMnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMzc4NGY5XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLWJ0biAudHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzZweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjcwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNhbnZhc1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjMycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jYW52YXMgLkNJcHRcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMTVweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiOiBcIjE1cHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZmxleFwiOiAzLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAuY2FudmFzIC5jdnNcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjVmNVwiLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNvbnNlbnRcIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiMjhweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNvbnNlbnQgLmRlZmF1bHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyNHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNDAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCIzNHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAuY29uc2VudCAuYWdyZWVtZW50XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMzY4N0ZGXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiMzRweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNvbnNlbnQgLmNoZWNrYm94XCI6IHtcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQycHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJsb2dpbi1wYWdlXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibG9naW4tdGl0bGVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ+asoui/juadpeWIsCcrKCh0aGlzLmFwcG5hbWUpKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGluZ1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5L2/55So5omL5py65Y+35b+r5o2355m75b2V77yM5Lqr5Y+X5pu05aSa5LiT5bGe5p2D55uKXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwic3ViaGVhZFwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJwaG9uZS1udW1cIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5omL5py65Y+3XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl5omL5py65Y+3XCIsXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucGhvbmUpfSxcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBmdW5jdGlvbihldnQpIHsodGhpcy5waG9uZSkgPSBldnQudGFyZ2V0LnZhbHVlfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpcHRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidmVyaWZpY2F0aW9uLWNvZGVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6aqM6K+B56CBXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGluZ1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIui+k+WFpemqjOivgeeggVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmF1dGhDb2RlKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2hhbmdlXCI6IGZ1bmN0aW9uKGV2dCkgeyh0aGlzLmF1dGhDb2RlKSA9IGV2dC50YXJnZXQudmFsdWV9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImlwdFwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY291bnREb3duVGltZS5zZWNvbmRzP3RoaXMuY291bnREb3duVGltZS5zZWNvbmRzKydzJzon6I635Y+W6aqM6K+B56CBJyl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImdldC12ZXJpZmljYXRpb25cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJlaW5nU2VudD8nY29sb3I6ICM5OTk5OTknOicnKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInNlbmRBdXRoQ29kZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjYW52YXNcIlxuICAgICAgXSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93U3RyVmVyaWZpY2F0aW9uQ29kZT8nJzonaGVpZ2h0OiAwJyl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl5paH5a2X6aqM6K+B56CBXCIsXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3ViaW10U3RyKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiQ0lwdFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBmdW5jdGlvbihldnQpIHsodGhpcy5zdWJpbXRTdHIpID0gZXZ0LnRhcmdldC52YWx1ZX1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJjYW52YXNcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJpZFwiOiBcImN2c1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlkXCI6IFwiY3ZzXCIsXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsaWNrQ3Zhc1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImN2c1wiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJsb2dpbi1idG5cIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcInN1YmltdFwiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLnmbvlvZVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY29uc2VudFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgXCJjaGVja2VkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY29uc2VudENoZWNrZWQpfSxcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24oKSB7aWYgKEFycmF5LmlzQXJyYXkoKHRoaXMuY29uc2VudENoZWNrZWQpKSkge3JldHVybiAodGhpcy5jb25zZW50Q2hlY2tlZCkuaW5kZXhPZihudWxsKSA+IC0xfSBlbHNlIHtyZXR1cm4gKHRoaXMuY29uc2VudENoZWNrZWQpfX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2hhbmdlXCI6IFwiY2hlY2tlZFJhZGlvXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImxlZnRcIjogXCItNDZweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLli77pgInlkIzmhI9cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVybDEpfSxcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi44CK55So5oi35Y2P6K6u44CLXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWdyZWVtZW50XCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkoxcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0XCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVybDIpfSxcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi44CK6ZqQ56eB5pS/562W44CLXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWdyZWVtZW50XCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9sb2dpblxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfbG9naW5cXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjEuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
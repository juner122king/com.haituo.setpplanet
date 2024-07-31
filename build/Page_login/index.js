(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

var _system = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
    const actiParam = getApp().$def.dataApp.actiParam;
    console.log('登录请求参数123', actiParam);
    const param = {
      loginType: 'PHONE',
      code: this.authCode,
      appId: "SC_0001",
      loginAccount: this.phone,
      deviceNum: this.deviceNum,
      phone: this.phone,
      pid: 'HUAWEI',
      cid: actiParam.channelValue
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./src/Page_login/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!./src/Page_login/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux ***!
  \****************************************************************************************************************************************************************************************/
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
var $app_template$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_login/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!../../node_modules/less-loader!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_login\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_login\\index.ux!./src/Page_login/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_login/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfbG9naW5cXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBNENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL1BhZ2VfbG9naW4vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9sb2dpblxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfbG9naW4vaW5kZXgudXg/Njg5ZiIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9sb2dpbi9pbmRleC51eD84Mjc0Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9sb2dpbi9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJsb2dpbi1wYWdlXCI+XG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLXRpdGxlXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImhlYWRpbmdcIj7mrKLov47mnaXliLB7e2FwcG5hbWV9fTwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwic3ViaGVhZFwiPuS9v+eUqOaJi+acuuWPt+W/q+aNt+eZu+W9le+8jOS6q+WPl+abtOWkmuS4k+Wxnuadg+ebijwvdGV4dD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGhvbmUtbnVtXCI+XG4gICAgICA8dGV4dD7miYvmnLrlj7c8L3RleHQ+XG4gICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmiYvmnLrlj7dcIiBtb2RlbDp2YWx1ZT1cInt7cGhvbmV9fVwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlwdFwiPjwvaW5wdXQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidmVyaWZpY2F0aW9uLWNvZGVcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiaGVhZGluZ1wiPumqjOivgeeggTwvdGV4dD5cbiAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIui+k+WFpemqjOivgeeggVwiIG1vZGVsOnZhbHVlPVwie3thdXRoQ29kZX19XCIgY2xhc3M9XCJpcHRcIj48L2lucHV0PlxuICAgICAgPHRleHQgY2xhc3M9XCJnZXQtdmVyaWZpY2F0aW9uXCIgc3R5bGU9XCJ7e2JlaW5nU2VudD8gJ2NvbG9yOiAjOTk5OTk5JzonJ319XCIgQGNsaWNrPVwic2VuZEF1dGhDb2RlXCI+e3tjb3VudERvd25UaW1lLnNlY29uZHM/Y291bnREb3duVGltZS5zZWNvbmRzICsgJ3MnOifojrflj5bpqozor4HnoIEnfX08L3RleHQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY2FudmFzXCIgc3R5bGU9XCJ7e3Nob3dTdHJWZXJpZmljYXRpb25Db2RlPycnOidoZWlnaHQ6IDAnfX1cIj5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImNhbnZhc1wiIGlmPVwie3t0cnVlfX1cIiA+IC0tPlxuICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5paH5a2X6aqM6K+B56CBXCIgY2xhc3M9XCJDSXB0XCIgbW9kZWw6dmFsdWU9XCJ7e3N1YmltdFN0cn19XCIgLz5cbiAgICAgIDxjYW52YXMgaWQ9XCJjdnNcIiBAY2xpY2s9XCJjbGlja0N2YXNcIiBjbGFzcz1cImN2c1wiPjwvY2FudmFzPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLWJ0blwiIEBjbGljaz1cInN1YmltdFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0eHRcIj7nmbvlvZU8L3RleHQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29uc2VudFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ7e2NvbnNlbnRDaGVja2VkfX1cIiBtb2RlbDp2YWx1ZT1cInt7Y29uc2VudENoZWNrZWR9fVwiIEBjaGFuZ2U9XCJjaGVja2VkUmFkaW9cIj48L2lucHV0PlxuICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6IC00NnB4XCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiZGVmYXVsdFwiPuWLvumAieWQjOaEjzwvdGV4dD5cbiAgICAgICAgPGEgaHJlZj1cInt7dXJsMX19XCIgY2xhc3M9XCJhZ3JlZW1lbnRcIj7jgIrnlKjmiLfljY/orq7jgIs8L2E+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiZGVmYXVsdFwiPuWSjDwvdGV4dD5cbiAgICAgICAgPGEgaHJlZj1cInt7dXJsMn19XCIgY2xhc3M9XCJhZ3JlZW1lbnRcIj7jgIrpmpDnp4HmlL/nrZbjgIs8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cbiAgQGltcG9ydCBcIi4vaW5kZXgubGVzc1wiO1xuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0ICRkZXZpY2UgZnJvbSAnQHN5c3RlbS5kZXZpY2UnXG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByaXZhdGU6IHtcbiAgICAgIGFwcG5hbWU6ICcnLFxuICAgICAgdXJsMTogJycsXG4gICAgICB1cmwyOiAnJyxcbiAgICAgIGNvbnNlbnRDaGVja2VkOiBmYWxzZSxcbiAgICAgIGF1dGhDb2RlOiAnJyxcbiAgICAgIHBob25lOiBcIlwiLFxuICAgICAgZGV2aWNlTnVtOiAnMTIzMTIzJyxcbiAgICAgIGNvdW50RG93bkRhdGE6IHtcbiAgICAgICAgaXNGb3JtYXQ6IGZhbHNlLFxuICAgICAgICBuYW1lOiBcImNvdW50RG93blRpbWVcIixcbiAgICAgICAgdG90YWxTZWNvbmRzOiA2MFxuICAgICAgfSxcbiAgICAgIGNvdW50RG93blRpbWU6IHtcbiAgICAgICAgbWludXRlOiAwLFxuICAgICAgICBzZWNvbmRzOiAwXG4gICAgICB9LFxuICAgICAgdGltZXI6IG51bGwsXG4gICAgICBiZWluZ1NlbnQ6IGZhbHNlLFxuICAgICAgc3RyVmVyaWZpY2F0aW9uQ29kZTogXCJcIixcbiAgICAgIHN1YmltdFN0cjogXCJcIixcbiAgICAgIHNob3dTdHJWZXJpZmljYXRpb25Db2RlOiBmYWxzZVxuICAgIH0sXG4gICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnVybDEgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVybDI7XG4gICAgICB0aGlzLnVybDIgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnVybDM7XG4gICAgICB0aGlzLmFwcG5hbWUgPSAkYXBwLmdldEluZm8oKS5uYW1lO1xuXG5cbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICAkZGV2aWNlLmdldFVzZXJJZCh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdGhhdC5kZXZpY2VOdW0gPSBkYXRhLnVzZXJJZDtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGRhdGEsIGNvZGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxpbmcgZmFpbCwgY29kZSA9ICcgKyBjb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuXG5cblxuXG4gICAgfSxcbiAgICBjaGVja2VkUmFkaW86IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLmNvbnNlbnRDaGVja2VkID0gZS5jaGVja2VkXG4gICAgfSxcbiAgICBzZW5kQXV0aENvZGU6ICR1dGlscy50aHJvdHRsZShmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBpZiAoIXRoaXMucGhvbmUpIHtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6ICfor7fovpPlhaXmiYvmnLrlj7cnLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdGVzdFBob25lID0gdGhpcy5pc1ZhbGlkUGhvbmVOdW1iZXIodGhpcy5waG9uZSlcbiAgICAgIGlmICghdGVzdFBob25lKSB7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiAn5omL5py65Y+356CB5qC85byP5LiN5q2j56GuJyxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJlaW5nU2VudCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0clZlcmlmaWNhdGlvbkNvZGUgJiYgKHRoaXMuc3RyVmVyaWZpY2F0aW9uQ29kZSAhPT0gdGhpcy5zdWJpbXRTdHIpKSB7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiAn6aqM6K+B56CB5qC85byP5LiN5q2j56GuJyxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgICRhcGlzLnVzZXIucG9zdFNlbmRDb2RlKHtcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6ICflt7Llj5HpgIEnLFxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKCfmn6XnnIvnn63kv6Hpqozor4HnoIEnLCByZXMpO1xuICAgICAgICB0aGlzLmJlaW5nU2VudCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKVxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgNTAwMCksXG4gICAgc3ViaW10OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmICghdGhpcy5waG9uZSB8fCAhdGhpcy5hdXRoQ29kZSkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYCR7dGhpcy5waG9uZSA/ICfor7fovpPlhaXpqozor4HnoIEnIDogJ+ivt+i+k+WFpeaJi+acuuWPtyd9YCxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jb25zZW50Q2hlY2tlZCkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYOivt+WQjOaEj+WNj+iurmAsXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cblxuICAgICAgY29uc3QgYWN0aVBhcmFtID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbVxuXG4gICAgICBjb25zb2xlLmxvZygn55m75b2V6K+35rGC5Y+C5pWwMTIzJywgYWN0aVBhcmFtKTtcblxuICAgICAgY29uc3QgcGFyYW0gPSB7XG4gICAgICAgIGxvZ2luVHlwZTogJ1BIT05FJyxcbiAgICAgICAgY29kZTogdGhpcy5hdXRoQ29kZSxcbiAgICAgICAgYXBwSWQ6IFwiU0NfMDAwMVwiLFxuICAgICAgICBsb2dpbkFjY291bnQ6IHRoaXMucGhvbmUsXG4gICAgICAgIGRldmljZU51bTogdGhpcy5kZXZpY2VOdW0sXG4gICAgICAgIHBob25lOiB0aGlzLnBob25lLFxuICAgICAgICBwaWQ6ICdIVUFXRUknLFxuICAgICAgICBjaWQ6IGFjdGlQYXJhbS5jaGFubmVsVmFsdWVcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ+eZu+W9leivt+axguWPguaVsCcsIHBhcmFtKTtcbiAgICAgICRhcGlzLmV4YW1wbGUudG9Mb2dpbih7XG4gICAgICAgIC4uLnBhcmFtXG4gICAgICB9KS50aGVuKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+eZu+W9leaIkOWKn+aVsOaNricsIHJlcyk7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiAn55m75b2V5oiQ5YqfJyxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMVxuICAgICAgICB9KVxuXG4gICAgICAgICRzdG9yYWdlLmRlbGV0ZSh7XG4gICAgICAgICAga2V5OiAnQVVUSF9UT0tFTl9EQVRBJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGluZyBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICRyb3V0ZXIuYmFjaygpXG4gICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVyci5jb2RlLCAn6L+Z5piv54K55Ye76ZSZ6K+vJyk7XG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgICBtZXNzYWdlOiBKU09OLnBhcnNlKGVycikubWVzc2FnZSxcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgIH0sXG4gICAgc3RhcnRDb3VudERvd24oKSB7XG4gICAgICAkdXRpbHMuc3RhcnRDb3VudERvd24odGhpcy5jb3VudERvd25EYXRhLCB0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5iZWluZ1NlbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb3VudERvd25UaW1lID0ge1xuICAgICAgICAgIG1pbnV0ZTogMCxcbiAgICAgICAgICBzZWNvbmRzOiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93U3RyVmVyaWZpY2F0aW9uQ29kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xpY2tDdmFzKClcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgaXNWYWxpZFBob25lTnVtYmVyOiBmdW5jdGlvbiAocGhvbmVOdW1iZXIpIHtcbiAgICAgIGNvbnN0IHBob25lUGF0dGVybiA9IC9eKD86XFwrODYpPzFbMy05XVxcZHs5fSQvO1xuICAgICAgcmV0dXJuIHBob25lUGF0dGVybi50ZXN0KHBob25lTnVtYmVyKTtcbiAgICB9LFxuICAgIGNoYW5nZUhhbmRsZXI6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIH0sXG4gICAgLy8g55Sf5oiQW21pbixtYXgp5LmL6Ze055qE6ZqP5py65pWwXG4gICAgcmFuZG9tTnVtOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbilcbiAgICB9LFxuICAgIC8vIOeUn+aIkOmaj+acuuminOiJslxuICAgIHJhbmRvbUNvbG9yOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICAgIGxldCByID0gdGhpcy5yYW5kb21OdW0obWluLCBtYXgpXG4gICAgICBsZXQgZyA9IHRoaXMucmFuZG9tTnVtKG1pbiwgbWF4KVxuICAgICAgbGV0IGIgPSB0aGlzLnJhbmRvbU51bShtaW4sIG1heClcbiAgICAgIHJldHVybiBgcmdiKCR7cn0sJHtnfSwke2J9YDtcbiAgICB9LFxuICAgIGNsaWNrQ3ZhczogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuJGVsZW1lbnQoJ2N2cycpXG4gICAgICBjb25zb2xlLmxvZyhjYW52YXMsICfmn6XnnIvov5nkuKpjYW52YXMnKTtcbiAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgLy8g6IOM5pmv5aGr5YWF6ImyIOmaj+aculxuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucmFuZG9tQ29sb3IoNzAsIDIzMClcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCAxNTAsIDE1MClcbiAgICAgIC8vIOmaj+acuueUn+aIkOWtl+espuS4slxuICAgICAgLy8g5a2X56ym5rGgXG4gICAgICBjb25zdCBwb29sID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5J1xuICAgICAgLy8g5a2Y5YKo55Sf5oiQ55qE6ZqP5py66aqM6K+B56CBXG4gICAgICBsZXQgaW1nQ29kZSA9ICcnXG4gICAgICAvLyDnlJ/miJAgNCDkvY3pqozor4HnoIFcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBwb29sW3RoaXMucmFuZG9tTnVtKDAsIHBvb2wubGVuZ3RoKV1cbiAgICAgICAgaW1nQ29kZSArPSB0ZXh0XG4gICAgICAgIC8vIOmaj+acuuWtl+S9k+Wkp+Wwj1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMucmFuZG9tTnVtKDIyLCA4MClcbiAgICAgICAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBTaW1oZWlgXG4gICAgICAgIC8vIOiuoeeul+maj+acuuaXi+i9rOinkuW6plxuICAgICAgICBjb25zdCBkZWcgPSB0aGlzLnJhbmRvbU51bSgtMzAsIDMwKVxuICAgICAgICAvLyDorr7nva7mlofmnKzln7rnur/kuLrpobbpg6hcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnXG4gICAgICAgIC8vIOmaj+acuuWtl+S9k+minOiJslxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5yYW5kb21Db2xvcig4MCwgMTUwKVxuICAgICAgICAvLyDlsIblvZPliY3nirbmgIHlsIHlrZjlhaXmoIhcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAvLyDpmo/mnLrlgY/np7vot53nprtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSgzMCAqIGkgKyAxNSwgMTUpXG4gICAgICAgIC8vIOmaj+acuuaXi+i9rOinkuW6plxuICAgICAgICBjdHgucm90YXRlKChkZWcgKiBNYXRoLlBJKSAvIDE4MClcbiAgICAgICAgLy8g5L2N572u55u45a+55LqO5b2T5YmN54q25oCB77yM5bem5YGP56e7MTDvvIzkuIrlgY/np7sxNVxuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgLTEwLCAtMTUpXG4gICAgICAgIC8vIOaBouWkjeS5i+WJjeS/neWtmOeahOe7mOWbvueKtuaAgVxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICB9XG4gICAgICB0aGlzLnN0clZlcmlmaWNhdGlvbkNvZGUgPSBpbWdDb2RlXG4gICAgfVxuICB9XG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmxvZ2luLXBhZ2VcIjoge1xuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiNTZweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCI1NnB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAubG9naW4tdGl0bGVcIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNDRweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLXRpdGxlIC5oZWFkaW5nXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMjIyMjIyXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNjhweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLXRpdGxlIC5zdWJoZWFkXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjODA4MDgwXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiMzRweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLnBob25lLW51bVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY1NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5NnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjgwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAucGhvbmUtbnVtIHRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAucGhvbmUtbnVtIC5pcHRcIjoge1xuICAgIFwibWFyZ2luTGVmdFwiOiBcIjQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDIwcHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC52ZXJpZmljYXRpb24tY29kZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY1NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5NnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjMycHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAudmVyaWZpY2F0aW9uLWNvZGUgLmhlYWRpbmdcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAudmVyaWZpY2F0aW9uLWNvZGUgLmlwdFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjI1MHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiNDBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLnZlcmlmaWNhdGlvbi1jb2RlIC5nZXQtdmVyaWZpY2F0aW9uXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMzc4NGY5XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiM5OTk5OTlcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi1idG5cIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNDhweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MjJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzM3ODRmOVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi1idG4gLnR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjM2cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jYW52YXNcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIzMnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4OHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAuY2FudmFzIC5DSXB0XCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjE1cHhcIixcbiAgICBcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIjogXCIxNXB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZsZXhcIjogMyxcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNhbnZhcyAuY3ZzXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmNWY1ZjVcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jb25zZW50XCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI4cHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jb25zZW50IC5kZWZhdWx0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiMzRweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNvbnNlbnQgLmFncmVlbWVudFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzM2ODdGRlwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjM0cHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jb25zZW50IC5jaGVja2JveFwiOiB7XG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjJweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MnB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwibG9naW4tcGFnZVwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImxvZ2luLXRpdGxlXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICfmrKLov47mnaXliLAnKygodGhpcy5hcHBuYW1lKSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImhlYWRpbmdcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuS9v+eUqOaJi+acuuWPt+W/q+aNt+eZu+W9le+8jOS6q+WPl+abtOWkmuS4k+Wxnuadg+ebilwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN1YmhlYWRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicGhvbmUtbnVtXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaJi+acuuWPt1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeaJi+acuuWPt1wiLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnBob25lKX0sXG4gICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogZnVuY3Rpb24oZXZ0KSB7KHRoaXMucGhvbmUpID0gZXZ0LnRhcmdldC52YWx1ZX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaXB0XCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInZlcmlmaWNhdGlvbi1jb2RlXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIumqjOivgeeggVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImhlYWRpbmdcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImlucHV0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLovpPlhaXpqozor4HnoIFcIixcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hdXRoQ29kZSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBmdW5jdGlvbihldnQpIHsodGhpcy5hdXRoQ29kZSkgPSBldnQudGFyZ2V0LnZhbHVlfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpcHRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNvdW50RG93blRpbWUuc2Vjb25kcz90aGlzLmNvdW50RG93blRpbWUuc2Vjb25kcysncyc6J+iOt+WPlumqjOivgeeggScpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJnZXQtdmVyaWZpY2F0aW9uXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5iZWluZ1NlbnQ/J2NvbG9yOiAjOTk5OTk5JzonJyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzZW5kQXV0aENvZGVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2FudmFzXCJcbiAgICAgIF0sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1N0clZlcmlmaWNhdGlvbkNvZGU/Jyc6J2hlaWdodDogMCcpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeaWh+Wtl+mqjOivgeeggVwiLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN1YmltdFN0cil9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcIkNJcHRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjaGFuZ2VcIjogZnVuY3Rpb24oZXZ0KSB7KHRoaXMuc3ViaW10U3RyKSA9IGV2dC50YXJnZXQudmFsdWV9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiY2FudmFzXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJjdnNcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcImN2c1wiLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbGlja0N2YXNcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjdnNcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibG9naW4tYnRuXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJzdWJpbXRcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi55m75b2VXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidHh0XCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbnNlbnRcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIFwiY2hlY2tlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNvbnNlbnRDaGVja2VkKX0sXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uKCkge2lmIChBcnJheS5pc0FycmF5KCh0aGlzLmNvbnNlbnRDaGVja2VkKSkpIHtyZXR1cm4gKHRoaXMuY29uc2VudENoZWNrZWQpLmluZGV4T2YobnVsbCkgPiAtMX0gZWxzZSB7cmV0dXJuICh0aGlzLmNvbnNlbnRDaGVja2VkKX19XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoZWNrZWRSYWRpb1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiLTQ2cHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yu+6YCJ5ZCM5oSPXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImhyZWZcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy51cmwxKX0sXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuOAiueUqOaIt+WNj+iuruOAi1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFncmVlbWVudFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5ZKMXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImFcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImhyZWZcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy51cmwyKX0sXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuOAiumakOengeaUv+etluOAi1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFncmVlbWVudFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfbG9naW5cXFxcaW5kZXgudXghLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX2xvZ2luXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjAuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
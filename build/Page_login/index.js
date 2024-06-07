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

module.exports = {
  private: {
    consentChecked: false
  },
  checkedRadio: function (e) {
    this.consentChecked = e.checked;
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
    "marginTop": "164px",
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
            "value": "欢迎来到计步星球"
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
            "type": "number"
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
            "placeholder": "请输入手机号"
          },
          "classList": [
            "ipt"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "获取验证码"
          },
          "classList": [
            "get-verification"
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
          "type": "text",
          "attr": {
            "value": "勾选同意"
          },
          "classList": [
            "default"
          ]
        },
        {
          "type": "text",
          "attr": {
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
          "type": "text",
          "attr": {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfbG9naW5cXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL1BhZ2VfbG9naW4vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9sb2dpblxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfbG9naW4vaW5kZXgudXg/MjQ0MCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9sb2dpbi9pbmRleC51eD9iMmI2Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9sb2dpbi9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJsb2dpbi1wYWdlXCI+XG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLXRpdGxlXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImhlYWRpbmdcIj7mrKLov47mnaXliLDorqHmraXmmJ/nkIM8L3RleHQ+XG4gICAgICA8dGV4dCBjbGFzcz1cInN1YmhlYWRcIj7kvb/nlKjmiYvmnLrlj7flv6vmjbfnmbvlvZXvvIzkuqvlj5fmm7TlpJrkuJPlsZ7mnYPnm4o8L3RleHQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBob25lLW51bVwiPlxuICAgICAgPHRleHQ+5omL5py65Y+3PC90ZXh0PlxuICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5omL5py65Y+3XCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaXB0XCI+PC9pbnB1dD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ2ZXJpZmljYXRpb24tY29kZVwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJoZWFkaW5nXCI+6aqM6K+B56CBPC90ZXh0PlxuICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5omL5py65Y+3XCIgY2xhc3M9XCJpcHRcIj48L2lucHV0PlxuICAgICAgPHRleHQgY2xhc3M9XCJnZXQtdmVyaWZpY2F0aW9uXCI+6I635Y+W6aqM6K+B56CBPC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJsb2dpbi1idG5cIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+55m75b2VPC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnNlbnRcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwie3tjb25zZW50Q2hlY2tlZH19XCIgbW9kZWw6dmFsdWU9XCJ7e2NvbnNlbnRDaGVja2VkfX1cIiBAY2hhbmdlPVwiY2hlY2tlZFJhZGlvXCI+PC9pbnB1dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiZGVmYXVsdFwiPuWLvumAieWQjOaEjzwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiYWdyZWVtZW50XCI+44CK55So5oi35Y2P6K6u44CLPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJkZWZhdWx0XCI+5ZKMPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJhZ3JlZW1lbnRcIj7jgIrpmpDnp4HmlL/nrZbjgIs8L3RleHQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIEBpbXBvcnQgXCIuL2luZGV4Lmxlc3NcIjtcbjwvc3R5bGU+XG48IS0tIDxpbXBvcnQgbmFtZT1cIm15LXJhZGlvXCIgc3JjPVwiYXBleC11aS9jb21wb25lbnRzL3JhZGlvL2luZGV4XCI+PC9pbXBvcnQ+IC0tPlxuXG48c2NyaXB0PlxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcml2YXRlOiB7XG4gICAgICBjb25zZW50Q2hlY2tlZDogZmFsc2VcbiAgICB9LFxuICAgIGNoZWNrZWRSYWRpbzogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMuY29uc2VudENoZWNrZWQgPSBlLmNoZWNrZWRcbiAgICB9XG4gIH1cbjwvc2NyaXB0PiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIubG9naW4tcGFnZVwiOiB7XG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1NnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjU2cHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi10aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxNjRweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLXRpdGxlIC5oZWFkaW5nXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMjIyMjIyXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNjhweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmxvZ2luLXRpdGxlIC5zdWJoZWFkXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjODA4MDgwXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiMzRweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLnBob25lLW51bVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY1NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5NnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjgwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAucGhvbmUtbnVtIHRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAucGhvbmUtbnVtIC5pcHRcIjoge1xuICAgIFwibWFyZ2luTGVmdFwiOiBcIjQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDIwcHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC52ZXJpZmljYXRpb24tY29kZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY1NHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5NnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjVmNWY1XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2NHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjMycHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAudmVyaWZpY2F0aW9uLWNvZGUgLmhlYWRpbmdcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNjAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0NHB4XCJcbiAgfSxcbiAgXCIubG9naW4tcGFnZSAudmVyaWZpY2F0aW9uLWNvZGUgLmlwdFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjI1MHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiNDBweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLnZlcmlmaWNhdGlvbi1jb2RlIC5nZXQtdmVyaWZpY2F0aW9uXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMzc4NGY5XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyTGVmdFN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlckxlZnRDb2xvclwiOiBcIiM5OTk5OTlcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi1idG5cIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNDhweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MjJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODhweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzM3ODRmOVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTZweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5sb2dpbi1idG4gLnR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjM2cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI3MDBcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jb25zZW50XCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjI4cHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5sb2dpbi1wYWdlIC5jb25zZW50IC5kZWZhdWx0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjRweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiMzRweFwiXG4gIH0sXG4gIFwiLmxvZ2luLXBhZ2UgLmNvbnNlbnQgLmFncmVlbWVudFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzM2ODdGRlwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjM0cHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJsb2dpbi1wYWdlXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwibG9naW4tdGl0bGVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5qyi6L+O5p2l5Yiw6K6h5q2l5pif55CDXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGluZ1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5L2/55So5omL5py65Y+35b+r5o2355m75b2V77yM5Lqr5Y+X5pu05aSa5LiT5bGe5p2D55uKXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwic3ViaGVhZFwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJwaG9uZS1udW1cIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5omL5py65Y+3XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInBsYWNlaG9sZGVyXCI6IFwi6K+36L6T5YWl5omL5py65Y+3XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpcHRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidmVyaWZpY2F0aW9uLWNvZGVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6aqM6K+B56CBXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiaGVhZGluZ1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeaJi+acuuWPt1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImlwdFwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6I635Y+W6aqM6K+B56CBXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZ2V0LXZlcmlmaWNhdGlvblwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJsb2dpbi1idG5cIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi55m75b2VXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidHh0XCJcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbnNlbnRcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW5wdXRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIFwiY2hlY2tlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNvbnNlbnRDaGVja2VkKX0sXG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uKCkge2lmIChBcnJheS5pc0FycmF5KCh0aGlzLmNvbnNlbnRDaGVja2VkKSkpIHtyZXR1cm4gKHRoaXMuY29uc2VudENoZWNrZWQpLmluZGV4T2YobnVsbCkgPiAtMX0gZWxzZSB7cmV0dXJuICh0aGlzLmNvbnNlbnRDaGVja2VkKX19XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoZWNrZWRSYWRpb1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yu+6YCJ5ZCM5oSPXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi44CK55So5oi35Y2P6K6u44CLXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYWdyZWVtZW50XCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLlkoxcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJkZWZhdWx0XCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLjgIrpmpDnp4HmlL/nrZbjgItcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJhZ3JlZW1lbnRcIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcUGFnZV9sb2dpblxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfbG9naW5cXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjEuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
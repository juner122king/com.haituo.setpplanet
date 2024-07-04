(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/feedback/index.ux":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/feedback/index.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = {
  onInit() {
    this.$page.setTitleBar({
      text: '举报反馈'
    });
  },
  private: {
    txt: "",
    selectTagData: {
      id: 1,
      tag: '广告太多'
    },
    phone: "",
    tagList: [{
      id: 1,
      tag: '广告太多'
    }, {
      id: 2,
      tag: '无法正常使用'
    }, {
      id: 3,
      tag: '其他问题'
    }]
  },
  changeTxt: function (e) {
    this.txt = e.value;
  },
  changeCheckedNum: function (e) {
    console.log(e, '查看数据');
    this.selectTagData = e;
  },
  submit: function () {
    if (!this.phone) {
      $prompt.showToast({
        message: "请填写联系方式",
        gravity: 'center'
      });
      return;
    }
    if (this.txt.length < 10) {
      $prompt.showToast({
        message: "描述字数不足",
        gravity: 'center'
      });
      return;
    }
    const param = {
      tag: this.selectTagData.tag,
      content: this.txt,
      contactPhone: this.phone
    };
    console.log('查看提交数据', param);
    $apis.user.postUserFeedback(_objectSpread({}, param)).then(res => {
      $prompt.showToast({
        message: "提交成功",
        gravity: 'center'
      });
      this.selectTagData = this.tagList[0];
      this.phone = '';
      this.txt = '';
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\feedback\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\feedback\\index.ux!./src/feedback/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\feedback\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\feedback\index.ux!./src/feedback/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".feedback-page": {
    "width": "100%",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px",
    "flexDirection": "column"
  },
  ".feedback-page .feedback-top": {
    "alignItems": "center",
    "marginTop": "44px"
  },
  ".feedback-page .feedback-top image": {
    "width": "120px",
    "height": "120px"
  },
  ".feedback-page .feedback-top .right": {
    "flexDirection": "column",
    "marginLeft": "28px"
  },
  ".feedback-page .feedback-top .right .txt": {
    "fontSize": "28px",
    "fontWeight": "400",
    "color": "#666666",
    "lineHeight": "40px"
  },
  ".feedback-page .feedback-top .right .phone": {
    "fontSize": "40px",
    "fontWeight": "600",
    "color": "#4d4d4d",
    "lineHeight": "56px"
  },
  ".feedback-page .cause": {
    "flexDirection": "column",
    "marginTop": "48px"
  },
  ".feedback-page .cause .title": {
    "fontSize": "28px",
    "lineHeight": "40px"
  },
  ".feedback-page .cause .title text": {
    "fontWeight": "bold",
    "color": "#4d4d4d"
  },
  ".feedback-page .cause .selector-list": {
    "marginTop": "20px",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  ".feedback-page .cause .selector-list .selector-item": {
    "width": "214px",
    "height": "64px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#e6e6e6",
    "borderRightColor": "#e6e6e6",
    "borderBottomColor": "#e6e6e6",
    "borderLeftColor": "#e6e6e6",
    "borderRadius": "112px",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".feedback-page .cause .selector-list .selector-item text": {
    "color": "#999999"
  },
  ".feedback-page .cause .selector-list .a-selector-item": {
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderStyle": "solid",
    "borderTopColor": "#3784f9",
    "borderRightColor": "#3784f9",
    "borderBottomColor": "#3784f9",
    "borderLeftColor": "#3784f9"
  },
  ".feedback-page .cause .selector-list .a-selector-item text": {
    "color": "#3784f9"
  },
  ".feedback-page .issue": {
    "marginTop": "48px",
    "flexDirection": "column"
  },
  ".feedback-page .issue .title": {
    "fontSize": "28px",
    "lineHeight": "40px"
  },
  ".feedback-page .issue .title text": {
    "fontWeight": "bold",
    "color": "#4d4d4d"
  },
  ".feedback-page .issue .content": {
    "width": "686px",
    "height": "200px",
    "backgroundColor": "#f7f7f7",
    "borderRadius": "16px",
    "marginTop": "20px",
    "paddingTop": "32px",
    "paddingRight": "32px",
    "paddingBottom": "32px",
    "paddingLeft": "32px"
  },
  ".feedback-page .issue .content .txt": {
    "fontSize": "26px",
    "color": "#b3b3b3"
  },
  ".feedback-page .issue .bottom": {
    "justifyContent": "flex-end"
  },
  ".feedback-page .issue .bottom text": {
    "marginTop": "8px",
    "color": "#b3b3b3"
  },
  ".feedback-page .contactWay": {
    "marginTop": "48px",
    "flexDirection": "column"
  },
  ".feedback-page .contactWay .title text": {
    "fontSize": "28px",
    "fontWeight": "bold",
    "color": "#4d4d4d"
  },
  ".feedback-page .contactWay .content": {
    "width": "686px",
    "height": "84px",
    "backgroundColor": "#f7f7f7",
    "borderRadius": "16px",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px",
    "marginTop": "20px",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".feedback-page .contactWay .content .ipt": {
    "backgroundColor": "#f7f7f7",
    "fontSize": "26px",
    "color": "#b3b3b3",
    "flex": 1,
    "height": "100%"
  },
  ".feedback-page .submit": {
    "width": "686px",
    "height": "88px",
    "backgroundColor": "#3784f9",
    "borderRadius": "16px",
    "justifyContent": "center",
    "alignItems": "center",
    "marginTop": "48px"
  },
  ".feedback-page .submit .txt": {
    "fontSize": "32px",
    "fontWeight": "500",
    "color": "#ffffff",
    "lineHeight": "44px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/feedback/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/feedback/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "feedback-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "feedback-top"
      ],
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/service.png"
          }
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "right"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "快应用投诉热线"
              },
              "classList": [
                "txt"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": "400-888-8888"
              },
              "classList": [
                "phone"
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
        "cause"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "title"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "选择投诉原因"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "selector-list"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": function () {return ['selector-item', (this.selectTagData.id===this.$item.id?'a-selector-item':'')]},
              "events": {
                "click": function(evt){this.changeCheckedNum(this.$item,evt)}
              },
              "repeat": function () {return (this.tagList)},
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.$item.tag)}
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
        "issue"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "title"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "问题描述"
              }
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
              "type": "textarea",
              "attr": {
                "value": function () {return (this.txt)},
                "placeholder": "请填写10字以上的详细描述,以便我们提供更好的服务和帮助...",
                "maxlength": "300"
              },
              "events": {
                "change": "changeTxt"
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
            "bottom"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return '已输入'+((this.txt.length>=300?300:this.txt.length))+'/300'}
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
        "contactWay"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "title"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "联系方式"
              }
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
              "type": "input",
              "attr": {
                "placeholder": "请输入您的手机号码/邮箱",
                "value": function () {return (this.phone)}
              },
              "events": {
                "change": function(evt) {(this.phone) = evt.target.value}
              },
              "classList": [
                "ipt"
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
        "submit"
      ],
      "events": {
        "click": "submit"
      },
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "提交投诉"
          },
          "classList": [
            "txt"
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
/*!*******************************!*\
  !*** ./src/feedback/index.ux ***!
  \*******************************/
var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/feedback/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\feedback\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\feedback\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\feedback\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/less-loader/dist/cjs.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\feedback\\index.ux!./src/feedback/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/feedback/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGZlZWRiYWNrXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOENBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZmVlZGJhY2svZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcZmVlZGJhY2tcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9mZWVkYmFjay9pbmRleC51eD9jMzY2Iiwid2VicGFjazovLy8uL3NyYy9mZWVkYmFjay9pbmRleC51eD8xZDcyIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvZmVlZGJhY2svaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZmVlZGJhY2stcGFnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJmZWVkYmFjay10b3BcIj5cbiAgICAgIDxpbWFnZSBzcmM9XCIvQ29tbW9uL2ltZy9zZXJ2aWNlLnBuZ1wiPjwvaW1hZ2U+XG4gICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJ0eHRcIj7lv6vlupTnlKjmipXor4nng63nur88L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwicGhvbmVcIj40MDAtODg4LTg4ODg8L3RleHQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjYXVzZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+PHRleHQgPumAieaLqeaKleivieWOn+WboDwvdGV4dD48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Rvci1saXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Rvci1pdGVtIHt7c2VsZWN0VGFnRGF0YS5pZCA9PT0gJGl0ZW0uaWQgPydhLXNlbGVjdG9yLWl0ZW0nOicnfX1cIiBAY2xpY2s9XCJjaGFuZ2VDaGVja2VkTnVtKCRpdGVtKVwiIGZvcj1cInt7dGFnTGlzdH19XCI+PHRleHQgPnt7JGl0ZW0udGFnfX08L3RleHQ+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJpc3N1ZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+PHRleHQgPumXrumimOaPj+i/sDwvdGV4dD48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgIDx0ZXh0YXJlYSBtb2RlbDp2YWx1ZT1cInt7dHh0fX1cIiBjbGFzcz1cInR4dFwiIEBjaGFuZ2U9XCJjaGFuZ2VUeHRcIiBwbGFjZWhvbGRlcj1cIuivt+Whq+WGmTEw5a2X5Lul5LiK55qE6K+m57uG5o+P6L+wLOS7peS+v+aIkeS7rOaPkOS+m+abtOWlveeahOacjeWKoeWSjOW4ruWKqS4uLlwiIG1heGxlbmd0aD1cIjMwMFwiPjwvdGV4dGFyZWE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJib3R0b21cIj5cbiAgICAgICAgPHRleHQ+5bey6L6T5YWle3t0eHQubGVuZ3RoPj0zMDA/MzAwOnR4dC5sZW5ndGh9fS8zMDA8L3RleHQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb250YWN0V2F5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPHRleHQ+6IGU57O75pa55byPPC90ZXh0PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmgqjnmoTmiYvmnLrlj7fnoIEv6YKu566xXCIgbW9kZWw6dmFsdWU9XCJ7e3Bob25lfX1cIiBjbGFzcz1cImlwdFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJzdWJtaXRcIiBAY2xpY2s9XCJzdWJtaXRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+5o+Q5Lqk5oqV6K+JPC90ZXh0PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuICBAaW1wb3J0IFwiLi9pbmRleC5sZXNzXCI7XG48L3N0eWxlPlxuPHNjcmlwdD5cbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICBvbkluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLiRwYWdlLnNldFRpdGxlQmFyKHsgdGV4dDogJ+S4vuaKpeWPjemmiCcgfSlcbiAgICAgICAgfSxcbiAgICBwcml2YXRlOiB7XG4gICAgICB0eHQ6IFwiXCIsXG4gICAgICBzZWxlY3RUYWdEYXRhOiB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0YWc6ICflub/lkYrlpKrlpJonXG4gICAgICB9LFxuICAgICAgcGhvbmU6IFwiXCIsXG4gICAgICB0YWdMaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICB0YWc6ICflub/lkYrlpKrlpJonXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBpZDogMixcbiAgICAgICAgICB0YWc6ICfml6Dms5XmraPluLjkvb/nlKgnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBpZDogMyxcbiAgICAgICAgICB0YWc6ICflhbbku5bpl67popgnXG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfSxcbiAgICBjaGFuZ2VUeHQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLnR4dCA9IGUudmFsdWVcbiAgICB9LFxuICAgIGNoYW5nZUNoZWNrZWROdW06IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLCAn5p+l55yL5pWw5o2uJyk7XG4gICAgICB0aGlzLnNlbGVjdFRhZ0RhdGEgPSBlXG4gICAgfSxcbiAgICBzdWJtaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5waG9uZSkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogXCLor7floavlhpnogZTns7vmlrnlvI9cIixcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnR4dC5sZW5ndGggPCAxMCkge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogXCLmj4/ov7DlrZfmlbDkuI3otrNcIixcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICB0YWc6IHRoaXMuc2VsZWN0VGFnRGF0YS50YWcsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMudHh0LFxuICAgICAgICBjb250YWN0UGhvbmU6IHRoaXMucGhvbmVcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCfmn6XnnIvmj5DkuqTmlbDmja4nLCBwYXJhbSk7XG5cblxuICAgICAgJGFwaXMudXNlci5wb3N0VXNlckZlZWRiYWNrKHtcbiAgICAgICAgLi4ucGFyYW1cbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogXCLmj5DkuqTmiJDlip9cIixcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNlbGVjdFRhZ0RhdGEgPSB0aGlzLnRhZ0xpc3RbMF07XG4gICAgICAgIHRoaXMucGhvbmUgPSAnJztcbiAgICAgICAgdGhpcy50eHQgPSAnJ1xuXG4gICAgICB9KVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5mZWVkYmFjay1wYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMzJweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIzMnB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuZmVlZGJhY2stdG9wXCI6IHtcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjQ0cHhcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5mZWVkYmFjay10b3AgaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMjBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTIwcHhcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5mZWVkYmFjay10b3AgLnJpZ2h0XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcIm1hcmdpbkxlZnRcIjogXCIyOHB4XCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuZmVlZGJhY2stdG9wIC5yaWdodCAudHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjQwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNDBweFwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmZlZWRiYWNrLXRvcCAucmlnaHQgLnBob25lXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDBweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjNGQ0ZDRkXCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNTZweFwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNhdXNlXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjQ4cHhcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5jYXVzZSAudGl0bGVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJsaW5lSGVpZ2h0XCI6IFwiNDBweFwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNhdXNlIC50aXRsZSB0ZXh0XCI6IHtcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJjb2xvclwiOiBcIiM0ZDRkNGRcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5jYXVzZSAuc2VsZWN0b3ItbGlzdFwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5jYXVzZSAuc2VsZWN0b3ItbGlzdCAuc2VsZWN0b3ItaXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIxNHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI2NHB4XCIsXG4gICAgXCJib3JkZXJUb3BXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyUmlnaHRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckxlZnRXaWR0aFwiOiBcIjJweFwiLFxuICAgIFwiYm9yZGVyU3R5bGVcIjogXCJzb2xpZFwiLFxuICAgIFwiYm9yZGVyVG9wQ29sb3JcIjogXCIjZTZlNmU2XCIsXG4gICAgXCJib3JkZXJSaWdodENvbG9yXCI6IFwiI2U2ZTZlNlwiLFxuICAgIFwiYm9yZGVyQm90dG9tQ29sb3JcIjogXCIjZTZlNmU2XCIsXG4gICAgXCJib3JkZXJMZWZ0Q29sb3JcIjogXCIjZTZlNmU2XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxMTJweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5jYXVzZSAuc2VsZWN0b3ItbGlzdCAuc2VsZWN0b3ItaXRlbSB0ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNhdXNlIC5zZWxlY3Rvci1saXN0IC5hLXNlbGVjdG9yLWl0ZW1cIjoge1xuICAgIFwiYm9yZGVyVG9wV2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclJpZ2h0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlckJvdHRvbVdpZHRoXCI6IFwiMnB4XCIsXG4gICAgXCJib3JkZXJMZWZ0V2lkdGhcIjogXCIycHhcIixcbiAgICBcImJvcmRlclN0eWxlXCI6IFwic29saWRcIixcbiAgICBcImJvcmRlclRvcENvbG9yXCI6IFwiIzM3ODRmOVwiLFxuICAgIFwiYm9yZGVyUmlnaHRDb2xvclwiOiBcIiMzNzg0ZjlcIixcbiAgICBcImJvcmRlckJvdHRvbUNvbG9yXCI6IFwiIzM3ODRmOVwiLFxuICAgIFwiYm9yZGVyTGVmdENvbG9yXCI6IFwiIzM3ODRmOVwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNhdXNlIC5zZWxlY3Rvci1saXN0IC5hLXNlbGVjdG9yLWl0ZW0gdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMzNzg0ZjlcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5pc3N1ZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0OHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuaXNzdWUgLnRpdGxlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjQwcHhcIlxuICB9LFxuICBcIi5mZWVkYmFjay1wYWdlIC5pc3N1ZSAudGl0bGUgdGV4dFwiOiB7XG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjNGQ0ZDRkXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuaXNzdWUgLmNvbnRlbnRcIjoge1xuICAgIFwid2lkdGhcIjogXCI2ODZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMjAwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmN2Y3ZjdcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMzJweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIzMnB4XCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuaXNzdWUgLmNvbnRlbnQgLnR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI2cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2IzYjNiM1wiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmlzc3VlIC5ib3R0b21cIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmlzc3VlIC5ib3R0b20gdGV4dFwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCI4cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2IzYjNiM1wiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNvbnRhY3RXYXlcIjoge1xuICAgIFwibWFyZ2luVG9wXCI6IFwiNDhweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmZlZWRiYWNrLXBhZ2UgLmNvbnRhY3RXYXkgLnRpdGxlIHRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiY29sb3JcIjogXCIjNGQ0ZDRkXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuY29udGFjdFdheSAuY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY4NnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4NHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjdmN2Y3XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNnB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIzMnB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjMycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuY29udGFjdFdheSAuY29udGVudCAuaXB0XCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmN2Y3ZjdcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMjZweFwiLFxuICAgIFwiY29sb3JcIjogXCIjYjNiM2IzXCIsXG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuc3VibWl0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjg2cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjg4cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMzNzg0ZjlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE2cHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0OHB4XCJcbiAgfSxcbiAgXCIuZmVlZGJhY2stcGFnZSAuc3VibWl0IC50eHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNTAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImxpbmVIZWlnaHRcIjogXCI0NHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiZmVlZGJhY2stcGFnZVwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImZlZWRiYWNrLXRvcFwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL3NlcnZpY2UucG5nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJyaWdodFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlv6vlupTnlKjmipXor4nng63nur9cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIjQwMC04ODgtODg4OFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInBob25lXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2F1c2VcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGl0bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6YCJ5oup5oqV6K+J5Y6f5ZugXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInNlbGVjdG9yLWxpc3RcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWydzZWxlY3Rvci1pdGVtJywgKHRoaXMuc2VsZWN0VGFnRGF0YS5pZD09PXRoaXMuJGl0ZW0uaWQ/J2Etc2VsZWN0b3ItaXRlbSc6JycpXX0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5jaGFuZ2VDaGVja2VkTnVtKHRoaXMuJGl0ZW0sZXZ0KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50YWdMaXN0KX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50YWcpfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaXNzdWVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGl0bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6Zeu6aKY5o+P6L+wXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImNvbnRlbnRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRhcmVhXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnR4dCl9LFxuICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7floavlhpkxMOWtl+S7peS4iueahOivpue7huaPj+i/sCzku6Xkvr/miJHku6zmj5Dkvpvmm7Tlpb3nmoTmnI3liqHlkozluK7liqkuLi5cIixcbiAgICAgICAgICAgICAgICBcIm1heGxlbmd0aFwiOiBcIjMwMFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNoYW5nZVwiOiBcImNoYW5nZVR4dFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJib3R0b21cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ+W3sui+k+WFpScrKCh0aGlzLnR4dC5sZW5ndGg+PTMwMD8zMDA6dGhpcy50eHQubGVuZ3RoKSkrJy8zMDAnfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb250YWN0V2F5XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRpdGxlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuiBlOezu+aWueW8j1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjb250ZW50XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7fovpPlhaXmgqjnmoTmiYvmnLrlj7fnoIEv6YKu566xXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnBob25lKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2hhbmdlXCI6IGZ1bmN0aW9uKGV2dCkgeyh0aGlzLnBob25lKSA9IGV2dC50YXJnZXQudmFsdWV9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImlwdFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInN1Ym1pdFwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwic3VibWl0XCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuaPkOS6pOaKleiviVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxmZWVkYmFja1xcXFxpbmRleC51eCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGZlZWRiYWNrXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2luZGV4JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4xLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
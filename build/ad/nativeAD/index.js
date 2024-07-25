(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/nativeAD/index.ux?uxType=page":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/nativeAD/index.ux?uxType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
let nativeAd;
module.exports = {
  props: {
    showTclayer: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: {
    componentName: "ad",
    provider: "",
    hasAdList: false,
    adList: [],
    defaultAd: {
      desc: 'vivo流量联盟，提供最优质的商业化解决方案。流量联盟广告联盟。',
      title: 'vivo流量联盟',
      icon: '广告',
      clickBtnTxt: '立即打开'
    },
    native: {
      adUnitId: "",
      isShow: false,
      adData: {},
      isShowImg: true,
      isShowVideo: true,
      isShowData: true,
      errStr: "",
      btnTxt: "",
      adImgSrc: "",
      adVideoSrc: ""
    }
  },
  onInit() {
    this.native.adUnitId = this.$app.$def.dataApp.nativeAdUnitId;
  },
  async onReady(options) {
    console.info("native ad onReady");
    this.showNativeAd2();
  },
  onShow(options) {
    if (this.native.isShow) {
      this.reportNativeShow();
    }
  },
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  showNativeAd2() {
    let adParams = {
      adUnitId: this.native.adUnitId,
      type: 'native'
    };
    $ad.preloadAd(_objectSpread(_objectSpread({}, adParams), {}, {
      success: data => {
        try {
          this.adList = data.adList;
          this.native.isShow = true;
        } catch (e) {
          console.log(e);
        }
      },
      fail: (data, code) => {
        try {
          if (code === 205) {
            this.adList = data.adList;
            this.native.isShow = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }));
  },
  reportNativeClick() {
    console.info(" 原生广告被点击了");
    $utils.getConvertUpload(this);
    this.showTclayer = false;
  },
  listenNativeAdDownloadStatus(downloadstatus) {
    if (downloadstatus === "INSTALLED") {
      this.native.btnTxt = "OPEN";
    }
  },
  removeAdListen: function () {
    if (nativeAd) {
      nativeAd.offDownloadProgress();
      nativeAd.offError(() => {
        console.log("nativeAd offError");
      });
      nativeAd.offLoad(() => {
        console.log("nativeAd offLoad");
      });
      nativeAd.offStatusChanged();
    }
  },
  onDestroy() {},
  closeAd: function () {
    this.native.isShow = false;
  },
  completeAdRSA() {
    console.log('点击拆福袋');
    $umeng_stat.trackEvent('xyfddhj_chai', '点击');
    if (!this.native.isShow) {
      console.log('广告展示不成功,拆红包不成功');
      $prompt.showToast({
        message: '拆红包失败！请重试',
        gravity: 'center'
      });
      this.$emit('emitClose');
      return;
    }
    var adType = 'NATIVE';
    var adId = this.native.adUnitId;
    var channel = this.$app.$def.dataApp.channel;
    var countMax = this.$app.$def.dataApp.countMax;
    var brand = this.$app.$def.dataApp.brand;
    const params = {
      adType,
      adId,
      channel,
      countMax,
      brand
    };
    $apis.example.completeAdRSA(params).then(res => {
      console.log(`完成广告----------> jumpLink:${res.data.jumpLink}, 完成次数：${res.data.count} 当次奖励：${res.data.awardAmount}`);
      if (res.data.jumpLink) {
        $router.push({
          uri: res.data.jumpLink
        });
      } else {
        var mes = '';
        if (res.data.awardAmount) {
          mes = '恭喜获得0.01元红包';
        } else {
          if (res.data.count > 8) {
            mes = '今天活动次数已用完';
          } else {
            mes = '再来一次';
          }
        }
        $prompt.showToast({
          message: mes,
          gravity: 'center'
        });
      }
      this.$emit('emitEvt', {
        count: res.data.count
      });
    }).catch(err => {
      console.log(err, '点击拆福袋错误');
      $prompt.showToast({
        message: JSON.parse(err).message,
        gravity: 'center'
      });
    });
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/nativeAD/index.ux?uxType=page":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/nativeAD/index.ux?uxType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".tc-layer": {
    "width": "100%",
    "height": "850px",
    "position": "absolute",
    "bottom": "100px"
  },
  ".item-container": {
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.5)",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "column",
    "marginBottom": "30px",
    "position": "fixed",
    "top": "0px",
    "left": "0px"
  },
  ".container": {
    "flexDirection": "column",
    "alignItems": "flex-end"
  },
  ".stackstyle": {
    "width": "540px",
    "height": "306px",
    "alignItems": "flex-end"
  },
  ".img": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "20px"
  },
  ".closeImg": {
    "marginBottom": "30px",
    "width": "48px",
    "height": "48px"
  },
  ".alert": {
    "fontSize": "40px",
    "marginTop": "20px",
    "marginBottom": "20px"
  },
  ".ad-video": {
    "width": "100%",
    "height": "415px"
  },
  ".btn": {
    "height": "80px",
    "width": "60%",
    "backgroundColor": "#00bfff",
    "color": "#ffffff",
    "borderRadius": "20px",
    "marginBottom": "20px",
    "backgroundColor:active": "#058fbd"
  },
  ".adbtn": {
    "width": "200px",
    "height": "50px",
    "color": "#ffffff",
    "backgroundColor": "#00bfff",
    "borderRadius": "8px",
    "position": "absolute",
    "alignSelf": "flex-end",
    "bottom": "20px",
    "right": "20px",
    "backgroundColor:active": "#058fbd"
  },
  ".adsource": {
    "backgroundColor": "rgba(0,0,0,0.5)",
    "paddingTop": "5px",
    "paddingRight": "10px",
    "paddingBottom": "5px",
    "paddingLeft": "10px",
    "color": "#ffffff",
    "position": "absolute",
    "top": "0px",
    "fontSize": "18px",
    "borderTopLeftRadius": "20px"
  },
  ".adtitle": {
    "backgroundColor": "rgba(0,0,0,0.5)",
    "paddingTop": "5px",
    "paddingRight": "10px",
    "paddingBottom": "5px",
    "paddingLeft": "10px",
    "color": "#ffffff",
    "fontSize": "18px",
    "borderBottomLeftRadius": "20px"
  },
  ".ad-content": {
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px",
    "height": "500px",
    "flexDirection": "column"
  },
  ".ad-content .ad-image": {
    "width": "100%",
    "objectFit": "cover",
    "borderRadius": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-image"
        }
      ]
    }
  },
  ".ad-content .ad-video": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-video"
        }
      ]
    }
  },
  ".ad-content .ad-footer": {
    "height": "10%",
    "width": "100%",
    "alignItems": "center",
    "marginTop": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-footer"
        }
      ]
    }
  },
  ".ad-content .ad-footer .ad-icon": {
    "width": "30px",
    "height": "30px",
    "marginRight": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-content"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-footer"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-icon"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/nativeAD/index.ux?uxType=page&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/nativeAD/index.ux?uxType=page& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "item-container"
  ],
  "children": [
    {
      "type": "image",
      "attr": {
        "src": "/Common/img/ad/icon_gx.png"
      },
      "style": {
        "width": "528px",
        "height": "708px"
      }
    },
    {
      "type": "image",
      "attr": {
        "src": "/Common/img/ad/bt_cpd.png"
      },
      "style": {
        "width": "340px",
        "height": "94px",
        "marginBottom": "30px"
      },
      "events": {
        "click": "completeAdRSA"
      }
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "container"
      ],
      "children": [
        {
          "type": "block",
          "attr": {},
          "repeat": function () {return this.adList},
          "children": [
            {
              "type": "ad",
              "attr": {
                "adid": function () {return this.$item.adId},
                "show": function () {return this.adList.length>0}
              },
              "classList": [
                "ad-native"
              ],
              "events": {
                "error": "error",
                "adclick": "reportNativeClick",
                "adclose": "closeAd"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "ad-content"
                  ],
                  "children": [
                    {
                      "type": "block",
                      "attr": {},
                      "shown": function () {return this.$item.creativeType===4},
                      "children": [
                        {
                          "type": "ad-clickable-area",
                          "attr": {
                            "type": "video"
                          },
                          "classList": [
                            "ad-video"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "block",
                      "attr": {},
                      "shown": function () {return !(this.$item.creativeType===4)},
                      "children": [
                        {
                          "type": "ad-clickable-area",
                          "attr": {
                            "type": "click"
                          },
                          "children": [
                            {
                              "type": "image",
                              "attr": {
                                "src": function () {return this.$item.imgUrlList[0]}
                              },
                              "classList": [
                                "ad-image"
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
                        "ad-footer"
                      ],
                      "shown": function () {return this.$item.title},
                      "children": [
                        {
                          "type": "ad-clickable-area",
                          "attr": {
                            "type": "click"
                          },
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.defaultAd.icon}
                              },
                              "classList": [
                                "tag"
                              ]
                            },
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return this.$item.title||this.defaultAd.title}
                              },
                              "classList": [
                                "title"
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
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.showTclayer},
      "classList": [
        "tc-layer"
      ],
      "events": {
        "click": function (evt) { return this.reportNativeClick(evt)}
      }
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
/*!**********************************************!*\
  !*** ./src/ad/nativeAD/index.ux?uxType=page ***!
  \**********************************************/

var $app_style$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/nativeAD/index.ux?uxType=page")
var $app_script$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/nativeAD/index.ux?uxType=page")
$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/nativeAD/index.ux?uxType=page&")
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
//# sourceMappingURL=ad\nativeAD\index.js.map
(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

let nativeAd;
module.exports = {
  props: {
    showTclayer: {
      type: Boolean,
      default: false,
      required: true
    },
    adUpload: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: {
    componentName: "ad",
    provider: "",
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
    this.native.adUnitId = getApp().$def.dataApp.nativeAdUnitId;
  },
  async onReady(options) {
    console.info("native ad onReady");
    this.showNativeAd();
  },
  onShow(options) {
    if (this.native.isShow) {
      this.reportNativeShow();
    }
  },
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  showNativeAd() {
    this.getAdProvider();
    if (this.provider !== "huawei") {
      console.info("the device  does not support ad.");
      return;
    }
    nativeAd = $ad.createNativeAd({
      adUnitId: this.native.adUnitId
    });
    nativeAd.onLoad(data => {
      this.native.adData = data.adList[0];
      if (this.native.adData) {
        if (this.native.adData.imgUrlList) {
          this.native.adImgSrc = this.native.adData.imgUrlList[0];
          console.info(" this.native.adImgSrc =" + this.native.adImgSrc);
          this.native.isShowImg = true;
        } else {
          this.native.isShowImg = false;
          this.native.adImgSrc = "";
        }
        if (this.native.adData.clickBtnTxt) {
          this.native.btnTxt = this.native.adData.clickBtnTxt;
        } else {
          this.native.btnTxt = "";
        }
        if (this.native.adData.videoUrlList && this.native.adData.videoUrlList[0]) {
          this.native.adVideoSrc = this.native.adData.videoUrlList[0];
          this.native.isShowVideo = true;
        } else {
          this.native.isShowVideo = false;
          this.native.adVideoSrc = "";
        }
        this.native.isShow = true;
        this.native.errStr = "";
        this.reportNativeShow();
      }
    });
    nativeAd.onError(e => {
      console.error("load ad error:" + JSON.stringify(e));
      this.native.isShowImg = false;
      this.native.isShowVideo = false;
      this.native.isShow = false;
      this.native.errStr = JSON.stringify(e);
    });
    nativeAd.load();
  },
  reportNativeShow() {
    if (nativeAd) {
      nativeAd.reportAdShow({
        adId: this.native.adData.adId
      });
      this.$emit('showNvad');
    }
  },
  reportNativeClick() {
    console.info(" 原生广告被点击了");
    nativeAd.reportAdClick({
      adId: this.native.adData.adId
    });
    this.$emit('addAdc');
    this.showTclayer = false;
  },
  startButton(event) {
    console.error('start download result is = ', event.resultCode);
  },
  onDestroy() {
    if (nativeAd) {
      nativeAd.destroy();
    }
  },
  closeAd: function () {
    this.native.isShow = false;
  },
  closeAdview: function () {
    this.$emit('emitClose');
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
    var channel = getApp().$def.dataApp.channel;
    var countMax = getApp().$def.dataApp.countMax;
    var brand = getApp().$def.dataApp.brand;
    var oaid = getApp().$def.dataApp.actiParam.oaid;
    var info = $device.getInfoSync();
    var ua = '';
    if (info) {
      ua = `${info.model}, ${info.product}, ${info.manufacturer}, ${info.osType}`;
    } else {
      console.error('ua 对象未定义或不包含所需的参数');
    }
    console.log(`构建参数对象oaid:${oaid}  构建参数对象ua:${ua}`);
    const params = {
      adType,
      adId,
      channel,
      countMax,
      brand,
      oaid,
      ua
    };
    console.log(`构建参数对象:${params}`);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./src/ad/nativeAD/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".tc-layer": {
    "width": "100%",
    "height": "850px",
    "position": "absolute",
    "bottom": "100px",
    "backgroundColor": "rgba(0,0,0,0.9)"
  },
  ".item-container": {
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.9)",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "column",
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
    "borderRadius": "0px"
  },
  ".closeImg": {
    "width": "36px",
    "height": "36px",
    "marginBottom": "20px"
  },
  ".closeView": {
    "position": "absolute",
    "left": "100px",
    "top": "140px",
    "width": "36px",
    "height": "36px",
    "backgroundColor": "rgba(0,0,0,0.5)"
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
    "right": "0px",
    "fontSize": "18px",
    "borderTopLeftRadius": "0px"
  },
  ".adtitle": {
    "backgroundColor": "rgba(0,0,0,0.5)",
    "paddingTop": "5px",
    "paddingRight": "10px",
    "paddingBottom": "5px",
    "paddingLeft": "10px",
    "color": "#ffffff",
    "fontSize": "18px",
    "borderBottomLeftRadius": "0px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "item-container"
  ],
  "children": [
    {
      "type": "image",
      "attr": {
        "src": "/Common/img/ad/icon_x.png"
      },
      "classList": [
        "closeView"
      ],
      "events": {
        "click": "closeAdview"
      }
    },
    {
      "type": "image",
      "attr": {
        "src": "/Common/img/ad/icon_gx.png"
      },
      "style": {
        "marginTop": "-100px",
        "width": "528px",
        "height": "708px"
      }
    },
    {
      "type": "text",
      "attr": {
        "value": "打开并领取"
      },
      "style": {
        "marginTop": "-130px",
        "width": "360px",
        "height": "94px",
        "fontSize": "38px",
        "color": "#ffffff",
        "borderRadius": "60px",
        "backgroundColor": "#ec5d0a",
        "fontWeight": "bold",
        "textAlign": "center"
      },
      "events": {
        "click": "completeAdRSA"
      }
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.native.isShow)},
      "classList": [
        "container"
      ],
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/ad/icon_x.png"
          },
          "classList": [
            "closeImg"
          ],
          "events": {
            "click": "closeAd"
          }
        },
        {
          "type": "video",
          "attr": {
            "id": "video",
            "src": function () {return (this.native.adVideoSrc)},
            "autoplay": "true"
          },
          "id": "video",
          "shown": function () {return (this.native.isShowVideo)},
          "events": {
            "click": "reportNativeClick"
          },
          "classList": [
            "ad-video"
          ]
        },
        {
          "type": "stack",
          "attr": {},
          "classList": [
            "stackstyle"
          ],
          "events": {
            "click": "reportNativeClick"
          },
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return (this.native.adImgSrc)}
              },
              "shown": function () {return (this.native.isShowImg)},
              "classList": [
                "img"
              ]
            },
            {
              "type": "ad-button",
              "attr": {
                "valuetype": "0",
                "adunitid": function () {return (this.native.adUnitId)},
                "adid": function () {return (this.native.adData.adId)}
              },
              "classList": [
                "adbtn"
              ],
              "events": {
                "click": "startButton"
              }
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return ((this.native.adData.source))+' 广告'}
              },
              "classList": [
                "adsource"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return (this.native.adData.title)}
              },
              "classList": [
                "adtitle"
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.showTclayer)},
      "classList": [
        "tc-layer"
      ],
      "events": {
        "click": "reportNativeClick"
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
/*!**********************************!*\
  !*** ./src/ad/nativeAD/index.ux ***!
  \**********************************/
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGFkXFxuYXRpdmVBRFxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUErSEE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZC9uYXRpdmVBRC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhZFxcbmF0aXZlQURcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD9iOTI5Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD8zNzFkIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpdGVtLWNvbnRhaW5lclwiPlxyXG4gICAgPGltYWdlIGNsYXNzPVwiY2xvc2VWaWV3XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkdmlld1wiPjwvaW1hZ2U+XHJcbiAgICA8IS0tIDxpbWFnZSBzdHlsZT1cIndpZHRoOiAzNDBweDsgaGVpZ2h0OiA5NHB4elwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPjwvaW1hZ2U+IC0tPlxyXG4gICAgPGltYWdlIHN0eWxlPVwibWFyZ2luLXRvcDogLTEwMHB4OyB3aWR0aDogNTI4cHg7IGhlaWdodDogNzA4cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICA8dGV4dCBzdHlsZT1cIm1hcmdpbi10b3A6IC0xMzBweDsgd2lkdGg6IDM2MHB4OyBoZWlnaHQ6IDk0cHg7IGZvbnQtc2l6ZTogMzhweDsgY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDYwcHg7IGJhY2tncm91bmQtY29sb3I6ICNlYzVkMGE7IGZvbnQtd2VpZ2h0OiBib2xkOyB0ZXh0LWFsaWduOiBjZW50ZXJcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPuaJk+W8gOW5tumihuWPljwvdGV4dD5cclxuXHJcbiAgICA8ZGl2IGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT5cclxuICAgICAgPHZpZGVvIGlkPVwidmlkZW9cIiBpZj1cIm5hdGl2ZS5pc1Nob3dWaWRlb1wiIHNyYz1cInt7bmF0aXZlLmFkVmlkZW9TcmN9fVwiIGF1dG9wbGF5PVwidHJ1ZVwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCIgY2xhc3M9XCJhZC12aWRlb1wiPjwvdmlkZW8+XHJcbiAgICAgIDxzdGFjayBjbGFzcz1cInN0YWNrc3R5bGVcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxyXG4gICAgICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dJbWdcIiBjbGFzcz1cImltZ1wiIHNyYz1cInt7bmF0aXZlLmFkSW1nU3JjfX1cIj48L2ltYWdlPlxyXG4gICAgICAgIDxhZC1idXR0b24gY2xhc3M9XCJhZGJ0blwiIG9uY2xpY2s9XCJzdGFydEJ1dHRvbigpXCIgdmFsdWV0eXBlPVwiMFwiIGFkdW5pdGlkPVwie3tuYXRpdmUuYWRVbml0SWR9fVwiIGFkaWQ9XCJ7e25hdGl2ZS5hZERhdGEuYWRJZH19XCI+PC9hZC1idXR0b24+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHNvdXJjZVwiPnt7IG5hdGl2ZS5hZERhdGEuc291cmNlIH19IOW5v+WRijwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkdGl0bGVcIj57eyBuYXRpdmUuYWREYXRhLnRpdGxlIH19PC90ZXh0PlxyXG4gICAgICA8L3N0YWNrPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBpZj1cInt7c2hvd1RjbGF5ZXJ9fVwiIGNsYXNzPVwidGMtbGF5ZXJcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c3R5bGU+XHJcbiAgLnRjLWxheWVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA4NTBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XHJcbiAgfVxyXG5cclxuICAuaXRlbS1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICB9XHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuc3RhY2tzdHlsZSB7XHJcbiAgICB3aWR0aDogNTQwcHg7XHJcbiAgICBoZWlnaHQ6IDMwNnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xyXG4gIH1cclxuICAuY2xvc2VJbWcge1xyXG4gICAgd2lkdGg6IDM2cHg7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmNsb3NlVmlldyB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAxMDBweDtcclxuICAgIHRvcDogMTQwcHg7XHJcbiAgICB3aWR0aDogMzZweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICB9XHJcbiAgLmFsZXJ0IHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmFkLXZpZGVvIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0MTVweDtcclxuICB9XHJcbiAgLmJ0biB7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG4gIC5idG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZGJ0biB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGJmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICAgIGJvdHRvbTogMjBweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICAuYWRidG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZHNvdXJjZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICB9XHJcbiAgLmFkdGl0bGUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuICBsZXQgbmF0aXZlQWQ7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJvcHM6IHtcclxuXHJcbiAgICAgIHNob3dUY2xheWVyOiB7XHJcbiAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgYWRVcGxvYWQ6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgY29tcG9uZW50TmFtZTogXCJhZFwiLFxyXG4gICAgICBwcm92aWRlcjogXCJcIixcclxuICAgICAgbmF0aXZlOiB7XHJcbiAgICAgICAgYWRVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgaXNTaG93OiBmYWxzZSxcclxuICAgICAgICBhZERhdGE6IHt9LFxyXG4gICAgICAgIGlzU2hvd0ltZzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dWaWRlbzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dEYXRhOiB0cnVlLFxyXG4gICAgICAgIGVyclN0cjogXCJcIixcclxuICAgICAgICBidG5UeHQ6IFwiXCIsXHJcbiAgICAgICAgYWRJbWdTcmM6IFwiXCIsXHJcbiAgICAgICAgYWRWaWRlb1NyYzogXCJcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uSW5pdCgpIHtcclxuXHJcbiAgICAgIHRoaXMubmF0aXZlLmFkVW5pdElkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLm5hdGl2ZUFkVW5pdElkXHJcblxyXG4gICAgICAvLyB0aGlzLm5hdGl2ZS5hZFVuaXRJZCA9ICd2NWg1eHNrbHAyJ1xyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uUmVhZHkob3B0aW9ucykge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCJuYXRpdmUgYWQgb25SZWFkeVwiKTtcclxuICAgICAgdGhpcy5zaG93TmF0aXZlQWQoKTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAgIGlmICh0aGlzLm5hdGl2ZS5pc1Nob3cpIHtcclxuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEFkUHJvdmlkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xyXG4gICAgfSxcclxuICAgIHNob3dOYXRpdmVBZCgpIHtcclxuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XHJcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwidGhlIGRldmljZSAgZG9lcyBub3Qgc3VwcG9ydCBhZC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdGl2ZUFkID0gJGFkLmNyZWF0ZU5hdGl2ZUFkKHsgYWRVbml0SWQ6IHRoaXMubmF0aXZlLmFkVW5pdElkIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5pbmZvKFwiYWQgZGF0YSBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmFkRGF0YSA9IGRhdGEuYWRMaXN0WzBdO1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuaW1nVXJsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0WzBdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCIgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPVwiICsgdGhpcy5uYXRpdmUuYWRJbWdTcmMpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gdGhpcy5uYXRpdmUuYWREYXRhLmNsaWNrQnRuVHh0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEudmlkZW9VcmxMaXN0ICYmIHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkVmlkZW9TcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubmF0aXZlLmVyclN0ciA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsb2FkIGFkIGVycm9yOlwiICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gSlNPTi5zdHJpbmdpZnkoZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5sb2FkKCk7XHJcbiAgICB9LFxyXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcclxuICAgICAgaWYgKG5hdGl2ZUFkKSB7XHJcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWQgfSk7XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6L2s5YyW54K55Ye75qyh5pWw5Li6MCDliJnlub/lkYrliqDovb3miJDlip/lsLHovazljJbkuIrkvKBcclxuICAgICAgICB0aGlzLiRlbWl0KCdzaG93TnZhZCcpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVDbGljaygpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwiIOWOn+eUn+W5v+WRiuiiq+eCueWHu+S6hlwiKTtcclxuICAgICAgbmF0aXZlQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvL+W5v+WRiuiiq+eCueWHu+aXtuinpuWPkeS4u+mhtemdouaWueazlVxyXG4gICAgICB0aGlzLiRlbWl0KCdhZGRBZGMnKVxyXG5cclxuICAgICAgLy/lub/lkYrmiJbpgI/mmI7lsYLooqvngrnlh7vlkI7pmpDol4/pgI/mmI7lsYJcclxuICAgICAgdGhpcy5zaG93VGNsYXllciA9IGZhbHNlXHJcblxyXG4gICAgfSxcclxuICAgIHN0YXJ0QnV0dG9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0IGRvd25sb2FkIHJlc3VsdCBpcyA9ICcsIGV2ZW50LnJlc3VsdENvZGUpXHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+WFs+mXreW5v+WRiuWGheWuuVxyXG4gICAgY2xvc2VBZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+WFs+mXreW5v+WRiumhtemdolxyXG4gICAgY2xvc2VBZHZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9zZScpXHJcblxyXG4gICAgfSxcclxuICAgIGNvbXBsZXRlQWRSU0EoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmi4bnpo/ooosnKTtcclxuXHJcbiAgICAgIC8v5Y+L55uf5LqL5Lu25omT54K5XHJcbiAgICAgICR1bWVuZ19zdGF0LnRyYWNrRXZlbnQoJ3h5ZmRkaGpfY2hhaScsICfngrnlh7snKTtcclxuXHJcbiAgICAgIC8v5YWI5Yik5pat5bm/5ZGK5rKh5pyJ5rKh5Yqg6L295Ye65p2l77yM5rKh5pyJ5bCx55u05o6l6L+U5Zue5LiN5omn6KGM5o6l5Y+jXHJcblxyXG4gICAgICBpZiAoIXRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflub/lkYrlsZXnpLrkuI3miJDlip8s5ouG57qi5YyF5LiN5oiQ5YqfJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogJ+aLhue6ouWMheWksei0pe+8geivt+mHjeivlScsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhZFR5cGUgPSAnTkFUSVZFJ1xyXG4gICAgICB2YXIgYWRJZCA9IHRoaXMubmF0aXZlLmFkVW5pdElkXHJcbiAgICAgIHZhciBjaGFubmVsID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmNoYW5uZWxcclxuICAgICAgdmFyIGNvdW50TWF4ID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmNvdW50TWF4XHJcbiAgICAgIHZhciBicmFuZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5icmFuZFxyXG4gICAgICB2YXIgb2FpZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5hY3RpUGFyYW0ub2FpZFxyXG4gICAgICB2YXIgaW5mbyA9ICRkZXZpY2UuZ2V0SW5mb1N5bmMoKTtcclxuICAgICAgdmFyIHVhID0gJydcclxuICAgICAgLy8g56Gu5L+dIHVhIOWvueixoeWMheWQq+aJgOmcgOeahOWPguaVsFxyXG4gICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgIHVhID0gYCR7aW5mby5tb2RlbH0sICR7aW5mby5wcm9kdWN0fSwgJHtpbmZvLm1hbnVmYWN0dXJlcn0sICR7aW5mby5vc1R5cGV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCd1YSDlr7nosaHmnKrlrprkuYnmiJbkuI3ljIXlkKvmiYDpnIDnmoTlj4LmlbAnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhg5p6E5bu65Y+C5pWw5a+56LGhb2FpZDoke29haWR9ICDmnoTlu7rlj4LmlbDlr7nosaF1YToke3VhfWApO1xyXG4gICAgICAvLyDmnoTlu7rlj4LmlbDlr7nosaFcclxuICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFkVHlwZSxcclxuICAgICAgICBhZElkLFxyXG4gICAgICAgIGNoYW5uZWwsXHJcbiAgICAgICAgY291bnRNYXgsXHJcbiAgICAgICAgYnJhbmQsXHJcbiAgICAgICAgb2FpZCxcclxuICAgICAgICB1YVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zb2xlLmxvZyhg5p6E5bu65Y+C5pWw5a+56LGhOiR7cGFyYW1zfWApO1xyXG4gICAgICAkYXBpcy5leGFtcGxlLmNvbXBsZXRlQWRSU0EocGFyYW1zKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYOWujOaIkOW5v+WRii0tLS0tLS0tLS0+IGp1bXBMaW5rOiR7cmVzLmRhdGEuanVtcExpbmt9LCDlrozmiJDmrKHmlbDvvJoke3Jlcy5kYXRhLmNvdW50fSDlvZPmrKHlpZblirHvvJoke3Jlcy5kYXRhLmF3YXJkQW1vdW50fWApO1xyXG5cclxuICAgICAgICAvL+WFiOWIpOaWreacieayoeaciei/lOWbnui3s+i9rOmTvuaOpe+8jOacieWwsei3s1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5qdW1wTGluaykge1xyXG4gICAgICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICAgICAgdXJpOiByZXMuZGF0YS5qdW1wTGlua1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgbWVzID0gJydcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5hd2FyZEFtb3VudCkge1xyXG4gICAgICAgICAgICBtZXMgPSAn5oGt5Zac6I635b6XMC4wMeWFg+e6ouWMhSdcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb3VudCA+IDgpIHtcclxuICAgICAgICAgICAgICBtZXMgPSAn5LuK5aSp5rS75Yqo5qyh5pWw5bey55So5a6MJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1lcyA9ICflho3mnaXkuIDmrKEnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgbWVzc2FnZTogbWVzLFxyXG4gICAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2VtaXRFdnQnLCB7XHJcbiAgICAgICAgICBjb3VudDogcmVzLmRhdGEuY291bnRcclxuICAgICAgICB9KVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+eCueWHu+aLhuemj+iii+mUmeivrycpO1xyXG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgIG1lc3NhZ2U6IEpTT04ucGFyc2UoZXJyKS5tZXNzYWdlLFxyXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuPC9zY3JpcHQ+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi50Yy1sYXllclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg1MHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIxMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgfSxcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuc3RhY2tzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU0MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzMDZweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY2xvc2VJbWdcIjoge1xuICAgIFwid2lkdGhcIjogXCIzNnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuY2xvc2VWaWV3XCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImxlZnRcIjogXCIxMDBweFwiLFxuICAgIFwidG9wXCI6IFwiMTQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMzZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCJcbiAgfSxcbiAgXCIuYWxlcnRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0MHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuYWQtdmlkZW9cIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MTVweFwiXG4gIH0sXG4gIFwiLmJ0blwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYmZmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiIzA1OGZiZFwiXG4gIH0sXG4gIFwiLmFkYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiOHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJhbGlnblNlbGZcIjogXCJmbGV4LWVuZFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiIzA1OGZiZFwiXG4gIH0sXG4gIFwiLmFkc291cmNlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmFkdGl0bGVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxOHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCI6IFwiMHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiaXRlbS1jb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2xvc2VWaWV3XCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZUFkdmlld1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwibWFyZ2luVG9wXCI6IFwiLTEwMHB4XCIsXG4gICAgICAgIFwid2lkdGhcIjogXCI1MjhweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjcwOHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCLmiZPlvIDlubbpooblj5ZcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIm1hcmdpblRvcFwiOiBcIi0xMzBweFwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiMzYwcHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI5NHB4XCIsXG4gICAgICAgIFwiZm9udFNpemVcIjogXCIzOHB4XCIsXG4gICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjBweFwiLFxuICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNlYzVkMGFcIixcbiAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiY29tcGxldGVBZFJTQVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuaXNTaG93KX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY29udGFpbmVyXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImNsb3NlSW1nXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZUFkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImlkXCI6IFwidmlkZW9cIixcbiAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkVmlkZW9TcmMpfSxcbiAgICAgICAgICAgIFwiYXV0b3BsYXlcIjogXCJ0cnVlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaWRcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuaXNTaG93VmlkZW8pfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJhZC12aWRlb1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJzdGFja3N0eWxlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZEltZ1NyYyl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuaXNTaG93SW1nKX0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImltZ1wiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkLWJ1dHRvblwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWV0eXBlXCI6IFwiMFwiLFxuICAgICAgICAgICAgICAgIFwiYWR1bml0aWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRVbml0SWQpfSxcbiAgICAgICAgICAgICAgICBcImFkaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWREYXRhLmFkSWQpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZGJ0blwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwic3RhcnRCdXR0b25cIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy5uYXRpdmUuYWREYXRhLnNvdXJjZSkpKycg5bm/5ZGKJ31cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWRzb3VyY2VcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEudGl0bGUpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZHRpdGxlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RjbGF5ZXIpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0Yy1sYXllclwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmF0aXZlQURcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hdGl2ZUFEXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjAuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
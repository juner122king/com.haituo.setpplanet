(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

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
  isDownloadAd(creativeType) {
    let downloadTypes = [103, 106, 107, 108, 101, 102, 110];
    return downloadTypes.includes(creativeType);
  },
  showNativeAd() {
    var that = this;
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
    }
  },
  reportNativeClick() {
    console.info(" 原生广告被点击了");
    nativeAd.reportAdClick({
      adId: this.native.adData.adId
    });
    $utils.getConvertUpload();
    this.showTclayer = false;
  },
  listenNativeAdDownloadStatus(downloadstatus) {
    if (downloadstatus === "INSTALLED") {
      this.native.btnTxt = "OPEN";
    }
  },
  startButton(event) {
    console.error('start download result is = ', event.resultCode);
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
  onDestroy() {
    if (nativeAd) {
      nativeAd.destroy();
    }
  },
  closeAd: function () {
    this.native.isShow = false;
  },
  completeAdRSA() {
    console.log('点击拆福袋');
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./src/ad/nativeAD/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".tc-layer": {
    "width": "100%",
    "height": "850px",
    "position": "absolute",
    "bottom": "100px"
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
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
        "height": "94px"
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
var $app_template$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXGFkXFxuYXRpdmVBRFxcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFnSEE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hZC9uYXRpdmVBRC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhZFxcbmF0aXZlQURcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD9iZTdjIiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD8xZmI1Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpdGVtLWNvbnRhaW5lclwiPlxyXG4gICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDUyOHB4OyBoZWlnaHQ6IDcwOHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl9neC5wbmdcIj48L2ltYWdlPlxyXG4gICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDM0MHB4OyBoZWlnaHQ6IDk0cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9idF9jcGQucG5nXCIgb25jbGljaz1cImNvbXBsZXRlQWRSU0FcIj48L2ltYWdlPlxyXG4gICAgPGRpdiBpZj1cIm5hdGl2ZS5pc1Nob3dcIiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aW1hZ2UgY2xhc3M9XCJjbG9zZUltZ1wiIHNyYz1cIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIiBvbmNsaWNrPVwiY2xvc2VBZFwiPjwvaW1hZ2U+XHJcbiAgICAgIDx2aWRlbyBpZD1cInZpZGVvXCIgaWY9XCJuYXRpdmUuaXNTaG93VmlkZW9cIiBzcmM9XCJ7e25hdGl2ZS5hZFZpZGVvU3JjfX1cIiBhdXRvcGxheT1cInRydWVcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiIGNsYXNzPVwiYWQtdmlkZW9cIj48L3ZpZGVvPlxyXG4gICAgICA8c3RhY2sgY2xhc3M9XCJzdGFja3N0eWxlXCIgb25jbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cclxuICAgICAgICA8aW1hZ2UgaWY9XCJuYXRpdmUuaXNTaG93SW1nXCIgY2xhc3M9XCJpbWdcIiBzcmM9XCJ7e25hdGl2ZS5hZEltZ1NyY319XCI+PC9pbWFnZT5cclxuICAgICAgICA8YWQtYnV0dG9uIGNsYXNzPVwiYWRidG5cIiBvbmNsaWNrPVwic3RhcnRCdXR0b24oKVwiIHZhbHVldHlwZT1cIjBcIiBhZHVuaXRpZD1cInt7bmF0aXZlLmFkVW5pdElkfX1cIiBhZGlkPVwie3tuYXRpdmUuYWREYXRhLmFkSWR9fVwiPjwvYWQtYnV0dG9uPlxyXG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiYWRzb3VyY2VcIj57eyBuYXRpdmUuYWREYXRhLnNvdXJjZSB9fSDlub/lkYo8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHRpdGxlXCI+e3sgbmF0aXZlLmFkRGF0YS50aXRsZSB9fTwvdGV4dD5cclxuICAgICAgPC9zdGFjaz5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZj1cInt7c2hvd1RjbGF5ZXJ9fVwiIGNsYXNzPVwidGMtbGF5ZXJcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c3R5bGU+XHJcbiAgLnRjLWxheWVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA4NTBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTAwcHg7XHJcbiAgfVxyXG5cclxuICAuaXRlbS1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICB9XHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuc3RhY2tzdHlsZSB7XHJcbiAgICB3aWR0aDogNTQwcHg7XHJcbiAgICBoZWlnaHQ6IDMwNnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICB9XHJcbiAgLmNsb3NlSW1nIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICB3aWR0aDogNDhweDtcclxuICAgIGhlaWdodDogNDhweDtcclxuICB9XHJcbiAgLmFsZXJ0IHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmFkLXZpZGVvIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0MTVweDtcclxuICB9XHJcbiAgLmJ0biB7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG4gIC5idG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZGJ0biB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGJmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICAgIGJvdHRvbTogMjBweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICAuYWRidG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZHNvdXJjZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuYWR0aXRsZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuICBsZXQgbmF0aXZlQWQ7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJvcHM6IHtcclxuXHJcbiAgICAgIHNob3dUY2xheWVyOiB7XHJcbiAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNvbXBvbmVudE5hbWU6IFwiYWRcIixcclxuICAgICAgcHJvdmlkZXI6IFwiXCIsXHJcbiAgICAgIG5hdGl2ZToge1xyXG4gICAgICAgIGFkVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIGlzU2hvdzogZmFsc2UsXHJcbiAgICAgICAgYWREYXRhOiB7fSxcclxuICAgICAgICBpc1Nob3dJbWc6IHRydWUsXHJcbiAgICAgICAgaXNTaG93VmlkZW86IHRydWUsXHJcbiAgICAgICAgaXNTaG93RGF0YTogdHJ1ZSxcclxuICAgICAgICBlcnJTdHI6IFwiXCIsXHJcbiAgICAgICAgYnRuVHh0OiBcIlwiLFxyXG4gICAgICAgIGFkSW1nU3JjOiBcIlwiLFxyXG4gICAgICAgIGFkVmlkZW9TcmM6IFwiXCJcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcblxyXG4gICAgICB0aGlzLm5hdGl2ZS5hZFVuaXRJZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5uYXRpdmVBZFVuaXRJZFxyXG5cclxuICAgICAgLy8gdGhpcy5uYXRpdmUuYWRVbml0SWQgPSAndjVoNXhza2xwMidcclxuICAgIH0sXHJcbiAgICBhc3luYyBvblJlYWR5KG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwibmF0aXZlIGFkIG9uUmVhZHlcIik7XHJcbiAgICAgIHRoaXMuc2hvd05hdGl2ZUFkKCk7XHJcbiAgICAgIC8vIGNvbnN0IHN0b3JhZ2VGbGFnID0gYXdhaXQgJHByb2Nlc3NEYXRhLmdldFN0b3JhZ2UoXCJfUFJJVkFDXCIpO1xyXG4gICAgICAvLyBpZiAoc3RvcmFnZUZsYWcpIHtcclxuICAgICAgLy8gICB0aGlzLnNob3dOYXRpdmVBZCgpO1xyXG4gICAgICAvLyB9IGVsc2UgeyAgIC8v5pyq5o6I5p2D77yM5by55Ye65o6I5p2D6K+i6ZeuXHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ+eUqOaIt+aOiOadgz0gJywgc3RvcmFnZUZsYWcpO1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCfmnKrmjojmnYMs5LiN5Yqg6L295Y6f55Sf5bm/5ZGKJyk7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25TaG93KG9wdGlvbnMpIHtcclxuICAgICAgaWYgKHRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XHJcblxyXG4gICAgfSxcclxuICAgIGlzRG93bmxvYWRBZChjcmVhdGl2ZVR5cGUpIHtcclxuICAgICAgbGV0IGRvd25sb2FkVHlwZXMgPSBbMTAzLCAxMDYsIDEwNywgMTA4LCAxMDEsIDEwMiwgMTEwXTtcclxuICAgICAgcmV0dXJuIGRvd25sb2FkVHlwZXMuaW5jbHVkZXMoY3JlYXRpdmVUeXBlKTtcclxuICAgIH0sXHJcbiAgICBzaG93TmF0aXZlQWQoKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XHJcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwidGhlIGRldmljZSAgZG9lcyBub3Qgc3VwcG9ydCBhZC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdGl2ZUFkID0gJGFkLmNyZWF0ZU5hdGl2ZUFkKHsgYWRVbml0SWQ6IHRoaXMubmF0aXZlLmFkVW5pdElkIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5pbmZvKFwiYWQgZGF0YSBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmFkRGF0YSA9IGRhdGEuYWRMaXN0WzBdO1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuaW1nVXJsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0WzBdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCIgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPVwiICsgdGhpcy5uYXRpdmUuYWRJbWdTcmMpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gdGhpcy5uYXRpdmUuYWREYXRhLmNsaWNrQnRuVHh0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEudmlkZW9VcmxMaXN0ICYmIHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkVmlkZW9TcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubmF0aXZlLmVyclN0ciA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsb2FkIGFkIGVycm9yOlwiICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gSlNPTi5zdHJpbmdpZnkoZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5sb2FkKCk7XHJcbiAgICB9LFxyXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcclxuICAgICAgaWYgKG5hdGl2ZUFkKSB7XHJcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWQgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVDbGljaygpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwiIOWOn+eUn+W5v+WRiuiiq+eCueWHu+S6hlwiKTtcclxuICAgICAgbmF0aXZlQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvL+i9rOWMluS4iuS8oFxyXG4gICAgICAkdXRpbHMuZ2V0Q29udmVydFVwbG9hZCgpXHJcblxyXG4gICAgICAvL+W5v+WRiuaIlumAj+aYjuWxguiiq+eCueWHu+WQjumakOiXj+mAj+aYjuWxglxyXG4gICAgICB0aGlzLnNob3dUY2xheWVyID0gZmFsc2VcclxuXHJcbiAgICB9LFxyXG4gICAgbGlzdGVuTmF0aXZlQWREb3dubG9hZFN0YXR1cyhkb3dubG9hZHN0YXR1cykge1xyXG4gICAgICBpZiAoZG93bmxvYWRzdGF0dXMgPT09IFwiSU5TVEFMTEVEXCIpIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSBcIk9QRU5cIjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0QnV0dG9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0IGRvd25sb2FkIHJlc3VsdCBpcyA9ICcsIGV2ZW50LnJlc3VsdENvZGUpXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQWRMaXN0ZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKG5hdGl2ZUFkKSB7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmRG93bmxvYWRQcm9ncmVzcygpO1xyXG4gICAgICAgIG5hdGl2ZUFkLm9mZkVycm9yKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlQWQgb2ZmRXJyb3JcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5hdGl2ZUFkIG9mZkxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmU3RhdHVzQ2hhbmdlZCgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbG9zZUFkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wbGV0ZUFkUlNBKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn54K55Ye75ouG56aP6KKLJyk7XHJcblxyXG4gICAgICAvL+WFiOWIpOaWreW5v+WRiuayoeacieayoeWKoOi9veWHuuadpe+8jOayoeacieWwseebtOaOpei/lOWbnuS4jeaJp+ihjOaOpeWPo1xyXG5cclxuICAgICAgaWYgKCF0aGlzLm5hdGl2ZS5pc1Nob3cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5bm/5ZGK5bGV56S65LiN5oiQ5YqfLOaLhue6ouWMheS4jeaIkOWKnycpO1xyXG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgIG1lc3NhZ2U6ICfmi4bnuqLljIXlpLHotKXvvIHor7fph43or5UnLFxyXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHZhciBhZFR5cGUgPSAnTkFUSVZFJ1xyXG4gICAgICB2YXIgYWRJZCA9IHRoaXMubmF0aXZlLmFkVW5pdElkXHJcbiAgICAgIHZhciBjaGFubmVsID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmNoYW5uZWxcclxuICAgICAgdmFyIGNvdW50TWF4ID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmNvdW50TWF4XHJcbiAgICAgIHZhciBicmFuZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5icmFuZFxyXG4gICAgICB2YXIgb2FpZCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5hY3RpUGFyYW0ub2FpZFxyXG4gICAgICB2YXIgaW5mbyA9ICRkZXZpY2UuZ2V0SW5mb1N5bmMoKTtcclxuICAgICAgdmFyIHVhID0gJydcclxuICAgICAgLy8g56Gu5L+dIHVhIOWvueixoeWMheWQq+aJgOmcgOeahOWPguaVsFxyXG4gICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgIHVhID0gYCR7aW5mby5tb2RlbH0sICR7aW5mby5wcm9kdWN0fSwgJHtpbmZvLm1hbnVmYWN0dXJlcn0sICR7aW5mby5vc1R5cGV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCd1YSDlr7nosaHmnKrlrprkuYnmiJbkuI3ljIXlkKvmiYDpnIDnmoTlj4LmlbAnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhg5p6E5bu65Y+C5pWw5a+56LGhb2FpZDoke29haWR9ICDmnoTlu7rlj4LmlbDlr7nosaF1YToke3VhfWApO1xyXG4gICAgICAvLyDmnoTlu7rlj4LmlbDlr7nosaFcclxuICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGFkVHlwZSxcclxuICAgICAgICBhZElkLFxyXG4gICAgICAgIGNoYW5uZWwsXHJcbiAgICAgICAgY291bnRNYXgsXHJcbiAgICAgICAgYnJhbmQsXHJcbiAgICAgICAgb2FpZCxcclxuICAgICAgICB1YVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zb2xlLmxvZyhg5p6E5bu65Y+C5pWw5a+56LGhOiR7cGFyYW1zfWApO1xyXG4gICAgICAkYXBpcy5leGFtcGxlLmNvbXBsZXRlQWRSU0EocGFyYW1zKS50aGVuKChyZXMpID0+IHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYOWujOaIkOW5v+WRii0tLS0tLS0tLS0+IGp1bXBMaW5rOiR7cmVzLmRhdGEuanVtcExpbmt9LCDlrozmiJDmrKHmlbDvvJoke3Jlcy5kYXRhLmNvdW50fSDlvZPmrKHlpZblirHvvJoke3Jlcy5kYXRhLmF3YXJkQW1vdW50fWApO1xyXG5cclxuICAgICAgICAvL+WFiOWIpOaWreacieayoeaciei/lOWbnui3s+i9rOmTvuaOpe+8jOacieWwsei3s1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5qdW1wTGluaykge1xyXG4gICAgICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICAgICAgdXJpOiByZXMuZGF0YS5qdW1wTGlua1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgbWVzID0gJydcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5hd2FyZEFtb3VudCkge1xyXG4gICAgICAgICAgICBtZXMgPSAn5oGt5Zac6I635b6XMC4wMeWFg+e6ouWMhSdcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb3VudCA+IDgpIHtcclxuICAgICAgICAgICAgICBtZXMgPSAn5LuK5aSp5rS75Yqo5qyh5pWw5bey55So5a6MJ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1lcyA9ICflho3mnaXkuIDmrKEnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgbWVzc2FnZTogbWVzLFxyXG4gICAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2VtaXRFdnQnLCB7XHJcbiAgICAgICAgICBjb3VudDogcmVzLmRhdGEuY291bnRcclxuICAgICAgICB9KVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+eCueWHu+aLhuemj+iii+mUmeivrycpO1xyXG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgIG1lc3NhZ2U6IEpTT04ucGFyc2UoZXJyKS5tZXNzYWdlLFxyXG4gICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuPC9zY3JpcHQ+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi50Yy1sYXllclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg1MHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIxMDBweFwiXG4gIH0sXG4gIFwiLml0ZW0tY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLnN0YWNrc3R5bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCI1NDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzA2cHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLmltZ1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5jbG9zZUltZ1wiOiB7XG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjQ4cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQ4cHhcIlxuICB9LFxuICBcIi5hbGVydFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjQwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5hZC12aWRlb1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjQxNXB4XCJcbiAgfSxcbiAgXCIuYnRuXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNjAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiZmZmXCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjIwcHhcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjMDU4ZmJkXCJcbiAgfSxcbiAgXCIuYWRidG5cIjoge1xuICAgIFwid2lkdGhcIjogXCIyMDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI4cHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImFsaWduU2VsZlwiOiBcImZsZXgtZW5kXCIsXG4gICAgXCJib3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjIwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjMDU4ZmJkXCJcbiAgfSxcbiAgXCIuYWRzb3VyY2VcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjE4cHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuYWR0aXRsZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjE4cHhcIixcbiAgICBcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIjogXCIyMHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiaXRlbS1jb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwid2lkdGhcIjogXCI1MjhweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjcwOHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIndpZHRoXCI6IFwiMzQwcHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI5NHB4XCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjb21wbGV0ZUFkUlNBXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3cpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2xvc2VJbWdcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRWaWRlb1NyYyl9LFxuICAgICAgICAgICAgXCJhdXRvcGxheVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLXZpZGVvXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkSW1nU3JjKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dJbWcpfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW1nXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdGFydEJ1dHRvblwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCh0aGlzLm5hdGl2ZS5hZERhdGEuc291cmNlKSkrJyDlub/lkYonfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZHNvdXJjZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkRGF0YS50aXRsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkdGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VGNsYXllcil9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRjLWxheWVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxhZFxcXFxuYXRpdmVBRFxcXFxpbmRleC51eCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmF0aXZlQURcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuXG4kYXBwX2Jvb3RzdHJhcCQoJ0BhcHAtY29tcG9uZW50L2luZGV4Jyx7IHBhY2thZ2VyTmFtZTonZmEtdG9vbGtpdCcsIHBhY2thZ2VyVmVyc2lvbjogJzE0LjEuMS1TdGFibGUuMzAwJ30pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
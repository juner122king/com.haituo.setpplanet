(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

module.exports = {
  private: {
    quotaList: [{
      title: '',
      id: 1
    }, {
      title: 0.1,
      id: 2
    }, {
      title: 0.5,
      id: 3
    }, {
      title: 1,
      id: 4
    }],
    showDialog: false,
    showDialog2: false,
    receivedCount: 8
  },
  async onReady(options) {
    this.getAdCount(this.$app.$def.dataApp.nativeAdUnitId);
    const storageFlag = await $processData.getStorage("_PRIVAC");
    if (storageFlag) {
      $utils.showBannerAd(this.$app.$def.dataApp.bannerAdUnitId, 0);
    } else {
      console.log('用户授权= ', storageFlag);
      console.log('未授权,不加载广告');
    }
  },
  onShow(options) {
    $umeng_stat.resume(this);
  },
  onHide() {
    $umeng_stat.pause(this);
  },
  getAdCount(adUnitId) {
    $apis.example.getAdCount({
      adId: adUnitId,
      channel: ''
    }).then(res => {
      console.log('获取每日次数', res);
      this.countT(res.data);
    });
  },
  openad() {
    console.info("点击了扯");
    if (this.receivedCount > 0) {
      this.showDialog = true;
      $utils.hideBanerAd();
    } else {
      this.showDialog2 = true;
    }
  },
  emitEvt(evt) {
    console.log('拆福袋回调:emitEvt(evt)');
    this.showDialog = false;
    this.countT(evt.detail.count);
    $utils.viewBanner();
  },
  countT(c) {
    this.receivedCount = Math.min(8, Math.max(0, 8 - c));
  },
  close: function () {
    this.showDialog2 = false;
    this.back();
  },
  onDestroy() {
    $utils.destroyBanner();
  },
  back() {
    $router.push({
      uri: 'Page_MainTab'
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

let nativeAd;
module.exports = {
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
    this.native.adUnitId = this.$app.$def.dataApp.nativeAdUnitId;
  },
  async onReady(options) {
    console.info("native ad onReady");
    const storageFlag = await $processData.getStorage("_PRIVAC");
    if (storageFlag) {
      this.showNativeAd();
    } else {
      console.log('用户授权= ', storageFlag);
      console.log('未授权,不加载原生广告');
    }
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
      console.info("ad data loaded: " + JSON.stringify(data));
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
    var adType = 'NATIVE';
    var adId = this.native.adUnitId;
    var channel = '';
    const params = {
      adType,
      adId,
      channel
    };
    $apis.example.completeAdRSA(params).then(res => {
      this.$emit('emitEvt', {
        count: res.data.count
      });
      console.log(`完成广告----------> 完成次数：${res.data.count} 当次奖励：${res.data.awardAmount}`);
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./src/Page_cfd/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!./src/Page_cfd/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".container": {
    "alignItems": "center",
    "flexDirection": "column",
    "backgroundImage": "/Common/img/ad/bg_chb.png",
    "backgroundRepeat": "no-repeat",
    "marginTop": "1px"
  },
  ".coner": {
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
  ".daliy": {
    "justifyContent": "space-around",
    "marginTop": "500px",
    "width": "258px",
    "height": "50px",
    "background": "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"90deg\"],\"values\":[\"#e9fd65\",\"#95ff37 100%\"]}]}",
    "borderRadius": "154px"
  },
  ".closeImg": {
    "marginBottom": "30px",
    "width": "48px",
    "height": "48px",
    "position": "absolute",
    "top": "30px",
    "right": "0px"
  },
  ".image_finger": {
    "width": "222px",
    "height": "222px",
    "marginTop": "400px",
    "marginLeft": "230px",
    "backgroundImage": "/Common/img/ad/icon_sz.png",
    "animationName": "float",
    "animationDuration": "1500ms",
    "animationIterationCount": -1
  },
  "@KEYFRAMES": {
    "float": [
      {
        "transform": "{\"translateY\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateY\":\"-60px\"}",
        "time": 50
      },
      {
        "transform": "{\"translateX\":\"-60px\"}",
        "time": 50
      },
      {
        "transform": "{\"translateY\":\"0px\"}",
        "time": 100
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 100
      }
    ]
  },
  ".btm_view": {
    "width": "100%",
    "height": "500px",
    "position": "absolute",
    "bottom": "100px",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  ".item-div": {
    "justifyContent": "center",
    "height": "172px",
    "width": "162px",
    "backgroundImage": "/Common/img/ad/icon_hbbg.png"
  },
  ".item-div-text": {
    "color": "#d30009",
    "fontSize": "60px",
    "fontWeight": "bold",
    "marginTop": "-40px"
  }
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./src/ad/nativeAD/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".item-container": {
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

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "style": {
        "justifyContent": "center",
        "alignItems": "center",
        "position": "absolute",
        "top": "72px",
        "height": "80px",
        "width": "100%"
      },
      "events": {
        "click": "back"
      },
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/back.png"
          },
          "style": {
            "position": "absolute",
            "left": "20px",
            "marginLeft": "10px",
            "width": "28px",
            "height": "34px"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "计步星球"
          },
          "style": {
            "fontSize": "35px",
            "color": "#000000",
            "marginLeft": "-10px"
          }
        }
      ]
    },
    {
      "type": "stack",
      "attr": {},
      "classList": [
        "daliy"
      ],
      "children": [
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/ad/icon_cs.png"
          },
          "style": {
            "position": "absolute",
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "width": "134px",
            "height": "52px"
          }
        },
        {
          "type": "text",
          "attr": {},
          "children": [
            {
              "type": "span",
              "attr": {
                "value": function () {return (this.receivedCount===0?'今日次数已用完':'今日免费：')}
              },
              "style": {
                "color": "#000000",
                "fontWeight": "bold"
              }
            },
            {
              "type": "span",
              "attr": {
                "value": function () {return ((this.receivedCount))+'次'}
              },
              "shown": function () {return (this.receivedCount>0)},
              "style": {
                "color": "#ffffff",
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
        "position": "absolute",
        "width": "282px",
        "height": "282px",
        "top": "800px",
        "left": "250px"
      },
      "events": {
        "click": "openad"
      }
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btm_view"
      ],
      "children": [
        {
          "type": "div",
          "attr": {
            "dataItem": function () {return (this.item)}
          },
          "repeat": function () {return (this.quotaList)},
          "children": [
            {
              "type": "stack",
              "attr": {},
              "classList": [
                "item-div"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return (this.$item.title)}
                  },
                  "classList": [
                    "item-div-text"
                  ]
                },
                {
                  "type": "image",
                  "attr": {
                    "src": "/Common/img/ad/icon_fd.png"
                  },
                  "shown": function () {return (this.$item.id===1)},
                  "style": {
                    "marginTop": "20px",
                    "width": "150px",
                    "height": "150px"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "native-ad",
      "attr": {},
      "shown": function () {return (this.showDialog)},
      "events": {
        "emit-evt": "emitEvt"
      }
    },
    {
      "type": "stack",
      "attr": {},
      "classList": [
        "coner"
      ],
      "shown": function () {return (this.showDialog2)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": {
            "width": "672px",
            "height": "800px",
            "backgroundImage": "/Common/img/ad/bg_coner.png"
          },
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
                "click": "close"
              }
            }
          ]
        },
        {
          "type": "image",
          "attr": {
            "src": "/Common/img/ad/bg_but.png"
          },
          "style": {
            "width": "575px",
            "height": "177px",
            "marginTop": "500px"
          },
          "events": {
            "click": "close"
          }
        }
      ]
    },
    {
      "type": "image",
      "attr": {},
      "classList": [
        "image_finger"
      ],
      "events": {
        "click": "openad"
      }
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    }
  ]
}

/***/ }),

/***/ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux")

$app_define$('@app-component/native-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


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
  !*** ./src/Page_cfd/index.ux ***!
  \*******************************/
__webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/nativeAD/index.ux?name=native-ad */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad")
var $app_template$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./src/Page_cfd/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader?presets[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\Program Files\Huawei QuickApp IDE\resources\app\extensions\deveco-debug\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/babel-loader/lib/index.js?presets[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\Program Files\\Huawei QuickApp IDE\\resources\\app\\extensions\\deveco-debug\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!../../Program Files/Huawei QuickApp IDE/resources/app/extensions/deveco-debug/node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfY2ZkXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQWdJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL1BhZ2VfY2ZkL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfY2ZkXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL2FkL25hdGl2ZUFEL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXGFkXFxuYXRpdmVBRFxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfY2ZkL2luZGV4LnV4PzQ3MWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hdGl2ZUFEL2luZGV4LnV4P2JlN2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfY2ZkL2luZGV4LnV4PzAxMTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hdGl2ZUFEL2luZGV4LnV4Pzc4MzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hdGl2ZUFEL2luZGV4LnV4PzE5YzciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX2NmZC9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyI8aW1wb3J0IG5hbWU9XCJuYXRpdmUtYWRcIiBzcmM9XCIuLi9hZC9uYXRpdmVBRFwiPjwvaW1wb3J0PlxyXG48dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNzJweDsgaGVpZ2h0OiA4MHB4OyB3aWR0aDogMTAwJVwiIG9uY2xpY2s9XCJiYWNrXCI+XHJcbiAgICAgIDxpbWFnZSBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMjBweDsgbWFyZ2luLWxlZnQ6IDEwcHg7IHdpZHRoOiAyOHB4OyBoZWlnaHQ6IDM0cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9iYWNrLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAzNXB4OyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IC0xMHB4XCI+6K6h5q2l5pif55CDPC90ZXh0PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHN0YWNrIGNsYXNzPVwiZGFsaXlcIj5cclxuICAgICAgPGltYWdlIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IHdpZHRoOiAxMzRweDsgaGVpZ2h0OiA1MnB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl9jcy5wbmdcIj48L2ltYWdlPlxyXG4gICAgICA8dGV4dD5cclxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZFwiPnt7IHJlY2VpdmVkQ291bnQgPT09IDAgPyAn5LuK5pel5qyh5pWw5bey55So5a6MJyA6ICfku4rml6XlhY3otLnvvJonIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlmPVwie3tyZWNlaXZlZENvdW50ID4gMH19XCIgc3R5bGU9XCJjb2xvcjogI2ZmZjsgZm9udC13ZWlnaHQ6IGJvbGRcIj57e3JlY2VpdmVkQ291bnR9feasoTwvc3Bhbj5cclxuICAgICAgPC90ZXh0PlxyXG4gICAgPC9zdGFjaz5cclxuXHJcbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMjgycHg7IGhlaWdodDogMjgycHg7IHRvcDogODAwcHg7IGxlZnQ6IDI1MHB4XCIgb25jbGljaz1cIm9wZW5hZFwiPjwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJidG1fdmlld1wiPlxyXG4gICAgICA8ZGl2IGZvcj1cInt7cXVvdGFMaXN0fX1cIiBkYXRhLWl0ZW09XCJ7e2l0ZW19fVwiPlxyXG4gICAgICAgIDxzdGFjayBjbGFzcz1cIml0ZW0tZGl2XCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIml0ZW0tZGl2LXRleHRcIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XHJcbiAgICAgICAgICA8aW1hZ2UgaWY9XCJ7eyRpdGVtLmlkPT09MX19XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB3aWR0aDogMTUwcHg7IGhlaWdodDogMTUwcHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2ZkLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgICAgPC9zdGFjaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmF0aXZlLWFkIGlmPVwie3tzaG93RGlhbG9nfX1cIiBvbmVtaXQtZXZ0PVwiZW1pdEV2dFwiPjwvbmF0aXZlLWFkPlxyXG4gICAgwrdcclxuXHJcbiAgICA8c3RhY2sgY2xhc3M9XCJjb25lclwiIGlmPVwie3tzaG93RGlhbG9nMn19XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogNjcycHg7IGhlaWdodDogODAwcHg7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9hZC9iZ19jb25lci5wbmcpXCI+XHJcbiAgICAgICAgPGltYWdlIGNsYXNzPVwiY2xvc2VJbWdcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCIgb25jbGljaz1cImNsb3NlXCI+PC9pbWFnZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxpbWFnZSBzdHlsZT1cIndpZHRoOiA1NzVweDsgaGVpZ2h0OiAxNzdweDsgbWFyZ2luLXRvcDogNTAwcHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9iZ19idXQucG5nXCIgb25jbGljaz1cImNsb3NlXCI+PC9pbWFnZT5cclxuICAgIDwvc3RhY2s+XHJcbiAgICA8aW1hZ2UgY2xhc3M9XCJpbWFnZV9maW5nZXJcIiBvbmNsaWNrPVwib3BlbmFkXCI+PC9pbWFnZT5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuPHN0eWxlPlxyXG4gIC5jb250YWluZXIge1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvYmdfY2hiLnBuZyk7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgbWFyZ2luLXRvcDogMXB4O1xyXG4gIH1cclxuICAuY29uZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgfVxyXG4gIC5kYWxpeSB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIG1hcmdpbi10b3A6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDI1OHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZTlmZDY1LCAjOTVmZjM3IDEwMCUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTU0cHg7XHJcbiAgfVxyXG5cclxuICAuY2xvc2VJbWcge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAzMHB4O1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICB9XHJcbiAgLmltYWdlX2ZpbmdlciB7XHJcbiAgICB3aWR0aDogMjIycHg7XHJcbiAgICBoZWlnaHQ6IDIyMnB4O1xyXG4gICAgbWFyZ2luLXRvcDogNDAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvaWNvbl9zei5wbmcpO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsb2F0O1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxNTAwbXM7XHJcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICB9XHJcbiAgQGtleWZyYW1lcyBmbG9hdCB7XHJcbiAgICAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MHB4KTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICAgIH1cclxuICAgIDAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTYwcHgpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAuYnRtX3ZpZXcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgLml0ZW0tZGl2IHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxNzJweDtcclxuICAgIHdpZHRoOiAxNjJweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9hZC9pY29uX2hiYmcucG5nKTtcclxuICB9XHJcbiAgLml0ZW0tZGl2LXRleHQge1xyXG4gICAgY29sb3I6ICNkMzAwMDk7XHJcbiAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi10b3A6IC00MHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwcml2YXRlOiB7XHJcbiAgICAgIHF1b3RhTGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGl0bGU6IDAuMSxcclxuICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGl0bGU6IDAuNSxcclxuICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGl0bGU6IDEsXHJcbiAgICAgICAgICBpZDogNCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzaG93RGlhbG9nOiBmYWxzZSxcclxuICAgICAgc2hvd0RpYWxvZzI6IGZhbHNlLC8v5qyh5pWw5bey55So5a6M56qX5Y+jXHJcbiAgICAgIHJlY2VpdmVkQ291bnQ6IDgsLy/liankvZnmrKHmlbBcclxuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgb25SZWFkeShvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWRDb3VudCh0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLm5hdGl2ZUFkVW5pdElkKS8v5Y6f55Sf5bm/5ZGK5L2N77yM5Yik5pat6I635Y+W5qyh5pWwXHJcblxyXG4gICAgICBjb25zdCBzdG9yYWdlRmxhZyA9IGF3YWl0ICRwcm9jZXNzRGF0YS5nZXRTdG9yYWdlKFwiX1BSSVZBQ1wiKTtcclxuICAgICAgaWYgKHN0b3JhZ2VGbGFnKSB7XHJcbiAgICAgICAgLy/mmL7npLpiYW5uZXIg5bm/5ZGK6auY5bqm77yM5bqV6YOo57yp6L+bXHJcbiAgICAgICAgJHV0aWxzLnNob3dCYW5uZXJBZCh0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLmJhbm5lckFkVW5pdElkLCAwKVxyXG4gICAgICB9IGVsc2UgeyAgIC8v5pyq5o6I5p2D77yM5by55Ye65o6I5p2D6K+i6ZeuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+aOiOadgz0gJywgc3RvcmFnZUZsYWcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmnKrmjojmnYMs5LiN5Yqg6L295bm/5ZGKJyk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfSxcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAgICR1bWVuZ19zdGF0LnJlc3VtZSh0aGlzKVxyXG4gICAgfSxcclxuICAgIG9uSGlkZSgpIHtcclxuICAgICAgJHVtZW5nX3N0YXQucGF1c2UodGhpcyk7Ly/lnKhvbkhpZGXmlrnms5XnmoTnrKzkuIDooYzliqDlhaXmraTku6PnoIFcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluavj+aXpeasoeaVsFxyXG4gICAgZ2V0QWRDb3VudChhZFVuaXRJZCkge1xyXG5cclxuICAgICAgJGFwaXMuZXhhbXBsZS5nZXRBZENvdW50KHtcclxuICAgICAgICBhZElkOiBhZFVuaXRJZCxcclxuICAgICAgICBjaGFubmVsOiAnJ1xyXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5q+P5pel5qyh5pWwJywgcmVzKTtcclxuICAgICAgICB0aGlzLmNvdW50VChyZXMuZGF0YSlcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvcGVuYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbyhcIueCueWHu+S6huaJr1wiKTtcclxuICAgICAgaWYgKHRoaXMucmVjZWl2ZWRDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgICAgICR1dGlscy5oaWRlQmFuZXJBZCgpXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2hvd0RpYWxvZzIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZW1pdEV2dChldnQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+aLhuemj+iii+WbnuiwgzplbWl0RXZ0KGV2dCknKTtcclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gZmFsc2VcclxuICAgICAgdGhpcy5jb3VudFQoZXZ0LmRldGFpbC5jb3VudClcclxuICAgICAgJHV0aWxzLnZpZXdCYW5uZXIoKVxyXG4gICAgfSxcclxuICAgIGNvdW50VChjKSB7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRDb3VudCA9IE1hdGgubWluKDgsIE1hdGgubWF4KDAsIDggLSBjKSk7Ly9cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYmFjaygpXHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAkdXRpbHMuZGVzdHJveUJhbm5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiYWNrKCkge1xyXG4gICAgICAvLyAkcm91dGVyLmJhY2soKTtcclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6ICdQYWdlX01haW5UYWInXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XHJcbiAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNTI4cHg7IGhlaWdodDogNzA4cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMzQwcHg7IGhlaWdodDogOTRweFwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPjwvaW1hZ2U+XHJcbiAgICA8ZGl2IGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT5cclxuICAgICAgPHZpZGVvIGlkPVwidmlkZW9cIiBpZj1cIm5hdGl2ZS5pc1Nob3dWaWRlb1wiIHNyYz1cInt7bmF0aXZlLmFkVmlkZW9TcmN9fVwiIGF1dG9wbGF5PVwidHJ1ZVwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCIgY2xhc3M9XCJhZC12aWRlb1wiPjwvdmlkZW8+XHJcbiAgICAgIDxzdGFjayBjbGFzcz1cInN0YWNrc3R5bGVcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxyXG4gICAgICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dJbWdcIiBjbGFzcz1cImltZ1wiIHNyYz1cInt7bmF0aXZlLmFkSW1nU3JjfX1cIj48L2ltYWdlPlxyXG4gICAgICAgIDxhZC1idXR0b24gY2xhc3M9XCJhZGJ0blwiIG9uY2xpY2s9XCJzdGFydEJ1dHRvbigpXCIgdmFsdWV0eXBlPVwiMFwiIGFkdW5pdGlkPVwie3tuYXRpdmUuYWRVbml0SWR9fVwiIGFkaWQ9XCJ7e25hdGl2ZS5hZERhdGEuYWRJZH19XCI+PC9hZC1idXR0b24+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHNvdXJjZVwiPnt7IG5hdGl2ZS5hZERhdGEuc291cmNlIH19IOW5v+WRijwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkdGl0bGVcIj57eyBuYXRpdmUuYWREYXRhLnRpdGxlIH19PC90ZXh0PlxyXG4gICAgICA8L3N0YWNrPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAuaXRlbS1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICB9XHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuc3RhY2tzdHlsZSB7XHJcbiAgICB3aWR0aDogNTQwcHg7XHJcbiAgICBoZWlnaHQ6IDMwNnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICB9XHJcbiAgLmNsb3NlSW1nIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICB3aWR0aDogNDhweDtcclxuICAgIGhlaWdodDogNDhweDtcclxuICB9XHJcbiAgLmFsZXJ0IHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmFkLXZpZGVvIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0MTVweDtcclxuICB9XHJcbiAgLmJ0biB7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG4gIC5idG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZGJ0biB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGJmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICAgIGJvdHRvbTogMjBweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICAuYWRidG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG4gIC5hZHNvdXJjZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuYWR0aXRsZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuICBsZXQgbmF0aXZlQWQ7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNvbXBvbmVudE5hbWU6IFwiYWRcIixcclxuICAgICAgcHJvdmlkZXI6IFwiXCIsXHJcbiAgICAgIG5hdGl2ZToge1xyXG4gICAgICAgIGFkVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIGlzU2hvdzogZmFsc2UsXHJcbiAgICAgICAgYWREYXRhOiB7fSxcclxuICAgICAgICBpc1Nob3dJbWc6IHRydWUsXHJcbiAgICAgICAgaXNTaG93VmlkZW86IHRydWUsXHJcbiAgICAgICAgaXNTaG93RGF0YTogdHJ1ZSxcclxuICAgICAgICBlcnJTdHI6IFwiXCIsXHJcbiAgICAgICAgYnRuVHh0OiBcIlwiLFxyXG4gICAgICAgIGFkSW1nU3JjOiBcIlwiLFxyXG4gICAgICAgIGFkVmlkZW9TcmM6IFwiXCJcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvbkluaXQoKSB7XHJcblxyXG4gICAgICB0aGlzLm5hdGl2ZS5hZFVuaXRJZCA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAubmF0aXZlQWRVbml0SWQ7XHJcblxyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uUmVhZHkob3B0aW9ucykge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCJuYXRpdmUgYWQgb25SZWFkeVwiKTtcclxuXHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VGbGFnID0gYXdhaXQgJHByb2Nlc3NEYXRhLmdldFN0b3JhZ2UoXCJfUFJJVkFDXCIpO1xyXG4gICAgICBpZiAoc3RvcmFnZUZsYWcpIHtcclxuICAgICAgICB0aGlzLnNob3dOYXRpdmVBZCgpO1xyXG4gICAgICB9IGVsc2UgeyAgIC8v5pyq5o6I5p2D77yM5by55Ye65o6I5p2D6K+i6ZeuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+aOiOadgz0gJywgc3RvcmFnZUZsYWcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmnKrmjojmnYMs5LiN5Yqg6L295Y6f55Sf5bm/5ZGKJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25TaG93KG9wdGlvbnMpIHtcclxuICAgICAgaWYgKHRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XHJcblxyXG4gICAgfSxcclxuICAgIGlzRG93bmxvYWRBZChjcmVhdGl2ZVR5cGUpIHtcclxuICAgICAgbGV0IGRvd25sb2FkVHlwZXMgPSBbMTAzLCAxMDYsIDEwNywgMTA4LCAxMDEsIDEwMiwgMTEwXTtcclxuICAgICAgcmV0dXJuIGRvd25sb2FkVHlwZXMuaW5jbHVkZXMoY3JlYXRpdmVUeXBlKTtcclxuICAgIH0sXHJcbiAgICBzaG93TmF0aXZlQWQoKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XHJcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwidGhlIGRldmljZSAgZG9lcyBub3Qgc3VwcG9ydCBhZC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdGl2ZUFkID0gJGFkLmNyZWF0ZU5hdGl2ZUFkKHsgYWRVbml0SWQ6IHRoaXMubmF0aXZlLmFkVW5pdElkIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKFwiYWQgZGF0YSBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmFkRGF0YSA9IGRhdGEuYWRMaXN0WzBdO1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuaW1nVXJsTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0WzBdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCIgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPVwiICsgdGhpcy5uYXRpdmUuYWRJbWdTcmMpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gdGhpcy5uYXRpdmUuYWREYXRhLmNsaWNrQnRuVHh0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm5hdGl2ZS5hZERhdGEudmlkZW9VcmxMaXN0ICYmIHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkVmlkZW9TcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubmF0aXZlLmVyclN0ciA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsb2FkIGFkIGVycm9yOlwiICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gSlNPTi5zdHJpbmdpZnkoZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXRpdmVBZC5sb2FkKCk7XHJcbiAgICB9LFxyXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcclxuICAgICAgaWYgKG5hdGl2ZUFkKSB7XHJcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWQgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVDbGljaygpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwiIOWOn+eUn+W5v+WRiuiiq+eCueWHu+S6hlwiICk7XHJcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgIGFkSWQ6IHRoaXMubmF0aXZlLmFkRGF0YS5hZElkXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy/ovazljJbkuIrkvKBcclxuICAgICAgJHV0aWxzLmdldENvbnZlcnRVcGxvYWQoKVxyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBsaXN0ZW5OYXRpdmVBZERvd25sb2FkU3RhdHVzKGRvd25sb2Fkc3RhdHVzKSB7XHJcbiAgICAgIGlmIChkb3dubG9hZHN0YXR1cyA9PT0gXCJJTlNUQUxMRURcIikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmJ0blR4dCA9IFwiT1BFTlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignc3RhcnQgZG93bmxvYWQgcmVzdWx0IGlzID0gJywgZXZlbnQucmVzdWx0Q29kZSlcclxuICAgIH0sXHJcbiAgICByZW1vdmVBZExpc3RlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5vZmZEb3dubG9hZFByb2dyZXNzKCk7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZCBvZmZFcnJvclwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZMb2FkKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlQWQgb2ZmTG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZTdGF0dXNDaGFuZ2VkKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQWRSU0EoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmi4bnpo/ooosnKTtcclxuXHJcbiAgICAgIHZhciBhZFR5cGUgPSAnTkFUSVZFJ1xyXG4gICAgICB2YXIgYWRJZCA9IHRoaXMubmF0aXZlLmFkVW5pdElkXHJcbiAgICAgIHZhciBjaGFubmVsID0gJydcclxuXHJcbiAgICAgIC8vIOaehOW7uuWPguaVsOWvueixoVxyXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgYWRUeXBlLFxyXG4gICAgICAgIGFkSWQsXHJcbiAgICAgICAgY2hhbm5lbCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgICRhcGlzLmV4YW1wbGUuY29tcGxldGVBZFJTQShwYXJhbXMpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2VtaXRFdnQnLCB7XHJcbiAgICAgICAgICBjb3VudDogcmVzLmRhdGEuY291bnRcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGDlrozmiJDlub/lkYotLS0tLS0tLS0tPiDlrozmiJDmrKHmlbDvvJoke3Jlcy5kYXRhLmNvdW50fSDlvZPmrKHlpZblirHvvJoke3Jlcy5kYXRhLmF3YXJkQW1vdW50fWApO1xyXG4gICAgICAgIHZhciBtZXMgPSAnJ1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5hd2FyZEFtb3VudCkge1xyXG4gICAgICAgICAgbWVzID0gJ+aBreWWnOiOt+W+lzAuMDHlhYPnuqLljIUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5jb3VudCA+IDgpIHtcclxuICAgICAgICAgICAgbWVzID0gJ+S7iuWkqea0u+WKqOasoeaVsOW3sueUqOWujCdcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lcyA9ICflho3mnaXkuIDmrKEnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRwcm9tcHQuc2hvd1RvYXN0KHtcclxuICAgICAgICAgIG1lc3NhZ2U6IG1lcyxcclxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIsICfngrnlh7vmi4bnpo/ooovplJnor68nKTtcclxuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiBKU09OLnBhcnNlKGVycikubWVzc2FnZSxcclxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfTtcclxuPC9zY3JpcHQ+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvYmdfY2hiLnBuZ1wiLFxuICAgIFwiYmFja2dyb3VuZFJlcGVhdFwiOiBcIm5vLXJlcGVhdFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMXB4XCJcbiAgfSxcbiAgXCIuY29uZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5kYWxpeVwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNTAwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMjU4cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNTRweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDhweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMzBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5pbWFnZV9maW5nZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIyMjJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMjIycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjQwMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjMwcHhcIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2FkL2ljb25fc3oucG5nXCIsXG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwiZmxvYXRcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMTUwMG1zXCIsXG4gICAgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiAtMVxuICB9LFxuICBcIkBLRVlGUkFNRVNcIjoge1xuICAgIFwiZmxvYXRcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIi02MHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIi02MHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCIuYnRtX3ZpZXdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MDBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYm90dG9tXCI6IFwiMTAwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaXRlbS1kaXZcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjE3MnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE2MnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2hiYmcucG5nXCJcbiAgfSxcbiAgXCIuaXRlbS1kaXYtdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiNkMzAwMDlcIixcbiAgICBcImZvbnRTaXplXCI6IFwiNjBweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIi00MHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuc3RhY2tzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU0MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzMDZweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDhweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDhweFwiXG4gIH0sXG4gIFwiLmFsZXJ0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmFkLXZpZGVvXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDE1cHhcIlxuICB9LFxuICBcIi5idG5cIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZGJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYWxpZ25TZWxmXCI6IFwiZmxleC1lbmRcIixcbiAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZHNvdXJjZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5hZHRpdGxlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgXCJ0b3BcIjogXCI3MnB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiYmFja1wiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2JhY2sucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICBcImxlZnRcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMjhweFwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIzNHB4XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLorqHmraXmmJ/nkINcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMzVweFwiLFxuICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIi0xMHB4XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiZGFsaXlcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2NzLnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICAgICAgICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTM0cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiNTJweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5yZWNlaXZlZENvdW50PT09MD8n5LuK5pel5qyh5pWw5bey55So5a6MJzon5LuK5pel5YWN6LS577yaJyl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCh0aGlzLnJlY2VpdmVkQ291bnQpKSsn5qyhJ31cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJlY2VpdmVkQ291bnQ+MCl9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjI4MnB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiMjgycHhcIixcbiAgICAgICAgXCJ0b3BcIjogXCI4MDBweFwiLFxuICAgICAgICBcImxlZnRcIjogXCIyNTBweFwiXG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwib3BlbmFkXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImJ0bV92aWV3XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImRhdGFJdGVtXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXRlbSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnF1b3RhTGlzdCl9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcIml0ZW0tZGl2XCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaXRlbS1kaXYtdGV4dFwiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2ZkLnBuZ1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmlkPT09MSl9LFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogXCIxNTBweFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJuYXRpdmUtYWRcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiZW1pdC1ldnRcIjogXCJlbWl0RXZ0XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY29uZXJcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nMil9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNjcycHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODAwcHhcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvYmdfY29uZXIucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNsb3NlSW1nXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2JnX2J1dC5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNTc1cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTc3cHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiNTAwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW1hZ2VfZmluZ2VyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJvcGVuYWRcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiaXRlbS1jb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwid2lkdGhcIjogXCI1MjhweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjcwOHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIndpZHRoXCI6IFwiMzQwcHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI5NHB4XCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjb21wbGV0ZUFkUlNBXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3cpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2xvc2VJbWdcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRWaWRlb1NyYyl9LFxuICAgICAgICAgICAgXCJhdXRvcGxheVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLXZpZGVvXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkSW1nU3JjKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dJbWcpfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW1nXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdGFydEJ1dHRvblwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCh0aGlzLm5hdGl2ZS5hZERhdGEuc291cmNlKSkrJyDlub/lkYonfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZHNvdXJjZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkRGF0YS50aXRsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkdGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW5hdGl2ZS1hZCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hdGl2ZUFEXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxhZFxcXFxuYXRpdmVBRFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9uYXRpdmUtYWQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vYWQvbmF0aXZlQUQvaW5kZXgudXg/bmFtZT1uYXRpdmUtYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPW5hdGl2ZS1hZCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfY2ZkXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX2NmZFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMS4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
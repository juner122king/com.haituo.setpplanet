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
    isShowTclayer: false,
    isbolckReturn: true,
    returnPage: '',
    countNow: 0,
    isShowLogin: false,
    isShowTclayerLogin: false,
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
  onInit: function (e) {
    this.getPopUps();
    $utils.saveHapUri(e);
    $utils.showBannerAd(0);
    this.isShowLogin = getApp().$def.dataApp.actiParam.oaid ? true : false;
    this.isShowTclayerOfBL();
    this.bolckReturn();
  },
  onReady(options) {
    this.getAdCount();
  },
  async onShow(options) {
    $umeng_stat.resume(this);
  },
  isShowTclayerOfBL() {
    if (!this.isShowLogin) {
      console.log('oaid为空,不执行透明层展示比例判断');
      return;
    }
    $apis.example.showTclayer().then(res => {
      console.log('页面透明比例判断:', res);
      this.isShowTclayerLogin = res.data;
      if (this.isShowTclayerLogin) {
        this.onpeShowTclayerLogin();
      }
    }).catch(err => {
      console.log(err, '页面透明比例判断错误');
      this.isShowTclayerLogin = false;
    });
  },
  async onpeShowTclayerLogin() {
    await $processData.resetTodayClicksIfNeeded();
    let count = await $processData.getStorage("todayClicks");
    this.showTclayer(count);
  },
  showTclayer(count) {
    if (!this.isShowTclayerLogin) {
      console.log('当前透明层执行比例分配为否,不执行透明层逻辑');
      return;
    }
    if (!count) {
      count = 0;
    }
    this.countNow = count;
    $apis.example.showTclayer({
      count: count
    }).then(res => {
      console.log('页面透明配置信息:', res);
      this.isShowTclayer = res.data;
    }).catch(err => {
      console.log(err, '页面透明配置信息错误');
      this.isShowTclayer = false;
    });
  },
  bolckReturn() {
    if (!this.isShowLogin) {
      console.log('oaid为空,不执行手势返回控制逻辑 ');
      return;
    }
    $apis.example.bolckReturn().then(res => {
      console.log('手势返回配置信息:', res);
      this.isbolckReturn = res.data.isReturn;
      this.returnPage = res.data.returnPage;
    }).catch(err => {
      console.log(err, '手势返回配置信息错误');
    });
  },
  onHide() {
    $umeng_stat.pause(this);
  },
  getAdCount() {
    $apis.example.getAdCount({
      adId: getApp().$def.dataApp.nativeAdUnitId,
      channel: ''
    }).then(res => {
      this.countT(res.data);
    });
  },
  getPopUps() {
    $apis.example.popUps().then(res => {
      this.openinterstitialAd(res.data);
    }).catch(err => {
      this.openinterstitialAd(false);
    });
  },
  openad() {
    this.showDialog = true;
    $utils.hideBanerAd();
  },
  openinterstitialAd(isAutoOpen) {
    const onCloseCallback = () => {
      console.log('插屏广告关闭了');
      if (isAutoOpen) {
        this.openad();
      }
    };
    const onCatchCallback = () => {
      console.log('插屏加载失败');
      if (isAutoOpen) {
        this.openad();
      }
    };
    $utils.tablePlaque(onCloseCallback, onCatchCallback);
  },
  async emitEvt(evt) {
    this.showDialog = false;
    this.countT(evt.detail.count);
    $utils.viewBanner();
    await $processData.incrementTodayClicks();
    this.showTclayer((await $processData.getStorage("todayClicks")) + 1);
  },
  emitClose() {
    this.showDialog = false;
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
    let u = 'Page_MainTab';
    if (this.returnPage) {
      u = this.returnPage;
    }
    $router.push({
      uri: u
    });
  },
  onBackPress() {
    return this.showDialog ? true : this.onReturnPage();
  },
  onReturnPage() {
    if (this.returnPage) {
      $router.push({
        uri: this.returnPage
      });
      return true;
    } else {
      return !this.isbolckReturn;
    }
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
    "marginTop": "-50px"
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
        "top": "122px",
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
            "show": function () {return (this.isbolckReturn)},
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
      "attr": {
        "showTclayer": function () {return (this.isShowTclayer)}
      },
      "shown": function () {return (this.showDialog)},
      "events": {
        "emit-evt": "emitEvt",
        "emit-close": "emitClose"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfY2ZkXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQWdJQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBR0E7QUFHQTtBQUVBO0FBRUE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyUUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvUGFnZV9jZmQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcUGFnZV9jZmRcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvYWQvbmF0aXZlQUQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcYWRcXG5hdGl2ZUFEXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9jZmQvaW5kZXgudXg/NDcxZCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXg/YmU3YyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9jZmQvaW5kZXgudXg/MDExNiIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXg/NzgzOCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXg/MTljNyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhZ2VfY2ZkL2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIjxpbXBvcnQgbmFtZT1cIm5hdGl2ZS1hZFwiIHNyYz1cIi4uL2FkL25hdGl2ZUFEXCI+PC9pbXBvcnQ+XHJcbjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMjJweDsgaGVpZ2h0OiA4MHB4OyB3aWR0aDogMTAwJVwiIG9uY2xpY2s9XCJiYWNrXCI+XHJcbiAgICAgIDxpbWFnZSBzaG93PVwie3tpc2JvbGNrUmV0dXJufX1cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMjBweDsgbWFyZ2luLWxlZnQ6IDEwcHg7IHdpZHRoOiAyOHB4OyBoZWlnaHQ6IDM0cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9iYWNrLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAzNXB4OyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IC0xMHB4XCI+6K6h5q2l5pif55CDPC90ZXh0PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHN0YWNrIGNsYXNzPVwiZGFsaXlcIj5cclxuICAgICAgPGltYWdlIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IHdpZHRoOiAxMzRweDsgaGVpZ2h0OiA1MnB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl9jcy5wbmdcIj48L2ltYWdlPlxyXG4gICAgICA8dGV4dD5cclxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZFwiPnt7IHJlY2VpdmVkQ291bnQgPT09IDAgPyAn5LuK5pel5qyh5pWw5bey55So5a6MJyA6ICfku4rml6XlhY3otLnvvJonIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlmPVwie3tyZWNlaXZlZENvdW50ID4gMH19XCIgc3R5bGU9XCJjb2xvcjogI2ZmZjsgZm9udC13ZWlnaHQ6IGJvbGRcIj57e3JlY2VpdmVkQ291bnR9feasoTwvc3Bhbj5cclxuICAgICAgPC90ZXh0PlxyXG4gICAgPC9zdGFjaz5cclxuICAgIDwhLS0gPHRleHQgaWY9XCJ7e2lzU2hvd0xvZ2lufX1cIiBzdHlsZT1cImNvbG9yOiAjZmZmOyBmb250LXdlaWdodDogYm9sZFwiPuW9k+WkqeW5v+WRiueCueWHu+asoeaVsO+8mnt7Y291bnROb3d9feasoTwvdGV4dD5cclxuICAgIDx0ZXh0IGlmPVwie3tpc1Nob3dMb2dpbn19XCIgc3R5bGU9XCJjb2xvcjogI2ZmZjsgZm9udC13ZWlnaHQ6IGJvbGRcIj7mmK/lkKblvIDlkK/ngrnlh7vlsYJ7e2lzU2hvd1RjbGF5ZXJ9fTwvdGV4dD4gLS0+XHJcbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMjgycHg7IGhlaWdodDogMjgycHg7IHRvcDogODAwcHg7IGxlZnQ6IDI1MHB4XCIgb25jbGljaz1cIm9wZW5hZFwiPjwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJidG1fdmlld1wiPlxyXG4gICAgICA8ZGl2IGZvcj1cInt7cXVvdGFMaXN0fX1cIiBkYXRhLWl0ZW09XCJ7e2l0ZW19fVwiPlxyXG4gICAgICAgIDxzdGFjayBjbGFzcz1cIml0ZW0tZGl2XCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIml0ZW0tZGl2LXRleHRcIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XHJcbiAgICAgICAgICA8aW1hZ2UgaWY9XCJ7eyRpdGVtLmlkPT09MX19XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB3aWR0aDogMTUwcHg7IGhlaWdodDogMTUwcHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2ZkLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgICAgPC9zdGFjaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmF0aXZlLWFkIGlmPVwie3tzaG93RGlhbG9nfX1cIiBvbmVtaXQtZXZ0PVwiZW1pdEV2dFwiIG9uZW1pdC1jbG9zZT1cImVtaXRDbG9zZVwiIHNob3ctdGNsYXllcj1cInt7aXNTaG93VGNsYXllcn19XCI+PC9uYXRpdmUtYWQ+XHJcblxyXG4gICAgPHN0YWNrIGNsYXNzPVwiY29uZXJcIiBpZj1cInt7c2hvd0RpYWxvZzJ9fVwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDY3MnB4OyBoZWlnaHQ6IDgwMHB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvYmdfY29uZXIucG5nKVwiPlxyXG4gICAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaW1hZ2U+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNTc1cHg7IGhlaWdodDogMTc3cHg7IG1hcmdpbi10b3A6IDUwMHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvYmdfYnV0LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaW1hZ2U+XHJcbiAgICA8L3N0YWNrPlxyXG4gICAgPGltYWdlIGNsYXNzPVwiaW1hZ2VfZmluZ2VyXCIgb25jbGljaz1cIm9wZW5hZFwiPjwvaW1hZ2U+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAuY29udGFpbmVyIHtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2FkL2JnX2NoYi5wbmcpO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIG1hcmdpbi10b3A6IC01MHB4O1xyXG4gIH1cclxuICAuY29uZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgfVxyXG4gIC5kYWxpeSB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIG1hcmdpbi10b3A6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDI1OHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZTlmZDY1LCAjOTVmZjM3IDEwMCUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTU0cHg7XHJcbiAgfVxyXG5cclxuICAuY2xvc2VJbWcge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAzMHB4O1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICB9XHJcbiAgLmltYWdlX2ZpbmdlciB7XHJcbiAgICB3aWR0aDogMjIycHg7XHJcbiAgICBoZWlnaHQ6IDIyMnB4O1xyXG4gICAgbWFyZ2luLXRvcDogNDAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvaWNvbl9zei5wbmcpO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsb2F0O1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxNTAwbXM7XHJcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICB9XHJcbiAgQGtleWZyYW1lcyBmbG9hdCB7XHJcbiAgICAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MHB4KTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICAgIH1cclxuICAgIDAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTYwcHgpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAuYnRtX3ZpZXcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgLml0ZW0tZGl2IHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxNzJweDtcclxuICAgIHdpZHRoOiAxNjJweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9hZC9pY29uX2hiYmcucG5nKTtcclxuICB9XHJcbiAgLml0ZW0tZGl2LXRleHQge1xyXG4gICAgY29sb3I6ICNkMzAwMDk7XHJcbiAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi10b3A6IC00MHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwcml2YXRlOiB7XHJcblxyXG5cclxuICAgICAgaXNTaG93VGNsYXllcjogZmFsc2UsIC8v5piv5ZCm5pi+56S65bm/5ZGK6YCP5piO54K55Ye75bGCIOWQjuWPsOWPguaVsFxyXG4gICAgICBpc2JvbGNrUmV0dXJuOiB0cnVlLCAvL+aYr+WQpuWPr+S7pei/lOWbnuaJi+WKvyDlkI7lj7Dlj4LmlbBcclxuICAgICAgcmV0dXJuUGFnZTogJycsLy/miYvlir/ov5Tlm57phY3nva7kv6Hmga8s6L+U5Zue6aG16Z2iXHJcbiAgICAgIGNvdW50Tm93OiAwLFxyXG5cclxuICAgICAgaXNTaG93TG9naW46IGZhbHNlLC8v5piv5ZCm5byA5ZCv5bm/5ZGK5ZCO5Y+w5Y+C5pWw6YC76L6RXHJcbiAgICAgIGlzU2hvd1RjbGF5ZXJMb2dpbjogZmFsc2UsLy/mmK/lkKblvIDlkK/lub/lkYrpobXpnaLpgI/mmI7lsYLphY3nva7pgLvovpFcclxuICAgICAgcXVvdGFMaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMC4xLFxyXG4gICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMC41LFxyXG4gICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMSxcclxuICAgICAgICAgIGlkOiA0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHNob3dEaWFsb2c6IGZhbHNlLFxyXG4gICAgICBzaG93RGlhbG9nMjogZmFsc2UsLy/mrKHmlbDlt7LnlKjlroznqpflj6NcclxuICAgICAgcmVjZWl2ZWRDb3VudDogOCwvL+WJqeS9measoeaVsFxyXG5cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkluaXQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAvL+iOt+WPluaYr+WQpuiHquWKqOW8ueeqly3mi4bnuqLljIVcclxuICAgICAgdGhpcy5nZXRQb3BVcHMoKVxyXG5cclxuICAgICAgLy/lpITnkIblm57kvKDpk77mjqVcclxuICAgICAgJHV0aWxzLnNhdmVIYXBVcmkoZSlcclxuICAgICAgLy/mmL7npLpiYW5uZXIg5bm/5ZGK6auY5bqm77yM5bqV6YOo57yp6L+bXHJcbiAgICAgICR1dGlscy5zaG93QmFubmVyQWQoMClcclxuICAgICAgLy9vYWlk5Li656m6LOS4jeaJp+ihjOW5v+WRiueCueWHu+aOp+WItumAu+i+kVxyXG4gICAgICB0aGlzLmlzU2hvd0xvZ2luID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbS5vYWlkID8gdHJ1ZSA6IGZhbHNlXHJcblxyXG5cclxuICAgICAgLy/pgI/mmI7lsYLlsZXnpLrmr5TkvovliKTmlq1cclxuICAgICAgdGhpcy5pc1Nob3dUY2xheWVyT2ZCTCgpXHJcbiAgICAgIC8v6I635Y+W5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvIFxyXG4gICAgICB0aGlzLmJvbGNrUmV0dXJuKClcclxuXHJcbiAgICB9LFxyXG4gICAgb25SZWFkeShvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWRDb3VudCgpLy/ljp/nlJ/lub/lkYrkvY3vvIzojrflj5bmrKHmlbBcclxuICAgIH0sXHJcbiAgICBhc3luYyBvblNob3cob3B0aW9ucykge1xyXG4gICAgICAkdW1lbmdfc3RhdC5yZXN1bWUodGhpcylcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v6YCP5piO5bGC5bGV56S65q+U5L6L5Yik5patXHJcbiAgICBpc1Nob3dUY2xheWVyT2ZCTCgpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2hvd0xvZ2luKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29haWTkuLrnqbos5LiN5omn6KGM6YCP5piO5bGC5bGV56S65q+U5L6L5Yik5patJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgJGFwaXMuZXhhbXBsZS5zaG93VGNsYXllcigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfpobXpnaLpgI/mmI7mr5TkvovliKTmlq06JywgcmVzKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1RjbGF5ZXJMb2dpbiA9IHJlcy5kYXRhXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93VGNsYXllckxvZ2luKSB7Ly/lvZPliY3pnIDopoHmiafooYzpgI/mmI7ngrnlh7vlsYLop4TliJlcclxuICAgICAgICAgIHRoaXMub25wZVNob3dUY2xheWVyTG9naW4oKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIsICfpobXpnaLpgI/mmI7mr5TkvovliKTmlq3plJnor68nKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1RjbGF5ZXJMb2dpbiA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaJp+ihjOmAj+aYjueCueWHu+WxguinhOWImSDmoLnmja7lvZPlpKnngrnlh7vmrKHmlbDliKTmlq1cclxuICAgIGFzeW5jIG9ucGVTaG93VGNsYXllckxvZ2luKCkge1xyXG5cclxuICAgICAgYXdhaXQgJHByb2Nlc3NEYXRhLnJlc2V0VG9kYXlDbGlja3NJZk5lZWRlZCgpLy/mo4Dmn6XmmK/lkKbpnIDopoHph43nva7lub/lkYrngrnlh7vmrKHmlbBcclxuICAgICAgbGV0IGNvdW50ID0gYXdhaXQgJHByb2Nlc3NEYXRhLmdldFN0b3JhZ2UoXCJ0b2RheUNsaWNrc1wiKVxyXG4gICAgICAvL+iOt+WPlumhtemdoumAj+aYjuWxgumFjee9ruS/oeaBr1xyXG4gICAgICB0aGlzLnNob3dUY2xheWVyKGNvdW50KVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W6aG16Z2i6YCP5piO5bGC6YWN572u5L+h5oGvIOS8oOasoeaVsFxyXG4gICAgc2hvd1RjbGF5ZXIoY291bnQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2hvd1RjbGF5ZXJMb2dpbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflvZPliY3pgI/mmI7lsYLmiafooYzmr5TkvovliIbphY3kuLrlkKYs5LiN5omn6KGM6YCP5piO5bGC6YC76L6RJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWNvdW50KSB7XHJcbiAgICAgICAgY291bnQgPSAwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCflvZPliY3lub/lkYrngrnlh7vmrKHmlbAnLCBjb3VudCk7XHJcblxyXG4gICAgICB0aGlzLmNvdW50Tm93ID0gY291bnRcclxuICAgICAgJGFwaXMuZXhhbXBsZS5zaG93VGNsYXllcih7XHJcbiAgICAgICAgY291bnQ6IGNvdW50Ly/ngrnlh7vlub/lkYrmrKHmlbAo6Z2e5b+F5aGrKSzmnInkvKDmiY3kvJrljLnphY3op4TliJlcclxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+mhtemdoumAj+aYjumFjee9ruS/oeaBrzonLCByZXMpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGNsYXllciA9IHJlcy5kYXRhXHJcblxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+mhtemdoumAj+aYjumFjee9ruS/oeaBr+mUmeivrycpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGNsYXllciA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGJvbGNrUmV0dXJuKCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNTaG93TG9naW4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb2FpZOS4uuepuizkuI3miafooYzmiYvlir/ov5Tlm57mjqfliLbpgLvovpEgJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICAvL+iOt+WPluaJi+WKv+i/lOWbnumFjee9ruS/oeaBr1xyXG4gICAgICAkYXBpcy5leGFtcGxlLmJvbGNrUmV0dXJuKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aJi+WKv+i/lOWbnumFjee9ruS/oeaBrzonLCByZXMpO1xyXG4gICAgICAgIHRoaXMuaXNib2xja1JldHVybiA9IHJlcy5kYXRhLmlzUmV0dXJuXHJcbiAgICAgICAgdGhpcy5yZXR1cm5QYWdlID0gcmVzLmRhdGEucmV0dXJuUGFnZVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+aJi+WKv+i/lOWbnumFjee9ruS/oeaBr+mUmeivrycpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25IaWRlKCkge1xyXG4gICAgICAkdW1lbmdfc3RhdC5wYXVzZSh0aGlzKTsvL+WcqG9uSGlkZeaWueazleeahOesrOS4gOihjOWKoOWFpeatpOS7o+eggVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5q+P5pel5qyh5pWwXHJcbiAgICBnZXRBZENvdW50KCkge1xyXG5cclxuICAgICAgJGFwaXMuZXhhbXBsZS5nZXRBZENvdW50KHtcclxuICAgICAgICBhZElkOiBnZXRBcHAoKS4kZGVmLmRhdGFBcHAubmF0aXZlQWRVbml0SWQsXHJcbiAgICAgICAgY2hhbm5lbDogJydcclxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+iOt+WPluavj+aXpeasoeaVsCcsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5jb3VudFQocmVzLmRhdGEpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W5piv5ZCm6Ieq5Yqo5by556qXLeaLhue6ouWMhVxyXG4gICAgZ2V0UG9wVXBzKCkge1xyXG4gICAgICAkYXBpcy5leGFtcGxlLnBvcFVwcygpXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgLy/lhYjmiZPlvIDmj5LlsY/lub/lkYogXHJcbiAgICAgICAgICB0aGlzLm9wZW5pbnRlcnN0aXRpYWxBZChyZXMuZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9wZW5pbnRlcnN0aXRpYWxBZChmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v5omT5byA5Y6f55Sf5bm/5ZGKXHJcbiAgICBvcGVuYWQoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IHRydWVcclxuICAgICAgJHV0aWxzLmhpZGVCYW5lckFkKClcclxuXHJcbiAgICB9LFxyXG4gICAgLy/miZPlvIDmj5LlsY/lub/lkYpcclxuICAgIG9wZW5pbnRlcnN0aXRpYWxBZChpc0F1dG9PcGVuKSB7XHJcbiAgICAgIGNvbnN0IG9uQ2xvc2VDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGK5YWz6Zet5LqGJyk7XHJcbiAgICAgICAgLy/liKTmlq3lkI7lj7DmmK/lkKbphY3nva7kuoboh6rliqjmiZPlvIDlvIDmi4bnuqLljIVcclxuICAgICAgICBpZiAoaXNBdXRvT3Blbikge1xyXG4gICAgICAgICAgdGhpcy5vcGVuYWQoKTsvL+aJk+W8gOaLhue6ouWMhVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvbkNhdGNoQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+WKoOi9veWksei0pScpO1xyXG4gICAgICAgIGlmIChpc0F1dG9PcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLm9wZW5hZCgpOy8v5omT5byA5ouG57qi5YyFXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8v5omT5byA5o+S5bGP5bm/5ZGKXHJcbiAgICAgICR1dGlscy50YWJsZVBsYXF1ZShvbkNsb3NlQ2FsbGJhY2ssIG9uQ2F0Y2hDYWxsYmFjaylcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZW1pdEV2dChldnQpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+aLhuemj+iii+WbnuiwgzplbWl0RXZ0KGV2dCknKTtcclxuXHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY291bnRUKGV2dC5kZXRhaWwuY291bnQpXHJcbiAgICAgICR1dGlscy52aWV3QmFubmVyKClcclxuXHJcblxyXG4gICAgICBhd2FpdCAkcHJvY2Vzc0RhdGEuaW5jcmVtZW50VG9kYXlDbGlja3MoKS8v5omn6KGM5LiA5qyh54K55Ye75bm/5ZGKXHJcbiAgICAgIC8v6I635Y+W6aG16Z2i6YCP5piO5bGC6YWN572u5L+h5oGvICDkvKDlhaXlvZPliY3ngrnlh7vmrKHmlbBcclxuICAgICAgdGhpcy5zaG93VGNsYXllcihhd2FpdCAkcHJvY2Vzc0RhdGEuZ2V0U3RvcmFnZShcInRvZGF5Q2xpY2tzXCIpICsgMSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXRDbG9zZSgpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+aLhuemj+iii+Wksei0pScpO1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cgPSBmYWxzZVxyXG4gICAgICAkdXRpbHMudmlld0Jhbm5lcigpXHJcbiAgICB9LFxyXG5cclxuICAgIGNvdW50VChjKSB7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRDb3VudCA9IE1hdGgubWluKDgsIE1hdGgubWF4KDAsIDggLSBjKSk7Ly9cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYmFjaygpXHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAkdXRpbHMuZGVzdHJveUJhbm5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiYWNrKCkge1xyXG4gICAgICBsZXQgdSA9ICdQYWdlX01haW5UYWInXHJcbiAgICAgIGlmICh0aGlzLnJldHVyblBhZ2UpIHtcclxuICAgICAgICB1ID0gdGhpcy5yZXR1cm5QYWdlXHJcbiAgICAgIH1cclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6IHVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb25CYWNrUHJlc3MoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNob3dEaWFsb2cgPyB0cnVlIDogdGhpcy5vblJldHVyblBhZ2UoKSAgICAvL+WmguaenG5hdGl2ZS1hZOaYvuekuuS6hu+8jOWwseS4jeiDvei/lOWbnumUrlxyXG4gICAgfSxcclxuXHJcbiAgICBvblJldHVyblBhZ2UoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdqdW1wTGluazonLCB0aGlzLnJldHVyblBhZ2UpO1xyXG4gICAgICBpZiAodGhpcy5yZXR1cm5QYWdlKSB7XHJcbiAgICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICAgIHVyaTogdGhpcy5yZXR1cm5QYWdlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNib2xja1JldHVyblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XHJcbiAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNTI4cHg7IGhlaWdodDogNzA4cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogMzQwcHg7IGhlaWdodDogOTRweFwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPjwvaW1hZ2U+XHJcbiAgICA8ZGl2IGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT5cclxuICAgICAgPHZpZGVvIGlkPVwidmlkZW9cIiBpZj1cIm5hdGl2ZS5pc1Nob3dWaWRlb1wiIHNyYz1cInt7bmF0aXZlLmFkVmlkZW9TcmN9fVwiIGF1dG9wbGF5PVwidHJ1ZVwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCIgY2xhc3M9XCJhZC12aWRlb1wiPjwvdmlkZW8+XHJcbiAgICAgIDxzdGFjayBjbGFzcz1cInN0YWNrc3R5bGVcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxyXG4gICAgICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dJbWdcIiBjbGFzcz1cImltZ1wiIHNyYz1cInt7bmF0aXZlLmFkSW1nU3JjfX1cIj48L2ltYWdlPlxyXG4gICAgICAgIDxhZC1idXR0b24gY2xhc3M9XCJhZGJ0blwiIG9uY2xpY2s9XCJzdGFydEJ1dHRvbigpXCIgdmFsdWV0eXBlPVwiMFwiIGFkdW5pdGlkPVwie3tuYXRpdmUuYWRVbml0SWR9fVwiIGFkaWQ9XCJ7e25hdGl2ZS5hZERhdGEuYWRJZH19XCI+PC9hZC1idXR0b24+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHNvdXJjZVwiPnt7IG5hdGl2ZS5hZERhdGEuc291cmNlIH19IOW5v+WRijwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkdGl0bGVcIj57eyBuYXRpdmUuYWREYXRhLnRpdGxlIH19PC90ZXh0PlxyXG4gICAgICA8L3N0YWNrPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGlmPVwie3tzaG93VGNsYXllcn19XCIgY2xhc3M9XCJ0Yy1sYXllclwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAudGMtbGF5ZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDg1MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICB9XHJcblxyXG4gIC5pdGVtLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5zdGFja3N0eWxlIHtcclxuICAgIHdpZHRoOiA1NDBweDtcclxuICAgIGhlaWdodDogMzA2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gIH1cclxuICAuY2xvc2VJbWcge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gIH1cclxuICAuYWxlcnQge1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYWQtdmlkZW8ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQxNXB4O1xyXG4gIH1cclxuICAuYnRuIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiZmZmO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcbiAgLmJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkYnRuIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIC5hZGJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkc291cmNlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgfVxyXG4gIC5hZHRpdGxlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGxldCBuYXRpdmVBZDtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBwcm9wczoge1xyXG5cclxuICAgICAgc2hvd1RjbGF5ZXI6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgY29tcG9uZW50TmFtZTogXCJhZFwiLFxyXG4gICAgICBwcm92aWRlcjogXCJcIixcclxuICAgICAgbmF0aXZlOiB7XHJcbiAgICAgICAgYWRVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgaXNTaG93OiBmYWxzZSxcclxuICAgICAgICBhZERhdGE6IHt9LFxyXG4gICAgICAgIGlzU2hvd0ltZzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dWaWRlbzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dEYXRhOiB0cnVlLFxyXG4gICAgICAgIGVyclN0cjogXCJcIixcclxuICAgICAgICBidG5UeHQ6IFwiXCIsXHJcbiAgICAgICAgYWRJbWdTcmM6IFwiXCIsXHJcbiAgICAgICAgYWRWaWRlb1NyYzogXCJcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uSW5pdCgpIHtcclxuXHJcbiAgICAgIHRoaXMubmF0aXZlLmFkVW5pdElkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLm5hdGl2ZUFkVW5pdElkXHJcblxyXG4gICAgICAvLyB0aGlzLm5hdGl2ZS5hZFVuaXRJZCA9ICd2NWg1eHNrbHAyJ1xyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uUmVhZHkob3B0aW9ucykge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCJuYXRpdmUgYWQgb25SZWFkeVwiKTtcclxuICAgICAgdGhpcy5zaG93TmF0aXZlQWQoKTtcclxuICAgICAgLy8gY29uc3Qgc3RvcmFnZUZsYWcgPSBhd2FpdCAkcHJvY2Vzc0RhdGEuZ2V0U3RvcmFnZShcIl9QUklWQUNcIik7XHJcbiAgICAgIC8vIGlmIChzdG9yYWdlRmxhZykge1xyXG4gICAgICAvLyAgIHRoaXMuc2hvd05hdGl2ZUFkKCk7XHJcbiAgICAgIC8vIH0gZWxzZSB7ICAgLy/mnKrmjojmnYPvvIzlvLnlh7rmjojmnYPor6Lpl65cclxuICAgICAgLy8gICBjb25zb2xlLmxvZygn55So5oi35o6I5p2DPSAnLCBzdG9yYWdlRmxhZyk7XHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ+acquaOiOadgyzkuI3liqDovb3ljp/nlJ/lub/lkYonKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgIH0sXHJcbiAgICBvblNob3cob3B0aW9ucykge1xyXG4gICAgICBpZiAodGhpcy5uYXRpdmUuaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRBZFByb3ZpZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMucHJvdmlkZXIgPSAkYWQuZ2V0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9LFxyXG4gICAgaXNEb3dubG9hZEFkKGNyZWF0aXZlVHlwZSkge1xyXG4gICAgICBsZXQgZG93bmxvYWRUeXBlcyA9IFsxMDMsIDEwNiwgMTA3LCAxMDgsIDEwMSwgMTAyLCAxMTBdO1xyXG4gICAgICByZXR1cm4gZG93bmxvYWRUeXBlcy5pbmNsdWRlcyhjcmVhdGl2ZVR5cGUpO1xyXG4gICAgfSxcclxuICAgIHNob3dOYXRpdmVBZCgpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcclxuICAgICAgaWYgKHRoaXMucHJvdmlkZXIgIT09IFwiaHVhd2VpXCIpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5uYXRpdmUuYWRVbml0SWQgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uTG9hZChkYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuYWREYXRhID0gZGF0YS5hZExpc3RbMF07XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLmltZ1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIiB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9XCIgKyB0aGlzLm5hdGl2ZS5hZEltZ1NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5jbGlja0J0blR4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSB0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3QgJiYgdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImxvYWQgYWQgZXJyb3I6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5lcnJTdHIgPSBKU09OLnN0cmluZ2lmeShlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVTaG93KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCIg5Y6f55Sf5bm/5ZGK6KKr54K55Ye75LqGXCIpO1xyXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcclxuICAgICAgICBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8v6L2s5YyW5LiK5LygXHJcbiAgICAgICR1dGlscy5nZXRDb252ZXJ0VXBsb2FkKClcclxuXHJcbiAgICAgIC8v5bm/5ZGK5oiW6YCP5piO5bGC6KKr54K55Ye75ZCO6ZqQ6JeP6YCP5piO5bGCXHJcbiAgICAgIHRoaXMuc2hvd1RjbGF5ZXIgPSBmYWxzZVxyXG5cclxuICAgIH0sXHJcbiAgICBsaXN0ZW5OYXRpdmVBZERvd25sb2FkU3RhdHVzKGRvd25sb2Fkc3RhdHVzKSB7XHJcbiAgICAgIGlmIChkb3dubG9hZHN0YXR1cyA9PT0gXCJJTlNUQUxMRURcIikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmJ0blR4dCA9IFwiT1BFTlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignc3RhcnQgZG93bmxvYWQgcmVzdWx0IGlzID0gJywgZXZlbnQucmVzdWx0Q29kZSlcclxuICAgIH0sXHJcbiAgICByZW1vdmVBZExpc3RlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5vZmZEb3dubG9hZFByb2dyZXNzKCk7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZCBvZmZFcnJvclwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZMb2FkKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlQWQgb2ZmTG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZTdGF0dXNDaGFuZ2VkKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQWRSU0EoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmi4bnpo/ooosnKTtcclxuXHJcbiAgICAgIC8v5YWI5Yik5pat5bm/5ZGK5rKh5pyJ5rKh5Yqg6L295Ye65p2l77yM5rKh5pyJ5bCx55u05o6l6L+U5Zue5LiN5omn6KGM5o6l5Y+jXHJcblxyXG4gICAgICBpZiAoIXRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflub/lkYrlsZXnpLrkuI3miJDlip8s5ouG57qi5YyF5LiN5oiQ5YqfJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogJ+aLhue6ouWMheWksei0pe+8geivt+mHjeivlScsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgdmFyIGFkVHlwZSA9ICdOQVRJVkUnXHJcbiAgICAgIHZhciBhZElkID0gdGhpcy5uYXRpdmUuYWRVbml0SWRcclxuICAgICAgdmFyIGNoYW5uZWwgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY2hhbm5lbFxyXG4gICAgICB2YXIgY291bnRNYXggPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY291bnRNYXhcclxuICAgICAgdmFyIGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kXHJcbiAgICAgIHZhciBvYWlkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbS5vYWlkXHJcbiAgICAgIHZhciBpbmZvID0gJGRldmljZS5nZXRJbmZvU3luYygpO1xyXG4gICAgICB2YXIgdWEgPSAnJ1xyXG4gICAgICAvLyDnoa7kv50gdWEg5a+56LGh5YyF5ZCr5omA6ZyA55qE5Y+C5pWwXHJcbiAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgdWEgPSBgJHtpbmZvLm1vZGVsfSwgJHtpbmZvLnByb2R1Y3R9LCAke2luZm8ubWFudWZhY3R1cmVyfSwgJHtpbmZvLm9zVHlwZX1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VhIOWvueixoeacquWumuS5ieaIluS4jeWMheWQq+aJgOmcgOeahOWPguaVsCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaFvYWlkOiR7b2FpZH0gIOaehOW7uuWPguaVsOWvueixoXVhOiR7dWF9YCk7XHJcbiAgICAgIC8vIOaehOW7uuWPguaVsOWvueixoVxyXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgYWRUeXBlLFxyXG4gICAgICAgIGFkSWQsXHJcbiAgICAgICAgY2hhbm5lbCxcclxuICAgICAgICBjb3VudE1heCxcclxuICAgICAgICBicmFuZCxcclxuICAgICAgICBvYWlkLFxyXG4gICAgICAgIHVhXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaE6JHtwYXJhbXN9YCk7XHJcbiAgICAgICRhcGlzLmV4YW1wbGUuY29tcGxldGVBZFJTQShwYXJhbXMpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhg5a6M5oiQ5bm/5ZGKLS0tLS0tLS0tLT4ganVtcExpbms6JHtyZXMuZGF0YS5qdW1wTGlua30sIOWujOaIkOasoeaVsO+8miR7cmVzLmRhdGEuY291bnR9IOW9k+asoeWlluWKse+8miR7cmVzLmRhdGEuYXdhcmRBbW91bnR9YCk7XHJcblxyXG4gICAgICAgIC8v5YWI5Yik5pat5pyJ5rKh5pyJ6L+U5Zue6Lez6L2s6ZO+5o6l77yM5pyJ5bCx6LezXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmp1bXBMaW5rKSB7XHJcbiAgICAgICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgICB1cmk6IHJlcy5kYXRhLmp1bXBMaW5rXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBtZXMgPSAnJ1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmF3YXJkQW1vdW50KSB7XHJcbiAgICAgICAgICAgIG1lcyA9ICfmga3llpzojrflvpcwLjAx5YWD57qi5YyFJ1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvdW50ID4gOCkge1xyXG4gICAgICAgICAgICAgIG1lcyA9ICfku4rlpKnmtLvliqjmrKHmlbDlt7LnlKjlrownXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVzID0gJ+WGjeadpeS4gOasoSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXMsXHJcbiAgICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnZW1pdEV2dCcsIHtcclxuICAgICAgICAgIGNvdW50OiByZXMuZGF0YS5jb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn54K55Ye75ouG56aP6KKL6ZSZ6K+vJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogSlNPTi5wYXJzZShlcnIpLm1lc3NhZ2UsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9iZ19jaGIucG5nXCIsXG4gICAgXCJiYWNrZ3JvdW5kUmVwZWF0XCI6IFwibm8tcmVwZWF0XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItNTBweFwiXG4gIH0sXG4gIFwiLmNvbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuZGFsaXlcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUwMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjI1OHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiOTBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNlOWZkNjVcXFwiLFxcXCIjOTVmZjM3IDEwMCVcXFwiXX1dfVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTU0cHhcIlxuICB9LFxuICBcIi5jbG9zZUltZ1wiOiB7XG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjQ4cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQ4cHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjMwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuaW1hZ2VfZmluZ2VyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjIycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjIyMnB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0MDBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIzMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3N6LnBuZ1wiLFxuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcImZsb2F0XCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjE1MDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogLTFcbiAgfSxcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcImZsb2F0XCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCItNjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA1MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCItNjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA1MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiLmJ0bV92aWV3XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTAwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiBcIjEwMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLml0ZW0tZGl2XCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxNzJweFwiLFxuICAgIFwid2lkdGhcIjogXCIxNjJweFwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9oYmJnLnBuZ1wiXG4gIH0sXG4gIFwiLml0ZW0tZGl2LXRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjZDMwMDA5XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjYwcHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItNDBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLnRjLWxheWVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODUwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiBcIjEwMHB4XCJcbiAgfSxcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuc3RhY2tzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU0MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzMDZweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDhweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDhweFwiXG4gIH0sXG4gIFwiLmFsZXJ0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmFkLXZpZGVvXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDE1cHhcIlxuICB9LFxuICBcIi5idG5cIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZGJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYWxpZ25TZWxmXCI6IFwiZmxleC1lbmRcIixcbiAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZHNvdXJjZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5hZHRpdGxlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiOiBcIjIwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgXCJ0b3BcIjogXCIxMjJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImJhY2tcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNib2xja1JldHVybil9LFxuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9iYWNrLnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzRweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6K6h5q2l5pif55CDXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjM1cHhcIixcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCItMTBweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImRhbGl5XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9jcy5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEzNHB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjUycHhcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucmVjZWl2ZWRDb3VudD09PTA/J+S7iuaXpeasoeaVsOW3sueUqOWujCc6J+S7iuaXpeWFjei0ue+8micpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy5yZWNlaXZlZENvdW50KSkrJ+asoSd9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5yZWNlaXZlZENvdW50PjApfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgIFwid2lkdGhcIjogXCIyODJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjI4MnB4XCIsXG4gICAgICAgIFwidG9wXCI6IFwiODAwcHhcIixcbiAgICAgICAgXCJsZWZ0XCI6IFwiMjUwcHhcIlxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5hZFwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJidG1fdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJkYXRhSXRlbVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLml0ZW0pfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5xdW90YUxpc3QpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpdGVtLWRpdlwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIml0ZW0tZGl2LXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9mZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5pZD09PTEpfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTUwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibmF0aXZlLWFkXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dUY2xheWVyXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaG93VGNsYXllcil9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dEaWFsb2cpfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJlbWl0LWV2dFwiOiBcImVtaXRFdnRcIixcbiAgICAgICAgXCJlbWl0LWNsb3NlXCI6IFwiZW1pdENsb3NlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY29uZXJcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nMil9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNjcycHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODAwcHhcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvYmdfY29uZXIucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNsb3NlSW1nXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2JnX2J1dC5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNTc1cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTc3cHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiNTAwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW1hZ2VfZmluZ2VyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJvcGVuYWRcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiaXRlbS1jb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwid2lkdGhcIjogXCI1MjhweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjcwOHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIndpZHRoXCI6IFwiMzQwcHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI5NHB4XCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjb21wbGV0ZUFkUlNBXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3cpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2xvc2VJbWdcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRWaWRlb1NyYyl9LFxuICAgICAgICAgICAgXCJhdXRvcGxheVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLXZpZGVvXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkSW1nU3JjKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dJbWcpfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW1nXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdGFydEJ1dHRvblwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCh0aGlzLm5hdGl2ZS5hZERhdGEuc291cmNlKSkrJyDlub/lkYonfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZHNvdXJjZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkRGF0YS50aXRsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkdGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VGNsYXllcil9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRjLWxheWVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW5hdGl2ZS1hZCEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hdGl2ZUFEXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxhZFxcXFxuYXRpdmVBRFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9uYXRpdmUtYWQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vYWQvbmF0aXZlQUQvaW5kZXgudXg/bmFtZT1uYXRpdmUtYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPW5hdGl2ZS1hZCEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfY2ZkXFxcXGluZGV4LnV4IS4uLy4uLy4uLy4uL1Byb2dyYW0gRmlsZXMvSHVhd2VpIFF1aWNrQXBwIElERS9yZXNvdXJjZXMvYXBwL2V4dGVuc2lvbnMvZGV2ZWNvLWRlYnVnL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX2NmZFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vUHJvZ3JhbSBGaWxlcy9IdWF3ZWkgUXVpY2tBcHAgSURFL3Jlc291cmNlcy9hcHAvZXh0ZW5zaW9ucy9kZXZlY28tZGVidWcvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEh1YXdlaSBRdWlja0FwcCBJREVcXFxccmVzb3VyY2VzXFxcXGFwcFxcXFxleHRlbnNpb25zXFxcXGRldmVjby1kZWJ1Z1xcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIdWF3ZWkgUXVpY2tBcHAgSURFXFxcXHJlc291cmNlc1xcXFxhcHBcXFxcZXh0ZW5zaW9uc1xcXFxkZXZlY28tZGVidWdcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSHVhd2VpIFF1aWNrQXBwIElERVxcXFxyZXNvdXJjZXNcXFxcYXBwXFxcXGV4dGVuc2lvbnNcXFxcZGV2ZWNvLWRlYnVnXFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9Qcm9ncmFtIEZpbGVzL0h1YXdlaSBRdWlja0FwcCBJREUvcmVzb3VyY2VzL2FwcC9leHRlbnNpb25zL2RldmVjby1kZWJ1Zy9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMS4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
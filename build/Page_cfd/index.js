(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    receivedCount: 8,
    sysclickCount: -1,
    userAdclickCount: 0
  },
  onInit: function (e) {
    $utils.saveHapUri(e);
    this.isShowLogin = getApp().$def.dataApp.actiParam.callback ? true : false;
    this.isShowTclayerOfBL();
    this.bolckReturn();
    this.getPopUps();
    this.getClickCount();
  },
  onReady(options) {
    this.getAdCount();
  },
  async onShow(options) {
    $umeng_stat.resume(this);
  },
  isShowTclayerOfBL() {
    if (!this.isShowLogin) {
      console.log('callback为空,不执行透明层展示比例判断');
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
      console.log('callback为空,不执行手势返回控制逻辑 ');
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
  getClickCount() {
    if (!this.isShowLogin) {
      console.log('callback为空,不执行后台设置的 转化点击次数');
      return;
    }
    const param = getApp().$def.dataApp.actiParam;
    console.log('转化点击次数 参数param= ', param);
    $apis.example.clickCount({
      type: param.type || 'jh',
      channelValue: param.channelValue,
      corpId: param.corp_id
    }).then(res => {
      console.log('转化点击次数配置信息:', res);
      this.sysclickCount = res.data;
    }).catch(err => {
      console.log(err, '转化点击次数配置信息错误');
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
      this.openinterstitialAd(res.data, false);
    }).catch(err => {
      this.openinterstitialAd(false, false);
    });
  },
  isOpenAd(isAutoOpen) {
    setTimeout(() => {
      if (isAutoOpen) {
        this.openad();
      }
    }, 800);
  },
  openad() {
    this.showDialog = true;
  },
  openinterstitialAd(isAutoOpen, isOpenInterAd) {
    if (isOpenInterAd) {
      const onCloseCallback = () => {
        console.log('插屏广告关闭了');
        this.isOpenAd(isAutoOpen);
      };
      const onCatchCallback = () => {
        console.log('插屏加载失败');
        this.isOpenAd(isAutoOpen);
      };
      $utils.tablePlaque(onCloseCallback, onCatchCallback);
    } else {
      this.isOpenAd(true);
    }
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
  },
  addAdc() {
    this.userAdclickCount += 1;
    console.log('后台配置转化点击次数：', this.sysclickCount, ',本次跳转 广告点击总数: ', this.userAdclickCount);
    if (this.sysclickCount === this.userAdclickCount) {
      $utils.getConvertUpload();
    } else {
      console.log('广告点击次数不匹配，不转化');
    }
  },
  showNvad() {
    if (this.sysclickCount === 0) {
      $utils.getConvertUpload();
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/naBannerAd/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/naBannerAd/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

let nativeAd;
module.exports = {
  data: {
    componentName: "adbnner",
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
    this.native.adUnitId = getApp().$def.dataApp.nAbannerAdUnitId;
  },
  async onReady(options) {
    console.info("nativeBanner ad onReady");
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./src/Page_cfd/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!./src/Page_cfd/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".container": {
    "alignItems": "center",
    "flexDirection": "column",
    "backgroundImage": "/Common/img/ad/bg_chb.png",
    "backgroundRepeat": "no-repeat",
    "marginTop": "0px"
  },
  ".nbad": {
    "position": "absolute",
    "bottom": "0px"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\naBannerAd\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\naBannerAd\\index.ux!./src/ad/naBannerAd/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\naBannerAd\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\naBannerAd\index.ux!./src/ad/naBannerAd/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".item-container": {
    "justifyContent": "center",
    "alignItems": "center",
    "height": "256px",
    "width": "100%",
    "flexDirection": "column",
    "position": "fixed"
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
    "backgroundSize": "100%",
    "borderRadius": "0px"
  },
  ".closeImg-pos": {
    "width": "36px",
    "height": "36px",
    "position": "absolute",
    "top": "0px",
    "right": "50px"
  },
  ".closeImg": {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "36px",
    "height": "36px"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux ***!
  \**********************************************************************************************************************************************************************************************************/
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
        "emit-close": "emitClose",
        "add-adc": "addAdc",
        "show-nvad": "showNvad"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux ***!
  \***********************************************************************************************************************************************************************************************************************/
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

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=nativebanner-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/naBannerAd/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=nativebanner-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/naBannerAd/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "item-container"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.native.isShow)},
      "classList": [
        "container"
      ],
      "children": [
        {
          "type": "stack",
          "attr": {},
          "classList": [
            "stackstyle"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return (this.native.adImgSrc)}
              },
              "shown": function () {return (this.native.isShowImg)},
              "classList": [
                "img"
              ],
              "events": {
                "click": "reportNativeClick"
              }
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
              ]
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
      "type": "image",
      "attr": {
        "src": "/Common/img/ad/icon_x.png"
      },
      "shown": function () {return (this.native.isShow)},
      "classList": [
        "closeImg-pos"
      ],
      "events": {
        "click": "closeAd"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/naBannerAd/index.ux?name=nativebanner-ad":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/naBannerAd/index.ux?name=nativebanner-ad ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=nativebanner-ad!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=nativebanner-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/naBannerAd/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\naBannerAd\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\naBannerAd\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\naBannerAd\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\naBannerAd\\index.ux!./src/ad/naBannerAd/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/naBannerAd/index.ux")

$app_define$('@app-component/nativebanner-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD\\index.ux!./src/ad/nativeAD/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD/index.ux")

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
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/nativeAD/index.ux?name=native-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad")
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/naBannerAd/index.ux?name=nativebanner-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/naBannerAd/index.ux?name=nativebanner-ad")
var $app_template$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd\\index.ux!./src/Page_cfd/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfY2ZkXFxpbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQXVJQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBSUE7QUFJQTtBQUVBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUdBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xXQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlGQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL1BhZ2VfY2ZkL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfY2ZkXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vc3JjL2FkL25hQmFubmVyQWQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcYWRcXG5hQmFubmVyQWRcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvYWQvbmF0aXZlQUQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcYWRcXG5hdGl2ZUFEXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9jZmQvaW5kZXgudXg/Njc1OCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmFCYW5uZXJBZC9pbmRleC51eD82YTE3Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD9iOTI5Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX2NmZC9pbmRleC51eD9lMTJkIiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD8yYWE3Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYUJhbm5lckFkL2luZGV4LnV4PzBlMzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hQmFubmVyQWQvaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hdGl2ZUFEL2luZGV4LnV4PzY1YjEiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9QYWdlX2NmZC9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyI8aW1wb3J0IG5hbWU9XCJuYXRpdmUtYWRcIiBzcmM9XCIuLi9hZC9uYXRpdmVBRFwiPjwvaW1wb3J0PlxyXG48aW1wb3J0IG5hbWU9XCJuYXRpdmViYW5uZXItYWRcIiBzcmM9XCIuLi9hZC9uYUJhbm5lckFkXCI+PC9pbXBvcnQ+XHJcbjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA3MnB4OyBoZWlnaHQ6IDgwcHg7IHdpZHRoOiAxMDAlXCIgb25jbGljaz1cImJhY2tcIj5cclxuICAgICAgPGltYWdlIHNob3c9XCJ7e2lzYm9sY2tSZXR1cm59fVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAyMHB4OyBtYXJnaW4tbGVmdDogMTBweDsgd2lkdGg6IDI4cHg7IGhlaWdodDogMzRweFwiIHNyYz1cIi9Db21tb24vaW1nL2JhY2sucG5nXCI+PC9pbWFnZT5cclxuICAgICAgPHRleHQgc3R5bGU9XCJmb250LXNpemU6IDM1cHg7IGNvbG9yOiAjMDAwMDAwOyBtYXJnaW4tbGVmdDogLTEwcHhcIj7orqHmraXmmJ/nkIM8L3RleHQ+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8c3RhY2sgY2xhc3M9XCJkYWxpeVwiPlxyXG4gICAgICA8aW1hZ2Ugc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogMDsgd2lkdGg6IDEzNHB4OyBoZWlnaHQ6IDUycHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2NzLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgIDx0ZXh0PlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDAwMDA7IGZvbnQtd2VpZ2h0OiBib2xkXCI+e3sgcmVjZWl2ZWRDb3VudCA9PT0gMCA/ICfku4rml6XmrKHmlbDlt7LnlKjlrownIDogJ+S7iuaXpeWFjei0ue+8micgfX08L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gaWY9XCJ7e3JlY2VpdmVkQ291bnQgPiAwfX1cIiBzdHlsZT1cImNvbG9yOiAjZmZmOyBmb250LXdlaWdodDogYm9sZFwiPnt7cmVjZWl2ZWRDb3VudH195qyhPC9zcGFuPlxyXG4gICAgICA8L3RleHQ+XHJcbiAgICA8L3N0YWNrPlxyXG4gICAgPCEtLSA8dGV4dCBpZj1cInt7aXNTaG93TG9naW59fVwiIHN0eWxlPVwiY29sb3I6ICNmZmY7IGZvbnQtd2VpZ2h0OiBib2xkXCI+5b2T5aSp5bm/5ZGK54K55Ye75qyh5pWw77yae3tjb3VudE5vd3195qyhPC90ZXh0PlxyXG4gICAgPHRleHQgaWY9XCJ7e2lzU2hvd0xvZ2lufX1cIiBzdHlsZT1cImNvbG9yOiAjZmZmOyBmb250LXdlaWdodDogYm9sZFwiPuaYr+WQpuW8gOWQr+eCueWHu+Wxgnt7aXNTaG93VGNsYXllcn19PC90ZXh0PiAtLT5cclxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAyODJweDsgaGVpZ2h0OiAyODJweDsgdG9wOiA4MDBweDsgbGVmdDogMjUwcHhcIiBvbmNsaWNrPVwib3BlbmFkXCI+PC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImJ0bV92aWV3XCI+XHJcbiAgICAgIDxkaXYgZm9yPVwie3txdW90YUxpc3R9fVwiIGRhdGEtaXRlbT1cInt7aXRlbX19XCI+XHJcbiAgICAgICAgPHN0YWNrIGNsYXNzPVwiaXRlbS1kaXZcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiaXRlbS1kaXYtdGV4dFwiPnt7JGl0ZW0udGl0bGV9fTwvdGV4dD5cclxuICAgICAgICAgIDxpbWFnZSBpZj1cInt7JGl0ZW0uaWQ9PT0xfX1cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDIwcHg7IHdpZHRoOiAxNTBweDsgaGVpZ2h0OiAxNTBweFwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2ljb25fZmQucG5nXCI+PC9pbWFnZT5cclxuICAgICAgICA8L3N0YWNrPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuYXRpdmUtYWQgaWY9XCJ7e3Nob3dEaWFsb2d9fVwiIG9uZW1pdC1ldnQ9XCJlbWl0RXZ0XCIgb25lbWl0LWNsb3NlPVwiZW1pdENsb3NlXCIgc2hvdy10Y2xheWVyPVwie3tpc1Nob3dUY2xheWVyfX1cIiBvbmFkZC1hZGM9XCJhZGRBZGNcIiBvbnNob3ctbnZhZD1cInNob3dOdmFkXCI+PC9uYXRpdmUtYWQ+XHJcblxyXG4gICAgPHN0YWNrIGNsYXNzPVwiY29uZXJcIiBpZj1cInt7c2hvd0RpYWxvZzJ9fVwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDY3MnB4OyBoZWlnaHQ6IDgwMHB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvYmdfY29uZXIucG5nKVwiPlxyXG4gICAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaW1hZ2U+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aW1hZ2Ugc3R5bGU9XCJ3aWR0aDogNTc1cHg7IGhlaWdodDogMTc3cHg7IG1hcmdpbi10b3A6IDUwMHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvYmdfYnV0LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaW1hZ2U+XHJcbiAgICA8L3N0YWNrPlxyXG4gICAgPGltYWdlIGNsYXNzPVwiaW1hZ2VfZmluZ2VyXCIgb25jbGljaz1cIm9wZW5hZFwiPjwvaW1hZ2U+XHJcblxyXG4gICAgPCEtLSA8bmF0aXZlYmFubmVyLWFkIGNsYXNzPVwibmJhZFwiIG9uYWRkLWFkYz1cImFkZEFkY1wiIG9uc2hvdy1udmFkPVwic2hvd052YWRcIj48L25hdGl2ZWJhbm5lci1hZD4gLS0+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAuY29udGFpbmVyIHtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2FkL2JnX2NoYi5wbmcpO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICB9XHJcbiAgLm5iYWQge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gIH1cclxuICAuY29uZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgfVxyXG4gIC5kYWxpeSB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIG1hcmdpbi10b3A6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDI1OHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZTlmZDY1LCAjOTVmZjM3IDEwMCUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTU0cHg7XHJcbiAgfVxyXG5cclxuICAuY2xvc2VJbWcge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAzMHB4O1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICB9XHJcbiAgLmltYWdlX2ZpbmdlciB7XHJcbiAgICB3aWR0aDogMjIycHg7XHJcbiAgICBoZWlnaHQ6IDIyMnB4O1xyXG4gICAgbWFyZ2luLXRvcDogNDAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvaWNvbl9zei5wbmcpO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IGZsb2F0O1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxNTAwbXM7XHJcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICB9XHJcbiAgQGtleWZyYW1lcyBmbG9hdCB7XHJcbiAgICAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MHB4KTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICAgIH1cclxuICAgIDAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTYwcHgpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAuYnRtX3ZpZXcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgLml0ZW0tZGl2IHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxNzJweDtcclxuICAgIHdpZHRoOiAxNjJweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9hZC9pY29uX2hiYmcucG5nKTtcclxuICB9XHJcbiAgLml0ZW0tZGl2LXRleHQge1xyXG4gICAgY29sb3I6ICNkMzAwMDk7XHJcbiAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi10b3A6IC00MHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuPHNjcmlwdD5cclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwcml2YXRlOiB7XHJcblxyXG5cclxuICAgICAgaXNTaG93VGNsYXllcjogZmFsc2UsIC8v5piv5ZCm5pi+56S65bm/5ZGK6YCP5piO54K55Ye75bGCIOWQjuWPsOWPguaVsFxyXG4gICAgICBpc2JvbGNrUmV0dXJuOiB0cnVlLCAvL+aYr+WQpuWPr+S7pei/lOWbnuaJi+WKvyDlkI7lj7Dlj4LmlbBcclxuICAgICAgcmV0dXJuUGFnZTogJycsLy/miYvlir/ov5Tlm57phY3nva7kv6Hmga8s6L+U5Zue6aG16Z2iXHJcbiAgICAgIGNvdW50Tm93OiAwLFxyXG4gICAgICBpc1Nob3dMb2dpbjogZmFsc2UsLy/mmK/lkKblvIDlkK/lub/lkYrlkI7lj7Dlj4LmlbDpgLvovpFcclxuICAgICAgaXNTaG93VGNsYXllckxvZ2luOiBmYWxzZSwvL+aYr+WQpuW8gOWQr+W5v+WRiumhtemdoumAj+aYjuWxgumFjee9rumAu+i+kVxyXG4gICAgICBxdW90YUxpc3Q6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICBpZDogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRpdGxlOiAwLjEsXHJcbiAgICAgICAgICBpZDogMixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRpdGxlOiAwLjUsXHJcbiAgICAgICAgICBpZDogMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRpdGxlOiAxLFxyXG4gICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc2hvd0RpYWxvZzogZmFsc2UsXHJcbiAgICAgIHNob3dEaWFsb2cyOiBmYWxzZSwvL+asoeaVsOW3sueUqOWujOeql+WPo1xyXG4gICAgICByZWNlaXZlZENvdW50OiA4LC8v5Ymp5L2Z5qyh5pWwXHJcbiAgICAgIHN5c2NsaWNrQ291bnQ6IC0xLC8v5ZCO5Y+w57O757uf6K6+572u55qE6L2s5YyW54K55Ye75qyh5pWwICDkuI3og73orr7nva7kuLowXHJcbiAgICAgIHVzZXJBZGNsaWNrQ291bnQ6IDAsLy/lvZPliY3ot7PovaznlKjmiLfngrnlh7vlub/lkYrmgLvmrKHmlbBcclxuICAgIH0sXHJcblxyXG4gICAgb25Jbml0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHJcbiAgICAgIC8v5aSE55CG5Zue5LygXHJcbiAgICAgICR1dGlscy5zYXZlSGFwVXJpKGUpXHJcbiAgICAgIC8v5pi+56S6YmFubmVyIOW5v+WRiumrmOW6pu+8jOW6lemDqOe8qei/m1xyXG4gICAgICAvLyAkdXRpbHMuc2hvd0Jhbm5lckFkKDApXHJcbiAgICAgIC8vY2FsbGJhY2vkuLrnqbos5LiN5omn6KGM5bm/5ZGK54K55Ye75o6n5Yi26YC76L6RXHJcbiAgICAgIHRoaXMuaXNTaG93TG9naW4gPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYWN0aVBhcmFtLmNhbGxiYWNrID8gdHJ1ZSA6IGZhbHNlXHJcblxyXG5cclxuICAgICAgLy/pgI/mmI7lsYLlsZXnpLrmr5TkvovliKTmlq1cclxuICAgICAgdGhpcy5pc1Nob3dUY2xheWVyT2ZCTCgpXHJcbiAgICAgIC8v6I635Y+W5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvIFxyXG4gICAgICB0aGlzLmJvbGNrUmV0dXJuKClcclxuXHJcbiAgICAgIC8v6I635Y+W5piv5ZCm6Ieq5Yqo5by556qXLeaLhue6ouWMhVxyXG4gICAgICB0aGlzLmdldFBvcFVwcygpXHJcblxyXG5cclxuICAgICAgLy/ojrflj5blkI7lj7Dorr7nva7nmoQg6L2s5YyW54K55Ye75qyh5pWwXHJcbiAgICAgIHRoaXMuZ2V0Q2xpY2tDb3VudCgpXHJcbiAgICB9LFxyXG4gICAgb25SZWFkeShvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWRDb3VudCgpLy/ljp/nlJ/lub/lkYrkvY3vvIzojrflj5bmrKHmlbBcclxuICAgIH0sXHJcbiAgICBhc3luYyBvblNob3cob3B0aW9ucykge1xyXG4gICAgICAkdW1lbmdfc3RhdC5yZXN1bWUodGhpcylcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v6YCP5piO5bGC5bGV56S65q+U5L6L5Yik5patXHJcbiAgICBpc1Nob3dUY2xheWVyT2ZCTCgpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2hvd0xvZ2luKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbGxiYWNr5Li656m6LOS4jeaJp+ihjOmAj+aYjuWxguWxleekuuavlOS+i+WIpOaWrScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRhcGlzLmV4YW1wbGUuc2hvd1RjbGF5ZXIoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6aG16Z2i6YCP5piO5q+U5L6L5Yik5patOicsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dUY2xheWVyTG9naW4gPSByZXMuZGF0YVxyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd1RjbGF5ZXJMb2dpbikgey8v5b2T5YmN6ZyA6KaB5omn6KGM6YCP5piO54K55Ye75bGC6KeE5YiZXHJcbiAgICAgICAgICB0aGlzLm9ucGVTaG93VGNsYXllckxvZ2luKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn6aG16Z2i6YCP5piO5q+U5L6L5Yik5pat6ZSZ6K+vJyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dUY2xheWVyTG9naW4gPSBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmiafooYzpgI/mmI7ngrnlh7vlsYLop4TliJkg5qC55o2u5b2T5aSp54K55Ye75qyh5pWw5Yik5patXHJcbiAgICBhc3luYyBvbnBlU2hvd1RjbGF5ZXJMb2dpbigpIHtcclxuXHJcbiAgICAgIGF3YWl0ICRwcm9jZXNzRGF0YS5yZXNldFRvZGF5Q2xpY2tzSWZOZWVkZWQoKS8v5qOA5p+l5piv5ZCm6ZyA6KaB6YeN572u5bm/5ZGK54K55Ye75qyh5pWwXHJcbiAgICAgIGxldCBjb3VudCA9IGF3YWl0ICRwcm9jZXNzRGF0YS5nZXRTdG9yYWdlKFwidG9kYXlDbGlja3NcIilcclxuICAgICAgLy/ojrflj5bpobXpnaLpgI/mmI7lsYLphY3nva7kv6Hmga9cclxuICAgICAgdGhpcy5zaG93VGNsYXllcihjb3VudClcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+iOt+WPlumhtemdoumAj+aYjuWxgumFjee9ruS/oeaBryDkvKDmrKHmlbBcclxuICAgIHNob3dUY2xheWVyKGNvdW50KSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Nob3dUY2xheWVyTG9naW4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5b2T5YmN6YCP5piO5bGC5omn6KGM5q+U5L6L5YiG6YWN5Li65ZCmLOS4jeaJp+ihjOmAj+aYjuWxgumAu+i+kScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFjb3VudCkge1xyXG4gICAgICAgIGNvdW50ID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjb25zb2xlLmxvZygn5b2T5YmN5bm/5ZGK54K55Ye75qyh5pWwJywgY291bnQpO1xyXG5cclxuICAgICAgdGhpcy5jb3VudE5vdyA9IGNvdW50XHJcbiAgICAgICRhcGlzLmV4YW1wbGUuc2hvd1RjbGF5ZXIoe1xyXG4gICAgICAgIGNvdW50OiBjb3VudC8v54K55Ye75bm/5ZGK5qyh5pWwKOmdnuW/heWhqyks5pyJ5Lyg5omN5Lya5Yy56YWN6KeE5YiZXHJcbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfpobXpnaLpgI/mmI7phY3nva7kv6Hmga86JywgcmVzKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1RjbGF5ZXIgPSByZXMuZGF0YVxyXG5cclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIsICfpobXpnaLpgI/mmI7phY3nva7kv6Hmga/plJnor68nKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1RjbGF5ZXIgPSBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBib2xja1JldHVybigpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzU2hvd0xvZ2luKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbGxiYWNr5Li656m6LOS4jeaJp+ihjOaJi+WKv+i/lOWbnuaOp+WItumAu+i+kSAnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIC8v6I635Y+W5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvXHJcbiAgICAgICRhcGlzLmV4YW1wbGUuYm9sY2tSZXR1cm4oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvOicsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5pc2JvbGNrUmV0dXJuID0gcmVzLmRhdGEuaXNSZXR1cm5cclxuICAgICAgICB0aGlzLnJldHVyblBhZ2UgPSByZXMuZGF0YS5yZXR1cm5QYWdlXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn5omL5Yq/6L+U5Zue6YWN572u5L+h5oGv6ZSZ6K+vJyk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+iOt+WPluWQjuWPsOiuvue9rueahCDovazljJbngrnlh7vmrKHmlbBcclxuICAgIGdldENsaWNrQ291bnQoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Nob3dMb2dpbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsYmFja+S4uuepuizkuI3miafooYzlkI7lj7Dorr7nva7nmoQg6L2s5YyW54K55Ye75qyh5pWwJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGNvbnN0IHBhcmFtID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbVxyXG4gICAgICBjb25zb2xlLmxvZygn6L2s5YyW54K55Ye75qyh5pWwIOWPguaVsHBhcmFtPSAnLCBwYXJhbSlcclxuICAgICAgJGFwaXMuZXhhbXBsZS5jbGlja0NvdW50KHtcclxuICAgICAgICB0eXBlOiBwYXJhbS50eXBlIHx8ICdqaCcsXHJcbiAgICAgICAgY2hhbm5lbFZhbHVlOiBwYXJhbS5jaGFubmVsVmFsdWUsXHJcbiAgICAgICAgY29ycElkOiBwYXJhbS5jb3JwX2lkXHJcbiAgICAgIH1cclxuICAgICAgKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6L2s5YyW54K55Ye75qyh5pWw6YWN572u5L+h5oGvOicsIHJlcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3lzY2xpY2tDb3VudCA9IHJlcy5kYXRhXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn6L2s5YyW54K55Ye75qyh5pWw6YWN572u5L+h5oGv6ZSZ6K+vJyk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkhpZGUoKSB7XHJcbiAgICAgICR1bWVuZ19zdGF0LnBhdXNlKHRoaXMpOy8v5Zyob25IaWRl5pa55rOV55qE56ys5LiA6KGM5Yqg5YWl5q2k5Luj56CBXHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bmr4/ml6XmrKHmlbBcclxuICAgIGdldEFkQ291bnQoKSB7XHJcblxyXG4gICAgICAkYXBpcy5leGFtcGxlLmdldEFkQ291bnQoe1xyXG4gICAgICAgIGFkSWQ6IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5uYXRpdmVBZFVuaXRJZCxcclxuICAgICAgICBjaGFubmVsOiAnJ1xyXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6I635Y+W5q+P5pel5qyh5pWwJywgcmVzKTtcclxuICAgICAgICB0aGlzLmNvdW50VChyZXMuZGF0YSlcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5bmmK/lkKboh6rliqjlvLnnqpct5ouG57qi5YyFXHJcbiAgICBnZXRQb3BVcHMoKSB7XHJcblxyXG4gICAgICAvL+W7tuaXtuaJp+ihjOS7peS4i+S7o+egge+8jOS9huS4jemYu+WhnuS4u+e6v+eoi1xyXG4gICAgICAkYXBpcy5leGFtcGxlLnBvcFVwcygpXHJcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgLy/lhYjmiZPlvIDmj5LlsY/lub/lkYogXHJcbiAgICAgICAgICB0aGlzLm9wZW5pbnRlcnN0aXRpYWxBZChyZXMuZGF0YSwgZmFsc2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vcGVuaW50ZXJzdGl0aWFsQWQoZmFsc2UsIGZhbHNlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8v5Yik5pat5piv5ZCm6ZyA6KaB6Ieq5Yqo5omT5byA5Y6f55Sf5bm/5ZGKXHJcbiAgICBpc09wZW5BZChpc0F1dG9PcGVuKSB7XHJcbiAgICAgIC8vIOS9v+eUqCBzZXRUaW1lb3V0IOW7tuaXtiA4MDAg5q+r56eSXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0F1dG9PcGVuKSB7XHJcbiAgICAgICAgICB0aGlzLm9wZW5hZCgpOy8v5omT5byA5ouG57qi5YyFXHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA4MDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy/miZPlvIDljp/nlJ/lub/lkYpcclxuICAgIG9wZW5hZCgpIHtcclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gdHJ1ZVxyXG4gICAgICAvLyAkdXRpbHMuaGlkZUJhbmVyQWQoKVxyXG5cclxuICAgIH0sXHJcbiAgICAvKipAcGFyYW0gaXNBdXRvT3BlbiDmmK/lkKboh6rliqjlvIDlkK/mi4bnpo/ooovnqpflj6NcclxuICAgICAqIEBwYXJhbSBpc09wZW5JbnRlckFkIOaYr+WQpuiHquWKqOW8gOWQr+aPkuWxj+W5v+WRilxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIG9wZW5pbnRlcnN0aXRpYWxBZChpc0F1dG9PcGVuLCBpc09wZW5JbnRlckFkKSB7XHJcblxyXG4gICAgICBpZiAoaXNPcGVuSW50ZXJBZCkge1xyXG4gICAgICAgIGNvbnN0IG9uQ2xvc2VDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfmj5LlsY/lub/lkYrlhbPpl63kuoYnKTtcclxuICAgICAgICAgIC8v5Yik5pat5ZCO5Y+w5piv5ZCm6YWN572u5LqG6Ieq5Yqo5omT5byA5byA5ouG57qi5YyFXHJcbiAgICAgICAgICB0aGlzLmlzT3BlbkFkKGlzQXV0b09wZW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9uQ2F0Y2hDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfmj5LlsY/liqDovb3lpLHotKUnKTtcclxuICAgICAgICAgIHRoaXMuaXNPcGVuQWQoaXNBdXRvT3BlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miZPlvIDmj5LlsY/lub/lkYpcclxuICAgICAgICAkdXRpbHMudGFibGVQbGFxdWUob25DbG9zZUNhbGxiYWNrLCBvbkNhdGNoQ2FsbGJhY2spXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pc09wZW5BZCh0cnVlKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGVtaXRFdnQoZXZ0KSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCfmi4bnpo/ooovlm57osIM6ZW1pdEV2dChldnQpJyk7XHJcblxyXG4gICAgICB0aGlzLnNob3dEaWFsb2cgPSBmYWxzZVxyXG4gICAgICB0aGlzLmNvdW50VChldnQuZGV0YWlsLmNvdW50KVxyXG4gICAgICAkdXRpbHMudmlld0Jhbm5lcigpXHJcblxyXG5cclxuICAgICAgYXdhaXQgJHByb2Nlc3NEYXRhLmluY3JlbWVudFRvZGF5Q2xpY2tzKCkvL+aJp+ihjOS4gOasoeeCueWHu+W5v+WRilxyXG4gICAgICAvL+iOt+WPlumhtemdoumAj+aYjuWxgumFjee9ruS/oeaBryAg5Lyg5YWl5b2T5YmN54K55Ye75qyh5pWwXHJcbiAgICAgIHRoaXMuc2hvd1RjbGF5ZXIoYXdhaXQgJHByb2Nlc3NEYXRhLmdldFN0b3JhZ2UoXCJ0b2RheUNsaWNrc1wiKSArIDEpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBlbWl0Q2xvc2UoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCfmi4bnpo/ooovlpLHotKUnKTtcclxuICAgICAgdGhpcy5zaG93RGlhbG9nID0gZmFsc2VcclxuICAgICAgJHV0aWxzLnZpZXdCYW5uZXIoKVxyXG4gICAgfSxcclxuXHJcbiAgICBjb3VudFQoYykge1xyXG4gICAgICB0aGlzLnJlY2VpdmVkQ291bnQgPSBNYXRoLm1pbig4LCBNYXRoLm1heCgwLCA4IC0gYykpOy8vXHJcbiAgICB9LFxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zaG93RGlhbG9nMiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmJhY2soKVxyXG4gICAgfSxcclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgJHV0aWxzLmRlc3Ryb3lCYW5uZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmFjaygpIHtcclxuICAgICAgbGV0IHUgPSAnUGFnZV9NYWluVGFiJ1xyXG4gICAgICBpZiAodGhpcy5yZXR1cm5QYWdlKSB7XHJcbiAgICAgICAgdSA9IHRoaXMucmV0dXJuUGFnZVxyXG4gICAgICB9XHJcbiAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgdXJpOiB1XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmFja1ByZXNzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zaG93RGlhbG9nID8gdHJ1ZSA6IHRoaXMub25SZXR1cm5QYWdlKCkgICAgLy/lpoLmnpxuYXRpdmUtYWTmmL7npLrkuobvvIzlsLHkuI3og73ov5Tlm57plK5cclxuICAgIH0sXHJcblxyXG4gICAgb25SZXR1cm5QYWdlKCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnanVtcExpbms6JywgdGhpcy5yZXR1cm5QYWdlKTtcclxuICAgICAgaWYgKHRoaXMucmV0dXJuUGFnZSkge1xyXG4gICAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgICB1cmk6IHRoaXMucmV0dXJuUGFnZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzYm9sY2tSZXR1cm5cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZEFkYygpIHtcclxuICAgICAgdGhpcy51c2VyQWRjbGlja0NvdW50ICs9IDFcclxuICAgICAgY29uc29sZS5sb2coJ+WQjuWPsOmFjee9rui9rOWMlueCueWHu+asoeaVsO+8micsIHRoaXMuc3lzY2xpY2tDb3VudCwgJyzmnKzmrKHot7Povawg5bm/5ZGK54K55Ye75oC75pWwOiAnLCB0aGlzLnVzZXJBZGNsaWNrQ291bnQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuc3lzY2xpY2tDb3VudCA9PT0gdGhpcy51c2VyQWRjbGlja0NvdW50KSB7XHJcbiAgICAgICAgLy/ovazljJbkuIrkvKBcclxuICAgICAgICAkdXRpbHMuZ2V0Q29udmVydFVwbG9hZCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+W5v+WRiueCueWHu+asoeaVsOS4jeWMuemFje+8jOS4jei9rOWMlicpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Y6f55Sf5bm/5ZGK5Yqg6L295oiQ5Yqf5Zue6LCDXHJcbiAgICBzaG93TnZhZCgpIHtcclxuICAgICAgaWYgKHRoaXMuc3lzY2xpY2tDb3VudCA9PT0gMCkge1xyXG4gICAgICAgIC8v6L2s5YyW5LiK5LygXHJcbiAgICAgICAgJHV0aWxzLmdldENvbnZlcnRVcGxvYWQoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxzdGFjayBjbGFzcz1cInN0YWNrc3R5bGVcIj5cclxuICAgICAgICA8aW1hZ2UgaWY9XCJuYXRpdmUuaXNTaG93SW1nXCIgY2xhc3M9XCJpbWdcIiBzcmM9XCJ7e25hdGl2ZS5hZEltZ1NyY319XCIgb25jbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj48L2ltYWdlPlxyXG4gICAgICAgIDxhZC1idXR0b24gY2xhc3M9XCJhZGJ0blwiIHZhbHVldHlwZT1cIjBcIiBhZHVuaXRpZD1cInt7bmF0aXZlLmFkVW5pdElkfX1cIiBhZGlkPVwie3tuYXRpdmUuYWREYXRhLmFkSWR9fVwiPjwvYWQtYnV0dG9uPlxyXG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiYWRzb3VyY2VcIj57eyBuYXRpdmUuYWREYXRhLnNvdXJjZSB9fSDlub/lkYo8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHRpdGxlXCI+e3sgbmF0aXZlLmFkRGF0YS50aXRsZSB9fTwvdGV4dD5cclxuICAgICAgICA8IS0tIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT4gLS0+XHJcbiAgICAgIDwvc3RhY2s+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dcIiBjbGFzcz1cImNsb3NlSW1nLXBvc1wiIHNyYz1cIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIiBvbmNsaWNrPVwiY2xvc2VBZFwiPjwvaW1hZ2U+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAuaXRlbS1jb250YWluZXIge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAyNTZweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICB9XHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuc3RhY2tzdHlsZSB7XHJcbiAgICB3aWR0aDogNTQwcHg7XHJcbiAgICBoZWlnaHQ6IDMwNnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuICAuaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xyXG4gIH1cclxuICAuY2xvc2VJbWctcG9zIHtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDUwO1xyXG4gIH1cclxuICAuY2xvc2VJbWcge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gIH1cclxuXHJcbiAgLmFkc291cmNlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuYWR0aXRsZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG4gIC5hZGJ0biB7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGJmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICAgIGJvdHRvbTogMjBweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICAuYWRidG46YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNThmYmQ7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGxldCBuYXRpdmVBZDtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNvbXBvbmVudE5hbWU6IFwiYWRibm5lclwiLFxyXG4gICAgICBwcm92aWRlcjogXCJcIixcclxuICAgICAgbmF0aXZlOiB7XHJcbiAgICAgICAgYWRVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgaXNTaG93OiBmYWxzZSxcclxuICAgICAgICBhZERhdGE6IHt9LFxyXG4gICAgICAgIGlzU2hvd0ltZzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dWaWRlbzogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dEYXRhOiB0cnVlLFxyXG4gICAgICAgIGVyclN0cjogXCJcIixcclxuICAgICAgICBidG5UeHQ6IFwiXCIsXHJcbiAgICAgICAgYWRJbWdTcmM6IFwiXCIsXHJcbiAgICAgICAgYWRWaWRlb1NyYzogXCJcIlxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uSW5pdCgpIHtcclxuXHJcbiAgICAgIHRoaXMubmF0aXZlLmFkVW5pdElkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLm5BYmFubmVyQWRVbml0SWRcclxuICAgIH0sXHJcbiAgICBhc3luYyBvblJlYWR5KG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwibmF0aXZlQmFubmVyIGFkIG9uUmVhZHlcIik7XHJcbiAgICAgIHRoaXMuc2hvd05hdGl2ZUFkKCk7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBvblNob3cob3B0aW9ucykge1xyXG4gICAgICBpZiAodGhpcy5uYXRpdmUuaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRBZFByb3ZpZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMucHJvdmlkZXIgPSAkYWQuZ2V0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd05hdGl2ZUFkKCkge1xyXG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcclxuICAgICAgaWYgKHRoaXMucHJvdmlkZXIgIT09IFwiaHVhd2VpXCIpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5uYXRpdmUuYWRVbml0SWQgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uTG9hZChkYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuYWREYXRhID0gZGF0YS5hZExpc3RbMF07XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLmltZ1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIiB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9XCIgKyB0aGlzLm5hdGl2ZS5hZEltZ1NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5jbGlja0J0blR4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSB0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3QgJiYgdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImxvYWQgYWQgZXJyb3I6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5lcnJTdHIgPSBKU09OLnN0cmluZ2lmeShlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVTaG93KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCB9KVxyXG5cclxuICAgICAgICAvL+WmguaenOi9rOWMlueCueWHu+asoeaVsOS4ujAg5YiZ5bm/5ZGK5Yqg6L295oiQ5Yqf5bCx6L2s5YyW5LiK5LygXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnc2hvd052YWQnKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVwb3J0TmF0aXZlQ2xpY2soKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbyhcIiDljp/nlJ/lub/lkYrooqvngrnlh7vkuoZcIik7XHJcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xyXG4gICAgICAgIGFkSWQ6IHRoaXMubmF0aXZlLmFkRGF0YS5hZElkXHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIC8v5bm/5ZGK6KKr54K55Ye75pe26Kem5Y+R5Li76aG16Z2i5pa55rOVXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2FkZEFkYycpXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBsaXN0ZW5OYXRpdmVBZERvd25sb2FkU3RhdHVzKGRvd25sb2Fkc3RhdHVzKSB7XHJcbiAgICAgIGlmIChkb3dubG9hZHN0YXR1cyA9PT0gXCJJTlNUQUxMRURcIikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmJ0blR4dCA9IFwiT1BFTlwiO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignc3RhcnQgZG93bmxvYWQgcmVzdWx0IGlzID0gJywgZXZlbnQucmVzdWx0Q29kZSlcclxuICAgIH0sXHJcbiAgICByZW1vdmVBZExpc3RlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5vZmZEb3dubG9hZFByb2dyZXNzKCk7XHJcbiAgICAgICAgbmF0aXZlQWQub2ZmRXJyb3IoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZCBvZmZFcnJvclwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZMb2FkKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibmF0aXZlQWQgb2ZmTG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZTdGF0dXNDaGFuZ2VkKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5bm/5ZGK5YaF5a65XHJcbiAgICBjbG9zZUFkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgfVxyXG48L3NjcmlwdD4iLCJcclxuPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJpdGVtLWNvbnRhaW5lclwiPlxyXG4gICAgPGltYWdlIGNsYXNzPVwiY2xvc2VWaWV3XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkdmlld1wiPjwvaW1hZ2U+XHJcbiAgICA8IS0tIDxpbWFnZSBzdHlsZT1cIndpZHRoOiAzNDBweDsgaGVpZ2h0OiA5NHB4elwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2J0X2NwZC5wbmdcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPjwvaW1hZ2U+IC0tPlxyXG4gICAgPGltYWdlIHN0eWxlPVwibWFyZ2luLXRvcDogLTEwMHB4OyB3aWR0aDogNTI4cHg7IGhlaWdodDogNzA4cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICA8dGV4dCBzdHlsZT1cIm1hcmdpbi10b3A6IC0xMzBweDsgd2lkdGg6IDM2MHB4OyBoZWlnaHQ6IDk0cHg7IGZvbnQtc2l6ZTogMzhweDsgY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDYwcHg7IGJhY2tncm91bmQtY29sb3I6ICNlYzVkMGE7IGZvbnQtd2VpZ2h0OiBib2xkOyB0ZXh0LWFsaWduOiBjZW50ZXJcIiBvbmNsaWNrPVwiY29tcGxldGVBZFJTQVwiPuaJk+W8gOW5tumihuWPljwvdGV4dD5cclxuXHJcbiAgICA8ZGl2IGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbWFnZSBjbGFzcz1cImNsb3NlSW1nXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT5cclxuICAgICAgPHZpZGVvIGlkPVwidmlkZW9cIiBpZj1cIm5hdGl2ZS5pc1Nob3dWaWRlb1wiIHNyYz1cInt7bmF0aXZlLmFkVmlkZW9TcmN9fVwiIGF1dG9wbGF5PVwidHJ1ZVwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCIgY2xhc3M9XCJhZC12aWRlb1wiPjwvdmlkZW8+XHJcbiAgICAgIDxzdGFjayBjbGFzcz1cInN0YWNrc3R5bGVcIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxyXG4gICAgICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dJbWdcIiBjbGFzcz1cImltZ1wiIHNyYz1cInt7bmF0aXZlLmFkSW1nU3JjfX1cIj48L2ltYWdlPlxyXG4gICAgICAgIDxhZC1idXR0b24gY2xhc3M9XCJhZGJ0blwiIG9uY2xpY2s9XCJzdGFydEJ1dHRvbigpXCIgdmFsdWV0eXBlPVwiMFwiIGFkdW5pdGlkPVwie3tuYXRpdmUuYWRVbml0SWR9fVwiIGFkaWQ9XCJ7e25hdGl2ZS5hZERhdGEuYWRJZH19XCI+PC9hZC1idXR0b24+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHNvdXJjZVwiPnt7IG5hdGl2ZS5hZERhdGEuc291cmNlIH19IOW5v+WRijwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkdGl0bGVcIj57eyBuYXRpdmUuYWREYXRhLnRpdGxlIH19PC90ZXh0PlxyXG4gICAgICA8L3N0YWNrPlxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgICA8ZGl2IGlmPVwie3tzaG93VGNsYXllcn19XCIgY2xhc3M9XCJ0Yy1sYXllclwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAudGMtbGF5ZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDg1MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICB9XHJcblxyXG4gIC5pdGVtLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5zdGFja3N0eWxlIHtcclxuICAgIHdpZHRoOiA1NDBweDtcclxuICAgIGhlaWdodDogMzA2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG4gIC5jbG9zZUltZyB7XHJcbiAgICB3aWR0aDogMzZweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuY2xvc2VWaWV3IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDEwMHB4O1xyXG4gICAgdG9wOiAxNDBweDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIH1cclxuICAuYWxlcnQge1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYWQtdmlkZW8ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQxNXB4O1xyXG4gIH1cclxuICAuYnRuIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiZmZmO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcbiAgLmJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkYnRuIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIC5hZGJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkc291cmNlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuYWR0aXRsZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGxldCBuYXRpdmVBZDtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBwcm9wczoge1xyXG5cclxuICAgICAgc2hvd1RjbGF5ZXI6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBhZFVwbG9hZDoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICBjb21wb25lbnROYW1lOiBcImFkXCIsXHJcbiAgICAgIHByb3ZpZGVyOiBcIlwiLFxyXG4gICAgICBuYXRpdmU6IHtcclxuICAgICAgICBhZFVuaXRJZDogXCJcIixcclxuICAgICAgICBpc1Nob3c6IGZhbHNlLFxyXG4gICAgICAgIGFkRGF0YToge30sXHJcbiAgICAgICAgaXNTaG93SW1nOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd1ZpZGVvOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd0RhdGE6IHRydWUsXHJcbiAgICAgICAgZXJyU3RyOiBcIlwiLFxyXG4gICAgICAgIGJ0blR4dDogXCJcIixcclxuICAgICAgICBhZEltZ1NyYzogXCJcIixcclxuICAgICAgICBhZFZpZGVvU3JjOiBcIlwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgICAgdGhpcy5uYXRpdmUuYWRVbml0SWQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAubmF0aXZlQWRVbml0SWRcclxuXHJcbiAgICAgIC8vIHRoaXMubmF0aXZlLmFkVW5pdElkID0gJ3Y1aDV4c2tscDInXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgb25SZWFkeShvcHRpb25zKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbyhcIm5hdGl2ZSBhZCBvblJlYWR5XCIpO1xyXG4gICAgICB0aGlzLnNob3dOYXRpdmVBZCgpO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgb25TaG93KG9wdGlvbnMpIHtcclxuICAgICAgaWYgKHRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd05hdGl2ZUFkKCkge1xyXG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcclxuICAgICAgaWYgKHRoaXMucHJvdmlkZXIgIT09IFwiaHVhd2VpXCIpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5uYXRpdmUuYWRVbml0SWQgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uTG9hZChkYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuYWREYXRhID0gZGF0YS5hZExpc3RbMF07XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLmltZ1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIiB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9XCIgKyB0aGlzLm5hdGl2ZS5hZEltZ1NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5jbGlja0J0blR4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSB0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3QgJiYgdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImxvYWQgYWQgZXJyb3I6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5lcnJTdHIgPSBKU09OLnN0cmluZ2lmeShlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVTaG93KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCB9KTtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzovazljJbngrnlh7vmrKHmlbDkuLowIOWImeW5v+WRiuWKoOi9veaIkOWKn+Wwsei9rOWMluS4iuS8oFxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Nob3dOdmFkJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCIg5Y6f55Sf5bm/5ZGK6KKr54K55Ye75LqGXCIpO1xyXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcclxuICAgICAgICBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8v5bm/5ZGK6KKr54K55Ye75pe26Kem5Y+R5Li76aG16Z2i5pa55rOVXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2FkZEFkYycpXHJcblxyXG4gICAgICAvL+W5v+WRiuaIlumAj+aYjuWxguiiq+eCueWHu+WQjumakOiXj+mAj+aYjuWxglxyXG4gICAgICB0aGlzLnNob3dUY2xheWVyID0gZmFsc2VcclxuXHJcbiAgICB9LFxyXG4gICAgc3RhcnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignc3RhcnQgZG93bmxvYWQgcmVzdWx0IGlzID0gJywgZXZlbnQucmVzdWx0Q29kZSlcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5bm/5ZGK5YaF5a65XHJcbiAgICBjbG9zZUFkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5bm/5ZGK6aG16Z2iXHJcbiAgICBjbG9zZUFkdmlldzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJylcclxuXHJcbiAgICB9LFxyXG4gICAgY29tcGxldGVBZFJTQSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+aLhuemj+iiiycpO1xyXG5cclxuICAgICAgLy/lhYjliKTmlq3lub/lkYrmsqHmnInmsqHliqDovb3lh7rmnaXvvIzmsqHmnInlsLHnm7TmjqXov5Tlm57kuI3miafooYzmjqXlj6NcclxuXHJcbiAgICAgIGlmICghdGhpcy5uYXRpdmUuaXNTaG93KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+W5v+WRiuWxleekuuS4jeaIkOWKnyzmi4bnuqLljIXkuI3miJDlip8nKTtcclxuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiAn5ouG57qi5YyF5aSx6LSl77yB6K+36YeN6K+VJyxcclxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9zZScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGFkVHlwZSA9ICdOQVRJVkUnXHJcbiAgICAgIHZhciBhZElkID0gdGhpcy5uYXRpdmUuYWRVbml0SWRcclxuICAgICAgdmFyIGNoYW5uZWwgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY2hhbm5lbFxyXG4gICAgICB2YXIgY291bnRNYXggPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY291bnRNYXhcclxuICAgICAgdmFyIGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kXHJcbiAgICAgIHZhciBvYWlkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbS5vYWlkXHJcbiAgICAgIHZhciBpbmZvID0gJGRldmljZS5nZXRJbmZvU3luYygpO1xyXG4gICAgICB2YXIgdWEgPSAnJ1xyXG4gICAgICAvLyDnoa7kv50gdWEg5a+56LGh5YyF5ZCr5omA6ZyA55qE5Y+C5pWwXHJcbiAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgdWEgPSBgJHtpbmZvLm1vZGVsfSwgJHtpbmZvLnByb2R1Y3R9LCAke2luZm8ubWFudWZhY3R1cmVyfSwgJHtpbmZvLm9zVHlwZX1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VhIOWvueixoeacquWumuS5ieaIluS4jeWMheWQq+aJgOmcgOeahOWPguaVsCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaFvYWlkOiR7b2FpZH0gIOaehOW7uuWPguaVsOWvueixoXVhOiR7dWF9YCk7XHJcbiAgICAgIC8vIOaehOW7uuWPguaVsOWvueixoVxyXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgYWRUeXBlLFxyXG4gICAgICAgIGFkSWQsXHJcbiAgICAgICAgY2hhbm5lbCxcclxuICAgICAgICBjb3VudE1heCxcclxuICAgICAgICBicmFuZCxcclxuICAgICAgICBvYWlkLFxyXG4gICAgICAgIHVhXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaE6JHtwYXJhbXN9YCk7XHJcbiAgICAgICRhcGlzLmV4YW1wbGUuY29tcGxldGVBZFJTQShwYXJhbXMpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhg5a6M5oiQ5bm/5ZGKLS0tLS0tLS0tLT4ganVtcExpbms6JHtyZXMuZGF0YS5qdW1wTGlua30sIOWujOaIkOasoeaVsO+8miR7cmVzLmRhdGEuY291bnR9IOW9k+asoeWlluWKse+8miR7cmVzLmRhdGEuYXdhcmRBbW91bnR9YCk7XHJcblxyXG4gICAgICAgIC8v5YWI5Yik5pat5pyJ5rKh5pyJ6L+U5Zue6Lez6L2s6ZO+5o6l77yM5pyJ5bCx6LezXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmp1bXBMaW5rKSB7XHJcbiAgICAgICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgICB1cmk6IHJlcy5kYXRhLmp1bXBMaW5rXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBtZXMgPSAnJ1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmF3YXJkQW1vdW50KSB7XHJcbiAgICAgICAgICAgIG1lcyA9ICfmga3llpzojrflvpcwLjAx5YWD57qi5YyFJ1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvdW50ID4gOCkge1xyXG4gICAgICAgICAgICAgIG1lcyA9ICfku4rlpKnmtLvliqjmrKHmlbDlt7LnlKjlrownXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVzID0gJ+WGjeadpeS4gOasoSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXMsXHJcbiAgICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnZW1pdEV2dCcsIHtcclxuICAgICAgICAgIGNvdW50OiByZXMuZGF0YS5jb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn54K55Ye75ouG56aP6KKL6ZSZ6K+vJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogSlNPTi5wYXJzZShlcnIpLm1lc3NhZ2UsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmNvbnRhaW5lclwiOiB7XG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9iZ19jaGIucG5nXCIsXG4gICAgXCJiYWNrZ3JvdW5kUmVwZWF0XCI6IFwibm8tcmVwZWF0XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIwcHhcIlxuICB9LFxuICBcIi5uYmFkXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmNvbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuZGFsaXlcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1hcm91bmRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUwMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjI1OHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kXCI6IFwie1xcXCJ2YWx1ZXNcXFwiOlt7XFxcInR5cGVcXFwiOlxcXCJsaW5lYXJHcmFkaWVudFxcXCIsXFxcImRpcmVjdGlvbnNcXFwiOltcXFwiOTBkZWdcXFwiXSxcXFwidmFsdWVzXFxcIjpbXFxcIiNlOWZkNjVcXFwiLFxcXCIjOTVmZjM3IDEwMCVcXFwiXX1dfVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTU0cHhcIlxuICB9LFxuICBcIi5jbG9zZUltZ1wiOiB7XG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjQ4cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjQ4cHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjMwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuaW1hZ2VfZmluZ2VyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjIycHhcIixcbiAgICBcImhlaWdodFwiOiBcIjIyMnB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0MDBweFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjIzMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3N6LnBuZ1wiLFxuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcImZsb2F0XCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjE1MDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogLTFcbiAgfSxcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcImZsb2F0XCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCItNjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA1MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCItNjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA1MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiLmJ0bV92aWV3XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTAwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiBcIjEwMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLml0ZW0tZGl2XCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxNzJweFwiLFxuICAgIFwid2lkdGhcIjogXCIxNjJweFwiLFxuICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9oYmJnLnBuZ1wiXG4gIH0sXG4gIFwiLml0ZW0tZGl2LXRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjZDMwMDA5XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjYwcHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCItNDBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLml0ZW0tY29udGFpbmVyXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIyNTZweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLnN0YWNrc3R5bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCI1NDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzA2cHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLmltZ1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRTaXplXCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY2xvc2VJbWctcG9zXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMzZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5jbG9zZUltZ1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMzZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzZweFwiXG4gIH0sXG4gIFwiLmFkc291cmNlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmFkdGl0bGVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxOHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuYWRidG5cIjoge1xuICAgIFwid2lkdGhcIjogXCIyMDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDBiZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI4cHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImFsaWduU2VsZlwiOiBcImZsZXgtZW5kXCIsXG4gICAgXCJib3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjIwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvcjphY3RpdmVcIjogXCIjMDU4ZmJkXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIudGMtbGF5ZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4NTBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYm90dG9tXCI6IFwiMTAwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC45KVwiXG4gIH0sXG4gIFwiLml0ZW0tY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLnN0YWNrc3R5bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCI1NDBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzA2cHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LWVuZFwiXG4gIH0sXG4gIFwiLmltZ1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMzZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmNsb3NlVmlld1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJsZWZ0XCI6IFwiMTAwcHhcIixcbiAgICBcInRvcFwiOiBcIjE0MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjM2cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjM2cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiXG4gIH0sXG4gIFwiLmFsZXJ0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiNDBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmFkLXZpZGVvXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDE1cHhcIlxuICB9LFxuICBcIi5idG5cIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwid2lkdGhcIjogXCI2MCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZGJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYWxpZ25TZWxmXCI6IFwiZmxleC1lbmRcIixcbiAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9LFxuICBcIi5hZHNvdXJjZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjE4cHhcIixcbiAgICBcImJvcmRlclRvcExlZnRSYWRpdXNcIjogXCIwcHhcIlxuICB9LFxuICBcIi5hZHRpdGxlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiOiBcIjBweFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICAgICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICBcInRvcFwiOiBcIjcycHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJiYWNrXCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzYm9sY2tSZXR1cm4pfSxcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYmFjay5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIyOHB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjM0cHhcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuiuoeatpeaYn+eQg1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwiZm9udFNpemVcIjogXCIzNXB4XCIsXG4gICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiLTEwcHhcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJkYWxpeVwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25fY3MucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgICAgICAgICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgICAgICAgICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMzRweFwiLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogXCI1MnB4XCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJlY2VpdmVkQ291bnQ9PT0wPyfku4rml6XmrKHmlbDlt7LnlKjlrownOifku4rml6XlhY3otLnvvJonKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3BhblwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMucmVjZWl2ZWRDb3VudCkpKyfmrKEnfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucmVjZWl2ZWRDb3VudD4wKX0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiMjgycHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCIyODJweFwiLFxuICAgICAgICBcInRvcFwiOiBcIjgwMHB4XCIsXG4gICAgICAgIFwibGVmdFwiOiBcIjI1MHB4XCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJvcGVuYWRcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYnRtX3ZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiZGF0YUl0ZW1cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pdGVtKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucXVvdGFMaXN0KX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaXRlbS1kaXZcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udGl0bGUpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtLWRpdi10ZXh0XCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25fZmQucG5nXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQ9PT0xKX0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxNTBweFwiLFxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcIjE1MHB4XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcIm5hdGl2ZS1hZFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzaG93VGNsYXllclwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hvd1RjbGF5ZXIpfVxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiZW1pdC1ldnRcIjogXCJlbWl0RXZ0XCIsXG4gICAgICAgIFwiZW1pdC1jbG9zZVwiOiBcImVtaXRDbG9zZVwiLFxuICAgICAgICBcImFkZC1hZGNcIjogXCJhZGRBZGNcIixcbiAgICAgICAgXCJzaG93LW52YWRcIjogXCJzaG93TnZhZFwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbmVyXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0RpYWxvZzIpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjY3MnB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjgwMHB4XCIsXG4gICAgICAgICAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2FkL2JnX2NvbmVyLnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJjbG9zZUltZ1wiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9iZ19idXQucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjU3NXB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjE3N3B4XCIsXG4gICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjUwMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImltYWdlX2ZpbmdlclwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwib3BlbmFkXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIml0ZW0tY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNsb3NlVmlld1wiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VBZHZpZXdcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9neC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIm1hcmdpblRvcFwiOiBcIi0xMDBweFwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiNTI4cHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI3MDhweFwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInZhbHVlXCI6IFwi5omT5byA5bm26aKG5Y+WXCJcbiAgICAgIH0sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCItMTMwcHhcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjM2MHB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiOTRweFwiLFxuICAgICAgICBcImZvbnRTaXplXCI6IFwiMzhweFwiLFxuICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBcImJvcmRlclJhZGl1c1wiOiBcIjYwcHhcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWM1ZDBhXCIsXG4gICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImNvbXBsZXRlQWRSU0FcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvdyl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJjbG9zZUltZ1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VBZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidmlkZW9cIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJpZFwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjKX0sXG4gICAgICAgICAgICBcImF1dG9wbGF5XCI6IFwidHJ1ZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlkXCI6IFwidmlkZW9cIixcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvd1ZpZGVvKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYWQtdmlkZW9cIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwic3RhY2tzdHlsZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRJbWdTcmMpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvd0ltZyl9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpbWdcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZC1idXR0b25cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVldHlwZVwiOiBcIjBcIixcbiAgICAgICAgICAgICAgICBcImFkdW5pdGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkVW5pdElkKX0sXG4gICAgICAgICAgICAgICAgXCJhZGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkRGF0YS5hZElkKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWRidG5cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInN0YXJ0QnV0dG9uXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMubmF0aXZlLmFkRGF0YS5zb3VyY2UpKSsnIOW5v+WRiid9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkc291cmNlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWREYXRhLnRpdGxlKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWR0aXRsZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUY2xheWVyKX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidGMtbGF5ZXJcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIml0ZW0tY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvdyl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRJbWdTcmMpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvd0ltZyl9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpbWdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMubmF0aXZlLmFkRGF0YS5zb3VyY2UpKSsnIOW5v+WRiid9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkc291cmNlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWREYXRhLnRpdGxlKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWR0aXRsZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuaXNTaG93KX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2xvc2VJbWctcG9zXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZUFkXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bmF0aXZlYmFubmVyLWFkIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmFCYW5uZXJBZFxcXFxpbmRleC51eCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmFCYW5uZXJBZFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L25hdGl2ZWJhbm5lci1hZCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bmF0aXZlLWFkIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmF0aXZlQURcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hdGl2ZUFEXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbmF0aXZlLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2FkL25hdGl2ZUFEL2luZGV4LnV4P25hbWU9bmF0aXZlLWFkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2FkL25hQmFubmVyQWQvaW5kZXgudXg/bmFtZT1uYXRpdmViYW5uZXItYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPW5hdGl2ZS1hZCEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfY2ZkXFxcXGluZGV4LnV4IS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxQYWdlX2NmZFxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2luZGV4JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4wLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/icon/icons.js":
/*!**************************************!*\
  !*** ./src/components/icon/icons.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.icons = void 0;
const icons = exports.icons = {
  'add-circle-o': '&#xe977',
  'add-circle': '&#xe976',
  add: '&#xe975',
  airplane: '&#xe974',
  alarm: '&#xe973',
  'arrow-back': '&#xe972',
  'arrow-down': '&#xe971',
  'arrow-dropdown-circle': '&#xe970',
  'arrow-dropdown': '&#xe96f',
  'arrow-dropleft-circle': '&#xe96e',
  'arrow-dropleft': '&#xe96d',
  'arrow-dropright-circle': '&#xe96c',
  'arrow-dropright': '&#xe96b',
  'arrow-dropup-circle': '&#xe96a',
  'arrow-dropup': '&#xe969',
  'arrow-fwd': '&#xe968',
  'arrow-round-back': '&#xe967',
  'arrow-round-down': '&#xe966',
  'arrow-r-fwd': '&#xe965',
  'arrow-round-up': '&#xe964',
  'arrow-up': '&#xe963',
  bluetooth: '&#xe962',
  bug: '&#xe961',
  build: '&#xe960',
  business: '&#xe95f',
  call: '&#xe95e',
  camera: '&#xe95d',
  card: '&#xe95c',
  cart: '&#xe95b',
  chatbox: '&#xe95a',
  chat: '&#xe959',
  'checkbox-outline': '&#xe958',
  checkbox: '&#xe957',
  'checkmark-circle-outline': '&#xe956',
  'checkmark-circle': '&#xe955',
  checkmark: '&#xe954',
  'close-circle-outline': '&#xe953',
  'close-circle': '&#xe952',
  close: '&#xe951',
  'cloud-done': '&#xe950',
  'cloud-down': '&#xe94f',
  'cloud-up': '&#xe94e',
  cut: '&#xe94d',
  'eye-off': '&#xe94c',
  eye: '&#xe94b',
  'finger-print': '&#xe94a',
  'flash-off': '&#xe949',
  flash: '&#xe948',
  flashlight: '&#xe947',
  funnel: '&#xe946',
  gift: '&#xe945',
  'heart-dislike': '&#xe944',
  'heart-empty': '&#xe943',
  'heart-half': '&#xe942',
  heart: '&#xe941',
  'help-circle-outline': '&#xe940',
  'help-circle': '&#xe93f',
  image: '&#xe93e',
  images: '&#xe93d',
  infinite: '&#xe93c',
  'information-circle-outline': '&#xe93b',
  'information-circle': '&#xe93a',
  key: '&#xe939',
  link: '&#xe938',
  list: '&#xe937',
  mail: '&#xe936',
  menu: '&#xe935',
  musical: '&#xe934',
  'notification-off': '&#xe933',
  'notification-o': '&#xe932',
  notification: '&#xe931',
  options: '&#xe930',
  'paper-plane': '&#xe92f',
  pause: '&#xe92e',
  people: '&#xe92d',
  'person-add': '&#xe92c',
  person: '&#xe92b',
  pie: '&#xe92a',
  pin: '&#xe929',
  'play-circle': '&#xe928',
  play: '&#xe927',
  power: '&#xe926',
  pricetag: '&#xe925',
  pricetags: '&#xe924',
  print: '&#xe923',
  'qr-scanner': '&#xe922',
  'refresh-circle': '&#xe921',
  refresh: '&#xe920',
  'remove-circle-outline': '&#xe91f',
  'remove-circle': '&#xe91e',
  rewind: '&#xe91d',
  rocket: '&#xe91c',
  save: '&#xe91b',
  search: '&#xe91a',
  settings: '&#xe919',
  'share-alt': '&#xe918',
  'skip-bwd': '&#xe917',
  'skip-fwd': '&#xe916',
  snow: '&#xe915',
  'star-half': '&#xe914',
  'star-outline': '&#xe913',
  star: '&#xe912',
  stats: '&#xe911',
  sync: '&#xe910',
  'thumbs-down': '&#xe90f',
  'thumbs-up': '&#xe90e',
  time: '&#xe90d',
  timer: '&#xe90c',
  trash: '&#xe90b',
  'trend-down': '&#xe90a',
  'trend-up': '&#xe909',
  undo: '&#xe908',
  unlock: '&#xe907',
  'vol-high': '&#xe906',
  'vol-low': '&#xe905',
  'vol-mute': '&#xe904',
  'vol-off': '&#xe903',
  warning: '&#xe902',
  wifi: '&#xe901',
  woman: '&#xe900'
};

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const adCodeData = {
  appid: 111256983,
  nativeAd: 'v5h5xsklp2',
  //原生
  tableScreen: 'a7nvl7fm00',
  stimulateAd: 'o0rbevcepx',
  //testx9dtjwj8hp 测试编码 
  lotteryPageNativeAd: 's2ytxth2mq'
};
// const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqaj0Y3k54jCyTq47t73S
// cBX9uBsSScDo7/uZ+PhHYh9eQqHNW1bBjKGV4t3Y8Wokhv783krxhIqzkPf9nHeZ
// 2yWqoQlPa3qOUc7Wf/HpX2+eHGRjF1/RLARJmMcEgQYB3WGbdRedu0FjQSGd+OfS
// S/W7Heh2ZGlF/aSHj2NYhYE4p7x4jjQIi+ueKZvVJNZpu0vhQaF45jpqQDULPL+M
// kkQePmupjp/PR4Ra8BVg4DwJuI6K8jL77YWaxeQRbMrEiQ0ZbTKRQ4o8N73iIM97
// E/h8PbDl5FbuNn0k8urkYnmv56AMdkVEyIOUwNEa8oU9QKz37o5Z2L7+yqx2zmLp
// VwIDAQAB`;
// 私钥
const privateKey = "";
const currentService = "prod";
const appConfig = {
  prod: {
    BASEHOST: "https://api.ihaituo.cn"
  },
  dev: {
    BASEHOST: "http://192.168.3.48:9999"
  },
  uat: {
    BASEHOST: "https://mini.cnyings.com"
  },
  test: {
    BASEHOST: "https://test.ipandata.com"
  }
};
var _default = exports["default"] = {
  adCodeData,
  // publicKey,
  privateKey,
  BASEHOST: appConfig[currentService].BASEHOST
};

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/apex-ui/components/navbar/index.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/apex-ui/components/navbar/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  props: {
    theme: {
      type: String,
      default: "light"
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    height: {
      default: 100
    },
    bgColor: {
      type: String,
      default: ""
    },
    fixed: {
      default: false
    }
  },
  clickHandlerLeft() {
    this.$emit("tap", {
      type: "left"
    });
  },
  clickHandlerRight() {
    this.$emit("tap", {
      type: "right"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/components/icon/index.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/components/icon/index.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = __webpack_require__(/*! ./icons */ "./src/components/icon/icons.js");
var _default = exports.default = {
  data() {
    return {
      iconMap: _icons.icons
    };
  },
  props: {
    type: {
      default: "empty"
    },
    size: {
      default: 14
    },
    color: {
      default: ""
    },
    ratio: {
      default: 750
    }
  },
  unescapeFontIconCode(iconCode = "") {
    return unescape(iconCode.replace(/&#x/g, "%u").replace(/;/g, ""));
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/back-to-ads.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/back-to-ads.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  adCodeData
} = (__webpack_require__(/*! ../../../config.js */ "./src/config.js")["default"]);
let nativeAd;
var _default = exports.default = {
  data() {
    return {
      adList: {},
      hasAdList: false,
      defaultAd: {
        desc: '华为广告',
        title: '华为联盟',
        icon: '广告',
        clickBtnTxt: '点击安装',
        img: "http://cdn.bank-zone.cn/pro/sy/admin/advertising/3639bdbde8e84397a297ad54f89ac4c3.jpg"
      },
      btnTxt: '',
      adId: "",
      adObj: "",
      showClik: false
    };
  },
  props: {
    showTransparency: {
      default: false
    }
  },
  onInit() {
    const branch = $ad.getProvider();
    this.adObj = adCodeData[branch];
    this.adId = 's2ytxth2mq';
    this.preloadAd();
  },
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  preloadAd() {
    try {
      var that = this;
      this.getAdProvider();
      if (this.provider !== "huawei") {
        console.info("the device  does not support ad.");
        return;
      }
      console.log('是否进来了开启广告');
      nativeAd = $ad.createNativeAd({
        adUnitId: this.adId
      });
      nativeAd.onLoad(data => {
        this.adList = data.adList[0];
        this.hasAdList = true;
        this.reportNativeShow();
      });
      nativeAd.onError(e => {
        that.$emit('emitClose', {
          data: 'showVackTisp'
        });
      });
      nativeAd.load();
    } catch (e) {
      console.log(e, e.message);
    }
  },
  reportNativeClick() {
    $utils.buriedPointReport(this, 'click', this.adId);
    $utils.conversionUpload(this);
    nativeAd.reportAdClick({
      adId: this.adList.adId
    });
  },
  reportNativeShow() {
    if (nativeAd) {
      nativeAd.reportAdShow({
        adId: this.adList.adId
      });
    }
  },
  error(errCode, errMsg) {
    this.$emit('emitClose', {
      data: 'showVackTisp'
    });
    if (this.debug) {
      _system.default.showToast({
        message: `ad load error: errCode = ${errCode}, errMsg = ${errMsg}`
      });
    }
  },
  adClick() {
    console.log('没有点击回调吗');
    $utils.conversionUpload(this);
    this.$emit('emitHideTransparency');
  },
  close() {
    console.log('没有关闭回调吗');
    this.hasAdList = false;
    this.$emit('emitClose', {
      data: 'showVackTisp'
    });
  },
  backHome() {
    $router.replace({
      uri: "pages/displayDesktop"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/bottom-native.ux":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/bottom-native.ux ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const {
  adCodeData
} = (__webpack_require__(/*! ../../../config.js */ "./src/config.js")["default"]);
let nativeAd;
var _default = exports.default = {
  data: {
    hasAdList: true,
    defaultAd: {
      desc: '华为广告',
      title: '华为联盟',
      icon: '广告',
      clickBtnTxt: '点击安装',
      img: "http://cdn.bank-zone.cn/pro/sy/admin/advertising/3639bdbde8e84397a297ad54f89ac4c3.jpg"
    },
    btnTxt: '',
    adUnitId: "",
    adList: ""
  },
  props: {
    showTransparency: {
      default: false
    }
  },
  onInit() {
    const branch = $ad.getProvider();
    this.adObj = adCodeData[branch];
    this.adId = 'v5h5xsklp2';
    this.preloadAd();
  },
  onReady() {},
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  async preloadAd() {
    var that = this;
    this.getAdProvider();
    if (this.provider !== "huawei") {
      console.info("the device  does not support ad.");
      return;
    }
    console.log('是否进来了开启广告banner');
    nativeAd = $ad.createNativeAd({
      adUnitId: this.adId
    });
    nativeAd.onLoad(data => {
      this.adList = data.adList[0];
      this.hasAdList = true;
      this.reportNativeShow();
    });
    nativeAd.onError(e => {});
    nativeAd.load();
  },
  reportNativeClick() {
    $utils.buriedPointReport(this, 'click', this.adId);
    $utils.conversionUpload(this);
    nativeAd.reportAdClick({
      adId: this.adList.adId
    });
  },
  reportNativeShow() {
    if (nativeAd) {
      nativeAd.reportAdShow({
        adId: this.adList.adId
      });
    }
  },
  error(errCode, errMsg) {
    console.log('没有报错回调吗');
    this.$emit('error', {
      errCode,
      errMsg
    });
  },
  adClick() {
    console.log('没有点击回调吗');
    console.log('怎么触发的是这里的');
    $utils.conversionUpload(this);
    this.$emit('emitHideTransparency');
  },
  close() {
    this.hasAdList = false;
    this.$emit('emitClose', {
      data: 'banner'
    });
  },
  convertAppSize(appSizeBytes) {
    let kb = appSizeBytes / 1024;
    if (kb >= 1024) {
      let mb = kb / 1024;
      return mb.toFixed(2) + 'MB';
    } else {
      return kb.toFixed(2) + 'KB';
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/reminder-ads.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/reminder-ads.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  adCodeData
} = (__webpack_require__(/*! ../../../config.js */ "./src/config.js")["default"]);
let nativeAd;
var _default = exports.default = {
  data() {
    return {
      adList: {},
      hasAdList: false,
      defaultAd: {
        desc: '华为广告',
        title: '华为联盟',
        icon: '广告',
        clickBtnTxt: '点击安装',
        img: "http://cdn.bank-zone.cn/pro/sy/admin/advertising/3639bdbde8e84397a297ad54f89ac4c3.jpg"
      },
      btnTxt: '',
      adId: "",
      adObj: "",
      showClik: false
    };
  },
  props: {
    showTransparency: {
      default: false
    }
  },
  onInit() {
    const branch = $ad.getProvider();
    this.adObj = adCodeData[branch];
    this.adId = 's2ytxth2mq';
    this.preloadAd();
  },
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  async preloadAd() {
    var that = this;
    this.getAdProvider();
    if (this.provider !== "huawei") {
      console.info("the device  does not support ad.");
      return;
    }
    console.log('是否进来了开启广告');
    nativeAd = $ad.createNativeAd({
      adUnitId: this.adId
    });
    nativeAd.onLoad(data => {
      this.adList = data.adList[0];
      this.hasAdList = true;
      this.reportNativeShow();
    });
    nativeAd.onError(e => {});
    nativeAd.load();
  },
  reportNativeClick() {
    $utils.buriedPointReport(this, 'click', this.adId);
    $utils.conversionUpload(this);
    nativeAd.reportAdClick({
      adId: this.adList.adId
    });
  },
  reportNativeShow() {
    if (nativeAd) {
      nativeAd.reportAdShow({
        adId: this.adList.adId
      });
    }
  },
  error(errCode, errMsg) {
    this.$emit('emitClose', {
      data: 'showReminder'
    });
    console.log('没有报错回调吗');
    if (this.debug) {
      _system.default.showToast({
        message: `ad load error: errCode = ${errCode}, errMsg = ${errMsg}`
      });
    }
  },
  adClick() {
    console.log('没有点击回调吗');
    $utils.conversionUpload(this);
    this.$emit('emitHideTransparency');
  },
  close() {
    console.log('没有关闭回调吗');
    this.hasAdList = false;
    this.$emit('emitClose', {
      data: 'showReminder'
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  adCodeData
} = (__webpack_require__(/*! ../../config.js */ "./src/config.js")["default"]);
let nativeAd;
var _default = exports.default = {
  private: {
    adList: {},
    hasAdList: true,
    defaultAd: {
      desc: '华为广告',
      title: '华为联盟',
      icon: '广告',
      clickBtnTxt: '点击安装',
      img: "http://cdn.bank-zone.cn/pro/sy/admin/advertising/3639bdbde8e84397a297ad54f89ac4c3.jpg"
    },
    btnTxt: '',
    adUnitId: '',
    adObj: {},
    adId: '',
    showBanner: true,
    showReminder: false,
    showVackTisp: false,
    showTransparency: false,
    adTitle: "",
    timer: null,
    isfristReqCoun: true,
    ad: null
  },
  onInit(e) {
    console.log('进来了1', e);
    if (e.channelValue) {
      let channelValue = e.channelValue;
      if (channelValue.charAt(channelValue.length - 1) === '/') {
        e.channelValue = channelValue.slice(0, -1);
      }
    }
    const {
      callback = '',
      oaid = '',
      type = '',
      channelValue = '',
      corp_id = ''
    } = e;
    if (Object.keys(e).length > 0) {
      console.log('进来了', e);
      this.$app.$def.dataApp.actiParam = _objectSpread({}, e);
      $utils.getConversionlicks(this);
    }
    const branch = $ad.getProvider();
    this.adObj = adCodeData[branch];
    this.adId = 'v5h5xsklp2';
  },
  onReady() {
    this.delayedDisplay();
    this.preloadAd();
    this.getTransparentLayerL();
  },
  onHide() {
    this.timer = null;
  },
  onBackPress() {
    this.showVackTisp = true;
    console.log('触发了怎么无效了');
    return true;
  },
  delayedDisplay() {
    this.timer = null;
    this.timer = setTimeout(() => {
      this.showReminder = true;
      console.log('怎么还没有触发', this);
    }, 4000);
  },
  getAdProvider: function () {
    this.provider = $ad.getProvider();
  },
  async preloadAd() {
    var that = this;
    this.getAdProvider();
    if (this.provider !== "huawei") {
      console.info("the device  does not support ad.");
      return;
    }
    console.log('是否进来了开启广告');
    nativeAd = $ad.createNativeAd({
      adUnitId: this.adId
    });
    nativeAd.onLoad(data => {
      console.info("ad data loaded: " + JSON.stringify(data));
      this.adList = data.adList[0];
      this.hasAdList = true;
      this.reportNativeShow();
    });
    nativeAd.onError(e => {
      this.hasAdList = true;
    });
    nativeAd.load();
  },
  error(errCode, errMsg) {
    console.log('没有报错回调吗');
    this.hasAdList = true;
    this.appearSwipe();
  },
  reportNativeClick(type) {
    $utils.buriedPointReport(this, 'click', this.adId);
    $utils.conversionUpload(this);
    nativeAd.reportAdClick({
      adId: this.adList.adId
    });
    if (type === 'btn') {
      this.addClickNum();
    }
  },
  reportNativeShow() {
    if (nativeAd) {
      nativeAd.reportAdShow({
        adId: this.adList.adId
      });
    }
  },
  adClick() {
    console.log('查看点击的this');
    this.showTransparency = false;
    console.log('没有点击回调吗');
    $utils.conversionUpload(this);
  },
  close() {
    console.log('没有触发这个吗');
    this.hasAdList = false;
    this.appearSwipe();
  },
  convertAppSize(appSizeBytes) {
    let kb = appSizeBytes / 1024;
    if (kb >= 1024) {
      let mb = kb / 1024;
      return mb.toFixed(2) + 'MB';
    } else {
      return kb.toFixed(2) + 'KB';
    }
  },
  appearSwipe(e) {
    console.log('点击的是跳转的参数噢');
    $router.replace({
      uri: "pages/readAd"
    });
  },
  getTransparentLayerL: function () {
    try {
      const branch = $ad.getProvider();
      let payam = {
        brand: branch.toUpperCase()
      };
      if (!this.isfristReqCoun) {
        payam.count = this.$app.$def.dataApp.transparentLayerHits;
        console.log(payam.count, '查看获取次数');
      }
      console.log(payam, '查看这个透明层获取的参数');
      $apis.task.getTransparentLayer(_objectSpread({}, payam)).then(res => {
        console.log(res, '查看这个透明层获取');
        if (this.isfristReqCoun) {
          this.isfristReqCoun = false;
          if (res.data) {
            this.getTransparentLayerL();
          }
          return;
        }
        this.showTransparency = res.data;
        console.log('查看触发透明层');
      }).catch(err => {
        console.log(err, '查看返回报错');
      });
    } catch (e) {
      console.log(e, '获取失效');
    }
  },
  hideTransparency() {
    console.log('点击了关闭广告');
    this.showTransparency = false;
    this.addClickNum();
  },
  addClickNum() {
    this.$app.$def.dataApp.transparentLayerHits = this.$app.$def.dataApp.transparentLayerHits + 1;
    this.getTransparentLayerL();
  },
  heideReminder(e) {
    this.addClickNum();
    console.log(e);
    const {
      detail = ''
    } = e;
    if (!detail) {} else {
      console.log('这是什么', detail.data);
      if (detail.data === 'showVackTisp') {
        this.showVackTisp = false;
      } else if (detail.data === 'showReminder') {
        this.showReminder = false;
      }
    }
  },
  hideReminder() {
    console.log('关闭倒计时窗口');
    this.showReminder = false;
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\apex-ui\\components\\navbar\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\apex-ui\\components\\navbar\\index.ux!./node_modules/apex-ui/components/navbar/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\apex-ui\components\navbar\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\apex-ui\components\navbar\index.ux!./node_modules/apex-ui/components/navbar/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".hide": {
    "display": "none"
  },
  ".show": {
    "display": "flex"
  },
  ".opacity-hide-to-show": {
    "animationName": "opacityHideToShow"
  },
  ".opacity-show-to-hide": {
    "animationName": "opacityShowToHide"
  },
  ".translate-left-to-center": {
    "animationName": "translateLeftToCenter"
  },
  ".translate-center-to-left": {
    "animationName": "translateCenterToLeft"
  },
  ".translate-right-to-center": {
    "animationName": "translateRightToCenter"
  },
  ".translate-center-to-right": {
    "animationName": "translateCenterToRight"
  },
  ".translate-top-to-center": {
    "animationName": "translateTopToCenter"
  },
  ".translate-center-to-top": {
    "animationName": "translateCenterToTop"
  },
  ".translate-bottom-to-center": {
    "animationName": "translateBottomToCenter"
  },
  ".translate-center-to-bottom": {
    "animationName": "translateCenterToBottom"
  },
  "@KEYFRAMES": {
    "opacityHideToShow": [
      {
        "opacity": 0,
        "time": 0
      },
      {
        "opacity": 1,
        "time": 100
      }
    ],
    "opacityShowToHide": [
      {
        "opacity": 1,
        "time": 0
      },
      {
        "opacity": 0,
        "time": 100
      }
    ],
    "translateLeftToCenter": [
      {
        "transform": "{\"translateX\":\"-100%\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 100
      }
    ],
    "translateCenterToLeft": [
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"-100%\"}",
        "time": 100
      }
    ],
    "translateRightToCenter": [
      {
        "transform": "{\"translateX\":\"100%\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 100
      }
    ],
    "translateCenterToRight": [
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"100%\"}",
        "time": 100
      }
    ],
    "translateTopToCenter": [
      {
        "transform": "{\"translateY\":\"-100%\"}",
        "time": 0
      },
      {
        "transform": "{\"translateY\":\"0%\"}",
        "time": 100
      }
    ],
    "translateCenterToTop": [
      {
        "transform": "{\"translateY\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateY\":\"-100%\"}",
        "time": 100
      }
    ],
    "translateBottomToCenter": [
      {
        "transform": "{\"translateY\":\"100%\"}",
        "time": 0
      },
      {
        "transform": "{\"translateY\":\"0%\"}",
        "time": 100
      }
    ],
    "translateCenterToBottom": [
      {
        "transform": "{\"translateY\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateY\":\"100%\"}",
        "time": 100
      }
    ]
  },
  ".apex-navbar": {
    "justifyContent": "space-between",
    "width": "100%",
    "paddingTop": "10px",
    "paddingRight": "10px",
    "paddingBottom": "10px",
    "paddingLeft": "10px"
  },
  ".apex-navbar .text": {
    "color": "#ffffff"
  },
  ".apex-navbar .left .text": {
    "fontSize": "30px"
  },
  ".apex-navbar .right .text": {
    "fontSize": "30px"
  },
  ".apex-navbar .title .text": {
    "fontSize": "30px"
  },
  ".apex-navbar-light": {
    "backgroundColor": "#ffffff"
  },
  ".apex-navbar-light .text": {
    "color": "#495060",
    "fontSize": "30px"
  },
  ".apex-navbar-dark": {
    "backgroundColor": "#1c2438"
  },
  ".apex-navbar-royal": {
    "backgroundColor": "#ff9900"
  },
  ".apex-navbar-positive": {
    "backgroundColor": "#19be6b"
  },
  ".apex-navbar-calm": {
    "backgroundColor": "#2d8cf0"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\components\\icon\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\components\\icon\\index.ux!./src/components/icon/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\components\icon\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\components\icon\index.ux!./src/components/icon/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "@FONT-FACE": {
    "iconfont": {
      "fontFamily": "iconfont",
      "src": [
        "/components/icon/iconfonts.ttf"
      ]
    }
  },
  ".font-icon": {
    "fontFamily": "iconfont",
    "textAlign": "center"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\back-to-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\back-to-ads.ux!./src/pages/advertisingCampaigns/components/back-to-ads.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\back-to-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\back-to-ads.ux!./src/pages/advertisingCampaigns/components/back-to-ads.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".back-to-ads": {
    "alignSelf": "center",
    "width": "750px",
    "height": "100%",
    "flexDirection": "column",
    "backgroundColor": "rgba(0,0,0,0.8)",
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".back-to-ads .ad-native": {
    "width": "690px",
    "height": "750px",
    "marginTop": "80px",
    "backgroundColor": "#ffffff",
    "borderRadius": "35px",
    "transform": "{\"translateY\":\"-100px\"}"
  },
  ".back-to-ads .ad-native .container": {
    "width": "100%",
    "height": "750px",
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".back-to-ads .ad-native .container .tisp-title": {
    "width": "100%",
    "height": "150px",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".back-to-ads .ad-native .container .tisp-title .tisp-title-txt": {
    "fontSize": "28px",
    "fontWeight": "600",
    "color": "#000000"
  },
  ".back-to-ads .ad-native .container .tisp-title .close-item": {
    "width": "50px",
    "height": "50px",
    "position": "absolute",
    "justifyContent": "center",
    "alignItems": "center",
    "top": "20px",
    "right": "50px"
  },
  ".back-to-ads .ad-native .container .top-big-img": {
    "flexDirection": "column",
    "height": "300px",
    "alignItems": "center",
    "width": "100%",
    "marginBottom": "50px",
    "paddingTop": "0px",
    "paddingRight": "25px",
    "paddingBottom": "0px",
    "paddingLeft": "25px"
  },
  ".back-to-ads .ad-native .container .top-big-img .ad-image": {
    "height": "300px",
    "width": "100%",
    "justifyContent": "center",
    "alignItems": "center"
  },
  ".back-to-ads .ad-native .container .top-big-img .ad-image image": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "15px",
    "objectFit": "fill"
  },
  ".back-to-ads .ad-native .container .top-big-img .float": {
    "position": "absolute",
    "top": "0px",
    "width": "100%",
    "justifyContent": "space-between"
  },
  ".back-to-ads .ad-native .container .horizontal-content": {
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".back-to-ads .ad-native .container .horizontal-content .ad-title": {
    "width": "100%",
    "justifyContent": "center",
    "alignItems": "center",
    "marginBottom": "20px",
    "height": "100px"
  },
  ".back-to-ads .ad-native .container .horizontal-content .ad-title .ad-title-txt": {
    "fontSize": "32px",
    "fontWeight": "500",
    "color": "#000000"
  },
  ".back-to-ads .ad-native .container .horizontal-content .ad-s-title": {
    "width": "80%",
    "height": "100px",
    "justifyContent": "flex-start",
    "alignContent": "center",
    "marginBottom": "20px"
  },
  ".back-to-ads .ad-native .container .horizontal-content .ad-s-title .ad-s-title-ad .ad-s-title-txt": {
    "textAlign": "center",
    "lines": 2,
    "textOverflow": "ellipsis",
    "fontSize": "32px",
    "color": "#000000"
  },
  ".back-to-ads .ad-native .container .horizontal-content .star-list": {
    "height": "80px",
    "justifyContent": "center",
    "marginBottom": "30px"
  },
  ".back-to-ads .ad-native .container .horizontal-content .foot-btn": {
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "200px",
    "flexDirection": "column"
  },
  ".back-to-ads .ad-native .container .horizontal-content .foot-btn .click-item": {
    "width": "400px",
    "height": "90px",
    "borderRadius": "60px",
    "fontSize": "34px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "color": "#ffffff",
    "textAlign": "center",
    "backgroundColor": "#ff1039",
    "animationName": "scaleDraw",
    "animationDelay": "0ms",
    "animationDuration": "1200ms",
    "animationTimingFunction": "ease-out",
    "animationIterationCount": -1,
    "justifyContent": "center",
    "alignItems": "center"
  },
  "@KEYFRAMES": {
    "scaleDraw": [
      {
        "transform": "{\"scaleX\":\"1\",\"scaleY\":\"1\"}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":\"1.1\",\"scaleY\":\"1.1\"}",
        "time": 25
      },
      {
        "transform": "{\"scaleX\":\"1\",\"scaleY\":\"1\"}",
        "time": 50
      },
      {
        "transform": "{\"scaleX\":\"1.1\",\"scaleY\":\"1.1\"}",
        "time": 75
      }
    ]
  },
  ".back-to-ads .ad-native .vertical-content": {
    "width": "100%"
  },
  ".back-to-ads .ad-native .vertical-content .ad-close": {
    "width": "50px",
    "height": "50px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\bottom-native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\bottom-native.ux!./src/pages/advertisingCampaigns/components/bottom-native.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\bottom-native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\bottom-native.ux!./src/pages/advertisingCampaigns/components/bottom-native.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".bottom-native": {
    "alignSelf": "center",
    "position": "fixed",
    "bottom": "0px",
    "width": "100%",
    "backgroundColor": "#ffffff",
    "height": "120px",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingTop": "15px",
    "paddingRight": "10px",
    "paddingBottom": "15px",
    "paddingLeft": "10px"
  },
  ".bottom-native .ad-native": {
    "alignSelf": "center",
    "width": "100%",
    "height": "100%",
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "flexDirection": "column"
  },
  ".bottom-native .container": {
    "width": "100%",
    "height": "100%",
    "alignItems": "center"
  },
  ".bottom-native .left-img": {
    "width": "200px",
    "height": "90px",
    "marginRight": "10px"
  },
  ".bottom-native .left-img .ad-img": {
    "width": "100%",
    "height": "100%"
  },
  ".bottom-native .left-img .ad-img image": {
    "width": "100%",
    "height": "100%",
    "objectFit": "fill",
    "borderRadius": "15px"
  },
  ".bottom-native .left-img .icon": {
    "position": "absolute",
    "top": "0px",
    "right": "0px",
    "backgroundColor": "rgba(0,0,0,0.6)"
  },
  ".bottom-native .float": {
    "alignItems": "center",
    "position": "absolute",
    "bottom": "0px",
    "left": "0px",
    "width": "80%"
  },
  ".bottom-native .float .float-txt": {
    "fontSize": "21px",
    "color": "#b3b3b5",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  ".bottom-native .center-info": {
    "flex": 1,
    "flexDirection": "column",
    "top": "-10px"
  },
  ".bottom-native .center-info .info-item": {
    "width": "100%"
  },
  ".bottom-native .center-info .info-item .txt": {
    "lines": 1,
    "fontSize": "28px",
    "textOverflow": "ellipsis"
  },
  ".bottom-native .center-info .info-item .title": {
    "color": "#000000",
    "fontWeight": "500"
  },
  ".bottom-native .center-info .info-item .tag": {
    "backgroundColor": "rgba(0,0,0,0.06)",
    "color": "#999999",
    "paddingTop": "0px",
    "paddingRight": "10px",
    "paddingBottom": "0px",
    "paddingLeft": "10px",
    "height": "56px",
    "width": "120px",
    "textAlign": "center",
    "borderRadius": "4px"
  },
  ".bottom-native .click-item": {
    "flexShrink": 0,
    "alignItems": "center",
    "justifyContent": "flex-end",
    "alignSelf": "flex-end",
    "marginRight": "8px"
  },
  ".bottom-native .click-item .title": {
    "color": "#999999"
  },
  ".bottom-native .click-item .click-txt": {
    "borderRadius": "30px",
    "fontSize": "34px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "color": "#ffffff",
    "textAlign": "right",
    "backgroundColor": "#ff0f39"
  },
  ".bottom-native .click-item .ad-close": {
    "alignSelf": "center",
    "marginLeft": "10px",
    "width": "50px",
    "height": "50px"
  },
  ".bottom-native .top-close": {
    "width": "50px",
    "height": "50px",
    "position": "absolute",
    "top": "0px",
    "right": "50px",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "rgba(205,205,207,0.5)"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\reminder-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\reminder-ads.ux!./src/pages/advertisingCampaigns/components/reminder-ads.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\reminder-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\reminder-ads.ux!./src/pages/advertisingCampaigns/components/reminder-ads.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".reminder-ads": {
    "alignSelf": "center",
    "width": "750px",
    "height": "100%",
    "flexDirection": "column",
    "backgroundColor": "rgba(0,0,0,0.8)",
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".reminder-ads .ad-native": {
    "width": "690px",
    "height": "800px",
    "marginTop": "80px",
    "backgroundColor": "#ffffff",
    "borderRadius": "35px"
  },
  ".reminder-ads .ad-native .container": {
    "width": "100%",
    "height": "750px",
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".reminder-ads .ad-native .container .top-big-img": {
    "flexDirection": "column",
    "height": "400px",
    "alignItems": "center",
    "width": "100%",
    "marginBottom": "50px"
  },
  ".reminder-ads .ad-native .container .top-big-img .ad-image": {
    "height": "400px",
    "width": "100%"
  },
  ".reminder-ads .ad-native .container .top-big-img .ad-image image": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "15px",
    "objectFit": "fill"
  },
  ".reminder-ads .ad-native .container .top-big-img .close-item": {
    "backgroundColor": "rgba(255,255,255,0.5)",
    "width": "60px",
    "height": "60px",
    "position": "absolute",
    "justifyContent": "center",
    "alignItems": "center",
    "top": "30px",
    "right": "40px",
    "borderRadius": "50%"
  },
  ".reminder-ads .ad-native .container .horizontal-content": {
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".reminder-ads .ad-native .container .horizontal-content .ad-title": {
    "width": "100%",
    "justifyContent": "center",
    "alignItems": "center",
    "marginBottom": "30px",
    "height": "100px"
  },
  ".reminder-ads .ad-native .container .horizontal-content .ad-title .ad-title-txt": {
    "fontSize": "32px",
    "fontWeight": "500",
    "color": "#000000"
  },
  ".reminder-ads .ad-native .container .horizontal-content .ad-s-title": {
    "width": "80%",
    "height": "100px",
    "justifyContent": "center",
    "alignContent": "center",
    "marginBottom": "30px"
  },
  ".reminder-ads .ad-native .container .horizontal-content .ad-s-title .ad-s-title-ad .ad-s-title-txt": {
    "textAlign": "center",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  ".reminder-ads .ad-native .container .horizontal-content .star-list": {
    "height": "80px",
    "justifyContent": "center",
    "marginBottom": "30px"
  },
  ".reminder-ads .ad-native .container .horizontal-content .foot-btn": {
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "200px"
  },
  ".reminder-ads .ad-native .container .horizontal-content .foot-btn .click-item": {
    "width": "400px",
    "height": "120px",
    "borderRadius": "60px",
    "fontSize": "34px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "color": "#ffffff",
    "textAlign": "center",
    "backgroundColor": "#ff1039",
    "animationName": "scaleDraw",
    "animationDelay": "0ms",
    "animationDuration": "1200ms",
    "animationTimingFunction": "ease-out",
    "animationIterationCount": -1,
    "justifyContent": "center",
    "alignItems": "center"
  },
  "@KEYFRAMES": {
    "scaleDraw": [
      {
        "transform": "{\"scaleX\":\"1\",\"scaleY\":\"1\"}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":\"1.1\",\"scaleY\":\"1.1\"}",
        "time": 25
      },
      {
        "transform": "{\"scaleX\":\"1\",\"scaleY\":\"1\"}",
        "time": 50
      },
      {
        "transform": "{\"scaleX\":\"1.1\",\"scaleY\":\"1.1\"}",
        "time": 75
      }
    ]
  },
  ".reminder-ads .ad-native .vertical-content": {
    "width": "100%"
  },
  ".reminder-ads .ad-native .vertical-content .ad-close": {
    "width": "50px",
    "height": "50px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\index.ux!./src/pages/advertisingCampaigns/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\index.ux!./src/pages/advertisingCampaigns/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "page": {
    "backgroundColor": "#f7f7f9"
  },
  ".advertising-page": {
    "flexDirection": "column",
    "alignSelf": "center",
    "backgroundColor": "#f7f7f9"
  },
  ".advertising-page .advertising-title": {
    "flexDirection": "column",
    "justifyContent": "center",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px"
  },
  ".advertising-page .advertising-title .m-heading": {
    "textAlign": "center",
    "fontWeight": "500",
    "color": "#000000",
    "fontSize": "36px",
    "marginBottom": "16px"
  },
  ".advertising-page .advertising-title .s-heading": {
    "textAlign": "center",
    "fontWeight": "500",
    "color": "#9e9ea0",
    "fontSize": "30px"
  },
  ".advertising-page .advertising-title .thank-you-speech": {
    "marginTop": "12px",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".advertising-page .advertising-title .thank-you-speech .txt": {
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px"
  },
  ".advertising-page .advertising-title .thank-you-speech .line": {
    "height": "3px",
    "width": "50px",
    "backgroundColor": "#ededef"
  },
  ".advertising-page .ad-compon": {
    "flexDirection": "column",
    "height": "100%",
    "paddingTop": "0px",
    "paddingRight": "32px",
    "paddingBottom": "0px",
    "paddingLeft": "32px"
  },
  ".advertising-page .ad-native": {
    "width": "100%",
    "flexDirection": "column",
    "height": "100%"
  },
  ".advertising-page .ad-native .container": {
    "width": "100%",
    "flexDirection": "column",
    "paddingTop": "20px",
    "paddingRight": "0px",
    "paddingBottom": "20px",
    "paddingLeft": "0px",
    "height": "100%"
  },
  ".advertising-page .ad-native .container .agreement": {
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  ".advertising-page .ad-native .container .agreement .agreement-item": {
    "width": "55%",
    "alignItems": "center",
    "height": "80px"
  },
  ".advertising-page .ad-native .container .agreement .agreement-item .txt": {
    "lines": 1,
    "fontSize": "28px",
    "textOverflow": "ellipsis"
  },
  ".advertising-page .ad-native .container .agreement .agreement-item-info": {
    "flexDirection": "column"
  },
  ".advertising-page .ad-native .container .agreement .hide-close": {
    "backgroundColor": "#c7c6c9",
    "borderRadius": "5px"
  },
  ".advertising-page .ad-native .container .ad-title": {
    "marginTop": "10px"
  },
  ".advertising-page .ad-native .container .ad-title .ad-title-txt": {
    "fontWeight": "500",
    "fontSize": "32px",
    "color": "#000000"
  },
  ".advertising-page .ad-native .container .vertical-content": {
    "width": "100%"
  },
  ".advertising-page .ad-native .container .vertical-content .ad-close": {
    "width": "50px",
    "height": "50px"
  },
  ".advertising-page .ad-native .container .big-img": {
    "flexDirection": "column",
    "alignItems": "center",
    "marginTop": "30px"
  },
  ".advertising-page .ad-native .container .big-img .ad-image": {
    "height": "500px",
    "width": "100%",
    "flexShrink": 0
  },
  ".advertising-page .ad-native .container .big-img .ad-image image": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "15px",
    "objectFit": "contain"
  },
  ".advertising-page .ad-native .container .big-img .logo": {
    "width": "100%",
    "paddingTop": "0px",
    "paddingRight": "20px",
    "paddingBottom": "0px",
    "paddingLeft": "20px",
    "justifyContent": "space-between",
    "position": "absolute",
    "top": "70px",
    "left": "0px"
  },
  ".advertising-page .ad-native .container .big-img .logo .close-item": {
    "backgroundColor": "rgba(205,205,207,0.5)"
  },
  ".advertising-page .ad-native .container .icon": {
    "width": "100%",
    "alignItems": "center",
    "height": "80px"
  },
  ".advertising-page .ad-native .container .icon .icon-image": {
    "width": "80px",
    "height": "80px"
  },
  ".advertising-page .ad-native .container .icon .icon-image image": {
    "width": "80px",
    "height": "80px",
    "objectFit": "contain"
  },
  ".advertising-page .ad-native .container .icon .icon-txt": {
    "fontWeight": "500",
    "marginLeft": "12px",
    "fontSize": "32px"
  },
  ".advertising-page .ad-native .container .footer": {
    "height": "96px",
    "width": "100%",
    "marginTop": "50px",
    "alignItems": "center"
  },
  ".advertising-page .ad-native .container .footer .click-item": {
    "flex": 1,
    "flexShrink": 0,
    "minWidth": "250px",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ff0f39",
    "borderRadius": "65px",
    "textAlign": "center",
    "color": "#F0F8FF",
    "height": "120px"
  },
  ".advertising-page .ad-native .container .footer .click-item .title": {
    "color": "#999999"
  },
  ".advertising-page .ad-native .container .footer .click-item .click-txt": {
    "fontSize": "34px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "textAlign": "center",
    "color": "#F0F8FF"
  },
  ".advertising-page .ad-native .container .footer .click-item .ad-close": {
    "alignSelf": "center",
    "marginLeft": "10px",
    "width": "50px",
    "height": "50px"
  },
  ".advertising-page .ad-native .container .swipe-left-btn": {
    "width": "300px",
    "height": "75px",
    "backgroundColor": "#999999",
    "borderRadius": "45px",
    "marginTop": "52px",
    "marginRight": "auto",
    "marginBottom": "0px",
    "marginLeft": "auto"
  },
  ".advertising-page .ad-native .container .swipe-left-btn text": {
    "color": "#ffffff"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "advertising-page"
  ],
  "children": [
    {
      "type": "my-navbar",
      "attr": {}
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "advertising-title"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "正品内容免费读"
          },
          "classList": [
            "m-heading"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "广告收益是为了激励作者提供优质内容"
          },
          "classList": [
            "s-heading"
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "thank-you-speech"
          ],
          "children": [
            {
              "type": "text",
              "attr": {},
              "classList": [
                "line"
              ]
            },
            {
              "type": "text",
              "attr": {
                "value": "感谢你的支持"
              },
              "classList": [
                "txt"
              ]
            },
            {
              "type": "text",
              "attr": {},
              "classList": [
                "line"
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
        "ad-compon"
      ],
      "shown": function () {return (this.hasAdList)},
      "children": [
        {
          "type": "div",
          "attr": {
            "adid": function () {return (this.adList.adId)},
            "show": function () {return (!!this.adList.adId)}
          },
          "classList": [
            "ad-native"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "container"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "agreement"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "agreement-item",
                        "agreement-item-info"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adList.title+this.adList.appCompany)}
                          },
                          "classList": [
                            "txt"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {
                        "type": "privacy"
                      },
                      "classList": [
                        "agreement-item"
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "hide-close"
                      ],
                      "shown": function () {return (this.showTransparency)},
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "50",
                            "color": "#FFFFFF"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "hide-close"
                      ],
                      "shown": function () {return (!(this.showTransparency))},
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "50",
                            "color": "#FFFFFF"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {
                    "type": "click"
                  },
                  "classList": [
                    "ad-title"
                  ],
                  "events": {
                    "click": "reportNativeClick"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.adList.desc||this.defaultAd.desc)}
                      },
                      "classList": [
                        "ad-title-txt"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "vertical-content",
                    "big-img"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "ad-image"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return (this.adList.imgUrlList?this.adList.imgUrlList[0]:this.defaultAd.img)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "vertical-content",
                        "logo"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "click"
                          },
                          "classList": [
                            "close-item"
                          ],
                          "shown": function () {return (this.showTransparency)},
                          "events": {
                            "click": "reportNativeClick"
                          },
                          "children": [
                            {
                              "type": "icon",
                              "attr": {
                                "type": "close",
                                "size": "45",
                                "color": "#FFFFFF"
                              },
                              "events": {
                                "click": "close"
                              }
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "close-item"
                          ],
                          "shown": function () {return (!(this.showTransparency))},
                          "children": [
                            {
                              "type": "icon",
                              "attr": {
                                "type": "close",
                                "size": "45",
                                "color": "#FFFFFF"
                              },
                              "events": {
                                "click": "close"
                              }
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {
                            "type": "logo"
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
                    "icon"
                  ],
                  "shown": function () {return (this.adList.icon)},
                  "events": {
                    "click": "reportNativeClick"
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "clikc"
                      },
                      "classList": [
                        "icon-image"
                      ],
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return (this.adList.icon)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.adList.title)}
                      },
                      "classList": [
                        "icon-txt"
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "footer"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "button"
                      },
                      "classList": [
                        "click-item"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adList.clickBtnTxt||this.defaultAd.clickBtnTxt)}
                          },
                          "style": {
                            "color": "#ffffff"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {
                    "type": "click"
                  },
                  "classList": [
                    "swipe-left-btn"
                  ],
                  "shown": function () {return (this.showTransparency)},
                  "events": {
                    "click": function(evt){this.reportNativeClick('btn',evt)}
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "style": {
                        "left": "20px"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "arrow-back",
                            "size": "45",
                            "color": "#FFFFFF"
                          }
                        }
                      ]
                    },
                    {
                      "type": "icon",
                      "attr": {
                        "type": "arrow-back",
                        "size": "45",
                        "color": "#FFFFFF"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "左滑继续阅读"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "swipe-left-btn"
                  ],
                  "events": {
                    "click": "appearSwipe",
                    "swipe": "appearSwipe"
                  },
                  "shown": function () {return (!this.showTransparency)},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "style": {
                        "left": "20px"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "arrow-back",
                            "size": "45",
                            "color": "#FFFFFF"
                          }
                        }
                      ]
                    },
                    {
                      "type": "icon",
                      "attr": {
                        "type": "arrow-back",
                        "size": "45",
                        "color": "#FFFFFF"
                      }
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "左滑继续阅读"
                      }
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
      "type": "bottom-native",
      "attr": {
        "adUnitid": function () {return (this.adId)},
        "adList": function () {return (this.adList)},
        "showTransparency": function () {return (this.showTransparency)}
      },
      "shown": function () {return (this.showBanner)},
      "events": {
        "emit-hide-transparency": "hideTransparency"
      }
    },
    {
      "type": "reminder-ads",
      "attr": {
        "showTransparency": function () {return (this.showTransparency)}
      },
      "shown": function () {return (this.showReminder)},
      "events": {
        "emit-hide-transparency": "hideTransparency",
        "emit-close": "heideReminder"
      }
    },
    {
      "type": "back-to-ads",
      "attr": {
        "showTransparency": function () {return (this.showTransparency)}
      },
      "shown": function () {return (this.showVackTisp)},
      "events": {
        "emit-hide-transparency": "hideTransparency",
        "emit-close": "heideReminder"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=back-to-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/back-to-ads.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=back-to-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/back-to-ads.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "back-to-ads"
      ],
      "shown": function () {return (this.hasAdList)},
      "children": [
        {
          "type": "div",
          "attr": {
            "show": "{!!adList.adId}}"
          },
          "classList": [
            "ad-native"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "container"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "tisp-title"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "退出前看个广告？"
                      },
                      "classList": [
                        "tisp-title-txt"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      }
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "close-item"
                      ],
                      "shown": function () {return (this.showTransparency)},
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#000000"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "close-item"
                      ],
                      "shown": function () {return (!(this.showTransparency))},
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#000000"
                          },
                          "events": {
                            "click": "close"
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
                    "vertical-content",
                    "top-big-img"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "ad-image"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return (this.adList.imgUrlList?this.adList.imgUrlList[0]:this.defaultAd.img)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "float"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "privacy"
                          },
                          "classList": [
                            "ad-image"
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {
                            "type": "logo"
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
                    "vertical-content",
                    "horizontal-content"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "ad-s-title"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "click"
                          },
                          "classList": [
                            "ad-s-title-ad"
                          ],
                          "events": {
                            "click": "reportNativeClick"
                          },
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.adList.desc||this.defaultAd.desc)}
                              },
                              "classList": [
                                "ad-s-title-txt"
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
                        "foot-btn",
                        "vertical-content"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "button"
                          },
                          "classList": [
                            "click-item"
                          ],
                          "events": {
                            "click": "reportNativeClick"
                          },
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.adList.clickBtnTxt||this.defaultAd.clickBtnTxt)}
                              },
                              "style": {
                                "color": "#ffffff"
                              }
                            }
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": "立即退出"
                          },
                          "style": {
                            "marginTop": "10px",
                            "fontSize": "22px"
                          },
                          "events": {
                            "click": "backHome"
                          }
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
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-native&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/bottom-native.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-native&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/bottom-native.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "bottom-native"
      ],
      "shown": function () {return (this.hasAdList)},
      "children": [
        {
          "type": "div",
          "attr": {
            "adid": function () {return (this.adList.adId)},
            "show": function () {return (!!this.adList.adId)}
          },
          "classList": [
            "ad-native"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "container"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "left-img"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "ad-img"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return (this.adList.imgUrlList?this.adList.imgUrlList[0]:this.defaultAd.img)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "icon"
                      ],
                      "shown": function () {return (this.showTransparency)},
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#FFFFFF"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "icon"
                      ],
                      "shown": function () {return (!(this.showTransparency))},
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#FFFFFF"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {
                    "type": "click"
                  },
                  "classList": [
                    "center-info"
                  ],
                  "events": {
                    "click": "reportNativeClick"
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "info-item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adList?this.adList.title:this.defaultAd.title)}
                          },
                          "classList": [
                            "txt",
                            "title"
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {
                            "type": "logo"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "info-item"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adList?this.adList.desc:this.defaultAd.desc)}
                          },
                          "classList": [
                            "txt"
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
                    "click-item"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "button"
                      },
                      "classList": [
                        "click-txt"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adList.clickBtnTxt||this.defaultAd.clickBtnTxt)}
                          },
                          "style": {
                            "color": "#ffffff"
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
                    "float"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "privacy"
                          }
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.adList.appInfo.appName+this.adList.appInfo.appSize+this.adList.appInfo.appVersion+this.adList.appInfo.developer)}
                      },
                      "classList": [
                        "float-txt"
                      ],
                      "shown": function () {return (this.adList.hasAppMiitInfo)}
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {
                    "type": "click"
                  },
                  "classList": [
                    "top-close"
                  ],
                  "shown": function () {return (this.showTransparency)},
                  "events": {
                    "click": "reportNativeClick"
                  },
                  "children": [
                    {
                      "type": "icon",
                      "attr": {
                        "type": "close",
                        "size": "50",
                        "color": "#000000"
                      },
                      "events": {
                        "click": "close"
                      }
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "top-close"
                  ],
                  "shown": function () {return (!(this.showTransparency))},
                  "children": [
                    {
                      "type": "icon",
                      "attr": {
                        "type": "close",
                        "size": "50",
                        "color": "#000000"
                      },
                      "events": {
                        "click": "close"
                      }
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

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/components/icon/index.ux":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/components/icon/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "text",
  "attr": {
    "value": function () {return (this.unescapeFontIconCode(this.iconMap[this.type]))}
  },
  "classList": [
    "font-icon"
  ],
  "style": function () {return 'font-size: '+((this.size*this.ratio/750))+'px;color: '+((this.color))+';'}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-navbar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/apex-ui/components/navbar/index.ux":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-navbar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/apex-ui/components/navbar/index.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": function () {return ['apex-navbar', 'apex-navbar-'+(this.theme)]},
  "style": function () {return 'height:'+((this.height))+'px'},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "left"
      ],
      "events": {
        "click": "clickHandlerLeft"
      },
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.leftText)}
          },
          "classList": [
            "text"
          ],
          "shown": function () {return (this.leftText)}
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "title"
      ],
      "children": [
        {
          "type": "block",
          "attr": {},
          "shown": function () {return (this.title)},
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return (this.title)}
              },
              "classList": [
                "text"
              ]
            }
          ]
        },
        {
          "type": "block",
          "attr": {},
          "shown": function () {return (!this.title)},
          "children": [
            {
              "type": "slot",
              "attr": {}
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "right"
      ],
      "events": {
        "click": "clickHandlerRight"
      },
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.rightText)}
          },
          "classList": [
            "text"
          ],
          "shown": function () {return (this.rightText)}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reminder-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/reminder-ads.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reminder-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/reminder-ads.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "reminder-ads"
      ],
      "shown": function () {return (this.hasAdList)},
      "children": [
        {
          "type": "div",
          "attr": {
            "show": "{!!adList.adId}}"
          },
          "classList": [
            "ad-native"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "container"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "vertical-content",
                    "top-big-img"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "ad-image"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "image",
                          "attr": {
                            "src": function () {return (this.adList.imgUrlList?this.adList.imgUrlList[0]:this.defaultAd.img)}
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {
                        "type": "click"
                      },
                      "classList": [
                        "close-item"
                      ],
                      "shown": function () {return (this.showTransparency)},
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#000000"
                          },
                          "events": {
                            "click": "close"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "close-item"
                      ],
                      "shown": function () {return (!(this.showTransparency))},
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "close",
                            "size": "40",
                            "color": "#000000"
                          },
                          "events": {
                            "click": "close"
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
                    "vertical-content",
                    "horizontal-content"
                  ],
                  "events": {
                    "click": "reportNativeClick"
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "ad-title"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "children": [
                            {
                              "type": "div",
                              "attr": {
                                "type": "click"
                              },
                              "children": [
                                {
                                  "type": "text",
                                  "attr": {
                                    "value": function () {return (this.adList.title||this.defaultAd.title)}
                                  },
                                  "classList": [
                                    "ad-title-txt"
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "div",
                          "attr": {
                            "type": "logo"
                          }
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "ad-s-title"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "click"
                          },
                          "classList": [
                            "ad-s-title-ad"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.adList.desc||this.defaultAd.desc)}
                              },
                              "classList": [
                                "ad-s-title-txt"
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
                        "vertical-content",
                        "star-list"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "icon",
                          "attr": {
                            "type": "star",
                            "size": "58",
                            "color": "#FFCE2D"
                          },
                          "repeat": function () {return (5)}
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "foot-btn",
                        "vertical-content"
                      ],
                      "events": {
                        "click": "reportNativeClick"
                      },
                      "children": [
                        {
                          "type": "div",
                          "attr": {
                            "type": "button"
                          },
                          "classList": [
                            "click-item"
                          ],
                          "children": [
                            {
                              "type": "text",
                              "attr": {
                                "value": function () {return (this.adList.clickBtnTxt||this.defaultAd.clickBtnTxt)}
                              },
                              "style": {
                                "color": "#ffffff"
                              }
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
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/apex-ui/components/navbar/index.ux?name=my-navbar":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/apex-ui/components/navbar/index.ux?name=my-navbar ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-navbar!../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=my-navbar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/apex-ui/components/navbar/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\apex-ui\components\navbar\index.ux!../../../less-loader!../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\apex-ui\components\navbar\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\apex-ui\\components\\navbar\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\apex-ui\\components\\navbar\\index.ux!./node_modules/apex-ui/components/navbar/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/apex-ui/components/navbar/index.ux")

$app_define$('@app-component/my-navbar', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=icon!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/components/icon/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\components\icon\index.ux!../../../node_modules/less-loader!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\components\icon\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\components\\icon\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\components\\icon\\index.ux!./src/components/icon/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/components/icon/index.ux")

$app_define$('@app-component/icon', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/back-to-ads.ux?name=back-to-ads":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/back-to-ads.ux?name=back-to-ads ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../components/icon/index.ux?name=icon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon")
var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=back-to-ads&depends[]=icon!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./back-to-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=back-to-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/back-to-ads.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\back-to-ads.ux!../../../../node_modules/less-loader!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\back-to-ads.ux!./back-to-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\back-to-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\back-to-ads.ux!./src/pages/advertisingCampaigns/components/back-to-ads.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./back-to-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/back-to-ads.ux")

$app_define$('@app-component/back-to-ads', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/bottom-native.ux?name=bottom-native":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/bottom-native.ux?name=bottom-native ***!
  \**********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../components/icon/index.ux?name=icon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon")
var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-native&depends[]=icon!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./bottom-native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-native&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/bottom-native.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\bottom-native.ux!../../../../node_modules/less-loader!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\bottom-native.ux!./bottom-native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\bottom-native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\bottom-native.ux!./src/pages/advertisingCampaigns/components/bottom-native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./bottom-native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/bottom-native.ux")

$app_define$('@app-component/bottom-native', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/reminder-ads.ux?name=reminder-ads":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/reminder-ads.ux?name=reminder-ads ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../components/icon/index.ux?name=icon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon")
var $app_template$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reminder-ads&depends[]=icon!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./reminder-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reminder-ads&depends[]=icon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/components/reminder-ads.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\reminder-ads.ux!../../../../node_modules/less-loader!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\components\reminder-ads.ux!./reminder-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\reminder-ads.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\components\\reminder-ads.ux!./src/pages/advertisingCampaigns/components/reminder-ads.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./reminder-ads.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/components/reminder-ads.ux")

$app_define$('@app-component/reminder-ads', [], function($app_require$, $app_exports$, $app_module$){
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
/*!*************************************************!*\
  !*** ./src/pages/advertisingCampaigns/index.ux ***!
  \*************************************************/
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../components/icon/index.ux?name=icon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./components/bottom-native.ux?name=bottom-native */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/bottom-native.ux?name=bottom-native")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./components/reminder-ads.ux?name=reminder-ads */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/reminder-ads.ux?name=reminder-ads")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./components/back-to-ads.ux?name=back-to-ads */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/back-to-ads.ux?name=back-to-ads")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../node_modules/apex-ui/components/navbar/index.ux?name=my-navbar */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/apex-ui/components/navbar/index.ux?name=my-navbar")
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/advertisingCampaigns/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\index.ux!../../../node_modules/less-loader!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\advertisingCampaigns\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\advertisingCampaigns\\index.ux!./src/pages/advertisingCampaigns/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/advertisingCampaigns/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXHBhZ2VzXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdmZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9hcGV4LXVpL2NvbXBvbmVudHMvbmF2YmFyL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXGFwZXgtdWlcXGNvbXBvbmVudHNcXG5hdmJhclxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2ljb24vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcY29tcG9uZW50c1xcaWNvblxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXHBhZ2VzXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcY29tcG9uZW50c1xcYmFjay10by1hZHMudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXHBhZ2VzXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcY29tcG9uZW50c1xcYm90dG9tLW5hdGl2ZS51eCIsIndlYnBhY2s6Ly8vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xccGFnZXNcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxjb21wb25lbnRzXFxyZW1pbmRlci1hZHMudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxwYWdlc1xcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXGluZGV4LnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcGV4LXVpL2NvbXBvbmVudHMvbmF2YmFyL2luZGV4LnV4PzU4YTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eD9iODU1Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4P2Q4ZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYm90dG9tLW5hdGl2ZS51eD9mM2ExIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL3JlbWluZGVyLWFkcy51eD81NTRkIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9pbmRleC51eD9lMmRhIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9pbmRleC51eD9hY2Q0Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4P2M4MmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYm90dG9tLW5hdGl2ZS51eD85OTE1Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaW5kZXgudXg/Nzk2YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBleC11aS9jb21wb25lbnRzL25hdmJhci9pbmRleC51eD8zZjgwIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL3JlbWluZGVyLWFkcy51eD81YThjIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcGV4LXVpL2NvbXBvbmVudHMvbmF2YmFyL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2ljb24vaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYmFjay10by1hZHMudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYm90dG9tLW5hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9yZW1pbmRlci1hZHMudXgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaWNvbnMgPSB2b2lkIDA7XG5jb25zdCBpY29ucyA9IGV4cG9ydHMuaWNvbnMgPSB7XG4gICdhZGQtY2lyY2xlLW8nOiAnJiN4ZTk3NycsXG4gICdhZGQtY2lyY2xlJzogJyYjeGU5NzYnLFxuICBhZGQ6ICcmI3hlOTc1JyxcbiAgYWlycGxhbmU6ICcmI3hlOTc0JyxcbiAgYWxhcm06ICcmI3hlOTczJyxcbiAgJ2Fycm93LWJhY2snOiAnJiN4ZTk3MicsXG4gICdhcnJvdy1kb3duJzogJyYjeGU5NzEnLFxuICAnYXJyb3ctZHJvcGRvd24tY2lyY2xlJzogJyYjeGU5NzAnLFxuICAnYXJyb3ctZHJvcGRvd24nOiAnJiN4ZTk2ZicsXG4gICdhcnJvdy1kcm9wbGVmdC1jaXJjbGUnOiAnJiN4ZTk2ZScsXG4gICdhcnJvdy1kcm9wbGVmdCc6ICcmI3hlOTZkJyxcbiAgJ2Fycm93LWRyb3ByaWdodC1jaXJjbGUnOiAnJiN4ZTk2YycsXG4gICdhcnJvdy1kcm9wcmlnaHQnOiAnJiN4ZTk2YicsXG4gICdhcnJvdy1kcm9wdXAtY2lyY2xlJzogJyYjeGU5NmEnLFxuICAnYXJyb3ctZHJvcHVwJzogJyYjeGU5NjknLFxuICAnYXJyb3ctZndkJzogJyYjeGU5NjgnLFxuICAnYXJyb3ctcm91bmQtYmFjayc6ICcmI3hlOTY3JyxcbiAgJ2Fycm93LXJvdW5kLWRvd24nOiAnJiN4ZTk2NicsXG4gICdhcnJvdy1yLWZ3ZCc6ICcmI3hlOTY1JyxcbiAgJ2Fycm93LXJvdW5kLXVwJzogJyYjeGU5NjQnLFxuICAnYXJyb3ctdXAnOiAnJiN4ZTk2MycsXG4gIGJsdWV0b290aDogJyYjeGU5NjInLFxuICBidWc6ICcmI3hlOTYxJyxcbiAgYnVpbGQ6ICcmI3hlOTYwJyxcbiAgYnVzaW5lc3M6ICcmI3hlOTVmJyxcbiAgY2FsbDogJyYjeGU5NWUnLFxuICBjYW1lcmE6ICcmI3hlOTVkJyxcbiAgY2FyZDogJyYjeGU5NWMnLFxuICBjYXJ0OiAnJiN4ZTk1YicsXG4gIGNoYXRib3g6ICcmI3hlOTVhJyxcbiAgY2hhdDogJyYjeGU5NTknLFxuICAnY2hlY2tib3gtb3V0bGluZSc6ICcmI3hlOTU4JyxcbiAgY2hlY2tib3g6ICcmI3hlOTU3JyxcbiAgJ2NoZWNrbWFyay1jaXJjbGUtb3V0bGluZSc6ICcmI3hlOTU2JyxcbiAgJ2NoZWNrbWFyay1jaXJjbGUnOiAnJiN4ZTk1NScsXG4gIGNoZWNrbWFyazogJyYjeGU5NTQnLFxuICAnY2xvc2UtY2lyY2xlLW91dGxpbmUnOiAnJiN4ZTk1MycsXG4gICdjbG9zZS1jaXJjbGUnOiAnJiN4ZTk1MicsXG4gIGNsb3NlOiAnJiN4ZTk1MScsXG4gICdjbG91ZC1kb25lJzogJyYjeGU5NTAnLFxuICAnY2xvdWQtZG93bic6ICcmI3hlOTRmJyxcbiAgJ2Nsb3VkLXVwJzogJyYjeGU5NGUnLFxuICBjdXQ6ICcmI3hlOTRkJyxcbiAgJ2V5ZS1vZmYnOiAnJiN4ZTk0YycsXG4gIGV5ZTogJyYjeGU5NGInLFxuICAnZmluZ2VyLXByaW50JzogJyYjeGU5NGEnLFxuICAnZmxhc2gtb2ZmJzogJyYjeGU5NDknLFxuICBmbGFzaDogJyYjeGU5NDgnLFxuICBmbGFzaGxpZ2h0OiAnJiN4ZTk0NycsXG4gIGZ1bm5lbDogJyYjeGU5NDYnLFxuICBnaWZ0OiAnJiN4ZTk0NScsXG4gICdoZWFydC1kaXNsaWtlJzogJyYjeGU5NDQnLFxuICAnaGVhcnQtZW1wdHknOiAnJiN4ZTk0MycsXG4gICdoZWFydC1oYWxmJzogJyYjeGU5NDInLFxuICBoZWFydDogJyYjeGU5NDEnLFxuICAnaGVscC1jaXJjbGUtb3V0bGluZSc6ICcmI3hlOTQwJyxcbiAgJ2hlbHAtY2lyY2xlJzogJyYjeGU5M2YnLFxuICBpbWFnZTogJyYjeGU5M2UnLFxuICBpbWFnZXM6ICcmI3hlOTNkJyxcbiAgaW5maW5pdGU6ICcmI3hlOTNjJyxcbiAgJ2luZm9ybWF0aW9uLWNpcmNsZS1vdXRsaW5lJzogJyYjeGU5M2InLFxuICAnaW5mb3JtYXRpb24tY2lyY2xlJzogJyYjeGU5M2EnLFxuICBrZXk6ICcmI3hlOTM5JyxcbiAgbGluazogJyYjeGU5MzgnLFxuICBsaXN0OiAnJiN4ZTkzNycsXG4gIG1haWw6ICcmI3hlOTM2JyxcbiAgbWVudTogJyYjeGU5MzUnLFxuICBtdXNpY2FsOiAnJiN4ZTkzNCcsXG4gICdub3RpZmljYXRpb24tb2ZmJzogJyYjeGU5MzMnLFxuICAnbm90aWZpY2F0aW9uLW8nOiAnJiN4ZTkzMicsXG4gIG5vdGlmaWNhdGlvbjogJyYjeGU5MzEnLFxuICBvcHRpb25zOiAnJiN4ZTkzMCcsXG4gICdwYXBlci1wbGFuZSc6ICcmI3hlOTJmJyxcbiAgcGF1c2U6ICcmI3hlOTJlJyxcbiAgcGVvcGxlOiAnJiN4ZTkyZCcsXG4gICdwZXJzb24tYWRkJzogJyYjeGU5MmMnLFxuICBwZXJzb246ICcmI3hlOTJiJyxcbiAgcGllOiAnJiN4ZTkyYScsXG4gIHBpbjogJyYjeGU5MjknLFxuICAncGxheS1jaXJjbGUnOiAnJiN4ZTkyOCcsXG4gIHBsYXk6ICcmI3hlOTI3JyxcbiAgcG93ZXI6ICcmI3hlOTI2JyxcbiAgcHJpY2V0YWc6ICcmI3hlOTI1JyxcbiAgcHJpY2V0YWdzOiAnJiN4ZTkyNCcsXG4gIHByaW50OiAnJiN4ZTkyMycsXG4gICdxci1zY2FubmVyJzogJyYjeGU5MjInLFxuICAncmVmcmVzaC1jaXJjbGUnOiAnJiN4ZTkyMScsXG4gIHJlZnJlc2g6ICcmI3hlOTIwJyxcbiAgJ3JlbW92ZS1jaXJjbGUtb3V0bGluZSc6ICcmI3hlOTFmJyxcbiAgJ3JlbW92ZS1jaXJjbGUnOiAnJiN4ZTkxZScsXG4gIHJld2luZDogJyYjeGU5MWQnLFxuICByb2NrZXQ6ICcmI3hlOTFjJyxcbiAgc2F2ZTogJyYjeGU5MWInLFxuICBzZWFyY2g6ICcmI3hlOTFhJyxcbiAgc2V0dGluZ3M6ICcmI3hlOTE5JyxcbiAgJ3NoYXJlLWFsdCc6ICcmI3hlOTE4JyxcbiAgJ3NraXAtYndkJzogJyYjeGU5MTcnLFxuICAnc2tpcC1md2QnOiAnJiN4ZTkxNicsXG4gIHNub3c6ICcmI3hlOTE1JyxcbiAgJ3N0YXItaGFsZic6ICcmI3hlOTE0JyxcbiAgJ3N0YXItb3V0bGluZSc6ICcmI3hlOTEzJyxcbiAgc3RhcjogJyYjeGU5MTInLFxuICBzdGF0czogJyYjeGU5MTEnLFxuICBzeW5jOiAnJiN4ZTkxMCcsXG4gICd0aHVtYnMtZG93bic6ICcmI3hlOTBmJyxcbiAgJ3RodW1icy11cCc6ICcmI3hlOTBlJyxcbiAgdGltZTogJyYjeGU5MGQnLFxuICB0aW1lcjogJyYjeGU5MGMnLFxuICB0cmFzaDogJyYjeGU5MGInLFxuICAndHJlbmQtZG93bic6ICcmI3hlOTBhJyxcbiAgJ3RyZW5kLXVwJzogJyYjeGU5MDknLFxuICB1bmRvOiAnJiN4ZTkwOCcsXG4gIHVubG9jazogJyYjeGU5MDcnLFxuICAndm9sLWhpZ2gnOiAnJiN4ZTkwNicsXG4gICd2b2wtbG93JzogJyYjeGU5MDUnLFxuICAndm9sLW11dGUnOiAnJiN4ZTkwNCcsXG4gICd2b2wtb2ZmJzogJyYjeGU5MDMnLFxuICB3YXJuaW5nOiAnJiN4ZTkwMicsXG4gIHdpZmk6ICcmI3hlOTAxJyxcbiAgd29tYW46ICcmI3hlOTAwJ1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmNvbnN0IGFkQ29kZURhdGEgPSB7XG4gIGFwcGlkOiAxMTEyNTY5ODMsXG4gIG5hdGl2ZUFkOiAndjVoNXhza2xwMicsXG4gIC8v5Y6f55SfXG4gIHRhYmxlU2NyZWVuOiAnYTdudmw3Zm0wMCcsXG4gIHN0aW11bGF0ZUFkOiAnbzByYmV2Y2VweCcsXG4gIC8vdGVzdHg5ZHRqd2o4aHAg5rWL6K+V57yW56CBIFxuICBsb3R0ZXJ5UGFnZU5hdGl2ZUFkOiAnczJ5dHh0aDJtcSdcbn07XG4vLyBjb25zdCBwdWJsaWNLZXkgPSBgTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFxYWowWTNrNTRqQ3lUcTQ3dDczU1xuLy8gY0JYOXVCc1NTY0RvNy91WitQaEhZaDllUXFITlcxYkJqS0dWNHQzWThXb2todjc4M2tyeGhJcXprUGY5bkhlWlxuLy8gMnlXcW9RbFBhM3FPVWM3V2YvSHBYMitlSEdSakYxL1JMQVJKbU1jRWdRWUIzV0diZFJlZHUwRmpRU0dkK09mU1xuLy8gUy9XN0hlaDJaR2xGL2FTSGoyTlloWUU0cDd4NGpqUUlpK3VlS1p2VkpOWnB1MHZoUWFGNDVqcHFRRFVMUEwrTVxuLy8ga2tRZVBtdXBqcC9QUjRSYThCVmc0RHdKdUk2SzhqTDc3WVdheGVRUmJNckVpUTBaYlRLUlE0bzhONzNpSU05N1xuLy8gRS9oOFBiRGw1RmJ1Tm4wazh1cmtZbm12NTZBTWRrVkV5SU9Vd05FYThvVTlRS3ozN281WjJMNyt5cXgyem1McFxuLy8gVndJREFRQUJgO1xuLy8g56eB6ZKlXG5jb25zdCBwcml2YXRlS2V5ID0gXCJcIjtcbmNvbnN0IGN1cnJlbnRTZXJ2aWNlID0gXCJwcm9kXCI7XG5jb25zdCBhcHBDb25maWcgPSB7XG4gIHByb2Q6IHtcbiAgICBCQVNFSE9TVDogXCJodHRwczovL2FwaS5paGFpdHVvLmNuXCJcbiAgfSxcbiAgZGV2OiB7XG4gICAgQkFTRUhPU1Q6IFwiaHR0cDovLzE5Mi4xNjguMy40ODo5OTk5XCJcbiAgfSxcbiAgdWF0OiB7XG4gICAgQkFTRUhPU1Q6IFwiaHR0cHM6Ly9taW5pLmNueWluZ3MuY29tXCJcbiAgfSxcbiAgdGVzdDoge1xuICAgIEJBU0VIT1NUOiBcImh0dHBzOi8vdGVzdC5pcGFuZGF0YS5jb21cIlxuICB9XG59O1xudmFyIF9kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBhZENvZGVEYXRhLFxuICAvLyBwdWJsaWNLZXksXG4gIHByaXZhdGVLZXksXG4gIEJBU0VIT1NUOiBhcHBDb25maWdbY3VycmVudFNlcnZpY2VdLkJBU0VIT1NUXG59OyIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImFwZXgtbmF2YmFyIGFwZXgtbmF2YmFyLXt7dGhlbWV9fVwiIHN0eWxlPVwiaGVpZ2h0Ont7aGVpZ2h0fX1weFwiPlxuICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCIgb25jbGljaz1cImNsaWNrSGFuZGxlckxlZnRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwidGV4dFwiIGlmPVwie3sgbGVmdFRleHQgfX1cIj57eyBsZWZ0VGV4dCB9fTwvdGV4dD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgIDxibG9jayBpZj1cInt7IHRpdGxlIH19XCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidGV4dFwiPnt7IHRpdGxlIH19PC90ZXh0PlxuICAgICAgPC9ibG9jaz5cbiAgICAgIDxibG9jayBpZj1cInt7ICF0aXRsZSB9fVwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICA8L2Jsb2NrPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiIG9uY2xpY2s9XCJjbGlja0hhbmRsZXJSaWdodFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0ZXh0XCIgaWY9XCJ7eyByaWdodFRleHQgfX1cIj57eyByaWdodFRleHQgfX08L3RleHQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuQGltcG9ydCBcIi4uL3N0eWxlcy9iYXNlLmxlc3NcIjtcblxuLmFwZXgtbmF2YmFyIHtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTBweCAqIEByYXRpbztcbiAgLnRleHQge1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICB9XG4gIC5sZWZ0LFxuICAucmlnaHQsXG4gIC50aXRsZSB7XG4gICAgLnRleHQge1xuICAgICAgZm9udC1zaXplOiBAdGV4dC1zaXplO1xuICAgIH1cbiAgfVxuICAmLWxpZ2h0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIC50ZXh0IHtcbiAgICAgIGNvbG9yOiBAdGV4dC1jb2xvcjtcbiAgICAgIGZvbnQtc2l6ZTogQHRleHQtc2l6ZTtcbiAgICB9XG4gIH1cbiAgJi1kYXJrIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAdGl0bGUtY29sb3I7XG4gIH1cbiAgJi1yb3lhbCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdhcm5pbmctY29sb3I7XG4gIH1cbiAgJi1wb3NpdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHN1Y2Nlc3MtY29sb3I7XG4gIH1cbiAgJi1jYWxtIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAcHJpbWFyeS1jb2xvcjtcbiAgfVxufVxuPC9zdHlsZT5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgdGhlbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IFwibGlnaHRcIiAvLyAgbGlnaHTjgIFwb3NpdGl2ZeOAgWNhbG3jgIFyb3lhbOOAgWRhcmtcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICBsZWZ0VGV4dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJcIlxuICAgIH0sXG4gICAgcmlnaHRUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH0sXG4gICAgYmdDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJcIlxuICAgIH0sXG4gICAgZml4ZWQ6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIGNsaWNrSGFuZGxlckxlZnQoKSB7XG4gICAgdGhpcy4kZW1pdChcInRhcFwiLCB7IHR5cGU6IFwibGVmdFwiIH0pO1xuICB9LFxuXG4gIGNsaWNrSGFuZGxlclJpZ2h0KCkge1xuICAgIHRoaXMuJGVtaXQoXCJ0YXBcIiwgeyB0eXBlOiBcInJpZ2h0XCIgfSk7XG4gIH1cbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHRleHRcbiAgICBjbGFzcz1cImZvbnQtaWNvblwiXG4gICAgc3R5bGU9XCJmb250LXNpemU6IHt7c2l6ZSpyYXRpby83NTB9fXB4O2NvbG9yOiB7e2NvbG9yfX07XCJcbiAgICA+e3sgdW5lc2NhcGVGb250SWNvbkNvZGUoaWNvbk1hcFt0eXBlXSkgfX1cbiAgPC90ZXh0PlxuPC90ZW1wbGF0ZT5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBpY29uZm9udDtcbiAgc3JjOiB1cmwoXCIuL2ljb25mb250cy50dGZcIik7XG59XG5cbi5mb250LWljb24ge1xuICBmb250LWZhbWlseTogaWNvbmZvbnQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbjwvc3R5bGU+XG48c2NyaXB0PlxuaW1wb3J0IHsgaWNvbnMgfSBmcm9tIFwiLi9pY29uc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb25NYXA6IGljb25zXG4gICAgfTtcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0eXBlOiB7XG4gICAgICBkZWZhdWx0OiBcImVtcHR5XCJcbiAgICB9LFxuICAgIHNpemU6IHtcbiAgICAgIGRlZmF1bHQ6IDE0XG4gICAgfSxcbiAgICBjb2xvcjoge1xuICAgICAgZGVmYXVsdDogXCJcIlxuICAgIH0sXG4gICAgcmF0aW86IHtcbiAgICAgIGRlZmF1bHQ6IDc1MFxuICAgIH1cbiAgfSxcbiAgdW5lc2NhcGVGb250SWNvbkNvZGUoaWNvbkNvZGUgPSBcIlwiKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlKGljb25Db2RlLnJlcGxhY2UoLyYjeC9nLCBcIiV1XCIpLnJlcGxhY2UoLzsvZywgXCJcIikpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG4iLCI8aW1wb3J0IG5hbWU9XCJpY29uXCIgc3JjPVwiLi4vLi4vLi4vY29tcG9uZW50cy9pY29uL2luZGV4LnV4XCI+PC9pbXBvcnQ+XG48IS0tIOWBnOeVmTPnp5LmmL7npLrlvLnnqpcgLS0+XG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cImJhY2stdG8tYWRzXCIgaWY9XCJ7e2hhc0FkTGlzdH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWQtbmF0aXZlXCIgc2hvdz1cInshIWFkTGlzdC5hZElkfX1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXNwLXRpdGxlXCI+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cInRpc3AtdGl0bGUtdHh0XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPumAgOWHuuWJjeeci+S4quW5v+WRiu+8nzwvdGV4dD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgaWY9XCJ7e3Nob3dUcmFuc3BhcmVuY3l9fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtaXRlbVwiIGVsc2U+XG4gICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI0MFwiIGNvbG9yPVwiIzAwMDAwMFwiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS0g5aS06YOo5Zu+54mHIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IHRvcC1iaWctaW1nXCI+XG4gICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiYWQtaW1hZ2VcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxpbWFnZSBzcmM9XCJ7eyBhZExpc3QuaW1nVXJsTGlzdD8gYWRMaXN0LmltZ1VybExpc3RbMF06IGRlZmF1bHRBZC5pbWcgfX1cIj48L2ltYWdlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxvYXRcIj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwicHJpdmFjeVwiIGNsYXNzPVwiYWQtaW1hZ2VcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwibG9nb1wiIGNsYXNzPVwiYWQtaW1hZ2VcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPCEtLSDlupXkuIvlhoXlrrkgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgaG9yaXpvbnRhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8IS0tIOagh+mimCAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZC1zLXRpdGxlXCI+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC1zLXRpdGxlLWFkXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYWQtcy10aXRsZS10eHRcIj57eyBhZExpc3QuZGVzYyB8fCBkZWZhdWx0QWQuZGVzYyB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290LWJ0biB2ZXJ0aWNhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xpY2staXRlbVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cIlwiIHN0eWxlPVwiY29sb3I6ICNmZmZmZmZcIj57eyBhZExpc3QuY2xpY2tCdG5UeHQgfHwgZGVmYXVsdEFkLmNsaWNrQnRuVHh0IH19PC90ZXh0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHRleHQgc3R5bGU9XCJtYXJnaW4tdG9wOiAxMHB4OyBmb250LXNpemU6IDIycHhcIiBAY2xpY2s9XCJiYWNrSG9tZVwiPueri+WNs+mAgOWHujwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCBwcm9tcHQgZnJvbSAnQHN5c3RlbS5wcm9tcHQnXG4gIGNvbnN0IHsgYWRDb2RlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnLmpzJykuZGVmYXVsdFxuICBsZXQgbmF0aXZlQWQ7XG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRMaXN0OiB7fSxcbiAgICAgICAgaGFzQWRMaXN0OiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdEFkOiB7XG4gICAgICAgICAgZGVzYzogJ+WNjuS4uuW5v+WRiicsXG4gICAgICAgICAgdGl0bGU6ICfljY7kuLrogZTnm58nLFxuICAgICAgICAgIGljb246ICflub/lkYonLFxuICAgICAgICAgIGNsaWNrQnRuVHh0OiAn54K55Ye75a6J6KOFJyxcbiAgICAgICAgICBpbWc6IFwiaHR0cDovL2Nkbi5iYW5rLXpvbmUuY24vcHJvL3N5L2FkbWluL2FkdmVydGlzaW5nLzM2MzliZGJkZThlODQzOTdhMjk3YWQ1NGY4OWFjNGMzLmpwZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGJ0blR4dDogJycsXG4gICAgICAgIGFkSWQ6IFwiXCIsXG4gICAgICAgIGFkT2JqOiBcIlwiLFxuICAgICAgICBzaG93Q2xpazogZmFsc2UsXG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9wczoge1xuICAgICAgc2hvd1RyYW5zcGFyZW5jeToge1xuICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgb25Jbml0KCkge1xuICAgICAgY29uc3QgYnJhbmNoID0gJGFkLmdldFByb3ZpZGVyKClcbiAgICAgIHRoaXMuYWRPYmogPSBhZENvZGVEYXRhW2JyYW5jaF1cbiAgICAgIHRoaXMuYWRJZCA9ICdzMnl0eHRoMm1xJztcbiAgICAgIHRoaXMucHJlbG9hZEFkKClcbiAgICB9LFxuICAgIGdldEFkUHJvdmlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucHJvdmlkZXIgPSAkYWQuZ2V0UHJvdmlkZXIoKTtcbiAgICB9LFxuICAgIHByZWxvYWRBZCgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFwidGhlIGRldmljZSAgZG9lcyBub3Qgc3VwcG9ydCBhZC5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCfmmK/lkKbov5vmnaXkuoblvIDlkK/lub/lkYonKTtcbiAgICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5hZElkIH0pO1xuICAgICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5pbmZvKFwiYWQgZGF0YSBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgIHRoaXMuYWRMaXN0ID0gZGF0YS5hZExpc3RbMF07XG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hZExpc3QsICfmn6XnnIvojrflj5bnmoTlub/lkYrlj4LmlbAnKTtcbiAgICAgICAgICB0aGlzLmhhc0FkTGlzdCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KClcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XG4gICAgICAgICAgdGhhdC4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICAgICAgZGF0YTogJ3Nob3dWYWNrVGlzcCdcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgbmF0aXZlQWQubG9hZCgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLCBlLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gKiDngrnlh7tcbiAqL1xuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xuICAgICAgJHV0aWxzLmJ1cmllZFBvaW50UmVwb3J0KHRoaXMsICdjbGljaycsIHRoaXMuYWRJZClcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcbiAgICAgICAgYWRJZDogdGhpcy5hZExpc3QuYWRJZFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOWxleekulxuICAgICAqL1xuICAgIHJlcG9ydE5hdGl2ZVNob3coKSB7XG4gICAgICBpZiAobmF0aXZlQWQpIHtcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5hZExpc3QuYWRJZCB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yKGVyckNvZGUsIGVyck1zZykge1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICBkYXRhOiAnc2hvd1ZhY2tUaXNwJ1xuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgIHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6IGBhZCBsb2FkIGVycm9yOiBlcnJDb2RlID0gJHtlcnJDb2RlfSwgZXJyTXNnID0gJHtlcnJNc2d9YFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkQ2xpY2soKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ54K55Ye75Zue6LCD5ZCXJyk7XG4gICAgICAkdXRpbHMuY29udmVyc2lvblVwbG9hZCh0aGlzKVxuICAgICAgdGhpcy4kZW1pdCgnZW1pdEhpZGVUcmFuc3BhcmVuY3knKVxuXG4gICAgICAvL+WQjuWPsOWNleS4quWfi+eCuSAtIOS6i+S7tu+8muW5v+WRiueCueWHu1xuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ5YWz6Zet5Zue6LCD5ZCXJyk7XG4gICAgICB0aGlzLmhhc0FkTGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICBkYXRhOiAnc2hvd1ZhY2tUaXNwJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGJhY2tIb21lKCkge1xuICAgICAgJHJvdXRlci5yZXBsYWNlKHtcbiAgICAgICAgdXJpOiBcInBhZ2VzL2Rpc3BsYXlEZXNrdG9wXCJcbiAgICAgIH0pXG4gICAgfVxuICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIC5iYWNrLXRvLWFkcyB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgd2lkdGg6IDc1MHB4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAuYWQtbmF0aXZlIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA3NTBweDtcbiAgICAgIG1hcmdpbi10b3A6IDgwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgd2lkdGg6IDY5MHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMzVweDtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwcHgpO1xuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDc1MHB4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgIC50aXNwLXRpdGxlIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDE1MHB4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgLnRpc3AtdGl0bGUtdHh0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmNsb3NlLWl0ZW0ge1xuICAgICAgICAgICAgLyogYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgKi9cbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgICAgcmlnaHQ6IDUwcHg7XG4gICAgICAgICAgICAvKiBib3JkZXItcmFkaXVzOiA1MCU7ICovXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLnRvcC1iaWctaW1nIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGhlaWdodDogMzAwcHg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMjVweDtcbiAgICAgICAgICAuYWQtaW1hZ2Uge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMDBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgaW1hZ2Uge1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICAgICAgICBvYmplY3QtZml0OiBmaWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC5mbG9hdCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiDlhoXlrrnljLrln58gKi9cbiAgICAgICAgLmhvcml6b250YWwtY29udGVudCB7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIC5hZC10aXRsZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgICAgLmFkLXRpdGxlLXR4dCB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmFkLXMtdGl0bGUge1xuICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICAgICAgLmFkLXMtdGl0bGUtYWQge1xuICAgICAgICAgICAgICAuYWQtcy10aXRsZS10eHQge1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBsaW5lczogMjtcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuc3Rhci1saXN0IHtcbiAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuZm9vdC1idG4ge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIC5jbGljay1pdGVtIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDkwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDYwcHg7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxMDM5O1xuICAgICAgICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGVEcmF3O1xuICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDA7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTIwMG1zO1xuICAgICAgICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQGtleWZyYW1lcyBzY2FsZURyYXcge1xuICAgICAgICAgICAgICAwJSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAyNSUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgNzUlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnZlcnRpY2FsLWNvbnRlbnQge1xuICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICAuYWQtY2xvc2Uge1xuICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiIsIjxpbXBvcnQgbmFtZT1cImljb25cIiBzcmM9XCIuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXhcIj48L2ltcG9ydD5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYm90dG9tLW5hdGl2ZVwiIGlmPVwie3toYXNBZExpc3R9fVwiPlxuICAgICAgPGRpdiBhZElkPVwie3thZExpc3QuYWRJZH19XCIgY2xhc3M9XCJhZC1uYXRpdmVcIiBzaG93PVwie3shIWFkTGlzdC5hZElkfX1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWltZ1wiPlxuICAgICAgICAgICAgPCEtLSDlm77niYcgLS0+XG4gICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiYWQtaW1nXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aW1hZ2Ugc3JjPVwie3thZExpc3QuaW1nVXJsTGlzdD8gYWRMaXN0LmltZ1VybExpc3RbMF06IGRlZmF1bHRBZC5pbWcgfX1cIj48L2ltYWdlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCIgdHlwZT1cImNsaWNrXCIgaWY9XCJ7e3Nob3dUcmFuc3BhcmVuY3l9fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjRkZGRkZGXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiIGVsc2U+XG4gICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI0MFwiIGNvbG9yPVwiI0ZGRkZGRlwiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPCEtLSDkv6Hmga8gLS0+XG4gICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIiBjbGFzcz1cImNlbnRlci1pbmZvXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInR4dCB0aXRsZVwiPnt7IGFkTGlzdCA/IGFkTGlzdC50aXRsZSA6IGRlZmF1bHRBZC50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwibG9nb1wiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+e3sgYWRMaXN0ID8gYWRMaXN0LmRlc2MgOiBkZWZhdWx0QWQuZGVzYyB9fTwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWNrLWl0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xpY2stdHh0XCI+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZlwiPnt7IGFkTGlzdC5jbGlja0J0blR4dCB8fCBkZWZhdWx0QWQuY2xpY2tCdG5UeHQgfX08L3RleHQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxvYXRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cInByaXZhY3lcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmbG9hdC10eHRcIiBpZj1cInt7YWRMaXN0Lmhhc0FwcE1paXRJbmZvfX1cIj57eyBhZExpc3QuYXBwSW5mby5hcHBOYW1lICsgYWRMaXN0LmFwcEluZm8uYXBwU2l6ZSArIGFkTGlzdC5hcHBJbmZvLmFwcFZlcnNpb24gKyBhZExpc3QuYXBwSW5mby5kZXZlbG9wZXIgfX08L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwidG9wLWNsb3NlXCIgaWY9XCJ7e3Nob3dUcmFuc3BhcmVuY3l9fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI1MFwiIGNvbG9yPVwiIzAwMDAwMFwiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3AtY2xvc2VcIiBlbHNlPlxuICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjUwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGNvbnN0IHsgYWRDb2RlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnLmpzJykuZGVmYXVsdDtcbiAgbGV0IG5hdGl2ZUFkO1xuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YToge1xuICAgICAgaGFzQWRMaXN0OiB0cnVlLFxuICAgICAgZGVmYXVsdEFkOiB7XG4gICAgICAgIGRlc2M6ICfljY7kuLrlub/lkYonLFxuICAgICAgICB0aXRsZTogJ+WNjuS4uuiBlOebnycsXG4gICAgICAgIGljb246ICflub/lkYonLFxuICAgICAgICBjbGlja0J0blR4dDogJ+eCueWHu+WuieijhScsXG4gICAgICAgIGltZzogXCJodHRwOi8vY2RuLmJhbmstem9uZS5jbi9wcm8vc3kvYWRtaW4vYWR2ZXJ0aXNpbmcvMzYzOWJkYmRlOGU4NDM5N2EyOTdhZDU0Zjg5YWM0YzMuanBnXCJcbiAgICAgIH0sXG4gICAgICBidG5UeHQ6ICcnLFxuICAgICAgYWRVbml0SWQ6IFwiXCIsXG4gICAgICBhZExpc3Q6IFwiXCJcbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICBzaG93VHJhbnNwYXJlbmN5OiB7XG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICBjb25zdCBicmFuY2ggPSAkYWQuZ2V0UHJvdmlkZXIoKVxuICAgICAgdGhpcy5hZE9iaiA9IGFkQ29kZURhdGFbYnJhbmNoXVxuICAgICAgdGhpcy5hZElkID0gJ3Y1aDV4c2tscDInO1xuICAgICAgdGhpcy5wcmVsb2FkQWQoKVxuICAgIH0sXG4gICAgb25SZWFkeSgpIHtcblxuICAgIH0sXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xuICAgIH0sXG4gICAgYXN5bmMgcHJlbG9hZEFkKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XG4gICAgICBpZiAodGhpcy5wcm92aWRlciAhPT0gXCJodWF3ZWlcIikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ+aYr+WQpui/m+adpeS6huW8gOWQr+W5v+WRimJhbm5lcicpO1xuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5hZElkIH0pO1xuICAgICAgbmF0aXZlQWQub25Mb2FkKGRhdGEgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHRoaXMuYWRMaXN0ID0gZGF0YS5hZExpc3RbMF07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWRMaXN0LCAn5p+l55yL6I635Y+W55qE5bm/5ZGK5Y+C5pWwYmFubmVyJyk7XG4gICAgICAgIHRoaXMuaGFzQWRMaXN0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KClcbiAgICAgIH0pO1xuICAgICAgbmF0aXZlQWQub25FcnJvcihlID0+IHtcblxuICAgICAgfSk7XG4gICAgICBuYXRpdmVBZC5sb2FkKCk7XG4gICAgfSxcbiAgICAvKipcbiog54K55Ye7XG4qL1xuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xuICAgICAgJHV0aWxzLmJ1cmllZFBvaW50UmVwb3J0KHRoaXMsICdjbGljaycsIHRoaXMuYWRJZClcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcbiAgICAgICAgYWRJZDogdGhpcy5hZExpc3QuYWRJZFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOWxleekulxuICAgICAqL1xuICAgIHJlcG9ydE5hdGl2ZVNob3coKSB7XG4gICAgICBpZiAobmF0aXZlQWQpIHtcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5hZExpc3QuYWRJZCB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yKGVyckNvZGUsIGVyck1zZykge1xuICAgICAgY29uc29sZS5sb2coJ+ayoeacieaKpemUmeWbnuiwg+WQlycpO1xuICAgICAgdGhpcy4kZW1pdCgnZXJyb3InLCB7IGVyckNvZGUsIGVyck1zZyB9KTtcbiAgICB9LFxuICAgIGFkQ2xpY2soKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ54K55Ye75Zue6LCD5ZCXJyk7XG4gICAgICBjb25zb2xlLmxvZygn5oCO5LmI6Kem5Y+R55qE5piv6L+Z6YeM55qEJyk7XG4gICAgICAkdXRpbHMuY29udmVyc2lvblVwbG9hZCh0aGlzKVxuICAgICAgdGhpcy4kZW1pdCgnZW1pdEhpZGVUcmFuc3BhcmVuY3knKVxuXG4gICAgICAvL+WQjuWPsOWNleS4quWfi+eCuSAtIOS6i+S7tu+8muW5v+WRiueCueWHu1xuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLmhhc0FkTGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICBkYXRhOiAnYmFubmVyJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbnZlcnRBcHBTaXplKGFwcFNpemVCeXRlcykge1xuICAgICAgLy8g6aaW5YWI5bCG5a2X6IqC6L2s5o2i5Li6S0IgIFxuICAgICAgbGV0IGtiID0gYXBwU2l6ZUJ5dGVzIC8gMTAyNDtcblxuICAgICAgLy8g5qOA5p+l5piv5ZCm6LaF6L+HMU1C77yI5Y2zMTAyNEtC77yJICBcbiAgICAgIGlmIChrYiA+PSAxMDI0KSB7XG4gICAgICAgIC8vIOi9rOaNouS4uk1C5bm25L+d55WZ5Lik5L2N5bCP5pWwICBcbiAgICAgICAgbGV0IG1iID0ga2IgLyAxMDI0O1xuICAgICAgICByZXR1cm4gbWIudG9GaXhlZCgyKSArICdNQic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDkv53nlZnkuKTkvY3lsI/mlbDlubbov5Tlm55LQiAgXG4gICAgICAgIHJldHVybiBrYi50b0ZpeGVkKDIpICsgJ0tCJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cbiAgLmJvdHRvbS1uYXRpdmUge1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgaGVpZ2h0OiAxMjBweDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmc6IDE1cHggMTBweDtcblxuICAgIC5hZC1uYXRpdmUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuXG4gICAgLmNvbnRhaW5lciB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLmxlZnQtaW1nIHtcbiAgICAgIHdpZHRoOiAyMDBweDtcbiAgICAgIGhlaWdodDogOTBweDtcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgIC5hZC1pbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgIGltYWdlIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgb2JqZWN0LWZpdDogZmlsbDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5pY29uIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmZsb2F0IHtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgd2lkdGg6IDgwJTtcbiAgICAgIC5mbG9hdC10eHQge1xuICAgICAgICBmb250LXNpemU6IDIxcHg7XG4gICAgICAgIGNvbG9yOiAjYjNiM2I1O1xuICAgICAgICBsaW5lczogMTtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICB9XG4gICAgfVxuICAgIC5jZW50ZXItaW5mbyB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHRvcDogLTEwcHg7XG4gICAgICAuaW5mby1pdGVtIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIC50eHQge1xuICAgICAgICAgIGxpbmVzOiAxO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG4gICAgICAgIC50YWcge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNik7XG4gICAgICAgICAgY29sb3I6ICM5OTk5OTk7XG4gICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICAgIGhlaWdodDogNTZweDtcbiAgICAgICAgICB3aWR0aDogMTIwcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC5jbGljay1pdGVtIHtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgLnRpdGxlIHtcbiAgICAgICAgY29sb3I6ICM5OTk5OTk7XG4gICAgICB9XG4gICAgICAuY2xpY2stdHh0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgICAgICAgZm9udC1zaXplOiAzNHB4O1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMGYzOTtcbiAgICAgIH1cbiAgICAgIC5hZC1jbG9zZSB7XG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogLmZsb2F0LWluZm8ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDEwMHB4O1xuICAgIGhlaWdodDogMzBweDtcbiAgfSAqL1xuICAgIC8qIC5jbG9zZS1pdGVtIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGhlaWdodDogMzBweDtcbiAgfSAqL1xuXG4gICAgLnRvcC1jbG9zZSB7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiA1MHB4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMDUsIDIwNSwgMjA3LCAwLjUpO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiIsIjxpbXBvcnQgbmFtZT1cImljb25cIiBzcmM9XCIuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXhcIj48L2ltcG9ydD5cbjwhLS0g5YGc55WZM+enkuaYvuekuuW8ueeqlyAtLT5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVtaW5kZXItYWRzXCIgaWY9XCJ7e2hhc0FkTGlzdH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWQtbmF0aXZlXCIgc2hvdz1cInshIWFkTGlzdC5hZElkfX1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDwhLS0g5aS06YOo5Zu+54mHIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IHRvcC1iaWctaW1nXCI+XG4gICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiYWQtaW1hZ2VcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxpbWFnZSBzcmM9XCJ7e2FkTGlzdC5pbWdVcmxMaXN0PyBhZExpc3QuaW1nVXJsTGlzdFswXTogZGVmYXVsdEFkLmltZyB9fVwiPjwvaW1hZ2U+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgdHlwZT1cImNsaWNrXCIgaWY9XCJ7e3Nob3dUcmFuc3BhcmVuY3l9fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtaXRlbVwiIGVsc2U+XG4gICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI0MFwiIGNvbG9yPVwiIzAwMDAwMFwiIG9uY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS0g5bqV5LiL5YaF5a65IC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IGhvcml6b250YWwtY29udGVudFwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZC10aXRsZVwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCI+XG4gICAgICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cImFkLXRpdGxlLXR4dFwiPnt7IGFkTGlzdC50aXRsZSB8fCBkZWZhdWx0QWQudGl0bGUgfX08L3RleHQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJsb2dvXCIgY2xhc3M9XCJcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIOagh+mimCAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZC1zLXRpdGxlXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiYWQtcy10aXRsZS1hZFwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYWQtcy10aXRsZS10eHRcIj57eyBhZExpc3QuZGVzYyB8fCBkZWZhdWx0QWQuZGVzYyB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSDmmJ/mmJ8gLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtY29udGVudCBzdGFyLWxpc3RcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJzdGFyXCIgc2l6ZT1cIjU4XCIgY29sb3I9XCIjRkZDRTJEXCIgZm9yPVwie3s1fX1cIj48L2ljb24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3QtYnRuIHZlcnRpY2FsLWNvbnRlbnRcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xpY2staXRlbVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZlwiPnt7IGFkTGlzdC5jbGlja0J0blR4dCB8fCBkZWZhdWx0QWQuY2xpY2tCdG5UeHQgfX08L3RleHQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHByb21wdCBmcm9tICdAc3lzdGVtLnByb21wdCdcbiAgY29uc3QgeyBhZENvZGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcuanMnKS5kZWZhdWx0XG4gIGxldCBuYXRpdmVBZDtcbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGEoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZExpc3Q6IHt9LFxuICAgICAgICBoYXNBZExpc3Q6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0QWQ6IHtcbiAgICAgICAgICBkZXNjOiAn5Y2O5Li65bm/5ZGKJyxcbiAgICAgICAgICB0aXRsZTogJ+WNjuS4uuiBlOebnycsXG4gICAgICAgICAgaWNvbjogJ+W5v+WRiicsXG4gICAgICAgICAgY2xpY2tCdG5UeHQ6ICfngrnlh7vlronoo4UnLFxuICAgICAgICAgIGltZzogXCJodHRwOi8vY2RuLmJhbmstem9uZS5jbi9wcm8vc3kvYWRtaW4vYWR2ZXJ0aXNpbmcvMzYzOWJkYmRlOGU4NDM5N2EyOTdhZDU0Zjg5YWM0YzMuanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAgYnRuVHh0OiAnJyxcbiAgICAgICAgYWRJZDogXCJcIixcbiAgICAgICAgYWRPYmo6IFwiXCIsXG4gICAgICAgIHNob3dDbGlrOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICBzaG93VHJhbnNwYXJlbmN5OiB7XG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICBjb25zdCBicmFuY2ggPSAkYWQuZ2V0UHJvdmlkZXIoKVxuICAgICAgdGhpcy5hZE9iaiA9IGFkQ29kZURhdGFbYnJhbmNoXVxuICAgICAgdGhpcy5hZElkID0gJ3MyeXR4dGgybXEnO1xuICAgICAgdGhpcy5wcmVsb2FkQWQoKVxuICAgIH0sXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xuICAgIH0sXG4gICAgYXN5bmMgcHJlbG9hZEFkKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XG4gICAgICBpZiAodGhpcy5wcm92aWRlciAhPT0gXCJodWF3ZWlcIikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ+aYr+WQpui/m+adpeS6huW8gOWQr+W5v+WRiicpO1xuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5hZElkIH0pO1xuICAgICAgbmF0aXZlQWQub25Mb2FkKGRhdGEgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHRoaXMuYWRMaXN0ID0gZGF0YS5hZExpc3RbMF07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWRMaXN0LCAn5p+l55yL6I635Y+W55qE5bm/5ZGK5Y+C5pWwJyk7XG4gICAgICAgIHRoaXMuaGFzQWRMaXN0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KClcbiAgICAgIH0pO1xuICAgICAgbmF0aXZlQWQub25FcnJvcihlID0+IHtcblxuICAgICAgfSk7XG4gICAgICBuYXRpdmVBZC5sb2FkKCk7XG4gICAgfSxcbiAgICAvKipcbiog54K55Ye7XG4qL1xuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xuICAgICAgJHV0aWxzLmJ1cmllZFBvaW50UmVwb3J0KHRoaXMsICdjbGljaycsIHRoaXMuYWRJZClcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcbiAgICAgICAgYWRJZDogdGhpcy5hZExpc3QuYWRJZFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOWxleekulxuICAgICAqL1xuICAgIHJlcG9ydE5hdGl2ZVNob3coKSB7XG4gICAgICBpZiAobmF0aXZlQWQpIHtcbiAgICAgICAgbmF0aXZlQWQucmVwb3J0QWRTaG93KHsgYWRJZDogdGhpcy5hZExpc3QuYWRJZCB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yKGVyckNvZGUsIGVyck1zZykge1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICBkYXRhOiAnc2hvd1JlbWluZGVyJ1xuICAgICAgfSlcbiAgICAgIGNvbnNvbGUubG9nKCfmsqHmnInmiqXplJnlm57osIPlkJcnKTtcbiAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgIHByb21wdC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1lc3NhZ2U6IGBhZCBsb2FkIGVycm9yOiBlcnJDb2RlID0gJHtlcnJDb2RlfSwgZXJyTXNnID0gJHtlcnJNc2d9YFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkQ2xpY2soKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ54K55Ye75Zue6LCD5ZCXJyk7XG4gICAgICAkdXRpbHMuY29udmVyc2lvblVwbG9hZCh0aGlzKTtcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRIaWRlVHJhbnNwYXJlbmN5JylcblxuXG4gICAgICAvL+WQjuWPsOWNleS4quWfi+eCuSAtIOS6i+S7tu+8muW5v+WRiueCueWHu1xuICAgICBcbiAgICB9LFxuICAgIGNsb3NlKCkge1xuICAgICAgY29uc29sZS5sb2coJ+ayoeacieWFs+mXreWbnuiwg+WQlycpO1xuICAgICAgdGhpcy5oYXNBZExpc3QgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9zZScsIHtcbiAgICAgICAgZGF0YTogJ3Nob3dSZW1pbmRlcidcbiAgICAgIH0pXG4gICAgfVxuICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIC5yZW1pbmRlci1hZHMge1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHdpZHRoOiA3NTBweDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgLmFkLW5hdGl2ZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogODAwcHg7XG4gICAgICBtYXJnaW4tdG9wOiA4MHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgIHdpZHRoOiA2OTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDM1cHg7XG5cbiAgICAgIC5jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiA3NTBweDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgLnRvcC1iaWctaW1nIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGhlaWdodDogNDAwcHg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgICAgICAgIC5hZC1pbWFnZSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDQwMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBpbWFnZSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgICAgICAgIG9iamVjdC1maXQ6IGZpbGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmNsb3NlLWl0ZW0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDYwcHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB0b3A6IDMwcHg7XG4gICAgICAgICAgICByaWdodDogNDBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiDlhoXlrrnljLrln58gKi9cbiAgICAgICAgLmhvcml6b250YWwtY29udGVudCB7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIC5hZC10aXRsZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgICAgLmFkLXRpdGxlLXR4dCB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmFkLXMtdGl0bGUge1xuICAgICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgICAuYWQtcy10aXRsZS1hZCB7XG4gICAgICAgICAgICAgIC5hZC1zLXRpdGxlLXR4dCB7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgIGxpbmVzOiAxO1xuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLnN0YXItbGlzdCB7XG4gICAgICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmZvb3QtYnRuIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgICAgIC5jbGljay1pdGVtIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDEyMHB4O1xuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA2MHB4O1xuICAgICAgICAgICAgICBmb250LXNpemU6IDM0cHg7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTAzOTtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxlRHJhdztcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwO1xuICAgICAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDEyMDBtcztcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBrZXlmcmFtZXMgc2NhbGVEcmF3IHtcbiAgICAgICAgICAgICAgMCUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgMjUlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgNTAlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDc1JSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC52ZXJ0aWNhbC1jb250ZW50IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgLmFkLWNsb3NlIHtcbiAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbjwvc3R5bGU+XG4iLCI8aW1wb3J0IG5hbWU9XCJpY29uXCIgc3JjPVwiLi4vLi4vY29tcG9uZW50cy9pY29uL2luZGV4LnV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJib3R0b20tbmF0aXZlXCIgc3JjPVwiLi9jb21wb25lbnRzL2JvdHRvbS1uYXRpdmUudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInJlbWluZGVyLWFkc1wiIHNyYz1cIi4vY29tcG9uZW50cy9yZW1pbmRlci1hZHMudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cImJhY2stdG8tYWRzXCIgc3JjPVwiLi9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJteS1uYXZiYXJcIiBzcmM9XCJhcGV4LXVpL2NvbXBvbmVudHMvbmF2YmFyL2luZGV4XCI+PC9pbXBvcnQ+XG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhZHZlcnRpc2luZy1wYWdlXCI+XG4gICAgPG15LW5hdmJhcj48L215LW5hdmJhcj5cbiAgICA8IS0tIOWktOmDqOaEn+iwoiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWR2ZXJ0aXNpbmctdGl0bGVcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibS1oZWFkaW5nXCI+5q2j5ZOB5YaF5a655YWN6LS56K+7PC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJzLWhlYWRpbmdcIj7lub/lkYrmlLbnm4rmmK/kuLrkuobmv4DlirHkvZzogIXmj5DkvpvkvJjotKjlhoXlrrk8L3RleHQ+XG4gICAgICA8ZGl2IGNsYXNzPVwidGhhbmsteW91LXNwZWVjaFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cImxpbmVcIj48L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+5oSf6LCi5L2g55qE5pSv5oyBPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImxpbmVcIj48L3RleHQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIOW5v+WRiue7hOS7tiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWQtY29tcG9uXCIgaWY9XCJ7e2hhc0FkTGlzdH19XCI+XG4gICAgICA8ZGl2IGFkSWQ9XCJ7e2FkTGlzdC5hZElkfX1cIiBjbGFzcz1cImFkLW5hdGl2ZVwiIHNob3c9XCJ7eyEhYWRMaXN0LmFkSWR9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFncmVlbWVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFncmVlbWVudC1pdGVtIGFncmVlbWVudC1pdGVtLWluZm9cIiB0eXBlPVwiY2xpY2tcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidHh0XCI+e3sgYWRMaXN0LnRpdGxlICsgYWRMaXN0LmFwcENvbXBhbnl9fTwvdGV4dD5cbiAgICAgICAgICAgICAgPCEtLSA8dGV4dCBjbGFzcz1cInR4dFwiID57eyBhZExpc3QuYXBwSW5mby5kZXZlbG9wZXIgfX08L3RleHQ+IC0tPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdyZWVtZW50LWl0ZW1cIiB0eXBlPVwicHJpdmFjeVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIiBjbGFzcz1cImhpZGUtY2xvc2VcIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNTBcIiBjb2xvcj1cIiNGRkZGRkZcIiBAY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZGUtY2xvc2VcIiBlbHNlPlxuICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNTBcIiBjb2xvcj1cIiNGRkZGRkZcIiBAY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC10aXRsZVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYWQtdGl0bGUtdHh0XCI+e3sgYWRMaXN0LmRlc2MgfHwgZGVmYXVsdEFkLmRlc2MgfX08L3RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSDlm77niYcgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgYmlnLWltZ1wiPlxuICAgICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIiBjbGFzcz1cImFkLWltYWdlXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aW1hZ2Ugc3JjPVwie3thZExpc3QuaW1nVXJsTGlzdD8gYWRMaXN0LmltZ1VybExpc3RbMF06IGRlZmF1bHRBZC5pbWcgfX1cIj48L2ltYWdlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtY29udGVudCBsb2dvXCI+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJjbG9zZS1pdGVtXCIgaWY9XCJ7e3Nob3dUcmFuc3BhcmVuY3l9fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDVcIiBjb2xvcj1cIiNGRkZGRkZcIiBAY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgZWxzZT5cbiAgICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDVcIiBjb2xvcj1cIiNGRkZGRkZcIiBAY2xpY2s9XCJjbG9zZVwiPjwvaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImxvZ29cIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIiBpZj1cInt7YWRMaXN0Lmljb259fVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWtjXCIgY2xhc3M9XCJpY29uLWltYWdlXCI+XG4gICAgICAgICAgICAgIDxpbWFnZSBzcmM9XCJ7e2FkTGlzdC5pY29ufX1cIj48L2ltYWdlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImljb24tdHh0XCI+e3sgYWRMaXN0LnRpdGxlIH19PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWNrLWl0ZW1cIiB0eXBlPVwiYnV0dG9uXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cIlwiIHN0eWxlPVwiY29sb3I6ICNmZmZmZmZcIj57eyBhZExpc3QuY2xpY2tCdG5UeHQgfHwgZGVmYXVsdEFkLmNsaWNrQnRuVHh0fX08L3RleHQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZS1sZWZ0LWJ0blwiIHR5cGU9XCJjbGlja1wiIGlmPVwie3tzaG93VHJhbnNwYXJlbmN5fX1cIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygnYnRuJylcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OiAyMHB4XCI+XG4gICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJhcnJvdy1iYWNrXCIgc2l6ZT1cIjQ1XCIgY29sb3I9XCIjRkZGRkZGXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aWNvbiB0eXBlPVwiYXJyb3ctYmFja1wiIHNpemU9XCI0NVwiIGNvbG9yPVwiI0ZGRkZGRlwiPjwvaWNvbj5cbiAgICAgICAgICAgIDx0ZXh0PuW3pua7kee7p+e7remYheivuzwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZS1sZWZ0LWJ0blwiIEBjbGljaz1cImFwcGVhclN3aXBlXCIgQHN3aXBlPVwiYXBwZWFyU3dpcGVcIiBpZj1cInt7IXNob3dUcmFuc3BhcmVuY3l9fVwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6IDIwcHhcIj5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImFycm93LWJhY2tcIiBzaXplPVwiNDVcIiBjb2xvcj1cIiNGRkZGRkZcIj48L2ljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpY29uIHR5cGU9XCJhcnJvdy1iYWNrXCIgc2l6ZT1cIjQ1XCIgY29sb3I9XCIjRkZGRkZGXCI+PC9pY29uPlxuICAgICAgICAgICAgPHRleHQ+5bem5ruR57un57ut6ZiF6K+7PC90ZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0g5bqV6YOo5Lu/YmFubmXmoYYgLS0+XG4gICAgPGJvdHRvbS1uYXRpdmUgYWQtdW5pdElkPVwie3thZElkfX1cIiBhZC1saXN0PVwie3thZExpc3R9fVwiIGlmPVwie3tzaG93QmFubmVyfX1cIiBzaG93LXRyYW5zcGFyZW5jeT1cInt7IHNob3dUcmFuc3BhcmVuY3l9fVwiIG9uZW1pdC1oaWRlLXRyYW5zcGFyZW5jeT1cImhpZGVUcmFuc3BhcmVuY3lcIj48L2JvdHRvbS1uYXRpdmU+XG5cbiAgICA8IS0t5bu26L+f5o+Q56S6IC0tPlxuICAgIDxyZW1pbmRlci1hZHMgaWY9XCJ7e3Nob3dSZW1pbmRlcn19XCIgc2hvdy10cmFuc3BhcmVuY3k9XCJ7eyBzaG93VHJhbnNwYXJlbmN5fX1cIiBvbmVtaXQtaGlkZS10cmFuc3BhcmVuY3k9XCJoaWRlVHJhbnNwYXJlbmN5XCIgb25lbWl0LWNsb3NlPVwiaGVpZGVSZW1pbmRlclwiPjwvcmVtaW5kZXItYWRzPlxuXG4gICAgPCEtLSDov5Tlm57ml7blvLnlh7rmoYYgLS0+XG4gICAgPGJhY2stdG8tYWRzIGlmPVwie3tzaG93VmFja1Rpc3B9fVwiIHNob3ctdHJhbnNwYXJlbmN5PVwie3sgc2hvd1RyYW5zcGFyZW5jeX19XCIgb25lbWl0LWhpZGUtdHJhbnNwYXJlbmN5PVwiaGlkZVRyYW5zcGFyZW5jeVwiIG9uZW1pdC1jbG9zZT1cImhlaWRlUmVtaW5kZXJcIj48L2JhY2stdG8tYWRzPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gIGNvbnN0IHsgYWRDb2RlRGF0YSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnLmpzJykuZGVmYXVsdFxuICBsZXQgbmF0aXZlQWQ7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIHByaXZhdGU6IHtcbiAgICAgIGFkTGlzdDoge30sXG4gICAgICBoYXNBZExpc3Q6IHRydWUsXG4gICAgICBkZWZhdWx0QWQ6IHtcbiAgICAgICAgZGVzYzogJ+WNjuS4uuW5v+WRiicsXG4gICAgICAgIHRpdGxlOiAn5Y2O5Li66IGU55ufJyxcbiAgICAgICAgaWNvbjogJ+W5v+WRiicsXG4gICAgICAgIGNsaWNrQnRuVHh0OiAn54K55Ye75a6J6KOFJyxcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9jZG4uYmFuay16b25lLmNuL3Byby9zeS9hZG1pbi9hZHZlcnRpc2luZy8zNjM5YmRiZGU4ZTg0Mzk3YTI5N2FkNTRmODlhYzRjMy5qcGdcIlxuICAgICAgfSxcbiAgICAgIGJ0blR4dDogJycsXG4gICAgICBhZFVuaXRJZDogJycsXG4gICAgICBhZE9iajoge30sXG4gICAgICBhZElkOiAnJyxcbiAgICAgIHNob3dCYW5uZXI6IHRydWUsXG4gICAgICBzaG93UmVtaW5kZXI6IGZhbHNlLFxuICAgICAgc2hvd1ZhY2tUaXNwOiBmYWxzZSxcbiAgICAgIHNob3dUcmFuc3BhcmVuY3k6IGZhbHNlLFxuICAgICAgYWRUaXRsZTogXCJcIixcbiAgICAgIHRpbWVyOiBudWxsLFxuICAgICAgaXNmcmlzdFJlcUNvdW46IHRydWUsXG4gICAgICBhZDogbnVsbFxuICAgIH0sXG5cbiAgICBvbkluaXQoZSkge1xuICAgICAgY29uc29sZS5sb2coJ+i/m+adpeS6hjEnLCBlKVxuICAgICAgLy8gLy/lpITnkIbljY7kuLrlubPlj7DnmoTot7Povazpk77mjqXmnIDkuIDkuKrlrZfnrKbkuLov55qE6Zeu6aKYXG4gICAgICBpZiAoZS5jaGFubmVsVmFsdWUpIHtcbiAgICAgICAgbGV0IGNoYW5uZWxWYWx1ZSA9IGUuY2hhbm5lbFZhbHVlO1xuICAgICAgICBpZiAoY2hhbm5lbFZhbHVlLmNoYXJBdChjaGFubmVsVmFsdWUubGVuZ3RoIC0gMSkgPT09ICcvJykge1xuICAgICAgICAgIC8vIOWOu+aOieacgOWQjuS4gOS4quWtl+esplxuICAgICAgICAgIGUuY2hhbm5lbFZhbHVlID0gY2hhbm5lbFZhbHVlLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGNhbGxiYWNrID0gJycsIG9haWQgPSAnJywgdHlwZSA9ICcnLCBjaGFubmVsVmFsdWUgPSAnJywgY29ycF9pZCA9ICcnIH0gPSBlXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZSkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygn6L+b5p2l5LqGJywgZSk7XG4gICAgICAgIHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAuYWN0aVBhcmFtID0ge1xuICAgICAgICAgIC4uLmUsXG4gICAgICAgIH1cbiAgICAgICAgJHV0aWxzLmdldENvbnZlcnNpb25saWNrcyh0aGlzKVxuICAgICAgfVxuICAgICAgY29uc3QgYnJhbmNoID0gJGFkLmdldFByb3ZpZGVyKClcbiAgICAgIHRoaXMuYWRPYmogPSBhZENvZGVEYXRhW2JyYW5jaF1cbiAgICAgIHRoaXMuYWRJZCA9ICd2NWg1eHNrbHAyJztcblxuXG4gICAgfSxcbiAgICBvblJlYWR5KCkge1xuICAgICAgdGhpcy5kZWxheWVkRGlzcGxheSgpXG4gICAgICB0aGlzLnByZWxvYWRBZCgpXG4gICAgICB0aGlzLmdldFRyYW5zcGFyZW50TGF5ZXJMKClcbiAgICB9LFxuICAgIG9uSGlkZSgpIHtcbiAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgIH0sXG4gICAgb25CYWNrUHJlc3MoKSB7XG4gICAgICB0aGlzLnNob3dWYWNrVGlzcCA9IHRydWU7XG4gICAgICBjb25zb2xlLmxvZygn6Kem5Y+R5LqG5oCO5LmI5peg5pWI5LqGJyk7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog5bGV56S6XG4gICAgICovXG4gICAgZGVsYXllZERpc3BsYXkoKSB7XG4gICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93UmVtaW5kZXIgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygn5oCO5LmI6L+Y5rKh5pyJ6Kem5Y+RJywgdGhpcyk7XG4gICAgICB9LCA0MDAwKVxuICAgIH0sXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xuICAgIH0sXG4gICAgYXN5bmMgcHJlbG9hZEFkKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5nZXRBZFByb3ZpZGVyKCk7XG4gICAgICBpZiAodGhpcy5wcm92aWRlciAhPT0gXCJodWF3ZWlcIikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ+aYr+WQpui/m+adpeS6huW8gOWQr+W5v+WRiicpO1xuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5hZElkIH0pO1xuICAgICAgbmF0aXZlQWQub25Mb2FkKGRhdGEgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcImFkIGRhdGEgbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5hZExpc3QgPSBkYXRhLmFkTGlzdFswXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hZExpc3QsICfmn6XnnIvojrflj5bnmoTlub/lkYrlj4LmlbAnKTtcbiAgICAgICAgdGhpcy5oYXNBZExpc3QgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKVxuICAgICAgfSk7XG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xuICAgICAgICB0aGlzLmhhc0FkTGlzdCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcbiAgICB9LFxuICAgIGVycm9yKGVyckNvZGUsIGVyck1zZykge1xuICAgICAgY29uc29sZS5sb2coJ+ayoeacieaKpemUmeWbnuiwg+WQlycpO1xuICAgICAgdGhpcy5oYXNBZExpc3QgPSB0cnVlO1xuICAgICAgdGhpcy5hcHBlYXJTd2lwZSgpXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDngrnlh7tcbiAgICAgKi9cbiAgICByZXBvcnROYXRpdmVDbGljayh0eXBlKSB7XG4gICAgICAkdXRpbHMuYnVyaWVkUG9pbnRSZXBvcnQodGhpcywgJ2NsaWNrJywgdGhpcy5hZElkKVxuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xuICAgICAgICBhZElkOiB0aGlzLmFkTGlzdC5hZElkXG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlID09PSAnYnRuJykge1xuICAgICAgICB0aGlzLmFkZENsaWNrTnVtKClcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlsZXnpLpcbiAgICAgKi9cbiAgICByZXBvcnROYXRpdmVTaG93KCkge1xuICAgICAgaWYgKG5hdGl2ZUFkKSB7XG4gICAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkU2hvdyh7IGFkSWQ6IHRoaXMuYWRMaXN0LmFkSWQgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZENsaWNrKCkge1xuICAgICAgY29uc29sZS5sb2coJ+afpeeci+eCueWHu+eahHRoaXMnKTtcbiAgICAgIHRoaXMuc2hvd1RyYW5zcGFyZW5jeSA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2coJ+ayoeacieeCueWHu+Wbnuiwg+WQlycpO1xuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcblxuICAgICAgLy/lkI7lj7DljZXkuKrln4vngrkgLSDkuovku7bvvJrlub/lkYrngrnlh7tcbiAgICB9LFxuICAgIGNsb3NlKCkge1xuICAgICAgY29uc29sZS5sb2coJ+ayoeacieinpuWPkei/meS4quWQlycpO1xuICAgICAgdGhpcy5oYXNBZExpc3QgPSBmYWxzZTtcbiAgICAgIHRoaXMuYXBwZWFyU3dpcGUoKVxuICAgIH0sXG4gICAgY29udmVydEFwcFNpemUoYXBwU2l6ZUJ5dGVzKSB7XG4gICAgICAvLyDpppblhYjlsIblrZfoioLovazmjaLkuLpLQiAgXG4gICAgICBsZXQga2IgPSBhcHBTaXplQnl0ZXMgLyAxMDI0O1xuXG4gICAgICAvLyDmo4Dmn6XmmK/lkKbotoXov4cxTULvvIjljbMxMDI0S0LvvIkgIFxuICAgICAgaWYgKGtiID49IDEwMjQpIHtcbiAgICAgICAgLy8g6L2s5o2i5Li6TULlubbkv53nlZnkuKTkvY3lsI/mlbAgIFxuICAgICAgICBsZXQgbWIgPSBrYiAvIDEwMjQ7XG4gICAgICAgIHJldHVybiBtYi50b0ZpeGVkKDIpICsgJ01CJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOS/neeVmeS4pOS9jeWwj+aVsOW5tui/lOWbnktCICBcbiAgICAgICAgcmV0dXJuIGtiLnRvRml4ZWQoMikgKyAnS0InO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXBwZWFyU3dpcGUoZSkge1xuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+eahOaYr+i3s+i9rOeahOWPguaVsOWZoicpO1xuICAgICAgJHJvdXRlci5yZXBsYWNlKHtcbiAgICAgICAgdXJpOiBcInBhZ2VzL3JlYWRBZFwiXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0VHJhbnNwYXJlbnRMYXllckw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJyYW5jaCA9ICRhZC5nZXRQcm92aWRlcigpO1xuICAgICAgICBsZXQgcGF5YW0gPSB7XG4gICAgICAgICAgYnJhbmQ6IGJyYW5jaC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzZnJpc3RSZXFDb3VuKSB7IC8v5aaC5p6c5LiN5piv5Yid5qyh6L+b5p2l55qE6K+05piO5Y+v5Lul5re75Yqg6YCJ6aG5XG4gICAgICAgICAgcGF5YW0uY291bnQgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnRyYW5zcGFyZW50TGF5ZXJIaXRzXG4gICAgICAgICAgY29uc29sZS5sb2cocGF5YW0uY291bnQsICfmn6XnnIvojrflj5bmrKHmlbAnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29uc29sZS5sb2cocGF5YW0sICfmn6XnnIvov5nkuKrpgI/mmI7lsYLojrflj5bnmoTlj4LmlbAnKTtcbiAgICAgICAgJGFwaXMudGFza1xuICAgICAgICAgIC5nZXRUcmFuc3BhcmVudExheWVyKHsgLi4ucGF5YW0gfSlcbiAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsICfmn6XnnIvov5nkuKrpgI/mmI7lsYLojrflj5YnKTtcbiAgICAgICAgICAgIC8vIOaYr+WQpuWIneasoeivt+axglxuICAgICAgICAgICAgaWYgKHRoaXMuaXNmcmlzdFJlcUNvdW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5pc2ZyaXN0UmVxQ291biA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyYW5zcGFyZW50TGF5ZXJMKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hvd1RyYW5zcGFyZW5jeSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+afpeeci+inpuWPkemAj+aYjuWxgicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+afpeeci+i/lOWbnuaKpemUmScpXG4gICAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSwgJ+iOt+WPluWkseaViCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5YWz6Zet6YCP5piO5bGCXG4gICAgaGlkZVRyYW5zcGFyZW5jeSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vkuoblhbPpl63lub/lkYonKTtcbiAgICAgIHRoaXMuc2hvd1RyYW5zcGFyZW5jeSA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGRDbGlja051bSgpXG4gICAgfSxcbiAgICBhZGRDbGlja051bSgpIHtcbiAgICAgIHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudHJhbnNwYXJlbnRMYXllckhpdHMgPSB0aGlzLiRhcHAuJGRlZi5kYXRhQXBwLnRyYW5zcGFyZW50TGF5ZXJIaXRzICsgMVxuICAgICAgdGhpcy5nZXRUcmFuc3BhcmVudExheWVyTCgpXG4gICAgfSxcbiAgICAvLyDlhbPpl61cbiAgICBoZWlkZVJlbWluZGVyKGUpIHtcbiAgICAgIC8vIHRoaXMuc2hvd1JlbWluZGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmFkZENsaWNrTnVtKClcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgY29uc3QgeyBkZXRhaWwgPSAnJyB9ID0gZTtcbiAgICAgIGlmICghZGV0YWlsKSB7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygn6L+Z5piv5LuA5LmIJywgZGV0YWlsLmRhdGEpO1xuICAgICAgICBpZiAoZGV0YWlsLmRhdGEgPT09ICdzaG93VmFja1Rpc3AnKSB7XG4gICAgICAgICAgdGhpcy5zaG93VmFja1Rpc3AgPSBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKGRldGFpbC5kYXRhID09PSAnc2hvd1JlbWluZGVyJykge1xuICAgICAgICAgIHRoaXMuc2hvd1JlbWluZGVyID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICrlhbPpl63lgJLorqHml7bnqpflj6NcbiAgICAgKi9cbiAgICBoaWRlUmVtaW5kZXIoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5YWz6Zet5YCS6K6h5pe256qX5Y+jJyk7XG4gICAgICB0aGlzLnNob3dSZW1pbmRlciA9IGZhbHNlO1xuICAgIH1cblxuICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG4gIEBpbXBvcnQgXCIuL2luZGV4Lmxlc3NcIjtcbjwvc3R5bGU+IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5oaWRlXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgfSxcbiAgXCIuc2hvd1wiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiXG4gIH0sXG4gIFwiLm9wYWNpdHktaGlkZS10by1zaG93XCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJvcGFjaXR5SGlkZVRvU2hvd1wiXG4gIH0sXG4gIFwiLm9wYWNpdHktc2hvdy10by1oaWRlXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJvcGFjaXR5U2hvd1RvSGlkZVwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1sZWZ0LXRvLWNlbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlTGVmdFRvQ2VudGVyXCJcbiAgfSxcbiAgXCIudHJhbnNsYXRlLWNlbnRlci10by1sZWZ0XCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVDZW50ZXJUb0xlZnRcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtcmlnaHQtdG8tY2VudGVyXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVSaWdodFRvQ2VudGVyXCJcbiAgfSxcbiAgXCIudHJhbnNsYXRlLWNlbnRlci10by1yaWdodFwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlQ2VudGVyVG9SaWdodFwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS10b3AtdG8tY2VudGVyXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVUb3BUb0NlbnRlclwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1jZW50ZXItdG8tdG9wXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVDZW50ZXJUb1RvcFwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1ib3R0b20tdG8tY2VudGVyXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVCb3R0b21Ub0NlbnRlclwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1jZW50ZXItdG8tYm90dG9tXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJ0cmFuc2xhdGVDZW50ZXJUb0JvdHRvbVwiXG4gIH0sXG4gIFwiQEtFWUZSQU1FU1wiOiB7XG4gICAgXCJvcGFjaXR5SGlkZVRvU2hvd1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAwLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdLFxuICAgIFwib3BhY2l0eVNob3dUb0hpZGVcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMSxcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAwLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZUxlZnRUb0NlbnRlclwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiLTEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZUNlbnRlclRvTGVmdFwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiLTEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZVJpZ2h0VG9DZW50ZXJcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZUNlbnRlclRvUmlnaHRcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZVRvcFRvQ2VudGVyXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCItMTAwJVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVDZW50ZXJUb1RvcFwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiLTEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZUJvdHRvbVRvQ2VudGVyXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIxMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInRyYW5zbGF0ZUNlbnRlclRvQm90dG9tXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIxMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCIuYXBleC1uYXZiYXJcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXIgLnRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXIgLmxlZnQgLnRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXIgLnJpZ2h0IC50ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyIC50aXRsZSAudGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5hcGV4LW5hdmJhci1saWdodFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXItbGlnaHQgLnRleHRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjNDk1MDYwXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5hcGV4LW5hdmJhci1kYXJrXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMxYzI0MzhcIlxuICB9LFxuICBcIi5hcGV4LW5hdmJhci1yb3lhbFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmY5OTAwXCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXItcG9zaXRpdmVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzE5YmU2YlwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyLWNhbG1cIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzJkOGNmMFwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiQEZPTlQtRkFDRVwiOiB7XG4gICAgXCJpY29uZm9udFwiOiB7XG4gICAgICBcImZvbnRGYW1pbHlcIjogXCJpY29uZm9udFwiLFxuICAgICAgXCJzcmNcIjogW1xuICAgICAgICBcIi9jb21wb25lbnRzL2ljb24vaWNvbmZvbnRzLnR0ZlwiXG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcIi5mb250LWljb25cIjoge1xuICAgIFwiZm9udEZhbWlseVwiOiBcImljb25mb250XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5iYWNrLXRvLWFkc1wiOiB7XG4gICAgXCJhbGlnblNlbGZcIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiNzUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC44KVwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmVcIjoge1xuICAgIFwid2lkdGhcIjogXCI2OTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNzUwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjgwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjM1cHhcIixcbiAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIi0xMDBweFxcXCJ9XCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNzUwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRpc3AtdGl0bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxNTBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRpc3AtdGl0bGUgLnRpc3AtdGl0bGUtdHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjYwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50aXNwLXRpdGxlIC5jbG9zZS1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcInRvcFwiOiBcIjIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudG9wLWJpZy1pbWdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzAwcHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiNTBweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjVweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyNXB4XCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuYWQtaW1hZ2VcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiMzAwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRvcC1iaWctaW1nIC5hZC1pbWFnZSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE1cHhcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImZpbGxcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRvcC1iaWctaW1nIC5mbG9hdFwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnRcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC10aXRsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDBweFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC10aXRsZSAuYWQtdGl0bGUtdHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmFkLXMtdGl0bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCI4MCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImZsZXgtc3RhcnRcIixcbiAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC1zLXRpdGxlIC5hZC1zLXRpdGxlLWFkIC5hZC1zLXRpdGxlLXR4dFwiOiB7XG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImxpbmVzXCI6IDIsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuc3Rhci1saXN0XCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmZvb3QtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjIwMHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmZvb3QtYnRuIC5jbGljay1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNDAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjkwcHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjYwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzRweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmYxMDM5XCIsXG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwic2NhbGVEcmF3XCIsXG4gICAgXCJhbmltYXRpb25EZWxheVwiOiBcIjBtc1wiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIxMjAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIixcbiAgICBcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IC0xLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIkBLRVlGUkFNRVNcIjoge1xuICAgIFwic2NhbGVEcmF3XCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxLjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxLjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMjVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA1MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjEuMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjEuMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiA3NVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAudmVydGljYWwtY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC52ZXJ0aWNhbC1jb250ZW50IC5hZC1jbG9zZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5ib3R0b20tbmF0aXZlXCI6IHtcbiAgICBcImFsaWduU2VsZlwiOiBcImNlbnRlclwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjE1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5hZC1uYXRpdmVcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmxlZnQtaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjkwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMTBweFwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmxlZnQtaW1nIC5hZC1pbWdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAubGVmdC1pbWcgLmFkLWltZyBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImZpbGxcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE1cHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5sZWZ0LWltZyAuaWNvblwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNilcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5mbG9hdFwiOiB7XG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiODAlXCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuZmxvYXQgLmZsb2F0LXR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjIxcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2IzYjNiNVwiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRPdmVyZmxvd1wiOiBcImVsbGlwc2lzXCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuY2VudGVyLWluZm9cIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwidG9wXCI6IFwiLTEwcHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jZW50ZXItaW5mbyAuaW5mby1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNlbnRlci1pbmZvIC5pbmZvLWl0ZW0gLnR4dFwiOiB7XG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwiZm9udFNpemVcIjogXCIyOHB4XCIsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNlbnRlci1pbmZvIC5pbmZvLWl0ZW0gLnRpdGxlXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNlbnRlci1pbmZvIC5pbmZvLWl0ZW0gLnRhZ1wiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuMDYpXCIsXG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTZweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMjBweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI0cHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jbGljay1pdGVtXCI6IHtcbiAgICBcImZsZXhTaHJpbmtcIjogMCxcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiZmxleC1lbmRcIixcbiAgICBcImFsaWduU2VsZlwiOiBcImZsZXgtZW5kXCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjhweFwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNsaWNrLWl0ZW0gLnRpdGxlXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNsaWNrLWl0ZW0gLmNsaWNrLXR4dFwiOiB7XG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzMHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM0cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInRleHRBbGlnblwiOiBcInJpZ2h0XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmYwZjM5XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuY2xpY2staXRlbSAuYWQtY2xvc2VcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAudG9wLWNsb3NlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjUwcHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDIwNSwyMDUsMjA3LDAuNSlcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5yZW1pbmRlci1hZHNcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjc1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOClcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjY5MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI4MDBweFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiODBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzVweFwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI3NTBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRvcC1iaWctaW1nXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImhlaWdodFwiOiBcIjQwMHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuYWQtaW1hZ2VcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiNDAwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRvcC1iaWctaW1nIC5hZC1pbWFnZSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE1cHhcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImZpbGxcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuY2xvc2UtaXRlbVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIixcbiAgICBcIndpZHRoXCI6IFwiNjBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcInRvcFwiOiBcIjMwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiNDBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNTAlXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmFkLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC10aXRsZSAuYWQtdGl0bGUtdHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC1zLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiODAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduQ29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtcy10aXRsZSAuYWQtcy10aXRsZS1hZCAuYWQtcy10aXRsZS10eHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLnN0YXItbGlzdFwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuZm9vdC1idG5cIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMjAwcHhcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmZvb3QtYnRuIC5jbGljay1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNDAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEyMHB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2MHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM0cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmMTAzOVwiLFxuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcInNjYWxlRHJhd1wiLFxuICAgIFwiYW5pbWF0aW9uRGVsYXlcIjogXCIwbXNcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMTIwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImVhc2Utb3V0XCIsXG4gICAgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiAtMSxcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcInNjYWxlRHJhd1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMS4xXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMS4xXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDI1XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogNTBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxLjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxLjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogNzVcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC52ZXJ0aWNhbC1jb250ZW50XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC52ZXJ0aWNhbC1jb250ZW50IC5hZC1jbG9zZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInBhZ2VcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y3ZjdmOVwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2VcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZjdmN2Y5XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWR2ZXJ0aXNpbmctdGl0bGVcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMycHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzJweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkdmVydGlzaW5nLXRpdGxlIC5tLWhlYWRpbmdcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNTAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzZweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTZweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkdmVydGlzaW5nLXRpdGxlIC5zLWhlYWRpbmdcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmb250V2VpZ2h0XCI6IFwiNTAwXCIsXG4gICAgXCJjb2xvclwiOiBcIiM5ZTllYTBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkdmVydGlzaW5nLXRpdGxlIC50aGFuay15b3Utc3BlZWNoXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjEycHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWR2ZXJ0aXNpbmctdGl0bGUgLnRoYW5rLXlvdS1zcGVlY2ggLnR4dFwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIwcHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkdmVydGlzaW5nLXRpdGxlIC50aGFuay15b3Utc3BlZWNoIC5saW5lXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjNweFwiLFxuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZWRlZGVmXCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtY29tcG9uXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMycHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzJweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5hZ3JlZW1lbnRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuYWdyZWVtZW50IC5hZ3JlZW1lbnQtaXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU1JVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5hZ3JlZW1lbnQgLmFncmVlbWVudC1pdGVtIC50eHRcIjoge1xuICAgIFwibGluZXNcIjogMSxcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuYWdyZWVtZW50IC5hZ3JlZW1lbnQtaXRlbS1pbmZvXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuYWdyZWVtZW50IC5oaWRlLWNsb3NlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNjN2M2YzlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjVweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5hZC10aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmFkLXRpdGxlIC5hZC10aXRsZS10eHRcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudmVydGljYWwtY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudmVydGljYWwtY29udGVudCAuYWQtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmJpZy1pbWdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5iaWctaW1nIC5hZC1pbWFnZVwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI1MDBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4U2hyaW5rXCI6IDBcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmJpZy1pbWcgLmFkLWltYWdlIGltYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTVweFwiLFxuICAgIFwib2JqZWN0Rml0XCI6IFwiY29udGFpblwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5iaWctaW1nIC5sb2dvXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjcwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuYmlnLWltZyAubG9nbyAuY2xvc2UtaXRlbVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDIwNSwyMDUsMjA3LDAuNSlcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaWNvblwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaWNvbiAuaWNvbi1pbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaWNvbiAuaWNvbi1pbWFnZSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImNvbnRhaW5cIlxuICB9LFxuICBcIi5hZHZlcnRpc2luZy1wYWdlIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaWNvbiAuaWNvbi10eHRcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjEycHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5mb290ZXJcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiOTZweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmbGV4U2hyaW5rXCI6IDAsXG4gICAgXCJtaW5XaWR0aFwiOiBcIjI1MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmMGYzOVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjVweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiNGMEY4RkZcIixcbiAgICBcImhlaWdodFwiOiBcIjEyMHB4XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAudGl0bGVcIjoge1xuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAuY2xpY2stdHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzRweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjRjBGOEZGXCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAuYWQtY2xvc2VcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIuYWR2ZXJ0aXNpbmctcGFnZSAuYWQtbmF0aXZlIC5jb250YWluZXIgLnN3aXBlLWxlZnQtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMzAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjc1cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjQ1cHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUycHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiYXV0b1wiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiYXV0b1wiXG4gIH0sXG4gIFwiLmFkdmVydGlzaW5nLXBhZ2UgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5zd2lwZS1sZWZ0LWJ0biB0ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImFkdmVydGlzaW5nLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1uYXZiYXJcIixcbiAgICAgIFwiYXR0clwiOiB7fVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYWR2ZXJ0aXNpbmctdGl0bGVcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5q2j5ZOB5YaF5a655YWN6LS56K+7XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwibS1oZWFkaW5nXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLlub/lkYrmlLbnm4rmmK/kuLrkuobmv4DlirHkvZzogIXmj5DkvpvkvJjotKjlhoXlrrlcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJzLWhlYWRpbmdcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRoYW5rLXlvdS1zcGVlY2hcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJsaW5lXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLmhJ/osKLkvaDnmoTmlK/mjIFcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwibGluZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImFkLWNvbXBvblwiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmhhc0FkTGlzdCl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJhZGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmFkSWQpfSxcbiAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghIXRoaXMuYWRMaXN0LmFkSWQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJhZC1uYXRpdmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImFncmVlbWVudFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ3JlZW1lbnQtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ3JlZW1lbnQtaXRlbS1pbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QudGl0bGUrdGhpcy5hZExpc3QuYXBwQ29tcGFueSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicHJpdmFjeVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFncmVlbWVudC1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoaWRlLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI1MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoaWRlLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnNob3dUcmFuc3BhcmVuY3kpKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjUwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImFkLXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuZGVzY3x8dGhpcy5kZWZhdWx0QWQuZGVzYyl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLXRpdGxlLXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmlnLWltZ1wiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuaW1nVXJsTGlzdD90aGlzLmFkTGlzdC5pbWdVcmxMaXN0WzBdOnRoaXMuZGVmYXVsdEFkLmltZyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI0ZGRkZGRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnNob3dUcmFuc3BhcmVuY3kpKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5pY29uKX0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpa2NcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpY29uLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0Lmljb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWNvbi10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZm9vdGVyXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGljay1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuY2xpY2tCdG5UeHR8fHRoaXMuZGVmYXVsdEFkLmNsaWNrQnRuVHh0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3dpcGUtbGVmdC1idG5cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnJlcG9ydE5hdGl2ZUNsaWNrKCdidG4nLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyb3ctYmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJvdy1iYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuW3pua7kee7p+e7remYheivu1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzd2lwZS1sZWZ0LWJ0blwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYXBwZWFyU3dpcGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzd2lwZVwiOiBcImFwcGVhclN3aXBlXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCF0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMjBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImFycm93LWJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyb3ctYmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLlt6bmu5Hnu6fnu63pmIXor7tcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiYm90dG9tLW5hdGl2ZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJhZFVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkSWQpfSxcbiAgICAgICAgXCJhZExpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QpfSxcbiAgICAgICAgXCJzaG93VHJhbnNwYXJlbmN5XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dCYW5uZXIpfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJlbWl0LWhpZGUtdHJhbnNwYXJlbmN5XCI6IFwiaGlkZVRyYW5zcGFyZW5jeVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJyZW1pbmRlci1hZHNcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic2hvd1RyYW5zcGFyZW5jeVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfVxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93UmVtaW5kZXIpfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJlbWl0LWhpZGUtdHJhbnNwYXJlbmN5XCI6IFwiaGlkZVRyYW5zcGFyZW5jeVwiLFxuICAgICAgICBcImVtaXQtY2xvc2VcIjogXCJoZWlkZVJlbWluZGVyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImJhY2stdG8tYWRzXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dUcmFuc3BhcmVuY3lcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1ZhY2tUaXNwKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiZW1pdC1oaWRlLXRyYW5zcGFyZW5jeVwiOiBcImhpZGVUcmFuc3BhcmVuY3lcIixcbiAgICAgICAgXCJlbWl0LWNsb3NlXCI6IFwiaGVpZGVSZW1pbmRlclwiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJiYWNrLXRvLWFkc1wiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmhhc0FkTGlzdCl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzaG93XCI6IFwieyEhYWRMaXN0LmFkSWR9fVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLW5hdGl2ZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGlzcC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLpgIDlh7rliY3nnIvkuKrlub/lkYrvvJ9cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXNwLXRpdGxlLXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWJpZy1pbWdcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmltZ1VybExpc3Q/dGhpcy5hZExpc3QuaW1nVXJsTGlzdFswXTp0aGlzLmRlZmF1bHRBZC5pbWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxvYXRcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInByaXZhY3lcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJob3Jpem9udGFsLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1zLXRpdGxlLWFkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuZGVzY3x8dGhpcy5kZWZhdWx0QWQuZGVzYyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkLXMtdGl0bGUtdHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb290LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGljay1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuY2xpY2tCdG5UeHR8fHRoaXMuZGVmYXVsdEFkLmNsaWNrQnRuVHh0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCLnq4vljbPpgIDlh7pcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvbnRTaXplXCI6IFwiMjJweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYmFja0hvbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJib3R0b20tbmF0aXZlXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaGFzQWRMaXN0KX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImFkaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuYWRJZCl9LFxuICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCEhdGhpcy5hZExpc3QuYWRJZCl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLW5hdGl2ZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdC1pbWdcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5pbWdVcmxMaXN0P3RoaXMuYWRMaXN0LmltZ1VybExpc3RbMF06dGhpcy5kZWZhdWx0QWQuaW1nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImljb25cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI0ZGRkZGRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyLWluZm9cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm8taXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3Q/dGhpcy5hZExpc3QudGl0bGU6dGhpcy5kZWZhdWx0QWQudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibG9nb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0P3RoaXMuYWRMaXN0LmRlc2M6dGhpcy5kZWZhdWx0QWQuZGVzYyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrLXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuY2xpY2tCdG5UeHR8fHRoaXMuZGVmYXVsdEFkLmNsaWNrQnRuVHh0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJmbG9hdFwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInByaXZhY3lcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmFwcEluZm8uYXBwTmFtZSt0aGlzLmFkTGlzdC5hcHBJbmZvLmFwcFNpemUrdGhpcy5hZExpc3QuYXBwSW5mby5hcHBWZXJzaW9uK3RoaXMuYWRMaXN0LmFwcEluZm8uZGV2ZWxvcGVyKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxvYXQtdHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuaGFzQXBwTWlpdEluZm8pfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9LFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3AtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnNob3dUcmFuc3BhcmVuY3kpKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjUwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICBcImF0dHJcIjoge1xuICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy51bmVzY2FwZUZvbnRJY29uQ29kZSh0aGlzLmljb25NYXBbdGhpcy50eXBlXSkpfVxuICB9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJmb250LWljb25cIlxuICBdLFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2ZvbnQtc2l6ZTogJysoKHRoaXMuc2l6ZSp0aGlzLnJhdGlvLzc1MCkpKydweDtjb2xvcjogJysoKHRoaXMuY29sb3IpKSsnOyd9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsnYXBleC1uYXZiYXInLCAnYXBleC1uYXZiYXItJysodGhpcy50aGVtZSldfSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdoZWlnaHQ6JysoKHRoaXMuaGVpZ2h0KSkrJ3B4J30sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImxlZnRcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImNsaWNrSGFuZGxlckxlZnRcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubGVmdFRleHQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJ0ZXh0XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5sZWZ0VGV4dCl9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRpdGxlXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50aXRsZSl9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRpdGxlKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCF0aGlzLnRpdGxlKX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJyaWdodFwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiY2xpY2tIYW5kbGVyUmlnaHRcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucmlnaHRUZXh0KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucmlnaHRUZXh0KX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicmVtaW5kZXItYWRzXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaGFzQWRMaXN0KX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNob3dcIjogXCJ7ISFhZExpc3QuYWRJZH19XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYWQtbmF0aXZlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJjb250YWluZXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWJpZy1pbWdcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmltZ1VybExpc3Q/dGhpcy5hZExpc3QuaW1nVXJsTGlzdFswXTp0aGlzLmRlZmF1bHRBZC5pbWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCEodGhpcy5zaG93VHJhbnNwYXJlbmN5KSl9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJob3Jpem9udGFsLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC50aXRsZXx8dGhpcy5kZWZhdWx0QWQudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC10aXRsZS10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibG9nb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1zLXRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1zLXRpdGxlLWFkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5kZXNjfHx0aGlzLmRlZmF1bHRBZC5kZXNjKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZS10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3Rhci1saXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0YXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZDRTJEXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAoNSl9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9vdC1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmNsaWNrQnRuVHh0fHx0aGlzLmRlZmF1bHRBZC5jbGlja0J0blR4dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1teS1uYXZiYXIhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcYXBleC11aVxcXFxjb21wb25lbnRzXFxcXG5hdmJhclxcXFxpbmRleC51eCEuLi8uLi8uLi9sZXNzLWxvYWRlciEuLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxhcGV4LXVpXFxcXGNvbXBvbmVudHNcXFxcbmF2YmFyXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9teS1uYXZiYXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWljb24hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxjb21wb25lbnRzXFxcXGljb25cXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxjb21wb25lbnRzXFxcXGljb25cXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pY29uJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vLi4vLi4vY29tcG9uZW50cy9pY29uL2luZGV4LnV4P25hbWU9aWNvblwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWJhY2stdG8tYWRzJmRlcGVuZHNbXT1pY29uIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2JhY2stdG8tYWRzLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcY29tcG9uZW50c1xcXFxiYWNrLXRvLWFkcy51eCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXHBhZ2VzXFxcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxcXGNvbXBvbmVudHNcXFxcYmFjay10by1hZHMudXghLi9iYWNrLXRvLWFkcy51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vYmFjay10by1hZHMudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9iYWNrLXRvLWFkcycsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eD9uYW1lPWljb25cIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1ib3R0b20tbmF0aXZlJmRlcGVuZHNbXT1pY29uIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2JvdHRvbS1uYXRpdmUudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcXFxjb21wb25lbnRzXFxcXGJvdHRvbS1uYXRpdmUudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcXFxjb21wb25lbnRzXFxcXGJvdHRvbS1uYXRpdmUudXghLi9ib3R0b20tbmF0aXZlLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9ib3R0b20tbmF0aXZlLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYm90dG9tLW5hdGl2ZScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eD9uYW1lPWljb25cIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1yZW1pbmRlci1hZHMmZGVwZW5kc1tdPWljb24hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vcmVtaW5kZXItYWRzLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcY29tcG9uZW50c1xcXFxyZW1pbmRlci1hZHMudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcXFxjb21wb25lbnRzXFxcXHJlbWluZGVyLWFkcy51eCEuL3JlbWluZGVyLWFkcy51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vcmVtaW5kZXItYWRzLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcmVtaW5kZXItYWRzJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eD9uYW1lPWljb25cIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9jb21wb25lbnRzL2JvdHRvbS1uYXRpdmUudXg/bmFtZT1ib3R0b20tbmF0aXZlXCIpXG5yZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY29tcG9uZW50cy9yZW1pbmRlci1hZHMudXg/bmFtZT1yZW1pbmRlci1hZHNcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4P25hbWU9YmFjay10by1hZHNcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2FwZXgtdWkvY29tcG9uZW50cy9uYXZiYXIvaW5kZXgudXg/bmFtZT1teS1uYXZiYXJcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPW15LW5hdmJhciZkZXBlbmRzW109aWNvbiZkZXBlbmRzW109Ym90dG9tLW5hdGl2ZSZkZXBlbmRzW109cmVtaW5kZXItYWRzJmRlcGVuZHNbXT1iYWNrLXRvLWFkcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXHBhZ2VzXFxcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxcXGluZGV4LnV4IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMC4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
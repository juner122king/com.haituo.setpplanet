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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/readAd/index.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/readAd/index.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const device = $app_require$("@app-module/system.device");
let nativeAd;
module.exports = {
  private: {
    title: 'World',
    chapterContent: '',
    readObj: {},
    nowTheChapter: 0,
    langIndex: 0,
    clickNum: 0,
    showAd: false,
    adList: {},
    hasAdList: false,
    showVackTisp: false,
    showBanner: true,
    showReminder: false,
    defaultAd: {
      desc: '华为广告',
      title: '华为联盟',
      icon: '广告',
      clickBtnTxt: '点击安装',
      img: "http://cdn.bank-zone.cn/pro/sy/admin/advertising/3639bdbde8e84397a297ad54f89ac4c3.jpg"
    },
    textContent: [{
      title: '第一章：穷屌丝偶遇白富美',
      list: ["在繁华的都市中，有一个名叫李浩的年轻人。 '\' 他身材普通，长相平凡，是一个典型的“屌丝男”。'\'每天，他都在一家小公司里做着枯燥无味的工作，拿着微薄的薪水，过着平淡无奇的生活。'\'", "然而，李浩的心中却有一个不为人知的梦想——那就是有朝一日能够逆袭，成为一个成功的人，迎娶他心目中的白富美。'\'他知道这个梦想遥不可及，但他从未放弃过。'\'", "有一天，李浩在公司附近的一家咖啡店里偶遇了一个美丽的女孩。'\'她名叫林婉儿，家境优渥，气质高雅，是李浩心目中的白富美。'\'两人虽然只是短暂的交谈了几句，但李浩却被林婉儿深深地吸引了。'\'", "从那以后，李浩开始努力地改变自己。'\'他努力学习各种知识和技能，提升自己的能力。'\'他利用业余时间参加各种社交活动，扩大自己的人脉。'\'他不断地锻炼自己的身体，让自己变得更加健康和有魅力。'\'", "经过一段时间的努力，李浩终于迎来了他的逆袭契机。'\'", "有一天，李浩在参加一个行业聚会时，意外地遇到了一位成功的企业家。'\'这位企业家对李浩的才华和努力表示赞赏，并邀请他加入自己的公司。'\'李浩抓住了这个机会，辞去了原本的工作，加入了新的公司。'\'", "与此同时，李浩也没有忘记自己最初的梦想。'\'他开始尝试接近林婉儿，和她建立了深厚的友谊。'\'他用自己的真诚和才华打动了林婉儿的心，两人逐渐走到了一起。'\'", "在一次浪漫的约会中，李浩鼓起勇气向林婉儿求婚。'\'他向林婉儿承诺，会用自己的努力和才华让她过上幸福的生活。'\'林婉儿被李浩的真诚和才华所感动，答应了他的求婚。'\'", "就这样，一个平凡的屌丝男李浩通过自己的努力和坚持实现了自己的逆袭梦想。'\'他成功地迎娶了自己心目中的白富美林婉儿，两人共同开启了一段幸福美好的新生活。'\'"]
    }],
    adId: '',
    provider: '',
    displayAdType: 0,
    timer: null,
    showTransparency: false
  },
  onInit: function () {
    this.initReadPage();
    this.adId = 'v5h5xsklp2';
  },
  hideTransparency() {
    console.log('点击了关闭广告');
    this.showTransparency = false;
  },
  addClickNum() {
    console.log(this.$app.$def.dataApp.transparentLayerHits, '查看你的次数');
    this.$app.$def.dataApp.transparentLayerHits = this.$app.$def.dataApp.transparentLayerHits + 1;
    this.getTransparentLayerL();
  },
  latencyShowReminder: function () {
    this.timer = null;
    console.log('是否开启了定时器');
    this.timer = setTimeout(() => {
      this.showReminder = true;
      console.log('展示的是什么');
    }, 3000);
  },
  onReady(options) {
    '// Do something .';

    this.preloadAd();
    this.getTransparentLayerL();
  },
  getTransparentLayerL: function () {
    console.log('是否进来了透明层判断');
    try {
      const branch = $ad.getProvider();
      let payam = {
        brand: branch.toUpperCase()
      };
      if (!this.isfristReqCoun) {
        payam.count = this.$app.$def.dataApp.transparentLayerHits;
        console.log(payam.count, '查看上传的次数');
      }
      $apis.task.getTransparentLayer(_objectSpread({}, payam)).then(res => {
        console.log(res, '查看返回的透明层参数');
        if (this.isfristReqCoun) {
          this.isfristReqCoun = false;
          if (res.data) {
            this.getTransparentLayerL();
          }
          return;
        }
        this.showTransparency = res.data;
      }).catch(err => {
        console.log(err, '查看返回报错');
      });
    } catch (e) {
      console.log(e, '获取失效');
    }
  },
  async preloadAd() {
    var that = this;
    this.provider = $ad.getProvider();
    console.log('怎么没有进来环境');
    if (this.provider !== "huawei") {
      console.info("the device  does not support ad.");
      return;
    }
    if (nativeAd) {
      nativeAd.destroy();
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
      console.log(e, '查看广告怎么不出来');
    });
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
  heideReminder(e) {
    console.log(e);
    const {
      detail = ''
    } = e;
    this.addClickNum();
    if (!detail) {} else {
      console.log('这是什么', detail.data);
      if (detail.data === 'showVackTisp') {
        this.showVackTisp = false;
      } else if (detail.data === 'showReminder') {
        this.showReminder = false;
      } else if (detail.data === 'banner') {
        this.showBanner = false;
      }
    }
  },
  close() {
    console.log('没有触发这个吗');
    this.hasAdList = false;
    this.addClickNum();
  },
  onBackPress() {
    this.showVackTisp = true;
    console.log('触发了怎么无效了');
    return true;
  },
  initReadPage() {
    console.log('重置小说页面', this.$page.windowHeight);
    this.readObj = this.textContent[0];
  },
  changeSwiper(e) {
    this.latencyShowReminder();
    this.langIndex = e.index;
    console.log(e.index, '查看这个index9999999999999999');
    this.displayAdType = Math.floor(Math.random() * 11);
    this.clickNum += 1;
    if (this.clickNum == 3) {
      this.showAd = true;
      this.clickNum = 0;
    } else if (this.clickNum == 2) {
      this.preloadAd();
      this.showAd = false;
    } else {
      this.showAd = false;
    }
    if (e.index <= 3) {
      this.textContent[0].title = '第一章：穷屌丝偶遇白富美';
    } else {
      this.textContent[0].title = '第二章：屌丝迎娶白富美';
    }
  },
  clickSwiper(e) {
    console.log('点击了页面', e.clientX);
    console.log(this.langIndex);
    this.langIndex = this.$element('swiper').swipeTo({
      index: e.clientX >= 375 ? this.langIndex < 8 ? this.langIndex + 1 : 0 : this.langIndex === 0 ? 8 : this.langIndex - 1
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\readAd\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\readAd\\index.ux!./src/pages/readAd/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\readAd\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\readAd\index.ux!./src/pages/readAd/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".ad-page": {
    "flexDirection": "column",
    "width": "100%",
    "height": "100%",
    "justifyContent": "center"
  },
  ".read-box": {
    "flexDirection": "column",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#F8F8FA"
  },
  ".read-box .container": {
    "width": "100%",
    "height": "100%"
  },
  ".read-box .swiper": {
    "width": "100%",
    "height": "100%"
  },
  ".read-box .swiper .swiper-item": {
    "width": "750px",
    "height": "100%",
    "flexDirection": "column",
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px"
  },
  ".read-box .swiper .swiper-item .contnet": {
    "width": "750px",
    "height": "100%",
    "flexDirection": "column",
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px"
  },
  ".read-box .swiper .swiper-item .contnet .font": {
    "fontWeight": "400",
    "fontSize": "90px",
    "lineHeight": "100px"
  },
  ".ream-container": {
    "width": "100%",
    "height": "750px",
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".ream-container .top-big-img": {
    "flexDirection": "column",
    "height": "400px",
    "alignItems": "center",
    "width": "100%",
    "marginBottom": "50px"
  },
  ".ream-container .top-big-img .ad-image": {
    "height": "400px",
    "width": "100%"
  },
  ".ream-container .top-big-img .ad-image image": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "15px",
    "objectFit": "fill"
  },
  ".ream-container .top-big-img .close-item": {
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
  ".ream-container .horizontal-content": {
    "flexDirection": "column",
    "alignItems": "center"
  },
  ".ream-container .horizontal-content .ad-title": {
    "width": "100%",
    "justifyContent": "center",
    "alignItems": "center",
    "marginBottom": "30px",
    "height": "100px"
  },
  ".ream-container .horizontal-content .ad-title .ad-title-txt": {
    "fontSize": "32px",
    "fontWeight": "500",
    "color": "#000000"
  },
  ".ream-container .horizontal-content .ad-s-title": {
    "width": "80%",
    "height": "100px",
    "justifyContent": "center",
    "alignContent": "center",
    "marginBottom": "30px"
  },
  ".ream-container .horizontal-content .ad-s-title .ad-s-title-ad .ad-s-title-txt": {
    "textAlign": "center",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  ".ream-container .horizontal-content .star-list": {
    "height": "80px",
    "justifyContent": "center",
    "marginBottom": "30px"
  },
  ".ream-container .horizontal-content .foot-btn": {
    "width": "400px",
    "height": "200px",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".ream-container .horizontal-content .foot-btn .click-item": {
    "width": "300px",
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
  ".home-container": {
    "width": "100%",
    "flexDirection": "column",
    "paddingTop": "20px",
    "paddingRight": "0px",
    "paddingBottom": "20px",
    "paddingLeft": "0px",
    "height": "100%"
  },
  ".home-container .agreement": {
    "width": "100%",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  ".home-container .agreement .agreement-item": {
    "width": "55%",
    "alignItems": "center",
    "height": "80px"
  },
  ".home-container .agreement .agreement-item .txt": {
    "lines": 1,
    "fontSize": "28px",
    "textOverflow": "ellipsis"
  },
  ".home-container .agreement .agreement-item-info": {
    "flexDirection": "column"
  },
  ".home-container .agreement .hide-close": {
    "backgroundColor": "#c7c6c9",
    "borderRadius": "5px"
  },
  ".home-container .ad-title": {
    "marginTop": "10px"
  },
  ".home-container .ad-title .ad-title-txt": {
    "fontWeight": "500",
    "fontSize": "32px",
    "color": "#000000"
  },
  ".home-container .vertical-content": {
    "width": "100%"
  },
  ".home-container .vertical-content .ad-close": {
    "width": "50px",
    "height": "50px"
  },
  ".home-container .big-img": {
    "flexDirection": "column",
    "alignItems": "center",
    "marginTop": "30px"
  },
  ".home-container .big-img .ad-image": {
    "height": "500px",
    "width": "100%",
    "flexShrink": 0
  },
  ".home-container .big-img .ad-image image": {
    "width": "100%",
    "height": "100%",
    "borderRadius": "15px",
    "objectFit": "contain"
  },
  ".home-container .big-img .logo": {
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
  ".home-container .big-img .logo .close-item": {
    "backgroundColor": "rgba(205,205,207,0.5)"
  },
  ".home-container .icon": {
    "width": "100%",
    "alignItems": "center",
    "height": "80px"
  },
  ".home-container .icon .icon-image": {
    "width": "80px",
    "height": "80px"
  },
  ".home-container .icon .icon-image image": {
    "width": "80px",
    "height": "80px",
    "objectFit": "contain"
  },
  ".home-container .icon .icon-txt": {
    "fontWeight": "500",
    "marginLeft": "12px",
    "fontSize": "32px"
  },
  ".home-container .footer": {
    "height": "96px",
    "width": "100%",
    "marginTop": "50px",
    "alignItems": "center"
  },
  ".home-container .footer .click-item": {
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
  ".home-container .footer .click-item .title": {
    "color": "#999999"
  },
  ".home-container .footer .click-item .click-txt": {
    "fontSize": "34px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "textAlign": "center",
    "color": "#F0F8FF"
  },
  ".home-container .footer .click-item .ad-close": {
    "alignSelf": "center",
    "marginLeft": "10px",
    "width": "50px",
    "height": "50px"
  },
  ".home-container .swipe-left-btn": {
    "width": "300px",
    "height": "75px",
    "backgroundColor": "#999999",
    "borderRadius": "45px",
    "marginTop": "52px",
    "marginRight": "auto",
    "marginBottom": "0px",
    "marginLeft": "auto"
  },
  ".home-container .swipe-left-btn text": {
    "color": "#ffffff"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/readAd/index.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/readAd/index.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "ad-page"
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
        "read-box"
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
              "type": "swiper",
              "attr": {
                "indicator": function () {return (false)},
                "id": "swiper"
              },
              "classList": [
                "swiper"
              ],
              "events": {
                "change": "changeSwiper"
              },
              "id": "swiper",
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "swiper-item"
                  ],
                  "repeat": function () {return (this.readObj.list)},
                  "events": {
                    "click": "clickSwiper"
                  },
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "contnet"
                      ],
                      "shown": function () {return (!this.showAd&&this.langIndex===this.$idx)},
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.readObj.title)}
                          },
                          "classList": [
                            "font-title"
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.$item)}
                          },
                          "classList": [
                            "font"
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {
                        "show": function () {return (this.showAd&&this.langIndex===this.$idx)}
                      },
                      "classList": [
                        "ad-page"
                      ],
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "ream-container"
                          ],
                          "shown": function () {return (this.displayAdType>=5)},
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
                                  "attr": {},
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
                                          "attr": {},
                                          "events": {
                                            "click": "reportNativeClick"
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
                                  "children": [
                                    {
                                      "type": "div",
                                      "attr": {},
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
                        },
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "home-container"
                          ],
                          "shown": function () {return (!(this.displayAdType>=5))},
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
                                  "attr": {},
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
                                  "attr": {},
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
                              "attr": {},
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
                                  "attr": {},
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
                            },
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "swipe-left-btn"
                              ],
                              "shown": function () {return (this.showTransparency)},
                              "events": {
                                "click": "reportNativeClick"
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
                                "click": "close"
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
        "emit-hide-transparency": "hideTransparency",
        "emit-close": "heideReminder"
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
/*!***********************************!*\
  !*** ./src/pages/readAd/index.ux ***!
  \***********************************/
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../node_modules/apex-ui/components/navbar/index.ux?name=my-navbar */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/apex-ui/components/navbar/index.ux?name=my-navbar")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../advertisingCampaigns/components/back-to-ads.ux?name=back-to-ads */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/back-to-ads.ux?name=back-to-ads")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../advertisingCampaigns/components/bottom-native.ux?name=bottom-native */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/bottom-native.ux?name=bottom-native")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../advertisingCampaigns/components/reminder-ads.ux?name=reminder-ads */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/pages/advertisingCampaigns/components/reminder-ads.ux?name=reminder-ads")
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../components/icon/index.ux?name=icon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/components/icon/index.ux?name=icon")
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=my-navbar&depends[]=icon&depends[]=bottom-native&depends[]=reminder-ads&depends[]=back-to-ads!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/pages/readAd/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\readAd\index.ux!../../../node_modules/less-loader!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\pages\readAd\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\readAd\\index.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\pages\\readAd\\index.ux!./src/pages/readAd/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/pages/readAd/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXHBhZ2VzXFxyZWFkQWRcXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0tBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFXQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2c0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2ljb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9hcGV4LXVpL2NvbXBvbmVudHMvbmF2YmFyL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXGFwZXgtdWlcXGNvbXBvbmVudHNcXG5hdmJhclxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2ljb24vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcY29tcG9uZW50c1xcaWNvblxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXHBhZ2VzXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcY29tcG9uZW50c1xcYmFjay10by1hZHMudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXHBhZ2VzXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcY29tcG9uZW50c1xcYm90dG9tLW5hdGl2ZS51eCIsIndlYnBhY2s6Ly8vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xccGFnZXNcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxjb21wb25lbnRzXFxyZW1pbmRlci1hZHMudXgiLCJ3ZWJwYWNrOi8vL3NyYy9wYWdlcy9yZWFkQWQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xccGFnZXNcXHJlYWRBZFxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FwZXgtdWkvY29tcG9uZW50cy9uYXZiYXIvaW5kZXgudXg/NThhNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2luZGV4LnV4P2I4NTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYmFjay10by1hZHMudXg/ZDhlMiIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9ib3R0b20tbmF0aXZlLnV4P2YzYTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvcmVtaW5kZXItYWRzLnV4PzU1NGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL3JlYWRBZC9pbmRleC51eD9jN2Y4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9yZWFkQWQvaW5kZXgudXg/ZWYzNiIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9iYWNrLXRvLWFkcy51eD9jODJiIiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JvdHRvbS1uYXRpdmUudXg/OTkxNSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2luZGV4LnV4Pzc5NmMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FwZXgtdWkvY29tcG9uZW50cy9uYXZiYXIvaW5kZXgudXg/M2Y4MCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9yZW1pbmRlci1hZHMudXg/NWE4YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBleC11aS9jb21wb25lbnRzL25hdmJhci9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pY29uL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4Iiwid2VicGFjazovLy8uL3NyYy9wYWdlcy9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JvdHRvbS1uYXRpdmUudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VzL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvcmVtaW5kZXItYWRzLnV4Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvcmVhZEFkL2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pY29ucyA9IHZvaWQgMDtcbmNvbnN0IGljb25zID0gZXhwb3J0cy5pY29ucyA9IHtcbiAgJ2FkZC1jaXJjbGUtbyc6ICcmI3hlOTc3JyxcbiAgJ2FkZC1jaXJjbGUnOiAnJiN4ZTk3NicsXG4gIGFkZDogJyYjeGU5NzUnLFxuICBhaXJwbGFuZTogJyYjeGU5NzQnLFxuICBhbGFybTogJyYjeGU5NzMnLFxuICAnYXJyb3ctYmFjayc6ICcmI3hlOTcyJyxcbiAgJ2Fycm93LWRvd24nOiAnJiN4ZTk3MScsXG4gICdhcnJvdy1kcm9wZG93bi1jaXJjbGUnOiAnJiN4ZTk3MCcsXG4gICdhcnJvdy1kcm9wZG93bic6ICcmI3hlOTZmJyxcbiAgJ2Fycm93LWRyb3BsZWZ0LWNpcmNsZSc6ICcmI3hlOTZlJyxcbiAgJ2Fycm93LWRyb3BsZWZ0JzogJyYjeGU5NmQnLFxuICAnYXJyb3ctZHJvcHJpZ2h0LWNpcmNsZSc6ICcmI3hlOTZjJyxcbiAgJ2Fycm93LWRyb3ByaWdodCc6ICcmI3hlOTZiJyxcbiAgJ2Fycm93LWRyb3B1cC1jaXJjbGUnOiAnJiN4ZTk2YScsXG4gICdhcnJvdy1kcm9wdXAnOiAnJiN4ZTk2OScsXG4gICdhcnJvdy1md2QnOiAnJiN4ZTk2OCcsXG4gICdhcnJvdy1yb3VuZC1iYWNrJzogJyYjeGU5NjcnLFxuICAnYXJyb3ctcm91bmQtZG93bic6ICcmI3hlOTY2JyxcbiAgJ2Fycm93LXItZndkJzogJyYjeGU5NjUnLFxuICAnYXJyb3ctcm91bmQtdXAnOiAnJiN4ZTk2NCcsXG4gICdhcnJvdy11cCc6ICcmI3hlOTYzJyxcbiAgYmx1ZXRvb3RoOiAnJiN4ZTk2MicsXG4gIGJ1ZzogJyYjeGU5NjEnLFxuICBidWlsZDogJyYjeGU5NjAnLFxuICBidXNpbmVzczogJyYjeGU5NWYnLFxuICBjYWxsOiAnJiN4ZTk1ZScsXG4gIGNhbWVyYTogJyYjeGU5NWQnLFxuICBjYXJkOiAnJiN4ZTk1YycsXG4gIGNhcnQ6ICcmI3hlOTViJyxcbiAgY2hhdGJveDogJyYjeGU5NWEnLFxuICBjaGF0OiAnJiN4ZTk1OScsXG4gICdjaGVja2JveC1vdXRsaW5lJzogJyYjeGU5NTgnLFxuICBjaGVja2JveDogJyYjeGU5NTcnLFxuICAnY2hlY2ttYXJrLWNpcmNsZS1vdXRsaW5lJzogJyYjeGU5NTYnLFxuICAnY2hlY2ttYXJrLWNpcmNsZSc6ICcmI3hlOTU1JyxcbiAgY2hlY2ttYXJrOiAnJiN4ZTk1NCcsXG4gICdjbG9zZS1jaXJjbGUtb3V0bGluZSc6ICcmI3hlOTUzJyxcbiAgJ2Nsb3NlLWNpcmNsZSc6ICcmI3hlOTUyJyxcbiAgY2xvc2U6ICcmI3hlOTUxJyxcbiAgJ2Nsb3VkLWRvbmUnOiAnJiN4ZTk1MCcsXG4gICdjbG91ZC1kb3duJzogJyYjeGU5NGYnLFxuICAnY2xvdWQtdXAnOiAnJiN4ZTk0ZScsXG4gIGN1dDogJyYjeGU5NGQnLFxuICAnZXllLW9mZic6ICcmI3hlOTRjJyxcbiAgZXllOiAnJiN4ZTk0YicsXG4gICdmaW5nZXItcHJpbnQnOiAnJiN4ZTk0YScsXG4gICdmbGFzaC1vZmYnOiAnJiN4ZTk0OScsXG4gIGZsYXNoOiAnJiN4ZTk0OCcsXG4gIGZsYXNobGlnaHQ6ICcmI3hlOTQ3JyxcbiAgZnVubmVsOiAnJiN4ZTk0NicsXG4gIGdpZnQ6ICcmI3hlOTQ1JyxcbiAgJ2hlYXJ0LWRpc2xpa2UnOiAnJiN4ZTk0NCcsXG4gICdoZWFydC1lbXB0eSc6ICcmI3hlOTQzJyxcbiAgJ2hlYXJ0LWhhbGYnOiAnJiN4ZTk0MicsXG4gIGhlYXJ0OiAnJiN4ZTk0MScsXG4gICdoZWxwLWNpcmNsZS1vdXRsaW5lJzogJyYjeGU5NDAnLFxuICAnaGVscC1jaXJjbGUnOiAnJiN4ZTkzZicsXG4gIGltYWdlOiAnJiN4ZTkzZScsXG4gIGltYWdlczogJyYjeGU5M2QnLFxuICBpbmZpbml0ZTogJyYjeGU5M2MnLFxuICAnaW5mb3JtYXRpb24tY2lyY2xlLW91dGxpbmUnOiAnJiN4ZTkzYicsXG4gICdpbmZvcm1hdGlvbi1jaXJjbGUnOiAnJiN4ZTkzYScsXG4gIGtleTogJyYjeGU5MzknLFxuICBsaW5rOiAnJiN4ZTkzOCcsXG4gIGxpc3Q6ICcmI3hlOTM3JyxcbiAgbWFpbDogJyYjeGU5MzYnLFxuICBtZW51OiAnJiN4ZTkzNScsXG4gIG11c2ljYWw6ICcmI3hlOTM0JyxcbiAgJ25vdGlmaWNhdGlvbi1vZmYnOiAnJiN4ZTkzMycsXG4gICdub3RpZmljYXRpb24tbyc6ICcmI3hlOTMyJyxcbiAgbm90aWZpY2F0aW9uOiAnJiN4ZTkzMScsXG4gIG9wdGlvbnM6ICcmI3hlOTMwJyxcbiAgJ3BhcGVyLXBsYW5lJzogJyYjeGU5MmYnLFxuICBwYXVzZTogJyYjeGU5MmUnLFxuICBwZW9wbGU6ICcmI3hlOTJkJyxcbiAgJ3BlcnNvbi1hZGQnOiAnJiN4ZTkyYycsXG4gIHBlcnNvbjogJyYjeGU5MmInLFxuICBwaWU6ICcmI3hlOTJhJyxcbiAgcGluOiAnJiN4ZTkyOScsXG4gICdwbGF5LWNpcmNsZSc6ICcmI3hlOTI4JyxcbiAgcGxheTogJyYjeGU5MjcnLFxuICBwb3dlcjogJyYjeGU5MjYnLFxuICBwcmljZXRhZzogJyYjeGU5MjUnLFxuICBwcmljZXRhZ3M6ICcmI3hlOTI0JyxcbiAgcHJpbnQ6ICcmI3hlOTIzJyxcbiAgJ3FyLXNjYW5uZXInOiAnJiN4ZTkyMicsXG4gICdyZWZyZXNoLWNpcmNsZSc6ICcmI3hlOTIxJyxcbiAgcmVmcmVzaDogJyYjeGU5MjAnLFxuICAncmVtb3ZlLWNpcmNsZS1vdXRsaW5lJzogJyYjeGU5MWYnLFxuICAncmVtb3ZlLWNpcmNsZSc6ICcmI3hlOTFlJyxcbiAgcmV3aW5kOiAnJiN4ZTkxZCcsXG4gIHJvY2tldDogJyYjeGU5MWMnLFxuICBzYXZlOiAnJiN4ZTkxYicsXG4gIHNlYXJjaDogJyYjeGU5MWEnLFxuICBzZXR0aW5nczogJyYjeGU5MTknLFxuICAnc2hhcmUtYWx0JzogJyYjeGU5MTgnLFxuICAnc2tpcC1id2QnOiAnJiN4ZTkxNycsXG4gICdza2lwLWZ3ZCc6ICcmI3hlOTE2JyxcbiAgc25vdzogJyYjeGU5MTUnLFxuICAnc3Rhci1oYWxmJzogJyYjeGU5MTQnLFxuICAnc3Rhci1vdXRsaW5lJzogJyYjeGU5MTMnLFxuICBzdGFyOiAnJiN4ZTkxMicsXG4gIHN0YXRzOiAnJiN4ZTkxMScsXG4gIHN5bmM6ICcmI3hlOTEwJyxcbiAgJ3RodW1icy1kb3duJzogJyYjeGU5MGYnLFxuICAndGh1bWJzLXVwJzogJyYjeGU5MGUnLFxuICB0aW1lOiAnJiN4ZTkwZCcsXG4gIHRpbWVyOiAnJiN4ZTkwYycsXG4gIHRyYXNoOiAnJiN4ZTkwYicsXG4gICd0cmVuZC1kb3duJzogJyYjeGU5MGEnLFxuICAndHJlbmQtdXAnOiAnJiN4ZTkwOScsXG4gIHVuZG86ICcmI3hlOTA4JyxcbiAgdW5sb2NrOiAnJiN4ZTkwNycsXG4gICd2b2wtaGlnaCc6ICcmI3hlOTA2JyxcbiAgJ3ZvbC1sb3cnOiAnJiN4ZTkwNScsXG4gICd2b2wtbXV0ZSc6ICcmI3hlOTA0JyxcbiAgJ3ZvbC1vZmYnOiAnJiN4ZTkwMycsXG4gIHdhcm5pbmc6ICcmI3hlOTAyJyxcbiAgd2lmaTogJyYjeGU5MDEnLFxuICB3b21hbjogJyYjeGU5MDAnXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuY29uc3QgYWRDb2RlRGF0YSA9IHtcbiAgYXBwaWQ6IDExMTI1Njk4MyxcbiAgbmF0aXZlQWQ6ICd2NWg1eHNrbHAyJyxcbiAgLy/ljp/nlJ9cbiAgdGFibGVTY3JlZW46ICdhN252bDdmbTAwJyxcbiAgc3RpbXVsYXRlQWQ6ICdvMHJiZXZjZXB4JyxcbiAgLy90ZXN0eDlkdGp3ajhocCDmtYvor5XnvJbnoIEgXG4gIGxvdHRlcnlQYWdlTmF0aXZlQWQ6ICdzMnl0eHRoMm1xJ1xufTtcbi8vIGNvbnN0IHB1YmxpY0tleSA9IGBNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXFhajBZM2s1NGpDeVRxNDd0NzNTXG4vLyBjQlg5dUJzU1NjRG83L3VaK1BoSFloOWVRcUhOVzFiQmpLR1Y0dDNZOFdva2h2Nzgza3J4aElxemtQZjluSGVaXG4vLyAyeVdxb1FsUGEzcU9VYzdXZi9IcFgyK2VIR1JqRjEvUkxBUkptTWNFZ1FZQjNXR2JkUmVkdTBGalFTR2QrT2ZTXG4vLyBTL1c3SGVoMlpHbEYvYVNIajJOWWhZRTRwN3g0ampRSWkrdWVLWnZWSk5acHUwdmhRYUY0NWpwcVFEVUxQTCtNXG4vLyBra1FlUG11cGpwL1BSNFJhOEJWZzREd0p1STZLOGpMNzdZV2F4ZVFSYk1yRWlRMFpiVEtSUTRvOE43M2lJTTk3XG4vLyBFL2g4UGJEbDVGYnVObjBrOHVya1lubXY1NkFNZGtWRXlJT1V3TkVhOG9VOVFLejM3bzVaMkw3K3lxeDJ6bUxwXG4vLyBWd0lEQVFBQmA7XG4vLyDnp4HpkqVcbmNvbnN0IHByaXZhdGVLZXkgPSBcIlwiO1xuY29uc3QgY3VycmVudFNlcnZpY2UgPSBcInByb2RcIjtcbmNvbnN0IGFwcENvbmZpZyA9IHtcbiAgcHJvZDoge1xuICAgIEJBU0VIT1NUOiBcImh0dHBzOi8vYXBpLmloYWl0dW8uY25cIlxuICB9LFxuICBkZXY6IHtcbiAgICBCQVNFSE9TVDogXCJodHRwOi8vMTkyLjE2OC4zLjQ4Ojk5OTlcIlxuICB9LFxuICB1YXQ6IHtcbiAgICBCQVNFSE9TVDogXCJodHRwczovL21pbmkuY255aW5ncy5jb21cIlxuICB9LFxuICB0ZXN0OiB7XG4gICAgQkFTRUhPU1Q6IFwiaHR0cHM6Ly90ZXN0LmlwYW5kYXRhLmNvbVwiXG4gIH1cbn07XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQgPSB7XG4gIGFkQ29kZURhdGEsXG4gIC8vIHB1YmxpY0tleSxcbiAgcHJpdmF0ZUtleSxcbiAgQkFTRUhPU1Q6IGFwcENvbmZpZ1tjdXJyZW50U2VydmljZV0uQkFTRUhPU1Rcbn07IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYXBleC1uYXZiYXIgYXBleC1uYXZiYXIte3t0aGVtZX19XCIgc3R5bGU9XCJoZWlnaHQ6e3toZWlnaHR9fXB4XCI+XG4gICAgPGRpdiBjbGFzcz1cImxlZnRcIiBvbmNsaWNrPVwiY2xpY2tIYW5kbGVyTGVmdFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJ0ZXh0XCIgaWY9XCJ7eyBsZWZ0VGV4dCB9fVwiPnt7IGxlZnRUZXh0IH19PC90ZXh0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgPGJsb2NrIGlmPVwie3sgdGl0bGUgfX1cIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJ0ZXh0XCI+e3sgdGl0bGUgfX08L3RleHQ+XG4gICAgICA8L2Jsb2NrPlxuICAgICAgPGJsb2NrIGlmPVwie3sgIXRpdGxlIH19XCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgIDwvYmxvY2s+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJpZ2h0XCIgb25jbGljaz1cImNsaWNrSGFuZGxlclJpZ2h0XCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInRleHRcIiBpZj1cInt7IHJpZ2h0VGV4dCB9fVwiPnt7IHJpZ2h0VGV4dCB9fTwvdGV4dD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG5AaW1wb3J0IFwiLi4vc3R5bGVzL2Jhc2UubGVzc1wiO1xuXG4uYXBleC1uYXZiYXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxMHB4ICogQHJhdGlvO1xuICAudGV4dCB7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gIH1cbiAgLmxlZnQsXG4gIC5yaWdodCxcbiAgLnRpdGxlIHtcbiAgICAudGV4dCB7XG4gICAgICBmb250LXNpemU6IEB0ZXh0LXNpemU7XG4gICAgfVxuICB9XG4gICYtbGlnaHQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgLnRleHQge1xuICAgICAgY29sb3I6IEB0ZXh0LWNvbG9yO1xuICAgICAgZm9udC1zaXplOiBAdGV4dC1zaXplO1xuICAgIH1cbiAgfVxuICAmLWRhcmsge1xuICAgIGJhY2tncm91bmQtY29sb3I6IEB0aXRsZS1jb2xvcjtcbiAgfVxuICAmLXJveWFsIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2FybmluZy1jb2xvcjtcbiAgfVxuICAmLXBvc2l0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAc3VjY2Vzcy1jb2xvcjtcbiAgfVxuICAmLWNhbG0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IEBwcmltYXJ5LWNvbG9yO1xuICB9XG59XG48L3N0eWxlPlxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0aGVtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJsaWdodFwiIC8vICBsaWdodOOAgXBvc2l0aXZl44CBY2FsbeOAgXJveWFs44CBZGFya1xuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IFwiXCJcbiAgICB9LFxuICAgIGxlZnRUZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICByaWdodFRleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IFwiXCJcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgZGVmYXVsdDogMTAwXG4gICAgfSxcbiAgICBiZ0NvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICBmaXhlZDoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgY2xpY2tIYW5kbGVyTGVmdCgpIHtcbiAgICB0aGlzLiRlbWl0KFwidGFwXCIsIHsgdHlwZTogXCJsZWZ0XCIgfSk7XG4gIH0sXG5cbiAgY2xpY2tIYW5kbGVyUmlnaHQoKSB7XG4gICAgdGhpcy4kZW1pdChcInRhcFwiLCB7IHR5cGU6IFwicmlnaHRcIiB9KTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8dGV4dFxuICAgIGNsYXNzPVwiZm9udC1pY29uXCJcbiAgICBzdHlsZT1cImZvbnQtc2l6ZToge3tzaXplKnJhdGlvLzc1MH19cHg7Y29sb3I6IHt7Y29sb3J9fTtcIlxuICAgID57eyB1bmVzY2FwZUZvbnRJY29uQ29kZShpY29uTWFwW3R5cGVdKSB9fVxuICA8L3RleHQ+XG48L3RlbXBsYXRlPlxuPHN0eWxlIGxhbmc9XCJsZXNzXCI+XG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IGljb25mb250O1xuICBzcmM6IHVybChcIi4vaWNvbmZvbnRzLnR0ZlwiKTtcbn1cblxuLmZvbnQtaWNvbiB7XG4gIGZvbnQtZmFtaWx5OiBpY29uZm9udDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuPC9zdHlsZT5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBpY29ucyB9IGZyb20gXCIuL2ljb25zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbk1hcDogaWNvbnNcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIHR5cGU6IHtcbiAgICAgIGRlZmF1bHQ6IFwiZW1wdHlcIlxuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgZGVmYXVsdDogMTRcbiAgICB9LFxuICAgIGNvbG9yOiB7XG4gICAgICBkZWZhdWx0OiBcIlwiXG4gICAgfSxcbiAgICByYXRpbzoge1xuICAgICAgZGVmYXVsdDogNzUwXG4gICAgfVxuICB9LFxuICB1bmVzY2FwZUZvbnRJY29uQ29kZShpY29uQ29kZSA9IFwiXCIpIHtcbiAgICByZXR1cm4gdW5lc2NhcGUoaWNvbkNvZGUucmVwbGFjZSgvJiN4L2csIFwiJXVcIikucmVwbGFjZSgvOy9nLCBcIlwiKSk7XG4gIH1cbn07XG48L3NjcmlwdD5cbiIsIjxpbXBvcnQgbmFtZT1cImljb25cIiBzcmM9XCIuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXhcIj48L2ltcG9ydD5cbjwhLS0g5YGc55WZM+enkuaYvuekuuW8ueeqlyAtLT5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYmFjay10by1hZHNcIiBpZj1cInt7aGFzQWRMaXN0fX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZC1uYXRpdmVcIiBzaG93PVwieyEhYWRMaXN0LmFkSWR9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpc3AtdGl0bGVcIj5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidGlzcC10aXRsZS10eHRcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+6YCA5Ye65YmN55yL5Liq5bm/5ZGK77yfPC90ZXh0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWl0ZW1cIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDBcIiBjb2xvcj1cIiMwMDAwMDBcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgZWxzZT5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSDlpLTpg6jlm77niYcgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgdG9wLWJpZy1pbWdcIj5cbiAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC1pbWFnZVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGltYWdlIHNyYz1cInt7IGFkTGlzdC5pbWdVcmxMaXN0PyBhZExpc3QuaW1nVXJsTGlzdFswXTogZGVmYXVsdEFkLmltZyB9fVwiPjwvaW1hZ2U+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbG9hdFwiPlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJwcml2YWN5XCIgY2xhc3M9XCJhZC1pbWFnZVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJsb2dvXCIgY2xhc3M9XCJhZC1pbWFnZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8IS0tIOW6leS4i+WGheWuuSAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtY29udGVudCBob3Jpem9udGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDwhLS0g5qCH6aKYIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXMtdGl0bGVcIj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIiBjbGFzcz1cImFkLXMtdGl0bGUtYWRcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJhZC1zLXRpdGxlLXR4dFwiPnt7IGFkTGlzdC5kZXNjIHx8IGRlZmF1bHRBZC5kZXNjIH19PC90ZXh0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3QtYnRuIHZlcnRpY2FsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbGljay1pdGVtXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZlwiPnt7IGFkTGlzdC5jbGlja0J0blR4dCB8fCBkZWZhdWx0QWQuY2xpY2tCdG5UeHQgfX08L3RleHQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8dGV4dCBzdHlsZT1cIm1hcmdpbi10b3A6IDEwcHg7IGZvbnQtc2l6ZTogMjJweFwiIEBjbGljaz1cImJhY2tIb21lXCI+56uL5Y2z6YCA5Ye6PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHByb21wdCBmcm9tICdAc3lzdGVtLnByb21wdCdcbiAgY29uc3QgeyBhZENvZGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcuanMnKS5kZWZhdWx0XG4gIGxldCBuYXRpdmVBZDtcbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGEoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZExpc3Q6IHt9LFxuICAgICAgICBoYXNBZExpc3Q6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0QWQ6IHtcbiAgICAgICAgICBkZXNjOiAn5Y2O5Li65bm/5ZGKJyxcbiAgICAgICAgICB0aXRsZTogJ+WNjuS4uuiBlOebnycsXG4gICAgICAgICAgaWNvbjogJ+W5v+WRiicsXG4gICAgICAgICAgY2xpY2tCdG5UeHQ6ICfngrnlh7vlronoo4UnLFxuICAgICAgICAgIGltZzogXCJodHRwOi8vY2RuLmJhbmstem9uZS5jbi9wcm8vc3kvYWRtaW4vYWR2ZXJ0aXNpbmcvMzYzOWJkYmRlOGU4NDM5N2EyOTdhZDU0Zjg5YWM0YzMuanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAgYnRuVHh0OiAnJyxcbiAgICAgICAgYWRJZDogXCJcIixcbiAgICAgICAgYWRPYmo6IFwiXCIsXG4gICAgICAgIHNob3dDbGlrOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICBzaG93VHJhbnNwYXJlbmN5OiB7XG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBvbkluaXQoKSB7XG4gICAgICBjb25zdCBicmFuY2ggPSAkYWQuZ2V0UHJvdmlkZXIoKVxuICAgICAgdGhpcy5hZE9iaiA9IGFkQ29kZURhdGFbYnJhbmNoXVxuICAgICAgdGhpcy5hZElkID0gJ3MyeXR4dGgybXEnO1xuICAgICAgdGhpcy5wcmVsb2FkQWQoKVxuICAgIH0sXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xuICAgIH0sXG4gICAgcHJlbG9hZEFkKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvdmlkZXIgIT09IFwiaHVhd2VpXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ+aYr+WQpui/m+adpeS6huW8gOWQr+W5v+WRiicpO1xuICAgICAgICBuYXRpdmVBZCA9ICRhZC5jcmVhdGVOYXRpdmVBZCh7IGFkVW5pdElkOiB0aGlzLmFkSWQgfSk7XG4gICAgICAgIG5hdGl2ZUFkLm9uTG9hZChkYXRhID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgdGhpcy5hZExpc3QgPSBkYXRhLmFkTGlzdFswXTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFkTGlzdCwgJ+afpeeci+iOt+WPlueahOW5v+WRiuWPguaVsCcpO1xuICAgICAgICAgIHRoaXMuaGFzQWRMaXN0ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKVxuICAgICAgICB9KTtcbiAgICAgICAgbmF0aXZlQWQub25FcnJvcihlID0+IHtcbiAgICAgICAgICB0aGF0LiRlbWl0KCdlbWl0Q2xvc2UnLCB7XG4gICAgICAgICAgICBkYXRhOiAnc2hvd1ZhY2tUaXNwJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBuYXRpdmVBZC5sb2FkKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUsIGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAqIOeCueWHu1xuICovXG4gICAgcmVwb3J0TmF0aXZlQ2xpY2soKSB7XG4gICAgICAkdXRpbHMuYnVyaWVkUG9pbnRSZXBvcnQodGhpcywgJ2NsaWNrJywgdGhpcy5hZElkKVxuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xuICAgICAgICBhZElkOiB0aGlzLmFkTGlzdC5hZElkXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5bGV56S6XG4gICAgICovXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcbiAgICAgIGlmIChuYXRpdmVBZCkge1xuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLmFkTGlzdC5hZElkIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IoZXJyQ29kZSwgZXJyTXNnKSB7XG4gICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnLCB7XG4gICAgICAgIGRhdGE6ICdzaG93VmFja1Rpc3AnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYGFkIGxvYWQgZXJyb3I6IGVyckNvZGUgPSAke2VyckNvZGV9LCBlcnJNc2cgPSAke2Vyck1zZ31gXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRDbGljaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfmsqHmnInngrnlh7vlm57osIPlkJcnKTtcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpXG4gICAgICB0aGlzLiRlbWl0KCdlbWl0SGlkZVRyYW5zcGFyZW5jeScpXG5cbiAgICAgIC8v5ZCO5Y+w5Y2V5Liq5Z+L54K5IC0g5LqL5Lu277ya5bm/5ZGK54K55Ye7XG4gICAgfSxcbiAgICBjbG9zZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfmsqHmnInlhbPpl63lm57osIPlkJcnKTtcbiAgICAgIHRoaXMuaGFzQWRMaXN0ID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnLCB7XG4gICAgICAgIGRhdGE6ICdzaG93VmFja1Rpc3AnXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmFja0hvbWUoKSB7XG4gICAgICAkcm91dGVyLnJlcGxhY2Uoe1xuICAgICAgICB1cmk6IFwicGFnZXMvZGlzcGxheURlc2t0b3BcIlxuICAgICAgfSlcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cbiAgLmJhY2stdG8tYWRzIHtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogNzUwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIC5hZC1uYXRpdmUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDc1MHB4O1xuICAgICAgbWFyZ2luLXRvcDogODBweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgICB3aWR0aDogNjkwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzNXB4O1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDBweCk7XG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogNzUwcHg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgLnRpc3AtdGl0bGUge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTUwcHg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAudGlzcC10aXRsZS10eHQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAuY2xvc2UtaXRlbSB7XG4gICAgICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyAqL1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB0b3A6IDIwcHg7XG4gICAgICAgICAgICByaWdodDogNTBweDtcbiAgICAgICAgICAgIC8qIGJvcmRlci1yYWRpdXM6IDUwJTsgKi9cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAudG9wLWJpZy1pbWcge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgaGVpZ2h0OiAzMDBweDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XG4gICAgICAgICAgcGFkZGluZzogMCAyNXB4O1xuICAgICAgICAgIC5hZC1pbWFnZSB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBpbWFnZSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgICAgICAgIG9iamVjdC1maXQ6IGZpbGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmZsb2F0IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIOWGheWuueWMuuWfnyAqL1xuICAgICAgICAuaG9yaXpvbnRhbC1jb250ZW50IHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgLmFkLXRpdGxlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICAuYWQtdGl0bGUtdHh0IHtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYWQtcy10aXRsZSB7XG4gICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICAuYWQtcy10aXRsZS1hZCB7XG4gICAgICAgICAgICAgIC5hZC1zLXRpdGxlLXR4dCB7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgIGxpbmVzOiAyO1xuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC5zdGFyLWxpc3Qge1xuICAgICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5mb290LWJ0biB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgLmNsaWNrLWl0ZW0ge1xuICAgICAgICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgICAgICAgIGhlaWdodDogOTBweDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNjBweDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAzNHB4O1xuICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjEwMzk7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsZURyYXc7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMDtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxMjAwbXM7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xuICAgICAgICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBAa2V5ZnJhbWVzIHNjYWxlRHJhdyB7XG4gICAgICAgICAgICAgIDAlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDI1JSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA3NSUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAudmVydGljYWwtY29udGVudCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgIC5hZC1jbG9zZSB7XG4gICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG48L3N0eWxlPlxuIiwiPGltcG9ydCBuYW1lPVwiaWNvblwiIHNyYz1cIi4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eFwiPjwvaW1wb3J0PlxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJib3R0b20tbmF0aXZlXCIgaWY9XCJ7e2hhc0FkTGlzdH19XCI+XG4gICAgICA8ZGl2IGFkSWQ9XCJ7e2FkTGlzdC5hZElkfX1cIiBjbGFzcz1cImFkLW5hdGl2ZVwiIHNob3c9XCJ7eyEhYWRMaXN0LmFkSWR9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtaW1nXCI+XG4gICAgICAgICAgICA8IS0tIOWbvueJhyAtLT5cbiAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC1pbWdcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxpbWFnZSBzcmM9XCJ7e2FkTGlzdC5pbWdVcmxMaXN0PyBhZExpc3QuaW1nVXJsTGlzdFswXTogZGVmYXVsdEFkLmltZyB9fVwiPjwvaW1hZ2U+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIiB0eXBlPVwiY2xpY2tcIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDBcIiBjb2xvcj1cIiNGRkZGRkZcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCIgZWxzZT5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjRkZGRkZGXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8IS0tIOS/oeaBryAtLT5cbiAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiY2VudGVyLWluZm9cIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlja1wiIGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwidHh0IHRpdGxlXCI+e3sgYWRMaXN0ID8gYWRMaXN0LnRpdGxlIDogZGVmYXVsdEFkLnRpdGxlIH19PC90ZXh0PlxuICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJsb2dvXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0eHRcIj57eyBhZExpc3QgPyBhZExpc3QuZGVzYyA6IGRlZmF1bHRBZC5kZXNjIH19PC90ZXh0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpY2staXRlbVwiPlxuICAgICAgICAgICAgPGRpdiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbGljay10eHRcIj5cbiAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJcIiBzdHlsZT1cImNvbG9yOiAjZmZmZmZmXCI+e3sgYWRMaXN0LmNsaWNrQnRuVHh0IHx8IGRlZmF1bHRBZC5jbGlja0J0blR4dCB9fTwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbG9hdFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwicHJpdmFjeVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGV4dCBjbGFzcz1cImZsb2F0LXR4dFwiIGlmPVwie3thZExpc3QuaGFzQXBwTWlpdEluZm99fVwiPnt7IGFkTGlzdC5hcHBJbmZvLmFwcE5hbWUgKyBhZExpc3QuYXBwSW5mby5hcHBTaXplICsgYWRMaXN0LmFwcEluZm8uYXBwVmVyc2lvbiArIGFkTGlzdC5hcHBJbmZvLmRldmVsb3BlciB9fTwvdGV4dD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJ0b3AtY2xvc2VcIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjUwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvcC1jbG9zZVwiIGVsc2U+XG4gICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNTBcIiBjb2xvcj1cIiMwMDAwMDBcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ljb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgY29uc3QgeyBhZENvZGVEYXRhIH0gPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcuanMnKS5kZWZhdWx0O1xuICBsZXQgbmF0aXZlQWQ7XG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhOiB7XG4gICAgICBoYXNBZExpc3Q6IHRydWUsXG4gICAgICBkZWZhdWx0QWQ6IHtcbiAgICAgICAgZGVzYzogJ+WNjuS4uuW5v+WRiicsXG4gICAgICAgIHRpdGxlOiAn5Y2O5Li66IGU55ufJyxcbiAgICAgICAgaWNvbjogJ+W5v+WRiicsXG4gICAgICAgIGNsaWNrQnRuVHh0OiAn54K55Ye75a6J6KOFJyxcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9jZG4uYmFuay16b25lLmNuL3Byby9zeS9hZG1pbi9hZHZlcnRpc2luZy8zNjM5YmRiZGU4ZTg0Mzk3YTI5N2FkNTRmODlhYzRjMy5qcGdcIlxuICAgICAgfSxcbiAgICAgIGJ0blR4dDogJycsXG4gICAgICBhZFVuaXRJZDogXCJcIixcbiAgICAgIGFkTGlzdDogXCJcIlxuICAgIH0sXG4gICAgcHJvcHM6IHtcbiAgICAgIHNob3dUcmFuc3BhcmVuY3k6IHtcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uSW5pdCgpIHtcbiAgICAgIGNvbnN0IGJyYW5jaCA9ICRhZC5nZXRQcm92aWRlcigpXG4gICAgICB0aGlzLmFkT2JqID0gYWRDb2RlRGF0YVticmFuY2hdXG4gICAgICB0aGlzLmFkSWQgPSAndjVoNXhza2xwMic7XG4gICAgICB0aGlzLnByZWxvYWRBZCgpXG4gICAgfSxcbiAgICBvblJlYWR5KCkge1xuXG4gICAgfSxcbiAgICBnZXRBZFByb3ZpZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XG4gICAgfSxcbiAgICBhc3luYyBwcmVsb2FkQWQoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcInRoZSBkZXZpY2UgIGRvZXMgbm90IHN1cHBvcnQgYWQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygn5piv5ZCm6L+b5p2l5LqG5byA5ZCv5bm/5ZGKYmFubmVyJyk7XG4gICAgICBuYXRpdmVBZCA9ICRhZC5jcmVhdGVOYXRpdmVBZCh7IGFkVW5pdElkOiB0aGlzLmFkSWQgfSk7XG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyhcImFkIGRhdGEgbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5hZExpc3QgPSBkYXRhLmFkTGlzdFswXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hZExpc3QsICfmn6XnnIvojrflj5bnmoTlub/lkYrlj4LmlbBiYW5uZXInKTtcbiAgICAgICAgdGhpcy5oYXNBZExpc3QgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKVxuICAgICAgfSk7XG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xuXG4gICAgICB9KTtcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcbiAgICB9LFxuICAgIC8qKlxuKiDngrnlh7tcbiovXG4gICAgcmVwb3J0TmF0aXZlQ2xpY2soKSB7XG4gICAgICAkdXRpbHMuYnVyaWVkUG9pbnRSZXBvcnQodGhpcywgJ2NsaWNrJywgdGhpcy5hZElkKVxuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xuICAgICAgICBhZElkOiB0aGlzLmFkTGlzdC5hZElkXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5bGV56S6XG4gICAgICovXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcbiAgICAgIGlmIChuYXRpdmVBZCkge1xuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLmFkTGlzdC5hZElkIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IoZXJyQ29kZSwgZXJyTXNnKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ5oql6ZSZ5Zue6LCD5ZCXJyk7XG4gICAgICB0aGlzLiRlbWl0KCdlcnJvcicsIHsgZXJyQ29kZSwgZXJyTXNnIH0pO1xuICAgIH0sXG4gICAgYWRDbGljaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfmsqHmnInngrnlh7vlm57osIPlkJcnKTtcbiAgICAgIGNvbnNvbGUubG9nKCfmgI7kuYjop6blj5HnmoTmmK/ov5nph4znmoQnKTtcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpXG4gICAgICB0aGlzLiRlbWl0KCdlbWl0SGlkZVRyYW5zcGFyZW5jeScpXG5cbiAgICAgIC8v5ZCO5Y+w5Y2V5Liq5Z+L54K5IC0g5LqL5Lu277ya5bm/5ZGK54K55Ye7XG4gICAgfSxcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuaGFzQWRMaXN0ID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnLCB7XG4gICAgICAgIGRhdGE6ICdiYW5uZXInXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29udmVydEFwcFNpemUoYXBwU2l6ZUJ5dGVzKSB7XG4gICAgICAvLyDpppblhYjlsIblrZfoioLovazmjaLkuLpLQiAgXG4gICAgICBsZXQga2IgPSBhcHBTaXplQnl0ZXMgLyAxMDI0O1xuXG4gICAgICAvLyDmo4Dmn6XmmK/lkKbotoXov4cxTULvvIjljbMxMDI0S0LvvIkgIFxuICAgICAgaWYgKGtiID49IDEwMjQpIHtcbiAgICAgICAgLy8g6L2s5o2i5Li6TULlubbkv53nlZnkuKTkvY3lsI/mlbAgIFxuICAgICAgICBsZXQgbWIgPSBrYiAvIDEwMjQ7XG4gICAgICAgIHJldHVybiBtYi50b0ZpeGVkKDIpICsgJ01CJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOS/neeVmeS4pOS9jeWwj+aVsOW5tui/lOWbnktCICBcbiAgICAgICAgcmV0dXJuIGtiLnRvRml4ZWQoMikgKyAnS0InO1xuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuICAuYm90dG9tLW5hdGl2ZSB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBoZWlnaHQ6IDEyMHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTVweCAxMHB4O1xuXG4gICAgLmFkLW5hdGl2ZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG5cbiAgICAuY29udGFpbmVyIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICAubGVmdC1pbWcge1xuICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgaGVpZ2h0OiA5MHB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgLmFkLWltZyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAgICAgaW1hZ2Uge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBvYmplY3QtZml0OiBmaWxsO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLmljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuZmxvYXQge1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB3aWR0aDogODAlO1xuICAgICAgLmZsb2F0LXR4dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICAgICAgY29sb3I6ICNiM2IzYjU7XG4gICAgICAgIGxpbmVzOiAxO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgIH1cbiAgICB9XG4gICAgLmNlbnRlci1pbmZvIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgdG9wOiAtMTBweDtcbiAgICAgIC5pbmZvLWl0ZW0ge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgLnR4dCB7XG4gICAgICAgICAgbGluZXM6IDE7XG4gICAgICAgICAgZm9udC1zaXplOiAzNHB4O1xuICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgfVxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIH1cbiAgICAgICAgLnRhZyB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA2KTtcbiAgICAgICAgICBjb2xvcjogIzk5OTk5OTtcbiAgICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICAgIHdpZHRoOiAxMjBweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmNsaWNrLWl0ZW0ge1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICAudGl0bGUge1xuICAgICAgICBjb2xvcjogIzk5OTk5OTtcbiAgICAgIH1cbiAgICAgIC5jbGljay10eHQge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgICAgICBmb250LXNpemU6IDM0cHg7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwZjM5O1xuICAgICAgfVxuICAgICAgLmFkLWNsb3NlIHtcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiAuZmxvYXQtaW5mbyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTAwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICB9ICovXG4gICAgLyogLmNsb3NlLWl0ZW0ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICB9ICovXG5cbiAgICAudG9wLWNsb3NlIHtcbiAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDUwcHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNSwgMjA1LCAyMDcsIDAuNSk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuIiwiPGltcG9ydCBuYW1lPVwiaWNvblwiIHNyYz1cIi4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eFwiPjwvaW1wb3J0PlxuPCEtLSDlgZznlZkz56eS5pi+56S65by556qXIC0tPlxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyZW1pbmRlci1hZHNcIiBpZj1cInt7aGFzQWRMaXN0fX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZC1uYXRpdmVcIiBzaG93PVwieyEhYWRMaXN0LmFkSWR9fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPCEtLSDlpLTpg6jlm77niYcgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgdG9wLWJpZy1pbWdcIj5cbiAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC1pbWFnZVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGltYWdlIHNyYz1cInt7YWRMaXN0LmltZ1VybExpc3Q/IGFkTGlzdC5pbWdVcmxMaXN0WzBdOiBkZWZhdWx0QWQuaW1nIH19XCI+PC9pbWFnZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWl0ZW1cIiB0eXBlPVwiY2xpY2tcIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDBcIiBjb2xvcj1cIiMwMDAwMDBcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgZWxzZT5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSDlupXkuIvlhoXlrrkgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgaG9yaXpvbnRhbC1jb250ZW50XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXRpdGxlXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiB0eXBlPVwiY2xpY2tcIj5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYWQtdGl0bGUtdHh0XCI+e3sgYWRMaXN0LnRpdGxlIHx8IGRlZmF1bHRBZC50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImxvZ29cIiBjbGFzcz1cIlwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0g5qCH6aKYIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXMtdGl0bGVcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgIDxkaXYgdHlwZT1cImNsaWNrXCIgY2xhc3M9XCJhZC1zLXRpdGxlLWFkXCI+XG4gICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJhZC1zLXRpdGxlLXR4dFwiPnt7IGFkTGlzdC5kZXNjIHx8IGRlZmF1bHRBZC5kZXNjIH19PC90ZXh0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIOaYn+aYnyAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IHN0YXItbGlzdFwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGljb24gdHlwZT1cInN0YXJcIiBzaXplPVwiNThcIiBjb2xvcj1cIiNGRkNFMkRcIiBmb3I9XCJ7ezV9fVwiPjwvaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdC1idG4gdmVydGljYWwtY29udGVudFwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgPGRpdiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbGljay1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJcIiBzdHlsZT1cImNvbG9yOiAjZmZmZmZmXCI+e3sgYWRMaXN0LmNsaWNrQnRuVHh0IHx8IGRlZmF1bHRBZC5jbGlja0J0blR4dCB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgcHJvbXB0IGZyb20gJ0BzeXN0ZW0ucHJvbXB0J1xuICBjb25zdCB7IGFkQ29kZURhdGEgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy5qcycpLmRlZmF1bHRcbiAgbGV0IG5hdGl2ZUFkO1xuICBleHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkTGlzdDoge30sXG4gICAgICAgIGhhc0FkTGlzdDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRBZDoge1xuICAgICAgICAgIGRlc2M6ICfljY7kuLrlub/lkYonLFxuICAgICAgICAgIHRpdGxlOiAn5Y2O5Li66IGU55ufJyxcbiAgICAgICAgICBpY29uOiAn5bm/5ZGKJyxcbiAgICAgICAgICBjbGlja0J0blR4dDogJ+eCueWHu+WuieijhScsXG4gICAgICAgICAgaW1nOiBcImh0dHA6Ly9jZG4uYmFuay16b25lLmNuL3Byby9zeS9hZG1pbi9hZHZlcnRpc2luZy8zNjM5YmRiZGU4ZTg0Mzk3YTI5N2FkNTRmODlhYzRjMy5qcGdcIlxuICAgICAgICB9LFxuICAgICAgICBidG5UeHQ6ICcnLFxuICAgICAgICBhZElkOiBcIlwiLFxuICAgICAgICBhZE9iajogXCJcIixcbiAgICAgICAgc2hvd0NsaWs6IGZhbHNlLFxuICAgICAgfVxuICAgIH0sXG4gICAgcHJvcHM6IHtcbiAgICAgIHNob3dUcmFuc3BhcmVuY3k6IHtcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uSW5pdCgpIHtcbiAgICAgIGNvbnN0IGJyYW5jaCA9ICRhZC5nZXRQcm92aWRlcigpXG4gICAgICB0aGlzLmFkT2JqID0gYWRDb2RlRGF0YVticmFuY2hdXG4gICAgICB0aGlzLmFkSWQgPSAnczJ5dHh0aDJtcSc7XG4gICAgICB0aGlzLnByZWxvYWRBZCgpXG4gICAgfSxcbiAgICBnZXRBZFByb3ZpZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XG4gICAgfSxcbiAgICBhc3luYyBwcmVsb2FkQWQoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcInRoZSBkZXZpY2UgIGRvZXMgbm90IHN1cHBvcnQgYWQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygn5piv5ZCm6L+b5p2l5LqG5byA5ZCv5bm/5ZGKJyk7XG4gICAgICBuYXRpdmVBZCA9ICRhZC5jcmVhdGVOYXRpdmVBZCh7IGFkVW5pdElkOiB0aGlzLmFkSWQgfSk7XG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyhcImFkIGRhdGEgbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5hZExpc3QgPSBkYXRhLmFkTGlzdFswXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hZExpc3QsICfmn6XnnIvojrflj5bnmoTlub/lkYrlj4LmlbAnKTtcbiAgICAgICAgdGhpcy5oYXNBZExpc3QgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKVxuICAgICAgfSk7XG4gICAgICBuYXRpdmVBZC5vbkVycm9yKGUgPT4ge1xuXG4gICAgICB9KTtcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcbiAgICB9LFxuICAgIC8qKlxuKiDngrnlh7tcbiovXG4gICAgcmVwb3J0TmF0aXZlQ2xpY2soKSB7XG4gICAgICAkdXRpbHMuYnVyaWVkUG9pbnRSZXBvcnQodGhpcywgJ2NsaWNrJywgdGhpcy5hZElkKVxuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xuICAgICAgICBhZElkOiB0aGlzLmFkTGlzdC5hZElkXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5bGV56S6XG4gICAgICovXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcbiAgICAgIGlmIChuYXRpdmVBZCkge1xuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLmFkTGlzdC5hZElkIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3IoZXJyQ29kZSwgZXJyTXNnKSB7XG4gICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnLCB7XG4gICAgICAgIGRhdGE6ICdzaG93UmVtaW5kZXInXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coJ+ayoeacieaKpemUmeWbnuiwg+WQlycpO1xuICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgcHJvbXB0LnNob3dUb2FzdCh7XG4gICAgICAgICAgbWVzc2FnZTogYGFkIGxvYWQgZXJyb3I6IGVyckNvZGUgPSAke2VyckNvZGV9LCBlcnJNc2cgPSAke2Vyck1zZ31gXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRDbGljaygpIHtcbiAgICAgIGNvbnNvbGUubG9nKCfmsqHmnInngrnlh7vlm57osIPlkJcnKTtcbiAgICAgICR1dGlscy5jb252ZXJzaW9uVXBsb2FkKHRoaXMpO1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdEhpZGVUcmFuc3BhcmVuY3knKVxuXG5cbiAgICAgIC8v5ZCO5Y+w5Y2V5Liq5Z+L54K5IC0g5LqL5Lu277ya5bm/5ZGK54K55Ye7XG4gICAgIFxuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ5YWz6Zet5Zue6LCD5ZCXJyk7XG4gICAgICB0aGlzLmhhc0FkTGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJywge1xuICAgICAgICBkYXRhOiAnc2hvd1JlbWluZGVyJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cbiAgLnJlbWluZGVyLWFkcyB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgd2lkdGg6IDc1MHB4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAuYWQtbmF0aXZlIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA4MDBweDtcbiAgICAgIG1hcmdpbi10b3A6IDgwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgd2lkdGg6IDY5MHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMzVweDtcblxuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDc1MHB4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAudG9wLWJpZy1pbWcge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgaGVpZ2h0OiA0MDBweDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XG4gICAgICAgICAgLmFkLWltYWdlIHtcbiAgICAgICAgICAgIGhlaWdodDogNDAwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGltYWdlIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICAgICAgICAgICAgb2JqZWN0LWZpdDogZmlsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuY2xvc2UtaXRlbSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG4gICAgICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIHRvcDogMzBweDtcbiAgICAgICAgICAgIHJpZ2h0OiA0MHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIOWGheWuueWMuuWfnyAqL1xuICAgICAgICAuaG9yaXpvbnRhbC1jb250ZW50IHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgLmFkLXRpdGxlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICAuYWQtdGl0bGUtdHh0IHtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuYWQtcy10aXRsZSB7XG4gICAgICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgICAgIC5hZC1zLXRpdGxlLWFkIHtcbiAgICAgICAgICAgICAgLmFkLXMtdGl0bGUtdHh0IHtcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgbGluZXM6IDE7XG4gICAgICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuc3Rhci1saXN0IHtcbiAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAuZm9vdC1idG4ge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgICAgICAgLmNsaWNrLWl0ZW0ge1xuICAgICAgICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgICAgICAgIGhlaWdodDogMTIwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDYwcHg7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxMDM5O1xuICAgICAgICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGVEcmF3O1xuICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDA7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTIwMG1zO1xuICAgICAgICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQGtleWZyYW1lcyBzY2FsZURyYXcge1xuICAgICAgICAgICAgICAwJSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAyNSUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgNzUlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnZlcnRpY2FsLWNvbnRlbnQge1xuICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICAuYWQtY2xvc2Uge1xuICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiIsIjxpbXBvcnQgbmFtZT1cIm15LW5hdmJhclwiIHNyYz1cImFwZXgtdWkvY29tcG9uZW50cy9uYXZiYXIvaW5kZXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cImJhY2stdG8tYWRzXCIgc3JjPVwiLi4vYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9iYWNrLXRvLWFkcy51eFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwiYm90dG9tLW5hdGl2ZVwiIHNyYz1cIi4uL2FkdmVydGlzaW5nQ2FtcGFpZ25zL2NvbXBvbmVudHMvYm90dG9tLW5hdGl2ZS51eFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwicmVtaW5kZXItYWRzXCIgc3JjPVwiLi4vYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9yZW1pbmRlci1hZHMudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cImljb25cIiBzcmM9XCIuLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXhcIj48L2ltcG9ydD5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImFkLXBhZ2VcIj5cbiAgICA8bXktbmF2YmFyPjwvbXktbmF2YmFyPlxuICAgIDxkaXYgY2xhc3M9XCJyZWFkLWJveFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8c3dpcGVyIGNsYXNzPVwic3dpcGVyXCIgaW5kaWNhdG9yPVwie3tmYWxzZX19XCIgQGNoYW5nZT1cImNoYW5nZVN3aXBlclwiIGlkPVwic3dpcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlci1pdGVtXCIgZm9yPVwie3tyZWFkT2JqLmxpc3R9fVwiIEBjbGljaz1cImNsaWNrU3dpcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udG5ldFwiIGlmPVwie3shc2hvd0FkICYmIGxhbmdJbmRleCA9PT0kaWR4fX1cIj5cbiAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJmb250LXRpdGxlXCI+e3tyZWFkT2JqLnRpdGxlfX08L3RleHQ+XG4gICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiZm9udFwiPnt7JGl0ZW19fTwvdGV4dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXBhZ2VcIiBzaG93PVwie3tzaG93QWQgJiYgbGFuZ0luZGV4ID09PSRpZHh9fVwiPlxuICAgICAgICAgICAgICA8IS0tIOW5v+WRiuagt+W8j+aUueWPmCAtLT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlYW0tY29udGFpbmVyXCIgaWY9XCJ7eyBkaXNwbGF5QWRUeXBlID49NX19XCI+XG4gICAgICAgICAgICAgICAgPCEtLSDlpLTpg6jlm77niYcgLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgdG9wLWJpZy1pbWdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZC1pbWFnZVwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltYWdlIHNyYz1cInt7YWRMaXN0LmltZ1VybExpc3Q/IGFkTGlzdC5pbWdVcmxMaXN0WzBdOiBkZWZhdWx0QWQuaW1nIH19XCI+PC9pbWFnZT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWl0ZW1cIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aWNvbiB0eXBlPVwiY2xvc2VcIiBzaXplPVwiNDBcIiBjb2xvcj1cIiMwMDAwMDBcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ljb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1pdGVtXCIgZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPGljb24gdHlwZT1cImNsb3NlXCIgc2l6ZT1cIjQwXCIgY29sb3I9XCIjMDAwMDAwXCIgb25jbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLSDlupXkuIvlhoXlrrkgLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNvbnRlbnQgaG9yaXpvbnRhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWQtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiYWQtdGl0bGUtdHh0XCI+e3sgYWRMaXN0LnRpdGxlIHx8IGRlZmF1bHRBZC50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdHlwZT1cImxvZ29cIiBjbGFzcz1cIlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDwhLS0g5qCH6aKYIC0tPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXMtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXMtdGl0bGUtYWRcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJhZC1zLXRpdGxlLXR4dFwiPnt7IGFkTGlzdC5kZXNjIHx8IGRlZmF1bHRBZC5kZXNjIH19PC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8IS0tIOaYn+aYnyAtLT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IHN0YXItbGlzdFwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGljb24gdHlwZT1cInN0YXJcIiBzaXplPVwiNThcIiBjb2xvcj1cIiNGRkNFMkRcIiBmb3I9XCJ7ezV9fVwiPjwvaWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdC1idG4gdmVydGljYWwtY29udGVudFwiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbGljay1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJcIiBzdHlsZT1cImNvbG9yOiAjZmZmZmZmXCI+e3sgYWRMaXN0LmNsaWNrQnRuVHh0IHx8IGRlZmF1bHRBZC5jbGlja0J0blR4dCB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvbWUtY29udGFpbmVyXCIgZWxzZT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdyZWVtZW50XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdyZWVtZW50LWl0ZW0gYWdyZWVtZW50LWl0ZW0taW5mb1wiIEBjbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJ0eHRcIj57eyBhZExpc3QudGl0bGUgKyBhZExpc3QuYXBwQ29tcGFueX19PC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8IS0tIDx0ZXh0IGNsYXNzPVwidHh0XCIgPnt7IGFkTGlzdC5hcHBJbmZvLmRldmVsb3BlciB9fTwvdGV4dD4gLS0+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZ3JlZW1lbnQtaXRlbVwiIHR5cGU9XCJwcml2YWN5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlkZS1jbG9zZVwiIGlmPVwie3tzaG93VHJhbnNwYXJlbmN5fX1cIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI1MFwiIGNvbG9yPVwiI0ZGRkZGRlwiIEBjbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGlkZS1jbG9zZVwiIGVsc2U+XG4gICAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI1MFwiIGNvbG9yPVwiI0ZGRkZGRlwiIEBjbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkLXRpdGxlXCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJhZC10aXRsZS10eHRcIj57eyBhZExpc3QuZGVzYyB8fCBkZWZhdWx0QWQuZGVzYyB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8IS0tIOWbvueJhyAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtY29udGVudCBiaWctaW1nXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWQtaW1hZ2VcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWFnZSBzcmM9XCJ7e2FkTGlzdC5pbWdVcmxMaXN0PyBhZExpc3QuaW1nVXJsTGlzdFswXTogZGVmYXVsdEFkLmltZyB9fVwiPjwvaW1hZ2U+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1jb250ZW50IGxvZ29cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWl0ZW1cIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI0NVwiIGNvbG9yPVwiI0ZGRkZGRlwiIEBjbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWl0ZW1cIiBlbHNlPlxuICAgICAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJjbG9zZVwiIHNpemU9XCI0NVwiIGNvbG9yPVwiI0ZGRkZGRlwiIEBjbGljaz1cImNsb3NlXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB0eXBlPVwibG9nb1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiIGlmPVwie3thZExpc3QuaWNvbn19XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHR5cGU9XCJjbGlrY1wiIGNsYXNzPVwiaWNvbi1pbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1hZ2Ugc3JjPVwie3thZExpc3QuaWNvbn19XCI+PC9pbWFnZT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJpY29uLXR4dFwiPnt7IGFkTGlzdC50aXRsZSB9fTwvdGV4dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIiBAY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpY2staXRlbVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJcIiBzdHlsZT1cImNvbG9yOiAjZmZmZmZmXCI+e3sgYWRMaXN0LmNsaWNrQnRuVHh0IHx8IGRlZmF1bHRBZC5jbGlja0J0blR4dH19PC90ZXh0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpcGUtbGVmdC1idG5cIiBpZj1cInt7c2hvd1RyYW5zcGFyZW5jeX19XCIgQGNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6IDIwcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGljb24gdHlwZT1cImFycm93LWJhY2tcIiBzaXplPVwiNDVcIiBjb2xvcj1cIiNGRkZGRkZcIj48L2ljb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJhcnJvdy1iYWNrXCIgc2l6ZT1cIjQ1XCIgY29sb3I9XCIjRkZGRkZGXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgPHRleHQ+5bem5ruR57un57ut6ZiF6K+7PC90ZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlLWxlZnQtYnRuXCIgQGNsaWNrPVwiY2xvc2VcIiBpZj1cInt7IXNob3dUcmFuc3BhcmVuY3l9fVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6IDIwcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGljb24gdHlwZT1cImFycm93LWJhY2tcIiBzaXplPVwiNDVcIiBjb2xvcj1cIiNGRkZGRkZcIj48L2ljb24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpY29uIHR5cGU9XCJhcnJvdy1iYWNrXCIgc2l6ZT1cIjQ1XCIgY29sb3I9XCIjRkZGRkZGXCI+PC9pY29uPlxuICAgICAgICAgICAgICAgICAgPHRleHQ+5bem5ruR57un57ut6ZiF6K+7PC90ZXh0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3N3aXBlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSDlupXpg6jku79iYW5uZeahhiAtLT5cbiAgICA8Ym90dG9tLW5hdGl2ZSBhZC11bml0SWQ9XCJ7e2FkSWR9fVwiIGFkLWxpc3Q9XCJ7e2FkTGlzdH19XCIgaWY9XCJ7e3Nob3dCYW5uZXJ9fVwiIHNob3ctdHJhbnNwYXJlbmN5PVwie3sgc2hvd1RyYW5zcGFyZW5jeX19XCIgb25lbWl0LWhpZGUtdHJhbnNwYXJlbmN5PVwiaGlkZVRyYW5zcGFyZW5jeVwiIG9uZW1pdC1jbG9zZT1cImhlaWRlUmVtaW5kZXJcIj48L2JvdHRvbS1uYXRpdmU+XG5cbiAgICA8IS0t5bu26L+f5o+Q56S6IC0tPlxuICAgIDxyZW1pbmRlci1hZHMgaWY9XCJ7e3Nob3dSZW1pbmRlcn19XCIgc2hvdy10cmFuc3BhcmVuY3k9XCJ7eyBzaG93VHJhbnNwYXJlbmN5fX1cIiBvbmVtaXQtaGlkZS10cmFuc3BhcmVuY3k9XCJoaWRlVHJhbnNwYXJlbmN5XCIgb25lbWl0LWNsb3NlPVwiaGVpZGVSZW1pbmRlclwiPjwvcmVtaW5kZXItYWRzPlxuXG4gICAgPCEtLSDov5Tlm57ml7blvLnlh7rmoYYgLS0+XG4gICAgPGJhY2stdG8tYWRzIGlmPVwie3tzaG93VmFja1Rpc3B9fVwiIHNob3ctdHJhbnNwYXJlbmN5PVwie3sgc2hvd1RyYW5zcGFyZW5jeX19XCIgb25lbWl0LWhpZGUtdHJhbnNwYXJlbmN5PVwiaGlkZVRyYW5zcGFyZW5jeVwiIG9uZW1pdC1jbG9zZT1cImhlaWRlUmVtaW5kZXJcIj48L2JhY2stdG8tYWRzPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBsYW5nPVwibGVzc1wiPlxuICBAaW1wb3J0IFwiLi9pbmRleC5sZXNzXCI7XG4gIC8qIHBhZ2VzL25vdmVsL25vdmVsLmNzcyAqL1xuPC9zdHlsZT5cblxuPHNjcmlwdD5cbiAgY29uc3QgZGV2aWNlID0gcmVxdWlyZShcIkBzeXN0ZW0uZGV2aWNlXCIpXG4gIGxldCBuYXRpdmVBZDtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8g6aG16Z2i55qE5pWw5o2u5qih5Z6L77yMcHJpdmF0ZeauteS4i+eahOWPmOmHj+S7heWFgeiuuOW9k+WJjemhtemdouWGheS7o+eggeabtOaUueWFtuWAvOOAgidcXCdcbiAgICBwcml2YXRlOiB7XG4gICAgICB0aXRsZTogJ1dvcmxkJyxcbiAgICAgIGNoYXB0ZXJDb250ZW50OiAnJyxcbiAgICAgIHJlYWRPYmo6IHt9LFxuICAgICAgbm93VGhlQ2hhcHRlcjogMCxcbiAgICAgIGxhbmdJbmRleDogMCxcbiAgICAgIGNsaWNrTnVtOiAwLFxuICAgICAgc2hvd0FkOiBmYWxzZSxcbiAgICAgIGFkTGlzdDoge30sXG4gICAgICBoYXNBZExpc3Q6IGZhbHNlLFxuICAgICAgc2hvd1ZhY2tUaXNwOiBmYWxzZSxcbiAgICAgIHNob3dCYW5uZXI6IHRydWUsXG4gICAgICBzaG93UmVtaW5kZXI6IGZhbHNlLFxuICAgICAgZGVmYXVsdEFkOiB7XG4gICAgICAgIGRlc2M6ICfljY7kuLrlub/lkYonLFxuICAgICAgICB0aXRsZTogJ+WNjuS4uuiBlOebnycsXG4gICAgICAgIGljb246ICflub/lkYonLFxuICAgICAgICBjbGlja0J0blR4dDogJ+eCueWHu+WuieijhScsXG4gICAgICAgIGltZzogXCJodHRwOi8vY2RuLmJhbmstem9uZS5jbi9wcm8vc3kvYWRtaW4vYWR2ZXJ0aXNpbmcvMzYzOWJkYmRlOGU4NDM5N2EyOTdhZDU0Zjg5YWM0YzMuanBnXCJcbiAgICAgIH0sXG4gICAgICB0ZXh0Q29udGVudDogW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6ICfnrKzkuIDnq6DvvJrnqbflsYzkuJ3lgbbpgYfnmb3lr4znvo4nLFxuICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIFwi5Zyo57mB5Y2O55qE6YO95biC5Lit77yM5pyJ5LiA5Liq5ZCN5Y+r5p2O5rWp55qE5bm06L275Lq644CCICdcXCcg5LuW6Lqr5p2Q5pmu6YCa77yM6ZW/55u45bmz5Yeh77yM5piv5LiA5Liq5YW45Z6L55qE4oCc5bGM5Lid55S34oCd44CCJ1xcJ+avj+Wkqe+8jOS7lumDveWcqOS4gOWutuWwj+WFrOWPuOmHjOWBmuedgOaer+eHpeaXoOWRs+eahOW3peS9nO+8jOaLv+edgOW+ruiWhOeahOiWquawtO+8jOi/h+edgOW5s+a3oeaXoOWlh+eahOeUn+a0u+OAgidcXCdcIixcbiAgICAgICAgICAgIFwi54S26ICM77yM5p2O5rWp55qE5b+D5Lit5Y205pyJ5LiA5Liq5LiN5Li65Lq655+l55qE5qKm5oOz4oCU4oCU6YKj5bCx5piv5pyJ5pyd5LiA5pel6IO95aSf6YCG6KKt77yM5oiQ5Li65LiA5Liq5oiQ5Yqf55qE5Lq677yM6L+O5ai25LuW5b+D55uu5Lit55qE55m95a+M576O44CCJ1xcJ+S7luefpemBk+i/meS4quaipuaDs+mBpeS4jeWPr+WPiu+8jOS9huS7luS7juacquaUvuW8g+i/h+OAgidcXCdcIixcbiAgICAgICAgICAgIFwi5pyJ5LiA5aSp77yM5p2O5rWp5Zyo5YWs5Y+46ZmE6L+R55qE5LiA5a625ZKW5ZWh5bqX6YeM5YG26YGH5LqG5LiA5Liq576O5Li955qE5aWz5a2p44CCJ1xcJ+WlueWQjeWPq+ael+WpieWEv++8jOWutuWig+S8mOa4pe+8jOawlOi0qOmrmOmbhe+8jOaYr+adjua1qeW/g+ebruS4reeahOeZveWvjOe+juOAgidcXCfkuKTkurromb3nhLblj6rmmK/nn63mmoLnmoTkuqTosIjkuoblh6Dlj6XvvIzkvYbmnY7mtanljbTooqvmnpflqYnlhL/mt7Hmt7HlnLDlkLjlvJXkuobjgIInXFwnXCIsXG4gICAgICAgICAgICBcIuS7jumCo+S7peWQju+8jOadjua1qeW8gOWni+WKquWKm+WcsOaUueWPmOiHquW3seOAgidcXCfku5bliqrlipvlrabkuaDlkITnp43nn6Xor4blkozmioDog73vvIzmj5DljYfoh6rlt7HnmoTog73lipvjgIInXFwn5LuW5Yip55So5Lia5L2Z5pe26Ze05Y+C5Yqg5ZCE56eN56S+5Lqk5rS75Yqo77yM5omp5aSn6Ieq5bex55qE5Lq66ISJ44CCJ1xcJ+S7luS4jeaWreWcsOmUu+eCvOiHquW3seeahOi6q+S9k++8jOiuqeiHquW3seWPmOW+l+abtOWKoOWBpeW6t+WSjOaciemtheWKm+OAgidcXCdcIixcbiAgICAgICAgICAgIFwi57uP6L+H5LiA5q615pe26Ze055qE5Yqq5Yqb77yM5p2O5rWp57uI5LqO6L+O5p2l5LqG5LuW55qE6YCG6KKt5aWR5py644CCJ1xcJ1wiLFxuICAgICAgICAgICAgXCLmnInkuIDlpKnvvIzmnY7mtanlnKjlj4LliqDkuIDkuKrooYzkuJrogZrkvJrml7bvvIzmhI/lpJblnLDpgYfliLDkuobkuIDkvY3miJDlip/nmoTkvIHkuJrlrrbjgIInXFwn6L+Z5L2N5LyB5Lia5a625a+55p2O5rWp55qE5omN5Y2O5ZKM5Yqq5Yqb6KGo56S66LWe6LWP77yM5bm26YKA6K+35LuW5Yqg5YWl6Ieq5bex55qE5YWs5Y+444CCJ1xcJ+adjua1qeaKk+S9j+S6hui/meS4quacuuS8mu+8jOi+nuWOu+S6huWOn+acrOeahOW3peS9nO+8jOWKoOWFpeS6huaWsOeahOWFrOWPuOOAgidcXCdcIixcbiAgICAgICAgICAgIFwi5LiO5q2k5ZCM5pe277yM5p2O5rWp5Lmf5rKh5pyJ5b+Y6K6w6Ieq5bex5pyA5Yid55qE5qKm5oOz44CCJ1xcJ+S7luW8gOWni+WwneivleaOpei/keael+WpieWEv++8jOWSjOWlueW7uueri+S6hua3seWOmueahOWPi+iwiuOAgidcXCfku5bnlKjoh6rlt7HnmoTnnJ/or5rlkozmiY3ljY7miZPliqjkuobmnpflqYnlhL/nmoTlv4PvvIzkuKTkurrpgJDmuJDotbDliLDkuobkuIDotbfjgIInXFwnXCIsXG4gICAgICAgICAgICBcIuWcqOS4gOasoea1qua8q+eahOe6puS8muS4re+8jOadjua1qem8k+i1t+WLh+awlOWQkeael+WpieWEv+axguWpmuOAgidcXCfku5blkJHmnpflqYnlhL/mib/or7rvvIzkvJrnlKjoh6rlt7HnmoTliqrlipvlkozmiY3ljY7orqnlpbnov4fkuIrlubjnpo/nmoTnlJ/mtLvjgIInXFwn5p6X5amJ5YS/6KKr5p2O5rWp55qE55yf6K+a5ZKM5omN5Y2O5omA5oSf5Yqo77yM562U5bqU5LqG5LuW55qE5rGC5ama44CCJ1xcJ1wiLFxuICAgICAgICAgICAgXCLlsLHov5nmoLfvvIzkuIDkuKrlubPlh6HnmoTlsYzkuJ3nlLfmnY7mtanpgJrov4foh6rlt7HnmoTliqrlipvlkozlnZrmjIHlrp7njrDkuoboh6rlt7HnmoTpgIbooq3moqbmg7PjgIInXFwn5LuW5oiQ5Yqf5Zyw6L+O5ai25LqG6Ieq5bex5b+D55uu5Lit55qE55m95a+M576O5p6X5amJ5YS/77yM5Lik5Lq65YWx5ZCM5byA5ZCv5LqG5LiA5q615bm456aP576O5aW955qE5paw55Sf5rS744CCJ1xcJ1wiLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGFkSWQ6ICcnLFxuICAgICAgcHJvdmlkZXI6ICcnLFxuICAgICAgZGlzcGxheUFkVHlwZTogMCxcbiAgICAgIHRpbWVyOiBudWxsLFxuICAgICAgc2hvd1RyYW5zcGFyZW5jeTogZmFsc2VcbiAgICB9LFxuICAgIG9uSW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5pbml0UmVhZFBhZ2UoKVxuICAgICAgdGhpcy5hZElkID0gJ3Y1aDV4c2tscDInO1xuXG4gICAgfSxcbiAgICBoaWRlVHJhbnNwYXJlbmN5KCkge1xuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+S6huWFs+mXreW5v+WRiicpO1xuICAgICAgdGhpcy5zaG93VHJhbnNwYXJlbmN5ID0gZmFsc2U7XG5cbiAgICB9LFxuICAgIGFkZENsaWNrTnVtKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy4kYXBwLiRkZWYuZGF0YUFwcC50cmFuc3BhcmVudExheWVySGl0cywgJ+afpeeci+S9oOeahOasoeaVsCcpO1xuICAgICAgdGhpcy4kYXBwLiRkZWYuZGF0YUFwcC50cmFuc3BhcmVudExheWVySGl0cyA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudHJhbnNwYXJlbnRMYXllckhpdHMgKyAxXG4gICAgICB0aGlzLmdldFRyYW5zcGFyZW50TGF5ZXJMKClcbiAgICB9LFxuXG4gICAgbGF0ZW5jeVNob3dSZW1pbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICBjb25zb2xlLmxvZygn5piv5ZCm5byA5ZCv5LqG5a6a5pe25ZmoJyk7XG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1JlbWluZGVyID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ+WxleekuueahOaYr+S7gOS5iCcpO1xuICAgICAgfSwgMzAwMClcbiAgICB9LFxuICAgIG9uUmVhZHkob3B0aW9ucykge1xuICAgICAgJy8vIERvIHNvbWV0aGluZyAuJ1xuICAgICAgdGhpcy5wcmVsb2FkQWQoKVxuICAgICAgdGhpcy5nZXRUcmFuc3BhcmVudExheWVyTCgpXG4gICAgfSxcbiAgICBnZXRUcmFuc3BhcmVudExheWVyTDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coJ+aYr+WQpui/m+adpeS6humAj+aYjuWxguWIpOaWrScpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnJhbmNoID0gJGFkLmdldFByb3ZpZGVyKCk7XG4gICAgICAgIGxldCBwYXlhbSA9IHtcbiAgICAgICAgICBicmFuZDogYnJhbmNoLnRvVXBwZXJDYXNlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNmcmlzdFJlcUNvdW4pIHsgLy/lpoLmnpzkuI3mmK/liJ3mrKHov5vmnaXnmoTor7TmmI7lj6/ku6Xmt7vliqDpgInpoblcbiAgICAgICAgICBwYXlhbS5jb3VudCA9IHRoaXMuJGFwcC4kZGVmLmRhdGFBcHAudHJhbnNwYXJlbnRMYXllckhpdHNcbiAgICAgICAgICBjb25zb2xlLmxvZyhwYXlhbS5jb3VudCwgJ+afpeeci+S4iuS8oOeahOasoeaVsCcpO1xuICAgICAgICB9XG4gICAgICAgICRhcGlzLnRhc2tcbiAgICAgICAgICAuZ2V0VHJhbnNwYXJlbnRMYXllcih7IC4uLnBheWFtIH0pXG4gICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLCAn5p+l55yL6L+U5Zue55qE6YCP5piO5bGC5Y+C5pWwJyk7XG4gICAgICAgICAgICAvLyDmmK/lkKbliJ3mrKHor7fmsYJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzZnJpc3RSZXFDb3VuKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNmcmlzdFJlcUNvdW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUcmFuc3BhcmVudExheWVyTCgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNob3dUcmFuc3BhcmVuY3kgPSByZXMuZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIsICfmn6XnnIvov5Tlm57miqXplJknKVxuICAgICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUsICfojrflj5blpLHmlYgnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHByZWxvYWRBZCgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoaXMucHJvdmlkZXIgPSAkYWQuZ2V0UHJvdmlkZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKCfmgI7kuYjmsqHmnInov5vmnaXnjq/looMnKTtcbiAgICAgIGlmICh0aGlzLnByb3ZpZGVyICE9PSBcImh1YXdlaVwiKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcInRoZSBkZXZpY2UgIGRvZXMgbm90IHN1cHBvcnQgYWQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAobmF0aXZlQWQpIHtcbiAgICAgICAgbmF0aXZlQWQuZGVzdHJveSgpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygn5piv5ZCm6L+b5p2l5LqG5byA5ZCv5bm/5ZGKJyk7XG4gICAgICBuYXRpdmVBZCA9ICRhZC5jcmVhdGVOYXRpdmVBZCh7IGFkVW5pdElkOiB0aGlzLmFkSWQgfSk7XG4gICAgICBuYXRpdmVBZC5vbkxvYWQoZGF0YSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyhcImFkIGRhdGEgbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgdGhpcy5hZExpc3QgPSBkYXRhLmFkTGlzdFswXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hZExpc3QsICfmn6XnnIvojrflj5bnmoTlub/lkYrlj4LmlbAnKTtcbiAgICAgICAgdGhpcy5oYXNBZExpc3QgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKVxuXG4gICAgICB9KTtcbiAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUsICfmn6XnnIvlub/lkYrmgI7kuYjkuI3lh7rmnaUnKTtcbiAgICAgIH0pO1xuICAgICAgbmF0aXZlQWQubG9hZCgpO1xuICAgIH0sXG4gICAgcmVwb3J0TmF0aXZlQ2xpY2soKSB7XG4gICAgICAkdXRpbHMuYnVyaWVkUG9pbnRSZXBvcnQodGhpcywgJ2NsaWNrJywgdGhpcy5hZElkKVxuICAgICAgJHV0aWxzLmNvbnZlcnNpb25VcGxvYWQodGhpcylcbiAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkQ2xpY2soe1xuICAgICAgICBhZElkOiB0aGlzLmFkTGlzdC5hZElkXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5bGV56S6XG4gICAgICovXG4gICAgcmVwb3J0TmF0aXZlU2hvdygpIHtcbiAgICAgIGlmIChuYXRpdmVBZCkge1xuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLmFkTGlzdC5hZElkIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8g5YWz6ZetXG4gICAgaGVpZGVSZW1pbmRlcihlKSB7XG4gICAgICAvLyB0aGlzLnNob3dSZW1pbmRlciA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICBjb25zdCB7IGRldGFpbCA9ICcnIH0gPSBlO1xuICAgICAgdGhpcy5hZGRDbGlja051bSgpXG4gICAgICBpZiAoIWRldGFpbCkge1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+i/meaYr+S7gOS5iCcsIGRldGFpbC5kYXRhKTtcbiAgICAgICAgaWYgKGRldGFpbC5kYXRhID09PSAnc2hvd1ZhY2tUaXNwJykge1xuICAgICAgICAgIHRoaXMuc2hvd1ZhY2tUaXNwID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChkZXRhaWwuZGF0YSA9PT0gJ3Nob3dSZW1pbmRlcicpIHtcbiAgICAgICAgICB0aGlzLnNob3dSZW1pbmRlciA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0YWlsLmRhdGEgPT09ICdiYW5uZXInKSB7XG4gICAgICAgICAgdGhpcy5zaG93QmFubmVyID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICBjb25zb2xlLmxvZygn5rKh5pyJ6Kem5Y+R6L+Z5Liq5ZCXJyk7XG4gICAgICB0aGlzLmhhc0FkTGlzdCA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGRDbGlja051bSgpXG4gICAgfSxcbiAgICBvbkJhY2tQcmVzcygpIHtcbiAgICAgIHRoaXMuc2hvd1ZhY2tUaXNwID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCfop6blj5HkuobmgI7kuYjml6DmlYjkuoYnKTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICBpbml0UmVhZFBhZ2UoKSB7XG4gICAgICBjb25zb2xlLmxvZygn6YeN572u5bCP6K+06aG16Z2iJywgdGhpcy4kcGFnZS53aW5kb3dIZWlnaHQpO1xuICAgICAgdGhpcy5yZWFkT2JqID0gdGhpcy50ZXh0Q29udGVudFswXVxuICAgIH0sXG4gICAgY2hhbmdlU3dpcGVyKGUpIHtcbiAgICAgIHRoaXMubGF0ZW5jeVNob3dSZW1pbmRlcigpXG4gICAgICB0aGlzLmxhbmdJbmRleCA9IGUuaW5kZXg7XG4gICAgICBjb25zb2xlLmxvZyhlLmluZGV4LCAn5p+l55yL6L+Z5LiqaW5kZXg5OTk5OTk5OTk5OTk5OTk5Jyk7XG4gICAgICB0aGlzLmRpc3BsYXlBZFR5cGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMSlcbiAgICAgIHRoaXMuY2xpY2tOdW0gKz0gMTtcbiAgICAgIGlmICh0aGlzLmNsaWNrTnVtID09IDMpIHtcbiAgICAgICAgdGhpcy5zaG93QWQgPSB0cnVlXG4gICAgICAgIHRoaXMuY2xpY2tOdW0gPSAwO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2xpY2tOdW0gPT0gMikge1xuICAgICAgICB0aGlzLnByZWxvYWRBZCgpXG4gICAgICAgIHRoaXMuc2hvd0FkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd0FkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmIChlLmluZGV4IDw9IDMpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudFswXS50aXRsZSA9ICfnrKzkuIDnq6DvvJrnqbflsYzkuJ3lgbbpgYfnmb3lr4znvo4nO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRleHRDb250ZW50WzBdLnRpdGxlID0gJ+esrOS6jOeroO+8muWxjOS4nei/juWotueZveWvjOe+jic7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbGlja1N3aXBlcihlKSB7XG4gICAgICBjb25zb2xlLmxvZygn54K55Ye75LqG6aG16Z2iJywgZS5jbGllbnRYKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGFuZ0luZGV4KTtcbiAgICAgIHRoaXMubGFuZ0luZGV4ID1cbiAgICAgICAgdGhpcy4kZWxlbWVudCgnc3dpcGVyJykuc3dpcGVUbyh7IGluZGV4OiBlLmNsaWVudFggPj0gMzc1ID8gKHRoaXMubGFuZ0luZGV4IDwgOCA/IHRoaXMubGFuZ0luZGV4ICsgMSA6IDApIDogKHRoaXMubGFuZ0luZGV4ID09PSAwID8gOCA6IHRoaXMubGFuZ0luZGV4IC0gMSkgfSlcbiAgICB9XG4gIH1cbjwvc2NyaXB0PiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuaGlkZVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiLnNob3dcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIlxuICB9LFxuICBcIi5vcGFjaXR5LWhpZGUtdG8tc2hvd1wiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwib3BhY2l0eUhpZGVUb1Nob3dcIlxuICB9LFxuICBcIi5vcGFjaXR5LXNob3ctdG8taGlkZVwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwib3BhY2l0eVNob3dUb0hpZGVcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtbGVmdC10by1jZW50ZXJcIjoge1xuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcInRyYW5zbGF0ZUxlZnRUb0NlbnRlclwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1jZW50ZXItdG8tbGVmdFwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlQ2VudGVyVG9MZWZ0XCJcbiAgfSxcbiAgXCIudHJhbnNsYXRlLXJpZ2h0LXRvLWNlbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlUmlnaHRUb0NlbnRlclwiXG4gIH0sXG4gIFwiLnRyYW5zbGF0ZS1jZW50ZXItdG8tcmlnaHRcIjoge1xuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcInRyYW5zbGF0ZUNlbnRlclRvUmlnaHRcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtdG9wLXRvLWNlbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlVG9wVG9DZW50ZXJcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtY2VudGVyLXRvLXRvcFwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlQ2VudGVyVG9Ub3BcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtYm90dG9tLXRvLWNlbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlQm90dG9tVG9DZW50ZXJcIlxuICB9LFxuICBcIi50cmFuc2xhdGUtY2VudGVyLXRvLWJvdHRvbVwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwidHJhbnNsYXRlQ2VudGVyVG9Cb3R0b21cIlxuICB9LFxuICBcIkBLRVlGUkFNRVNcIjoge1xuICAgIFwib3BhY2l0eUhpZGVUb1Nob3dcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcIm9wYWNpdHlTaG93VG9IaWRlXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVMZWZ0VG9DZW50ZXJcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIi0xMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVDZW50ZXJUb0xlZnRcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIi0xMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVSaWdodFRvQ2VudGVyXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIxMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVDZW50ZXJUb1JpZ2h0XCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVhcXFwiOlxcXCIxMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVUb3BUb0NlbnRlclwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiLTEwMCVcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwJVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdLFxuICAgIFwidHJhbnNsYXRlQ2VudGVyVG9Ub3BcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIi0xMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVCb3R0b21Ub0NlbnRlclwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMTAwJVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF0sXG4gICAgXCJ0cmFuc2xhdGVDZW50ZXJUb0JvdHRvbVwiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMTAwJVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyXCI6IHtcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyIC50ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyIC5sZWZ0IC50ZXh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyIC5yaWdodCAudGV4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5hcGV4LW5hdmJhciAudGl0bGUgLnRleHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXItbGlnaHRcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyLWxpZ2h0IC50ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzQ5NTA2MFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMHB4XCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXItZGFya1wiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMWMyNDM4XCJcbiAgfSxcbiAgXCIuYXBleC1uYXZiYXItcm95YWxcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmOTkwMFwiXG4gIH0sXG4gIFwiLmFwZXgtbmF2YmFyLXBvc2l0aXZlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMxOWJlNmJcIlxuICB9LFxuICBcIi5hcGV4LW5hdmJhci1jYWxtXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMyZDhjZjBcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkBGT05ULUZBQ0VcIjoge1xuICAgIFwiaWNvbmZvbnRcIjoge1xuICAgICAgXCJmb250RmFtaWx5XCI6IFwiaWNvbmZvbnRcIixcbiAgICAgIFwic3JjXCI6IFtcbiAgICAgICAgXCIvY29tcG9uZW50cy9pY29uL2ljb25mb250cy50dGZcIlxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCIuZm9udC1pY29uXCI6IHtcbiAgICBcImZvbnRGYW1pbHlcIjogXCJpY29uZm9udFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuYmFjay10by1hZHNcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjc1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOClcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNjkwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjc1MHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI4MHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIzNXB4XCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCItMTAwcHhcXFwifVwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjc1MHB4XCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50aXNwLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTUwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50aXNwLXRpdGxlIC50aXNwLXRpdGxlLXR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjI4cHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI2MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudGlzcC10aXRsZSAuY2xvc2UtaXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ0b3BcIjogXCIyMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjUwcHhcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLnRvcC1iaWctaW1nXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImhlaWdodFwiOiBcIjMwMHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjUwcHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjI1cHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjVweFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudG9wLWJpZy1pbWcgLmFkLWltYWdlXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjMwMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuYWQtaW1hZ2UgaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNXB4XCIsXG4gICAgXCJvYmplY3RGaXRcIjogXCJmaWxsXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuZmxvYXRcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYmV0d2VlblwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50XCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtdGl0bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwcHhcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtdGl0bGUgLmFkLXRpdGxlLXR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI1MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC1zLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiODAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJmbGV4LXN0YXJ0XCIsXG4gICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5iYWNrLXRvLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtcy10aXRsZSAuYWQtcy10aXRsZS1hZCAuYWQtcy10aXRsZS10eHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJsaW5lc1wiOiAyLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiLFxuICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLnN0YXItbGlzdFwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5mb290LWJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJoZWlnaHRcIjogXCIyMDBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5mb290LWJ0biAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjQwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5MHB4XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2MHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjM0cHhcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmMTAzOVwiLFxuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcInNjYWxlRHJhd1wiLFxuICAgIFwiYW5pbWF0aW9uRGVsYXlcIjogXCIwbXNcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMTIwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImVhc2Utb3V0XCIsXG4gICAgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiAtMSxcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcInNjYWxlRHJhd1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMS4xXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMS4xXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDI1XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogNTBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJzY2FsZVhcXFwiOlxcXCIxLjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxLjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogNzVcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiLmJhY2stdG8tYWRzIC5hZC1uYXRpdmUgLnZlcnRpY2FsLWNvbnRlbnRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIuYmFjay10by1hZHMgLmFkLW5hdGl2ZSAudmVydGljYWwtY29udGVudCAuYWQtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuYm90dG9tLW5hdGl2ZVwiOiB7XG4gICAgXCJhbGlnblNlbGZcIjogXCJjZW50ZXJcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIxNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMTVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuYWQtbmF0aXZlXCI6IHtcbiAgICBcImFsaWduU2VsZlwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNvbnRhaW5lclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5sZWZ0LWltZ1wiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI5MHB4XCIsXG4gICAgXCJtYXJnaW5SaWdodFwiOiBcIjEwcHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5sZWZ0LWltZyAuYWQtaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmxlZnQtaW1nIC5hZC1pbWcgaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJvYmplY3RGaXRcIjogXCJmaWxsXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNXB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAubGVmdC1pbWcgLmljb25cIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjYpXCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuZmxvYXRcIjoge1xuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjgwJVwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmZsb2F0IC5mbG9hdC10eHRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyMXB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNiM2IzYjVcIixcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNlbnRlci1pbmZvXCI6IHtcbiAgICBcImZsZXhcIjogMSxcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInRvcFwiOiBcIi0xMHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuY2VudGVyLWluZm8gLmluZm8taXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jZW50ZXItaW5mbyAuaW5mby1pdGVtIC50eHRcIjoge1xuICAgIFwibGluZXNcIjogMSxcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jZW50ZXItaW5mbyAuaW5mby1pdGVtIC50aXRsZVwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI1MDBcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jZW50ZXItaW5mbyAuaW5mby1pdGVtIC50YWdcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjA2KVwiLFxuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjU2cHhcIixcbiAgICBcIndpZHRoXCI6IFwiMTIwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLW5hdGl2ZSAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJmbGV4U2hyaW5rXCI6IDAsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImZsZXgtZW5kXCIsXG4gICAgXCJhbGlnblNlbGZcIjogXCJmbGV4LWVuZFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCI4cHhcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jbGljay1pdGVtIC50aXRsZVwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIlxuICB9LFxuICBcIi5ib3R0b20tbmF0aXZlIC5jbGljay1pdGVtIC5jbGljay10eHRcIjoge1xuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMzBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzNHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJyaWdodFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmMGYzOVwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLmNsaWNrLWl0ZW0gLmFkLWNsb3NlXCI6IHtcbiAgICBcImFsaWduU2VsZlwiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmJvdHRvbS1uYXRpdmUgLnRvcC1jbG9zZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgyMDUsMjA1LDIwNywwLjUpXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIucmVtaW5kZXItYWRzXCI6IHtcbiAgICBcImFsaWduU2VsZlwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCI3NTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjgpXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmVcIjoge1xuICAgIFwid2lkdGhcIjogXCI2OTBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODAwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjgwcHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjM1cHhcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNzUwcHhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZ1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MDBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudG9wLWJpZy1pbWcgLmFkLWltYWdlXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjQwMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC50b3AtYmlnLWltZyAuYWQtaW1hZ2UgaW1hZ2VcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNXB4XCIsXG4gICAgXCJvYmplY3RGaXRcIjogXCJmaWxsXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAudG9wLWJpZy1pbWcgLmNsb3NlLWl0ZW1cIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ0b3BcIjogXCIzMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjQwcHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjUwJVwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5hZC10aXRsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDBweFwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtdGl0bGUgLmFkLXRpdGxlLXR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI1MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLnJlbWluZGVyLWFkcyAuYWQtbmF0aXZlIC5jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtcy10aXRsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjgwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmFkLXMtdGl0bGUgLmFkLXMtdGl0bGUtYWQgLmFkLXMtdGl0bGUtdHh0XCI6IHtcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwibGluZXNcIjogMSxcbiAgICBcInRleHRPdmVyZmxvd1wiOiBcImVsbGlwc2lzXCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5zdGFyLWxpc3RcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAuY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmZvb3QtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjIwMHB4XCJcbiAgfSxcbiAgXCIucmVtaW5kZXItYWRzIC5hZC1uYXRpdmUgLmNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5mb290LWJ0biAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjQwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzNHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZjEwMzlcIixcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJzY2FsZURyYXdcIixcbiAgICBcImFuaW1hdGlvbkRlbGF5XCI6IFwiMG1zXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjEyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJlYXNlLW91dFwiLFxuICAgIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogLTEsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiQEtFWUZSQU1FU1wiOiB7XG4gICAgXCJzY2FsZURyYXdcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjEuMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjEuMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAyNVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMS4xXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMS4xXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDc1XG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAudmVydGljYWwtY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5yZW1pbmRlci1hZHMgLmFkLW5hdGl2ZSAudmVydGljYWwtY29udGVudCAuYWQtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuYWQtcGFnZVwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIucmVhZC1ib3hcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjRjhGOEZBXCJcbiAgfSxcbiAgXCIucmVhZC1ib3ggLmNvbnRhaW5lclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5yZWFkLWJveCAuc3dpcGVyXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnJlYWQtYm94IC5zd2lwZXIgLnN3aXBlci1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNzUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLnJlYWQtYm94IC5zd2lwZXIgLnN3aXBlci1pdGVtIC5jb250bmV0XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNzUwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjMwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLnJlYWQtYm94IC5zd2lwZXIgLnN3aXBlci1pdGVtIC5jb250bmV0IC5mb250XCI6IHtcbiAgICBcImZvbnRXZWlnaHRcIjogXCI0MDBcIixcbiAgICBcImZvbnRTaXplXCI6IFwiOTBweFwiLFxuICAgIFwibGluZUhlaWdodFwiOiBcIjEwMHB4XCJcbiAgfSxcbiAgXCIucmVhbS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI3NTBweFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLnJlYW0tY29udGFpbmVyIC50b3AtYmlnLWltZ1wiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MDBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIucmVhbS1jb250YWluZXIgLnRvcC1iaWctaW1nIC5hZC1pbWFnZVwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI0MDBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgfSxcbiAgXCIucmVhbS1jb250YWluZXIgLnRvcC1iaWctaW1nIC5hZC1pbWFnZSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjE1cHhcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImZpbGxcIlxuICB9LFxuICBcIi5yZWFtLWNvbnRhaW5lciAudG9wLWJpZy1pbWcgLmNsb3NlLWl0ZW1cIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ0b3BcIjogXCIzMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjQwcHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjUwJVwiXG4gIH0sXG4gIFwiLnJlYW0tY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnRcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLnJlYW0tY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmFkLXRpdGxlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCJcbiAgfSxcbiAgXCIucmVhbS1jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtdGl0bGUgLmFkLXRpdGxlLXR4dFwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjMycHhcIixcbiAgICBcImZvbnRXZWlnaHRcIjogXCI1MDBcIixcbiAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwiLnJlYW0tY29udGFpbmVyIC5ob3Jpem9udGFsLWNvbnRlbnQgLmFkLXMtdGl0bGVcIjoge1xuICAgIFwid2lkdGhcIjogXCI4MCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25Db250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIzMHB4XCJcbiAgfSxcbiAgXCIucmVhbS1jb250YWluZXIgLmhvcml6b250YWwtY29udGVudCAuYWQtcy10aXRsZSAuYWQtcy10aXRsZS1hZCAuYWQtcy10aXRsZS10eHRcIjoge1xuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJsaW5lc1wiOiAxLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIlxuICB9LFxuICBcIi5yZWFtLWNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5zdGFyLWxpc3RcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIlxuICB9LFxuICBcIi5yZWFtLWNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5mb290LWJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjQwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIyMDBweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5yZWFtLWNvbnRhaW5lciAuaG9yaXpvbnRhbC1jb250ZW50IC5mb290LWJ0biAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjMwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMjBweFwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzNHB4XCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMjBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZjEwMzlcIixcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJzY2FsZURyYXdcIixcbiAgICBcImFuaW1hdGlvbkRlbGF5XCI6IFwiMG1zXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjEyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJlYXNlLW91dFwiLFxuICAgIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogLTEsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiQEtFWUZSQU1FU1wiOiB7XG4gICAgXCJzY2FsZURyYXdcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjFcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjEuMVxcXCIsXFxcInNjYWxlWVxcXCI6XFxcIjEuMVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAyNVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInNjYWxlWFxcXCI6XFxcIjFcXFwiLFxcXCJzY2FsZVlcXFwiOlxcXCIxXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwic2NhbGVYXFxcIjpcXFwiMS4xXFxcIixcXFwic2NhbGVZXFxcIjpcXFwiMS4xXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDc1XG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjBweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5hZ3JlZW1lbnRcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuYWdyZWVtZW50IC5hZ3JlZW1lbnQtaXRlbVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU1JVwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODBweFwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5hZ3JlZW1lbnQgLmFncmVlbWVudC1pdGVtIC50eHRcIjoge1xuICAgIFwibGluZXNcIjogMSxcbiAgICBcImZvbnRTaXplXCI6IFwiMjhweFwiLFxuICAgIFwidGV4dE92ZXJmbG93XCI6IFwiZWxsaXBzaXNcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuYWdyZWVtZW50IC5hZ3JlZW1lbnQtaXRlbS1pbmZvXCI6IHtcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuYWdyZWVtZW50IC5oaWRlLWNsb3NlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNjN2M2YzlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjVweFwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5hZC10aXRsZVwiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmFkLXRpdGxlIC5hZC10aXRsZS10eHRcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIzMnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAudmVydGljYWwtY29udGVudFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAudmVydGljYWwtY29udGVudCAuYWQtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmJpZy1pbWdcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiMzBweFwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5iaWctaW1nIC5hZC1pbWFnZVwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI1MDBweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJmbGV4U2hyaW5rXCI6IDBcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmJpZy1pbWcgLmFkLWltYWdlIGltYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMTVweFwiLFxuICAgIFwib2JqZWN0Rml0XCI6IFwiY29udGFpblwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5iaWctaW1nIC5sb2dvXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjBweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHB4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjcwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuYmlnLWltZyAubG9nbyAuY2xvc2UtaXRlbVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDIwNSwyMDUsMjA3LDAuNSlcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuaWNvblwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuaWNvbiAuaWNvbi1pbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuaWNvbiAuaWNvbi1pbWFnZSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjgwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICBcIm9iamVjdEZpdFwiOiBcImNvbnRhaW5cIlxuICB9LFxuICBcIi5ob21lLWNvbnRhaW5lciAuaWNvbiAuaWNvbi10eHRcIjoge1xuICAgIFwiZm9udFdlaWdodFwiOiBcIjUwMFwiLFxuICAgIFwibWFyZ2luTGVmdFwiOiBcIjEycHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMzJweFwiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5mb290ZXJcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiOTZweFwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbVwiOiB7XG4gICAgXCJmbGV4XCI6IDEsXG4gICAgXCJmbGV4U2hyaW5rXCI6IDAsXG4gICAgXCJtaW5XaWR0aFwiOiBcIjI1MHB4XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmMGYzOVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjVweFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJjb2xvclwiOiBcIiNGMEY4RkZcIixcbiAgICBcImhlaWdodFwiOiBcIjEyMHB4XCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAudGl0bGVcIjoge1xuICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAuY2xpY2stdHh0XCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMzRweFwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjIwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjIwcHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiY29sb3JcIjogXCIjRjBGOEZGXCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLmZvb3RlciAuY2xpY2staXRlbSAuYWQtY2xvc2VcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCJcbiAgfSxcbiAgXCIuaG9tZS1jb250YWluZXIgLnN3aXBlLWxlZnQtYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMzAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjc1cHhcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjQ1cHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjUycHhcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiYXV0b1wiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiYXV0b1wiXG4gIH0sXG4gIFwiLmhvbWUtY29udGFpbmVyIC5zd2lwZS1sZWZ0LWJ0biB0ZXh0XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImFkLXBhZ2VcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJteS1uYXZiYXJcIixcbiAgICAgIFwiYXR0clwiOiB7fVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicmVhZC1ib3hcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY29udGFpbmVyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzd2lwZXJcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcImluZGljYXRvclwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIChmYWxzZSl9LFxuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJzd2lwZXJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJzd2lwZXJcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VcIjogXCJjaGFuZ2VTd2lwZXJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImlkXCI6IFwic3dpcGVyXCIsXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInN3aXBlci1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJlYWRPYmoubGlzdCl9LFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xpY2tTd2lwZXJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udG5ldFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCF0aGlzLnNob3dBZCYmdGhpcy5sYW5nSW5kZXg9PT10aGlzLiRpZHgpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5yZWFkT2JqLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93QWQmJnRoaXMubGFuZ0luZGV4PT09dGhpcy4kaWR4KX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVhbS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlzcGxheUFkVHlwZT49NSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wLWJpZy1pbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmltZ1VybExpc3Q/dGhpcy5hZExpc3QuaW1nVXJsTGlzdFswXTp0aGlzLmRlZmF1bHRBZC5pbWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xvc2UtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCEodGhpcy5zaG93VHJhbnNwYXJlbmN5KSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJob3Jpem9udGFsLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LnRpdGxlfHx0aGlzLmRlZmF1bHRBZC50aXRsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkLXRpdGxlLXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkLXMtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkLXMtdGl0bGUtYWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5kZXNjfHx0aGlzLmRlZmF1bHRBZC5kZXNjKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZS10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3Rhci1saXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0YXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI1OFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZDRTJEXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAoNSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9vdC1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmNsaWNrQnRuVHh0fHx0aGlzLmRlZmF1bHRBZC5jbGlja0J0blR4dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhvbWUtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuZGlzcGxheUFkVHlwZT49NSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdyZWVtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFncmVlbWVudC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFncmVlbWVudC1pdGVtLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC50aXRsZSt0aGlzLmFkTGlzdC5hcHBDb21wYW55KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcml2YWN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdyZWVtZW50LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhpZGUtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjUwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhpZGUtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI0ZGRkZGRlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmRlc2N8fHRoaXMuZGVmYXVsdEFkLmRlc2MpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC10aXRsZS10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJpZy1pbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmltZ1VybExpc3Q/dGhpcy5hZExpc3QuaW1nVXJsTGlzdFswXTp0aGlzLmRlZmF1bHRBZC5pbWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0Lmljb24pfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWtjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWNvbi1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5pY29uKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC50aXRsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImljb24tdHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvb3RlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmNsaWNrQnRuVHh0fHx0aGlzLmRlZmF1bHRBZC5jbGlja0J0blR4dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3dpcGUtbGVmdC1idG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyb3ctYmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJvdy1iYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuW3pua7kee7p+e7remYheivu1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzd2lwZS1sZWZ0LWJ0blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoIXRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIyMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYXJyb3ctYmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQ1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhcnJvdy1iYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuW3pua7kee7p+e7remYheivu1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJib3R0b20tbmF0aXZlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImFkVW5pdGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRJZCl9LFxuICAgICAgICBcImFkTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdCl9LFxuICAgICAgICBcInNob3dUcmFuc3BhcmVuY3lcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0Jhbm5lcil9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImVtaXQtaGlkZS10cmFuc3BhcmVuY3lcIjogXCJoaWRlVHJhbnNwYXJlbmN5XCIsXG4gICAgICAgIFwiZW1pdC1jbG9zZVwiOiBcImhlaWRlUmVtaW5kZXJcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwicmVtaW5kZXItYWRzXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dUcmFuc3BhcmVuY3lcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1JlbWluZGVyKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiZW1pdC1oaWRlLXRyYW5zcGFyZW5jeVwiOiBcImhpZGVUcmFuc3BhcmVuY3lcIixcbiAgICAgICAgXCJlbWl0LWNsb3NlXCI6IFwiaGVpZGVSZW1pbmRlclwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJiYWNrLXRvLWFkc1wiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzaG93VHJhbnNwYXJlbmN5XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dWYWNrVGlzcCl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImVtaXQtaGlkZS10cmFuc3BhcmVuY3lcIjogXCJoaWRlVHJhbnNwYXJlbmN5XCIsXG4gICAgICAgIFwiZW1pdC1jbG9zZVwiOiBcImhlaWRlUmVtaW5kZXJcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYmFjay10by1hZHNcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5oYXNBZExpc3QpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic2hvd1wiOiBcInshIWFkTGlzdC5hZElkfX1cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJhZC1uYXRpdmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRpc3AtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6YCA5Ye65YmN55yL5Liq5bm/5ZGK77yfXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGlzcC10aXRsZS10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnNob3dUcmFuc3BhcmVuY3kpKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRvcC1iaWctaW1nXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5pbWdVcmxMaXN0P3RoaXMuYWRMaXN0LmltZ1VybExpc3RbMF06dGhpcy5kZWZhdWx0QWQuaW1nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZsb2F0XCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcml2YWN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJsb2dvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaG9yaXpvbnRhbC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLXMtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZS1hZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmRlc2N8fHRoaXMuZGVmYXVsdEFkLmRlc2MpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC1zLXRpdGxlLXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9vdC1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2staXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmNsaWNrQnRuVHh0fHx0aGlzLmRlZmF1bHRBZC5jbGlja0J0blR4dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi56uL5Y2z6YCA5Ye6XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjIycHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJhY2tIb21lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYm90dG9tLW5hdGl2ZVwiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmhhc0FkTGlzdCl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJhZGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmFkSWQpfSxcbiAgICAgICAgICAgIFwic2hvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghIXRoaXMuYWRMaXN0LmFkSWQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJhZC1uYXRpdmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImxlZnQtaW1nXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLWltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuaW1nVXJsTGlzdD90aGlzLmFkTGlzdC5pbWdVcmxMaXN0WzBdOnRoaXMuZGVmYXVsdEFkLmltZyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VHJhbnNwYXJlbmN5KX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI0MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnNob3dUcmFuc3BhcmVuY3kpKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImNlbnRlci1pbmZvXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0P3RoaXMuYWRMaXN0LnRpdGxlOnRoaXMuZGVmYXVsdEFkLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mby1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdD90aGlzLmFkTGlzdC5kZXNjOnRoaXMuZGVmYXVsdEFkLmRlc2MpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGljay1pdGVtXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGljay10eHRcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0LmNsaWNrQnRuVHh0fHx0aGlzLmRlZmF1bHRBZC5jbGlja0J0blR4dCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZmxvYXRcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcml2YWN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5hcHBJbmZvLmFwcE5hbWUrdGhpcy5hZExpc3QuYXBwSW5mby5hcHBTaXplK3RoaXMuYWRMaXN0LmFwcEluZm8uYXBwVmVyc2lvbit0aGlzLmFkTGlzdC5hcHBJbmZvLmRldmVsb3Blcil9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZsb2F0LXR4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRMaXN0Lmhhc0FwcE1paXRJbmZvKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcInRvcC1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjUwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidG9wLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCEodGhpcy5zaG93VHJhbnNwYXJlbmN5KSl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogXCI1MFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcInRleHRcIixcbiAgXCJhdHRyXCI6IHtcbiAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudW5lc2NhcGVGb250SWNvbkNvZGUodGhpcy5pY29uTWFwW3RoaXMudHlwZV0pKX1cbiAgfSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiZm9udC1pY29uXCJcbiAgXSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdmb250LXNpemU6ICcrKCh0aGlzLnNpemUqdGhpcy5yYXRpby83NTApKSsncHg7Y29sb3I6ICcrKCh0aGlzLmNvbG9yKSkrJzsnfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ2FwZXgtbmF2YmFyJywgJ2FwZXgtbmF2YmFyLScrKHRoaXMudGhlbWUpXX0sXG4gIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAnaGVpZ2h0OicrKCh0aGlzLmhlaWdodCkpKydweCd9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJsZWZ0XCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjbGlja0hhbmRsZXJMZWZ0XCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxlZnRUZXh0KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubGVmdFRleHQpfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0aXRsZVwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGl0bGUpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50aXRsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghdGhpcy50aXRsZSl9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzbG90XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwicmlnaHRcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImNsaWNrSGFuZGxlclJpZ2h0XCJcbiAgICAgIH0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJpZ2h0VGV4dCl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnJpZ2h0VGV4dCl9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInJlbWluZGVyLWFkc1wiXG4gICAgICBdLFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmhhc0FkTGlzdCl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzaG93XCI6IFwieyEhYWRMaXN0LmFkSWR9fVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLW5hdGl2ZVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidmVydGljYWwtY29udGVudFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRvcC1iaWctaW1nXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5pbWdVcmxMaXN0P3RoaXMuYWRMaXN0LmltZ1VybExpc3RbMF06dGhpcy5kZWZhdWx0QWQuaW1nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUcmFuc3BhcmVuY3kpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghKHRoaXMuc2hvd1RyYW5zcGFyZW5jeSkpfSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaG9yaXpvbnRhbC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJjbGlja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QudGl0bGV8fHRoaXMuZGVmYXVsdEFkLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtdGl0bGUtdHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImxvZ29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtcy10aXRsZS1hZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZExpc3QuZGVzY3x8dGhpcy5kZWZhdWx0QWQuZGVzYyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkLXMtdGl0bGUtdHh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0YXItbGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwicmVwb3J0TmF0aXZlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXplXCI6IFwiNThcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI0ZGQ0UyRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKDUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvb3QtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGljay1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkTGlzdC5jbGlja0J0blR4dHx8dGhpcy5kZWZhdWx0QWQuY2xpY2tCdG5UeHQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bXktbmF2YmFyIS4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGFwZXgtdWlcXFxcY29tcG9uZW50c1xcXFxuYXZiYXJcXFxcaW5kZXgudXghLi4vLi4vLi4vbGVzcy1sb2FkZXIhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcYXBleC11aVxcXFxjb21wb25lbnRzXFxcXG5hdmJhclxcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbXktbmF2YmFyJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1pY29uIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcY29tcG9uZW50c1xcXFxpY29uXFxcXGluZGV4LnV4IS4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcY29tcG9uZW50c1xcXFxpY29uXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaWNvbicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uL2NvbXBvbmVudHMvaWNvbi9pbmRleC51eD9uYW1lPWljb25cIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1iYWNrLXRvLWFkcyZkZXBlbmRzW109aWNvbiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9iYWNrLXRvLWFkcy51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXHBhZ2VzXFxcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxcXGNvbXBvbmVudHNcXFxcYmFjay10by1hZHMudXghLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxhZHZlcnRpc2luZ0NhbXBhaWduc1xcXFxjb21wb25lbnRzXFxcXGJhY2stdG8tYWRzLnV4IS4vYmFjay10by1hZHMudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2JhY2stdG8tYWRzLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYmFjay10by1hZHMnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXg/bmFtZT1pY29uXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9Ym90dG9tLW5hdGl2ZSZkZXBlbmRzW109aWNvbiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9ib3R0b20tbmF0aXZlLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcY29tcG9uZW50c1xcXFxib3R0b20tbmF0aXZlLnV4IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcY29tcG9uZW50c1xcXFxib3R0b20tbmF0aXZlLnV4IS4vYm90dG9tLW5hdGl2ZS51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vYm90dG9tLW5hdGl2ZS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2JvdHRvbS1uYXRpdmUnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXg/bmFtZT1pY29uXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9cmVtaW5kZXItYWRzJmRlcGVuZHNbXT1pY29uIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3JlbWluZGVyLWFkcy51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXHBhZ2VzXFxcXGFkdmVydGlzaW5nQ2FtcGFpZ25zXFxcXGNvbXBvbmVudHNcXFxccmVtaW5kZXItYWRzLnV4IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlciEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxccGFnZXNcXFxcYWR2ZXJ0aXNpbmdDYW1wYWlnbnNcXFxcY29tcG9uZW50c1xcXFxyZW1pbmRlci1hZHMudXghLi9yZW1pbmRlci1hZHMudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3JlbWluZGVyLWFkcy51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3JlbWluZGVyLWFkcycsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXBleC11aS9jb21wb25lbnRzL25hdmJhci9pbmRleC51eD9uYW1lPW15LW5hdmJhclwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL2JhY2stdG8tYWRzLnV4P25hbWU9YmFjay10by1hZHNcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vYWR2ZXJ0aXNpbmdDYW1wYWlnbnMvY29tcG9uZW50cy9ib3R0b20tbmF0aXZlLnV4P25hbWU9Ym90dG9tLW5hdGl2ZVwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi9hZHZlcnRpc2luZ0NhbXBhaWducy9jb21wb25lbnRzL3JlbWluZGVyLWFkcy51eD9uYW1lPXJlbWluZGVyLWFkc1wiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi9jb21wb25lbnRzL2ljb24vaW5kZXgudXg/bmFtZT1pY29uXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP2RlcGVuZHNbXT1teS1uYXZiYXImZGVwZW5kc1tdPWljb24mZGVwZW5kc1tdPWJvdHRvbS1uYXRpdmUmZGVwZW5kc1tdPXJlbWluZGVyLWFkcyZkZXBlbmRzW109YmFjay10by1hZHMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxyZWFkQWRcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxwYWdlc1xcXFxyZWFkQWRcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMC4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
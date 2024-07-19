(function(){
                        
                        var createPageHandler = function() {
                            return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@topon/quick-app-sdk-hw/shared.js":
/*!********************************************************!*\
  !*** ./node_modules/@topon/quick-app-sdk-hw/shared.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

function t(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return r(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,o=new Array(r);e<r;e++)o[e]=t[e];return o}Object.defineProperty(exports, "__esModule", ({value:!0})),exports.bannerSupportStyleList=exports.adxAdapterDictionary=void 0,exports.camelize=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=r.separator||/_(\w)/g;return t.toLowerCase().replace(e,(function(t,r){return r.toUpperCase()}))},exports.deCamelize=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=r.separator||"-",o=r.split||/(?=[A-Z])/;return t.split(o).join(e).toLowerCase()},exports.dispatchAdProxyEvent=exports.defineAdProxyComponent=void 0,exports.isEmptyObject=function(t){for(var r in t)if({}.hasOwnProperty.call(t,r))return!1;return!0},exports.nwFirmHbDictionary=exports.nwFirmDictionary=void 0,exports.nwFirmSupported=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r="hb"===t?o:e,n=Object.values(r)||[];return n},exports.supportStyleList=exports.rvSupportStyleList=void 0,exports.validateAdstyle=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=!1,n=JSON.parse(JSON.stringify(r)),s={0:a,1:i,2:p},c=s[e];for(var l in n)c.includes(l)||(o=!0,console.error("TopOn广告组件config.style属性：".concat(l,"校验不通过，仅支持以下自定义样式属性:").concat(t(c))));return o};var e={VIVO:54,OPPO:55,BAIDU:56,HUAWEI:60,XIAOMI:61,HUAWEI_AGD_PRO:62,HONOR:63,YLH:64,ADX:66};exports.nwFirmDictionary=e;var o={VIVO:54,OPPO:55,YLH:64};exports.nwFirmHbDictionary=o;exports.adxAdapterDictionary={0:"AdxNativeAdapter",1:"AdxRewardedVideoAdapter",2:"AdxBannerAdapter",3:"AdxInterstitialAdapter",4:"AdxSplashAdapter"};var n=function(t,r){try{if(this.isAdDestroyed)return;this.adProxyEvent&&this.adProxyEvent[t]&&this.adProxyEvent[t].call(this,r)}catch(r){console.error("call ".concat(t),r)}};exports.dispatchAdProxyEvent=n;exports.defineAdProxyComponent=function(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{this.adTimerId&&clearInterval(this.adTimerId);var e=setInterval((function(){if(t.isAdDestroyed||!t.$app)clearInterval(e);else if(t.$app&&t.$app.$def&&t.$app.$def.topon_sdk&&t.$app.$def.topon_sdk.components){clearInterval(e);var o=t.$app.$def.topon_sdk.components[r.name][r.format];o?(Object.keys(o).forEach((function(r){t[r]=o[r]})),n.call(t,"onInit")):console.error("".concat(r.name,":").concat(r.format," Component Not Define"))}}),10);this.adTimerId=e,r.cb&&r.cb()}catch(t){console.error("Define Component Error",t)}};var a=["containerStyle","imgStyle","titleStyle","buttonStyle","descStyle"];exports.supportStyleList=a;var i=["titleStyle","buttonStyle"];exports.rvSupportStyleList=i;var p=["left","top","width","height"];exports.bannerSupportStyleList=p;

/***/ }),

/***/ "./node_modules/union-quick-app-ad/components/common.js":
/*!**************************************************************!*\
  !*** ./node_modules/union-quick-app-ad/components/common.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineAdComponent": () => (/* binding */ defineAdComponent),
/* harmony export */   "dispatchAdEvent": () => (/* binding */ dispatchAdEvent),
/* harmony export */   "validateAdstyle": () => (/* binding */ validateAdstyle)
/* harmony export */ });
const dispatchAdEvent=function(t,e){try{this.isAdDestroyed||(this.adEvent&&this.adEvent[t]?this.adEvent[t].call(this,e):"shake"===t&&this.parent&&this.parent.adEvent&&this.parent.adEvent.onClick&&this.parent.adEvent.onClick.call(this.parent,e))}catch(t){}},defineAdComponent=function(n){try{this.adTimer&&clearInterval(this.adTimer);let t=setInterval(()=>{if(this.isAdDestroyed||!this.$app)clearInterval(t);else if(this.$app&&this.$app.$def&&this.$app.$def.union_quick_app_sdk&&this.$app.$def.union_quick_app_sdk.components){clearInterval(t);let e=this.$app.$def.union_quick_app_sdk.components[n];e&&(Object.keys(e).forEach(t=>{this[t]=e[t]}),dispatchAdEvent.call(this,"onInit"))}},10);this.adTimer=t}catch(t){}},validateAdstyle=function(t){var e,n=["containerStyle","titleStyle","imgStyle","buttonStyle","iconStyle","descStyle","brandStyle","closeBtnStyle","downloadStyle","downloadBrandStyle","downloadIconStyle","downloadButtonStyle","downloadTextStyle","openAdBtnStyle"];let i=!1;for(e in t=JSON.parse(JSON.stringify(t)))n&&!~n.indexOf(e)&&(console.log(`百度网盟广告组件adStyle属性：${e}校验不通过，仅支持以下自定义样式属性:`+[...n]),i=!0);return!i};

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {
          type: Object,
          required: false,
          default: {},
          validator: function (obj) {
            return (0, _shared.validateAdstyle)(obj, 0);
          }
        },
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: false,
      default: {}
    },
    adExtra: {
      type: Object,
      required: false,
      default: {}
    },
    id: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      adList: [],
      adListIndexInUse: 0,
      ready: false,
      timerId: null,
      lockAdError: '',
      displayed: false,
      adStyle: {},
      adDestroy: false,
      validityTimeId: null,
      startPoint: {},
      endPoint: {},
      clientRect: {},
      failTimeId: null,
      succeedTimeId: false,
      deviceInfoCache: {},
      lockAdAppear: ''
    };
  },
  computed: {
    currentAd() {
      var _this$adList;
      return (_this$adList = this.adList) !== null && _this$adList !== void 0 && _this$adList.length ? this.adList[this.adListIndexInUse] : {};
    },
    adCreativeType() {
      var _this$currentAd$crt_t, _this$currentAd;
      return (_this$currentAd$crt_t = (_this$currentAd = this.currentAd) === null || _this$currentAd === void 0 ? void 0 : _this$currentAd.crt_type) !== null && _this$currentAd$crt_t !== void 0 ? _this$currentAd$crt_t : '';
    },
    closeButton() {
      return this.adOption.close_button != "1";
    },
    templateId() {
      var _this$adOption$mode_t, _this$adOption;
      return (_this$adOption$mode_t = (_this$adOption = this.adOption) === null || _this$adOption === void 0 ? void 0 : _this$adOption.mode_type) !== null && _this$adOption$mode_t !== void 0 ? _this$adOption$mode_t : '';
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 66,
      format: 'native'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  adClick(e) {},
  adClose(e) {},
  adTouchStart(e) {},
  adTouchMove(e) {},
  adTouchEnd(e) {},
  adAppear(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {
          type: Object,
          required: false,
          default: {},
          validator: function (obj) {
            return (0, _shared.validateAdstyle)(obj, 1);
          }
        },
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: false,
      default: {}
    },
    adExtra: {
      type: Object,
      required: false,
      default: {}
    },
    id: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      adList: [],
      adListIndexInUse: 0,
      ready: false,
      timerId: null,
      lockAdError: '',
      adStyle: {},
      adDestroy: false,
      validityTimeId: null,
      startPoint: {},
      endPoint: {},
      clientRect: {},
      failTimeId: null,
      succeedTimeId: false,
      deviceInfoCache: {}
    };
  },
  computed: {
    currentAd() {
      var _this$adList;
      return (_this$adList = this.adList) !== null && _this$adList !== void 0 && _this$adList.length ? this.adList[this.adListIndexInUse] : {};
    },
    adCreativeType() {
      var _this$currentAd$crt_t, _this$currentAd;
      return (_this$currentAd$crt_t = (_this$currentAd = this.currentAd) === null || _this$currentAd === void 0 ? void 0 : _this$currentAd.crt_type) !== null && _this$currentAd$crt_t !== void 0 ? _this$currentAd$crt_t : '';
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 66,
      format: 'rewardedVideo'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      isShow: false,
      ready: false,
      timerId: null
    };
  },
  computed: {
    downloadPanel() {
      return this.adOption.dl_type === "1";
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 56,
      format: 'interstitial'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  load() {},
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      isShow: false,
      refreshTime: 0,
      ready: false,
      timerId: null,
      displayed: false
    };
  },
  computed: {
    downloadPanel() {
      return this.adOption.dl_type === "1";
    },
    videoAutoplay() {
      return this.adOption.video_autoplay === "1";
    },
    videoMuted() {
      return this.adOption.video_muted === "1";
    },
    nativeBoxClass() {
      return this.displayed ? 'baidu-native-box' : 'baidu-native-box--none';
    },
    templateId() {
      return this.adConfig.templateId || '';
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 56,
      format: 'native'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {},
  adDownloadClick() {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      ready: false,
      timerId: null,
      lockAdLoad: false
    };
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 56,
      format: 'rewardedVideo'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        entry: "/",
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      isShow: false,
      style: {
        closeBtnStyle: {
          paddingTop: "100px",
          paddingRight: "50px"
        },
        openAdBtnStyle: {
          borderRadius: "50px",
          backgroundColor: "red"
        }
      },
      ready: false,
      showClassName: "union-ad-wraper--hide",
      timerId: null,
      lockAdClose: false
    };
  },
  computed: {
    downloadPanel() {
      return this.adOption.dl_type === "1";
    },
    splashRestrict() {
      if (!["0", "1", "2"].includes(this.adOption.button_type)) {
        return "0";
      }
      return this.adOption.button_type;
    },
    skipTime() {
      if (this.adOption.countdown < 2) {
        return 2;
      } else if (this.adOption.countdown > 5) {
        return 5;
      }
      return +this.adOption.countdown;
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 56,
      format: 'splash'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      isShow: false,
      ad: null,
      ready: false,
      adList: [],
      adListIndexInUse: 0,
      currentIndexUse: 0,
      timerId: null,
      provider: ''
    };
  },
  computed: {
    currentAd() {
      return this.adList[this.adListIndexInUse] || {};
    },
    adInteractionType() {
      var _this$currentAd$inter, _this$currentAd;
      return (_this$currentAd$inter = (_this$currentAd = this.currentAd) === null || _this$currentAd === void 0 ? void 0 : _this$currentAd.interactionType) !== null && _this$currentAd$inter !== void 0 ? _this$currentAd$inter : 0;
    },
    isDownloadAd() {
      return this.adInteractionType === 2;
    },
    isTemplateAd() {
      var _this$adOption;
      if (((_this$adOption = this.adOption) === null || _this$adOption === void 0 ? void 0 : _this$adOption.unit_type) === '1') {
        return true;
      }
      return false;
    },
    templateAdType() {
      var _this$adOption2;
      if (((_this$adOption2 = this.adOption) === null || _this$adOption2 === void 0 ? void 0 : _this$adOption2.ad_type) === '2') {
        return 'appList';
      }
      return 'infoCard';
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 62,
      format: 'native'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  getAd() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {
          type: Object,
          required: false,
          default: {}
        },
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      ready: false,
      timerId: null,
      provider: '',
      lockAdLoad: false
    };
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 60,
      format: 'banner'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      ready: false,
      timerId: null,
      provider: ''
    };
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 60,
      format: 'interstitial'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      ready: false,
      adList: [],
      adListIndexInUse: 0,
      currentIndexUse: 0,
      timerId: null,
      provider: ''
    };
  },
  computed: {
    currentAd() {
      return this.adList[this.adListIndexInUse] || {};
    },
    adInteractionType() {
      var _this$currentAd$inter, _this$currentAd;
      return (_this$currentAd$inter = (_this$currentAd = this.currentAd) === null || _this$currentAd === void 0 ? void 0 : _this$currentAd.interactionType) !== null && _this$currentAd$inter !== void 0 ? _this$currentAd$inter : 0;
    },
    isDownloadAd() {
      return this.adInteractionType === 2;
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 60,
      format: 'native'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  getAd() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      ready: false,
      timerId: null,
      provider: '',
      lockAdLoad: false,
      showCalled: false
    };
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 60,
      format: 'rewardedVideo'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  getAd() {
    return {};
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      adList: [],
      adListIndexInUse: 0,
      ready: false,
      timerId: null
    };
  },
  computed: {},
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 64,
      format: 'native'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      adList: [],
      ready: false,
      timerId: null,
      bidOffer: {},
      isVideoEnded: false
    };
  },
  computed: {},
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 64,
      format: 'rewardedVideo'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ../../shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: {
    adConfig: {
      type: Object,
      required: true,
      default: {
        style: {},
        filter: {
          nwFirmIds: [],
          unitIds: []
        }
      }
    },
    adOption: {
      type: Object,
      required: true,
      default: {}
    },
    adExtra: {
      type: Object,
      required: true,
      default: {}
    },
    id: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      ad: null,
      adList: [],
      ready: false,
      timerId: null,
      bidOffer: {}
    };
  },
  computed: {},
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 64,
      format: 'splash'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
  },
  show() {},
  adLoad(e) {},
  adShow(e) {},
  adClick(e) {},
  adClose(e) {},
  adError(e) {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/placement.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/placement.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ./shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const defaultConfig = {
  timeout: 0,
  entry: "/",
  style: {},
  filter: {
    nwFirmIds: [],
    unitIds: []
  }
};
var _default = exports.default = {
  props: {
    placementId: {
      type: String,
      required: true,
      default: ""
    },
    config: {
      type: Object,
      required: false,
      default: _objectSpread({}, defaultConfig)
    }
  },
  data() {
    return {
      requestIdCount: 0,
      requestId: "",
      isApiSuccess: false,
      apiData: {},
      adOption: {},
      adxList: [],
      hbList: [],
      unitList: [],
      wfScheduler: null,
      wfUnitIdsNeedRender: [],
      adErrorList: [],
      placementLoadStart: 0,
      placementLoadEnd: 0,
      unitLoadStart: 0,
      unitLoadEnd: 0,
      timerId: null,
      adxBiddingTimeId: null,
      hbBiddingTimeId: null,
      lock: {
        load: '',
        show: '',
        adLoad: '',
        adShow: '',
        adClick: '',
        adReward: '',
        adClose: ''
      },
      adxBidding: false,
      hbBidding: false,
      hitUnitId: null
    };
  },
  computed: {
    wfList() {
      let waterfallList = [];
      if (!this.wfScheduler) {
        return waterfallList;
      }
      const statusLists = this.wfScheduler.getStatusList();
      statusLists.forEach((statusList, index) => {
        var _item$adapter_class;
        let item = statusList.unit;
        item.wfIndex = index;
        item.wfId = this.placementId + '/' + item.unit_id;
        let adapterClass = (_item$adapter_class = item === null || item === void 0 ? void 0 : item.adapter_class) !== null && _item$adapter_class !== void 0 ? _item$adapter_class : "";
        if (item.nw_firm_id == 66) {
          adapterClass = _shared.adxAdapterDictionary[this.format];
        }
        item.wfAdapter = (0, _shared.deCamelize)(adapterClass);
        item.wfAdOption = this.getWfAdOption(item);
        item.wfAdOption._type = '' + statusList.type;
        item.wfAdExtra = this.getWfAdExtra(item);
        const status = this.wfUnitIdsNeedRender.includes(item.unit_id);
        item.wfStatus = status;
        waterfallList.push(item);
      });
      return waterfallList.filter(item => item.wfStatus);
    },
    format() {
      var _this$apiData;
      return this === null || this === void 0 || (_this$apiData = this.apiData) === null || _this$apiData === void 0 ? void 0 : _this$apiData.format;
    },
    reqUgNum() {
      var _this$apiData2;
      const baidu = this.unitList.filter(item => item.nw_firm_id === _shared.nwFirmDictionary.BAIDU);
      if (baidu.length > 0 && [1, 4].includes(this.format)) {
        return 1;
      } else if ([2, 3].includes(this.format)) {
        return 1;
      }
      return (this === null || this === void 0 || (_this$apiData2 = this.apiData) === null || _this$apiData2 === void 0 ? void 0 : _this$apiData2.req_ug_num) || 1;
    },
    isShow() {
      return !(0, _shared.isEmptyObject)(this.apiData);
    },
    mergeConfig() {
      return _objectSpread(_objectSpread({}, defaultConfig), this.config);
    }
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 'main',
      format: 'entry'
    });
  },
  onDestroy() {
    _shared.dispatchAdProxyEvent.call(this, 'onDestroy');
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  name: 'TopOnAdButton',
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'info'
    },
    plain: {
      type: Boolean,
      required: false,
      default: false
    },
    btnStyle: {
      type: Object,
      required: false,
      default: {}
    }
  },
  onInit() {},
  handleClick(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyClick', e);
  },
  handleTouchStart(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchStart', e);
  },
  handleTouchMove(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchMove', e);
  },
  handleTouchEnd(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchEnd', e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  name: 'TopOnAdClickableArea',
  props: {
    isClickable: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  onInit() {},
  handleClick(e) {
    e.stopPropagation && e.stopPropagation();
    if (!this.isClickable) {
      return;
    }
    ;
    this.$emit('customProxyClick', e);
  },
  handleTouchStart(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchStart', e);
  },
  handleTouchMove(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchMove', e);
  },
  handleTouchEnd(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyTouchEnd', e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  name: 'TopOnAdClose',
  props: {
    closeStyle: {
      type: Object,
      required: false,
      default: {
        closeBtn: {}
      }
    }
  },
  onInit() {},
  handleClick(e) {
    e.stopPropagation && e.stopPropagation();
    this.$emit('customProxyClose', e);
  },
  clickCatch(e) {
    e.stopPropagation && e.stopPropagation();
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  name: 'TopOnAdLogo',
  props: {
    logoStyle: {
      type: Object,
      required: false,
      default: {}
    },
    logoUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  onInit() {}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  name: 'TopOnAdxGraphic',
  props: {
    adData: {
      type: Object,
      required: true,
      default: {}
    },
    adStyle: {
      type: Object,
      required: false,
      default: {}
    },
    templateId: {
      type: String,
      required: false,
      default: ''
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isFullClickable() {
      var _this$adData;
      return ((_this$adData = this.adData) === null || _this$adData === void 0 || (_this$adData = _this$adData.ctrl) === null || _this$adData === void 0 ? void 0 : _this$adData.e_c_a) === 1;
    },
    closeAttachImg() {
      return !this.templateId || ['1', '3', '4'].includes(this.templateId);
    },
    closeFollowBtn() {
      return ['2'].includes(this.templateId);
    },
    closeFollowTitle() {
      return false;
    }
  },
  onInit() {},
  handleClick(e) {
    this.$emit('customProxyClick', e);
  },
  handleTouchStart(e) {
    this.$emit('customProxyTouchStart', e);
  },
  handleTouchMove(e) {
    this.$emit('customProxyTouchMove', e);
  },
  handleTouchEnd(e) {
    this.$emit('customProxyTouchEnd', e);
  },
  handleClose(e) {
    this.$emit('customProxyClose', e);
  },
  handleAppear(e) {
    this.$emit('customProxyAppear', e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/bottomBar.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/bottomBar.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: {
    bottomBar: {
      type: Array,
      default: [{
        icon: "https://miniapp-ad.bj.bcebos.com/quickapp/bookshelfgray.png",
        highlightIcon: "https://miniapp-ad.bj.bcebos.com/quickapp/bookshelf.png",
        text: "书架"
      }, {
        icon: "https://miniapp-ad.bj.bcebos.com/quickapp/bookcitygray.png",
        highlightIcon: "https://miniapp-ad.bj.bcebos.com/quickapp/bookcity.png",
        text: "书城"
      }]
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  onInit() {
    _common.defineAdComponent.call(this, "bottomBar");
  },
  onclickBottomBar(t) {
    _common.dispatchAdEvent.call(this, "onclickBottomBar", t);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/circle.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/circle.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["percent", "content", "size"],
  data() {
    return {
      style: {},
      circleSize: ""
    };
  },
  onInit() {
    this.$watch("percent", "watchPercentChange"), _common.defineAdComponent.call(this, "circle");
  },
  watchPercentChange(e, t) {
    _common.dispatchAdEvent.call(this, "onPercentChange", e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/closeAdBtn.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/closeAdBtn.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["imgsrc", "text", "btnstyle"],
  data: {
    closeImg: "",
    closeText: "",
    closeImgStyle: ""
  },
  onInit() {
    _common.defineAdComponent.call(this, "closeAdBtn");
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/custom.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/custom.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["list", "customstyle", "item", "bindevent", "id", "shakeInterval", "adTouchstart", "templateId", "rewardTime"],
  data() {
    return {};
  },
  onInit() {
    _common.defineAdComponent.call(this, "custom");
  },
  clickHandler(t, o) {
    t && t.click && (o.adEventName = t.click, this.$emit("customClick", o), t.clickBubble || o.stopPropagation && o.stopPropagation());
  },
  touchstartHandler(t, o) {
    o.stopPropagation && o.stopPropagation();
  },
  customClick(t) {
    this.$emit("customClick", t), t.stopPropagation && t.stopPropagation();
  },
  customTouchstart(t) {
    this.$emit("customTouchstart", t), t && t.stopPropagation && t.stopPropagation();
  },
  videoFinish(t, o) {
    t.finish && (o.adEventName = t.finish, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  videoTimeUpdate(t, o) {
    t.timeupdate && (o.adEventName = t.timeupdate, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  videoPrepared(t, o) {
    t.prepared && (o.adEventName = t.prepared, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  videoPause(t, o) {
    t.pause && (o.adEventName = t.pause, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  videoError(t, o) {
    t.error && (o.adEventName = t.error, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  videoStart(t, o) {
    t.error && (o.adEventName = t.start, this.$emit("customClick", o)), o.stopPropagation && o.stopPropagation();
  },
  containerClick(t, o) {
    t = t || this.item;
    var a = (o && o.detail || {})["adEventName"];
    (t && t.click || "shake" === a) && (o.adEventName = t.click || "shake", this.$emit("customClick", o), t.clickBubble || o.stopPropagation && o.stopPropagation());
  },
  containerTouchstart(t, o) {
    t && t.touchstart && (o.adEventName = t.touchstart, this.$emit("customTouchstart", o), !t.clickBubble) && o && o.stopPropagation && o.stopPropagation();
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/downloadPanel.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/downloadPanel.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["visible"],
  data() {
    return {
      overlayClass: "",
      panelClass: "",
      isVisible: this.visible,
      adData: {},
      style: {},
      closePng: ""
    };
  },
  onInit() {
    this.$watch("visible", "toggleVisible"), _common.defineAdComponent.call(this, "downloadPanel");
  },
  toggleVisible(l) {
    _common.dispatchAdEvent.call(this, "toggleVisible", l);
  },
  closeClick(l) {
    _common.dispatchAdEvent.call(this, "closeClick", l);
  },
  btnClick(l) {
    _common.dispatchAdEvent.call(this, "btnClick", l);
  },
  panelClick(l) {
    _common.dispatchAdEvent.call(this, "panelClick", l);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/feedAd.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/feedAd.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["adstyle", "videoautoplay", "videomuted", "downloadpanel", "templateid", "showvolumn", "needrefresh", "shakeSize"],
  data() {
    return {
      feedType: "",
      adData: {},
      btnText: "",
      closePng: "",
      rePlayPng: "",
      showTailFrame: !1,
      tailFrameStyle: {},
      isDownloadPanel: !1,
      customPanel: !1,
      videoMuted: !1,
      templateId: "",
      templateConfig: [],
      isAdLoaded: !1,
      downloadPanelConfig: [],
      exposeId: "",
      btnAnimate: ""
    };
  },
  onInit() {
    _common.defineAdComponent.call(this, "feedAd");
  },
  onAdExpose() {
    _common.dispatchAdEvent.call(this, "onAdExpose");
  },
  onAdDisappear() {
    _common.dispatchAdEvent.call(this, "onAdDisappear");
  },
  customClick(e) {
    e.detail.adEventName && _common.dispatchAdEvent.call(this, e.detail.adEventName, e);
  },
  customTouchstart(e) {
    var a = e && e.detail && e.detail.adEventName;
    a && _common.dispatchAdEvent.call(this, a, e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/intAd.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/intAd.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  data() {
    return {
      isAdLoaded: !1,
      feedType: "",
      adData: {},
      btnText: "",
      closePng: "",
      templateId: "",
      templateConfig: [],
      enableClose: !1,
      countdown: 3,
      showTailFrame: !1,
      intMainStyle: {},
      intContentStyle: {},
      countDownStyle: {},
      lastTime: 0,
      videoMuted: !0,
      enableSkip: !1
    };
  },
  onAdExpose() {
    _common.dispatchAdEvent.call(this, "onAdExpose");
  },
  onAdDisappear() {
    _common.dispatchAdEvent.call(this, "onAdDisappear");
  },
  customClick(e) {
    e.detail.adEventName && _common.dispatchAdEvent.call(this, e.detail.adEventName, e);
  },
  onInit() {
    _common.defineAdComponent.call(this, "intAd");
  },
  bindClose(e) {
    e.stopPropagation(), this.$emit("close");
  },
  bindTimerClick(e) {
    e.stopPropagation();
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/logo.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/logo.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  props: ["entry", "itemStyle"],
  data() {
    return {
      style: {},
      logoUrl: ""
    };
  },
  computed: {
    styleBox() {
      return _objectSpread(_objectSpread({}, this.itemStyle), this.style.logoContainer);
    }
  },
  onInit() {
    _common.defineAdComponent.call(this, "logo");
  },
  onClick(t) {
    _common.dispatchAdEvent.call(this, "onClick", t);
  },
  onTouchstart(t) {
    _common.dispatchAdEvent.call(this, "onTouchstart", t);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/mobadsAd.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/mobadsAd.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: {
    appid: {
      type: [String, Number],
      required: !0
    },
    apid: {
      type: [String, Number],
      required: !0
    },
    type: {
      type: String,
      required: !0,
      default: "feed"
    },
    entry: {
      type: String,
      required: !1
    },
    openimg: {
      type: String,
      required: !1
    },
    adstyle: {
      type: Object,
      required: !1,
      default: {},
      validator: function (e) {
        return (0, _common.validateAdstyle)(e);
      }
    },
    videoautoplay: {
      type: [Boolean, String],
      required: !1,
      default: "true"
    },
    downloadpanel: {
      type: Boolean,
      default: !1
    },
    videomuted: {
      type: [Boolean, String],
      required: !1,
      default: "true"
    },
    templateid: {
      type: String,
      required: !1
    },
    customclose: {
      type: Boolean,
      required: !1,
      default: !1
    },
    splashrestrict: {
      type: String,
      required: !1,
      default: "0"
    },
    device: {
      type: String,
      required: !1,
      default: ""
    },
    mac: {
      type: String,
      required: !1,
      default: ""
    },
    showCountdown: {
      type: Boolean,
      required: !1,
      default: !1
    },
    showvolumn: {
      type: Boolean,
      required: !1,
      default: !0
    },
    refresh: {
      required: !1
    },
    skiptime: {
      type: Number,
      required: !1
    },
    visible: {
      type: [Boolean, String, Number],
      required: !1,
      default: !1
    },
    req: {
      type: String,
      required: !1,
      default: ""
    },
    channelId: {
      type: String,
      default: ""
    },
    scid: {
      type: String,
      default: ""
    },
    novelAdType: {
      type: Number,
      default: 1
    },
    websrc: {
      type: String,
      default: ""
    },
    landingPage: {
      type: String,
      defaut: ""
    },
    backpress: {
      type: Number,
      default: 0
    },
    shakeSize: {
      type: Number,
      required: !1,
      default: 3
    }
  },
  data() {
    return {
      adData: {},
      panelVisible: !1,
      adVisible: !0,
      pageY: "100",
      needrefresh: !1,
      sendLogUrl: "",
      intVisible: !1,
      shakeInterval: 3,
      isShake: !1,
      lastDownloadpanel: this.downloadpanel
    };
  },
  onInit() {
    this.initTime = new Date().getTime(), this.$watch("refresh", "onRefreshPropChange"), this.$watch("visible", "onIntVisibleChange"), _common.defineAdComponent.call(this, "mobadsAd");
  },
  onIntVisibleChange(e, t) {
    this.intVisible = !0, _common.dispatchAdEvent.call(this, "onRefreshPropChange", e !== t);
  },
  onReady() {
    _common.dispatchAdEvent.call(this, "onReady");
  },
  onDestroy() {
    _common.dispatchAdEvent.call(this, "onDestroy");
  },
  onClick(e) {
    _common.dispatchAdEvent.call(this, "onClick", e);
  },
  onTouchstart(e) {
    _common.dispatchAdEvent.call(this, "onTouchstart", e);
  },
  downloadPanelClose(e) {
    _common.dispatchAdEvent.call(this, "downloadPanelClose", e);
  },
  downloadClick(e) {
    _common.dispatchAdEvent.call(this, "downloadClick", e);
  },
  showFeedback(e) {
    _common.dispatchAdEvent.call(this, "showFeedback", e);
  },
  initComplete(e) {
    _common.dispatchAdEvent.call(this, "initComplete", e);
  },
  areaClick(e) {
    "novel" === this.type ? _common.dispatchAdEvent.call(this, "onClick", e) : _common.dispatchAdEvent.call(this, "onClick", e.detail);
  },
  onRefreshPropChange(e, t) {
    _common.dispatchAdEvent.call(this, "onRefreshPropChange", e !== t);
  },
  intClose() {
    _common.dispatchAdEvent.call(this, "onIntClose");
  },
  areaTouchstart(e) {
    _common.dispatchAdEvent.call(this, "onTouchstart", e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelAd.ux":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelAd.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: {
    websrc: {
      type: String,
      default: ""
    },
    channelId: {
      type: String,
      required: !0,
      default: ""
    },
    scid: {
      type: String,
      default: ""
    },
    landingPage: {
      type: String,
      default: ""
    },
    novelAdType: {
      type: Number,
      default: 1
    },
    backpress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allow: !0,
      novelUrl: "",
      isLoaded: !1,
      trustedurls: [/^https:\/\/boxnovel.baidu.com/, /^https:\/\/cpu.baidu.com/]
    };
  },
  onInit() {
    this.$watch("backpress", "onBackpress"), _common.defineAdComponent.call(this, "novelAd");
  },
  onPagefinish(e) {
    _common.dispatchAdEvent.call(this, "onPagefinish", e);
  },
  onMessage(e) {
    _common.dispatchAdEvent.call(this, "onMessage", e);
  },
  onBackpress() {
    _common.dispatchAdEvent.call(this, "onBackpress");
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelBookCity.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelBookCity.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["bottomBarData", "scid", "channelId", "backpress"],
  data() {
    return {
      bottomBarType: 0,
      topBartype: 0,
      websrc: "",
      isLoaded: !1,
      showTopBar: !1,
      showBottomBar: !1,
      topBarIndex: 0,
      bottomBarIndex: 0,
      trustedurls: [/^https:\/\/boxnovel.baidu.com/]
    };
  },
  onInit() {
    this.$watch("backpress", "onBackpress"), _common.defineAdComponent.call(this, "novelBookCity");
  },
  onPageStart(t) {
    _common.dispatchAdEvent.call(this, "onPageStart", t);
  },
  onPagefinish(t) {
    _common.dispatchAdEvent.call(this, "onPagefinish", t);
  },
  onMessage(t) {
    _common.dispatchAdEvent.call(this, "onMessage", t);
  },
  onloadingPage(t) {
    _common.dispatchAdEvent.call(this, "onloadingPage", t);
  },
  onBackpress() {
    _common.dispatchAdEvent.call(this, "onBackpress");
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/openAd.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/openAd.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["openimg", "entry", "adstyle", "downloadpanel", "customclose", "splashrestrict", "skiptime", "isShake", "shakeInterval", "shakeSize"],
  data() {
    return {
      adData: {},
      countdown: 5,
      imgUrl: "",
      isshow: !1,
      percent: 20,
      closetype: 4,
      style: {},
      isDownloadPanel: !1,
      btnText: "",
      showSplashBtn: !1,
      circleSize: 90,
      templateConfig: [],
      openContentStyle: {},
      intContentStyle: {},
      isDownload: !1,
      cloudClickArea: -1
    };
  },
  onInit() {
    _common.defineAdComponent.call(this, "openAd");
  },
  imgLoadCompleted() {
    _common.dispatchAdEvent.call(this, "imgLoadCompleted");
  },
  logoClick() {
    _common.dispatchAdEvent.call(this, "logoClick");
  },
  onAdSkip(t) {
    _common.dispatchAdEvent.call(this, "onAdSkip", t);
  },
  imgLoadErr() {
    _common.dispatchAdEvent.call(this, "imgLoadErr");
  },
  onDestroy() {
    _common.dispatchAdEvent.call(this, "onDestroy");
  },
  customClick(t) {
    t.detail.adEventName && _common.dispatchAdEvent.call(this, t.detail.adEventName, t);
  },
  capabilityClick(t) {
    _common.dispatchAdEvent.call(this, "capabilityClick", t);
  },
  privacyClick(t) {
    _common.dispatchAdEvent.call(this, "privacyClick", t);
  },
  permissionClick(t) {
    _common.dispatchAdEvent.call(this, "permissionClick", t);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/rewardAd.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/rewardAd.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: ["adstyle", "rewardtime", "closetime", "showCountdown", "downloadpanel"],
  data() {
    return {
      adData: {},
      templateConfig: [],
      videomuted: !1,
      showTailFrame: !1,
      progress: 0,
      lastTime: 0,
      showSkip: !1,
      lastRewardTime: 0
    };
  },
  onInit() {
    _common.defineAdComponent.call(this, "rewardAd");
  },
  customClick(e) {
    e.detail.adEventName && _common.dispatchAdEvent.call(this, e.detail.adEventName, e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/tab.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/tab.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = __webpack_require__(/*! ./common.js */ "./node_modules/union-quick-app-ad/components/common.js");
var _default = exports.default = {
  props: {
    menu: {
      type: Array,
      default: ["推荐", "男生", "女生"]
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  onInit() {
    _common.defineAdComponent.call(this, "tab");
  },
  onChangeTabIndex(e) {
    _common.dispatchAdEvent.call(this, "onChangeTabIndex", e);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd-taku/index.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd-taku/index.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    $umeng_stat.trackEvent('xyfddhj_cfd', '点击');
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD-topon/index.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD-topon/index.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  data() {
    return {
      loaded: false,
      isGetAd: false,
      config: {
        entry: '/pages/Home',
        timeout: 30000
      },
      placementId: 'b669889dbd4d83',
      adData: null,
      displayed: false
    };
  },
  onReady() {},
  handleAdLoad(e) {
    console.log('demo接收load回调', e);
    this.loaded = true;
    this.handleGetAd();
  },
  handleAdShow(e) {
    console.log('demo接收show回调', e);
    this.displayed = true;
    this.handleReportShow(e);
  },
  handleAdClose(e) {
    console.log('demo接收close回调', e);
    this.displayed = false;
  },
  handleAdClick(e) {
    console.log('demo接收click回调', e);
    this.handleReportClick(e);
    this.reportNativeClick();
  },
  handleAdError(e) {
    console.log('demo接收error回调', e);
  },
  handleDisplayAd() {
    if (this.isSelfRendering) {
      this.displayed = true;
    } else {
      const placement = this.getSdkElement();
      if (placement.show) {
        placement.show();
      }
    }
  },
  handleLoadAd() {
    this.isGetAd = false;
    this.displayed = false;
    this.adData = null;
    const placement = this.getSdkElement();
    if (placement.load) {
      placement.load();
    }
  },
  handleIsReady() {
    const placement = this.getSdkElement();
    if (placement.isReady) {
      const isReady = placement.isReady();
      return isReady;
    }
  },
  handleGetAd() {
    if (!this.loaded) {
      console.log('请等待加载完成后再获取数据');
      return;
    }
    this.displayed = false;
    this.adData = null;
    const placement = this.getSdkElement();
    if (placement) {
      const currentAd = placement.getAd();
      console.log('currentAd', currentAd);
      if (!currentAd) {
        return;
      }
      this.adData = currentAd;
      this.isGetAd = true;
      this.handleDisplayAd();
    }
  },
  handleReportShow(e) {
    console.log('demo接收show回调', e);
    const placement = this.getSdkElement();
    if (placement !== null && placement !== void 0 && placement.reportShow) {
      console.log('上报show');
      placement.reportShow();
    }
  },
  handleReportClick(e) {
    console.log('demo接收show回调', e);
    const placement = this.getSdkElement();
    if (placement !== null && placement !== void 0 && placement.reportClick) {
      console.log('上报click');
      placement.reportClick();
    }
  },
  getSdkElement() {
    return this.$child(`topon-ad-${this.placementId}`);
  },
  closeAdview: function () {
    this.$emit('emitClose');
  },
  reportNativeClick() {
    console.info(" 原生广告被点击了");
    this.$emit('addAdc');
    this.showTclayer = false;
  },
  completeAdRSA() {
    console.log('点击拆福袋');
    $umeng_stat.trackEvent('xyfddhj_chai', '点击');
    if (!this.displayed) {
      console.log('广告展示不成功,拆红包不成功');
      $prompt.showToast({
        message: '拆红包失败！请重试',
        gravity: 'center'
      });
      this.$emit('emitClose');
      return;
    }
    var adType = 'NATIVE';
    var adId = this.adData.unitId;
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\native.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\native.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".baidu-native-box": {
    "display": "flex",
    "width": "100%"
  },
  ".baidu-native-box--none": {
    "display": "none"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\splash.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\splash.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\splash.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\splash.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".union-ad-wraper": {
    "top": "0px",
    "left": "0px",
    "zIndex": 100000000,
    "width": "100%",
    "position": "fixed",
    "height": "0px"
  },
  ".union-ad-wraper #open-screen-ad": {
    "width": "100%",
    "height": "100%",
    "justifyContent": "center",
    "flexDirection": "column",
    "backgroundColor": "#ffffff"
  },
  ".union-ad-wraper--show": {
    "height": "100%"
  },
  ".union-ad-wraper--hide": {
    "height": "0px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\views\\Adx\\Common\\AdClickableArea.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\views\\Adx\\Common\\AdClickableArea.ux!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\views\Adx\Common\AdClickableArea.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\views\Adx\Common\AdClickableArea.ux!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".topon-ad-clickable": {
    "width": "100%",
    "position": "relative"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\bottomBar.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\bottomBar.ux!./node_modules/union-quick-app-ad/components/bottomBar.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\bottomBar.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\bottomBar.ux!./node_modules/union-quick-app-ad/components/bottomBar.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".bottom-bar": {
    "width": "100%",
    "height": "144px",
    "backgroundColor": "#ffffff",
    "display": "flex",
    "position": "fixed",
    "bottom": "0px",
    "left": "0px"
  },
  ".bottom-bar-item": {
    "width": "50%",
    "justifyContent": "center"
  },
  ".bottom-bar-item image": {
    "width": "60px",
    "height": "60px",
    "marginTop": "20px"
  },
  ".bottom-bar-item text": {
    "fontFamily": "PingFangSC-Regular",
    "fontSize": "24px",
    "color": "#b8b8b8",
    "textAlign": "center",
    "marginTop": "40px"
  },
  ".bottom-bar-item .current": {
    "color": "#ff824a"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\custom.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\custom.ux!./node_modules/union-quick-app-ad/components/custom.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\custom.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\custom.ux!./node_modules/union-quick-app-ad/components/custom.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".ad-image": {
    "width": "100%"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\downloadPanel.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\downloadPanel.ux!./node_modules/union-quick-app-ad/components/downloadPanel.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\downloadPanel.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\downloadPanel.ux!./node_modules/union-quick-app-ad/components/downloadPanel.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "@KEYFRAMES": {
    "overlayEnter": [
      {
        "opacity": 0,
        "time": 0
      },
      {
        "opacity": 1,
        "time": 100
      }
    ],
    "overlayLeave": [
      {
        "opacity": 1,
        "time": 0
      },
      {
        "opacity": 0,
        "time": 100
      }
    ],
    "panelenter": [
      {
        "height": "0px",
        "transform": "{\"translateY\":\"100%\"}",
        "time": 0
      },
      {
        "height": "100%",
        "transform": "{\"translateY\":\"0px\"}",
        "time": 100
      }
    ],
    "panelleave": [
      {
        "height": "100%",
        "transform": "{\"translateY\":\"0px\"}",
        "time": 0
      },
      {
        "height": "0px",
        "transform": "{\"translateY\":\"100%\"}",
        "time": 100
      }
    ]
  },
  ".overlay-enter": {
    "animationName": "overlayEnter",
    "zIndex": 2
  },
  ".overlay-leave": {
    "animationName": "overlayLeave"
  },
  ".panel-enter": {
    "animationName": "panelenter",
    "animationDuration": "200ms",
    "animationTimingFunction": "ease-in"
  },
  ".panel-leave": {
    "height": "0px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\feedAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\feedAd.ux!./node_modules/union-quick-app-ad/components/feedAd.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\feedAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\feedAd.ux!./node_modules/union-quick-app-ad/components/feedAd.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".feed-ad": {
    "backgroundColor": "rgba(0,0,0,0)",
    "color": "#FF0000",
    "width": "100%",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  ".feed-ad-expose": {
    "alignSelf": "center"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\intAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\intAd.ux!./node_modules/union-quick-app-ad/components/intAd.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\intAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\intAd.ux!./node_modules/union-quick-app-ad/components/intAd.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "@KEYFRAMES": {
    "Opacity": [
      {
        "opacity": 0,
        "time": 0
      },
      {
        "opacity": 1,
        "time": 100
      }
    ]
  },
  ".ad-close-timer": {
    "color": "#ffffff",
    "backgroundColor": "#555555",
    "display": "flex",
    "height": "48px",
    "width": "48px",
    "borderRadius": "24px",
    "textAlign": "center"
  },
  ".ad-closed-btn-wrap": {
    "opacity": 0,
    "animationName": "Opacity",
    "animationDelay": "50ms",
    "animationDuration": "100ms",
    "animationTimingFunction": "ease-in-out",
    "animationFillMode": "forwards"
  },
  ".feed-ad-expose": {
    "alignSelf": "center"
  },
  ".int-main": {
    "flexDirection": "column",
    "width": "80%"
  },
  ".int-close": {
    "width": "50px",
    "height": "50px",
    "alignSelf": "flex-end",
    "marginBottom": "15px",
    "marginRight": "5px"
  },
  ".mask": {
    "position": "fixed",
    "flex": 1,
    "top": "0px",
    "bottom": "0px",
    "width": "100%",
    "height": "100%",
    "justifyContent": "center",
    "alignContent": "center",
    "alignItems": "center",
    "backgroundColor": "rgba(5,5,5,0.6)"
  },
  ".int-content": {
    "borderRadius": "30px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelAd.ux!./node_modules/union-quick-app-ad/components/novelAd.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelAd.ux!./node_modules/union-quick-app-ad/components/novelAd.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".novel-ad": {
    "width": "100%",
    "display": "flex",
    "justifyContent": "center"
  },
  ".novel-web": {
    "width": "100%",
    "height": "100%"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelBookCity.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelBookCity.ux!./node_modules/union-quick-app-ad/components/novelBookCity.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelBookCity.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelBookCity.ux!./node_modules/union-quick-app-ad/components/novelBookCity.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".novel-second-ad": {
    "display": "flex",
    "flexWrap": "wrap",
    "flexDirection": "row"
  },
  ".novel-second-ad .tab": {
    "width": "100%",
    "height": "84px",
    "backgroundColor": "#f5f6f9"
  },
  ".novel-second-ad .web": {
    "width": "100%",
    "height": "90%",
    "marginTop": "84px",
    "marginBottom": "144px",
    "justifyContent": "center"
  },
  ".novel-second-ad .web-across-top": {
    "marginTop": "0px"
  },
  ".novel-second-ad .web-across-bottom": {
    "marginBottom": "0px"
  },
  ".novel-second-ad .bottom-bar": {
    "height": "144px"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\openAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\openAd.ux!./node_modules/union-quick-app-ad/components/openAd.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\openAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\openAd.ux!./node_modules/union-quick-app-ad/components/openAd.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "@KEYFRAMES": {
    "Opacity": [
      {
        "opacity": 0,
        "time": 0
      },
      {
        "opacity": 1,
        "time": 100
      }
    ]
  },
  ".ad-closed-btn-wrap": {
    "opacity": 0,
    "animationName": "Opacity",
    "animationDelay": "50ms",
    "animationDuration": "100ms",
    "animationTimingFunction": "ease-in-out",
    "animationFillMode": "forwards"
  },
  ".openImgWrap": {
    "opacity": 0,
    "animationName": "Opacity",
    "animationDelay": "50ms",
    "animationDuration": "100ms",
    "animationTimingFunction": "ease-in-out",
    "animationFillMode": "forwards"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\rewardAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\rewardAd.ux!./node_modules/union-quick-app-ad/components/rewardAd.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\rewardAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\rewardAd.ux!./node_modules/union-quick-app-ad/components/rewardAd.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\tab.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\tab.ux!./node_modules/union-quick-app-ad/components/tab.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\tab.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\tab.ux!./node_modules/union-quick-app-ad/components/tab.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".novel-wrapper": {
    "backgroundColor": "#f1f1f1",
    "display": "flex",
    "flexWrap": "wrap"
  },
  ".tab-bar": {
    "width": "100%",
    "height": "84px",
    "fontSize": "48px",
    "textAlign": "center",
    "display": "flex"
  },
  ".tabs": {
    "width": "100%"
  },
  ".tab-bar-item": {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "width": "96px",
    "textAlign": "center"
  },
  ".tab-bar-text": {
    "width": "96px",
    "textAlign": "center",
    "fontFamily": "PingFangSC-Semibold",
    "marginBottom": "10px"
  },
  ".tab-bar-text-wrapper": {
    "width": "96px",
    "textAlign": "center"
  },
  ".cur-tab": {
    "color": "#ff824a"
  },
  ".tab-bar-bg-line": {
    "borderRadius": "6px",
    "width": "42px",
    "height": "9px",
    "backgroundColor": "#ff824a"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd-taku\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd-taku\\index.ux!./src/Page_cfd-taku/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd-taku\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd-taku\index.ux!./src/Page_cfd-taku/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD-topon\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD-topon\\index.ux!./src/ad/nativeAD-topon/index.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD-topon\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD-topon\index.ux!./src/ad/nativeAD-topon/index.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".tc-layer": {
    "width": "100%",
    "height": "850px",
    "position": "absolute",
    "bottom": "100px",
    "backgroundColor": "rgba(0,0,0,0.9)"
  },
  ".page-container": {
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
  ".closeView": {
    "position": "absolute",
    "left": "100px",
    "top": "140px",
    "width": "36px",
    "height": "36px",
    "backgroundColor": "rgba(0,0,0,0.5)"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad-topon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd-taku/index.ux":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad-topon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd-taku/index.ux ***!
  \*********************************************************************************************************************************************************************************************************************/
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
      "type": "native-ad-topon",
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/logo.ux":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/logo.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "style": function () {return (this.styleBox)},
  "events": {
    "click": "onClick",
    "touchstart": "onTouchstart"
  },
  "classList": [
    "mssp-logo"
  ],
  "children": [
    {
      "type": "image",
      "attr": {
        "src": function () {return (this.logoUrl)}
      },
      "style": function () {return (this.style.logoImg)}
    },
    {
      "type": "text",
      "attr": {
        "value": "广告"
      },
      "style": function () {return (this.style.logoText)}
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-graphic&depends[]=top-on-ad-clickable-area&depends[]=top-on-ad-logo&depends[]=top-on-ad-close&depends[]=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-graphic&depends[]=top-on-ad-clickable-area&depends[]=top-on-ad-logo&depends[]=top-on-ad-close&depends[]=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "top-on-ad-clickable-area",
  "attr": {
    "isClickable": function () {return (this.isFullClickable)}
  },
  "events": {
    "custom-proxy-click": "handleClick",
    "custom-proxy-touch-start": "handleTouchStart",
    "custom-proxy-touch-move": "handleTouchMove",
    "custom-proxy-touch-end": "handleTouchEnd"
  },
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "landscap-ad-container"
      ],
      "style": function () {return (this.adStyle.containerStyle)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "landscap-ad-content"
          ],
          "style": function () {return (this.adStyle.contentStyle)},
          "events": {
            "appear": "handleAppear"
          },
          "children": [
            {
              "type": "stack",
              "attr": {},
              "style": function () {return (this.adStyle.imgStyle)},
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return (this.adData.full_u)}
                  },
                  "classList": [
                    "image"
                  ],
                  "style": function () {return (this.adStyle.imgPropertiesStyle)}
                },
                {
                  "type": "top-on-ad-logo",
                  "attr": {
                    "logoStyle": function () {return (this.adStyle.logoStyle)},
                    "logoUrl": function () {return (this.adData.tp_logo_u)}
                  }
                },
                {
                  "type": "block",
                  "attr": {},
                  "shown": function () {return (this.closeButton&&this.closeAttachImg)},
                  "children": [
                    {
                      "type": "top-on-ad-close",
                      "attr": {
                        "closeStyle": function () {return (this.adStyle.closeStyle)}
                      },
                      "events": {
                        "custom-proxy-close": "handleClose"
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
                "ad-main"
              ],
              "style": function () {return (this.adStyle.mainStyle)},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "landscap-ad-header"
                  ],
                  "style": function () {return (this.adStyle.headerStyle)},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "ad-title"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adData.title)}
                          },
                          "classList": [
                            "text"
                          ],
                          "style": function () {return (this.adStyle.titleStyle)}
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "ad-desc"
                      ],
                      "style": function () {return (this.adStyle.descStyle)},
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.adData.desc)}
                          },
                          "style": function () {return 'color:'+((this.adStyle.descStyle.color))+';font-size: '+((this.adStyle.descStyle.fontSize))+';text-overflow: ellipsis;lines: '+((this.adStyle.descStyle.lines))+';flex: 1;flex-wrap:nowrap;'}
                        },
                        {
                          "type": "block",
                          "attr": {},
                          "shown": function () {return (this.templateId==='2')},
                          "children": [
                            {
                              "type": "div",
                              "attr": {},
                              "classList": [
                                "landscap-ad-footer"
                              ],
                              "style": function () {return (this.adStyle.footerStyle)},
                              "children": [
                                {
                                  "type": "block",
                                  "attr": {},
                                  "shown": function () {return (this.adData.cta)},
                                  "children": [
                                    {
                                      "type": "top-on-ad-button",
                                      "attr": {
                                        "text": function () {return (this.adData.cta)},
                                        "btnStyle": function () {return (this.adStyle.buttonStyle)}
                                      },
                                      "events": {
                                        "custom-proxy-click": "handleClick",
                                        "custom-proxy-touch-start": "handleTouchStart",
                                        "custom-proxy-touch-move": "handleTouchMove",
                                        "custom-proxy-touch-end": "handleTouchEnd"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "type": "top-on-ad-close",
                                  "attr": {
                                    "closeStyle": function () {return (this.adStyle.closeStyle)}
                                  },
                                  "events": {
                                    "custom-proxy-close": "handleClose"
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
                  "type": "block",
                  "attr": {},
                  "shown": function () {return (this.templateId!=='2')},
                  "children": [
                    {
                      "type": "block",
                      "attr": {},
                      "shown": function () {return (this.adData.cta)},
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "classList": [
                            "landscap-ad-footer"
                          ],
                          "style": function () {return (this.adStyle.footerStyle)},
                          "children": [
                            {
                              "type": "top-on-ad-button",
                              "attr": {
                                "text": function () {return (this.adData.cta)},
                                "btnStyle": function () {return (this.adStyle.buttonStyle)}
                              },
                              "events": {
                                "custom-proxy-click": "handleClick",
                                "custom-proxy-touch-start": "handleTouchStart",
                                "custom-proxy-touch-move": "handleTouchMove",
                                "custom-proxy-touch-end": "handleTouchEnd"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-native-adapter&depends[]=adx-graphic!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-native-adapter&depends[]=adx-graphic!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "div",
      "attr": {
        "id": function () {return 'top-on-adx-container-'+((this.adOption._unit_id))}
      },
      "shown": function () {return (this.displayed)},
      "classList": [
        "adx-container"
      ],
      "id": function () {return 'top-on-adx-container-'+((this.adOption._unit_id))},
      "children": [
        {
          "type": "adx-graphic",
          "attr": {
            "adData": function () {return (this.currentAd)},
            "adStyle": function () {return (this.adStyle)},
            "templateId": function () {return (this.templateId)},
            "closeButton": function () {return (this.closeButton)}
          },
          "events": {
            "custom-proxy-click": "adClick",
            "custom-proxy-close": "adClose",
            "custom-proxy-touch-start": "adTouchStart",
            "custom-proxy-touch-move": "adTouchMove",
            "custom-proxy-touch-end": "adTouchEnd",
            "custom-proxy-appear": "adAppear"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-interstitial-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-interstitial-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "mobads-ad",
      "attr": {
        "type": "int",
        "apid": function () {return (this.adOption.placement_id)},
        "appid": function () {return (this.adOption.app_id)},
        "downloadpanel": function () {return (this.downloadPanel)},
        "visible": function () {return (this.isShow)}
      },
      "events": {
        "ad-load": "adLoad",
        "ad-show": "adShow",
        "ad-click": "adClick",
        "ad-closed": "adClose",
        "ad-error": "adError"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-native-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-native-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": function () {return [(this.nativeBoxClass)]},
  "children": [
    {
      "type": "mobads-ad",
      "attr": {
        "apid": function () {return (this.adOption.placement_id)},
        "appid": function () {return (this.adOption.app_id)},
        "downloadpanel": function () {return (this.downloadPanel)},
        "videoautoplay": function () {return (this.videoAutoplay)},
        "videomuted": function () {return (this.videoMuted)},
        "type": "feed",
        "refresh": function () {return (this.refreshTime)},
        "adstyle": function () {return (this.adConfig.style)},
        "templateid": function () {return (this.templateId)}
      },
      "shown": function () {return (this.isShow)},
      "events": {
        "ad-load": "adLoad",
        "ad-show": "adShow",
        "ad-click": "adClick",
        "ad-closed": "adClose",
        "ad-error": "adError",
        "download-click": "adDownloadClick"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-splash-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-splash-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": function () {return ['union-ad-wraper', (this.showClassName)]},
  "children": [
    {
      "type": "mobads-ad",
      "attr": {
        "type": "rsplash",
        "apid": function () {return (this.adOption.placement_id)},
        "appid": function () {return (this.adOption.app_id)},
        "downloadpanel": function () {return (this.downloadPanel)},
        "splashrestrict": function () {return (this.splashRestrict)},
        "skiptime": function () {return (this.skipTime)},
        "entry": function () {return (this.adConfig.entry)},
        "customclose": function () {return (true)},
        "adstyle": function () {return (this.adConfig.style)}
      },
      "shown": function () {return (this.isShow)},
      "events": {
        "ad-load": "adLoad",
        "ad-show": "adShow",
        "ad-click": "adClick",
        "ad-closed": "adClose",
        "ad-error": "adError"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/bottomBar.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/bottomBar.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "bottom-bar"
  ],
  "children": [
    {
      "type": "stack",
      "attr": {},
      "classList": [
        "bottom-bar-item"
      ],
      "repeat": function () {return (this.bottomBar)},
      "events": {
        "click": function(evt){this.onclickBottomBar(this.$idx,evt)}
      },
      "children": [
        {
          "type": "image",
          "attr": {
            "src": function () {return (this.$idx===this.curIndex?this.$item.highlightIcon:this.$item.icon)}
          },
          "shown": function () {return (this.$item.icon)},
          "classList": [
            "bottom-bar-img"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.$item.text)}
          },
          "classList": function () {return [(this.$idx===this.curIndex?'current':'')]}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=close-btn!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/closeAdBtn.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=close-btn!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/closeAdBtn.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "close-btn"
  ],
  "style": function () {return (this.btnstyle)},
  "children": [
    {
      "type": "image",
      "attr": {
        "src": function () {return (this.closeImg)}
      },
      "shown": function () {return (this.closeImg)},
      "style": function () {return (this.closeImgStyle)}
    },
    {
      "type": "text",
      "attr": {
        "value": function () {return (this.closeText)}
      },
      "shown": function () {return (this.closeText)},
      "style": function () {return 'color:'+((this.btnstyle.color))},
      "classList": [
        "closebtn-text"
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=download-panel!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/downloadPanel.ux":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=download-panel!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/downloadPanel.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "overlay-container"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": function () {return [(this.overlayClass)]},
      "style": function () {return (this.style.overlay)},
      "shown": function () {return (this.isVisible)},
      "events": {
        "click": "closeClick"
      },
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": function () {return (this.style.panel)},
          "events": {
            "click": "panelClick"
          },
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": function () {return [(this.panelClass)]},
              "style": function () {return (this.style.contentWrapper)},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "style": function () {return (this.style.content)},
                  "children": [
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return (this.closePng)}
                      },
                      "style": function () {return (this.style.close)},
                      "events": {
                        "click": "closeClick"
                      }
                    },
                    {
                      "type": "image",
                      "attr": {
                        "src": function () {return (this.adData.icon||this.adData.w_picurl)}
                      },
                      "style": function () {return (this.style.icon)}
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.adData.appname)}
                      },
                      "style": function () {return (this.style.appname)}
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return '版本'+((this.adData.app_version||''))}
                      },
                      "shown": function () {return (this.adData.app_version)},
                      "style": function () {return (this.style.version)}
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": function () {return (this.adData.publisher)}
                      },
                      "style": function () {return (this.style.publisher)}
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "style": function () {return (this.style.linkContainer)},
                      "children": [
                        {
                          "type": "a",
                          "attr": {
                            "href": function () {return (this.adData.function_link)},
                            "value": "功能"
                          },
                          "style": function () {return (this.style.link)}
                        },
                        {
                          "type": "a",
                          "attr": {
                            "href": function () {return (this.adData.privacy_link)},
                            "value": "隐私"
                          },
                          "style": function () {return (this.style.link)}
                        },
                        {
                          "type": "a",
                          "attr": {
                            "href": function () {return (this.adData.permission_link)},
                            "value": "权限"
                          },
                          "style": function () {return (this.style.link)}
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "立即下载"
                      },
                      "style": function () {return (this.style.button)},
                      "events": {
                        "click": "btnClick"
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-agd-pro-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-agd-pro-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "ad-view",
      "attr": {
        "adunitid": function () {return (this.adOption.ad_id)}
      },
      "shown": function () {return (this.isShow)},
      "events": {
        "render": "adShow",
        "click": "adClick",
        "close": "adClose",
        "error": "adError"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-banner-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-banner-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "wrapper"
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-interstitial-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-interstitial-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "wrapper"
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=int-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/intAd.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=int-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/intAd.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "int-ad"
  ],
  "children": [
    {
      "type": "div",
      "attr": {
        "id": "ad-mask"
      },
      "classList": [
        "mask"
      ],
      "shown": function () {return (this.isAdLoaded)},
      "id": "ad-mask",
      "children": [
        {
          "type": "div",
          "attr": {},
          "events": {
            "appear": "onAdExpose",
            "disappear": "onAdDisappear"
          },
          "classList": [
            "feed-ad-expose"
          ],
          "children": [
            {
              "type": "image",
              "attr": {},
              "style": {
                "width": "1px",
                "height": "1px"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "int-main"
          ],
          "style": function () {return (this.intMainStyle)},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "int-close"
              ],
              "style": function () {return (this.closeStyle)},
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return ((this.countdown))+'s'}
                  },
                  "shown": function () {return (this.countdown&&!this.enableClose)},
                  "events": {
                    "click": "bindTimerClick"
                  },
                  "classList": [
                    "ad-closed-btn-wrap",
                    "ad-close-timer"
                  ],
                  "style": function () {return (this.countDownStyle)}
                },
                {
                  "type": "image",
                  "attr": {
                    "src": "https://render-server.cdn.bcebos.com/static/images/20220629/e1acc81f1440926315591a61bb287948.png"
                  },
                  "shown": function () {return (this.enableClose)},
                  "events": {
                    "click": "bindClose"
                  },
                  "classList": [
                    "ad-closed-btn-wrap"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "int-content"
              ],
              "style": function () {return (this.intContentStyle)},
              "children": [
                {
                  "type": "union-custom",
                  "attr": {
                    "list": function () {return (this.templateConfig)},
                    "templateId": function () {return (this.templateId)}
                  },
                  "events": {
                    "custom-click": "customClick"
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

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=mobads-ad&depends[]=novel-ad&depends[]=int-ad&depends[]=open-ad&depends[]=native-ad&depends[]=reward-ad&depends[]=download-panel&depends[]=novel-books-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/mobadsAd.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=mobads-ad&depends[]=novel-ad&depends[]=int-ad&depends[]=open-ad&depends[]=native-ad&depends[]=reward-ad&depends[]=download-panel&depends[]=novel-books-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/mobadsAd.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "mobads-ad"
  ],
  "events": {
    "click": "onClick"
  },
  "children": [
    {
      "type": "image",
      "attr": {
        "src": function () {return (this.sendLogUrl)}
      },
      "style": {
        "height": "1px",
        "width": "1px"
      }
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.type==='novel')},
      "children": [
        {
          "type": "novel-ad",
          "attr": {
            "channelId": function () {return (this.channelId)},
            "scid": function () {return (this.scid)},
            "websrc": function () {return (this.websrc)},
            "novelAdType": function () {return (this.novelAdType)},
            "landingPage": function () {return (this.landingPage)},
            "backpress": function () {return (this.backpress)}
          },
          "events": {
            "area-click": "areaClick"
          }
        },
        {
          "type": "int-ad",
          "attr": {
            "downloadpanel": function () {return (this.downloadpanel)}
          },
          "shown": function () {return (this.intVisible)},
          "events": {
            "close": "intClose",
            "init-complete": "initComplete",
            "area-click": "areaClick"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (!(this.type==='novel'))},
      "children": [
        {
          "type": "open-ad",
          "attr": {
            "entry": function () {return (this.entry)},
            "openimg": function () {return (this.openimg)},
            "adstyle": function () {return (this.adstyle)},
            "customclose": function () {return (this.customclose)},
            "downloadpanel": function () {return (this.downloadpanel)},
            "shakeSize": function () {return (this.shakeSize)},
            "shakeInterval": function () {return (this.shakeInterval)},
            "isShake": function () {return (this.isShake)},
            "splashrestrict": function () {return (this.splashrestrict)},
            "skiptime": function () {return (this.skiptime)}
          },
          "shown": function () {return (this.type==='rsplash')},
          "events": {
            "area-click": "areaClick"
          }
        },
        {
          "type": "int-ad",
          "attr": {
            "adstyle": function () {return (this.adstyle)},
            "downloadpanel": function () {return (this.downloadpanel)}
          },
          "shown": function () {return (this.type==='int'&&this.intVisible)},
          "events": {
            "close": "intClose",
            "init-complete": "initComplete",
            "area-click": "areaClick"
          }
        },
        {
          "type": "native-ad",
          "attr": {
            "adstyle": function () {return (this.adstyle)},
            "shakeSize": function () {return (this.shakeSize)},
            "shakeInterval": function () {return (this.shakeInterval)},
            "isShake": function () {return (this.isShake)},
            "videoautoplay": function () {return (this.videoautoplay)},
            "videomuted": function () {return (this.videomuted)},
            "downloadpanel": function () {return (this.downloadpanel)},
            "showvolumn": function () {return (this.showvolumn)},
            "templateid": function () {return (this.templateid)},
            "needrefresh": function () {return (this.needrefresh)}
          },
          "shown": function () {return (this.type==='feed'&&this.adVisible)},
          "events": {
            "feedback-click": "showFeedback",
            "area-click": "areaClick",
            "area-touchstart": "areaTouchstart"
          }
        },
        {
          "type": "reward-ad",
          "attr": {
            "adstyle": function () {return (this.adstyle)},
            "downloadpanel": function () {return (this.downloadpanel)},
            "showCountdown": function () {return (this.showCountdown)}
          },
          "shown": function () {return (this.type==='rvideo'&&this.adVisible)},
          "events": {
            "area-click": "areaClick"
          }
        },
        {
          "type": "download-panel",
          "attr": {
            "visible": function () {return (this.panelVisible)}
          },
          "events": {
            "panel-close": "downloadPanelClose",
            "download-click": "downloadClick"
          }
        },
        {
          "type": "novel-books-ad",
          "attr": {
            "channelId": function () {return (this.channelId)},
            "scid": function () {return (this.scid)},
            "websrc": function () {return (this.websrc)},
            "backpress": function () {return (this.backpress)}
          },
          "shown": function () {return (this.type==='novelBookCity')},
          "events": {
            "area-click": "areaClick"
          }
        }
      ]
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/feedAd.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/feedAd.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {
    "id": "feed-ad"
  },
  "classList": [
    "feed-ad"
  ],
  "id": "feed-ad",
  "children": [
    {
      "type": "block",
      "attr": {},
      "shown": function () {return (this.isAdLoaded)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "events": {
            "appear": "onAdExpose",
            "disappear": "onAdDisappear"
          },
          "classList": [
            "feed-ad-expose"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "id": function () {return (this.exposeId)}
              },
              "style": {
                "width": "1px",
                "height": "1px"
              },
              "id": function () {return (this.exposeId)}
            }
          ]
        },
        {
          "type": "union-custom",
          "attr": {
            "list": function () {return (this.templateConfig)},
            "templateId": function () {return (this.templateId)}
          },
          "events": {
            "custom-click": "customClick",
            "custom-touchstart": "customTouchstart"
          }
        }
      ]
    },
    {
      "type": "block",
      "attr": {},
      "shown": function () {return (this.isAdLoaded&&this.isDownloadPanel&&!this.customPanel)},
      "children": [
        {
          "type": "union-custom",
          "attr": {
            "list": function () {return (this.downloadPanelConfig)},
            "templateId": function () {return (this.templateId)}
          },
          "events": {
            "custom-touchstart": "customTouchstart"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad-topon&depends[]=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD-topon/index.ux":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad-topon&depends[]=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD-topon/index.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "page-container"
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
      "type": "topon-ad",
      "attr": {
        "id": function () {return 'topon-ad-'+((this.placementId))},
        "placementId": function () {return (this.placementId)},
        "config": function () {return (this.config)}
      },
      "id": function () {return 'topon-ad-'+((this.placementId))},
      "events": {
        "ad-load": "handleAdLoad",
        "ad-show": "handleAdShow",
        "ad-close": "handleAdClose",
        "ad-click": "handleAdClick",
        "ad-error": "handleAdError"
      }
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelAd.ux":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelAd.ux ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "classList": [
    "novel-ad"
  ],
  "children": [
    {
      "type": "web",
      "attr": {
        "src": function () {return (this.novelUrl)},
        "allowthirdpartycookies": function () {return (this.allow)},
        "trustedurl": function () {return (this.trustedurls)},
        "id": "web"
      },
      "classList": [
        "novel-web"
      ],
      "events": {
        "pagefinish": "onPagefinish",
        "message": "onMessage"
      },
      "id": "web"
    },
    {
      "type": "text",
      "attr": {
        "value": " 加载中… "
      },
      "shown": function () {return (!this.isLoaded)}
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-books-ad&depends[]=tab&depends[]=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelBookCity.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-books-ad&depends[]=tab&depends[]=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelBookCity.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "classList": [
    "novel-second-ad"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.showTopBar)},
      "classList": [
        "tab"
      ],
      "children": [
        {
          "type": "tab",
          "attr": {
            "currentIndex": function () {return (this.topBarIndex)}
          },
          "events": {
            "loading-page": "onloadingPage"
          }
        }
      ]
    },
    {
      "type": "stack",
      "attr": {},
      "classList": function () {return ['web', (!this.showTopBar&&'web-across-top'), (!this.showBottomBar&&'web-across-bottom')]},
      "children": [
        {
          "type": "web",
          "attr": {
            "id": "web",
            "src": function () {return (this.websrc)},
            "allowthirdpartycookies": function () {return (this.allow)},
            "trustedurl": function () {return (this.trustedurls)}
          },
          "id": "web",
          "events": {
            "pagefinish": "onPagefinish",
            "message": "onMessage"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": " 加载中… "
          },
          "shown": function () {return (!this.isLoaded)}
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.showBottomBar)},
      "classList": [
        "bottom-bar"
      ],
      "children": [
        {
          "type": "bottom-bar",
          "attr": {
            "data": "bottomBarData",
            "currentIndex": function () {return (this.bottomBarIndex)}
          },
          "events": {
            "loading-page": "onloadingPage"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=open-ad&depends[]=union-custom&depends[]=ad-logo&depends[]=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/openAd.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=open-ad&depends[]=union-custom&depends[]=ad-logo&depends[]=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/openAd.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {
    "id": "open-screen-ad"
  },
  "style": function () {return (this.style.rootStyle)},
  "id": "open-screen-ad",
  "children": [
    {
      "type": "stack",
      "attr": {},
      "style": function () {return (this.style.containerStyle)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "style": function () {return (this.style.imgWrapStyle)},
          "classList": [
            "imgWrapStyle"
          ],
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return (this.openimg)}
              },
              "style": function () {return (this.style.imgStyle)},
              "events": {
                "error": "imgLoadErr"
              }
            }
          ]
        },
        {
          "type": "stack",
          "attr": {},
          "style": function () {return (this.style.imgWrapStyle)},
          "classList": [
            "imgWrapStyle",
            "openImgWrap"
          ],
          "shown": function () {return (this.isshow)},
          "children": [
            {
              "type": "image",
              "attr": {
                "src": function () {return (this.imgUrl)}
              },
              "style": function () {return (this.style.imgStyle)},
              "events": {
                "complete": "imgLoadCompleted",
                "error": "imgLoadErr"
              }
            },
            {
              "type": "div",
              "attr": {},
              "style": function () {return (this.style.shakeContainerStyle)},
              "shown": function () {return (this.isShake)},
              "children": [
                {
                  "type": "union-custom",
                  "attr": {
                    "list": function () {return (this.templateConfig)},
                    "customstyle": function () {return (this.style.innerCustomStyle)},
                    "shakeInterval": function () {return (this.shakeInterval)}
                  },
                  "events": {
                    "custom-click": "customClick"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "style": function () {return (this.style.adBtnWrapStyle)},
              "shown": function () {return (this.showSplashBtn)},
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "dataId": "open-ad-btn",
                    "value": function () {return (this.btnText)}
                  },
                  "style": function () {return (this.style.adBtnStyle)},
                  "classList": [
                    "open-ad-btn"
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "style": function () {return (this.style.logoWrapStyle)},
              "children": [
                {
                  "type": "ad-logo",
                  "attr": {
                    "entry": function () {return (this.entry)}
                  },
                  "events": {
                    "logo-click": "logoClick"
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "style": function () {return (this.style.closeWrapStyle)},
          "classList": [
            "ad-closed-btn-wrap"
          ],
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return ((this.countdown))+' 跳过'}
              },
              "style": function () {return (this.style.closeBtnStyle)},
              "shown": function () {return (this.closetype===1)},
              "events": {
                "click": "onAdSkip"
              }
            },
            {
              "type": "skip-circle",
              "attr": {
                "content": "跳过",
                "size": function () {return (this.circleSize)},
                "percent": function () {return (this.percent)}
              },
              "events": {
                "click": "onAdSkip"
              },
              "shown": function () {return (this.closetype===5)}
            }
          ]
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return (this.isDownloadPanel)},
      "style": function () {return (this.style.downloadStyle)},
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.adData.appname||'精选推荐')}
          },
          "style": function () {return (this.style.appname)}
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return '版本 '+((this.adData.app_version))}
          },
          "style": function () {return (this.style.version)}
        },
        {
          "type": "text",
          "attr": {
            "value": "功能"
          },
          "style": function () {return (this.style.downloadText)},
          "events": {
            "click": "capabilityClick"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "隐私"
          },
          "style": function () {return (this.style.downloadText)},
          "events": {
            "click": "privacyClick"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": "权限"
          },
          "style": function () {return (this.style.downloadText)},
          "events": {
            "click": "permissionClick"
          }
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.adData.publisher)}
          },
          "style": function () {return (this.style.publisher)}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reward-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/rewardAd.ux":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reward-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/rewardAd.ux ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "reward-ad"
  ],
  "children": [
    {
      "type": "union-custom",
      "attr": {
        "list": function () {return (this.templateConfig)}
      },
      "events": {
        "custom-click": "customClick"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/circle.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/circle.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "style": function () {return (this.style.stackContainer)},
  "children": [
    {
      "type": "canvas",
      "attr": {
        "id": "canvasId"
      },
      "id": "canvasId",
      "style": function () {return (this.style.timerCanvas)}
    },
    {
      "type": "div",
      "attr": {},
      "style": function () {return (this.style.circleContainer)},
      "children": [
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.content)}
          },
          "style": function () {return (this.style.circleText)}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=tab!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/tab.ux":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=tab!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/tab.ux ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "novel-wrapper"
      ],
      "children": [
        {
          "type": "tabs",
          "attr": {
            "index": function () {return (this.curIndex)}
          },
          "classList": [
            "tabs"
          ],
          "events": {
            "change": "onChangeTabIndex"
          },
          "children": [
            {
              "type": "tab-bar",
              "attr": {},
              "classList": [
                "tab-bar"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {
                    "tid": function () {return ((this.$idx))+'}'}
                  },
                  "classList": [
                    "tab-bar-item"
                  ],
                  "repeat": function () {return (this.menu)},
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "tab-bar-text-wrapper"
                      ],
                      "children": [
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return (this.$item)}
                          },
                          "classList": function () {return [(this.curIndex===this.$idx?'tab-bar-text cur-tab':'tab-bar-text')]}
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": function () {return [(this.curIndex===this.$idx?'tab-bar-bg-line':'')]}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "topon-ad-button"
  ],
  "style": function () {return 'width:'+((this.btnStyle.width))+';justify-content: flex-end;}}'},
  "events": {
    "click": "handleClick",
    "touchstart": "handleTouchStart",
    "touchmove": "handleTouchMove",
    "touchend": "handleTouchEnd"
  },
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {return (this.text)}
      },
      "classList": [
        "text"
      ],
      "style": function () {return (this.btnStyle)}
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-clickable-area!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-clickable-area!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "topon-ad-clickable"
  ],
  "events": {
    "click": "handleClick",
    "touchstart": "handleTouchStart",
    "touchmove": "handleTouchMove",
    "touchend": "handleTouchEnd"
  },
  "children": [
    {
      "type": "slot",
      "attr": {}
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-close!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-close!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "stack",
  "attr": {},
  "style": function () {return (this.closeStyle.closeContainer)},
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "topon-ad-close"
      ],
      "style": function () {return (this.closeStyle.closeBtn)},
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "X"
          },
          "classList": [
            "text"
          ],
          "style": function () {return 'color:'+((this.closeStyle.closeBtn.color))+';font-size: '+((this.closeStyle.closeBtn.fontSize))}
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "style": function () {return (this.closeStyle.closeClickArea)},
      "events": {
        "click": "handleClick"
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "masp-logo"
  ],
  "style": function () {return (this.logoStyle.logoContainer)},
  "children": [
    {
      "type": "block",
      "attr": {},
      "shown": function () {return (this.logoUrl)},
      "children": [
        {
          "type": "image",
          "attr": {
            "src": function () {return (this.logoUrl)}
          },
          "style": function () {return (this.logoStyle.logoImg)}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/placement.ux":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/placement.ux ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "style": {
    "width": "100%"
  },
  "children": [
    {
      "type": "div",
      "attr": {},
      "style": {
        "width": "100%"
      },
      "shown": function () {return (this.isShow)},
      "children": [
        {
          "type": "div",
          "attr": {
            "tid": "wfId",
            "show": function () {return (this.item.unit_id===this.hitUnitId)}
          },
          "repeat": {
            "exp": function () {return (this.wfList)},
            "key": "index",
            "value": "item"
          },
          "style": {
            "width": "100%"
          },
          "children": [
            {
              "type": "component",
              "attr": {
                "id": function () {return (this.item.wfId)},
                "adConfig": function () {return (this.mergeConfig)},
                "adOption": function () {return (this.item.wfAdOption)},
                "adExtra": function () {return (this.item.wfAdExtra)}
              },
              "is": function () {return (this.item.wfAdapter)},
              "id": function () {return (this.item.wfId)}
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=union-custom&depends[]=skip-circle&depends[]=ad-logo&depends[]=close-btn&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/custom.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=union-custom&depends[]=skip-circle&depends[]=ad-logo&depends[]=close-btn&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/custom.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {
    "id": function () {return (this.id)}
  },
  "id": function () {return (this.id)},
  "style": function () {return (this.customstyle)},
  "events": {
    "click": function(evt){this.containerClick(null,evt)},
    "touchstart": function(evt){this.containerTouchstart(this.adTouchstart,evt)}
  },
  "children": [
    {
      "type": "block",
      "attr": {},
      "repeat": function () {return (this.list)},
      "children": [
        {
          "type": "text",
          "attr": {
            "id": function () {return (this.$item.id)},
            "value": function () {return (this.$item.value)}
          },
          "shown": function () {return (this.$item.name==='text'&&!this.$item.hidden)},
          "style": function () {return (this.$item.style)},
          "events": {
            "click": function(evt){this.clickHandler(this.$item,evt)}
          },
          "id": function () {return (this.$item.id)}
        },
        {
          "type": "skip-circle",
          "attr": {
            "content": function () {return (this.$item.content)},
            "percent": function () {return (this.$item.percent)},
            "size": function () {return (this.$item.size)}
          },
          "shown": function () {return (this.$item.name==='circle'&&!this.$item.hidden)}
        },
        {
          "type": "video",
          "attr": {
            "controls": function () {return (this.$item.controls)},
            "autoplay": function () {return (this.$item.autoplay)},
            "muted": function () {return (this.$item.muted)},
            "src": function () {return (this.$item.video)},
            "poster": function () {return (this.$item.poster)},
            "id": "info-flow-video"
          },
          "shown": function () {return (this.$item.name==='video'&&!this.$item.hidden)},
          "id": "info-flow-video",
          "style": function () {return (this.$item.style)},
          "events": {
            "pause": function(evt){this.videoPause(this.$item,evt)},
            "error": function(evt){this.videoError(this.$item,evt)},
            "start": function(evt){this.videoStart(this.$item,evt)},
            "click": function(evt){this.clickHandler(this.$item,evt)},
            "prepared": function(evt){this.videoPrepared(this.$item,evt)},
            "finish": function(evt){this.videoFinish(this.$item,evt)},
            "timeupdate": function(evt){this.videoTimeUpdate(this.$item,evt)}
          }
        },
        {
          "type": "image",
          "attr": {
            "src": function () {return (this.$item.value)},
            "id": function () {return (this.$item.id)}
          },
          "style": function () {return (this.$item.style)},
          "classList": [
            "ad-image"
          ],
          "events": {
            "click": function(evt){this.clickHandler(this.$item,evt)}
          },
          "id": function () {return (this.$item.id)},
          "shown": function () {return (this.$item.name==='image'&&!this.$item.hidden)}
        },
        {
          "type": "block",
          "attr": {},
          "shown": function () {return (this.$item.name==='logo'&&!this.$item.hidden)},
          "children": [
            {
              "type": "ad-logo",
              "attr": {
                "itemStyle": function () {return (this.$item.style)}
              }
            }
          ]
        },
        {
          "type": "close-btn",
          "attr": {
            "btnstyle": function () {return (this.$item.style)},
            "imgsrc": function () {return (this.$item.imgsrc)}
          },
          "shown": function () {return (this.$item.name==='close'&&!this.$item.hidden)},
          "events": {
            "click": function(evt){this.clickHandler(this.$item,evt)},
            "touchstart": function(evt){this.touchstartHandler(this.$item,evt)}
          }
        },
        {
          "type": "union-custom",
          "attr": {
            "id": function () {return (this.$item.id)},
            "shakeInterval": function () {return (this.$item.shakeInterval)},
            "list": function () {return (this.$item.children)},
            "customstyle": function () {return (this.$item.style)},
            "templateId": function () {return (this.templateId)},
            "rewardTime": function () {return (this.$item.rewardTime)},
            "adTouchstart": function () {return (this.$item)},
            "bindevent": function () {return (this.$item.bindEvent)},
            "item": function () {return (this.$item)}
          },
          "shown": function () {return (this.$item.name==='layout'&&!this.$item.hidden)},
          "id": function () {return (this.$item.id)},
          "events": {
            "custom-click": "customClick",
            "custom-touchstart": "customTouchstart"
          }
        },
        {
          "type": "stack",
          "attr": {},
          "style": function () {return (this.$item.style)},
          "shown": function () {return (this.$item.name==='stack'&&!this.$item.hidden)},
          "events": {
            "click": function(evt){this.containerClick(this.$item,evt)}
          },
          "children": [
            {
              "type": "block",
              "attr": {},
              "repeat": function () {return (this.$item.children)},
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "id": function () {return (this.$item.id)},
                    "value": function () {return (this.$item.value)}
                  },
                  "shown": function () {return (this.$item.name==='text'&&!this.$item.hidden)},
                  "style": function () {return (this.$item.style)},
                  "id": function () {return (this.$item.id)},
                  "classList": [
                    "$item.animateType"
                  ],
                  "events": {
                    "click": function(evt){this.clickHandler(this.$item,evt)}
                  }
                },
                {
                  "type": "image",
                  "attr": {
                    "src": function () {return (this.$item.value)},
                    "id": function () {return (this.$item.id)}
                  },
                  "style": function () {return (this.$item.style)},
                  "classList": [
                    "ad-image"
                  ],
                  "id": function () {return (this.$item.id)},
                  "events": {
                    "click": function(evt){this.clickHandler(this.$item,evt)}
                  },
                  "shown": function () {return (this.$item.name==='image'&&!this.$item.hidden)}
                },
                {
                  "type": "block",
                  "attr": {},
                  "shown": function () {return (this.$item.name==='logo'&&!this.$item.hidden)},
                  "children": [
                    {
                      "type": "ad-logo",
                      "attr": {
                        "itemStyle": function () {return (this.$item.style)}
                      }
                    }
                  ]
                },
                {
                  "type": "union-custom",
                  "attr": {
                    "id": function () {return (this.$item.id)},
                    "list": function () {return (this.$item.children)},
                    "shakeInterval": function () {return (this.$item.shakeInterval)},
                    "customstyle": function () {return (this.$item.style)},
                    "adTouchstart": function () {return (this.$item)},
                    "bindevent": function () {return (this.$item.bindEvent)},
                    "templateId": function () {return (this.templateId)},
                    "rewardTime": function () {return (this.$item.rewardTime)},
                    "item": function () {return (this.$item)}
                  },
                  "shown": function () {return (this.$item.name==='layout'&&!this.$item.hidden)},
                  "id": function () {return (this.$item.id)},
                  "events": {
                    "custom-click": "customClick",
                    "custom-touchstart": "customTouchstart"
                  }
                },
                {
                  "type": "video",
                  "attr": {
                    "controls": function () {return (this.$item.controls)},
                    "autoplay": function () {return (this.$item.autoplay)},
                    "muted": function () {return (this.$item.muted)},
                    "src": function () {return (this.$item.video)},
                    "poster": function () {return (this.$item.poster)},
                    "id": "info-flow-video"
                  },
                  "shown": function () {return (this.$item.name==='video'&&!this.$item.hidden)},
                  "id": "info-flow-video",
                  "style": function () {return (this.$item.style)},
                  "events": {
                    "click": function(evt){this.clickHandler(this.$item,evt)},
                    "pause": function(evt){this.videoPause(this.$item,evt)},
                    "error": function(evt){this.videoError(this.$item,evt)},
                    "start": function(evt){this.videoStart(this.$item,evt)},
                    "prepared": function(evt){this.videoPrepared(this.$item,evt)},
                    "finish": function(evt){this.videoFinish(this.$item,evt)},
                    "timeupdate": function(evt){this.videoTimeUpdate(this.$item,evt)}
                  }
                },
                {
                  "type": "skip-circle",
                  "attr": {
                    "content": function () {return (this.$item.content)},
                    "percent": function () {return (this.$item.percent)},
                    "size": function () {return (this.$item.size)}
                  },
                  "shown": function () {return (this.$item.name==='circle'&&!this.$item.hidden)}
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-splash-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-splash-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {}
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux?name=adx-native-adapter":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux?name=adx-native-adapter ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../../views/Adx/Native/AdxGraphic.ux?name=adx-graphic */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux?name=adx-graphic")
var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-native-adapter&depends[]=adx-graphic!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-native-adapter&depends[]=adx-graphic!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux")

$app_define$('@app-component/adx-native-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux?name=adx-rewarded-video-adapter":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux?name=adx-rewarded-video-adapter ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-rewarded-video-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux")

$app_define$('@app-component/adx-rewarded-video-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux?name=baidu-interstitial-adapter":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux?name=baidu-interstitial-adapter ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../../../node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad")
var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-interstitial-adapter&depends[]=mobads-ad!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./interstitial.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-interstitial-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./interstitial.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux")

$app_define$('@app-component/baidu-interstitial-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux?name=baidu-native-adapter":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux?name=baidu-native-adapter ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../../../node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad")
var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-native-adapter&depends[]=mobads-ad!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-native-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\native.ux!../../../../less-loader!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\native.ux!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\native.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\native.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux")

$app_define$('@app-component/baidu-native-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux?name=baidu-rewarded-video-adapter":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux?name=baidu-rewarded-video-adapter ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-rewarded-video-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux")

$app_define$('@app-component/baidu-rewarded-video-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux?name=baidu-splash-adapter":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux?name=baidu-splash-adapter ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../../../node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad")
var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-splash-adapter&depends[]=mobads-ad!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./splash.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=baidu-splash-adapter&depends[]=mobads-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\splash.ux!../../../../less-loader!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\Adapter\Baidu\splash.ux!./splash.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\splash.ux!./node_modules/less-loader/dist/cjs.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\Adapter\\Baidu\\splash.ux!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./splash.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux")

$app_define$('@app-component/baidu-splash-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux?name=huawei-agd-pro-native-adapter":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux?name=huawei-agd-pro-native-adapter ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-agd-pro-native-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-agd-pro-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux")

$app_define$('@app-component/huawei-agd-pro-native-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux?name=huawei-banner-adapter":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux?name=huawei-banner-adapter ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-banner-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./banner.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-banner-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./banner.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux")

$app_define$('@app-component/huawei-banner-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux?name=huawei-interstitial-adapter":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux?name=huawei-interstitial-adapter ***!
  \*********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-interstitial-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./interstitial.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-interstitial-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./interstitial.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux")

$app_define$('@app-component/huawei-interstitial-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux?name=huawei-native-adapter":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux?name=huawei-native-adapter ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-native-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux")

$app_define$('@app-component/huawei-native-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux?name=huawei-rewarded-video-adapter":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux?name=huawei-rewarded-video-adapter ***!
  \*************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-rewarded-video-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=huawei-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux")

$app_define$('@app-component/huawei-rewarded-video-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux?name=ylh-native-adapter":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux?name=ylh-native-adapter ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-native-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-native-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./native.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux")

$app_define$('@app-component/ylh-native-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux?name=ylh-rewarded-video-adapter":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux?name=ylh-rewarded-video-adapter ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-rewarded-video-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-rewarded-video-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./rewarded-video.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux")

$app_define$('@app-component/ylh-rewarded-video-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux?name=ylh-splash-adapter":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux?name=ylh-splash-adapter ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-splash-adapter!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./splash.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ylh-splash-adapter!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./splash.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux")

$app_define$('@app-component/ylh-splash-adapter', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/placement.ux?name=topon-ad":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/placement.ux?name=topon-ad ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Adx/native.ux?name=adx-native-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/native.ux?name=adx-native-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Adx/rewarded-video.ux?name=adx-rewarded-video-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Adx/rewarded-video.ux?name=adx-rewarded-video-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Baidu/native.ux?name=baidu-native-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/native.ux?name=baidu-native-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Baidu/rewarded-video.ux?name=baidu-rewarded-video-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/rewarded-video.ux?name=baidu-rewarded-video-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Baidu/interstitial.ux?name=baidu-interstitial-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/interstitial.ux?name=baidu-interstitial-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Baidu/splash.ux?name=baidu-splash-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Baidu/splash.ux?name=baidu-splash-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Ylh/native.ux?name=ylh-native-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/native.ux?name=ylh-native-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Ylh/rewarded-video.ux?name=ylh-rewarded-video-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/rewarded-video.ux?name=ylh-rewarded-video-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Ylh/splash.ux?name=ylh-splash-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Ylh/splash.ux?name=ylh-splash-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Huawei/native.ux?name=huawei-native-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/native.ux?name=huawei-native-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Huawei/rewarded-video.ux?name=huawei-rewarded-video-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/rewarded-video.ux?name=huawei-rewarded-video-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Huawei/banner.ux?name=huawei-banner-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/banner.ux?name=huawei-banner-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/Huawei/interstitial.ux?name=huawei-interstitial-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/Huawei/interstitial.ux?name=huawei-interstitial-adapter")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./Adapter/HuaweiAgdPro/native.ux?name=huawei-agd-pro-native-adapter */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/Adapter/HuaweiAgdPro/native.ux?name=huawei-agd-pro-native-adapter")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./placement.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/placement.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./placement.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/placement.ux")

$app_define$('@app-component/topon-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux?name=top-on-ad-button":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux?name=top-on-ad-button ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-button!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./AdButton.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./AdButton.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux")

$app_define$('@app-component/top-on-ad-button', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux?name=top-on-ad-clickable-area":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux?name=top-on-ad-clickable-area ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-clickable-area!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./AdClickableArea.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-clickable-area!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux")
var $app_style$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\views\Adx\Common\AdClickableArea.ux!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@topon\quick-app-sdk-hw\views\Adx\Common\AdClickableArea.ux!./AdClickableArea.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\views\\Adx\\Common\\AdClickableArea.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@topon\\quick-app-sdk-hw\\views\\Adx\\Common\\AdClickableArea.ux!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./AdClickableArea.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux")

$app_define$('@app-component/top-on-ad-clickable-area', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux?name=top-on-ad-close":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux?name=top-on-ad-close ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-close!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./AdClose.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-close!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./AdClose.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux")

$app_define$('@app-component/top-on-ad-close', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux?name=top-on-ad-logo":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux?name=top-on-ad-logo ***!
  \****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-logo!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./AdLogo.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=top-on-ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./AdLogo.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux")

$app_define$('@app-component/top-on-ad-logo', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux?name=adx-graphic":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux?name=adx-graphic ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../Common/AdButton.ux?name=top-on-ad-button */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdButton.ux?name=top-on-ad-button")
__webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../Common/AdClickableArea.ux?name=top-on-ad-clickable-area */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClickableArea.ux?name=top-on-ad-clickable-area")
__webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../Common/AdClose.ux?name=top-on-ad-close */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdClose.ux?name=top-on-ad-close")
__webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/loader.js?type=component!../Common/AdLogo.ux?name=top-on-ad-logo */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Common/AdLogo.ux?name=top-on-ad-logo")
var $app_template$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-graphic&depends[]=top-on-ad-clickable-area&depends[]=top-on-ad-logo&depends[]=top-on-ad-close&depends[]=top-on-ad-button!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./AdxGraphic.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=adx-graphic&depends[]=top-on-ad-clickable-area&depends[]=top-on-ad-logo&depends[]=top-on-ad-close&depends[]=top-on-ad-button!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux")
var $app_script$ = __webpack_require__(/*! !!../../../../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./AdxGraphic.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/views/Adx/Native/AdxGraphic.ux")

$app_define$('@app-component/adx-graphic', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/bottomBar.ux?name=bottom-bar":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/bottomBar.ux?name=bottom-bar ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-bar!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./bottomBar.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/bottomBar.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\bottomBar.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\bottomBar.ux!./bottomBar.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\bottomBar.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\bottomBar.ux!./node_modules/union-quick-app-ad/components/bottomBar.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./bottomBar.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/bottomBar.ux")

$app_define$('@app-component/bottom-bar', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/circle.ux?name=skip-circle":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/circle.ux?name=skip-circle ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=skip-circle!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./circle.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/circle.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./circle.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/circle.ux")

$app_define$('@app-component/skip-circle', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/closeAdBtn.ux?name=close-btn":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/closeAdBtn.ux?name=close-btn ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=close-btn!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./closeAdBtn.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=close-btn!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/closeAdBtn.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./closeAdBtn.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/closeAdBtn.ux")

$app_define$('@app-component/close-btn', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./custom.ux?name=union-custom */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./logo.ux?name=ad-logo */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/logo.ux?name=ad-logo")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./closeAdBtn.ux?name=close-btn */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/closeAdBtn.ux?name=close-btn")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./circle.ux?name=skip-circle */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/circle.ux?name=skip-circle")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=union-custom&depends[]=skip-circle&depends[]=ad-logo&depends[]=close-btn&depends[]=union-custom!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./custom.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=union-custom&depends[]=skip-circle&depends[]=ad-logo&depends[]=close-btn&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/custom.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\custom.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\custom.ux!./custom.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\custom.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\custom.ux!./node_modules/union-quick-app-ad/components/custom.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./custom.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/custom.ux")

$app_define$('@app-component/union-custom', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/downloadPanel.ux?name=download-panel":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/downloadPanel.ux?name=download-panel ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=download-panel!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./downloadPanel.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=download-panel!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/downloadPanel.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\downloadPanel.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\downloadPanel.ux!./downloadPanel.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\downloadPanel.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\downloadPanel.ux!./node_modules/union-quick-app-ad/components/downloadPanel.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./downloadPanel.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/downloadPanel.ux")

$app_define$('@app-component/download-panel', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/feedAd.ux?name=native-ad":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/feedAd.ux?name=native-ad ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./custom.ux?name=union-custom */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad&depends[]=union-custom!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./feedAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/feedAd.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\feedAd.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\feedAd.ux!./feedAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\feedAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\feedAd.ux!./node_modules/union-quick-app-ad/components/feedAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./feedAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/feedAd.ux")

$app_define$('@app-component/native-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/intAd.ux?name=int-ad":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/intAd.ux?name=int-ad ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./custom.ux?name=union-custom */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=int-ad&depends[]=union-custom!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./intAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=int-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/intAd.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\intAd.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\intAd.ux!./intAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\intAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\intAd.ux!./node_modules/union-quick-app-ad/components/intAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./intAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/intAd.ux")

$app_define$('@app-component/int-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/logo.ux?name=ad-logo":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/logo.ux?name=ad-logo ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ad-logo!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./logo.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=ad-logo!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/logo.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./logo.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/logo.ux")

$app_define$('@app-component/ad-logo', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/mobadsAd.ux?name=mobads-ad ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./feedAd.ux?name=native-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/feedAd.ux?name=native-ad")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./openAd.ux?name=open-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/openAd.ux?name=open-ad")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./intAd.ux?name=int-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/intAd.ux?name=int-ad")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./rewardAd.ux?name=reward-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/rewardAd.ux?name=reward-ad")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./downloadPanel.ux?name=download-panel */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/downloadPanel.ux?name=download-panel")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./novelAd.ux?name=novel-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelAd.ux?name=novel-ad")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./novelBookCity.ux?name=novel-books-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelBookCity.ux?name=novel-books-ad")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=mobads-ad&depends[]=novel-ad&depends[]=int-ad&depends[]=open-ad&depends[]=native-ad&depends[]=reward-ad&depends[]=download-panel&depends[]=novel-books-ad!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./mobadsAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=mobads-ad&depends[]=novel-ad&depends[]=int-ad&depends[]=open-ad&depends[]=native-ad&depends[]=reward-ad&depends[]=download-panel&depends[]=novel-books-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/mobadsAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./mobadsAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/mobadsAd.ux")

$app_define$('@app-component/mobads-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelAd.ux?name=novel-ad":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelAd.ux?name=novel-ad ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-ad!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./novelAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelAd.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelAd.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelAd.ux!./novelAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelAd.ux!./node_modules/union-quick-app-ad/components/novelAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./novelAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelAd.ux")

$app_define$('@app-component/novel-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelBookCity.ux?name=novel-books-ad":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/novelBookCity.ux?name=novel-books-ad ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./tab.ux?name=tab */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/tab.ux?name=tab")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./bottomBar.ux?name=bottom-bar */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/bottomBar.ux?name=bottom-bar")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-books-ad&depends[]=tab&depends[]=bottom-bar!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./novelBookCity.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=novel-books-ad&depends[]=tab&depends[]=bottom-bar!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/novelBookCity.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelBookCity.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\novelBookCity.ux!./novelBookCity.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelBookCity.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\novelBookCity.ux!./node_modules/union-quick-app-ad/components/novelBookCity.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./novelBookCity.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/novelBookCity.ux")

$app_define$('@app-component/novel-books-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/openAd.ux?name=open-ad":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/openAd.ux?name=open-ad ***!
  \**********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./logo.ux?name=ad-logo */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/logo.ux?name=ad-logo")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./circle.ux?name=skip-circle */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/circle.ux?name=skip-circle")
__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./custom.ux?name=union-custom */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=open-ad&depends[]=union-custom&depends[]=ad-logo&depends[]=skip-circle!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./openAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=open-ad&depends[]=union-custom&depends[]=ad-logo&depends[]=skip-circle!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/openAd.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\openAd.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\openAd.ux!./openAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\openAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\openAd.ux!./node_modules/union-quick-app-ad/components/openAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./openAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/openAd.ux")

$app_define$('@app-component/open-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/rewardAd.ux?name=reward-ad":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/rewardAd.ux?name=reward-ad ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/loader.js?type=component!./custom.ux?name=union-custom */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/custom.ux?name=union-custom")
var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reward-ad&depends[]=union-custom!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./rewardAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=reward-ad&depends[]=union-custom!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/rewardAd.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\rewardAd.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\rewardAd.ux!./rewardAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\rewardAd.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\rewardAd.ux!./node_modules/union-quick-app-ad/components/rewardAd.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./rewardAd.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/rewardAd.ux")

$app_define$('@app-component/reward-ad', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/tab.ux?name=tab":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/union-quick-app-ad/components/tab.ux?name=tab ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=tab!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./tab.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=tab!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/union-quick-app-ad/components/tab.ux")
var $app_style$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\tab.ux!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\union-quick-app-ad\components\tab.ux!./tab.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\tab.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\union-quick-app-ad\\components\\tab.ux!./node_modules/union-quick-app-ad/components/tab.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./tab.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/union-quick-app-ad/components/tab.ux")

$app_define$('@app-component/tab', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})


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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD-topon/index.ux?name=native-ad-topon":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD-topon/index.ux?name=native-ad-topon ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../node_modules/@topon/quick-app-sdk-hw/placement.ux?name=topon-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/placement.ux?name=topon-ad")
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad-topon&depends[]=topon-ad!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=native-ad-topon&depends[]=topon-ad!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/ad/nativeAD-topon/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD-topon\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\ad\nativeAD-topon\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD-topon\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\ad\\nativeAD-topon\\index.ux!./src/ad/nativeAD-topon/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/ad/nativeAD-topon/index.ux")

$app_define$('@app-component/native-ad-topon', [], function($app_require$, $app_exports$, $app_module$){
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/Page_cfd-taku/index.ux ***!
  \************************************/
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/nativeAD/index.ux?name=native-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD/index.ux?name=native-ad")
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/nativeAD-topon/index.ux?name=native-ad-topon */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/nativeAD-topon/index.ux?name=native-ad-topon")
__webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../ad/naBannerAd/index.ux?name=nativebanner-ad */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./src/ad/naBannerAd/index.ux?name=nativebanner-ad")
var $app_template$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad-topon!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=native-ad-topon!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/Page_cfd-taku/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd-taku\index.ux!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\Page_cfd-taku\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd-taku\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\Page_cfd-taku\\index.ux!./src/Page_cfd-taku/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/Page_cfd-taku/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFBhZ2VfY2ZkLXRha3VcXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeUlBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFJQTtBQUlBO0FBRUE7QUFHQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0V0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SEE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDalBBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvY29tbW9uLmpzIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9BZHgvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFxBZGFwdGVyXFxBZHhcXG5hdGl2ZS51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvQWR4L2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXEB0b3BvblxccXVpY2stYXBwLXNkay1od1xcQWRhcHRlclxcQWR4XFxyZXdhcmRlZC12aWRlby51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvQmFpZHUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFxBZGFwdGVyXFxCYWlkdVxcaW50ZXJzdGl0aWFsLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXEFkYXB0ZXJcXEJhaWR1XFxuYXRpdmUudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0JhaWR1L2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXEB0b3BvblxccXVpY2stYXBwLXNkay1od1xcQWRhcHRlclxcQmFpZHVcXHJld2FyZGVkLXZpZGVvLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXEFkYXB0ZXJcXEJhaWR1XFxzcGxhc2gudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0h1YXdlaUFnZFByby9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXEFkYXB0ZXJcXEh1YXdlaUFnZFByb1xcbmF0aXZlLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9IdWF3ZWkvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFxBZGFwdGVyXFxIdWF3ZWlcXGJhbm5lci51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvSHVhd2VpL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXEB0b3BvblxccXVpY2stYXBwLXNkay1od1xcQWRhcHRlclxcSHVhd2VpXFxpbnRlcnN0aXRpYWwudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0h1YXdlaS9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXEFkYXB0ZXJcXEh1YXdlaVxcbmF0aXZlLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9IdWF3ZWkvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFxBZGFwdGVyXFxIdWF3ZWlcXHJld2FyZGVkLXZpZGVvLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9ZbGgvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFxBZGFwdGVyXFxZbGhcXG5hdGl2ZS51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvWWxoL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXEB0b3BvblxccXVpY2stYXBwLXNkay1od1xcQWRhcHRlclxcWWxoXFxyZXdhcmRlZC12aWRlby51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvWWxoL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXEB0b3BvblxccXVpY2stYXBwLXNkay1od1xcQWRhcHRlclxcWWxoXFxzcGxhc2gudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXHBsYWNlbWVudC51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3ZpZXdzL0FkeC9Db21tb24vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFx2aWV3c1xcQWR4XFxDb21tb25cXEFkQnV0dG9uLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXHZpZXdzXFxBZHhcXENvbW1vblxcQWRDbGlja2FibGVBcmVhLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFxAdG9wb25cXHF1aWNrLWFwcC1zZGstaHdcXHZpZXdzXFxBZHhcXENvbW1vblxcQWRDbG9zZS51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3ZpZXdzL0FkeC9Db21tb24vZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFx2aWV3c1xcQWR4XFxDb21tb25cXEFkTG9nby51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3ZpZXdzL0FkeC9OYXRpdmUvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFx2aWV3c1xcQWR4XFxOYXRpdmVcXEFkeEdyYXBoaWMudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXGJvdHRvbUJhci51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXHVuaW9uLXF1aWNrLWFwcC1hZFxcY29tcG9uZW50c1xcY2lyY2xlLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFxjbG9zZUFkQnRuLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFxjdXN0b20udXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXGRvd25sb2FkUGFuZWwudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXGZlZWRBZC51eCIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxub2RlX21vZHVsZXNcXHVuaW9uLXF1aWNrLWFwcC1hZFxcY29tcG9uZW50c1xcaW50QWQudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXGxvZ28udXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXG1vYmFkc0FkLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFxub3ZlbEFkLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFxub3ZlbEJvb2tDaXR5LnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFxvcGVuQWQudXgiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcbm9kZV9tb2R1bGVzXFx1bmlvbi1xdWljay1hcHAtYWRcXGNvbXBvbmVudHNcXHJld2FyZEFkLnV4Iiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcdW5pb24tcXVpY2stYXBwLWFkXFxjb21wb25lbnRzXFx0YWIudXgiLCJ3ZWJwYWNrOi8vL3NyYy9QYWdlX2NmZC10YWt1L2Q6XFxxdWlja2FwcFdvcmtzcGFjZVxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxzcmNcXFBhZ2VfY2ZkLXRha3VcXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvYWQvbmFCYW5uZXJBZC9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhZFxcbmFCYW5uZXJBZFxcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vL3NyYy9hZC9uYXRpdmVBRC10b3Bvbi9kOlxccXVpY2thcHBXb3Jrc3BhY2VcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcc3JjXFxhZFxcbmF0aXZlQUQtdG9wb25cXGluZGV4LnV4Iiwid2VicGFjazovLy9zcmMvYWQvbmF0aXZlQUQvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcYWRcXG5hdGl2ZUFEXFxpbmRleC51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9uYXRpdmUudXg/MTQzNyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9zcGxhc2gudXg/ODNkZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9BZENsaWNrYWJsZUFyZWEudXg/ZTMxNyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvYm90dG9tQmFyLnV4PzgwOWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2N1c3RvbS51eD8xMzkwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kb3dubG9hZFBhbmVsLnV4P2QxZjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2ZlZWRBZC51eD80NDc2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9pbnRBZC51eD9mYjA2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9ub3ZlbEFkLnV4PzcyY2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL25vdmVsQm9va0NpdHkudXg/ZTM3YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvb3BlbkFkLnV4P2RjYjAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL3Jld2FyZEFkLnV4PzQ3NzgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL3RhYi51eD9kNjY0Iiwid2VicGFjazovLy8uL3NyYy9QYWdlX2NmZC10YWt1L2luZGV4LnV4PzA2ZWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkL25hQmFubmVyQWQvaW5kZXgudXg/NmExNyIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQtdG9wb24vaW5kZXgudXg/OWFkNiIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXg/YjkyOSIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9jZmQtdGFrdS9pbmRleC51eD9jNTc4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9sb2dvLnV4P2FiOTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3ZpZXdzL0FkeC9OYXRpdmUvQWR4R3JhcGhpYy51eD81NDVhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0FkeC9uYXRpdmUudXg/YTI5NSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9BZHgvcmV3YXJkZWQtdmlkZW8udXg/ODI4ZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9pbnRlcnN0aXRpYWwudXg/MWJhYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9uYXRpdmUudXg/ZjQ3MyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9yZXdhcmRlZC12aWRlby51eD9lYWU3Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0JhaWR1L3NwbGFzaC51eD9hMGQ5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9ib3R0b21CYXIudXg/MjM5MiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvY2xvc2VBZEJ0bi51eD84YjAyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kb3dubG9hZFBhbmVsLnV4P2RkMTYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvSHVhd2VpQWdkUHJvL25hdGl2ZS51eD8zNjY3Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0h1YXdlaS9iYW5uZXIudXg/MzYzMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9IdWF3ZWkvaW50ZXJzdGl0aWFsLnV4PzIzMzMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvSHVhd2VpL25hdGl2ZS51eD8yMDZhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0h1YXdlaS9yZXdhcmRlZC12aWRlby51eD9lZjc4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9pbnRBZC51eD9iNzFkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZC51eD81YjAxIiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC9pbmRleC51eD8yYWE3Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9mZWVkQWQudXg/ZGE0MSIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQtdG9wb24vaW5kZXgudXg/ZTE3NSIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmFCYW5uZXJBZC9pbmRleC51eD8wZTMwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9ub3ZlbEFkLnV4PzkyZGUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL25vdmVsQm9va0NpdHkudXg/NDlmZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvb3BlbkFkLnV4Pzk4MzciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL3Jld2FyZEFkLnV4P2I4ZTMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2NpcmNsZS51eD84ZWUyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy90YWIudXg/YTRkNiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9BZEJ1dHRvbi51eD9kNjc0Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody92aWV3cy9BZHgvQ29tbW9uL0FkQ2xpY2thYmxlQXJlYS51eD9iZDFhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody92aWV3cy9BZHgvQ29tbW9uL0FkQ2xvc2UudXg/Y2I4NyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9BZExvZ28udXg/MDgzZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvcGxhY2VtZW50LnV4P2I1ZGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2N1c3RvbS51eD8wZTE5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL1lsaC9uYXRpdmUudXg/NWU3MSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9ZbGgvcmV3YXJkZWQtdmlkZW8udXg/ZDEzMCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9ZbGgvc3BsYXNoLnV4PzMxYzgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvQWR4L25hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9BZHgvcmV3YXJkZWQtdmlkZW8udXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvQmFpZHUvaW50ZXJzdGl0aWFsLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0JhaWR1L25hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9yZXdhcmRlZC12aWRlby51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9CYWlkdS9zcGxhc2gudXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvSHVhd2VpQWdkUHJvL25hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9IdWF3ZWkvYmFubmVyLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody9BZGFwdGVyL0h1YXdlaS9pbnRlcnN0aXRpYWwudXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvSHVhd2VpL25hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9IdWF3ZWkvcmV3YXJkZWQtdmlkZW8udXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvWWxoL25hdGl2ZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvQWRhcHRlci9ZbGgvcmV3YXJkZWQtdmlkZW8udXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L0FkYXB0ZXIvWWxoL3NwbGFzaC51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvcGxhY2VtZW50LnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody92aWV3cy9BZHgvQ29tbW9uL0FkQnV0dG9uLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody92aWV3cy9BZHgvQ29tbW9uL0FkQ2xpY2thYmxlQXJlYS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L0NvbW1vbi9BZENsb3NlLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AdG9wb24vcXVpY2stYXBwLXNkay1ody92aWV3cy9BZHgvQ29tbW9uL0FkTG9nby51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvdmlld3MvQWR4L05hdGl2ZS9BZHhHcmFwaGljLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9ib3R0b21CYXIudXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2NpcmNsZS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvY2xvc2VBZEJ0bi51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvY3VzdG9tLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9kb3dubG9hZFBhbmVsLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9mZWVkQWQudXgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL2ludEFkLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9sb2dvLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZC51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvbm92ZWxBZC51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvbm92ZWxCb29rQ2l0eS51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvb3BlbkFkLnV4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9yZXdhcmRBZC51eCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pb24tcXVpY2stYXBwLWFkL2NvbXBvbmVudHMvdGFiLnV4Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYUJhbm5lckFkL2luZGV4LnV4Iiwid2VicGFjazovLy8uL3NyYy9hZC9uYXRpdmVBRC10b3Bvbi9pbmRleC51eCIsIndlYnBhY2s6Ly8vLi9zcmMvYWQvbmF0aXZlQUQvaW5kZXgudXg/NjViMSIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvUGFnZV9jZmQtdGFrdS9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB0KHQpe3JldHVybiBmdW5jdGlvbih0KXtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiByKHQpfSh0KXx8ZnVuY3Rpb24odCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmbnVsbCE9dFtTeW1ib2wuaXRlcmF0b3JdfHxudWxsIT10W1wiQEBpdGVyYXRvclwiXSlyZXR1cm4gQXJyYXkuZnJvbSh0KX0odCl8fGZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiByKHQsZSk7dmFyIG89T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLnNsaWNlKDgsLTEpO1wiT2JqZWN0XCI9PT1vJiZ0LmNvbnN0cnVjdG9yJiYobz10LmNvbnN0cnVjdG9yLm5hbWUpO2lmKFwiTWFwXCI9PT1vfHxcIlNldFwiPT09bylyZXR1cm4gQXJyYXkuZnJvbSh0KTtpZihcIkFyZ3VtZW50c1wiPT09b3x8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobykpcmV0dXJuIHIodCxlKX0odCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9KCl9ZnVuY3Rpb24gcih0LHIpeyhudWxsPT1yfHxyPnQubGVuZ3RoKSYmKHI9dC5sZW5ndGgpO2Zvcih2YXIgZT0wLG89bmV3IEFycmF5KHIpO2U8cjtlKyspb1tlXT10W2VdO3JldHVybiBvfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuYmFubmVyU3VwcG9ydFN0eWxlTGlzdD1leHBvcnRzLmFkeEFkYXB0ZXJEaWN0aW9uYXJ5PXZvaWQgMCxleHBvcnRzLmNhbWVsaXplPWZ1bmN0aW9uKHQpe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxlPXIuc2VwYXJhdG9yfHwvXyhcXHcpL2c7cmV0dXJuIHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKGUsKGZ1bmN0aW9uKHQscil7cmV0dXJuIHIudG9VcHBlckNhc2UoKX0pKX0sZXhwb3J0cy5kZUNhbWVsaXplPWZ1bmN0aW9uKHQpe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxlPXIuc2VwYXJhdG9yfHxcIi1cIixvPXIuc3BsaXR8fC8oPz1bQS1aXSkvO3JldHVybiB0LnNwbGl0KG8pLmpvaW4oZSkudG9Mb3dlckNhc2UoKX0sZXhwb3J0cy5kaXNwYXRjaEFkUHJveHlFdmVudD1leHBvcnRzLmRlZmluZUFkUHJveHlDb21wb25lbnQ9dm9pZCAwLGV4cG9ydHMuaXNFbXB0eU9iamVjdD1mdW5jdGlvbih0KXtmb3IodmFyIHIgaW4gdClpZih7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQscikpcmV0dXJuITE7cmV0dXJuITB9LGV4cG9ydHMubndGaXJtSGJEaWN0aW9uYXJ5PWV4cG9ydHMubndGaXJtRGljdGlvbmFyeT12b2lkIDAsZXhwb3J0cy5ud0Zpcm1TdXBwb3J0ZWQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIixyPVwiaGJcIj09PXQ/bzplLG49T2JqZWN0LnZhbHVlcyhyKXx8W107cmV0dXJuIG59LGV4cG9ydHMuc3VwcG9ydFN0eWxlTGlzdD1leHBvcnRzLnJ2U3VwcG9ydFN0eWxlTGlzdD12b2lkIDAsZXhwb3J0cy52YWxpZGF0ZUFkc3R5bGU9ZnVuY3Rpb24ocil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbz0hMSxuPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocikpLHM9ezA6YSwxOmksMjpwfSxjPXNbZV07Zm9yKHZhciBsIGluIG4pYy5pbmNsdWRlcyhsKXx8KG89ITAsY29uc29sZS5lcnJvcihcIlRvcE9u5bm/5ZGK57uE5Lu2Y29uZmlnLnN0eWxl5bGe5oCn77yaXCIuY29uY2F0KGwsXCLmoKHpqozkuI3pgJrov4fvvIzku4XmlK/mjIHku6XkuIvoh6rlrprkuYnmoLflvI/lsZ7mgKc6XCIpLmNvbmNhdCh0KGMpKSkpO3JldHVybiBvfTt2YXIgZT17VklWTzo1NCxPUFBPOjU1LEJBSURVOjU2LEhVQVdFSTo2MCxYSUFPTUk6NjEsSFVBV0VJX0FHRF9QUk86NjIsSE9OT1I6NjMsWUxIOjY0LEFEWDo2Nn07ZXhwb3J0cy5ud0Zpcm1EaWN0aW9uYXJ5PWU7dmFyIG89e1ZJVk86NTQsT1BQTzo1NSxZTEg6NjR9O2V4cG9ydHMubndGaXJtSGJEaWN0aW9uYXJ5PW87ZXhwb3J0cy5hZHhBZGFwdGVyRGljdGlvbmFyeT17MDpcIkFkeE5hdGl2ZUFkYXB0ZXJcIiwxOlwiQWR4UmV3YXJkZWRWaWRlb0FkYXB0ZXJcIiwyOlwiQWR4QmFubmVyQWRhcHRlclwiLDM6XCJBZHhJbnRlcnN0aXRpYWxBZGFwdGVyXCIsNDpcIkFkeFNwbGFzaEFkYXB0ZXJcIn07dmFyIG49ZnVuY3Rpb24odCxyKXt0cnl7aWYodGhpcy5pc0FkRGVzdHJveWVkKXJldHVybjt0aGlzLmFkUHJveHlFdmVudCYmdGhpcy5hZFByb3h5RXZlbnRbdF0mJnRoaXMuYWRQcm94eUV2ZW50W3RdLmNhbGwodGhpcyxyKX1jYXRjaChyKXtjb25zb2xlLmVycm9yKFwiY2FsbCBcIi5jb25jYXQodCkscil9fTtleHBvcnRzLmRpc3BhdGNoQWRQcm94eUV2ZW50PW47ZXhwb3J0cy5kZWZpbmVBZFByb3h5Q29tcG9uZW50PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxyPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fTt0cnl7dGhpcy5hZFRpbWVySWQmJmNsZWFySW50ZXJ2YWwodGhpcy5hZFRpbWVySWQpO3ZhciBlPXNldEludGVydmFsKChmdW5jdGlvbigpe2lmKHQuaXNBZERlc3Ryb3llZHx8IXQuJGFwcCljbGVhckludGVydmFsKGUpO2Vsc2UgaWYodC4kYXBwJiZ0LiRhcHAuJGRlZiYmdC4kYXBwLiRkZWYudG9wb25fc2RrJiZ0LiRhcHAuJGRlZi50b3Bvbl9zZGsuY29tcG9uZW50cyl7Y2xlYXJJbnRlcnZhbChlKTt2YXIgbz10LiRhcHAuJGRlZi50b3Bvbl9zZGsuY29tcG9uZW50c1tyLm5hbWVdW3IuZm9ybWF0XTtvPyhPYmplY3Qua2V5cyhvKS5mb3JFYWNoKChmdW5jdGlvbihyKXt0W3JdPW9bcl19KSksbi5jYWxsKHQsXCJvbkluaXRcIikpOmNvbnNvbGUuZXJyb3IoXCJcIi5jb25jYXQoci5uYW1lLFwiOlwiKS5jb25jYXQoci5mb3JtYXQsXCIgQ29tcG9uZW50IE5vdCBEZWZpbmVcIikpfX0pLDEwKTt0aGlzLmFkVGltZXJJZD1lLHIuY2ImJnIuY2IoKX1jYXRjaCh0KXtjb25zb2xlLmVycm9yKFwiRGVmaW5lIENvbXBvbmVudCBFcnJvclwiLHQpfX07dmFyIGE9W1wiY29udGFpbmVyU3R5bGVcIixcImltZ1N0eWxlXCIsXCJ0aXRsZVN0eWxlXCIsXCJidXR0b25TdHlsZVwiLFwiZGVzY1N0eWxlXCJdO2V4cG9ydHMuc3VwcG9ydFN0eWxlTGlzdD1hO3ZhciBpPVtcInRpdGxlU3R5bGVcIixcImJ1dHRvblN0eWxlXCJdO2V4cG9ydHMucnZTdXBwb3J0U3R5bGVMaXN0PWk7dmFyIHA9W1wibGVmdFwiLFwidG9wXCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdO2V4cG9ydHMuYmFubmVyU3VwcG9ydFN0eWxlTGlzdD1wOyIsImNvbnN0IGRpc3BhdGNoQWRFdmVudD1mdW5jdGlvbih0LGUpe3RyeXt0aGlzLmlzQWREZXN0cm95ZWR8fCh0aGlzLmFkRXZlbnQmJnRoaXMuYWRFdmVudFt0XT90aGlzLmFkRXZlbnRbdF0uY2FsbCh0aGlzLGUpOlwic2hha2VcIj09PXQmJnRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC5hZEV2ZW50JiZ0aGlzLnBhcmVudC5hZEV2ZW50Lm9uQ2xpY2smJnRoaXMucGFyZW50LmFkRXZlbnQub25DbGljay5jYWxsKHRoaXMucGFyZW50LGUpKX1jYXRjaCh0KXt9fSxkZWZpbmVBZENvbXBvbmVudD1mdW5jdGlvbihuKXt0cnl7dGhpcy5hZFRpbWVyJiZjbGVhckludGVydmFsKHRoaXMuYWRUaW1lcik7bGV0IHQ9c2V0SW50ZXJ2YWwoKCk9PntpZih0aGlzLmlzQWREZXN0cm95ZWR8fCF0aGlzLiRhcHApY2xlYXJJbnRlcnZhbCh0KTtlbHNlIGlmKHRoaXMuJGFwcCYmdGhpcy4kYXBwLiRkZWYmJnRoaXMuJGFwcC4kZGVmLnVuaW9uX3F1aWNrX2FwcF9zZGsmJnRoaXMuJGFwcC4kZGVmLnVuaW9uX3F1aWNrX2FwcF9zZGsuY29tcG9uZW50cyl7Y2xlYXJJbnRlcnZhbCh0KTtsZXQgZT10aGlzLiRhcHAuJGRlZi51bmlvbl9xdWlja19hcHBfc2RrLmNvbXBvbmVudHNbbl07ZSYmKE9iamVjdC5rZXlzKGUpLmZvckVhY2godD0+e3RoaXNbdF09ZVt0XX0pLGRpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkluaXRcIikpfX0sMTApO3RoaXMuYWRUaW1lcj10fWNhdGNoKHQpe319LHZhbGlkYXRlQWRzdHlsZT1mdW5jdGlvbih0KXt2YXIgZSxuPVtcImNvbnRhaW5lclN0eWxlXCIsXCJ0aXRsZVN0eWxlXCIsXCJpbWdTdHlsZVwiLFwiYnV0dG9uU3R5bGVcIixcImljb25TdHlsZVwiLFwiZGVzY1N0eWxlXCIsXCJicmFuZFN0eWxlXCIsXCJjbG9zZUJ0blN0eWxlXCIsXCJkb3dubG9hZFN0eWxlXCIsXCJkb3dubG9hZEJyYW5kU3R5bGVcIixcImRvd25sb2FkSWNvblN0eWxlXCIsXCJkb3dubG9hZEJ1dHRvblN0eWxlXCIsXCJkb3dubG9hZFRleHRTdHlsZVwiLFwib3BlbkFkQnRuU3R5bGVcIl07bGV0IGk9ITE7Zm9yKGUgaW4gdD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHQpKSluJiYhfm4uaW5kZXhPZihlKSYmKGNvbnNvbGUubG9nKGDnmb7luqbnvZHnm5/lub/lkYrnu4Tku7ZhZFN0eWxl5bGe5oCn77yaJHtlfeagoemqjOS4jemAmui/h++8jOS7heaUr+aMgeS7peS4i+iHquWumuS5ieagt+W8j+WxnuaApzpgK1suLi5uXSksaT0hMCk7cmV0dXJuIWl9O2V4cG9ydHtkaXNwYXRjaEFkRXZlbnQsZGVmaW5lQWRDb21wb25lbnQsdmFsaWRhdGVBZHN0eWxlfTsiLCI8aW1wb3J0IG5hbWU9XCJhZHgtZ3JhcGhpY1wiIHNyYz1cIi4uLy4uL3ZpZXdzL0FkeC9OYXRpdmUvQWR4R3JhcGhpYy51eFwiPjwvaW1wb3J0PiA8dGVtcGxhdGU+IDxkaXY+IDxkaXYgaWY9XCJ7e2Rpc3BsYXllZH19XCIgY2xhc3M9XCJhZHgtY29udGFpbmVyXCIgaWQ9XCJ0b3Atb24tYWR4LWNvbnRhaW5lci17e2FkT3B0aW9uLl91bml0X2lkfX1cIj4gPGFkeC1ncmFwaGljIGFkLWRhdGE9XCJ7e2N1cnJlbnRBZH19XCIgYWQtc3R5bGU9XCJ7e2FkU3R5bGV9fVwiIHRlbXBsYXRlLWlkPVwie3t0ZW1wbGF0ZUlkfX1cIiBjbG9zZS1idXR0b249XCJ7e2Nsb3NlQnV0dG9ufX1cIiBAY3VzdG9tLXByb3h5LWNsaWNrPVwiYWRDbGlja1wiIEBjdXN0b20tcHJveHktY2xvc2U9XCJhZENsb3NlXCIgQGN1c3RvbS1wcm94eS10b3VjaC1zdGFydD1cImFkVG91Y2hTdGFydFwiIEBjdXN0b20tcHJveHktdG91Y2gtbW92ZT1cImFkVG91Y2hNb3ZlXCIgQGN1c3RvbS1wcm94eS10b3VjaC1lbmQ9XCJhZFRvdWNoRW5kXCIgQGN1c3RvbS1wcm94eS1hcHBlYXI9XCJhZEFwcGVhclwiID4gPC9hZHgtZ3JhcGhpYz4gPC9kaXY+IDwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCwgdmFsaWRhdGVBZHN0eWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgc3R5bGU6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB2YWxpZGF0b3I6IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gdmFsaWRhdGVBZHN0eWxlKG9iaiwgMCkgfSB9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiB7fSwgfSwgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkTGlzdDogW10sIGFkTGlzdEluZGV4SW5Vc2U6IDAsIHJlYWR5OiBmYWxzZSwgdGltZXJJZDogbnVsbCwgbG9ja0FkRXJyb3I6ICcnLCBkaXNwbGF5ZWQ6IGZhbHNlLCBhZFN0eWxlOiB7fSwgYWREZXN0cm95OiBmYWxzZSwgdmFsaWRpdHlUaW1lSWQ6IG51bGwsIHN0YXJ0UG9pbnQ6IHt9LCBlbmRQb2ludDoge30sIGNsaWVudFJlY3Q6IHt9LCBmYWlsVGltZUlkOiBudWxsLCBzdWNjZWVkVGltZUlkOiBmYWxzZSwgZGV2aWNlSW5mb0NhY2hlOiB7fSwgbG9ja0FkQXBwZWFyOiAnJyB9IH0sIGNvbXB1dGVkOiB7IGN1cnJlbnRBZCgpIHsgcmV0dXJuIHRoaXMuYWRMaXN0Py5sZW5ndGggPyB0aGlzLmFkTGlzdFt0aGlzLmFkTGlzdEluZGV4SW5Vc2VdIDoge307IH0sIGFkQ3JlYXRpdmVUeXBlKCkgeyByZXR1cm4gdGhpcy5jdXJyZW50QWQ/LmNydF90eXBlID8/ICcnOyB9LCBjbG9zZUJ1dHRvbigpIHsgcmV0dXJuIHRoaXMuYWRPcHRpb24uY2xvc2VfYnV0dG9uICE9IFwiMVwiOyB9LCB0ZW1wbGF0ZUlkKCkgeyByZXR1cm4gdGhpcy5hZE9wdGlvbj8ubW9kZV90eXBlID8/ICcnIH0gfSwgb25Jbml0KCkgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LmNhbGwodGhpcywgeyBuYW1lOiA2NiwgZm9ybWF0OiAnbmF0aXZlJyB9KSB9LCBvbkRlc3Ryb3koKSB7IGRpc3BhdGNoQWRQcm94eUV2ZW50LmNhbGwodGhpcywgJ29uRGVzdHJveScpOyB9LCBhZENsaWNrIChlKSB7fSwgYWRDbG9zZSAoZSkge30sIGFkVG91Y2hTdGFydCAoZSkge30sIGFkVG91Y2hNb3ZlIChlKSB7fSwgYWRUb3VjaEVuZCAoZSkge30sIGFkQXBwZWFyIChlKSB7fSB9OyA8L3NjcmlwdD4iLCI8dGVtcGxhdGU+IDxkaXY+IDwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCwgdmFsaWRhdGVBZHN0eWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgc3R5bGU6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB2YWxpZGF0b3I6IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gdmFsaWRhdGVBZHN0eWxlKG9iaiwgMSkgfSB9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiB7fSwgfSwgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkTGlzdDogW10sIGFkTGlzdEluZGV4SW5Vc2U6IDAsIHJlYWR5OiBmYWxzZSwgdGltZXJJZDogbnVsbCwgbG9ja0FkRXJyb3I6ICcnLCBhZFN0eWxlOiB7fSwgYWREZXN0cm95OiBmYWxzZSwgdmFsaWRpdHlUaW1lSWQ6IG51bGwsIHN0YXJ0UG9pbnQ6IHt9LCBlbmRQb2ludDoge30sIGNsaWVudFJlY3Q6IHt9LCBmYWlsVGltZUlkOiBudWxsLCBzdWNjZWVkVGltZUlkOiBmYWxzZSwgZGV2aWNlSW5mb0NhY2hlOiB7fSB9IH0sIGNvbXB1dGVkOiB7IGN1cnJlbnRBZCgpIHsgcmV0dXJuIHRoaXMuYWRMaXN0Py5sZW5ndGggPyB0aGlzLmFkTGlzdFt0aGlzLmFkTGlzdEluZGV4SW5Vc2VdIDoge307IH0sIGFkQ3JlYXRpdmVUeXBlKCkgeyByZXR1cm4gdGhpcy5jdXJyZW50QWQ/LmNydF90eXBlID8/ICcnOyB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNjYsIGZvcm1hdDogJ3Jld2FyZGVkVmlkZW8nIH0pIH0sIG9uRGVzdHJveSgpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25EZXN0cm95Jyk7IH0sIH07IDwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cIm1vYmFkcy1hZFwiIHNyYz1cIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZFwiPjwvaW1wb3J0PiA8dGVtcGxhdGU+IDxkaXY+IDxtb2JhZHMtYWQgdHlwZT1cImludFwiIGFwaWQ9XCJ7e2FkT3B0aW9uLnBsYWNlbWVudF9pZH19XCIgYXBwaWQ9XCJ7e2FkT3B0aW9uLmFwcF9pZH19XCIgZG93bmxvYWRwYW5lbD1cInt7ZG93bmxvYWRQYW5lbH19XCIgdmlzaWJsZT1cInt7aXNTaG93fX1cIiBAYWQtbG9hZD1cImFkTG9hZFwiIEBhZC1zaG93PVwiYWRTaG93XCIgQGFkLWNsaWNrPVwiYWRDbGlja1wiIEBhZC1jbG9zZWQ9XCJhZENsb3NlXCIgQGFkLWVycm9yPVwiYWRFcnJvclwiID4gPC9tb2JhZHMtYWQ+IDwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogeyBhZENvbmZpZzogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7IGZpbHRlcjogeyBud0Zpcm1JZHM6IFtdLCB1bml0SWRzOiBbXSwgfSB9LCB9LCBhZE9wdGlvbjogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7fSwgfSwgYWRFeHRyYTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7fSwgfSwgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogXCJcIiwgfSwgfSwgZGF0YSgpIHsgcmV0dXJuIHsgYWQ6IG51bGwsIGlzU2hvdzogZmFsc2UsIHJlYWR5OiBmYWxzZSwgdGltZXJJZDogbnVsbCwgfSB9LCBjb21wdXRlZDogeyBkb3dubG9hZFBhbmVsKCkgeyByZXR1cm4gdGhpcy5hZE9wdGlvbi5kbF90eXBlID09PSBcIjFcIjsgfSwgfSwgb25Jbml0KCkgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LmNhbGwodGhpcywgeyBuYW1lOiA1NiwgZm9ybWF0OiAnaW50ZXJzdGl0aWFsJyB9KTsgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKTsgfSwgbG9hZCgpIHt9LCBzaG93KCkgeyB9LCBhZExvYWQoZSkge30sIGFkU2hvdyhlKSB7fSwgYWRDbGljayhlKSB7fSwgYWRDbG9zZShlKSB7fSwgYWRFcnJvcihlKSB7fSwgfTsgPC9zY3JpcHQ+IiwiPGltcG9ydCBuYW1lPVwibW9iYWRzLWFkXCIgc3JjPVwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3VuaW9uLXF1aWNrLWFwcC1hZC9jb21wb25lbnRzL21vYmFkc0FkXCI+PC9pbXBvcnQ+IDx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cInt7bmF0aXZlQm94Q2xhc3N9fVwiPiA8bW9iYWRzLWFkIGlmPVwie3tpc1Nob3d9fVwiIGFwaWQ9XCJ7e2FkT3B0aW9uLnBsYWNlbWVudF9pZH19XCIgYXBwaWQ9XCJ7e2FkT3B0aW9uLmFwcF9pZH19XCIgZG93bmxvYWRwYW5lbD1cInt7ZG93bmxvYWRQYW5lbH19XCIgdmlkZW9hdXRvcGxheT1cInt7dmlkZW9BdXRvcGxheX19XCIgdmlkZW9tdXRlZD1cInt7dmlkZW9NdXRlZH19XCIgdHlwZT1cImZlZWRcIiByZWZyZXNoPVwie3tyZWZyZXNoVGltZX19XCIgYWRzdHlsZT1cInt7YWRDb25maWcuc3R5bGV9fVwiIHRlbXBsYXRlaWQ9XCJ7e3RlbXBsYXRlSWR9fVwiIEBhZC1sb2FkPVwiYWRMb2FkXCIgQGFkLXNob3c9XCJhZFNob3dcIiBAYWQtY2xpY2s9XCJhZENsaWNrXCIgQGFkLWNsb3NlZD1cImFkQ2xvc2VcIiBAYWQtZXJyb3I9XCJhZEVycm9yXCIgQGRvd25sb2FkLWNsaWNrPVwiYWREb3dubG9hZENsaWNrXCIgPiA8L21vYmFkcy1hZD4gPC9kaXY+IDwvdGVtcGxhdGU+IDxzY3JpcHQ+IGltcG9ydCB7IGRlZmluZUFkUHJveHlDb21wb25lbnQsIGRpc3BhdGNoQWRQcm94eUV2ZW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgc3R5bGU6IHt9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkRXh0cmE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkOiBudWxsLCBpc1Nob3c6IGZhbHNlLCByZWZyZXNoVGltZTogMCwgcmVhZHk6IGZhbHNlLCB0aW1lcklkOiBudWxsLCBkaXNwbGF5ZWQ6IGZhbHNlIH0gfSwgY29tcHV0ZWQ6IHsgZG93bmxvYWRQYW5lbCgpIHsgcmV0dXJuIHRoaXMuYWRPcHRpb24uZGxfdHlwZSA9PT0gXCIxXCI7IH0sIHZpZGVvQXV0b3BsYXkoKSB7IHJldHVybiB0aGlzLmFkT3B0aW9uLnZpZGVvX2F1dG9wbGF5ID09PSBcIjFcIjsgfSwgdmlkZW9NdXRlZCgpIHsgcmV0dXJuIHRoaXMuYWRPcHRpb24udmlkZW9fbXV0ZWQgPT09IFwiMVwiOyB9LCBuYXRpdmVCb3hDbGFzcygpIHsgcmV0dXJuIHRoaXMuZGlzcGxheWVkID8gJ2JhaWR1LW5hdGl2ZS1ib3gnIDogJ2JhaWR1LW5hdGl2ZS1ib3gtLW5vbmUnOyB9LCB0ZW1wbGF0ZUlkKCkgeyByZXR1cm4gdGhpcy5hZENvbmZpZy50ZW1wbGF0ZUlkIHx8ICcnOyB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNTYsIGZvcm1hdDogJ25hdGl2ZScgfSk7IH0sIG9uRGVzdHJveSgpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25EZXN0cm95Jyk7IH0sIHNob3coKSB7IH0sIGFkTG9hZChlKSB7IH0sIGFkU2hvdyhlKSB7IH0sIGFkQ2xpY2soZSkgeyB9LCBhZENsb3NlKGUpIHsgfSwgYWRFcnJvcihlKSB7IH0sIGFkRG93bmxvYWRDbGljayAoKSB7fSB9OyA8L3NjcmlwdD4gPHN0eWxlIGxhbmc9XCJsZXNzXCI+IC5iYWlkdS1uYXRpdmUtYm94IHsgZGlzcGxheTogZmxleDsgd2lkdGg6IDEwMCU7ICYtLW5vbmUgeyBkaXNwbGF5OiBub25lOyB9IH0gPC9zdHlsZT4iLCI8dGVtcGxhdGU+IDxkaXY+PC9kaXY+IDwvdGVtcGxhdGU+IDxzY3JpcHQ+IGltcG9ydCB7IGRlZmluZUFkUHJveHlDb21wb25lbnQsIGRpc3BhdGNoQWRQcm94eUV2ZW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgZmlsdGVyOiB7IG53RmlybUlkczogW10sIHVuaXRJZHM6IFtdLCB9IH0sIH0sIGFkT3B0aW9uOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBpZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiBcIlwiLCB9LCB9LCBkYXRhKCkgeyByZXR1cm4geyBhZDogbnVsbCwgcmVhZHk6IGZhbHNlLCB0aW1lcklkOiBudWxsLCBsb2NrQWRMb2FkOiBmYWxzZSwgfSB9LCBvbkluaXQoKSB7IGRlZmluZUFkUHJveHlDb21wb25lbnQuY2FsbCh0aGlzLCB7IG5hbWU6IDU2LCBmb3JtYXQ6ICdyZXdhcmRlZFZpZGVvJyB9KTsgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKTsgfSwgc2hvdygpIHt9LCBhZExvYWQoZSkgeyB9LCBhZFNob3coZSkge30sIGFkQ2xpY2soZSkge30sIGFkQ2xvc2UoZSkge30sIGFkRXJyb3IoZSkge30sIH07IDwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cIm1vYmFkcy1hZFwiIHNyYz1cIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZFwiPjwvaW1wb3J0PiA8dGVtcGxhdGU+IDxkaXYgY2xhc3M9XCJ1bmlvbi1hZC13cmFwZXIge3tzaG93Q2xhc3NOYW1lfX1cIj4gPG1vYmFkcy1hZCBpZj1cInt7aXNTaG93fX1cIiB0eXBlPVwicnNwbGFzaFwiIGFwaWQ9XCJ7e2FkT3B0aW9uLnBsYWNlbWVudF9pZH19XCIgYXBwaWQ9XCJ7e2FkT3B0aW9uLmFwcF9pZH19XCIgZG93bmxvYWRwYW5lbD1cInt7ZG93bmxvYWRQYW5lbH19XCIgc3BsYXNocmVzdHJpY3Q9XCJ7e3NwbGFzaFJlc3RyaWN0fX1cIiBza2lwdGltZT1cInt7c2tpcFRpbWV9fVwiIGVudHJ5PVwie3thZENvbmZpZy5lbnRyeX19XCIgY3VzdG9tY2xvc2U9XCJ7e3RydWV9fVwiIGFkc3R5bGU9XCJ7e2FkQ29uZmlnLnN0eWxlfX1cIiBAYWQtbG9hZD1cImFkTG9hZFwiIEBhZC1zaG93PVwiYWRTaG93XCIgQGFkLWNsaWNrPVwiYWRDbGlja1wiIEBhZC1jbG9zZWQ9XCJhZENsb3NlXCIgQGFkLWVycm9yPVwiYWRFcnJvclwiID4gPC9tb2JhZHMtYWQ+IDwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogeyBhZENvbmZpZzogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7IGVudHJ5OiBcIi9cIiwgc3R5bGU6IHt9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkRXh0cmE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkOiBudWxsLCBpc1Nob3c6IGZhbHNlLCBzdHlsZTogeyBjbG9zZUJ0blN0eWxlOiB7IHBhZGRpbmdUb3A6IFwiMTAwcHhcIiwgcGFkZGluZ1JpZ2h0OiBcIjUwcHhcIiwgfSwgb3BlbkFkQnRuU3R5bGU6IHsgYm9yZGVyUmFkaXVzOiBcIjUwcHhcIiwgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiLCB9LCB9LCByZWFkeTogZmFsc2UsIHNob3dDbGFzc05hbWU6IFwidW5pb24tYWQtd3JhcGVyLS1oaWRlXCIsIHRpbWVySWQ6IG51bGwsIGxvY2tBZENsb3NlOiBmYWxzZSwgfSB9LCBjb21wdXRlZDogeyBkb3dubG9hZFBhbmVsKCkgeyByZXR1cm4gdGhpcy5hZE9wdGlvbi5kbF90eXBlID09PSBcIjFcIjsgfSwgc3BsYXNoUmVzdHJpY3QoKSB7IGlmICghW1wiMFwiLCBcIjFcIiwgXCIyXCJdLmluY2x1ZGVzKHRoaXMuYWRPcHRpb24uYnV0dG9uX3R5cGUpKSB7IHJldHVybiBcIjBcIjsgfSByZXR1cm4gdGhpcy5hZE9wdGlvbi5idXR0b25fdHlwZTsgfSwgc2tpcFRpbWUoKSB7IGlmICh0aGlzLmFkT3B0aW9uLmNvdW50ZG93biA8IDIpIHsgcmV0dXJuIDI7IH0gZWxzZSBpZiAodGhpcy5hZE9wdGlvbi5jb3VudGRvd24gPiA1KSB7IHJldHVybiA1OyB9IHJldHVybiArdGhpcy5hZE9wdGlvbi5jb3VudGRvd247IH0sIH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNTYsIGZvcm1hdDogJ3NwbGFzaCcgfSkgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKTsgfSwgc2hvdygpIHt9LCBhZExvYWQoZSkge30sIGFkU2hvdyhlKSB7fSwgYWRDbGljayhlKSB7fSwgYWRDbG9zZShlKSB7fSwgYWRFcnJvcihlKSB7fSwgfTsgPC9zY3JpcHQ+IDxzdHlsZSBsYW5nPVwibGVzc1wiPiAudW5pb24tYWQtd3JhcGVyIHsgdG9wOiAwOyBsZWZ0OiAwOyBwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDEwMDsgd2lkdGg6IDEwMCU7IHBvc2l0aW9uOiBmaXhlZDsgei1pbmRleDogMTAwMDAwMDAwOyBoZWlnaHQ6IDA7ICNvcGVuLXNjcmVlbi1hZCB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9IH0gLnVuaW9uLWFkLXdyYXBlci0tc2hvdyB7IGhlaWdodDogMTAwJTsgfSAudW5pb24tYWQtd3JhcGVyLS1oaWRlIHsgaGVpZ2h0OiAwOyB9IDwvc3R5bGU+IiwiPHRlbXBsYXRlPiA8ZGl2PiA8YWQtdmlldyBpZj1cInt7IGlzU2hvdyB9fVwiIGFkdW5pdGlkPVwie3sgYWRPcHRpb24uYWRfaWQgfX1cIiBvbnJlbmRlcj1cImFkU2hvd1wiIG9uY2xpY2s9XCJhZENsaWNrXCIgb25jbG9zZT1cImFkQ2xvc2VcIiBvbmVycm9yPVwiYWRFcnJvclwiPjwvYWQtdmlldz4gPC9kaXY+IDwvdGVtcGxhdGU+IDxzY3JpcHQ+IGltcG9ydCB7IGRlZmluZUFkUHJveHlDb21wb25lbnQsIGRpc3BhdGNoQWRQcm94eUV2ZW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgc3R5bGU6IHt9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkRXh0cmE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGlzU2hvdzogZmFsc2UsIGFkOiBudWxsLCByZWFkeTogZmFsc2UsIGFkTGlzdDogW10sIGFkTGlzdEluZGV4SW5Vc2U6IDAsIGN1cnJlbnRJbmRleFVzZTogMCwgdGltZXJJZDogbnVsbCwgcHJvdmlkZXI6ICcnIH0gfSwgY29tcHV0ZWQ6IHsgY3VycmVudEFkKCkgeyByZXR1cm4gdGhpcy5hZExpc3RbdGhpcy5hZExpc3RJbmRleEluVXNlXSB8fCB7fTsgfSwgYWRJbnRlcmFjdGlvblR5cGUoKSB7IHJldHVybiB0aGlzLmN1cnJlbnRBZD8uaW50ZXJhY3Rpb25UeXBlID8/IDA7IH0sIGlzRG93bmxvYWRBZCgpIHsgcmV0dXJuIHRoaXMuYWRJbnRlcmFjdGlvblR5cGUgPT09IDIgfSwgaXNUZW1wbGF0ZUFkKCkgeyBpZiAodGhpcy5hZE9wdGlvbj8udW5pdF90eXBlID09PSAnMScpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9LCB0ZW1wbGF0ZUFkVHlwZSgpIHsgaWYgKHRoaXMuYWRPcHRpb24/LmFkX3R5cGUgPT09ICcyJykgeyByZXR1cm4gJ2FwcExpc3QnOyB9IHJldHVybiAnaW5mb0NhcmQnOyB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNjIsIGZvcm1hdDogJ25hdGl2ZScgfSkgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKTsgfSwgZ2V0QWQoKSB7IH0sIGFkTG9hZChlKSB7IH0sIGFkU2hvdyhlKSB7IH0sIGFkQ2xpY2soZSkgeyB9LCBhZENsb3NlKGUpIHsgfSwgYWRFcnJvcihlKSB7IH0sIH07IDwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gaW1wb3J0IHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudCwgZGlzcGF0Y2hBZFByb3h5RXZlbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7IGV4cG9ydCBkZWZhdWx0IHsgcHJvcHM6IHsgYWRDb25maWc6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogeyBzdHlsZTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDoge30gfSwgZmlsdGVyOiB7IG53RmlybUlkczogW10sIHVuaXRJZHM6IFtdLCB9IH0sIH0sIGFkT3B0aW9uOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBpZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiBcIlwiLCB9LCB9LCBkYXRhKCkgeyByZXR1cm4geyBhZDogbnVsbCwgcmVhZHk6IGZhbHNlLCB0aW1lcklkOiBudWxsLCBwcm92aWRlcjogJycsIGxvY2tBZExvYWQ6IGZhbHNlIH0gfSwgb25Jbml0KCkgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LmNhbGwodGhpcywgeyBuYW1lOiA2MCwgZm9ybWF0OiAnYmFubmVyJyB9KSB9LCBvbkRlc3Ryb3koKSB7IGRpc3BhdGNoQWRQcm94eUV2ZW50LmNhbGwodGhpcywgJ29uRGVzdHJveScpIH0sIHNob3coKSB7IH0sIGFkTG9hZChlKSB7fSwgYWRTaG93KGUpIHt9LCBhZENsaWNrKGUpIHt9LCBhZENsb3NlKGUpIHt9LCBhZEVycm9yKGUpIHt9LCB9IDwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gaW1wb3J0IHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudCwgZGlzcGF0Y2hBZFByb3h5RXZlbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7IGV4cG9ydCBkZWZhdWx0IHsgcHJvcHM6IHsgYWRDb25maWc6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogeyBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkRXh0cmE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkOiBudWxsLCByZWFkeTogZmFsc2UsIHRpbWVySWQ6IG51bGwsIHByb3ZpZGVyOiAnJyB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNjAsIGZvcm1hdDogJ2ludGVyc3RpdGlhbCcgfSkgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKSB9LCBzaG93KCkge30sIGFkTG9hZChlKSB7fSwgYWRTaG93KGUpIHt9LCBhZENsaWNrKGUpIHt9LCBhZENsb3NlKGUpIHt9LCBhZEVycm9yKGUpIHt9IH0gPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8ZGl2PjwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogeyBhZENvbmZpZzogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7IHN0eWxlOiB7fSwgZmlsdGVyOiB7IG53RmlybUlkczogW10sIHVuaXRJZHM6IFtdLCB9IH0sIH0sIGFkT3B0aW9uOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBpZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiBcIlwiLCB9LCB9LCBkYXRhKCkgeyByZXR1cm4geyBhZDogbnVsbCwgcmVhZHk6IGZhbHNlLCBhZExpc3Q6IFtdLCBhZExpc3RJbmRleEluVXNlOiAwLCBjdXJyZW50SW5kZXhVc2U6IDAsIHRpbWVySWQ6IG51bGwsIHByb3ZpZGVyOiAnJyB9IH0sIGNvbXB1dGVkOiB7IGN1cnJlbnRBZCgpIHsgcmV0dXJuIHRoaXMuYWRMaXN0W3RoaXMuYWRMaXN0SW5kZXhJblVzZV0gfHwge307IH0sIGFkSW50ZXJhY3Rpb25UeXBlKCkgeyByZXR1cm4gdGhpcy5jdXJyZW50QWQ/LmludGVyYWN0aW9uVHlwZSA/PyAwOyB9LCBpc0Rvd25sb2FkQWQoKSB7IHJldHVybiB0aGlzLmFkSW50ZXJhY3Rpb25UeXBlID09PSAyIH0gfSwgb25Jbml0KCkgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LmNhbGwodGhpcywgeyBuYW1lOiA2MCwgZm9ybWF0OiAnbmF0aXZlJyB9KSB9LCBvbkRlc3Ryb3koKSB7IGRpc3BhdGNoQWRQcm94eUV2ZW50LmNhbGwodGhpcywgJ29uRGVzdHJveScpOyB9LCBnZXRBZCgpIHt9LCBhZExvYWQoZSkge30sIGFkU2hvdyhlKSB7fSwgYWRDbGljayhlKSB7fSwgYWRDbG9zZShlKSB7fSwgYWRFcnJvcihlKSB7fSwgfTsgPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8ZGl2PjwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogeyBhZENvbmZpZzogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7IHN0eWxlOiB7fSwgZmlsdGVyOiB7IG53RmlybUlkczogW10sIHVuaXRJZHM6IFtdLCB9IH0sIH0sIGFkT3B0aW9uOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBpZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiBcIlwiLCB9LCB9LCBkYXRhKCkgeyByZXR1cm4geyBhZDogbnVsbCwgcmVhZHk6IGZhbHNlLCB0aW1lcklkOiBudWxsLCBwcm92aWRlcjogJycsIGxvY2tBZExvYWQ6IGZhbHNlLCBzaG93Q2FsbGVkOiBmYWxzZSB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNjAsIGZvcm1hdDogJ3Jld2FyZGVkVmlkZW8nIH0pIH0sIG9uRGVzdHJveSgpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25EZXN0cm95Jyk7IH0sIGdldEFkICgpIHsgcmV0dXJuIHt9IH0sIHNob3coKSB7fSwgYWRMb2FkKGUpIHt9LCBhZFNob3coZSkge30sIGFkQ2xpY2soZSkge30sIGFkQ2xvc2UoZSkge30sIGFkRXJyb3IoZSkge30sIH07IDwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdj4gPC9kaXY+IDwvdGVtcGxhdGU+IDxzY3JpcHQ+IGltcG9ydCB7IGRlZmluZUFkUHJveHlDb21wb25lbnQsIGRpc3BhdGNoQWRQcm94eUV2ZW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiOyBleHBvcnQgZGVmYXVsdCB7IHByb3BzOiB7IGFkQ29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHsgc3R5bGU6IHt9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0gfSwgfSwgYWRPcHRpb246IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkRXh0cmE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IFwiXCIsIH0sIH0sIGRhdGEoKSB7IHJldHVybiB7IGFkTGlzdDogW10sIGFkTGlzdEluZGV4SW5Vc2U6IDAsIHJlYWR5OiBmYWxzZSwgdGltZXJJZDogbnVsbCwgfSB9LCBjb21wdXRlZDogeyB9LCBvbkluaXQoKSB7IGRlZmluZUFkUHJveHlDb21wb25lbnQuY2FsbCh0aGlzLCB7IG5hbWU6IDY0LCBmb3JtYXQ6ICduYXRpdmUnIH0pOyB9LCBvbkRlc3Ryb3koKSB7IGRpc3BhdGNoQWRQcm94eUV2ZW50LmNhbGwodGhpcywgJ29uRGVzdHJveScpOyB9LCBzaG93KCkgeyB9LCBhZExvYWQoZSkgeyB9LCBhZFNob3coZSkgeyB9LCBhZENsaWNrKGUpIHsgfSwgYWRDbG9zZShlKSB7IH0sIGFkRXJyb3IoZSkgeyB9LCB9OyA8L3NjcmlwdD4iLCI8dGVtcGxhdGU+IDxkaXY+IDwvZGl2PiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBpbXBvcnQgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LCBkaXNwYXRjaEFkUHJveHlFdmVudCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogeyBhZENvbmZpZzogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7IHN0eWxlOiB7fSwgZmlsdGVyOiB7IG53RmlybUlkczogW10sIHVuaXRJZHM6IFtdLCB9IH0sIH0sIGFkT3B0aW9uOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBhZEV4dHJhOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IHRydWUsIGRlZmF1bHQ6IHt9LCB9LCBpZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiBcIlwiLCB9LCB9LCBkYXRhKCkgeyByZXR1cm4geyBhZDogbnVsbCwgYWRMaXN0OiBbXSwgcmVhZHk6IGZhbHNlLCB0aW1lcklkOiBudWxsLCBiaWRPZmZlcjoge30sIGlzVmlkZW9FbmRlZDogZmFsc2UgfSB9LCBjb21wdXRlZDogeyB9LCBvbkluaXQoKSB7IGRlZmluZUFkUHJveHlDb21wb25lbnQuY2FsbCh0aGlzLCB7IG5hbWU6IDY0LCBmb3JtYXQ6ICdyZXdhcmRlZFZpZGVvJyB9KTsgfSwgb25EZXN0cm95KCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvbkRlc3Ryb3knKTsgfSwgc2hvdygpIHsgfSwgYWRMb2FkKGUpIHsgfSwgYWRTaG93KGUpIHsgfSwgYWRDbGljayhlKSB7IH0sIGFkQ2xvc2UoZSkgeyB9LCBhZEVycm9yKGUpIHsgfSwgfTsgPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8ZGl2PiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gaW1wb3J0IHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudCwgZGlzcGF0Y2hBZFByb3h5RXZlbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7IGV4cG9ydCBkZWZhdWx0IHsgcHJvcHM6IHsgYWRDb25maWc6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogeyBzdHlsZToge30sIGZpbHRlcjogeyBud0Zpcm1JZHM6IFtdLCB1bml0SWRzOiBbXSwgfSB9LCB9LCBhZE9wdGlvbjogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7fSwgfSwgYWRFeHRyYTogeyB0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiB0cnVlLCBkZWZhdWx0OiB7fSwgfSwgaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogXCJcIiwgfSwgfSwgZGF0YSgpIHsgcmV0dXJuIHsgYWQ6IG51bGwsIGFkTGlzdDogW10sIHJlYWR5OiBmYWxzZSwgdGltZXJJZDogbnVsbCwgYmlkT2ZmZXI6IHt9LCB9IH0sIGNvbXB1dGVkOiB7IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogNjQsIGZvcm1hdDogJ3NwbGFzaCcgfSk7IH0sIG9uRGVzdHJveSgpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25EZXN0cm95Jyk7IH0sIHNob3coKSB7IH0sIGFkTG9hZChlKSB7IH0sIGFkU2hvdyhlKSB7IH0sIGFkQ2xpY2soZSkgeyB9LCBhZENsb3NlKGUpIHsgfSwgYWRFcnJvcihlKSB7IH0sIH07IDwvc2NyaXB0PiIsIiA8aW1wb3J0IG5hbWU9XCJhZHgtbmF0aXZlLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvQWR4L25hdGl2ZS51eFwiPjwvaW1wb3J0PiA8aW1wb3J0IG5hbWU9XCJhZHgtcmV3YXJkZWQtdmlkZW8tYWRhcHRlclwiIHNyYz1cIi4vQWRhcHRlci9BZHgvcmV3YXJkZWQtdmlkZW8udXhcIj48L2ltcG9ydD4gPGltcG9ydCBuYW1lPVwiYmFpZHUtbmF0aXZlLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvQmFpZHUvbmF0aXZlLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cImJhaWR1LXJld2FyZGVkLXZpZGVvLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvQmFpZHUvcmV3YXJkZWQtdmlkZW8udXhcIj48L2ltcG9ydD4gPGltcG9ydCBuYW1lPVwiYmFpZHUtaW50ZXJzdGl0aWFsLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvQmFpZHUvaW50ZXJzdGl0aWFsLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cImJhaWR1LXNwbGFzaC1hZGFwdGVyXCIgc3JjPVwiLi9BZGFwdGVyL0JhaWR1L3NwbGFzaC51eFwiPjwvaW1wb3J0PiA8aW1wb3J0IG5hbWU9XCJ5bGgtbmF0aXZlLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvWWxoL25hdGl2ZS51eFwiPjwvaW1wb3J0PiA8aW1wb3J0IG5hbWU9XCJ5bGgtcmV3YXJkZWQtdmlkZW8tYWRhcHRlclwiIHNyYz1cIi4vQWRhcHRlci9ZbGgvcmV3YXJkZWQtdmlkZW8udXhcIj48L2ltcG9ydD4gPGltcG9ydCBuYW1lPVwieWxoLXNwbGFzaC1hZGFwdGVyXCIgc3JjPVwiLi9BZGFwdGVyL1lsaC9zcGxhc2gudXhcIj48L2ltcG9ydD4gPGltcG9ydCBuYW1lPVwiaHVhd2VpLW5hdGl2ZS1hZGFwdGVyXCIgc3JjPVwiLi9BZGFwdGVyL0h1YXdlaS9uYXRpdmUudXhcIj48L2ltcG9ydD4gPGltcG9ydCBuYW1lPVwiaHVhd2VpLXJld2FyZGVkLXZpZGVvLWFkYXB0ZXJcIiBzcmM9XCIuL0FkYXB0ZXIvSHVhd2VpL3Jld2FyZGVkLXZpZGVvLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cImh1YXdlaS1iYW5uZXItYWRhcHRlclwiIHNyYz1cIi4vQWRhcHRlci9IdWF3ZWkvYmFubmVyLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cImh1YXdlaS1pbnRlcnN0aXRpYWwtYWRhcHRlclwiIHNyYz1cIi4vQWRhcHRlci9IdWF3ZWkvaW50ZXJzdGl0aWFsLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cImh1YXdlaS1hZ2QtcHJvLW5hdGl2ZS1hZGFwdGVyXCIgc3JjPVwiLi9BZGFwdGVyL0h1YXdlaUFnZFByby9uYXRpdmUudXhcIj48L2ltcG9ydD4gPHRlbXBsYXRlPiA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCVcIj4gPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgaWY9XCJ7e2lzU2hvd319XCI+IDxkaXYgZm9yPVwie3soaW5kZXgsIGl0ZW0pIGluIHdmTGlzdH19XCIgdGlkPVwid2ZJZFwiIHNob3c9XCJ7e2l0ZW0udW5pdF9pZCA9PT0gaGl0VW5pdElkfX1cIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgPiA8Y29tcG9uZW50IGlzPVwie3tpdGVtLndmQWRhcHRlcn19XCIgaWQ9XCJ7e2l0ZW0ud2ZJZH19XCIgYWQtY29uZmlnPVwie3ttZXJnZUNvbmZpZ319XCIgYWQtb3B0aW9uPVwie3tpdGVtLndmQWRPcHRpb259fVwiIGFkLWV4dHJhPVwie3tpdGVtLndmQWRFeHRyYX19XCIgPiA8L2NvbXBvbmVudD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gaW1wb3J0IHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudCwgbndGaXJtRGljdGlvbmFyeSwgZGVDYW1lbGl6ZSwgaXNFbXB0eU9iamVjdCwgYWR4QWRhcHRlckRpY3Rpb25hcnksIGRpc3BhdGNoQWRQcm94eUV2ZW50IH0gZnJvbSBcIi4vc2hhcmVkXCI7IGNvbnN0IGRlZmF1bHRDb25maWcgPSB7IHRpbWVvdXQ6IDAsIGVudHJ5OiBcIi9cIiwgc3R5bGU6IHt9LCBmaWx0ZXI6IHsgbndGaXJtSWRzOiBbXSwgdW5pdElkczogW10sIH0sIH07IGV4cG9ydCBkZWZhdWx0IHsgcHJvcHM6IHsgcGxhY2VtZW50SWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogXCJcIiwgfSwgY29uZmlnOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiB7IC4uLmRlZmF1bHRDb25maWcgfSwgfSwgfSwgZGF0YSgpIHsgcmV0dXJuIHsgcmVxdWVzdElkQ291bnQ6IDAsIHJlcXVlc3RJZDogXCJcIiwgaXNBcGlTdWNjZXNzOiBmYWxzZSwgYXBpRGF0YToge30sIGFkT3B0aW9uOiB7fSwgYWR4TGlzdDogW10sIGhiTGlzdDogW10sIHVuaXRMaXN0OiBbXSwgd2ZTY2hlZHVsZXI6IG51bGwsIHdmVW5pdElkc05lZWRSZW5kZXI6IFtdLCBhZEVycm9yTGlzdDogW10sIHBsYWNlbWVudExvYWRTdGFydDogMCwgcGxhY2VtZW50TG9hZEVuZDogMCwgdW5pdExvYWRTdGFydDogMCwgdW5pdExvYWRFbmQ6IDAsIHRpbWVySWQ6IG51bGwsIGFkeEJpZGRpbmdUaW1lSWQ6IG51bGwsIGhiQmlkZGluZ1RpbWVJZDogbnVsbCwgbG9jazogeyBsb2FkOiAnJywgc2hvdzogJycsIGFkTG9hZDogJycsIGFkU2hvdzogJycsIGFkQ2xpY2s6ICcnLCBhZFJld2FyZDogJycsIGFkQ2xvc2U6ICcnLCB9LCBhZHhCaWRkaW5nOiBmYWxzZSwgaGJCaWRkaW5nOiBmYWxzZSwgaGl0VW5pdElkOiBudWxsLCB9IH0sIGNvbXB1dGVkOiB7IHdmTGlzdCgpIHsgbGV0IHdhdGVyZmFsbExpc3QgPSBbXTsgaWYgKCF0aGlzLndmU2NoZWR1bGVyKSB7IHJldHVybiB3YXRlcmZhbGxMaXN0OyB9IGNvbnN0IHN0YXR1c0xpc3RzID0gdGhpcy53ZlNjaGVkdWxlci5nZXRTdGF0dXNMaXN0KCk7IHN0YXR1c0xpc3RzLmZvckVhY2goKHN0YXR1c0xpc3QsIGluZGV4KSA9PiB7IGxldCBpdGVtID0gc3RhdHVzTGlzdC51bml0OyBpdGVtLndmSW5kZXggPSBpbmRleDsgaXRlbS53ZklkID0gdGhpcy5wbGFjZW1lbnRJZCArICcvJyArIGl0ZW0udW5pdF9pZDsgbGV0IGFkYXB0ZXJDbGFzcyA9IGl0ZW0gPy5hZGFwdGVyX2NsYXNzID8/IFwiXCI7IGlmIChpdGVtLm53X2Zpcm1faWQgPT0gNjYpIHsgYWRhcHRlckNsYXNzID0gYWR4QWRhcHRlckRpY3Rpb25hcnlbdGhpcy5mb3JtYXRdOyB9IGl0ZW0ud2ZBZGFwdGVyID0gZGVDYW1lbGl6ZShhZGFwdGVyQ2xhc3MpOyBpdGVtLndmQWRPcHRpb24gPSB0aGlzLmdldFdmQWRPcHRpb24oaXRlbSk7IGl0ZW0ud2ZBZE9wdGlvbi5fdHlwZSA9ICcnICsgc3RhdHVzTGlzdC50eXBlOyBpdGVtLndmQWRFeHRyYSA9IHRoaXMuZ2V0V2ZBZEV4dHJhKGl0ZW0pOyBjb25zdCBzdGF0dXMgPSB0aGlzLndmVW5pdElkc05lZWRSZW5kZXIuaW5jbHVkZXMoaXRlbS51bml0X2lkKTsgaXRlbS53ZlN0YXR1cyA9IHN0YXR1czsgd2F0ZXJmYWxsTGlzdC5wdXNoKGl0ZW0pOyB9KTsgcmV0dXJuIHdhdGVyZmFsbExpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS53ZlN0YXR1cyk7IH0sIGZvcm1hdCgpIHsgcmV0dXJuIHRoaXM/LmFwaURhdGEgPy5mb3JtYXQ7IH0sIHJlcVVnTnVtKCkgeyBjb25zdCBiYWlkdSA9IHRoaXMudW5pdExpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5ud19maXJtX2lkID09PSBud0Zpcm1EaWN0aW9uYXJ5LkJBSURVKTsgaWYgKGJhaWR1Lmxlbmd0aCA+IDAgJiYgWzEsIDRdLmluY2x1ZGVzKHRoaXMuZm9ybWF0KSkgeyByZXR1cm4gMTsgfSBlbHNlIGlmIChbMiwgM10uaW5jbHVkZXModGhpcy5mb3JtYXQpKSB7IHJldHVybiAxOyB9IHJldHVybiB0aGlzPy5hcGlEYXRhID8ucmVxX3VnX251bSB8fCAxOyB9LCBpc1Nob3coKSB7IHJldHVybiAhaXNFbXB0eU9iamVjdCh0aGlzLmFwaURhdGEpOyB9LCBtZXJnZUNvbmZpZygpIHsgcmV0dXJuIHsgLi4uZGVmYXVsdENvbmZpZywgLi4udGhpcy5jb25maWcgfSB9IH0sIG9uSW5pdCgpIHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudC5jYWxsKHRoaXMsIHsgbmFtZTogJ21haW4nLCBmb3JtYXQ6ICdlbnRyeScgfSk7IH0sIG9uRGVzdHJveSgpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25EZXN0cm95Jyk7IH0sIH07IDwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cInRvcG9uLWFkLWJ1dHRvblwiIHN0eWxlPVwid2lkdGg6e3tidG5TdHlsZS53aWR0aH19O2p1c3RpZnktY29udGVudDogZmxleC1lbmQ7fX1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja1wiIEB0b3VjaHN0YXJ0PVwiaGFuZGxlVG91Y2hTdGFydFwiIEB0b3VjaG1vdmU9XCJoYW5kbGVUb3VjaE1vdmVcIiBAdG91Y2hlbmQ9XCJoYW5kbGVUb3VjaEVuZFwiID4gPHRleHQgY2xhc3M9XCJ0ZXh0XCIgc3R5bGU9XCJ7e2J0blN0eWxlfX1cIj57eyB0ZXh0IH19PC90ZXh0PiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gZXhwb3J0IGRlZmF1bHQgeyBuYW1lOiAnVG9wT25BZEJ1dHRvbicsIHByb3BzOiB7IHRleHQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogJycsIH0sIHR5cGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICdpbmZvJywgfSwgcGxhaW46IHsgdHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiBmYWxzZSwgfSwgYnRuU3R5bGU6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB9IH0sIG9uSW5pdCgpIHsgfSwgaGFuZGxlQ2xpY2soZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eUNsaWNrJywgZSk7IH0sIGhhbmRsZVRvdWNoU3RhcnQoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eVRvdWNoU3RhcnQnLCBlKTsgfSwgaGFuZGxlVG91Y2hNb3ZlKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24gJiYgZS5zdG9wUHJvcGFnYXRpb24oKTsgdGhpcy4kZW1pdCgnY3VzdG9tUHJveHlUb3VjaE1vdmUnLCBlKTsgfSwgaGFuZGxlVG91Y2hFbmQoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eVRvdWNoRW5kJywgZSk7IH0gfSA8L3NjcmlwdD4iLCI8dGVtcGxhdGU+IDxkaXYgY2xhc3M9XCJ0b3Bvbi1hZC1jbGlja2FibGVcIiBAY2xpY2s9XCJoYW5kbGVDbGlja1wiIEB0b3VjaHN0YXJ0PVwiaGFuZGxlVG91Y2hTdGFydFwiIEB0b3VjaG1vdmU9XCJoYW5kbGVUb3VjaE1vdmVcIiBAdG91Y2hlbmQ9XCJoYW5kbGVUb3VjaEVuZFwiID4gPHNsb3Q+PC9zbG90PiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gZXhwb3J0IGRlZmF1bHQgeyBuYW1lOiAnVG9wT25BZENsaWNrYWJsZUFyZWEnLCBwcm9wczogeyBpc0NsaWNrYWJsZTogeyB0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogZmFsc2UsIH0gfSwgb25Jbml0KCkgeyB9LCBoYW5kbGVDbGljayhlKSB7IGUuc3RvcFByb3BhZ2F0aW9uICYmIGUuc3RvcFByb3BhZ2F0aW9uKCk7IGlmICghdGhpcy5pc0NsaWNrYWJsZSkgeyByZXR1cm47IH07IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5Q2xpY2snLCBlKTsgfSwgaGFuZGxlVG91Y2hTdGFydChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uICYmIGUuc3RvcFByb3BhZ2F0aW9uKCk7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5VG91Y2hTdGFydCcsIGUpOyB9LCBoYW5kbGVUb3VjaE1vdmUoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eVRvdWNoTW92ZScsIGUpOyB9LCBoYW5kbGVUb3VjaEVuZChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uICYmIGUuc3RvcFByb3BhZ2F0aW9uKCk7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5VG91Y2hFbmQnLCBlKTsgfSB9IDwvc2NyaXB0PiA8c3R5bGU+IC50b3Bvbi1hZC1jbGlja2FibGUgeyB3aWR0aDogMTAwJTsgcG9zaXRpb246IHJlbGF0aXZlOyB9IDwvc3R5bGU+IiwiPHRlbXBsYXRlPiA8c3RhY2sgc3R5bGU9XCJ7e2Nsb3NlU3R5bGUuY2xvc2VDb250YWluZXJ9fVwiPiA8ZGl2IGNsYXNzPVwidG9wb24tYWQtY2xvc2VcIiBzdHlsZT1cInt7Y2xvc2VTdHlsZS5jbG9zZUJ0bn19XCI+IDx0ZXh0IGNsYXNzPVwidGV4dFwiIHN0eWxlPVwiY29sb3I6e3tjbG9zZVN0eWxlLmNsb3NlQnRuLmNvbG9yfX07Zm9udC1zaXplOiB7e2Nsb3NlU3R5bGUuY2xvc2VCdG4uZm9udFNpemV9fVwiPlg8L3RleHQ+IDwvZGl2PiA8ZGl2IHN0eWxlPVwie3tjbG9zZVN0eWxlLmNsb3NlQ2xpY2tBcmVhfX1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja1wiPjwvZGl2PiA8L3N0YWNrPiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBleHBvcnQgZGVmYXVsdCB7IG5hbWU6ICdUb3BPbkFkQ2xvc2UnLCBwcm9wczogeyBjbG9zZVN0eWxlOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiB7IGNsb3NlQnRuOiB7fSB9LCB9IH0sIG9uSW5pdCgpIHsgfSwgaGFuZGxlQ2xpY2soZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eUNsb3NlJywgZSk7IH0sIGNsaWNrQ2F0Y2goZSkgeyBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpOyB9IH0gPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8ZGl2IGNsYXNzPVwibWFzcC1sb2dvXCIgc3R5bGU9XCJ7e2xvZ29TdHlsZS5sb2dvQ29udGFpbmVyfX1cIj4gPGJsb2NrIGlmPVwie3tsb2dvVXJsfX1cIj4gPGltYWdlIHN0eWxlPVwie3tsb2dvU3R5bGUubG9nb0ltZ319XCIgc3JjPVwie3tsb2dvVXJsfX1cIj48L2ltYWdlPiA8L2Jsb2NrPiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gZXhwb3J0IGRlZmF1bHQgeyBuYW1lOiAnVG9wT25BZExvZ28nLCBwcm9wczogeyBsb2dvU3R5bGU6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB9LCBsb2dvVXJsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAnJywgfSwgfSwgb25Jbml0KCkgeyB9IH0gPC9zY3JpcHQ+IiwiPGltcG9ydCBuYW1lPVwidG9wLW9uLWFkLWJ1dHRvblwiIHNyYz1cIi4uL0NvbW1vbi9BZEJ1dHRvbi51eFwiPjwvaW1wb3J0PiA8aW1wb3J0IG5hbWU9XCJ0b3Atb24tYWQtY2xpY2thYmxlLWFyZWFcIiBzcmM9XCIuLi9Db21tb24vQWRDbGlja2FibGVBcmVhLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cInRvcC1vbi1hZC1jbG9zZVwiIHNyYz1cIi4uL0NvbW1vbi9BZENsb3NlLnV4XCI+PC9pbXBvcnQ+IDxpbXBvcnQgbmFtZT1cInRvcC1vbi1hZC1sb2dvXCIgc3JjPVwiLi4vQ29tbW9uL0FkTG9nby51eFwiPjwvaW1wb3J0PiA8dGVtcGxhdGU+IDx0b3Atb24tYWQtY2xpY2thYmxlLWFyZWEgaXMtY2xpY2thYmxlPVwie3tpc0Z1bGxDbGlja2FibGV9fVwiIEBjdXN0b20tcHJveHktY2xpY2s9XCJoYW5kbGVDbGlja1wiIEBjdXN0b20tcHJveHktdG91Y2gtc3RhcnQ9XCJoYW5kbGVUb3VjaFN0YXJ0XCIgQGN1c3RvbS1wcm94eS10b3VjaC1tb3ZlPVwiaGFuZGxlVG91Y2hNb3ZlXCIgQGN1c3RvbS1wcm94eS10b3VjaC1lbmQ9XCJoYW5kbGVUb3VjaEVuZFwiID4gPGRpdiBjbGFzcz1cImxhbmRzY2FwLWFkLWNvbnRhaW5lclwiIHN0eWxlPVwie3thZFN0eWxlLmNvbnRhaW5lclN0eWxlfX1cIiA+IDxkaXYgY2xhc3M9XCJsYW5kc2NhcC1hZC1jb250ZW50XCIgc3R5bGU9XCJ7e2FkU3R5bGUuY29udGVudFN0eWxlfX1cIiBAYXBwZWFyPVwiaGFuZGxlQXBwZWFyXCI+IDxzdGFjayBzdHlsZT1cInt7YWRTdHlsZS5pbWdTdHlsZX19XCI+IDxpbWFnZSBjbGFzcz1cImltYWdlXCIgc3JjPVwie3thZERhdGEuZnVsbF91fX1cIiBzdHlsZT1cInt7YWRTdHlsZS5pbWdQcm9wZXJ0aWVzU3R5bGV9fVwiID48L2ltYWdlPiA8dG9wLW9uLWFkLWxvZ28gbG9nby1zdHlsZT1cInt7YWRTdHlsZS5sb2dvU3R5bGV9fVwiIGxvZ28tdXJsPVwie3thZERhdGEudHBfbG9nb191fX1cIiA+PC90b3Atb24tYWQtbG9nbz4gPGJsb2NrIGlmPVwie3tjbG9zZUJ1dHRvbiAmJiBjbG9zZUF0dGFjaEltZ319XCI+IDx0b3Atb24tYWQtY2xvc2UgQGN1c3RvbS1wcm94eS1jbG9zZT1cImhhbmRsZUNsb3NlXCIgY2xvc2Utc3R5bGU9XCJ7e2FkU3R5bGUuY2xvc2VTdHlsZX19XCIgPjwvdG9wLW9uLWFkLWNsb3NlPiA8L2Jsb2NrPiA8L3N0YWNrPiA8ZGl2IGNsYXNzPVwiYWQtbWFpblwiIHN0eWxlPVwie3thZFN0eWxlLm1haW5TdHlsZX19XCI+IDxkaXYgY2xhc3M9XCJsYW5kc2NhcC1hZC1oZWFkZXJcIiBzdHlsZT1cInt7YWRTdHlsZS5oZWFkZXJTdHlsZX19XCI+IDxkaXYgY2xhc3M9XCJhZC10aXRsZVwiPiA8dGV4dCBjbGFzcz1cInRleHRcIiBzdHlsZT1cInt7YWRTdHlsZS50aXRsZVN0eWxlfX1cIj57eyBhZERhdGEudGl0bGUgfX08L3RleHQ+IDwvZGl2PiA8ZGl2IGNsYXNzPVwiYWQtZGVzY1wiIHN0eWxlPVwie3thZFN0eWxlLmRlc2NTdHlsZX19XCI+IDx0ZXh0IHN0eWxlPVwiY29sb3I6e3thZFN0eWxlLmRlc2NTdHlsZS5jb2xvcn19O2ZvbnQtc2l6ZToge3thZFN0eWxlLmRlc2NTdHlsZS5mb250U2l6ZX19O3RleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO2xpbmVzOiB7e2FkU3R5bGUuZGVzY1N0eWxlLmxpbmVzfX07ZmxleDogMTtmbGV4LXdyYXA6bm93cmFwO1wiID57eyBhZERhdGEuZGVzYyB9fTwvdGV4dCA+IDxibG9jayBpZj1cInt7dGVtcGxhdGVJZCA9PT0gJzInfX1cIj4gPGRpdiBjbGFzcz1cImxhbmRzY2FwLWFkLWZvb3RlclwiIHN0eWxlPVwie3thZFN0eWxlLmZvb3RlclN0eWxlfX1cIj4gPGJsb2NrIGlmPVwie3thZERhdGEuY3RhfX1cIj4gPHRvcC1vbi1hZC1idXR0b24gdGV4dD1cInt7YWREYXRhLmN0YX19XCIgYnRuLXN0eWxlPVwie3thZFN0eWxlLmJ1dHRvblN0eWxlfX1cIiBAY3VzdG9tLXByb3h5LWNsaWNrPVwiaGFuZGxlQ2xpY2tcIiBAY3VzdG9tLXByb3h5LXRvdWNoLXN0YXJ0PVwiaGFuZGxlVG91Y2hTdGFydFwiIEBjdXN0b20tcHJveHktdG91Y2gtbW92ZT1cImhhbmRsZVRvdWNoTW92ZVwiIEBjdXN0b20tcHJveHktdG91Y2gtZW5kPVwiaGFuZGxlVG91Y2hFbmRcIiA+IDwvdG9wLW9uLWFkLWJ1dHRvbj4gPC9ibG9jaz4gPHRvcC1vbi1hZC1jbG9zZSBAY3VzdG9tLXByb3h5LWNsb3NlPVwiaGFuZGxlQ2xvc2VcIiBjbG9zZS1zdHlsZT1cInt7YWRTdHlsZS5jbG9zZVN0eWxlfX1cIiA+PC90b3Atb24tYWQtY2xvc2U+IDwvZGl2PiA8L2Jsb2NrPiA8L2Rpdj4gPC9kaXY+IDxibG9jayBpZj1cInt7dGVtcGxhdGVJZCAhPT0gJzInfX1cIj4gPGJsb2NrIGlmPVwie3thZERhdGEuY3RhfX1cIj4gPGRpdiBjbGFzcz1cImxhbmRzY2FwLWFkLWZvb3RlclwiIHN0eWxlPVwie3thZFN0eWxlLmZvb3RlclN0eWxlfX1cIj4gPHRvcC1vbi1hZC1idXR0b24gdGV4dD1cInt7YWREYXRhLmN0YX19XCIgYnRuLXN0eWxlPVwie3thZFN0eWxlLmJ1dHRvblN0eWxlfX1cIiBAY3VzdG9tLXByb3h5LWNsaWNrPVwiaGFuZGxlQ2xpY2tcIiBAY3VzdG9tLXByb3h5LXRvdWNoLXN0YXJ0PVwiaGFuZGxlVG91Y2hTdGFydFwiIEBjdXN0b20tcHJveHktdG91Y2gtbW92ZT1cImhhbmRsZVRvdWNoTW92ZVwiIEBjdXN0b20tcHJveHktdG91Y2gtZW5kPVwiaGFuZGxlVG91Y2hFbmRcIiA+IDwvdG9wLW9uLWFkLWJ1dHRvbj4gPC9kaXY+IDwvYmxvY2s+IDwvYmxvY2s+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvdG9wLW9uLWFkLWNsaWNrYWJsZS1hcmVhPiA8L3RlbXBsYXRlPiA8c2NyaXB0PiBleHBvcnQgZGVmYXVsdCB7IG5hbWU6ICdUb3BPbkFkeEdyYXBoaWMnLCBwcm9wczogeyBhZERhdGE6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDoge30sIH0sIGFkU3R5bGU6IHsgdHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IHt9LCB9LCB0ZW1wbGF0ZUlkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiAnJywgfSwgY2xvc2VCdXR0b246IHsgdHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiBmYWxzZSB9IH0sIGNvbXB1dGVkOiB7IGlzRnVsbENsaWNrYWJsZSgpIHsgcmV0dXJuIHRoaXMuYWREYXRhPy5jdHJsID8uZV9jX2EgPT09IDE7IH0sIGNsb3NlQXR0YWNoSW1nKCkgeyByZXR1cm4gIXRoaXMudGVtcGxhdGVJZCB8fCBbJzEnLCAnMycsICc0J10uaW5jbHVkZXModGhpcy50ZW1wbGF0ZUlkKSB9LCBjbG9zZUZvbGxvd0J0bigpIHsgcmV0dXJuIFsnMiddLmluY2x1ZGVzKHRoaXMudGVtcGxhdGVJZCkgfSwgY2xvc2VGb2xsb3dUaXRsZSgpIHsgcmV0dXJuIGZhbHNlIH0gfSwgb25Jbml0KCkgeyB9LCBoYW5kbGVDbGljayhlKSB7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5Q2xpY2snLCBlKTsgfSwgaGFuZGxlVG91Y2hTdGFydChlKSB7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5VG91Y2hTdGFydCcsIGUpOyB9LCBoYW5kbGVUb3VjaE1vdmUoZSkgeyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eVRvdWNoTW92ZScsIGUpOyB9LCBoYW5kbGVUb3VjaEVuZChlKSB7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5VG91Y2hFbmQnLCBlKTsgfSwgaGFuZGxlQ2xvc2UoZSkgeyB0aGlzLiRlbWl0KCdjdXN0b21Qcm94eUNsb3NlJywgZSk7IH0sIGhhbmRsZUFwcGVhcihlKSB7IHRoaXMuJGVtaXQoJ2N1c3RvbVByb3h5QXBwZWFyJywgZSk7IH0gfSA8L3NjcmlwdD4iLCI8dGVtcGxhdGU+IDxkaXYgY2xhc3M9XCJib3R0b20tYmFyXCI+IDxzdGFjayBjbGFzcz1cImJvdHRvbS1iYXItaXRlbVwiIGZvcj1cImJvdHRvbUJhclwiIG9uY2xpY2s9XCJvbmNsaWNrQm90dG9tQmFyKCRpZHgpXCI+IDxpbWFnZSBpZj1cInt7JGl0ZW0uaWNvbn19XCIgc3JjPVwie3skaWR4ID09PSBjdXJJbmRleCA/ICRpdGVtLmhpZ2hsaWdodEljb24gOiAkaXRlbS5pY29ufX1cIiBjbGFzcz1cImJvdHRvbS1iYXItaW1nXCI+PC9pbWFnZT4gPHRleHQgY2xhc3M9XCJ7eyRpZHggPT09IGN1ckluZGV4ID8gJ2N1cnJlbnQnIDogJyd9fVwiPnt7JGl0ZW0udGV4dH19PC90ZXh0PiA8L3N0YWNrPiA8L2Rpdj4gPC90ZW1wbGF0ZT48c3R5bGU+LmJvdHRvbS1iYXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTQ0cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmO2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpmaXhlZDtib3R0b206MDtsZWZ0OjB9LmJvdHRvbS1iYXItaXRlbXt3aWR0aDo1MCU7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYm90dG9tLWJhci1pdGVtIGltYWdle3dpZHRoOjYwcHg7aGVpZ2h0OjYwcHg7bWFyZ2luLXRvcDoyMHB4fS5ib3R0b20tYmFyLWl0ZW0gdGV4dHtmb250LWZhbWlseTpQaW5nRmFuZ1NDLVJlZ3VsYXI7Zm9udC1zaXplOjI0cHg7Y29sb3I6I2I4YjhiODt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjQwcHh9LmJvdHRvbS1iYXItaXRlbSAuY3VycmVudHtjb2xvcjojZmY4MjRhfTwvc3R5bGU+PHNjcmlwdD5pbXBvcnR7ZGVmaW5lQWRDb21wb25lbnQsZGlzcGF0Y2hBZEV2ZW50fWZyb21cIi4vY29tbW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHR7cHJvcHM6e2JvdHRvbUJhcjp7dHlwZTpBcnJheSxkZWZhdWx0Olt7aWNvbjpcImh0dHBzOi8vbWluaWFwcC1hZC5iai5iY2Vib3MuY29tL3F1aWNrYXBwL2Jvb2tzaGVsZmdyYXkucG5nXCIsaGlnaGxpZ2h0SWNvbjpcImh0dHBzOi8vbWluaWFwcC1hZC5iai5iY2Vib3MuY29tL3F1aWNrYXBwL2Jvb2tzaGVsZi5wbmdcIix0ZXh0Olwi5Lmm5p62XCJ9LHtpY29uOlwiaHR0cHM6Ly9taW5pYXBwLWFkLmJqLmJjZWJvcy5jb20vcXVpY2thcHAvYm9va2NpdHlncmF5LnBuZ1wiLGhpZ2hsaWdodEljb246XCJodHRwczovL21pbmlhcHAtYWQuYmouYmNlYm9zLmNvbS9xdWlja2FwcC9ib29rY2l0eS5wbmdcIix0ZXh0Olwi5Lmm5Z+OXCJ9XX0sY3VycmVudEluZGV4Ont0eXBlOk51bWJlcixkZWZhdWx0OjB9fSxkYXRhKCl7cmV0dXJue2N1ckluZGV4OjB9fSxvbkluaXQoKXtkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJib3R0b21CYXJcIil9LG9uY2xpY2tCb3R0b21CYXIodCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uY2xpY2tCb3R0b21CYXJcIix0KX19Ozwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPHN0YWNrIHN0eWxlPVwie3tzdHlsZS5zdGFja0NvbnRhaW5lcn19XCI+IDxjYW52YXMgaWQ9XCJjYW52YXNJZFwiIHN0eWxlPVwie3tzdHlsZS50aW1lckNhbnZhc319XCI+PC9jYW52YXM+IDxkaXYgc3R5bGU9XCJ7e3N0eWxlLmNpcmNsZUNvbnRhaW5lcn19XCI+IDx0ZXh0IHN0eWxlPVwie3tzdHlsZS5jaXJjbGVUZXh0fX1cIj57e2NvbnRlbnR9fTwvdGV4dD4gPC9kaXY+IDwvc3RhY2s+IDwvdGVtcGxhdGU+PHNjcmlwdD5pbXBvcnR7ZGVmaW5lQWRDb21wb25lbnQsZGlzcGF0Y2hBZEV2ZW50fWZyb21cIi4vY29tbW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHR7cHJvcHM6W1wicGVyY2VudFwiLFwiY29udGVudFwiLFwic2l6ZVwiXSxkYXRhKCl7cmV0dXJue3N0eWxlOnt9LGNpcmNsZVNpemU6XCJcIn19LG9uSW5pdCgpe3RoaXMuJHdhdGNoKFwicGVyY2VudFwiLFwid2F0Y2hQZXJjZW50Q2hhbmdlXCIpLGRlZmluZUFkQ29tcG9uZW50LmNhbGwodGhpcyxcImNpcmNsZVwiKX0sd2F0Y2hQZXJjZW50Q2hhbmdlKGUsdCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uUGVyY2VudENoYW5nZVwiLGUpfX07PC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8ZGl2IGNsYXNzPVwiY2xvc2UtYnRuXCIgc3R5bGU9XCJ7e2J0bnN0eWxlfX1cIj4gPGltYWdlIGlmPVwie3tjbG9zZUltZ319XCIgc3JjPVwie3tjbG9zZUltZ319XCIgc3R5bGU9XCJ7e2Nsb3NlSW1nU3R5bGV9fVwiPjwvaW1hZ2U+IDx0ZXh0IGlmPVwie3tjbG9zZVRleHR9fVwiIHN0eWxlPVwiY29sb3I6e3tidG5zdHlsZS5jb2xvcn19XCIgY2xhc3M9XCJjbG9zZWJ0bi10ZXh0XCI+e3tjbG9zZVRleHR9fTwvdGV4dD4gPC9kaXY+IDwvdGVtcGxhdGU+PHNjcmlwdD5pbXBvcnR7ZGVmaW5lQWRDb21wb25lbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtwcm9wczpbXCJpbWdzcmNcIixcInRleHRcIixcImJ0bnN0eWxlXCJdLGRhdGE6e2Nsb3NlSW1nOlwiXCIsY2xvc2VUZXh0OlwiXCIsY2xvc2VJbWdTdHlsZTpcIlwifSxvbkluaXQoKXtkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJjbG9zZUFkQnRuXCIpfX07PC9zY3JpcHQ+IiwiPGltcG9ydCBzcmM9XCIuL2N1c3RvbS51eFwiIG5hbWU9XCJ1bmlvbi1jdXN0b21cIj48L2ltcG9ydD5cbjxpbXBvcnQgc3JjPVwiLi9sb2dvLnV4XCIgbmFtZT1cImFkLWxvZ29cIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cImNsb3NlLWJ0blwiIHNyYz1cIi4vY2xvc2VBZEJ0bi51eFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwic2tpcC1jaXJjbGVcIiBzcmM9XCIuL2NpcmNsZS51eFwiPjwvaW1wb3J0PlxuXG48dGVtcGxhdGU+IDxkaXYgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cInt7Y3VzdG9tc3R5bGV9fVwiIEBjbGljaz1cImNvbnRhaW5lckNsaWNrKG51bGwpXCIgQHRvdWNoc3RhcnQ9XCJjb250YWluZXJUb3VjaHN0YXJ0KGFkVG91Y2hzdGFydClcIj4gPGJsb2NrIGZvcj1cInt7bGlzdH19XCI+IDx0ZXh0IGlmPVwie3skaXRlbS5uYW1lID09PSAndGV4dCcgJiYgISRpdGVtLmhpZGRlbn19XCIgc3R5bGU9XCJ7eyRpdGVtLnN0eWxlfX1cIiBAY2xpY2s9XCJjbGlja0hhbmRsZXIoJGl0ZW0pXCIgaWQ9XCJ7eyRpdGVtLmlkfX1cIj57eyAkaXRlbS52YWx1ZSB9fTwvdGV4dD4gPHNraXAtY2lyY2xlIGlmPVwie3skaXRlbS5uYW1lID09PSAnY2lyY2xlJyAmJiAhJGl0ZW0uaGlkZGVufX1cIiBjb250ZW50PVwie3skaXRlbS5jb250ZW50fX1cIiBwZXJjZW50PVwie3skaXRlbS5wZXJjZW50fX1cIiBzaXplPVwie3skaXRlbS5zaXplfX1cIj48L3NraXAtY2lyY2xlPiA8dmlkZW8gaWY9XCJ7eyRpdGVtLm5hbWUgPT09ICd2aWRlbycgJiYgISRpdGVtLmhpZGRlbn19XCIgY29udHJvbHM9XCJ7eyRpdGVtLmNvbnRyb2xzfX1cIiBhdXRvcGxheT1cInt7JGl0ZW0uYXV0b3BsYXl9fVwiIG11dGVkPVwie3skaXRlbS5tdXRlZH19XCIgc3JjPVwie3skaXRlbS52aWRlb319XCIgcG9zdGVyPVwie3skaXRlbS5wb3N0ZXJ9fVwiIGlkPVwiaW5mby1mbG93LXZpZGVvXCIgc3R5bGU9XCJ7eyRpdGVtLnN0eWxlfX1cIiBAcGF1c2U9XCJ2aWRlb1BhdXNlKCRpdGVtKVwiIEBlcnJvcj1cInZpZGVvRXJyb3IoJGl0ZW0pXCIgQHN0YXJ0PVwidmlkZW9TdGFydCgkaXRlbSlcIiBAY2xpY2s9XCJjbGlja0hhbmRsZXIoJGl0ZW0pXCIgQHByZXBhcmVkPVwidmlkZW9QcmVwYXJlZCgkaXRlbSlcIiBAZmluaXNoPVwidmlkZW9GaW5pc2goJGl0ZW0pXCIgQHRpbWV1cGRhdGU9XCJ2aWRlb1RpbWVVcGRhdGUoJGl0ZW0pXCI+PC92aWRlbz4gPGltYWdlIHN0eWxlPVwie3skaXRlbS5zdHlsZX19XCIgc3JjPVwie3sgJGl0ZW0udmFsdWUgfX1cIiBjbGFzcz1cImFkLWltYWdlXCIgQGNsaWNrPVwiY2xpY2tIYW5kbGVyKCRpdGVtKVwiIGlkPVwie3skaXRlbS5pZH19XCIgaWY9XCJ7eyRpdGVtLm5hbWUgPT09ICdpbWFnZScgJiYgISRpdGVtLmhpZGRlbn19XCI+PC9pbWFnZT4gPGJsb2NrIGlmPVwie3skaXRlbS5uYW1lID09PSAnbG9nbycgJiYgISRpdGVtLmhpZGRlbn19XCI+IDxhZC1sb2dvIGl0ZW0tc3R5bGU9XCJ7eyAkaXRlbS5zdHlsZSB9fVwiPjwvYWQtbG9nbz4gPC9ibG9jaz4gPGNsb3NlLWJ0biBpZj1cInt7JGl0ZW0ubmFtZSA9PT0gJ2Nsb3NlJyAmJiAhJGl0ZW0uaGlkZGVufX1cIiBidG5zdHlsZT1cInt7JGl0ZW0uc3R5bGV9fVwiIGltZ3NyYz1cInt7JGl0ZW0uaW1nc3JjfX1cIiBAY2xpY2s9XCJjbGlja0hhbmRsZXIoJGl0ZW0pXCIgQHRvdWNoc3RhcnQ9XCJ0b3VjaHN0YXJ0SGFuZGxlcigkaXRlbSlcIj48L2Nsb3NlLWJ0bj4gPHVuaW9uLWN1c3RvbSBpZj1cInt7JGl0ZW0ubmFtZSA9PT0gJ2xheW91dCcgJiYgISRpdGVtLmhpZGRlbn19XCIgaWQ9XCJ7eyRpdGVtLmlkfX1cIiBzaGFrZS1pbnRlcnZhbD1cInt7JGl0ZW0uc2hha2VJbnRlcnZhbH19XCIgbGlzdD1cInt7JGl0ZW0uY2hpbGRyZW59fVwiIGN1c3RvbXN0eWxlPVwie3skaXRlbS5zdHlsZX19XCIgdGVtcGxhdGUtaWQ9XCJ7e3RlbXBsYXRlSWR9fVwiIHJld2FyZC10aW1lPVwie3skaXRlbS5yZXdhcmRUaW1lfX1cIiBhZC10b3VjaHN0YXJ0PVwie3skaXRlbX19XCIgYmluZGV2ZW50PVwie3skaXRlbS5iaW5kRXZlbnR9fVwiIGl0ZW09XCJ7eyRpdGVtfX1cIiBAY3VzdG9tLWNsaWNrPVwiY3VzdG9tQ2xpY2tcIiBAY3VzdG9tLXRvdWNoc3RhcnQ9XCJjdXN0b21Ub3VjaHN0YXJ0XCI+PC91bmlvbi1jdXN0b20+IDxzdGFjayBzdHlsZT1cInt7JGl0ZW0uc3R5bGV9fVwiIGlmPVwie3skaXRlbS5uYW1lID09PSAnc3RhY2snICYmICEkaXRlbS5oaWRkZW59fVwiIEBjbGljaz1cImNvbnRhaW5lckNsaWNrKCRpdGVtKVwiPiA8YmxvY2sgZm9yPVwie3skaXRlbS5jaGlsZHJlbn19XCI+IDx0ZXh0IGlmPVwie3skaXRlbS5uYW1lID09PSAndGV4dCcgJiYgISRpdGVtLmhpZGRlbn19XCIgc3R5bGU9XCJ7eyRpdGVtLnN0eWxlfX1cIiBpZD1cInt7JGl0ZW0uaWR9fVwiIGNsYXNzPVwiJGl0ZW0uYW5pbWF0ZVR5cGVcIiBAY2xpY2s9XCJjbGlja0hhbmRsZXIoJGl0ZW0pXCI+e3sgJGl0ZW0udmFsdWUgfX08L3RleHQ+IDxpbWFnZSBzdHlsZT1cInt7JGl0ZW0uc3R5bGV9fVwiIHNyYz1cInt7ICRpdGVtLnZhbHVlIH19XCIgY2xhc3M9XCJhZC1pbWFnZVwiIGlkPVwie3skaXRlbS5pZH19XCIgQGNsaWNrPVwiY2xpY2tIYW5kbGVyKCRpdGVtKVwiIGlmPVwie3skaXRlbS5uYW1lID09PSAnaW1hZ2UnICYmICEkaXRlbS5oaWRkZW59fVwiPjwvaW1hZ2U+IDxibG9jayBpZj1cInt7JGl0ZW0ubmFtZSA9PT0gJ2xvZ28nICYmICEkaXRlbS5oaWRkZW59fVwiPiA8YWQtbG9nbyBpdGVtLXN0eWxlPVwie3sgJGl0ZW0uc3R5bGUgfX1cIj48L2FkLWxvZ28+IDwvYmxvY2s+IDx1bmlvbi1jdXN0b20gaWY9XCJ7eyRpdGVtLm5hbWUgPT09ICdsYXlvdXQnICYmICEkaXRlbS5oaWRkZW59fVwiIGlkPVwie3skaXRlbS5pZH19XCIgbGlzdD1cInt7JGl0ZW0uY2hpbGRyZW59fVwiIHNoYWtlLWludGVydmFsPVwie3skaXRlbS5zaGFrZUludGVydmFsfX1cIiBjdXN0b21zdHlsZT1cInt7JGl0ZW0uc3R5bGV9fVwiIGFkLXRvdWNoc3RhcnQ9XCJ7eyRpdGVtfX1cIiBiaW5kZXZlbnQ9XCJ7eyRpdGVtLmJpbmRFdmVudH19XCIgdGVtcGxhdGUtaWQ9XCJ7e3RlbXBsYXRlSWR9fVwiIHJld2FyZC10aW1lPVwie3skaXRlbS5yZXdhcmRUaW1lfX1cIiBAY3VzdG9tLWNsaWNrPVwiY3VzdG9tQ2xpY2tcIiBAY3VzdG9tLXRvdWNoc3RhcnQ9XCJjdXN0b21Ub3VjaHN0YXJ0XCIgaXRlbT1cInt7JGl0ZW19fVwiPjwvdW5pb24tY3VzdG9tPiA8dmlkZW8gaWY9XCJ7eyRpdGVtLm5hbWUgPT09ICd2aWRlbycgJiYgISRpdGVtLmhpZGRlbn19XCIgY29udHJvbHM9XCJ7eyRpdGVtLmNvbnRyb2xzfX1cIiBhdXRvcGxheT1cInt7JGl0ZW0uYXV0b3BsYXl9fVwiIG11dGVkPVwie3skaXRlbS5tdXRlZH19XCIgc3JjPVwie3skaXRlbS52aWRlb319XCIgcG9zdGVyPVwie3skaXRlbS5wb3N0ZXJ9fVwiIGlkPVwiaW5mby1mbG93LXZpZGVvXCIgc3R5bGU9XCJ7eyRpdGVtLnN0eWxlfX1cIiBAY2xpY2s9XCJjbGlja0hhbmRsZXIoJGl0ZW0pXCIgQHBhdXNlPVwidmlkZW9QYXVzZSgkaXRlbSlcIiBAZXJyb3I9XCJ2aWRlb0Vycm9yKCRpdGVtKVwiIEBzdGFydD1cInZpZGVvU3RhcnQoJGl0ZW0pXCIgQHByZXBhcmVkPVwidmlkZW9QcmVwYXJlZCgkaXRlbSlcIiBAZmluaXNoPVwidmlkZW9GaW5pc2goJGl0ZW0pXCIgQHRpbWV1cGRhdGU9XCJ2aWRlb1RpbWVVcGRhdGUoJGl0ZW0pXCI+PC92aWRlbz4gPHNraXAtY2lyY2xlIGlmPVwie3skaXRlbS5uYW1lID09PSAnY2lyY2xlJyAmJiAhJGl0ZW0uaGlkZGVufX1cIiBjb250ZW50PVwie3skaXRlbS5jb250ZW50fX1cIiBwZXJjZW50PVwie3skaXRlbS5wZXJjZW50fX1cIiBzaXplPVwie3skaXRlbS5zaXplfX1cIj48L3NraXAtY2lyY2xlPiA8L2Jsb2NrPiA8L3N0YWNrPiA8L2Jsb2NrPiA8L2Rpdj4gPC90ZW1wbGF0ZT48c3R5bGU+LmFkLWltYWdle3dpZHRoOjEwMCV9PC9zdHlsZT48c2NyaXB0PmltcG9ydHtkaXNwYXRjaEFkRXZlbnQsZGVmaW5lQWRDb21wb25lbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtwcm9wczpbXCJsaXN0XCIsXCJjdXN0b21zdHlsZVwiLFwiaXRlbVwiLFwiYmluZGV2ZW50XCIsXCJpZFwiLFwic2hha2VJbnRlcnZhbFwiLFwiYWRUb3VjaHN0YXJ0XCIsXCJ0ZW1wbGF0ZUlkXCIsXCJyZXdhcmRUaW1lXCJdLGRhdGEoKXtyZXR1cm57fX0sb25Jbml0KCl7ZGVmaW5lQWRDb21wb25lbnQuY2FsbCh0aGlzLFwiY3VzdG9tXCIpfSxjbGlja0hhbmRsZXIodCxvKXt0JiZ0LmNsaWNrJiYoby5hZEV2ZW50TmFtZT10LmNsaWNrLHRoaXMuJGVtaXQoXCJjdXN0b21DbGlja1wiLG8pLHQuY2xpY2tCdWJibGV8fG8uc3RvcFByb3BhZ2F0aW9uJiZvLnN0b3BQcm9wYWdhdGlvbigpKX0sdG91Y2hzdGFydEhhbmRsZXIodCxvKXtvLnN0b3BQcm9wYWdhdGlvbiYmby5zdG9wUHJvcGFnYXRpb24oKX0sY3VzdG9tQ2xpY2sodCl7dGhpcy4kZW1pdChcImN1c3RvbUNsaWNrXCIsdCksdC5zdG9wUHJvcGFnYXRpb24mJnQuc3RvcFByb3BhZ2F0aW9uKCl9LGN1c3RvbVRvdWNoc3RhcnQodCl7dGhpcy4kZW1pdChcImN1c3RvbVRvdWNoc3RhcnRcIix0KSx0JiZ0LnN0b3BQcm9wYWdhdGlvbiYmdC5zdG9wUHJvcGFnYXRpb24oKX0sdmlkZW9GaW5pc2godCxvKXt0LmZpbmlzaCYmKG8uYWRFdmVudE5hbWU9dC5maW5pc2gsdGhpcy4kZW1pdChcImN1c3RvbUNsaWNrXCIsbykpLG8uc3RvcFByb3BhZ2F0aW9uJiZvLnN0b3BQcm9wYWdhdGlvbigpfSx2aWRlb1RpbWVVcGRhdGUodCxvKXt0LnRpbWV1cGRhdGUmJihvLmFkRXZlbnROYW1lPXQudGltZXVwZGF0ZSx0aGlzLiRlbWl0KFwiY3VzdG9tQ2xpY2tcIixvKSksby5zdG9wUHJvcGFnYXRpb24mJm8uc3RvcFByb3BhZ2F0aW9uKCl9LHZpZGVvUHJlcGFyZWQodCxvKXt0LnByZXBhcmVkJiYoby5hZEV2ZW50TmFtZT10LnByZXBhcmVkLHRoaXMuJGVtaXQoXCJjdXN0b21DbGlja1wiLG8pKSxvLnN0b3BQcm9wYWdhdGlvbiYmby5zdG9wUHJvcGFnYXRpb24oKX0sdmlkZW9QYXVzZSh0LG8pe3QucGF1c2UmJihvLmFkRXZlbnROYW1lPXQucGF1c2UsdGhpcy4kZW1pdChcImN1c3RvbUNsaWNrXCIsbykpLG8uc3RvcFByb3BhZ2F0aW9uJiZvLnN0b3BQcm9wYWdhdGlvbigpfSx2aWRlb0Vycm9yKHQsbyl7dC5lcnJvciYmKG8uYWRFdmVudE5hbWU9dC5lcnJvcix0aGlzLiRlbWl0KFwiY3VzdG9tQ2xpY2tcIixvKSksby5zdG9wUHJvcGFnYXRpb24mJm8uc3RvcFByb3BhZ2F0aW9uKCl9LHZpZGVvU3RhcnQodCxvKXt0LmVycm9yJiYoby5hZEV2ZW50TmFtZT10LnN0YXJ0LHRoaXMuJGVtaXQoXCJjdXN0b21DbGlja1wiLG8pKSxvLnN0b3BQcm9wYWdhdGlvbiYmby5zdG9wUHJvcGFnYXRpb24oKX0sY29udGFpbmVyQ2xpY2sodCxvKXt0PXR8fHRoaXMuaXRlbTt2YXIgYT0obyYmby5kZXRhaWx8fHt9KVtcImFkRXZlbnROYW1lXCJdOyh0JiZ0LmNsaWNrfHxcInNoYWtlXCI9PT1hKSYmKG8uYWRFdmVudE5hbWU9dC5jbGlja3x8XCJzaGFrZVwiLHRoaXMuJGVtaXQoXCJjdXN0b21DbGlja1wiLG8pLHQuY2xpY2tCdWJibGV8fG8uc3RvcFByb3BhZ2F0aW9uJiZvLnN0b3BQcm9wYWdhdGlvbigpKX0sY29udGFpbmVyVG91Y2hzdGFydCh0LG8pe3QmJnQudG91Y2hzdGFydCYmKG8uYWRFdmVudE5hbWU9dC50b3VjaHN0YXJ0LHRoaXMuJGVtaXQoXCJjdXN0b21Ub3VjaHN0YXJ0XCIsbyksIXQuY2xpY2tCdWJibGUpJiZvJiZvLnN0b3BQcm9wYWdhdGlvbiYmby5zdG9wUHJvcGFnYXRpb24oKX19Ozwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cIm92ZXJsYXktY29udGFpbmVyXCI+IDxkaXYgY2xhc3M9XCJ7e292ZXJsYXlDbGFzc319XCIgc3R5bGU9XCJ7e3N0eWxlLm92ZXJsYXl9fVwiIGlmPVwie3tpc1Zpc2libGV9fVwiIEBjbGljaz1cImNsb3NlQ2xpY2tcIj4gPGRpdiBzdHlsZT1cInt7c3R5bGUucGFuZWx9fVwiIEBjbGljaz1cInBhbmVsQ2xpY2tcIj4gPGRpdiBjbGFzcz1cInt7cGFuZWxDbGFzc319XCIgc3R5bGU9XCJ7e3N0eWxlLmNvbnRlbnRXcmFwcGVyfX1cIj4gPGRpdiBzdHlsZT1cInt7c3R5bGUuY29udGVudH19XCI+IDxpbWFnZSBzdHlsZT1cInt7c3R5bGUuY2xvc2V9fVwiIEBjbGljaz1cImNsb3NlQ2xpY2tcIiBzcmM9XCJ7e2Nsb3NlUG5nfX1cIj48L2ltYWdlPiA8aW1hZ2Ugc3R5bGU9XCJ7e3N0eWxlLmljb259fVwiIHNyYz1cInt7YWREYXRhLmljb24gfHwgYWREYXRhLndfcGljdXJsfX1cIj48L2ltYWdlPiA8dGV4dCBzdHlsZT1cInt7c3R5bGUuYXBwbmFtZX19XCI+e3sgYWREYXRhLmFwcG5hbWUgfX08L3RleHQ+IDx0ZXh0IGlmPVwie3thZERhdGEuYXBwX3ZlcnNpb259fVwiIHN0eWxlPVwie3tzdHlsZS52ZXJzaW9ufX1cIj7niYjmnKx7eyBhZERhdGEuYXBwX3ZlcnNpb24gfHwgJycgfX08L3RleHQ+IDx0ZXh0IHN0eWxlPVwie3tzdHlsZS5wdWJsaXNoZXJ9fVwiPnt7IGFkRGF0YS5wdWJsaXNoZXIgfX08L3RleHQ+IDxkaXYgc3R5bGU9XCJ7e3N0eWxlLmxpbmtDb250YWluZXJ9fVwiPiA8YSBzdHlsZT1cInt7c3R5bGUubGlua319XCIgaHJlZj1cInt7YWREYXRhLmZ1bmN0aW9uX2xpbmt9fVwiPuWKn+iDvTwvYT4gPGEgc3R5bGU9XCJ7e3N0eWxlLmxpbmt9fVwiIGhyZWY9XCJ7e2FkRGF0YS5wcml2YWN5X2xpbmt9fVwiPumakOengTwvYT4gPGEgc3R5bGU9XCJ7e3N0eWxlLmxpbmt9fVwiIGhyZWY9XCJ7e2FkRGF0YS5wZXJtaXNzaW9uX2xpbmt9fVwiPuadg+mZkDwvYT4gPC9kaXY+IDx0ZXh0IHN0eWxlPVwie3tzdHlsZS5idXR0b259fVwiIEBjbGljaz1cImJ0bkNsaWNrXCI+56uL5Y2z5LiL6L29PC90ZXh0PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvdGVtcGxhdGU+PHN0eWxlPkBrZXlmcmFtZXMgb3ZlcmxheUVudGVyezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgb3ZlcmxheUxlYXZlezAle29wYWNpdHk6MX10b3tvcGFjaXR5OjB9fUBrZXlmcmFtZXMgcGFuZWxlbnRlcnswJXtoZWlnaHQ6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKX10b3toZWlnaHQ6MTAwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKX19QGtleWZyYW1lcyBwYW5lbGxlYXZlezAle2hlaWdodDoxMDAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfXRve2hlaWdodDowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpfX0ub3ZlcmxheS1lbnRlcnthbmltYXRpb24tbmFtZTpvdmVybGF5RW50ZXI7ei1pbmRleDoyfS5vdmVybGF5LWxlYXZle2FuaW1hdGlvbi1uYW1lOm92ZXJsYXlMZWF2ZX0ucGFuZWwtZW50ZXJ7YW5pbWF0aW9uLW5hbWU6cGFuZWxlbnRlcjthbmltYXRpb24tZHVyYXRpb246MjAwbXM7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWlufS5wYW5lbC1sZWF2ZXtoZWlnaHQ6MH08L3N0eWxlPjxzY3JpcHQ+aW1wb3J0e2RlZmluZUFkQ29tcG9uZW50LGRpc3BhdGNoQWRFdmVudH1mcm9tXCIuL2NvbW1vbi5qc1wiO2V4cG9ydCBkZWZhdWx0e3Byb3BzOltcInZpc2libGVcIl0sZGF0YSgpe3JldHVybntvdmVybGF5Q2xhc3M6XCJcIixwYW5lbENsYXNzOlwiXCIsaXNWaXNpYmxlOnRoaXMudmlzaWJsZSxhZERhdGE6e30sc3R5bGU6e30sY2xvc2VQbmc6XCJcIn19LG9uSW5pdCgpe3RoaXMuJHdhdGNoKFwidmlzaWJsZVwiLFwidG9nZ2xlVmlzaWJsZVwiKSxkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJkb3dubG9hZFBhbmVsXCIpfSx0b2dnbGVWaXNpYmxlKGwpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJ0b2dnbGVWaXNpYmxlXCIsbCl9LGNsb3NlQ2xpY2sobCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcImNsb3NlQ2xpY2tcIixsKX0sYnRuQ2xpY2sobCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcImJ0bkNsaWNrXCIsbCl9LHBhbmVsQ2xpY2sobCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcInBhbmVsQ2xpY2tcIixsKX19Ozwvc2NyaXB0PiIsIjxpbXBvcnQgc3JjPVwiLi9jdXN0b20udXhcIiBuYW1lPVwidW5pb24tY3VzdG9tXCI+PC9pbXBvcnQ+XG5cbjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cImZlZWQtYWRcIiBpZD1cImZlZWQtYWRcIj4gPGJsb2NrIGlmPVwie3sgaXNBZExvYWRlZCB9fVwiPiA8ZGl2IG9uYXBwZWFyPVwib25BZEV4cG9zZVwiIG9uZGlzYXBwZWFyPVwib25BZERpc2FwcGVhclwiIGNsYXNzPVwiZmVlZC1hZC1leHBvc2VcIj48aW1hZ2Ugc3R5bGU9XCJ3aWR0aDoxcHg7aGVpZ2h0OjFweFwiIGlkPVwie3tleHBvc2VJZH19XCI+PC9pbWFnZT48L2Rpdj4gPHVuaW9uLWN1c3RvbSBsaXN0PVwie3t0ZW1wbGF0ZUNvbmZpZ319XCIgdGVtcGxhdGUtaWQ9XCJ7e3RlbXBsYXRlSWR9fVwiIEBjdXN0b20tY2xpY2s9XCJjdXN0b21DbGlja1wiIEBjdXN0b20tdG91Y2hzdGFydD1cImN1c3RvbVRvdWNoc3RhcnRcIj48L3VuaW9uLWN1c3RvbT4gPC9ibG9jaz4gPGJsb2NrIGlmPVwie3sgaXNBZExvYWRlZCAmJiBpc0Rvd25sb2FkUGFuZWwgJiYgIWN1c3RvbVBhbmVsfX1cIj4gPHVuaW9uLWN1c3RvbSBsaXN0PVwie3tkb3dubG9hZFBhbmVsQ29uZmlnfX1cIiB0ZW1wbGF0ZS1pZD1cInt7dGVtcGxhdGVJZH19XCIgQGN1c3RvbS10b3VjaHN0YXJ0PVwiY3VzdG9tVG91Y2hzdGFydFwiPjwvdW5pb24tY3VzdG9tPiA8L2Jsb2NrPiA8L2Rpdj4gPC90ZW1wbGF0ZT48c3R5bGU+LmZlZWQtYWR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjpyZWQ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5mZWVkLWFkLWV4cG9zZXthbGlnbi1zZWxmOmNlbnRlcn08L3N0eWxlPjxzY3JpcHQ+aW1wb3J0e2Rpc3BhdGNoQWRFdmVudCxkZWZpbmVBZENvbXBvbmVudH1mcm9tXCIuL2NvbW1vbi5qc1wiO2V4cG9ydCBkZWZhdWx0e3Byb3BzOltcImFkc3R5bGVcIixcInZpZGVvYXV0b3BsYXlcIixcInZpZGVvbXV0ZWRcIixcImRvd25sb2FkcGFuZWxcIixcInRlbXBsYXRlaWRcIixcInNob3d2b2x1bW5cIixcIm5lZWRyZWZyZXNoXCIsXCJzaGFrZVNpemVcIl0sZGF0YSgpe3JldHVybntmZWVkVHlwZTpcIlwiLGFkRGF0YTp7fSxidG5UZXh0OlwiXCIsY2xvc2VQbmc6XCJcIixyZVBsYXlQbmc6XCJcIixzaG93VGFpbEZyYW1lOiExLHRhaWxGcmFtZVN0eWxlOnt9LGlzRG93bmxvYWRQYW5lbDohMSxjdXN0b21QYW5lbDohMSx2aWRlb011dGVkOiExLHRlbXBsYXRlSWQ6XCJcIix0ZW1wbGF0ZUNvbmZpZzpbXSxpc0FkTG9hZGVkOiExLGRvd25sb2FkUGFuZWxDb25maWc6W10sZXhwb3NlSWQ6XCJcIixidG5BbmltYXRlOlwiXCJ9fSxvbkluaXQoKXtkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJmZWVkQWRcIil9LG9uQWRFeHBvc2UoKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25BZEV4cG9zZVwiKX0sb25BZERpc2FwcGVhcigpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkFkRGlzYXBwZWFyXCIpfSxjdXN0b21DbGljayhlKXtlLmRldGFpbC5hZEV2ZW50TmFtZSYmZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxlLmRldGFpbC5hZEV2ZW50TmFtZSxlKX0sY3VzdG9tVG91Y2hzdGFydChlKXt2YXIgYT1lJiZlLmRldGFpbCYmZS5kZXRhaWwuYWRFdmVudE5hbWU7YSYmZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxhLGUpfX07PC9zY3JpcHQ+IiwiPGltcG9ydCBzcmM9XCIuL2N1c3RvbS51eFwiIG5hbWU9XCJ1bmlvbi1jdXN0b21cIj48L2ltcG9ydD5cbjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cImludC1hZFwiPiA8ZGl2IGNsYXNzPVwibWFza1wiIGlmPVwie3tpc0FkTG9hZGVkfX1cIiBpZD1cImFkLW1hc2tcIj4gPGRpdiBvbmFwcGVhcj1cIm9uQWRFeHBvc2VcIiBvbmRpc2FwcGVhcj1cIm9uQWREaXNhcHBlYXJcIiBjbGFzcz1cImZlZWQtYWQtZXhwb3NlXCI+PGltYWdlIHN0eWxlPVwid2lkdGg6MXB4O2hlaWdodDoxcHhcIj48L2ltYWdlPjwvZGl2PiA8ZGl2IGNsYXNzPVwiaW50LW1haW5cIiBzdHlsZT1cInt7aW50TWFpblN0eWxlfX1cIj4gPGRpdiBjbGFzcz1cImludC1jbG9zZVwiIHN0eWxlPVwie3tjbG9zZVN0eWxlfX1cIj4gPHRleHQgaWY9XCJ7e2NvdW50ZG93biAmJiAhZW5hYmxlQ2xvc2V9fVwiIG9uY2xpY2s9XCJiaW5kVGltZXJDbGlja1wiIGNsYXNzPVwiYWQtY2xvc2VkLWJ0bi13cmFwIGFkLWNsb3NlLXRpbWVyXCIgc3R5bGU9XCJ7e2NvdW50RG93blN0eWxlfX1cIj57eyBjb3VudGRvd24gfX1zPC90ZXh0PiA8aW1hZ2UgaWY9XCJ7e2VuYWJsZUNsb3NlfX1cIiBvbmNsaWNrPVwiYmluZENsb3NlXCIgY2xhc3M9XCJhZC1jbG9zZWQtYnRuLXdyYXBcIiBzcmM9XCJodHRwczovL3JlbmRlci1zZXJ2ZXIuY2RuLmJjZWJvcy5jb20vc3RhdGljL2ltYWdlcy8yMDIyMDYyOS9lMWFjYzgxZjE0NDA5MjYzMTU1OTFhNjFiYjI4Nzk0OC5wbmdcIi8+IDwvZGl2PiA8ZGl2IGNsYXNzPVwiaW50LWNvbnRlbnRcIiBzdHlsZT1cInt7aW50Q29udGVudFN0eWxlfX1cIj4gPHVuaW9uLWN1c3RvbSBsaXN0PVwie3t0ZW1wbGF0ZUNvbmZpZ319XCIgdGVtcGxhdGUtaWQ9XCJ7e3RlbXBsYXRlSWR9fVwiIEBjdXN0b20tY2xpY2s9XCJjdXN0b21DbGlja1wiPjwvdW5pb24tY3VzdG9tPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC90ZW1wbGF0ZT48c3R5bGU+QGtleWZyYW1lcyBPcGFjaXR5ezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS5hZC1jbG9zZS10aW1lcntjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzU1NTtkaXNwbGF5OmZsZXg7aGVpZ2h0OjQ4cHg7d2lkdGg6NDhweDtib3JkZXItcmFkaXVzOjI0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9LmFkLWNsb3NlZC1idG4td3JhcHtvcGFjaXR5OjA7YW5pbWF0aW9uLW5hbWU6T3BhY2l0eTthbmltYXRpb24tZGVsYXk6NTBtczthbmltYXRpb24tZHVyYXRpb246MTAwbXM7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjplYXNlLWluLW91dDthbmltYXRpb24tZmlsbC1tb2RlOmZvcndhcmRzfS5mZWVkLWFkLWV4cG9zZXthbGlnbi1zZWxmOmNlbnRlcn0uaW50LW1haW57ZmxleC1kaXJlY3Rpb246Y29sdW1uO3dpZHRoOjgwJX0uaW50LWNsb3Nle3dpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7YWxpZ24tc2VsZjpmbGV4LWVuZDttYXJnaW4tYm90dG9tOjE1cHg7bWFyZ2luLXJpZ2h0OjVweH0ubWFza3twb3NpdGlvbjpmaXhlZDtmbGV4OjE7dG9wOjA7Ym90dG9tOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNSw1LDUsLjYpfS5pbnQtY29udGVudHtib3JkZXItcmFkaXVzOjMwcHh9PC9zdHlsZT48c2NyaXB0PmltcG9ydHtkaXNwYXRjaEFkRXZlbnQsZGVmaW5lQWRDb21wb25lbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtkYXRhKCl7cmV0dXJue2lzQWRMb2FkZWQ6ITEsZmVlZFR5cGU6XCJcIixhZERhdGE6e30sYnRuVGV4dDpcIlwiLGNsb3NlUG5nOlwiXCIsdGVtcGxhdGVJZDpcIlwiLHRlbXBsYXRlQ29uZmlnOltdLGVuYWJsZUNsb3NlOiExLGNvdW50ZG93bjozLHNob3dUYWlsRnJhbWU6ITEsaW50TWFpblN0eWxlOnt9LGludENvbnRlbnRTdHlsZTp7fSxjb3VudERvd25TdHlsZTp7fSxsYXN0VGltZTowLHZpZGVvTXV0ZWQ6ITAsZW5hYmxlU2tpcDohMX19LG9uQWRFeHBvc2UoKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25BZEV4cG9zZVwiKX0sb25BZERpc2FwcGVhcigpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkFkRGlzYXBwZWFyXCIpfSxjdXN0b21DbGljayhlKXtlLmRldGFpbC5hZEV2ZW50TmFtZSYmZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxlLmRldGFpbC5hZEV2ZW50TmFtZSxlKX0sb25Jbml0KCl7ZGVmaW5lQWRDb21wb25lbnQuY2FsbCh0aGlzLFwiaW50QWRcIil9LGJpbmRDbG9zZShlKXtlLnN0b3BQcm9wYWdhdGlvbigpLHRoaXMuJGVtaXQoXCJjbG9zZVwiKX0sYmluZFRpbWVyQ2xpY2soZSl7ZS5zdG9wUHJvcGFnYXRpb24oKX19Ozwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPGRpdiBzdHlsZT1cInt7c3R5bGVCb3h9fVwiIG9uY2xpY2s9XCJvbkNsaWNrXCIgb250b3VjaHN0YXJ0PVwib25Ub3VjaHN0YXJ0XCIgY2xhc3M9XCJtc3NwLWxvZ29cIj4gPGltYWdlIHN0eWxlPVwie3tzdHlsZS5sb2dvSW1nfX1cIiBzcmM9XCJ7e2xvZ29Vcmx9fVwiPjwvaW1hZ2U+IDx0ZXh0IHN0eWxlPVwie3tzdHlsZS5sb2dvVGV4dH19XCI+5bm/5ZGKPC90ZXh0PiA8L2Rpdj4gPC90ZW1wbGF0ZT48c2NyaXB0PmltcG9ydHtkZWZpbmVBZENvbXBvbmVudCxkaXNwYXRjaEFkRXZlbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtwcm9wczpbXCJlbnRyeVwiLFwiaXRlbVN0eWxlXCJdLGRhdGEoKXtyZXR1cm57c3R5bGU6e30sbG9nb1VybDpcIlwifX0sY29tcHV0ZWQ6e3N0eWxlQm94KCl7cmV0dXJuey4uLnRoaXMuaXRlbVN0eWxlLC4uLnRoaXMuc3R5bGUubG9nb0NvbnRhaW5lcn19fSxvbkluaXQoKXtkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJsb2dvXCIpfSxvbkNsaWNrKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkNsaWNrXCIsdCl9LG9uVG91Y2hzdGFydCh0KXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25Ub3VjaHN0YXJ0XCIsdCl9fTs8L3NjcmlwdD4iLCI8aW1wb3J0IG5hbWU9XCJuYXRpdmUtYWRcIiBzcmM9XCIuL2ZlZWRBZC51eFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwib3Blbi1hZFwiIHNyYz1cIi4vb3BlbkFkLnV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJpbnQtYWRcIiBzcmM9XCIuL2ludEFkLnV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJyZXdhcmQtYWRcIiBzcmM9XCIuL3Jld2FyZEFkLnV4XCI+PC9pbXBvcnQ+XG48aW1wb3J0IG5hbWU9XCJkb3dubG9hZC1wYW5lbFwiIHNyYz1cIi4vZG93bmxvYWRQYW5lbC51eFwiPjwvaW1wb3J0PlxuPGltcG9ydCBuYW1lPVwibm92ZWwtYWRcIiBzcmM9XCIuL25vdmVsQWQudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cIm5vdmVsLWJvb2tzLWFkXCIgc3JjPVwiLi9ub3ZlbEJvb2tDaXR5LnV4XCI+PC9pbXBvcnQ+XG4gXG48dGVtcGxhdGU+IDxkaXYgY2xhc3M9XCJtb2JhZHMtYWRcIiBvbmNsaWNrPVwib25DbGlja1wiPiA8aW1nIHNyYz1cInt7c2VuZExvZ1VybH19XCIgc3R5bGU9XCJoZWlnaHQ6MXB4O3dpZHRoOjFweFwiLz4gPGRpdiBpZj1cInt7dHlwZSA9PT0gJ25vdmVsJ319XCI+IDxub3ZlbC1hZCBjaGFubmVsLWlkPVwie3tjaGFubmVsSWR9fVwiIHNjaWQ9XCJ7e3NjaWR9fVwiIHdlYnNyYz1cInt7d2Vic3JjfX1cIiBub3ZlbC1hZC10eXBlPVwie3tub3ZlbEFkVHlwZX19XCIgbGFuZGluZy1wYWdlPVwie3tsYW5kaW5nUGFnZX19XCIgYmFja3ByZXNzPVwie3tiYWNrcHJlc3N9fVwiIEBhcmVhLWNsaWNrPVwiYXJlYUNsaWNrXCI+PC9ub3ZlbC1hZD4gPGludC1hZCBpZj1cInt7aW50VmlzaWJsZX19XCIgQGNsb3NlPVwiaW50Q2xvc2VcIiBAaW5pdC1jb21wbGV0ZT1cImluaXRDb21wbGV0ZVwiIEBhcmVhLWNsaWNrPVwiYXJlYUNsaWNrXCIgZG93bmxvYWRwYW5lbD1cInt7ZG93bmxvYWRwYW5lbH19XCI+PC9pbnQtYWQ+IDwvZGl2PiA8ZGl2IGVsc2U+IDxvcGVuLWFkIGlmPVwie3t0eXBlID09PSAncnNwbGFzaCd9fVwiIGVudHJ5PVwie3tlbnRyeX19XCIgb3BlbmltZz1cInt7b3BlbmltZ319XCIgYWRzdHlsZT1cInt7YWRzdHlsZX19XCIgY3VzdG9tY2xvc2U9XCJ7e2N1c3RvbWNsb3NlfX1cIiBkb3dubG9hZHBhbmVsPVwie3tkb3dubG9hZHBhbmVsfX1cIiBzaGFrZS1zaXplPVwie3tzaGFrZVNpemV9fVwiIHNoYWtlLWludGVydmFsPVwie3tzaGFrZUludGVydmFsfX1cIiBpcy1zaGFrZT1cInt7aXNTaGFrZX19XCIgc3BsYXNocmVzdHJpY3Q9XCJ7e3NwbGFzaHJlc3RyaWN0fX1cIiBza2lwdGltZT1cInt7c2tpcHRpbWV9fVwiIEBhcmVhLWNsaWNrPVwiYXJlYUNsaWNrXCI+PC9vcGVuLWFkPiA8aW50LWFkIGlmPVwie3t0eXBlID09PSAnaW50JyAmJiBpbnRWaXNpYmxlfX1cIiBhZHN0eWxlPVwie3thZHN0eWxlfX1cIiBAY2xvc2U9XCJpbnRDbG9zZVwiIEBpbml0LWNvbXBsZXRlPVwiaW5pdENvbXBsZXRlXCIgZG93bmxvYWRwYW5lbD1cInt7IGRvd25sb2FkcGFuZWwgfX1cIiBAYXJlYS1jbGljaz1cImFyZWFDbGlja1wiPjwvaW50LWFkPiA8bmF0aXZlLWFkIGlmPVwie3t0eXBlID09PSAnZmVlZCcgJiYgYWRWaXNpYmxlfX1cIiBhZHN0eWxlPVwie3thZHN0eWxlfX1cIiBzaGFrZS1zaXplPVwie3tzaGFrZVNpemV9fVwiIHNoYWtlLWludGVydmFsPVwie3tzaGFrZUludGVydmFsfX1cIiBpcy1zaGFrZT1cInt7aXNTaGFrZX19XCIgdmlkZW9hdXRvcGxheT1cInt7IHZpZGVvYXV0b3BsYXkgfX1cIiB2aWRlb211dGVkPVwie3sgdmlkZW9tdXRlZCB9fVwiIGRvd25sb2FkcGFuZWw9XCJ7e2Rvd25sb2FkcGFuZWx9fVwiIEBmZWVkYmFjay1jbGljaz1cInNob3dGZWVkYmFja1wiIEBhcmVhLWNsaWNrPVwiYXJlYUNsaWNrXCIgc2hvd3ZvbHVtbj1cInt7IHNob3d2b2x1bW4gfX1cIiB0ZW1wbGF0ZWlkPVwie3t0ZW1wbGF0ZWlkfX1cIiBuZWVkcmVmcmVzaD1cInt7bmVlZHJlZnJlc2h9fVwiIEBhcmVhLXRvdWNoc3RhcnQ9XCJhcmVhVG91Y2hzdGFydFwiPjwvbmF0aXZlLWFkPiA8cmV3YXJkLWFkIGlmPVwie3t0eXBlID09PSAncnZpZGVvJyAmJiBhZFZpc2libGV9fVwiIGFkc3R5bGU9XCJ7e2Fkc3R5bGV9fVwiIGRvd25sb2FkcGFuZWw9XCJ7e2Rvd25sb2FkcGFuZWx9fVwiIEBhcmVhLWNsaWNrPVwiYXJlYUNsaWNrXCIgc2hvdy1jb3VudGRvd249XCJ7e3Nob3dDb3VudGRvd259fVwiPjwvcmV3YXJkLWFkPiA8ZG93bmxvYWQtcGFuZWwgdmlzaWJsZT1cInt7cGFuZWxWaXNpYmxlfX1cIiBAcGFuZWwtY2xvc2U9XCJkb3dubG9hZFBhbmVsQ2xvc2VcIiBAZG93bmxvYWQtY2xpY2s9XCJkb3dubG9hZENsaWNrXCI+PC9kb3dubG9hZC1wYW5lbD4gPG5vdmVsLWJvb2tzLWFkIGlmPVwie3t0eXBlID09PSAnbm92ZWxCb29rQ2l0eSd9fVwiIGNoYW5uZWwtaWQ9XCJ7e2NoYW5uZWxJZH19XCIgc2NpZD1cInt7c2NpZH19XCIgd2Vic3JjPVwie3t3ZWJzcmN9fVwiIGJhY2twcmVzcz1cInt7YmFja3ByZXNzfX1cIiBAYXJlYS1jbGljaz1cImFyZWFDbGlja1wiPjwvbm92ZWwtYm9va3MtYWQ+IDwvZGl2PiA8L2Rpdj4gPC90ZW1wbGF0ZT48c2NyaXB0PmltcG9ydHt2YWxpZGF0ZUFkc3R5bGUsZGlzcGF0Y2hBZEV2ZW50LGRlZmluZUFkQ29tcG9uZW50fWZyb21cIi4vY29tbW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHR7cHJvcHM6e2FwcGlkOnt0eXBlOltTdHJpbmcsTnVtYmVyXSxyZXF1aXJlZDohMH0sYXBpZDp7dHlwZTpbU3RyaW5nLE51bWJlcl0scmVxdWlyZWQ6ITB9LHR5cGU6e3R5cGU6U3RyaW5nLHJlcXVpcmVkOiEwLGRlZmF1bHQ6XCJmZWVkXCJ9LGVudHJ5Ont0eXBlOlN0cmluZyxyZXF1aXJlZDohMX0sb3BlbmltZzp7dHlwZTpTdHJpbmcscmVxdWlyZWQ6ITF9LGFkc3R5bGU6e3R5cGU6T2JqZWN0LHJlcXVpcmVkOiExLGRlZmF1bHQ6e30sdmFsaWRhdG9yOmZ1bmN0aW9uKGUpe3JldHVybiB2YWxpZGF0ZUFkc3R5bGUoZSl9fSx2aWRlb2F1dG9wbGF5Ont0eXBlOltCb29sZWFuLFN0cmluZ10scmVxdWlyZWQ6ITEsZGVmYXVsdDpcInRydWVcIn0sZG93bmxvYWRwYW5lbDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9LHZpZGVvbXV0ZWQ6e3R5cGU6W0Jvb2xlYW4sU3RyaW5nXSxyZXF1aXJlZDohMSxkZWZhdWx0OlwidHJ1ZVwifSx0ZW1wbGF0ZWlkOnt0eXBlOlN0cmluZyxyZXF1aXJlZDohMX0sY3VzdG9tY2xvc2U6e3R5cGU6Qm9vbGVhbixyZXF1aXJlZDohMSxkZWZhdWx0OiExfSxzcGxhc2hyZXN0cmljdDp7dHlwZTpTdHJpbmcscmVxdWlyZWQ6ITEsZGVmYXVsdDpcIjBcIn0sZGV2aWNlOnt0eXBlOlN0cmluZyxyZXF1aXJlZDohMSxkZWZhdWx0OlwiXCJ9LG1hYzp7dHlwZTpTdHJpbmcscmVxdWlyZWQ6ITEsZGVmYXVsdDpcIlwifSxzaG93Q291bnRkb3duOnt0eXBlOkJvb2xlYW4scmVxdWlyZWQ6ITEsZGVmYXVsdDohMX0sc2hvd3ZvbHVtbjp7dHlwZTpCb29sZWFuLHJlcXVpcmVkOiExLGRlZmF1bHQ6ITB9LHJlZnJlc2g6e3JlcXVpcmVkOiExfSxza2lwdGltZTp7dHlwZTpOdW1iZXIscmVxdWlyZWQ6ITF9LHZpc2libGU6e3R5cGU6W0Jvb2xlYW4sU3RyaW5nLE51bWJlcl0scmVxdWlyZWQ6ITEsZGVmYXVsdDohMX0scmVxOnt0eXBlOlN0cmluZyxyZXF1aXJlZDohMSxkZWZhdWx0OlwiXCJ9LGNoYW5uZWxJZDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSxzY2lkOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiXCJ9LG5vdmVsQWRUeXBlOnt0eXBlOk51bWJlcixkZWZhdWx0OjF9LHdlYnNyYzp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSxsYW5kaW5nUGFnZTp7dHlwZTpTdHJpbmcsZGVmYXV0OlwiXCJ9LGJhY2twcmVzczp7dHlwZTpOdW1iZXIsZGVmYXVsdDowfSxzaGFrZVNpemU6e3R5cGU6TnVtYmVyLHJlcXVpcmVkOiExLGRlZmF1bHQ6M319LGRhdGEoKXtyZXR1cm57YWREYXRhOnt9LHBhbmVsVmlzaWJsZTohMSxhZFZpc2libGU6ITAscGFnZVk6XCIxMDBcIixuZWVkcmVmcmVzaDohMSxzZW5kTG9nVXJsOlwiXCIsaW50VmlzaWJsZTohMSxzaGFrZUludGVydmFsOjMsaXNTaGFrZTohMSxsYXN0RG93bmxvYWRwYW5lbDp0aGlzLmRvd25sb2FkcGFuZWx9fSxvbkluaXQoKXt0aGlzLmluaXRUaW1lPShuZXcgRGF0ZSkuZ2V0VGltZSgpLHRoaXMuJHdhdGNoKFwicmVmcmVzaFwiLFwib25SZWZyZXNoUHJvcENoYW5nZVwiKSx0aGlzLiR3YXRjaChcInZpc2libGVcIixcIm9uSW50VmlzaWJsZUNoYW5nZVwiKSxkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJtb2JhZHNBZFwiKX0sb25JbnRWaXNpYmxlQ2hhbmdlKGUsdCl7dGhpcy5pbnRWaXNpYmxlPSEwLGRpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvblJlZnJlc2hQcm9wQ2hhbmdlXCIsZSE9PXQpfSxvblJlYWR5KCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uUmVhZHlcIil9LG9uRGVzdHJveSgpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkRlc3Ryb3lcIil9LG9uQ2xpY2soZSl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uQ2xpY2tcIixlKX0sb25Ub3VjaHN0YXJ0KGUpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvblRvdWNoc3RhcnRcIixlKX0sZG93bmxvYWRQYW5lbENsb3NlKGUpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJkb3dubG9hZFBhbmVsQ2xvc2VcIixlKX0sZG93bmxvYWRDbGljayhlKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwiZG93bmxvYWRDbGlja1wiLGUpfSxzaG93RmVlZGJhY2soZSl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcInNob3dGZWVkYmFja1wiLGUpfSxpbml0Q29tcGxldGUoZSl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcImluaXRDb21wbGV0ZVwiLGUpfSxhcmVhQ2xpY2soZSl7XCJub3ZlbFwiPT09dGhpcy50eXBlP2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkNsaWNrXCIsZSk6ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uQ2xpY2tcIixlLmRldGFpbCl9LG9uUmVmcmVzaFByb3BDaGFuZ2UoZSx0KXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25SZWZyZXNoUHJvcENoYW5nZVwiLGUhPT10KX0saW50Q2xvc2UoKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25JbnRDbG9zZVwiKX0sYXJlYVRvdWNoc3RhcnQoZSl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uVG91Y2hzdGFydFwiLGUpfX07PC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiA8c3RhY2sgY2xhc3M9XCJub3ZlbC1hZFwiPiA8d2ViIGNsYXNzPVwibm92ZWwtd2ViXCIgc3JjPVwie3tub3ZlbFVybH19XCIgYWxsb3d0aGlyZHBhcnR5Y29va2llcz1cInt7YWxsb3d9fVwiIG9ucGFnZWZpbmlzaD1cIm9uUGFnZWZpbmlzaFwiIG9ubWVzc2FnZT1cIm9uTWVzc2FnZVwiIHRydXN0ZWR1cmw9XCJ7e3RydXN0ZWR1cmxzfX1cIiBpZD1cIndlYlwiPjwvd2ViPiA8dGV4dCBpZj1cInt7IWlzTG9hZGVkfX1cIj4g5Yqg6L295Lit4oCmIDwvdGV4dD4gPC9zdGFjaz4gPC90ZW1wbGF0ZT48c3R5bGU+Lm5vdmVsLWFke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lm5vdmVsLXdlYnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfTwvc3R5bGU+PHNjcmlwdD5pbXBvcnR7ZGVmaW5lQWRDb21wb25lbnQsZGlzcGF0Y2hBZEV2ZW50fWZyb21cIi4vY29tbW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHR7cHJvcHM6e3dlYnNyYzp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSxjaGFubmVsSWQ6e3R5cGU6U3RyaW5nLHJlcXVpcmVkOiEwLGRlZmF1bHQ6XCJcIn0sc2NpZDp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSxsYW5kaW5nUGFnZTp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIlwifSxub3ZlbEFkVHlwZTp7dHlwZTpOdW1iZXIsZGVmYXVsdDoxfSxiYWNrcHJlc3M6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH19LGRhdGEoKXtyZXR1cm57YWxsb3c6ITAsbm92ZWxVcmw6XCJcIixpc0xvYWRlZDohMSx0cnVzdGVkdXJsczpbL15odHRwczpcXC9cXC9ib3hub3ZlbC5iYWlkdS5jb20vLC9eaHR0cHM6XFwvXFwvY3B1LmJhaWR1LmNvbS9dfX0sb25Jbml0KCl7dGhpcy4kd2F0Y2goXCJiYWNrcHJlc3NcIixcIm9uQmFja3ByZXNzXCIpLGRlZmluZUFkQ29tcG9uZW50LmNhbGwodGhpcyxcIm5vdmVsQWRcIil9LG9uUGFnZWZpbmlzaChlKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25QYWdlZmluaXNoXCIsZSl9LG9uTWVzc2FnZShlKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25NZXNzYWdlXCIsZSl9LG9uQmFja3ByZXNzKCl7ZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxcIm9uQmFja3ByZXNzXCIpfX07PC9zY3JpcHQ+IiwiPGltcG9ydCBuYW1lPVwidGFiXCIgc3JjPVwiLi90YWIudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cImJvdHRvbS1iYXJcIiBzcmM9XCIuL2JvdHRvbUJhci51eFwiPjwvaW1wb3J0PlxuIFxuPHRlbXBsYXRlPiA8c3RhY2sgY2xhc3M9XCJub3ZlbC1zZWNvbmQtYWRcIj4gPGRpdiBpZj1cInNob3dUb3BCYXJcIiBjbGFzcz1cInRhYlwiPiA8dGFiIEBsb2FkaW5nLXBhZ2U9XCJvbmxvYWRpbmdQYWdlXCIgY3VycmVudC1pbmRleD1cInt7dG9wQmFySW5kZXh9fVwiPjwvdGFiPiA8L2Rpdj4gPHN0YWNrIGNsYXNzPVwid2ViIHt7IXNob3dUb3BCYXIgJiYgJ3dlYi1hY3Jvc3MtdG9wJ319IHt7IXNob3dCb3R0b21CYXIgJiYgJ3dlYi1hY3Jvc3MtYm90dG9tJ319XCI+IDx3ZWIgaWQ9XCJ3ZWJcIiBzcmM9XCJ7e3dlYnNyY319XCIgYWxsb3d0aGlyZHBhcnR5Y29va2llcz1cInt7YWxsb3d9fVwiIG9ucGFnZWZpbmlzaD1cIm9uUGFnZWZpbmlzaFwiIHRydXN0ZWR1cmw9XCJ7e3RydXN0ZWR1cmxzfX1cIiBvbm1lc3NhZ2U9XCJvbk1lc3NhZ2VcIj48L3dlYj4gPHRleHQgaWY9XCJ7eyFpc0xvYWRlZH19XCI+IOWKoOi9veS4reKApiA8L3RleHQ+IDwvc3RhY2s+IDxkaXYgaWY9XCJ7e3Nob3dCb3R0b21CYXJ9fVwiIGNsYXNzPVwiYm90dG9tLWJhclwiPiA8Ym90dG9tLWJhciBkYXRhPVwiYm90dG9tQmFyRGF0YVwiIEBsb2FkaW5nLXBhZ2U9XCJvbmxvYWRpbmdQYWdlXCIgY3VycmVudC1pbmRleD1cInt7Ym90dG9tQmFySW5kZXh9fVwiPjwvYm90dG9tLWJhcj4gPC9kaXY+IDwvc3RhY2s+IDwvdGVtcGxhdGU+PHN0eWxlPi5ub3ZlbC1zZWNvbmQtYWR7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2ZsZXgtZGlyZWN0aW9uOnJvd30ubm92ZWwtc2Vjb25kLWFkIC50YWJ7d2lkdGg6MTAwJTtoZWlnaHQ6ODRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmNWY2Zjl9Lm5vdmVsLXNlY29uZC1hZCAud2Vie3dpZHRoOjEwMCU7aGVpZ2h0OjkwJTttYXJnaW4tdG9wOjg0cHg7bWFyZ2luLWJvdHRvbToxNDRweDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5ub3ZlbC1zZWNvbmQtYWQgLndlYi1hY3Jvc3MtdG9we21hcmdpbi10b3A6MH0ubm92ZWwtc2Vjb25kLWFkIC53ZWItYWNyb3NzLWJvdHRvbXttYXJnaW4tYm90dG9tOjB9Lm5vdmVsLXNlY29uZC1hZCAuYm90dG9tLWJhcntoZWlnaHQ6MTQ0cHh9PC9zdHlsZT48c2NyaXB0PmltcG9ydHtkZWZpbmVBZENvbXBvbmVudCxkaXNwYXRjaEFkRXZlbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtwcm9wczpbXCJib3R0b21CYXJEYXRhXCIsXCJzY2lkXCIsXCJjaGFubmVsSWRcIixcImJhY2twcmVzc1wiXSxkYXRhKCl7cmV0dXJue2JvdHRvbUJhclR5cGU6MCx0b3BCYXJ0eXBlOjAsd2Vic3JjOlwiXCIsaXNMb2FkZWQ6ITEsc2hvd1RvcEJhcjohMSxzaG93Qm90dG9tQmFyOiExLHRvcEJhckluZGV4OjAsYm90dG9tQmFySW5kZXg6MCx0cnVzdGVkdXJsczpbL15odHRwczpcXC9cXC9ib3hub3ZlbC5iYWlkdS5jb20vXX19LG9uSW5pdCgpe3RoaXMuJHdhdGNoKFwiYmFja3ByZXNzXCIsXCJvbkJhY2twcmVzc1wiKSxkZWZpbmVBZENvbXBvbmVudC5jYWxsKHRoaXMsXCJub3ZlbEJvb2tDaXR5XCIpfSxvblBhZ2VTdGFydCh0KXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25QYWdlU3RhcnRcIix0KX0sb25QYWdlZmluaXNoKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvblBhZ2VmaW5pc2hcIix0KX0sb25NZXNzYWdlKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbk1lc3NhZ2VcIix0KX0sb25sb2FkaW5nUGFnZSh0KXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25sb2FkaW5nUGFnZVwiLHQpfSxvbkJhY2twcmVzcygpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkJhY2twcmVzc1wiKX19Ozwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cImFkLWxvZ29cIiBzcmM9XCIuL2xvZ28udXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgbmFtZT1cInNraXAtY2lyY2xlXCIgc3JjPVwiLi9jaXJjbGUudXhcIj48L2ltcG9ydD5cbjxpbXBvcnQgc3JjPVwiLi9jdXN0b20udXhcIiBuYW1lPVwidW5pb24tY3VzdG9tXCI+PC9pbXBvcnQ+XG48dGVtcGxhdGU+IDxkaXYgc3R5bGU9XCJ7e3N0eWxlLnJvb3RTdHlsZX19XCIgaWQ9XCJvcGVuLXNjcmVlbi1hZFwiPiA8c3RhY2sgc3R5bGU9XCJ7e3N0eWxlLmNvbnRhaW5lclN0eWxlfX1cIj4gPGRpdiBzdHlsZT1cInt7c3R5bGUuaW1nV3JhcFN0eWxlfX1cIiBjbGFzcz1cImltZ1dyYXBTdHlsZVwiPiA8aW1hZ2Ugc3R5bGU9XCJ7e3N0eWxlLmltZ1N0eWxlfX1cIiBzcmM9XCJ7eyBvcGVuaW1nIH19XCIgQGVycm9yPVwiaW1nTG9hZEVyclwiPjwvaW1hZ2U+IDwvZGl2PiA8c3RhY2sgc3R5bGU9XCJ7e3N0eWxlLmltZ1dyYXBTdHlsZX19XCIgY2xhc3M9XCJpbWdXcmFwU3R5bGUgb3BlbkltZ1dyYXBcIiBpZj1cInt7aXNzaG93fX1cIj4gPGltYWdlIHN0eWxlPVwie3tzdHlsZS5pbWdTdHlsZX19XCIgc3JjPVwie3sgaW1nVXJsIH19XCIgQGNvbXBsZXRlPVwiaW1nTG9hZENvbXBsZXRlZFwiIEBlcnJvcj1cImltZ0xvYWRFcnJcIj48L2ltYWdlPiA8ZGl2IHN0eWxlPVwie3tzdHlsZS5zaGFrZUNvbnRhaW5lclN0eWxlfX1cIiBpZj1cInt7aXNTaGFrZX19XCI+IDx1bmlvbi1jdXN0b20gbGlzdD1cInt7dGVtcGxhdGVDb25maWd9fVwiIEBjdXN0b20tY2xpY2s9XCJjdXN0b21DbGlja1wiIGN1c3RvbXN0eWxlPVwie3tzdHlsZS5pbm5lckN1c3RvbVN0eWxlfX1cIiBzaGFrZS1pbnRlcnZhbD1cInt7c2hha2VJbnRlcnZhbH19XCI+IDwvdW5pb24tY3VzdG9tPiA8L2Rpdj4gPGRpdiBzdHlsZT1cInt7c3R5bGUuYWRCdG5XcmFwU3R5bGV9fVwiIGlmPVwie3tzaG93U3BsYXNoQnRufX1cIj4gPHRleHQgc3R5bGU9XCJ7e3N0eWxlLmFkQnRuU3R5bGV9fVwiIGNsYXNzPVwib3Blbi1hZC1idG5cIiBkYXRhLWlkPVwib3Blbi1hZC1idG5cIj57e2J0blRleHR9fTwvdGV4dD4gPC9kaXY+IDxkaXYgc3R5bGU9XCJ7e3N0eWxlLmxvZ29XcmFwU3R5bGV9fVwiPiA8YWQtbG9nbyBAbG9nby1jbGljaz1cInt7bG9nb0NsaWNrfX1cIiBlbnRyeT1cInt7ZW50cnl9fVwiPjwvYWQtbG9nbz4gPC9kaXY+IDwvc3RhY2s+IDxkaXYgc3R5bGU9XCJ7e3N0eWxlLmNsb3NlV3JhcFN0eWxlfX1cIiBjbGFzcz1cImFkLWNsb3NlZC1idG4td3JhcFwiPiA8dGV4dCBzdHlsZT1cInt7c3R5bGUuY2xvc2VCdG5TdHlsZX19XCIgaWY9XCJ7eyBjbG9zZXR5cGUgPT09IDEgfX1cIiBAY2xpY2s9XCJvbkFkU2tpcFwiPnt7IGNvdW50ZG93biB9fSDot7Pov4cgPC90ZXh0PiA8c2tpcC1jaXJjbGUgQGNsaWNrPVwib25BZFNraXBcIiBjb250ZW50PVwi6Lez6L+HXCIgc2l6ZT1cInt7Y2lyY2xlU2l6ZX19XCIgcGVyY2VudD1cInt7cGVyY2VudH19XCIgaWY9XCJ7eyBjbG9zZXR5cGUgPT09IDUgfX1cIj4gPC9za2lwLWNpcmNsZT4gPC9kaXY+IDwvc3RhY2s+IDxkaXYgaWY9XCJ7eyBpc0Rvd25sb2FkUGFuZWwgfX1cIiBzdHlsZT1cInt7c3R5bGUuZG93bmxvYWRTdHlsZX19XCI+IDx0ZXh0IHN0eWxlPVwie3tzdHlsZS5hcHBuYW1lfX1cIj57eyBhZERhdGEuYXBwbmFtZSB8fCAn57K+6YCJ5o6o6I2QJ319PC90ZXh0PiA8dGV4dCBzdHlsZT1cInt7c3R5bGUudmVyc2lvbn19XCI+54mI5pysIHt7IGFkRGF0YS5hcHBfdmVyc2lvbiB9fTwvdGV4dD4gPHRleHQgc3R5bGU9XCJ7e3N0eWxlLmRvd25sb2FkVGV4dH19XCIgb25jbGljaz1cImNhcGFiaWxpdHlDbGlja1wiPuWKn+iDvTwvdGV4dD4gPHRleHQgc3R5bGU9XCJ7e3N0eWxlLmRvd25sb2FkVGV4dH19XCIgb25jbGljaz1cInByaXZhY3lDbGlja1wiPumakOengTwvdGV4dD4gPHRleHQgc3R5bGU9XCJ7e3N0eWxlLmRvd25sb2FkVGV4dH19XCIgb25jbGljaz1cInBlcm1pc3Npb25DbGlja1wiPuadg+mZkDwvdGV4dD4gPHRleHQgc3R5bGU9XCJ7e3N0eWxlLnB1Ymxpc2hlcn19XCI+e3sgYWREYXRhLnB1Ymxpc2hlciB9fTwvdGV4dD4gPC9kaXY+IDwvZGl2PiA8L3RlbXBsYXRlPjxzdHlsZT5Aa2V5ZnJhbWVzIE9wYWNpdHl7MCV7b3BhY2l0eTowfXRve29wYWNpdHk6MX19LmFkLWNsb3NlZC1idG4td3JhcCwub3BlbkltZ1dyYXB7b3BhY2l0eTowO2FuaW1hdGlvbi1uYW1lOk9wYWNpdHk7YW5pbWF0aW9uLWRlbGF5OjUwbXM7YW5pbWF0aW9uLWR1cmF0aW9uOjEwMG1zO2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXQ7YW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkc308L3N0eWxlPjxzY3JpcHQ+aW1wb3J0e2RlZmluZUFkQ29tcG9uZW50LGRpc3BhdGNoQWRFdmVudH1mcm9tXCIuL2NvbW1vbi5qc1wiO2V4cG9ydCBkZWZhdWx0e3Byb3BzOltcIm9wZW5pbWdcIixcImVudHJ5XCIsXCJhZHN0eWxlXCIsXCJkb3dubG9hZHBhbmVsXCIsXCJjdXN0b21jbG9zZVwiLFwic3BsYXNocmVzdHJpY3RcIixcInNraXB0aW1lXCIsXCJpc1NoYWtlXCIsXCJzaGFrZUludGVydmFsXCIsXCJzaGFrZVNpemVcIl0sZGF0YSgpe3JldHVybnthZERhdGE6e30sY291bnRkb3duOjUsaW1nVXJsOlwiXCIsaXNzaG93OiExLHBlcmNlbnQ6MjAsY2xvc2V0eXBlOjQsc3R5bGU6e30saXNEb3dubG9hZFBhbmVsOiExLGJ0blRleHQ6XCJcIixzaG93U3BsYXNoQnRuOiExLGNpcmNsZVNpemU6OTAsdGVtcGxhdGVDb25maWc6W10sb3BlbkNvbnRlbnRTdHlsZTp7fSxpbnRDb250ZW50U3R5bGU6e30saXNEb3dubG9hZDohMSxjbG91ZENsaWNrQXJlYTotMX19LG9uSW5pdCgpe2RlZmluZUFkQ29tcG9uZW50LmNhbGwodGhpcyxcIm9wZW5BZFwiKX0saW1nTG9hZENvbXBsZXRlZCgpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJpbWdMb2FkQ29tcGxldGVkXCIpfSxsb2dvQ2xpY2soKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwibG9nb0NsaWNrXCIpfSxvbkFkU2tpcCh0KXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25BZFNraXBcIix0KX0saW1nTG9hZEVycigpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJpbWdMb2FkRXJyXCIpfSxvbkRlc3Ryb3koKXtkaXNwYXRjaEFkRXZlbnQuY2FsbCh0aGlzLFwib25EZXN0cm95XCIpfSxjdXN0b21DbGljayh0KXt0LmRldGFpbC5hZEV2ZW50TmFtZSYmZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyx0LmRldGFpbC5hZEV2ZW50TmFtZSx0KX0sY2FwYWJpbGl0eUNsaWNrKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJjYXBhYmlsaXR5Q2xpY2tcIix0KX0scHJpdmFjeUNsaWNrKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJwcml2YWN5Q2xpY2tcIix0KX0scGVybWlzc2lvbkNsaWNrKHQpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJwZXJtaXNzaW9uQ2xpY2tcIix0KX19Ozwvc2NyaXB0PiIsIjxpbXBvcnQgc3JjPVwiLi9jdXN0b20udXhcIiBuYW1lPVwidW5pb24tY3VzdG9tXCI+PC9pbXBvcnQ+XG5cbjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cInJld2FyZC1hZFwiPiA8dW5pb24tY3VzdG9tIGxpc3Q9XCJ7e3RlbXBsYXRlQ29uZmlnfX1cIiBAY3VzdG9tLWNsaWNrPVwiY3VzdG9tQ2xpY2tcIj48L3VuaW9uLWN1c3RvbT4gPC9kaXY+IDwvdGVtcGxhdGU+PHN0eWxlPjwvc3R5bGU+PHNjcmlwdD5pbXBvcnR7ZGlzcGF0Y2hBZEV2ZW50LGRlZmluZUFkQ29tcG9uZW50fWZyb21cIi4vY29tbW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHR7cHJvcHM6W1wiYWRzdHlsZVwiLFwicmV3YXJkdGltZVwiLFwiY2xvc2V0aW1lXCIsXCJzaG93Q291bnRkb3duXCIsXCJkb3dubG9hZHBhbmVsXCJdLGRhdGEoKXtyZXR1cm57YWREYXRhOnt9LHRlbXBsYXRlQ29uZmlnOltdLHZpZGVvbXV0ZWQ6ITEsc2hvd1RhaWxGcmFtZTohMSxwcm9ncmVzczowLGxhc3RUaW1lOjAsc2hvd1NraXA6ITEsbGFzdFJld2FyZFRpbWU6MH19LG9uSW5pdCgpe2RlZmluZUFkQ29tcG9uZW50LmNhbGwodGhpcyxcInJld2FyZEFkXCIpfSxjdXN0b21DbGljayhlKXtlLmRldGFpbC5hZEV2ZW50TmFtZSYmZGlzcGF0Y2hBZEV2ZW50LmNhbGwodGhpcyxlLmRldGFpbC5hZEV2ZW50TmFtZSxlKX19Ozwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gPHN0YWNrPiA8ZGl2IGNsYXNzPVwibm92ZWwtd3JhcHBlclwiPiA8dGFicyBjbGFzcz1cInRhYnNcIiBvbmNoYW5nZT1cIm9uQ2hhbmdlVGFiSW5kZXhcIiBpbmRleD1cInt7Y3VySW5kZXh9fVwiPiA8dGFiLWJhciBjbGFzcz1cInRhYi1iYXJcIj4gPGRpdiBjbGFzcz1cInRhYi1iYXItaXRlbVwiIGZvcj1cInt7bWVudX19XCIgdGlkPVwie3skaWR4fX19XCI+IDxkaXYgY2xhc3M9XCJ0YWItYmFyLXRleHQtd3JhcHBlclwiPiA8dGV4dCBjbGFzcz1cInt7Y3VySW5kZXggPT09ICRpZHggPyAndGFiLWJhci10ZXh0IGN1ci10YWInOiAndGFiLWJhci10ZXh0J319XCI+e3skaXRlbX19PC90ZXh0PiA8L2Rpdj4gPGRpdiBjbGFzcz1cInt7Y3VySW5kZXggPT09ICRpZHggPyAndGFiLWJhci1iZy1saW5lJzogJyd9fVwiPjwvZGl2PiA8L2Rpdj4gPC90YWItYmFyPiA8L3RhYnM+IDwvZGl2PiA8L3N0YWNrPiA8L3RlbXBsYXRlPjxzdHlsZT4ubm92ZWwtd3JhcHBlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjE7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS50YWItYmFyLC50YWJze3dpZHRoOjEwMCV9LnRhYi1iYXJ7aGVpZ2h0Ojg0cHg7Zm9udC1zaXplOjQ4cHg7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpmbGV4fS50YWItYmFyLWl0ZW17ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LnRhYi1iYXItaXRlbSwudGFiLWJhci10ZXh0LC50YWItYmFyLXRleHQtd3JhcHBlcnt3aWR0aDo5NnB4O3RleHQtYWxpZ246Y2VudGVyfS50YWItYmFyLXRleHR7Zm9udC1mYW1pbHk6UGluZ0ZhbmdTQy1TZW1pYm9sZDttYXJnaW4tYm90dG9tOjEwcHh9LmN1ci10YWJ7Y29sb3I6I2ZmODI0YX0udGFiLWJhci1iZy1saW5le2JvcmRlci1yYWRpdXM6NnB4O3dpZHRoOjQycHg7aGVpZ2h0OjlweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjgyNGF9PC9zdHlsZT48c2NyaXB0PmltcG9ydHtkZWZpbmVBZENvbXBvbmVudCxkaXNwYXRjaEFkRXZlbnR9ZnJvbVwiLi9jb21tb24uanNcIjtleHBvcnQgZGVmYXVsdHtwcm9wczp7bWVudTp7dHlwZTpBcnJheSxkZWZhdWx0OltcIuaOqOiNkFwiLFwi55S355SfXCIsXCLlpbPnlJ9cIl19LGN1cnJlbnRJbmRleDp7dHlwZTpOdW1iZXIsZGVmYXVsdDowfX0sZGF0YSgpe3JldHVybntjdXJJbmRleDowfX0sb25Jbml0KCl7ZGVmaW5lQWRDb21wb25lbnQuY2FsbCh0aGlzLFwidGFiXCIpfSxvbkNoYW5nZVRhYkluZGV4KGUpe2Rpc3BhdGNoQWRFdmVudC5jYWxsKHRoaXMsXCJvbkNoYW5nZVRhYkluZGV4XCIsZSl9fTs8L3NjcmlwdD4iLCI8aW1wb3J0IG5hbWU9XCJuYXRpdmUtYWRcIiBzcmM9XCIuLi9hZC9uYXRpdmVBRFwiPjwvaW1wb3J0PlxyXG48aW1wb3J0IG5hbWU9XCJuYXRpdmUtYWQtdG9wb25cIiBzcmM9XCIuLi9hZC9uYXRpdmVBRC10b3BvblwiPjwvaW1wb3J0PlxyXG5cclxuPGltcG9ydCBuYW1lPVwibmF0aXZlYmFubmVyLWFkXCIgc3JjPVwiLi4vYWQvbmFCYW5uZXJBZFwiPjwvaW1wb3J0PlxyXG48dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBzdHlsZT1cImp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNzJweDsgaGVpZ2h0OiA4MHB4OyB3aWR0aDogMTAwJVwiIG9uY2xpY2s9XCJiYWNrXCI+XHJcbiAgICAgIDxpbWFnZSBzaG93PVwie3tpc2JvbGNrUmV0dXJufX1cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMjBweDsgbWFyZ2luLWxlZnQ6IDEwcHg7IHdpZHRoOiAyOHB4OyBoZWlnaHQ6IDM0cHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9iYWNrLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgIDx0ZXh0IHN0eWxlPVwiZm9udC1zaXplOiAzNXB4OyBjb2xvcjogIzAwMDAwMDsgbWFyZ2luLWxlZnQ6IC0xMHB4XCI+6K6h5q2l5pif55CDPC90ZXh0PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHN0YWNrIGNsYXNzPVwiZGFsaXlcIj5cclxuICAgICAgPGltYWdlIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IHdpZHRoOiAxMzRweDsgaGVpZ2h0OiA1MnB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl9jcy5wbmdcIj48L2ltYWdlPlxyXG4gICAgICA8dGV4dD5cclxuICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjMDAwMDAwOyBmb250LXdlaWdodDogYm9sZFwiPnt7IHJlY2VpdmVkQ291bnQgPT09IDAgPyAn5LuK5pel5qyh5pWw5bey55So5a6MJyA6ICfku4rml6XlhY3otLnvvJonIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGlmPVwie3tyZWNlaXZlZENvdW50ID4gMH19XCIgc3R5bGU9XCJjb2xvcjogI2ZmZjsgZm9udC13ZWlnaHQ6IGJvbGRcIj57e3JlY2VpdmVkQ291bnR9feasoTwvc3Bhbj5cclxuICAgICAgPC90ZXh0PlxyXG4gICAgPC9zdGFjaz5cclxuICAgIDwhLS0gPHRleHQgaWY9XCJ7e2lzU2hvd0xvZ2lufX1cIiBzdHlsZT1cImNvbG9yOiAjZmZmOyBmb250LXdlaWdodDogYm9sZFwiPuW9k+WkqeW5v+WRiueCueWHu+asoeaVsO+8mnt7Y291bnROb3d9feasoTwvdGV4dD5cclxuICAgIDx0ZXh0IGlmPVwie3tpc1Nob3dMb2dpbn19XCIgc3R5bGU9XCJjb2xvcjogI2ZmZjsgZm9udC13ZWlnaHQ6IGJvbGRcIj7mmK/lkKblvIDlkK/ngrnlh7vlsYJ7e2lzU2hvd1RjbGF5ZXJ9fTwvdGV4dD4gLS0+XHJcbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMjgycHg7IGhlaWdodDogMjgycHg7IHRvcDogODAwcHg7IGxlZnQ6IDI1MHB4XCIgb25jbGljaz1cIm9wZW5hZFwiPjwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJidG1fdmlld1wiPlxyXG4gICAgICA8ZGl2IGZvcj1cInt7cXVvdGFMaXN0fX1cIiBkYXRhLWl0ZW09XCJ7e2l0ZW19fVwiPlxyXG4gICAgICAgIDxzdGFjayBjbGFzcz1cIml0ZW0tZGl2XCI+XHJcbiAgICAgICAgICA8dGV4dCBjbGFzcz1cIml0ZW0tZGl2LXRleHRcIj57eyRpdGVtLnRpdGxlfX08L3RleHQ+XHJcbiAgICAgICAgICA8aW1hZ2UgaWY9XCJ7eyRpdGVtLmlkPT09MX19XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB3aWR0aDogMTUwcHg7IGhlaWdodDogMTUwcHhcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX2ZkLnBuZ1wiPjwvaW1hZ2U+XHJcbiAgICAgICAgPC9zdGFjaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmF0aXZlLWFkLXRvcG9uIGlmPVwie3tzaG93RGlhbG9nfX1cIiBvbmVtaXQtZXZ0PVwiZW1pdEV2dFwiIG9uZW1pdC1jbG9zZT1cImVtaXRDbG9zZVwiIHNob3ctdGNsYXllcj1cInt7aXNTaG93VGNsYXllcn19XCIgb25hZGQtYWRjPVwiYWRkQWRjXCIgb25zaG93LW52YWQ9XCJzaG93TnZhZFwiPjwvbmF0aXZlLWFkLXRvcG9uPlxyXG5cclxuICAgIDxzdGFjayBjbGFzcz1cImNvbmVyXCIgaWY9XCJ7e3Nob3dEaWFsb2cyfX1cIj5cclxuICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiA2NzJweDsgaGVpZ2h0OiA4MDBweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2FkL2JnX2NvbmVyLnBuZylcIj5cclxuICAgICAgICA8aW1hZ2UgY2xhc3M9XCJjbG9zZUltZ1wiIHNyYz1cIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ltYWdlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGltYWdlIHN0eWxlPVwid2lkdGg6IDU3NXB4OyBoZWlnaHQ6IDE3N3B4OyBtYXJnaW4tdG9wOiA1MDBweFwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2JnX2J1dC5wbmdcIiBvbmNsaWNrPVwiY2xvc2VcIj48L2ltYWdlPlxyXG4gICAgPC9zdGFjaz5cclxuICAgIDxpbWFnZSBjbGFzcz1cImltYWdlX2ZpbmdlclwiIG9uY2xpY2s9XCJvcGVuYWRcIj48L2ltYWdlPlxyXG5cclxuICAgIDwhLS0gPG5hdGl2ZWJhbm5lci1hZCBjbGFzcz1cIm5iYWRcIiBvbmFkZC1hZGM9XCJhZGRBZGNcIiBvbnNob3ctbnZhZD1cInNob3dOdmFkXCI+PC9uYXRpdmViYW5uZXItYWQ+IC0tPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG48c3R5bGU+XHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvQ29tbW9uL2ltZy9hZC9iZ19jaGIucG5nKTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgfVxyXG4gIC5uYmFkIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMDtcclxuICB9XHJcbiAgLmNvbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMHB4O1xyXG4gICAgbGVmdDogMHB4O1xyXG4gIH1cclxuICAuZGFsaXkge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICBtYXJnaW4tdG9wOiA1MDBweDtcclxuICAgIHdpZHRoOiAyNThweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2U5ZmQ2NSwgIzk1ZmYzNyAxMDAlKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1NHB4O1xyXG4gIH1cclxuXHJcbiAgLmNsb3NlSW1nIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICB3aWR0aDogNDhweDtcclxuICAgIGhlaWdodDogNDhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMzBweDtcclxuICAgIHJpZ2h0OiAwcHg7XHJcbiAgfVxyXG4gIC5pbWFnZV9maW5nZXIge1xyXG4gICAgd2lkdGg6IDIyMnB4O1xyXG4gICAgaGVpZ2h0OiAyMjJweDtcclxuICAgIG1hcmdpbi10b3A6IDQwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIzMHB4O1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9Db21tb24vaW1nL2FkL2ljb25fc3oucG5nKTtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiBmbG9hdDtcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMTUwMG1zO1xyXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbiAgfVxyXG4gIEBrZXlmcmFtZXMgZmxvYXQge1xyXG4gICAgMCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICAgIH1cclxuICAgIDUwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjBweCk7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XHJcbiAgICB9XHJcbiAgICAwJSB7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC02MHB4KTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcclxuICAgIH1cclxuICB9XHJcbiAgLmJ0bV92aWV3IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA1MDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMTAwcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG4gIC5pdGVtLWRpdiB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGhlaWdodDogMTcycHg7XHJcbiAgICB3aWR0aDogMTYycHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL0NvbW1vbi9pbWcvYWQvaWNvbl9oYmJnLnBuZyk7XHJcbiAgfVxyXG4gIC5pdGVtLWRpdi10ZXh0IHtcclxuICAgIGNvbG9yOiAjZDMwMDA5O1xyXG4gICAgZm9udC1zaXplOiA2MHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBtYXJnaW4tdG9wOiAtNDBweDtcclxuICB9XHJcbjwvc3R5bGU+XHJcbjxzY3JpcHQ+XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcHJpdmF0ZToge1xyXG5cclxuXHJcbiAgICAgIGlzU2hvd1RjbGF5ZXI6IGZhbHNlLCAvL+aYr+WQpuaYvuekuuW5v+WRiumAj+aYjueCueWHu+WxgiDlkI7lj7Dlj4LmlbBcclxuICAgICAgaXNib2xja1JldHVybjogdHJ1ZSwgLy/mmK/lkKblj6/ku6Xov5Tlm57miYvlir8g5ZCO5Y+w5Y+C5pWwXHJcbiAgICAgIHJldHVyblBhZ2U6ICcnLC8v5omL5Yq/6L+U5Zue6YWN572u5L+h5oGvLOi/lOWbnumhtemdolxyXG4gICAgICBjb3VudE5vdzogMCxcclxuICAgICAgaXNTaG93TG9naW46IGZhbHNlLC8v5piv5ZCm5byA5ZCv5bm/5ZGK5ZCO5Y+w5Y+C5pWw6YC76L6RXHJcbiAgICAgIGlzU2hvd1RjbGF5ZXJMb2dpbjogZmFsc2UsLy/mmK/lkKblvIDlkK/lub/lkYrpobXpnaLpgI/mmI7lsYLphY3nva7pgLvovpFcclxuICAgICAgcXVvdGFMaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMC4xLFxyXG4gICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMC41LFxyXG4gICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aXRsZTogMSxcclxuICAgICAgICAgIGlkOiA0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHNob3dEaWFsb2c6IGZhbHNlLFxyXG4gICAgICBzaG93RGlhbG9nMjogZmFsc2UsLy/mrKHmlbDlt7LnlKjlroznqpflj6NcclxuICAgICAgcmVjZWl2ZWRDb3VudDogOCwvL+WJqeS9measoeaVsFxyXG4gICAgICBzeXNjbGlja0NvdW50OiAtMSwvL+WQjuWPsOezu+e7n+iuvue9rueahOi9rOWMlueCueWHu+asoeaVsCAg5LiN6IO96K6+572u5Li6MFxyXG4gICAgICB1c2VyQWRjbGlja0NvdW50OiAwLC8v5b2T5YmN6Lez6L2s55So5oi354K55Ye75bm/5ZGK5oC75qyh5pWwXHJcbiAgICB9LFxyXG5cclxuICAgIG9uSW5pdDogZnVuY3Rpb24gKGUpIHtcclxuXHJcblxyXG4gICAgICAvL+WkhOeQhuWbnuS8oFxyXG4gICAgICAkdXRpbHMuc2F2ZUhhcFVyaShlKVxyXG4gICAgICAvL+aYvuekumJhbm5lciDlub/lkYrpq5jluqbvvIzlupXpg6jnvKnov5tcclxuICAgICAgLy8gJHV0aWxzLnNob3dCYW5uZXJBZCgwKVxyXG4gICAgICAvL2NhbGxiYWNr5Li656m6LOS4jeaJp+ihjOW5v+WRiueCueWHu+aOp+WItumAu+i+kVxyXG4gICAgICB0aGlzLmlzU2hvd0xvZ2luID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbS5jYWxsYmFjayA/IHRydWUgOiBmYWxzZVxyXG5cclxuXHJcbiAgICAgIC8v6YCP5piO5bGC5bGV56S65q+U5L6L5Yik5patXHJcbiAgICAgIHRoaXMuaXNTaG93VGNsYXllck9mQkwoKVxyXG4gICAgICAvL+iOt+WPluaJi+WKv+i/lOWbnumFjee9ruS/oeaBryBcclxuICAgICAgdGhpcy5ib2xja1JldHVybigpXHJcblxyXG4gICAgICAvL+iOt+WPluaYr+WQpuiHquWKqOW8ueeqly3mi4bnuqLljIVcclxuICAgICAgdGhpcy5nZXRQb3BVcHMoKVxyXG5cclxuXHJcbiAgICAgIC8v6I635Y+W5ZCO5Y+w6K6+572u55qEIOi9rOWMlueCueWHu+asoeaVsFxyXG4gICAgICB0aGlzLmdldENsaWNrQ291bnQoKVxyXG4gICAgfSxcclxuICAgIG9uUmVhZHkob3B0aW9ucykge1xyXG4gICAgICB0aGlzLmdldEFkQ291bnQoKS8v5Y6f55Sf5bm/5ZGK5L2N77yM6I635Y+W5qyh5pWwXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgb25TaG93KG9wdGlvbnMpIHtcclxuICAgICAgJHVtZW5nX3N0YXQucmVzdW1lKHRoaXMpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvL+mAj+aYjuWxguWxleekuuavlOS+i+WIpOaWrVxyXG4gICAgaXNTaG93VGNsYXllck9mQkwoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Nob3dMb2dpbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsYmFja+S4uuepuizkuI3miafooYzpgI/mmI7lsYLlsZXnpLrmr5TkvovliKTmlq0nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICAkYXBpcy5leGFtcGxlLnNob3dUY2xheWVyKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+mhtemdoumAj+aYjuavlOS+i+WIpOaWrTonLCByZXMpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGNsYXllckxvZ2luID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dUY2xheWVyTG9naW4pIHsvL+W9k+WJjemcgOimgeaJp+ihjOmAj+aYjueCueWHu+WxguinhOWImVxyXG4gICAgICAgICAgdGhpcy5vbnBlU2hvd1RjbGF5ZXJMb2dpbigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+mhtemdoumAj+aYjuavlOS+i+WIpOaWremUmeivrycpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGNsYXllckxvZ2luID0gZmFsc2VcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5omn6KGM6YCP5piO54K55Ye75bGC6KeE5YiZIOagueaNruW9k+WkqeeCueWHu+asoeaVsOWIpOaWrVxyXG4gICAgYXN5bmMgb25wZVNob3dUY2xheWVyTG9naW4oKSB7XHJcblxyXG4gICAgICBhd2FpdCAkcHJvY2Vzc0RhdGEucmVzZXRUb2RheUNsaWNrc0lmTmVlZGVkKCkvL+ajgOafpeaYr+WQpumcgOimgemHjee9ruW5v+WRiueCueWHu+asoeaVsFxyXG4gICAgICBsZXQgY291bnQgPSBhd2FpdCAkcHJvY2Vzc0RhdGEuZ2V0U3RvcmFnZShcInRvZGF5Q2xpY2tzXCIpXHJcbiAgICAgIC8v6I635Y+W6aG16Z2i6YCP5piO5bGC6YWN572u5L+h5oGvXHJcbiAgICAgIHRoaXMuc2hvd1RjbGF5ZXIoY291bnQpXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5bpobXpnaLpgI/mmI7lsYLphY3nva7kv6Hmga8g5Lyg5qyh5pWwXHJcbiAgICBzaG93VGNsYXllcihjb3VudCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNTaG93VGNsYXllckxvZ2luKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+W9k+WJjemAj+aYjuWxguaJp+ihjOavlOS+i+WIhumFjeS4uuWQpizkuI3miafooYzpgI/mmI7lsYLpgLvovpEnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmICghY291bnQpIHtcclxuICAgICAgICBjb3VudCA9IDBcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY29uc29sZS5sb2coJ+W9k+WJjeW5v+WRiueCueWHu+asoeaVsCcsIGNvdW50KTtcclxuXHJcbiAgICAgIHRoaXMuY291bnROb3cgPSBjb3VudFxyXG4gICAgICAkYXBpcy5leGFtcGxlLnNob3dUY2xheWVyKHtcclxuICAgICAgICBjb3VudDogY291bnQvL+eCueWHu+W5v+WRiuasoeaVsCjpnZ7lv4XloaspLOacieS8oOaJjeS8muWMuemFjeinhOWImVxyXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygn6aG16Z2i6YCP5piO6YWN572u5L+h5oGvOicsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dUY2xheWVyID0gcmVzLmRhdGFcclxuXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn6aG16Z2i6YCP5piO6YWN572u5L+h5oGv6ZSZ6K+vJyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dUY2xheWVyID0gZmFsc2VcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYm9sY2tSZXR1cm4oKSB7XHJcbiAgICAgIGlmICghdGhpcy5pc1Nob3dMb2dpbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWxsYmFja+S4uuepuizkuI3miafooYzmiYvlir/ov5Tlm57mjqfliLbpgLvovpEgJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICAvL+iOt+WPluaJi+WKv+i/lOWbnumFjee9ruS/oeaBr1xyXG4gICAgICAkYXBpcy5leGFtcGxlLmJvbGNrUmV0dXJuKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aJi+WKv+i/lOWbnumFjee9ruS/oeaBrzonLCByZXMpO1xyXG4gICAgICAgIHRoaXMuaXNib2xja1JldHVybiA9IHJlcy5kYXRhLmlzUmV0dXJuXHJcbiAgICAgICAgdGhpcy5yZXR1cm5QYWdlID0gcmVzLmRhdGEucmV0dXJuUGFnZVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+aJi+WKv+i/lOWbnumFjee9ruS/oeaBr+mUmeivrycpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy/ojrflj5blkI7lj7Dorr7nva7nmoQg6L2s5YyW54K55Ye75qyh5pWwXHJcbiAgICBnZXRDbGlja0NvdW50KCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNTaG93TG9naW4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FsbGJhY2vkuLrnqbos5LiN5omn6KGM5ZCO5Y+w6K6+572u55qEIOi9rOWMlueCueWHu+asoeaVsCcpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBjb25zdCBwYXJhbSA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5hY3RpUGFyYW1cclxuICAgICAgY29uc29sZS5sb2coJ+i9rOWMlueCueWHu+asoeaVsCDlj4LmlbBwYXJhbT0gJywgcGFyYW0pXHJcbiAgICAgICRhcGlzLmV4YW1wbGUuY2xpY2tDb3VudCh7XHJcbiAgICAgICAgdHlwZTogcGFyYW0udHlwZSB8fCAnamgnLFxyXG4gICAgICAgIGNoYW5uZWxWYWx1ZTogcGFyYW0uY2hhbm5lbFZhbHVlLFxyXG4gICAgICAgIGNvcnBJZDogcGFyYW0uY29ycF9pZFxyXG4gICAgICB9XHJcbiAgICAgICkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+i9rOWMlueCueWHu+asoeaVsOmFjee9ruS/oeaBrzonLCByZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN5c2NsaWNrQ291bnQgPSByZXMuZGF0YVxyXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVyciwgJ+i9rOWMlueCueWHu+asoeaVsOmFjee9ruS/oeaBr+mUmeivrycpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25IaWRlKCkge1xyXG4gICAgICAkdW1lbmdfc3RhdC5wYXVzZSh0aGlzKTsvL+WcqG9uSGlkZeaWueazleeahOesrOS4gOihjOWKoOWFpeatpOS7o+eggVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5q+P5pel5qyh5pWwXHJcbiAgICBnZXRBZENvdW50KCkge1xyXG5cclxuICAgICAgJGFwaXMuZXhhbXBsZS5nZXRBZENvdW50KHtcclxuICAgICAgICBhZElkOiBnZXRBcHAoKS4kZGVmLmRhdGFBcHAubmF0aXZlQWRVbml0SWQsXHJcbiAgICAgICAgY2hhbm5lbDogJydcclxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+iOt+WPluavj+aXpeasoeaVsCcsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5jb3VudFQocmVzLmRhdGEpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8v6I635Y+W5piv5ZCm6Ieq5Yqo5by556qXLeaLhue6ouWMhVxyXG4gICAgZ2V0UG9wVXBzKCkge1xyXG5cclxuICAgICAgLy/lu7bml7bmiafooYzku6XkuIvku6PnoIHvvIzkvYbkuI3pmLvloZ7kuLvnur/nqItcclxuICAgICAgJGFwaXMuZXhhbXBsZS5wb3BVcHMoKVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgIC8v5YWI5omT5byA5o+S5bGP5bm/5ZGKIFxyXG4gICAgICAgICAgdGhpcy5vcGVuaW50ZXJzdGl0aWFsQWQocmVzLmRhdGEsIGZhbHNlKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIHRoaXMub3BlbmludGVyc3RpdGlhbEFkKGZhbHNlLCBmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvL+WIpOaWreaYr+WQpumcgOimgeiHquWKqOaJk+W8gOWOn+eUn+W5v+WRilxyXG4gICAgaXNPcGVuQWQoaXNBdXRvT3Blbikge1xyXG4gICAgICAvLyDkvb/nlKggc2V0VGltZW91dCDlu7bml7YgODAwIOavq+enklxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNBdXRvT3Blbikge1xyXG4gICAgICAgICAgdGhpcy5vcGVuYWQoKTsvL+aJk+W8gOaLhue6ouWMhVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgODAwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5omT5byA5Y6f55Sf5bm/5ZGKXHJcbiAgICBvcGVuYWQoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IHRydWVcclxuICAgICAgLy8gJHV0aWxzLmhpZGVCYW5lckFkKClcclxuXHJcbiAgICAgIC8v5Y+L55uf5LqL5Lu25omT54K5XHJcbiAgICAgICR1bWVuZ19zdGF0LnRyYWNrRXZlbnQoJ3h5ZmRkaGpfY2ZkJywgJ+eCueWHuycpO1xyXG4gICAgfSxcclxuICAgIC8qKkBwYXJhbSBpc0F1dG9PcGVuIOaYr+WQpuiHquWKqOW8gOWQr+aLhuemj+iii+eql+WPo1xyXG4gICAgICogQHBhcmFtIGlzT3BlbkludGVyQWQg5piv5ZCm6Ieq5Yqo5byA5ZCv5o+S5bGP5bm/5ZGKXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgb3BlbmludGVyc3RpdGlhbEFkKGlzQXV0b09wZW4sIGlzT3BlbkludGVyQWQpIHtcclxuXHJcbiAgICAgIGlmIChpc09wZW5JbnRlckFkKSB7XHJcbiAgICAgICAgY29uc3Qgb25DbG9zZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiuWFs+mXreS6hicpO1xyXG4gICAgICAgICAgLy/liKTmlq3lkI7lj7DmmK/lkKbphY3nva7kuoboh6rliqjmiZPlvIDlvIDmi4bnuqLljIVcclxuICAgICAgICAgIHRoaXMuaXNPcGVuQWQoaXNBdXRvT3BlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb25DYXRjaENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+WKoOi9veWksei0pScpO1xyXG4gICAgICAgICAgdGhpcy5pc09wZW5BZChpc0F1dG9PcGVuKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aJk+W8gOaPkuWxj+W5v+WRilxyXG4gICAgICAgICR1dGlscy50YWJsZVBsYXF1ZShvbkNsb3NlQ2FsbGJhY2ssIG9uQ2F0Y2hDYWxsYmFjaylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlzT3BlbkFkKHRydWUpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZW1pdEV2dChldnQpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+aLhuemj+iii+WbnuiwgzplbWl0RXZ0KGV2dCknKTtcclxuXHJcbiAgICAgIHRoaXMuc2hvd0RpYWxvZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY291bnRUKGV2dC5kZXRhaWwuY291bnQpXHJcbiAgICAgICR1dGlscy52aWV3QmFubmVyKClcclxuXHJcblxyXG4gICAgICBhd2FpdCAkcHJvY2Vzc0RhdGEuaW5jcmVtZW50VG9kYXlDbGlja3MoKS8v5omn6KGM5LiA5qyh54K55Ye75bm/5ZGKXHJcbiAgICAgIC8v6I635Y+W6aG16Z2i6YCP5piO5bGC6YWN572u5L+h5oGvICDkvKDlhaXlvZPliY3ngrnlh7vmrKHmlbBcclxuICAgICAgdGhpcy5zaG93VGNsYXllcihhd2FpdCAkcHJvY2Vzc0RhdGEuZ2V0U3RvcmFnZShcInRvZGF5Q2xpY2tzXCIpICsgMSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXRDbG9zZSgpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+aLhuemj+iii+Wksei0pScpO1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cgPSBmYWxzZVxyXG4gICAgICAkdXRpbHMudmlld0Jhbm5lcigpXHJcbiAgICB9LFxyXG5cclxuICAgIGNvdW50VChjKSB7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRDb3VudCA9IE1hdGgubWluKDgsIE1hdGgubWF4KDAsIDggLSBjKSk7Ly9cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnNob3dEaWFsb2cyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYmFjaygpXHJcbiAgICB9LFxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAkdXRpbHMuZGVzdHJveUJhbm5lcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiYWNrKCkge1xyXG4gICAgICBsZXQgdSA9ICdQYWdlX01haW5UYWInXHJcbiAgICAgIGlmICh0aGlzLnJldHVyblBhZ2UpIHtcclxuICAgICAgICB1ID0gdGhpcy5yZXR1cm5QYWdlXHJcbiAgICAgIH1cclxuICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICB1cmk6IHVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb25CYWNrUHJlc3MoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNob3dEaWFsb2cgPyB0cnVlIDogdGhpcy5vblJldHVyblBhZ2UoKSAgICAvL+WmguaenG5hdGl2ZS1hZOaYvuekuuS6hu+8jOWwseS4jeiDvei/lOWbnumUrlxyXG4gICAgfSxcclxuXHJcbiAgICBvblJldHVyblBhZ2UoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdqdW1wTGluazonLCB0aGlzLnJldHVyblBhZ2UpO1xyXG4gICAgICBpZiAodGhpcy5yZXR1cm5QYWdlKSB7XHJcbiAgICAgICAgJHJvdXRlci5wdXNoKHtcclxuICAgICAgICAgIHVyaTogdGhpcy5yZXR1cm5QYWdlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNib2xja1JldHVyblxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkQWRjKCkge1xyXG4gICAgICB0aGlzLnVzZXJBZGNsaWNrQ291bnQgKz0gMVxyXG4gICAgICBjb25zb2xlLmxvZygn5ZCO5Y+w6YWN572u6L2s5YyW54K55Ye75qyh5pWw77yaJywgdGhpcy5zeXNjbGlja0NvdW50LCAnLOacrOasoei3s+i9rCDlub/lkYrngrnlh7vmgLvmlbA6ICcsIHRoaXMudXNlckFkY2xpY2tDb3VudCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zeXNjbGlja0NvdW50ID09PSB0aGlzLnVzZXJBZGNsaWNrQ291bnQpIHtcclxuICAgICAgICAvL+i9rOWMluS4iuS8oFxyXG4gICAgICAgICR1dGlscy5nZXRDb252ZXJ0VXBsb2FkKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5bm/5ZGK54K55Ye75qyh5pWw5LiN5Yy56YWN77yM5LiN6L2s5YyWJyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/ljp/nlJ/lub/lkYrliqDovb3miJDlip/lm57osINcclxuICAgIHNob3dOdmFkKCkge1xyXG4gICAgICBpZiAodGhpcy5zeXNjbGlja0NvdW50ID09PSAwKSB7XHJcbiAgICAgICAgLy/ovazljJbkuIrkvKBcclxuICAgICAgICAkdXRpbHMuZ2V0Q29udmVydFVwbG9hZCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiaXRlbS1jb250YWluZXJcIj5cclxuICAgIDxkaXYgaWY9XCJuYXRpdmUuaXNTaG93XCIgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPHN0YWNrIGNsYXNzPVwic3RhY2tzdHlsZVwiPlxyXG4gICAgICAgIDxpbWFnZSBpZj1cIm5hdGl2ZS5pc1Nob3dJbWdcIiBjbGFzcz1cImltZ1wiIHNyYz1cInt7bmF0aXZlLmFkSW1nU3JjfX1cIiBvbmNsaWNrPVwicmVwb3J0TmF0aXZlQ2xpY2soKVwiPjwvaW1hZ2U+XHJcbiAgICAgICAgPGFkLWJ1dHRvbiBjbGFzcz1cImFkYnRuXCIgdmFsdWV0eXBlPVwiMFwiIGFkdW5pdGlkPVwie3tuYXRpdmUuYWRVbml0SWR9fVwiIGFkaWQ9XCJ7e25hdGl2ZS5hZERhdGEuYWRJZH19XCI+PC9hZC1idXR0b24+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJhZHNvdXJjZVwiPnt7IG5hdGl2ZS5hZERhdGEuc291cmNlIH19IOW5v+WRijwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkdGl0bGVcIj57eyBuYXRpdmUuYWREYXRhLnRpdGxlIH19PC90ZXh0PlxyXG4gICAgICAgIDwhLS0gPGltYWdlIGNsYXNzPVwiY2xvc2VJbWdcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCIgb25jbGljaz1cImNsb3NlQWRcIj48L2ltYWdlPiAtLT5cclxuICAgICAgPC9zdGFjaz5cclxuICAgIDwvZGl2PlxyXG4gICAgPGltYWdlIGlmPVwibmF0aXZlLmlzU2hvd1wiIGNsYXNzPVwiY2xvc2VJbWctcG9zXCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiIG9uY2xpY2s9XCJjbG9zZUFkXCI+PC9pbWFnZT5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuPHN0eWxlPlxyXG4gIC5pdGVtLWNvbnRhaW5lciB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDI1NnB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gIH1cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5zdGFja3N0eWxlIHtcclxuICAgIHdpZHRoOiA1NDBweDtcclxuICAgIGhlaWdodDogMzA2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG4gIC5jbG9zZUltZy1wb3Mge1xyXG4gICAgd2lkdGg6IDM2cHg7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogNTA7XHJcbiAgfVxyXG4gIC5jbG9zZUltZyB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgd2lkdGg6IDM2cHg7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgfVxyXG5cclxuICAuYWRzb3VyY2Uge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgfVxyXG4gIC5hZHRpdGxlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDBweDtcclxuICB9XHJcbiAgLmFkYnRuIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIC5hZGJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbjwvc3R5bGU+XHJcbjxzY3JpcHQ+XHJcbiAgbGV0IG5hdGl2ZUFkO1xyXG4gIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGRhdGE6IHtcclxuICAgICAgY29tcG9uZW50TmFtZTogXCJhZGJubmVyXCIsXHJcbiAgICAgIHByb3ZpZGVyOiBcIlwiLFxyXG4gICAgICBuYXRpdmU6IHtcclxuICAgICAgICBhZFVuaXRJZDogXCJcIixcclxuICAgICAgICBpc1Nob3c6IGZhbHNlLFxyXG4gICAgICAgIGFkRGF0YToge30sXHJcbiAgICAgICAgaXNTaG93SW1nOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd1ZpZGVvOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd0RhdGE6IHRydWUsXHJcbiAgICAgICAgZXJyU3RyOiBcIlwiLFxyXG4gICAgICAgIGJ0blR4dDogXCJcIixcclxuICAgICAgICBhZEltZ1NyYzogXCJcIixcclxuICAgICAgICBhZFZpZGVvU3JjOiBcIlwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgICAgdGhpcy5uYXRpdmUuYWRVbml0SWQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAubkFiYW5uZXJBZFVuaXRJZFxyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uUmVhZHkob3B0aW9ucykge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCJuYXRpdmVCYW5uZXIgYWQgb25SZWFkeVwiKTtcclxuICAgICAgdGhpcy5zaG93TmF0aXZlQWQoKTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIG9uU2hvdyhvcHRpb25zKSB7XHJcbiAgICAgIGlmICh0aGlzLm5hdGl2ZS5pc1Nob3cpIHtcclxuICAgICAgICB0aGlzLnJlcG9ydE5hdGl2ZVNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEFkUHJvdmlkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5wcm92aWRlciA9ICRhZC5nZXRQcm92aWRlcigpO1xyXG5cclxuICAgIH0sXHJcbiAgICBzaG93TmF0aXZlQWQoKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWRQcm92aWRlcigpO1xyXG4gICAgICBpZiAodGhpcy5wcm92aWRlciAhPT0gXCJodWF3ZWlcIikge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcInRoZSBkZXZpY2UgIGRvZXMgbm90IHN1cHBvcnQgYWQuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBuYXRpdmVBZCA9ICRhZC5jcmVhdGVOYXRpdmVBZCh7IGFkVW5pdElkOiB0aGlzLm5hdGl2ZS5hZFVuaXRJZCB9KTtcclxuICAgICAgbmF0aXZlQWQub25Mb2FkKGRhdGEgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyhcImFkIGRhdGEgbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5hZERhdGEgPSBkYXRhLmFkTGlzdFswXTtcclxuICAgICAgICBpZiAodGhpcy5uYXRpdmUuYWREYXRhKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5uYXRpdmUuYWREYXRhLmltZ1VybExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPSB0aGlzLm5hdGl2ZS5hZERhdGEuaW1nVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiIHRoaXMubmF0aXZlLmFkSW1nU3JjID1cIiArIHRoaXMubmF0aXZlLmFkSW1nU3JjKTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5uYXRpdmUuYWREYXRhLmNsaWNrQnRuVHh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmJ0blR4dCA9IHRoaXMubmF0aXZlLmFkRGF0YS5jbGlja0J0blR4dDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmJ0blR4dCA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdCAmJiB0aGlzLm5hdGl2ZS5hZERhdGEudmlkZW9VcmxMaXN0WzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkVmlkZW9TcmMgPSB0aGlzLm5hdGl2ZS5hZERhdGEudmlkZW9VcmxMaXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5lcnJTdHIgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5yZXBvcnROYXRpdmVTaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgbmF0aXZlQWQub25FcnJvcihlID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwibG9hZCBhZCBlcnJvcjpcIiArIEpTT04uc3RyaW5naWZ5KGUpKTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmF0aXZlLmVyclN0ciA9IEpTT04uc3RyaW5naWZ5KGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgbmF0aXZlQWQubG9hZCgpO1xyXG4gICAgfSxcclxuICAgIHJlcG9ydE5hdGl2ZVNob3coKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLnJlcG9ydEFkU2hvdyh7IGFkSWQ6IHRoaXMubmF0aXZlLmFkRGF0YS5hZElkIH0pXHJcblxyXG4gICAgICAgIC8v5aaC5p6c6L2s5YyW54K55Ye75qyh5pWw5Li6MCDliJnlub/lkYrliqDovb3miJDlip/lsLHovazljJbkuIrkvKBcclxuICAgICAgICB0aGlzLiRlbWl0KCdzaG93TnZhZCcpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVDbGljaygpIHtcclxuICAgICAgY29uc29sZS5pbmZvKFwiIOWOn+eUn+W5v+WRiuiiq+eCueWHu+S6hlwiKTtcclxuICAgICAgbmF0aXZlQWQucmVwb3J0QWRDbGljayh7XHJcbiAgICAgICAgYWRJZDogdGhpcy5uYXRpdmUuYWREYXRhLmFkSWRcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgLy/lub/lkYrooqvngrnlh7vml7bop6blj5HkuLvpobXpnaLmlrnms5VcclxuICAgICAgdGhpcy4kZW1pdCgnYWRkQWRjJylcclxuXHJcblxyXG4gICAgfSxcclxuICAgIGxpc3Rlbk5hdGl2ZUFkRG93bmxvYWRTdGF0dXMoZG93bmxvYWRzdGF0dXMpIHtcclxuICAgICAgaWYgKGRvd25sb2Fkc3RhdHVzID09PSBcIklOU1RBTExFRFwiKSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuYnRuVHh0ID0gXCJPUEVOXCI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdGFydEJ1dHRvbihldmVudCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdzdGFydCBkb3dubG9hZCByZXN1bHQgaXMgPSAnLCBldmVudC5yZXN1bHRDb2RlKVxyXG4gICAgfSxcclxuICAgIHJlbW92ZUFkTGlzdGVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLm9mZkRvd25sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBuYXRpdmVBZC5vZmZFcnJvcigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5hdGl2ZUFkIG9mZkVycm9yXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdGl2ZUFkLm9mZkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmVBZCBvZmZMb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5hdGl2ZUFkLm9mZlN0YXR1c0NoYW5nZWQoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgaWYgKG5hdGl2ZUFkKSB7XHJcbiAgICAgICAgbmF0aXZlQWQuZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lhbPpl63lub/lkYrlhoXlrrlcclxuICAgIGNsb3NlQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5uYXRpdmUuaXNTaG93ID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICB9XHJcbjwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cInRvcG9uLWFkXCIgc3JjPVwiQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvcGxhY2VtZW50LnV4XCI+PC9pbXBvcnQ+XHJcblxyXG48dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGFpbmVyXCI+XHJcbiAgICA8aW1hZ2UgY2xhc3M9XCJjbG9zZVZpZXdcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCIgb25jbGljaz1cImNsb3NlQWR2aWV3XCI+PC9pbWFnZT5cclxuICAgIDxpbWFnZSBzdHlsZT1cIm1hcmdpbi10b3A6IC0xMDBweDsgd2lkdGg6IDUyOHB4OyBoZWlnaHQ6IDcwOHB4XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvaWNvbl9neC5wbmdcIj48L2ltYWdlPlxyXG4gICAgPHRleHQgc3R5bGU9XCJtYXJnaW4tdG9wOiAtMTMwcHg7IHdpZHRoOiAzNjBweDsgaGVpZ2h0OiA5NHB4OyBmb250LXNpemU6IDM4cHg7IGNvbG9yOiAjZmZmOyBib3JkZXItcmFkaXVzOiA2MHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWM1ZDBhOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbGlnbjogY2VudGVyXCIgb25jbGljaz1cImNvbXBsZXRlQWRSU0FcIj7miZPlvIDlubbpooblj5Y8L3RleHQ+XHJcblxyXG4gICAgPCEtLSDkvb/nlKhQbGFjZW1lbnTnu4Tku7YgLS0+XHJcbiAgICA8dG9wb24tYWQgaWQ9XCJ0b3Bvbi1hZC17e3BsYWNlbWVudElkfX1cIiBwbGFjZW1lbnQtaWQ9XCJ7e3BsYWNlbWVudElkfX1cIiBjb25maWc9XCJ7e2NvbmZpZ319XCIgQGFkLWxvYWQ9XCJoYW5kbGVBZExvYWRcIiBAYWQtc2hvdz1cImhhbmRsZUFkU2hvd1wiIEBhZC1jbG9zZT1cImhhbmRsZUFkQ2xvc2VcIiBAYWQtY2xpY2s9XCJoYW5kbGVBZENsaWNrXCIgQGFkLWVycm9yPVwiaGFuZGxlQWRFcnJvclwiPjwvdG9wb24tYWQ+XHJcbiAgICA8ZGl2IGlmPVwie3tzaG93VGNsYXllcn19XCIgY2xhc3M9XCJ0Yy1sYXllclwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbiAgICBcclxuPHNjcmlwdD5cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgIGlzR2V0QWQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgZW50cnk6ICcvcGFnZXMvSG9tZScsIC8vIOW8gOWxj+W5v+WRiue7k+adn+WQjuaJk+W8gOeahOesrOS4gOS4qumhtemdolxyXG4gICAgICAgICAgdGltZW91dDogMzAwMDAgLy8g6buY6K6kMO+8iOi1sOm7mOiupO+8jOW8gOWxjzXnp5LvvIzlhbbku5YzMDDnp5LvvInvvIzljZXkvY3mr6vnp5JcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwbGFjZW1lbnRJZDogJ2I2Njk4ODlkYmQ0ZDgzJywgLy8g6K+35pu/5o2i5Li65oKo5ZyodG9wb24g5byA5Y+R6ICF5ZCO5Y+w5LiK55qEcGxhY2VtZW50SWRcclxuXHJcbiAgICAgICAgYWREYXRhOiBudWxsLCAvLyDlub/lkYrnianmlpnvvIzpgJrov4dnZXRBZOiOt+WPllxyXG4gICAgICAgIGRpc3BsYXllZDogZmFsc2UgLy8g6Ieq5riy5p+T5bm/5ZGK57uE5Lu25bGV56S65o6n5Yi2XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgLy8g57uE5Lu25pyq5oyC6L295a6M5oiQXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOW5v+WRiua6kExvYWTmiJDlip/lm57osINcclxuICAgIGhhbmRsZUFkTG9hZChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZW1v5o6l5pS2bG9hZOWbnuiwgycsIGUpXHJcbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZVxyXG5cclxuICAgICAgdGhpcy5oYW5kbGVHZXRBZCgpXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOW5v+WRiua6kFNob3fmiJDlip/lm57osINcclxuICAgIGhhbmRsZUFkU2hvdyhlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZW1v5o6l5pS2c2hvd+WbnuiwgycsIGUpXHJcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gdHJ1ZVxyXG5cclxuICAgICAgdGhpcy5oYW5kbGVSZXBvcnRTaG93KGUpXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOW5v+WRiua6kENsb3Nl5oiQ5Yqf5Zue6LCDXHJcbiAgICBoYW5kbGVBZENsb3NlKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RlbW/mjqXmlLZjbG9zZeWbnuiwgycsIGUpXHJcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQWRDbGljayhlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZW1v5o6l5pS2Y2xpY2vlm57osIMnLCBlKVxyXG5cclxuICAgICAgdGhpcy5oYW5kbGVSZXBvcnRDbGljayhlKS8v5bm/5ZGK5LiK5oqlXHJcblxyXG4gICAgICB0aGlzLnJlcG9ydE5hdGl2ZUNsaWNrKCkvL+WQjuWPsOS4iuaKpVxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVBZEVycm9yKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RlbW/mjqXmlLZlcnJvcuWbnuiwgycsIGUpXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyDlsZXnpLrlub/lkYrlub/lkYpcclxuICAgIGhhbmRsZURpc3BsYXlBZCgpIHtcclxuICAgICAgaWYgKHRoaXMuaXNTZWxmUmVuZGVyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWQgPSB0cnVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcGxhY2VtZW50ID0gdGhpcy5nZXRTZGtFbGVtZW50KCk7XHJcbiAgICAgICAgaWYgKHBsYWNlbWVudC5zaG93KSB7XHJcbiAgICAgICAgICBwbGFjZW1lbnQuc2hvdygpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGxvYWTliqDovb3lub/lkYrjgJDpppbmrKHmjILovb3nu4Tku7bml7bvvIxzZGvkvJroh6rliqjliqDovb3kuIDmrKHlub/lkYrvvIzml6DpnIDosIPnlKgubG9hZCgp5pa55rOV44CRXHJcbiAgICBoYW5kbGVMb2FkQWQoKSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiDph43nva5cclxuICAgICAgICovXHJcbiAgICAgIHRoaXMuaXNHZXRBZCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuZGlzcGxheWVkID0gZmFsc2VcclxuICAgICAgdGhpcy5hZERhdGEgPSBudWxsXHJcbiAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRoaXMuZ2V0U2RrRWxlbWVudCgpO1xyXG4gICAgICBpZiAocGxhY2VtZW50LmxvYWQpIHtcclxuICAgICAgICBwbGFjZW1lbnQubG9hZCgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlSXNSZWFkeSgpIHtcclxuICAgICAgY29uc3QgcGxhY2VtZW50ID0gdGhpcy5nZXRTZGtFbGVtZW50KCk7XHJcbiAgICAgIGlmIChwbGFjZW1lbnQuaXNSZWFkeSkge1xyXG4gICAgICAgIGNvbnN0IGlzUmVhZHkgPSBwbGFjZW1lbnQuaXNSZWFkeSgpXHJcbiAgICAgICAgcmV0dXJuIGlzUmVhZHlcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDojrflj5blub/lkYrntKDmnZBcclxuICAgIGhhbmRsZUdldEFkKCkge1xyXG4gICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+ivt+etieW+heWKoOi9veWujOaIkOWQjuWGjeiOt+WPluaVsOaNricpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwbGF5ZWQgPSBmYWxzZVxyXG4gICAgICB0aGlzLmFkRGF0YSA9IG51bGxcclxuICAgICAgY29uc3QgcGxhY2VtZW50ID0gdGhpcy5nZXRTZGtFbGVtZW50KClcclxuICAgICAgaWYgKHBsYWNlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRBZCA9IHBsYWNlbWVudC5nZXRBZCgpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnRBZCcsIGN1cnJlbnRBZClcclxuICAgICAgICBpZiAoIWN1cnJlbnRBZCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkRGF0YSA9IGN1cnJlbnRBZFxyXG5cclxuICAgICAgICB0aGlzLmlzR2V0QWQgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5oYW5kbGVEaXNwbGF5QWQoKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDkuIrmiqXlub/lkYrlsZXnpLrnu5/orqFcclxuICAgIGhhbmRsZVJlcG9ydFNob3coZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGVtb+aOpeaUtnNob3flm57osIMnLCBlKVxyXG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLmdldFNka0VsZW1lbnQoKVxyXG4gICAgICBpZiAocGxhY2VtZW50Py5yZXBvcnRTaG93KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+S4iuaKpXNob3cnKVxyXG4gICAgICAgIHBsYWNlbWVudC5yZXBvcnRTaG93KClcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDkuIrmiqXlub/lkYrngrnlh7vnu5/orqFcclxuICAgIGhhbmRsZVJlcG9ydENsaWNrKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RlbW/mjqXmlLZzaG935Zue6LCDJywgZSlcclxuICAgICAgY29uc3QgcGxhY2VtZW50ID0gdGhpcy5nZXRTZGtFbGVtZW50KClcclxuICAgICAgaWYgKHBsYWNlbWVudD8ucmVwb3J0Q2xpY2spIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5LiK5oqlY2xpY2snKVxyXG4gICAgICAgIHBsYWNlbWVudC5yZXBvcnRDbGljaygpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g6I635Y+W5bm/5ZGK57uE5Lu25a6e5L6LXHJcbiAgICBnZXRTZGtFbGVtZW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kY2hpbGQoYHRvcG9uLWFkLSR7dGhpcy5wbGFjZW1lbnRJZH1gKVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WFs+mXreW5v+WRiumhtemdolxyXG4gICAgY2xvc2VBZHZpZXc6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9zZScpXHJcblxyXG4gICAgfSxcclxuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCIg5Y6f55Sf5bm/5ZGK6KKr54K55Ye75LqGXCIpO1xyXG5cclxuICAgICAgLy/lub/lkYrooqvngrnlh7vml7bop6blj5HkuLvpobXpnaLmlrnms5VcclxuICAgICAgdGhpcy4kZW1pdCgnYWRkQWRjJylcclxuXHJcbiAgICAgIC8v5bm/5ZGK5oiW6YCP5piO5bGC6KKr54K55Ye75ZCO6ZqQ6JeP6YCP5piO5bGCXHJcbiAgICAgIHRoaXMuc2hvd1RjbGF5ZXIgPSBmYWxzZVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGNvbXBsZXRlQWRSU0EoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vmi4bnpo/ooosnKTtcclxuICAgICAgLy/lj4vnm5/kuovku7bmiZPngrlcclxuICAgICAgJHVtZW5nX3N0YXQudHJhY2tFdmVudCgneHlmZGRoal9jaGFpJywgJ+eCueWHuycpO1xyXG4gICAgICAvL+WFiOWIpOaWreW5v+WRiuayoeacieayoeWKoOi9veWHuuadpe+8jOayoeacieWwseebtOaOpei/lOWbnuS4jeaJp+ihjOaOpeWPo1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmRpc3BsYXllZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflub/lkYrlsZXnpLrkuI3miJDlip8s5ouG57qi5YyF5LiN5oiQ5YqfJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogJ+aLhue6ouWMheWksei0pe+8geivt+mHjeivlScsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRlbWl0KCdlbWl0Q2xvc2UnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHZhciBhZFR5cGUgPSAnTkFUSVZFJ1xyXG4gICAgICB2YXIgYWRJZCA9IHRoaXMuYWREYXRhLnVuaXRJZFxyXG4gICAgICB2YXIgY2hhbm5lbCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5jaGFubmVsXHJcbiAgICAgIHZhciBjb3VudE1heCA9IGdldEFwcCgpLiRkZWYuZGF0YUFwcC5jb3VudE1heFxyXG4gICAgICB2YXIgYnJhbmQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYnJhbmRcclxuICAgICAgdmFyIG9haWQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuYWN0aVBhcmFtLm9haWRcclxuICAgICAgdmFyIGluZm8gPSAkZGV2aWNlLmdldEluZm9TeW5jKCk7XHJcbiAgICAgIHZhciB1YSA9ICcnXHJcbiAgICAgIC8vIOehruS/nSB1YSDlr7nosaHljIXlkKvmiYDpnIDnmoTlj4LmlbBcclxuICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICB1YSA9IGAke2luZm8ubW9kZWx9LCAke2luZm8ucHJvZHVjdH0sICR7aW5mby5tYW51ZmFjdHVyZXJ9LCAke2luZm8ub3NUeXBlfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcigndWEg5a+56LGh5pyq5a6a5LmJ5oiW5LiN5YyF5ZCr5omA6ZyA55qE5Y+C5pWwJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8g5p6E5bu65Y+C5pWw5a+56LGhXHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBhZFR5cGUsXHJcbiAgICAgICAgYWRJZCxcclxuICAgICAgICBjaGFubmVsLFxyXG4gICAgICAgIGNvdW50TWF4LFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIG9haWQsXHJcbiAgICAgICAgdWFcclxuICAgICAgfTtcclxuICAgICAgY29uc29sZS5sb2coYOaehOW7uuWPguaVsOWvueixoToke3BhcmFtc31gKTtcclxuICAgICAgJGFwaXMuZXhhbXBsZS5jb21wbGV0ZUFkUlNBKHBhcmFtcykudGhlbigocmVzKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGDlrozmiJDlub/lkYotLS0tLS0tLS0tPiBqdW1wTGluazoke3Jlcy5kYXRhLmp1bXBMaW5rfSwg5a6M5oiQ5qyh5pWw77yaJHtyZXMuZGF0YS5jb3VudH0g5b2T5qyh5aWW5Yqx77yaJHtyZXMuZGF0YS5hd2FyZEFtb3VudH1gKTtcclxuXHJcbiAgICAgICAgLy/lhYjliKTmlq3mnInmsqHmnInov5Tlm57ot7Povazpk77mjqXvvIzmnInlsLHot7NcclxuICAgICAgICBpZiAocmVzLmRhdGEuanVtcExpbmspIHtcclxuICAgICAgICAgICRyb3V0ZXIucHVzaCh7XHJcbiAgICAgICAgICAgIHVyaTogcmVzLmRhdGEuanVtcExpbmtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIG1lcyA9ICcnXHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuYXdhcmRBbW91bnQpIHtcclxuICAgICAgICAgICAgbWVzID0gJ+aBreWWnOiOt+W+lzAuMDHlhYPnuqLljIUnXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuY291bnQgPiA4KSB7XHJcbiAgICAgICAgICAgICAgbWVzID0gJ+S7iuWkqea0u+WKqOasoeaVsOW3sueUqOWujCdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZXMgPSAn5YaN5p2l5LiA5qyhJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lcyxcclxuICAgICAgICAgICAgZ3Jhdml0eTogJ2NlbnRlcidcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRlbWl0KCdlbWl0RXZ0Jywge1xyXG4gICAgICAgICAgY291bnQ6IHJlcy5kYXRhLmNvdW50XHJcbiAgICAgICAgfSlcclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIsICfngrnlh7vmi4bnpo/ooovplJnor68nKTtcclxuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiBKU09OLnBhcnNlKGVycikubWVzc2FnZSxcclxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcbiAgICBcclxuPHN0eWxlID5cclxuICAudGMtbGF5ZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDg1MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICB9XHJcblxyXG4gIC5wYWdlLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuICAuY2xvc2VWaWV3IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDEwMHB4O1xyXG4gICAgdG9wOiAxNDBweDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIH1cclxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIml0ZW0tY29udGFpbmVyXCI+XHJcbiAgICA8aW1hZ2UgY2xhc3M9XCJjbG9zZVZpZXdcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCIgb25jbGljaz1cImNsb3NlQWR2aWV3XCI+PC9pbWFnZT5cclxuICAgIDwhLS0gPGltYWdlIHN0eWxlPVwid2lkdGg6IDM0MHB4OyBoZWlnaHQ6IDk0cHh6XCIgc3JjPVwiL0NvbW1vbi9pbWcvYWQvYnRfY3BkLnBuZ1wiIG9uY2xpY2s9XCJjb21wbGV0ZUFkUlNBXCI+PC9pbWFnZT4gLS0+XHJcbiAgICA8aW1hZ2Ugc3R5bGU9XCJtYXJnaW4tdG9wOiAtMTAwcHg7IHdpZHRoOiA1MjhweDsgaGVpZ2h0OiA3MDhweFwiIHNyYz1cIi9Db21tb24vaW1nL2FkL2ljb25fZ3gucG5nXCI+PC9pbWFnZT5cclxuICAgIDx0ZXh0IHN0eWxlPVwibWFyZ2luLXRvcDogLTEzMHB4OyB3aWR0aDogMzYwcHg7IGhlaWdodDogOTRweDsgZm9udC1zaXplOiAzOHB4OyBjb2xvcjogI2ZmZjsgYm9yZGVyLXJhZGl1czogNjBweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNWQwYTsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYWxpZ246IGNlbnRlclwiIG9uY2xpY2s9XCJjb21wbGV0ZUFkUlNBXCI+5omT5byA5bm26aKG5Y+WPC90ZXh0PlxyXG5cclxuICAgIDxkaXYgaWY9XCJuYXRpdmUuaXNTaG93XCIgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPGltYWdlIGNsYXNzPVwiY2xvc2VJbWdcIiBzcmM9XCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCIgb25jbGljaz1cImNsb3NlQWRcIj48L2ltYWdlPlxyXG4gICAgICA8dmlkZW8gaWQ9XCJ2aWRlb1wiIGlmPVwibmF0aXZlLmlzU2hvd1ZpZGVvXCIgc3JjPVwie3tuYXRpdmUuYWRWaWRlb1NyY319XCIgYXV0b3BsYXk9XCJ0cnVlXCIgb25jbGljaz1cInJlcG9ydE5hdGl2ZUNsaWNrKClcIiBjbGFzcz1cImFkLXZpZGVvXCI+PC92aWRlbz5cclxuICAgICAgPHN0YWNrIGNsYXNzPVwic3RhY2tzdHlsZVwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+XHJcbiAgICAgICAgPGltYWdlIGlmPVwibmF0aXZlLmlzU2hvd0ltZ1wiIGNsYXNzPVwiaW1nXCIgc3JjPVwie3tuYXRpdmUuYWRJbWdTcmN9fVwiPjwvaW1hZ2U+XHJcbiAgICAgICAgPGFkLWJ1dHRvbiBjbGFzcz1cImFkYnRuXCIgb25jbGljaz1cInN0YXJ0QnV0dG9uKClcIiB2YWx1ZXR5cGU9XCIwXCIgYWR1bml0aWQ9XCJ7e25hdGl2ZS5hZFVuaXRJZH19XCIgYWRpZD1cInt7bmF0aXZlLmFkRGF0YS5hZElkfX1cIj48L2FkLWJ1dHRvbj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImFkc291cmNlXCI+e3sgbmF0aXZlLmFkRGF0YS5zb3VyY2UgfX0g5bm/5ZGKPC90ZXh0PlxyXG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiYWR0aXRsZVwiPnt7IG5hdGl2ZS5hZERhdGEudGl0bGUgfX08L3RleHQ+XHJcbiAgICAgIDwvc3RhY2s+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGlmPVwie3tzaG93VGNsYXllcn19XCIgY2xhc3M9XCJ0Yy1sYXllclwiIG9uY2xpY2s9XCJyZXBvcnROYXRpdmVDbGljaygpXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcbjxzdHlsZT5cclxuICAudGMtbGF5ZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDg1MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAxMDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICB9XHJcblxyXG4gIC5pdGVtLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuICAuY29udGFpbmVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5zdGFja3N0eWxlIHtcclxuICAgIHdpZHRoOiA1NDBweDtcclxuICAgIGhlaWdodDogMzA2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgfVxyXG4gIC5pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG4gIC5jbG9zZUltZyB7XHJcbiAgICB3aWR0aDogMzZweDtcclxuICAgIGhlaWdodDogMzZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuY2xvc2VWaWV3IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDEwMHB4O1xyXG4gICAgdG9wOiAxNDBweDtcclxuICAgIHdpZHRoOiAzNnB4O1xyXG4gICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gIH1cclxuICAuYWxlcnQge1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYWQtdmlkZW8ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQxNXB4O1xyXG4gIH1cclxuICAuYnRuIHtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiZmZmO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICB9XHJcbiAgLmJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkYnRuIHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgYm90dG9tOiAyMHB4O1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIC5hZGJ0bjphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA1OGZiZDtcclxuICB9XHJcbiAgLmFkc291cmNlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuICAuYWR0aXRsZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwcHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48c2NyaXB0PlxyXG4gIGxldCBuYXRpdmVBZDtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBwcm9wczoge1xyXG5cclxuICAgICAgc2hvd1RjbGF5ZXI6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBhZFVwbG9hZDoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICBjb21wb25lbnROYW1lOiBcImFkXCIsXHJcbiAgICAgIHByb3ZpZGVyOiBcIlwiLFxyXG4gICAgICBuYXRpdmU6IHtcclxuICAgICAgICBhZFVuaXRJZDogXCJcIixcclxuICAgICAgICBpc1Nob3c6IGZhbHNlLFxyXG4gICAgICAgIGFkRGF0YToge30sXHJcbiAgICAgICAgaXNTaG93SW1nOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd1ZpZGVvOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd0RhdGE6IHRydWUsXHJcbiAgICAgICAgZXJyU3RyOiBcIlwiLFxyXG4gICAgICAgIGJ0blR4dDogXCJcIixcclxuICAgICAgICBhZEltZ1NyYzogXCJcIixcclxuICAgICAgICBhZFZpZGVvU3JjOiBcIlwiXHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgICAgdGhpcy5uYXRpdmUuYWRVbml0SWQgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAubmF0aXZlQWRVbml0SWRcclxuXHJcbiAgICAgIC8vIHRoaXMubmF0aXZlLmFkVW5pdElkID0gJ3Y1aDV4c2tscDInXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgb25SZWFkeShvcHRpb25zKSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbyhcIm5hdGl2ZSBhZCBvblJlYWR5XCIpO1xyXG4gICAgICB0aGlzLnNob3dOYXRpdmVBZCgpO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgb25TaG93KG9wdGlvbnMpIHtcclxuICAgICAgaWYgKHRoaXMubmF0aXZlLmlzU2hvdykge1xyXG4gICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QWRQcm92aWRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLnByb3ZpZGVyID0gJGFkLmdldFByb3ZpZGVyKCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd05hdGl2ZUFkKCkge1xyXG4gICAgICB0aGlzLmdldEFkUHJvdmlkZXIoKTtcclxuICAgICAgaWYgKHRoaXMucHJvdmlkZXIgIT09IFwiaHVhd2VpXCIpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJ0aGUgZGV2aWNlICBkb2VzIG5vdCBzdXBwb3J0IGFkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmF0aXZlQWQgPSAkYWQuY3JlYXRlTmF0aXZlQWQoeyBhZFVuaXRJZDogdGhpcy5uYXRpdmUuYWRVbml0SWQgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uTG9hZChkYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJhZCBkYXRhIGxvYWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuYWREYXRhID0gZGF0YS5hZExpc3RbMF07XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5pbWdVcmxMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmFkSW1nU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLmltZ1VybExpc3RbMF07XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIiB0aGlzLm5hdGl2ZS5hZEltZ1NyYyA9XCIgKyB0aGlzLm5hdGl2ZS5hZEltZ1NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlLmlzU2hvd0ltZyA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRJbWdTcmMgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS5jbGlja0J0blR4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSB0aGlzLm5hdGl2ZS5hZERhdGEuY2xpY2tCdG5UeHQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5idG5UeHQgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMubmF0aXZlLmFkRGF0YS52aWRlb1VybExpc3QgJiYgdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZS5hZFZpZGVvU3JjID0gdGhpcy5uYXRpdmUuYWREYXRhLnZpZGVvVXJsTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmUuYWRWaWRlb1NyYyA9IFwiXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5uYXRpdmUuZXJyU3RyID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMucmVwb3J0TmF0aXZlU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImxvYWQgYWQgZXJyb3I6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93SW1nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uYXRpdmUuaXNTaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hdGl2ZS5lcnJTdHIgPSBKU09OLnN0cmluZ2lmeShlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdGl2ZUFkLmxvYWQoKTtcclxuICAgIH0sXHJcbiAgICByZXBvcnROYXRpdmVTaG93KCkge1xyXG4gICAgICBpZiAobmF0aXZlQWQpIHtcclxuICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCB9KTtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzovazljJbngrnlh7vmrKHmlbDkuLowIOWImeW5v+WRiuWKoOi9veaIkOWKn+Wwsei9rOWMluS4iuS8oFxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Nob3dOdmFkJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlcG9ydE5hdGl2ZUNsaWNrKCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oXCIg5Y6f55Sf5bm/5ZGK6KKr54K55Ye75LqGXCIpO1xyXG4gICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHtcclxuICAgICAgICBhZElkOiB0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8v5bm/5ZGK6KKr54K55Ye75pe26Kem5Y+R5Li76aG16Z2i5pa55rOVXHJcbiAgICAgIHRoaXMuJGVtaXQoJ2FkZEFkYycpXHJcblxyXG4gICAgICAvL+W5v+WRiuaIlumAj+aYjuWxguiiq+eCueWHu+WQjumakOiXj+mAj+aYjuWxglxyXG4gICAgICB0aGlzLnNob3dUY2xheWVyID0gZmFsc2VcclxuXHJcbiAgICB9LFxyXG4gICAgc3RhcnRCdXR0b24oZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignc3RhcnQgZG93bmxvYWQgcmVzdWx0IGlzID0gJywgZXZlbnQucmVzdWx0Q29kZSlcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmIChuYXRpdmVBZCkge1xyXG4gICAgICAgIG5hdGl2ZUFkLmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5bm/5ZGK5YaF5a65XHJcbiAgICBjbG9zZUFkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubmF0aXZlLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8v5YWz6Zet5bm/5ZGK6aG16Z2iXHJcbiAgICBjbG9zZUFkdmlldzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdGhpcy4kZW1pdCgnZW1pdENsb3NlJylcclxuXHJcbiAgICB9LFxyXG4gICAgY29tcGxldGVBZFJTQSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ+eCueWHu+aLhuemj+iiiycpO1xyXG5cclxuICAgICAgLy/lj4vnm5/kuovku7bmiZPngrlcclxuICAgICAgJHVtZW5nX3N0YXQudHJhY2tFdmVudCgneHlmZGRoal9jaGFpJywgJ+eCueWHuycpO1xyXG5cclxuICAgICAgLy/lhYjliKTmlq3lub/lkYrmsqHmnInmsqHliqDovb3lh7rmnaXvvIzmsqHmnInlsLHnm7TmjqXov5Tlm57kuI3miafooYzmjqXlj6NcclxuXHJcbiAgICAgIGlmICghdGhpcy5uYXRpdmUuaXNTaG93KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+W5v+WRiuWxleekuuS4jeaIkOWKnyzmi4bnuqLljIXkuI3miJDlip8nKTtcclxuICAgICAgICAkcHJvbXB0LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiAn5ouG57qi5YyF5aSx6LSl77yB6K+36YeN6K+VJyxcclxuICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2VtaXRDbG9zZScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdmFyIGFkVHlwZSA9ICdOQVRJVkUnXHJcbiAgICAgIHZhciBhZElkID0gdGhpcy5uYXRpdmUuYWRVbml0SWRcclxuICAgICAgdmFyIGNoYW5uZWwgPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY2hhbm5lbFxyXG4gICAgICB2YXIgY291bnRNYXggPSBnZXRBcHAoKS4kZGVmLmRhdGFBcHAuY291bnRNYXhcclxuICAgICAgdmFyIGJyYW5kID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmJyYW5kXHJcbiAgICAgIHZhciBvYWlkID0gZ2V0QXBwKCkuJGRlZi5kYXRhQXBwLmFjdGlQYXJhbS5vYWlkXHJcbiAgICAgIHZhciBpbmZvID0gJGRldmljZS5nZXRJbmZvU3luYygpO1xyXG4gICAgICB2YXIgdWEgPSAnJ1xyXG4gICAgICAvLyDnoa7kv50gdWEg5a+56LGh5YyF5ZCr5omA6ZyA55qE5Y+C5pWwXHJcbiAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgdWEgPSBgJHtpbmZvLm1vZGVsfSwgJHtpbmZvLnByb2R1Y3R9LCAke2luZm8ubWFudWZhY3R1cmVyfSwgJHtpbmZvLm9zVHlwZX1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VhIOWvueixoeacquWumuS5ieaIluS4jeWMheWQq+aJgOmcgOeahOWPguaVsCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaFvYWlkOiR7b2FpZH0gIOaehOW7uuWPguaVsOWvueixoXVhOiR7dWF9YCk7XHJcbiAgICAgIC8vIOaehOW7uuWPguaVsOWvueixoVxyXG4gICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgYWRUeXBlLFxyXG4gICAgICAgIGFkSWQsXHJcbiAgICAgICAgY2hhbm5lbCxcclxuICAgICAgICBjb3VudE1heCxcclxuICAgICAgICBicmFuZCxcclxuICAgICAgICBvYWlkLFxyXG4gICAgICAgIHVhXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnNvbGUubG9nKGDmnoTlu7rlj4LmlbDlr7nosaE6JHtwYXJhbXN9YCk7XHJcbiAgICAgICRhcGlzLmV4YW1wbGUuY29tcGxldGVBZFJTQShwYXJhbXMpLnRoZW4oKHJlcykgPT4ge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhg5a6M5oiQ5bm/5ZGKLS0tLS0tLS0tLT4ganVtcExpbms6JHtyZXMuZGF0YS5qdW1wTGlua30sIOWujOaIkOasoeaVsO+8miR7cmVzLmRhdGEuY291bnR9IOW9k+asoeWlluWKse+8miR7cmVzLmRhdGEuYXdhcmRBbW91bnR9YCk7XHJcblxyXG4gICAgICAgIC8v5YWI5Yik5pat5pyJ5rKh5pyJ6L+U5Zue6Lez6L2s6ZO+5o6l77yM5pyJ5bCx6LezXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmp1bXBMaW5rKSB7XHJcbiAgICAgICAgICAkcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgICB1cmk6IHJlcy5kYXRhLmp1bXBMaW5rXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBtZXMgPSAnJ1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmF3YXJkQW1vdW50KSB7XHJcbiAgICAgICAgICAgIG1lcyA9ICfmga3llpzojrflvpcwLjAx5YWD57qi5YyFJ1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvdW50ID4gOCkge1xyXG4gICAgICAgICAgICAgIG1lcyA9ICfku4rlpKnmtLvliqjmrKHmlbDlt7LnlKjlrownXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWVzID0gJ+WGjeadpeS4gOasoSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXMsXHJcbiAgICAgICAgICAgIGdyYXZpdHk6ICdjZW50ZXInXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnZW1pdEV2dCcsIHtcclxuICAgICAgICAgIGNvdW50OiByZXMuZGF0YS5jb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAn54K55Ye75ouG56aP6KKL6ZSZ6K+vJyk7XHJcbiAgICAgICAgJHByb21wdC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgbWVzc2FnZTogSlNPTi5wYXJzZShlcnIpLm1lc3NhZ2UsXHJcbiAgICAgICAgICBncmF2aXR5OiAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG48L3NjcmlwdD4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmJhaWR1LW5hdGl2ZS1ib3hcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLmJhaWR1LW5hdGl2ZS1ib3gtLW5vbmVcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi51bmlvbi1hZC13cmFwZXJcIjoge1xuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgXCJ6SW5kZXhcIjogMTAwMDAwMDAwLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJoZWlnaHRcIjogXCIwcHhcIlxuICB9LFxuICBcIi51bmlvbi1hZC13cmFwZXIgI29wZW4tc2NyZWVuLWFkXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIlxuICB9LFxuICBcIi51bmlvbi1hZC13cmFwZXItLXNob3dcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnVuaW9uLWFkLXdyYXBlci0taGlkZVwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCIwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi50b3Bvbi1hZC1jbGlja2FibGVcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuYm90dG9tLWJhclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjE0NHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJsZWZ0XCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLWJhci1pdGVtXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiNTAlXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmJvdHRvbS1iYXItaXRlbSBpbWFnZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjYwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjYwcHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIlxuICB9LFxuICBcIi5ib3R0b20tYmFyLWl0ZW0gdGV4dFwiOiB7XG4gICAgXCJmb250RmFtaWx5XCI6IFwiUGluZ0ZhbmdTQy1SZWd1bGFyXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjI0cHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2I4YjhiOFwiLFxuICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI0MHB4XCJcbiAgfSxcbiAgXCIuYm90dG9tLWJhci1pdGVtIC5jdXJyZW50XCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmODI0YVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLmFkLWltYWdlXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiQEtFWUZSQU1FU1wiOiB7XG4gICAgXCJvdmVybGF5RW50ZXJcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcIm92ZXJsYXlMZWF2ZVwiOiBbXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJvcGFjaXR5XCI6IDAsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH1cbiAgICBdLFxuICAgIFwicGFuZWxlbnRlclwiOiBbXG4gICAgICB7XG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiMHB4XCIsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVZXFxcIjpcXFwiMTAwJVxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXSxcbiAgICBcInBhbmVsbGVhdmVcIjogW1xuICAgICAge1xuICAgICAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIwcHhcXFwifVwiLFxuICAgICAgICBcInRpbWVcIjogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJoZWlnaHRcIjogXCIwcHhcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ7XFxcInRyYW5zbGF0ZVlcXFwiOlxcXCIxMDAlXFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCIub3ZlcmxheS1lbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwib3ZlcmxheUVudGVyXCIsXG4gICAgXCJ6SW5kZXhcIjogMlxuICB9LFxuICBcIi5vdmVybGF5LWxlYXZlXCI6IHtcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJvdmVybGF5TGVhdmVcIlxuICB9LFxuICBcIi5wYW5lbC1lbnRlclwiOiB7XG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwicGFuZWxlbnRlclwiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIyMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgfSxcbiAgXCIucGFuZWwtbGVhdmVcIjoge1xuICAgIFwiaGVpZ2h0XCI6IFwiMHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuZmVlZC1hZFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDApXCIsXG4gICAgXCJjb2xvclwiOiBcIiNGRjAwMDBcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZmVlZC1hZC1leHBvc2VcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcIk9wYWNpdHlcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIi5hZC1jbG9zZS10aW1lclwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiM1NTU1NTVcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI0OHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjQ4cHhcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjI0cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmFkLWNsb3NlZC1idG4td3JhcFwiOiB7XG4gICAgXCJvcGFjaXR5XCI6IDAsXG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwiT3BhY2l0eVwiLFxuICAgIFwiYW5pbWF0aW9uRGVsYXlcIjogXCI1MG1zXCIsXG4gICAgXCJhbmltYXRpb25EdXJhdGlvblwiOiBcIjEwMG1zXCIsXG4gICAgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCIsXG4gICAgXCJhbmltYXRpb25GaWxsTW9kZVwiOiBcImZvcndhcmRzXCJcbiAgfSxcbiAgXCIuZmVlZC1hZC1leHBvc2VcIjoge1xuICAgIFwiYWxpZ25TZWxmXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaW50LW1haW5cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwid2lkdGhcIjogXCI4MCVcIlxuICB9LFxuICBcIi5pbnQtY2xvc2VcIjoge1xuICAgIFwid2lkdGhcIjogXCI1MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJhbGlnblNlbGZcIjogXCJmbGV4LWVuZFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTVweFwiLFxuICAgIFwibWFyZ2luUmlnaHRcIjogXCI1cHhcIlxuICB9LFxuICBcIi5tYXNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIixcbiAgICBcImZsZXhcIjogMSxcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoNSw1LDUsMC42KVwiXG4gIH0sXG4gIFwiLmludC1jb250ZW50XCI6IHtcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjMwcHhcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5ub3ZlbC1hZFwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImRpc3BsYXlcIjogXCJmbGV4XCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLm5vdmVsLXdlYlwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi5ub3ZlbC1zZWNvbmQtYWRcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhXcmFwXCI6IFwid3JhcFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiXG4gIH0sXG4gIFwiLm5vdmVsLXNlY29uZC1hZCAudGFiXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiODRweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2Y1ZjZmOVwiXG4gIH0sXG4gIFwiLm5vdmVsLXNlY29uZC1hZCAud2ViXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOTAlXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI4NHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxNDRweFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5ub3ZlbC1zZWNvbmQtYWQgLndlYi1hY3Jvc3MtdG9wXCI6IHtcbiAgICBcIm1hcmdpblRvcFwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLm5vdmVsLXNlY29uZC1hZCAud2ViLWFjcm9zcy1ib3R0b21cIjoge1xuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIubm92ZWwtc2Vjb25kLWFkIC5ib3R0b20tYmFyXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjE0NHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJAS0VZRlJBTUVTXCI6IHtcbiAgICBcIk9wYWNpdHlcIjogW1xuICAgICAge1xuICAgICAgICBcIm9wYWNpdHlcIjogMCxcbiAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgICBcInRpbWVcIjogMTAwXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcIi5hZC1jbG9zZWQtYnRuLXdyYXBcIjoge1xuICAgIFwib3BhY2l0eVwiOiAwLFxuICAgIFwiYW5pbWF0aW9uTmFtZVwiOiBcIk9wYWNpdHlcIixcbiAgICBcImFuaW1hdGlvbkRlbGF5XCI6IFwiNTBtc1wiLFxuICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogXCIxMDBtc1wiLFxuICAgIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiLFxuICAgIFwiYW5pbWF0aW9uRmlsbE1vZGVcIjogXCJmb3J3YXJkc1wiXG4gIH0sXG4gIFwiLm9wZW5JbWdXcmFwXCI6IHtcbiAgICBcIm9wYWNpdHlcIjogMCxcbiAgICBcImFuaW1hdGlvbk5hbWVcIjogXCJPcGFjaXR5XCIsXG4gICAgXCJhbmltYXRpb25EZWxheVwiOiBcIjUwbXNcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMTAwbXNcIixcbiAgICBcImFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uXCI6IFwiZWFzZS1pbi1vdXRcIixcbiAgICBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IFwiZm9yd2FyZHNcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e30iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLm5vdmVsLXdyYXBwZXJcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2YxZjFmMVwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIixcbiAgICBcImZsZXhXcmFwXCI6IFwid3JhcFwiXG4gIH0sXG4gIFwiLnRhYi1iYXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI4NHB4XCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjQ4cHhcIixcbiAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiLFxuICAgIFwiZGlzcGxheVwiOiBcImZsZXhcIlxuICB9LFxuICBcIi50YWJzXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gIH0sXG4gIFwiLnRhYi1iYXItaXRlbVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiZmxleFwiLFxuICAgIFwiZmxleFdyYXBcIjogXCJ3cmFwXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwid2lkdGhcIjogXCI5NnB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi50YWItYmFyLXRleHRcIjoge1xuICAgIFwid2lkdGhcIjogXCI5NnB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICBcImZvbnRGYW1pbHlcIjogXCJQaW5nRmFuZ1NDLVNlbWlib2xkXCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIxMHB4XCJcbiAgfSxcbiAgXCIudGFiLWJhci10ZXh0LXdyYXBwZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCI5NnB4XCIsXG4gICAgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5jdXItdGFiXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmODI0YVwiXG4gIH0sXG4gIFwiLnRhYi1iYXItYmctbGluZVwiOiB7XG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCI2cHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiOXB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmY4MjRhXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuY29udGFpbmVyXCI6IHtcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2FkL2JnX2NoYi5wbmdcIixcbiAgICBcImJhY2tncm91bmRSZXBlYXRcIjogXCJuby1yZXBlYXRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjBweFwiXG4gIH0sXG4gIFwiLm5iYWRcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYm90dG9tXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY29uZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5kYWxpeVwiOiB7XG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcInNwYWNlLWFyb3VuZFwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNTAwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMjU4cHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcImJhY2tncm91bmRcIjogXCJ7XFxcInZhbHVlc1xcXCI6W3tcXFwidHlwZVxcXCI6XFxcImxpbmVhckdyYWRpZW50XFxcIixcXFwiZGlyZWN0aW9uc1xcXCI6W1xcXCI5MGRlZ1xcXCJdLFxcXCJ2YWx1ZXNcXFwiOltcXFwiI2U5ZmQ2NVxcXCIsXFxcIiM5NWZmMzcgMTAwJVxcXCJdfV19XCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIxNTRweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcIm1hcmdpbkJvdHRvbVwiOiBcIjMwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiNDhweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNDhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMzBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5pbWFnZV9maW5nZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIyMjJweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMjIycHhcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIjQwMHB4XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjMwcHhcIixcbiAgICBcImJhY2tncm91bmRJbWFnZVwiOiBcIi9Db21tb24vaW1nL2FkL2ljb25fc3oucG5nXCIsXG4gICAgXCJhbmltYXRpb25OYW1lXCI6IFwiZmxvYXRcIixcbiAgICBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IFwiMTUwMG1zXCIsXG4gICAgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiAtMVxuICB9LFxuICBcIkBLRVlGUkFNRVNcIjoge1xuICAgIFwiZmxvYXRcIjogW1xuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIi02MHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWFxcXCI6XFxcIi02MHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDUwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcInRyYW5zZm9ybVwiOiBcIntcXFwidHJhbnNsYXRlWVxcXCI6XFxcIjBweFxcXCJ9XCIsXG4gICAgICAgIFwidGltZVwiOiAxMDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwie1xcXCJ0cmFuc2xhdGVYXFxcIjpcXFwiMHB4XFxcIn1cIixcbiAgICAgICAgXCJ0aW1lXCI6IDEwMFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCIuYnRtX3ZpZXdcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MDBweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYm90dG9tXCI6IFwiMTAwcHhcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuaXRlbS1kaXZcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjE3MnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjE2MnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kSW1hZ2VcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2hiYmcucG5nXCJcbiAgfSxcbiAgXCIuaXRlbS1kaXYtdGV4dFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiNkMzAwMDlcIixcbiAgICBcImZvbnRTaXplXCI6IFwiNjBweFwiLFxuICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcIm1hcmdpblRvcFwiOiBcIi00MHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImhlaWdodFwiOiBcIjI1NnB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImZsZXhEaXJlY3Rpb25cIjogXCJjb2x1bW5cIixcbiAgICBcInBvc2l0aW9uXCI6IFwiZml4ZWRcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuc3RhY2tzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU0MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzMDZweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYmFja2dyb3VuZFNpemVcIjogXCIxMDAlXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jbG9zZUltZy1wb3NcIjoge1xuICAgIFwid2lkdGhcIjogXCIzNnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiNTBweFwiXG4gIH0sXG4gIFwiLmNsb3NlSW1nXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwibGVmdFwiOiBcIjBweFwiLFxuICAgIFwid2lkdGhcIjogXCIzNnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzNnB4XCJcbiAgfSxcbiAgXCIuYWRzb3VyY2VcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgXCJyaWdodFwiOiBcIjBweFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxOHB4XCIsXG4gICAgXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuYWR0aXRsZVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBcInBhZGRpbmdUb3BcIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdSaWdodFwiOiBcIjEwcHhcIixcbiAgICBcInBhZGRpbmdCb3R0b21cIjogXCI1cHhcIixcbiAgICBcInBhZGRpbmdMZWZ0XCI6IFwiMTBweFwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJmb250U2l6ZVwiOiBcIjE4cHhcIixcbiAgICBcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIjogXCIwcHhcIlxuICB9LFxuICBcIi5hZGJ0blwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjIwMHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMGJmZmZcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjhweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwiYWxpZ25TZWxmXCI6IFwiZmxleC1lbmRcIixcbiAgICBcImJvdHRvbVwiOiBcIjIwcHhcIixcbiAgICBcInJpZ2h0XCI6IFwiMjBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yOmFjdGl2ZVwiOiBcIiMwNThmYmRcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi50Yy1sYXllclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg1MHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIxMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgfSxcbiAgXCIucGFnZS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jbG9zZVZpZXdcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwibGVmdFwiOiBcIjEwMHB4XCIsXG4gICAgXCJ0b3BcIjogXCIxNDBweFwiLFxuICAgIFwid2lkdGhcIjogXCIzNnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIi50Yy1sYXllclwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjg1MHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJib3R0b21cIjogXCIxMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjkpXCJcbiAgfSxcbiAgXCIuaXRlbS1jb250YWluZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDAsMCwwLDAuOSlcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCIsXG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwiY29sdW1uXCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImZpeGVkXCIsXG4gICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICBcImxlZnRcIjogXCIwcHhcIlxuICB9LFxuICBcIi5jb250YWluZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcImNvbHVtblwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuc3RhY2tzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjU0MHB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzMDZweFwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCIuaW1nXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiMHB4XCJcbiAgfSxcbiAgXCIuY2xvc2VJbWdcIjoge1xuICAgIFwid2lkdGhcIjogXCIzNnB4XCIsXG4gICAgXCJoZWlnaHRcIjogXCIzNnB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuY2xvc2VWaWV3XCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImxlZnRcIjogXCIxMDBweFwiLFxuICAgIFwidG9wXCI6IFwiMTQwcHhcIixcbiAgICBcIndpZHRoXCI6IFwiMzZweFwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMzZweFwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCJcbiAgfSxcbiAgXCIuYWxlcnRcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCI0MHB4XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCJcbiAgfSxcbiAgXCIuYWQtdmlkZW9cIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCI0MTVweFwiXG4gIH0sXG4gIFwiLmJ0blwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI4MHB4XCIsXG4gICAgXCJ3aWR0aFwiOiBcIjYwJVwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYmZmZlwiLFxuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgXCJib3JkZXJSYWRpdXNcIjogXCIyMHB4XCIsXG4gICAgXCJtYXJnaW5Cb3R0b21cIjogXCIyMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiIzA1OGZiZFwiXG4gIH0sXG4gIFwiLmFkYnRuXCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMjAwcHhcIixcbiAgICBcImhlaWdodFwiOiBcIjUwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwYmZmZlwiLFxuICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiOHB4XCIsXG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJhbGlnblNlbGZcIjogXCJmbGV4LWVuZFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIyMHB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3I6YWN0aXZlXCI6IFwiIzA1OGZiZFwiXG4gIH0sXG4gIFwiLmFkc291cmNlXCI6IHtcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcInJnYmEoMCwwLDAsMC41KVwiLFxuICAgIFwicGFkZGluZ1RvcFwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMTBweFwiLFxuICAgIFwicGFkZGluZ0JvdHRvbVwiOiBcIjVweFwiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIxMHB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgIFwicmlnaHRcIjogXCIwcHhcIixcbiAgICBcImZvbnRTaXplXCI6IFwiMThweFwiLFxuICAgIFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiOiBcIjBweFwiXG4gIH0sXG4gIFwiLmFkdGl0bGVcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCIxMHB4XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IFwiNXB4XCIsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjEwcHhcIixcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxOHB4XCIsXG4gICAgXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCI6IFwiMHB4XCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwiY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgICAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgIFwidG9wXCI6IFwiNzJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjgwcHhcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImJhY2tcIlxuICAgICAgfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzaG93XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNib2xja1JldHVybil9LFxuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9iYWNrLnBuZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMjBweFwiLFxuICAgICAgICAgICAgXCJtYXJnaW5MZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjI4cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMzRweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi6K6h5q2l5pif55CDXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgXCJmb250U2l6ZVwiOiBcIjM1cHhcIixcbiAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBcIm1hcmdpbkxlZnRcIjogXCItMTBweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImRhbGl5XCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9jcy5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcInJpZ2h0XCI6IFwiMHB4XCIsXG4gICAgICAgICAgICBcImJvdHRvbVwiOiBcIjBweFwiLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEzNHB4XCIsXG4gICAgICAgICAgICBcImhlaWdodFwiOiBcIjUycHhcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMucmVjZWl2ZWRDb3VudD09PTA/J+S7iuaXpeasoeaVsOW3sueUqOWujCc6J+S7iuaXpeWFjei0ue+8micpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiBcImJvbGRcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJzcGFuXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy5yZWNlaXZlZENvdW50KSkrJ+asoSd9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5yZWNlaXZlZENvdW50PjApfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgIFwid2lkdGhcIjogXCIyODJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjI4MnB4XCIsXG4gICAgICAgIFwidG9wXCI6IFwiODAwcHhcIixcbiAgICAgICAgXCJsZWZ0XCI6IFwiMjUwcHhcIlxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcIm9wZW5hZFwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJidG1fdmlld1wiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJkYXRhSXRlbVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLml0ZW0pfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5xdW90YUxpc3QpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpdGVtLWRpdlwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50aXRsZSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIml0ZW0tZGl2LXRleHRcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl9mZC5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5pZD09PTEpfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm1hcmdpblRvcFwiOiBcIjIwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjE1MHB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTUwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibmF0aXZlLWFkLXRvcG9uXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNob3dUY2xheWVyXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaG93VGNsYXllcil9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dEaWFsb2cpfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJlbWl0LWV2dFwiOiBcImVtaXRFdnRcIixcbiAgICAgICAgXCJlbWl0LWNsb3NlXCI6IFwiZW1pdENsb3NlXCIsXG4gICAgICAgIFwiYWRkLWFkY1wiOiBcImFkZEFkY1wiLFxuICAgICAgICBcInNob3ctbnZhZFwiOiBcInNob3dOdmFkXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY29uZXJcIlxuICAgICAgXSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93RGlhbG9nMil9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNjcycHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiODAwcHhcIixcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZEltYWdlXCI6IFwiL0NvbW1vbi9pbWcvYWQvYmdfY29uZXIucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiL0NvbW1vbi9pbWcvYWQvaWNvbl94LnBuZ1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImNsb3NlSW1nXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2JnX2J1dC5wbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiNTc1cHhcIixcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMTc3cHhcIixcbiAgICAgICAgICAgIFwibWFyZ2luVG9wXCI6IFwiNTAwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiaW1hZ2VfZmluZ2VyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJvcGVuYWRcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlQm94KX0sXG4gIFwiZXZlbnRzXCI6IHtcbiAgICBcImNsaWNrXCI6IFwib25DbGlja1wiLFxuICAgIFwidG91Y2hzdGFydFwiOiBcIm9uVG91Y2hzdGFydFwiXG4gIH0sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIm1zc3AtbG9nb1wiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxvZ29VcmwpfVxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5sb2dvSW1nKX1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCLlub/lkYpcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5sb2dvVGV4dCl9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJ0b3Atb24tYWQtY2xpY2thYmxlLWFyZWFcIixcbiAgXCJhdHRyXCI6IHtcbiAgICBcImlzQ2xpY2thYmxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNGdWxsQ2xpY2thYmxlKX1cbiAgfSxcbiAgXCJldmVudHNcIjoge1xuICAgIFwiY3VzdG9tLXByb3h5LWNsaWNrXCI6IFwiaGFuZGxlQ2xpY2tcIixcbiAgICBcImN1c3RvbS1wcm94eS10b3VjaC1zdGFydFwiOiBcImhhbmRsZVRvdWNoU3RhcnRcIixcbiAgICBcImN1c3RvbS1wcm94eS10b3VjaC1tb3ZlXCI6IFwiaGFuZGxlVG91Y2hNb3ZlXCIsXG4gICAgXCJjdXN0b20tcHJveHktdG91Y2gtZW5kXCI6IFwiaGFuZGxlVG91Y2hFbmRcIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJsYW5kc2NhcC1hZC1jb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmNvbnRhaW5lclN0eWxlKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImxhbmRzY2FwLWFkLWNvbnRlbnRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuY29udGVudFN0eWxlKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJhcHBlYXJcIjogXCJoYW5kbGVBcHBlYXJcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuaW1nU3R5bGUpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmZ1bGxfdSl9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImltYWdlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRTdHlsZS5pbWdQcm9wZXJ0aWVzU3R5bGUpfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidG9wLW9uLWFkLWxvZ29cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibG9nb1N0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRTdHlsZS5sb2dvU3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJsb2dvVXJsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLnRwX2xvZ29fdSl9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlQnV0dG9uJiZ0aGlzLmNsb3NlQXR0YWNoSW1nKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRvcC1vbi1hZC1jbG9zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsb3NlU3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmNsb3NlU3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tcHJveHktY2xvc2VcIjogXCJoYW5kbGVDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZC1tYWluXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUubWFpblN0eWxlKX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImxhbmRzY2FwLWFkLWhlYWRlclwiXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuaGVhZGVyU3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWQtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLnRpdGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLnRpdGxlU3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkLWRlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuZGVzY1N0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmRlc2MpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ2NvbG9yOicrKCh0aGlzLmFkU3R5bGUuZGVzY1N0eWxlLmNvbG9yKSkrJztmb250LXNpemU6ICcrKCh0aGlzLmFkU3R5bGUuZGVzY1N0eWxlLmZvbnRTaXplKSkrJzt0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztsaW5lczogJysoKHRoaXMuYWRTdHlsZS5kZXNjU3R5bGUubGluZXMpKSsnO2ZsZXg6IDE7ZmxleC13cmFwOm5vd3JhcDsnfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGVtcGxhdGVJZD09PScyJyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYW5kc2NhcC1hZC1mb290ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmZvb3RlclN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZERhdGEuY3RhKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRvcC1vbi1hZC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZERhdGEuY3RhKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5TdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuYnV0dG9uU3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tcHJveHktY2xpY2tcIjogXCJoYW5kbGVDbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tLXByb3h5LXRvdWNoLXN0YXJ0XCI6IFwiaGFuZGxlVG91Y2hTdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tLXByb3h5LXRvdWNoLW1vdmVcIjogXCJoYW5kbGVUb3VjaE1vdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbS1wcm94eS10b3VjaC1lbmRcIjogXCJoYW5kbGVUb3VjaEVuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0b3Atb24tYWQtY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZVN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRTdHlsZS5jbG9zZVN0eWxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tLXByb3h5LWNsb3NlXCI6IFwiaGFuZGxlQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50ZW1wbGF0ZUlkIT09JzInKX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZERhdGEuY3RhKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhbmRzY2FwLWFkLWZvb3RlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmZvb3RlclN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRvcC1vbi1hZC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkRGF0YS5jdGEpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJidG5TdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUuYnV0dG9uU3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tcHJveHktY2xpY2tcIjogXCJoYW5kbGVDbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbS1wcm94eS10b3VjaC1zdGFydFwiOiBcImhhbmRsZVRvdWNoU3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tcHJveHktdG91Y2gtbW92ZVwiOiBcImhhbmRsZVRvdWNoTW92ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbS1wcm94eS10b3VjaC1lbmRcIjogXCJoYW5kbGVUb3VjaEVuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAndG9wLW9uLWFkeC1jb250YWluZXItJysoKHRoaXMuYWRPcHRpb24uX3VuaXRfaWQpKX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZGlzcGxheWVkKX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiYWR4LWNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICd0b3Atb24tYWR4LWNvbnRhaW5lci0nKygodGhpcy5hZE9wdGlvbi5fdW5pdF9pZCkpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYWR4LWdyYXBoaWNcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJhZERhdGFcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jdXJyZW50QWQpfSxcbiAgICAgICAgICAgIFwiYWRTdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUpfSxcbiAgICAgICAgICAgIFwidGVtcGxhdGVJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlSWQpfSxcbiAgICAgICAgICAgIFwiY2xvc2VCdXR0b25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbG9zZUJ1dHRvbil9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImN1c3RvbS1wcm94eS1jbGlja1wiOiBcImFkQ2xpY2tcIixcbiAgICAgICAgICAgIFwiY3VzdG9tLXByb3h5LWNsb3NlXCI6IFwiYWRDbG9zZVwiLFxuICAgICAgICAgICAgXCJjdXN0b20tcHJveHktdG91Y2gtc3RhcnRcIjogXCJhZFRvdWNoU3RhcnRcIixcbiAgICAgICAgICAgIFwiY3VzdG9tLXByb3h5LXRvdWNoLW1vdmVcIjogXCJhZFRvdWNoTW92ZVwiLFxuICAgICAgICAgICAgXCJjdXN0b20tcHJveHktdG91Y2gtZW5kXCI6IFwiYWRUb3VjaEVuZFwiLFxuICAgICAgICAgICAgXCJjdXN0b20tcHJveHktYXBwZWFyXCI6IFwiYWRBcHBlYXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwibW9iYWRzLWFkXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJpbnRcIixcbiAgICAgICAgXCJhcGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRPcHRpb24ucGxhY2VtZW50X2lkKX0sXG4gICAgICAgIFwiYXBwaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZE9wdGlvbi5hcHBfaWQpfSxcbiAgICAgICAgXCJkb3dubG9hZHBhbmVsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZG93bmxvYWRQYW5lbCl9LFxuICAgICAgICBcInZpc2libGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pc1Nob3cpfVxuICAgICAgfSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJhZC1sb2FkXCI6IFwiYWRMb2FkXCIsXG4gICAgICAgIFwiYWQtc2hvd1wiOiBcImFkU2hvd1wiLFxuICAgICAgICBcImFkLWNsaWNrXCI6IFwiYWRDbGlja1wiLFxuICAgICAgICBcImFkLWNsb3NlZFwiOiBcImFkQ2xvc2VcIixcbiAgICAgICAgXCJhZC1lcnJvclwiOiBcImFkRXJyb3JcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbKHRoaXMubmF0aXZlQm94Q2xhc3MpXX0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcIm1vYmFkcy1hZFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJhcGlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRPcHRpb24ucGxhY2VtZW50X2lkKX0sXG4gICAgICAgIFwiYXBwaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZE9wdGlvbi5hcHBfaWQpfSxcbiAgICAgICAgXCJkb3dubG9hZHBhbmVsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZG93bmxvYWRQYW5lbCl9LFxuICAgICAgICBcInZpZGVvYXV0b3BsYXlcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy52aWRlb0F1dG9wbGF5KX0sXG4gICAgICAgIFwidmlkZW9tdXRlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnZpZGVvTXV0ZWQpfSxcbiAgICAgICAgXCJ0eXBlXCI6IFwiZmVlZFwiLFxuICAgICAgICBcInJlZnJlc2hcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5yZWZyZXNoVGltZSl9LFxuICAgICAgICBcImFkc3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZENvbmZpZy5zdHlsZSl9LFxuICAgICAgICBcInRlbXBsYXRlaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50ZW1wbGF0ZUlkKX1cbiAgICAgIH0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaG93KX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiYWQtbG9hZFwiOiBcImFkTG9hZFwiLFxuICAgICAgICBcImFkLXNob3dcIjogXCJhZFNob3dcIixcbiAgICAgICAgXCJhZC1jbGlja1wiOiBcImFkQ2xpY2tcIixcbiAgICAgICAgXCJhZC1jbG9zZWRcIjogXCJhZENsb3NlXCIsXG4gICAgICAgIFwiYWQtZXJyb3JcIjogXCJhZEVycm9yXCIsXG4gICAgICAgIFwiZG93bmxvYWQtY2xpY2tcIjogXCJhZERvd25sb2FkQ2xpY2tcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbJ3VuaW9uLWFkLXdyYXBlcicsICh0aGlzLnNob3dDbGFzc05hbWUpXX0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcIm1vYmFkcy1hZFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwicnNwbGFzaFwiLFxuICAgICAgICBcImFwaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZE9wdGlvbi5wbGFjZW1lbnRfaWQpfSxcbiAgICAgICAgXCJhcHBpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkT3B0aW9uLmFwcF9pZCl9LFxuICAgICAgICBcImRvd25sb2FkcGFuZWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kb3dubG9hZFBhbmVsKX0sXG4gICAgICAgIFwic3BsYXNocmVzdHJpY3RcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zcGxhc2hSZXN0cmljdCl9LFxuICAgICAgICBcInNraXB0aW1lXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2tpcFRpbWUpfSxcbiAgICAgICAgXCJlbnRyeVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkQ29uZmlnLmVudHJ5KX0sXG4gICAgICAgIFwiY3VzdG9tY2xvc2VcIjogZnVuY3Rpb24gKCkge3JldHVybiAodHJ1ZSl9LFxuICAgICAgICBcImFkc3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZENvbmZpZy5zdHlsZSl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hvdyl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImFkLWxvYWRcIjogXCJhZExvYWRcIixcbiAgICAgICAgXCJhZC1zaG93XCI6IFwiYWRTaG93XCIsXG4gICAgICAgIFwiYWQtY2xpY2tcIjogXCJhZENsaWNrXCIsXG4gICAgICAgIFwiYWQtY2xvc2VkXCI6IFwiYWRDbG9zZVwiLFxuICAgICAgICBcImFkLWVycm9yXCI6IFwiYWRFcnJvclwiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJib3R0b20tYmFyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJib3R0b20tYmFyLWl0ZW1cIlxuICAgICAgXSxcbiAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYm90dG9tQmFyKX0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLm9uY2xpY2tCb3R0b21CYXIodGhpcy4kaWR4LGV2dCl9XG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpZHg9PT10aGlzLmN1ckluZGV4P3RoaXMuJGl0ZW0uaGlnaGxpZ2h0SWNvbjp0aGlzLiRpdGVtLmljb24pfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmljb24pfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImJvdHRvbS1iYXItaW1nXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS50ZXh0KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWyh0aGlzLiRpZHg9PT10aGlzLmN1ckluZGV4PydjdXJyZW50JzonJyldfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJjbG9zZS1idG5cIlxuICBdLFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYnRuc3R5bGUpfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2xvc2VJbWcpfVxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbG9zZUltZyl9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlSW1nU3R5bGUpfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlVGV4dCl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlVGV4dCl9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdjb2xvcjonKygodGhpcy5idG5zdHlsZS5jb2xvcikpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjbG9zZWJ0bi10ZXh0XCJcbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIm92ZXJsYXktY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsodGhpcy5vdmVybGF5Q2xhc3MpXX0sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUub3ZlcmxheSl9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzVmlzaWJsZSl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiY2xvc2VDbGlja1wiXG4gICAgICB9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLnBhbmVsKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInBhbmVsQ2xpY2tcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWyh0aGlzLnBhbmVsQ2xhc3MpXX0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5jb250ZW50V3JhcHBlcil9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5jb250ZW50KX0sXG4gICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2xvc2VQbmcpfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmNsb3NlKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmljb258fHRoaXMuYWREYXRhLndfcGljdXJsKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5pY29uKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkRGF0YS5hcHBuYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5hcHBuYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICfniYjmnKwnKygodGhpcy5hZERhdGEuYXBwX3ZlcnNpb258fCcnKSl9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmFwcF92ZXJzaW9uKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLnZlcnNpb24pfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLnB1Ymxpc2hlcil9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUucHVibGlzaGVyKX1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUubGlua0NvbnRhaW5lcil9LFxuICAgICAgICAgICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmZ1bmN0aW9uX2xpbmspfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5Yqf6IO9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmxpbmspfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkRGF0YS5wcml2YWN5X2xpbmspfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi6ZqQ56eBXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmxpbmspfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkRGF0YS5wZXJtaXNzaW9uX2xpbmspfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi5p2D6ZmQXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmxpbmspfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIueri+WNs+S4i+i9vVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuYnV0dG9uKX0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJ0bkNsaWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImFkLXZpZXdcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwiYWR1bml0aWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZE9wdGlvbi5hZF9pZCl9XG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hvdyl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcInJlbmRlclwiOiBcImFkU2hvd1wiLFxuICAgICAgICBcImNsaWNrXCI6IFwiYWRDbGlja1wiLFxuICAgICAgICBcImNsb3NlXCI6IFwiYWRDbG9zZVwiLFxuICAgICAgICBcImVycm9yXCI6IFwiYWRFcnJvclwiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJ3cmFwcGVyXCJcbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwid3JhcHBlclwiXG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge31cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge31cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImludC1hZFwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJpZFwiOiBcImFkLW1hc2tcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJtYXNrXCJcbiAgICAgIF0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNBZExvYWRlZCl9LFxuICAgICAgXCJpZFwiOiBcImFkLW1hc2tcIixcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiYXBwZWFyXCI6IFwib25BZEV4cG9zZVwiLFxuICAgICAgICAgICAgXCJkaXNhcHBlYXJcIjogXCJvbkFkRGlzYXBwZWFyXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZmVlZC1hZC1leHBvc2VcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjFweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMXB4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImludC1tYWluXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pbnRNYWluU3R5bGUpfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW50LWNsb3NlXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlU3R5bGUpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy5jb3VudGRvd24pKSsncyd9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNvdW50ZG93biYmIXRoaXMuZW5hYmxlQ2xvc2UpfSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcImJpbmRUaW1lckNsaWNrXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYWQtY2xvc2VkLWJ0bi13cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYWQtY2xvc2UtdGltZXJcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jb3VudERvd25TdHlsZSl9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCJodHRwczovL3JlbmRlci1zZXJ2ZXIuY2RuLmJjZWJvcy5jb20vc3RhdGljL2ltYWdlcy8yMDIyMDYyOS9lMWFjYzgxZjE0NDA5MjYzMTU1OTFhNjFiYjI4Nzk0OC5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5lbmFibGVDbG9zZSl9LFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwiYmluZENsb3NlXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiYWQtY2xvc2VkLWJ0bi13cmFwXCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImludC1jb250ZW50XCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmludENvbnRlbnRTdHlsZSl9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ1bmlvbi1jdXN0b21cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlQ29uZmlnKX0sXG4gICAgICAgICAgICAgICAgICAgIFwidGVtcGxhdGVJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlSWQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tY2xpY2tcIjogXCJjdXN0b21DbGlja1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJtb2JhZHMtYWRcIlxuICBdLFxuICBcImV2ZW50c1wiOiB7XG4gICAgXCJjbGlja1wiOiBcIm9uQ2xpY2tcIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zZW5kTG9nVXJsKX1cbiAgICAgIH0sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJoZWlnaHRcIjogXCIxcHhcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjFweFwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50eXBlPT09J25vdmVsJyl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJub3ZlbC1hZFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImNoYW5uZWxJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNoYW5uZWxJZCl9LFxuICAgICAgICAgICAgXCJzY2lkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2NpZCl9LFxuICAgICAgICAgICAgXCJ3ZWJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy53ZWJzcmMpfSxcbiAgICAgICAgICAgIFwibm92ZWxBZFR5cGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5ub3ZlbEFkVHlwZSl9LFxuICAgICAgICAgICAgXCJsYW5kaW5nUGFnZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxhbmRpbmdQYWdlKX0sXG4gICAgICAgICAgICBcImJhY2twcmVzc1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJhY2twcmVzcyl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImFyZWEtY2xpY2tcIjogXCJhcmVhQ2xpY2tcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImludC1hZFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImRvd25sb2FkcGFuZWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kb3dubG9hZHBhbmVsKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pbnRWaXNpYmxlKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbG9zZVwiOiBcImludENsb3NlXCIsXG4gICAgICAgICAgICBcImluaXQtY29tcGxldGVcIjogXCJpbml0Q29tcGxldGVcIixcbiAgICAgICAgICAgIFwiYXJlYS1jbGlja1wiOiBcImFyZWFDbGlja1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAoISh0aGlzLnR5cGU9PT0nbm92ZWwnKSl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJvcGVuLWFkXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiZW50cnlcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5lbnRyeSl9LFxuICAgICAgICAgICAgXCJvcGVuaW1nXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMub3BlbmltZyl9LFxuICAgICAgICAgICAgXCJhZHN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRzdHlsZSl9LFxuICAgICAgICAgICAgXCJjdXN0b21jbG9zZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmN1c3RvbWNsb3NlKX0sXG4gICAgICAgICAgICBcImRvd25sb2FkcGFuZWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kb3dubG9hZHBhbmVsKX0sXG4gICAgICAgICAgICBcInNoYWtlU2l6ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNoYWtlU2l6ZSl9LFxuICAgICAgICAgICAgXCJzaGFrZUludGVydmFsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hha2VJbnRlcnZhbCl9LFxuICAgICAgICAgICAgXCJpc1NoYWtlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaGFrZSl9LFxuICAgICAgICAgICAgXCJzcGxhc2hyZXN0cmljdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNwbGFzaHJlc3RyaWN0KX0sXG4gICAgICAgICAgICBcInNraXB0aW1lXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2tpcHRpbWUpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnR5cGU9PT0ncnNwbGFzaCcpfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImFyZWEtY2xpY2tcIjogXCJhcmVhQ2xpY2tcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImludC1hZFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImFkc3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZHN0eWxlKX0sXG4gICAgICAgICAgICBcImRvd25sb2FkcGFuZWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5kb3dubG9hZHBhbmVsKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50eXBlPT09J2ludCcmJnRoaXMuaW50VmlzaWJsZSl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xvc2VcIjogXCJpbnRDbG9zZVwiLFxuICAgICAgICAgICAgXCJpbml0LWNvbXBsZXRlXCI6IFwiaW5pdENvbXBsZXRlXCIsXG4gICAgICAgICAgICBcImFyZWEtY2xpY2tcIjogXCJhcmVhQ2xpY2tcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcIm5hdGl2ZS1hZFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImFkc3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZHN0eWxlKX0sXG4gICAgICAgICAgICBcInNoYWtlU2l6ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNoYWtlU2l6ZSl9LFxuICAgICAgICAgICAgXCJzaGFrZUludGVydmFsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hha2VJbnRlcnZhbCl9LFxuICAgICAgICAgICAgXCJpc1NoYWtlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNTaGFrZSl9LFxuICAgICAgICAgICAgXCJ2aWRlb2F1dG9wbGF5XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmlkZW9hdXRvcGxheSl9LFxuICAgICAgICAgICAgXCJ2aWRlb211dGVkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudmlkZW9tdXRlZCl9LFxuICAgICAgICAgICAgXCJkb3dubG9hZHBhbmVsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuZG93bmxvYWRwYW5lbCl9LFxuICAgICAgICAgICAgXCJzaG93dm9sdW1uXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd3ZvbHVtbil9LFxuICAgICAgICAgICAgXCJ0ZW1wbGF0ZWlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGVtcGxhdGVpZCl9LFxuICAgICAgICAgICAgXCJuZWVkcmVmcmVzaFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5lZWRyZWZyZXNoKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50eXBlPT09J2ZlZWQnJiZ0aGlzLmFkVmlzaWJsZSl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiZmVlZGJhY2stY2xpY2tcIjogXCJzaG93RmVlZGJhY2tcIixcbiAgICAgICAgICAgIFwiYXJlYS1jbGlja1wiOiBcImFyZWFDbGlja1wiLFxuICAgICAgICAgICAgXCJhcmVhLXRvdWNoc3RhcnRcIjogXCJhcmVhVG91Y2hzdGFydFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwicmV3YXJkLWFkXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiYWRzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkc3R5bGUpfSxcbiAgICAgICAgICAgIFwiZG93bmxvYWRwYW5lbFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRvd25sb2FkcGFuZWwpfSxcbiAgICAgICAgICAgIFwic2hvd0NvdW50ZG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dDb3VudGRvd24pfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnR5cGU9PT0ncnZpZGVvJyYmdGhpcy5hZFZpc2libGUpfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImFyZWEtY2xpY2tcIjogXCJhcmVhQ2xpY2tcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRvd25sb2FkLXBhbmVsXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmlzaWJsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnBhbmVsVmlzaWJsZSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcInBhbmVsLWNsb3NlXCI6IFwiZG93bmxvYWRQYW5lbENsb3NlXCIsXG4gICAgICAgICAgICBcImRvd25sb2FkLWNsaWNrXCI6IFwiZG93bmxvYWRDbGlja1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwibm92ZWwtYm9va3MtYWRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJjaGFubmVsSWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jaGFubmVsSWQpfSxcbiAgICAgICAgICAgIFwic2NpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNjaWQpfSxcbiAgICAgICAgICAgIFwid2Vic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMud2Vic3JjKX0sXG4gICAgICAgICAgICBcImJhY2twcmVzc1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJhY2twcmVzcyl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudHlwZT09PSdub3ZlbEJvb2tDaXR5Jyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiYXJlYS1jbGlja1wiOiBcImFyZWFDbGlja1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJpdGVtLWNvbnRhaW5lclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjbG9zZVZpZXdcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQWR2aWV3XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25fZ3gucG5nXCJcbiAgICAgIH0sXG4gICAgICBcInN0eWxlXCI6IHtcbiAgICAgICAgXCJtYXJnaW5Ub3BcIjogXCItMTAwcHhcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjUyOHB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiNzA4cHhcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIuaJk+W8gOW5tumihuWPllwiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwibWFyZ2luVG9wXCI6IFwiLTEzMHB4XCIsXG4gICAgICAgIFwid2lkdGhcIjogXCIzNjBweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjk0cHhcIixcbiAgICAgICAgXCJmb250U2l6ZVwiOiBcIjM4cHhcIixcbiAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJib3JkZXJSYWRpdXNcIjogXCI2MHB4XCIsXG4gICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2VjNWQwYVwiLFxuICAgICAgICBcImZvbnRXZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgIFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCJcbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjb21wbGV0ZUFkUlNBXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3cpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJjb250YWluZXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2VcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiY2xvc2VJbWdcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcImNsb3NlQWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRWaWRlb1NyYyl9LFxuICAgICAgICAgICAgXCJhdXRvcGxheVwiOiBcInRydWVcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcInZpZGVvXCIsXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dWaWRlbyl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLXZpZGVvXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkSW1nU3JjKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5pc1Nob3dJbWcpfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiaW1nXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJzdGFydEJ1dHRvblwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCh0aGlzLm5hdGl2ZS5hZERhdGEuc291cmNlKSkrJyDlub/lkYonfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJhZHNvdXJjZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmFkRGF0YS50aXRsZSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkdGl0bGVcIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93VGNsYXllcil9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRjLWxheWVyXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJyZXBvcnROYXRpdmVDbGlja1wiXG4gICAgICB9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHtcbiAgICBcImlkXCI6IFwiZmVlZC1hZFwiXG4gIH0sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImZlZWQtYWRcIlxuICBdLFxuICBcImlkXCI6IFwiZmVlZC1hZFwiLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzQWRMb2FkZWQpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiYXBwZWFyXCI6IFwib25BZEV4cG9zZVwiLFxuICAgICAgICAgICAgXCJkaXNhcHBlYXJcIjogXCJvbkFkRGlzYXBwZWFyXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiZmVlZC1hZC1leHBvc2VcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmV4cG9zZUlkKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjFweFwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiMXB4XCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmV4cG9zZUlkKX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ1bmlvbi1jdXN0b21cIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJsaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGVtcGxhdGVDb25maWcpfSxcbiAgICAgICAgICAgIFwidGVtcGxhdGVJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlSWQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjdXN0b20tY2xpY2tcIjogXCJjdXN0b21DbGlja1wiLFxuICAgICAgICAgICAgXCJjdXN0b20tdG91Y2hzdGFydFwiOiBcImN1c3RvbVRvdWNoc3RhcnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiYmxvY2tcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pc0FkTG9hZGVkJiZ0aGlzLmlzRG93bmxvYWRQYW5lbCYmIXRoaXMuY3VzdG9tUGFuZWwpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidW5pb24tY3VzdG9tXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwibGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmRvd25sb2FkUGFuZWxDb25maWcpfSxcbiAgICAgICAgICAgIFwidGVtcGxhdGVJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlSWQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjdXN0b20tdG91Y2hzdGFydFwiOiBcImN1c3RvbVRvdWNoc3RhcnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwicGFnZS1jb250YWluZXJcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX3gucG5nXCJcbiAgICAgIH0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2xvc2VWaWV3XCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZUFkdmlld1wiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJzcmNcIjogXCIvQ29tbW9uL2ltZy9hZC9pY29uX2d4LnBuZ1wiXG4gICAgICB9LFxuICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgIFwibWFyZ2luVG9wXCI6IFwiLTEwMHB4XCIsXG4gICAgICAgIFwid2lkdGhcIjogXCI1MjhweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBcIjcwOHB4XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCLmiZPlvIDlubbpooblj5ZcIlxuICAgICAgfSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIm1hcmdpblRvcFwiOiBcIi0xMzBweFwiLFxuICAgICAgICBcIndpZHRoXCI6IFwiMzYwcHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogXCI5NHB4XCIsXG4gICAgICAgIFwiZm9udFNpemVcIjogXCIzOHB4XCIsXG4gICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgIFwiYm9yZGVyUmFkaXVzXCI6IFwiNjBweFwiLFxuICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNlYzVkMGFcIixcbiAgICAgICAgXCJmb250V2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICBcInRleHRBbGlnblwiOiBcImNlbnRlclwiXG4gICAgICB9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiY29tcGxldGVBZFJTQVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ0b3Bvbi1hZFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICd0b3Bvbi1hZC0nKygodGhpcy5wbGFjZW1lbnRJZCkpfSxcbiAgICAgICAgXCJwbGFjZW1lbnRJZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnBsYWNlbWVudElkKX0sXG4gICAgICAgIFwiY29uZmlnXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY29uZmlnKX1cbiAgICAgIH0sXG4gICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gJ3RvcG9uLWFkLScrKCh0aGlzLnBsYWNlbWVudElkKSl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImFkLWxvYWRcIjogXCJoYW5kbGVBZExvYWRcIixcbiAgICAgICAgXCJhZC1zaG93XCI6IFwiaGFuZGxlQWRTaG93XCIsXG4gICAgICAgIFwiYWQtY2xvc2VcIjogXCJoYW5kbGVBZENsb3NlXCIsXG4gICAgICAgIFwiYWQtY2xpY2tcIjogXCJoYW5kbGVBZENsaWNrXCIsXG4gICAgICAgIFwiYWQtZXJyb3JcIjogXCJoYW5kbGVBZEVycm9yXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUY2xheWVyKX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwidGMtbGF5ZXJcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIml0ZW0tY29udGFpbmVyXCJcbiAgXSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvdyl9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImNvbnRhaW5lclwiXG4gICAgICBdLFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInN0YWNrc3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWRJbWdTcmMpfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubmF0aXZlLmlzU2hvd0ltZyl9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJpbWdcIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgXCJjbGlja1wiOiBcInJlcG9ydE5hdGl2ZUNsaWNrXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZXR5cGVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgXCJhZHVuaXRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZFVuaXRJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLm5hdGl2ZS5hZERhdGEuYWRJZCl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkYnRuXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAoKHRoaXMubmF0aXZlLmFkRGF0YS5zb3VyY2UpKSsnIOW5v+WRiid9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICBcImFkc291cmNlXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuYWREYXRhLnRpdGxlKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgIFwiYWR0aXRsZVwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBcIi9Db21tb24vaW1nL2FkL2ljb25feC5wbmdcIlxuICAgICAgfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5uYXRpdmUuaXNTaG93KX0sXG4gICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgIFwiY2xvc2VJbWctcG9zXCJcbiAgICAgIF0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY2xpY2tcIjogXCJjbG9zZUFkXCJcbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwibm92ZWwtYWRcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ3ZWJcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubm92ZWxVcmwpfSxcbiAgICAgICAgXCJhbGxvd3RoaXJkcGFydHljb29raWVzXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWxsb3cpfSxcbiAgICAgICAgXCJ0cnVzdGVkdXJsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudHJ1c3RlZHVybHMpfSxcbiAgICAgICAgXCJpZFwiOiBcIndlYlwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcIm5vdmVsLXdlYlwiXG4gICAgICBdLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcInBhZ2VmaW5pc2hcIjogXCJvblBhZ2VmaW5pc2hcIixcbiAgICAgICAgXCJtZXNzYWdlXCI6IFwib25NZXNzYWdlXCJcbiAgICAgIH0sXG4gICAgICBcImlkXCI6IFwid2ViXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogXCIg5Yqg6L295Lit4oCmIFwiXG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICghdGhpcy5pc0xvYWRlZCl9XG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJzdGFja1wiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcIm5vdmVsLXNlY29uZC1hZFwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnNob3dUb3BCYXIpfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0YWJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGFiXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiY3VycmVudEluZGV4XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudG9wQmFySW5kZXgpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJsb2FkaW5nLXBhZ2VcIjogXCJvbmxvYWRpbmdQYWdlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcImNsYXNzTGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuIFsnd2ViJywgKCF0aGlzLnNob3dUb3BCYXImJid3ZWItYWNyb3NzLXRvcCcpLCAoIXRoaXMuc2hvd0JvdHRvbUJhciYmJ3dlYi1hY3Jvc3MtYm90dG9tJyldfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwid2ViXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwiaWRcIjogXCJ3ZWJcIixcbiAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMud2Vic3JjKX0sXG4gICAgICAgICAgICBcImFsbG93dGhpcmRwYXJ0eWNvb2tpZXNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hbGxvdyl9LFxuICAgICAgICAgICAgXCJ0cnVzdGVkdXJsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudHJ1c3RlZHVybHMpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpZFwiOiBcIndlYlwiLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwicGFnZWZpbmlzaFwiOiBcIm9uUGFnZWZpbmlzaFwiLFxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwib25NZXNzYWdlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCIg5Yqg6L295Lit4oCmIFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKCF0aGlzLmlzTG9hZGVkKX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc2hvd0JvdHRvbUJhcil9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcImJvdHRvbS1iYXJcIlxuICAgICAgXSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYm90dG9tLWJhclwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImRhdGFcIjogXCJib3R0b21CYXJEYXRhXCIsXG4gICAgICAgICAgICBcImN1cnJlbnRJbmRleFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJvdHRvbUJhckluZGV4KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwibG9hZGluZy1wYWdlXCI6IFwib25sb2FkaW5nUGFnZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHtcbiAgICBcImlkXCI6IFwib3Blbi1zY3JlZW4tYWRcIlxuICB9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUucm9vdFN0eWxlKX0sXG4gIFwiaWRcIjogXCJvcGVuLXNjcmVlbi1hZFwiLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmNvbnRhaW5lclN0eWxlKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuaW1nV3JhcFN0eWxlKX0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbWdXcmFwU3R5bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5vcGVuaW1nKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmltZ1N0eWxlKX0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImVycm9yXCI6IFwiaW1nTG9hZEVyclwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJzdGFja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuaW1nV3JhcFN0eWxlKX0sXG4gICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgXCJpbWdXcmFwU3R5bGVcIixcbiAgICAgICAgICAgIFwib3BlbkltZ1dyYXBcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzc2hvdyl9LFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaW1nVXJsKX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmltZ1N0eWxlKX0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNvbXBsZXRlXCI6IFwiaW1nTG9hZENvbXBsZXRlZFwiLFxuICAgICAgICAgICAgICAgIFwiZXJyb3JcIjogXCJpbWdMb2FkRXJyXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLnNoYWtlQ29udGFpbmVyU3R5bGUpfSxcbiAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hha2UpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidW5pb24tY3VzdG9tXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImxpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50ZW1wbGF0ZUNvbmZpZyl9LFxuICAgICAgICAgICAgICAgICAgICBcImN1c3RvbXN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuaW5uZXJDdXN0b21TdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgICBcInNoYWtlSW50ZXJ2YWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaGFrZUludGVydmFsKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tLWNsaWNrXCI6IFwiY3VzdG9tQ2xpY2tcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmFkQnRuV3JhcFN0eWxlKX0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zaG93U3BsYXNoQnRuKX0sXG4gICAgICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YUlkXCI6IFwib3Blbi1hZC1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmJ0blRleHQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5hZEJ0blN0eWxlKX0sXG4gICAgICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwib3Blbi1hZC1idG5cIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmxvZ29XcmFwU3R5bGUpfSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYWQtbG9nb1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJlbnRyeVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmVudHJ5KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibG9nby1jbGlja1wiOiBcImxvZ29DbGlja1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5jbG9zZVdyYXBTdHlsZSl9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwiYWQtY2xvc2VkLWJ0bi13cmFwXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy5jb3VudGRvd24pKSsnIOi3s+i/hyd9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5jbG9zZUJ0blN0eWxlKX0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbG9zZXR5cGU9PT0xKX0sXG4gICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICBcImNsaWNrXCI6IFwib25BZFNraXBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogXCJza2lwLWNpcmNsZVwiLFxuICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIui3s+i/h1wiLFxuICAgICAgICAgICAgICAgIFwic2l6ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNpcmNsZVNpemUpfSxcbiAgICAgICAgICAgICAgICBcInBlcmNlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5wZXJjZW50KX1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvbkFkU2tpcFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jbG9zZXR5cGU9PT01KX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzRG93bmxvYWRQYW5lbCl9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmRvd25sb2FkU3R5bGUpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWREYXRhLmFwcG5hbWV8fCfnsr7pgInmjqjojZAnKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5hcHBuYW1lKX1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICfniYjmnKwgJysoKHRoaXMuYWREYXRhLmFwcF92ZXJzaW9uKSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUudmVyc2lvbil9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogXCLlip/og71cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmRvd25sb2FkVGV4dCl9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJjYXBhYmlsaXR5Q2xpY2tcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIumakOengVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuZG93bmxvYWRUZXh0KX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBcInByaXZhY3lDbGlja1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwi5p2D6ZmQXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5kb3dubG9hZFRleHQpfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNsaWNrXCI6IFwicGVybWlzc2lvbkNsaWNrXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZERhdGEucHVibGlzaGVyKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5wdWJsaXNoZXIpfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInR5cGVcIjogXCJkaXZcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNsYXNzTGlzdFwiOiBbXG4gICAgXCJyZXdhcmQtYWRcIlxuICBdLFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJ1bmlvbi1jdXN0b21cIixcbiAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgIFwibGlzdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRlbXBsYXRlQ29uZmlnKX1cbiAgICAgIH0sXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwiY3VzdG9tLWNsaWNrXCI6IFwiY3VzdG9tQ2xpY2tcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuc3R5bGUuc3RhY2tDb250YWluZXIpfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiY2FudmFzXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcImlkXCI6IFwiY2FudmFzSWRcIlxuICAgICAgfSxcbiAgICAgIFwiaWRcIjogXCJjYW52YXNJZFwiLFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLnRpbWVyQ2FudmFzKX1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImRpdlwiLFxuICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnN0eWxlLmNpcmNsZUNvbnRhaW5lcil9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5jb250ZW50KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5zdHlsZS5jaXJjbGVUZXh0KX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJub3ZlbC13cmFwcGVyXCJcbiAgICAgIF0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRhYnNcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJpbmRleFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmN1ckluZGV4KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgIFwidGFic1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcImNoYW5nZVwiOiBcIm9uQ2hhbmdlVGFiSW5kZXhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRhYi1iYXJcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICAgICAgXCJ0YWItYmFyXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInRpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICgodGhpcy4kaWR4KSkrJ30nfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWItYmFyLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubWVudSl9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWItYmFyLXRleHQtd3JhcHBlclwiXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NMaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gWyh0aGlzLmN1ckluZGV4PT09dGhpcy4kaWR4Pyd0YWItYmFyLXRleHQgY3VyLXRhYic6J3RhYi1iYXItdGV4dCcpXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImF0dHJcIjoge30sXG4gICAgICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiBbKHRoaXMuY3VySW5kZXg9PT10aGlzLiRpZHg/J3RhYi1iYXItYmctbGluZSc6JycpXX1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwidG9wb24tYWQtYnV0dG9uXCJcbiAgXSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICd3aWR0aDonKygodGhpcy5idG5TdHlsZS53aWR0aCkpKyc7anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDt9fSd9LFxuICBcImV2ZW50c1wiOiB7XG4gICAgXCJjbGlja1wiOiBcImhhbmRsZUNsaWNrXCIsXG4gICAgXCJ0b3VjaHN0YXJ0XCI6IFwiaGFuZGxlVG91Y2hTdGFydFwiLFxuICAgIFwidG91Y2htb3ZlXCI6IFwiaGFuZGxlVG91Y2hNb3ZlXCIsXG4gICAgXCJ0b3VjaGVuZFwiOiBcImhhbmRsZVRvdWNoRW5kXCJcbiAgfSxcbiAgXCJjaGlsZHJlblwiOiBbXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnRleHQpfVxuICAgICAgfSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0ZXh0XCJcbiAgICAgIF0sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYnRuU3R5bGUpfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwidG9wb24tYWQtY2xpY2thYmxlXCJcbiAgXSxcbiAgXCJldmVudHNcIjoge1xuICAgIFwiY2xpY2tcIjogXCJoYW5kbGVDbGlja1wiLFxuICAgIFwidG91Y2hzdGFydFwiOiBcImhhbmRsZVRvdWNoU3RhcnRcIixcbiAgICBcInRvdWNobW92ZVwiOiBcImhhbmRsZVRvdWNoTW92ZVwiLFxuICAgIFwidG91Y2hlbmRcIjogXCJoYW5kbGVUb3VjaEVuZFwiXG4gIH0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInNsb3RcIixcbiAgICAgIFwiYXR0clwiOiB7fVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwic3RhY2tcIixcbiAgXCJhdHRyXCI6IHt9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2xvc2VTdHlsZS5jbG9zZUNvbnRhaW5lcil9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwiY2xhc3NMaXN0XCI6IFtcbiAgICAgICAgXCJ0b3Bvbi1hZC1jbG9zZVwiXG4gICAgICBdLFxuICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmNsb3NlU3R5bGUuY2xvc2VCdG4pfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IFwiWFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICdjb2xvcjonKygodGhpcy5jbG9zZVN0eWxlLmNsb3NlQnRuLmNvbG9yKSkrJztmb250LXNpemU6ICcrKCh0aGlzLmNsb3NlU3R5bGUuY2xvc2VCdG4uZm9udFNpemUpKX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY2xvc2VTdHlsZS5jbG9zZUNsaWNrQXJlYSl9LFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcImNsaWNrXCI6IFwiaGFuZGxlQ2xpY2tcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwibWFzcC1sb2dvXCJcbiAgXSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxvZ29TdHlsZS5sb2dvQ29udGFpbmVyKX0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMubG9nb1VybCl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxvZ29VcmwpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxvZ29TdHlsZS5sb2dvSW1nKX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJzdHlsZVwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICB9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjoge1xuICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gICAgICB9LFxuICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmlzU2hvdyl9LFxuICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ0aWRcIjogXCJ3ZklkXCIsXG4gICAgICAgICAgICBcInNob3dcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pdGVtLnVuaXRfaWQ9PT10aGlzLmhpdFVuaXRJZCl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcGVhdFwiOiB7XG4gICAgICAgICAgICBcImV4cFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLndmTGlzdCl9LFxuICAgICAgICAgICAgXCJrZXlcIjogXCJpbmRleFwiLFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIml0ZW1cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiB7XG4gICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY29tcG9uZW50XCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLml0ZW0ud2ZJZCl9LFxuICAgICAgICAgICAgICAgIFwiYWRDb25maWdcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5tZXJnZUNvbmZpZyl9LFxuICAgICAgICAgICAgICAgIFwiYWRPcHRpb25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pdGVtLndmQWRPcHRpb24pfSxcbiAgICAgICAgICAgICAgICBcImFkRXh0cmFcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pdGVtLndmQWRFeHRyYSl9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiaXNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pdGVtLndmQWRhcHRlcil9LFxuICAgICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXRlbS53ZklkKX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge1xuICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pZCl9XG4gIH0sXG4gIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pZCl9LFxuICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuY3VzdG9tc3R5bGUpfSxcbiAgXCJldmVudHNcIjoge1xuICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLmNvbnRhaW5lckNsaWNrKG51bGwsZXZ0KX0sXG4gICAgXCJ0b3VjaHN0YXJ0XCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5jb250YWluZXJUb3VjaHN0YXJ0KHRoaXMuYWRUb3VjaHN0YXJ0LGV2dCl9XG4gIH0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInJlcGVhdFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmxpc3QpfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfSxcbiAgICAgICAgICAgIFwidmFsdWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS52YWx1ZSl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSd0ZXh0JyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnN0eWxlKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuY2xpY2tIYW5kbGVyKHRoaXMuJGl0ZW0sZXZ0KX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5pZCl9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJza2lwLWNpcmNsZVwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImNvbnRlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5jb250ZW50KX0sXG4gICAgICAgICAgICBcInBlcmNlbnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5wZXJjZW50KX0sXG4gICAgICAgICAgICBcInNpemVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zaXplKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5uYW1lPT09J2NpcmNsZScmJiF0aGlzLiRpdGVtLmhpZGRlbil9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ2aWRlb1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImNvbnRyb2xzXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uY29udHJvbHMpfSxcbiAgICAgICAgICAgIFwiYXV0b3BsYXlcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5hdXRvcGxheSl9LFxuICAgICAgICAgICAgXCJtdXRlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLm11dGVkKX0sXG4gICAgICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnZpZGVvKX0sXG4gICAgICAgICAgICBcInBvc3RlclwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnBvc3Rlcil9LFxuICAgICAgICAgICAgXCJpZFwiOiBcImluZm8tZmxvdy12aWRlb1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSd2aWRlbycmJiF0aGlzLiRpdGVtLmhpZGRlbil9LFxuICAgICAgICAgIFwiaWRcIjogXCJpbmZvLWZsb3ctdmlkZW9cIixcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfSxcbiAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICBcInBhdXNlXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb1BhdXNlKHRoaXMuJGl0ZW0sZXZ0KX0sXG4gICAgICAgICAgICBcImVycm9yXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb0Vycm9yKHRoaXMuJGl0ZW0sZXZ0KX0sXG4gICAgICAgICAgICBcInN0YXJ0XCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb1N0YXJ0KHRoaXMuJGl0ZW0sZXZ0KX0sXG4gICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5jbGlja0hhbmRsZXIodGhpcy4kaXRlbSxldnQpfSxcbiAgICAgICAgICAgIFwicHJlcGFyZWRcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnZpZGVvUHJlcGFyZWQodGhpcy4kaXRlbSxldnQpfSxcbiAgICAgICAgICAgIFwiZmluaXNoXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb0ZpbmlzaCh0aGlzLiRpdGVtLGV2dCl9LFxuICAgICAgICAgICAgXCJ0aW1ldXBkYXRlXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb1RpbWVVcGRhdGUodGhpcy4kaXRlbSxldnQpfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udmFsdWUpfSxcbiAgICAgICAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5pZCl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfSxcbiAgICAgICAgICBcImNsYXNzTGlzdFwiOiBbXG4gICAgICAgICAgICBcImFkLWltYWdlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLmNsaWNrSGFuZGxlcih0aGlzLiRpdGVtLGV2dCl9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSdpbWFnZScmJiF0aGlzLiRpdGVtLmhpZGRlbil9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSdsb2dvJyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImFkLWxvZ29cIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcIml0ZW1TdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnN0eWxlKX1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcImNsb3NlLWJ0blwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcImJ0bnN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfSxcbiAgICAgICAgICAgIFwiaW1nc3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaW1nc3JjKX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5uYW1lPT09J2Nsb3NlJyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuY2xpY2tIYW5kbGVyKHRoaXMuJGl0ZW0sZXZ0KX0sXG4gICAgICAgICAgICBcInRvdWNoc3RhcnRcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnRvdWNoc3RhcnRIYW5kbGVyKHRoaXMuJGl0ZW0sZXZ0KX1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInR5cGVcIjogXCJ1bmlvbi1jdXN0b21cIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmlkKX0sXG4gICAgICAgICAgICBcInNoYWtlSW50ZXJ2YWxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zaGFrZUludGVydmFsKX0sXG4gICAgICAgICAgICBcImxpc3RcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5jaGlsZHJlbil9LFxuICAgICAgICAgICAgXCJjdXN0b21zdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnN0eWxlKX0sXG4gICAgICAgICAgICBcInRlbXBsYXRlSWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50ZW1wbGF0ZUlkKX0sXG4gICAgICAgICAgICBcInJld2FyZFRpbWVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5yZXdhcmRUaW1lKX0sXG4gICAgICAgICAgICBcImFkVG91Y2hzdGFydFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtKX0sXG4gICAgICAgICAgICBcImJpbmRldmVudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmJpbmRFdmVudCl9LFxuICAgICAgICAgICAgXCJpdGVtXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0pfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLm5hbWU9PT0nbGF5b3V0JyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmlkKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjdXN0b20tY2xpY2tcIjogXCJjdXN0b21DbGlja1wiLFxuICAgICAgICAgICAgXCJjdXN0b20tdG91Y2hzdGFydFwiOiBcImN1c3RvbVRvdWNoc3RhcnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInN0YWNrXCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zdHlsZSl9LFxuICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5uYW1lPT09J3N0YWNrJyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuY29udGFpbmVyQ2xpY2sodGhpcy4kaXRlbSxldnQpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgICAgICAgICAgXCJyZXBlYXRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5jaGlsZHJlbil9LFxuICAgICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSd0ZXh0JyYmIXRoaXMuJGl0ZW0uaGlkZGVuKX0sXG4gICAgICAgICAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5pZCl9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcIiRpdGVtLmFuaW1hdGVUeXBlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLmNsaWNrSGFuZGxlcih0aGlzLiRpdGVtLGV2dCl9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcmNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS52YWx1ZSl9LFxuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICAgICAgICAgICAgICBcImFkLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfSxcbiAgICAgICAgICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbihldnQpe3RoaXMuY2xpY2tIYW5kbGVyKHRoaXMuJGl0ZW0sZXZ0KX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSdpbWFnZScmJiF0aGlzLiRpdGVtLmhpZGRlbil9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLm5hbWU9PT0nbG9nbycmJiF0aGlzLiRpdGVtLmhpZGRlbil9LFxuICAgICAgICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJhZC1sb2dvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbVN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidW5pb24tY3VzdG9tXCIsXG4gICAgICAgICAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uaWQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJsaXN0XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uY2hpbGRyZW4pfSxcbiAgICAgICAgICAgICAgICAgICAgXCJzaGFrZUludGVydmFsXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc2hha2VJbnRlcnZhbCl9LFxuICAgICAgICAgICAgICAgICAgICBcImN1c3RvbXN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uc3R5bGUpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJhZFRvdWNoc3RhcnRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbSl9LFxuICAgICAgICAgICAgICAgICAgICBcImJpbmRldmVudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmJpbmRFdmVudCl9LFxuICAgICAgICAgICAgICAgICAgICBcInRlbXBsYXRlSWRcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy50ZW1wbGF0ZUlkKX0sXG4gICAgICAgICAgICAgICAgICAgIFwicmV3YXJkVGltZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLnJld2FyZFRpbWUpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5uYW1lPT09J2xheW91dCcmJiF0aGlzLiRpdGVtLmhpZGRlbil9LFxuICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmlkKX0sXG4gICAgICAgICAgICAgICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tLWNsaWNrXCI6IFwiY3VzdG9tQ2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjdXN0b20tdG91Y2hzdGFydFwiOiBcImN1c3RvbVRvdWNoc3RhcnRcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidmlkZW9cIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29udHJvbHNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5jb250cm9scyl9LFxuICAgICAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0uYXV0b3BsYXkpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJtdXRlZFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLm11dGVkKX0sXG4gICAgICAgICAgICAgICAgICAgIFwic3JjXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0udmlkZW8pfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwb3N0ZXJcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5wb3N0ZXIpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImluZm8tZmxvdy12aWRlb1wiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJzaG93blwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLm5hbWU9PT0ndmlkZW8nJiYhdGhpcy4kaXRlbS5oaWRkZW4pfSxcbiAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJpbmZvLWZsb3ctdmlkZW9cIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zdHlsZSl9LFxuICAgICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy5jbGlja0hhbmRsZXIodGhpcy4kaXRlbSxldnQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXVzZVwiOiBmdW5jdGlvbihldnQpe3RoaXMudmlkZW9QYXVzZSh0aGlzLiRpdGVtLGV2dCl9LFxuICAgICAgICAgICAgICAgICAgICBcImVycm9yXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb0Vycm9yKHRoaXMuJGl0ZW0sZXZ0KX0sXG4gICAgICAgICAgICAgICAgICAgIFwic3RhcnRcIjogZnVuY3Rpb24oZXZ0KXt0aGlzLnZpZGVvU3RhcnQodGhpcy4kaXRlbSxldnQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVwYXJlZFwiOiBmdW5jdGlvbihldnQpe3RoaXMudmlkZW9QcmVwYXJlZCh0aGlzLiRpdGVtLGV2dCl9LFxuICAgICAgICAgICAgICAgICAgICBcImZpbmlzaFwiOiBmdW5jdGlvbihldnQpe3RoaXMudmlkZW9GaW5pc2godGhpcy4kaXRlbSxldnQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1ldXBkYXRlXCI6IGZ1bmN0aW9uKGV2dCl7dGhpcy52aWRlb1RpbWVVcGRhdGUodGhpcy4kaXRlbSxldnQpfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2tpcC1jaXJjbGVcIixcbiAgICAgICAgICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLiRpdGVtLmNvbnRlbnQpfSxcbiAgICAgICAgICAgICAgICAgICAgXCJwZXJjZW50XCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ucGVyY2VudCl9LFxuICAgICAgICAgICAgICAgICAgICBcInNpemVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy4kaXRlbS5zaXplKX1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuJGl0ZW0ubmFtZT09PSdjaXJjbGUnJiYhdGhpcy4kaXRlbS5oaWRkZW4pfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fVxufSIsInJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi92aWV3cy9BZHgvTmF0aXZlL0FkeEdyYXBoaWMudXg/bmFtZT1hZHgtZ3JhcGhpY1wiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YWR4LW5hdGl2ZS1hZGFwdGVyJmRlcGVuZHNbXT1hZHgtZ3JhcGhpYyEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL25hdGl2ZS51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9uYXRpdmUudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9hZHgtbmF0aXZlLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWFkeC1yZXdhcmRlZC12aWRlby1hZGFwdGVyIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vcmV3YXJkZWQtdmlkZW8udXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vcmV3YXJkZWQtdmlkZW8udXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9hZHgtcmV3YXJkZWQtdmlkZW8tYWRhcHRlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZC51eD9uYW1lPW1vYmFkcy1hZFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YmFpZHUtaW50ZXJzdGl0aWFsLWFkYXB0ZXImZGVwZW5kc1tdPW1vYmFkcy1hZCEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2ludGVyc3RpdGlhbC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbnRlcnN0aXRpYWwudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9iYWlkdS1pbnRlcnN0aXRpYWwtYWRhcHRlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZC51eD9uYW1lPW1vYmFkcy1hZFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YmFpZHUtbmF0aXZlLWFkYXB0ZXImZGVwZW5kc1tdPW1vYmFkcy1hZCEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL25hdGl2ZS51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQHRvcG9uXFxcXHF1aWNrLWFwcC1zZGstaHdcXFxcQWRhcHRlclxcXFxCYWlkdVxcXFxuYXRpdmUudXghLi4vLi4vLi4vLi4vbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQHRvcG9uXFxcXHF1aWNrLWFwcC1zZGstaHdcXFxcQWRhcHRlclxcXFxCYWlkdVxcXFxuYXRpdmUudXghLi9uYXRpdmUudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vbmF0aXZlLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYmFpZHUtbmF0aXZlLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YmFpZHUtcmV3YXJkZWQtdmlkZW8tYWRhcHRlciEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3Jld2FyZGVkLXZpZGVvLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3Jld2FyZGVkLXZpZGVvLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYmFpZHUtcmV3YXJkZWQtdmlkZW8tYWRhcHRlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91bmlvbi1xdWljay1hcHAtYWQvY29tcG9uZW50cy9tb2JhZHNBZC51eD9uYW1lPW1vYmFkcy1hZFwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YmFpZHUtc3BsYXNoLWFkYXB0ZXImZGVwZW5kc1tdPW1vYmFkcy1hZCEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3NwbGFzaC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQHRvcG9uXFxcXHF1aWNrLWFwcC1zZGstaHdcXFxcQWRhcHRlclxcXFxCYWlkdVxcXFxzcGxhc2gudXghLi4vLi4vLi4vLi4vbGVzcy1sb2FkZXIhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQHRvcG9uXFxcXHF1aWNrLWFwcC1zZGstaHdcXFxcQWRhcHRlclxcXFxCYWlkdVxcXFxzcGxhc2gudXghLi9zcGxhc2gudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vc3BsYXNoLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYmFpZHUtc3BsYXNoLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9aHVhd2VpLWFnZC1wcm8tbmF0aXZlLWFkYXB0ZXIhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9uYXRpdmUudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vbmF0aXZlLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvaHVhd2VpLWFnZC1wcm8tbmF0aXZlLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWh1YXdlaS1iYW5uZXItYWRhcHRlciEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2Jhbm5lci51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9iYW5uZXIudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9odWF3ZWktYmFubmVyLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWh1YXdlaS1pbnRlcnN0aXRpYWwtYWRhcHRlciEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2ludGVyc3RpdGlhbC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbnRlcnN0aXRpYWwudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9odWF3ZWktaW50ZXJzdGl0aWFsLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWh1YXdlaS1uYXRpdmUtYWRhcHRlciEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL25hdGl2ZS51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9uYXRpdmUudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9odWF3ZWktbmF0aXZlLWFkYXB0ZXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWh1YXdlaS1yZXdhcmRlZC12aWRlby1hZGFwdGVyIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vcmV3YXJkZWQtdmlkZW8udXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vcmV3YXJkZWQtdmlkZW8udXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9odWF3ZWktcmV3YXJkZWQtdmlkZW8tYWRhcHRlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9eWxoLW5hdGl2ZS1hZGFwdGVyIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vbmF0aXZlLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL25hdGl2ZS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3lsaC1uYXRpdmUtYWRhcHRlcicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9eWxoLXJld2FyZGVkLXZpZGVvLWFkYXB0ZXIhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9yZXdhcmRlZC12aWRlby51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9yZXdhcmRlZC12aWRlby51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3lsaC1yZXdhcmRlZC12aWRlby1hZGFwdGVyJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT15bGgtc3BsYXNoLWFkYXB0ZXIhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9zcGxhc2gudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vc3BsYXNoLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQveWxoLXNwbGFzaC1hZGFwdGVyJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJyZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL0FkeC9uYXRpdmUudXg/bmFtZT1hZHgtbmF0aXZlLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvQWR4L3Jld2FyZGVkLXZpZGVvLnV4P25hbWU9YWR4LXJld2FyZGVkLXZpZGVvLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvQmFpZHUvbmF0aXZlLnV4P25hbWU9YmFpZHUtbmF0aXZlLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvQmFpZHUvcmV3YXJkZWQtdmlkZW8udXg/bmFtZT1iYWlkdS1yZXdhcmRlZC12aWRlby1hZGFwdGVyXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL0JhaWR1L2ludGVyc3RpdGlhbC51eD9uYW1lPWJhaWR1LWludGVyc3RpdGlhbC1hZGFwdGVyXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL0JhaWR1L3NwbGFzaC51eD9uYW1lPWJhaWR1LXNwbGFzaC1hZGFwdGVyXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL1lsaC9uYXRpdmUudXg/bmFtZT15bGgtbmF0aXZlLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvWWxoL3Jld2FyZGVkLXZpZGVvLnV4P25hbWU9eWxoLXJld2FyZGVkLXZpZGVvLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvWWxoL3NwbGFzaC51eD9uYW1lPXlsaC1zcGxhc2gtYWRhcHRlclwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vQWRhcHRlci9IdWF3ZWkvbmF0aXZlLnV4P25hbWU9aHVhd2VpLW5hdGl2ZS1hZGFwdGVyXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL0h1YXdlaS9yZXdhcmRlZC12aWRlby51eD9uYW1lPWh1YXdlaS1yZXdhcmRlZC12aWRlby1hZGFwdGVyXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9BZGFwdGVyL0h1YXdlaS9iYW5uZXIudXg/bmFtZT1odWF3ZWktYmFubmVyLWFkYXB0ZXJcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL0FkYXB0ZXIvSHVhd2VpL2ludGVyc3RpdGlhbC51eD9uYW1lPWh1YXdlaS1pbnRlcnN0aXRpYWwtYWRhcHRlclwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vQWRhcHRlci9IdWF3ZWlBZ2RQcm8vbmF0aXZlLnV4P25hbWU9aHVhd2VpLWFnZC1wcm8tbmF0aXZlLWFkYXB0ZXJcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXRvcG9uLWFkIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vcGxhY2VtZW50LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3BsYWNlbWVudC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3RvcG9uLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT10b3Atb24tYWQtYnV0dG9uIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vQWRCdXR0b24udXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vQWRCdXR0b24udXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC90b3Atb24tYWQtYnV0dG9uJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT10b3Atb24tYWQtY2xpY2thYmxlLWFyZWEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9BZENsaWNrYWJsZUFyZWEudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEB0b3BvblxcXFxxdWljay1hcHAtc2RrLWh3XFxcXHZpZXdzXFxcXEFkeFxcXFxDb21tb25cXFxcQWRDbGlja2FibGVBcmVhLnV4IS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEB0b3BvblxcXFxxdWljay1hcHAtc2RrLWh3XFxcXHZpZXdzXFxcXEFkeFxcXFxDb21tb25cXFxcQWRDbGlja2FibGVBcmVhLnV4IS4vQWRDbGlja2FibGVBcmVhLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL0FkQ2xpY2thYmxlQXJlYS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3RvcC1vbi1hZC1jbGlja2FibGUtYXJlYScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT10b3Atb24tYWQtY2xvc2UhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9BZENsb3NlLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL0FkQ2xvc2UudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC90b3Atb24tYWQtY2xvc2UnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXRvcC1vbi1hZC1sb2dvIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vQWRMb2dvLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL0FkTG9nby51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3RvcC1vbi1hZC1sb2dvJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJyZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi4vQ29tbW9uL0FkQnV0dG9uLnV4P25hbWU9dG9wLW9uLWFkLWJ1dHRvblwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL0NvbW1vbi9BZENsaWNrYWJsZUFyZWEudXg/bmFtZT10b3Atb24tYWQtY2xpY2thYmxlLWFyZWFcIilcbnJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi9Db21tb24vQWRDbG9zZS51eD9uYW1lPXRvcC1vbi1hZC1jbG9zZVwiKVxucmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL0NvbW1vbi9BZExvZ28udXg/bmFtZT10b3Atb24tYWQtbG9nb1wiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9YWR4LWdyYXBoaWMmZGVwZW5kc1tdPXRvcC1vbi1hZC1jbGlja2FibGUtYXJlYSZkZXBlbmRzW109dG9wLW9uLWFkLWxvZ28mZGVwZW5kc1tdPXRvcC1vbi1hZC1jbG9zZSZkZXBlbmRzW109dG9wLW9uLWFkLWJ1dHRvbiEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL0FkeEdyYXBoaWMudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vQWR4R3JhcGhpYy51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2FkeC1ncmFwaGljJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1ib3R0b20tYmFyIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vYm90dG9tQmFyLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxib3R0b21CYXIudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcYm90dG9tQmFyLnV4IS4vYm90dG9tQmFyLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2JvdHRvbUJhci51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2JvdHRvbS1iYXInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9c2tpcC1jaXJjbGUhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9jaXJjbGUudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vY2lyY2xlLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvc2tpcC1jaXJjbGUnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPWNsb3NlLWJ0biEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2Nsb3NlQWRCdG4udXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vY2xvc2VBZEJ0bi51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2Nsb3NlLWJ0bicsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY3VzdG9tLnV4P25hbWU9dW5pb24tY3VzdG9tXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9sb2dvLnV4P25hbWU9YWQtbG9nb1wiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY2xvc2VBZEJ0bi51eD9uYW1lPWNsb3NlLWJ0blwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY2lyY2xlLnV4P25hbWU9c2tpcC1jaXJjbGVcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXVuaW9uLWN1c3RvbSZkZXBlbmRzW109c2tpcC1jaXJjbGUmZGVwZW5kc1tdPWFkLWxvZ28mZGVwZW5kc1tdPWNsb3NlLWJ0biZkZXBlbmRzW109dW5pb24tY3VzdG9tIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vY3VzdG9tLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxjdXN0b20udXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcY3VzdG9tLnV4IS4vY3VzdG9tLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2N1c3RvbS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L3VuaW9uLWN1c3RvbScsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1kb3dubG9hZC1wYW5lbCEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2Rvd25sb2FkUGFuZWwudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXHVuaW9uLXF1aWNrLWFwcC1hZFxcXFxjb21wb25lbnRzXFxcXGRvd25sb2FkUGFuZWwudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcZG93bmxvYWRQYW5lbC51eCEuL2Rvd25sb2FkUGFuZWwudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vZG93bmxvYWRQYW5lbC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2Rvd25sb2FkLXBhbmVsJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL2N1c3RvbS51eD9uYW1lPXVuaW9uLWN1c3RvbVwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bmF0aXZlLWFkJmRlcGVuZHNbXT11bmlvbi1jdXN0b20hLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9mZWVkQWQudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXHVuaW9uLXF1aWNrLWFwcC1hZFxcXFxjb21wb25lbnRzXFxcXGZlZWRBZC51eCEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxmZWVkQWQudXghLi9mZWVkQWQudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vZmVlZEFkLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbmF0aXZlLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL2N1c3RvbS51eD9uYW1lPXVuaW9uLWN1c3RvbVwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9aW50LWFkJmRlcGVuZHNbXT11bmlvbi1jdXN0b20hLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbnRBZC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcaW50QWQudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcaW50QWQudXghLi9pbnRBZC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbnRBZC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2ludC1hZCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1hZC1sb2dvIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vbG9nby51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9sb2dvLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvYWQtbG9nbycsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vZmVlZEFkLnV4P25hbWU9bmF0aXZlLWFkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9vcGVuQWQudXg/bmFtZT1vcGVuLWFkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9pbnRBZC51eD9uYW1lPWludC1hZFwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vcmV3YXJkQWQudXg/bmFtZT1yZXdhcmQtYWRcIilcbnJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL2Rvd25sb2FkUGFuZWwudXg/bmFtZT1kb3dubG9hZC1wYW5lbFwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vbm92ZWxBZC51eD9uYW1lPW5vdmVsLWFkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9ub3ZlbEJvb2tDaXR5LnV4P25hbWU9bm92ZWwtYm9va3MtYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW1vYmFkcy1hZCZkZXBlbmRzW109bm92ZWwtYWQmZGVwZW5kc1tdPWludC1hZCZkZXBlbmRzW109b3Blbi1hZCZkZXBlbmRzW109bmF0aXZlLWFkJmRlcGVuZHNbXT1yZXdhcmQtYWQmZGVwZW5kc1tdPWRvd25sb2FkLXBhbmVsJmRlcGVuZHNbXT1ub3ZlbC1ib29rcy1hZCEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL21vYmFkc0FkLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL21vYmFkc0FkLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbW9iYWRzLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1ub3ZlbC1hZCEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL25vdmVsQWQudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXHVuaW9uLXF1aWNrLWFwcC1hZFxcXFxjb21wb25lbnRzXFxcXG5vdmVsQWQudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcbm92ZWxBZC51eCEuL25vdmVsQWQudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vbm92ZWxBZC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L25vdmVsLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL3RhYi51eD9uYW1lPXRhYlwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vYm90dG9tQmFyLnV4P25hbWU9Ym90dG9tLWJhclwiKVxudmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50Jm5hbWU9bm92ZWwtYm9va3MtYWQmZGVwZW5kc1tdPXRhYiZkZXBlbmRzW109Ym90dG9tLWJhciEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL25vdmVsQm9va0NpdHkudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXHVuaW9uLXF1aWNrLWFwcC1hZFxcXFxjb21wb25lbnRzXFxcXG5vdmVsQm9va0NpdHkudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcbm92ZWxCb29rQ2l0eS51eCEuL25vdmVsQm9va0NpdHkudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vbm92ZWxCb29rQ2l0eS51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L25vdmVsLWJvb2tzLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuL2xvZ28udXg/bmFtZT1hZC1sb2dvXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9sb2FkZXIuanM/dHlwZT1jb21wb25lbnQhLi9jaXJjbGUudXg/bmFtZT1za2lwLWNpcmNsZVwiKVxucmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY3VzdG9tLnV4P25hbWU9dW5pb24tY3VzdG9tXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1vcGVuLWFkJmRlcGVuZHNbXT11bmlvbi1jdXN0b20mZGVwZW5kc1tdPWFkLWxvZ28mZGVwZW5kc1tdPXNraXAtY2lyY2xlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vb3BlbkFkLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxvcGVuQWQudXghLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcb3BlbkFkLnV4IS4vb3BlbkFkLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL29wZW5BZC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L29wZW4tYWQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4vY3VzdG9tLnV4P25hbWU9dW5pb24tY3VzdG9tXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1yZXdhcmQtYWQmZGVwZW5kc1tdPXVuaW9uLWN1c3RvbSEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3Jld2FyZEFkLnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxyZXdhcmRBZC51eCEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFx1bmlvbi1xdWljay1hcHAtYWRcXFxcY29tcG9uZW50c1xcXFxyZXdhcmRBZC51eCEuL3Jld2FyZEFkLnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL3Jld2FyZEFkLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvcmV3YXJkLWFkJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPXRhYiEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL3RhYi51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcdW5pb24tcXVpY2stYXBwLWFkXFxcXGNvbXBvbmVudHNcXFxcdGFiLnV4IS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXHVuaW9uLXF1aWNrLWFwcC1hZFxcXFxjb21wb25lbnRzXFxcXHRhYi51eCEuL3RhYi51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi90YWIudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC90YWInLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwidmFyICRhcHBfdGVtcGxhdGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXRlbXBsYXRlLWxvYWRlci5qcz90eXBlPWNvbXBvbmVudCZuYW1lPW5hdGl2ZWJhbm5lci1hZCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hQmFubmVyQWRcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hQmFubmVyQWRcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9uYXRpdmViYW5uZXItYWQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvcGxhY2VtZW50LnV4P25hbWU9dG9wb24tYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1uYXRpdmUtYWQtdG9wb24mZGVwZW5kc1tdPXRvcG9uLWFkIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXRlbXBsYXRlcyEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zdHlsZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc3R5bGUtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmF0aXZlQUQtdG9wb25cXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXGFkXFxcXG5hdGl2ZUFELXRvcG9uXFxcXGluZGV4LnV4IS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtc2NyaXB0LWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtYWNjZXNzLWxvYWRlci5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c2NyaXB0cyEuL2luZGV4LnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvbmF0aXZlLWFkLXRvcG9uJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcbiIsInZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT1uYXRpdmUtYWQhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxhZFxcXFxuYXRpdmVBRFxcXFxpbmRleC51eCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zdHlsZXMmcmVzb3VyY2VQYXRoPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxzcmNcXFxcYWRcXFxcbmF0aXZlQURcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9uYXRpdmUtYWQnLCBbXSwgZnVuY3Rpb24oJGFwcF9yZXF1aXJlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9tb2R1bGUkKXtcbiAgICAgJGFwcF9zY3JpcHQkKCRhcHBfbW9kdWxlJCwgJGFwcF9leHBvcnRzJCwgJGFwcF9yZXF1aXJlJClcbiAgICAgaWYgKCRhcHBfZXhwb3J0cyQuX19lc01vZHVsZSAmJiAkYXBwX2V4cG9ydHMkLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICRhcHBfbW9kdWxlJC5leHBvcnRzID0gJGFwcF9leHBvcnRzJC5kZWZhdWx0XG4gICAgICAgIH1cbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMudGVtcGxhdGUgPSAkYXBwX3RlbXBsYXRlJFxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy5zdHlsZSA9ICRhcHBfc3R5bGUkXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJyZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2FkL25hdGl2ZUFEL2luZGV4LnV4P25hbWU9bmF0aXZlLWFkXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2FkL25hdGl2ZUFELXRvcG9uL2luZGV4LnV4P25hbWU9bmF0aXZlLWFkLXRvcG9uXCIpXG5yZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvbG9hZGVyLmpzP3R5cGU9Y29tcG9uZW50IS4uL2FkL25hQmFubmVyQWQvaW5kZXgudXg/bmFtZT1uYXRpdmViYW5uZXItYWRcIilcbnZhciAkYXBwX3RlbXBsYXRlJCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/ZGVwZW5kc1tdPW5hdGl2ZS1hZC10b3BvbiEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi9pbmRleC51eFwiKVxudmFyICRhcHBfc3R5bGUkID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXN0eWxlLWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfY2ZkLXRha3VcXFxcaW5kZXgudXghLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFBhZ2VfY2ZkLXRha3VcXFxcaW5kZXgudXghLi9pbmRleC51eFwiKVxudmFyICRhcHBfc2NyaXB0JCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1hY2Nlc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXI/cHJlc2V0c1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHByZXNldC1lbnYsdGFyZ2V0cz1ub2RlIDgmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi10cmFuc2Zvcm0tbW9kdWxlcy1jb21tb25qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxmYS10b29sa2l0XFxcXGxpYlxcXFxmYS1jb21waWxlclxcXFxqc3gtbG9hZGVyLmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCZjb21tZW50cz1mYWxzZSEuLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vaW5kZXgudXhcIilcblxuJGFwcF9kZWZpbmUkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcsIFtdLCBmdW5jdGlvbigkYXBwX3JlcXVpcmUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX21vZHVsZSQpe1xuICAgICAkYXBwX3NjcmlwdCQoJGFwcF9tb2R1bGUkLCAkYXBwX2V4cG9ydHMkLCAkYXBwX3JlcXVpcmUkKVxuICAgICBpZiAoJGFwcF9leHBvcnRzJC5fX2VzTW9kdWxlICYmICRhcHBfZXhwb3J0cyQuZGVmYXVsdCkge1xuICAgICAgICAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMgPSAkYXBwX2V4cG9ydHMkLmRlZmF1bHRcbiAgICAgICAgfVxuICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cy50ZW1wbGF0ZSA9ICRhcHBfdGVtcGxhdGUkXG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnN0eWxlID0gJGFwcF9zdHlsZSRcbn0pXG5cbiRhcHBfYm9vdHN0cmFwJCgnQGFwcC1jb21wb25lbnQvaW5kZXgnLHsgcGFja2FnZXJOYW1lOidmYS10b29sa2l0JywgcGFja2FnZXJWZXJzaW9uOiAnMTQuMC4xLVN0YWJsZS4zMDAnfSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
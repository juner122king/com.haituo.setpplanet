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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/web.ux":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/web.ux ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shared = __webpack_require__(/*! ./shared */ "./node_modules/@topon/quick-app-sdk-hw/shared.js");
var _default = exports.default = {
  props: ['url', 'allow'],
  data() {
    return {
      isLoading: true,
      isFullScreen: false,
      adStyle: {},
      title: ''
    };
  },
  onInit() {
    _shared.defineAdProxyComponent.call(this, {
      name: 'web',
      format: 'entry'
    });
  },
  onPageStart(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onPageStart', event);
  },
  onPageFinish(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onPageFinish', event);
  },
  onTitleReceive(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onTitleReceive', event);
  },
  onError(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onError', event);
  },
  onProgress(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onProgress', event);
  },
  onBack(event) {
    _shared.dispatchAdProxyEvent.call(this, 'onBack', event);
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/TopOn/AdLanding/index.ux":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/TopOn/AdLanding/index.ux ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function(module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.router"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  data() {
    return {
      websrc: '',
      allow: true
    };
  },
  onInit() {
    this.websrc = this.url;
  },
  onBackPress() {
    if (this.entry) {
      _system.default.clear();
      _system.default.replace({
        uri: this.entry
      });
      return true;
    }
    return false;
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

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\TopOn\\AdLanding\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\TopOn\\AdLanding\\index.ux!./src/TopOn/AdLanding/index.ux":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\TopOn\AdLanding\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\TopOn\AdLanding\index.ux!./src/TopOn/AdLanding/index.ux ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  ".topon-ad-wrapper": {
    "width": "100%",
    "height": "100%"
  }
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/TopOn/AdLanding/index.ux":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/TopOn/AdLanding/index.ux ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "topon-ad-wrapper"
  ],
  "children": [
    {
      "type": "topon-ad-web",
      "attr": {
        "url": function () {return (this.websrc)},
        "allow": function () {return (this.allow)}
      }
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/web.ux":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/web.ux ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports={
  "type": "div",
  "attr": {},
  "classList": [
    "adx-web-container"
  ],
  "style": function () {return (this.adStyle.landingContainer)},
  "children": [
    {
      "type": "div",
      "attr": {},
      "style": function () {return (this.adStyle.landingBar)},
      "shown": function () {return (this.isFullScreen)},
      "children": [
        {
          "type": "div",
          "attr": {},
          "events": {
            "click": "onBack"
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "←"
              },
              "style": function () {return (this.adStyle.landingBtn)}
            }
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": function () {return (this.title)}
          },
          "style": function () {return (this.adStyle.landingTitle)}
        }
      ]
    },
    {
      "type": "web",
      "attr": {
        "src": function () {return (this.url)},
        "allowthirdpartycookies": function () {return (this.allow)},
        "id": "topon-adx-web"
      },
      "classList": [
        "topon-adx-web"
      ],
      "events": {
        "pagestart": "onPageStart",
        "pagefinish": "onPageFinish",
        "titlereceive": "onTitleReceive",
        "error": "onError",
        "progress": "onProgress"
      },
      "id": "topon-adx-web",
      "style": function () {return (this.adStyle.landingWeb)}
    },
    {
      "type": "div",
      "attr": {},
      "style": function () {return (this.adStyle.loadingContainer)},
      "shown": function () {return (this.isLoading)},
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "加载中..."
          },
          "style": function () {return (this.adStyle.loadingText)}
        }
      ]
    }
  ]
}

/***/ }),

/***/ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/web.ux?name=topon-ad-web":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/web.ux?name=topon-ad-web ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $app_template$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad-web!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./web.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?type=component&name=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./node_modules/@topon/quick-app-sdk-hw/web.ux")
var $app_script$ = __webpack_require__(/*! !!../../fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./web.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./node_modules/@topon/quick-app-sdk-hw/web.ux")

$app_define$('@app-component/topon-ad-web', [], function($app_require$, $app_exports$, $app_module$){
     $app_script$($app_module$, $app_exports$, $app_require$)
     if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = $app_template$
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
/*!**************************************!*\
  !*** ./src/TopOn/AdLanding/index.ux ***!
  \**************************************/
__webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!../../../node_modules/@topon/quick-app-sdk-hw/web.ux?name=topon-ad-web */ "./node_modules/fa-toolkit/lib/fa-compiler/loader.js?type=component!./node_modules/@topon/quick-app-sdk-hw/web.ux?name=topon-ad-web")
var $app_template$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=topon-ad-web!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-template-loader.js?depends[]=topon-ad-web!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=templates!./src/TopOn/AdLanding/index.ux")
var $app_style$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\TopOn\AdLanding\index.ux!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\quickappWorkspace\com.haituo.setpplanet\src\TopOn\AdLanding\index.ux!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-style-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\TopOn\\AdLanding\\index.ux!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=styles&resourcePath=d:\\quickappWorkspace\\com.haituo.setpplanet\\src\\TopOn\\AdLanding\\index.ux!./src/TopOn/AdLanding/index.ux")
var $app_script$ = __webpack_require__(/*! !!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!../../../node_modules/babel-loader?presets[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\preset-env,targets=node 8&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-transform-modules-commonjs&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\fa-toolkit\lib\fa-compiler\jsx-loader.js&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-class-properties&plugins[]=d:\quickappWorkspace\com.haituo.setpplanet\node_modules\@babel\plugin-proposal-object-rest-spread&comments=false!../../../node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./index.ux */ "./node_modules/fa-toolkit/lib/fa-compiler/fa-script-loader.js!./node_modules/fa-toolkit/lib/fa-compiler/fa-access-loader.js!./node_modules/babel-loader/lib/index.js?presets[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\preset-env,targets=node 8&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-transform-modules-commonjs&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\fa-toolkit\\lib\\fa-compiler\\jsx-loader.js&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-class-properties&plugins[]=d:\\quickappWorkspace\\com.haituo.setpplanet\\node_modules\\@babel\\plugin-proposal-object-rest-spread&comments=false!./node_modules/fa-toolkit/lib/fa-compiler/fa-fragment-loader.js?index=0&type=scripts!./src/TopOn/AdLanding/index.ux")

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRcXFRvcE9uXFxBZExhbmRpbmdcXGluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvc2hhcmVkLmpzIiwid2VicGFjazovLy9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXG5vZGVfbW9kdWxlc1xcQHRvcG9uXFxxdWljay1hcHAtc2RrLWh3XFx3ZWIudXgiLCJ3ZWJwYWNrOi8vL3NyYy9Ub3BPbi9BZExhbmRpbmcvZDpcXHF1aWNrYXBwV29ya3NwYWNlXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXHNyY1xcVG9wT25cXEFkTGFuZGluZ1xcaW5kZXgudXgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RvcE9uL0FkTGFuZGluZy9pbmRleC51eD82MjBiIiwid2VicGFjazovLy8uL3NyYy9Ub3BPbi9BZExhbmRpbmcvaW5kZXgudXg/NDc1YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvd2ViLnV4PzA4Y2YiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0B0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3dlYi51eCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RvcE9uL0FkTGFuZGluZy9pbmRleC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB0KHQpe3JldHVybiBmdW5jdGlvbih0KXtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiByKHQpfSh0KXx8ZnVuY3Rpb24odCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmbnVsbCE9dFtTeW1ib2wuaXRlcmF0b3JdfHxudWxsIT10W1wiQEBpdGVyYXRvclwiXSlyZXR1cm4gQXJyYXkuZnJvbSh0KX0odCl8fGZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiByKHQsZSk7dmFyIG89T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLnNsaWNlKDgsLTEpO1wiT2JqZWN0XCI9PT1vJiZ0LmNvbnN0cnVjdG9yJiYobz10LmNvbnN0cnVjdG9yLm5hbWUpO2lmKFwiTWFwXCI9PT1vfHxcIlNldFwiPT09bylyZXR1cm4gQXJyYXkuZnJvbSh0KTtpZihcIkFyZ3VtZW50c1wiPT09b3x8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobykpcmV0dXJuIHIodCxlKX0odCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9KCl9ZnVuY3Rpb24gcih0LHIpeyhudWxsPT1yfHxyPnQubGVuZ3RoKSYmKHI9dC5sZW5ndGgpO2Zvcih2YXIgZT0wLG89bmV3IEFycmF5KHIpO2U8cjtlKyspb1tlXT10W2VdO3JldHVybiBvfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMuYmFubmVyU3VwcG9ydFN0eWxlTGlzdD1leHBvcnRzLmFkeEFkYXB0ZXJEaWN0aW9uYXJ5PXZvaWQgMCxleHBvcnRzLmNhbWVsaXplPWZ1bmN0aW9uKHQpe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxlPXIuc2VwYXJhdG9yfHwvXyhcXHcpL2c7cmV0dXJuIHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKGUsKGZ1bmN0aW9uKHQscil7cmV0dXJuIHIudG9VcHBlckNhc2UoKX0pKX0sZXhwb3J0cy5kZUNhbWVsaXplPWZ1bmN0aW9uKHQpe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxlPXIuc2VwYXJhdG9yfHxcIi1cIixvPXIuc3BsaXR8fC8oPz1bQS1aXSkvO3JldHVybiB0LnNwbGl0KG8pLmpvaW4oZSkudG9Mb3dlckNhc2UoKX0sZXhwb3J0cy5kaXNwYXRjaEFkUHJveHlFdmVudD1leHBvcnRzLmRlZmluZUFkUHJveHlDb21wb25lbnQ9dm9pZCAwLGV4cG9ydHMuaXNFbXB0eU9iamVjdD1mdW5jdGlvbih0KXtmb3IodmFyIHIgaW4gdClpZih7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQscikpcmV0dXJuITE7cmV0dXJuITB9LGV4cG9ydHMubndGaXJtSGJEaWN0aW9uYXJ5PWV4cG9ydHMubndGaXJtRGljdGlvbmFyeT12b2lkIDAsZXhwb3J0cy5ud0Zpcm1TdXBwb3J0ZWQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIixyPVwiaGJcIj09PXQ/bzplLG49T2JqZWN0LnZhbHVlcyhyKXx8W107cmV0dXJuIG59LGV4cG9ydHMuc3VwcG9ydFN0eWxlTGlzdD1leHBvcnRzLnJ2U3VwcG9ydFN0eWxlTGlzdD12b2lkIDAsZXhwb3J0cy52YWxpZGF0ZUFkc3R5bGU9ZnVuY3Rpb24ocil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbz0hMSxuPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocikpLHM9ezA6YSwxOmksMjpwfSxjPXNbZV07Zm9yKHZhciBsIGluIG4pYy5pbmNsdWRlcyhsKXx8KG89ITAsY29uc29sZS5lcnJvcihcIlRvcE9u5bm/5ZGK57uE5Lu2Y29uZmlnLnN0eWxl5bGe5oCn77yaXCIuY29uY2F0KGwsXCLmoKHpqozkuI3pgJrov4fvvIzku4XmlK/mjIHku6XkuIvoh6rlrprkuYnmoLflvI/lsZ7mgKc6XCIpLmNvbmNhdCh0KGMpKSkpO3JldHVybiBvfTt2YXIgZT17VklWTzo1NCxPUFBPOjU1LEJBSURVOjU2LEhVQVdFSTo2MCxYSUFPTUk6NjEsSFVBV0VJX0FHRF9QUk86NjIsSE9OT1I6NjMsWUxIOjY0LEFEWDo2Nn07ZXhwb3J0cy5ud0Zpcm1EaWN0aW9uYXJ5PWU7dmFyIG89e1ZJVk86NTQsT1BQTzo1NSxZTEg6NjR9O2V4cG9ydHMubndGaXJtSGJEaWN0aW9uYXJ5PW87ZXhwb3J0cy5hZHhBZGFwdGVyRGljdGlvbmFyeT17MDpcIkFkeE5hdGl2ZUFkYXB0ZXJcIiwxOlwiQWR4UmV3YXJkZWRWaWRlb0FkYXB0ZXJcIiwyOlwiQWR4QmFubmVyQWRhcHRlclwiLDM6XCJBZHhJbnRlcnN0aXRpYWxBZGFwdGVyXCIsNDpcIkFkeFNwbGFzaEFkYXB0ZXJcIn07dmFyIG49ZnVuY3Rpb24odCxyKXt0cnl7aWYodGhpcy5pc0FkRGVzdHJveWVkKXJldHVybjt0aGlzLmFkUHJveHlFdmVudCYmdGhpcy5hZFByb3h5RXZlbnRbdF0mJnRoaXMuYWRQcm94eUV2ZW50W3RdLmNhbGwodGhpcyxyKX1jYXRjaChyKXtjb25zb2xlLmVycm9yKFwiY2FsbCBcIi5jb25jYXQodCkscil9fTtleHBvcnRzLmRpc3BhdGNoQWRQcm94eUV2ZW50PW47ZXhwb3J0cy5kZWZpbmVBZFByb3h5Q29tcG9uZW50PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxyPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fTt0cnl7dGhpcy5hZFRpbWVySWQmJmNsZWFySW50ZXJ2YWwodGhpcy5hZFRpbWVySWQpO3ZhciBlPXNldEludGVydmFsKChmdW5jdGlvbigpe2lmKHQuaXNBZERlc3Ryb3llZHx8IXQuJGFwcCljbGVhckludGVydmFsKGUpO2Vsc2UgaWYodC4kYXBwJiZ0LiRhcHAuJGRlZiYmdC4kYXBwLiRkZWYudG9wb25fc2RrJiZ0LiRhcHAuJGRlZi50b3Bvbl9zZGsuY29tcG9uZW50cyl7Y2xlYXJJbnRlcnZhbChlKTt2YXIgbz10LiRhcHAuJGRlZi50b3Bvbl9zZGsuY29tcG9uZW50c1tyLm5hbWVdW3IuZm9ybWF0XTtvPyhPYmplY3Qua2V5cyhvKS5mb3JFYWNoKChmdW5jdGlvbihyKXt0W3JdPW9bcl19KSksbi5jYWxsKHQsXCJvbkluaXRcIikpOmNvbnNvbGUuZXJyb3IoXCJcIi5jb25jYXQoci5uYW1lLFwiOlwiKS5jb25jYXQoci5mb3JtYXQsXCIgQ29tcG9uZW50IE5vdCBEZWZpbmVcIikpfX0pLDEwKTt0aGlzLmFkVGltZXJJZD1lLHIuY2ImJnIuY2IoKX1jYXRjaCh0KXtjb25zb2xlLmVycm9yKFwiRGVmaW5lIENvbXBvbmVudCBFcnJvclwiLHQpfX07dmFyIGE9W1wiY29udGFpbmVyU3R5bGVcIixcImltZ1N0eWxlXCIsXCJ0aXRsZVN0eWxlXCIsXCJidXR0b25TdHlsZVwiLFwiZGVzY1N0eWxlXCJdO2V4cG9ydHMuc3VwcG9ydFN0eWxlTGlzdD1hO3ZhciBpPVtcInRpdGxlU3R5bGVcIixcImJ1dHRvblN0eWxlXCJdO2V4cG9ydHMucnZTdXBwb3J0U3R5bGVMaXN0PWk7dmFyIHA9W1wibGVmdFwiLFwidG9wXCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdO2V4cG9ydHMuYmFubmVyU3VwcG9ydFN0eWxlTGlzdD1wOyIsIjx0ZW1wbGF0ZT4gPGRpdiBjbGFzcz1cImFkeC13ZWItY29udGFpbmVyXCIgc3R5bGU9XCJ7e2FkU3R5bGUubGFuZGluZ0NvbnRhaW5lcn19XCI+IDxkaXYgc3R5bGU9XCJ7e2FkU3R5bGUubGFuZGluZ0Jhcn19XCIgaWY9XCJ7eyBpc0Z1bGxTY3JlZW4gfX1cIj4gPGRpdiBAY2xpY2s9XCJvbkJhY2tcIj4gPHRleHQgc3R5bGU9XCJ7e2FkU3R5bGUubGFuZGluZ0J0bn19XCI+JmxhcnI7PC90ZXh0PiA8L2Rpdj4gPHRleHQgc3R5bGU9XCJ7e2FkU3R5bGUubGFuZGluZ1RpdGxlfX1cIj57eyB0aXRsZSB9fTwvdGV4dD4gPC9kaXY+IDx3ZWIgY2xhc3M9XCJ0b3Bvbi1hZHgtd2ViXCIgc3JjPVwie3t1cmx9fVwiIGFsbG93dGhpcmRwYXJ0eWNvb2tpZXM9XCJ7e2FsbG93fX1cIiBvbnBhZ2VzdGFydD1cIm9uUGFnZVN0YXJ0XCIgb25wYWdlZmluaXNoPVwib25QYWdlRmluaXNoXCIgb250aXRsZXJlY2VpdmU9XCJvblRpdGxlUmVjZWl2ZVwiIG9uZXJyb3I9XCJvbkVycm9yXCIgb25wcm9ncmVzcz1cIm9uUHJvZ3Jlc3NcIiBpZD1cInRvcG9uLWFkeC13ZWJcIiBzdHlsZT1cInt7YWRTdHlsZS5sYW5kaW5nV2VifX1cIiA+IDwvd2ViPiA8ZGl2IHN0eWxlPVwie3thZFN0eWxlLmxvYWRpbmdDb250YWluZXJ9fVwiIGlmPVwie3sgaXNMb2FkaW5nIH19XCI+IDx0ZXh0IHN0eWxlPVwie3thZFN0eWxlLmxvYWRpbmdUZXh0fX1cIj7liqDovb3kuK0uLi48L3RleHQ+IDwvZGl2PiA8L2Rpdj4gPC90ZW1wbGF0ZT4gPHNjcmlwdD4gaW1wb3J0IHsgZGVmaW5lQWRQcm94eUNvbXBvbmVudCwgZGlzcGF0Y2hBZFByb3h5RXZlbnQgfSBmcm9tIFwiLi9zaGFyZWRcIjsgZXhwb3J0IGRlZmF1bHQgeyBwcm9wczogWyd1cmwnLCAnYWxsb3cnXSwgZGF0YSgpIHsgcmV0dXJuIHsgaXNMb2FkaW5nOiB0cnVlLCBpc0Z1bGxTY3JlZW46IGZhbHNlLCBhZFN0eWxlOiB7fSwgdGl0bGU6ICcnIH0gfSwgb25Jbml0KCkgeyBkZWZpbmVBZFByb3h5Q29tcG9uZW50LmNhbGwodGhpcywgeyBuYW1lOiAnd2ViJywgZm9ybWF0OiAnZW50cnknIH0pOyB9LCBvblBhZ2VTdGFydChldmVudCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvblBhZ2VTdGFydCcsIGV2ZW50KTsgfSwgb25QYWdlRmluaXNoKGV2ZW50KSB7IGRpc3BhdGNoQWRQcm94eUV2ZW50LmNhbGwodGhpcywgJ29uUGFnZUZpbmlzaCcsIGV2ZW50KTsgfSwgb25UaXRsZVJlY2VpdmUoZXZlbnQpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25UaXRsZVJlY2VpdmUnLCBldmVudCk7IH0sIG9uRXJyb3IoZXZlbnQpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25FcnJvcicsIGV2ZW50KTsgfSwgb25Qcm9ncmVzcyhldmVudCkgeyBkaXNwYXRjaEFkUHJveHlFdmVudC5jYWxsKHRoaXMsICdvblByb2dyZXNzJywgZXZlbnQpOyB9LCBvbkJhY2soZXZlbnQpIHsgZGlzcGF0Y2hBZFByb3h5RXZlbnQuY2FsbCh0aGlzLCAnb25CYWNrJywgZXZlbnQpOyB9IH07IDwvc2NyaXB0PiIsIjxpbXBvcnQgbmFtZT1cInRvcG9uLWFkLXdlYlwiIHNyYz1cIkB0b3Bvbi9xdWljay1hcHAtc2RrLWh3L3dlYi51eFwiPjwvaW1wb3J0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0b3Bvbi1hZC13cmFwcGVyXCI+XG4gICAgPHRvcG9uLWFkLXdlYlxuICAgICAgdXJsPVwie3t3ZWJzcmN9fVwiXG4gICAgICBhbGxvdz1cInt7YWxsb3d9fVwiXG4gICAgPlxuICAgIDwvdG9wb24tYWQtd2ViPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgcm91dGVyIGZyb20gJ0BzeXN0ZW0ucm91dGVyJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2Vic3JjOiAnJyxcbiAgICAgIGFsbG93OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIG9uSW5pdCgpIHtcbiAgICB0aGlzLndlYnNyYyA9IHRoaXMudXJsO1xuICB9LFxuXG4gIG9uQmFja1ByZXNzKCkge1xuICAgIGlmICh0aGlzLmVudHJ5KSB7XG4gICAgICByb3V0ZXIuY2xlYXIoKTtcbiAgICAgIHJvdXRlci5yZXBsYWNlKHtcbiAgICAgICAgdXJpOiB0aGlzLmVudHJ5LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4udG9wb24tYWQtd3JhcHBlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuPC9zdHlsZT4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiLnRvcG9uLWFkLXdyYXBwZXJcIjoge1xuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCJcbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gIFwiYXR0clwiOiB7fSxcbiAgXCJjbGFzc0xpc3RcIjogW1xuICAgIFwidG9wb24tYWQtd3JhcHBlclwiXG4gIF0sXG4gIFwiY2hpbGRyZW5cIjogW1xuICAgIHtcbiAgICAgIFwidHlwZVwiOiBcInRvcG9uLWFkLXdlYlwiLFxuICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgXCJ1cmxcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy53ZWJzcmMpfSxcbiAgICAgICAgXCJhbGxvd1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFsbG93KX1cbiAgICAgIH1cbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidHlwZVwiOiBcImRpdlwiLFxuICBcImF0dHJcIjoge30sXG4gIFwiY2xhc3NMaXN0XCI6IFtcbiAgICBcImFkeC13ZWItY29udGFpbmVyXCJcbiAgXSxcbiAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUubGFuZGluZ0NvbnRhaW5lcil9LFxuICBcImNoaWxkcmVuXCI6IFtcbiAgICB7XG4gICAgICBcInR5cGVcIjogXCJkaXZcIixcbiAgICAgIFwiYXR0clwiOiB7fSxcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmxhbmRpbmdCYXIpfSxcbiAgICAgIFwic2hvd25cIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5pc0Z1bGxTY3JlZW4pfSxcbiAgICAgIFwiY2hpbGRyZW5cIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICAgICAgXCJhdHRyXCI6IHt9LFxuICAgICAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY2xpY2tcIjogXCJvbkJhY2tcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjaGlsZHJlblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICAgICAgXCJhdHRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwi4oaQXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUubGFuZGluZ0J0bil9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dFwiLFxuICAgICAgICAgIFwiYXR0clwiOiB7XG4gICAgICAgICAgICBcInZhbHVlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMudGl0bGUpfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdHlsZVwiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLmFkU3R5bGUubGFuZGluZ1RpdGxlKX1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwid2ViXCIsXG4gICAgICBcImF0dHJcIjoge1xuICAgICAgICBcInNyY1wiOiBmdW5jdGlvbiAoKSB7cmV0dXJuICh0aGlzLnVybCl9LFxuICAgICAgICBcImFsbG93dGhpcmRwYXJ0eWNvb2tpZXNcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hbGxvdyl9LFxuICAgICAgICBcImlkXCI6IFwidG9wb24tYWR4LXdlYlwiXG4gICAgICB9LFxuICAgICAgXCJjbGFzc0xpc3RcIjogW1xuICAgICAgICBcInRvcG9uLWFkeC13ZWJcIlxuICAgICAgXSxcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJwYWdlc3RhcnRcIjogXCJvblBhZ2VTdGFydFwiLFxuICAgICAgICBcInBhZ2VmaW5pc2hcIjogXCJvblBhZ2VGaW5pc2hcIixcbiAgICAgICAgXCJ0aXRsZXJlY2VpdmVcIjogXCJvblRpdGxlUmVjZWl2ZVwiLFxuICAgICAgICBcImVycm9yXCI6IFwib25FcnJvclwiLFxuICAgICAgICBcInByb2dyZXNzXCI6IFwib25Qcm9ncmVzc1wiXG4gICAgICB9LFxuICAgICAgXCJpZFwiOiBcInRvcG9uLWFkeC13ZWJcIixcbiAgICAgIFwic3R5bGVcIjogZnVuY3Rpb24gKCkge3JldHVybiAodGhpcy5hZFN0eWxlLmxhbmRpbmdXZWIpfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0eXBlXCI6IFwiZGl2XCIsXG4gICAgICBcImF0dHJcIjoge30sXG4gICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRTdHlsZS5sb2FkaW5nQ29udGFpbmVyKX0sXG4gICAgICBcInNob3duXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuaXNMb2FkaW5nKX0sXG4gICAgICBcImNoaWxkcmVuXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgICAgICBcImF0dHJcIjoge1xuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIuWKoOi9veS4rS4uLlwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0eWxlXCI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKHRoaXMuYWRTdHlsZS5sb2FkaW5nVGV4dCl9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0iLCJ2YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS10ZW1wbGF0ZS1sb2FkZXIuanM/dHlwZT1jb21wb25lbnQmbmFtZT10b3Bvbi1hZC13ZWIhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT10ZW1wbGF0ZXMhLi93ZWIudXhcIilcbnZhciAkYXBwX3NjcmlwdCQgPSByZXF1aXJlKFwiISEuLi8uLi9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zY3JpcHQtbG9hZGVyLmpzIS4uLy4uL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vYmFiZWwtbG9hZGVyP3ByZXNldHNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwcmVzZXQtZW52LHRhcmdldHM9bm9kZSA4JnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tdHJhbnNmb3JtLW1vZHVsZXMtY29tbW9uanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcZmEtdG9vbGtpdFxcXFxsaWJcXFxcZmEtY29tcGlsZXJcXFxcanN4LWxvYWRlci5qcyZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQmY29tbWVudHM9ZmFsc2UhLi4vLi4vZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtZnJhZ21lbnQtbG9hZGVyLmpzP2luZGV4PTAmdHlwZT1zY3JpcHRzIS4vd2ViLnV4XCIpXG5cbiRhcHBfZGVmaW5lJCgnQGFwcC1jb21wb25lbnQvdG9wb24tYWQtd2ViJywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2xvYWRlci5qcz90eXBlPWNvbXBvbmVudCEuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHRvcG9uL3F1aWNrLWFwcC1zZGstaHcvd2ViLnV4P25hbWU9dG9wb24tYWQtd2ViXCIpXG52YXIgJGFwcF90ZW1wbGF0ZSQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvZmEtdG9vbGtpdC9saWIvZmEtY29tcGlsZXIvZmEtdGVtcGxhdGUtbG9hZGVyLmpzP2RlcGVuZHNbXT10b3Bvbi1hZC13ZWIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9dGVtcGxhdGVzIS4vaW5kZXgudXhcIilcbnZhciAkYXBwX3N0eWxlJCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1zdHlsZS1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXN0eWxlcyZyZXNvdXJjZVBhdGg9ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXHNyY1xcXFxUb3BPblxcXFxBZExhbmRpbmdcXFxcaW5kZXgudXghLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWZyYWdtZW50LWxvYWRlci5qcz9pbmRleD0wJnR5cGU9c3R5bGVzJnJlc291cmNlUGF0aD1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcc3JjXFxcXFRvcE9uXFxcXEFkTGFuZGluZ1xcXFxpbmRleC51eCEuL2luZGV4LnV4XCIpXG52YXIgJGFwcF9zY3JpcHQkID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLXNjcmlwdC1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhLXRvb2xraXQvbGliL2ZhLWNvbXBpbGVyL2ZhLWFjY2Vzcy1sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlcj9wcmVzZXRzW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccHJlc2V0LWVudix0YXJnZXRzPW5vZGUgOCZwbHVnaW5zW109ZDpcXFxccXVpY2thcHBXb3Jrc3BhY2VcXFxcY29tLmhhaXR1by5zZXRwcGxhbmV0XFxcXG5vZGVfbW9kdWxlc1xcXFxAYmFiZWxcXFxccGx1Z2luLXRyYW5zZm9ybS1tb2R1bGVzLWNvbW1vbmpzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXGZhLXRvb2xraXRcXFxcbGliXFxcXGZhLWNvbXBpbGVyXFxcXGpzeC1sb2FkZXIuanMmcGx1Z2luc1tdPWQ6XFxcXHF1aWNrYXBwV29ya3NwYWNlXFxcXGNvbS5oYWl0dW8uc2V0cHBsYW5ldFxcXFxub2RlX21vZHVsZXNcXFxcQGJhYmVsXFxcXHBsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJnBsdWdpbnNbXT1kOlxcXFxxdWlja2FwcFdvcmtzcGFjZVxcXFxjb20uaGFpdHVvLnNldHBwbGFuZXRcXFxcbm9kZV9tb2R1bGVzXFxcXEBiYWJlbFxcXFxwbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJmNvbW1lbnRzPWZhbHNlIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYS10b29sa2l0L2xpYi9mYS1jb21waWxlci9mYS1mcmFnbWVudC1sb2FkZXIuanM/aW5kZXg9MCZ0eXBlPXNjcmlwdHMhLi9pbmRleC51eFwiKVxuXG4kYXBwX2RlZmluZSQoJ0BhcHAtY29tcG9uZW50L2luZGV4JywgW10sIGZ1bmN0aW9uKCRhcHBfcmVxdWlyZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfbW9kdWxlJCl7XG4gICAgICRhcHBfc2NyaXB0JCgkYXBwX21vZHVsZSQsICRhcHBfZXhwb3J0cyQsICRhcHBfcmVxdWlyZSQpXG4gICAgIGlmICgkYXBwX2V4cG9ydHMkLl9fZXNNb2R1bGUgJiYgJGFwcF9leHBvcnRzJC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAkYXBwX21vZHVsZSQuZXhwb3J0cyA9ICRhcHBfZXhwb3J0cyQuZGVmYXVsdFxuICAgICAgICB9XG4gICAgICRhcHBfbW9kdWxlJC5leHBvcnRzLnRlbXBsYXRlID0gJGFwcF90ZW1wbGF0ZSRcbiAgICAgJGFwcF9tb2R1bGUkLmV4cG9ydHMuc3R5bGUgPSAkYXBwX3N0eWxlJFxufSlcblxuJGFwcF9ib290c3RyYXAkKCdAYXBwLWNvbXBvbmVudC9pbmRleCcseyBwYWNrYWdlck5hbWU6J2ZhLXRvb2xraXQnLCBwYWNrYWdlclZlcnNpb246ICcxNC4wLjEtU3RhYmxlLjMwMCd9KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/AdBanner/index.ux?uxType=page":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/AdBanner/index.ux?uxType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));
var _system2 = _interopRequireDefault($app_require$("@app-module/system.device"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = {
  private: {
    ad: null,
    adUnitId: '4095f11c8658440b9075da95705d6313',
    adEvent: {},
    adStyle: {
      width: '',
      height: '',
      top: '',
      left: ''
    },
    channel: 'test_channel'
  },
  onShow() {
    this.initAd();
  },
  changeAdUnitAd(e) {
    this.adUnitId = e.value;
  },
  channelchange(e) {
    this.channel = e.value;
  },
  bannerStyleAttrValCreateChange(e) {
    let attrName = e.target.attr.name;
    this.adStyle[attrName] = e.value;
  },
  clearStyle() {
    this.adStyle = {
      width: '',
      height: '',
      top: '',
      left: ''
    };
    this.$broadcast('logsUnshift', `清空 style`);
  },
  setStyle() {
    if (this.ad) {
      Object.keys(this.adStyle).forEach(item => {
        this.ad.style[item] = this.adStyle[item];
      });
      this.$broadcast('logsUnshift', `设置 style, bannerAd style: ${JSON.stringify(this.ad.style)}`);
    }
  },
  async getProvider() {
    try {
      let res;
      res = $app_require$("@app-module/service.ad").getProvider();
      this.$broadcast('logsUnshift', `ad.getProvider 成功, res = ${res}`);
    } catch (e) {
      _system.default.showToast({
        message: JSON.stringify(err)
      });
      this.$broadcast('logsUnshift', `捕获异常 ${err}`);
    }
  },
  async initAd() {
    if (this.ad) {
      this.$broadcast('logsUnshift', '已存在一个广告实例');
      return;
    }
    let res;
    res = await _system2.default.getInfo();
    if (res.data.brand !== "vivo") {
      this.$broadcast('logsUnshift', `brand !== vivo`);
      return;
    }
    if (res.data.engine_host !== "vivo_browser" && res.data.platformVersionCode < 1052) {
      this.$broadcast('logsUnshift', `engine_host !== vivo_browser && platformVersionCode < 1052`);
      return;
    }
    let adStyle = {};
    Object.keys(this.adStyle).forEach(key => {
      if (this.adStyle[key]) {
        adStyle[key] = this.adStyle[key];
      }
    });
    this.ad = $app_require$("@app-module/service.ad").createBannerAd({
      adUnitId: this.adUnitId,
      style: adStyle,
      channel: this.channel
    });
    this.$broadcast('logsUnshift', `ad.createBannerAd 成功`);
    this.onEvent('Resize');
    this.onEvent('Error');
    this.onEvent('Load');
    this.onEvent('Close');
    this.$broadcast('logsUnshift', `bannerAd 初始化成功, 请点击 "展示广告"`);
    this.showAd();
  },
  showAd() {
    if (!this.ad) {
      this.$broadcast('logsUnshift', '请先创建一个广告实例');
      return;
    }
    this.ad.show().then(() => {
      this.$broadcast('logsUnshift', `bannerAd.show 成功`);
    }, () => {
      this.$broadcast('logsUnshift', `bannerAd.show 失败, err = ${JSON.stringify(err)}`);
    });
  },
  hideAd() {
    if (!this.ad) {
      this.$broadcast('logsUnshift', '请先创建一个广告实例');
      return;
    }
    this.ad.hide().then(() => {
      this.$broadcast('logsUnshift', `bannerAd.hide 成功`);
    }, () => {
      this.$broadcast('logsUnshift', `bannerAd.hide 失败, err = ${JSON.stringify(err)}`);
    });
  },
  destroyAd() {
    if (!this.ad) {
      this.$broadcast('logsUnshift', '请先创建一个广告实例');
      return;
    }
    this.ad.destroy();
    this.$broadcast('logsUnshift', `bannerAd.destroy 成功`);
    this.ad = null;
    this.adEvent = {};
  },
  onEvent(event) {
    if (!this.ad) {
      this.$broadcast('logsUnshift', '请先创建一个广告实例');
      return;
    }
    if (!this.adEvent[event]) {
      this.adEvent[event] = [];
    }
    let fn = null;
    let fnIndex = this.adEvent[event].length;
    if (event == 'Resize') {
      fn = res => {
        this.$broadcast('logsUnshift', `触发 ${event} 事件${fnIndex + 1}, res = ${res ? JSON.stringify(res) : ''}, bannerAd style: ${JSON.stringify(this.ad.style)}`);
      };
    } else {
      fn = res => {
        this.$broadcast('logsUnshift', `触发 ${event} 事件${fnIndex + 1}, res = ${res ? JSON.stringify(res) : ''}`);
      };
    }
    this.ad[`on${event}`](fn);
    this.adEvent[event].push(fn);
    this.$broadcast('logsUnshift', `监听 ${event} 事件${fnIndex + 1}`);
  },
  offEvent(event, offType) {
    if (!this.ad) {
      this.$broadcast('logsUnshift', '请先创建一个广告实例');
      return;
    }
    if (offType == 'all') {
      this.ad[`off${event}`]();
      this.ad[event] = [];
      this.$broadcast('logsUnshift', `取消所有 ${event} 事件`);
    } else {
      let lastIndex = this.adEvent[event].length - 1;
      this.ad[`off${event}`](this.adEvent[event][lastIndex]);
      this.adEvent[event].pop();
      this.$broadcast('logsUnshift', `取消 ${event} 事件${lastIndex + 1}`);
    }
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

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Common/adLogs.ux?uxType=comp":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Common/adLogs.ux?uxType=comp ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  data() {
    return {
      logs: []
    };
  },
  onInit() {
    console.log(111);
    this.$on('logsUnshift', this.logsUnshift);
  },
  logsUnshift(evt) {
    this.logs.unshift(evt.detail);
  },
  logsClear() {
    this.logs = [];
    this.logs.unshift(`清空日志`);
  }
};}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Common/adLogs.ux?uxType=comp":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Common/adLogs.ux?uxType=comp ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".page-container": {
    "flexDirection": "column"
  },
  ".ad-logs": {
    "flexDirection": "column",
    "alignItems": "center",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#000000",
    "borderRightColor": "#000000",
    "borderBottomColor": "#000000",
    "borderLeftColor": "#000000",
    "marginTop": "50px",
    "marginRight": "50px",
    "marginBottom": "50px",
    "marginLeft": "50px",
    "paddingTop": "30px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px"
  },
  ".ad-logs .title": {
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "marginBottom": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title"
        }
      ]
    }
  },
  ".ad-logs list": {
    "width": "100%",
    "height": "250px",
    "backgroundColor": "#eeeeee",
    "marginBottom": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "list"
        }
      ]
    }
  },
  ".ad-logs .btn-row": {
    "marginBottom": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        }
      ]
    }
  },
  ".ad-logs .btn-row input": {
    "paddingTop": "20px",
    "paddingRight": "70px",
    "paddingBottom": "20px",
    "paddingLeft": "70px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-id": {
    "flexDirection": "column",
    "alignItems": "center",
    "marginBottom": "30px"
  },
  ".ad-id text": {
    "marginBottom": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-id"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".ad-id input": {
    "fontSize": "30px",
    "paddingTop": "20px",
    "paddingRight": "30px",
    "paddingBottom": "20px",
    "paddingLeft": "30px",
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-id"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-style": {
    "flexDirection": "column",
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px"
  },
  ".ad-style .style-row": {
    "flex": 1,
    "flexDirection": "row",
    "justifyContent": "space-around",
    "marginBottom": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column": {
    "flex": 1,
    "marginTop": "0px",
    "marginRight": "30px",
    "marginBottom": "0px",
    "marginLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column text": {
    "width": "100px",
    "textAlign": "right",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column input": {
    "flex": 1,
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "fontSize": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-style .btn-row input": {
    "paddingTop": "20px",
    "paddingRight": "70px",
    "paddingBottom": "20px",
    "paddingLeft": "70px",
    "marginTop": "0px",
    "marginRight": "30px",
    "marginBottom": "0px",
    "marginLeft": "30px",
    "color": "#ffffff",
    "backgroundColor": "#2d8cf0",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".btn-row": {
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "50px"
  },
  ".btn-row input": {
    "fontSize": "30px",
    "borderRadius": "10px",
    "paddingTop": "10px",
    "paddingRight": "15px",
    "paddingBottom": "10px",
    "paddingLeft": "15px",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px",
    "color": "#ffffff",
    "backgroundColor": "#2d8cf0",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/AdBanner/index.ux?uxType=page":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/AdBanner/index.ux?uxType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".page-container": {
    "flexDirection": "column"
  },
  ".ad-logs": {
    "flexDirection": "column",
    "alignItems": "center",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#000000",
    "borderRightColor": "#000000",
    "borderBottomColor": "#000000",
    "borderLeftColor": "#000000",
    "marginTop": "50px",
    "marginRight": "50px",
    "marginBottom": "50px",
    "marginLeft": "50px",
    "paddingTop": "30px",
    "paddingRight": "30px",
    "paddingBottom": "30px",
    "paddingLeft": "30px"
  },
  ".ad-logs .title": {
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "marginBottom": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "title"
        }
      ]
    }
  },
  ".ad-logs list": {
    "width": "100%",
    "height": "250px",
    "backgroundColor": "#eeeeee",
    "marginBottom": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "list"
        }
      ]
    }
  },
  ".ad-logs .btn-row": {
    "marginBottom": "0px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        }
      ]
    }
  },
  ".ad-logs .btn-row input": {
    "paddingTop": "20px",
    "paddingRight": "70px",
    "paddingBottom": "20px",
    "paddingLeft": "70px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-logs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-id": {
    "flexDirection": "column",
    "alignItems": "center",
    "marginBottom": "30px"
  },
  ".ad-id text": {
    "marginBottom": "10px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-id"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".ad-id input": {
    "fontSize": "30px",
    "paddingTop": "20px",
    "paddingRight": "30px",
    "paddingBottom": "20px",
    "paddingLeft": "30px",
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-id"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-style": {
    "flexDirection": "column",
    "paddingTop": "0px",
    "paddingRight": "30px",
    "paddingBottom": "0px",
    "paddingLeft": "30px"
  },
  ".ad-style .style-row": {
    "flex": 1,
    "flexDirection": "row",
    "justifyContent": "space-around",
    "marginBottom": "50px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column": {
    "flex": 1,
    "marginTop": "0px",
    "marginRight": "30px",
    "marginBottom": "0px",
    "marginLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column text": {
    "width": "100px",
    "textAlign": "right",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".ad-style .style-row .style-column input": {
    "flex": 1,
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#000000",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px",
    "paddingTop": "10px",
    "paddingRight": "20px",
    "paddingBottom": "10px",
    "paddingLeft": "20px",
    "fontSize": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-row"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "style-column"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".ad-style .btn-row input": {
    "paddingTop": "20px",
    "paddingRight": "70px",
    "paddingBottom": "20px",
    "paddingLeft": "70px",
    "marginTop": "0px",
    "marginRight": "30px",
    "marginBottom": "0px",
    "marginLeft": "30px",
    "color": "#ffffff",
    "backgroundColor": "#2d8cf0",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ad-style"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".btn-row": {
    "flexDirection": "row",
    "justifyContent": "center",
    "marginBottom": "50px"
  },
  ".btn-row input": {
    "fontSize": "30px",
    "borderRadius": "10px",
    "paddingTop": "10px",
    "paddingRight": "15px",
    "paddingBottom": "10px",
    "paddingLeft": "15px",
    "marginTop": "0px",
    "marginRight": "20px",
    "marginBottom": "0px",
    "marginLeft": "20px",
    "color": "#ffffff",
    "backgroundColor": "#2d8cf0",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "btn-row"
        },
        {
          "t": "d"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  }
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Common/adLogs.ux?uxType=comp&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Common/adLogs.ux?uxType=comp& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "ad-logs"
  ],
  "children": [
    {
      "type": "text",
      "attr": {
        "value": "日志"
      },
      "classList": [
        "title"
      ]
    },
    {
      "type": "list",
      "attr": {},
      "children": [
        {
          "type": "list-item",
          "attr": {
            "type": "log"
          },
          "repeat": function () {return this.logs},
          "children": [
            {
              "type": "text",
              "attr": {
                "value": "- "
              }
            },
            {
              "type": "text",
              "attr": {
                "value": function () {return this.$item}
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
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "清空日志"
          },
          "events": {
            "click": "logsClear"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/AdBanner/index.ux?uxType=page&importNames[]=ad-logs":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/AdBanner/index.ux?uxType=page&importNames[]=ad-logs ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "page-container"
  ],
  "children": [
    {
      "type": "ad-logs",
      "attr": {}
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "ad-id"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "广告ID"
          }
        },
        {
          "type": "input",
          "attr": {
            "value": function () {return this.adUnitId}
          },
          "events": {
            "change": "changeAdUnitAd"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "ad-style"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "style-row"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "style-column"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "channel: "
                  }
                },
                {
                  "type": "input",
                  "attr": {
                    "type": "text",
                    "value": function () {return this.channel}
                  },
                  "classList": [
                    "input-text"
                  ],
                  "events": {
                    "change": "channelchange"
                  }
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
        "ad-style"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "style-row"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "style-column"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "width: "
                  }
                },
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "name": "width",
                    "value": function () {return this.adStyle.width}
                  },
                  "classList": [
                    "input-text"
                  ],
                  "events": {
                    "change": "bannerStyleAttrValCreateChange"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "style-column"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "height: "
                  }
                },
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "name": "height",
                    "value": function () {return this.adStyle.height}
                  },
                  "classList": [
                    "input-text"
                  ],
                  "events": {
                    "change": "bannerStyleAttrValCreateChange"
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
            "style-row"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "style-column"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "top: "
                  }
                },
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "name": "top",
                    "value": function () {return this.adStyle.top}
                  },
                  "classList": [
                    "input-text"
                  ],
                  "events": {
                    "change": "bannerStyleAttrValCreateChange"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "style-column"
              ],
              "children": [
                {
                  "type": "text",
                  "attr": {
                    "value": "left: "
                  }
                },
                {
                  "type": "input",
                  "attr": {
                    "type": "number",
                    "name": "left",
                    "value": function () {return this.adStyle.left}
                  },
                  "classList": [
                    "input-text"
                  ],
                  "events": {
                    "change": "bannerStyleAttrValCreateChange"
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
            "btn-row"
          ],
          "children": [
            {
              "type": "input",
              "attr": {
                "type": "button",
                "value": "清空 style"
              },
              "events": {
                "click": "clearStyle"
              }
            },
            {
              "type": "input",
              "attr": {
                "type": "button",
                "value": "设置 style"
              },
              "events": {
                "click": "setStyle"
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
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "获取服务提供商"
          },
          "events": {
            "click": "getProvider"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "创建广告"
          },
          "events": {
            "click": "initAd"
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "销毁广告"
          },
          "events": {
            "click": "destroyAd"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "展示广告"
          },
          "events": {
            "click": "showAd"
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "隐藏广告"
          },
          "events": {
            "click": "hideAd"
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "新增一个 Resize 事件"
          },
          "events": {
            "click": function (evt) { return this.onEvent('Resize',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消一个 Resize 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Resize','offLast',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消所有 Resize 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Resize','all',evt)}
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "新增一个 Error 事件"
          },
          "events": {
            "click": function (evt) { return this.onEvent('Error',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消一个 Error 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Error','offLast',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消所有 Error 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Error','all',evt)}
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "新增一个 Load 事件"
          },
          "events": {
            "click": function (evt) { return this.onEvent('Load',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消一个 Load 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Load','offLast',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消所有 Load 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Load','all',evt)}
          }
        }
      ]
    },
    {
      "type": "div",
      "attr": {},
      "classList": [
        "btn-row"
      ],
      "children": [
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "新增一个 Close 事件"
          },
          "events": {
            "click": function (evt) { return this.onEvent('Close',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消一个 Close 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Close','offLast',evt)}
          }
        },
        {
          "type": "input",
          "attr": {
            "type": "button",
            "value": "取消所有 Close 事件"
          },
          "events": {
            "click": function (evt) { return this.offEvent('Close','all',evt)}
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Common/adLogs.ux?uxType=comp&name=ad-logs":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!./src/Common/adLogs.ux?uxType=comp&name=ad-logs ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./adLogs.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/Common/adLogs.ux?uxType=comp")
var $app_script$ = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./adLogs.ux?uxType=comp */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/Common/adLogs.ux?uxType=comp")
$app_define$('@app-component/ad-logs', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./adLogs.ux?uxType=comp& */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/Common/adLogs.ux?uxType=comp&")
    $app_module$.exports.style = $app_style$;
});
;

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
  !*** ./src/ad/AdBanner/index.ux?uxType=page ***!
  \**********************************************/
__webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&type=import!../../Common/adLogs.ux?uxType=comp&name=ad-logs */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/ux-loader.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&type=import!./src/Common/adLogs.ux?uxType=comp&name=ad-logs")
var $app_style$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/style-loader.js?index=0&type=style!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/less-loader/dist/cjs.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=style!./src/ad/AdBanner/index.ux?uxType=page")
var $app_script$ = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\quickappWorkspaceAll\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules\@hap-toolkit\packager\babel.config.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/script-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/packager/lib/loaders/module-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/babel-loader/lib/index.js?cwd=d:\\quickappWorkspaceAll\\com.haituo.setpplanet&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules\\@hap-toolkit\\packager\\babel.config.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/access-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=script!./src/ad/AdBanner/index.ux?uxType=page")
$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
        if ($app_exports$.__esModule && $app_exports$.default) {
          $app_module$.exports = $app_exports$.default
        }
    $app_module$.exports.template = __webpack_require__(/*! !../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../../../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=ad-logs */ "../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/template-loader.js!../../Quick App IDE/resources/app/extensions/hap-debugger/node_modules/@hap-toolkit/dsl-xvm/lib/loaders/fragment-loader.js?index=0&type=template!./src/ad/AdBanner/index.ux?uxType=page&importNames[]=ad-logs")
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
//# sourceMappingURL=ad\AdBanner\index.js.map
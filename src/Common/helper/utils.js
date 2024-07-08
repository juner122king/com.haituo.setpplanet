/**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
import $device from '@system.device'

// 节流阀
const throttle = (fn, gapTime = 1500) => {
  let _lastTime = null;
  // 返回新的函数
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments); //将this和参数传给原函数
      _lastTime = _nowTime;
    }
  };
};

const { JSEncrypt } = require('../libs/jsencrypt/lib/index')

const config = {
  publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqaj0Y3k54jCyTq47t73ScBX9uBsSScDo7/uZ+PhHYh9eQqHNW1bBjKGV4t3Y8Wokhv783krxhIqzkPf9nHeZ2yWqoQlPa3qOUc7Wf/HpX2+eHGRjF1/RLARJmMcEgQYB3WGbdRedu0FjQSGd+OfSS/W7Heh2ZGlF/aSHj2NYhYE4p7x4jjQIi+ueKZvVJNZpu0vhQaF45jpqQDULPL+MkkQePmupjp/PR4Ra8BVg4DwJuI6K8jL77YWaxeQRbMrEiQ0ZbTKRQ4o8N73iIM97E/h8PbDl5FbuNn0k8urkYnmv56AMdkVEyIOUwNEa8oU9QKz37o5Z2L7+yqx2zmLpVwIDAQAB',
}

const dataEncryption = (data, action = "encrypt") => {
  try {
    let keyMap = {
      encrypt: config.publicKey,
      decrypt: config.privateKey
    };
    let key = keyMap[action]
    let _data = action === "encrypt" ? JSON.stringify(data) : data;
    return new Promise((resolve, reject) => {
      if (action === "encrypt") {
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(key);
        let result = encryptor.encrypt(_data);
        console.log(result, '查看有什么');
        resolve(result)
        return resolve(result)
      }
    })
  } catch (error) {
    console.log(error, '转换报错？');
  }
}
const getUserId = async () => {
  let userId = await $device.getUserId()
  return userId.data.userId;
};


/**
 * 转化上传
 * @param {*} that 所在this 
 */
function getConvertUpload() {
  let param = {
    ...getApp().$def.dataApp.actiParam
  }
  console.log('getConvertUpload() 转化参数param= ', param)
  if (!param.oaid) {
    return
  }
  for (const key in param) {
    param[key] = param[key].replace(/\/$/, "");
  }
  const convertedParam = convertKeysToCamelCase(param);
  console.log('getConvertUpload() 格式化转化参数convertedParam= ', convertedParam)
  $apis.example.convertUpload({
    ...convertedParam,
    deviceId: convertedParam.oaid,
    type: convertedParam.type || 'jh'
  }).then((res) => {
    console.log(res, '转换成功');

  }).catch((err) => {
    console.log(err, '转换失败');
  })
}

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}



/**
* 保存广告回传参数   router.push(OBJECT)  例：@param {Object} e='hap://app/com.company.app/index?param1=value1'
*/
const saveHapUri = (e) => {
  console.log('saveHapUri() 转化参数e= ', e)

  const { channelValue = '', oaid = '' } = e
  if (oaid) {
    getApp().$def.dataApp.actiParam = {
      ...e
    }
  }
}

/**
* 插屏广告 
*/

const tablePlaque = async () => {

  const storageFlag = await $processData.getStorage("_PRIVAC");
  if (!storageFlag) {
    //未授权，弹出授权询问
    console.log('用户授权= ', storageFlag);
    console.log('未授权,不加载插屏广告');
    return
  }

  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告商');
    return
  }
  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: getApp().$def.dataApp.interstitialAdUnitId
  })

  interstitialAd.load().then((res) => {
    console.log(res, '查屏加载成功');
    interstitialAd.show().then(
      () => { console.log('插屏广告show成功') },
      () => { console.log('插屏广告show失败') }
    )
  }).catch((err) => {
    console.log(err, '插屏加载失败');
  })
  interstitialAd.onClick(() => {
    console.log('插屏广告点击了');
    //转化上传
    getConvertUpload()
  })


};


/**
* banner广告  margin_bot底部缩进  
*/

let bannerAd; const showBannerAd = async (margin_bot) => {

  
  const storageFlag = await $processData.getStorage("_PRIVAC");
  if (!storageFlag) {
    //未授权，弹出授权询问
    console.log('用户授权= ', storageFlag);
    console.log('未授权,不加载banner广告');
    return
  }

  let Provider = $ad.getProvider();
  if (!Provider) {
    console.log('没有广告返回');
    return
  }
  var d = $device.getInfoSync();
  console.info("banner广告-设备信息 " + JSON.stringify(d));

  let height = 57;
  //获取页面内可见窗口的高度和宽度，此值不包括标题栏和状态栏高度
  let windowWidth = d.screenWidth;
  let windowHeight = d.screenHeight - 153 - margin_bot;
  //logicWidth对应manifest.json文件设置的designWidth值，默认是750
  let logicWidth = 750;
  //广告自身大小单位是dp，需要转换成px单位
  let realAdHeighPX = height * d.screenDensity;
  //标题栏高度一般是42dp左右，此处也需要转换成px单位
  let titleBarHeight = 42 * d.screenDensity;
  //此处计算很关键，需要将状态栏高度、标题栏高度加上
  let realToppx = windowHeight - realAdHeighPX + d.statusBarHeight + titleBarHeight;

  console.info("calBannerPostion1 realToppx=" + realToppx + ", logicWidth= " + logicWidth, "windowWidth= " + windowWidth);
  //转换成页面基准值下的逻辑单位
  let logicWebTop = (realToppx * logicWidth) / windowWidth;

  //此对象请自己在data下定义
  let top = logicWebTop === 0 ? 1230 : logicWebTop;
  console.info("calBannerPostion1 top=" + top + ", logicWebTop= " + logicWebTop);



  const style = {
    left: 0,
    top: top,
    width: 360,
    height: height
  }

  let adid = getApp().$def.dataApp.bannerAdUnitId
  console.info("banner广告位=" + adid);
  bannerAd = $ad.createBannerAd({
    adUnitId: adid,//banner广告位
    style: style,
    adIntervals: 60//刷新时间，秒
  });
  console.info("annerAd.style=" + JSON.stringify(bannerAd.style));
  bannerAd.onLoad(e => {
    console.info("load bannerAd  onload success e=" + JSON.stringify(e));
  });
  bannerAd.onError(e => {
    console.error("load bannerAd  onError " + JSON.stringify(e));
  });
  bannerAd.onClose(e => {
    console.info("load bannerAd  onClose");
  });
  bannerAd.show();
}

const hideBanerAd = () => {
  if (bannerAd) {
    bannerAd.hide();
  }
}
const viewBanner = () => {
  if (bannerAd) {
    bannerAd.show();
  }
}
const destroyBanner = () => {
  if (bannerAd) {
    bannerAd.destroy()
  }
}

const extractYearMonth = (input) => {
  if (input.length !== 6 || isNaN(input)) {
    throw new Error('Invalid input format');
  }
  const year = input.slice(0, 4);
  let month = input.slice(4, 6);

  if (month[0] === '0') {
    month = month[1];
  } else {
    month = parseInt(month, 10).toString();
  }
  return { year, month };
}



/**
 * 分秒倒计时
 * @param {Object} countDownData 相关参数：totalSeconds倒计时秒数、name属性名称、isFormat格式化
 * @param {*} that 当前组件this
 */
const startCountDown = (countDownData, that) => {
  let {
    totalSeconds = 3, name, isFormat = false
  } = countDownData;
  let _this = that;
  return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if (totalSeconds > 1) {
        totalSeconds--;
        const minutes = isFormat ?
          this.formatTime(Math.floor(totalSeconds / 60)) :
          Math.floor(totalSeconds / 60);
        const seconds = isFormat ?
          this.formatTime(Math.floor(totalSeconds % 60)) :
          Math.floor(totalSeconds % 60);
        _this[name] = {
          minutes,
          seconds
        }
      } else {
        clearInterval(_this.timer);
        resolve();
      }
    }, 1000);
    _this.timer = timer
  });
};



export default {
  throttle,
  getUserId,
  getConvertUpload,
  extractYearMonth,
  startCountDown,
  dataEncryption,
  tablePlaque,
  showBannerAd,
  hideBanerAd,
  viewBanner,
  destroyBanner,
  saveHapUri
}
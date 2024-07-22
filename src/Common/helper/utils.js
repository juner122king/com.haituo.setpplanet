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
 function getConvertUpload(that) {
  let param = {
    ...that.$app.$def.dataApp.actiParam
  }
  console.log('getConvertUpload() 转化参数param= ', param)

  for (const key in param) {
    param[key] = param[key].replace(/\/$/, "");
  }
  const convertedParam = convertKeysToCamelCase(param);

  if (!convertedParam.callback) {
    return
  }
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
  // console.log('saveHapUri() 转化参数e= ', e)

  const { channelValue = '', oaid = '' } = e
  if (oaid) {
    this.$app.$def.dataApp.actiParam = {
      ...e
    }
  }
}


/**
* 插屏广告 
*/
const tablePlaque = (adid,that) => {

  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // console.log('用户授权= ', storageFlag);

  // if (!storageFlag) {
  //   console.log('未授权,不加载广告');
  //   return
  // } 

  let Provider = $ad.getProvider();

  if (!Provider) {
    console.log('没有广告返回');
    return
  }

  console.info('插屏广告= ', adid);
  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: adid
  })
  interstitialAd.onLoad(() => { // 监听广告加载
    console.log('查屏加载成功');
    interstitialAd.show()
    getConvertUpload(that)
  })
  interstitialAd.onError((err) => { // 监听广告出错
    console.info('插屏广告onError event emit', err)
  })
  interstitialAd.onClose((res) => { // 监听广告关闭
    console.info('插屏广告onClose event emit', res)
  })
  // interstitialAd.onClick(() => {
  //   console.log('插屏广告点击了');
  //   // //转化上传
  //   // getConvertUpload()
  // })

};


/**
* banner广告  margin_bot底部缩进    @param isbuttom 是否显示在最底部
*/

let bannerAd; const showBannerAd = async () => {

  // const storageFlag = await $processData.getStorage("_PRIVAC");
  // if (!storageFlag) {
  //   //未授权，弹出授权询问
  //   console.log('用户授权= ', storageFlag);
  //   console.log('未授权,不加载banner广告');
  //   return
  // }

  let adid = '4095f11c8658440b9075da95705d6313'
  let Provider = $ad.getProvider();
  console.info('广告商:', Provider);
  // $prompt.showToast({
  //   message: `${Provider}广告商`,
  //   gravity: 'center'
  // });
  console.info("banner广告位=" + adid);


  const style = {
    left: 0,     // banner 广告组件的左上角横坐标
    top: 1430,    // banner 广告组件的左上角纵坐标
    width: 1080, // banner 广告组件的宽度
    Height: 170  // banner 广告组件的高度
  }


  bannerAd = $ad.createBannerAd({
    adUnitId: adid,//banner广告位
    style: style
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

//打开拆福袋页面
const openAd = () => {
  //友盟事件打点
  $umeng_stat.trackEvent('wd_xyfddhj', '点击');
  $router.push({
    uri: 'Page_cfd'
  });

}

export default {
  throttle,
  getUserId,
  getConvertUpload,
  startCountDown,
  dataEncryption,
  tablePlaque,
  showBannerAd,
  hideBanerAd,
  viewBanner,
  destroyBanner,
  saveHapUri,
  openAd
}
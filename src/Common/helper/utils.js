/**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
import $device from '@system.device'
import ad from '@service.ad'
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

const { adCodeData } = require('../../config.js').default

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

  if (!param.channelValue) {
    return
  }
  for (const key in param) {
    param[key] = param[key].replace(/\/$/, "");
  }
  const convertedParam = convertKeysToCamelCase(param);
  console.log('getConvertUpload() 格式化转化参数convertedParam= ', convertedParam)



  $apis.example.convertUpload({
    ...convertedParam,
    type: convertedParam.type || 'jh'
  }).then((res) => {
    console.log(res, '转化成功');

  }).catch((err) => {
    console.log(res, '转化失败：' + err);
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
const saveHapUri = (that, e) => {
  console.log('saveHapUri() 转化参数e= ', e)

  const { channelValue = '', backurl = '', type } = e
  if (channelValue) {
    that.$app.$def.dataApp.actiParam = {
      ...e
    }
  }
}


/**
 * 转化上传
 * @param {*} that 所在this  小说广告页面的转化方法
 */
function conversionUpload(that) {
  let param = {
    ...that.$app.$def.dataApp.actiParam,
  }
  param.type = judgingAd(that) //转换类型
  if (Object.keys(param).length <= 0 || !param.type) {
    //无值的情况直接删除
    return
  }
  console.log('进入了回传上报')
  let conversionlicks = that.$app.$def.dataApp.conversionlicks //第几次回传上报
  let clicksOnAdsNow = that.$app.$def.dataApp.clicksOnAdsNow + 1 //现在是第几次任务
  console.log(conversionlicks, 'conversionlicks')
  console.log(clicksOnAdsNow, 'clicksOnAdsNow')

  that.$app.$def.dataApp.clicksOnAdsNow = clicksOnAdsNow
  if (conversionlicks <= 0 || clicksOnAdsNow !== conversionlicks) {
    console.log('取消转换上传')
    return
  }

  if (param.type === 'jh') {
    for (const key in param) {
      param[key] = param[key].replace(/\/$/, '')
    }
    param = convertKeysToCamelCase(param)
  }
  console.log(param, '查看上传的参数')
  $apis.task
    .postConvertUpload({
      ...param,
      deviceId: param.oaid || '',
      type: param.type,
    })
    .then((res) => {
      console.log(res, '转换成功')
    })
    .catch((err) => {
      console.log(err, '转换失败')
    })
}


/**
* 插屏广告  提现页面插屏，不用回传
*/
const tablePlaqueTX = (that) => {
  let branch = $ad.getProvider();
  if (!branch) {
    console.log('没有广告商');
    return
  }
  let adid = adCodeData[branch].interstitialAdUnitId
  console.info('插屏广告id ', adid)

  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: adid
  })
  interstitialAd.onLoad(() => { // 监听广告加载
    console.log('查屏加载成功');
    interstitialAd.show()
  })
  interstitialAd.onError((err) => { // 监听广告出错
    console.info('插屏广告onError event emit', err)
  })
  interstitialAd.onClose((res) => { // 监听广告关闭
    console.info('插屏广告onClose event emit', res)
  })
}


const tablePlaque = async (onCloseCallback, onCatchCallback,that) => {

  let branch = $ad.getProvider();
  if (!branch) {
    console.log('没有广告商');
    return
  }
  let adid = adCodeData[branch].interstitialAdUnitId
  console.info('插屏广告id ', adid)

  let interstitialAd = $ad.createInterstitialAd({
    adUnitId: adid
  })

  interstitialAd.load().then((res) => {
    console.log(res, '查屏加载成功');
    interstitialAd.show().then(
      () => { console.log('插屏广告show成功') },
      () => { console.log('插屏广告show失败') }
    )
  })
  
    .catch(onCatchCallback)


  interstitialAd.onClick(() => {
    console.log('插屏广告点击了');
    //转化上传
    getConvertUpload(that)
  })

  interstitialAd.onClose(onCloseCallback)

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


  let branch = $ad.getProvider();
  console.info('广告商:', branch);

  let adid = adCodeData[branch].banner;
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
    // console.info("load bannerAd  onload success e=" + JSON.stringify(e));
  });
  bannerAd.onError(e => {
    // console.error("load bannerAd  onError " + JSON.stringify(e));
  });
  bannerAd.onClose(e => {
    // console.info("load bannerAd  onClose");
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
}

//打开拆福袋页面
const openAd = () => {
  //友盟事件打点
  $umeng_stat.trackEvent('wd_xyfddhj', '点击');

  var r = 'Page_cfd'
  // r = 'hap://app/com.haituo.setpplanet/pages/advertisingCampaigns?channelValue=KYY&type=vivo'
  // r = 'hap://app/com.haituo.setpplanet/Page_cfd?backurl=vivobrowser%3a%2f%2fbrowser.vivo.com%3fad_token%3d1816281355597746178&btn_name=%E8%BF%94%E5%9B%9E%E6%B5%8F%E8%A7%88%E5%99%A8&channelValue=KYY&type=vivo'
  $router.push({
    uri: r
  });

}

/**
 * 判断广告商
 */
function judgingAd(context) {
  let param = {
    ...context.$app.$def.dataApp.actiParam,
  }
  let type = param.type || ''
  if (type) {
    return type
  }
  if (
    param.adgroup_id &&
    param.content_id &&
    param.campaign_id &&
    param.callback
  ) {
    type = 'jh'
  } else if (param.btn_name && param.backurl) {
    type = 'vivo'
  }

  return type ? type : false
}

/**
 * 判断广告主id
 * @param {*} context
 */

function analyzeAdvertiserId(context) {
  const {
    backurl = '',
    corp_id = '',
    callback = '',
  } = context.$app.$def.dataApp.actiParam
  if (backurl) {
    return backurl
  } else if (callback) {
    return corp_id ? corp_id : callback
  }
}

/**
 * 获取哪一次上报回传  context  指向
 */
function getConversionlicks(context) {
  const {
    type = '',
    corp_id = '',
    channelValue = '',
  } = context.$app.$def.dataApp.actiParam
  let adType = type ? type : judgingAd(context) //有类型直接获取类型 没有则进行判断；
  let corpId = corp_id ? corp_id : analyzeAdvertiserId(context)

  $apis.task
    .getConversionlicks({ type: adType, corpId, channelValue })
    .then((res) => {
      console.log(res, '查看点击回传')
      if (res.data === 0) {
        $utils.conversionUpload(context)
      }
      context.$app.$def.dataApp.conversionlicks = res.data
    })
    .catch((err) => {
      console.log(err, '查看点击回传失败')
    })
}

// 埋点上报
async function buriedPointReport(these, event = 'AppLaunch', adId = '') {
  try {
    let checkPaem = {
      ...these.$app.$def.dataApp.actiParam,
    }
    console.log(these.$app.$def.dataApp, 'these.$app.$def.dataApp-')
    console.log(checkPaem, '查看是否有参数')
    if (Object.keys(checkPaem).length <= 0) {
      //无值的情况直接删除
      return
    }

    let token = await $storage.get({
      key: 'AUTH_TOKEN_DATA',
    })
    token = JSON.parse(token.data)
    console.log('查看这个token', token)
    const that = this
    let adBrand = $ad.getProvider()
    let param = {
      ...checkPaem,
      cid: checkPaem.channelValue,
      event: event === 'click' ? '$AdClick' : '$AppLaunch',
      pid: adBrand.toLowerCase(),
      appId: token.appId,
      userId: token.userId,
    }
    let urlQuery = convertToQueryString(checkPaem)
    $device.getInfo({
      success: function (res) {
        const phoninfo = res
        let param2 = {
          ...param,
          properties: {
            ...res,
            manufacturer: phoninfo.manufacturer,
            model: phoninfo.model,
            os: phoninfo.osType,
            product: phoninfo.product,
            analysis: {
              adId: adId,
              title: adId,
            },
            urlQuery: urlQuery,
          },
        }

        console.log('查看上报参数', param2)
        $apis.task
          .postTrackCapture({ ...param2 })
          .then((res) => {
            console.log('上报成功', res)
          })
          .catch((err) => {
            console.log(err, '上传失败')
          })
      },
    })
  } catch (error) {
    console.log(error, '上传错误')
  }
}

function convertToQueryString(objects) {
  // 初始化一个空字符串来存储结果
  let queryString = ''
  // 遍历对象数组
  Object.keys(objects).forEach((key, index) => {
    // 如果不是第一个键值对，则添加 '&'
    if (index > 0 || queryString !== '') {
      queryString += '&'
    }
    // 将键值对添加到查询字符串中
    queryString += `${key}=${objects[key]}`
  })
  return queryString
}



export default {
  throttle,
  getUserId,
  getConvertUpload,
  startCountDown,
  dataEncryption,
  tablePlaqueTX,
  tablePlaque,
  showBannerAd,
  hideBanerAd,
  viewBanner,
  destroyBanner,
  saveHapUri,
  openAd,
  getConversionlicks,
  conversionUpload,
  buriedPointReport,//埋点
}
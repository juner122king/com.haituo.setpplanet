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
async function conversionUpload(that, ecpmParam, splashData = {}) {

  try {

    let param = {}
    if (ecpmParam.adType !== 'OPEN_SCREEN') {
      param = {
        ...that.$app.$def.dataApp.actiParam,
      }
      param.type = judgingAd(that) //转换类型
    } else {
      param = {
        ...splashData,
      }
    }

    console.log(param, '查看回传上报参数')
    if (Object.keys(param).length <= 0 || !param.type) {
      //无值的情况直接删除
      return
    }
    console.log('进入了回传上报')
    if (param.type === 'jh') {
      for (const key in param) {
        param[key] = param[key].replace(/\/$/, '')
      }
      param = convertKeysToCamelCase(param)
    }
    console.log(param, '查看上传的参数')


    let res = await $device.getOAID()
    let oaid = res.data.oaid
    console.info("OAID:  " + oaid)
    console.log('竞价相关参数传到了？', ecpmParam);

    const branch = $ad.getProvider().toLowerCase()
    const deviceInfo = await $device.getInfo({})
    const phoninfo = deviceInfo.data
    let manufacturer = phoninfo.manufacturer.toLowerCase()

    if (manufacturer === 'oppo' || branch === 'oppo') {
      //机型广告唯一值相同都替换
      if (ecpmParam.adType !== 'OPEN_SCREEN') {
        let oaid = that.$app.$def.dataApp.myOaid

        try {
          console.log('进来了oppo')
          let oaidData = ''
          if (!oaid) {
            oaidData = await $device.getOAID()
            that.$app.$def.dataApp.myOaid = oaidData.data.oaid
          } else {
            console.log('有oaid就不用在触发了')
          }
          param.oaid = oaid || oaidData.data.oaid
        } catch (error) {
          console.log(error, '')
        }
        console.log(param.oaid, '查看oaid')
      } else {
        let oaidData = await $device.getOAID()
        param.oaid = oaidData.data.oaid
      }
    }

    let buriedPointData = await $storage.get({
      key: 'sensorsdata2015_quickapp',
    })
    try {
      buriedPointData = JSON.parse(buriedPointData.data)
    } catch (error) {
      buriedPointData = {
        distinct_id: '',
      }
    }

    $apis.task
      .postConvertUpload({
        ...param,
        ecpm: ecpmParam.ecpm,
        adType: ecpmParam.adType,
        adPositionId: ecpmParam.adPositionId,
        clickCount: ecpmParam.clickCount,
        pid: manufacturer || branch,
        deviceId: param.oaid || '',
        type: param.type,
        oaid: oaid,
        distinctId: buriedPointData.distinct_id
      })
      .then((res) => {
        console.log(res, '转换成功')
      })
      .catch((err) => {
        console.log(err, '转换失败')
      })

    if (param.type === 'uc') {
      console.log('UC上报参数==', param)
      $apis.task
        .postConvertUploadUC({
          ...param,
          ecpm: ecpmParam.ecpm,
          adType: ecpmParam.adType,
          adPositionId: ecpmParam.adPositionId,
          clickCount: ecpmParam.clickCount,
          pid: manufacturer || branch,
          deviceId: param.oaid || '',
          type: param.type,
          oaid: oaid,
          distinctId: buriedPointData.distinct_id
        })
        .then((res) => {
          console.log(res, 'UC上报成功')
        })
        .catch((err) => {
          console.log(err, 'UC上报失败')
        })
    }
  } catch (error) {
    console.log('转换失败', error)
  }
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


const tablePlaque = async (onCloseCallback, onCatchCallback, that) => {

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
  var e
  interstitialAd.load().then((res) => {
    console.log(res, '查屏加载成功')

    e = interstitialAd.getECPM()
    console.log(`getECPM: 插屏广告获取实时竞价结果成功!ecpm=${e.ecpm}`)

    interstitialAd.show().then(
      () => {
        console.log('插屏广告show成功')

        let ecpmParam = {  //竞价相关参数
          ecpm: e.ecpm,
          adType: 'INSERT_SCREEN',
          adPositionId: adid,
          clickCount: '0'
        }
        console.log('竞价相关参数', ecpmParam)

        conversionUpload(that, ecpmParam)
      },
      () => { console.log('插屏广告show失败') }
    )
  })
    .catch(onCatchCallback)


  interstitialAd.onClick(() => {
    console.log('插屏广告点击了')

    let ecpmParam = {  //竞价相关参数
      ecpm: e.ecpm,
      adType: 'INSERT_SCREEN',
      adPositionId: adid,
      clickCount: '1'
    }
    console.log('竞价相关参数', ecpmParam)

    conversionUpload(that, ecpmParam)

  })

  interstitialAd.onClose(onCloseCallback)

};


/**
* banner广告  margin_bot底部缩进    @param isbuttom 是否显示在最底部
*/

let bannerAd; const showBannerAd = async () => {
  let branch = $ad.getProvider();
  console.info('广告商:', branch);

  let adid = adCodeData[branch].banner;
  console.info("banner广告位=" + adid);
  bannerAd = $ad.createBannerAd({
    adUnitId: adid,//banner广告位
    style: {
      width: 750,
      top: 1540
    }
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

  bannerAd.onResize((data) => {
    console.log(data.width + "|" + data.height, 'onResize')
  })


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

  var r = 'pages/luckyBagOpen'
  // r = 'hap://app/com.haituo.setpplanet/pages/luckyBagOpen?adId=-1&ownerId=1000399194&androidid=-1&oaid=446D5DF91C5944EC968490C4245DD09F1b622455b6283a6dcd5e3c610c461137&ts=-1&type=oppo&channelValue=jbxq1'
  // r = 'hap://app/com.haituo.setpplanet/pages/advertisingCampaigns?backurl=vivobrowser%3a%2f%2fbrowser.vivo.com%3fad_token%3d1816281355597746178&btn_name=%E8%BF%94%E5%9B%9E%E6%B5%8F%E8%A7%88%E5%99%A8&channelValue=KYY&type=vivo'
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
        // $utils.conversionUpload(context)
      }
      context.$app.$def.dataApp.conversionlicks = res.data
    })
    .catch((err) => {
      console.log(err, '查看点击回传失败')
    })
}

// 埋点上报
async function buriedPointReport(these, event = 'AppLaunch', adId = '', splashData = {}) {
  try {
    let checkPaem = {
      channelValue: '',
      oaid: '',
      type: '',
      ...splashData,
    }
    if (event !== 'Splash' && event !== 'SplashLaunch') {
      //不是开屏正常逻辑
      const isEnabled = these.$app.$def.dataApp.isEnabled
      if (event === 'AppLaunch' && isEnabled) {
        // console.log('取消启动上报', isEnabled)
        return
      } else {
        // console.log('成功启动上报')
        these.$app.$def.dataApp.isEnabled = true
      }
      checkPaem = {
        channelValue: '',
        ...these.$app.$def.dataApp.actiParam,
      }
    }

    console.log(checkPaem, '查看是否有参数')
    let token = await $storage.get({
      key: 'AUTH_TOKEN_DATA',
    })
    let buriedPointData = await $storage.get({
      key: 'sensorsdata2015_quickapp',
    })
    try {
      token = JSON.parse(token.data)
      buriedPointData = JSON.parse(buriedPointData.data)
    } catch (error) {
      console.log('无token状态')
      token = {
        userId: 'null',
        appId: '',
      }
      buriedPointData = {
        distinct_id: '',
      }
    }
    let adBrand = $ad.getProvider().toLowerCase()
    let urlQuery = convertToQueryString(checkPaem)
    const eventData = {
      click: '$AdClick',
      Splash: '$AdClick',
      AppLaunch: '$AppLaunch',
      SplashLaunch: '$AppLaunch',
    }
    $device.getInfo({
      success: function (ret) {
        let phoninfo = ret
        let manufacturer = phoninfo.manufacturer.toLowerCase()
        let param = {
          ...checkPaem,
          ...splashData,
          event: eventData[event],
          cid: checkPaem.channelValue,
          pid: manufacturer || adBrand,
          appId: token.appId || 'SC_0001',
          userId: token.userId,
          properties: {
            ...phoninfo,
            manufacturer: phoninfo.manufacturer,
            model: phoninfo.model,
            os: phoninfo.osType,
            product: phoninfo.product,
            analysis: {
              adId: adId,
              title: adId,
            },
            urlQuery: urlQuery,
            distinct_id: buriedPointData.distinct_id,
          },
        }
        console.log('查看埋点上报参数', param)
        $apis.task
          .postTrackCapture({ ...param })
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
    $apis.task
      .postTrackCapture({
        event: event === 'click' ? '$AdClick' : '$AppLaunch',
        appId: 'SC_0001',
        properties: {
          analysis: {
            adId: adId,
            title: adId,
          },
        },
      })
      .then((res) => {
        console.log('上报成功', res)
      })
      .catch((err) => {
        console.log(err, '上传失败')
      })
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
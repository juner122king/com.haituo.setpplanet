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
* 插屏广告 
*/
const tablePlaque = (adid, that) => {

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
}


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
  r = 'pages/advertisingCampaigns'

  // r = 'hap://app/com.haituo.setpplanet/Page_cfd?backurl=vivobrowser%3a%2f%2fbrowser.vivo.com%3fad_token%3d1816281355597746178&btn_name=%E8%BF%94%E5%9B%9E%E6%B5%8F%E8%A7%88%E5%99%A8&channelValue=KYY&type=vivo'
  $router.push({
    uri: r
  });

}



/**
 * @param {*} this //必传
 * @param {*} name //变量名
 * @param {*} data  // 数据值
 * @param {*} changeType  //get set 存储消除  前两参数都传默认为set
 * @returns
 */
function changeGlobalParam(that, name, data = '', changeType = 'get') {
  try {
    let type = name && data ? 'set' : changeType
    if (type === 'get') {
      return name ? that.$app.$def.dataApp[name] : that.$app.$def.dataApp
    } else if (type === 'set') {
      that.$app.$def.dataApp[name] = data
      return that.$app.$def.dataApp[name]
    }
  } catch (error) { }
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


//单个广告点击埋点数据
function adCapture(that, event, adId) {


  $apis.user.getUserInfo().then((res) => {
    console.log('查看用户信息 ', res.data)
    var infoData = res.data;

    const {
      type = '',
      channelValue = '',
    } = that.$app.$def.dataApp.actiParam


    let query = ''//地址参数串,例如hap://app/com.haituo.bookkeeping?channelValue=xcx&type=vivo, 传channelValue=xcx&type=vivo
    let path = ''//链接路径, $pageview时必填

    let ana = {
      phone: infoData.phone,//	手机号, 在获取用户信息接口中取phone参数
      adId: adId,//	广告位id, $AdComplete时必填
      title: '',//标题,点击位置标识, $Click时必填
    }

    let prop = {
      manufacturer: '',//手机品牌
      model: '',//	型号
      networkType: '',//网络模式
      os: 'android',//系统
      osVersion: '',//系统版本
      urlQuery: query,
      urlPath: path,//链接路径, $pageview时必填
      analysis: ana
    }

    let trackCaptureMiniDto = {
      properties: prop,
      userId: infoData.userId,//用户id, 必填:
      oaid: '',//设备id:
      event: event,//	$Visit(访问),$pageview(页面访问),$Click(普通点击),$AdComplete(广告完成),$AdClick(广告点击),$AppLaunch(快应用启动), 必填:
      appId: 'SC_0001',//	应用id, 必填:
      pid: type,//平台
      cid: channelValue,//渠道
    }
    console.info(' 单个埋点数据：', trackCaptureMiniDto)


    $apis.example.capture(trackCaptureMiniDto).then(response => {
      console.log(' 单个埋点successful:', response)

    }).catch(error => {
      console.error(' 埋点failed:', error)
      $prompt.showToast({
        message: "埋点失败" + error,
        gravity: 'center'
      })
    })
  }).catch(error => {
    $prompt.showToast({
      message: "埋点失败" + error,
      gravity: 'center',
      duration: 5000
    })
  })

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
  openAd,
  getConversionlicks,
  conversionUpload,
  adCapture
}
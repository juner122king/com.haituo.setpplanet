import $device from '@system.device'
import prompt from '@system.prompt'
import $ad from '@service.ad'
const config = require('../../config').default
const $image = require('@system.image')
const { JSEncrypt } = require('../libs/jsencrypt/lib/index')
/**
 * 开屏上报  传this
 * @param {*} these
 */
function openScreen(these) {
  const adBrand = $ad.getProvider().toLowerCase()
  if (adBrand !== 'oppo') return
  $ad.onSplashStatus({
    reserved: true,
    callback: (data) => {
      const { statusCode, data: adData } = data
      const splashData = {
        ...these._def.dataApp.actiParam,
        openScreenStatusCode: statusCode,
      }
      if (statusCode === '-100') {
        console.log('这是-100')
        return
      }
      const handleError = (action, error) => {
        console.log(`${action}报错`, error)
      }
      const trackSensors = (eventName, properties) => {
        try {
          these.sensors.track(eventName, properties)
        } catch (error) {
          handleError('埋点', error)
        }
      }
      if (statusCode == 0) {
        const ecpm = adData.ecpm || adData.cpm
        these._def.dataApp.openScreenEcpm = ecpm
        try {
          $utils.conversionUpload(these, {
            adType: 'OPEN_SCREEN',
            adPositionId: '1653995',
            isclick: false,
            ecpm: ecpm,
            splashData: splashData,
          })
        } catch (error) {
          handleError('转换', error)
        }

        try {
          $utils.buriedPointReport(these, {
            event: 'SplashLaunch',
            adId: '1653995',
            splashData: splashData,
          })
        } catch (error) {
          handleError('埋点', error)
        }

        try {
          sensors.pageShow({
            channel: splashData.channelValue,
            formId: '1653995',
            ...splashData,
          })
        } catch (error) {
          handleError('埋点', error)
        }
        trackSensors('$WebShow', { title: '开屏广告-广告曝光-1653995' })
      } else if (statusCode == 100) {
        let ecpm
        try {
          ecpm = adData.ecpm || adData.cpm
        } catch (error) {
          ecpm = these._def.dataApp.openScreenEcpm || 0
        }

        try {
          $utils.buriedPointReport(these, {
            event: 'Splash',
            adId: '1653995',
            splashData: splashData,
          })
        } catch (error) {
          handleError('埋点', error)
        }
        try {
          $utils.conversionUpload(these, {
            adType: 'OPEN_SCREEN',
            adPositionId: '1653995',
            isclick: true,
            ecpm: ecpm,
            splashData: splashData,
          })
        } catch (error) {
          handleError('转换', error)
        }
        trackSensors('$AppClick', { title: '开屏广告-广告位-1653995' })
      }
    },
  })
}

const pageLocation = {
  'activity/mysteryPopups': '旧红包',
  'activity/threaten': '吓唬人',
  'activity/randomGiftPack': '自定义任务',
  'activity/ttzxj': '误点击',
  'setting/adTest': '广告测试',
  'pages/displayDesktop': '桌面',
  'pages/welfareCenter': '福利中心',
  'pages/advertisingCampaigns': '广告落地',
  'pages/readAd': '小说文章',
  'pages/luckyBagOpen': '开福袋',
  'setting/rouletteDraw': '抽奖',
  'activity/mysteryPopups_taku': '自定义任务taku',
}

/**
 * 新埋点
 * @these {*} this
 *formId 广告id
 *eventName 事件名
 *pageName 页面名
 *behavior 行为名
 * title 规则
 * 页面-广告曝光-广告id   $WebShow
 * 页面-广告曝光失败-广告id  $WebShow
 * 页面-广告曝光-广告id    $AppClick
 */
function newBurialSite(
  these,
  rest = { eventName: 'show', formId: '', subTitle: '' }
) {
  try {
    const { eventName, formId, subTitle } = rest
    console.log(rest, '查看新埋点参数')
    let locationData = $router.getState()
    console.log(locationData, '获取页面名')
    let pageName = pageLocation[locationData.name] //根据地址获取页面名
    const eventData = {
      //事件
      show: ' $WebShow',
      click: '$AppClick',
      error: '$WebShow',
    }
    const titleData = {
      //标题
      show: '广告曝光',
      click: '广告位',
      error: '广告曝光失败',
    }
    let title = `${pageName + (subTitle ? '-' + subTitle : '')}-${titleData[eventName]
      }-${formId}`
    these.$app.$sensors.track(eventData[eventName], {
      formId,
      ...rest,
      title,
    })
  } catch (error) {
    console.log(error, '函数埋点错误')
  }
}

export default {
  openScreen,
  newBurialSite,
}
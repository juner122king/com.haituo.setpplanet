import $device from '@system.device'
import prompt from '@system.prompt'
import $ad from '@service.ad'
const config = require('../../config').default
const $image = require('@system.image')
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
        openScreenData: data,
      }
      if (statusCode === '-100') {
        these.sensors.track('$WebShow', {
          analysis: {
            title: `开屏广告-广告曝光失败-${config.adCodeData.oppo.openScreen}`,
            channel: splashData.channelValue,
            formId: config.adCodeData.oppo.openScreen,
            ...splashData,
          },
        })
        return
      }
      const handleError = (action, error) => {}
      if (statusCode == 0) {
        const ecpm = adData.ecpm || adData.cpm
        these._def.dataApp.openScreenEcpm = ecpm
        try {
          $utils.conversionUpload(these, {
            adType: 'OPEN_SCREEN',
            adPositionId: config.adCodeData.oppo.openScreen,
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
            adId: config.adCodeData.oppo.openScreen,
            splashData: splashData,
          })
        } catch (error) {
          handleError('埋点', error)
        }

        try {
          sensors.pageShow({
            analysis: {
              channel: splashData.channelValue,
              formId: config.adCodeData.oppo.openScreen,
              ...splashData,
            },
          })
        } catch (error) {
          handleError('埋点', error)
        }
        these.sensors.track('$WebShow', {
          analysis: {
            title: '开屏广告-广告曝光-' + config.adCodeData.oppo.openScreen,
            channel: splashData.channelValue,
            formId: config.adCodeData.oppo.openScreen,
            ...splashData,
          },
        })
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
            adId: config.adCodeData.oppo.openScreen,
            splashData: splashData,
          })
        } catch (error) {
          handleError('埋点', error)
        }
        try {
          $utils.conversionUpload(these, {
            adType: 'OPEN_SCREEN',
            adPositionId: config.adCodeData.oppo.openScreen,
            isclick: true,
            ecpm: ecpm,
            splashData: splashData,
          })
        } catch (error) {
          handleError('转换', error)
        }
        these.sensors.track('$AppClick', {
          analysis: {
            title: '开屏广告-广告位-' + config.adCodeData.oppo.openScreen,
            channel: splashData.channelValue,
            formId: config.adCodeData.oppo.openScreen,
            ...splashData,
          },
        })
      }
    },
  })
}

// 埋点上报页面名
const pageLocation = {
  'activity/pollingPage': '轮询页面0',
  'activity/pollingPage01': '轮询页面01',
  'activity/pollingPage02': '轮询页面02',
  'activity/pollingPage03': '轮询页面03',
  'activity/pollingPage04': '轮询页面04',
  'activity/pollingPage05': '轮询页面05',
  'activity/pollingPage06': '轮询页面06',
  'activity/pollingPage07': '轮询页面07',
  'activity/pollingPage08': '轮询页面08',
  'activity/pollingPage09': '轮询页面09',

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
  'activity/mysteryPopups_taku': '旧红包taku',
  'activity/pictureReel_taku': '画布taku',
  'activity/randomGiftPack_taku': '自定义任务taku',
  'activity/threaten_taku': '吓唬人taku',
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
  const eventData = {
    //事件
    show: '$WebShow',
    click: '$AppClick',
    error: '$WebShow',
    load: '$WebShow',
    loadError: '$WebShow',
  }
  const titleData = {
    //标题
    show: '广告曝光',
    click: '广告位',
    error: '广告曝光失败',
    load: '广告请求',
    loadError: '广告请求失败',
  }
  try {
    const { eventName, formId, subTitle } = rest
    //
    let locationData = $router.getState()
    //
    let pageName = locationData
      ? pageLocation[locationData.name]
      : '无页面名称获取' //根据地址获取页面名

    let title = `${pageName + (subTitle ? '-' + subTitle : '')}-${
      titleData[eventName]
    }-${formId}`
    $sensors.track(eventData[eventName], {
      analysis: {
        formId,
        ...rest,
        title,
      },
    })
  } catch (error) {
    let title = `${pageName + (subTitle ? '-' + subTitle : '')}-${
      titleData[eventName]
    }-${formId}`
    $sensors.track(eventData[eventName], {
      analysis: {
        formId,
        title,
      },
    })
  }
}

/**
 *  ip地址限制跳转其他页面
 *
 */
async function ipLimit(these) {
  try {
    //转大写
    const brand = $ad.getProvider().toUpperCase()
    const ipLimit = await $apis.task.getIpLimit({ brand })

    if (ipLimit.data) {
      $utils.changeShowAd(true)
      $router.replace({
        uri: 'Page_Tixian',
      })
    }
  } catch (error) {}
}

export default {
  openScreen,
  newBurialSite,
  ipLimit,
}

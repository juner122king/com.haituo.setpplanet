const adCodeData = {
  vivo: {
    appid: 111256983,
    stimulateAd: 'd9b577f2a1c04838b27dcbdafde675d6',
    banner: '4095f11c8658440b9075da95705d6313',
    tableScreenAd: '',
    nativeAd: '5ba6ebc4ac8b4a13a52edd4e4ef680e0',
    fiction1: 'dc3e6dccc81e43c28748ccde57ee199e', //原生小说广告页id
    fiction2: '0e0b5e6f0da646adbc4d8afab817a275', //原生小说广告页id
    fiction3: '808847b949c54e3ba325119e1f58ca1f', //原生小说广告页id
    fiction4: 'edceb5351a9849deb3f7b92eba34ad18', //原生小说广告页id
    interstitialAdUnitId: '572c41d7e93945ca8e9db8150df89aed'//插屏广告位id
  },
  xiaomi: {
    nativeAd: '875427e86385392629207d9e11b0683c', //原生
    tableScreen: 'l4ai02av3y',
    stimulateAd: '182b9c7d8701f5c50a0d5f1cb9fcf2b0',
    banner: '926810d38a08e91d2e42033a97803676',
    lotteryPageNativeAd: '3ebda492da8090a8e28b3544df52da61',
  },
  oppo: {
    nativeAd: '1655290', //原生
    tableScreen: '1636380',
    banner: '1654123',
    interstitialAdUnitId: '1654001',//插屏广告位id
    fiction1: '1653991', //原生小说广告页id
    fiction2: '1653992', //原生小说广告页id
    fiction3: '1653993', //原生小说广告页id
    fiction4: '1653994', //原生小说广告页id
  },
  OPPO: {
    nativeAd: '1655290', //原生
    tableScreen: '1636380',
    banner: '1654123',
    interstitialAdUnitId: '1654001',//插屏广告位id
    fiction1: '1653991', //原生小说广告页id
    fiction2: '1653992', //原生小说广告页id
    fiction3: '1653993', //原生小说广告页id
    fiction4: '1653994', //原生小说广告页id
  },
  HUAWEI: {
    banner: 'i8zsc3gcbg',
    nativeAd: 'v5h5xsklp2', //原生
    nativeAdTK: 's2ytxth2mq', //原生TAKU
    interstitialAdUnitId: 'a7nvl7fm00',//插屏广告位id
    tableScreen: '',
    stimulateAd: '',
    lotteryPageNativeAd: '',
  },
}
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqaj0Y3k54jCyTq47t73S
cBX9uBsSScDo7/uZ+PhHYh9eQqHNW1bBjKGV4t3Y8Wokhv783krxhIqzkPf9nHeZ
2yWqoQlPa3qOUc7Wf/HpX2+eHGRjF1/RLARJmMcEgQYB3WGbdRedu0FjQSGd+OfS
S/W7Heh2ZGlF/aSHj2NYhYE4p7x4jjQIi+ueKZvVJNZpu0vhQaF45jpqQDULPL+M
kkQePmupjp/PR4Ra8BVg4DwJuI6K8jL77YWaxeQRbMrEiQ0ZbTKRQ4o8N73iIM97
E/h8PbDl5FbuNn0k8urkYnmv56AMdkVEyIOUwNEa8oU9QKz37o5Z2L7+yqx2zmLp
VwIDAQAB`
// 私钥
const privateKey = ''

const currentService = 'test'
const appConfig = {
  prod: {
    BASEHOST: 'https://api.ihaituo.cn',
  },
  dev: {
    BASEHOST: 'http://192.168.3.48:9999',
  },
  uat: {
    BASEHOST: 'https://mini.cnyings.com',
  },
  test: {
    BASEHOST: 'https://test.ipandata.com',
  },
}

export default {
  adCodeData,
  publicKey,
  privateKey,
  BASEHOST: appConfig[currentService].BASEHOST,
}

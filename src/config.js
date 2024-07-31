const adCodeData = {
  vivo: {
    appid: 111256983,
    stimulateAd: 'd9b577f2a1c04838b27dcbdafde675d6',
    banner: '3aae67431134438f9028c1d513f48098',
    tableScreenAd: '',
    nativeAd: 'e697c56e9c234a249226909c23e83ca7',
    lotteryPageNativeAd: '7f0323b3e1464f2d8b230e3c19e6be1a',
    fiction1: 'dc3e6dccc81e43c28748ccde57ee199e', //原生小说广告页id
    fiction2: '0e0b5e6f0da646adbc4d8afab817a275', //原生小说广告页id
    fiction3: '808847b949c54e3ba325119e1f58ca1f', //原生小说广告页id
    fiction4: 'edceb5351a9849deb3f7b92eba34ad18', //原生小说广告页id
  },
  xiaomi: {
    nativeAd: '875427e86385392629207d9e11b0683c', //原生
    tableScreen: 'l4ai02av3y',
    stimulateAd: '182b9c7d8701f5c50a0d5f1cb9fcf2b0',
    banner: '926810d38a08e91d2e42033a97803676',
    lotteryPageNativeAd: '3ebda492da8090a8e28b3544df52da61',
  },
  OPPO: {
    nativeAd: '1636371', //原生
    tableScreen: '1636380',
    stimulateAd: '1636375',
    banner: '',
    lotteryPageNativeAd: '1636371',
  },
  HUAWEI: {
    banner: 'w4brvyloy0',
    nativeAd: 'v5h5xsklp2', //原生
    nativeAdTK: 's2ytxth2mq', //原生TAKU
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

const currentService = 'prod'
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

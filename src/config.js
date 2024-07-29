const adCodeData = {
  appid: 111256983,
  nativeAd: 'v5h5xsklp2', //原生
  tableScreen: 'a7nvl7fm00',
  stimulateAd: 'o0rbevcepx',//testx9dtjwj8hp 测试编码 
  lotteryPageNativeAd: 's2ytxth2mq',
}
// const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqaj0Y3k54jCyTq47t73S
// cBX9uBsSScDo7/uZ+PhHYh9eQqHNW1bBjKGV4t3Y8Wokhv783krxhIqzkPf9nHeZ
// 2yWqoQlPa3qOUc7Wf/HpX2+eHGRjF1/RLARJmMcEgQYB3WGbdRedu0FjQSGd+OfS
// S/W7Heh2ZGlF/aSHj2NYhYE4p7x4jjQIi+ueKZvVJNZpu0vhQaF45jpqQDULPL+M
// kkQePmupjp/PR4Ra8BVg4DwJuI6K8jL77YWaxeQRbMrEiQ0ZbTKRQ4o8N73iIM97
// E/h8PbDl5FbuNn0k8urkYnmv56AMdkVEyIOUwNEa8oU9QKz37o5Z2L7+yqx2zmLp
// VwIDAQAB`;
// 私钥
const privateKey = "";

const currentService = "prod";
const appConfig = {
  prod: {
      BASEHOST: "https://api.ihaituo.cn"
  },
  dev: {
      BASEHOST: "http://192.168.3.48:9999"
  },
  uat: {
      BASEHOST: "https://mini.cnyings.com"
  },
  test: {
      BASEHOST: "https://test.ipandata.com"
  }
};

export default {
  adCodeData,
  // publicKey,
  privateKey,
  BASEHOST: appConfig[currentService].BASEHOST,
}

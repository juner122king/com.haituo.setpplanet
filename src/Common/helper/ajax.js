import $fetch from '@system.fetch'
import $storage from '@system.storage'
import $device from '@system.device'
const getUserId = async () => {
  let userId = await $device.getUserId()
  return userId.data.userId;
};


const getTokenData = () => {
  return new Promise(async (resolve, reject) => {
    const example = require('./apis/example.js').default;
    const deviceNum = await getUserId();
    console.log(`getTokenData()---->deviceNum=${deviceNum}`);
    console.log('是否触发的这里');
    example.toLogin({
      loginType: "DEVICE",
      appId: 'SC_0001',
      deviceNum,
      loginAccount: deviceNum
    }).then(data => {
      console.log('走的成功回调');
      resolve(data);
    }).catch(err => {
      console.log(err, '失败回调');
      reject(err)
    })
  });
};




let isRefreshing = false; // 是否正在请求刷新token的接口
const refreshSubscribers = []; // 存储请求的数组
const subscribeTokenRefresh = cb => {
  // 将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...]
  refreshSubscribers.push(cb);
};
const onRrefreshed = token => {
  // 数组中的请求得到新的token之后自执行，用新的token去请求数据
  refreshSubscribers.map(cb => cb(token));
};
const isAccessTokenExpired = authData => {
  // 判断当前token是否过期
  if (new Date().getTime() - authData.expireAt > 10000 * 60) {
    return true;
  }
  return false;
};

const request = options => {
  return new Promise(async (resolve, reject) => {
    const {
      method,
      url,
      data,
      headers = {},
    } = options;
    const authData = await $storage.get({
      key: 'AUTH_TOKEN_DATA'
    }) || {}
    const accessToken = authData.data ? JSON.parse(authData.data).accessToken : ''
    if (isAccessTokenExpired(authData) || !accessToken) {
      if (!options.url.includes("qa/mini/basic/user/login")) {
        if (!isRefreshing) {
          isRefreshing = true;
          getTokenData().then(async res => {
            res = JSON.parse(res)
            isRefreshing = false;
            if (res.code === "000000") {
              headers.Authorization = res.data.accessToken;
              await $storage.set({
                key: "AUTH_TOKEN_DATA",
                value: JSON.stringify(res.data)
              })
              console.log('res.data.accessToken', res.data.accessToken);
              onRrefreshed(res.data.accessToken);
            }
          })
            .catch(err => {
              isRefreshing = false;
            });

        }
        let retry = new Promise(() => {
          subscribeTokenRefresh(token => {
            headers.Authorization = token; // 用最新token请求数据
            return request(options)
              .then(resolve)
              .catch(reject);
          });
        });
        return retry;
      }
    }
    headers.Authorization = accessToken || '';
    $fetch.fetch({
      url: 'https://test.ipandata.com' + url,
      method,
      data,
      header: {
        "content-type": "application/json", //默认值
        ...headers
      },
      success: function (res) {
        const data = res.data
        if (data.code === "000000" || JSON.parse(data).code === "000000") {
          resolve(url.includes("qa/mini/basic/user/login") ? res.data : JSON.parse(res.data));
        } else {
          if (data.code === "300002") {
            $storage.delete({
              key: 'AUTH_TOKEN_DATA'
            })
            request(options)
              .then(resolve)
              .catch(reject);
          } else {
            reject(res.data);
          }
        }
      },
      fail: function (err) {
        reject(err);
      },
      complete: function (res) {
      }
    });
  });
};

export default request;
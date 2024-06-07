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


const getUserId = async () => {
  let userId = await $device.getUserId()
  return userId.data.userId;
};
export default {
  throttle,
  getUserId
}

import promiseRequest from '../utils/promise_request';
import {_local} from './_local';
/* const user = {
  fetchUser: `${_local}/login/getUserInfo`
} */
export default {
  loginBind: `${_local}/login/weBind`,//登陆页面登陆绑定
}
export async function fetchUser(options) {
  return promiseRequest(`${_local}/login/getWeiXinUserInfo`,options)
}
export async function fetchMenu(options) {
  // return promiseRequest(`${_local}/login/getUserM`,options)
  return promiseRequest(`${_local}/login/getWeiXinUserM`,options)
}
export async function updateUserName(options) {
  return promiseRequest(`${_local}/user/updateUserName`,options)
}
export async function getSession(options) {
  return promiseRequest(`${_local}/test/getSession`,options)
}

export async function loginBind(options) {
  return promiseRequest(`${_local}/login/weBind`,options)
}
export async function weUnBind(options) {
  return promiseRequest(`${_local}/login/weUnBind`,options)
}

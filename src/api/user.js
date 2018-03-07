import promiseRequest from '../utils/promise_request';
import {_local} from './_local';
/* const user = {
  fetchUser: `${_local}/login/getUserInfo`
} */
export async function fetchUser(options) {
  return promiseRequest(`${_local}/login/getWeiXinUserInfo`,options)
}
export async function fetchMenu(options) {
  return promiseRequest(`${_local}/login/getUserM`,options)
}
export async function updateUserName(options) {
  return promiseRequest(`${_local}/user/updateUserName`,options)
}
export async function getSession(options) {
  return promiseRequest(`${_local}/test/getSession`,options)
}
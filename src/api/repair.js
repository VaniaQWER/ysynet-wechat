import promiseRequest from '../utils/promise_request';
import {_local} from './_local';
export async function queryAssets(options) {
  return promiseRequest(`${_local}/assetsRecordController/selectAssetsRecordDetail`, options);
}
export async function insertNewAssets(options) {
  return promiseRequest(`${_local}/rrpairOrderController/insertOrUpdateRrpair`, options);
}
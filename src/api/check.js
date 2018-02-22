import promiseRequest from '../utils/promise_request';
import {_local} from './_local';
//验收通过/不通过
export async function updateCheckStatus(options) {
    return promiseRequest(`${_local}/meqm/rrpairOrderController/insertRrpairOrderAcce`, options);
}

export async function selectRrpairList(options) {
    return promiseRequest(`${_local}/meqm/rrpairOrderController/selectRrpairList`, options);
}

export async function queryDetail(options) {
    return promiseRequest(`${_local}/meqm/rrpairOrderController/selectRrpairDetailList`, options);
}
//查询使用配件
export async function findFittingInfo(options) {
    return promiseRequest(`${_local}/meqm/rrpairOrderController/selectRrpairFittingList`, options);
}
/*
 * @Author: wwb 
 * @Date: 2018-07-02 16:30:49 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 17:52:48
 */

import promiseRequest from '../utils/promise_request';
import { _local } from './_local';

export default {
  findBorrowRecord: `${_local}/borrowController/findBorrowRecordList`,//查找借用记录
}

export async function insertBorrow(options) {
  return promiseRequest(`${_local}/borrowController/insertBorrow`,options) // 新增借用记录
}

export async function updateBorrowReturn(options) {
  return promiseRequest(`${_local}/borrowController/updateBorrowReturn`,options) // 扫码归还修改状态
}

export async function findBorrowReturn(options) {
  return promiseRequest(`${_local}/borrowController/findBorrowReturn`,options) // 查询归还
}

export async function selectUseDeptList(options) {
  return promiseRequest(`${_local}/dept/selectUseDeptList`,options) //  当前人员的科室列表
}
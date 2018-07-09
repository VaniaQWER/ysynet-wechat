/*
 * @Author: wwb 
 * @Date: 2018-07-02 16:15:48 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 20:56:21
 */
/* 
  借用记录
*/
import asyncComponent from './asyncComponent';

export default [{ 
    path: '/borrowRecord', 
    name: '借用记录', 
    exact: true,
    component: asyncComponent(() => import("../container/borrow"),'借用记录'),
  },{ 
    path: '/borrowRecord/borrowOut/:assetsRecordGuid/:userId',
    name: '借用管理', 
    exact: true,
    component: asyncComponent(() => import("../container/borrow/borrowOut"),'借出管理'),
  },{ 
    path: '/borrowRecord/revert/:assetsRecordGuid/:borrowGuid/:userId',
    name: '归还管理', 
    exact: true,
    component: asyncComponent(() => import("../container/borrow/revert"),'归还管理'),
  },{ 
    path: '/borrowRecord/AssetsShow',
    name: '资产详情', 
    exact: true,
    component: asyncComponent(() => import("../container/check/assetsShow"),'资产详情'),
  },{ 
    path: '/borrowRecord/dept',
    name: '借用科室', 
    exact: true,
    component: asyncComponent(() => import("../container/borrow/dept"),'借用科室'),
  }]
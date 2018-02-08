/* 
* 我的验收
*
*/
import asyncComponent from './asyncComponent';
export default [{ 
    path: '/check', 
    name: '我的验收', 
    exact: true,
    component: asyncComponent(() => import("../container/check"),'我的验收'),
  }, {
    path: '/check/evaluate', 
    name: '验收评价', 
    exact: true,
    component: asyncComponent(() => import("../container/check/evaluate"),'验收评价'),
  }, {
    path: '/check/assetsShow', 
    name: '资产详情', 
    exact: true,
    component: asyncComponent(() => import("../container/check/assetsShow"),'资产详情'),
  }, {
    path: '/check/parts/:id', 
    name: '配件详情', 
    exact: true,
    component: asyncComponent(() => import("../container/check/partsInfo"),'配件详情'),
  },{
    path: '/check/detail/:id', 
    name: '验收详情', 
    exact: true,
    component: asyncComponent(() => import("../container/check/detail"),'验收详情'),
  },]
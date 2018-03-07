import asyncComponent from './asyncComponent';

export default [{ 
  path: '/waitForRepair', 
  name: '接修列表', 
  exact: true,
  component: asyncComponent(() => import("../container/waitForRepair"), '接修列表'),
}, {
  path: '/waitForRepair/detail/:userId/:rrpairOrderGuid/:userType/:sessionId', 
  name: '接修详情', 
  component: asyncComponent(() => import("../container/waitForRepair/detail"), '接修详情'),
}, {
  path: '/waitForRepair/detail/:result', 
  name: '接修状态', 
  exact: true,
  component: asyncComponent(() => import("../container/waitForRepair/result"), '接修状态'),
}]
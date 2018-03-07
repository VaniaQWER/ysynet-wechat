import asyncComponent from './asyncComponent';

export default [{ 
  path: '/repair/repairReg/:userId/:assetsRecordGuid/:groupName/:sessionId', 
  name: '资产报修',
  component: asyncComponent(() => import("../container/repair"), '资产报修'),
}, {
  path: '/repair/detail/:id', 
  name: '报修详情', 
  exact: true,
  component: asyncComponent(() => import("../container/repair/detail"), '报修详情'),
}]
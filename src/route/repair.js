import asyncComponent from './asyncComponent';

export default [{ 
  path: '/repair/:id', 
  name: '资产报修', 
  exact: true,
  component: asyncComponent(() => import("../container/repair"), '资产报修'),
}, {
  path: '/repair/detail/:id', 
  name: '报修详情', 
  exact: true,
  component: asyncComponent(() => import("../container/repair/detail"), '报修详情'),
}]
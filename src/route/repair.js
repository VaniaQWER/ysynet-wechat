import asyncComponent from './asyncComponent';

export default [{ 
  path: '/repair/:id', 
  name: '资产报修', 
  exact: true,
  component: asyncComponent(() => import("../container/repair")),
}, {
  path: '/repair/detail/:id', 
  name: '报修详情', 
  exact: true,
  component: asyncComponent(() => import("../container/repair/detail")),
}]
import asyncComponent from './asyncComponent';

export default [{ 
  path: '/waitForRepair', 
  name: '接修列表', 
  exact: true,
  component: asyncComponent(() => import("../container/waitForRepair"), '接修列表'),
}, {
  path: '/waitForRepair/:id', 
  name: '接修详情', 
  exact: true,
  component: asyncComponent(() => import("../container/waitForRepair/detail"), '接修详情'),
}]
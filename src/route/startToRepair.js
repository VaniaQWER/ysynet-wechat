import asyncComponent from './asyncComponent';

export default [{ 
  path: '/startToRepair/stepOne/:id', 
  name: '开始维修', 
  exact: true,
  component: asyncComponent(() => import("../container/startToRepair"), '开始维修步骤1'),
}, {
  path: '/startToRepair/stepTwo/:id', 
  name: '开始维修', 
  exact: true,
  component: asyncComponent(() => import("../container/startToRepair/stepTwo"), '开始维修步骤2'),
}, {
  path: '/startToRepair/stepThree/:id', 
  name: '开始维修', 
  exact: true,
  component: asyncComponent(() => import("../container/startToRepair/stepThree"), '开始维修步骤3'),
}, {
  path: '/startToRepair/stepTwo/addParts/:id', 
  name: '开始维修', 
  exact: true,
  component: asyncComponent(() => import("../container/startToRepair/addParts"), '选择配件'),
}]
/* 
* 我的维修单
*
*/
import asyncComponent from './asyncComponent';
export default [{ 
    path: '/repairRecord', 
    name: '维修单', 
    exact: true,
    component: asyncComponent(() => import("../container/repairRecord"),'维修单'),
  }]